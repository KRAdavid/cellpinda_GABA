import type {Claim} from './ResearchLibrary';
import {REVIEW_DESTINATION_URL} from '../domain/reviews';

export default function GabaStory({claims, hasReviews = false}:{claims:Claim[]; hasReviews?: boolean}) {
  const definition=claims.find(claim=>claim.id==='gaba-definition'&&claim.status==='approved'&&claim.publicText);
  const studies=claims.filter(claim=>claim.id.startsWith('research-')&&claim.status==='approved'&&claim.publicText&&claim.metadata?.productApplicability);
  const highlights=[
    {id:'research-yoto-2012',label:'생각을 많이 쓴 뒤'},
    {id:'research-byun-2018',label:'잠드는 시간'},
    {id:'research-sakashita-2019',label:'운동과 몸무게 변화'},
  ];
  return <section id="story" className="section sage"><div className="wrap">
    <div className="section-head"><div><p className="chapter">01 / GABA 이야기</p><h2>GABA는<br/>뇌세포끼리 신호를 주고받을 때 쓰여요.</h2></div><p>몸속에서 하는 일과 사람 연구에서 살펴본 내용을<br/>그림과 쉬운 말로 확인해 보세요.</p></div>
    <div className="story-steps">
      <article><span>1</span><div><h3>GABA가 뭔가요?</h3>{definition?<p>{definition.publicText}</p>:<p>GABA는 뇌세포 사이에서 신호를 주고받는 과정에 관여하는 물질이에요.</p>}</div></article>
      <article><span>2</span><div><h3>사람 연구에서는 무엇을 살펴봤나요?</h3><p>사람이 GABA를 먹은 뒤 잠드는 시간, 긴장되는 상황에서의 뇌파, 운동 뒤 몸의 변화 등을 살펴본 연구가 있어요.</p><div className="story-research-summary"><div className="story-summary-grid"><div className="story-summary-card"><p className="story-summary-kicker">몸속에서는</p><h4>뇌세포 사이 신호에 쓰여요</h4><p>GABA는 뇌세포끼리 신호를 주고받을 때 쓰이는 물질 중 하나예요.</p></div><div className="story-summary-card"><p className="story-summary-kicker">사람 연구에서는</p><ul>{highlights.map(highlight=>{const claim=studies.find(item=>item.id===highlight.id);return claim?.metadata?.consumerSummary?<li key={highlight.id}><strong>{highlight.label}</strong><span>{claim.metadata.consumerSummary}</span></li>:null})}</ul></div></div><p className="story-summary-note">사람 연구는 연구에 사용한 GABA와 먹는 양을 살펴본 내용이에요. 셀핀다 가바 1500의 한 포에 든 양과 먹는 법은 제품 포장에서 확인해 주세요.</p></div></div></article>
      <article><span>3</span><div><h3>제품 포장 확인하기</h3><p>제품 한 포에 든 양, 포장 구성, 먹는 방법은 제품 포장에 적혀 있어요.</p><a className="text-link" href="#products">제품 구성 확인하기 →</a></div></article>
    </div>
    {definition?.sources.filter(source=>source.url?.startsWith('https://')).map(source=><a className="text-link" key={source.url} href={source.url!} target="_blank" rel="noopener noreferrer" aria-label={`${source.title} 연구 출처 보기`}>연구 출처 보기 ↗</a>)}
    <div className="story-questions" style={{marginTop:48}}><h3>읽다가 떠오르는 질문</h3>
      <details className="claim"><summary>1분 체크 결과는 어떻게 보면 되나요?</summary><div><p>최근 일주일의 잠과 휴식에 대한 내 답변을 보여드려요. 오늘 쉴 시간이 필요하다면 5분부터 시작해 보세요.</p><a className="text-link" href="#rhythm">오늘 해볼 휴식 보기 →</a></div></details>
      <details className="claim"><summary>연구 결과는 셀핀다 제품을 먹었을 때도 같나요?</summary><div><p>사람 연구는 연구에 사용한 GABA와 먹는 양을 살펴본 내용이에요. 셀핀다 가바 1500의 한 포에 든 양과 먹는 법은 제품 포장에서 확인해 주세요.</p><a className="text-link" href="#research">사람 연구 내용 보기 →</a></div></details>
      <details className="claim"><summary>제품을 고르기 전에 무엇을 보면 좋을까요?</summary><div><p>한 포에 든 양과 포장 구성, 먹는 방법을 확인해 보세요. 다른 사람의 후기는 작성 시점과 사용 기간도 함께 살펴보세요.</p><a className="text-link" href="#products">제품 구성 확인 →</a>{hasReviews ? <> · <a className="text-link" href={REVIEW_DESTINATION_URL} target="_blank" rel="noopener noreferrer">스마트스토어 후기 읽기 ↗</a></> : null}</div></details>
    </div>
  </div></section>;
}
