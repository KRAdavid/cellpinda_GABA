import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import { dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

// Real workerd + local D1 HTTP integration. No remote account or existing DB is used.
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const parent=resolve(root,'tmp');mkdirSync(parent,{recursive:true});
const directory=mkdtempSync(resolve(parent,'reviews-d1-'));
const config=JSON.parse(readFileSync(resolve(root,'wrangler.jsonc'),'utf8'));
const token=randomBytes(32).toString('hex');
config.main=resolve(root,'worker/index.ts');
config.assets.directory=resolve(root,'dist');
config.d1_databases=[{binding:'DB',database_name:'isolated-review-test'}];
writeFileSync(resolve(directory,'wrangler.json'),JSON.stringify(config));
writeFileSync(resolve(directory,'.dev.vars'),`ADMIN_TOKEN=${token}\nMEMBER_ORIGIN=\n`);
let child,exitPromise,origin,output='';
const cleanEnv=Object.fromEntries(Object.entries(process.env).filter(([key])=>!/(TOKEN|SECRET|PASSWORD|API_KEY)/i.test(key)));

async function freePort(){const server=createServer();server.listen(0,'127.0.0.1');await once(server,'listening');const port=server.address().port;await new Promise(resolve=>server.close(resolve));return port;}
async function stop(){
  if(!child)return;
  if(child.exitCode===null && child.signalCode===null){
    if(process.platform==='win32'){
      const killer=spawn('taskkill',['/PID',String(child.pid),'/T','/F'],{windowsHide:true,stdio:'ignore'});
      await once(killer,'exit');
    }else process.kill(-child.pid,'SIGTERM');
  }
  await exitPromise;child=undefined;
}
async function start(){
  const port=await freePort();origin=`http://127.0.0.1:${port}`;output='';
  child=spawn(process.execPath,[resolve(root,'node_modules/wrangler/bin/wrangler.js'),'dev','--config',resolve(directory,'wrangler.json'),'--local','--ip','127.0.0.1','--port',String(port),'--inspector-port','0','--persist-to',resolve(directory,'state'),'--log-level','error'],{
    cwd:directory,windowsHide:true,detached:process.platform!=='win32',env:{...cleanEnv,CI:'true',WRANGLER_SEND_METRICS:'false'},stdio:['ignore','pipe','pipe'],
  });
  exitPromise=once(child,'close');
  for(const stream of [child.stdout,child.stderr])stream.on('data',chunk=>{output=(output+chunk.toString()).slice(-12000);});
  const deadline=Date.now()+45000;
  while(Date.now()<deadline){
    if(child.exitCode!==null || child.signalCode!==null)throw Error(`Wrangler stopped: ${output.replaceAll(token,'[redacted]')}`);
    try{const response=await fetch(origin+'/api/health',{signal:AbortSignal.timeout(1000)});if(response.ok){assert.equal((await response.json()).persistence,'cloudflare-d1');return;}}catch{}
    await delay(250);
  }
  throw Error(`Local D1 startup timed out: ${output.replaceAll(token,'[redacted]')}`);
}
async function request(path,{method='GET',body,authenticated=true,headers={}}={}){
  const response=await fetch(origin+path,{method,headers:{...(authenticated?{'x-admin-token':token}:{}),...(body?{'content-type':'application/json'}:{}),...headers},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(10000)});
  return {status:response.status,data:await response.json()};
}
async function ok(path,options,status=200){const result=await request(path,options);assert.equal(result.status,status,JSON.stringify(result.data));return result.data;}
const review={productId:'gaba1500',authorLabel:'TEST 가상 작성자',sourceTitle:'TEST 원문',sourceUrl:'https://example.com/test-only-review',authoredAt:'2020-01-01',usagePeriod:'',quote:'TEST 가상 후기 — 실제 고객 경험 아님',context:'TEST 격리 환경',disclosure:'TEST 제공 관계',rightsEvidence:'PRIVATE TEST RIGHTS',rightsScope:'PRIVATE TEST SCOPE',rightsExpiresAt:''};
const confirmation={rightsConfirmed:true,contextConfirmed:true,disclosureConfirmed:true,publicationConfirmed:true,reviewer:'PRIVATE TEST REVIEWER',reviewedAt:'2020-01-02',editorialNote:'PRIVATE TEST NOTE'};

try{
  await start();
  assert.equal((await request('/api/admin/content',{authenticated:false})).status,401);
  assert.equal((await request('/api/admin/reviews',{method:'POST',body:{review,reason:'TEST'},headers:{origin:'https://example.com'}})).status,403);
  const initial=await ok('/api/content');assert.ok(initial.products.some(p=>p.id==='gaba1500'));
  const item=await ok('/api/admin/reviews',{method:'POST',body:{review,reason:'TEST draft'}},201);
  const path=`/api/admin/reviews/${item.id}`;
  const findPublic=async()=> (await ok('/api/content')).reviews.find(r=>r.id===item.id);
  assert.equal(await findPublic(),undefined);
  assert.equal((await request(`/api/admin/content/${item.id}`,{method:'PATCH',body:{status:'approved',revision:1,reason:'TEST bypass'}})).status,400);
  assert.equal((await request(path+'/decision',{method:'POST',body:{status:'approved',revision:1,reason:'TEST missing confirmation'}})).status,400);
  await ok(path+'/decision',{method:'POST',body:{status:'approved',revision:1,reason:'TEST checked',confirmation}});
  const visible=await findPublic();assert.equal(visible.publicText,review.quote);assert.ok(!JSON.stringify(visible).includes('PRIVATE'));
  const product=initial.products.find(p=>p.id==='gaba1500');
  await ok('/api/admin/content/gaba1500',{method:'PATCH',body:{status:'hold',revision:product.revision,reason:'TEST product withdrawn'}});
  assert.equal(await findPublic(),undefined);
  await ok('/api/admin/content/gaba1500',{method:'PATCH',body:{status:'approved',revision:product.revision+1,reason:'TEST product restored'}});
  assert.equal((await findPublic()).publicText,review.quote);
  const destination=(await ok('/api/admin/content')).items.find(i=>i.id==='shop-review-destination-1500');
  assert.ok(destination);
  assert.equal((await request('/api/admin/content/shop-review-destination-1500',{method:'PATCH',body:{publicText:'TEST unreviewed quotation bypass',revision:destination.revision,reason:'TEST bypass'}})).status,400);
  assert.equal((await ok('/api/content')).reviews.find(r=>r.id===destination.id).publicText,initial.reviews.find(r=>r.id===destination.id).publicText);
  // The same revision may be committed once, even through concurrent HTTP requests.
  const race=await Promise.all(['A','B'].map(label=>request(path,{method:'PATCH',body:{review:{...review,quote:`TEST edit ${label}`},revision:2,reason:`TEST editor ${label}`}})));
  assert.deepEqual(race.map(r=>r.status).sort(),[200,409]);
  const winner=race.find(r=>r.status===200).data;
  assert.equal(winner.revision,3);assert.equal(winner.status,'hold');assert.equal(winner.reviewConfirmation,undefined);assert.equal(await findPublic(),undefined);
  const history=async()=> (await ok('/api/admin/history')).items.filter(r=>r.content_id===item.id);
  assert.deepEqual((await history()).map(r=>r.revision),[3,2,1]);
  await ok(path+'/decision',{method:'POST',body:{status:'approved',revision:3,reason:'TEST rechecked',confirmation}});
  await stop();await start();
  assert.equal((await findPublic()).publicText,winner.publicText);
  assert.deepEqual((await history()).map(r=>r.revision),[4,3,2,1]);
  await ok(path+'/decision',{method:'POST',body:{status:'hold',revision:4,reason:'TEST withdraw'}});
  assert.equal(await findPublic(),undefined);
  assert.equal((await request(path+'/decision',{method:'POST',body:{status:'approved',revision:4,reason:'TEST stale approval',confirmation}})).status,409);
  const expired=await ok('/api/admin/reviews',{method:'POST',body:{review:{...review,rightsExpiresAt:'2020-01-03'},reason:'TEST expired rights'}},201);
  const denied=await request(`/api/admin/reviews/${expired.id}/decision`,{method:'POST',body:{status:'approved',revision:1,reason:'TEST expired approval',confirmation}});
  assert.equal(denied.status,400);assert.match(denied.data.error,/rightsExpired/);
  assert.deepEqual((await history()).map(r=>r.revision),[5,4,3,2,1]);
  console.log('Local workerd/D1 review integration passed: authentication, draft isolation, approval, private projection, concurrent revision conflict, restart persistence, withdrawal, expired rights, audit continuity. No customer quotations or remote database used.');
}finally{
  await stop();
  const within=relative(parent,directory);
  assert.ok(within && !within.startsWith('..'+sep) && !within.includes(sep),'Refuse cleanup outside isolated test directory');
  await rm(directory,{recursive:true,force:true,maxRetries:10,retryDelay:200});
}
