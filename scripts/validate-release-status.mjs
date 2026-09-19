import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const file = process.argv[2] || 'release-status.json';
const value = JSON.parse(await readFile(file, 'utf8'));
assert.deepEqual(Object.keys(value).sort(), ['checkedAt', 'mode', 'pages', 'smoke', 'workerDeployment', 'workerReadiness'].sort(), 'release status fields are invalid');
assert.match(value.checkedAt || '', /^\d{4}-\d{2}-\d{2}T/, 'release status timestamp is invalid');
assert.ok(['RELEASE_FAILED', 'STATIC_ONLY', 'FULL_RELEASE'].includes(value.mode), 'release mode is invalid');
assert.ok(['success', 'failure', 'cancelled', 'skipped'].includes(value.pages), 'Pages result is invalid');
assert.ok(['success', 'failure', 'cancelled', 'skipped'].includes(value.smoke), 'smoke result is invalid');
assert.ok(['success', 'failure', 'cancelled', 'skipped'].includes(value.workerDeployment), 'Worker result is invalid');
assert.equal(typeof value.workerReadiness, 'boolean', 'Worker readiness must be boolean');
if (value.mode === 'RELEASE_FAILED') assert.ok(value.pages !== 'success' || value.smoke !== 'success', 'failed release must have a failed static check');
if (value.mode === 'STATIC_ONLY') assert.equal(value.workerReadiness, false, 'static-only release must keep Worker readiness closed');
if (value.mode === 'FULL_RELEASE') { assert.equal(value.pages, 'success'); assert.equal(value.smoke, 'success'); assert.equal(value.workerReadiness, true); assert.equal(value.workerDeployment, 'success'); }
console.log(JSON.stringify({status:'ok', mode:value.mode, pages:value.pages, smoke:value.smoke, workerReadiness:value.workerReadiness, workerDeployment:value.workerDeployment}));
