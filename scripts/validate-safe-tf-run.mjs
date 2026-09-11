import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const root = process.cwd();
// pnpm forwards a standalone `--` separator to the child process. Ignore it
// (and any future option flags) so the package script accepts normal paths.
const positionalArgs = process.argv.slice(2).filter(value => value !== '--' && !value.startsWith('--'));
const runSource = positionalArgs[0] || 'tf-safe-run.json';
const pulseSource = positionalArgs[1] || 'tf-pulse.json';
const readJson = async source => JSON.parse(await readFile(resolve(root, source), 'utf8'));
const [run, pulse] = await Promise.all([readJson(runSource), readJson(pulseSource)]);
const fail = message => { throw new Error(`Safe TF run validation failed: ${message}`); };
const exactKeys = (value, expected, label) => {
  if (!value || typeof value !== 'object' || Array.isArray(value) || JSON.stringify(Object.keys(value).sort()) !== JSON.stringify([...expected].sort())) fail(`${label} fields are incomplete or unexpected`);
};
if (run.schemaVersion !== 1 || run.mode !== 'safe_internal_tf_run' || run.status !== 'MET') fail('safe run identity or status is invalid');
if (pulse.mode !== 'automation_pulse' || pulse.goalStatus !== 'ACTIVE') fail('source pulse is not active');
if (run.goalId !== pulse.goalId || run.snapshotHash !== pulse.snapshotHash) fail('safe run is tied to a different pulse');
exactKeys(run.executionBoundary, ['state', 'risk', 'externalEffects', 'note'], 'execution boundary');
if (run.executionBoundary.state !== 'READY' || run.executionBoundary.risk !== 'B_INTERNAL_WRITE' || run.executionBoundary.externalEffects !== false || typeof run.executionBoundary.note !== 'string') fail('execution boundary is not an internal no-external-effects boundary');
exactKeys(run.preparation, ['id', 'risk', 'status', 'detail'], 'preparation');
if (run.preparation.id !== 'sync-public-data' || run.preparation.risk !== 'B_INTERNAL_WRITE' || run.preparation.status !== 'MET') fail('public packet preparation did not complete as an internal write');
const expectedChecks = ['goal-contract', 'research-copy', 'teaser-boundary', 'sandbox-mvp', 'public-export', 'tf-pulse'];
if (!Array.isArray(run.executed) || run.executed.length !== expectedChecks.length || JSON.stringify(run.executed.map(item => item?.id)) !== JSON.stringify(expectedChecks)) fail('safe check list is incomplete or out of order');
for (const check of run.executed) {
  exactKeys(check, ['id', 'risk', 'status', 'detail'], `safe check ${check?.id || '(unknown)'}`);
  if (check.risk !== 'A_READ' || check.status !== 'MET' || typeof check.detail !== 'string') fail(`safe check ${check.id} is not a successful read-only result`);
}
const expectedHumanGates = (pulse.decisions || []).filter(item => ['VERIFYING', 'WAITING', 'BACKLOG', 'REWORK'].includes(item.state)).map(item => item.taskId);
const expectedCandidates = Array.isArray(pulse.ready) ? pulse.ready : [];
if (!Array.isArray(run.humanGateTaskIds) || JSON.stringify(run.humanGateTaskIds) !== JSON.stringify(expectedHumanGates)) fail('human gate task list is out of sync with pulse');
if (!Array.isArray(run.candidateTaskIds) || JSON.stringify(run.candidateTaskIds) !== JSON.stringify(expectedCandidates)) fail('candidate task list is out of sync with pulse');
if (typeof run.generatedAt !== 'string' || Number.isNaN(Date.parse(run.generatedAt)) || typeof run.nextAction !== 'string' || run.nextAction.trim().length < 10) fail('safe run timestamp or next action is missing');
console.log(JSON.stringify({goalId: run.goalId, snapshotHash: run.snapshotHash, status: 'ok', preparation: run.preparation.id, checks: run.executed.map(item => item.id), humanGateTaskIds: run.humanGateTaskIds, candidateTaskIds: run.candidateTaskIds}));
