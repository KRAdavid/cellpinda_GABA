import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleHelp,
  ExternalLink,
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
  study: string;
  finding: string;
  interpretation: string;
  source: { label: string; url: string };
};

type VideoBoardItem = {
  id: string;
  category: string;
  title: string;
  summary: string;
  visualLabel: string;
  videoUrl?: string;
  source?: { label: string; url: string };
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
    label: '사람 63명 · 무작위 교차시험',
    study: '건강한 성인 63명이 GABA 100mg 또는 위약을 먹고 정신적 부담이 있는 과제를 수행한 무작위·위약 대조 교차시험입니다.',
    finding: 'GABA를 먹은 뒤 30분에는 위약보다 과제 중 감소하던 뇌파 알파파·베타파가 덜 감소했고, 기분 상태 점수도 같은 방향으로 나타났습니다.',
    interpretation: '이 연구가 직접 본 결과는 기억력 향상이나 치매 개선이 아니라, 정신적 스트레스 상황에서의 뇌파와 기분 변화입니다.',
    source: { label: 'Yoto et al. 2012 · PMID 22203366', url: 'https://pubmed.ncbi.nlm.nih.gov/22203366/' },
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
  },
];

const videoBoardItems: VideoBoardItem[] = [
  { id: 'yesedor-intro', category: 'GABA 소개', title: '여에스더의 GABA 소개', summary: 'GABA가 무엇인지 쉽게 시작하는 짧은 소개 영상입니다.', visualLabel: 'INTRO', videoUrl: 'https://www.youtube.com/shorts/roEtojyk9_0' },
  { id: 'sleep', category: '수면', title: '잠들기 전 GABA 신호', summary: '잠과 GABA의 관계를 짧게 보고, 실제 수면 기록은 원문에서 확인하세요.', visualLabel: 'SLEEP', source: { label: 'Yamatsu et al. 2016 · PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/30263304/' } },
  { id: 'cognition', category: '집중·인지', title: '머리를 쓸 때 GABA 신호', summary: '정신적 과제를 수행한 사람 연구에서 관찰된 뇌파와 기분 변화를 살펴보세요.', visualLabel: 'FOCUS', source: researchTopics.find(topic => topic.id === 'cognition')!.source },
  { id: 'stress', category: '긴장·스트레스', title: '긴장할 때 신경계의 균형', summary: '스트레스 상황에서 측정한 뇌파와 면역 지표를 쉬운 말로 확인하세요.', visualLabel: 'CALM', source: researchTopics.find(topic => topic.id === 'immune')!.source },
  { id: 'movement', category: '운동·근육', title: '운동 뒤 성장호르몬 반응', summary: '운동 뒤 혈액에서 측정한 변화와 연구 조건을 함께 살펴보세요.', visualLabel: 'MOVE', source: researchTopics.find(topic => topic.id === 'muscle')!.source },
  { id: 'growth', category: '성장 연구', title: '성장호르몬을 본 동물 연구', summary: '성장기 생쥐에서 관찰된 결과와 사람에게 적용할 수 있는 범위를 구분해 보세요.', visualLabel: 'GROW', source: researchTopics.find(topic => topic.id === 'growth-hormone')!.source },
  { id: 'skin', category: '피부 연구', title: '피부 장벽을 살펴본 실험', summary: '피부 장벽 실험에서 관찰된 결과와 연구 대상을 확인하세요.', visualLabel: 'SKIN', source: researchTopics.find(topic => topic.id === 'skin')!.source },
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

export default function PublicGabaGuide() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState('');

  useEffect(() => {
    document.title = '수면에서 인지, 피부, 근육과 성장 연구까지 | GABA Guide';
    const description = '수면에서 인지, 피부, 근육과 성장 연구까지 GABA를 쉽게 이해하고 공유하는 공개 안내서입니다.';
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = window.location.href.split('?')[0].split('#')[0];
    const targetId = window.location.hash.slice(1);
    if (targetId) requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' })));
  }, []);

  const scrollTo = (id: string, hash = id) => {
    setMenuOpen(false);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
    window.history.replaceState(null, '', `#${hash}`);
  };

  const sharePage = async () => {
    const shareData = { title: '수면에서 인지, 피부, 근육과 성장 연구까지', text: 'GABA를 3분 만에 이해하고 주제별 연구를 살펴보는 공개 안내서', url: window.location.href };
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
          <a href="#basics" onClick={() => setMenuOpen(false)}>GABA란</a>
          <a href="#sleep" onClick={() => setMenuOpen(false)}>수면</a>
          <a href="#research" onClick={() => setMenuOpen(false)}>연구 확장</a>
          <a href="#expert-videos" onClick={() => setMenuOpen(false)}>전문가 영상</a>
        </nav>
        <button type="button" className="guide-menu-toggle" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="guide-primary-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        <button type="button" className="guide-header-share" onClick={sharePage}><Share2 size={16} aria-hidden="true" /> 공유하기</button>
      </header>

      <main id="guide-main">
        <section className="guide-hero guide-hero-story" id="top" aria-labelledby="guide-hero-heading">
          <div className="guide-hero-copy">
            <h1 id="guide-hero-heading"><span>수면에서 인지, 피부,<br />근육과 성장 연구까지</span><em>이제 GABA를 알아야 합니다</em></h1>
            <p className="guide-hero-body">잠들고, 집중하고, 움직이는 순간마다 우리 몸에서는 수많은 신경 신호가 조절됩니다. 그 과정의 중심에서 연구되는 물질이 GABA입니다.</p>
            <p className="guide-reading-sequence"><span>3분 읽기</span> GABA란 <i>→</i> 일상 사례 <i>→</i> 수면 연구 <i>→</i> 연구 결과와 출처</p>
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
                <article><span>02</span><div><h3>수면 인체연구 결과</h3><p>수면의 질이 낮게 나온 성인 16명이 GABA 100mg 캡슐과 대조 캡슐을 각각 1주씩 먹은 무작위·위약 대조 교차시험입니다.</p><strong className="guide-result-line">GABA 기간에는 잠드는 시간이 짧아졌고, 전체 비렘수면 시간이 늘었습니다.</strong><p className="guide-study-source">출처 · <a href="https://pubmed.ncbi.nlm.nih.gov/30263304/" target="_blank" rel="noopener noreferrer">Yamatsu et al. 2016 · PMID 30263304 <ExternalLink size={13} aria-hidden="true" /></a></p></div></article>
                <article><span>03</span><div><h3>수면 기록에서 보인 변화</h3><div className="guide-compare-row"><span>잠드는 시간</span><strong>GABA 기간에 더 짧아짐</strong></div><div className="guide-compare-row"><span>전체 비렘수면</span><strong>GABA 기간에 늘어남</strong></div><p className="guide-study-source">연구 출처는 바로 앞 결과에 함께 표시했습니다.</p></div></article>
                <article><span>04</span><div><h3>생리와 연구 결과 연결</h3><div className="guide-compare-row"><span>생리학의 언어</span><strong>GABA와 수면 리듬의 관계</strong></div><div className="guide-compare-row"><span>사람 연구의 기록</span><strong>잠드는 시간·전체 비렘수면</strong></div></div></article>
              </div>
              <div className="guide-sleep-visual" aria-label="수면 연구를 설명하는 추상적인 파형 그림" role="img"><div className="guide-sleep-wave"><i /><i /><i /><i /><i /><i /></div><span className="guide-sleep-orbit guide-sleep-orbit-one" /><span className="guide-sleep-orbit guide-sleep-orbit-two" /><strong>잠들기 전<br />신경 신호의 리듬</strong></div>
            </div>
          </div>
        </section>

        <section className="guide-section guide-research guide-story-section" id="research" aria-labelledby="research-heading">
          <div className="guide-container">
            <div className="guide-section-heading guide-section-heading-wide"><div><p className="guide-section-number">05 · RESEARCH EXPANSION</p><h2 id="research-heading">GABA 연구는 어디까지<br />확장되고 있을까요?</h2></div><p>수면에서 시작해<br />다섯 영역으로 넓어집니다.</p></div>
            <div className="guide-research-flow">{researchTopics.map((topic) => <article className="guide-research-detail guide-research-detail-inline" id={`research-${topic.id}`} key={topic.id}><div className="guide-research-detail-top"><EvidenceBadge tone={topic.tone} label={topic.label} /><span>{topic.english}</span></div><div className="guide-research-inline-heading"><ResearchGlyph id={topic.id} /><h3>{topic.title} 연구 결과</h3></div><dl><div><dt>어떤 연구인가요?</dt><dd>{topic.study}</dd></div><div><dt>무엇이 관찰됐나요?</dt><dd className="guide-research-finding">{topic.finding}</dd></div><div><dt>이 결과가 말해주는 것</dt><dd>{topic.interpretation}</dd></div></dl><p className="guide-research-source"><span>출처</span><a href={topic.source.url} target="_blank" rel="noopener noreferrer">{topic.source.label} <ExternalLink size={13} aria-hidden="true" /></a></p></article>)}</div>
            <p className="guide-research-reminder"><span>연구 결과를 먼저 읽고, 각 카드 아래 출처에서 원문으로 이어집니다.</span></p>
          </div>
        </section>

        <section className="guide-section guide-growth-story guide-story-section" id="growth" aria-labelledby="growth-heading">
          <div className="guide-container"><div className="guide-section-heading"><div><p className="guide-section-number">06 · GROWTH QUESTION</p><h2 id="growth-heading">성장호르몬 연구는<br />키 성장과 어떻게 연결될까요?</h2></div><p>하나의 결론보다<br />연구가 이어지는 경로를 봅니다.</p></div><p className="guide-section-lead">GABA 연구가 성장 관련 질문으로 이어지는 과정을 한 줄씩 살펴볼 수 있습니다.</p><div className="guide-growth-flow">{growthSteps.map((step, index) => <div className="guide-growth-step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < growthSteps.length - 1 ? <ArrowRight className="guide-growth-arrow" aria-hidden="true" /> : null}</div>)}</div><p className="guide-growth-note">앞의 근육·성장호르몬 연구에서 혈액 속 호르몬과 청소년기 생쥐의 몸길이 변화를 확인했습니다. 이 결과는 성장 연구가 신경 조절에서 호르몬과 성장 지표로 이어지는 경로를 보여줍니다.</p></div>
        </section>

        <section className="guide-section guide-expert-videos guide-story-section" id="expert-videos" aria-labelledby="expert-heading">
          <div className="guide-container">
            <div className="guide-section-heading">
              <div><p className="guide-section-number">07 · EXPERT VOICES</p><h2 id="expert-heading">영상으로 확인하세요</h2></div>
              <p>주제별 카드에서 골라 보고<br />근거는 원문으로 확인하세요.</p>
            </div>
            <div className="guide-video-board-intro"><strong>짧은 영상으로 핵심을 보고, 같은 주제의 연구 원문을 바로 확인할 수 있어요.</strong><span>다음 영상 버튼 없이 한 화면에서 원하는 주제를 선택하세요.</span></div>
            <div className="guide-video-board" aria-label="주제별 GABA 영상 게시판">
              {videoBoardItems.map((item, index) => <article className="guide-video-board-card" key={item.id}>
                {item.videoUrl ? <a className={`guide-video-board-thumb guide-video-board-thumb--${index % 4}`} href={item.videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} 영상 보기`}><span>{item.visualLabel}</span><i>▶</i></a> : <div className={`guide-video-board-thumb guide-video-board-thumb--${index % 4}`} aria-hidden="true"><span>{item.visualLabel}</span><i>▶</i></div>}
                <div className="guide-video-board-body"><span className="guide-video-board-category">{item.category}</span><h3>{item.title}</h3><p>{item.summary}</p><div className="guide-video-board-links">{item.videoUrl ? <a href={item.videoUrl} target="_blank" rel="noopener noreferrer">영상 보기 <ExternalLink size={13} aria-hidden="true" /></a> : <span className="guide-video-board-status">영상 준비 중</span>}{item.source ? <a href={item.source.url} target="_blank" rel="noopener noreferrer">원문으로 확인하세요 <ExternalLink size={13} aria-hidden="true" /></a> : null}</div></div>
              </article>)}
            </div>
            <p className="guide-video-board-note">영상은 공개 승인이 완료된 주제부터 순서대로 연결합니다. 현재는 검토가 끝난 연구 원문을 먼저 확인할 수 있어요.</p>
          </div>
        </section>

        <section className="guide-section guide-reading-note guide-story-section" aria-label="연구 읽는 순서"><div className="guide-container"><p className="guide-section-number">08 · READ THE SOURCES</p><p className="guide-reading-note-copy">각 연구 카드에서 연구 방법과 실제 관찰 결과를 읽은 다음, 카드 아래 출처를 통해 원문으로 이어집니다.</p></div></section>

        <section className="guide-final" id="final" aria-labelledby="final-heading"><div className="guide-container"><p className="guide-section-number">09 · SHARE THE STORY</p><h2 id="final-heading">GABA를 알면 수면만이 아니라<br />신경계의 조절을 이해하게 됩니다</h2><p className="guide-final-copy">GABA는 잠잘 때만 작용하는 물질이 아닙니다. 깨어 있는 동안에도 감정, 감각, 집중, 기억과 움직임에 관련된 신경회로를 조절합니다. 그리고 그 연구 영역은 피부, 근육, 성장호르몬, 면역과 성장으로 확장되고 있습니다.</p><div className="guide-final-actions"><button type="button" className="guide-primary-button" onClick={sharePage}><Share2 size={17} aria-hidden="true" /> GABA 3분 요약 공유하기 <ArrowRight size={17} aria-hidden="true" /></button></div>{shareStatus ? <span className="guide-share-status guide-final-status" role="status">{shareStatus}</span> : null}<details className="guide-share-lines"><summary>사업자가 바로 설명할 수 있는 GABA 5문장 보기</summary><div>{messageKit.map((message, index) => <article key={message}><span>0{index + 1}</span><p>{message}</p><button type="button" onClick={() => copyMessage(message)}>문장 복사</button></article>)}</div></details></div></section>
      </main>

      <footer className="guide-footer"><div className="guide-container guide-footer-grid"><a className="guide-logo" href="#top" onClick={() => scrollTo('top')}><span>뇌와 우리</span><small>GABA를 쉽게 읽는 공개 안내서</small></a><p>GABA를 쉽게 이해하고<br />자유롭게 공유하는 공개 안내서입니다.</p><div><a href="#research">연구 확장</a><a href="#expert-videos">전문가 영상</a><a href="#top">맨 위로 ↑</a></div></div><div className="guide-container guide-footer-bottom"><span>© 2026 GABA Guide</span><span>수면에서 인지, 피부, 근육과 성장 연구까지</span></div></footer>
    </div>
  );
}
