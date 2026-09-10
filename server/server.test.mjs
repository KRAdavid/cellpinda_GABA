import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, basename } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import { createApi } from './index.mjs';
import { createStore } from './store.mjs';

const seed={claims:[{id:'source',status:'approved',publicText:'Verified text',sources:[{title:'Public',url:'https://example.com/source'},{title:'private.pdf',url:null}],holdReason:'PRIVATE'},{id:'hidden',status:'hold',publicText:'SECRET',sources:[]}],products:[{id:'gaba1500',status:'approved',sourceIds:['source'],name:'Product'}]};
test('Persistent approval, privacy, events and authenticated local API',async()=>{
  const directory=mkdtempSync(join(tmpdir(),'cellpinda-api-'));
  const options={dbPath:join(directory,'db.sqlite'),tokenPath:join(directory,'token'),seed};
  let api=createApi(options); let running=false;
  const start=async()=>{api.server.listen(0,'127.0.0.1');await once(api.server,'listening');running=true;return `http://127.0.0.1:${api.server.address().port}`;};
  const stop=async()=>{api.server.close();await once(api.server,'close');running=false;};
  try {
    let base=await start();
    let token=readFileSync(options.tokenPath,'utf8');
    const patch=(body,credential=token)=>fetch(`${base}/api/admin/content/source`,{method:'PATCH',headers:{'content-type':'application/json','x-admin-token':credential},body:JSON.stringify(body)});
    let response=await fetch(`${base}/api/content`);let data=await response.json();
    assert.equal(data.claims.length,1);assert.equal(data.products.length,1);assert.equal(data.claims[0].sources.length,1);assert.ok(!JSON.stringify(data).includes('PRIVATE'));
    assert.equal((await fetch(`${base}/api/admin/content`)).status,401);
    assert.equal((await patch({revision:1,reason:'edit',publicText:'Changed'},'wrong')).status,401);
    assert.equal((await fetch(`${base}/api/content`,{headers:{origin:'https://evil.example'}})).status,403);
    for(const origin of ['http://localhost:5173','http://127.0.0.1:5173','http://localhost:4173','http://127.0.0.1:4173']) {
      const cors=await fetch(`${base}/api/content`,{headers:{origin}});assert.equal(cors.status,200);assert.equal(cors.headers.get('access-control-allow-origin'),origin);
    }
    for(const origin of ['http://127.0.0.1:5174','https://localhost:5173','http://localhost:5173.evil.example']) assert.equal((await fetch(`${base}/api/content`,{headers:{origin}})).status,403);
    assert.equal((await patch({revision:1,publicText:'Changed'})).status,400);
    response=await patch({revision:1,reason:'Changed copy requires review',publicText:'Changed'});assert.equal(response.status,200);assert.equal((await response.json()).status,'hold');
    data=await (await fetch(`${base}/api/content`)).json();assert.equal(data.claims.length,0);assert.equal(data.products.length,0);
    assert.equal((await patch({revision:1,reason:'Stale',status:'approved'})).status,409);
    assert.equal((await patch({revision:2,reason:'Reviewed',status:'approved'})).status,200);
    response=await fetch(`${base}/api/admin/content/hidden`,{method:'PATCH',headers:{'content-type':'application/json','x-admin-token':token},body:JSON.stringify({revision:1,reason:'No source',status:'approved'})});assert.equal(response.status,400);
    const event={eventId:randomUUID(),name:'purchase_outbound_clicked',properties:{productId:'gaba1500',path:'/products',answers:['private'],type:'private',email:'private@example.com'}};
    const send=body=>fetch(`${base}/api/events`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
    assert.equal((await send(event)).status,202);assert.equal((await (await send(event)).json()).duplicate,true);
    assert.equal((await send({...event,eventId:randomUUID(),name:'purchase_confirmed'})).status,400);
    assert.equal((await send({...event,eventId:randomUUID(),properties:{path:'/products?email=private'}})).status,400);
    assert.equal((await send({eventId:randomUUID(),name:'landing_view',properties:{answers:'x'.repeat(17000)}})).status,413);
    await stop();
    api=createApi(options);base=await start();const oldToken=token;token=readFileSync(options.tokenPath,'utf8');assert.notEqual(oldToken,token);
    data=await (await fetch(`${base}/api/content`)).json();assert.equal(data.claims[0].publicText,'Changed');assert.equal(data.claims[0].revision,3);
    const analytics=await (await fetch(`${base}/api/admin/analytics`,{headers:{'x-admin-token':token}})).json();assert.equal(analytics.counts[0].count,1);assert.equal(analytics.actualPurchases.supported,false);assert.equal(analytics.actualPurchases.count,null);
    const history=await (await fetch(`${base}/api/admin/history`,{headers:{'x-admin-token':token}})).json();assert.ok(history.items.some(i=>i.reason==='Reviewed'));assert.ok(history.items.some(i=>i.reason==='Changed copy requires review'));
    const inspection=new DatabaseSync(options.dbPath,{readOnly:true});
    try { const stored=inspection.prepare('SELECT properties FROM events').all(); assert.deepEqual(JSON.parse(stored[0].properties),{productId:'gaba1500',path:'/products'}); } finally {inspection.close();}
  } finally { if(running)await stop();assert.equal(dirname(resolve(directory)),resolve(tmpdir()));assert.ok(basename(directory).startsWith('cellpinda-api-'));rmSync(directory,{recursive:true,force:true}); }
});

test('Rate limit rejects excess local requests',async()=>{
  const directory=mkdtempSync(join(tmpdir(),'cellpinda-api-'));
  const {server}=createApi({dbPath:join(directory,'db.sqlite'),tokenPath:join(directory,'token'),seed,rateLimit:2});
  try {
    server.listen(0,'127.0.0.1');await once(server,'listening');
    const base=`http://127.0.0.1:${server.address().port}`;
    assert.equal((await fetch(`${base}/api/health`)).status,200);
    assert.equal((await fetch(`${base}/api/health`)).status,200);
    assert.equal((await fetch(`${base}/api/health`)).status,429);
  } finally {server.close();await once(server,'close');assert.equal(dirname(resolve(directory)),resolve(tmpdir()));assert.ok(basename(directory).startsWith('cellpinda-api-'));rmSync(directory,{recursive:true,force:true});}
});

test('Purchase decision events preserve only approved question identifiers',()=>{
  const store=createStore({dbPath:':memory:',seed});
  try {
    store.event({eventId:randomUUID(),flowId:randomUUID(),name:'purchase_question_opened',properties:{questionId:'amount',email:'private@example.com'}});
    assert.equal(store.analytics().counts.find(event=>event.name==='purchase_question_opened').count,1);
    assert.throws(()=>store.event({eventId:randomUUID(),name:'purchase_question_opened',properties:{questionId:'private'}}),/Invalid question/);
  } finally { store.close(); }
});

test('Anonymous flow funnels preserve denominators, ordering and duplicate protection',()=>{
  const store=createStore({dbPath:':memory:',seed});
  try {
    const a=randomUUID(),b=randomUUID(),c=randomUUID();
    const send=(flowId,name)=>{const event={eventId:randomUUID(),flowId,name};store.event(event);return event;};
    send(a,'landing_view');send(a,'landing_view');const started=send(a,'rhythm_check_started');store.event(started);send(a,'rhythm_check_completed');send(a,'rhythm_check_completed');
    send(b,'landing_view');send(b,'rhythm_check_started');
    send(c,'rhythm_check_completed');send(c,'rhythm_check_started');
    send(a,'result_viewed');send(a,'gaba_story_viewed');send(b,'result_viewed');
    send(a,'product_comparison_viewed');send(a,'purchase_outbound_clicked');send(b,'product_comparison_viewed');
    store.event({eventId:randomUUID(),name:'landing_view'});
    assert.throws(()=>store.event({eventId:randomUUID(),flowId:'personal@example.com',name:'landing_view'}),/Invalid anonymous flow/);
    const stats=store.analytics();
    assert.deepEqual(stats.funnels.map(({denominator,numerator,rate})=>({denominator,numerator,rate})),[{denominator:2,numerator:2,rate:1},{denominator:3,numerator:1,rate:1/3},{denominator:2,numerator:1,rate:.5},{denominator:2,numerator:1,rate:.5}]);
    assert.equal(stats.coverage.eventsWithoutFlow,1);assert.equal(stats.coverage.distinctFlows,3);
    assert.equal(stats.counts.find(e=>e.name==='rhythm_check_started').count,3);
    assert.equal(stats.sharing.requestToLandingRate.rate,null);assert.equal(stats.actualPurchases.count,null);assert.equal(stats.returningVisitors.rate,null);
  } finally {store.close();}
});

test('Legacy DB gains flow column without removing existing events, and metadata allowlist protects public export',()=>{
  const directory=mkdtempSync(join(tmpdir(),'cellpinda-api-'));const dbPath=join(directory,'db.sqlite');
  let store;
  try {
    const legacy=new DatabaseSync(dbPath);
    legacy.exec('CREATE TABLE events(id TEXT PRIMARY KEY,name TEXT NOT NULL,properties TEXT NOT NULL,created_at TEXT NOT NULL)');
    legacy.prepare('INSERT INTO events VALUES(?,?,?,?)').run(randomUUID(),'landing_view','{}','2026-01-01T00:00:00.000Z');legacy.close();
    store=createStore({dbPath,seed:{...seed,claims:[{...seed.claims[0],metadata:{studyType:'Randomized trial',limitations:['Small sample'],productApplicability:'Not this product',privatePath:'C:/secret',answers:['secret']}}]}});
    assert.equal(store.analytics().coverage.eventsWithoutFlow,1);assert.equal(store.analytics().counts[0].count,1);assert.equal(store.analytics().funnels[0].rate,null);
    assert.deepEqual(store.publicContent().claims[0].metadata,{studyType:'Randomized trial',limitations:['Small sample'],productApplicability:'Not this product'});
    store.event({eventId:randomUUID(),flowId:randomUUID(),name:'landing_view'});assert.equal(store.analytics().counts[0].count,2);
  } finally {store?.close();assert.equal(dirname(resolve(directory)),resolve(tmpdir()));assert.ok(basename(directory).startsWith('cellpinda-api-'));rmSync(directory,{recursive:true,force:true});}
});
