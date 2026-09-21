import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {readdir, readFile, stat} from 'node:fs/promises';
import {resolve, relative} from 'node:path';

const outputDirectory = resolve(process.cwd(), process.argv.slice(2).find(value => !value.startsWith('-')) || 'dist');
const manifestPath = resolve(outputDirectory, 'release-manifest.json');
assert.ok(existsSync(manifestPath), 'static bundle is missing release-manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const reviewedTeaser = JSON.parse(await readFile(resolve(process.cwd(), 'data/teaser-manifest.json'), 'utf8'));
const expectedRoutes = ['/', '/products/', '/research/', '/focus/', '/share/active/', '/share/sleep/', '/share/irregular/', '/share/sensory/', '/share/unrested/', '/share/steady/'];
assert.deepEqual(manifest.routePaths, expectedRoutes, 'static bundle route manifest is out of sync');
assert.ok(['static', 'worker'].includes(manifest.runtimeMode), 'deployment bundle runtime mode is invalid');
assert.ok(['HOLD', 'PREVIEW'].includes(manifest.teaser?.status), 'static bundle must preserve a supported teaser preview state');
if (manifest.teaser?.status === 'HOLD') assert.equal(manifest.teaser?.url, null, 'held teaser must not expose a public URL');
if (manifest.teaser?.status === 'PREVIEW') assert.match(manifest.teaser?.url || '', /^https:\/\//, 'preview teaser must expose an HTTPS preview URL');
assert.equal(manifest.teaser?.status, reviewedTeaser.status, 'static bundle teaser status must match the reviewed source');
assert.equal(manifest.teaser?.url ?? null, reviewedTeaser.status === 'PREVIEW' ? reviewedTeaser.publicPreviewUrl : null, 'static bundle teaser URL must match the reviewed source exactly');
assert.equal(manifest.counts.products, 1, 'static bundle must contain one public product');
assert.equal(manifest.counts.research, 6, 'static bundle must contain six public research records');
assert.equal(manifest.counts.reviews, 1, 'static bundle must contain one approved review destination');

const routeFile = route => {
  assert.match(route, /^\/(?:[a-z0-9-]+\/)*$/, `unsafe route in release manifest: ${route}`);
  return resolve(outputDirectory, route === '/' ? 'index.html' : `${route.slice(1)}index.html`);
};
const canonicalOf = html => html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] || '';
const titleOf = html => html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || '';
const internalMarker = /콘텐츠 검토실|운영자 접근 키|TF 운영판|운영 큐/;
const discouragingResearchCopy = /매우 제한적|제한적 근거|뚜렷한 차이|효과를 확정|알 수 없습니다|효과가 없|차이가 없|연구마다 다르게 보고|근거가 제한/;
const checked = [];

async function collectPublicTextFiles(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    const fullPath = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectPublicTextFiles(fullPath));
    else if (/\.(?:html|js|json|css|svg|txt|xml)$/i.test(entry.name)) files.push(fullPath);
  }
  return files;
}

for (const route of expectedRoutes) {
  const file = routeFile(route);
  assert.ok(existsSync(file), `static bundle is missing ${route} route file`);
  const info = await stat(file);
  assert.ok(info.size > 500, `${route} route file is unexpectedly small`);
  const html = await readFile(file, 'utf8');
  assert.match(html, /<html[^>]+lang="ko"/i, `${route} route must declare Korean language`);
  assert.match(html, /<meta[^>]+name="viewport"[^>]+content="width=device-width/i, `${route} route must expose a responsive viewport`);
  assert.ok(titleOf(html), `${route} route title is missing`);
  assert.match(html, /<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/i, `${route} route must expose a visible page heading`);
  const expectedCanonical = `${manifest.publicSiteUrl}${route === '/' ? '/' : route}`;
  assert.equal(canonicalOf(html), expectedCanonical, `${route} route canonical is out of sync`);
  assert.match(html, /<meta[^>]+property="og:image:type"[^>]+content="image\/png"/i, `${route} route must declare the social image type`);
  assert.match(html, /<meta[^>]+property="og:image:alt"[^>]+content="[^"]+"/i, `${route} route must describe the Open Graph image`);
  assert.match(html, /<meta[^>]+name="twitter:image:alt"[^>]+content="[^"]+"/i, `${route} route must describe the Twitter image`);
  assert.ok(!/<meta[^>]+http-equiv="refresh"/i.test(html), `${route} route must preserve its static fallback without an immediate meta refresh`);
  assert.ok(!internalMarker.test(html), `${route} route leaks an internal operations marker`);
  checked.push({route, file: relative(outputDirectory, file).replaceAll('\\', '/'), bytes: info.size});
}

const notFound = resolve(outputDirectory, '404.html');
assert.ok(existsSync(notFound), 'static bundle is missing 404.html');
const notFoundHtml = await readFile(notFound, 'utf8');
assert.match(notFoundHtml, /<meta[^>]+name="robots"[^>]+content="noindex, nofollow"/i, '404 route must stay out of search indexes');
assert.ok(!/<link[^>]+rel="canonical"|<meta[^>]+property="og:(?:url|title|image)"/i.test(notFoundHtml), '404 route must not reuse public metadata');

const rootHtml = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');
assert.ok(rootHtml.includes('사람 연구에서 관찰한 내용을 쉽게 정리했어요.'), 'root fallback must preserve the research/product boundary');
if (outputDirectory.endsWith('dist-pages')) {
  const publicPath = new URL(manifest.publicSiteUrl).pathname.replace(/\/$/, '');
  const assetPrefix = publicPath ? `${publicPath}/` : '/';
  const rootAssetUrls = [...rootHtml.matchAll(/<script[^>]+src="([^"]+)"|<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/gi)]
    .map(match => match[1] || match[2]);
  for (const assetUrl of rootAssetUrls) {
    assert.ok(assetUrl.startsWith(assetPrefix), `root asset path must stay below the public base path: ${assetUrl}`);
  }
}
const researchHtml = await readFile(resolve(outputDirectory, 'research/index.html'), 'utf8');
assert.ok(researchHtml.includes('사람을 대상으로 한 GABA 연구를 쉽게 보기'), 'research route must identify its educational purpose');
const productHtml = await readFile(resolve(outputDirectory, 'products/index.html'), 'utf8');
assert.ok(productHtml.includes('셀핀다 가바 1500 · 30포 구성 보기'), 'product route must identify the approved product');
assert.ok(productHtml.includes('4701017202#REVIEW_DIALOG'), 'product route must preserve the direct SmartStore review destination');

const publicTextFiles = await collectPublicTextFiles(outputDirectory);
const internalBundleMarker = /콘텐츠 검토실|운영자 접근 키|TF 운영판|운영 큐|\/api\/(?:admin|ops)\b/;
const internalChunkName = /(?:^|\/)(?:Admin|OperationsMvp)-[^/]+\.js$/;
for (const file of publicTextFiles) {
  const text = await readFile(file, 'utf8');
  assert.ok(!discouragingResearchCopy.test(text), `public bundle exposes discouraging research copy: ${relative(outputDirectory, file).replaceAll('\\', '/')}`);
  if (/\.js$/i.test(file)) {
    const relativeFile = relative(outputDirectory, file).replaceAll('\\', '/');
    assert.ok(!internalChunkName.test(relativeFile), `public bundle emits an internal-only JavaScript chunk: ${relativeFile}`);
    assert.ok(!internalBundleMarker.test(text), `public bundle exposes an internal-only JavaScript chunk: ${relativeFile}`);
  }
}

console.log(JSON.stringify({directory: outputDirectory, runtimeMode: manifest.runtimeMode, routes: checked.length, checked, status: 'ok'}));
