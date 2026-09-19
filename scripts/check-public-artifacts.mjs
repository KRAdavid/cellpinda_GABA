import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {readdir, readFile} from 'node:fs/promises';
import {relative, resolve} from 'node:path';

const outputDirectory = resolve(process.cwd(), process.argv[2] || 'dist');
const requiredFiles = [
  'index.html',
  '404.html',
  'products/index.html',
  'data/content.json',
  'data/gaba-master-index.json',
  'release-manifest.json',
  'assets/rhythm-window.webp',
];
for (const file of requiredFiles) assert.ok(existsSync(resolve(outputDirectory, file)), `public artifact is missing ${file}`);

const privateSnapshots = ['operations-queue.json', 'tf-pulse.json', 'goal-audit.json', 'tf-meeting-packet.json'];
const leaked = privateSnapshots.filter(file => existsSync(resolve(outputDirectory, 'data', file)));
assert.deepEqual(leaked, [], `internal operations snapshots must not ship in ${outputDirectory}`);

const publicManifestPaths = ['data/local-material-manifest.json', 'data/local-order-manifest.json'];
for (const relativePath of publicManifestPaths) {
  const manifest = JSON.parse(await readFile(resolve(process.cwd(), relativePath), 'utf8'));
  assert.deepEqual(manifest.sourceRoots, [], `${relativePath} must not contain local source folders`);
  if (relativePath.includes('material')) assert.deepEqual(manifest.artifacts, [], `${relativePath} must not contain local filenames`);
  else assert.deepEqual(manifest.filePatterns, [], `${relativePath} must not contain local filename patterns`);
}
const ignoreFile = await readFile(resolve(process.cwd(), '.gitignore'), 'utf8');
assert.match(ignoreFile, /^var\/$/m, 'private local audit configuration must stay under the ignored var folder');

const pathLike = /(?:\b[A-Z]:\\(?:[^\s\\/:*?"<>|]+\\)+[^\s"']*|\\\\[A-Za-z0-9._-]+\\[A-Za-z0-9._$ -]+\\[^\s\\]+|\/(?:Users|home|mnt)\/[^/\s"']+\/[^/\s"']+)/;
async function inspectPublicText(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await inspectPublicText(path);
    else if (/\.(?:html|css|js|json|txt|xml|svg)$/i.test(entry.name)) {
      const content = await readFile(path, 'utf8');
      if (pathLike.test(content)) throw new Error(`public build contains a local-path pattern in ${relative(outputDirectory, path)}`);
    }
  }
}
await inspectPublicText(outputDirectory);
console.log(JSON.stringify({directory: outputDirectory, requiredFiles: requiredFiles.length, privateSnapshotsExcluded: privateSnapshots.length, localPathsExcluded: true, status: 'ok'}));
