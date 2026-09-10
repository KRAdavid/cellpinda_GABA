import assert from 'node:assert/strict';

const cliBase = process.argv.slice(2).find(value => /^https:\/\//.test(value)) || '';
const base = (process.env.PUBLIC_SITE_URL || cliBase).replace(/\/$/, '');
if (!/^https:\/\//.test(base)) throw new Error('PUBLIC_SITE_URL must be an HTTPS URL');

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const isSmartStore = value => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'smartstore.naver.com' && ['/cellpinda', '/cellpinda/'].includes(url.pathname);
  } catch { return false; }
};
const expectedDecisionOptionIds = state => state === 'VERIFYING' ? ['accept', 'rework'] : state === 'WAITING' || state === 'BACKLOG' ? ['hold', 'promote'] : state === 'READY' ? ['sandbox', 'hold'] : state === 'RUNNING' ? ['verify', 'retry'] : ['preserve', 'reopen'];
const validateDecisionOptions = (options, state, label) => {
  assert.ok(Array.isArray(options) && options.length === 2, `${label} must expose two decision options`);
  assert.deepEqual(options.map(option => option?.id), expectedDecisionOptionIds(state), `${label} decision option order is invalid`);
  for (const option of options) {
    assert.deepEqual(Object.keys(option).sort(), ['id', 'label', 'criteria'].sort(), `${label} decision option fields are invalid`);
    assert.equal(typeof option.id, 'string', `${label} decision option id is invalid`);
    assert.equal(typeof option.label, 'string', `${label} decision option label is invalid`);
    assert.ok(Array.isArray(option.criteria) && option.criteria.length >= 2 && option.criteria.every(criteria => typeof criteria === 'string' && criteria.trim().length >= 4), `${label} decision option criteria are incomplete`);
  }
};
const request = async path => {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${base}${path}${separator}release-smoke=1`);
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return response;
};

let lastError;
for (let attempt = 1; attempt <= 12; attempt += 1) {
  try {
    const [page, contentResponse, masterResponse, queueResponse, pulseResponse, auditResponse] = await Promise.all([
      request('/?view=ops'),
      request('/data/content.json'),
      request('/data/gaba-master-index.json'),
      request('/data/operations-queue.json'),
      request('/data/tf-pulse.json'),
      request('/data/goal-audit.json'),
    ]);
    const [pageText, content, master, queue, publicPulse, publicAudit] = await Promise.all([page.text(), contentResponse.json(), masterResponse.json(), queueResponse.json(), pulseResponse.json(), auditResponse.json()]);
    assert.match(pageText, /Cellpinda|GABA/i, 'public page does not contain the site shell');
    assert.equal(content.products.length, 1, 'live export must contain one product');
    assert.equal(content.products[0].id, 'gaba1500', 'live export product must be gaba1500');
    assert.equal(content.products[0].officialUrl, 'https://smartstore.naver.com/cellpinda', 'live product must point to Smart Store');
    assert.ok(!/cellpinda\.co\.kr|cellpindamall\.com|공식몰/i.test(JSON.stringify(content)), 'live public content contains a legacy official-mall destination');
    for (const claim of content.claims.filter(item => ['product-1500', 'fermentation-listed'].includes(item.id))) assert.ok(claim.sources?.every(source => isSmartStore(source.url)), `live product claim ${claim.id} must use the Smart Store source only`);
    assert.ok(!JSON.stringify(content.products).includes('750'), 'live export contains removed 750 product');
    assert.equal(master.records.length, 8, 'live master index must contain eight research records');
    assert.equal(queue.goalId, 'GL-2026-CELL-GABA-001', 'live operations queue must use the active Goal Contract');
    assert.equal(queue.workstreams.length, 5, 'live operations queue must contain five workstreams');
    assert.equal(queue.tasks.length, 13, 'live operations queue must contain the current task graph');
    assert.ok(queue.pulse && /^[a-f0-9]{64}$/.test(queue.pulse.snapshotHash) && typeof queue.pulse.stateChanged === 'boolean', 'live operations queue must expose a valid pulse snapshot');
    assert.equal(queue.pulse.activeTasks, queue.tasks.filter(task => !['DONE', 'CANCELLED'].includes(task.state)).length, 'live pulse active count must match queue');
    assert.equal(queue.pulse.inputGates, queue.tasks.filter(task => task.state === 'WAITING' || task.state === 'BACKLOG').length, 'live pulse input gate count must match queue');
    assert.equal(publicPulse.mode, 'public_tf_pulse', 'live public TF pulse packet must use the public schema');
    assert.equal(publicPulse.goalId, queue.goalId, 'live public TF pulse packet must use the active goal');
    assert.equal(publicPulse.generatedAt, queue.pulse.generatedAt, 'live public TF pulse packet timestamp must match the queue');
    assert.equal(publicPulse.snapshotHash, queue.pulse.snapshotHash, 'live public TF pulse packet hash must match the queue');
    assert.equal(publicPulse.stateChanged, queue.pulse.stateChanged, 'live public TF pulse change marker must match the queue');
    assert.equal(publicAudit.mode, 'public_goal_audit', 'live public goal audit packet must use the public schema');
    assert.equal(publicAudit.goalId, queue.goalId, 'live public goal audit packet must use the active goal');
    assert.equal(publicAudit.status, queue.status, 'live public goal audit status must match the queue');
    assert.equal(publicAudit.checkedAt, queue.checkedAt, 'live public goal audit timestamp must match the queue');
    assert.deepEqual(publicAudit.roleCoverage, publicPulse.roleCoverage, 'live public goal audit role coverage must match the pulse');
    assert.deepEqual(publicAudit.taskCounts, publicPulse.counts, 'live public goal audit counts must match the pulse');
    assert.equal(publicAudit.milestones.masterIndex.claims, content.claims.length, 'live public audit claim count must match content');
    assert.equal(publicAudit.milestones.masterIndex.researchRecords, master.records.length, 'live public audit research count must match master index');
    assert.equal(publicAudit.milestones.publicProduct.products, content.products.length, 'live public audit product count must match content');
    assert.equal(publicAudit.milestones.tfPulse.snapshotHash, publicPulse.snapshotHash, 'live public audit pulse hash must match the pulse');
    assert.equal(publicAudit.milestones.tfPulse.stateChanged, publicPulse.stateChanged, 'live public audit pulse change marker must match the pulse');
    assert.ok(['IN_PROGRESS_WITH_GATES', 'COMPLETE'].includes(publicAudit.overallStatus), 'live public audit must expose a supported overall status');
    assert.equal(publicAudit.milestones.masterIndex.status, 'MET', 'live public audit must mark the master index milestone');
    assert.equal(publicAudit.milestones.publicProduct.status, 'MET', 'live public audit must mark the product milestone');
    assert.equal(publicAudit.milestones.publicProduct.smartStoreOnly, true, 'live public audit must keep Smart Store only');
    assert.equal(publicAudit.milestones.publicProduct.removed750, true, 'live public audit must keep 750 removed');
    assert.equal(publicAudit.milestones.tfPulse.status, 'MET', 'live public audit must mark the pulse milestone');
    assert.equal(publicAudit.teaserGate.taskId, 'B4', 'live public audit must expose the teaser gate');
    assert.equal(publicAudit.teaserGate.status, 'HOLD', 'live public audit must keep the teaser on hold');
    assert.equal(publicAudit.teaserGate.taskState, queue.tasks.find(task => task.id === 'B4')?.state, 'live public audit teaser state must match the queue');
    const auditGateKeys = ['id', 'title', 'state', 'lead', 'verifier', 'requiredInputs', 'decision', 'decisionMode', 'nextAction', 'decisionOptions'];
    const liveGatedTasks = queue.tasks.filter(task => ['VERIFYING', 'WAITING', 'BACKLOG'].includes(task.state));
    assert.ok(Array.isArray(publicAudit.gates) && publicAudit.gates.length === liveGatedTasks.length, 'live public audit gate count must match the queue');
    for (const gate of publicAudit.gates) {
      assert.deepEqual(Object.keys(gate).sort(), [...auditGateKeys].sort(), 'live public audit gate contains an unexpected field');
      const queueTask = queue.tasks.find(task => task.id === gate.id);
      assert.ok(queueTask, `live public audit gate is missing queue task ${gate.id}`);
      assert.equal(gate.title, queueTask.title, `live public audit title mismatch for ${gate.id}`);
      assert.equal(gate.state, queueTask.state, `live public audit state mismatch for ${gate.id}`);
      assert.equal(gate.lead, queueTask.lead, `live public audit lead mismatch for ${gate.id}`);
      assert.equal(gate.verifier, queueTask.verifier, `live public audit verifier mismatch for ${gate.id}`);
      assert.deepEqual(gate.requiredInputs, queueTask.requiredInputs ?? [], `live public audit inputs mismatch for ${gate.id}`);
      assert.equal(gate.decision, queueTask.decision, `live public audit decision mismatch for ${gate.id}`);
      assert.equal(gate.decisionMode, queueTask.decisionMode, `live public audit decision mode mismatch for ${gate.id}`);
      assert.equal(gate.nextAction, queueTask.nextAction, `live public audit next action mismatch for ${gate.id}`);
      validateDecisionOptions(gate.decisionOptions, gate.state, `live public audit gate ${gate.id}`);
      const agenda = publicPulse.meetingAgenda.find(candidate => candidate.taskId === gate.id);
      assert.ok(agenda, `live public audit gate is missing pulse agenda ${gate.id}`);
      assert.deepEqual(gate.decisionOptions, agenda.decisionOptions, `live public audit decision options mismatch for ${gate.id}`);
    }
    assert.equal(publicPulse.meetingAgenda.length, queue.pulse.activeTasks, 'live public TF pulse agenda count must match the queue');
    assert.equal(publicPulse.inputGates.length, queue.pulse.inputGates, 'live public TF pulse gate count must match the queue');
    assert.ok(Array.isArray(queue.roleCoverage) && queue.roleCoverage.length === 6, 'live operations queue role coverage is missing');
    assert.deepEqual(queue.roleCoverage, publicPulse.roleCoverage, 'live operations queue role coverage must match the pulse');
    const publicPulseKeys = {
      inputGate: ['taskId', 'state', 'chair', 'requiredInputs', 'nextAction'],
      meetingAgenda: ['taskId', 'state', 'chair', 'participants', 'question', 'decision', 'decisionOptions', 'requiredInputs', 'nextAction', 'mode'],
    };
    assert.ok(Array.isArray(publicPulse.roleCoverage) && publicPulse.roleCoverage.length === 6, 'live public TF pulse role coverage is missing');
    assert.deepEqual(publicPulse.roleCoverage.map(role => role.id), ['consumer', 'evidence', 'product-review', 'story-ux', 'commerce-data', 'quality-audit'], 'live public TF pulse role coverage is out of order');
    assert.ok(publicPulse.roleCoverage.every(role => role.status === 'present' && typeof role.label === 'string'), 'live public TF pulse role coverage is malformed');
    for (const gate of publicPulse.inputGates) assert.deepEqual(Object.keys(gate).sort(), [...publicPulseKeys.inputGate].sort(), 'live public TF pulse input gate contains an unexpected field');
    for (const agenda of publicPulse.meetingAgenda) { assert.deepEqual(Object.keys(agenda).sort(), [...publicPulseKeys.meetingAgenda].sort(), 'live public TF pulse agenda contains an unexpected field'); validateDecisionOptions(agenda.decisionOptions, agenda.state, `live public TF pulse agenda ${agenda.taskId}`); }
    assert.ok(publicPulse.counts && Object.values(publicPulse.counts).reduce((sum, count) => sum + count, 0) === queue.tasks.length, 'live public TF pulse counts must cover the queue');
    for (const state of ['BACKLOG', 'READY', 'RUNNING', 'VERIFYING', 'WAITING', 'EXPIRED', 'RETRY', 'REWORK', 'DONE', 'FAILED', 'CANCELLED']) assert.equal(publicPulse.counts[state], queue.tasks.filter(task => task.state === state).length, `live public TF pulse count mismatch for ${state}`);
    const queueIds = new Set(queue.tasks.map(task => task.id));
    assert.equal(queueIds.size, queue.tasks.length, 'live operations queue contains duplicate task ids');
    for (const task of queue.tasks) {
      assert.ok(['BACKLOG', 'READY', 'RUNNING', 'VERIFYING', 'WAITING', 'EXPIRED', 'RETRY', 'REWORK', 'DONE', 'FAILED', 'CANCELLED'].includes(task.state), `live operations queue has an unsupported state for ${task.id}`);
      assert.ok(task.lead && task.verifier && task.lead !== task.verifier, `live operations queue must keep a distinct verifier for ${task.id}`);
      assert.ok(task.decision && task.decisionMode && task.nextAction, `live operations queue is missing automatic decision metadata for ${task.id}`);
      const expectedMode = task.state === 'VERIFYING' ? 'independent-review' : task.state === 'WAITING' || task.state === 'BACKLOG' ? 'input-gate' : task.state === 'READY' ? 'sandbox-execution' : task.state === 'RUNNING' ? 'execution-tracking' : 'state-preservation';
      assert.equal(task.decisionMode, expectedMode, `live operations queue has a mismatched decision mode for ${task.id}`);
      if (['DONE', 'CANCELLED'].includes(task.state)) assert.ok(Array.isArray(task.decisionOptions) && task.decisionOptions.length === 0, `live operations queue must not expose active decision options for ${task.id}`);
      else {
        validateDecisionOptions(task.decisionOptions, task.state, `live operations queue task ${task.id}`);
        const agenda = publicPulse.meetingAgenda.find(candidate => candidate.taskId === task.id);
        assert.ok(agenda, `live operations queue is missing pulse agenda for ${task.id}`);
        assert.deepEqual(task.decisionOptions, agenda.decisionOptions, `live operations queue decision options mismatch for ${task.id}`);
      }
      if (['WAITING', 'BACKLOG'].includes(task.state)) assert.ok(Array.isArray(task.requiredInputs) && task.requiredInputs.length > 0 && task.requiredInputs.every(input => typeof input === 'string' && input.trim().length >= 2), `live input gate is missing required inputs for ${task.id}`);
    }
    assert.ok(queue.tasks.some(task => task.id === 'B4' && task.state === 'WAITING' && task.decisionMode === 'input-gate'), 'live operations queue must keep teaser exposure behind approval');
    const waitingTasks = queue.tasks.filter(task => task.state === 'WAITING' || task.state === 'BACKLOG');
    const required = ['research-yoto-2012', 'research-yamatsu-2016', 'research-powers-2008', 'research-sakashita-2019'];
    for (const id of required) assert.ok(master.records.some(record => record.id === id), `live master index is missing ${id}`);
    const claimsById = new Map(content.claims.map(claim => [claim.id, claim]));
    for (const record of master.records) {
      const claim = claimsById.get(record.id);
      assert.ok(claim, `live claim is missing for ${record.id}`);
      assert.equal(record.evidenceHash, claim.evidenceHash, `live provenance mismatch for ${record.id}`);
    assert.equal(record.reviewedAt, claim.reviewedAt, `live review date mismatch for ${record.id}`);
    }
    console.log(JSON.stringify({base, attempt, page: 200, claims: content.claims.length, masterRecords: master.records.length, products: content.products.length, queueTasks: queue.tasks.length, waitingTasks: waitingTasks.length, auditGates: publicAudit.gates.length, pulseHash: queue.pulse.snapshotHash.slice(0, 12), smartStoreOnly: true, removed750: true, provenance: 'matched'}));
    lastError = undefined;
    break;
  } catch (error) {
    lastError = error;
    if (attempt < 12) await sleep(5000);
  }
}
if (lastError) throw new Error(`Live public smoke check failed after 12 attempts: ${lastError instanceof Error ? lastError.message : lastError}`);
