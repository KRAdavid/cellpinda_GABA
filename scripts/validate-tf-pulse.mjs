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

const states = new Set(graph.stateMachine);
const tasks = new Map();
for (const task of graph.tasks) {
  if (!task.id || tasks.has(task.id)) fail(`duplicate task ${task.id ?? '(unknown)'}`);
  if (!states.has(task.state)) fail(`unsupported state ${task.state} for ${task.id}`);
  if (typeof task.priority !== 'number' || !Number.isInteger(task.priority)) fail(`priority is missing for ${task.id}`);
  if (!task.lead || !task.verifier || !Array.isArray(task.evidence)) fail(`TF ownership or evidence is missing for ${task.id}`);
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
if (!Array.isArray(pulse.roleCoverage) || JSON.stringify(pulse.roleCoverage) !== JSON.stringify(requiredRoleGroups.map(({id, label}) => ({id, label, status: 'present'})))) fail('pulse role coverage is missing or incomplete');
if (!/^[a-f0-9]{64}$/.test(pulse.snapshotHash ?? '')) fail('pulse snapshot hash is missing or malformed');
if (!pulse.counts || Object.values(pulse.counts).reduce((sum, count) => sum + count, 0) !== graph.tasks.length) fail('state counts do not cover the task graph');
if (pulse.teaserGate?.taskId !== 'B4' || pulse.teaserGate.taskState !== tasks.get('B4')?.state) fail('teaser gate is out of sync with B4');

const expectedMode = state => {
  if (state === 'VERIFYING') return 'independent-review';
  if (state === 'WAITING' || state === 'BACKLOG') return 'input-gate';
  if (state === 'READY') return 'sandbox-execution';
  if (state === 'RUNNING') return 'execution-tracking';
  return 'state-preservation';
};
const active = graph.tasks.filter(task => !['DONE', 'CANCELLED'].includes(task.state));
if (pulse.decisions.length !== active.length) fail('every active task must have exactly one decision proposal');
if (!Array.isArray(pulse.meetingAgenda) || pulse.meetingAgenda.length !== pulse.decisions.length) fail('meeting agenda does not cover all decisions');
if (!Array.isArray(pulse.inputGates) || pulse.inputGates.length !== pulse.decisions.filter(item => item.mode === 'input-gate').length) fail('input gates do not cover input-gate decisions');
if (pulse.requiresHumanDecision !== pulse.decisions.some(item => ['VERIFYING', 'WAITING'].includes(item.state))) fail('human decision flag is out of sync');
for (const decision of pulse.decisions) {
  const task = tasks.get(decision.taskId);
  if (!task || ['DONE', 'CANCELLED'].includes(task.state)) fail(`decision references inactive task ${decision.taskId}`);
  if (decision.state !== task.state || decision.mode !== expectedMode(task.state)) fail(`decision mode/state mismatch for ${task.id}`);
  if (JSON.stringify(decision.participants) !== JSON.stringify([task.lead, task.verifier])) fail(`TF participants mismatch for ${task.id}`);
  if (decision.dissent !== null || decision.dissentStatus !== 'human-meeting-required') fail(`automated dissent was fabricated for ${task.id}`);
  if (!Array.isArray(decision.requiredInputs) || JSON.stringify(decision.requiredInputs) !== JSON.stringify(Array.isArray(task.requiredInputs) ? task.requiredInputs : [])) fail(`required input checklist mismatch for ${task.id}`);
  if (typeof decision.nextAction !== 'string' || decision.nextAction.length < 10) fail(`next action missing for ${task.id}`);
  if (task.state === 'WAITING' && typeof task.blockedBy !== 'string') fail(`WAITING task ${task.id} has no input gate`);
}
for (const gate of pulse.inputGates) {
  const decision = pulse.decisions.find(item => item.taskId === gate.taskId);
  if (!decision || decision.mode !== 'input-gate' || gate.blockedBy !== decision.blockedBy || gate.nextAction !== decision.nextAction || JSON.stringify(gate.requiredInputs) !== JSON.stringify(decision.requiredInputs)) fail(`input gate is out of sync for ${gate.taskId}`);
}
if (teaser.status === 'HOLD' && (pulse.teaserGate.taskState !== 'WAITING' || pulse.teaserGate.status !== 'HOLD')) fail('held teaser must remain a WAITING gate');

const heartbeatPath = fileURLToPath(new URL('../data/tf-pulse-heartbeat.json', import.meta.url));
if (existsSync(heartbeatPath)) {
  let heartbeat;
  try { heartbeat = JSON.parse(await readFile(heartbeatPath, 'utf8')); } catch { fail('TF pulse heartbeat is not valid JSON'); }
  if (heartbeat.schemaVersion !== 1 || heartbeat.mode !== 'automation_pulse_heartbeat' || heartbeat.goalId !== contract.goalId || heartbeat.goalStatus !== contract.status) fail('pulse heartbeat identity does not match the active contract');
  if (!/^\d{4}-\d{2}-\d{2}T/.test(heartbeat.generatedAt ?? '') || !/^[a-f0-9]{64}$/.test(heartbeat.snapshotHash ?? '')) fail('pulse heartbeat timestamp or hash is malformed');
  if (!heartbeat.counts || typeof heartbeat.requiresHumanDecision !== 'boolean' || !Array.isArray(heartbeat.roleCoverage) || JSON.stringify(heartbeat.roleCoverage) !== JSON.stringify(pulse.roleCoverage) || !Array.isArray(heartbeat.verifying) || !Array.isArray(heartbeat.waiting) || !Array.isArray(heartbeat.inputGates)) fail('pulse heartbeat summary is incomplete or role coverage is out of sync');
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
