import { generateRegistrationOptions, verifyRegistrationResponse, generateAuthenticationOptions, verifyAuthenticationResponse, type RegistrationResponseJSON, type AuthenticationResponseJSON } from '@simplewebauthn/server';
import { parseChallenge } from '../src/domain/challenge.ts';

declare global { interface Env { MEMBER_ORIGIN?: string } }
export const MEMBER_SCHEMA=[
  'CREATE TABLE IF NOT EXISTS members (id TEXT PRIMARY KEY, user_handle TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL, consent_at INTEGER NOT NULL, policy_version TEXT NOT NULL)',
  'CREATE TABLE IF NOT EXISTS member_credentials (id TEXT PRIMARY KEY, member_id TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE, public_key TEXT NOT NULL, counter INTEGER NOT NULL, transports TEXT NOT NULL)',
  'CREATE TABLE IF NOT EXISTS member_sessions (token_hash TEXT PRIMARY KEY, member_id TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE, authenticated_at INTEGER NOT NULL, expires_at INTEGER NOT NULL)',
  'CREATE INDEX IF NOT EXISTS member_sessions_expiry ON member_sessions(expires_at)',
  'CREATE TABLE IF NOT EXISTS member_auth_challenges (token_hash TEXT PRIMARY KEY, kind TEXT NOT NULL, challenge TEXT NOT NULL, member_id TEXT, user_handle TEXT, expires_at INTEGER NOT NULL, origin TEXT NOT NULL)',
  'CREATE TABLE IF NOT EXISTS member_records (member_id TEXT PRIMARY KEY REFERENCES members(id) ON DELETE CASCADE, record TEXT, revision INTEGER NOT NULL, consent_at INTEGER, policy_version TEXT)',
  'CREATE TABLE IF NOT EXISTS member_record_archives (id TEXT PRIMARY KEY, member_id TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE, record TEXT NOT NULL, source_revision INTEGER NOT NULL, created_at INTEGER NOT NULL, consent_at INTEGER NOT NULL, policy_version TEXT NOT NULL, UNIQUE(member_id,source_revision))',
  'CREATE INDEX IF NOT EXISTS member_archives_owner_created ON member_record_archives(member_id,created_at)',
];
type AuthChallenge={token_hash:string;kind:string;challenge:string;member_id:string|null;user_handle:string|null;expires_at:number;origin:string};
type Session={token_hash:string;member_id:string;authenticated_at:number;expires_at:number};
type RecordRow={record:string|null;revision:number};
const object=(value:unknown):value is Record<string,unknown>=>!!value && typeof value==='object' && !Array.isArray(value);
const fail=(message:string,status=400,code='invalid_request')=>Object.assign(new Error(message),{status,code});
const opaque=()=>crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','');
const base64=(bytes:Uint8Array)=>btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
const unbase64=(value:string)=>Uint8Array.from(atob(value.replaceAll('-','+').replaceAll('_','/')),char=>char.charCodeAt(0));
const digest=async(value:string)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).map(n=>n.toString(16).padStart(2,'0')).join('');

export function memberConfiguration(requestUrl:string,configured?:string) {
  if(!configured)return null;
  try {const url=new URL(requestUrl),expected=new URL(configured);if(expected.origin!==configured || url.origin!==configured || (expected.protocol!=='https:' && !['localhost','127.0.0.1'].includes(expected.hostname)))return null;return {origin:expected.origin,rpID:expected.hostname,secure:expected.protocol==='https:'};}catch{return null;}
}
function cookieName(secure:boolean,kind:'session'|'challenge'){return `${secure?'__Host-':''}cpd-member-${kind}`;}
function readCookie(request:Request,name:string){const matches=(request.headers.get('cookie') || '').split(';').map(part=>part.trim()).filter(part=>part.startsWith(`${name}=`));if(matches.length!==1)return null;const value=matches[0].slice(name.length+1);return /^[a-f0-9]{64}$/.test(value)?value:null;}
function cookie(secure:boolean,kind:'session'|'challenge',value:string,maxAge:number){return `${cookieName(secure,kind)}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure?'; Secure':''}`;}
function json(status:number,value:unknown,cookies:string[]=[]) {const headers=new Headers({'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});for(const item of cookies)headers.append('Set-Cookie',item);return new Response(JSON.stringify(value),{status,headers});}
function consent(value:Record<string,unknown>){if(value.consent!==true || value.policyVersion!=='1')throw fail('Explicit storage consent is required',400,'consent_required');}
function keys(value:Record<string,unknown>,allowed:string[]){if(Object.keys(value).some(key=>!allowed.includes(key)))throw fail('Unexpected field');}
function registration(value:unknown):value is RegistrationResponseJSON{return object(value) && typeof value.id==='string' && typeof value.rawId==='string' && value.type==='public-key' && object(value.clientExtensionResults) && object(value.response) && typeof value.response.clientDataJSON==='string' && typeof value.response.attestationObject==='string';}
function authentication(value:unknown):value is AuthenticationResponseJSON{return object(value) && typeof value.id==='string' && typeof value.rawId==='string' && value.type==='public-key' && object(value.clientExtensionResults) && object(value.response) && typeof value.response.clientDataJSON==='string' && typeof value.response.authenticatorData==='string' && typeof value.response.signature==='string' && typeof value.response.userHandle==='string';}

/** Outer router must enforce its 16 KiB streaming body and request rate limit before dispatch. */
export async function handleMembers(request:Request,env:Env,readJson:(request:Request)=>Promise<unknown>):Promise<Response> {
  const config=memberConfiguration(request.url,env.MEMBER_ORIGIN);
  const path=new URL(request.url).pathname;
  if(!config)return path==='/api/member/status' && request.method==='GET'?json(200,{enabled:false,user:null,recoverySupported:false}):json(503,{error:'Membership is unavailable on this origin',code:'membership_disabled'});
  const {origin,rpID,secure}=config;const now=Date.now();const db=env.DB;
  try {
    const originHeader=request.headers.get('origin');
    if((originHeader && originHeader!==origin) || (request.method!=='GET' && originHeader!==origin) || request.headers.get('sec-fetch-site')==='cross-site')throw fail('Same-origin request required',403,'origin_mismatch');
    await db.batch([...MEMBER_SCHEMA.map(sql=>db.prepare(sql)),db.prepare('DELETE FROM member_auth_challenges WHERE expires_at<=?').bind(now),db.prepare('DELETE FROM member_sessions WHERE expires_at<=?').bind(now)]);
    const rawSession=readCookie(request,cookieName(secure,'session'));
    const session=rawSession?await db.prepare('SELECT s.* FROM member_sessions s JOIN members m ON m.id=s.member_id WHERE token_hash=? AND expires_at>?').bind(await digest(rawSession),now).first<Session>():null;
    if(path==='/api/member/status' && request.method==='GET')return json(200,{enabled:true,user:session?{id:session.member_id}:null,recoverySupported:false});

    const optionsMatch=path.match(/^\/api\/member\/(signup|login)\/options$/);
    if(optionsMatch && request.method==='POST') {
      const kind=optionsMatch[1];const value=await readJson(request);if(!object(value))throw fail('JSON object required');
      keys(value,kind==='signup'?['consent','policyVersion']:[]);
      if(kind==='signup'){consent(value);if(session)throw fail('Already signed in',409);}
      const pendingCookie=readCookie(request,cookieName(secure,'challenge'));
      if(pendingCookie)await db.prepare('DELETE FROM member_auth_challenges WHERE token_hash=?').bind(await digest(pendingCookie)).run();
      const token=opaque();const memberId=kind==='signup'?crypto.randomUUID():null;
      const options=kind==='signup'?await generateRegistrationOptions({rpName:'Cellpinda 하루 기록',rpID,userName:`Cellpinda-${memberId!.slice(0,8)}`,userDisplayName:'나의 하루 기록',userID:crypto.getRandomValues(new Uint8Array(32)),attestationType:'none',authenticatorSelection:{residentKey:'required',userVerification:'required'},supportedAlgorithmIDs:[-7,-257],timeout:300000}):await generateAuthenticationOptions({rpID,userVerification:'required',timeout:300000});
      const handle='user' in options?options.user.id:null;
      await db.prepare('INSERT INTO member_auth_challenges(token_hash,kind,challenge,member_id,user_handle,expires_at,origin) VALUES(?,?,?,?,?,?,?)').bind(await digest(token),kind,options.challenge,memberId,handle,now+300000,origin).run();
      return json(200,{options},[cookie(secure,'challenge',token,300)]);
    }

    const verifyMatch=path.match(/^\/api\/member\/(signup|login)\/verify$/);
    if(verifyMatch && request.method==='POST') {
      const value=await readJson(request);if(!object(value) || !object(value.response))throw fail('Credential response required');
      keys(value,['response']);
      const raw=readCookie(request,cookieName(secure,'challenge'));if(!raw)throw fail('Challenge missing',400,'challenge_invalid');
      // DELETE RETURNING consumes the browser-bound challenge exactly once, including failed verification.
      const challenge=await db.prepare('DELETE FROM member_auth_challenges WHERE token_hash=? AND kind=? AND origin=? AND expires_at>? RETURNING *').bind(await digest(raw),verifyMatch[1],origin,now).first<AuthChallenge>();
      if(!challenge)throw fail('Challenge expired or already used',400,'challenge_invalid');
      const sessionToken=opaque(),sessionHash=await digest(sessionToken);let memberId:string;
      try {
        if(verifyMatch[1]==='signup') {
          if(!registration(value.response))throw fail('Credential verification failed',400,'credential_invalid');
          const verified=await verifyRegistrationResponse({response:value.response,expectedChallenge:challenge.challenge,expectedOrigin:origin,expectedRPID:rpID,requireUserVerification:true});
          if(!verified.verified || !verified.registrationInfo || !challenge.member_id || !challenge.user_handle)throw fail('Credential verification failed',400,'credential_invalid');
          const credential=verified.registrationInfo.credential;memberId=challenge.member_id;
          await db.batch([
            db.prepare('INSERT INTO members(id,user_handle,created_at,consent_at,policy_version) VALUES(?,?,?,?,?)').bind(memberId,challenge.user_handle,now,now,'1'),
            db.prepare('INSERT INTO member_credentials(id,member_id,public_key,counter,transports) VALUES(?,?,?,?,?)').bind(credential.id,memberId,base64(credential.publicKey),credential.counter,JSON.stringify(credential.transports || [])),
            db.prepare('INSERT INTO member_sessions(token_hash,member_id,authenticated_at,expires_at) VALUES(?,?,?,?)').bind(sessionHash,memberId,now,now+86400000),
          ]);
        }else {
          if(typeof value.response.id!=='string')throw fail('Credential verification failed',400,'credential_invalid');
          const stored=await db.prepare('SELECT c.*,m.user_handle FROM member_credentials c JOIN members m ON m.id=c.member_id WHERE c.id=?').bind(value.response.id).first<{id:string;member_id:string;public_key:string;counter:number;transports:string;user_handle:string}>();
          if(!authentication(value.response))throw fail('Credential verification failed',400,'credential_invalid');
          const response=value.response;
          if(!stored || response.response?.userHandle!==stored.user_handle)throw fail('Credential verification failed',400,'credential_invalid');
          const verified=await verifyAuthenticationResponse({response,expectedChallenge:challenge.challenge,expectedOrigin:origin,expectedRPID:rpID,credential:{id:stored.id,publicKey:unbase64(stored.public_key),counter:stored.counter,transports:JSON.parse(stored.transports)},requireUserVerification:true});
          if(!verified.verified)throw fail('Credential verification failed',400,'credential_invalid');
          memberId=stored.member_id;
          const results=await db.batch([
            db.prepare('UPDATE member_credentials SET counter=? WHERE id=? AND counter=?').bind(verified.authenticationInfo.newCounter,stored.id,stored.counter),
            db.prepare('INSERT INTO member_sessions(token_hash,member_id,authenticated_at,expires_at) SELECT ?,?,?,? WHERE changes()=1').bind(sessionHash,memberId,now,now+86400000),
          ]);
          if(results[0].meta.changes!==1 || results[1].meta.changes!==1)throw fail('Concurrent authentication; try again',409,'credential_conflict');
        }
      }catch(error){if(error instanceof Error && 'code' in error)throw error;throw fail('Credential verification failed',400,'credential_invalid');}
      if(session)await db.prepare('DELETE FROM member_sessions WHERE token_hash=?').bind(session.token_hash).run();
      return json(200,{user:{id:memberId}},[cookie(secure,'session',sessionToken,86400),cookie(secure,'challenge','',0)]);
    }

    if(!session)throw fail('Sign in required',401,'authentication_required');
    if((path==='/api/member/challenge' && ['GET','PUT','DELETE'].includes(request.method)) || path==='/api/member/challenge/archive' || path==='/api/member/archives' || path.startsWith('/api/member/archives/') || (path==='/api/member/account' && request.method==='DELETE')) {
      const expectedMember=request.headers.get('x-member-id');
      if(!expectedMember)throw fail('Current member context is required',400,'member_context_required');
      if(expectedMember!==session.member_id)throw fail('The signed-in account changed; reload before continuing',409,'account_changed');
    }
    if(path==='/api/member/logout' && request.method==='POST') {
      const pending=readCookie(request,cookieName(secure,'challenge'));
      await db.batch([db.prepare('DELETE FROM member_sessions WHERE token_hash=?').bind(session.token_hash),db.prepare('DELETE FROM member_auth_challenges WHERE token_hash=?').bind(pending?await digest(pending):'')]);return json(200,{ok:true},[cookie(secure,'session','',0),cookie(secure,'challenge','',0)]);
    }
    if(path==='/api/member/account' && request.method==='DELETE') {
      if(now-session.authenticated_at>300000)throw fail('Sign in again before deleting your account',403,'reauthentication_required');
      const pending=readCookie(request,cookieName(secure,'challenge'));
      await db.batch(['member_record_archives','member_records','member_sessions','member_credentials'].map(table=>db.prepare(`DELETE FROM ${table} WHERE member_id=?`).bind(session.member_id)).concat([db.prepare('DELETE FROM member_auth_challenges WHERE member_id=? OR token_hash=?').bind(session.member_id,pending?await digest(pending):''),db.prepare('DELETE FROM members WHERE id=?').bind(session.member_id)]));
      return json(200,{ok:true},[cookie(secure,'session','',0),cookie(secure,'challenge','',0)]);
    }
    if(path==='/api/member/challenge/archive' && request.method==='POST') {
      const value=await readJson(request);if(!object(value) || !Number.isInteger(value.revision) || Number(value.revision)<1)throw fail('Revision required');
      keys(value,['revision','consent','policyVersion']);consent(value);
      const sourceRevision=Number(value.revision);
      const duplicate=async()=> {
        const archived=await db.prepare('SELECT id FROM member_record_archives WHERE member_id=? AND source_revision=?').bind(session.member_id,sourceRevision).first<{id:string}>();
        if(!archived)return null;
        const current=await db.prepare('SELECT record,revision FROM member_records WHERE member_id=?').bind(session.member_id).first<RecordRow>();
        return json(200,{archiveId:archived.id,record:current?.record?JSON.parse(current.record):null,revision:current?.revision ?? 0,duplicate:true});
      };
      const prior=await duplicate();if(prior)return prior;
      const id=crypto.randomUUID();
      const result=await db.batch([
        db.prepare('INSERT INTO member_record_archives(id,member_id,record,source_revision,created_at,consent_at,policy_version) SELECT ?,member_id,record,revision,?,?,? FROM member_records WHERE member_id=? AND revision=? AND record IS NOT NULL').bind(id,now,now,'1',session.member_id,sourceRevision),
        db.prepare('UPDATE member_records SET record=NULL,revision=revision+1,consent_at=NULL,policy_version=NULL WHERE member_id=? AND revision=? AND EXISTS(SELECT 1 FROM member_record_archives WHERE id=?)').bind(session.member_id,sourceRevision,id),
      ]);
      if(result[0].meta.changes!==1 || result[1].meta.changes!==1){const repeated=await duplicate();if(repeated)return repeated;throw fail('Record changed or empty; reload before archiving',409,'revision_conflict');}
      return json(200,{archiveId:id,record:null,revision:sourceRevision+1,duplicate:false});
    }
    if(path==='/api/member/archives' && request.method==='GET') {
      const result=await db.prepare("SELECT id,source_revision,created_at,json_extract(record,'$.startDate') AS start_date,(SELECT COUNT(*) FROM json_each(member_record_archives.record,'$.days') WHERE json_extract(value,'$.completed')=1) AS completed_days FROM member_record_archives WHERE member_id=? ORDER BY created_at DESC,rowid DESC LIMIT 101").bind(session.member_id).all<{id:string;source_revision:number;created_at:number;start_date:string;completed_days:number}>();
      return json(200,{items:result.results.slice(0,100).map(row=>({id:row.id,startDate:row.start_date,completedDays:row.completed_days,totalDays:7,createdAt:new Date(row.created_at).toISOString(),sourceRevision:row.source_revision})),limit:100,truncated:result.results.length>100});
    }
    const archiveMatch=path.match(/^\/api\/member\/archives\/([a-f0-9-]{36})$/);
    if(archiveMatch && ['GET','DELETE'].includes(request.method)) {
      if(request.method==='DELETE') {
        const result=await db.prepare('DELETE FROM member_record_archives WHERE id=? AND member_id=?').bind(archiveMatch[1],session.member_id).run();
        if(result.meta.changes!==1)throw fail('Archive not found',404,'not_found');return json(200,{ok:true});
      }
      const row=await db.prepare('SELECT id,record,source_revision,created_at FROM member_record_archives WHERE id=? AND member_id=?').bind(archiveMatch[1],session.member_id).first<{id:string;record:string;source_revision:number;created_at:number}>();
      if(!row)throw fail('Archive not found',404,'not_found');
      return json(200,{id:row.id,record:JSON.parse(row.record),createdAt:new Date(row.created_at).toISOString(),sourceRevision:row.source_revision});
    }
    if(path==='/api/member/challenge') {
      const current=await db.prepare('SELECT record,revision FROM member_records WHERE member_id=?').bind(session.member_id).first<RecordRow>();
      if(request.method==='GET')return json(200,{record:current?.record?JSON.parse(current.record):null,revision:current?.revision ?? 0});
      if(request.method==='PUT' || request.method==='DELETE') {
        const value=await readJson(request);if(!object(value) || !Number.isInteger(value.revision) || Number(value.revision)<0)throw fail('Revision required');
        keys(value,request.method==='PUT'?['record','revision','consent','policyVersion']:['revision']);
        if(value.revision!==(current?.revision ?? 0))throw fail('Record changed; reload before saving',409,'revision_conflict');
        if(request.method==='PUT')consent(value);
        const record=request.method==='PUT'?parseChallenge(value.record):null;if(request.method==='PUT' && !record)throw fail('Invalid challenge record');
        const revision=Number(value.revision)+1;
        const result=current?await db.prepare('UPDATE member_records SET record=?,revision=?,consent_at=?,policy_version=? WHERE member_id=? AND revision=?').bind(record?JSON.stringify(record):null,revision,record?now:null,record?'1':null,session.member_id,value.revision).run():await db.prepare('INSERT OR IGNORE INTO member_records(member_id,record,revision,consent_at,policy_version) VALUES(?,?,?,?,?)').bind(session.member_id,record?JSON.stringify(record):null,revision,record?now:null,record?'1':null).run();
        if(result.meta.changes!==1)throw fail('Record changed; reload before saving',409,'revision_conflict');
        return json(200,{record,revision});
      }
    }
    return json(404,{error:'Not found'});
  }catch(error){const known=error instanceof Error && 'status' in error && typeof error.status==='number';return json(known?error.status as number:500,{error:known?error.message:'Member service unavailable',code:known && 'code' in error?error.code:'internal_error'});}
}
