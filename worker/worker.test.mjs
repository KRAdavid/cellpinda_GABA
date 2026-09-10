import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import worker from './index.ts';
import { createStore } from './store.ts';
import { createStore as createNodeStore } from '../server/store.mjs';
import {parseReviewDraft,REVIEW_DESTINATION_TEXT} from '../src/domain/reviews.ts';

class Statement {
  constructor(db,sql,args=[]){this.db=db;this.sql=sql;this.args=args;}
  bind(...args){return new Statement(this.db,this.sql,args);}
  async first(){return this.db.prepare(this.sql).get(...this.args) ?? null;}
  async all(){return {success:true,results:this.db.prepare(this.sql).all(...this.args),meta:{changes:0}};}
  async run(){const result=this.db.prepare(this.sql).run(...this.args);return {success:true,results:[],meta:{changes:Number(result.changes)}};}
}
class MockD1 {
  db=new DatabaseSync(':memory:');
  queue=Promise.resolve();
  prepare(sql){return new Statement(this.db,sql);}
  async batch(statements){const work=this.queue.then(async()=>{this.db.exec('BEGIN IMMEDIATE');try{const result=[];for(const statement of statements)result.push(await statement.run());this.db.exec('COMMIT');return result;}catch(error){this.db.exec('ROLLBACK');throw error;}});this.queue=work.catch(()=>{});return work;}
  close(){this.db.close();}
}
const seed={claims:[{id:'source',status:'approved',publicText:'Public fact',sources:[{title:'Source',url:'https://example.com'}],metadata:{sampleSize:'40',productApplicability:'Not a product study',privatePath:'secret'}},{id:'held',status:'hold',publicText:'SECRET',sources:[]}],products:[{id:'gaba1500',status:'approved',sourceIds:['source'],name:'Product'}]};

test('D1 approval transaction, seed preservation, public filtering and audit',async()=>{
  const db=new MockD1();const store=createStore(db);
  try {
    await store.initialize(seed);
    let data=await store.publicContent();assert.equal(data.claims.length,1);assert.equal(data.products.length,1);assert.ok(!JSON.stringify(data).includes('secret'));
    await store.update('source',{revision:1,reason:'Rewording',publicText:'Changed'});
    data=await store.publicContent();assert.equal(data.claims.length,0);assert.equal(data.products.length,0);
    await assert.rejects(store.update('source',{revision:1,reason:'Stale',status:'approved'}),/Revision conflict/);
    await assert.rejects(store.update('held',{revision:1,reason:'No source',status:'approved'}),/public source/);
    await store.update('source',{revision:2,reason:'Reviewed',status:'approved'});
    await store.initialize({...seed,claims:[...seed.claims,{id:'new-source',status:'approved',publicText:'New fact',sources:[{url:'https://example.com/new'}]}]});
    data=await store.publicContent();assert.equal(data.claims.find(c=>c.id==='source').publicText,'Changed');assert.ok(data.claims.find(c=>c.id==='new-source'));
    assert.equal((await store.history()).filter(i=>i.content_id==='source').length,3);
    // A failure in the second statement must roll back the audit insert.
    const before=(await store.history()).length;
    await assert.rejects(db.batch([db.prepare('INSERT INTO audit(content_id,revision,reason,current,created_at) VALUES(?,?,?,?,?)').bind('rollback',1,'test','{}','now'),db.prepare('INSERT INTO content(id,kind,data) VALUES(?,?,?)').bind('source','claim','{}')]));
    assert.equal((await store.history()).length,before);
    const raced=await Promise.allSettled([store.update('source',{revision:3,reason:'Editor A',publicText:'A'}),store.update('source',{revision:3,reason:'Editor B',publicText:'B'})]);
    assert.equal(raced.filter(r=>r.status==='fulfilled').length,1);assert.equal(raced.filter(r=>r.status==='rejected' && r.reason.status===409).length,1);
    assert.equal((await store.history()).filter(i=>i.content_id==='source').length,4);
  }finally{db.close();}
});

test('D1 anonymous funnels, event deduplication and no health properties',async()=>{
  const db=new MockD1();const store=createStore(db);
  try {
    await store.initialize(seed);const a=randomUUID(),b=randomUUID();
    const send=(flowId,name)=>store.event({eventId:randomUUID(),flowId,name});
    await send(a,'landing_view');await send(a,'rhythm_check_started');await send(a,'rhythm_check_completed');
    await send(b,'landing_view');await send(b,'rhythm_check_started');
    const event={eventId:randomUUID(),flowId:a,name:'purchase_outbound_clicked',properties:{productId:'gaba1500',answers:['private'],email:'private@example.com'}};
    await store.event(event);assert.equal((await store.event(event)).duplicate,true);
    await assert.rejects(store.event({...event,eventId:randomUUID(),name:'purchase_confirmed'}),/Invalid/);
    await assert.rejects(store.event({...event,eventId:randomUUID(),flowId:'private@example.com'}),/Invalid/);
    const stats=await store.analytics();assert.equal(stats.funnels[0].rate,1);assert.equal(stats.funnels[1].rate,.5);assert.equal(stats.funnels[2].rate,null);assert.equal(stats.actualPurchases.count,null);assert.equal(stats.returningVisitors.rate,null);
    const stored=await db.prepare('SELECT properties FROM events WHERE id=?').bind(event.eventId).first();assert.deepEqual(JSON.parse(stored.properties),{productId:'gaba1500'});
  }finally{db.close();}
});

test('Node and D1 sharing scopes use ordered unique flows and preserve unscoped historical events',async()=>{
  const db=new MockD1(),cloud=createStore(db),local=createNodeStore({dbPath:':memory:',seed});
  const empty=(id,path)=>({id,path,denominator:0,attemptFlows:0,attemptRate:null,requestedFlows:0,copiedFlows:0,downloadedFlows:0,cancelledFlows:0});
  const scopes=[empty('own_result','/result'),empty('incoming_result','/share'),empty('product_comparison','/products')];
  try{
    await cloud.initialize(seed);
    for(const store of [cloud,local]){
      assert.deepEqual((await store.analytics()).sharingMetrics,{scopes,unscopedShareEvents:0,confirmedDeliverySupported:false});
      const [a,b,c,d,e]=Array.from({length:5},()=>randomUUID());
      const send=async(flowId,name,path)=>{const event={eventId:randomUUID(),name,...(flowId?{flowId}:{}),properties:path?{path}:{}};await store.event(event);return event;};
      await send(a,'result_viewed','/result');await send(a,'result_viewed','/result');
      const duplicate=await send(a,'share_requested','/result');assert.equal((await store.event(duplicate)).duplicate,true);
      await send(a,'share_requested','/result');await send(a,'share_link_copied','/result');await send(a,'share_cancelled','/result');
      await send(a,'product_comparison_viewed','/products');await send(a,'share_requested','/products');
      await send(b,'result_viewed','/share');
      await send(c,'share_requested','/share');await send(c,'result_viewed','/share');
      await send(c,'share_link_copied','/products');await send(c,'product_comparison_viewed','/products');
      await send(d,'result_viewed','/share');await send(d,'share_image_downloaded','/share');await send(d,'share_image_downloaded','/share');await send(d,'share_cancelled','/share');
      await send(e,'result_viewed','/result');await send(e,'share_cancelled','/result');
      await send(null,'result_viewed','/result');await send(null,'share_requested','/result');
      await send(null,'share_requested');await send(a,'share_cancelled','/');await send(a,'share_image_generated');
      assert.deepEqual((await store.analytics()).sharingMetrics,{
        scopes:[
          {...scopes[0],denominator:2,attemptFlows:1,attemptRate:.5,requestedFlows:1,copiedFlows:1,cancelledFlows:2},
          {...scopes[1],denominator:3,attemptFlows:1,attemptRate:1/3,downloadedFlows:1,cancelledFlows:1},
          {...scopes[2],denominator:2,attemptFlows:1,attemptRate:.5,requestedFlows:1},
        ],unscopedShareEvents:2,confirmedDeliverySupported:false,
      });
    }
  }finally{db.close();local.close();}
});

test('Worker routes reject bad origin, auth, oversized bodies, rate limits and preserve API parity',async()=>{
  const DB=new MockD1();const token='a'.repeat(64);
  const env={DB,ADMIN_TOKEN:token,RATE_LIMITER:{limit:async()=>({success:true})},ASSETS:{fetch:async()=>new Response('asset')}};
  const call=(path,options={})=>worker.fetch(new Request(`https://site.example${path}`,options),env);
  try {
    assert.equal((await call('/api/content',{headers:{origin:'https://evil.example'}})).status,403);
    assert.equal((await call('/api/admin/content')).status,401);
    assert.equal((await call('/api/health',{headers:{origin:'https://site.example'}})).status,200);
    assert.equal((await call('/api/admin/content',{headers:{'x-admin-token':token}})).status,200);
    assert.equal((await call('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({padding:'x'.repeat(17000)})})).status,413);
    assert.equal((await call('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:'{'})).status,400);
    assert.equal((await call('/api/events',{method:'POST',headers:{'content-type':'text/plain'},body:'{}'})).status,415);
    assert.equal((await call('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({eventId:randomUUID(),flowId:randomUUID(),name:'landing_view',properties:{path:'/'}})})).status,202);
    assert.equal((await call('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({eventId:randomUUID(),flowId:randomUUID(),name:'purchase_question_opened',properties:{questionId:'amount',email:'private@example.com'}})})).status,202);
    assert.equal((await call('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({eventId:randomUUID(),name:'purchase_question_opened',properties:{questionId:'private'}})})).status,400);
    assert.equal(await (await call('/')).text(),'asset');
    env.RATE_LIMITER.limit=async()=>({success:false});assert.equal((await call('/api/health')).status,429);
    assert.equal((await worker.fetch(new Request('http://public.example/api/health'),env)).status,400);
  }finally{DB.close();}
});

test('Worker sandbox ops runs persist resumable state with a client key and isolate owners',async()=>{
  const DB=new MockD1();const env={DB,ADMIN_TOKEN:'c'.repeat(64),RATE_LIMITER:{limit:async()=>({success:true})},ASSETS:{fetch:async()=>new Response('asset')}};
  const runId=randomUUID(),runKey=randomUUID();
  const call=(options={})=>worker.fetch(new Request(`https://site.example/api/ops/runs/${runId}`,options),env);
  const state={input:'공개용 GABA 논문 기반 마스터 인덱스',plan:{contract:{goalId:'GMVP-GABA-TEST'}},audit:[],approvalTaskId:''};
  try {
    const saved=await call({method:'PUT',headers:{'content-type':'application/json','x-ops-run-key':runKey},body:JSON.stringify(state)});
    assert.equal(saved.status,200);const savedBody=await saved.json();assert.equal(savedBody.serverPersisted,true);assert.equal(savedBody.revision,1);
    const resumed=await call({headers:{'x-ops-run-key':runKey}});assert.equal(resumed.status,200);const resumedBody=await resumed.json();assert.deepEqual(resumedBody.state,state);assert.equal(resumedBody.auditCount,1);
    const changed={...state,input:'변경된 샌드박스 목표'};
    const stale=await call({method:'PUT',headers:{'content-type':'application/json','x-ops-run-key':runKey,'x-ops-revision':'0'},body:JSON.stringify(changed)});assert.equal(stale.status,409);
    const unchanged=await call({headers:{'x-ops-run-key':runKey}});const unchangedBody=await unchanged.json();assert.deepEqual(unchangedBody.state,state);assert.equal(unchangedBody.revision,1);
    const current=await call({method:'PUT',headers:{'content-type':'application/json','x-ops-run-key':runKey,'x-ops-revision':'1'},body:JSON.stringify(changed)});assert.equal(current.status,200);const currentBody=await current.json();assert.equal(currentBody.revision,2);
    const invalidState=async value=>worker.fetch(new Request(`https://site.example/api/ops/runs/${randomUUID()}`,{method:'PUT',headers:{'content-type':'application/json','x-ops-run-key':randomUUID()},body:JSON.stringify(value)}),env);
    assert.equal((await invalidState({...state,privatePath:'D:/private'})).status,400);
    assert.equal((await invalidState({...state,plan:{contract:{goalId:'GMVP-GABA-TEST'},tasks:[{id:'G1',title:'계약',state:'DONE',priority:1,dependencies:[],acceptance:['기준'],evidence:['sandbox-output:G1:now'],lead:'TF',verifier:'감사관'}]} })).status,400);
    assert.equal((await invalidState({...state,audit:[{id:'x',taskId:'G1',from:'BACKLOG',to:'DONE',note:'위조',createdAt:new Date().toISOString()}]})).status,400);
    const wrong=await call({headers:{'x-ops-run-key':randomUUID()}});assert.equal(wrong.status,404);
    const rejected=await call({method:'PUT',headers:{'content-type':'application/json','x-ops-run-key':randomUUID()},body:JSON.stringify(state)});assert.equal(rejected.status,403);
    const deleted=await call({method:'DELETE',headers:{'x-ops-run-key':runKey}});assert.equal(deleted.status,200);
    assert.equal((await call({headers:{'x-ops-run-key':runKey}})).status,404);
  } finally { DB.close(); }
});

test('Worker and Node expose only the approved Smart Store 1500 review destination, never private quotes',async()=>{
  const reviewedSeed={...seed,reviews:[{id:'shop-review-destination-1500',status:'approved',originalPublic:true,publicText:'스마트스토어 1500 후기 보기',sourceTitle:'스마트스토어 1500',sourceUrl:'https://smartstore.naver.com/cellpinda',limitations:['개인 경험'],holdReason:'internal',original:'PRIVATE ORIGINAL 1500'},{id:'private-review',status:'hold',publicText:'PRIVATE QUOTE',sourceUrl:null},{id:'unverified-review',status:'approved',publicText:'UNVERIFIED QUOTE',sourceUrl:'https://cellpinda.co.kr/'}]};
  const db=new MockD1();const cloud=createStore(db);const local=createNodeStore({dbPath:':memory:',seed:reviewedSeed});
  try{
    await cloud.initialize(reviewedSeed);
    for(const store of [cloud,local]){
      const data=await store.publicContent();assert.equal(data.reviews.length,1);assert.deepEqual(data.reviews.map(review=>review.id),['shop-review-destination-1500']);assert.ok(!JSON.stringify(data).includes('PRIVATE'));assert.ok(!JSON.stringify(data).includes('UNVERIFIED'));
      assert.ok(data.reviews.every(review=>review.publicText===REVIEW_DESTINATION_TEXT));
      await assert.rejects(async()=>store.update('shop-review-destination-1500',{revision:1,status:'approved',publicText:'UNVERIFIED QUOTATION',reason:'Attempt bypass 1500'}),/destination text is fixed/);
      await assert.rejects(async()=>store.update('private-review',{revision:1,status:'approved',reason:'Without permissions'}),/quote rights/);
      await store.update('shop-review-destination-1500',{revision:1,status:'hold',reason:'Withdraw destination'});assert.equal((await store.publicContent()).reviews.length,0);
      await store.update('shop-review-destination-1500',{revision:2,status:'approved',publicText:REVIEW_DESTINATION_TEXT,reason:'Restore fixed destination'});assert.equal((await store.publicContent()).reviews.length,1);
    }
  }finally{db.close();local.close();}
});

test('Persistent stores migrate an obsolete canonical review destination to Smart Store without touching quote reviews',async()=>{
  const canonical={id:'shop-review-destination-1500',status:'approved',originalPublic:true,publicText:'스마트스토어에서 가바 1500 구매자 후기와 다양한 사용 경험을 확인하세요.',sourceTitle:'셀핀다 스마트스토어 가바 1500 상품 후기',sourceUrl:'https://smartstore.naver.com/cellpinda',reviewedAt:'2026-09-10',limitations:['구매자 후기는 개인 경험이며 의학적 효능을 보장하지 않습니다.']};
  const stale={...canonical,publicText:'공식몰 1500 후기 보기',sourceTitle:'셀핀다 공식몰 가바 1500 상품 후기',sourceUrl:'https://cellpinda.co.kr/product/old'};
  const staleSeed={...seed,reviews:[stale,{id:'private-review',reviewType:'quote',status:'hold',publicText:'PRIVATE QUOTE',sourceUrl:null}]};
  const currentSeed={...seed,reviews:[canonical,{id:'private-review',reviewType:'quote',status:'hold',publicText:'PRIVATE QUOTE',sourceUrl:null}]};
  const db=new MockD1();const cloud=createStore(db);const directory=mkdtempSync(join(tmpdir(),'cellpinda-review-migration-'));const dbPath=join(directory,'db.sqlite');
  try {
    await cloud.initialize(staleSeed);
    await cloud.initialize(currentSeed);let output=await cloud.publicContent();assert.equal(output.reviews.length,1);assert.equal(output.reviews[0].sourceUrl,'https://smartstore.naver.com/cellpinda');
    const first=createNodeStore({dbPath,seed:staleSeed});first.close();
    const local=createNodeStore({dbPath,seed:currentSeed});output=local.publicContent();assert.equal(output.reviews.length,1);assert.equal(output.reviews[0].sourceUrl,'https://smartstore.naver.com/cellpinda');assert.equal(output.reviews[0].status,'approved');local.close();
  } finally {db.close();rmSync(directory,{recursive:true,force:true});}
});

test('Submitted quote workflow preserves revisions, resets confirmation, gates public output and blocks generic bypass',async()=>{
  const db=new MockD1(),cloud=createStore(db),local=createNodeStore({dbPath:':memory:',seed});
  const review=parseReviewDraft({productId:'gaba1500',authorLabel:'가상 테스트 작성자',sourceTitle:'테스트 출처',sourceUrl:'https://example.com/review-fixture',authoredAt:'2020-01-01',usagePeriod:'테스트 기간',quote:'가상 테스트 전용 후기',context:'테스트 맥락',disclosure:'테스트 제공관계',rightsEvidence:'PRIVATE RIGHTS',rightsScope:'PRIVATE SCOPE'});
  const confirmation={rightsConfirmed:true,contextConfirmed:true,disclosureConfirmed:true,publicationConfirmed:true,reviewer:'PRIVATE REVIEWER',reviewedAt:'2020-01-02',editorialNote:'PRIVATE NOTE'};
  try{
    await cloud.initialize(seed);
    for(const store of [cloud,local]){
      const created=await store.createReview({review,reason:'Create test fixture'});assert.equal(created.status,'hold');assert.equal(created.revision,1);
      assert.equal((await store.publicContent()).reviews.some(r=>r.id===created.id),false);
      await assert.rejects(async()=>store.update(created.id,{publicText:'bypass',status:'approved',revision:1,reason:'bypass'}),/dedicated review workflow/);
      await assert.rejects(async()=>store.decideReview(created.id,{status:'approved',revision:1,reason:'Missing confirmation'}),/confirmation/);
      const approved=await store.decideReview(created.id,{status:'approved',revision:1,reason:'Verified fixture',confirmation});assert.equal(approved.revision,2);
      let output=(await store.publicContent()).reviews.find(r=>r.id===created.id);assert.equal(output.reviewType,'quote');assert.ok(!JSON.stringify(output).includes('PRIVATE'));assert.equal(output.publicText,review.quote);
      await store.update('source',{revision:1,status:'hold',reason:'Product source withdrawn in test'});assert.equal((await store.publicContent()).reviews.some(r=>r.id===created.id),false);
      await store.update('source',{revision:2,status:'approved',reason:'Product source restored in test'});assert.equal((await store.publicContent()).reviews.some(r=>r.id===created.id),true);
      await assert.rejects(async()=>store.editReview(created.id,{review,revision:1,reason:'Stale'}),/Revision conflict/);
      const edited=await store.editReview(created.id,{review:{...review,quote:'Revised test fixture'},revision:2,reason:'Changed quote'});assert.equal(edited.status,'hold');assert.equal(edited.reviewConfirmation,undefined);
      await store.decideReview(created.id,{status:'approved',revision:3,reason:'Rechecked fixture',confirmation});
      const held=await store.decideReview(created.id,{status:'hold',revision:4,reason:'Withdraw fixture'});assert.equal(held.reviewConfirmation,undefined);assert.equal((await store.publicContent()).reviews.some(r=>r.id===created.id),false);
      assert.equal((await store.history()).filter(row=>row.content_id===created.id).length,5);
      const expired=await store.createReview({review:{...review,rightsExpiresAt:'2020-01-03'},reason:'Expired fixture'});
      await assert.rejects(async()=>store.decideReview(expired.id,{status:'approved',revision:1,reason:'Expired test',confirmation}),/rightsExpired/);
    }
    const item=await cloud.createReview({review,reason:'Concurrent fixture'});
    const edits=await Promise.allSettled([cloud.editReview(item.id,{review,revision:1,reason:'Editor A'}),cloud.editReview(item.id,{review,revision:1,reason:'Editor B'})]);
    assert.equal(edits.filter(e=>e.status==='fulfilled').length,1);assert.equal(edits.filter(e=>e.status==='rejected' && e.reason.status===409).length,1);
    assert.equal((await cloud.history()).filter(row=>row.content_id===item.id).length,2);
  }finally{db.close();local.close();}
});

test('Worker review endpoints need admin authentication and permit bounded Korean drafts above 16 KiB only on draft routes',async()=>{
  const DB=new MockD1(),token='b'.repeat(64),env={DB,ADMIN_TOKEN:token,RATE_LIMITER:{limit:async()=>({success:true})},ASSETS:{fetch:async()=>new Response('asset')}};
  const payload={review:{quote:'가'.repeat(3000),context:'나'.repeat(2000),rightsEvidence:'다'.repeat(2000)},reason:'Large synthetic test draft'};
  const request=(path,body,authorized=true)=>worker.fetch(new Request(`https://site.example${path}`,{method:'POST',headers:{'content-type':'application/json',...(authorized?{'x-admin-token':token}:{})},body:JSON.stringify(body)}),env);
  try{
    assert.equal((await request('/api/admin/reviews',payload,false)).status,401);
    assert.equal((await request('/api/admin/reviews',payload)).status,201);
    assert.equal((await request('/api/events',payload)).status,413);
    assert.equal((await request('/api/admin/reviews',{...payload,padding:'x'.repeat(66000)})).status,413);
  }finally{DB.close();}
});
