import assert from 'node:assert/strict';

const cliBase = process.argv.slice(2).find(value => /^https:\/\//.test(value)) || '';
const base = (process.env.PUBLIC_SITE_URL || cliBase).replace(/\/$/, '');
if (!/^https:\/\//.test(base)) throw new Error('PUBLIC_SITE_URL must be an HTTPS URL');
const approvedSmartStoreUrl = 'https://smartstore.naver.com/cellpinda/products/4701017202';

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const isSmartStore = value => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'smartstore.naver.com' && url.pathname === '/cellpinda/products/4701017202';
  } catch { return false; }
};
const expectedDecisionOptionIds = state => state === 'VERIFYING' ? ['accept', 'rework'] : state === 'WAITING' || state === 'BACKLOG' ? ['hold', 'promote'] : state === 'READY' ? ['sandbox', 'hold'] : state === 'RUNNING' ? ['verify', 'retry'] : ['preserve', 'reopen'];
const approvalRiskClasses = new Set(['D_EXTERNAL_REVERSIBLE', 'E_EXTERNAL_COMMITMENT', 'F_LEGAL_IRREVERSIBLE']);
const expectedQuorum = task => approvalRiskClasses.has(task.risk)
  ? {minimum: 3, roles: [task.lead, task.verifier, 'TF 리드·AI 비서실'], rule: '책임자·독립 검증자·TF 리드 추가 확인'}
  : {minimum: 2, roles: [task.lead, task.verifier], rule: '실행 담당자·독립 검증자 확인'};
const validateQuorum = (value, task, label) => {
  assert.deepEqual(Object.keys(value || {}).sort(), ['minimum', 'roles', 'rule'].sort(), `${label} quorum fields are invalid`);
  assert.ok(Number.isInteger(value.minimum) && Array.isArray(value.roles) && value.roles.length === value.minimum && value.roles.every(role => typeof role === 'string' && role.trim().length >= 2) && typeof value.rule === 'string' && value.rule.trim().length >= 8, `${label} quorum is malformed`);
  assert.deepEqual(value, expectedQuorum(task), `${label} quorum is out of sync`);
};
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
const validateContinuation = (value, label) => {
  assert.ok(value && ['close', 'human-gate-monitor', 'continue-execution', 'reassess-next-cycle'].includes(value.mode), `${label} continuation mode is invalid`);
  assert.equal(value.cadenceHours, 6, `${label} continuation cadence must be six hours`);
  assert.match(value.nextReviewAt || '', /^\d{4}-\d{2}-\d{2}T/, `${label} continuation review time is invalid`);
  assert.ok(typeof value.nextAction === 'string' && value.nextAction.trim().length >= 10, `${label} continuation action is missing`);
};
const expectedSafeChecks = ['goal-contract', 'research-copy', 'teaser-boundary', 'sandbox-mvp', 'public-export', 'tf-pulse'];
const sharedResultIds = ['active', 'sleep', 'irregular', 'sensory', 'unrested', 'steady'];
const metaContent = (html, attribute, value) => {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const forward = new RegExp(`<meta[^>]+${attribute}="${escaped}"[^>]+content="([^"]+)"`, 'i').exec(html);
  const reverse = new RegExp(`<meta[^>]+content="([^"]+)"[^>]+${attribute}="${escaped}"`, 'i').exec(html);
  return forward?.[1] ?? reverse?.[1] ?? '';
};
const canonicalHref = html => /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i.exec(html)?.[1] ?? '';
const validateSafeExecution = (value, label) => {
  if (value === undefined) return;
  assert.deepEqual(Object.keys(value).sort(), ['mode', 'status', 'validatedAt', 'executionBoundary', 'preparation', 'checks', 'candidateTaskIds', 'humanGateTaskIds'].sort(), `${label} safe execution fields are invalid`);
  assert.equal(value.mode, 'safe_internal_tf_run', `${label} safe execution mode is invalid`);
  assert.equal(value.status, 'MET', `${label} safe execution status is invalid`);
  assert.match(value.validatedAt || '', /^\d{4}-\d{2}-\d{2}T/, `${label} safe execution timestamp is invalid`);
  assert.deepEqual(value.executionBoundary, {state: 'READY', risk: 'B_INTERNAL_WRITE', externalEffects: false}, `${label} safe execution boundary is unsafe`);
  assert.deepEqual(value.preparation, {id: 'sync-public-data', risk: 'B_INTERNAL_WRITE', status: 'MET'}, `${label} safe execution preparation is invalid`);
  assert.ok(Array.isArray(value.checks), `${label} safe execution checks are invalid`);
  assert.deepEqual(value.checks.map(item => item?.id), expectedSafeChecks, `${label} safe execution checks are incomplete`);
  for (const check of value.checks) {
    assert.deepEqual(Object.keys(check).sort(), ['id', 'risk', 'status'].sort(), `${label} safe execution check fields are invalid`);
    assert.equal(check.risk, 'A_READ', `${label} safe execution check risk is invalid`);
    assert.equal(check.status, 'MET', `${label} safe execution check status is invalid`);
  }
  assert.ok(Array.isArray(value.candidateTaskIds) && Array.isArray(value.humanGateTaskIds), `${label} safe execution task lists are invalid`);
};
const request = async path => {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${base}${path}${separator}release-smoke=1`);
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return response;
};
const requestPublicRoute = async path => {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${base}${path}${separator}release-smoke=1`);
  if (![200, 404].includes(response.status)) throw new Error(`${path} returned unexpected HTTP ${response.status}`);
  return {status: response.status, text: await response.text()};
};

let lastError;
for (let attempt = 1; attempt <= 12; attempt += 1) {
  try {
    const [page, faviconResponse, robotsResponse, sitemapResponse, contentResponse, masterResponse, teaserPreviewResponse, queueResponse, pulseResponse, auditResponse, meetingPacketResponse, adminRoute, opsRoute, adminQueryRoute, opsQueryRoute] = await Promise.all([
      request('/?view=ops'),
      request('/favicon.svg'),
      request('/robots.txt'),
      request('/sitemap.xml'),
      request('/data/content.json'),
      request('/data/gaba-master-index.json'),
      request('/data/teaser-preview.json'),
      request('/data/operations-queue.json'),
      request('/data/tf-pulse.json'),
      request('/data/goal-audit.json'),
      request('/data/tf-meeting-packet.json'),
      requestPublicRoute('/admin'),
      requestPublicRoute('/ops'),
      requestPublicRoute('/?view=admin'),
      requestPublicRoute('/?view=ops'),
    ]);
    assert.match(faviconResponse.headers.get('content-type') || '', /image\/svg\+xml/i, 'live favicon must be served as SVG');
    const [pageText, robotsText, sitemapText, content, master, teaserPreview, queue, publicPulse, publicAudit, meetingPacket] = await Promise.all([page.text(), robotsResponse.text(), sitemapResponse.text(), contentResponse.json(), masterResponse.json(), teaserPreviewResponse.json(), queueResponse.json(), pulseResponse.json(), auditResponse.json(), meetingPacketResponse.json()]);
    assert.ok(robotsText.includes(`Sitemap: ${base}/sitemap.xml`), 'live robots.txt must point to the current public sitemap');
    assert.match(robotsText, /Disallow: \/cellpinda_GABA\/admin\nDisallow: \/cellpinda_GABA\/ops/, 'live robots.txt must keep internal paths out of discovery');
    const sitemapUrls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
    const expectedSitemapUrls = [`${base}/`, ...sharedResultIds.map(id => `${base}/share/${id}/`)];
    assert.deepEqual(sitemapUrls, expectedSitemapUrls, 'live sitemap must contain the public landing and share pages only');
    assert.ok(!sitemapText.includes('/admin') && !sitemapText.includes('/ops'), 'live sitemap must not list internal routes');
    for (const [label, route] of [['/admin', adminRoute], ['/ops', opsRoute], ['/?view=admin', adminQueryRoute], ['/?view=ops', opsQueryRoute]]) {
      assert.ok(!/콘텐츠 검토실|운영자 접근 키|TF 운영판|운영 큐|관리자 기능/i.test(route.text), `public route ${label} leaks an internal operations surface`);
    }
    const sharePageResponses = await Promise.all(sharedResultIds.map(id => request(`/share/${id}/`)));
    const sharePageTexts = await Promise.all(sharePageResponses.map(response => response.text()));
    assert.equal(canonicalHref(pageText), `${base}/`, 'live root canonical URL is invalid');
    assert.ok(metaContent(pageText, 'property', 'og:title'), 'live root is missing an Open Graph title');
    assert.ok(metaContent(pageText, 'property', 'og:description'), 'live root is missing an Open Graph description');
    assert.equal(metaContent(pageText, 'property', 'og:image'), `${base}/assets/social-card.png`, 'live root Open Graph image is invalid');
    assert.match(pageText, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"WebSite","name":"셀핀다 발효가바","url":"https:\/\/kradavid\.github\.io\/cellpinda_GABA\/"[^<]*"inLanguage":"ko-KR"\}<\/script>/, 'live root WebSite structured data is invalid');
    for (const [index, id] of sharedResultIds.entries()) {
      const sharePage = sharePageTexts[index] || '';
      assert.match(metaContent(sharePage, 'property', 'og:title'), /^공유받은 하루 리듬:/, `share page ${id} is missing an Open Graph title`);
      assert.ok(metaContent(sharePage, 'property', 'og:description'), `share page ${id} is missing an Open Graph description`);
      assert.equal(canonicalHref(sharePage), `${base}/share/${id}/`, `share page ${id} canonical URL is invalid`);
      assert.equal(metaContent(sharePage, 'property', 'og:url'), `${base}/share/${id}/`, `share page ${id} Open Graph URL is invalid`);
      assert.equal(metaContent(sharePage, 'property', 'og:image'), `${base}/assets/social-rhythm-${id}.png`, `share page ${id} Open Graph image is invalid`);
      assert.equal(metaContent(sharePage, 'property', 'og:site_name'), '셀핀다 발효가바', `share page ${id} Open Graph site name is invalid`);
      assert.equal(metaContent(sharePage, 'property', 'og:locale'), 'ko_KR', `share page ${id} Open Graph locale is invalid`);
      assert.match(sharePage, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"WebPage"[\s\S]*"inLanguage":"ko-KR"[\s\S]*<\/script>/, `share page ${id} WebPage structured data is invalid`);
      assert.equal(metaContent(sharePage, 'name', 'twitter:image'), `${base}/assets/social-rhythm-${id}.png`, `share page ${id} Twitter image is invalid`);
      assert.ok(sharePage.includes(`?rhythm=${id}`), `share page ${id} is missing the app handoff`);
      assert.ok(!/제한적|결과가 일치하지|정량 메타분석|이상사례|유의하지 않음/i.test(sharePage), `share page ${id} contains blocked research copy`);
    }
    assert.match(pageText, /Cellpinda|GABA/i, 'public page does not contain the site shell');
    assert.ok(pageText.includes(approvedSmartStoreUrl), 'live static fallback must keep the approved Smart Store 1500 detail link');
    assert.ok(pageText.includes('스마트스토어에서 확인하기'), 'live static fallback must label the Smart Store destination for consumers');
    assert.equal(content.products.length, 1, 'live export must contain one product');
    assert.equal(content.products[0].id, 'gaba1500', 'live export product must be gaba1500');
    assert.equal(content.products[0].officialUrl, approvedSmartStoreUrl, 'live product must point to the Smart Store 1500 product');
    assert.equal(content.reviews.length, 1, 'live export must contain the approved Smart Store review destination');
    assert.equal(content.reviews[0].id, 'shop-review-destination-1500', 'live review destination must be the approved GABA 1500 record');
    assert.equal(content.reviews[0].sourceUrl, approvedSmartStoreUrl, 'live review destination must point directly to the Smart Store 1500 product');
    assert.equal(teaserPreview.status, 'PREVIEW', 'live teaser preview must be marked PREVIEW');
    assert.equal(teaserPreview.url, 'https://fermented-gaba-documentary-20260903.dubaissday.chatgpt.site/', 'live teaser preview must use the supplied HTTPS URL');
    assert.equal(teaserPreview.placement, '선택형 보조 CTA · 리듬 체크 다음', 'live teaser preview must keep the approved placement');
    assert.ok(!/제한적|매우 제한적|결과가 일치하지|정량 메타분석|다만 GABA만의 효과|이상사례|유의하지 않음/i.test(JSON.stringify({content, master})), 'live public research data contains blocked negative marketing copy');
    assert.ok(!/cellpinda\.co\.kr|cellpindamall\.com|공식몰/i.test(JSON.stringify(content)), 'live public content contains a legacy official-mall destination');
    for (const claim of content.claims.filter(item => ['product-1500', 'fermentation-listed'].includes(item.id))) assert.ok(claim.sources?.every(source => isSmartStore(source.url)), `live product claim ${claim.id} must use the Smart Store source only`);
    assert.ok(!content.products.some(item => item.id === 'gaba750' || Number(item.amountMg) === 750 || String(item.name || '').includes('750')), 'live export contains removed 750 product');
    assert.equal(master.records.length, 8, 'live master index must contain eight research records');
    assert.equal(queue.goalId, 'GL-2026-CELL-GABA-001', 'live operations queue must use the active Goal Contract');
    assert.equal(queue.workstreams.length, 5, 'live operations queue must contain five workstreams');
    assert.equal(queue.tasks.length, 13, 'live operations queue must contain the current task graph');
    assert.ok(queue.pulse && /^[a-f0-9]{64}$/.test(queue.pulse.snapshotHash) && typeof queue.pulse.stateChanged === 'boolean', 'live operations queue must expose a valid pulse snapshot');
    validateContinuation(queue.pulse.continuation, 'live operations queue pulse');
    assert.equal(queue.pulse.activeTasks, queue.tasks.filter(task => !['DONE', 'CANCELLED'].includes(task.state)).length, 'live pulse active count must match queue');
    assert.equal(queue.pulse.inputGates, queue.tasks.filter(task => task.state === 'WAITING' || task.state === 'BACKLOG').length, 'live pulse input gate count must match queue');
    assert.equal(publicPulse.mode, 'public_tf_pulse', 'live public TF pulse packet must use the public schema');
    assert.equal(publicPulse.goalId, queue.goalId, 'live public TF pulse packet must use the active goal');
    assert.equal(publicPulse.generatedAt, queue.pulse.generatedAt, 'live public TF pulse packet timestamp must match the queue');
    assert.equal(publicPulse.snapshotHash, queue.pulse.snapshotHash, 'live public TF pulse packet hash must match the queue');
    assert.equal(publicPulse.stateChanged, queue.pulse.stateChanged, 'live public TF pulse change marker must match the queue');
    assert.deepEqual(publicPulse.meetingProtocol, queue.pulse.meetingProtocol, 'live public TF pulse meeting protocol must match the queue');
    assert.ok(publicPulse.meetingProtocol?.cadence && publicPulse.meetingProtocol?.quorum && Array.isArray(publicPulse.meetingProtocol?.record), 'live public TF pulse meeting protocol is missing');
    assert.deepEqual(publicPulse.executionPolicy, queue.pulse.executionPolicy, 'live public TF pulse execution policy must match the queue');
    assert.ok(publicPulse.executionPolicy?.autoStates?.includes('READY') && publicPulse.executionPolicy?.humanReviewStates?.includes('VERIFYING') && publicPulse.executionPolicy?.approvalRiskClasses?.includes('E_EXTERNAL_COMMITMENT'), 'live public TF pulse execution policy is incomplete');
    validateSafeExecution(queue.pulse.safeExecution, 'live operations queue pulse');
    validateSafeExecution(publicPulse.safeExecution, 'live public pulse');
    assert.deepEqual(publicPulse.safeExecution, queue.pulse.safeExecution, 'live safe execution summary must match the queue');
    if (publicPulse.safeExecution) {
      const expectedHumanGates = publicPulse.meetingAgenda.filter(item => ['VERIFYING', 'WAITING', 'BACKLOG', 'REWORK'].includes(item.state)).map(item => item.taskId);
      const expectedCandidates = publicPulse.meetingAgenda.filter(item => item.state === 'READY').map(item => item.taskId);
      assert.deepEqual(publicPulse.safeExecution.humanGateTaskIds, expectedHumanGates, 'live safe execution human gates are out of sync');
      assert.deepEqual(publicPulse.safeExecution.candidateTaskIds, expectedCandidates, 'live safe execution candidates are out of sync');
    }
    assert.equal(meetingPacket.mode, 'public_tf_meeting_packet', 'live TF meeting packet must use the public schema');
    assert.equal(meetingPacket.goalId, publicPulse.goalId, 'live TF meeting packet goal must match the pulse');
    assert.equal(meetingPacket.generatedAt, publicPulse.generatedAt, 'live TF meeting packet timestamp must match the pulse');
    assert.equal(meetingPacket.snapshotHash, publicPulse.snapshotHash, 'live TF meeting packet hash must match the pulse');
    assert.deepEqual(meetingPacket.meetingProtocol, publicPulse.meetingProtocol, 'live TF meeting packet protocol must match the pulse');
    assert.deepEqual(meetingPacket.executionPolicy, publicPulse.executionPolicy, 'live TF meeting packet execution policy must match the pulse');
    assert.deepEqual(meetingPacket.roleCoverage, publicPulse.roleCoverage, 'live TF meeting packet role coverage must match the pulse');
    assert.deepEqual(meetingPacket.continuation, publicPulse.continuation, 'live TF meeting packet continuation must match the pulse');
    assert.deepEqual(meetingPacket.agenda, publicPulse.meetingAgenda, 'live TF meeting packet agenda must match the pulse');
    assert.deepEqual(meetingPacket.inputGates, publicPulse.inputGates, 'live TF meeting packet input gates must match the pulse');
    assert.deepEqual(meetingPacket.gates, publicAudit.gates, 'live TF meeting packet gates must match the audit');
    validateContinuation(publicPulse.continuation, 'live public pulse');
    assert.deepEqual(publicPulse.continuation, queue.pulse.continuation, 'live public pulse continuation loop must match the queue');
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
    validateContinuation(publicAudit.milestones.tfPulse.continuation, 'live public audit pulse');
    assert.deepEqual(publicAudit.milestones.tfPulse.continuation, publicPulse.continuation, 'live public audit continuation loop must match the pulse');
    assert.ok(['IN_PROGRESS_WITH_GATES', 'COMPLETE'].includes(publicAudit.overallStatus), 'live public audit must expose a supported overall status');
    assert.equal(publicAudit.milestones.masterIndex.status, 'MET', 'live public audit must mark the master index milestone');
    assert.equal(publicAudit.milestones.publicProduct.status, 'MET', 'live public audit must mark the product milestone');
    assert.equal(publicAudit.milestones.publicProduct.smartStoreOnly, true, 'live public audit must keep Smart Store only');
    assert.equal(publicAudit.milestones.publicProduct.removed750, true, 'live public audit must keep 750 removed');
    assert.equal(publicAudit.milestones.tfPulse.status, 'MET', 'live public audit must mark the pulse milestone');
    validateSafeExecution(publicAudit.milestones.tfPulse.safeExecution, 'live public audit pulse');
    assert.deepEqual(publicAudit.milestones.tfPulse.safeExecution, publicPulse.safeExecution, 'live public audit safe execution summary must match the pulse');
    assert.equal(publicAudit.teaserGate.taskId, 'B4', 'live public audit must expose the teaser gate');
    assert.equal(publicAudit.teaserGate.status, 'HOLD', 'live public audit must keep the teaser on hold');
    assert.equal(publicAudit.teaserGate.taskState, queue.tasks.find(task => task.id === 'B4')?.state, 'live public audit teaser state must match the queue');
    const auditGateKeys = ['id', 'title', 'state', 'lead', 'verifier', 'requiredInputs', 'decision', 'decisionMode', 'nextAction', 'decisionOptions', 'quorum'];
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
      validateQuorum(gate.quorum, queueTask, `live public audit gate ${gate.id}`);
    }
    assert.equal(publicPulse.meetingAgenda.length, queue.pulse.activeTasks, 'live public TF pulse agenda count must match the queue');
    assert.equal(publicPulse.inputGates.length, queue.pulse.inputGates, 'live public TF pulse gate count must match the queue');
    assert.ok(Array.isArray(queue.roleCoverage) && queue.roleCoverage.length === 6, 'live operations queue role coverage is missing');
    assert.deepEqual(queue.roleCoverage, publicPulse.roleCoverage, 'live operations queue role coverage must match the pulse');
    const publicPulseKeys = {
      inputGate: ['taskId', 'state', 'chair', 'quorum', 'requiredInputs', 'nextAction'],
      meetingAgenda: ['taskId', 'state', 'chair', 'participants', 'quorum', 'question', 'decision', 'decisionOptions', 'requiredInputs', 'nextAction', 'mode'],
    };
    assert.ok(Array.isArray(publicPulse.roleCoverage) && publicPulse.roleCoverage.length === 6, 'live public TF pulse role coverage is missing');
    assert.deepEqual(publicPulse.roleCoverage.map(role => role.id), ['consumer', 'evidence', 'product-review', 'story-ux', 'commerce-data', 'quality-audit'], 'live public TF pulse role coverage is out of order');
    assert.ok(publicPulse.roleCoverage.every(role => role.status === 'present' && typeof role.label === 'string'), 'live public TF pulse role coverage is malformed');
    for (const gate of publicPulse.inputGates) assert.deepEqual(Object.keys(gate).sort(), [...publicPulseKeys.inputGate].sort(), 'live public TF pulse input gate contains an unexpected field');
    for (const agenda of publicPulse.meetingAgenda) { assert.deepEqual(Object.keys(agenda).sort(), [...publicPulseKeys.meetingAgenda].sort(), 'live public TF pulse agenda contains an unexpected field'); validateDecisionOptions(agenda.decisionOptions, agenda.state, `live public TF pulse agenda ${agenda.taskId}`); const queueTask = queue.tasks.find(task => task.id === agenda.taskId); assert.ok(queueTask, `live public TF pulse agenda is missing queue task ${agenda.taskId}`); validateQuorum(agenda.quorum, queueTask, `live public TF pulse agenda ${agenda.taskId}`); }
    assert.ok(publicPulse.counts && Object.values(publicPulse.counts).reduce((sum, count) => sum + count, 0) === queue.tasks.length, 'live public TF pulse counts must cover the queue');
    for (const state of ['BACKLOG', 'READY', 'RUNNING', 'VERIFYING', 'WAITING', 'EXPIRED', 'RETRY', 'REWORK', 'DONE', 'FAILED', 'CANCELLED']) assert.equal(publicPulse.counts[state], queue.tasks.filter(task => task.state === state).length, `live public TF pulse count mismatch for ${state}`);
    const queueIds = new Set(queue.tasks.map(task => task.id));
    assert.equal(queueIds.size, queue.tasks.length, 'live operations queue contains duplicate task ids');
    for (const task of queue.tasks) {
      assert.ok(['BACKLOG', 'READY', 'RUNNING', 'VERIFYING', 'WAITING', 'EXPIRED', 'RETRY', 'REWORK', 'DONE', 'FAILED', 'CANCELLED'].includes(task.state), `live operations queue has an unsupported state for ${task.id}`);
      assert.ok(task.lead && task.verifier && task.lead !== task.verifier, `live operations queue must keep a distinct verifier for ${task.id}`);
      assert.ok(task.decision && task.decisionMode && task.nextAction, `live operations queue is missing automatic decision metadata for ${task.id}`);
      validateQuorum(task.quorum, task, `live operations queue task ${task.id}`);
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
    console.log(JSON.stringify({base, attempt, page: 200, claims: content.claims.length, masterRecords: master.records.length, products: content.products.length, sharePages: sharedResultIds.length, teaserPreview: true, queueTasks: queue.tasks.length, waitingTasks: waitingTasks.length, auditGates: publicAudit.gates.length, pulseHash: queue.pulse.snapshotHash.slice(0, 12), smartStoreOnly: true, removed750: true, provenance: 'matched'}));
    lastError = undefined;
    break;
  } catch (error) {
    lastError = error;
    if (attempt < 12) await sleep(5000);
  }
}
if (lastError) throw new Error(`Live public smoke check failed after 12 attempts: ${lastError instanceof Error ? lastError.message : lastError}`);
