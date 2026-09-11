import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root = process.cwd();
const jsonOutput = process.argv.includes('--json');
const includeLocalInputs = process.argv.includes('--local-inputs');
const readJson = relative => JSON.parse(readFileSync(resolve(root, relative), 'utf8'));
const contract = readJson('data/goal-contract.json');
const graph = readJson('data/task-graph.json');
const roles = readJson('data/tf-role-registry.json');
const teaser = readJson('data/teaser-manifest.json');
const content = readJson('public/data/content.json');
const master = readJson('public/data/gaba-master-index.json');

const taskById = new Map((graph.tasks || []).map(task => [task.id, task]));
const checks = [];
const check = (id, status, detail, evidence, blockers = []) => checks.push({id, status, detail, evidence, blockers});

function command(script, args = []) {
  const result = spawnSync(process.execPath, [resolve(root, script), ...args], {encoding: 'utf8'});
  return {ok: result.status === 0, output: result.stdout?.trim() || '', error: result.stderr?.trim() || `${script} returned ${result.status}`};
}

function commandCheck(id, script, evidence) {
  const result = command(script);
  check(id, result.ok ? 'MET' : 'INVALID', result.ok ? '검증 명령 통과' : '검증 명령 실패', evidence, result.ok ? [] : [result.error]);
  return result.ok;
}

function readOptionalJson(relative) {
  try {
    return readJson(relative);
  } catch {
    return undefined;
  }
}

function latestTimestamp(values = []) {
  const valid = values.filter(value => typeof value === 'string' && !Number.isNaN(Date.parse(value))).sort();
  return valid.at(-1) || null;
}

function pulseFreshness(value, now = Date.now()) {
  const timestamp = Date.parse(value || '');
  if (!Number.isFinite(timestamp)) return {status: 'unknown', ageMinutes: null};
  const ageMinutes = Math.max(0, Math.floor((now - timestamp) / 60_000));
  return {status: ageMinutes > 8 * 60 ? 'stale' : 'fresh', ageMinutes};
}

const heartbeat = readOptionalJson('data/tf-pulse-heartbeat.json');
const pulseHealth = heartbeat?.generatedAt
  ? {generatedAt: heartbeat.generatedAt, snapshotHash: heartbeat.snapshotHash, ...pulseFreshness(heartbeat.generatedAt)}
  : {generatedAt: null, snapshotHash: null, status: 'missing', ageMinutes: null};

const contractOk = commandCheck('goal-contract', 'scripts/validate-goal-contract.mjs', ['data/goal-contract.json']);
const planOk = commandCheck('task-graph', 'scripts/goal-next.mjs', ['data/task-graph.json']);
const researchOk = commandCheck('research-copy', 'scripts/validate-research-copy.mjs', ['data/content-ledger.json', 'public/data/gaba-master-index.json']);
const publicOk = commandCheck('public-export', 'scripts/validate-public-export.mjs', ['scripts/validate-public-export.mjs']);
const opsOk = commandCheck('sandbox-mvp', 'scripts/validate-ops-mvp.mjs', ['src/domain/goal-mvp.ts', 'src/components/OperationsMvp.tsx']);
const pulseOk = commandCheck('tf-pulse', 'scripts/validate-tf-pulse.mjs', ['data/tf-role-registry.json', 'data/tf-pulse-heartbeat.json']);
const preflightResult = command('scripts/check-deploy-readiness.mjs');
let preflight;
try { preflight = JSON.parse(preflightResult.output || ''); } catch { preflight = undefined; }
const deploymentReady = preflightResult.ok && preflight?.ready === true;
check('deployment-readiness', deploymentReady ? 'MET' : 'WAITING', deploymentReady ? '정적·Worker 배포 필수 설정과 산출물 준비됨' : '정적 Pages는 가능하지만 Worker 운영 준비 조건이 남아 있음', ['scripts/check-deploy-readiness.mjs', 'wrangler.jsonc'], deploymentReady ? [] : (preflight?.missingSecrets || ['배포 준비도 JSON 확인']));

let localInputAudit;
if (includeLocalInputs) {
  const materialCommand = command('scripts/audit-local-materials.mjs');
  const orderCommand = command('scripts/audit-local-orders.mjs');
  const material = readOptionalJson('tmp/local-material-audit.json');
  const orders = readOptionalJson('tmp/local-order-audit.json');
  const materialSummary = material?.summary;
  const materialLatest = latestTimestamp((material?.artifacts || []).map(artifact => artifact.modifiedAt));
  const orderLatest = latestTimestamp((orders?.files || []).map(file => file.modifiedAt));
  const orderSummary = orders
    ? {
        counters: orders.counters,
        gaba1500: orders.aggregate?.gaba1500,
        gaba750: orders.aggregate?.gaba750,
        fieldPresence: orders.fieldPresenceFileCounts,
        channelAssessment: orders.channelAssessment,
        latestSourceModifiedAt: orderLatest,
      }
    : undefined;
  const materialOk = materialCommand.ok
    && material?.goalId === contract.goalId
    && materialSummary?.missing === 0
    && Number(materialSummary?.finishedProductCandidates) > 0;
  const orderOk = orderCommand.ok && orders?.goalId === contract.goalId && Boolean(orders?.aggregate);
  check(
    'local-material-inputs',
    materialOk ? 'MET' : materialCommand.ok ? 'WAITING' : 'INVALID',
    materialOk
      ? `로컬 완제품 자료 입력 스캔 성공 · 후보 ${materialSummary.finishedProductCandidates}건 · 최근 수정 ${materialLatest || '확인 불가'} · B2 독립 승인은 별도`
      : materialCommand.ok ? '로컬 완제품 자료 입력을 다시 확인해야 함' : '로컬 완제품 자료 감사 명령 실패',
    ['data/local-material-manifest.json', 'scripts/audit-local-materials.mjs'],
    materialOk ? [] : ['지정 자료 폴더·완제품 포장 파일·표시 자료 확인']
  );
  check(
    'local-order-inputs',
    orderOk ? 'WAITING' : 'INVALID',
    orderOk
      ? `로컬 주문 파일 ${orders.counters?.filesScanned ?? 0}개 스캔 · 1500 집계 ${orders.aggregate?.gaba1500?.quantity ?? 0}개 · 최근 수정 ${orderLatest || '확인 불가'} · 역사 자료만 확인되어 실구매로 승격하지 않음`
      : '로컬 주문 자료 감사 명령 실패 또는 계약 ID 불일치',
    ['data/local-order-manifest.json', 'scripts/audit-local-orders.mjs'],
    orderOk ? ['판매자 계정·스마트스토어 상품 ID·실시간 주문·취소·환불 응답 확인'] : ['주문 입력 재감사']
  );
  localInputAudit = {
    enabled: true,
    materials: materialSummary ? {
      found: materialSummary.found,
      missing: materialSummary.missing,
      finishedProductCandidates: materialSummary.finishedProductCandidates,
      b2Candidate: materialSummary.b2Candidate,
      excludedBulkMaterial: materialSummary.excludedBulkMaterial,
      latestSourceModifiedAt: materialLatest,
    } : null,
    orders: orderSummary ? {
      counters: orderSummary.counters,
      gaba1500: orderSummary.gaba1500,
      gaba750: orderSummary.gaba750,
      fieldPresence: orderSummary.fieldPresence,
      channelAssessment: orderSummary.channelAssessment,
      latestSourceModifiedAt: orderSummary.latestSourceModifiedAt,
    } : null,
    interpretation: '로컬 자료는 입력 최신성·분류·대사 가능 여부를 보여 주며, 독립 승인·실구매·환불 완료를 증명하지 않는다.',
  };
}

const roleCorpus = [
  ...(graph.tasks || []).flatMap(task => [task.lead, task.verifier]),
  ...(contract.workstreams || []).flatMap(stream => [stream.lead, stream.verifier]),
].join(' · ');
const roleCoverage = Array.isArray(roles.roles)
  ? roles.roles.map(role => ({id: role.id, label: role.label, status: role.match?.some(term => roleCorpus.includes(term)) ? 'present' : 'missing'}))
  : [];
const allRolesPresent = roles.goalId === contract.goalId && roles.status === contract.status && roleCoverage.length === 6 && roleCoverage.every(role => role.status === 'present');
check('tf-role-registry', allRolesPresent ? 'MET' : 'INVALID', allRolesPresent ? '6개 교차 검토 역할군이 계약·그래프에 연결됨' : '역할 레지스트리와 계약·그래프가 일치하지 않음', ['data/tf-role-registry.json', 'scripts/validate-tf-pulse.mjs'], allRolesPresent ? [] : ['역할 ID·매칭어·Goal Contract 연결 확인']);

const publicProductOk = content.products?.length === 1 && content.products[0]?.id === 'gaba1500' && !content.products.some(item => item.id === 'gaba750' || Number(item.amountMg) === 750 || String(item.name || '').includes('750'));
const masterOk = master.records?.length === 8 && master.records.every(record => record.id?.startsWith('research-'));
check('public-master-index', publicProductOk && masterOk ? 'MET' : 'INVALID', publicProductOk && masterOk ? '승인 연구 8건과 gaba1500 단일 제품 export 확인' : '공개 export 범위가 계약과 다름', ['public/data/content.json', 'public/data/gaba-master-index.json', 'scripts/sync-public-data.mjs'], publicProductOk && masterOk ? [] : ['공개 export 재생성·검증']);

const taskCounts = Object.fromEntries((graph.stateMachine || []).map(state => [state, (graph.tasks || []).filter(task => task.state === state).length]));
const requiredGates = [
  ['B2', '제품 표시'],
  ['B3', '실제 후기 권한'],
  ['B4', '티저 공개 승인'],
  ['C2', 'Cloudflare Worker·D1'],
  ['E1', '실구매 대사'],
];
for (const [id, label] of requiredGates) {
  const task = taskById.get(id);
  const state = task?.state || 'MISSING';
  const status = id === 'C2' && state === 'DONE' && !deploymentReady ? 'INVALID' : state === 'DONE' ? 'MET' : state === 'VERIFYING' ? 'VERIFYING' : state === 'WAITING' ? 'WAITING' : 'INVALID';
  check(`gate-${id.toLowerCase()}`, status, `${label} · ${state}`, ['data/task-graph.json', ...(task?.evidence || [])], status === 'INVALID' ? [`${id} 상태가 허용된 운영 상태가 아님`] : (state === 'DONE' ? [] : (task?.requiredInputs || [])));
}

const teaserTaskState = taskById.get('B4')?.state;
const teaserConsistent = ['HOLD', 'PREVIEW'].includes(teaser.status) ? teaserTaskState === 'WAITING' : teaser.status === 'APPROVED' ? teaserTaskState === 'DONE' : false;
const teaserStatus = teaserConsistent ? (teaser.status === 'APPROVED' ? 'MET' : 'WAITING') : 'INVALID';
check('teaser-boundary', teaserStatus, teaserConsistent ? `티저 ${teaser.status}가 업무 그래프 ${teaserTaskState}와 일치` : '티저 공개 경계가 일치하지 않음', ['data/teaser-manifest.json', 'data/task-graph.json', 'scripts/validate-teaser-exposure.mjs'], teaserConsistent && teaser.status !== 'APPROVED' ? (teaser.requiredApprovals || []) : (teaserConsistent ? [] : ['B4와 티저 매니페스트 상태 대조']));

const coreIds = new Set(['goal-contract', 'task-graph', 'research-copy', 'public-export', 'sandbox-mvp', 'tf-pulse', 'tf-role-registry', 'public-master-index']);
const coreValid = checks.filter(item => coreIds.has(item.id)).every(item => item.status === 'MET') && contractOk && planOk && researchOk && publicOk && opsOk && pulseOk;
const unresolved = checks.filter(item => ['VERIFYING', 'WAITING', 'INVALID'].includes(item.status));
const overallStatus = checks.some(item => item.status === 'INVALID') || !coreValid ? 'IN_PROGRESS_WITH_ERRORS' : unresolved.length ? 'IN_PROGRESS_WITH_GATES' : 'COMPLETE';
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  goalId: contract.goalId,
  goalStatus: contract.status,
  overallStatus,
  coreValid,
  roleCoverage,
  taskCounts,
  pulseHealth,
  localInputAudit: localInputAudit || {enabled: false},
  checks,
  nextActions: unresolved.map(item => ({id: item.id, status: item.status, detail: item.detail, blockers: item.blockers})),
  completionRule: '모든 core check와 외부 게이트가 MET일 때만 COMPLETE로 판정한다. 역할 정의는 실제 전문가 자격·섭외를 증명하지 않는다.',
};

if (jsonOutput) console.log(JSON.stringify(report));
else {
  console.log(`Goal audit · ${report.goalId} · ${report.overallStatus}`);
  console.log(`core ${coreValid ? '통과' : '재검토 필요'} · 역할군 ${roleCoverage.filter(role => role.status === 'present').length}/6 · DONE ${taskCounts.DONE || 0}`);
  console.log(`pulse ${report.pulseHealth.status} · ${report.pulseHealth.generatedAt || 'heartbeat 없음'}${report.pulseHealth.ageMinutes === null ? '' : ` · ${report.pulseHealth.ageMinutes}분 경과`}`);
  if (includeLocalInputs) {
    for (const item of checks.filter(checkItem => checkItem.id.startsWith('local-'))) console.log(`- [${item.status}] ${item.id}: ${item.detail}`);
  }
  for (const item of report.nextActions) console.log(`- [${item.status}] ${item.id}: ${item.detail}${item.blockers.length ? ` · 다음: ${item.blockers.join(' · ')}` : ''}`);
}
