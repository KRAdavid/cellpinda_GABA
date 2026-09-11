type Product = {
  id: string;
  name: string;
  amountMg: number;
  servings: number;
  officialUrl: string;
};

type Track = (name: string, properties?: Record<string, string>) => void;

export default function PurchaseQuestions({ products, onEvent }: { products: Product[]; onEvent?: Track }) {
  const productSummary = products.map(product => `${product.name}은 1포 ${product.amountMg.toLocaleString()} mg·${product.servings}포 구성`).join(', ');
  return <section className="purchase-faq" aria-labelledby="purchase-faq-heading">
    <div className="purchase-faq-heading">
      <p className="chapter">구매 전 확인</p>
      <h3 id="purchase-faq-heading">제품을 알아본 뒤,<br />남은 질문을 확인하세요.</h3>
      <p>제품 구성은 짧게, 구매 전 확인할 정보는 펼쳐서 안내해요.</p>
    </div>
    <div className="purchase-faq-list">
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'amount' }); }}>
        <summary>현재 판매 제품은 어떤 구성인가요?</summary>
        <div><p>{productSummary ? `${productSummary}입니다.` : '현재 공개된 제품 구성 정보가 없습니다.'}</p><p>표시된 구성은 제품을 이해하기 위한 정보예요. 섭취 방법과 주의사항은 포장 표시를 확인하세요.</p></div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'selection' }); }}>
        <summary>어떤 제품이 나에게 맞는지 알려주나요?</summary>
        <div><p>리듬 체크는 생활을 돌아보는 경험이에요. 내용량·포장 구성·표시사항을 확인하고 내 생활에 맞는지 스스로 선택해 보세요.</p><a className="text-link" href="#rhythm">나의 하루 리듬 다시 보기 →</a></div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'label' }); }}>
        <summary>섭취 방법과 주의사항은 어디서 확인하나요?</summary>
      <div><p>현재 판매 제품의 섭취 방법·보관·주의사항은 구매 시 포장 표시사항과 스마트스토어에서 확인하세요. 이 사이트는 확인하지 못한 내용을 추정해 채우지 않습니다.</p>{products.map(product => <a className="text-link" key={product.id} href={product.officialUrl} target="_blank" rel="noopener noreferrer">{product.name} 스마트스토어 표시 확인 ↗</a>)}</div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'reviews' }); }}>
        <summary>다른 사람의 후기는 어떻게 읽어야 하나요?</summary>
        <div><p>후기는 한 사람의 사용 경험이에요. 작성 시점·제품 구성·사용 기간·제공이나 대가 관계를 원문에서 함께 확인해 보세요.</p><a className="text-link" href="#reviews">제품별 후기 원문 보기 →</a></div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'evidence' }); }}>
        <summary>연구 결과가 셀핀다가바의 효과를 보장하나요?</summary>
        <div><p>연구와 제품은 서로 다른 질문을 다뤄요. 각 자료에서 대상·제형·용량·기간·비교 조건을 확인하고, 제품 정보는 표시사항과 나란히 비교해 보세요.</p><a className="text-link" href="#research">연구 조건·수치·한계 보기 →</a></div>
      </details>
    </div>
  </section>;
}
