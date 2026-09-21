import {useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent} from 'react';
import {ArrowLeft, ArrowRight, BookOpen, Brain, ExternalLink, PauseCircle, Sparkles} from 'lucide-react';
import './ConsumerGabaReel.css';

type ReelSlide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  kind: 'hook' | 'bridge' | 'research' | 'cta';
  icon?: typeof BookOpen;
  link?: {href: string; label: string};
};

type Props = {
  onEvent?: (name: string, properties?: Record<string, string>) => void;
  hasRhythmResult?: boolean;
};

function buildSlides(): ReelSlide[] {
  return [
    {
      id: 'state',
      eyebrow: '지금 내 상태',
      title: '몸은 쉬었는데 머리는 계속 돌아가나요?',
      body: '퇴근 후에도 할 일이 떠오르고 작은 소리에도 예민하다면, 먼저 뇌를 쉬게 할 시간입니다.',
      kind: 'hook',
      icon: Brain,
    },
    {
      id: 'pause',
      eyebrow: '쉬어야 하는 이유',
      title: '계속 켜 둔 뇌는 집중할 틈이 줄어듭니다.',
      body: '5분 화면을 내려놓고 물을 마시거나 창밖을 보며 머리를 쉬게 해 보세요.',
      kind: 'bridge',
      icon: PauseCircle,
    },
    {
      id: 'research',
      eyebrow: '일반 GABA 연구',
      title: '일반 GABA 연구에서 뇌파·활력과 잠의 변화를 살펴봤어요.',
      body: '머리를 많이 쓴 뒤 뇌파와 활력 점수, 잠드는 시간을 비교해 기록한 연구가 있어요.',
      kind: 'research',
      icon: BookOpen,
      link: {href: '#gaba-research-highlights', label: '연구 내용을 쉽게 보기'},
    },
    {
      id: 'next',
      eyebrow: '다음 단계',
      title: '지금 내 상태부터 1분이면 확인할 수 있어요.',
      body: '먼저 1분 체크로 내 상태를 확인한 뒤, 제품 구성과 구매자 후기를 볼 수 있어요.',
      kind: 'cta',
      icon: Sparkles,
      link: {href: '#products', label: '가바 1500 제품 구성 보기'},
    },
  ];
}

export default function ConsumerGabaReel({onEvent, hasRhythmResult = false}: Props) {
  const slides = useMemo(() => buildSlides(), []);
  const slideCount = slides.length;
  const nextSlideTitle = hasRhythmResult
    ? '이제 제품 구성과 구매자 후기를 확인해 보세요.'
    : '지금 내 상태부터 1분이면 확인할 수 있어요.';
  const nextSlideBody = hasRhythmResult
    ? '결과 화면에서 제품 구성과 구매자 후기를 확인할 수 있어요.'
    : '먼저 1분 체크로 내 상태를 확인한 뒤, 제품 구성과 구매자 후기를 볼 수 있어요.';
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const impressionTracked = useRef(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.index);
      if (Number.isInteger(index)) {
        setActiveIndex(index);
        onEvent?.('consumer_reel_step', {path: '/'});
      }
    }, {root: rail, threshold: [0.6]});
    slideRefs.current.forEach(slide => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, [onEvent, slides]);

  useEffect(() => {
    const section = document.getElementById('consumer-reel');
    if (!section) return;
    const observer = new IntersectionObserver(entries => {
      if (impressionTracked.current || !entries.some(entry => entry.isIntersecting)) return;
      impressionTracked.current = true;
      onEvent?.('consumer_reel_impression', {path: '/'});
      observer.disconnect();
    }, {threshold: 0.25});
    observer.observe(section);
    return () => observer.disconnect();
  }, [onEvent]);

  const goTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    slideRefs.current[nextIndex]?.scrollIntoView({behavior, block: 'nearest', inline: 'center'});
    onEvent?.('consumer_reel_navigation', {path: '/'});
  };

  const handleRailKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const nextIndex = event.key === 'ArrowRight' || event.key === 'PageDown'
      ? activeIndex + 1
      : event.key === 'ArrowLeft' || event.key === 'PageUp'
        ? activeIndex - 1
        : event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? slides.length - 1
            : null;
    if (nextIndex === null) return;
    event.preventDefault();
    goTo(nextIndex);
  };

  return <section id="consumer-reel" className="consumer-reel" aria-labelledby="consumer-reel-heading">
    <div className="wrap consumer-reel__wrap">
      <div className="consumer-reel__heading">
        <div>
          <p className="chapter">한 장씩 보는 GABA 이야기</p>
          <h2 id="consumer-reel-heading">
            {hasRhythmResult ? <>내 상태를 확인한 뒤<br />GABA를 알아보세요</> : <>GABA가 궁금하다면<br />먼저 한 장씩 보세요</>}
          </h2>
        </div>
        <p>옆으로 넘기며 한 장씩 확인해 보세요.<br />연구·제품·후기는 각각 다른 화면에서 확인할 수 있어요.</p>
        <span className="consumer-reel__swipe-hint" aria-hidden="true">다음 카드 →</span>
      </div>
      <div className="consumer-reel__controls" aria-label="GABA 이야기 카드 이동">
        <span aria-live="polite">{activeIndex + 1} / {slideCount}</span>
        <div>
          <button type="button" className="consumer-reel__control" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="이전 카드"><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" className="consumer-reel__control" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === slides.length - 1} aria-label="다음 카드"><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <div ref={railRef} className="consumer-reel__rail" tabIndex={0} aria-label="GABA 이야기 카드 목록" onKeyDown={handleRailKeyDown}>
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return <article
            ref={element => {slideRefs.current[index] = element;}}
            className={`consumer-reel__card consumer-reel__card--${slide.kind}`}
            data-index={index}
            key={slide.id}
            aria-labelledby={`consumer-reel-${slide.id}-title`}
          >
            <div className="consumer-reel__card-top"><span>{String(index + 1).padStart(2, '0')}</span><span>{slide.eyebrow}</span></div>
            {Icon ? <span className="consumer-reel__icon"><Icon size={25} strokeWidth={1.7} aria-hidden="true" /></span> : null}
            <h3 id={`consumer-reel-${slide.id}-title`}>{slide.id === 'next' ? nextSlideTitle : slide.title}</h3>
            <p>{slide.id === 'next' ? nextSlideBody : slide.body}</p>
            {slide.link && !(hasRhythmResult && slide.id === 'next') ? <a className="consumer-reel__link" href={slide.link.href} onClick={() => onEvent?.('consumer_reel_cta', {path: '/'})}>{slide.link.label} <ExternalLink size={15} aria-hidden="true" /></a> : null}
            {slide.id === 'research' ? <small className="consumer-reel__boundary">일반 GABA 연구를 쉽게 정리한 내용이에요. 셀핀다 완제품 시험 결과가 아니며, 제품 정보는 제품 구성에서 따로 확인해 보세요.</small> : null}
          </article>;
        })}
      </div>
      <div className="consumer-reel__dots" aria-hidden="true">
        {slides.map((slide, index) => <span className={index === activeIndex ? 'is-active' : ''} key={slide.id} />)}
      </div>
    </div>
  </section>;
}
