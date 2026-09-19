import assert from 'node:assert/strict';
import {readdir, readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {DEFAULT_PUBLIC_SITE_URL, normalizePublicSiteUrl, publicSitePath} from './public-origin.mjs';

const outputDirectory = resolve(process.cwd(), process.argv[2] || 'dist');
const target = normalizePublicSiteUrl(process.env.PUBLIC_SITE_URL || undefined);
const defaultPath = publicSitePath(DEFAULT_PUBLIC_SITE_URL);
const targetPath = publicSitePath(target);
const textExtensions = /\.(?:html|css|js|json|txt|xml|svg|webmanifest)$/i;
let files = 0;
let changed = 0;

async function walk(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }
    if (!textExtensions.test(entry.name)) continue;
    files += 1;
    const before = await readFile(path, 'utf8');
    const after = before
      .replaceAll(DEFAULT_PUBLIC_SITE_URL, target)
      .replaceAll(`Disallow: ${defaultPath}/admin`, `Disallow: ${targetPath || ''}/admin`)
      .replaceAll(`Disallow: ${defaultPath}/ops`, `Disallow: ${targetPath || ''}/ops`);
    if (after !== before) {
      await writeFile(path, after, 'utf8');
      changed += 1;
    }
    if (target !== DEFAULT_PUBLIC_SITE_URL) assert.ok(!after.includes(DEFAULT_PUBLIC_SITE_URL), `stale public origin remains in ${path}`);
  }
}

await walk(outputDirectory);
console.log(JSON.stringify({directory: outputDirectory, publicSiteUrl: target, files, changed, status: 'ok'}));
