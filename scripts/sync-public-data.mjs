import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

const root=process.cwd();
const source=resolve(root,'data/content-ledger.json');
const target=resolve(root,'public/data/content.json');
const goalContract=JSON.parse(readFileSync(resolve(root,'data/goal-contract.json'),'utf8'));
const taskGraph=JSON.parse(readFileSync(resolve(root,'data/task-graph.json'),'utf8'));
const teaser=JSON.parse(readFileSync(resolve(root,'data/teaser-manifest.json'),'utf8'));
const ledger=JSON.parse(readFileSync(source,'utf8'));
const pulseRun=spawnSync(process.execPath,[resolve(root,'scripts/tf-pulse.mjs'),'--json'],{encoding:'utf8'});
if(pulseRun.status!==0)throw new Error(`TF pulse generation failed: ${pulseRun.stderr?.trim() || 'unknown error'}`);
let pulse;
try{pulse=JSON.parse(pulseRun.stdout.trim());}catch{throw new Error('TF pulse generation did not return JSON');}
const heartbeatPath=resolve(root,'data/tf-pulse-heartbeat.json');
let pulseForQueue=pulse;
if(existsSync(heartbeatPath)){
  let heartbeat;
  try{heartbeat=JSON.parse(readFileSync(heartbeatPath,'utf8'));}catch{throw new Error('TF pulse heartbeat is not valid JSON');}
  if(heartbeat.schemaVersion!==1 || heartbeat.mode!=='automation_pulse_heartbeat' || heartbeat.goalId!==pulse.goalId || heartbeat.goalStatus!=='ACTIVE' || !/^\d{4}-\d{2}-\d{2}T/.test(heartbeat.generatedAt) || !/^[a-f0-9]{64}$/.test(heartbeat.snapshotHash||'') || JSON.stringify(heartbeat.roleCoverage) !== JSON.stringify(pulse.roleCoverage)) throw new Error('TF pulse heartbeat is malformed or role coverage is out of sync');
  if(heartbeat.snapshotHash===pulse.snapshotHash) pulseForQueue={...pulse,generatedAt:heartbeat.generatedAt};
}
const smartStoreHost='smartstore.naver.com';
const requiredResearchFields=['question','studyType','population','sampleSize','dose','duration','comparison','outcome','result','productApplicability','consumerSummary','hopefulTakeaway'];

function publicSources(item){
  return (item.sources || [])
    .filter(source=>typeof source.url==='string' && source.url.startsWith('https://'))
    .map(({title,url,page,locator})=>({title,url,page,locator}));
}

const publicMetadataKeys=[
  'studyType','population','sampleSize','dose','duration','comparison',
  'outcome','result','limitations','productApplicability','question',
  'searchThrough','studyCount','consumerSummary','hopefulTakeaway',
];

function publicMetadata(item){
  if(!item.metadata || typeof item.metadata!=='object')return undefined;
  const metadata=Object.fromEntries(publicMetadataKeys
    .filter(key=>Object.prototype.hasOwnProperty.call(item.metadata,key))
    .map(key=>[key,item.metadata[key]]));
  return Object.keys(metadata).length ? metadata : undefined;
}

function evidenceHash(item, metadata=publicMetadata(item), sources=publicSources(item)){
  const stableEvidence={id:item.id,topic:item.topic,publicText:item.publicText,metadata,sources,limitations:item.limitations || []};
  return createHash('sha256').update(JSON.stringify(stableEvidence)).digest('hex');
}

function isSmartStoreUrl(value){
  try{const url=new URL(value);return url.protocol==='https:' && url.hostname===smartStoreHost;}
  catch{return false;}
}

const claims=ledger.claims
  .filter(item=>item.status==='approved' && item.publicText && publicSources(item).length)
  .map(item=>{
    const metadata=publicMetadata(item);
    const sources=publicSources(item);
    return {
      id:item.id,
      topic:item.topic,
      publicText:item.publicText,
      status:item.status,
      reviewedAt:item.reviewedAt || ledger.checkedAt,
      evidenceHash:evidenceHash(item,metadata,sources),
      limitations:item.limitations || [],
      ...(metadata ? {metadata} : {}),
      sources,
    };
  });
const approvedResearch=ledger.claims.filter(item=>item.status==='approved' && item.id.startsWith('research-'));
for(const item of approvedResearch){
  const missing=requiredResearchFields.filter(field=>typeof item.metadata?.[field]!=='string' || !item.metadata[field].trim());
  if(missing.length || publicSources(item).length===0) throw new Error(`Approved research ${item.id} is not export-ready: ${[...missing, ...(publicSources(item).length===0 ? ['public HTTPS source'] : [])].join(', ')}`);
}
const approvedIds=new Set(claims.map(item=>item.id));
const products=ledger.products
  .filter(item=>item.status==='approved' && item.sourceIds?.every(id=>approvedIds.has(id)) && isSmartStoreUrl(item.officialUrl))
  .map(({id,name,amountMg,servings,totalG,officialUrl,status,availability,priceDisplay,sourceIds})=>({id,name,amountMg,servings,totalG,officialUrl,status,availability,priceDisplay,sourceIds}));
const reviews=ledger.reviews
  .filter(item=>['shop-review-destination','shop-review-destination-1500'].includes(item.id) && item.status==='approved')
  .map(({id,status,publicText,sourceTitle,sourceUrl,originalPublic,limitations})=>({id,status,publicText,sourceTitle,sourceUrl,originalPublic,limitations}));

const output={
  schemaVersion:1,
  sourceCheckedAt:ledger.checkedAt,
  generatedAt:new Date().toISOString(),
  claims,
  products,
  reviews,
};
const masterIndex={
  schemaVersion:1,
  goalId:'GMVP-GABA-PUBLIC-MASTER-INDEX',
  title:'공개용 GABA 논문 기반 마스터 인덱스',
  publicScope:'승인된 공개 HTTPS 출처가 있는 연구 요약입니다. 연구 결과는 셀핀다 가바 1500 완제품의 효과를 보장하지 않습니다.',
  selectionRule:'승인 상태·공개 HTTPS 원문·필수 연구 필드·소비자 문장 검증을 모두 통과한 research-* 레코드만 포함합니다.',
  sourceCheckedAt:ledger.checkedAt,
  generatedAt:output.generatedAt,
  records:claims.filter(item=>item.id.startsWith('research-')).map(({id,topic,publicText,metadata,sources,limitations,reviewedAt,evidenceHash})=>{
    return {id,topic,reviewedAt,question:metadata.question,studyType:metadata.studyType,population:metadata.population,sampleSize:metadata.sampleSize,dose:metadata.dose,duration:metadata.duration,comparison:metadata.comparison,outcome:metadata.outcome,result:metadata.result,consumerSummary:metadata.consumerSummary,hopefulTakeaway:metadata.hopefulTakeaway,limitations:[...(metadata.limitations||[]),...(limitations||[])],productApplicability:metadata.productApplicability,sources,evidenceHash};
  }),
};
for(const record of masterIndex.records){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(record.reviewedAt) || !/^[a-f0-9]{64}$/.test(record.evidenceHash)) throw new Error(`Research ${record.id} is missing a valid review date or evidence hash`);
}
mkdirSync(dirname(target),{recursive:true});
writeFileSync(target,JSON.stringify(output,null,2)+'\n');
const masterTarget=resolve(root,'public/data/gaba-master-index.json');
writeFileSync(masterTarget,JSON.stringify(masterIndex,null,2)+'\n');
function publicTaskDecision(task){
  if(task.state==='VERIFYING') return {decision:'독립 검증 유지',decisionMode:'independent-review',nextAction:'검증 증거와 수락 기준을 대조해 DONE 또는 REWORK로 판정'};
  if(task.state==='WAITING' || task.state==='BACKLOG') return {decision:'외부 입력 또는 선행조건 대기 유지',decisionMode:'input-gate',nextAction:task.blockedBy ? '필요 입력을 확보한 뒤 담당 TF와 검증자가 재검토' : '선행조건과 담당 증거를 확인한 뒤 실행 가능 상태를 갱신',requiredInputs:Array.isArray(task.requiredInputs) ? task.requiredInputs : []};
  if(task.state==='READY') return {decision:'내부 샌드박스 실행 가능',decisionMode:'sandbox-execution',nextAction:'담당자가 샌드박스 실행 후 검증 증거를 연결'};
  if(task.state==='RUNNING') return {decision:'실행 결과 증거 대기',decisionMode:'execution-tracking',nextAction:'실행 결과를 기록한 뒤 독립 검증으로 전달'};
  return {decision:'현재 상태와 증거 보존',decisionMode:'state-preservation',nextAction:'상태를 바꿀 사건이 생길 때만 재평가'};
}
const operationsQueue={
  schemaVersion:1,
  goalId:goalContract.goalId,
  status:goalContract.status,
  checkedAt:goalContract.checkedAt,
  pulse:{generatedAt:pulseForQueue.generatedAt,snapshotHash:pulseForQueue.snapshotHash,requiresHumanDecision:pulseForQueue.requiresHumanDecision,activeTasks:pulseForQueue.meetingAgenda.length,inputGates:pulseForQueue.inputGates.length},
  roleCoverage:pulseForQueue.roleCoverage.map(({id,label,status})=>({id,label,status})),
  workstreams:goalContract.workstreams.map(({id,name,lead,verifier,status,nextAction})=>({id,name,lead,verifier,status,nextAction})),
  tasks:taskGraph.tasks.map(({id,stream,title,state,priority,lead,verifier,dependencies,blockedBy,requiredInputs,risk})=>({id,stream,title,state,priority,lead,verifier,dependencies, ...publicTaskDecision({state,blockedBy,requiredInputs}), requiredInputs:Array.isArray(requiredInputs) ? requiredInputs : [], ...(blockedBy ? {blockedBy} : {}), ...(risk ? {risk} : {})})),
};
const operationsTarget=resolve(root,'public/data/operations-queue.json');
writeFileSync(operationsTarget,JSON.stringify(operationsQueue,null,2)+'\n');
const publicPulse={
  schemaVersion:1,
  mode:'public_tf_pulse',
  goalId:pulseForQueue.goalId,
  goalStatus:pulseForQueue.goalStatus,
  generatedAt:pulseForQueue.generatedAt,
  snapshotHash:pulseForQueue.snapshotHash,
  requiresHumanDecision:pulseForQueue.requiresHumanDecision,
  roleCoverage:pulseForQueue.roleCoverage.map(({id,label,status})=>({id,label,status})),
  counts:pulseForQueue.counts,
  teaserGate:{status:pulseForQueue.teaserGate.status,taskId:pulseForQueue.teaserGate.taskId,taskState:pulseForQueue.teaserGate.taskState},
  inputGates:pulseForQueue.inputGates.map(({taskId,state,chair,requiredInputs,nextAction})=>({taskId,state,chair,requiredInputs,nextAction})),
  meetingAgenda:pulseForQueue.meetingAgenda.map(({taskId,state,chair,participants,question,decision,requiredInputs,nextAction,mode})=>({taskId,state,chair,participants,question,decision,requiredInputs,nextAction,mode})),
};
const pulseTarget=resolve(root,'public/data/tf-pulse.json');
writeFileSync(pulseTarget,JSON.stringify(publicPulse,null,2)+'\n');
const taskCounts=Object.fromEntries(taskGraph.stateMachine.map(state=>[state,taskGraph.tasks.filter(task=>task.state===state).length]));
const hasUnfinishedTasks=taskGraph.tasks.some(task=>!['DONE','CANCELLED'].includes(task.state));
const publicAudit={
  schemaVersion:1,
  mode:'public_goal_audit',
  goalId:goalContract.goalId,
  title:goalContract.title,
  status:goalContract.status,
  overallStatus:hasUnfinishedTasks || teaser.status!=='APPROVED' ? 'IN_PROGRESS_WITH_GATES' : 'COMPLETE',
  checkedAt:goalContract.checkedAt,
  roleCoverage:publicPulse.roleCoverage,
  taskCounts,
  milestones:{
    masterIndex:{status:'MET',claims:claims.length,researchRecords:masterIndex.records.length},
    publicProduct:{status:'MET',products:products.length,smartStoreOnly:true,removed750:true},
    tfPulse:{status:'MET',generatedAt:publicPulse.generatedAt,snapshotHash:publicPulse.snapshotHash,requiresHumanDecision:publicPulse.requiresHumanDecision},
  },
  gates:taskGraph.tasks
    .filter(task=>['VERIFYING','WAITING','BACKLOG'].includes(task.state))
    .map(task=>({id:task.id,title:task.title,state:task.state,lead:task.lead,verifier:task.verifier,requiredInputs:Array.isArray(task.requiredInputs)?task.requiredInputs:[],...publicTaskDecision({state:task.state,blockedBy:task.blockedBy,requiredInputs:task.requiredInputs})})),
  teaserGate:{status:teaser.status,taskId:'B4',taskState:taskGraph.tasks.find(task=>task.id==='B4')?.state ?? null},
  note:'이 패킷은 공개 운영 상태의 요약이며, 실제 전문가 자격·외부 승인·주문 완료를 증명하지 않습니다.',
};
const auditTarget=resolve(root,'public/data/goal-audit.json');
writeFileSync(auditTarget,JSON.stringify(publicAudit,null,2)+'\n');
console.log(JSON.stringify({target,masterTarget,operationsTarget,pulseTarget,auditTarget,claims:claims.length,masterRecords:masterIndex.records.length,products:products.length,reviews:reviews.length,queueTasks:operationsQueue.tasks.length}));
