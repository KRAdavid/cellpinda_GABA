import { useEffect, useState } from 'react';
import './ReviewEditor.css';

export type ReviewDraft = { productId: string; authorLabel: string; sourceTitle: string; sourceUrl: string; authoredAt: string; usagePeriod: string; quote: string; context: string; disclosure: string; rightsEvidence: string; rightsScope: string; rightsExpiresAt: string };
export type ReviewConfirmation = { rightsConfirmed: boolean; contextConfirmed: boolean; disclosureConfirmed: boolean; publicationConfirmed: boolean; reviewer: string; reviewedAt: string; editorialNote: string };
export type QuoteReviewItem = { id: string; kind: 'review'; reviewType: 'quote'; review: ReviewDraft; reviewConfirmation?: ReviewConfirmation; status: string; revision: number; publicText?: string };
type Props = { item: QuoteReviewItem | null; api: (path: string, options?: RequestInit) => Promise<unknown>; onSaved: (item: QuoteReviewItem) => void | Promise<void>; onDirtyChange: (dirty: boolean) => void; onRefresh: () => void | Promise<void>; canEdit?: boolean; canReview?: boolean; canApprove?: boolean };
const emptyReview: ReviewDraft = { productId: '', authorLabel: '', sourceTitle: '', sourceUrl: '', authoredAt: '', usagePeriod: '', quote: '', context: '', disclosure: '', rightsEvidence: '', rightsScope: '', rightsExpiresAt: '' };
const blankConfirmation = (): ReviewConfirmation => ({ rightsConfirmed: false, contextConfirmed: false, disclosureConfirmed: false, publicationConfirmed: false, reviewer: '', reviewedAt: '', editorialNote: '' });
const fields: { key: Exclude<keyof ReviewDraft, 'productId'>; label: string; max: number; multiline?: boolean; type?: string; private?: boolean }[] = [
  { key: 'authorLabel', label: '공개 작성자 표시명', max: 100 },
  { key: 'sourceTitle', label: '원문 제목', max: 250 },
  { key: 'sourceUrl', label: '원문 HTTPS 주소', max: 2048, type: 'url' },
  { key: 'authoredAt', label: '후기 작성일', max: 10, type: 'date' },
  { key: 'usagePeriod', label: '사용 기간 (선택)', max: 300 },
  { key: 'quote', label: '공개할 후기 인용문', max: 3000, multiline: true },
  { key: 'context', label: '선택 배경과 사용 맥락', max: 2000, multiline: true },
  { key: 'disclosure', label: '제품 제공·협찬·보상 관계 표시', max: 1000, multiline: true },
  { key: 'rightsEvidence', label: '재게시 권한 확인 근거', max: 2000, multiline: true, private: true },
  { key: 'rightsScope', label: '허용된 인용·게시 범위', max: 1000, multiline: true, private: true },
  { key: 'rightsExpiresAt', label: '게시 권한 만료일 (선택 · 한국 날짜)', max: 10, type: 'date', private: true },
];
const checks: { key: 'rightsConfirmed' | 'contextConfirmed' | 'disclosureConfirmed' | 'publicationConfirmed'; label: string }[] = [
  { key: 'rightsConfirmed', label: '재게시 권한, 게시 채널·기간과 작성자 공개 범위를 확인했습니다.' },
  { key: 'contextConfirmed', label: '인용문을 원문과 대조했고, 발췌가 원래 의미와 맥락을 바꾸지 않습니다.' },
  { key: 'disclosureConfirmed', label: '제공·대가 관계를 확인했습니다. 미확인 관계를 없음으로 표시하지 않았습니다.' },
  { key: 'publicationConfirmed', label: '실제 사용 제품과의 대응 및 공개 광고 문구를 검토했고, 이 저장본의 공개를 확인합니다.' },
];

export default function ReviewEditor({ item, api, onSaved, onDirtyChange, onRefresh, canEdit = true, canReview = true, canApprove = true }: Props) {
  const [review, setReview] = useState<ReviewDraft>(() => ({ ...emptyReview, ...item?.review }));
  const [confirmation, setConfirmation] = useState(blankConfirmation);
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [conflict, setConflict] = useState(false);
  const [message, setMessage] = useState('');
  const dirty = JSON.stringify(review) !== JSON.stringify({ ...emptyReview, ...item?.review });
  useEffect(() => { onDirtyChange(dirty); }, [dirty, onDirtyChange]);
  function edit(key: keyof ReviewDraft, value: string) {
    setReview(current => ({ ...current, [key]: value })); setConfirmation(blankConfirmation()); setMessage('');
  }
  const missing = (Object.keys(emptyReview) as (keyof ReviewDraft)[]).filter(key => !['usagePeriod', 'rightsExpiresAt'].includes(key) && !review[key].trim());
  const approvedReady = Boolean(item) && !dirty && !conflict && missing.length === 0 && checks.every(check => confirmation[check.key]) && Boolean(confirmation.reviewer.trim()) && Boolean(confirmation.reviewedAt) && Boolean(reason.trim());
  async function submit(action: 'save' | 'approved' | 'hold') {
    if (!reason.trim() || conflict || (action === 'save' && !canEdit) || (action === 'approved' && (!canApprove || !approvedReady)) || (action === 'hold' && !canReview) || (action !== 'save' && (!item || dirty))) return;
    setBusy(true); setError(''); setMessage('');
    try {
      const path = action === 'save' ? item ? `reviews/${encodeURIComponent(item.id)}` : 'reviews' : `reviews/${encodeURIComponent(item!.id)}/decision`;
      const body = action === 'save' ? { review, reason, ...(item ? { revision: item.revision } : {}) } : { status: action, reason, revision: item!.revision, ...(action === 'approved' ? { confirmation } : {}) };
      const result = await api(path, { method: action === 'save' && item ? 'PATCH' : 'POST', body: JSON.stringify(body) }) as QuoteReviewItem;
      setConfirmation(blankConfirmation()); setReason('');
      await onSaved(result);
      setMessage(action === 'approved' ? '이 저장본의 공개 검토를 기록했습니다.' : '후기를 보류 상태로 저장했습니다. 공개하려면 저장본을 다시 검토해 주세요.');
    } catch (value) {
      if (value instanceof Error && 'status' in value && value.status === 409) { setConflict(true); setConfirmation(blankConfirmation()); setError('다른 작업에서 저장본이 바뀌었습니다. 현재 입력은 유지했으며 덮어쓰지 않았습니다. 목록을 새로고침해 최신 항목을 확인하세요.'); }
      else setError(value instanceof Error ? value.message : '요청을 처리하지 못했습니다. 입력 내용은 유지됩니다.');
    } finally { setBusy(false); }
  }

  return <div className="review-editor"><h2>{item ? '인용 후기 편집' : '새 후기 초안'}</h2><p className="note">인용문은 원문 직접 인용·발췌만 등록하세요. 요약 재작성은 지원하지 않으며 사용 맥락은 별도 설명입니다. 미완성 초안도 보류 저장할 수 있습니다.</p>
    {item ? <p className="review-editor-version">현재 저장본: {item.status === 'approved' ? '공개' : '보류'} · v{item.revision}</p> : null}
    <p className="note">승인된 후기라도 권한 만료 또는 제품 공개 중단 시 소비자 화면에 표시되지 않습니다.</p>
    <div className="review-editor-fields"><label htmlFor="quote-product">실제 사용 제품<select id="quote-product" value={review.productId} onChange={event => edit('productId', event.target.value)} disabled={busy || !canEdit}><option value="">미확인</option><option value="gaba1500">셀핀다 가바 1500</option></select></label>
      {fields.map(field => <label key={field.key} htmlFor={`quote-${field.key}`}>{field.label}{field.private ? <small>내부 검토용</small> : null}{field.multiline ? <textarea id={`quote-${field.key}`} rows={3} maxLength={field.max} value={review[field.key]} onChange={event => edit(field.key, event.target.value)} disabled={busy || !canEdit} /> : <input id={`quote-${field.key}`} type={field.type || 'text'} maxLength={field.max} value={review[field.key]} onChange={event => edit(field.key, event.target.value)} disabled={busy || !canEdit} />}</label>)}
    </div>
    <p className="note">게시 권한 만료일은 한국 날짜 기준 해당 일까지입니다. 비워두면 기한 없는 권한으로 취급되므로 허용된 게시 범위에 그 근거를 적어 주세요.</p><label htmlFor="quote-reason">저장·검토 이유<textarea id="quote-reason" rows={2} maxLength={1000} value={reason} onChange={event => setReason(event.target.value)} disabled={busy} /></label>
    <p className="note">수정 저장하면 보류로 바뀌고 이전 공개 확인이 해제됩니다. 확인 체크는 다른 후기나 수정본에 재사용하지 않습니다.</p>
    <button type="button" className="button outline" disabled={busy || conflict || !reason.trim() || !canEdit} onClick={() => void submit('save')}>{item ? '수정본 보류 저장' : '초안 보류 저장'}</button>
    {item ? <section className="review-editor-decision" aria-labelledby="quote-decision-title"><h3 id="quote-decision-title">저장된 동일 버전의 공개 검토</h3><p className="note">한 운영자가 남기는 검토 기록입니다. 여러 독립 전문가의 검증이나 인증을 의미하지 않습니다.</p>{dirty ? <p className="review-editor-notice">저장하지 않은 수정이 있습니다. 먼저 보류 저장한 뒤 해당 저장본을 검토하세요.</p> : null}{missing.length ? <p className="review-editor-notice">공개 전 {missing.length}개 필수 항목을 채워 저장해야 합니다. 사용 기간과 권한 만료일은 선택 항목입니다.</p> : null}
      <fieldset disabled={busy || dirty || conflict || !canApprove}><legend>공개 전 확인</legend>{checks.map(check => <label className="review-editor-check" key={check.key}><input type="checkbox" checked={confirmation[check.key]} onChange={event => setConfirmation(current => ({ ...current, [check.key]: event.target.checked }))} /><span>{check.label}</span></label>)}<label htmlFor="quote-reviewer">검토자<input id="quote-reviewer" maxLength={100} value={confirmation.reviewer} onChange={event => setConfirmation(current => ({ ...current, reviewer: event.target.value }))} /></label><label htmlFor="quote-reviewedAt">검토일<input id="quote-reviewedAt" type="date" value={confirmation.reviewedAt} onChange={event => setConfirmation(current => ({ ...current, reviewedAt: event.target.value }))} /></label><label htmlFor="quote-editorialNote">검토 메모 (선택)<textarea id="quote-editorialNote" maxLength={2000} rows={2} value={confirmation.editorialNote} onChange={event => setConfirmation(current => ({ ...current, editorialNote: event.target.value }))} /></label></fieldset>
      <div className="actions"><button type="button" className="button" disabled={busy || !approvedReady || !canApprove} onClick={() => void submit('approved')}>확인한 저장본 공개 승인</button><button type="button" className="button outline" disabled={busy || conflict || dirty || !reason.trim() || !canReview} onClick={() => void submit('hold')}>공개 중단·보류</button></div>
      {item.reviewConfirmation ? <details className="review-editor-previous"><summary>이 저장본에 남아 있는 이전 검토 기록</summary><p>검토자: {item.reviewConfirmation.reviewer} · {item.reviewConfirmation.reviewedAt}</p><p>{item.reviewConfirmation.editorialNote || '별도 메모 없음'}</p></details> : null}
    </section> : <p className="note">초안을 먼저 저장하면 공개 검토 항목이 나타납니다.</p>}
    {conflict ? <button type="button" className="text-link" onClick={() => void onRefresh()}>입력을 유지하고 목록 새로고침</button> : null}{error ? <p className="error" role="alert">{error}</p> : null}<p role="status" className="review-editor-status">{message}</p>
  </div>;
}

