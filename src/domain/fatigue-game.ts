/**
 * A tiny reaction game for a personal before/after comparison.
 * It is deliberately descriptive: the output is not a clinical score or a
 * measurement of GABA, attention, fatigue, or any other health condition.
 */
export const FATIGUE_GAME_ROUNDS = 5;

export type ReactionTime = number | null;

export interface ReactionGameSummary {
  readonly averageMs: number | null;
  readonly hits: number;
  readonly misses: number;
  readonly falseStarts: number;
}

export type ReactionComparisonDirection = 'faster' | 'slower' | 'similar' | 'unavailable';

export interface ReactionGameComparison {
  readonly deltaMs: number | null;
  readonly direction: ReactionComparisonDirection;
}

export function summarizeReactionGame(times: readonly ReactionTime[], falseStarts = 0): ReactionGameSummary {
  if (!Array.isArray(times) || times.length !== FATIGUE_GAME_ROUNDS ||
    times.some(time => time !== null && (!Number.isFinite(time) || time < 0)) ||
    !Number.isInteger(falseStarts) || falseStarts < 0) {
    throw new TypeError(`반응 게임은 ${FATIGUE_GAME_ROUNDS}라운드 기록과 0 이상의 오작동 횟수가 필요합니다.`);
  }

  const hits = times.filter((time): time is number => time !== null);
  return {
    averageMs: hits.length ? Math.round(hits.reduce((total, time) => total + time, 0) / hits.length) : null,
    hits: hits.length,
    misses: FATIGUE_GAME_ROUNDS - hits.length,
    falseStarts,
  };
}

/** Compare two personal runs; 35ms avoids over-reading tiny timer noise. */
export function compareReactionGames(before: ReactionGameSummary, after: ReactionGameSummary): ReactionGameComparison {
  if (before.averageMs === null || after.averageMs === null) return { deltaMs: null, direction: 'unavailable' };
  const deltaMs = after.averageMs - before.averageMs;
  return {
    deltaMs,
    direction: deltaMs <= -35 ? 'faster' : deltaMs >= 35 ? 'slower' : 'similar',
  };
}
