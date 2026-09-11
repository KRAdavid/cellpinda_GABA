import type {Claim} from './ResearchLibrary';

export default function GabaStory({claims}:{claims:Claim[]}) {
  const definition=claims.find(claim=>claim.id==='gaba-definition'&&claim.status==='approved'&&claim.publicText);
  const studies=claims.filter(claim=>claim.id.startsWith('research-')&&claim.status==='approved'&&claim.publicText&&claim.metadata?.productApplicability);
  return <section id="story" className="section sage"><div className="wrap">
    <div className="section-head"><div><p className="chapter">01 / GABA 이야기</p><h2>GABA,<br/>신호의 균형을 이해하다.</h2></div><p>몸 안에서의 역할부터 먹는 GABA의 연구까지.<br/>서로 다른 질문을 하나씩 살펴봅니다.</p></div>
    <div className="story-steps">
      <article><span>1</span><div><h3>먼저, 이름을 알아볼까요?</h3>{definition?<p>{definition.publicText}</p>:<p role="status">GABA 기본 자료를 확인하고 있습니다.</p>}</div></article>
      <article><span>2</span><div><h3>몸 안의 역할과 섭취 연구</h3><p>몸 안에서 어떤 일을 하는지와, 먹었을 때 무엇이 관찰됐는지는 나누어 살펴봅니다.</p><a className="text-link" href="#research">섭취 연구 살펴보기 →</a></div></article>
      <article><span>3</span><div><h3>내가 선택할 제품은?</h3><p>연구에 사용한 제품·용량·기간과 판매 제품의 표시사항을 각각 확인해 보세요.</p><a className="text-link" href="#products">셀핀다 제품 구성 보기 →</a></div></article>
    </div>
    {definition?.sources.filter(source=>source.url?.startsWith('https://')).map(source=><a className="text-link" key={source.url} href={source.url!} target="_blank" rel="noopener noreferrer">{source.title} 원문 ↗</a>)}
    <div className="story-questions" style={{marginTop:48}}><h3>읽다가 떠오르는 질문</h3>
      <details className="claim"><summary>리듬 체크로 GABA가 필요한지 알 수 있나요?</summary><div><p>체크는 지난 하루의 생활 습관을 돌아보는 경험입니다. 체내 GABA 수치나 제품 필요성을 측정하지 않으며 결과로 제품·섭취량을 권하지 않습니다.</p><a className="text-link" href="#rhythm">체크 문항 살펴보기 →</a></div></details>
      <details className="claim"><summary>연구 결과를 셀핀다 제품의 효과로 읽어도 되나요?</summary><div><p>연구 대상 제품과 조건부터 확인해 주세요. 각 자료에 셀핀다 완제품 적용 범위를 함께 표시했습니다.</p>{studies.map(claim=><p key={claim.id}><a className="text-link" href={`#${claim.id}`}>{claim.topic} →</a><br/>{claim.metadata!.productApplicability}</p>)}</div></details>
      <details className="claim"><summary>제품을 선택하기 전에 무엇을 확인하면 좋을까요?</summary><div><p>1포 내용량과 구성, 실제 제품 표시사항을 확인하고, 다른 사람의 사용 경험은 원문 맥락과 함께 살펴보세요.</p><a className="text-link" href="#products">제품 비교 →</a> · <a className="text-link" href="#reviews">사용 경험 →</a></div></details>
    </div>
  </div></section>;
}
