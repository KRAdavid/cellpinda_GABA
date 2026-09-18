import {existsSync, readFileSync, statSync} from 'node:fs';
import {resolve} from 'node:path';
import {parseAdminRoleTokens} from '../src/domain/admin-auth.ts';

const root=process.cwd();
const strict=process.argv.includes('--strict');
const requiredSecrets=['CLOUDFLARE_API_TOKEN','CLOUDFLARE_ACCOUNT_ID','CLOUDFLARE_D1_DATABASE_ID','ADMIN_TOKEN','MEMBER_ORIGIN'];
const checks=[];
const check=(id,ok,detail)=>checks.push({id,ok:Boolean(ok),detail});
const readJson=(file)=>JSON.parse(readFileSync(resolve(root,file),'utf8'));

try {
  const config=readJson('wrangler.jsonc');
  check('wrangler-main',config.main==='worker/index.ts',`main=${config.main ?? 'missing'}`);
  check('wrangler-assets',config.assets?.directory==='./dist' && config.assets?.binding==='ASSETS',`directory=${config.assets?.directory ?? 'missing'}, binding=${config.assets?.binding ?? 'missing'}`);
  check('wrangler-d1-binding',Array.isArray(config.d1_databases) && config.d1_databases[0]?.binding==='DB',`binding=${config.d1_databases?.[0]?.binding ?? 'missing'}`);
  check('wrangler-runtime-name',typeof config.name==='string' && config.name.length>0,`name=${config.name ?? 'missing'}`);
} catch (error) { check('wrangler-config',false,error instanceof Error ? error.message : 'invalid JSON'); }

for(const file of ['dist/index.html','dist/products/index.html','dist/data/content.json','dist/data/gaba-master-index.json','dist/assets/rhythm-window.webp']) check(`artifact:${file}`,existsSync(resolve(root,file)),'present after production build');
const privateSnapshots=['operations-queue.json','tf-pulse.json','goal-audit.json','tf-meeting-packet.json'];
const leakedSnapshots=privateSnapshots.filter(file=>existsSync(resolve(root,'dist/data',file)));
check('private-operations-snapshots-excluded',leakedSnapshots.length===0,leakedSnapshots.length ? `found=${leakedSnapshots.join(',')}` : `${privateSnapshots.length} internal files excluded from the public build`);
try { const bytes=statSync(resolve(root,'dist/assets/rhythm-window.webp')).size; check('hero-image-budget',bytes<=250_000,`${bytes} bytes (limit 250000)`); } catch { check('hero-image-budget',false,'optimized WebP hero image is missing'); }
for(const type of ['active','sleep','irregular','sensory','unrested','steady']) check(`artifact:dist/assets/social-rhythm-${type}.png`,existsSync(resolve(root,`dist/assets/social-rhythm-${type}.png`)),'result-specific social preview present');
try {
  const content=readJson('public/data/content.json');
  const master=readJson('public/data/gaba-master-index.json');
  const ledger=readJson('data/content-ledger.json');
  const queue=readJson('public/data/operations-queue.json');
  const audit=readJson('public/data/goal-audit.json');
  const meetingPacket=readJson('public/data/tf-meeting-packet.json');
  const taskGraph=readJson('data/task-graph.json');
  const approvedResearch=(ledger.claims || []).filter(item=>item.status==='approved' && item.id?.startsWith('research-'));
  const masterIds=new Set((master.records || []).map(record=>record.id));
  check('public-product-scope',content.products?.length===1 && content.products[0]?.id==='gaba1500' && !content.products.some(item => item.id === 'gaba750' || Number(item.amountMg) === 750 || String(item.name || '').includes('750')),'gaba1500 only');
  check('master-index',master.records?.length===approvedResearch.length && master.records?.length===masterIds.size && master.records.every(record=>record.id?.startsWith('research-')) && approvedResearch.every(claim=>masterIds.has(claim.id)),`${approvedResearch.length} approved research records match the source ledger`);
  check('operations-queue',queue.tasks?.length===taskGraph.tasks?.length && queue.goalId==='GL-2026-CELL-GABA-001',`${taskGraph.tasks?.length ?? 0} tasks for active Goal Contract`);
  check('goal-audit',audit.mode==='public_goal_audit' && audit.goalId===queue.goalId && audit.gates?.length===queue.tasks.filter(task=>['VERIFYING','WAITING','BACKLOG'].includes(task.state)).length,'public audit packet tied to operations queue');
  check('tf-meeting-packet',meetingPacket.mode==='public_tf_meeting_packet' && meetingPacket.goalId===queue.goalId && meetingPacket.snapshotHash===queue.pulse?.snapshotHash && meetingPacket.agenda?.length===queue.pulse?.activeTasks && meetingPacket.executionPolicy?.autoStates?.includes('READY') && meetingPacket.executionPolicy?.humanReviewStates?.includes('VERIFYING'),'public TF meeting packet tied to current pulse and execution boundary');
} catch (error) { check('public-export',false,error instanceof Error ? error.message : 'invalid public export'); }

const missingSecrets=requiredSecrets.filter(name=>typeof process.env[name]!=='string' || !process.env[name].trim());
check('cloudflare-secrets',missingSecrets.length===0,missingSecrets.length ? `missing=${missingSecrets.join(',')}` : 'all required secret names are present');
if(process.env.ADMIN_ROLE_TOKENS?.trim()) {
  const tokens=parseAdminRoleTokens(process.env.ADMIN_ROLE_TOKENS);
  const roles=['editor','reviewer','approver'];
  const values=roles.map(role=>tokens[role]);
  const valid=values.every(value=>typeof value==='string') && new Set(values).size===values.length;
  check('admin-role-tokens',valid,valid ? 'editor,reviewer,approver configured' : 'must contain three distinct role keys with credentials of at least 32 characters');
}
if(process.env.MEMBER_ORIGIN?.trim()) {
  try { const origin=new URL(process.env.MEMBER_ORIGIN); check('member-origin',origin.protocol==='https:' || ['localhost','127.0.0.1'].includes(origin.hostname),`protocol=${origin.protocol}, host=${origin.hostname}`); }
  catch { check('member-origin',false,'invalid URL'); }
}

const ready=checks.every(item=>item.ok);
const result={status:ready?'READY':'WAITING',ready,strict,missingSecrets,checks};
console.log(JSON.stringify(result));
if(strict && !ready) process.exitCode=1;
