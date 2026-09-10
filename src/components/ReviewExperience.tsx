import './ReviewExperience.css';

export type PublicReview = {
  id: string;
  status?: string;
  publicText: string | null;
  sourceTitle?: string;
  sourceUrl: string | null;
  limitations?: string[];
};

type Props = { reviews: PublicReview[]; onOpen?: (productId: string) => void };

const readingQuestions = [
  { title: '왜 선택했을까요?', text: '제품을 고른 이유와 기대했던 점을 읽어 보세요. 나와 비슷한 상황인지도 함께 살펴보세요.' },
  { title: '어떻게 사용했을까요?', text: '어떤 구성인지, 얼마나 사용했는지, 맛과 포장은 어땠는지 확인해 보세요. 빠진 정보는 추측하지 않아도 됩니다.' },
  { title: '다른 경험도 있을까요?', text: '좋았던 점과 아쉬웠던 점을 함께 읽어 보세요. 한 사람의 경험이 모두에게 같지는 않습니다.' },
];

function reviewDestination(review: PublicReview) {
  // Only the audited destination record is a link. No consent-backed quote schema exists yet.
  if (review.status !== 'approved' || review.id !== 'shop-review-destination' || !review.publicText || !review.sourceUrl) return null;
  try {
    const url = new URL(review.sourceUrl);
    if (url.protocol !== 'https:' || !['cellpinda.co.kr', 'www.cellpinda.co.kr'].includes(url.hostname)) return null;
    const matches750 = url.searchParams.get('product_no') === '39' || /\/39(?:\/|$)/.test(url.pathname);
    if (!matches750) return null;
    url.hash = 'prdReview';
    return { url: url.href, productId: 'gaba750', label: '가바 750 · 공식몰 후기 읽기' };
  } catch { return null; }
}

export default function ReviewExperience({ reviews, onOpen }: Props) {
  const destinations = reviews.flatMap(review => {
    const destination = reviewDestination(review);
    return destination ? [{ review, ...destination }] : [];
  });
  return <section id="reviews" className="section sage review-experience" aria-labelledby="review-heading">
    <div className="wrap">
      <div className="section-head">
        <div><p className="chapter">사용 경험</p><h2 id="review-heading">먼저 선택한 사람들의<br />이야기도 들어보세요.</h2></div>
        <p>사용 경험은 구체적으로 살펴볼수록 도움이 됩니다.<br />제품 정보와 나란히 놓고, 내 선택을 확인해 보세요.</p>
      </div>
      <div className="review-experience-layout">
        <div className="review-experience-destination">
          <span className="review-experience-label">공식몰에 남겨진 경험</span>
          <h3>원문에서, 맥락까지.</h3>
          {destinations.length > 0 ? destinations.map(({ review, url, productId, label }) => <div key={review.id}>
            <p>{review.publicText}</p>
            <a className="button" href={url} target="_blank" rel="noopener noreferrer" onClick={() => onOpen?.(productId)}>{label} <span aria-label="새 창">↗</span></a>
          </div>) : <p role="status">후기를 확인할 수 있는 경로를 준비하고 있습니다.</p>}
          <p className="review-experience-context">후기는 개인의 사용 경험입니다. 제품 효과를 입증하는 연구 자료는 아니며, 작성자의 상황과 사용 조건이 다를 수 있습니다.</p>
        </div>
        <div className="review-experience-questions" aria-label="후기를 읽을 때 확인할 세 가지">
          {readingQuestions.map((question, index) => <article key={question.title}>
            <span className="review-experience-number" aria-hidden="true">0{index + 1}</span>
            <div><h3>{question.title}</h3><p>{question.text}</p></div>
          </article>)}
        </div>
      </div>
      <div className="review-experience-next"><p>경험을 살펴봤다면, 내용량과 구성을 다시 확인하세요.</p><a href="#products">제품 비교로 돌아가기 <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}
