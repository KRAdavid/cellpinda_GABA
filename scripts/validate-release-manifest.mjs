import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readdir, readFile} from 'node:fs/promises';
import {relative, resolve} from 'node:path';
import {DEFAULT_PUBLIC_SITE_URL, normalizePublicSiteUrl} from './public-origin.mjs';

const outputArgument = process.argv.slice(2).find(value => !value.startsWith('-')) || 'dist';
const outputDirectory = resolve(process.cwd(), outputArgument);
const manifest = JSON.parse(await readFile(resolve(outputDirectory, 'release-manifest.json'), 'utf8'));
const expectedRoutes = ['/', '/products/', '/research/', '/focus/', '/share/active/', '/share/sleep/', '/share/irregular/', '/share/sensory/', '/share/unrested/', '/share/steady/'];
assert.deepEqual(Object.keys(manifest).sort(), ['candidateSha', 'checks', 'counts', 'fileHashes', 'generatedAt', 'publicSiteUrl', 'routePaths', 'runtimeMode', 'schemaVersion', 'teaser'].sort(), 'release manifest fields are invalid');
assert.equal(manifest.schemaVersion, 1, 'release manifest schema is unsupported');
assert.match(manifest.candidateSha || '', /^[a-f0-9]{40}$/, 'release manifest candidate SHA is invalid');
assert.match(manifest.generatedAt || '', /^\d{4}-\d{2}-\d{2}T/, 'release manifest timestamp is invalid');
assert.ok(['static', 'worker'].includes(manifest.runtimeMode), 'release manifest runtime mode is invalid');
assert.equal(manifest.publicSiteUrl, normalizePublicSiteUrl(process.env.PUBLIC_SITE_URL || DEFAULT_PUBLIC_SITE_URL), 'release manifest public origin is out of sync');
assert.deepEqual(manifest.routePaths, expectedRoutes, 'release manifest route set is invalid');
assert.deepEqual(Object.keys(manifest.counts).sort(), ['claims', 'products', 'research', 'reviews'].sort(), 'release manifest counts are invalid');
assert.equal(manifest.counts.products, 1, 'release manifest must contain one public product');
assert.equal(manifest.counts.research, 6, 'release manifest must contain six public research records');
assert.equal(manifest.counts.reviews, 1, 'release manifest must contain one approved review destination');
assert.deepEqual(Object.keys(manifest.teaser).sort(), ['status', 'url'].sort(), 'release manifest teaser fields are invalid');
assert.equal(manifest.teaser.status, 'HOLD', 'release manifest teaser must preserve the current hold state');
assert.equal(manifest.teaser.url, null, 'a held teaser cannot expose a public URL');
for (const [key, value] of Object.entries(manifest.checks)) assert.equal(value, true, `release manifest check ${key} is not true`);

const actualHashes = {};
async function collectFiles(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await collectFiles(path);
      continue;
    }
    if (entry.name === 'release-manifest.json') continue;
    actualHashes[relative(outputDirectory, path).replaceAll('\\', '/')] = createHash('sha256').update(await readFile(path)).digest('hex');
  }
}
await collectFiles(outputDirectory);
assert.deepEqual(manifest.fileHashes, actualHashes, 'release manifest file hashes do not match the build output');
console.log(JSON.stringify({directory: outputDirectory, candidateSha: manifest.candidateSha, runtimeMode: manifest.runtimeMode, files: Object.keys(actualHashes).length, status: 'ok'}));
