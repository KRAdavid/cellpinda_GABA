/**
 * A tiny reaction game for a personal before/after comparison.
 * It is deliberately descriptive: the output is not a clinical score or a
 * measurement of GABA, attention, fatigue, or any other health condition.
 */
export const FATIGUE_GAME_ROUNDS = 5;

/** Three short, research-inspired tasks used for a personal before/after run. */
export const FOCUS_GAME_TRIALS_PER_STAGE = 4;
export const FOCUS_GAME_STAGES = ['speed', 'brake', 'switch'] as const;
export type FocusGameStage = (typeof FOCUS_GAME_STAGES)[number];

export interface FocusTrialRecord {
  readonly stage: FocusGameStage;
  readonly shouldRespond: boolean;
  readonly responded: boolean;
  readonly responseMs: number | null;
  readonly correct: boolean;
}

export interface FocusStageSummary {
  readonly correct: number;
  readonly total: number;
  readonly accuracyPct: number;
  readonly averageMs: number | null;
  readonly falseAlarms: number;
}

export interface FocusGameSummary {
  readonly total: number;
  readonly correct: number;
  readonly accuracyPct: number;
  readonly falseStarts: number;
  readonly speed: FocusStageSummary;
  readonly brake: FocusStageSummary;
  readonly switch: FocusStageSummary;
}

function summarizeFocusStage(records: readonly FocusTrialRecord[]): FocusStageSummary {
  const responseTimes = records
    .map(record => record.responseMs)
    .filter((time): time is number => time !== null);
  const correct = records.filter(record => record.correct).length;
  return {
    correct,
    total: records.length,
    accuracyPct: records.length ? Math.round((correct / records.length) * 100) : 0,
    averageMs: responseTimes.length ? Math.round(responseTimes.reduce((total, time) => total + time, 0) / responseTimes.length) : null,
    falseAlarms: records.filter(record => record.responded && !record.shouldRespond).length,
  };
}

/**
 * Summarize a 12-trial focus challenge. The output describes one personal run;
 * it is not a validated cognitive, medical, or GABA measurement.
 */
export function summarizeFocusGame(records: readonly FocusTrialRecord[], falseStarts = 0): FocusGameSummary {
  const expectedTrials = FOCUS_GAME_STAGES.length * FOCUS_GAME_TRIALS_PER_STAGE;
  if (!Array.isArray(records) || records.length !== expectedTrials ||
    records.some((record, index) => {
      const expectedStage = FOCUS_GAME_STAGES[Math.floor(index / FOCUS_GAME_TRIALS_PER_STAGE)];
      return !record || record.stage !== expectedStage ||
        typeof record.shouldRespond !== 'boolean' || typeof record.responded !== 'boolean' ||
        typeof record.correct !== 'boolean' ||
        (record.responseMs !== null && (!Number.isFinite(record.responseMs) || record.responseMs < 1)) ||
        (record.responded && record.responseMs === null) || (!record.responded && record.responseMs !== null) ||
        record.correct !== (record.shouldRespond ? record.responded : !record.responded);
    }) || !Number.isInteger(falseStarts) || falseStarts < 0) {
    throw new TypeError(`집중 리듬 챌린지는 ${expectedTrials}라운드 기록과 0 이상의 오작동 횟수가 필요합니다.`);
  }
  const speed = summarizeFocusStage(records.slice(0, FOCUS_GAME_TRIALS_PER_STAGE));
  const brake = summarizeFocusStage(records.slice(FOCUS_GAME_TRIALS_PER_STAGE, FOCUS_GAME_TRIALS_PER_STAGE * 2));
  const switching = summarizeFocusStage(records.slice(FOCUS_GAME_TRIALS_PER_STAGE * 2));
  const correct = records.filter(record => record.correct).length;
  return {
    total: records.length,
    correct,
    accuracyPct: Math.round((correct / records.length) * 100),
    falseStarts,
    speed,
    brake,
    switch: switching,
  };
}

export type FocusGameComparisonDirection = 'improved' | 'declined' | 'mixed' | 'similar' | 'unavailable';

export interface FocusGameComparison {
  readonly direction: FocusGameComparisonDirection;
  readonly speedDeltaMs: number | null;
  readonly accuracyDeltaPct: number | null;
  readonly brakeDeltaPct: number | null;
  readonly switchDeltaPct: number | null;
}

/** Compare the same person before/after rest while ignoring tiny timer noise. */
export function compareFocusGames(before: FocusGameSummary, after: FocusGameSummary): FocusGameComparison {
  if (before.speed.averageMs === null || after.speed.averageMs === null) {
    return {direction: 'unavailable', speedDeltaMs: null, accuracyDeltaPct: after.accuracyPct - before.accuracyPct, brakeDeltaPct: after.brake.accuracyPct - before.brake.accuracyPct, switchDeltaPct: after.switch.accuracyPct - before.switch.accuracyPct};
  }
  const speedDeltaMs = after.speed.averageMs - before.speed.averageMs;
  const accuracyDeltaPct = after.accuracyPct - before.accuracyPct;
  const brakeDeltaPct = after.brake.accuracyPct - before.brake.accuracyPct;
  const switchDeltaPct = after.switch.accuracyPct - before.switch.accuracyPct;
  const speedImproved = speedDeltaMs <= -35;
  const speedDeclined = speedDeltaMs >= 35;
  const accuracyImproved = accuracyDeltaPct >= 10;
  const accuracyDeclined = accuracyDeltaPct <= -10;
  const improved = Number(speedImproved) + Number(accuracyImproved);
  const declined = Number(speedDeclined) + Number(accuracyDeclined);
  const direction: FocusGameComparisonDirection = improved > 0 && declined === 0 ? 'improved'
    : declined > 0 && improved === 0 ? 'declined'
    : improved > 0 && declined > 0 ? 'mixed' : 'similar';
  return {direction, speedDeltaMs, accuracyDeltaPct, brakeDeltaPct, switchDeltaPct};
}

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
