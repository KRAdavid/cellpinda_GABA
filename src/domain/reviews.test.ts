import test from 'node:test';
import assert from 'node:assert/strict';
import {parseReviewDraft,parseReviewConfirmation,approvalMissing,publicReview,reviewMutation,REVIEW_DESTINATION_URL} from './reviews.ts';
test('Smart Store review destination is the exact approved product URL',()=>{
 assert.equal(REVIEW_DESTINATION_URL,'https://smartstore.naver.com/cellpinda/products/4701017202');
 assert.notEqual(new URL(`${REVIEW_DESTINATION_URL}?from=review`).href,REVIEW_DESTINATION_URL);
});
const draft=parseReviewDraft({productId:'gaba1500',authorLabel:'가상 테스트 작성자',sourceTitle:'테스트 원문',sourceUrl:'https://example.com/test-review',authoredAt:'2026-09-10',quote:'오직 테스트용 가상 후기',context:'테스트 상황',disclosure:'테스트 제공 관계',rightsEvidence:'PRIVATE RIGHTS',rightsScope:'PRIVATE SCOPE'});
const confirmation=parseReviewConfirmation({rightsConfirmed:true,contextConfirmed:true,disclosureConfirmed:true,publicationConfirmed:true,reviewer:'PRIVATE REVIEWER',reviewedAt:'2026-09-10',editorialNote:'PRIVATE NOTE'});
test('Incomplete drafts allowed; unknown, non-string, unsafe URL and malformed calendar rejected',()=>{
 assert.equal(parseReviewDraft({}).quote,'');for(const bad of [{unknown:'x'},{toString:'x'},{quote:1},{sourceUrl:'http://example.com'},{sourceUrl:'https://user:pass@example.com'},{authoredAt:'2026-02-30'},{rightsExpiresAt:'2026-02-30'}])assert.throws(()=>parseReviewDraft(bad));
});
test('Korean calendar expiry and future review dates prevent publication',()=>{
 assert.ok(approvalMissing({...draft,rightsExpiresAt:'2026-09-09'},confirmation,['gaba1500'],'2026-09-10').includes('rightsExpired'));
 assert.ok(!approvalMissing({...draft,rightsExpiresAt:'2026-09-10'},confirmation,['gaba1500'],'2026-09-10').includes('rightsExpired'));
 assert.ok(approvalMissing({...draft,authoredAt:'2026-09-11'},confirmation,['gaba1500'],'2026-09-10').includes('authoredDateFuture'));
 assert.ok(approvalMissing(draft,{...confirmation,reviewedAt:'2026-09-11'},['gaba1500'],'2026-09-10').includes('reviewedDateFuture'));
});
test('Public quote requires all evidence, confirmations and currently public product; private fields never projected',()=>{
 assert.deepEqual(approvalMissing(draft,confirmation,['gaba1500']),[]);
 const item={id:'review-test',status:'approved',reviewType:'quote',review:draft,reviewConfirmation:confirmation};
 assert.ok(publicReview(item,['gaba1500']));assert.ok(!JSON.stringify(publicReview(item,['gaba1500'])).includes('PRIVATE'));
 assert.equal(publicReview(item,[]),null);assert.equal(publicReview({...item,status:'hold'},['gaba1500']),null);assert.equal(publicReview({...item,reviewConfirmation:{...confirmation,rightsConfirmed:false}},['gaba1500']),null);
 assert.equal(publicReview({...item,review:{...draft,rightsExpiresAt:'2020-01-01'}},['gaba1500']),null);
});
test('Mutation validates revisions and requires separate approval confirmations',()=>{
 assert.throws(()=>reviewMutation({review:draft,reason:'',revision:1},'edit'));
 assert.throws(()=>reviewMutation({status:'approved',reason:'test',revision:1},'decision'));
 assert.equal(reviewMutation({status:'hold',reason:'test',revision:1},'decision').confirmation,undefined);
});
