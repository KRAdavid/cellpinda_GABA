import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';

const source = process.argv[2] || 'tf-pulse.json';
const destination = resolve(process.cwd(), 'data/tf-pulse-heartbeat.json');
const pulse = JSON.parse(await readFile(resolve(process.cwd(), source), 'utf8'));
const fail = message => { throw new Error(`TF pulse heartbeat invalid: ${message}`); };

if (pulse.mode !== 'automation_pulse' || pulse.goalStatus !== 'ACTIVE') fail('only an active automation pulse can be persisted');
if (!pulse.goalId || !/^\d{4}-\d{2}-\d{2}T/.test(pulse.generatedAt)) fail('pulse identity or timestamp is missing');
if (!/^[a-f0-9]{64}$/.test(pulse.snapshotHash || '')) fail('pulse snapshot hash is malformed');
if (!pulse.teaserGate || pulse.teaserGate.taskId !== 'B4') fail('teaser gate is missing');
if (!Array.isArray(pulse.roleCoverage) || pulse.roleCoverage.length !== 6 || pulse.roleCoverage.some(role => !role || typeof role.id !== 'string' || typeof role.label !== 'string' || role.status !== 'present')) fail('TF role coverage is missing or malformed');

const safeGate = item => ({
  taskId: item.taskId,
  state: item.state,
  chair: item.chair,
  requiredInputs: Array.isArray(item.requiredInputs) ? item.requiredInputs : [],
  nextAction: item.nextAction,
});
const safeRole = item => ({id: item.id, label: item.label, status: item.status});
const heartbeat = {
  schemaVersion: 1,
  mode: 'automation_pulse_heartbeat',
  goalId: pulse.goalId,
  goalStatus: pulse.goalStatus,
  generatedAt: pulse.generatedAt,
  snapshotHash: pulse.snapshotHash,
  requiresHumanDecision: Boolean(pulse.requiresHumanDecision),
  roleCoverage: pulse.roleCoverage.map(safeRole),
  counts: pulse.counts,
  verifying: Array.isArray(pulse.verifying) ? pulse.verifying : [],
  waiting: Array.isArray(pulse.waiting) ? pulse.waiting : [],
  inputGates: Array.isArray(pulse.inputGates) ? pulse.inputGates.map(safeGate) : [],
  teaserGate: {status: pulse.teaserGate.status, taskId: pulse.teaserGate.taskId, taskState: pulse.teaserGate.taskState},
};

await mkdir(dirname(destination), {recursive: true});
await writeFile(destination, `${JSON.stringify(heartbeat, null, 2)}\n`);
console.log(JSON.stringify({destination, goalId: heartbeat.goalId, generatedAt: heartbeat.generatedAt, snapshotHash: heartbeat.snapshotHash, inputGates: heartbeat.inputGates.length}));
