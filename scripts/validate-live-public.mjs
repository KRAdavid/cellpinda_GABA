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
    const [page, contentResponse, masterResponse, queueResponse] = await Promise.all([
      request('/?view=ops'),
      request('/data/content.json'),
      request('/data/gaba-master-index.json'),
      request('/data/operations-queue.json'),
    ]);
    const [pageText, content, master, queue] = await Promise.all([page.text(), contentResponse.json(), masterResponse.json(), queueResponse.json()]);
    assert.match(pageText, /Cellpinda|GABA/i, 'public page does not contain the site shell');
    assert.equal(content.products.length, 1, 'live export must contain one product');
    assert.equal(content.products[0].id, 'gaba1500', 'live export product must be gaba1500');
    assert.equal(content.products[0].officialUrl, 'https://smartstore.naver.com/cellpinda', 'live product must point to Smart Store');
    assert.ok(!JSON.stringify(content.products).includes('750'), 'live export contains removed 750 product');
    assert.equal(master.records.length, 8, 'live master index must contain eight research records');
    assert.equal(queue.goalId, 'GL-2026-CELL-GABA-001', 'live operations queue must use the active Goal Contract');
    assert.equal(queue.workstreams.length, 5, 'live operations queue must contain five workstreams');
    assert.equal(queue.tasks.length, 13, 'live operations queue must contain the current task graph');
    const queueIds = new Set(queue.tasks.map(task => task.id));
    assert.equal(queueIds.size, queue.tasks.length, 'live operations queue contains duplicate task ids');
    for (const task of queue.tasks) {
      assert.ok(['BACKLOG', 'READY', 'RUNNING', 'VERIFYING', 'WAITING', 'EXPIRED', 'RETRY', 'REWORK', 'DONE', 'FAILED', 'CANCELLED'].includes(task.state), `live operations queue has an unsupported state for ${task.id}`);
      assert.ok(task.decision && task.decisionMode && task.nextAction, `live operations queue is missing automatic decision metadata for ${task.id}`);
      const expectedMode = task.state === 'VERIFYING' ? 'independent-review' : task.state === 'WAITING' || task.state === 'BACKLOG' ? 'input-gate' : task.state === 'READY' ? 'sandbox-execution' : task.state === 'RUNNING' ? 'execution-tracking' : 'state-preservation';
      assert.equal(task.decisionMode, expectedMode, `live operations queue has a mismatched decision mode for ${task.id}`);
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
    console.log(JSON.stringify({base, attempt, page: 200, claims: content.claims.length, masterRecords: master.records.length, products: content.products.length, queueTasks: queue.tasks.length, waitingTasks: waitingTasks.length, smartStoreOnly: true, removed750: true, provenance: 'matched'}));
    lastError = undefined;
    break;
  } catch (error) {
    lastError = error;
    if (attempt < 12) await sleep(5000);
  }
}
if (lastError) throw new Error(`Live public smoke check failed after 12 attempts: ${lastError instanceof Error ? lastError.message : lastError}`);
