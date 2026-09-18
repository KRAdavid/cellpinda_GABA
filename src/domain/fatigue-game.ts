/**
 * A tiny reaction game for a personal before/after comparison.
 * It is deliberately descriptive: the output is not a clinical score or a
 * measurement of GABA, attention, fatigue, or any other health condition.
 */
export const FATIGUE_GAME_ROUNDS = 5;

/** Start with the practiced stop rule, then move to speed and rule switching. */
export const FOCUS_GAME_STAGES = ['brake', 'speed', 'switch'] as const;
export const FOCUS_GAME_TRIALS_PER_STAGE = 8;
export const FOCUS_GAME_TOTAL_TRIALS = FOCUS_GAME_STAGES.length * FOCUS_GAME_TRIALS_PER_STAGE;
export function createFocusGameInviteText(): string {
  return '나랑 ‘뇌 컨디션 확인 챌린지’ 해볼래? 1분 동안 바뀌는 신호를 보고 누르거나 멈추는 게임이야.';
}

export type FocusGameStage = (typeof FOCUS_GAME_STAGES)[number];
export const FOCUS_STIMULUS_SHAPES = ['circle', 'diamond', 'ring', 'triangle'] as const;
export type FocusStimulusShape = (typeof FOCUS_STIMULUS_SHAPES)[number];
export type FocusStimulusColor = 'green' | 'purple' | 'red';

export interface FocusTrialPlan {
  readonly stage: FocusGameStage;
  readonly stimulusColor: FocusStimulusColor;
  readonly targetColor: FocusStimulusColor;
  readonly stimulusShape: FocusStimulusShape;
  readonly shouldRespond: boolean;
  readonly foreperiodMs: number;
  readonly responseWindowMs: number;
}

export interface FocusRunPattern {
  readonly trials: Readonly<Record<FocusGameStage, readonly FocusTrialPlan[]>>;
  /** Stimulus order only; timing jitter does not count as a different form. */
  readonly signature: string;
}

const stageTiming = {
  speed: { foreperiod: [750, 1_550] as const, responseWindowMs: 1_700 },
  brake: { foreperiod: [650, 1_400] as const, responseWindowMs: 1_450 },
  switch: { foreperiod: [500, 1_200] as const, responseWindowMs: 1_200 },
};

function randomIndex(length: number, random: () => number): number {
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) throw new RangeError('random must return a number in [0, 1)');
  return Math.floor(value * length);
}

function shuffle<T>(values: readonly T[], random: () => number): T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = randomIndex(index + 1, random);
    [result[index], result[other]] = [result[other]!, result[index]!];
  }
  return result;
}

function randomizedBalanced<T>(
  values: readonly T[],
  isValid: (sequence: readonly T[]) => boolean,
  fallback: readonly T[],
  random: () => number,
): T[] {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const candidate = shuffle(values, random);
    if (isValid(candidate)) return candidate;
  }
  return [...fallback];
}

function hasNoAdjacentStopSignals(sequence: readonly boolean[]): boolean {
  return sequence.every((respond, index) => respond || index === 0 || sequence[index - 1]);
}

function hasAtMostTwoConsecutive<T>(sequence: readonly T[]): boolean {
  return sequence.every((value, index) => index < 2 || value !== sequence[index - 1] || value !== sequence[index - 2]);
}

function ruleChanges(sequence: readonly FocusStimulusColor[]): number {
  return sequence.slice(1).filter((color, index) => color !== sequence[index]).length;
}

function getFormSignature(trials: Readonly<Record<FocusGameStage, readonly FocusTrialPlan[]>>): string {
  return FOCUS_GAME_STAGES.flatMap(stage => trials[stage].map(trial =>
    [stage, trial.stimulusColor, trial.targetColor, trial.stimulusShape, trial.shouldRespond].join(':'))).join('|');
}

/**
 * Build a balanced random form. Difficulty rises by stage, while stage quotas
 * and response windows remain fixed so a person's before/after runs stay comparable.
 */
export function createFocusRunPattern(random: () => number = Math.random, previousSignature?: string): FocusRunPattern {
  const speedShapes = randomizedBalanced(
    [...FOCUS_STIMULUS_SHAPES, ...FOCUS_STIMULUS_SHAPES],
    hasAtMostTwoConsecutive,
    ['circle', 'diamond', 'ring', 'triangle', 'circle', 'diamond', 'ring', 'triangle'] as const,
    random,
  );
  const speedColors = randomizedBalanced(
    ['green', 'green', 'green', 'green', 'purple', 'purple', 'purple', 'purple'] as const,
    hasAtMostTwoConsecutive,
    ['green', 'purple', 'green', 'purple', 'purple', 'green', 'purple', 'green'] as const,
    random,
  );
  const brakeResponses = randomizedBalanced(
    [true, true, true, true, true, false, false, false],
    sequence => hasNoAdjacentStopSignals(sequence) && hasAtMostTwoConsecutive(sequence),
    [true, false, true, true, false, true, true, false],
    random,
  );
  const switchTargets = randomizedBalanced(
    ['green', 'green', 'green', 'green', 'purple', 'purple', 'purple', 'purple'] as const,
    sequence => hasAtMostTwoConsecutive(sequence) && ruleChanges(sequence) >= 4,
    ['green', 'purple', 'green', 'green', 'purple', 'purple', 'green', 'purple'] as const,
    random,
  );
  const switchShapes = randomizedBalanced(
    [...FOCUS_STIMULUS_SHAPES, ...FOCUS_STIMULUS_SHAPES],
    hasAtMostTwoConsecutive,
    ['circle', 'diamond', 'ring', 'triangle', 'circle', 'diamond', 'ring', 'triangle'] as const,
    random,
  );
  const switchResponses = randomizedBalanced(
    [true, true, true, true, true, false, false, false],
    sequence => hasNoAdjacentStopSignals(sequence) && hasAtMostTwoConsecutive(sequence),
    [true, false, true, true, false, true, false, true],
    random,
  );

  const makePlan = (
    stage: FocusGameStage,
    stimulusColor: FocusStimulusColor,
    targetColor: FocusStimulusColor,
    stimulusShape: FocusStimulusShape,
    shouldRespond: boolean,
  ): FocusTrialPlan => {
    const timing = stageTiming[stage];
    const [minimum, maximum] = timing.foreperiod;
    return {
      stage,
      stimulusColor,
      targetColor,
      stimulusShape,
      shouldRespond,
      foreperiodMs: minimum + randomIndex(maximum - minimum + 1, random),
      responseWindowMs: timing.responseWindowMs,
    };
  };

  const speed = speedShapes.map((shape, index) => makePlan('speed', speedColors[index]!, 'green', shape!, true));
  const brake = brakeResponses.map(shouldRespond => makePlan(
    'brake', shouldRespond ? 'green' : 'red', 'green', 'circle', shouldRespond,
  ));
  const switching = switchTargets.map((targetColor, index) => {
    const shouldRespond = switchResponses[index]!;
    const stimulusColor = shouldRespond ? targetColor : targetColor === 'green' ? 'purple' : 'green';
    return makePlan('switch', stimulusColor, targetColor, switchShapes[index]!, shouldRespond);
  });
  const trials: Record<FocusGameStage, FocusTrialPlan[]> = { speed, brake, switch: switching };
  let signature = getFormSignature(trials);

  if (signature === previousSignature) {
    let changed = false;
    for (const field of ['stimulusShape', 'stimulusColor'] as const) {
      const current = speed.map(trial => trial[field]);
      for (let left = 0; left < current.length && !changed; left += 1) {
        for (let right = left + 1; right < current.length && !changed; right += 1) {
          if (current[left] === current[right]) continue;
          const candidate = [...current];
          [candidate[left], candidate[right]] = [candidate[right]!, candidate[left]!];
          if (!hasAtMostTwoConsecutive(candidate)) continue;
          speed[left] = { ...speed[left]!, [field]: candidate[left] };
          speed[right] = { ...speed[right]!, [field]: candidate[right] };
          signature = getFormSignature(trials);
          changed = signature !== previousSignature;
        }
      }
      if (changed) break;
    }
  }

  return { trials, signature };
}

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
 * Summarize a focus challenge. The output describes one personal run;
 * it is not a validated cognitive, medical, or GABA measurement.
 */
export function summarizeFocusGame(records: readonly FocusTrialRecord[], falseStarts = 0): FocusGameSummary {
  const expectedTrials = FOCUS_GAME_TOTAL_TRIALS;
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
    throw new TypeError(`집중 신호 게임에는 ${expectedTrials}개 신호 기록과 0 이상의 잘못 누른 횟수가 필요합니다.`);
  }
  const speed = summarizeFocusStage(records.filter(record => record.stage === 'speed'));
  const brake = summarizeFocusStage(records.filter(record => record.stage === 'brake'));
  const switching = summarizeFocusStage(records.filter(record => record.stage === 'switch'));
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
