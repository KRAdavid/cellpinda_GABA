import assert from 'node:assert/strict';
import test from 'node:test';
import { compareReactionGames, FATIGUE_GAME_ROUNDS, summarizeReactionGame } from './fatigue-game.ts';

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
