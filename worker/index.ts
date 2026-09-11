import { timingSafeEqual } from 'node:crypto';
import { createStore, failure } from './store.ts';
import { rewriteSocialHtml } from './social.ts';
import { handleMembers } from './members.ts';
import { adminAction, adminRoleAllows, adminRoleCapabilities, adminRoleForToken, adminRoleLabel } from '../src/domain/admin-auth.ts';

declare global { interface Env { ADMIN_TOKEN: string; ADMIN_ROLE_TOKENS?: string } }

const reply=(status:number,value:unknown)=>new Response(status===204?null:JSON.stringify(value),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function body(request:Request,maxBytes=16384) {
  if(!request.headers.get('content-type')?.startsWith('application/json'))throw failure('JSON content type required',415);
  if(Number(request.headers.get('content-length'))>maxBytes)throw failure('Body too large',413);
  const reader=request.body?.getReader();if(!reader)throw failure('JSON body required');
  const parts:Uint8Array[]=[];let length=0;
  try {while(true){const {done,value}=await reader.read();if(done)break;length+=value.byteLength;if(length>maxBytes){await reader.cancel();throw failure('Body too large',413);}parts.push(value);}}finally{reader.releaseLock();}
  const bytes=new Uint8Array(length);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.length;}
  try{return JSON.parse(new TextDecoder().decode(bytes));}catch{throw failure('Invalid JSON');}
}
function authorized(actual:string|null|undefined,expected:unknown) {
  if(typeof expected!=='string' || expected.length<32 || actual===null || actual===undefined)return false;
  const received=new TextEncoder().encode(actual),wanted=new TextEncoder().encode(expected);
  return received.length===wanted.length && timingSafeEqual(received,wanted);
}
export default {
  async fetch(request:Request,env:Env):Promise<Response> {
    try {
      const url=new URL(request.url);
      if(!url.pathname.startsWith('/api/'))return rewriteSocialHtml(request,await env.ASSETS.fetch(request));
      const local=['localhost','127.0.0.1','[::1]'].includes(url.hostname);
      if(url.protocol!=='https:' && !local)return reply(400,{error:'HTTPS required'});
      const origin=request.headers.get('origin');if(origin && origin!==url.origin)return reply(403,{error:'Origin not allowed'});
      if(request.headers.get('sec-fetch-site')==='cross-site')return reply(403,{error:'Cross-site request not allowed'});
      if(!env.RATE_LIMITER)return reply(503,{error:'Rate limiter unavailable'});
      // Salt with a time bucket so request keys cannot become persistent visitor identifiers.
      const keyBytes=new TextEncoder().encode(`${Math.floor(Date.now()/60000)}:${request.headers.get('cf-connecting-ip') || 'unknown'}`);
      const key=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',keyBytes))).map(byte=>byte.toString(16).padStart(2,'0')).join('');
      if(!(await env.RATE_LIMITER.limit({key})).success)return new Response(JSON.stringify({error:'Too many requests'}),{status:429,headers:{'Content-Type':'application/json','Retry-After':'60','Cache-Control':'no-store'}});
      let adminRole:null|import('../src/domain/admin-auth.ts').AdminRole=null;
      if(url.pathname.startsWith('/api/admin/')) {
        adminRole=adminRoleForToken(request.headers.get('x-admin-token'),env.ADMIN_TOKEN,env.ADMIN_ROLE_TOKENS,authorized);
        if(!adminRole)return reply(401,{error:'Operator authentication required'});
      }
      if(request.method==='OPTIONS')return reply(204,null);
      if(url.pathname.startsWith('/api/member/'))return handleMembers(request,env,body);
      const store=createStore(env.DB);await store.initialize();
      if(request.method==='GET' && url.pathname==='/api/health')return reply(200,{ok:true,persistence:'cloudflare-d1',actualPurchaseIntegration:false});
      if(request.method==='GET' && url.pathname==='/api/content')return reply(200,await store.publicContent());
      if(request.method==='POST' && url.pathname==='/api/events')return reply(202,await store.event(await body(request)));
      const opsMatch=url.pathname.match(/^\/api\/ops\/runs\/([0-9a-f-]{36})$/i);
      if(opsMatch && request.method==='GET')return reply(200,await store.getOpsRun(opsMatch[1],request.headers.get('x-ops-run-key')));
       if(opsMatch && request.method==='PUT')return reply(200,await store.putOpsRun(opsMatch[1],request.headers.get('x-ops-run-key'),await body(request,65536),request.headers.has('x-ops-revision') ? Number(request.headers.get('x-ops-revision')) : undefined));
      if(opsMatch && request.method==='DELETE')return reply(200,await store.deleteOpsRun(opsMatch[1],request.headers.get('x-ops-run-key')));
      const deny=(action:import('../src/domain/admin-auth.ts').AdminAction)=>adminRole && !adminRoleAllows(adminRole,action)?reply(403,{error:`${adminRoleLabel(adminRole)} 역할은 ${action} 작업을 수행할 수 없습니다.`,role:adminRole,action}):null;
      if(request.method==='GET' && url.pathname==='/api/admin/session')return reply(200,{role:adminRole,roleLabel:adminRoleLabel(adminRole!),capabilities:adminRoleCapabilities(adminRole!)});
      if(request.method==='GET' && url.pathname==='/api/admin/content')return reply(200,{items:await store.adminContent()});
      if(request.method==='GET' && url.pathname==='/api/admin/history')return reply(200,{items:await store.history()});
      if(request.method==='GET' && url.pathname==='/api/admin/analytics')return reply(200,await store.analytics());
      if(request.method==='POST' && url.pathname==='/api/admin/reviews'){const payload=await body(request,65536);const blocked=deny(adminAction(request.method,url.pathname,payload));if(blocked)return blocked;return reply(201,await store.createReview(payload));}
      const reviewMatch=url.pathname.match(/^\/api\/admin\/reviews\/(review-[a-f0-9-]+)(\/decision)?$/);
      if(reviewMatch && request.method==='PATCH' && !reviewMatch[2]){const payload=await body(request,65536);const blocked=deny(adminAction(request.method,url.pathname,payload));if(blocked)return blocked;return reply(200,await store.editReview(reviewMatch[1],payload));}
      if(reviewMatch && request.method==='POST' && reviewMatch[2]){const payload=await body(request);const blocked=deny(adminAction(request.method,url.pathname,payload));if(blocked)return blocked;return reply(200,await store.decideReview(reviewMatch[1],payload));}
      const match=url.pathname.match(/^\/api\/admin\/content\/([a-zA-Z0-9-]+)$/);
      if(request.method==='PATCH' && match){const payload=await body(request);const blocked=deny(adminAction(request.method,url.pathname,payload));if(blocked)return blocked;return reply(200,await store.update(match[1],payload));}
      return reply(404,{error:'Not found'});
    }catch(error){const known=error instanceof Error && 'status' in error && typeof error.status==='number';return reply(known?error.status as number:500,{error:known?error.message:'Internal server error'});}
  },
};
