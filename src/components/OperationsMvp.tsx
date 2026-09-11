import {useEffect, useMemo, useState} from 'react';
import {ArrowRight, CheckCircle2, Clipboard, Download, LockKeyhole, Play, RotateCcw, ShieldCheck} from 'lucide-react';
import {buildMvpApprovalReport, buildTaskDecision, recordHumanDissent, recordIndependentReview, runSandboxTask, runSandboxWave, startMvpSession, taskGraphEdges, type MvpApprovalReport, type MvpDecisionRecord, type MvpPlan, type SandboxAuditEvent} from '../domain/goal-mvp';
import {apiEndpoint} from '../api-origin';
import './OperationsMvp.css';

const defaultGoal = '공개용 GABA 논문 기반 마스터 인덱스';
const stateLabels: Record<string, string> = {BACKLOG: '대기', READY: '실행 가능', RUNNING: '실행 중', VERIFYING: '검증 중', DONE: '완료', WAITING: '승인 대기', REWORK: '보완 필요', EXPIRED: '만료', RETRY: '재시도', FAILED: '실패', CANCELLED: '취소'};
const riskLabels: Record<string, string> = {A_READ: '읽기', B_INTERNAL_WRITE: '내부 작성', C_LOW_RISK_INTERNAL: '내부 실행', D_EXTERNAL_REVERSIBLE: '외부 가역', E_EXTERNAL_COMMITMENT: '책임자 승인'};
const localAuditStatusLabels: Record<string, string> = {MET: '확인됨', WAITING: '입력 대기', INVALID: '재검토 필요'};
const continuationLabels: Record<string, string> = {close: '종료 조건 확인', 'human-gate-monitor': '사람 판단 대기 감시', 'continue-execution': '실행 가능한 작업 계속', 'reassess-next-cycle': '다음 pulse 재평가'};
const formatTime = (value: string) => new Date(value).toLocaleString('ko-KR', {dateStyle: 'short', timeStyle: 'short'});
function pulseFreshness(value: string) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return '시간 확인 필요';
  const age = Date.now() - timestamp;
  if (age < 0) return '시간 확인 필요';
  if (age > 8 * 60 * 60 * 1000) return '업데이트 지연';
  if (age < 60 * 1000) return '방금 갱신';
  return `${Math.floor(age / 60_000)}분 전 갱신`;
}
const storageKey = 'cellpinda:ops-mvp:v2';

type StoredOpsState = {
  input?: string;
  plan?: MvpPlan | null;
  audit?: SandboxAuditEvent[];
  approval?: MvpApprovalReport['approval'];
  approvalTaskId?: string;
  decisions?: MvpDecisionRecord[];
  runId?: string;
  runKey?: string;
};

type ServerOpsResponse = {state?: StoredOpsState; serverPersisted?: boolean; revision?: number};
type DecisionOption = {id: string; label: string; criteria: string[]};
type QueueTask = {id: string; stream: string; title: string; state: string; lead: string; verifier: string; decision: string; decisionMode: string; nextAction: string; decisionOptions?: DecisionOption[]; blockedBy?: string; requiredInputs?: string[]; dependencies: string[]};
type RoleCoverage = {id: string; label: string; status: string};
type ContinuationLoop = {mode: string; cadenceHours: number; nextReviewAt: string; nextAction: string};
type MeetingProtocol = {cadence: string; quorum: string; record: string[]};
type QueueSnapshot = {schemaVersion: number; goalId: string; status: string; checkedAt: string; pulse?: {generatedAt: string; snapshotHash: string; stateChanged: boolean; requiresHumanDecision: boolean; continuation?: ContinuationLoop; meetingProtocol?: MeetingProtocol; activeTasks: number; inputGates: number}; roleCoverage?: RoleCoverage[]; workstreams: {id: string; name: string; lead: string; verifier: string; status: string; nextAction: string}[]; tasks: QueueTask[]};
type GoalAuditGate = {id: string; title: string; state: string; lead: string; verifier: string; requiredInputs: string[]; decision: string; decisionMode: string; nextAction: string; decisionOptions: DecisionOption[]};
type GoalAuditSnapshot = {schemaVersion: number; mode: string; goalId: string; title: string; status: string; overallStatus: string; checkedAt: string; taskCounts: Record<string, number>; milestones: {masterIndex: {status: string; claims: number; researchRecords: number}; publicProduct: {status: string; products: number; smartStoreOnly: boolean; removed750: boolean}; tfPulse: {status: string; generatedAt: string; snapshotHash: string; stateChanged: boolean; requiresHumanDecision: boolean; continuation?: ContinuationLoop}}; gates: GoalAuditGate[]; teaserGate: {status: string; taskId: string; taskState: string | null}};
type LocalAuditSnapshot = {schemaVersion: number; mode: string; generatedAt: string | null; goalId: string | null; goalStatus: string | null; overallStatus: string | null; coreValid: boolean; localStateChanged: boolean; localSnapshotHash: string | null; previousLocalSnapshotHash: string | null; taskCounts: Record<string, number>; pulseHealth: {generatedAt: string | null; snapshotHash: string | null; status: string; ageMinutes: number | null}; localInputAudit: {enabled: boolean; materials: {found: number; missing: number; finishedProductCandidates: number; b2Candidate: boolean; excludedBulkMaterial: number; latestSourceModifiedAt: string | null} | null; orders: {counters: {filesScanned?: number; csvFiles?: number; csvParsed?: number; xlsxFiles?: number; xlsxEncrypted?: number; xlsxUnparsed?: number; unsupported?: number}; gaba1500: {rows: number; quantity: number; firstDate: string | null; lastDate: string | null} | null; gaba750: {rows: number; quantity: number; firstDate: string | null; lastDate: string | null} | null; channelAssessment: string | {smartstoreNamedFiles?: number; smartstoreNamedFilesParsed?: number; conclusion?: string | null} | null; latestSourceModifiedAt: string | null} | null; interpretation: string | null}; checks: {id: string; status: string; detail: string; blockers: string[]}[]; privacyBoundary: string};
const publicBase = import.meta.env.BASE_URL;
const localAuditEndpoint = import.meta.env.DEV ? apiEndpoint('/api/ops/local-audit') : null;

function taskStateLabel(task: MvpPlan['tasks'][number]) {
  if (task.state === 'DONE' && task.verification?.mode === 'sandbox_simulation') return '샌드박스 완료';
  return stateLabels[task.state] || task.state;
}

function clientUuid() {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : '';
}

function loadStoredState(): StoredOpsState {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) as StoredOpsState : {};
  } catch { return {}; }
}

function normalizeStoredPlan(plan: MvpPlan | null | undefined): MvpPlan | null {
  if (!plan || !plan.contract || !Array.isArray(plan.tasks)) return null;
  const focusAreas = Array.isArray(plan.contract.focusAreas) && plan.contract.focusAreas.length ? plan.contract.focusAreas : ['GABA 공개 인덱스'];
  return {...plan, contract: {...plan.contract, focusAreas}, tasks: plan.tasks.map(task => ({...task, evidence: Array.isArray(task.evidence) ? task.evidence : [], dependencies: Array.isArray(task.dependencies) ? task.dependencies : [], acceptance: Array.isArray(task.acceptance) ? task.acceptance : []}))};
}

function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}

export default function OperationsMvp() {
  const [stored] = useState(loadStoredState);
  const hasPersistedState = Boolean(stored.plan || stored.audit?.length || stored.approval || stored.decisions?.length);
  const [input, setInput] = useState(stored.input || defaultGoal);
  const [plan, setPlan] = useState<MvpPlan | null>(() => normalizeStoredPlan(stored.plan));
  const [audit, setAudit] = useState<SandboxAuditEvent[]>(stored.audit || []);
  const [approval, setApproval] = useState<MvpApprovalReport['approval']>(stored.approval);
  const [approvalTaskId, setApprovalTaskId] = useState(stored.approvalTaskId || '');
  const [decisions, setDecisions] = useState<MvpDecisionRecord[]>(stored.decisions || []);
  const [runId, setRunId] = useState(stored.runId || clientUuid());
  const [runKey, setRunKey] = useState(stored.runKey || clientUuid());
  const [serverRevision, setServerRevision] = useState(0);
  const [serverState, setServerState] = useState<'checking' | 'saved' | 'local'>('checking');
  const [queue, setQueue] = useState<QueueSnapshot | null>(null);
  const [goalAudit, setGoalAudit] = useState<GoalAuditSnapshot | null>(null);
  const [queueError, setQueueError] = useState('');
  const [queueLoadedAt, setQueueLoadedAt] = useState('');
  const [localAudit, setLocalAudit] = useState<LocalAuditSnapshot | null>(null);
  const [localAuditError, setLocalAuditError] = useState('');
  const [queueRefresh, setQueueRefresh] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [reviewTaskId, setReviewTaskId] = useState('');
  const [reviewCriteria, setReviewCriteria] = useState<string[]>([]);
  const [reviewEvidence, setReviewEvidence] = useState('');
  const [reviewNote, setReviewNote] = useState('');
  const [dissentTaskId, setDissentTaskId] = useState('');
  const [dissentNote, setDissentNote] = useState('');
  const edges = useMemo(() => plan ? taskGraphEdges(plan.tasks) : [], [plan]);
  const report = useMemo(() => plan ? buildMvpApprovalReport(plan.contract, plan.tasks, audit, approval, new Date().toISOString(), decisions) : null, [plan, audit, approval, decisions]);
  const attentionQueue = useMemo(() => queue?.tasks.filter(task => !['DONE', 'CANCELLED'].includes(task.state)) ?? [], [queue]);

  useEffect(() => {
    let active = true;
    const refresh = () => Promise.all([
      fetch(`${publicBase}data/operations-queue.json?refresh=${Date.now()}`),
      fetch(`${publicBase}data/goal-audit.json?refresh=${Date.now()}`),
    ]).then(async ([queueResponse, auditResponse]) => {
      if (!queueResponse.ok || !auditResponse.ok) throw new Error('public operations snapshot unavailable');
      const [snapshot, audit] = await Promise.all([queueResponse.json() as Promise<QueueSnapshot>, auditResponse.json() as Promise<GoalAuditSnapshot>]);
      if (active) { setQueue(snapshot); setGoalAudit(audit); setQueueError(''); setQueueLoadedAt(new Date().toISOString()); }
    }).catch(() => {
      if (active) setQueueError('공개 운영 스냅샷을 새로 읽지 못했습니다. 마지막으로 확인된 큐를 유지하고 다시 시도합니다.');
    });
    void refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => { active = false; window.clearInterval(timer); };
  }, [queueRefresh]);

  useEffect(() => {
    let active = true;
    if (!localAuditEndpoint) return () => { active = false; };
    const refresh = () => fetch(`${localAuditEndpoint}?refresh=${Date.now()}`).then(async response => {
      if (response.status === 404) throw new Error('missing');
      if (!response.ok) throw new Error('unavailable');
      const snapshot = await response.json() as LocalAuditSnapshot;
      if (snapshot.mode !== 'private_local_audit' || snapshot.goalId !== 'GL-2026-CELL-GABA-001') throw new Error('invalid');
      if (active) { setLocalAudit(snapshot); setLocalAuditError(''); }
    }).catch(error => {
      if (!active) return;
      setLocalAuditError(error instanceof Error && error.message === 'missing' ? '로컬 감사 스냅샷이 없습니다. 터미널에서 pnpm run audit:watch를 실행하면 750ms 감시 주기로 갱신됩니다.' : '로컬 감사 스냅샷을 읽지 못했습니다. 마지막으로 확인된 요약을 유지하고 다시 시도합니다.');
    });
    void refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => { active = false; window.clearInterval(timer); };
  }, [queueRefresh]);

  useEffect(() => {
    try { window.localStorage.setItem(storageKey, JSON.stringify({input, plan, audit, approval, approvalTaskId, decisions, runId, runKey} satisfies StoredOpsState)); }
    catch { /* private browsing or quota limits should not block the sandbox */ }
  }, [input, plan, audit, approval, approvalTaskId, decisions, runId, runKey]);

  useEffect(() => {
    let active = true;
    async function hydrateFromServer() {
      // A brand-new browser session has no server record yet. Skipping the
      // guaranteed 404 keeps the static Pages fallback quiet; the debounced
      // PUT below creates the record once a plan is generated.
      const endpoint = apiEndpoint(`/api/ops/runs/${runId}`);
      if (!endpoint || !hasPersistedState || !runId || !runKey) { if (active) { setServerState('local'); setHydrated(true); } return; }
      try {
        const response = await fetch(endpoint, {headers: {'x-ops-run-key': runKey}});
        if (!response.ok) { if (active) setServerState('local'); return; }
        const payload = await response.json() as ServerOpsResponse;
        const remote = payload.state;
        if (active && remote && typeof remote === 'object') {
          if (typeof remote.input === 'string') setInput(remote.input);
          if (remote.plan !== undefined) setPlan(normalizeStoredPlan(remote.plan));
          if (Array.isArray(remote.audit)) setAudit(remote.audit);
          if (remote.approval !== undefined) setApproval(remote.approval);
          if (typeof remote.approvalTaskId === 'string') setApprovalTaskId(remote.approvalTaskId);
          if (Array.isArray(remote.decisions)) setDecisions(remote.decisions);
          const remoteRevision = payload.revision;
          if (typeof remoteRevision === 'number' && Number.isInteger(remoteRevision) && remoteRevision >= 0) setServerRevision(remoteRevision);
          setServerState(payload.serverPersisted ? 'saved' : 'local');
        }
      } catch { if (active) setServerState('local'); }
      finally { if (active) setHydrated(true); }
    }
    void hydrateFromServer();
    return () => { active = false; };
  }, [hasPersistedState, runId, runKey]);

  useEffect(() => {
    if (!hydrated || !runId || !runKey) return;
    const endpoint = apiEndpoint(`/api/ops/runs/${runId}`);
    if (!endpoint) { setServerState('local'); return; }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      const state: StoredOpsState = {input, plan, audit, approval, approvalTaskId, decisions};
      void fetch(endpoint, {
        method: 'PUT',
        headers: {'content-type': 'application/json', 'x-ops-run-key': runKey, 'x-ops-revision': String(serverRevision)},
        body: JSON.stringify(state),
        signal: controller.signal,
      }).then(async response => {
        if (response.status === 409) {
          setMessage('서버에 최신 샌드박스 상태가 있어 자동 덮어쓰기를 멈췄습니다. 새로고침으로 최신 상태를 확인하세요.');
          throw new Error('server persistence conflict');
        }
        if (!response.ok) throw new Error('server persistence unavailable');
        const payload = await response.json() as ServerOpsResponse;
        const savedRevision = payload.revision;
        if (typeof savedRevision === 'number' && Number.isInteger(savedRevision) && savedRevision >= 0) setServerRevision(savedRevision);
        setServerState('saved');
      })
        .catch(() => { if (!controller.signal.aborted) setServerState('local'); });
    }, 350);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [input, plan, audit, approval, approvalTaskId, decisions, hydrated, runId, runKey]);

  function createPlan(event: React.FormEvent) {
    event.preventDefault();
    try {
      const session = startMvpSession(input, new Date().toISOString(), {autoVerify: false});
      setRunId(clientUuid()); setRunKey(clientUuid()); setServerRevision(0);
      setPlan(session.plan); setAudit(session.audit); setApproval(session.approval); setApprovalTaskId(session.approvalTaskId || ''); setDecisions(session.decisions); setReviewTaskId(''); setReviewCriteria([]); setReviewEvidence(''); setReviewNote(''); setDissentTaskId(''); setDissentNote(''); setMessage(session.stoppedReason === 'verification_required' ? `${session.progressedTaskIds.length}개 업무를 실행했습니다. ${session.progressedTaskIds[0] || '첫 업무'}의 독립 검증자 판정을 기다립니다.` : `${session.progressedTaskIds.length}개 내부 업무를 자동 실행하고 ${session.approvalTaskId || '다음 단계'}에서 책임자 승인 대기로 멈췄습니다.`); setCopied(false);
    } catch (error) { setMessage(error instanceof Error ? error.message : '목표를 생성하지 못했습니다.'); }
  }

  function execute(taskId: string, token?: string) {
    if (!plan) return;
    try {
      const now = new Date().toISOString();
      const result = runSandboxTask(plan.tasks, taskId, token, now);
      const decidedTask = result.tasks.find(task => task.id === taskId);
      if (decidedTask) setDecisions(items => [...items, buildTaskDecision(plan.contract, decidedTask, now)]);
      if (result.approval) {
        setApproval(result.approval); setApprovalTaskId(result.approvalTaskId || taskId); setPlan({...plan, tasks: result.tasks}); setMessage('외부 약속 단계는 승인 전까지 실행하지 않습니다. 승인 보고서를 확인하세요.');
        return;
      }
      setPlan({...plan, tasks: result.tasks}); setAudit(items => [...items, ...result.events]); setApproval(undefined); setApprovalTaskId(''); setMessage(`${taskId} 작업의 샌드박스 상태 전환을 기록했습니다. 실제 외부 결과·독립 검증은 별도 단계입니다.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : '샌드박스 실행에 실패했습니다.'); }
  }

  function openReview(taskId: string) {
    const task = plan?.tasks.find(item => item.id === taskId);
    if (!task) return;
    setReviewTaskId(taskId);
    setReviewCriteria([]);
    setReviewEvidence(task.evidence.join('\n'));
    setReviewNote('');
  }

  function review(taskId: string, decision: 'accept' | 'rework') {
    if (!plan) return;
    try {
      const task = plan.tasks.find(item => item.id === taskId);
      if (!task) return;
      const now = new Date().toISOString();
      const evidenceReferences = reviewEvidence.split(/\r?\n/).map(item => item.trim()).filter(Boolean);
      const result = recordIndependentReview(plan.tasks, taskId, {verifier: task.verifier, acceptedCriteria: reviewCriteria, evidenceReferences, note: reviewNote, decision}, now);
      const decidedTask = result.tasks.find(item => item.id === taskId);
      if (decidedTask) setDecisions(items => [...items, buildTaskDecision(plan.contract, decidedTask, now)]);
      setPlan({...plan, tasks: result.tasks}); setAudit(items => [...items, ...result.events]); setReviewTaskId(''); setReviewCriteria([]); setReviewEvidence(''); setReviewNote(''); setMessage(decision === 'accept' ? `${taskId} 독립 검토 판정을 기록했습니다. 다음 선행 작업을 열 수 있습니다.` : `${taskId} 보완 요청을 기록했습니다. 담당자가 수정한 뒤 다시 실행해야 합니다.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : '독립 검토 기록에 실패했습니다.'); }
  }

  function runAutonomousWave() {
    if (!plan) return;
    try {
      const result = runSandboxWave(plan.contract, plan.tasks, new Date().toISOString(), {autoVerify: false});
      setPlan({...plan, tasks: result.tasks});
      setAudit(items => [...items, ...result.events]);
      setDecisions(items => [...items, ...result.decisions]);
      // A repeated wave can encounter the same persisted WAITING task. Keep
      // its existing approval packet so we never save an orphan WAITING node.
      const retainedApproval = result.approval ?? approval;
      const retainedApprovalTaskId = result.approvalTaskId ?? approvalTaskId;
      if (retainedApproval) {
        setApproval(retainedApproval); setApprovalTaskId(retainedApprovalTaskId || '');
        setMessage(`${result.progressedTaskIds.length}개 내부 업무를 자동 실행하고 ${retainedApprovalTaskId || '승인 단계'}에서 책임자 승인 대기로 멈췄습니다.`);
      } else {
        setApproval(undefined); setApprovalTaskId('');
        setMessage(`${result.progressedTaskIds.length}개 업무를 자동 실행했습니다. ${result.stoppedReason === 'verification_required' ? '독립 검증자 판정을 입력하면 다음 업무를 엽니다.' : result.stoppedReason === 'completed' ? '모든 샌드박스 업무가 완료되었습니다.' : '새 실행 가능 업무가 생기면 다음 파동에서 이어갑니다.'}`);
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : '자동 협업 파동 실행에 실패했습니다.'); }
  }

  function copyReport() {
    if (!report) return;
    void navigator.clipboard?.writeText(JSON.stringify(report, null, 2)).then(() => { setCopied(true); setMessage('승인 보고서 JSON을 복사했습니다.'); }).catch(() => setMessage('복사 권한이 없어 다운로드를 이용해 주세요.'));
  }

  function recordDissent() {
    if (!dissentTaskId) return;
    try {
      const now = new Date().toISOString();
      setDecisions(items => recordHumanDissent(items, dissentTaskId, dissentNote, now));
      setDissentNote('');
      setDissentTaskId('');
      setMessage(`${dissentTaskId} 회의 의견을 기록했습니다. 다음 pulse에서 다시 검토합니다.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : '회의 의견 기록에 실패했습니다.'); }
  }

  const reportLabel = report?.recommendation === 'approve'
    ? '운영 승인 가능'
    : report?.recommendation === 'blocked'
      ? '승인 대기'
      : report && report.completedTasks.length > 0
        ? report.independentlyVerifiedTasks.length > 0
          ? '독립 검토 기록 · 추가 확인 필요'
          : '샌드박스 확인 · 실제 검증 필요'
        : '추가 작업 필요';

  return <main className="ops-mvp">
    <header className="ops-mvp-header wrap">
      <div><p className="chapter">Cellpinda Operating MVP</p><h1>문서를 읽는 조직에서,<br />실제로 일하는 조직으로.</h1><p>한 문장 목표를 계약·TF·업무 그래프·검증 보고서로 바꾸는 공개용 GABA 논문 인덱스 운영 화면입니다.</p></div>
      <div className="ops-mvp-header-actions"><a className="button outline" href={`${publicBase}#research`}>공개 연구 라이브러리 <ArrowRight size={17}/></a><a className="text-link" href={publicBase}>사이트로 돌아가기</a></div>
    </header>
    <section className="ops-mvp-sandbox wrap" aria-labelledby="ops-mvp-heading">
      <div className="ops-mvp-sandbox-label"><LockKeyhole size={18}/> 내부 샌드박스 · 외부 게시·구매·법적 약속을 실행하지 않음 <span className="ops-mvp-persistence-status">· {serverState === 'saved' ? '서버 저장됨' : serverState === 'checking' ? '서버 상태 확인 중' : '브라우저 임시 저장'}</span></div>
      <form className="ops-mvp-goal" onSubmit={createPlan}>
        <label htmlFor="mvp-goal"><strong id="ops-mvp-heading">한 문장 목표 입력</strong><span>목표가 구체적일수록 검토·완료 조건이 명확해집니다.</span></label>
        <textarea id="mvp-goal" value={input} onChange={event => setInput(event.target.value)} rows={3} maxLength={160} />
        <div className="ops-mvp-form-row"><small>{input.length}/160자</small><button className="button" type="submit">Goal Contract 자동 생성 <ArrowRight size={18}/></button></div>
      </form>
      {message ? <p className="ops-mvp-message" role="status">{message}</p> : null}
    </section>
    {!queue && queueError ? <p className="ops-mvp-live-error wrap" role="status">{queueError} 마지막 성공 읽기 시각은 확인할 수 없습니다.</p> : null}
    {queue ? <section className="ops-mvp-live-queue wrap" aria-labelledby="live-queue-heading">
      <div className="ops-mvp-live-queue-head"><div><p className="chapter">현재 운영 큐</p><h2 id="live-queue-heading">지금 누가 무엇을 기다리고 있나요?</h2><p className="ops-mvp-live-queue-description">저장소의 canonical 업무 그래프입니다. 아래에서 생성하는 Goal Contract 샌드박스는 이 운영 큐를 대신하지 않고 별도 실행·검증을 재현합니다.</p></div><div><span className="ops-mvp-live-queue-goal">{queue.goalId}</span><strong>{queue.status}</strong><button className="text-link" type="button" onClick={() => setQueueRefresh(value => value + 1)}>새로고침 ↻</button><a className="text-link" href={`${publicBase}data/tf-pulse.json`} target="_blank" rel="noreferrer">회의 안건 JSON ↗</a><a className="text-link" href={`${publicBase}data/goal-audit.json`} target="_blank" rel="noreferrer">목표 감사 JSON ↗</a></div></div>
      {queueError ? <p className="ops-mvp-live-error" role="status">{queueError}{queueLoadedAt ? ` 마지막 성공 읽기 · ${formatTime(queueLoadedAt)}` : ' 마지막 성공 읽기 시각은 확인할 수 없습니다.'}</p> : null}
      <div className="ops-mvp-live-streams" aria-label="스트림별 현재 상태">{queue.workstreams.map(stream => <span key={stream.id}><strong>{stream.name}</strong><em>{stream.status}</em><small>{stream.nextAction}</small></span>)}</div>
      {queue.pulse?.meetingProtocol ? <div className="ops-mvp-live-protocol" aria-label="TF 회의 운영 규칙"><div><span className="ops-mvp-eyebrow">이번 TF 회의 운영 규칙</span><p>자동 pulse가 안건을 만들고, 아래 정족수와 기록 규칙을 충족한 판단만 다음 상태로 연결합니다.</p></div><dl><div><dt>정족수</dt><dd>{queue.pulse.meetingProtocol.quorum}</dd></div><div><dt>회의 주기</dt><dd>{queue.pulse.meetingProtocol.cadence}</dd></div><div><dt>남길 기록</dt><dd>{queue.pulse.meetingProtocol.record.join(' · ')}</dd></div></dl></div> : null}
      {queue.roleCoverage?.length ? <div className="ops-mvp-live-roles" aria-label="현재 TF 역할군"><div><span className="ops-mvp-eyebrow">현재 TF 역할군</span><p>이번 pulse가 그래프에서 확인한 교차 검토 책임입니다.</p></div><ul>{queue.roleCoverage.map(role => <li key={role.id}><strong>{role.label}</strong><span>{role.status === 'present' ? '참여 책임 확인' : role.status}</span></li>)}</ul></div> : null}
      <div className="ops-mvp-live-queue-grid" aria-label="업무별 현재 상태">{queue.tasks.map(task => <article key={task.id}><div><strong>{task.id}</strong><span>{stateLabels[task.state] || task.state}</span></div><h3>{task.title}</h3><p className="ops-mvp-live-decision">{task.decision}</p><small>담당 {task.lead} · 독립 검증 {task.verifier}</small>{task.decisionOptions?.length ? <small>회의 선택지 · {task.decisionOptions.map(option => option.label).join(' · ')}</small> : null}{task.requiredInputs?.length ? <small className="ops-mvp-required-inputs">필요 입력 · {task.requiredInputs.join(' · ')}</small> : null}{task.blockedBy ? <small>대기 이유 · {task.blockedBy}</small> : null}<small>다음 · {task.nextAction}</small></article>)}</div>
      {goalAudit ? <div className="ops-mvp-audit-snapshot" aria-labelledby="goal-audit-heading"><div className="ops-mvp-audit-head"><div><span className="ops-mvp-eyebrow" id="goal-audit-heading">공개 목표 감사</span><h3>{goalAudit.overallStatus === 'IN_PROGRESS_WITH_GATES' ? '게이트를 확인하며 계속 진행 중' : '모든 게이트가 닫혔습니다'}</h3></div><small>기준일 {goalAudit.checkedAt} · {goalAudit.milestones.tfPulse.stateChanged ? '새 pulse 변화 감지' : 'pulse 변화 없음'} · {goalAudit.gates.length}개 게이트</small></div><div className="ops-mvp-audit-metrics"><span><strong>{goalAudit.milestones.masterIndex.researchRecords}</strong><small>논문 레코드</small></span><span><strong>{goalAudit.milestones.masterIndex.claims}</strong><small>소비자 주장</small></span><span><strong>{goalAudit.milestones.publicProduct.products}</strong><small>공개 제품</small></span><span><strong>{goalAudit.taskCounts.DONE ?? 0}</strong><small>완료 작업</small></span></div>{goalAudit.milestones.tfPulse.continuation ? <p className="ops-mvp-audit-loop">자동 운영 루프 · {continuationLabels[goalAudit.milestones.tfPulse.continuation.mode] || goalAudit.milestones.tfPulse.continuation.mode} · 다음 재검토 {formatTime(goalAudit.milestones.tfPulse.continuation.nextReviewAt)} · {goalAudit.milestones.tfPulse.continuation.nextAction}</p> : null}<ol className="ops-mvp-audit-gates">{goalAudit.gates.map(gate => <li key={gate.id}><div><strong>{gate.id}</strong><span>{stateLabels[gate.state] || gate.state}</span></div><p>{gate.title}</p><small>담당 {gate.lead} · 독립 검증 {gate.verifier} · 다음 {gate.nextAction}</small>{gate.decisionOptions.length ? <small>회의 선택지 · {gate.decisionOptions.map(option => option.label).join(' · ')}</small> : null}{gate.decisionOptions.length ? <details className="ops-mvp-decision-options"><summary>판정 기준 보기</summary><ul>{gate.decisionOptions.map(option => <li key={option.id}><strong>{option.label}</strong><span>{option.criteria.join(' · ')}</span></li>)}</ul></details> : null}{gate.requiredInputs.length ? <small>필요 입력 · {gate.requiredInputs.join(' · ')}</small> : null}</li>)}</ol></div> : null}
      {localAudit ? <div className="ops-mvp-local-audit" aria-labelledby="local-audit-heading"><div className="ops-mvp-audit-head"><div><span className="ops-mvp-eyebrow" id="local-audit-heading">비공개 로컬 입력 감사</span><h3>{localAudit.overallStatus === 'IN_PROGRESS_WITH_GATES' ? '로컬 자료를 읽고, 승인 게이트는 열어 둠' : '로컬 입력 감사 완료'}</h3></div><small>최근 감사 {localAudit.generatedAt ? formatTime(localAudit.generatedAt) : '시간 확인 필요'} · {localAudit.localStateChanged ? '새 자료 변화 감지' : '입력 변화 없음'} · 감시 경계 {localAudit.privacyBoundary}</small></div><div className="ops-mvp-audit-metrics ops-mvp-local-metrics"><span><strong>{localAudit.localInputAudit.materials?.finishedProductCandidates ?? 0}</strong><small>완제품 후보</small></span><span><strong>{localAudit.localInputAudit.materials ? `${localAudit.localInputAudit.materials.found}/${localAudit.localInputAudit.materials.missing}` : '—'}</strong><small>자료 확인/누락</small></span><span><strong>{localAudit.localInputAudit.orders?.counters.filesScanned ?? 0}</strong><small>주문 파일 스캔</small></span><span><strong>{localAudit.localInputAudit.orders?.gaba1500?.quantity ?? 0}</strong><small>1500 과거 수량</small></span></div><div className="ops-mvp-local-audit-grid"><div><span className="ops-mvp-eyebrow">자동 판정</span><ul>{localAudit.checks.map(check => <li key={check.id}><strong>{check.id}</strong><span>{localAuditStatusLabels[check.status] || check.status}</span><small>{check.detail}</small>{check.blockers.length ? <small>다음 입력 · {check.blockers.join(' · ')}</small> : null}</li>)}</ul></div><div><span className="ops-mvp-eyebrow">회의에서 확인할 사실</span><p>완제품 후보 {localAudit.localInputAudit.materials?.finishedProductCandidates ?? 0}건은 B2 표시 검증의 입력으로만 연결됩니다. 주문 파일은 {localAudit.localInputAudit.orders?.counters.filesScanned ?? 0}개를 읽었고, 1500 과거 집계는 {localAudit.localInputAudit.orders?.gaba1500?.quantity ?? 0}개입니다.</p><p>파일 형식 · CSV {localAudit.localInputAudit.orders?.counters.csvParsed ?? localAudit.localInputAudit.orders?.counters.csvFiles ?? 0}개 · 암호화 XLSX {localAudit.localInputAudit.orders?.counters.xlsxEncrypted ?? 0}개 · 미해석 XLSX {localAudit.localInputAudit.orders?.counters.xlsxUnparsed ?? 0}개</p><p>1500 기록 기간 · {localAudit.localInputAudit.orders?.gaba1500?.firstDate ?? '확인 불가'} ~ {localAudit.localInputAudit.orders?.gaba1500?.lastDate ?? '확인 불가'} · 750 기록 {localAudit.localInputAudit.orders?.gaba750?.rows ?? 0}행은 공개 제품 목록에서 제거된 과거 보관 자료로만 남깁니다. 실구매·취소·환불 증거가 아니므로 E1을 자동 완료하지 않습니다.</p><small>{localAudit.localInputAudit.interpretation}</small></div></div>{localAuditError ? <p className="ops-mvp-live-error" role="status">{localAuditError}</p> : null}</div> : localAuditEndpoint && localAuditError ? <p className="ops-mvp-live-error" role="status">{localAuditError}</p> : null}
      <p className="note">계약 확인일 {queue.checkedAt} · 완료 {queue.tasks.filter(task => task.state === 'DONE').length}건 · 진행/대기 {attentionQueue.length}건. 대기 입력이 도착하면 담당 TF가 검토 후 다음 작업을 엽니다.</p>{queue.pulse ? <p className="ops-mvp-live-pulse">마지막 TF pulse {formatTime(queue.pulse.generatedAt)} · {pulseFreshness(queue.pulse.generatedAt)} · 상태 지문 {queue.pulse.snapshotHash.slice(0, 12)}… · {queue.pulse.stateChanged ? '새 상태 변화 감지' : '상태 변화 없음'} · 사람 판단 {queue.pulse.requiresHumanDecision ? '필요' : '없음'} · 입력 게이트 {queue.pulse.inputGates}건</p> : null}{queue.pulse?.continuation ? <p className="ops-mvp-live-loop">자동 운영 루프 · {continuationLabels[queue.pulse.continuation.mode] || queue.pulse.continuation.mode} · 다음 재검토 {formatTime(queue.pulse.continuation.nextReviewAt)} · {queue.pulse.continuation.nextAction}</p> : null}{queue.pulse?.requiresHumanDecision ? <div className="ops-mvp-pulse-agenda" aria-labelledby="pulse-agenda-heading"><div><span className="ops-mvp-eyebrow" id="pulse-agenda-heading">다음 TF 회의 안건</span><p>자동 pulse가 멈춘 지점을 사람 회의에서 확인하고, 담당자와 독립 검증자가 다음 조치를 합의합니다.</p></div><ol>{attentionQueue.filter(task => ['VERIFYING', 'WAITING'].includes(task.state)).slice(0, 5).map(task => <li key={task.id}><div><strong>{task.id}</strong><span>{task.decision}</span></div><small>담당 · {task.lead} · 독립 검증 · {task.verifier} · 다음 · {task.nextAction}</small>{task.decisionOptions?.length ? <small>선택지 · {task.decisionOptions.map(option => option.label).join(' · ')}</small> : null}{task.decisionOptions?.length ? <details className="ops-mvp-decision-options"><summary>판정 기준 보기</summary><ul>{task.decisionOptions.map(option => <li key={option.id}><strong>{option.label}</strong><span>{option.criteria.join(' · ')}</span></li>)}</ul></details> : null}{task.requiredInputs?.length ? <small>회의 확인 항목 · {task.requiredInputs.join(' · ')}</small> : null}</li>)}</ol></div> : null}
    </section> : null}
    {plan ? <>
      <section className="ops-mvp-contract wrap" aria-labelledby="contract-heading">
        <div className="ops-mvp-section-heading"><div><p className="chapter">01 / Goal Contract</p><h2 id="contract-heading">목표를 실행 계약으로.</h2></div><div className="ops-mvp-contract-id"><span>{plan.contract.goalId}</span><strong>ACTIVE</strong></div></div>
        <div className="ops-mvp-contract-grid"><article><span className="ops-mvp-eyebrow">목표</span><h3>{plan.contract.title}</h3><p>{plan.contract.objective}</p><small>자동 선택된 초점 · {plan.contract.focusAreas.join(' · ')}</small></article><article><span className="ops-mvp-eyebrow">성공 기준</span><ul>{plan.contract.successMetrics.map(item => <li key={item}>{item}</li>)}</ul></article><article><span className="ops-mvp-eyebrow">멈춤 조건</span><ul>{plan.contract.stopConditions.map(item => <li key={item}>{item}</li>)}</ul></article></div>
      </section>
      <section className="ops-mvp-tf wrap" aria-labelledby="tf-heading">
        <div className="ops-mvp-section-heading"><div><p className="chapter">02 / TF</p><h2 id="tf-heading">목표에 맞는 팀을 붙입니다.</h2></div><p>제안자와 독립 검증자를 함께 지정해, 문구·근거·QA가 서로를 확인하도록 합니다.</p></div>
        <div className="ops-mvp-tf-grid">{plan.contract.workstreams.map(stream => <article key={stream.id}><div className="ops-mvp-tf-dot"/><h3>{stream.name}</h3><p>{stream.deliverable}</p><dl><div><dt>실행</dt><dd>{stream.lead}</dd></div><div><dt>검증</dt><dd>{stream.verifier}</dd></div></dl></article>)}</div>
        <div className="ops-mvp-team-heading"><p className="chapter">실행 구성원</p><p>목표에 필요한 책임 결과와 권한을 분리하고, 품질감사관은 실행 담당과 독립적으로 둡니다.</p></div>
        <div className="ops-mvp-team-grid">{plan.contract.team.map(member => <article key={member.id} className={member.verifier ? 'is-verifier' : ''}><div className="ops-mvp-team-top"><h3>{member.role}</h3>{member.verifier ? <span>독립 검증</span> : null}</div><p>{member.responsibility}</p><small>권한 범위 · {member.authority}</small></article>)}</div>
        <div className="ops-mvp-protocol"><div><span className="ops-mvp-eyebrow">회의가 열리는 때</span><p>{plan.contract.decisionProtocol.cadence}</p></div><div><span className="ops-mvp-eyebrow">의사결정 정족수</span><p>{plan.contract.decisionProtocol.quorum}</p></div><div><span className="ops-mvp-eyebrow">회의 기록</span><p>{plan.contract.decisionProtocol.record.join(' · ')}</p></div></div>
      </section>
      <section className="ops-mvp-graph wrap" aria-labelledby="graph-heading">
        <div className="ops-mvp-section-heading"><div><p className="chapter">03 / 업무 그래프</p><h2 id="graph-heading">다음에 할 일이 보입니다.</h2></div><p>선행 작업이 완료된 작업만 실행 가능해집니다. 승인 없는 외부 약속은 샌드박스에서도 멈춥니다.</p></div>
      <div className="ops-mvp-graph-layout"><div className="ops-mvp-tasks">{plan.tasks.map(task => <article className={`ops-mvp-task state-${task.state.toLowerCase()}`} key={task.id}><div className="ops-mvp-task-top"><div><span className="ops-mvp-task-id">{task.id}</span><h3>{task.title}</h3></div><span className="ops-mvp-state">{taskStateLabel(task)}</span></div><p>{task.description}</p><div className="ops-mvp-task-meta"><span>담당 {task.lead}</span><span>독립 검증 {task.verifier}</span><span>위험도 {riskLabels[task.risk || 'A_READ']}</span></div>{task.dependencies.length ? <small>선행: {task.dependencies.join(' → ')}</small> : null}{task.state === 'READY' ? <button className="button outline ops-mvp-task-action" type="button" onClick={() => execute(task.id)}>샌드박스 실행 <Play size={15}/></button> : task.state === 'VERIFYING' ? <><button className="button outline ops-mvp-task-action" type="button" onClick={() => openReview(task.id)}>독립 검증 기록 입력 <ShieldCheck size={15}/></button>{reviewTaskId === task.id ? <form className="ops-mvp-review-form" onSubmit={event => { event.preventDefault(); review(task.id, 'accept'); }}><fieldset><legend>수락 기준 확인</legend>{task.acceptance.map(criterion => <label key={criterion}><input type="checkbox" checked={reviewCriteria.includes(criterion)} onChange={event => setReviewCriteria(current => event.target.checked ? [...current, criterion] : current.filter(item => item !== criterion))}/><span>{criterion}</span></label>)}</fieldset><label>확인한 산출물·공개 자료 참조<small>줄바꿈으로 입력하세요. 원래 샌드박스 산출물 지문을 모두 남겨야 합니다.</small><textarea value={reviewEvidence} onChange={event => setReviewEvidence(event.target.value)} rows={4} placeholder={task.evidence.join('\n')} /></label><label>검토 메모<textarea value={reviewNote} onChange={event => setReviewNote(event.target.value)} rows={3} placeholder="확인한 근거와 판단 이유를 적어 주세요." /></label><div className="ops-mvp-review-actions"><button className="button" type="submit" disabled={reviewCriteria.length !== task.acceptance.length || reviewEvidence.split(/\r?\n/).map(item => item.trim()).filter(Boolean).length === 0 || reviewNote.trim().length < 10}>독립 검증 승인 기록</button><button className="button outline" type="button" onClick={() => review(task.id, 'rework')} disabled={reviewCriteria.length !== task.acceptance.length || reviewEvidence.split(/\r?\n/).map(item => item.trim()).filter(Boolean).length === 0 || reviewNote.trim().length < 10}>보완 요청 기록</button><button className="text-link" type="button" onClick={() => { setReviewTaskId(''); setReviewEvidence(''); }}>닫기</button></div></form> : null}</> : task.state === 'REWORK' ? <button className="button outline ops-mvp-task-action" type="button" onClick={() => execute(task.id)}>보완 후 다시 실행 <Play size={15}/></button> : task.state === 'DONE' ? <span className="ops-mvp-done"><CheckCircle2 size={16}/> {task.verification?.mode === 'independent_review' ? '독립 검증 기록' : '샌드박스 확인 기록'} · {task.verification?.verifier || task.verifier}</span> : null}</article>)}</div><aside className="ops-mvp-graph-side"><h3>의존성 흐름</h3><div className="ops-mvp-flow">{edges.map((edge,index) => <span key={`${edge.from}-${edge.to}`}>{edge.from}<ArrowRight size={14}/>{edge.to}{index < edges.length - 1 ? <i/> : null}</span>)}</div><button className="button outline" type="button" onClick={runAutonomousWave}>자동 협업 파동 실행 <Play size={15}/></button><button className="text-link" type="button" onClick={() => { setPlan({...plan, tasks: plan.tasks.map(task => task.state === 'BACKLOG' && task.dependencies.every(id => plan.tasks.find(parent => parent.id === id)?.state === 'DONE') ? {...task, state: 'READY'} : task)}); setMessage('완료된 선행 작업을 기준으로 실행 가능 상태를 갱신했습니다.'); }}>실행 가능 상태 갱신 ↻</button></aside></div>
      </section>
      <section className="ops-mvp-report wrap" aria-labelledby="report-heading">
        <div className="ops-mvp-section-heading"><div><p className="chapter">04 / 결과·승인 보고</p><h2 id="report-heading">실행 결과를 보고서로 남깁니다.</h2></div><p>샌드박스 결과는 외부 실행 증거가 아닙니다. 실제 공개 전에는 책임자·표시·배포 검토가 필요합니다.</p></div>
        {approval ? <div className="ops-mvp-approval"><ShieldCheck size={22}/><div><strong>승인 요청이 생성되었습니다.</strong><p>{approval.action}</p><small>위험도: {riskLabels[approval.risk]} · 만료: {formatTime(approval.expiresAt)}</small></div><button className="button" type="button" onClick={() => execute(approvalTaskId, 'sandbox-approval')}>샌드박스 승인 후 실행</button></div> : null}
        <div className="ops-mvp-report-grid"><article><span className="ops-mvp-eyebrow">현재 판정</span><strong className={`ops-mvp-recommendation recommendation-${report?.recommendation}`}>{reportLabel}</strong><p>샌드박스 확인 기록 {report?.completedTasks.length ?? 0}건 · 다음 작업 {report?.pendingTasks.length ?? 0}건</p><small>사람 독립 검토 {report?.independentlyVerifiedTasks.length ?? 0}건 · 자동 시뮬레이션 {report?.sandboxCompletedTasks.length ?? 0}건 · 상태 {report?.verificationStatus}</small><small>샌드박스 결과는 외부 운영 증거가 아닙니다. 공개 승인 전 실제 검토·표시·배포 확인이 필요합니다.</small></article><article><span className="ops-mvp-eyebrow">감사 로그</span>{audit.length ? <ol>{audit.slice(-6).map(item => <li key={item.id}><strong>{item.taskId}</strong> {stateLabels[item.to]} · {item.note}</li>)}</ol> : <p>아직 실행 로그가 없습니다. 위 그래프의 실행 가능 작업을 시작하세요.</p>}<div className="ops-mvp-decision-log"><span className="ops-mvp-eyebrow">TF 의사결정 기록</span>{decisions.length ? <ol>{decisions.slice(-5).map(item => <li key={item.id}><strong>{item.taskId}</strong> {item.decision}<small>참여: {item.participants.join(' · ')} · 다음: {item.nextAction}</small><small>{item.dissentStatus === 'human-meeting' ? '회의에서 기록한 반대 의견' : '자동 안전 경계'}: {item.dissent}</small>{item.dissentStatus === 'human-meeting' && item.dissentRecordedAt ? <small>회의 기록 시각: {formatTime(item.dissentRecordedAt)}</small> : null}<small>근거: {item.evidence.join(' · ')}</small></li>)}</ol> : <p>첫 목표 계약 회의 기록이 아직 없습니다.</p>}<form className="ops-mvp-dissent-form" onSubmit={event => { event.preventDefault(); recordDissent(); }}><label>회의 의견을 남길 작업<select value={dissentTaskId} onChange={event => setDissentTaskId(event.target.value)}><option value="">작업 선택</option>{[...new Set(decisions.filter(item => item.state !== 'CONTRACT').map(item => item.taskId))].map(id => <option key={id} value={id}>{id}</option>)}</select></label><label>반대 의견 또는 재검토 조건<textarea value={dissentNote} onChange={event => setDissentNote(event.target.value)} rows={2} placeholder="문제·소비자 영향·대안·검증 조건을 적어 주세요." /></label><button className="button outline" type="submit" disabled={!dissentTaskId || dissentNote.trim().length < 10}>회의 기록 추가</button></form></div></article></div>
      <div className="ops-mvp-report-actions"><button className="button outline" type="button" onClick={copyReport} disabled={!report}><Clipboard size={16}/> {copied ? '복사됨' : '승인 보고서 복사'}</button><button className="button outline" type="button" onClick={() => report && downloadJson(`${report.reportId}.json`, report)} disabled={!report}><Download size={16}/> JSON 다운로드</button><button className="text-link" type="button" onClick={() => { setRunId(clientUuid()); setRunKey(clientUuid()); setServerRevision(0); setPlan(null); setAudit([]); setApproval(undefined); setApprovalTaskId(''); setDecisions([]); setReviewTaskId(''); setReviewCriteria([]); setReviewNote(''); setDissentTaskId(''); setDissentNote(''); setMessage('샌드박스를 초기화했습니다.'); }}><RotateCcw size={15}/> 새 목표로 시작</button></div>
      </section>
    </> : <section className="ops-mvp-empty wrap"><p className="chapter">MVP 시작점</p><h2>목표 한 문장으로<br />첫 업무를 열어보세요.</h2><p>기본 목표가 입력되어 있습니다. 생성 버튼을 누르면 계약·TF·그래프·승인 보고 흐름을 바로 실행할 수 있습니다.</p></section>}
  </main>;
}

