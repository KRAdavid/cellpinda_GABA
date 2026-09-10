import { createServer } from 'node:http';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStore } from './store.mjs';

const LOOPBACK = new Set(['127.0.0.1','::1','::ffff:127.0.0.1']);
const DEV_ORIGINS=new Set(['http://localhost:5173','http://127.0.0.1:5173','http://localhost:4173','http://127.0.0.1:4173']);
const allowedToken = (actual, expected) => {
  if (typeof actual !== 'string') return false;
  const received=Buffer.from(actual); const wanted=Buffer.from(expected);
  return received.length===wanted.length && timingSafeEqual(received,wanted);
};
async function readBody(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) throw Object.assign(new Error('JSON content type required'),{status:415});
  let total=0; const chunks=[];
  for await (const chunk of req) { total += chunk.length; if (total>16384) throw Object.assign(new Error('Body too large'),{status:413}); chunks.push(chunk); }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw Object.assign(new Error('Invalid JSON'),{status:400}); }
}
export function createApi({dbPath=resolve('var/site.sqlite'),seedPath=resolve('data/content-ledger.json'),seed,tokenPath=resolve('var/operator-token'),development=process.env.NODE_ENV !== 'production',rateLimit=120}={}) {
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
        res.setHeader('Access-Control-Allow-Headers','Content-Type, X-Admin-Token'); res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, OPTIONS');
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
        if (!LOOPBACK.has(address) || !allowedToken(req.headers['x-admin-token'],token)) return reply(401,{error:'Local operator authentication required'});
        if (req.method==='GET' && path==='/api/admin/content') return reply(200,{items:store.adminContent()});
        if (req.method==='GET' && path==='/api/admin/history') return reply(200,{items:store.history()});
        if (req.method==='GET' && path==='/api/admin/analytics') return reply(200,store.analytics());
        const match=path.match(/^\/api\/admin\/content\/([a-zA-Z0-9-]+)$/);
        if (req.method==='PATCH' && match) return reply(200,store.update(match[1],await readBody(req)));
      }
      if (req.method==='GET' && path==='/api/health') return reply(200,{ok:true,persistence:'sqlite',actualPurchaseIntegration:false});
      if (req.method==='GET' && path==='/api/member/status') return reply(200,{enabled:false,user:null,recoverySupported:false});
      if (req.method==='GET' && path==='/api/content') return reply(200,store.publicContent());
      if (req.method==='POST' && path==='/api/events') return reply(202,store.event(await readBody(req)));
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
