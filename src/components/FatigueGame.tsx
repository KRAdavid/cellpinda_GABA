import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, CircleAlert, RotateCcw, Timer } from 'lucide-react';
import {
  compareReactionGames,
  FATIGUE_GAME_ROUNDS,
  summarizeReactionGame,
  type ReactionGameSummary,
  type ReactionTime,
} from '../domain/fatigue-game';
import './fatigue-game.css';

type GamePhase = 'idle' | 'running' | 'baseline-complete' | 'rest' | 'complete';
type GameMode = 'baseline' | 'after';

interface FatigueGameProps {
  onEvent: (name: string, properties?: Record<string, string>) => void;
}

function summaryText(summary: ReactionGameSummary): string {
  const average = summary.averageMs === null ? '기록 없음' : `평균 ${summary.averageMs}ms`;
  return `${average} · 놓친 신호 ${summary.misses}회`;
}

function comparisonText(before: ReactionGameSummary, after: ReactionGameSummary): { heading: string; body: string; tone: 'faster' | 'slower' | 'similar' | 'unavailable' } {
  const comparison = compareReactionGames(before, after);
  if (comparison.direction === 'faster') return {
    heading: '쉬고 나니 신호를 더 빨리 잡았어요.',
    body: `평균 ${Math.abs(comparison.deltaMs ?? 0)}ms 빨라졌어요. 짧은 휴식 뒤 오늘의 집중감이 달라졌는지 스스로 확인한 기록입니다.`,
    tone: 'faster',
  };
  if (comparison.direction === 'slower') return {
    heading: '쉬고 다시 해도 반응이 느렸어요.',
    body: `평균 ${Math.abs(comparison.deltaMs ?? 0)}ms 차이가 났어요. 오늘은 머리가 계속 일하고 있을 수 있으니 화면과 일을 끊고 더 쉬어 보세요.`,
    tone: 'slower',
  };
  if (comparison.direction === 'similar') return {
    heading: '두 번의 기록이 비슷해요.',
    body: '짧은 게임 결과만으로 뇌 피로를 판단할 수는 없어요. 지금 느끼는 피곤함과 잠의 질도 함께 돌아보세요.',
    tone: 'similar',
  };
  return {
    heading: '두 번을 모두 기록하지 못했어요.',
    body: '신호를 놓친 횟수가 많아 비교하기 어려워요. 조용한 곳에서 몸을 편하게 하고 다시 해보세요.',
    tone: 'unavailable',
  };
}

export default function FatigueGame({ onEvent }: FatigueGameProps) {
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [mode, setMode] = useState<GameMode>('baseline');
  const [round, setRound] = useState(0);
  const [targetVisible, setTargetVisible] = useState(false);
  const [times, setTimes] = useState<ReactionTime[]>([]);
  const [falseStarts, setFalseStarts] = useState(0);
  const [before, setBefore] = useState<ReactionGameSummary | null>(null);
  const [after, setAfter] = useState<ReactionGameSummary | null>(null);
  const [status, setStatus] = useState('');
  const timerRef = useRef<number | null>(null);
  const targetAtRef = useRef(0);

  useEffect(() => {
    if (phase !== 'running') return;
    const delay = 750 + Math.floor(Math.random() * 850);
    timerRef.current = window.setTimeout(() => {
      if (targetVisible) {
        setTargetVisible(false);
        const nextTimes = [...times, null];
        setTimes(nextTimes);
        if (round >= FATIGUE_GAME_ROUNDS - 1) {
          const summary = summarizeReactionGame(nextTimes, falseStarts);
          if (mode === 'baseline') { setBefore(summary); setPhase('baseline-complete'); }
          else { setAfter(summary); setPhase('complete'); }
          onEvent('fatigue_game_complete', { mode, averageMs: String(summary.averageMs ?? ''), misses: String(summary.misses) });
        } else {
          setRound(current => current + 1);
          setStatus('신호를 놓쳤어요. 다음 신호를 기다리세요.');
        }
        return;
      }
      targetAtRef.current = performance.now();
      setTargetVisible(true);
      setStatus('지금 눌러요');
    }, targetVisible ? 1800 : delay);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [falseStarts, mode, onEvent, phase, round, targetVisible, times]);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  function startRun(nextMode: GameMode) {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    setMode(nextMode);
    setRound(0);
    setTargetVisible(false);
    setTimes([]);
    setFalseStarts(0);
    setStatus('신호가 나타나면 눌러 주세요.');
    setPhase('running');
    onEvent('fatigue_game_start', { mode: nextMode });
  }

  function tapTarget() {
    if (phase !== 'running') return;
    if (!targetVisible) {
      setFalseStarts(current => current + 1);
      setStatus('아직 신호가 없어요. 초록 신호가 뜬 뒤 눌러 주세요.');
      onEvent('fatigue_game_false_start', { mode });
      return;
    }
    const elapsed = Math.max(1, Math.round(performance.now() - targetAtRef.current));
    const nextTimes = [...times, elapsed];
    setTargetVisible(false);
    setTimes(nextTimes);
    if (round >= FATIGUE_GAME_ROUNDS - 1) {
      const summary = summarizeReactionGame(nextTimes, falseStarts);
      if (mode === 'baseline') { setBefore(summary); setPhase('baseline-complete'); }
      else { setAfter(summary); setPhase('complete'); }
      onEvent('fatigue_game_complete', { mode, averageMs: String(summary.averageMs ?? ''), misses: String(summary.misses) });
      return;
    }
    setRound(current => current + 1);
    setStatus('좋아요. 다음 신호를 기다리세요.');
  }

  function beginRest() {
    setPhase('rest');
    setStatus('');
    onEvent('fatigue_game_rest_start', { duration: '5m' });
  }

  function reset() {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    setPhase('idle');
    setBefore(null);
    setAfter(null);
    setTimes([]);
    setTargetVisible(false);
    setStatus('');
  }

  return (
    <section className="fatigue-game" aria-labelledby="fatigue-game-heading">
      <div className="fatigue-game-heading">
        <div><p className="fatigue-game-kicker">02 / 직접 체감하기</p><h2 id="fatigue-game-heading">20초 반응 게임</h2></div>
        <p>초록 신호가 뜨면 바로 눌러 주세요.<br />잠깐 쉰 뒤 다시 해보면 오늘의 차이를 직접 볼 수 있어요.</p>
      </div>

      <div className={`fatigue-game-panel fatigue-game-phase-${phase}`}>
        {phase === 'idle' ? <div className="fatigue-game-intro">
          <div><h3>지금 머리가 얼마나 바쁜지<br />가볍게 확인해 보세요.</h3><p>5번의 신호를 잡는 간단한 게임이에요. 결과는 진단이 아니라, 쉬기 전과 후의 내 반응을 비교하는 개인 기록입니다.</p></div>
          <button type="button" className="rhythm-button" onClick={() => startRun('baseline')}>게임 시작 <ArrowRight size={18} aria-hidden="true" /></button>
        </div> : null}

        {phase === 'running' ? <div className="fatigue-game-running">
          <div className="fatigue-game-meta"><span>ROUND {String(round + 1).padStart(2, '0')} / {String(FATIGUE_GAME_ROUNDS).padStart(2, '0')}</span><span><Timer size={15} aria-hidden="true" /> {mode === 'baseline' ? '쉬기 전' : '휴식 후'}</span></div>
          <button type="button" className={`fatigue-target${targetVisible ? ' visible' : ''}`} onClick={tapTarget} aria-label={targetVisible ? '초록 신호 누르기' : '초록 신호를 기다리는 중'}>{targetVisible ? '●' : '·'}</button>
          <p className="fatigue-game-status" aria-live="polite">{status}</p>
        </div> : null}

        {phase === 'baseline-complete' && before ? <div className="fatigue-game-summary">
          <CheckCircle2 size={28} aria-hidden="true" /><div><p className="fatigue-game-kicker">쉬기 전 기록</p><h3>{summaryText(before)}</h3><p>이제 휴대폰 알림을 끄고, 물을 마시거나 창밖을 보며 <strong>5분 동안 화면에서 눈을 떼어 보세요.</strong></p><button type="button" className="rhythm-button" onClick={beginRest}>5분 휴식 시작 <ArrowRight size={18} aria-hidden="true" /></button></div>
        </div> : null}

        {phase === 'rest' ? <div className="fatigue-game-rest">
          <p className="fatigue-game-kicker">PAUSE</p><h3>지금 5분만 화면을 내려놓으세요.</h3><p>알림을 끄고, 물을 마시고, 창밖이나 먼 곳을 바라보세요. 뇌가 계속 일하는 시간을 잠깐 끊어 주는 것이 목적이에요.</p><ul><li>휴대폰 화면·알림 끄기</li><li>어깨와 턱에 힘 풀기</li><li>조용한 곳에서 천천히 숨 쉬기</li></ul><button type="button" className="rhythm-button" onClick={() => startRun('after')}>휴식했어요 · 다시 측정 <ArrowRight size={18} aria-hidden="true" /></button>
        </div> : null}

        {phase === 'complete' && before && after ? <div className="fatigue-game-summary fatigue-game-complete">
          <div className={`fatigue-comparison fatigue-comparison-${comparisonText(before, after).tone}`}><CircleAlert size={24} aria-hidden="true" /><div><p className="fatigue-game-kicker">쉬기 전 ↔ 휴식 후</p><h3>{comparisonText(before, after).heading}</h3><p>{comparisonText(before, after).body}</p></div></div>
          <div className="fatigue-game-score-grid"><div><span>쉬기 전</span><strong>{summaryText(before)}</strong></div><div><span>휴식 후</span><strong>{summaryText(after)}</strong></div></div>
          <div className="fatigue-game-actions"><button type="button" className="rhythm-button" onClick={() => startRun('baseline')}>다시 비교하기 <RotateCcw size={18} aria-hidden="true" /></button><button type="button" className="rhythm-text-button" onClick={reset}>게임 닫기</button></div>
        </div> : null}
      </div>
      <p className="fatigue-game-note">이 게임은 의학적 진단·뇌 기능 측정·체내 GABA 측정이 아닙니다. 화면 지연, 기기, 수면과 주변 환경에 따라 기록이 달라질 수 있어요.</p>
    </section>
  );
}
