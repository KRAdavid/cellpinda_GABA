import type {Claim} from './ResearchLibrary';
import {REVIEW_DESTINATION_URL} from '../domain/reviews';

export default function GabaStory({claims, hasReviews = false}:{claims:Claim[]; hasReviews?: boolean}) {
  const definition=claims.find(claim=>claim.id==='gaba-definition'&&claim.status==='approved'&&claim.publicText);
  return <section id="story" className="section sage"><div className="wrap">
    <div className="section-head"><div><p className="chapter">01 / GABA 이야기</p><h2>GABA는<br/>뇌세포끼리 신호를 주고받을 때 쓰여요.</h2></div><p>몸속에서 하는 일과 사람 연구에서 살펴본 내용을<br/>그림과 쉬운 말로 확인해 보세요.</p></div>
    <div className="story-steps">
      <article><span>1</span><div><h3>GABA가 뭔가요?</h3>{definition?<p>{definition.publicText}</p>:<p>GABA는 뇌세포 사이에서 신호를 주고받는 과정에 관여하는 물질이에요.</p>}</div></article>
      <article><span>2</span><div><h3>사람 연구에서는 무엇을 봤나요?</h3><p>잠들기 전, 머리를 많이 쓴 뒤, 쉬었을 때와 운동했을 때 일반 GABA를 살펴본 장면을 아래 연구 카드에서 한눈에 볼 수 있어요.</p></div></article>
      <article><span>3</span><div><h3>제품 포장 확인하기</h3><p>제품 한 포에 든 양, 포장 구성, 먹는 방법은 제품 포장에 적혀 있어요.</p><a className="text-link" href="#products">제품 구성 확인하기 →</a></div></article>
    </div>
    {definition?.sources.filter(source=>source.url?.startsWith('https://')).map(source=><a className="text-link" key={source.url} href={source.url!} target="_blank" rel="noopener noreferrer" aria-label={`${source.title} 연구 출처 보기`}>연구 출처 보기 ↗</a>)}
    <div className="story-questions" style={{marginTop:48}}><h3>읽다가 떠오르는 질문</h3>
      <details className="claim"><summary>1분 체크 결과는 어떻게 보면 되나요?</summary><div><p>최근 일주일의 잠과 휴식에 대한 내 답변을 보여드려요. 오늘 쉴 시간이 필요하다면 5분부터 시작해 보세요.</p><a className="text-link" href="#rhythm">오늘 해볼 휴식 보기 →</a></div></details>
      <details className="claim"><summary>제품의 먹는 법과 주의사항은 어디서 확인하나요?</summary><div><p>제품 포장과 스마트스토어 상품 페이지에 적힌 표시사항을 확인해 주세요.</p><a className="text-link" href="#products">제품 구성 확인 →</a></div></details>
      <details className="claim"><summary>제품을 고르기 전에 무엇을 보면 좋을까요?</summary><div><p>한 포에 든 양과 포장 구성, 먹는 방법을 확인해 보세요. 다른 사람의 후기는 작성 시점과 사용 기간도 함께 살펴보세요.</p><a className="text-link" href="#products">제품 구성 확인 →</a>{hasReviews ? <> · <a className="text-link" href={REVIEW_DESTINATION_URL} target="_blank" rel="noopener noreferrer" aria-label="가바 1500 스마트스토어 후기 읽기 · 새 창">가바 1500 스마트스토어 후기 읽기 ↗</a></> : null}</div></details>
    </div>
  </div></section>;
}
