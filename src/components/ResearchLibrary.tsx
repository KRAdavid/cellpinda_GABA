import {useEffect,useState} from 'react';
import './ResearchLibrary.css';

export type ResearchMetadata = {
  question?: string;
  consumerSummary?: string;
  hopefulTakeaway?: string;
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
  reviewedAt?: string;
  evidenceHash?: string;
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
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [studyType, setStudyType] = useState('');
  const [requestedId, setRequestedId] = useState('');
  const studies = claims.filter(claim =>
    claim.status === 'approved' && claim.id.startsWith('research-') &&
    claim.publicText && claim.metadata?.result &&
    claim.metadata.productApplicability && claim.sources.some(source => isPublicUrl(source.url)),
  );
  const topics = [...new Set(studies.map(claim => claim.topic).filter(Boolean))];
  const activeTopic = topics.includes(topic) ? topic : '';
  const studyTypes = [...new Set(studies.map(claim => claim.metadata!.studyType).filter((value): value is string => Boolean(value)))];
  const activeType = studyTypes.includes(studyType) ? studyType : '';
  const terms = query.normalize('NFKC').toLocaleLowerCase('ko-KR').trim().split(/\s+/).filter(Boolean);
  const visibleStudies = studies.filter(claim => {
    if (activeTopic && claim.topic !== activeTopic) return false;
    if (activeType && claim.metadata!.studyType !== activeType) return false;
    const searchable = [claim.topic, claim.publicText, ...Object.values(claim.metadata!).flat(), ...claim.sources.map(source => source.title)]
      .join(' ').normalize('NFKC').toLocaleLowerCase('ko-KR');
    return terms.every(term => searchable.includes(term));
  });
  useEffect(()=>{
    const reveal=()=>{
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!claims.some(claim => claim.id === id && claim.status === 'approved' && id.startsWith('research-') && claim.publicText && claim.metadata?.result && claim.metadata.productApplicability && claim.sources.some(source => isPublicUrl(source.url)))) return;
      setQuery(''); setTopic(''); setStudyType(''); setRequestedId(id);
    };
    reveal();window.addEventListener('hashchange',reveal);return()=>window.removeEventListener('hashchange',reveal);
  },[claims]);
  useEffect(() => {
    if (!requestedId || query || activeTopic || activeType) return;
    const article = document.getElementById(requestedId);
    const details = article?.querySelector('details');
    if (details) {
      details.open = true;
      article?.scrollIntoView({ block: 'start', behavior: 'instant' });
      details.querySelector('summary')?.focus({ preventScroll: true });
    }
    setRequestedId('');
  }, [requestedId, query, activeType, claims]);
  async function copyStudy(id:string){
    const url=new URL('/',window.location.origin);url.hash=id;
    try{await navigator.clipboard.writeText(url.href);setManualLink('');setLinkStatus('이 연구를 바로 여는 링크를 복사했어요.')}
    catch{setManualLink(url.href);setLinkStatus('아래 링크를 선택해 직접 복사해 주세요.')}
  }

  return <section id="research" className="section wrap research research-library" aria-labelledby="research-heading">
    <div className="section-head">
      <div><p className="chapter">연구를 쉽게 읽기</p><h2 id="research-heading">어떤 질문을 했고,<br />무엇을 발견했을까요?</h2></div>
      <p>연구의 핵심을 먼저 쉬운 말로 읽고, 원문에서 조건과 한계를 확인하세요.<br />근거를 바탕으로 내 생활에 가바를 더해볼지 천천히 판단할 수 있습니다.</p>
    </div>
    {studies.length > 0 ? <>
      <div className="research-library-controls" role="search" aria-label="승인된 연구 자료 찾기">
        <label htmlFor="research-search">연구 내용 검색<input id="research-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="연구 질문, 대상, 기간 등" aria-describedby="research-search-help" /></label>
        <label htmlFor="research-topic">연구 주제<select id="research-topic" value={activeTopic} onChange={event => setTopic(event.target.value)}><option value="">모든 주제</option>{topics.map(item => <option value={item} key={item}>{item}</option>)}</select></label>
        <label htmlFor="research-type">자료 유형<select id="research-type" value={activeType} onChange={event => setStudyType(event.target.value)}><option value="">모든 자료 유형</option>{studyTypes.map(type => <option value={type} key={type}>{type}</option>)}</select></label>
        <button type="button" className="text-link" disabled={!query && !activeTopic && !activeType} onClick={() => { setQuery(''); setTopic(''); setStudyType(''); }}>검색·유형 초기화</button>
      </div>
      <p id="research-search-help" className="note">공개된 연구의 질문·대상·결과·출처를 찾습니다. 자료 유형은 원문에 기록된 연구 설계 기준입니다.</p>
      <p className="research-library-count" role="status" aria-live="polite">전체 {studies.length}건 중 {visibleStudies.length}건</p>
    </> : null}
    {studies.length === 0 ? <p className="note" role="status">현재 표시할 연구 자료가 없습니다. 자료가 준비되면 이곳에서 확인할 수 있습니다.</p> : visibleStudies.length === 0 ? <p className="research-library-empty">조건에 맞는 연구가 없어요. 검색어를 바꾸거나 검색·유형을 초기화해 주세요.</p> : visibleStudies.map(claim => {
      const metadata = claim.metadata!;
      const limitations = [...new Set([...(metadata.limitations ?? []), ...(claim.limitations ?? [])])];
      return <article id={claim.id} className="research-library-card" key={claim.id}>
        <p className="research-library-kind">{metadata.studyType || claim.topic}</p>
        {(claim.reviewedAt || claim.evidenceHash) ? <p className="research-library-provenance">{claim.reviewedAt ? `검토일 ${claim.reviewedAt}` : null}{claim.reviewedAt && claim.evidenceHash ? ' · ' : null}{claim.evidenceHash ? <><span>근거 식별자 </span><code title={claim.evidenceHash}>{claim.evidenceHash.slice(0, 12)}…</code></> : null}</p> : null}
        <h3>{metadata.question || claim.topic}</h3>
        <p className="research-library-summary">{claim.publicText}</p>
        {metadata.consumerSummary ? <p className="research-library-consumer-summary"><strong>쉽게 말하면</strong>{metadata.consumerSummary}</p> : null}
        {metadata.hopefulTakeaway ? <p className="research-library-hopeful"><strong>내 생활에 연결해 보기</strong>{metadata.hopefulTakeaway}</p> : null}
        <a className="text-link research-try-link" href="#products">연구와 제품 정보는 별개입니다. 제품 구성·표시사항을 따로 살펴보세요 →</a>
        <dl className="research-library-preview" aria-label="연구의 핵심 조건">
          {(['population', 'sampleSize', 'duration', 'searchThrough'] as const).map(key => metadata[key] ? <div key={key}>
            <dt>{facts.find(([field]) => field === key)![1]}</dt><dd>{metadata[key]}</dd>
          </div> : null)}
        </dl>
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
