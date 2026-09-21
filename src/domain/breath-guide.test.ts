import assert from 'node:assert/strict';
import test from 'node:test';
import { BREATH_ACTIVE_SECONDS, BREATH_CYCLE_COUNT, BREATH_CYCLE_SECONDS, BREATH_REST_SECONDS, getBreathCue } from './breath-guide.ts';

test('breath cues follow the requested 3-2-6-2 second cycle', () => {
  assert.deepEqual(getBreathCue(0), { stage: 'inhale', seconds: 3 });
  assert.deepEqual(getBreathCue(2_001), { stage: 'inhale', seconds: 1 });
  assert.deepEqual(getBreathCue(3_000), { stage: 'hold-top', seconds: 2 });
  assert.deepEqual(getBreathCue(5_000), { stage: 'exhale', seconds: 6 });
  assert.deepEqual(getBreathCue(10_001), { stage: 'exhale', seconds: 1 });
  assert.deepEqual(getBreathCue(11_000), { stage: 'hold-bottom', seconds: 2 });
  assert.deepEqual(getBreathCue(13_000), { stage: 'inhale', seconds: 3 });
});

test('runs 21 complete cycles, then uses the final 27 seconds to return to natural breathing', () => {
  assert.equal(BREATH_CYCLE_SECONDS * BREATH_CYCLE_COUNT, BREATH_ACTIVE_SECONDS);
  assert.equal(BREATH_REST_SECONDS - BREATH_ACTIVE_SECONDS, 27);
  assert.deepEqual(getBreathCue(BREATH_ACTIVE_SECONDS * 1000), { stage: 'finish', seconds: 27 });
  assert.deepEqual(getBreathCue(BREATH_REST_SECONDS * 1000), { stage: 'finish', seconds: 0 });
  assert.throws(() => getBreathCue(Number.NaN), TypeError);
});
