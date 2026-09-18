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
        if (value?.schemaVersion === 1 && value.status === 'PREVIEW' && isHttps(value.url)) setPreview(value);
      })
      .catch(error => { if ((error as Error).name !== 'AbortError') setPreview(null); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!preview) return;
    const section = document.getElementById('teaser');
    if (!section) return;
    const preloadObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setFrameRequested(true);
        preloadObserver.disconnect();
      }
    }, {rootMargin: '560px 0px', threshold: 0});
    const impressionObserver = new IntersectionObserver(entries => {
      if (!impressionTracked.current && entries.some(entry => entry.isIntersecting)) {
        impressionTracked.current = true;
        onEvent?.('teaser_impression', {path: '/teaser'});
        impressionObserver.disconnect();
      }
    }, {threshold: 0.25});
    preloadObserver.observe(section);
    impressionObserver.observe(section);
    return () => { preloadObserver.disconnect(); impressionObserver.disconnect(); };
  }, [preview, onEvent]);

  if (!preview || !isHttps(preview.url)) return null;

  return <section id="teaser" className="teaser-section" aria-labelledby="teaser-heading">
    <div className="wrap teaser-wrap">
      <div className="teaser-intro">
        <p className="chapter">발효가바 영상</p>
        <h2 id="teaser-heading">발효가바는<br />어떻게 만들어질까요?</h2>
        <p>{preview.description}</p>
        <p className="teaser-context">영상에서는 발효 이야기를, 연구와 제품 메뉴에서는 각각의 정보를 확인해 보세요.</p>
      </div>
      <div className="teaser-card teaser-card-player" aria-busy={frameRequested && !frameLoaded}>
        <div className="teaser-player">
          {frameRequested ? <iframe
            className="teaser-frame"
            title={`${preview.title}. 이 화면 안의 재생 버튼으로 시청할 수 있어요.`}
            src={preview.url}
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
          <p className="teaser-label">화면 안에서 바로 시청</p>
          <p className="teaser-card-title">{preview.title}</p>
          <p>영상 화면의 재생 아이콘을 누르면 이 자리에서 시작돼요.</p>
          <p className="teaser-fallback">영상이 재생되지 않으면 <a href={preview.url} target="_blank" rel="noopener noreferrer" onClick={()=>onEvent?.('teaser_external_opened',{path:'/teaser'})}>새 창에서 보기 ↗</a></p>
        </div>
      </div>
      <p className="teaser-note">{preview.note}</p>
    </div>
  </section>;
}
