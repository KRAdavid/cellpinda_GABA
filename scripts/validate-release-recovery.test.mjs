import assert from 'node:assert/strict';
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {test} from 'node:test';

const root = process.cwd();
const generator = resolve(root, 'scripts/generate-release-recovery-packet.mjs');
const validator = resolve(root, 'scripts/validate-release-recovery-packet.mjs');
const candidateSha = 'a'.repeat(40);
const previousSha = 'b'.repeat(40);

function runGenerator(env, history = []) {
  const directory = mkdtempSync(join(tmpdir(), 'cellpinda-release-recovery-'));
  const output = join(directory, 'release-recovery-packet.json');
  const historyFile = join(directory, 'history.json');
  writeFileSync(historyFile, JSON.stringify(history));
  const result = spawnSync(process.execPath, [generator, '--out', output, '--deployment-history', historyFile], {
    cwd: root,
    encoding: 'utf8',
    env: {...process.env, ...env, CANDIDATE_SHA: candidateSha, GITHUB_REPOSITORY: 'KRAdavid/cellpinda_GABA', GITHUB_RUN_ID: '123', PUBLIC_SITE_URL: 'https://kradavid.github.io/cellpinda_GABA'},
  });
  const packet = result.status === 0 ? JSON.parse(readFileSync(output, 'utf8')) : null;
  return {directory, output, result, packet};
}

function runValidator(file) {
  return spawnSync(process.execPath, [validator, '--', file], {cwd: root, encoding: 'utf8'});
}

const successfulDeployment = {
  id: 42,
  sha: previousSha,
  environment: 'github-pages',
  created_at: '2026-09-20T01:00:00.000Z',
  updated_at: '2026-09-20T01:01:00.000Z',
  statuses: [{state: 'success', created_at: '2026-09-20T01:01:00.000Z', environment_url: 'https://kradavid.github.io/cellpinda_GABA'}],
};

test('generator creates an auditable operator recovery packet from failed smoke', () => {
  const run = runGenerator({PAGES_RESULT: 'success', SMOKE_RESULT: 'failure', WORKER_READINESS_RESULT: 'success', WORKER_RESULT: 'skipped', WORKER_ENABLED: 'false'}, [successfulDeployment]);
  try {
    assert.equal(run.result.status, 0, run.result.stderr || run.result.stdout);
    assert.equal(run.packet.releaseMode, 'RELEASE_FAILED');
    assert.equal(run.packet.recoveryRequired, true);
    assert.equal(run.packet.deploymentHistory.status, 'matched');
    assert.equal(run.packet.deploymentHistory.previousKnownGood.sha, previousSha);
    assert.equal(run.packet.rollback.previousKnownGood.sha, previousSha);
    assert.equal(runValidator(run.output).status, 0);
  } finally {
    rmSync(run.directory, {recursive: true, force: true});
  }
});

test('generator marks a healthy static release as not requiring recovery', () => {
  const run = runGenerator({PAGES_RESULT: 'success', SMOKE_RESULT: 'success', WORKER_READINESS_RESULT: 'success', WORKER_RESULT: 'skipped', WORKER_ENABLED: 'false'});
  try {
    assert.equal(run.result.status, 0, run.result.stderr || run.result.stdout);
    assert.equal(run.packet.releaseMode, 'STATIC_ONLY');
    assert.equal(run.packet.recoveryRequired, false);
    assert.equal(run.packet.rollback.status, 'NOT_REQUIRED');
    assert.deepEqual(run.packet.rollback.actions, []);
    assert.equal(runValidator(run.output).status, 0);
  } finally {
    rmSync(run.directory, {recursive: true, force: true});
  }
});

test('generator keeps an unverified event SHA separate from a known-good deployment', () => {
  const run = runGenerator({PAGES_RESULT: 'failure', SMOKE_RESULT: 'skipped', WORKER_READINESS_RESULT: 'success', WORKER_RESULT: 'skipped', WORKER_ENABLED: 'false', PREVIOUS_CANDIDATE_SHA: previousSha});
  try {
    assert.equal(run.result.status, 0, run.result.stderr || run.result.stdout);
    assert.equal(run.packet.deploymentHistory.status, 'fallback');
    assert.equal(run.packet.deploymentHistory.fallbackSha, previousSha);
    assert.equal(run.packet.deploymentHistory.previousKnownGood, null);
    assert.equal(runValidator(run.output).status, 0);
  } finally {
    rmSync(run.directory, {recursive: true, force: true});
  }
});

test('validator rejects recovery packets that remove operator actions', () => {
  const run = runGenerator({PAGES_RESULT: 'success', SMOKE_RESULT: 'failure', WORKER_READINESS_RESULT: 'success', WORKER_RESULT: 'skipped', WORKER_ENABLED: 'false'}, [successfulDeployment]);
  try {
    assert.equal(run.result.status, 0, run.result.stderr || run.result.stdout);
    const packet = {...run.packet, rollback: {...run.packet.rollback, actions: []}};
    writeFileSync(run.output, JSON.stringify(packet));
    assert.notEqual(runValidator(run.output).status, 0);
  } finally {
    rmSync(run.directory, {recursive: true, force: true});
  }
});
