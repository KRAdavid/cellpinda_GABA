import { useEffect, useState } from 'react';
import { ArrowRight, Download, Trash2 } from 'lucide-react';
import { CHALLENGE_STORAGE_KEY, challengeHabits, createChallenge, localCalendarDate, parseChallenge, updateChallengeDay, challengeFinished, challengeStreak } from '../domain/challenge';
import type { ChallengeRecord } from '../domain/challenge';
import './SevenDayChallenge.css';

type Props = { onEvent?: (name: string, properties?: Record<string, string>) => void };

function readSaved() {
  try {
    const raw = localStorage.getItem(CHALLENGE_STORAGE_KEY);
    const record = raw ? parseChallenge(JSON.parse(raw)) : null;
    return { record, legacy: localStorage.getItem('cellpinda.challenge.v1') !== null, message: raw && !record ? '저장된 기록의 형식을 확인할 수 없어 불러오지 않았어요.' : '' };
  } catch { return { record: null, legacy: false, message: '이 브라우저의 저장 공간을 사용할 수 없어요. 기록은 새로고침 전까지만 유지됩니다.' }; }
}

export default function SevenDayChallenge({ onEvent }: Props) {
  const [initial] = useState(readSaved);
  const [record, setRecord] = useState<ChallengeRecord | null>(initial.record);
  const [today, setToday] = useState(localCalendarDate);
  const [message, setMessage] = useState(initial.message);
  const [inviteLink, setInviteLink] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  useEffect(() => {
    const refreshDate = () => setToday(localCalendarDate());
    const timer = window.setInterval(refreshDate, 60_000);
    window.addEventListener('focus', refreshDate);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', refreshDate); };
  }, []);

  function persist(next: ChallengeRecord) {
    setRecord(next);
    try { localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(next)); setMessage('이 브라우저에 기록했어요.'); }
    catch { setMessage('저장 공간을 사용할 수 없어요. 현재 기록은 새로고침 전까지만 유지돼요. 필요하면 다운로드해 주세요.'); }
  }
  function start() {
    const date = localCalendarDate();
    setToday(date);
    onEvent?.('challenge_start', { path: '/challenge' });
    persist(createChallenge(date));
  }
  function update(index: number, value: { completed?: boolean; note?: string }) {
    if (!record) return;
    const date = localCalendarDate();
    setToday(date);
    try {
      const next = updateChallengeDay(record, index, value, date);
      if (!record.days[index]?.completed && next.days[index]?.completed) onEvent?.('challenge_day_complete', { path: '/challenge' });
      if (!challengeFinished(record, date) && challengeFinished(next, date)) onEvent?.('seven_day_complete', { path: '/challenge' });
      persist(next);
    }
    catch (error) { setMessage(error instanceof Error ? error.message : '기록을 확인해 주세요.'); }
  }
  function remove() {
    try {
      localStorage.removeItem(CHALLENGE_STORAGE_KEY);
      setRecord(null); setConfirmDelete(false); setExpandedDay(null);
      setMessage('이번 7일 기록을 지웠어요. 내려받은 파일은 별도로 보관되어 있어요.');
    } catch { setMessage('브라우저 저장 기록을 지우지 못했어요. 저장 공간 설정을 확인한 뒤 다시 시도해 주세요.'); }
  }
  function download() {
    if (!record) return;
    const blob = new Blob([JSON.stringify({ ...record, description: '생활 실천과 개인 메모 기록. 건강 평가나 제품 효과 측정이 아닙니다.', habits: challengeHabits }, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `cellpinda-7days-${record.startDate}.json`;
    document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage('기록 파일 다운로드를 요청했어요. 개인 메모가 포함되니 보관할 곳을 확인해 주세요.');
  }
  async function invite() {
    const url = new URL(import.meta.env.BASE_URL, window.location.origin);
    url.searchParams.set('challenge', '7days');
    url.hash = 'lab';
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: '셀핀다 7일 리듬 챌린지', text: '제품 구매 없이 하루 한 가지 휴식을 함께 기록해요.', url: url.href });
        setMessage('친구 초대 공유 창을 열었어요.');
      } else {
        await navigator.clipboard.writeText(url.href);
        setInviteLink(''); setMessage('7일 챌린지 초대 링크를 복사했어요.');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') setMessage('친구 초대를 취소했어요.');
      else { setInviteLink(url.href); setMessage('아래 링크를 선택해 직접 복사해 주세요.'); }
    }
  }
  const completed = record?.days.filter(day => day.completed).length ?? 0;
  const finished = record ? challengeFinished(record, today) : false;
  const streak = record ? challengeStreak(record, today) : 0;
  const dayThreeReached = Boolean(record && today >= record.days[2]!.date);
  const todayDay = record?.days.find(day => day.date === today);

  return <section id="lab" className="section wrap seven-day-challenge" aria-labelledby="challenge-heading">
    <div className="section-head"><div><p className="chapter">리듬 연구소 · 7일의 기록</p><h2 id="challenge-heading">하루에 한 가지,<br />나에게 남기는 작은 실천.</h2></div><p>제품 구매와 관계없이 참여하세요.<br />실천과 메모는 이 브라우저에만 저장됩니다.</p></div>
    <p className="note">기기의 현지 날짜 기준입니다. 회원 계정·다른 기기와 동기화되지 않으며 서버에 보내지 않습니다. 건강 상태나 제품 효과를 평가하는 기록이 아닙니다.</p>
    {initial.legacy ? <p className="challenge-legacy">이전 체크 목록에는 날짜가 없어 이번 7일 기록에 합치지 않았어요. 새 기록은 시작한 날짜부터 남깁니다.</p> : null}
    {!record ? <div className="challenge-start"><div><h3>오늘부터, 일곱 번의 작은 여백.</h3><p>시작일 {today} · 지난 날짜는 나중에 기록할 수 있어요.<br />미래 날짜의 실천은 그날이 오면 기록해 주세요.</p></div><button className="button" onClick={start}>오늘부터 7일 시작 <ArrowRight size={18} aria-hidden="true" /></button></div> : <>
      <div className="challenge-record-heading"><div><p>{record.startDate} ~ {record.days[6]!.date}</p><h3>{completed}일의 실천을 기록했어요.</h3><p className="note">연속 {streak}일 · 달성 점수가 아닌 완료 표시 수예요. 빠진 날도 편하게 남겨두세요.</p></div><div className="challenge-record-actions"><button className="text-link" onClick={download}><Download size={17} aria-hidden="true" /> 기록 다운로드</button><button className="text-link" onClick={invite}>친구 초대 ↗</button><button className="text-link" onClick={() => setConfirmDelete(true)}><Trash2 size={17} aria-hidden="true" /> 기록 삭제</button></div></div>
      <div className="challenge-daily-message" role="status" aria-live="polite"><strong>오늘의 짧은 메시지</strong><span>{todayDay?.completed ? '오늘의 작은 멈춤을 남겼어요. 내일도 같은 시간에 이어가 볼까요?' : '오늘 한 가지 휴식을 골라 체크해 보세요. 완벽하게 하지 않아도 괜찮아요.'}</span></div>
      {inviteLink ? <label className="challenge-invite-link">챌린지 초대 링크<input value={inviteLink} readOnly onFocus={event => event.currentTarget.select()} /></label> : null}
      {dayThreeReached ? <article className="challenge-milestone-card"><span>03 / 리듬 카드</span><h4>세 번의 작은 멈춤을 돌아봤어요.</h4><p>완료한 날의 메모를 읽고, 나에게 잘 맞았던 휴식 한 가지를 골라 보세요.</p></article> : null}
      {confirmDelete ? <div className="challenge-delete-confirm" role="group" aria-labelledby="challenge-delete-question"><p id="challenge-delete-question">이번 7일의 완료 표시와 메모를 모두 지울까요? 지우면 되돌릴 수 없어요.</p><div className="actions"><button className="button outline" onClick={() => setConfirmDelete(false)}>취소하고 유지</button><button className="button" onClick={remove}>모두 삭제</button></div></div> : null}
      <ol className="challenge-days">{record.days.map((day, index) => {
        const future = day.date > today;
        return <li key={day.date} className={future ? 'is-future' : ''}><div className="challenge-day-main"><span className="challenge-day-number">{String(index + 1).padStart(2, '0')}</span><div className="challenge-day-description"><p className="challenge-date">{day.date} {day.date === today ? '· 오늘' : future ? '· 예정' : '· 지난 날짜'}</p><label><input type="checkbox" checked={day.completed} disabled={future} onChange={event => update(index, { completed: event.target.checked })} /><span>{challengeHabits[index]}</span></label></div><button className="text-link" disabled={future} aria-expanded={expandedDay === index} aria-controls={`challenge-note-${index}`} onClick={() => setExpandedDay(expandedDay === index ? null : index)}>{expandedDay === index ? '접기' : day.note ? '메모 보기' : '메모 남기기'}</button></div><div id={`challenge-note-${index}`} hidden={expandedDay !== index}><label className="challenge-note-label">이날의 작은 메모 <span>(선택 · 최대 1,000자)</span><textarea rows={3} maxLength={1000} disabled={future} value={day.note} onChange={event => update(index, { note: event.target.value })} placeholder="예: 점심 뒤 창가에서 잠깐 쉬었어요." /></label></div></li>;
      })}</ol>
      {finished ? <><div className="challenge-milestone-card challenge-milestone-card-final"><span>07 / 리듬 카드</span><h4>일곱 날의 휴식 기록이 모였어요.</h4><p>내일도 이어가고 싶은 작은 루틴 하나를 마지막 메모에 적어 보세요.</p></div><div className="challenge-wrapup"><p className="chapter">7일을 돌아보며</p><h3>계속하고 싶은 작은 루틴은 무엇인가요?</h3><p>일곱 날짜가 지났어요. 위에 남긴 실천과 메모를 읽고, 내일도 이어가고 싶은 한 가지를 마지막 날 메모에 적어 보세요. 기록하지 못한 지난 날짜도 지금 채울 수 있어요.</p><p className="note">완료 표시가 많거나 적다는 이유로 건강이나 제품의 효과를 판단하지 않습니다.</p></div></> : <p className="note">시작일로부터 7일이 지나면 기록을 돌아보는 안내가 열립니다.</p>}
    </>}
    <p className="challenge-status" role="status" aria-live="polite">{message}</p>
  </section>;
}
