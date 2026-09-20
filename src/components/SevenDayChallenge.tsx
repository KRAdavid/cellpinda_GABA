import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, Trash2 } from 'lucide-react';
import { CHALLENGE_STORAGE_KEY, challengeHabits, createChallenge, localCalendarDate, parseChallenge, updateChallengeDay, challengeFinished, challengeStreak } from '../domain/challenge';
import type { ChallengeRecord } from '../domain/challenge';
import { preserveCampaign } from '../domain/share';
import './SevenDayChallenge.css';

type Props = { onEvent?: (name: string, properties?: Record<string, string>) => void; isInvite?: boolean };
type ChallengeMilestone = 3 | 7;

function drawCardText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, font: string, color: string): number {
  context.font = font;
  context.fillStyle = color;
  let line = '';
  for (const char of text) {
    const candidate = `${line}${char}`;
    if (line && context.measureText(candidate).width > maxWidth) {
      context.fillText(line, x, y);
      y += lineHeight;
      line = char;
    } else line = candidate;
  }
  if (line) context.fillText(line, x, y);
  return y + lineHeight;
}

function createMilestoneCard(milestone: ChallengeMilestone, completed: number, streak: number): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext('2d');
  if (!context) return Promise.resolve(null);
  context.fillStyle = '#f7fbf5';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#dcecdf';
  context.fillRect(48, 48, 984, 1254);
  drawCardText(context, 'CELLPINDA · 7일 휴식 기록', 104, 140, 872, 42, '600 28px "Noto Sans KR", "Malgun Gothic", sans-serif', '#315f48');
  drawCardText(context, `${String(milestone).padStart(2, '0')}일의 작은 멈춤`, 104, 290, 872, 76, '600 62px "Noto Sans KR", "Malgun Gothic", sans-serif', '#18382b');
  drawCardText(context, '오늘 내가 쉰 시간을 잠깐 돌아봤어요.', 104, 430, 872, 48, '400 32px "Noto Sans KR", "Malgun Gothic", sans-serif', '#315f48');
  context.fillStyle = '#ffffff';
  context.fillRect(104, 540, 872, 270);
  context.fill();
  drawCardText(context, `실천을 남긴 날  ${completed}일`, 160, 635, 760, 54, '600 38px "Noto Sans KR", "Malgun Gothic", sans-serif', '#18382b');
  drawCardText(context, `이어 온 날  ${streak}일`, 160, 710, 760, 54, '400 34px "Noto Sans KR", "Malgun Gothic", sans-serif', '#158457');
  drawCardText(context, '숫자는 생활 기록을 보여주는 표시예요.', 160, 775, 760, 38, '400 24px "Noto Sans KR", "Malgun Gothic", sans-serif', '#64786b');
  drawCardText(context, '내가 편했던 휴식 한 가지를 골라, 내일도 이어가 볼까요?', 104, 950, 872, 52, '500 34px "Noto Sans KR", "Malgun Gothic", sans-serif', '#18382b');
  drawCardText(context, '일주일 동안 실천한 휴식을 돌아보는 기록 카드예요.', 104, 1115, 872, 38, '400 24px "Noto Sans KR", "Malgun Gothic", sans-serif', '#64786b');
  drawCardText(context, '셀핀다 · 오늘 내 상태', 104, 1210, 872, 36, '500 22px "Noto Sans KR", "Malgun Gothic", sans-serif', '#158457');
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

function readSaved() {
  try {
    const raw = localStorage.getItem(CHALLENGE_STORAGE_KEY);
    const record = raw ? parseChallenge(JSON.parse(raw)) : null;
    return { record, legacy: localStorage.getItem('cellpinda.challenge.v1') !== null, message: raw && !record ? '저장된 기록을 읽을 수 없어 불러오지 않았어요.' : '' };
  } catch { return { record: null, legacy: false, message: '이 기기에서는 기록을 저장할 수 없어요. 새로고침하기 전까지만 화면에 남습니다.' }; }
}

export default function SevenDayChallenge({ onEvent, isInvite = false }: Props) {
  const [initial] = useState(readSaved);
  const [record, setRecord] = useState<ChallengeRecord | null>(initial.record);
  const [today, setToday] = useState(localCalendarDate);
  const [message, setMessage] = useState(initial.message);
  const [inviteLink, setInviteLink] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [milestoneCard, setMilestoneCard] = useState<File | null>(null);
  const [milestoneCardUrl, setMilestoneCardUrl] = useState('');
  const inviteHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!isInvite) return;
    const frame = window.requestAnimationFrame(() => inviteHeadingRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [isInvite]);
  useEffect(() => {
    const refreshDate = () => setToday(localCalendarDate());
    const timer = window.setInterval(refreshDate, 60_000);
    window.addEventListener('focus', refreshDate);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', refreshDate); };
  }, []);

  function persist(next: ChallengeRecord) {
    setRecord(next);
    try { localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(next)); setMessage('이 기기에 기록했어요.'); }
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
    } catch { setMessage('기록을 지우지 못했어요. 기기의 저장 공간 설정을 확인한 뒤 다시 해주세요.'); }
  }
  function challengeLink() {
    const url = new URL(import.meta.env.BASE_URL, window.location.origin);
    url.searchParams.set('challenge', '7days');
    preserveCampaign(url, window.location.search);
    url.hash = 'lab';
    return url.href;
  }
  function download() {
    if (!record) return;
    const blob = new Blob([JSON.stringify({ ...record, description: '내가 실천한 쉬는 습관과 메모를 담은 기록입니다. 건강 검사는 아닙니다.', habits: challengeHabits }, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `cellpinda-7days-${record.startDate}.json`;
    document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage('기록 파일 다운로드를 요청했어요. 개인 메모가 포함되니 보관할 곳을 확인해 주세요.');
  }
  async function invite() {
    const url = new URL(challengeLink());
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: '셀핀다 7일 휴식 기록', text: '제품 구매 없이 하루 한 가지 휴식을 함께 기록해요.', url: url.href });
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
  const milestone: ChallengeMilestone | null = finished ? 7 : dayThreeReached ? 3 : null;
  const todayDay = record?.days.find(day => day.date === today);

  useEffect(() => {
    let cancelled = false;
    setMilestoneCard(null);
    if (!milestone) return () => { cancelled = true; };
    createMilestoneCard(milestone, completed, streak).then(blob => {
      if (!cancelled && blob) {
        setMilestoneCard(new File([blob], `cellpinda-rhythm-${milestone}days.png`, { type: 'image/png' }));
        onEvent?.('share_image_generated', { path: '/challenge', milestone: String(milestone) });
      }
    }).catch(() => { if (!cancelled) setMessage('리듬 카드를 준비하지 못했어요. 기록 공유 링크를 이용해 주세요.'); });
    return () => { cancelled = true; };
  }, [milestone, completed, streak, onEvent]);

  useEffect(() => {
    if (!milestoneCard) { setMilestoneCardUrl(''); return; }
    const url = URL.createObjectURL(milestoneCard);
    setMilestoneCardUrl(url);
    return () => { URL.revokeObjectURL(url); setMilestoneCardUrl(''); };
  }, [milestoneCard]);

  async function shareMilestone() {
    if (!milestone || !milestoneCard) return;
    const url = challengeLink();
    const text = `${milestone}일 동안 나의 작은 휴식을 돌아봤어요. 함께 7일 리듬을 기록해요.`;
    onEvent?.('share_requested', { path: '/challenge', channel: 'native', milestone: String(milestone) });
    if (typeof navigator.share === 'function' && navigator.canShare?.({ files: [milestoneCard] })) {
      try {
        await navigator.share({ files: [milestoneCard], title: '셀핀다 7일 리듬 카드', text, url });
        setMessage('리듬 카드 공유 창을 열었어요.');
        onEvent?.('result_share_success', { path: '/challenge', channel: 'native', milestone: String(milestone) });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') { setMessage('리듬 카드 공유를 취소했어요.'); onEvent?.('share_cancelled', { path: '/challenge', channel: 'native', milestone: String(milestone) }); return; }
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setMessage('7일 리듬 초대 링크를 복사했어요.');
      onEvent?.('share_link_copied', { path: '/challenge', channel: 'clipboard', milestone: String(milestone) });
      onEvent?.('result_share_success', { path: '/challenge', channel: 'clipboard', milestone: String(milestone) });
    } catch { setInviteLink(url); setMessage('공유가 어려워요. 아래 초대 링크를 선택해 전달해 주세요.'); }
  }

  function downloadMilestone() {
    if (!milestoneCard) return;
    const url = URL.createObjectURL(milestoneCard);
    const link = document.createElement('a');
    link.href = url; link.download = milestoneCard.name;
    document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage('리듬 카드 저장을 요청했어요.');
    onEvent?.('share_image_downloaded', { path: '/challenge', channel: 'download', milestone: String(milestone ?? '') });
    onEvent?.('result_share_success', { path: '/challenge', channel: 'download', milestone: String(milestone ?? '') });
  }

  return <section id="lab" className={`section wrap seven-day-challenge${isInvite ? ' is-invite' : ''}`} aria-labelledby="challenge-heading">
    {isInvite ? <p className="challenge-invite" role="status">친구가 7일 휴식 챌린지에 초대했어요. 개인 기록은 공유되지 않았어요.</p> : null}
    <div className="section-head"><div><p className="chapter">7일 휴식 기록</p><h2 id="challenge-heading" ref={inviteHeadingRef} tabIndex={isInvite ? -1 : undefined}>하루 5분,<br />내가 고른 휴식 한 가지.</h2></div><p>제품을 사지 않아도 할 수 있어요.<br />기록과 메모는 이 기기에만 남아요.</p></div>
    <p className="note">{isInvite ? '건강 검사가 아닌 휴식 기록이에요. 기록은 이 기기에만 남아요.' : '휴대폰이나 컴퓨터의 날짜를 기준으로 이 기기에만 기록해요. 건강 검사가 아니라 내가 실천한 휴식 습관을 돌아보는 기록이에요.'}</p>
    {initial.legacy ? <p className="challenge-legacy">날짜가 없는 예전 기록은 이번 기록에 넣지 않았어요. 새로 시작한 날부터 적어 주세요.</p> : null}
    {!record ? <div className="challenge-start"><div><h3>오늘부터 7일, 하루 한 번 쉬어 보기.</h3><p>{isInvite ? <>시작일 {today} · 지나간 날은 나중에 적어도 돼요.</> : <>시작일 {today} · 지나간 날은 나중에 적을 수 있어요.<br />앞으로 남은 날은 날짜가 된 뒤 체크해 주세요.</>}</p></div><button type="button" className="button" onClick={start}>오늘부터 7일 시작 <ArrowRight size={18} aria-hidden="true" /></button></div> : <>
      <div className="challenge-record-heading"><div><p>{record.startDate} ~ {record.days[6]!.date}</p><h3>{completed}일 쉬었다고 기록했어요.</h3><p className="note">연속 {streak}일 · 점수가 아니라 체크한 날의 수예요. 빠뜨린 날도 편하게 남겨두세요.</p></div><div className="challenge-record-actions"><button type="button" className="text-link" onClick={download}><Download size={17} aria-hidden="true" /> 기록 파일 저장</button><button type="button" className="text-link" onClick={invite}>친구에게 링크 보내기 ↗</button><button type="button" className="text-link" onClick={() => setConfirmDelete(true)}><Trash2 size={17} aria-hidden="true" /> 기록 삭제</button></div></div>
      <div className="challenge-daily-message" role="status" aria-live="polite"><strong>오늘의 짧은 메시지</strong><span>{todayDay ? todayDay.completed ? '오늘의 작은 멈춤을 남겼어요. 내일도 같은 시간에 이어가 볼까요?' : '오늘 한 가지 휴식을 골라 체크해 보세요. 완벽하게 하지 않아도 괜찮아요.' : finished ? '7일 기록이 끝났어요. 남겨 둔 메모를 천천히 돌아보세요.' : '오늘 기록을 준비하고 있어요. 시작한 날짜의 흐름을 따라가 보세요.'}</span></div>
      {inviteLink ? <label className="challenge-invite-link">친구에게 보낼 링크<input value={inviteLink} readOnly onFocus={event => event.currentTarget.select()} /></label> : null}
      {dayThreeReached ? <article className="challenge-milestone-card"><span>03 / 7일 기록 카드</span><h4>세 번 쉬었던 날을 돌아봤어요.</h4><p>체크한 날과 메모를 보고, 나에게 잘 맞았던 휴식 한 가지를 골라 보세요.</p>{milestone === 3 && milestoneCardUrl ? <div className="challenge-card-share"><img src={milestoneCardUrl} alt="세 번의 휴식 기록 카드 미리보기"/><div><button type="button" className="button outline" onClick={() => void shareMilestone()}>기록 카드 공유 ↗</button><button type="button" className="text-link" onClick={downloadMilestone}><Download size={17} aria-hidden="true"/> 카드 저장</button></div></div> : null}</article> : null}
      {confirmDelete ? <div className="challenge-delete-confirm" role="group" aria-labelledby="challenge-delete-question"><p id="challenge-delete-question">이번 7일의 완료 표시와 메모를 모두 지울까요? 지우면 되돌릴 수 없어요.</p><div className="actions"><button type="button" className="button outline" onClick={() => setConfirmDelete(false)}>취소하고 유지</button><button type="button" className="button" onClick={remove}>모두 삭제</button></div></div> : null}
      <ol className="challenge-days">{record.days.map((day, index) => {
        const future = day.date > today;
        return <li key={day.date} className={future ? 'is-future' : ''}><div className="challenge-day-main"><span className="challenge-day-number">{String(index + 1).padStart(2, '0')}</span><div className="challenge-day-description"><p className="challenge-date">{day.date} {day.date === today ? '· 오늘' : future ? '· 예정' : '· 지난 날짜'}</p><label><input type="checkbox" checked={day.completed} disabled={future} onChange={event => update(index, { completed: event.target.checked })} /><span>{challengeHabits[index]}</span></label></div><button type="button" className="text-link" disabled={future} aria-expanded={expandedDay === index} aria-controls={`challenge-note-${index}`} onClick={() => setExpandedDay(expandedDay === index ? null : index)}>{expandedDay === index ? '접기' : day.note ? '메모 보기' : '메모 남기기'}</button></div><div id={`challenge-note-${index}`} hidden={expandedDay !== index}><label className="challenge-note-label">이날의 작은 메모 <span>(선택 · 최대 1,000자)</span><textarea rows={3} maxLength={1000} disabled={future} value={day.note} onChange={event => update(index, { note: event.target.value })} placeholder="예: 점심 뒤 창가에서 잠깐 쉬었어요." /></label></div></li>;
      })}</ol>
      {finished ? <><div className="challenge-milestone-card challenge-milestone-card-final"><span>07 / 7일 기록 카드</span><h4>일주일의 휴식 기록이 모였어요.</h4><p>앞으로도 계속하고 싶은 휴식 습관을 마지막 메모에 적어 보세요.</p>{milestone === 7 && milestoneCardUrl ? <div className="challenge-card-share"><img src={milestoneCardUrl} alt="일주일 휴식 기록 카드 미리보기"/><div><button type="button" className="button outline" onClick={() => void shareMilestone()}>기록 카드 공유 ↗</button><button type="button" className="text-link" onClick={downloadMilestone}><Download size={17} aria-hidden="true"/> 카드 저장</button></div></div> : null}</div><div className="challenge-wrapup"><p className="chapter">7일을 돌아보며</p><h3>계속하고 싶은 휴식 습관은 무엇인가요?</h3><p>일주일 동안 체크한 날과 메모를 읽어보세요. 계속하고 싶은 한 가지를 마지막 날 메모에 적을 수 있어요. 지나간 날도 지금 적을 수 있습니다.</p><p className="note">체크한 날의 수로 건강 상태나 제품 효과를 판단하지 않아요.</p></div></> : <p className="note">시작한 날부터 7일이 지나면 기록을 돌아볼 수 있어요.</p>}
    </>}
    <p className="challenge-status" role="status" aria-live="polite">{message}</p>
    <a className="challenge-rhythm-link" href="#rhythm">다시 1분 리듬 체크하기 <ArrowRight size={17} aria-hidden="true" /></a>
  </section>;
}
