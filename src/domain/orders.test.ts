import test from 'node:test';
import assert from 'node:assert/strict';
import { canonicalOrder, reconcileOrder, summarizeOrder, referralReadiness, type CanonicalOrder, type ReferralContext } from './orders.ts';
const paid:CanonicalOrder={mallId:'testmall',shopNo:1,orderId:'20260910-00001',currency:'KRW',observation:1,snapshotId:'snapshot1',lines:[{itemCode:'20260910-00001-01',variantCode:'P00000BN000A',productNo:39,quantity:2,state:'paid',paidKrw:74000,refundedKrw:0}]};
const referral:ReferralContext={buyerKey:'opaque-buyer',referrerKey:'opaque-referrer',relationshipVerified:true,firstOrderVerified:true,depth:1,previouslySettledOrderKeys:[]};
test('Cumulative partial refunds replace snapshots without double subtraction',()=>{
  const partial:CanonicalOrder={...paid,observation:2,snapshotId:'snapshot2',lines:[{...paid.lines[0]!,refundedKrw:37000}]};
  const next=reconcileOrder(paid,partial);assert.equal(summarizeOrder(next.order).netKrw,37000);
  assert.equal(reconcileOrder(next.order,partial).outcome,'duplicate');assert.equal(reconcileOrder(next.order,paid).outcome,'stale');
  const full:CanonicalOrder={...partial,observation:3,snapshotId:'snapshot3',lines:[{...partial.lines[0]!,state:'refunded',refundedKrw:74000}]};
  assert.equal(summarizeOrder(reconcileOrder(partial,full).order).netKrw,0);
});
test('Invalid snapshot identities, duplicate lines, over-refunds and conflicting duplicates fail closed',()=>{
  assert.throws(()=>canonicalOrder({...paid,lines:[paid.lines[0]!,paid.lines[0]!]}));
  assert.throws(()=>canonicalOrder({...paid,lines:[{...paid.lines[0]!,refundedKrw:74001}]}));
  assert.throws(()=>canonicalOrder({...paid,lines:[{...paid.lines[0]!,state:'refunded'}]}));
  assert.throws(()=>reconcileOrder(paid,{...paid,lines:[{...paid.lines[0]!,paidKrw:1}]}));
  assert.throws(()=>reconcileOrder(paid,{...paid,mallId:'other'}));
});
test('Recommendations are one-level, identity-verified and never pay undefined benefits',()=>{
  assert.equal(referralReadiness(paid,{...referral,depth:2}).outcome,'not_one_level');
  assert.equal(referralReadiness(paid,{...referral,referrerKey:referral.buyerKey}).outcome,'self_referral');
  assert.equal(referralReadiness(paid,{...referral,relationshipVerified:false}).outcome,'identity_unverified');
  assert.equal(referralReadiness(paid,{...referral,previouslySettledOrderKeys:['testmall:1:20260910-00001']}).outcome,'already_settled');
  const ready=referralReadiness(paid,referral);assert.equal(ready.outcome,'policy_required');assert.equal(ready.payoutEnabled,false);assert.equal(ready.rewardAmount,null);
});
test('Pending refunds and cancellations cannot become payable purchases',()=>{
  for(const state of ['refund_pending','unknown','cancelled'] as const)assert.equal(referralReadiness({...paid,lines:[{...paid.lines[0]!,state}]},referral).outcome,'order_unresolved');
  assert.equal(referralReadiness({...paid,lines:[{...paid.lines[0]!,state:'refunded',refundedKrw:74000}]},referral).outcome,'no_net_purchase');
});
