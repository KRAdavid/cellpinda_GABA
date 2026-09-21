const workerUrl = process.env.WORKER_URL?.trim();
if (!workerUrl) throw new Error('WORKER_URL is required; configure the deployed Worker origin before running the live API check');
const approvedSmartStoreUrl = 'https://smartstore.naver.com/cellpinda/products/4701017202';
const base = new URL(workerUrl);
if (base.protocol !== 'https:' || base.username || base.password || base.pathname !== '/') {
  throw new Error('WORKER_URL must be an HTTPS origin without credentials or a path');
}
const memberOrigin = process.env.MEMBER_ORIGIN?.trim() || '';
if (memberOrigin) {
  const configured = new URL(memberOrigin);
  if (configured.protocol !== 'https:' || configured.username || configured.password || configured.pathname !== '/' || configured.search || configured.hash) {
    throw new Error('MEMBER_ORIGIN must be an HTTPS origin without credentials, path, query or hash');
  }
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

const fetchRoute = async (path, init = {}) => {
  const response = await fetch(new URL(path, base), {headers:{'cache-control':'no-cache', ...(init.headers || {})}, signal:AbortSignal.timeout(12000), ...init});
  securityHeaders(response);
  return response;
};
const request = async path => {
  const response = await fetchRoute(path);
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return response;
};
const verifyCors = async () => {
  if (!memberOrigin) return false;
  const headers = {
    Origin: memberOrigin,
    'Access-Control-Request-Method': 'GET',
    'Access-Control-Request-Headers': 'content-type',
  };
  const preflight = await fetchRoute('/api/health', {method: 'OPTIONS', headers});
  if (preflight.status !== 204) throw new Error(`Worker CORS preflight returned HTTP ${preflight.status}`);
  if (preflight.headers.get('access-control-allow-origin') !== memberOrigin || preflight.headers.get('access-control-allow-credentials') !== 'true') {
    throw new Error('Worker CORS preflight did not allow the configured MEMBER_ORIGIN');
  }
  if (!(preflight.headers.get('access-control-allow-methods') || '').includes('GET') || !(preflight.headers.get('access-control-allow-headers') || '').toLowerCase().includes('content-type')) {
    throw new Error('Worker CORS preflight did not advertise the required API method or header');
  }
  const allowed = await fetchRoute('/api/health', {headers: {Origin: memberOrigin}});
  if (!allowed.ok || allowed.headers.get('access-control-allow-origin') !== memberOrigin) throw new Error('Worker CORS request did not allow the configured MEMBER_ORIGIN');
  const denied = await fetchRoute('/api/health', {headers: {Origin: 'https://release-origin-denied.invalid'}});
  if (denied.status !== 403) throw new Error(`Worker rejected-origin check returned HTTP ${denied.status}`);
  return true;
};
const cacheContains = (response, ...parts) => {
  const cacheControl=(response.headers.get('cache-control') || '').toLowerCase();
  for (const part of parts) if (!cacheControl.includes(part)) throw new Error(`${response.url} has an incomplete cache policy: ${cacheControl || '[missing]'}`);
};
const canonicalHref = html => /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i.exec(html)?.[1] || '';
const jsonLd = html => {
  const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1] || '';
  try { return JSON.parse(raw); } catch { return null; }
};
const metaContent = (html, property) => {
  const escaped=property.replace(/[.*+?^${}()|[\\]\\]/g,'\\\\$&');
  return new RegExp(`<meta[^>]+property="${escaped}"[^>]+content="([^"]+)"`,'i').exec(html)?.[1] || '';
};
const sharedResultIds = ['active','sleep','irregular','sensory','unrested','steady'];

const [pageResponse, healthResponse, contentResponse, robotsResponse, sitemapResponse, productResponse, researchResponse, focusResponse, accountResponse, missingResponse] = await Promise.all([
  request('/'), request('/api/health'), request('/api/content'), request('/robots.txt'), request('/sitemap.xml'),
  request('/products/'), request('/research/'), request('/focus/'), request('/account'), fetchRoute('/release-audit-missing-route'),
]);
const corsVerified = await verifyCors();
if (missingResponse.status !== 404) throw new Error(`/release-audit-missing-route returned HTTP ${missingResponse.status}; Worker unknown paths must remain 404`);
const [page, health, content, robots, sitemap, productPage, researchPage, focusPage, accountPage] = await Promise.all([
  pageResponse.text(), healthResponse.json(), contentResponse.json(), robotsResponse.text(), sitemapResponse.text(),
  productResponse.text(), researchResponse.text(), focusResponse.text(), accountResponse.text(),
]);
if (pageResponse.headers.get('cache-control') !== 'no-store') throw new Error('Worker root shell must be no-store because runtime metadata is rewritten');
if (accountResponse.headers.get('cache-control') !== 'no-store') throw new Error('Worker account shell must be no-store because it is a private runtime view');
cacheContains(contentResponse,'public','max-age=300','must-revalidate');
if (/no-store/i.test(robotsResponse.headers.get('cache-control') || '') || /no-store/i.test(sitemapResponse.headers.get('cache-control') || '')) throw new Error('Worker robots/sitemap must remain cacheable public documents');
if (!robots.includes(`Sitemap: ${base.origin}/sitemap.xml`) || !sitemap.includes(`<loc>${base.origin}/</loc>`)) throw new Error('Worker robots/sitemap must use the configured public origin');
if (canonicalHref(page)!==`${base.origin}/` || !metaContent(page,'og:url')) throw new Error('Worker root canonical/Open Graph metadata is invalid');
if (canonicalHref(account)!==`${base.origin}/account` || !/noindex, nofollow, noarchive/.test(account)) throw new Error('Worker account shell must be private and non-indexable');
if (canonicalHref(productPage)!==`${base.origin}/products/` || metaContent(productPage,'og:url')!==`${base.origin}/products/`) throw new Error('Worker product route must preserve its product canonical/Open Graph URL');
const productSchema = jsonLd(productPage);
const productSchemaNode = Array.isArray(productSchema?.['@graph']) ? productSchema['@graph'].find(node => node?.['@type'] === 'Product') : null;
if (productSchema?.['@context'] !== 'https://schema.org' || productSchemaNode?.name !== '셀핀다 가바 1500' || 'category' in productSchemaNode || productSchemaNode.image !== `${base.origin}/assets/product-composition-1500.png` || productSchemaNode.sameAs !== approvedSmartStoreUrl || productSchemaNode.offers || productSchemaNode.aggregateRating || productSchemaNode.review) throw new Error('Worker product route has missing or unsafe Product structured data');
if (canonicalHref(researchPage)!==`${base.origin}/research/` || metaContent(researchPage,'og:url')!==`${base.origin}/research/`) throw new Error('Worker research route must preserve its research canonical/Open Graph URL');
if (canonicalHref(focusPage)!==`${base.origin}/focus/` || metaContent(focusPage,'og:url')!==`${base.origin}/focus/`) throw new Error('Worker focus route must preserve its invite canonical/Open Graph URL');
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
const expectedSitemap=[`${base.origin}/`,`${base.origin}/products/`,`${base.origin}/research/`,`${base.origin}/focus/`,...sharedResultIds.map(id=>`${base.origin}/share/${id}/`)];
if (JSON.stringify(sitemapUrls)!==JSON.stringify(expectedSitemap)) throw new Error('Worker sitemap route set is not the public route set');
const moduleSources=[...page.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/gi)].map(match=>match[1]).filter(Boolean);
if (!moduleSources.length) throw new Error('Worker root shell did not expose a module bundle');
for (const source of moduleSources) cacheContains(await request(new URL(source,base).pathname),'public','max-age=31536000','immutable');
const sharePages=await Promise.all(sharedResultIds.map(async id=>({id,html:await (await request(`/share/${id}/`)).text()})));
for (const {id,html} of sharePages) {
  if (canonicalHref(html)!==`${base.origin}/share/${id}/` || metaContent(html,'og:url')!==`${base.origin}/share/${id}/`) throw new Error(`Worker share route ${id} lost its canonical/Open Graph URL`);
}
if (!page.includes('<div id="root"></div>')) throw new Error('Worker static root is not the Cellpinda app shell');
if (health.ok !== true || health.persistence !== 'cloudflare-d1') throw new Error('Worker health does not confirm Cloudflare D1 persistence');
if (content.products?.length !== 1 || content.products[0]?.id !== 'gaba1500') throw new Error('Worker public API does not expose the approved 1500 product');
const research = content.claims?.filter(claim => claim.id?.startsWith('research-')) || [];
if (research.length !== 6) throw new Error(`Worker public API returned ${research.length} master studies; expected 6`);
if (!content.claims.find(claim => claim.id === 'research-yoto-2012')?.metadata?.consumerDisclosure) throw new Error('Worker public API dropped the Yoto author relationship disclosure');
if (content.claims.some(claim => claim.id === 'research-sakashita-2019')) throw new Error('Worker public API exposed the study held for independent statistical review');
const powers = content.claims.find(claim => claim.id === 'research-powers-2008');
if (!powers?.metadata?.consumerSummary?.includes('남성 11명') || !powers.metadata.consumerFinding?.includes('쉬었을 때와 운동했을 때의 혈액 속 변화를 살펴본 자료') || /750mg 캡슐|750\s*제품|근육 크기와 근력 변화는 측정하지 않았어요/.test(JSON.stringify(powers.metadata))) throw new Error('Worker public API must preserve the Powers design and scope without removed SKU wording');

console.log(JSON.stringify({origin:base.origin,staticPage:'ok',health:'cloudflare-d1',research:research.length,products:content.products.length,publicRoutes:{product:true,research:true,focus:true,shares:sharePages.length,notFound:404},cachePolicy:'ok',securityHeaders:'ok',cors:corsVerified ? 'ok' : 'not-configured',heldResearchExcluded:true,status:'ok'}));
