import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, ArrowUpRight, ChevronLeft, Download } from 'lucide-react';
import { classifyRhythm, questions, resultTypes, rhythmIdFromUrl } from '../domain/rhythm';
import { createFocusGameInviteText } from '../domain/fatigue-game';
import { REVIEW_DESTINATION_URL } from '../domain/reviews';
import type { AnswerValue, RhythmId, RhythmResult, RhythmType } from '../domain/rhythm';
import FatigueGame from './FatigueGame';
import './rhythm.css';

type KakaoApi = { isInitialized: () => boolean; init: (key: string) => void; Share: { sendDefault: (payload: Record<string, unknown>) => void } };
declare global { interface Window { Kakao?: KakaoApi } }
const kakaoKey = typeof import.meta.env.VITE_KAKAO_JS_KEY === 'string' ? import.meta.env.VITE_KAKAO_JS_KEY.trim() : '';
const campaignId = typeof window !== 'undefined'
  ? (new URLSearchParams(window.location.search).get('campaign')?.trim() || '')
  : '';

export interface RhythmExperienceProps {
  onEvent: (name: string, properties?: Record<string, string>) => void;
}

function getSharedType(): RhythmType | null {
  if (typeof window === 'undefined') return null;
  const id = rhythmIdFromUrl(new URL(window.location.href));
  return id ? resultTypes[id] : null;
}

function shareUrl(type: RhythmType, referralId?: string): string {
  const base = new URL(import.meta.env.BASE_URL, window.location.origin);
  const url = new URL(`share/${type.id}/`, base);
  if (referralId && /^[A-Za-z0-9_-]{8,64}$/.test(referralId)) url.searchParams.set('ref', referralId);
  if (campaignId && /^[A-Za-z0-9_-]{1,64}$/.test(campaignId)) url.searchParams.set('campaign', campaignId);
  url.hash = 'rhythm';
  return url.toString();
}

function inviteUrl(kind: 'rhythm' | 'focus' = 'rhythm', referralId = ''): string {
  const root = new URL(import.meta.env.BASE_URL, window.location.origin);
  const base = kind === 'focus' ? new URL('focus/', root) : root;
  base.hash = kind === 'focus' ? 'focus-game' : 'rhythm';
  if (kind === 'focus') base.searchParams.set('focus', '1');
  if (referralId && /^[A-Za-z0-9_-]{8,64}$/.test(referralId)) base.searchParams.set('ref', referralId);
  if (campaignId && /^[A-Za-z0-9_-]{1,64}$/.test(campaignId)) base.searchParams.set('campaign', campaignId);
  return base.toString();
}

function fatigueSignal(result: RhythmResult): { tone: 'high' | 'watch' | 'steady'; label: string; heading: string; body: string } {
  if (result.loadLevel === 'low') return {
    tone: 'steady',
    label: '지난 7일 답변',
    heading: '축하합니다. 뇌 컨디션이 좋은 상태를 유지하고 있습니다.',
    body: '최근 답변처럼 잠깐씩 쉬는 흐름을 계속 이어가세요.',
  };
  if (result.loadLevel === 'high') {
    if (result.loadScore < 10) return {
      tone: 'watch',
      label: '최근 7일, 힘들었다고 답한 날이 있어요',
      heading: '지금 5분, 화면에서 눈을 떼고 쉬어 보세요.',
      body: '휴대폰을 내려놓고 물을 마시거나 창밖을 바라보세요.',
    };
    return {
      tone: 'high',
      label: '최근 7일, 머리가 쉴 틈이 없었던 날이 여러 번 있었어요',
      heading: '지금 10분, 화면과 알림에서 떨어져 쉬어 보세요.',
      body: '해야 할 일은 메모하고 알림을 꺼 보세요.',
    };
  }
  return {
    tone: 'watch',
    label: '최근 7일, 힘들었다고 답한 날이 있어요',
    heading: '오늘 일정에 5분 쉬는 시간을 지금 넣어 보세요.',
    body: '휴대폰을 내려놓고 물을 마시거나 창밖을 바라보세요.',
  };
}

function BrainLoadVisual({ result }: { result: RhythmResult }) {
  const { loadScore: score } = result;
  const band = score >= 10 ? 'high' : score >= 5 ? 'watch' : 'low';
  const answerEntries = Object.entries(result.scores);
  const frequentAnswers = answerEntries.filter(([, value]) => value >= 2).length;
  const description = `5개 질문 중 ${frequentAnswers}개에서 힘들었다고 답했어요.`;

  return (
    <div className={`rhythm-load-score rhythm-load-score-${band}`}>
      <div className="rhythm-load-score-heading"><span>지난 7일 답변 기록</span><strong>{score}<small>/ 15</small></strong></div>
      <div className="rhythm-load-visual">
        <div className="rhythm-load-visual-copy">
          <p className="rhythm-load-visual-kicker">5개 질문 중</p>
          <strong>힘들었다고 답한 질문</strong>
          <div className="rhythm-load-answer-row">
            <div className="rhythm-load-answer-dots" role="img" aria-label={description}>
              {answerEntries.map(([questionId, value]) => <i key={questionId} className={value >= 2 ? 'is-filled' : ''} />)}
            </div>
            <span className="rhythm-load-answer-count">{frequentAnswers}<small> / {answerEntries.length}개</small></span>
          </div>
          <span>각 점은 질문 하나를 나타내요.</span>
        </div>
      </div>
      <progress className="rhythm-load-progress-accessible" value={score} max={15} aria-label={`지난 7일 다섯 질문에 답한 기록 ${score}점, 15점 만점`} />
      <p className="rhythm-load-footnote">건강 상태를 검사한 결과가 아니라, 다섯 질문에 고른 답을 정리한 기록이에요.</p>
    </div>
  );
}

/** Preserve words first; split characters only when a single word exceeds a line. */
function drawParagraph(context: CanvasRenderingContext2D, text: string, y: number, size: number, lineHeight: number, color = '#18382b'): number {
  context.font = `${size}px "Noto Sans KR", "Malgun Gothic", sans-serif`;
  context.fillStyle = color;
  let line = '';
  for (const word of text.trim().split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width <= 872) {
      line = candidate;
      continue;
    }
    if (line) {
      context.fillText(line, 104, y);
      y += lineHeight;
      line = '';
    }
    for (const char of word) {
      if (line && context.measureText(line + char).width > 872) {
        context.fillText(line, 104, y);
        y += lineHeight;
        line = '';
      }
      line += char;
    }
  }
  if (line) context.fillText(line.trim(), 104, y);
  return y + lineHeight;
}

function createCard(type: RhythmType): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext('2d');
  if (!context) return Promise.resolve(null);
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, 1080, 1350);
  context.fillStyle = '#e8f1e7';
  context.fillRect(48, 48, 984, 1254);
  drawParagraph(context, 'CELLPINDA · 오늘 내 상태', 134, 27, 42);
  drawParagraph(context, '잠깐 멈춰, 오늘을 돌아봐요.', 258, 33, 52);
  context.font = 'bold 72px "Malgun Gothic", sans-serif';
  context.fillStyle = '#18382b';
  context.fillText(type.name, 104, 385);
  let y = drawParagraph(context, type.description, 470, 33, 54);
  y = drawParagraph(context, '오늘 해볼 일', y + 65, 26, 44, '#158457');
  drawParagraph(context, type.suggestions[0] ?? '', y + 10, 36, 58);
  // Identical decorative curves for every type; no measurement or axis implied.
  context.lineCap = 'round';
  for (let index = 0; index < 3; index++) {
    const baseline = 942 + index * 15;
    context.strokeStyle = ['#158457', '#7cb18e', '#bbd4bd'][index]!;
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(104, baseline);
    context.bezierCurveTo(240, baseline - 75, 302, baseline + 75, 452, baseline);
    context.bezierCurveTo(602, baseline - 75, 740, baseline + 75, 976, baseline - 8);
    context.stroke();
  }
  context.strokeStyle = '#b5c9b9';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(104, 1050);
  context.lineTo(976, 1050);
  context.stroke();
  drawParagraph(context, '최근 일주일을 돌아보는 안내입니다.', 1110, 25, 40);
  drawParagraph(context, '건강 검사 결과가 아니라, 내가 고른 답을 정리한 카드예요.', 1158, 25, 40);
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

export default function RhythmExperience({ onEvent }: RhythmExperienceProps) {
  const [sharedType, setSharedType] = useState(getSharedType);
  const [compareConsent, setCompareConsent] = useState(false);
  const [friendType, setFriendType] = useState<RhythmType | null>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>(Array(5).fill(undefined));
  const [result, setResult] = useState<RhythmResult | null>(null);
  const [cardFile, setCardFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [manualLink, setManualLink] = useState('');
  const [cardUrl, setCardUrl] = useState('');
  const [kakaoReady, setKakaoReady] = useState(false);
  const focusInviteArrival = typeof window !== 'undefined' && (new URLSearchParams(window.location.search).get('focus') === '1' || window.location.pathname.endsWith('/focus/'));
  const sharedTracked=useRef(false);
  const pointerSelecting=useRef(false);
  const shareReferralRef=useRef('');
  const getShareReferralId=()=>{if(!shareReferralRef.current){shareReferralRef.current=crypto.randomUUID().replaceAll('-','').slice(0,16)}return shareReferralRef.current};
  useEffect(()=>{if(sharedType&&!sharedTracked.current){sharedTracked.current=true;onEvent('shared_link_landed',{path:'/share'});onEvent('result_viewed',{path:'/share'})}},[sharedType,onEvent]);
  useEffect(() => {
    if (!focusInviteArrival) return;
    let frame = 0;
    let alignmentInterval = 0;
    let stopped = false;
    const stopAlignment = () => {
      stopped = true;
      if (alignmentInterval) window.clearInterval(alignmentInterval);
      alignmentInterval = 0;
      window.removeEventListener('wheel', stopAlignment);
      window.removeEventListener('touchstart', stopAlignment);
      window.removeEventListener('pointerdown', stopAlignment);
      window.removeEventListener('keydown', onKeyDown);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (['Tab', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) stopAlignment();
    };
    const align = () => {
      const target = document.getElementById('focus-game');
      if (!target || stopped) return;
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
      const headerOffset = window.matchMedia('(max-width: 680px)').matches ? 72 : 88;
      const correction = target.getBoundingClientRect().top - headerOffset;
      if (Math.abs(correction) > 1) window.scrollBy({ top: correction, behavior: 'auto' });
    };
    const settle = () => {
      const startedAt = performance.now();
      const attempt = () => {
        if (stopped) return;
        align();
        if (performance.now() - startedAt >= 2400) {
          stopAlignment();
          document.getElementById('fatigue-game-heading')?.focus({ preventScroll: true });
        }
      };
      attempt();
      alignmentInterval = window.setInterval(attempt, 120);
      window.addEventListener('wheel', stopAlignment, { passive: true });
      window.addEventListener('touchstart', stopAlignment, { passive: true });
      window.addEventListener('pointerdown', stopAlignment, { passive: true });
      window.addEventListener('keydown', onKeyDown);
    };
    frame = window.requestAnimationFrame(() => window.requestAnimationFrame(settle));
    return () => {
      window.cancelAnimationFrame(frame);
      stopAlignment();
    };
  }, [focusInviteArrival]);
  useEffect(()=>{if(!kakaoKey)return;const ready=()=>{if(!window.Kakao)return;try{if(!window.Kakao.isInitialized())window.Kakao.init(kakaoKey);setKakaoReady(true)}catch{setKakaoReady(false)}};if(window.Kakao){ready();return;}const script=document.createElement('script');script.src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';script.async=true;script.onload=ready;script.onerror=()=>setKakaoReady(false);document.head.appendChild(script);return()=>{script.onload=null;script.onerror=null}},[]);
  const answerStarted=useRef(false);
  const resultViewed=useRef(false);
  const questionRef = useRef<HTMLLegendElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const autoAdvanceTimer = useRef<number | null>(null);
  const type = result?.type ?? sharedType;
  const signal = result ? fatigueSignal(result) : null;
  const question = questions[step]!;

  useEffect(() => () => {
    if (autoAdvanceTimer.current !== null) window.clearTimeout(autoAdvanceTimer.current);
  }, []);

  useEffect(() => {
    if (started && !type) questionRef.current?.focus();
    if (sharedType && !result) resultRef.current?.focus({ preventScroll: true });
    if (result) {resultRef.current?.focus();if(!resultViewed.current){resultViewed.current=true;onEvent('result_viewed',{path:'/result'})}}
  }, [step, started, result, type, sharedType]);

  useEffect(() => {
    let cancelled = false;
    setCardFile(null);
    if (type) {
      createCard(type).then(blob => {
        if (!cancelled && blob) {setCardFile(new File([blob], 'cellpinda-rhythm.png', { type: 'image/png' }));onEvent('share_image_generated',{path:result?'/result':'/share'});}
      }).catch(() => {
        if (!cancelled) setMessage('이미지 준비가 어려워요. 링크 공유를 이용해 주세요.');
      });
    }
    return () => { cancelled = true; };
  }, [type]);

  useEffect(() => {
    if (!cardFile) { setCardUrl(''); return; }
    const url = URL.createObjectURL(cardFile);
    setCardUrl(url);
    return () => { URL.revokeObjectURL(url); setCardUrl(''); };
  }, [cardFile]);

  function start() {
    if (autoAdvanceTimer.current !== null) {
      window.clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    if (sharedType) {
      setFriendType(compareConsent ? sharedType : null);
      onEvent('friend_check_start',{path:'/share'});
    }
    setSharedType(null);
    setResult(null);
    setStarted(true);
    setStep(0);
    setAnswers(Array(5).fill(undefined));
    setMessage('');
    setManualLink('');
    // Remove an incoming shared result when the visitor starts their own reflection.
    if (window.location.search.includes('rhythm=')) {
      const url = new URL(window.location.href);
      url.searchParams.delete('rhythm');
      window.history.replaceState(null, '', url);
    }
    answerStarted.current=false;
    resultViewed.current=false;
  }

  function next(selectedValue?: AnswerValue) {
    const answer = selectedValue ?? answers[step];
    if (answer === undefined) return;
    if (autoAdvanceTimer.current !== null) {
      window.clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    const completedAnswers = answers.map((current, index) => index === step ? answer : current);
    if (step < questions.length - 1) {
      setAnswers(completedAnswers);
      setStep(current => current + 1);
    }
    else {
      setAnswers(completedAnswers);
      setResult(classifyRhythm(completedAnswers as number[]));
      onEvent('rhythm_complete');
      onEvent('rhythm_check_complete',{path:'/check'});
    }
  }

  function chooseAnswer(value: AnswerValue, autoAdvance=true) {
    if (!answerStarted.current) {
      answerStarted.current = true;
      onEvent('rhythm_start');
    }
    setAnswers(current => current.map((answer, index) => index === step ? value : answer));
    if (autoAdvanceTimer.current !== null) window.clearTimeout(autoAdvanceTimer.current);
    if (autoAdvance) autoAdvanceTimer.current = window.setTimeout(() => {
      autoAdvanceTimer.current = null;
      next(value);
    }, 180);
  }

  function previous() {
    if (autoAdvanceTimer.current !== null) {
      window.clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    setStep(current => current - 1);
  }

  async function copyLink() {
    if (!type) return;
    const url = shareUrl(type,getShareReferralId());
    try {
      await navigator.clipboard.writeText(url);
      setMessage('링크를 복사했어요. 이 링크에는 유형만 포함되고 문항별 답변은 포함되지 않아요.');
      setManualLink('');
      onEvent('share_copy',{path:result?'/result':'/share',channel:'clipboard'});
      onEvent('result_share_success',{path:result?'/result':'/share',channel:'clipboard'});
    } catch {
      setManualLink(url);
      setMessage('아래 링크를 선택해 직접 복사해 주세요.');
    }
  }

  async function copyInviteLink(kind: 'rhythm' | 'focus' = 'rhythm', shareText?: string) {
    const url = inviteUrl(kind, getShareReferralId());
    const copyText = kind === 'focus' && shareText ? `${shareText} ${url}` : url;
    try {
      await navigator.clipboard.writeText(copyText);
      setMessage(kind === 'focus' ? '챌린지 초대 문구와 링크를 복사했어요. 친구에게 보내 보세요.' : '내 답변이 담기지 않은 1분 체크 링크를 복사했어요.');
      setManualLink('');
      onEvent('share_copy',{path:result?'/result':'/share',channel:'invite'});
      onEvent('result_share_success',{path:result?'/result':'/share',channel:'invite'});
    } catch {
      setManualLink(copyText);
      setMessage('아래 내용을 선택해 친구에게 보내 주세요.');
    }
  }

  async function shareInvite(kind: 'rhythm' | 'focus' = 'rhythm') {
    const url = inviteUrl(kind, getShareReferralId());
    const shareText = kind === 'focus'
      ? createFocusGameInviteText()
      : '잠과 휴식에 관한 1분 체크를 해봤어요. 당신도 지난 일주일을 돌아봐요.';
    onEvent('share_request',{path:result?'/result':'/share',kind:'invite'});
    onEvent('result_share_click',{path:result?'/result':'/share',channel:'invite'});
    if (navigator.share) {
      try {
        await navigator.share({ title: kind === 'focus' ? '너도 해봐 · 뇌컨디션 확인 챌린지' : '잠과 휴식 1분 체크', text: shareText, url });
        setMessage(kind === 'focus' ? '게임 초대를 보냈어요. 친구도 설명을 읽고 직접 시작할 수 있어요.' : '1분 체크 초대 창을 열었어요. 친구도 직접 해보도록 보내 보세요.');
        onEvent('result_share_success',{path:result?'/result':'/share',channel:'invite'});
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          setMessage('초대 공유를 취소했어요.');
          onEvent('share_cancelled',{path:result?'/result':'/share',channel:'invite'});
          return;
        }
      }
    }
    await copyInviteLink(kind, shareText);
  }

  function shareToKakao() {
    if (!type || !kakaoReady || !window.Kakao) return;
    const url = shareUrl(type, getShareReferralId());
    // Keep the Kakao preview aligned with the result-specific OG image used by
    // the static share page. A generic card makes every shared result look the
    // same and weakens the friend-to-friend reflection loop.
    const imageUrl = new URL(`${import.meta.env.BASE_URL}assets/social-rhythm-${type.id}.png`, window.location.origin).toString();
    onEvent('result_share_click',{path:result?'/result':'/share',channel:'kakao'});
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: { title: `셀핀다 하루 리듬 · ${type.shareLabel} · ${type.name}`, description: type.description, imageUrl, link: { mobileWebUrl: url, webUrl: url } },
      buttons: [{ title: '내 리듬도 1분 체크', link: { mobileWebUrl: url, webUrl: url } }],
    });
    onEvent('result_share_success',{path:result?'/result':'/share',channel:'kakao'});
    setMessage('카카오톡 공유 창을 열었어요. 실제 전달 여부는 확인하지 않아요.');
  }

  async function share() {
    if (!type) return;
    const shareText = `나는 ‘${type.shareLabel} · ${type.name}’ 답이 나왔어요. 당신도 지난 7일의 잠과 휴식을 1분 동안 돌아봐요.`;
    onEvent('share_request',{path:result?'/result':'/share'});
    onEvent('result_share_click',{path:result?'/result':'/share',channel:'native'});
    if (cardFile && navigator.share && navigator.canShare?.({ files: [cardFile] })) {
      try {
        await navigator.share({ files: [cardFile], title: '잠과 휴식 1분 체크', text: shareText, url: shareUrl(type,getShareReferralId()) });
        setMessage('공유 창을 이용했어요. 실제 전달 여부는 확인하지 않아요.');
        onEvent('result_share_success',{path:result?'/result':'/share',channel:'native'});
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          setMessage('공유를 취소했어요.');
          onEvent('share_cancelled',{path:result?'/result':'/share',channel:'native'});
          return;
        }
      }
    }
    await copyLink();
  }

  function downloadCard() {
    if (!cardFile) return;
    const url = URL.createObjectURL(cardFile);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = cardFile.name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    onEvent('card_download',{path:result?'/result':'/share',channel:'download'});
    onEvent('result_share_success',{path:result?'/result':'/share',channel:'download'});
    setMessage('PNG 카드 다운로드를 요청했어요.');
  }

  return (
    <section className="rhythm-experience" id="rhythm" aria-labelledby="rhythm-heading">
      <div className="rhythm-heading-row">
        <div><p className="rhythm-eyebrow">01 / 오늘 내 상태 확인</p><h2 id="rhythm-heading">지난 7일, 잠과 휴식은<br />어땠나요?</h2></div>
        <p className="rhythm-intro-copy">다섯 문항 · 누르면 다음 질문으로 넘어가요.</p>
      </div>

      {type ? (
        <div className="rhythm-result-layout">
          <article className="rhythm-result-card">
            <p className="rhythm-eyebrow">{sharedType ? '친구가 돌아본 생활 장면' : '지난 7일, 내가 돌아본 장면'}</p>
            <h3 ref={resultRef} tabIndex={-1}>{type.name}</h3>
            {sharedType ? <p className="rhythm-shared-note">다른 사람이 공유한 생활 유형이에요. 나의 체크 결과는 아닙니다.</p> : null}
            <div className="rhythm-result-primary-actions">
              <p>{sharedType ? '나도 직접 해보기' : '친구도 직접 해보도록 보내기'}</p>
              {sharedType
                ? <button type="button" className="rhythm-button" onClick={start}>나도 1분 체크 해보기 <ArrowRight size={18} aria-hidden="true" /></button>
                : <button type="button" className="rhythm-button" onClick={() => void shareInvite()}>친구에게 1분 체크 보내기 <ArrowUpRight size={18} aria-hidden="true" /></button>}
              {!sharedType ? <small>내 답변과 점수는 전송되지 않아요.</small> : null}
            </div>
            {result ? <BrainLoadVisual result={result} /> : null}
            {signal ? <div className={`rhythm-fatigue-alert rhythm-fatigue-alert-${signal.tone}`} role="status"><AlertTriangle size={23} aria-hidden="true" /><div><p className="rhythm-eyebrow">{signal.label}</p><h4>{signal.heading}</h4><p>{signal.body}</p></div></div> : null}
            {result?.loadLevel === 'high' ? <details className="rhythm-care-guide"><summary>피로가 몇 주째 이어지거나 일상에 지장을 준다면</summary><p>이 점검은 건강 검사가 아니에요. 피로와 잠 문제는 원인이 다양할 수 있으니, 불편이 계속되면 의료진에게 현재 상황을 설명해 보세요.</p></details> : null}
          </article>
          <div className="rhythm-result-actions">
            <details className="rhythm-more-share">
              <summary>결과 카드 공유·저장 등 다른 방법</summary>
              {cardUrl && type ? <img className="rhythm-card-preview" src={cardUrl} alt={`${type.name} 결과 카드 미리보기`} /> : null}
              {!sharedType && kakaoReady ? <button type="button" className="rhythm-button secondary" onClick={shareToKakao}>내 결과 카드 카카오톡 공유 <ArrowUpRight size={18} aria-hidden="true" /></button> : null}
              <button type="button" className="rhythm-button secondary" onClick={share}>내 결과 카드 공유 <ArrowUpRight size={18} aria-hidden="true" /></button>
              <button type="button" className="rhythm-button secondary" onClick={() => void copyInviteLink()}>초대 링크 복사 <ArrowUpRight size={18} aria-hidden="true" /></button>
              <button type="button" className="rhythm-button secondary" onClick={() => void copyLink()}>내 유형 링크 복사 <ArrowUpRight size={18} aria-hidden="true" /></button>
              <button type="button" className="rhythm-button secondary" onClick={downloadCard} disabled={!cardFile}>내 결과 카드 저장 <Download size={18} aria-hidden="true" /></button>
            </details>
            {sharedType ? <label className="rhythm-compare-consent"><input type="checkbox" checked={compareConsent} onChange={event => setCompareConsent(event.target.checked)} /><span>공유받은 유형을 이 화면에서만 기억하고, 내 결과와 함께 볼게요.<small>선택 사항이에요. 문항별 답변은 알 수 없으며 새로고침하면 기억이 사라져요.</small></span></label> : null}
            {!sharedType ? <button type="button" className="rhythm-text-button" onClick={start}>다시 체크하기 <ArrowRight size={18} aria-hidden="true" /></button> : null}
            <details className="rhythm-rules"><summary>점수는 어떻게 나온 건가요?</summary><p>{result?.explanation ?? '지난 7일 동안 잠, 휴식, 아침 피로 등에 답한 내용을 모아 보여드려요. 점수는 내 답변을 정리한 것이며 건강 상태를 재거나 병을 진단하는 결과가 아닙니다.'}</p></details>
            <a className="rhythm-text-button" href="#brain-load-evidence">집중과 휴식 관련 연구 쉽게 보기 <ArrowRight size={18} aria-hidden="true" /></a>
            <div className="rhythm-result-challenge" aria-label="다음으로 해볼 일">
              <p className="rhythm-eyebrow">다음으로 해볼 일</p>
              <a className="rhythm-button secondary" href="#focus-game">뇌컨디션 확인 챌린지 해보기 <ArrowRight size={18} aria-hidden="true" /></a>
              <small>1분 색 신호 게임으로 내 반응 기록을 남겨 보세요.</small>
            </div>
            <div className="rhythm-result-commerce" aria-label="제품과 구매자 후기 확인">
              <p className="rhythm-eyebrow">더 알아보기</p>
              <a className="rhythm-button secondary" href="#products" onClick={() => onEvent('purchase_cta_click', { productId: 'gaba1500', path: '/result' })}>가바 1500 제품 구성 보기 <ArrowRight size={18} aria-hidden="true" /></a>
              <a className="rhythm-text-button" href={REVIEW_DESTINATION_URL} target="_blank" rel="noopener noreferrer" aria-label="가바 1500 스마트스토어 후기 읽기 · 새 창" onClick={() => onEvent('review_open', { productId: 'gaba1500', path: '/result' })}>가바 1500 스마트스토어 후기 읽기 <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      ) : started ? (
        <div className="rhythm-question-layout">
          <div className="rhythm-progress-area"><p className="rhythm-eyebrow">잠과 휴식 1분 체크</p><p className="rhythm-step"><strong>{String(step + 1).padStart(2, '0')}</strong><span>/ 05</span></p><progress value={step + 1} max={5} aria-label={`전체 5문항 중 ${step + 1}번째 질문`} /><p className="rhythm-note">답변은 이 화면에서만 보고,<br />저장하지 않아요.</p></div>
          <div className="rhythm-question-content">
            <fieldset key={question.id}><legend ref={questionRef} tabIndex={-1}>{question.prompt}<small>{question.helper}</small></legend><div className="rhythm-options">{question.options.map(option => <label key={option.value} className={answers[step] === option.value ? 'selected' : ''} onPointerDown={()=>{pointerSelecting.current=true}} onKeyDown={()=>{pointerSelecting.current=false}}><input type="radio" name={question.id} value={option.value} checked={answers[step] === option.value} onChange={() => chooseAnswer(option.value,pointerSelecting.current)} onClick={() => { if (answers[step] === option.value) chooseAnswer(option.value,pointerSelecting.current); }} /><span>{option.label}</span><span className="rhythm-option-mark" aria-hidden="true">{answers[step] === option.value ? '✓' : ''}</span></label>)}</div><p className="rhythm-auto-advance-note">터치로 고르면 다음 질문으로 자동 이동해요. 키보드는 다음 버튼으로 진행할 수 있어요.</p></fieldset>
            <div className="rhythm-navigation"><button type="button" className="rhythm-text-button" onClick={previous} disabled={step === 0}><ChevronLeft size={18} aria-hidden="true" /> 이전</button><button type="button" className="rhythm-button" disabled={answers[step] === undefined} onClick={() => next()}>{step === 4 ? '내 리듬 만나기' : '다음 질문'} <ArrowRight size={18} aria-hidden="true" /></button></div>
          </div>
        </div>
      ) : (
        <div className="rhythm-start-panel"><div><h3>다섯 가지만 확인해요.</h3><p>일을 마쳐도 생각이 이어졌는지, 잠들기까지 오래 걸렸는지 떠올려 보세요.</p><details className="rhythm-start-scenes"><summary>질문에 나오는 생활 장면</summary><ul><li>퇴근 뒤에도 일이 계속 생각남</li><li>침대에 누워 한참 뒤척임</li><li>하루 종일 쉴 틈이 없었음</li><li>아침에도 피로가 남아 있음</li></ul></details></div><div className="rhythm-start-action"><button type="button" className="rhythm-button" onClick={start}>지난 7일 1분 체크 시작 <ArrowRight size={18} aria-hidden="true" /></button><p className="rhythm-note">답변은 저장하지 않아요.</p></div></div>
      )}
      <FatigueGame onEvent={onEvent} onInvite={() => shareInvite('focus')} />
      {result && friendType ? (
        <section className="rhythm-friend-comparison" aria-labelledby="rhythm-comparison-heading">
          <div className="rhythm-comparison-heading"><div><p className="rhythm-eyebrow">함께 돌아보는 하루</p><h3 id="rhythm-comparison-heading">나와 친구, 각자의 쉬는 방식.</h3></div><button type="button" className="rhythm-text-button" onClick={() => { setFriendType(null); setCompareConsent(false); }}>비교 지우기</button></div>
          <p>{result.type.id === friendType.id ? '같은 유형이 나왔어요. 같은 이름이어도 하루의 모습과 편안한 쉬는 방법은 서로 다를 수 있어요.' : '서로 다른 유형이 나왔어요. 누구의 상태가 더 좋다는 뜻이 아니라, 돌아볼 생활 습관이 서로 다르다는 이야기예요.'}</p>
          <div className="rhythm-comparison-grid">
            <article><p className="rhythm-eyebrow">내가 방금 돌아본 리듬</p><h4>{result.type.name}</h4><p>{result.type.suggestions[0]}</p></article>
            <article><p className="rhythm-eyebrow">친구가 공유한 유형</p><h4>{friendType.name}</h4><p>{friendType.suggestions[0]}</p></article>
          </div>
          <p className="rhythm-comparison-prompt">“오늘 언제 잠깐 쉴 수 있었어?” 서로에게 물어보고, 각자 편안했던 시간을 나눠 보세요.</p>
          <p className="rhythm-note">친구의 유형은 링크에 담긴 내용이에요. 문항별 답변이나 신원은 알 수 없고, 비교 내용도 다른 사람에게 공개되지 않아요.</p>
        </section>
      ) : null}
      <p className="rhythm-status" role="status" aria-live="polite">{message}</p>
      {manualLink ? <label className="rhythm-manual-link">친구에게 보낼 내용<input value={manualLink} readOnly onFocus={event => event.target.select()} /></label> : null}
    </section>
  );
}
