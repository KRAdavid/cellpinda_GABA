/** A reflection on five self-reported habits; never a medical assessment. */
export type AnswerValue = 0 | 1 | 2;
export type RhythmId = 'active' | 'irregular' | 'unrested' | 'steady';

export interface RhythmQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly options: readonly { readonly value: AnswerValue; readonly label: string }[];
}

/** Answer each question about the last seven days, in this exact order. */
export const questions: readonly RhythmQuestion[] = [
  {
    id: 'thoughts',
    prompt: '지난 7일, 하루를 마무리할 때도 할 일에 대한 생각이 이어졌나요?',
    options: [
      { value: 0, label: '거의 없었어요' },
      { value: 1, label: '가끔 그랬어요' },
      { value: 2, label: '자주 그랬어요' },
    ],
  },
  {
    id: 'pause',
    prompt: '지난 7일, 하루 중 하던 일을 멈추고 잠깐 쉬는 시간을 가졌나요?',
    options: [
      { value: 0, label: '대부분의 날에 가졌어요' },
      { value: 1, label: '어떤 날에는 가졌어요' },
      { value: 2, label: '거의 갖지 못했어요' },
    ],
  },
  {
    id: 'schedule',
    prompt: '지난 7일, 잠자리에 들고 일어나는 시간은 일정했나요?',
    options: [
      { value: 0, label: '대체로 일정했어요' },
      { value: 1, label: '어떤 날에는 달랐어요' },
      { value: 2, label: '날마다 많이 달랐어요' },
    ],
  },
  {
    id: 'switch-off',
    prompt: '지난 7일, 중요한 일이 끝나도 그 일에서 생각을 돌리기 어려웠나요?',
    options: [
      { value: 0, label: '거의 없었어요' },
      { value: 1, label: '가끔 그랬어요' },
      { value: 2, label: '자주 그랬어요' },
    ],
  },
  {
    id: 'refresh',
    prompt: '지난 7일, 아침에 일어났을 때 개운하다고 느꼈나요?',
    options: [
      { value: 0, label: '대부분의 날에 그랬어요' },
      { value: 1, label: '어떤 날에는 그랬어요' },
      { value: 2, label: '거의 그렇지 않았어요' },
    ],
  },
];

export interface RhythmType {
  readonly id: RhythmId;
  readonly name: string;
  readonly description: string;
  readonly suggestions: readonly string[];
}

export const resultTypes: Readonly<Record<RhythmId, RhythmType>> = {
  active: {
    id: 'active',
    name: '계속 작동형',
    description: '답변에서는 하루가 끝난 뒤에도 일에 대한 생각이 이어지는 모습이 두드러졌어요.',
    suggestions: ['내일 할 일을 짧게 적고 오늘의 일을 마무리해 보세요.', '저녁에 화면을 잠시 내려놓는 시간을 정해 보세요.'],
  },
  irregular: {
    id: 'irregular',
    name: '리듬 불균형형',
    description: '답변에서는 쉬는 시간이나 하루의 시간표가 일정하지 않은 모습이 두드러졌어요.',
    suggestions: ['일정표에 짧은 휴식 시간을 하나 넣어 보세요.', '내 생활에 맞는 기상 시간을 정해 기록해 보세요.'],
  },
  unrested: {
    id: 'unrested',
    name: '회복 부족형',
    description: '답변에서는 아침의 개운함이 적었다는 응답이 두드러졌어요. 실제 회복 능력을 측정한 결과는 아니에요.',
    suggestions: ['쉬는 공간의 빛과 소리가 편안한지 살펴보세요.', '쉬었던 시간과 아침의 느낌을 짧게 기록해 보세요.'],
  },
  steady: {
    id: 'steady',
    name: '안정 리듬형',
    description: '답변에서는 현재 생활 리듬이 비교적 일정한 모습이에요. 건강 상태가 확인되었다는 뜻은 아니에요.',
    suggestions: ['지금 편안하게 이어 가는 습관을 하나 적어 보세요.', '바쁜 날에도 지킬 수 있는 짧은 휴식 시간을 남겨 두세요.'],
  },
};

export interface RhythmResult {
  readonly type: RhythmType;
  /** Internal rule values, not GABA levels, severity, risk, or clinical scores. */
  readonly scores: { readonly active: number; readonly irregular: number; readonly unrested: number };
  readonly explanation: string;
  readonly ruleVersion: '1.0';
}

/**
 * Requires exactly five integer answers (0, 1, 2) in questions order.
 * Throws TypeError on invalid, incomplete or sparse input; never mutates input.
 * Rule: active=q1+q4, irregular=q2+q3, unrested=2*q5, each 0..4.
 * All three <=1: steady. Otherwise highest wins; ties: unrested > active > irregular.
 * Weights and tie order are editorial choices, not validated clinical thresholds.
 * No product, dosage, deficiency or illness inference is performed.
 */
export function classifyRhythm(answers: readonly number[]): RhythmResult {
  if (!Array.isArray(answers) || answers.length !== 5 ||
    Array.from({ length: 5 }, (_, index) => answers[index])
      .some(value => !Number.isInteger(value) || value < 0 || value > 2)) {
    throw new TypeError('리듬 체크는 다섯 문항에 각각 0, 1, 2 중 하나로 답해야 합니다.');
  }

  const scores = {
    active: answers[0]! + answers[3]!,
    irregular: answers[1]! + answers[2]!,
    unrested: answers[4]! * 2,
  };
  const maximum = Math.max(scores.active, scores.irregular, scores.unrested);
  const id: RhythmId = maximum <= 1 ? 'steady'
    : scores.unrested === maximum ? 'unrested'
    : scores.active === maximum ? 'active' : 'irregular';

  return {
    type: resultTypes[id],
    scores,
    ruleVersion: '1.0',
    explanation: '최근 7일의 답변을 묶은 생활 돌아보기예요. 계속 생각하기는 1·4번의 합, 시간표는 2·3번의 합, 아침 느낌은 5번의 두 배로 비교했어요. 세 값이 모두 1 이하면 안정 리듬형, 그 외에는 가장 큰 값으로 정했어요. 같은 값이면 아침 느낌, 계속 생각하기, 시간표 순으로 표시해요. 가중치와 동점 순서는 이 콘텐츠의 편집 규칙이며, 의학적 진단이나 체내 GABA 측정이 아니에요.',
  };
}
