export const BREATH_INHALE_SECONDS = 3;
export const BREATH_HOLD_SECONDS = 2;
export const BREATH_EXHALE_SECONDS = 6;
export const BREATH_CYCLE_SECONDS = BREATH_INHALE_SECONDS + BREATH_HOLD_SECONDS + BREATH_EXHALE_SECONDS + BREATH_HOLD_SECONDS;
export const BREATH_CYCLE_COUNT = 21;
export const BREATH_ACTIVE_SECONDS = BREATH_CYCLE_SECONDS * BREATH_CYCLE_COUNT;
export const BREATH_REST_SECONDS = 5 * 60;

export type BreathStage = 'inhale' | 'hold-top' | 'exhale' | 'hold-bottom' | 'finish';

export interface BreathCue {
  stage: BreathStage;
  seconds: number;
}

/** Returns the current 3-2-6-2 cue using elapsed milliseconds from the rest start. */
export function getBreathCue(elapsedMs: number): BreathCue {
  if (!Number.isFinite(elapsedMs)) throw new TypeError('elapsedMs must be finite');
  const elapsedSeconds = Math.max(0, elapsedMs) / 1000;
  if (elapsedSeconds >= BREATH_ACTIVE_SECONDS) {
    return { stage: 'finish', seconds: Math.max(0, Math.ceil(BREATH_REST_SECONDS - elapsedSeconds)) };
  }
  const cyclePosition = elapsedSeconds % BREATH_CYCLE_SECONDS;
  if (cyclePosition < BREATH_INHALE_SECONDS) return { stage: 'inhale', seconds: Math.ceil(BREATH_INHALE_SECONDS - cyclePosition) };
  if (cyclePosition < BREATH_INHALE_SECONDS + BREATH_HOLD_SECONDS) return { stage: 'hold-top', seconds: Math.ceil(BREATH_INHALE_SECONDS + BREATH_HOLD_SECONDS - cyclePosition) };
  if (cyclePosition < BREATH_INHALE_SECONDS + BREATH_HOLD_SECONDS + BREATH_EXHALE_SECONDS) return { stage: 'exhale', seconds: Math.ceil(BREATH_INHALE_SECONDS + BREATH_HOLD_SECONDS + BREATH_EXHALE_SECONDS - cyclePosition) };
  return { stage: 'hold-bottom', seconds: Math.ceil(BREATH_CYCLE_SECONDS - cyclePosition) };
}
