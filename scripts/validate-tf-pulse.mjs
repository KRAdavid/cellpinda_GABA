import {existsSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = new URL('../', import.meta.url);
const readJson = async relative => JSON.parse(await readFile(new URL(relative, root), 'utf8'));
const fail = message => { throw new Error(`TF pulse validation failed: ${message}`); };

const [contract, graph, teaser, roleRegistry] = await Promise.all([
  readJson('data/goal-contract.json'),
  readJson('data/task-graph.json'),
  readJson('data/teaser-manifest.json'),
  readJson('data/tf-role-registry.json'),
]);

if (contract.status !== 'ACTIVE') fail('Goal Contract must be ACTIVE');
if (graph.goalId !== contract.goalId) fail('task graph is not tied to the Goal Contract');
if (roleRegistry.goalId !== contract.goalId || roleRegistry.status !== contract.status || !Array.isArray(roleRegistry.roles) || roleRegistry.roles.length !== 6) fail('TF role registry is missing or not tied to the active Goal Contract');
if (!Array.isArray(graph.stateMachine) || graph.stateMachine.length === 0) fail('state machine is missing');
if (!Array.isArray(graph.tasks) || graph.tasks.length === 0) fail('task graph is empty');
const validateMeetingProtocol = (protocol, label) => {
  if (!protocol || typeof protocol.cadence !== 'string' || protocol.cadence.trim().length < 10 || typeof protocol.quorum !== 'string' || protocol.quorum.trim().length < 10 || !Array.isArray(protocol.record) || protocol.record.length === 0 || protocol.record.some(item => typeof item !== 'string' || item.trim().length < 2)) fail(`${label} meeting protocol is missing or malformed`);
};
validateMeetingProtocol(contract.decisionProtocol, 'Goal Contract');
const expectedExecutionPolicy = {
  autoStates: ['READY'],
  autoRiskClasses: ['A_READ', 'B_INTERNAL_WRITE', 'C_LOW_RISK_INTERNAL'],
  humanReviewStates: ['VERIFYING', 'WAITING', 'BACKLOG', 'REWORK'],
  approvalRiskClasses: ['D_EXTERNAL_REVERSIBLE', 'E_EXTERNAL_COMMITMENT', 'F_LEGAL_IRREVERSIBLE'],
  note: '자동 파동은 내부 샌드박스 후보만 계속하고, 독립 검증·외부 행동·법적 약속은 사람 판단 전환점으로 보존한다.',
};
const approvalRiskClasses = new Set(expectedExecutionPolicy.approvalRiskClasses);
const expectedQuorum = task => approvalRiskClasses.has(task.risk)
  ? {minimum: 3, roles: [task.lead, task.verifier, 'TF 리드·AI 비서실'], rule: '책임자·독립 검증자·TF 리드 추가 확인'}
  : {minimum: 2, roles: [task.lead, task.verifier], rule: '실행 담당자·독립 검증자 확인'};
const validateQuorum = (value, taskId) => {
  if (!value || JSON.stringify(Object.keys(value).sort()) !== JSON.stringify(['minimum', 'roles', 'rule'].sort()) || !Number.isInteger(value.minimum) || !Array.isArray(value.roles) || value.roles.length !== value.minimum || value.roles.some(role => typeof role !== 'string' || role.trim().length < 2) || typeof value.rule !== 'string' || value.rule.trim().length < 8) fail(`decision quorum is malformed for ${taskId}`);
};
const validateExecutionPolicy = (policy, label) => {
  if (!policy || JSON.stringify(Object.keys(policy).sort()) !== JSON.stringify(Object.keys(expectedExecutionPolicy).sort()) || JSON.stringify(policy) !== JSON.stringify(expectedExecutionPolicy)) fail(`${label} execution policy is missing or out of sync`);
};

const states = new Set(graph.stateMachine);
const tasks = new Map();
for (const task of graph.tasks) {
  if (!task.id || tasks.has(task.id)) fail(`duplicate task ${task.id ?? '(unknown)'}`);
  if (!states.has(task.state)) fail(`unsupported state ${task.state} for ${task.id}`);
  if (typeof task.priority !== 'number' || !Number.isInteger(task.priority)) fail(`priority is missing for ${task.id}`);
  if (!task.lead || !task.verifier || task.lead === task.verifier || !Array.isArray(task.evidence)) fail(`TF ownership must have a distinct verifier and evidence for ${task.id}`);
  if (['WAITING', 'BACKLOG'].includes(task.state) && (!Array.isArray(task.requiredInputs) || task.requiredInputs.length === 0 || task.requiredInputs.some(input => typeof input !== 'string' || input.trim().length < 2))) fail(`input-gated task ${task.id} must list required inputs`);
  tasks.set(task.id, task);
}

// Keep the cross-functional review roles requested for this goal. These are
// role labels and decision responsibilities, not claims that credentialed
// external experts have been engaged.
const roleCorpus = [
  ...graph.tasks.flatMap(task => [task.lead, task.verifier]),
  ...contract.workstreams.flatMap(stream => [stream.lead, stream.verifier]),
].join(' · ');
const requiredRoleGroups = roleRegistry.roles;
for (const role of requiredRoleGroups) {
  if (!role.id || !role.label || !Array.isArray(role.match) || role.match.length === 0) fail('TF role registry contains an incomplete role');
  if (!role.match.some(term => typeof term === 'string' && term.length > 1 && roleCorpus.includes(term))) fail(`required TF role group is missing: ${role.label}`);
}

const pulsePath = fileURLToPath(new URL('./tf-pulse.mjs', import.meta.url));
const child = spawnSync(process.execPath, [pulsePath, '--json'], {encoding: 'utf8'});
if (child.status !== 0) fail(child.stderr.trim() || 'tf-pulse command failed');
let pulse;
try { pulse = JSON.parse(child.stdout.trim()); } catch { fail('tf-pulse did not emit JSON'); }

if (pulse.mode !== 'automation_pulse' || pulse.goalId !== contract.goalId || pulse.goalStatus !== contract.status) fail('pulse identity does not match the active contract');
validateMeetingProtocol(pulse.meetingProtocol, 'pulse');
if (JSON.stringify(pulse.meetingProtocol) !== JSON.stringify({cadence: contract.decisionProtocol.cadence, quorum: contract.decisionProtocol.quorum, record: contract.decisionProtocol.record})) fail('pulse meeting protocol is out of sync with the Goal Contract');
validateExecutionPolicy(pulse.executionPolicy, 'pulse');
if (!Array.isArray(pulse.roleCoverage) || JSON.stringify(pulse.roleCoverage) !== JSON.stringify(requiredRoleGroups.map(({id, label}) => ({id, label, status: 'present'})))) fail('pulse role coverage is missing or incomplete');
if (!/^[a-f0-9]{64}$/.test(pulse.snapshotHash ?? '')) fail('pulse snapshot hash is missing or malformed');
if (!pulse.counts || Object.values(pulse.counts).reduce((sum, count) => sum + count, 0) !== graph.tasks.length) fail('state counts do not cover the task graph');
if (pulse.teaserGate?.taskId !== 'B4' || pulse.teaserGate.taskState !== tasks.get('B4')?.state) fail('teaser gate is out of sync with B4');
const continuationModes = new Set(['close', 'human-gate-monitor', 'continue-execution', 'reassess-next-cycle']);
const validateContinuation = (continuation, label) => {
  if (!continuation || !continuationModes.has(continuation.mode) || continuation.cadenceHours !== 6 || !/^\d{4}-\d{2}-\d{2}T/.test(continuation.nextReviewAt ?? '') || typeof continuation.nextAction !== 'string' || continuation.nextAction.trim().length < 10) fail(`${label} continuation loop metadata is missing or malformed`);
};
const continuationComparable = continuation => ({mode: continuation.mode, cadenceHours: continuation.cadenceHours, nextAction: continuation.nextAction});
validateContinuation(pulse.continuation, 'pulse');
const expectedSafeChecks = ['goal-contract', 'research-copy', 'teaser-boundary', 'sandbox-mvp', 'public-export', 'tf-pulse'];
const validateSafeExecution = (value, label) => {
  if (value === undefined) return;
  const exact = (object, keys, name) => {
    if (!object || typeof object !== 'object' || Array.isArray(object) || JSON.stringify(Object.keys(object).sort()) !== JSON.stringify([...keys].sort())) fail(`${label} ${name} is malformed`);
  };
  exact(value, ['mode', 'status', 'validatedAt', 'executionBoundary', 'preparation', 'checks', 'candidateTaskIds', 'humanGateTaskIds'], 'summary');
  if (value.mode !== 'safe_internal_tf_run' || value.status !== 'MET' || !/^\d{4}-\d{2}-\d{2}T/.test(value.validatedAt ?? '')) fail(`${label} identity is malformed`);
  exact(value.executionBoundary, ['state', 'risk', 'externalEffects'], 'execution boundary');
  if (value.executionBoundary.state !== 'READY' || value.executionBoundary.risk !== 'B_INTERNAL_WRITE' || value.executionBoundary.externalEffects !== false) fail(`${label} execution boundary is unsafe`);
  exact(value.preparation, ['id', 'risk', 'status'], 'preparation');
  if (value.preparation.id !== 'sync-public-data' || value.preparation.risk !== 'B_INTERNAL_WRITE' || value.preparation.status !== 'MET') fail(`${label} preparation is malformed`);
  if (!Array.isArray(value.checks) || JSON.stringify(value.checks.map(item => item?.id)) !== JSON.stringify(expectedSafeChecks) || value.checks.some(item => JSON.stringify(Object.keys(item ?? {}).sort()) !== JSON.stringify(['id', 'risk', 'status'].sort()) || item.risk !== 'A_READ' || item.status !== 'MET')) fail(`${label} read-only checks are malformed`);
  if (!Array.isArray(value.candidateTaskIds) || !Array.isArray(value.humanGateTaskIds)) fail(`${label} task lists are malformed`);
};

const expectedMode = state => {
  if (state === 'VERIFYING') return 'independent-review';
  if (state === 'WAITING' || state === 'BACKLOG') return 'input-gate';
  if (state === 'READY') return 'sandbox-execution';
  if (state === 'RUNNING') return 'execution-tracking';
  return 'state-preservation';
};
const expectedDecisionOptionIds = state => {
  if (state === 'VERIFYING') return ['accept', 'rework'];
  if (state === 'WAITING' || state === 'BACKLOG') return ['hold', 'promote'];
  if (state === 'READY') return ['sandbox', 'hold'];
  if (state === 'RUNNING') return ['verify', 'retry'];
  return ['preserve', 'reopen'];
};
const validateDecisionOptions = (options, taskId, state) => {
  if (!Array.isArray(options) || options.length !== 2 || JSON.stringify(options.map(option => option?.id)) !== JSON.stringify(expectedDecisionOptionIds(state))) fail(`decision options are missing or out of order for ${taskId}`);
  for (const option of options) {
    if (!option || typeof option.id !== 'string' || typeof option.label !== 'string' || !Array.isArray(option.criteria) || option.criteria.length < 2 || option.criteria.some(criteria => typeof criteria !== 'string' || criteria.trim().length < 4)) fail(`decision option criteria are incomplete for ${taskId}`);
  }
};
const active = graph.tasks.filter(task => !['DONE', 'CANCELLED'].includes(task.state));
if (pulse.decisions.length !== active.length) fail('every active task must have exactly one decision proposal');
if (!Array.isArray(pulse.meetingAgenda) || pulse.meetingAgenda.length !== pulse.decisions.length) fail('meeting agenda does not cover all decisions');
if (!Array.isArray(pulse.inputGates) || pulse.inputGates.length !== pulse.decisions.filter(item => item.mode === 'input-gate').length) fail('input gates do not cover input-gate decisions');
if (pulse.requiresHumanDecision !== pulse.decisions.some(item => ['VERIFYING', 'WAITING'].includes(item.state))) fail('human decision flag is out of sync');
const expectedContinuationMode = active.length === 0
  ? 'close'
  : pulse.requiresHumanDecision
    ? 'human-gate-monitor'
    : pulse.decisions.some(item => ['READY', 'RUNNING'].includes(item.state))
      ? 'continue-execution'
      : 'reassess-next-cycle';
if (pulse.continuation.mode !== expectedContinuationMode) fail('continuation loop mode is out of sync with active decisions');
for (const decision of pulse.decisions) {
  const task = tasks.get(decision.taskId);
  if (!task || ['DONE', 'CANCELLED'].includes(task.state)) fail(`decision references inactive task ${decision.taskId}`);
  if (decision.state !== task.state || decision.mode !== expectedMode(task.state)) fail(`decision mode/state mismatch for ${task.id}`);
  validateQuorum(decision.quorum, task.id);
  if (JSON.stringify(decision.quorum) !== JSON.stringify(expectedQuorum(task))) fail(`decision quorum is out of sync for ${task.id}`);
  validateDecisionOptions(decision.decisionOptions, task.id, task.state);
  if (JSON.stringify(decision.participants) !== JSON.stringify([task.lead, task.verifier])) fail(`TF participants mismatch for ${task.id}`);
  if (decision.dissent !== null || decision.dissentStatus !== 'human-meeting-required') fail(`automated dissent was fabricated for ${task.id}`);
  if (!Array.isArray(decision.requiredInputs) || JSON.stringify(decision.requiredInputs) !== JSON.stringify(Array.isArray(task.requiredInputs) ? task.requiredInputs : [])) fail(`required input checklist mismatch for ${task.id}`);
  if (typeof decision.nextAction !== 'string' || decision.nextAction.length < 10) fail(`next action missing for ${task.id}`);
  if (task.state === 'WAITING' && typeof task.blockedBy !== 'string') fail(`WAITING task ${task.id} has no input gate`);
}
for (const gate of pulse.inputGates) {
  const decision = pulse.decisions.find(item => item.taskId === gate.taskId);
  if (!decision || decision.mode !== 'input-gate' || gate.blockedBy !== decision.blockedBy || gate.nextAction !== decision.nextAction || JSON.stringify(gate.requiredInputs) !== JSON.stringify(decision.requiredInputs) || JSON.stringify(gate.quorum) !== JSON.stringify(decision.quorum)) fail(`input gate is out of sync for ${gate.taskId}`);
}
if (teaser.status === 'HOLD' && (pulse.teaserGate.taskState !== 'WAITING' || pulse.teaserGate.status !== 'HOLD')) fail('held teaser must remain a WAITING gate');

const heartbeatPath = fileURLToPath(new URL('../data/tf-pulse-heartbeat.json', import.meta.url));
if (existsSync(heartbeatPath)) {
  let heartbeat;
  try { heartbeat = JSON.parse(await readFile(heartbeatPath, 'utf8')); } catch { fail('TF pulse heartbeat is not valid JSON'); }
  if (heartbeat.schemaVersion !== 1 || heartbeat.mode !== 'automation_pulse_heartbeat' || heartbeat.goalId !== contract.goalId || heartbeat.goalStatus !== contract.status) fail('pulse heartbeat identity does not match the active contract');
  if (!/^\d{4}-\d{2}-\d{2}T/.test(heartbeat.generatedAt ?? '') || !/^[a-f0-9]{64}$/.test(heartbeat.snapshotHash ?? '')) fail('pulse heartbeat timestamp or hash is malformed');
  validateContinuation(heartbeat.continuation, 'heartbeat');
  validateMeetingProtocol(heartbeat.meetingProtocol, 'heartbeat');
  validateExecutionPolicy(heartbeat.executionPolicy, 'heartbeat');
  validateSafeExecution(heartbeat.safeExecution, 'heartbeat safe execution');
  if (!heartbeat.counts || typeof heartbeat.requiresHumanDecision !== 'boolean' || typeof heartbeat.stateChanged !== 'boolean' || (heartbeat.previousSnapshotHash !== null && !/^[a-f0-9]{64}$/.test(heartbeat.previousSnapshotHash ?? '')) || !Array.isArray(heartbeat.roleCoverage) || JSON.stringify(heartbeat.roleCoverage) !== JSON.stringify(pulse.roleCoverage) || JSON.stringify(heartbeat.meetingProtocol) !== JSON.stringify(pulse.meetingProtocol) || JSON.stringify(heartbeat.executionPolicy) !== JSON.stringify(pulse.executionPolicy) || !Array.isArray(heartbeat.verifying) || !Array.isArray(heartbeat.waiting) || !Array.isArray(heartbeat.inputGates)) fail('pulse heartbeat summary is incomplete or role coverage is out of sync');
  if (heartbeat.stateChanged !== Boolean(heartbeat.previousSnapshotHash && heartbeat.previousSnapshotHash !== heartbeat.snapshotHash)) fail('pulse heartbeat state change marker is inconsistent');
  if (heartbeat.snapshotHash !== pulse.snapshotHash || JSON.stringify(heartbeat.counts) !== JSON.stringify(pulse.counts) || heartbeat.requiresHumanDecision !== pulse.requiresHumanDecision || JSON.stringify(continuationComparable(heartbeat.continuation)) !== JSON.stringify(continuationComparable(pulse.continuation)) || JSON.stringify(heartbeat.verifying) !== JSON.stringify(pulse.verifying) || JSON.stringify(heartbeat.waiting) !== JSON.stringify(pulse.waiting) || JSON.stringify(heartbeat.inputGates) !== JSON.stringify(pulse.inputGates.map(({taskId, state, chair, quorum, requiredInputs, nextAction}) => ({taskId, state, chair, quorum, requiredInputs, nextAction})))) fail('pulse heartbeat is not the current pulse snapshot');
  if (heartbeat.safeExecution) {
    const expectedHumanGates = pulse.decisions.filter(item => ['VERIFYING', 'WAITING', 'BACKLOG', 'REWORK'].includes(item.state)).map(item => item.taskId);
    const expectedCandidates = Array.isArray(pulse.ready) ? pulse.ready : [];
    if (JSON.stringify(heartbeat.safeExecution.humanGateTaskIds) !== JSON.stringify(expectedHumanGates) || JSON.stringify(heartbeat.safeExecution.candidateTaskIds) !== JSON.stringify(expectedCandidates)) fail('pulse heartbeat safe execution task lists are out of sync');
  }
}

console.log(JSON.stringify({
  goalId: contract.goalId,
  activeTasks: active.length,
  decisions: pulse.decisions.length,
  roleCoverage: pulse.roleCoverage,
  counts: pulse.counts,
  teaserGate: pulse.teaserGate,
  status: 'ok',
}));
