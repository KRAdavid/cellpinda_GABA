import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async relative => JSON.parse(await readFile(new URL(`../${relative}`, import.meta.url), 'utf8'));
const content = await readJson('public/data/content.json');
const master = await readJson('public/data/gaba-master-index.json');
const fail = message => { throw new Error(`Public export invalid: ${message}`); };
const isHttps = value => {
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
};
const isSmartStore = value => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'smartstore.naver.com' && ['/cellpinda', '/cellpinda/'].includes(url.pathname);
  } catch { return false; }
};

if (content.schemaVersion !== 1 || master.schemaVersion !== 1) fail('unsupported schema');
if (!Array.isArray(content.claims) || content.claims.length === 0) fail('claims are required');
if (!Array.isArray(master.records) || master.records.length === 0) fail('master records are required');
if (master.records.length !== content.claims.filter(claim => String(claim.id).startsWith('research-')).length) fail('research and master counts differ');

const forbiddenKeys = /^(original|rightsEvidence|rightsScope|privatePath|customer|email|phone|answers|token|operatorToken|adminToken)$/i;
const scanKeys = (value, path = '$') => {
  if (Array.isArray(value)) return value.forEach((item, index) => scanKeys(item, `${path}[${index}]`));
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.test(key)) fail(`private field exported at ${path}.${key}`);
    scanKeys(child, `${path}.${key}`);
  }
};
scanKeys(content);
scanKeys(master);

const claimsById = new Map(content.claims.map(claim => [claim.id, claim]));
for (const claim of content.claims) {
  if (claim.status !== 'approved' || !claim.publicText || !/^\d{4}-\d{2}-\d{2}$/.test(claim.reviewedAt) || !/^[a-f0-9]{64}$/.test(claim.evidenceHash)) fail(`claim ${claim.id} is not provenance-complete`);
  if (!Array.isArray(claim.sources) || claim.sources.length === 0 || claim.sources.some(source => !isHttps(source.url))) fail(`claim ${claim.id} has a non-HTTPS source`);
}

if (content.products.length !== 1) fail(`expected one approved product, found ${content.products.length}`);
const product = content.products[0];
if (product.id !== 'gaba1500' || product.amountMg !== 1500 || product.servings !== 30 || !isSmartStore(product.officialUrl)) fail('the public product must be the Smart Store 1500 mapping');
if (JSON.stringify(content.products).includes('750') || JSON.stringify(master.records).includes('750')) fail('removed 750 product returned to public export');

if (content.reviews.length !== 1 || content.reviews[0].id !== 'shop-review-destination-1500' || !isSmartStore(content.reviews[0].sourceUrl)) fail('review destination is not the approved Smart Store 1500 destination');
for (const record of master.records) {
  const claim = claimsById.get(record.id);
  if (!claim || claim.evidenceHash !== record.evidenceHash || claim.reviewedAt !== record.reviewedAt) fail(`master provenance mismatch for ${record.id}`);
  if (!String(record.id).startsWith('research-')) fail(`non-research record exported: ${record.id}`);
}

console.log(JSON.stringify({
  claims: content.claims.length,
  masterRecords: master.records.length,
  products: content.products.length,
  reviews: content.reviews.length,
  smartStoreOnly: true,
  removed750: true,
  provenance: 'matched',
}));
