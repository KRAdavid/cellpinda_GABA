import {useEffect,useState} from 'react';
import './ResearchLibrary.css';

export type ResearchMetadata = {
  question?: string;
  studyType?: string;
  population?: string;
  sampleSize?: string;
  dose?: string;
  duration?: string;
  comparison?: string;
  outcome?: string;
  result?: string;
  limitations?: string[];
  productApplicability?: string;
  searchThrough?: string;
  studyCount?: string;
};

export type Claim = {
  id: string;
  topic: string;
  publicText: string | null;
  status?: string;
  sources: { title: string; url: string | null; locator?: string | null }[];
  limitations?: string[];
  metadata?: ResearchMetadata;
};

type Props = {
  claims: Claim[];
  onOpen?: (claimId: string) => void;
};

const facts: [keyof ResearchMetadata, string][] = [
  ['population', '누구를 살펴봤나요?'],
  ['studyType', '어떻게 조사했나요?'],
  ['sampleSize', '연구 규모'],
  ['duration', '관찰 기간'],
  ['dose', '연구에서 사용한 양'],
  ['comparison', '무엇과 비교했나요?'],
  ['outcome', '무엇을 측정했나요?'],
  ['searchThrough', '문헌 검색 범위'],
];

function isPublicUrl(value: string | null): value is string {
  if (!value) return false;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); }
  catch { return false; }
}

export default function ResearchLibrary({ claims, onOpen }: Props) {
  const [linkStatus,setLinkStatus]=useState('');
  const [manualLink,setManualLink]=useState('');
  useEffect(()=>{
    const reveal=()=>{const id=window.location.hash.slice(1);if(!claims.some(c=>c.id===id&&c.status==='approved'&&id.startsWith('research-')))return;const article=document.getElementById(id);const details=article?.querySelector('details');if(details){details.open=true;article?.scrollIntoView({block:'start',behavior:'instant'})}};
    reveal();window.addEventListener('hashchange',reveal);return()=>window.removeEventListener('hashchange',reveal);
  },[claims]);
  async function copyStudy(id:string){
    const url=new URL('/',window.location.origin);url.hash=id;
    try{await navigator.clipboard.writeText(url.href);setManualLink('');setLinkStatus('이 연구를 바로 여는 링크를 복사했어요.')}
    catch{setManualLink(url.href);setLinkStatus('아래 링크를 선택해 직접 복사해 주세요.')}
  }

  const studies = claims.filter(claim =>
    claim.status === 'approved' && claim.id.startsWith('research-') &&
    claim.publicText && claim.metadata?.result &&
    claim.metadata.productApplicability && claim.sources.some(source => isPublicUrl(source.url)),
  );

  return <section id="research" className="section wrap research research-library" aria-labelledby="research-heading">
    <div className="section-head">
      <div><p className="chapter">연구를 쉽게 읽기</p><h2 id="research-heading">어떤 질문을 했고,<br />무엇을 발견했을까요?</h2></div>
      <p>한 연구의 발견과 여러 연구의 흐름을 함께 읽습니다.<br />대상과 조건, 아직 알 수 없는 점까지 확인하세요.</p>
    </div>
    {studies.length === 0 ? <p className="note" role="status">현재 표시할 연구 자료가 없습니다. 자료가 준비되면 이곳에서 확인할 수 있습니다.</p> : studies.map(claim => {
      const metadata = claim.metadata!;
      const limitations = [...new Set([...(metadata.limitations ?? []), ...(claim.limitations ?? [])])];
      return <article id={claim.id} className="research-library-card" key={claim.id}>
        <p className="research-library-kind">{metadata.studyType || claim.topic}</p>
        <h3>{metadata.question || claim.topic}</h3>
        <p className="research-library-summary">{claim.publicText}</p>
        <p className="research-library-scope">{metadata.productApplicability}</p>
        <details className="research-detail" onToggle={event => {
          if (event.currentTarget.open) onOpen?.(claim.id);
        }}>
          <summary>연구 조건·결과·한계 자세히 읽기</summary>
          <div className="research-library-detail">
            <dl className="research-library-facts">{facts.map(([key, label]) => {
              const value = metadata[key];
              return typeof value === 'string' && value ? <div key={key}><dt>{label}</dt><dd>{value}</dd></div> : null;
            })}</dl>
            <div className="research-library-findings"><h4>무엇이 관찰됐나요?</h4><p>{metadata.result}</p>
              {limitations.length > 0 && <><h4>함께 읽어야 할 한계</h4><ul>{limitations.map(item => <li key={item}>{item}</li>)}</ul></>}
            </div>
          </div>
          <div className="research-library-sources"><h4>직접 확인하는 원문</h4>{claim.sources.filter(source => isPublicUrl(source.url)).map(source =>
            <a key={`${source.url}-${source.title}`} href={source.url!} target="_blank" rel="noopener noreferrer">{source.title} <span aria-label="새 창">↗</span></a>,
          )}</div>
        </details>
        <button type="button" className="text-link research-copy" onClick={()=>copyStudy(claim.id)}>이 연구 링크 복사 ↗</button>
      </article>;
    })}
    <p role="status" aria-live="polite">{linkStatus}</p>
    {manualLink?<label>연구 공유 링크<input className="research-manual-link" value={manualLink} readOnly onFocus={event=>event.target.select()}/></label>:null}
  </section>;
}
