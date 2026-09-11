export const ANALYTICS_CONSENT_KEY = 'cellpinda:analytics-consent:v1';

export type AnalyticsConsent = 'unknown' | 'granted' | 'denied';

type StorageLike = Pick<Storage, 'getItem'>;

export function readAnalyticsConsent(storage?: StorageLike | null): AnalyticsConsent {
  try {
    const value = storage?.getItem(ANALYTICS_CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unknown';
  } catch {
    return 'unknown';
  }
}

export function currentAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === 'undefined') return 'unknown';
  try {
    return readAnalyticsConsent(window.localStorage);
  } catch {
    return 'unknown';
  }
}

export function analyticsConsentGranted(): boolean {
  return currentAnalyticsConsent() === 'granted';
}
