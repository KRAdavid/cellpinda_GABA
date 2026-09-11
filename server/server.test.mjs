import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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

test('Existing local content reconciles retired products and stale public copy',()=>{
  const directory=mkdtempSync(join(tmpdir(),'cellpinda-api-'));const dbPath=join(directory,'db.sqlite');
  const legacySeed={
    claims:[
      {id:'product-750',status:'approved',publicText:'셀핀다 가바 750 mg × 30포 구성이 공식몰에 등록되어 있습니다.',sources:[{title:'Legacy',url:'https://cellpinda.co.kr/product/750'}]},
      {id:'product-1500',status:'approved',publicText:'셀핀다 가바 1,500 mg × 30포 구성이 공식몰에 등록되어 있습니다.',sources:[{title:'Legacy',url:'https://cellpinda.co.kr/product/1500'}]},
      {id:'research-review-2020',status:'approved',publicText:'스트레스 근거는 제한적, 수면 근거는 매우 제한적으로 평가됐습니다.',sources:[{title:'Review',url:'https://example.com/review'}],metadata:{consumerSummary:'다만 GABA만의 효과인지는 알 수 없습니다.'}},
    ],
    products:[
      {id:'gaba750',name:'셀핀다 가바 750',amountMg:750,servings:30,totalG:22.5,officialUrl:'https://cellpinda.co.kr/product/750',availability:'공식몰에서 확인',priceDisplay:19000,status:'approved',sourceIds:['product-750']},
      {id:'gaba1500',name:'셀핀다 가바 1500',amountMg:1500,servings:30,totalG:45,officialUrl:'https://cellpinda.co.kr/product/1500',availability:'공식몰에서 확인',priceDisplay:19000,status:'approved',sourceIds:['product-1500']},
    ],reviews:[],
  };
  const currentSeed={
    claims:[
      {id:'product-1500',status:'approved',publicText:'셀핀다 가바 1,500 mg × 30포 구성이 판매 제품으로 확인됩니다.',sources:[{title:'Smart Store',url:'https://smartstore.naver.com/cellpinda/products/4701017202'}]},
      {id:'research-review-2020',status:'approved',publicText:'2020년 체계적 문헌고찰은 경구 GABA와 스트레스·수면을 다룬 14개 연구를 모아, 연구별 질문과 조건을 비교했습니다.',sources:[{title:'Review',url:'https://example.com/review'}],metadata:{consumerSummary:'14개 연구에서 스트레스와 수면 관련 지표를 살펴본 자료예요.'}},
    ],
    products:[{id:'gaba1500',name:'셀핀다 가바 1500',amountMg:1500,servings:30,totalG:45,officialUrl:'https://smartstore.naver.com/cellpinda/products/4701017202',availability:'스마트스토어에서 재고 확인',priceDisplay:null,status:'approved',sourceIds:['product-1500']}],
    reviews:[],
  };
  let store=createStore({dbPath,seed:legacySeed});store.close();
  try {
    store=createStore({dbPath,seed:currentSeed});
    const publicContent=store.publicContent();
    assert.deepEqual(publicContent.products.map(item=>({id:item.id,url:item.officialUrl})),[{id:'gaba1500',url:'https://smartstore.naver.com/cellpinda/products/4701017202'}]);
    assert.equal(JSON.stringify(publicContent).includes('750'),false);
    assert.equal(JSON.stringify(publicContent).includes('제한적'),false);
    const retired=store.adminContent().find(item=>item.id==='gaba750');
    assert.equal(retired.status,'hold');
    assert.equal(store.adminContent().find(item=>item.id==='gaba1500').priceDisplay,19000);
    assert.ok(store.history().some(item=>item.reason.includes('Current source ledger reconciliation')));
  } finally {store?.close();assert.equal(dirname(resolve(directory)),resolve(tmpdir()));assert.ok(basename(directory).startsWith('cellpinda-api-'));rmSync(directory,{recursive:true,force:true});}
});

test('Local seed claims refresh consumer copy without overwriting reviewed edits',()=>{
  const directory=mkdtempSync(join(tmpdir(),'cellpinda-api-'));const dbPath=join(directory,'db.sqlite');
  const legacySeed={claims:[
    {id:'gaba-definition',status:'approved',publicText:'GABA는 뇌에서 신호를 억제하는 물질입니다.',sources:[{title:'GABA source',url:'https://example.com/gaba'}]},
    {id:'reviewed-claim',status:'approved',publicText:'운영자가 검토한 문구',sources:[{title:'Reviewed source',url:'https://example.com/reviewed'}]},
  ],products:[],reviews:[]};
  const currentSeed={claims:[
    {id:'gaba-definition',status:'approved',publicText:'GABA는 신경 신호의 강도를 조절하는 데 관여합니다.',sources:[{title:'GABA source',url:'https://example.com/gaba'}],metadata:{consumerSummary:'몸 안에서 신경 신호의 균형을 살펴보는 자료예요.'}},
    {id:'reviewed-claim',status:'approved',publicText:'새 원장 문구',sources:[{title:'Reviewed source',url:'https://example.com/reviewed'}]},
  ],products:[],reviews:[]};
    const nextSeed={claims:[
      {id:'gaba-definition',status:'approved',publicText:'GABA는 신경 신호가 지나치게 이어지지 않도록 강도를 조절하는 데 관여합니다.',sources:[{title:'GABA source',url:'https://example.com/gaba'}],metadata:{consumerSummary:'몸 안에서 신경 신호의 균형을 살펴보는 자료예요.'}},
      {id:'reviewed-claim',status:'approved',publicText:'다음 원장 문구',sources:[{title:'Reviewed source',url:'https://example.com/reviewed'}]},
    ],products:[],reviews:[]};
  let store;
  try {
    store=createStore({dbPath,seed:legacySeed});
    store.update('reviewed-claim',{revision:1,reason:'Reviewed copy',publicText:'운영자가 검토한 문구 v2',status:'approved'});
    store.close();
    store=createStore({dbPath,seed:currentSeed});
    const claims=new Map(store.publicContent().claims.map(item=>[item.id,item]));
    assert.equal(claims.get('gaba-definition').publicText,currentSeed.claims[0].publicText);
    assert.deepEqual(claims.get('gaba-definition').metadata,currentSeed.claims[0].metadata);
    assert.equal(claims.get('reviewed-claim').publicText,'운영자가 검토한 문구 v2');
    assert.ok(store.history().some(item=>item.reason.includes('refreshed seed claim fields')));
    store.close();
    store=createStore({dbPath,seed:nextSeed});
    const nextClaims=new Map(store.publicContent().claims.map(item=>[item.id,item]));
    assert.equal(nextClaims.get('gaba-definition').publicText,nextSeed.claims[0].publicText);
    assert.equal(nextClaims.get('reviewed-claim').publicText,'운영자가 검토한 문구 v2');
  } finally {store?.close();assert.equal(dirname(resolve(directory)),resolve(tmpdir()));assert.ok(basename(directory).startsWith('cellpinda-api-'));rmSync(directory,{recursive:true,force:true});}
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

test('Role-scoped admin credentials separate editing, review and approval actions',async()=>{
  const directory=mkdtempSync(join(tmpdir(),'cellpinda-api-'));
  const roleTokens={editor:'e'.repeat(64),reviewer:'r'.repeat(64),approver:'p'.repeat(64)};
  const options={dbPath:join(directory,'db.sqlite'),tokenPath:join(directory,'token'),seed,adminRoleTokens:roleTokens};
  const api=createApi(options);let running=false;
  const start=async()=>{api.server.listen(0,'127.0.0.1');await once(api.server,'listening');running=true;return `http://127.0.0.1:${api.server.address().port}`;};
  const stop=async()=>{api.server.close();await once(api.server,'close');running=false;};
  try {
    const base=await start();
    const call=(role,path,init={})=>fetch(`${base}/api/admin/${path}`,{...init,headers:{'content-type':'application/json','x-admin-token':roleTokens[role]}});
    let response=await call('editor','session');assert.equal(response.status,200);let session=await response.json();assert.equal(session.role,'editor');assert.ok(session.capabilities.includes('edit'));assert.ok(!session.capabilities.includes('approve'));
    response=await call('editor','content/source',{method:'PATCH',body:JSON.stringify({revision:1,reason:'Role edit',publicText:'Edited by editor'})});assert.equal(response.status,200);
    response=await call('editor','content/source',{method:'PATCH',body:JSON.stringify({revision:2,reason:'Role cannot approve',status:'approved'})});assert.equal(response.status,403);
    response=await call('reviewer','session');assert.equal((await response.json()).role,'reviewer');
    response=await call('reviewer','content/source',{method:'PATCH',body:JSON.stringify({revision:2,reason:'Role review',status:'hold'})});assert.equal(response.status,200);
    response=await call('reviewer','content/source',{method:'PATCH',body:JSON.stringify({revision:3,reason:'Role cannot approve',status:'approved'})});assert.equal(response.status,403);
    response=await call('approver','session');assert.equal((await response.json()).role,'approver');
    response=await call('approver','content/source',{method:'PATCH',body:JSON.stringify({revision:3,reason:'Role approve',status:'approved'})});assert.equal(response.status,200);
    response=await call('approver','content/source',{method:'PATCH',body:JSON.stringify({revision:4,reason:'Approver cannot edit',publicText:'Blocked edit'})});assert.equal(response.status,403);
    response=await fetch(`${base}/api/admin/session`,{headers:{'x-admin-token':'x'.repeat(64)}});assert.equal(response.status,401);
    const legacy=readFileSync(options.tokenPath,'utf8');response=await fetch(`${base}/api/admin/session`,{headers:{'x-admin-token':legacy}});assert.equal(response.status,200);assert.equal((await response.json()).role,'operator');
  } finally { if(running)await stop(); assert.equal(dirname(resolve(directory)),resolve(tmpdir())); assert.ok(basename(directory).startsWith('cellpinda-api-')); rmSync(directory,{recursive:true,force:true}); }
});

test('Local API sandbox ops runs persist resumable state with a client key',async()=>{
  const directory=mkdtempSync(join(tmpdir(),'cellpinda-api-'));const {server}=createApi({dbPath:join(directory,'db.sqlite'),tokenPath:join(directory,'token'),seed});
  try {
    server.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}`;const runId=randomUUID(),runKey=randomUUID();
    const state={input:'공개용 GABA 논문 기반 마스터 인덱스',plan:{contract:{goalId:'GMVP-GABA-TEST'}},audit:[],approvalTaskId:''};
    let response=await fetch(`${base}/api/ops/runs/${runId}`,{method:'PUT',headers:{'content-type':'application/json','x-ops-run-key':runKey},body:JSON.stringify(state)});assert.equal(response.status,200);let body=await response.json();assert.equal(body.revision,1);assert.equal(body.serverPersisted,true);
    response=await fetch(`${base}/api/ops/runs/${runId}`,{headers:{'x-ops-run-key':runKey}});assert.equal(response.status,200);body=await response.json();assert.deepEqual(body.state,state);assert.equal(body.auditCount,1);
    const changed={...state,input:'변경된 샌드박스 목표'};
    response=await fetch(`${base}/api/ops/runs/${runId}`,{method:'PUT',headers:{'content-type':'application/json','x-ops-run-key':runKey,'x-ops-revision':'0'},body:JSON.stringify(changed)});assert.equal(response.status,409);
    response=await fetch(`${base}/api/ops/runs/${runId}`,{headers:{'x-ops-run-key':runKey}});body=await response.json();assert.deepEqual(body.state,state);assert.equal(body.revision,1);
    response=await fetch(`${base}/api/ops/runs/${runId}`,{method:'PUT',headers:{'content-type':'application/json','x-ops-run-key':runKey,'x-ops-revision':'1'},body:JSON.stringify(changed)});assert.equal(response.status,200);body=await response.json();assert.equal(body.revision,2);
    const invalidState=async value=>fetch(`${base}/api/ops/runs/${randomUUID()}`,{method:'PUT',headers:{'content-type':'application/json','x-ops-run-key':randomUUID()},body:JSON.stringify(value)});
    assert.equal((await invalidState({...state,privatePath:'D:/private'})).status,400);
    assert.equal((await invalidState({...state,plan:{contract:{goalId:'GMVP-GABA-TEST'},tasks:[{id:'G1',title:'계약',state:'DONE',priority:1,dependencies:[],acceptance:['기준'],evidence:['sandbox-output:G1:now'],lead:'TF',verifier:'감사관'}]} })).status,400);
    assert.equal((await invalidState({...state,audit:[{id:'x',taskId:'G1',from:'BACKLOG',to:'DONE',note:'위조',createdAt:new Date().toISOString()}]})).status,400);
    assert.equal((await fetch(`${base}/api/ops/runs/${runId}`,{headers:{'x-ops-run-key':randomUUID()}})).status,404);
    assert.equal((await fetch(`${base}/api/ops/runs/${runId}`,{method:'PUT',headers:{'content-type':'application/json','x-ops-run-key':randomUUID()},body:JSON.stringify(state)})).status,403);
    assert.equal((await fetch(`${base}/api/ops/runs/${runId}`,{method:'DELETE',headers:{'x-ops-run-key':runKey}})).status,200);
    assert.equal((await fetch(`${base}/api/ops/runs/${runId}`,{headers:{'x-ops-run-key':runKey}})).status,404);
  } finally {server.close();await once(server,'close');assert.equal(dirname(resolve(directory)),resolve(tmpdir()));assert.ok(basename(directory).startsWith('cellpinda-api-'));rmSync(directory,{recursive:true,force:true});}
});

test('Local ops audit endpoint exposes a private safe summary and omits raw input data',async()=>{
  const directory=mkdtempSync(join(tmpdir(),'cellpinda-api-'));
  const localAuditPath=join(directory,'local-goal-audit.json');
  writeFileSync(localAuditPath,JSON.stringify({
    generatedAt:'2026-09-11T00:00:00.000Z',goalId:'GL-2026-CELL-GABA-001',goalStatus:'ACTIVE',overallStatus:'IN_PROGRESS_WITH_GATES',coreValid:true,localStateChanged:true,localSnapshotHash:'local-hash',previousLocalSnapshotHash:'previous-local-hash',
    taskCounts:{DONE:8,VERIFYING:1,WAITING:4},pulseHealth:{generatedAt:'2026-09-11T00:00:00.000Z',snapshotHash:'hash',status:'fresh',ageMinutes:2},
    localInputAudit:{enabled:true,materials:{found:7,missing:0,finishedProductCandidates:5,b2Candidate:true,excludedBulkMaterial:1,latestSourceModifiedAt:'2026-07-08T01:20:11.865Z'},orders:{counters:{filesScanned:1086,csvFiles:77,xlsxFiles:100,xlsxEncrypted:457,xlsxUnparsed:552},gaba1500:{rows:114,quantity:121,firstDate:'2025-07-14',lastDate:'2025-12-26'},gaba750:{rows:64,quantity:72,firstDate:'2025-07-02',lastDate:'2025-12-24'},channelAssessment:'historical archive only',latestSourceModifiedAt:'2026-02-10T01:39:40.315Z'},interpretation:'private summary'},
    checks:[{id:'local-material-inputs',status:'MET',detail:'materials ok',blockers:[],evidence:['private/path']},{id:'local-order-inputs',status:'WAITING',detail:'orders wait',blockers:['private blocker'],evidence:['private/path']}],privatePath:'D:/secret',rawRows:[{email:'private@example.com'}]
  }));
  const {server}=createApi({dbPath:join(directory,'db.sqlite'),tokenPath:join(directory,'token'),localAuditPath,seed});
  try {
    server.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}`;
    let response=await fetch(`${base}/api/ops/local-audit`);assert.equal(response.status,200);const body=await response.json();
    assert.equal(body.mode,'private_local_audit');assert.equal(body.localStateChanged,true);assert.equal(body.localSnapshotHash,'local-hash');assert.equal(body.localInputAudit.materials.finishedProductCandidates,5);assert.equal(body.localInputAudit.orders.gaba1500.quantity,121);assert.equal(body.checks.length,2);assert.equal(body.privacyBoundary,'private_tmp_only');
    assert.equal(JSON.stringify(body).includes('D:/secret'),false);assert.equal(JSON.stringify(body).includes('private@example.com'),false);assert.equal(JSON.stringify(body).includes('private/path'),false);assert.equal(JSON.stringify(body).includes('rawRows'),false);
    rmSync(localAuditPath);response=await fetch(`${base}/api/ops/local-audit`);assert.equal(response.status,404);assert.equal((await response.json()).code,'LOCAL_AUDIT_MISSING');
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
    const publicContent=store.publicContent();
    assert.deepEqual(publicContent.claims[0].metadata,{studyType:'Randomized trial',productApplicability:'Not this product'});
    assert.ok(!JSON.stringify(publicContent).includes('Small sample'));
    store.event({eventId:randomUUID(),flowId:randomUUID(),name:'landing_view'});assert.equal(store.analytics().counts[0].count,2);
  } finally {store?.close();assert.equal(dirname(resolve(directory)),resolve(tmpdir()));assert.ok(basename(directory).startsWith('cellpinda-api-'));rmSync(directory,{recursive:true,force:true});}
});
