import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

const root=process.cwd();
const source=resolve(root,'data/content-ledger.json');
const target=resolve(root,'public/data/content.json');
const ledger=JSON.parse(readFileSync(source,'utf8'));
const smartStoreHost='smartstore.naver.com';

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
mkdirSync(dirname(target),{recursive:true});
writeFileSync(target,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({target,claims:claims.length,products:products.length,reviews:reviews.length}));
