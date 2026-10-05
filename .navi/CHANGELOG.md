# Project Changelog

## 모바일 하단 콘텐츠 점진 렌더링 고도화 — 98c59eb — 2026-10-05

- 국내외 활용·발효·성장·전문가 영상·출처·공유 섹션에 `content-visibility:auto`와 예약 높이를 적용해 장문의 공개 안내서가 하단 콘텐츠를 필요한 시점에 렌더링하도록 보완했다.
- 연구 카드의 IntersectionObserver 기반 활성 주제 연결과 제품 독립 공개 경계는 유지했다. UI 계약·typecheck·127 tests·production build/performance, PR #273 checks, main workflow 37246552896, Pages·라이브 smoke·release status와 공개 validator를 통과했다. Worker는 STATIC_ONLY로 건너뛰었다.
- NAVI는 USER_DECISION, 완료 게이트는 NOT_READY를 유지한다. 실제 브라우저 성능 trace와 대표 실기기 검증은 외부 조건으로 남긴다.

증적: E-LOCAL-BUILD-PROGRESSIVE-PUBLISHING-20261005, E-UI-CONTRACT-PROGRESSIVE-PUBLISHING-20261005, E-DEPLOY-PIPELINE-PROGRESSIVE-PUBLISHING-20261005, E-LIVE-PUBLIC-PROGRESSIVE-PUBLISHING-20261005.

## 외부 미디어 연결 품질 고도화 — 7eef131 — 2026-10-05

- 공개 GABA 안내서 진입 HTML에 YouTube 썸네일 preconnect와 영상·썸네일 DNS prefetch를 추가해 전문가 영상 선택 흐름의 연결 준비를 보완했다.
- 기존 lazy loading과 제품 독립 공개 경계는 유지했다. UI 계약·typecheck·127 tests·production build/performance, PR #271 checks, main workflow 37245784203, Pages·라이브 smoke·release status와 공개 validator를 통과했다. Worker는 STATIC_ONLY로 건너뛰었다.
- NAVI는 USER_DECISION, 완료 게이트는 NOT_READY를 유지한다. 실제 브라우저 네트워크 waterfall과 대표 실기기 검증은 외부 조건으로 남긴다.

증적: E-LOCAL-BUILD-MEDIA-HINTS-20261005, E-UI-CONTRACT-MEDIA-HINTS-20261005, E-DEPLOY-PIPELINE-MEDIA-HINTS-20261005, E-LIVE-PUBLIC-MEDIA-HINTS-20261005.

## 연구 카드 활성 주제 선택 안정화 — ee77f28 — 2026-10-05

- 연구 카드별 최신 IntersectionObserver 상태를 누적해 현재 가장 많이 보이는 연구 카드를 활성 주제로 선택하고, 동일 주제의 중복 발행을 건너뛰도록 보완했다.
- v88 UI 계약, typecheck, 127 tests, production build/performance, PR #269 checks, main workflow 37245122445, Pages·라이브 smoke·release status와 공개 validator를 통과했다. Worker는 STATIC_ONLY로 건너뛰었다.
- 공개 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았다. NAVI는 USER_DECISION, 완료 게이트는 NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-OBSERVER-STATE-20261005, E-UI-CONTRACT-OBSERVER-STATE-20261005, E-DEPLOY-PIPELINE-OBSERVER-STATE-20261005, E-LIVE-PUBLIC-OBSERVER-STATE-20261005.

## 연구 스크롤 이벤트 프레임 배칭 — 7395768 — 2026-10-05

- 연구 카드 IntersectionObserver 이벤트를 requestAnimationFrame 단위로 합치고, 최신 주제만 React startTransition으로 반영해 모바일 스크롤 중 상태 갱신 경쟁을 줄였다.
- v87 UI 계약, typecheck, 127 tests, production build/performance, PR #267 checks, main workflow 37244243638, Pages·라이브 smoke·release status와 공개 validator를 통과했다. Worker는 STATIC_ONLY로 건너뛰었다.
- 공개 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았다. NAVI는 USER_DECISION, 완료 게이트는 NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-RAF-20261005, E-UI-CONTRACT-RAF-20261005, E-DEPLOY-PIPELINE-RAF-20261005, E-LIVE-PUBLIC-RAF-20261005.

## 연구 지도에 현재 읽는 주제 연결 — 5519791 — 2026-10-05

- 연구 지도 중앙에 GABA를 유지하면서 현재 읽는 연구 주제를 함께 표시해 선택된 지도 항목과 상세 연구 카드의 관계를 한눈에 이해하도록 고도화했다.
- v84 UI 계약, typecheck, 127개 테스트, production build와 성능 예산이 통과했고 PR #261 및 main 배포 37241358621의 Pages·라이브 smoke·release status가 성공했다. Worker는 STATIC_ONLY로 건너뛰었다.
- live validator는 candidate `551979122680c2bccfcbfbdf2b420abfb7194564`에 대해 HTTP 200·STATIC·71개 번들 해시·12개 공개 claim·6개 master record·6개 share page·teaser HOLD·내부 운영 스냅샷 제외·smartStoreOnly·removed750·provenance matched를 확인했고, live guide bundle의 현재 주제 라벨도 확인했다.
- 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았다. Browser/Playwright와 Safari/iOS/Android 실기기가 없어 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MAP-CURRENT-20261005, E-UI-CONTRACT-MAP-CURRENT-20261005, E-DEPLOY-PIPELINE-MAP-CURRENT-20261005, E-LIVE-PUBLIC-MAP-CURRENT-20261005.

## 연구 결과를 먼저 읽는 카드 흐름 — efc6246 — 2026-10-05

- 연구 카드 제목 바로 아래에 `결과 한 줄`을 배치해 모바일 방문자가 관찰된 결과를 먼저 이해하도록 고도화했다. 기존 도표 내부의 핵심 결과 요약은 중복 표시하지 않고 연구 구성·시각 도표·상세 조건·원문 출처로 이어지게 했다.
- v83 UI 계약, typecheck, 127개 테스트, production build와 성능 예산이 통과했고 PR #259 및 main 배포 37240376184의 Pages·라이브 smoke·release status가 성공했다. Worker는 STATIC_ONLY로 건너뛰었다.
- live validator는 candidate `efc624679105d2665b94a887e4866429451c4478`에 대해 HTTP 200·STATIC·71개 번들 해시·12개 공개 claim·6개 master record·6개 share page·teaser HOLD·내부 운영 스냅샷 제외·smartStoreOnly·removed750·provenance matched를 확인했고, live guide bundle의 `결과 한 줄`도 확인했다.
- 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았다. Browser/Playwright와 Safari/iOS/Android 실기기가 없어 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESULT-FIRST-20261005, E-UI-CONTRACT-RESULT-FIRST-20261005, E-DEPLOY-PIPELINE-RESULT-FIRST-20261005, E-LIVE-PUBLIC-RESULT-FIRST-20261005.

## 시스템 모션 선호 대응 — e48acaa — 2026-10-05

- `prefers-reduced-motion: reduce` 사용자가 공개 GABA 안내서를 읽을 때 카드·읽기 진행·영상 로딩의 애니메이션과 smooth scrolling을 전역으로 끌 수 있도록 PR #257에서 v82 UI 계약과 CSS를 추가했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build와 성능 예산이 통과했고, PR #257 및 main 배포 37239457353의 Pages·라이브 smoke·release status가 성공했다. Worker는 STATIC_ONLY 조건으로 건너뛰었다.
- live validator는 candidate `e48acaa917d2063273757c12f715316ab585ecdb`에 대해 HTTP 200·STATIC·71개 번들 해시·12개 공개 claim·6개 master record·6개 share page·teaser HOLD·내부 운영 스냅샷 제외·smartStoreOnly·removed750·provenance matched를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없어 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-REDUCED-MOTION-20261005, E-UI-CONTRACT-REDUCED-MOTION-20261005, E-DEPLOY-PIPELINE-REDUCED-MOTION-20261005, E-LIVE-PUBLIC-REDUCED-MOTION-20261005.

## 보호된 공개 배포 게이트 복구 — 7a111d8 — 2026-10-05

- NAVI 자동 점검에서 TF pulse heartbeat 만료로 보호된 main 배포가 중단된 원인을 확인했다. 공개 콘텐츠와 연구 데이터에는 손대지 않고 heartbeat 시각만 PR #255에서 갱신했으며, freshness `ageMinutes=0 / maxAgeMinutes=480`, `stateChanged=false`, `safeExecution=MET`를 확인했다.
- PR #255 checks, main 배포 37238318730의 Pages publish·라이브 smoke·release status가 성공했다. Worker는 STATIC_ONLY 조건으로 건너뛰었다.
- live validator는 최신 candidate `7a111d831fecfa42e74c0947ca4f40238c912e37`에 대해 HTTP 200·STATIC·71개 번들 해시·12개 공개 claim·6개 master record·6개 share page·teaser HOLD·내부 운영 스냅샷 제외·smartStoreOnly·removed750·provenance matched를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없어 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-TF-PULSE-HEARTBEAT-20261005, E-DEPLOY-PIPELINE-TF-PULSE-HEARTBEAT-20261005, E-LIVE-PUBLIC-TF-PULSE-HEARTBEAT-20261005, E-RELEASE-STATUS-TF-PULSE-HEARTBEAT-20261005.

## 실제 장 제목 포커스 보정 — c9b3eda — 2026-10-05

- 시각적 스크롤 정렬용 `.guide-section-heading` 래퍼가 실제 읽기 포커스 대상으로 사용되어 본문 장 제목으로 포커스가 이어지지 않을 수 있는 잔여 접근성 리스크를 확인하고 PR #254에서 `getGuideFocusTarget`을 분리했다. 직접 진입·hash 변경·메뉴 이동은 `aria-labelledby`가 가리키는 실제 제목으로 포커스하고, 시각 정렬은 기존 래퍼를 유지했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #254와 main 배포 37237686704, Pages, 라이브 smoke, release status와 live validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-HEADING-FOCUS-20261005, E-UI-CONTRACT-GUIDE-HEADING-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-HEADING-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-HEADING-FOCUS-20261005.

## 일반 장 제목 포커스 보정 — d545013 — 2026-10-05

- 일반 장 메뉴와 직접 장 딥링크가 화면만 이동하고 읽기 시작점에 포커스를 넘기지 않던 잔여 접근성 리스크를 확인하고 PR #253에서 히어로·본문·회복·최종 장 제목에 프로그램 포커스 지점을 추가했다. 메뉴 이동·hash 변경·직접 진입을 공통 제목 포커스 handoff로 연결했으며 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #253 checks, main 배포 37236810722, Pages, 라이브 smoke, release status와 live validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-CHAPTER-FOCUS-20261005, E-UI-CONTRACT-GUIDE-CHAPTER-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-CHAPTER-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-CHAPTER-FOCUS-20261005.

## 연구 직접 딥링크 포커스 보정 — 13cb639 — 2026-10-05

- 연구 카드를 공유 URL로 직접 열거나 URL hash를 바꿀 때 선택 카드 제목으로 포커스를 이어가도록 보완했다. 공유 링크로 들어온 키보드·보조기기 사용자가 선택 연구의 제목·대상·결과를 바로 읽을 수 있으며 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #252와 main 배포 37235537953, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-UI-CONTRACT-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005.

## 연구 카드 포커스 흐름 보정 — 544ce7d — 2026-10-05

- 연구 지도에서 주제를 고르거나 다음 연구로 이동하면 선택한 연구 카드로 포커스를 이어가도록 보완하고, 연구 카드 제목을 접근성 이름으로 연결했다. 키보드·보조기기 사용자가 대상·결과·해석을 바로 읽을 수 있으며 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #251과 main 배포 37234697205, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-RESEARCH-FOCUS-20261005, E-UI-CONTRACT-GUIDE-RESEARCH-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-RESEARCH-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-RESEARCH-FOCUS-20261005.

## 본문으로 이동 포커스 보정 — b393393d — 2026-10-05

- `본문으로 이동` 건너뛰기 링크의 `main#guide-main` 대상에 `tabIndex=-1`을 추가해, 키보드·보조기기 사용자가 본문 시작점으로 포커스를 이어갈 수 있도록 보완했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #250과 main 배포 37233770435, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-SKIP-FOCUS-20261005, E-UI-CONTRACT-GUIDE-SKIP-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-SKIP-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-SKIP-FOCUS-20261005.

## guide 경로 맥락 보존 — bd2adafd — 2026-10-05

- 장 이동 시 `view=guide`를 유지하고 이전 전문가 영상 query를 정리하며, 전문가 영상 선택 시 선택 ID를 보존하도록 guide 주소 갱신을 공통 처리했다. 새로고침·공유가 현재 읽는 장과 같은 맥락을 가리키도록 보완했으며 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #249와 main 배포 37232929565, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 브라우저·실기기 URL 상태·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-ROUTE-CONTEXT-20261005, E-UI-CONTRACT-GUIDE-ROUTE-CONTEXT-20261005, E-DEPLOY-PIPELINE-GUIDE-ROUTE-CONTEXT-20261005, E-LIVE-PUBLIC-GUIDE-ROUTE-CONTEXT-20261005.

## 읽기 진행 번호와 본문 번호 정렬 — 7e9adf5 — 2026-10-05

- 번호 없는 수면·회복 도입부를 진행 집계에서 분리해 `도입부`로 표시하고, 본문 진행은 화면 번호와 맞춰 `01 / 12`부터 시작하도록 보완했다. 긴 페이지에서 진행 수와 장 제목이 어긋나지 않으며 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #248과 main 배포 37232067717, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 진행 레일 렌더·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-READING-PROGRESS-NUMBERING-20261005, E-UI-CONTRACT-READING-PROGRESS-NUMBERING-20261005, E-DEPLOY-PIPELINE-READING-PROGRESS-NUMBERING-20261005, E-LIVE-PUBLIC-READING-PROGRESS-NUMBERING-20261005.

## 읽기 진행의 회복 맥락 구분 — 40c540b — 2026-10-05

- 첫 도입부의 ‘수면과 회복’과 중간 자동 전환 설명 카드가 같은 이름으로 표시되던 흐름을 보완해, 중간 장을 ‘회복의 고리’로 구분했다. 긴 페이지에서 현재 읽는 위치를 더 빠르게 파악할 수 있으며 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #247와 main 배포 37231321693, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 읽기 레일 렌더·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RECOVERY-CONTEXT-20261005, E-UI-CONTRACT-RECOVERY-CONTEXT-20261005, E-DEPLOY-PIPELINE-RECOVERY-CONTEXT-20261005, E-LIVE-PUBLIC-RECOVERY-CONTEXT-20261005.

## 수면·회복 도입부 내비게이션 정렬 — 85b1179 — 2026-10-05

- 첫 화면 뒤의 수면·회복 설명 브리지에 안정적인 `#opening-bridge` 앵커를 추가하고, 헤더의 ‘수면과 회복’ 메뉴와 읽기 진행을 첫 설명 장으로 정렬했다. 도입부에서 뒤쪽 반복 카드로 건너뛰지 않고 자연스럽게 다음 장으로 이어지도록 보완했으며 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #246와 main 배포 37230507157, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 딥링크 렌더·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-OPENING-BRIDGE-NAV-20261005, E-UI-CONTRACT-OPENING-BRIDGE-NAV-20261005, E-DEPLOY-PIPELINE-OPENING-BRIDGE-NAV-20261005, E-LIVE-PUBLIC-OPENING-BRIDGE-NAV-20261005.

## 좁은 모바일 헤더 안전영역 보정 — b3fcffb — 2026-10-05

- 430px 이하 휴대폰에서 메뉴·글자 크기·공유 버튼의 절대 위치를 오른쪽 안전영역 안으로 보정하고, 공유 완료 토스트의 좌우 안전영역도 명시했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #245와 main 배포 37229660026, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 헤더 정렬·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-HEADER-SAFE-AREA-20261005, E-UI-CONTRACT-MOBILE-HEADER-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-MOBILE-HEADER-SAFE-AREA-20261005, E-LIVE-PUBLIC-MOBILE-HEADER-SAFE-AREA-20261005.

## 공유 피드백 토스트 하단 안전영역 보정 — 06d737f — 2026-10-05

- 모바일 공유·복사 완료 토스트가 iPhone 하단 홈 인디케이터와 겹치지 않도록 700px 이하에서 오른쪽·하단·좌우 안전영역을 반영했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- PR #244와 main 배포 37228652043, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 토스트 정렬·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-SHARE-TOAST-SAFE-AREA-20261005, E-UI-CONTRACT-SHARE-TOAST-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-SHARE-TOAST-SAFE-AREA-20261005, E-LIVE-PUBLIC-SHARE-TOAST-SAFE-AREA-20261005.

## 연구 카드 직접 이동 안전영역 보정 — 83715cc — 2026-10-05

- 연구 확장 지도에서 선택한 개별 연구 카드가 고정 읽기 레일 아래에 도착하도록 900px 이하 태블릿·모바일과 700px 이하 휴대폰의 스크롤 기준에 안전영역을 반영했다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #243과 main 배포 37227713682, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 연구 카드 정렬·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-UI-CONTRACT-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-LIVE-PUBLIC-RESEARCH-ANCHOR-SAFE-AREA-20261005.

## 태블릿 폭 안전영역·키보드 진입 보정 — 80436662 — 2026-10-05

- 701–900px 모바일·태블릿 폭까지 viewport 안전영역 처리를 확장하고, 건너뛰기 링크·고정 헤더·읽기 진행 표시·메뉴의 상하·좌우 여백과 장 이동 기준을 맞췄다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #242와 main 배포 37226718498, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 태블릿 렌더·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-SAFE-AREA-TABLET-20261005, E-UI-CONTRACT-MOBILE-SAFE-AREA-TABLET-20261005, E-DEPLOY-PIPELINE-MOBILE-SAFE-AREA-TABLET-20261005, E-LIVE-PUBLIC-MOBILE-SAFE-AREA-TABLET-20261005.

## 모바일 안전영역·읽기 레일 보정 — 74fc0300 — 2026-10-05

- 공개 GABA 안내서 진입 메타에 viewport-fit=cover를 추가하고, iPhone 안전영역에 맞춰 고정 헤더·읽기 진행 표시·모바일 메뉴·장 이동 위치를 보정했다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #241과 main 배포 37225805478, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright와 Safari/iOS/Android 실기기가 없는 환경이므로 실제 안전영역 렌더·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-SAFE-AREA-20261005, E-UI-CONTRACT-MOBILE-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-MOBILE-SAFE-AREA-20261005, E-LIVE-PUBLIC-MOBILE-SAFE-AREA-20261005.

## 전문가 영상 갤러리 위치 메타 정보 — 9131138a — 2026-10-05

- 전문가 영상 선택 카드에 주제·재생 상태·전체 순서를 `01 / 09` 형식으로 표시하고 모바일 표시를 보강했다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #240과 main 배포 37224932902, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-INDEX-20261005, E-UI-CONTRACT-EXPERT-VIDEO-INDEX-20261005, E-DEPLOY-PIPELINE-EXPERT-VIDEO-INDEX-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-INDEX-20261005.

## 전문가 영상 다음 읽기 흐름 정렬 — 84897891 — 2026-10-05

- 전문가 영상 아래의 다음 읽기 안내를 실제 문서 순서인 `다음 장 · 연구를 읽는 기준 → 원문 출처`로 정렬하고 모바일 읽기 계층을 보강했다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #239와 main 배포 37224127512, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-HANDOFF-20261005, E-UI-CONTRACT-EXPERT-VIDEO-HANDOFF-20261005, E-DEPLOY-PIPELINE-EXPERT-VIDEO-HANDOFF-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-HANDOFF-20261005.

## 연구 지도에서 카드로 이어지는 읽기 흐름 — 0e7836e — 2026-10-05

- 연구 지도 아래에 주제 선택 안내를 추가하고 지도 버튼과 안내 문장을 연결했다. 모바일에서는 문장이 자연스럽게 줄바꿈된다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #238과 main 배포 37223345781, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-CUE-20261005, E-UI-CONTRACT-RESEARCH-MAP-CUE-20261005, E-DEPLOY-PIPELINE-RESEARCH-MAP-CUE-20261005, E-LIVE-PUBLIC-RESEARCH-MAP-CUE-20261005.

## 연구 범위 맥락 표식 고도화 — 13004052 — 2026-10-05

- 연구 카드 상단에 `연구 범위` 표식을 추가하고 모바일에서 범위·연구 대상·세부 영역을 안정적인 단일 열로 배치했다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #237과 main 배포 37222305395, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-SCOPE-CONTEXT-20261005, E-UI-CONTRACT-RESEARCH-SCOPE-CONTEXT-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCOPE-CONTEXT-20261005, E-LIVE-PUBLIC-RESEARCH-SCOPE-CONTEXT-20261005.

## 연구 범위 라벨 가독성 고도화 — af43e264 — 2026-10-05

- 연구 카드 상단의 대상·방법·측정 연구 범위 라벨을 결과보다 먼저 읽히도록 모바일·데스크톱 크기, 간격, 줄바꿈을 보강했다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #236과 main 배포 37221235472, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-SCOPE-READABILITY-20261005, E-UI-CONTRACT-RESEARCH-SCOPE-READABILITY-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCOPE-READABILITY-20261005, E-LIVE-PUBLIC-RESEARCH-SCOPE-READABILITY-20261005.

## 연구 카드 읽기 계층 고도화 — c5a60fe — 2026-10-05

- 연구 카드의 대상·방법·측정 정보와 차트 핵심 결과 라벨을 데스크톱·모바일에서 빠르게 읽히도록 보강했다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #235와 main 배포 37220018831, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-PROFILE-READABILITY-20261005, E-UI-CONTRACT-RESEARCH-PROFILE-READABILITY-20261005, E-DEPLOY-PIPELINE-RESEARCH-PROFILE-READABILITY-20261005, E-LIVE-PUBLIC-RESEARCH-PROFILE-READABILITY-20261005.

## 연구 결과 요약 가독성 고도화 — 1226c06 — 2026-10-05

- 연구 비교 도표의 `GABA 결과` 요약을 모바일·데스크톱에서 첫 번째 읽기 단위로 확대하고 청록 기준선·옅은 배경으로 비교 레인과 분리했다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #234와 main 배포 `37219113458`, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-VERDICT-READABILITY-20261005`, `E-UI-CONTRACT-RESEARCH-VERDICT-READABILITY-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-VERDICT-READABILITY-20261005`, `E-LIVE-PUBLIC-RESEARCH-VERDICT-READABILITY-20261005`.

## 연구 결과 도표 GABA 결과 선표시 — 4036d0d — 2026-10-05

- 연구 비교 도표의 각 행에 `GABA 결과` 요약을 먼저 배치해, 독자가 결과 방향을 먼저 읽고 두 조건의 막대를 근거로 확인하도록 고도화했다. 연구 수치·출처 데이터는 변경하지 않았다.
- PR #233과 main 배포 `37217858013`, 라이브 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright가 없는 환경이므로 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-OUTCOME-VERDICT-20261005`, `E-UI-CONTRACT-RESEARCH-OUTCOME-VERDICT-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-OUTCOME-VERDICT-20261005`, `E-LIVE-PUBLIC-RESEARCH-OUTCOME-VERDICT-20261005`.

## 모바일 연구 확장 지도 터치·가독성 고도화 — 647df28 — 2026-10-05

- 모바일 연구 확장 지도의 주제 버튼을 표준 화면 80px·82px, 아이콘 40px로 넓히고 350px 이하에는 76px·78px·38px 규칙을 적용했다. v59 UI 계약 회귀 검사를 추가했다.
- PR #232와 코드 배포 `37216763700`을 통과했고, NAVI 기록 동기화 시점 main candidate `647df28`의 라이브 공개 validator도 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright가 없는 환경이므로 실제 브라우저·실기기 터치와 고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-TOUCH-20261005`, `E-UI-CONTRACT-RESEARCH-MAP-TOUCH-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-TOUCH-20261005`, `E-LIVE-PUBLIC-RESEARCH-MAP-TOUCH-20261005`.

## 모바일 회복 지도 정보 구조 고도화 — 3510d2c — 2026-10-05

- 수면·회복 14단계 모바일 지도를 6열로 재배치하고 단계 버튼에 최소 44px 터치 영역을 명시했다. 13·14단계는 중앙 정렬해 경로의 끝맺음을 보완했다.
- PR #231, main 배포 `37215720425`, 라이브 공개 validator를 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser/Playwright가 없는 환경이므로 실제 브라우저·실기기 터치와 고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-TOUCH-20261005`, `E-UI-CONTRACT-RECOVERY-MAP-TOUCH-20261005`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-TOUCH-20261005`, `E-LIVE-PUBLIC-RECOVERY-MAP-TOUCH-20261005`.

## 공유·연구 복사 버튼 모바일 터치 영역 고도화 — ca65f61 — 2026-10-05

- 사업자용 문장 복사·전체 복사·연구 결과 복사 동작을 44px 이상 터치 영역으로 명시하고 v52 UI 계약 회귀 검사를 추가했다.
- PR #230, main 배포 `37214622993`, 라이브 공개 validator를 모두 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser 플러그인·Playwright가 없는 환경이라 실제 브라우저/실기기 터치와 고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-SHARE-CONTROLS-20261005`, `E-UI-CONTRACT-SHARE-CONTROLS-20261005`, `E-DEPLOY-PIPELINE-SHARE-CONTROLS-20261005`, `E-LIVE-PUBLIC-SHARE-CONTROLS-20261005`.

## 첫 화면 히어로 문구 최소화 — 2e31d60 — 2026-10-05

- 첫 화면 중복 프리타이틀을 제거하고 메인 헤드라인 시작 위치를 보정했다.
- PR #229, main 배포 `37213839261`, 라이브 공개 validator를 모두 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser 플러그인·Playwright가 없는 환경이라 실제 브라우저/실기기 시각 검증과 고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-MINIMAL-HERO-20261005`, `E-UI-CONTRACT-MINIMAL-HERO-20261005`, `E-DEPLOY-PIPELINE-MINIMAL-HERO-20261005`, `E-LIVE-PUBLIC-MINIMAL-HERO-20261005`.

## 전문가 영상 모바일 터치 영역 고도화 — 0b5a2a1 — 2026-10-05

- 전문가 영상 선택 공유 버튼과 주제 필터를 44px 이상 터치 영역으로 통일하고 UI 계약 회귀 검사를 추가했다.
- PR #228, main 배포 `37212827380`, 라이브 공개 validator를 모두 통과했다. 공개 검증은 HTTP 200·STATIC·71개 번들·제품 독립 경계를 확인했다.
- Browser 플러그인·Playwright가 없는 환경이라 실제 브라우저/실기기 터치와 고령 사용자 독해성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-VIDEO-CONTROLS-20261005`, `E-UI-CONTRACT-VIDEO-CONTROLS-20261005`, `E-DEPLOY-PIPELINE-VIDEO-CONTROLS-20261005`, `E-LIVE-PUBLIC-VIDEO-CONTROLS-20261005`.

## 큰 글씨 읽기 모드 가독성 강화 — 5f4f6c7 — 2026-10-04

- 큰 글씨 모드를 본문·연구 도표 기준 desktop 12%, mobile 10% 확대 수준으로 보강하고, 모바일 방향 문구 줄바꿈을 추가했다.
- PR #226, main 배포 `37210637085`, 라이브 공개 validator를 모두 통과했다. 공개 검증은 HTTP 200·STATIC·70개 번들·제품 독립 경계를 확인했다.
- Browser 플러그인·Playwright가 없는 환경이라 실제 브라우저/실기기 가독성은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-LARGE-TEXT-20261004`, `E-UI-CONTRACT-LARGE-TEXT-20261004`, `E-DEPLOY-PIPELINE-LARGE-TEXT-20261004`, `E-LIVE-PUBLIC-LARGE-TEXT-20261004`.

## 좁은 모바일 헤더 충돌 방지 — 5215ab5 — 2026-10-04

- 381–430px 화면에서 로고와 고정 메뉴·큰 글씨·공유 컨트롤이 겹치지 않도록 헤더 폭을 보정했다.
- PR #225, main 배포 `37210073919`, 라이브 공개 validator를 모두 통과했다. 공개 검증은 HTTP 200·STATIC·70개 번들·제품 독립 경계를 확인했다.
- Browser 플러그인·Playwright가 없는 환경이라 실제 브라우저/실기기 레이아웃 검증은 외부 항목으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-NARROW-HEADER-20261004`, `E-UI-CONTRACT-NARROW-HEADER-20261004`, `E-DEPLOY-PIPELINE-NARROW-HEADER-20261004`, `E-LIVE-PUBLIC-NARROW-HEADER-20261004`.

## 연구 카드 원문 보기 링크 가독성 고도화 — 6248808 — 2026-10-04

- 연구 카드 출처를 `출처명`과 `원문 보기`로 분리하고 링크 전체에 44px 터치 영역·키보드 포커스 표시를 적용했다.
- PR #224, main 배포 `37209426168`, 라이브 공개 validator를 모두 통과했다. 공개 검증은 HTTP 200·STATIC·70개 번들·제품 독립 경계를 확인했다.
- Browser 플러그인·Playwright가 없는 환경이라 실제 브라우저/실기기 동작은 외부 검증으로 유지한다. NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-SOURCE-ACTION-20261004`, `E-UI-CONTRACT-RESEARCH-SOURCE-ACTION-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-SOURCE-ACTION-20261004`, `E-LIVE-PUBLIC-RESEARCH-SOURCE-ACTION-20261004`.

## 사업자용 전체 공유 복사 상태 및 공개 재검증: 2026-10-04 / candidate 94bcd16

사업자용 GABA 핵심 5문장 전체 복사 버튼을 누르면 해당 버튼이 `복사 완료`로 바뀌고 2.4초 뒤 원래 상태로 돌아가도록 고도화했다. PR #223 checks, main workflow `37208889644`, live validator HTTP 200·STATIC·공개 데이터 정합성·제품 독립 경계를 확인했다. 실제 클립보드와 모바일 브라우저 공유 UI 검증은 외부 항목으로 남겼고 NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-FULL-SHARE-COPY-ACK-20261004`, `E-UI-CONTRACT-FULL-SHARE-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-FULL-SHARE-COPY-ACK-20261004`, `E-LIVE-PUBLIC-FULL-SHARE-COPY-ACK-20261004`.

## 사업자용 공유 문장 개별 복사 상태 및 공개 재검증: 2026-10-04 / candidate 5aa9f05

사업자용 GABA 핵심 5문장 카드에서 개별 문장을 복사하면 해당 카드만 `복사 완료`로 바뀌고 2.4초 뒤 원래 상태로 돌아오도록 고도화했다. PR #222 필수 checks, main workflow `37208090180`, live validator HTTP 200·STATIC·공개 데이터 정합성·제품 독립 경계를 확인했다. 실제 클립보드와 모바일 브라우저 공유 UI 검증은 외부 항목으로 남겼고 NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-SHARE-LINE-COPY-ACK-20261004`, `E-UI-CONTRACT-SHARE-LINE-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-SHARE-LINE-COPY-ACK-20261004`, `E-LIVE-PUBLIC-SHARE-LINE-COPY-ACK-20261004`.

## 연구 카드 복사 완료 상태 및 TF freshness 복구: 2026-10-04 / candidate bb5e260

연구 카드의 결과·출처 복사 성공을 카드별 ‘복사 완료’ 상태로 표시하도록 고도화했다. PR #220 checks와 로컬 검증을 통과했으며, 첫 배포 후보에서 확인된 487분 heartbeat freshness 문제는 공식 TF pulse run `37207031442`와 보호 PR #221로 갱신했다. main workflow `37207209603`와 live validator HTTP 200·STATIC·공개 데이터 정합성·제품 독립 경계를 확인했다. 실제 클립보드·모바일 공유 UI 검증은 외부 항목으로 남겼고 NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-COPY-ACK-20261004`, `E-UI-CONTRACT-RESEARCH-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-COPY-ACK-20261004`, `E-LIVE-PUBLIC-RESEARCH-COPY-ACK-20261004`, `E-TF-PULSE-REFRESH-20261004`.

## 연구 결과 공유 문맥 보강 및 공개 재검증: 2026-10-04 / candidate 348f9b6

연구 카드의 결과 복사를 연구 대상·방법, 관찰 결과, 연구 범위, 원문 출처와 해당 연구 딥링크를 포함하는 공유 블록으로 고도화했다. 사업자용 GABA 5문장 전체 복사에는 공개 안내서 링크를 추가했다. PR #219, main workflow `37206009673`, live validator HTTP 200·STATIC·공개 데이터 정합성·제품 독립 경계를 확인했으며 실제 클립보드와 모바일 공유 UI 검증은 외부 항목으로 남겼다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-SHARE-CONTEXT-20261004`, `E-UI-CONTRACT-RESEARCH-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-RESEARCH-SHARE-CONTEXT-20261004`.

## 전문가 영상 공유 링크 주제 필터 복원 및 공개 재검증: 2026-10-04 / candidate 597bf37

유효한 `?video=` 공유 링크가 선택 영상의 초기 재생 상태와 주제 필터까지 복원하도록 보강했다. PR #218, main workflow `37204949680`, live validator HTTP 200·STATIC·공개 데이터 정합성·제품 독립 경계를 확인했으며, 브라우저 런타임 영상 재생과 필터 전환 검증은 외부 항목으로 남겼다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-CONTEXT-20261004`, `E-UI-CONTRACT-EXPERT-VIDEO-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-CONTEXT-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-CONTEXT-20261004`.

## 전문가 영상 공유 링크 직접 재생 및 배포 재검증: 2026-10-04 / candidate 2305b5b

유효한 `?video=` 공유 링크가 선택 영상의 초기 재생 상태까지 복원하도록 보강했다. PR #217, main workflow `37203920793`, live validator HTTP 200·STATIC·공개 데이터 정합성·제품 독립 경계를 확인했으며, 브라우저 런타임 영상 재생 검증은 외부 항목으로 남겼다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-DEEPLINK-20261004`, `E-UI-CONTRACT-EXPERT-VIDEO-DEEPLINK-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-DEEPLINK-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-DEEPLINK-20261004`.

## 공유·직접 진입 해시 재정렬과 뷰포트 변경 보강: 2026-10-04 / candidate cf893f8

lazy 콘텐츠가 정착된 뒤 공유·직접 진입 제목을 고정 헤더·읽기 레일 아래로 재정렬하고, 320px→390px 같은 페이지 폭 변경에서도 기준선을 재계산하도록 보강했다. 사용자 입력 후 자동 재정렬을 취소해 읽기 흐름을 보호했으며, PR #216·main workflow `37202619125`·live validator HTTP 200·STATIC·공개 데이터 정합성·Chrome DevTools fallback 320px·390px 검증을 통과했다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-DEEP-LINK-REALIGN-20261004`, `E-CDP-DEEP-LINK-REALIGN-20261004`, `E-DEPLOY-PIPELINE-DEEP-LINK-REALIGN-20261004`, `E-LIVE-PUBLIC-DEEP-LINK-REALIGN-20261004`.

## 초소형 모바일 회복 경로 마지막 행 중앙 정렬 및 공개 재검증: 2026-10-04 / candidate a13e82f

320px 이하에서 수면·회복 14단계 지도의 마지막 13·14단계를 3·4열에 중앙 배치해 6·6·2 경로의 시각적 끝맺음을 보완했다. 기존 행 수와 터치 폭, 390px 흐름은 유지했으며, PR #213·main workflow `37200663786`·live validator HTTP 200·STATIC·공개 데이터 정합성·Chrome DevTools fallback 기준 검증을 통과했다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-NARROW-RECOVERY-END-20261004`, `E-CDP-NARROW-RECOVERY-END-20261004`, `E-DEPLOY-PIPELINE-NARROW-RECOVERY-END-20261004`, `E-LIVE-PUBLIC-NARROW-RECOVERY-END-20261004`.

## 초소형 모바일 회복 경로 터치·가독성 보강 및 공개 재검증: 2026-10-04 / candidate 5bf2921

320px 이하에서 수면·회복 14단계 지도가 지나치게 압축되지 않도록 6·6·2의 3행으로 재배치하고 단계 버튼·아이콘을 키웠다. 390px의 7·7 흐름은 유지했으며, PR #212·main workflow `37199796734`·live validator HTTP 200·STATIC·공개 데이터 정합성·Chrome DevTools fallback 320px·390px 검증을 통과했다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-NARROW-RECOVERY-MAP-20261004`, `E-CDP-NARROW-RECOVERY-MAP-20261004`, `E-DEPLOY-PIPELINE-NARROW-RECOVERY-MAP-20261004`, `E-LIVE-PUBLIC-NARROW-RECOVERY-MAP-20261004`.

## 태블릿 읽기 진행 레일 기준선 정렬 및 공개 재검증: 2026-10-04 / candidate fc07f6f

701px·900px 태블릿에서 헤더 높이 70px과 읽기 진행 레일의 top을 맞춰 헤더 아래 기준선 오차를 제거했다. 공개 768px·390px Chrome DevTools fallback에서 진행 레일 정렬·가로폭·오류 기준을 확인했고, PR #211·main workflow `37198360203`·live validator HTTP 200·STATIC 공개 검증을 통과했다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-TABLET-PROGRESS-ALIGN-20261004, E-CDP-TABLET-PROGRESS-ALIGN-20261004, E-DEPLOY-PIPELINE-TABLET-PROGRESS-ALIGN-20261004, E-LIVE-PUBLIC-TABLET-PROGRESS-ALIGN-20261004.

## 태블릿 히어로 공개 안내 패널 보강 및 공개 재검증: 2026-10-04 / candidate c0b08ee

701px·900px 태블릿에서 제품 독립 과학 안내 고지문과 읽기 레일이 자연 이미지 위에서 흐려지지 않도록 폭 340px 반투명 editorial panel과 blur를 적용했다. 768px·820px Chrome DevTools fallback에서 가로 넘침과 오류가 없었고, PR #210·main workflow `37197239653`·live validator HTTP 200·STATIC 공개 검증을 통과했다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-TABLET-HERO-DISCLOSURE-20261004, E-CDP-TABLET-HERO-DISCLOSURE-20261004, E-DEPLOY-PIPELINE-TABLET-HERO-DISCLOSURE-20261004, E-LIVE-PUBLIC-TABLET-HERO-DISCLOSURE-20261004.

## 모바일 큰 글씨 제어 라벨 보강 및 공개 재검증: 2026-10-04 / candidate 37147625

381px·430px 모바일 헤더에서 `가+ 큰 글씨` 기능명이 실제로 보이도록 읽기 크기 제어를 보강하고, 320px 이하에서는 컴팩트 44px 터치 타깃을 유지했다. 큰 글씨 전환 시 `가− 기본 글씨` 상태와 가로폭을 확인했으며, PR #209·main workflow `37196206238`·live validator HTTP 200·STATIC·Chrome DevTools fallback 390px·320px 공개 검증을 통과했다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-MOBILE-TYPE-CONTROL-20261004, E-CDP-MOBILE-TYPE-CONTROL-20261004, E-DEPLOY-PIPELINE-MOBILE-TYPE-CONTROL-20261004, E-LIVE-PUBLIC-MOBILE-TYPE-CONTROL-20261004.

## 전문가 영상 갤러리 공개 화면 재점검 및 NAVI 동기화: 2026-10-04 / candidate 73b32d2

전문가 영상 섹션의 9개 영상, 주제 필터, 선택 즉시 재생 영역을 390px·1440px에서 다시 점검했다. 모바일에서는 2열 카드가 안정적으로 유지되고 데스크톱에서는 선택 영상과 갤러리가 함께 보였으며, 최신 정적 공개본 live validator와 NAVI project-state validation을 통과했다. 로컬 목표 감사의 제품·주문·Worker 게이트는 공개 사이트와 분리된 WAITING/VERIFYING 상태로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-VIDEO-GALLERY-QA-20261004, E-CDP-VIDEO-GALLERY-QA-20261004, E-LIVE-PUBLIC-VIDEO-GALLERY-QA-20261004.

## 좁은 모바일 연구 결과 카드 가독성 보강 공개 배포: 2026-10-04 / candidate 53a7c41

320px에서 연구 결과 라벨이 임의의 글자 단위로 끊기지 않도록 기본 폭을 보정하고, 350px 이하에서는 `지표명 → 결과값 → 방향 그래픽`의 세 줄 구조로 재배치했다. 390px 흐름은 유지했으며, PR #207·#208, main workflow `37194121269`, Chrome DevTools fallback 320px·390px, live validator HTTP 200·STATIC을 확인했다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: E-LOCAL-BUILD-NARROW-SIGNAL-LABEL-20261004, E-CDP-NARROW-SIGNAL-LABEL-20261004, E-DEPLOY-PIPELINE-NARROW-SIGNAL-LABEL-20261004, E-LIVE-PUBLIC-NARROW-SIGNAL-LABEL-20261004.

## 성장·면역 연구 방향 그래픽 공개 배포: 2026-10-04 / candidate 074822b

성장호르몬·면역 연구 카드의 결과 방향을 상승·하강 그래픽과 자연어 결과로 함께 표시해 모바일과 데스크톱에서 빠르게 읽도록 보강했다. 그래픽이 실제 효과 크기나 수치를 뜻하지 않는다는 안내를 유지했으며, PR #206·main workflow `37192302993`·Chrome DevTools fallback 390px·1440px·live validator HTTP 200·STATIC을 확인했다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: E-LOCAL-BUILD-DIRECTION-GRAPHIC-20261004, E-CDP-DIRECTION-GRAPHIC-20261004, E-DEPLOY-PIPELINE-DIRECTION-GRAPHIC-20261004, E-LIVE-PUBLIC-DIRECTION-GRAPHIC-20261004.

## 비교 연구 결과 미터 보강 공개 배포: 2026-10-04 / candidate 1cc9440

연구 결과 카드의 작은 선 중심 표현을 5단계 질적 미터로 보강하고 `더 많이·덜 증가/감소` 문구를 함께 표시했다. 실제 효과 크기나 수치를 뜻하지 않는다는 안내는 유지했으며, PR #205·main workflow `37190962129`·Chrome DevTools fallback 390px·1440px·live validator HTTP 200·STATIC을 확인했다. NAVI는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-QUALITATIVE-METER-20261004, E-CDP-QUALITATIVE-METER-20261004, E-DEPLOY-PIPELINE-QUALITATIVE-METER-20261004, E-LIVE-PUBLIC-QUALITATIVE-METER-20261004.

## 연구 확장 지도 시작점·딥링크 방향 보강 공개 배포: 2026-10-04 / candidate c747f67

`06 · 연구의 확장`에 진입하면 첫 연구 영역인 `인지`가 기본 활성화되고, 특정 연구 딥링크를 열면 지도·상세 카드·읽기 진행명이 같은 주제를 가리키도록 보완했다. 연구 지도에서 상세 결과로 이어지는 방향이 분명해졌으며 모바일·데스크톱 레이아웃과 제품 독립 흐름은 유지했다. PR #204, main workflow `37189726191`, live validator HTTP 200·STATIC, Playwright Chromium fallback 390px·1440px 공개 흐름을 확인했다. NAVI는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-ENTRY-20261004, E-PLAYWRIGHT-RESEARCH-MAP-ENTRY-20261004, E-DEPLOY-PIPELINE-RESEARCH-MAP-ENTRY-20261004, E-LIVE-PUBLIC-RESEARCH-MAP-ENTRY-20261004.

## 수면·회복 14단계 현재 위치 표시 공개 배포: 2026-10-04 / candidate 0641f60

수면과 회복 카드 지도 위에 현재 단계명과 진행 번호를 추가해 아이콘 지도와 자동 전환 카드의 연결을 강화했다. 단계 클릭 시 지도 표식·카드·진행 번호가 함께 바뀌며 기존 3초 자동 전환·모바일 우선 레이아웃·제품 독립 흐름은 유지했다. PR #203, main workflow `37188742301`, live validator HTTP 200·STATIC, Playwright Chromium fallback 390px·1440px 공개 흐름을 확인했다. NAVI는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-RECOVERY-MAP-STAGE-CUE-20261004, E-PLAYWRIGHT-RECOVERY-MAP-STAGE-CUE-20261004, E-DEPLOY-PIPELINE-RECOVERY-MAP-STAGE-CUE-20261004, E-LIVE-PUBLIC-RECOVERY-MAP-STAGE-CUE-20261004.

## 사업자용 5문장 전체 복사 공개 배포: 2026-10-04 / candidate 58bbc70

마지막 이야기 공유 장의 사업자용 활용 자료에 `전체 복사` 버튼을 추가해 GABA 핵심 5문장을 한 번에 가져갈 수 있도록 보완했다. 기존 문장별 복사와 제품 독립 문구를 유지했으며 PR #202, main workflow `37187761596`, live validator HTTP 200·STATIC, Playwright Chromium fallback 390px·1440px 공유 흐름을 확인했다. NAVI는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-BUSINESS-COPY-ALL-20261004, E-PLAYWRIGHT-BUSINESS-COPY-ALL-20261004, E-DEPLOY-PIPELINE-BUSINESS-COPY-ALL-20261004, E-LIVE-PUBLIC-BUSINESS-COPY-ALL-20261004.

## 활용에서 발효와 안전으로 이어지는 편집 전환 공개 배포: 2026-10-04 / candidate 8d493d3

국내외 활용 카드 뒤에 `다음 장 · 활용은 만들어지는 과정에서 이어집니다 → 발효와 안전` 전환을 추가해 연구 → 활용 → 만들어지는 과정의 방향을 한 번에 읽도록 보완했다. PR #201과 main workflow `37186666660`, live validator HTTP 200·STATIC, Playwright Chromium fallback 390px·1440px 공개 흐름을 확인했다. NAVI는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-APPLICATION-FERMENTATION-HANDOFF-20261004, E-PLAYWRIGHT-APPLICATION-FERMENTATION-HANDOFF-20261004, E-DEPLOY-PIPELINE-APPLICATION-FERMENTATION-HANDOFF-20261004, E-LIVE-PUBLIC-APPLICATION-FERMENTATION-HANDOFF-20261004.

## 사업자용 GABA 공유 패키지 공개 배포: 2026-10-04 / candidate 02f8fac

마지막 이야기 공유 장에 사업자용 활용 자료 안내를 먼저 노출하고, 기존 검증 표제를 유지한 5문장 공유 패키지를 펼치기·복사할 수 있도록 고도화했다. 모바일·데스크톱에서 제품 독립 정보 흐름과 Apple 톤앤매너를 유지했으며 PR #200, main workflow 37185751209, live validator HTTP 200·STATIC, Playwright Chromium fallback 390px·1440px 공유 흐름을 확인했다. NAVI는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-BUSINESS-SHARE-KIT-20261004, E-PLAYWRIGHT-BUSINESS-SHARE-KIT-20261004, E-DEPLOY-PIPELINE-BUSINESS-SHARE-KIT-20261004, E-LIVE-PUBLIC-BUSINESS-SHARE-KIT-20261004.

## 모바일 전문가 영상 정보 계층 고도화 공개 배포: 2026-10-04 / candidate 0feb5743

700px 이하에서 선택 전문가 영상의 제목·채널·공유 동작을 세로형 영상 프레임보다 먼저 읽도록 보완했다. PR #197과 main workflow 37182224154, live validator HTTP 200·STATIC, Playwright Chromium fallback 320·350·390·1440px 선택 흐름을 확인했다. 9:16 비율·가로폭·오류 기준을 통과했으며 NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-CONTEXT-20261004, E-PLAYWRIGHT-MOBILE-VIDEO-CONTEXT-20261004, E-DEPLOY-PIPELINE-MOBILE-VIDEO-CONTEXT-20261004, E-LIVE-PUBLIC-MOBILE-VIDEO-CONTEXT-20261004.

## 공개 사이트 전 구간 시각 감리 및 NAVI 동기화: 2026-10-04 / candidate 66ec3c6

GitHub Pages 공개본의 첫 화면·수면과 회복·연구 지도·전문가 영상·이야기 공유 장을 390px·1440px에서 직접 진입해 10개 캡처를 확인했다. 화면 폭·page error·console error 기준을 통과했고, 모바일 회복 카드·연구 지도·전문가 영상 gallery와 데스크톱 연구 지도·feature panel의 이미지 비율과 정보 계층이 안정적으로 유지됐다. 로컬 검증과 live validator도 재확인했으며 NAVI는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LIVE-PUBLIC-VISUAL-PUBLISHING-20261004.

## 전문가 영상 공유·모바일 진행 문맥 고도화 공개 배포: 2026-10-04 / candidate 34c5b08

전문가 영상 선택 직후 공유해도 선택 영상 제목·본문·`?video=...#expert-videos` 딥링크가 유지되도록 보완하고, 모바일 부드러운 스크롤 중 읽기 진행 라벨이 `전문가 영상`과 일치하도록 고정했다. PR #194·#196, heartbeat refresh PR #195, main workflow 37181007734, Pages·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성·Playwright 390/1440px 인터랙션 17/17을 확인했다. NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-SHARE-20261004, E-PLAYWRIGHT-EXPERT-VIDEO-SHARE-20261004, E-DEPLOY-PIPELINE-EXPERT-VIDEO-SHARE-20261004, E-LIVE-PUBLIC-EXPERT-VIDEO-SHARE-20261004.

## 최종 NAVI 문서 동기화 공개 재검증: 2026-10-04 / candidate cc312de

NAVI 문서 동기화 후 최종 공개 candidate에서 live validator와 Playwright Chromium fallback 55개 조합을 재실행했다. 320·350·390·768·1440px × 11개 주요 장에서 가로 넘침·페이지 오류·콘솔 오류가 0건이었고, 직전 UI 보정 candidate 91808af와 동일한 공개 화면이 유지됐다. NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LIVE-PUBLIC-NARROW-PHONE-20261004.

## 초소형 모바일 연구 카드 폭 보정 및 공개본 전수 감리: 2026-10-04 / candidate 91808af

320px에서 수면 연구 도표가 내부 그리드의 고정 최소 폭으로 잘리던 문제를 확인하고, 카드의 두 번째 열을 축소 가능한 구조로 보정했다. PR #193, main workflow 37179404463, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. Playwright Chromium fallback의 320·350·390·768·1440px × 11개 주요 장 직접 진입 55개 조합에서 가로 넘침·페이지 오류·콘솔 오류가 0건이었고, NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-NARROW-PHONE-20261004, E-PLAYWRIGHT-NARROW-PHONE-20261004, E-DEPLOY-PIPELINE-NARROW-PHONE-20261004, E-LIVE-PUBLIC-NARROW-PHONE-20261004.

## 모바일 터치 중 수면·회복 카드 읽기 흐름 공개 배포: 2026-10-04 / candidate e6802d3

모바일에서 수면·회복 카드를 누르거나 스와이프하는 동안 자동 전환이 계속될 수 있던 흐름을 보완했다. 터치 시작부터 종료까지 현재 단계를 유지하고, 손가락을 떼면 3초 자동 전환을 재개하며, 좌우 스와이프는 다음 단계로 이동한 뒤 수동 정지 상태를 유지한다. PR #192, main workflow 37178489672, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했고, NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-RECOVERY-TOUCH-20261004, E-PLAYWRIGHT-RECOVERY-TOUCH-20261004, E-DEPLOY-PIPELINE-RECOVERY-TOUCH-20261004, E-LIVE-PUBLIC-RECOVERY-TOUCH-20261004.

## 수면·회복 자동 카드 읽기 흐름 공개 배포: 2026-10-04 / candidate cbf05f6

수면·회복 14단계 카드가 포인터나 키보드 포커스를 한 번만 받아도 영구 정지하던 흐름을 보완했다. 읽기 중 상호작용 일시정지와 사용자가 직접 누른 일시정지를 분리해, 상호작용이 끝나면 3초 자동 전환을 재개하고 수동 정지는 유지한다. reduced-motion 환경에서는 자동 전환을 끄고 상태 문구를 표시한다. PR #191, main workflow 37177762069, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했고, NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-RECOVERY-AUTOPLAY-20261004, E-PLAYWRIGHT-RECOVERY-AUTOPLAY-20261004, E-DEPLOY-PIPELINE-RECOVERY-AUTOPLAY-20261004, E-LIVE-PUBLIC-RECOVERY-AUTOPLAY-20261004.

## 모바일 연구 결과 도표 보조문구 가독성 공개 배포: 2026-10-04 / candidate 43e5942

연구 결과 도표의 모바일 증가·감소 방향 표기와 시각 요소 설명문을 키워 320px·390px에서도 핵심 비교가 먼저 읽히도록 보완했다. 연구 수치·출처·제품 독립 경계는 변경하지 않았다. PR #190, main workflow 37176650203, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했고, NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-RESEARCH-CHART-LEGIBILITY-20261004, E-PLAYWRIGHT-RESEARCH-CHART-LEGIBILITY-20261004, E-DEPLOY-PIPELINE-RESEARCH-CHART-LEGIBILITY-20261004, E-LIVE-PUBLIC-RESEARCH-CHART-LEGIBILITY-20261004.

## 반응형 헤더 경계 보완 공개 배포: 2026-10-04 / candidate 25c55f9

861px에서 전체 내비게이션이 너무 일찍 열리며 오른쪽 공유 버튼이 잘리던 문제를 확인하고, compact 헤더·메뉴 배경의 상한을 900px로 연장했다. PR #189, main workflow 37175326245, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-TABLET-BREAKPOINT-20261004, E-PLAYWRIGHT-TABLET-BREAKPOINT-20261004, E-DEPLOY-PIPELINE-TABLET-BREAKPOINT-20261004, E-LIVE-PUBLIC-TABLET-BREAKPOINT-20261004.

## 태블릿 헤더 큰 글씨 조절 표식 공개 배포: 2026-10-04 / candidate 45a01bf

701–860px 태블릿 헤더에서 빈 버튼처럼 보이던 큰 글씨 조절 버튼에 `가+` 표식을 복원했다. PR #188, main workflow 37174574201, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-TABLET-READING-CONTROL-20261004, E-PLAYWRIGHT-TABLET-READING-CONTROL-20261004, E-DEPLOY-PIPELINE-TABLET-READING-CONTROL-20261004, E-LIVE-PUBLIC-TABLET-READING-CONTROL-20261004.

## 모바일 연구 기준 범례 가독성 공개 배포: 2026-10-04 / candidate 746fd126

모바일 연구 기준 범례를 한 줄 압축에서 세로 흐름으로 정리하고, 연구 기준 제목·범례·설명 글자 크기를 13px·13px·12px로 조정했다. 연구 확장 제목의 줄바꿈 뒤 공백도 보존해 화면과 접근성 텍스트의 문장 흐름을 맞췄다. PR #187, main workflow 37173572877, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-MOBILE-RESEARCH-LEGEND-20261004, E-PLAYWRIGHT-MOBILE-RESEARCH-LEGEND-20261004, E-DEPLOY-PIPELINE-MOBILE-RESEARCH-LEGEND-20261004, E-LIVE-PUBLIC-MOBILE-RESEARCH-LEGEND-20261004.

## 모바일 연구 읽기 순서 가독성 공개 배포: 2026-10-04 / candidate 76b3adc

모바일 연구 지도 아래 한 줄로 압축되어 있던 읽는 순서를 지도·대상·결과·해석 4단계 시각 순서표로 정리했다. 모바일 본문은 13px, 번호 원형은 30px로 조정해 연구 카드를 어떤 순서로 읽는지 즉시 파악하도록 했으며, 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다. PR #186, main workflow 37172733343, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. NAVI 상태는 USER_DECISION, 완료 게이트는 NOT_READY로 유지한다.

증적: E-LOCAL-BUILD-RESEARCH-READ-ORDER-20261004, E-PLAYWRIGHT-RESEARCH-READ-ORDER-20261004, E-DEPLOY-PIPELINE-RESEARCH-READ-ORDER-20261004, E-LIVE-PUBLIC-RESEARCH-READ-ORDER-20261004.

## 전문가 영상 fallback 포스터 공개 배포: 2026-10-04 / candidate `c97d2ac`

원격 YouTube 썸네일이 응답하지 않을 때도 수면·자율신경·연구·GABA란 주제를 기존 자연 이미지 톤의 fallback 포스터로 구분하도록 보완했다. 실제 썸네일은 우선 사용하며, 필터·선택·즉시 재생·출처·공유 흐름은 유지했다. 영상 재생에 필요하지 않은 iframe `web-share` 권한 토큰을 제거해 콘솔 경고를 정리했다. PR #185, main workflow `37171708026`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했고, NAVI 문서 동기화 당시 candidate `88c6efd`에서도 라이브 검증을 통과했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-POSTERS-20261004`, `E-PLAYWRIGHT-EXPERT-VIDEO-POSTERS-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-POSTERS-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-POSTERS-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-POSTERS-FINAL-20261004`.

## 연구 결과 비교 도표 방향성 공개 배포: 2026-10-04 / candidate `86891bc`

연구 결과 카드의 비교 조건과 GABA 조건이 문구를 다시 읽지 않아도 구분되도록 상대 방향 막대 길이를 보완했다. 실제 효과 크기로 오인하지 않도록 방향 비교 주석은 유지했으며 연구 수치·출처·제품 독립 경계는 변경하지 않았다. PR #184, main workflow `37170799368`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-PLAYWRIGHT-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-LIVE-PUBLIC-RESEARCH-COMPARISON-DIRECTION-20261004`.

## 모바일 전문가 영상 썸네일 갤러리 공개 배포: 2026-10-04 / candidate `a77c91c`

전문가 영상 게시판을 390px 모바일에서 썸네일 중심 2열 갤러리로 정리하고, 350px 이하에서는 1열로 복귀하도록 보완했다. 제목·채널명·선택 상태의 밀도를 조정해 긴 목록보다 시각적으로 빠르게 탐색하도록 했으며, 영상 선택·즉시 재생·출처·공유 흐름은 유지했다. PR #183, main workflow `37169365913`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-VIDEO-GALLERY-20261004`, `E-PLAYWRIGHT-MOBILE-VIDEO-GALLERY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-VIDEO-GALLERY-20261004`, `E-LIVE-PUBLIC-MOBILE-VIDEO-GALLERY-20261004`.

## 마지막 이야기 공유 장 시각 균형 공개 배포: 2026-10-04 / candidate `ec2a1bd`

마지막 장 오른쪽의 과도한 빈 공간을 저채도 동심원 신호와 GABA 워터마크로 보완했다. 모바일에서는 그래픽을 낮은 대비로 배치해 핵심 문구를 우선하고, 데스크톱에서는 시작 장면의 자연·과학 톤을 마지막 장까지 연결한다. PR #182, main workflow `37168287853`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-FINAL-SIGNAL-20261004`, `E-PLAYWRIGHT-FINAL-SIGNAL-20261004`, `E-DEPLOY-PIPELINE-FINAL-SIGNAL-20261004`, `E-LIVE-PUBLIC-FINAL-SIGNAL-20261004`.

## 모바일 회복 카드 탐색 affordance 공개 배포: 2026-10-04 / candidate `8e22d51`

수면·회복 보충 구간의 14단계 읽기 경로를 모바일에서 더 쉽게 찾도록 아이콘·번호 크기와 hover·focus-visible 상태를 보완했다. PR #181, main workflow `37167336445`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 공개 390px Chrome fallback에서 14단계·가로 폭·마지막 카드 선택·자동 일시정지를 확인했으며, 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-AFFORDANCE-20261004`, `E-PLAYWRIGHT-RECOVERY-MAP-AFFORDANCE-20261004`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-AFFORDANCE-20261004`, `E-LIVE-PUBLIC-RECOVERY-MAP-AFFORDANCE-20261004`.

## 전문가 영상 로딩 포스터 연속성 공개 배포: 2026-10-04 / candidate `44337e5`

전문가 영상 선택 직후 어두운 빈 iframe처럼 보이던 순간을 보완했다. 같은 Shorts 썸네일을 9:16 프레임에 유지하고 로딩 상태만 겹쳐 보여, 실제 영상이 준비될 때까지 화면의 시각적 연속성을 지킨다. PR #179, main workflow `37166334839`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-LOADING-POSTER-20261004`, `E-PLAYWRIGHT-VIDEO-LOADING-POSTER-20261004`, `E-DEPLOY-PIPELINE-VIDEO-LOADING-POSTER-20261004`, `E-LIVE-PUBLIC-VIDEO-LOADING-POSTER-20261004`.

## 모바일 보조 문구·전문가 영상 영역 고도화 공개 배포: 2026-10-04 / candidate `a2a2d3f`

320px 모바일 첫 화면의 보조 문구를 12px로 조정해 읽기성을 높이고, 전문가 세로 영상 선택 영역을 250x444px로 확장해 9:16 비율을 유지했다. PR #178, main workflow `37165443025`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 최종 공개 320px·390px Chrome fallback에서 가로 넘침·브라우저 오류 없이 문구와 영상 프레임을 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-LABEL-MEDIA-20261004`, `E-PLAYWRIGHT-MOBILE-LABEL-MEDIA-20261004`, `E-DEPLOY-PIPELINE-MOBILE-LABEL-MEDIA-20261004`, `E-LIVE-PUBLIC-MOBILE-LABEL-MEDIA-20261004`.

## 수면과 회복 연결 문구 명료화 공개 배포: 2026-10-04 / candidate `eded7a9`

상단 진행 레일의 모호한 `이어 읽기 / 12`를 소비자가 바로 이해할 수 있는 `다음 장으로 이어져요`로 정리했다. PR #177, main workflow `37164504662`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 최종 공개 390px Chrome fallback에서 문구·aria-label·제목·가로 폭·브라우저 오류를 확인했고 320px·1440px 대표 감사도 통과했다. 한 차례 YouTube iframe의 Chrome Permissions Policy 경고가 관찰됐으나 즉시 재실행에서 재현되지 않아 외부 iframe 잔여 검증으로 기록했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-INTERLUDE-COPY-20261004`, `E-PLAYWRIGHT-INTERLUDE-COPY-20261004`, `E-DEPLOY-PIPELINE-INTERLUDE-COPY-20261004`, `E-LIVE-PUBLIC-INTERLUDE-COPY-20261004`.

## 같은 페이지 해시 맥락 동기화 공개 배포: 2026-10-04 / candidate `a8689a3`

같은 공개 안내서 안에서 해시가 바뀔 때 연구 선택과 이전 장 제목·진행 레일이 어긋날 수 있던 상태 경합을 보완했다. 공통 해시→장 변환기와 현재 해시가 아닌 초기 정렬 타이머 중단을 적용했다. PR #176, main workflow `37163479968`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 최종 공개 390px Chrome fallback에서 recovery-break→research-skin→expert-videos 이동, 제목·진행 레일·가로 폭·브라우저 오류 없음을 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-HASH-CONTEXT-20261004`, `E-PLAYWRIGHT-HASH-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-HASH-CONTEXT-20261004`, `E-LIVE-PUBLIC-HASH-CONTEXT-20261004`.

## 현재 장 이동 읽기 레일 동기화 공개 배포: 2026-10-04 / candidate `a396ca8`

모바일 메뉴 이동 직후 읽기 진행 레일과 브라우저 제목이 이전 장으로 되돌아가던 상태 경합을 보완했다. smooth scroll 동안 목적지 장을 유지하고, 사용자의 직접 스크롤과 연구→전문가 영상 연속 이동에서는 잠금을 해제한다. PR #174, main workflow `37162395001`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 최종 공개 390px Chrome fallback에서 연구 지도 즉시 동기화, 연구 카드·전문가 영상·마지막 공유, 가로 폭·브라우저 오류 없음을 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-CHAPTER-RAIL-SYNC-20261004`, `E-PLAYWRIGHT-CHAPTER-RAIL-SYNC-20261004`, `E-DEPLOY-PIPELINE-CHAPTER-RAIL-SYNC-20261004`, `E-LIVE-PUBLIC-CHAPTER-RAIL-SYNC-20261004`.

## 현재 읽는 위치 공유 맥락 공개 배포: 2026-10-04 / candidate `b03b7df`

자연 스크롤로 마지막 장까지 읽은 뒤에도 공유 버튼이 이전 장의 해시를 사용하던 흐름을 보완했다. 현재 장·연구 카드·선택 전문가 영상에 맞춰 공유 URL을 재구성하며, `#research-muscle`, `?video=RLAU1VWGsaI#expert-videos`, `#final` 주소를 각각 확인했다. PR #173, main workflow `37161370503`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 최종 공개 390px Chrome fallback에서 메뉴·큰 글씨·연구 선택·영상 iframe·가로 폭·브라우저 오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-SHARE-CONTEXT-20261004`, `E-PLAYWRIGHT-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-SHARE-CONTEXT-20261004`.

## 마지막 이야기 공유 라벨 일관성 공개 배포: 2026-10-04 / candidate `26077a2`

본문의 `12 · 이야기 공유`와 상단 진행 레일·브라우저 제목의 `공유하기`를 `이야기 공유`로 통일했다. PR #172, main workflow `37160262285`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 최종 공개 390px Chrome fallback에서 제목·진행 레일·본문 번호·가로 폭·브라우저 오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-FINAL-LABEL-20261004`, `E-PLAYWRIGHT-FINAL-LABEL-20261004`, `E-DEPLOY-PIPELINE-FINAL-LABEL-20261004`, `E-LIVE-PUBLIC-FINAL-LABEL-20261004`.

## 수면과 회복 진행 문구 명료화 공개 배포: 2026-10-04 / candidate `14528e9`

`잠깐, 수면과 회복` 구간의 모호한 `보충 / 12` 진행 표시를 `이어 읽기 / 12`로 바꾸고, 보조기기 안내 문장도 같은 뜻으로 정렬했다. PR #171, main workflow `37159578042`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 최종 공개 390px Chrome fallback에서 문구·aria-label·가로 폭·브라우저 오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-INTERLUDE-PROGRESS-20261004`, `E-PLAYWRIGHT-INTERLUDE-PROGRESS-20261004`, `E-DEPLOY-PIPELINE-INTERLUDE-PROGRESS-20261004`, `E-LIVE-PUBLIC-INTERLUDE-PROGRESS-20261004`.

## 연구 지도 딥링크 상태 복원 공개 배포: 2026-10-04 / candidate `4d9bfde`

`#research-skin` 등 연구 카드 공유 링크가 초기 진입에서 선택 연구 지도·상세 카드·읽기 진행·브라우저 제목을 함께 복원하도록 보완했다. 브라우저 해시 변경 시에도 연구 주제 상태를 동기화한다. PR #170, main workflow `37158456376`, NAVI 문서 동기화 workflow `37158735199`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·최종 candidate `cb494e2`·공개 데이터 정합성이 성공했다. 최종 공개본을 대상으로 Playwright Chrome fallback 390/1440px에서 피부 딥링크 진입 후 근육 해시 변경을 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-PLAYWRIGHT-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-LIVE-PUBLIC-RESEARCH-DEEPLINK-CONTEXT-20261004`.

## 선택 영상 카드 직접 공유 고도화 공개 배포: 2026-10-04 / candidate `e709f2c`

전문가 영상 선택 카드 안에 `이 영상 공유` 행동을 추가했다. 현재 영상의 제목·video 쿼리·`#expert-videos` 위치를 그대로 공유하도록 기존 chapter-aware payload를 연결하고, 모바일에서도 읽기 쉬운 dark-panel 버튼과 focus-visible 상태를 적용했다. PR #169, main workflow `37157666983`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 공개 320/390/1440px에서 공유 버튼·toast·payload·포스터·진행 표시·가로 폭·브라우저 오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-DIRECT-VIDEO-SHARE-20261004`, `E-PLAYWRIGHT-DIRECT-VIDEO-SHARE-20261004`, `E-DEPLOY-PIPELINE-DIRECT-VIDEO-SHARE-20261004`, `E-LIVE-PUBLIC-DIRECT-VIDEO-SHARE-20261004`.

## 전문가 영상 공유·재진입 맥락 고도화 공개 배포: 2026-10-04 / candidate `68efaca`

선택한 전문가 영상의 식별자를 `?video=...#expert-videos`에 보존하고, 공유 URL 재진입 시 같은 영상과 장 위치를 복원하도록 고도화했다. 브라우저 제목과 공유 문구도 현재 장·선택 영상에 맞춰 갱신하고 recovery heading의 접근성 문장을 보정했다. PR #167 merge `a1de959`, heartbeat PR #168 merge `68efaca`, main workflow `37156517433`, live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 로컬·공개 320/390/1440px에서 클릭·새로고침 복원·포스터/iframe 지연·가로 폭·브라우저 오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-SHARE-CONTEXT-20261004`, `E-PLAYWRIGHT-VIDEO-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-VIDEO-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-VIDEO-SHARE-CONTEXT-20261004`.

## 모바일 퍼블리싱 성능·타이포그래피 고도화 공개 배포: 2026-10-04 / candidate `d71ab6c`

첫 화면에 보이지 않는 전문가 영상 썸네일을 지연 로딩으로 전환해 초기 모바일 진입 요청을 줄이고, 한국어 장문 제목에 균형 잡힌 줄바꿈을 적용했다. PR #166, main workflow `37154976973`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 로컬·공개 320/390/1440px 직접 링크, 초기 영상 요청 0건, 연구 지도 근육 카드 이동, 가로 폭·브라우저 오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-PERFORMANCE-20261004`, `E-PLAYWRIGHT-MOBILE-PERFORMANCE-20261004`, `E-DEPLOY-PIPELINE-MOBILE-PERFORMANCE-20261004`, `E-LIVE-PUBLIC-MOBILE-PERFORMANCE-20261004`.

## 직접 공유 링크 정렬 안정화 공개 배포: 2026-10-04 / candidate `818cc2f`

`#expert-videos` 같은 장으로 직접 진입할 때 이미지·폰트·레이아웃이 늦게 안정화되어 제목이 어긋날 수 있는 흐름을 PR #165에서 보완했다. 초기 정렬과 다중 안정화 시점, `window.load`·`document.fonts`·`ResizeObserver` 재정렬을 적용했다. main workflow `37153757926`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 로컬·공개 320/390/1440px Chrome fallback에서 제목·진행 레일·영상 영역·가로 폭·오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-DEEP-LINK-ALIGN-20261004`, `E-PLAYWRIGHT-DEEP-LINK-ALIGN-20261004`, `E-DEPLOY-PIPELINE-DEEP-LINK-ALIGN-20261004`, `E-LIVE-PUBLIC-DEEP-LINK-ALIGN-20261004`.

## 전문가 영상 선택 포커스 복귀 공개 배포: 2026-10-04 / candidate `c33b427`

전문가 영상 카드를 클릭하거나 Enter로 선택한 뒤 새 영상 영역을 바로 읽을 수 있도록 `#expert-video-feature`에 포커스를 복귀시키고 동적 제목 연결·`aria-live`·focus-visible 윤곽선을 보강했다. PR #164, main workflow `37152307391`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 로컬 390px Chrome fallback에서 영상 iframe 전환·선택 카드 1개·가로 넘침 없음·오류 없음을 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-VIDEO-FEATURE-FOCUS-20261004`, `E-PLAYWRIGHT-VIDEO-FEATURE-FOCUS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-FEATURE-FOCUS-20261004`, `E-LIVE-PUBLIC-VIDEO-FEATURE-FOCUS-20261004`.

## 공개 배포 자동 재감리·NAVI 동기화: 2026-10-04 / candidate `4d94150`

최신 공개본을 실제 독자 흐름으로 자동 재현했다. 390px 메뉴·포커스·연구 지도·수면 영상 필터·iframe 즉시 재생·3초 회복 카드, 320/390/412/768/1440px 직접 해시 진입을 확인했고 새 CRITICAL/MAJOR 결함은 없었다. NAVI 문서 동기화 후 main workflow `37151251781`의 Pages 배포·라이브 smoke·release status까지 성공했으며 라이브 validator도 HTTP 200·STATIC·candidate `4d94150`·정적 공개 경계 정합성을 유지했다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 외부 브라우저·실사용자·독립 과학·규제 감수는 남아 있다. 공개 UI 코드 변경은 필요하지 않아 불필요한 재작업은 하지 않고 NAVI 증거·감사·레드팀 기록만 갱신했다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-PLAYWRIGHT-PUBLIC-INTERACTION-AUDIT-20261004`, `E-PLAYWRIGHT-PUBLIC-HASH-CROSSWIDTH-20261004`, `E-DEPLOY-PIPELINE-PUBLIC-RECHECK-20261004`, `E-LIVE-PUBLIC-CURRENT-RECHECK-20261004`.

## 모바일 메뉴 닫힘 포커스 복귀 공개 배포: 2026-10-04 / candidate `510e9ad`

모바일 메뉴 항목 이동과 배경 클릭으로 메뉴가 닫힐 때 키보드·스크린리더 포커스가 문서 배경에 남지 않도록 토글 버튼으로 복귀시켰다. PR #163, main workflow `37149705144`, Pages·라이브 smoke·release status와 공개 live validator, 390px Chrome fallback 상호작용 검증이 성공했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS-20261004`, `E-PLAYWRIGHT-MOBILE-MENU-FOCUS-20261004`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS-20261004`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS-20261004`.

## 직접 해시 진입 정렬 고도화 공개 배포: 2026-10-04 / candidate `70d66b5`

직접 링크로 연구·수면·전문가 영상 장에 들어올 때 제목이 고정 읽기 레일에 늦게 맞춰지던 문제를 PR #162에서 `useLayoutEffect` 초기 정렬과 180/420/780ms 안정화 재정렬로 보완했다. main workflow `37148328986`, Pages·라이브 smoke·release status, 공개 390px 해시 진입 검증과 live validator가 성공했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-DIRECT-HASH-NAV-20261004`, `E-PLAYWRIGHT-DIRECT-HASH-NAV-20261004`, `E-DEPLOY-PIPELINE-DIRECT-HASH-NAV-20261004`, `E-LIVE-PUBLIC-DIRECT-HASH-NAV-20261004`.

## 모바일 읽기 라벨·읽기 크기 조절 고도화 공개 배포: 2026-10-04 / candidate `37737d2`

모바일 읽기 흐름의 진행 상태·장 표시·연구 출처·결과 방향 라벨을 12px 기준으로 보정하고, 읽기 크기 조절 버튼에 `가+`/`가−` 표기를 추가했다. PR #161, main workflow `37147186088`, Pages·라이브 smoke·release status와 공개 validator, 320/390/1440px Chrome fallback 검증이 성공했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-MOBILE-READING-CLARITY-20261004`, `E-PLAYWRIGHT-MOBILE-READING-CLARITY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-READING-CLARITY-20261004`, `E-LIVE-PUBLIC-MOBILE-READING-CLARITY-20261004`.

## 전문가 영상 저해상도 썸네일 방어 공개 배포: 2026-10-04 / candidate `52ff08b`

YouTube 썸네일이 오류 대신 저해상도 성공 응답을 반환해도 decoded width를 검사하고, 기본·대체 이미지 모두 기준 미달이면 `GABA VIDEO` 표지를 노출하도록 PR #160에서 보완했다. 로컬·공개 Playwright, main workflow `37145916564`, Pages·라이브 smoke·release status·공개 validator를 재검증했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-RESOLUTION-20261004`.

## 전문가 영상 썸네일 이중 실패 fallback 보완 공개 배포: 2026-10-04 / candidate `342f43f`

기본·대체 썸네일 URL이 모두 실패하는 경우에도 이미지 요소가 `GABA VIDEO` 표지를 가리지 않도록 실패 상태를 보완했다. PR #158 checks, main workflow `37144428732`, Pages·라이브 smoke·release status와 공개 validator, 320/390/1440px 정상 썸네일 로딩 및 390px 강제 이중 실패 fallback을 재검증했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-FALLBACK-20261004`.

## 전문가 영상 썸네일 로딩 품질 공개 배포: 2026-10-04 / candidate `8093615`

전문가 영상 게시판의 첫 4개 썸네일을 eager 로드하고, 지연 로드 중에는 `GABA VIDEO` 표지를 보여줘 빈 썸네일 영역이 완성도 저하로 보이지 않도록 보완했다. PR #155 checks, main workflow `37142835851`, Pages·라이브 smoke·release status, 공개 validator와 320/390/1440px Chrome fallback을 재검증했다. `수면` 필터 4개 카드와 `잠이 안 올 때 GABA 이야기` 선택 후 iframe 전환도 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-VIDEO-THUMBNAILS-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAILS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAILS-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAILS-20261004`.

## 모바일 기본 카드 장식 겹침 보정 공개 배포: 2026-10-04 / candidate `4e558ee`

320px 화면에서 GABA 기본 설명 카드의 달 아이콘이 본문 마지막 줄과 겹치던 가독성 결함을 확인하고 모바일 카드에 장식 전용 하단 여백을 확보했다. 로컬 typecheck·UI contract·127 tests·build, PR #153 checks, main workflow `37141668244`, Pages·라이브 smoke·release status, 공개 validator와 320/390px Chrome fallback을 재검증했다. 공개 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-DEFINITION-MOTIF-20261004`, `E-PLAYWRIGHT-DEFINITION-MOTIF-20261004`, `E-DEPLOY-PIPELINE-DEFINITION-MOTIF-20261004`, `E-LIVE-PUBLIC-DEFINITION-MOTIF-20261004`.

## 모바일 연구 결과 카드 가독성 고도화 공개 배포: 2026-10-04 / candidate `7a6db416`

320px·390px에서 연구 결과 카드가 가용 폭을 모두 사용하도록 보정해 도표 라벨의 불필요한 줄바꿈과 세로 밀도를 줄였다. 연구 문구·데이터·해석·제품 독립 경계는 변경하지 않았다. PR #151의 release-verify·site-quality-verify, main workflow `37140273727`의 정적 Pages 배포·라이브 smoke·release status와 공개 validator가 성공했다. 공개 Playwright Chrome fallback 320/390/1440px에서 카드 폭 280/350/1180px, 도표 폭 244/314/687px, 가로 넘침 없음·브라우저 오류 없음을 확인했다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-RESEARCH-CARD-WIDTH-20261004`, `E-PLAYWRIGHT-RESEARCH-CARD-WIDTH-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-CARD-WIDTH-20261004`, `E-LIVE-PUBLIC-RESEARCH-CARD-WIDTH-20261004`.

## 장 진입 표시와 고정 읽기 바 겹침 보정 공개 배포: 2026-10-04 / candidate `b9f21d0ceba52e0d3ea4745d65232e3661ffd7ea`

장 링크로 이동할 때 제목만 맞추던 기준을 장 헤더 전체로 바꿔 `06 · 연구의 확장` 같은 작은 장 표시가 고정 읽기 진행 바 뒤에 숨지 않도록 보완했다. PR #149의 필수 검사, main workflow `37139270708`, Pages 배포, 라이브 smoke, release status와 공개 validator가 성공했다. 공개 Playwright Chrome fallback 320/390/1440px에서 `#research` 직접 진입 시 장 표시·제목·진행 바 간격, 가로 넘침 없음, 브라우저 오류 없음을 확인했다. 공개 과학 카피·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-CHAPTER-ENTRY-20261004`, `E-PLAYWRIGHT-CHAPTER-ENTRY-20261004`, `E-DEPLOY-PIPELINE-CHAPTER-ENTRY-20261004`, `E-LIVE-PUBLIC-CHAPTER-ENTRY-20261004`.

## 모바일 전문가 영상 주제 전체 노출 공개 배포: 2026-10-04 / candidate `71960f083e21577641074358b74a0ca447cdd216`

모바일 전문가 영상 주제 필터를 가로 스크롤에서 전체 주제 즉시 노출형 줄바꿈으로 바꿔 320px·390px에서도 7개 주제를 한눈에 확인할 수 있도록 보강했다. PR #147의 필수 검사, main workflow `37138030444`, Pages 배포, 라이브 smoke, release status와 공개 validator가 성공했다. 공개 Playwright Chrome fallback에서 320/390/1440px 가로 넘침 없음, `수용체` 필터 선택과 iframe 전환을 확인했다. 기존 과학 카피·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-VIDEO-FILTERS-20261004`, `E-PLAYWRIGHT-VIDEO-FILTERS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-FILTERS-20261004`, `E-LIVE-PUBLIC-VIDEO-FILTERS-20261004`.

## 출처 원문 행동 명시화 공개 배포: 2026-10-04 / candidate `32b37a11a327a351b79a3822029d35d19d58bae6`

출처 읽기 브리지의 실제 연구 카드에 아이콘만 두지 않고 `원문 보기` 행동을 명시해 모바일과 큰 글씨 읽기에서 다음 행동을 바로 이해하도록 보강했다. PR #145의 필수 검사, main workflow `37136765623`, Pages 배포, 라이브 smoke, release status와 공개 validator가 성공했다. 공개 Playwright Chrome fallback 320/390/1440px에서 네 단계·원문 표시·가로 넘침 없음·메뉴/연구 지도/전문가 영상 선택 재생을 확인했고, `원문 보기` 클릭은 PubMed 새 탭으로 이동했다. 기존 과학 카피·제품 독립 경계는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-SOURCE-ACTION-20261004`, `E-PLAYWRIGHT-SOURCE-ACTION-20261004`, `E-DEPLOY-PIPELINE-SOURCE-ACTION-20261004`, `E-LIVE-PUBLIC-SOURCE-ACTION-20261004`.

## 출처 읽기 브리지 고도화 공개 배포: 2026-10-04 / candidate `a8cc869b2c1537b2568b2f0e99c31adc3eae9353`

`출처 읽기`의 빈 연결 구간을 `누구를 살폈나요? → 어떻게 비교했나요? → 무엇이 달라졌나요? → 어디까지 알 수 있나요?`의 네 질문과 Yoto et al. 2012 PubMed 원문 예시로 보강했다. PR #143의 필수 검사, main workflow `37135553445`, Pages 배포, 라이브 smoke, release status와 공개 validator가 성공했으며 공개 Playwright Chrome fallback 320/390/1440px에서 네 단계·원문 링크·가로 넘침 없음·핵심 메뉴/영상 상호작용을 확인했다. 과학 카피·제품 독립 경계는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-SOURCE-BRIDGE-20261004`, `E-PLAYWRIGHT-SOURCE-BRIDGE-20261004`, `E-DEPLOY-PIPELINE-SOURCE-BRIDGE-20261004`, `E-LIVE-PUBLIC-SOURCE-BRIDGE-20261004`.

## NAVI 문서 병합 후 최신 공개 SHA 동기화: 2026-10-04 / candidate `621251166c2902a7ea2a8fae44b5230f97242ff9`

NAVI 증거·감사·레드팀 문서 PR #141 병합 후 main workflow `37134462216`의 release-verify·worker-readiness·GitHub Pages 배포·라이브 smoke·release status가 성공했다. 라이브 validator는 문서 병합 후 공개 candidate `6212511…`, HTTP 200, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 재확인했다. 공개 UI·과학 카피·제품 정보는 변경하지 않았고 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LIVE-PUBLIC-NAVI-SYNC-20261004`.

## 모바일 차트 가독성·긴 장 이동 충돌 보완 공개 재검증: 2026-10-04 / candidate `b778f23b65a67cf919171d212a9305927a34d0ff`

모바일 연구 결과 도표의 비교 조건·연구 메타데이터에 가독성 바닥값을 적용하고, 초기 `#top` 정렬 타이머가 사용자의 긴 장 이동을 되돌리던 충돌을 수동 이동 시 취소하도록 보완했다. PR #140의 필수 검사와 main workflow `37133909361`의 release-verify·worker-readiness·GitHub Pages 배포·라이브 smoke·release status가 성공했으며 Worker는 정적 전용 모드로 건너뛰었다. 공개 validator는 HTTP 200, candidate SHA 일치, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 공개 Playwright Chrome fallback 320/390/1440px에서 차트 폭·가로 넘침·연구 지도 장 이동·전문가 영상 선택 재생·브라우저 오류 없음을 재확인했다. 공개 과학 카피와 제품 정보는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-CHART-NAV-20261004`, `E-PLAYWRIGHT-MOBILE-CHART-NAV-20261004`, `E-DEPLOY-PIPELINE-CHART-NAV-20261004`, `E-LIVE-PUBLIC-CHART-NAV-20261004`.

## 출처 읽기 장의 시각·시맨틱 계층 보강: 2026-10-04 / candidate `4379325e8773cbbea9ee1a9aee86ed02ac282bab`

`출처 읽기` 장에 `연구를 이해하는 마지막 단계` h2와 `연구 카드 → 원문 출처` 흐름을 추가하고 `aria-labelledby`를 연결했다. PR #138의 release-verify·site-quality-verify, main workflow `37131613828`의 release-verify·worker-readiness·정적 Pages 배포·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200, 정적 모드, candidate SHA 일치, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 공개 Playwright Chrome fallback 390/1440px에서 출처 읽기 제목 정렬과 13개 장 직접 링크, 모바일 메뉴·전문가 영상 필터·선택 즉시 재생·가로 넘침·브라우저 오류 없음을 확인했다. 기존 공개 과학 카피와 제품 정보는 변경하지 않았다. NAVI 상태는 사용자 결정 대기(`USER_DECISION`)로 유지한다. 증적: `E-LOCAL-BUILD-READING-NOTE-20261004`, `E-PLAYWRIGHT-READING-NOTE-20261004`, `E-DEPLOY-PIPELINE-READING-NOTE-20261004`, `E-LIVE-PUBLIC-READING-NOTE-20261004`.

## 모바일 장 딥링크를 실제 제목에 정렬: 2026-10-03 / candidate `a189d9432cc7003def5a791b381c6b15a55aab09`

상단 메뉴와 장 직접 링크가 섹션의 넓은 상단 여백에 멈추지 않고 실제 장 제목을 sticky 읽기 레일 아래에 보여주도록 보정했다. PR #136의 release-verify·site-quality-verify, main workflow `37130208546`의 release-verify·worker-readiness·정적 Pages 배포·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200, 정적 모드, candidate SHA 일치, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 공개 Playwright Chrome fallback 390/1440px에서 `#basics`, `#recovery-break`, `#research`, `#expert-videos`, `#final` 제목 정렬과 `02 / 12`, `보충 / 12`, `06 / 12`, `10 / 12`, `12 / 12` 진행표를 확인했고 모바일 메뉴 이동·영상 필터·선택 즉시 재생·가로 넘침·브라우저 오류가 없었다. 기존 공개 과학 카피와 제품 정보는 변경하지 않았다. NAVI 상태는 사용자 결정 대기(`USER_DECISION`)로 유지한다. 증적: `E-LOCAL-BUILD-CHAPTER-DEEPLINK-20261003`, `E-PLAYWRIGHT-CHAPTER-DEEPLINK-20261003`, `E-DEPLOY-PIPELINE-CHAPTER-DEEPLINK-20261003`, `E-LIVE-PUBLIC-CHAPTER-DEEPLINK-20261003`.

## NAVI 기록 병합 후 공개본 동기화: 2026-10-03 / candidate `1d74ed2ae7ed4cc8b090c0f8f8e98dfb0bff3a81`

PR #134로 앞선 읽기 진행표·직접 링크 고도화의 NAVI 증거대장을 main에 병합했다. 문서 병합 후 main workflow `37128765447`의 release-verify·worker-readiness·정적 Pages 배포·라이브 smoke·release status가 성공했고, 공개 validator는 candidate SHA `1d74ed2…`, HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 이번 기록은 문서·운영 증거 동기화이며 공개 화면의 과학 카피나 제품 광고는 변경하지 않았다. 증적: `E-DEPLOY-PIPELINE-NAVI-DOCS-20261003`, `E-LIVE-PUBLIC-NAVI-DOCS-20261003`.

## 읽기 진행표·직접 링크 정합성 고도화 공개 재검증: 2026-10-03 / candidate `33e8b6a57202c21826ec2ebf3ffcd8b55ee01466`

읽기 진행표에서 실제 본문 12개 장과 수면·회복 보충 구간을 분리했다. 보충 구간은 `보충 / 12`, 마지막 공유 장은 `12 / 12`로 표시해 숫자와 본문 흐름을 일치시켰다. `#recovery-break`·`#final` 직접 링크는 이미지 레이아웃이 안정된 뒤 고정 읽기 레일 아래에 제목이 도착하도록 재정렬했다. PR #133의 release-verify·site-quality-verify, main workflow `37128146175`의 정적 Pages 배포·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200, candidate SHA 일치, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 공개 Playwright Chrome fallback 390/1440px에서 진행표·직접 링크·전문가 영상 필터·영상 즉시 재생·가로폭·오류를 재확인했다. 공개 GABA 과학 카피와 제품 정보는 변경하지 않았다. NAVI 상태는 사용자 결정 대기(`USER_DECISION`)로 유지한다. 증적: `E-LOCAL-BUILD-READING-PROGRESS-20261003`, `E-PLAYWRIGHT-READING-PROGRESS-20261003`, `E-DEPLOY-PIPELINE-READING-PROGRESS-20261003`, `E-LIVE-PUBLIC-READING-PROGRESS-20261003`.

## 모바일 전문가 영상 탐색 단서 고도화 공개 재검증: 2026-10-03 / candidate `5f7f1cdb0db9315ed39535ffb290160a98afedb9`

전문가 영상 주제 필터가 모바일에서 더 이어진다는 사실을 원형 화살표 단서로 명확히 표시하고, 가로 터치 스크롤 스냅과 오버스크롤 경계를 보완했다. PR #130의 release-verify·site-quality-verify와 main workflow `37126713484`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200, candidate SHA 일치, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 공개 Playwright Chrome fallback 390px에서는 단서가 시작 시 보이고 끝에서 사라졌으며, 영상 카드 선택 시 iframe 재생과 선택 상태가 갱신됐다. 1440px에서는 필터가 한 화면에 들어왔다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 배포 전 stale TF heartbeat gate는 예약 pulse 재실행과 보호된 heartbeat PR #131 병합으로 갱신한 뒤 재배포했다. 증적: `E-LOCAL-BUILD-VIDEO-RAIL-CUE-20261003`, `E-PLAYWRIGHT-VIDEO-RAIL-CUE-20261003`, `E-DEPLOY-PIPELINE-VIDEO-RAIL-CUE-20261003`, `E-LIVE-PUBLIC-VIDEO-RAIL-CUE-20261003`, `E-NAVI-TF-FRESHNESS-20261003`.

## 수면·회복 앵커와 고정 읽기 레일 충돌 보완 공개 재검증: 2026-10-03 / candidate `27e9f6f643f939e1a99bb9fe540493e76afa0860`

`#recovery-break`로 바로 진입하거나 메뉴에서 수면·회복으로 이동할 때 고정 읽기 레일이 장 제목을 가리지 않도록 `.guide-recovery-break`의 상단 여백 계약을 추가했다. PR #128 필수 검사와 main workflow `37124665367`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200, candidate SHA 일치, 70개 번들 해시, 공개 데이터 경계를 확인했고, 공개 Playwright Chrome 320/390/1440px에서 가로 넘침·런타임 오류가 없었으며 390/1440px 앵커 제목이 읽기 레일 아래에 도착했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RECOVERY-ANCHOR-20261003`, `E-PLAYWRIGHT-RECOVERY-ANCHOR-20261003`, `E-DEPLOY-PIPELINE-RECOVERY-ANCHOR-20261003`, `E-LIVE-PUBLIC-RECOVERY-ANCHOR-20261003`.

## 좁은 모바일 수면 연구 레이아웃 고도화 공개 재검증: 2026-10-03 / candidate `81d9dbba61ec9080a58be8c5b0824843b0a13ed9`

320px에서 수면 연구 카드가 콘텐츠 최소폭 때문에 우측으로 밀리던 문제를 `min-width: 0`과 `minmax(0, 1fr)`로 보완했다. 320/390/1440px 로컬·공개 Playwright Chrome에서 수면 그리드와 문서 가로폭을 확인했고, 390px 메뉴 이동·GABA란 앵커·큰 글씨 전환·연구 지도 선택도 재검증했다. PR #126 필수 검사와 main workflow `37123264421`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했으며, 라이브 validator는 HTTP 200·정적 번들·공개 데이터 경계를 확인했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-NARROW-SLEEP-20261003`, `E-PLAYWRIGHT-NARROW-SLEEP-20261003`, `E-DEPLOY-PIPELINE-NARROW-SLEEP-20261003`, `E-LIVE-PUBLIC-NARROW-SLEEP-20261003`.

## 히어로 제목 리듬·강조 색상 고도화 공개 재검증: 2026-10-03 / candidate `f2092694c7f3fb6e7ea940de828f1577769a6bf3`

데스크톱에서 모바일 전용 줄바꿈 요소가 안쪽 문장까지 블록으로 만들던 선택자를 제목 직계 요소로 제한하고, `GABA에서 읽습니다`를 넓은 화면에서는 한 문장 단위로 묶었다. 모바일 줄바꿈·teal 강조, 320/390/1440px 헤더와 다음 장 진입은 유지했다. PR #124의 필수 검사, main workflow `37121944648`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status, 라이브 validator가 성공했다. 로컬 Playwright 2개 상호작용 테스트와 공개 320/390/1440px 캡처를 확인했으며 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-HERO-RHYTHM-20261003`, `E-PLAYWRIGHT-HERO-RHYTHM-20261003`, `E-DEPLOY-PIPELINE-HERO-RHYTHM-20261003`, `E-LIVE-PUBLIC-HERO-RHYTHM-20261003`.

## 모바일 히어로·좁은 화면 헤더 고도화 공개 재검증: 2026-10-03 / candidate `badde8b982e1cee73b3a75d3513e65fcc38508c9`

모바일 히어로의 데스크톱 시각 트랙 잔류로 제목 일부가 잘리던 문제를 단일 열로 보정하고, 430px 이하 헤더에서 메뉴·큰 글씨·공유 컨트롤을 고정 44px 아이콘 버튼으로 배치했다. PR #121의 `release-verify`·`site-quality-verify`, main workflow `37120130983`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했다. 로컬과 공개 URL에서 실제 Playwright Chrome viewport 320/390/1440px를 캡처해 히어로 문장·제품 독립 안내·3분 읽기 레일·다음 장 진입과 데스크톱 2열 이미지를 확인했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-MOBILE-HERO-20261003`, `E-PLAYWRIGHT-MOBILE-HERO-20261003`, `E-DEPLOY-PIPELINE-MOBILE-HERO-20261003`, `E-LIVE-PUBLIC-MOBILE-HERO-20261003`.

## 연구 규모 인포그래픽 고도화 공개 재검증: 2026-10-03 / candidate `b8e6236d6dc749ea23191e45dd58d0ab9c542a0a`

같은 PubMed 검색 기준의 Harvard·Oxford 문헌은 기관 비교로 묶고, 별도 WoS Core Collection SCIE 분석은 독립된 강조 블록으로 분리해 연구 범위를 한눈에 구분하도록 고도화했다. PR #119 checks, main workflow `37118207429`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status, live validator, 390/320/1440px Chrome CDP fallback을 통과했다. 390px 연구 지도 피부 선택의 읽기 레일·상세 카드 동기화도 유지했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-SCALE-20261003`, `E-CDP-RESEARCH-SCALE-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-SCALE-20261003`, `E-LIVE-PUBLIC-RESEARCH-SCALE-20261003`.

## 연구 읽기 방향성 고도화 공개 재검증: 2026-10-03 / candidate `77a30323d2e5097a0f2be092c013615b1ee2ddd6`

긴 연구 카드 구간에서 sticky 읽기 레일이 현재 활성 연구 결과 제목을 함께 표시하도록 보완했다. 연구 지도에서 피부를 선택하면 `피부 연구 결과`와 `research-skin` 카드가 동기화되고, 좁은 화면에서는 제목이 한 줄 말줄임으로 보호된다. PR #117 checks, main workflow `37116937264`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status, live validator, 390/320/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-RAIL-ORIENTATION-20261003`, `E-CDP-RESEARCH-RAIL-ORIENTATION-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-RAIL-ORIENTATION-20261003`, `E-LIVE-PUBLIC-RESEARCH-RAIL-ORIENTATION-20261003`.

## 모바일 연구 비교 도표 고도화 공개 재검증: 2026-10-03 / candidate `4058bf61ed25d8fc95b3023f1187cdd78436cdb4`

연구 결과 도표에서 비교 조건과 GABA 조건을 390px 모바일에서는 좌우로 나란히 배치하고, 320px에서는 한 열로 전환했다. 보조기기용 차트 라벨에도 각 지표의 조건별 관찰 문장을 포함했다. PR #115 checks, main workflow `37115590977`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status, live validator, 390/320/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-MOBILE-COMPARISON-20261003`, `E-CDP-MOBILE-COMPARISON-20261003`, `E-DEPLOY-PIPELINE-MOBILE-COMPARISON-20261003`, `E-LIVE-PUBLIC-MOBILE-COMPARISON-20261003`.

## 전문가 영상 갤러리 고도화 공개 재검증: 2026-10-03 / candidate `10a61920df8bbcbe1b6f288a1d61425f48687800`

전문가 영상 썸네일을 고해상도 우선·대체 이미지 경로로 보완하고, 모바일에서 다음 주제가 더 있음을 보여주는 필터 continuation cue를 추가했다. `연구 읽기` 선택 시 카드와 영상이 즉시 동기화되고, 필터 끝에서는 단서가 사라진다. PR #113 checks, main workflow `37114410997`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status, live validator, 390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-EXPERT-VIDEO-BROWSING-20261003`, `E-CDP-EXPERT-VIDEO-BROWSING-20261003`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-BROWSING-20261003`, `E-LIVE-PUBLIC-EXPERT-VIDEO-BROWSING-20261003`.

## 최종 공개 재검증: 2026-10-03 / main `16fc5d4`

NAVI 문서 PR #111 병합 후 main workflow `37113016531`과 공개 URL을 재검증했다. release-verify·worker-readiness·Pages 배포·라이브 smoke·release-status가 성공했고 Worker는 정적 전용 모드로 건너뛰었다. 최종 live validator는 HTTP 200, 70개 번들 해시, 12개 공개 claim, 6개 master record, 6개 share page, `teaser HOLD`, 내부 운영 스냅샷 제외, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. 증적: `E-LIVE-PUBLIC-NAVI-MERGE-20261003`.

## 최신 공개 재검증: 2026-10-03 / candidate `cbd2f8ea1d5b341dbe5804b5f16f756e157c553b`

연구 지도에서 주제를 선택하면 도착한 상세 카드도 즉시 활성화되도록 보완했다. 카드 테두리·그림자·왼쪽 포인트가 지도 선택과 동기화되어 `지도 → 대상 → 결과` 흐름을 한눈에 따라갈 수 있다. PR #110의 검증, main workflow `37112425820`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했고 Worker는 `STATIC_ONLY` 조건으로 건너뛰었다. live validator는 HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. Chrome CDP fallback에서 390px 연구 지도 클릭 후 선택 지도·상세 카드가 함께 활성화되고 카드 top `113.09px`, 읽기 레일 bottom `105px`, document width `390px`, 오류 오버레이·런타임 오류 0건을 확인했으며 1440px document width는 `1425px`였다. 새 과학 주장·제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-MAP-ORIENTATION`, `E-CDP-RESEARCH-MAP-ORIENTATION`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-ORIENTATION`, `E-LIVE-PUBLIC-RESEARCH-MAP-ORIENTATION`.

## 최신 공개 재검증: 2026-10-03 / candidate `c6291f6bd2c62e77529da767b1d2a985f4acaab5`

모바일 CSS가 전역으로 숨기던 작은 장 제목을 다시 표시해 `수면과 회복`, `연구 규모`, `출처 읽기`, `이야기 공유`의 읽기 위치 단서를 복원했다. PR #108의 `release-verify`·`site-quality-verify`, main workflow `37111226511`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했다. live validator는 HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. Chrome CDP fallback에서 390px 제목 위치와 레일 하단 간격, 320px 가로 폭, 1440px 데스크톱 레이아웃을 재확인했다. 새 과학 주장·제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-MOBILE-CHAPTER-LABELS`, `E-CDP-MOBILE-CHAPTER-LABELS`, `E-DEPLOY-PIPELINE-MOBILE-CHAPTER-LABELS`, `E-LIVE-PUBLIC-MOBILE-CHAPTER-LABELS`.

## 최신 공개 재검증: 2026-10-03 / candidate `2ae71ef1e1aa7c5ff71ca429197ad70c22dce3c1`

모바일 장 진입점에서 고정 읽기 진행 레일이 장 번호와 제목 첫 줄을 덮던 문제를 PR #106에서 보완했다. 모바일 story section·수면/회복 break·final에 110px 상단 여백을 적용하고 UI contract guard를 추가했다. PR #106의 `release-verify`·`site-quality-verify`, main workflow `37109900221`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했다. live validator는 HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. Chrome CDP fallback에서 390px exact entry의 number top `110.19px`, heading top `124.19px`, rail bottom `105px`, document width `390px`, 1440px document width `1425px`를 확인했다. 새 과학 주장·제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RAIL-TITLE-CLEAR`, `E-CDP-RAIL-TITLE-CLEAR`, `E-DEPLOY-PIPELINE-RAIL-TITLE-CLEAR`, `E-LIVE-PUBLIC-RAIL-TITLE-CLEAR`.

## 최신 공개 재검증: 2026-10-03 / candidate `bf235edeeea780dd42d0261a5760f100cff2ba9d`

기본 공개 GABA 안내서 경로만 선행 import해 첫 상호작용을 앞당기고, 대기 중에도 동일한 헤더·히어로 리듬을 유지하는 branded loading shell을 추가했다. PR #104 checks `37108351783`·`37108351789`, main workflow `37108431389`, Pages 배포·라이브 smoke·release status, live validator, 390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-GUIDE-LOADING-SHELL`, `E-CDP-GUIDE-LOADING-SHELL`, `E-DEPLOY-PIPELINE-GUIDE-LOADING-SHELL`, `E-LIVE-PUBLIC-GUIDE-LOADING-SHELL`.

최신 공개 재검증: 2026-10-03 / candidate `b9160e40fbca673134ca1563651a00d8dfdd615a`

모바일 메뉴의 키보드 포커스가 배경으로 빠지지 않도록 Tab·Shift+Tab 순환을 추가하고, 현재 읽는 장을 `aria-current=location`으로 정리했다. PR #102 checks, main workflow `37106966171`, Pages 배포·라이브 smoke·release status, live validator, 390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-MOBILE-FOCUS-TRAP`, `E-CDP-MOBILE-FOCUS-TRAP`, `E-DEPLOY-PIPELINE-MOBILE-FOCUS-TRAP`, `E-LIVE-PUBLIC-MOBILE-FOCUS-TRAP`.

최신 공개 재검증: 2026-10-03 / candidate `9c2913db11440b10734345bc5bcba1d31161cc71`

읽기 진행 레일의 장 순서를 실제 페이지 흐름과 일치시키고 수면·회복 프롤로그를 03/13으로 정합화했다. 공유 해시 링크와 모바일 전문가 영상 선택 이동이 sticky header·reading rail 아래에 도착하도록 보정했다. PR #100 checks, main workflow `37105696713`, Pages 배포·라이브 smoke·release status, live validator, 390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-READING-RAIL-DEEPLINK`, `E-CDP-READING-RAIL-DEEPLINK`, `E-DEPLOY-PIPELINE-READING-RAIL-DEEPLINK`, `E-LIVE-PUBLIC-READING-RAIL-DEEPLINK`.

최신 공개 재검증: 2026-10-03 / candidate `3d788e39ef4d1dfa9d6d20845380ddcf7bfcc255`

모바일·태블릿 메뉴가 열릴 때 배경 콘텐츠를 어둡고 부드럽게 분리하고, body 스크롤을 잠그며, 배경 버튼으로 닫을 수 있도록 보완했다. 닫으면 원래 스크롤 상태로 복원된다. PR #98의 release-verify·site-quality-verify, main workflow `37104179510`, Pages 배포·라이브 smoke·release status, live validator, 390px·1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS`, `E-CDP-MOBILE-MENU-FOCUS`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS`.

최신 공개 재검증: 2026-10-03 / candidate `cf2f123a74013956399306c591f2de261d1bf049`

연구 결과 비교 도표의 장식형 신호를 증가·감소 방향 화살표와 `증가`·`감소` 라벨로 바꿔, 연구 문장을 시각적으로 더 빠르게 읽도록 했다. 320px 모바일에서는 `비교 조건`과 `GABA 섭취`가 글자 중간에서 끊기지 않도록 조건명을 고정했다. PR #96의 release-verify·site-quality-verify, main workflow `37103072296`, Pages 배포·라이브 smoke·release status, live validator, 320/390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-OUTCOME-DIRECTION`, `E-CDP-RESEARCH-OUTCOME-DIRECTION`, `E-DEPLOY-PIPELINE-RESEARCH-OUTCOME-DIRECTION`, `E-LIVE-PUBLIC-RESEARCH-OUTCOME-DIRECTION`.

최신 공개 재검증: 2026-10-03 / candidate `b1afe879a3266dd802e4f3d470a49d5985616b70`

전문가 영상 게시판에 주제 필터와 영상 수를 추가해 앞으로 영상이 늘어나도 수면·GABA란·연구 읽기·자율신경 등 관심 주제만 빠르게 탐색할 수 있도록 했다. 선택한 주제는 영상 목록·선택 상태·즉시 재생과 동기화되고 모바일에서는 활성 필터를 중앙에 정렬한다. PR #94의 release-verify·site-quality-verify, main workflow `37101931045`, Pages 배포·라이브 smoke·release status, live validator, 320/390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-EXPERT-VIDEO-FILTER`, `E-CDP-EXPERT-VIDEO-FILTER`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-FILTER`, `E-LIVE-PUBLIC-EXPERT-VIDEO-FILTER`.

최신 공개 재검증: 2026-10-03 / candidate `bed5bf3245d489e74a79b33249bcdf9fba00668d`

연구 결과 비교 도표의 동일 길이 장식을 1·2단계 상대 방향 신호로 보완하고, 조건명을 `비교 조건`·`GABA 섭취`로 중립화했다. 설명에는 신호 개수가 실제 효과 크기나 수치를 뜻하지 않는다는 점을 명시했다. PR #92의 release-verify·site-quality-verify, main workflow `37100751730`, Pages 배포·라이브 smoke·release status, live validator, 390/320/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-QUALITATIVE-DIRECTION`, `E-CDP-QUALITATIVE-DIRECTION`, `E-DEPLOY-PIPELINE-QUALITATIVE-DIRECTION`, `E-LIVE-PUBLIC-QUALITATIVE-DIRECTION`.

최신 공개 재검증: 2026-10-03 / candidate `0257636233ae758a4bc6e90dac7c77e6fd42bc67`

연구 결과 비교 도표에서 보고되지 않은 효과 크기를 암시하던 임의 막대 길이를 제거하고, 비교 조건은 점선 리본·GABA 조건은 실선 리본으로 같은 길이에 표시했다. PR #89의 타입체크·UI contract·research copy·127개 테스트·production build와 Pages 성능 예산, main 배포 workflow `37099561557`, 라이브 validator, 390/1440px Chrome CDP fallback을 통과했다. stale TF heartbeat로 한 차례 중단된 배포는 PR #90에서 heartbeat를 갱신해 복구했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-QUALITATIVE-COMPARISON`, `E-CDP-QUALITATIVE-COMPARISON`, `E-DEPLOY-PIPELINE-QUALITATIVE-COMPARISON`, `E-LIVE-PUBLIC-QUALITATIVE-COMPARISON`, `E-NAVI-TF-HEARTBEAT-REFRESH`.

최신 공개 재검증: 2026-10-03 / candidate `698f1fbf93b960df38955fdb85ee223260df4cc7`

모바일 수면·회복 카드 진행 맵을 가로 스크롤에서 7×2 전체 단계 표시로 바꿔 14개 카드의 흐름을 한눈에 읽도록 보완했다. PR #87 검사와 main 배포, 라이브 validator·320/390/1440px Chrome CDP fallback에서 전체 단계·마지막 카드 선택·가로 폭·runtime errors `[]`를 확인했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RECOVERY-MAP-MOBILE`, `E-CDP-RECOVERY-MAP-MOBILE`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-MOBILE`, `E-LIVE-PUBLIC-RECOVERY-MAP-MOBILE`.

최신 공개 재검증: 2026-10-03 / candidate `3b75baecbc84623a759131393ef1e47f3aa2ba07`

공개 `/research/` 경로에서 제품 CTA·제품 브랜드 노출·`view=products`·SmartStore 연결을 제거하고 연구 결과·연구 조건·출처 중심의 읽기 흐름으로 정리했다. PR #85 검사와 main 배포, 라이브 validator·390px Chrome CDP fallback에서 HTTP 200·가로 폭 390px·runtime errors `[]`·제품 문구 부재를 확인했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-PRODUCT-FREE`, `E-CDP-RESEARCH-PRODUCT-FREE`, `E-DEPLOY-PIPELINE-RESEARCH-PRODUCT-FREE`, `E-LIVE-PUBLIC-RESEARCH-PRODUCT-FREE`.

최신 공개 재검증: 2026-10-03 / candidate `a0ee159235477ee24c2855251b2d17b21c0b317e`

모바일 연구 카드에서 `출처`와 원문 링크가 붙어 읽히던 문제를 `출처 ·` 라벨과 링크의 줄 분리로 보완했다. PR #83 검사와 main 배포, 라이브 validator·390px Chrome CDP fallback에서 출처 계층·가로 폭 390px·runtime errors `[]`를 확인했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-SOURCE-LABEL`, `E-CDP-RESEARCH-SOURCE-LABEL`, `E-DEPLOY-PIPELINE-RESEARCH-SOURCE-LABEL`, `E-LIVE-PUBLIC-RESEARCH-SOURCE-LABEL`.

최신 공개 재검증: 2026-10-03 / candidate `10aedcab10448e5341123234b6ce9979b068bc58`

이미 재생 중인 전문가 영상 카드를 다시 선택할 때 iframe 로딩 상태가 재점화될 수 있던 예외를 보완했다. PR #81 검사와 main 배포, 라이브 validator·390px Chrome CDP fallback에서 동일 영상 연속 선택 후에도 자동재생·`재생 중`·로딩 완료·가로 폭 390px을 확인했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-VIDEO-RESELECT`, `E-CDP-VIDEO-RESELECT`, `E-DEPLOY-PIPELINE-VIDEO-RESELECT`, `E-LIVE-PUBLIC-VIDEO-RESELECT`.

이전 공개 재검증: 2026-10-03 / candidate `4604805e746be4d28b34fb200196ce8d5905c85f`

전문가 영상 게시판에서 현재 선택된 카드에 `재생 중` 상태를 추가해 플레이어와 목록의 연결을 명확히 했다. PR #79 검사와 main 배포, 라이브 validator·390px Chrome CDP fallback 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-VIDEO-SELECTION-STATE`, `E-CDP-VIDEO-SELECTION-STATE`, `E-DEPLOY-PIPELINE-VIDEO-SELECTION-STATE`, `E-LIVE-PUBLIC-VIDEO-SELECTION-STATE`.

최신 공개 재검증: 2026-10-03 / candidate `95c3830984d09ee8baca62ebafacd3a0c8c3d715`

전문가 영상 카드를 선택한 직후 검은 빈 iframe처럼 보이던 구간을 로딩 오버레이와 `영상을 불러오는 중` 상태로 보완하고, iframe 로드 완료 후 오버레이가 사라지도록 했다. `prefers-reduced-motion`에서는 스피너를 정지한다. PR #77 검사와 main 배포, 라이브 validator·390px Chrome CDP fallback 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-VIDEO-LOADING`, `E-CDP-VIDEO-LOADING`, `E-DEPLOY-PIPELINE-VIDEO-LOADING`, `E-LIVE-PUBLIC-VIDEO-LOADING`.

최신 공개 재검증: 2026-10-03 / candidate `79eea1f08423f7d9f52021770310691b9f6e4db2`

701–860px 태블릿에서 전체 메뉴를 아이콘 메뉴로 전환해 헤더 컨트롤이 화면 밖으로 밀리던 결함을 보완했다. PR #75 검사와 main 배포, 라이브 validator·768/820/390/1440px Chrome CDP fallback 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-TABLET-HEADER`, `E-CDP-TABLET-HEADER`, `E-DEPLOY-PIPELINE-TABLET-HEADER`, `E-LIVE-PUBLIC-TABLET-HEADER`.

최신 공개 재검증: 2026-10-03 / candidate `e5f1eab190cd29fb4c18ffe2e469f18edb92ba1f`

전역 메뉴 첫 항목에 `수면과 회복`을 연결하고, 읽기 진행 안내를 하나의 보조기기 상태로 정리했으며 모바일 메뉴가 sticky 진행 바에 가려지지 않도록 레이어를 보정했다. PR #73 검사와 main 배포, 라이브 validator·390/1440px Chrome CDP fallback·실제 메뉴 선택 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RECOVERY-NAV`, `E-CDP-RECOVERY-NAV`, `E-DEPLOY-PIPELINE-RECOVERY-NAV`, `E-LIVE-PUBLIC-RECOVERY-NAV`.

이전 공개 재검증: 2026-10-03 / candidate `288a883d5e0537a1be6bdd2660d90edcc5e82df0`

수면과 회복 인터스티셜을 읽기 진행 표시의 독립 맥락으로 연결해 모바일·데스크톱에서 `수면과 회복 02 / 12` 다음 `연구 지도 03 / 12`로 자연스럽게 이어지도록 보완했다. PR #70 검사와 main 문서 동기화 배포 #71, 라이브 validator·390/1440px Chrome CDP fallback·연구 지도 `인지` 활성 동작 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RECOVERY-PROGRESS`, `E-CDP-RECOVERY-PROGRESS`, `E-DEPLOY-PIPELINE-RECOVERY-PROGRESS`, `E-LIVE-PUBLIC-RECOVERY-PROGRESS`.

최신 공개 재검증: 2026-10-03 / candidate `48f48764fd4fa06bb785a2b12cc5c639104e2dd2`

연구 상세 카드를 읽는 동안 연구 지도에서 현재 주제를 활성화하고 지도 선택 상태를 `aria-current`와 함께 유지했다. PR #68 검사, main 배포·라이브 validator·390/1440px Chrome CDP fallback·지도 클릭 후 `인지` 활성 동작 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-MAP-ACTIVE`, `E-CDP-RESEARCH-MAP-ACTIVE`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-ACTIVE`, `E-LIVE-PUBLIC-RESEARCH-MAP-ACTIVE`.

최신 공개 재검증: 2026-10-03 / candidate `d3ff9e3f27833f3719b76f0cc377468a23bcc421`

연구 지도 5개 주제를 키보드·터치로 선택할 수 있게 하고 각 상세 연구 카드로 연결했다. PR #66 검사, main 배포·라이브 validator·390/1440px Chrome CDP·지도 선택 동작 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-MAP-NAV`, `E-CDP-RESEARCH-MAP-NAV`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-NAV`, `E-LIVE-PUBLIC-RESEARCH-MAP-NAV`.

최신 공개 재검증: 2026-10-03 / candidate `e514a375f0d8fdfeefbba2043b0a18268224b5d2`

연구 지도 아래의 기존 읽기 순서를 01–04 시각 레일로 정리했다. 모바일에서는 번호 노드와 연결선으로 `지도 → 대상 → 결과 → 해석`을 분리하고, 데스크톱에서는 기존 여백과 지도 구조를 유지했다. PR #64 검사, main 배포·라이브 validator·390/1440px Chrome CDP 검증을 통과했다. 증적: `E-LOCAL-BUILD-RESEARCH-RAIL`, `E-CDP-RESEARCH-RAIL`, `E-DEPLOY-PIPELINE-RESEARCH-RAIL`, `E-LIVE-PUBLIC-RESEARCH-RAIL`.

최신 공개 재검증: 2026-10-03 / candidate `0147e3c15a7e0acd700ff4f75e9fcddc03b39b05`

모바일 히어로의 편집 안내와 `3분 읽기` 레일에 읽기용 반투명 표면을 적용했다. PR #62 검사, main 배포·라이브 validator·320/390/1440px Chrome CDP 검증을 통과했으며 카피·출처·제품 독립 경계는 유지했다. 증적: `E-LOCAL-BUILD-HERO-SURFACE`, `E-CDP-HERO-SURFACE`, `E-DEPLOY-PIPELINE-HERO-SURFACE`, `E-LIVE-PUBLIC-HERO-SURFACE`.

| Date | State / Change | Reason | Evidence or Decision | Owner |
|---|---|---|---|---|
| 2026-10-03 | 스크롤 중 읽기 진행 바를 불투명 레이어로 보정하고 `078d231`로 공개 배포 | 연구 결과 도표 위로 아래 콘텐츠가 비치는 현상을 제거해 모바일·데스크톱에서 읽기 안내와 연구 문장을 분리. PR #60 검사, main 배포·라이브 validator·320/390/1440px Chrome CDP 검증 통과 | E-LOCAL-BUILD-RAIL-LEGIBILITY, E-CDP-RAIL-LEGIBILITY, E-DEPLOY-PIPELINE-RAIL-LEGIBILITY, E-LIVE-PUBLIC-RAIL-LEGIBILITY | NAVI / QA |
| 2026-10-03 | 연구 카드 앞에 `연구를 읽는 기준` 시각 키와 모바일 컨트롤 보조 설명을 추가하고 `89978ea`로 공개 배포 | 사람 대상 연구와 확장 연구 라벨을 먼저 설명해 결과 해석 부담을 낮춤. PR #58 검사, main 배포·라이브 validator·320/390/1440px Chrome CDP 검증 통과 | E-LOCAL-BUILD-RESEARCH-KEY, E-CDP-RESEARCH-KEY, E-DEPLOY-PIPELINE-RESEARCH-KEY, E-LIVE-PUBLIC-RESEARCH-KEY | NAVI / QA |
| 2026-10-03 | 연구 결과 카드에 `핵심 결과 복사`와 브라우저 복사 대체 경로를 추가하고 `19a38ab`로 공개 배포 | 사업자가 관찰된 연구 결과 문장을 바로 재사용할 수 있게 보완. PR #55·#56 검사, main 배포·라이브 validator·390/1440px Chrome CDP 검증 통과 | E-LOCAL-BUILD-RESEARCH-SHARING, E-CDP-RESEARCH-SHARING, E-DEPLOY-PIPELINE-RESEARCH-SHARING, E-LIVE-PUBLIC-RESEARCH-SHARING | NAVI / QA |
| 2026-10-03 | 연구 카드에 대상·방법·측정 프로필을 추가하고 `3f4a3e5`로 공개 배포 | 결과 그래프를 보기 전 연구 대상·방법·측정 항목을 한눈에 파악하도록 보완. PR #53 검사, main 배포·라이브 validator·390/1440px Chrome CDP 검증을 통과 | E-LOCAL-BUILD-RESEARCH-PROFILE, E-CDP-RESEARCH-PROFILE, E-DEPLOY-PIPELINE-RESEARCH-PROFILE, E-LIVE-PUBLIC-RESEARCH-PROFILE | NAVI / QA |
| 2026-10-03 | 320–430px 좁은 모바일의 히어로·헤더를 보완하고 `d0f1741`로 공개 배포 | 헤드라인 클리핑과 공유 버튼 잘림을 제거하고 44px 터치 영역을 확보. PR #51 검사, main 배포·라이브 validator·390/360/320px CDP QA 통과 | E-LOCAL-BUILD-MOBILE-HARDENING, E-CDP-MOBILE-HARDENING, E-DEPLOY-PIPELINE-MOBILE-HARDENING, E-LIVE-PUBLIC-MOBILE-HARDENING | NAVI / QA |
| 2026-10-03 | NAVI 문서 동기화 이후 최종 공개 후보 `6f48bae`를 재검증 | main 배포·라이브 공개본·제품 독립 데이터 경계·공유 경로의 최신 SHA 정합성을 확인. release-verify, Pages publish, smoke-live, release status와 live validator 성공 | E-LIVE-PUBLIC-NAVI-FINAL, GitHub Actions 37074307727 | NAVI / QA |
| 2026-10-03 | NAVI 감사·레드팀·완료 문서를 main에 반영하고 최종 candidate `49daf99`를 재검증 | 공개 코드 변경 이후 governance 증적과 실제 라이브 SHA의 정합성을 맞춤. main 배포·라이브 validator를 다시 통과 | E-LIVE-PUBLIC-NAVI-RELEASE, GitHub Actions 37073665476 | NAVI / QA |
| 2026-10-03 | 읽기 진행 표시의 접근성·가독성을 보완하고 사용하지 않는 구형 챌린지 이미지 4종을 제거한 뒤 `7a64726`으로 공개 배포 | 긴 모바일 안내서에서 현재 장을 더 빠르게 파악하고 Pages 번들 성능 여유를 확보. PR #47 필수 검사, main 배포·라이브 validator·1440/390px Chrome CDP 검증을 통과 | E-LOCAL-BUILD-READING-PROGRESS, E-CDP-READING-PROGRESS, E-DEPLOY-PIPELINE-READING-PROGRESS, E-LIVE-PUBLIC-READING-PROGRESS | NAVI / QA |
| 2026-10-03 | 고정 헤더·읽기 진행 표시와 섹션 앵커가 겹치지 않도록 보완하고 `2c8bd84`로 공개 배포 | 메뉴·앵커 이동 뒤 섹션 제목이 가려지지 않게 해 모바일·데스크톱의 자연스러운 독해 흐름을 회복. PR #45 필수 검사, main 배포·라이브 validator·1440/390px Chrome CDP 검증을 통과 | E-LOCAL-BUILD-ANCHOR-OFFSET, E-CDP-ANCHOR-OFFSET, E-DEPLOY-PIPELINE-ANCHOR-OFFSET, E-LIVE-PUBLIC-ANCHOR-OFFSET | NAVI / QA |
| 2026-10-03 | 연구 지도 아래에 `읽는 순서 → 01 지도 → 02 대상 → 03 결과 → 04 해석` 시각 레일을 추가하고 `5af1f11`로 공개 배포 | 별도 이동 링크 없이 연구 지도를 본 뒤 대상·결과·해석 카드로 자연스럽게 이어지도록 보완. PR #43 필수 검사, main 배포·라이브 validator·1440/390px Chrome CDP 검증을 통과 | E-LOCAL-BUILD-RESEARCH-READING-RAIL, E-CDP-RESEARCH-READING-RAIL, E-DEPLOY-PIPELINE-RESEARCH-READING-RAIL, E-LIVE-PUBLIC-RESEARCH-READING-RAIL | NAVI / QA |
| 2026-10-03 | 연구 지도에서 상세 카드로 이어지는 `지도 → 대상 → 결과 → 해석` 읽기 순서를 추가하고 기능 변경 `79432de`·최종 공개본 `ca20d1e`로 반영 | 별도 이동 링크 없이 연구 지도 다음에 대상·결과·해석 카드를 바로 보여줘 연구 흐름을 자연스럽게 연결. PR #38 품질 검사, heartbeat PR #39, NAVI 문서 PR #40, main 배포·라이브 validator·1440/390px Chrome CDP 검증을 통과 | E-LOCAL-BUILD-RESEARCH-READING-SEQUENCE, E-CDP-RESEARCH-READING-SEQUENCE, E-DEPLOY-PIPELINE-RESEARCH-READING-SEQUENCE, E-LIVE-PUBLIC-RESEARCH-READING-SEQUENCE | NAVI / QA |
| 2026-10-03 | 연구 확장 지도에 의미 기반 아이콘을 적용하고 `713627f`로 공개 배포 | 인지·피부·근육·성장호르몬·면역을 동일한 구조 안에서 빠르게 구분하도록 선형 아이콘을 추가. PR #37 필수 검사, main 배포, 라이브 validator, 1440/390px Chrome CDP 시각 검증을 통과 | E-LOCAL-BUILD-RESEARCH-MAP-ICONS, E-CDP-RESEARCH-MAP-ICONS, E-DEPLOY-PIPELINE-RESEARCH-MAP-ICONS, E-LIVE-PUBLIC-RESEARCH-MAP-ICONS | NAVI / QA |
| 2026-10-03 | 연구 결과 도표의 큰 글씨 모드를 차트 전체 글자 체계로 정리하고 `34807cb`로 공개 배포 | 비교 조건·측정값·막대 설명·신호·주석이 큰 글씨 선택과 함께 일관되게 확대되도록 보완하고, 320/360/390px 모바일 QA·라이브 validator·Pages 배포를 재확인 | E-LOCAL-BUILD-LARGE-TEXT-CHART-TYPE, E-CDP-LARGE-TEXT-CHART-TYPE, E-DEPLOY-PIPELINE-LARGE-TEXT-CHART-TYPE, E-LIVE-PUBLIC-LARGE-TEXT-CHART-TYPE | NAVI / QA |
| 2026-10-03 | 연구 결과 도표의 큰 글씨 읽기 모드를 보완하고 `24c718b`로 공개 배포 | 핵심 결과·측정값·주석이 본문 확대와 함께 커지도록 보완하고, 320/360/390px 헤더의 44px 터치 목표·가로 폭·접근성 상태를 라이브에서 재확인 | E-LOCAL-BUILD-LARGE-TEXT-CHART, E-CDP-LARGE-TEXT-CHART, E-DEPLOY-PIPELINE-LARGE-TEXT-CHART, E-LIVE-PUBLIC-LARGE-TEXT-CHART | NAVI / QA |
| 2026-10-03 | 320–360px 초소형 모바일 헤더를 압축하고 `b3059b2`로 공개 배포 | 메뉴·큰 글씨·공유 컨트롤이 좁은 화면에서 수축하지 않도록 아이콘형으로 정리하고 모든 터치 목표를 44px로 보장. 라이브 320/360/390px에서 겹침·가로 넘침·런타임 오류를 재확인 | E-LOCAL-BUILD-COMPACT-HEADER, E-CDP-COMPACT-HEADER, E-DEPLOY-PIPELINE-COMPACT-HEADER, E-LIVE-PUBLIC-COMPACT-HEADER | NAVI / QA |
| 2026-10-03 | 모바일 읽기 크기 토글을 추가하고 `0c464c1`로 공개 배포 | 고령 사용자도 본문을 한 번 더 확대하지 않고 읽을 수 있도록 기본 글씨·큰 글씨를 선택하게 하고, 새로고침 후에도 선택을 유지. 390px 라이브에서 가로 넘침·런타임 오류 없이 동작을 재확인 | E-LOCAL-BUILD-READING-SIZE, E-CDP-READING-SIZE, E-DEPLOY-PIPELINE-READING-SIZE, E-LIVE-PUBLIC-READING-SIZE | NAVI / QA |
| 2026-10-03 | 수면·회복 14단계 지도에 `01–14` 번호를 추가하고 `5321f9d`로 공개 배포 | 모바일에서 현재 위치를 숫자로 즉시 확인하고, 자동 전환·스와이프 후에도 선택 단계가 보이도록 보완. 라이브 390px에서 중앙 정렬·가로 넘침·런타임 오류를 재확인 | E-LOCAL-BUILD-RECOVERY-INDEX, E-CDP-RECOVERY-INDEX, E-DEPLOY-PIPELINE-RECOVERY-INDEX, E-LIVE-PUBLIC-RECOVERY-INDEX | NAVI / QA |
| 2026-10-03 | 성장호르몬 연구 결과 카드에 상대 크기 막대와 해석 문구를 추가하고 `3af1327`로 공개 배포 | `약 +400%`와 `약 +375%`를 숫자만 읽지 않고 한 화면에서 비교하도록 보완하되, 막대가 연구 내부의 상대 표시임을 명시해 과대 해석을 막음 | E-LOCAL-BUILD-METRIC-VIZ, E-CDP-METRIC-VIZ, E-DEPLOY-PIPELINE-METRIC-VIZ, E-LIVE-PUBLIC-METRIC-VIZ | NAVI / QA |
| 2026-10-03 | 모바일 메뉴 포커스 흐름을 보완하고 `b0183b8`로 공개 배포 | 메뉴를 연 뒤 첫 메뉴 링크로 포커스를 이동해 키보드·보조기기 사용자가 즉시 탐색을 시작하도록 보완하고, 390px 라이브 화면에서 가로 넘침과 런타임 오류가 없는지 재확인 | E-LOCAL-BUILD-MENU-FOCUS, E-CDP-MENU-FOCUS, E-DEPLOY-PIPELINE-MENU-FOCUS, E-LIVE-PUBLIC-MENU-FOCUS | NAVI / QA |
| 2026-10-03 | 14단계 수면·회복 카드의 읽기 중 일시정지와 단계 접근성 안내를 보완하고 `fed8b6a`로 공개 배포 | 포커스·포인터가 읽기 영역에 들어오면 자동 전환을 멈추고, 단계·현재 선택·카드 연결 관계를 짧은 라이브 안내로 제공해 모바일·고령 사용자 가독성을 보완 | E-LOCAL-BUILD-RECOVERY-A11Y, E-CDP-RECOVERY-A11Y, E-DEPLOY-PIPELINE-RECOVERY-A11Y, E-LIVE-PUBLIC-RECOVERY-A11Y | NAVI / QA |
| 2026-10-03 | 14단계 수면·회복 카드의 모바일 활성 단계 추적을 보완하고 `454f506`으로 공개 배포 | 자동 전환·스와이프 시 현재 단계가 화면 밖으로 사라지지 않도록 가로 단계 표시를 자동 중앙 정렬 | E-LOCAL-BUILD-RECOVERY-TRACK, E-CDP-RECOVERY-TRACK, E-DEPLOY-PIPELINE-RECOVERY-TRACK, E-LIVE-PUBLIC-RECOVERY-TRACK | NAVI / QA |
| 2026-10-02 | 연구 결과 비교 도표에 막대 해석 큐를 추가하고 `28315ad`로 공개 배포 | 모바일 소비자가 `짧은 막대 = 감소 폭이 작음`을 즉시 이해하도록 보완하고, 연구 결과·접근성 설명·제품 독립 경계를 유지 | E-LOCAL-BUILD-CHART-CUE, E-CDP-CHART-CUE, E-DEPLOY-PIPELINE-CHART-CUE, E-LIVE-PUBLIC-CHART-CUE | NAVI / QA |
| 2026-10-02 | NAVI 최종 증적과 라이브 candidate `9457237`을 동기화하고 재배포 검증 | 문서·감사 기록·공개 URL의 SHA 정합성을 맞추고 최종 라이브 validator 결과를 보존 | E-LIVE-PUBLIC-NAVI-SYNC, GitHub Actions 37021490282 | NAVI / QA |
| 2026-10-02 | GABA 중심 연구 확장 연결 인포그래픽을 모바일·데스크톱에 적용하고 5350da8로 공개 배포 | 인지·피부·근육·성장호르몬·면역의 관계를 연결선과 노드로 직관화하고, 예약 TF heartbeat PR과 필수 검사를 거쳐 공개본 정합성을 확보 | E-LOCAL-BUILD-RESEARCH-MAP-CONNECTORS, E-CDP-RESEARCH-MAP-CONNECTORS, E-DEPLOY-PIPELINE-RESEARCH-MAP-CONNECTORS, E-LIVE-PUBLIC-RESEARCH-MAP-CONNECTORS | NAVI / QA |
| 2026-10-02 | 연구 지도를 데스크톱·모바일 공통 3×3 중심 구조로 정리하고 6df3e36을 공개 배포 | 연구 확장 관계를 작은 화면에서도 겹침 없이 읽게 하고 Pages 성능 예산을 CI까지 통과시키도록 중복 CSS를 제거 | E-LOCAL-BUILD-RESEARCH-MAP, E-CDP-RESEARCH-MAP, E-DEPLOY-PIPELINE-RESEARCH-MAP, E-LIVE-PUBLIC-RESEARCH-MAP | NAVI / QA |
| 2026-10-02 | 헤더 공유 버튼 대비와 연구 규모 연혁 표기를 보완하고 cd0912f를 공개 배포 | 공유 행동의 즉시성·가독성을 높이고 고정된 연수 표기를 `1950 → 지금`의 지속 가능한 흐름으로 정리 | E-LOCAL-BUILD-UI-POLISH, E-CDP-UI-POLISH, E-DEPLOY-PIPELINE-UI-POLISH, E-LIVE-PUBLIC-UI-POLISH | NAVI / QA |
| 2026-10-02 | 사업자용 핵심 5문장 라벨을 `바로 복사하기` 중심으로 정리하고 7ee9b3d를 공개 배포 | 첫 목표인 사업자 활용성을 마지막 공유 영역에서 즉시 이해하도록 보완하고, 기존 메시지·연구 데이터·제품 경계를 유지 | E-LOCAL-BUILD-SHARE-KIT, E-CDP-SHARE-KIT, E-DEPLOY-PIPELINE-SHARE-KIT, E-LIVE-PUBLIC-SHARE-KIT | NAVI / QA |
| 2026-10-02 | 588f266 연구 히스토리 문구를 기존 헤더 구조로 정리하고 GitHub Pages에 공개 배포 | CI Pages 성능 예산 경계 초과를 제거하면서 연구 흐름과 공개 데이터 경계를 유지 | E-LOCAL-BUILD-FINAL, E-CDP-FINAL, E-DEPLOY-PIPELINE-FINAL, E-LIVE-PUBLIC-FINAL | NAVI / QA |
| 2026-10-02 | 연구 비교·영상 보조 라벨을 11px로 보강하고 b7cf813을 공개 배포 | 고령 사용자까지 연구 결과를 더 빠르게 읽도록 보완하면서 기존 성능 예산 유지 | E-LOCAL-BUILD-B7, E-CDP-READABILITY-B7, E-CDP-NAVIGATION-B7, E-DEPLOY-PIPELINE-B7, E-LIVE-PUBLIC-B7 | NAVI / QA |
| 2026-10-02 | 연구 규모 `편` 단위·모바일 비교 범례를 유지한 채 번들 용량을 줄이고 최신 main을 재배포 | GitHub Pages 성능 게이트 초과를 해소하고 공개본 정합성 갱신 | f82bcb4, E-LOCAL-BUILD-FOLLOWUP, E-CDP-POLISH-FOLLOWUP, E-DEPLOY-PIPELINE-LATEST, E-LIVE-PUBLIC-LATEST | NAVI / QA |
| 2026-10-02 | sticky 헤더·현재 읽는 섹션 표시·모바일 메뉴 닫기 동작을 보완하고 최신 공개본을 재검증 | 모바일 독해 흐름과 배포 후 버전 정합성 확보 | 2caf863, E-CDP-NAVIGATION-FOLLOWUP, E-LIVE-PUBLIC-FOLLOWUP, E-DEPLOY-PIPELINE-FOLLOWUP | NAVI / QA |
| 2026-10-02 | 전문가 영상 선택 즉시 재생 안내 문구와 모바일 상호작용 증거를 최신 공개 배포에 반영 | 선택 동작의 가시성·NAVI 증거 최신화 | 871cc71, E-CDP-INTERACTION, E-LIVE-PUBLIC | NAVI |
| 2026-10-02 | S’TEI 상태를 보존하고 GABA 전용 NAVI `.navi/`를 초기화 | 프로젝트 상태 분리 | 기존 상태 백업 / NAVI | NAVI |
| 2026-10-02 | 공개 배포 품질 목표·산출물·coverage·workstream을 잠금 | 자동 점검 범위 고정 | DEC-001 | NAVI |
| 2026-10-02 | 타입체크·127개 테스트·build·정적·성능·라이브·시각·상호작용 검증 | 공개 배포 기준선 확보 | E-LOCAL-TESTS, E-LIVE-PUBLIC, E-CDP-MOBILE | QA |
| 2026-10-02 | 코드 결함이 없어 UI 코드는 변경하지 않고 감사·레드팀 잔여 위험 기록 | 불필요한 회귀 방지 | DEC-004, E-REDTEAM-REVIEW | NAVI |
| 2026-10-02 | 모바일 히어로의 3분 읽기 순서를 배지·연결 문장으로 정리하고 Pages 번들 여유를 확보한 뒤 재배포 | 첫 화면 독해 흐름과 공개 배포 재현성 개선 | 24aca41, E-LOCAL-BUILD-RELEASE, E-CDP-POLISH-RELEASE, E-CDP-NAVIGATION-RELEASE, E-DEPLOY-PIPELINE-RELEASE, E-LIVE-PUBLIC-RELEASE | NAVI / QA |
| 2026-10-02 | 모바일 섹션 장 제목을 다시 표시해 긴 페이지의 읽기 위치를 즉시 인지하도록 보완 | 작은 장표와 큰 제목의 위계 복원 | d7bf1cb, E-RELEASE-D7 | NAVI / QA |
| 2026-10-02 | 연구 비교 도표에 `변화 방향` 축과 짧은 막대 설명을 추가하고 Pages 성능 예산을 통과하도록 정리해 재배포 | 모바일에서 비교 결과를 한눈에 읽고 공개 번들 예산을 안정적으로 지키도록 보완 | c13be36, E-RELEASE-C13 | NAVI / QA |
| 2026-10-02 | 읽기 진행 표시를 실제 본문 장 번호와 맞추고, Pages 성능 초과를 압축 보정한 뒤 재배포 | 긴 모바일 안내서에서 현재 위치를 `07 / 12`처럼 즉시 이해하고 공개 배포 게이트를 통과시키도록 보완 | 1f56cb6, E-LOCAL-BUILD-PROGRESS, E-CDP-NAVIGATION-PROGRESS, E-DEPLOY-PIPELINE-PROGRESS, E-LIVE-PUBLIC-PROGRESS | NAVI / QA |

Record lifecycle transitions, approved changes, rework, and meaningful evidence updates. Do not use this file to erase history.
# 2026-10-02 · Public deployment verification follow-up

- Scheduled TF pulse produced a verified heartbeat commit; automatic PR creation was blocked by repository policy, so PR #6 was opened through the repository workflow.
- PR #6 passed `release-verify` and `site-quality-verify` and was merged without changing the public science copy.
- Main deployment run `36984877866` passed release verification, GitHub Pages deployment, live smoke test, and release status.
- Live validation confirmed candidate `bb4504fa902abbdb52b99f2998da6f2cd20ef1b0`, 6 research records, 6 share pages, and no public internal-operation snapshots.
- NAVI remains `USER_DECISION` / `INTERNAL_QA_READY_WITH_CONDITIONS`; open external-validation items remain open.
# Change Log

## v46 · 연구 스크롤 상태 비차단 처리 — 3007891 — 2026-10-05

- 연구 카드 IntersectionObserver의 현재 주제 표시 갱신을 React startTransition으로 분리해 모바일 스크롤 입력을 우선 처리했다.
- 로컬 UI contract·typecheck·127 tests·production build/performance, PR #265 checks, main workflow 37243296161, Pages·라이브 smoke·release status와 공개 validator를 통과했다.
- 공개 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았다. NAVI는 USER_DECISION, 완료 게이트는 NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-TRANSITION-20261005, E-UI-CONTRACT-TRANSITION-20261005, E-DEPLOY-PIPELINE-TRANSITION-20261005, E-LIVE-PUBLIC-TRANSITION-20261005.

## v45 · 모바일 연구 스크롤 렌더링 최적화 — 8e1e335 — 2026-10-05

- 현재 연구 주제 추적 중 정적인 연구 glyph·연구 구성·결과 도표를 React memo로 보호해 모바일 스크롤의 불필요한 재렌더링을 줄였다.
- 로컬 UI contract·typecheck·127 tests·production build/performance, PR #263 checks, main workflow 37242328341, Pages·라이브 smoke·release status와 공개 validator를 통과했다.
- 공개 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았다. NAVI는 USER_DECISION, 완료 게이트는 NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-MEMO-20261005, E-UI-CONTRACT-MEMO-20261005, E-DEPLOY-PIPELINE-MEMO-20261005, E-LIVE-PUBLIC-MEMO-20261005.

## v44 · GABA 공개 안내서 공유 카드 분리 — 0e93fb3 — 2026-10-05

- 공개 root·guide·research 공유 미리보기를 제품·하루리듬 카드와 분리하고, 제품과 무관한 1200×630 JPEG `gaba-guide-social-card.jpg`를 적용했다.
- 로컬 UI contract·typecheck·127 tests·production build/performance, PR #227 checks, main workflow `37211921700`, Pages·라이브 smoke·release status와 공개 validator를 통과했다.
- 공개 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-SOCIAL-PREVIEW-20261005`, `E-UI-CONTRACT-SOCIAL-PREVIEW-20261005`, `E-DEPLOY-PIPELINE-SOCIAL-PREVIEW-20261005`, `E-LIVE-PUBLIC-SOCIAL-PREVIEW-20261005`.

## v43 · 모바일 기본 카드 장식 겹침 보정 — 4e558ee — 2026-10-04

- 320px 화면에서 GABA 기본 설명 카드의 달 아이콘이 본문 마지막 줄과 겹치던 가독성 결함을 확인하고, 모바일 카드에 장식 전용 하단 여백을 확보했다.
- 로컬 typecheck·UI contract·127 tests·build, PR #153 checks, main workflow `37141668244`, Pages·라이브 smoke·release status, 공개 validator와 320/390px Chrome fallback을 재검증했다.
- 공개 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-DEFINITION-MOTIF-20261004`, `E-PLAYWRIGHT-DEFINITION-MOTIF-20261004`, `E-DEPLOY-PIPELINE-DEFINITION-MOTIF-20261004`, `E-LIVE-PUBLIC-DEFINITION-MOTIF-20261004`.
