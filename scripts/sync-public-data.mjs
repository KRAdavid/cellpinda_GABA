import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

const root=process.cwd();
const source=resolve(root,'data/content-ledger.json');
const target=resolve(root,'public/data/content.json');
const ledger=JSON.parse(readFileSync(source,'utf8'));
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

function isSmartStoreUrl(value){
  try{const url=new URL(value);return url.protocol==='https:' && url.hostname===smartStoreHost;}
  catch{return false;}
}

const claims=ledger.claims
  .filter(item=>item.status==='approved' && item.publicText && publicSources(item).length)
  .map(item=>({
    id:item.id,
    topic:item.topic,
    publicText:item.publicText,
    status:item.status,
    limitations:item.limitations || [],
    ...(publicMetadata(item) ? {metadata:publicMetadata(item)} : {}),
    sources:publicSources(item),
  }));
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
  records:claims.filter(item=>item.id.startsWith('research-')).map(({id,topic,publicText,metadata,sources,limitations})=>{
    const stableEvidence={id,topic,publicText,metadata,sources,limitations};
    const evidenceHash=createHash('sha256').update(JSON.stringify(stableEvidence)).digest('hex');
    return {id,topic,reviewedAt:ledger.checkedAt,question:metadata.question,studyType:metadata.studyType,population:metadata.population,sampleSize:metadata.sampleSize,dose:metadata.dose,duration:metadata.duration,comparison:metadata.comparison,outcome:metadata.outcome,result:metadata.result,consumerSummary:metadata.consumerSummary,hopefulTakeaway:metadata.hopefulTakeaway,limitations:[...(metadata.limitations||[]),...(limitations||[])],productApplicability:metadata.productApplicability,sources,evidenceHash};
  }),
};
mkdirSync(dirname(target),{recursive:true});
writeFileSync(target,JSON.stringify(output,null,2)+'\n');
const masterTarget=resolve(root,'public/data/gaba-master-index.json');
writeFileSync(masterTarget,JSON.stringify(masterIndex,null,2)+'\n');
console.log(JSON.stringify({target,masterTarget,claims:claims.length,masterRecords:masterIndex.records.length,products:products.length,reviews:reviews.length}));
