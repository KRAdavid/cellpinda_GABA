const approvedTokenPattern = /^[A-Za-z0-9_-]{1,64}$/;

/** Return an approved anonymous campaign token, excluding free-form input. */
export function approvedCampaign(value: string | null | undefined): string {
  const token = value?.trim() || '';
  return approvedTokenPattern.test(token) ? token : '';
}

/** Preserve only the approved campaign token from the current query string. */
export function preserveCampaign(target: URL, currentSearch: string): URL {
  const campaign = approvedCampaign(new URLSearchParams(currentSearch).get('campaign'));
  if (campaign) target.searchParams.set('campaign', campaign);
  return target;
}
