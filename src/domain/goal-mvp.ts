import {buildApprovalRequest, canExecute, readyTasks, requiresApproval, type ApprovalRequest, type TaskNode, type TaskState} from './operations.ts';

export type MvpWorkstream = {
  id: string;
  name: string;
  lead: string;
  verifier: string;
  deliverable: string;
};

export type MvpTeamMember = {
  id: string;
  role: string;
  responsibility: string;
  authority: string;
  verifier: boolean;
};

export type MvpDecisionProtocol = {
  cadence: string;
  steps: string[];
  record: string[];
};

export type MvpGoalContract = {
  schemaVersion: 1;
  goalId: string;
  title: string;
  objective: string;
  focusAreas: string[];
  status: 'ACTIVE';
  owner: string;
  goalType: 'PUBLISH_RESEARCH_INDEX';
  readiness: 'READY';
  successMetrics: string[];
  constraints: string[];
  stopConditions: string[];
  workstreams: MvpWorkstream[];
  team: MvpTeamMember[];
  decisionProtocol: MvpDecisionProtocol;
};

export type MvpTask = TaskNode & {
  description: string;
  output: string;
  verification?: SandboxVerificationRecord;
};

export type SandboxVerificationRecord = {
  verifier: string;
  acceptedCriteria: string[];
  evidence: string[];
  mode: 'sandbox_simulation';
  recordedAt: string;
};

export type SandboxAuditEvent = {
  id: string;
  taskId: string;
  from: TaskState;
  to: TaskState;
  note: string;
  createdAt: string;
};

export type MvpDecisionRecord = {
  id: string;
  taskId: string;
  chair: string;
  participants: string[];
  question: string;
  decision: string;
  dissent: string;
  evidence: string[];
  nextAction: string;
  state: TaskState | 'CONTRACT';
  createdAt: string;
};

export type MvpApprovalReport = {
  reportId: string;
  generatedAt: string;
  goalId: string;
  goalTitle: string;
  contractSnapshot: Pick<MvpGoalContract, 'goalId' | 'title' | 'focusAreas' | 'successMetrics' | 'constraints' | 'stopConditions'>;
  recommendation: 'approve' | 'revise' | 'blocked';
  completedTasks: string[];
  pendingTasks: string[];
  auditEvents: SandboxAuditEvent[];
  decisionRecords: MvpDecisionRecord[];
  taskEvidence: Record<string, string[]>;
  taskAcceptance: Record<string, string[]>;
  verificationRecords: Record<string, SandboxVerificationRecord>;
  verificationStatus: 'sandbox_simulation_only';
  approval?: ApprovalRequest;
  sandboxOnly: true;
};

export type MvpPlan = {
  contract: MvpGoalContract;
  tasks: MvpTask[];
};

export type SandboxRunResult = {
  tasks: MvpTask[];
  events: SandboxAuditEvent[];
  approval?: ApprovalRequest;
  approvalTaskId?: string;
};

const workstreams: MvpWorkstream[] = [
  {id: 'evidence', name: '근거·논문', lead: '연구·제품 근거', verifier: '독립 근거 검토', deliverable: '원문·조건·한계가 연결된 연구 레코드'},
  {id: 'consumer', name: '소비자 언어', lead: '마케팅·소비자심리', verifier: '표시·콘텐츠 검토', deliverable: '쉽게 읽는 요약과 적용 범위 문장'},
  {id: 'index', name: '인덱스·UX', lead: '스토리·UX·프런트', verifier: '접근성·QA', deliverable: '검색 가능한 공개 마스터 인덱스'},
  {id: 'ops', name: '운영·감사', lead: 'TF 리드·AI 비서실', verifier: '품질감사관', deliverable: '승인 보고·실행 로그·다음 작업'},
  {id: 'commerce', name: '커머스·판매처 운영', lead: '데이터·판매처 운영', verifier: '재무·QA', deliverable: '스마트스토어 목적지·주문 대사 준비와 공개 전환 조건'},
];

const team: MvpTeamMember[] = [
  {id: 'chief-of-staff', role: 'TF 리드·AI 비서실', responsibility: '목표 계약, 우선순위, 승인함, 다음 실행 결정', authority: '내부 계획·재배정', verifier: false},
  {id: 'research', role: '연구·제품 근거', responsibility: '논문 조건·수치·원문·제품 적용 범위 정리', authority: '공개 출처 조회·초안 작성', verifier: false},
  {id: 'consumer-psychology', role: '마케팅·소비자심리', responsibility: '소비자가 이해하고 체험을 고려할 문장 설계', authority: '소비자 문안 초안', verifier: false},
  {id: 'product-quality', role: '제품·품질', responsibility: '1500 제품 정보와 연구 성분을 분리 대조', authority: '제품 자료 확인 요청', verifier: false},
  {id: 'regulatory', role: '표시·규제 검토', responsibility: '치료·진단·효과 보장·권한 없는 후기 차단', authority: '공개 보류·수정 요구', verifier: false},
  {id: 'data-analytics', role: '데이터·성과', responsibility: '인덱스 완성도·유입·공유·구매 클릭을 구분 측정', authority: '분모·근거 정의', verifier: false},
  {id: 'commerce-operations', role: '데이터·판매처 운영', responsibility: '스마트스토어 목적지·SKU·주문·취소·환불 흐름을 대사할 준비', authority: '판매처 연동 자료 확인 요청', verifier: false},
  {id: 'finance-qa', role: '재무·QA', responsibility: '구매 클릭과 실제 주문·환불을 분리 검증', authority: '주문 대사 보류·재검증 요구', verifier: true},
  {id: 'story-ux', role: '스토리·UX·프런트', responsibility: '연구 탐색과 소비자 여정의 화면 구현', authority: '내부 화면 수정', verifier: false},
  {id: 'quality-auditor', role: '품질감사관', responsibility: '독립적으로 출처·계산·권한·승인·완료 증거 재검증', authority: '완료 반려·재작업 요구', verifier: true},
];

const decisionProtocol: MvpDecisionProtocol = {
  cadence: '업무 파동이 끝나거나 근거·권한·위험이 충돌할 때만 회의한다.',
  steps: ['목표·성공 기준 확인', '사실·가정·미확인 정보 분리', '역할별 의견과 반대 검토 제출', '대안·위험·비용 비교', '실행안과 승인 필요 여부 결정', '결과 측정 후 재계획'],
  record: ['결정사항', '판단 근거·출처', '반대 의견', '담당자·기한', '예상 결과·실제 결과', '다음 조치'],
};

function normalizeGoal(input: string): string {
  return input.normalize('NFKC').replace(/\s+/g, ' ').trim().slice(0, 160);
}

function inferFocusAreas(title: string): string[] {
  const source = title.toLocaleLowerCase('ko-KR');
  const focus: string[] = [];
  if (/스트레스|긴장|휴식/.test(source)) focus.push('스트레스·휴식');
  if (/수면|잠|숙면/.test(source)) focus.push('수면');
  if (/성장호르몬|성장/.test(source)) focus.push('성장호르몬');
  if (/근육|운동|회복/.test(source)) focus.push('근육·운동');
  if (/제품|구매|판매|스마트스토어|후기/.test(source)) focus.push('제품·커머스');
  if (/논문|연구|근거|인덱스|마스터/.test(source)) focus.push('공개 근거 인덱스');
  return focus.length ? focus : ['GABA 공개 인덱스'];
}

function hashGoal(value: string): string {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0').toUpperCase();
}

function decisionId(taskId: string, now: string) {
  return `DEC-${taskId}-${now.replace(/\D/g, '').slice(0, 14)}`;
}

export function buildContractDecision(contract: MvpGoalContract, now = new Date().toISOString()): MvpDecisionRecord {
  return {
    id: decisionId('CONTRACT', now),
    taskId: 'CONTRACT',
    chair: contract.owner,
    participants: contract.team.map(member => member.role),
    question: '이 목표를 공개용 GABA 인덱스 운영 파동으로 전환할 수 있는가?',
    decision: '조건부 진행: 승인 원장·소비자 문장·독립 검증을 통과한 자료만 공개한다.',
    dissent: '연구 결과를 셀핀다 가바 완제품 효과나 실제 구매 성과로 확대 해석하지 않는다.',
    evidence: ['Goal Contract', '공개 연구 마스터 인덱스 필수 필드 계약'],
    nextAction: 'G1 Goal Contract 생성·검증을 샌드박스에서 시작한다.',
    state: 'CONTRACT',
    createdAt: now,
  };
}

export function buildTaskDecision(contract: MvpGoalContract, task: MvpTask, now = new Date().toISOString()): MvpDecisionRecord {
  const decision = task.state === 'WAITING'
    ? '책임자 승인 전까지 외부 약속 단계 실행을 멈춘다.'
    : task.state === 'DONE'
    ? task.verification?.mode === 'sandbox_simulation'
      ? '독립 검증 단계 시뮬레이션이 수락 기준과 증거 묶음을 기록해 다음 작업을 연다. 실제 운영 승인은 별도 검증이 필요하다.'
      : '독립 검증자가 수락 기준과 증거를 확인해 다음 작업을 연다.'
      : task.state === 'VERIFYING'
        ? '샌드박스 산출물을 독립 검증 단계로 넘긴다.'
        : '내부 샌드박스에서 다음 작업을 진행한다.';
  const nextAction = task.state === 'DONE'
    ? '의존 작업의 실행 가능 상태를 갱신한다.'
    : task.state === 'WAITING'
      ? '승인자·위험·만료를 확인한 뒤 승인 또는 보류한다.'
      : '검증 증거를 연결하고 품질감사관의 판정을 기다린다.';
  return {
    id: `${decisionId(task.id, now)}-${task.state}`,
    taskId: task.id,
    chair: contract.owner,
    participants: [task.lead, task.verifier],
    question: `${task.title}을 다음 단계로 넘길 수 있는가?`,
    decision,
    dissent: task.risk === 'E_EXTERNAL_COMMITMENT' ? '외부 공개·구매·법적 약속은 책임자 승인 전 실행하지 않는다.' : '근거·제품 적용 범위·표시 한계를 확인하지 못하면 재작업으로 돌린다.',
    evidence: [...task.evidence],
    nextAction,
    state: task.state,
    createdAt: now,
  };
}

export function generateMvpPlan(input: string): MvpPlan {
  const title = normalizeGoal(input);
  if (title.length < 8) throw new Error('목표를 8자 이상 한 문장으로 입력해 주세요.');
  const goalId = `GMVP-GABA-${hashGoal(title)}`;
  const focusAreas = inferFocusAreas(title);
  const contract: MvpGoalContract = {
    schemaVersion: 1,
    goalId,
    title,
    objective: `${title}를 승인된 공개 출처와 검토 이력으로 관리하고, 소비자가 이해할 수 있는 공개 인덱스로 배포한다.`,
    focusAreas,
    status: 'ACTIVE',
    owner: '대표·TF 리드',
    goalType: 'PUBLISH_RESEARCH_INDEX',
    readiness: 'READY',
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
    team,
    decisionProtocol,
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
    task({id: 'P1', title: '공개 인덱스·판매처 전환 승인', description: '검증 증거를 묶어 공개 배포와 스마트스토어 전환 조건을 책임자에게 보고합니다.', output: '승인 보고서·판매처 전환 조건', priority: 3, dependencies: ['Q1'], acceptance: ['완료 증거와 미완료 작업 표시', '책임자 승인 없이는 외부 배포하지 않음'], lead: '데이터·판매처 운영', verifier: '재무·QA', risk: 'E_EXTERNAL_COMMITMENT'}),
  ];
  return {contract, tasks};
}

export function promoteReady(tasks: readonly MvpTask[]): MvpTask[] {
  const done = new Set(tasks.filter(task => task.state === 'DONE').map(task => task.id));
  return tasks.map(task => task.state === 'BACKLOG' && task.dependencies.every(id => done.has(id)) ? {...task, state: 'READY'} : {...task});
}

export function runSandboxTask(tasks: readonly MvpTask[], taskId: string, approvalToken?: string, now = new Date().toISOString()): SandboxRunResult {
  const source = tasks.find(task => task.id === taskId);
  if (!source) throw new Error(`작업을 찾을 수 없습니다: ${taskId}`);
  const promoted = promoteReady(tasks);
  const promotedTask = promoted.find(task => task.id === taskId);
  const approvalResume = source.state === 'WAITING' && requiresApproval(source.risk ?? 'A_READ') && canExecute(source.risk ?? 'A_READ', approvalToken);
  const ready = approvalResume ? source : promotedTask;
  if (!ready || (!approvalResume && ready.state !== 'READY')) {
    if (source.state === 'WAITING') throw new Error('책임자 승인 후 다시 실행해야 합니다.');
    throw new Error('선행 작업을 먼저 완료해야 합니다.');
  }
  if (requiresApproval(ready.risk ?? 'A_READ') && !canExecute(ready.risk ?? 'A_READ', approvalToken)) {
    return {
      tasks: promoted.map(task => task.id === taskId ? {...task, state: 'WAITING'} : task),
      events: [],
      approval: buildApprovalRequest({
        action: `${ready.title}을 샌드박스 승인 대기 상태로 전환`,
        recommendation: 'approve',
        risk: ready.risk ?? 'E_EXTERNAL_COMMITMENT',
        expectedResult: ready.output,
        evidence: ready.evidence,
        expiresAt: new Date(Date.parse(now) + 24 * 60 * 60 * 1000).toISOString(),
      }),
      approvalTaskId: taskId,
    };
  }
  const events: SandboxAuditEvent[] = [];
  const push = (from: TaskState, to: TaskState, note: string) => events.push({id: `${taskId}-${to}-${events.length + 1}`, taskId, from, to, note, createdAt: now});
  if (approvalResume) push('WAITING', 'READY', '책임자 승인을 확인해 작업을 다시 실행 가능 상태로 전환했습니다.');
  push(approvalResume ? 'READY' : ready.state, 'RUNNING', '샌드박스에서 작업을 시작했습니다.');
  push('RUNNING', 'VERIFYING', '샌드박스 산출물을 만들었습니다. 품질감사관의 독립 검증을 기다립니다.');
  const next = tasks.map(task => task.id === taskId ? {...task, state: 'VERIFYING' as const, evidence: [...task.evidence, `sandbox-output:${taskId}:${now}`]} : {...task});
  return {tasks: next, events};
}

export function verifySandboxTask(tasks: readonly MvpTask[], taskId: string, now = new Date().toISOString()): {tasks: MvpTask[]; events: SandboxAuditEvent[]} {
  const source = tasks.find(task => task.id === taskId);
  if (!source) throw new Error(`작업을 찾을 수 없습니다: ${taskId}`);
  if (source.state !== 'VERIFYING') throw new Error('샌드박스 산출물을 먼저 만든 뒤 독립 검증을 기록해야 합니다.');
  if (source.evidence.length === 0) throw new Error('검증할 증거가 없습니다.');
  const events: SandboxAuditEvent[] = [{id: `${taskId}-DONE-1`, taskId, from: 'VERIFYING', to: 'DONE', note: `${source.verifier}의 독립 검증 단계 시뮬레이션으로 수락 기준과 샌드박스 증거 묶음을 기록했습니다. 실제 운영 검증을 의미하지 않습니다.`, createdAt: now}];
  const verification: SandboxVerificationRecord = {
    verifier: source.verifier,
    acceptedCriteria: [...source.acceptance],
    evidence: [...source.evidence],
    mode: 'sandbox_simulation',
    recordedAt: now,
  };
  const next = promoteReady(tasks.map(task => task.id === taskId ? {...task, state: 'DONE' as const, evidence: [...task.evidence, `independent-review:${taskId}:${now}`], verification} : {...task}));
  return {tasks: next, events};
}

export function buildMvpApprovalReport(contract: MvpGoalContract, tasks: readonly MvpTask[], events: readonly SandboxAuditEvent[], approval?: ApprovalRequest, now = new Date().toISOString(), decisions: readonly MvpDecisionRecord[] = []): MvpApprovalReport {
  const completedTasks = tasks.filter(task => task.state === 'DONE').map(task => task.id);
  const pendingTasks = tasks.filter(task => task.state !== 'DONE').map(task => task.id);
  return {
    reportId: `REPORT-${contract.goalId}-${now.replace(/\D/g, '').slice(0, 14)}`,
    generatedAt: now,
    goalId: contract.goalId,
    goalTitle: contract.title,
    contractSnapshot: {
      goalId: contract.goalId,
      title: contract.title,
      focusAreas: [...contract.focusAreas],
      successMetrics: [...contract.successMetrics],
      constraints: [...contract.constraints],
      stopConditions: [...contract.stopConditions],
    },
    recommendation: approval ? 'blocked' : pendingTasks.length ? 'revise' : 'approve',
    completedTasks,
    pendingTasks,
    auditEvents: [...events],
    decisionRecords: [...decisions],
    taskEvidence: Object.fromEntries(tasks.map(task => [task.id, [...task.evidence]])),
    taskAcceptance: Object.fromEntries(tasks.map(task => [task.id, [...task.acceptance]])),
    verificationRecords: Object.fromEntries(tasks.flatMap(task => task.verification ? [[task.id, {...task.verification, acceptedCriteria: [...task.verification.acceptedCriteria], evidence: [...task.verification.evidence]}] as const] : [])),
    verificationStatus: 'sandbox_simulation_only',
    ...(approval ? {approval} : {}),
    sandboxOnly: true,
  };
}

export function taskGraphEdges(tasks: readonly MvpTask[]): {from: string; to: string}[] {
  return tasks.flatMap(task => task.dependencies.map(from => ({from, to: task.id})));
}

export {readyTasks};
