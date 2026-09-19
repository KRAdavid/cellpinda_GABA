const workerUrl = process.env.WORKER_URL?.trim();
if (!workerUrl) throw new Error('WORKER_URL is required; configure the deployed Worker origin before running the live API check');
const base = new URL(workerUrl);
if (base.protocol !== 'https:' || base.username || base.password || base.pathname !== '/') {
  throw new Error('WORKER_URL must be an HTTPS origin without credentials or a path');
}

const securityHeaders = response => {
  const expected = {
    'referrer-policy': 'strict-origin-when-cross-origin',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'permissions-policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
    'strict-transport-security': 'max-age=31536000; includeSubDomains',
  };
  for (const [name, value] of Object.entries(expected)) {
    if (response.headers.get(name) !== value) throw new Error(`${response.url} is missing expected ${name}`);
  }
  const csp = response.headers.get('content-security-policy') || '';
  for (const directive of ["default-src 'self'", "object-src 'none'", "frame-ancestors 'none'"]) {
    if (!csp.includes(directive)) throw new Error(`${response.url} has an incomplete Content-Security-Policy`);
  }
};

const request = async path => {
  const response = await fetch(new URL(path, base), {headers:{'cache-control':'no-cache'},signal:AbortSignal.timeout(12000)});
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  securityHeaders(response);
  return response;
};

const [pageResponse, healthResponse, contentResponse] = await Promise.all([
  request('/'), request('/api/health'), request('/api/content'),
]);
const [page, health, content] = await Promise.all([
  pageResponse.text(), healthResponse.json(), contentResponse.json(),
]);
if (!page.includes('<div id="root"></div>')) throw new Error('Worker static root is not the Cellpinda app shell');
if (health.ok !== true || health.persistence !== 'cloudflare-d1') throw new Error('Worker health does not confirm Cloudflare D1 persistence');
if (content.products?.length !== 1 || content.products[0]?.id !== 'gaba1500') throw new Error('Worker public API does not expose the approved 1500 product');
const research = content.claims?.filter(claim => claim.id?.startsWith('research-')) || [];
if (research.length !== 6) throw new Error(`Worker public API returned ${research.length} master studies; expected 6`);
if (!content.claims.find(claim => claim.id === 'research-yoto-2012')?.metadata?.consumerDisclosure) throw new Error('Worker public API dropped the Yoto author relationship disclosure');
if (content.claims.some(claim => claim.id === 'research-sakashita-2019')) throw new Error('Worker public API exposed the study held for independent statistical review');
const powers = content.claims.find(claim => claim.id === 'research-powers-2008');
if (!powers?.metadata?.consumerSummary?.includes('남성 11명') || !powers.metadata.consumerFinding?.includes('근육 크기와 근력 변화는 측정하지 않았어요')) throw new Error('Worker public API must preserve the Powers design and scope before its finding');

console.log(JSON.stringify({origin:base.origin,staticPage:'ok',health:'cloudflare-d1',research:research.length,products:content.products.length,securityHeaders:'ok',heldResearchExcluded:true,status:'ok'}));
