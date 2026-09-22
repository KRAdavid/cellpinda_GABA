import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
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

type EvidenceTone = 'established' | 'human' | 'early' | 'mixed' | 'unconfirmed';

type EverydayTopic = {
  id: string;
  title: string;
  question: string;
  body: string;
  note: string;
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
  message: string;
  source: { label: string; url: string };
};

const everydayTopics: EverydayTopic[] = [
  {
    id: 'sleep',
    title: '잠들 때',
    question: '잠들 때 GABA는 무엇을 하나요?',
    body: '수면이 시작되려면 각성을 유지하는 신경회로의 활동이 낮아져야 합니다. GABA성 신경전달은 수면 시작과 유지에 관여합니다.',
    note: '수면과 각성의 리듬을 조율하는 GABA성 신경전달을 살펴보세요.',
    icon: 'moon',
  },
  {
    id: 'calm',
    title: '긴장되는 순간',
    question: '긴장과 스트레스에도 관련이 있나요?',
    body: 'GABA는 위협과 스트레스에 반응하는 신경회로의 과도한 활동을 조절하는 과정에 관여합니다.',
    note: 'GABA는 스트레스 반응 회로의 활동을 조율하는 신호로 연구되고 있습니다.',
    icon: 'sparkles',
  },
  {
    id: 'focus',
    title: '집중할 때',
    question: '집중하려면 왜 억제가 필요할까요?',
    body: '집중은 필요한 정보를 키우는 일만이 아니라, 지금 필요하지 않은 신호를 덜어내는 일이기도 합니다. GABA는 선택적인 정보 처리에 관여합니다.',
    note: '필요한 신호와 불필요한 신호를 나누는 조절이 집중을 만듭니다.',
    icon: 'focus',
  },
  {
    id: 'movement',
    title: '움직일 때',
    question: '근육과 운동에도 GABA가 쓰이나요?',
    body: 'GABA는 운동신경의 활동과 근육 긴장을 조절하는 신경회로에 관여합니다. 활성화와 억제가 함께 작동하는 균형이 매끄러운 움직임을 만듭니다.',
    note: '활성화와 억제가 함께 작동하는 균형이 매끄러운 움직임을 만듭니다.',
    icon: 'movement',
  },
  {
    id: 'sense',
    title: '감각을 처리할 때',
    question: '소리와 촉감도 GABA와 관련이 있나요?',
    body: '뇌는 들어오는 모든 감각을 같은 강도로 처리하지 않습니다. GABA성 억제는 감각 신호를 구분하고 조절하는 데 관여합니다.',
    note: '감각 신호를 선별하는 조절이 집중과 편안한 감각 경험을 돕습니다.',
    icon: 'sense',
  },
];

const researchTopics: ResearchTopic[] = [
  {
    id: 'sleep',
    title: '수면 리듬',
    english: 'Sleep rhythm',
    tone: 'human',
    label: '사람 대상 연구',
    summary: 'GABA 신호는 잠들기 전 각성 수준과 수면 리듬을 조절하는 신경회로와 연결됩니다.',
    observed: '수면 시작 시간, 깊은 수면, 밤 동안의 리듬을 주요 지표로 살펴봅니다.',
    interpretation: 'GABA를 설명할 때 수면과 긴장을 연결하는 핵심 생리 역할로 소개할 수 있습니다.',
    message: '사업자 설명 문장: GABA는 수면 리듬과 잠드는 과정을 이해하는 핵심 신호입니다.',
    source: { label: 'GABA와 수면 신경회로 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+sleep+neural+circuit' },
  },
  {
    id: 'stress',
    title: '긴장과 스트레스',
    english: 'Stress regulation',
    tone: 'human',
    label: '사람 대상 연구',
    summary: 'GABA는 위협과 스트레스에 반응하는 신경회로의 활동 균형을 조절하는 대표 신호입니다.',
    observed: '긴장 상황의 뇌파, 심리 반응, 신경 활동 변화를 연구합니다.',
    interpretation: 'GABA의 조절 기능을 감정과 스트레스의 언어로 쉽게 설명할 수 있습니다.',
    message: '사업자 설명 문장: GABA는 과도한 긴장 신호를 조절하는 신경전달물질입니다.',
    source: { label: 'GABA와 스트레스 반응 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+stress+human+study' },
  },
  {
    id: 'cognition',
    title: '집중과 인지',
    english: 'Cognition & focus',
    tone: 'human',
    label: '뇌 기능 연구',
    summary: 'GABA성 억제는 필요한 신호를 선명하게 고르고, 감각과 기억을 정리하는 뇌 회로와 연결됩니다.',
    observed: '집중, 감각 학습, 기억과 관련된 뇌 속 GABA 신호를 살펴봅니다.',
    interpretation: 'GABA는 머리를 많이 쓰는 순간에 필요한 신호와 덜 필요한 신호를 나누는 역할로 설명할 수 있습니다.',
    message: '사업자 설명 문장: GABA는 집중과 인지에 필요한 신호의 균형을 돕는 뇌 속 조절 신호입니다.',
    source: { label: 'GABA와 인지·감각 학습 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+cognition+perceptual+learning' },
  },
  {
    id: 'skin',
    title: '피부 컨디션',
    english: 'Skin & barrier',
    tone: 'early',
    label: '피부 생리 연구',
    summary: '피부는 신경과 면역 신호가 만나는 기관입니다. GABA 관련 연구도 피부 장벽과 컨디션의 언어로 확장되고 있습니다.',
    observed: '피부 세포의 신호 조절, 장벽, 진정과 관련된 GABA 연구를 살펴봅니다.',
    interpretation: 'GABA를 뇌에만 머무르지 않고 피부와 신경의 연결로 설명할 수 있습니다.',
    message: '사업자 설명 문장: GABA 연구는 피부 장벽과 컨디션을 조절하는 신호로도 확장되고 있습니다.',
    source: { label: 'GABA와 피부 생리 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+skin+barrier+research' },
  },
  {
    id: 'muscle',
    title: '근육과 체력',
    english: 'Muscle & movement',
    tone: 'human',
    label: '운동 생리 연구',
    summary: '움직임은 활성화와 억제가 정확히 맞물릴 때 부드러워집니다. GABA는 운동 신경과 근육 조절 회로에 관여합니다.',
    observed: '운동 수행, 근육 긴장, 회복과 관련된 신경 신호를 살펴봅니다.',
    interpretation: 'GABA를 운동과 체력의 기반이 되는 신경 조절 성분으로 소개할 수 있습니다.',
    message: '사업자 설명 문장: GABA는 근육의 긴장과 움직임을 조절하는 신경 신호와 연결됩니다.',
    source: { label: 'GABA와 운동 생리 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+muscle+exercise+physiology' },
  },
  {
    id: 'growth-hormone',
    title: '성장과 회복',
    english: 'Growth & recovery',
    tone: 'early',
    label: '성장호르몬 연구',
    summary: '수면과 운동은 성장호르몬과 회복 리듬에 연결됩니다. GABA 연구도 이 생리 흐름 안에서 살펴볼 수 있습니다.',
    observed: '수면, 운동, 성장호르몬과 관련된 신경·내분비 신호를 연구합니다.',
    interpretation: 'GABA를 성장과 회복을 이해하는 신호 체계의 한 축으로 설명할 수 있습니다.',
    message: '사업자 설명 문장: GABA는 수면과 회복 리듬, 성장호르몬 신호를 이해하는 성분입니다.',
    source: { label: 'GABA와 성장호르몬 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+growth+hormone+sleep+exercise' },
  },
  {
    id: 'height',
    title: '키 성장의 기반',
    english: 'Growth foundation',
    tone: 'early',
    label: '성장 생리 연구',
    summary: '키 성장은 수면, 영양, 운동, 성장호르몬이 함께 작동하는 긴 생리 과정입니다. GABA는 그 리듬을 이해하는 신호로 연결됩니다.',
    observed: '성장 리듬과 수면·신경 신호의 관계를 살펴봅니다.',
    interpretation: 'GABA를 성장에 관한 대화를 시작하는 생리학적 키워드로 설명할 수 있습니다.',
    message: '사업자 설명 문장: GABA는 성장 리듬과 수면을 함께 이해하는 중요한 신경 신호입니다.',
    source: { label: 'GABA와 성장 리듬 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+growth+sleep+development' },
  },
  {
    id: 'immune',
    title: '면역과 신경',
    english: 'Neuroimmune balance',
    tone: 'early',
    label: '신경·면역 연구',
    summary: '신경계와 면역계는 서로 신호를 주고받습니다. GABA는 두 시스템의 균형을 이해하는 연구 주제로 이어집니다.',
    observed: '면역세포의 활동과 신경전달 신호 사이의 연결을 살펴봅니다.',
    interpretation: 'GABA를 신경계와 면역계가 만나는 조절 성분으로 소개할 수 있습니다.',
    message: '사업자 설명 문장: GABA는 신경계와 면역계의 균형을 함께 이해하는 성분입니다.',
    source: { label: 'GABA와 신경·면역 연결 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=GABA+neuroimmune+system' },
  },
];

const evidenceLabels: Record<EvidenceTone, { text: string; className: string }> = {
  established: { text: '확립된 생리학', className: 'is-established' },
  human: { text: '사람 대상 연구', className: 'is-human' },
  early: { text: '소규모·기초 연구', className: 'is-early' },
  mixed: { text: '다양한 연구', className: 'is-mixed' },
  unconfirmed: { text: '연구 주제', className: 'is-unconfirmed' },
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
          <radialGradient id="gaba-node" cx="50%" cy="40%">
            <stop offset="0" stopColor="#65d4d1" />
            <stop offset="1" stopColor="#15979f" />
          </radialGradient>
          <linearGradient id="neuron-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b7d9e7" />
            <stop offset="1" stopColor="#6a9ec2" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#neuron-line)" strokeLinecap="round">
          <path d="M158 258C105 192 115 102 58 60M158 258C92 259 55 302 34 358M158 258C123 331 147 391 117 433M158 258C219 213 252 177 271 99M158 258C226 279 261 329 320 353" strokeWidth="6" />
          <path d="M418 183C472 132 541 133 602 75M418 183C498 193 544 238 592 301M418 183C423 115 399 76 409 22M418 183C364 169 341 121 310 80M418 183C485 298 464 360 508 430" strokeWidth="6" />
          <path d="M247 233C306 210 348 203 418 183" strokeWidth="9" />
          <path d="M273 255C330 258 352 266 412 243" strokeWidth="3" opacity=".7" />
        </g>
        <g fill="#d1e8ef" stroke="#8bb9ce" strokeWidth="4">
          <circle cx="158" cy="258" r="46" />
          <circle cx="418" cy="183" r="55" />
        </g>
        <circle cx="158" cy="258" r="18" fill="#7aa6c4" opacity=".8" />
        <circle cx="418" cy="183" r="24" fill="url(#gaba-node)" />
        <g fill="#1eabb0">
          <circle cx="301" cy="224" r="7" />
          <circle cx="337" cy="210" r="5" />
          <circle cx="357" cy="226" r="6" />
          <circle cx="383" cy="203" r="4" />
        </g>
        <g fill="#f5b967">
          <circle cx="267" cy="197" r="5" />
          <circle cx="290" cy="181" r="4" />
          <circle cx="350" cy="190" r="4" />
        </g>
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
      {id === 'sleep' && <><span /><span /></>}
      {id === 'stress' && <><span /><span /><span /></>}
      {id === 'cognition' && <><span /><span /><span /><span /></>}
      {id === 'growth-hormone' && <><span /><span /></>}
    </div>
  );
}

function moveGuideTab(
  event: ReactKeyboardEvent<HTMLButtonElement>,
  ids: string[],
  current: string,
  setCurrent: (value: string) => void,
  prefix: string,
) {
  if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const currentIndex = Math.max(0, ids.indexOf(current));
  const nextIndex = event.key === 'Home'
    ? 0
    : event.key === 'End'
      ? ids.length - 1
      : (currentIndex + (event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1) + ids.length) % ids.length;
  const next = ids[nextIndex];
  setCurrent(next);
  requestAnimationFrame(() => document.getElementById(`${prefix}-${next}`)?.focus());
}

export default function PublicGabaGuide() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedEveryday, setSelectedEveryday] = useState('sleep');
  const [selectedResearch, setSelectedResearch] = useState('sleep');
  const [factIndex, setFactIndex] = useState(0);
  const [shareStatus, setShareStatus] = useState('');

  useEffect(() => {
    document.title = 'GABA, 왜 중요한 성분일까요? | GABA Guide';
    const description = '사업자가 GABA의 역할과 중요성을 쉽게 설명하고 공유할 수 있도록 정리한 모바일 중심 공개 안내서입니다.';
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = window.location.href.split('?')[0].split('#')[0];
    const targetId = window.location.hash.slice(1);
    if (targetId) requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  }, []);

  const activeEveryday = everydayTopics.find((topic) => topic.id === selectedEveryday) || everydayTopics[0];
  const activeResearch = researchTopics.find((topic) => topic.id === selectedResearch) || researchTopics[0];
  const everydayIds = everydayTopics.map((topic) => topic.id);
  const researchIds = researchTopics.map((topic) => topic.id);
  const messageKit = [
    'GABA는 우리 몸에 원래 존재하는 신경전달물질입니다.',
    'GABA는 신경세포의 활동 균형을 조절하는 핵심 신호입니다.',
    'GABA는 수면·긴장·집중·감각·운동과 연결됩니다.',
    'GABA 연구는 피부·인지·근육·성장·면역으로 확장되고 있습니다.',
    'GABA는 일상과 건강을 설명하기 쉬운 중요한 성분입니다.',
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
  };

  const sharePage = async () => {
    const shareData = { title: 'GABA, 왜 중요한 성분일까요?', text: '사업자가 GABA를 쉽게 설명하고 공유할 수 있는 공개 안내서', url: window.location.href };
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

  const myths = [
    { question: 'GABA는 신경세포의 활동 균형을 조절한다', answer: '핵심 역할', detail: 'GABA는 뇌와 척수에서 신경세포 사이의 신호 균형을 만드는 대표적인 억제성 신경전달물질입니다.' },
    { question: 'GABA는 수면·긴장·집중·운동과 연결된다', answer: '사실', detail: 'GABA성 신경전달은 잠들기, 스트레스 반응, 선택적 집중, 운동 조절에 관여합니다.' },
    { question: 'GABA 연구는 피부·인지·근육·성장·면역으로 확장된다', answer: '연구 영역', detail: 'GABA의 신경 조절 역할은 피부 컨디션, 인지, 운동, 성장 리듬, 신경·면역 연결까지 폭넓게 연구되고 있습니다.' },
    { question: 'GABA는 사업자가 설명하기 쉬운 성분이다', answer: '활용 메시지', detail: '몸속에 원래 존재하는 신경 신호라는 한 문장에서 출발하면 수면·긴장·집중·운동과 다양한 건강 주제로 자연스럽게 이어집니다.' },
  ];
  const activeMyth = myths[factIndex];

  return (
    <div className="gaba-guide">
      <a className="guide-skip" href="#guide-main">본문으로 이동</a>
      <header className="guide-header">
        <a className="guide-logo" href="#top" onClick={() => scrollTo('top')} aria-label="GABA Guide 홈">
          <span>뇌와 우리</span><small>사업자가 쓰는 GABA 설명서</small>
        </a>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="주 메뉴">
          <a href="#message-kit" onClick={() => setMenuOpen(false)}>사업자용 메시지</a>
          <a href="#basics" onClick={() => setMenuOpen(false)}>GABA 이해하기</a>
          <a href="#everyday" onClick={() => setMenuOpen(false)}>일상 속 GABA</a>
          <a href="#research" onClick={() => setMenuOpen(false)}>연구 살펴보기</a>
          <a href="#myths" onClick={() => setMenuOpen(false)}>사실과 오해</a>
          <a href="#sources" onClick={() => setMenuOpen(false)}>자료실</a>
        </nav>
        <button type="button" className="guide-menu-toggle" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <button type="button" className="guide-header-share" onClick={sharePage}><Share2 size={16} aria-hidden="true" /> 공유하기</button>
      </header>

      <main id="guide-main">
        <section className="guide-hero" id="top" aria-labelledby="guide-hero-heading">
          <div className="guide-hero-copy">
            <h1 id="guide-hero-heading"><em>GABA,</em> 왜 중요한<br />성분일까요?</h1>
            <p className="guide-hero-question">수면·긴장·집중·운동부터<br />피부·인지·성장·면역까지.</p>
            <p className="guide-hero-body">사업자가 바로 설명할 수 있는 GABA 이야기입니다.</p>
            <div className="guide-hero-actions">
              <button type="button" className="guide-primary-button" onClick={() => scrollTo('message-kit')}>핵심 문장 보기 <ArrowRight size={17} aria-hidden="true" /></button>
              <button type="button" className="guide-quiet-button" onClick={() => scrollTo('research')}><BookOpen size={16} aria-hidden="true" /> 연구 주제 보기</button>
            </div>
          </div>
          <NeuronNetwork />
          <div className="guide-hero-scroll" aria-hidden="true"><ArrowDown size={16} /> 아래로 읽기</div>
        </section>

        <section className="guide-summary-band" aria-label="30초 요약">
          <div className="guide-container guide-summary-grid">
            <span className="guide-summary-label">30초 요약</span>
            <p>GABA는 뇌와 척수에서 신경 신호의 균형을 조절합니다. 수면·감정·감각·집중·운동을 연결하는 중요한 신호입니다.</p>
            <span className="guide-summary-mark">GABA<br />= 조절의 신호</span>
          </div>
        </section>

        <section className="guide-message-kit" id="message-kit" aria-labelledby="message-kit-heading">
          <div className="guide-container">
            <div className="guide-message-head">
              <div><p className="guide-section-number">BUSINESS MESSAGE KIT</p><h2 id="message-kit-heading">사업자가 바로 설명할 수 있는<br />GABA 5문장</h2></div>
              <p>고객·파트너·팀에 GABA를 소개할 때<br />아래 문장을 그대로 활용해 보세요.</p>
            </div>
            <div className="guide-message-grid">
              {messageKit.map((message, index) => <article className="guide-message-card" key={message}><span>0{index + 1}</span><p>{message}</p><button type="button" onClick={() => copyMessage(message)} aria-label={`${index + 1}번 문장 복사`}>문장 복사</button></article>)}
            </div>
            {shareStatus ? <span className="guide-share-status" role="status">{shareStatus}</span> : null}
          </div>
        </section>

        <section className="guide-section guide-basics" id="basics" aria-labelledby="basics-heading">
          <div className="guide-container">
            <div className="guide-section-heading">
              <div><p className="guide-section-number">01 · GABA BASICS</p><h2 id="basics-heading">GABA란 무엇인가요?</h2></div>
              <p>전문용어는 잠시 내려놓고,<br />세 문장으로 먼저 알아봅니다.</p>
            </div>
            <div className="guide-basics-grid">
              <article className="guide-definition-card">
                <span className="guide-card-index">01</span>
                <h3>감마아미노부티르산</h3>
                <p>GABA는 <strong>감마아미노부티르산</strong>(γ-aminobutyric acid)의 줄임말입니다.</p>
                <div className="guide-formula">C<sub>4</sub>H<sub>9</sub>NO<sub>2</sub></div>
              </article>
              <article className="guide-definition-card is-highlighted">
                <span className="guide-card-index">02</span>
                <h3>과한 신호를 낮추는 물질</h3>
                <p>뇌와 척수에 존재하며, 신경세포가 지나치게 활성화되지 않도록 신호 전달을 조절합니다.</p>
                <div className="guide-mini-signal" aria-hidden="true"><i /><i /><i /><i /><i /><span><Check size={13} /></span></div>
              </article>
              <article className="guide-definition-card">
                <span className="guide-card-index">03</span>
                <h3>몸속에 원래 있는 신호</h3>
                <p>GABA는 우리 몸이 스스로 만들고 사용하는 신호 물질입니다.</p>
                <div className="guide-card-arrow"><ArrowRight size={18} aria-hidden="true" /></div>
              </article>
            </div>
          </div>
        </section>

        <section className="guide-section guide-process" aria-labelledby="process-heading">
          <div className="guide-container">
            <div className="guide-section-heading">
              <div><p className="guide-section-number">02 · SIGNAL FLOW</p><h2 id="process-heading">GABA는 어떻게<br />작용할까요?</h2></div>
              <p>생성과 방출을 세 단계로<br />쉽게 그려보았습니다.</p>
            </div>
            <div className="guide-process-flow">
              <article><div className="guide-process-number">1</div><div className="guide-process-orb orb-glutamate"><span /><span /><span /><span /></div><h3>글루탐산에서 시작</h3><p>신경세포 안에서 글루탐산을 이용해 GABA가 만들어집니다.</p></article>
              <ArrowRight className="guide-process-arrow" aria-hidden="true" />
              <article><div className="guide-process-number">2</div><div className="guide-process-orb orb-gaba"><span /><span /><span /><span /></div><h3>필요한 순간에 방출</h3><p>만들어진 GABA는 저장됐다가 신경 활동을 조절할 때 방출됩니다.</p></article>
              <ArrowRight className="guide-process-arrow" aria-hidden="true" />
              <article><div className="guide-process-number">3</div><div className="guide-process-orb orb-balance"><span /><span /><span /></div><h3>신호 전달을 조절</h3><p>주변 신경세포가 새 신호를 내보낼 가능성을 낮춥니다.</p></article>
            </div>
            <p className="guide-process-footnote"><span>한 문장으로</span> GABA는 뇌의 과한 신호를 낮추는 데 관여합니다.</p>
          </div>
        </section>

        <section className="guide-section guide-everyday" id="everyday" aria-labelledby="everyday-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-section-heading-wide">
              <div><p className="guide-section-number">03 · GABA IN DAILY LIFE</p><h2 id="everyday-heading">우리의 일상 속 GABA</h2></div>
              <p>GABA는 우리가 매일 경험하는<br />여러 순간의 신경회로와 관련되어 있습니다.</p>
            </div>
            <div className="guide-everyday-layout">
              <div className="guide-topic-list" role="tablist" aria-label="일상 속 GABA 주제">
                {everydayTopics.map((topic, index) => (
                  <button type="button" role="tab" id={`everyday-tab-${topic.id}`} aria-controls="everyday-panel" aria-selected={selectedEveryday === topic.id} tabIndex={selectedEveryday === topic.id ? 0 : -1} className={selectedEveryday === topic.id ? 'is-active' : ''} key={topic.id} onClick={() => setSelectedEveryday(topic.id)} onKeyDown={(event) => moveGuideTab(event, everydayIds, selectedEveryday, setSelectedEveryday, 'everyday-tab')}>
                    <span className="guide-topic-icon"><TopicIcon type={topic.icon} /></span><span><small>0{index + 1}</small>{topic.title}</span><ChevronDown size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
              <article className="guide-topic-detail" id="everyday-panel" role="tabpanel" aria-labelledby={`everyday-tab-${activeEveryday.id}`} aria-live="polite">
                <div className="guide-topic-detail-top"><span className="guide-topic-detail-icon"><TopicIcon type={activeEveryday.icon} /></span><span>GABA IN DAILY LIFE</span></div>
                <h3>{activeEveryday.question}</h3>
                <p>{activeEveryday.body}</p>
                <div className="guide-topic-note"><Sparkles size={17} aria-hidden="true" /><span>{activeEveryday.note}</span></div>
              </article>
            </div>
          </div>
        </section>

        <section className="guide-balance-band" aria-labelledby="balance-heading">
          <div className="guide-container guide-balance-grid">
            <div className="guide-balance-mark" aria-hidden="true"><span /><span /><span /></div>
            <div><p className="guide-section-number">04 · WHY GABA MATTERS</p><h2 id="balance-heading">GABA는 왜 중요한<br />성분일까요?</h2><p>우리 몸의 여러 리듬과 신호를 한 번에 연결해 이해할 수 있기 때문입니다.</p></div>
            <div className="guide-balance-warning"><Sparkles size={20} aria-hidden="true" /><strong>몸속에 원래 있는 중요한 신호</strong><p>GABA는 신경세포의 활동 균형을 조절하며 수면·긴장·집중·운동·감각을 연결합니다.</p></div>
          </div>
        </section>

        <section className="guide-section guide-research" id="research" aria-labelledby="research-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-section-heading-wide">
              <div><p className="guide-section-number">05 · RESEARCH EXPLORER</p><h2 id="research-heading">GABA 연구는<br />어디로 확장될까요?</h2></div>
              <p>수면·스트레스부터 피부·인지·성장·면역까지,<br /><strong>연구 주제의 흐름</strong>을 살펴보세요.</p>
            </div>
            <div className="guide-research-layout">
              <div className="guide-research-grid" role="tablist" aria-label="GABA 연구 주제">
                {researchTopics.map((topic) => (
                  <button type="button" role="tab" id={`research-tab-${topic.id}`} aria-controls="research-panel" aria-selected={selectedResearch === topic.id} tabIndex={selectedResearch === topic.id ? 0 : -1} key={topic.id} className={`guide-research-card ${selectedResearch === topic.id ? 'is-active' : ''}`} onClick={() => setSelectedResearch(topic.id)} onKeyDown={(event) => moveGuideTab(event, researchIds, selectedResearch, setSelectedResearch, 'research-tab')}>
                    <div className="guide-research-card-head"><span>{topic.title}</span><small>{topic.english}</small></div>
                    <EvidenceBadge tone={topic.tone} label={topic.label} />
                    <ResearchGlyph id={topic.id} />
                    <span className="guide-research-open">자세히 보기 <ArrowRight size={15} aria-hidden="true" /></span>
                  </button>
                ))}
              </div>
              <article className="guide-research-detail" id="research-panel" role="tabpanel" aria-labelledby={`research-tab-${activeResearch.id}`} aria-live="polite">
                <div className="guide-research-detail-top"><EvidenceBadge tone={activeResearch.tone} label={activeResearch.label} /><span>{activeResearch.english}</span></div>
                <h3>{activeResearch.title} 연구가 보여주는 이야기</h3>
                <p className="guide-research-summary">{activeResearch.summary}</p>
                <dl>
                  <div><dt>무엇을 관찰하나요?</dt><dd>{activeResearch.observed}</dd></div>
                  <div><dt>어떤 의미가 있나요?</dt><dd>{activeResearch.interpretation}</dd></div>
                  <div><dt>사업자가 설명할 문장</dt><dd>{activeResearch.message}</dd></div>
                </dl>
                <div className="guide-research-source"><span>연구 출처</span><a href={activeResearch.source.url} target="_blank" rel="noopener noreferrer">{activeResearch.source.label} <ExternalLink size={13} aria-hidden="true" /></a></div>
              </article>
            </div>
            <p className="guide-research-reminder"><FlaskConical size={18} aria-hidden="true" /><span>각 연구의 대상·용량·기간·비교 조건을 함께 살펴보면 GABA 연구의 흐름을 더 선명하게 이해할 수 있습니다.</span></p>
          </div>
        </section>

        <section className="guide-section guide-myths" id="myths" aria-labelledby="myths-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-section-heading-wide">
              <div><p className="guide-section-number">06 · CORE ROLE</p><h2 id="myths-heading">GABA의 핵심 역할</h2></div>
              <p>GABA의 중요한 역할을<br />한 장씩 공유해 보세요.</p>
            </div>
            <div className="guide-myth-card">
              <div className="guide-myth-question"><span>Q</span><p>{activeMyth.question}</p></div>
              <div className="guide-myth-answer is-fact"><span>{activeMyth.answer}</span><p>{activeMyth.detail}</p></div>
              <div className="guide-myth-controls"><span>{String(factIndex + 1).padStart(2, '0')} / {String(myths.length).padStart(2, '0')}</span><div><button type="button" onClick={() => setFactIndex((index) => (index - 1 + myths.length) % myths.length)} aria-label="이전 문장"><ArrowRight size={18} className="is-prev" /></button><button type="button" onClick={() => setFactIndex((index) => (index + 1) % myths.length)} aria-label="다음 문장"><ArrowRight size={18} /></button></div></div>
            </div>
          </div>
        </section>

        <section className="guide-sources" id="sources" aria-labelledby="sources-heading">
          <div className="guide-container guide-sources-grid">
            <div><p className="guide-section-number">07 · SHAREABLE SOURCES</p><h2 id="sources-heading">GABA를 설명하는<br />공유 자료</h2><p>GABA의 역할과 연구 흐름을 한눈에 보고, 필요한 자료는 원문으로 바로 이어갈 수 있습니다.</p><button type="button" className="guide-source-share" onClick={sharePage}><Share2 size={16} aria-hidden="true" /> 이 안내서 공유하기</button>{shareStatus ? <span className="guide-share-status" role="status">{shareStatus}</span> : null}</div>
            <div className="guide-source-list">
              <div className="guide-source-rule"><Check size={16} aria-hidden="true" /><span>GABA의 기본 역할을 가장 먼저 설명합니다.</span></div>
              <div className="guide-source-rule"><Check size={16} aria-hidden="true" /><span>수면·긴장·집중·운동의 연결을 쉽게 보여줍니다.</span></div>
              <div className="guide-source-rule"><Check size={16} aria-hidden="true" /><span>피부·인지·근육·성장·면역 연구까지 한 흐름으로 읽습니다.</span></div>
              <div className="guide-source-rule"><Check size={16} aria-hidden="true" /><span>사업자가 바로 활용할 수 있는 문장을 제공합니다.</span></div>
              <div className="guide-source-links"><strong>바로 확인하는 참고자료</strong><a href="https://pubmed.ncbi.nlm.nih.gov/32166183/" target="_blank" rel="noopener noreferrer">GABA 신경생리학 개요 <ExternalLink size={14} aria-hidden="true" /></a><a href="https://pubmed.ncbi.nlm.nih.gov/30263304/" target="_blank" rel="noopener noreferrer">경구 GABA와 수면을 본 사람 연구 <ExternalLink size={14} aria-hidden="true" /></a><a href="https://pubmed.ncbi.nlm.nih.gov/22203366/" target="_blank" rel="noopener noreferrer">정신 과제 뒤 뇌파 연구 <ExternalLink size={14} aria-hidden="true" /></a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4737612/" target="_blank" rel="noopener noreferrer">감각 학습과 뇌 속 GABA 연구 <ExternalLink size={14} aria-hidden="true" /></a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="guide-footer">
        <div className="guide-container guide-footer-grid"><a className="guide-logo" href="#top" onClick={() => scrollTo('top')}><span>뇌와 우리</span><small>사업자가 쓰는 GABA 설명서</small></a><p>GABA를 쉽게 이해하고<br />자유롭게 공유하는 공개 안내서입니다.</p><div><a href="#message-kit">사업자 문장</a><a href="#sources">자료실</a><a href="#top">맨 위로 ↑</a></div></div>
        <div className="guide-container guide-footer-bottom"><span>© 2026 GABA Guide</span><span>GABA의 역할과 연구 흐름을 쉽게 소개하는 공개 교육 사이트입니다.</span></div>
      </footer>
    </div>
  );
}
