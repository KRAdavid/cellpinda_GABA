import {Activity, ArrowUpRight, Brain, Clock3, Dumbbell, Moon, ScanFace, UsersRound} from 'lucide-react';
import type {Claim, ConsumerVisual} from './ResearchLibrary';
import './GabaEvidenceHighlights.css';

type StudyCard = {id:string; title:string; topic:string; number:string};
type Chapter = {id:string; number:string; title:string; description:string; icon:typeof Moon; studies:StudyCard[]};

const chapters:Chapter[]=[
  {id:'sleep',number:'01',title:'잠드는 시간과 수면',description:'잠이 불편한 성인을 대상으로 잠드는 시간과 수면 단계를 살펴봤어요.',icon:Moon,studies:[
    {id:'research-yamatsu-2016',title:'잠드는 시간·비REM 수면',topic:'수면',number:'2016'},
    {id:'research-byun-2018',title:'잠들기까지 걸린 시간',topic:'수면',number:'2018'},
    {id:'research-yoon-2022',title:'잠들기까지 걸린 시간',topic:'수면',number:'2022'},
  ]},
  {id:'mental-task',number:'02',title:'바쁜 과제 중 뇌파',description:'정신 과제를 하는 동안 뇌파와 기분 설문을 확인한 연구예요.',icon:Brain,studies:[
    {id:'research-yoto-2012',title:'과제 중 뇌파·기분 설문',topic:'정신 과제',number:'2012'},
  ]},
  {id:'brain-observation',number:'03',title:'뇌 신호와 감각 학습',description:'뇌의 GABA+ 신호와 반복된 감각 과제 수행을 함께 관찰했어요.',icon:ScanFace,studies:[
    {id:'research-heba-2016',title:'뇌 신호·촉각 학습 관찰',topic:'뇌 영상 관찰',number:'2016'},
  ]},
  {id:'exercise',number:'04',title:'운동 중 호르몬·제지방량',description:'혈중 호르몬과 운동에 따른 몸의 수치를 따로 살펴본 연구예요.',icon:Dumbbell,studies:[
    {id:'research-powers-2008',title:'혈중 성장호르몬 수치',topic:'운동 · 단회 섭취',number:'2008'},
    {id:'research-sakashita-2019',title:'제지방량 변화',topic:'운동 · 12주',number:'2019'},
  ]},
];

const publicAsset=(path:string)=>`${import.meta.env.BASE_URL}${path}`;
const publicSource=(claim:Claim)=>claim.sources.find(source=>source.url?.startsWith('https://'));
const factsFor=(claim:Claim)=>[
  ['참여',claim.metadata?.sampleSize],
  ['섭취량',claim.metadata?.dose],
  ['기간',claim.metadata?.duration],
].filter((item):item is [string,string]=>Boolean(item[1]));

function ResearchVisual({visual}:{visual:ConsumerVisual}){
  if(visual.kind==='before-after'){
    const max=Math.max(visual.scaleMax,visual.beforeValue,visual.afterValue);
    return <figure className="gaba-visual gaba-visual--bars" aria-label={`${visual.seriesLabel}, ${visual.metric}: ${visual.beforeLabel} ${visual.beforeValue}${visual.unit}, ${visual.afterLabel} ${visual.afterValue}${visual.unit}`}>
      <figcaption><Activity size={16} aria-hidden="true"/>{visual.metric}<span>{visual.seriesLabel}</span></figcaption>
      {[{label:visual.beforeLabel,value:visual.beforeValue,spread:visual.beforeSd},{label:visual.afterLabel,value:visual.afterValue,spread:visual.afterSd}].map((point,index)=><div className={`gaba-bar-row${index===1?' is-after':''}`} key={point.label}>
        <span>{point.label}</span><div className="gaba-bar-track"><i style={{width:`${Math.max(point.value/max*100,5)}%`}}/></div><strong>{point.value.toLocaleString('ko-KR')}{point.spread?`±${point.spread}`:''}{visual.unit}</strong>
      </div>)}
      <small className="gaba-chart-scale">막대 길이는 평균값에 비례해요. 표시값은 평균±표준편차입니다.</small>
    </figure>;
  }
  if(visual.kind==='metric-pair')return <figure className="gaba-visual gaba-visual--pair" aria-label={`${visual.participantLabel}: ${visual.metrics.map(metric=>`${metric.label} ${metric.value}${metric.unit}`).join(', ')}`}>
    <figcaption><Moon size={16} aria-hidden="true"/>연구에서 기록한 두 가지 변화</figcaption>
    <div className="gaba-pair-grid">{visual.metrics.map(metric=><div className="gaba-pair-metric" key={metric.label}><span>{metric.label}</span><strong>{metric.value}<small>{metric.unit}</small></strong><em>{metric.comparison}</em></div>)}</div>
    <small className="gaba-chart-scale">{visual.participantLabel}</small>
  </figure>;
  if(visual.kind==='study-journey')return <figure className="gaba-visual gaba-visual--journey" aria-label={`${visual.participantLabel}. ${visual.steps.join(' 다음 ')}`}>
    <figcaption><Brain size={16} aria-hidden="true"/>{visual.participantLabel} · {visual.comparisonLabel}</figcaption>
    <ol>{visual.steps.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,'0')}</span><strong>{step}</strong></li>)}</ol>
    <p>관찰 결과: 정신 과제에 따른 뇌파 변화와 기분 설문을 기록했어요.</p>
  </figure>;
  if(visual.kind==='observational-link')return <figure className="gaba-visual gaba-visual--link" aria-label={`${visual.participantLabel}, ${visual.studyLabel}: ${visual.leftLabel}와 ${visual.rightLabel}의 관계를 관찰`}>
    <figcaption><ScanFace size={16} aria-hidden="true"/>{visual.participantLabel} · {visual.studyLabel}</figcaption>
    <div className="gaba-link-diagram"><span>{visual.leftLabel}</span><i aria-hidden="true"/><span>{visual.rightLabel}</span></div>
    <small className="gaba-chart-scale">{visual.boundaryLabel}</small>
  </figure>;
  if(visual.kind==='ratio'){
    const max=Math.max(visual.observed,visual.baseline);
    return <figure className="gaba-visual gaba-visual--ratio" aria-label={`${visual.metric}: ${visual.comparisonLabel}, 위약 기준 ${visual.baseline}${visual.unit}, GABA 조건 ${visual.observed}${visual.unit}`}>
      <figcaption><Activity size={16} aria-hidden="true"/>{visual.metric}<span>{visual.comparisonLabel}</span></figcaption>
      {[{label:'위약 조건',value:visual.baseline},{label:'GABA 조건',value:visual.observed}].map((point,index)=><div className={`gaba-bar-row${index===1?' is-after':''}`} key={point.label}>
        <span>{point.label}</span><div className="gaba-bar-track"><i style={{width:`${point.value/max*100}%`}}/></div><strong>{point.value}{visual.unit}</strong>
      </div>)}
      <small className="gaba-chart-scale">{visual.participantLabel} · {visual.doseLabel}</small>
    </figure>;
  }
  const max=Math.max(visual.scaleMax,...visual.groups.map(group=>group.value));
  return <figure className="gaba-visual gaba-visual--groups" aria-label={`${visual.metric}: ${visual.groups.map(group=>`${group.label} ${group.value}${visual.unit}`).join(', ')}`}>
    <figcaption><Dumbbell size={16} aria-hidden="true"/>{visual.metric}<span>{visual.participantLabel}</span></figcaption>
    {visual.groups.map((group,index)=><div className={`gaba-bar-row${index===1?' is-after':''}`} key={group.label}>
      <span>{group.label}</span><div className="gaba-bar-track"><i style={{width:`${Math.max(group.value/max*100,4)}%`}}/></div><strong>{group.value.toLocaleString('ko-KR')}{visual.unit}</strong>
    </div>)}
    <small className="gaba-chart-scale">막대는 연구에서 보고된 평균 변화예요. 개인의 변화를 예측하지 않습니다.</small>
  </figure>;
}

function StudyResult({study,claim}:{study:StudyCard;claim:Claim}){
  const metadata=claim.metadata!;
  const source=publicSource(claim);
  if(!metadata.consumerFinding||!metadata.consumerVisual)return null;
  return <article className="gaba-study-result" id={`finding-${study.id}`}>
    <div className="gaba-study-meta"><span>{study.topic}</span><time>{study.number}</time></div>
    <h4>{study.title}</h4>
    <p className="gaba-study-finding">{metadata.consumerFinding}</p>
    <ResearchVisual visual={metadata.consumerVisual}/>
    <dl className="gaba-study-facts">{factsFor(claim).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    {source?<a className="gaba-study-source" href={source.url!} target="_blank" rel="noopener noreferrer">{source.title}<ArrowUpRight size={15} aria-hidden="true"/></a>:null}
  </article>;
}

type Props={claims:Claim[];onOpen?:(claimId:string)=>void};

export default function GabaEvidenceHighlights({claims,onOpen}:Props){
  const byId=new Map(claims.filter(claim=>claim.status==='approved').map(claim=>[claim.id,claim]));
  const available=chapters.map(chapter=>({...chapter,studies:chapter.studies.filter(study=>{
    const claim=byId.get(study.id);
    return Boolean(claim?.metadata?.consumerFinding&&claim.metadata.consumerVisual&&publicSource(claim));
  })})).filter(chapter=>chapter.studies.length);
  if(!available.length)return null;
  const count=available.reduce((sum,chapter)=>sum+chapter.studies.length,0);
  return <section id="gaba-evidence" className="section gaba-evidence" aria-labelledby="gaba-evidence-title">
    <div className="wrap">
      <div className="gaba-evidence-cover">
        <img src={publicAsset('assets/gaba-research-evening.png')} alt="저녁 창가에서 잠시 쉬며 하루를 돌아보는 40대 여성" loading="lazy"/>
        <div className="gaba-evidence-cover-copy">
          <p className="chapter">GABA RESEARCH · 연구 결과 한눈에</p>
          <h2 id="gaba-evidence-title">논문에서 관찰한<br/>변화를 바로 읽어보세요.</h2>
          <p>수면·정신 과제·운동 연구에서 실제로 측정한 내용을<br/>생활에서 쓰는 말과 그림으로 정리했습니다.</p>
          <div className="gaba-evidence-count"><strong>{count}</strong><span>개 연구 결과</span><span className="gaba-evidence-count-divider" aria-hidden="true"/><span>참여자 · 섭취량 · 기간 함께 표시</span></div>
        </div>
      </div>
      <div className="gaba-evidence-boundary"><span aria-hidden="true">i</span><p><strong>아래 수치는 각 논문에 참여한 사람에게서 나온 결과입니다.</strong> 연구마다 사용한 원료·양·기간이 다르며, 셀핀다 완제품의 시험 결과나 섭취 안내를 뜻하지 않습니다. 제품 정보는 포장 표시에서 확인해 주세요.</p></div>
      <div className="gaba-evidence-chapters">
        {available.map(chapter=>{
          const Icon=chapter.icon;
          return <section className={`gaba-evidence-chapter gaba-evidence-chapter--${chapter.id}`} key={chapter.id} aria-labelledby={`gaba-chapter-${chapter.id}`}>
            <header className="gaba-evidence-chapter-head"><span className="gaba-chapter-number">{chapter.number}</span><Icon size={24} strokeWidth={1.65} aria-hidden="true"/><div><h3 id={`gaba-chapter-${chapter.id}`}>{chapter.title}</h3><p>{chapter.description}</p></div></header>
            <div className="gaba-evidence-grid">{chapter.studies.map(study=>{
              const claim=byId.get(study.id);
              return claim?<StudyResult study={study} claim={claim} key={study.id}/>:null;
            })}</div>
            {chapter.id==='exercise'?<p className="gaba-exercise-boundary"><Dumbbell size={17} aria-hidden="true"/><span><strong>운동 연구 읽는 법:</strong> 혈중 호르몬 수치와 근육량은 서로 다른 측정 결과예요. 연구에 사용한 양은 제품의 섭취 안내가 아닙니다.</span></p>:null}
          </section>;
        })}
      </div>
      <a className="gaba-evidence-all" href="#research" onClick={()=>onOpen?.('research-library')}>더 많은 연구의 질문과 조건 보기 <ArrowUpRight size={17} aria-hidden="true"/></a>
    </div>
  </section>;
}
