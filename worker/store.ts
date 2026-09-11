import ledger from '../data/content-ledger.json' with { type: 'json' };
import { reviewMutation, approvalMissing, publicReview, parseReviewDraft, REVIEW_DESTINATION_TEXT, REVIEW_DESTINATION_URL } from '../src/domain/reviews.ts';
import { opsStateIssue } from '../src/domain/ops-validation.ts';

type RecordValue = Record<string, unknown>;
type ContentRow = {id:string;kind:string;data:string;revision:number};
type SeedRow = ContentRow & {last_reason:string|null};
type Content = RecordValue & {id:string;kind?:string;status?:string;revision?:number;publicText?:string|null;sourceIds?:string[];sources?:RecordValue[]};
const EVENTS=new Set(['landing_view','hero_check_start','rhythm_check_started','rhythm_check_completed','rhythm_check_complete','result_viewed','gaba_story_viewed','evidence_opened','review_opened','review_source_click','review_section_navigated','purchase_question_opened','share_image_generated','share_requested','share_cancelled','share_link_copied','share_image_downloaded','result_share_click','result_share_success','shared_link_landed','friend_check_start','product_comparison_viewed','product_compare_view','purchase_outbound_clicked','purchase_cta_click','challenge_start','challenge_day_complete','seven_day_complete','teaser_impression','teaser_play']);
const PATHS=new Set(['/','/story','/technology','/products','/research','/reviews','/check','/result','/share','/admin','/teaser','/challenge']);
const PUBLIC_META=new Set(['studyType','population','sampleSize','dose','duration','comparison','outcome','productApplicability','question','searchThrough','studyCount','consumerScope','consumerSummary','hopefulTakeaway']);
const SHARE_SCOPES=[['own_result','/result','result_viewed'],['incoming_result','/share','result_viewed'],['product_comparison','/products','product_comparison_viewed']];
const OPS_MAX_BYTES=65536;
const OPS_TTL_DAYS=30;
const REVIEW_DESTINATION_ID='shop-review-destination-1500';
const REVIEW_DESTINATION_MIGRATION_PREFIX='migration:review-destination-smartstore:v1';
const SOURCE_CLAIM_SYNC_REASON='Current source ledger reconciliation refreshed seed claim fields';
const SOURCE_PRODUCT_SYNC_REASON='Current source ledger reconciliation refreshed controlled product fields';
const SOURCE_RETIRE_REASON='Current source ledger reconciliation retired removed public content';
const DISCOURAGED_CONSUMER_COPY=/뚜렷한\s*차이는\s*확인되지|유의한\s*차이는\s*확인되지|개선이\s*확인된\s*것은\s*아닙니다|제한적(?:인)?\s*근거|매우\s*제한적|연구\s*간\s*결과가\s*일치하지|정량\s*메타분석.*수행하지|다만\s*GABA만의\s*효과|결과를\s*한\s*문장으로\s*묶기\s*어려/;
const LEGACY_DESTINATION=/cellpinda\.co\.kr|cellpindamall\.com|공식몰/;
const CONTROLLED_PRODUCT_FIELDS=['name','amountMg','servings','totalG','officialUrl','availability','sourceIds'] as const;
const SHARE_SCOPE_SQL=`WITH scoped AS (SELECT rowid AS seq,flow_id,name FROM events WHERE json_extract(properties,'$.path')=? AND flow_id IS NOT NULL), starts AS (SELECT flow_id,MIN(seq) AS first_seq FROM scoped WHERE name=? GROUP BY flow_id), steps AS (SELECT EXISTS(SELECT 1 FROM scoped e WHERE e.flow_id=s.flow_id AND e.seq>s.first_seq AND e.name='share_requested') AS requested,EXISTS(SELECT 1 FROM scoped e WHERE e.flow_id=s.flow_id AND e.seq>s.first_seq AND e.name='share_link_copied') AS copied,EXISTS(SELECT 1 FROM scoped e WHERE e.flow_id=s.flow_id AND e.seq>s.first_seq AND e.name='share_image_downloaded') AS downloaded,EXISTS(SELECT 1 FROM scoped e WHERE e.flow_id=s.flow_id AND e.seq>s.first_seq AND e.name='share_cancelled') AS cancelled FROM starts s) SELECT COUNT(*) AS denominator,COALESCE(SUM(CASE WHEN requested OR copied OR downloaded THEN 1 ELSE 0 END),0) AS attemptFlows,COALESCE(SUM(requested),0) AS requestedFlows,COALESCE(SUM(copied),0) AS copiedFlows,COALESCE(SUM(downloaded),0) AS downloadedFlows,COALESCE(SUM(cancelled),0) AS cancelledFlows FROM steps`;
const UNSCOPED_SHARE_SQL="SELECT COUNT(*) AS count FROM events WHERE name IN ('share_requested','share_link_copied','share_image_downloaded','share_cancelled') AND COALESCE(json_extract(properties,'$.path'),'') NOT IN ('/result','/share','/products')";
type ShareCounts={denominator:number;attemptFlows:number;requestedFlows:number;copiedFlows:number;downloadedFlows:number;cancelledFlows:number};
export const SCHEMA=[
  'CREATE TABLE IF NOT EXISTS content (id TEXT PRIMARY KEY, kind TEXT NOT NULL, data TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1)',
  'CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT, content_id TEXT NOT NULL, revision INTEGER NOT NULL, reason TEXT NOT NULL, previous TEXT, current TEXT NOT NULL, created_at TEXT NOT NULL)',
  'CREATE UNIQUE INDEX IF NOT EXISTS audit_content_revision ON audit(content_id,revision)',
  'CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, name TEXT NOT NULL, properties TEXT NOT NULL, created_at TEXT NOT NULL, flow_id TEXT)',
  'CREATE INDEX IF NOT EXISTS events_flow_name ON events(flow_id,name)',
  'CREATE TABLE IF NOT EXISTS metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL)',
  'CREATE TABLE IF NOT EXISTS ops_runs (id TEXT PRIMARY KEY, owner_hash TEXT NOT NULL, data TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, expires_at TEXT NOT NULL)',
  'CREATE INDEX IF NOT EXISTS ops_runs_owner_expires ON ops_runs(owner_hash,expires_at)',
  'CREATE TABLE IF NOT EXISTS ops_audit (id INTEGER PRIMARY KEY AUTOINCREMENT, run_id TEXT NOT NULL, revision INTEGER NOT NULL, action TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL)',
  'CREATE INDEX IF NOT EXISTS ops_audit_run ON ops_audit(run_id,id)',
];
export const failure=(message:string,status=400)=>Object.assign(new Error(message),{status});
const object=(value:unknown):value is RecordValue=>!!value && typeof value==='object' && !Array.isArray(value);
const uuid=(value:unknown):value is string=>typeof value==='string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const opsKey=(value:unknown):value is string=>typeof value==='string' && value.length>=32 && value.length<=128;
async function hashOpsKey(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).map(byte=>byte.toString(16).padStart(2,'0')).join('');}
function sources(value:Content) {return (value.sources || []).filter(s=>typeof s.url==='string' && s.url.startsWith('https://')).map(({title,url,page,locator})=>({title,url,page,locator}));}
function metadata(value:unknown) {
  if(!object(value))return undefined;
  const result:RecordValue={};
  for(const [key,item] of Object.entries(value))if(PUBLIC_META.has(key) && ((typeof item==='string' && item.length<=3000)||(typeof item==='number' && Number.isFinite(item))))result[key]=item;
  return Object.keys(result).length?result:undefined;
}
function decode(row:ContentRow):Content {return {...JSON.parse(row.data),id:row.id,kind:row.kind,revision:row.revision};}
function reviewLink(value:Content) {
  if(value.id!==REVIEW_DESTINATION_ID || value.originalPublic!==true || typeof value.sourceUrl!=='string')return false;
  try{return new URL(value.sourceUrl).href===REVIEW_DESTINATION_URL;}catch{return false;}
}

export function createStore(db:D1Database) {
  const all=async()=> (await db.prepare('SELECT * FROM content ORDER BY rowid').all<ContentRow>()).results.map(decode);
  const mutateReview=async(id:string,request:unknown,kind:'edit'|'decision',products:string[])=>{
    const input=reviewMutation(request,kind);
    const row=await db.prepare('SELECT * FROM content WHERE id=?').bind(id).first<ContentRow>();
    if(!row || row.kind!=='review')throw failure('Review not found',404);
    const before:Content=JSON.parse(row.data);if(before.reviewType!=='quote')throw failure('Only submitted quote reviews use this workflow');
    if(row.revision!==input.revision)throw failure('Revision conflict',409);
    const after={...before};delete after.reviewConfirmation;
    if(kind==='edit'){after.review=input.review!;after.publicText=input.review!.quote;after.status='hold';}
    else {after.status=String(input.status);if(input.status==='approved'){const missing=approvalMissing(parseReviewDraft(after.review),input.confirmation!,products);if(missing.length)throw failure(`Review approval missing: ${missing.join(', ')}`);after.reviewConfirmation=input.confirmation;}}
    const current=JSON.stringify(after);
    const result=await db.batch([
      db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) SELECT id,revision+1,?,data,?,? FROM content WHERE id=? AND revision=?').bind(input.reason,current,new Date().toISOString(),id,row.revision),
      db.prepare('UPDATE content SET data=?,revision=revision+1 WHERE id=? AND revision=?').bind(current,id,row.revision),
    ]);
    if(result[1].meta.changes!==1)throw failure('Revision conflict',409);
    return {...after,kind:'review',revision:row.revision+1};
  };
  return {
    async initialize(seed: {claims?:Content[];products?:Content[];reviews?:Content[]}=ledger) {
      // Idempotent DDL enables a brand-new temporary D1 binding; no module request state.
      await db.batch(SCHEMA.map(sql=>db.prepare(sql)));
      // The Smart Store destination is a controlled seed record. Reconcile only this
      // record so a persistent D1 database cannot keep an obsolete channel URL while
      // submitted quotation reviews and their editorial history remain untouched.
      const canonical=(seed.reviews || []).find(item=>item.id===REVIEW_DESTINATION_ID);
      const canonicalHash=canonical ? Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(canonical))))).map(byte=>byte.toString(16).padStart(2,'0')).join('') : 'none';
      const migrationKey=`${REVIEW_DESTINATION_MIGRATION_PREFIX}:${canonicalHash}`;
      const migration=await db.prepare('SELECT value FROM metadata WHERE key=?').bind(migrationKey).first();
      if(!migration) {
        const canonical=(seed.reviews || []).find(item=>item.id===REVIEW_DESTINATION_ID);
        const existing=await db.prepare('SELECT * FROM content WHERE id=?').bind(REVIEW_DESTINATION_ID).first<ContentRow>();
        const statements:D1PreparedStatement[]=[];const now=new Date().toISOString();
        if(canonical && existing?.kind==='review') {
          const before:Content=JSON.parse(existing.data);
          if(before.reviewType!=='quote') {
            const next={...before,...canonical,id:REVIEW_DESTINATION_ID};
            const current=JSON.stringify(next);
            if(current!==existing.data) {
              statements.push(db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) SELECT id,revision+1,?,data,?,? FROM content WHERE id=? AND revision=?').bind('Canonical review destination seed sync; Smart Store URL, AI editorial review, not expert certification',current,now,REVIEW_DESTINATION_ID,existing.revision));
              statements.push(db.prepare('UPDATE content SET data=?,revision=revision+1 WHERE id=? AND revision=?').bind(current,REVIEW_DESTINATION_ID,existing.revision));
            }
          }
        }
        statements.push(db.prepare('INSERT OR IGNORE INTO metadata(key,value) VALUES(?,?)').bind(migrationKey,now));
        await db.batch(statements);
      }
      const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(seed))))).map(byte=>byte.toString(16).padStart(2,'0')).join('');
      const marker=`seed:v3-ledger:${hash}`;
      if(await db.prepare('SELECT value FROM metadata WHERE key=?').bind(marker).first())return;
      const statements:D1PreparedStatement[]=[];const now=new Date().toISOString();
      const seedByKind={
        claim:new Map((seed.claims || []).map(item=>[item.id,item])),
        product:new Map((seed.products || []).map(item=>[item.id,item])),
      };
      const existingRows=(await db.prepare('SELECT content.*, (SELECT reason FROM audit WHERE audit.content_id=content.id ORDER BY audit.id DESC LIMIT 1) AS last_reason FROM content WHERE kind IN (?,?)').bind('claim','product').all<SeedRow>()).results;
      for(const row of existingRows){
        const before=JSON.parse(row.data) as Content;
        const canonical=seedByKind[row.kind as 'claim'|'product']?.get(before.id);
        let after:Content|null=null;
        let reason='';
        if(!canonical){
          if(before.status==='approved'){
            after={...before,status:'hold',holdReason:before.holdReason || '현재 공개 원장에서 제거된 항목'};
            reason=SOURCE_RETIRE_REASON;
          }
        } else if(row.kind==='product'){
          const sourceRow=row.revision===1 || row.last_reason===SOURCE_PRODUCT_SYNC_REASON || LEGACY_DESTINATION.test(JSON.stringify(before));
          if(sourceRow){
            after={...before};
            for(const field of CONTROLLED_PRODUCT_FIELDS){const value=canonical[field];if(value!==undefined)Object.assign(after,{[field]:value});}
            reason=SOURCE_PRODUCT_SYNC_REASON;
          }
        } else {
          const sourceRow=row.revision===1 || row.last_reason===SOURCE_CLAIM_SYNC_REASON || LEGACY_DESTINATION.test(JSON.stringify(before)) || DISCOURAGED_CONSUMER_COPY.test(JSON.stringify(before));
          if(sourceRow){
            after={...before,...canonical,id:before.id,status:before.status==='hold'?'hold':canonical.status};
            reason=SOURCE_CLAIM_SYNC_REASON;
          }
        }
        if(after){
          const current=JSON.stringify(after);
          if(current!==row.data){
            const revision=row.revision+1;
            statements.push(db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) VALUES(?,?,?,?,?,?)').bind(row.id,revision,reason,row.data,current,now));
            statements.push(db.prepare('UPDATE content SET data=?,revision=? WHERE id=? AND revision=?').bind(current,revision,row.id,row.revision));
          }
        }
      }
      for(const [kind,items] of [['claim',seed.claims || []],['product',seed.products || []],['review',seed.reviews || []]] as const) for(const item of items) {
        // Audit before insert, only for previously absent IDs. Existing reviewed copies never overwritten.
        statements.push(db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) SELECT ?,1,?,NULL,?,? WHERE NOT EXISTS(SELECT 1 FROM content WHERE id=?)').bind(item.id,'Source ledger import; AI editorial review, not expert certification',JSON.stringify(item),now,item.id));
        statements.push(db.prepare('INSERT OR IGNORE INTO content(id,kind,data,revision) VALUES(?,?,?,1)').bind(item.id,kind,JSON.stringify(item)));
      }
      statements.push(db.prepare('INSERT OR IGNORE INTO metadata(key,value) VALUES(?,?)').bind(marker,now));
      await db.batch(statements);
    },
    async getOpsRun(id: string, key: unknown) {
      if(!uuid(id) || !opsKey(key))throw failure('Valid sandbox run credentials are required',401);
      const ownerHash=await hashOpsKey(key);
      const row=await db.prepare('SELECT id,data,revision,created_at,updated_at,expires_at,(SELECT COUNT(*) FROM ops_audit WHERE run_id=ops_runs.id) AS audit_count FROM ops_runs WHERE id=? AND owner_hash=? AND expires_at>?').bind(id.toLowerCase(),ownerHash,new Date().toISOString()).first<{id:string;data:string;revision:number;created_at:string;updated_at:string;expires_at:string;audit_count:number}>();
      if(!row)throw failure('Sandbox run not found or expired',404);
      const state=JSON.parse(row.data);const stateIssue=opsStateIssue(state);if(stateIssue)throw failure(`Sandbox state rejected by storage policy: ${stateIssue}`,500);
      return {runId:row.id,state,revision:row.revision,createdAt:row.created_at,updatedAt:row.updated_at,expiresAt:row.expires_at,serverPersisted:true,auditCount:row.audit_count};
    },
    async putOpsRun(id: string, key: unknown, state: unknown, expectedRevision?: number) {
      if(!uuid(id) || !opsKey(key))throw failure('Valid sandbox run credentials are required',401);
      if(!object(state))throw failure('Sandbox state must be a JSON object');
      if(expectedRevision!==undefined && (!Number.isInteger(expectedRevision) || expectedRevision<0))throw failure('Sandbox run revision must be a non-negative integer');
      const stateIssue=opsStateIssue(state);if(stateIssue)throw failure(stateIssue);
      const data=JSON.stringify(state);if(new TextEncoder().encode(data).byteLength>OPS_MAX_BYTES)throw failure('Sandbox state too large',413);
      const ownerHash=await hashOpsKey(key);const normalizedId=id.toLowerCase();const now=new Date().toISOString();const expiresAt=new Date(Date.now()+OPS_TTL_DAYS*24*60*60*1000).toISOString();
      const existing=await db.prepare('SELECT owner_hash,revision FROM ops_runs WHERE id=?').bind(normalizedId).first<{owner_hash:string;revision:number}>();
      if(existing && existing.owner_hash!==ownerHash)throw failure('Sandbox run credential mismatch',403);
      if(expectedRevision!==undefined && expectedRevision!==(existing?.revision ?? 0))throw failure('Sandbox run revision conflict',409);
      const revision=(existing?.revision ?? 0)+1;
      const statements=existing ? [
        db.prepare('INSERT INTO ops_audit(run_id,revision,action,data,created_at) VALUES(?,?,?,?,?)').bind(normalizedId,revision,'snapshot',data,now),
        db.prepare('UPDATE ops_runs SET data=?,revision=?,updated_at=?,expires_at=? WHERE id=? AND owner_hash=? AND revision=?').bind(data,revision,now,expiresAt,normalizedId,ownerHash,revision-1),
      ] : [
        db.prepare('INSERT INTO ops_runs(id,owner_hash,data,revision,created_at,updated_at,expires_at) VALUES(?,?,?,?,?,?,?)').bind(normalizedId,ownerHash,data,revision,now,now,expiresAt),
        db.prepare('INSERT INTO ops_audit(run_id,revision,action,data,created_at) VALUES(?,?,?,?,?)').bind(normalizedId,revision,'created',data,now),
      ];
      const result=await db.batch(statements);if(result[existing?1:0].meta.changes!==1)throw failure('Sandbox run revision conflict',409);
      return {runId:normalizedId,state,revision,createdAt:existing?undefined:now,updatedAt:now,expiresAt,serverPersisted:true};
    },
    async deleteOpsRun(id: string, key: unknown) {
      if(!uuid(id) || !opsKey(key))throw failure('Valid sandbox run credentials are required',401);
      const ownerHash=await hashOpsKey(key);const result=await db.prepare('DELETE FROM ops_runs WHERE id=? AND owner_hash=?').bind(id.toLowerCase(),ownerHash).run();if(result.meta.changes!==1)throw failure('Sandbox run not found',404);return {deleted:true};
    },
    adminContent:all,
    async publicContent() {
      const items=await all();
      const claims=items.filter(c=>c.kind==='claim' && c.status==='approved' && c.publicText && sources(c).length).map(c=>({id:c.id,topic:c.topic,publicText:c.publicText,status:c.status,sources:sources(c),revision:c.revision,...(metadata(c.metadata || c.structuredData)?{metadata:metadata(c.metadata || c.structuredData)}:{})}));
      const ids=new Set(claims.map(c=>c.id));
      const products=items.filter(p=>p.kind==='product' && p.status==='approved' && p.sourceIds?.length && p.sourceIds.every(id=>ids.has(id))).map(p=>Object.fromEntries(['id','name','amountMg','servings','totalG','officialUrl','availability','priceDisplay','sourceIds','revision','publicText'].filter(key=>p[key]!==undefined).map(key=>[key,p[key]])));
      const reviews=items.filter(item=>item.kind==='review').flatMap<RecordValue>(item=>{
        if(item.reviewType==='quote'){const quote=publicReview(item,products.map(p=>String(p.id)));return quote?[quote]:[];}
        return item.status==='approved' && reviewLink(item)?[{id:item.id,status:item.status,publicText:REVIEW_DESTINATION_TEXT,sourceTitle:item.sourceTitle,sourceUrl:item.sourceUrl,limitations:item.limitations}]:[];
      });
      return {claims,products,reviews};
    },
    async update(id:string,patch:unknown) {
      if(!object(patch) || Object.keys(patch).some(key=>!['revision','reason','publicText','status'].includes(key)))throw failure('Invalid update');
      if(!Number.isInteger(patch.revision) || typeof patch.reason!=='string' || !patch.reason.trim() || patch.reason.length>1000)throw failure('Revision and reason are required');
      if(patch.status!==undefined && (typeof patch.status!=='string' || !['approved','hold'].includes(patch.status)))throw failure('Invalid status');
      if(patch.publicText!==undefined && (typeof patch.publicText!=='string' || !patch.publicText.trim() || patch.publicText.length>5000))throw failure('Invalid publicText');
      if(patch.status===undefined && patch.publicText===undefined)throw failure('No content change');
      const row=await db.prepare('SELECT * FROM content WHERE id=?').bind(id).first<ContentRow>();
      if(!row)throw failure('Content not found',404);
      if(row.revision!==patch.revision)throw failure('Revision conflict',409);
      const before:Content=JSON.parse(row.data);const after={...before};
      if(row.kind==='review' && before.reviewType==='quote')throw failure('Use the dedicated review workflow');
      if(row.kind==='review' && before.id===REVIEW_DESTINATION_ID && typeof patch.publicText==='string' && patch.publicText.trim()!==REVIEW_DESTINATION_TEXT)throw failure('Review destination text is fixed; submit quotations through the review workflow');
      const changed=typeof patch.publicText==='string' && patch.publicText.trim()!==before.publicText;
      if(typeof patch.publicText==='string')after.publicText=patch.publicText.trim();
      if(row.kind==='review' && before.id===REVIEW_DESTINATION_ID)after.publicText=REVIEW_DESTINATION_TEXT;
      after.status=typeof patch.status==='string'?patch.status:(changed?'hold':before.status);
      if(after.status==='approved') {
        if(row.kind==='review' && !reviewLink(after))throw failure('Only the verified review destination may be approved; quote rights not established');
        if(row.kind==='claim' && (!after.publicText || !sources(after).length))throw failure('Approval requires public text and public source');
        if(row.kind==='product') {
          const publicData=await this.publicContent();const approved=new Set(publicData.claims.map(c=>c.id));
          if(!after.sourceIds?.length || !after.sourceIds.every(source=>approved.has(source)))throw failure('Approval requires approved source claims');
        }
      }
      const revision=row.revision+1;const current=JSON.stringify(after);
      // Both statements use the same expected revision inside a transactional D1 batch.
      const result=await db.batch([
        db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) SELECT id,revision+1,?,data,?,? FROM content WHERE id=? AND revision=?').bind(patch.reason.trim(),current,new Date().toISOString(),id,row.revision),
        db.prepare('UPDATE content SET data=?,revision=revision+1 WHERE id=? AND revision=?').bind(current,id,row.revision),
      ]);
      if(result[1].meta.changes!==1)throw failure('Revision conflict',409);
      return {...after,kind:row.kind,revision};
    },
    async history(){return (await db.prepare('SELECT * FROM audit ORDER BY id DESC LIMIT 500').all<{previous:string|null;current:string}>()).results.map(r=>({...r,previous:r.previous?JSON.parse(r.previous):null,current:JSON.parse(r.current)}));},
    async createReview(request:unknown){
      const input=reviewMutation(request,'create'),id=`review-${crypto.randomUUID()}`;
      const item={id,reviewType:'quote',status:'hold',review:input.review!,publicText:input.review!.quote};
      await db.batch([db.prepare('INSERT INTO content(id,kind,data,revision) VALUES(?,?,?,1)').bind(id,'review',JSON.stringify(item)),db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) VALUES(?,1,?,NULL,?,?)').bind(id,input.reason,JSON.stringify(item),new Date().toISOString())]);
      return {...item,kind:'review',revision:1};
    },
    async editReview(id:string,request:unknown){return mutateReview(id,request,'edit',[]);},
    async decideReview(id:string,request:unknown){return mutateReview(id,request,'decision',(await this.publicContent()).products.map(p=>String(p.id)));},
    async event(body:unknown) {
      if(!object(body) || Object.keys(body).some(key=>!['eventId','flowId','name','properties'].includes(key)) || typeof body.name!=='string' || !EVENTS.has(body.name) || !uuid(body.eventId))throw failure('Invalid event envelope');
      if(body.flowId!==undefined && !uuid(body.flowId))throw failure('Invalid anonymous flow UUID');
      const properties=body.properties ?? {};if(!object(properties))throw failure('Invalid properties');
      const clean:Record<string,string>={};
      if(properties.productId!==undefined){if(typeof properties.productId!=='string' || !['gaba1500'].includes(properties.productId))throw failure('Invalid product');clean.productId=properties.productId;}
      if(properties.path!==undefined){if(typeof properties.path!=='string' || !PATHS.has(properties.path))throw failure('Invalid path');clean.path=properties.path;}
      if(properties.channel!==undefined){if(typeof properties.channel!=='string' || !['native','clipboard','download','kakao','instagram','direct'].includes(properties.channel))throw failure('Invalid channel');clean.channel=properties.channel;}
      if(properties.questionId!==undefined){if(typeof properties.questionId!=='string' || !['amount','selection','label','reviews','evidence'].includes(properties.questionId))throw failure('Invalid question');clean.questionId=properties.questionId;}
      if(properties.campaignId!==undefined){if(typeof properties.campaignId!=='string' || !/^[A-Za-z0-9_-]{1,64}$/.test(properties.campaignId))throw failure('Invalid campaign');clean.campaignId=properties.campaignId;}
      if(properties.referralId!==undefined){if(typeof properties.referralId!=='string' || !/^[A-Za-z0-9_-]{8,64}$/.test(properties.referralId))throw failure('Invalid referral');clean.referralId=properties.referralId;}
      const result=await db.prepare('INSERT OR IGNORE INTO events(id,name,properties,created_at,flow_id) VALUES(?,?,?,?,?)').bind(body.eventId.toLowerCase(),body.name,JSON.stringify(clean),new Date().toISOString(),typeof body.flowId==='string'?body.flowId.toLowerCase():null).run();
      return {accepted:true,duplicate:result.meta.changes===0};
    },
    async analytics() {
      const scopes=await Promise.all(SHARE_SCOPES.map(async([id,path,start])=>{const counts=await db.prepare(SHARE_SCOPE_SQL).bind(path,start).first<ShareCounts>();if(!counts)throw failure('Analytics unavailable',503);return {id,path,...counts,attemptRate:counts.denominator?counts.attemptFlows/counts.denominator:null};}));
      const unscoped=await db.prepare(UNSCOPED_SHARE_SQL).first<{count:number}>();
      const sharingMetrics={scopes,unscopedShareEvents:unscoped?.count ?? 0,confirmedDeliverySupported:false};
      const goalEvents=['landing_view','hero_check_start','rhythm_check_complete','result_share_click','shared_link_landed','product_compare_view','purchase_cta_click'];
      const goalFunnel=await Promise.all(goalEvents.map(async event=>{const [flowCount,eventCount]=await Promise.all([db.prepare('SELECT COUNT(DISTINCT flow_id) AS count FROM events WHERE name=? AND flow_id IS NOT NULL').bind(event).first<{count:number}>(),db.prepare('SELECT COUNT(*) AS count FROM events WHERE name=?').bind(event).first<{count:number}>()]);return {event,flows:flowCount?.count ?? 0,events:eventCount?.count ?? 0};}));
      const pairs=[['landing_to_check','landing_view','rhythm_check_started'],['check_completion','rhythm_check_started','rhythm_check_completed'],['result_to_story','result_viewed','gaba_story_viewed'],['comparison_to_purchase_click','product_comparison_viewed','purchase_outbound_clicked']];
      const funnels=await Promise.all(pairs.map(async([id,from,to])=>{const r=await db.prepare('WITH starts AS (SELECT flow_id,MIN(rowid) AS first_row FROM events WHERE name=? AND flow_id IS NOT NULL GROUP BY flow_id) SELECT COUNT(*) AS denominator,COALESCE(SUM(CASE WHEN EXISTS(SELECT 1 FROM events e WHERE e.flow_id=starts.flow_id AND e.name=? AND e.rowid>starts.first_row) THEN 1 ELSE 0 END),0) AS numerator FROM starts').bind(from,to).first<{denominator:number;numerator:number}>();if(!r)throw failure('Analytics unavailable',503);return {id,from,to,...r,rate:r.denominator?r.numerator/r.denominator:null,denominatorDefinition:'Distinct anonymous in-memory flows with from event',numeratorDefinition:'Those flows with a later received to event; counted once'};}));
      const [counts,byProduct,range,coverage,audit]=await Promise.all([
        db.prepare('SELECT name,COUNT(*) AS count FROM events GROUP BY name ORDER BY name').all(),
        db.prepare("SELECT json_extract(properties,'$.productId') AS productId,name,COUNT(*) AS count FROM events WHERE json_extract(properties,'$.productId') IS NOT NULL GROUP BY productId,name").all(),
        db.prepare('SELECT MIN(created_at) AS value FROM events').first<{value:string|null}>(),
        db.prepare('SELECT COUNT(DISTINCT flow_id) AS distinctFlows,COALESCE(SUM(CASE WHEN flow_id IS NULL THEN 1 ELSE 0 END),0) AS eventsWithoutFlow FROM events').first(),
        db.prepare('SELECT COUNT(*) AS count FROM audit').first<{count:number}>(),
      ]);
      return {counts:counts.results,byProduct:byProduct.results,funnels,goalFunnel,sharingMetrics,window:{kind:'all_collected_events',from:range?.value ?? null,to:new Date().toISOString(),ordering:'Server receipt order; no client timestamps',flowScope:'Browser in-memory page lifetime, not unique people'},coverage,actualPurchases:{supported:false,count:null,reason:'No verified order integration. Purchase clicks are not purchases.'},returningVisitors:{supported:false,rate:null,reason:'Seven-day return requires a future consented identity policy.'},sharing:{confirmedDeliverySupported:false,requestToLandingRate:{supported:false,rate:null,reason:'Sender and recipient are different flows; no matched referral attribution.'}},auditCount:audit?.count ?? 0};
    },
  };
}
