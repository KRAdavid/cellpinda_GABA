import {useEffect,useState} from 'react';
import {Activity, Clock3, FlaskConical, Info, Search, Share2, UsersRound} from 'lucide-react';
import StudyInsightVisual from './StudyInsightVisual';
import './ResearchLibrary.css';

export type ResearchMetadata = {
  question?: string;
  consumerSummary?: string;
  consumerFinding?: string;
  consumerDetail?: string;
  consumerContext?: string;
  consumerDisclosure?: string;
  consumerVisual?: ConsumerVisual;
  consumerScope?: string;
  consumerFindingFirst?: boolean;
  hopefulTakeaway?: string;
  studyType?: string;
  population?: string;
  sampleSize?: string;
  dose?: string;
  duration?: string;
  comparison?: string;
  outcome?: string;
  productApplicability?: string;
  searchThrough?: string;
  studyCount?: string;
};

export type ConsumerVisual =
  | {kind:'before-after'; metric:string; unit:string; beforeLabel:string; beforeValue:number; beforeSd?:number; afterLabel:string; afterValue:number; afterSd?:number; seriesLabel:string; comparisonLabel?:string; scaleMax:number}
  | {kind:'paired-before-after'; metric:string; unit:string; beforeLabel:string; afterLabel:string; groups:{label:string; participants:number; beforeValue:number; beforeSd?:number; afterValue:number; afterSd?:number}[]; scaleMax:number; comparisonLabel:string}
  | {kind:'metric-pair'; metrics:{label:string; value:string; unit:string; comparison:string; trendLabel?:string}[]; participantLabel:string}
  | {kind:'study-journey'; steps:string[]; participantLabel:string; comparisonLabel:string; outcomes?:{label:string;result:string}[]}
  | {kind:'observational-link'; leftLabel:string; rightLabel:string; participantLabel:string; studyLabel:string; boundaryLabel:string}
  | {kind:'ratio'; metric:string; unit:string; baseline:number; observed:number; comparisonLabel:string; participantLabel:string; doseLabel:string}
  | {kind:'group-values'; metric:string; unit:string; groups:{label:string; value:number}[]; scaleMax:number; participantLabel:string; comparisonNote:string};

export type Claim = {
  id: string;
  topic: string;
  publicText: string | null;
  reviewedAt?: string;
  evidenceHash?: string;
  status?: string;
  sources: { title: string; url: string | null; locator?: string | null }[];
  metadata?: ResearchMetadata;
};

type Props = {
  claims: Claim[];
  onOpen?: (claimId: string) => void;
};

function compactStudyType(value?: string, dose?: string): string {
  if (/GABA를 먹지 않고|GABA 섭취 없이/.test(dose || '') || /관찰|MRS|뇌 신호|손끝 연습/.test(value || '')) return 'GABA를 먹지 않고 뇌 신호를 살펴본 연구';
  if (!value) return 'GABA 관련 연구';
  if (/문헌고찰|여러 연구를 모아|사람 연구 여러 편/.test(value)) return '사람 연구 여러 편을 모아 살펴봄';
  if (/운동/.test(value)) return '사람이 참여한 운동 연구';
  if (/섭취|교차|위약|무작위|눈가림|평행군|사람이 먹고 비교/.test(value)) return 'GABA를 먹고 비교한 사람 연구';
  return value;
}

function isPublicUrl(value: string | null): value is string {
  if (!value) return false;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); }
  catch { return false; }
}

function canonicalStudySources(claim: Claim): string[] {
  const keys = claim.sources.filter(item => isPublicUrl(item.url)).flatMap(source => {
    try {
      const url = new URL(source.url!);
      const doi = decodeURIComponent(`${url.pathname}${url.search}`).match(/10\.\d{4,9}\/[a-z0-9._;()/:+-]+/i)?.[0];
      if (doi) return [`doi:${doi.replace(/[.,;]+$/, '').toLowerCase()}`];
      const pmid = url.hostname.includes('pubmed') && url.pathname.match(/\/(\d+)\/?/)?.[1];
      if (pmid) return [`pmid:${pmid}`];
      const pmc = url.pathname.match(/\/(PMC\d+)\/?/i)?.[1];
      if (pmc) return [`pmc:${pmc.toLowerCase()}`];
      return [`${url.hostname.replace(/^www\./, '').toLowerCase()}${url.pathname.replace(/\/+$/, '').toLowerCase()}`];
    } catch {
      return [];
    }
  });
  return keys.length ? [...new Set(keys)] : [claim.id];
}

export default function ResearchLibrary({ claims, onOpen }: Props) {
  const [linkStatus,setLinkStatus]=useState('');
  const [manualLink,setManualLink]=useState('');
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [studyType, setStudyType] = useState('');
  const [showMethodFilter, setShowMethodFilter] = useState(false);
  const [requestedId, setRequestedId] = useState('');
  const preferredStudyOrder = new Map([
    'research-byun-2018', 'research-yoto-2012', 'research-yamatsu-2016',
    'research-sakashita-2019', 'research-powers-2008', 'research-heba-2016',
    'research-review-2020',
  ].map((id, index) => [id, index] as const));
  const eligibleStudies = claims.filter(claim =>
    claim.status === 'approved' && claim.id.startsWith('research-') &&
    claim.publicText && claim.metadata?.consumerSummary &&
    claim.metadata.productApplicability && claim.sources.some(source => isPublicUrl(source.url)),
  );
  const seenStudySources = new Set<string>();
  const studies = eligibleStudies.filter(claim => {
    const sourceKeys = canonicalStudySources(claim);
    if (sourceKeys.some(key => seenStudySources.has(key))) return false;
    sourceKeys.forEach(key => seenStudySources.add(key));
    return true;
  }).sort((left,right)=>(preferredStudyOrder.get(left.id) ?? 99)-(preferredStudyOrder.get(right.id) ?? 99));
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
  const featuredStudy = visibleStudies[0];
  const remainingStudies = visibleStudies.slice(1);
  useEffect(()=>{
    const reveal=()=>{
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!claims.some(claim => claim.id === id && claim.status === 'approved' && id.startsWith('research-') && claim.publicText && claim.metadata?.consumerSummary && claim.metadata.productApplicability && claim.sources.some(source => isPublicUrl(source.url)))) return;
      setQuery(''); setTopic(''); setStudyType(''); setRequestedId(id);
    };
    reveal();window.addEventListener('hashchange',reveal);return()=>window.removeEventListener('hashchange',reveal);
  },[claims]);
  useEffect(() => {
    if (!requestedId || query || activeTopic || activeType) return;
    const article = document.getElementById(requestedId);
    const browse = article?.closest('details.research-library-browse') as HTMLDetailsElement | null;
    if (browse) browse.open = true;
    const details = article?.querySelector('details');
    if (details) {
      details.open = true;
      article?.scrollIntoView({ block: 'start', behavior: 'instant' });
      details.querySelector('summary')?.focus({ preventScroll: true });
    }
    setRequestedId('');
  }, [requestedId, query, activeType, claims]);
  if (studies.length === 0) return null;
  async function copyStudy(id:string){
    const base=new URL(import.meta.env.BASE_URL,window.location.origin);
    const url=new URL('research/',base);url.hash=id;
    try{await navigator.clipboard.writeText(url.href);setManualLink('');setLinkStatus('이 연구를 바로 여는 링크를 복사했어요.')}
    catch{setManualLink(url.href);setLinkStatus('아래 링크를 선택해 직접 복사해 주세요.')}
  }
  function renderStudy(claim: Claim, featured = false) {
    const metadata = claim.metadata!;
    const findingFirst = Boolean(metadata.consumerFindingFirst && !metadata.consumerVisual && metadata.consumerFinding);
    const takeaway = findingFirst
      ? metadata.consumerFinding
      : metadata.consumerVisual
      ? metadata.consumerScope || metadata.consumerSummary || metadata.consumerFinding
      : metadata.consumerSummary || metadata.consumerFinding || metadata.consumerScope;
    return <article id={claim.id} className={`research-library-card${featured ? ' research-library-card-featured' : ''}`} key={claim.id}>
      <p className="research-library-kind"><span className="research-library-kind-mark" aria-hidden="true" />{compactStudyType(metadata.studyType, metadata.dose)}</p>
      <h3>{metadata.question || claim.topic}</h3>
      {takeaway ? <p className={`research-library-consumer-summary${findingFirst ? ' research-library-consumer-finding' : ''}`}><strong>{findingFirst ? '사람 연구에서 관찰된 변화' : '연구는 이렇게 진행됐어요'}</strong>{takeaway}</p> : null}
      {metadata.consumerVisual ? <StudyInsightVisual visual={metadata.consumerVisual}/> : null}
      <details className="research-detail" onToggle={event => {
        if (event.currentTarget.open) onOpen?.(claim.id);
      }}>
        <summary>누가 참여했고, 어떻게 살펴봤나요?</summary>
        <div className="research-library-detail">
          <p className="research-library-study-scope"><strong>연구에서 사용한 것</strong><span>{metadata.productApplicability}</span></p>
          {metadata.consumerContext ? <p className="research-library-detail-context"><Info size={17} aria-hidden="true"/><span>{metadata.consumerContext}</span></p> : null}
          {metadata.consumerDisclosure ? <p className="research-library-disclosure"><Info size={16} aria-hidden="true"/><span><strong>연구 관계</strong>{metadata.consumerDisclosure}</span></p> : null}
          {metadata.consumerDetail ? <p className="research-library-detail-finding"><strong>측정 결과</strong>{metadata.consumerDetail}</p> : !metadata.consumerVisual && metadata.consumerFinding && metadata.consumerFinding !== takeaway ? <p className="research-library-detail-finding"><strong>연구에서 기록한 결과</strong>{metadata.consumerFinding}</p> : null}
          <div className="research-story-grid" aria-label="연구 정보 그림 요약">
            <div className="research-story-card"><UsersRound size={21} aria-hidden="true"/><h4>누가 참여했나요?</h4><p>{metadata.population || metadata.sampleSize || '연구에 나온 참여자 정보'}</p></div>
            <div className="research-story-card"><FlaskConical size={21} aria-hidden="true"/><h4>무엇을 했나요?</h4><p>{compactStudyType(metadata.studyType)}{metadata.duration ? ` · ${metadata.duration}` : ''}</p></div>
            <div className="research-story-card"><Activity size={21} aria-hidden="true"/><h4>무엇을 살펴봤나요?</h4><p>{metadata.outcome || metadata.consumerScope || '연구에서 살펴본 항목'}</p></div>
            {metadata.comparison?<div className="research-story-card"><Clock3 size={21} aria-hidden="true"/><h4>무엇과 비교했나요?</h4><p>{metadata.comparison}</p></div>:null}
          </div>
        </div>
        <div className="research-library-sources"><h4>자료 출처</h4>{claim.reviewedAt ? <p className="research-library-provenance">자료를 확인한 날 {claim.reviewedAt}</p> : null}{claim.sources.filter(source => isPublicUrl(source.url)).map(source =>
          <div className="research-library-source" key={`${source.url}-${source.title}`}><p>{source.title}</p><a href={source.url!} target="_blank" rel="noopener noreferrer">{source.title.includes('저자 소속') ? '저자 소속 보기' : source.url!.includes('pmc.ncbi.nlm.nih.gov') ? '논문 원문 보기' : '논문 정보 보기'} <span aria-label="새 창">↗</span></a></div>,
        )}</div>
      </details>
      <button type="button" className="text-link research-copy" aria-label="이 연구를 바로 여는 링크 복사" onClick={()=>copyStudy(claim.id)}><Share2 size={15} aria-hidden="true"/>이 연구 공유</button>
    </article>;
  }

  return <section id="research" className="section wrap research research-library" aria-label="연구를 쉬운 말로 보기">
    <div className="section-head research-library-head"><div><h2 id="research-title">사람 연구 한 편 먼저 보기</h2><p>아래 자료는 일반 GABA 사람 연구예요. 셀핀다 제품을 시험한 결과는 아니에요.</p></div></div>
    {featuredStudy ? renderStudy(featuredStudy, true) : null}
    <details className="research-library-browse" id="research-library-browse">
      <summary><span><Search size={18} aria-hidden="true"/> 주제별로 다른 연구 찾기</span><small>{Math.max(0, visibleStudies.length - 1)}편 더 보기</small></summary>
      {studies.length > 0 ? <>
      <div className="research-library-controls" role="search" aria-label="연구를 주제별로 찾기">
        <label htmlFor="research-search">궁금한 내용 찾기<input id="research-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="스트레스·수면·운동으로 찾아보세요" aria-describedby="research-search-help" /></label>
        <label htmlFor="research-topic">주제 고르기<select id="research-topic" value={activeTopic} onChange={event => setTopic(event.target.value)}><option value="">모든 주제</option>{topics.map(item => <option value={item} key={item}>{item}</option>)}</select></label>
        <details className="research-method-filter" open={showMethodFilter || Boolean(activeType)} onToggle={event => setShowMethodFilter(event.currentTarget.open)}>
          <summary>연구 방법 {activeType ? '선택됨' : '더보기'}</summary>
          <label htmlFor="research-type">어떻게 살펴봤나요?<select id="research-type" value={activeType} onChange={event => setStudyType(event.target.value)}><option value="">모든 연구</option>{studyTypes.map(type => <option value={type} key={type}>{compactStudyType(type)}</option>)}</select></label>
        </details>
        <button type="button" className="text-link" disabled={!query && !activeTopic && !activeType} onClick={() => { setQuery(''); setTopic(''); setStudyType(''); }}>검색 지우기</button>
      </div>
      <p id="research-search-help" className="sr-only">수면, 뇌파, 운동과 같은 주제를 입력하면 관련 연구를 찾습니다.</p>
      <p className="research-library-count" role="status" aria-live="polite">연구 <span>{visibleStudies.length}</span>건 / 전체 {studies.length}건</p>
      {visibleStudies.length === 0 ? <p className="research-library-empty">찾는 연구가 없어요. 다른 주제를 골라 보세요.</p> : remainingStudies.map(claim => renderStudy(claim))}
      </> : null}
    </details>
    <p role="status" aria-live="polite">{linkStatus}</p>
    {manualLink?<label>연구 공유 링크<input className="research-manual-link" value={manualLink} readOnly onFocus={event=>event.target.select()}/></label>:null}
  </section>;
}
