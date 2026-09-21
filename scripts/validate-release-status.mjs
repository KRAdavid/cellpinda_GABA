import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// pnpm forwards a standalone `--` separator to the child process. Ignore it
// (and any future option flags) so the workflow's package-script invocation
// validates the intended status packet instead of trying to open a file named
// `--`.
const file = process.argv.slice(2).find(value => value !== '--' && !value.startsWith('--')) || 'release-status.json';
const value = JSON.parse(await readFile(file, 'utf8'));
assert.deepEqual(Object.keys(value).sort(), ['checkedAt', 'mode', 'pages', 'smoke', 'workerDeployment', 'workerReadiness', 'workerReadinessResult'].sort(), 'release status fields are invalid');
assert.match(value.checkedAt || '', /^\d{4}-\d{2}-\d{2}T/, 'release status timestamp is invalid');
assert.ok(['RELEASE_FAILED', 'STATIC_ONLY', 'FULL_RELEASE'].includes(value.mode), 'release mode is invalid');
assert.ok(['success', 'failure', 'cancelled', 'skipped'].includes(value.pages), 'Pages result is invalid');
assert.ok(['success', 'failure', 'cancelled', 'skipped'].includes(value.smoke), 'smoke result is invalid');
assert.ok(['success', 'failure', 'cancelled', 'skipped'].includes(value.workerDeployment), 'Worker result is invalid');
assert.ok(['success', 'failure', 'cancelled', 'skipped'].includes(value.workerReadinessResult), 'Worker readiness result is invalid');
assert.equal(typeof value.workerReadiness, 'boolean', 'Worker readiness must be boolean');
if (value.mode === 'RELEASE_FAILED') {
  assert.ok(value.pages !== 'success' || value.smoke !== 'success' || value.workerReadinessResult !== 'success' || value.workerDeployment !== 'success', 'failed release must have a failed publish, readiness gate, or Worker check');
}
if (value.mode === 'STATIC_ONLY') { assert.equal(value.workerReadinessResult, 'success', 'static-only release must complete the Worker readiness job'); assert.equal(value.workerReadiness, false, 'static-only release must keep Worker readiness closed'); }
if (value.mode === 'FULL_RELEASE') { assert.equal(value.pages, 'success'); assert.equal(value.smoke, 'success'); assert.equal(value.workerReadinessResult, 'success'); assert.equal(value.workerReadiness, true); assert.equal(value.workerDeployment, 'success'); }
console.log(JSON.stringify({status:'ok', mode:value.mode, pages:value.pages, smoke:value.smoke, workerReadinessResult:value.workerReadinessResult, workerReadiness:value.workerReadiness, workerDeployment:value.workerDeployment}));
