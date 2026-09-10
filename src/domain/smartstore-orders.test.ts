import test from 'node:test';
import assert from 'node:assert/strict';
import { canonicalSmartStoreOrder, type SmartStoreProductOrderPayload } from './smartstore-orders.ts';

const config = { shopNo: 1, channelProductId: '1500-channel', productNo: 1500, productKey: 'gaba1500' as const, observation: 1, snapshotId: 'smartstore-snapshot-1' };
const payload = (overrides: Partial<SmartStoreProductOrderPayload['productOrder']> = {}): SmartStoreProductOrderPayload => ({
  order: { orderId: '20260910-00001', mallId: 'cellpinda' },
  productOrder: {
    productOrderId: '20260910-00001-01', productId: '1500-channel', productOrderStatus: 'PAYED', quantity: 1,
    initialPaymentAmount: 39000, remainPaymentAmount: 39000, ...overrides,
  },
});

test('maps a paid Smart Store 1500 product order without customer fields', () => {
  const order = canonicalSmartStoreOrder(payload(), config);
  assert.equal(order.lines[0]?.state, 'paid');
  assert.equal(order.lines[0]?.paidKrw, 39000);
  assert.equal(order.lines[0]?.refundedKrw, 0);
  assert.equal('ordererName' in order, false);
});

test('keeps partial refunds cumulative and pending', () => {
  const order = canonicalSmartStoreOrder(payload({ productOrderStatus: 'CANCELED', remainPaymentAmount: 19000, claimStatus: 'CANCELING' }), { ...config, observation: 2, snapshotId: 'smartstore-snapshot-2' });
  assert.equal(order.lines[0]?.state, 'refund_pending');
  assert.equal(order.lines[0]?.refundedKrw, 20000);
});

test('accepts a fully reconciled terminal refund', () => {
  const order = canonicalSmartStoreOrder(payload({ productOrderStatus: 'RETURNED', remainPaymentAmount: 0, claimStatus: 'RETURN_DONE' }), { ...config, observation: 3, snapshotId: 'smartstore-snapshot-3' });
  assert.equal(order.lines[0]?.state, 'refunded');
  assert.equal(order.lines[0]?.refundedKrw, 39000);
});

test('rejects another product mapping, including a removed 750 catalog key', () => {
  assert.throws(() => canonicalSmartStoreOrder(payload({ productId: '750-channel' }), config), /Product mapping mismatch/);
  assert.throws(() => canonicalSmartStoreOrder(payload(), { ...config, productKey: 'gaba750' as never }), /Invalid Smart Store mapping/);
});

test('does not turn unknown or unpaid statuses into paid revenue', () => {
  const order = canonicalSmartStoreOrder(payload({ productOrderStatus: 'PAYMENT_WAITING', initialPaymentAmount: 0, remainPaymentAmount: 0 }), { ...config, observation: 4, snapshotId: 'smartstore-snapshot-4' });
  assert.equal(order.lines[0]?.state, 'unknown');
  assert.equal(order.lines[0]?.paidKrw, 0);
});
