import {buildApprovalRequest, canExecute, readyTasks, requiresApproval, type ApprovalRequest, type TaskNode, type TaskState} from './operations.ts';

export type MvpWorkstream = {
  id: string;
  name: string;
  lead: string;
  verifier: string;
  deliverable: string;
};

export type MvpGoalContract = {
  schemaVersion: 1;
  goalId: string;
  title: string;
  objective: string;
  status: 'ACTIVE';
  owner: string;
  successMetrics: string[];
  constraints: string[];
  stopConditions: string[];
  workstreams: MvpWorkstream[];
};

export type MvpTask = TaskNode & {
  description: string;
  output: string;
};

export type SandboxAuditEvent = {
  id: string;
  taskId: string;
  from: TaskState;
  to: TaskState;
  note: string;
  createdAt: string;
};

export type MvpApprovalReport = {
  reportId: string;
  generatedAt: string;
  goalId: string;
  goalTitle: string;
  recommendation: 'approve' | 'revise' | 'blocked';
  completedTasks: string[];
  pendingTasks: string[];
  approval?: ApprovalRequest;
  sandboxOnly: true;
};

export type MvpPlan = {
  contract: MvpGoalContract;
  tasks: MvpTask[];
};

const workstreams: MvpWorkstream[] = [
  {id: 'evidence', name: '근거·논문', lead: '연구·제품 근거', verifier: '독립 근거 검토', deliverable: '원문·조건·한계가 연결된 연구 레코드'},
  {id: 'consumer', name: '소비자 언어', lead: '마케팅·소비자심리', verifier: '표시·콘텐츠 검토', deliverable: '쉽게 읽는 요약과 적용 범위 문장'},
  {id: 'index', name: '인덱스·UX', lead: '스토리·UX·프런트', verifier: '접근성·QA', deliverable: '검색 가능한 공개 마스터 인덱스'},
  {id: 'ops', name: '운영·감사', lead: 'TF 리드·AI 비서실', verifier: '품질감사관', deliverable: '승인 보고·실행 로그·다음 작업'},
];

function normalizeGoal(input: string): string {
  return input.normalize('NFKC').replace(/\s+/g, ' ').trim().slice(0, 160);
}

function hashGoal(value: string): string {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0').toUpperCase();
}

export function generateMvpPlan(input: string): MvpPlan {
  const title = normalizeGoal(input);
  if (title.length < 8) throw new Error('목표를 8자 이상 한 문장으로 입력해 주세요.');
  const goalId = `GMVP-GABA-${hashGoal(title)}`;
  const contract: MvpGoalContract = {
    schemaVersion: 1,
    goalId,
    title,
    objective: `${title}를 승인된 공개 출처와 검토 이력으로 관리하고, 소비자가 이해할 수 있는 공개 인덱스로 배포한다.`,
    status: 'ACTIVE',
    owner: '대표·TF 리드',
    successMetrics: [
      '승인된 GABA 논문만 공개 인덱스에 포함한다.',
      '각 레코드에서 대상·조건·결과·한계·원문을 확인할 수 있다.',
      '소비자 요약과 전문가 원문 확인 흐름을 한 화면에서 연결한다.',
      '모든 실행 결과에 독립 검증자·증거·승인 상태를 남긴다.',
    ],
    constraints: [
      '연구 성분 결과를 셀핀다 완제품의 효과 보장으로 표현하지 않는다.',
      '원문과 공개 권한이 없는 자료는 공개 export에서 제외한다.',
      '샌드박스 실행은 외부 게시·구매·법적 약속을 수행하지 않는다.',
    ],
    stopConditions: [
      '출처·제품 적용 범위·권한이 확인되지 않은 자료가 공개 후보가 되는 경우',
      '치료·진단·효과 보장으로 읽힐 수 있는 문구가 검증을 통과하지 못하는 경우',
      '고위험 외부 작업에 책임자 승인이 없는 경우',
    ],
    workstreams,
  };
  const task = (partial: Omit<MvpTask, 'state' | 'evidence'> & {state?: TaskState; evidence?: string[]}): MvpTask => ({
    ...partial,
    state: partial.state ?? 'BACKLOG',
    evidence: partial.evidence ?? [],
  });
  const tasks: MvpTask[] = [
    task({id: 'G1', title: 'Goal Contract 생성·검증', description: '한 문장 목표를 운영 계약으로 구조화하고 중단 조건을 고정합니다.', output: 'Goal Contract JSON', state: 'READY', priority: 1, dependencies: [], acceptance: ['목표·지표·제약·중단 조건 생성', 'Goal ID와 책임자 지정'], lead: 'TF 리드·AI 비서실', verifier: '품질감사관', risk: 'B_INTERNAL_WRITE'}),
    task({id: 'E1', title: '공개 논문 출처 수집', description: '승인 원장에서 공개 HTTPS 원문과 연구 유형을 확인합니다.', output: '출처 연결표', priority: 1, dependencies: ['G1'], acceptance: ['공개 출처 URL 확인', '보류·철회 자료 제외'], lead: '연구·제품 근거', verifier: '독립 근거 검토', risk: 'A_READ'}),
    task({id: 'E2', title: '연구 레코드 표준화', description: '대상·표본·용량·기간·결과·한계를 같은 필드로 정리합니다.', output: '마스터 인덱스 레코드', priority: 1, dependencies: ['E1'], acceptance: ['필수 연구 필드 채움', '제품 적용 범위 분리'], lead: '연구·제품 근거', verifier: '독립 근거 검토', risk: 'B_INTERNAL_WRITE'}),
    task({id: 'C1', title: '소비자 언어·표시 검토', description: '원문을 먼저 읽지 않아도 핵심을 이해하도록 요약하고 과장을 점검합니다.', output: '소비자 요약 문안', priority: 2, dependencies: ['E2'], acceptance: ['쉽게 말하면 문장 작성', '효과 보장·치료·진단 표현 차단'], lead: '마케팅·소비자심리', verifier: '표시·콘텐츠 검토', risk: 'D_EXTERNAL_REVERSIBLE'}),
    task({id: 'Q1', title: '인덱스 화면 QA', description: '검색·필터·상세·원문 링크와 모바일 화면을 점검합니다.', output: 'QA 실행 기록', priority: 2, dependencies: ['C1'], acceptance: ['8개 연구 카드 노출', '390px 가로 넘침·콘솔 오류 없음'], lead: '스토리·UX·프런트', verifier: '접근성·QA', risk: 'C_LOW_RISK_INTERNAL'}),
    task({id: 'P1', title: '공개 인덱스 배포 승인', description: '검증 증거를 묶어 공개 배포 여부를 책임자에게 보고합니다.', output: '승인 보고서', priority: 3, dependencies: ['Q1'], acceptance: ['완료 증거와 미완료 작업 표시', '책임자 승인 없이는 외부 배포하지 않음'], lead: 'TF 리드·AI 비서실', verifier: '품질감사관', risk: 'E_EXTERNAL_COMMITMENT'}),
  ];
  return {contract, tasks};
}

export function promoteReady(tasks: readonly MvpTask[]): MvpTask[] {
  const done = new Set(tasks.filter(task => task.state === 'DONE').map(task => task.id));
  return tasks.map(task => task.state === 'BACKLOG' && task.dependencies.every(id => done.has(id)) ? {...task, state: 'READY'} : {...task});
}

export function runSandboxTask(tasks: readonly MvpTask[], taskId: string, approvalToken?: string, now = new Date().toISOString()): {tasks: MvpTask[]; events: SandboxAuditEvent[]; approval?: ApprovalRequest} {
  const source = tasks.find(task => task.id === taskId);
  if (!source) throw new Error(`작업을 찾을 수 없습니다: ${taskId}`);
  const ready = promoteReady(tasks).find(task => task.id === taskId);
  if (!ready || ready.state !== 'READY') throw new Error('선행 작업을 먼저 완료해야 합니다.');
  if (requiresApproval(ready.risk ?? 'A_READ') && !canExecute(ready.risk ?? 'A_READ', approvalToken)) {
    return {
      tasks: promoteReady(tasks),
      events: [],
      approval: buildApprovalRequest({
        action: `${ready.title}을 샌드박스 승인 대기 상태로 전환`,
        recommendation: 'approve',
        risk: ready.risk ?? 'E_EXTERNAL_COMMITMENT',
        expectedResult: ready.output,
        evidence: ready.evidence,
        expiresAt: new Date(Date.parse(now) + 24 * 60 * 60 * 1000).toISOString(),
      }),
    };
  }
  const events: SandboxAuditEvent[] = [];
  const push = (from: TaskState, to: TaskState, note: string) => events.push({id: `${taskId}-${to}-${events.length + 1}`, taskId, from, to, note, createdAt: now});
  push(ready.state, 'RUNNING', '샌드박스에서 작업을 시작했습니다.');
  push('RUNNING', 'VERIFYING', '독립 검증자가 acceptance 조건을 확인합니다.');
  push('VERIFYING', 'DONE', '검증 증거를 연결해 완료 처리했습니다.');
  const next = promoteReady(tasks.map(task => task.id === taskId ? {...task, state: 'DONE', evidence: [...task.evidence, `sandbox:${taskId}:${now}`]} : {...task}));
  return {tasks: next, events};
}

export function buildMvpApprovalReport(contract: MvpGoalContract, tasks: readonly MvpTask[], events: readonly SandboxAuditEvent[], approval?: ApprovalRequest, now = new Date().toISOString()): MvpApprovalReport {
  const completedTasks = tasks.filter(task => task.state === 'DONE').map(task => task.id);
  const pendingTasks = tasks.filter(task => task.state !== 'DONE').map(task => task.id);
  return {
    reportId: `REPORT-${contract.goalId}-${now.replace(/\D/g, '').slice(0, 14)}`,
    generatedAt: now,
    goalId: contract.goalId,
    goalTitle: contract.title,
    recommendation: approval ? 'blocked' : pendingTasks.length ? 'revise' : 'approve',
    completedTasks,
    pendingTasks,
    ...(approval ? {approval} : {}),
    sandboxOnly: true,
  };
}

export function taskGraphEdges(tasks: readonly MvpTask[]): {from: string; to: string}[] {
  return tasks.flatMap(task => task.dependencies.map(from => ({from, to: task.id})));
}

export {readyTasks};
