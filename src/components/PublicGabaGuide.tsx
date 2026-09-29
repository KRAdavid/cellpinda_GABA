import { useEffect, useState, type CSSProperties } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  FlaskConical,
  Globe2,
  Menu,
  Moon,
  Network,
  Pause,
  Play,
  Share2,
  ShieldCheck,
  Sparkles,
  Sprout,
  X,
} from 'lucide-react';
import gabaFermentationEditorial from '../assets/gaba-fermentation-editorial.jpg';
import gabaNaturalHero from '../assets/gaba-natural-hero.jpg';
import gabaSleepEditorial from '../assets/gaba-sleep-editorial.jpg';
import './PublicGabaGuide.css';

type EvidenceTone = 'established' | 'human' | 'early' | 'mixed';

type EverydayTopic = {
  id: string;
  title: string;
  body: string;
  icon: 'moon' | 'sparkles' | 'focus' | 'movement' | 'sense';
};

type ResearchTopic = {
  id: string;
  title: string;
  english: string;
  tone: EvidenceTone;
  label: string;
  study: string;
  finding: string;
  interpretation: string;
  source: { label: string; url: string };
  chart: ResearchChart;
};

type ResearchComparison = {
  label: string;
  reference: string;
  result: string;
  visual: 'result-less' | 'result-more';
};

type ResearchSignal = {
  label: string;
  value: string;
  direction: 'up' | 'down';
};

type ResearchChart =
  | { kind: 'comparison'; title: string; note: string; rows: ResearchComparison[] }
  | { kind: 'metrics'; title: string; note: string; metrics: { label: string; value: string; note: string }[] }
  | { kind: 'signals'; title: string; note: string; rows: ResearchSignal[] };

type HistoryMilestone = {
  year: string;
  title: string;
  body: string;
  source: { label: string; url: string };
};

type ResearchScaleStat = {
  value: string;
  label: string;
  detail: string;
  scale: number;
  source: { label: string; url: string };
};

type ApplicationCase = {
  id: string;
  region: string;
  title: string;
  body: string;
  detail: string;
  icon: 'book' | 'sprout' | 'globe';
  sources: { label: string; url: string }[];
};

type FermentedSafetyStep = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: 'ferment' | 'quality' | 'human';
  source: { label: string; url: string };
};

type ExpertVideo = {
  id: string;
  title: string;
  topic: string;
  channel: string;
};

const everydayTopics: EverydayTopic[] = [
  { id: 'sleep', title: '잠들 때', body: '각성과 휴식의 리듬을 바꾸는 신경회로가 움직입니다.', icon: 'moon' },
  { id: 'stress', title: '긴장되는 순간', body: '과도한 신호를 낮추고 균형을 찾는 과정이 시작됩니다.', icon: 'sparkles' },
  { id: 'focus', title: '필요한 정보에 집중할 때', body: '필요한 신호와 덜 필요한 신호를 나누는 조절이 일어납니다.', icon: 'focus' },
  { id: 'movement', title: '몸을 움직이고 멈출 때', body: '활성화와 억제가 맞물려 부드러운 움직임을 만듭니다.', icon: 'movement' },
  { id: 'sense', title: '감각 정보를 구분할 때', body: '들어오는 소리와 촉감을 같은 강도로 처리하지 않습니다.', icon: 'sense' },
];

const recoveryCards = [
  {
    eyebrow: '01 · 낮과 밤',
    title: '낮에는 몸을 쓰고, 밤에는 몸을 돌봅니다',
    body: '낮에는 움직이고 일하며 에너지를 씁니다. 밤이 되면 뇌는 하루 동안 쌓인 정보를 정리하고 몸은 회복을 이어갑니다.',
    tone: 'night',
  },
  {
    eyebrow: '02 · 잠의 역할',
    title: '잠은 멈춰 있는 시간이 아니라, 다음 날을 준비하는 시간입니다',
    body: '잠든 동안 뇌와 몸은 쉬면서 다음 날의 집중과 움직임을 준비합니다. 수면의 질이 하루의 컨디션과 연결되는 이유입니다.',
    tone: 'recovery',
  },
  {
    eyebrow: '03 · 회복의 속도',
    title: '수면의 질이 떨어지면 회복의 속도도 달라집니다',
    body: '잠이 얕거나 자주 깨는 밤이 이어지면, 충분히 잔 것 같은데도 다음 날 회복감과 활력이 무겁게 느껴집니다.',
    tone: 'recovery',
  },
  {
    eyebrow: '04 · 밤의 긴장',
    title: '밤에도 긴장이 남아 있으면 잠들기 어렵습니다',
    body: '스트레스가 계속되거나 뇌의 각성 상태가 높아지면, 몸은 쉽게 휴식 모드로 전환되지 않습니다.',
    tone: 'stress',
  },
  {
    eyebrow: '05 · 다음 날',
    title: '수면의 흐름은 다음 날까지 이어집니다',
    body: '잠을 제대로 쉬지 못한 날에는 머리가 무겁고 집중이 오래 유지되지 않으며, 몸의 회복도 더디게 느껴집니다.',
    tone: 'morning',
  },
  {
    eyebrow: '06 · 반복되는 고리',
    title: '피곤함과 예민함은 서로를 키우는 고리가 됩니다',
    body: '잠을 못 자서 지치고, 지쳐서 더 예민해지고, 예민해져 다시 잠들기 어려워집니다.',
    tone: 'loop',
  },
  {
    eyebrow: '07 · 노화의 언어',
    title: '노화는 나이를 먹는 것만을 뜻하지 않습니다',
    body: '몸이 손상을 회복하고 균형을 되찾는 속도가 조금씩 느려지는 과정이기도 합니다.',
    tone: 'age',
  },
  {
    eyebrow: '08 · GABA를 읽는 시작점',
    title: '그래서 수면과 회복의 리듬을 이해해야 합니다',
    body: '잠들고 깨어나는 신경계의 조절을 이해하면, GABA가 왜 중요한 연구 주제인지 더 선명해집니다.',
    tone: 'age',
  },
] as const;

const researchTopics: ResearchTopic[] = [
  {
    id: 'cognition',
    title: '인지',
    english: 'Cognition & focus',
    tone: 'human',
    label: '사람 63명 · 무작위 교차시험',
    study: '건강한 성인 63명이 GABA 100mg 또는 위약을 먹고 정신적 부담이 있는 과제를 수행한 무작위·위약 대조 교차시험입니다.',
    finding: '같은 과제를 마친 뒤에도 GABA 섭취 조건에서는 뇌파와 활력감의 감소 폭이 비교 조건보다 작게 기록되었습니다. 연구진은 이를 정신적 스트레스 반응이 완화된 결과로 해석했습니다.',
    interpretation: '이 연구가 직접 본 결과는 기억력 향상이나 치매 개선이 아니라, 정신적 스트레스 상황에서의 뇌파와 기분 변화입니다.',
    source: { label: 'Yoto et al. 2012 · PMID 22203366', url: 'https://pubmed.ncbi.nlm.nih.gov/22203366/' },
    chart: {
      kind: 'comparison',
      title: '머리를 많이 쓴 뒤 변화 방향',
      note: '비교 조건과 GABA 조건의 변화 방향을 한눈에 보여줍니다.',
      rows: [
        { label: '뇌파 변화', reference: '더 크게 줄어듦', result: '덜 줄어듦', visual: 'result-less' },
        { label: '활력 설문', reference: '더 크게 줄어듦', result: '덜 줄어듦', visual: 'result-less' },
      ],
    },
  },
  {
    id: 'skin',
    title: '피부',
    english: 'Skin & barrier',
    tone: 'early',
    label: '털 없는 생쥐 피부·사람 각질형성세포',
    study: '피부 장벽을 손상시킨 털 없는 생쥐에 GABA를 바르고, 사람 각질형성세포에서도 GABA 수용체 반응을 살펴본 실험입니다.',
    finding: 'GABA를 바른 피부는 장벽 회복이 빨라졌고, 건조 환경에서 장벽 손상 뒤 나타난 표피 과형성이 줄었습니다.',
    interpretation: '피부 연구에서 측정된 결과는 피부 장벽 회복과 표피 반응이며, 사람의 피부 탄력이나 주름을 측정한 시험은 아닙니다.',
    source: { label: 'Denda et al. 2002 · PMID 12445190', url: 'https://pubmed.ncbi.nlm.nih.gov/12445190/' },
    chart: {
      kind: 'comparison',
      title: '피부 장벽에서 보인 변화',
      note: '피부 장벽 실험에서 관찰된 두 가지 결과를 정리했습니다.',
      rows: [
        { label: '장벽 회복', reference: '느리게 회복', result: '빠르게 회복', visual: 'result-more' },
        { label: '표피 과형성', reference: '더 크게 나타남', result: '줄어듦', visual: 'result-less' },
      ],
    },
  },
  {
    id: 'muscle',
    title: '근육',
    english: 'Muscle & movement',
    tone: 'human',
    label: '저항운동 경험 남성 11명 · 교차시험',
    study: '저항운동 경험이 있는 남성 11명이 GABA 3g 또는 위약을 먹은 뒤 쉬거나 저항운동을 하고, 90분 동안 혈액 속 성장호르몬을 측정한 이중맹검 교차시험입니다.',
    finding: '휴식 조건에서 GABA의 성장호르몬 최고치는 위약보다 약 400%, 총 반응량은 약 375% 높았습니다. 운동 조건에서도 섭취 30분 뒤 GABA군의 반응이 운동 위약군보다 높았습니다.',
    interpretation: '이 연구가 측정한 것은 혈액 속 성장호르몬 반응이며, 근육 크기·근력·체력 향상은 측정하지 않았습니다.',
    source: { label: 'Powers et al. 2008 · PMID 18091016', url: 'https://pubmed.ncbi.nlm.nih.gov/18091016/' },
    chart: {
      kind: 'metrics',
      title: '성장호르몬 반응',
      note: '휴식 조건에서 위약 대비 연구에 기록된 값입니다. 운동 조건에서도 섭취 30분 뒤 더 높았습니다.',
      metrics: [
        { label: '최고치', value: '약 +400%', note: '위약 대비' },
        { label: '총 반응량', value: '약 +375%', note: '위약 대비' },
      ],
    },
  },
  {
    id: 'growth-hormone',
    title: '성장호르몬',
    english: 'Growth hormone',
    tone: 'early',
    label: '청소년기 생쥐 · 16주 섭취시험',
    study: '청소년기 수컷·암컷 생쥐에 GABA를 16주 동안 먹이고 몸길이, 체지방 지표, 뇌하수체와 혈청의 성장호르몬을 측정한 동물시험입니다.',
    finding: 'GABA군 수컷 생쥐의 몸길이는 대조군보다 길었고, 수컷의 체지방 지표는 낮았습니다. 뇌하수체 성장호르몬 단백질은 암수 모두에서 증가했고, 혈청 성장호르몬은 수컷에서 증가했습니다.',
    interpretation: '이 결과는 청소년기 생쥐의 성장·성장호르몬 변화입니다. 어린이의 키 성장이나 성인의 최종 신장을 측정한 결과는 아닙니다.',
    source: { label: '청소년기 생쥐 성장 연구 · PMID 40431374', url: 'https://pubmed.ncbi.nlm.nih.gov/40431374/' },
    chart: {
      kind: 'signals',
      title: '성장 관련 지표 변화',
      note: '청소년기 생쥐 연구에서 기록된 변화 방향을 정리했습니다.',
      rows: [
        { label: '수컷 몸길이', value: '더 길게', direction: 'up' },
        { label: '수컷 체지방 지표', value: '낮게', direction: 'down' },
        { label: '뇌하수체 성장호르몬 단백질', value: '증가', direction: 'up' },
        { label: '혈청 성장호르몬', value: '수컷에서 증가', direction: 'up' },
      ],
    },
  },
  {
    id: 'immune',
    title: '면역',
    english: 'Neuroimmune balance',
    tone: 'human',
    label: '사람 스트레스 실험 · IgA 측정',
    study: '건강한 성인 13명의 뇌파 실험과 고소공포증 성인 8명의 현수교 스트레스 실험으로, GABA 섭취 뒤 뇌파와 침 속 면역글로불린 A(IgA)를 측정했습니다.',
    finding: '섭취 60분 뒤 GABA군은 물·L-테아닌군보다 알파파가 증가하고 베타파가 감소했습니다. 현수교 스트레스 상황에서는 GABA군의 침 속 IgA가 위약군보다 높게 유지됐습니다.',
    interpretation: '이 연구가 직접 측정한 것은 스트레스 상황의 뇌파와 침 속 IgA이며, 감염 예방률이나 질병 치료율은 측정하지 않았습니다.',
    source: { label: 'Abdou et al. 2006 · PMID 16971751', url: 'https://pubmed.ncbi.nlm.nih.gov/16971751/' },
    chart: {
      kind: 'signals',
      title: '긴장 상황에서 측정한 지표',
      note: '섭취 뒤 뇌파와 침 속 면역 관련 지표에서 나타난 변화를 정리했습니다.',
      rows: [
        { label: '알파파', value: '증가', direction: 'up' },
        { label: '베타파', value: '감소', direction: 'down' },
        { label: '침 속 IgA', value: '더 높게 유지', direction: 'up' },
      ],
    },
  },
];

const historyMilestones: HistoryMilestone[] = [
  {
    year: '1950',
    title: '뇌 속에서 처음 확인되다',
    body: '유진 로버츠와 샘 프랭클은 포유류 뇌에서 정체를 알 수 없던 물질을 찾아냈고, 그것이 GABA이며 글루탐산에서 만들어진다는 사실을 보고했습니다.',
    source: { label: 'Roberts & Frankel · JBC · PMID 14794689', url: 'https://pubmed.ncbi.nlm.nih.gov/14794689/' },
  },
  {
    year: '1957',
    title: '신경 신호의 기능이 드러나다',
    body: '뇌와 척수 추출물에서 신경 활동을 낮추던 Factor I가 GABA로 확인되면서, GABA는 뇌가 신호를 조절하는 방식과 연결되기 시작했습니다.',
    source: { label: 'Florey · GABA: history and perspectives · PMID 1954562', url: 'https://pubmed.ncbi.nlm.nih.gov/1954562/' },
  },
  {
    year: '오늘',
    title: '하나의 물질에서 넓은 연구 지도로',
    body: 'GABA 연구는 신경계의 기본 작동을 넘어 수면, 긴장, 집중, 감각, 움직임과 피부·근육·성장·면역 연구로 계속 확장되고 있습니다.',
    source: { label: 'The discovery of GABA in the brain · JBC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6295731/' },
  },
];

const academicFields = [
  { title: '신경계의 균형', body: 'GABA는 뇌와 척수에서 신경세포의 활동을 조절하는 주요 억제성 신호로 연구됩니다.' },
  { title: '수면과 휴식', body: '잠들고 깨어나는 리듬, 수면 단계와 휴식의 질을 설명하는 연구에 연결됩니다.' },
  { title: '집중과 감정', body: '필요한 정보에 집중하고 긴장 속에서 신호를 정리하는 과정과 함께 살펴봅니다.' },
  { title: '감각과 움직임', body: '소리와 촉감 같은 감각을 구분하고, 움직임을 시작하고 멈추는 회로에 관여합니다.' },
  { title: '몸 전체로 넓어지는 연구', body: '피부 장벽, 근육과 성장호르몬, 성장 지표, 스트레스 관련 면역 지표까지 연구 범위가 이어집니다.' },
];

const applicationCases: ApplicationCase[] = [
  {
    id: 'korea',
    region: 'KOREA · FERMENTATION',
    title: '발효식품과 유산균',
    body: '국내 연구진은 김치 등 발효식품에서 GABA를 만드는 유산균을 찾고, 식품 발효 조건을 조절하는 연구를 이어왔습니다.',
    detail: 'GABA는 발효를 통해 식품 속에서 만들어지는 아미노산이라는 관점으로 확장됩니다.',
    icon: 'book',
    sources: [{ label: 'Yeungnam University 연구진 · GABA 생산 미생물 리뷰', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3769009/' }],
  },
  {
    id: 'japan',
    region: 'JAPAN · GERMINATED GRAINS',
    title: '발아현미와 기능성 식품',
    body: '일본에서는 발아 처리로 현미의 GABA 함량을 높이는 식품 연구가 진행됐고, 기능성 표시 식품의 과학적 근거를 공개하는 체계도 운영됩니다.',
    detail: '발아·가공·표시라는 식품의 전체 흐름에서 GABA가 다뤄집니다.',
    icon: 'sprout',
    sources: [
      { label: '일본 농림수산성 · 발아현미와 GABA', url: 'https://www.maff.go.jp/j/syouan/keikaku/soukatu/okome_summary/04/functio_nality_08.html' },
      { label: '일본 소비자청 · 기능성 표시 식품 검색', url: 'https://www.caa.go.jp/policies/policy/food_labeling/foods_with_function_claims/search' },
    ],
  },
  {
    id: 'global',
    region: 'GLOBAL · FOOD SCIENCE',
    title: '곡류·빵·유제품·음료',
    body: '세계 식품과학 연구에서는 유산균 발효를 활용해 곡류, 빵, 유제품, 음료 등 다양한 식품에 GABA를 적용하는 방법을 탐색합니다.',
    detail: 'GABA는 신경과학의 물질에서 식품공학과 발효기술의 연구 소재로도 이어집니다.',
    icon: 'globe',
    sources: [{ label: 'Food & Function · LAB 발효와 GABA 응용 리뷰', url: 'https://pubs.rsc.org/ga/content/articlelanding/2023/fo/d2fo03936b' }],
  },
];

const researchScaleStats: ResearchScaleStat[] = [
  {
    value: '984',
    label: '하버드',
    detail: 'GABA 문헌 · PubMed',
    scale: 8,
    source: {
      label: 'PubMed 검색',
      url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%28%28GABA%5BTitle%2FAbstract%5D%29+OR+%28%22gamma-aminobutyric+acid%22%5BTitle%2FAbstract%5D%29%29+AND+%28Harvard%5BAffiliation%5D+OR+%22Harvard+Medical+School%22%5BAffiliation%5D%29',
    },
  },
  {
    value: '557',
    label: '옥스퍼드',
    detail: 'GABA 문헌 · PubMed',
    scale: 5,
    source: {
      label: 'PubMed 검색',
      url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%28%28GABA%5BTitle%2FAbstract%5D%29+OR+%28%22gamma-aminobutyric+acid%22%5BTitle%2FAbstract%5D%29%29+AND+%28Oxford%5BAffiliation%5D+OR+%22University+of+Oxford%22%5BAffiliation%5D%29',
    },
  },
  {
    value: '12,124',
    label: 'GABA-A · SCIE',
    detail: 'WoS Core Collection · 1999–2022',
    scale: 100,
    source: {
      label: 'GABA-A 연구 분석',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10289248/',
    },
  },
];

const readingChapters = [
  { id: 'top', label: '도입' },
  { id: 'history', label: '발견의 순간' },
  { id: 'basics', label: 'GABA란' },
  { id: 'academic', label: '연구 지도' },
  { id: 'everyday', label: '일상의 순간' },
  { id: 'sleep', label: '수면 연구' },
  { id: 'research', label: '다섯 연구 영역' },
  { id: 'applications', label: '국내외 활용' },
  { id: 'fermented-safety', label: '발효·안전' },
  { id: 'growth', label: '성장 연구' },
  { id: 'expert-videos', label: '전문가 영상' },
  { id: 'final', label: '공유하기' },
] as const;
type ReadingChapterId = (typeof readingChapters)[number]['id'];

const fermentedSafetySteps: FermentedSafetyStep[] = [
  {
    number: '01',
    eyebrow: 'FERMENTATION',
    title: '유산균이 만드는 GABA',
    body: '유산균은 발효 과정에서 L-글루탐산을 GABA로 바꾸는 경로를 만들 수 있습니다. 김치와 발효식품 연구가 이 출발점을 보여줍니다.',
    icon: 'ferment',
    source: { label: '발효식품 속 GABA 생산 미생물 리뷰', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3769009/' },
  },
  {
    number: '02',
    eyebrow: 'QUALITY & PROCESS',
    title: '균주부터 최종 원료까지',
    body: '공개된 식품 원료 자료에서는 발효 균주, 제조공정, 최종 원료의 품질 항목을 함께 검토합니다. 발효 GABA가 식품공학의 연구 소재가 된 이유입니다.',
    icon: 'quality',
    source: { label: '미국 FDA 공개 GRAS Notice 595', url: 'https://www.fda.gov/files/food/published/GRAS-Notice-000595--Gamma-Aminobutyric-Acid-(GABA).pdf' },
  },
  {
    number: '03',
    eyebrow: 'HUMAN STUDY',
    title: '사람에게서 남은 안전성 기록',
    body: '발효 현미 유래 GABA를 섭취한 성인 40명 대상 4주 무작위·위약 대조 시험에서는 중대한 이상반응 없이 관찰됐습니다.',
    icon: 'human',
    source: { label: 'Byun et al. 2018 · PMID 29856155', url: 'https://pubmed.ncbi.nlm.nih.gov/29856155/' },
  },
];

const expertVideos: ExpertVideo[] = [
  { id: 'RLAU1VWGsaI', title: 'GABA와 수면 리듬', topic: '수면', channel: '교육하는 의사! 이동환TV' },
  { id: 'Cnk0PGn9YBM', title: '갱년기와 잠, GABA 질문', topic: '수면', channel: '셀럽의 건강비결' },
  { id: 'roEtojyk9_0', title: '잠이 안 올 때 GABA 이야기', topic: '수면', channel: '여에스더의 에스더TV' },
  { id: 'BiZXS_ojLUA', title: '불면과 GABA의 관계', topic: '수면', channel: '브레인튜브 Brain Doctor' },
  { id: 'rOFkZg09AoY', title: 'GABA 섭취 연구 읽기', topic: '연구 읽기', channel: 'SLEEP Dr. 신원철 꿀잠튜브' },
  { id: '4xGSHxkMYew', title: 'GABA의 기본 역할', topic: 'GABA란', channel: '비엠한방내과 [bm_k_clinic]' },
  { id: '7Zsxm9Wh2Yg', title: '자율신경과 GABA 식품', topic: '자율신경', channel: '30년 자율신경, 정이안한의원TV' },
  { id: 'vnocd9ZVJj0', title: 'GABA 수용체와 수면', topic: '수용체', channel: '영양과학자 양과자' },
];

const growthSteps = ['GABA 연구', '수면 및 신경 조절', '성장호르몬 반응', '체성분과 성장 관련 지표', '성장기 동물 연구', '어린이 대상 연구'];
const messageKit = [
  'GABA는 우리 몸에서 만들어지는 신경전달물질입니다.',
  'GABA는 신경세포의 활동 균형을 조절하는 핵심 신호입니다.',
  'GABA는 수면·긴장·집중·감각·운동과 연결됩니다.',
  'GABA 연구는 피부·인지·근육·성장·면역으로 확장되고 있습니다.',
  '발효 GABA는 발효 원리와 품질 관리, 사람 대상 섭취 연구가 함께 쌓인 식품 연구 소재입니다.',
];

const evidenceLabels: Record<EvidenceTone, { text: string; className: string }> = {
  established: { text: '기본 생리학', className: 'is-established' },
  human: { text: '사람 대상 연구', className: 'is-human' },
  early: { text: '확장 연구', className: 'is-early' },
  mixed: { text: '연구 흐름', className: 'is-mixed' },
};

function TopicIcon({ type }: { type: EverydayTopic['icon'] }) {
  if (type === 'moon') return <Moon aria-hidden="true" />;
  if (type === 'sparkles') return <Sparkles aria-hidden="true" />;
  if (type === 'movement') return <Network aria-hidden="true" />;
  if (type === 'sense') return <CircleHelp aria-hidden="true" />;
  return <FocusIcon />;
}

function FocusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="guide-icon-svg">
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ApplicationIcon({ type }: { type: ApplicationCase['icon'] }) {
  if (type === 'sprout') return <Sprout aria-hidden="true" />;
  if (type === 'globe') return <Globe2 aria-hidden="true" />;
  return <BookOpen aria-hidden="true" />;
}

function FermentedSafetyIcon({ type }: { type: FermentedSafetyStep['icon'] }) {
  if (type === 'ferment') return <Sprout aria-hidden="true" />;
  if (type === 'quality') return <FlaskConical aria-hidden="true" />;
  return <ShieldCheck aria-hidden="true" />;
}

function NeuronNetwork() {
  return (
    <div className="guide-neuron-visual" aria-label="신경세포 사이를 오가는 GABA 신호를 단순화한 그림" role="img">
      <div className="guide-neuron-halo guide-neuron-halo-one" />
      <div className="guide-neuron-halo guide-neuron-halo-two" />
      <svg viewBox="0 0 620 460" aria-hidden="true">
        <defs>
          <radialGradient id="gaba-node" cx="50%" cy="40%"><stop offset="0" stopColor="#65d4d1" /><stop offset="1" stopColor="#15979f" /></radialGradient>
          <linearGradient id="neuron-line" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b7d9e7" /><stop offset="1" stopColor="#6a9ec2" /></linearGradient>
        </defs>
        <g fill="none" stroke="url(#neuron-line)" strokeLinecap="round">
          <path d="M158 258C105 192 115 102 58 60M158 258C92 259 55 302 34 358M158 258C123 331 147 391 117 433M158 258C219 213 252 177 271 99M158 258C226 279 261 329 320 353" strokeWidth="6" />
          <path d="M418 183C472 132 541 133 602 75M418 183C498 193 544 238 592 301M418 183C423 115 399 76 409 22M418 183C364 169 341 121 310 80M418 183C485 298 464 360 508 430" strokeWidth="6" />
          <path d="M247 233C306 210 348 203 418 183" strokeWidth="9" />
          <path d="M273 255C330 258 352 266 412 243" strokeWidth="3" opacity=".7" />
        </g>
        <g fill="#d1e8ef" stroke="#8bb9ce" strokeWidth="4"><circle cx="158" cy="258" r="46" /><circle cx="418" cy="183" r="55" /></g>
        <circle cx="158" cy="258" r="18" fill="#7aa6c4" opacity=".8" /><circle cx="418" cy="183" r="24" fill="url(#gaba-node)" />
        <g fill="#1eabb0"><circle cx="301" cy="224" r="7" /><circle cx="337" cy="210" r="5" /><circle cx="357" cy="226" r="6" /><circle cx="383" cy="203" r="4" /></g>
        <g fill="#f5b967"><circle cx="267" cy="197" r="5" /><circle cx="290" cy="181" r="4" /><circle cx="350" cy="190" r="4" /></g>
      </svg>
      <span className="guide-neuron-label guide-neuron-label-left">신호를 전달하는<br />신경세포</span>
      <span className="guide-neuron-label guide-neuron-label-right">GABA<br /><small>신경 활동 조절</small></span>
      <span className="guide-neuron-caption">복잡한 신호 사이에서<br />필요한 만큼 조절하기</span>
    </div>
  );
}

function EvidenceBadge({ tone, label }: { tone: EvidenceTone; label?: string }) {
  const evidence = evidenceLabels[tone];
  return <span className={`guide-evidence ${evidence.className}`}><i aria-hidden="true" />{label || evidence.text}</span>;
}

function ResearchGlyph({ id }: { id: string }) {
  return (
    <div className={`guide-research-glyph glyph-${id}`} aria-hidden="true">
      {id === 'cognition' && <><span /><span /><span /><span /></>}
      {id === 'growth-hormone' && <><span /><span /></>}
      {id === 'muscle' && <><span /><span /><span /></>}
      {id === 'immune' && <><span /><span /><span /><span /><span /></>}
      {id === 'skin' && <><span /><span /></>}
    </div>
  );
}

function ResearchOutcomeChart({ topic }: { topic: ResearchTopic }) {
  const chartId = `research-chart-${topic.id}`;
  return (
    <figure className={`guide-outcome-chart guide-outcome-chart-${topic.chart.kind}`} aria-labelledby={`${chartId}-title`}>
      <div className="guide-outcome-chart-head">
        <figcaption id={`${chartId}-title`}>{topic.chart.title}</figcaption>
        <span>연구 결과 한눈에</span>
      </div>
      {topic.chart.kind === 'comparison' ? (
        <div className="guide-outcome-comparison" role="img" aria-label={`${topic.chart.title}. 비교 조건과 GABA 조건의 결과 방향 비교`}>
          <div className="guide-outcome-comparison-head"><span>측정 지표</span><span>비교 조건</span><span>GABA</span></div>
          <div className="guide-outcome-comparison-list">
            {topic.chart.rows.map((row) => (
              <div className={`guide-outcome-comparison-row ${row.visual}`} key={row.label}>
                <strong>{row.label}</strong>
                <div className="guide-outcome-cell is-reference"><span>{row.reference}</span><i aria-hidden="true"><b /></i></div>
                <div className="guide-outcome-cell is-result"><span>{row.result}</span><i aria-hidden="true"><b /></i></div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {topic.chart.kind === 'metrics' ? (
        <div className="guide-outcome-metrics" role="img" aria-label={`${topic.chart.title}. ${topic.chart.metrics.map((metric) => `${metric.label} ${metric.value}`).join(', ')}`}>
          {topic.chart.metrics.map((metric) => (
            <div className="guide-outcome-metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </div>
          ))}
        </div>
      ) : null}
      {topic.chart.kind === 'signals' ? (
        <div className="guide-outcome-signals" role="img" aria-label={`${topic.chart.title}. ${topic.chart.rows.map((row) => `${row.label} ${row.value}`).join(', ')}`}>
          {topic.chart.rows.map((row) => (
            <div className="guide-outcome-signal-row" key={row.label}>
              <span>{row.label}</span>
              <strong className={`is-${row.direction}`}>
                {row.direction === 'up' ? <ArrowUpRight size={15} aria-hidden="true" /> : <ArrowDownRight size={15} aria-hidden="true" />}
                {row.value}
              </strong>
            </div>
          ))}
        </div>
      ) : null}
      <p className="guide-outcome-chart-note">{topic.chart.note}</p>
    </figure>
  );
}

export default function PublicGabaGuide() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const [activeVideoId, setActiveVideoId] = useState(expertVideos[0].id);
  const [activeChapterId, setActiveChapterId] = useState<ReadingChapterId>(readingChapters[0].id);
  const [activeRecoveryCard, setActiveRecoveryCard] = useState(0);
  const [recoveryPaused, setRecoveryPaused] = useState(false);
  const [recoveryReducedMotion, setRecoveryReducedMotion] = useState(false);
  const activeVideo = expertVideos.find((video) => video.id === activeVideoId) ?? expertVideos[0];
  const activeChapterIndex = Math.max(0, readingChapters.findIndex((chapter) => chapter.id === activeChapterId));
  const activeChapter = readingChapters[activeChapterIndex];
  const recoveryCard = recoveryCards[activeRecoveryCard];

  useEffect(() => {
    document.title = '1950년의 발견, 발효와 연구로 이어진 GABA | GABA Guide';
    const description = '1950년 뇌 속에서 발견된 GABA의 역사부터 신경계 연구, 국내외 활용과 발효 GABA의 안전성 기록까지 쉽게 읽는 공개 안내서입니다.';
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = window.location.href.split('?')[0].split('#')[0];
    const targetId = window.location.hash.slice(1);
    if (targetId) requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' })));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotion = () => setRecoveryReducedMotion(mediaQuery.matches);
    syncReducedMotion();
    mediaQuery.addEventListener?.('change', syncReducedMotion);
    return () => mediaQuery.removeEventListener?.('change', syncReducedMotion);
  }, []);

  useEffect(() => {
    if (recoveryPaused || recoveryReducedMotion) return;
    const intervalId = window.setInterval(() => {
      setActiveRecoveryCard((current) => (current + 1) % recoveryCards.length);
    }, 2000);
    return () => window.clearInterval(intervalId);
  }, [recoveryPaused, recoveryReducedMotion]);

  useEffect(() => {
    let frame = 0;
    const updateReadingChapter = () => {
      const readingPoint = window.scrollY + Math.min(window.innerHeight * 0.3, 260);
      let currentChapter: ReadingChapterId = readingChapters[0].id;
      for (const chapter of readingChapters) {
        const section = document.getElementById(chapter.id);
        if (section && section.offsetTop <= readingPoint) currentChapter = chapter.id;
      }
      setActiveChapterId((previous) => previous === currentChapter ? previous : currentChapter);
    };
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateReadingChapter();
      });
    };
    updateReadingChapter();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollTo = (id: string, hash = id) => {
    setMenuOpen(false);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
    window.history.replaceState(null, '', `#${hash}`);
  };

  const selectExpertVideo = (id: string) => {
    setActiveVideoId(id);
    if (window.matchMedia('(max-width: 700px)').matches) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      requestAnimationFrame(() => document.getElementById('expert-video-feature')?.scrollIntoView({ behavior, block: 'start' }));
    }
  };

  const moveRecoveryCard = (direction: -1 | 1) => {
    setRecoveryPaused(true);
    setActiveRecoveryCard((current) => (current + direction + recoveryCards.length) % recoveryCards.length);
  };

  const sharePage = async () => {
    const shareData = { title: '1950년의 발견, 발효와 연구로 이어진 GABA', text: 'GABA의 발견부터 광범위한 연구와 발효 GABA의 안전성 기록까지 읽는 공개 안내서', url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus('공유 창을 열었어요.');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus('링크를 복사했어요. 자유롭게 공유해 보세요.');
      } else {
        setShareStatus('주소창의 링크를 복사해 자유롭게 공유해 보세요.');
      }
    } catch {
      setShareStatus('공유를 취소했어요.');
    }
  };

  const copyMessage = async (message: string) => {
    if (!navigator.clipboard?.writeText) {
      setShareStatus('이 문장을 길게 눌러 복사해 보세요.');
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      setShareStatus('문장을 복사했어요. 자유롭게 활용해 보세요.');
    } catch {
      setShareStatus('문장을 선택해 활용해 보세요.');
    }
  };

  return (
    <div className="gaba-guide">
      <a className="guide-skip" href="#guide-main">본문으로 이동</a>
      <header className="guide-header">
        <a className="guide-logo" href="#top" onClick={() => scrollTo('top')} aria-label="GABA Guide 홈"><span>뇌와 우리</span><small>GABA를 쉽게 읽는 공개 안내서</small></a>
        <nav id="guide-primary-navigation" className={menuOpen ? 'is-open' : ''} aria-label="주 메뉴">
          <a href="#history" onClick={() => setMenuOpen(false)}>발견</a>
          <a href="#basics" onClick={() => setMenuOpen(false)}>GABA란</a>
          <a href="#academic" onClick={() => setMenuOpen(false)}>연구 지도</a>
          <a href="#applications" onClick={() => setMenuOpen(false)}>활용 사례</a>
          <a href="#fermented-safety" onClick={() => setMenuOpen(false)}>발효·안전</a>
        </nav>
        <button type="button" className="guide-menu-toggle" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="guide-primary-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        <button type="button" className="guide-header-share" onClick={sharePage}><Share2 size={16} aria-hidden="true" /> 공유하기</button>
        <div className={`guide-reading-progress${activeChapterId === 'top' ? '' : ' is-visible'}`} aria-label="GABA 안내서 읽기 진행">
          <div className="guide-reading-progress-track" aria-hidden="true"><span style={{ width: `${((activeChapterIndex + 1) / readingChapters.length) * 100}%` }} /></div>
          <div className="guide-reading-progress-meta"><span>NOW READING</span><strong aria-live="polite">{activeChapter.label}</strong><small>{String(activeChapterIndex + 1).padStart(2, '0')} / {String(readingChapters.length).padStart(2, '0')}</small></div>
        </div>
      </header>

      <main id="guide-main">
        <section className="guide-hero guide-hero-story" id="top" aria-labelledby="guide-hero-heading" style={{ '--guide-hero-image': `url(${gabaNaturalHero})` } as CSSProperties}>
          <div className="guide-hero-copy">
            <p className="guide-hero-kicker">1950 · THE FIRST CLUE</p>
            <h1 id="guide-hero-heading"><span>1950년,<br />뇌 속에서 한 신호가 발견됐습니다</span><em>그 이름은<span className="guide-mobile-break"><br /></span>{' '}GABA였습니다</em></h1>
            <p className="guide-hero-body">1950년 뇌 속의 작은 신호 하나가 발견됐습니다. 그 발견은 수면과 집중에서 피부·근육·성장·면역, 그리고 발효 식품으로 이어지는 넓은 연구 지도를 열었습니다.</p>
            <p className="guide-reading-sequence"><span>3분 읽기</span> 발견의 순간 <i>→</i> GABA란 <i>→</i> 연구 지도 <i>→</i> 국내외 활용 <i>→</i> 발효·안전</p>
          </div>
          <NeuronNetwork />
          <div className="guide-hero-scroll" aria-hidden="true"><ArrowDown size={16} /> 아래로 읽기</div>
        </section>

        <section className="guide-section guide-history guide-story-section" id="history" aria-labelledby="history-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-history-heading"><div><p className="guide-section-number">01 · THE DISCOVERY</p><h2 id="history-heading">처음에는 이름도<span className="guide-mobile-break"><br /></span> 없었습니다.<br />다만, 뇌 속에 있었습니다.</h2></div><p>한 줄의 발견이<br />75년의 연구를 열었습니다.</p></div>
            <p className="guide-section-lead">유진 로버츠와 샘 프랭클은 당시의 분석 기술로 뇌 조직을 들여다보다가, 다른 조직에서는 거의 보이지 않는 물질을 발견했습니다. 그 물질이 바로 GABA였습니다.</p>
            <div className="guide-history-timeline">{historyMilestones.map((milestone, index) => <article className="guide-history-item" key={milestone.year}><div className="guide-history-marker"><span>{milestone.year}</span>{index < historyMilestones.length - 1 ? <i aria-hidden="true" /> : null}</div><div className="guide-history-copy"><h3>{milestone.title}</h3><p>{milestone.body}</p><a className="guide-study-source" href={milestone.source.url} target="_blank" rel="noopener noreferrer">{milestone.source.label} <ExternalLink size={13} aria-hidden="true" /></a></div></article>)}</div>
            <div className="guide-research-scale" aria-label="GABA 연구 규모">
              <div className="guide-research-scale-head"><div><p className="guide-section-number">RESEARCH SCALE</p><h3>하나의 신호.<br />넓어진 연구.</h3></div><p>75 YEARS · GABA</p></div>
              <div className="guide-research-scale-grid">{researchScaleStats.map((stat) => <article key={stat.label} aria-label={`${stat.label} ${stat.value}편 · ${stat.detail}`}><div className="guide-research-scale-bar" aria-hidden="true"><span style={{ '--guide-scale-height': `${stat.scale}%` } as CSSProperties} /></div><div><strong>{stat.value}</strong><h4>{stat.label}</h4><p>{stat.detail}</p><a href={stat.source.url} target="_blank" rel="noopener noreferrer">{stat.source.label} <ExternalLink size={12} aria-hidden="true" /></a></div></article>)}</div>
              <p className="guide-research-scale-caption">기관 문헌 수는 2026년 9월 28일 PubMed 검색 기준이며, SCIE 문헌 수는 공개된 Web of Science Core Collection 기반 GABA-A 수용체 연구 분석의 집계입니다.</p>
              <p className="guide-history-quote">작은 분자 하나의 발견은<br /><strong>뇌가 균형을 만드는 방식을 읽는 새로운 언어</strong>가 되었습니다.</p>
            </div>
          </div>
        </section>

        <section className="guide-summary-band guide-story-summary" aria-label="GABA 한 문장 요약">
          <div className="guide-container guide-summary-grid"><span className="guide-summary-label">GABA 한 문장</span><p>GABA는 뇌와 척수에서 신경세포의 과도한 활성화를 낮추고, 신경계의 흥분과 억제 균형을 조절하는 신경전달물질입니다.</p><span className="guide-summary-mark">GABA<br />= 조절의 신호</span></div>
        </section>

        <section className="guide-section guide-basics guide-story-section" id="basics" aria-labelledby="basics-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">02 · GABA BASICS</p><h2 id="basics-heading">GABA는 우리 몸에서 만들어지는<br />신경전달물질입니다</h2></div><p>전문용어는 잠시 내려놓고,<br />세 가지 핵심으로 읽어보세요.</p></div>
            <p className="guide-section-lead">GABA는 뇌와 척수에서 신경세포의 과도한 활성화를 억제하고, 신경계의 흥분과 억제 균형을 조절합니다.</p>
            <div className="guide-basics-grid guide-basics-three">
              <article className="guide-definition-card"><span className="guide-card-index">01</span><h3>신경세포 활동 조절</h3><p>신경세포가 지나치게 활성화되지 않도록 신호의 크기와 흐름을 조절합니다.</p><div className="guide-card-motif guide-motif-signal" aria-hidden="true"><i /><i /><i /><i /></div></article>
              <article className="guide-definition-card is-highlighted"><span className="guide-card-index">02</span><h3>수면과 각성에 관여</h3><p>잠들고 깨어 있는 리듬을 만드는 신경회로와 연결되어 있습니다.</p><div className="guide-card-motif guide-motif-moon" aria-hidden="true"><Moon /></div></article>
              <article className="guide-definition-card"><span className="guide-card-index">03</span><h3>감정·감각·집중·운동 회로</h3><p>감정, 감각, 집중, 움직임을 나누고 조율하는 회로에 관여합니다.</p><div className="guide-card-motif guide-motif-network" aria-hidden="true"><Network /></div></article>
            </div>
          </div>
        </section>

        <aside className="guide-recovery-break" aria-labelledby="recovery-break-heading">
          <div className="guide-container">
            <div className="guide-recovery-break-head">
              <div>
                <p className="guide-section-number">HERE FOR A MOMENT</p>
                <h2 id="recovery-break-heading">여기서 잠깐</h2>
              </div>
              <p>GABA의 수면 이야기를<br />회복의 언어로 연결합니다.</p>
            </div>
            <div className={`guide-recovery-card is-${recoveryCard.tone}${recoveryPaused ? ' is-paused' : ''}`} aria-live="polite" aria-atomic="true">
              <div className="guide-recovery-card-copy">
                <p className="guide-recovery-card-eyebrow">{recoveryCard.eyebrow}</p>
                <h3>{recoveryCard.title}</h3>
                <p>{recoveryCard.body}</p>
              </div>
              <div className="guide-recovery-card-footer">
                <div className="guide-recovery-progress" aria-hidden="true"><i key={activeRecoveryCard} /></div>
                <span>{String(activeRecoveryCard + 1).padStart(2, '0')} / {String(recoveryCards.length).padStart(2, '0')}</span>
                <span>{recoveryPaused ? '일시정지' : '2초마다 전환'}</span>
              </div>
            </div>
            <div className="guide-recovery-controls" aria-label="수면과 회복 카드 조작">
              <button type="button" aria-label="이전 카드" onClick={() => moveRecoveryCard(-1)}><ChevronLeft size={17} aria-hidden="true" /></button>
              <button type="button" className="guide-recovery-toggle" aria-pressed={recoveryPaused} onClick={() => setRecoveryPaused((paused) => !paused)}>{recoveryPaused ? <Play size={13} fill="currentColor" aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{recoveryPaused ? '다시 재생' : '잠시 멈춤'}</span></button>
              <button type="button" aria-label="다음 카드" onClick={() => moveRecoveryCard(1)}><ChevronRight size={17} aria-hidden="true" /></button>
            </div>
            <p className="guide-recovery-thread"><span>GABA BASICS</span><i>→</i><strong>수면과 회복</strong><i>→</i><span>연구 결과</span></p>
          </div>
        </aside>

        <section className="guide-section guide-academic guide-story-section" id="academic" aria-labelledby="academic-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">03 · THE ACADEMIC MAP</p><h2 id="academic-heading">GABA 연구는<br />한 분야에 머물지 않았습니다</h2></div><p>하나의 신호에서<br />넓은 학술 지도로</p></div>
            <p className="guide-section-lead">신경세포의 활동을 조절하는 기본 원리에서 출발한 GABA 연구는 수면과 집중, 감각과 움직임, 그리고 몸 전체의 다양한 연구 영역으로 뻗어 나갔습니다.</p>
            <div className="guide-editorial-band guide-editorial-band-academic" style={{ '--guide-editorial-image': `url(${gabaNaturalHero})` } as CSSProperties} role="img" aria-label="물과 돌, 잎의 자연 질감으로 표현한 GABA 연구 지도 이미지"><span><small>FROM SIGNAL TO SYSTEM</small><strong>하나의 신호가<br />넓은 연구 지도가 되었습니다</strong></span></div>
            <div className="guide-academic-map">{academicFields.map((field, index) => <article key={field.title}><span>0{index + 1}</span><div><h3>{field.title}</h3><p>{field.body}</p></div></article>)}</div>
            <p className="guide-academic-caption"><FlaskConical size={17} aria-hidden="true" /> 기초 신경과학에서 사람 연구, 피부·근육·성장·면역 연구까지</p>
          </div>
        </section>

        <section className="guide-section guide-everyday guide-story-section" id="everyday" aria-labelledby="everyday-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">04 · EVERYDAY GABA</p><h2 id="everyday-heading">우리는 이미 매일 GABA의<br />조절 속에서 생활합니다</h2></div><p>논문보다 먼저,<br />일상의 순간으로 이해해 보세요.</p></div>
            <div className="guide-everyday-cards">{everydayTopics.map((topic, index) => <article className="guide-everyday-card" key={topic.id}><span className="guide-everyday-number">0{index + 1}</span><span className="guide-topic-icon"><TopicIcon type={topic.icon} /></span><h3>{topic.title}</h3><p>{topic.body}</p></article>)}</div>
          </div>
        </section>

        <section className="guide-section guide-sleep-story guide-story-section" id="sleep" aria-labelledby="sleep-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">05 · SLEEP</p><h2 id="sleep-heading">GABA가 가장 먼저 주목받은<br />분야, 수면</h2></div><p>수면을 대표 사례로<br />GABA 연구를 읽습니다.</p></div>
            <p className="guide-section-lead">수면과 GABA의 생리적 관계에서 출발해, 전문가 설명과 대표 인체연구를 한 화면에서 비교해 보세요.</p>
            <div className="guide-sleep-grid">
              <div className="guide-sleep-steps">
                <article><span>01</span><div><h3>수면과 GABA의 생리적 관계</h3><p>잠들기 전에는 각성을 유지하는 신경회로의 활동이 낮아져야 합니다. GABA성 신경전달은 그 수면 시작과 유지의 리듬에 관여합니다.</p></div></article>
                <article><span>02</span><div><h3>수면 인체연구 결과</h3><p>수면의 질이 낮게 나온 성인 16명이 GABA 100mg 캡슐과 대조 캡슐을 각각 1주씩 먹은 무작위·위약 대조 교차시험입니다.</p><strong className="guide-result-line">GABA 기간에는 잠드는 시간이 짧아졌고, 전체 비렘수면 시간이 늘었습니다.</strong><p className="guide-study-source">출처 · <a href="https://pubmed.ncbi.nlm.nih.gov/30263304/" target="_blank" rel="noopener noreferrer">Yamatsu et al. 2016 · PMID 30263304 <ExternalLink size={13} aria-hidden="true" /></a></p></div></article>
                <article><span>03</span><div><h3>수면 기록에서 보인 변화</h3><div className="guide-compare-row"><span>잠드는 시간</span><strong>GABA 기간에 더 짧아짐</strong></div><div className="guide-compare-row"><span>전체 비렘수면</span><strong>GABA 기간에 늘어남</strong></div><p className="guide-study-source">연구 출처는 바로 앞 결과에 함께 표시했습니다.</p></div></article>
                <article><span>04</span><div><h3>생리와 연구 결과 연결</h3><div className="guide-compare-row"><span>생리학의 언어</span><strong>GABA와 수면 리듬의 관계</strong></div><div className="guide-compare-row"><span>사람 연구의 기록</span><strong>잠드는 시간·전체 비렘수면</strong></div></div></article>
              </div>
              <div className="guide-sleep-visual" style={{ '--guide-sleep-image': `url(${gabaSleepEditorial})` } as CSSProperties} aria-label="잔잔한 물결과 달빛으로 표현한 수면 연구 이미지" role="img"><div className="guide-sleep-wave"><i /><i /><i /><i /><i /><i /></div><span className="guide-sleep-orbit guide-sleep-orbit-one" /><span className="guide-sleep-orbit guide-sleep-orbit-two" /><strong>잠들기 전<br />신경 신호의 리듬</strong></div>
            </div>
          </div>
        </section>

        <section className="guide-section guide-research guide-story-section" id="research" aria-labelledby="research-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-section-heading-wide"><div><p className="guide-section-number">06 · RESEARCH EXPANSION</p><h2 id="research-heading">수면에서 시작해<br />다섯 영역으로 확장됩니다</h2></div><p>각 연구의 결과를<br />출처와 함께 읽습니다.</p></div>
            <div className="guide-research-flow">{researchTopics.map((topic) => <article className="guide-research-detail guide-research-detail-inline" id={`research-${topic.id}`} key={topic.id}><div className="guide-research-detail-top"><EvidenceBadge tone={topic.tone} label={topic.label} /><span>{topic.english}</span></div><div className="guide-research-inline-heading"><ResearchGlyph id={topic.id} /><h3>{topic.title} 연구 결과</h3></div><ResearchOutcomeChart topic={topic} /><dl><div><dt>어떤 연구인가요?</dt><dd>{topic.study}</dd></div><div><dt>무엇이 관찰됐나요?</dt><dd className="guide-research-finding">{topic.finding}</dd></div><div><dt>이 결과가 말해주는 것</dt><dd>{topic.interpretation}</dd></div></dl><p className="guide-research-source"><span>출처</span><a href={topic.source.url} target="_blank" rel="noopener noreferrer">{topic.source.label} <ExternalLink size={13} aria-hidden="true" /></a></p></article>)}</div>
            <p className="guide-research-reminder"><span>연구 결과를 먼저 읽고, 각 카드 아래 출처에서 원문으로 이어집니다.</span></p>
          </div>
        </section>

        <section className="guide-section guide-applications guide-story-section" id="applications" aria-labelledby="applications-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">07 · AROUND THE WORLD</p><h2 id="applications-heading">GABA는 연구실을 넘어<br />여러 분야로 이어지고 있습니다</h2></div><p>국내외 활용 사례를<br />한 흐름으로 살펴봅니다.</p></div>
            <p className="guide-section-lead">발효와 발아, 식품과 바이오 기술. GABA는 신경과학의 언어를 넘어 다양한 연구와 산업 현장에서 새로운 가능성을 만들고 있습니다.</p>
            <div className="guide-editorial-band guide-editorial-band-applications" style={{ '--guide-editorial-image': `url(${gabaFermentationEditorial})` } as CSSProperties} role="img" aria-label="발아 곡물과 발효 용기로 표현한 국내외 활용 연구 이미지"><span><small>FROM KOREA TO THE WORLD</small><strong>발효와 발아,<br />식품과 바이오 기술로</strong></span></div>
            <div className="guide-application-grid">{applicationCases.map((item) => <article className="guide-application-card" key={item.id}><div className="guide-application-top"><span className="guide-application-icon"><ApplicationIcon type={item.icon} /></span><span>{item.region}</span></div><h3>{item.title}</h3><p>{item.body}</p><strong>{item.detail}</strong><div className="guide-application-sources"><span>연구·공공자료</span>{item.sources.map((source) => <a href={source.url} target="_blank" rel="noopener noreferrer" key={source.url}>{source.label} <ExternalLink size={13} aria-hidden="true" /></a>)}</div></article>)}</div>
          </div>
        </section>

        <section className="guide-section guide-fermented-safety guide-story-section" id="fermented-safety" aria-labelledby="fermented-safety-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-fermented-heading"><div><p className="guide-section-number">08 · FERMENTATION &amp; SAFETY</p><h2 id="fermented-safety-heading">발효는 GABA를<br />식품의 언어로 바꾸었습니다</h2></div><p>발효의 시작부터<br />안전성 기록까지</p></div>
            <div className="guide-editorial-band guide-editorial-band-fermentation" style={{ '--guide-editorial-image': `url(${gabaFermentationEditorial})` } as CSSProperties} role="img" aria-label="발효 용기와 발아 곡물로 표현한 발효 GABA 연구 이미지"><span><small>FROM FERMENTATION TO RECORD</small><strong>자연의 발효가<br />공개된 기록이 되기까지</strong></span></div>
            <div className="guide-fermented-intro">
              <div className="guide-fermented-statement"><span className="guide-fermented-seal"><ShieldCheck aria-hidden="true" /></span><p><strong>하나의 신호가<br />식탁 위의 연구가 되기까지</strong><span>발효 원리 · 공정과 품질 · 사람 대상 섭취</span></p></div>
              <p className="guide-section-lead">김치와 발효식품에서 출발한 미생물 연구는 GABA를 신경과학의 물질에서 식품공학의 연구 소재로 확장했습니다. 발효 GABA에 대한 관심은 만들어지는 과정과 품질, 그리고 사람에게 섭취된 기록까지 이어집니다.</p>
            </div>
            <div className="guide-fermented-steps">{fermentedSafetySteps.map((step) => <article className="guide-fermented-step" key={step.number}><div className="guide-fermented-step-top"><span className="guide-fermented-step-number">{step.number}</span><span className="guide-fermented-step-icon"><FermentedSafetyIcon type={step.icon} /></span><span>{step.eyebrow}</span></div><h3>{step.title}</h3><p>{step.body}</p><a href={step.source.url} target="_blank" rel="noopener noreferrer">{step.source.label} <ExternalLink size={13} aria-hidden="true" /></a></article>)}</div>
            <p className="guide-fermented-note"><Check size={16} aria-hidden="true" /> 발효 GABA의 안전성은 발효했다는 한 단어가 아니라, 균주·공정·최종 원료·사람 대상 연구가 함께 쌓인 공개 기록으로 읽을 수 있습니다.</p>
          </div>
        </section>

        <section className="guide-section guide-growth-story guide-story-section" id="growth" aria-labelledby="growth-heading">
          <div className="guide-container"><div className="guide-section-heading"><div><p className="guide-section-number">09 · GROWTH QUESTION</p><h2 id="growth-heading">성장호르몬 연구는<br />키 성장과 어떻게 연결될까요?</h2></div><p>하나의 결론보다<br />연구가 이어지는 경로를 봅니다.</p></div><p className="guide-section-lead">GABA 연구가 성장 관련 질문으로 이어지는 과정을 한 줄씩 살펴볼 수 있습니다.</p><div className="guide-growth-flow">{growthSteps.map((step, index) => <div className="guide-growth-step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < growthSteps.length - 1 ? <ArrowRight className="guide-growth-arrow" aria-hidden="true" /> : null}</div>)}</div><p className="guide-growth-note">앞의 근육·성장호르몬 연구에서 혈액 속 호르몬과 청소년기 생쥐의 몸길이 변화를 확인했습니다. 이 결과는 성장 연구가 신경 조절에서 호르몬과 성장 지표로 이어지는 경로를 보여줍니다.</p></div>
        </section>

        <section className="guide-section guide-expert-videos guide-story-section" id="expert-videos" aria-labelledby="expert-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">10 · EXPERT VOICES</p><h2 id="expert-heading">의사와 과학자들은<br />GABA를 어떻게 설명할까요?</h2></div><p>히어로샷을 고르고<br />영상은 바로 재생됩니다.</p></div>
            <p className="guide-section-lead guide-video-gallery-lead">공개된 의사·과학자 채널의 Shorts를 수면, GABA의 기본 역할, 자율신경과 연구 읽기 주제로 모았습니다.</p>
            <div className="guide-video-gallery">
              <article className="guide-video-feature" id="expert-video-feature" aria-live="polite">
                <div className="guide-video-feature-media"><iframe key={activeVideo.id} title={`${activeVideo.title} · ${activeVideo.channel}`} src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
                <div className="guide-video-feature-copy"><div className="guide-video-feature-meta"><span>{activeVideo.topic}</span><span>SHORTS</span></div><h3>{activeVideo.title}</h3><p>{activeVideo.channel}</p><a href={`https://www.youtube.com/shorts/${activeVideo.id}`} target="_blank" rel="noopener noreferrer">YouTube에서 원본 보기 <ExternalLink size={14} aria-hidden="true" /></a></div>
              </article>
              <div className="guide-video-board" aria-label="전문가 영상 게시판">
                <div className="guide-video-board-head"><span>VIDEO BOARD</span><strong>{expertVideos.length}개 영상</strong></div>
                <div className="guide-video-grid">{expertVideos.map((video, index) => <button type="button" className={`guide-video-card${activeVideo.id === video.id ? ' is-active' : ''}`} key={video.id} aria-pressed={activeVideo.id === video.id} onClick={() => selectExpertVideo(video.id)}><span className="guide-video-card-thumb"><img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /><span className="guide-video-card-play"><Play size={14} fill="currentColor" aria-hidden="true" /></span></span><span className="guide-video-card-copy"><span>{video.topic}</span><strong>{video.title}</strong><small>{video.channel}</small></span></button>)}</div>
              </div>
            </div>
            <p className="guide-expert-note guide-video-gallery-note">영상은 각 채널의 공개 Shorts를 임베드한 큐레이션입니다. 선택한 영상은 이 페이지 안에서 바로 재생되고, 원문 링크도 함께 제공합니다.</p>
            <div className="guide-expert-thread"><span>이어서 읽기</span><strong>수면 연구</strong><i>→</i><strong>연구 결과</strong><i>→</i><strong>출처 원문</strong></div>
          </div>
        </section>

        <section className="guide-section guide-reading-note guide-story-section" aria-label="연구 읽는 순서"><div className="guide-container"><p className="guide-section-number">11 · READ THE SOURCES</p><p className="guide-reading-note-copy">각 연구 카드에서 연구 방법과 실제 관찰 결과를 읽은 다음, 카드 아래 출처를 통해 원문으로 이어집니다.</p></div></section>

        <section className="guide-final" id="final" aria-labelledby="final-heading"><div className="guide-container"><p className="guide-section-number">12 · SHARE THE STORY</p><h2 id="final-heading">1950년의 작은 발견은<br />오늘의 연구 지도가 되었습니다</h2><p className="guide-final-copy">GABA는 뇌 속에서 시작해 수면, 집중, 감각, 움직임, 피부, 근육, 성장호르몬과 면역을 거쳐 발효 식품과 안전성 연구로 이어졌습니다. 이제 그 흐름을 자유롭게 읽고 공유해 보세요.</p><div className="guide-final-actions"><button type="button" className="guide-primary-button" onClick={sharePage}><Share2 size={17} aria-hidden="true" /> GABA 이야기 공유하기 <ArrowRight size={17} aria-hidden="true" /></button></div>{shareStatus ? <span className="guide-share-status guide-final-status" role="status">{shareStatus}</span> : null}<details className="guide-share-lines"><summary>사업자가 바로 설명할 수 있는 GABA 5문장 보기</summary><div>{messageKit.map((message, index) => <article key={message}><span>0{index + 1}</span><p>{message}</p><button type="button" onClick={() => copyMessage(message)}>문장 복사</button></article>)}</div></details></div></section>
      </main>

      <footer className="guide-footer"><div className="guide-container guide-footer-grid"><a className="guide-logo" href="#top" onClick={() => scrollTo('top')}><span>뇌와 우리</span><small>GABA를 쉽게 읽는 공개 안내서</small></a><p>GABA를 쉽게 이해하고<br />자유롭게 공유하는 공개 안내서입니다.</p><div><a href="#history">발견의 역사</a><a href="#applications">활용 사례</a><a href="#top">맨 위로 ↑</a></div></div><div className="guide-container guide-footer-bottom"><span>© 2026 GABA Guide</span><span>1950년, 뇌 속에서 발견된 신호</span></div></footer>
    </div>
  );
}
