import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { generateKeyPairSync, createHash, randomBytes, sign } from 'node:crypto';
import { handleMembers, memberConfiguration } from './members.ts';
import { createChallenge } from '../src/domain/challenge.ts';

class Statement {
  constructor(db,sql,args=[]){this.db=db;this.sql=sql;this.args=args;}
  bind(...args){return new Statement(this.db,this.sql,args);}
  async first(){return this.db.prepare(this.sql).get(...this.args) ?? null;}
  async all(){return {success:true,results:this.db.prepare(this.sql).all(...this.args),meta:{changes:0}};}
  async run(){const result=this.db.prepare(this.sql).run(...this.args);return {success:true,results:[],meta:{changes:Number(result.changes)}};}
}
class MockD1 {
  db=new DatabaseSync(':memory:');queue=Promise.resolve();
  constructor(){this.db.exec('PRAGMA foreign_keys=ON');}
  prepare(sql){return new Statement(this.db,sql);}
  async batch(statements){const work=this.queue.then(async()=>{this.db.exec('BEGIN IMMEDIATE');try{const results=[];for(const statement of statements)results.push(await statement.run());this.db.exec('COMMIT');return results;}catch(error){this.db.exec('ROLLBACK');throw error;}});this.queue=work.catch(()=>{});return work;}
}
const b64=value=>Buffer.from(value).toString('base64url');
const hash=value=>createHash('sha256').update(value).digest();
function cbor(value){
  const head=(major,n)=>n<24?Buffer.from([(major<<5)|n]):n<256?Buffer.from([(major<<5)|24,n]):Buffer.from([(major<<5)|25,n>>8,n&255]);
  if(Buffer.isBuffer(value))return Buffer.concat([head(2,value.length),value]);
  if(typeof value==='string'){const bytes=Buffer.from(value);return Buffer.concat([head(3,bytes.length),bytes]);}
  if(typeof value==='number')return head(value<0?1:0,value<0?-1-value:value);
  if(value instanceof Map)return Buffer.concat([head(5,value.size),...[...value].flatMap(([key,item])=>[cbor(key),cbor(item)])]);
  throw new TypeError('Unsupported CBOR fixture value');
}
function authenticator(){
  const {privateKey,publicKey}=generateKeyPairSync('ec',{namedCurve:'prime256v1'});const jwk=publicKey.export({format:'jwk'});const id=randomBytes(32);let count=0;
  const cose=cbor(new Map([[1,2],[3,-7],[-1,1],[-2,Buffer.from(jwk.x,'base64url')],[-3,Buffer.from(jwk.y,'base64url')]]));
  return {
    register(options,origin,{uv=true}={}){
      const client=Buffer.from(JSON.stringify({type:'webauthn.create',challenge:options.challenge,origin,crossOrigin:false}));
      const auth=Buffer.concat([hash(options.rp.id),Buffer.from([uv?0x45:0x41]),Buffer.alloc(4),Buffer.alloc(16),Buffer.from([0,id.length]),id,cose]);
      return {id:b64(id),rawId:b64(id),type:'public-key',clientExtensionResults:{},response:{clientDataJSON:b64(client),attestationObject:b64(cbor(new Map([['fmt','none'],['attStmt',new Map()],['authData',auth]]))),transports:['internal']}};
    },
    login(options,origin,userHandle,{uv=true,tamper=false}={}){
      const client=Buffer.from(JSON.stringify({type:'webauthn.get',challenge:options.challenge,origin,crossOrigin:false}));
      const counter=Buffer.alloc(4);counter.writeUInt32BE(++count);const auth=Buffer.concat([hash(options.rpId),Buffer.from([uv?5:1]),counter]);
      const signature=sign('sha256',Buffer.concat([auth,hash(client)]),privateKey);if(tamper)signature[signature.length-1]^=1;
      return {id:b64(id),rawId:b64(id),type:'public-key',clientExtensionResults:{},response:{clientDataJSON:b64(client),authenticatorData:b64(auth),signature:b64(signature),userHandle}};
    },
  };
}
function client(env){
  const cookies=new Map();
  let memberId=null;
  return {cookies,async call(path,method='GET',body,extra={}){
    const headers={origin:env.MEMBER_ORIGIN,'content-type':'application/json',cookie:[...cookies].map(([key,value])=>`${key}=${value}`).join('; '),...(memberId && ['challenge','account'].includes(path)?{'x-member-id':memberId}:{}),...extra};
    const req=new Request(`${env.MEMBER_ORIGIN}/api/member/${path}`,{method,headers,...(body===undefined?{}:{body:JSON.stringify(body)})});
    const response=await handleMembers(req,env,r=>r.json());
    for(const value of response.headers.getSetCookie()){const [key,raw]=value.split(';')[0].split('=');if(raw)cookies.set(key,raw);else cookies.delete(key);}
    const data=await response.json();if(data.user?.id)memberId=data.user.id;
    return {status:response.status,data,headers:response.headers};
  }};
}
async function signup(c,env){const auth=authenticator();const options=(await c.call('signup/options','POST',{consent:true,policyVersion:'1'})).data.options;const result=await c.call('signup/verify','POST',{response:auth.register(options,env.MEMBER_ORIGIN)});assert.equal(result.status,200);return {auth,userHandle:options.user.id,userId:result.data.user.id};}

test('Real WebAuthn cryptography creates account, verifies signature, consumes replay and protects records',async()=>{
  const DB=new MockD1(),env={DB,MEMBER_ORIGIN:'https://members.example'};const a=client(env),b=client(env);
  try{
    const alice=await signup(a,env);const sessionCookie=a.cookies.get('__Host-cpd-member-session');assert.ok(sessionCookie);assert.ok((await a.call('status')).data.user);
    assert.equal(DB.db.prepare('SELECT token_hash FROM member_sessions').get().token_hash,hash(sessionCookie).toString('hex'));
    const record=createChallenge('2026-09-10');record.days[0].note='Private reflection';
    assert.equal((await a.call('challenge','PUT',{record,revision:0})).data.code,'consent_required');
    assert.equal((await a.call('challenge','PUT',{record,revision:0,consent:true,policyVersion:'1',memberId:'other'})).status,400);
    assert.equal((await a.call('challenge','PUT',{record,revision:0,consent:true,policyVersion:'1'})).status,200);
    assert.equal((await a.call('challenge','PUT',{record,revision:0,consent:true,policyVersion:'1'})).status,409);
    assert.equal((await a.call('challenge')).data.record.days[0].note,'Private reflection');
    await signup(b,env);assert.equal((await b.call('challenge')).data.record,null);
    assert.equal((await b.call('challenge','GET',undefined,{'x-member-id':''})).data.code,'member_context_required');
    // A stale tab sends Alice's identity but the browser now holds Bob's shared cookie.
    for(const [path,method,payload] of [['challenge','GET',undefined],['challenge','PUT',{record,revision:0,consent:true,policyVersion:'1'}],['challenge','DELETE',{revision:0}],['account','DELETE',undefined]]) {
      const blocked=await b.call(path,method,payload,{'x-member-id':alice.userId});assert.equal(blocked.status,409);assert.equal(blocked.data.code,'account_changed');
    }
    assert.equal((await b.call('challenge')).data.record,null);
    const opts=(await a.call('login/options','POST',{})).data.options;const nonceCookie=a.cookies.get('__Host-cpd-member-challenge');const assertion=alice.auth.login(opts,env.MEMBER_ORIGIN,alice.userHandle);
    const verified=await a.call('login/verify','POST',{response:assertion});assert.equal(verified.status,200);
    assert.match(verified.headers.getSetCookie().join(';'),/HttpOnly/);assert.match(verified.headers.getSetCookie().join(';'),/SameSite=Strict/);assert.match(verified.headers.getSetCookie().join(';'),/Secure/);
    assert.equal((await a.call('login/verify','POST',{response:assertion},{cookie:`__Host-cpd-member-challenge=${nonceCookie}`})).data.code,'challenge_invalid');
    assert.equal((await a.call('challenge','DELETE',{revision:1})).data.revision,2);
    assert.equal((await a.call('challenge')).data.record,null);
    DB.db.prepare('UPDATE member_sessions SET authenticated_at=? WHERE member_id=?').run(Date.now()-360000,alice.userId);
    assert.equal((await a.call('account','DELETE')).data.code,'reauthentication_required');
    const again=(await a.call('login/options','POST',{})).data.options;assert.equal((await a.call('login/verify','POST',{response:alice.auth.login(again,env.MEMBER_ORIGIN,alice.userHandle)})).status,200);
    const racedOptions=(await a.call('login/options','POST',{})).data.options;const racedAssertion=alice.auth.login(racedOptions,env.MEMBER_ORIGIN,alice.userHandle);
    const raced=await Promise.all([a.call('login/verify','POST',{response:racedAssertion}),a.call('login/verify','POST',{response:racedAssertion})]);assert.deepEqual(raced.map(r=>r.status).sort(),[200,400]);
    assert.equal((await a.call('account','DELETE')).status,200);assert.equal((await a.call('status')).data.user,null);assert.equal(DB.db.prepare('SELECT COUNT(*) AS n FROM member_credentials WHERE member_id=?').get(alice.userId).n,0);
    assert.equal((await b.call('status')).data.user.id!==alice.userId,true);
    assert.equal((await b.call('logout','POST',{})).status,200);assert.equal((await b.call('challenge')).status,401);
  }finally{DB.db.close();}
});

test('Origin, expiry, user verification and invalid signatures fail without creating sessions',async()=>{
  const DB=new MockD1(),env={DB,MEMBER_ORIGIN:'https://members.example'},c=client(env);
  try{
    assert.equal(memberConfiguration('https://temporary.workers.dev/',undefined),null);
    assert.equal((await c.call('signup/options','POST',{consent:true,policyVersion:'1'},{origin:'https://evil.example'})).status,403);
    let options=(await c.call('signup/options','POST',{consent:true,policyVersion:'1'})).data.options;const auth=authenticator();
    assert.equal((await c.call('signup/verify','POST',{response:auth.register(options,env.MEMBER_ORIGIN,{uv:false})})).status,400);
    assert.equal(DB.db.prepare('SELECT COUNT(*) AS n FROM members').get().n,0);
    options=(await c.call('signup/options','POST',{consent:true,policyVersion:'1'})).data.options;
    DB.db.prepare('UPDATE member_auth_challenges SET expires_at=0').run();
    assert.equal((await c.call('signup/verify','POST',{response:auth.register(options,env.MEMBER_ORIGIN)})).data.code,'challenge_invalid');
    const valid=await signup(c,env);await c.call('logout','POST',{});
    options=(await c.call('login/options','POST',{})).data.options;
    assert.equal((await c.call('login/verify','POST',{response:valid.auth.login(options,env.MEMBER_ORIGIN,valid.userHandle,{tamper:true})})).status,400);
    assert.equal((await c.call('status')).data.user,null);
    options=(await c.call('login/options','POST',{})).data.options;
    assert.equal((await c.call('login/verify','POST',{response:valid.auth.login(options,env.MEMBER_ORIGIN,valid.userHandle)})).status,200);
    DB.db.prepare('UPDATE member_sessions SET expires_at=0').run();assert.equal((await c.call('status')).data.user,null);assert.equal(DB.db.prepare('SELECT COUNT(*) AS n FROM member_sessions').get().n,0);
  }finally{DB.db.close();}
});
