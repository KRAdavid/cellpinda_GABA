import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, ArrowUpRight, ChevronLeft, Download } from 'lucide-react';
import { classifyRhythm, questions, resultTypes, rhythmIdFromUrl } from '../domain/rhythm';
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
  base.hash = 'rhythm';
  if (kind === 'focus') base.searchParams.set('focus', '1');
  if (referralId && /^[A-Za-z0-9_-]{8,64}$/.test(referralId)) base.searchParams.set('ref', referralId);
  if (campaignId && /^[A-Za-z0-9_-]{1,64}$/.test(campaignId)) base.searchParams.set('campaign', campaignId);
  return base.toString();
}

function fatigueSignal(result: RhythmResult): { tone: 'high' | 'watch' | 'steady'; label: string; heading: string; body: string } {
  if (result.loadLevel === 'low') return {
    tone: 'steady',
    label: '뇌 피로 신호가 적은 편',
    heading: '지금처럼 쉬는 흐름을 놓치지 마세요.',
    body: '최근 일주일의 답변에서는 뇌가 쉴 틈이 없다는 신호가 크게 보이지 않았어요. 바쁜 날에도 짧은 멈춤을 계속 남겨 두세요.',
  };
  if (result.loadLevel === 'high') return {
    tone: 'high',
    label: '강한 뇌 피로 신호',
    heading: '지금은 뇌가 쉴 틈을 거의 못 찾고 있을 수 있어요.',
    body: '이 신호를 무시하고 계속 버티면 머리가 멍하고 집중이 끊기거나, 밤까지 일이 이어질 수 있어요. 오늘은 화면과 일을 끊고 10분이라도 먼저 쉬세요.',
  };
  return {
    tone: 'watch',
    label: '뇌 피로 주의 신호',
    heading: '뇌가 쉬는 시간이 부족하다는 신호가 보여요.',
    body: '지금 상태로 계속 밀어붙이면 집중과 잠에 부담이 될 수 있어요. 오늘 일정에 5분 멈춤을 먼저 넣고, 머리가 계속 바쁜지 다시 살펴보세요.',
  };
}

function BrainLoadVisual({ result }: { result: RhythmResult }) {
  const { loadScore: score, loadLevel } = result;
  const ratio = score / 15;
  const band = score >= 10 ? 'high' : score >= 5 ? 'watch' : 'low';
  const description = loadLevel === 'high' && score < 5
    ? '합계는 낮아도 한 장면에서 강한 휴식 신호가 있었어요.'
    : score >= 10
      ? '여러 장면에서 머리가 쉴 틈이 부족했다고 답했어요.'
      : score >= 5
        ? '몇 가지 장면에서 쉬는 신호가 겹쳤어요.'
        : '답변에서 쉬는 신호가 적은 편이에요.';
  const brainPath = 'M108 29c-8-12-24-13-34-4-13-4-27 5-27 19-14 5-18 21-8 31-5 14 5 28 19 29 7 12 23 14 34 5 8 8 19 8 27 0 10 9 25 6 30-6 14 1 25-12 21-26 11-10 8-27-5-34-1-14-15-23-28-18-7-7-19-7-29 4z';

  return (
    <div className={`rhythm-load-score rhythm-load-score-${band}`}>
      <div className="rhythm-load-score-heading"><span>최근 7일 생활 신호 지수</span><strong>{score}<small>/ 15</small></strong></div>
      <div className="rhythm-load-visual">
        <svg className="rhythm-load-brain" viewBox="0 0 210 125" role="img" aria-label={`생활 신호 ${score}점에 맞춰 채워진 뇌 일러스트`}>
          <defs>
            <linearGradient id="rhythm-brain-load-fill" x1="0" x2="1">
              <stop offset="0%" stopColor="#45a875" />
              <stop offset="54%" stopColor="#e0ae42" />
              <stop offset="100%" stopColor="#d46c42" />
            </linearGradient>
            <clipPath id="rhythm-brain-load-clip"><path d={brainPath} /></clipPath>
          </defs>
          <circle className="rhythm-brain-halo" cx="104" cy="64" r="58" />
          <path className="rhythm-brain-base" d={brainPath} />
          <rect className="rhythm-brain-fill" x="34" y="18" width={140 * ratio} height="98" clipPath="url(#rhythm-brain-load-clip)" />
          <path className="rhythm-brain-outline" d={brainPath} />
          <path className="rhythm-brain-fold" d="M104 29c-5 10 5 15 0 24s5 14 0 23 5 15 0 23m-27-63c9-2 15 4 14 12m-22 1c8 0 12 6 10 13m-7 10c8-3 14 1 15 9m26-39c9-2 14 3 14 10m7 4c-8-1-13 4-12 11m13 8c-8-3-14 1-15 9" />
          <g className="rhythm-brain-signals" aria-hidden="true">
            <path d="M49 24 41 15m27-1-3-12m36 15V5m34 9 4-12m25 19 10-9M34 54 21 50m153 4 13-4M36 88l-11 7m142-7 11 7" opacity={ratio} />
            {[0, 1, 2, 3, 4, 5].map((index) => <circle key={index} cx={62 + index * 16} cy={score >= 10 ? 38 + (index % 2) * 47 : 40 + (index % 2) * 42} r="2.2" opacity={Math.max(0, Math.min(1, (score - index * 2) / 3))} />)}
          </g>
        </svg>
        <div className="rhythm-load-visual-copy">
          <p className="rhythm-load-visual-kicker">점수가 높을수록</p>
          <strong>{description}</strong>
          <div className="rhythm-load-segments" aria-hidden="true">
            {Array.from({ length: 15 }, (_, index) => <i key={index} className={index < score ? 'is-filled' : ''} />)}
          </div>
          <span>최근 일주일 동안 쉬는 시간이 필요했다고 답한 정도예요.</span>
        </div>
      </div>
      <progress className="rhythm-load-progress-accessible" value={score} max={15} aria-label={`최근 7일 생활 신호 ${score}점, 15점 만점`} />
      <p className="rhythm-load-footnote">그림은 답변 점수를 보여줘요. 뇌 기능을 측정하거나 진단한 결과는 아닙니다.</p>
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
  drawParagraph(context, '의학적 진단이나 체내 GABA 측정이 아닙니다.', 1158, 25, 40);
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
  const [shareBarVisible, setShareBarVisible] = useState(false);
  const focusAutoStart = typeof window !== 'undefined' && (new URLSearchParams(window.location.search).get('focus') === '1' || window.location.pathname.endsWith('/focus/'));
  const sharedTracked=useRef(false);
  const pointerSelecting=useRef(false);
  const shareReferralRef=useRef('');
  const getShareReferralId=()=>{if(!shareReferralRef.current){shareReferralRef.current=crypto.randomUUID().replaceAll('-','').slice(0,16)}return shareReferralRef.current};
  useEffect(()=>{if(sharedType&&!sharedTracked.current){sharedTracked.current=true;onEvent('shared_link_landed',{path:'/share'});onEvent('result_viewed',{path:'/share'})}},[sharedType,onEvent]);
  useEffect(()=>{if(!kakaoKey)return;const ready=()=>{if(!window.Kakao)return;try{if(!window.Kakao.isInitialized())window.Kakao.init(kakaoKey);setKakaoReady(true)}catch{setKakaoReady(false)}};if(window.Kakao){ready();return;}const script=document.createElement('script');script.src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';script.async=true;script.onload=ready;script.onerror=()=>setKakaoReady(false);document.head.appendChild(script);return()=>{script.onload=null;script.onerror=null}},[]);
  const answerStarted=useRef(false);
  const resultViewed=useRef(false);
  const questionRef = useRef<HTMLLegendElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const resultLayoutRef = useRef<HTMLDivElement>(null);
  const autoAdvanceTimer = useRef<number | null>(null);
  const type = result?.type ?? sharedType;
  const signal = result ? fatigueSignal(result) : null;
  const question = questions[step]!;

  useEffect(() => () => {
    if (autoAdvanceTimer.current !== null) window.clearTimeout(autoAdvanceTimer.current);
  }, []);

  useEffect(() => {
    if (started && !type) questionRef.current?.focus();
    if (result) {resultRef.current?.focus();if(!resultViewed.current){resultViewed.current=true;onEvent('result_viewed',{path:'/result'})}}
  }, [step, started, result, type]);

  useEffect(() => {
    const target = resultLayoutRef.current;
    if (!target || !type) { setShareBarVisible(false); return; }
    const observer = new IntersectionObserver(([entry]) => setShareBarVisible(Boolean(entry?.isIntersecting)), { threshold: 0.05 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [type, result]);

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

  async function copyInviteLink(kind: 'rhythm' | 'focus' = 'rhythm') {
    const url = inviteUrl(kind, getShareReferralId());
    try {
      await navigator.clipboard.writeText(url);
      setMessage(kind === 'focus' ? '뇌컨디션 확인 챌린지 초대 링크를 복사했어요. 받은 사람도 자기 기록을 직접 확인해요.' : '내 결과 대신 1분 점검 초대 링크를 복사했어요. 받은 사람도 자기 상태를 직접 확인해요.');
      setManualLink('');
      onEvent('share_copy',{path:result?'/result':'/share',channel:'invite'});
      onEvent('result_share_success',{path:result?'/result':'/share',channel:'invite'});
    } catch {
      setManualLink(url);
      setMessage('초대 링크를 아래에서 선택해 직접 복사해 주세요.');
    }
  }

  async function shareInvite(kind: 'rhythm' | 'focus' = 'rhythm') {
    const url = inviteUrl(kind, getShareReferralId());
    const shareText = kind === 'focus'
      ? '요즘 머리가 예전 같지 않다면 이 1분 게임을 같이 해봐요. 내 기록은 서로 보이지 않고, 각자 직접 확인해요.'
      : '나도 뇌 피로 1분 점검을 해봤어요. 당신도 1분이면 지금 상태를 확인할 수 있어요.';
    onEvent('share_request',{path:result?'/result':'/share',kind:'invite'});
    onEvent('result_share_click',{path:result?'/result':'/share',channel:'invite'});
    if (navigator.share) {
      try {
        await navigator.share({ title: kind === 'focus' ? '“너도 해봐” 1분 뇌컨디션 확인 챌린지' : '뇌 피로 1분 점검', text: shareText, url });
        setMessage('1분 점검 초대 창을 열었어요. 상대방이 직접 점검하도록 보내 보세요.');
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
    await copyInviteLink(kind);
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
      content: { title: `셀핀다 하루 리듬 · ${type.name}`, description: type.description, imageUrl, link: { mobileWebUrl: url, webUrl: url } },
      buttons: [{ title: '내 리듬도 1분 체크', link: { mobileWebUrl: url, webUrl: url } }],
    });
    onEvent('result_share_success',{path:result?'/result':'/share',channel:'kakao'});
    setMessage('카카오톡 공유 창을 열었어요. 실제 전달 여부는 확인하지 않아요.');
  }

  async function share() {
    if (!type) return;
    const shareText = `나는 ‘${type.name}’이 나왔어요. 당신의 하루 리듬은 어떤가요? 1분이면 확인할 수 있어요.`;
    onEvent('share_request',{path:result?'/result':'/share'});
    onEvent('result_share_click',{path:result?'/result':'/share',channel:'native'});
    if (cardFile && navigator.share && navigator.canShare?.({ files: [cardFile] })) {
      try {
        await navigator.share({ files: [cardFile], title: '셀핀다 하루 리듬 이야기', text: shareText, url: shareUrl(type,getShareReferralId()) });
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
        <div><p className="rhythm-eyebrow">01 / 오늘 내 상태 확인</p><h2 id="rhythm-heading">일이 끝나도 머리가<br />쉬지 않으신가요?</h2></div>
        <p className="rhythm-intro-copy">잠자리에 누워도 잠이 안 오고, 쉬어도 아침에 피곤한가요?<br />아래 다섯 질문에 답하면 지금 뇌 피로가 쌓였는지 돌아볼 수 있어요.</p>
      </div>

      <div className="rhythm-recovery-intro" aria-label="휴식과 회복 안내">
        <div className="rhythm-recovery-intro-copy">
          <p className="rhythm-recovery-kicker">뇌 피로 점검</p>
          <h3>계속 버티면 뇌 과부하가 쌓일 수 있어요.<br />지금 잠깐 멈추세요.</h3>
          <p>일이 끝나도 생각이 멈추지 않고, 잠이 안 오고, 쉬어도 피곤하면 뇌가 쉴 틈이 부족하다는 신호일 수 있습니다. 더 버티기 전에 오늘 5분부터 비워 보세요.</p>
          <p className="rhythm-recovery-disclaimer">이 체크는 병을 진단하는 검사가 아닙니다. 최근 일주일 동안 뇌가 쉬지 못한 장면을 찾아 적극적인 휴식을 시작하는 안내입니다.</p>
        </div>
        <ul className="rhythm-load-signals" aria-label="뇌가 쉴 틈이 없을 때 느낄 수 있는 신호">
          <li><strong>생각이 많음</strong><span>일이 끝나도 머리가 바빠요</span></li>
          <li><strong>집중이 끊김</strong><span>하던 일을 자꾸 다시 시작해요</span></li>
          <li><strong>주변이 신경 쓰임</strong><span>소리·빛·사람이 크게 느껴져요</span></li>
          <li><strong>아침 피로</strong><span>쉬어도 개운하지 않아요</span></li>
        </ul>
      </div>

      {type ? (
        <div className="rhythm-result-layout">
          <article className="rhythm-result-card">
            <p className="rhythm-eyebrow">{sharedType ? '공유받은 오늘 상태' : '나의 오늘 상태 이야기'}</p>
            <h3 ref={resultRef} tabIndex={-1}>{type.name}</h3>
            {sharedType ? <p className="rhythm-shared-note">다른 사람이 공유한 생활 유형이에요. 나의 체크 결과는 아닙니다.</p> : null}
            {result ? <BrainLoadVisual result={result} /> : null}
            <p className="rhythm-description">{type.description}</p>
            {signal ? <div className={`rhythm-fatigue-alert rhythm-fatigue-alert-${signal.tone}`} role="status"><AlertTriangle size={23} aria-hidden="true" /><div><p className="rhythm-eyebrow">{signal.label}</p><h4>{signal.heading}</h4><p>{signal.body}</p></div></div> : null}
            {result?.loadLevel === 'high' ? <aside className="rhythm-care-guide" aria-label="전문가 상담 안내"><p className="rhythm-eyebrow">계속되면 확인이 필요해요</p><h4>피로와 집중 저하가 몇 주째 이어지거나 일상에 지장을 주면 전문가와 상담해 보세요.</h4><p>피로와 잠 문제의 원인은 생활 습관부터 건강 상태까지 다양할 수 있어요. 이 점검 결과만으로 원인을 판단하지 말고, 증상이 계속되면 의료진에게 현재 상황을 설명해 주세요.</p></aside> : null}
            <svg className="rhythm-card-wave" viewBox="0 0 500 70" aria-hidden="true" focusable="false"><path d="M0 31 C75 -12 110 74 190 31 S330 -12 500 31" /><path d="M0 43 C75 0 110 86 190 43 S330 0 500 43" /><path d="M0 55 C75 12 110 98 190 55 S330 12 500 55" /></svg>
            <div className={`rhythm-recovery-guide rhythm-recovery-${type.recoveryLevel}`}>
            <p className="rhythm-eyebrow">뇌 피로를 줄이기 위해 먼저 할 일</p>
              <h4>{type.recoveryHeading}</h4>
              <p>{type.recoveryDescription}</p>
            <a className="text-link" href="#story">GABA가 어떤 물질인지 확인하기 →</a>
            </div>
            <div className="rhythm-suggestions"><h4>오늘 바로 해볼 일</h4><ul>{type.suggestions.map(suggestion => <li key={suggestion}>{suggestion}</li>)}</ul></div>
            <p className="rhythm-note">최근 일주일의 생활을 돌아보는 안내이며, 건강 상태나 체내 GABA 수치를 확인하는 검사가 아닙니다.</p>
          </article>
          <div className="rhythm-result-actions" ref={resultLayoutRef}>
            <p className="rhythm-eyebrow">같이 1분 점검하기</p>
            <h3>내 결과를 보여주기보다<br />서로 직접 확인해 보세요.</h3>
            <p>초대 링크에는 내 답변이나 유형이 담기지 않아요. 받은 사람도 자기 상태를 직접 점검하고, 필요한 휴식을 찾아볼 수 있어요.</p>
            {cardUrl && type ? <img className="rhythm-card-preview" src={cardUrl} alt={`${type.name} 결과 카드 미리보기`} /> : null}
            {sharedType ? <button type="button" className="rhythm-button" onClick={start}>나도 1분 리듬 체크 <ArrowRight size={18} aria-hidden="true" /></button> : null}
            <button type="button" className="rhythm-button" onClick={() => void shareInvite()}>친구에게 “너도 해봐” 보내기 <ArrowUpRight size={18} aria-hidden="true" /></button>
            {!sharedType && kakaoReady ? <button type="button" className="rhythm-button secondary" onClick={shareToKakao}>내 결과 카드 카카오톡 공유 <ArrowUpRight size={18} aria-hidden="true" /></button> : null}
            <button type="button" className="rhythm-button secondary" onClick={share}>내 결과 카드 공유 <ArrowUpRight size={18} aria-hidden="true" /></button>
            <button type="button" className="rhythm-button secondary" onClick={() => void copyInviteLink()}>1분 점검 초대 링크 복사 <ArrowUpRight size={18} aria-hidden="true" /></button>
            <button type="button" className="rhythm-button secondary" onClick={() => void copyLink()}>내 결과 링크 복사 <ArrowUpRight size={18} aria-hidden="true" /></button>
            <button type="button" className="rhythm-button secondary" onClick={downloadCard} disabled={!cardFile}>내 결과 카드 저장 <Download size={18} aria-hidden="true" /></button>
            {sharedType ? <label className="rhythm-compare-consent"><input type="checkbox" checked={compareConsent} onChange={event => setCompareConsent(event.target.checked)} /><span>공유받은 유형을 이 화면에서만 기억하고, 내 결과와 함께 볼게요.<small>선택 사항이에요. 문항별 답변은 알 수 없으며 새로고침하면 기억이 사라져요.</small></span></label> : null}
            {!sharedType ? <button type="button" className="rhythm-text-button" onClick={start}>다시 체크하기 <ArrowRight size={18} aria-hidden="true" /></button> : null}
            <details className="rhythm-rules"><summary>이 결과를 어떻게 읽으면 되나요?</summary><p>{result?.explanation ?? '최근 일주일을 다섯 가지 생활 장면으로 나눠 봅니다. 0·1은 지금 습관을 이어가도 좋은 장면, 2·3은 쉬는 시간을 먼저 만들어 볼 장면으로 표시합니다. 가장 자주 불편했던 장면 하나를 오늘의 초점으로 보여줍니다. 건강 상태나 체내 GABA 수치를 알려주는 검사는 아닙니다.'}</p></details>
            <a className="rhythm-text-button" href="#story">GABA가 어떤 물질인지 알아보기 <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="rhythm-text-button" href="#brain-load-evidence">뇌 피로와 건강 연구를 쉽게 보기 <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="rhythm-text-button" href="#products">제품 구성·표시사항 살펴보기 <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      ) : started ? (
        <div className="rhythm-question-layout">
          <div className="rhythm-progress-area"><p className="rhythm-eyebrow">뇌 피로 1분 점검</p><p className="rhythm-step"><strong>{String(step + 1).padStart(2, '0')}</strong><span>/ 05</span></p><progress value={step + 1} max={5} aria-label={`전체 5문항 중 ${step + 1}번째 질문`} /><p className="rhythm-note">답변은 이 화면에서만 사용하며<br />서버에 전송하거나 저장하지 않아요.</p></div>
          <div className="rhythm-question-content">
            <fieldset key={question.id}><legend ref={questionRef} tabIndex={-1}>{question.prompt}<small>{question.helper}</small></legend><div className="rhythm-options">{question.options.map(option => <label key={option.value} className={answers[step] === option.value ? 'selected' : ''} onPointerDown={()=>{pointerSelecting.current=true}} onKeyDown={()=>{pointerSelecting.current=false}}><input type="radio" name={question.id} value={option.value} checked={answers[step] === option.value} onChange={() => chooseAnswer(option.value,pointerSelecting.current)} onClick={() => { if (answers[step] === option.value) chooseAnswer(option.value,pointerSelecting.current); }} /><span>{option.label}</span><span className="rhythm-option-mark" aria-hidden="true">{answers[step] === option.value ? '✓' : ''}</span></label>)}</div><p className="rhythm-auto-advance-note">터치로 고르면 다음 질문으로 자동 이동해요. 키보드는 다음 버튼으로 진행할 수 있어요.</p></fieldset>
            <div className="rhythm-navigation"><button type="button" className="rhythm-text-button" onClick={previous} disabled={step === 0}><ChevronLeft size={18} aria-hidden="true" /> 이전</button><button type="button" className="rhythm-button" disabled={answers[step] === undefined} onClick={() => next()}>{step === 4 ? '내 리듬 만나기' : '다음 질문'} <ArrowRight size={18} aria-hidden="true" /></button></div>
          </div>
        </div>
      ) : (
        <div className="rhythm-start-panel"><div><h3>뇌 피로가 쌓였는지,<br />1분이면 확인해요.</h3><p>퇴근 후에도 일이 생각나는지, 침대에서 뒤척이는지, 하루에 5분도 못 쉬는지 차례로 답해 보세요.<br />지금 쉬어야 할 장면을 바로 찾을 수 있습니다.</p><p className="rhythm-gaba-intro">GABA는 뇌에서 신경세포 사이의 신호를 조절하는 물질이에요. 이 체크는 최근 일주일의 생활을 돌아보고, 오늘 뇌를 쉬게 할 방법을 찾는 안내입니다.</p></div><div className="rhythm-start-action"><button type="button" className="rhythm-button" onClick={start}>뇌 피로 1분 점검 시작 <ArrowRight size={18} aria-hidden="true" /></button><p className="rhythm-note">로그인 없이 · 답변 저장 없이<br />건강 상태나 체내 GABA 수치를 확인하는 검사가 아닙니다.</p></div></div>
      )}
      <FatigueGame onEvent={onEvent} onInvite={() => shareInvite('focus')} startOnMount={focusAutoStart} />
      {result && friendType ? (
        <section className="rhythm-friend-comparison" aria-labelledby="rhythm-comparison-heading">
          <div className="rhythm-comparison-heading"><div><p className="rhythm-eyebrow">함께 돌아보는 하루</p><h3 id="rhythm-comparison-heading">나와 친구, 각자의 쉬는 방식.</h3></div><button type="button" className="rhythm-text-button" onClick={() => { setFriendType(null); setCompareConsent(false); }}>비교 지우기</button></div>
          <p>{result.type.id === friendType.id ? '같은 유형이 나왔어요. 같은 이름이어도 하루의 모습과 편안한 쉬는 방법은 서로 다를 수 있어요.' : '서로 다른 유형이 나왔어요. 누구의 상태가 더 좋다는 뜻이 아니라, 돌아볼 생활 습관이 서로 다르다는 이야기예요.'}</p>
          <div className="rhythm-comparison-grid">
            <article><p className="rhythm-eyebrow">내가 방금 돌아본 리듬</p><h4>{result.type.name}</h4><p>{result.type.suggestions[0]}</p></article>
            <article><p className="rhythm-eyebrow">친구가 공유한 유형</p><h4>{friendType.name}</h4><p>{friendType.suggestions[0]}</p></article>
          </div>
          <p className="rhythm-comparison-prompt">“오늘 언제 잠깐 쉴 수 있었어?” 서로에게 물어보고, 각자 편안했던 시간을 나눠 보세요.</p>
          <p className="rhythm-note">친구의 유형은 전달받은 링크에 담긴 내용이며, 실제 답변이나 신원은 확인하지 않아요. 비교 내용은 서버로 보내거나 공유 카드에 담지 않습니다.</p>
        </section>
      ) : null}
      <p className="rhythm-status" role="status" aria-live="polite">{message}</p>
      {manualLink ? <label className="rhythm-manual-link">공유 링크<input value={manualLink} readOnly onFocus={event => event.target.select()} /></label> : null}
      {type && shareBarVisible ? <div className="rhythm-mobile-share-bar" aria-label="1분 점검 초대"><button type="button" onClick={() => void shareInvite()}>너도 1분 점검</button><button type="button" onClick={() => void copyInviteLink()}>초대 링크 복사</button></div> : null}
    </section>
  );
}
