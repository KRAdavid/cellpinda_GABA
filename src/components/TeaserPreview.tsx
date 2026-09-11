import {useEffect, useState} from 'react';
import {ArrowUpRight, Play} from 'lucide-react';
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
        <p className="teaser-context">내 리듬을 먼저 돌아본 뒤, 궁금할 때 열어보는 다음 장면입니다.</p>
      </div>
      <div className="teaser-card">
        <div className="teaser-card-art" aria-hidden="true"><Play size={30} fill="currentColor" /></div>
        <div className="teaser-card-copy">
          <p className="teaser-label">외부 페이지 · CINEMATIC DOCUMENTARY</p>
          <h3>{preview.title}</h3>
          <p>발효와 휴식에 관한 장면을 살펴본 뒤, 원래 사이트로 돌아와 연구 근거와 제품 표시사항을 이어서 확인할 수 있습니다.</p>
          <a className="button light" href={preview.url} target="_blank" rel="noopener noreferrer" onClick={() => onEvent?.('teaser_play', {path: '/teaser'})}>티저 페이지 열기 <ArrowUpRight size={18} /></a>
        </div>
      </div>
      <p className="teaser-note">{preview.note}</p>
    </div>
  </section>;
}
