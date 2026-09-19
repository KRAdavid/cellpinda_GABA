import shareLabels from '../../data/rhythm-share-labels.json' with { type: 'json' };

/** A reflection on five self-reported recovery signals; never a medical assessment. */
export type AnswerValue = 0 | 1 | 2 | 3;
export type RhythmId = 'active' | 'sleep' | 'irregular' | 'sensory' | 'unrested' | 'steady';
export type RecoveryLevel = 'maintain' | 'prepare' | 'prioritize';
export type LoadLevel = 'low' | 'watch' | 'high';

export interface RhythmQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly helper: string;
  readonly options: readonly { readonly value: AnswerValue; readonly label: string }[];
}

/** Answer each question about the last seven days, in this exact order. */
export const questions: readonly RhythmQuestion[] = [
  {
    id: 'tension',
    prompt: '지난 7일, 퇴근하거나 집안일을 끝내도 할 일이 계속 생각났나요?',
    helper: '일을 끝냈는데도 머리가 멈추지 않았던 날을 떠올려 보세요.',
    options: [
      { value: 0, label: '거의 없었어요' },
      { value: 1, label: '1~2번 있었어요' },
      { value: 2, label: '자주 있었어요' },
      { value: 3, label: '거의 매일 있었어요' },
    ],
  },
  {
    id: 'sleep-transition',
    prompt: '지난 7일, 침대에 누워도 잠이 오지 않아 오래 뒤척였나요?',
    helper: '불을 끈 뒤 한참 잠들지 못했던 날이 있었는지 생각해 보세요.',
    options: [
      { value: 0, label: '대체로 바로 잠들었어요' },
      { value: 1, label: '가끔 오래 걸렸어요' },
      { value: 2, label: '자주 오래 걸렸어요' },
      { value: 3, label: '거의 매일 오래 걸렸어요' },
    ],
  },
  {
    id: 'pause',
    prompt: '지난 7일, 하루에 5분도 쉬지 못한 날이 있었나요?',
    helper: '하루 중 잠깐이라도 쉬지 못한 날을 떠올려 보세요.',
    options: [
      { value: 0, label: '거의 없었어요' },
      { value: 1, label: '1~2번 있었어요' },
      { value: 2, label: '자주 있었어요' },
      { value: 3, label: '거의 매일 그랬어요' },
    ],
  },
  {
    id: 'sensory-load',
    prompt: '지난 7일, 사람 많은 곳이나 화면을 본 뒤 짜증 나거나 멍했나요?',
    helper: '소리·빛·대화를 더는 듣고 싶지 않았던 때를 떠올려 보세요.',
    options: [
      { value: 0, label: '거의 없었어요' },
      { value: 1, label: '가끔 있었어요' },
      { value: 2, label: '자주 있었어요' },
      { value: 3, label: '거의 매일 있었어요' },
    ],
  },
  {
    id: 'morning-recovery',
    prompt: '지난 7일, 아침에 일어났을 때 피곤함이 남아 있었나요?',
    helper: '눈을 뜬 뒤에도 피곤했던 날을 떠올려 보세요.',
    options: [
      { value: 0, label: '거의 없었어요' },
      { value: 1, label: '1~2번 있었어요' },
      { value: 2, label: '자주 있었어요' },
      { value: 3, label: '거의 매일 그랬어요' },
    ],
  },
];

export interface RhythmType {
  readonly id: RhythmId;
  /** Short label used on social cards and share previews. */
  readonly shareLabel: string;
  readonly name: string;
  readonly description: string;
  readonly suggestions: readonly string[];
  readonly recoveryLevel: RecoveryLevel;
  readonly recoveryHeading: string;
  readonly recoveryDescription: string;
}

export const resultTypes: Readonly<Record<RhythmId, RhythmType>> = {
  active: {
    id: 'active',
    shareLabel: shareLabels.active.label,
    name: shareLabels.active.name,
    description: '일이나 집안일을 끝낸 뒤에도 해야 할 일이 계속 떠올랐다고 답했어요.',
    suggestions: ['남은 일은 메모하고, 오늘 할 일은 여기까지라고 정해 보세요.', '저녁에는 알림을 끄고 10분만 화면에서 떨어져 있어 보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '오늘은 남은 일을 적고 10분 쉬어 보세요.',
    recoveryDescription: '최근 일주일 동안 일을 마친 뒤에도 할 일이 떠오른 날이 많았어요. 남은 일은 메모하고, 휴대폰을 내려놓을 시간을 정해 보세요.',
  },
  sleep: {
    id: 'sleep',
    shareLabel: shareLabels.sleep.label,
    name: shareLabels.sleep.name,
    description: '침대에 누운 뒤 잠들기까지 오래 걸린 날이 많았다고 답했어요.',
    suggestions: ['잠들기 전 조명을 낮추고 휴대폰을 손이 닿지 않는 곳에 두세요.', '내일 할 일은 메모해 두고, 오늘은 여기까지라고 정해 보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '잠들기 전 휴대폰과 조명을 먼저 낮춰 보세요.',
    recoveryDescription: '누운 뒤 오래 뒤척인 날이 많았어요. 잠들기 전 조명을 낮추고 휴대폰을 내려놓은 뒤, 내일 할 일은 메모해 두세요.',
  },
  irregular: {
    id: 'irregular',
    shareLabel: shareLabels.irregular.label,
    name: shareLabels.irregular.name,
    description: '일과 집안일 사이에 잠깐 앉아 쉴 시간도 부족했다고 답했어요.',
    suggestions: ['다음 일정 전에 5분을 비워 두세요.', '쉴 때는 휴대폰 대신 물을 마시거나 창밖을 바라보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '오늘 일정에 5분 쉬는 시간을 넣어 보세요.',
    recoveryDescription: '최근 일주일 동안 잠깐도 쉬지 못한 날이 있었어요. 다음 일정 전에 5분을 비우고 물을 마시거나 창밖을 바라보세요.',
  },
  sensory: {
    id: 'sensory',
    shareLabel: shareLabels.sensory.label,
    name: shareLabels.sensory.name,
    description: '사람이 많거나 화면을 오래 본 뒤 짜증 나거나 멍했던 때가 있었다고 답했어요.',
    suggestions: ['화면과 알림을 끄고 조용한 곳에서 10분 쉬어 보세요.', '사람 많은 곳을 다녀온 뒤에는 다음 일을 시작하기 전에 물을 마시며 잠깐 쉬세요.'],
    recoveryLevel: 'prepare',
    recoveryHeading: '사람과 화면에서 떨어져 10분 쉬어 보세요.',
    recoveryDescription: '사람이 많거나 화면을 오래 본 뒤 짜증 나고 멍했던 때가 있었다고 답했어요. 조용한 곳에서 눈과 귀를 쉬게 해 보세요.',
  },
  unrested: {
    id: 'unrested',
    shareLabel: shareLabels.unrested.label,
    name: shareLabels.unrested.name,
    description: '잠에서 깬 뒤에도 피곤함이 남은 날이 많았다고 답했어요.',
    suggestions: ['잠자는 방의 빛과 소음을 살펴보세요.', '잠든 시간과 아침에 일어난 뒤 느낌을 간단히 적어 보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '잠든 시간과 방의 빛·소리를 살펴보세요.',
    recoveryDescription: '아침에 피곤함이 남았던 날이 많았다고 답했어요. 잠든 시간과 방의 빛·소리, 자기 전 화면을 하나씩 돌아보세요.',
  },
  steady: {
    id: 'steady',
    shareLabel: shareLabels.steady.label,
    name: shareLabels.steady.name,
    description: '최근 일주일은 잠들고 쉬는 일이 비교적 괜찮았다고 답했어요. 잘 맞는 습관을 이어가 보세요.',
    suggestions: ['지금 편안하게 이어 가는 습관을 하나 적어 보세요.', '바쁜 날에도 지킬 수 있는 짧은 휴식 시간을 남겨 두세요.'],
    recoveryLevel: 'maintain',
    recoveryHeading: '지금 잘 맞는 휴식 습관을 이어가세요.',
    recoveryDescription: '최근 일주일은 잠과 쉬는 시간이 비교적 괜찮았다고 답했어요. 바쁜 날에도 짧게 쉴 시간을 남겨 보세요.',
  },
};

/** Resolve an incoming shared-result URL without treating it as a diagnosis. */
export function rhythmIdFromUrl(url: URL): RhythmId | null {
  const queryId = url.searchParams.get('rhythm')?.trim() || '';
  const pathId = url.pathname.match(/(?:^|\/)share\/([A-Za-z0-9_-]+)\/?$/)?.[1] || '';
  const candidate = queryId || pathId;
  return Object.prototype.hasOwnProperty.call(resultTypes, candidate)
    ? candidate as RhythmId
    : null;
}

export interface RhythmScores {
  readonly active: number;
  readonly sleep: number;
  readonly irregular: number;
  readonly sensory: number;
  readonly unrested: number;
}

export interface RhythmResult {
  readonly type: RhythmType;
  /** Internal editorial values, not GABA levels, severity, risk, or clinical scores. */
  readonly scores: RhythmScores;
  /** Sum of the five self-reported signals; a personal reflection index only. */
  readonly loadScore: number;
  readonly loadLevel: LoadLevel;
  readonly explanation: string;
  readonly ruleVersion: '2.0';
}

/**
 * Requires exactly five integer answers (0, 1, 2, 3) in questions order.
 * Throws TypeError on invalid, incomplete or sparse input; never mutates input.
 * Each answer maps to one recovery signal: tension, sleep transition, pause gap,
 * sensory load and morning recovery. All five signals are compared equally.
 * All values <=1: steady. Otherwise the highest wins; ties follow the order
 * unrested > sleep > active > irregular > sensory. This is an editorial
 * reflection rule, not a validated clinical threshold or GABA measurement.
 */
export function classifyRhythm(answers: readonly number[]): RhythmResult {
  if (!Array.isArray(answers) || answers.length !== questions.length ||
    Array.from({ length: questions.length }, (_, index) => answers[index])
      .some(value => !Number.isInteger(value) || value < 0 || value > 3)) {
    throw new TypeError('리듬 체크는 다섯 문항에 각각 0, 1, 2, 3 중 하나로 답해야 합니다.');
  }

  const scores: RhythmScores = {
    active: answers[0]!,
    sleep: answers[1]!,
    irregular: answers[2]!,
    sensory: answers[3]!,
    unrested: answers[4]!,
  };
  const maximum = Math.max(...Object.values(scores));
  const loadScore = answers.reduce((total, answer) => total + answer, 0);
  const loadLevel: LoadLevel = maximum >= 3 || loadScore >= 10 ? 'high' : maximum <= 1 ? 'low' : 'watch';
  const id: RhythmId = maximum <= 1 ? 'steady'
    : scores.unrested === maximum ? 'unrested'
    : scores.sleep === maximum ? 'sleep'
    : scores.active === maximum ? 'active'
    : scores.irregular === maximum ? 'irregular' : 'sensory';

  return {
    type: resultTypes[id],
    scores,
    loadScore,
    loadLevel,
    ruleVersion: '2.0',
    explanation: '다섯 질문에 고른 답을 모아 보여드려요. 건강 검사가 아니라 지난 일주일을 돌아보는 참고예요.',
  };
}
