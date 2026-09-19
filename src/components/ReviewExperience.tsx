import {useState} from 'react';
import {CalendarDays, Clock3, PackageCheck} from 'lucide-react';
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
        <div><p className="chapter">구매자 후기</p><h2 id="review-heading">{quotes.length?<>먼저 구매한 사람들의<br/>후기를 읽어보세요.</>:destinations.length?<>가바 1500<br />스마트스토어 후기</>:<>구매자 후기를<br />확인해 보세요.</>}</h2></div>
        <p>{quotes.length ? <>작성일과 사용 기간을 함께 확인해 보세요.<br />제품 구성도 나란히 볼 수 있어요.</> : <>스마트스토어에서 작성일·사용 기간·<br />제품 경험을 확인해 보세요.</>}</p>
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
          <span className="review-experience-label">스마트스토어 후기</span>
          <h3>구매자 후기 바로 보기</h3>
          {destinations.map(({ review, url, productId, label }) => <div key={review.id}>
            <a className="button" href={url} target="_blank" rel="noopener noreferrer" onClick={() => onOpen?.(productId)}>{label} <span aria-label="새 창">↗</span></a>
          </div>)}
        </div> : null}
        {(quotes.length > 0 || destinations.length > 0) ? <div className="review-experience-cues" aria-label="후기에서 함께 살펴볼 정보">
          <span><CalendarDays aria-hidden="true"/><b>작성일</b></span>
          <span><Clock3 aria-hidden="true"/><b>사용 기간</b></span>
          <span><PackageCheck aria-hidden="true"/><b>제품 구성</b></span>
        </div> : null}
      </div>
    </div>
  </section>;
}
