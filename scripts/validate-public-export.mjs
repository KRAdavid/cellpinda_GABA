import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { projectConsumerVisual } from '../src/domain/public-research.ts';

const readJson = async relative => JSON.parse(await readFile(new URL(`../${relative}`, import.meta.url), 'utf8'));
const content = await readJson('public/data/content.json');
const master = await readJson('public/data/gaba-master-index.json');
const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const focusHtml = await readFile(new URL('../public/focus/index.html', import.meta.url), 'utf8');
const focusCardSvg = await readFile(new URL('../public/assets/focus-game-card.svg', import.meta.url), 'utf8');
const focusCardPng = await readFile(new URL('../public/assets/focus-game-card-v5.png', import.meta.url));
const researchHtml = await readFile(new URL('../public/research/index.html', import.meta.url), 'utf8');
const researchComponent = await readFile(new URL('../src/components/ResearchLibrary.tsx', import.meta.url), 'utf8');
const productShareHtml = await readFile(new URL('../public/products/index.html', import.meta.url), 'utf8');
const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8');
const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const teaser = await readJson('data/teaser-manifest.json');
const teaserPreview = await readJson('public/data/teaser-preview.json');
const wranglerConfig = await readJson('wrangler.jsonc');
const operationsQueue = await readJson('public/data/operations-queue.json');
const publicPulse = await readJson('public/data/tf-pulse.json');
const publicAudit = await readJson('public/data/goal-audit.json');
const meetingPacket = await readJson('public/data/tf-meeting-packet.json');
const taskGraph = await readJson('data/task-graph.json');
const roleRegistry = await readJson('data/tf-role-registry.json');
const goalContract = await readJson('data/goal-contract.json');
const fail = message => { throw new Error(`Public export invalid: ${message}`); };
const approvedSmartStoreUrl = 'https://smartstore.naver.com/cellpinda/products/4701017202';
const approvedSmartStoreReviewUrl = `${approvedSmartStoreUrl}#REVIEW_DIALOG`;
const approvedReviewText = '가바 1500 구매자 후기를 스마트스토어에서 읽어보세요.';
const isHttps = value => {
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
};
const isSmartStore = value => {
  try { return new URL(value).href === approvedSmartStoreUrl; } catch { return false; }
};
const isSmartStoreReview = value => {
  try { return new URL(value).href === approvedSmartStoreReviewUrl; } catch { return false; }
};

if (content.schemaVersion !== 1 || master.schemaVersion !== 1 || teaserPreview.schemaVersion !== 1 || operationsQueue.schemaVersion !== 1 || publicPulse.schemaVersion !== 1 || publicAudit.schemaVersion !== 1 || meetingPacket.schemaVersion !== 1) fail('unsupported schema');
if (wranglerConfig.assets?.run_worker_first !== true) fail('all static Worker assets must pass through the security-header middleware');
if (!/<noscript[\s>]/i.test(indexHtml) || !/GABA는 뇌세포가 서로 신호를 주고받을 때 쓰이는 물질 가운데 하나예요/.test(indexHtml) || !/셀핀다 가바 1500[^<]*30포/.test(indexHtml) || /가바 1,500\s*mg\s*[×x]\s*30포/i.test(indexHtml) || /gaba-master-index\.json/i.test(indexHtml) || !indexHtml.includes(approvedSmartStoreUrl) || !indexHtml.includes(approvedSmartStoreReviewUrl) || !/<a href="https:\/\/smartstore\.naver\.com\/cellpinda\/products\/4701017202#REVIEW_DIALOG"[^>]*>스마트스토어에서 후기 읽기/.test(indexHtml) || !indexHtml.includes(approvedReviewText)) fail('index.html must keep a readable static fallback with the approved Smart Store product and review links');
if (!/<link rel="canonical" href="https:\/\/kradavid\.github\.io\/cellpinda_GABA\/"\s*\/>/i.test(indexHtml) || !/<meta property="og:type" content="website"\s*\/>/i.test(indexHtml) || !/<meta property="og:url" content="https:\/\/kradavid\.github\.io\/cellpinda_GABA\/"\s*\/>/i.test(indexHtml)) fail('index.html must expose canonical and Open Graph URL metadata');
if (!/canonical" href="https:\/\/kradavid\.github\.io\/cellpinda_GABA\/focus\//.test(focusHtml) || !/property="og:title" content="“너도 해봐” 1분 색 신호 게임"/.test(focusHtml) || !/property="og:image" content="https:\/\/kradavid\.github\.io\/cellpinda_GABA\/assets\/focus-game-card-v5\.png"/.test(focusHtml) || !/focus=1#focus-game|focus=1/.test(focusHtml) || !focusHtml.includes('24개') || !focusHtml.includes('먼저 연습하고 시작하기') || !focusCardSvg.includes('1분 색 신호 게임')) fail('focus invite page must expose its direct game title and randomized, user-started game preview');
if (focusCardPng.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' || focusCardPng.readUInt32BE(16) !== 1200 || focusCardPng.readUInt32BE(20) !== 630) fail('focus invite card must be a valid 1200x630 social image');
if (!/canonical" href="https:\/\/kradavid\.github\.io\/cellpinda_GABA\/research\//.test(researchHtml) || !/property="og:title" content="일반 GABA 사람 연구를 쉽게 보기"/.test(researchHtml) || !researchHtml.includes('view=research') || /http-equiv="refresh"/.test(researchHtml) || researchHtml.includes(approvedSmartStoreUrl) || /href="#products"|셀핀다 제품 구성 확인/.test(researchComponent) || !researchComponent.includes("new URL('research/',base)")) fail('research must have an independent public entry, stable deep links, and no direct product-purchase CTA');
if ((researchHtml.match(/사람 연구에서 관찰한 내용을 쉽게 정리했어요\. 셀핀다 완제품 연구와는 다른 자료입니다\./g) ?? []).length < 4 || researchHtml.includes('잠·긴장·생각 과제에서 관찰한 내용을 그림으로 소개합니다. 셀핀다 완제품 연구와는 다른 자료입니다.')) fail('research static metadata and visible fallback must use the same product boundary copy');
if (!/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"WebSite","name":"셀핀다 발효가바","url":"https:\/\/kradavid\.github\.io\/cellpinda_GABA\/"[^<]*"inLanguage":"ko-KR"\}<\/script>/.test(indexHtml)) fail('index.html must expose safe WebSite structured data');
if (!/<link rel="canonical" href="https:\/\/kradavid\.github\.io\/cellpinda_GABA\/products\/">/.test(productShareHtml) || !/<meta property="og:url" content="https:\/\/kradavid\.github\.io\/cellpinda_GABA\/products\/">/.test(productShareHtml) || !/<meta property="og:title" content="셀핀다 가바 1500 · 30포 구성 보기">/.test(productShareHtml) || !productShareHtml.includes('assets/product-composition-1500.png') || !productShareHtml.includes('https://smartstore.naver.com/cellpinda/products/4701017202') || !productShareHtml.includes('../?view=products#products') || /한 포 1,500 mg|전체 45 g/.test(productShareHtml)) fail('product share page must use approved package facts and preserve product/store destinations');
if (!/^User-agent: \*\nAllow: \/\nDisallow: \/cellpinda_GABA\/admin\nDisallow: \/cellpinda_GABA\/ops\n\nSitemap: https:\/\/kradavid\.github\.io\/cellpinda_GABA\/sitemap\.xml\s*$/m.test(robots)) fail('robots.txt must expose the public sitemap and keep internal paths out of discovery');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const expectedSitemapUrls = ['https://kradavid.github.io/cellpinda_GABA/', 'https://kradavid.github.io/cellpinda_GABA/products/', 'https://kradavid.github.io/cellpinda_GABA/research/', 'https://kradavid.github.io/cellpinda_GABA/focus/', ...['active', 'sleep', 'irregular', 'sensory', 'unrested', 'steady'].map(id => `https://kradavid.github.io/cellpinda_GABA/share/${id}/`)];
if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>') || !sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') || JSON.stringify(sitemapUrls) !== JSON.stringify(expectedSitemapUrls) || /\/admin|\/ops/.test(sitemap)) fail('sitemap.xml must contain only public landing, product, research, focus invite and share pages');
if (!Array.isArray(content.claims) || content.claims.length === 0) fail('claims are required');
if (!Array.isArray(master.records) || master.records.length === 0) fail('master records are required');
if (master.records.length !== content.claims.filter(claim => String(claim.id).startsWith('research-')).length) fail('research and master counts differ');
const publicResearchRecords = content.claims.filter(claim => String(claim.id).startsWith('research-'));
if (publicResearchRecords.some(claim => ['research-yoon-2022', 'research-steenbergen-2015', 'research-sakashita-2019'].includes(claim.id))) fail('held, disputed, or retracted studies must not appear in the public research export');
const relationshipDisclosures = publicResearchRecords.filter(claim => claim.metadata?.consumerDisclosure);
if (relationshipDisclosures.length < 3 || relationshipDisclosures.some(claim => !master.records.find(record => record.id === claim.id)?.consumerDisclosure)) fail('public study relationship disclosures must be preserved in the master index');
if (!researchComponent.includes('preferredStudyOrder') || !researchComponent.includes("'research-yamatsu-2016', 'research-byun-2018'") || !researchComponent.includes("'research-review-2020'") || !researchComponent.includes('const featuredStudy = visibleStudies[0]')) fail('a specific visualized human study must appear first and the review overview must follow separately');
if (!researchHtml.includes('일반 GABA 사람 연구') || !researchHtml.includes('셀핀다 완제품 연구와는 다른 자료입니다.')) fail('the research list must clearly identify general GABA human research and distinguish it from Cellpinda product research');
if (!researchHtml.includes('운동 경험이 있는 남성이 GABA를 먹고 쉰 경우와 운동한 경우, 혈액 속 성장호르몬을 살펴본 연구를 정리했어요.') || researchHtml.includes('GABA와 단백질을 함께 사용한 연구')) fail('research static fallback must match the approved Powers study scope and must not imply an unapproved protein co-use study');

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
const hebaRecord=recordsById.get('research-heba-2016');
if(!hebaRecord || !hebaRecord.studyType?.includes('GABA를 먹지 않은 연구') || !hebaRecord.dose?.includes('GABA를 먹지 않고')) fail('non-ingestion GABA studies must be labeled before they appear in the consumer research index');
const coverage = {
  stress: ['research-review-2020'],
  sleep: ['research-byun-2018', 'research-yamatsu-2016'],
  growthHormone: ['research-powers-2008'],
};
const stressSleepReview=claimsById.get('research-review-2020');
if(stressSleepReview?.metadata?.studyCount !== '14' || !stressSleepReview.metadata.consumerSummary?.includes('참여자') || !stressSleepReview.metadata.consumerSummary.includes('먹은 양·기간') || !stressSleepReview.metadata.consumerSummary.includes('살펴본 항목') || !stressSleepReview.metadata.consumerContext?.includes('2020년 2월까지') || stressSleepReview.metadata.consumerFinding !== undefined) fail('stress and sleep review must show its consumer scope and date range without surfacing an efficacy conclusion');
if(/연구마다 다르게 보고됐어요|근거가 매우 제한적|근거가 제한적/.test(JSON.stringify({claims:content.claims,records:master.records}))) fail('public research export must not expose discouraging review conclusions');
const featuredFindings = new Map([
  ['research-byun-2018','paired-before-after'],['research-yoto-2012','study-journey'],['research-yamatsu-2016','metric-pair'],
  ['research-heba-2016','observational-link'],
]);
for (const [id, kind] of featuredFindings) {
  const claim = claimsById.get(id);
  if (!claim || typeof claim.metadata?.consumerFinding !== 'string' || claim.metadata.consumerFinding.trim().length < 30 || claim.metadata.consumerVisual?.kind !== kind) fail(`consumer-visible research finding or illustration is missing for ${id}`);
  const projectedVisual = projectConsumerVisual(claim.metadata.consumerVisual);
  try { assert.deepEqual(projectedVisual, claim.metadata.consumerVisual); }
  catch { fail(`consumer visualization for ${id} does not match the approved public data shape`); }
  if (/셀핀다.{0,15}(?:효과|개선)|(?:효과|개선).{0,15}셀핀다/.test(claim.metadata.consumerFinding)) fail(`research finding ${id} implies a Cellpinda product effect`);
}
const powers = claimsById.get('research-powers-2008');
if (powers?.metadata?.consumerFindingFirst === true || !powers.metadata?.consumerSummary?.includes('남성 11명') || !powers.metadata.consumerSummary.includes('GABA 3g') || !powers.metadata.consumerSummary.includes('90분') || !powers.metadata.consumerFinding?.includes('성장호르몬 최고 수치') || !powers.metadata.consumerFinding.includes('근육 크기와 근력 변화는 측정하지 않았어요') || powers.metadata.consumerDetail) fail('Powers study must lead with its measurement design and keep the finding in context');
const powersIndexRecord = recordsById.get('research-powers-2008');
if (powersIndexRecord?.consumerFindingFirst === true) fail('public GABA master index must not lead the Powers record with a hormone outcome');
for (const [topic, ids] of Object.entries(coverage)) {
  if (!ids.some(id => recordsById.has(id))) fail(`required ${topic} research is missing`);
}

if (content.products.length !== 1) fail(`expected one approved product, found ${content.products.length}`);
const product = content.products[0];
if (product.id !== 'gaba1500' || product.name !== '셀핀다 가바 1500' || product.servings !== 30 || product.category !== '기타가공품' || 'amountMg' in product || 'totalG' in product || !isSmartStore(product.officialUrl)) fail('the public product must show only the user-confirmed product name and package count until current label confirmation');
for (const claim of content.claims.filter(item => ['product-1500', 'fermentation-listed'].includes(item.id))) {
  if (!claim.sources.every(source => isSmartStore(source.url))) fail(`public product claim ${claim.id} must use the Smart Store source only`);
}
const hasRemoved750 = content.products.some(item => item.id === 'gaba750' || String(item.name || '').includes('750'));
if (hasRemoved750) fail('removed 750 product returned to public export');

if (content.reviews.length !== 1 || content.reviews[0].id !== 'shop-review-destination-1500' || !isSmartStoreReview(content.reviews[0].sourceUrl) || content.reviews[0].publicText !== approvedReviewText) fail('review destination or consumer copy is not the approved Smart Store 1500 review dialog message');
if (content.reviews.some(review => 'limitations' in review || 'result' in review)) fail('review export exposes internal editorial fields');
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
