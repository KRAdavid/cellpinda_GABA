import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {dirname, resolve} from 'node:path';

const execFileAsync = promisify(execFile);
const source = process.argv[2] || 'tf-pulse.json';
const safeRunSource = process.argv[3] || null;
const safeValidationSource = process.argv[4] || null;
const destination = resolve(process.cwd(), 'data/tf-pulse-heartbeat.json');
const readJson = async relative => JSON.parse(await readFile(resolve(process.cwd(), relative), 'utf8'));
let pulse;
try {
  pulse = JSON.parse(await readFile(resolve(process.cwd(), source), 'utf8'));
} catch (error) {
  // A local operator should be able to reproduce the CI pulse without first
  // creating the transient tf-pulse.json file. Explicit source paths still
  // fail loudly so a typo cannot silently generate a different heartbeat.
  if (process.argv[2] || error?.code !== 'ENOENT') throw error;
  const generated = await execFileAsync(process.execPath, [resolve(process.cwd(), 'scripts/tf-pulse.mjs'), '--json'], {encoding: 'utf8'});
  pulse = JSON.parse(generated.stdout.trim());
}
const fail = message => { throw new Error(`TF pulse heartbeat invalid: ${message}`); };

if (pulse.mode !== 'automation_pulse' || pulse.goalStatus !== 'ACTIVE') fail('only an active automation pulse can be persisted');
if (!pulse.goalId || !/^\d{4}-\d{2}-\d{2}T/.test(pulse.generatedAt)) fail('pulse identity or timestamp is missing');
if (!/^[a-f0-9]{64}$/.test(pulse.snapshotHash || '')) fail('pulse snapshot hash is malformed');
if (!pulse.teaserGate || pulse.teaserGate.taskId !== 'B4') fail('teaser gate is missing');
if (!Array.isArray(pulse.roleCoverage) || pulse.roleCoverage.length !== 6 || pulse.roleCoverage.some(role => !role || typeof role.id !== 'string' || typeof role.label !== 'string' || role.status !== 'present')) fail('TF role coverage is missing or malformed');
if (!pulse.meetingProtocol || typeof pulse.meetingProtocol.cadence !== 'string' || typeof pulse.meetingProtocol.quorum !== 'string' || !Array.isArray(pulse.meetingProtocol.record) || pulse.meetingProtocol.record.length === 0) fail('meeting protocol is missing or malformed');
if (!pulse.executionPolicy || JSON.stringify(Object.keys(pulse.executionPolicy).sort()) !== JSON.stringify(['approvalRiskClasses', 'autoRiskClasses', 'autoStates', 'humanReviewStates', 'note'].sort()) || !Array.isArray(pulse.executionPolicy.autoStates) || !Array.isArray(pulse.executionPolicy.autoRiskClasses) || !Array.isArray(pulse.executionPolicy.humanReviewStates) || !Array.isArray(pulse.executionPolicy.approvalRiskClasses) || typeof pulse.executionPolicy.note !== 'string') fail('execution policy is missing or malformed');
if (Boolean(safeRunSource) !== Boolean(safeValidationSource)) fail('safe run and independent validation sources must be provided together');

let previousHeartbeat;
try {
  previousHeartbeat = JSON.parse(await readFile(destination, 'utf8'));
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

let safeExecution;
if (safeRunSource && safeValidationSource) {
  let safeRun;
  let safeValidation;
  try {
    [safeRun, safeValidation] = await Promise.all([readJson(safeRunSource), readJson(safeValidationSource)]);
  } catch (error) {
    throw new Error(`TF pulse safe run evidence could not be read: ${error.message}`);
  }
  if (safeRun.schemaVersion !== 1 || safeRun.mode !== 'safe_internal_tf_run' || safeRun.status !== 'MET') fail('safe run evidence is not a successful internal run');
  if (safeRun.goalId !== pulse.goalId || safeRun.snapshotHash !== pulse.snapshotHash) fail('safe run evidence is tied to a different pulse');
  if (!safeRun.executionBoundary || safeRun.executionBoundary.state !== 'READY' || safeRun.executionBoundary.risk !== 'B_INTERNAL_WRITE' || safeRun.executionBoundary.externalEffects !== false) fail('safe run evidence crosses the external-effects boundary');
  if (!safeRun.preparation || safeRun.preparation.id !== 'sync-public-data' || safeRun.preparation.risk !== 'B_INTERNAL_WRITE' || safeRun.preparation.status !== 'MET') fail('safe run preparation is not a successful internal write');
  const expectedChecks = ['goal-contract', 'research-copy', 'teaser-boundary', 'sandbox-mvp', 'public-export', 'tf-pulse'];
  if (!Array.isArray(safeRun.executed) || safeRun.executed.length !== expectedChecks.length || JSON.stringify(safeRun.executed.map(item => item?.id)) !== JSON.stringify(expectedChecks) || safeRun.executed.some(item => item?.risk !== 'A_READ' || item?.status !== 'MET')) fail('safe run read-only checks are incomplete');
  if (safeValidation.status !== 'ok' || !/^\d{4}-\d{2}-\d{2}T/.test(safeValidation.validatedAt || '') || safeValidation.goalId !== pulse.goalId || safeValidation.snapshotHash !== pulse.snapshotHash || JSON.stringify(safeValidation.checks) !== JSON.stringify(expectedChecks)) fail('independent safe run validation does not match the pulse');
  safeExecution = {
    mode: 'safe_internal_tf_run',
    status: 'MET',
    validatedAt: typeof safeValidation.validatedAt === 'string' ? safeValidation.validatedAt : pulse.generatedAt,
    executionBoundary: {state: 'READY', risk: 'B_INTERNAL_WRITE', externalEffects: false},
    preparation: {id: safeRun.preparation.id, risk: safeRun.preparation.risk, status: safeRun.preparation.status},
    checks: safeRun.executed.map(({id, risk, status}) => ({id, risk, status})),
    candidateTaskIds: Array.isArray(safeRun.candidateTaskIds) ? [...safeRun.candidateTaskIds] : [],
    humanGateTaskIds: Array.isArray(safeRun.humanGateTaskIds) ? [...safeRun.humanGateTaskIds] : [],
  };
}

const previousSnapshotHash = typeof previousHeartbeat?.snapshotHash === 'string' && /^[a-f0-9]{64}$/.test(previousHeartbeat.snapshotHash)
  ? previousHeartbeat.snapshotHash
  : null;
const stateChanged = Boolean(previousSnapshotHash && previousSnapshotHash !== pulse.snapshotHash);
// A local operator may refresh the heartbeat without having the transient CI
// safe-run files. Preserve the last independently validated summary only when
// the pulse fingerprint is unchanged; never carry evidence across a state
// change or manufacture a new validation record.
const retainedSafeExecution = safeExecution ?? (
  !stateChanged &&
  previousHeartbeat?.safeExecution?.mode === 'safe_internal_tf_run' &&
  previousHeartbeat.safeExecution.status === 'MET'
    ? previousHeartbeat.safeExecution
    : undefined
);

const safeGate = item => ({
  taskId: item.taskId,
  state: item.state,
  chair: item.chair,
  quorum: item.quorum,
  requiredInputs: Array.isArray(item.requiredInputs) ? item.requiredInputs : [],
  nextAction: item.nextAction,
});
const safeRole = item => ({id: item.id, label: item.label, status: item.status});
const continuationModes = new Set(['close', 'human-gate-monitor', 'continue-execution', 'reassess-next-cycle']);
const safeContinuation = value => {
  if (!value || !continuationModes.has(value.mode) || value.cadenceHours !== 6 || !/^\d{4}-\d{2}-\d{2}T/.test(value.nextReviewAt || '') || typeof value.nextAction !== 'string' || value.nextAction.trim().length < 10) fail('continuation loop metadata is missing or malformed');
  return {mode: value.mode, cadenceHours: value.cadenceHours, nextReviewAt: value.nextReviewAt, nextAction: value.nextAction};
};
const heartbeat = {
  schemaVersion: 1,
  mode: 'automation_pulse_heartbeat',
  goalId: pulse.goalId,
  goalStatus: pulse.goalStatus,
  generatedAt: pulse.generatedAt,
  snapshotHash: pulse.snapshotHash,
  previousSnapshotHash,
  stateChanged,
  requiresHumanDecision: Boolean(pulse.requiresHumanDecision),
  continuation: safeContinuation(pulse.continuation),
  meetingProtocol: {cadence: pulse.meetingProtocol.cadence, quorum: pulse.meetingProtocol.quorum, record: [...pulse.meetingProtocol.record]},
  executionPolicy: {autoStates: [...pulse.executionPolicy.autoStates], autoRiskClasses: [...pulse.executionPolicy.autoRiskClasses], humanReviewStates: [...pulse.executionPolicy.humanReviewStates], approvalRiskClasses: [...pulse.executionPolicy.approvalRiskClasses], note: pulse.executionPolicy.note},
  roleCoverage: pulse.roleCoverage.map(safeRole),
  counts: pulse.counts,
  verifying: Array.isArray(pulse.verifying) ? pulse.verifying : [],
  waiting: Array.isArray(pulse.waiting) ? pulse.waiting : [],
  inputGates: Array.isArray(pulse.inputGates) ? pulse.inputGates.map(safeGate) : [],
  teaserGate: {status: pulse.teaserGate.status, taskId: pulse.teaserGate.taskId, taskState: pulse.teaserGate.taskState},
  ...(retainedSafeExecution ? {safeExecution: retainedSafeExecution} : {}),
};

await mkdir(dirname(destination), {recursive: true});
await writeFile(destination, `${JSON.stringify(heartbeat, null, 2)}\n`);
console.log(JSON.stringify({destination, goalId: heartbeat.goalId, generatedAt: heartbeat.generatedAt, snapshotHash: heartbeat.snapshotHash, previousSnapshotHash, stateChanged, inputGates: heartbeat.inputGates.length, safeExecution: heartbeat.safeExecution?.status || null}));
