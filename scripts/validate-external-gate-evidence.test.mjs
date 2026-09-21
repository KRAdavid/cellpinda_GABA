import assert from 'node:assert/strict';
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {test} from 'node:test';

const root = process.cwd();
const validator = resolve(root, 'scripts/validate-external-gate-evidence.mjs');
const sourceGraph = JSON.parse(readFileSync(resolve(root, 'data/task-graph.json'), 'utf8'));

function run(graph, evidence) {
  const directory = mkdtempSync(join(tmpdir(), 'cellpinda-external-gate-evidence-'));
  const graphPath = join(directory, 'task-graph.json');
  const evidencePath = join(directory, 'external-gate-evidence.json');
  writeFileSync(graphPath, JSON.stringify(graph));
  if (evidence !== undefined) writeFileSync(evidencePath, JSON.stringify(evidence));
  const result = spawnSync(process.execPath, [validator, '--graph', graphPath, '--evidence', evidencePath], {cwd: root, encoding: 'utf8'});
  return {directory, result};
}

function withState(graph, id, state) {
  return {...graph, tasks: graph.tasks.map(task => task.id === id ? {...task, state} : task)};
}

const completeProof = sourceRef => ({sourceRef, evidenceHash: 'a'.repeat(64)});

test('current WAITING and VERIFYING external gates pass without an evidence manifest', () => {
  const runResult = run(sourceGraph);
  try {
    assert.equal(runResult.result.status, 0, runResult.result.stderr || runResult.result.stdout);
    assert.match(runResult.result.stdout, /"evidenceManifest":"not-present"/);
  } finally {
    rmSync(runResult.directory, {recursive: true, force: true});
  }
});

test('DONE gate fails closed when required evidence is absent', () => {
  const runResult = run(withState(sourceGraph, 'B2', 'DONE'));
  try {
    assert.notEqual(runResult.result.status, 0);
    assert.match(runResult.result.stderr, /DONE external gates require/);
  } finally {
    rmSync(runResult.directory, {recursive: true, force: true});
  }
});

test('DONE gate accepts the complete field-level evidence contract', () => {
  const graph = withState(sourceGraph, 'B3', 'DONE');
  const evidence = {
    schemaVersion: 1,
    goalId: sourceGraph.goalId,
    gates: {
      B3: {
        status: 'DONE',
        reviewedAt: '2026-09-21T10:00:00.000Z',
        reviewer: '근거·표시 검토',
        decision: 'approved',
        scope: '후기 원문 재게시 권한과 공개 문안 검토',
        proofs: {
          'original-review-source': completeProof('docs/evidence/review-source.md'),
          'repost-permission': completeProof('docs/evidence/repost-permission.md'),
          'context-relationship-privacy-review': completeProof('docs/evidence/review-context.md'),
        },
      },
    },
  };
  const runResult = run(graph, evidence);
  try {
    assert.equal(runResult.result.status, 0, runResult.result.stderr || runResult.result.stdout);
    assert.match(runResult.result.stdout, /"evidenceManifest":"validated"/);
  } finally {
    rmSync(runResult.directory, {recursive: true, force: true});
  }
});

test('DONE gate rejects a proof without a SHA-256 evidence hash', () => {
  const graph = withState(sourceGraph, 'E1', 'DONE');
  const evidence = {
    schemaVersion: 1,
    goalId: sourceGraph.goalId,
    gates: {
      E1: {
        status: 'DONE',
        reviewedAt: '2026-09-21T10:00:00.000Z',
        reviewer: '재무·QA',
        decision: 'approved',
        scope: '스마트스토어 주문·취소·환불 대사',
        proofs: {
          'seller-account': completeProof('docs/evidence/seller-account.md'),
          'channel-product-id': completeProof('docs/evidence/product-id.md'),
          'order-cancel-refund-reconciliation': {...completeProof('docs/evidence/reconciliation.md'), evidenceHash: 'missing'},
        },
      },
    },
  };
  const runResult = run(graph, evidence);
  try {
    assert.notEqual(runResult.result.status, 0);
    assert.match(runResult.result.stderr, /evidence hash is invalid/);
  } finally {
    rmSync(runResult.directory, {recursive: true, force: true});
  }
});
