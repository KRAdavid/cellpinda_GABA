/** Review drafts are internal editorial records; only publicReview projects publishable fields. */
export const REVIEW_DESTINATION_TEXT='스마트스토어에서 가바 1500 구매자 후기와 다양한 사용 경험을 확인하세요.';
export const REVIEW_DESTINATION_URL='https://smartstore.naver.com/cellpinda/products/4701017202';
export const REVIEW_LIMITS={productId:20,authorLabel:100,sourceTitle:250,sourceUrl:2048,authoredAt:10,usagePeriod:300,quote:3000,context:2000,disclosure:1000,rightsEvidence:2000,rightsScope:1000,rightsExpiresAt:10} as const;
export type ReviewDraft={ -readonly [K in keyof typeof REVIEW_LIMITS]:string };
export type ReviewConfirmation={rightsConfirmed:boolean;contextConfirmed:boolean;disclosureConfirmed:boolean;publicationConfirmed:boolean;reviewer:string;reviewedAt:string;editorialNote:string};
const flags=['rightsConfirmed','contextConfirmed','disclosureConfirmed','publicationConfirmed'] as const;
const object=(value:unknown):value is Record<string,unknown>=>!!value && typeof value==='object' && !Array.isArray(value);
const fail=(message:string)=>Object.assign(new Error(message),{status:400});
function calendar(value:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const date=new Date(`${value}T00:00:00Z`);return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10)===value;}
function publicUrl(value:string){try{const url=new URL(value);return url.protocol==='https:' && !url.username && !url.password;}catch{return false;}}
export function parseReviewDraft(value:unknown):ReviewDraft {
  if(!object(value) || Object.keys(value).some(key=>!Object.hasOwn(REVIEW_LIMITS,key)))throw fail('Invalid review draft fields');
  const result={} as ReviewDraft;
  for(const key of Object.keys(REVIEW_LIMITS) as (keyof ReviewDraft)[]){const text=value[key] ?? '';if(typeof text!=='string' || text.length>REVIEW_LIMITS[key])throw fail(`Invalid review field: ${key}`);result[key]=text.trim();}
  if(!['','gaba1500'].includes(result.productId))throw fail('Invalid review product');
  if(result.sourceUrl && !publicUrl(result.sourceUrl))throw fail('Review source must be HTTPS without credentials');
  if(result.authoredAt && !calendar(result.authoredAt))throw fail('Invalid review authored date');
  if(result.rightsExpiresAt && !calendar(result.rightsExpiresAt))throw fail('Invalid review rights expiry');
  return result;
}
export function parseReviewConfirmation(value:unknown):ReviewConfirmation {
  if(!object(value) || Object.keys(value).some(key=>![...flags,'reviewer','reviewedAt','editorialNote'].includes(key)))throw fail('Invalid review confirmation fields');
  for(const key of flags)if(typeof value[key]!=='boolean')throw fail(`Confirmation boolean required: ${key}`);
  for(const [key,limit] of [['reviewer',100],['reviewedAt',10],['editorialNote',2000]] as const)if(value[key]!==undefined && (typeof value[key]!=='string' || value[key].length>limit))throw fail(`Invalid confirmation field: ${key}`);
  const result={rightsConfirmed:value.rightsConfirmed as boolean,contextConfirmed:value.contextConfirmed as boolean,disclosureConfirmed:value.disclosureConfirmed as boolean,publicationConfirmed:value.publicationConfirmed as boolean,reviewer:String(value.reviewer ?? '').trim(),reviewedAt:String(value.reviewedAt ?? '').trim(),editorialNote:String(value.editorialNote ?? '').trim()};
  if(result.reviewedAt && !calendar(result.reviewedAt))throw fail('Invalid review verification date');
  return result;
}
export function approvalMissing(review:ReviewDraft,confirmation:ReviewConfirmation,publicProductIds:readonly string[],today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())):string[] {
  const missing=(Object.keys(REVIEW_LIMITS) as (keyof ReviewDraft)[]).filter(key=>!['usagePeriod','rightsExpiresAt'].includes(key) && !review[key]).map(String);
  if(review.rightsExpiresAt && review.rightsExpiresAt<today)missing.push('rightsExpired');
  if(review.authoredAt>today)missing.push('authoredDateFuture');
  if(confirmation.reviewedAt>today)missing.push('reviewedDateFuture');
  if(!publicProductIds.includes(review.productId))missing.push('publicProduct');
  for(const flag of flags)if(!confirmation[flag])missing.push(flag);
  if(!confirmation.reviewer)missing.push('reviewer');if(!confirmation.reviewedAt)missing.push('reviewedAt');
  return missing;
}
export function reviewMutation(value:unknown,kind:'create'|'edit'|'decision') {
  const allowed=kind==='create'?['review','reason']:kind==='edit'?['review','reason','revision']:['status','reason','revision','confirmation'];
  if(!object(value) || Object.keys(value).some(key=>!allowed.includes(key)))throw fail('Invalid review request fields');
  if(typeof value.reason!=='string' || !value.reason.trim() || value.reason.length>1000)throw fail('Review reason required');
  if(kind!=='create' && (!Number.isInteger(value.revision) || Number(value.revision)<1))throw fail('Review revision required');
  if(kind==='decision' && (typeof value.status!=='string' || !['approved','hold'].includes(value.status)))throw fail('Invalid review decision');
  return {reason:value.reason.trim(),revision:Number(value.revision),status:value.status,review:kind==='decision'?undefined:parseReviewDraft(value.review),confirmation:kind==='decision' && value.status==='approved'?parseReviewConfirmation(value.confirmation):undefined};
}
export function publicReview(item:Record<string,unknown>,publicProductIds:readonly string[]) {
  if(item.reviewType!=='quote' || item.status!=='approved' || typeof item.id!=='string')return null;
  try{
    const review=parseReviewDraft(item.review),confirmation=parseReviewConfirmation(item.reviewConfirmation);
    if(approvalMissing(review,confirmation,publicProductIds).length)return null;
    const {productId,authorLabel,sourceTitle,sourceUrl,authoredAt,usagePeriod,quote,context,disclosure}=review;
    return {id:item.id,status:'approved',reviewType:'quote',publicText:quote,productId,authorLabel,sourceTitle,sourceUrl,authoredAt,usagePeriod,context,disclosure};
  }catch{return null;}
}
