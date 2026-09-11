import test from 'node:test';
import assert from 'node:assert/strict';
import {approvedCampaign, preserveCampaign} from './share.ts';

test('accepts only bounded anonymous campaign tokens', () => {
  assert.equal(approvedCampaign('launch_2026-09'), 'launch_2026-09');
  assert.equal(approvedCampaign('  launch  '), 'launch');
  assert.equal(approvedCampaign(''), '');
  assert.equal(approvedCampaign('홍길동'), '');
  assert.equal(approvedCampaign('a'.repeat(65)), '');
});

test('preserves an approved campaign without copying other query data', () => {
  const target = new URL('https://example.test/cellpinda/?view=products');
  preserveCampaign(target, '?campaign=launch_2026-09&ref=personal-value&answer=q1');
  assert.equal(target.href, 'https://example.test/cellpinda/?view=products&campaign=launch_2026-09');
});

test('drops malformed campaign values', () => {
  const target = new URL('https://example.test/cellpinda/?view=products');
  preserveCampaign(target, '?campaign=%EC%86%8C%EA%B0%9C%26');
  assert.equal(target.href, 'https://example.test/cellpinda/?view=products');
});
