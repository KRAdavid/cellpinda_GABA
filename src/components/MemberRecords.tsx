import { useEffect, useState } from 'react';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import { ArrowLeft, Download, KeyRound, LogOut, Trash2 } from 'lucide-react';
import { CHALLENGE_STORAGE_KEY, challengeHabits, createChallenge, localCalendarDate, parseChallenge, updateChallengeDay } from '../domain/challenge';
import type { ChallengeRecord } from '../domain/challenge';
import './MemberRecords.css';

type MemberStatus = { enabled: boolean; user: { id: string } | null; recoverySupported: boolean };
type SavedRecord = { record: ChallengeRecord | null; revision: number };
type ArchiveSummary = { id: string; startDate: string; completedDays: number; totalDays: number; createdAt: string; sourceRevision: number };
type ArchiveDetail = { id: string; record: ChallengeRecord; createdAt: string; sourceRevision: number };
type ArchiveList = { items: ArchiveSummary[]; limit: number; truncated: boolean };
class MemberError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) { super(message); this.status = status; this.code = code; }
}
async function request<T>(path: string, options: RequestInit = {}, memberId?: string): Promise<T> {
  const response = await fetch(`/api/member/${path}`, { ...options, credentials: 'same-origin', headers: { 'Content-Type': 'application/json', ...(memberId ? { 'X-Member-ID': memberId } : {}) } });
  const body = await response.json();
  if (!response.ok) throw new MemberError(body.error || '요청을 처리하지 못했어요.', response.status, body.code);
  return body;
}
function normalizeSaved(value: SavedRecord): SavedRecord {
  const record = value.record === null ? null : parseChallenge(value.record);
  if ((value.record !== null && !record) || !Number.isInteger(value.revision) || value.revision < 0) throw new Error('저장된 기록을 읽지 못했어요. 잠시 후 다시 시도해 주세요.');
  return { record, revision: value.revision };
}

export default function MemberRecords() {
  const [status, setStatus] = useState<MemberStatus | null>(null);
  const [saved, setSaved] = useState<SavedRecord>({ record: null, revision: 0 });
  const [recordOwner, setRecordOwner] = useState<string | null>(null);
  const [recordReady, setRecordReady] = useState(false);
  const [draft, setDraft] = useState<ChallengeRecord | null>(null);
  const [signupConsent, setSignupConsent] = useState(false);
  const [storageConsent, setStorageConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [conflict, setConflict] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<'record' | 'account' | null>(null);
  const [today, setToday] = useState(localCalendarDate);
  const [archives, setArchives] = useState<ArchiveList>({ items: [], limit: 100, truncated: false });
  const [archiveDetail, setArchiveDetail] = useState<ArchiveDetail | null>(null);
  const [archiveConsent, setArchiveConsent] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);
  const [deleteArchiveId, setDeleteArchiveId] = useState<string | null>(null);
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved.record);

  useEffect(() => {
    let cancelled = false;
    request<MemberStatus>('status').then(async result => {
      if (cancelled) return;
      setStatus(result);
      if (result.enabled && result.user) {
        const value = normalizeSaved(await request<SavedRecord>('challenge', {}, result.user.id));
        if (!cancelled) { setSaved(value); setDraft(value.record); setRecordOwner(result.user.id); setRecordReady(true); }
      }
    }).catch(value => { if (!cancelled) showError(value); });
    const refreshDate = () => setToday(localCalendarDate());
    window.addEventListener('focus', refreshDate);
    return () => { cancelled = true; window.removeEventListener('focus', refreshDate); };
  }, []);
  useEffect(() => {
    let cancelled = false;
    const memberId = status?.user?.id;
    setArchives({ items: [], limit: 100, truncated: false }); setArchiveDetail(null);
    setArchiveConsent(false); setConfirmArchive(false); setDeleteArchiveId(null);
    if (memberId && recordReady) request<ArchiveList>('archives', {}, memberId).then(value => {
      if (!cancelled) setArchives(value);
    }).catch(value => { if (!cancelled) showError(value); });
    return () => { cancelled = true; };
  }, [status?.user?.id, recordReady]);

  function showError(value: unknown) {
    if (value instanceof MemberError && value.code === 'account_changed') {
      setRecordReady(false); setSaved({ record: null, revision: 0 }); setDraft(null); setRecordOwner(null);
      setStorageConsent(false); setConfirmDelete(null); setConflict(false);
      setArchives({ items: [], limit: 100, truncated: false }); setArchiveDetail(null); setArchiveConsent(false); setConfirmArchive(false); setDeleteArchiveId(null);
      setStatus(current => current ? { ...current, user: null } : current);
      setError('다른 탭에서 로그인한 회원이 바뀌었어요. 이전 기록을 숨겼습니다. 사용할 회원의 패스키로 다시 로그인해 주세요. 저장하지 않은 화면 수정은 반영되지 않았어요.');
    } else if (value instanceof MemberError && value.code === 'revision_conflict') {
      setConflict(true);
      setError('다른 화면에서 기록이 바뀌었어요. 현재 수정 내용은 아직 저장하지 않았습니다. 최신 기록을 다시 불러온 뒤 수정해 주세요.');
    } else if (value instanceof MemberError && value.code === 'reauthentication_required') {
      setError('안전한 삭제를 위해 패스키로 다시 로그인한 뒤 시도해 주세요.');
    } else if (value instanceof MemberError && value.status === 401) {
      setError('로그인이 만료되었어요. 다시 로그인해 주세요. 브라우저의 원래 기록은 그대로 남아 있어요.');
      setStatus(current => current ? { ...current, user: null } : current);
    } else if (value instanceof Error && ['NotAllowedError', 'AbortError'].includes(value.name)) {
      setError('패스키 요청이 취소되었거나 시간이 지났어요. 준비되면 다시 시도해 주세요.');
    } else if (value instanceof Error && ['NotSupportedError', 'SecurityError'].includes(value.name)) {
      setError('이 환경에서는 패스키를 사용할 수 없어요. 지원하는 브라우저에서 다시 시도해 주세요.');
    } else setError('요청을 완료하지 못했어요. 연결 상태를 확인하고 다시 시도해 주세요.');
  }
  async function run(action: () => Promise<void>) {
    setBusy(true); setError(''); setMessage('');
    try { await action(); } catch (value) { showError(value); } finally { setBusy(false); }
  }
  async function refreshRecord() {
    const value = normalizeSaved(await request<SavedRecord>('challenge', {}, status?.user?.id));
    setSaved(value); setDraft(value.record); setConflict(false); setConfirmDelete(null);
    setRecordReady(true);
    setRecordOwner(status?.user?.id ?? null);
    setMessage('회원 저장공간의 최신 기록을 불러왔어요.');
  }
  function authenticate(mode: 'signup' | 'login') {
    if (mode === 'signup' && !signupConsent) return;
    void run(async () => {
      if (!window.PublicKeyCredential || !navigator.credentials) { setError('이 브라우저에서는 패스키를 지원하지 않아요. 브라우저의 7일 기록은 계속 이용할 수 있습니다.'); return; }
      let response;
      if (mode === 'signup') {
        const options = await request<{ options: Parameters<typeof startRegistration>[0]['optionsJSON'] }>('signup/options', { method: 'POST', body: JSON.stringify({ consent: true, policyVersion: '1' }) });
        response = await startRegistration({ optionsJSON: options.options });
      } else {
        const options = await request<{ options: Parameters<typeof startAuthentication>[0]['optionsJSON'] }>('login/options', { method: 'POST', body: '{}' });
        response = await startAuthentication({ optionsJSON: options.options });
      }
      const result = await request<{ user: { id: string } }>(`${mode}/verify`, { method: 'POST', body: JSON.stringify({ response }) });
      const retainDraft = recordOwner === result.user.id && dirty;
      const previousDraft = draft;
      const previousSaved = saved;
      setRecordReady(false);
      setConfirmDelete(null); setConflict(false);
      if (!retainDraft) { setSaved({ record: null, revision: 0 }); setDraft(null); }
      setRecordOwner(result.user.id);
      setStatus({ enabled: true, user: result.user, recoverySupported: false });
      setStorageConsent(false); setSignupConsent(false);
      let value: SavedRecord;
      try { value = normalizeSaved(await request<SavedRecord>('challenge', {}, result.user.id)); }
      catch (error) { if (retainDraft) setRecordReady(true); throw error; }
      setSaved(retainDraft ? previousSaved : value);
      setDraft(retainDraft ? previousDraft : value.record);
      setRecordReady(true);
      if (retainDraft && previousSaved.revision !== value.revision) {
        setConflict(true);
        setError('다른 화면에서 기록이 바뀌었어요. 작성 중이던 메모는 이 화면에 남겨 두었습니다. 필요한 내용을 보관한 뒤 최신 기록을 다시 불러와 주세요.');
      } else setMessage(retainDraft ? '다시 로그인했어요. 아직 저장하지 않은 수정 내용은 유지했습니다. 저장 동의를 다시 확인해 주세요.' : '회원 저장공간의 기록을 불러왔어요.');
    });
  }
  function importLocal() {
    if (!storageConsent) return;
    try {
      const raw = localStorage.getItem(CHALLENGE_STORAGE_KEY);
      const record = raw ? parseChallenge(JSON.parse(raw)) : null;
      if (!record) { setError('가져올 날짜별 7일 기록이 없어요. 먼저 브라우저에서 7일 기록을 시작해 주세요.'); return; }
      setDraft(record); setError('');
      setMessage('브라우저 기록을 아래에 준비했어요. 내용을 확인하고 저장하면 회원 공간에 반영됩니다. 원래 브라우저 기록은 그대로 남습니다.');
    } catch { setError('브라우저 기록을 읽지 못했어요. 저장 공간 설정을 확인해 주세요.'); }
  }
  function editDay(index: number, patch: { completed?: boolean; note?: string }) {
    if (!draft) return;
    try { const date = localCalendarDate(); setToday(date); setDraft(updateChallengeDay(draft, index, patch, date)); }
    catch { setError('미래 날짜에는 기록할 수 없어요. 날짜와 메모 길이를 확인해 주세요.'); }
  }
  function save() {
    if (!draft || !storageConsent || conflict) return;
    void run(async () => {
      const value = normalizeSaved(await request<SavedRecord>('challenge', { method: 'PUT', body: JSON.stringify({ record: draft, revision: saved.revision, consent: true, policyVersion: '1' }) }, status?.user?.id));
      setSaved(value); setDraft(value.record); setMessage('회원 저장공간에 기록했어요. 로그인한 다른 브라우저에서도 불러올 수 있습니다.');
    });
  }
  function exportSaved() {
    if (!saved.record) return;
    downloadRecord(saved.record, `cellpinda-member-${saved.record.startDate}.json`);
    setMessage('서버에 저장된 기록을 내려받았어요. 아직 저장하지 않은 수정은 포함되지 않습니다.');
  }
  function downloadRecord(record: ChallengeRecord, filename: string) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: 'application/json;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = filename;
    document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function refreshArchives() {
    setArchives(await request<ArchiveList>('archives', {}, status?.user?.id));
  }
  function archiveCurrent() {
    if (!saved.record || dirty || !archiveConsent || conflict) return;
    void run(async () => {
      const response = await request<SavedRecord & { duplicate: boolean }>('challenge/archive', { method: 'POST', body: JSON.stringify({ revision: saved.revision, consent: true, policyVersion: '1' }) }, status?.user?.id);
      const value = normalizeSaved(response);
      setSaved(value); setDraft(value.record); setConfirmArchive(false); setArchiveConsent(false);
      await refreshArchives();
      setMessage(response.duplicate ? '이미 보관한 요청이에요. 과거 이력과 최신 현재 기록을 다시 확인했습니다.' : '저장된 기록을 과거 이력에 보관했어요. 현재 기록은 비웠으며 새 7일을 준비할 수 있습니다.');
    });
  }
  function readArchive(id: string) {
    void run(async () => {
      const value = await request<ArchiveDetail>(`archives/${encodeURIComponent(id)}`, {}, status?.user?.id);
      const record = parseChallenge(value.record);
      if (!record) throw new Error('Invalid archived record');
      setArchiveDetail({ ...value, record }); setDeleteArchiveId(null);
    });
  }
  function deleteArchive() {
    if (!deleteArchiveId) return;
    void run(async () => {
      await request(`archives/${encodeURIComponent(deleteArchiveId)}`, { method: 'DELETE', body: '{}' }, status?.user?.id);
      if (archiveDetail?.id === deleteArchiveId) setArchiveDetail(null);
      setDeleteArchiveId(null); await refreshArchives();
      setMessage('선택한 과거 기록을 삭제했어요. 현재 7일 기록과 내려받은 파일은 그대로입니다.');
    });
  }
  function logout() {
    void run(async () => { await request('logout', { method: 'POST', body: '{}' }, status?.user?.id); setStatus(current => current ? { ...current, user: null } : null); setSaved({ record: null, revision: 0 }); setDraft(null); setRecordOwner(null); setRecordReady(false); setStorageConsent(false); setConfirmDelete(null); setConflict(false); setMessage('로그아웃했어요.'); });
  }
  function remove() {
    void run(async () => {
      if (confirmDelete === 'record') { const value = normalizeSaved(await request<SavedRecord>('challenge', { method: 'DELETE', body: JSON.stringify({ revision: saved.revision }) }, status?.user?.id)); setSaved(value); setDraft(null); setMessage('회원 저장공간의 기록을 지웠어요. 브라우저 원본과 내려받은 파일은 별도로 남아 있습니다.'); }
      else if (confirmDelete === 'account') { await request('account', { method: 'DELETE', body: '{}' }, status?.user?.id); setStatus(current => current ? { ...current, user: null } : null); setSaved({ record: null, revision: 0 }); setDraft(null); setStorageConsent(false); setMessage('회원 공간과 저장 기록을 삭제했어요. 브라우저 원본과 내려받은 파일은 별도로 남아 있습니다.'); }
      setConfirmDelete(null); setConflict(false);
    });
  }

  return <main className="member-records wrap">
    <a className="member-back" href="/"><ArrowLeft size={17} aria-hidden="true" /> 셀핀다로 돌아가기</a>
    <p className="chapter">나의 기록 · 베타</p><h1>작은 실천을,<br />다시 꺼내 보는 곳.</h1>
    <p className="member-intro">날짜별 7일 실천과 메모를 모아 보세요. 건강 상태나 제품 효과를 평가하지 않습니다.</p>
    {!status ? <p role="status">회원 공간을 확인하고 있어요.</p> : !status.enabled ? <section className="member-panel"><h2>지금은 브라우저 기록으로 만나요.</h2><p>이 임시 미리보기에서는 회원 가입과 서버 저장을 제공하지 않습니다. 7일 기록은 사용 중인 브라우저에서 시작하고 내려받을 수 있어요.</p><a className="button" href="/#lab">브라우저의 7일 기록 보기</a></section> : !status.user ? <section className="member-panel"><h2>패스키로 내 기록 열기</h2><p>이 회원 공간은 기능을 검증하는 베타입니다. 정식 서비스는 아직 열지 않았어요.</p><p className="note">패스키를 분실하면 계정을 복구하는 기능은 아직 없습니다. 보관할 기록은 파일로 내려받아 주세요.</p><button type="button" className="button" disabled={busy} onClick={() => authenticate('login')}><KeyRound size={18} aria-hidden="true" /> 패스키로 로그인</button><div className="member-signup"><label className="member-consent"><input type="checkbox" checked={signupConsent} onChange={event => setSignupConsent(event.target.checked)} /><span>회원 로그인에 필요한 패스키 등록정보를 저장하는 데 동의합니다. 패스키 분실 시 복구할 수 없음을 확인했어요.</span></label><button type="button" className="button outline" disabled={busy || !signupConsent} onClick={() => authenticate('signup')}>동의하고 패스키로 가입</button></div></section> : !recordReady ? <section className="member-panel"><p role="status">회원 저장공간의 기록을 확인하고 있어요.</p><button type="button" className="text-link" disabled={busy} onClick={() => void run(refreshRecord)}>서버 기록 다시 불러오기</button></section> : <>
      <div className="member-session"><p>내 회원 공간에 로그인되어 있어요.</p><button className="text-link" type="button" disabled={busy} onClick={logout}><LogOut size={17} aria-hidden="true" /> 로그아웃</button></div>
      <section className="member-panel"><h2>내 7일 기록</h2><p>브라우저의 기록은 자동으로 가져오지 않아요. 직접 가져와 확인한 뒤 저장하세요.</p><label className="member-consent"><input type="checkbox" checked={storageConsent} onChange={event => setStorageConsent(event.target.checked)} /><span>날짜별 실천과 개인 메모를 회원 저장공간에 저장하는 데 동의합니다.<small>저장하면 로그인한 다른 브라우저에서도 볼 수 있어요. 메모에 공개하고 싶지 않은 내용이 있는지 먼저 확인하세요.</small></span></label>
        <div className="member-actions"><button type="button" className="button outline" disabled={busy || !storageConsent || conflict} onClick={importLocal}>브라우저 기록 가져오기</button>{!saved.record ? <button type="button" className="button outline" disabled={busy || !storageConsent || conflict} onClick={() => { setDraft(createChallenge(localCalendarDate())); setMessage('오늘부터 시작하는 기록을 준비했어요. 저장하면 회원 공간에 반영됩니다.'); }}>새 7일 기록 준비</button> : null}<button type="button" className="text-link" disabled={busy} onClick={() => void run(refreshRecord)}>서버 기록 다시 불러오기</button></div>
        {dirty ? <p className="member-unsaved">아직 저장하지 않은 변경이 있어요. 다시 불러오면 이 화면의 변경은 사라집니다.{saved.record ? ' 저장하면 기존 회원 기록을 현재 내용으로 바꿉니다.' : ''}</p> : null}
        {draft ? <><p className="member-date-range">{draft.startDate} ~ {draft.days[6]!.date}</p><ol className="member-days">{draft.days.map((day, index) => <li key={day.date}><div><span className="member-day-date">{day.date}{day.date > today ? ' · 예정' : ''}</span><label><input type="checkbox" checked={day.completed} disabled={busy || conflict || day.date > today} onChange={event => editDay(index, { completed: event.target.checked })} /><span>{challengeHabits[index]}</span></label></div><label className="member-note">{index + 1}일차 메모<textarea aria-label={`${index + 1}일차 메모`} maxLength={1000} rows={2} value={day.note} disabled={busy || conflict || day.date > today} onChange={event => editDay(index, { note: event.target.value })} /></label></li>)}</ol><button type="button" className="button" disabled={busy || !storageConsent || !dirty || conflict} onClick={save}>동의한 기록 저장</button></> : <p className="note">회원 공간에 저장한 기록이 없습니다.</p>}
        <div className="member-actions"><button type="button" className="text-link" disabled={busy || !saved.record} onClick={exportSaved}><Download size={17} aria-hidden="true" /> 서버 기록 내려받기</button><button type="button" className="text-link" disabled={busy || !saved.record || conflict} onClick={() => setConfirmDelete('record')}><Trash2 size={17} aria-hidden="true" /> 서버 기록 삭제</button></div>
        {saved.record ? <div className="member-archive-current"><h3>이번 기록을 보관하고 다음 7일로</h3><label className="member-consent"><input type="checkbox" checked={archiveConsent} onChange={event => setArchiveConsent(event.target.checked)} /><span>현재 서버에 저장된 실천과 메모를 과거 이력에 보관하는 데 동의합니다.<small>보관하면 현재 기록은 비워집니다. 과거 이력은 직접 삭제하기 전까지 회원 공간에 남습니다.</small></span></label>{dirty ? <p className="member-unsaved">아직 저장하지 않은 변경이 있어 보관할 수 없어요. 먼저 저장하거나, 서버 기록을 다시 불러와 화면 수정을 취소해 주세요.</p> : null}<button type="button" className="button outline" disabled={busy || dirty || conflict || !archiveConsent} onClick={() => setConfirmArchive(true)}>현재 기록 보관하기</button></div> : null}
        {confirmArchive ? <section className="member-delete" aria-labelledby="member-archive-confirm"><h3 id="member-archive-confirm">저장된 기록을 과거 이력에 보관할까요?</h3><p>모든 날짜를 완료하지 않아도 보관할 수 있어요. 현재 기록을 비우고, 같은 내용을 과거 이력에서 읽을 수 있게 합니다.</p><div className="member-actions"><button type="button" className="button outline" disabled={busy} onClick={() => setConfirmArchive(false)}>보관 취소</button><button type="button" className="button" disabled={busy || dirty || conflict || !archiveConsent} onClick={archiveCurrent}>확인하고 보관</button></div></section> : null}
      </section>
      <section className="member-panel" aria-labelledby="member-archives-heading"><h2 id="member-archives-heading">지난 7일의 기록들</h2><p>날짜별 실천과 메모를 다시 읽어보세요. 실천 표시 수는 건강이나 제품 효과를 나타내는 점수가 아닙니다.</p><button type="button" className="text-link" disabled={busy} onClick={() => void run(refreshArchives)}>과거 기록 새로고침</button>{archives.truncated ? <p className="note">최근 {archives.limit}개 기록을 표시합니다. 더 오래된 기록은 이 목록에 표시되지 않습니다.</p> : null}{archives.items.length ? <ul className="member-archive-list">{archives.items.map(item => <li key={item.id}><div><strong>{item.startDate} 시작</strong><p className="note">실천 표시 {item.completedDays}일 · 7일 기록<br />보관일 {new Date(item.createdAt).toLocaleDateString('ko-KR')}</p></div><div className="member-actions"><button type="button" className="text-link" disabled={busy} onClick={() => readArchive(item.id)}>기록 읽기</button><button type="button" className="text-link" disabled={busy} onClick={() => setDeleteArchiveId(item.id)}>이 기록 삭제</button></div></li>)}</ul> : <p className="note">보관한 과거 기록이 없습니다.</p>}
        {archiveDetail ? <article className="member-archive-detail"><h3>{archiveDetail.record.startDate}의 7일 기록</h3><p className="note">보관한 시점의 기록입니다. 현재 7일 기록을 바꾸지 않고 읽습니다.</p><button type="button" className="text-link" onClick={() => { downloadRecord(archiveDetail.record, `cellpinda-archive-${archiveDetail.record.startDate}.json`); setMessage('과거 기록 다운로드를 요청했어요. 개인 메모가 포함되어 있습니다.'); }}><Download size={17} aria-hidden="true" /> 이 기록 내려받기</button><ol>{archiveDetail.record.days.map((day, index) => <li key={day.date}><p><strong>{day.date}</strong> · {day.completed ? '실천 표시 있음' : '실천 표시 없음'}</p><p>{challengeHabits[index]}</p><p className="member-archive-note">{day.note || '남긴 메모가 없습니다.'}</p></li>)}</ol><button type="button" className="text-link" onClick={() => setArchiveDetail(null)}>과거 기록 닫기</button></article> : null}
        {deleteArchiveId ? <section className="member-delete" aria-labelledby="member-archive-delete"><h3 id="member-archive-delete">선택한 과거 기록을 삭제할까요?</h3><p>{archives.items.find(item => item.id === deleteArchiveId)?.startDate}에 시작한 기록과 메모를 삭제합니다. 삭제 후 되돌릴 수 없습니다.</p><div className="member-actions"><button type="button" className="button outline" disabled={busy} onClick={() => setDeleteArchiveId(null)}>과거 기록 삭제 취소</button><button type="button" className="button" disabled={busy} onClick={deleteArchive}>선택한 과거 기록 삭제</button></div></section> : null}
      </section>
      <section className="member-account-tools"><p className="note">패스키 분실 시 복구 기능은 아직 없습니다. 계정 삭제는 최근에 로그인한 상태에서만 가능합니다.</p><button type="button" className="text-link" disabled={busy} onClick={() => authenticate('login')}>패스키로 다시 로그인</button><button type="button" className="text-link" disabled={busy} onClick={() => setConfirmDelete('account')}>회원 공간 삭제</button></section>
      {confirmDelete ? <section className="member-delete" aria-labelledby="member-delete-title"><h2 id="member-delete-title">{confirmDelete === 'account' ? '회원 공간과 저장 기록을 모두 지울까요?' : '서버에 저장한 7일 기록을 지울까요?'}</h2><p>삭제하면 되돌릴 수 없습니다. 브라우저 원본과 내려받은 파일은 별도로 남습니다.</p><div className="member-actions"><button type="button" className="button outline" disabled={busy} onClick={() => setConfirmDelete(null)}>취소하고 유지</button><button type="button" className="button" disabled={busy || conflict} onClick={remove}>확인하고 삭제</button></div></section> : null}
    </>}
    {error ? <p role="alert" className="member-error">{error}</p> : null}<p role="status" aria-live="polite" className="member-status">{message}</p>
    <a className="member-back" href="/#lab">브라우저에 남긴 7일 기록 보기</a>
  </main>;
}



