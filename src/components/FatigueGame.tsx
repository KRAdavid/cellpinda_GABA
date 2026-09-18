import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, ExternalLink, Gamepad2, RotateCcw, Timer, Volume2, VolumeX } from 'lucide-react';
import {
  compareFocusGames,
  createFocusRunPattern,
  getFocusGameResultGuidance,
  FOCUS_GAME_STAGES,
  FOCUS_GAME_TRIALS_PER_STAGE,
  FOCUS_GAME_TOTAL_TRIALS,
  summarizeFocusGame,
  type FocusRunPattern,
  type FocusGameComparisonDirection,
  type FocusGameStage,
  type FocusGameSummary,
  type FocusStimulusColor,
  type FocusStimulusShape,
  type FocusTrialPlan,
  type FocusTrialRecord,
} from '../domain/fatigue-game';
import { BREATH_ACTIVE_SECONDS, BREATH_CYCLE_SECONDS, getBreathCue, type BreathCue, type BreathStage } from '../domain/breath-guide';
import './fatigue-game.css';

type GamePhase = 'idle' | 'practice-press' | 'practice-hold' | 'practice-speed' | 'practice-switch-match' | 'practice-switch-hold' | 'practice-complete' | 'countdown' | 'running' | 'baseline-complete' | 'baseline-finished' | 'rest' | 'complete';
type GameMode = 'baseline' | 'after' | 'repeat';
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
  speed: { label: '빠르게 누르기', instruction: '색과 모양에 상관없이, 신호가 뜨면 눌러요', detail: '모든 신호에 한 번씩 눌러요' },
  brake: { label: '누르기와 멈추기', instruction: '초록은 누르고, 빨강은 누르지 않아요', detail: '8개 중 3개는 누르지 않는 신호예요' },
  switch: { label: '색 규칙 바꾸기', instruction: '위 기준색과 같은 신호만 눌러요', detail: '모양은 무시하고, 화면 위 색 규칙만 따라요' },
};

function trialPrompt(trial: Trial): string {
  const color = (value: FocusStimulusColor) => value === 'green' ? '초록' : value === 'purple' ? '보라' : '빨강';
  if (trial.stage === 'speed') return `${shapeLabels[trial.stimulusShape]} 신호 · 누르기`;
  if (trial.stage === 'brake') return trial.shouldRespond ? '누르기' : '멈춤';
  return `기준 ${color(trial.targetColor)} · 신호 ${color(trial.stimulusColor)} · ${trial.shouldRespond ? '누르기' : '멈춤'}`;
}

function createTrial(stageIndex: number, trialIndex: number, pattern: RunPattern): Trial {
  const stage = FOCUS_GAME_STAGES[stageIndex]!;
  return pattern.trials[stage][trialIndex]!;
}

function metricText(value: number | null, suffix = 'ms'): string {
  if (value === null) return '기록 없음';
  if (suffix === 'ms') return `${(value / 1000).toFixed(2)}초`;
  return `${value}${suffix}`;
}

function summaryLine(summary: FocusGameSummary): string {
  return `맞힌 비율 ${summary.accuracyPct}% · 평균 누르는 시간 ${metricText(summary.speed.averageMs)}`;
}

function comparisonText(before: FocusGameSummary, second: FocusGameSummary, rested: boolean): { heading: string; body: string; tone: FocusGameComparisonDirection } {
  const comparison = compareFocusGames(before, second);
  const speed = comparison.speedDeltaMs === null ? '누르는 시간은 비교하기 어려워요.' : `평균 누르는 시간은 ${Math.abs(comparison.speedDeltaMs / 1000).toFixed(2)}초 ${comparison.speedDeltaMs < 0 ? '짧았어요' : comparison.speedDeltaMs > 0 ? '길었어요' : '같았어요'}.`;
  const accuracy = comparison.accuracyDeltaPct === null ? '' : `맞힌 비율은 ${Math.abs(comparison.accuracyDeltaPct)}%포인트 ${comparison.accuracyDeltaPct > 0 ? '높았어요' : comparison.accuracyDeltaPct < 0 ? '낮았어요' : '같았어요'}.`;
  let heading = '두 게임 기록이 비슷해요.';
  if (comparison.accuracyDeltaPct !== null && comparison.accuracyDeltaPct > 0) heading = `두 번째 게임에서 맞힌 비율이 ${comparison.accuracyDeltaPct}%포인트 높았어요.`;
  else if (comparison.accuracyDeltaPct !== null && comparison.accuracyDeltaPct < 0) heading = `두 번째 게임에서 맞힌 비율이 ${Math.abs(comparison.accuracyDeltaPct)}%포인트 낮았어요.`;
  else if (comparison.speedDeltaMs !== null && comparison.speedDeltaMs < 0) heading = '두 번째 게임에서 신호를 누른 시간이 짧았어요.';
  else if (comparison.speedDeltaMs !== null && comparison.speedDeltaMs > 0) heading = '두 번째 게임에서 신호를 누른 시간이 길었어요.';
  if (comparison.direction === 'unavailable') heading = '두 게임 기록을 비교하기 어려워요.';
  const context = rested ? '5분 쉰 뒤 두 번째로 한 게임' : '쉬지 않고 이어서 한 두 번째 게임';
  const body = `${speed} ${accuracy} ${context}의 기록을 나란히 보여드려요. 문제 순서와 익숙함, 기기·주변 상황도 영향을 줄 수 있어 휴식이 기록 변화의 원인이라고 단정할 수는 없어요.`;
  return { heading, body, tone: comparison.direction };
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

export default function FatigueGame({ onEvent, onInvite }: FatigueGameProps) {
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [practiceCountdown, setPracticeCountdown] = useState(3);
  const [mode, setMode] = useState<GameMode>('baseline');
  const [stageIndex, setStageIndex] = useState(0);
  const [trialIndex, setTrialIndex] = useState(0);
  const [trial, setTrial] = useState<Trial | null>(null);
  const [stimulusVisible, setStimulusVisible] = useState(false);
  const [records, setRecords] = useState<FocusTrialRecord[]>([]);
  const [falseStarts, setFalseStarts] = useState(0);
  const [before, setBefore] = useState<FocusGameSummary | null>(null);
  const [after, setAfter] = useState<FocusGameSummary | null>(null);
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
  const countdownAudioRunRef = useRef(0);
  const runSequenceRef = useRef(0);
  const practiceHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!phase.startsWith('practice-')) return;
    practiceHeadingRef.current?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    if (phase !== 'practice-hold' && phase !== 'practice-switch-hold') return;
    setPracticeCountdown(3);
    let remaining = 3;
    const interval = window.setInterval(() => {
      remaining -= 1;
      setPracticeCountdown(Math.max(0, remaining));
      if (remaining <= 0) window.clearInterval(interval);
    }, 1_000);
    return () => window.clearInterval(interval);
  }, [phase]);

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

  function beginPractice() {
    setStatus('');
    setPhase('practice-press');
    playGameCue('start');
    onEvent('fatigue_game_practice_start');
  }

  function continuePractice() {
    if (phase !== 'practice-hold' && phase !== 'practice-switch-hold') return;
    const nextPhase = phase === 'practice-hold' ? 'practice-speed' : 'practice-complete';
    setStatus(nextPhase === 'practice-complete' ? '세 가지 규칙 연습을 마쳤어요.' : '좋아요. 다음 규칙을 연습해 볼게요.');
    playGameCue('correct');
    setPhase(nextPhase);
  }

  function finishPracticePress() {
    setStatus('좋아요. 첫 규칙을 잘했어요.');
    setPhase('practice-hold');
    playGameCue('correct');
  }

  function finishPracticeSpeed() {
    setStatus('좋아요. 다음에는 위의 기준색을 따라가요.');
    setPhase('practice-switch-match');
    playGameCue('correct');
  }

  function finishPracticeSwitchMatch() {
    setStatus('맞았어요. 기준색과 같은 신호예요.');
    setPhase('practice-switch-hold');
    playGameCue('correct');
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
    setPhase('rest');
    setStatus('');
    startRestClock();
    onEvent('fatigue_game_rest_start', { duration: '5m' });
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
    setAudioMessage('');
    setStatus('');
  }

  const currentStage = stageInfo[FOCUS_GAME_STAGES[stageIndex]!];
  const currentSignalNumber = stageIndex * FOCUS_GAME_TRIALS_PER_STAGE + trialIndex + 1;
  const switchRule = trial?.targetColor ?? runPatternRef.current.trials.switch[trialIndex]?.targetColor ?? 'green';
  const comparison = before && after ? comparisonText(before, after, mode === 'after') : null;
  const resultGuidance = before ? getFocusGameResultGuidance(before.accuracyPct) : null;
  const metrics = before && after ? [
    { label: '전체 맞힌 비율', before: `${before.accuracyPct}%`, after: `${after.accuracyPct}%` },
    { label: '평균 누르는 시간', before: metricText(before.speed.averageMs), after: metricText(after.speed.averageMs) },
    { label: '멈춤 신호에서 맞힌 비율', before: `${before.brake.accuracyPct}%`, after: `${after.brake.accuracyPct}%` },
    { label: '색 규칙에서 맞힌 비율', before: `${before.switch.accuracyPct}%`, after: `${after.switch.accuracyPct}%` },
  ] : [];

  return (
    <section className="fatigue-game" id="focus-game" aria-labelledby="fatigue-game-heading">
      <div className="fatigue-game-heading">
        <div><p className="fatigue-game-kicker">02 / 오늘의 게임 기록</p><h2 id="fatigue-game-heading">뇌 컨디션 확인 챌린지</h2></div>
        <p>신호가 3단계로 바뀌어요.</p>
      </div>

      <div className={`fatigue-game-panel fatigue-game-phase-${phase}`}>
        {phase === 'idle' ? <div className="fatigue-game-onboarding">
          <p className="fatigue-game-kicker">약 1분 · 매번 달라지는 신호 {FOCUS_GAME_TOTAL_TRIALS}개 · 연습은 점수에 포함되지 않아요</p>
          <h3>세 가지 규칙을<br />차례로 따라가요.</h3>
          <div className="fatigue-game-rule-cards" aria-label="게임 규칙">
            {FOCUS_GAME_STAGES.map((stage, index) => <div className="fatigue-game-rule-card" key={stage}><span className="fatigue-rule-step">{index + 1}</span><span><strong>{stageInfo[stage].instruction}</strong><small>{stageInfo[stage].detail}</small></span></div>)}
          </div>
          <div className="fatigue-game-onboarding-actions">
            <button type="button" className="rhythm-button" onClick={beginPractice}><Gamepad2 size={18} aria-hidden="true" /> 세 가지 규칙 연습하기 <ArrowRight size={18} aria-hidden="true" /></button>
            <button type="button" className="fatigue-game-sound-toggle" onClick={toggleGameSound} aria-pressed={gameSoundEnabled}>{gameSoundEnabled ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />} 효과음 {gameSoundEnabled ? '켜짐' : '꺼짐'}</button>
            <button type="button" className="rhythm-text-button fatigue-game-skip-practice" onClick={() => startRun('baseline')}>연습 없이 바로 시작</button>
          </div>
          <details className="fatigue-game-method"><summary>게임 점수와 연구 알아보기</summary><p>이 게임은 신호에 반응하고 멈추는 놀이입니다. 기록은 오늘 이 기기에서 나온 게임 결과이며, 뇌 피로나 건강 상태를 진단하지 않습니다. 화면과 기기, 주변 환경에 따라 달라질 수 있어요.</p><div><a href="https://pubmed.ncbi.nlm.nih.gov/17850833/" target="_blank" rel="noopener noreferrer">멈춤 신호를 살펴본 연구 <ExternalLink size={14} aria-hidden="true" /></a><a href="https://pubmed.ncbi.nlm.nih.gov/29517261/" target="_blank" rel="noopener noreferrer">색 규칙 바꾸기를 살펴본 연구 <ExternalLink size={14} aria-hidden="true" /></a></div></details>
        </div> : null}

        {phase === 'practice-press' ? <div className="fatigue-game-practice" aria-labelledby="fatigue-practice-press-heading">
          <p className="fatigue-game-kicker">연습 1 / 5 · 초록 신호</p>
          <h3 id="fatigue-practice-press-heading" ref={practiceHeadingRef} tabIndex={-1}>초록 신호를 눌러 보세요.</h3>
          <button type="button" className="fatigue-practice-signal fatigue-practice-signal-press" onClick={finishPracticePress} aria-label="초록 신호, 눌러 보기"><span aria-hidden="true">●</span><strong>초록</strong><small>눌러 보기</small></button>
        </div> : null}

        {phase === 'practice-hold' ? <div className="fatigue-game-practice" aria-labelledby="fatigue-practice-hold-heading">
          <p className="fatigue-game-kicker">연습 2 / 5 · 빨강 신호</p>
          <h3 id="fatigue-practice-hold-heading" ref={practiceHeadingRef} tabIndex={-1}>빨강 신호는 누르지 말고 기다려요.</h3>
          <p className="fatigue-practice-feedback" role="status">{status}</p>
          <div className="fatigue-practice-signal fatigue-practice-signal-stop" role="img" aria-label="빨강 신호, 누르지 않고 기다리기"><span aria-hidden="true">Ⅱ</span><strong>빨강</strong><small>손을 떼고 기다리기</small></div>
          <div className="fatigue-practice-timer" role="progressbar" aria-label="연습 신호 표시 시간" aria-valuemin={0} aria-valuemax={3} aria-valuenow={3 - practiceCountdown}><span style={{ transform: `scaleX(${(3 - practiceCountdown) / 3})` }} /></div>
          <button type="button" className="rhythm-button secondary fatigue-practice-continue" onClick={continuePractice}>다음 규칙 연습하기 <ArrowRight size={18} aria-hidden="true" /></button>
        </div> : null}

        {phase === 'practice-speed' ? <div className="fatigue-game-practice" aria-labelledby="fatigue-practice-speed-heading">
          <p className="fatigue-game-kicker">연습 3 / 5 · 모든 신호 누르기</p>
          <h3 id="fatigue-practice-speed-heading" ref={practiceHeadingRef} tabIndex={-1}>색과 모양을 보지 말고, 신호를 눌러요.</h3>
          <button type="button" className="fatigue-practice-signal fatigue-practice-signal-press fatigue-practice-signal-purple" onClick={finishPracticeSpeed} aria-label="보라색 신호, 눌러 보기"><span aria-hidden="true">◆</span><strong>보라 신호</strong><small>눌러 보기</small></button>
        </div> : null}

        {phase === 'practice-switch-match' ? <div className="fatigue-game-practice" aria-labelledby="fatigue-practice-switch-match-heading">
          <p className="fatigue-game-kicker">연습 4 / 5 · 같은 색 찾기</p>
          <h3 id="fatigue-practice-switch-match-heading" ref={practiceHeadingRef} tabIndex={-1}>위의 기준색과 같은 신호를 눌러요.</h3>
          <div className="fatigue-practice-rule"><span>이번 기준색</span><strong>초록</strong></div>
          <button type="button" className="fatigue-practice-signal fatigue-practice-signal-press" onClick={finishPracticeSwitchMatch} aria-label="기준색 초록, 초록 신호, 눌러 보기"><span aria-hidden="true">●</span><strong>초록 신호</strong><small>눌러 보기</small></button>
        </div> : null}

        {phase === 'practice-switch-hold' ? <div className="fatigue-game-practice" aria-labelledby="fatigue-practice-switch-hold-heading">
          <p className="fatigue-game-kicker">연습 5 / 5 · 다른 색 기다리기</p>
          <h3 id="fatigue-practice-switch-hold-heading" ref={practiceHeadingRef} tabIndex={-1}>기준색과 다른 신호는 누르지 말고 기다려요.</h3>
          <div className="fatigue-practice-rule"><span>이번 기준색</span><strong>초록</strong></div>
          <p className="fatigue-practice-feedback" role="status">{status}</p>
          <div className="fatigue-practice-signal fatigue-practice-signal-stop fatigue-practice-signal-purple" role="img" aria-label="기준색은 초록, 신호는 보라색이므로 누르지 않고 기다리기"><span aria-hidden="true">Ⅱ</span><strong>보라 신호</strong><small>손을 떼고 기다리기</small></div>
          <div className="fatigue-practice-timer" role="progressbar" aria-label="다른 색 신호 연습 시간" aria-valuemin={0} aria-valuemax={3} aria-valuenow={3 - practiceCountdown}><span style={{ transform: `scaleX(${(3 - practiceCountdown) / 3})` }} /></div>
          <button type="button" className="rhythm-button secondary fatigue-practice-continue" onClick={continuePractice}>연습 마치기 <ArrowRight size={18} aria-hidden="true" /></button>
        </div> : null}

        {phase === 'practice-complete' ? <div className="fatigue-game-practice fatigue-game-practice-complete" aria-labelledby="fatigue-practice-complete-heading">
          <p className="fatigue-game-kicker">연습 완료</p>
          <h3 id="fatigue-practice-complete-heading" ref={practiceHeadingRef} tabIndex={-1}>세 가지 규칙을 모두 연습했어요.</h3>
          <p>실전에서는 24개 신호가 나와요. 규칙은 연습한 순서대로 바뀌고, 연습 기록은 점수에 들어가지 않아요.</p>
          <button type="button" className="rhythm-button" onClick={() => startRun('baseline')}><Gamepad2 size={18} aria-hidden="true" /> 24개 신호 시작 <ArrowRight size={18} aria-hidden="true" /></button>
          <button type="button" className="rhythm-text-button" onClick={beginPractice}>연습 다시 하기</button>
        </div> : null}

        {phase === 'countdown' ? <div className="fatigue-game-countdown" role="status" aria-live="assertive" aria-atomic="true">
          <p className="fatigue-game-kicker">시작 준비</p>
          <strong>{readyCountdown}</strong>
          <h3>화면을 보고 신호를 기다려 주세요.</h3>
          <p>첫 신호가 나타나면 눌러요. 준비 시간에는 점수를 기록하지 않습니다.</p>
        </div> : null}

        {phase === 'running' ? <div className="fatigue-game-running">
          <div className="fatigue-game-meta"><span>{stageIndex + 1} / 3 · {currentStage.label}</span><span><Timer size={15} aria-hidden="true" /> {mode === 'baseline' ? '첫 번째 게임' : mode === 'after' ? '5분 쉰 뒤 · 두 번째' : '이어 하는 두 번째'}<button type="button" className="fatigue-game-sound-icon" onClick={toggleGameSound} aria-label={`게임 효과음 ${gameSoundEnabled ? '끄기' : '켜기'}`} aria-pressed={gameSoundEnabled}>{gameSoundEnabled ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}</button></span></div>
          <div className="fatigue-stage-instruction"><strong>{currentStage.instruction}</strong><span>{currentStage.detail}</span></div>
          <div className="fatigue-rule-slot">
            {FOCUS_GAME_STAGES[stageIndex] === 'switch' ? <div className="fatigue-rule-display"><span>이번 규칙</span><strong className={`fatigue-rule-color fatigue-rule-color-${switchRule}`}>{switchRule === 'green' ? '초록' : '보라'}</strong><small>이 색 신호만 누르기</small></div> : <span className="fatigue-rule-placeholder" aria-hidden="true" />}
          </div>
          <div className="fatigue-trial-progress"><span>{String(currentSignalNumber).padStart(2, '0')} / {FOCUS_GAME_TOTAL_TRIALS}</span><div className="fatigue-trial-dots" role="img" aria-label={`이 단계 신호 ${trialIndex + 1} / ${FOCUS_GAME_TRIALS_PER_STAGE}`}>{Array.from({length: FOCUS_GAME_TRIALS_PER_STAGE}, (_, index) => <span key={index} className={index < trialIndex ? 'done' : index === trialIndex ? 'current' : ''} />)}</div></div>
          <button type="button" className={`fatigue-target fatigue-target-${trial?.stimulusColor ?? 'waiting'}${stimulusVisible ? ' visible' : ''}`} onClick={tapStimulus} aria-label={stimulusVisible && trial ? trialPrompt(trial) : '신호를 기다리는 중'}>
            {stimulusVisible && trial ? trial.stage === 'speed' || trial.stage === 'switch' ? <span className="fatigue-target-visual-group"><span className={`fatigue-target-shape fatigue-target-shape-${trial.stimulusShape}`} aria-hidden="true" /><span className="fatigue-target-label">{trial.stage === 'switch' ? trial.stimulusColor === 'green' ? '초록' : '보라' : '누르기'}</span></span> : <span className="fatigue-target-label">{trial.shouldRespond ? '누르기' : '멈춤'}</span> : <span className="fatigue-target-wait">·</span>}
          </button>
          <p className="fatigue-game-status" aria-live="polite">{status}</p>
        </div> : null}

        {phase === 'baseline-complete' && before && resultGuidance ? <div className="fatigue-game-summary">
          <CheckCircle2 size={28} aria-hidden="true" /><div>
            <p className="fatigue-game-kicker">첫 번째 게임 · 24개 신호 완료</p>
            <h3>{resultGuidance === 'celebrate' ? '축하해요! 신호를 잘 따라왔어요.' : '잠깐 쉬고 다시 해봐도 좋아요.'}</h3>
            <p className="fatigue-game-result-score">{summaryLine(before)}</p>
            <p className="fatigue-game-result-boundary">이 점수는 오늘 한 게임 기록이에요. 뇌 피로나 건강 상태를 재는 점수는 아니에요.</p>
            <p className={`fatigue-game-result-guidance fatigue-game-result-guidance-${resultGuidance}`} role="status">
              {resultGuidance === 'celebrate'
                ? '오늘의 게임 기록을 남기거나 친구에게도 보내 보세요.'
                : '화면에서 눈을 떼고 5분 쉬었다가 다른 신호로 다시 해볼 수 있어요.'}
            </p>
            <details className="fatigue-game-result-details"><summary>세부 기록 보기</summary><div className="fatigue-mini-metrics"><span>누르는 시간 {metricText(before.speed.averageMs)}</span><span>멈춤 신호 {before.brake.accuracyPct}%</span><span>색 바꾸기 {before.switch.accuracyPct}%</span></div></details>
            <button type="button" className="rhythm-button" onClick={resultGuidance === 'pause' ? beginRest : finishBaseline}>
              {resultGuidance === 'pause' ? '5분 쉬고 다시 해보기' : '오늘 기록 마치기'} {resultGuidance === 'pause' ? <ArrowRight size={18} aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
            </button>
            {resultGuidance === 'pause'
              ? <button type="button" className="rhythm-button secondary" onClick={finishBaseline}>오늘 기록 마치기</button>
              : onInvite
                ? <button type="button" className="rhythm-button secondary" onClick={() => void onInvite()}>친구에게 챌린지 보내기 <ArrowUpRight size={18} aria-hidden="true" /></button>
                : <button type="button" className="rhythm-button secondary" onClick={() => startRun('baseline')}>한 번 더 해보기 <RotateCcw size={18} aria-hidden="true" /></button>}
          </div>
        </div> : null}

        {phase === 'baseline-finished' && before ? <div className="fatigue-game-summary fatigue-game-baseline-finished">
          <CheckCircle2 size={28} aria-hidden="true" /><div><p className="fatigue-game-kicker">오늘의 게임 기록</p><h3>첫 번째 게임 기록을 남겼어요.</h3><details className="fatigue-game-result-details"><summary>세부 기록 보기</summary><div className="fatigue-mini-metrics"><span>맞힌 비율 {before.accuracyPct}%</span><span>누르는 시간 {metricText(before.speed.averageMs)}</span><span>멈춤 신호 {before.brake.accuracyPct}%</span><span>색 바꾸기 {before.switch.accuracyPct}%</span></div></details><p>오늘 이 기기에서 해 본 짧은 게임 기록이에요. 화면과 주변 상황에 따라 달라질 수 있고, 건강 상태를 알려주는 점수는 아닙니다.</p><div className="fatigue-game-actions">{onInvite ? <button type="button" className="rhythm-button" onClick={() => void onInvite()}>친구에게 챌린지 보내기 <ArrowUpRight size={18} aria-hidden="true" /></button> : null}<button type="button" className="rhythm-button secondary" onClick={() => startRun('baseline')}>다시 해보기 <RotateCcw size={18} aria-hidden="true" /></button><button type="button" className="rhythm-text-button" onClick={reset}>게임 닫기</button></div>{onInvite ? <p className="fatigue-game-share-note">문자나 카카오톡으로 보낼 수 있어요. 내 답변과 점수는 포함되지 않아요.</p> : null}</div>
        </div> : null}

        {phase === 'rest' ? <div className="fatigue-game-rest">
          <p className="fatigue-game-kicker">PAUSE · 5-MIN BREATH</p>
          <h3>화면에서 잠깐 눈을 떼고, 호흡을 천천히 해보세요.</h3>
          <p>화면을 보며 선을 따라가도 좋고, 싱잉볼 소리를 켠 뒤 눈을 감아도 괜찮아요. 선이 올라갈 때 들이쉬고, 내려갈 때 내쉬세요.</p>
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
          <button type="button" className="rhythm-button" onClick={() => startRun('after')} disabled={!restComplete}>5분 쉰 뒤 한 번 더 하기 <ArrowRight size={18} aria-hidden="true" /></button>
          {!restComplete ? <div className="fatigue-rest-unlock-note"><p>다른 신호로 한 번 더 하고, 두 게임 기록을 나란히 볼 수 있어요.</p><button type="button" className="rhythm-text-button" onClick={() => startRun('repeat')}>쉬지 않고 이어서 하기</button></div> : null}
        </div> : null}

        {phase === 'complete' && before && after && comparison ? <div className="fatigue-game-summary fatigue-game-complete">
          <div className={`fatigue-comparison fatigue-comparison-${comparison.tone}`}><ArrowRight size={24} aria-hidden="true" /><div><p className="fatigue-game-kicker">{mode === 'after' ? '5분 쉰 뒤 두 번째 게임' : '쉬지 않고 이어 한 두 번째 게임'}</p><h3>{comparison.heading}</h3></div></div>
          <details className="fatigue-game-result-details"><summary>두 게임 기록 자세히 보기</summary><p>{comparison.body}</p><div className="fatigue-game-score-grid">{metrics.map(metric => <div key={metric.label}><span>{metric.label}</span><strong>첫 번째 {metric.before}</strong><strong>두 번째 {metric.after}</strong></div>)}</div></details>
          <p className="fatigue-game-viral-copy">친구도 해볼 수 있게 이 챌린지를 보내 보세요.</p><div className="fatigue-game-actions">{onInvite ? <button type="button" className="rhythm-button" onClick={() => void onInvite()}>친구에게 챌린지 보내기 <ArrowUpRight size={18} aria-hidden="true" /></button> : null}<button type="button" className="rhythm-button secondary" onClick={() => startRun('baseline')}>처음부터 다시 하기 <RotateCcw size={18} aria-hidden="true" /></button><button type="button" className="rhythm-text-button" onClick={reset}>게임 닫기</button></div>{onInvite ? <p className="fatigue-game-share-note">문자나 카카오톡으로 보낼 수 있어요. 내 답변과 점수는 포함되지 않아요.</p> : null}
        </div> : null}
      </div>
      <p className="fatigue-game-note">짧은 반응 게임의 개인 기록입니다. 뇌 피로도나 건강 상태를 진단하지 않으며, 화면·기기·주변 상황에 따라 달라질 수 있어요.</p>
    </section>
  );
}
