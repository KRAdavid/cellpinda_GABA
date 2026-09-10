# 실제 주문·환불·추천 정산 연동 준비

조사일 2026-09-10. 상태: **연동 준비와 내부 도메인 테스트만 완료. Cafe24 OAuth 앱 설치, 주문 조회, 실제 결제·환불 대사, 추천 지급은 미완료.** 비공개 인증 정보 없이 주문을 조회하지 않았다. 현재 분석 API의 `actualPurchases.supported:false`를 유지한다.

## 플랫폼과 상품 식별

공식몰 상품 페이지의 공개 HTML에서 `window.CAFE24`와 `cellpindamall.cafe24.com` 참조를 확인했다. Cafe24 플랫폼 사용의 직접적인 증거다. `cellpindamall`은 mall ID 후보이며 앱 설치·OAuth 응답으로 최종 확정해야 한다. 비슷한 이름의 과거 `gabamall`을 자동 채택하지 않는다. [공식몰 750 상품](https://cellpinda.co.kr/product/detail.html?product_no=39), [공식몰 1500 상품](https://cellpinda.co.kr/product/detail.html?product_no=27).

| 사이트 제품 | 공개 상품번호 후보 | 확정할 API 키 |
|---|---|---|
| gaba750 | product_no=39 | mall_id + shop_no + product_no + variant_code |
| gaba1500 | product_no=27 | mall_id + shop_no + product_no + variant_code |

`product_no`는 상품 번호이며 SKU 옵션을 나타내는 `variant_code`, 주문행을 나타내는 `order_item_code`와 다르다. 주문행 조회 API에서 실제 값을 대조한다. 상품 4+1 구성이나 교환으로 생성된 다른 품목을 숫자·이름 유사성만으로 매핑하지 않는다. [Cafe24 주문 품목 조회](https://apidocs.cafe24.com/en/docs/admin/get-orders-by-order-id-items).

## OAuth와 최소 권한

쇼핑몰 운영자의 앱 설치 및 권한 동의가 필요하다. 승인 코드는 `GET https://{mallid}.cafe24api.com/api/v2/oauth/authorize`에서 `response_type=code`, `client_id`, `state`, `redirect_uri`, `scope`로 요청한다. 서버가 일회성 state를 검증하고 `POST /api/v2/oauth/token`으로 교환한다. 응답의 `access_token`, `refresh_token`, `expires_at`, `refresh_token_expires_at`, `mall_id`, `shop_no`, `scopes`를 확인한다. 정확한 만료시각은 응답을 기준으로 처리한다. [Cafe24 인증 문서](https://developers.cafe24.com/docs/en/api/).

토큰 교환은 Basic client 인증과 form-urlencoded body의 `grant_type=authorization_code`, `code`, `redirect_uri`를 사용한다. 갱신은 `grant_type=refresh_token`을 사용하고 새 refresh token을 원자적으로 저장한다. 동시 갱신은 한 작업으로 직렬화한다. client secret과 토큰은 서버 비밀 저장소에 보관하며 브라우저·소스·로그에 출력하지 않는다. [인증 요청 형식](https://developer.cafe24.com/docs/guide/authentication_security_guide.html).

첫 연결은 주문 읽기 `mall.read_order`, 상품 대조에 필요한 상품 읽기, 필요할 경우 웹훅 로그를 위한 `mall.read_application`으로 제한한다. 쓰기 주문·환불 권한은 분석에 필요하지 않다. API 호출 버전은 설치 앱의 지원 버전을 확인하고 고정한다. 페이지네이션·429·토큰 갱신·앱 삭제 후 접근 중단을 시험한다.

## 조회 계약과 금액의 의미

확인한 Admin API 경로는 `GET /api/v2/admin/orders/{order_id}`, 주문행 `/orders/{order_id}/items`, 환불 `/refunds` 및 `/refunds/{refund_code}`다. 주문 식별은 mall ID·shop number·order ID로 분리하고 주문행 코드별 상태를 보존한다. 공식 문서는 `N50`을 구매확정, `C40`을 취소완료로 구분하며 취소완료-환불전 같은 중간 상태도 둔다. 그러므로 취소 상태만으로 실제 환불액을 확정하지 않는다. 환불 자료의 `refund_amount`, `refund_shipping_fee`, `refund_point`, `refund_credit` 등은 같은 현금 금액이 아니다. [현행 Admin API](https://developers.cafe24.com/docs/api/admin/).

내부 설계는 주문·품목·환불을 OAuth API로 재조회하고 서로 대사한 후에만 표준 주문 스냅샷을 만든다. 표시 판매가×수량을 실결제액으로 사용하지 않는다. 할인·배송비·적립금·예치금·부분취소 배분이 불명확하면 해당 주문은 정산 보류한다. 환불 처리와 PG 승인 취소는 운영 절차상 따로 확인할 수 있으므로 결제대행 상태를 대사한다. [Cafe24 환불 운영 안내](https://global-support.cafe24.com/hc/en-us/articles/47818322440217-Refunds).

## 웹훅: 확인된 범위와 미확정 계약

일반앱 공식 안내의 [Webhook 관리](https://developers.cafe24.com/app/front/app/develop/webhook/manage)와 [이벤트 샘플](https://developers.cafe24.com/app/front/app/develop/webhook/sample)은 이번 읽기에서 메뉴만 반환했고 이벤트 본문을 확인할 수 없었다. 따라서 **이벤트 번호, 정확한 body schema, 발신 검증 헤더·서명 알고리즘·재시도 간격은 미확정**이다. 임의 HMAC 헤더를 만들어 Cafe24 호환이라고 표기하지 않는다. Data Bridge나 PG 앱의 다른 웹훅 명세를 일반앱 주문 웹훅으로 대체하지 않는다.

확인 가능한 로그 API `GET /api/v2/admin/webhooks/logs`에는 `log_id`, `event_no`, `mall_id`, `trace_id`, `requested_time`, `request_body`, `success` 등의 필드가 있다. 로그 조회 권한은 `mall.read_application`이다. 이를 수신 이벤트 body의 정확한 스키마라고 가정하지 않는다. [공식 웹훅 로그 API](https://developers.cafe24.com/docs/en/api/admin/?version=2022-09-01#webhooks-logs).

준비할 실제 어댑터 계약:

1. 설치 앱에서 선택한 주문·결제·취소·환불 이벤트의 공식 샘플과 실제 시험 발송을 확보한다.
2. 발신 검증 방식과 허용 shop/mall을 확인하고 제한된 body만 수신한다. 미확인 웹훅으로 결제 확정을 직접 기록하지 않는다.
3. 수신 사실을 durable inbox에 기록한 다음 비동기 재조회 작업을 만든다. payload 원문은 개인정보가 많을 수 있어 장기 분석 로그에 넣지 않는다.
4. 인증된 주문 API 재조회에서 주문·행·환불을 대사하고 단일 주문별로 관찰 순번을 발급한다. 재시도·역순·중복은 동일 정산 결과를 만들어야 한다.
5. 웹훅 유실 보완을 위해 로그·주문 변경 내역을 주기적으로 대조한다. 분할 페이지와 중첩 재조회 구간의 중복 제거를 구현한다.

## 내부 주문 도메인 구현

`src/domain/orders.ts`는 Cafe24 payload를 직접 받지 않는 **내부 표준 모델**이다. `canonicalOrder`가 주문행·정수 KRW 누적 결제/환불액을 검증하고, `reconcileOrder`는 같은 주문의 중복 snapshot을 제거하며 오래된 observation을 무시한다. 부분환불은 누적 스냅샷을 교체하여 재전송 때 이중 차감하지 않는다. `observation`은 Cafe24 원본 revision이 아니라 서버의 직렬화된 재조회 순번이다.

현재는 KRW만 지원한다. `paidKrw/refundedKrw`는 해당 행에 검증 배분한 금액이다. 원본 `refund_amount`를 무조건 그대로 대입하지 않는다. 금액 배분 어댑터·외부 상태코드 매핑·DB 원장·실제 주문 네트워크 호출은 아직 구현하지 않았다. canonical 모델의 타입 이름이나 입력만으로 발신 인증이 성립하지 않는다.

## 추천 정산: 지급 미활성

`referralReadiness`는 검증된 불투명 구매자/추천자 식별자, 최초 주문 확인, 1단계 관계만 검사한다. 자기 추천·2단계 이상·중복 정산 주문·미해결 환불·순결제 0은 제외한다. 같은 사람의 복수계정 식별은 별도 실제 운영 검증이 필요하다. 단순 브라우저 flowId나 추천 링크만으로 사용자 동일성을 입증하지 않는다.

금액·적립률·첫 구매 혜택·최소 주문·확정 기간·환불 회수 규칙이 미정이므로 결과가 검토 가능이어도 `payoutEnabled:false`, `rewardAmount:null`이다. 실제 지급 없음. 향후 정산 원장은 주문행과 정책 버전을 고정하고 부분환불 시 차액 역분개하며, 포인트와 현금은 분리한다. 중복 추천과 자기 추천 차단의 검증을 운영 DB·회원 인증과 함께 완료해야 한다.

## 출시 검증 게이트

- 운영자 OAuth 동의, 정확한 mall/shop, 상품·variant 매핑, 서버 비밀 저장 및 갱신 검증.
- 실제 테스트 주문의 결제·부분환불·전체환불·취소·배송비·포인트 대사.
- 웹훅 발신 검증, 유실·재전송·역순·중복·동시 처리와 polling 대사.
- 주문별 사이트 귀속 방식과 기간을 확정. 주문 수집 자체는 사이트의 구매 전환 귀속을 증명하지 않는다.
- 보상 정책 승인과 회원 동일성·최초주문·1단계·중복 방지·환불 역분개 검증.
- 위 항목이 완료되기 전 실구매 전환과 추천 지급은 pending으로 유지.
