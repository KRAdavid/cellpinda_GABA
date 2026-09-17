export const BREATH_CYCLE_SECONDS = 14;
export const BREATH_CYCLE_COUNT = 21;
export const BREATH_ACTIVE_SECONDS = BREATH_CYCLE_SECONDS * BREATH_CYCLE_COUNT;
export const BREATH_REST_SECONDS = 5 * 60;

export type BreathStage = 'inhale' | 'hold-top' | 'exhale' | 'hold-bottom' | 'finish';

export interface BreathCue {
  stage: BreathStage;
  seconds: number;
}

/** Returns the current 4-2-6-2 cue using elapsed milliseconds from the rest start. */
export function getBreathCue(elapsedMs: number): BreathCue {
  if (!Number.isFinite(elapsedMs)) throw new TypeError('elapsedMs must be finite');
  const elapsedSeconds = Math.max(0, elapsedMs) / 1000;
  if (elapsedSeconds >= BREATH_ACTIVE_SECONDS) {
    return { stage: 'finish', seconds: Math.max(0, Math.ceil(BREATH_REST_SECONDS - elapsedSeconds)) };
  }
  const cyclePosition = elapsedSeconds % BREATH_CYCLE_SECONDS;
  if (cyclePosition < 4) return { stage: 'inhale', seconds: Math.ceil(4 - cyclePosition) };
  if (cyclePosition < 6) return { stage: 'hold-top', seconds: Math.ceil(6 - cyclePosition) };
  if (cyclePosition < 12) return { stage: 'exhale', seconds: Math.ceil(12 - cyclePosition) };
  return { stage: 'hold-bottom', seconds: Math.ceil(14 - cyclePosition) };
}
