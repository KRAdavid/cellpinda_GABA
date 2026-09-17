import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Brain, CheckCircle2, CircleAlert, ExternalLink, Pause, Play, RotateCcw, Timer, Volume2, VolumeX } from 'lucide-react';
import {
  compareFocusGames,
  FOCUS_GAME_STAGES,
  FOCUS_GAME_TRIALS_PER_STAGE,
  needsFocusRecovery,
  summarizeFocusGame,
  type FocusGameStage,
  type FocusGameSummary,
  type FocusTrialRecord,
} from '../domain/fatigue-game';
import './fatigue-game.css';

type GamePhase = 'idle' | 'running' | 'baseline-complete' | 'baseline-finished' | 'rest' | 'complete';
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
  const audioPausedRef = useRef(false);
  const [audioMessage, setAudioMessage] = useState('');
  const [restRemainingSeconds, setRestRemainingSeconds] = useState(5 * 60);
  const [restComplete, setRestComplete] = useState(false);
  const [status, setStatus] = useState('');
  const timerRef = useRef<number | null>(null);
  const stimulusAtRef = useRef(0);
  const runPatternRef = useRef<RunPattern>(createRunPattern());
  const audioRef = useRef<RelaxationAudio | null>(null);
  const audioPromptTimersRef = useRef<number[]>([]);
  const restClockIntervalRef = useRef<number | null>(null);
  const restEndsAtRef = useRef<number | null>(null);
  const autoStartedRef = useRef(false);

  function stopRelaxationAudio() {
    audioPromptTimersRef.current.forEach(timer => window.clearTimeout(timer));
    audioPromptTimersRef.current = [];
    const audio = audioRef.current;
    if (audio) {
      audio.oscillators.forEach(oscillator => {
        try { oscillator.stop(); } catch { /* already stopped */ }
      });
      void audio.context.close();
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    audioPausedRef.current = false;
    setAudioPlaying(false);
    setAudioPaused(false);
  }

  function speakRelaxationLine(text: string) {
    if (!('speechSynthesis' in window)) {
      setAudioMessage('이 브라우저는 음성 안내를 지원하지 않아요. 조용한 휴식만 이어가도 괜찮아요.');
      return;
    }
    const narration = new SpeechSynthesisUtterance(text);
    narration.lang = 'ko-KR';
    narration.rate = 0.82;
    narration.pitch = 1;
    narration.volume = 0.72;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(narration);
  }

  function speakRelaxationNarration() {
    if (!('speechSynthesis' in window)) {
      setAudioMessage('이 브라우저는 음성 안내를 지원하지 않아요. 조용한 휴식만 이어가도 괜찮아요.');
      return;
    }
    speakRelaxationLine('휴대폰을 뒤집어 두고 편안히 앉아 보세요. 허리는 편하게 세우고 어깨 힘을 풉니다. 숨을 일부러 깊게 바꾸지 말고, 코끝이나 가슴 또는 배에서 느껴지는 숨의 감각을 따라가 보세요. 생각이 떠오르면 밀어내지 않아도 괜찮아요. 생각이 났다는 걸 알아차리고 다시 숨으로 돌아오면 됩니다.');
    const checkpoints = [
      { afterMs: 90_000, text: '숨을 바꾸려 하지 말고, 들어오고 나가는 감각을 가만히 살펴보세요.' },
      { afterMs: 180_000, text: '생각이 떠올라도 괜찮습니다. 알아차린 뒤 숨이 느껴지는 곳으로 부드럽게 돌아옵니다.' },
      { afterMs: 270_000, text: '마지막 30초입니다. 편안한 자세로 숨과 몸이 닿아 있는 감각을 살펴보세요.' },
    ];
    audioPromptTimersRef.current = checkpoints.map(({ afterMs, text }) => window.setTimeout(() => {
      if (!audioPausedRef.current) speakRelaxationLine(text);
    }, afterMs));
  }

  function stopRestClock() {
    if (restClockIntervalRef.current !== null) {
      window.clearInterval(restClockIntervalRef.current);
      restClockIntervalRef.current = null;
    }
    restEndsAtRef.current = null;
  }

  function startRestClock() {
    stopRestClock();
    setRestComplete(false);
    setRestRemainingSeconds(5 * 60);
    restEndsAtRef.current = Date.now() + 5 * 60 * 1000;
    restClockIntervalRef.current = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil(((restEndsAtRef.current ?? Date.now()) - Date.now()) / 1000));
      setRestRemainingSeconds(remaining);
      if (remaining === 0) {
        stopRestClock();
        stopRelaxationAudio();
        setRestComplete(true);
        setAudioMessage('5분 휴식이 끝났어요. 준비되면 내 기록을 다시 확인해 보세요.');
        onEvent('fatigue_game_rest_complete', { duration: '5m' });
      }
    }, 1000);
  }

  function startRelaxationAudio() {
    if (restComplete) {
      setAudioMessage('5분 휴식이 끝났어요. 준비되면 내 기록을 다시 확인해 보세요.');
      return;
    }
    if (audioRef.current) {
      void audioRef.current.context.resume();
      if ('speechSynthesis' in window) window.speechSynthesis.resume();
      audioPausedRef.current = false;
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
      audioPausedRef.current = false;
      setAudioPaused(false);
      setAudioMessage('소리를 다시 재생하고 있어요.');
    } else {
      void audio.context.suspend();
      if ('speechSynthesis' in window) window.speechSynthesis.pause();
      audioPausedRef.current = true;
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
    stopRestClock();
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
    stopRestClock();
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
    startRestClock();
    onEvent('fatigue_game_rest_start', { duration: '5m' });
    startRelaxationAudio();
  }

  function beginRecoveryRest() {
    setRestReason('recovery');
    setPhase('rest');
    setStatus('');
    startRestClock();
    onEvent('fatigue_game_rest_start', { duration: '5m', reason: 'low_focus_score' });
    startRelaxationAudio();
  }

  function finishBaseline() {
    setPhase('baseline-finished');
    setStatus('');
  }

  function reset() {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    stopRestClock();
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
          <CheckCircle2 size={28} aria-hidden="true" /><div><p className="fatigue-game-kicker">쉬기 전 기록 완료</p><h3>{summaryLine(before)}</h3><div className="fatigue-mini-metrics"><span>반응 {metricText(before.speed.averageMs)}</span><span>멈춤 {before.brake.accuracyPct}%</span><span>전환 {before.switch.accuracyPct}%</span></div>{needsFocusRecovery(before) ? <><p className="fatigue-baseline-guidance fatigue-baseline-guidance-rest"><strong>오늘은 신호를 놓친 순간이 있었어요.</strong><br />주변 환경과 기기의 영향도 받을 수 있지만, 바로 이어가기보다 알림을 끄고 5분 쉬어 보세요. 쉬고 난 뒤 다시 확인하면 오늘 기록을 비교할 수 있어요.</p><button type="button" className="rhythm-button" onClick={beginRest}>5분 쉬고 다시 확인하기 <ArrowRight size={18} aria-hidden="true" /></button><button type="button" className="rhythm-text-button" onClick={finishBaseline}>오늘 기록만 보고 마치기</button></> : <><p className="fatigue-baseline-guidance fatigue-baseline-guidance-good"><strong>오늘은 신호를 차분히 잘 따라왔어요.</strong><br />정확도가 {before.accuracyPct}%로 잘 나왔습니다. 지금 기록으로 마쳐도 좋고, 원하면 5분 쉰 뒤 한 번 더 해 전후 기록을 비교할 수 있어요.</p><button type="button" className="rhythm-button" onClick={finishBaseline}>오늘 기록 마치기 <CheckCircle2 size={18} aria-hidden="true" /></button><button type="button" className="rhythm-button secondary" onClick={beginRest}>5분 쉬고 전후 비교하기 <ArrowRight size={18} aria-hidden="true" /></button></>}</div>
        </div> : null}

        {phase === 'baseline-finished' && before ? <div className="fatigue-game-summary fatigue-game-baseline-finished">
          <CheckCircle2 size={28} aria-hidden="true" /><div><p className="fatigue-game-kicker">오늘의 집중 리듬 기록</p><h3>{needsFocusRecovery(before) ? '오늘 기록을 남겼어요.' : '오늘은 신호를 차분히 잘 따라왔어요.'}</h3><div className="fatigue-mini-metrics"><span>정확도 {before.accuracyPct}%</span><span>반응 {metricText(before.speed.averageMs)}</span><span>멈춤 {before.brake.accuracyPct}%</span><span>전환 {before.switch.accuracyPct}%</span></div><p>{needsFocusRecovery(before) ? '점수로 건강 상태를 단정할 수는 없어요. 오늘은 화면과 일을 잠깐 내려놓고 쉬어 보세요.' : '이 결과는 오늘 이 기기에서 진행한 개인 기록이에요. 기록을 남기고 여기서 마쳐도 괜찮습니다.'}</p><div className="fatigue-game-actions">{onInvite ? <button type="button" className="rhythm-button secondary" onClick={() => void onInvite()}><ArrowUpRight size={18} aria-hidden="true" /> 친구에게 “너도 해봐” 보내기</button> : null}<button type="button" className="rhythm-button" onClick={() => startRun('baseline')}>다시 해보기 <RotateCcw size={18} aria-hidden="true" /></button><button type="button" className="rhythm-text-button" onClick={reset}>게임 닫기</button></div></div>
        </div> : null}

        {phase === 'rest' ? <div className="fatigue-game-rest">
          <p className="fatigue-game-kicker">PAUSE · 5-MIN BREATH</p>
          <h3>{restReason === 'recovery' ? '지금 5분, 화면을 내려놓고 숨을 살펴보세요.' : '지금 5분만 화면을 내려놓으세요.'}</h3>
          <p>휴대폰을 뒤집어 두고 편안히 앉아 보세요. 숨을 억지로 조절하지 않고 느껴보고, 생각이 떠오르면 알아차린 뒤 다시 숨으로 돌아옵니다.</p>
          <div className="fatigue-rest-clock" aria-label="5분 숨 관찰 타이머">
            <div className="fatigue-rest-clock-readout" role="timer" aria-label={`${Math.floor(restRemainingSeconds / 60)}분 ${restRemainingSeconds % 60}초 남음`}>
              <Timer size={20} aria-hidden="true" />
              <strong>{Math.floor(restRemainingSeconds / 60)}:{String(restRemainingSeconds % 60).padStart(2, '0')}</strong>
              <span>{restComplete ? '휴식 완료' : '화면을 내려놓고 편하게 이어가세요'}</span>
            </div>
            <progress max={5 * 60} value={5 * 60 - restRemainingSeconds} aria-label="5분 휴식 진행" />
          </div>
          <ol className="fatigue-breath-steps" aria-label="5분 숨 관찰 순서">
            <li><span>01 · 자세</span><strong>어깨 힘을 툭 빼요</strong><small>허리는 편하게 세워 앉아요</small></li>
            <li><span>02 · 숨</span><strong>숨의 감각을 느껴요</strong><small>코끝·가슴·배 중 편한 곳에 주의를 둬요</small></li>
            <li><span>03 · 알아차림</span><strong>생각은 지나가게 둬요</strong><small>생각이 났다는 걸 알아차리면 돼요</small></li>
            <li><span>04 · 돌아오기</span><strong>다시 숨으로 돌아와요</strong><small>숨이 드나드는 감각을 편하게 따라가요</small></li>
          </ol>
          <p className="fatigue-breath-note">깊게 쉬거나 숨을 세지 않아도 됩니다. 불편하면 눈을 뜨고 자세를 바꾸세요.</p>
          <div className="fatigue-audio-panel" aria-label="5분 숨 관찰 음성 안내">
            <div><strong><Volume2 size={17} aria-hidden="true" /> 5분 숨 관찰 안내</strong><span>시작·중간·마지막에 짧게 안내하고 나머지는 편안한 배경음이 이어집니다.</span></div>
            <div className="fatigue-audio-actions">{audioPlaying ? <button type="button" className="fatigue-audio-button" onClick={toggleRelaxationPause}>{audioPaused ? <><Play size={15} aria-hidden="true" /> 소리 다시 재생</> : <><Pause size={15} aria-hidden="true" /> 소리 잠시 멈추기</>}</button> : <button type="button" className="fatigue-audio-button" onClick={startRelaxationAudio} disabled={restComplete}><Volume2 size={15} aria-hidden="true" /> 안내 다시 듣기</button>}{audioPlaying ? <button type="button" className="fatigue-audio-mute" onClick={stopRelaxationAudio}><VolumeX size={15} aria-hidden="true" /> 끄기</button> : null}</div>
            {audioMessage ? <p role="status" aria-live="polite">{audioMessage}</p> : null}
          </div>
          <button type="button" className="rhythm-button" onClick={() => startRun('after')} disabled={!restComplete}>휴식했어요 · 다시 측정 <ArrowRight size={18} aria-hidden="true" /></button>
          {!restComplete ? <div className="fatigue-rest-unlock-note"><p>5분이 지나면 쉬기 전 기록과 비교할 수 있어요.</p><button type="button" className="rhythm-text-button" onClick={() => startRun('after')}>휴식 건너뛰고 바로 다시 측정</button></div> : null}
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
