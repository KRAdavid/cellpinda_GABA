import { canonicalOrder, type CanonicalLine, type CanonicalOrder, type LineState } from './orders.ts';

/**
 * The smallest verified subset of a Naver Commerce API product-order response.
 * The network/auth adapter must strip customer and address fields before this
 * boundary. This type is intentionally narrower than the upstream response.
 */
export interface SmartStoreProductOrderPayload {
  order: { orderId: string; mallId: string };
  productOrder: {
    productOrderId: string;
    productId: string;
    productOrderStatus: string;
    quantity: number;
    initialPaymentAmount: number;
    remainPaymentAmount: number;
    optionManageCode?: string | null;
    itemNo?: string | null;
    sellerProductCode?: string | null;
    claimStatus?: string | null;
    currentClaim?: { claimStatus?: string | null } | null;
  };
}

export interface SmartStoreAdapterConfig {
  /** Internal store partition. The seller account supplies this value. */
  shopNo: number;
  /** The real Smart Store channel product number, supplied by the seller. */
  channelProductId: string;
  /** The numeric product identifier used by the internal reconciliation model. */
  productNo: number;
  /** Public catalog key. The adapter deliberately accepts only the live SKU. */
  productKey: 'gaba1500';
  observation: number;
  snapshotId: string;
}

const safeId = (value: unknown): value is string => typeof value === 'string' && /^[A-Za-z0-9_-]{1,100}$/.test(value);
const integer = (value: unknown): value is number => typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;

const claimState = (status: string | null | undefined): LineState | null => {
  if (!status) return null;
  if (status === 'CANCEL_DONE' || status === 'RETURN_DONE') return 'refunded';
  if (status === 'CANCEL_REQUEST' || status === 'CANCELING' || status === 'RETURN_REQUEST' || status === 'COLLECTING' || status === 'EXCHANGE_REQUEST') return 'refund_pending';
  if (status === 'CANCEL_REJECT' || status === 'RETURN_REJECT' || status === 'EXCHANGE_REJECT') return 'paid';
  return null;
};

const productState = (status: string): LineState => {
  if (['PAYED', 'DELIVERING', 'DELIVERED', 'PURCHASE_DECIDED'].includes(status)) return 'paid';
  if (status === 'CANCELED' || status === 'CANCELED_BY_NOPAYMENT') return 'cancelled';
  if (status === 'RETURNED') return 'refunded';
  return 'unknown';
};

/**
 * Convert only a privacy-filtered, verified product-order response into the
 * internal cumulative snapshot. No customer text, address or payment method
 * is carried across this boundary.
 */
export function canonicalSmartStoreOrder(input: SmartStoreProductOrderPayload, config: SmartStoreAdapterConfig): CanonicalOrder {
  if (!input || !input.order || !input.productOrder) throw new TypeError('Invalid Smart Store payload');
  if (!safeId(input.order.mallId) || !safeId(input.order.orderId)) throw new TypeError('Invalid Smart Store order identity');
  if (!Number.isSafeInteger(config.shopNo) || config.shopNo < 1 || !Number.isSafeInteger(config.productNo) || config.productNo < 1 || config.productKey !== 'gaba1500' || !safeId(config.channelProductId)) throw new TypeError('Invalid Smart Store mapping');
  if (input.productOrder.productId !== config.channelProductId) throw new TypeError('Product mapping mismatch');
  const p = input.productOrder;
  if (!safeId(p.productOrderId) || !integer(p.quantity) || p.quantity < 1 || !integer(p.initialPaymentAmount) || !integer(p.remainPaymentAmount) || p.remainPaymentAmount > p.initialPaymentAmount) throw new TypeError('Invalid Smart Store product order');
  const itemCode = p.productOrderId;
  const variantCode = p.optionManageCode || p.itemNo || p.productId;
  if (!safeId(variantCode)) throw new TypeError('Invalid Smart Store option identity');

  const paidKrw = p.initialPaymentAmount;
  const refundedKrw = paidKrw - p.remainPaymentAmount;
  const claim = claimState(p.currentClaim?.claimStatus ?? p.claimStatus);
  let state = claim ?? productState(p.productOrderStatus);
  // A terminal status is only marked refunded when the cumulative amount also reconciles.
  if (state === 'refunded' && refundedKrw !== paidKrw) state = 'refund_pending';
  const line: CanonicalLine = { itemCode, productNo: config.productNo, variantCode, quantity: p.quantity, state, paidKrw, refundedKrw };
  return canonicalOrder({
    mallId: input.order.mallId,
    shopNo: config.shopNo,
    orderId: input.order.orderId,
    currency: 'KRW',
    observation: config.observation,
    snapshotId: config.snapshotId,
    lines: [line],
  });
}
