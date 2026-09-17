import type {Claim} from './ResearchLibrary';
import {REVIEW_DESTINATION_URL} from '../domain/reviews';

export default function GabaStory({claims, hasReviews = false}:{claims:Claim[]; hasReviews?: boolean}) {
  const definition=claims.find(claim=>claim.id==='gaba-definition'&&claim.status==='approved'&&claim.publicText);
  return <section id="story" className="section sage"><div className="wrap">
    <div className="section-head"><div><p className="chapter">01 / GABA 이야기</p><h2>GABA는<br/>뇌세포끼리 신호를 주고받을 때 쓰여요.</h2></div><p>몸속에서 하는 일과 사람 연구에서 살펴본 내용을<br/>그림과 쉬운 말로 확인해 보세요.</p></div>
    <div className="story-steps">
      <article><span>1</span><div><h3>GABA가 뭔가요?</h3>{definition?<p>{definition.publicText}</p>:<p>GABA는 뇌세포 사이에서 신호를 주고받는 과정에 관여하는 물질이에요.</p>}</div></article>
      <article><span>2</span><div><h3>사람 연구에서는 무엇을 살펴봤나요?</h3><p>수면 기록, 생각을 많이 쓰는 과제 뒤의 뇌파, 운동 뒤 몸의 수치처럼 서로 다른 항목을 살펴봤어요.</p><div className="story-research-summary"><div className="story-summary-grid"><div className="story-summary-card"><p className="story-summary-kicker">몸속에서는</p><h4>뇌세포 사이 신호에 쓰여요</h4><p>GABA는 뇌세포끼리 신호를 주고받을 때 쓰이는 물질 중 하나예요.</p></div><div className="story-summary-card"><p className="story-summary-kicker">사람 연구에서 살펴본 주제</p><ul><li><strong>수면</strong><span>잠드는 시간과 수면 기록</span></li><li><strong>생각을 많이 쓴 뒤</strong><span>뇌파와 기분 점수</span></li><li><strong>운동</strong><span>혈액 속 수치와 몸무게 변화</span></li></ul></div></div><p className="story-summary-note">논문별 참여자·방법·측정값은 아래 연구 목록에서 한 번씩 확인할 수 있어요.</p><a className="text-link" href="#research">사람 연구 한곳에서 보기 →</a></div></div></article>
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
