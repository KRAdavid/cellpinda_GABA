import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, Download } from 'lucide-react';
import { classifyRhythm, questions, resultTypes, rhythmIdFromUrl } from '../domain/rhythm';
import type { AnswerValue, RhythmId, RhythmResult, RhythmType } from '../domain/rhythm';
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
  drawParagraph(context, 'CELLPINDA · 하루 리듬 이야기', 134, 27, 42);
  drawParagraph(context, '잠깐 멈춰, 나의 하루를 돌아봐요.', 258, 33, 52);
  context.font = 'bold 72px "Malgun Gothic", sans-serif';
  context.fillStyle = '#18382b';
  context.fillText(type.name, 104, 385);
  let y = drawParagraph(context, type.description, 470, 33, 54);
  y = drawParagraph(context, '오늘의 작은 제안', y + 65, 26, 44, '#158457');
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
  drawParagraph(context, '생활 패턴을 돌아보는 이야기입니다.', 1110, 25, 40);
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

  function shareToKakao() {
    if (!type || !kakaoReady || !window.Kakao) return;
    const url = shareUrl(type, getShareReferralId());
    const imageUrl = new URL(`${import.meta.env.BASE_URL}assets/social-card.png`, window.location.origin).toString();
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
        <div><p className="rhythm-eyebrow">01 / DISCOVER YOUR RHYTHM</p><h2 id="rhythm-heading">잠깐 멈춰,<br />나의 하루를 만나보세요.</h2></div>
        <p className="rhythm-intro-copy">몸은 움직이고 있어도, 머리는 하루 종일 켜져 있을 수 있어요.<br />생각이 멈추지 않고 집중이 흐려진다면, 최근의 휴식 습관을 돌아볼 신호일 수 있습니다.</p>
      </div>

      <div className="rhythm-recovery-intro" aria-label="휴식과 회복 안내">
        <div className="rhythm-recovery-intro-copy">
          <p className="rhythm-recovery-kicker">PAUSE → RECOVERY</p>
          <h3>휴식은 멈추는 일이 아니라,<br />뇌가 다시 회복할 시간을 만드는 일입니다.</h3>
          <p>몸은 움직여도 머리가 먼저 지친 느낌이 들 수 있습니다. 지속적인 생각과 자극이 이어졌다면 신호를 억지로 밀어붙이기보다 잠깐 멈추고, 쉬고, 다시 회복하는 흐름을 만들어 보세요.</p>
          <p className="rhythm-recovery-disclaimer">이 안내와 체크는 생활 신호를 돌아보는 도구예요. 지금 적극적인 휴식을 시작할 타이밍을 스스로 알아차리는 데 목적이 있어요.</p>
        </div>
        <ul className="rhythm-load-signals" aria-label="뇌가 쉴 틈이 없을 때 느낄 수 있는 신호">
          <li><strong>생각 과다</strong><span>머릿속이 계속 이어져요</span></li>
          <li><strong>집중 흔들림</strong><span>작은 일도 자주 끊겨요</span></li>
          <li><strong>예민함</strong><span>평소보다 자극이 크게 느껴져요</span></li>
          <li><strong>회복 지연</strong><span>쉬어도 개운하지 않을 수 있어요</span></li>
        </ul>
      </div>

      {type ? (
        <div className="rhythm-result-layout">
          <article className="rhythm-result-card">
            <p className="rhythm-eyebrow">{sharedType ? '공유받은 리듬 이야기' : '나의 하루 리듬 이야기'}</p>
            <h3 ref={resultRef} tabIndex={-1}>{type.name}</h3>
            {sharedType ? <p className="rhythm-shared-note">다른 사람이 공유한 생활 유형이에요. 나의 체크 결과는 아닙니다.</p> : null}
            <p className="rhythm-description">{type.description}</p>
            <svg className="rhythm-card-wave" viewBox="0 0 500 70" aria-hidden="true" focusable="false"><path d="M0 31 C75 -12 110 74 190 31 S330 -12 500 31" /><path d="M0 43 C75 0 110 86 190 43 S330 0 500 43" /><path d="M0 55 C75 12 110 98 190 55 S330 12 500 55" /></svg>
            <div className={`rhythm-recovery-guide rhythm-recovery-${type.recoveryLevel}`}>
              <p className="rhythm-eyebrow">오늘의 회복 초점</p>
              <h4>{type.recoveryHeading}</h4>
              <p>{type.recoveryDescription}</p>
              <a className="text-link" href="#story">GABA 이야기 살펴보기 →</a>
            </div>
            <div className="rhythm-suggestions"><h4>오늘 해볼 작은 일</h4><ul>{type.suggestions.map(suggestion => <li key={suggestion}>{suggestion}</li>)}</ul></div>
            <p className="rhythm-note">생활 패턴을 돌아보는 콘텐츠이며, 의학적 진단이나 체내 GABA 측정이 아닙니다.</p>
          </article>
          <div className="rhythm-result-actions" ref={resultLayoutRef}>
            <p className="rhythm-eyebrow">KEEP YOUR LITTLE MOMENT</p>
            <h3>나를 돌아본 순간을<br />한 장에 담아요.</h3>
            <p>카드와 공유 링크에는 생활 유형이 표시돼요. 문항별 답변은 담지 않습니다.</p>
            {cardUrl && type ? <img className="rhythm-card-preview" src={cardUrl} alt={`${type.name} 결과 카드 미리보기`} /> : null}
            {sharedType ? <button type="button" className="rhythm-button" onClick={start}>나도 1분 리듬 체크 <ArrowRight size={18} aria-hidden="true" /></button> : null}
            {!sharedType && kakaoReady ? <button type="button" className="rhythm-button" onClick={shareToKakao}>카카오톡으로 공유 <ArrowUpRight size={18} aria-hidden="true" /></button> : null}
            <button type="button" className={`rhythm-button${sharedType || kakaoReady ? ' secondary' : ''}`} onClick={share}>리듬 이야기 공유 <ArrowUpRight size={18} aria-hidden="true" /></button>
            {sharedType && kakaoReady ? <button type="button" className="rhythm-button secondary" onClick={shareToKakao}>카카오톡으로 공유 <ArrowUpRight size={18} aria-hidden="true" /></button> : null}
            <button type="button" className="rhythm-button secondary" onClick={() => void copyLink()}>링크만 복사 <ArrowUpRight size={18} aria-hidden="true" /></button>
            <button type="button" className="rhythm-button secondary" onClick={downloadCard} disabled={!cardFile}>이미지 카드 저장 <Download size={18} aria-hidden="true" /></button>
            {sharedType ? <label className="rhythm-compare-consent"><input type="checkbox" checked={compareConsent} onChange={event => setCompareConsent(event.target.checked)} /><span>공유받은 유형을 이 화면에서만 기억하고, 내 결과와 함께 볼게요.<small>선택 사항이에요. 문항별 답변은 알 수 없으며 새로고침하면 기억이 사라져요.</small></span></label> : null}
            {!sharedType ? <button type="button" className="rhythm-text-button" onClick={start}>다시 체크하기 <ArrowRight size={18} aria-hidden="true" /></button> : null}
            <details className="rhythm-rules"><summary>유형은 어떻게 정해지나요?</summary><p>{result?.explanation ?? '긴장, 잠자리 전환, 멈춤의 공백, 자극 부담, 아침 회복감 다섯 신호를 같은 비중으로 비교합니다. 모두 0·1이면 안정 리듬형, 2·3이 있으면 가장 큰 신호를 오늘의 회복 초점으로 보여줍니다. 이 규칙은 생활을 돌아보기 위한 편집 기준이며 검증된 의학적 기준이 아닙니다.'}</p></details>
            <a className="rhythm-text-button" href="#story">이제 GABA를 알아볼까요? <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="rhythm-text-button" href="#products">제품 구성·표시사항 살펴보기 <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      ) : started ? (
        <div className="rhythm-question-layout">
          <div className="rhythm-progress-area"><p className="rhythm-eyebrow">나의 하루 리듬 체크</p><p className="rhythm-step"><strong>{String(step + 1).padStart(2, '0')}</strong><span>/ 05</span></p><progress value={step + 1} max={5} aria-label={`전체 5문항 중 ${step + 1}번째 질문`} /><p className="rhythm-note">답변은 이 화면에서만 사용하며<br />서버에 전송하거나 저장하지 않아요.</p></div>
          <div className="rhythm-question-content">
            <fieldset key={question.id}><legend ref={questionRef} tabIndex={-1}>{question.prompt}<small>{question.helper}</small></legend><div className="rhythm-options">{question.options.map(option => <label key={option.value} className={answers[step] === option.value ? 'selected' : ''} onPointerDown={()=>{pointerSelecting.current=true}} onKeyDown={()=>{pointerSelecting.current=false}}><input type="radio" name={question.id} value={option.value} checked={answers[step] === option.value} onChange={() => chooseAnswer(option.value,pointerSelecting.current)} onClick={() => { if (answers[step] === option.value) chooseAnswer(option.value,pointerSelecting.current); }} /><span>{option.label}</span><span className="rhythm-option-mark" aria-hidden="true">{answers[step] === option.value ? '✓' : ''}</span></label>)}</div><p className="rhythm-auto-advance-note">터치로 고르면 다음 질문으로 자동 이동해요. 키보드는 다음 버튼으로 진행할 수 있어요.</p></fieldset>
            <div className="rhythm-navigation"><button type="button" className="rhythm-text-button" onClick={previous} disabled={step === 0}><ChevronLeft size={18} aria-hidden="true" /> 이전</button><button type="button" className="rhythm-button" disabled={answers[step] === undefined} onClick={() => next()}>{step === 4 ? '내 리듬 만나기' : '다음 질문'} <ArrowRight size={18} aria-hidden="true" /></button></div>
          </div>
        </div>
      ) : (
        <div className="rhythm-start-panel"><div><h3>오늘의 나에게,<br />1분의 여백.</h3><p>생각을 마무리할 틈, 화면에서 벗어날 틈, 잠으로 넘어갈 틈.<br />휴식 후 다시 회복할 수 있도록 작은 질문부터 시작해 보세요.</p><p className="rhythm-gaba-intro">GABA는 뇌의 신경 신호 균형 조절에 관여해 안정과 관련된 물질이에요. 이 체크는 내 생활 리듬을 돌아보며 적극적인 휴식을 시작할 신호를 찾습니다.</p></div><div className="rhythm-start-action"><button type="button" className="rhythm-button" onClick={start}>1분 리듬 체크 시작 <ArrowRight size={18} aria-hidden="true" /></button><p className="rhythm-note">로그인 없이 · 답변 저장 없이<br />의학적 진단이나 체내 GABA 측정이 아닙니다.</p></div></div>
      )}
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
      {type && shareBarVisible ? <div className="rhythm-mobile-share-bar" aria-label="리듬 결과 공유">{kakaoReady ? <button type="button" onClick={shareToKakao}>카카오톡 공유</button> : <button type="button" onClick={share}>공유</button>}<button type="button" onClick={() => void copyLink()}>링크 복사</button></div> : null}
    </section>
  );
}
