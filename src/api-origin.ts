/**
 * Resolve the optional runtime API origin without probing a static host.
 *
 * GitHub Pages serves the built site below a repository base path and does
 * not expose the Worker API. In that case callers should use their static
 * data/localStorage fallback directly. A Worker deployment uses `/` and can
 * keep the API on the same origin; a separate API origin can be supplied via
 * VITE_API_ORIGIN when the public site and Worker are hosted separately.
 */
export function apiEndpoint(path: string): string | null {
  const configuredOrigin = typeof import.meta.env.VITE_API_ORIGIN === 'string'
    ? import.meta.env.VITE_API_ORIGIN.trim().replace(/\/+$/, '')
    : '';
  const sameOrigin = import.meta.env.BASE_URL === '/';
  if (!configuredOrigin && !sameOrigin) return null;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${configuredOrigin}${normalizedPath}`;
}
