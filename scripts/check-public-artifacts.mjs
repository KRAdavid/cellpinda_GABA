import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';

const outputDirectory = resolve(process.cwd(), process.argv[2] || 'dist');
const requiredFiles = [
  'index.html',
  'products/index.html',
  'data/content.json',
  'data/gaba-master-index.json',
  'assets/rhythm-window.webp',
];
for (const file of requiredFiles) assert.ok(existsSync(resolve(outputDirectory, file)), `public artifact is missing ${file}`);

const privateSnapshots = ['operations-queue.json', 'tf-pulse.json', 'goal-audit.json', 'tf-meeting-packet.json'];
const leaked = privateSnapshots.filter(file => existsSync(resolve(outputDirectory, 'data', file)));
assert.deepEqual(leaked, [], `internal operations snapshots must not ship in ${outputDirectory}`);
console.log(JSON.stringify({directory: outputDirectory, requiredFiles: requiredFiles.length, privateSnapshotsExcluded: privateSnapshots.length, status: 'ok'}));
