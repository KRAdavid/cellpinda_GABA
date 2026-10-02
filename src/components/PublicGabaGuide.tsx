import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react';
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
import gabaFermentationEditorial from '../assets/gaba-fermentation-editorial-q55.webp';
import gabaApplicationsEditorial from '../assets/gaba-applications-editorial-q55.jpg';
import gabaNaturalHero from '../assets/gaba-natural-hero-q55.webp';
import gabaRecoveryIllustrationSheet from '../assets/gaba-recovery-illustration-sheet-card.webp';
import gabaSleepEditorial from '../assets/gaba-sleep-editorial-q55.webp';
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
  | { kind: 'comparison'; title: string; summary: string; note: string; referenceLabel: string; resultLabel: string; rows: ResearchComparison[] }
  | { kind: 'metrics'; title: string; summary: string; note: string; metrics: { label: string; value: string; note: string }[] }
  | { kind: 'signals'; title: string; summary: string; note: string; rows: ResearchSignal[] };

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
  { id: 'sleep', title: '잠들 때', body: '잠들고 깨어나는 리듬에도 신경 신호가 관여합니다.', icon: 'moon' },
  { id: 'stress', title: '긴장되는 순간', body: '높아진 신경 활동을 낮추며 몸이 균형을 되찾는 과정이 이어집니다.', icon: 'sparkles' },
  { id: 'focus', title: '필요한 정보에 집중할 때', body: '필요한 정보에 집중하는 동안 다른 신호는 잠시 낮아집니다.', icon: 'focus' },
  { id: 'movement', title: '몸을 움직이고 멈출 때', body: '움직일 때와 멈출 때를 구분해 몸의 움직임을 조절합니다.', icon: 'movement' },
  { id: 'sense', title: '감각 정보를 구분할 때', body: '소리와 촉감 같은 감각 신호를 구분하는 과정에도 관여합니다.', icon: 'sense' },
];

const recoveryIcons = [Sparkles, Moon, Share2, ArrowDown, Moon, ShieldCheck, ArrowRight, Share2, Check, ArrowRight, ShieldCheck, ArrowDown, Share2, ArrowRight];

const recoveryCards = [
  {
    eyebrow: '01 · 낮의 활동',
    body: '낮에는 움직이고 일하며 에너지를 씁니다.',
    tone: 'night',
    artIndex: 0,
  },
  {
    eyebrow: '02 · 밤의 전환',
    body: '밤이 되면 몸은 활동을 멈추고 휴식에 들어갑니다.',
    tone: 'recovery',
    artIndex: 1,
  },
  {
    eyebrow: '03 · 뇌의 정리',
    body: '잠든 동안 뇌는 하루 동안 쌓인 정보를 정리합니다.',
    tone: 'recovery',
    artIndex: 2,
  },
  {
    eyebrow: '04 · 몸의 회복',
    body: '몸은 손상된 부분을 회복하고 쌓인 피로를 풀며 다음 날을 준비합니다.',
    tone: 'recovery',
    artIndex: 3,
  },
  {
    eyebrow: '05 · 수면의 질',
    body: '잠이 얕거나 자주 깨면, 회복에 쓸 시간이 줄어듭니다.',
    tone: 'recovery',
    artIndex: 4,
  },
  {
    eyebrow: '06 · 밤의 긴장',
    body: '스트레스가 이어지면 뇌가 쉽게 휴식 상태로 전환되지 않습니다.',
    tone: 'stress',
    artIndex: 5,
  },
  {
    eyebrow: '07 · 다음 날',
    body: '수면이 흐트러진 다음 날에는 집중과 활력도 떨어지기 쉽습니다.',
    tone: 'morning',
    artIndex: 6,
  },
  {
    eyebrow: '08 · 반복되는 고리',
    body: '지치고 예민해질수록 다시 잠들기 어려운 악순환이 이어질 수 있습니다.',
    tone: 'loop',
    artIndex: 7,
  },
  {
    eyebrow: '09 · 노화의 정의',
    body: '노화는 몸이 손상을 회복하고 균형을 되찾는 속도가 느려지는 과정입니다.',
    tone: 'age',
    artIndex: 8,
  },
  {
    eyebrow: '10 · 회복할 여유',
    body: '회복하려면 몸이 손상과 피로를 정리할 시간이 필요합니다. 충분한 수면은 그 회복을 이어가는 바탕이 됩니다.',
    tone: 'age',
    artIndex: 3,
  },
  {
    eyebrow: '11 · 회복할 시간이 줄어들면',
    body: '수면이 계속 흐트러지면 몸이 손상과 피로를 정리할 시간이 줄어들고, 균형을 되찾을 기회도 함께 줄어듭니다.',
    tone: 'age',
    artIndex: 9,
  },
  {
    eyebrow: '12 · 반복의 누적',
    body: '풀리지 않은 피로는 다음 날의 예민함과 긴장으로 이어지고, 그 긴장은 다시 밤의 휴식을 방해할 수 있습니다.',
    tone: 'loop',
    artIndex: 7,
  },
  {
    eyebrow: '13 · 노화의 가속',
    body: '회복할 기회가 줄어든 상태가 오래 이어지면, 몸이 손상과 피로를 정리하고 균형을 되찾는 속도는 더 느려집니다.',
    tone: 'age',
    artIndex: 8,
  },
  {
    eyebrow: '14 · GABA를 읽는 시작점',
    body: 'GABA는 신경계의 흥분과 억제 사이의 균형에 관여하는 물질로 연구되고 있습니다. 이제 수면과 회복의 연결 속에서 GABA를 살펴봅니다.',
    tone: 'recovery',
    artIndex: 2,
  },
] as const;

const researchTopics: ResearchTopic[] = [
  {
    id: 'cognition',
    title: '인지',
    english: '인지와 집중',
    tone: 'human',
    label: '사람 63명 · 비교 연구',
    study: '건강한 성인 63명이 GABA 100mg과 위약을 각각 섭취하고, 머리를 많이 쓰는 과제를 수행한 무작위·위약 대조 교차시험입니다.',
    finding: '머리를 많이 쓴 과제를 마친 뒤, GABA를 섭취한 그룹은 비교 그룹보다 뇌파와 활력 점수가 덜 떨어졌습니다. 연구진은 정신적 스트레스 반응이 덜 나타난 결과로 해석했습니다.',
    interpretation: '이 연구가 직접 살펴본 항목은 기억력이나 치매가 아니라, 정신적 부담이 있는 상황에서의 뇌파와 기분 변화입니다.',
    source: { label: 'Yoto et al. 2012 · PMID 22203366', url: 'https://pubmed.ncbi.nlm.nih.gov/22203366/' },
    chart: {
      kind: 'comparison',
      title: '머리를 많이 쓴 뒤, 두 그룹은 어떻게 달랐을까요?',
      summary: 'GABA를 섭취한 그룹은 뇌파와 활력 점수가 비교 그룹보다 덜 떨어졌습니다.',
      note: '막대가 짧을수록 감소 폭이 작다는 뜻입니다.',
      referenceLabel: '비교 캡슐',
      resultLabel: 'GABA 캡슐',
      rows: [
        { label: '뇌파 변화', reference: '더 많이 줄었습니다', result: '덜 줄었습니다', visual: 'result-less' },
        { label: '활력 점수', reference: '더 많이 줄었습니다', result: '덜 줄었습니다', visual: 'result-less' },
      ],
    },
  },
  {
    id: 'skin',
    title: '피부',
    english: '피부와 장벽',
    tone: 'early',
    label: '생쥐 피부·사람 피부 세포 실험',
    study: '피부 장벽을 손상시킨 생쥐에 GABA를 바르고, 사람 피부 세포에서도 반응을 살핀 실험입니다.',
    finding: 'GABA를 바른 피부는 장벽이 더 빨리 회복됐고, 피부 표면이 두꺼워지는 변화는 줄었습니다.',
    interpretation: '이 연구가 본 결과는 피부 장벽 회복과 피부 표면의 변화이며, 사람의 피부 탄력이나 주름을 직접 측정한 시험은 아닙니다.',
    source: { label: 'Denda et al. 2002 · PMID 12445190', url: 'https://pubmed.ncbi.nlm.nih.gov/12445190/' },
    chart: {
      kind: 'comparison',
      title: 'GABA를 바른 피부는 어떻게 달라졌을까요?',
      summary: 'GABA를 바른 피부는 장벽이 더 빨리 회복됐고, 피부가 두꺼워지는 변화는 줄었습니다.',
      note: '막대는 변화 방향을 보여줍니다.',
      referenceLabel: '비교 조건',
      resultLabel: 'GABA를 바른 조건',
      rows: [
        { label: '장벽 회복', reference: '더 느리게 회복됐습니다', result: '더 빨리 회복됐습니다', visual: 'result-more' },
        { label: '피부가 두꺼워지는 변화', reference: '더 많이 나타났습니다', result: '덜 나타났습니다', visual: 'result-less' },
      ],
    },
  },
  {
    id: 'muscle',
    title: '근육',
    english: '근육과 움직임',
    tone: 'human',
    label: '남성 11명 · 운동 비교 연구',
    study: '저항운동 경험이 있는 남성 11명이 참여했습니다. GABA 3g 또는 위약을 섭취한 뒤 휴식하거나 운동했고, 90분 동안 혈액 속 성장호르몬 변화를 살핀 이중맹검 교차시험입니다.',
    finding: '쉬었을 때 GABA를 섭취한 그룹의 성장호르몬 최고 수치는 위약 그룹보다 약 400%, 전체 반응량은 약 375% 높았습니다. 운동 조건에서도 섭취 30분 뒤 GABA 그룹의 반응이 비교 그룹보다 높게 기록됐습니다.',
    interpretation: '이 연구가 측정한 것은 혈액 속 성장호르몬 반응이며, 근육 크기·근력·체력이 좋아졌는지는 측정하지 않았습니다.',
    source: { label: 'Powers et al. 2008 · PMID 18091016', url: 'https://pubmed.ncbi.nlm.nih.gov/18091016/' },
    chart: {
      kind: 'metrics',
      title: '성장호르몬 반응',
      summary: '쉬었을 때 GABA를 섭취한 그룹의 성장호르몬 반응이 비교 그룹보다 높았습니다.',
      note: '휴식 조건에서 위약과 비교해 기록된 값입니다. 운동 조건에서도 섭취 30분 뒤 더 높았습니다.',
      metrics: [
        { label: '최고치', value: '약 +400%', note: '위약 대비' },
        { label: '총 반응량', value: '약 +375%', note: '위약 대비' },
      ],
    },
  },
  {
    id: 'growth-hormone',
    title: '성장호르몬',
    english: '성장호르몬',
    tone: 'early',
    label: '청소년기 생쥐 · 16주 연구',
    study: '청소년기에 해당하는 수컷·암컷 생쥐에 16주 동안 GABA를 투여하고, 몸길이와 체지방, 뇌하수체와 혈액 속 성장호르몬을 살펴본 동물시험입니다.',
    finding: 'GABA를 투여한 수컷 생쥐의 몸길이는 대조군보다 길었고, 체지방 지표는 낮았습니다. 뇌하수체 안의 성장호르몬 단백질은 암수 모두에서 증가했고, 혈액 속 성장호르몬은 수컷에서 증가했습니다.',
    interpretation: '이 결과는 청소년기 생쥐의 성장·성장호르몬 변화입니다. 어린이의 키 성장이나 성인의 최종 신장을 측정한 결과는 아닙니다.',
    source: { label: '청소년기 생쥐 성장 연구 · PMID 40431374', url: 'https://pubmed.ncbi.nlm.nih.gov/40431374/' },
    chart: {
      kind: 'signals',
      title: '생쥐에서 달라진 성장 관련 지표',
      summary: '청소년기 생쥐에서 몸길이와 성장호르몬 관련 수치에 차이가 나타났습니다.',
      note: '청소년기 생쥐 연구에서 어떤 변화가 나타났는지 정리했습니다.',
      rows: [
        { label: '수컷의 몸길이', value: '더 길었습니다', direction: 'up' },
        { label: '수컷의 체지방 지표', value: '더 낮았습니다', direction: 'down' },
        { label: '뇌하수체 성장호르몬 단백질', value: '증가했습니다', direction: 'up' },
        { label: '혈액 속 성장호르몬', value: '수컷에서 증가했습니다', direction: 'up' },
      ],
    },
  },
  {
    id: 'immune',
    title: '면역',
    english: '신경과 면역',
    tone: 'human',
    label: '사람 21명 · 스트레스 실험',
    study: '건강한 성인 13명의 뇌파 실험과 성인 8명이 높은 다리 위에서 긴장하는 실험에서, GABA를 섭취한 뒤 뇌파와 침 속 면역 단백질 IgA를 측정했습니다.',
    finding: '섭취 60분 뒤 GABA를 섭취한 그룹은 물·L-테아닌 그룹보다 알파파가 높고 베타파가 낮았습니다. 높은 다리 위에서 긴장하는 상황에서는 침 속 IgA가 위약 그룹보다 높게 유지됐습니다.',
    interpretation: '이 연구가 직접 측정한 것은 스트레스 상황의 뇌파와 침 속 IgA이며, 감염 예방률이나 질병 치료율은 측정하지 않았습니다.',
    source: { label: 'Abdou et al. 2006 · PMID 16971751', url: 'https://pubmed.ncbi.nlm.nih.gov/16971751/' },
    chart: {
      kind: 'signals',
      title: '긴장되는 상황에서 달라진 신호',
      summary: 'GABA를 섭취한 뒤 알파파와 침 속 IgA는 더 높았고, 베타파는 더 낮았습니다.',
      note: '섭취 뒤 뇌파와 침 속 면역 관련 지표에서 나타난 변화를 정리했습니다.',
      rows: [
        { label: '알파파', value: '증가했습니다', direction: 'up' },
        { label: '베타파', value: '감소했습니다', direction: 'down' },
        { label: '침 속 IgA', value: '더 높게 유지됐습니다', direction: 'up' },
      ],
    },
  },
];

const sleepResultTopic: Pick<ResearchTopic, 'id' | 'chart'> = {
  id: 'sleep-result',
  chart: {
    kind: 'comparison',
    title: '수면 연구 결과를 방향으로 비교',
    summary: 'GABA 섭취 기간에는 잠드는 시간이 더 짧고, 전체 비렘수면이 더 길었습니다.',
    note: '숫자 대신 연구에서 확인된 변화 방향을 보여줍니다.',
    referenceLabel: '비교 캡슐',
    resultLabel: 'GABA 캡슐',
    rows: [
      { label: '잠드는 시간', reference: '더 길었습니다', result: '더 짧았습니다', visual: 'result-less' },
      { label: '전체 비렘수면', reference: '더 짧았습니다', result: '더 길었습니다', visual: 'result-more' },
    ],
  },
};

const historyMilestones: HistoryMilestone[] = [
  {
    year: '1950',
    title: '뇌 속에서 처음 확인되다',
    body: '유진 로버츠와 샘 프랭클은 포유류 뇌에서 당시 이름을 알 수 없던 물질을 찾아냈습니다. 그 물질이 GABA이며 글루탐산에서 만들어진다는 사실도 밝혔습니다.',
    source: { label: 'Roberts & Frankel · JBC · PMID 14794689', url: 'https://pubmed.ncbi.nlm.nih.gov/14794689/' },
  },
  {
    year: '1957',
    title: '신경 신호의 기능이 드러나다',
    body: '뇌와 척수에서 신경 활동을 낮추는 물질인 Factor I가 GABA로 확인되면서, GABA는 뇌가 신호를 조절하는 방식과 연결되기 시작했습니다.',
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
  { title: '신경계의 균형', body: 'GABA는 뇌와 척수에서 신경세포의 활동을 낮추며 균형을 잡는 신호로 연구됩니다.' },
  { title: '수면과 휴식', body: '잠이 시작되고 이어지는 과정, 수면 단계와 휴식의 질을 살펴보는 연구로 이어집니다.' },
  { title: '집중과 감정', body: '집중과 긴장에 관련된 신경 신호를 어떻게 조절하는지 함께 살펴봅니다.' },
  { title: '감각과 움직임', body: '소리와 촉감을 구분하고, 움직임을 시작하고 멈추는 과정과 함께 연구됩니다.' },
  { title: '몸 전체로 넓어지는 연구', body: '피부 장벽부터 근육, 성장호르몬, 성장 지표와 스트레스 관련 면역 지표까지 이어집니다.' },
];

const applicationCases: ApplicationCase[] = [
  {
    id: 'korea',
    region: '국내 · 발효',
    title: '발효식품과 유산균',
    body: '국내 연구진은 김치 등 발효 식품에서 GABA를 만드는 유산균을 찾고, 식품 발효 조건을 조절하는 연구를 이어왔습니다.',
    detail: 'GABA는 발효를 통해 식품 속에서도 만들어지는 아미노산으로 연구됩니다.',
    icon: 'book',
    sources: [{ label: 'Yeungnam University 연구진 · GABA 생산 미생물 리뷰', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3769009/' }],
  },
  {
    id: 'japan',
    region: '일본 · 발아 곡물',
    title: '발아현미와 기능성 식품',
    body: '일본에서는 현미를 발아시켜 GABA 함량을 높이는 식품 연구가 진행됐습니다. 기능성 표시 식품의 근거를 공개하는 제도도 운영되고 있습니다.',
    detail: '발아부터 가공과 표시까지, 식품의 전체 흐름에서 GABA가 다뤄집니다.',
    icon: 'sprout',
    sources: [
      { label: '일본 농림수산성 · 발아현미와 GABA', url: 'https://www.maff.go.jp/j/syouan/keikaku/soukatu/okome_summary/04/functio_nality_08.html' },
      { label: '일본 소비자청 · 기능성 표시 식품 검색', url: 'https://www.caa.go.jp/policies/policy/food_labeling/foods_with_function_claims/search' },
    ],
  },
  {
    id: 'global',
    region: '세계 · 식품과학',
    title: '곡류·빵·유제품·음료',
    body: '세계 식품과학 연구에서는 유산균 발효로 곡류, 빵, 유제품, 음료 등에 GABA를 더하는 방법을 연구합니다.',
    detail: 'GABA는 뇌 연구의 물질에서 식품공학과 발효기술의 연구 소재로도 이어집니다.',
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
    label: 'GABA-A 수용체 · SCIE',
    detail: 'WoS Core Collection · 1999~2022년',
    scale: 100,
    source: {
      label: 'GABA-A 연구 분석',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10289248/',
    },
  },
];

const readingChapters = [
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
  { id: 'reading-note', label: '출처 읽기' },
  { id: 'final', label: '공유하기' },
] as const;
type ReadingChapterId = (typeof readingChapters)[number]['id'];
type ActiveChapterId = ReadingChapterId | 'top';
const editorialNotice = '이 사이트는 특정 제품의 광고가 아니라, GABA에 관한 과학적 정보와 공개 연구를 알기 쉽게 소개하는 공개 안내서입니다.';

const fermentedSafetySteps: FermentedSafetyStep[] = [
  {
    number: '01',
    eyebrow: '발효',
    title: '유산균이 만드는 GABA',
    body: '일부 유산균은 발효하면서 L-글루탐산을 GABA로 바꿉니다. 김치와 발효 식품에 관한 연구가 이 원리를 보여줍니다.',
    icon: 'ferment',
    source: { label: '발효 식품 속 GABA 생산 미생물 리뷰', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3769009/' },
  },
  {
    number: '02',
    eyebrow: '품질과 공정',
    title: '사용한 균주부터 최종 원료까지',
    body: '공개된 식품 원료 자료에서는 어떤 균주를 썼는지, 어떻게 만들었는지, 최종 원료의 품질은 어떤지 함께 살펴봅니다.',
    icon: 'quality',
    source: { label: '미국 FDA 공개 GRAS Notice 595', url: 'https://www.fda.gov/files/food/published/GRAS-Notice-000595--Gamma-Aminobutyric-Acid-(GABA).pdf' },
  },
  {
    number: '03',
    eyebrow: '사람 대상 연구',
    title: '사람을 대상으로 한 연구 기록',
    body: '발효 현미에서 얻은 GABA를 섭취한 성인 40명을 4주간 관찰한 무작위·위약 대조 시험에서 중대한 이상반응은 보고되지 않았습니다.',
    icon: 'human',
    source: { label: 'Byun et al. 2018 · PMID 29856155', url: 'https://pubmed.ncbi.nlm.nih.gov/29856155/' },
  },
];

const expertVideos: ExpertVideo[] = [
  { id: 'RLAU1VWGsaI', title: 'GABA와 수면 리듬', topic: '수면', channel: '교육하는 의사! 이동환TV' },
  { id: 'Cnk0PGn9YBM', title: '갱년기와 수면, GABA에 대한 질문', topic: '수면', channel: '셀럽의 건강비결' },
  { id: 'roEtojyk9_0', title: '잠이 안 올 때 GABA 이야기', topic: '수면', channel: '여에스더의 에스더TV' },
  { id: 'BiZXS_ojLUA', title: '불면과 GABA의 관계', topic: '수면', channel: '브레인튜브 Brain Doctor' },
  { id: 'rOFkZg09AoY', title: 'GABA 섭취 연구 읽기', topic: '연구 읽기', channel: 'SLEEP Dr. 신원철 꿀잠튜브' },
  { id: '4xGSHxkMYew', title: 'GABA의 기본 역할', topic: 'GABA란', channel: '비엠한방내과 [bm_k_clinic]' },
  { id: '7Zsxm9Wh2Yg', title: '자율신경과 GABA 식품 이야기', topic: '자율신경', channel: '30년 자율신경, 정이안한의원TV' },
  { id: 'vnocd9ZVJj0', title: 'GABA 수용체와 수면', topic: '수용체', channel: '영양과학자 양과자' },
  { id: 'bQ0QQHpUzdI', title: '불면·우울감과 GABA 이야기', topic: '수면·기분', channel: 'dr밸런스' },
];

const growthSteps = ['GABA 연구', '수면과 신경 신호', '성장호르몬 반응', '몸 구성과 성장 지표', '성장기 동물 연구', '어린이 연구'];
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

function ResearchOutcomeChart({ topic }: { topic: Pick<ResearchTopic, 'id' | 'chart'> }) {
  const chartId = `research-chart-${topic.id}`;
  const comparisonChart = topic.chart.kind === 'comparison' ? topic.chart : null;
  return (
    <figure className={`guide-outcome-chart guide-outcome-chart-${topic.chart.kind}`} aria-labelledby={`${chartId}-title`}>
      <div className="guide-outcome-chart-head">
        <figcaption id={`${chartId}-title`}>{topic.chart.title}</figcaption>
        <span>연구 결과 한눈에</span>
      </div>
      <div className="guide-outcome-summary"><span><i aria-hidden="true" />핵심 결과</span><strong>{topic.chart.summary}</strong></div>
      {comparisonChart ? (
        <div className="guide-outcome-comparison" role="img" aria-label={`${topic.chart.title}. 비교 조건과 GABA 조건의 결과 방향 비교. ${comparisonChart.note}`}>
          <div className="guide-outcome-comparison-head"><span className="guide-outcome-comparison-axis">변화 방향</span><span className="is-reference"><i aria-hidden="true" />{comparisonChart.referenceLabel}</span><span className="is-result"><i aria-hidden="true" />{comparisonChart.resultLabel}</span></div>
          <div className="guide-outcome-comparison-list">
            {comparisonChart.rows.map((row) => (
              <div className={`guide-outcome-comparison-row ${row.visual}`} key={row.label}>
                <div className="guide-outcome-comparison-metric"><strong>{row.label}</strong></div>
                <div className="guide-outcome-lanes">
                  <div className="guide-outcome-lane is-reference">
                    <div className="guide-outcome-lane-top"><span>{comparisonChart.referenceLabel}</span><strong>{row.reference}</strong></div>
                    <i aria-hidden="true"><b /></i>
                  </div>
                  <div className="guide-outcome-lane is-result">
                    <div className="guide-outcome-lane-top"><span>{comparisonChart.resultLabel}</span><strong>{row.result}</strong></div>
                    <i aria-hidden="true"><b /></i>
                  </div>
                </div>
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
      <p className="guide-outcome-chart-note"><span aria-hidden="true">↔</span>{topic.chart.note}</p>
    </figure>
  );
}

export default function PublicGabaGuide() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const [activeVideoId, setActiveVideoId] = useState(expertVideos[0].id);
  const [videoStarted, setVideoStarted] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState<ActiveChapterId>('top');
  const [activeRecoveryCard, setActiveRecoveryCard] = useState(0);
  const [recoveryPaused, setRecoveryPaused] = useState(false);
  const [recoveryReducedMotion, setRecoveryReducedMotion] = useState(false);
  const [recoveryInView, setRecoveryInView] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const shareStatusTimer = useRef<number | null>(null);
  const recoveryBreakRef = useRef<HTMLElement | null>(null);
  const recoveryMapRef = useRef<HTMLDivElement | null>(null);
  const recoveryTouchStart = useRef<{ x: number; y: number } | null>(null);
  const activeVideo = expertVideos.find((video) => video.id === activeVideoId) ?? expertVideos[0];
  const activeChapterIndex = readingChapters.findIndex((chapter) => chapter.id === activeChapterId);
  const activeChapter = activeChapterId === 'top' ? { label: '도입' } : readingChapters[Math.max(0, activeChapterIndex)];
  const recoveryCard = recoveryCards[activeRecoveryCard];
  const recoveryArtPosition = `${recoveryCard.artIndex % 2 ? '100%' : '0%'} ${Math.floor(recoveryCard.artIndex / 2) * 25}%`;

  useEffect(() => {
    document.title = '저속노화, 회복하는 밤에서 시작되는 GABA | GABA Guide';
    const description = '수면과 회복의 관계부터 1950년 GABA 발견, 신경계 연구, 국내외 활용과 발효 GABA의 안전성 기록까지 쉽게 읽는 공개 안내서입니다.';
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = window.location.href.split('?')[0].split('#')[0];
    const targetId = window.location.hash.slice(1);
    if (targetId) requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' })));
  }, []);

  useEffect(() => () => {
    if (shareStatusTimer.current !== null) window.clearTimeout(shareStatusTimer.current);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotion = () => setRecoveryReducedMotion(mediaQuery.matches);
    syncReducedMotion();
    mediaQuery.addEventListener?.('change', syncReducedMotion);
    return () => mediaQuery.removeEventListener?.('change', syncReducedMotion);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    requestAnimationFrame(() => document.querySelector<HTMLElement>('nav a')?.focus());
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuToggleRef.current?.focus();
    };
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
    };
  }, [menuOpen]);

  useEffect(() => {
    const section = recoveryBreakRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setRecoveryInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setRecoveryInView(entry.isIntersecting), { rootMargin: '-18% 0px -18% 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = recoveryBreakRef.current;
    if (!section) return;
    const pauseForReading = () => setRecoveryPaused(true);
    section.addEventListener('focusin', pauseForReading);
    section.addEventListener('pointerenter', pauseForReading);
    return () => {
      section.removeEventListener('focusin', pauseForReading);
      section.removeEventListener('pointerenter', pauseForReading);
    };
  }, []);

  useEffect(() => {
    if (recoveryPaused || recoveryReducedMotion || !recoveryInView) return;
    const intervalId = window.setInterval(() => {
      setActiveRecoveryCard((current) => (current + 1) % recoveryCards.length);
    }, 3000);
    return () => window.clearInterval(intervalId);
  }, [recoveryPaused, recoveryReducedMotion, recoveryInView]);

  useEffect(() => {
    const map = recoveryMapRef.current;
    const activeStep = map?.querySelector<HTMLButtonElement>(`[data-recovery-index="${activeRecoveryCard}"]`);
    if (!map || !activeStep || map.scrollWidth <= map.clientWidth) return;
    const targetLeft = activeStep.offsetLeft - (map.clientWidth - activeStep.offsetWidth) / 2;
    const maxLeft = map.scrollWidth - map.clientWidth;
    map.scrollTo({ left: Math.max(0, Math.min(targetLeft, maxLeft)), behavior: recoveryReducedMotion ? 'auto' : 'smooth' });
  }, [activeRecoveryCard, recoveryReducedMotion]);

  useEffect(() => {
    let frame = 0;
    const updateReadingChapter = () => {
      const readingPoint = window.scrollY + Math.min(window.innerHeight * 0.3, 260);
      let currentChapter: ActiveChapterId = 'top';
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

  const isNavCurrent = (id: ReadingChapterId) => {
    if (id === 'academic') return activeChapterId === 'academic' || activeChapterId === 'research';
    return activeChapterId === id;
  };

  const selectExpertVideo = (id: string) => {
    setActiveVideoId(id);
    setVideoStarted(true);
    if (window.matchMedia('(max-width: 700px)').matches) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      requestAnimationFrame(() => document.getElementById('expert-video-feature')?.scrollIntoView({ behavior, block: 'start' }));
    }
  };

  const moveRecoveryCard = (direction: -1 | 1) => {
    setRecoveryPaused(true);
    setActiveRecoveryCard((current) => (current + direction + recoveryCards.length) % recoveryCards.length);
  };

  const selectRecoveryCard = (index: number) => {
    setRecoveryPaused(true);
    setActiveRecoveryCard(index);
  };

  const announceShareStatus = (message: string) => {
    if (shareStatusTimer.current !== null) window.clearTimeout(shareStatusTimer.current);
    setShareStatus(message);
    shareStatusTimer.current = window.setTimeout(() => {
      setShareStatus('');
      shareStatusTimer.current = null;
    }, 4200);
  };

  const handleRecoveryKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveRecoveryCard(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveRecoveryCard(1);
    }
  };

  const handleRecoveryTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0];
    recoveryTouchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleRecoveryTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = recoveryTouchStart.current;
    recoveryTouchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
    moveRecoveryCard(deltaX < 0 ? 1 : -1);
  };

  const sharePage = async () => {
    const shareData = { title: '저속노화, 회복하는 밤에서 시작되는 GABA', text: '수면과 회복에서 시작해 GABA의 발견과 연구 지도를 읽는 공개 안내서', url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        announceShareStatus('공유 창을 열었어요.');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        announceShareStatus('링크를 복사했어요. 자유롭게 공유해 보세요.');
      } else {
        announceShareStatus('주소창의 링크를 복사해 자유롭게 공유해 보세요.');
      }
    } catch {
      announceShareStatus('공유를 취소했어요.');
    }
  };

  const copyMessage = async (message: string) => {
    if (!navigator.clipboard?.writeText) {
      announceShareStatus('이 문장을 길게 눌러 복사해 보세요.');
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      announceShareStatus('문장을 복사했어요. 자유롭게 활용해 보세요.');
    } catch {
      announceShareStatus('문장을 선택해 활용해 보세요.');
    }
  };

  return (
    <div className="gaba-guide">
      <a className="guide-skip" href="#guide-main">본문으로 이동</a>
      <div className={`guide-share-toast${shareStatus ? ' is-visible' : ''}`} role="status" aria-live="polite" aria-atomic="true">{shareStatus}</div>
      <header className="guide-header" ref={headerRef}>
        <a className="guide-logo" href="#top" onClick={() => scrollTo('top')} aria-label="GABA Guide 홈"><span>뇌와 우리</span><small>GABA를 쉽게 읽는 공개 안내서</small></a>
        <nav id="guide-primary-navigation" className={menuOpen ? 'is-open' : ''} aria-label="주 메뉴">
          <a href="#history" aria-current={isNavCurrent('history') ? 'page' : undefined} onClick={(event) => { event.preventDefault(); scrollTo('history'); }}>발견</a>
          <a href="#basics" aria-current={isNavCurrent('basics') ? 'page' : undefined} onClick={(event) => { event.preventDefault(); scrollTo('basics'); }}>GABA란</a>
          <a href="#academic" aria-current={isNavCurrent('academic') ? 'page' : undefined} onClick={(event) => { event.preventDefault(); scrollTo('academic'); }}>연구 지도</a>
          <a href="#applications" aria-current={isNavCurrent('applications') ? 'page' : undefined} onClick={(event) => { event.preventDefault(); scrollTo('applications'); }}>활용 사례</a>
          <a href="#fermented-safety" aria-current={isNavCurrent('fermented-safety') ? 'page' : undefined} onClick={(event) => { event.preventDefault(); scrollTo('fermented-safety'); }}>발효·안전</a>
        </nav>
        <button ref={menuToggleRef} type="button" className="guide-menu-toggle" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="guide-primary-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        <button type="button" className="guide-header-share" onClick={sharePage}><Share2 size={16} aria-hidden="true" /> 공유하기</button>
        <div className={`guide-reading-progress${activeChapterId === 'top' ? '' : ' is-visible'}`}>
          <div className="guide-reading-progress-track" aria-hidden="true"><span style={{ width: `${(Math.max(0, activeChapterIndex + 1) / readingChapters.length) * 100}%` }} /></div>
          <div className="guide-reading-progress-meta"><span>지금 읽는 중</span><strong aria-live="polite">{activeChapter.label}</strong><small>{`${String(Math.max(0, activeChapterIndex + 1)).padStart(2, '0')} / ${String(readingChapters.length).padStart(2, '0')}`}</small></div>
        </div>
      </header>

      <main id="guide-main">
        <section className="guide-hero guide-hero-story" id="top" aria-labelledby="guide-hero-heading" style={{ '--guide-hero-image': `url(${gabaNaturalHero})` } as CSSProperties}>
          <div className="guide-hero-copy">
            <p className="guide-hero-kicker">수면의 질 · 회복의 시간</p>
            <h1 id="guide-hero-heading"><span>저속노화,<br />회복하는 밤에서 시작됩니다</span><em>그 회복의 신호를<span className="guide-mobile-break"><br /></span>{' '}GABA에서 읽습니다</em></h1>
            <p className="guide-hero-body">낮에는 몸과 뇌가 에너지를 사용합니다. 밤이 되면 몸은 회복에 필요한 과정으로 전환됩니다.</p>
            <p className="guide-editorial-note">{editorialNotice}</p>
            <p className="guide-reading-sequence"><span>3분 읽기</span> 수면과 회복 → GABA의 발견 → GABA란 → 연구 지도 → 활용 사례</p>
          </div>
          <NeuronNetwork />
          <div className="guide-hero-scroll" aria-hidden="true"><ArrowDown size={16} /> 아래로 읽기</div>
        </section>

        <section className="guide-opening-bridge guide-story-section" aria-labelledby="opening-bridge-heading">
          <div className="guide-container">
            <div className="guide-opening-bridge-head">
              <div>
                <p className="guide-section-number">수면과 회복</p>
                <h2 id="opening-bridge-heading">잠은 멈춤이 아니라,<br />회복이 시작되는 시간입니다</h2>
              </div>
              <p>잠의 역할을 이해하면<br />GABA를 읽는 이유가 보입니다.</p>
            </div>
            <div className="guide-opening-bridge-grid">
              <article><span>01</span><div><h3>낮에는 움직입니다</h3><p>뇌와 몸은 움직이며 에너지를 쓰고, 하루의 정보를 받아들입니다.</p></div></article>
              <article><span>02</span><div><h3>밤에는 정리합니다</h3><p>잠든 동안 뇌는 정보를 정리하고, 몸은 회복을 시작합니다.</p></div></article>
              <article><span>03</span><div><h3>회복할 시간이 필요합니다</h3><p>잠이 줄어들면 몸이 회복에 사용할 수 있는 시간도 함께 줄어듭니다.</p></div></article>
            </div>
            <div className="guide-opening-bridge-source">
              <BookOpen size={18} aria-hidden="true" />
              <p><strong>매슈 워커는 『우리는 왜 잠을 자야 할까』에서</strong> 잠을 단순한 휴식이 아니라 뇌와 몸이 건강을 유지하는 데 필요한 중요한 생리 과정으로 설명합니다.<small>참고 도서 · 매슈 워커, 『우리는 왜 잠을 자야 할까』, 열린책들</small></p>
            </div>
          </div>
        </section>

        <section className="guide-section guide-history guide-story-section" id="history" aria-labelledby="history-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-history-heading"><div><p className="guide-section-number">01 · 발견</p><h2 id="history-heading">처음에는 이름도<span className="guide-mobile-break"><br /></span> 없었습니다.<br />다만, 뇌 속에 있었습니다.</h2></div><p>하나의 발견이<br />넓어진 연구로 이어졌습니다.</p></div>
            <p className="guide-section-lead">유진 로버츠와 샘 프랭클은 당시의 분석 기술로 뇌 조직을 들여다보다가, 다른 조직에서는 거의 보이지 않는 물질을 발견했습니다. 그 물질이 바로 GABA였습니다.</p>
            <div className="guide-history-timeline">{historyMilestones.map((milestone, index) => <article className="guide-history-item" key={milestone.year}><div className="guide-history-marker"><span>{milestone.year}</span>{index < historyMilestones.length - 1 ? <i aria-hidden="true" /> : null}</div><div className="guide-history-copy"><h3>{milestone.title}</h3><p>{milestone.body}</p><a className="guide-study-source" href={milestone.source.url} target="_blank" rel="noopener noreferrer">{milestone.source.label} <ExternalLink size={13} aria-hidden="true" /></a></div></article>)}</div>
            <div className="guide-research-scale" aria-label="GABA 연구 규모">
              <div className="guide-research-scale-head"><div><p className="guide-section-number">연구 규모</p><h3>하나의 신호.<br />넓어진 연구.</h3></div><p>1950 → 지금</p></div>
              <div className="guide-research-scale-grid">{researchScaleStats.map((stat) => <article key={stat.label} aria-label={`${stat.label} ${stat.value}편 · ${stat.detail}`}><div className="guide-research-scale-bar" aria-hidden="true"><span style={{ '--guide-scale-height': `${stat.scale}%` } as CSSProperties} /></div><div><strong>{stat.value}</strong><h4>{stat.label}</h4><p>{stat.detail}</p><a href={stat.source.url} target="_blank" rel="noopener noreferrer">{stat.source.label} <ExternalLink size={12} aria-hidden="true" /></a></div></article>)}</div>
              <p className="guide-research-scale-caption">하버드·옥스퍼드 수치는 PubMed 검색 결과이며, SCIE 수치는 GABA-A 수용체 관련 공개 연구 분석에서 집계된 숫자입니다. 검색일은 2026년 9월 28일입니다.</p>
              <p className="guide-history-quote">작은 분자 하나의 발견은<br /><strong>뇌가 균형을 만드는 방식을 읽는 새로운 언어</strong>가 되었습니다.</p>
            </div>
          </div>
        </section>

        <section className="guide-summary-band guide-story-summary" aria-label="GABA 한 문장 요약">
          <div className="guide-container guide-summary-grid"><span className="guide-summary-label">GABA 한 문장</span><p>GABA는 뇌와 척수에서 신경 신호가 지나치게 커지지 않도록 조절하는 신경전달물질입니다.</p><span className="guide-summary-mark">GABA<br />= 조절의 신호</span></div>
        </section>

        <section className="guide-section guide-basics guide-story-section" id="basics" aria-labelledby="basics-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">02 · GABA란</p><h2 id="basics-heading">GABA는 우리 몸에서 만들어지는<br />신경전달물질입니다</h2></div><p>전문용어는 잠시 내려놓고,<br />세 가지 핵심으로 읽어보세요.</p></div>
            <p className="guide-section-lead">GABA는 뇌와 척수에서 신경 신호가 지나치게 커지지 않도록 조절하며, 신경계의 균형에 관여합니다.</p>
            <div className="guide-basics-grid guide-basics-three">
              <article className="guide-definition-card"><span className="guide-card-index">01</span><h3>신경세포 활동 조절</h3><p>신경세포가 지나치게 활성화되지 않도록 신호의 크기와 흐름을 조절합니다.</p><div className="guide-card-motif guide-motif-signal" aria-hidden="true"><i /><i /><i /><i /></div></article>
              <article className="guide-definition-card is-highlighted"><span className="guide-card-index">02</span><h3>잠들고 깨어나는 리듬</h3><p>잠들고 깨어나는 리듬에 관여하는 신경회로와 연결되어 있습니다.</p><div className="guide-card-motif guide-motif-moon" aria-hidden="true"><Moon /></div></article>
              <article className="guide-definition-card"><span className="guide-card-index">03</span><h3>감정·감각·집중·움직임</h3><p>감정, 감각, 집중, 움직임을 조율하는 신경회로와 연결되어 있습니다.</p><div className="guide-card-motif guide-motif-network" aria-hidden="true"><Network /></div></article>
            </div>
          </div>
        </section>

        <aside ref={recoveryBreakRef} className="guide-recovery-break" aria-labelledby="recovery-break-heading">
          <div className="guide-container">
            <div className="guide-recovery-break-head">
              <div>
                <p className="guide-section-number">잠깐, 수면과 회복</p>
                <h2 id="recovery-break-heading">GABA를 모르면<br />노화는 가속됩니다.</h2>
              </div>
              <p>잠은 단순히 멈추는 시간이 아닙니다.<br />뇌와 몸이 손상된 부분을 회복하고<br />쌓인 피로를 정리하는 시간입니다.</p>
            </div>
            <div ref={recoveryMapRef} className="guide-recovery-map" role="group" aria-label={`수면과 회복의 흐름 ${recoveryCards.length}단계`}>
              {recoveryCards.map((card, index) => {
                const Icon = recoveryIcons[index];
                return <button key={card.eyebrow} type="button" className={`guide-recovery-map-step${index === activeRecoveryCard ? ' is-active' : ''}`} data-recovery-index={index} aria-label={`${card.eyebrow} · ${index + 1}단계`} aria-controls="recovery-story-card" aria-pressed={index === activeRecoveryCard} onClick={() => selectRecoveryCard(index)}><span className="guide-recovery-map-icon"><Icon size={17} strokeWidth={1.8} aria-hidden="true" /></span></button>;
              })}
            </div>
            <div id="recovery-story-card" className={`guide-recovery-card is-${recoveryCard.tone}${recoveryPaused ? ' is-paused' : ''}`} role="group" aria-label={`수면과 회복 카드 ${activeRecoveryCard + 1} / ${recoveryCards.length}: ${recoveryCard.eyebrow}`} tabIndex={0} onKeyDown={handleRecoveryKeyDown} onTouchStart={handleRecoveryTouchStart} onTouchEnd={handleRecoveryTouchEnd}>
              <span className="sr-only" aria-live="polite">카드: {recoveryCard.eyebrow}, {activeRecoveryCard + 1}단계 / {recoveryCards.length}단계</span>
              <div className="guide-recovery-card-top">
                <div className="guide-recovery-card-copy">
                  <h3 className="guide-recovery-card-eyebrow">{recoveryCard.eyebrow}</h3>
                  <p>{recoveryCard.body}</p>
                </div>
                <div className="guide-recovery-card-art" style={{ backgroundImage: `url(${gabaRecoveryIllustrationSheet})`, backgroundPosition: recoveryArtPosition }} aria-hidden="true" />
              </div>
              <div className="guide-recovery-card-footer">
                <div className="guide-recovery-progress" aria-hidden="true"><i key={activeRecoveryCard} /></div>
                <span>{String(activeRecoveryCard + 1).padStart(2, '0')} / {String(recoveryCards.length).padStart(2, '0')}</span>
                <span>{recoveryPaused ? '일시정지' : '3초마다 다음 카드'}</span>
              </div>
            </div>
            <div className="guide-recovery-controls" aria-label="수면과 회복 카드 조작">
              <button type="button" aria-label="이전 카드" onClick={() => moveRecoveryCard(-1)}><ChevronLeft size={17} aria-hidden="true" /></button>
              <button type="button" className="guide-recovery-toggle" aria-pressed={recoveryPaused} onClick={() => setRecoveryPaused((paused) => !paused)}>{recoveryPaused ? <Play size={13} fill="currentColor" aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{recoveryPaused ? '다시 재생' : '잠시 멈춤'}</span></button>
              <button type="button" aria-label="다음 카드" onClick={() => moveRecoveryCard(1)}><ChevronRight size={17} aria-hidden="true" /></button>
            </div>
            <p className="guide-recovery-thread"><span>GABA란</span><i>→</i><strong>수면과 회복</strong><i>→</i><span>GABA를 읽는 시작점</span></p>
            <div className="guide-recovery-next">
              <p className="guide-recovery-next-kicker">그다음</p>
              <h3>GABA의 연구 지도로</h3>
              <p>수면과 회복에서 시작한 질문은 신경계의 균형, 집중, 감각, 피부, 근육과 성장 연구로 이어집니다.</p>
            </div>
          </div>
        </aside>

        <section className="guide-section guide-academic guide-story-section" id="academic" aria-labelledby="academic-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">03 · 연구 지도</p><h2 id="academic-heading">GABA 연구는<br />한 분야에 머물지 않았습니다</h2></div><p>하나의 신호에서<br />넓은 학술 지도로</p></div>
            <p className="guide-section-lead">신경세포의 활동을 조절하는 기본 원리에서 출발한 GABA 연구는 수면과 집중, 감각과 움직임, 그리고 몸 전체의 다양한 연구 영역으로 뻗어 나갔습니다.</p>
            <div className="guide-editorial-band guide-editorial-band-academic" style={{ '--guide-editorial-image': `url(${gabaNaturalHero})` } as CSSProperties} role="img" aria-label="물과 돌, 잎의 자연 질감으로 표현한 GABA 연구 지도 이미지"><span><small>신호에서 몸 전체로</small><strong>하나의 신호가<br />넓은 연구 지도가 되었습니다</strong></span></div>
            <div className="guide-academic-map">{academicFields.map((field, index) => <article key={field.title}><span>0{index + 1}</span><div><h3>{field.title}</h3><p>{field.body}</p></div></article>)}</div>
            <p className="guide-academic-caption"><FlaskConical size={17} aria-hidden="true" /> 기초 신경과학에서 사람 연구, 피부·근육·성장·면역 연구까지</p>
          </div>
        </section>

        <section className="guide-section guide-everyday guide-story-section" id="everyday" aria-labelledby="everyday-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">04 · 일상 속 GABA</p><h2 id="everyday-heading">우리는 매일 GABA의<br />조절 속에서 살아갑니다</h2></div><p>논문보다 먼저,<br />일상의 순간으로 이해해 보세요.</p></div>
            <div className="guide-everyday-cards">{everydayTopics.map((topic, index) => <article className="guide-everyday-card" key={topic.id}><span className="guide-everyday-number">0{index + 1}</span><span className="guide-topic-icon"><TopicIcon type={topic.icon} /></span><h3>{topic.title}</h3><p>{topic.body}</p></article>)}</div>
          </div>
        </section>

        <section className="guide-section guide-sleep-story guide-story-section" id="sleep" aria-labelledby="sleep-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">05 · 수면 연구</p><h2 id="sleep-heading">GABA가 가장 먼저 주목받은 분야, 수면</h2></div><p>수면 연구부터<br />GABA를 이해해 보세요.</p></div>
            <p className="guide-section-lead">GABA와 수면이 어떻게 연결되는지, 전문가 설명과 사람 대상 연구를 함께 살펴봅니다.</p>
            <div className="guide-sleep-grid">
              <div className="guide-sleep-steps">
                <article><span>01</span><div><h3>잠들고 깨는 과정과 GABA</h3><p>잠들려면 깨어 있게 하는 신경 신호가 낮아져야 합니다. GABA 신호는 잠이 시작되고 이어지는 과정과 관련이 있습니다.</p></div></article>
              <article><span>02</span><div><h3>사람 대상 수면 연구</h3><p>수면의 질이 낮았던 성인 16명이 GABA 100mg 캡슐과 대조 캡슐을 각각 1주씩 섭취한 무작위·위약 대조 교차시험입니다.</p><strong className="guide-result-line">GABA를 섭취한 기간에는 잠드는 시간이 더 짧았고, 전체 비렘수면은 더 길었습니다.</strong><p className="guide-study-source">출처 · <a href="https://pubmed.ncbi.nlm.nih.gov/30263304/" target="_blank" rel="noopener noreferrer">Yamatsu et al. 2016 · PMID 30263304 <ExternalLink size={13} aria-hidden="true" /></a></p></div></article>
              <article><span>03</span><div><h3>실제로 달라진 수면 기록</h3><ResearchOutcomeChart topic={sleepResultTopic} /><p className="guide-study-source">출처 · <a href="https://pubmed.ncbi.nlm.nih.gov/30263304/" target="_blank" rel="noopener noreferrer">Yamatsu et al. 2016 · PMID 30263304 <ExternalLink size={13} aria-hidden="true" /></a></p></div></article>
                <article><span>04</span><div><h3>몸의 리듬과 연구 결과</h3><div className="guide-compare-row"><span>몸에서 일어나는 일</span><strong>GABA와 수면 리듬의 관계</strong></div><div className="guide-compare-row"><span>사람 대상 연구에서 본 변화</span><strong>잠드는 시간·전체 비렘수면</strong></div></div></article>
              </div>
              <div className="guide-sleep-visual" style={{ '--guide-sleep-image': `url(${gabaSleepEditorial})` } as CSSProperties} aria-label="잔잔한 물결과 달빛으로 표현한 수면 연구 이미지" role="img"><div className="guide-sleep-wave"><i /><i /><i /><i /><i /><i /></div><span className="guide-sleep-orbit guide-sleep-orbit-one" /><span className="guide-sleep-orbit guide-sleep-orbit-two" /><strong>잠들기 전<br />신경 신호의 리듬</strong></div>
            </div>
          </div>
        </section>

        <section className="guide-section guide-research guide-story-section" id="research" aria-labelledby="research-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-section-heading-wide"><div><p className="guide-section-number">06 · 연구의 확장</p><h2 id="research-heading">수면에서 시작해<br />다섯 영역으로 확장됩니다</h2></div><p>사람·동물·세포 연구를<br />같은 기준으로 비교합니다.</p></div>
            <div className="guide-research-map" aria-label="GABA에서 다섯 연구 영역으로 확장되는 구조">
              <svg className="guide-research-map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 43V22M57 50H78M56 56L77 77M44 56L23 77M43 50H22" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth=".65" strokeDasharray="1 2" /></svg>
              <div className="guide-research-orbit-core"><strong>GABA</strong></div>
              {researchTopics.map((topic) => <div className="guide-research-map-item" key={topic.id}><span className="guide-research-map-dot" aria-hidden="true"><i /></span><div><strong>{topic.title}</strong></div></div>)}
            </div>
            <div className="guide-research-flow">{researchTopics.map((topic, index) => <article className="guide-research-detail guide-research-detail-inline" id={`research-${topic.id}`} key={topic.id}><div className="guide-research-detail-top"><EvidenceBadge tone={topic.tone} label={topic.label} /><span>{topic.english}</span></div><div className="guide-research-inline-heading"><span className="guide-research-card-number">0{index + 1}</span><ResearchGlyph id={topic.id} /><h3>{topic.title} 연구 결과</h3></div><ResearchOutcomeChart topic={topic} /><dl><div><dt>어떻게 살펴봤나요?</dt><dd>{topic.study}</dd></div><div><dt>무엇이 달라졌나요?</dt><dd className="guide-research-finding">{topic.finding}</dd></div><div><dt>이 연구에서 알 수 있는 것</dt><dd>{topic.interpretation}</dd></div></dl><p className="guide-research-source"><span>출처</span><a href={topic.source.url} target="_blank" rel="noopener noreferrer">{topic.source.label} <ExternalLink size={13} aria-hidden="true" /></a></p></article>)}</div>
            <p className="guide-research-reminder"><span>연구 결과를 먼저 읽고, 각 카드 아래 출처에서 원문으로 이어집니다.</span></p>
          </div>
        </section>

        <section className="guide-section guide-applications guide-story-section" id="applications" aria-labelledby="applications-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">07 · 국내외 활용</p><h2 id="applications-heading">GABA는 연구실을 넘어<br />여러 분야로 이어지고 있습니다</h2></div><p>국내외 활용 사례를<br />한 흐름으로 살펴봅니다.</p></div>
            <p className="guide-section-lead">발효와 발아, 식품과 바이오 기술. GABA는 뇌 연구를 넘어 다양한 연구와 산업 현장에서 다뤄지고 있습니다.</p>
            <div className="guide-editorial-band guide-editorial-band-applications" style={{ '--guide-editorial-image': `url(${gabaApplicationsEditorial})` } as CSSProperties} role="img" aria-label="발아 곡물과 식품과학 연구 장면으로 표현한 국내외 활용 연구 이미지"><span><small>한국에서 세계로</small><strong>발효와 발아,<br />식품과 바이오 기술로</strong></span></div>
            <div className="guide-application-grid">{applicationCases.map((item) => <article className="guide-application-card" key={item.id}><div className="guide-application-top"><span className="guide-application-icon"><ApplicationIcon type={item.icon} /></span><span>{item.region}</span></div><h3>{item.title}</h3><p>{item.body}</p><strong>{item.detail}</strong><div className="guide-application-sources"><span>연구·공공자료</span>{item.sources.map((source) => <a href={source.url} target="_blank" rel="noopener noreferrer" key={source.url}>{source.label} <ExternalLink size={13} aria-hidden="true" /></a>)}</div></article>)}</div>
          </div>
        </section>

        <section className="guide-section guide-fermented-safety guide-story-section" id="fermented-safety" aria-labelledby="fermented-safety-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-fermented-heading"><div><p className="guide-section-number">08 · 발효와 안전</p><h2 id="fermented-safety-heading">발효는 GABA를<br />식품의 언어로 바꾸었습니다</h2></div><p>발효의 시작부터<br />안전성 기록까지</p></div>
            <div className="guide-editorial-band guide-editorial-band-fermentation" style={{ '--guide-editorial-image': `url(${gabaFermentationEditorial})` } as CSSProperties} role="img" aria-label="발효 용기와 발아 곡물로 표현한 발효 GABA 연구 이미지"><span><small>발효에서 기록으로</small><strong>자연의 발효가<br />공개된 기록이 되기까지</strong></span></div>
            <div className="guide-fermented-intro">
              <div className="guide-fermented-statement"><span className="guide-fermented-seal"><ShieldCheck aria-hidden="true" /></span><p><strong>하나의 신호가<br />식탁 위의 연구가 되기까지</strong><span>발효 원리 · 공정과 품질 · 사람 대상 연구</span></p></div>
              <p className="guide-section-lead">김치와 발효 식품에서 GABA를 만드는 미생물을 찾는 연구가 이어지며, GABA 연구는 뇌 속 신호에서 식품 연구의 소재로 넓어졌습니다. 발효 GABA에 대한 관심은 만들어지는 과정과 품질, 사람이 섭취했을 때의 연구 기록까지 이어집니다.</p>
            </div>
            <div className="guide-fermented-steps">{fermentedSafetySteps.map((step) => <article className="guide-fermented-step" key={step.number}><div className="guide-fermented-step-top"><span className="guide-fermented-step-number">{step.number}</span><span className="guide-fermented-step-icon"><FermentedSafetyIcon type={step.icon} /></span><span>{step.eyebrow}</span></div><h3>{step.title}</h3><p>{step.body}</p><a href={step.source.url} target="_blank" rel="noopener noreferrer">{step.source.label} <ExternalLink size={13} aria-hidden="true" /></a></article>)}</div>
            <p className="guide-fermented-note"><Check size={16} aria-hidden="true" /> 발효 GABA의 안전성은 발효했다는 사실만으로 판단하는 것이 아니라, 균주·공정·최종 원료·사람 대상 연구가 함께 쌓인 공개 기록으로 살펴볼 수 있습니다.</p>
          </div>
        </section>

        <section className="guide-section guide-growth-story guide-story-section" id="growth" aria-labelledby="growth-heading">
          <div className="guide-container"><div className="guide-section-heading"><div><p className="guide-section-number">09 · 성장 연구</p><h2 id="growth-heading">성장호르몬 연구는<br />키 성장과 어떻게 연결될까요?</h2></div><p>하나의 결론보다<br />연구가 이어지는 경로를 봅니다.</p></div><p className="guide-section-lead">GABA 연구가 성장 관련 질문으로 이어지는 과정을 한 줄씩 살펴볼 수 있습니다.</p><div className="guide-growth-flow">{growthSteps.map((step, index) => <div className="guide-growth-step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < growthSteps.length - 1 ? <ArrowRight className="guide-growth-arrow" aria-hidden="true" /> : null}</div>)}</div><p className="guide-growth-note">앞서 본 근육·성장호르몬 연구에서는 혈액 속 호르몬과 청소년기 생쥐의 몸길이 변화를 살폈습니다. 이 결과는 성장 연구가 신경 조절에서 호르몬과 성장 지표로 이어지는 경로를 보여줍니다.</p></div>
        </section>

        <section className="guide-section guide-expert-videos guide-story-section" id="expert-videos" aria-labelledby="expert-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">10 · 전문가 영상</p><h2 id="expert-heading">의사와 과학자들은<br />GABA를 어떻게 설명할까요?</h2></div><p>관심 있는 영상을 고르면<br />바로 재생됩니다.</p></div>
            <p className="guide-section-lead guide-video-gallery-lead">의사와 과학자들이 공개한 짧은 영상을 수면, GABA의 기본 역할, 자율신경, 연구 읽기 주제로 나누어 모았습니다.</p>
            <div className="guide-video-gallery">
              <article className="guide-video-feature" id="expert-video-feature" aria-live="polite">
                <div className="guide-video-feature-media">{videoStarted ? <iframe key={activeVideo.id} title={`${activeVideo.title} · ${activeVideo.channel}`} src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <button type="button" className="guide-video-feature-poster" onClick={() => setVideoStarted(true)} aria-label={`${activeVideo.title} 영상 재생`}><img src={`https://i.ytimg.com/vi/${activeVideo.id}/hqdefault.jpg`} alt={`${activeVideo.title} 영상 썸네일`} fetchPriority="high" decoding="async" /><span className="guide-video-feature-poster-shade" aria-hidden="true" /><span className="guide-video-feature-poster-play"><Play size={20} fill="currentColor" aria-hidden="true" /><strong>영상 재생</strong></span></button>}</div>
                <div className="guide-video-feature-copy"><div className="guide-video-feature-meta"><span>{activeVideo.topic}</span><span>선택 즉시 재생</span></div><h3>{activeVideo.title}</h3><p>{activeVideo.channel}</p><a href={`https://www.youtube.com/shorts/${activeVideo.id}`} target="_blank" rel="noopener noreferrer">YouTube에서 원본 보기 <ExternalLink size={14} aria-hidden="true" /></a></div>
              </article>
              <div className="guide-video-board" aria-label="전문가 영상 게시판">
                <div className="guide-video-board-head"><span>전문가 영상</span><strong>{expertVideos.length}개 영상</strong></div>
                <div className="guide-video-grid">{expertVideos.map((video, index) => <button type="button" className={`guide-video-card${activeVideo.id === video.id ? ' is-active' : ''}`} key={video.id} aria-pressed={activeVideo.id === video.id} onClick={() => selectExpertVideo(video.id)}><span className="guide-video-card-thumb"><img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /><span className="guide-video-card-play"><Play size={14} fill="currentColor" aria-hidden="true" /></span></span><span className="guide-video-card-copy"><span>{video.topic}</span><strong>{video.title}</strong><small>{video.channel}</small></span></button>)}</div>
              </div>
            </div>
            <p className="guide-expert-note guide-video-gallery-note">각 채널에서 공개한 짧은 영상을 모았습니다. 선택한 영상은 이 페이지에서 바로 재생되며, 원문 링크도 함께 제공합니다.</p>
            <div className="guide-expert-thread"><span>이어서 읽기</span><strong>수면 연구</strong><i>→</i><strong>연구 결과</strong><i>→</i><strong>출처 원문</strong></div>
          </div>
        </section>

        <section className="guide-section guide-reading-note guide-story-section" id="reading-note" aria-label="연구 읽는 순서"><div className="guide-container"><p className="guide-section-number">11 · 출처 읽기</p><p className="guide-reading-note-copy">각 연구 카드에서 연구 방법과 실제 관찰 결과를 읽은 뒤, 카드 아래 출처를 통해 원문으로 이어집니다.</p></div></section>

        <section className="guide-final" id="final" aria-labelledby="final-heading"><div className="guide-container"><p className="guide-section-number">12 · 이야기 공유</p><h2 id="final-heading">1950년의 작은 발견은<br />오늘의 연구 지도가 되었습니다</h2><p className="guide-final-copy">GABA는 뇌 속에서 시작해 수면, 집중, 감각, 움직임, 피부, 근육, 성장호르몬과 면역을 거쳐 발효 식품과 안전성 연구로 이어졌습니다. 필요한 주제를 골라 읽고 자유롭게 공유해 보세요.</p><p className="guide-editorial-note">{editorialNotice}</p><div className="guide-final-actions"><button type="button" className="guide-primary-button" onClick={sharePage}><Share2 size={17} aria-hidden="true" /> GABA 이야기 공유하기 <ArrowRight size={17} aria-hidden="true" /></button></div>{shareStatus ? <span className="guide-share-status guide-final-status" role="status">{shareStatus}</span> : null}<details className="guide-share-lines"><summary>사업자용 GABA 핵심 5문장 · 바로 복사하기</summary><div>{messageKit.map((message, index) => <article key={message}><span>0{index + 1}</span><p>{message}</p><button type="button" onClick={() => copyMessage(message)}>문장 복사</button></article>)}</div></details></div></section>
      </main>

      <footer className="guide-footer"><div className="guide-container guide-footer-grid"><a className="guide-logo" href="#top" onClick={() => scrollTo('top')}><span>뇌와 우리</span><small>GABA를 쉽게 읽는 공개 안내서</small></a><p>GABA를 쉽게 이해하고<br />자유롭게 공유하는 공개 안내서입니다.</p><div><a href="#history">발견의 역사</a><a href="#applications">활용 사례</a><a href="#top">맨 위로 ↑</a></div></div><div className="guide-container guide-footer-bottom"><span>© 2026 GABA Guide</span><span>1950년, 뇌 속에서 발견된 신호</span></div></footer>
    </div>
  );
}
