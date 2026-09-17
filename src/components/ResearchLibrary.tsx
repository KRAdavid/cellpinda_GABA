import {useEffect,useState} from 'react';
import {Activity, ArrowRight, BookOpen, Clock3, FlaskConical, Search, Share2, UsersRound} from 'lucide-react';
import StudyInsightVisual from './StudyInsightVisual';
import './ResearchLibrary.css';

export type ResearchMetadata = {
  question?: string;
  consumerSummary?: string;
  consumerFinding?: string;
  consumerVisual?: ConsumerVisual;
  consumerScope?: string;
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
  | {kind:'before-after'; metric:string; unit:string; beforeLabel:string; beforeValue:number; beforeSd?:number; afterLabel:string; afterValue:number; afterSd?:number; seriesLabel:string; scaleMax:number}
  | {kind:'metric-pair'; metrics:{label:string; value:string; unit:string; comparison:string}[]; participantLabel:string}
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

const facts: [keyof ResearchMetadata, string][] = [
  ['population', '누가 참여했나요?'],
  ['studyType', '어떻게 살펴봤나요?'],
  ['sampleSize', '참여한 사람'],
  ['duration', '살펴본 기간'],
  ['dose', '연구에서 먹은 양'],
  ['comparison', '무엇과 비교했나요?'],
  ['outcome', '무엇을 확인했나요?'],
  ['searchThrough', '자료를 찾은 범위'],
];

function compactStudyType(value?: string): string {
  if (!value) return 'GABA 관련 연구';
  if (/문헌고찰/.test(value)) return '여러 연구를 모아 검토';
  if (/관찰|MRS/.test(value)) return '뇌의 상태를 관찰';
  if (/운동/.test(value)) return '사람 대상 운동 연구';
  if (/섭취|교차|위약|무작위/.test(value)) return '사람 대상 섭취 연구';
  return value;
}

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
    claim.publicText && claim.metadata?.consumerSummary &&
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
      if (!claims.some(claim => claim.id === id && claim.status === 'approved' && id.startsWith('research-') && claim.publicText && claim.metadata?.consumerSummary && claim.metadata.productApplicability && claim.sources.some(source => isPublicUrl(source.url)))) return;
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
  if (studies.length === 0) return null;
  async function copyStudy(id:string){
    const url=new URL(import.meta.env.BASE_URL,window.location.origin);url.hash=id;
    try{await navigator.clipboard.writeText(url.href);setManualLink('');setLinkStatus('이 연구를 바로 여는 링크를 복사했어요.')}
    catch{setManualLink(url.href);setLinkStatus('아래 링크를 선택해 직접 복사해 주세요.')}
  }

  return <section id="research" className="section wrap research research-library" aria-labelledby="research-heading">
    <div className="section-head">
      <div><p className="chapter">GABA 연구</p><h2 id="research-heading">숫자와 그림으로 보기</h2></div>
      <p className="research-library-head-note" aria-hidden="true"><BookOpen size={18}/>연구에서 관찰한 변화</p>
    </div>
    <div className="research-reading-path" role="img" aria-label="궁금한 주제에서 연구 참여자와 측정 결과 순서로 살펴봅니다">
      <div><Search aria-hidden="true"/><strong>궁금한 점</strong></div><ArrowRight aria-hidden="true"/>
      <div><UsersRound aria-hidden="true"/><strong>참여한 사람</strong></div><ArrowRight aria-hidden="true"/>
      <div><Activity aria-hidden="true"/><strong>측정한 변화</strong></div>
    </div>
    {studies.length > 0 ? <>
      <div className="research-library-controls" role="search" aria-label="승인된 연구 자료 찾기">
        <label htmlFor="research-search">궁금한 내용 찾기<input id="research-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="스트레스·수면·운동으로 찾아보세요" aria-describedby="research-search-help" /></label>
        <label htmlFor="research-topic">관심 주제<select id="research-topic" value={activeTopic} onChange={event => setTopic(event.target.value)}><option value="">모든 주제</option>{topics.map(item => <option value={item} key={item}>{item}</option>)}</select></label>
        <label htmlFor="research-type">살펴본 방법<select id="research-type" value={activeType} onChange={event => setStudyType(event.target.value)}><option value="">모든 방법</option>{studyTypes.map(type => <option value={type} key={type}>{type}</option>)}</select></label>
        <button type="button" className="text-link" disabled={!query && !activeTopic && !activeType} onClick={() => { setQuery(''); setTopic(''); setStudyType(''); }}>처음 상태로 돌아가기</button>
      </div>
      <p id="research-search-help" className="sr-only">수면, 뇌파, 운동과 같은 주제를 입력하면 관련 연구를 찾습니다.</p>
      <p className="research-library-count" role="status" aria-live="polite"><span>{visibleStudies.length}</span> / {studies.length} 연구</p>
    </> : null}
    {visibleStudies.length === 0 ? <p className="research-library-empty">다른 주제나 방식을 골라 관련 연구 이야기를 이어서 살펴보세요.</p> : visibleStudies.map(claim => {
      const metadata = claim.metadata!;
      const quickFacts = [
        {label: '참여', value: metadata.sampleSize, Icon: UsersRound},
        {label: '섭취·방법', value: metadata.dose || compactStudyType(metadata.studyType), Icon: FlaskConical},
        {label: '기간', value: metadata.duration, Icon: Clock3},
      ].filter(item => item.value);
      return <article id={claim.id} className="research-library-card" key={claim.id}>
        <p className="research-library-kind"><span className="research-library-kind-mark" aria-hidden="true" />{compactStudyType(metadata.studyType)}</p>
        <h3>{metadata.question || claim.topic}</h3>
        {metadata.consumerVisual ? <StudyInsightVisual visual={metadata.consumerVisual}/> : metadata.consumerSummary ? <p className="research-library-consumer-summary">{metadata.consumerSummary}</p> : null}
        <div className="research-library-quick-facts" aria-label="연구를 한눈에 보는 도표">
          {quickFacts.map(({label, value, Icon}) => <div key={label} title={`${label}: ${value}`}><Icon size={17} strokeWidth={1.7} aria-hidden="true" /><span><strong>{label}</strong><small>{value}</small></span></div>)}
        </div>
        <details className="research-detail" onToggle={event => {
          if (event.currentTarget.open) onOpen?.(claim.id);
        }}>
          <summary>연구 내용 더 보기</summary>
          <div className="research-library-detail">
            <div className="research-story-grid" aria-label="연구 정보 그림 요약">
              <div className="research-story-card"><UsersRound size={21} aria-hidden="true"/><h4>참여자</h4><p>{metadata.population || metadata.sampleSize || '자료에 표시된 참여자 정보'}</p></div>
              <div className="research-story-card"><FlaskConical size={21} aria-hidden="true"/><h4>방법</h4><p>{compactStudyType(metadata.studyType)}{metadata.duration ? ` · ${metadata.duration}` : ''}</p></div>
              <div className="research-story-card"><Activity size={21} aria-hidden="true"/><h4>관찰한 변화</h4><p>{metadata.consumerSummary}</p></div>
              {metadata.comparison?<div className="research-story-card"><Clock3 size={21} aria-hidden="true"/><h4>비교 조건</h4><p>{metadata.comparison}</p></div>:null}
            </div>
            <div className="research-library-boundary"><h4>제품 정보와 비교할 때</h4><p>{metadata.productApplicability}</p></div>
            <details className="research-technical-detail">
              <summary>연구 조건을 더 보기</summary>
              <div className="research-technical-detail-body">
                <div className="research-library-overview"><h4>이 연구에서 확인한 내용</h4><p>{metadata.consumerSummary || claim.publicText}</p></div>
                <dl className="research-library-facts">{facts.map(([key, label]) => {
                  const value = metadata[key];
                  return typeof value === 'string' && value ? <div key={key}><dt>{label}</dt><dd>{value}</dd></div> : null;
                })}</dl>
                <div className="research-library-findings"><h4>내 생활에 적용할 때</h4><p>{metadata.hopefulTakeaway || metadata.consumerSummary || '연구에서 본 내용을 내 생활과 함께 천천히 비교해 보세요.'}</p></div>
              </div>
            </details>
          </div>
          <div className="research-library-sources"><h4>원문 출처 보기</h4>{claim.reviewedAt ? <p className="research-library-provenance">자료 확인일 {claim.reviewedAt}</p> : null}{claim.sources.filter(source => isPublicUrl(source.url)).map(source =>
            <a key={`${source.url}-${source.title}`} href={source.url!} target="_blank" rel="noopener noreferrer">{source.title} <span aria-label="새 창">↗</span></a>,
          )}</div>
        </details>
        <button type="button" className="text-link research-copy" aria-label="이 연구 공유 링크 복사" onClick={()=>copyStudy(claim.id)}><Share2 size={15} aria-hidden="true"/>공유</button>
      </article>;
    })}
    {visibleStudies.length > 0 ? <div className="research-library-next"><a className="button outline" href="#products">셀핀다 제품 구성 확인 →</a></div> : null}
    <p role="status" aria-live="polite">{linkStatus}</p>
    {manualLink?<label>연구 공유 링크<input className="research-manual-link" value={manualLink} readOnly onFocus={event=>event.target.select()}/></label>:null}
  </section>;
}
