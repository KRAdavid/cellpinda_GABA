import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {mkdtemp, readFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const script = fileURLToPath(new URL('./check-automation-freshness.mjs', import.meta.url));

function runMonitor(apiUrl, outputDir, checkedAt) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, '--out', join(outputDir, 'freshness.json')], {
      env: {...process.env, GITHUB_REPOSITORY: 'owner/repo', GITHUB_TOKEN: 'test-token', GITHUB_API_URL: apiUrl, CHECKED_AT: checkedAt},
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', code => resolve({code, stdout, stderr}));
  });
}

async function withApi(runs, callback) {
  const server = createServer((request, response) => {
    const workflow = request.url?.includes('daily-status-report.yml') ? 'daily' : 'pulse';
    const body = JSON.stringify({workflow_runs: runs[workflow] || []});
    response.writeHead(200, {'content-type': 'application/json'});
    response.end(body);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const address = server.address();
    await callback(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

test('automation freshness is MET when both scheduled workflows are within thresholds', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'cellpinda-freshness-'));
  try {
    await withApi({
      daily: [{id: 1, status: 'completed', conclusion: 'success', completed_at: '2026-09-22T00:00:00.000Z', head_sha: 'daily', html_url: 'https://example.test/daily'}],
      pulse: [{id: 2, status: 'completed', conclusion: 'success', completed_at: '2026-09-22T00:00:00.000Z', head_sha: 'pulse', html_url: 'https://example.test/pulse'}],
    }, async apiUrl => {
      const result = await runMonitor(apiUrl, directory, '2026-09-22T03:00:00.000Z');
      assert.equal(result.code, 0, result.stderr);
      const parsed = JSON.parse(await readFile(join(directory, 'freshness.json'), 'utf8'));
      assert.equal(parsed.status, 'MET');
      assert.deepEqual(parsed.checks.map(check => check.status), ['FRESH', 'FRESH']);
      assert.equal(parsed.publicMutation, false);
    });
  } finally {
    await rm(directory, {recursive: true, force: true});
  }
});

test('automation freshness fails closed when TF pulse is stale', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'cellpinda-freshness-'));
  try {
    await withApi({
      daily: [{id: 1, status: 'completed', conclusion: 'success', completed_at: '2026-09-22T00:00:00.000Z', head_sha: 'daily', html_url: 'https://example.test/daily'}],
      pulse: [
        {id: 3, status: 'completed', conclusion: 'startup_failure', created_at: '2026-09-22T02:50:00.000Z', completed_at: '2026-09-22T02:50:01.000Z', head_sha: 'pulse-failed', html_url: 'https://example.test/pulse-failed'},
        {id: 2, status: 'completed', conclusion: 'success', completed_at: '2026-09-21T00:00:00.000Z', head_sha: 'pulse', html_url: 'https://example.test/pulse'},
      ],
    }, async apiUrl => {
      const result = await runMonitor(apiUrl, directory, '2026-09-22T03:00:00.000Z');
      assert.equal(result.code, 1);
      const parsed = JSON.parse(await readFile(join(directory, 'freshness.json'), 'utf8'));
      assert.equal(parsed.status, 'STALE');
      assert.deepEqual(parsed.checks.map(check => check.status), ['FRESH', 'STALE']);
      assert.equal(parsed.checks[1].lastAttempt.conclusion, 'startup_failure');
      assert.match(parsed.checks[1].reason, /최근 시도 startup_failure/);
    });
  } finally {
    await rm(directory, {recursive: true, force: true});
  }
});

test('automation freshness writes an error artifact when GitHub API is unavailable', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'cellpinda-freshness-'));
  try {
    const result = await runMonitor('http://127.0.0.1:1', directory, '2026-09-22T03:00:00.000Z');
    assert.equal(result.code, 1);
    const parsed = JSON.parse(await readFile(join(directory, 'freshness.json'), 'utf8'));
    assert.equal(parsed.status, 'ERROR');
    assert.equal(parsed.checks[0].status, 'ERROR');
    assert.equal(parsed.publicMutation, false);
  } finally {
    await rm(directory, {recursive: true, force: true});
  }
});
