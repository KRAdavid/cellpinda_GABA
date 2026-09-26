import { useEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  CircleHelp,
  ExternalLink,
  FlaskConical,
  Menu,
  Moon,
  Network,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
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
  summary: string;
  observed: string;
  interpretation: string;
  source: { label: string; url: string };
};

type ExpertTopic = {
  id: string;
  title: string;
  source: { label: string; url: string };
};

type LibraryRow = {
  id: string;
  title: string;
  topic: string;
  model: string;
  year: string;
  institution: string;
  measure: string;
  participant: string;
  observed: string;
  detail: string;
  source: { label: string; url: string };
};

const everydayTopics: EverydayTopic[] = [
  { id: 'sleep', title: '잠들 때', body: '각성과 휴식의 리듬을 바꾸는 신경회로가 움직입니다.', icon: 'moon' },
  { id: 'stress', title: '긴장되는 순간', body: '과도한 신호를 낮추고 균형을 찾는 과정이 시작됩니다.', icon: 'sparkles' },
  { id: 'focus', title: '필요한 정보에 집중할 때', body: '필요한 신호와 덜 필요한 신호를 나누는 조절이 일어납니다.', icon: 'focus' },
  { id: 'movement', title: '몸을 움직이고 멈출 때', body: '활성화와 억제가 맞물려 부드러운 움직임을 만듭니다.', icon: 'movement' },
  { id: 'sense', title: '감각 정보를 구분할 때', body: '들어오는 소리와 촉감을 같은 강도로 처리하지 않습니다.', icon: 'sense' },
];

const researchTopics: ResearchTopic[] = [
  {
    id: 'cognition',
    title: '인지',
    english: 'Cognition & focus',
    tone: 'human',
    label: '사람·뇌 기능 연구',
    summary: '집중과 기억에 필요한 정보 선택과 억제 과정은 GABA 신호와 연결해 연구되고 있습니다.',
    observed: '사람 대상 연구에서는 머리를 많이 쓴 뒤 뇌파와 활력 설문 점수의 변화를 살펴봤습니다.',
    interpretation: '필요한 신호를 고르고 덜 필요한 신호를 낮추는 신경 조절의 언어로 설명할 수 있습니다.',
    source: { label: '머리를 많이 쓴 뒤 뇌파 연구 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/22203366/' },
  },
  {
    id: 'skin',
    title: '피부',
    english: 'Skin & barrier',
    tone: 'early',
    label: '피부 생리 연구',
    summary: '피부는 신경과 면역 신호가 만나는 기관이며, GABA 연구도 피부 장벽과 컨디션으로 확장되고 있습니다.',
    observed: '피부 세포의 신호 조절, 장벽, 자외선 노화와 관련된 GABA 연구를 살펴봅니다.',
    interpretation: 'GABA를 뇌에만 머무르지 않고 피부와 신경의 연결로 이해할 수 있습니다.',
    source: { label: 'GABA와 피부 생리 연구 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+skin+barrier+research' },
  },
  {
    id: 'muscle',
    title: '근육',
    english: 'Muscle & movement',
    tone: 'human',
    label: '운동 생리 연구',
    summary: '저항운동과 움직임은 활성화와 억제가 맞물릴 때 자연스러워집니다.',
    observed: '운동 경험이 있는 남성 11명이 GABA를 먹고 쉰 경우와 운동한 경우의 혈액 속 성장호르몬을 살펴본 연구가 있습니다.',
    interpretation: 'GABA를 근육의 긴장과 움직임을 조절하는 신경 신호와 연결해 소개할 수 있습니다.',
    source: { label: 'GABA와 운동·성장호르몬 연구 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+exercise+growth+hormone' },
  },
  {
    id: 'growth-hormone',
    title: '성장호르몬',
    english: 'Growth hormone',
    tone: 'early',
    label: '성장호르몬 연구',
    summary: '휴식과 운동 조건에서 측정된 호르몬 반응을 통해 GABA와 성장 리듬의 연결을 살펴봅니다.',
    observed: '성인 대상 연구에서는 한 번 섭취한 뒤 90분 동안 혈액 속 성장호르몬을 측정했습니다.',
    interpretation: 'GABA 연구가 수면·신경 조절에서 내분비 신호로 넓어지는 흐름을 보여줍니다.',
    source: { label: 'GABA와 성장호르몬 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+growth+hormone+sleep+exercise' },
  },
  {
    id: 'immune',
    title: '면역',
    english: 'Neuroimmune balance',
    tone: 'early',
    label: '신경·면역 연구',
    summary: '신경계와 면역계는 서로 신호를 주고받으며, GABA는 그 연결을 이해하는 연구 주제가 됩니다.',
    observed: '면역세포의 활동과 신경전달 신호 사이의 연결을 살펴보는 연구가 이어지고 있습니다.',
    interpretation: 'GABA를 신경계와 면역계가 만나는 조절 성분으로 설명할 수 있습니다.',
    source: { label: 'GABA와 신경·면역 연결 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+neuroimmune+system' },
  },
];

const expertTopics: ExpertTopic[] = [
  { id: 'basics', title: 'GABA의 기본 역할', source: { label: 'GABA 신경생리학 개요 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/32166183/' } },
  { id: 'sleep', title: '수면', source: { label: 'GABA와 수면을 본 사람 연구 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/30263304/' } },
  { id: 'stress', title: '스트레스·불안', source: { label: 'GABA와 스트레스 연구 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+stress+human+study' } },
  { id: 'autonomic', title: '자율신경', source: { label: 'GABA와 자율신경 연구 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+autonomic+nervous+system' } },
  { id: 'cognition', title: '인지', source: { label: '감각 학습과 뇌 속 GABA 연구 · PubMed', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4737612/' } },
  { id: 'skin', title: '피부', source: { label: 'GABA와 피부 생리 연구 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+skin+barrier+research' } },
  { id: 'movement', title: '운동·근육', source: { label: 'GABA와 운동 생리 연구 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+muscle+exercise+physiology' } },
  { id: 'growth', title: '성장', source: { label: 'GABA와 성장호르몬 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+growth+hormone+exercise' } },
];

const libraryRows: LibraryRow[] = [
  {
    id: 'yamatsu-2016', title: 'GABA 캡슐과 수면 기록', topic: '수면', model: '사람', year: '2010년대', institution: '일본 연구', measure: '수면 기록',
    participant: '수면 설문에서 잠의 질이 낮게 나온 일본 성인 10명', observed: 'GABA 100mg 캡슐 기간에 비교 캡슐보다 평균 잠드는 시간이 5분 짧게 기록됐습니다.', detail: '각 캡슐을 1주 동안 먹고 중간에 1주 쉬며 잠드는 시간과 수면 중 단계를 살펴본 연구입니다.', source: { label: 'Yamatsu 2016 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/26870151/' },
  },
  {
    id: 'byun-2018', title: 'GABA 정제와 잠드는 시간', topic: '수면', model: '사람', year: '2010년대', institution: '사람 대상 연구', measure: '잠드는 시간',
    participant: '잠드는 데 어려움이 있던 성인 40명', observed: 'GABA 300mg 정제와 비교 정제를 4주 먹고 잠드는 시간을 기록했습니다.', detail: '두 그룹의 참여자 수와 연구 조건을 함께 보며 수면 기록을 읽는 연구입니다.', source: { label: 'Byun 2018 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/30263304/' },
  },
  {
    id: 'yoto-2012', title: '머리를 많이 쓴 뒤 뇌파', topic: '인지', model: '사람', year: '2010년대', institution: 'Pharma Foods 관계 저자', measure: '뇌파·활력',
    participant: '건강한 성인 63명', observed: 'GABA 100mg 캡슐을 먹고 머리를 많이 쓴 뒤 뇌파와 활력 점수 변화를 비교했습니다.', detail: '서로 다른 날 GABA 캡슐과 비교 캡슐을 한 번씩 먹고 30분 뒤 과제를 수행했습니다.', source: { label: 'Yoto 2012 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/22203366/' },
  },
  {
    id: 'powers-2008', title: '운동 조건의 성장호르몬', topic: '성장호르몬', model: '사람', year: '2000년대', institution: '운동 생리 연구', measure: '성장호르몬',
    participant: '운동 경험이 있는 남성 11명', observed: 'GABA 3g을 한 번 먹고 쉰 경우와 운동한 경우의 혈액 속 성장호르몬을 90분 동안 살펴봤습니다.', detail: '이 연구는 혈액 속 호르몬 반응을 측정한 연구이며, 성장속도나 최종 신장을 측정한 연구는 아닙니다.', source: { label: 'Powers 2008 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+Powers+2008+growth+hormone' },
  },
  {
    id: 'heba-2016', title: '손끝 감각과 뇌 속 GABA', topic: '인지', model: '사람', year: '2010년대', institution: '사람 대상 관찰', measure: '손끝 감각',
    participant: '건강한 성인 18명', observed: '손끝 자극 전후 감각 점수와 시작 전 뇌 속 GABA 신호의 관계를 기록했습니다.', detail: 'GABA를 먹지 않고 45분 손끝 자극 전후의 점수와 신호를 살펴본 관찰 연구입니다.', source: { label: 'Heba 2016 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Heba+GABA+fingertip+2016' },
  },
  {
    id: 'review-2020', title: '사람 연구 14편의 흐름', topic: '스트레스', model: '사람', year: '2020년대', institution: '검토 논문', measure: '스트레스·잠',
    participant: '사람이 GABA를 먹은 연구 14편', observed: '각 연구의 참여자·먹은 양·기간·스트레스와 잠 지표를 한데 모았습니다.', detail: '한 번의 실험이 아니라 2020년까지의 사람 대상 연구 흐름을 정리한 검토 자료입니다.', source: { label: 'GABA 연구 검토 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+systematic+review+stress+sleep' },
  },
];

const growthSteps = ['GABA 연구', '수면 및 신경 조절', '성장호르몬 반응', '체성분과 성장 관련 지표', '성장기 동물 연구', '어린이 대상 연구'];
const messageKit = [
  'GABA는 우리 몸에서 만들어지는 신경전달물질입니다.',
  'GABA는 신경세포의 활동 균형을 조절하는 핵심 신호입니다.',
  'GABA는 수면·긴장·집중·감각·운동과 연결됩니다.',
  'GABA 연구는 피부·인지·근육·성장·면역으로 확장되고 있습니다.',
  'GABA를 알면 수면뿐 아니라 신경계의 조절을 이해할 수 있습니다.',
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

function moveGuideTab(event: ReactKeyboardEvent<HTMLButtonElement>, ids: string[], current: string, setCurrent: (value: string) => void, prefix: string) {
  if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const currentIndex = Math.max(0, ids.indexOf(current));
  const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? ids.length - 1 : (currentIndex + (event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1) + ids.length) % ids.length;
  const next = ids[nextIndex];
  setCurrent(next);
  requestAnimationFrame(() => document.getElementById(`${prefix}-${next}`)?.focus());
}

export default function PublicGabaGuide() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState('cognition');
  const [libraryTopic, setLibraryTopic] = useState('전체');
  const [libraryModel, setLibraryModel] = useState('전체');
  const [libraryYear, setLibraryYear] = useState('전체');
  const [libraryInstitution, setLibraryInstitution] = useState('전체');
  const [libraryMeasure, setLibraryMeasure] = useState('전체');
  const [shareStatus, setShareStatus] = useState('');

  useEffect(() => {
    document.title = '수면에서 인지, 피부, 근육과 성장 연구까지 | GABA Guide';
    const description = '수면에서 인지, 피부, 근육과 성장 연구까지 GABA를 쉽게 이해하고 공유하는 공개 안내서입니다.';
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = window.location.href.split('?')[0].split('#')[0];
    const targetId = window.location.hash.slice(1);
    if (targetId) requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  }, []);

  const activeResearch = researchTopics.find((topic) => topic.id === selectedResearch) || researchTopics[0];
  const researchIds = researchTopics.map((topic) => topic.id);
  const filteredLibraryRows = useMemo(() => libraryRows.filter((row) => (
    (libraryTopic === '전체' || row.topic === libraryTopic)
    && (libraryModel === '전체' || row.model === libraryModel)
    && (libraryYear === '전체' || row.year === libraryYear)
    && (libraryInstitution === '전체' || row.institution === libraryInstitution)
    && (libraryMeasure === '전체' || row.measure === libraryMeasure)
  )), [libraryInstitution, libraryMeasure, libraryModel, libraryTopic, libraryYear]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
  };

  const sharePage = async () => {
    const shareData = { title: '수면에서 인지, 피부, 근육과 성장 연구까지', text: 'GABA를 3분 만에 이해하고 주제별 연구를 살펴보는 공개 안내서', url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus('공유 창을 열었어요.');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus('링크를 복사했어요. 자유롭게 공유해 보세요.');
      }
    } catch {
      setShareStatus('공유를 취소했어요.');
    }
  };

  const copyMessage = async (message: string) => {
    try {
      await navigator.clipboard?.writeText(message);
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
        <nav className={menuOpen ? 'is-open' : ''} aria-label="주 메뉴">
          <a href="#basics" onClick={() => setMenuOpen(false)}>GABA란</a>
          <a href="#sleep" onClick={() => setMenuOpen(false)}>수면</a>
          <a href="#research" onClick={() => setMenuOpen(false)}>연구 확장</a>
          <a href="#expert-videos" onClick={() => setMenuOpen(false)}>전문가 영상</a>
          <a href="#library" onClick={() => setMenuOpen(false)}>자료실</a>
        </nav>
        <button type="button" className="guide-menu-toggle" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        <button type="button" className="guide-header-share" onClick={sharePage}><Share2 size={16} aria-hidden="true" /> 공유하기</button>
      </header>

      <main id="guide-main">
        <section className="guide-hero guide-hero-story" id="top" aria-labelledby="guide-hero-heading">
          <div className="guide-hero-copy">
            <h1 id="guide-hero-heading"><span>수면에서 인지, 피부,<br />근육과 성장 연구까지</span><em>이제 GABA를 알아야 합니다</em></h1>
            <p className="guide-hero-body">잠들고, 집중하고, 움직이는 순간마다 우리 몸에서는 수많은 신경 신호가 조절됩니다. 그 과정의 중심에서 연구되는 물질이 GABA입니다.</p>
            <div className="guide-hero-actions guide-story-actions">
              <button type="button" className="guide-primary-button" onClick={() => scrollTo('basics')}><BookOpen size={17} aria-hidden="true" /> 3분 만에 GABA 이해하기 <ArrowRight size={17} aria-hidden="true" /></button>
              <button type="button" className="guide-quiet-button" onClick={() => scrollTo('expert-videos')}><span className="guide-action-play" aria-hidden="true">▶</span> 전문가 영상 보기 <ArrowRight size={17} aria-hidden="true" /></button>
              <button type="button" className="guide-quiet-button" onClick={() => scrollTo('research')}><FlaskConical size={16} aria-hidden="true" /> 주제별 연구 보기 <ArrowRight size={17} aria-hidden="true" /></button>
            </div>
          </div>
          <NeuronNetwork />
          <div className="guide-hero-scroll" aria-hidden="true"><ArrowDown size={16} /> 아래로 읽기</div>
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

        <section className="guide-section guide-everyday guide-story-section" id="everyday" aria-labelledby="everyday-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">03 · EVERYDAY GABA</p><h2 id="everyday-heading">우리는 이미 매일 GABA의<br />조절 속에서 생활합니다</h2></div><p>논문보다 먼저,<br />일상의 순간으로 이해해 보세요.</p></div>
            <div className="guide-everyday-cards">{everydayTopics.map((topic, index) => <article className="guide-everyday-card" key={topic.id}><span className="guide-everyday-number">0{index + 1}</span><span className="guide-topic-icon"><TopicIcon type={topic.icon} /></span><h3>{topic.title}</h3><p>{topic.body}</p></article>)}</div>
          </div>
        </section>

        <section className="guide-section guide-sleep-story guide-story-section" id="sleep" aria-labelledby="sleep-heading">
          <div className="guide-container">
            <div className="guide-section-heading"><div><p className="guide-section-number">04 · SLEEP</p><h2 id="sleep-heading">GABA가 가장 먼저 주목받은<br />분야, 수면</h2></div><p>수면을 대표 사례로<br />GABA 연구를 읽습니다.</p></div>
            <p className="guide-section-lead">수면과 GABA의 생리적 관계에서 출발해, 전문가 설명과 대표 인체연구를 한 화면에서 비교해 보세요.</p>
            <div className="guide-sleep-grid">
              <div className="guide-sleep-steps">
                <article><span>01</span><div><h3>수면과 GABA의 생리적 관계</h3><p>잠들기 전에는 각성을 유지하는 신경회로의 활동이 낮아져야 합니다. GABA성 신경전달은 그 수면 시작과 유지의 리듬에 관여합니다.</p></div></article>
                <article><span>02</span><div><h3>전문가 쇼츠 3~4개</h3><p>수면·GABA를 설명하는 전문가 영상은 큐레이션 중입니다. 지금은 대표 논문을 먼저 제공하고, 영상은 같은 주제의 설명으로 이어집니다.</p><button type="button" className="guide-inline-link" onClick={() => scrollTo('expert-videos')}>전문가 영상 모아보기 <ArrowRight size={15} aria-hidden="true" /></button></div></article>
                <article><span>03</span><div><h3>대표 인체연구</h3><p>일본 성인 10명이 하루 GABA 100mg 캡슐과 비교 캡슐을 각각 1주 동안 먹고, 잠드는 시간과 수면 중 단계를 살펴본 연구가 있습니다.</p><a className="guide-inline-link" href="https://pubmed.ncbi.nlm.nih.gov/26870151/" target="_blank" rel="noopener noreferrer">원문 보기 <ExternalLink size={14} aria-hidden="true" /></a></div></article>
                <article><span>04</span><div><h3>영상에서 말한 내용과 연구 내용 비교</h3><div className="guide-compare-row"><span>영상의 언어</span><strong>GABA와 수면 리듬의 관계</strong></div><div className="guide-compare-row"><span>연구의 기록</span><strong>잠드는 시간·수면 중 단계</strong></div></div></article>
              </div>
              <div className="guide-sleep-visual" aria-label="수면 연구를 설명하는 추상적인 파형 그림" role="img"><div className="guide-sleep-wave"><i /><i /><i /><i /><i /><i /></div><span className="guide-sleep-orbit guide-sleep-orbit-one" /><span className="guide-sleep-orbit guide-sleep-orbit-two" /><strong>잠들기 전<br />신경 신호의 리듬</strong></div>
            </div>
          </div>
        </section>

        <section className="guide-section guide-research guide-story-section" id="research" aria-labelledby="research-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-section-heading-wide"><div><p className="guide-section-number">05 · RESEARCH EXPANSION</p><h2 id="research-heading">GABA 연구는 어디까지<br />확장되고 있을까요?</h2></div><p>수면에서 시작해<br />다섯 영역으로 넓어집니다.</p></div>
            <div className="guide-research-layout"><div className="guide-research-grid guide-research-five" role="tablist" aria-label="GABA 연구 확장 주제">{researchTopics.map((topic) => <button type="button" role="tab" id={`research-tab-${topic.id}`} aria-controls="research-panel" aria-selected={selectedResearch === topic.id} tabIndex={selectedResearch === topic.id ? 0 : -1} key={topic.id} className={`guide-research-card ${selectedResearch === topic.id ? 'is-active' : ''}`} onClick={() => setSelectedResearch(topic.id)} onKeyDown={(event) => moveGuideTab(event, researchIds, selectedResearch, setSelectedResearch, 'research-tab')}><div className="guide-research-card-head"><span>{topic.title}</span><small>{topic.english}</small></div><EvidenceBadge tone={topic.tone} label={topic.label} /><ResearchGlyph id={topic.id} /><span className="guide-research-open">대표 연구 보기 <ArrowRight size={15} aria-hidden="true" /></span></button>)}</div><article className="guide-research-detail" id="research-panel" role="tabpanel" aria-labelledby={`research-tab-${activeResearch.id}`} aria-live="polite"><div className="guide-research-detail-top"><EvidenceBadge tone={activeResearch.tone} label={activeResearch.label} /><span>{activeResearch.english}</span></div><h3>{activeResearch.title} 연구가 보여주는 이야기</h3><p className="guide-research-summary">{activeResearch.summary}</p><dl><div><dt>무엇을 관찰하나요?</dt><dd>{activeResearch.observed}</dd></div><div><dt>어떤 흐름으로 읽나요?</dt><dd>{activeResearch.interpretation}</dd></div></dl><div className="guide-research-source"><span>대표 연구</span><a href={activeResearch.source.url} target="_blank" rel="noopener noreferrer">{activeResearch.source.label} <ExternalLink size={13} aria-hidden="true" /></a></div></article></div>
            <p className="guide-research-reminder"><FlaskConical size={18} aria-hidden="true" /><span>각 카드에서는 한 문장으로 읽고, 자료실에서 참여자·측정 항목·관찰 기록을 더 자세히 살펴볼 수 있습니다.</span></p>
          </div>
        </section>

        <section className="guide-section guide-growth-story guide-story-section" id="growth" aria-labelledby="growth-heading">
          <div className="guide-container"><div className="guide-section-heading"><div><p className="guide-section-number">06 · GROWTH QUESTION</p><h2 id="growth-heading">성장호르몬 연구는<br />키 성장과 어떻게 연결될까요?</h2></div><p>하나의 결론보다<br />연구가 이어지는 경로를 봅니다.</p></div><p className="guide-section-lead">GABA 연구가 성장 관련 질문으로 이어지는 과정을 한 줄씩 살펴볼 수 있습니다.</p><div className="guide-growth-flow">{growthSteps.map((step, index) => <div className="guide-growth-step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < growthSteps.length - 1 ? <ArrowRight className="guide-growth-arrow" aria-hidden="true" /> : null}</div>)}</div><p className="guide-growth-note">현재 공개된 성인 성장호르몬 연구, 성장기 동물 연구 및 복합원료 연구를 한곳에서 확인할 수 있습니다. 어린이의 성장속도와 최종 신장을 평가한 GABA 단독 인체연구는 업데이트 항목으로 관리합니다.</p></div>
        </section>

        <section className="guide-section guide-expert-videos guide-story-section" id="expert-videos" aria-labelledby="expert-heading">
          <div className="guide-container"><div className="guide-section-heading"><div><p className="guide-section-number">07 · EXPERT VOICES</p><h2 id="expert-heading">의사와 과학자들은<br />GABA를 어떻게 설명할까요?</h2></div><p>영상과 원문을<br />같은 주제로 연결합니다.</p></div><div className="guide-expert-intro"><div className="guide-video-placeholder"><span className="guide-video-play" aria-hidden="true">▶</span><strong>전문가 영상 큐레이션 중</strong><p>관련 전문가 영상이 모이면 이 자리에서 짧고 쉽게 연결합니다.</p></div><p className="guide-expert-note">영상이 없는 분야는<br /><strong>관련 전문가 영상 큐레이션 중</strong><br />현재는 대표 논문을 먼저 제공합니다.</p></div><div className="guide-expert-grid">{expertTopics.map((topic) => <article className="guide-expert-card" key={topic.id}><span className="guide-expert-icon" aria-hidden="true"><Sparkles size={18} /></span><h3>{topic.title}</h3><span>영상 큐레이션 중</span><a href={topic.source.url} target="_blank" rel="noopener noreferrer">대표 논문 먼저 보기 <ExternalLink size={13} aria-hidden="true" /></a></article>)}</div></div>
        </section>

        <section className="guide-section guide-library guide-story-section" id="library" aria-labelledby="library-heading">
          <div className="guide-container"><div className="guide-section-heading"><div><p className="guide-section-number">08 · RESEARCH LIBRARY</p><h2 id="library-heading">궁금한 연구를<br />직접 확인해 보세요</h2></div><p>필터로 좁히고,<br />세부 조건은 펼쳐보세요.</p></div><div className="guide-library-filters" aria-label="연구자료실 필터"><label>주제<select value={libraryTopic} onChange={(event) => setLibraryTopic(event.target.value)}><option>전체</option><option>수면</option><option>인지</option><option>성장호르몬</option><option>스트레스</option></select></label><label>대상<select value={libraryModel} onChange={(event) => setLibraryModel(event.target.value)}><option>전체</option><option>사람</option><option>동물</option><option>세포</option></select></label><label>연구 연도<select value={libraryYear} onChange={(event) => setLibraryYear(event.target.value)}><option>전체</option><option>2020년대</option><option>2010년대</option><option>2000년대</option></select></label><label>연구기관<select value={libraryInstitution} onChange={(event) => setLibraryInstitution(event.target.value)}><option>전체</option><option>일본 연구</option><option>사람 대상 연구</option><option>Pharma Foods 관계 저자</option><option>운동 생리 연구</option><option>사람 대상 관찰</option><option>검토 논문</option></select></label><label>측정 항목<select value={libraryMeasure} onChange={(event) => setLibraryMeasure(event.target.value)}><option>전체</option><option>수면 기록</option><option>잠드는 시간</option><option>뇌파·활력</option><option>성장호르몬</option><option>손끝 감각</option><option>스트레스·잠</option></select></label></div><p className="guide-library-count">현재 {filteredLibraryRows.length}개의 연구를 보고 있습니다.</p><div className="guide-library-list">{filteredLibraryRows.length ? filteredLibraryRows.map((row) => <article className="guide-library-card" key={row.id}><div className="guide-library-card-top"><span>{row.topic}</span><small>{row.year} · {row.model}</small></div><h3>{row.title}</h3><dl><div><dt>누구를 연구했는가</dt><dd>{row.participant}</dd></div><div><dt>무엇을 측정했는가</dt><dd>{row.measure}</dd></div><div><dt>무엇이 관찰됐는가</dt><dd>{row.observed}</dd></div></dl><details className="guide-library-details"><summary>세부 조건 펼쳐보기</summary><p>{row.detail}</p><p className="guide-library-source">{row.institution} · <a href={row.source.url} target="_blank" rel="noopener noreferrer">{row.source.label} <ExternalLink size={13} aria-hidden="true" /></a></p></details></article>) : <p className="guide-library-empty">선택한 조건의 연구를 준비하고 있습니다. 전체 필터로 돌아가 다른 연구를 살펴보세요.</p>}</div></div>
        </section>

        <section className="guide-final" id="final" aria-labelledby="final-heading"><div className="guide-container"><p className="guide-section-number">09 · SHARE THE STORY</p><h2 id="final-heading">GABA를 알면 수면만이 아니라<br />신경계의 조절을 이해하게 됩니다</h2><p className="guide-final-copy">GABA는 잠잘 때만 작용하는 물질이 아닙니다. 깨어 있는 동안에도 감정, 감각, 집중, 기억과 움직임에 관련된 신경회로를 조절합니다. 그리고 그 연구 영역은 피부, 근육, 성장호르몬, 면역과 성장으로 확장되고 있습니다.</p><div className="guide-final-actions"><button type="button" className="guide-primary-button" onClick={sharePage}><Share2 size={17} aria-hidden="true" /> GABA 3분 요약 공유하기 <ArrowRight size={17} aria-hidden="true" /></button><button type="button" className="guide-quiet-button" onClick={() => scrollTo('expert-videos')}><span className="guide-action-play" aria-hidden="true">▶</span> 전문가 영상 모아보기 <ArrowRight size={17} aria-hidden="true" /></button><button type="button" className="guide-quiet-button" onClick={() => scrollTo('library')}><BookOpen size={16} aria-hidden="true" /> 연구 원문 확인하기 <ArrowRight size={17} aria-hidden="true" /></button></div>{shareStatus ? <span className="guide-share-status guide-final-status" role="status">{shareStatus}</span> : null}<details className="guide-share-lines"><summary>사업자가 활용할 수 있는 GABA 5문장 보기</summary><div>{messageKit.map((message, index) => <article key={message}><span>0{index + 1}</span><p>{message}</p><button type="button" onClick={() => copyMessage(message)}>문장 복사</button></article>)}</div></details></div></section>
      </main>

      <footer className="guide-footer"><div className="guide-container guide-footer-grid"><a className="guide-logo" href="#top" onClick={() => scrollTo('top')}><span>뇌와 우리</span><small>GABA를 쉽게 읽는 공개 안내서</small></a><p>GABA를 쉽게 이해하고<br />자유롭게 공유하는 공개 안내서입니다.</p><div><a href="#research">연구 확장</a><a href="#library">자료실</a><a href="#top">맨 위로 ↑</a></div></div><div className="guide-container guide-footer-bottom"><span>© 2026 GABA Guide</span><span>수면에서 인지, 피부, 근육과 성장 연구까지</span></div></footer>
    </div>
  );
}
