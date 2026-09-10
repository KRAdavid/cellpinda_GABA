import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const readJson = async relative => JSON.parse(await readFile(new URL(`../${relative}`, import.meta.url), 'utf8'));
const contract = await readJson('data/goal-contract.json');
const graph = await readJson('data/task-graph.json');
const teaser = await readJson('data/teaser-manifest.json');
const fail = message => { throw new Error(`TF pulse invalid: ${message}`); };
if (contract.status !== 'ACTIVE') fail('the pulse requires an ACTIVE Goal Contract');
if (graph.goalId !== contract.goalId) fail('task graph is not tied to the Goal Contract');
if (!Array.isArray(graph.tasks) || graph.tasks.length === 0) fail('task graph is empty');

const allowed = new Set(graph.stateMachine);
const tasksById = new Map();
for (const task of graph.tasks) {
  if (!task.id || tasksById.has(task.id)) fail(`duplicate task ${task.id ?? '(unknown)'}`);
  if (!allowed.has(task.state)) fail(`unsupported state ${task.state} for ${task.id}`);
  if (!task.lead || !task.verifier || !Array.isArray(task.evidence)) fail(`incomplete responsibility or evidence for ${task.id}`);
  if (['WAITING', 'BACKLOG'].includes(task.state) && (!Array.isArray(task.requiredInputs) || task.requiredInputs.length === 0 || task.requiredInputs.some(input => typeof input !== 'string' || input.trim().length < 2))) fail(`input-gated task ${task.id} must list required inputs`);
  tasksById.set(task.id, task);
}

// Keep the cross-functional review roles visible in every pulse. These are
// role labels and decision responsibilities, not claims that credentialed
// external experts have been engaged.
const roleCoverage = [
  {id: 'consumer', label: '마케팅·소비자심리', pattern: /마케팅|소비자심리/},
  {id: 'evidence', label: '연구·근거', pattern: /연구|근거/},
  {id: 'product-review', label: '제품·표시', pattern: /제품|표시|규제/},
  {id: 'story-ux', label: '스토리·UX·프런트', pattern: /스토리|UX|프런트/},
  {id: 'commerce-data', label: '데이터·판매처', pattern: /데이터|판매처|커머스/},
  {id: 'quality-audit', label: 'QA·감사', pattern: /QA|감사/},
];
const roleCorpus = [
  ...graph.tasks.flatMap(task => [task.lead, task.verifier]),
  ...contract.workstreams.flatMap(stream => [stream.lead, stream.verifier]),
].join(' · ');
for (const role of roleCoverage) if (!role.pattern.test(roleCorpus)) fail(`required TF role group is missing: ${role.label}`);

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
  graphCheckedAt: graph.checkedAt,
  tasks: graph.tasks,
  teaserStatus: teaser.status,
  teaserTaskState: tasksById.get('B4')?.state ?? null,
})).digest('hex');
const inputGates = decisions
  .filter(item => item.mode === 'input-gate')
  .map(item => ({taskId: item.taskId, state: item.state, blockedBy: item.blockedBy, requiredInputs: item.requiredInputs, chair: item.chair, nextAction: item.nextAction}));
const result = {
  schemaVersion: 1,
  mode: 'automation_pulse',
  generatedAt: new Date().toISOString(),
  goalId: contract.goalId,
  goalStatus: contract.status,
  snapshotHash,
  requiresHumanDecision: decisions.some(item => ['VERIFYING', 'WAITING'].includes(item.state)),
  teaserGate: {status: teaser.status, taskId: 'B4', taskState: tasksById.get('B4')?.state ?? null},
  roleCoverage: roleCoverage.map(({id, label}) => ({id, label, status: 'present'})),
  counts,
  ready: decisions.filter(item => item.state === 'READY').map(item => item.taskId),
  verifying: decisions.filter(item => item.state === 'VERIFYING').map(item => item.taskId),
  waiting: decisions.filter(item => ['WAITING', 'BACKLOG'].includes(item.state)).map(item => item.taskId),
  inputGates,
  meetingAgenda: decisions.map(item => ({taskId: item.taskId, state: item.state, chair: item.chair, participants: item.participants, question: item.question, decision: item.decision, requiredInputs: item.requiredInputs, nextAction: item.nextAction, mode: item.mode})),
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
