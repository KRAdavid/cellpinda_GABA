import assert from 'node:assert/strict';
import test from 'node:test';
import { BREATH_ACTIVE_SECONDS, BREATH_CYCLE_COUNT, BREATH_CYCLE_SECONDS, BREATH_REST_SECONDS, getBreathCue } from './breath-guide.ts';

test('breath cues follow the requested 4-2-6-2 second cycle', () => {
  assert.deepEqual(getBreathCue(0), { stage: 'inhale', seconds: 4 });
  assert.deepEqual(getBreathCue(3_001), { stage: 'inhale', seconds: 1 });
  assert.deepEqual(getBreathCue(4_000), { stage: 'hold-top', seconds: 2 });
  assert.deepEqual(getBreathCue(6_000), { stage: 'exhale', seconds: 6 });
  assert.deepEqual(getBreathCue(11_001), { stage: 'exhale', seconds: 1 });
  assert.deepEqual(getBreathCue(12_000), { stage: 'hold-bottom', seconds: 2 });
  assert.deepEqual(getBreathCue(14_000), { stage: 'inhale', seconds: 4 });
});

test('runs 21 complete cycles, then uses the final six seconds to return to natural breathing', () => {
  assert.equal(BREATH_CYCLE_SECONDS * BREATH_CYCLE_COUNT, BREATH_ACTIVE_SECONDS);
  assert.equal(BREATH_REST_SECONDS - BREATH_ACTIVE_SECONDS, 6);
  assert.deepEqual(getBreathCue(BREATH_ACTIVE_SECONDS * 1000), { stage: 'finish', seconds: 6 });
  assert.deepEqual(getBreathCue(BREATH_REST_SECONDS * 1000), { stage: 'finish', seconds: 0 });
  assert.throws(() => getBreathCue(Number.NaN), TypeError);
});
