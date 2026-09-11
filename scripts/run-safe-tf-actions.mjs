import {readFile, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const outputIndex = args.indexOf('--out');
const positionalArgs = args.filter((value, index) => index !== outputIndex && index !== outputIndex + 1 && !value.startsWith('--'));
const source = positionalArgs[0] || 'tf-pulse.json';
const readPulse = async () => {
  try {
    return JSON.parse(await readFile(resolve(root, source), 'utf8'));
  } catch (error) {
    if (positionalArgs.length > 0 || error?.code !== 'ENOENT') throw error;
    const generated = spawnSync(process.execPath, [resolve(root, 'scripts/tf-pulse.mjs'), '--json'], {encoding: 'utf8'});
    if (generated.status !== 0) throw new Error(generated.stderr?.trim() || 'TF pulse generation failed');
    return JSON.parse(generated.stdout.trim());
  }
};

const pulse = await readPulse();
const fail = message => { throw new Error(`Safe TF run invalid: ${message}`); };
const expectedAutoRiskClasses = ['A_READ', 'B_INTERNAL_WRITE', 'C_LOW_RISK_INTERNAL'];
if (pulse.mode !== 'automation_pulse' || pulse.goalStatus !== 'ACTIVE' || !pulse.goalId || !pulse.snapshotHash) fail('active automation pulse is required');
if (!pulse.executionPolicy || JSON.stringify(pulse.executionPolicy.autoRiskClasses) !== JSON.stringify(expectedAutoRiskClasses) || JSON.stringify(pulse.executionPolicy.autoStates) !== JSON.stringify(['READY'])) fail('automatic execution boundary is missing or changed');

// The generated public packets are ignored build artifacts in CI, so prepare
// them locally first. This is an internal B-level write only; the subsequent
// checks are read-only. Nothing is published, purchased, sent to an external
// API, or written to the canonical task graph.
const checks = [
  {id: 'goal-contract', script: 'scripts/validate-goal-contract.mjs'},
  {id: 'research-copy', script: 'scripts/validate-research-copy.mjs'},
  {id: 'teaser-boundary', script: 'scripts/validate-teaser-exposure.mjs'},
  {id: 'sandbox-mvp', script: 'scripts/validate-ops-mvp.mjs'},
  {id: 'public-export', script: 'scripts/validate-public-export.mjs'},
  {id: 'tf-pulse', script: 'scripts/validate-tf-pulse.mjs'},
];
const scrub = value => String(value || '')
  .replaceAll(root, '<workspace>')
  .replaceAll(root.replaceAll('\\', '\\\\'), '<workspace>')
  .slice(-2400);
const syncResult = spawnSync(process.execPath, [resolve(root, 'scripts/sync-public-data.mjs')], {encoding: 'utf8'});
const preparation = {
  id: 'sync-public-data',
  risk: 'B_INTERNAL_WRITE',
  status: syncResult.status === 0 ? 'MET' : 'FAILED',
  detail: scrub(syncResult.status === 0 ? syncResult.stdout : syncResult.stderr || syncResult.stdout),
};
const executed = checks.map(check => {
  const result = spawnSync(process.execPath, [resolve(root, check.script)], {encoding: 'utf8'});
  return {
    id: check.id,
    risk: 'A_READ',
    status: result.status === 0 ? 'MET' : 'FAILED',
    detail: scrub(result.status === 0 ? result.stdout : result.stderr || result.stdout),
  };
});
const humanGateTaskIds = (pulse.decisions || [])
  .filter(item => ['VERIFYING', 'WAITING', 'BACKLOG', 'REWORK'].includes(item.state))
  .map(item => item.taskId);
const result = {
  schemaVersion: 1,
  mode: 'safe_internal_tf_run',
  generatedAt: new Date().toISOString(),
  goalId: pulse.goalId,
  snapshotHash: pulse.snapshotHash,
  executionBoundary: {
    state: 'READY',
    risk: 'B_INTERNAL_WRITE',
    externalEffects: false,
    note: '공개 패킷은 내부에서 재생성하고, 외부 행동·승인·canonical 업무 그래프 상태 변경은 하지 않는다.',
  },
  candidateTaskIds: Array.isArray(pulse.ready) ? [...pulse.ready] : [],
  humanGateTaskIds,
  preparation,
  executed,
  status: preparation.status === 'MET' && executed.every(item => item.status === 'MET') ? 'MET' : 'FAILED',
  nextAction: humanGateTaskIds.length
    ? '사람 정족수와 입력 게이트를 유지하고 다음 pulse에서 내부 검증을 반복한다.'
    : '실행 후보가 있으면 샌드박스 증거를 만든 뒤 독립 검증으로 전달한다.',
};

if (args.includes('--out')) {
  const outputPath = args[outputIndex + 1];
  if (!outputPath || outputPath.startsWith('--')) fail('--out must be followed by a file path');
  const destination = resolve(root, outputPath);
  await writeFile(destination, `${JSON.stringify(result, null, 2)}\n`);
}
console.log(JSON.stringify(result, null, 2));
if (result.status !== 'MET') process.exitCode = 1;
