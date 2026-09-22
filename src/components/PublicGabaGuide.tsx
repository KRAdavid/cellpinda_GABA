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
import { REVIEW_DESTINATION_URL } from '../domain/reviews';

const siteRoot = import.meta.env.BASE_URL;

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
  unknown: string;
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
    title: '스트레스가 올라갈 때',
    question: '스트레스가 쌓일 때도 관련이 있나요?',
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
    title: '잠드는 시간',
    english: 'Sleep latency',
    tone: 'human',
    label: '사람 대상 연구',
    summary: '성인 10명이 GABA 100mg과 비교 캡슐을 번갈아 먹고, 잠드는 시간과 깊은 잠을 기록한 연구입니다.',
    observed: '한 번의 섭취 뒤 잠드는 시간과 깊은 잠의 비율을 비교했습니다.',
    interpretation: '정해진 조건에서 수면 지표를 본 결과입니다. 모든 사람의 수면 변화를 뜻하지는 않습니다.',
    unknown: '셀핀다 가바 1500의 효과나 권장 섭취량을 확인한 연구는 아닙니다.',
    source: { label: 'Food Sci Biotechnol. 2016 · PMID 30263304', url: 'https://pubmed.ncbi.nlm.nih.gov/30263304/' },
  },
  {
    id: 'stress',
    title: '머리를 많이 쓴 뒤',
    english: 'Mental stress',
    tone: 'human',
    label: '사람 대상 연구',
    summary: '성인 63명이 GABA 100mg 또는 비교 캡슐을 먹고 정신 과제 뒤 뇌파와 기분 변화를 기록한 연구입니다.',
    observed: '과제 뒤 뇌파와 기분 점수의 변화를 비교했습니다.',
    interpretation: '정신 과제와 한 번의 섭취 조건에서 본 결과입니다.',
    unknown: '일상 스트레스가 줄거나 셀핀다 제품의 효능을 확정한 연구는 아닙니다.',
    source: { label: 'Amino Acids. 2012 · PMID 22203366', url: 'https://pubmed.ncbi.nlm.nih.gov/22203366/' },
  },
  {
    id: 'cognition',
    title: '감각·인지 학습',
    english: 'Perceptual learning',
    tone: 'early',
    label: '뇌 속 신호 관찰',
    summary: '사람의 뇌 속 GABA 신호와 손끝 감각 학습 결과를 살펴본 연구입니다. GABA를 먹은 연구는 아닙니다.',
    observed: '뇌 속 GABA+ 수치와 손끝 감각 학습 결과의 관계를 분석했습니다.',
    interpretation: '뇌 속 신호와 학습의 관계를 본 연구입니다.',
    unknown: '먹는 GABA가 기억력이나 집중력을 높인다는 근거는 아닙니다.',
    source: { label: 'Cereb Cortex. 2016 · PMC4737612', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4737612/' },
  },
  {
    id: 'growth-hormone',
    title: '성장호르몬',
    english: 'Growth hormone',
    tone: 'early',
    label: '사람 대상 연구',
    summary: '운동 경험이 있는 18~30세 남성 11명이 GABA 3g을 한 번 먹고, 90분 동안 혈액 속 성장호르몬을 살펴본 연구입니다.',
    observed: '쉬었을 때와 운동했을 때의 단기간 혈액 수치를 비교했습니다.',
    interpretation: '일시적인 혈액 수치 변화는 성장 속도나 근육 발달과 다른 결과입니다.',
    unknown: '셀핀다 제품 시험이나 성장·근육 발달 효과를 확인한 연구는 아닙니다.',
    source: { label: 'Med Sci Sports Exerc. 2008 · PMID 18091016', url: 'https://pubmed.ncbi.nlm.nih.gov/18091016/' },
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
    document.title = 'GABA, 우리 몸에서는 어떤 일을 할까요? | GABA Guide';
    const description = 'GABA의 역할과 사람 연구를 쉬운 말과 그림으로 살펴보는 공개 안내서입니다. 셀핀다 완제품 시험과는 구분해 안내합니다.';
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
  const nextSteps: Array<{ label: string; body: string; href: string; external?: boolean }> = [
    { label: 'GABA 기본 역할', body: '몸속에 원래 있는 신호부터 알아보기', href: '#basics' },
    { label: '사람 연구', body: '잠·스트레스·집중 연구에서 실제로 본 내용', href: '#research' },
    { label: '나의 하루 리듬', body: '지난 7일 잠과 휴식을 1분 체크하기', href: `${siteRoot}#rhythm` },
    { label: '가바 1500 구성', body: '셀핀다 제품의 표시와 구성을 확인하기', href: `${siteRoot}?view=products#products` },
    { label: '구매자 후기', body: '가바 1500 사용 경험을 스마트스토어에서 읽기', href: REVIEW_DESTINATION_URL, external: true },
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
  };

  const sharePage = async () => {
    const shareData = { title: 'GABA, 우리 몸에서는 어떤 일을 할까요?', text: 'GABA의 역할과 사람 연구를 쉬운 말로 살펴보는 공개 안내서', url: window.location.href };
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

  const myths = [
    { question: 'GABA는 신경세포의 활동 균형을 조절한다', answer: '핵심 역할', detail: 'GABA는 뇌와 척수에서 신경세포 사이의 신호 균형을 만드는 대표적인 억제성 신경전달물질입니다.' },
    { question: 'GABA는 수면·스트레스·집중·운동과 연결된다', answer: '사실', detail: 'GABA성 신경전달은 잠들기, 스트레스 반응, 선택적 집중, 운동 조절에 관여합니다.' },
    { question: '먹는 GABA 연구와 뇌 속 GABA 관찰은 같은가요?', answer: '구분 필요', detail: '사람 연구라도 무엇을 먹었는지, 뇌 속 신호를 관찰했는지에 따라 질문과 해석이 달라집니다.' },
    { question: '성장호르몬 수치가 오르면 키가 크나요?', answer: '구분 필요', detail: '짧은 시간의 혈액 수치 변화는 성장 속도나 근육 발달과 같은 뜻이 아닙니다.' },
  ];
  const activeMyth = myths[factIndex];

  return (
    <div className="gaba-guide">
      <a className="guide-skip" href="#guide-main">본문으로 이동</a>
      <header className="guide-header">
        <a className="guide-logo" href="#top" onClick={() => scrollTo('top')} aria-label="GABA Guide 홈">
          <span>뇌와 우리</span><small>GABA를 읽는 쉬운 안내서</small>
        </a>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="주 메뉴">
          <a href="#next-step" onClick={() => setMenuOpen(false)}>다음에 확인할 것</a>
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
            <p className="guide-kicker">GABA GUIDE · 약 3분 안내서</p>
            <h1 id="guide-hero-heading"><em>GABA,</em> 우리 몸에서는<br />어떤 일을 할까요?</h1>
            <p className="guide-hero-question">잠·스트레스·집중이 궁금하다면, GABA가 어떤 신호인지부터 알아보세요.</p>
            <p className="guide-hero-body">GABA는 우리 몸에 원래 존재하는 신경전달물질입니다. 이 안내서는 GABA의 역할과 사람 연구에서 실제로 살펴본 내용을 쉬운 말과 그림으로 정리했습니다.</p>
            <div className="guide-hero-actions">
              <button type="button" className="guide-primary-button" onClick={() => scrollTo('basics')}>3분 안에 이해하기 <ArrowRight size={17} aria-hidden="true" /></button>
              <button type="button" className="guide-quiet-button" onClick={() => scrollTo('research')}><BookOpen size={16} aria-hidden="true" /> 수면·스트레스 연구 보기</button>
            </div>
            <p className="guide-boundary-note">일반 GABA와 사람 연구를 쉽게 소개합니다. 제품 표시는 제품 카드에서 확인하세요.</p>
          </div>
          <NeuronNetwork />
          <div className="guide-hero-scroll" aria-hidden="true"><ArrowDown size={16} /> 아래로 읽기</div>
        </section>

        <section className="guide-summary-band" aria-label="30초 요약">
          <div className="guide-container guide-summary-grid">
            <span className="guide-summary-label">30초 요약</span>
            <p>GABA는 뇌와 척수에서 신호가 너무 커지지 않도록 조절하는 물질이에요. 잠·감정·감각·집중·운동에 관련된 신경회로에서 작용합니다.</p>
            <span className="guide-summary-mark">GABA<br />= 조절의 신호</span>
          </div>
        </section>

        <section className="guide-message-kit" id="next-step" aria-labelledby="message-kit-heading">
          <div className="guide-container">
            <div className="guide-message-head">
              <div><p className="guide-section-number">NEXT STEP</p><h2 id="message-kit-heading">이 안내서 다음에<br />확인할 것</h2></div>
              <p>일반 GABA 연구와 셀핀다 제품 정보는<br />서로 다른 화면에서 확인하세요.</p>
            </div>
            <div className="guide-message-grid">
              {nextSteps.map((next, index) => <article className="guide-message-card" key={next.label}><span>0{index + 1}</span><p>{next.label}<small>{next.body}</small></p><a href={next.href} target={next.external ? '_blank' : undefined} rel={next.external ? 'noopener noreferrer' : undefined}>{index === 4 ? '후기 읽기 ↗' : '확인하기 →'}</a></article>)}
            </div>
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
            <div><p className="guide-section-number">04 · KEEP THE SCOPE CLEAR</p><h2 id="balance-heading">GABA를 알 때<br />꼭 구분할 것</h2><p>몸속에서 하는 역할과, 먹었을 때 사람에게 나타나는 변화는 같은 질문이 아닙니다.</p></div>
            <div className="guide-balance-warning"><Sparkles size={20} aria-hidden="true" /><strong>일반 GABA와 제품 정보는 따로 보세요</strong><p>이 안내서는 일반 GABA의 역할과 사람 연구를 설명합니다. 제품 구성과 표시는 제품 카드에서 확인하세요.</p></div>
          </div>
        </section>

        <section className="guide-section guide-research" id="research" aria-labelledby="research-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-section-heading-wide">
              <div><p className="guide-section-number">05 · RESEARCH EXPLORER</p><h2 id="research-heading">사람 연구에서<br />무엇을 봤을까요?</h2></div>
              <p>연구 대상·양·기간을 먼저 보고,<br /><strong>관찰한 범위만</strong> 읽어보세요.</p>
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
                  <div><dt>무엇을 관찰했나요?</dt><dd>{activeResearch.observed}</dd></div>
                  <div><dt>어떤 의미가 있나요?</dt><dd>{activeResearch.interpretation}</dd></div>
                  <div><dt>아직 확인되지 않은 것은?</dt><dd>{activeResearch.unknown}</dd></div>
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
              <div><p className="guide-section-number">06 · FACT OR MYTH</p><h2 id="myths-heading">사실일까요? 오해일까요?</h2></div>
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
            <div><p className="guide-section-number">07 · SOURCES & EDITORIAL POLICY</p><h2 id="sources-heading">근거를 확인하는<br />읽기 습관</h2><p>연구가 무엇을 실제로 확인했는지, 무엇은 아직 모르는지를 함께 보여드립니다. 원문은 필요할 때만 열어보세요.</p><button type="button" className="guide-source-share" onClick={sharePage}><Share2 size={16} aria-hidden="true" /> 이 안내서 공유하기</button>{shareStatus ? <span className="guide-share-status" role="status">{shareStatus}</span> : null}</div>
            <div className="guide-source-list">
              <div className="guide-source-rule"><Check size={16} aria-hidden="true" /><span>사람 연구와 뇌 속 신호 관찰을 구분합니다.</span></div>
              <div className="guide-source-rule"><Check size={16} aria-hidden="true" /><span>연구에서 사용한 양과 기간을 함께 보여줍니다.</span></div>
              <div className="guide-source-rule"><Check size={16} aria-hidden="true" /><span>짧게 측정한 수치를 오래 지속되는 효과로 바꾸어 말하지 않습니다.</span></div>
              <div className="guide-source-rule"><Check size={16} aria-hidden="true" /><span>일반 GABA 연구와 셀핀다 완제품 정보를 분리합니다.</span></div>
              <div className="guide-source-links"><strong>바로 확인하는 참고자료</strong><a href="https://pubmed.ncbi.nlm.nih.gov/32166183/" target="_blank" rel="noopener noreferrer">GABA 신경생리학 개요 <ExternalLink size={14} aria-hidden="true" /></a><a href="https://pubmed.ncbi.nlm.nih.gov/30263304/" target="_blank" rel="noopener noreferrer">경구 GABA와 수면을 본 사람 연구 <ExternalLink size={14} aria-hidden="true" /></a><a href="https://pubmed.ncbi.nlm.nih.gov/22203366/" target="_blank" rel="noopener noreferrer">정신 과제 뒤 뇌파 연구 <ExternalLink size={14} aria-hidden="true" /></a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4737612/" target="_blank" rel="noopener noreferrer">감각 학습과 뇌 속 GABA 연구 <ExternalLink size={14} aria-hidden="true" /></a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="guide-footer">
        <div className="guide-container guide-footer-grid"><a className="guide-logo" href="#top" onClick={() => scrollTo('top')}><span>뇌와 우리</span><small>GABA를 읽는 쉬운 안내서</small></a><p>GABA를 이해하는 출발점은<br />좋다는 말보다 근거를 먼저 보는 일입니다.</p><div><a href="#basics">처음부터 읽기</a><a href="#sources">자료와 원칙</a><a href="#top">맨 위로 ↑</a></div></div>
        <div className="guide-container guide-footer-bottom"><span>© 2026 GABA Guide</span><span>일반 정보 제공을 위한 공개 교육 사이트입니다. 치료·진단을 대신하지 않습니다.</span></div>
      </footer>
    </div>
  );
}
