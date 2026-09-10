import { timingSafeEqual } from 'node:crypto';
import { createStore, failure } from './store.ts';
import { rewriteSocialHtml } from './social.ts';
import { handleMembers } from './members.ts';

declare global { interface Env { ADMIN_TOKEN: string } }

const reply=(status:number,value:unknown)=>new Response(status===204?null:JSON.stringify(value),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function body(request:Request) {
  if(!request.headers.get('content-type')?.startsWith('application/json'))throw failure('JSON content type required',415);
  if(Number(request.headers.get('content-length'))>16384)throw failure('Body too large',413);
  const reader=request.body?.getReader();if(!reader)throw failure('JSON body required');
  const parts:Uint8Array[]=[];let length=0;
  try {while(true){const {done,value}=await reader.read();if(done)break;length+=value.byteLength;if(length>16384){await reader.cancel();throw failure('Body too large',413);}parts.push(value);}}finally{reader.releaseLock();}
  const bytes=new Uint8Array(length);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.length;}
  try{return JSON.parse(new TextDecoder().decode(bytes));}catch{throw failure('Invalid JSON');}
}
function authorized(actual:string|null,expected:unknown) {
  if(typeof expected!=='string' || expected.length<32 || actual===null)return false;
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
      if(url.pathname.startsWith('/api/admin/') && !authorized(request.headers.get('x-admin-token'),env.ADMIN_TOKEN))return reply(401,{error:'Operator authentication required'});
      if(request.method==='OPTIONS')return reply(204,null);
      if(url.pathname.startsWith('/api/member/'))return handleMembers(request,env,body);
      const store=createStore(env.DB);await store.initialize();
      if(request.method==='GET' && url.pathname==='/api/health')return reply(200,{ok:true,persistence:'cloudflare-d1',actualPurchaseIntegration:false});
      if(request.method==='GET' && url.pathname==='/api/content')return reply(200,await store.publicContent());
      if(request.method==='POST' && url.pathname==='/api/events')return reply(202,await store.event(await body(request)));
      if(request.method==='GET' && url.pathname==='/api/admin/content')return reply(200,{items:await store.adminContent()});
      if(request.method==='GET' && url.pathname==='/api/admin/history')return reply(200,{items:await store.history()});
      if(request.method==='GET' && url.pathname==='/api/admin/analytics')return reply(200,await store.analytics());
      const match=url.pathname.match(/^\/api\/admin\/content\/([a-zA-Z0-9-]+)$/);
      if(request.method==='PATCH' && match)return reply(200,await store.update(match[1],await body(request)));
      return reply(404,{error:'Not found'});
    }catch(error){const known=error instanceof Error && 'status' in error && typeof error.status==='number';return reply(known?error.status as number:500,{error:known?error.message:'Internal server error'});}
  },
};
