import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const file = process.argv.slice(2).find(value => value !== '--' && !value.startsWith('--')) || 'release-recovery-packet.json';
const value = JSON.parse(await readFile(file, 'utf8'));
const topLevel = ['candidate', 'deploymentHistory', 'generatedAt', 'recoveryRequired', 'releaseMode', 'rollback', 'schemaVersion', 'observed'];
assert.deepEqual(Object.keys(value).sort(), topLevel.sort(), 'recovery packet fields are invalid');
assert.equal(value.schemaVersion, 1, 'recovery packet schema is unsupported');
assert.match(value.generatedAt || '', /^\d{4}-\d{2}-\d{2}T/, 'recovery packet timestamp is invalid');
assert.ok(!Number.isNaN(Date.parse(value.generatedAt)), 'recovery packet timestamp cannot be parsed');
assert.ok(['RELEASE_FAILED', 'STATIC_ONLY', 'FULL_RELEASE'].includes(value.releaseMode), 'recovery packet release mode is invalid');
assert.equal(typeof value.recoveryRequired, 'boolean', 'recoveryRequired must be boolean');
assert.equal(value.recoveryRequired, value.releaseMode === 'RELEASE_FAILED', 'recoveryRequired must match release mode');

assert.deepEqual(Object.keys(value.candidate).sort(), ['publicSiteUrl', 'repository', 'runId', 'runUrl', 'sha'].sort(), 'candidate fields are invalid');
assert.match(value.candidate.sha || '', /^[a-f0-9]{40}$/, 'candidate SHA is invalid');
assert.ok(value.candidate.repository && !/[\\\s]/.test(value.candidate.repository), 'candidate repository is invalid');
assert.ok(value.candidate.runId, 'candidate run ID is required');
for (const key of ['runUrl', 'publicSiteUrl']) {
  const url = new URL(value.candidate[key]);
  assert.equal(url.protocol, 'https:', `${key} must use HTTPS`);
}

assert.deepEqual(Object.keys(value.observed).sort(), ['pages', 'smoke', 'workerDeployment', 'workerReadiness', 'workerReadinessResult'].sort(), 'observed fields are invalid');
for (const key of ['pages', 'smoke', 'workerDeployment', 'workerReadinessResult']) assert.ok(['success', 'failure', 'cancelled', 'skipped', 'unknown'].includes(value.observed[key]), `${key} result is invalid`);
assert.equal(typeof value.observed.workerReadiness, 'boolean', 'workerReadiness must be boolean');

assert.deepEqual(Object.keys(value.deploymentHistory).sort(), ['fallbackSha', 'inspectedCount', 'previousKnownGood', 'source', 'status'].sort(), 'deployment history fields are invalid');
assert.ok(['github-api', 'file', 'none'].includes(value.deploymentHistory.source), 'deployment history source is invalid');
assert.ok(['matched', 'fallback', 'no-known-good', 'unavailable'].includes(value.deploymentHistory.status), 'deployment history status is invalid');
assert.ok(Number.isInteger(value.deploymentHistory.inspectedCount) && value.deploymentHistory.inspectedCount >= 0 && value.deploymentHistory.inspectedCount <= 100, 'deployment history count is invalid');
if (value.deploymentHistory.fallbackSha !== null) assert.match(value.deploymentHistory.fallbackSha, /^[a-f0-9]{40}$/, 'fallback SHA is invalid');

function validateKnownGood(valueToCheck, label) {
  if (valueToCheck === null) return;
  assert.deepEqual(Object.keys(valueToCheck).sort(), ['createdAt', 'environment', 'id', 'sha', 'status', 'updatedAt', 'url', 'verified'].sort(), `${label} fields are invalid`);
  assert.match(valueToCheck.sha || '', /^[a-f0-9]{40}$/, `${label} SHA is invalid`);
  assert.equal(valueToCheck.environment, 'github-pages', `${label} environment is invalid`);
  assert.ok(valueToCheck.id, `${label} ID is required`);
  assert.equal(valueToCheck.status, 'success', `${label} status must be success`);
  assert.equal(valueToCheck.verified, true, `${label} must be verified`);
  assert.ok(!Number.isNaN(Date.parse(valueToCheck.createdAt)), `${label} createdAt is invalid`);
  assert.ok(!Number.isNaN(Date.parse(valueToCheck.updatedAt)), `${label} updatedAt is invalid`);
  if (valueToCheck.url !== null) assert.equal(new URL(valueToCheck.url).protocol, 'https:', `${label} URL must use HTTPS`);
}

validateKnownGood(value.deploymentHistory.previousKnownGood, 'previous known-good deployment');
if (value.deploymentHistory.status === 'matched') assert.ok(value.deploymentHistory.previousKnownGood, 'matched history requires a previous known-good deployment');
if (value.deploymentHistory.status === 'fallback') assert.ok(value.deploymentHistory.fallbackSha, 'fallback history requires a fallback SHA');

assert.deepEqual(Object.keys(value.rollback).sort(), ['actions', 'automation', 'currentCandidateSha', 'previousKnownGood', 'status'].sort(), 'rollback fields are invalid');
assert.equal(value.rollback.currentCandidateSha, value.candidate.sha, 'rollback candidate SHA is out of sync');
assert.equal(value.rollback.automation, 'manual-approval-required', 'rollback automation must require manual approval');
assert.deepEqual(value.rollback.previousKnownGood, value.deploymentHistory.previousKnownGood, 'rollback target is out of sync with deployment history');
assert.ok(Array.isArray(value.rollback.actions), 'rollback actions must be an array');
if (value.recoveryRequired) {
  assert.equal(value.rollback.status, 'READY_FOR_OPERATOR', 'failed releases must produce an operator recovery packet');
  assert.ok(value.rollback.actions.length >= 3, 'failed releases need actionable recovery steps');
} else {
  assert.equal(value.rollback.status, 'NOT_REQUIRED', 'successful releases must not request recovery');
  assert.equal(value.rollback.actions.length, 0, 'successful releases must not contain recovery actions');
}

const serialized = JSON.stringify(value);
assert.doesNotMatch(serialized, /token|secret|password|privatePath|node_modules|[A-Za-z]:\\/i, 'recovery packet contains a sensitive value or local path');
console.log(JSON.stringify({status: 'ok', releaseMode: value.releaseMode, recoveryRequired: value.recoveryRequired, previousKnownGood: value.deploymentHistory.previousKnownGood?.sha || null}));
