import type {Claim} from './ResearchLibrary';

export default function GabaStory({claims}:{claims:Claim[]}) {
  const definition=claims.find(claim=>claim.id==='gaba-definition'&&claim.status==='approved'&&claim.publicText);
  const studies=claims.filter(claim=>claim.id.startsWith('research-')&&claim.status==='approved'&&claim.publicText&&claim.metadata?.productApplicability);
  const highlights=[
    {id:'research-yoto-2012',label:'스트레스 상황'},
    {id:'research-byun-2018',label:'잠드는 시간'},
    {id:'research-sakashita-2019',label:'운동과 근육'},
  ];
  return <section id="story" className="section sage"><div className="wrap">
    <div className="section-head"><div><p className="chapter">01 / GABA 이야기</p><h2>GABA,<br/>신호의 균형을 이해하다.</h2></div><p>몸 안에서의 역할부터 먹는 GABA의 연구까지.<br/>서로 다른 질문을 하나씩 살펴봅니다.</p></div>
    <div className="story-steps">
      <article><span>1</span><div><h3>먼저, 이름을 알아볼까요?</h3>{definition?<p>{definition.publicText}</p>:<p role="status">GABA 기본 자료를 확인하고 있습니다.</p>}</div></article>
      <article><span>2</span><div><h3>몸 안의 GABA와 섭취 연구</h3><p>GABA는 뇌의 신경 신호 강도를 조절하는 데 관여하는 물질이에요. 몸 안의 역할과, 먹었을 때 사람을 살펴본 연구를 차례로 읽어봅니다.</p><p className="story-analogy"><strong>가속페달만으로는 편안하게 운전할 수 없듯이,</strong> 신경 신호도 켜고 낮추는 균형이 필요해요. GABA는 신경 신호를 조절하는 쪽에 관여합니다.</p><div className="story-research-summary"><div className="story-summary-grid"><div className="story-summary-card"><p className="story-summary-kicker">몸 안에서는</p><h4>신경 신호를 조절해요</h4><p>신경 신호의 강도를 조절하는 데 관여합니다. 1분 체크는 지금의 긴장·휴식 신호를 살펴보는 도구예요.</p></div><div className="story-summary-card"><p className="story-summary-kicker">사람 대상 섭취 연구에서는</p><ul>{highlights.map(highlight=>{const claim=studies.find(item=>item.id===highlight.id);return claim?.metadata?.consumerSummary?<li key={highlight.id}><strong>{highlight.label}</strong><span>{claim.metadata.consumerSummary}</span></li>:null})}</ul></div></div><p className="story-summary-note">연구마다 사람·제품·섭취량·기간을 다르게 살펴봐요. 연구 카드에서 조건을 확인하고 제품 정보와 함께 비교해 보세요.</p></div></div></article>
      <article><span>3</span><div><h3>셀핀다 구성 확인하기</h3><p>연구 내용을 이해했다면, 이제 판매 제품의 구성과 표시사항을 천천히 살펴보세요.</p><a className="text-link" href="#products">제품 구성·표시사항 보기 →</a></div></article>
    </div>
    {definition?.sources.filter(source=>source.url?.startsWith('https://')).map(source=><a className="text-link" key={source.url} href={source.url!} target="_blank" rel="noopener noreferrer">{source.title} 원문 ↗</a>)}
    <div className="story-questions" style={{marginTop:48}}><h3>읽다가 떠오르는 질문</h3>
      <details className="claim"><summary>리듬 체크 결과는 어떻게 활용하나요?</summary><div><p>체크에서 긴장·잠·휴식 신호가 겹쳤다면 오늘은 적극적인 휴식 루틴을 시작해 보세요. GABA는 뇌의 신경 신호를 조절해 안정과 관련된 물질로 설명됩니다.</p><a className="text-link" href="#rhythm">회복 초점 다시 확인하기 →</a></div></details>
      <details className="claim"><summary>연구 결과를 셀핀다 제품 정보와 어떻게 비교하나요?</summary><div><p>먼저 연구에서 누구를 대상으로 무엇을 비교했는지 확인해 보세요. 각 연구 카드의 핵심 범위는 짧게, 수치와 제품 적용 문장은 펼쳐서 안내합니다.</p><a className="text-link" href="#research">연구 카드에서 조건 확인 →</a></div></details>
      <details className="claim"><summary>제품을 선택하기 전에 무엇을 확인하면 좋을까요?</summary><div><p>1포 내용량과 구성, 실제 제품 표시사항을 확인하고, 다른 사람의 사용 경험은 원문 맥락과 함께 살펴보세요.</p><a className="text-link" href="#products">제품 구성 확인 →</a> · <a className="text-link" href="#reviews">사용 경험 →</a></div></details>
    </div>
  </div></section>;
}
