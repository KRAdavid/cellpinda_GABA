import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const readJson = async relative => JSON.parse(await readFile(new URL(`../${relative}`, import.meta.url), 'utf8'));
const contract = await readJson('data/goal-contract.json');
const graph = await readJson('data/task-graph.json');
const teaser = await readJson('data/teaser-manifest.json');
const roleRegistry = await readJson('data/tf-role-registry.json');
const fail = message => { throw new Error(`TF pulse invalid: ${message}`); };
if (contract.status !== 'ACTIVE') fail('the pulse requires an ACTIVE Goal Contract');
if (graph.goalId !== contract.goalId) fail('task graph is not tied to the Goal Contract');
if (roleRegistry.goalId !== contract.goalId || roleRegistry.status !== contract.status || !Array.isArray(roleRegistry.roles) || roleRegistry.roles.length !== 6) fail('TF role registry is missing or not tied to the active Goal Contract');
if (!Array.isArray(graph.tasks) || graph.tasks.length === 0) fail('task graph is empty');
if (!contract.decisionProtocol || typeof contract.decisionProtocol.cadence !== 'string' || contract.decisionProtocol.cadence.trim().length < 10 || typeof contract.decisionProtocol.quorum !== 'string' || contract.decisionProtocol.quorum.trim().length < 10 || !Array.isArray(contract.decisionProtocol.record) || contract.decisionProtocol.record.length === 0 || contract.decisionProtocol.record.some(item => typeof item !== 'string' || item.trim().length < 2)) fail('decision protocol is missing or malformed');
const executionPolicy = {
  autoStates: ['READY'],
  autoRiskClasses: ['A_READ', 'B_INTERNAL_WRITE', 'C_LOW_RISK_INTERNAL'],
  humanReviewStates: ['VERIFYING', 'WAITING', 'BACKLOG', 'REWORK'],
  approvalRiskClasses: ['D_EXTERNAL_REVERSIBLE', 'E_EXTERNAL_COMMITMENT', 'F_LEGAL_IRREVERSIBLE'],
  note: '자동 파동은 내부 샌드박스 후보만 계속하고, 독립 검증·외부 행동·법적 약속은 사람 판단 전환점으로 보존한다.',
};
const supportedRiskClasses = new Set([...executionPolicy.autoRiskClasses, ...executionPolicy.approvalRiskClasses]);
const approvalRiskClasses = new Set(executionPolicy.approvalRiskClasses);

// Make the contract's quorum operational at the individual agenda item. The
// base quorum is the executor plus an independent verifier; external or
// commitment-risk work adds the TF lead as a third confirmation. This is a
// role requirement, not a claim that a named person has already attended.
const decisionQuorumFor = task => approvalRiskClasses.has(task.risk)
  ? {minimum: 3, roles: [task.lead, task.verifier, 'TF 리드·AI 비서실'], rule: '책임자·독립 검증자·TF 리드 추가 확인'}
  : {minimum: 2, roles: [task.lead, task.verifier], rule: '실행 담당자·독립 검증자 확인'};

const allowed = new Set(graph.stateMachine);
const tasksById = new Map();
for (const task of graph.tasks) {
  if (!task.id || tasksById.has(task.id)) fail(`duplicate task ${task.id ?? '(unknown)'}`);
  if (!allowed.has(task.state)) fail(`unsupported state ${task.state} for ${task.id}`);
  if (!task.lead || !task.verifier || task.lead === task.verifier || !Array.isArray(task.evidence)) fail(`incomplete or non-independent responsibility for ${task.id}`);
  if (task.risk && !supportedRiskClasses.has(task.risk)) fail(`unsupported risk class ${task.risk} for ${task.id}`);
  if (['WAITING', 'BACKLOG'].includes(task.state) && (!Array.isArray(task.requiredInputs) || task.requiredInputs.length === 0 || task.requiredInputs.some(input => typeof input !== 'string' || input.trim().length < 2))) fail(`input-gated task ${task.id} must list required inputs`);
  tasksById.set(task.id, task);
}

// Keep the cross-functional review roles visible in every pulse. These are
// role labels and decision responsibilities, not claims that credentialed
// external experts have been engaged.
const roleCorpus = [
  ...graph.tasks.flatMap(task => [task.lead, task.verifier]),
  ...contract.workstreams.flatMap(stream => [stream.lead, stream.verifier]),
].join(' · ');
const roleCoverage = roleRegistry.roles.map(role => {
  if (!role.id || !role.label || !Array.isArray(role.match) || role.match.length === 0) fail('TF role registry contains an incomplete role');
  if (!role.match.some(term => typeof term === 'string' && term.length > 1 && roleCorpus.includes(term))) fail(`required TF role group is missing: ${role.label}`);
  return {id: role.id, label: role.label, status: 'present'};
});

const actionFor = task => {
  if (task.state === 'VERIFYING') return {
    decision: '검증 유지: 독립 검토자가 수락 기준과 증거를 대조하기 전에는 완료·공개 상태로 전환하지 않는다.',
    nextAction: '검증 증거와 수락 기준을 대조해 DONE 또는 REWORK로 판정한다.',
    mode: 'independent-review',
  };
  if (task.state === 'WAITING' || task.state === 'BACKLOG') return {
    decision: '보류 유지: 필요한 외부 입력 또는 선행조건이 없으므로 자동 실행하지 않는다.',
    nextAction: task.blockedBy ? `필요 입력(${task.blockedBy})을 확보한 뒤 담당자와 검증자가 함께 재검토한다.` : '선행조건과 담당 증거를 확인한 뒤 실행 가능 상태를 갱신한다.',
    mode: 'input-gate',
  };
  if (task.state === 'READY') return {
    decision: '실행 제안: 내부 샌드박스에서 수행할 수 있으며 외부 약속은 만들지 않는다.',
    nextAction: '담당자가 샌드박스 실행 후 검증 증거를 연결한다.',
    mode: 'sandbox-execution',
  };
  if (task.state === 'RUNNING') return {
    decision: '실행 추적: 결과 증거가 연결될 때까지 같은 작업을 중복 실행하지 않는다.',
    nextAction: '실행 결과와 실패 여부를 기록한 뒤 독립 검증으로 넘긴다.',
    mode: 'execution-tracking',
  };
  return {
    decision: '상태 유지: 현재 그래프 상태와 연결된 증거를 보존한다.',
    nextAction: '상태를 바꿀 사건이 생길 때만 다음 pulse에서 재평가한다.',
    mode: 'state-preservation',
  };
};

const decisionOptionsFor = task => {
  if (task.state === 'VERIFYING') return [
    {id: 'accept', label: '수락 → DONE', criteria: ['수락 기준과 연결 증거를 모두 확인', '독립 검토 메모와 검토 시각 기록']},
    {id: 'rework', label: '보완 → REWORK', criteria: ['누락·오류를 구체적으로 기록', '담당자와 재검토 조건 지정']},
  ];
  if (task.state === 'WAITING' || task.state === 'BACKLOG') return [
    {id: 'hold', label: '보류 유지', criteria: ['필요 입력이 아직 확인되지 않음', '현재 담당자·검증자·다음 조치 보존']},
    {id: 'promote', label: '입력 충족 후 READY', criteria: ['필요 입력을 모두 확인', '담당자와 독립 검증자가 재검토']},
  ];
  if (task.state === 'READY') return [
    {id: 'sandbox', label: '샌드박스 실행', criteria: ['내부 실행 범위와 증거 위치 확인', '외부 약속을 만들지 않음']},
    {id: 'hold', label: '실행 보류', criteria: ['실행 전 가정·의존성 재확인', '다음 pulse까지 상태 보존']},
  ];
  if (task.state === 'RUNNING') return [
    {id: 'verify', label: '검증으로 전달', criteria: ['실행 결과와 실패 여부 기록', '독립 검증자에게 증거 전달']},
    {id: 'retry', label: '재시도 검토', criteria: ['재시도 원인과 범위 기록', '중복 외부 실행이 없는지 확인']},
  ];
  return [
    {id: 'preserve', label: '상태·증거 보존', criteria: ['상태를 바꿀 사건이 없음', '기존 증거와 감사 기록 유지']},
    {id: 'reopen', label: '변화 발생 시 재평가', criteria: ['새 사건·입력·승인 기록', '담당자와 검증자 재지정 여부 확인']},
  ];
};

const activeTasks = graph.tasks.filter(task => !['DONE', 'CANCELLED'].includes(task.state));
const decisions = activeTasks
  .sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id))
  .map(task => {
    const action = actionFor(task);
    return {
      taskId: task.id,
      stream: task.stream,
      state: task.state,
      chair: task.verifier,
      participants: [task.lead, task.verifier],
      question: `${task.title}의 다음 단계 진행 여부를 판단할 수 있는가?`,
      decision: action.decision,
      quorum: decisionQuorumFor(task),
      decisionOptions: decisionOptionsFor(task),
      dissent: null,
      dissentStatus: 'human-meeting-required',
      evidence: [...task.evidence],
      blockedBy: task.blockedBy ?? null,
      requiredInputs: Array.isArray(task.requiredInputs) ? [...task.requiredInputs] : [],
      nextAction: action.nextAction,
      mode: action.mode,
    };
  });

const counts = Object.fromEntries(graph.stateMachine.map(state => [state, graph.tasks.filter(task => task.state === state).length]));
const snapshotHash = createHash('sha256').update(JSON.stringify({
  goalId: contract.goalId,
  contractStatus: contract.status,
  contractMetrics: contract.successMetrics,
  decisionProtocol: contract.decisionProtocol,
  executionPolicy,
  graphCheckedAt: graph.checkedAt,
  tasks: graph.tasks,
  teaserStatus: teaser.status,
  teaserTaskState: tasksById.get('B4')?.state ?? null,
})).digest('hex');
const generatedAt = new Date().toISOString();
const requiresHumanDecision = decisions.some(item => ['VERIFYING', 'WAITING'].includes(item.state));
const continuation = {
  mode: activeTasks.length === 0 ? 'close' : requiresHumanDecision ? 'human-gate-monitor' : decisions.some(item => ['READY', 'RUNNING'].includes(item.state)) ? 'continue-execution' : 'reassess-next-cycle',
  cadenceHours: 6,
  nextReviewAt: new Date(Date.parse(generatedAt) + 6 * 60 * 60 * 1000).toISOString(),
  nextAction: activeTasks.length === 0
    ? '성공 조건과 종료 증거를 확인해 목표를 닫는다.'
    : requiresHumanDecision
      ? '사람 판정과 입력 게이트를 보존하고 다음 pulse에서 변화·새 증거를 다시 확인한다.'
      : '실행 가능한 작업을 다음 pulse에서 계속 진행하고 결과를 독립 검증으로 넘긴다.',
};
const inputGates = decisions
  .filter(item => item.mode === 'input-gate')
  .map(item => ({taskId: item.taskId, state: item.state, blockedBy: item.blockedBy, requiredInputs: item.requiredInputs, chair: item.chair, quorum: item.quorum, nextAction: item.nextAction}));
const result = {
  schemaVersion: 1,
  mode: 'automation_pulse',
  generatedAt,
  goalId: contract.goalId,
  goalStatus: contract.status,
  snapshotHash,
  requiresHumanDecision,
  continuation,
  executionPolicy,
  meetingProtocol: {
    cadence: contract.decisionProtocol.cadence,
    quorum: contract.decisionProtocol.quorum,
    record: [...contract.decisionProtocol.record],
  },
  teaserGate: {status: teaser.status, taskId: 'B4', taskState: tasksById.get('B4')?.state ?? null},
  roleCoverage: roleCoverage.map(({id, label}) => ({id, label, status: 'present'})),
  counts,
  ready: decisions.filter(item => item.state === 'READY').map(item => item.taskId),
  verifying: decisions.filter(item => item.state === 'VERIFYING').map(item => item.taskId),
  waiting: decisions.filter(item => ['WAITING', 'BACKLOG'].includes(item.state)).map(item => item.taskId),
  inputGates,
  meetingAgenda: decisions.map(item => ({taskId: item.taskId, state: item.state, chair: item.chair, participants: item.participants, quorum: item.quorum, question: item.question, decision: item.decision, decisionOptions: item.decisionOptions, requiredInputs: item.requiredInputs, nextAction: item.nextAction, mode: item.mode})),
  decisions,
};

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(result));
} else {
  console.log(`TF pulse · ${result.goalId} · ${result.goalStatus}`);
  console.log(`실행 제안 ${result.ready.length}개 · 독립 검증 ${result.verifying.length}개 · 입력 대기 ${result.waiting.length}개`);
  for (const item of result.decisions) console.log(`- ${item.taskId} [${item.state}] ${item.decision} 담당: ${item.participants.join(' · ')} 다음: ${item.nextAction}`);
  console.log(`티저 게이트 B4: ${result.teaserGate.status} / 그래프 ${result.teaserGate.taskState}`);
  console.log('반대 의견: 자동 pulse에서 생성하지 않음 · 사람이 회의에서 기록해야 함');
}
