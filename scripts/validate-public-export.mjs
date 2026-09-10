import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async relative => JSON.parse(await readFile(new URL(`../${relative}`, import.meta.url), 'utf8'));
const content = await readJson('public/data/content.json');
const master = await readJson('public/data/gaba-master-index.json');
const operationsQueue = await readJson('public/data/operations-queue.json');
const publicPulse = await readJson('public/data/tf-pulse.json');
const publicAudit = await readJson('public/data/goal-audit.json');
const taskGraph = await readJson('data/task-graph.json');
const roleRegistry = await readJson('data/tf-role-registry.json');
const goalContract = await readJson('data/goal-contract.json');
const fail = message => { throw new Error(`Public export invalid: ${message}`); };
const isHttps = value => {
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
};
const isSmartStore = value => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'smartstore.naver.com' && ['/cellpinda', '/cellpinda/'].includes(url.pathname);
  } catch { return false; }
};

if (content.schemaVersion !== 1 || master.schemaVersion !== 1 || operationsQueue.schemaVersion !== 1 || publicPulse.schemaVersion !== 1 || publicAudit.schemaVersion !== 1) fail('unsupported schema');
if (!Array.isArray(content.claims) || content.claims.length === 0) fail('claims are required');
if (!Array.isArray(master.records) || master.records.length === 0) fail('master records are required');
if (master.records.length !== content.claims.filter(claim => String(claim.id).startsWith('research-')).length) fail('research and master counts differ');

const forbiddenKeys = /^(original|rightsEvidence|rightsScope|privatePath|customer|email|phone|answers|token|operatorToken|adminToken)$/i;
const scanKeys = (value, path = '$') => {
  if (Array.isArray(value)) return value.forEach((item, index) => scanKeys(item, `${path}[${index}]`));
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.test(key)) fail(`private field exported at ${path}.${key}`);
    scanKeys(child, `${path}.${key}`);
  }
};
scanKeys(content);
scanKeys(master);
scanKeys(operationsQueue);
scanKeys(publicPulse);
scanKeys(publicAudit);

if (operationsQueue.goalId !== 'GL-2026-CELL-GABA-001' || operationsQueue.status !== 'ACTIVE') fail('operations queue is not tied to the active Goal Contract');
if (!operationsQueue.pulse || !/^\d{4}-\d{2}-\d{2}T/.test(operationsQueue.pulse.generatedAt) || !/^[a-f0-9]{64}$/.test(operationsQueue.pulse.snapshotHash) || typeof operationsQueue.pulse.stateChanged !== 'boolean' || typeof operationsQueue.pulse.requiresHumanDecision !== 'boolean' || operationsQueue.pulse.activeTasks !== taskGraph.tasks.filter(task => !['DONE', 'CANCELLED'].includes(task.state)).length || operationsQueue.pulse.inputGates !== taskGraph.tasks.filter(task => task.state === 'WAITING' || task.state === 'BACKLOG').length) fail('operations queue pulse summary is missing or out of sync');
if (publicPulse.mode !== 'public_tf_pulse' || publicPulse.goalId !== operationsQueue.goalId || publicPulse.goalStatus !== operationsQueue.status || publicPulse.generatedAt !== operationsQueue.pulse.generatedAt || publicPulse.snapshotHash !== operationsQueue.pulse.snapshotHash || publicPulse.stateChanged !== operationsQueue.pulse.stateChanged || typeof publicPulse.stateChanged !== 'boolean' || typeof publicPulse.requiresHumanDecision !== 'boolean' || !Array.isArray(publicPulse.meetingAgenda) || !Array.isArray(publicPulse.inputGates)) fail('public TF pulse packet is missing or out of sync');
if (publicPulse.inputGates.length !== operationsQueue.pulse.inputGates || publicPulse.meetingAgenda.length !== operationsQueue.pulse.activeTasks) fail('public TF pulse packet counts do not match the operations queue');
const requiredRoleCoverage = roleRegistry.roles.map(({id, label}) => ({id, label, status: 'present'}));
if (!Array.isArray(publicPulse.roleCoverage) || JSON.stringify(publicPulse.roleCoverage) !== JSON.stringify(requiredRoleCoverage)) fail('public TF pulse role coverage is missing or malformed');
if (!Array.isArray(operationsQueue.roleCoverage) || JSON.stringify(operationsQueue.roleCoverage) !== JSON.stringify(publicPulse.roleCoverage)) fail('operations queue role coverage is missing or out of sync');
if (publicAudit.mode !== 'public_goal_audit' || publicAudit.goalId !== goalContract.goalId || publicAudit.title !== goalContract.title || publicAudit.status !== goalContract.status || publicAudit.checkedAt !== goalContract.checkedAt) fail('public goal audit is not tied to the active Goal Contract');
if (!['IN_PROGRESS_WITH_GATES', 'COMPLETE'].includes(publicAudit.overallStatus)) fail('public goal audit has an unsupported overall status');
if (!Array.isArray(publicAudit.roleCoverage) || JSON.stringify(publicAudit.roleCoverage) !== JSON.stringify(requiredRoleCoverage)) fail('public goal audit role coverage is missing or malformed');
const requireExactKeys = (value, expected, label) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`${label} must be an object`);
  const actual = Object.keys(value).sort();
  const allowed = [...expected].sort();
  if (JSON.stringify(actual) !== JSON.stringify(allowed)) fail(`${label} contains an unexpected or missing field`);
};
for (const [index, gate] of publicPulse.inputGates.entries()) requireExactKeys(gate, ['taskId', 'state', 'chair', 'requiredInputs', 'nextAction'], `public pulse input gate ${index}`);
for (const [index, agenda] of publicPulse.meetingAgenda.entries()) requireExactKeys(agenda, ['taskId', 'state', 'chair', 'participants', 'question', 'decision', 'requiredInputs', 'nextAction', 'mode'], `public pulse meeting agenda ${index}`);
if (!publicPulse.counts || typeof publicPulse.counts !== 'object' || Object.values(publicPulse.counts).reduce((sum, count) => sum + count, 0) !== taskGraph.tasks.length) fail('public TF pulse state counts do not cover the task graph');
for (const state of taskGraph.stateMachine) if (publicPulse.counts[state] !== taskGraph.tasks.filter(task => task.state === state).length) fail(`public TF pulse count is out of sync for ${state}`);
if (!publicAudit.taskCounts || typeof publicAudit.taskCounts !== 'object') fail('public goal audit task counts are missing');
for (const state of taskGraph.stateMachine) if (publicAudit.taskCounts[state] !== taskGraph.tasks.filter(task => task.state === state).length) fail(`public goal audit count is out of sync for ${state}`);
if (JSON.stringify(publicAudit.taskCounts) !== JSON.stringify(publicPulse.counts)) fail('public goal audit and TF pulse counts differ');
if (!publicAudit.milestones || publicAudit.milestones.masterIndex?.status !== 'MET' || publicAudit.milestones.masterIndex.claims !== content.claims.length || publicAudit.milestones.masterIndex.researchRecords !== master.records.length || publicAudit.milestones.publicProduct?.status !== 'MET' || publicAudit.milestones.publicProduct.products !== content.products.length || publicAudit.milestones.publicProduct.smartStoreOnly !== true || publicAudit.milestones.publicProduct.removed750 !== true || publicAudit.milestones.tfPulse?.status !== 'MET' || publicAudit.milestones.tfPulse.generatedAt !== publicPulse.generatedAt || publicAudit.milestones.tfPulse.snapshotHash !== publicPulse.snapshotHash || publicAudit.milestones.tfPulse.stateChanged !== publicPulse.stateChanged || typeof publicAudit.milestones.tfPulse.stateChanged !== 'boolean' || publicAudit.milestones.tfPulse.requiresHumanDecision !== publicPulse.requiresHumanDecision) fail('public goal audit milestones are missing or out of sync');
const publicGatedTasks = taskGraph.tasks.filter(task => ['VERIFYING', 'WAITING', 'BACKLOG'].includes(task.state));
if (!Array.isArray(publicAudit.gates) || publicAudit.gates.length !== publicGatedTasks.length) fail('public goal audit gates do not match the task graph');
const expectedGateKeys = ['id', 'title', 'state', 'lead', 'verifier', 'requiredInputs', 'decision', 'decisionMode', 'nextAction'];
for (const [index, gate] of publicAudit.gates.entries()) {
  requireExactKeys(gate, expectedGateKeys, `public goal audit gate ${index}`);
  const task = taskGraph.tasks.find(candidate => candidate.id === gate.id);
  if (!task || task.title !== gate.title || task.state !== gate.state || task.lead !== gate.lead || task.verifier !== gate.verifier || JSON.stringify(task.requiredInputs || []) !== JSON.stringify(gate.requiredInputs) || !gate.decision || !gate.decisionMode || !gate.nextAction) fail(`public goal audit gate ${gate.id ?? '(unknown)'} is missing or out of sync`);
}
if (publicAudit.teaserGate?.taskId !== 'B4' || publicAudit.teaserGate.taskState !== taskGraph.tasks.find(task => task.id === 'B4')?.state || publicAudit.teaserGate.status !== 'HOLD') fail('public goal audit teaser gate is missing or out of sync');
if (!Array.isArray(operationsQueue.workstreams) || operationsQueue.workstreams.length !== 5) fail('operations queue must expose five active workstreams');
if (!Array.isArray(operationsQueue.tasks) || operationsQueue.tasks.length !== taskGraph.tasks.length) fail('operations queue must expose the current task graph');
const queueIds = new Set();
const graphIds = new Set(taskGraph.tasks.map(task => task.id));
const expectedDecisionMode = state => state === 'VERIFYING' ? 'independent-review' : state === 'WAITING' || state === 'BACKLOG' ? 'input-gate' : state === 'READY' ? 'sandbox-execution' : state === 'RUNNING' ? 'execution-tracking' : 'state-preservation';
for (const task of operationsQueue.tasks) {
  if (queueIds.has(task.id)) fail(`operations queue contains duplicate task ${task.id}`);
  queueIds.add(task.id);
  if (!task.id || !task.stream || !task.title || !task.state || !task.lead || !task.verifier || task.lead === task.verifier || !task.decision || !task.decisionMode || !task.nextAction || !Array.isArray(task.dependencies)) fail(`operations queue task ${task.id ?? '(unknown)'} is incomplete or non-independent`);
  if (!['BACKLOG', 'READY', 'RUNNING', 'VERIFYING', 'WAITING', 'EXPIRED', 'RETRY', 'REWORK', 'DONE', 'FAILED', 'CANCELLED'].includes(task.state)) fail(`operations queue task ${task.id} has an unsupported state`);
  if (task.decisionMode !== expectedDecisionMode(task.state)) fail(`operations queue task ${task.id} has a decision mode that does not match ${task.state}`);
  if (['WAITING', 'BACKLOG'].includes(task.state) && (!Array.isArray(task.requiredInputs) || task.requiredInputs.length === 0 || task.requiredInputs.some(input => typeof input !== 'string' || input.trim().length < 2))) fail(`operations queue input gate ${task.id} is missing required inputs`);
}
if (queueIds.size !== graphIds.size || [...graphIds].some(id => !queueIds.has(id))) fail('operations queue task ids do not match the current task graph');

const claimsById = new Map(content.claims.map(claim => [claim.id, claim]));
for (const claim of content.claims) {
  if (claim.status !== 'approved' || !claim.publicText || !/^\d{4}-\d{2}-\d{2}$/.test(claim.reviewedAt) || !/^[a-f0-9]{64}$/.test(claim.evidenceHash)) fail(`claim ${claim.id} is not provenance-complete`);
  if (!Array.isArray(claim.sources) || claim.sources.length === 0 || claim.sources.some(source => !isHttps(source.url))) fail(`claim ${claim.id} has a non-HTTPS source`);
}

const recordsById = new Map(master.records.map(record => [record.id, record]));
const coverage = {
  stress: ['research-yoto-2012'],
  sleep: ['research-byun-2018', 'research-yamatsu-2016'],
  growthHormone: ['research-powers-2008'],
  muscleDevelopment: ['research-sakashita-2019'],
};
for (const [topic, ids] of Object.entries(coverage)) {
  if (!ids.some(id => recordsById.has(id))) fail(`required ${topic} research is missing`);
}

if (content.products.length !== 1) fail(`expected one approved product, found ${content.products.length}`);
const product = content.products[0];
if (product.id !== 'gaba1500' || product.amountMg !== 1500 || product.servings !== 30 || !isSmartStore(product.officialUrl)) fail('the public product must be the Smart Store 1500 mapping');
if (JSON.stringify(content.products).includes('750') || JSON.stringify(master.records).includes('750')) fail('removed 750 product returned to public export');

if (content.reviews.length !== 1 || content.reviews[0].id !== 'shop-review-destination-1500' || !isSmartStore(content.reviews[0].sourceUrl)) fail('review destination is not the approved Smart Store 1500 destination');
for (const record of master.records) {
  const claim = claimsById.get(record.id);
  if (!claim || claim.evidenceHash !== record.evidenceHash || claim.reviewedAt !== record.reviewedAt) fail(`master provenance mismatch for ${record.id}`);
  if (!String(record.id).startsWith('research-')) fail(`non-research record exported: ${record.id}`);
}

console.log(JSON.stringify({
  claims: content.claims.length,
  masterRecords: master.records.length,
  products: content.products.length,
  reviews: content.reviews.length,
  coverage,
  smartStoreOnly: true,
  removed750: true,
  provenance: 'matched',
}));
