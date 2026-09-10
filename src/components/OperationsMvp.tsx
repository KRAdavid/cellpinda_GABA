import {useEffect, useMemo, useState} from 'react';
import {ArrowRight, CheckCircle2, Clipboard, Download, LockKeyhole, Play, RotateCcw, ShieldCheck} from 'lucide-react';
import {buildMvpApprovalReport, generateMvpPlan, runSandboxTask, taskGraphEdges, type MvpApprovalReport, type MvpPlan, type SandboxAuditEvent} from '../domain/goal-mvp';
import './OperationsMvp.css';

const defaultGoal = '공개용 GABA 논문 기반 마스터 인덱스';
const stateLabels: Record<string, string> = {BACKLOG: '대기', READY: '실행 가능', RUNNING: '실행 중', VERIFYING: '검증 중', DONE: '완료', WAITING: '승인 대기'};
const riskLabels: Record<string, string> = {A_READ: '읽기', B_INTERNAL_WRITE: '내부 작성', C_LOW_RISK_INTERNAL: '내부 실행', D_EXTERNAL_REVERSIBLE: '외부 가역', E_EXTERNAL_COMMITMENT: '책임자 승인'};
const formatTime = (value: string) => new Date(value).toLocaleString('ko-KR', {dateStyle: 'short', timeStyle: 'short'});
const storageKey = 'cellpinda:ops-mvp:v2';

type StoredOpsState = {
  input?: string;
  plan?: MvpPlan | null;
  audit?: SandboxAuditEvent[];
  approval?: MvpApprovalReport['approval'];
  approvalTaskId?: string;
};

function loadStoredState(): StoredOpsState {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) as StoredOpsState : {};
  } catch { return {}; }
}

function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}

export default function OperationsMvp() {
  const [stored] = useState(loadStoredState);
  const [input, setInput] = useState(stored.input || defaultGoal);
  const [plan, setPlan] = useState<MvpPlan | null>(stored.plan || null);
  const [audit, setAudit] = useState<SandboxAuditEvent[]>(stored.audit || []);
  const [approval, setApproval] = useState<MvpApprovalReport['approval']>(stored.approval);
  const [approvalTaskId, setApprovalTaskId] = useState(stored.approvalTaskId || '');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const edges = useMemo(() => plan ? taskGraphEdges(plan.tasks) : [], [plan]);
  const report = useMemo(() => plan ? buildMvpApprovalReport(plan.contract, plan.tasks, audit, approval, new Date().toISOString()) : null, [plan, audit, approval]);

  useEffect(() => {
    try { window.localStorage.setItem(storageKey, JSON.stringify({input, plan, audit, approval, approvalTaskId} satisfies StoredOpsState)); }
    catch { /* private browsing or quota limits should not block the sandbox */ }
  }, [input, plan, audit, approval, approvalTaskId]);

  function createPlan(event: React.FormEvent) {
    event.preventDefault();
    try {
      setPlan(generateMvpPlan(input)); setAudit([]); setApproval(undefined); setApprovalTaskId(''); setMessage('Goal Contract, TF, 업무 그래프를 생성했습니다.'); setCopied(false);
    } catch (error) { setMessage(error instanceof Error ? error.message : '목표를 생성하지 못했습니다.'); }
  }

  function execute(taskId: string, token?: string) {
    if (!plan) return;
    try {
      const result = runSandboxTask(plan.tasks, taskId, token);
      if (result.approval) {
        setApproval(result.approval); setApprovalTaskId(result.approvalTaskId || taskId); setPlan({...plan, tasks: result.tasks}); setMessage('외부 약속 단계는 승인 전까지 실행하지 않습니다. 승인 보고서를 확인하세요.');
        return;
      }
      setPlan({...plan, tasks: result.tasks}); setAudit(items => [...items, ...result.events]); setApproval(undefined); setApprovalTaskId(''); setMessage(`${taskId} 작업의 샌드박스 상태 전환을 기록했습니다. 실제 외부 결과·독립 검증은 별도 단계입니다.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : '샌드박스 실행에 실패했습니다.'); }
  }

  function copyReport() {
    if (!report) return;
    void navigator.clipboard?.writeText(JSON.stringify(report, null, 2)).then(() => { setCopied(true); setMessage('승인 보고서 JSON을 복사했습니다.'); }).catch(() => setMessage('복사 권한이 없어 다운로드를 이용해 주세요.'));
  }

  const base = import.meta.env.BASE_URL;
  return <main className="ops-mvp">
    <header className="ops-mvp-header wrap">
      <div><p className="chapter">Cellpinda Operating MVP</p><h1>문서를 읽는 조직에서,<br />실제로 일하는 조직으로.</h1><p>한 문장 목표를 계약·TF·업무 그래프·검증 보고서로 바꾸는 공개용 GABA 논문 인덱스 운영 화면입니다.</p></div>
      <div className="ops-mvp-header-actions"><a className="button outline" href={`${base}#research`}>공개 연구 라이브러리 <ArrowRight size={17}/></a><a className="text-link" href={base}>사이트로 돌아가기</a></div>
    </header>
    <section className="ops-mvp-sandbox wrap" aria-labelledby="ops-mvp-heading">
      <div className="ops-mvp-sandbox-label"><LockKeyhole size={18}/> 내부 샌드박스 · 외부 게시·구매·법적 약속을 실행하지 않음</div>
      <form className="ops-mvp-goal" onSubmit={createPlan}>
        <label htmlFor="mvp-goal"><strong id="ops-mvp-heading">한 문장 목표 입력</strong><span>목표가 구체적일수록 검토·완료 조건이 명확해집니다.</span></label>
        <textarea id="mvp-goal" value={input} onChange={event => setInput(event.target.value)} rows={3} maxLength={160} />
        <div className="ops-mvp-form-row"><small>{input.length}/160자</small><button className="button" type="submit">Goal Contract 자동 생성 <ArrowRight size={18}/></button></div>
      </form>
      {message ? <p className="ops-mvp-message" role="status">{message}</p> : null}
    </section>
    {plan ? <>
      <section className="ops-mvp-contract wrap" aria-labelledby="contract-heading">
        <div className="ops-mvp-section-heading"><div><p className="chapter">01 / Goal Contract</p><h2 id="contract-heading">목표를 실행 계약으로.</h2></div><div className="ops-mvp-contract-id"><span>{plan.contract.goalId}</span><strong>ACTIVE</strong></div></div>
        <div className="ops-mvp-contract-grid"><article><span className="ops-mvp-eyebrow">목표</span><h3>{plan.contract.title}</h3><p>{plan.contract.objective}</p></article><article><span className="ops-mvp-eyebrow">성공 기준</span><ul>{plan.contract.successMetrics.map(item => <li key={item}>{item}</li>)}</ul></article><article><span className="ops-mvp-eyebrow">멈춤 조건</span><ul>{plan.contract.stopConditions.map(item => <li key={item}>{item}</li>)}</ul></article></div>
      </section>
      <section className="ops-mvp-tf wrap" aria-labelledby="tf-heading">
        <div className="ops-mvp-section-heading"><div><p className="chapter">02 / TF</p><h2 id="tf-heading">목표에 맞는 팀을 붙입니다.</h2></div><p>제안자와 독립 검증자를 함께 지정해, 문구·근거·QA가 서로를 확인하도록 합니다.</p></div>
        <div className="ops-mvp-tf-grid">{plan.contract.workstreams.map(stream => <article key={stream.id}><div className="ops-mvp-tf-dot"/><h3>{stream.name}</h3><p>{stream.deliverable}</p><dl><div><dt>실행</dt><dd>{stream.lead}</dd></div><div><dt>검증</dt><dd>{stream.verifier}</dd></div></dl></article>)}</div>
        <div className="ops-mvp-team-heading"><p className="chapter">실행 구성원</p><p>목표에 필요한 책임 결과와 권한을 분리하고, 품질감사관은 실행 담당과 독립적으로 둡니다.</p></div>
        <div className="ops-mvp-team-grid">{plan.contract.team.map(member => <article key={member.id} className={member.verifier ? 'is-verifier' : ''}><div className="ops-mvp-team-top"><h3>{member.role}</h3>{member.verifier ? <span>독립 검증</span> : null}</div><p>{member.responsibility}</p><small>권한 범위 · {member.authority}</small></article>)}</div>
        <div className="ops-mvp-protocol"><div><span className="ops-mvp-eyebrow">회의가 열리는 때</span><p>{plan.contract.decisionProtocol.cadence}</p></div><div><span className="ops-mvp-eyebrow">회의 기록</span><p>{plan.contract.decisionProtocol.record.join(' · ')}</p></div></div>
      </section>
      <section className="ops-mvp-graph wrap" aria-labelledby="graph-heading">
        <div className="ops-mvp-section-heading"><div><p className="chapter">03 / 업무 그래프</p><h2 id="graph-heading">다음에 할 일이 보입니다.</h2></div><p>선행 작업이 완료된 작업만 실행 가능해집니다. 승인 없는 외부 약속은 샌드박스에서도 멈춥니다.</p></div>
        <div className="ops-mvp-graph-layout"><div className="ops-mvp-tasks">{plan.tasks.map(task => <article className={`ops-mvp-task state-${task.state.toLowerCase()}`} key={task.id}><div className="ops-mvp-task-top"><div><span className="ops-mvp-task-id">{task.id}</span><h3>{task.title}</h3></div><span className="ops-mvp-state">{stateLabels[task.state] || task.state}</span></div><p>{task.description}</p><div className="ops-mvp-task-meta"><span>담당 {task.lead}</span><span>검증 {task.verifier}</span><span>위험도 {riskLabels[task.risk || 'A_READ']}</span></div>{task.dependencies.length ? <small>선행: {task.dependencies.join(' → ')}</small> : null}{task.state === 'READY' ? <button className="button outline ops-mvp-task-action" type="button" onClick={() => execute(task.id)}>샌드박스 실행 <Play size={15}/></button> : task.state === 'DONE' ? <span className="ops-mvp-done"><CheckCircle2 size={16}/> 증거 연결됨</span> : null}</article>)}</div><aside className="ops-mvp-graph-side"><h3>의존성 흐름</h3><div className="ops-mvp-flow">{edges.map((edge,index) => <span key={`${edge.from}-${edge.to}`}>{edge.from}<ArrowRight size={14}/>{edge.to}{index < edges.length - 1 ? <i/> : null}</span>)}</div><button className="text-link" type="button" onClick={() => { setPlan({...plan, tasks: plan.tasks.map(task => task.state === 'BACKLOG' && task.dependencies.every(id => plan.tasks.find(parent => parent.id === id)?.state === 'DONE') ? {...task, state: 'READY'} : task)}); setMessage('완료된 선행 작업을 기준으로 실행 가능 상태를 갱신했습니다.'); }}>실행 가능 상태 갱신 ↻</button></aside></div>
      </section>
      <section className="ops-mvp-report wrap" aria-labelledby="report-heading">
        <div className="ops-mvp-section-heading"><div><p className="chapter">04 / 결과·승인 보고</p><h2 id="report-heading">실행 결과를 보고서로 남깁니다.</h2></div><p>샌드박스 결과는 외부 실행 증거가 아닙니다. 실제 공개 전에는 책임자·표시·배포 검토가 필요합니다.</p></div>
        {approval ? <div className="ops-mvp-approval"><ShieldCheck size={22}/><div><strong>승인 요청이 생성되었습니다.</strong><p>{approval.action}</p><small>위험도: {riskLabels[approval.risk]} · 만료: {formatTime(approval.expiresAt)}</small></div><button className="button" type="button" onClick={() => execute(approvalTaskId, 'sandbox-approval')}>샌드박스 승인 후 실행</button></div> : null}
        <div className="ops-mvp-report-grid"><article><span className="ops-mvp-eyebrow">현재 판정</span><strong className={`ops-mvp-recommendation recommendation-${report?.recommendation}`}>{report?.recommendation === 'approve' ? '샌드박스 완료' : report?.recommendation === 'blocked' ? '승인 대기' : '추가 작업 필요'}</strong><p>완료 {report?.completedTasks.length ?? 0}건 · 대기 {report?.pendingTasks.length ?? 0}건</p><small>검증 상태 · 샌드박스 시뮬레이션만 기록됨</small></article><article><span className="ops-mvp-eyebrow">감사 로그</span>{audit.length ? <ol>{audit.slice(-6).map(item => <li key={item.id}><strong>{item.taskId}</strong> {stateLabels[item.to]} · {item.note}</li>)}</ol> : <p>아직 실행 로그가 없습니다. 위 그래프의 실행 가능 작업을 시작하세요.</p>}</article></div>
        <div className="ops-mvp-report-actions"><button className="button outline" type="button" onClick={copyReport} disabled={!report}><Clipboard size={16}/> {copied ? '복사됨' : '승인 보고서 복사'}</button><button className="button outline" type="button" onClick={() => report && downloadJson(`${report.reportId}.json`, report)} disabled={!report}><Download size={16}/> JSON 다운로드</button><button className="text-link" type="button" onClick={() => { setPlan(null); setAudit([]); setApproval(undefined); setApprovalTaskId(''); setMessage('샌드박스를 초기화했습니다.'); }}><RotateCcw size={15}/> 새 목표로 시작</button></div>
      </section>
    </> : <section className="ops-mvp-empty wrap"><p className="chapter">MVP 시작점</p><h2>목표 한 문장으로<br />첫 업무를 열어보세요.</h2><p>기본 목표가 입력되어 있습니다. 생성 버튼을 누르면 계약·TF·그래프·승인 보고 흐름을 바로 실행할 수 있습니다.</p></section>}
  </main>;
}
