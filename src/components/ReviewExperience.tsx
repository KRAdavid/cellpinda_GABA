import {useState} from 'react';
import './ReviewExperience.css';

export type PublicReview = {
  id: string;
  status?: string;
  publicText: string | null;
  sourceTitle?: string;
  sourceUrl: string | null;
  limitations?: string[];
  reviewType?: 'quote';
  productId?: string;
  authorLabel?: string;
  authoredAt?: string;
  usagePeriod?: string;
  context?: string;
  disclosure?: string;
};

type Props = { reviews: PublicReview[]; onOpen?: (productId: string) => void };

const readingQuestions = [
  { title: '왜 선택했을까요?', text: '제품을 고른 이유와 기대했던 점을 읽어 보세요. 나와 비슷한 상황인지도 함께 살펴보세요.' },
  { title: '어떻게 사용했을까요?', text: '어떤 구성인지, 얼마나 사용했는지, 맛과 포장은 어땠는지 확인해 보세요. 빠진 정보는 추측하지 않아도 됩니다.' },
  { title: '다른 경험도 있을까요?', text: '좋았던 점과 아쉬웠던 점을 함께 읽어 보세요. 한 사람의 경험이 모두에게 같지는 않습니다.' },
];

function reviewDestination(review: PublicReview) {
  // The official destination remains available independently of quoted reviews.
  if (review.status !== 'approved' || !['shop-review-destination','shop-review-destination-1500'].includes(review.id) || !review.publicText || !review.sourceUrl) return null;
  try {
    const url = new URL(review.sourceUrl);
    if (url.protocol !== 'https:' || !['cellpinda.co.kr', 'www.cellpinda.co.kr'].includes(url.hostname)) return null;
    const productId = review.id === 'shop-review-destination' ? 'gaba750' : 'gaba1500';
    const productNo = productId === 'gaba750' ? '39' : '27';
    const pathMatch = url.pathname.endsWith(`/${productNo}/`) || url.pathname.endsWith(`/${productNo}`);
    if (url.searchParams.get('product_no') !== productNo && !pathMatch) return null;
    url.hash = 'prdReview';
    return { url: url.href, productId, label: `${productId === 'gaba750' ? '가바 750' : '가바 1500'} · 공식몰 후기 읽기` };
  } catch { return null; }
}

const productNames:Record<string,string>={gaba750:'가바 750',gaba1500:'가바 1500'};
function quoteSource(review:PublicReview) {
  if(review.status!=='approved'||review.reviewType!=='quote'||!review.productId||!productNames[review.productId])return null;
  if(![review.publicText,review.authorLabel,review.authoredAt,review.context,review.disclosure,review.sourceTitle].every(value=>typeof value==='string'&&value.trim()))return null;
  try {const url=new URL(review.sourceUrl??'');return url.protocol==='https:'&&!url.username&&!url.password?url.href:null;}catch{return null;}
}

export default function ReviewExperience({ reviews, onOpen }: Props) {
  const [product,setProduct]=useState('');
  const quotes=reviews.flatMap(review=>{const url=quoteSource(review);return url?[{review,url}]:[];});
  const availableProducts=[...new Set(quotes.map(({review})=>review.productId!))];
  const activeProduct=availableProducts.includes(product)?product:'';
  const visibleQuotes=quotes.filter(({review})=>!activeProduct||review.productId===activeProduct);
  const destinations = reviews.flatMap(review => {
    const destination = reviewDestination(review);
    return destination ? [{ review, ...destination }] : [];
  });
  return <section id="reviews" className="section sage review-experience" aria-labelledby="review-heading">
    <div className="wrap">
      <div className="section-head">
        <div><p className="chapter">사용 경험</p><h2 id="review-heading">{quotes.length?<>먼저 선택한 사람들의<br/>사용 이야기를 읽어보세요.</>:<>가바 750 사용 경험을,<br />공식몰 원문에서.</>}</h2></div>
        <p>사용 경험은 구체적으로 살펴볼수록 도움이 됩니다.<br />제품 정보와 나란히 놓고, 내 선택을 확인해 보세요.</p>
      </div>
      {quotes.length>0&&<div className="review-quotes">
        <p>이 사이트에 소개한 후기입니다. 전체 구매자의 경험이나 만족도를 대표하지 않습니다.</p>
        <div className="review-quote-controls"><label htmlFor="review-product">사용 제품<select id="review-product" value={activeProduct} onChange={event=>setProduct(event.target.value)}><option value="">모든 제품</option>{availableProducts.map(id=><option value={id} key={id}>{productNames[id]}</option>)}</select></label><p role="status">소개된 {quotes.length}건 중 {visibleQuotes.length}건</p></div>
        <div className="review-quote-list">{visibleQuotes.map(({review,url})=><article className="review-quote-card" key={review.id}>
          <div className="review-quote-byline"><h3>{productNames[review.productId!]}</h3><span>{review.authorLabel}</span></div>
          <dl><div><dt>작성일</dt><dd><time dateTime={review.authoredAt}>{review.authoredAt}</time></dd></div><div><dt>사용 기간</dt><dd>{review.usagePeriod||'원문에서 확인되지 않음'}</dd></div></dl>
          <p className="review-quote-disclosure"><strong>제품 제공·대가 관계</strong><br/>{review.disclosure}</p>
          <p className="review-quote-context"><strong>이 경험의 맥락</strong><br/>{review.context}</p>
          <p className="review-quote-label">원문 인용·발췌</p><blockquote>{review.publicText}</blockquote>
          <div className="review-quote-links"><a href={url} target="_blank" rel="noopener noreferrer" onClick={()=>onOpen?.(review.productId!)}>{review.sourceTitle} 원문 ↗</a><a href={`#product-${review.productId}`}>사용 제품 구성 보기 →</a></div>
        </article>)}</div>
      </div>}
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
