import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { reviewMutation, approvalMissing, publicReview, REVIEW_DESTINATION_TEXT } from '../src/domain/reviews.ts';
import { opsStateIssue } from '../src/domain/ops-validation.ts';

export const EVENT_NAMES = new Set(['landing_view','hero_check_start','rhythm_check_started','rhythm_check_completed','rhythm_check_complete','result_viewed','gaba_story_viewed','evidence_opened','review_opened','review_source_click','review_section_navigated','purchase_question_opened','share_image_generated','share_requested','share_cancelled','share_link_copied','share_image_downloaded','result_share_click','result_share_success','shared_link_landed','friend_check_start','product_comparison_viewed','product_compare_view','purchase_outbound_clicked','purchase_cta_click','challenge_start','challenge_day_complete','seven_day_complete','teaser_impression','teaser_play']);
export const EVENT_PATHS = new Set(['/','/story','/technology','/products','/research','/reviews','/check','/result','/share','/admin','/teaser','/challenge']);
const publicSources = (value) => (value.sources || []).filter(s => typeof s.url === 'string' && /^https:\/\//.test(s.url)).map(({title,url,page,locator}) => ({title,url,page,locator}));
const failure = (message, status = 400) => Object.assign(new Error(message), { status });
const isUuid = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const PUBLIC_METADATA_FIELDS = new Set(['studyType','population','sampleSize','dose','duration','comparison','outcome','productApplicability','question','searchThrough','studyCount','consumerScope','consumerSummary','hopefulTakeaway']);
const SHARE_SCOPES=[['own_result','/result','result_viewed'],['incoming_result','/share','result_viewed'],['product_comparison','/products','product_comparison_viewed']];
const OPS_MAX_BYTES=65536;
const OPS_TTL_DAYS=30;
const REVIEW_DESTINATION_ID='shop-review-destination-1500';
const REVIEW_DESTINATION_MIGRATION_PREFIX='migration:review-destination-smartstore:v1';
const SOURCE_CLAIM_SYNC_REASON='Current source ledger reconciliation refreshed seed claim fields';
const SOURCE_PRODUCT_SYNC_REASON='Current source ledger reconciliation refreshed controlled product fields';
const SOURCE_RETIRE_REASON='Current source ledger reconciliation retired removed public content';
const SHARE_SCOPE_SQL=`WITH scoped AS (SELECT rowid AS seq,flow_id,name FROM events WHERE json_extract(properties,'$.path')=? AND flow_id IS NOT NULL), starts AS (SELECT flow_id,MIN(seq) AS first_seq FROM scoped WHERE name=? GROUP BY flow_id), steps AS (SELECT EXISTS(SELECT 1 FROM scoped e WHERE e.flow_id=s.flow_id AND e.seq>s.first_seq AND e.name='share_requested') AS requested,EXISTS(SELECT 1 FROM scoped e WHERE e.flow_id=s.flow_id AND e.seq>s.first_seq AND e.name='share_link_copied') AS copied,EXISTS(SELECT 1 FROM scoped e WHERE e.flow_id=s.flow_id AND e.seq>s.first_seq AND e.name='share_image_downloaded') AS downloaded,EXISTS(SELECT 1 FROM scoped e WHERE e.flow_id=s.flow_id AND e.seq>s.first_seq AND e.name='share_cancelled') AS cancelled FROM starts s) SELECT COUNT(*) AS denominator,COALESCE(SUM(CASE WHEN requested OR copied OR downloaded THEN 1 ELSE 0 END),0) AS attemptFlows,COALESCE(SUM(requested),0) AS requestedFlows,COALESCE(SUM(copied),0) AS copiedFlows,COALESCE(SUM(downloaded),0) AS downloadedFlows,COALESCE(SUM(cancelled),0) AS cancelledFlows FROM steps`;
const UNSCOPED_SHARE_SQL="SELECT COUNT(*) AS count FROM events WHERE name IN ('share_requested','share_link_copied','share_image_downloaded','share_cancelled') AND COALESCE(json_extract(properties,'$.path'),'') NOT IN ('/result','/share','/products')";
function reviewLink(value) {
  if(value.id!==REVIEW_DESTINATION_ID || value.originalPublic!==true || typeof value.sourceUrl!=='string')return false;
  try{const url=new URL(value.sourceUrl);return url.protocol==='https:' && url.hostname==='smartstore.naver.com' && url.pathname==='/cellpinda/products/4701017202';}catch{return false;}
}
function publicMetadata(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const output={};
  for (const [key,item] of Object.entries(value)) {
    if (!PUBLIC_METADATA_FIELDS.has(key)) continue;
    if (typeof item === 'string' && item.length <= 3000) output[key]=item;
    else if (typeof item === 'number' && Number.isFinite(item)) output[key]=item;
    else if (Array.isArray(item) && item.length<=20 && item.every(text=>typeof text === 'string' && text.length<=1000)) output[key]=item;
  }
  return Object.keys(output).length ? output : undefined;
}

export function createStore({ dbPath, seedPath, seed } = {}) {
  if (dbPath !== ':memory:') mkdirSync(dirname(dbPath), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; CREATE TABLE IF NOT EXISTS content (id TEXT PRIMARY KEY, kind TEXT NOT NULL, data TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1); CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT, content_id TEXT NOT NULL, revision INTEGER NOT NULL, reason TEXT NOT NULL, previous TEXT, current TEXT NOT NULL, created_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, name TEXT NOT NULL, properties TEXT NOT NULL, created_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL); CREATE TABLE IF NOT EXISTS ops_runs (id TEXT PRIMARY KEY, owner_hash TEXT NOT NULL, data TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, expires_at TEXT NOT NULL); CREATE INDEX IF NOT EXISTS ops_runs_owner_expires ON ops_runs(owner_hash,expires_at); CREATE TABLE IF NOT EXISTS ops_audit (id INTEGER PRIMARY KEY AUTOINCREMENT, run_id TEXT NOT NULL, revision INTEGER NOT NULL, action TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL); CREATE INDEX IF NOT EXISTS ops_audit_run ON ops_audit(run_id,id);');
  if (!db.prepare('PRAGMA table_info(events)').all().some(column=>column.name==='flow_id')) db.exec('ALTER TABLE events ADD COLUMN flow_id TEXT');
  db.exec('CREATE INDEX IF NOT EXISTS events_flow_name ON events(flow_id,name);');
  { // Add newly verified source rows while preserving operator edits and their history.
    const initial = seed || JSON.parse(readFileSync(seedPath, 'utf8'));
    db.exec('BEGIN IMMEDIATE');
    try {
      for (const [plural, kind] of [['claims','claim'],['products','product'],['reviews','review']]) {
        for (const item of initial[plural] || []) {
          const inserted=db.prepare('INSERT OR IGNORE INTO content(id,kind,data) VALUES(?,?,?)').run(item.id,kind,JSON.stringify(item));
          if(!inserted.changes)continue;
          db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) VALUES(?,1,?,NULL,?,?)').run(item.id,'Initial source ledger import; AI editorial status, not expert certification',JSON.stringify(item),new Date().toISOString());
        }
      }
      // Reconcile rows from an older local database with the current source ledger.
      // The original seed import intentionally preserved edits, but it also meant
      // retired products and superseded consumer copy could remain publicly visible
      // after a ledger change. Update only controlled seed fields and keep every
      // change in the audit trail.
      const seedByKind = {
        claim: new Map((initial.claims || []).map(item => [item.id, item])),
        product: new Map((initial.products || []).map(item => [item.id, item])),
      };
      const discouragedConsumerCopy = /뚜렷한\s*차이는\s*확인되지|유의한\s*차이는\s*확인되지|개선이\s*확인된\s*것은\s*아닙니다|제한적(?:인)?\s*근거|매우\s*제한적|연구\s*간\s*결과가\s*일치하지|정량\s*메타분석.*수행하지|다만\s*GABA만의\s*효과|결과를\s*한\s*문장으로\s*묶기\s*어려/;
      const legacyDestination = /cellpinda\.co\.kr|cellpindamall\.com|공식몰/;
      const controlledProductFields = ['name','amountMg','servings','totalG','officialUrl','availability','sourceIds'];
      for (const [kind, seedMap] of Object.entries(seedByKind)) {
        for (const row of db.prepare('SELECT content.*, (SELECT reason FROM audit WHERE audit.content_id=content.id ORDER BY audit.id DESC LIMIT 1) AS last_reason FROM content WHERE kind=?').all(kind)) {
          const before = JSON.parse(row.data);
          const canonical = seedMap.get(before.id);
          let after = null;
          let reason = '';
          if (!canonical) {
            // Claims/products removed from the current public ledger are retired;
            // their historical row remains available to local operators.
            if (before.status === 'approved') {
              after = {...before, status:'hold', holdReason: before.holdReason || '현재 공개 원장에서 제거된 항목'};
              reason = SOURCE_RETIRE_REASON;
            }
          } else if (kind === 'product') {
            const sourceRow = row.revision === 1 || row.last_reason === SOURCE_PRODUCT_SYNC_REASON || legacyDestination.test(JSON.stringify(before));
            if (sourceRow) {
              after = {...before};
              for (const field of controlledProductFields) {
                if (canonical[field] !== undefined) after[field] = canonical[field];
              }
              reason = SOURCE_PRODUCT_SYNC_REASON;
            }
          } else if (kind === 'claim' && (row.revision === 1 || row.last_reason === SOURCE_CLAIM_SYNC_REASON || legacyDestination.test(JSON.stringify(before)) || discouragedConsumerCopy.test(JSON.stringify(before)))) {
            // Refresh unedited seed claims and rows whose public destination/copy
            // is known to be stale. Operator edits have a higher revision and
            // remain intact unless they contain a blocked legacy phrase. A hold
            // is preserved so reconciliation never silently approves content.
            after = {...before, ...canonical, id: before.id, status: before.status === 'hold' ? 'hold' : canonical.status};
            reason = row.revision === 1 || row.last_reason === SOURCE_CLAIM_SYNC_REASON
              ? SOURCE_CLAIM_SYNC_REASON
              : 'Current source ledger reconciliation refreshed stale public copy';
          }
          if (after) {
            const current = JSON.stringify(after);
            if (current !== row.data) {
              const revision = row.revision + 1;
              db.prepare('UPDATE content SET data=?,revision=? WHERE id=? AND revision=?').run(current,revision,row.id,row.revision);
              db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) VALUES(?,?,?,?,?,?)').run(row.id,revision,reason,row.data,current,new Date().toISOString());
            }
          }
        }
      }
      // Reconcile the controlled Smart Store destination on existing databases.
      // Submitted quote reviews keep their own editorial workflow and history.
      const canonical=(initial.reviews || []).find(item=>item.id===REVIEW_DESTINATION_ID);
      const canonicalHash=createHash('sha256').update(JSON.stringify(canonical || null),'utf8').digest('hex');
      const migrationKey=`${REVIEW_DESTINATION_MIGRATION_PREFIX}:${canonicalHash}`;
      const migration= db.prepare('SELECT value FROM metadata WHERE key=?').get(migrationKey);
      if(!migration) {
        const existing=db.prepare('SELECT * FROM content WHERE id=?').get(REVIEW_DESTINATION_ID);
        if(canonical && existing?.kind==='review') {
          const before=JSON.parse(existing.data);
          if(before.reviewType!=='quote') {
            const next={...before,...canonical,id:REVIEW_DESTINATION_ID};
            const current=JSON.stringify(next);
            if(current!==existing.data) {
              const revision=existing.revision+1;
              db.prepare('UPDATE content SET data=?,revision=? WHERE id=? AND revision=?').run(current,revision,REVIEW_DESTINATION_ID,existing.revision);
              db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) VALUES(?,?,?,?,?,?)').run(REVIEW_DESTINATION_ID,revision,'Canonical review destination seed sync; Smart Store URL, AI editorial review, not expert certification',existing.data,current,new Date().toISOString());
            }
          }
        }
        db.prepare('INSERT OR IGNORE INTO metadata(key,value) VALUES(?,?)').run(migrationKey,new Date().toISOString());
      }
      db.prepare('INSERT OR IGNORE INTO metadata(key,value) VALUES(?,?)').run('seeded','1');
      db.exec('COMMIT');
    } catch (error) { db.exec('ROLLBACK'); db.close(); throw error; }
  }
  const rows = () => db.prepare('SELECT * FROM content ORDER BY rowid').all().map(row => ({...JSON.parse(row.data),kind:row.kind,revision:row.revision}));
  const validOpsKey = value => typeof value === 'string' && value.length >= 32 && value.length <= 128;
  const hashOpsKey = value => createHash('sha256').update(value,'utf8').digest('hex');
  const opsCredentials = (id,key) => { if (!isUuid(id) || !validOpsKey(key)) throw failure('Valid sandbox run credentials are required',401); return {id:id.toLowerCase(),ownerHash:hashOpsKey(key)}; };
  const mutateReview=(id,request,kind,products)=>{
    const input=reviewMutation(request,kind);db.exec('BEGIN IMMEDIATE');
    try{
      const row=db.prepare('SELECT * FROM content WHERE id=?').get(id);
      if(!row || row.kind!=='review')throw failure('Review not found',404);
      const before=JSON.parse(row.data);if(before.reviewType!=='quote')throw failure('Only submitted quote reviews use this workflow',400);
      if(row.revision!==input.revision)throw failure('Revision conflict',409);
      const after={...before};delete after.reviewConfirmation;
      if(kind==='edit'){after.review=input.review;after.publicText=input.review.quote;after.status='hold';}
      else{after.status=input.status;if(input.status==='approved'){const missing=approvalMissing(after.review,input.confirmation,products);if(missing.length)throw failure(`Review approval missing: ${missing.join(', ')}`);after.reviewConfirmation=input.confirmation;}}
      const revision=row.revision+1;
      db.prepare('UPDATE content SET data=?,revision=? WHERE id=?').run(JSON.stringify(after),revision,id);
      db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) VALUES(?,?,?,?,?,?)').run(id,revision,input.reason,row.data,JSON.stringify(after),new Date().toISOString());db.exec('COMMIT');return {...after,kind:'review',revision};
    }catch(error){db.exec('ROLLBACK');throw error;}
  };
  return {
    close: () => db.close(),
    adminContent: rows,
    publicContent() {
      const all = rows();
      const claims = all.filter(c => c.kind === 'claim' && c.status === 'approved' && c.publicText && publicSources(c).length).map(c => ({id:c.id,topic:c.topic,publicText:c.publicText,status:c.status,sources:publicSources(c),revision:c.revision,...(publicMetadata(c.metadata || c.structuredData) ? {metadata:publicMetadata(c.metadata || c.structuredData)} : {})}));
      const approvedIds = new Set(claims.map(c => c.id));
      const products = all.filter(p => p.kind === 'product' && p.status === 'approved' && p.sourceIds?.length && p.sourceIds.every(id => approvedIds.has(id))).map(({id,name,amountMg,servings,totalG,officialUrl,availability,priceDisplay,sourceIds,revision,publicText}) => ({id,name,amountMg,servings,totalG,officialUrl,availability,priceDisplay,sourceIds,revision,...(publicText ? {publicText} : {})}));
      const reviews=all.filter(item=>item.kind==='review').flatMap(item=>{if(item.reviewType==='quote'){const quote=publicReview(item,products.map(p=>p.id));return quote?[quote]:[];}return item.status==='approved' && reviewLink(item)?[{id:item.id,status:item.status,publicText:REVIEW_DESTINATION_TEXT,sourceTitle:item.sourceTitle,sourceUrl:item.sourceUrl,limitations:item.limitations}]:[];});
      return {claims,products,reviews};
    },
    getOpsRun(id,key) {
      const credentials=opsCredentials(id,key);const row=db.prepare('SELECT id,data,revision,created_at,updated_at,expires_at,(SELECT COUNT(*) FROM ops_audit WHERE run_id=ops_runs.id) AS audit_count FROM ops_runs WHERE id=? AND owner_hash=? AND expires_at>?').get(credentials.id,credentials.ownerHash,new Date().toISOString());
      if(!row)throw failure('Sandbox run not found or expired',404);
      const state=JSON.parse(row.data);const stateIssue=opsStateIssue(state);if(stateIssue)throw failure(`Sandbox state rejected by storage policy: ${stateIssue}`,500);
      return {runId:row.id,state,revision:row.revision,createdAt:row.created_at,updatedAt:row.updated_at,expiresAt:row.expires_at,serverPersisted:true,auditCount:row.audit_count};
    },
    putOpsRun(id,key,state,expectedRevision) {
      const credentials=opsCredentials(id,key);if(!state || typeof state !== 'object' || Array.isArray(state))throw failure('Sandbox state must be a JSON object');
      if(expectedRevision!==undefined && (!Number.isInteger(expectedRevision) || expectedRevision<0))throw failure('Sandbox run revision must be a non-negative integer');
      const stateIssue=opsStateIssue(state);if(stateIssue)throw failure(stateIssue);
      const data=JSON.stringify(state);if(Buffer.byteLength(data,'utf8')>OPS_MAX_BYTES)throw failure('Sandbox state too large',413);
      const now=new Date();const nowIso=now.toISOString();const expiresAt=new Date(now.getTime()+OPS_TTL_DAYS*24*60*60*1000).toISOString();
      let existing=db.prepare('SELECT owner_hash,revision,created_at,expires_at FROM ops_runs WHERE id=?').get(credentials.id);
      if(existing && existing.expires_at<=nowIso){db.exec('BEGIN IMMEDIATE');try{db.prepare('DELETE FROM ops_audit WHERE run_id=?').run(credentials.id);db.prepare('DELETE FROM ops_runs WHERE id=?').run(credentials.id);db.exec('COMMIT');existing=undefined;}catch(error){db.exec('ROLLBACK');throw error;}}
      if(existing && existing.owner_hash!==credentials.ownerHash)throw failure('Sandbox run credential mismatch',403);
      if(expectedRevision!==undefined && expectedRevision!==(existing?.revision ?? 0))throw failure('Sandbox run revision conflict',409);
      const revision=(existing?.revision ?? 0)+1;db.exec('BEGIN IMMEDIATE');
      try {
        if(existing){db.prepare('INSERT INTO ops_audit(run_id,revision,action,data,created_at) VALUES(?,?,?,?,?)').run(credentials.id,revision,'snapshot',data,nowIso);const result=db.prepare('UPDATE ops_runs SET data=?,revision=?,updated_at=?,expires_at=? WHERE id=? AND owner_hash=? AND revision=?').run(data,revision,nowIso,expiresAt,credentials.id,credentials.ownerHash,revision-1);if(result.changes!==1)throw failure('Sandbox run revision conflict',409);}
        else {db.prepare('INSERT INTO ops_runs(id,owner_hash,data,revision,created_at,updated_at,expires_at) VALUES(?,?,?,?,?,?,?)').run(credentials.id,credentials.ownerHash,data,revision,nowIso,nowIso,expiresAt);db.prepare('INSERT INTO ops_audit(run_id,revision,action,data,created_at) VALUES(?,?,?,?,?)').run(credentials.id,revision,'created',data,nowIso);}
        db.exec('COMMIT');
      } catch(error){db.exec('ROLLBACK');throw error;}
      return {runId:credentials.id,state,revision,createdAt:existing?.created_at ?? nowIso,updatedAt:nowIso,expiresAt,serverPersisted:true};
    },
    deleteOpsRun(id,key) {
      const credentials=opsCredentials(id,key);const result=db.prepare('DELETE FROM ops_runs WHERE id=? AND owner_hash=?').run(credentials.id,credentials.ownerHash);if(result.changes!==1)throw failure('Sandbox run not found',404);db.prepare('DELETE FROM ops_audit WHERE run_id=?').run(credentials.id);return {deleted:true};
    },
    update(id, patch) {
      if (!patch || typeof patch !== 'object' || Array.isArray(patch)) throw failure('Invalid update');
      if (Object.keys(patch).some(k => !['publicText','status','reason','revision'].includes(k))) throw failure('Unknown update field');
      if (!Number.isInteger(patch.revision) || typeof patch.reason !== 'string' || !patch.reason.trim() || patch.reason.length > 1000) throw failure('Revision and reason are required');
      if (patch.status !== undefined && !['approved','hold'].includes(patch.status)) throw failure('Invalid status');
      if (patch.publicText !== undefined && (typeof patch.publicText !== 'string' || !patch.publicText.trim() || patch.publicText.length > 5000)) throw failure('Invalid publicText');
      if (patch.status === undefined && patch.publicText === undefined) throw failure('No content change');
      db.exec('BEGIN IMMEDIATE');
      try {
        const row = db.prepare('SELECT * FROM content WHERE id=?').get(id);
        if (!row) throw failure('Content not found',404);
        if (row.revision !== patch.revision) throw failure('Revision conflict',409);
        const before = JSON.parse(row.data);
        if(row.kind==='review' && before.reviewType==='quote')throw failure('Use the dedicated review workflow');
        if(row.kind==='review' && before.id===REVIEW_DESTINATION_ID && patch.publicText!==undefined && patch.publicText.trim()!==REVIEW_DESTINATION_TEXT)throw failure('Review destination text is fixed; submit quotations through the review workflow');
        const after = {...before};
        const changed = patch.publicText !== undefined && patch.publicText !== before.publicText;
        if (patch.publicText !== undefined) after.publicText = patch.publicText.trim();
        if(row.kind==='review' && before.id===REVIEW_DESTINATION_ID)after.publicText=REVIEW_DESTINATION_TEXT;
        after.status = patch.status ?? (changed ? 'hold' : before.status);
        if (after.status === 'approved') {
          if(row.kind==='review' && !reviewLink(after))throw failure('Only the verified review destination may be approved; quote rights not established');
          if (row.kind === 'claim' && (!after.publicText || !publicSources(after).length)) throw failure('Approval requires public text and public source');
          if (row.kind === 'product' && (!after.sourceIds?.length || !after.sourceIds.every(sourceId => { const source = db.prepare('SELECT data,kind FROM content WHERE id=?').get(sourceId); if (!source || source.kind !== 'claim') return false; const value = JSON.parse(source.data); return value.status === 'approved' && publicSources(value).length > 0; }))) throw failure('Approval requires approved source claims');
        }
        const revision = row.revision + 1;
        db.prepare('UPDATE content SET data=?,revision=? WHERE id=?').run(JSON.stringify(after),revision,id);
        db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) VALUES(?,?,?,?,?,?)').run(id,revision,patch.reason.trim(),row.data,JSON.stringify(after),new Date().toISOString());
        db.exec('COMMIT');
        return {...after,kind:row.kind,revision};
      } catch (error) { db.exec('ROLLBACK'); throw error; }
    },
    history: () => db.prepare('SELECT * FROM audit ORDER BY id DESC LIMIT 500').all().map(r => ({...r,previous:r.previous ? JSON.parse(r.previous) : null,current:JSON.parse(r.current)})),
    createReview(request){
      const input=reviewMutation(request,'create'),id=`review-${randomUUID()}`;
      const item={id,reviewType:'quote',status:'hold',review:input.review,publicText:input.review.quote};db.exec('BEGIN IMMEDIATE');
      try{db.prepare('INSERT INTO content(id,kind,data,revision) VALUES(?,?,?,1)').run(id,'review',JSON.stringify(item));db.prepare('INSERT INTO audit(content_id,revision,reason,previous,current,created_at) VALUES(?,1,?,NULL,?,?)').run(id,input.reason,JSON.stringify(item),new Date().toISOString());db.exec('COMMIT');return {...item,kind:'review',revision:1};}catch(error){db.exec('ROLLBACK');throw error;}
    },
    editReview(id,request){return mutateReview(id,request,'edit',[]);},
    decideReview(id,request){return mutateReview(id,request,'decision',this.publicContent().products.map(p=>p.id));},
    event(body) {
      if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(k => !['eventId','flowId','name','properties'].includes(k))) throw failure('Invalid event envelope');
      if (!EVENT_NAMES.has(body.name) || !isUuid(body.eventId)) throw failure('Invalid event name or UUID');
      if (body.flowId !== undefined && !isUuid(body.flowId)) throw failure('Invalid anonymous flow UUID');
      const source = body.properties ?? {};
      if (!source || typeof source !== 'object' || Array.isArray(source)) throw failure('Invalid properties');
      const clean = {};
      if (source.productId !== undefined) { if (!['gaba1500'].includes(source.productId)) throw failure('Invalid product'); clean.productId=source.productId; }
      if (source.path !== undefined) { if (!EVENT_PATHS.has(source.path)) throw failure('Invalid path'); clean.path=source.path; }
      if (source.channel !== undefined) { if (!['native','clipboard','download','kakao','instagram','direct'].includes(source.channel)) throw failure('Invalid channel'); clean.channel=source.channel; }
      if (source.questionId !== undefined) { if (!['amount','selection','label','reviews','evidence'].includes(source.questionId)) throw failure('Invalid question'); clean.questionId=source.questionId; }
      if (source.campaignId !== undefined) { if (typeof source.campaignId !== 'string' || !/^[A-Za-z0-9_-]{1,64}$/.test(source.campaignId)) throw failure('Invalid campaign'); clean.campaignId=source.campaignId; }
      if (source.referralId !== undefined) { if (typeof source.referralId !== 'string' || !/^[A-Za-z0-9_-]{8,64}$/.test(source.referralId)) throw failure('Invalid referral'); clean.referralId=source.referralId; }
      const result=db.prepare('INSERT OR IGNORE INTO events(id,name,properties,created_at,flow_id) VALUES(?,?,?,?,?)').run(body.eventId,body.name,JSON.stringify(clean),new Date().toISOString(),body.flowId?.toLowerCase() ?? null);
      return {accepted:true,duplicate:result.changes===0};
    },
    analytics() {
      const sharingMetrics={scopes:SHARE_SCOPES.map(([id,path,start])=>{const counts=db.prepare(SHARE_SCOPE_SQL).get(path,start);return {id,path,...counts,attemptRate:counts.denominator?counts.attemptFlows/counts.denominator:null};}),unscopedShareEvents:db.prepare(UNSCOPED_SHARE_SQL).get().count,confirmedDeliverySupported:false};
      const goalEvents=['landing_view','hero_check_start','rhythm_check_complete','result_share_click','shared_link_landed','product_compare_view','purchase_cta_click'];
      const goalFunnel=goalEvents.map(event=>({event,flows:db.prepare('SELECT COUNT(DISTINCT flow_id) AS count FROM events WHERE name=? AND flow_id IS NOT NULL').get(event).count,events:db.prepare('SELECT COUNT(*) AS count FROM events WHERE name=?').get(event).count}));
      const pairs=[['landing_to_check','landing_view','rhythm_check_started'],['check_completion','rhythm_check_started','rhythm_check_completed'],['result_to_story','result_viewed','gaba_story_viewed'],['comparison_to_purchase_click','product_comparison_viewed','purchase_outbound_clicked']];
      const funnels=pairs.map(([id,from,to])=>{
        const result=db.prepare('WITH starts AS (SELECT flow_id,MIN(rowid) AS first_row FROM events WHERE name=? AND flow_id IS NOT NULL GROUP BY flow_id) SELECT COUNT(*) AS denominator,COALESCE(SUM(CASE WHEN EXISTS(SELECT 1 FROM events e WHERE e.flow_id=starts.flow_id AND e.name=? AND e.rowid>starts.first_row) THEN 1 ELSE 0 END),0) AS numerator FROM starts').get(from,to);
        return {id,from,to,...result,rate:result.denominator ? result.numerator/result.denominator : null,denominatorDefinition:'Distinct anonymous in-memory flows with the from event',numeratorDefinition:'Those denominator flows with a later received to event; each flow counted once'};
      });
      return {counts:db.prepare('SELECT name,COUNT(*) AS count FROM events GROUP BY name ORDER BY name').all(),byProduct:db.prepare("SELECT json_extract(properties,'$.productId') AS productId,name,COUNT(*) AS count FROM events WHERE json_extract(properties,'$.productId') IS NOT NULL GROUP BY productId,name").all(),funnels,goalFunnel,sharingMetrics,window:{kind:'all_collected_events',from:db.prepare('SELECT MIN(created_at) AS value FROM events').get().value,to:new Date().toISOString(),ordering:'Server receipt order; no client timestamps',flowScope:'Browser in-memory page lifetime, not unique people or cross-reload sessions'},coverage:{eventsWithoutFlow:db.prepare('SELECT COUNT(*) AS count FROM events WHERE flow_id IS NULL').get().count,distinctFlows:db.prepare('SELECT COUNT(DISTINCT flow_id) AS count FROM events').get().count},actualPurchases:{supported:false,count:null,reason:'No verified order integration. Purchase clicks are not purchases.'},returningVisitors:{supported:false,rate:null,reason:'Seven-day return requires a future consented identity policy; no persistent visitor identifiers collected.'},sharing:{confirmedDeliverySupported:false,requestToLandingRate:{supported:false,rate:null,reason:'Sender requests and recipient arrivals are different flows; no matched referral attribution.'}},auditCount:db.prepare('SELECT COUNT(*) AS count FROM audit').get().count};
    },
  };
}
