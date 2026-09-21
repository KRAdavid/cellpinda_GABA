import assert from 'node:assert/strict';
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';

const run = promisify(execFile);
const script = fileURLToPath(new URL('./validate-tf-pulse-freshness.mjs', import.meta.url));
const directory = await mkdtemp(join(tmpdir(), 'cellpinda-pulse-'));
const heartbeat = join(directory, 'heartbeat.json');
try {
  await writeFile(heartbeat, JSON.stringify({generatedAt: '2026-09-21T07:00:00.000Z'}));
  const fresh = await run(process.execPath, [script], {env: {...process.env, TF_PULSE_HEARTBEAT_PATH: heartbeat, TF_PULSE_NOW: '2026-09-21T10:59:00.000Z'}});
  assert.match(fresh.stdout, /"status":"fresh"/);
  await assert.rejects(
    run(process.execPath, [script], {env: {...process.env, TF_PULSE_HEARTBEAT_PATH: heartbeat, TF_PULSE_NOW: '2026-09-21T15:01:00.000Z'}}),
    /heartbeat is 481 minutes old; maximum is 480/,
  );
} finally {
  await rm(directory, {recursive: true, force: true});
}
