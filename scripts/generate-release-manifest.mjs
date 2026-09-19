import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {readdir, readFile, writeFile} from 'node:fs/promises';
import {relative, resolve} from 'node:path';
import {DEFAULT_PUBLIC_SITE_URL, normalizePublicSiteUrl} from './public-origin.mjs';

const outputArgument = process.argv.slice(2).find(value => !value.startsWith('-')) || 'dist';
const outputDirectory = resolve(process.cwd(), outputArgument);
const runtimeMode = process.env.RELEASE_RUNTIME_MODE || (outputDirectory.endsWith('dist-pages') ? 'static' : 'static');
if (!['static', 'worker'].includes(runtimeMode)) throw new Error('RELEASE_RUNTIME_MODE must be static or worker');
const publicSiteUrl = normalizePublicSiteUrl(process.env.PUBLIC_SITE_URL || DEFAULT_PUBLIC_SITE_URL);
const candidateSha = process.env.RELEASE_SHA || process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], {encoding: 'utf8'}).trim();
if (!/^[a-f0-9]{40}$/.test(candidateSha)) throw new Error('release manifest candidate SHA must be a full commit SHA');

const routePaths = [
  '/', '/products/', '/research/', '/focus/',
  '/share/active/', '/share/sleep/', '/share/irregular/', '/share/sensory/', '/share/unrested/', '/share/steady/',
];
const hashFile = content => createHash('sha256').update(content).digest('hex');
const fileHashes = {};
async function collectFiles(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await collectFiles(path);
      continue;
    }
    if (entry.name === 'release-manifest.json') continue;
    const key = relative(outputDirectory, path).replaceAll('\\', '/');
    fileHashes[key] = hashFile(await readFile(path));
  }
}
await collectFiles(outputDirectory);

const content = JSON.parse(await readFile(resolve(outputDirectory, 'data/content.json'), 'utf8'));
const master = JSON.parse(await readFile(resolve(outputDirectory, 'data/gaba-master-index.json'), 'utf8'));
const teaser = JSON.parse(await readFile(resolve(outputDirectory, 'data/teaser-preview.json'), 'utf8'));
const products = Array.isArray(content.products) ? content.products : [];
const reviews = Array.isArray(content.reviews) ? content.reviews : [];
const research = Array.isArray(master.records) ? master.records : [];
const smartStoreProduct = 'https://smartstore.naver.com/cellpinda/products/4701017202';
const smartStoreReview = `${smartStoreProduct}#REVIEW_DIALOG`;
const allText = Object.keys(fileHashes).filter(path => /\.(?:html|css|js|json|txt|xml|svg|webmanifest)$/i.test(path));
let textBundle = '';
for (const path of allText) textBundle += await readFile(resolve(outputDirectory, path), 'utf8');

const checks = {
  routeSet: routePaths.length === 10,
  smartStoreOnly: products.length === 1 && products[0]?.officialUrl === smartStoreProduct && !products.some(product => /750/.test(JSON.stringify(product))),
  reviewDestination: reviews.length === 1 && reviews[0]?.sourceUrl === smartStoreReview,
  researchIndex: research.length === 6 && research.every(record => typeof record.evidenceHash === 'string' && /^[a-f0-9]{64}$/.test(record.evidenceHash)),
  teaserBoundary: teaser.status === 'HOLD' && teaser.url === null,
  challengeCopy: textBundle.includes('뇌컨디션 확인 챌린지') && textBundle.includes('5분 쉬고 다시 해보기') && textBundle.includes('싱잉볼 소리'),
  productBoundary: textBundle.includes('셀핀다 완제품 연구와는 다른 자료입니다.') && textBundle.includes('제품 권장량과 별개'),
};
for (const [key, value] of Object.entries(checks)) if (!value) throw new Error(`release manifest check failed: ${key}`);

const manifest = {
  schemaVersion: 1,
  candidateSha,
  generatedAt: new Date().toISOString(),
  publicSiteUrl,
  runtimeMode,
  routePaths,
  counts: {claims: Array.isArray(content.claims) ? content.claims.length : 0, research: research.length, products: products.length, reviews: reviews.length},
  teaser: {status: teaser.status, url: teaser.url ?? null},
  checks,
  fileHashes,
};
await writeFile(resolve(outputDirectory, 'release-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({directory: outputDirectory, candidateSha, runtimeMode, routes: routePaths.length, files: Object.keys(fileHashes).length, checks, status: 'ok'}));
