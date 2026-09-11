/** A reflection on five self-reported recovery signals; never a medical assessment. */
export type AnswerValue = 0 | 1 | 2 | 3;
export type RhythmId = 'active' | 'sleep' | 'irregular' | 'sensory' | 'unrested' | 'steady';
export type RecoveryLevel = 'maintain' | 'prepare' | 'prioritize';

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
    prompt: '지난 7일, 하루가 끝난 뒤에도 머릿속 일이 계속 이어졌나요?',
    helper: '긴장이 내려가는 데 걸리는 시간을 돌아봐요.',
    options: [
      { value: 0, label: '거의 없었어요' },
      { value: 1, label: '한두 번 그랬어요' },
      { value: 2, label: '자주 그랬어요' },
      { value: 3, label: '거의 매일 그랬어요' },
    ],
  },
  {
    id: 'sleep-transition',
    prompt: '지난 7일, 침대에 누운 뒤 잠으로 넘어가는 일이 어땠나요?',
    helper: '잠자리에서 몸과 생각이 전환되는 흐름을 살펴봐요.',
    options: [
      { value: 0, label: '대체로 편안했어요' },
      { value: 1, label: '가끔 오래 걸렸어요' },
      { value: 2, label: '자주 오래 걸렸어요' },
      { value: 3, label: '거의 매일 어려웠어요' },
    ],
  },
  {
    id: 'pause',
    prompt: '지난 7일, 하던 일을 멈추고 의도적으로 쉬는 시간을 가졌나요?',
    helper: '짧더라도 실제로 멈춘 시간이 있었는지 떠올려봐요.',
    options: [
      { value: 0, label: '대부분의 날에 가졌어요' },
      { value: 1, label: '여러 날 가졌어요' },
      { value: 2, label: '한두 번만 가졌어요' },
      { value: 3, label: '거의 갖지 못했어요' },
    ],
  },
  {
    id: 'sensory-load',
    prompt: '지난 7일, 소리·화면·사람이 많은 뒤에 예민하거나 멍한 시간이 있었나요?',
    helper: '자극을 줄이고 회복할 틈이 필요한지 살펴봐요.',
    options: [
      { value: 0, label: '거의 없었어요' },
      { value: 1, label: '가끔 그랬어요' },
      { value: 2, label: '자주 그랬어요' },
      { value: 3, label: '거의 매일 그랬어요' },
    ],
  },
  {
    id: 'morning-recovery',
    prompt: '지난 7일, 아침에 일어났을 때 다시 움직일 여유가 느껴졌나요?',
    helper: '수면 뒤 회복감을 주관적으로 돌아봐요.',
    options: [
      { value: 0, label: '대부분의 날에 그랬어요' },
      { value: 1, label: '여러 날 그랬어요' },
      { value: 2, label: '한두 번만 그랬어요' },
      { value: 3, label: '거의 느끼지 못했어요' },
    ],
  },
];

export interface RhythmType {
  readonly id: RhythmId;
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
    name: '계속 작동형',
    description: '답변에서는 하루가 끝난 뒤에도 생각과 긴장이 내려가기까지 시간이 필요한 모습이 두드러졌어요.',
    suggestions: ['내일 할 일을 짧게 적고 오늘의 일을 마무리해 보세요.', '저녁에 화면과 알림을 잠시 내려놓는 시간을 정해 보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '멈춤을 먼저 예약해 보세요',
    recoveryDescription: '긴장이 오래 이어졌다면, GABA가 신경 신호의 균형 조절에 관여한다는 이야기를 참고하며 몸과 생각이 안정될 수 있도록 짧은 휴식을 하루 일정에 먼저 넣어 보세요.',
  },
  sleep: {
    id: 'sleep',
    name: '잠자리 전환형',
    description: '답변에서는 잠자리에서 생각과 몸이 잠으로 넘어가는 데 시간이 필요한 모습이 두드러졌어요.',
    suggestions: ['잠들기 전 같은 순서로 조명·화면·호흡을 낮추는 루틴을 만들어 보세요.', '잠자리에서 해결할 일은 메모장에 맡기고 내일로 미뤄 보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '잠으로 넘어가는 다리를 놓아 보세요',
    recoveryDescription: '잠자리에서 전환하는 흐름을 돌아본 결과예요. GABA가 신경 신호의 균형 조절에 관여해 안정과 관련된다는 설명을 읽고, 내 수면 루틴에 필요한 휴식을 찾아보세요.',
  },
  irregular: {
    id: 'irregular',
    name: '휴식 공백형',
    description: '답변에서는 하던 일을 멈추고 회복하는 시간이 일정하게 확보되지 않은 모습이 두드러졌어요.',
    suggestions: ['일정표에 5분짜리 멈춤을 하나 넣고 알림을 설정해 보세요.', '휴식 시간에는 화면 대신 물·호흡·창밖 보기처럼 자극이 적은 행동을 골라 보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '적극적인 휴식을 일정에 넣어 보세요',
    recoveryDescription: '휴식이 저절로 생기기를 기다리기보다 짧고 반복 가능한 멈춤을 먼저 만들어 보세요. GABA가 안정과 관련된 물질이라는 이야기를 참고해 회복을 위한 행동을 시작해 보세요.',
  },
  sensory: {
    id: 'sensory',
    name: '자극 과부하형',
    description: '답변에서는 소리·화면·사람 같은 자극 뒤에 감각을 낮추고 회복할 시간이 필요한 모습이 두드러졌어요.',
    suggestions: ['하루 한 번 알림과 화면을 끄고 조용한 공간에서 10분 쉬어 보세요.', '사람이 많은 뒤에는 바로 다음 일을 잡지 말고 물을 마시며 감각을 정리해 보세요.'],
    recoveryLevel: 'prepare',
    recoveryHeading: '자극을 낮추는 회복 구간을 만들어 보세요',
    recoveryDescription: '예민함이나 멍함은 생활 맥락에 따라 달라질 수 있어요. GABA의 안정 관련 역할을 알아보면서, 오늘은 자극을 줄이는 적극적인 휴식을 한 번 실험해 보세요.',
  },
  unrested: {
    id: 'unrested',
    name: '회복 우선형',
    description: '답변에서는 잠을 잔 뒤의 회복감을 돌아본 모습이 두드러졌어요. 생활 속 느낌을 바탕으로 한 리듬 이야기예요.',
    suggestions: ['쉬는 공간의 빛·소리·온도가 편안한지 살펴보세요.', '쉬었던 시간과 다음 날의 느낌을 짧게 기록해 나에게 맞는 조건을 찾아보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '회복을 가장 먼저 돌볼 시간이에요',
    recoveryDescription: '아침의 회복감을 돌아본 결과예요. GABA가 안정에 관여하는 물질이라는 설명을 참고하며 수면·휴식 환경부터 적극적으로 살펴보세요.',
  },
  steady: {
    id: 'steady',
    name: '안정 리듬형',
    description: '답변에서는 지금의 생활 리듬과 회복 시간이 비교적 일정한 모습이에요. 건강 상태가 확인되었다는 뜻은 아니에요.',
    suggestions: ['지금 편안하게 이어 가는 습관을 하나 적어 보세요.', '바쁜 날에도 지킬 수 있는 짧은 휴식 시간을 남겨 두세요.'],
    recoveryLevel: 'maintain',
    recoveryHeading: '지금의 안정 루틴을 지켜 보세요',
    recoveryDescription: '현재 답변에서는 큰 회복 공백이 두드러지지 않았어요. 컨디션은 날마다 달라질 수 있으니, GABA와 휴식에 관한 정보를 천천히 살펴보고 나에게 맞는 루틴을 이어 가세요.',
  },
};

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
  const id: RhythmId = maximum <= 1 ? 'steady'
    : scores.unrested === maximum ? 'unrested'
    : scores.sleep === maximum ? 'sleep'
    : scores.active === maximum ? 'active'
    : scores.irregular === maximum ? 'irregular' : 'sensory';

  return {
    type: resultTypes[id],
    scores,
    ruleVersion: '2.0',
    explanation: '최근 7일의 답변을 긴장, 잠자리 전환, 멈춤의 공백, 자극 부담, 아침 회복감 다섯 신호로 나누어 살펴봤어요. 각 신호가 0·1이면 현재 리듬을 이어 가는 쪽, 2·3이면 적극적인 휴식을 먼저 실험해 볼 쪽으로 표시했어요. 가장 큰 신호를 오늘의 회복 초점으로 보여주며, 같은 값이면 아침 회복감, 잠자리 전환, 긴장, 휴식 공백, 자극 부담 순으로 표시해요. 이 규칙은 생활을 돌아보기 위한 편집 기준이며 의학적 진단이나 체내 GABA 측정이 아니에요.',
  };
}
