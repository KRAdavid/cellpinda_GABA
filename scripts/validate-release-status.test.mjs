import assert from 'node:assert/strict';
import {mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {test} from 'node:test';

const validator = resolve(process.cwd(), 'scripts/validate-release-status.mjs');

function runPacket(packet) {
  const directory = mkdtempSync(join(tmpdir(), 'cellpinda-release-status-'));
  const file = join(directory, 'release-status.json');
  writeFileSync(file, `${JSON.stringify(packet)}\n`);
  try {
    return spawnSync(process.execPath, [validator, '--', file], {encoding: 'utf8'});
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
}

test('release status accepts the pnpm separator for a static-only release', () => {
  const result = runPacket({
    checkedAt: '2026-09-20T00:00:00.000Z',
    mode: 'STATIC_ONLY',
    pages: 'success',
    smoke: 'success',
    workerReadinessResult: 'success',
    workerReadiness: false,
    workerDeployment: 'skipped',
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test('release status rejects a failed readiness job relabeled as static-only', () => {
  const result = runPacket({
    checkedAt: '2026-09-20T00:00:00.000Z',
    mode: 'STATIC_ONLY',
    pages: 'success',
    smoke: 'success',
    workerReadinessResult: 'failure',
    workerReadiness: false,
    workerDeployment: 'skipped',
  });
  assert.notEqual(result.status, 0);
});
