import test from 'node:test';
import assert from 'node:assert/strict';
import { ANALYTICS_CONSENT_KEY, readAnalyticsConsent } from './analytics-consent.ts';

test('analytics consent defaults to unknown and accepts only explicit choices', () => {
  const values = new Map<string, string>();
  const storage = { getItem: (key: string) => values.get(key) ?? null };
  assert.equal(readAnalyticsConsent(storage), 'unknown');
  values.set(ANALYTICS_CONSENT_KEY, 'granted');
  assert.equal(readAnalyticsConsent(storage), 'granted');
  values.set(ANALYTICS_CONSENT_KEY, 'denied');
  assert.equal(readAnalyticsConsent(storage), 'denied');
  values.set(ANALYTICS_CONSENT_KEY, 'anything-else');
  assert.equal(readAnalyticsConsent(storage), 'unknown');
});

test('analytics consent treats storage failures as unknown', () => {
  assert.equal(readAnalyticsConsent({ getItem: () => { throw new Error('private mode'); } }), 'unknown');
});
