import {useEffect,useRef,useState} from 'react';
import {Activity, Brain, Clock3, Dumbbell, FlaskConical, Hand, Info, Moon, Search, Share2, UsersRound} from 'lucide-react';
import StudyInsightVisual from './StudyInsightVisual';
import {canonicalStudySourceKeys, isPublicUrl} from '../domain/research-sources';
import './ResearchLibrary.css';

export type ResearchMetadata = {
  question?: string;
  consumerSummary?: string;
  consumerFinding?: string;
  /** Short, reviewed result line used by the homepage research highlights. */
  consumerHighlight?: string;
  consumerDetail?: string;
  consumerContext?: string;
  consumerDisclosure?: string;
  consumerDisclosureStatus?: string;
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
  sectionTitle?: string;
  onOpen?: (claimId: string) => void;
};

function compactStudyType(value?: string, dose?: string): string {
  if (/GABA를 먹지 않고|GABA 섭취 없이/.test(dose || '') || /관찰|MRS|뇌 신호|손끝 연습/.test(value || '')) return 'GABA를 먹지 않고 살펴본 연구';
  if (!value) return 'GABA 관련 연구';
  if (/문헌고찰|여러 연구를 모아|사람 연구 여러 편/.test(value)) return '사람 연구 여러 편을 모아 정리';
  if (/운동/.test(value)) return '사람이 참여한 운동 연구';
  if (/섭취|교차|위약|무작위|눈가림|평행군|사람이 먹고 비교/.test(value)) return '사람이 GABA를 먹고 비교한 연구';
  return value;
}

export default function ResearchLibrary({ claims, sectionTitle = 'GABA 연구 한눈에', onOpen }: Props) {
  const [linkStatus,setLinkStatus]=useState('');
  const [manualLink,setManualLink]=useState('');
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [studyType, setStudyType] = useState('');
  const [showMethodFilter, setShowMethodFilter] = useState(false);
  const [requestedId, setRequestedId] = useState('');
  const browseRef = useRef<HTMLDetailsElement>(null);
  const preferredStudyOrder = new Map([
    'research-yamatsu-2016', 'research-byun-2018', 'research-yoto-2012',
    'research-powers-2008', 'research-review-2020', 'research-heba-2016',
  ].map((id, index) => [id, index] as const));
  const eligibleStudies = claims.filter(claim =>
    claim.status === 'approved' && claim.id.startsWith('research-') &&
    claim.publicText && claim.metadata?.consumerSummary &&
    claim.metadata.productApplicability && claim.sources.some(source => isPublicUrl(source.url)),
  );
  const seenStudySources = new Set<string>();
  const studies = eligibleStudies.filter(claim => {
    const sourceKeys = canonicalStudySourceKeys(claim.sources);
    if (!sourceKeys.length) sourceKeys.push(claim.id);
    if (sourceKeys.some(key => seenStudySources.has(key))) return false;
    sourceKeys.forEach(key => seenStudySources.add(key));
    return true;
  }).sort((left,right)=>(preferredStudyOrder.get(left.id) ?? 99)-(preferredStudyOrder.get(right.id) ?? 99));
  const topics = [...new Set(studies.map(claim => claim.topic).filter(Boolean))];
  const topicCards = [
    {topic:'잠', label:'잠', detail:'잠드는 시간과 수면을 본 연구', Icon:Moon},
    {topic:'스트레스·잠', label:'스트레스와 잠', detail:'스트레스와 잠을 본 연구', Icon:Activity},
    {topic:'뇌파·과제', label:'머리를 많이 쓴 뒤', detail:'머리를 많이 쓴 뒤 뇌 신호', Icon:Brain},
    {topic:'운동', label:'쉬었을 때·운동했을 때', detail:'혈액 속 성장호르몬을 살펴본 연구', Icon:Dumbbell},
    {topic:'뇌·손끝 연습', label:'손끝 감각', detail:'손끝 자극과 뇌 신호', Icon:Hand},
  ].filter(card => topics.includes(card.topic));
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
    const reviewOverview = claim.id === 'research-review-2020';
    const nonIngestionStudy = /GABA를 먹지 않고|GABA 섭취 없이/.test(metadata.dose || '');
    const generalResearch = reviewOverview || !nonIngestionStudy;
    const resultVisualFirst = metadata.consumerVisual?.kind === 'paired-before-after';
    const findingFirst = Boolean(metadata.consumerFindingFirst && !metadata.consumerVisual && metadata.consumerFinding);
    const takeaway = reviewOverview
      ? '사람 연구 14편에서 참여자와 먹은 양·기간, 살펴본 항목을 모아 정리한 자료예요.'
      : resultVisualFirst ? '' : findingFirst
      ? metadata.consumerFinding
      : metadata.consumerVisual
      ? metadata.consumerScope || metadata.consumerSummary || metadata.consumerFinding
      : metadata.consumerSummary || metadata.consumerFinding || metadata.consumerScope;
    // The Powers card already shows the full product-boundary note before the
    // disclosure panel. Keep the panel focused on the study condition so the
    // same warning is not repeated twice in the consumer flow. The reviewed
    // productApplicability field remains intact in the public data ledger.
    const detailScope = claim.id === 'research-powers-2008'
      ? 'GABA 3g을 한 번 먹고 90분 동안 혈액 속 성장호르몬을 살펴본 조건입니다.'
      : metadata.productApplicability;
    return <article id={claim.id} className={`research-library-card${featured ? ` research-library-card-featured${resultVisualFirst ? ' research-library-card-featured--visual-first' : ''}` : ''}`} key={claim.id}>
      <p className={`research-library-kind${nonIngestionStudy ? ' research-library-kind--non-ingestion' : ''}${generalResearch ? ' research-library-kind--general' : ''}`}><span className="research-library-kind-mark" aria-hidden="true" />{reviewOverview ? '사람 연구 여러 편을 모아 정리 · 2020년 2월까지' : compactStudyType(metadata.studyType, metadata.dose)}</p>
      <p className="research-library-study-boundary">일반 GABA 연구 · 셀핀다 완제품 시험 아님</p>
      <h3>{reviewOverview ? '사람 연구 14편의 범위 살펴보기' : metadata.question || claim.topic}</h3>
      {takeaway ? <p className={`research-library-consumer-summary${findingFirst ? ' research-library-consumer-finding' : ''}`}><strong>{reviewOverview ? '자료에서 다룬 내용' : findingFirst ? '사람 연구에서 관찰된 변화' : '이 연구에서 본 내용'}</strong>{takeaway}</p> : null}
      {metadata.consumerVisual ? <StudyInsightVisual visual={metadata.consumerVisual}/> : null}
      {metadata.consumerDisclosure ? <p className="research-library-disclosure"><Info size={16} aria-hidden="true"/><span><strong>{metadata.consumerDisclosureStatus === 'not_reported_in_pubmed_abstract' ? '연구 지원·연구자 소속 확인 상태' : '연구를 지원한 곳·연구자 소속'}</strong>{metadata.consumerDisclosure}</span></p> : null}
      {featured && metadata.hopefulTakeaway ? <div className="research-library-next-step research-library-next-step--featured"><span className="research-library-next-step-mark" aria-hidden="true">+</span><div><h4>오늘 연결해 보기</h4><p>{metadata.hopefulTakeaway}</p></div></div> : null}
      {claim.id === 'research-powers-2008' ? <p className="research-library-scope" role="note"><strong>이 연구가 보여주는 범위</strong>GABA 3g을 먹고 90분 동안 혈액 속 수치를 살펴본 자료예요. 성장이나 근육 발달 효과를 확인한 연구는 아니며, 연구에 사용한 3g은 셀핀다 제품 섭취량의 근거가 아니에요.</p> : null}
      <details className="research-detail" onToggle={event => {
        if (event.currentTarget.open) onOpen?.(claim.id);
      }}>
        <summary>이 연구, 어떻게 했나요?</summary>
        <div className="research-library-detail">
          <p className="research-library-study-scope"><strong>연구에서 살펴본 조건</strong><span>{detailScope}</span></p>
          {metadata.consumerContext ? <p className="research-library-detail-context"><Info size={17} aria-hidden="true"/><span>{metadata.consumerContext}</span></p> : null}
          {metadata.consumerDetail ? <p className="research-library-detail-finding"><strong>측정 결과</strong>{metadata.consumerDetail}</p> : !metadata.consumerVisual && metadata.consumerFinding && metadata.consumerFinding !== takeaway ? <p className="research-library-detail-finding"><strong>연구에서 기록한 결과</strong>{metadata.consumerFinding}</p> : null}
          <div className="research-story-grid" aria-label="연구 정보 그림 요약">
            <div className="research-story-card"><UsersRound size={21} aria-hidden="true"/><h4>누가 참여했나요?</h4><p>{metadata.population || metadata.sampleSize || '연구에 나온 참여자 정보'}</p></div>
            <div className="research-story-card"><FlaskConical size={21} aria-hidden="true"/><h4>무엇을 했나요?</h4><p>{compactStudyType(metadata.studyType)}{metadata.duration ? ` · ${metadata.duration}` : ''}</p></div>
            <div className="research-story-card"><Activity size={21} aria-hidden="true"/><h4>무엇을 살펴봤나요?</h4><p>{metadata.outcome || metadata.consumerScope || '연구에서 살펴본 항목'}</p></div>
            {metadata.comparison?<div className="research-story-card"><Clock3 size={21} aria-hidden="true"/><h4>무엇과 비교했나요?</h4><p>{metadata.comparison}</p></div>:null}
          </div>
          {!featured && metadata.hopefulTakeaway ? <div className="research-library-next-step"><span className="research-library-next-step-mark" aria-hidden="true">+</span><div><h4>다음에 해볼 일</h4><p>{metadata.hopefulTakeaway}</p></div></div> : null}
        </div>
        <div className="research-library-sources"><h4>출처와 연구 배경</h4>{claim.reviewedAt ? <p className="research-library-provenance">자료를 확인한 날짜 {claim.reviewedAt}</p> : null}{claim.sources.filter(source => isPublicUrl(source.url)).map(source =>
          <div className="research-library-source" key={`${source.url}-${source.title}`}><p>{source.title}</p><a href={source.url!} target="_blank" rel="noopener noreferrer">{source.title.includes('저자 소속') ? '저자 소속 보기' : source.url!.includes('pmc.ncbi.nlm.nih.gov') ? '논문 원문 보기' : '논문 정보 보기'} <span aria-label="새 창">↗</span></a></div>,
        )}</div>
      </details>
      <button type="button" className="text-link research-copy" aria-label="이 연구를 바로 여는 링크 복사" onClick={()=>copyStudy(claim.id)}><Share2 size={15} aria-hidden="true"/>이 연구 공유</button>
    </article>;
  }

  return <section id="research" className="section wrap research research-library" aria-label="연구를 쉬운 말로 보기">
    <div className="section-head research-library-head"><div><h2 id="research-title">{sectionTitle}</h2><p>각 카드에서 사람 연구의 결과와 조건을 함께 볼 수 있어요.</p></div></div>
    <p className="research-library-evidence-note"><strong>먼저 확인해 주세요</strong>일반 GABA와 휴식에 관한 사람 연구를 쉬운 말로 정리했어요. 카드 안에서 논문 조건을 확인하고, 셀핀다 제품 정보는 제품 카드에서 따로 확인할 수 있어요.</p>
    <div className="research-topic-cards" role="group" aria-label="궁금한 주제 고르기">{topicCards.map(({topic:cardTopic,label,detail,Icon})=>{
      const recordCount=`${studies.filter(claim=>claim.topic===cardTopic).length}건`;
      return <button type="button" className="research-topic-card" key={cardTopic} aria-label={`${label} · ${detail} · ${recordCount}`} aria-pressed={activeTopic===cardTopic} onClick={()=>{
        const nextTopic = activeTopic === cardTopic ? '' : cardTopic;
        setQuery(''); setStudyType(''); setTopic(nextTopic);
        if (browseRef.current) { browseRef.current.open=true; browseRef.current.scrollIntoView({block:'start',behavior:'smooth'}); }
      }}><Icon size={20} strokeWidth={1.8} aria-hidden="true"/><span><strong>{label}</strong><small>{detail}</small></span><b>{recordCount}</b></button>;
    })}</div>
    {featuredStudy ? renderStudy(featuredStudy, true) : null}
    <details className="research-library-browse" id="research-library-browse" ref={browseRef}>
      <summary><span><Search size={18} aria-hidden="true"/> 주제별로 다른 연구 찾기</span><small>{Math.max(0, visibleStudies.length - 1)}편 더 보기</small></summary>
      {studies.length > 0 ? <>
      <div className="research-library-controls" role="search" aria-label="연구를 주제별로 찾기">
        <label htmlFor="research-search">궁금한 내용 찾기<input id="research-search" type="search" aria-label="연구 내용 검색" value={query} onChange={event => setQuery(event.target.value)} placeholder="잠·스트레스·뇌파·운동으로 찾아보세요" aria-describedby="research-search-help" /></label>
        <label htmlFor="research-topic">주제 고르기<select id="research-topic" value={activeTopic} onChange={event => setTopic(event.target.value)}><option value="">모든 주제</option>{topics.map(item => <option value={item} key={item}>{item}</option>)}</select></label>
        <details className="research-method-filter" open={showMethodFilter || Boolean(activeType)} onToggle={event => setShowMethodFilter(event.currentTarget.open)}>
          <summary>연구 방법 {activeType ? '선택됨' : '더보기'}</summary>
          <label htmlFor="research-type">어떻게 살펴봤나요?<select id="research-type" value={activeType} onChange={event => setStudyType(event.target.value)}><option value="">모든 연구</option>{studyTypes.map(type => <option value={type} key={type}>{compactStudyType(type)}</option>)}</select></label>
        </details>
        <button type="button" className="text-link" disabled={!query && !activeTopic && !activeType} onClick={() => { setQuery(''); setTopic(''); setStudyType(''); }}>검색 지우기</button>
      </div>
      <p id="research-search-help" className="sr-only">잠, 스트레스, 뇌파, 운동과 같은 주제를 입력하면 관련 연구를 찾습니다.</p>
      <p className="research-library-count" role="status" aria-live="polite">연구 <span>{visibleStudies.length}</span>건 / 전체 {studies.length}건</p>
      {visibleStudies.length === 0 ? <p className="research-library-empty">찾는 연구가 없어요. 다른 주제를 골라 보세요.</p> : remainingStudies.map(claim => renderStudy(claim))}
      </> : null}
    </details>
    <p role="status" aria-live="polite">{linkStatus}</p>
    {manualLink?<label>연구 공유 링크<input className="research-manual-link" value={manualLink} readOnly onFocus={event=>event.target.select()}/></label>:null}
  </section>;
}
