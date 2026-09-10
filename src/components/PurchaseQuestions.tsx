type Product = {
  id: string;
  name: string;
  amountMg: number;
  servings: number;
  officialUrl: string;
};

type Track = (name: string, properties?: Record<string, string>) => void;

export default function PurchaseQuestions({ products, onEvent }: { products: Product[]; onEvent?: Track }) {
  const productById = new Map(products.map(product => [product.id, product]));
  const product750 = productById.get('gaba750');
  const product1500 = productById.get('gaba1500');
  return <section className="purchase-faq" aria-labelledby="purchase-faq-heading">
    <div className="purchase-faq-heading">
      <p className="chapter">구매 전 확인</p>
      <h3 id="purchase-faq-heading">제품을 알아본 뒤,<br />남은 질문을 확인하세요.</h3>
      <p>확인된 제품 구성과 공식 확인 경로를 분리해 안내합니다. 이 페이지는 진단이나 섭취량 추천을 하지 않습니다.</p>
    </div>
    <div className="purchase-faq-list">
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'amount' }); }}>
        <summary>750과 1500은 무엇이 다른가요?</summary>
        <div><p>{product750?.name || '가바 750'}은 1포 750 mg·30포, {product1500?.name || '가바 1500'}은 1포 1,500 mg·30포 구성으로 상품명과 제품 이미지에서 확인됩니다.</p><p>내용량 차이를 특정 증상이나 사람에게 맞는 권장량으로 해석하지 않습니다.</p></div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'selection' }); }}>
        <summary>어떤 제품이 나에게 맞는지 알려주나요?</summary>
        <div><p>리듬 체크 결과로 제품이나 용량을 추천하지 않습니다. 내용량, 포장 구성, 공식 표시사항과 자신의 생활 맥락을 확인한 뒤 선택하세요.</p><a className="text-link" href="#rhythm">리듬 체크는 생활 습관을 돌아보는 경험입니다 →</a></div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'label' }); }}>
        <summary>섭취 방법과 주의사항은 어디서 확인하나요?</summary>
      <div><p>현재 판매 제품의 섭취 방법·보관·주의사항은 구매 시 포장 표시사항과 스마트스토어에서 확인하세요. 이 사이트는 확인하지 못한 내용을 추정해 채우지 않습니다.</p>{products.map(product => <a className="text-link" key={product.id} href={product.officialUrl} target="_blank" rel="noopener noreferrer">{product.name} 스마트스토어 표시 확인 ↗</a>)}</div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'reviews' }); }}>
        <summary>다른 사람의 후기는 어떻게 읽어야 하나요?</summary>
        <div><p>후기는 개인의 사용 경험이며 제품 효과를 입증하는 연구 자료가 아닙니다. 작성 시점, 제품 구성, 사용 기간과 제공·대가 관계를 원문에서 확인하세요.</p><a className="text-link" href="#reviews">제품별 후기 원문 보기 →</a></div>
      </details>
      <details onToggle={event => { if (event.currentTarget.open) onEvent?.('faq_open', { questionId: 'evidence' }); }}>
        <summary>연구 결과가 셀핀다가바의 효과를 보장하나요?</summary>
        <div><p>보장하지 않습니다. 연구마다 대상·제형·용량·기간·비교 조건이 다르며, 각 자료에 셀핀다 완제품에 적용할 수 있는 범위와 한계를 함께 표시합니다.</p><a className="text-link" href="#research">연구 조건과 한계 읽기 →</a></div>
      </details>
    </div>
  </section>;
}
