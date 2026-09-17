import type {Claim} from './ResearchLibrary';
import {REVIEW_DESTINATION_URL} from '../domain/reviews';

export default function GabaStory({claims, hasReviews = false}:{claims:Claim[]; hasReviews?: boolean}) {
  const definition=claims.find(claim=>claim.id==='gaba-definition'&&claim.status==='approved'&&claim.publicText);
  const studies=claims.filter(claim=>claim.id.startsWith('research-')&&claim.status==='approved'&&claim.publicText&&claim.metadata?.productApplicability);
  const highlights=[
    {id:'research-yoto-2012',label:'스트레스 상황'},
    {id:'research-byun-2018',label:'잠드는 시간'},
    {id:'research-sakashita-2019',label:'운동과 근육'},
  ];
  return <section id="story" className="section sage"><div className="wrap">
    <div className="section-head"><div><p className="chapter">01 / GABA 이야기</p><h2>GABA,<br/>뇌의 신경 신호를 조절하는 물질.</h2></div><p>몸속에서 어떤 일을 하는지, 먹었을 때 사람을 대상으로 무엇을 살펴봤는지.<br/>어려운 말 없이 차례로 확인해 보세요.</p></div>
    <div className="story-steps">
      <article><span>1</span><div><h3>GABA가 뭔가요?</h3>{definition?<p>{definition.publicText}</p>:<p>GABA는 뇌에서 신경 신호의 강도를 조절하는 데 관여하는 물질이에요.</p>}</div></article>
      <article><span>2</span><div><h3>몸속 역할과 사람 대상 연구</h3><p>GABA는 뇌의 신경 신호 강도를 조절하는 데 관여하는 물질이에요. 몸속에서의 역할과, 먹었을 때 사람을 대상으로 무엇을 살펴봤는지 차례로 읽어봅니다.</p><p className="story-analogy"><strong>자동차가 계속 가속만 하면 오래 달리기 어렵듯이,</strong> 뇌도 신호를 켜고 낮추는 일이 함께 필요해요. GABA는 신경 신호를 낮추는 쪽에 관여합니다.</p><div className="story-research-summary"><div className="story-summary-grid"><div className="story-summary-card"><p className="story-summary-kicker">몸속에서는</p><h4>뇌의 신호를 조절해요</h4><p>신경 신호의 강도를 조절하는 데 관여합니다. 1분 체크는 오늘 생활에서 쉬어야 할 장면을 찾는 도구예요.</p></div><div className="story-summary-card"><p className="story-summary-kicker">사람을 대상으로 한 연구에서는</p><ul>{highlights.map(highlight=>{const claim=studies.find(item=>item.id===highlight.id);return claim?.metadata?.consumerSummary?<li key={highlight.id}><strong>{highlight.label}</strong><span>{claim.metadata.consumerSummary}</span></li>:null})}</ul></div></div><p className="story-summary-note">연구마다 참여한 사람·먹은 양·기간이 달라요. 한 문장 요약과 제품 표시를 따로 확인해 보세요.</p></div></div></article>
      <article><span>3</span><div><h3>제품 표시 확인하기</h3><p>연구에서 무엇을 살펴봤는지 이해했다면, 판매 제품의 내용량·포장 구성·표시사항을 확인해 보세요.</p><a className="text-link" href="#products">제품 구성·표시 보기 →</a></div></article>
    </div>
    {definition?.sources.filter(source=>source.url?.startsWith('https://')).map(source=><a className="text-link" key={source.url} href={source.url!} target="_blank" rel="noopener noreferrer">{source.title} 원문 ↗</a>)}
    <div className="story-questions" style={{marginTop:48}}><h3>읽다가 떠오르는 질문</h3>
      <details className="claim"><summary>1분 체크 결과는 어떻게 활용하나요?</summary><div><p>잠들기 어렵거나 쉬는 시간이 부족했다면 오늘 5~10분을 먼저 비워 보세요. GABA는 뇌의 신경 신호를 조절하는 물질로 설명됩니다.</p><a className="text-link" href="#rhythm">오늘 해볼 일 다시 보기 →</a></div></details>
      <details className="claim"><summary>연구 내용과 제품 정보는 어떻게 비교하나요?</summary><div><p>먼저 연구에 참여한 사람, 먹은 양, 기간, 무엇을 확인했는지를 보세요. 각 연구 카드는 쉬운 말과 도표로 정리해 두었습니다. 그다음 셀핀다 제품의 내용량과 표시사항을 따로 확인하면 됩니다.</p><a className="text-link" href="#research">연구 카드에서 쉽게 보기 →</a></div></details>
      <details className="claim"><summary>제품을 선택하기 전에 무엇을 확인하면 좋을까요?</summary><div><p>1포 내용량과 구성, 실제 제품 표시사항을 확인하고, 다른 사람의 사용 경험은 원문 맥락과 함께 살펴보세요.</p><a className="text-link" href="#products">제품 구성 확인 →</a>{hasReviews ? <> · <a className="text-link" href={REVIEW_DESTINATION_URL} target="_blank" rel="noopener noreferrer">스마트스토어 후기 읽기 ↗</a></> : null}</div></details>
    </div>
  </div></section>;
}
