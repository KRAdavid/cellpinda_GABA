# 전체 목표 완료 간극 점검

기준일 2026-09-11. 현재 브랜치의 최신 커밋 및 작업 파일. 사용자 원문 `goal-objective.md`, `docs/REQUIREMENTS.md`, `docs/IMPLEMENTATION_STATUS.md` 최신 추가 기록, 현재 프론트·Worker·원장을 대조했다. 과거 상태표의 pending과 오래된 연구 건수는 최신 증거로 보정했다. 코드 변경 없이 작성한 독립 AI 검토이며 실제 소비자 평가 또는 전문기관 인증이 아니다. 최신 배포 검증은 [GitHub Actions 34500686452](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34500686452)와 2026-09-11 공개 URL 재검증을 기준으로 한다.

커밋 `b5e70b4`에서 Node/SQLite와 Worker/D1의 초기화 시 canonical 스마트스토어 후기 목적지를 원장 해시 기준으로 동기화했다. 영구 DB에 남은 이전 목적지만 revision·audit과 함께 보정하며, 인용 후기와 운영자 수정본은 보존한다. 60개 회귀 테스트, 타입검사, production build, 로컬 Worker/D1 HTTP에서 content 200(후기 1건)과 샌드박스 PUT/GET/DELETE 200을 확인했다. `docs/B2_MATERIAL_VERIFICATION_20260911.md`에는 완제품 포장 자료와 원료 제외 경계를 묶었고, `goal:next`는 B2 검증 진행을 별도 표시한다. 원격 Cloudflare D1·백업 복구는 여전히 외부 운영 조건이다.

**판정: 전체 goal 미완료. 1차 9개 전체 완료도 아직 선언할 수 없다.** 체험·콘텐츠·공유·서버 기반은 구현·시험됐지만 실제 후기, 현행 제품 정보, 실제 구매 분석과 영구 운영에 간극이 있다. 회원 기능은 로컬 실제 브라우저 검증까지 진행됐고 공개 임시주소에서는 꺼져 있다. 준비 코드·연결 후보·테스트 더블을 운영 연동으로 계산하지 않았다.

샌드박스 운영 보고서는 `sandbox_simulation_only`를 명시한다. 모의 검증만으로 모든 작업이 끝난 경우 추천을 `revise`로 유지하며, 실제 독립 검토·승인·게시와 구분한다.

‘검증’은 각 행에 적힌 환경과 범위만 의미한다. 공개 미리보기는 임시 계정 배포이며 현재 생존 기간을 보장하지 않는다. QA 이벤트는 소비자 성과가 아니다.

## 1차 필수 9항목

| ID | 현재 증거 | 판정 및 남은 일 |
| --- | --- | --- |
| P1-01 공감 랜딩 | `src/App.tsx`, `src/styles.css`; 실제 완제품 사진·체크 CTA·스토리 흐름. IMPLEMENTATION_STATUS의 데스크톱·360/390px 브라우저 확인 | 구현·임시 배포 검증. 독립 소비자가 공감하고 이해하는지 테스트는 없음. |
| P1-02 리듬 체크 | `src/domain/rhythm.ts`, 해당 테스트, `RhythmExperience.tsx`; 5문항·243조합 검증, 첫 응답 때 시작 집계 | 구현·브라우저 검증. 임상 도구가 아니며 결과 규칙을 체내 GABA 측정으로 해석하지 않음. |
| P1-03 개인 결과 | 4유형·설명·생활 안내·공유받은 결과 구분, 규칙 테스트와 실제 완료 흐름 | 구현·브라우저 검증. 독립 소비자의 오해 여부 검증은 남음. |
| P1-04 결과 이미지 공유 | `RhythmExperience.tsx`, PNG 실제 생성·한글 확인·다운로드, 공유 실패 대안; `worker/social.ts`, OG 카드 | 부분 완료. 카카오톡·인스타그램 및 물리 모바일의 실제 공유 대상 동작 미검증. 공유 요청과 게시 완료를 구분함. |
| P1-05 GABA 설명 | `GabaStory.tsx`, 승인 정의·상호작용·FAQ·원문 연결, 동작 줄이기 관련 스타일 | 구현·브라우저 검증. 학습 효과를 실소비자로 입증한 상태 아님. |
| P1-06 발효·균주 신뢰 | `data/content-ledger.json`, `EVIDENCE_AUDIT.md`; 공개 특허·균주 출처 및 승인 문안 표시 | 부분 완료. 현행 판매 완제품과 OPK-3·전체 공정·기탁·매회 분석의 연결 부족. 원료 시험서를 완제품 보증으로 대체하지 않음. |
| P1-07 제품 비교·구매 | 기존 제품 자료의 실제 이미지 1개, 1500 구성·총량·스마트스토어 판매처 링크; `ASSET_SOURCES.md` | 부분 완료. 현행 뒷면 표시·섭취법·맛·실측 크기 부족. 가격·재고는 고정 보장하지 않음. 스마트스토어 이동과 주문 완료는 다름. |
| P1-08 관리자 승인 | `worker/store.ts`, `Admin.tsx`, D1 영속·토큰 인증·revision·이력·미승인 필터, 통합 시험 | 부분 완료. 현재 상태는 approved/hold 중심이고 단일 운영자 토큰이다. 요구한 작성/검토/승인 역할 분리와 초안→검토→발행→철회 전체 워크플로, 운영자별 책임 추적·백업 복구 운영 증거 부족. |
| P1-09 분석 | `worker/store.ts` 이벤트 영속·중복 제거·허용 필드·4개 흐름 집계·관리자 화면 | 부분 완료. 실제 주문·취소·환불·구매 귀속 및 7일 재방문 미연동. 주문 도메인 준비를 실구매 측정으로 계산하지 않음. |

## 연구·실제 후기·제품 경험

| 요구 | 현재 증거 | 미완 범위 |
| --- | --- | --- |
| 상세 연구 | `ResearchLibrary.tsx`와 승인 원장·공개 마스터 인덱스 연구 8건. 스트레스·수면·성장호르몬·근육발달 축을 포함하며 대상·규모·용량·기간·대조·결과·한계·제품 적용·출처, 검색·필터·독립 링크를 제공 | 공개 8건의 상세 구현은 확인. 연구 전체를 포괄하는 최신 체계적 검토는 아님. GitHub 후보 스냅샷은 승인 문안이 아니며 후속 수집·독립 과학 검토가 필요. |
| 상반 결과 | 2022 위약 대비 비유의 결과를 2018 결과와 함께 제공. 군 내 변화와 군간 차이 구분 | 이 세 연구로 완제품 효과나 용량 우열을 결론 내리지 않음. |
| 실제 후기 | `ReviewExperience.tsx`는 승인된 1500 스마트스토어 후기 목적지 1개를 표시. 로컬 자료18개 전체 검토 기록 | 실제 후기 발췌·전체 후기 목록·필터·작성일/제품/제공관계/사용기간/권한/철회 기록 미구현. 원문 목적지만으로 상세 후기 요구 충족이 아님. 긍정·부정 경험을 일관된 기준으로 선별해야 함. |
| 제품 경험 상세 | `PRODUCT_EXPERIENCE_INPUTS.md`에 과거 타 브랜드 도면과 현행 제품 차이 기록 | 현재 판매본의 라벨·맛·섭취방법·실물 크기·표시 분류 확인 후 내용 보강. 미확인 안전성·권장량 추정 금지. |

## 2차 및 플랫폼 확장

| ID | 현재 증거 | 판정 및 다음 행동 |
| --- | --- | --- |
| P2-01 7일 챌린지 | `challenge.ts`, `SevenDayChallenge.tsx`, 날짜 v2·현지 날짜·미래 차단·메모·JSON·삭제 확인·7일 후 보기와 테스트 | 기본 챌린지 구현·로컬/임시 배포 검증. 자동 달력 시험을 실제 7일 소비자 참여 효과로 계산하지 않음. |
| P2-02 회원 기록 | `worker/members.ts`, `members.test.mjs`, `MemberRecords.tsx`, `MEMBER_RELEASE_REVIEW.md`. 패스키·D1·동의·CRUD·탈퇴·revision·회원 헤더/세션 일치, 실제 가상 CTAP2 브라우저 여정 | 부분 완료. 로컬 시험에서 검증, 공개는 disabled. 현재 챌린지 1개만 저장. 누적 이력·체크 이력 연결·추가 패스키·분실 복구·보유기간 운영·정식 origin·물리기기 검증 남음. |
| P2-03 추천 보상 | `orders.ts` 순수 도메인과 테스트, `ORDER_INTEGRATION.md`; 자기추천·1단계 등 준비 판단 | 미연동. 초대 소유자·주문 귀속·첫 구매 혜택·적립 원장·환불 역분개·내역 UI·이의 처리·실제 지급 없음. payoutEnabled:false 유지. |
| P2-04 대화형 AI | 승인 콘텐츠가 검색 기반이 될 수 있으며 키 사용 질문은 이미 전달됨 | 미구현. 키 관련 답변 pending. 실제 모델 호출·서버 비밀키·출처검색·진단/처방 방지·인젝션 평가·사용량 제어·대화 삭제 검증 없음. 이번 문서는 재질문하지 않음. |
| P2-05 친구 결과 비교 | 공유 유형 선택·동의 후 내 결과와 비교, 답변 원문/회원 기록 서버 전송 없음 | 부분 완료. 정적 유형 링크 기반이며 서버 만료·철회 가능한 공유 권한 체계는 없음. 완전한 친구 비교 플랫폼 완료로 계산하지 않음. |
| P2-06 재방문·채널 공유 | 생활 실천·연구 상세·결과 이미지·공유 메타·링크 | 부분 완료. 승인 카드뉴스/숏폼 운영·카카오/인스타 실제 전달·추천 혜택 동선·재방문 측정 미완. |

## 요청한 지표 전부의 상태

| 지표 | 현재 계산/증거 | 해석 한계·미완 |
| --- | --- | --- |
| 첫 화면→체크 시작률 | landing_to_check: 페이지 메모리 flow별 이후 첫 응답 이벤트 | 페이지 생애 기준으로 실제 고유 방문자/마케팅 세션과 다름. |
| 체크 시작→완료율 | check_completion: 같은 flow의 이후 완료 | 수집된 flow 범위. 실제 소비자 성과 표본 없음. |
| 결과→GABA 열람률 | result_to_story | 수신 순서 기준. 열람을 이해·동의로 해석하지 않음. |
| 결과 카드 공유율 | 요청·취소·생성·복사·다운로드 이벤트 수 | 정확한 결과 분모별 공유요청/복사/다운로드율은 별도 집계 보강 필요. 실제 게시 완료율 미지원. |
| 공유 링크 신규 방문율 | shared_link_landed 수집 | 송신/수신 귀속과 신규 식별 미지원. 단순 유형 링크 방문을 신규 방문율로 보고하지 않음. |
| 제품 비교→구매 클릭률 | comparison_to_purchase_click 및 제품별 이벤트 수 | 전체 flow 퍼널 중심. 제품별 적격 비교 노출 분모를 별도로 검증해야 함. |
| 제품별 실제 구매 전환율 | actualPurchases.supported:false | 주문·SKU·귀속 기간·취소·환불·연결 불가 주문 비율 미연동. |
| 7일 이내 재방문율 | returningVisitors.supported:false | 동의된 식별 정책·보유기간·7일 관측 코호트 없음. |
| 문구 승인·수정 이력 | audit 이력·revision·변경 수 | 단일 관리자 토큰이며 수행자 역할별 승인 기록은 아직 부족. |

## 외부 입력이 필요한 묶음 — 새 질문 발송 아님

아래는 기존 질문·자료 요청의 단일 추적 목록이다. 이메일·비밀번호·API 비밀값을 대화나 저장소에 붙이지 않고 각 서비스의 안전한 설정 경로를 사용한다.

1. **후기 자료 책임자:** 재사용할 실제 후기 3~5건의 원문 URL 또는 원본, 제품·작성일·확인 가능한 사용기간, 사이트 재게시 권한 증거, 구매 확인 방법, 제공/대가 관계, 허용 공개명·건강정보 범위. 권한 없는 캡처를 대신 공개하지 않는다.
2. **현행 제품 책임자:** 현재 판매 1500의 뒷면·측면·개별 포 라벨 원본과 개정/생산 기준, 실제 크기, 표시된 섭취법·원재료·분류·주의사항. 맛 설명은 확인 가능한 제품 자료나 검토된 실제 경험을 제공. OPK-3·공정·시험 연결을 주장하려면 해당 SKU/로트와 연결되는 공개 가능 문서를 제공.
3. **스마트스토어 운영자:** 네이버 커머스API 계정과 권한, 제품/옵션 식별자 매핑, 시험 주문·취소·부분/전체 환불 검증 환경, 주문 귀속 방식. 추천 정책의 첫 구매 혜택·적립률·확정기간·환불 회수·고지·문의 담당도 확정해야 함.
4. **운영 소유자:** 영구 Cloudflare 계정과 정식 도메인/RP origin, 소비자 사이트 전용 GitHub 저장소 위치, 회원 보유기간·삭제·복구·운영 접근 담당. 기존 `cellpinda-gaba-lab`은 별도 근거 인덱스이므로 덮어쓰지 않음. 도메인 변경 시 패스키 자동 이전을 가정하지 않음.
5. **AI 키 사용:** 이미 보낸 키 설정 진행 여부 질문의 답변을 기다리는 중. 승인된 경우 서버의 안전한 비밀 설정으로 진행. 아직 키 보유·모델 호출·AI 연결 완료를 주장하지 않음.

## 운영과 독립 검증의 남은 게이트

전문마케터·소비자 심리·UX·근거·개발 역할의 AI 검토와 교차 수정은 진행했다. 실제 외부 전문가 회의나 독립 소비자 테스트를 수행한 것은 아니다. 목표 소비자가 제품/연구 차이를 이해하는지, 과장된 효능으로 받아들이는지, 결과 공유 이유와 구매 판단에 필요한 정보가 충분한지 관찰하는 사용성 검증이 남는다.

영구 배포·도메인·DB 백업/복구·운영자 접근·키 순환·모니터링·롤백, 정식 origin의 물리 모바일/패스키/공유앱 여정을 검증해야 한다. 실제 판매자 주문 연결 없이 구매 분석·추천 정산을 완료할 수 없다. 위 미완 항목은 목표에서 제외한 것이 아니라 후속 작업으로 유지한다.

## 정기 TF pulse 계약 검증 추가 증거

2026-09-11 현재 `scripts/validate-tf-pulse.mjs`를 추가해 정기 pulse가 ACTIVE Goal Contract·canonical 업무 그래프·B4 티저 게이트와 일치하는지 배포 전에 검사한다. 활성 작업마다 담당 TF·독립 검증자·다음 행동이 존재하는지, 상태별 결정 모드가 맞는지, 자동화가 사람의 반대 의견을 만들어내지 않았는지도 함께 확인한다. `pnpm run build`에 이 검증을 포함했으며, 커밋 `20e2535`의 [GitHub Actions 34506398512](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34506398512)에서 Linux runner 검증·Pages·라이브 smoke가 성공했다.

최신 [TF decision pulse 실행 34506555645](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34506555645)은 계약 검증·JSON 생성·Run Summary·14일 artifact 업로드를 모두 성공시켰다. 이 자동화는 작업 상태·콘텐츠 승인·외부 게시·구매를 변경하지 않고 회의 안건과 입력 대기를 갱신한다. 따라서 B2 독립 검토, B3 후기 권한, B4 티저 공개 자료, C2 Cloudflare 운영 설정, E1 실주문 대사는 여전히 외부 검증 게이트다.


## 이번 실행의 추가 증거

초기 점검 이후 회원 보관 이력과 전용 GitHub 저장소가 추가되었다. 보관/읽기/내려받기/삭제는 localhost의 실제 D1·가상 패스키 브라우저 흐름에서 검증했다. 회원 운영 공개는 여전히 disabled다. GitHub는 KRAdavid/cellpinda-rhythm PRIVATE, HEAD95502506a345a390cb5e72d4eaf841ae0dedab6b 확인. 내부 정보 제외 별도 소스 사본이며 자동배포/영구도메인까지 완료된 것은 아니다. 앞 표의 GitHub 미정은 이 추가 증거로 갱신하되, 나머지 외부 입력과 미완 사항은 유지한다.


## 후기 운영 후속 증거

후기 접수/수정/공개·보류, revision 및 감사 기록, 권한 만료 필터, 공개 카드와 제품 필터를 구현했다. 실제 고객 인용은 아직0건이며 공식몰 1500 원문 목적지만 현행 공개 데이터에 있다. 실제 후기 권한 입력, 현행 제품 표시사항, 소비자 검증은 그대로 남는다. 다중 담당자 권한 분리나 독립 전문가 심의를 완료했다고 해석하지 않는다.

34개 검사와 격리된 실제 Node API·브라우저 여정은 구현 증거다. Cloudflare 실제D1의 신규후기 운영, 영구배포, 복구/모니터링 등 운영 검증은 미완이다. GitHub 원격은 bc118f5e071a091f341c126f24ee855b84732a91로 갱신됐다. 원래 전체 목표와 기존 미완 요구는 유지한다.

## 제품 비교 공유 후속 구현

제품 비교 영역에 별도 공유 기능을 추가했다. 공유 URL은 /?view=products#products로 새로 구성해 현재 주소의 개인 리듬/기타 query를 옮기지 않는다. native share가 없으면 복사, 복사 거절 시 직접 복사할 주소를 제공한다. 취소는 별도 피드백과 이벤트로 구분하며 전달 완료로 집계하지 않는다. 수신자는 자료 로딩 후 제품 비교 위치로 이동한다.

Worker는 제품 전용 title/description/canonical을 출력하고, 중복/잘못된 view 또는 rhythm 혼합 URL은 일반 미리보기로 처리한다. 실제 localhost:8788 HTML에서 제품 제목/canonical과200응답 확인. 단위검사5개(기존리듬포함), frontend타입/build, PC·모바일 브라우저5개 공유상태/수신자위치 검사 통과. 브라우저native/clipboard응답은 모의 API로 분기 검증했으며 실제 SNS앱 전달·공유 미리보기 캐시·영구도메인은 미검증이다. 실제 후기/주문/AI/영구운영 등 기존 미완 요구는 유지한다.

## 화면별 공유 시도 분석

직전 제품공유 turn은 UI·Worker메타·검증 및 GitHub 변경이므로 progress였다. 이번에는 내결과(/result), 받은결과(/share), 제품비교(/products)별 공유시도 분석을 추가했다. 각 명시경로의 view 이후 동일 익명 페이지flow에서 요청/복사/다운로드가 하나라도 있으면 분자1이다. 취소된 요청도 시도에 포함하고, 요청 없이 취소만 있는 이상 이벤트는 시도에 넣지 않는다. 개별행동은 서로 겹치므로 합산하지 않는다. 분모0은null/집계대기, 분모가있고시도0이면0%다.

경로 없는 과거공유는 추정하지 않고 별도원시건수로 표시한다. 새이벤트는 문항답변·유형값 없이 경로와채널만 추가했다. 자료미로딩 제품영역은열람에서제외했다. 기존 결과→설명퍼널은 내결과/받은결과를 합친 결과열람 지표로 유지한다.

37개 자동검사, Node/D1 집계동일성·순서·중복·무flow·과거이벤트 검사, 양쪽typecheck/build 통과. 실제Node API메모리DB+브라우저에서 세경로각각view1/시도1/복사1을 검증했으며 이는 합성QA수치로 소비자전환성과가 아니다. 모의API UI검사에서0%/집계대기 구분과모바일overflow없음 확인. 실구매·7일재방문·송신자/수신자귀속은 여전히미지원이며 원래목표에서 제외하지 않는다.

## GitHub 자동 검증 후속 증거

직전 공유분석 turn은 구현과검증·원격수정을 포함해 progress다. 이번에는 clean release 저장소에 자동검증workflow를 추가했고 GitHub실행34445658505 success를 확인했다. Node24.19.0/pnpm11.19.0 lockedinstall, 타입검사,37테스트,frontendbuild,Worker dry-run bundle 및7일artifact보관이실행됐다. artifact를다운로드해화면/Worker파일포함확인했다. targetHEAD54a949c5d324950c5e186aefb458feb9149dca63. 실제서비스배포·merge차단·운영DB복구검증을 의미하지 않으며 영구계정/도메인·실제주문·권한확인후기·AI키·재방문분석 등 전체 미완 범위는 유지한다.

## 로컬 D1 후기 HTTP 통합 검증

직전 연구 후보 turn은 원문 접근 증거와 공개 보류 결정을 EVIDENCE_AUDIT에 기록했으므로 progress다. 이번에는 `worker/reviews.integration.mjs`를 추가하고 Windows에서 실제 workerd·로컬 D1 HTTP 경로를 검증했다. 별도 임시 config·DB·키와 `--local`을 사용했으며 원격 DB 또는 기존 개발 DB에 쓰지 않았다. 모든 시험 인용은 TEST 가상 자료다.

검사: 인증 없는 접근 거절, 교차 출처 거절, 초안 비공개, 확인 없는 승인 거절, 전용 후기 검토 우회 차단, 승인된 발췌 공개와 내부 권한 필드 제외, 제품 보류/복구와 후기 노출 연동, 기존 후기 목적지 문구 우회 차단, 같은 revision의 동시 수정에서 성공1/충돌1, 수정 후 보류·확인 초기화, 재승인 후 Worker 재시작에도 문구와 이력 유지, 공개 철회, 오래된 승인 요청 거절, 만료 권한 승인 거절, 이력5버전 연속성. 종료 시 프로세스와 임시 DB 정리도 최종 실행에서 통과했다.

명령은 frontend build 후 `pnpm run test:worker-reviews`다. 기존 Node SQLite 대역 검사와 달리 실제 로컬 workerd/D1 바인딩을 통과한다. AI 교차 검토에서 제안한 제품 연동·목적지 우회 경로를 추가했다. 실제 Cloudflare 원격 D1, 물리 모바일, 다중 운영자 권한, 백업 복원, 실제 후기 권한과 전체 플랫폼 미완 범위는 여전히 별도다. 재시작 보존을 백업 복구로 계산하지 않는다.

GitHub의 동일 검사는 Linux에서도 통과했다. [실행34446456828](https://github.com/KRAdavid/cellpinda-rhythm/actions/runs/34446456828), commit `9bcade4893d6c09c40d36799dfca4b8c36c06335`, verify job49초 success. 기존37검사·타입·빌드·Worker dry-run과 새 로컬 D1 통합 단계를 모두 통과했다. 초기 Windows 실행에서 남은 `tmp/reviews-d1-WqMmY8`의 추가 삭제 명령은 자동 승인 정책으로 거절돼 그대로 두었다. 운영 DB와 무관한 Git 제외 시험 폴더이며, 이후 최종 검사의 임시 디렉터리 정리는 통과했다.

## 제품 비교 실물 표시 보완

제품 비교 화면을 데스크톱 첫 진입에서 확인하는 과정에서 제품 카드의 지연 이미지가 빈 영역으로 남는 것을 발견했다. 1500 제품은 선택 비교의 핵심이므로 `src/App.tsx`에서 해당 이미지의 지연 로딩을 제거하고 비동기 디코딩만 사용했다. 1440px·390px Playwright 화면에서 이미지가 `complete=true`로 실제 자연 크기 로드되고 모바일 가로 넘침 없음, 콘솔 오류 없음으로 확인했다. 이는 제품 효능·표시사항을 추가 승인한 변경이 아니다.

같은 카드에 `이 카드에서 확인한 범위`를 추가했다. 공개 공식몰 상품명과 제품 이미지에서 확인한 구성만 카드의 사실로 제시하고, 효능·권장량은 판단하지 않으며, 가격·재고·섭취 방법·주의사항은 공식몰 및 포장 표시사항에서 확인하도록 분리했다. 이 문구는 원료 자료나 연구 결과를 판매 제품의 효능으로 연결하지 않도록 하는 소비자 심리·근거 편집 검토 결과다.

변경을 포함한 release HEAD `45be87d48bebf5b991682bd51c2941d295f04b79`도 [GitHub 실행 34447124209](https://github.com/KRAdavid/cellpinda-rhythm/actions/runs/34447124209)에서 타입 검사·37개 테스트·프론트 빌드·로컬 D1 후기 통합·Worker dry-run을 모두 통과했다.

## 1500 후기 목적지 보완

공식몰 1500mg 상품 페이지에서 구매자 후기 영역이 제공되는 것을 확인해, 후기를 복제하거나 인용하지 않고 원문 목적지만 승인 데이터로 추가했다. 1500 목적지는 상품번호 27, HTTPS와 공식 호스트를 함께 검증하며 공개 문구는 동일한 일반 안내로 고정한다. 홈·제품 비교 카드에서도 1500 제품의 후기 원문 진입점을 제공한다. 공개 projection·관리자 우회 차단·export 필터·Worker 검사는 1500 목적지를 대상으로 한다. 로컬 브라우저 화면에서 후기 링크 1개, 모바일 가로 넘침 없음, 콘솔 오류 없음, 공식몰 URL을 확인했다. 실제 후기 권리 증거가 없는 인용은 여전히 공개하지 않는다.

## 구매 전 질문 모듈 후속 증거

제품 비교 아래에 확인된 사실과 공식 확인 경로를 분리한 5개 구매 전 질문을 추가했다. 1500 내용량·구성은 상품명·제품 이미지 범위로만 설명하고, 섭취법·보관·주의사항은 포장 표시사항과 공식몰로 안내한다. 리듬 체크로 용량을 추천하지 않으며 후기·연구를 완제품 효과 보장으로 연결하지 않는다. Playwright 화면에서 질문 5개, 제품 후기 링크 1개, 모바일 가로 넘침 없음, 콘솔 오류 없음을 확인했다. 실제 소비자 이해도와 구매 장벽 감소는 아직 독립 사용성 조사 대상이다.

구매 전 질문 열람은 `purchase_question_opened`, 제품 카드에서 후기 영역으로 이동한 행동은 `review_section_navigated`로 추가했다. Node·Worker 모두 허용된 질문 ID만 저장하고 개인 답변·이메일은 버린다. 38개 자동검사, 프런트·Worker 타입/빌드, 로컬 D1 후기 통합검사를 통과했다. 질문 열람은 이해도나 구매를 의미하지 않으며, 실제 주문 연동은 미완이다.

## 구매 판매처 스마트스토어 전환

제품 비교 카드, 구매 전 질문의 제품 확인 링크, 푸터와 제품 비교 OG 설명을 `https://smartstore.naver.com/cellpinda`로 전환했다. 구매 클릭 이벤트명은 유지하되 관리자 표기를 스마트스토어로 맞췄다. 연구·제품 사실의 원문 출처는 근거 보존용으로 남기고, 구매·후기 CTA는 스마트스토어로 통일했다. 스마트스토어의 현재 판매 상태·상품별 딥링크·주문 API는 별도 운영 확인이 필요하며, 링크 이동을 실제 구매로 집계하지 않는다.

## 운영 코어·배포 준비 최신 점검

`src/domain/ops-validation.ts`를 Node API와 Worker의 운영 상태 저장·복원 양쪽에 연결했다. 업무 ID·의존성·상태 전환·완료 검증·승인 연결과 개인정보 최소화를 공통 검증하며, 임의 완료나 비공개 필드가 저장·복원되지 않도록 한다. `pnpm run preflight:deploy`는 Wrangler 설정·빌드 산출물·공개 export를 모두 확인했으며, 실제 Cloudflare Secrets 5개가 없어 strict 기준은 `WAITING`이다. 최신 GitHub Actions `34487336124`은 검증·Pages·라이브 smoke에 성공했다. 이 점검은 영구 Worker 운영 배포·실제 주문·후기 권한·소비자 사용성 검증을 완료했다는 의미가 아니다.

## 자동 협업 파동 시작 보강

`startMvpSession`을 도메인 계약으로 추가해 목표 생성과 안전한 내부 파동 실행을 하나의 테스트 가능한 흐름으로 묶었다. `?view=ops`에서 목표를 생성하면 G1·E1·E2·C1·Q1을 우선순위대로 실행하고 독립 검증한 뒤, 외부 약속 작업 P1은 승인 요청과 `WAITING` 상태로 남긴다. 승인·게시·구매는 실행하지 않는다. 로컬 브라우저에서 목표 생성 직후 완료 5건·대기 1건, 새로고침 복원, 390px 가로 넘침 없음·HTTP/콘솔 오류 없음을 확인했다. 도메인 테스트는 59개로 늘었고, release HEAD `2e6a3fa`의 [GitHub 실행 34488512347](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34488512347)은 검증·Pages·라이브 smoke에 성공했다. Cloudflare Secrets가 없어 Worker 영구 배포는 계속 `WAITING`이며, 실제 주문·후기 권한·소비자 사용성 조사는 별도 입력이 필요하다.

## 재개 저장 revision 보호

여러 탭·새로고침에서 오래된 샌드박스 상태가 최신 승인 상태를 덮어쓰지 않도록 Node API·Cloudflare Worker·브라우저 저장 요청에 `X-Ops-Revision` 낙관적 충돌 검사를 연결했다. 기대 revision이 현재 값과 다르면 서버가 `409`를 반환하고 상태를 그대로 보존한다. Node·Worker 회귀검사에서 오래된 revision 거부 후 최신 revision 저장을 확인했고, 실제 로컬 브라우저에서 최초 revision `0` 저장·새로고침 복원·완료 5건/검증대기 1건·성공 후 반복 PUT 없음·콘솔 오류 없음을 확인했다. release HEAD `21f7c75`의 [GitHub 실행 34490972163](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34490972163)은 타입검사·테스트·빌드·Pages·라이브 smoke에 성공했다. 이 검증은 영구 Worker 비밀값 설정, 실제 Cloudflare D1 운영, 다중 운영자 권한, 외부 주문 연동을 완료한 것으로 계산하지 않는다.

## 정적 호스트 API 폴백

GitHub Pages처럼 Worker API가 없는 정적 호스트에서는 API 주소를 미리 호출하지 않고 빌드된 콘텐츠·운영 큐와 브라우저 임시 저장을 사용한다. Worker 동일 출처 배포 또는 `VITE_API_ORIGIN` 지정 시 API를 사용한다. 최신 Pages UI에서 정적 폴백으로 제품·TF 큐·자동 파동을 검증하며, 정적 호스트의 예상 404/405 콘솔 잡음이 없는지 확인한다. 이 변경은 영구 Worker·D1 운영 연결을 완료한 것으로 계산하지 않는다.

세부 화면 증거와 측정값은 [LIVE_UI_QA.md](LIVE_UI_QA.md)에 보관했다. 제품 1440px·390px, 운영 1440px에서 가로 넘침과 콘솔 오류가 모두 없었고, 운영 목표 생성 후 5개 내부 업무 자동 실행·P1 승인 대기·TF 의사결정 기록을 화면에서 확인했다.

## 사람 회의 기록과 pulse 안건 후속 증거

운영 MVP의 TF 의사결정 로그에 사람이 작업별 반대 의견·재검토 조건을 입력하는 폼을 연결했다. 자동 생성 안전 경계는 `guardrail`, 사람이 입력한 기록은 `human-meeting`으로 구분하고 `dissentRecordedAt`을 함께 저장한다. `ops-validation`은 허용된 상태·시각과 10자 이상 의견만 통과시키며, 서버·브라우저 저장과 JSON 승인 보고서가 같은 구조를 사용한다. canonical 운영 큐의 `VERIFYING`·`WAITING` 작업은 `다음 TF 회의 안건` 패널에서 담당자·검증자·다음 조치를 보여 준다.

`pnpm test` 66개, 타입검사, production build, 로컬 API와 공개 Pages의 Playwright 데스크톱·모바일 검증이 통과했다. 공개 URL 검증은 page 200, claims 14, masterRecords 8, products 1, queueTasks 13, waitingTasks 4, `smartStoreOnly: true`, `removed750: true`, `provenance: matched`를 확인했다. 최신 커밋 `93e89b1`에 대한 [GitHub Actions 34510974167](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34510974167)은 verify·Pages·Worker 구성 점검·라이브 smoke를 성공시켰다. Worker 실제 배포 단계는 Cloudflare 운영 Secrets가 없어 실행되지 않았으며, 이 외부 입력 게이트와 B2·B3·B4·E1 검증은 완료로 계산하지 않는다.

## TF 입력 게이트 체크리스트 후속 증거

canonical 그래프의 B2·B3·B4·C2·E1에 `requiredInputs`를 추가하고, `tf:pulse` 결정·`inputGates`·공개 `operations-queue.json`·운영 화면의 다음 TF 회의 안건에 같은 목록을 연결했다. 배포 전 검증은 입력 대기 작업의 체크리스트 누락을 거부하며, 공개 Pages Playwright 검증은 데스크톱·390px에서 체크리스트 8개 표시, 안건 패널, 가로 넘침 0, 콘솔·페이지 오류 0을 확인했다. 커밋 `3817497`의 [GitHub Actions 34511986493](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34511986493)은 Goal Contract·TF pulse·공개 export·Pages·라이브 smoke를 성공시켰다. 체크리스트는 준비 자료를 구체화하지만 실제 승인·권한·비밀값·주문 응답을 대신하지 않으므로 B2·B3·B4·C2·E1 상태는 계속 사람 입력 대기로 유지한다.

## TF pulse heartbeat 자동 재배포 증거

`tf-pulse.yml`에 안전한 heartbeat 저장과 명시적 Pages deploy dispatch를 연결했다. 수동 [TF decision pulse 34513525751](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34513525751)이 pulse 검증·heartbeat 생성·저장·artifact 업로드를 성공시키고 커밋 `0064ff8`을 만들었으며, 이어진 [Pages 배포 34513547183](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34513547183)이 공개 export·Pages·라이브 smoke를 성공시켰다. 초기 dispatch 권한 오류는 커밋 `d5ab89e`에서 `actions:write`를 추가해 해결했다. heartbeat에는 pulse 시각·상태 지문·6개 역할 ID·라벨·상태·필요 입력만 남기고 원문 경로·비밀값·사람 반대 의견은 저장하지 않는다.

## 공개 TF pulse 패킷 후속 증거

`sync-public-data.mjs`가 안전한 `public/data/tf-pulse.json`을 생성하고 운영 화면에 `회의 안건 JSON` 링크를 노출한다. 패킷은 목표 상태·작업별 담당 역할·필요 입력·다음 조치·회의 안건만 포함하며, 내부 증거 원문·개인정보·비밀값은 포함하지 않는다. 공개 Pages 라이브 검증은 pulse endpoint HTTP 200, `public_tf_pulse` 모드, `회의 안건 JSON` 링크, `다음 TF 회의 안건` 패널을 확인했다. 1440px·390px Playwright 검증에서 가로 넘침 0, 콘솔 오류 0, 페이지 오류 0을 확인했다.

pulse 패킷 구현 커밋 `ca612c2`의 [GitHub Actions 34514541733](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34514541733)과 문서 반영 커밋 `80647c9`의 [GitHub Actions 34514900764](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34514900764)은 Goal Contract·TF pulse·공개 export·Pages·라이브 smoke를 모두 성공시켰다. `pnpm run validate:live -- https://kradavid.github.io/cellpinda_GABA`는 page 200, claims 14, masterRecords 8, products 1, queueTasks 13, waitingTasks 4, `smartStoreOnly: true`, `removed750: true`, `provenance: matched`를 확인했다. 공개 패킷은 소비자에게 안전한 운영 진행 상황을 보여 주지만, B2·B3·B4·C2·E1의 사람 승인·권한·비밀값·주문 응답을 자동으로 완료시키지 않는다.

## 공개 pulse 스키마 경계 후속 증거

공개 export와 라이브 smoke에 pulse 입력 게이트·회의 안건의 허용 키를 고정하고, 각 상태 집계가 현재 canonical 업무 그래프 전체를 덮는지 검증했다. 내부 `evidence`·`dissent`·경로·토큰이 공개 패킷으로 유입되면 배포 검증이 실패한다. 커밋 `c52807b`의 [GitHub Actions 34515606289](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34515606289)은 새 스키마 검사까지 포함해 Goal Contract·공개 export·Pages·라이브 smoke를 성공시켰고, 라이브 Playwright 1440px·390px 검증도 같은 허용 키와 상태 집계를 확인했다.

같은 라이브 검증에서 소비자 공개 화면 `?view=products#products`의 1440px·390px 레이아웃도 확인했다. 두 화면 모두 스마트스토어 링크 4개, 연구·후기 흐름, 750 미노출, 가로 넘침 0, 콘솔·페이지 오류 0을 기록했다. 소비자 언어 요약은 연구 결과와 완제품 적용 범위를 분리한 상태로 유지된다.

## 2026-09-11 티저 공개 접근성 재검토

제공된 티저 URL을 비로그인으로 다시 요청해 `200 OK`, 제목 `발효가바 — 멈추지 않는 밤`, 84초 재생 인터랙션, 장면 PNG 5종의 `200 image/png` 응답을 확인했다. 페이지는 파일 영상이 아닌 HTML/CSS/JS 브라우저 애니메이션으로 분류되며, 전체 자막·대본·권리·표시사항·CTA 승인 증거는 아직 없다. 이에 따라 `data/teaser-manifest.json`의 `HOLD`와 B4 `WAITING`을 유지하고, 공개 CTA·광고·SNS에 자동 연결하지 않았다. 상세 결과는 [TEASER_VIDEO_EXPOSURE_REVIEW.md](TEASER_VIDEO_EXPOSURE_REVIEW.md)에 기록했다.

## 2026-09-11 연구 카드 체험 의향 문장 보강

승인 연구 8건의 사실 요약·연구 한계·완제품 적용 범위는 유지하고, `hopefulTakeaway`만 소비자 행동 흐름에 맞춰 정리했다. 각 문장은 연구 조건과 한계를 먼저 확인한 뒤 셀핀다 가바 1500의 구성·표시사항을 살펴보고 내 루틴에 더해 볼지 선택하도록 안내한다. `validate-research-copy`는 희망 문장에 제품 발견 단어와 확인·선택 행동이 있는지도 검사해 이 흐름의 퇴행을 차단한다. 특정 연구가 완제품 효과를 보장하거나 연구 용량을 섭취 지침으로 바꾸지 않으며, 전체 build에서 금지 표현·필수 필드를 다시 검사한다. Goal Contract·티저 매니페스트·운영 보드의 기준일도 2026-09-11 검토 시점으로 맞췄다. `validate-tf-pulse`에는 필수 역할군 존재 검사도 추가해 TF 구성을 보존한다.

## 2026-09-11 pulse 역할군 공개 상태 보강

자동 `tf-pulse`가 canonical 업무 그래프와 Goal Contract의 역할명을 대조해 6개 필수 역할군을 계산하고, `roleCoverage`로 상태를 기록하도록 보강했다. 공개 `tf-pulse.json`에는 역할 ID·소비자용 라벨·`present` 상태만 export하며 개인·자격·비공개 증거는 포함하지 않는다. 공개 export·라이브 smoke도 역할군 순서·상태·형식을 검사한다. 이번 변경은 TF 책임 구조와 회의 안건의 지속성을 강화하지만 실제 외부 전문가 섭외나 승인 완료를 의미하지 않는다.

## 2026-09-11 운영 화면 역할군 확인

공개 운영 큐가 `roleCoverage`를 함께 받아 현재 TF 역할군을 화면에 표시하도록 연결했다. 390px에서도 역할 칩이 줄바꿈되어 보이도록 반응형 스타일을 추가했으며, 큐와 공개 pulse의 역할 ID·상태가 다르면 export·라이브 검증이 실패한다. `pnpm test` 66건과 production build를 통과한 뒤 Pages 배포·라이브 smoke에서 역할군 6개와 5개 회의 안건을 다시 확인했다. 역할군 표시는 책임 구조의 가시성을 높이는 장치이며 실제 전문가 자격·섭외를 의미하지 않는다.

생성형 MVP 검증에도 같은 레지스트리를 연결해 한 문장 목표로 만든 TF의 팀·스트림이 6개 필수 역할군을 포함하는지 확인한다. 역할 정의가 canonical pulse와 생성형 Goal Contract에서 갈라지면 `validate:ops`가 배포 전에 실패한다.

## 2026-09-11 최신 배포·라이브 재감사

커밋 `4def650`에서 생성형 MVP 검증(`validate:ops`)도 `data/tf-role-registry.json`의 6개 필수 역할군을 확인하도록 연결했다. `pnpm run validate:ops`, production build, 66개 회귀 테스트가 통과했으며 [GitHub Actions 34521776464](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34521776464)의 verify·Pages·라이브 smoke가 모두 성공했다. Worker 배포 job은 Cloudflare 운영 Secrets가 없는 상태를 그대로 보고하고 실제 배포 단계는 실행하지 않았다.

배포된 [공개 사이트](https://kradavid.github.io/cellpinda_GABA/)와 [운영 MVP](https://kradavid.github.io/cellpinda_GABA/?view=ops)를 다시 확인해 page 200, 승인 연구 8건, 주장 14건, 제품 1종, 운영 큐 13개, `DONE=8`, `VERIFYING=1`, `WAITING=4`, Smart Store only, 750 제거, provenance 일치를 확인했다. 라이브 `tf-pulse.json`과 `operations-queue.json`은 마케팅·소비자심리, 연구·근거, 제품·표시, 스토리·UX·프런트, 데이터·판매처, QA·감사 6개 역할군을 같은 순서와 `present` 상태로 제공한다.

이 재감사는 역할 책임 구조와 배포 재현성을 증명하지만 실제 외부 전문가 섭외, B2 표시 승인, B3 후기 재게시 권한, B4 티저 공개 승인, C2 Cloudflare 운영 연결, E1 실제 주문 대사를 완료한 증거가 아니다. 해당 입력이 들어오기 전까지 자동 pulse는 회의 안건·필요 입력만 갱신하고 공개·구매·법적 약속은 실행하지 않는다.

## 2026-09-11 독립 검증자 분리 guard 재감사

canonical 업무 그래프·TF pulse·공개 운영 큐·생성형 MVP의 모든 작업에서 실행 담당자와 검증자가 같은 문자열이 되지 않도록 guard를 추가했다. `goal:next`, `validate:tf-pulse`, `validate:ops`, 공개 export와 라이브 smoke가 각각 이 조건을 검사하므로 독립 검토 역할이 빠지거나 담당자와 합쳐지면 배포가 실패한다. 커밋 `753bc84`의 [GitHub Actions 34523718416](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34523718416)이 새 검증을 포함한 Goal Contract·연구 문구·테스트·Pages·라이브 smoke를 성공시켰다.

현재 라이브 pulse는 역할군 6개, 회의 참여자 2명씩의 분리된 담당·검증 구조, `VERIFYING=B2`, `WAITING=B3·B4·C2·E1`을 유지한다. 로컬 자료·주문 재감사에서도 새 승인 입력은 발견되지 않았으므로 상태를 자동 승격하지 않았다. 이 guard는 역할 배정의 독립성을 확인하는 규칙이며 실제 외부 전문가 자격·섭외나 B2·B3·B4·C2·E1 완료를 의미하지 않는다.

## 2026-09-11 heartbeat 수동 재현성 재감사

`tf:pulse:heartbeat`가 CI가 먼저 만든 `tf-pulse.json`에만 의존하던 경로를 보완했다. 인자를 생략하면 최신 `tf-pulse`를 내부적으로 생성해 안전한 `data/tf-pulse-heartbeat.json`으로 저장하고, 명시한 입력 경로가 없으면 오류를 그대로 반환한다. 로컬에서 인자 없는 명령을 직접 실행해 `GL-2026-CELL-GABA-001`, 입력 게이트 4개, 동일한 상태 지문과 6개 역할군이 기록되는 것을 확인했다. 공개 export·pulse·66개 회귀 테스트·타입 검사도 함께 통과했다.

커밋 `8104133`의 [GitHub Actions 34525146466](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34525146466)은 검증·Pages·라이브 smoke를 성공시켰다. 라이브 확인값은 page 200, claims 14, masterRecords 8, products 1, queueTasks 13, waitingTasks 4, Smart Store only, 750 제거, provenance 일치다. Worker 단계는 Cloudflare 운영 Secrets가 없어 건너뛰었으며, 이 변경도 B2·B3·B4·C2·E1의 사람 입력과 실제 운영 권한을 대신하지 않는다.

## 2026-09-11 통합 목표 감사 자동화

`scripts/audit-goal.mjs`와 `pnpm run audit:goal`을 추가해 Goal Contract, TF 역할 레지스트리, canonical 업무 그래프, 샌드박스 MVP, 공개 마스터 인덱스, 외부 입력 게이트를 한 번에 판정한다. 현재 로컬 결과는 `coreValid=true`, 역할군 `6/6`, `DONE=8`, 전체 `IN_PROGRESS_WITH_GATES`이며 B2는 `VERIFYING`, B3·B4·C2·E1과 티저 경계는 `WAITING`으로 남는다. 작업이 모두 충족될 때만 `COMPLETE`가 되도록 설계해 대기 입력을 완료로 오인하지 않는다.

커밋 `0395d12`의 [GitHub Actions 34526316424](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34526316424)는 통합 감사 단계와 JSON artifact 업로드를 성공시켰고, 라이브 smoke도 page 200, claims 14, masterRecords 8, products 1, queueTasks 13, waitingTasks 4, Smart Store only, 750 제거, provenance 일치를 확인했다. 이 감사는 전체 목표의 현재 위치를 자동으로 보고하는 장치이며, 외부 승인·권한·Cloudflare Secrets·실주문 응답이 없는 상태를 완료로 승격하지 않는다.

## 2026-09-11 배포 준비도와 C2 경계 보강

통합 감사가 `scripts/check-deploy-readiness.mjs` 결과도 함께 읽도록 보강했다. Cloudflare 필수 Secrets와 Worker 산출물이 준비되지 않았는데 canonical 그래프의 C2가 `DONE`으로 바뀌면 감사가 오류로 판정하고, 현재 상태에서는 `deployment-readiness=WAITING`과 누락된 5개 Secret 이름을 다음 조치로 남긴다. 정적 Pages가 정상 공개된 사실을 영구 Worker·D1 운영 완료로 오인하지 않는 경계다.

## 2026-09-11 로컬 입력과 전체 목표 감사 연결

`pnpm run audit:goal:local`(JSON은 `pnpm run audit:goal -- --local-inputs --json`) 옵션을 추가해 로컬 완제품·주문 감사 결과를 같은 Goal Audit 패킷에 연결했다. 지정 자료에서 완제품 관련 파일 7건(완제품 후보 5건, 벌크 원료 라벨 1건 제외)을 확인해 `local-material-inputs=MET`으로 기록했지만, B2 독립 표시 검증은 계속 `VERIFYING`이다. 주문 폴더는 1,086개 파일을 스캔했고 CSV 77개에서 GABA1500 121개 수량과 과거 GABA750 72개 수량을 식별했으나, 상태·취소·환불 필드가 없어 `local-order-inputs=WAITING`으로 남겼다. 750 자료는 내부 과거 분류에만 남고 공개 제품·매출 집계에는 포함하지 않는다.

이 옵션은 개인정보·원문 행·로컬 경로를 저장하거나 공개하지 않으며, 가장 최근 파일 수정 시각만 회의용 메타데이터로 기록한다. CI 기본 감사와 공개 export는 외부 폴더 없이도 동일하게 재현된다. 로컬 자료의 발견이나 과거 수량은 표시 승인·실구매·환불 완료·외부 전문가 참여를 증명하지 않으므로 자동 승격하지 않는다.

## 2026-09-11 pulse 중복 배포 경계 보강

GitHub `GITHUB_TOKEN`으로 만든 heartbeat push는 후속 workflow를 자동 실행하지 않는다는 점을 재현했다. 따라서 `TF decision pulse`는 `actions: write` 권한으로 `deploy.yml`을 한 번 명시적으로 dispatch하되, heartbeat 커밋에 `[skip ci]`를 붙여 push 기반 중복 실행을 차단하도록 정리했다. 기존 중복 실행은 concurrency에서 취소될 수 있었고, 새 경계는 heartbeat 1회와 배포 1회의 관계를 보존한다. `scripts/validate-tf-pulse-workflow.mjs`를 build에 연결해 이 순서·권한·중복 방지 조건이 되돌아가면 배포 검증이 실패하도록 고정했다. 수정된 workflow는 pulse 수동 실행 [34529573506](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34529573506)과 heartbeat 후 단일 배포 dispatch [34529597308](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34529597308)로 재현했으며, heartbeat 커밋 `865ea78` 이후 중복 push 배포가 발생하지 않았다.

## 2026-09-11 공개 목표 감사 패킷과 라이브 재검증

공개 운영 큐 상단에 `목표 감사 JSON` 링크를 추가하고 `scripts/sync-public-data.mjs`가 Goal Contract·역할 커버리지·상태 카운트·논문/제품/TF pulse 마일스톤·현재 입력 게이트를 개인정보와 내부 경로 없이 생성하도록 보강했다. `validate-public-export`, `validate-live-public`, `check-deploy-readiness`가 이 패킷을 큐·pulse·canonical 그래프와 대조한다. 공개 패킷은 `IN_PROGRESS_WITH_GATES`, 게이트 5건, 연구 8건, Smart Store `gaba1500` 1건을 보고하며, 실제 외부 승인·전문가 자격·주문 완료를 완료로 승격하지 않는다.

커밋 `7302cef`·`0421ef2`의 [GitHub Actions 34532696449](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34532696449)는 verify·Pages 게시·라이브 smoke를 모두 성공시켰다. 로컬 `pnpm run validate:live`도 page 200, claims 14, masterRecords 8, products 1, queueTasks 13, waitingTasks 4, auditGates 5, pulse 상태 지문 일치를 확인했다. Cloudflare Secrets 5개가 없어 Worker 단계는 구성 보고 후 건너뛰었고, C2·B2·B3·B4·E1은 계속 입력·승인 대기다.

## 2026-09-11 공개 게이트 입력 일치 재검증

강화한 라이브 smoke가 B2 `VERIFYING` 작업의 원본 `requiredInputs` 3개가 공개 operations queue에서 누락된 것을 발견했다. `sync-public-data.mjs`가 `VERIFYING`을 포함한 모든 작업에 입력 체크리스트를 보존하도록 수정했고, 라이브 검증은 각 게이트의 제목·상태·담당자·독립 검증자·입력·결정 모드·다음 조치를 queue와 `goal-audit.json` 사이에서 대조한다. 커밋 `cd065ca`의 [GitHub Actions 34533311676](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34533311676)은 verify·Pages·라이브 smoke를 성공시켰으며, B2 입력 3개·감사 게이트 5건·pulse 지문 일치를 확인했다. 이 검사는 자료 승인 자체를 대신하지 않으며 B2는 계속 `VERIFYING`이다.

## 2026-09-11 로컬 감사 사이클 단축

`scripts/run-local-audit-cycle.mjs`와 `pnpm run audit:goal:local:json`을 추가해 완제품 자료·주문 파일 감사와 전체 Goal Audit를 한 번에 실행하고, 결과를 개인정보·원문 행·로컬 경로가 없는 `tmp/local-goal-audit.json`에 저장한다. 현재 실행은 `local-material-inputs=MET`, `local-order-inputs=WAITING`, 전체 `IN_PROGRESS_WITH_GATES`이며 `public/data`는 변경하지 않았다. 이 자동화는 회의 패킷 생성을 줄여 주지만, 현행 표시 승인·실주문·취소·환불·후기 권한을 자동 완료로 승격하지 않는다.

## 2026-09-11 TF pulse 상태 변화 추적

`write-tf-pulse-heartbeat.mjs`가 직전 pulse의 상태 지문을 비교해 `stateChanged`를 기록하도록 보강했다. 이 값은 공개 operations queue·TF pulse·목표 감사·운영 화면에 같은 boolean으로 전달되어 새 상태 변화와 반복 안건을 구분한다. 현재 heartbeat는 변화 없음으로 검증됐고, 임시 직전 지문을 사용한 재현에서 변화 감지 경로도 통과했다. `validate:tf-pulse`·`validate:public`·production build가 모두 성공했으며, 자동 표시는 외부 승인·게시·구매를 수행하지 않는다.

## 2026-09-11 연구 카드 순서와 라이브 배포 재검증

연구 카드의 제품 정보 링크를 연구 결과 요약 뒤에서 조건·비교·한계·완제품 적용 범위를 확인한 뒤로 이동했다. “연구와 제품 정보는 별개”라는 문구와 제품 표시사항 확인 안내를 유지해, 소비자에게 체험을 고려할 다음 단계를 제시하면서 연구 결과를 완제품 효과의 직접 증거로 읽는 흐름을 줄였다. 커밋 `21967d2`의 [GitHub Actions 34536865248](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34536865248)은 verify·Pages·라이브 smoke를 성공시켰다. 라이브는 page 200, 연구 8건, 주장 14건, 제품 1개, 운영 작업 13개, 대기 작업 4개, 감사 게이트 5개, Smart Store only, 750 제거, provenance 일치를 확인했다.

이번 변경은 화면 순서와 소비자 언어를 보강한 것이며 B2 표시 승인, B3 후기 권한, B4 티저 공개 승인, C2 Worker 운영 연결, E1 실구매 대사를 완료로 승격하지 않는다.

## 2026-09-11 공개 제품 출처·이동 경로 Smart Store 통일

제품 구성·발효 설명의 공개 출처 두 건을 스마트스토어 제품 페이지로 바꾸고, `validate-public-export`·`validate-live-public`에 예전 공식몰 도메인·명칭 재유입 차단을 추가했다. 제품 카드·구매 전 질문·후기 원문·발효 설명은 같은 Smart Store 목적지를 사용하며, 공식몰 URL은 공개 export에서 제거하고 내부 이미지·증거 문서의 provenance로만 보존한다. 순차 `sync:data`·공개 export·연구 문구 검증과 66개 회귀 테스트가 통과한 뒤 라이브 Pages에서 제품 1개·750 제거·Smart Store only·provenance 일치를 재확인한다.

이 변경은 소비자 이동 경로를 통일하지만 현행 표시사항 승인·후기 재게시 권한·실구매 대사·Worker 운영 연결을 완료시키지 않는다.

## 2026-09-11 공개 중간 확인 진입 경로 보강

소비자 사이트 푸터에 `TF 운영판` 링크를 추가해 공개 운영 큐·Goal Contract 샌드박스·목표 감사 패킷으로 바로 이동할 수 있게 했다. 큐는 개인정보 없는 역할·상태·필요 입력만 공개하며, 본문 소비자 흐름에는 운영 세부를 강제하지 않는다. 로컬 테스트·production build와 공개 export 검증을 통과한 뒤 Pages 라이브 smoke에서 링크 도달을 확인한다.

## 2026-09-11 공개 운영 큐 업무 카드 노출 보강

공개 운영 큐가 역할군 요약에서 멈추지 않고 canonical 업무 그래프의 13개 작업을 카드로 표시하도록 보강했다. 각 카드에는 현재 상태, 결정 문장, 실행 담당자, 독립 검증자, 필요한 입력, 대기 이유, 다음 조치가 함께 노출되어 중간 회의에서 작업별 의사결정과 다음 행동을 바로 확인할 수 있다. 반응형 그리드는 데스크톱 4열·태블릿 2열·모바일 1열로 동작한다.

커밋 `8108d46`의 [GitHub Actions 34539349077](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34539349077)은 verify·Pages 게시·라이브 smoke를 성공시켰다. 라이브 검증은 page 200, 연구 8건, 주장 14건, 제품 1개, 운영 작업 13개, 대기 작업 4개, 감사 게이트 5개, Smart Store only, 750 제거, provenance 일치를 확인했고, 번들에서 `업무별 현재 상태` 카드 마커도 확인했다. Worker 단계는 Cloudflare Secrets가 없어 건너뛰었으며, 카드 노출은 B2·B3·B4·C2·E1 승인이나 실제 전문가 참여를 대신하지 않는다.

## 2026-09-11 공개 큐 갱신 실패 경계 보강

운영 화면이 공개 큐·목표 감사 스냅샷을 다시 읽지 못할 때 기존 큐를 지우지 않고 마지막 확인값을 유지하도록 변경했다. 갱신 실패 메시지를 화면에 표시하고 성공 시 자동으로 해제해, 회의 참가자가 빈 화면을 최신 완료 상태로 오인하지 않게 했다. 초기 로드 실패는 별도 상태 메시지로 드러내며 60초 주기와 수동 새로고침은 계속 동작한다.

커밋 `3374ec3`의 [GitHub Actions 34539961453](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34539961453)은 66개 테스트·Goal Contract·연구 문구·TF pulse·공개 export·Pages 게시·라이브 smoke를 성공시켰다. 이 변경은 데이터 신선도 표시를 보완하는 것이며, 외부 승인 게이트나 Worker 운영 권한을 자동 충족시키지 않는다.

## 2026-09-11 공개 큐 마지막 성공 읽기 시각 표시

갱신 실패 경계에 마지막 공개 큐를 성공적으로 읽은 시각을 함께 표시하도록 보강했다. 운영 회의에서 화면에 남은 큐가 최신 스냅샷인지 확인할 수 있고, 초기 로드 실패는 성공 읽기 시각이 없음을 명확히 알린다. 성공적인 재요청이 완료되면 오류 표시와 이전 시각은 즉시 갱신된다.

커밋과 다음 Pages 배포 검증은 변경 후 기록한다. 이 관찰성 보강은 큐 상태를 설명하는 기능이며 외부 게이트·전문가 승인·Worker 운영 연결을 완료시키지 않는다.

## 2026-09-11 로컬 자료 변경 감시 자동화

`pnpm run audit:watch`와 `scripts/watch-local-audit.mjs`를 추가해 완제품·주문 매니페스트의 지정 폴더를 감시하고 파일 변경 후 750ms debounce로 로컬 감사 사이클을 재실행하도록 했다. 초기 실행과 감시 시작을 실제 자료 폴더에서 확인했고, 임시 fixture의 `orders.csv`를 수정했을 때 `변경 감지` 두 번째 감사 사이클이 실행되는 것도 재현했다. 결과는 `tmp/local-goal-audit.json`에만 기록되며 공개 export는 바뀌지 않는다. 현재 감사 결과는 완제품 자료 `MET`, 주문 자료 `WAITING`을 유지한다.

이 자동화는 새 자료를 빠르게 회의 패킷에 반영하지만 B2 표시 승인·E1 실구매 대사·후기 권한을 자동 완료로 승격하지 않는다. 로컬 경로·원문 행·개인정보는 CI와 공개 번들로 이동하지 않는다.

## 2026-09-11 로컬 감사 중간 확인 API 연결

로컬 Node API에 `GET /api/ops/local-audit`를 추가해 watcher가 만든 `tmp/local-goal-audit.json`을 비공개 요약으로 운영 화면에 연결했다. loopback 요청만 허용하고 완제품 후보·자료 누락·주문 파일 수·1500 과거 집계·로컬 판정만 투영하며, 원문 행·개인정보·경로·해시 같은 입력 세부는 응답에서 제거한다. 운영 화면은 이 요약을 60초마다 확인하고, 스냅샷이 없거나 갱신에 실패하면 마지막 요약을 보존하면서 watcher 실행을 안내한다. GitHub Pages는 `apiEndpoint`가 비어 요청 자체를 만들지 않는다.

서버 테스트에서 실제 요약·누락 파일 응답과 비공개 필드 제거를 확인했고, 로컬 감사 사이클을 연속 실행해 같은 입력에서는 `localStateChanged=false`가 유지되는 것도 확인했다. `pnpm test` 67건과 production build를 통과했다. 이 연결은 로컬 입력을 회의에서 빠르게 확인하는 관찰성 보강이며 B2 표시 승인·E1 실구매 대사·B3 후기 권한·Cloudflare 운영 연결을 자동 완료하지 않는다.

## 2026-09-11 상태별 회의 선택지와 감사 패킷 일치

`tf-pulse`가 활성 작업 상태에 따라 두 개의 결정 선택지와 각각의 판정 기준을 생성하도록 보강했다. `VERIFYING`은 수락→DONE 또는 보완→REWORK, `WAITING`·`BACKLOG`는 보류 유지 또는 입력 충족 후 READY를 제시해 담당자와 독립 검증자가 회의에서 다음 상태를 토론할 수 있게 한다. `READY`·`RUNNING`·완료 상태에도 샌드박스·검증 전달·증거 보존 경로를 같은 구조로 제공한다.

공개 `tf-pulse.json` 회의 안건과 `goal-audit.json` 게이트에 선택지를 함께 export하고, `validate-public-export`·`validate-live-public`가 상태별 ID 순서, 기준 배열, 게이트와 pulse 간 일치를 검사한다. 운영 화면의 공개 목표 감사 카드도 게이트별 선택지를 표시한다. 선택지는 자동 상태 변경이 아니라 사람 회의의 판정 기록을 위한 구조이며, 외부 승인·후기 권한·실주문 대사를 대신하지 않는다.

운영 화면은 선택지 라벨을 먼저 노출하고 `판정 기준 보기`에서 각 선택지의 확인 항목을 펼쳐 읽도록 구성했다. 따라서 회의 참가자는 전체 게이트를 빠르게 훑은 뒤 필요한 근거 기준만 확인할 수 있다.

## 2026-09-11 Observe → Adapt → Close or Continue 루프

설계서의 관찰·적응·종료/계속 요구를 pulse 데이터 계약으로 연결했다. 활성 작업이 없으면 `close`, 사람 입력 또는 독립 판정이 필요하면 `human-gate-monitor`, 실행 가능한 작업이 있으면 `continue-execution`, 그 밖에는 `reassess-next-cycle`을 계산하고 6시간 뒤 `nextReviewAt`과 `nextAction`을 기록한다. 이 값은 pulse 원본과 heartbeat에서 검증한 뒤 공개 큐·목표 감사·운영 화면에 같은 값으로 전달된다. 동일 상태에서 heartbeat가 유지되면 기존 재검토 시각을 보존해 자동 주기가 승인 대기 중에도 계속 관찰하도록 했으며, 사람 승인·외부 게시·구매를 자동 완료로 바꾸지는 않는다.

수동 [TF decision pulse 34544753916](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34544753916)으로 이 경계를 재현했다. 계약 검증·pulse JSON 생성·안전 heartbeat 저장이 성공했고, heartbeat 커밋 뒤 [단일 Verify and deploy 34544768345](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34544768345)가 실행되어 Pages 게시와 라이브 smoke까지 성공했다. 원격 `main`은 heartbeat 갱신 커밋 `95d0b32`로 fast-forward 되었으며, 같은 상태에서 `human-gate-monitor`와 기존 재검토 시각이 공개 queue·pulse·audit에 일치한다. Cloudflare Secrets가 없는 상태에서 Worker job은 구성 보고만 수행하고 영구 Worker 배포는 건너뛴다.

## 2026-09-11 독립 검토 증거 참조 게이트 보강

운영 MVP의 `VERIFYING` 검토 입력에 확인한 산출물·공개 자료 참조를 추가했다. 검토자는 수락 기준과 메모만 제출할 수 없고, 현재 작업이 만든 `sandbox-output` 지문을 모두 참조에 포함해야 `independent_review`로 전환된다. `opsStateIssue`도 저장·복원된 검토 기록에서 같은 지문이 빠지면 거부하도록 연결했다. 운영 화면은 작업 증거를 줄바꿈 목록으로 미리 채우고, 검토자가 실제로 대조한 추가 자료를 함께 남길 수 있게 했다. 새 회귀 테스트 2건을 포함한 전체 69개 테스트가 통과했으며, 이 변경은 샌드박스 증거의 추적성을 높이는 장치이지 실제 외부 전문가의 검토·제품 표시 승인·Cloudflare 운영 권한을 대신하지 않는다.

## 2026-09-11 관리자 역할별 승인 경계 보강

관리자 API에 선택형 `ADMIN_ROLE_TOKENS` 정책을 연결해 편집자·검토자·승인자 토큰을 실제 권한으로 분리했다. 토큰으로 역할을 판별하고, 편집자는 초안·문구 편집, 검토자는 보류·재검토, 승인자는 공개 승인만 수행한다. 기존 `ADMIN_TOKEN`은 장애 대응용 운영자 권한으로 유지하며, `/api/admin/session`이 현재 역할과 권한을 운영 화면에 표시한다. Node 로컬 API에서 권한 없는 요청이 저장으로 이어지지 않는지 함께 회귀 검증했고 Worker와 동일한 정책을 적용했다. 역할별 토큰이 배포 Secret으로 설정되기 전까지는 기존 운영자 키 호환 모드이며, 외부 전문가 참여·Cloudflare Secrets 입력 자체는 여전히 사람 승인 게이트다.

`pnpm test` 71개, `pnpm run typecheck`, `pnpm run build`, Worker dry-run bundle 검증을 통과했다. 이 변경은 실행 책임 분리를 코드 경계로 올린 것이며 B2 표시 승인·B3 후기 권한·B4 티저 권리·C2 실제 Secrets·E1 실주문 대사를 완료로 승격하지 않는다.

## 2026-09-11 역할 Secret 사전 검증 보강

`check-deploy-readiness.mjs`가 선택형 `ADMIN_ROLE_TOKENS`를 설정한 환경에서 편집자·검토자·승인자 세 키의 존재·길이·중복을 비밀값 없이 검사한다. 불완전한 역할 구성이면 strict 배포 전에 실패하고, 미설정 환경은 기존 `ADMIN_TOKEN` 호환 모드로 구분된다. 부분 구성과 세 역할 구성 모두를 실제 preflight 명령으로 확인했으며, 현재 운영 환경은 필수 Cloudflare Secret 5개가 없어 `WAITING`이다.

## 2026-09-11 TF 회의 정족수 계약 보강

MVP Goal Contract의 회의 프로토콜에 정족수 규칙을 추가했다. 내부 작업은 실행 담당자와 독립 검증자의 2인 확인을 기본으로 하고, 공개·외부 약속은 해당 책임자와 TF 리드가 추가 확인한다. 운영 화면에 규칙을 표시하고 `validate:ops`와 도메인 테스트에서 독립 검증자 문구가 계약에 포함되는지 확인한다. 자동 pulse는 사람 정족수를 대신하지 않으며 B2·B3·B4·C2·E1의 외부 게이트 상태는 유지한다.
