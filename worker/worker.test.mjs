import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import worker from './index.ts';
import { createStore } from './store.ts';
import { createStore as createNodeStore } from '../server/store.mjs';

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
const seed={claims:[{id:'source',status:'approved',publicText:'Public fact',sources:[{title:'Source',url:'https://example.com'}],metadata:{sampleSize:'40',productApplicability:'Not a product study',privatePath:'secret'}},{id:'held',status:'hold',publicText:'SECRET',sources:[]}],products:[{id:'gaba750',status:'approved',sourceIds:['source'],name:'Product'}]};

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
    const event={eventId:randomUUID(),flowId:a,name:'purchase_outbound_clicked',properties:{productId:'gaba750',answers:['private'],email:'private@example.com'}};
    await store.event(event);assert.equal((await store.event(event)).duplicate,true);
    await assert.rejects(store.event({...event,eventId:randomUUID(),name:'purchase_confirmed'}),/Invalid/);
    await assert.rejects(store.event({...event,eventId:randomUUID(),flowId:'private@example.com'}),/Invalid/);
    const stats=await store.analytics();assert.equal(stats.funnels[0].rate,1);assert.equal(stats.funnels[1].rate,.5);assert.equal(stats.funnels[2].rate,null);assert.equal(stats.actualPurchases.count,null);assert.equal(stats.returningVisitors.rate,null);
    const stored=await db.prepare('SELECT properties FROM events WHERE id=?').bind(event.eventId).first();assert.deepEqual(JSON.parse(stored.properties),{productId:'gaba750'});
  }finally{db.close();}
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
    assert.equal(await (await call('/')).text(),'asset');
    env.RATE_LIMITER.limit=async()=>({success:false});assert.equal((await call('/api/health')).status,429);
    assert.equal((await worker.fetch(new Request('http://public.example/api/health'),env)).status,400);
  }finally{DB.close();}
});

test('Worker and Node expose only approved official review destination, never private quotes',async()=>{
  const reviewedSeed={...seed,reviews:[{id:'shop-review-destination',status:'approved',originalPublic:true,publicText:'공식몰 후기 보기',sourceTitle:'공식몰',sourceUrl:'https://cellpinda.co.kr/product/detail.html?product_no=39',limitations:['개인 경험'],holdReason:'internal',original:'PRIVATE ORIGINAL'},{id:'private-review',status:'hold',publicText:'PRIVATE QUOTE',sourceUrl:null},{id:'unverified-review',status:'approved',publicText:'UNVERIFIED QUOTE',sourceUrl:'https://cellpinda.co.kr/'}]};
  const db=new MockD1();const cloud=createStore(db);const local=createNodeStore({dbPath:':memory:',seed:reviewedSeed});
  try{
    await cloud.initialize(reviewedSeed);
    for(const store of [cloud,local]){
      const data=await store.publicContent();assert.equal(data.reviews.length,1);assert.equal(data.reviews[0].id,'shop-review-destination');assert.ok(!JSON.stringify(data).includes('PRIVATE'));assert.ok(!JSON.stringify(data).includes('UNVERIFIED'));
      await assert.rejects(async()=>store.update('private-review',{revision:1,status:'approved',reason:'Without permissions'}),/quote rights/);
      await store.update('shop-review-destination',{revision:1,status:'hold',reason:'Withdraw destination'});assert.equal((await store.publicContent()).reviews.length,0);
    }
  }finally{db.close();local.close();}
});
