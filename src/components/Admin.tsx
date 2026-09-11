import { useState } from 'react';
import ReviewEditor from './ReviewEditor';
import type { QuoteReviewItem, ReviewDraft, ReviewConfirmation } from './ReviewEditor';
import {apiEndpoint} from '../api-origin';

type Item = { id: string; topic?: string; name?: string; publicText?: string; status: string; revision: number; kind?: string; reviewType?: string; review?: ReviewDraft; reviewConfirmation?: ReviewConfirmation; sources?: { title: string; url: string | null; page?: number | null; locator?: string }[]; sourceTitle?: string; sourceUrl?: string | null; metadata?: Record<string, string | string[] | number | null>; limitations?: string[]; holdReason?: string | null; reviewedBy?: string; reviewedAt?: string };
type AdminSession = { role: 'operator' | 'editor' | 'reviewer' | 'approver'; roleLabel: string; capabilities: string[] };
type Funnel = { id: string; from: string; to: string; denominator: number; numerator: number; rate: number | null; denominatorDefinition: string; numeratorDefinition: string };
type GoalFunnelStage = { event: string; flows: number; events: number };
type SharingScope = { id: 'own_result' | 'incoming_result' | 'product_comparison'; path: string; denominator: number; attemptFlows: number; attemptRate: number | null; requestedFlows: number; copiedFlows: number; downloadedFlows: number; cancelledFlows: number };
type Analytics = { counts: { name: string; count: number }[]; funnels?: Funnel[]; goalFunnel?: GoalFunnelStage[]; window?: { kind: string; from: string | null; to: string; ordering: string; flowScope: string }; coverage?: { eventsWithoutFlow: number; distinctFlows: number }; sharingMetrics?: { scopes: SharingScope[]; unscopedShareEvents: number; confirmedDeliverySupported: false } };
const sharingLabels: Record<SharingScope['id'], string> = { own_result: '내 리듬 결과', incoming_result: '공유받은 리듬 결과', product_comparison: '제품 비교' };
const eventLabels: Record<string, string> = { landing_view: '첫 화면 열람', hero_check_start: '체크 시작 CTA', rhythm_check_started: '리듬 체크 시작', rhythm_check_completed: '리듬 체크 완료', rhythm_check_complete: '리듬 체크 완료', result_viewed: '결과 열람', gaba_story_viewed: 'GABA 이야기 열람', evidence_opened: '근거 상세 열기', review_opened: '후기 원문 이동', review_source_click: '후기 원문 CTA', review_section_navigated: '제품별 후기 섹션 이동', purchase_question_opened: '구매 전 질문 열기', share_image_generated: '공유 이미지 생성', share_requested: '공유 요청', share_cancelled: '공유 취소', share_link_copied: '공유 링크 복사', share_image_downloaded: '공유 이미지 다운로드 요청', result_share_click: '결과 공유 클릭', result_share_success: '결과 공유 처리', shared_link_landed: '공유 링크로 진입', friend_check_start: '친구 체크 시작', product_comparison_viewed: '제품 비교 열람', product_compare_view: '제품 비교 확인', purchase_outbound_clicked: '스마트스토어 구매 링크 이동', purchase_cta_click: '구매 CTA 클릭', challenge_start: '7일 챌린지 시작', challenge_day_complete: '챌린지 하루 완료', seven_day_complete: '7일 챌린지 완료', teaser_impression: '티저 화면 노출', teaser_play: '티저 재생 영역 로드' };
const goalFunnelLabels: Record<string,string> = {landing_view:'방문',hero_check_start:'체크 시작',rhythm_check_complete:'체크 완료',result_share_click:'결과 공유 클릭',shared_link_landed:'공유 유입',product_compare_view:'제품 확인',purchase_cta_click:'구매처 이동'};
const funnelLabels: Record<string, string> = { landing_to_check: '첫 화면 → 체크 시작', check_completion: '체크 시작 → 완료', result_to_story: '결과 → GABA 이야기', comparison_to_purchase_click: '제품 비교 → 스마트스토어 이동' };
const metadataLabels: Record<string, string> = { question: '연구 질문', studyType: '연구 설계', population: '연구 대상', sampleSize: '표본 규모', studyCount: '포함 연구 수', searchThrough: '문헌 검색 범위', dose: '연구 용량·제형', duration: '연구 기간', comparison: '비교 조건', outcome: '평가 지표', result: '관찰 결과', limitations: '연구 한계', consumerScope: '소비자용 연구 범위', productApplicability: '셀핀다 완제품 적용 범위' };
const eventLabel = (name: string) => eventLabels[name] || `기타 행동 (${name})`;
const formatDate = (value?: string | null) => value ? new Date(value).toLocaleString('ko-KR') : '아직 수집되지 않음';
const siteRoot = import.meta.env.BASE_URL;

export default function Admin() {
 const [token, setToken] = useState(''), [items, setItems] = useState<Item[]>([]), [selected, setSelected] = useState<Item | null>(null), [text, setText] = useState(''), [reason, setReason] = useState(''), [error, setError] = useState(''), [busy, setBusy] = useState(false), [history, setHistory] = useState<{ id: number; content_id: string; reason: string; created_at: string }[]>([]), [analytics, setAnalytics] = useState<Analytics>({ counts: [] }), [session, setSession] = useState<AdminSession | null>(null), [loaded, setLoaded] = useState(false);
 const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
 const [creatingReview, setCreatingReview] = useState(false), [reviewDirty, setReviewDirty] = useState(false), [reviewSelection, setReviewSelection] = useState(0);
 const can = (capability: string) => Boolean(session?.capabilities.includes(capability));
 function selectItem(item: Item | null, create = false) {
  if (reviewDirty && !window.confirm('저장하지 않은 후기 수정이 있습니다. 이 수정을 버리고 다른 항목을 열까요?')) return;
  setCreatingReview(create); setSelected(item); setText(item?.publicText || ''); setReason(''); setReviewDirty(false); setReviewSelection(value => value + 1);
 }
 async function reviewSaved(item: QuoteReviewItem) { setSelected(item); setCreatingReview(false); setReviewDirty(false); setReviewSelection(value => value + 1); await load(); }
 async function api(path: string, options: RequestInit = {}) {
  const endpoint = apiEndpoint('/api/admin/' + path);
  if (!endpoint) throw new Error('콘텐츠 검토실은 Worker 운영 배포에서 사용할 수 있습니다.');
  const response = await fetch(endpoint, { ...options, headers: { 'Content-Type': 'application/json', 'x-admin-token': token } });
  const result = await response.json();
  if (!response.ok) throw Object.assign(new Error(result.error || '요청을 처리하지 못했습니다.'), { status: response.status });
  return result;
 }
 async function load() {
  setBusy(true); setError('');
  try { const [s, c, h, a] = await Promise.all([api('session') as Promise<AdminSession>, api('content'), api('history'), api('analytics')]); setSession(s); setItems(c.items); setHistory(h.items); setAnalytics(a); setLoaded(true); }
  catch (e) { setError(e instanceof Error ? e.message : '연결 실패'); }
  finally { setBusy(false); }
 }
 async function save(status?: string) {
  if (!selected) return;
  setBusy(true); setError('');
  try { const result = await api('content/' + encodeURIComponent(selected.id), { method: 'PATCH', body: JSON.stringify({ revision: selected.revision, reason, publicText: text, ...(status ? { status } : {}) }) }); setSelected(result); setText(result.publicText || ''); setReason(''); await load(); }
  catch (e) { setError(e instanceof Error ? e.message : '저장 실패'); }
  finally { setBusy(false); }
 }
 return <div className="admin">
  <aside><a className="brand" href={siteRoot}>Cellpinda.</a><a href="#content">콘텐츠 검토</a><a href="#history">승인 이력</a><a href="#analytics">행동 분석</a><a href={siteRoot}>사이트 보기 ↗</a></aside>
  <main><h1>콘텐츠 검토실</h1><p>근거와 문구를 확인하고 공개 상태를 관리합니다.</p>
   {!loaded ? <form onSubmit={e => { e.preventDefault(); void load(); }} className="admin-login"><label>운영자 접근 키<input type="password" value={token} autoComplete="off" onChange={e => setToken(e.target.value)} required /></label><p>역할별 접근 키를 입력하면 편집·검토·승인 권한이 자동으로 적용됩니다.</p>{isLocal ? <p className="note">로컬 서버를 사용하는 경우 서버가 생성한 비밀 키 파일에서 접근 키를 확인할 수 있습니다.</p> : null}<button className="button" disabled={busy}>검토실 열기</button></form> : <>
    {session ? <p className="admin-session" role="status"><strong>{session.roleLabel}</strong> · 현재 권한: {session.capabilities.map(capability => ({ read: '읽기', edit: '편집', review: '보류 검토', approve: '공개 승인' }[capability] || capability)).join(' · ')}</p> : null}
    <div id="content" className="admin-grid">
     <div className="admin-list"><button type="button" className="button outline" disabled={busy || !can('edit')} onClick={() => selectItem(null, true)}>새 인용 후기 등록</button>{items.map(item => <button key={item.id} className={selected?.id === item.id ? 'selected' : ''} onClick={() => selectItem(item)}><strong>{item.reviewType === 'quote' ? `인용 후기 · ${item.review?.authorLabel || '작성자 미확인'}` : item.topic || item.name || item.id}</strong><span>{item.status === 'approved' ? '공개' : '보류'} · v{item.revision}</span><p>{item.publicText || '공개 문안 미확정'}</p></button>)}</div>
     <section className="admin-edit">{creatingReview || selected?.reviewType === 'quote' ? <ReviewEditor key={`${selected?.id || 'new'}:${reviewSelection}:${selected?.revision || 0}`} item={creatingReview ? null : selected as QuoteReviewItem} api={api} onSaved={reviewSaved} onDirtyChange={setReviewDirty} onRefresh={load} canEdit={can('edit')} canReview={can('review')} canApprove={can('approve')} /> : selected ? <>
      <h2>문구 상세</h2><label>공개 문구<textarea rows={6} value={text} readOnly={selected.id.startsWith('shop-review-destination')} onChange={e => setText(e.target.value)} /></label>
      {selected.id.startsWith('shop-review-destination') ? <p className="note">스마트스토어 후기 원문으로 이동하는 고정 안내입니다. 문구는 수정하지 않고 공개·보류 상태만 관리합니다. 실제 인용 후기는 ‘새 인용 후기 등록’에서 원문과 게시 권한을 확인하여 등록하세요.</p> : null}
      <h3>근거 자료 · 읽기 전용</h3>
      {selected.sources?.map((source, index) => <div key={index}><p>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a> : source.title}</p>{source.page || source.locator ? <p className="note">{source.page ? `${source.page}쪽 · ` : ''}{source.locator}</p> : null}</div>)}
      {selected.sourceTitle ? <p>{selected.sourceUrl ? <a href={selected.sourceUrl} target="_blank" rel="noreferrer">{selected.sourceTitle} ↗</a> : selected.sourceTitle}</p> : null}
      {!selected.sources?.length && !selected.sourceTitle ? <p className="note">등록된 근거 자료가 없습니다.</p> : null}
      {selected.metadata ? <><h3>연구 상세 · 읽기 전용</h3><dl>{Object.entries(selected.metadata).map(([key, value]) => <div key={key} style={{ marginBottom: 16 }}><dt><strong>{metadataLabels[key] || key}</strong></dt><dd style={{ margin: '6px 0', lineHeight: 1.7 }}>{Array.isArray(value) ? <ul>{value.map((entry, i) => <li key={i}>{entry}</li>)}</ul> : value ?? '미확인'}</dd></div>)}</dl></> : null}
      {selected.limitations?.length ? <><h3>표현·적용 한계</h3><ul>{selected.limitations.map((limitation, i) => <li key={i}>{limitation}</li>)}</ul></> : null}
      {selected.holdReason ? <p className="note">보류 사유: {selected.holdReason}</p> : null}
      {selected.reviewedAt || selected.reviewedBy ? <p className="note">자료 검토: {selected.reviewedBy || '미기재'} · {selected.reviewedAt || '검토일 미기재'}</p> : null}
      <label>수정·검토 이유<textarea rows={3} value={reason} onChange={e => setReason(e.target.value)} /></label><p className="note">문구를 수정 저장하면 보류로 전환됩니다. 공개 승인은 근거와 표현 범위를 검토한 뒤 선택하세요. 근거 상세는 이 화면에서 변경하지 않습니다.</p>
      <div className="actions"><button className="button outline" disabled={busy || !reason.trim() || !text.trim() || !can('edit')} onClick={() => save()}>수정 저장</button><button className="button" disabled={busy || !reason.trim() || !text.trim() || !can('approve')} onClick={() => save('approved')}>공개 승인</button><button className="button outline" disabled={busy || !reason.trim() || !text.trim() || !can('review')} onClick={() => save('hold')}>보류</button></div>
     </> : <p>검토할 문구를 선택하세요.</p>}</section>
    </div>
    <section id="analytics" className="admin-panel"><h2>행동 분석</h2><button className="button outline" disabled={busy} onClick={() => void load()}>집계 새로고침</button>
     <p>한 번 열린 페이지 안에서 이어진 행동을 익명 흐름으로 묶습니다. 사람 수나 재방문 세션 수가 아니며, 페이지를 새로 열면 다른 흐름이 됩니다.</p>
     {analytics.window ? <p className="note">집계 기간: {formatDate(analytics.window.from)} ~ {formatDate(analytics.window.to)} · 수집된 전체 기간 · 서버가 받은 순서로 다음 행동을 판단합니다.</p> : null}
     {analytics.coverage ? <p className="note">흐름 식별 가능: {analytics.coverage.distinctFlows.toLocaleString()}개 · 흐름 정보 없는 이벤트: {analytics.coverage.eventsWithoutFlow.toLocaleString()}건 (아래 전환율에서 제외, 원시 건수에는 포함)</p> : null}
     {analytics.goalFunnel?.length ? <section className="goal-funnel" aria-labelledby="goal-funnel-heading"><h3 id="goal-funnel-heading">소비자 여정 퍼널</h3><p className="note">방문부터 구매처 이동까지, 명세에 정의한 익명 이벤트의 흐름을 한 줄로 확인합니다. 공유 유입은 발신자와 수신자가 다른 흐름이라 연결 전환율이 아닙니다.</p><ol>{analytics.goalFunnel.map(stage => <li key={stage.event}><span className="goal-funnel-index">{String(analytics.goalFunnel!.indexOf(stage)+1).padStart(2,'0')}</span><strong>{goalFunnelLabels[stage.event] || eventLabel(stage.event)}</strong><span className="goal-funnel-count">{stage.flows.toLocaleString()} 흐름 · {stage.events.toLocaleString()}회</span></li>)}</ol></section> : null}
     <h3>단계별 전환</h3>
     {analytics.funnels?.length ? analytics.funnels.map(funnel => <article key={funnel.id} style={{ padding: '20px 0', borderBottom: '1px solid #d9e5dc' }}><h4>{funnelLabels[funnel.id] || `${eventLabel(funnel.from)} → ${eventLabel(funnel.to)}`}</h4><p><strong>{funnel.denominator === 0 || funnel.rate === null ? '집계 대기' : `${(funnel.rate * 100).toLocaleString('ko-KR', { maximumFractionDigits: 1 })}%`}</strong> · {funnel.numerator.toLocaleString()} / {funnel.denominator.toLocaleString()}개 흐름</p><p className="note">분모: ‘{eventLabel(funnel.from)}’이 발생한 서로 다른 익명 흐름 수.<br />분자: 분모에 포함된 흐름 중, 그 뒤 ‘{eventLabel(funnel.to)}’이 서버에 도착한 흐름 수. 같은 흐름은 한 번만 셉니다.</p></article>) : <p>전환 집계를 준비 중입니다.</p>}
     {analytics.sharingMetrics ? <section aria-labelledby="sharing-metrics-heading" style={{ margin: '32px 0', padding: '24px 0', borderTop: '1px solid #d9e5dc', borderBottom: '1px solid #d9e5dc' }}>
      <h3 id="sharing-metrics-heading">화면별 공유 시도</h3>
      <p className="note">공유 시도율은 해당 화면을 본 익명 페이지 흐름 중, 그 뒤 같은 화면에서 공유 요청·링크 복사·이미지 다운로드를 한 번 이상 시도한 흐름의 비율입니다. 반복 시도는 한 흐름으로 세며, 공유 창에서 취소한 요청도 시도에 포함합니다.</p>
      <p className="note">실제 전달이나 구매를 확인한 비율이 아닙니다. 요청·복사·다운로드·취소에는 같은 흐름이 겹칠 수 있으므로 아래 세부 수치를 합산하지 않습니다.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 18 }}>{analytics.sharingMetrics.scopes.map(scope => <article key={scope.id} style={{ padding: 20, border: '1px solid #d9e5dc', borderRadius: 6 }}>
        <h4 style={{ margin: '0 0 15px', fontSize: 17 }}>{sharingLabels[scope.id] || scope.id}</h4>
        <p style={{ margin: '0 0 8px', fontSize: 26, color: '#18382b' }}><strong>{scope.denominator === 0 || scope.attemptRate === null ? '집계 대기' : `${(scope.attemptRate * 100).toLocaleString('ko-KR', { maximumFractionDigits: 1 })}%`}</strong></p>
        <p className="note">공유 시도 {scope.attemptFlows.toLocaleString()} / 화면 열람 {scope.denominator.toLocaleString()}개 흐름</p>
        <dl style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px 16px', margin: '18px 0 0', fontSize: 13 }}>
          <dt>공유 요청</dt><dd style={{ margin: 0 }}>{scope.requestedFlows.toLocaleString()}개 흐름</dd>
          <dt>링크 복사</dt><dd style={{ margin: 0 }}>{scope.copiedFlows.toLocaleString()}개 흐름</dd>
          <dt>이미지 다운로드</dt><dd style={{ margin: 0 }}>{scope.downloadedFlows.toLocaleString()}개 흐름</dd>
          <dt>공유 취소</dt><dd style={{ margin: 0 }}>{scope.cancelledFlows.toLocaleString()}개 흐름</dd>
        </dl>
      </article>)}</div>
      <p className="note" style={{ marginTop: 18 }}>공유 화면을 구분할 정보가 없는 이전 이벤트 {analytics.sharingMetrics.unscopedShareEvents.toLocaleString()}건은 화면별 집계에서 제외했습니다. 전체 원시 발생 건수에는 포함될 수 있습니다.</p>
     </section> : null}
     <h3>행동별 원시 발생 건수</h3><p className="note">이벤트가 발생한 횟수입니다. 같은 흐름의 반복 행동을 포함하며 위 전환율의 분모·분자와 다를 수 있습니다.</p>
     {analytics.counts.length ? <div style={{ overflowX: 'auto' }}><table><thead><tr><th scope="col">행동</th><th scope="col">발생 건수</th></tr></thead><tbody>{analytics.counts.map(count => <tr key={count.name}><td>{eventLabel(count.name)}</td><td>{count.count.toLocaleString()}</td></tr>)}</tbody></table></div> : <p>수집된 이벤트가 없습니다.</p>}
     <p className="note">실제 구매·7일 재방문은 아직 측정하지 않습니다. 구매 링크 이동을 구매 완료로 집계하지 않습니다. 공유 요청·복사는 전달 완료가 아니며, 공유 요청자와 링크 방문자를 연결한 전환율도 집계하지 않습니다.</p>
    </section>
    <section id="history" className="admin-panel"><h2>승인·수정 이력</h2>{history.map(entry => <div className="history-row" key={entry.id}><strong>{entry.content_id}</strong><span>{entry.reason}</span><small>{formatDate(entry.created_at)}</small></div>)}</section>
   </>}{error ? <p role="alert" className="error">{error}</p> : null}
  </main>
 </div>;
}
