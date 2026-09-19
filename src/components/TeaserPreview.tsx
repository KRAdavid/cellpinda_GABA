import {useEffect, useRef, useState} from 'react';
import './TeaserPreview.css';

type TeaserPreviewData = {
  schemaVersion: number;
  status: 'PREVIEW' | 'HOLD' | 'APPROVED';
  placement: string;
  title: string;
  description: string;
  note: string;
  url: string | null;
};

type Props = {onEvent?: (name: string, properties?: Record<string, string>) => void};

const assetUrl = `${import.meta.env.BASE_URL}data/teaser-preview.json`;

function isHttps(value: string | null): value is string {
  if (!value) return false;
  try { return new URL(value).protocol === 'https:'; }
  catch { return false; }
}

export default function TeaserPreview({onEvent}: Props) {
  const [preview, setPreview] = useState<TeaserPreviewData | null>(null);
  const [frameRequested, setFrameRequested] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const impressionTracked = useRef(false);
  const embedLoadTracked = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(assetUrl, {signal: controller.signal})
      .then(response => response.ok ? response.json() as Promise<TeaserPreviewData> : null)
      .then(value => {
        if (value?.schemaVersion === 1 && ['HOLD', 'PREVIEW', 'APPROVED'].includes(value.status) && (value.url === null || isHttps(value.url))) setPreview(value);
      })
      .catch(error => { if ((error as Error).name !== 'AbortError') setPreview(null); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!preview) return;
    const section = document.getElementById('teaser');
    if (!section) return;
    const hasPublicVideo = isHttps(preview.url);
    let preloadObserver: IntersectionObserver | null = null;
    preloadObserver = hasPublicVideo ? new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setFrameRequested(true);
        preloadObserver?.disconnect();
      }
    }, {rootMargin: '560px 0px', threshold: 0}) : null;
    const impressionObserver = new IntersectionObserver(entries => {
      if (!impressionTracked.current && entries.some(entry => entry.isIntersecting)) {
        impressionTracked.current = true;
        onEvent?.('teaser_impression', {path: '/teaser'});
        impressionObserver.disconnect();
      }
    }, {threshold: 0.25});
    preloadObserver?.observe(section);
    impressionObserver.observe(section);
    return () => { preloadObserver?.disconnect(); impressionObserver.disconnect(); };
  }, [preview, onEvent]);

  if (!preview) return null;
  const hasPublicVideo = isHttps(preview.url);
  const isOnHold = preview.status === 'HOLD' || !hasPublicVideo;

  return <section id="teaser" className="teaser-section" aria-labelledby="teaser-heading">
    <div className="wrap teaser-wrap">
      <div className="teaser-intro">
        <p className="chapter">02 / 발효가바 영상</p>
        <h2 id="teaser-heading">발효가바는<br />어떻게 만들어질까요?</h2>
        <p>{preview.description}</p>
        <p className="teaser-context">{isOnHold ? '공개가 확정되면 이 자리에서 바로 볼 수 있어요. 연구와 제품 정보는 아래에서 먼저 확인해 보세요.' : '영상에서는 발효 이야기를, 연구와 제품 메뉴에서는 각각의 정보를 확인해 보세요.'}</p>
      </div>
      <div className={`teaser-card teaser-card-player${isOnHold ? ' teaser-card--hold' : ''}`} aria-busy={frameRequested && !frameLoaded}>
        <div className="teaser-player">
          {isOnHold ? <div className="teaser-hold" role="status" aria-live="polite">
            <span className="teaser-hold-icon" aria-hidden="true">✦</span>
            <strong>영상 공개 준비 중이에요</strong>
            <span>공개가 확정되면 이 자리에서 바로 만나보세요.</span>
          </div> : frameRequested ? <iframe
            className="teaser-frame"
            title={`${preview.title}. 화면에 들어오면 자동 재생을 시도하고, 소리는 화면 안에서 조절할 수 있어요.`}
            src={preview.url!}
            allow="autoplay; fullscreen; picture-in-picture"
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => {
              setFrameLoaded(true);
              if (!embedLoadTracked.current) {
                embedLoadTracked.current = true;
                onEvent?.('teaser_embed_loaded', {path: '/teaser'});
              }
            }}
          /> : <p className="teaser-ready" aria-live="polite">이 화면 가까이 오면 바로 볼 수 있게 준비해요.</p>}
          {frameRequested && !frameLoaded && <p className="teaser-loading" aria-live="polite">티저 화면을 불러오는 중입니다…</p>}
        </div>
        <div className="teaser-card-copy">
          <p className="teaser-label">{isOnHold ? '공개 준비 중' : '화면에 들어오면 자동 시작'}</p>
          <p className="teaser-card-title">{preview.title}</p>
          <p>{isOnHold ? '발효가바가 만들어지는 이야기를 영상으로 준비하고 있어요.' : '이 화면에 들어오면 영상이 자동으로 시작돼요. 소리는 영상 안에서 켜고 끌 수 있어요.'}</p>
          {!isOnHold && <p className="teaser-fallback">자동 시작이 막히면 화면 안의 재생 버튼을 눌러 주세요. 계속 어려우면 <a href={preview.url!} target="_blank" rel="noopener noreferrer" onClick={()=>onEvent?.('teaser_external_opened',{path:'/teaser'})}>새 창에서 보기 ↗</a></p>}
        </div>
      </div>
      <p className="teaser-note">{preview.note}</p>
    </div>
  </section>;
}
