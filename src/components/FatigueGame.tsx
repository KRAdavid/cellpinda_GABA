import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Brain, CheckCircle2, CircleAlert, ExternalLink, Pause, Play, RotateCcw, Timer, Volume2, VolumeX } from 'lucide-react';
import {
  compareFocusGames,
  FOCUS_GAME_RECOVERY_THRESHOLD_PCT,
  FOCUS_GAME_STAGES,
  FOCUS_GAME_TRIALS_PER_STAGE,
  needsFocusRecovery,
  summarizeFocusGame,
  type FocusGameStage,
  type FocusGameSummary,
  type FocusTrialRecord,
} from '../domain/fatigue-game';
import './fatigue-game.css';

type GamePhase = 'idle' | 'running' | 'baseline-complete' | 'rest' | 'complete';
type GameMode = 'baseline' | 'after';
type StimulusColor = 'green' | 'purple' | 'red';

interface Trial {
  stage: FocusGameStage;
  stimulusColor: StimulusColor;
  targetColor: StimulusColor;
  shouldRespond: boolean;
}

interface RunPattern {
  brakeStopIndex: number;
  switchTargetColors: StimulusColor[];
  switchShouldRespond: boolean[];
}

interface FatigueGameProps {
  onEvent: (name: string, properties?: Record<string, string>) => void;
  onInvite?: () => void | Promise<void>;
  startOnMount?: boolean;
}

interface RelaxationAudio {
  context: AudioContext;
  oscillators: OscillatorNode[];
}

function createRelaxationAudio(): RelaxationAudio | null {
  const AudioContextCtor = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return null;
  try {
    const context = new AudioContextCtor();
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.045, context.currentTime + 1.8);
    master.connect(context.destination);
    const oscillators = [196, 246.94].map(frequency => {
      const oscillator = context.createOscillator();
      const voice = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      voice.gain.value = 0.24;
      oscillator.connect(voice);
      voice.connect(master);
      oscillator.start();
      return oscillator;
    });
    return { context, oscillators };
  } catch {
    return null;
  }
}

const stageInfo: Record<FocusGameStage, { label: string; instruction: string; detail: string }> = {
  speed: { label: '반응 속도', instruction: '색이 보이면 바로 눌러요', detail: '신호를 잡는 속도' },
  brake: { label: '멈춤 억제', instruction: '초록은 누르고 빨강은 참아요', detail: '눌러야 할 때와 멈출 때' },
  switch: { label: '규칙 전환', instruction: '위의 색과 같은 신호만 눌러요', detail: '바뀐 규칙에 적응하는 속도' },
};

function shuffled<T>(items: T[]): T[] {
  return items.map(item => ({item, order: Math.random()})).sort((a, b) => a.order - b.order).map(({item}) => item);
}

function createRunPattern(): RunPattern {
  return {
    brakeStopIndex: Math.floor(Math.random() * FOCUS_GAME_TRIALS_PER_STAGE),
    switchTargetColors: shuffled(['green', 'purple', 'green', 'purple'] as StimulusColor[]),
    switchShouldRespond: shuffled([true, true, false, false]),
  };
}

function createTrial(stageIndex: number, trialIndex: number, pattern: RunPattern): Trial {
  const stage = FOCUS_GAME_STAGES[stageIndex]!;
  if (stage === 'speed') return { stage, stimulusColor: 'green', targetColor: 'green', shouldRespond: true };
  if (stage === 'brake') {
    const shouldRespond = trialIndex !== pattern.brakeStopIndex;
    return { stage, stimulusColor: shouldRespond ? 'green' : 'red', targetColor: 'green', shouldRespond };
  }
  const targetColor = pattern.switchTargetColors[trialIndex]!;
  const shouldRespond = pattern.switchShouldRespond[trialIndex]!;
  return { stage, stimulusColor: shouldRespond ? targetColor : targetColor === 'green' ? 'purple' : 'green', targetColor, shouldRespond };
}

function metricText(value: number | null, suffix = 'ms'): string {
  return value === null ? '기록 없음' : `${value}${suffix}`;
}

function summaryLine(summary: FocusGameSummary): string {
  return `정확도 ${summary.accuracyPct}% · 반응 ${metricText(summary.speed.averageMs)}`;
}

function comparisonText(before: FocusGameSummary, after: FocusGameSummary): { heading: string; body: string; tone: 'improved' | 'declined' | 'mixed' | 'similar' | 'unavailable' } {
  const comparison = compareFocusGames(before, after);
  const speed = comparison.speedDeltaMs === null ? '반응 속도는 비교하기 어려워요.' : `반응 속도 ${Math.abs(comparison.speedDeltaMs)}ms ${comparison.speedDeltaMs < 0 ? '빨라졌어요' : comparison.speedDeltaMs > 0 ? '느려졌어요' : '같아요'}.`;
  const accuracy = comparison.accuracyDeltaPct === null ? '' : `전체 정확도는 ${Math.abs(comparison.accuracyDeltaPct)}%p ${comparison.accuracyDeltaPct > 0 ? '올랐어요' : comparison.accuracyDeltaPct < 0 ? '내려갔어요' : '같아요'}.`;
  if (comparison.direction === 'improved') return { heading: '쉬고 나니 집중 리듬이 더 안정적이에요.', body: `${speed} ${accuracy} 짧은 휴식 뒤 내 기록이 어떻게 달라졌는지 확인한 결과예요.`, tone: 'improved' };
  if (comparison.direction === 'declined') return { heading: '잠깐 더 쉬면 집중 리듬이 다시 맞을 수 있어요.', body: `${speed} ${accuracy} 오늘은 화면과 일을 끊고 뇌에 여유를 조금 더 선물해 보세요.`, tone: 'declined' };
  if (comparison.direction === 'mixed') return { heading: '속도와 정확도가 서로 다르게 움직였어요.', body: `${speed} ${accuracy} 한 번의 기록보다 지금 느끼는 피로감과 잠의 질을 함께 살펴보세요.`, tone: 'mixed' };
  if (comparison.direction === 'similar') return { heading: '두 번의 집중 리듬이 비슷해요.', body: `${speed} ${accuracy} 짧은 게임은 오늘의 개인 기록으로만 남겨 두세요.`, tone: 'similar' };
  return { heading: '조용한 곳에서 다시 맞춰 볼까요?', body: '주변 소리와 화면 환경의 영향을 많이 받은 기록일 수 있어요. 몸을 편하게 하고 한 번 더 확인해 보세요.', tone: 'unavailable' };
}

function stageMetric(label: string, before: { accuracyPct: number; averageMs: number | null }, after: { accuracyPct: number; averageMs: number | null }) {
  return { label, before: `${before.accuracyPct}% · ${metricText(before.averageMs)}`, after: `${after.accuracyPct}% · ${metricText(after.averageMs)}` };
}

function FocusJourneyVisual() {
  return (
    <div className="fatigue-journey-visual" role="img" aria-label="반응, 멈춤, 전환 세 단계를 거치는 1분 집중 리듬 챌린지">
      <span className="fatigue-journey-ring fatigue-journey-ring-one" />
      <span className="fatigue-journey-ring fatigue-journey-ring-two" />
      <div className="fatigue-journey-core"><Brain size={28} aria-hidden="true" /><strong>1분</strong><span>집중 리듬</span></div>
      <div className="fatigue-journey-node fatigue-journey-node-speed"><b>01</b><strong>반응</strong><small>빠르게 잡기</small></div>
      <div className="fatigue-journey-node fatigue-journey-node-brake"><b>02</b><strong>멈춤</strong><small>한 박자 참기</small></div>
      <div className="fatigue-journey-node fatigue-journey-node-switch"><b>03</b><strong>전환</strong><small>규칙 바꾸기</small></div>
      <span className="fatigue-journey-dot fatigue-journey-dot-one" /><span className="fatigue-journey-dot fatigue-journey-dot-two" /><span className="fatigue-journey-dot fatigue-journey-dot-three" />
    </div>
  );
}

export default function FatigueGame({ onEvent, onInvite, startOnMount = false }: FatigueGameProps) {
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [mode, setMode] = useState<GameMode>('baseline');
  const [stageIndex, setStageIndex] = useState(0);
  const [trialIndex, setTrialIndex] = useState(0);
  const [trial, setTrial] = useState<Trial | null>(null);
  const [stimulusVisible, setStimulusVisible] = useState(false);
  const [records, setRecords] = useState<FocusTrialRecord[]>([]);
  const [falseStarts, setFalseStarts] = useState(0);
  const [before, setBefore] = useState<FocusGameSummary | null>(null);
  const [after, setAfter] = useState<FocusGameSummary | null>(null);
  const [restReason, setRestReason] = useState<'baseline' | 'recovery'>('baseline');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [audioMessage, setAudioMessage] = useState('');
  const [status, setStatus] = useState('');
  const timerRef = useRef<number | null>(null);
  const stimulusAtRef = useRef(0);
  const runPatternRef = useRef<RunPattern>(createRunPattern());
  const audioRef = useRef<RelaxationAudio | null>(null);
  const audioStopTimerRef = useRef<number | null>(null);
  const autoStartedRef = useRef(false);

  function stopRelaxationAudio() {
    if (audioStopTimerRef.current !== null) {
      window.clearTimeout(audioStopTimerRef.current);
      audioStopTimerRef.current = null;
    }
    const audio = audioRef.current;
    if (audio) {
      audio.oscillators.forEach(oscillator => {
        try { oscillator.stop(); } catch { /* already stopped */ }
      });
      void audio.context.close();
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setAudioPlaying(false);
    setAudioPaused(false);
  }

  function speakRelaxationNarration() {
    if (!('speechSynthesis' in window)) {
      setAudioMessage('이 브라우저는 음성 안내를 지원하지 않아요. 조용한 휴식만 이어가도 괜찮아요.');
      return;
    }
    const narration = new SpeechSynthesisUtterance('지금 5분만 화면을 내려놓으세요. 어깨와 턱의 힘을 풀고, 천천히 숨을 쉬어 보세요. 먼 곳을 바라보며 머리가 잠깐 쉴 자리를 만들어 주세요.');
    narration.lang = 'ko-KR';
    narration.rate = 0.82;
    narration.pitch = 1;
    narration.volume = 0.72;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(narration);
  }

  function startRelaxationAudio() {
    if (audioRef.current) {
      void audioRef.current.context.resume();
      if ('speechSynthesis' in window) window.speechSynthesis.resume();
      setAudioPlaying(true);
      setAudioPaused(false);
      return;
    }
    const audio = createRelaxationAudio();
    if (!audio) {
      setAudioMessage('이 브라우저에서는 편안한 소리를 재생할 수 없어요. 화면을 내려놓고 안내대로 쉬어 보세요.');
      return;
    }
    audioRef.current = audio;
    void audio.context.resume().catch(() => setAudioMessage('소리를 시작하려면 아래 버튼을 한 번 더 눌러 주세요.'));
    audioStopTimerRef.current = window.setTimeout(() => {
      stopRelaxationAudio();
      setAudioMessage('5분 리셋 사운드가 끝났어요. 준비되면 다시 측정해 보세요.');
    }, 5 * 60 * 1000);
    setAudioPlaying(true);
    setAudioPaused(false);
    setAudioMessage('편안한 소리와 짧은 음성 안내를 재생하고 있어요.');
    speakRelaxationNarration();
  }

  function toggleRelaxationPause() {
    const audio = audioRef.current;
    if (!audio) {
      startRelaxationAudio();
      return;
    }
    if (audioPaused) {
      void audio.context.resume();
      if ('speechSynthesis' in window) window.speechSynthesis.resume();
      setAudioPaused(false);
      setAudioMessage('소리를 다시 재생하고 있어요.');
    } else {
      void audio.context.suspend();
      if ('speechSynthesis' in window) window.speechSynthesis.pause();
      setAudioPaused(true);
      setAudioMessage('소리를 잠시 멈췄어요.');
    }
  }

  useEffect(() => {
    if (!startOnMount || autoStartedRef.current) return;
    autoStartedRef.current = true;
    const timer = window.setTimeout(() => {
      document.getElementById('focus-game')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      startRun('baseline');
    }, 240);
    return () => window.clearTimeout(timer);
  }, [startOnMount]);

  useEffect(() => {
    if (phase !== 'running') return;
    if (!stimulusVisible) {
      const delay = 650 + Math.floor(Math.random() * 750);
      timerRef.current = window.setTimeout(() => {
        const nextTrial = createTrial(stageIndex, trialIndex, runPatternRef.current);
        setTrial(nextTrial);
        stimulusAtRef.current = performance.now();
        setStimulusVisible(true);
        setStatus(nextTrial.shouldRespond ? '지금 눌러요' : nextTrial.stage === 'brake' ? '빨강이면 멈춰요' : '규칙을 보고 판단해요');
      }, delay);
    } else {
      timerRef.current = window.setTimeout(() => finishTrial(false), 1450);
    }
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [phase, stimulusVisible, stageIndex, trialIndex, mode, trial]);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    stopRelaxationAudio();
  }, []);

  function finishTrial(responded: boolean) {
    if (!trial) return;
    const responseMs = responded ? Math.max(1, Math.round(performance.now() - stimulusAtRef.current)) : null;
    const correct = trial.shouldRespond ? responded : !responded;
    const record: FocusTrialRecord = { stage: trial.stage, shouldRespond: trial.shouldRespond, responded, responseMs, correct };
    const nextRecords = [...records, record];
    setRecords(nextRecords);
    setStimulusVisible(false);
    setTrial(null);
    if (responded && !trial.shouldRespond) setStatus('멈춤 신호를 만났어요. 다음에는 한 박자 쉬어 볼게요.');
    else if (!responded && trial.shouldRespond) setStatus('다음 신호에서 다시 맞춰 봐요.');
    else setStatus('좋아요. 다음 신호를 준비하세요.');
    if (trialIndex < FOCUS_GAME_TRIALS_PER_STAGE - 1) {
      setTrialIndex(current => current + 1);
      return;
    }
    if (stageIndex < FOCUS_GAME_STAGES.length - 1) {
      setStageIndex(current => current + 1);
      setTrialIndex(0);
      setStatus(`${stageInfo[FOCUS_GAME_STAGES[stageIndex + 1]!].label} 단계로 넘어가요.`);
      return;
    }
    const summary = summarizeFocusGame(nextRecords, falseStarts);
    if (mode === 'baseline') setBefore(summary);
    else setAfter(summary);
    setPhase(mode === 'baseline' ? 'baseline-complete' : 'complete');
    onEvent('fatigue_game_complete', { mode, averageMs: String(summary.speed.averageMs ?? ''), misses: String(summary.speed.total - summary.speed.correct) });
  }

  function startRun(nextMode: GameMode) {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    stopRelaxationAudio();
    setMode(nextMode);
    runPatternRef.current = createRunPattern();
    setStageIndex(0);
    setTrialIndex(0);
    setTrial(null);
    setStimulusVisible(false);
    setRecords([]);
    setFalseStarts(0);
    setStatus('첫 번째 신호를 기다리세요.');
    setPhase('running');
    onEvent('fatigue_game_start', { mode: nextMode });
  }

  function tapStimulus() {
    if (phase !== 'running') return;
    if (!stimulusVisible) {
      setFalseStarts(current => current + 1);
      setStatus('아직 신호가 없어요. 신호가 뜬 뒤 눌러 주세요.');
      onEvent('fatigue_game_false_start', { mode });
      return;
    }
    finishTrial(true);
  }

  function beginRest() {
    setRestReason('baseline');
    setPhase('rest');
    setStatus('');
    onEvent('fatigue_game_rest_start', { duration: '5m' });
    startRelaxationAudio();
  }

  function beginRecoveryRest() {
    setRestReason('recovery');
    setPhase('rest');
    setStatus('');
    onEvent('fatigue_game_rest_start', { duration: '5m', reason: 'low_focus_score' });
    startRelaxationAudio();
  }

  function reset() {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    stopRelaxationAudio();
    setPhase('idle');
    setBefore(null);
    setAfter(null);
    setRecords([]);
    setTrial(null);
    setStimulusVisible(false);
    setRestReason('baseline');
    setAudioMessage('');
    setStatus('');
  }

  const currentStage = stageInfo[FOCUS_GAME_STAGES[stageIndex]!];
  const switchRule = trial?.targetColor ?? runPatternRef.current.switchTargetColors[trialIndex] ?? 'green';
  const comparison = before && after ? comparisonText(before, after) : null;
  const recoveryNeeded = after ? needsFocusRecovery(after) : false;
  const metrics = before && after ? [
    stageMetric('반응 속도', before.speed, after.speed),
    stageMetric('멈춤 억제', before.brake, after.brake),
    stageMetric('규칙 전환', before.switch, after.switch),
  ] : [];

  return (
    <section className="fatigue-game" id="focus-game" aria-labelledby="fatigue-game-heading">
      <div className="fatigue-game-heading">
        <div><p className="fatigue-game-kicker">02 / 나의 집중 리듬 챌린지</p><h2 id="fatigue-game-heading">집중 리듬 챌린지</h2></div>
        <p>누를 때는 빠르게, 멈출 때는 정확하게.<br />규칙이 바뀌면 얼마나 빨리 따라가는지 확인해 보세요.</p>
      </div>

      <div className={`fatigue-game-panel fatigue-game-phase-${phase}`}>
        {phase === 'idle' ? <div className="fatigue-game-intro">
          <div className="fatigue-game-intro-copy"><h3>반응·멈춤·전환을<br />한 번에 게임으로 확인해요.</h3><p>3가지 짧은 과제를 12번 수행합니다. 연구에서 쓰이는 과제 형태를 참고했지만, 결과는 쉬기 전후의 내 집중 리듬을 비교하는 개인 기록이에요.</p>
            <div className="fatigue-stage-preview" aria-label="게임 세 단계"><div><span>01</span><strong>반응</strong><small>신호를 잡기</small></div><div><span>02</span><strong>멈춤</strong><small>빨강을 참기</small></div><div><span>03</span><strong>전환</strong><small>규칙 바꾸기</small></div></div>
            <details className="fatigue-game-method"><summary>왜 이 세 가지인가요?</summary><p>반응 속도, Go/No-Go 억제, 과제 전환은 집중과 인지 조절을 살펴볼 때 자주 사용하는 과제 형태입니다. 화면 지연·기기·수면·주변 환경의 영향을 받으므로 표준화된 진단 점수로 해석하지 않습니다.</p><div><a href="https://pubmed.ncbi.nlm.nih.gov/17850833/" target="_blank" rel="noopener noreferrer">Go/No-Go 연구 예시 <ExternalLink size={14} aria-hidden="true" /></a><a href="https://pubmed.ncbi.nlm.nih.gov/29517261/" target="_blank" rel="noopener noreferrer">과제 전환 리뷰 <ExternalLink size={14} aria-hidden="true" /></a></div></details>
          </div>
          <div className="fatigue-game-intro-side"><FocusJourneyVisual /><div className="fatigue-game-intro-actions"><button type="button" className="rhythm-button" onClick={() => startRun('baseline')}><Brain size={18} aria-hidden="true" /> 게임 시작 <ArrowRight size={18} aria-hidden="true" /></button>{onInvite ? <button type="button" className="rhythm-button secondary" onClick={() => void onInvite()}><ArrowUpRight size={18} aria-hidden="true" /> 친구에게 “너도 해봐” 보내기</button> : null}</div></div>
        </div> : null}

        {phase === 'running' ? <div className="fatigue-game-running">
          <div className="fatigue-game-meta"><span>STAGE {String(stageIndex + 1).padStart(2, '0')} / 03 · {currentStage.label}</span><span><Timer size={15} aria-hidden="true" /> {mode === 'baseline' ? '쉬기 전' : '휴식 후'}</span></div>
          <div className="fatigue-stage-instruction"><strong>{currentStage.instruction}</strong><span>{currentStage.detail}</span></div>
          {FOCUS_GAME_STAGES[stageIndex] === 'switch' ? <div className="fatigue-rule-display"><span>이번 규칙</span><strong className={`fatigue-rule-color fatigue-rule-color-${switchRule}`}>{switchRule === 'green' ? '초록' : '보라'}</strong><small>이 색 신호만 누르기</small></div> : null}
          <div className="fatigue-trial-dots" aria-label={`현재 단계 ${trialIndex + 1}번째 신호`}>{Array.from({length: FOCUS_GAME_TRIALS_PER_STAGE}, (_, index) => <span key={index} className={index < trialIndex ? 'done' : index === trialIndex ? 'current' : ''} />)}</div>
          <button type="button" className={`fatigue-target fatigue-target-${trial?.stimulusColor ?? 'waiting'}${stimulusVisible ? ' visible' : ''}`} onClick={tapStimulus} aria-label={stimulusVisible ? '현재 신호에 반응하기' : '신호를 기다리는 중'}>
            {stimulusVisible ? trial?.stage === 'brake' && trial.stimulusColor === 'red' ? <span className="fatigue-target-stop">멈춤</span> : <span className="fatigue-target-dot" /> : <span className="fatigue-target-wait">·</span>}
          </button>
          <p className="fatigue-game-status" aria-live="polite">{status}</p>
        </div> : null}

        {phase === 'baseline-complete' && before ? <div className="fatigue-game-summary">
          <CheckCircle2 size={28} aria-hidden="true" /><div><p className="fatigue-game-kicker">쉬기 전 기록 완료</p><h3>{summaryLine(before)}</h3><div className="fatigue-mini-metrics"><span>반응 {metricText(before.speed.averageMs)}</span><span>멈춤 {before.brake.accuracyPct}%</span><span>전환 {before.switch.accuracyPct}%</span></div><p>이제 휴대폰 알림을 끄고 물을 마시거나 창밖을 보며 <strong>5분 동안 화면에서 눈을 떼어 보세요.</strong></p><button type="button" className="rhythm-button" onClick={beginRest}>5분 휴식 시작 <ArrowRight size={18} aria-hidden="true" /></button></div>
        </div> : null}

        {phase === 'rest' ? <div className="fatigue-game-rest">
          <p className="fatigue-game-kicker">PAUSE · RESET</p><h3>{restReason === 'recovery' ? '지금은 회복을 먼저 챙길 시간이에요.' : '지금 5분만 화면을 내려놓으세요.'}</h3><p>{restReason === 'recovery' ? '잠깐 멈추고 뇌가 숨을 고를 시간을 주세요. 5분 충전한 뒤 내 기록이 어떻게 달라지는지 다시 살펴봅니다.' : '알림을 끄고, 어깨와 턱의 힘을 풀고, 먼 곳을 바라보세요. 휴식 뒤 같은 게임을 다시 해 내 기록의 차이를 확인합니다.'}</p><ul><li>휴대폰 화면·알림 끄기</li><li>어깨와 턱에 힘 풀기</li><li>조용한 곳에서 천천히 숨 쉬기</li></ul><div className="fatigue-audio-panel" aria-label="휴식 소리 안내"><div><strong><Volume2 size={17} aria-hidden="true" /> 편안한 소리·명상 안내</strong><span>낮은 음량의 배경음과 짧은 음성 안내가 재생됩니다.</span></div><div className="fatigue-audio-actions">{audioPlaying ? <button type="button" className="fatigue-audio-button" onClick={toggleRelaxationPause}>{audioPaused ? <><Play size={15} aria-hidden="true" /> 소리 다시 재생</> : <><Pause size={15} aria-hidden="true" /> 소리 잠시 멈추기</>}</button> : <button type="button" className="fatigue-audio-button" onClick={startRelaxationAudio}><Volume2 size={15} aria-hidden="true" /> 편안한 소리 재생</button>}{audioPlaying ? <button type="button" className="fatigue-audio-mute" onClick={stopRelaxationAudio}><VolumeX size={15} aria-hidden="true" /> 끄기</button> : null}</div>{audioMessage ? <p role="status" aria-live="polite">{audioMessage}</p> : null}</div><button type="button" className="rhythm-button" onClick={() => startRun('after')}>휴식했어요 · 다시 측정 <ArrowRight size={18} aria-hidden="true" /></button>
        </div> : null}

        {phase === 'complete' && before && after && comparison ? <div className="fatigue-game-summary fatigue-game-complete">
          <div className={`fatigue-comparison fatigue-comparison-${comparison.tone}`}><CircleAlert size={24} aria-hidden="true" /><div><p className="fatigue-game-kicker">쉬기 전 ↔ 휴식 후</p><h3>{comparison.heading}</h3><p>{comparison.body}</p></div></div>
          <div className="fatigue-game-score-grid">{metrics.map(metric => <div key={metric.label}><span>{metric.label}</span><strong>전 {metric.before}</strong><strong>후 {metric.after}</strong></div>)}</div>
          {recoveryNeeded ? <div className="fatigue-recovery-prompt" role="status"><div><p className="fatigue-game-kicker">회복 리듬 안내 · 현재 정확도 {after.accuracyPct}%</p><h3>5분 충전하면 내 기록이 어떻게 달라질까요?</h3><p>오늘 컨디션과 화면 환경을 비춰보는 개인 기록이에요. 잠깐 쉬고 다시 확인하면 나에게 맞는 회복 타이밍을 찾을 수 있습니다.</p></div><button type="button" className="rhythm-button" onClick={beginRecoveryRest}>5분 충전하고 다시 확인 <ArrowRight size={18} aria-hidden="true" /></button></div> : null}
          <p className="fatigue-game-viral-copy">내 기록은 어땠나요? 친구에게 “너도 해봐”라고 뇌 피로 테스트를 보내 보세요.</p>
          <div className="fatigue-game-actions">{onInvite ? <button type="button" className="rhythm-button secondary" onClick={() => void onInvite()}><ArrowUpRight size={18} aria-hidden="true" /> 친구에게 “너도 해봐” · 뇌 피로 테스트 공유</button> : null}<button type="button" className="rhythm-button" onClick={() => startRun('baseline')}>다시 비교하기 <RotateCcw size={18} aria-hidden="true" /></button><button type="button" className="rhythm-text-button" onClick={reset}>게임 닫기</button></div>
        </div> : null}
      </div>
      <p className="fatigue-game-note">이 게임은 의학적 진단·뇌 기능 측정·체내 GABA 측정이 아닙니다. 한 번의 결과보다 쉬기 전후의 개인 변화와 최근 생활 신호를 함께 살펴보세요.</p>
    </section>
  );
}
