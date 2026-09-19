export const DEFAULT_PUBLIC_SITE_URL = 'https://kradavid.github.io/cellpinda_GABA';

export function normalizePublicSiteUrl(value = DEFAULT_PUBLIC_SITE_URL) {
  const raw = String(value ?? '').trim();
  if (!raw) throw new Error('PUBLIC_SITE_URL must be an HTTPS URL');
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error('PUBLIC_SITE_URL must be an HTTPS URL');
  }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error('PUBLIC_SITE_URL must be an HTTPS origin without credentials, query, or hash');
  }
  parsed.pathname = parsed.pathname.replace(/\/+$/, '') || '/';
  return parsed.href.replace(/\/$/, '');
}

export function publicSitePath(value = DEFAULT_PUBLIC_SITE_URL) {
  return new URL(normalizePublicSiteUrl(value)).pathname.replace(/\/+$/, '');
}
