import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';

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

for(const file of ['dist/index.html','dist/data/content.json','dist/data/gaba-master-index.json','dist/data/operations-queue.json','dist/data/tf-pulse.json']) check(`artifact:${file}`,existsSync(resolve(root,file)),'present after production build');
try {
  const content=readJson('public/data/content.json');
  const master=readJson('public/data/gaba-master-index.json');
  const queue=readJson('public/data/operations-queue.json');
  const taskGraph=readJson('data/task-graph.json');
  check('public-product-scope',content.products?.length===1 && content.products[0]?.id==='gaba1500' && !JSON.stringify(content).includes('750'),'gaba1500 only');
  check('master-index',master.records?.length===8 && master.records.every(record=>record.id?.startsWith('research-')),'8 approved research records');
  check('operations-queue',queue.tasks?.length===taskGraph.tasks?.length && queue.goalId==='GL-2026-CELL-GABA-001',`${taskGraph.tasks?.length ?? 0} tasks for active Goal Contract`);
} catch (error) { check('public-export',false,error instanceof Error ? error.message : 'invalid public export'); }

const missingSecrets=requiredSecrets.filter(name=>typeof process.env[name]!=='string' || !process.env[name].trim());
check('cloudflare-secrets',missingSecrets.length===0,missingSecrets.length ? `missing=${missingSecrets.join(',')}` : 'all required secret names are present');
if(process.env.MEMBER_ORIGIN?.trim()) {
  try { const origin=new URL(process.env.MEMBER_ORIGIN); check('member-origin',origin.protocol==='https:' || ['localhost','127.0.0.1'].includes(origin.hostname),`protocol=${origin.protocol}, host=${origin.hostname}`); }
  catch { check('member-origin',false,'invalid URL'); }
}

const ready=checks.every(item=>item.ok);
const result={status:ready?'READY':'WAITING',ready,strict,missingSecrets,checks};
console.log(JSON.stringify(result));
if(strict && !ready) process.exitCode=1;
