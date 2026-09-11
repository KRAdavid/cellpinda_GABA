import {useEffect, useState} from 'react';
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
      if (entries.some(entry => entry.isIntersecting)) {
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
        <p className="chapter">선택형 티저 · 발효가바 이야기</p>
        <h2 id="teaser-heading">발효가바의 이야기를<br />짧은 다큐로 만나보세요.</h2>
        <p>{preview.description}</p>
        <p className="teaser-context">내 리듬을 돌아보며 발효가바의 이야기를 이 페이지 안에서 바로 이어서 볼 수 있습니다.</p>
      </div>
      <div className="teaser-card teaser-card-player" aria-busy={!frameLoaded}>
        <div className="teaser-player">
          <iframe
            className="teaser-frame"
            title={preview.title}
            src={preview.url}
            allow="autoplay; fullscreen; picture-in-picture"
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => {
              setFrameLoaded(true);
              onEvent?.('teaser_play', {path: '/teaser'});
            }}
          />
          {!frameLoaded && <p className="teaser-loading" aria-live="polite">티저를 불러오는 중입니다…</p>}
        </div>
        <div className="teaser-card-copy">
          <p className="teaser-label">페이지 안에서 바로 재생 · CINEMATIC DOCUMENTARY</p>
          <h3>{preview.title}</h3>
          <p>발효와 휴식에 관한 장면이 이 페이지 안에서 재생됩니다. 시청 후 연구 근거와 제품 표시사항을 이어서 확인해 보세요.</p>
          <p className="teaser-fallback">재생이 어려우면 <a href={preview.url} target="_blank" rel="noopener noreferrer">외부 페이지에서 보기 ↗</a></p>
        </div>
      </div>
      <p className="teaser-note">{preview.note}</p>
    </div>
  </section>;
}
