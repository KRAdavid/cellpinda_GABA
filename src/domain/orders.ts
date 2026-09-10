/** Internal reconciliation model. This is NOT a Cafe24 webhook payload or authentication adapter. */
export type LineState = 'paid' | 'cancelled' | 'refund_pending' | 'refunded' | 'unknown';
export interface CanonicalLine {
  itemCode: string;
  productNo: number;
  variantCode: string;
  quantity: number;
  state: LineState;
  /** Cumulative, verified line allocations, integer KRW. Never infer from displayed list price. */
  paidKrw: number;
  refundedKrw: number;
}
export interface CanonicalOrder {
  mallId: string;
  shopNo: number;
  orderId: string;
  currency: 'KRW';
  /** Monotonic sequence assigned by the server after serialized authenticated API re-fetch. */
  observation: number;
  snapshotId: string;
  lines: CanonicalLine[];
}
const STATES=new Set<LineState>(['paid','cancelled','refund_pending','refunded','unknown']);
const safeId=(value:string)=>typeof value==='string' && /^[A-Za-z0-9_-]{1,100}$/.test(value);
const integer=(value:number)=>Number.isSafeInteger(value) && value>=0;

export function orderKey(order:Pick<CanonicalOrder,'mallId'|'shopNo'|'orderId'>):string {
  if(!safeId(order.mallId) || !safeId(order.orderId) || !integer(order.shopNo) || order.shopNo<1)throw new TypeError('Invalid order identity');
  return `${order.mallId}:${order.shopNo}:${order.orderId}`;
}
export function canonicalOrder(input:CanonicalOrder):CanonicalOrder {
  orderKey(input);
  if(input.currency!=='KRW' || !integer(input.observation) || input.observation<1 || !safeId(input.snapshotId) || !Array.isArray(input.lines) || input.lines.length===0)throw new TypeError('Invalid verified snapshot');
  const seen=new Set<string>();
  const lines=input.lines.map(line=>{
    if(!safeId(line.itemCode) || !safeId(line.variantCode) || seen.has(line.itemCode) || !integer(line.productNo) || line.productNo<1 || !integer(line.quantity) || line.quantity<1 || !STATES.has(line.state) || !integer(line.paidKrw) || !integer(line.refundedKrw) || line.refundedKrw>line.paidKrw)throw new TypeError('Invalid order line');
    if(line.state==='refunded' && line.refundedKrw!==line.paidKrw)throw new TypeError('Full refund does not reconcile');
    seen.add(line.itemCode);
    return {itemCode:line.itemCode,productNo:line.productNo,variantCode:line.variantCode,quantity:line.quantity,state:line.state,paidKrw:line.paidKrw,refundedKrw:line.refundedKrw};
  });
  const total=lines.reduce((amount,line)=>amount+line.paidKrw,0);if(!Number.isSafeInteger(total))throw new TypeError('Order amount exceeds safe integer');
  return {mallId:input.mallId,shopNo:input.shopNo,orderId:input.orderId,currency:'KRW',observation:input.observation,snapshotId:input.snapshotId,lines};
}
export function reconcileOrder(previous:CanonicalOrder|null,incoming:CanonicalOrder) {
  const next=canonicalOrder(incoming);
  if(!previous)return {order:next,outcome:'applied' as const};
  const current=canonicalOrder(previous);
  if(orderKey(current)!==orderKey(next))throw new TypeError('Order identity mismatch');
  if(current.snapshotId===next.snapshotId) {
    if(JSON.stringify(current)!==JSON.stringify(next))throw new TypeError('Snapshot id reused with different content');
    return {order:current,outcome:'duplicate' as const};
  }
  if(next.observation<=current.observation)return {order:current,outcome:'stale' as const};
  // Replace cumulative totals; replayed partial refunds are never added a second time.
  return {order:next,outcome:'applied' as const};
}
export function summarizeOrder(order:CanonicalOrder) {
  const valid=canonicalOrder(order);
  return valid.lines.reduce((summary,line)=>({paidKrw:summary.paidKrw+line.paidKrw,refundedKrw:summary.refundedKrw+line.refundedKrw,netKrw:summary.netKrw+line.paidKrw-line.refundedKrw,unresolved:summary.unresolved || ['unknown','refund_pending'].includes(line.state) || (line.state==='cancelled' && line.paidKrw!==line.refundedKrw)}),{paidKrw:0,refundedKrw:0,netKrw:0,unresolved:false});
}
export interface ReferralContext {
  buyerKey: string | null;
  referrerKey: string | null;
  relationshipVerified: boolean;
  firstOrderVerified: boolean;
  depth: number;
  previouslySettledOrderKeys: readonly string[];
}
export function referralReadiness(order:CanonicalOrder,context:ReferralContext) {
  const key=orderKey(order),summary=summarizeOrder(order);
  const outcome=(!context.relationshipVerified || !context.buyerKey || !context.referrerKey)?'identity_unverified'
    :context.depth!==1?'not_one_level'
    :context.buyerKey===context.referrerKey?'self_referral'
    :!context.firstOrderVerified?'first_order_unverified'
    :context.previouslySettledOrderKeys.includes(key)?'already_settled'
    :summary.unresolved?'order_unresolved'
    :summary.netKrw<=0?'no_net_purchase':'policy_required';
  // Eligibility review only. No reward amount, credit, payout, coupon or balance mutation.
  return {orderKey:key,outcome,payoutEnabled:false as const,rewardAmount:null,reviewableNetKrw:outcome==='policy_required'?summary.netKrw:null};
}
