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
    const observer = new IntersectionObserver(entries => {
      if (!impressionTracked.current && entries.some(entry => entry.isIntersecting)) {
        impressionTracked.current = true;
        onEvent?.('teaser_impression', {path: '/teaser'});
        observer.disconnect();
      }
    }, {threshold: 0.25});
    observer.observe(section);
    return () => observer.disconnect();
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
      <div className="teaser-card teaser-card-player" aria-busy={!frameLoaded}>
        <div className="teaser-player">
          <iframe
            className="teaser-frame"
            title={`${preview.title}. 시청하려면 영상 안의 재생 버튼을 눌러 주세요.`}
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
          />
          {!frameLoaded && <p className="teaser-loading" aria-live="polite">티저를 불러오는 중입니다…</p>}
        </div>
        <div className="teaser-card-copy">
          <p className="teaser-label">영상 안의 재생 버튼을 눌러 시작</p>
          <h3>{preview.title}</h3>
          <p>티저 페이지가 열렸어요. 영상 화면의 재생 버튼을 누르면 시청할 수 있습니다.</p>
          <p className="teaser-fallback">영상이 재생되지 않으면 <a href={preview.url} target="_blank" rel="noopener noreferrer" onClick={()=>onEvent?.('teaser_external_opened',{path:'/teaser'})}>새 창에서 보기 ↗</a></p>
        </div>
      </div>
      <p className="teaser-note">{preview.note}</p>
    </div>
  </section>;
}
