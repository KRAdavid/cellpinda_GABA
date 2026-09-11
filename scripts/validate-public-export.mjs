import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async relative => JSON.parse(await readFile(new URL(`../${relative}`, import.meta.url), 'utf8'));
const content = await readJson('public/data/content.json');
const master = await readJson('public/data/gaba-master-index.json');
const teaser = await readJson('data/teaser-manifest.json');
const teaserPreview = await readJson('public/data/teaser-preview.json');
const operationsQueue = await readJson('public/data/operations-queue.json');
const publicPulse = await readJson('public/data/tf-pulse.json');
const publicAudit = await readJson('public/data/goal-audit.json');
const meetingPacket = await readJson('public/data/tf-meeting-packet.json');
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

if (content.schemaVersion !== 1 || master.schemaVersion !== 1 || teaserPreview.schemaVersion !== 1 || operationsQueue.schemaVersion !== 1 || publicPulse.schemaVersion !== 1 || publicAudit.schemaVersion !== 1 || meetingPacket.schemaVersion !== 1) fail('unsupported schema');
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
scanKeys(teaserPreview);
scanKeys(operationsQueue);
scanKeys(publicPulse);
scanKeys(publicAudit);
scanKeys(meetingPacket);
if (/cellpinda\.co\.kr|cellpindamall\.com|공식몰/i.test(JSON.stringify(content))) fail('legacy official-mall destination leaked into public content');

if (operationsQueue.goalId !== 'GL-2026-CELL-GABA-001' || operationsQueue.status !== 'ACTIVE') fail('operations queue is not tied to the active Goal Contract');
const expectedMeetingProtocol = {cadence: goalContract.decisionProtocol?.cadence, quorum: goalContract.decisionProtocol?.quorum, record: goalContract.decisionProtocol?.record};
if (!expectedMeetingProtocol.cadence || !expectedMeetingProtocol.quorum || !Array.isArray(expectedMeetingProtocol.record) || expectedMeetingProtocol.record.length === 0) fail('Goal Contract meeting protocol is missing');
const expectedExecutionPolicy = {autoStates: ['READY'], autoRiskClasses: ['A_READ', 'B_INTERNAL_WRITE', 'C_LOW_RISK_INTERNAL'], humanReviewStates: ['VERIFYING', 'WAITING', 'BACKLOG', 'REWORK'], approvalRiskClasses: ['D_EXTERNAL_REVERSIBLE', 'E_EXTERNAL_COMMITMENT', 'F_LEGAL_IRREVERSIBLE'], note: '자동 파동은 내부 샌드박스 후보만 계속하고, 독립 검증·외부 행동·법적 약속은 사람 판단 전환점으로 보존한다.'};
if (!operationsQueue.pulse || !/^\d{4}-\d{2}-\d{2}T/.test(operationsQueue.pulse.generatedAt) || !/^[a-f0-9]{64}$/.test(operationsQueue.pulse.snapshotHash) || typeof operationsQueue.pulse.stateChanged !== 'boolean' || typeof operationsQueue.pulse.requiresHumanDecision !== 'boolean' || JSON.stringify(operationsQueue.pulse.meetingProtocol) !== JSON.stringify(expectedMeetingProtocol) || JSON.stringify(operationsQueue.pulse.executionPolicy) !== JSON.stringify(expectedExecutionPolicy) || operationsQueue.pulse.activeTasks !== taskGraph.tasks.filter(task => !['DONE', 'CANCELLED'].includes(task.state)).length || operationsQueue.pulse.inputGates !== taskGraph.tasks.filter(task => task.state === 'WAITING' || task.state === 'BACKLOG').length) fail('operations queue pulse summary is missing or out of sync');
if (publicPulse.mode !== 'public_tf_pulse' || publicPulse.goalId !== operationsQueue.goalId || publicPulse.goalStatus !== operationsQueue.status || publicPulse.generatedAt !== operationsQueue.pulse.generatedAt || publicPulse.snapshotHash !== operationsQueue.pulse.snapshotHash || publicPulse.stateChanged !== operationsQueue.pulse.stateChanged || typeof publicPulse.stateChanged !== 'boolean' || typeof publicPulse.requiresHumanDecision !== 'boolean' || JSON.stringify(publicPulse.meetingProtocol) !== JSON.stringify(expectedMeetingProtocol) || JSON.stringify(publicPulse.executionPolicy) !== JSON.stringify(expectedExecutionPolicy) || !Array.isArray(publicPulse.meetingAgenda) || !Array.isArray(publicPulse.inputGates)) fail('public TF pulse packet is missing or out of sync');
if (meetingPacket.mode !== 'public_tf_meeting_packet' || meetingPacket.goalId !== publicPulse.goalId || meetingPacket.goalStatus !== publicPulse.goalStatus || meetingPacket.generatedAt !== publicPulse.generatedAt || meetingPacket.snapshotHash !== publicPulse.snapshotHash || JSON.stringify(meetingPacket.meetingProtocol) !== JSON.stringify(publicPulse.meetingProtocol) || JSON.stringify(meetingPacket.executionPolicy) !== JSON.stringify(publicPulse.executionPolicy) || JSON.stringify(meetingPacket.roleCoverage) !== JSON.stringify(publicPulse.roleCoverage) || JSON.stringify(meetingPacket.continuation) !== JSON.stringify(publicPulse.continuation) || JSON.stringify(meetingPacket.agenda) !== JSON.stringify(publicPulse.meetingAgenda) || JSON.stringify(meetingPacket.inputGates) !== JSON.stringify(publicPulse.inputGates) || JSON.stringify(meetingPacket.gates) !== JSON.stringify(publicAudit.gates)) fail('public TF meeting packet is missing or out of sync');
if (publicPulse.inputGates.length !== operationsQueue.pulse.inputGates || publicPulse.meetingAgenda.length !== operationsQueue.pulse.activeTasks) fail('public TF pulse packet counts do not match the operations queue');
const requiredRoleCoverage = roleRegistry.roles.map(({id, label}) => ({id, label, status: 'present'}));
if (!Array.isArray(publicPulse.roleCoverage) || JSON.stringify(publicPulse.roleCoverage) !== JSON.stringify(requiredRoleCoverage)) fail('public TF pulse role coverage is missing or malformed');
if (!Array.isArray(operationsQueue.roleCoverage) || JSON.stringify(operationsQueue.roleCoverage) !== JSON.stringify(publicPulse.roleCoverage)) fail('operations queue role coverage is missing or out of sync');
if (publicAudit.mode !== 'public_goal_audit' || publicAudit.goalId !== goalContract.goalId || publicAudit.title !== goalContract.title || publicAudit.status !== goalContract.status || publicAudit.checkedAt !== goalContract.checkedAt) fail('public goal audit is not tied to the active Goal Contract');
if (!['IN_PROGRESS_WITH_GATES', 'COMPLETE'].includes(publicAudit.overallStatus)) fail('public goal audit has an unsupported overall status');
if (!Array.isArray(publicAudit.roleCoverage) || JSON.stringify(publicAudit.roleCoverage) !== JSON.stringify(requiredRoleCoverage)) fail('public goal audit role coverage is missing or malformed');
const expectedTeaserGateStatus = teaser.status === 'APPROVED' ? 'APPROVED' : 'HOLD';
if (!['HOLD', 'PREVIEW', 'APPROVED'].includes(teaser.status) || teaserPreview.status !== teaser.status || teaserPreview.placement !== teaser.placement || typeof teaserPreview.title !== 'string' || typeof teaserPreview.description !== 'string' || typeof teaserPreview.note !== 'string') fail('teaser preview export is missing or out of sync');
if (teaser.status === 'PREVIEW' && (!isHttps(teaserPreview.url) || teaserPreview.url !== teaser.publicPreviewUrl)) fail('PREVIEW teaser export must expose the approved preview URL only');
if (teaser.status !== 'PREVIEW' && teaserPreview.url !== null) fail('non-preview teaser export cannot expose a preview URL');
const requireExactKeys = (value, expected, label) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`${label} must be an object`);
  const actual = Object.keys(value).sort();
  const allowed = [...expected].sort();
  if (JSON.stringify(actual) !== JSON.stringify(allowed)) fail(`${label} contains an unexpected or missing field`);
};
const expectedDecisionOptionIds = state => state === 'VERIFYING' ? ['accept', 'rework'] : state === 'WAITING' || state === 'BACKLOG' ? ['hold', 'promote'] : state === 'READY' ? ['sandbox', 'hold'] : state === 'RUNNING' ? ['verify', 'retry'] : ['preserve', 'reopen'];
const approvalRiskClasses = new Set(expectedExecutionPolicy.approvalRiskClasses);
const expectedQuorum = task => approvalRiskClasses.has(task.risk)
  ? {minimum: 3, roles: [task.lead, task.verifier, 'TF 리드·AI 비서실'], rule: '책임자·독립 검증자·TF 리드 추가 확인'}
  : {minimum: 2, roles: [task.lead, task.verifier], rule: '실행 담당자·독립 검증자 확인'};
const validateQuorum = (value, task, label) => {
  requireExactKeys(value, ['minimum', 'roles', 'rule'], `${label} quorum`);
  if (!Number.isInteger(value.minimum) || !Array.isArray(value.roles) || value.roles.length !== value.minimum || value.roles.some(role => typeof role !== 'string' || role.trim().length < 2) || typeof value.rule !== 'string' || value.rule.trim().length < 8) fail(`${label} quorum is malformed`);
  if (JSON.stringify(value) !== JSON.stringify(expectedQuorum(task))) fail(`${label} quorum is out of sync`);
};
const validateDecisionOptions = (options, state, label) => {
  if (!Array.isArray(options) || options.length !== 2 || JSON.stringify(options.map(option => option?.id)) !== JSON.stringify(expectedDecisionOptionIds(state))) fail(`${label} decision options are missing or out of order`);
  for (const option of options) {
    requireExactKeys(option, ['id', 'label', 'criteria'], `${label} decision option`);
    if (typeof option.id !== 'string' || typeof option.label !== 'string' || !Array.isArray(option.criteria) || option.criteria.length < 2 || option.criteria.some(criteria => typeof criteria !== 'string' || criteria.trim().length < 4)) fail(`${label} decision option criteria are incomplete`);
  }
};
const validateContinuation = (value, label) => {
  if (!value || !['close', 'human-gate-monitor', 'continue-execution', 'reassess-next-cycle'].includes(value.mode) || value.cadenceHours !== 6 || !/^\d{4}-\d{2}-\d{2}T/.test(value.nextReviewAt || '') || typeof value.nextAction !== 'string' || value.nextAction.trim().length < 10) fail(`${label} continuation loop metadata is missing or malformed`);
};
const expectedSafeChecks = ['goal-contract', 'research-copy', 'teaser-boundary', 'sandbox-mvp', 'public-export', 'tf-pulse'];
const validateSafeExecution = (value, label) => {
  if (value === undefined) return;
  requireExactKeys(value, ['mode', 'status', 'validatedAt', 'executionBoundary', 'preparation', 'checks', 'candidateTaskIds', 'humanGateTaskIds'], `${label} safe execution`);
  if (value.mode !== 'safe_internal_tf_run' || value.status !== 'MET' || !/^\d{4}-\d{2}-\d{2}T/.test(value.validatedAt || '')) fail(`${label} safe execution identity is malformed`);
  requireExactKeys(value.executionBoundary, ['state', 'risk', 'externalEffects'], `${label} safe execution boundary`);
  if (value.executionBoundary.state !== 'READY' || value.executionBoundary.risk !== 'B_INTERNAL_WRITE' || value.executionBoundary.externalEffects !== false) fail(`${label} safe execution boundary is unsafe`);
  requireExactKeys(value.preparation, ['id', 'risk', 'status'], `${label} safe execution preparation`);
  if (value.preparation.id !== 'sync-public-data' || value.preparation.risk !== 'B_INTERNAL_WRITE' || value.preparation.status !== 'MET') fail(`${label} safe execution preparation is malformed`);
  if (!Array.isArray(value.checks) || JSON.stringify(value.checks.map(item => item?.id)) !== JSON.stringify(expectedSafeChecks)) fail(`${label} safe execution checks are incomplete`);
  for (const check of value.checks) {
    requireExactKeys(check, ['id', 'risk', 'status'], `${label} safe execution check`);
    if (check.risk !== 'A_READ' || check.status !== 'MET') fail(`${label} safe execution check is not read-only and successful`);
  }
  if (!Array.isArray(value.candidateTaskIds) || !Array.isArray(value.humanGateTaskIds)) fail(`${label} safe execution task lists are malformed`);
};
validateSafeExecution(operationsQueue.pulse?.safeExecution, 'operations queue pulse');
validateSafeExecution(publicPulse.safeExecution, 'public pulse');
if ((operationsQueue.pulse?.safeExecution === undefined) !== (publicPulse.safeExecution === undefined) || JSON.stringify(operationsQueue.pulse?.safeExecution) !== JSON.stringify(publicPulse.safeExecution)) fail('safe execution summary is out of sync between the operations queue and public pulse');
if (publicPulse.safeExecution) {
  const expectedHumanGates = publicPulse.meetingAgenda.filter(item => ['VERIFYING', 'WAITING', 'BACKLOG', 'REWORK'].includes(item.state)).map(item => item.taskId);
  const expectedCandidates = publicPulse.meetingAgenda.filter(item => item.state === 'READY').map(item => item.taskId);
  if (JSON.stringify(publicPulse.safeExecution.humanGateTaskIds) !== JSON.stringify(expectedHumanGates) || JSON.stringify(publicPulse.safeExecution.candidateTaskIds) !== JSON.stringify(expectedCandidates)) fail('public safe execution task lists are out of sync');
}
for (const [index, gate] of publicPulse.inputGates.entries()) {
  requireExactKeys(gate, ['taskId', 'state', 'chair', 'quorum', 'requiredInputs', 'nextAction'], `public pulse input gate ${index}`);
  const task = taskGraph.tasks.find(candidate => candidate.id === gate.taskId);
  if (!task) fail(`public pulse input gate ${gate.taskId} is not in the task graph`);
  validateQuorum(gate.quorum, task, `public pulse input gate ${gate.taskId}`);
}
for (const [index, agenda] of publicPulse.meetingAgenda.entries()) {
  requireExactKeys(agenda, ['taskId', 'state', 'chair', 'participants', 'quorum', 'question', 'decision', 'decisionOptions', 'requiredInputs', 'nextAction', 'mode'], `public pulse meeting agenda ${index}`);
  validateDecisionOptions(agenda.decisionOptions, agenda.state, `public pulse meeting agenda ${agenda.taskId}`);
  const task = taskGraph.tasks.find(candidate => candidate.id === agenda.taskId);
  if (!task) fail(`public pulse meeting agenda ${agenda.taskId} is not in the task graph`);
  validateQuorum(agenda.quorum, task, `public pulse meeting agenda ${agenda.taskId}`);
}
requireExactKeys(meetingPacket, ['schemaVersion', 'mode', 'goalId', 'goalStatus', 'generatedAt', 'snapshotHash', 'meetingProtocol', 'executionPolicy', 'roleCoverage', 'continuation', 'agenda', 'inputGates', 'gates', 'audit', 'note'], 'public TF meeting packet');
requireExactKeys(meetingPacket.meetingProtocol, ['cadence', 'quorum', 'record'], 'public TF meeting protocol');
if (typeof meetingPacket.meetingProtocol.cadence !== 'string' || typeof meetingPacket.meetingProtocol.quorum !== 'string' || !Array.isArray(meetingPacket.meetingProtocol.record) || meetingPacket.meetingProtocol.record.length === 0) fail('public TF meeting protocol is malformed');
requireExactKeys(meetingPacket.executionPolicy, ['autoStates', 'autoRiskClasses', 'humanReviewStates', 'approvalRiskClasses', 'note'], 'public TF execution policy');
if (JSON.stringify(meetingPacket.executionPolicy) !== JSON.stringify(expectedExecutionPolicy)) fail('public TF execution policy is missing or out of sync');
if (JSON.stringify(meetingPacket.audit) !== JSON.stringify({overallStatus: publicAudit.overallStatus, checkedAt: publicAudit.checkedAt, taskCounts: publicAudit.taskCounts, milestones: publicAudit.milestones, teaserGate: publicAudit.teaserGate})) fail('public TF meeting audit summary is out of sync');
validateContinuation(operationsQueue.pulse.continuation, 'operations queue pulse');
validateContinuation(publicPulse.continuation, 'public pulse');
if (JSON.stringify(operationsQueue.pulse.continuation) !== JSON.stringify(publicPulse.continuation)) fail('operations queue and public pulse continuation loops differ');
if (!publicPulse.counts || typeof publicPulse.counts !== 'object' || Object.values(publicPulse.counts).reduce((sum, count) => sum + count, 0) !== taskGraph.tasks.length) fail('public TF pulse state counts do not cover the task graph');
for (const state of taskGraph.stateMachine) if (publicPulse.counts[state] !== taskGraph.tasks.filter(task => task.state === state).length) fail(`public TF pulse count is out of sync for ${state}`);
if (!publicAudit.taskCounts || typeof publicAudit.taskCounts !== 'object') fail('public goal audit task counts are missing');
for (const state of taskGraph.stateMachine) if (publicAudit.taskCounts[state] !== taskGraph.tasks.filter(task => task.state === state).length) fail(`public goal audit count is out of sync for ${state}`);
if (JSON.stringify(publicAudit.taskCounts) !== JSON.stringify(publicPulse.counts)) fail('public goal audit and TF pulse counts differ');
validateSafeExecution(publicAudit.milestones?.tfPulse?.safeExecution, 'public audit pulse');
if (JSON.stringify(publicAudit.milestones?.tfPulse?.safeExecution) !== JSON.stringify(publicPulse.safeExecution)) fail('public audit safe execution summary is out of sync');
if (!publicAudit.milestones || publicAudit.milestones.masterIndex?.status !== 'MET' || publicAudit.milestones.masterIndex.claims !== content.claims.length || publicAudit.milestones.masterIndex.researchRecords !== master.records.length || publicAudit.milestones.publicProduct?.status !== 'MET' || publicAudit.milestones.publicProduct.products !== content.products.length || publicAudit.milestones.publicProduct.smartStoreOnly !== true || publicAudit.milestones.publicProduct.removed750 !== true || publicAudit.milestones.tfPulse?.status !== 'MET' || publicAudit.milestones.tfPulse.generatedAt !== publicPulse.generatedAt || publicAudit.milestones.tfPulse.snapshotHash !== publicPulse.snapshotHash || publicAudit.milestones.tfPulse.stateChanged !== publicPulse.stateChanged || typeof publicAudit.milestones.tfPulse.stateChanged !== 'boolean' || publicAudit.milestones.tfPulse.requiresHumanDecision !== publicPulse.requiresHumanDecision || JSON.stringify(publicAudit.milestones.tfPulse.continuation) !== JSON.stringify(publicPulse.continuation)) fail('public goal audit milestones are missing or out of sync');
validateContinuation(publicAudit.milestones.tfPulse.continuation, 'public audit pulse');
const publicGatedTasks = taskGraph.tasks.filter(task => ['VERIFYING', 'WAITING', 'BACKLOG'].includes(task.state));
if (!Array.isArray(publicAudit.gates) || publicAudit.gates.length !== publicGatedTasks.length) fail('public goal audit gates do not match the task graph');
const expectedGateKeys = ['id', 'title', 'state', 'lead', 'verifier', 'requiredInputs', 'decision', 'decisionMode', 'nextAction', 'decisionOptions', 'quorum'];
for (const [index, gate] of publicAudit.gates.entries()) {
  requireExactKeys(gate, expectedGateKeys, `public goal audit gate ${index}`);
  const task = taskGraph.tasks.find(candidate => candidate.id === gate.id);
  const agenda = publicPulse.meetingAgenda.find(candidate => candidate.taskId === gate.id);
  validateDecisionOptions(gate.decisionOptions, gate.state, `public goal audit gate ${gate.id}`);
  if (!task || !agenda || task.title !== gate.title || task.state !== gate.state || task.lead !== gate.lead || task.verifier !== gate.verifier || JSON.stringify(task.requiredInputs || []) !== JSON.stringify(gate.requiredInputs) || !gate.decision || !gate.decisionMode || !gate.nextAction || JSON.stringify(gate.decisionOptions) !== JSON.stringify(agenda.decisionOptions) || JSON.stringify(gate.quorum) !== JSON.stringify(agenda.quorum)) fail(`public goal audit gate ${gate.id ?? '(unknown)'} is missing or out of sync`);
  validateQuorum(gate.quorum, task, `public goal audit gate ${gate.id}`);
}
if (publicAudit.teaserGate?.taskId !== 'B4' || publicAudit.teaserGate.taskState !== taskGraph.tasks.find(task => task.id === 'B4')?.state || publicAudit.teaserGate.status !== expectedTeaserGateStatus) fail('public goal audit teaser gate is missing or out of sync');
if (!Array.isArray(operationsQueue.workstreams) || operationsQueue.workstreams.length !== 5) fail('operations queue must expose five active workstreams');
if (!Array.isArray(operationsQueue.tasks) || operationsQueue.tasks.length !== taskGraph.tasks.length) fail('operations queue must expose the current task graph');
const queueIds = new Set();
const graphIds = new Set(taskGraph.tasks.map(task => task.id));
const expectedDecisionMode = state => state === 'VERIFYING' ? 'independent-review' : state === 'WAITING' || state === 'BACKLOG' ? 'input-gate' : state === 'READY' ? 'sandbox-execution' : state === 'RUNNING' ? 'execution-tracking' : 'state-preservation';
for (const task of operationsQueue.tasks) {
  if (queueIds.has(task.id)) fail(`operations queue contains duplicate task ${task.id}`);
  queueIds.add(task.id);
  if (!task.id || !task.stream || !task.title || !task.state || !task.lead || !task.verifier || task.lead === task.verifier || !task.decision || !task.decisionMode || !task.nextAction || !Array.isArray(task.dependencies)) fail(`operations queue task ${task.id ?? '(unknown)'} is incomplete or non-independent`);
  validateQuorum(task.quorum, taskGraph.tasks.find(candidate => candidate.id === task.id), `operations queue task ${task.id}`);
  if (!['BACKLOG', 'READY', 'RUNNING', 'VERIFYING', 'WAITING', 'EXPIRED', 'RETRY', 'REWORK', 'DONE', 'FAILED', 'CANCELLED'].includes(task.state)) fail(`operations queue task ${task.id} has an unsupported state`);
  if (task.decisionMode !== expectedDecisionMode(task.state)) fail(`operations queue task ${task.id} has a decision mode that does not match ${task.state}`);
  if (['DONE', 'CANCELLED'].includes(task.state)) {
    if (!Array.isArray(task.decisionOptions) || task.decisionOptions.length !== 0) fail(`operations queue task ${task.id} must not expose active decision options`);
  } else {
    validateDecisionOptions(task.decisionOptions, task.state, `operations queue task ${task.id}`);
    const agenda = publicPulse.meetingAgenda.find(candidate => candidate.taskId === task.id);
    if (!agenda || JSON.stringify(task.decisionOptions) !== JSON.stringify(agenda.decisionOptions)) fail(`operations queue task ${task.id} decision options are out of sync with the public pulse`);
  }
  if (['WAITING', 'BACKLOG'].includes(task.state) && (!Array.isArray(task.requiredInputs) || task.requiredInputs.length === 0 || task.requiredInputs.some(input => typeof input !== 'string' || input.trim().length < 2))) fail(`operations queue input gate ${task.id} is missing required inputs`);
}
if (queueIds.size !== graphIds.size || [...graphIds].some(id => !queueIds.has(id))) fail('operations queue task ids do not match the current task graph');

const claimsById = new Map(content.claims.map(claim => [claim.id, claim]));
for (const claim of content.claims) {
  if (claim.status !== 'approved' || !claim.publicText || !/^\d{4}-\d{2}-\d{2}$/.test(claim.reviewedAt) || !/^[a-f0-9]{64}$/.test(claim.evidenceHash)) fail(`claim ${claim.id} is not provenance-complete`);
  if (!Array.isArray(claim.sources) || claim.sources.length === 0 || claim.sources.some(source => !isHttps(source.url))) fail(`claim ${claim.id} has a non-HTTPS source`);
  if (claim.id.startsWith('research-') && ('result' in (claim.metadata || {}) || 'limitations' in claim || 'limitations' in (claim.metadata || {}))) fail(`research claim ${claim.id} exposes internal result or limitation fields`);
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
for (const claim of content.claims.filter(item => ['product-1500', 'fermentation-listed'].includes(item.id))) {
  if (!claim.sources.every(source => isSmartStore(source.url))) fail(`public product claim ${claim.id} must use the Smart Store source only`);
}
const hasRemoved750 = content.products.some(item => item.id === 'gaba750' || Number(item.amountMg) === 750 || String(item.name || '').includes('750'));
if (hasRemoved750) fail('removed 750 product returned to public export');

if (content.reviews.length !== 1 || content.reviews[0].id !== 'shop-review-destination-1500' || !isSmartStore(content.reviews[0].sourceUrl)) fail('review destination is not the approved Smart Store 1500 destination');
for (const record of master.records) {
  const claim = claimsById.get(record.id);
  if (!claim || claim.evidenceHash !== record.evidenceHash || claim.reviewedAt !== record.reviewedAt) fail(`master provenance mismatch for ${record.id}`);
  if (!String(record.id).startsWith('research-')) fail(`non-research record exported: ${record.id}`);
  if ('result' in record || 'limitations' in record) fail(`research master record ${record.id} exposes internal result or limitation fields`);
}

console.log(JSON.stringify({
  claims: content.claims.length,
  masterRecords: master.records.length,
  products: content.products.length,
  reviews: content.reviews.length,
  teaser: {status: teaser.status, gateStatus: expectedTeaserGateStatus, preview: Boolean(teaserPreview.url)},
  coverage,
  smartStoreOnly: true,
  removed750: true,
  provenance: 'matched',
}));
