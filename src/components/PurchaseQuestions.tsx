import { REVIEW_DESTINATION_URL } from '../domain/reviews';

type Product = {
  id: string;
  name: string;
  amountMg: number;
  servings: number;
  officialUrl: string;
};

type Track = (name: string, properties?: Record<string, string>) => void;

export default function PurchaseQuestions({ products, onEvent }: { products: Product[]; onEvent?: Track }) {
  if (products.length === 0) return null;
  const productSummary = products.map(product => `${product.name}은 1포 ${product.amountMg.toLocaleString()} mg·${product.servings}포 구성`).join(', ');
  return <section className="purchase-faq" aria-labelledby="purchase-faq-heading">
    <div className="purchase-faq-heading">
      <p className="chapter">구매 전 확인</p>
      <h3 id="purchase-faq-heading">구매하기 전에,<br />궁금한 내용을 확인하세요.</h3>
      <p>제품 구성과 구매 전 궁금한 내용을 확인해 보세요.</p>
    </div>
    <div className="purchase-faq-list">
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'amount' }); }}>
        <summary>현재 판매 제품은 어떤 구성인가요?</summary>
        <div><p>{productSummary}입니다.</p><p>먹는 방법과 주의사항은 제품 포장에 적혀 있어요.</p></div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'selection' }); }}>
        <summary>1분 체크로 제품을 골라 주나요?</summary>
        <div><p>체크 결과로 제품을 골라드리지는 않아요. 한 포에 든 양과 먹는 방법을 확인한 뒤 직접 결정해 주세요.</p><a className="text-link" href="#rhythm">지난 7일 돌아보기 →</a></div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'label' }); }}>
        <summary>섭취 방법과 주의사항은 어디서 확인하나요?</summary>
      <div><p>먹는 방법·보관법·주의사항은 구매 전에 제품 포장과 스마트스토어에서 확인해 주세요.</p>{products.map(product => <a className="text-link" key={product.id} href={product.officialUrl} target="_blank" rel="noopener noreferrer">{product.name} 제품 정보 보기 ↗</a>)}</div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'reviews' }); }}>
        <summary>다른 사람의 후기는 어떻게 읽어야 하나요?</summary>
        <div><p>후기는 한 사람의 경험이에요. 작성 날짜와 사용 기간, 제품을 무료로 받았거나 보상을 받았는지도 함께 살펴보세요.</p><a className="text-link" href={REVIEW_DESTINATION_URL} target="_blank" rel="noopener noreferrer" onClick={()=>onEvent?.('review_open',{productId:products[0]?.id ?? 'gaba1500',path:'/purchase-faq'})}>가바 1500 구매자 후기 읽기 →</a></div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'evidence' }); }}>
        <summary>연구 내용은 제품을 이해하는 데 어떻게 도움이 되나요?</summary>
        <div><p>연구에 누가 참여했고, 무엇을 얼마나 먹었는지 쉬운 말로 정리했어요. 셀핀다 제품 포장에 적힌 내용도 함께 확인해 보세요.</p><a className="text-link" href="#research">연구 이야기 보기 →</a></div>
      </details>
    </div>
  </section>;
}

