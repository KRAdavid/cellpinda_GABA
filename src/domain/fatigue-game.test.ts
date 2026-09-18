import assert from 'node:assert/strict';
import test from 'node:test';
import {
  compareFocusGames,
  compareReactionGames,
  createFocusGameInviteText,
  createFocusRunPattern,
  FATIGUE_GAME_ROUNDS,
  FOCUS_GAME_STAGES,
  FOCUS_GAME_TOTAL_TRIALS,
  FOCUS_GAME_TRIALS_PER_STAGE,
  FOCUS_STIMULUS_SHAPES,
  summarizeFocusGame,
  summarizeReactionGame,
  type FocusGameStage,
  type FocusTrialRecord,
} from './fatigue-game.ts';

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
  assert.equal(summary.total, FOCUS_GAME_TOTAL_TRIALS);
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
  assert.equal(comparison.accuracyDeltaPct, 46);
  assert.equal(comparison.brakeDeltaPct, 87);
  assert.equal(comparison.switchDeltaPct, 50);
});

test('rejects malformed focus challenge records', () => {
  assert.throws(() => summarizeFocusGame(focusRecords().slice(0, FOCUS_GAME_TOTAL_TRIALS - 1)), TypeError);
  assert.throws(() => summarizeFocusGame(focusRecords().map((record, index) => index === 0 ? {...record, stage: 'switch'} : record)), TypeError);
  assert.throws(() => summarizeFocusGame(focusRecords().map((record, index) => index === 0 ? {...record, responded: true, responseMs: null} : record)), TypeError);
  assert.throws(() => summarizeFocusGame(focusRecords().map((record, index) => index === 0 ? {...record, responded: false, responseMs: 300} : record)), TypeError);
  assert.throws(() => summarizeFocusGame(focusRecords().map((record, index) => index === 0 ? {...record, correct: false} : record)), TypeError);
});

function count<T>(values: readonly T[], target: T): number {
  return values.filter(value => value === target).length;
}

function assertNoLongRuns<T>(values: readonly T[]) {
  for (let index = 2; index < values.length; index += 1) {
    assert.ok(values[index] !== values[index - 1] || values[index] !== values[index - 2]);
  }
}

function assertStageTiming(form: ReturnType<typeof createFocusRunPattern>, stage: FocusGameStage, minimum: number, maximum: number, responseWindowMs: number) {
  for (const trial of form.trials[stage]) {
    assert.ok(trial.foreperiodMs >= minimum && trial.foreperiodMs <= maximum);
    assert.equal(trial.responseWindowMs, responseWindowMs);
  }
}

test('builds a balanced, progressively harder randomized form with fixed comparison conditions', () => {
  assert.deepEqual(FOCUS_GAME_STAGES, ['brake', 'speed', 'switch']);
  const form = createFocusRunPattern();
  assert.equal(FOCUS_GAME_TOTAL_TRIALS, 24);
  for (const stage of FOCUS_GAME_STAGES) assert.equal(form.trials[stage].length, 8);

  const speed = form.trials.speed;
  assert.equal(count(speed.map(trial => trial.stimulusColor), 'green'), 4);
  assert.equal(count(speed.map(trial => trial.stimulusColor), 'purple'), 4);
  for (const shape of FOCUS_STIMULUS_SHAPES) assert.equal(count(speed.map(trial => trial.stimulusShape), shape), 2);
  assertNoLongRuns(speed.map(trial => trial.stimulusShape));
  assertNoLongRuns(speed.map(trial => trial.stimulusColor));
  assert.ok(speed.every(trial => trial.shouldRespond));

  const brake = form.trials.brake;
  assert.equal(brake.filter(trial => trial.shouldRespond).length, 5);
  assert.equal(brake.filter(trial => !trial.shouldRespond).length, 3);
  assert.ok(brake.every(trial => trial.stimulusColor === (trial.shouldRespond ? 'green' : 'red')));
  assertNoLongRuns(brake.map(trial => trial.shouldRespond));

  const switching = form.trials.switch;
  const targets = switching.map(trial => trial.targetColor);
  assert.equal(count(targets, 'green'), 4);
  assert.equal(count(targets, 'purple'), 4);
  assert.ok(targets.slice(1).filter((value, index) => value !== targets[index]).length >= 4);
  assertNoLongRuns(targets);
  assert.equal(switching.filter(trial => trial.shouldRespond).length, 5);
  assert.equal(switching.filter(trial => !trial.shouldRespond).length, 3);
  assert.ok(switching.every(trial => trial.shouldRespond === (trial.stimulusColor === trial.targetColor)));
  assertNoLongRuns(switching.map(trial => trial.shouldRespond));
  for (const shape of FOCUS_STIMULUS_SHAPES) assert.equal(count(switching.map(trial => trial.stimulusShape), shape), 2);

  assertStageTiming(form, 'speed', 750, 1_550, 1_700);
  assertStageTiming(form, 'brake', 650, 1_400, 1_450);
  assertStageTiming(form, 'switch', 500, 1_200, 1_200);
});

test('changes question forms on repeat, including with a deterministic random source', () => {
  const signatures = new Set(Array.from({ length: 12 }, () => createFocusRunPattern().signature));
  assert.ok(signatures.size > 1, 'normal random runs should produce different forms');

  const first = createFocusRunPattern(() => 0);
  const second = createFocusRunPattern(() => 0, first.signature);
  assert.notEqual(second.signature, first.signature);
  assert.equal(count(second.trials.speed.map(trial => trial.stimulusColor), 'green'), 4);
  assertNoLongRuns(second.trials.speed.map(trial => trial.stimulusShape));
  assertNoLongRuns(second.trials.speed.map(trial => trial.stimulusColor));
  assertNoLongRuns(second.trials.switch.map(trial => trial.targetColor));
});

test('rejects a random source outside the expected range', () => {
  assert.throws(() => createFocusRunPattern(() => 1), RangeError);
});

test('creates an honest challenge invite without sharing a personal game result', () => {
  assert.equal(createFocusGameInviteText(), '나랑 ‘1분 색 신호 게임’ 해볼래? 초록 신호는 누르고 빨강 신호는 기다리는 게임이야.');
  assert.doesNotMatch(createFocusGameInviteText(), /정답률|건강 검사/);
});
