import assert from 'node:assert/strict';
import {access, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const GATE_IDS = ['B2', 'B3', 'E1'];
const ALLOWED_STATES = new Set(['WAITING', 'VERIFYING', 'DONE']);
const REQUIRED_PROOFS = {
  B2: ['final-label-approval', 'product-classification-sku', 'intake-storage-caution-approval'],
  B3: ['original-review-source', 'repost-permission', 'context-relationship-privacy-review'],
  E1: ['seller-account', 'channel-product-id', 'order-cancel-refund-reconciliation'],
};

function optionValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const graphPath = resolve(process.cwd(), optionValue('--graph', 'data/task-graph.json'));
const evidencePath = resolve(process.cwd(), optionValue('--evidence', 'data/external-gate-evidence.json'));
const graph = JSON.parse(await readFile(graphPath, 'utf8'));
assert.ok(graph && Array.isArray(graph.tasks), 'task graph is missing tasks');
const taskById = new Map(graph.tasks.map(task => [task.id, task]));
const tasks = GATE_IDS.map(id => {
  const task = taskById.get(id);
  assert.ok(task, `external gate ${id} is missing from the task graph`);
  assert.ok(ALLOWED_STATES.has(task.state), `${id} must remain WAITING, VERIFYING, or DONE`);
  return task;
});

let evidence;
try {
  await access(evidencePath);
  evidence = JSON.parse(await readFile(evidencePath, 'utf8'));
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

const completed = tasks.filter(task => task.state === 'DONE');
if (!evidence) {
  assert.equal(completed.length, 0, `DONE external gates require ${evidencePath}`);
  console.log(JSON.stringify({status: 'ok', evidenceManifest: 'not-present', pending: tasks.map(task => ({id: task.id, state: task.state}))}));
  process.exit(0);
}

assert.deepEqual(Object.keys(evidence).sort(), ['gates', 'goalId', 'schemaVersion'].sort(), 'external gate evidence fields are invalid');
assert.equal(evidence.schemaVersion, 1, 'external gate evidence schema is unsupported');
assert.equal(evidence.goalId, graph.goalId, 'external gate evidence is tied to another Goal Contract');
assert.ok(evidence.gates && typeof evidence.gates === 'object' && !Array.isArray(evidence.gates), 'external gate evidence gates are missing');

const validTimestamp = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value) && !Number.isNaN(Date.parse(value));
const validText = value => typeof value === 'string' && value.trim().length >= 2;
const validateProof = (proof, gateId, proofId) => {
  assert.ok(proof && typeof proof === 'object' && !Array.isArray(proof), `${gateId}.${proofId} proof is missing`);
  assert.deepEqual(Object.keys(proof).sort(), ['evidenceHash', 'sourceRef'].sort(), `${gateId}.${proofId} proof fields are invalid`);
  assert.match(proof.evidenceHash || '', /^[a-f0-9]{64}$/, `${gateId}.${proofId} evidence hash is invalid`);
  assert.ok(validText(proof.sourceRef), `${gateId}.${proofId} source reference is invalid`);
  assert.doesNotMatch(proof.sourceRef, /[A-Za-z]:\\|\/Users\/|\/home\/|token|secret|password/i, `${gateId}.${proofId} source reference exposes a private path or credential`);
};

for (const task of tasks) {
  const entry = evidence.gates[task.id];
  if (!entry) {
    assert.notEqual(task.state, 'DONE', `DONE external gate ${task.id} is missing evidence`);
    continue;
  }
  assert.equal(entry.status, task.state, `${task.id} evidence status is out of sync with the task graph`);
  if (task.state !== 'DONE') continue;

  assert.ok(Array.isArray(task.evidence) && task.evidence.length > 0, `${task.id} DONE task must retain task evidence references`);
  assert.deepEqual(Object.keys(entry).sort(), ['decision', 'proofs', 'reviewedAt', 'reviewer', 'scope', 'status'].sort(), `${task.id} completion evidence fields are invalid`);
  assert.equal(entry.decision, 'approved', `${task.id} completion evidence must record an approved decision`);
  assert.ok(validTimestamp(entry.reviewedAt), `${task.id} reviewedAt is invalid`);
  assert.ok(validText(entry.reviewer), `${task.id} reviewer is required`);
  assert.ok(validText(entry.scope), `${task.id} approval scope is required`);
  assert.ok(entry.proofs && typeof entry.proofs === 'object' && !Array.isArray(entry.proofs), `${task.id} proof set is missing`);
  assert.deepEqual(Object.keys(entry.proofs).sort(), [...REQUIRED_PROOFS[task.id]].sort(), `${task.id} required proof set is incomplete`);
  for (const proofId of REQUIRED_PROOFS[task.id]) validateProof(entry.proofs[proofId], task.id, proofId);
}

const serialized = JSON.stringify(evidence);
assert.doesNotMatch(serialized, /C:\\|D:\\|\/Users\/|\/home\/|token|secret|password/i, 'external gate evidence contains a local path or credential');
console.log(JSON.stringify({status: 'ok', evidenceManifest: 'validated', gates: tasks.map(task => ({id: task.id, state: task.state, evidence: task.state === 'DONE'}))}));
