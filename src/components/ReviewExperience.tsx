import {useState} from 'react';
import './ReviewExperience.css';
import {REVIEW_DESTINATION_URL} from '../domain/reviews';

export type PublicReview = {
  id: string;
  status?: string;
  publicText: string | null;
  sourceTitle?: string;
  sourceUrl: string | null;
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
  { title: '왜 샀을까요?', text: '구매한 이유와 기대한 점을 읽어 보세요. 나와 비슷한 상황인지도 살펴보세요.' },
  { title: '얼마나 써 봤을까요?', text: '후기를 쓴 날짜와 사용 기간, 맛과 포장 이야기를 함께 확인해 보세요.' },
  { title: '좋았던 점만 있나요?', text: '만족한 점과 아쉬운 점을 함께 읽어 보세요. 한 사람의 경험이 모두에게 같지는 않아요.' },
];

const approvedReviewCopy = '가바 1500 구매자 후기를 스마트스토어에서 읽어보세요.';

function reviewDestination(review: PublicReview) {
  // The Smart Store destination remains available independently of quoted reviews.
  if (review.status !== 'approved' || review.id !== 'shop-review-destination-1500' || review.publicText !== approvedReviewCopy || !review.sourceUrl) return null;
  try {
    const url = new URL(review.sourceUrl);
    if (url.href !== REVIEW_DESTINATION_URL) return null;
    const productId = 'gaba1500';
    return { url: url.href, productId, label: '가바 1500 · 스마트스토어 후기 읽기' };
  } catch { return null; }
}

const productNames:Record<string,string>={gaba1500:'가바 1500'};
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
  if (!quotes.length && !destinations.length) return null;
  return <section id="reviews" className="section sage review-experience" aria-labelledby="review-heading">
    <div className="wrap">
      <div className="section-head">
        <div><p className="chapter">구매자 후기</p><h2 id="review-heading">{quotes.length?<>먼저 구매한 사람들의<br/>후기를 읽어보세요.</>:destinations.length?<>가바 1500 구매자<br />후기를 확인해 보세요.</>:<>구매자 후기를<br />확인해 보세요.</>}</h2></div>
        <p>언제 썼는지, 얼마나 사용했는지 함께 살펴보세요.<br />제품 구성도 나란히 확인할 수 있어요.</p>
      </div>
      {quotes.length>0&&<div className="review-quotes">
        <p>이 사이트에 소개한 구매자 후기예요. 구매한 이유와 사용 기간을 함께 살펴보세요.</p>
        <div className="review-quote-controls"><label htmlFor="review-product">사용 제품<select id="review-product" value={activeProduct} onChange={event=>setProduct(event.target.value)}><option value="">모든 제품</option>{availableProducts.map(id=><option value={id} key={id}>{productNames[id]}</option>)}</select></label><p role="status">소개된 {quotes.length}건 중 {visibleQuotes.length}건</p></div>
        <div className="review-quote-list">{visibleQuotes.map(({review,url})=><article className="review-quote-card" key={review.id}>
          <div className="review-quote-byline"><h3>{productNames[review.productId!]}</h3><span>{review.authorLabel}</span></div>
          <dl><div><dt>작성일</dt><dd><time dateTime={review.authoredAt}>{review.authoredAt}</time></dd></div><div><dt>사용 기간</dt><dd>{review.usagePeriod||'후기에서 확인해 보세요'}</dd></div></dl>
          <p className="review-quote-disclosure"><strong>제품을 무료로 받았거나 보상을 받았나요?</strong><br/>{review.disclosure}</p>
          <p className="review-quote-context"><strong>후기와 함께 밝힌 내용</strong><br/>{review.context}</p>
          <p className="review-quote-label">구매자가 남긴 후기</p><blockquote>{review.publicText}</blockquote>
          <div className="review-quote-links"><a href={url} target="_blank" rel="noopener noreferrer" onClick={()=>onOpen?.(review.productId!)}>{review.sourceTitle}에서 더 보기 ↗</a><a href={`#product-${review.productId}`}>제품 구성 보기 →</a></div>
        </article>)}</div>
      </div>}
      <div className={`review-experience-layout${quotes.length ? '' : ' review-experience-layout-destination-only'}`}>
        {destinations.length > 0 ? <div className="review-experience-destination">
          <span className="review-experience-label">스마트스토어 구매자 후기</span>
          <h3>후기를 읽고, 사용 기간도 확인하세요.</h3>
          {destinations.map(({ review, url, productId, label }) => <div key={review.id}>
            <p>{review.publicText}</p>
            <a className="button" href={url} target="_blank" rel="noopener noreferrer" onClick={() => onOpen?.(productId)}>{label} <span aria-label="새 창">↗</span></a>
          </div>)}
          <p className="review-experience-context">후기는 한 사람의 경험이에요. 작성 날짜와 사용 기간, 제품 구성도 함께 확인해 보세요.</p>
        </div> : null}
        {(quotes.length > 0 || destinations.length > 0) ? <div className="review-experience-questions" aria-label={quotes.length > 0 ? '후기를 읽을 때 확인할 세 가지' : '스마트스토어 후기를 읽을 때 확인할 세 가지'}>
          {readingQuestions.map((question, index) => <article key={question.title}>
            <span className="review-experience-number" aria-hidden="true">0{index + 1}</span>
            <div><h3>{question.title}</h3><p>{question.text}</p></div>
          </article>)}
        </div> : null}
      </div>
      <div className="review-experience-next"><p>후기를 읽었다면, 제품 한 포의 양과 구성을 확인해 보세요.</p><a href="#products">제품 구성 확인하기 <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}
