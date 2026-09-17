import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Brain, CheckCircle2, CircleAlert, ExternalLink, RotateCcw, Timer, Volume2, VolumeX } from 'lucide-react';
import {
  compareFocusGames,
  createFocusRunPattern,
  FOCUS_GAME_STAGES,
  FOCUS_GAME_TRIALS_PER_STAGE,
  FOCUS_GAME_TOTAL_TRIALS,
  needsFocusRecovery,
  summarizeFocusGame,
  type FocusRunPattern,
  type FocusGameStage,
  type FocusGameSummary,
  type FocusStimulusColor,
  type FocusStimulusShape,
  type FocusTrialPlan,
  type FocusTrialRecord,
} from '../domain/fatigue-game';
import { BREATH_ACTIVE_SECONDS, BREATH_CYCLE_SECONDS, getBreathCue, type BreathCue, type BreathStage } from '../domain/breath-guide';
import './fatigue-game.css';

type GamePhase = 'idle' | 'countdown' | 'running' | 'baseline-complete' | 'baseline-finished' | 'rest' | 'complete';
type GameMode = 'baseline' | 'after';
type Trial = FocusTrialPlan;
type RunPattern = FocusRunPattern;

const shapeLabels: Record<FocusStimulusShape, string> = {
  circle: '동그라미',
  diamond: '마름모',
  ring: '테두리 원',
  triangle: '세모',
};

const breathStageCopy: Record<BreathStage, { title: string; detail: string }> = {
  inhale: { title: '숨 들이쉬기', detail: '공이 올라가는 동안 · 4초' },
  'hold-top': { title: '잠깐 멈추기', detail: '공이 위에 머무는 동안 · 2초' },
  exhale: { title: '숨 내쉬기', detail: '공이 내려가는 동안 · 6초' },
  'hold-bottom': { title: '다시 멈추기', detail: '공이 아래에 머무는 동안 · 2초' },
  finish: { title: '편한 호흡으로 마무리', detail: '숨을 세지 말고 자연스럽게 돌아오세요' },
};

interface FatigueGameProps {
  onEvent: (name: string, properties?: Record<string, string>) => void;
  onInvite?: () => void | Promise<void>;
  startOnMount?: boolean;
}

interface RelaxationAudio {
  context: AudioContext;
}

type FocusSoundCue = 'start' | 'countdown' | 'go' | 'signal' | 'correct' | 'miss' | 'false-start' | 'stage' | 'complete';

function createRelaxationAudio(): RelaxationAudio | null {
  const AudioContextCtor = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return null;
  try {
    return { context: new AudioContextCtor() };
  } catch {
    return null;
  }
}

function ringSingingBowl(context: AudioContext) {
  const play = () => {
    if (context.state !== 'running') return;
    const startedAt = context.currentTime + 0.025;
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, startedAt);
    master.gain.exponentialRampToValueAtTime(0.14, startedAt + 0.025);
    master.gain.exponentialRampToValueAtTime(0.0001, startedAt + 1.65);
    master.connect(context.destination);

    const partials = [[220, 0.28], [440.6, 0.13], [661.8, 0.075], [883.1, 0.045], [1105.7, 0.025]] as const;
    partials.forEach(([frequency, level]) => {
      const oscillator = context.createOscillator();
      const voice = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      voice.gain.value = level;
      oscillator.connect(voice);
      voice.connect(master);
      oscillator.onended = () => {
        oscillator.disconnect();
        voice.disconnect();
      };
      oscillator.start(startedAt);
      oscillator.stop(startedAt + 1.7);
    });
    window.setTimeout(() => master.disconnect(), 1_800);
  };

  if (context.state === 'running') play();
  else void context.resume().then(play).catch(() => undefined);
}

function playFocusSoundCue(context: AudioContext, cue: FocusSoundCue) {
  if (context.state !== 'running') return;
  const patterns: Record<FocusSoundCue, { notes: readonly number[]; duration: number; spacing: number; level: number }> = {
    start: { notes: [440, 587], duration: 0.12, spacing: 0.09, level: 0.035 },
    countdown: { notes: [523], duration: 0.075, spacing: 0, level: 0.024 },
    go: { notes: [587, 784], duration: 0.14, spacing: 0.08, level: 0.04 },
    signal: { notes: [740], duration: 0.055, spacing: 0, level: 0.018 },
    correct: { notes: [659, 880], duration: 0.095, spacing: 0.055, level: 0.027 },
    miss: { notes: [330], duration: 0.12, spacing: 0, level: 0.02 },
    'false-start': { notes: [294], duration: 0.1, spacing: 0, level: 0.018 },
    stage: { notes: [523, 659, 784], duration: 0.1, spacing: 0.065, level: 0.03 },
    complete: { notes: [523, 659, 784, 988], duration: 0.13, spacing: 0.075, level: 0.035 },
  };
  const pattern = patterns[cue];
  const startedAt = context.currentTime + 0.012;
  pattern.notes.forEach((frequency, index) => {
    const noteAt = startedAt + pattern.spacing * index;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, noteAt);
    envelope.gain.setValueAtTime(0.0001, noteAt);
    envelope.gain.exponentialRampToValueAtTime(pattern.level, noteAt + 0.012);
    envelope.gain.exponentialRampToValueAtTime(0.0001, noteAt + pattern.duration);
    oscillator.connect(envelope);
    envelope.connect(context.destination);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
    };
    oscillator.start(noteAt);
    oscillator.stop(noteAt + pattern.duration + 0.015);
  });
}

const stageInfo: Record<FocusGameStage, { label: string; instruction: string; detail: string }> = {
  speed: { label: '반응 속도', instruction: '신호가 나타나면 바로 눌러요', detail: '색과 모양이 순서 없이 바뀝니다' },
  brake: { label: '멈춤 신호', instruction: '초록은 누르고 빨강은 참아요', detail: '8개 중 3개는 눌러서는 안 되는 신호예요' },
  switch: { label: '규칙 전환', instruction: '위 기준색과 같은 신호만 눌러요', detail: '모양은 무시하고, 바뀌는 색 규칙만 따라요' },
};

function trialPrompt(trial: Trial): string {
  const color = (value: FocusStimulusColor) => value === 'green' ? '초록' : value === 'purple' ? '보라' : '빨강';
  if (trial.stage === 'speed') return `${shapeLabels[trial.stimulusShape]} ${color(trial.stimulusColor)} 신호 · 바로 누르기`;
  if (trial.stage === 'brake') return trial.shouldRespond ? '초록 신호 · 누르기' : '빨강 신호 · 누르지 않기';
  return `기준 ${color(trial.targetColor)} · 신호 ${color(trial.stimulusColor)} · ${trial.shouldRespond ? '누르기' : '누르지 않기'}`;
}

function createTrial(stageIndex: number, trialIndex: number, pattern: RunPattern): Trial {
  const stage = FOCUS_GAME_STAGES[stageIndex]!;
  return pattern.trials[stage][trialIndex]!;
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
    <div className="fatigue-journey-visual" role="img" aria-label="반응, 멈춤, 전환 세 단계를 거치는 1분 뇌컨디션 확인 챌린지">
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

function BreathLineGuide({ startedAt, cue }: { startedAt: number | null; cue: BreathCue }) {
  const pathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const activePath = activePathRef.current;
    const ball = ballRef.current;
    if (!path || !activePath || !ball || startedAt === null) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const totalLength = path.getTotalLength();
    const halfLength = totalLength / 2;
    let frame = 0;

    const draw = () => {
      const elapsed = Math.max(0, (Date.now() - startedAt) / 1000);
      const cycle = elapsed >= BREATH_ACTIVE_SECONDS ? 0 : elapsed % BREATH_CYCLE_SECONDS;
      let distance = 0;
      if (cycle < 4) distance = halfLength * (cycle / 4);
      else if (cycle < 6) distance = halfLength;
      else if (cycle < 12) distance = halfLength + halfLength * ((cycle - 6) / 6);
      else distance = totalLength;

      const point = path.getPointAtLength(distance);
      ball.setAttribute('transform', `translate(${point.x} ${point.y})`);
      activePath.style.strokeDasharray = `${(distance / totalLength) * 100} 100`;

      if (!reducedMotion && elapsed < BREATH_ACTIVE_SECONDS) frame = window.requestAnimationFrame(draw);
    };

    draw();
    return () => window.cancelAnimationFrame(frame);
  }, [startedAt]);

  const stageIndex: Record<BreathStage, number> = { inhale: 0, 'hold-top': 1, exhale: 2, 'hold-bottom': 3, finish: 3 };
  const stars = [[52, 60], [142, 118], [228, 34], [324, 138], [404, 40], [546, 116], [650, 45], [724, 128], [836, 46], [916, 100], [90, 245], [246, 296], [390, 256], [588, 296], [770, 260], [884, 312]];

  return (
    <div className="fatigue-breath-guide" aria-label="공의 움직임을 따라 하는 4초 들이쉬기, 2초 멈추기, 6초 내쉬기, 2초 멈추기 호흡 안내">
      <div className="fatigue-breath-readout" role="timer" aria-label={`${breathStageCopy[cue.stage].title}, ${cue.seconds}초`}>
        <span>{breathStageCopy[cue.stage].detail}</span>
        <strong aria-live="polite" aria-atomic="true">{breathStageCopy[cue.stage].title}</strong>
        {cue.stage !== 'finish' ? <b>{cue.seconds}</b> : null}
      </div>
      <svg className="fatigue-breath-line" viewBox="0 0 960 360" role="img" aria-label="공이 선을 따라 위로 올라갔다가 아래로 내려오는 애니메이션">
        <defs>
          <linearGradient id="breath-line-gradient" x1="0" x2="1">
            <stop offset="0" stopColor="#f3bc70" />
            <stop offset=".52" stopColor="#fff4c5" />
            <stop offset="1" stopColor="#f3bc70" />
          </linearGradient>
          <filter id="breath-ball-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect width="960" height="360" rx="18" fill="#080b0a" />
        {stars.map(([x, y], index) => <circle key={index} cx={x} cy={y} r={index % 3 === 0 ? 1.7 : 1.2} fill="#d7ded9" opacity={index % 2 === 0 ? '.48' : '.24'} />)}
        <path d="M480 300 C310 300 300 75 480 75 C660 75 650 300 480 300" fill="none" stroke="#77827b" strokeOpacity=".45" strokeWidth="4" strokeLinecap="round" />
        <path ref={pathRef} d="M480 300 C310 300 300 75 480 75 C660 75 650 300 480 300" fill="none" stroke="transparent" strokeWidth="1" />
        <path ref={activePathRef} d="M480 300 C310 300 300 75 480 75 C660 75 650 300 480 300" pathLength="100" fill="none" stroke="url(#breath-line-gradient)" strokeWidth="5" strokeLinecap="round" filter="url(#breath-ball-glow)" />
        <g ref={ballRef} className="fatigue-breath-ball" aria-hidden="true">
          <circle r="15" fill="#fff" filter="url(#breath-ball-glow)" />
          <circle r="5" fill="#fff" />
        </g>
        <text x="480" y="335" textAnchor="middle" className="fatigue-breath-svg-label">{cue.stage === 'finish' ? '천천히 원래 호흡으로' : `${stageIndex[cue.stage] + 1} / 4`}</text>
      </svg>
      <ol className="fatigue-breath-phases" aria-label="호흡 순서">
        {(['inhale', 'hold-top', 'exhale', 'hold-bottom'] as const).map((stage, index) => (
          <li key={stage} className={cue.stage === stage ? 'is-active' : ''} aria-current={cue.stage === stage ? 'step' : undefined}>
            <span>0{index + 1}</span><strong>{breathStageCopy[stage].title}</strong><small>{[4, 2, 6, 2][index]}초</small>
          </li>
        ))}
      </ol>
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
  const [readyCountdown, setReadyCountdown] = useState(3);
  const [bowlSoundEnabled, setBowlSoundEnabled] = useState(true);
  const [audioMessage, setAudioMessage] = useState('');
  const [restRemainingSeconds, setRestRemainingSeconds] = useState(5 * 60);
  const [restComplete, setRestComplete] = useState(false);
  const [restStartedAt, setRestStartedAt] = useState<number | null>(null);
  const [breathCue, setBreathCue] = useState<BreathCue>({ stage: 'inhale', seconds: 4 });
  const [status, setStatus] = useState('');
  const [gameSoundEnabled, setGameSoundEnabled] = useState(true);
  const [gameSoundStatus, setGameSoundStatus] = useState('');
  const timerRef = useRef<number | null>(null);
  const stimulusAtRef = useRef(0);
  const runPatternRef = useRef<RunPattern>(createFocusRunPattern());
  const audioRef = useRef<RelaxationAudio | null>(null);
  const lastBowlStageRef = useRef<BreathStage | null>(null);
  const restClockIntervalRef = useRef<number | null>(null);
  const restEndsAtRef = useRef<number | null>(null);
  const autoStartedRef = useRef(false);
  const countdownAudioRunRef = useRef(0);
  const runSequenceRef = useRef(0);

  function playGameCue(cue: FocusSoundCue) {
    if (!gameSoundEnabled) return;
    const audio = audioRef.current ?? createRelaxationAudio();
    if (!audio) {
      setGameSoundEnabled(false);
      setGameSoundStatus('이 기기에서는 효과음을 재생할 수 없어 화면 신호로 계속 진행합니다.');
      return;
    }
    audioRef.current = audio;
    const play = () => {
      if (gameSoundEnabled) playFocusSoundCue(audio.context, cue);
    };
    if (audio.context.state === 'running') play();
    else void audio.context.resume().then(play).catch(() => undefined);
  }

  function toggleGameSound() {
    if (gameSoundEnabled) {
      setGameSoundEnabled(false);
      setGameSoundStatus('게임 효과음을 껐어요.');
      return;
    }
    const audio = audioRef.current ?? createRelaxationAudio();
    if (!audio) {
      setGameSoundStatus('이 기기에서는 효과음을 재생할 수 없어요.');
      return;
    }
    audioRef.current = audio;
    setGameSoundEnabled(true);
    setGameSoundStatus('신호와 응답 순간에 효과음이 재생됩니다.');
    void audio.context.resume().catch(() => setGameSoundStatus('효과음을 시작하지 못했어요. 다시 눌러 주세요.'));
  }

  function stopRelaxationAudio() {
    const audio = audioRef.current;
    if (audio) {
      void audio.context.close().catch(() => undefined);
      audioRef.current = null;
    }
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
    const startedAt = Date.now();
    setRestComplete(false);
    setRestRemainingSeconds(5 * 60);
    setRestStartedAt(startedAt);
    setBreathCue({ stage: 'inhale', seconds: 4 });
    restEndsAtRef.current = startedAt + 5 * 60 * 1000;
    restClockIntervalRef.current = window.setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil(((restEndsAtRef.current ?? now) - now) / 1000));
      setRestRemainingSeconds(remaining);
      const nextCue = getBreathCue(now - startedAt);
      setBreathCue(current => current.stage === nextCue.stage && current.seconds === nextCue.seconds ? current : nextCue);
      if (remaining === 0) {
        stopRestClock();
        stopRelaxationAudio();
        setRestComplete(true);
        setAudioMessage('5분 휴식이 끝났어요. 준비되면 내 기록을 다시 확인해 보세요.');
      }
    }, 250);
  }

  function startSingingBowlAudio() {
    if (!bowlSoundEnabled) return;
    const audio = audioRef.current ?? createRelaxationAudio();
    if (!audio) {
      setBowlSoundEnabled(false);
      setAudioMessage('이 기기에서는 싱잉볼 소리를 재생할 수 없어요. 화면의 호흡 안내를 따라가세요.');
      return;
    }
    audioRef.current = audio;
    setAudioMessage('호흡 단계가 바뀔 때마다 싱잉볼이 짧게 울려요.');
    void audio.context.resume().catch(() => setAudioMessage('소리를 재생하지 못했어요. 아래 버튼을 눌러 다시 켜 보세요.'));
  }

  function toggleSingingBowlAudio() {
    if (bowlSoundEnabled) {
      setBowlSoundEnabled(false);
      setAudioMessage('싱잉볼 소리를 껐어요.');
      return;
    }
    const audio = audioRef.current ?? createRelaxationAudio();
    if (!audio) {
      setAudioMessage('이 기기에서는 싱잉볼 소리를 재생할 수 없어요.');
      return;
    }
    audioRef.current = audio;
    setBowlSoundEnabled(true);
    setAudioMessage('호흡 단계가 바뀔 때마다 싱잉볼이 짧게 울려요.');
    void audio.context.resume().catch(() => setAudioMessage('소리를 재생하지 못했어요.'));
  }

  useEffect(() => {
    if (!startOnMount || autoStartedRef.current) return;
    const timer = window.setTimeout(() => {
      autoStartedRef.current = true;
      document.getElementById('focus-game')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      startRun('baseline');
    }, 320);
    return () => window.clearTimeout(timer);
  }, [startOnMount]);

  useEffect(() => {
    if (phase !== 'countdown') return;
    const runId = runSequenceRef.current;
    if (countdownAudioRunRef.current !== runId) {
      countdownAudioRunRef.current = runId;
      playGameCue('countdown');
    }
    const startedAt = performance.now();
    let previousRemaining = 3;
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, 3 - Math.floor((performance.now() - startedAt) / 1000));
      setReadyCountdown(remaining);
      if (remaining !== previousRemaining) {
        previousRemaining = remaining;
        if (remaining > 0) playGameCue('countdown');
      }
      if (remaining === 0) {
        window.clearInterval(timer);
        playGameCue('go');
        setStatus('첫 번째 신호를 기다리세요.');
        setPhase('running');
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'rest') {
      lastBowlStageRef.current = null;
      return;
    }
    if (breathCue.stage === 'finish' || lastBowlStageRef.current === breathCue.stage) return;
    lastBowlStageRef.current = breathCue.stage;
    if (bowlSoundEnabled && audioRef.current) ringSingingBowl(audioRef.current.context);
  }, [phase, breathCue.stage, bowlSoundEnabled]);

  useEffect(() => {
    if (phase !== 'running') return;
    if (!stimulusVisible) {
      const nextTrial = createTrial(stageIndex, trialIndex, runPatternRef.current);
      timerRef.current = window.setTimeout(() => {
        setTrial(nextTrial);
        stimulusAtRef.current = performance.now();
        setStimulusVisible(true);
        setStatus(trialPrompt(nextTrial));
        playGameCue('signal');
      }, nextTrial.foreperiodMs);
    } else {
      timerRef.current = window.setTimeout(() => finishTrial(false), trial?.responseWindowMs ?? 1_200);
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
    playGameCue(correct ? 'correct' : 'miss');
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
      playGameCue('stage');
      setStageIndex(current => current + 1);
      setTrialIndex(0);
      setStatus(`${stageInfo[FOCUS_GAME_STAGES[stageIndex + 1]!].label} 단계로 넘어가요.`);
      return;
    }
    const summary = summarizeFocusGame(nextRecords, falseStarts);
    if (mode === 'baseline') setBefore(summary);
    else setAfter(summary);
    playGameCue('complete');
    setPhase(mode === 'baseline' ? 'baseline-complete' : 'complete');
    onEvent('fatigue_game_complete', { mode, averageMs: String(summary.speed.averageMs ?? ''), misses: String(summary.speed.total - summary.speed.correct) });
  }

  function startRun(nextMode: GameMode) {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    stopRestClock();
    stopRelaxationAudio();
    runSequenceRef.current += 1;
    setMode(nextMode);
    runPatternRef.current = createFocusRunPattern(Math.random, runPatternRef.current.signature);
    setStageIndex(0);
    setTrialIndex(0);
    setTrial(null);
    setStimulusVisible(false);
    setRecords([]);
    setFalseStarts(0);
    setReadyCountdown(3);
    setStatus('');
    setPhase('countdown');
    playGameCue('start');
    onEvent('fatigue_game_start', { mode: nextMode });
  }

  function tapStimulus() {
    if (phase !== 'running') return;
    if (!stimulusVisible) {
      setFalseStarts(current => current + 1);
      playGameCue('false-start');
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
    startSingingBowlAudio();
  }

  function beginRecoveryRest() {
    setRestReason('recovery');
    setPhase('rest');
    setStatus('');
    startRestClock();
    onEvent('fatigue_game_rest_start', { duration: '5m', reason: 'low_focus_score' });
    startSingingBowlAudio();
  }

  function finishBaseline() {
    setPhase('baseline-finished');
    setStatus('');
  }

  function reset() {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    stopRestClock();
    stopRelaxationAudio();
    setRestStartedAt(null);
    setBreathCue({ stage: 'inhale', seconds: 4 });
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
  const switchRule = trial?.targetColor ?? runPatternRef.current.trials.switch[trialIndex]?.targetColor ?? 'green';
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
        <div><p className="fatigue-game-kicker">02 / 나의 뇌컨디션 확인 챌린지</p><h2 id="fatigue-game-heading">뇌컨디션 확인 챌린지</h2></div>
        <p>누를 때는 빠르게, 멈출 때는 정확하게.<br />규칙이 바뀌면 얼마나 빨리 따라가는지 확인해 보세요.</p>
      </div>

      <div className={`fatigue-game-panel fatigue-game-phase-${phase}`}>
        {phase === 'idle' ? <div className="fatigue-game-intro">
          <div className="fatigue-game-intro-copy"><h3>반응·멈춤·전환을<br />한 번에 게임으로 확인해요.</h3><p>3단계, 신호 {FOCUS_GAME_TOTAL_TRIALS}개에 도전해요. 색·모양·규칙·신호 간격은 매번 무작위로 달라집니다. 쉬기 전과 후에는 다른 문제가 나오지만, 단계별 문항 수와 제한 시간은 같아 기록을 비교할 수 있어요.</p>
            <div className="fatigue-stage-preview" aria-label="점점 어려워지는 게임 세 단계"><div><span>01</span><strong>반응</strong><small>색·모양 바뀜 · 8개</small></div><div><span>02</span><strong>멈춤</strong><small>빨강 3개는 참기</small></div><div><span>03</span><strong>전환</strong><small>색 기준 바꾸기 · 모양 무시</small></div></div>
            <details className="fatigue-game-method"><summary>왜 이 세 가지인가요?</summary><p>반응 속도, Go/No-Go 억제, 과제 전환은 집중과 인지 조절을 살펴볼 때 자주 사용하는 과제 형태입니다. 화면 지연·기기·수면·주변 환경의 영향을 받으므로 표준화된 진단 점수로 해석하지 않습니다.</p><div><a href="https://pubmed.ncbi.nlm.nih.gov/17850833/" target="_blank" rel="noopener noreferrer">Go/No-Go 연구 예시 <ExternalLink size={14} aria-hidden="true" /></a><a href="https://pubmed.ncbi.nlm.nih.gov/29517261/" target="_blank" rel="noopener noreferrer">과제 전환 리뷰 <ExternalLink size={14} aria-hidden="true" /></a></div></details>
          </div>
          <div className="fatigue-game-intro-side"><FocusJourneyVisual /><div className="fatigue-game-intro-actions"><button type="button" className="rhythm-button" onClick={() => startRun('baseline')}><Brain size={18} aria-hidden="true" /> 게임 시작 <ArrowRight size={18} aria-hidden="true" /></button><button type="button" className="fatigue-game-sound-toggle" onClick={toggleGameSound} aria-pressed={gameSoundEnabled}>{gameSoundEnabled ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />} 게임 효과음 {gameSoundEnabled ? '켜짐' : '꺼짐'}</button><p className="fatigue-game-sound-note">시작·신호·판정·단계 전환 때 짧은 소리가 납니다.</p>{gameSoundStatus ? <p className="fatigue-game-sound-status" role="status">{gameSoundStatus}</p> : null}{onInvite ? <button type="button" className="rhythm-button secondary" onClick={() => void onInvite()}><ArrowUpRight size={18} aria-hidden="true" /> 친구에게 “너도 해봐” 보내기</button> : null}</div></div>
        </div> : null}

        {phase === 'countdown' ? <div className="fatigue-game-countdown" role="status" aria-live="assertive" aria-atomic="true">
          <p className="fatigue-game-kicker">시작 준비</p>
          <strong>{readyCountdown}</strong>
          <h3>화면을 보고 신호를 기다려 주세요.</h3>
          <p>첫 신호가 나타나면 눌러요. 준비 시간에는 점수를 기록하지 않습니다.</p>
        </div> : null}

        {phase === 'running' ? <div className="fatigue-game-running">
          <div className="fatigue-game-meta"><span>STAGE {String(stageIndex + 1).padStart(2, '0')} / 03 · {currentStage.label}</span><span><Timer size={15} aria-hidden="true" /> {mode === 'baseline' ? '쉬기 전' : '휴식 후'}<button type="button" className="fatigue-game-sound-icon" onClick={toggleGameSound} aria-label={`게임 효과음 ${gameSoundEnabled ? '끄기' : '켜기'}`} aria-pressed={gameSoundEnabled}>{gameSoundEnabled ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}</button></span></div>
          <div className="fatigue-stage-instruction"><strong>{currentStage.instruction}</strong><span>{currentStage.detail}</span></div>
          <div className="fatigue-rule-slot">
            {FOCUS_GAME_STAGES[stageIndex] === 'switch' ? <div className="fatigue-rule-display"><span>이번 규칙</span><strong className={`fatigue-rule-color fatigue-rule-color-${switchRule}`}>{switchRule === 'green' ? '초록' : '보라'}</strong><small>이 색 신호만 누르기</small></div> : <span className="fatigue-rule-placeholder" aria-hidden="true" />}
          </div>
          <div className="fatigue-trial-dots" aria-label={`현재 단계 ${trialIndex + 1}번째 신호`}>{Array.from({length: FOCUS_GAME_TRIALS_PER_STAGE}, (_, index) => <span key={index} className={index < trialIndex ? 'done' : index === trialIndex ? 'current' : ''} />)}</div>
          <button type="button" className={`fatigue-target fatigue-target-${trial?.stimulusColor ?? 'waiting'}${stimulusVisible ? ' visible' : ''}`} onClick={tapStimulus} aria-label={stimulusVisible && trial ? trialPrompt(trial) : '신호를 기다리는 중'}>
            {stimulusVisible && trial ? trial.stage === 'speed' || trial.stage === 'switch' ? <span className={`fatigue-target-shape fatigue-target-shape-${trial.stimulusShape}`} aria-hidden="true" /> : trial.stage === 'brake' && !trial.shouldRespond ? <span className="fatigue-target-stop">멈춤</span> : <span className="fatigue-target-dot" /> : <span className="fatigue-target-wait">·</span>}
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
          <p>휴대폰을 뒤집어 두고 공의 움직임을 따라 해보세요. 올라갈 때 들이쉬고, 내려갈 때 내쉽니다.</p>
          <BreathLineGuide startedAt={restStartedAt} cue={breathCue} />
          <p className="fatigue-breath-note">들이쉬기 4초 · 멈추기 2초 · 내쉬기 6초 · 다시 멈추기 2초를 반복합니다. 숨을 참기 불편하거나 어지럽고 답답하면 멈춤을 건너뛰고 자연스럽게 호흡하세요.</p>
          <div className="fatigue-rest-clock" aria-label="5분 호흡 안내 타이머">
            <div className="fatigue-rest-clock-readout" role="timer" aria-label={`${Math.floor(restRemainingSeconds / 60)}분 ${restRemainingSeconds % 60}초 남음`}>
              <Timer size={20} aria-hidden="true" />
              <strong>{Math.floor(restRemainingSeconds / 60)}:{String(restRemainingSeconds % 60).padStart(2, '0')}</strong>
              <span>{restComplete ? '휴식 완료' : '공의 움직임에 맞춰 천천히'}</span>
            </div>
            <progress max={5 * 60} value={5 * 60 - restRemainingSeconds} aria-label="5분 휴식 진행" />
          </div>
          <div className="fatigue-audio-panel" aria-label="호흡 단계별 싱잉볼 소리">
            <div><strong><Volume2 size={17} aria-hidden="true" /> 4단계 싱잉볼 소리</strong><span>들이쉬기·멈추기·내쉬기 단계가 바뀔 때마다 짧게 울립니다.</span></div>
            <div className="fatigue-audio-actions"><button type="button" className="fatigue-audio-button" onClick={toggleSingingBowlAudio} aria-pressed={bowlSoundEnabled} disabled={restComplete}>{bowlSoundEnabled ? <><VolumeX size={15} aria-hidden="true" /> 싱잉볼 소리 끄기</> : <><Volume2 size={15} aria-hidden="true" /> 싱잉볼 소리 켜기</>}</button></div>
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
