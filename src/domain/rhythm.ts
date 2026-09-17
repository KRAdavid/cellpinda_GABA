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
    helper: '일과 집안일 사이에 앉아서 쉰 시간이 있었는지 떠올려 보세요.',
    options: [
      { value: 0, label: '대부분의 날 쉬었어요' },
      { value: 1, label: '여러 날 쉬었어요' },
      { value: 2, label: '1~2번만 쉬었어요' },
      { value: 3, label: '거의 쉬지 못했어요' },
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
    prompt: '지난 7일, 충분히 잤는데도 아침에 피곤했나요?',
    helper: '눈을 뜬 뒤 몸과 머리가 무거웠던 날을 떠올려 보세요.',
    options: [
      { value: 0, label: '대부분 개운했어요' },
      { value: 1, label: '여러 날 개운했어요' },
      { value: 2, label: '1~2번만 개운했어요' },
      { value: 3, label: '거의 개운하지 않았어요' },
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
    name: '머리가 계속 바쁜 날',
    description: '일을 마친 뒤에도 할 일이 계속 생각난 날이 많았어요. 뇌가 쉴 틈이 부족했을 수 있습니다.',
    suggestions: ['내일 할 일을 짧게 적고 오늘의 일을 마무리해 보세요.', '저녁에 화면과 알림을 잠시 내려놓는 시간을 정해 보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '뇌 피로가 쌓였을 수 있어요. 오늘은 일을 멈추세요',
    recoveryDescription: '일을 마친 뒤에도 할 일이 계속 생각나면 오늘 저녁 알림을 끄고 10분 쉬어 보세요. GABA는 뇌에서 신경세포 사이의 신호를 조절하는 물질로 알려져 있어요.',
  },
  sleep: {
    id: 'sleep',
    name: '잠들기 어려운 날',
    description: '침대에 누워도 잠들지 못하고 오래 뒤척인 날이 많았어요. 잠들기 전 뇌가 쉬지 못했을 수 있습니다.',
    suggestions: ['잠들기 전 같은 순서로 조명·화면·호흡을 낮추는 루틴을 만들어 보세요.', '잠자리에서 해결할 일은 메모장에 맡기고 내일로 미뤄 보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '잠들기 전 뇌가 쉬는 시간을 먼저 만드세요',
    recoveryDescription: '잠들지 못하는 밤이 반복되면 다음 날까지 피곤함이 이어질 수 있어요. 자기 전 화면을 끄고 조명을 낮춘 뒤 내일 할 일을 메모하고 누워 보세요. GABA는 뇌의 신경세포 사이 신호를 조절하는 물질로 알려져 있어요.',
  },
  irregular: {
    id: 'irregular',
    name: '쉴 틈이 없는 날',
    description: '일과 집안일 사이에 쉬는 시간이 거의 없었어요. 뇌가 쉴 틈 없이 버틴 날이 이어졌을 수 있습니다.',
    suggestions: ['일정표에 5분짜리 멈춤을 하나 넣고 알림을 설정해 보세요.', '휴식 시간에는 화면 대신 물·호흡·창밖 보기처럼 자극이 적은 행동을 골라 보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '뇌 과부하를 막으려면 5분이라도 쉬세요',
    recoveryDescription: '쉬는 시간 없이 계속 버티면 뇌 피로가 더 쌓일 수 있어요. 오늘 일정표에 5분을 비워 물을 마시거나 창밖을 보며 쉬세요. GABA가 신경세포 사이 신호를 조절하는 물질이라는 설명도 확인해 보세요.',
  },
  sensory: {
    id: 'sensory',
    name: '자극이 많은 날',
    description: '사람 많은 곳이나 화면을 본 뒤 짜증 나거나 멍한 시간이 자주 있었어요. 자극 때문에 뇌가 지쳤을 수 있습니다.',
    suggestions: ['하루 한 번 알림과 화면을 끄고 조용한 공간에서 10분 쉬어 보세요.', '사람이 많은 뒤에는 바로 다음 일을 잡지 말고 물을 마시며 감각을 정리해 보세요.'],
    recoveryLevel: 'prepare',
    recoveryHeading: '자극을 계속 받으면 뇌 피로가 커질 수 있어요',
    recoveryDescription: '사람 많은 곳이나 화면을 본 뒤 짜증 나고 멍했다면 다음 일정 사이에 10분을 비워 보세요. 조용한 곳에서 눈과 귀를 쉬게 해야 뇌 과부하를 줄이는 데 도움이 됩니다.',
  },
  unrested: {
    id: 'unrested',
    name: '아침에도 개운하지 않은 날',
    description: '잠을 자고 일어나도 피곤한 날이 많았어요. 자는 동안에도 뇌 피로가 남았을 수 있습니다.',
    suggestions: ['쉬는 공간의 빛·소리·온도가 편안한지 살펴보세요.', '쉬었던 시간과 다음 날의 느낌을 짧게 기록해 나에게 맞는 조건을 찾아보세요.'],
    recoveryLevel: 'prioritize',
    recoveryHeading: '아침 피로가 계속되면 잠자는 환경부터 바꾸세요',
    recoveryDescription: '자고 일어나도 피곤한 날이 이어지면 잠자는 시간과 방의 빛·소리부터 확인해 보세요. 오늘은 잠자리에 드는 시간을 일정하게 맞추고, 자기 전 화면을 줄여 뇌가 쉴 시간을 만들어 보세요.',
  },
  steady: {
    id: 'steady',
    name: '괜찮은 흐름을 이어가는 날',
    description: '최근 일주일은 잠과 쉬는 시간이 비교적 괜찮았어요. 지금 습관을 이어가 뇌 피로가 쌓이지 않게 해보세요.',
    suggestions: ['지금 편안하게 이어 가는 습관을 하나 적어 보세요.', '바쁜 날에도 지킬 수 있는 짧은 휴식 시간을 남겨 두세요.'],
    recoveryLevel: 'maintain',
    recoveryHeading: '지금처럼 쉬는 습관을 계속 지켜 보세요',
    recoveryDescription: '최근 일주일의 잠과 휴식이 비교적 일정했어요. 컨디션은 날마다 달라질 수 있으니 GABA와 휴식에 관한 정보를 살펴보고, 지금 잘 되는 습관을 이어 가세요.',
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
    explanation: '최근 7일의 답변을 다섯 가지 생활 장면으로 나눠 봤어요. 0·1은 지금 습관을 이어가도 좋은 장면, 2·3은 쉬는 시간을 먼저 만들어 볼 장면으로 표시했어요. 가장 자주 불편했던 장면 하나를 오늘의 초점으로 보여줍니다. 이 결과는 생활을 돌아보기 위한 안내이며 건강 상태나 체내 GABA 수치를 알려주는 검사가 아니에요.',
  };
}
