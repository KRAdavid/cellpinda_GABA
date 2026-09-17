import {ArrowRight, ArrowUpRight, Brain, Clock3, Dumbbell, Moon, Pill, ScanFace, UsersRound} from 'lucide-react';
import type {Claim} from './ResearchLibrary';
import StudyInsightVisual from './StudyInsightVisual';
import './GabaEvidenceHighlights.css';

type StudyCard = {id:string; title:string; topic:string; number:string};
type Chapter = {id:string; number:string; title:string; icon:typeof Moon; studies:StudyCard[]};

const chapters:Chapter[]=[
  {id:'sleep',number:'01',title:'잠드는 데 걸린 시간',icon:Moon,studies:[
    {id:'research-yamatsu-2016',title:'잠드는 시간 · 잠든 모습',topic:'잠',number:'2016'},
    {id:'research-byun-2018',title:'잠드는 시간 · 잠든 비율',topic:'수면',number:'2018'},
    {id:'research-yoon-2022',title:'잠드는 시간',topic:'수면',number:'2022'},
  ]},
  {id:'mental-task',number:'02',title:'생각을 많이 쓴 뒤',icon:Brain,studies:[
    {id:'research-yoto-2012',title:'생각을 많이 쓴 뒤에도 뇌파·활력 점수가 더 잘 유지됐어요',topic:'생각을 많이 쓴 과제',number:'2012'},
  ]},
  {id:'brain-observation',number:'03',title:'뇌 속 GABA와 손끝 연습',icon:ScanFace,studies:[
    {id:'research-heba-2016',title:'45분 손끝 연습 뒤, 구분 점수가 평균 12% 올랐어요',topic:'손끝 연습',number:'2016'},
  ]},
  {id:'exercise',number:'04',title:'운동 뒤 몸에서 살펴본 변화',icon:Dumbbell,studies:[
    {id:'research-powers-2008',title:'운동 뒤 혈액에서 본 성장호르몬',topic:'운동',number:'2008'},
    {id:'research-sakashita-2019',title:'12주 운동 뒤 몸무게 변화',topic:'운동',number:'2019'},
  ]},
];

const publicAsset=(path:string)=>`${import.meta.env.BASE_URL}${path}`;
const publicSource=(claim:Claim)=>claim.sources.find(source=>source.url?.startsWith('https://'));

const factsFor=(claim:Claim)=>[
  {label:'참여한 사람',value:claim.metadata?.sampleSize,Icon:UsersRound},
  {label:'연구에서 먹은 양',value:claim.metadata?.dose,Icon:Pill},
  {label:'기간',value:claim.metadata?.duration,Icon:Clock3},
].filter((item):item is {label:string;value:string;Icon:typeof UsersRound}=>Boolean(item.value));

function StudyResult({study,claim}:{study:StudyCard;claim:Claim}){
  const metadata=claim.metadata!;
  if(!metadata.consumerVisual)return null;
  return <article className="gaba-study-result" id={`finding-${study.id}`}>
    <div className="gaba-study-meta"><span>{study.topic}</span><time>{study.number}</time></div>
    <h4>{study.title}</h4>
    <StudyInsightVisual visual={metadata.consumerVisual}/>
    <dl className="gaba-study-facts">{factsFor(claim).map(({label,value,Icon})=><div key={label} title={`${label}: ${value}`}><Icon size={17} strokeWidth={1.7} aria-hidden="true"/><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
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
          <h2 id="gaba-evidence-title">GABA 사람 연구에서<br/>살펴본 내용.</h2>
          <div className="gaba-evidence-count"><strong>{count}</strong><span>개 연구</span><ArrowRight size={16} aria-hidden="true"/><strong>{available.length}</strong><span>가지 주제</span></div>
        </div>
      </div>
      <div className="gaba-evidence-boundary" aria-label="연구와 제품 정보 구분">
        <span><Pill size={18} aria-hidden="true"/><b>연구에 나온 GABA</b></span><ArrowRight size={18} aria-hidden="true"/><span><UsersRound size={18} aria-hidden="true"/><b>연구 참여자</b></span><i/>
        <small>연구에 나온 내용과 셀핀다 제품 정보는 따로 확인해요 · 제품 포장 보기</small>
      </div>
      <div className="gaba-evidence-chapters">
        {available.map(chapter=>{
          const Icon=chapter.icon;
          return <section className={`gaba-evidence-chapter gaba-evidence-chapter--${chapter.id}`} key={chapter.id} aria-labelledby={`gaba-chapter-${chapter.id}`}>
            <header className="gaba-evidence-chapter-head"><Icon size={26} strokeWidth={1.55} aria-hidden="true"/><h3 id={`gaba-chapter-${chapter.id}`}>{chapter.title}</h3></header>
            <div className="gaba-evidence-grid">{chapter.studies.map(study=>{
              const claim=byId.get(study.id);
              return claim?<StudyResult study={study} claim={claim} key={study.id}/>:null;
            })}</div>
            {chapter.id==='exercise'?<p className="gaba-exercise-boundary"><Dumbbell size={17} aria-hidden="true"/><span>성장호르몬과 몸무게는 <strong>각기 다른 연구에서 살펴봤어요.</strong></span></p>:null}
          </section>;
        })}
      </div>
      <a className="gaba-evidence-all" href="#research" onClick={()=>onOpen?.('research-library')}>다른 연구도 더 살펴보기 <ArrowUpRight size={17} aria-hidden="true"/></a>
    </div>
  </section>;
}
