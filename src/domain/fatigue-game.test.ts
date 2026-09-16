import assert from 'node:assert/strict';
import test from 'node:test';
import { compareFocusGames, compareReactionGames, FATIGUE_GAME_ROUNDS, FOCUS_GAME_RECOVERY_THRESHOLD_PCT, FOCUS_GAME_STAGES, FOCUS_GAME_TRIALS_PER_STAGE, needsFocusRecovery, summarizeFocusGame, summarizeReactionGame, type FocusTrialRecord } from './fatigue-game.ts';

test('summarizes five rounds without turning misses into a zero', () => {
  const summary = summarizeReactionGame([300, null, 500, 400, null], 1);
  assert.deepEqual(summary, { averageMs: 400, hits: 3, misses: 2, falseStarts: 1 });
});

test('compares only personal before and after runs', () => {
  const before = summarizeReactionGame([500, 500, 500, 500, 500]);
  assert.equal(compareReactionGames(before, summarizeReactionGame([400, 400, 400, 400, 400])).direction, 'faster');
  assert.equal(compareReactionGames(before, summarizeReactionGame([600, 600, 600, 600, 600])).direction, 'slower');
  assert.equal(compareReactionGames(before, summarizeReactionGame([520, 500, 500, 500, 500])).direction, 'similar');
  assert.equal(compareReactionGames(before, summarizeReactionGame([null, null, null, null, null])).direction, 'unavailable');
});

test('rejects incomplete or invalid game records', () => {
  assert.throws(() => summarizeReactionGame(new Array(FATIGUE_GAME_ROUNDS - 1).fill(null)), TypeError);
  assert.throws(() => summarizeReactionGame([0, 1, 2, 3, -1]), TypeError);
  assert.throws(() => summarizeReactionGame([0, 1, 2, 3, 4], 0.5), TypeError);
});

function focusRecords(speedMs = 420, brakeCorrect = true, switchCorrect = true): FocusTrialRecord[] {
  return FOCUS_GAME_STAGES.flatMap(stage => Array.from({ length: FOCUS_GAME_TRIALS_PER_STAGE }, (_, index) => {
    const shouldRespond = stage === 'brake' ? index !== 3 : stage === 'switch' ? index % 2 === 0 : true;
    const respondsCorrectly = stage === 'speed' ? true : stage === 'brake' ? (shouldRespond ? brakeCorrect : true) : (shouldRespond ? switchCorrect : true);
    const responded = shouldRespond && respondsCorrectly;
    return { stage, shouldRespond, responded, responseMs: responded ? speedMs : null, correct: shouldRespond ? responded : true };
  }));
}

test('summarizes speed, inhibition and switching stages separately', () => {
  const summary = summarizeFocusGame(focusRecords(410));
  assert.equal(summary.total, 12);
  assert.equal(summary.speed.averageMs, 410);
  assert.equal(summary.brake.accuracyPct, 100);
  assert.equal(summary.switch.accuracyPct, 100);
  assert.equal(summary.falseStarts, 0);
});

test('compares the same person before and after the focus challenge', () => {
  const before = summarizeFocusGame(focusRecords(520, false, false));
  const after = summarizeFocusGame(focusRecords(430, true, true));
  const comparison = compareFocusGames(before, after);
  assert.equal(comparison.direction, 'improved');
  assert.equal(comparison.speedDeltaMs, -90);
  assert.equal(comparison.accuracyDeltaPct, 42);
  assert.equal(comparison.brakeDeltaPct, 75);
  assert.equal(comparison.switchDeltaPct, 50);
});

test('opens recovery guidance at or below the published accuracy threshold', () => {
  const strong = summarizeFocusGame(focusRecords(420));
  const low = summarizeFocusGame(focusRecords(420, false, false));
  assert.equal(strong.accuracyPct, 100);
  assert.equal(low.accuracyPct, 58);
  assert.equal(needsFocusRecovery(strong), false);
  assert.equal(needsFocusRecovery(low), true);
  assert.equal(FOCUS_GAME_RECOVERY_THRESHOLD_PCT, 70);
});

test('rejects malformed focus challenge records', () => {
  assert.throws(() => summarizeFocusGame(focusRecords().slice(0, 11)), TypeError);
  assert.throws(() => summarizeFocusGame(focusRecords().map((record, index) => index === 0 ? {...record, stage: 'switch'} : record)), TypeError);
  assert.throws(() => summarizeFocusGame(focusRecords().map((record, index) => index === 0 ? {...record, responded: true, responseMs: null} : record)), TypeError);
  assert.throws(() => summarizeFocusGame(focusRecords().map((record, index) => index === 0 ? {...record, responded: false, responseMs: 300} : record)), TypeError);
  assert.throws(() => summarizeFocusGame(focusRecords().map((record, index) => index === 0 ? {...record, correct: false} : record)), TypeError);
});
