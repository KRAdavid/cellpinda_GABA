import { createServer } from 'node:http';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStore } from './store.mjs';
import { adminAction, adminRoleAllows, adminRoleCapabilities, adminRoleForToken, adminRoleLabel } from '../src/domain/admin-auth.ts';

const LOOPBACK = new Set(['127.0.0.1','::1','::ffff:127.0.0.1']);
const DEV_ORIGINS=new Set(['http://localhost:5173','http://127.0.0.1:5173','http://localhost:4173','http://127.0.0.1:4173']);
const allowedToken = (actual, expected) => {
  if (typeof actual !== 'string' || typeof expected !== 'string') return false;
  const received=Buffer.from(actual); const wanted=Buffer.from(expected);
  return received.length===wanted.length && timingSafeEqual(received,wanted);
};
async function readBody(req,maxBytes=16384) {
  if (!req.headers['content-type']?.startsWith('application/json')) throw Object.assign(new Error('JSON content type required'),{status:415});
  let total=0; const chunks=[];
  for await (const chunk of req) { total += chunk.length; if (total>maxBytes) throw Object.assign(new Error('Body too large'),{status:413}); chunks.push(chunk); }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw Object.assign(new Error('Invalid JSON'),{status:400}); }
}
function localAuditSummary(report) {
  const local = report?.localInputAudit;
  const material = local?.materials;
  const orders = local?.orders;
  const taskCounts = report?.taskCounts && typeof report.taskCounts === 'object'
    ? Object.fromEntries(Object.entries(report.taskCounts).filter(([key, value]) => typeof key === 'string' && Number.isInteger(value)).slice(0, 16))
    : {};
  return {
    schemaVersion: 1,
    mode: 'private_local_audit',
    generatedAt: typeof report?.generatedAt === 'string' ? report.generatedAt : null,
    goalId: typeof report?.goalId === 'string' ? report.goalId : null,
    goalStatus: typeof report?.goalStatus === 'string' ? report.goalStatus : null,
    overallStatus: typeof report?.overallStatus === 'string' ? report.overallStatus : null,
    coreValid: report?.coreValid === true,
    localStateChanged: report?.localStateChanged === true,
    localSnapshotHash: typeof report?.localSnapshotHash === 'string' ? report.localSnapshotHash : null,
    previousLocalSnapshotHash: typeof report?.previousLocalSnapshotHash === 'string' ? report.previousLocalSnapshotHash : null,
    taskCounts,
    pulseHealth: report?.pulseHealth && typeof report.pulseHealth === 'object' ? {
      generatedAt: typeof report.pulseHealth.generatedAt === 'string' ? report.pulseHealth.generatedAt : null,
      snapshotHash: typeof report.pulseHealth.snapshotHash === 'string' ? report.pulseHealth.snapshotHash : null,
      status: typeof report.pulseHealth.status === 'string' ? report.pulseHealth.status : 'unknown',
      ageMinutes: Number.isInteger(report.pulseHealth.ageMinutes) ? report.pulseHealth.ageMinutes : null,
    } : {generatedAt: null, snapshotHash: null, status: 'missing', ageMinutes: null},
    localInputAudit: {
      enabled: local?.enabled === true,
      materials: material && typeof material === 'object' ? {
        found: Number.isInteger(material.found) ? material.found : 0,
        missing: Number.isInteger(material.missing) ? material.missing : 0,
        finishedProductCandidates: Number.isInteger(material.finishedProductCandidates) ? material.finishedProductCandidates : 0,
        b2Candidate: material.b2Candidate === true,
        excludedBulkMaterial: Number.isInteger(material.excludedBulkMaterial) ? material.excludedBulkMaterial : 0,
        latestSourceModifiedAt: typeof material.latestSourceModifiedAt === 'string' ? material.latestSourceModifiedAt : null,
      } : null,
      orders: orders && typeof orders === 'object' ? {
        counters: orders.counters && typeof orders.counters === 'object' ? {
          filesScanned: Number.isInteger(orders.counters.filesScanned) ? orders.counters.filesScanned : 0,
          csvFiles: Number.isInteger(orders.counters.csvFiles) ? orders.counters.csvFiles : (Number.isInteger(orders.counters.csvParsed) ? orders.counters.csvParsed : 0),
          csvParsed: Number.isInteger(orders.counters.csvParsed) ? orders.counters.csvParsed : (Number.isInteger(orders.counters.csvFiles) ? orders.counters.csvFiles : 0),
          xlsxFiles: Number.isInteger(orders.counters.xlsxFiles) ? orders.counters.xlsxFiles : 0,
          xlsxEncrypted: Number.isInteger(orders.counters.xlsxEncrypted) ? orders.counters.xlsxEncrypted : 0,
          xlsxUnparsed: Number.isInteger(orders.counters.xlsxUnparsed) ? orders.counters.xlsxUnparsed : 0,
          unsupported: Number.isInteger(orders.counters.unsupported) ? orders.counters.unsupported : 0,
        } : {},
        gaba1500: orders.gaba1500 && typeof orders.gaba1500 === 'object' ? {
          rows: Number.isInteger(orders.gaba1500.rows) ? orders.gaba1500.rows : 0,
          quantity: Number.isInteger(orders.gaba1500.quantity) ? orders.gaba1500.quantity : 0,
          firstDate: typeof (orders.gaba1500.firstDate ?? orders.gaba1500.dateMin) === 'string' ? (orders.gaba1500.firstDate ?? orders.gaba1500.dateMin) : null,
          lastDate: typeof (orders.gaba1500.lastDate ?? orders.gaba1500.dateMax) === 'string' ? (orders.gaba1500.lastDate ?? orders.gaba1500.dateMax) : null,
        } : null,
        gaba750: orders.gaba750 && typeof orders.gaba750 === 'object' ? {
          rows: Number.isInteger(orders.gaba750.rows) ? orders.gaba750.rows : 0,
          quantity: Number.isInteger(orders.gaba750.quantity) ? orders.gaba750.quantity : 0,
          firstDate: typeof (orders.gaba750.firstDate ?? orders.gaba750.dateMin) === 'string' ? (orders.gaba750.firstDate ?? orders.gaba750.dateMin) : null,
          lastDate: typeof (orders.gaba750.lastDate ?? orders.gaba750.dateMax) === 'string' ? (orders.gaba750.lastDate ?? orders.gaba750.dateMax) : null,
        } : null,
        channelAssessment: orders.channelAssessment && typeof orders.channelAssessment === 'object' ? {
          smartstoreNamedFiles: Number.isInteger(orders.channelAssessment.smartstoreNamedFiles) ? orders.channelAssessment.smartstoreNamedFiles : 0,
          smartstoreNamedFilesParsed: Number.isInteger(orders.channelAssessment.smartstoreNamedFilesParsed) ? orders.channelAssessment.smartstoreNamedFilesParsed : 0,
          conclusion: typeof orders.channelAssessment.conclusion === 'string' ? orders.channelAssessment.conclusion : null,
        } : (typeof orders.channelAssessment === 'string' ? orders.channelAssessment : null),
        latestSourceModifiedAt: typeof orders.latestSourceModifiedAt === 'string' ? orders.latestSourceModifiedAt : null,
      } : null,
      interpretation: typeof local?.interpretation === 'string' ? local.interpretation : null,
    },
    checks: Array.isArray(report?.checks) ? report.checks.filter(item => typeof item?.id === 'string' && item.id.startsWith('local-')).map(item => ({
      id: item.id,
      status: typeof item.status === 'string' ? item.status : 'UNKNOWN',
      detail: typeof item.detail === 'string' ? item.detail : '',
      blockers: Array.isArray(item.blockers) ? item.blockers.filter(value => typeof value === 'string').slice(0, 6) : [],
    })) : [],
    privacyBoundary: 'private_tmp_only',
  };
}

export function createApi({dbPath=resolve('var/site.sqlite'),seedPath=resolve('data/content-ledger.json'),seed,tokenPath=resolve('var/operator-token'),localAuditPath=resolve('tmp/local-goal-audit.json'),adminRoleTokens=process.env.ADMIN_ROLE_TOKENS,development=process.env.NODE_ENV !== 'production',rateLimit=120}={}) {
  const store=createStore({dbPath,seedPath,seed});
  const token=randomBytes(32).toString('hex');
  mkdirSync(dirname(tokenPath),{recursive:true});
  writeFileSync(tokenPath,token,{mode:0o600});
  const rates=new Map();
  const server=createServer(async (req,res) => {
    const reply=(status,value) => { if (!res.headersSent) { res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}); res.end(JSON.stringify(value)); } };
    try {
      const origin=req.headers.origin;
      if (origin) {
        if (!development || !DEV_ORIGINS.has(origin)) return reply(403,{error:'Origin not allowed'});
        res.setHeader('Access-Control-Allow-Origin',origin); res.setHeader('Vary','Origin');
        res.setHeader('Access-Control-Allow-Headers','Content-Type, X-Admin-Token, X-Ops-Run-Key, X-Ops-Revision'); res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
      }
      const host=req.headers.host || '';
      if (!/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host)) return reply(403,{error:'Host not allowed'});
      const now=Date.now();
      const address=req.socket.remoteAddress;
      let rate=rates.get(address);
      if (!rate || now-rate.since>=60000) { rate={since:now,count:0}; rates.set(address,rate); }
      if (++rate.count>rateLimit) { res.setHeader('Retry-After','60'); return reply(429,{error:'Too many requests'}); }
      if (req.method==='OPTIONS') return reply(204,{});
      const path=new URL(req.url,'http://localhost').pathname;
      if (path.startsWith('/api/admin/')) {
        if (!LOOPBACK.has(address)) return reply(401,{error:'Local operator authentication required'});
        const role=adminRoleForToken(req.headers['x-admin-token'],token,adminRoleTokens,allowedToken);
        if (!role) return reply(401,{error:'Local operator authentication required'});
        const deny=(action) => { if (adminRoleAllows(role,action)) return false; reply(403,{error:`${adminRoleLabel(role)} 역할은 ${action} 작업을 수행할 수 없습니다.`,role,action}); return true; };
        if (req.method==='GET' && path==='/api/admin/session') return reply(200,{role,roleLabel:adminRoleLabel(role),capabilities:adminRoleCapabilities(role)});
        if (req.method==='GET' && path==='/api/admin/content') return reply(200,{items:store.adminContent()});
        if (req.method==='GET' && path==='/api/admin/history') return reply(200,{items:store.history()});
        if (req.method==='GET' && path==='/api/admin/analytics') return reply(200,store.analytics());
        if(req.method==='POST' && path==='/api/admin/reviews'){const payload=await readBody(req,65536);if(deny(adminAction(req.method,path,payload)))return;return reply(201,store.createReview(payload));}
        const reviewMatch=path.match(/^\/api\/admin\/reviews\/(review-[a-f0-9-]+)(\/decision)?$/);
        if(reviewMatch && req.method==='PATCH' && !reviewMatch[2]){const payload=await readBody(req,65536);if(deny(adminAction(req.method,path,payload)))return;return reply(200,store.editReview(reviewMatch[1],payload));}
        if(reviewMatch && req.method==='POST' && reviewMatch[2]){const payload=await readBody(req);if(deny(adminAction(req.method,path,payload)))return;return reply(200,store.decideReview(reviewMatch[1],payload));}
        const match=path.match(/^\/api\/admin\/content\/([a-zA-Z0-9-]+)$/);
        if (req.method==='PATCH' && match) {const payload=await readBody(req);if(deny(adminAction(req.method,path,payload)))return;return reply(200,store.update(match[1],payload));}
      }
      if (req.method==='GET' && path==='/api/health') return reply(200,{ok:true,persistence:'sqlite',actualPurchaseIntegration:false});
      if (req.method==='GET' && path==='/api/member/status') return reply(200,{enabled:false,user:null,recoverySupported:false});
      if (req.method==='GET' && path==='/api/content') return reply(200,store.publicContent());
      if (req.method==='POST' && path==='/api/events') return reply(202,store.event(await readBody(req)));
      if (req.method==='GET' && path==='/api/ops/local-audit') {
        if (!LOOPBACK.has(address)) return reply(401,{error:'Local operator access required'});
        try {
          const report=JSON.parse(readFileSync(resolve(localAuditPath),'utf8'));
          return reply(200,localAuditSummary(report));
        } catch (error) {
          if (error?.code==='ENOENT') return reply(404,{error:'Local audit snapshot unavailable',code:'LOCAL_AUDIT_MISSING'});
          if (error instanceof SyntaxError) return reply(422,{error:'Local audit snapshot is invalid',code:'LOCAL_AUDIT_INVALID'});
          throw error;
        }
      }
      const opsMatch=path.match(/^\/api\/ops\/runs\/([0-9a-f-]{36})$/i);
      if(opsMatch && req.method==='GET')return reply(200,store.getOpsRun(opsMatch[1],req.headers['x-ops-run-key']));
      if(opsMatch && req.method==='PUT')return reply(200,store.putOpsRun(opsMatch[1],req.headers['x-ops-run-key'],await readBody(req,65536),req.headers['x-ops-revision']===undefined?undefined:Number(req.headers['x-ops-revision'])));
      if(opsMatch && req.method==='DELETE')return reply(200,store.deleteOpsRun(opsMatch[1],req.headers['x-ops-run-key']));
      return reply(404,{error:'Not found'});
    } catch (error) { return reply(error.status || 500,{error:error.status ? error.message : 'Internal server error'}); }
  });
  server.requestTimeout=10000; server.headersTimeout=10000;
  server.on('close',()=>store.close());
  return {server,store};
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const {server}=createApi();
  server.listen(4318,'127.0.0.1',()=>process.stdout.write('Cellpinda local API: http://127.0.0.1:4318\nOperator credential is stored in var/operator-token; never publish this file.\n'));
}
