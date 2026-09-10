import assert from 'node:assert/strict';

const cliBase = process.argv.slice(2).find(value => /^https:\/\//.test(value)) || '';
const base = (process.env.PUBLIC_SITE_URL || cliBase).replace(/\/$/, '');
if (!/^https:\/\//.test(base)) throw new Error('PUBLIC_SITE_URL must be an HTTPS URL');

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const request = async path => {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${base}${path}${separator}release-smoke=1`);
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return response;
};

let lastError;
for (let attempt = 1; attempt <= 12; attempt += 1) {
  try {
    const [page, contentResponse, masterResponse, queueResponse, pulseResponse] = await Promise.all([
      request('/?view=ops'),
      request('/data/content.json'),
      request('/data/gaba-master-index.json'),
      request('/data/operations-queue.json'),
      request('/data/tf-pulse.json'),
    ]);
    const [pageText, content, master, queue, publicPulse] = await Promise.all([page.text(), contentResponse.json(), masterResponse.json(), queueResponse.json(), pulseResponse.json()]);
    assert.match(pageText, /Cellpinda|GABA/i, 'public page does not contain the site shell');
    assert.equal(content.products.length, 1, 'live export must contain one product');
    assert.equal(content.products[0].id, 'gaba1500', 'live export product must be gaba1500');
    assert.equal(content.products[0].officialUrl, 'https://smartstore.naver.com/cellpinda', 'live product must point to Smart Store');
    assert.ok(!JSON.stringify(content.products).includes('750'), 'live export contains removed 750 product');
    assert.equal(master.records.length, 8, 'live master index must contain eight research records');
    assert.equal(queue.goalId, 'GL-2026-CELL-GABA-001', 'live operations queue must use the active Goal Contract');
    assert.equal(queue.workstreams.length, 5, 'live operations queue must contain five workstreams');
    assert.equal(queue.tasks.length, 13, 'live operations queue must contain the current task graph');
    assert.ok(queue.pulse && /^[a-f0-9]{64}$/.test(queue.pulse.snapshotHash), 'live operations queue must expose a valid pulse snapshot');
    assert.equal(queue.pulse.activeTasks, queue.tasks.filter(task => !['DONE', 'CANCELLED'].includes(task.state)).length, 'live pulse active count must match queue');
    assert.equal(queue.pulse.inputGates, queue.tasks.filter(task => task.state === 'WAITING' || task.state === 'BACKLOG').length, 'live pulse input gate count must match queue');
    assert.equal(publicPulse.mode, 'public_tf_pulse', 'live public TF pulse packet must use the public schema');
    assert.equal(publicPulse.goalId, queue.goalId, 'live public TF pulse packet must use the active goal');
    assert.equal(publicPulse.generatedAt, queue.pulse.generatedAt, 'live public TF pulse packet timestamp must match the queue');
    assert.equal(publicPulse.snapshotHash, queue.pulse.snapshotHash, 'live public TF pulse packet hash must match the queue');
    assert.equal(publicPulse.meetingAgenda.length, queue.pulse.activeTasks, 'live public TF pulse agenda count must match the queue');
    assert.equal(publicPulse.inputGates.length, queue.pulse.inputGates, 'live public TF pulse gate count must match the queue');
    const queueIds = new Set(queue.tasks.map(task => task.id));
    assert.equal(queueIds.size, queue.tasks.length, 'live operations queue contains duplicate task ids');
    for (const task of queue.tasks) {
      assert.ok(['BACKLOG', 'READY', 'RUNNING', 'VERIFYING', 'WAITING', 'EXPIRED', 'RETRY', 'REWORK', 'DONE', 'FAILED', 'CANCELLED'].includes(task.state), `live operations queue has an unsupported state for ${task.id}`);
      assert.ok(task.decision && task.decisionMode && task.nextAction, `live operations queue is missing automatic decision metadata for ${task.id}`);
      const expectedMode = task.state === 'VERIFYING' ? 'independent-review' : task.state === 'WAITING' || task.state === 'BACKLOG' ? 'input-gate' : task.state === 'READY' ? 'sandbox-execution' : task.state === 'RUNNING' ? 'execution-tracking' : 'state-preservation';
      assert.equal(task.decisionMode, expectedMode, `live operations queue has a mismatched decision mode for ${task.id}`);
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
    console.log(JSON.stringify({base, attempt, page: 200, claims: content.claims.length, masterRecords: master.records.length, products: content.products.length, queueTasks: queue.tasks.length, waitingTasks: waitingTasks.length, pulseHash: queue.pulse.snapshotHash.slice(0, 12), smartStoreOnly: true, removed750: true, provenance: 'matched'}));
    lastError = undefined;
    break;
  } catch (error) {
    lastError = error;
    if (attempt < 12) await sleep(5000);
  }
}
if (lastError) throw new Error(`Live public smoke check failed after 12 attempts: ${lastError instanceof Error ? lastError.message : lastError}`);
