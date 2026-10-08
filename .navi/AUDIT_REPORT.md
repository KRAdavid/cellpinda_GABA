# Audit Report

## 전문가 영상 메뉴 노출 및 선택 자료 미리보기 공개 배포 — main f56e4a84 — 2026-10-09

- AC-001/AC-003: `PASS`. 본문은 `GABA란 → 03 · 전문가 영상 → 04 · 연구 지도` 순서를 유지하고, 상단 메뉴에도 `전문가 영상`을 `연구 지도`보다 앞에 노출해 방문자가 같은 읽기 흐름으로 이동할 수 있게 했다. 사업자 공유 보드는 `전달할 자료 · 2개`와 선택 카드 칩을 먼저 보여주며 한 번의 해제로 `선택 1개`로 갱신된다.
- AC-004: `PASS`. 공개 Chrome CDP fallback 390px에서 메뉴 링크 8개·전문가 영상 활성 상태·메뉴 자동 닫힘·`scrollWidth=viewport=390`을 확인했고, 전문가 영상의 실제 위치가 연구 지도보다 앞섰다. `materials=24` 자료 보드의 두 선택 칩과 1개 해제 상태도 확인했다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·`pnpm test` 127 pass·GitHub Pages base-path 정적 build·성능 예산을 통과했고 PR #722 required checks와 main workflow `37840979076`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 경계: `PASS`. 이번 변경은 읽기 순서 발견성과 공유 자료 선택 가시성에 한정되며 연구 카피·수치·출처·제품 독립 안내·Smart Store 단일 경계·teaser `HOLD`를 변경하지 않았다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 결함은 확인되지 않았다. Chrome CDP fallback, 실제 모바일 공유 시트·Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-317`, `E-LOCAL-BUILD-NAV-EXPERT-20261009`, `E-UI-CONTRACT-NAV-EXPERT-20261009`, `E-PR-NAV-EXPERT-20261009`, `E-DEPLOY-NAV-EXPERT-20261009`, `E-CDP-LIVE-NAV-EXPERT-20261009`, `E-LIVE-PUBLIC-NAV-EXPERT-20261009`, `E-NAVI-STATE-NAV-EXPERT-20261009`.

## 개별 공유 자료 링크 범위 정합성 보정 및 공개 배포 — main 3dbd06d6 — 2026-10-09

- AC-001/AC-003: `PASS`. 사업자 공유 보드에서 개별 `문장 복사`를 실행하면 복사한 카드 하나의 `materials` 범위로 공개 안내서 링크를 생성한다. 현재 선택 묶음이 다른 상태에서도 복사된 문장과 링크의 자료 범위가 일치한다.
- AC-004: `PASS`. 공개 Chrome CDP fallback 390px에서 첫 카드 개별 복사 링크가 `materials=1`로 생성되고, `선택 2개 · 전체 5개`, 3단계 전달 흐름, 전문가 영상 → 연구 지도 DOM 순서, `width=viewport=390`, runtime errors 0을 확인했다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·`pnpm test` 127 pass·GitHub Pages 정적 build·성능 예산을 통과했고 PR #720 required checks와 main workflow `37836066377`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 경계: `PASS`. 이번 변경은 개별 공유 링크의 자료 범위 정합성에 한정되며 연구 카피·수치·출처·제품 독립 안내·Smart Store 단일 경계·teaser `HOLD`를 변경하지 않았다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser plugin·Playwright 부재에 따른 Chrome CDP fallback, 실제 모바일 공유 시트·Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-316`, `E-LOCAL-BUILD-INDIVIDUAL-SHARE-SCOPE-20261009`, `E-UI-CONTRACT-INDIVIDUAL-SHARE-SCOPE-20261009`, `E-CDP-INDIVIDUAL-SHARE-SCOPE-20261009`, `E-PR-INDIVIDUAL-SHARE-SCOPE-20261009`, `E-DEPLOY-INDIVIDUAL-SHARE-SCOPE-20261009`, `E-CDP-LIVE-INDIVIDUAL-SHARE-SCOPE-20261009`, `E-LIVE-PUBLIC-INDIVIDUAL-SHARE-SCOPE-20261009`, `E-NAVI-STATE-INDIVIDUAL-SHARE-SCOPE-20261009`.

## 사업자 공유 자료 선택 범위 표기 명확화 및 공개 배포 — main 65b4820f — 2026-10-09

- AC-001/AC-003: `PASS`. 공유 자료 보드의 카드 목록 상단을 `선택 2개 · 전체 5개`로 표시해 현재 전달 범위와 전체 자료 범위를 한 줄에서 구분한다. `materials=24` 링크의 `출처까지` 선택 상태와 `GABA란 → 03 · 전문가 영상 → 04 · 연구 지도` 읽기 순서는 유지됐다.
- AC-004: `PASS`. 공개 Chrome CDP fallback 390px에서 `summary aria-label=사업자용 GABA 자료, 선택 2개, 전체 5개`, 선택 카드 2개, 3단계 전달 흐름, `scrollWidth=viewport=390`, runtime errors 0을 확인했다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·`pnpm test` 127 pass·GitHub Pages 정적 build·성능 예산을 통과했고 PR #718 required checks와 main workflow `37833774516`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 경계: `PASS`. 이번 변경은 선택 범위의 표시 명확화에 한정되며 연구 카피·수치·출처·제품 독립 안내·Smart Store 단일 경계·teaser `HOLD`를 변경하지 않았다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser plugin·Playwright 부재에 따른 Chrome CDP fallback, 실제 모바일 공유 시트·Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-315`, `E-LOCAL-BUILD-SHARE-SUMMARY-CLARITY-20261009`, `E-UI-CONTRACT-SHARE-SUMMARY-CLARITY-20261009`, `E-CDP-SHARE-SUMMARY-CLARITY-20261009`, `E-PR-SHARE-SUMMARY-CLARITY-20261009`, `E-DEPLOY-SHARE-SUMMARY-CLARITY-20261009`, `E-CDP-LIVE-PUBLIC-SHARE-SUMMARY-CLARITY-20261009`, `E-LIVE-PUBLIC-SHARE-SUMMARY-CLARITY-20261009`, `E-NAVI-STATE-SHARE-SUMMARY-CLARITY-20261009`.

## 선택 자료 범위 공유 링크 보존 및 공개 배포 — main 369dcafa — 2026-10-09

- AC-001/AC-003: `PASS`. 선택한 목적별 자료 범위를 `materials` 쿼리에 보존해, 공유받은 사람이 동일한 카드 선택 상태로 `#final` 자료 보드에 진입하도록 했다. `출처까지`는 2개 자료로 복원되고 전체 복사는 5개 전체 범위를 사용한다.
- AC-004: `PASS`. 공개 Chrome CDP fallback 390px에서 `materials=24`가 `출처까지`·2개 선택·3단계 전달 흐름으로 복원됐고 `scrollWidth=viewport=390`, runtime errors 0을 확인했다. 전문가 영상 `03`이 연구 지도 `04`보다 앞선 순서도 유지됐다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·`pnpm test` 127 pass·GitHub Pages 정적 build·release manifest·static bundle·성능 예산, PR #716 required checks와 main workflow `37831700338`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 로컬 성능 번들은 1,648,953 bytes였다.
- AC-006 제품 독립 경계: `PASS`. 이번 변경은 공유 링크의 선택 범위 복원만 보완했으며 연구 카피·수치·출처 URL·제품 독립 안내·제품 750 제거·Smart Store 단일 경계·teaser `HOLD`를 변경하지 않았다. 잘못된 `materials` 값은 대상별 추천 자료로 fallback한다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser plugin·Playwright 부재에 따른 Chrome CDP fallback, 실제 모바일 공유 시트·Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-314`, `E-LOCAL-BUILD-SHARE-LINK-SCOPE-20261009`, `E-UI-CONTRACT-SHARE-LINK-SCOPE-20261009`, `E-CDP-SHARE-LINK-SCOPE-20261009`, `E-PR-SHARE-LINK-SCOPE-20261009`, `E-DEPLOY-SHARE-LINK-SCOPE-20261009`, `E-CDP-LIVE-PUBLIC-SHARE-LINK-SCOPE-20261009`, `E-LIVE-PUBLIC-SHARE-LINK-SCOPE-20261009`, `E-NAVI-STATE-SHARE-LINK-SCOPE-20261009`.

## 사업자 공유 자료 목적별 빠른 선택 공개 배포 — main 377f7bab — 2026-10-09

- AC-001/AC-003: `PASS`. 사업자 공유 보드에 `추천 자료`와 `처음 소개`·`연구를 보여줄 때`·`출처까지` 빠른 선택을 추가해 선택 수·공유·복사 범위를 한 화면에서 바꾸도록 했다. 기존 5개 카드, 연구 출처, 제품 독립 경계는 유지했다.
- AC-004: `PASS`. 공개 Playwright fallback 390·1440px에서 사업자 기본 `추천 자료`·5개 선택과 `연구를 보여줄 때`·2개 선택을 확인했고, viewport와 `scrollWidth`가 일치하며 page/console errors는 0건이었다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·`pnpm test` 127 pass·GitHub Pages base-path 번들·정적 bundle·성능 예산, PR #714 최종 checks와 main workflow `37829310326`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 로컬 성능 번들은 1,648,896 bytes였다.
- AC-006 제품 독립 경계: `PASS`. 이번 변경은 자료 선택 경험만 보완했으며 연구 카피·수치·출처 URL·제품 독립 안내·제품 750 제거·Smart Store 단일 경계·teaser `HOLD`를 변경하지 않았다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser plugin 부재에 따른 Playwright fallback, Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-313`, `E-LOCAL-BUILD-QUICK-PACK-20261009`, `E-UI-CONTRACT-QUICK-PACK-20261009`, `E-PLAYWRIGHT-QUICK-PACK-20261009`, `E-PR-QUICK-PACK-20261009`, `E-DEPLOY-QUICK-PACK-20261009`, `E-LIVE-PUBLIC-QUICK-PACK-20261009`, `E-NAVI-STATE-QUICK-PACK-20261009`.

## 전문가 영상 선행 흐름 검토 및 선택형 공유 자료 공개 배포 — main fa0e26e2 — 2026-10-09

- AC-001/AC-003: `PASS`. 사용자 요청을 검토한 결과 공개 소스와 실제 화면 모두 `GABA란 → 03 · 전문가 영상 → 04 · 연구 지도` 순서이며, 전문가 영상의 다음 장 안내도 연구 지도를 가리킨다. 사업자 공유 자료는 선택한 카드만 공유·복사한다.
- AC-004: `PASS`. 공개 Playwright fallback 390·1440px에서 전문가 영상 top이 연구 지도보다 앞서고, 가로폭은 viewport와 일치했으며 초기 5개 선택·1개 해제 후 4개 공유·대상 변경 후 3개 선택을 확인했다. page/console errors는 0건이다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·`pnpm test` 127 pass·GitHub Pages base-path 정적 번들·release manifest·static bundle·성능 예산과 PR #712 보호 검사가 통과했다. main workflow `37825871130`의 Pages 배포·라이브 smoke·release-status도 성공했다.
- AC-006 제품 독립 경계: `PASS`. 이번 회차는 읽기 순서 계약과 공유 자료 선택 상태만 보완했으며 연구 카피·수치·출처 URL·제품 독립 안내·제품 750 제거·Smart Store 단일 경계·teaser `HOLD`를 변경하지 않았다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser plugin 부재에 따른 Playwright fallback, Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-312`, `E-LOCAL-BUILD-CUSTOM-SHARE-20261009`, `E-UI-CONTRACT-CUSTOM-SHARE-20261009`, `E-PLAYWRIGHT-CUSTOM-SHARE-20261009`, `E-PR-CUSTOM-SHARE-20261009`, `E-DEPLOY-CUSTOM-SHARE-20261009`, `E-LIVE-PUBLIC-CUSTOM-SHARE-20261009`, `E-NAVI-STATE-CUSTOM-SHARE-20261009`.

## 사업자 공유 카드 출처 링크 대비 보정 및 공개 배포 검증 — main e4d0aa50 — 2026-10-09

- AC-001/AC-003: `PASS`. 사업자 공유 카드의 `출처 · 논문명` 링크를 더 밝게 표시해 연구 결과와 원문 진입점을 빠르게 구분하게 했다. 카드 구조·연구 요약·출처 URL·공유 payload는 유지했다.
- AC-004: `PASS`. 공개 Playwright fallback 390·1440px에서 출처 링크가 표시되고 색상 `rgb(183, 233, 229)`, viewport와 `scrollWidth`가 일치했으며 page/console errors 0을 확인했다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·`pnpm test` 127 pass·GitHub Pages base-path 정적 bundle·release manifest·성능 예산과 PR #710 보호 검사가 통과했다. main workflow `37822163007`의 Pages 배포·라이브 smoke·release-status도 성공했다.
- AC-006 제품 독립 경계: `PASS`. 이번 변경은 출처 링크의 시각적 대비만 보완했으며 연구 카피·수치·출처 URL·제품 독립 안내·제품 750 제거·Smart Store 단일 경계·teaser `HOLD`를 변경하지 않았다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 화면 결함은 확인되지 않았다. Browser plugin 부재에 따른 Playwright fallback, Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-311`, `E-LOCAL-BUILD-SOURCE-CONTRAST-20261009`, `E-UI-CONTRACT-SOURCE-CONTRAST-20261009`, `E-PLAYWRIGHT-SOURCE-CONTRAST-20261009`, `E-PR-SOURCE-CONTRAST-20261009`, `E-DEPLOY-SOURCE-CONTRAST-20261009`, `E-LIVE-PUBLIC-SOURCE-CONTRAST-20261009`, `E-NAVI-STATE-SOURCE-CONTRAST-20261009`.

## 히어로 사업자 자료 진입 및 공개 배포 검증 — main 0a352b73 — 2026-10-09

- AC-001/AC-003: `PASS`. 첫 화면의 `사업자 자료` 버튼이 기존 `#final` 공유 보드로 연결되며, 사업자 추천 자료·출처·복사·공유 동작을 그대로 사용한다. 별도 중간 페이지를 추가하지 않았다.
- AC-004: `PASS`. 공개 Playwright fallback 320·390·1440px에서 CTA가 보이고 viewport와 `scrollWidth`가 일치했으며, 클릭 후 `#final`·공유 보드 도착과 page/console errors 0을 확인했다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·`pnpm test` 127 pass·GitHub Pages base-path 정적 번들·성능 예산과 PR #708 보호 검사가 통과했다. main workflow `37819443804`의 Pages 배포·라이브 smoke·release-status도 성공했다.
- AC-006 제품 독립 경계: `PASS`. 이번 변경은 자료 발견성과 이동 경로만 보완했으며 연구 카피·수치·출처·제품 독립 안내·제품 750 제거·Smart Store 단일 경계·teaser `HOLD`를 변경하지 않았다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 화면 결함은 확인되지 않았다. Browser plugin 부재에 따른 Playwright fallback, 실제 공유 시트·Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-310`, `E-LOCAL-BUILD-HERO-BUSINESS-20261009`, `E-UI-CONTRACT-HERO-BUSINESS-20261009`, `E-PLAYWRIGHT-HERO-BUSINESS-20261009`, `E-PR-HERO-BUSINESS-20261009`, `E-DEPLOY-HERO-BUSINESS-20261009`, `E-LIVE-PUBLIC-HERO-BUSINESS-20261009`, `E-NAVI-STATE-HERO-BUSINESS-20261009`.

## 사업자 공유 자료 원문 연결 및 공개 배포 검증 — main d75eab09 — 2026-10-09

- AC-001/AC-003: `PASS`. 사람 연구·발효 안전 연구 카드의 출처 라벨을 직접 링크로 연결하고, 추천 자료 복사·공유 payload에 PubMed 원문 URL을 포함했다. 카드 안에서 결과와 출처가 이어져 별도 중간 이동 없이 확인할 수 있다.
- AC-004: `PASS`. 공개 Chrome CDP fallback 390px에서 사업자 추천 5개·소비자 추천 3개·카드 원문 링크 2개(각 링크 58px)·`scrollWidth=390`·runtime errors 0을 확인했다. mock Web Share payload에는 PMID 22203366·29856155 URL이 포함됐다. 실제 DOM은 `03 · 전문가 영상 → 04 · 연구 지도`이고 handoff는 연구 지도 상단 기준선에 도착했다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·research copy·`pnpm test` 127 pass·production build·배포 경로 성능 예산과 PR #705/#706 보호 검사가 통과했다. main workflow `37813681399`의 Pages 배포·라이브 smoke·release-status도 성공했다.
- AC-006 제품 독립 경계: `PASS`. 출처 연결·공유 payload·레이아웃만 보완했으며 공개 연구 카피·수치·제품 독립 안내·제품 750 제거·Smart Store 단일 경계·teaser `HOLD`를 유지한다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 화면 결함은 확인되지 않았다. Browser plugin 부재에 따른 Chrome CDP fallback, 실제 공유 시트·Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-309`, `E-LOCAL-BUILD-SHARE-SOURCES-20261009`, `E-UI-CONTRACT-SHARE-SOURCES-20261009`, `E-CDP-SHARE-SOURCES-20261009`, `E-PR-SHARE-SOURCES-20261009`, `E-TF-PULSE-REFRESH-SHARE-SOURCES-20261009`, `E-DEPLOY-SHARE-SOURCES-20261009`, `E-LIVE-PUBLIC-SHARE-SOURCES-20261009`, `E-NAVI-STATE-SHARE-SOURCES-20261009`.

## 연구 카드 직접 공유와 전문가 영상 선배치 검증 — main a3d690e0 — 2026-10-09

- AC-001/AC-003: `PASS`. 연구 지도 카드마다 `결과·출처 공유`를 노출하고, 선택한 카드의 연구 제목·대상·관찰 결과·해석 범위·출처·공개 안내서 딥링크를 공유 payload에 포함했다. `navigator.share`가 없는 환경에서는 기존 결과·출처 복사 fallback을 유지한다.
- AC-004: `PASS`. 공개 Chrome CDP fallback 390px·1440px에서 연구 공유 버튼 5개·기존 복사 버튼 5개, `scrollWidth=viewport`, runtime errors 0을 확인했다. 390px mock Web Share에서 `GABA 인지 연구` 제목과 출처·공개 안내서 URL이 전달됐다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·research copy·`pnpm test` 127 pass·production build·성능 예산과 PR #703 보호 검사가 통과했다. main workflow `37807078900`의 Pages 배포·라이브 smoke·release-status도 성공했다.
- AC-006 제품 독립 경계: `PASS`. 연구 카드의 공유 동작과 UI 순서만 보완했으며 연구 카피·수치·출처·제품 독립 안내를 변경하지 않았다. 공개 validator의 제품 750 제거·Smart Store 단일 경계·teaser `HOLD`도 유지된다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 화면 결함은 확인되지 않았다. Browser plugin 부재에 따른 Chrome CDP fallback, 실제 공유 시트·Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-308`, `E-LOCAL-BUILD-RESEARCH-SHARE-20261009`, `E-UI-CONTRACT-RESEARCH-SHARE-20261009`, `E-CDP-RESEARCH-SHARE-20261009`, `E-PR-RESEARCH-SHARE-20261009`, `E-DEPLOY-RESEARCH-SHARE-20261009`, `E-LIVE-PUBLIC-RESEARCH-SHARE-20261009`, `E-NAVI-STATE-RESEARCH-SHARE-20261009`.

## 추천 공유 내용 미리보기 공개 검증 — main 73dce094 — 2026-10-09

- AC-001/AC-003: `PASS`. 공유 전달 레일 아래에 선택 대상별 추천 주제 요약을 추가했다. 사업자 기본 상태는 5개 주제, 소비자 전환은 3개 주제로 갱신된다.
- AC-004: `PASS`. 공개 Chrome CDP fallback 390·320·1440px에서 요약의 `aria-label`, 대상 전환, `scrollWidth=viewport width`, runtime errors 0을 확인했다. 요약은 카드·출처·추천 및 복사 동작 앞의 판단 보조 정보로만 동작한다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·research copy·`pnpm test` 127 pass·production build·성능 예산과 PR #701 보호 검사가 통과했다. main workflow `37804335391`의 Pages 배포·라이브 smoke·release-status도 성공했다.
- AC-006 제품 독립 경계: `PASS`. 이번 변경은 대상별 자료 주제의 시각적 미리보기이며 연구 카피·수치·출처·제품 독립 안내를 변경하지 않았다. 공개 validator의 제품 750 제거·Smart Store 단일 경계·teaser `HOLD`도 유지된다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 화면 결함은 확인되지 않았다. Browser plugin 부재에 따른 Chrome CDP fallback, 실제 공유 시트·Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-307`, `E-LOCAL-BUILD-SHARE-PREVIEW-20261009`, `E-UI-CONTRACT-SHARE-PREVIEW-20261009`, `E-CDP-SHARE-PREVIEW-20261009`, `E-PR-SHARE-PREVIEW-20261009`, `E-DEPLOY-SHARE-PREVIEW-20261009`, `E-LIVE-PUBLIC-SHARE-PREVIEW-20261009`, `E-NAVI-STATE-SHARE-PREVIEW-20261009`.

## 공유 보드 전달 순서 레일 공개 검증 — main c074bc02 — 2026-10-09

- AC-001/AC-003: `PASS`. 공유 자료 카드 앞에 `대상 선택 → 추천 개수 확인 → 공유 또는 복사` 3단계 레일을 추가했으며, 데스크톱은 가로·모바일은 세로로 표시된다. 대상 선택에 따라 사업자 추천 5개와 소비자 추천 3개가 동기화된다.
- AC-004: `PASS`. 공개 Chrome CDP fallback에서 390·320·1440px 모두 `scrollWidth=viewport width`, runtime errors 0, 레일 3개와 방향 화살표 2개를 확인했다. 공유 보드의 기존 추천·전체·개별 복사와 출처 연결은 유지된다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·research copy·`pnpm test` 127 pass·production build·성능 예산과 PR #699 보호 검사가 통과했다. main workflow `37800744121`의 Pages 배포·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 경계: `PASS`. 이번 변경은 자료 전달 순서와 접근성 의미를 보강한 UI 변경이며 연구 카피·수치·출처·제품 독립 안내를 변경하지 않았다. 공개 validator의 제품 750 제거·Smart Store 단일 경계·teaser `HOLD`도 유지된다.
- AC-007 감사·레드팀: `PASS_WITH_CONDITIONS`. 신규 CRITICAL/MAJOR 화면 결함은 확인되지 않았다. Browser plugin 부재에 따른 Chrome CDP fallback, 실제 공유 시트·Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-306`, `E-LOCAL-BUILD-SHARE-FLOW-20261009`, `E-UI-CONTRACT-SHARE-FLOW-20261009`, `E-CDP-SHARE-FLOW-20261009`, `E-PR-SHARE-FLOW-20261009`, `E-DEPLOY-SHARE-FLOW-20261009`, `E-LIVE-PUBLIC-SHARE-FLOW-20261009`, `E-NAVI-STATE-SHARE-FLOW-20261009`.

## 전체 자료 복사 액션 라벨 명확화 공개 검증 — main 979df2fa — 2026-10-09

- AC-001/AC-003/AC-004: `PASS`. 전체 자료 버튼은 넓은 화면에서 `전체 5개 복사`, 좁은 모바일에서 `전체 복사`로 표시되며 추천 공유·추천 묶음 복사·개별 문장 복사와 전체 복사 상태를 유지한다.
- AC-005 자동 게이트: `PASS`. UI contract·research copy·typecheck·127개 테스트·production build·정적 bundle·성능 예산과 PR #697 보호 검사가 통과했다. main workflow `37796602199`의 Pages 배포·라이브 smoke·release-status도 성공했다.
- AC-006: `PASS`. 공유 액션의 표시 라벨만 명확히 했으며 연구 카피·수치·출처·제품 독립 정보 고지와 제품 CTA 경계는 변경하지 않았다.
- AC-007: `PASS_WITH_CONDITIONS`. 공개 390px·320px에서 `scrollWidth`가 viewport와 같고 runtime errors 0이었다. 사업자 추천 5개·소비자 추천 3개·카드 5개와 `03 · 전문가 영상 → 04 · 연구 지도` handoff를 재검증했다. Browser plugin 부재·실제 공유 시트·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-305`, `E-LOCAL-BUILD-FULL-COPY-LABEL-20261009`, `E-UI-CONTRACT-FULL-COPY-LABEL-20261009`, `E-CDP-FULL-COPY-LABEL-20261009`, `E-PR-FULL-COPY-LABEL-20261009`, `E-DEPLOY-FULL-COPY-LABEL-20261009`, `E-LIVE-PUBLIC-FULL-COPY-LABEL-20261009`, `E-NAVI-STATE-FULL-COPY-LABEL-20261009`.

## 전체 자료 복사 액션 라벨 명확화 공개 검증 — main 979df2fa — 2026-10-09

- AC-001/AC-003/AC-004: `PASS`. 전체 자료 버튼은 넓은 화면에서 `전체 5개 복사`, 좁은 모바일에서 `전체 복사`로 표시되며 추천 공유·추천 묶음 복사·개별 문장 복사와 전체 복사 상태를 유지한다.
- AC-005 자동 게이트: `PASS`. UI contract·research copy·typecheck·127개 테스트·production build·정적 bundle·성능 예산과 PR #697 보호 검사가 통과했다. main workflow `37796602199`의 Pages 배포·라이브 smoke·release-status도 성공했다.
- AC-006: `PASS`. 공유 액션의 표시 라벨만 명확히 했으며 연구 카피·수치·출처·제품 독립 정보 고지와 제품 CTA 경계는 변경하지 않았다.
- AC-007: `PASS_WITH_CONDITIONS`. 공개 390px·320px에서 `scrollWidth`가 viewport와 같고 runtime errors 0이었다. 사업자 추천 5개·소비자 추천 3개·카드 5개와 `03 · 전문가 영상 → 04 · 연구 지도` handoff를 재검증했다. Browser plugin 부재·실제 공유 시트·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-305`, `E-LOCAL-BUILD-FULL-COPY-LABEL-20261009`, `E-UI-CONTRACT-FULL-COPY-LABEL-20261009`, `E-CDP-FULL-COPY-LABEL-20261009`, `E-PR-FULL-COPY-LABEL-20261009`, `E-DEPLOY-FULL-COPY-LABEL-20261009`, `E-LIVE-PUBLIC-FULL-COPY-LABEL-20261009`, `E-NAVI-STATE-FULL-COPY-LABEL-20261009`.

## 공유 카드 사용 장면 표시 및 사업자 선택 경험 공개 검증 — main d6d64064 — 2026-10-08

- AC-001/AC-003/AC-004: `PASS`. 공개 공유 보드의 5개 카드에 상황별 사용 장면이 표시되고 사업자 추천 5개·소비자 추천 3개·전체 카드 5개·개별 복사·출처가 유지된다.
- AC-005 자동 게이트: `PASS`. UI contract·typecheck·research copy·production build·정적 bundle·성능 예산과 PR #695 보호 검사가 통과했다. 최종 main workflow `37794039208`의 Pages 배포·라이브 smoke·release-status도 성공했다.
- AC-006: `PASS`. 카드 선택 안내만 보완했으며 공유 원문·연구 카피·수치·출처·제품 독립 정보 고지와 제품 CTA 경계는 변경하지 않았다.
- AC-007: `PASS_WITH_CONDITIONS`. 공개 390px·320px CDP에서 사용 장면 라벨·대상 전환·추천 수·가로폭·runtime errors 0을 확인했고, `03 · 전문가 영상 → 04 · 연구 지도` handoff도 재검증했다. Browser plugin 부재·실제 모바일 공유 시트·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-302`, `C-304`, `E-LOCAL-BUILD-SHARE-USE-CASES-20261008`, `E-UI-CONTRACT-SHARE-USE-CASES-20261008`, `E-CDP-SHARE-USE-CASES-20261008`, `E-PR-SHARE-USE-CASES-20261008`, `E-DEPLOY-SHARE-USE-CASES-20261008`, `E-LIVE-PUBLIC-SHARE-USE-CASES-20261008`, `E-NAVI-STATE-SHARE-USE-CASES-20261008`.

## 모바일 공유 보드 제목 압축 및 전문가 영상 순서 최종 검증 — main 2f49bf4c — 2026-10-08

- AC-001/AC-003/AC-004: `PASS`. 공개 390px에서 사업자 상세 요약은 `사업자용 GABA 자료`, 소비자 전환 뒤에는 `소비자용 GABA 자료`로 표시되며 사업자 추천 5개·소비자 추천 3개·전체 카드 5개·복사 액션을 유지한다.
- AC-005 자동 게이트: `PASS`. PR #693 보호 검사와 main workflow `37791097227`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. 라이브 validator는 candidate SHA 일치와 정적 공개 데이터 경계를 확인했다.
- AC-006: `PASS`. 제목 길이와 모바일 공유 보드 읽기 흐름만 보완했으며 연구 카피·수치·출처·제품 독립 정보 고지와 제품 CTA 경계는 변경하지 않았다.
- AC-007: `PASS_WITH_CONDITIONS`. Chrome CDP fallback 공개 390px에서 `scrollWidth=390`·runtime errors 0과 `03 · 전문가 영상 → 04 · 연구 지도`·handoff 도착을 확인했다. Browser plugin 부재·실제 모바일 공유 시트·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-302`, `C-303`, `E-LOCAL-BUILD-COMPACT-SHARE-20261008`, `E-UI-CONTRACT-COMPACT-SHARE-20261008`, `E-CDP-COMPACT-SHARE-20261008`, `E-PR-COMPACT-SHARE-20261008`, `E-DEPLOY-COMPACT-SHARE-20261008`, `E-LIVE-PUBLIC-COMPACT-SHARE-20261008`, `E-NAVI-STATE-COMPACT-SHARE-20261008`.

## 대상별 공유 링크 맥락 보존 및 전문가 영상 순서 공개 검증 — main 065a7d49 — 2026-10-08

- AC-001/AC-003/AC-004: `PASS`. 공개 390px에서 `03 · 전문가 영상`이 `04 · 연구 지도`보다 앞에 있고, 전문가 영상의 “다음 장 · 연구 지도”를 누르면 연구 지도 제목으로 이동한다. 페이지 가로폭은 390px이며 runtime errors는 없다.
- AC-005 자동 게이트: `PASS`. PR #691 보호 검사·main release-verify·Pages 배포·라이브 smoke·release-status가 성공했다. 정적 번들·연구 카피·타입·테스트·성능 게이트는 release workflow에서 재검증됐다.
- AC-006: `PASS`. 공유 URL에 대상 선택과 `#final`을 추가했지만 연구 카피·수치·출처·제품 독립 경계와 제품 CTA 제한은 변경하지 않았다. 소비자 딥링크는 `audience=21`, 추천 3개, 소비자용 제목으로 복원됐다.
- AC-007: `PASS_WITH_CONDITIONS`. mock Web Share에서 소비자용 제목과 `https://kradavid.github.io/gaba_info/?view=guide&audience=21#final`을 확인했다. Browser plugin 부재·실제 iOS/Android 공유 시트·Safari/실기기·고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-302`, `E-LOCAL-BUILD-AUDIENCE-DEEPLINK-20261008`, `E-UI-CONTRACT-AUDIENCE-DEEPLINK-20261008`, `E-CDP-AUDIENCE-DEEPLINK-20261008`, `E-PR-AUDIENCE-DEEPLINK-20261008`, `E-DEPLOY-AUDIENCE-DEEPLINK-20261008`, `E-LIVE-PUBLIC-AUDIENCE-DEEPLINK-20261008`, `E-NAVI-STATE-AUDIENCE-DEEPLINK-20261008`.

## 추천 자료 한 번에 공유 및 fallback 안내 공개 검증 — main 3ebb5c3f — 2026-10-08

- AC-003/AC-004: PASS_WITH_CONDITIONS. 선택 대상의 추천 묶음을 `추천 공유`로 직접 전달하고, 전체 5개·개별 문장 복사·출처 연결은 유지된다. 사업자 기본은 5개, 소비자 전환은 3개 추천이다.
- AC-005 자동 게이트: PASS. UI contract·research copy·typecheck·`pnpm test` 127 pass·Pages production build·정적 bundle·성능 예산이 통과했다. main release-verify가 최종 fallback 코드까지 다시 빌드했다.
- AC-001 공개 배포: PASS. PR #688·#689 보호 검사가 통과했고 main workflow `37785257715`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했으며 deploy-worker는 `STATIC_ONLY`로 skipped됐다.
- AC-006 제품 독립 경계: PASS. 공유 방식·fallback 안내만 보완했으며 연구 카피·수치·출처·제품 CTA·제품 독립 정보 고지 문구는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 공개 390px에서 추천 공유 버튼·대상 전환·가로폭·runtime errors 0을 확인했고 mock Web Share에서 사업자용 5개 자료와 공개 URL이 전달됐다. Browser plugin 부재·실제 Web Share가 없는 자동화 환경·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-301`, `E-LOCAL-BUILD-RECOMMENDED-SHARE-20261008`, `E-UI-CONTRACT-RECOMMENDED-SHARE-20261008`, `E-CDP-RECOMMENDED-SHARE-20261008`, `E-PR-RECOMMENDED-SHARE-20261008`, `E-DEPLOY-RECOMMENDED-SHARE-20261008`, `E-LIVE-PUBLIC-RECOMMENDED-SHARE-20261008`, `E-NAVI-STATE-RECOMMENDED-SHARE-20261008`.

## 추천 자료 한 번에 공유 및 fallback 안내 공개 검증 — main 3ebb5c3f — 2026-10-08

- AC-003/AC-004: PASS_WITH_CONDITIONS. 선택 대상의 추천 묶음을 `추천 공유`로 직접 전달하고, 전체 5개·개별 문장 복사·출처 연결은 유지된다. 사업자 기본은 5개, 소비자 전환은 3개 추천이다.
- AC-005 자동 게이트: PASS. UI contract·research copy·typecheck·`pnpm test` 127 pass·Pages production build·정적 bundle·성능 예산이 통과했다. main release-verify가 최종 fallback 코드까지 다시 빌드했다.
- AC-001 공개 배포: PASS. PR #688·#689 보호 검사가 통과했고 main workflow `37785257715`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했으며 deploy-worker는 `STATIC_ONLY`로 skipped됐다.
- AC-006 제품 독립 경계: PASS. 공유 방식·fallback 안내만 보완했으며 연구 카피·수치·출처·제품 CTA·제품 독립 정보 고지 문구는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 공개 390px에서 추천 공유 버튼·대상 전환·가로폭·runtime errors 0을 확인했고 mock Web Share에서 사업자용 5개 자료와 공개 URL이 전달됐다. Browser plugin 부재·실제 Web Share가 없는 자동화 환경·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-301`, `E-LOCAL-BUILD-RECOMMENDED-SHARE-20261008`, `E-UI-CONTRACT-RECOMMENDED-SHARE-20261008`, `E-CDP-RECOMMENDED-SHARE-20261008`, `E-PR-RECOMMENDED-SHARE-20261008`, `E-DEPLOY-RECOMMENDED-SHARE-20261008`, `E-LIVE-PUBLIC-RECOMMENDED-SHARE-20261008`, `E-NAVI-STATE-RECOMMENDED-SHARE-20261008`.

## 대상별 추천 자료 선배치 공유 보드 공개 검증 — main 679219cd — 2026-10-08

- AC-003/AC-004: PASS. 대상 선택 후 추천 자료가 공유 보드의 앞쪽에 시각적으로 표시되고, 전체 5개 자료·개별 복사·출처 연결은 유지된다. 사업자 기본은 5개, 소비자 전환은 3개 추천이다.
- AC-005 자동 게이트: PASS. UI contract·research copy·typecheck·`pnpm test` 127 pass·Pages production build·정적 bundle·성능 예산이 통과했다. initial JS `311,405`, initial CSS `95,703`, 총 자산 `1,643,350 / 1,650,000 bytes`다.
- AC-001 공개 배포: PASS. PR #686 보호 검사와 main workflow `37781251710`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했으며 deploy-worker는 `STATIC_ONLY`로 skipped됐다.
- AC-006 제품 독립 경계: PASS. 공유 보드의 카드 표시 순서만 보완했으며 연구 카피·수치·출처·제품 CTA·제품 독립 정보 고지 문구는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 공개 390px CDP에서 소비자 전환 뒤 추천 카드의 computed order `-1`과 실제 위치를 확인했고, 카드 5개·`scrollWidth=390`·runtime errors 0이었다. Browser plugin 부재·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-300`, `E-LOCAL-BUILD-AUDIENCE-FIRST-20261008`, `E-UI-CONTRACT-AUDIENCE-FIRST-20261008`, `E-CDP-AUDIENCE-FIRST-20261008`, `E-PR-AUDIENCE-FIRST-20261008`, `E-DEPLOY-AUDIENCE-FIRST-20261008`, `E-LIVE-PUBLIC-AUDIENCE-FIRST-20261008`, `E-NAVI-STATE-AUDIENCE-FIRST-20261008`.

## 사업자 우선 공유 보드·대상별 문구 동기화 공개 검증 — main 4c4e3891 — 2026-10-08

- AC-003/AC-004: PASS_WITH_CONDITIONS. 자료 모음은 사업자를 기본 대상으로 열고 5개 추천 자료를 바로 제공한다. 소비자 전환 시 제목·ARIA 안내·추천 복사 수가 3개로 함께 바뀌며 전체 5개와 개별 복사는 유지된다.
- AC-005 자동 게이트: PASS. UI contract·research copy·typecheck·`pnpm test` 127 pass·Pages 경로 production build·정적 bundle·성능 예산이 통과했다. initial JS `311,405`, initial CSS `95,703`, 총 자산 `1,643,341 / 1,650,000 bytes`다.
- AC-001 공개 배포: PASS. PR #684 보호 검사가 통과했고 main workflow `37778173337`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했으며 deploy-worker는 `STATIC_ONLY`로 skipped됐다.
- AC-006 제품 독립 경계: PASS. 기본 대상과 동적 문구만 보완했으며 연구 카피·수치·출처·제품 CTA·제품 독립 정보 고지 문구는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. live validator는 HTTP 200·candidate SHA 일치·bundle hash 73개·claims 12개·master records 6개·share pages 6개·`teaser HOLD`·`smartStoreOnly=true`·`removed750=true`·`provenance=matched`를 확인했다. Chrome CDP fallback 공개 390px에서 사업자 기본 5개→소비자 전환 3개, 카드 5개, `scrollWidth=390`, runtime errors 0을 확인했다. Browser plugin 부재·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-299`, `E-LOCAL-BUILD-BUSINESS-FIRST-SHARE-20261008`, `E-UI-CONTRACT-BUSINESS-FIRST-SHARE-20261008`, `E-CDP-BUSINESS-FIRST-SHARE-20261008`, `E-PR-BUSINESS-FIRST-SHARE-20261008`, `E-DEPLOY-BUSINESS-FIRST-SHARE-20261008`, `E-LIVE-PUBLIC-BUSINESS-FIRST-SHARE-20261008`, `E-NAVI-STATE-BUSINESS-FIRST-SHARE-20261008`.

## 대상별 공유 묶음·전체 자료 복사 고도화 및 공개 재검증 — main f69df003 — 2026-10-08

- AC-003/AC-004: PASS_WITH_CONDITIONS. 자료 모음 바로가기와 소비자·사업자·교육 대상 선택을 제공하고, 대상별 추천 카드·추천 묶음 복사·5개 전체 복사·개별 문장 복사를 함께 유지한다. 출처·제품 독립 정보 경계는 그대로다.
- AC-005 자동 게이트: PASS. UI contract·typecheck·`pnpm test` 127 pass·Pages 경로 production build·정적 bundle·성능 예산이 통과했다. initial JS `311,405`, initial CSS `95,703`, 총 자산 `1,643,337 / 1,650,000 bytes`다.
- AC-001 공개 배포: PASS. PR #681 기능 검사가 통과했고, no-script fallback marker 누락으로 main workflow `37774885434`의 smoke-live가 실패한 뒤 PR #682에서 marker를 복원했다. 최종 main workflow `37775580048`은 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 deploy-worker는 `STATIC_ONLY`로 skipped됐다.
- AC-006 제품 독립 경계: PASS. 대상별 추천과 복사 UX만 추가했으며 제품 CTA·연구 카피·수치·출처·공개 과학 정보 고지 문구는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. live validator는 HTTP 200·candidate SHA 일치·bundle hash 73개·claims 12개·master records 6개·share pages 6개·`teaser HOLD`·`smartStoreOnly=true`·`removed750=true`·`provenance=matched`를 확인했다. Chrome CDP fallback 390px에서 추천 3→5, 카드 5개, `scrollWidth=390`, runtime errors 0을 확인했다. Browser plugin 부재·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-298`, `E-LOCAL-BUILD-AUDIENCE-SHARE-CLARITY-20261008`, `E-UI-CONTRACT-AUDIENCE-SHARE-CLARITY-20261008`, `E-CDP-AUDIENCE-SHARE-CLARITY-20261008`, `E-PR-AUDIENCE-SHARE-CLARITY-20261008`, `E-DEPLOY-AUDIENCE-SHARE-CLARITY-20261008`, `E-LIVE-PUBLIC-AUDIENCE-SHARE-CLARITY-20261008`, `E-NAVI-STATE-AUDIENCE-SHARE-CLARITY-20261008`.

## 사업자 전달 대상 선택·추천 카드 고도화 및 공개 재검증 — main 417db68e — 2026-10-08

- AC-003/AC-004: PASS_WITH_CONDITIONS. 공유 보드에 소비자·사업자·교육 대상 선택을 추가했고, 선택 대상의 추천 카드만 강조하면서 5개 전체 카드·개별 복사·전체 복사를 계속 노출한다. 사람 연구·발효 연구 카드의 출처와 제품 독립 흐름은 유지한다.
- AC-005 자동 게이트: PASS. UI contract·typecheck·`pnpm test` 127 pass·Pages 경로 production build·정적 bundle·release manifest·성능 예산이 통과했다. Pages-style 총 자산은 `1,649,657 / 1,650,000 bytes`, initial JS `311,475`, initial CSS `95,703`이다.
- AC-001 공개 배포: PASS. PR #675의 `release-verify`·`site-quality-verify`가 통과했고, heartbeat 신선도 만료를 PR #676으로 갱신한 뒤 main merge SHA `417db68ed27c631f1fad3d7c36193b1f27574c52`의 workflow `37749598234`에서 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. deploy-worker는 STATIC_ONLY로 skipped됐다.
- 최종 NAVI 문서 sync: PASS. 문서-only PR #677이 required checks를 통과해 main `1b6fdc422c678f015fe10df648e59b166e7a682f`로 병합됐고 workflow `37750454485`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 다시 성공했다. 최종 live validator candidate도 `1b6fdc422c678f015fe10df648e59b166e7a682f`와 일치했으며 기능 코드·공개 데이터는 변경되지 않았다.
- AC-006 제품 독립 경계: PASS. 대상 선택과 추천 강조만 추가했고 제품 CTA·연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 라이브 validator는 HTTP 200·candidate SHA 일치·bundle hash 73개·claims 12개·master records 6개·share pages 6개·`teaser HOLD`·`smartStoreOnly=true`·`removed750=true`·`provenance=matched`를 확인했다. Chrome CDP fallback 390px에서 초기 추천 3개, 사업자 대상 전환 후 추천 5개, 카드 5개 유지, 가로폭 `390/390`을 확인했다. Browser plugin 부재·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-296`, `E-LOCAL-BUILD-BUSINESS-AUDIENCE-20261008`, `E-UI-CONTRACT-BUSINESS-AUDIENCE-20261008`, `E-CDP-BUSINESS-AUDIENCE-20261008`, `E-PR-BUSINESS-AUDIENCE-20261008`, `E-TF-PULSE-BUSINESS-AUDIENCE-20261008`, `E-DEPLOY-PIPELINE-BUSINESS-AUDIENCE-20261008`, `E-LIVE-PUBLIC-BUSINESS-AUDIENCE-20261008`, `E-NAVI-STATE-BUSINESS-AUDIENCE-20261008`.

## 사업자용 공유 자료 보드 고도화 및 공개 배포 — main 4804d623 — 2026-10-08

- AC-001 공개 배포: PASS. PR #673 보호 검사가 통과했고 main workflow `37744034563`의 `release-verify`·`worker-readiness`·`deploy-pages`·`smoke-live`·`release-status`가 모두 성공했다. `deploy-worker`는 `STATIC_ONLY` 정책으로 skipped됐다.
- AC-003/AC-004 공유 자료 사용성: PASS_WITH_CONDITIONS. 마지막 장이 5개 라벨형 자료 카드로 즉시 열리고, 사람 연구·발효 연구 카드에는 출처가 표시되며 개별·전체 복사에 출처와 공개 안내서 deep link가 포함된다. 로컬 Chrome fallback의 상단 화면과 마지막 DOM에서 레이아웃·카드·컨트롤을 확인했다.
- AC-005 자동 게이트: PASS. `pnpm test` 127 pass, UI contract·research copy·typecheck·build·성능 예산이 통과했다. 총 자산은 `1,649,437 / 1,650,000 bytes`, initial JS `311,405`, initial CSS `95,703`이다.
- AC-006 제품 독립 경계: PASS. 제품 CTA를 추가하지 않았고 공개 안내서의 편집 경계를 유지했다. 공개 번들과 라이브 validator에서 공유 보드·출처·제품 독립 메타데이터를 확인했다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재로 Chrome fallback을 사용했으므로 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수와 teaser `HOLD`는 외부/open 조건으로 남긴다.
- `Final Status: NOT_READY`; NAVI `USER_DECISION`.

증적: `C-295`, `E-LOCAL-BUILD-BUSINESS-SHARE-20261008`, `E-UI-CONTRACT-BUSINESS-SHARE-20261008`, `E-CDP-BUSINESS-SHARE-20261008`, `E-PR-BUSINESS-SHARE-20261008`, `E-DEPLOY-PIPELINE-BUSINESS-SHARE-20261008`, `E-LIVE-PUBLIC-BUSINESS-SHARE-20261008`, `E-NAVI-STATE-BUSINESS-SHARE-20261008`.

## 공개 evidence action 모바일 가독성 보정 및 배포 — main 7ac81847 — 2026-10-08

- AC-001 공개 배포: PASS. PR #670의 `release-verify`·`site-quality-verify`가 통과한 뒤 main merge SHA `7ac8184786b59725f8d789d8fe3a137c456ee8b6`의 workflow `37739962907`에서 `release-verify`·`worker-readiness`·`deploy-pages`·`smoke-live`·`release-status`가 성공했고 `deploy-worker`는 `STATIC_ONLY`로 skipped됐다.
- AC-003/AC-004 모바일·큰 글자 가독성: PASS. 연구 출처·원문·공유·읽기 노트 액션을 기본 13px로 정리했다. 실제 공개 390px 일반·큰 글자 모드에서 application·fermented·video original·research scale·share copy·reading source가 모두 13px로 계산되고 `pageWidth/scrollWidth=390/390`, `errors=[]`였다.
- AC-005 자동 게이트: PASS. 로컬 UI contract·typecheck·`pnpm test` 127 pass·production build·정적 bundle·성능 예산을 통과했다. 로컬 총 자산은 `1,649,442 bytes / 1,650,000 bytes`이며 공개 validator는 HTTP 200·bundle hash 73개·claims 12개·master records 6개·share pages 6개·`teaser HOLD`·`smartStoreOnly=true`·`removed750=true`·`provenance=matched`를 확인했다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 출처·원문·공유 액션의 읽기 크기와 UI contract에 한정되며 연구 카피·수치·출처 연결·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Playwright fallback은 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으며 해당 외부 조건과 `USER_DECISION / NOT_READY`를 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-294`, `E-LOCAL-BUILD-LARGE-TEXT-EVIDENCE-20261008`, `E-UI-CONTRACT-LARGE-TEXT-EVIDENCE-20261008`, `E-PR-LARGE-TEXT-EVIDENCE-20261008`, `E-DEPLOY-PIPELINE-LARGE-TEXT-EVIDENCE-20261008`, `E-LIVE-PUBLIC-LARGE-TEXT-EVIDENCE-20261008`, `E-NAVI-STATE-LARGE-TEXT-EVIDENCE-20261008`.

## NAVI 문서 기록 최종 동기화 — main 96218e16 — 2026-10-08

- 문서-only PR #644 병합 후 main merge SHA `96218e1667181ec2d064146e9b1e10e628d02267`와 GitHub Pages 공개 candidate가 일치했다. main workflow `37693604219`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 deploy-worker는 STATIC_ONLY 정책으로 skipped다.
- 최종 live validator는 HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다. 문서 병합으로 기능 코드·연구 카피·수치·출처·제품 독립 경계는 변경되지 않았다.
- 최종 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다. 신규 CRITICAL/MAJOR 결함은 없으며 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 남는다.

증적: `C-282`, `E-PR-NAVI-FINAL-SYNC-20261008`, `E-DEPLOY-PIPELINE-NAVI-FINAL-SYNC-20261008`, `E-LIVE-PUBLIC-NAVI-FINAL-SYNC-20261008`, `E-NAVI-STATE-NAVI-FINAL-SYNC-20261008`.

## 좁은 모바일 연구 지도·큰 글자 모드 보완 및 공개 배포 재검증 — main 774fbc50 — 2026-10-08

- 280·390px 큰 글자 모드에서 연구 지도 5개 항목의 Grid 최소 콘텐츠 폭이 가장자리 열을 밀어낼 수 있는 잔여 리스크를 확인하고, 3열 트랙을 `minmax(0, 1fr)`로 보완했다. 변경은 연구 지도 레이아웃에 한정되며 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 production build는 총 자산 `1,649,416 bytes / 1,650,000 bytes`, UI contract·typecheck·127개 테스트·정적 bundle·release manifest·성능 예산·NAVI state validation을 통과했다. Pages base-path 성능 검사는 `1,649,620 bytes`로 통과했다.
- PR #643 보호 검사와 main workflow `37692783826`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. 공개 validator는 merge candidate `774fbc507f979cea42865d340cb014e677ccb771`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다.
- 실제 공개 Chrome CDP fallback 280·390px 큰 글자 연구 지도에서 5개 항목이 도표 안에 배치되고 `pageWidth/scrollWidth=280/280`, `390/390`, `errors=[]`, 이름 없는 버튼 0개였다. 신규 CRITICAL/MAJOR 결함은 없다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다. Browser plugin 부재·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다.

증적: `C-282`, `E-LOCAL-BUILD-RESEARCH-MAP-NARROW-20261008`, `E-PR-RESEARCH-MAP-NARROW-20261008`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-NARROW-20261008`, `E-LIVE-PUBLIC-RESEARCH-MAP-NARROW-20261008`, `E-CDP-LIVE-RESEARCH-MAP-NARROW-20261008`, `E-NAVI-STATE-RESEARCH-MAP-NARROW-20261008`.

## 1440px 데스크톱 직접 진입 시각 감리 — main a576f740 — 2026-10-08

- 공개 `https://kradavid.github.io/gaba_info/`를 1440px·1000px로 열고 `#top`·`#academic`·`#research`·`#expert-videos`·`#final`을 직접 진입했다. 장 제목의 실제 bounding box는 각각 헤더 아래에 위치했고, 대표 장 모두 `pageWidth/scrollWidth=1425/1425`, `errors=[]`였다.
- 시각 감리 포인트는 ① 히어로의 텍스트·자연 이미지 분할 ② 연구 지도 중심축과 5개 주제 ③ 연구 결과 도표의 비교 구조 ④ 전문가 영상 선택 보드 ⑤ 마지막 공유·인쇄 handoff다. 다섯 화면에서 색상 토큰·테두리·라운드·아이콘·타이포그래피 계층이 일관되며, 기존 캡처에서 보인 제목 잘림은 진입 위치를 잘못 저장한 캡처 아티팩트로 판정했다.
- 로컬 기준 UI contract·typecheck·127개 테스트·NAVI project-state validation은 이전 main 보호검사와 함께 유효하며, 이번 회차에 기능 코드·연구 카피·수치·출처는 변경하지 않았다. 신규 CRITICAL/MAJOR 결함은 없다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다. Chrome CDP fallback은 Browser plugin 부재에 따른 대체 검증이며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않는다.

증적: `C-281`, `E-CDP-DESKTOP-VISUAL-AUDIT-20261008`, `E-LIVE-PUBLIC-DESKTOP-AUDIT-20261008`, `E-NAVI-STATE-DESKTOP-AUDIT-20261008`.

## 병합 후 최종 공개 SHA 정합성 확인 — main 4cc90945 — 2026-10-08

- PR #639 병합 후 main 배포 workflow `37689497347`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 모두 PASS였다. 정적 사이트 정책에 따라 deploy-worker는 skipped다.
- 배포 후 라이브 validator는 candidate SHA `4cc90945bdb84fe97d9f64bd10d797ab09d5b65c`를 반환해 main merge SHA와 공개본이 일치함을 확인했다. 공개 URL은 HTTP 200이며 bundle hash 73개·claims 12개·master records 6개·share pages 6개·teaser `HOLD`·제품 독립 경계를 유지한다.
- 기능 코드·연구 카피·수치·출처는 변경하지 않았다. 최종 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다. 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 남는다.

증적: `C-280`, `E-DEPLOY-PIPELINE-PUBLIC-REAUDIT-FINAL-20261008`, `E-LIVE-PUBLIC-REAUDIT-FINAL-20261008`, `E-NAVI-STATE-PUBLIC-REAUDIT-FINAL-20261008`.

## 최신 main 공개본 통합 재감리 및 NAVI 자동 업데이트 — main 6b402228 — 2026-10-08

- 390px 공개 URL에서 14개 장을 직접 진입해 첫 제목 위치·본문 시작·장 높이·가로폭·런타임 오류를 확인했다. `#top`·`#opening-bridge`·`#history`·`#basics`·`#academic`·`#everyday`·`#sleep`·`#research`·`#applications`·`#fermented-safety`·`#growth`·`#expert-videos`·`#reading-note`·`#final` 모두 `pageWidth/scrollWidth=390/390`, `errors=[]`였다.
- 연구 지도는 5개 영역과 사람·동물·세포 범위 라벨을 유지했고, 연구 결과 도표·출처 읽기·전문가 영상·최종 공유 handoff가 자연스럽게 이어졌다. 공개 화면에서는 제품 구매·상담 CTA가 과학 안내 흐름을 대체하지 않았다.
- 자동 게이트는 UI contract·typecheck·127개 테스트·governance·ops-docs·live validator·production build가 모두 PASS였다. 정적 자산은 `1,649,396 bytes / 1,650,000 bytes`로 예산 안이다.
- 공개 validator는 candidate SHA `6b402228d4ebb7d1d6555958fa46c2c04f934168`, page 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다. 신규 CRITICAL/MAJOR 결함은 없다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다. Browser plugin 부재에 따른 Chrome CDP fallback은 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으며, 해당 조건은 완료 게이트에 남겨 둔다.

증적: `C-279`, `E-LOCAL-BUILD-PUBLIC-REAUDIT-20261008`, `E-CDP-PUBLIC-14-CHAPTER-REAUDIT-20261008`, `E-LIVE-PUBLIC-REAUDIT-20261008`, `E-NAVI-STATE-PUBLIC-REAUDIT-20261008`.

## 모바일 읽기 크기 버튼 가독성 보정 및 공개 배포 — main e963b2b1 — 2026-10-08

- 280·320·351·390·430·768px 공개 헤더를 재감리한 결과 `가+ 크게`·`가− 기본`의 기호가 동작을 방해할 수 있는 잔여 가독성 리스크를 확인했다. 표시 마크를 `가`로 단순화해 기본 상태는 `가 크게`, 대형 글자 상태는 `가 기본`으로 읽히도록 보완했으며 ARIA action label·44px touch target·상태 전환은 유지했다.
- 로컬 `pnpm run validate:ui-contract`, `pnpm run typecheck`, `pnpm run build`가 성공했고 총 자산은 `1,649,396 bytes / 1,650,000 bytes`였다. PR #637의 release-verify·site-quality-verify와 main workflow `37687487406`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. deploy-worker는 STATIC_ONLY 정책으로 건너뛰었다.
- 공개 validator는 candidate SHA `e963b2b13295bf2567a70e586e640b4206de4e5f`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다. Chrome CDP fallback 공개 화면에서 pageWidth/scrollWidth는 280/280·320/320·351/351·390/390·430/430·768/768(브라우저 스크롤바 제외 753/753)였고 runtime errors=[]였다. 390px에서 읽기 크기 버튼 클릭 후 `aria-pressed=false`, `글자 크게 보기`, `largeText=false` 전환을 확인했다.
- 신규 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수·teaser `HOLD`는 외부 검증 조건으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `C-278`, `E-LOCAL-BUILD-MOBILE-READING-CUE-20261008`, `E-UI-CONTRACT-MOBILE-READING-CUE-20261008`, `E-CDP-MOBILE-READING-CUE-20261008`, `E-DEPLOY-PIPELINE-MOBILE-READING-CUE-20261008`, `E-LIVE-PUBLIC-MOBILE-READING-CUE-20261008`, `E-NAVI-STATE-MOBILE-READING-CUE-20261008`.

## 초소형 모바일 연구 도표 줄바꿈 및 공개 재검증 — main d9e223bf — 2026-10-08

- 280px 공개 화면의 연구 결과 도표를 공격적으로 점검해 비교 안내 문구가 한 줄 고정으로 잘릴 수 있는 문제와 `GABA를 바른 조건` 같은 긴 조건명이 카드 폭을 넘을 수 있는 문제를 확인했다. 안내 문구·조건명 줄바꿈과 좁은 숫자 지표 타이포그래피를 보완해 카드 내부에서 읽히도록 했다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 `pnpm run validate:ui-contract`, `pnpm run typecheck`, `pnpm run build`가 성공했고 총 자산은 `1,649,411 bytes / 1,650,000 bytes`였다. PR #634·#635 보호검사와 main workflow `37684187205`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. deploy-worker는 STATIC_ONLY 정책으로 건너뛰었다.
- 공개 validator는 candidate SHA `d9e223bf343879d35a1a9c32aa76dec39ebdc546`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다. Chrome CDP fallback에서 280px은 pageWidth/scrollWidth `280/280`, 연구 도표 `202/202`, 수면 도표 `200/200`; 1440px은 pageWidth/scrollWidth `1425/1425`, 연구 도표 `685/685`, 수면 도표 `592/592`였고 runtime errors=[]였다. 390px 전체 14개 장도 해시 직접 진입·제목 위치·본문 흐름·가로폭을 통과했다.
- 신규 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수·teaser `HOLD`는 외부 검증 조건으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `C-277`, `E-LOCAL-BUILD-NARROW-CHART-WRAP-20261008`, `E-UI-CONTRACT-NARROW-CHART-WRAP-20261008`, `E-CDP-NARROW-CHART-WRAP-20261008`, `E-DEPLOY-PIPELINE-NARROW-CHART-WRAP-20261008`, `E-LIVE-PUBLIC-NARROW-CHART-WRAP-20261008`, `E-NAVI-STATE-NARROW-CHART-WRAP-20261008`.

## 연구 규모 기준일 노출 및 공개 배포 재감리 — main 01fab451 — 2026-10-08

- 연구 규모의 큰 수치 옆에 `기준일 2026.09.28`을 노출해, 984·557·12,124가 언제의 어떤 검색·분석 결과인지 첫 시선에서 읽히도록 보완했다. 하버드·옥스퍼드의 동일 PubMed 검색과 별도 GABA-A 수용체 SCIE 분석의 범위·수치·출처는 변경하지 않았다.
- 로컬 UI contract·typecheck·127개 테스트·Vite production build·정적 bundle·성능 예산이 통과했다. 로컬 총 자산은 1,649,346바이트였고, PR #632의 release-verify·site-quality-verify 및 main workflow `37680629352`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. deploy-worker는 `STATIC_ONLY` 정책으로 건너뛰었다.
- 공개 validator는 candidate SHA `01fab45151b7631ccf88f342629ccd5387ee4b24`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다. 공개 390px Chrome CDP fallback에서 기준일 텍스트, pageWidth/scrollWidth 390/390, errors=[]를 확인했다.
- 신규 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수·teaser `HOLD`는 외부 검증 조건으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `C-276`, `E-LOCAL-BUILD-RESEARCH-SCALE-DATE-20261008`, `E-UI-CONTRACT-RESEARCH-SCALE-DATE-20261008`, `E-CDP-RESEARCH-SCALE-DATE-20261008`, `E-DEPLOY-PIPELINE-RESEARCH-SCALE-DATE-20261008`, `E-LIVE-PUBLIC-RESEARCH-SCALE-DATE-20261008`, `E-NAVI-STATE-RESEARCH-SCALE-DATE-20261008`.

## 전문가 영상 공개 장 반응형·직접 진입 재감리 — main a6cead44 — 2026-10-08

- 전문가 영상 장을 280·320·390·1440px에서 다시 감리했다. 재생 전 포스터, 선택 게시판, 주제 필터, 9개 영상 카드, 선택 영상 정보가 모바일과 데스크톱에서 한 흐름으로 유지됐다.
- 공개 390px 하단에서 마지막 영상 카드 다음에 `연구를 읽는 기준`과 `원문 출처` handoff가 바로 이어졌고, 280·320·390px는 pageWidth/scrollWidth가 각각 280/280·320/320·390/390, 1440px는 1425/1425로 확인됐다. 네 폭 모두 runtime error는 없었다.
- 로컬 typecheck·127개 테스트·live validator·governance·ops docs 검사가 통과했다. 라이브 validator는 candidate SHA `a6cead44c38964204c480f9e626b64bdeb6cc9c5`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다.
- 신규 CRITICAL/MAJOR 결함은 없다. 기능 코드·연구 카피·수치·출처는 변경하지 않고 NAVI 증적만 최신 공개본에 동기화했다. Browser plugin 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `C-275`, `E-LOCAL-BUILD-EXPERT-VIDEO-PUBLISHING-20261008`, `E-CDP-EXPERT-VIDEO-PUBLISHING-20261008`, `E-LIVE-PUBLIC-EXPERT-VIDEO-PUBLISHING-20261008`, `E-NAVI-STATE-EXPERT-VIDEO-PUBLISHING-20261008`.

## 연구 지도 범위 라벨·공개 배포 재감리 — main 49f289cf — 2026-10-08

- 연구 지도 각 주제 아래에 `사람 대상 연구` 또는 `동물·세포 연구`를 직접 표시해, 카드 선택 전에도 연구 범위를 비교할 수 있도록 보완했다. 기존 UI contract 분류를 재사용해 모바일 표시를 단순하게 유지했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·정적 bundle·성능 예산이 통과했다. 로컬 총 자산은 1,649,596바이트, GitHub Pages base-path bundle은 1,649,680바이트였다. PR #629의 release-verify·site-quality-verify와 main workflow `37675112086`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다.
- 공개 validator는 current candidate SHA `49f289cf98a6d51a8fadae7a0e7867a46eeae52c`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다. 공개 390px Chrome CDP에서 다섯 주제의 범위 라벨, 첫 주제 선택, 상세 카드 포커스, pageWidth/scrollWidth 390/390, errors=[]를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `C-274`, `E-LOCAL-BUILD-RESEARCH-MAP-SCOPE-LABELS-20261008`, `E-UI-CONTRACT-RESEARCH-MAP-SCOPE-LABELS-20261008`, `E-CDP-RESEARCH-MAP-SCOPE-LABELS-20261008`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-SCOPE-LABELS-20261008`, `E-LIVE-PUBLIC-RESEARCH-MAP-SCOPE-LABELS-20261008`, `E-NAVI-STATE-RESEARCH-MAP-SCOPE-LABELS-20261008`.

## 연구 범위 범례 명료화 및 NAVI 동기화 — 공개 배포 확인 — main b0687e81 — 2026-10-08

- 연구 지도 범례의 주제 중심 표현을 사람 대상 연구와 동물·세포 연구의 범위 구분으로 보완하고, 카드 상단에서 대상·방법·측정 항목을 먼저 확인하도록 했다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 UI contract·typecheck·Vite production build·127개 테스트·성능 예산이 통과했다. UI PR #626과 main workflow `37670864607`, NAVI 기록 PR #627과 main workflow `37671979488`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다.
- 공개 validator는 current candidate SHA `b0687e81e4558fb33294106992bc5dcf12c51ccb`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다. 공개 390px CDP에서 범례 텍스트·ARIA 라벨·가로폭 390/390·runtime errors=[]를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-SCOPE-LEGEND-20261008`, `E-UI-CONTRACT-RESEARCH-SCOPE-LEGEND-20261008`, `E-CDP-RESEARCH-SCOPE-LEGEND-20261008`, `E-DEPLOY-PIPELINE-RESEARCH-SCOPE-LEGEND-20261008`, `E-LIVE-PUBLIC-RESEARCH-SCOPE-LEGEND-20261008`, `E-NAVI-STATE-RESEARCH-SCOPE-LEGEND-20261008`.

## 발효 활용 연구 출처 DOI 정규화 — 공개 배포 확인 — main 2857bf9 — 2026-10-08

- 발효 활용 사례의 지역형 RSC URL을 논문 내용과 라벨은 유지한 채 표준 DOI `https://doi.org/10.1039/D2FO03936B`로 정규화했다. Crossref DOI 조회는 HTTP 200과 동일한 논문 제목을 반환했다.
- 로컬 typecheck·Vite production build·127개 테스트·research copy 검사가 통과했다. PR #624와 main workflow `37668072311`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, deploy-worker는 `STATIC_ONLY` 정책으로 건너뛰었다.
- 공개 validator는 merge SHA `2857bf93c3663b0a07401d2602c97bfdbd24ee98`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다. 공개 390·1440px에서 DOI href, 가로폭 정합성, 연구 지도 선택, runtime error 0건을 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Playwright Chromium fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수와 teaser `HOLD`는 후속 조건으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-SOURCE-DOI-20261008`, `E-PLAYWRIGHT-SOURCE-DOI-20261008`, `E-DEPLOY-PIPELINE-SOURCE-DOI-20261008`, `E-LIVE-PUBLIC-SOURCE-DOI-20261008`, `E-NAVI-STATE-SOURCE-DOI-20261008`.

## 공개본 전체 흐름·직접 진입·반응형 재감리 — main a2909f0 — 2026-10-08

- 최신 공개본을 280·320·390·768·1440px에서 재감리했다. 모든 폭에서 document width가 viewport와 일치하고, 깨진 이미지·중복 id·이름 없는 조작부·페이지/콘솔 오류가 확인되지 않았다.
- `#academic`, `#research`, `#growth`, `#expert-videos`, `#reading-note`, `#final` 직접 진입은 각 장 제목을 읽기 진행 레일 아래로 정렬했다. `?view=guide&video=roEtojyk9_0#expert-videos` 공유 경로는 선택 영상·자동 재생 iframe을 복원했고, 280·320·390·768·1440px에서 두 번째 영상 선택도 동일하게 작동했다.
- 로컬 typecheck·Vite production build·127개 테스트와 UI contract·research copy·governance·ops docs·external gate·goal audit가 통과했다. 공개 validator는 candidate SHA `a2909f073dc1d41a433a0ed4c761bba4227c39d8`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다.
- 이번 회차에 재현 가능한 CRITICAL/MAJOR 기능 결함은 없어 기능 코드·연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다. Browser plugin 부재에 따른 Playwright Chromium fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수와 teaser `HOLD`는 후속 조건으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-PUBLIC-DEEP-AUDIT-20261008`, `E-PLAYWRIGHT-PUBLIC-DEEP-AUDIT-20261008`, `E-LIVE-PUBLIC-DEEP-AUDIT-20261008`, `E-NAVI-STATE-PUBLIC-DEEP-AUDIT-20261008`.

## 모바일 전문가 영상 제목 줄바꿈 — 공개 배포 확인 — main 9e447b5 — 2026-10-08

- 320px 이하 전문가 영상 카드에서 한국어 제목이 글자 중간에서 끊기는 잔여 가독성 리스크를 확인하고, 단어 단위 줄바꿈 규칙으로 보완했다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- 로컬 production build 총 자산 `1,649,451 bytes`, initial JS `311,405 bytes`, initial CSS `95,703 bytes`, `pnpm test` 127개, UI contract·research copy·정적 bundle·release manifest·성능 예산이 통과했다. PR #621 보호 검사와 main workflow `37663407212`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다.
- 공개 validator는 merge SHA `9e447b5cddbad5d419c6dd301ebebcc8ac9f9e33`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다. Playwright Chromium fallback 320·390px에서 제목 줄바꿈·영상 선택 후 autoplay iframe·page width=viewport·runtime error 0건을 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Playwright fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수와 teaser `HOLD`는 후속 조건으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-VIDEO-TITLE-WRAP-20261008`, `E-PLAYWRIGHT-MOBILE-VIDEO-TITLE-WRAP-20261008`, `E-DEPLOY-PIPELINE-MOBILE-VIDEO-TITLE-WRAP-20261008`, `E-LIVE-PUBLIC-MOBILE-VIDEO-TITLE-WRAP-20261008`, `E-NAVI-STATE-MOBILE-VIDEO-TITLE-WRAP-20261008`.

## 모바일 연구 결과 도표 타이포그래피 — 공개 배포 확인 — main dbdd396 — 2026-10-08

- 모바일 연구 결과 도표의 비교 조건·GABA 그룹·관찰 결과가 작게 보여 직관적 비교가 약해지는 리스크를 확인하고 공통 차트 타이포그래피를 보완했다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- 로컬 production build 총 자산 `1,649,406 bytes`, `pnpm test` 127개, UI contract·typecheck·정적 bundle·release manifest·성능 예산이 통과했다. PR #619의 release-verify·site-quality-verify와 main workflow `37661235646`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다.
- 공개 validator는 merge SHA `dbdd396c9dfc2ac67c9d76f03b5e4e29fb381574`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다. Playwright Chromium fallback 320·390px에서 차트 라벨 약 14px, page width=viewport, chart overflow 0건, runtime error 0건을 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Playwright fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수와 teaser `HOLD`는 후속 조건으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-CHART-TYPE-20261008`, `E-PLAYWRIGHT-MOBILE-CHART-TYPE-20261008`, `E-DEPLOY-PIPELINE-MOBILE-CHART-TYPE-20261008`, `E-LIVE-PUBLIC-MOBILE-CHART-TYPE-20261008`, `E-NAVI-STATE-MOBILE-CHART-TYPE-20261008`.

## 모바일 성장 연구 장 진입 여백 — 공개 배포 확인 — main bcb82a2 — 2026-10-08

- 351·430px 모바일에서 `09 · 성장 연구`의 시작점이 읽기 진행 레일과 가까워 보일 수 있는 잔여 리스크를 확인하고 상단 여백을 보완했다. 280·320·390px handoff와 `#growth` 직접 진입에서 장 번호·제목·연구 경로가 레일 아래에 이어졌고 document 가로폭은 viewport와 같았다.
- 로컬 production build·127개 테스트·정적 bundle·성능 예산을 통과했다. PR #613과 main workflow `37650139724`의 release-verify·worker-readiness·Pages publish·라이브 smoke·release-status가 성공했고, 공개 validator는 merge SHA `bcb82a2fd53171aa7dbb6aba3aa1e74a3dea1045`, HTTP 200, bundle hash 73개, 제품 독립 경계와 teaser `HOLD`를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수와 teaser `HOLD`는 후속 조건으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-GROWTH-ENTRY-20261008`, `E-CDP-MOBILE-GROWTH-ENTRY-20261008`, `E-DEPLOY-PIPELINE-MOBILE-GROWTH-ENTRY-20261008`, `E-LIVE-PUBLIC-MOBILE-GROWTH-ENTRY-20261008`, `E-NAVI-STATE-MOBILE-GROWTH-ENTRY-20261008`.

## 모바일 전문가 영상→출처 읽기 연결 리듬 — 공개 배포 확인 — main 2de2735 — 2026-10-07

- PR #598 보호 검사와 main workflow `37618834702`의 release-verify·Pages publish·라이브 smoke·release-status가 성공했다. 공개 manifest는 candidate SHA `2de2735fec56c36839216ce580c7298f87cf09c5`, HTTP 200, 정적 bundle hash 73개와 제품 독립 공개 경계를 확인한다.
- 공개 390px CDP에서 전문가 영상 다음에 출처 읽기 제목·연구 질문·원문 출처 패널이 자연스럽게 이어졌고 document 가로폭은 viewport와 같았다. 메뉴·연구 지도 선택·공유 fallback도 실제 상태로 변경됐다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재에 따른 Chromium fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수와 teaser `HOLD`는 후속 조건으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-DEPLOY-PIPELINE-MOBILE-CHAPTER-HANDOFF-20261007`, `E-LIVE-PUBLIC-MOBILE-CHAPTER-HANDOFF-20261007`, `E-NAVI-STATE-MOBILE-CHAPTER-HANDOFF-PUBLIC-20261007`.

## 모바일 전문가 영상→출처 읽기 연결 리듬 — working tree — 2026-10-07

- 전문가 영상 마지막 카드와 `11 · 출처 읽기` 사이의 모바일 여백이 정보 흐름을 끊어 보이는지 감리했다. 700px 이하 출처 읽기 장의 상단·하단 여백을 `72px·64px`로 보정해 다음 제목과 질문 패널이 이전 장의 handoff와 가깝게 이어지도록 했다.
- 로컬 production build·UI contract·typecheck·127개 테스트·정적 bundle·성능 예산을 통과했고, Chrome CDP fallback 390px에서 출처 읽기 제목·연구 질문·원문 출처 패널을 확인했다. document 가로폭은 viewport와 일치했으며 page/console 오류는 없었다.
- 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 결함은 없으며 공개 main 배포·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 후속 조건으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-CHAPTER-HANDOFF-20261007`, `E-CDP-MOBILE-CHAPTER-HANDOFF-20261007`, `E-NAVI-STATE-MOBILE-CHAPTER-HANDOFF-20261007`.

## 공개 연구 라우트 고도화 — 공개 배포 확인 — code 9c3f174 / final manifest 25d8ff3 — 2026-10-07

- `/research/`를 메인 안내서와 같은 네이비·틸 시각 언어로 정리하고, 제목·증거 안내·연구 카드·출처 연결을 결과 우선 읽기 흐름으로 맞췄다. `먼저 확인해 주세요`처럼 흐름을 끊던 문구와 어색한 비교 표현은 자연스러운 한국어로 교체했으며 연구 수치·출처·제품 독립 경계는 변경하지 않았다.
- UI contract·research copy·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 390px Playwright Chromium fallback에서 새 title·heading·brand·증거 안내·연구 카드·비교 문구가 표시되고 document 폭이 viewport와 일치했으며 page/console error는 0이었다.
- PR #560·#561·#562의 코드 고도화와 PR #563의 NAVI 문서 동기화가 main에 반영됐다. 코드 release `9c3f174`와 최종 manifest `25d8ff3` 모두 release-verify·Pages publish·라이브 smoke·release-status를 통과했고, 공개 manifest는 HTTP 200·73개 bundle hash·제품 독립 경계·teaser `HOLD`를 확인한다. 새 CRITICAL/MAJOR 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 후속 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-ROUTE-20261007`, `E-UI-CONTRACT-RESEARCH-ROUTE-20261007`, `E-PLAYWRIGHT-RESEARCH-ROUTE-20261007`, `E-DEPLOY-PIPELINE-RESEARCH-ROUTE-20261007`, `E-LIVE-PUBLIC-RESEARCH-ROUTE-20261007`, `E-DEPLOY-PIPELINE-NAVI-RESEARCH-FINAL-20261007`, `E-LIVE-PUBLIC-RESEARCH-ROUTE-FINAL-20261007`.

## 전문가 영상 재생 상태 문구 동기화 — 공개 배포 확인 — main 2e6ab07 — 2026-10-07

- 전문가 영상 카드의 보조 문구를 실제 상태와 연결했다. 선택 전에는 `선택 후 재생`, 선택 직후에는 `불러오는 중`, iframe이 준비되면 `재생 중`으로 표시되어, 카드와 상단 플레이어의 상태가 같은 언어로 읽힌다.
- UI contract·typecheck·127개 테스트·production build·정적 bundle·성능 예산을 통과했다. 390px Playwright Chromium fallback에서 두 번째 영상 선택 후 자동재생 iframe과 `불러오는 중 → 재생 중` 전환, 활성 카드 1개, 가로 넘침 없음, page/console error 0을 확인했다.
- PR #558과 main workflow `37565907302`의 release-verify·worker-readiness·Pages publish·라이브 smoke·release-status가 성공했다. 새 CRITICAL/MAJOR 결함은 없다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 후속 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-STATE-20261007`, `E-UI-CONTRACT-EXPERT-VIDEO-STATE-20261007`, `E-PLAYWRIGHT-EXPERT-VIDEO-STATE-20261007`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-STATE-20261007`, `E-LIVE-PUBLIC-EXPERT-VIDEO-STATE-20261007`.

## 연구 지도 선택 연결 문구 — working tree — 2026-10-07

- 연구 지도에서 대표 결과를 먼저 보여주는 초기 상태에 `주제를 고르면 해당 카드로 이어집니다`를 추가해, 지도 노드 선택과 아래 상세 카드의 관계를 한 문장으로 연결했다. 연구 수치·출처·제품 독립 경계는 변경하지 않았다.
- UI contract·typecheck·127개 테스트·Pages-style production build·정적 bundle·성능 예산을 통과했다. Playwright Chromium fallback 320·390·768·1440px에서 가로 넘침·page error·console error가 없었고, 390px 피부 주제 선택 후 활성 카드 포커스를 재현했다.
- 새 CRITICAL/MAJOR 결함은 없다. 공개 main 배포·라이브 URL·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 후속 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-CUE-20261007`, `E-UI-CONTRACT-RESEARCH-MAP-CUE-20261007`, `E-PLAYWRIGHT-RESEARCH-MAP-CUE-20261007`.

## 연구 결과 도표 읽기 레일 고정 — 공개 배포 확인 — main 23739cb — 2026-10-07

- 독립 감사 관점에서 긴 연구 카드의 좌측 설명을 스크롤할 때 우측 결과 도표가 상단에만 남아 비교 맥락이 끊길 수 있는 경로를 확인했다.
- 1101px 이상에서 결과 도표를 `position: sticky; top: 132px`로 고정하고 900px 이하에서는 `position: static`으로 복원했다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- 로컬 Pages-style build·성능 예산, PR #565 required checks, main workflow `37570786455`, 공개 validator candidate `23739cb0158a9fff1b93ff4979cd76419e6b0eb8`·HTTP 200, 공개 390·1440px Playwright Chromium fallback을 재확인했다. 새 CRITICAL/MAJOR 결함은 없다.
- Residual: teaser `HOLD`, Browser plugin 부재에 따른 Chromium fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-CHART-STICKY-20261007`, `E-PLAYWRIGHT-RESEARCH-CHART-STICKY-20261007`, `E-DEPLOY-PIPELINE-RESEARCH-CHART-STICKY-20261007`, `E-LIVE-PUBLIC-RESEARCH-CHART-STICKY-20261007`.

## 좁은 화면 읽기 조절 라벨 — 공개 배포 확인 — main d035807 — 2026-10-07

- PR #555 병합 후 main workflow `37563485033`의 release-verify·worker-readiness·Pages publish·라이브 smoke·release-status가 성공했고, deploy-worker는 정적 공개 모드의 정책대로 skip되었다.
- 최종 `validate:live-public`는 HTTP 200·candidate `d035807ad96cf9368279eb3d42a12b728f6d2881`·bundle hash 73개·claims 12개·master records 6개·share pages 6개·teaser `HOLD`·제품 독립 경계를 확인했다. `가+ 크게` 라벨 보정이 공개본에 반영됐다.
- 새 CRITICAL/MAJOR 결함은 없다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-DEPLOY-PIPELINE-HEADER-READING-LABEL-20261007`, `E-LIVE-PUBLIC-HEADER-READING-LABEL-20261007`.

## NAVI 좁은 화면 읽기 조절 라벨 보정 — working tree — 2026-10-07

- 320px 이하에서 `가+ 글자`가 축약되어 행동 의미가 약해지는 잔여 가독성 리스크를 확인하고, 모바일 축약 라벨을 `가+ 크게`로 보정했다. 접근 가능한 전체 라벨 `글자 크게 보기`, 큰 글자 모드, 연구 카피·수치·출처·제품 독립 경계는 유지했다.
- UI contract·typecheck·127개 테스트·Pages-style production build·정적 bundle·release manifest·성능 예산을 통과했다. 초기 JS 311,199 bytes·초기 CSS 95,703 bytes·전체 자산 1,647,283 bytes다. Playwright Chromium fallback 320·390·768·1440px에서 가로 넘침·page error·console error가 없었고, 메뉴 포커스와 선택 영상 autoplay 흐름을 재현했다.
- 새 CRITICAL/MAJOR 결함은 없다. 공개 main 배포·라이브 URL·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 후속 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-HEADER-READING-LABEL-20261007`, `E-UI-CONTRACT-HEADER-READING-LABEL-20261007`, `E-PLAYWRIGHT-HEADER-READING-LABEL-20261007`.

## NAVI 재점검 문서 최종 배포 확인 — main 6ffbeb0 — 2026-10-07

- PR #553 병합 후 main workflow `37561870841`의 release-verify·worker-readiness·Pages publish·라이브 smoke·release-status가 모두 성공했다. deploy-worker는 정적 공개 모드의 정책대로 skip되었다.
- 최종 `validate:live-public`는 HTTP 200·candidate `6ffbeb0295fa36ead390ff3fafa480df2a670d7d`·bundle hash 73개·claims 12개·master records 6개·share pages 6개·teaser `HOLD`·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. reachable history scanner의 기존 13개 경로 annotation은 매칭값을 노출하지 않는 이력 알림이며 현재 공개 번들 데이터와 별개다. 실기기·고령 사용자·독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-DEPLOY-PIPELINE-NAVI-RECHECK-20261007`, `E-LIVE-PUBLIC-NAVI-RECHECK-FINAL-20261007`.

## NAVI 자동 공개본 재점검 — main 1334348 — 2026-10-07

- 최신 main `13343484e0850ac5b38c81add64a2625aa8b17a2`를 기준으로 로컬 typecheck·UI contract·127개 테스트·production build·정적 bundle·release manifest·성능 예산을 재실행했다. Pages-style 총 자산은 1,647,283 bytes로 1,650,000 bytes 예산 안이며 release manifest는 11개 route·73개 파일을 확인했다.
- `validate:live-public`는 HTTP 200·candidate SHA 일치·bundle hash 73개·claims 12개·master records 6개·share pages 6개·teaser `HOLD`·제품 독립 경계를 확인했다. Playwright Chromium fallback 공개 재현에서 390px·1440px의 히어로·연구·전문가 영상·공유 장을 확인하고 피부 연구 선택 갱신도 재현했다. Browser 플러그인은 현재 사용할 수 없어 fallback을 사용했다.
- 새 CRITICAL/MAJOR 결함은 없다. Cloudflare Worker 비밀값 미설정은 정적 GitHub Pages 공개와 별개의 운영 게이트로 `WAITING` 유지한다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-NAVI-PUBLIC-RECHECK-20261007`, `E-PLAYWRIGHT-PUBLIC-NAVI-RECHECK-20261007`, `E-LIVE-PUBLIC-NAVI-RECHECK-20261007`.

## 06·연구 대상 연결 라인·공개 배포 후 재감사 — main af936c7 — 2026-10-07

- PR #551과 main workflow `37560044899`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했다. 공개 validator는 HTTP 200·candidate `af936c72c3b6140488b27d6a390809201ec99d25`·bundle hash 73개·claims 12개·master records 6개·share pages 6개·teaser `HOLD`·제품 독립 경계를 확인했다.
- 공개 CSS `PublicGabaGuide-Jy_rgF1F.css`와 JS `PublicGabaGuide-CHEQK8jI.js`에 범위 라인이 반영됐고, 라이브 390px·1440px에서 대표 결과·연구 대상이 읽혔다. 피부 주제 선택 시 범위 라벨과 활성 카드가 함께 갱신되며 가로 넘침·page error·console error가 없었다.
- 새 CRITICAL/MAJOR 결함은 없다. teaser `HOLD`, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-DEPLOY-PIPELINE-RESEARCH-CUE-SCOPE-20261008`, `E-LIVE-PUBLIC-RESEARCH-CUE-SCOPE-20261008`.

## 06·연구 대상 연결 라인·로컬 재감사 — working tree — 2026-10-07

- 연구 지도 아래 대표 결과를 읽은 직후 연구 대상이 무엇인지 즉시 연결되지 않는 잔여 정보 전달 리스크를 확인했다. 기존 연구 카드의 검증된 범위 라벨을 결과 요약 아래에 한 줄로 재사용해 `대표 결과 → 관찰 결과 → 대상·연구 범위` 계층을 만들었다.
- UI contract·typecheck·127개 테스트·Pages-style production build·정적 bundle·release manifest·성능 예산을 통과했다. Playwright Chromium fallback 390px·1440px에서 결과·범위 라인이 읽혔고, 피부 주제 선택 시 범위 라벨과 활성 카드가 함께 갱신되며 가로 넘침·page error·console error가 없었다.
- 새 CRITICAL/MAJOR 결함은 없다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았으며 공개 main 배포·라이브 URL·Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 후속 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-CUE-SCOPE-20261008`, `E-UI-CONTRACT-RESEARCH-CUE-SCOPE-20261008`, `E-PLAYWRIGHT-RESEARCH-CUE-SCOPE-20261008`, `E-STATIC-BUNDLE-RESEARCH-CUE-SCOPE-20261008`.

## 06·연구 결과 전환 문구 계층·공개 배포 후 재감사 — main e997683 — 2026-10-07

- PR #549를 최신 main 기준으로 병합하고 main workflow `37557233295`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status 성공을 확인했다. 공개 validator는 candidate `e99768344c18286b8edf8d46e4c6a08f9a6b3f42`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, 제품 독립 경계를 확인했다.
- 공개 CSS에서 `max-width:74ch` 계층 스타일, 공개 JS에서 `대표 결과부터 읽기`와 `guide-research-read-order`를 확인했다. 라이브 Playwright Chromium fallback 390px·1440px에서도 두 줄 전환 밴드, viewport와 동일한 scrollWidth, page errors 0·console errors 0을 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-DEPLOY-PIPELINE-RESEARCH-CUE-HIERARCHY-20261008`, `E-LIVE-PUBLIC-RESEARCH-CUE-HIERARCHY-20261008`.

## 06·연구 결과 전환 문구 계층·로컬 재감사 — working tree — 2026-10-07

- 연구 지도 아래 전환 밴드에서 데스크톱 문구가 한 줄로 붙어 결과를 빠르게 구분하기 어려운 잔여 퍼블리싱 리스크를 확인했다. 기존 문구·도표·출처는 유지하고 `대표 결과부터 읽기`와 실제 관찰 결과를 별도 줄로 분리해 연구 카드로 이어지는 시선을 정리했다.
- `pnpm run validate:ui-contract`, `pnpm run typecheck`, 127개 테스트, production build, 정적 bundle·release manifest·성능 예산이 통과했다. 초기 JS 311,199 bytes·CSS 95,703 bytes·총 자산 1,649,473 bytes다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용해 390px·1440px을 확인했다. 전환 밴드 두 줄 계층, viewport와 동일한 scrollWidth, page errors 0·console errors 0을 확인했다. 새 CRITICAL/MAJOR 결함은 없으며 공개 main 배포·라이브 URL은 후속 게이트다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-CUE-HIERARCHY-20261008`, `E-UI-CONTRACT-RESEARCH-CUE-HIERARCHY-20261008`, `E-PLAYWRIGHT-RESEARCH-CUE-HIERARCHY-20261008`, `E-STATIC-BUNDLE-RESEARCH-CUE-HIERARCHY-20261008`.

## 06·연구의 확장 결과 전환 밴드·공개 배포 후 재감사 — main 8538063 — 2026-10-07

- PR #546 병합 후 main workflow `37555128673`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했다. 공개 validator는 HTTP 200·candidate `8538063bd2cfd6b15eb8cf67f2c6944e87e4891b`·bundle hash 73개·claims 12개·master records 6개·share pages 6개·teaser `HOLD`·제품 독립 경계를 확인했다.
- 공개 `PublicGabaGuide` CSS에서 연구 결과 전환 밴드 선택자를 확인하고, 공개 JS에서 `대표 결과부터 읽기`와 `guide-research-read-order`를 재확인했다. 별도 카피·수치·출처·제품 데이터는 추가되지 않았다.
- 새 CRITICAL/MAJOR 결함은 없다. 이번 라이브 확인은 정적 번들·validator 기반이며 신규 브라우저 시각 캡처와 Safari/iOS/Android·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-DEPLOY-PIPELINE-RESEARCH-CUE-BAND-20261008`, `E-LIVE-PUBLIC-RESEARCH-CUE-BAND-20261008`.

## 06·연구의 확장 결과 전환 밴드·로컬 재감사 — working tree — 2026-10-07

- 연구 지도 아래 대표 결과가 시작되는 기존 전환 영역이 얇은 선처럼 보여 지도·결과·다음 연구 카드의 관계가 약하게 보이는 잔여 퍼블리싱 리스크를 보정했다. 새 카피·수치·출처·데이터를 추가하지 않고 연한 배경·테두리·강조 색만 적용해 하나의 증거 전환 밴드로 읽히게 했다.
- `pnpm run validate:ui-contract`, `pnpm run typecheck`, 127개 테스트, production build, 정적 bundle·release manifest·성능 예산을 통과했다. 초기 JS 311,199 bytes·CSS 95,703 bytes·총 자산 1,649,433 bytes다.
- 새 CRITICAL/MAJOR 결함은 없다. 이 기록은 working tree 검증이며 공개 main 배포·라이브 URL·신규 브라우저 시각 캡처를 주장하지 않는다. 연구 카피·수치·출처·제품 독립 공개 경계는 유지했다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-CUE-BAND-20261008`, `E-UI-CONTRACT-RESEARCH-CUE-BAND-20261008`, `E-STATIC-BUNDLE-RESEARCH-CUE-BAND-20261008`.

## 06·연구의 확장 대표 결과 선행 노출·공개 배포 후 재감사 — main 5238808 — 2026-10-07

- PR #544 병합 후 main workflow `37553497930`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했다. 공개 validator는 HTTP 200·candidate `523880887ece2a91916d66db57c8265de702cd0a`·bundle hash 73개·claims 12개·master records 6개·share pages 6개·teaser `HOLD`·제품 독립 경계를 확인했다.
- 공개 `PublicGabaGuide` 번들에서 `대표 결과부터 읽기`와 `guide-research-read-order`를 확인해 연구 지도 아래 대표 결과가 먼저 읽히고 연구 카드 흐름으로 이어지는 보정이 반영됐음을 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. 이번 라이브 확인은 정적 번들·validator 기반이며 신규 브라우저 시각 캡처와 Safari/iOS/Android·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-PREVIEW-20261008`, `E-DEPLOY-PIPELINE-RESEARCH-PREVIEW-20261008`, `E-LIVE-PUBLIC-RESEARCH-PREVIEW-20261008`.

## 06·연구의 확장 대표 결과 선행 노출·로컬 재감사 — working tree — 2026-10-07

- 06장 연구 지도 아래의 기존 전환 영역에서 인지 대표 결과를 즉시 보여주고, 별도 링크 없이 바로 이어지는 읽기 순서·연구 카드 흐름으로 보강했다. 첫 원격 후보가 정적 자산 예산을 481 bytes 초과해 별도 CTA를 줄이고 같은 정보 구조 안에서 해결했다.
- `pnpm run validate:ui-contract`, `pnpm run typecheck`, 127개 테스트, Pages-style production build, 정적 bundle·release manifest·성능 예산을 통과했다. 초기 JS 311,269 bytes·CSS 95,703 bytes·총 자산 1,649,610 bytes다.
- 새 CRITICAL/MAJOR 결함은 없다. 이 기록은 working tree 검증이며 공개 main 배포·라이브 URL·신규 브라우저 시각 캡처를 주장하지 않는다. 연구 카피·수치·출처·제품 독립 공개 경계는 유지했다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-PREVIEW-20261008`, `E-UI-CONTRACT-RESEARCH-PREVIEW-20261008`, `E-STATIC-BUNDLE-RESEARCH-PREVIEW-20261008`.

## 공유 API 회복 보정·공개 배포 재감사 — main 93fa62f — 2026-10-07

- 첫 공개 후보 `45cb2ce`는 Pages 성능 예산을 86 bytes 초과해 release-verify에서 중단됐다. 기능 의미를 바꾸지 않고 외부 try/catch를 줄인 `47f1cf8`로 재작업해 Pages-style 번들 1,649,664 bytes와 원격 release-verify를 통과시켰다.
- PR #541의 release-verify·site-quality-verify, main workflow `37549529638`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. 공개 candidate `93fa62f`의 번들에서 `AbortError` 분기와 링크 복사 fallback을 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. 실제 Web Share 실패를 일으키는 브라우저·모바일 실기기 검증은 남아 있으므로 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-PAGES-SHARE-RECOVERY-20261007`, `E-DEPLOY-PIPELINE-SHARE-RECOVERY-20261007`, `E-LIVE-PUBLIC-SHARE-RECOVERY-20261007`.

## 공유 API 실패 회복·정적 품질 재감사 — working tree — 2026-10-07

- 공유 흐름에서 `navigator.share()`의 모든 예외를 사용자 취소로 표시하면 Safari·Android·임베디드 브라우저의 정책 또는 payload 실패 뒤 공유가 끝난 것처럼 보일 수 있는 잔여 UX 리스크를 확인했다.
- `AbortError`만 취소로 처리하고 그 외 실패는 링크 복사 fallback으로 회복하도록 보정했다. UI contract가 이 분기와 `writeClipboardText(shareHref)` 호출을 회귀 점검하며, typecheck·127개 테스트·production build·정적 번들·성능 예산도 통과했다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. 공개 main 배포 후 실제 Web Share 지원 브라우저에서 공유 실패·복사 회복을 재검증해야 하며, 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-SHARE-RECOVERY-20261007`, `E-UI-CONTRACT-SHARE-RECOVERY-20261007`.

## 공개 surface 자동 재점검·NAVI 동기화 — main 1083e3f — 2026-10-07

- 현재 공개 URL을 320·390·768·1440px에서 다시 렌더링해 document width 정합성, 중복 ID, 빈 조작 요소, runtime/console errors를 점검했다. 네 폭 모두 가로 넘침·중복 ID·빈 조작 요소·콘솔 오류가 없었다.
- 390px 메뉴에서 `aria-expanded=false → true → false`, ESC 닫힘, 메뉴 토글 포커스 복귀를 확인했다. `#expert-videos` 직접 진입은 390px heading top 131.67px·읽기 레일 bottom 105px, 1440px heading top 150.67px·읽기 레일 bottom 116px로 제목이 고정 UI 아래에 배치된다.
- 영상 썸네일의 빈 alt 9개는 버튼에 영상 제목·채널·상태가 접근성 이름으로 제공되고 이미지가 장식용 `aria-hidden`인 구조로 판정했다. 제품 독립 공개 경계와 라이브 validator 정합성은 유지됐다. 새 CRITICAL/MAJOR 결함은 없다.
- 외부 Safari/iOS/Android·실제 고령 사용자 독해성·독립 과학·규제 감수는 여전히 미완료다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-PUBLIC-SURFACE-AUDIT-20261007`, `E-ACCESSIBILITY-PUBLIC-SURFACE-AUDIT-20261007`, `E-DEEPLINK-PUBLIC-SURFACE-AUDIT-20261007`, `E-LIVE-PUBLIC-SURFACE-AUDIT-20261007`.

## 인쇄·PDF 공유 퍼블리싱 배포 완료 — main ab096d1 — 2026-10-07

- PR #527을 병합하고 main workflow `37532761509`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했다. 공개 validator는 HTTP 200, merge candidate `ab096d1`, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, `smartStoreOnly=true`, `removed750=true`, provenance `matched`를 확인했다.
- 공개 Chrome print media 390·1440px에서 실제 top-level `print.css`가 적용되고 document width가 viewport와 같으며 헤더·진행바·영상 보드·복구 조작부는 숨겨지고 본문 섹션 13개가 렌더된다. 제품 독립 공개 경계는 유지됐다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. 원격 Chrome fallback은 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으므로 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-PRINT-PUBLISHING-20261007`, `E-UI-CONTRACT-PRINT-PUBLISHING-20261007`, `E-CDP-PRINT-PUBLISHING-20261007`, `E-DEPLOY-PIPELINE-PRINT-PUBLISHING-20261007`, `E-LIVE-PUBLIC-PRINT-PUBLISHING-20261007`.

## 인쇄·PDF 공유 퍼블리싱 레이어 — working tree — 2026-10-07

- 사업자가 공개 안내서를 인쇄하거나 PDF로 공유할 때 화면 전용 헤더·진행바·영상·복구 조작부가 문서 흐름을 방해할 수 있는 잔여 퍼블리싱 리스크를 확인했다. v163 인쇄 미디어 규칙으로 A4 여백, 본문 섹션 리듬, 카드 분할 방지, 연구 출처 URL 표시를 추가했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·정적 번들·성능 예산을 통과했다. 초기 JS 311,199 bytes·CSS 95,703 bytes·총 자산 1,649,991 bytes·최대 자산 311,199 bytes로 예산 안에 있다. 로컬 production preview의 390·1440px print media에서 document width는 viewport와 같고 헤더·진행바·영상 보드·복구 조작부는 `display:none`이며 본문 섹션 13개가 렌더된다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. 인쇄 미리보기는 Chrome fallback으로 확인했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 게이트로 유지한다. PR·main 배포·공개 URL 재검증 전 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-PRINT-PUBLISHING-20261007`, `E-UI-CONTRACT-PRINT-PUBLISHING-20261007`, `E-CDP-PRINT-PUBLISHING-20261007`, `E-DEPLOY-PIPELINE-PRINT-PUBLISHING-20261007`, `E-LIVE-PUBLIC-PRINT-PUBLISHING-20261007`.

## 큰 글자 읽기 모드·모바일 공개 재점검 — main 829c5fb — 2026-10-07

- 독립 감사 관점에서 큰 글자 모드가 실제 본문을 잘라내거나 320px 이하 화면의 읽기 폭을 밀어내는 실패 모드를 재점검했다. 320·390·768px에서 회복 14단계, 연구 지도, 전문가 영상, 마지막 공유 화면을 시각적으로 확인했고 본문 문장과 주요 조작 요소는 화면 안에 유지됐다.
- document width는 각 viewport와 같고 runtime·console errors는 0이었다. 자동 DOM overflow 목록에 잡힌 항목은 원형·배경 이미지용 의도적 장식 영역과 `sr-only` 접근성 텍스트로, 화면에 보이는 한국어 본문 잘림으로 이어지지 않았다.
- 로컬 UI contract·typecheck·127개 테스트·production build·정적 번들·성능 예산을 통과했다. 초기 JS 311,199 bytes·CSS 95,703 bytes·총 자산 1,649,381 bytes·최대 자산 311,199 bytes가 예산 안에 있다. 이번 재점검에서 가시적 코드 결함은 없어 공개 UI는 변경하지 않았다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. Chrome fallback은 Safari/iOS/Android 실기기와 실제 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으므로 외부 게이트를 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-LARGE-TEXT-AUDIT-20261007`, `E-UI-CONTRACT-LARGE-TEXT-AUDIT-20261007`, `E-CDP-LARGE-TEXT-AUDIT-20261007`, `E-LIVE-PUBLIC-LARGE-TEXT-AUDIT-20261007`.

## 전문가 영상 필터 카운트 가독성 보정·공개 배포 — b028897 — 2026-10-07

- 독립 감사 관점에서 전문가 영상 필터가 숫자만 보여 모바일·데스크톱에서 자료량의 단위를 즉시 파악하기 어려운 잔여 가독성 리스크를 확인했다. 화면상 카운트를 `전체 9편`·`수면 4편`처럼 영상 단위와 함께 표시하고, 접근성 이름의 `개 영상` 의미는 유지했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했고, 초기 JS 311,199 bytes·CSS 95,703 bytes·총 자산 1,649,381 bytes·최대 자산 311,199 bytes가 예산 안에 있다. PR #524와 main workflow `37526178585`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했다.
- 공개 Chrome CDP fallback에서 390px·1440px의 `편` 단위 카운트, 필터 선택 후 feature focus와 YouTube iframe 즉시 재생, 가로폭 안정성·runtime/console errors 0을 확인했다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. Chrome fallback은 Safari/iOS/Android 실기기와 실제 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으므로 외부 게이트를 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-VIDEO-FILTER-COUNT-20261007`, `E-UI-CONTRACT-VIDEO-FILTER-COUNT-20261007`, `E-CDP-VIDEO-FILTER-COUNT-20261007`, `E-DEPLOY-PIPELINE-VIDEO-FILTER-COUNT-20261007`, `E-LIVE-PUBLIC-VIDEO-FILTER-COUNT-20261007`.

## 모바일 회복 브리지 진입 리듬 보정·공개 배포 — 9731c29 — 2026-10-07

- 독립 감사 관점에서 모바일 회복 브리지의 제목 앞 공백이 다른 장보다 커서 읽기 흐름이 끊기는 잔여 가독성 리스크를 확인했다. 모바일 장 진입 여백을 공통 58px 규칙으로 통합해 `GABA를 모르면 노화는 가속됩니다.` 제목이 연구·전문가 장과 같은 리듬으로 시작하도록 보정했다.
- UI contract와 Pages 동등 번들·정적 번들·성능 예산을 통과했고, Pages 동등 총 자산은 1,649,961 bytes로 예산 안이다. PR #522의 release-verify·site-quality-verify와 main workflow `37523587127`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했다.
- 공개 Chrome CDP fallback에서 390px 회복 제목 top 270, document width 390, 읽기 레일 top 70·height 35, 14단계 흐름과 회복 일러스트를 확인했고 1440px 히어로·연구 지도도 시각 점검했다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. Chrome fallback은 Safari/iOS/Android 실기기와 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으므로 외부 게이트를 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RECOVERY-BRIDGE-RHYTHM-20261007`, `E-UI-CONTRACT-RECOVERY-BRIDGE-RHYTHM-20261007`, `E-CDP-RECOVERY-BRIDGE-RHYTHM-20261007`, `E-DEPLOY-PIPELINE-RECOVERY-BRIDGE-RHYTHM-20261007`, `E-LIVE-PUBLIC-RECOVERY-BRIDGE-RHYTHM-20261007`.

## 초협폭 연구 결과 도표 가독성 보정·공개 배포 — ad52246 — 2026-10-07

- 독립 감사 관점에서 280px 이하 초소형 모바일에서 비교 조건과 GABA 조건이 좁은 2열 카드 안에 갇혀 `더 많이 줄었습니다`·`덜 줄었습니다`가 세로로 끊기거나 방향 신호와 한눈에 비교되지 않는 잔여 가독성 리스크를 확인했다. v162에서 조건 레인을 세로로 쌓고 각 결과 문구가 카드 폭 전체를 사용하도록 보정했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했으며, 로컬 총 자산은 1,649,463 bytes로 예산 안이다. PR #520의 최종 release-verify·site-quality-verify와 main workflow `37519850528`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다.
- 공개 Chrome CDP fallback에서 280·320·390px의 차트 조건 카드·결과 문구·방향 신호를 확인했다. document width는 각 viewport와 같고 phrase/lane DOM overflow는 모두 false였다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. Browser fallback은 실제 Safari/iOS/Android 실기기와 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으므로 외부 게이트를 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-ULTRA-NARROW-CHART-20261007`, `E-UI-CONTRACT-ULTRA-NARROW-CHART-20261007`, `E-CDP-ULTRA-NARROW-CHART-20261007`, `E-DEPLOY-PIPELINE-ULTRA-NARROW-CHART-20261007`, `E-LIVE-PUBLIC-ULTRA-NARROW-CHART-20261007`.

## 섹션 직접 진입 앵커 가독성 보정·공개 배포 — 075b919 — 2026-10-06

- 독립 감사 관점에서 메뉴·공유 링크로 연구 지도에 직접 진입할 때 고정 헤더와 읽기 진행바가 제목을 가릴 수 있는 잔여 리스크를 재점검했다. v160에서 데스크톱·태블릿 앵커 여백을 126px, 모바일을 116px로 보정해 제목과 진행바 사이에 읽기 공간을 확보했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산을 통과했고, 공개 390·768·1440px에서 연구 지도 직접 진입 후 제목 비겹침·가로폭·오류 없는 렌더링을 확인했다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- PR #518과 main workflow `37517088317`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status 및 site-quality 검사가 성공했다. 새 CRITICAL/MAJOR 코드 결함은 없다.
- Browser 플러그인이 없어 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 게이트로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-ANCHOR-READABILITY-20261007`, `E-UI-CONTRACT-ANCHOR-READABILITY-20261007`, `E-CDP-ANCHOR-READABILITY-20261007`, `E-DEPLOY-PIPELINE-ANCHOR-READABILITY-20261007`, `E-LIVE-PUBLIC-ANCHOR-READABILITY-20261007`.

## 모바일 연구 비교 도표 겹침 보정·공개 배포 — 443e85b — 2026-10-06

- 독립 감사 관점에서 390px 모바일 연구 결과 도표를 재점검했다. 비교 조건과 GABA 조건은 나란히 유지하면서 각 카드 안의 결과 문구와 변화 방향 표시를 세로로 분리해, `더 많이 줄었습니다`·`덜 줄었습니다`와 방향 신호가 겹치지 않는다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산을 통과했고, 공개 390·768·1440px에서 연구 결과 도표의 조건 레인·읽기 레일·가로폭을 확인했다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- PR #516과 main workflow `37514564656`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status 및 site-quality 검사가 성공했다. 새 CRITICAL/MAJOR 코드 결함은 없다.
- Browser 플러그인이 없어 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 게이트로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-CHART-LANE-20261007`, `E-UI-CONTRACT-MOBILE-CHART-LANE-20261007`, `E-CDP-MOBILE-CHART-LANE-20261007`, `E-DEPLOY-PIPELINE-MOBILE-CHART-LANE-20261007`, `E-LIVE-PUBLIC-MOBILE-CHART-LANE-20261007`.

## 수면·회복 도입 리듬 인포그래픽·공개 배포 — 2026-10-06 — f785d7d

- 독립 감사 관점에서 첫 장면이 긴 설명문을 먼저 해석하지 않아도 낮의 활동, 밤의 수면, 다음 날 회복의 순서를 즉시 읽게 되는지 확인했다. 모바일과 데스크톱 모두 3단계 아이콘·연결선·기존 3개 카드가 하나의 시퀀스로 이어진다.
- 수면 카피·참고 도서·출처·제품 독립 공개 경계는 변경되지 않았고, 수면 편집 이미지 재압축으로 정적 자산 예산을 유지했다. UI 계약·배포 workflow·라이브 validator가 공개 SHA와 일치하며 새 CRITICAL/MAJOR 결함은 없다.
- 공개 Chrome CDP fallback에서 390·1440px의 도입부·카드·가로폭·runtime/console/http errors 0을 확인했다. 실제 고령 사용자 이해도, Safari/iOS/Android 실기기, 독립 과학·규제 감수는 Chromium 검증으로 대체하지 않는다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-OPENING-RHYTHM-VISUAL-20261006`, `E-UI-CONTRACT-OPENING-RHYTHM-VISUAL-20261006`, `E-CDP-OPENING-RHYTHM-VISUAL-20261006`, `E-DEPLOY-PIPELINE-OPENING-RHYTHM-VISUAL-20261006`, `E-LIVE-PUBLIC-OPENING-RHYTHM-VISUAL-20261006`.

## Current Release Recheck — e2ef8f0 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `e2ef8f06b415c7747d991ab1575be0721c456b1e`·72개 bundle hash·12개 공개 claim·6개 master record·6개 share page·provenance `matched`를 확인했다.
- AC-003/AC-004 연구 비교 도표 가독성·반응형: PASS. 공개 Chrome CDP fallback 390x844에서 GABA 결과 요약 띠와 조건별 컴팩트 레인이 표시되고, 1440x900에서는 기존 2열 학술 도표가 유지된다. 콘텐츠 폭은 각각 390·1425px이며 runtime/console/http errors는 0이다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #482의 release-verify·site-quality-verify, main workflow `37467358386`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다. Worker는 STATIC_ONLY로 건너뛰었다.
- AC-006 연구 내용·출처·제품 독립 경계: PASS. 이번 변경은 도표의 모바일 레이아웃과 응용 사례 이미지 압축만 보정했으며 연구 내용·수치·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀과 잔여 게이트: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 게이트로 유지한다. Final Status는 `NOT_READY`, NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-RESEARCH-COMPARISON-SCAN-20261006`, `E-UI-CONTRACT-RESEARCH-COMPARISON-SCAN-20261006`, `E-CDP-RESEARCH-COMPARISON-SCAN-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-COMPARISON-SCAN-20261006`, `E-LIVE-PUBLIC-RESEARCH-COMPARISON-SCAN-20261006`.

## 연구 지도 전용 편집 비주얼·공개 배포 — 2026-10-06 — 813fd3a

- 독립 감사 관점에서 연구 지도 섹션의 이미지 서사가 첫 화면과 반복되지 않고, `하나의 신호가 넓은 연구 지도가 되었습니다`라는 전환을 모바일·데스크톱에서 즉시 읽을 수 있는지 확인했다. 전용 물 흐름 이미지, 좌측 텍스트 대비, 5개 학술 카드가 안정적으로 연결된다.
- 연구 카피·수치·출처·제품 독립 공개 경계는 변경되지 않았고, 새 비주얼과 기존 이미지 압축으로 정적 자산 예산을 유지했다. UI 계약·배포 workflow·라이브 validator가 공개 SHA와 일치하며 새 CRITICAL/MAJOR 결함은 없다.
- 공개 Chrome CDP fallback에서 390·1440px의 band 폭·높이·5개 카드·page/console errors 0을 확인했다. 실제 고령 사용자 이해도, Safari/iOS/Android 실기기, 독립 과학·규제 감수는 Chromium 검증으로 대체하지 않는다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-UI-CONTRACT-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-CDP-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-DEPLOY-PIPELINE-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-LIVE-PUBLIC-ACADEMIC-EDITORIAL-VISUAL-20261006`.

## 수면 비교 도표 문구·공개 배포 — 9e7b9321 — 2026-10-06

- 수면 비교 도표의 제목을 `수면 연구, 두 조건은 어떻게 달랐을까요?`로, 보조 라벨을 `두 조건 비교`로 바꾸어 일반 독자가 비교 기준을 먼저 이해하게 했다. 연구 수치·결과·해석·출처는 변경하지 않았다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산과 공개 390·1440px Chromium fallback에서 새 제목·라벨·`측정 항목`·가로폭·page/console errors 0을 확인했고 캡처는 `view_image`로 검토했다.
- PR #432가 main `9e7b93210afe85fc39616ed6575887692dd95254`로 병합되었고 workflow `37416957354`의 release-verify·Pages·라이브 smoke·release-status와 site-quality workflow `37416820136`이 성공했다. 공개 validator는 HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 경계를 확인했다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-SLEEP-COPY-20261006`, `E-UI-CONTRACT-SLEEP-COPY-20261006`, `E-PLAYWRIGHT-SLEEP-COPY-20261006`, `E-DEPLOY-PIPELINE-SLEEP-COPY-20261006`, `E-LIVE-PUBLIC-SLEEP-COPY-20261006`.

## 연구 결과 도표 축 의미·공개 배포 — e0bfacdf — 2026-10-06

- 비교 도표의 첫 열을 `변화 방향`에서 `측정 항목`으로 바꾸어 `뇌파 변화`·`활력 점수`가 무엇을 가리키는지 바로 읽히게 했고, 비교 안내의 `↔` 글리프를 좌우 비교 아이콘으로 통일했다. 연구 결과·수치·해석은 변경하지 않았다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산과 로컬 390·1440px, 공개 390·1440px Chromium fallback에서 축 라벨·아이콘·가로폭·page/console errors 0을 확인했고 캡처는 `view_image`로 검토했다.
- PR #430이 main `e0bfacdfaee78eea287e32bef32e968995a87423`로 병합되었고 workflow `37415721382`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 공개 validator는 HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 경계를 확인했다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-CHART-AXIS-20261006`, `E-UI-CONTRACT-CHART-AXIS-20261006`, `E-PLAYWRIGHT-CHART-AXIS-20261006`, `E-DEPLOY-PIPELINE-CHART-AXIS-20261006`, `E-LIVE-PUBLIC-CHART-AXIS-20261006`.

## 연구 결과 도표 의미 보정·공개 배포 — a3ccd609 — 2026-10-06

- 비교 도표 상단을 `막대는 두 조건의 변화폭을 비교해 보여줍니다`로 바꾸고, 하단에 `막대는 변화 방향과 상대적 차이를 보여주는 도식이며 실제 측정값은 아닙니다`를 추가했다. 연구 결과·수치·해석은 변경하지 않았다.
- 로컬 Chromium fallback 280·390·768·1440px과 공개 390·1440px에서 도표 안내 문구·범례·조건 카드·가로폭을 확인했고 page/console errors는 0이었다. 캡처는 `view_image`로 검토했다.
- PR #428이 main `a3ccd6091146f0a9a76e60597e1b39b9211f2ddd`로 병합되었고 workflow `37414574920`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 공개 validator는 HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 경계를 확인했다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-CHART-SEMANTICS-20261006`, `E-UI-CONTRACT-CHART-SEMANTICS-20261006`, `E-PLAYWRIGHT-CHART-SEMANTICS-20261006`, `E-DEPLOY-PIPELINE-CHART-SEMANTICS-20261006`, `E-LIVE-PUBLIC-CHART-SEMANTICS-20261006`.

## 모바일 히어로 문장 리듬 보정·공개 배포 — 68e2c8b — 2026-10-06

- 모바일 히어로에서 `GABA에서`와 `읽습니다`를 강제로 나누던 줄바꿈을 제거해 280·320px에서는 폭에 맞는 자연스러운 두 줄, 390px에서는 한 줄로 읽히게 보정했다. 카피·의미·제품 독립 경계는 변경하지 않았다.
- 로컬·공개 Playwright Chromium fallback 280·320·390·1440px에서 line rect, 다음 수면·회복 장면, document scrollWidth와 page/console errors 0을 확인하고 캡처를 `view_image`로 검토했다. Browser/IAB 도구가 없어 Chromium fallback을 사용했다.
- PR #426이 main `68e2c8b5cbab13f4438c975b1ce118b2cec8308a`로 병합되었고 workflow `37413417733`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 공개 validator는 HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 경계를 확인했다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-HERO-LINE-20261006`, `E-UI-CONTRACT-HERO-LINE-20261006`, `E-PLAYWRIGHT-HERO-LINE-20261006`, `E-DEPLOY-PIPELINE-HERO-LINE-20261006`, `E-LIVE-PUBLIC-HERO-LINE-20261006`.

## 최종 라이브 SHA 정합성 재확인 — 449fb2d — 2026-10-06

- NAVI 문서 동기화 이후 main SHA `449fb2d23285f1b971667aea698b80374e14d9e2`가 실제 GitHub Pages 공개본에 반영됐는지 재확인했다. 공개 validator는 HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page·teaser `HOLD`·내부 운영 snapshot 제외·Smart Store only·750 제거·provenance 일치를 확인했다.
- Playwright Chromium fallback 320·390·768·1440px에서 전문가 영상 선택 후 선택 영상·`autoplay=1` iframe·feature 포커스·viewport와 동일한 document scrollWidth·page/console errors 0을 재확인했다.
- 배포 workflow의 release-verify·Pages·라이브 smoke·release-status가 성공했고, static-only 조건으로 Worker 배포만 건너뛰었다. 새 CRITICAL/MAJOR 코드 결함은 없다.
- 외부 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 여전히 외부 검증이다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-DEPLOY-PIPELINE-FINAL-RECHECK-20261006`, `E-PLAYWRIGHT-VIDEO-FINAL-RECHECK-20261006`, `E-LIVE-PUBLIC-FINAL-RECHECK-20261006`.

## 공개 배포 품질 자동 재점검·NAVI 동기화 — 2515212 — 2026-10-06

- 최신 main 공개본을 기준으로 UI 계약·목표·계획·외부 게이트·공개 데이터·거버넌스·운영 문서·typecheck·127개 테스트·production build를 다시 실행했고 모두 통과했다. 정적 번들은 71개 파일이며 초기 JS 311199, 초기 CSS 95703, 전체 자산 1641335로 성능 예산 안에 있다.
- Playwright Chromium fallback으로 320·390·768·1440px 전문가 영상 선택 흐름을 재확인했다. 카드 선택 뒤 선택 영상 제목·feature 포커스·`autoplay=1` iframe이 연결되고, 네 화면 폭에서 document scrollWidth가 viewport와 같으며 page/console errors가 0이었다.
- 공개 validator는 HTTP 200·STATIC·candidate `2515212345f30236f4f8603de8f27b7fbd932e5d`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page·teaser `HOLD`·internal operations snapshot 제외·Smart Store only·750 제거·provenance 일치를 확인했다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-PUBLIC-RECHECK-20261006`, `E-NAVI-GATES-PUBLIC-RECHECK-20261006`, `E-PLAYWRIGHT-VIDEO-RECHECK-20261006`, `E-DEPLOY-PIPELINE-PUBLIC-RECHECK-20261006`, `E-LIVE-PUBLIC-PUBLIC-RECHECK-20261006`.

## 공개 surface·초소형 모바일 재감리 — e2f9920 — 2026-10-06

- 현재 공개본의 첫 화면·연구 지도·전문가 영상·이야기 공유 surface를 재감리하고, 초소형 280px까지 연구 지도·연구 카드·도표가 viewport 안에 읽히는지 확인했다. 280px에서 연구 지도 240px, 활성 연구 카드 240px, 선택 도표 204px로 배치되고 `document.scrollWidth`는 280px이었다.
- 390px·1440px 공개본에서 main·header·nav·footer 랜드마크, 이름 있는 버튼·링크, 이미지 alt, 외부 링크 rel, 히어로·연구·전문가·공유 surface와 5문장 복사 자료를 확인했다. 공개 validator는 HTTP 200·STATIC·candidate `e2f992033415efbcde7ae4b119ce44006e49651e`·71개 bundle hash·제품 독립 공개 경계를 유지했다.
- 현재 코드 기준의 UI 계약·목표·계획·외부 게이트·거버넌스·운영 문서 검사도 통과했다. 새 코드 수정이 필요한 CRITICAL/MAJOR 결함은 발견되지 않았으며, 의도된 전문가 영상 필터 rail과 장식용 수면 궤도만 내부 overflow surface로 기록했다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용했다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-SURFACE-AUDIT-20261006`, `E-ACCESSIBILITY-PUBLIC-AUDIT-20261006`, `E-PLAYWRIGHT-NARROW-AUDIT-20261006`, `E-PLAYWRIGHT-SURFACE-AUDIT-20261006`, `E-LIVE-PUBLIC-RECHECK-20261006`.

## Research Comparison Reading Cue — 3339309 — 2026-10-06

- 연구 결과 비교 도표에서 독자가 먼저 확인해야 하는 비교 기준과 막대 길이의 의미를 도표 상단에 추가했다. 새 수치나 효과 해석을 만들지 않고 `두 조건을 나란히 비교`와 `막대가 짧을수록 변화가 작습니다`라는 읽기 안내만 보강했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build를 통과했고, Playwright Chromium fallback 320px·390px·1440px에서 안내 문구가 표시되며 도표 폭과 document scrollWidth가 viewport와 일치하고 page/console errors 0을 확인했다. 캡처로 모바일 두 줄 배치와 데스크톱 한 줄 배치를 검토했다.
- PR #419의 `release-verify`·`site-quality-verify`가 성공해 main merge `3339309`로 반영되었다. workflow `37407044715`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고, live validator는 HTTP 200·STATIC·candidate `3339309c8565f874843b757afa5f843206bd2df3`·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-CHART-CUE-20261006`, `E-UI-CONTRACT-RESEARCH-CHART-CUE-20261006`, `E-PLAYWRIGHT-RESEARCH-CHART-CUE-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-CHART-CUE-20261006`, `E-LIVE-PUBLIC-RESEARCH-CHART-CUE-20261006`.

## GABA 기본 원리 3단계 인포그래픽·공개 배포 — 8da328d — 2026-10-06

- GABA 기본 설명 직후에 `글루탐산 → GABA 생성 → 신경 활동 조절`을 세 카드와 연결 화살표로 배치해, 처음 방문한 사람도 생성·작용의 흐름을 글보다 먼저 읽도록 보강했다. NCBI Bookshelf 출처 링크를 카드 하단에 연결했고 제품·효능·구매 문구는 추가하지 않았다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산을 통과했다. Playwright Chromium fallback 320·390·768·1440px에서 모바일 1열·태블릿/데스크톱 3열, viewport와 동일한 document scrollWidth, page errors 0·console errors 0을 확인하고 캡처를 검토했다.
- PR #422의 `release-verify`·`site-quality-verify`가 성공해 main merge `8da328d112d40554ae41308df660ef1f7c9d781b`로 반영되었다. main workflow `37410404149`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 `deploy-worker`는 STATIC_ONLY로 건너뛰었다. 라이브 validator는 HTTP 200·STATIC·candidate `8da328d112d40554ae41308df660ef1f7c9d781b`·71개 bundle hash·제품 독립 공개 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-GABA-PROCESS-20261006`, `E-UI-CONTRACT-GABA-PROCESS-20261006`, `E-PLAYWRIGHT-GABA-PROCESS-20261006`, `E-DEPLOY-PIPELINE-GABA-PROCESS-20261006`, `E-LIVE-PUBLIC-GABA-PROCESS-20261006`.

## Current Release Recheck — 8a6eeb6 — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `8a6eeb6b03314a34450fa9f35860d60718d9ace1`·71개 bundle hash를 확인했다.
- AC-003/AC-004 연구 결과 비교 도표의 문장 흐름과 모바일 가독성: PASS. 인지 연구 도표의 행별 라벨이 `GABA를 섭취한 그룹의 변화`로 표시되고, 390px·1440px에서 제목·결과·가로폭·page/console errors 0을 확인했다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. PR #434와 main workflow `37418115559`의 필수 검증·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 과학 정보 경계와 연구 수치·출처: PASS. 이번 변경은 어색한 결과 라벨만 자연스럽게 보정했으며 연구 수치·해석·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남기며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-CHART-VERDICT-20261006`, `E-UI-CONTRACT-CHART-VERDICT-20261006`, `E-PLAYWRIGHT-CHART-VERDICT-20261006`, `E-DEPLOY-PIPELINE-CHART-VERDICT-20261006`, `E-LIVE-PUBLIC-CHART-VERDICT-20261006`.

## Research Topic Selection Context — 0e5c611 — 2026-10-06

- 연구 지도에서 주제를 선택한 뒤 현재 선택 상태와 아래 연구 카드의 읽기 순서가 화면낭독기와 시각 흐름 모두에서 이어지지 않던 잔여 맥락 문제를 확인하고, 선택 안내를 `role=status`·`aria-live=polite`·`aria-atomic=true`로 연결했다. 화면의 정보량은 늘리지 않고, 선택 전 안내와 선택 후 안내를 자연스럽게 교체한다.
- `validate:ui-contract`·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 로컬 Chromium fallback 390px·1440px에서 `현재 선택 · 근육` 안내, active map item, `research-muscle` 포커스, 고정 읽기 레일 하단보다 낮은 제목 위치, viewport와 동일한 document scrollWidth, page/console errors 0을 확인했다. 공개 Chromium fallback에서도 두 폭에서 근육 연구 카드·출처·progress label·가로폭·오류 0을 재현했다.
- PR #417은 main `0e5c611ae1b4c8ab0737c9e3bf5b51c4b08145b7`로 병합되었고 workflow `37404491845`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다. 공개 validator는 candidate `0e5c611ae1b4c8ab0737c9e3bf5b51c4b08145b7`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-SELECTION-20261006`, `E-UI-CONTRACT-RESEARCH-SELECTION-20261006`, `E-PLAYWRIGHT-RESEARCH-SELECTION-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-SELECTION-20261006`, `E-LIVE-PUBLIC-RESEARCH-SELECTION-20261006`.

## Cross-Width Research Evidence Rhythm — 009839b — 2026-10-06

- 연구 규모 도표의 큰 수치와 검색 범위·출처 링크·설명문이 화면 폭에 따라 서로 다른 크기로 읽히던 잔여 편집 문제를 확인하고, v135에서 데스크톱·태블릿·모바일의 보조 근거 텍스트를 12px·1.65 line-height로 통일했다. 숫자·근거·출처가 같은 읽기 순서로 이어진다.
- `validate:ui-contract`·typecheck·127개 테스트·production build가 통과했다. 로컬 Playwright Chromium fallback 320px·390px·1440px에서 도표 폭과 document scrollWidth가 각 viewport에 맞고, caption·검색 범위·출처·feature metadata가 모두 12px이며 page errors 0·console errors 0을 확인했다. 공개 390px·1440px에서도 같은 계산값과 화면을 재현했다. 연구 원문에서 이야기 공유로 이어지는 카드도 공개 390px에서 `#final`·`final-heading` 포커스·가로폭·오류 0을 재확인했다.
- PR #415는 main `009839b915b730f6c02e0a36ec307990ed6dd2fc`로 병합되었고 workflow `37400104725`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다. 공개 validator는 candidate `009839b915b730f6c02e0a36ec307990ed6dd2fc`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-EVIDENCE-RHYTHM-20261006`, `E-UI-CONTRACT-RESEARCH-EVIDENCE-RHYTHM-20261006`, `E-PLAYWRIGHT-RESEARCH-EVIDENCE-RHYTHM-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-EVIDENCE-RHYTHM-20261006`, `E-LIVE-PUBLIC-RESEARCH-EVIDENCE-RHYTHM-20261006`.

## Mobile Research Evidence Readability — b716f5d — 2026-10-06

- 모바일 연구 규모 도표에서 큰 수치와 함께 읽어야 하는 검색 범위·출처 링크·설명문이 작게 보이던 편집 품질 문제를 확인하고, 700px 이하에서 보조 근거 텍스트를 12px·1.65~1.7 line-height로 올렸다. 큰 수치·연구 범위·출처가 같은 화면에서 이어져 읽히도록 했다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 로컬 Playwright Chromium fallback 320px·390px·1440px에서 document scrollWidth가 viewport와 같고, 모바일 도표의 caption·검색 범위·출처 링크가 12px이며 page errors 0·console errors 0을 확인했다. 공개본 390px·1440px에서도 같은 계산값을 확인했다.
- PR #413은 main `b716f5d`로 병합되었고 workflow `37398646295`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status 및 site-quality workflow `37398539152`가 성공했다. 공개 validator는 candidate `b716f5d39e33e73e933b2b40228b0b021ff01763`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-EVIDENCE-FLOOR-20261006`, `E-UI-CONTRACT-RESEARCH-EVIDENCE-FLOOR-20261006`, `E-PLAYWRIGHT-RESEARCH-EVIDENCE-FLOOR-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-EVIDENCE-FLOOR-20261006`, `E-LIVE-PUBLIC-RESEARCH-EVIDENCE-FLOOR-20261006`.

## Source-to-Share Grid Alignment — 9f0ec68 — 2026-10-06

- 데스크톱에서 연구 원문 읽기 장의 마지막 `이야기 공유` 전환이 왼쪽 열을 넘어 보일 수 있던 편집 정렬 문제를 확인하고, 전환 띠를 전체 editorial grid로 확장했다. 모바일에서는 기존 2행 구조를 유지했다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 공개 Playwright Chromium fallback 390px·1440px에서 버튼 폭과 내부 콘텐츠 폭이 일치하고, 클릭 후 `#final`, `final-heading` 포커스, viewport와 동일한 scrollWidth, page errors 0·console errors 0을 확인했다.
- PR #411은 main `9f0ec68`로 병합되었고 workflow `37397023527`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status 및 site-quality workflow `37396881307`이 성공했다. 공개 validator는 candidate `9f0ec68c8acc8c5ee6246cb0e262a95db5e68d3b`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-READING-GRID-20261006`, `E-UI-CONTRACT-READING-GRID-20261006`, `E-PLAYWRIGHT-READING-GRID-20261006`, `E-DEPLOY-PIPELINE-READING-GRID-20261006`, `E-LIVE-PUBLIC-READING-GRID-20261006`.

## Source Reading to Story Sharing — 84fd53b — 2026-10-06

- 연구 원문을 읽은 뒤 마지막 공유 장으로 바로 이어지는 `연구를 읽는 기준에서 공유 가능한 이야기로` 내부 전환 카드를 추가했다. 외부 링크로 흐름을 끊지 않고 기존 `scrollTo('final')`·헤딩 포커스 전달을 사용한다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 공개 Playwright Chromium fallback 390px·1440px에서 카드 표시, 클릭 후 `#final`, `final-heading` 포커스, viewport와 동일한 scrollWidth, page errors 0·console errors 0을 확인했다.
- PR #409는 main `84fd53b`로 병합되었고 workflow `37395031732`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status 및 site-quality workflow `37394904797`이 성공했다. 공개 validator는 candidate `84fd53bfc9d4c02673f4797839ad79d7ad7c52b3`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-READING-HANDOFF-20261006`, `E-UI-CONTRACT-READING-HANDOFF-20261006`, `E-PLAYWRIGHT-READING-HANDOFF-20261006`, `E-DEPLOY-PIPELINE-READING-HANDOFF-20261006`, `E-LIVE-PUBLIC-READING-HANDOFF-20261006`.

## Opening Bridge Chapter Handoff — 658eb99 — 2026-10-06

- 수면·회복 도입부 마지막에 `회복의 균형에서 GABA의 발견으로` 내부 전환 카드를 추가했다. 외부 페이지로 흐름을 끊지 않고 기존 `scrollTo('history')`·헤딩 포커스 전달을 사용해 다음 장으로 자연스럽게 이어진다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 로컬 Playwright Chromium fallback 390px·1440px에서 카드 표시, 클릭 후 `#history`, `history-heading` 포커스, viewport와 동일한 scrollWidth, page errors 0·console errors 0을 확인했다.
- PR #407은 main `658eb99`로 병합되었고 workflow `37393189113`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다. 공개 validator는 candidate `658eb99672fcf8031d7c82b606a4aa0a5eb28a31`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다. 공개 Playwright Chromium fallback 390px·1440px에서도 같은 클릭 이동과 포커스를 재현했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-OPENING-HANDOFF-20261006`, `E-UI-CONTRACT-OPENING-HANDOFF-20261006`, `E-PLAYWRIGHT-OPENING-HANDOFF-20261006`, `E-DEPLOY-PIPELINE-OPENING-HANDOFF-20261006`, `E-LIVE-PUBLIC-OPENING-HANDOFF-20261006`.

## Recovery Playback Status Accessibility — 0880c55 — 2026-10-06

- 수면·회복 14단계 카드의 자동 진행 상태를 화면에서도 `자동 진행 · 3초마다`·`일시정지`로 구분하고, 상태 영역에 `aria-live="polite"`·`aria-atomic="true"`를 부여해 화면낭독기가 상태 변화를 한 문장으로 읽도록 보강했다. 모션 감소 환경의 `사용자 진행` 상태와 기존 수동 토글 흐름은 유지했다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 공개 Playwright Chromium fallback 320px·390px·1440px에서 초기 상태, 토글 후 상태, 제목, `aria-live`·`aria-atomic`, viewport와 동일한 scrollWidth, page errors 0·console errors 0을 확인했다.
- PR #405는 main `0880c55`로 병합되었고 workflow `37390751297`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status 및 site-quality workflow `37390559874`가 성공했다. 공개 validator는 candidate `0880c55b1de66bffeeb0d9d86fd97f51ed660d23`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RECOVERY-STATUS-A11Y-20261006`, `E-UI-CONTRACT-RECOVERY-STATUS-A11Y-20261006`, `E-PLAYWRIGHT-RECOVERY-STATUS-A11Y-20261006`, `E-DEPLOY-PIPELINE-RECOVERY-STATUS-A11Y-20261006`, `E-LIVE-PUBLIC-RECOVERY-STATUS-A11Y-20261006`.

## Recovery Autoplay Status Clarity — befeea5 — 2026-10-07

- 수면·회복 14단계 카드의 자동 진행 상태 문구를 `자동 진행 · 3초마다`로 정리하고, 사용자가 멈추면 `일시정지`, 모션 감소 환경에서는 `사용자 진행`으로 즉시 구분되도록 보강했다. 작은 상태 문구도 별도 굵기로 읽히게 해 고령 사용자의 현재 동작 인지를 돕는다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 공개 Playwright Chromium fallback 320px·390px·1440px에서 초기 상태 `자동 진행 · 3초마다`, `잠시 멈춤` 클릭 후 `일시정지`, 제목 `GABA를 모르면 노화는 가속됩니다.`, viewport와 동일한 scrollWidth, page errors 0·console errors 0을 확인했다.
- PR #403은 main `befeea5`로 병합되었고 workflow `37388830638`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status 및 site-quality workflow `37388682654`가 성공했다. 공개 validator는 candidate `befeea5590f11218ab7b9932a4dde06004bc8f57`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RECOVERY-AUTOPLAY-LABEL-20261007`, `E-UI-CONTRACT-RECOVERY-AUTOPLAY-LABEL-20261007`, `E-PLAYWRIGHT-RECOVERY-AUTOPLAY-LABEL-20261007`, `E-DEPLOY-PIPELINE-RECOVERY-AUTOPLAY-LABEL-20261007`, `E-LIVE-PUBLIC-RECOVERY-AUTOPLAY-LABEL-20261007`.

## Expert Video Feature State Synchronization — 28ff210 — 2026-10-07

- v130에서 전문가 영상 feature 영역의 상태 문구가 초기 선택 상태에서도 고정되어 카드 lifecycle과 어긋나던 문제를 보완했다. feature 메타를 `선택하면 바로 재생`·`준비 중`·`재생 중`으로 연결해 카드 badge와 같은 상태를 읽도록 했다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 공개 Playwright Chromium fallback 390px·1440px에서 두 번째 영상 선택 후 feature 메타가 `준비 중`을 거쳐 `재생 중`으로 바뀌고 카드 badge도 `재생 중`으로 일치했으며 iframe 1개·가로폭 일치·page errors 0·console error 0을 확인했다.
- PR #401은 main `28ff210`으로 병합되었고 workflow `37385885986`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status와 site-quality workflow `37385689961`이 성공했다. 공개 validator는 candidate `28ff210aedeb2c0e26f138a8541806622e241764`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-VIDEO-FEATURE-STATE-20261007`, `E-UI-CONTRACT-VIDEO-FEATURE-STATE-20261007`, `E-PLAYWRIGHT-VIDEO-FEATURE-STATE-20261007`, `E-DEPLOY-PIPELINE-VIDEO-FEATURE-STATE-20261007`, `E-LIVE-PUBLIC-VIDEO-FEATURE-STATE-20261007`.

## Expert Video Selection State Clarity — a5e3f72 — 2026-10-06

- v129에서 전문가 영상 게시판의 초기 선택 카드가 실제 재생 전인데도 `재생 중`으로 보이던 상태 불일치를 수정했다. 카드 상태와 접근성 이름을 `선택됨`·`준비 중`·`재생 중`으로 실제 iframe lifecycle에 맞췄다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. Playwright Chromium fallback 로컬·공개 390px·1440px에서 첫 카드 `선택됨`, 두 번째 영상 선택 직후 `준비 중`, iframe load 후 `재생 중`, iframe 1개·가로폭 일치·runtime errors 0을 확인했다.
- PR #399는 main `a5e3f72`로 병합되었고 workflow `37384062137`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다. 공개 validator는 candidate `a5e3f72fce5f8a2dbe681ef98d0698f5989a4986`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-VIDEO-STATE-20261006, E-UI-CONTRACT-VIDEO-STATE-20261006, E-PLAYWRIGHT-VIDEO-STATE-20261006, E-DEPLOY-PIPELINE-VIDEO-STATE-20261006, E-LIVE-PUBLIC-VIDEO-STATE-20261006.

## Research Subprogress Reading Rail — cea481f — 2026-10-06

- v128에서 연구 지도 구간의 상단 진행 표시가 전체 장 번호만 보여 현재 연구 위치를 즉시 알기 어려운 문제를 보완했다. 연구 구간에서는 전체 흐름과 연구 내부 순서를 함께 표시해 `06 / 12 · 연구 03 / 05`처럼 읽는 위치를 한 줄로 확인할 수 있다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. Playwright Chromium fallback 로컬·공개 320px·390px·1440px에서 초기 `연구 01 / 05`, 세 번째 지도 주제 선택 후 `연구 03 / 05`, live status·활성 `근육`·가로폭·runtime errors 0을 확인했다.
- PR #397은 main `cea481f`로 병합되었고 workflow `37382053311`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다. 공개 validator는 candidate `cea481fc08ec48cc2dee0c98594904cef6771851`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-SUBPROGRESS-20261006, E-UI-CONTRACT-RESEARCH-SUBPROGRESS-20261006, E-PLAYWRIGHT-RESEARCH-SUBPROGRESS-20261006, E-DEPLOY-PIPELINE-RESEARCH-SUBPROGRESS-20261006, E-LIVE-PUBLIC-RESEARCH-SUBPROGRESS-20261006.

## Expert Video Editorial Fallback Posters — d228a3d — 2026-10-06

- v127에서 원격 YouTube 썸네일이 지연되거나 unavailable한 경우에도 전문가 영상 gallery가 각 영상의 제목·주제·회차를 poster 안에 표시하도록 보강했다. 카드마다 자연 이미지 crop을 달리해 같은 주제 영상이 반복적으로 보이는 인상을 줄였고, 기존 선택 즉시 재생·공유 흐름은 유지했다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. Playwright Chromium fallback 로컬·공개 390px·1440px에서 첫 네 카드의 poster identity와 crop variation, document scrollWidth, 두 번째 카드 선택 후 `aria-pressed=true`·feature title·iframe title·runtime errors 0을 확인했다.
- PR #394는 main `d228a3d`로 병합되었고 workflow `37379778619`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다. 공개 validator는 candidate `d228a3df717136cfe3ab27c5ef092d2ea62bf320`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-FALLBACK-POSTER-20261006, E-UI-CONTRACT-MOBILE-VIDEO-FALLBACK-POSTER-20261006, E-PLAYWRIGHT-MOBILE-VIDEO-FALLBACK-POSTER-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FALLBACK-POSTER-20261006, E-LIVE-PUBLIC-MOBILE-VIDEO-FALLBACK-POSTER-20261006.

## Mobile Video Filter Accessibility Hardening — 7fff775 — 2026-10-06

- v126에서 모바일 전문가 영상 필터 rail에 `role=region`과 좌우 이동 안내 라벨을 부여하고, 수평 `overscroll-behavior-x: contain`으로 페이지와의 스크롤 전파를 제한했다. 기존 44px 터치 영역·시작 cue 표시·끝 cue 숨김·시작점 복원·마지막 주제 선택은 유지했다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. Playwright Chromium fallback 로컬·공개 320px에서 region 의미·aria-label·overscroll `contain`·7개 44px 필터·끝 cue 숨김·복귀 cue 표시·`수면·기분` 선택·document scrollWidth 320·runtime errors 0을 확인했다.
- PR #392는 main `7fff775`로 병합되었고 workflow `37377603302`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다. 공개 validator는 candidate `7fff775a6735c85f0ae7ff2362bf3604d19085d0`·HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-FILTER-A11Y-20261006, E-UI-CONTRACT-MOBILE-VIDEO-FILTER-A11Y-20261006, E-PLAYWRIGHT-MOBILE-VIDEO-FILTER-A11Y-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FILTER-A11Y-20261006, E-LIVE-PUBLIC-MOBILE-VIDEO-FILTER-A11Y-20261006.

## Live Public Recheck — 16f3fec — 2026-10-06

- v125 상태 보강이 GitHub Pages 공개본에 반영되었다. 공개 validator는 HTTP 200·STATIC·candidate `16f3fec3403545098ed9e74a8ce058f75d59b9ce`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page·teaser HOLD·제품 독립 경계를 확인했다.
- 공개 Playwright Chromium fallback 320px에서 전문가 영상 필터 wrapper 256px·scrollWidth 711px·maxScroll 455px, 시작 cue 표시·끝 cue 숨김·시작점 복원, 마지막 `수면·기분` 선택 aria-pressed=true, document scrollWidth 320, runtime errors 0을 확인했다. 화면 캡처도 별도 검토했다.
- deploy-pages `111980640548`와 smoke-live `111982600087`은 성공했다. release-status `111982772244`는 기록 시점 runner queue에 남아 있으나 라이브 공개 검증에는 영향이 없다.
- 새 CRITICAL/MAJOR 결함은 없다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 다음 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-MOBILE-VIDEO-FILTER-CUE-STATE-20261006.

## Mobile Expert Video Filter Cue State — cdbc6f3 — 2026-10-06

- 320px에서 전문가 영상 필터의 이어짐 표시가 rail 끝에서도 남아 더 읽을 내용이 있는 것처럼 보일 수 있는 잔여 발견성 리스크를 확인했다. v125에서 실제 rail 위치를 감시해 시작점에서는 cue를 표시하고 끝점에서는 숨기며, 다시 시작점으로 돌아오면 복원하도록 보강했다. 44px 터치 영역·수평 rail·마지막 주제 선택은 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. Playwright Chromium fallback 로컬 320px에서 시작 cue 표시·끝 cue 숨김·복귀 cue 복원·`수면·기분` 선택·aria-pressed=true·document scrollWidth 320·runtime errors 0을 확인했다.
- PR #389는 main `cdbc6f3`으로 병합되었고 workflow `37373171340`의 release-verify는 성공했지만 worker-readiness `111975675081`이 runner queue에서 대기 중이다. 공개 validator는 이전 candidate `ffd7c2e`를 반환하므로 이번 상태 보강의 공개 반영은 아직 확인하지 않았다.
- 새 CRITICAL/MAJOR 결함은 없다. 공개 URL의 새 bundle 반영, 라이브 모바일 재검증, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 다음 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-FILTER-CUE-STATE-20261006, E-UI-CONTRACT-MOBILE-VIDEO-FILTER-CUE-STATE-20261006, E-PLAYWRIGHT-MOBILE-VIDEO-FILTER-CUE-STATE-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FILTER-CUE-STATE-20261006.

## Mobile Expert Video Filter Continuation Cue — c61c535 — 2026-10-06

- 320px 화면에서 전문가 영상 주제 필터가 7개 주제 중 첫 3개만 보이고 추가 주제의 존재가 얇은 스크롤바에 의존하던 잔여 발견성 리스크를 확인했다. v124에서 높이와 문구를 늘리지 않고 오른쪽 gradient와 ChevronRight 시각 단서를 추가했으며, 한 줄 가로 스크롤과 44px 터치 영역은 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. Playwright Chromium fallback 로컬 320px에서 wrapper 256px·scrollWidth 711px·cue display flex·끝까지 scrollLeft 455/maxScroll 455·마지막 주제 선택 aria-pressed=true·runtime errors 0을 확인했다.
- PR #387은 main `c61c535`로 병합되었고 최신 main deploy run `37371457391`은 기록 시점 `pending`이다. 공개 validator는 기존 candidate `ffd7c2e`를 반환하며, 새 cue의 공개 반영은 아직 확인하지 않았다.
- 새 CRITICAL/MAJOR 결함은 없다. 공개 URL의 새 bundle 반영, 라이브 모바일 재검증, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 다음 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-FILTER-CUE-20261006, E-UI-CONTRACT-MOBILE-VIDEO-FILTER-CUE-20261006, E-PLAYWRIGHT-MOBILE-VIDEO-FILTER-CUE-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FILTER-CUE-20261006.

## Ultra-Narrow Header Clearance — 27445e9 — 2026-10-06

- 280·300·320·350px에서 메뉴 버튼과 읽기 크기 버튼이 8px 겹치던 잔여 터치 충돌을 정밀 점검으로 확인하고, v123 전용 간격 규칙으로 두 컨트롤 사이에 8px 여백을 확보했다. 390px 이상 레이아웃과 읽기 크기 라벨은 유지했다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. Playwright Chromium fallback 로컬 280·300·320·350·390·1440px에서 overlap 없음·viewport와 같은 scrollWidth·320px 토글 상태·runtime errors 0을 확인했다.
- PR #385의 release-verify와 site-quality-verify는 성공했고 main merge commit은 `27445e9`다. main 공개 배포 run은 runner 후처리 queue로 취소되어 새 공개 candidate 반영은 아직 확인하지 못했다. 현재 공개 validator candidate는 이전 `ffd7c2e`다.
- 새 CRITICAL/MAJOR 결함은 없다. 공개 URL의 새 CSS 반영, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 다음 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-ULTRA-NARROW-HEADER-20261006, E-UI-CONTRACT-ULTRA-NARROW-HEADER-20261006, E-PLAYWRIGHT-ULTRA-NARROW-HEADER-20261006, E-DEPLOY-PIPELINE-ULTRA-NARROW-HEADER-20261006.

## Compact Mobile Reading Control — ffd7c2e — 2026-10-06

- 320px 초소형 화면에서 읽기 크기 버튼이 `가+ 글자`·`가− 기본`으로 보이도록 보강했다. 390px 이상에서는 기존 `글자 크게`·`기본 크기` 라벨을 유지하며, 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약·typecheck·127개 테스트·production build와 Playwright Chromium fallback 320·390·1440px 검증을 통과했다. 320px 토글 후 `aria-pressed=true`, `is-large-text`, `가− 기본`, document width 320px, runtime errors 0을 확인했다.
- PR #383 병합 후 main workflow `37363196125`에서 release-verify·worker-readiness·Pages 배포·라이브 smoke가 성공했고, 공개 validator는 candidate `ffd7c2e1f99fd2806e87274ab9200f948d0fc5fe`의 HTTP 200·STATIC·71개 bundle hash를 확인했다. release-status job은 기록 시점에 queue 대기 상태로 남아 별도 표시했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Playwright fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-READING-CONTROL-COMPACT-20261006, E-UI-CONTRACT-READING-CONTROL-COMPACT-20261006, E-PLAYWRIGHT-READING-CONTROL-COMPACT-20261006, E-DEPLOY-PIPELINE-READING-CONTROL-COMPACT-20261006, E-LIVE-PUBLIC-READING-CONTROL-COMPACT-20261006.

## Final Public Manifest Sync — f54bae6 — 2026-10-06

- NAVI 증적 PR #381 병합 뒤 최종 공개 manifest candidate가 `f54bae600ce55ab6a2439bbd337eb26fc1949a1d`로 갱신된 것을 확인했다. 코드 변경은 PR #380의 `fb874662`에 포함되어 있으며, 문서 병합은 공개 기능·연구 카피·제품 독립 경계를 변경하지 않았다.
- 최종 공개 validator는 HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·1개 product·6개 share page·teaser HOLD를 확인했다. 공개 Chrome CDP fallback 390·1440px의 연구 지도 10px cue·선택 카드 흐름·scrollWidth 390·1425·runtime errors 0도 재확인했다.
- 새 CRITICAL/MAJOR 결함은 없으며 Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증 항목으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-DEPLOY-PIPELINE-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006.

## Public Release Recheck — fb874662 — 2026-10-06

- 연구 지도 중심의 `5개 연구 영역` 보조 문구를 모바일에서도 10px·900 weight·청록 강조로 유지하도록 보정해 작은 화면에서의 읽기 하한을 높였다. 기존 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- PR #380과 main workflow `37355788429`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 모두 성공했다. 공개 validator는 candidate `fb87466241c67311cbd990228acf48fab7f65068`에서 HTTP 200·STATIC·71개 bundle hash를 확인했다.
- 공개 Chrome CDP fallback 390·1440px에서 계산 스타일 10px·900 weight·청록 색상, scrollWidth 390·1425, 인지 영역 선택 후 카드 포커스·스크롤, runtime console errors 0을 확인했다. 320·350·390·768·1440px 반응형 사전 점검에서도 가로 넘침이 없었다. 새 CRITICAL/MAJOR 결함은 없다.
- Browser 플러그인 부재로 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-UI-CONTRACT-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-CDP-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-DEPLOY-PIPELINE-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006.

## Public Release Recheck — 8a6260f — 2026-10-06

- 연구 지도 중심의 `5개 연구 영역` 보조 문구가 모바일에서 작게 인식될 수 있던 잔여 가독성 리스크를 보정했다. 데스크톱은 10px, 모바일은 9px, weight 900과 청록 강조를 사용해 중심 원의 규모 안내를 연구 지도와 같은 시각 계층으로 맞췄다.
- PR #378과 main workflow `37352455204`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 모두 성공했다. 공개 validator는 candidate `8a6260f4342be4979cf28d4c7f3ae46f6f67b0a6`에서 HTTP 200·STATIC·71개 bundle hash를 확인했다.
- 공개 Chrome CDP fallback 390·1440px에서 계산 스타일·scrollWidth 390·1425·인지 연구 영역 선택 후 카드 포커스·스크롤·콘솔 오류 0을 확인했다. 새 CRITICAL/MAJOR 결함은 없다.
- Browser 플러그인 부재로 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-SCALE-LEGIBILITY-20261006, E-UI-CONTRACT-RESEARCH-MAP-SCALE-LEGIBILITY-20261006, E-CDP-RESEARCH-MAP-SCALE-LEGIBILITY-20261006, E-DEPLOY-PIPELINE-RESEARCH-MAP-SCALE-LEGIBILITY-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-SCALE-LEGIBILITY-20261006.

## Public Release Recheck — 8724f4c — 2026-10-06

- 최신 GitHub Pages 공개본에서 전문가 영상 갤러리의 9개 카드·주제 필터·선택 즉시 재생 흐름을 390·1440px로 재현했다. 두 번째 카드 선택 후 제목·선택 상태·자동 재생 iframe·feature 포커스가 갱신되고, scrollWidth 390·1425와 runtime console errors 0을 유지했다.
- PR #376과 main workflow `37350034212`의 release-verify·Pages 배포·라이브 smoke·release status가 성공했다. 배포 후 live validator·Chrome CDP 재점검까지 포함해 새 CRITICAL/MAJOR 결함은 없다.
- Browser 플러그인 부재로 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-DEPLOY-PIPELINE-EXPERT-VIDEO-INTERACTION-20261006, E-LIVE-PUBLIC-EXPERT-VIDEO-POSTDEPLOY-20261006.

## Public Release Recheck — b73e086 — 2026-10-06

- PR #374와 main workflow `37347460556`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200·STATIC·71개 bundle hash를 확인했다.
- 연구 지도 중심의 `5개 연구 영역` 문구와 hero route의 유효한 HTML 중첩을 공개 390·1440px에서 확인했고, Chrome CDP 콘솔 오류는 0건이었다. 새 CRITICAL/MAJOR 결함은 없다.
- Browser 플러그인 부재로 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-DEPLOY-PIPELINE-RESEARCH-MAP-SCALE-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-SCALE-20261006.

## Public Release Recheck — f1cd671 — 2026-10-06

- PR #371 코드 배포와 PR #372 증적 정리가 main workflow `37344810577`의 release-verify·worker-readiness·Pages·라이브 smoke·release status까지 성공했다. 공개 validator는 candidate `f1cd67136368c26fb7d2a12af25a010a3cff735b`에서 HTTP 200·STATIC·71개 bundle hash를 확인했다.
- 첫 화면 읽기 진입 컨트롤은 공개 390·1440px에서 표시되고, 클릭 시 `#opening-bridge`와 읽기 진행 레일로 정렬된다. 새 CRITICAL/MAJOR 결함은 없다.
- Browser 플러그인 부재로 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-DEPLOY-PIPELINE-HERO-CUE-CONTRAST-20261006, E-LIVE-PUBLIC-HERO-CUE-CONTRAST-20261006.

## Public Release Recheck — 589055e — 2026-10-06

- PR #369와 main workflow `37341643727`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200·STATIC·71개 bundle hash를 확인했다.
- 공개 390·1440px에서 `글자 크게`·`기본 크기` 토글, aria 상태, 가로 폭 안정성을 확인했다. 새 CRITICAL/MAJOR 결함은 없다.
- Browser 플러그인 부재로 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-DEPLOY-PIPELINE-READING-SIZE-LABEL-20261006, E-LIVE-PUBLIC-READING-SIZE-LABEL-20261006.

## Reading Size Label Recheck — 1daf71b — 2026-10-06

- 모바일 헤더의 글자 크기 조절을 `글자 크게`·`기본 크기`라는 행동 중심 문구로 정리하고, 접근성 라벨·상태 안내·가+/가− 시각 신호를 함께 점검했다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산과 로컬 Chrome CDP 390·1440px 토글 QA가 통과했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 공개 배포 workflow는 아직 후속 PR 검증 전이다. Browser 플러그인 부재로 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기와 실제 고령 사용자 독해성은 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-READING-SIZE-LABEL-20261006, E-UI-CONTRACT-READING-SIZE-LABEL-20261006, E-CDP-READING-SIZE-LABEL-20261006, E-DEPLOY-PIPELINE-READING-SIZE-LABEL-20261006.

## Hero Reading Start Recheck — d593491 — 2026-10-05

- 첫 화면의 `3분 읽기 시작` 버튼을 확인했다. 390·1440px에서 버튼이 보이고, 클릭하면 `#opening-bridge`로 이동하며 고정 읽기 진행 레일이 `수면과 회복` 장과 맞춰진다.
- 로컬 UI 계약·typecheck·127개 테스트·production build와 공개 workflow `37338231096`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200·STATIC을 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-HERO-READING-START-20261006, E-UI-CONTRACT-HERO-READING-START-20261006, E-DEPLOY-PIPELINE-HERO-READING-START-20261006, E-LIVE-PUBLIC-HERO-READING-START-20261006.

## Final Public Evidence Recheck — 012e531 — 2026-10-05

- 저장소 개인정보 보호 보정까지 포함한 최종 main commit을 공개 배포하고 workflow `37335287439` 전체 성공을 확보했다. release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 공개 validator는 HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·1개 product·6개 share page·teaser HOLD를 확인했다. Chrome CDP fallback 공개 320·390·1440px 연구 도표 QA에서 범례 폭 216·286·649, 높이 128·89·55, scrollWidth 320·390·1425, runtime 오류 없음을 확인했고 390px·1440px 전체 섹션 감사도 통과했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-DEPLOY-PIPELINE-RESEARCH-CHART-LEGEND-FINAL-20261006, E-LIVE-PUBLIC-RESEARCH-CHART-LEGEND-FINAL-20261006.

## Research Chart Reading Legend Recheck — 859bb59 — 2026-10-05

- 비교형 연구 결과 도표 하단의 반복된 긴 설명을 `읽는 법` 시각 범례로 정리했다. 변화 방향, 두 조건의 상대 비교, 그림 크기와 실제 효과 크기의 구분을 짧은 키로 보여 주고, 차트 전체 설명은 접근성 레이블로 보존했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. PR #362의 release-verify와 main workflow `37333111161`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `859bb59f901eb038f6152f5b89749616a3532aac`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claims·6개 master records·1개 product·6개 share pages·teaser HOLD를 유지한다. Chrome CDP fallback 공개 320·390·1440px에서 범례 폭 216·286·649, 범례 높이 128·89·55, scrollWidth 320·390·1425, runtime 오류 없음을 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았다. Browser 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-CHART-LEGEND-20261006, E-UI-CONTRACT-RESEARCH-CHART-LEGEND-20261006, E-DEPLOY-PIPELINE-RESEARCH-CHART-LEGEND-20261006, E-LIVE-PUBLIC-RESEARCH-CHART-LEGEND-20261006.

## Final Public Evidence Recheck — 791450b — 2026-10-05

- NAVI 감사·레드팀·증거 문서를 main에 병합한 최종 공개 candidate를 다시 확인했다. workflow `37328933408`의 release-verify·Pages·라이브 smoke·release-status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 공개 validator는 HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·1개 product·6개 share page·teaser HOLD를 확인했다. Chrome CDP fallback 공개 320·390·1440px 연구 도표 QA에서도 두 조건 나란히 표시, lane width 96·131·195, chart height 845·765·456, scrollWidth 320·390·1425, runtime 오류 없음을 재확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-DEPLOY-PIPELINE-NAVI-SYNC-20261006, E-LIVE-PUBLIC-NAVI-SYNC-20261006.

## Mobile Research Comparison Chart Recheck — 0acdb90 — 2026-10-05

- 좁은 모바일 연구 결과 도표에서 비교 조건과 GABA 섭취 조건이 세로로 쌓여 한 지표를 이해하는 데 스크롤이 길어지던 잔여 리스크를 확인하고, PR #359에서 두 조건을 같은 행의 두 칸으로 나란히 배치했다. GABA 결과 칸의 청록색 강조·방향 문구·측정 지표는 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. PR #359 release-verify와 main workflow `37327605045`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `0acdb90a43dd9dbbab0b2618efd63ec79bc5e3b1`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claims·6개 master records·1개 product·6개 share pages·teaser HOLD를 유지한다. Chrome CDP fallback 공개 320·390·1440px에서 lane width 96·131·195, chart height 845·765·456, scrollWidth 320·390·1425와 runtime 오류 없음을 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았다. Browser 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-RESEARCH-COMPARISON-20261006, E-UI-CONTRACT-MOBILE-RESEARCH-COMPARISON-20261006, E-DEPLOY-PIPELINE-MOBILE-RESEARCH-COMPARISON-20261006, E-LIVE-PUBLIC-MOBILE-RESEARCH-COMPARISON-20261006.

## Full Public Flow Recheck — 7c7e772 — 2026-10-05

- 도입·수면과 회복·GABA란·연구 지도·국내외 활용·발효와 안전·전문가 영상·출처 읽기·이야기 공유의 주요 장을 390px와 1440px 공개 화면에서 순서대로 재검증했다. 모바일 제목, 선행 카드, 연구 출처, 공유 자료가 고정 읽기 레일 아래에서 읽혔고 전문가 영상 주제 레일과 선택 즉시 재생도 유지됐다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산, 공개 validator HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·1개 product·6개 share page·teaser HOLD를 확인했다. Chrome CDP fallback section QA의 scrollWidth는 390/1425였고 runtime 오류는 없었다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았다. Browser 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-FULL-FLOW-20261005, E-LIVE-PUBLIC-FULL-FLOW-20261005.

## Mobile Expert Video Filter Rail Recheck — a37adcb — 2026-10-05

- 전문가 영상 주제 필터가 좁은 모바일에서 여러 줄로 쌓여 선택 영상까지의 첫 시선이 길어지던 잔여 퍼블리싱 리스크를 확인하고, PR #356에서 44px 터치 높이를 유지한 한 줄 수평 레일로 정리했다. 주제 전체를 가로로 탐색할 수 있으며 영상 카드·즉시 재생·다음 읽기 흐름은 변경하지 않았다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. PR #356 checks와 heartbeat PR #357 병합 후 main workflow `37322259867`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `a37adcb370ec1f04e3fe2d61073b773defe6647f`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claims·6개 master records·1개 product·6개 share pages·teaser HOLD를 유지한다. Chrome CDP fallback 공개 320·350·390px에서 필터 높이 45px, 수평 rail 끝 도달, 마지막 주제 선택 후 제목·활성 카드·autoplay iframe, 사업자 공유 버튼 44px, scrollWidth 320·350·390, runtimeErrors 0을 확인했고 새 CRITICAL/MAJOR 결함은 없었다.
- 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다. Browser 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-FILTER-RAIL-20261005, E-UI-CONTRACT-MOBILE-VIDEO-FILTER-RAIL-20261005, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FILTER-RAIL-20261005, E-LIVE-PUBLIC-MOBILE-VIDEO-FILTER-RAIL-20261005.

## Hero Reading Route Recheck — 88f9382 — 2026-10-05

- 첫 화면의 `3분 읽기` 경로를 의미 있는 순서 목록으로 바꾸고, 모바일에서는 두 줄·데스크톱에서는 한 줄로 정리했다. 연구 규모 카드의 `1950 → 지금` 표현도 CSS chevron 시간축으로 통일해 텍스트 화살표와 연구 레일의 시각 언어가 섞이지 않는다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. PR #355 checks와 main workflow `37319119945`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `88f93822af73a4f6652a0b5e8b6710dc5fade9c1`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claims·6개 master records·1개 product·6개 share pages·teaser HOLD를 유지한다. Chrome CDP fallback 공개 390·1440px에서 첫 화면 경로 항목의 겹침 없음, 시간축 chevron, scrollWidth 390·1425, 발견 장 직접 진입, runtimeErrors 0을 확인했고 새 CRITICAL/MAJOR 결함은 없었다.
- 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다. Browser 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-HERO-READING-ROUTE-20261005, E-UI-CONTRACT-HERO-READING-ROUTE-20261005, E-DEPLOY-PIPELINE-HERO-READING-ROUTE-20261005, E-LIVE-PUBLIC-HERO-READING-ROUTE-20261005.

## Research Reading Rail Recheck — 96333a6 — 2026-10-05

- 연구 읽기 레일의 텍스트 화살표 잔존을 데스크톱 CSS chevron으로 보정하고, 모바일에서는 장식 연결부를 숨겨 좁은 화면의 정보량을 정리했다. 390px 공개 화면에서는 연구 순서가 카드와 함께 자연스럽게 이어지고, 1440px에서는 3개의 chevron이 `지도 → 대상 → 결과 → 해석` 순서를 시각적으로 보조한다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. PR #354 checks와 main workflow `37316142968`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `96333a63e4fd295485724c52586bf1b151fa85da`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claims·6개 master records·1개 product·6개 share pages·teaser HOLD를 유지한다. Chrome CDP fallback 공개 390·1440px에서 연구 레일·handoff 이동·scrollWidth 390·1425·runtimeErrors 0을 확인했고 새 CRITICAL/MAJOR 결함은 없었다.
- 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다. Browser 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-RAIL-20261005, E-UI-CONTRACT-RESEARCH-RAIL-20261005, E-DEPLOY-PIPELINE-RESEARCH-RAIL-20261005, E-LIVE-PUBLIC-RESEARCH-RAIL-20261005.

## Editorial Flow Connector Recheck — d98abdd — 2026-10-05

- 회복 장의 다음 읽기 흐름과 출처 읽기 장의 연구 카드 → 원문 출처 흐름을 390px·1440px에서 재감리했다. 두 연결부 모두 shared SVG ArrowRight와 editorial connector 스타일로 표시되어 텍스트 화살표와 아이콘 화살표가 섞이지 않는다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. PR #352 checks와 main workflow `37314128121`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `d98abddcd16da10ea29d1832582138b4ff7fa82e`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claims·6개 master records·6개 share pages·teaser HOLD를 유지한다. Chrome CDP fallback 공개 390·1440px에서 expertArrow `svg`, handoff 이동, scrollWidth 390·1425, runtimeErrors 0을 확인했으며 새 CRITICAL/MAJOR 결함은 없었다.
- 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다. Browser 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-FLOW-ARROWS-20261005, E-UI-CONTRACT-FLOW-ARROWS-20261005, E-DEPLOY-PIPELINE-FLOW-ARROWS-20261005, E-LIVE-PUBLIC-FLOW-ARROWS-20261005.

## Editorial Connector Recheck — 62ad947 — 2026-10-05

- 전문가 영상에서 출처 읽기로 이어지는 마지막 읽기 연결부를 공개 390px·1440px에서 재감리했다. 기존 텍스트 화살표 대신 shared SVG ArrowRight가 렌더링되고, 국내외 활용·발효·안전·출처 읽기 handoff가 현재 장 → 다음 장 순서로 이동했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. PR #350 checks와 main workflow `37311934178`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 모두 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `62ad9474ab2ffaf3d3a3b20b22d853e48450a74a`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claims·6개 master records·6개 share pages·teaser HOLD를 유지한다. Chrome CDP fallback 공개 390·1440px에서 expertArrow `svg`, handoff 이동, scrollWidth 390·1425, runtimeErrors 0을 확인했으며 새 CRITICAL/MAJOR 결함은 없었다.
- 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다. Browser 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-EDITORIAL-ARROW-20261005, E-UI-CONTRACT-EDITORIAL-ARROW-20261005, E-DEPLOY-PIPELINE-EDITORIAL-ARROW-20261005, E-LIVE-PUBLIC-EDITORIAL-ARROW-20261005.

## Release Recheck — 2eb17a7 — 2026-10-05

- 연구 지도 → 상세 카드 → 다음 연구, 마지막 공유 장 직접 링크, 사업자용 5문장 복사, 전문가 영상 선택 재생을 공개 390px에서 실제 사용 순서로 재감리했다.
- 연구 지도 선택 후 `피부 연구 결과`와 다음 `근육 연구 결과`가 읽기 레일 아래에 정렬됐고, 직접 `#final` 진입은 `이야기 공유`, `12 / 12`와 제목 맥락을 복원했다. 실제 마우스 이벤트 복사는 `복사 완료` 및 성공 상태를 표시했다.
- UI 상태·가로 폭·포커스·iframe·브라우저 오류를 확인했으며 새 CRITICAL/MAJOR 결함은 없었다. 브라우저 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했고, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-RESEARCH-FLOW-20261005, E-LIVE-PUBLIC-DIRECT-FINAL-CONTEXT-20261005, E-LIVE-PUBLIC-TRUSTED-SHARE-COPY-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-FLOW-20261005.

## Release Recheck — 8605724 — 2026-10-05

- 좁은 모바일 헤더의 280·300·320·360·390px 배치와 390px 메뉴의 키보드 흐름을 공개 URL에서 재감리했다. 각 컨트롤은 겹치지 않고 44px 이상 터치 영역을 유지했으며, 메뉴 포커스 트랩·Escape 닫힘·토글 복귀가 확인됐다.
- 공개 캐시 비활성화 Chrome CDP fallback에서 모든 폭의 scrollWidth가 뷰포트와 일치했고 runtimeErrors 0이었다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 브라우저 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-NARROW-HEADER-KEYBOARD-20261005, E-LIVE-PUBLIC-MOBILE-MENU-KEYBOARD-20261005.

## Release Recheck — 2c1bca9 — 2026-10-05

- 태블릿·데스크톱에서 모바일 전용 줄바꿈 span이 숨겨지며 발견 섹션 제목의 공백이 사라지는 잔여 한국어 퍼블리싱 리스크를 확인했다. PR #331에서 공백을 span 밖으로 보정하고 UI 계약에 전용 회귀 검사를 추가했다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. PR #331 checks와 main workflow `37290461697`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 모두 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 공개 manifest candidate `2c1bca9eacd16149debff1a580155996b335987e`는 HTTP 200, STATIC, 12 공개 claims, 6 research records, 1 product, 6 share pages, teaser HOLD를 유지한다. 캐시를 비활성화한 Chrome CDP fallback 공개 390·768·1440px에서 발견 제목의 자연스러운 textContent, scrollWidth 390·753·1425, 접근성 기본 검사와 runtimeErrors 0을 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다. 브라우저 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-HISTORY-HEADING-SPACING-20261005, E-UI-CONTRACT-HISTORY-HEADING-SPACING-20261005, E-DEPLOY-PIPELINE-HISTORY-HEADING-SPACING-20261005, E-LIVE-PUBLIC-HISTORY-HEADING-SPACING-20261005.

## Release Recheck — 9c1a5cf — 2026-10-05

- 첫 화면 H1과 장 제목의 줄바꿈 경계에서 한국어 단어가 붙어 보이거나 텍스트 구조에서 공백이 사라지는 잔여 퍼블리싱 리스크를 확인했다. PR #328에서 장 제목을, PR #329에서 H1·정적 no-script 제목을 명시적 공백으로 보정하고 UI 계약에 회귀 검사를 추가했다.
- UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. PR #328 main workflow `37287592876`과 PR #329 main workflow `37288363450`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 모두 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 공개 manifest candidate `9c1a5cf0200a46f8505ce471f0c67f46c27a1724`는 HTTP 200, STATIC, 12 공개 claims, 6 research records, 1 product, 6 share pages, teaser HOLD를 유지한다. 캐시를 비활성화한 Chrome CDP fallback 공개 320·390·768·1024·1440px에서 H1과 14개 H2의 textContent가 자연스러운 공백을 보존하고 scrollWidth가 320·390·753·1009·1425px으로 일치하며 runtimeErrors 0을 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다. 브라우저 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-KOREAN-HEADING-SPACING-20261005, E-UI-CONTRACT-KOREAN-HEADING-SPACING-20261005, E-DEPLOY-PIPELINE-KOREAN-HEADING-SPACING-20261005, E-LIVE-PUBLIC-KOREAN-HEADING-SPACING-20261005.

## Release Recheck — a18561f — 2026-10-05

- 390px 모바일 연구 비교 도표에서 `GABA를 바른 조건` 범례가 세 칸 헤더 안에서 음절 단위로 깨지는 잔여 인포그래픽 리스크를 확인했다. PR #326에서 430px 이하 범례를 `변화 방향 → 비교 조건 → GABA 조건`의 세로 읽기 순서로 재배치하고 조건명을 한 줄로 보존했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. Chrome CDP 로컬 390·320·280px에서 범례 세 항목이 각각 한 줄로 표시되고 `scrollWidth`가 뷰포트와 일치했으며, 메뉴·큰 글씨·연구 카드 상호작용 회귀도 런타임 오류 없이 통과했다.
- PR #326 checks와 main workflow `37284733229`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 모두 성공했다. Worker는 STATIC_ONLY로 건너뛰었다. 공개 manifest candidate `a18561f8b00a6f808e8ee858c9e833089537f3e4`는 HTTP 200, STATIC, 12 공개 claims, 6 research records, 1 product, teaser HOLD를 유지한다.
- 캐시를 비활성화한 Chrome CDP fallback 공개 390px에서 세 범례가 온전히 세로 표시되고 `scrollWidth=390`, 1440px에서 기존 좌우 비교 도표와 `scrollWidth=1425`를 확인했다. 브라우저 플러그인 부재와 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-COMPARISON-LEGEND-20261005, E-UI-CONTRACT-MOBILE-COMPARISON-LEGEND-20261005, E-DEPLOY-PIPELINE-MOBILE-COMPARISON-LEGEND-20261005, E-LIVE-PUBLIC-MOBILE-COMPARISON-LEGEND-20261005.

## Release Recheck — 726fe8a8 — 2026-10-05

- 280–1440px Chrome CDP 시각 점검에서 상단 읽기 진행 레일이 나타나는 전환 순간 히어로 이미지가 보조 문구에 비치는 잔여 가독성 리스크를 확인했다. PR #324에서 v111 레일의 opacity 전환을 제거하고 transform만 전환하도록 보정해 불투명한 흰색 표면을 즉시 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 280·300·320·360·390px 헤더는 겹침 없음·44px 터치 영역·가로 넘침 없음·런타임 오류 없음으로 확인했고, 큰 글씨 모드도 유지했다. 390px 전문가 영상 선택은 즉시 iframe 재생·포커스 이동·가로 폭 390px을 유지했다.
- PR #324 checks와 main workflow `37282401884`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 모두 성공했다. Worker는 STATIC_ONLY로 건너뛰었다. 공개 manifest candidate `726fe8a85f5729c780d5da21dee36f4fa86d6412`는 HTTP 200, STATIC, 12 공개 claims, 6 research records, 1 product, teaser HOLD를 유지한다.
- 캐시를 비활성화한 Chrome CDP fallback 공개 390·768·1024·1440px에서 연구·전문가 영상·마지막 장 직접 진입이 고정 헤더·읽기 레일 아래에 정렬되고 `scrollWidth`는 390·753·1009·1425px이었다. 브라우저 플러그인 부재와 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-READING-RAIL-OPAQUE-20261005, E-UI-CONTRACT-READING-RAIL-OPAQUE-20261005, E-DEPLOY-PIPELINE-READING-RAIL-OPAQUE-20261005, E-LIVE-PUBLIC-READING-RAIL-OPAQUE-20261005.

## Release Recheck — 2ca5a8a — 2026-10-05

- 장문 공개 안내서의 `content-visibility:auto` 하위 장이 초기 900px 예약값과 실제 카드·영상·공유 영역의 높이가 달라 처음 깊은 장면을 방문할 때 다음 장면이 밀리는 퍼블리싱 리스크를 확인했다. PR #322에서 v110 화면 폭별 `contain-intrinsic-size` 예약 높이를 적용했다.
- 로컬 Chrome CDP fallback 레이아웃 감사에서 390·768·1024·1440px을 순차 방문했다. 방문 전·후 섹션 위치 차이는 모바일 1–5px의 반올림·스크롤 앵커링, 768px 1px, 1024px·1440px 0px로 확인됐고, `scrollWidth`는 각각 390·753·1009·1425px이었다.
- PR #322 checks와 main workflow `37280003369`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 모두 성공했다. Worker는 STATIC_ONLY로 건너뛰었다. 공개 manifest candidate `2ca5a8a264321c7d9fa16e0fe2cb63a5aed4694f`는 HTTP 200, STATIC, 12 공개 claims, 6 research records, 1 product, teaser HOLD를 유지한다.
- 캐시를 비활성화한 Chrome CDP fallback 공개 390·768·1024·1440px에서 `#research-skin`, `#expert-videos`, `#final` 직접 진입이 고정 헤더·읽기 레일 아래에 정렬되고 가로 넘침이 없음을 확인했다. 브라우저 플러그인이 연결되지 않아 CDP fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-DEFERRED-CHAPTER-STABILITY-20261005, E-UI-CONTRACT-DEFERRED-CHAPTER-STABILITY-20261005, E-DEPLOY-PIPELINE-DEFERRED-CHAPTER-STABILITY-20261005, E-LIVE-PUBLIC-DEFERRED-CHAPTER-STABILITY-20261005.

## Release Recheck — 2226541 — 2026-10-05

- 1440px 데스크톱 hero 사진 위의 `아래로 읽기` 안내가 배경과 충분히 분리되지 않아 긴 안내서의 다음 읽기 방향이 약하게 보일 수 있는 잔여 퍼블리싱 리스크를 확인했다. PR #320에서 701px 이상 안내를 반투명 흰색 pill·테두리·그림자·blur로 보강하고 v109 UI 계약을 추가했다.
- PR #320의 필수 검사와 main workflow `37277241941`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 모두 성공했다. Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `22265413532d4264cb9640070a677aebbe66dbf7`은 HTTP 200, STATIC, 12 공개 claims, 6 research records, 1 product, teaser HOLD를 유지한다. 캐시를 비활성화한 Chrome CDP fallback 공개 1440px에서 안내의 테두리·반투명 배경·blur와 `scrollWidth=1425`를, 390px에서 모바일 안내와 `scrollWidth=390`을 확인했다.
- 정적 계약·배포 정합성·대표 데스크톱·모바일 렌더는 확인했지만 브라우저 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-DESKTOP-READING-CUE-20261005, E-UI-CONTRACT-DESKTOP-READING-CUE-20261005, E-DEPLOY-PIPELINE-DESKTOP-READING-CUE-20261005, E-LIVE-PUBLIC-DESKTOP-READING-CUE-20261005.

## Release Recheck — 2c7433b — 2026-10-05

- 381–430px 모바일 헤더에서 메뉴 아이콘이 이름이 표시된 읽기 크기 버튼과 겹쳐 보이는 실제 렌더 결함을 확인했다. PR #318에서 v108 간격 규칙으로 메뉴를 읽기 크기 버튼 왼쪽에 12px 간격으로 배치했다.
- PR #318의 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. main workflow `37275123302`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 모두 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `2c7433b144ef1930e7b7a21c744dd468d751e431`은 HTTP 200, STATIC, 12 공개 claims, 6 research records, 1 product, teaser HOLD를 유지한다. 캐시를 비활성화한 Chrome CDP fallback 공개 320·350·381·390·430px에서 헤더 컨트롤 겹침 0건과 각 뷰포트 `scrollWidth` 일치를 확인했다.
- 정적 계약·배포 정합성·대표 모바일 렌더는 확인했지만 브라우저 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-NARROW-HEADER-SPACING-20261005, E-UI-CONTRACT-NARROW-HEADER-SPACING-20261005, E-DEPLOY-PIPELINE-NARROW-HEADER-SPACING-20261005, E-LIVE-PUBLIC-NARROW-HEADER-SPACING-20261005.

## Release Recheck — 030f43a — 2026-10-05

- 320px 좁은 모바일 연구 비교 도표에서 비교 조건·GABA 조건 레이블이 한 줄 고정으로 화면 밖으로 밀려나는 실제 렌더 결함을 확인했다. PR #316에서 430px 이하 도표 헤더를 grid로 재배치하고 레이블의 최소 폭·줄바꿈·overflow-wrap을 보강했으며 UI 계약에 v107 회귀 조건을 추가했다.
- PR #316의 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. main workflow `37273248778`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 모두 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `030f43a6b481a22311803c3e9d4d39c196cab23e`는 HTTP 200, STATIC, 12 공개 claims, 6 research records, 1 product, teaser HOLD를 유지한다. 캐시를 비활성화한 Chrome CDP fallback 공개 320·350·390·768px에서 각 뷰포트의 `scrollWidth`와 일치하고 overflowCount `0`을 확인했다.
- 정적 계약·배포 정합성·대표 모바일 렌더는 확인했지만 브라우저 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-NARROW-CHART-HEADER-20261005, E-UI-CONTRACT-NARROW-CHART-HEADER-20261005, E-DEPLOY-PIPELINE-NARROW-CHART-HEADER-20261005, E-LIVE-PUBLIC-NARROW-CHART-HEADER-20261005.

## Release Recheck — 80bd0f2 — 2026-10-05

- 모바일 hero 사진 위의 `아래로 읽기` 안내가 배경과 섞여 첫 화면의 다음 읽기 방향을 약하게 전달할 수 있는 잔여 퍼블리싱 리스크를 확인했다. PR #313에서 안내를 반투명 흰색 pill·테두리·그림자로 보강하고 UI 계약에 대비 조건을 추가했다.
- PR #313의 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. TF heartbeat 자동 PR 생성 제한으로 초기 배포가 신선도 게이트에서 대기했지만, PR #314를 보호된 메인에 반영한 뒤 최종 workflow `37271282282`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 모두 성공했다. Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `80bd0f223dcf75e10b63ac13d7115135e845a8cb`는 HTTP 200, STATIC, 12 공개 claims, 6 연구 records, 1 product, teaser HOLD를 유지한다. Chrome CDP fallback 공개 390×844에서 `아래로 읽기`가 `rgba(255,255,255,.78)` pill과 테두리로 표시되고, 큰 글씨 토글 뒤에도 `scrollWidth=390px`를 확인했다.
- 정적 계약·배포 정합성·대표 모바일 렌더는 확인했지만 브라우저 플러그인이 연결되지 않아 Chrome CDP fallback을 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-READING-CUE-CONTRAST-20261005, E-UI-CONTRACT-MOBILE-READING-CUE-CONTRAST-20261005, E-DEPLOY-PIPELINE-MOBILE-READING-CUE-CONTRAST-20261005, E-LIVE-PUBLIC-MOBILE-READING-CUE-CONTRAST-20261005.

## Release Recheck — 21a34c7 — 2026-10-05

- 모바일 공개 메뉴에서 장면을 선택해도 body 스크롤 잠금과 smooth scroll이 경합해 `발견` 섹션으로 이동하지 않는 실제 사용 흐름 결함을 확인했다. PR #311에서 메뉴가 열려 있던 경우 즉시 스크롤을 사용하도록 보정하고 UI 계약에 회귀 조건을 추가했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산을 통과했다. PR #311 checks와 main workflow `37269235739`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `21a34c7964a72c5fbb48eedba972a10da419f22c`는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages를 유지한다. Chrome CDP fallback 공개 렌더에서 390px 메뉴 열기→발견 선택 후 메뉴 닫힘, `scrollY=1660`, 제목 top `132.1px`, 가로 넘침 없음을 확인했다.
- 정적 계약·배포 정합성은 확인했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-MENU-NAVIGATION-20261005, E-UI-CONTRACT-MOBILE-MENU-NAVIGATION-20261005, E-DEPLOY-PIPELINE-MOBILE-MENU-NAVIGATION-20261005, E-LIVE-PUBLIC-MOBILE-MENU-NAVIGATION-20261005.

## Release Recheck — fb3d19c — 2026-10-05

- 모바일 연구 결과 카드의 제목과 결과 한 줄이 같은 flex 행에서 폭을 경쟁해 제목이 세로로 찌그러지고 요약이 옆에서 겹치는 실제 공개 렌더 결함을 확인했다. PR #309에서 카드 헤더를 grid로 보정해 제목을 읽을 수 있는 폭으로 유지하고 결과 요약을 제목 아래 전체 폭에 배치했다.
- UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. PR #309 checks와 main workflow `37267840225`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `fb3d19c64e54f238d32d859c5d63a39898889250`는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records를 유지한다. Chrome CDP fallback 공개 렌더에서 390px 결과 카드의 제목·결과 요약 비겹침과 가로 넘침 없음, 1440px 정렬을 확인했다.
- 정적 계약·배포 정합성은 확인했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-RESEARCH-CARD-LAYOUT-20261005, E-UI-CONTRACT-MOBILE-RESEARCH-CARD-LAYOUT-20261005, E-DEPLOY-PIPELINE-MOBILE-RESEARCH-CARD-LAYOUT-20261005, E-LIVE-PUBLIC-MOBILE-RESEARCH-CARD-LAYOUT-20261005.

## Release Recheck — 85ec17f — 2026-10-05

- 발효·안전 다음 장면과 성장 연구 다음 장면이 암묵적으로 끊기던 편집 리스크를 확인하고 PR #307에서 두 handoff를 추가했다. 모바일은 현재 장면·구분선·다음 장면 순서로 읽히고 데스크톱은 한 줄의 editorial rail로 읽힌다.
- UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. PR #307 checks와 main workflow `37266107250`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 candidate `85ec17fc17b7816096e98b1b995b1b1d5f72953b`는 HTTP 200, STATIC, 71 bundle hashes와 제품 독립 공개 경계를 유지했다. Chrome CDP fallback 공개 렌더에서 390px·1440px 모두 가로 넘침이 없고 두 handoff 요소가 존재했다.
- 정적 계약·배포 정합성은 확인했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-EDITORIAL-HANDOFFS-20261005, E-UI-CONTRACT-EDITORIAL-HANDOFFS-20261005, E-DEPLOY-PIPELINE-EDITORIAL-HANDOFFS-20261005, E-LIVE-PUBLIC-EDITORIAL-HANDOFFS-20261005.

## Release Recheck — 31fcd55 — 2026-10-05

- 연구 규모 카드에서 하버드·옥스퍼드의 동일 PubMed 검색과 GABA-A 수용체의 별도 SCIE 분석이 큰 숫자만으로 한 비교처럼 읽힐 수 있는 잔여 퍼블리싱 리스크를 확인했다. PR #305에서 숫자보다 앞에 비교 범위 레일을 추가하고 모바일에서는 범위를 세로로 쌓았다.
- 연구 수치·연구 원문·공개 카피·제품 독립 공개 경계는 변경하지 않았다. UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했고 초기 JS 311199 bytes, 초기 CSS 95703 bytes, 전체 assets 1612265 bytes로 예산 안이다.
- PR #305 checks와 main workflow 37264643742의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다. 공개 candidate `31fcd55abdab529653c8d19539b3e88ef651a33a`는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, 제품 독립 경계를 유지했다.
- 정적 계약·배포 정합성은 확인했지만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-SCALE-SCOPE-20261005, E-UI-CONTRACT-RESEARCH-SCALE-SCOPE-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCALE-SCOPE-20261005, E-LIVE-PUBLIC-RESEARCH-SCALE-SCOPE-20261005.

## Release Recheck — 5ebcfaa — 2026-10-05

- 모바일 첫 화면에서 긴 안내서가 아래로 이어진다는 시각적 방향이 약하고 회복 브리지의 작은 제목이 어색하게 끊기던 퍼블리싱 리스크를 확인했다. PR #303에서 hero 하단 읽기 큐와 reduced-motion 모션 차단을 추가하고, 작은 제목을 '수면과 회복의 연결'로 정리했다.
- 연구 수치·출처·공개 카피·즉시 재생·공유 URL·제품 독립 공개 경계는 변경하지 않았다. NAVI 로컬 감사는 개인정보나 주문 행 없이 `IN_PROGRESS_WITH_GATES`, local checks `WAITING`, `auditFailed=false`, `publicExportChanged=false`를 유지했다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311199 bytes, 초기 CSS 95703 bytes, 전체 assets 1610564 bytes로 예산 안이다.
- PR #303 checks와 main workflow 37263567643의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 5ebcfaa906f03a8b8b0755bb9dd1a0b780643458은 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 정적 계약·배포 정합성은 확인했지만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-READING-CUE-20261005, E-UI-CONTRACT-MOBILE-READING-CUE-20261005, E-DEPLOY-PIPELINE-MOBILE-READING-CUE-20261005, E-LIVE-PUBLIC-MOBILE-READING-CUE-20261005.

## Release Recheck — 72f3cd9 — 2026-10-05

- 공개 GABA 안내서가 제품·주문 콘텐츠를 사용하지 않는데도 앱 셸에서 공용 콘텐츠를 먼저 요청하던 성능·경계 리스크를 확인하고, PR #301에서 guide·account·local admin·operations 경로의 공용 콘텐츠 로딩을 차단했다. 연구·제품·공유·챌린지 경로는 기존 로딩을 유지했다.
- 공개 연구 수치·출처·카피·즉시 재생·공유 URL·제품 독립 공개 경계는 변경하지 않았다. NAVI 로컬 감사는 개인정보나 주문 행 없이 `IN_PROGRESS_WITH_GATES`, local checks `WAITING`, `auditFailed=false`, `publicExportChanged=false`를 유지했다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311199 bytes, 초기 CSS 95703 bytes, 전체 assets 1610007 bytes로 예산 안이다.
- PR #301 checks와 main workflow 37262103043의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 72f3cd986633974a46aca460eaa23e3c05ccce11은 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 정적 계약·배포 정합성은 확인했지만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005, E-UI-CONTRACT-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005, E-DEPLOY-PIPELINE-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005, E-LIVE-PUBLIC-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005.

## Release Recheck — 594352e — 2026-10-05

- 모바일 연구 지도 중심의 현재 주제 문구가 9px까지 축소되어 고령 독자의 빠른 방향 파악을 방해할 수 있고, 지도 자체가 보조기기에 하나의 선택 그룹으로 전달되지 않을 수 있는 잔여 퍼블리싱 리스크를 확인했다. PR #299에서 연구 지도를 named `group`으로 고정하고 각 주제 버튼에 `aria-pressed` 선택 상태를 추가했으며, 중심 현재 주제 문구를 모바일 11px·큰 글씨 모드 12px로 보강했다.
- 연구 수치·출처·공개 카피·즉시 재생·공유 URL·제품 독립 공개 경계는 변경하지 않았다. NAVI 로컬 감사도 개인정보나 주문 행 없이 `IN_PROGRESS_WITH_GATES`, local checks `WAITING`, `auditFailed=false`, `publicExportChanged=false`를 유지했다.
- 로컬 UI 계약 v103, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1609965 bytes로 예산 안이다.
- PR #299 checks, main workflow 37260971979의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 594352e3c39b3eb15aee6095d4245cabaa5272d8는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 정적 계약·배포 정합성은 확인했지만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-CONTEXT-20261005, E-UI-CONTRACT-RESEARCH-MAP-CONTEXT-20261005, E-DEPLOY-PIPELINE-RESEARCH-MAP-CONTEXT-20261005, E-LIVE-PUBLIC-RESEARCH-MAP-CONTEXT-20261005.

## Release Recheck — 4b30428 — 2026-10-05

- 연구 확장 지도와 전문가 영상 갤러리에서 선택 동작이 시각적으로는 이동·재생되지만 보조기기에는 연결된 읽기 대상이 명시되지 않을 수 있는 잔여 읽기 연결 리스크를 확인했다. PR #297에서 연구 주제 버튼에 `aria-controls=research-flow`를 추가하고 연구 결과 영역을 명명된 `region`으로 고정했으며, 전문가 영상 카드에도 대표 영상 영역 연결을 명시하고 선택·포커스 상태를 시각적으로 구분했다.
- 연구 수치·출처·공개 카피·즉시 재생·공유 URL·제품 독립 공개 경계는 변경하지 않았다. 빈 로컬 주문 입력 매니페스트에도 개인정보나 주문 행을 추가하지 않았고, NAVI 로컬 감사는 `IN_PROGRESS_WITH_GATES`, local checks `WAITING`, `auditFailed=false`, `publicExportChanged=false`를 유지했다.
- 로컬 UI 계약 v102, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1609520 bytes로 예산 안이다.
- PR #297 checks, main workflow 37259915121의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 4b30428ce6cb048373b1f7d03eb36ce674234a55는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 정적 계약·배포 정합성은 확인했지만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-VIDEO-DESTINATION-20261005, E-UI-CONTRACT-RESEARCH-VIDEO-DESTINATION-20261005, E-DEPLOY-PIPELINE-RESEARCH-VIDEO-DESTINATION-20261005, E-LIVE-PUBLIC-RESEARCH-VIDEO-DESTINATION-20261005.

## Release Recheck — a796f3d — 2026-10-05

- 전문가 영상 게시판의 한국어 헤더에 영문식 자간이 남아 주제와 영상 수가 벌어져 보일 수 있는 퍼블리싱 리스크를 확인했다. PR #295에서 한국어 자간을 자연스럽게 보정하고, 각 주제 필터가 연결되는 영상 목록을 `aria-controls`로 명시했다. 기존 주제 pill·영상 수·live 상태·즉시 재생·공유 URL·제품 독립 공개 경계는 유지했다.
- 빈 로컬 주문 입력 매니페스트에는 개인정보나 주문 행을 추가하지 않고 목표 ID·빈 입력 배열 계약만 복구했다. NAVI 로컬 감사는 `IN_PROGRESS_WITH_GATES`, local checks `WAITING`, `auditFailed=false`, `publicExportChanged=false`로 정상 분류됐다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1609025 bytes로 예산 안이다.
- PR #295 필수 checks, main workflow 37258419309의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate a796f3d595acf7ebd5bad70ad8896d0e086116ec는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 정적 계약·배포 정합성은 확인했지만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-KOREAN-VIDEO-BOARD-TYPE-20261005, E-UI-CONTRACT-KOREAN-VIDEO-BOARD-TYPE-20261005, E-DEPLOY-PIPELINE-KOREAN-VIDEO-BOARD-TYPE-20261005, E-LIVE-PUBLIC-KOREAN-VIDEO-BOARD-TYPE-20261005.

## Release Recheck — 02ad4cc — 2026-10-05

- 전문가 영상 갤러리의 주제 필터를 바꿔도 현재 주제·표시 영상 수·선택 영상이 보조기기에 즉시 전달되지 않을 수 있는 맥락 손실 리스크를 확인했다. PR #293에서 주제 pill, 영상 수, polite live 상태 안내, 필터·영상 카드의 완전한 접근 가능한 이름을 추가했다. 기존 즉시 재생·공유 URL·제품 독립 공개 경계는 유지했다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1608845 bytes로 예산 안이다.
- PR #293 필수 checks, main workflow 37257033514의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 02ad4ccf8f83560f858b89d3ed3cd214d6e46800는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 정적 계약·배포 정합성은 확인했지만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-VIDEO-FILTER-CONTEXT-20261005, E-UI-CONTRACT-VIDEO-FILTER-CONTEXT-20261005, E-DEPLOY-PIPELINE-VIDEO-FILTER-CONTEXT-20261005, E-LIVE-PUBLIC-VIDEO-FILTER-CONTEXT-20261005.

## Release Recheck — efb3f20 — 2026-10-05

- 연구 카드를 읽은 뒤 출처 읽기 장면에서 공유하면 선택한 연구의 제목·관찰 결과·딥링크가 유지되지 않고 일반 출처 읽기 장으로 공유될 수 있는 맥락 손실 리스크를 확인하고 PR #291에서 `research`·`reading-note` 장면의 공유 대상을 선택 연구로 연결했다. 연구 선택 공유는 `research-{id}` 해시와 연구별 제목·관찰 결과 문장을 사용하고, 전문가 영상과 다른 장의 공유 목적지는 기존대로 유지한다. 연구 수치·출처 데이터·공개 카피·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1607925 bytes로 예산 안이다.
- PR #291 필수 checks, main workflow 37255772910의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate efb3f20540f88c0909e89826238c7d70f9c7ab50는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 선택 연구 공유의 정적 계약·배포 정합성은 확인했지만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-SHARE-CONTEXT-20261005, E-UI-CONTRACT-RESEARCH-SHARE-CONTEXT-20261005, E-DEPLOY-PIPELINE-RESEARCH-SHARE-CONTEXT-20261005, E-LIVE-PUBLIC-RESEARCH-SHARE-CONTEXT-20261005.

## Release Recheck — 4143e45 — 2026-10-05

- 연구 카드를 읽은 뒤 출처 읽기 패널이 첫 연구로 고정되어 다른 주제의 대상·측정 항목·설계와 원문 출처가 어긋나 보일 수 있는 흐름 리스크를 확인하고 PR #289에서 `activeResearchTopic`을 출처 읽기 패널과 동기화했다. 직접 출처 읽기 진입은 인지 연구를 기본으로 유지하고, 연구 선택 후에는 선택된 연구의 출처·대상·측정 항목·설계를 보여 준다. 연구 수치·출처 데이터·공개 카피·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1607759 bytes로 예산 안이다.
- PR #289 필수 checks, main workflow 37254552858의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 4143e45fb6b19f8f1b8adc77712c9f7f1bde85cf는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 출처 읽기 동기화의 정적 계약·배포 정합성은 확인했지만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-CONTEXTUAL-SOURCE-20261005, E-UI-CONTRACT-CONTEXTUAL-SOURCE-20261005, E-DEPLOY-PIPELINE-CONTEXTUAL-SOURCE-20261005, E-LIVE-PUBLIC-CONTEXTUAL-SOURCE-20261005.

## Release Recheck — 7c409a1 — 2026-10-05

- 모바일 출처 읽기 패널의 네 가지 질문이 단순 목록으로 보여 연구를 읽는 순서와 원문 출처로 넘어가는 흐름이 약해질 수 있는 편집 리스크를 확인하고 PR #287에서 번호를 하나의 세로 읽기 레일로 연결했다. 원문 출처 카드의 우측 여백을 줄여 긴 한글 출처명이 자연스럽게 읽히도록 보정했다. 연구 수치·출처 데이터·공개 카피·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1607672 bytes로 예산 안이다.
- PR #287 필수 checks, main workflow 37253350843의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 7c409a1e6aa80cf0bebc462fbce8741b284a79d4는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 출처 읽기 레일의 정적 계약·배포 정합성은 확인했지만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-SOURCE-RAIL-20261005, E-UI-CONTRACT-MOBILE-SOURCE-RAIL-20261005, E-DEPLOY-PIPELINE-MOBILE-SOURCE-RAIL-20261005, E-LIVE-PUBLIC-MOBILE-SOURCE-RAIL-20261005.

## Release Recheck — 3904b39 — 2026-10-05

- 좁은 모바일에서 연구·국내외 활용·전문가 영상의 다음 장면 연결부가 flex 줄바꿈에 따라 현재 맥락과 다음 읽을 장면의 순서가 흐려질 수 있는 편집 리스크를 확인하고 PR #285에서 430px 이하 화면을 현재 맥락 → 구분선 → 다음 장면의 grid 리듬으로 정리했다. 연구 수치·출처 데이터·공개 카피·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1607262 bytes로 예산 안이다.
- PR #285 필수 checks, main workflow 37252460081의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 3904b39eacd708d34a3842023c0884c3aa8449b5는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 모바일 연결부의 정적 계약·배포 정합성은 확인했지만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-HANDOFF-20261005, E-UI-CONTRACT-MOBILE-HANDOFF-20261005, E-DEPLOY-PIPELINE-MOBILE-HANDOFF-20261005, E-LIVE-PUBLIC-MOBILE-HANDOFF-20261005.

## Release Recheck — b343def — 2026-10-05

- 430px 이하 휴대폰에서 연구 결과 비교 레인이 좌우로 압축되어 비교 조건과 GABA 결과를 한눈에 대조하기 어려울 수 있는 인포그래픽 리스크를 확인하고 PR #283에서 두 레인을 세로 순서로 배치하고 GABA 결과에 좌측 teal 표식을 추가했다. 연구 수치·출처 데이터·공개 카피·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1606109 bytes로 예산 안이다.
- PR #283 필수 checks, main workflow 37251345872의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate b343def175eb3d65b3ee844c4cb14a2e4ba9f2ea는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 좁은 모바일 비교 레인의 정적 계약·배포 정합성은 확인했지만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-NARROW-COMPARISON-20261005, E-UI-CONTRACT-NARROW-COMPARISON-20261005, E-DEPLOY-PIPELINE-NARROW-COMPARISON-20261005, E-LIVE-PUBLIC-NARROW-COMPARISON-20261005.

## Release Recheck — de91cbb — 2026-10-05

- 모바일에서 복원된 장 맥락 문구가 13px·긴 행간·시각적 구분 부족으로 고령 독자에게 약하게 보일 수 있는 편집 리스크를 확인하고 PR #281에서 14px·26ch·행간 1.65·좌측 포인트 라인으로 읽기 우선순위를 보강했다. 연구 수치·출처 데이터·공개 카피·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1605695 bytes로 예산 안이다.
- PR #281 필수 checks, main workflow 37250175467의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate de91cbb35dbc1c7c58451c13d0ad10398851f822는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 모바일 맥락 문구의 정적 계약·배포 정합성은 확인했지만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-CONTEXT-FLOOR-20261005, E-UI-CONTRACT-MOBILE-CONTEXT-FLOOR-20261005, E-DEPLOY-PIPELINE-MOBILE-CONTEXT-FLOOR-20261005, E-LIVE-PUBLIC-MOBILE-CONTEXT-FLOOR-20261005.

## Release Recheck — b98df10 — 2026-10-05

- 모바일에서 장 제목만 남아 장면의 의미와 다음 내용이 끊겨 보일 수 있는 편집 리스크를 확인하고 PR #279에서 700px 이하 화면의 섹션 제목 아래에 짧은 보조 맥락 문구를 복원했다. 문구는 28ch 이내·13px·행간 1.7로 제한해 정보량을 늘리지 않고 흐름만 보강했다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1605454 bytes로 예산 안이다.
- PR #279 필수 checks, main workflow 37248925292의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate b98df102dda6a54ac2fd2d570d6f0248e7c465b3는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 모바일 맥락 문구의 정적 계약·배포 정합성은 확인했지만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-CHAPTER-CONTEXT-20261005, E-UI-CONTRACT-MOBILE-CHAPTER-CONTEXT-20261005, E-DEPLOY-PIPELINE-MOBILE-CHAPTER-CONTEXT-20261005, E-LIVE-PUBLIC-MOBILE-CHAPTER-CONTEXT-20261005.

## Release Recheck — 13450f2 — 2026-10-05

- 읽기 진행 표시의 화면용 메타와 보조기기용 라이브 문맥이 같은 status 영역에 섞여 전달될 수 있는 접근성 리스크를 확인하고 PR #277에서 시각 메타를 `aria-hidden`으로 분리한 뒤 현재 장·연구 문맥을 별도 `role=status` 라이브 영역으로 제공했다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1605263 bytes로 예산 안이다.
- PR #277 필수 checks, main workflow 37248181705의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 13450f232c0b75ea337c05aa6fbb3cb53ef0ae3f는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 접근성 구조·정적 배포 정합성은 확인했지만 실제 스크린리더 조합, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-READING-LIVE-CONTEXT-20261005, E-UI-CONTRACT-READING-LIVE-CONTEXT-20261005, E-DEPLOY-PIPELINE-READING-LIVE-CONTEXT-20261005, E-LIVE-PUBLIC-READING-LIVE-CONTEXT-20261005.

## Release Recheck — 0d4981d — 2026-10-05

- 한글 제목이 모바일 폭에서 어색하게 끊기거나 본문 설명이 불필요하게 분절될 수 있는 편집 리스크를 확인하고 PR #275에서 지원 브라우저의 주요 디스플레이 제목에 `text-wrap:balance`, 주요 본문 설명에 `text-wrap:pretty`를 적용했다. 연구 카드·공개 카피·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1605221 bytes로 예산 안이다.
- PR #275 필수 checks, main workflow 37247369428의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 0d4981dd42fd3b394d5a35db28fbfc3c13b3399d는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 타이포그래피 규칙·정적 배포 정합성은 확인했지만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TYPOGRAPHY-WRAP-20261005, E-UI-CONTRACT-TYPOGRAPHY-WRAP-20261005, E-DEPLOY-PIPELINE-TYPOGRAPHY-WRAP-20261005, E-LIVE-PUBLIC-TYPOGRAPHY-WRAP-20261005.

## Release Recheck — 98c59eb — 2026-10-05

- 장문의 공개 안내서에서 아직 읽지 않은 하단 편집 섹션이 모바일 첫 화면 계산에 참여할 수 있는 퍼블리싱 성능 리스크를 확인하고 PR #273에서 국내외 활용·발효·성장·전문가 영상·출처·공유 섹션에 `content-visibility:auto`와 `contain-intrinsic-size:900px`를 적용했다. 연구 카드의 활성 주제 IntersectionObserver 영역은 제외했다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1604682 bytes로 예산 안이다.
- PR #273 필수 checks, main workflow 37246552896의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 98c59eb3a683a2f5dd51093ede4efe7a78f6ebfc는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 정적 계약과 라이브 배포 정합성은 확인했지만 실제 브라우저의 렌더 지연·스크롤 체감 측정, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-PROGRESSIVE-PUBLISHING-20261005, E-UI-CONTRACT-PROGRESSIVE-PUBLISHING-20261005, E-DEPLOY-PIPELINE-PROGRESSIVE-PUBLISHING-20261005, E-LIVE-PUBLIC-PROGRESSIVE-PUBLISHING-20261005.

## Release Recheck — 7eef131 — 2026-10-05

- 전문가 영상·썸네일이 선택될 때 외부 미디어 연결 준비가 늦어질 수 있는 모바일 로딩 리스크를 확인하고 PR #271에서 `i.ytimg.com` preconnect와 `i.ytimg.com`·`www.youtube.com` DNS prefetch를 진입 HTML에 추가했다. 기존 썸네일·iframe 지연 로딩은 유지했다.
- 로컬 UI 계약, typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1604402 bytes로 예산 안이다.
- PR #271 필수 checks, main workflow 37245784203의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 7eef1314d6aab545383153573a9cbbb021c6db00는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 연결 힌트의 정적 계약과 배포 정합성은 확인했지만 실제 브라우저 네트워크 waterfall, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MEDIA-HINTS-20261005, E-UI-CONTRACT-MEDIA-HINTS-20261005, E-DEPLOY-PIPELINE-MEDIA-HINTS-20261005, E-LIVE-PUBLIC-MEDIA-HINTS-20261005.

## Release Recheck — ee77f28 — 2026-10-05

- 연구 카드별 최신 IntersectionObserver 상태를 누적하지 않아 빠른 스크롤에서 현재 주제가 이번 콜백의 일부 항목에 좌우될 수 있는 잔여 흐름 리스크를 확인하고 PR #269에서 최신 상태 Map과 중복 발행 방지를 적용했다.
- 로컬 UI 계약(v88), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1604402 bytes로 예산 안이다.
- PR #269 필수 checks, main workflow 37245122445의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate ee77f2846932917ec1591b7e1ae4b985f57e1cde는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-OBSERVER-STATE-20261005, E-UI-CONTRACT-OBSERVER-STATE-20261005, E-DEPLOY-PIPELINE-OBSERVER-STATE-20261005, E-LIVE-PUBLIC-OBSERVER-STATE-20261005.

## Release Recheck — 7395768 — 2026-10-05

- 연구 카드 스크롤 중 짧은 구간에 여러 IntersectionObserver 이벤트가 발생해 현재 주제 라벨이 프레임마다 갱신될 수 있는 잔여 모바일 성능 리스크를 확인하고 PR #267에서 requestAnimationFrame 배칭과 React startTransition을 적용했다.
- 로컬 UI 계약(v87), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1604288 bytes로 예산 안이다.
- PR #267 필수 checks, main workflow 37244243638의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 7395768ec70c9047f9102233a1fb22e89fa660fc는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RAF-20261005, E-UI-CONTRACT-RAF-20261005, E-DEPLOY-PIPELINE-RAF-20261005, E-LIVE-PUBLIC-RAF-20261005.

## Release Recheck — 3007891 — 2026-10-05

- 연구 카드 스크롤 중 현재 연구 주제 상태 갱신이 일반 우선순위로 실행될 수 있는 모바일 반응성 리스크를 확인하고 PR #265에서 IntersectionObserver 갱신을 React startTransition으로 분리했다.
- 로컬 UI 계약(v86), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1604163 bytes로 예산 안이다.
- PR #265 필수 checks, main workflow 37243296161의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 30078911bfd1838f9c2595d68f781520c9fc7b82는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TRANSITION-20261005, E-UI-CONTRACT-TRANSITION-20261005, E-DEPLOY-PIPELINE-TRANSITION-20261005, E-LIVE-PUBLIC-TRANSITION-20261005.

## Release Recheck — 8e1e335 — 2026-10-05

- 모바일 스크롤로 현재 연구 주제가 바뀔 때 전체 연구 시각 요소가 반복 렌더링될 수 있는 성능 리스크를 확인하고 PR #263에서 ResearchGlyph·ResearchProfile·ResearchOutcomeChart를 React memo로 보호했다.
- 로컬 UI 계약(v85), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1604140 bytes로 예산 안이다.
- PR #263 필수 checks, main workflow 37242328341의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 8e1e3355605d9ca12c103beb7b447a7bd94194bd는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MEMO-20261005, E-UI-CONTRACT-MEMO-20261005, E-DEPLOY-PIPELINE-MEMO-20261005, E-LIVE-PUBLIC-MEMO-20261005.

## Release Recheck — 5519791 — 2026-10-05

- 연구 지도에서 선택 카드만 강조되고 지도 중심에는 현재 읽는 주제가 표시되지 않아 지도와 상세 카드의 연결을 즉시 이해하기 어려운 시각적 흐름 리스크를 확인하고 PR #261에서 GABA 중심 표시는 유지하면서 중앙에 현재 연구 주제 상태 라벨을 동기화했다.
- 로컬 UI 계약(v84), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1604100 bytes로 예산 안이다.
- PR #261 필수 checks, main workflow 37241358621의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 551979122680c2bccfcbfbdf2b420abfb7194564는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다. 실제 live PublicGabaGuide bundle에서도 현재 연구 주제 라벨을 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MAP-CURRENT-20261005, E-UI-CONTRACT-MAP-CURRENT-20261005, E-DEPLOY-PIPELINE-MAP-CURRENT-20261005, E-LIVE-PUBLIC-MAP-CURRENT-20261005.

## Release Recheck — efc6246 — 2026-10-05

- 연구 결과 카드에서 핵심 결과가 연구 구성과 도표 뒤로 밀릴 수 있는 모바일 읽기 리스크를 확인하고 PR #259에서 카드 제목 바로 아래 `결과 한 줄`을 배치했다. 도표 내부 요약의 중복 표시는 제거하고 결과 한 줄 → 연구 구성 → 시각 도표 → 상세 조건 → 원문 출처 순서로 정리했다.
- 로컬 UI 계약(v83), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 1808 modules, 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1603576 bytes로 예산 안이다.
- PR #259 필수 checks, main workflow 37240376184의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate efc624679105d2665b94a887e4866429451c4478은 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다. 실제 live PublicGabaGuide bundle에서도 `결과 한 줄`을 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESULT-FIRST-20261005, E-UI-CONTRACT-RESULT-FIRST-20261005, E-DEPLOY-PIPELINE-RESULT-FIRST-20261005, E-LIVE-PUBLIC-RESULT-FIRST-20261005.

## Release Recheck — e48acaa — 2026-10-05

- 시스템 `prefers-reduced-motion: reduce`를 선택한 독자에게 일부 공개 가이드 모션이 남을 수 있는 접근성 리스크를 확인하고 PR #257에서 전역 애니메이션·전환·smooth scrolling 비활성화 규칙과 v82 UI 계약을 추가했다.
- 로컬 UI 계약(v82), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1602625 bytes로 예산 안이다.
- PR #257 필수 checks, main workflow 37239457353의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate e48acaa917d2063273757c12f715316ab585ecdb는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-REDUCED-MOTION-20261005, E-UI-CONTRACT-REDUCED-MOTION-20261005, E-DEPLOY-PIPELINE-REDUCED-MOTION-20261005, E-LIVE-PUBLIC-REDUCED-MOTION-20261005.

## Release Recheck — 7a111d8 — 2026-10-05

- 보호된 main 배포 게이트가 요구하는 TF pulse freshness가 만료되어 직전 배포가 중단된 것을 확인했다. 공개 콘텐츠·연구 데이터와 무관한 heartbeat 시각만 PR #255에서 갱신했고, `stateChanged=false`, `safeExecution=MET`를 유지했다.
- TF pulse freshness 검증은 `ageMinutes=0`, `maxAgeMinutes=480`으로 통과했다. PR #255의 `release-verify`·`site-quality-verify`와 main workflow 37238318730의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 7a111d831fecfa42e74c0947ca4f40238c912e37은 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- heartbeat 갱신은 내부 배포 게이트 기록만 보완했으며 연구 수치·출처 데이터·공개 카피는 변경하지 않았다. Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-TF-PULSE-HEARTBEAT-20261005, E-DEPLOY-PIPELINE-TF-PULSE-HEARTBEAT-20261005, E-LIVE-PUBLIC-TF-PULSE-HEARTBEAT-20261005, E-RELEASE-STATUS-TF-PULSE-HEARTBEAT-20261005.

## Release Recheck — c9b3eda — 2026-10-05

- 시각적 스크롤용 장 래퍼와 실제 읽기 포커스가 같다고 가정해 본문 장 제목 포커스가 누락될 수 있는 잔여 접근성 리스크를 확인했다. PR #254에서 `getGuideFocusTarget`을 분리해 `aria-labelledby`가 가리키는 실제 제목을 포커스 대상으로 사용하도록 보완했다.
- 로컬 UI 계약(v81), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1602449 bytes로 예산 안이다.
- PR #254 필수 checks, main workflow 37237686704의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate c9b3edabc6c11e4b0eae3a64479599dfed1bb077은 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-HEADING-FOCUS-20261005, E-UI-CONTRACT-GUIDE-HEADING-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-HEADING-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-HEADING-FOCUS-20261005.

## Release Recheck — d545013 — 2026-10-05

- 일반 장 메뉴·직접 장 딥링크가 화면만 이동하고 제목에 포커스를 남기지 않을 수 있는 잔여 접근성 리스크를 확인했다. PR #253에서 히어로·본문·회복·최종 장 제목을 프로그램 포커스 지점으로 만들고 메뉴 이동·hash 변경·직접 진입을 공통 제목 포커스 handoff로 연결했다.
- 로컬 UI 계약(v80), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1602350 bytes로 예산 안이다.
- PR #253 필수 checks, main workflow 37236810722의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate d5450135891a6e871561d4a1fe97e1820ca88701은 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-CHAPTER-FOCUS-20261005, E-UI-CONTRACT-GUIDE-CHAPTER-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-CHAPTER-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-CHAPTER-FOCUS-20261005.

## Release Recheck — 13cb639 — 2026-10-05

- 연구 카드를 공유 URL로 직접 열거나 연구 hash를 바꿀 때 화면만 이동하고 포커스가 제목에 남지 않을 수 있는 잔여 접근성 리스크를 확인했다. PR #252에서 초기 연구 딥링크와 hash 변경 모두 선택 연구 카드로 포커스를 이어가도록 보완했다.
- 로컬 UI 계약(v79), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1601665 bytes로 예산 안이다.
- PR #252 필수 checks, main workflow 37235537953의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 13cb6399b3ef5314e95f75c2edd649fab0fd41f9는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-UI-CONTRACT-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005.

## Release Recheck — 544ce7d — 2026-10-05

- 연구 지도에서 주제를 선택하거나 다음 연구로 이동할 때 선택 카드에 포커스를 이어주고, 각 연구 카드에 고유한 접근성 이름을 부여했다. 키보드·보조기기 사용자가 카드의 대상·결과·해석을 바로 읽을 수 있으며 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 로컬 UI 계약(v78), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1601525 bytes로 예산 안이다.
- PR #251 필수 checks, main workflow 37234697205의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 544ce7d3112a8f6a50e9813f85b1e421c4e41e4a는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-RESEARCH-FOCUS-20261005, E-UI-CONTRACT-GUIDE-RESEARCH-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-RESEARCH-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-RESEARCH-FOCUS-20261005.

## Release Recheck — b393393d — 2026-10-05

- 본문으로 이동 건너뛰기 링크의 대상 `main` landmark에 `tabIndex=-1`을 추가해, 키보드·보조기기 사용자가 본문 시작점에서 읽기를 이어갈 수 있도록 보완했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 로컬 UI 계약(v77), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1601308 bytes로 예산 안이다.
- PR #250 필수 checks, main workflow 37233770435의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate b393393d44d829bf5b735d3218cc4c8cde34aaa1는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-SKIP-FOCUS-20261005, E-UI-CONTRACT-GUIDE-SKIP-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-SKIP-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-SKIP-FOCUS-20261005.

## Release Recheck — bd2adafd — 2026-10-05

- 전문가 영상을 선택한 뒤 다른 장으로 이동하면 `view=guide`가 사라지고 이전 `video` query가 남아 새로고침·공유 대상이 현재 읽기 위치와 어긋날 수 있는 잔여 흐름 리스크를 확인하고 PR #249에서 guide 주소 갱신을 공통 처리했다. 장 이동은 guide 경로를 유지하면서 stale 영상 query를 정리하고, 전문가 영상 선택은 선택 ID를 보존하도록 보완했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 로컬 UI 계약(v76), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1601296 bytes로 예산 안이다.
- PR #249 필수 checks, main workflow 37232929565의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate bd2adafd5d1112f4f6cb0465a1f9c7e94a846454는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-GUIDE-ROUTE-CONTEXT-20261005, E-UI-CONTRACT-GUIDE-ROUTE-CONTEXT-20261005, E-DEPLOY-PIPELINE-GUIDE-ROUTE-CONTEXT-20261005, E-LIVE-PUBLIC-GUIDE-ROUTE-CONTEXT-20261005.

## Release Recheck — 7e9adf5 — 2026-10-05

- 첫 수면·회복 도입부를 진행에 포함한 뒤 본문 시각 번호 `01 · 발견`과 진행 레일의 `02 / 13`이 어긋날 수 있는 잔여 퍼블리싱 리스크를 확인하고 PR #248에서 도입부를 번호 집계에서 분리했다. 도입부는 `도입부`, 본문은 `01 / 12`부터 표시되도록 정렬했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 로컬 UI 계약(v75), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1601285 bytes로 예산 안이다.
- PR #248 필수 checks, main workflow 37232067717의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 7e9adf5aa26eaae5430089fa3b10553a709d0f6e는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-READING-PROGRESS-NUMBERING-20261005, E-UI-CONTRACT-READING-PROGRESS-NUMBERING-20261005, E-DEPLOY-PIPELINE-READING-PROGRESS-NUMBERING-20261005, E-LIVE-PUBLIC-READING-PROGRESS-NUMBERING-20261005.

## Release Recheck — 40c540b — 2026-10-05

- 읽기 진행 표시에서 첫 도입부의 ‘수면과 회복’과 중간 자동 전환 설명 카드가 같은 이름으로 보여 현재 위치가 겹쳐 보이는 잔여 퍼블리싱 리스크를 확인하고 PR #247에서 중간 장을 ‘회복의 고리’로 구분했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 로컬 UI 계약(v74), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1601102 bytes로 예산 안이다.
- PR #247 필수 checks, main workflow 37231321693의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 40c540b119088972ef6b180fd95b54b4931551a8는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RECOVERY-CONTEXT-20261005, E-UI-CONTRACT-RECOVERY-CONTEXT-20261005, E-DEPLOY-PIPELINE-RECOVERY-CONTEXT-20261005, E-LIVE-PUBLIC-RECOVERY-CONTEXT-20261005.

## Release Recheck — 85b1179 — 2026-10-05

- 첫 화면 뒤에 이미 존재하는 수면·회복 설명 브리지와 헤더 내비게이션의 도착점이 어긋나는 잔여 흐름 리스크를 확인하고 PR #246에서 `#opening-bridge` 앵커를 추가했다. 헤더의 ‘수면과 회복’ 메뉴와 읽기 진행 목록을 첫 설명 브리지로 정렬해 도입부의 자연스러운 순서를 복원했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 로컬 UI 계약(v73), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1601102 bytes로 예산 안이다.
- PR #246 필수 checks, main workflow 37230507157의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 85b1179edca779d98682f77b15ef54a497305341는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-OPENING-BRIDGE-NAV-20261005, E-UI-CONTRACT-OPENING-BRIDGE-NAV-20261005, E-DEPLOY-PIPELINE-OPENING-BRIDGE-NAV-20261005, E-LIVE-PUBLIC-OPENING-BRIDGE-NAV-20261005.

## Release Recheck — b3fcffb — 2026-10-05

- 430px 이하 좁은 휴대폰에서 절대 위치 헤더 컨트롤이 가로 안전영역과 어긋날 수 있는 잔여 퍼블리싱 리스크를 확인하고 PR #245에서 메뉴·글자 크기·공유 버튼의 오른쪽 inset을 보정했다. 공유 완료 토스트에도 좌우 안전영역을 명시했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 로컬 UI 계약(v72), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1601035 bytes로 예산 안이다.
- PR #245 필수 checks, main workflow 37229660026의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate b3fcffbc5acb5515e45facd579c44e3d34b9c53c는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-HEADER-SAFE-AREA-20261005, E-UI-CONTRACT-MOBILE-HEADER-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-MOBILE-HEADER-SAFE-AREA-20261005, E-LIVE-PUBLIC-MOBILE-HEADER-SAFE-AREA-20261005.

## Release Recheck — 06d737f — 2026-10-05

- 모바일에서 공유·복사 완료 토스트가 iPhone 하단 홈 인디케이터와 겹칠 수 있는 잔여 퍼블리싱 리스크를 확인하고 PR #244에서 700px 이하 토스트의 오른쪽·하단·좌우 안전영역 기준을 보정했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 로컬 UI 계약(v71), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1600691 bytes로 예산 안이다.
- PR #244 필수 checks, main workflow 37228652043의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 06d737f09c3cf915b29a8f7b7ddc0208b9006d6e는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-SHARE-TOAST-SAFE-AREA-20261005, E-UI-CONTRACT-SHARE-TOAST-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-SHARE-TOAST-SAFE-AREA-20261005, E-LIVE-PUBLIC-SHARE-TOAST-SAFE-AREA-20261005.

## Release Recheck — 83715cc — 2026-10-05

- 연구 확장 지도에서 개별 연구 카드로 이동할 때 고정 읽기 레일과 안전영역이 카드 제목·결과를 가릴 수 있는 잔여 퍼블리싱 리스크를 확인하고 PR #243에서 900px 이하와 700px 이하의 연구 카드 스크롤 기준을 각각 보정했다. 연구 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v70), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1600428 bytes로 예산 안이다.
- PR #243 필수 checks, main workflow 37227713682의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 83715cc9db72c90a401b4869497b549e8e404f04는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-UI-CONTRACT-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-LIVE-PUBLIC-RESEARCH-ANCHOR-SAFE-AREA-20261005.

## Release Recheck — 80436662 — 2026-10-05

- 701–900px 태블릿형 모바일 폭과 키보드 건너뛰기 링크에서 iPhone 안전영역 보정이 끊길 수 있는 잔여 퍼블리싱 리스크를 확인하고 PR #242에서 max-width 900px 규칙, 헤더·읽기 진행 표시·메뉴 안전영역, 메뉴 좌우 inset, 장 이동 위치를 확장했다. 연구 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v69), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1600187 bytes로 예산 안이다.
- PR #242 필수 checks, main workflow 37226718498의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 80436662c1e26b397fca2253fe95d260e51f5dc2는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Browser/Playwright, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-SAFE-AREA-TABLET-20261005, E-UI-CONTRACT-MOBILE-SAFE-AREA-TABLET-20261005, E-DEPLOY-PIPELINE-MOBILE-SAFE-AREA-TABLET-20261005, E-LIVE-PUBLIC-MOBILE-SAFE-AREA-TABLET-20261005.

## Release Recheck — 74fc0300 — 2026-10-05

- iPhone 상단 센서 영역에서 고정 헤더·읽기 진행 표시·모바일 메뉴·장 이동 위치가 겹칠 수 있는 잔여 모바일 퍼블리싱 리스크를 확인하고 PR #241에서 viewport-fit=cover와 env(safe-area-inset-top) 기반 보정을 적용했다. 연구 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v68), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1599460 bytes로 예산 안이다.
- PR #241 필수 checks, main workflow 37225805478의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 74fc03003db5af9f4e58c5a3b6a5480240ceba62는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-SAFE-AREA-20261005, E-UI-CONTRACT-MOBILE-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-MOBILE-SAFE-AREA-20261005, E-LIVE-PUBLIC-MOBILE-SAFE-AREA-20261005.

## Release Recheck — 9131138a — 2026-10-05

- 전문가 영상 선택 카드에서 현재 영상의 주제·재생 상태·전체 순서를 한 줄의 `01 / 09` 메타 정보로 정리해, 갤러리에서 현재 위치를 즉시 파악할 수 있게 했다. 모바일에서도 숫자 위치 정보가 유지된다. 연구 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v67), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1599042 bytes로 예산 안이다.
- PR #240 필수 checks, main workflow 37224932902의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 9131138aff6839851e6efdca4118a0bc9953fd66는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-INDEX-20261005, E-UI-CONTRACT-EXPERT-VIDEO-INDEX-20261005, E-DEPLOY-PIPELINE-EXPERT-VIDEO-INDEX-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-INDEX-20261005.

## Release Recheck — 84897891 — 2026-10-05

- 전문가 영상 아래 안내의 실제 다음 단계가 수면 연구로 오해될 수 있는 잔여 퍼블리싱 리스크를 확인하고, PR #239에서 `다음 장 · 연구를 읽는 기준 → 원문 출처`로 실제 문서 흐름을 정렬했다. 모바일에서도 다음 읽기 안내의 크기·간격·줄바꿈을 보강했다. 연구 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v66), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1598564 bytes로 예산 안이다.
- PR #239 필수 checks, main workflow 37224127512의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 8489789124bb7880bcbd369566a981181b1d7ffe는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-HANDOFF-20261005, E-UI-CONTRACT-EXPERT-VIDEO-HANDOFF-20261005, E-DEPLOY-PIPELINE-EXPERT-VIDEO-HANDOFF-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-HANDOFF-20261005.

## Release Recheck — 0e7836e — 2026-10-05

- 연구 지도 아래에 `주제를 선택하면` 안내를 추가하고 각 지도 버튼을 안내 문장과 연결해, 지도에서 연구 카드의 대상·결과·해석으로 이어지는 흐름을 즉시 이해할 수 있게 했다. 모바일에서는 안내 문장을 자연스럽게 줄바꿈했다. 연구 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v65), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1598158 bytes로 예산 안이다.
- PR #238 필수 checks, main workflow 37223345781의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 0e7836e6007b6bf16605c26386e5eaf57bcbb951는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-CUE-20261005, E-UI-CONTRACT-RESEARCH-MAP-CUE-20261005, E-DEPLOY-PIPELINE-RESEARCH-MAP-CUE-20261005, E-LIVE-PUBLIC-RESEARCH-MAP-CUE-20261005.

## Release Recheck — 13004052 — 2026-10-05

- 연구 카드 상단에 `연구 범위` 표식을 추가해 색상·대상 라벨의 의미를 즉시 구분하고, 모바일에서 범위·연구 대상·세부 영역을 단일 열로 배치했다. 연구 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v64), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1597027 bytes로 예산 안이다.
- PR #237 필수 checks, main workflow 37222305395의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate 13004052e50effcbf6d7011e04003e6ca0f0f23e는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-SCOPE-CONTEXT-20261005, E-UI-CONTRACT-RESEARCH-SCOPE-CONTEXT-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCOPE-CONTEXT-20261005, E-LIVE-PUBLIC-RESEARCH-SCOPE-CONTEXT-20261005.

## Release Recheck — af43e264 — 2026-10-05

- 연구 카드 상단의 대상·방법·측정 연구 범위 라벨이 결과를 읽기 전에 충분히 보이지 않을 수 있는 잔여 가독성 리스크를 확인하고, PR #236에서 데스크톱·모바일의 provenance label 크기·간격·줄바꿈을 보강했다. 연구 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v63), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1595782 bytes로 예산 안이다.
- PR #236 필수 checks, main workflow 37221235472의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate af43e264f5b6ca37f42937d49cd3b24b8576d3c9는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-SCOPE-READABILITY-20261005, E-UI-CONTRACT-RESEARCH-SCOPE-READABILITY-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCOPE-READABILITY-20261005, E-LIVE-PUBLIC-RESEARCH-SCOPE-READABILITY-20261005.

## Release Recheck — c5a60fe — 2026-10-05

- 연구 카드의 대상·방법·측정 study profile과 핵심 결과 라벨이 작아 카드의 맥락과 결론을 빠르게 읽기 어려운 잔여 가독성 리스크를 확인하고, PR #235에서 데스크톱·모바일 읽기 계층을 보강했다. 연구 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v62), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1595253 bytes로 예산 안이다.
- PR #235 필수 checks, main workflow 37220018831의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate c5a60fe085e9b2e042eeaf89bc75e562fce09234는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-PROFILE-READABILITY-20261005, E-UI-CONTRACT-RESEARCH-PROFILE-READABILITY-20261005, E-DEPLOY-PIPELINE-RESEARCH-PROFILE-READABILITY-20261005, E-LIVE-PUBLIC-RESEARCH-PROFILE-READABILITY-20261005.

## Release Recheck — 1226c06 — 2026-10-05

- 연구 비교 도표에서 핵심인 `GABA 결과` 요약이 작은 보조 라벨처럼 보이는 잔여 가독성 리스크를 확인하고, PR #234에서 결과 문구를 비교 레인보다 먼저 읽히는 크기·청록 기준선·옅은 배경 계층으로 보강했다. 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v61), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1594464 bytes로 예산 안이다.
- PR #234 필수 checks, main workflow `37219113458`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate `1226c0649618e5fa5fa231a49a082618ad035496`는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-VERDICT-READABILITY-20261005`, `E-UI-CONTRACT-RESEARCH-VERDICT-READABILITY-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-VERDICT-READABILITY-20261005`, `E-LIVE-PUBLIC-RESEARCH-VERDICT-READABILITY-20261005`.

## Release Recheck — 4036d0d — 2026-10-05

- 연구 결과 비교 도표에서 독자가 두 조건의 막대를 먼저 대조해야 GABA 결과를 이해해야 하는 잔여 가독성 리스크를 확인하고, 각 지표 앞에 `GABA 결과` 요약을 먼저 표시하도록 보완했다. 수치·출처 데이터는 변경하지 않았다.
- 로컬 UI 계약(v60), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1593966 bytes로 예산 안이다.
- PR #233 필수 checks, main workflow `37217858013`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator candidate `4036d0ddc109b00ddbbab9837f31b3f715596513`는 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-OUTCOME-VERDICT-20261005`, `E-UI-CONTRACT-RESEARCH-OUTCOME-VERDICT-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-OUTCOME-VERDICT-20261005`, `E-LIVE-PUBLIC-RESEARCH-OUTCOME-VERDICT-20261005`.

## Release Recheck — 647df28 — 2026-10-05

- 모바일 연구 확장 지도에서 주제 버튼과 아이콘이 작아질 수 있는 리스크를 확인하고 표준 모바일 주제 버튼 80px·82px, 아이콘 40px, 350px 이하 보정 76px·78px·38px를 적용했다. UI 계약에 v59 회귀 검사를 추가했다.
- 로컬 UI 계약(v59), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1593338 bytes로 예산 안이다.
- PR #232 필수 checks, main workflow `37216763700`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 코드 변경은 `8ba4a76`에서 배포됐고 NAVI 기록 동기화 시점 라이브 validator candidate `647df28185305e61915254693a052a6bc86c6ac8`를 확인했다. 해당 공개본은 HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-TOUCH-20261005`, `E-UI-CONTRACT-RESEARCH-MAP-TOUCH-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-TOUCH-20261005`, `E-LIVE-PUBLIC-RESEARCH-MAP-TOUCH-20261005`.

## Release Recheck — 3510d2c — 2026-10-05

- 모바일 수면·회복 14단계 지도의 7열 압축 리스크를 보완하기 위해 6열 정보 구조와 최소 44px 단계 터치 영역을 적용했고, 13·14단계는 중앙 정렬했다.
- 로컬 UI 계약(v58), typecheck, 127개 테스트, production build, 정적 번들·성능 예산을 통과했다. 초기 JS 311157 bytes, 초기 CSS 95703 bytes, 전체 assets 1592881 bytes로 예산 안이다.
- PR #231 필수 checks, main workflow `37215720425`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator는 candidate `3510d2c546cbc99981d76fc15b72a4f7d8d2a6c2`, HTTP 200, STATIC, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance matched를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-TOUCH-20261005`, `E-UI-CONTRACT-RECOVERY-MAP-TOUCH-20261005`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-TOUCH-20261005`, `E-LIVE-PUBLIC-RECOVERY-MAP-TOUCH-20261005`.

## 공유·연구 복사 버튼 모바일 터치 영역 명시 — ca65f61 — 2026-10-05

- 사업자용 문장 복사·전체 복사·연구 결과 복사 동작의 개별 스타일에 남아 있던 34~36px 선언을 정리하고, 모바일 포함 최소 44px 터치 영역을 명시했다. UI 계약에 v52 회귀 검사를 추가했다.
- PR #230 필수 checks, 로컬 UI contract·typecheck·127 tests·production build/performance를 확인했다. main workflow `37214622993`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- live validator candidate `ca65f61af42522f51e7b20db1057c4bc71368529`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright가 없어 실제 브라우저·실기기 터치 및 고령 사용자 독해성은 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-SHARE-CONTROLS-20261005`, `E-UI-CONTRACT-SHARE-CONTROLS-20261005`, `E-DEPLOY-PIPELINE-SHARE-CONTROLS-20261005`, `E-LIVE-PUBLIC-SHARE-CONTROLS-20261005`.

## 첫 화면 히어로 문구 최소화 — 2e31d60 — 2026-10-05

- 첫 화면의 `수면의 질 · 회복의 시간` 프리타이틀이 메인 헤드라인과 의미가 겹쳐 첫 시선 집중을 분산시키는 지점을 확인했다. 프리타이틀을 제거하고 주 헤드라인의 시작 위치를 0으로 보정했다.
- PR #229 필수 checks와 로컬 UI contract·typecheck·127 tests·production build/performance를 확인했다. main workflow `37213839261`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- live validator candidate `2e31d603630fe64d2c3ec16a30f180f475b20d92`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright가 없어 실제 브라우저·실기기 시각 검증과 고령 사용자 독해성은 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-MINIMAL-HERO-20261005`, `E-UI-CONTRACT-MINIMAL-HERO-20261005`, `E-DEPLOY-PIPELINE-MINIMAL-HERO-20261005`, `E-LIVE-PUBLIC-MINIMAL-HERO-20261005`.

## 전문가 영상 모바일 터치 영역 고도화 — 0b5a2a1 — 2026-10-05

- 전문가 영상 선택 공유 버튼과 주제 필터의 명시적 터치 높이를 44px 이상으로 통일해 모바일과 고령 사용자 탐색 부담을 줄였다. UI 계약에 v50 터치 타깃 회귀 검사를 추가했다.
- PR #228 필수 checks와 로컬 UI contract·typecheck·127 tests·production build/performance를 확인했다. main workflow `37212827380`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- live validator candidate `0b5a2a104ce4d8442e3210a0e12b1c8bbccaaaa9`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright가 없어 실제 브라우저·실기기 터치와 고령 사용자 독해성은 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-VIDEO-CONTROLS-20261005`, `E-UI-CONTRACT-VIDEO-CONTROLS-20261005`, `E-DEPLOY-PIPELINE-VIDEO-CONTROLS-20261005`, `E-LIVE-PUBLIC-VIDEO-CONTROLS-20261005`.

## 공개 공유 카드 분리 — 0e93fb3 — 2026-10-05

- 기존 공개 root·guide·research 경로가 제품·하루리듬 공유 카드와 같은 미리보기 이미지를 사용해 GABA 공개 안내서의 첫 인상이 흐려지는 배포 결함을 확인했다. 제품과 무관한 1200×630 JPEG `gaba-guide-social-card.jpg`를 추가하고 정적 HTML·직접 안내서 런타임 메타데이터를 새 카드로 통일했다.
- PR #227 필수 checks와 로컬 UI contract·typecheck·127 tests·production build/performance를 확인했다. main workflow `37211921700`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- live validator candidate `0e93fb3dcd66adeedee681eac3f8dbcb5ddd520c`는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했고 root/research Open Graph가 새 JPEG를 가리키는 것을 확인했다.
- 새 과학 주장이나 제품 광고는 추가하지 않았다. Browser 플러그인과 Playwright가 없어 실제 브라우저·실기기·소셜 크롤러 캐시 갱신과 독립 과학·규제 감수는 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-SOCIAL-PREVIEW-20261005`, `E-UI-CONTRACT-SOCIAL-PREVIEW-20261005`, `E-DEPLOY-PIPELINE-SOCIAL-PREVIEW-20261005`, `E-LIVE-PUBLIC-SOCIAL-PREVIEW-20261005`.

## 큰 글씨 읽기 모드 가독성 강화 — 5f4f6c7 — 2026-10-04

- 기존 큰 글씨 모드의 확대 폭이 실제 읽기 보조로 체감되기 어려운 점을 확인하고, 본문·연구 도표를 desktop 12%, mobile 10% 확대했다. 모바일 도표의 방향 문구는 확대 상태에서 자연스럽게 줄바꿈되도록 보정했다.
- PR #226 필수 checks와 로컬 UI contract·typecheck·127 tests·production build/performance를 확인했다. main workflow `37210637085`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- live validator candidate `5f4f6c7cd8d429da85e2f93f3beaf29571e437fa`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright가 없어 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-LARGE-TEXT-20261004`, `E-UI-CONTRACT-LARGE-TEXT-20261004`, `E-DEPLOY-PIPELINE-LARGE-TEXT-20261004`, `E-LIVE-PUBLIC-LARGE-TEXT-20261004`.

## 좁은 모바일 헤더 충돌 방지 — 5215ab5 — 2026-10-04

- 381–430px 화면에서 로고가 메뉴·큰 글씨·공유 컨트롤과 겹칠 수 있는 배치 위험을 확인했다. 컨트롤 레일을 고려한 로고 최대 폭을 적용하고, 해당 구간을 UI 계약으로 고정했다.
- PR #225 필수 checks와 로컬 typecheck·UI contract·127 tests·production build/performance를 확인했다. main workflow `37210073919`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- live validator candidate `5215ab5758e0e9e849ed634243e54c6e34c0e7cd`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright가 없어 실제 381–430px 실기기 레이아웃·터치·고령 사용자 독해성은 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-NARROW-HEADER-20261004`, `E-UI-CONTRACT-NARROW-HEADER-20261004`, `E-DEPLOY-PIPELINE-NARROW-HEADER-20261004`, `E-LIVE-PUBLIC-NARROW-HEADER-20261004`.

## 연구 카드 원문 보기 링크 가독성 고도화 — 6248808 — 2026-10-04

- 연구 카드의 출처를 작은 텍스트 링크 하나로 두지 않고, 출처명과 별도 `원문 보기` 액션을 한 행의 명확한 터치 영역으로 분리했다. 모바일 최소 44px 터치 높이와 키보드 `focus-visible` 표시를 적용해 사업자와 고령 사용자가 원문 진입점을 빠르게 찾을 수 있게 했다.
- PR #224 필수 checks와 로컬 typecheck·UI contract·127 tests·production build/performance를 확인했다. main workflow `37209426168`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- live validator candidate `6248808a56db53bd1a5d5fb3b822f2d58a8fc3bf`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright가 없어 실제 브라우저 원문 탭·모바일 실기기 터치·고령 사용자 독해성은 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-SOURCE-ACTION-20261004`, `E-UI-CONTRACT-RESEARCH-SOURCE-ACTION-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-SOURCE-ACTION-20261004`, `E-LIVE-PUBLIC-RESEARCH-SOURCE-ACTION-20261004`.

## 사업자용 전체 공유 복사 피드백 및 공개 재검증 — 94bcd16 — 2026-10-04

- 사업자용 5문장 전체 복사 버튼이 전역 토스트에만 의존해 복사 성공을 버튼 자체에서 확인하기 어려운 흐름을 확인했다. PR #223에서 전체 복사 버튼도 `복사 완료` 상태, 모바일 터치 영역, 키보드 포커스 표시와 2.4초 후 자동 복귀를 적용해 개별 문장 카드와 일관되게 만들었다.
- 로컬 typecheck·UI contract·127 tests·production build/performance를 확인했다. PR #223 필수 checks와 main workflow `37208889644`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- live validator candidate `94bcd1606e1521476e07f2057823517b6c8915ff`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright가 없어 실제 클립보드 권한·모바일 브라우저 공유 UI·실기기와 고령 사용자 독해성은 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-FULL-SHARE-COPY-ACK-20261004`, `E-UI-CONTRACT-FULL-SHARE-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-FULL-SHARE-COPY-ACK-20261004`, `E-LIVE-PUBLIC-FULL-SHARE-COPY-ACK-20261004`.

## 사업자용 공유 문장 개별 복사 피드백 및 공개 재검증 — 5aa9f05 — 2026-10-04

- 사업자용 GABA 핵심 5문장 카드에서 개별 문장을 복사한 뒤 어떤 카드가 처리됐는지 즉시 알기 어려운 흐름을 확인했다. PR #222에서 카드별 `복사 완료` 상태, 모바일 터치 영역, 키보드 포커스 표시와 2.4초 후 자동 복귀를 적용했다.
- 로컬 typecheck·UI contract·127 tests·production build/performance를 확인했다. PR #222 필수 checks와 main workflow `37208090180`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다.
- live validator candidate `5aa9f05589d3878d0adc02cff01829198b29a344`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다. 이어진 NAVI 문서 동기화 workflow `37208345128`도 Pages·라이브 smoke·release status까지 성공했고 최종 공개 candidate `df5c06aa3e75d2bfe4e471091b557050122d74dd`를 재확인했다.
- Browser 플러그인과 Playwright가 없어 실제 클립보드 권한·모바일 브라우저 공유 UI·실기기와 고령 사용자 독해성은 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-SHARE-LINE-COPY-ACK-20261004`, `E-UI-CONTRACT-SHARE-LINE-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-SHARE-LINE-COPY-ACK-20261004`, `E-LIVE-PUBLIC-SHARE-LINE-COPY-ACK-20261004`.

## 연구 카드 복사 완료 상태 및 TF freshness 복구 — bb5e260 — 2026-10-04

- 연구 결과·출처 복사 성공 뒤 해당 카드 버튼이 2.4초 동안 ‘복사 완료’로 바뀌도록 보강해, 모바일 사업자가 실제 재사용 가능 상태를 즉시 확인하게 했다. 연구 내용·출처·제품 독립 경계는 변경하지 않았다.
- PR #220 필수 checks와 로컬 typecheck·UI contract·127 tests·production build/performance를 확인했다. 첫 main 배포 run `37206894476`은 UI 실패가 아니라 TF heartbeat 487분/허용 480분 freshness 게이트로 중단됐다.
- 공식 TF pulse run `37207031442`의 safe internal checks가 MET였고 heartbeat 갱신 PR #221이 필수 checks를 통과했다. main workflow `37207209603`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며, live validator candidate `bb5e26036355650083eefe57cefc7cfd24993e9f`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright가 없어 실제 클립보드 성공·모바일 공유 UI는 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-COPY-ACK-20261004`, `E-UI-CONTRACT-RESEARCH-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-COPY-ACK-20261004`, `E-LIVE-PUBLIC-RESEARCH-COPY-ACK-20261004`, `E-TF-PULSE-REFRESH-20261004`.

## 연구 결과 공유 문맥 고도화 — 348f9b6 — 2026-10-04

- 연구 카드의 결과 복사를 연구 대상·방법, 관찰 결과, 연구 범위, 원문 출처와 해당 연구 딥링크를 포함하는 공유 블록으로 보강했다. 사업자용 GABA 5문장 전체 복사에도 공개 안내서 링크를 추가했다.
- 로컬 typecheck·UI contract·127 tests·production build/performance, PR #219 checks, main workflow `37206009673`의 release-verify·worker-readiness·Pages·smoke-live·release-status를 확인했다. live validator candidate `348f9b6083c050249fe03c63f2351b9506a4a345`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright가 없어 실제 클립보드 동작과 모바일 브라우저 공유 UI는 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-SHARE-CONTEXT-20261004`, `E-UI-CONTRACT-RESEARCH-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-RESEARCH-SHARE-CONTEXT-20261004`.

## 전문가 영상 공유 링크 주제 필터 재검증 — 597bf37 — 2026-10-04

- 선택 영상과 초기 재생 상태를 복원한 공유 링크가 전체 영상 목록으로 열려 관련 맥락을 다시 찾아야 하는 흐름을 확인했다. PR #218에서 유효한 `?video=` 쿼리의 영상 주제를 초기 필터로 연결해, 선택 영상과 관련 영상 목록을 함께 보여주도록 보강했다.
- 로컬 typecheck·UI contract·127 tests·build/perf, PR #218 checks, main workflow `37204949680`의 release-verify·worker-readiness·Pages·smoke-live·release-status를 확인했다. live validator candidate `597bf37c52c0336c4fccd326b3bb16af542ab887`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright를 사용할 수 없어 직접 iframe 재생과 필터 전환의 브라우저 런타임 증명은 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-CONTEXT-20261004`, `E-UI-CONTRACT-EXPERT-VIDEO-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-CONTEXT-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-CONTEXT-20261004`.

## 전문가 영상 공유 링크 직접 재생 재검증 — 2305b5b — 2026-10-04

- 유효한 `?video=` 공유 링크는 선택 영상 ID를 복원하지만 첫 진입에서 `videoStarted`가 false여서 한 번 더 눌러야 하는 흐름을 확인했다. PR #217에서 URL의 유효한 영상 ID를 초기 재생 상태로 연결하고 UI 계약 회귀 검사를 추가했다.
- 로컬 typecheck·UI contract·127 tests·build/perf, PR #217 checks, main workflow `37203920793`의 release-verify·worker-readiness·Pages·smoke-live·release-status를 확인했다. live validator candidate `2305b5b6ce273063aaeeea357d3b535d74290ff3`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- Browser 플러그인과 Playwright를 사용할 수 없어 직접 iframe 재생의 브라우저 런타임 증명은 외부 검증으로 남겼다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-DEEPLINK-20261004`, `E-UI-CONTRACT-EXPERT-VIDEO-DEEPLINK-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-DEEPLINK-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-DEEPLINK-20261004`.

## 공유·직접 진입 해시와 모바일 폭 변경 정렬 재검증 — cf893f8 — 2026-10-04

- 공유 링크와 직접 진입 해시가 lazy 콘텐츠·폰트·미디어 정착 전에 계산되어, 320px·390px에서 제목이 고정 헤더와 읽기 레일보다 아래로 밀리는 결함을 확인했다. PR #214의 초기 해시 재정렬에 이어 PR #216에서 일정 시간 재정렬과 사용자 상호작용 취소, `resize`·`visualViewport.resize` 발생 시 재계산을 추가했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #216 checks, main workflow `37202619125`의 release-verify·worker-readiness·Pages·라이브 smoke·release status를 확인했다. live validator candidate `cf893f8113236d4756211a1b8055a7a938bd6911`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- Chrome DevTools fallback에서 320px·390px 모두 제목 top 약 115px, 헤더 bottom 70px, 읽기 레일 bottom 105px로 정렬되었고 같은 페이지 320px→390px 폭 변경 뒤에도 기준선이 유지됐다. 공유 버튼은 공개 화면에서 취소 피드백 토스트를 표시했다. Browser 플러그인 부재로 이 방법을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-DEEP-LINK-REALIGN-20261004`, `E-CDP-DEEP-LINK-REALIGN-20261004`, `E-DEPLOY-PIPELINE-DEEP-LINK-REALIGN-20261004`, `E-LIVE-PUBLIC-DEEP-LINK-REALIGN-20261004`.

## 초소형 모바일 회복 경로 마지막 행 균형 보정 공개 재검증 — a13e82f — 2026-10-04

- 320px 이하 회복 경로의 13·14단계가 왼쪽에 몰려 보이던 잔여 시각 결함을 확인하고, 마지막 두 단계를 3·4열에 중앙 배치했다. 6·6·2 행 구조와 단계 버튼 폭, 390px의 7·7 흐름은 유지했다.
- PR #213의 UI 계약·typecheck·127개 테스트·production build·성능 예산과 main workflow `37200663786`의 정적 Pages 배포·라이브 smoke·release status를 확인했다. live validator candidate `a13e82f157d0aa52bbb4c2232b7956fb45e8342a`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- Browser 플러그인 부재로 Chrome DevTools fallback 기준을 사용했다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-NARROW-RECOVERY-END-20261004`, `E-CDP-NARROW-RECOVERY-END-20261004`, `E-DEPLOY-PIPELINE-NARROW-RECOVERY-END-20261004`, `E-LIVE-PUBLIC-NARROW-RECOVERY-END-20261004`.

## 초소형 모바일 회복 경로 터치·가독성 공개 재검증 — 5bf2921 — 2026-10-04

- 320px에서 14단계 회복 경로가 7열에 압축되어 단계 버튼이 작아지는 리스크를 확인하고, 350px 이하를 6·6·2의 3행으로 재배치했다. 버튼 최소 폭은 약 42.5px, 아이콘은 38px로 보강했으며 390px은 기존 7·7 흐름을 유지했다.
- PR #212의 UI 계약·typecheck·127개 테스트·production build·성능 예산, Chrome DevTools fallback 320px·390px의 가로폭·행 수·버튼 폭, main workflow `37199796734`의 정적 Pages 배포·라이브 smoke·release status를 확인했다. live validator candidate `5bf2921bfa513e1bd9ab62ef09e07935174124f0`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- Browser 플러그인 부재로 Chrome DevTools fallback을 사용했다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-NARROW-RECOVERY-MAP-20261004`, `E-CDP-NARROW-RECOVERY-MAP-20261004`, `E-DEPLOY-PIPELINE-NARROW-RECOVERY-MAP-20261004`, `E-LIVE-PUBLIC-NARROW-RECOVERY-MAP-20261004`.

## 태블릿 읽기 진행 레일 기준선 정렬 공개 재검증 — fc07f6f — 2026-10-04

- 701px·900px에서 헤더 높이 70px과 읽기 진행 레일의 top 값을 70px로 맞춰 헤더 아래 8px 기준선 오차를 제거했다. 공개 768px·390px에서 진행 레일·본문 흐름·제품 독립 안내가 유지됐고 scrollWidth와 clientWidth가 일치하며 page error·console error가 없었다.
- PR #211 필수 검사와 main workflow `37198360203`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다. live validator candidate `fc07f6f7a5895359183988b16acdc9209ed18ed5`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- Browser 플러그인 부재로 Chrome DevTools fallback을 사용했다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TABLET-PROGRESS-ALIGN-20261004, E-CDP-TABLET-PROGRESS-ALIGN-20261004, E-DEPLOY-PIPELINE-TABLET-PROGRESS-ALIGN-20261004, E-LIVE-PUBLIC-TABLET-PROGRESS-ALIGN-20261004.

## 태블릿 히어로 공개 안내 패널 보강 공개 재검증 — c0b08ee — 2026-10-04

- 768px·820px에서 히어로의 제품 독립 과학 안내 고지문과 읽기 레일이 폭 340px 반투명 패널로 이미지와 분리되어 읽혔다. 두 화면의 document scrollWidth와 clientWidth가 일치했고 page error·console error가 없었다.
- PR #210 후보는 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. 태블릿 전용 media query로 모바일·데스크톱 레이아웃과 공개 과학 흐름은 유지했다.
- PR #210 필수 검사와 main workflow `37197239653`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다. live validator candidate `c0b08ee23a7d9d12a30491587b39d5a17fe2f8ae`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- 배포 workflow의 historical local-path annotation은 과거 revision 경로 탐지 알림이며 현재 검사 실패가 아니다. Browser 플러그인 부재로 Chrome DevTools fallback을 사용했고 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TABLET-HERO-DISCLOSURE-20261004, E-CDP-TABLET-HERO-DISCLOSURE-20261004, E-DEPLOY-PIPELINE-TABLET-HERO-DISCLOSURE-20261004, E-LIVE-PUBLIC-TABLET-HERO-DISCLOSURE-20261004.

## 모바일 큰 글씨 제어 라벨 보강 공개 재검증 — 37147625 — 2026-10-04

- 390px에서는 `가+ 큰 글씨` 라벨이 메뉴·공유 버튼과 겹치지 않고 표시되며, 큰 글씨 전환 후 `가− 기본 글씨` 상태가 보인다. 320px에서는 헤더 폭을 보호하기 위해 컴팩트 `가+` 제어와 44px 터치 타깃을 유지한다.
- PR #209 후보는 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. Chrome DevTools fallback에서 로컬·공개 390px·320px의 scrollWidth와 clientWidth가 일치했고 page error·console error가 없었다.
- PR #209 필수 검사와 main workflow `37196206238`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했으며 Worker는 STATIC_ONLY로 건너뛰었다. live validator candidate `37147625768f75483a23f90fd2074e32b77b8b04`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- 배포 workflow의 historical local-path annotation은 과거 revision 경로 탐지 알림이며 현재 검사 실패가 아니다. Browser 플러그인 부재로 Chrome DevTools fallback을 사용했고 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-TYPE-CONTROL-20261004, E-CDP-MOBILE-TYPE-CONTROL-20261004, E-DEPLOY-PIPELINE-MOBILE-TYPE-CONTROL-20261004, E-LIVE-PUBLIC-MOBILE-TYPE-CONTROL-20261004.

## 전문가 영상 갤러리 공개 화면 재점검 — 73b32d2 — 2026-10-04

- 390px에서 전문가 영상 9개, 주제 필터, 선택 상태와 2열 카드가 표시되고 1440px에서도 선택 영상 영역과 갤러리 카드가 유지됐다. 선택 영상은 기존 즉시 재생 흐름과 원본 YouTube 연결을 유지한다.
- 최신 코드 후보는 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. Chrome DevTools fallback에서 390px·1440px 모두 scrollWidth와 clientWidth가 일치했고 page error·console error가 없었다.
- 최신 GitHub Pages 공개본 candidate `73b32d2f107f1da5d68da4e20c247ea3940f0452`의 live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. main workflow `37195468738`과 NAVI project-state validation도 PASS다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Chrome DevTools fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-VIDEO-GALLERY-QA-20261004, E-CDP-VIDEO-GALLERY-QA-20261004, E-LIVE-PUBLIC-VIDEO-GALLERY-QA-20261004.

## 좁은 모바일 연구 결과 카드 가독성 보강 공개 배포 감리 — 53a7c41 — 2026-10-04

- 320px 이하 연구 결과 카드에서 지표명·결과값·방향 그래픽을 세 줄로 분리해 의미 단위가 끊기지 않도록 보완했고, 390px에서는 기존 두 줄 흐름을 유지했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. Chrome DevTools fallback에서 공개 320px·390px 연구 카드에 읽기 순서가 표시됐고 scrollWidth와 clientWidth가 일치했으며 page error·console error가 없었다.
- PR #207·#208 필수 검사와 main workflow `37194121269`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `53a7c4141725928b3d85b1fa59982bbe9f9b7a10`은 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Chrome DevTools fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-NARROW-SIGNAL-LABEL-20261004, E-CDP-NARROW-SIGNAL-LABEL-20261004, E-DEPLOY-PIPELINE-NARROW-SIGNAL-LABEL-20261004, E-LIVE-PUBLIC-NARROW-SIGNAL-LABEL-20261004.

## 성장·면역 연구 방향 그래픽 보강 공개 배포 감리 — 074822b — 2026-10-04

- 성장호르몬 연구 카드 4개와 면역 연구 카드 3개에 상승·하강 방향 그래픽과 자연어 결과를 함께 표시해 결과를 빠르게 읽도록 보완했다. 그래픽은 효과 크기나 수치를 뜻하지 않으며 해당 안내를 차트 설명에 유지했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. Chrome DevTools fallback에서 공개 390px·1440px에 그래픽과 연구 결과 문구가 표시됐고 scrollWidth와 clientWidth가 일치했으며 page error·console error가 없었다.
- PR #206 필수 검사와 main workflow `37192302993`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `074822b3ff2f0e90463950a48b7e9a89ca49cb14`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Chrome DevTools fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-DIRECTION-GRAPHIC-20261004, E-CDP-DIRECTION-GRAPHIC-20261004, E-DEPLOY-PIPELINE-DIRECTION-GRAPHIC-20261004, E-LIVE-PUBLIC-DIRECTION-GRAPHIC-20261004.

## 비교 연구 결과 미터 보강 공개 배포 감리 — 1cc9440 — 2026-10-04

- 인지·피부·수면 비교 카드의 두 조건에 질적 미터를 추가하고 `더 많이 감소`, `덜 감소`, `더 많이 증가`, `덜 증가`를 함께 표시해 결과 방향을 먼저 읽도록 보완했다. 도표 하단의 비정량 비교 안내와 출처·연구 한계 문구는 유지됐다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. Chrome DevTools fallback에서 공개 390px·1440px에 `변화 방향 비교`와 네 방향 문구가 표시됐고 scrollWidth와 clientWidth가 일치했다.
- PR #205의 필수 검사와 main workflow `37190962129`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator candidate `1cc9440a99bcb71e09c307905b3a032cdb67a6f8`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Chrome DevTools fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-QUALITATIVE-METER-20261004, E-CDP-QUALITATIVE-METER-20261004, E-DEPLOY-PIPELINE-QUALITATIVE-METER-20261004, E-LIVE-PUBLIC-QUALITATIVE-METER-20261004.

## 연구 확장 지도 시작점·딥링크 방향 보강 공개 배포 감리 — c747f67 — 2026-10-04

- `06 · 연구의 확장` 진입 시 첫 연구 영역인 인지를 기본 활성화해 중앙 GABA 지도와 첫 상세 카드의 시작점을 연결했다. `#research-skin` 딥링크에서는 피부 지도 항목·피부 연구 결과 카드·읽기 진행명이 함께 활성화되며 기존 연구 카드 이동 흐름은 유지됐다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. Playwright Chromium fallback으로 최신 GitHub Pages 공개본 390px·1440px에서 인지 시작점, 피부 딥링크 동기화, 연구 영역 5개, 가로폭·page/console error 0건을 확인했다.
- PR #204의 필수 검사와 main workflow `37189726191`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator candidate `c747f67ab4cac2e452eb6024316d1e3af1b4a5b4`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-ENTRY-20261004, E-PLAYWRIGHT-RESEARCH-MAP-ENTRY-20261004, E-DEPLOY-PIPELINE-RESEARCH-MAP-ENTRY-20261004, E-LIVE-PUBLIC-RESEARCH-MAP-ENTRY-20261004.

## 수면·회복 14단계 현재 위치 표시 공개 배포 감리 — 0641f60 — 2026-10-04

- `잠깐, 수면과 회복`의 14단계 아이콘 지도 위에 현재 단계명과 `01 / 14` 진행 번호를 노출해 지도와 큰 카드의 연결을 보완했다. 자동 전환과 단계 클릭 시 현재 표식·카드 제목·진행 번호가 함께 갱신되며 기존 모바일·데스크톱 정보량과 제품 독립 문구는 유지됐다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. Playwright Chromium fallback으로 최신 GitHub Pages 공개본 390px·1440px에서 14단계, 현재 단계 표시, 14번째 단계 선택 후 `현재 · 14 · GABA를 읽는 시작점`·`14 / 14` 동기화, 가로폭·page/console error 0건을 확인했다.
- PR #203의 필수 검사와 main workflow `37188742301`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator candidate `0641f6036b7c0d64a187e8ce0f7d7fa457de2f36`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RECOVERY-MAP-STAGE-CUE-20261004, E-PLAYWRIGHT-RECOVERY-MAP-STAGE-CUE-20261004, E-DEPLOY-PIPELINE-RECOVERY-MAP-STAGE-CUE-20261004, E-LIVE-PUBLIC-RECOVERY-MAP-STAGE-CUE-20261004.

## 사업자용 5문장 전체 복사 공개 배포 감리 — 58bbc70 — 2026-10-04

- 마지막 이야기 공유 장의 사업자용 활용 자료에 `전체 복사` 버튼을 노출해 핵심 5문장을 한 번에 가져가는 경로를 만들었다. 문장별 복사, 5개 카드 펼치기, 제품 독립 안내 문구는 그대로 유지했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. Playwright Chromium fallback으로 로컬과 GitHub Pages 공개본 390px·1440px에서 버튼 표시·복사 성공 상태·5개 카드·기존 인지 → 피부 연구 카드 이동·화면 폭·page/console error 0건을 확인했다. 라이브 복사 결과는 216자로 확인됐다.
- PR #202의 필수 검사와 main workflow `37187761596`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator candidate `58bbc7036281b7bdfa855f3672fe589527d716b0`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-BUSINESS-COPY-ALL-20261004, E-PLAYWRIGHT-BUSINESS-COPY-ALL-20261004, E-DEPLOY-PIPELINE-BUSINESS-COPY-ALL-20261004, E-LIVE-PUBLIC-BUSINESS-COPY-ALL-20261004.

## 활용에서 발효와 안전으로 이어지는 편집 전환 공개 배포 감리 — 8d493d3 — 2026-10-04

- 국내외 활용 마지막 카드 아래 `다음 장 · 활용은 만들어지는 과정에서 이어집니다 → 발효와 안전` 전환을 추가해 연구 → 활용 → 만들어지는 과정의 방향을 보완했다. 다음 장의 발효와 안전 제목이 이어져 긴 페이지의 편집 리듬이 끊기지 않는다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. Playwright Chromium fallback으로 로컬과 GitHub Pages 공개본 390px·1440px에서 전환부, 다음 발효와 안전 제목, 기존 인지 → 피부 연구 카드 이동, 화면 폭·page/console error 0건을 확인했다.
- PR #201의 필수 검사와 main workflow `37186666660`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator candidate `8d493d3aa3c7cbd69733b62966574688dfa9cd42`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-APPLICATION-FERMENTATION-HANDOFF-20261004, E-PLAYWRIGHT-APPLICATION-FERMENTATION-HANDOFF-20261004, E-DEPLOY-PIPELINE-APPLICATION-FERMENTATION-HANDOFF-20261004, E-LIVE-PUBLIC-APPLICATION-FERMENTATION-HANDOFF-20261004.

## 사업자용 GABA 공유 패키지 공개 배포 감리 — 02f8fac — 2026-10-04

- 마지막 이야기 공유 장에 `사업자용 활용 자료` 안내를 먼저 노출하고, `사업자용 GABA 핵심 5문장 · 바로 복사하기` 표제와 5개 카드 펼치기·복사 흐름을 유지했다. 공개 과학 카피와 제품 독립 경계는 변경하지 않았다.
- 로컬 공개 카피 검사·UI contract·typecheck·127개 테스트·production build·성능 예산을 통과했다. Playwright Chromium fallback으로 로컬과 GitHub Pages 공개본 390px·1440px에서 안내 카드 표시·details open·5개 카드·첫 문장 복사·가로폭·page/console error 0건을 확인했다.
- main workflow `37185751209`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator candidate `02f8facb26e1c53e7184162801f60b2aaf8a34f6`는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-BUSINESS-SHARE-KIT-20261004, E-PLAYWRIGHT-BUSINESS-SHARE-KIT-20261004, E-DEPLOY-PIPELINE-BUSINESS-SHARE-KIT-20261004, E-LIVE-PUBLIC-BUSINESS-SHARE-KIT-20261004.

## 모바일 전문가 영상 정보 계층 고도화 감리 — 0feb5743 — 2026-10-04

- 700px 이하에서 선택된 전문가 영상의 제목·채널·공유 동작을 세로형 영상 프레임보다 먼저 배치해, 모바일 사용자가 무엇을 보고 있는지 먼저 이해하도록 보완했다. 데스크톱의 좌측 feature panel·우측 영상 보드 구조는 유지했다.
- 로컬 production build·UI contract·typecheck·127개 테스트·성능 예산을 통과했다. Playwright Chromium fallback으로 320·350·390·1440px을 확인했고, 선택 후 제목 표시·9:16 영상 비율·가로 넘침 없음·page/console error 0건을 확인했다.
- GitHub Pages 공개 candidate `0feb5743dc81fe0f46c75972c8a1eb358ae25996`의 live validator HTTP 200·STATIC·공개 데이터 정합성과 live Playwright 390·1440px 선택 흐름을 재확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-CONTEXT-20261004, E-PLAYWRIGHT-MOBILE-VIDEO-CONTEXT-20261004, E-DEPLOY-PIPELINE-MOBILE-VIDEO-CONTEXT-20261004, E-LIVE-PUBLIC-MOBILE-VIDEO-CONTEXT-20261004.

## 공개 사이트 전 구간 시각 감리 — 66ec3c6 — 2026-10-04

- 현재 GitHub Pages 공개본의 첫 화면·수면과 회복·연구 지도·전문가 영상·이야기 공유 장을 390px·1440px에서 직접 진입해 확인했다. 10개 캡처 모두 화면 폭 안에 배치됐고, page error·console error가 없었다.
- 모바일에서는 14단계 회복 카드, 연구 지도와 읽는 순서, 세로형 전문가 영상 갤러리를 확인했고 데스크톱에서는 연구 지도와 선택 영상 feature panel의 균형·이미지 비율·정보 계층을 확인했다. 첫 화면부터 마지막 공유 장까지 시각 톤이 일관되게 유지됐다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 live validator HTTP 200·STATIC·candidate `63bc6b1`·70개 번들 해시·공개 데이터 정합성을 재확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-VISUAL-PUBLISHING-20261004.

## 전문가 영상 즉시 공유·진행 문맥 감사 — 34c5b08 — 2026-10-04

- 전문가 영상 카드를 선택한 직후 50ms 뒤 헤더 공유를 실행해도 제목·본문·`?video=...#expert-videos` 딥링크가 선택 영상과 일치하는지 확인했다. PR #194에서 공유 문맥을 보정하고 PR #196에서 모바일 smooth scroll 중 읽기 진행 라벨을 `전문가 영상`으로 고정했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, Playwright Chromium fallback 390px·1440px 인터랙션 17/17, 공개 live validator HTTP 200·candidate 34c5b08·70개 번들 해시·공개 데이터 정합성을 확인했다. 메뉴 포커스 복귀·큰 글씨·reduced-motion·모바일 가로폭·데스크톱 공유도 통과했다.
- 첫 main 배포 시 heartbeat가 481분으로 480분 허용치를 1분 초과해 정지했으나, 공식 heartbeat refresh PR #195가 필수 검사를 통과한 뒤 최종 main workflow 37181007734에서 fresh TF pulse·Pages·라이브 smoke·release status가 모두 성공했다. Worker는 STATIC_ONLY로 건너뛰었다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-SHARE-20261004, E-PLAYWRIGHT-EXPERT-VIDEO-SHARE-20261004, E-DEPLOY-PIPELINE-EXPERT-VIDEO-SHARE-20261004, E-LIVE-PUBLIC-EXPERT-VIDEO-SHARE-20261004.

## NAVI 문서 동기화 후 최종 공개본 재감사 — cc312de — 2026-10-04

- NAVI 문서 동기화 이후 최종 공개 candidate에서 live validator와 Playwright Chromium fallback을 재실행했다. 320·350·390·768·1440px × 11개 주요 장, 총 55개 조합을 통과했고 모든 조합에서 가로 넘침·페이지 오류·콘솔 오류가 없었다.
- 최종 공개 candidate `cc312de`는 HTTP 200·정적 모드·70개 번들 해시·12개 공개 claim·6개 master record·6개 share page·teaser HOLD·내부 운영 스냅샷 제외·Smart Store only·removed750·provenance 일치를 유지한다. UI 코드는 직전 보정 candidate `91808af`와 동일하다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-NARROW-PHONE-20261004.

## 초소형 모바일 연구 카드 폭 및 공개본 전수 레이아웃 감사 — 91808af — 2026-10-04

- 자동 전수 감리에서 320px 수면 연구 카드의 내부 두 번째 열이 콘텐츠의 고정 최소 폭을 물려 오른쪽 13px가 잘리는 결함을 확인하고, `minmax(0, 1fr)`와 내부 `min-width: 0`으로 보정했다.
- 연구 내용·수치·출처·제품 독립 경계·이미지 자산은 변경하지 않았다. 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산을 통과했다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며, 로컬과 공개 URL에서 320·350·390·768·1440px × 11개 주요 장 직접 진입, scrollWidth·targetFound·consoleErrors·pageErrors를 점검했다. 55개 조합 모두 가로 넘침·페이지 오류·콘솔 오류가 없었다.
- PR #193 checks 37179340343·37179340339, main workflow 37179404463의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 candidate 91808af에서 HTTP 200·STATIC·공개 데이터 정합성을 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-NARROW-PHONE-20261004, E-PLAYWRIGHT-NARROW-PHONE-20261004, E-DEPLOY-PIPELINE-NARROW-PHONE-20261004, E-LIVE-PUBLIC-NARROW-PHONE-20261004.

## 모바일 터치 중 수면·회복 카드 읽기 흐름 감사 — e6802d3 — 2026-10-04

- 모바일에서 카드를 누르거나 스와이프하는 동안 3초 자동 전환이 계속될 수 있던 흐름을 확인하고, 터치 시작부터 종료까지 현재 단계를 유지하도록 보완했다. 손가락을 떼면 자동 전환을 재개하고, 좌우 스와이프는 다음 단계로 이동한 뒤 수동 일시정지 상태를 유지한다. touchcancel 복귀도 추가했다.
- 카드 이미지·14단계 구조·연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다. 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산을 통과했다.
- Browser 플러그인 부재로 Playwright Chromium fallback을 사용했으며, 로컬·공개 390px touch context에서 touch hold·release·swipe·수동 정지·가로폭·콘솔 오류를 확인했다.
- PR #192 checks 37178414875·37178414911, main workflow 37178489672의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 candidate e6802d3에서 HTTP 200·STATIC·공개 데이터 정합성을 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RECOVERY-TOUCH-20261004, E-PLAYWRIGHT-RECOVERY-TOUCH-20261004, E-DEPLOY-PIPELINE-RECOVERY-TOUCH-20261004, E-LIVE-PUBLIC-RECOVERY-TOUCH-20261004.

## 수면·회복 자동 카드 읽기 흐름 감사 — cbf05f6 — 2026-10-04

- 수면·회복 14단계 카드가 포인터나 키보드 포커스를 한 번만 받아도 영구 정지하던 흐름을 확인하고, 읽기 중 상호작용 일시정지와 사용자가 직접 누른 일시정지를 분리했다. 섹션을 벗어나면 3초 자동 전환을 재개하고, 사용자가 직접 정지한 경우에는 정지 상태를 유지한다.
- reduced-motion 환경에서는 자동 전환을 끄고 `접근성을 위해 자동 전환 꺼짐`을 표시한다. 카드 단계·자연 이미지 톤·연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 Chrome fallback 390px·1440px의 자동 전환·hover/focus 일시정지·수동 정지·reduced-motion·가로폭·콘솔 오류를 확인했다. Browser 플러그인 부재로 Playwright Chromium fallback을 사용했다.
- PR #191 checks 37177692794·37177692743, main workflow 37177762069의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 candidate cbf05f6에서 HTTP 200·STATIC·공개 데이터 정합성을 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목으로 남긴다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RECOVERY-AUTOPLAY-20261004, E-PLAYWRIGHT-RECOVERY-AUTOPLAY-20261004, E-DEPLOY-PIPELINE-RECOVERY-AUTOPLAY-20261004, E-LIVE-PUBLIC-RECOVERY-AUTOPLAY-20261004.

## 모바일 연구 결과 도표 보조문구 가독성 감사 — 43e5942 — 2026-10-04

- 연구 결과 도표의 증가·감소 방향 표기와 시각 요소 설명문이 작은 보조문구로 남아 있던 상태를 확인하고, 모바일에서 방향 표기는 12.04px, 설명문은 12.6–13.02px로 키웠다. 320px 이하에서도 한 열 구조와 가로폭을 유지했다.
- 연구 수치·출처·제품 독립 경계는 변경하지 않았다. UI 계약·typecheck·127개 테스트·production build·성능 예산, Chrome fallback 320px·390px·768px·1440px의 도표 렌더링·가로폭·페이지 오류를 확인했다.
- PR #190과 main workflow 37176650203의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 candidate 43e5942에서 HTTP 200·STATIC·공개 데이터 정합성을 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-CHART-LEGIBILITY-20261004, E-PLAYWRIGHT-RESEARCH-CHART-LEGIBILITY-20261004, E-DEPLOY-PIPELINE-RESEARCH-CHART-LEGIBILITY-20261004, E-LIVE-PUBLIC-RESEARCH-CHART-LEGIBILITY-20261004.

## 반응형 헤더 경계 보완 감사 — 25c55f9 — 2026-10-04

- 861px에서 전체 내비게이션이 조기 전환되어 오른쪽 공유 버튼이 잘리던 실제 화면 결함을 확인했다. compact 헤더와 메뉴 배경의 상한을 900px로 연장해 861px·900px에서는 메뉴형, 920px 이상에서는 전체 내비게이션으로 안정적으로 전환되도록 보완했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산을 통과했고, 공개 390px·861px·900px·920px·1440px Chrome fallback에서 hero·큰 글씨 토글·메뉴·메뉴 배경·공유 버튼 경계를 재확인했다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- PR #189와 main workflow 37175326245의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 candidate 25c55f9에서 HTTP 200·STATIC·공개 데이터 정합성을 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TABLET-BREAKPOINT-20261004, E-PLAYWRIGHT-TABLET-BREAKPOINT-20261004, E-DEPLOY-PIPELINE-TABLET-BREAKPOINT-20261004, E-LIVE-PUBLIC-TABLET-BREAKPOINT-20261004.

## 태블릿 헤더 큰 글씨 조절 표식 감사 — 45a01bf — 2026-10-04

- 701–860px 태블릿에서 빈 버튼처럼 보이던 큰 글씨 조절 버튼에 `가+` 표식을 복원했다. 접근성용 숨김 레이블과 44px 터치 영역은 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 공개 320px·390px·768px·1440px Chrome fallback의 제목·표식 표시·가로 폭·콘솔 오류·직접 해시 진입·연구 선택을 확인했다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- PR #188과 main workflow 37174574201의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 candidate 45a01bf에서 HTTP 200·STATIC·공개 데이터 정합성을 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TABLET-READING-CONTROL-20261004, E-PLAYWRIGHT-TABLET-READING-CONTROL-20261004, E-DEPLOY-PIPELINE-TABLET-READING-CONTROL-20261004, E-LIVE-PUBLIC-TABLET-READING-CONTROL-20261004.

## 모바일 연구 기준 범례 가독성 감사 — 746fd126 — 2026-10-04

- 모바일 연구 기준 범례를 한 줄 압축에서 세로 흐름으로 정리하고, 연구 기준 제목·범례·설명 글자 크기를 13px·13px·12px로 조정했다. 연구 확장 제목의 줄바꿈 뒤 공백도 보존해 화면 텍스트와 접근성 텍스트가 같은 문장으로 읽힌다.
- 연구 내용·수치·출처·제품 독립 경계는 변경하지 않았다. 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 공개 390px·1440px Chrome fallback의 페이지 정체성·비공백·가로 폭·콘솔 오류·큰 글씨 토글·피부 연구 카드 선택을 확인했다.
- PR #187 checks 37173502093, 37173502097과 main workflow 37173572877의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator는 candidate 746fd126에서 HTTP 200·STATIC·bundleHashes 70과 공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-RESEARCH-LEGEND-20261004, E-PLAYWRIGHT-MOBILE-RESEARCH-LEGEND-20261004, E-DEPLOY-PIPELINE-MOBILE-RESEARCH-LEGEND-20261004, E-LIVE-PUBLIC-MOBILE-RESEARCH-LEGEND-20261004.

## 모바일 연구 읽기 순서 가독성 감사 — 76b3adc — 2026-10-04

- 모바일 연구 지도 아래의 압축된 한 줄 순서를 지도·대상·결과·해석 4단계 시각 순서표로 보완했다. 모바일 표기는 13px, 번호 원형은 30px로 조정해 고령 사용자도 다음 읽기 단계를 빠르게 찾도록 했다.
- 기존 연구 내용·수치·출처·제품 독립 경계는 변경하지 않았다. 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 공개 390px·1440px Chrome fallback의 페이지 정체성·비공백·가로 폭·콘솔 오류·큰 글씨 토글·전문가 연구 필터를 확인했다.
- PR #186 checks `37172660265`, `37172660323`과 main workflow `37172733343`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator는 candidate `76b3adc`에서 HTTP 200·STATIC·bundleHashes 70과 공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적:`E-LOCAL-BUILD-RESEARCH-READ-ORDER-20261004`,`E-PLAYWRIGHT-RESEARCH-READ-ORDER-20261004`,`E-DEPLOY-PIPELINE-RESEARCH-READ-ORDER-20261004`,`E-LIVE-PUBLIC-RESEARCH-READ-ORDER-20261004`.

## 전문가 영상 fallback 포스터·콘솔 정리 감사 — c97d2ac — 2026-10-04

- 원격 YouTube 썸네일이 응답하지 않을 때 동일한 기본 카드가 반복되던 문제를 주제별 자연 이미지 fallback 포스터로 보완했다. 실제 썸네일은 우선 사용하며, 수면·자율신경·연구·GABA란의 주제 구분과 Apple식 저밀도 시각 흐름을 유지한다.
- iframe 재생에 필요하지 않은 `web-share` 권한 토큰을 제거했다. 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px·1440px Chrome fallback에서 fallback 포스터·연구 읽기 필터·대표 제목 변경·활성 카드 1개·가로 폭·콘솔·페이지 오류 없음을 확인했다.
- PR #185 checks `37171642623`, `37171642620`과 main workflow `37171708026`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `c97d2ac`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- NAVI 문서 동기화 당시 live validator도 candidate `88c6efd`에서 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 재확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-POSTERS-20261004`, `E-PLAYWRIGHT-EXPERT-VIDEO-POSTERS-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-POSTERS-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-POSTERS-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-POSTERS-FINAL-20261004`.

## 연구 결과 비교 도표 방향성 감사 — 86891bc — 2026-10-04

- 연구 결과 카드의 비교 문구는 유지하면서, 비교 조건과 GABA 조건의 상대적 변화 방향을 막대 길이로 분리해 시각적 비교 단계를 추가했다. 막대는 실제 효과 크기가 아니라 방향 비교라는 기존 주석을 유지한다.
- 로컬 UI 계약·typecheck·127개 테스트·production build를 통과했다. 공개 390px·1440px Chrome fallback에서 `result-less`는 비교 조건 0.88·GABA 조건 0.48, `result-more`는 비교 조건 0.48·GABA 조건 0.88의 변환을 확인했고, viewport와 같은 문서 폭·브라우저 오류 없음·연구 지도 피부 선택을 재확인했다.
- PR #184 checks `37170724624`, `37170724660`과 main workflow `37170799368`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `86891bc`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-PLAYWRIGHT-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-LIVE-PUBLIC-RESEARCH-COMPARISON-DIRECTION-20261004`.

## 모바일 전문가 영상 갤러리 감사 — a77c91c — 2026-10-04

- 390px에서 전문가 영상 게시판을 썸네일 중심 2열 갤러리로 정리하고, 350px 이하에서는 1열 카드로 복귀하도록 반응형 밀도를 보완했다. 데스크톱 게시판과 선택 영상의 어두운 미디어 패널은 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build와 공개 320px·390px·1440px Chrome fallback을 통과했다. 390px 2열, 320px 1열, 썸네일 9개 로드, 두 번째 카드 선택 후 제목 변경·iframe 생성, viewport와 같은 문서 폭을 확인했다.
- PR #183 checks `37169283639`, `37169283651`과 main workflow `37169365913`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `a77c91c`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 320px 공개 첫 실행에서 YouTube iframe의 `compute-pressure` Permissions Policy 경고가 한 차례 있었으나 즉시 재실행에서 앱 오류는 없었다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-VIDEO-GALLERY-20261004`, `E-PLAYWRIGHT-MOBILE-VIDEO-GALLERY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-VIDEO-GALLERY-20261004`, `E-LIVE-PUBLIC-MOBILE-VIDEO-GALLERY-20261004`.

## 마지막 이야기 공유 장 시각 균형 감사 — ec2a1bd — 2026-10-04

- 데스크톱 마지막 장에서 왼쪽 콘텐츠 뒤 오른쪽 공간이 비어 보이던 상태를 PR #182에서 보완했다. 저채도 동심원 신호와 GABA 워터마크를 추가해 첫 화면의 자연·과학 톤을 마지막 장까지 연결하되, 카피·공유 행동·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 공개 390px·1440px Chrome fallback에서 `이야기 공유 | GABA Guide`, 핵심 제목·본문·공유 버튼, viewport와 같은 문서 폭, 브라우저 오류 없음을 확인했다. 공개 390px 회복 카드의 focus-visible 3px 윤곽선과 14번째 카드 선택·자동 일시정지도 재확인했다.
- PR #182 checks `37168218357`, `37168218356`과 main workflow `37168287853`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `ec2a1bd`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-FINAL-SIGNAL-20261004`, `E-PLAYWRIGHT-FINAL-SIGNAL-20261004`, `E-DEPLOY-PIPELINE-FINAL-SIGNAL-20261004`, `E-LIVE-PUBLIC-FINAL-SIGNAL-20261004`.

## 모바일 회복 카드 탐색 affordance 감사 — 8e22d51 — 2026-10-04

- 수면·회복 보충 구간의 14단계 읽기 경로가 작은 아이콘으로 흩어져 다음 내용을 한눈에 찾기 어려운 상태를 PR #181에서 보완했다. 모바일 아이콘을 34px, 번호를 10px로 조정하고 hover·focus-visible 상태를 연결해 단계 선택성을 높였다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 공개 390px Chrome fallback에서 14단계 지도, viewport와 같은 문서 폭, 마지막 단계 선택 후 `수면과 회복 카드 14 / 14: 14 · GABA를 읽는 시작점`, 자동 일시정지, 브라우저 오류 없음을 확인했다.
- PR #181 checks `37167220741`, `37167220751`과 main workflow `37167336445`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `8e22d51`은 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-AFFORDANCE-20261004`, `E-PLAYWRIGHT-RECOVERY-MAP-AFFORDANCE-20261004`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-AFFORDANCE-20261004`, `E-LIVE-PUBLIC-RECOVERY-MAP-AFFORDANCE-20261004`.

## 전문가 영상 로딩 포스터 연속성 감사 — 44337e5 — 2026-10-04

- 전문가 영상 선택 직후 iframe이 로딩되는 동안 어두운 빈 프레임처럼 보일 수 있던 상태를 확인해, 기존 Shorts 썸네일을 같은 9:16 프레임에 유지하고 로딩 상태만 위에 표시하도록 PR #179에서 보완했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 공개 390px Chrome fallback에서 포스터 유지·iframe opacity 0·250x444px·가로 폭·오류 없음을 확인했고, 공개 320px·390px·1440px 대표 감사와 연구→영상→공유 전체 흐름도 통과했다.
- PR #179 checks `37166280901`, `37166280896`과 main workflow `37166334839`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `44337e5`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-VIDEO-LOADING-POSTER-20261004`, `E-PLAYWRIGHT-VIDEO-LOADING-POSTER-20261004`, `E-DEPLOY-PIPELINE-VIDEO-LOADING-POSTER-20261004`, `E-LIVE-PUBLIC-VIDEO-LOADING-POSTER-20261004`.

## 모바일 보조 문구·전문가 영상 영역 고도화 감사 — a2a2d3f — 2026-10-04

- 320px 모바일 첫 화면에서 약하게 읽힐 수 있던 보조 문구의 크기를 12px로 보완하고, 선택한 전문가 세로 영상의 표시 폭을 250px로 확장했다. 영상은 9:16 비율(390px 화면에서 250x444px)을 유지해 찌그러짐 없이 읽기·시청 영역을 개선했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 공개 GitHub Pages 320px·390px Chrome fallback에서 kicker 12px, 영상 250x444px, viewport와 같은 가로 폭, 브라우저 오류 없음을 확인했다.
- PR #178 checks `37165352762`, `37165352764`와 main workflow `37165443025`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `a2a2d3f`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-LABEL-MEDIA-20261004`, `E-PLAYWRIGHT-MOBILE-LABEL-MEDIA-20261004`, `E-DEPLOY-PIPELINE-MOBILE-LABEL-MEDIA-20261004`, `E-LIVE-PUBLIC-MOBILE-LABEL-MEDIA-20261004`.

## 수면과 회복 연결 문구 명료화 감사 — eded7a9 — 2026-10-04

- 수면과 회복 연결 구간의 상단 진행 표시 `이어 읽기 / 12`가 독자에게 어색하게 읽히는 문제를 확인해 `다음 장으로 이어져요`로 보정했다. 보조기기 안내는 `본문 사이에 이어지는 설명입니다`로 유지해 화면 문구와 의미를 맞췄다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 최종 GitHub Pages 공개본 390px Chrome fallback에서 새 문구·aria-label·제목·가로 폭·오류를 확인했고, 320px·1440px 대표 퍼블리싱 감사도 통과했다.
- PR #177 checks `37164416872`, `37164416820`과 main workflow `37164504662`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `eded7a9`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 한 차례 전체 흐름에서 YouTube iframe의 Chrome Permissions Policy `compute-pressure` 콘솔 경고가 관찰됐으나 즉시 재실행에서는 재현되지 않았고 앱 오류·레이아웃 결함으로 분류하지 않았다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-INTERLUDE-COPY-20261004`, `E-PLAYWRIGHT-INTERLUDE-COPY-20261004`, `E-DEPLOY-PIPELINE-INTERLUDE-COPY-20261004`, `E-LIVE-PUBLIC-INTERLUDE-COPY-20261004`.

## 같은 페이지 해시 맥락 동기화 감사 — a8689a3 — 2026-10-04

- 같은 안내서 안에서 해시를 바꾸면 연구 선택은 바뀌는데 이전 장 제목·진행 레일이 남을 수 있던 경합을 확인했다. 해시→장 변환기를 공통화하고, 초기 해시 정렬 타이머가 현재 해시와 다르면 중단하도록 PR #176에서 보완했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 최종 GitHub Pages 공개본 390px Chrome fallback에서 `recovery-break → research-skin → expert-videos` 해시 이동 시 제목·진행 레일·피부 연구 선택·스크롤 위치가 함께 바뀌었고, 전체 읽기 흐름의 가로 넘침과 오류가 없었다.
- PR #176 checks `37163412436`, `37163412451`과 main workflow `37163479968`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `a8689a3`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-HASH-CONTEXT-20261004`, `E-PLAYWRIGHT-HASH-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-HASH-CONTEXT-20261004`, `E-LIVE-PUBLIC-HASH-CONTEXT-20261004`.

## 현재 장 이동 읽기 레일 동기화 감사 — a396ca8 — 2026-10-04

- 모바일 메뉴에서 목적지 장이 보이기 전까지 이전 장의 읽기 레일·브라우저 제목이 남던 상태 경합을 확인해, smooth scroll 중 목적지 장을 잠시 고정하고 직접 스크롤·연속 연구→영상 이동 시 잠금을 해제하도록 PR #174에서 보완했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 최종 GitHub Pages 공개본 390px Chrome fallback에서 메뉴→연구 지도 직후 `연구 지도 | GABA Guide`와 `연구 지도 03 / 12`를 확인했고, 연구 카드·전문가 영상·마지막 공유 흐름에서 가로 넘침과 오류가 없었다.
- PR #174 merge `a396ca8`, main workflow `37162395001`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `a396ca8`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-CHAPTER-RAIL-SYNC-20261004`, `E-PLAYWRIGHT-CHAPTER-RAIL-SYNC-20261004`, `E-DEPLOY-PIPELINE-CHAPTER-RAIL-SYNC-20261004`, `E-LIVE-PUBLIC-CHAPTER-RAIL-SYNC-20261004`.

## 현재 읽는 위치 공유 맥락 감사 — b03b7df — 2026-10-04

- 자연 스크롤로 마지막 장까지 읽은 뒤 공유하면 주소 해시가 이전 장에 남을 수 있던 결함을 확인해, 현재 장·연구 카드·선택 전문가 영상에 맞춰 공유 URL을 재구성하도록 PR #173에서 보완했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 최종 GitHub Pages 공개본 390px Chrome fallback에서 메뉴 이동·큰 글씨·근육 연구 카드 선택·전문가 영상 iframe·마지막 공유 흐름과 `#research-muscle`, `?video=RLAU1VWGsaI#expert-videos`, `#final` 주소를 확인했다.
- PR #173 merge `b03b7df`, main workflow `37161370503`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `b03b7df`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-SHARE-CONTEXT-20261004`, `E-PLAYWRIGHT-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-SHARE-CONTEXT-20261004`.

## 마지막 이야기 공유 라벨 일관성 감사 — 26077a2 — 2026-10-04

- 본문 섹션 번호가 `12 · 이야기 공유`인데 진행 레일과 브라우저 제목이 `공유하기`였던 불일치를 확인해 세 위치를 `이야기 공유`로 통일했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 최종 GitHub Pages 공개본 390px Chrome fallback에서 브라우저 제목·진행 레일·본문 섹션 번호·가로 폭·브라우저 오류를 확인했다.
- PR #172 merge `26077a2`, main workflow `37160262285`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `26077a2`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-FINAL-LABEL-20261004`, `E-PLAYWRIGHT-FINAL-LABEL-20261004`, `E-DEPLOY-PIPELINE-FINAL-LABEL-20261004`, `E-LIVE-PUBLIC-FINAL-LABEL-20261004`.

## 수면과 회복 진행 문구 명료화 감사 — 14528e9 — 2026-10-04

- interlude 상단 진행 표시의 `보충 / 12`가 소비자에게 의미가 모호한 문제를 확인해 `이어 읽기 / 12`로 보정하고, `aria-label`도 본문 사이에 이어지는 설명이라는 같은 뜻으로 정렬했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 최종 GitHub Pages 공개본 390px Chrome fallback에서 제목·진행 문구·보조기기 안내·가로 폭·브라우저 오류를 확인했다.
- PR #171 merge `14528e9`, main workflow `37159578042`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `14528e9`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-INTERLUDE-PROGRESS-20261004`, `E-PLAYWRIGHT-INTERLUDE-PROGRESS-20261004`, `E-DEPLOY-PIPELINE-INTERLUDE-PROGRESS-20261004`, `E-LIVE-PUBLIC-INTERLUDE-PROGRESS-20261004`.

## 연구 지도 딥링크 상태 복원 감사 — 4d9bfde — 2026-10-04

- `#research-skin` 같은 연구 카드 딥링크가 초기 진입에서 선택 지도·상세 카드·읽기 진행·브라우저 제목을 함께 복원하도록 PR #170에서 보완했다. 브라우저 해시가 바뀌면 `hashchange`로 선택 연구 주제도 동기화된다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했다. 공개 GitHub Pages를 대상으로 Playwright 1.63.0 Chrome fallback에서 390·1440px `#research-skin` 진입 후 `피부 연구 결과` 상태를 확인했고, `#research-muscle`로 해시를 바꾼 뒤 `근육 연구 결과` 상태로 전환되는 것을 확인했다. 가로 폭은 viewport와 일치했고 errors는 없었다.
- PR #170 merge `4d9bfde`, main workflow `37158456376`와 NAVI 문서 동기화 workflow `37158735199`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator 최종 candidate `cb494e2`는 HTTP 200·STATIC·bundleHashes 70·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-PLAYWRIGHT-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-LIVE-PUBLIC-RESEARCH-DEEPLINK-CONTEXT-20261004`.

## 선택 영상 카드 직접 공유 고도화 감사 — e709f2c — 2026-10-04

- 전문가 영상 선택 카드 안에 `이 영상 공유` 행동을 추가했다. 기존 URL 보존 로직을 재사용해 현재 영상 ID·장 위치·영상 제목을 공유 payload에 유지하고, 미디어 패널의 색·radius·focus-visible 규칙에 맞췄다.
- 로컬 UI 계약·typecheck·127개 테스트·build가 통과했다. 공개 320·390·1440px Chrome fallback에서 버튼 표시, `공유 창을 열었어요.` 상태, 선택 영상 제목·포스터·진행 표시·가로 폭·오류 없음을 확인했다. 공유 payload URL은 `?view=guide&video=roEtojyk9_0#expert-videos`를 유지했다.
- PR #169 merge `e709f2c`, main workflow `37157666983`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `e709f2c`는 HTTP 200·STATIC·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-DIRECT-VIDEO-SHARE-20261004`, `E-PLAYWRIGHT-DIRECT-VIDEO-SHARE-20261004`, `E-DEPLOY-PIPELINE-DIRECT-VIDEO-SHARE-20261004`, `E-LIVE-PUBLIC-DIRECT-VIDEO-SHARE-20261004`.

## 전문가 영상 공유 맥락 고도화 감사 — 68efaca — 2026-10-04

- 선택 영상 ID를 `?video=...#expert-videos`에 보존하고 재진입 시 복원했다. 현재 장·선택 영상 제목을 브라우저 제목과 공유 payload에 연결해 공유받은 사람이 같은 맥락에서 읽도록 했다. recovery heading의 접근성 문장도 자연스럽게 보정했다.
- 로컬 UI 계약·typecheck·127개 테스트·build가 통과했고, 320·390·1440px Chrome fallback에서 영상 선택 → 공유 URL 생성 → 새로고침 복원을 확인했다. 선택 영상 제목·진행 표시·가로 폭이 유지됐고 초기 포스터에는 iframe이 로드되지 않았다. 기본 `/guide/` 390px 진입은 YouTube 요청 0건이었다.
- PR #167 merge `a1de959`, heartbeat PR #168 merge `68efaca`, main workflow `37156517433`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다. live validator candidate `68efaca`는 HTTP 200·STATIC·공개 데이터·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-VIDEO-SHARE-CONTEXT-20261004`, `E-PLAYWRIGHT-VIDEO-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-VIDEO-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-VIDEO-SHARE-CONTEXT-20261004`.

## Mobile Publishing Performance Audit — d71ab6c — 2026-10-04

- 첫 화면에 보이지 않는 전문가 영상 썸네일을 `loading="lazy"`·낮은 우선순위로 전환하고 장문 제목에 균형 잡힌 줄바꿈을 적용했다. 연구 카피·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약·typecheck·127개 테스트·build가 통과했고, 로컬 390px 초기 진입에서 YouTube 썸네일 요청 0건을 확인했다. 공개 320·390·1440px `#expert-videos` 직접 진입은 제목 131/132/151px, `전문가 영상 10 / 12`, 가로 폭 일치, 오류 없음으로 안정적이었다. 근육 연구 카드 선택도 `근육 연구 결과`로 도착했다.
- PR #166 및 main workflow `37154976973`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator candidate `d71ab6c`는 HTTP 200·STATIC·bundleHashes 70·claims 12·masterRecords 6·products 1·sharePages 6·teaser HOLD·제품 독립 경계를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-PERFORMANCE-20261004`, `E-PLAYWRIGHT-MOBILE-PERFORMANCE-20261004`, `E-DEPLOY-PIPELINE-MOBILE-PERFORMANCE-20261004`, `E-LIVE-PUBLIC-MOBILE-PERFORMANCE-20261004`.

## Direct Chapter Link Stability Audit — 818cc2f — 2026-10-04

- 공유 링크로 `#expert-videos` 같은 장에 직접 들어올 때 이미지·폰트·레이아웃 로딩 순서에 따라 제목이 늦게 정렬될 수 있는 흐름을 PR #165에서 보완했다. 초기 정렬에 더해 `window.load`, `document.fonts`, `ResizeObserver`와 180·420·780·1200·1800ms 안정화 재정렬을 연결했다.
- 로컬 typecheck·UI 계약·127개 테스트·build가 통과했고, 320·390·1440px Chrome fallback에서 제목이 고정 읽기 레일 아래에 놓이고 진행 상태가 `전문가 영상 10 / 12`로 유지되며 영상 영역·가로 폭·브라우저 오류가 안정적이었다. main workflow `37153757926`, Pages 배포·라이브 smoke·release status와 live validator candidate `818cc2f`도 통과했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-DEEP-LINK-ALIGN-20261004`, `E-PLAYWRIGHT-DEEP-LINK-ALIGN-20261004`, `E-DEPLOY-PIPELINE-DEEP-LINK-ALIGN-20261004`, `E-LIVE-PUBLIC-DEEP-LINK-ALIGN-20261004`.

## Expert Video Feature Focus Audit — c33b427 — 2026-10-04

- 전문가 영상 카드를 선택한 뒤 동적 영상 영역으로 포커스가 이동하지 않아 키보드·스크린리더 사용자가 새 콘텐츠 위치를 놓칠 수 있는 결함을 PR #164에서 보완했다. `#expert-video-feature`에 동적 제목 연결과 `aria-live`를 유지하고, 새 영상 선택 시 실제 포커스를 영상 영역으로 복귀시켰다.
- 로컬 typecheck·UI 계약·127개 테스트·build가 통과했고, 390px Chrome fallback에서 클릭·Enter 선택 후 `#expert-video-feature` 포커스·focus-visible 윤곽선·iframe 선택 상태·가로 폭·브라우저 오류 없음을 확인했다. main workflow `37152307391`, Pages 배포·라이브 smoke·release status와 live validator candidate `c33b427`도 통과했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-VIDEO-FEATURE-FOCUS-20261004`, `E-PLAYWRIGHT-VIDEO-FEATURE-FOCUS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-FEATURE-FOCUS-20261004`, `E-LIVE-PUBLIC-VIDEO-FEATURE-FOCUS-20261004`.

## Public Release Interaction and Cross-Viewport Recheck — 4d94150 — 2026-10-04

- 최신 공개본을 실제 독자 흐름으로 재감리했다. 390px에서 메뉴 열림·첫 항목 포커스·Escape 닫힘·토글 포커스 복귀·`#academic` 이동, 연구 지도에서 근육 카드 선택, 수면 영상 필터 4개 전환·YouTube iframe 재생, 3초 회복 카드 자동 전환을 확인했다.
- 320·390·412·768·1440px에서 `#recovery-break`, `#research`, `#expert-videos`, `#final` 직접 진입을 확인했고 제목이 고정 읽기 레일 아래에 놓이며 진행 상태·문서 가로 폭·브라우저 오류가 안정적으로 유지됐다. 라이브 validator는 HTTP 200, STATIC, candidate `4d94150`, bundleHashes 70, claims 12, masterRecords 6, products 1, sharePages 6, teaser publicUrl false를 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않아 코드 변경은 하지 않았다. NAVI 문서 동기화 후 main workflow `37151251781`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-PLAYWRIGHT-PUBLIC-INTERACTION-AUDIT-20261004`, `E-PLAYWRIGHT-PUBLIC-HASH-CROSSWIDTH-20261004`, `E-DEPLOY-PIPELINE-PUBLIC-RECHECK-20261004`, `E-LIVE-PUBLIC-CURRENT-RECHECK-20261004`.

## Mobile Menu Focus Restoration Audit — 510e9ad — 2026-10-04

- 모바일 메뉴 항목 이동과 메뉴 바깥 배경 클릭으로 닫히는 경로에서 포커스가 문서 배경으로 남을 수 있던 결함을 확인하고 PR #163에서 메뉴 토글 버튼 복귀를 보완했다. 메뉴 링크 경로와 `pointerdown` 외부 닫힘 경로를 모두 처리했으며 공개 과학 카피·제품 독립 경계는 변경하지 않았다.
- 로컬 typecheck·UI contract·127 tests·build, 공개 390px Chrome fallback에서 첫 링크 포커스·`#academic` 이동·배경 닫기·토글 포커스 복귀·가로 폭·브라우저 오류 없음을 확인했다. PR #163 checks, main workflow `37149705144`, Pages·라이브 smoke·release status와 live validator candidate `510e9ad`가 통과했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS-20261004`, `E-PLAYWRIGHT-MOBILE-MENU-FOCUS-20261004`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS-20261004`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS-20261004`.

## Direct Hash Entry Alignment Audit — 70d66b5 — 2026-10-04

- 직접 해시 진입(` #recovery-break`, `#research`, `#expert-videos`)에서 제목이 늦게 고정 읽기 레일에 맞춰지던 결함을 PR #162에서 `useLayoutEffect` 초기 정렬과 180/420/780ms 안정화 재정렬로 보완했다.
- 로컬 typecheck·UI 계약·127개 테스트·build, 공개 390px Chrome fallback에서 세 해시의 제목 정렬·진행 상태·가로 폭·브라우저 오류를 확인했다. 각 제목은 120ms 시점에 읽기 레일 아래에 놓였고, 결과는 `PASS_WITH_CONDITIONS`를 유지한다.
- PR #162 merge commit `70d66b5`, main workflow `37148328986`, Pages 배포·라이브 smoke·release status와 live validator가 통과했다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증 항목이다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.

증적: `E-LOCAL-BUILD-DIRECT-HASH-NAV-20261004`, `E-PLAYWRIGHT-DIRECT-HASH-NAV-20261004`, `E-DEPLOY-PIPELINE-DIRECT-HASH-NAV-20261004`, `E-LIVE-PUBLIC-DIRECT-HASH-NAV-20261004`.

## Mobile Reading Clarity Audit — 37737d2 — 2026-10-04

- 모바일에서 읽기 기능에 직접 필요한 진행 상태·장 표시·연구 출처·결과 방향 라벨을 12px 기준으로 보정하고, 읽기 크기 조절 버튼에 보이는 `가+`/`가−` 표기를 추가했다. 장식용 숫자와 공개 연구 카피·제품 독립 경계는 변경하지 않았다.
- 로컬 typecheck·UI contract·127 tests·build, 공개 320/390/1440px Chrome fallback에서 가로 넘침 0·브라우저 오류 0·상세 연구 카드 5개·읽기 크기 전환을 확인했다. 320/390px 기능 라벨은 12px, `가+`에서 `가−`로 전환되며 상태 문구가 표시된다.
- PR #161 merge commit `37737d2`, main workflow `37147186088`, Pages 배포·라이브 smoke·release status와 live validator candidate `37737d2`가 모두 통과했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-READING-CLARITY-20261004`, `E-PLAYWRIGHT-MOBILE-READING-CLARITY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-READING-CLARITY-20261004`, `E-LIVE-PUBLIC-MOBILE-READING-CLARITY-20261004`.

## Expert Video Thumbnail Resolution Audit — 52ff08b — 2026-10-04

- YouTube `maxres`/`hq` 썸네일이 오류가 아닌 저해상도 성공 응답을 반환하는 경우를 새 결함 표면으로 분류했다. decoded width가 200px 미만이면 대체 URL을 시도하고, 두 URL 모두 기준 미달이면 `GABA VIDEO` 표지를 노출하도록 PR #160에서 보완했다.
- 로컬 typecheck·UI contract·127 tests·build, 로컬 390px 저해상도 강제 Playwright, 공개 320/390/1440px 정상 로딩과 공개 390px 저해상도 강제 Playwright, main workflow `37145916564`, Pages·라이브 smoke·release status·live validator `52ff08b`를 통과했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-RESOLUTION-20261004`.

## Expert Video Thumbnail Fallback Audit — 342f43f — 2026-10-04

- 전문가 영상 게시판에서 기본·대체 썸네일 URL이 모두 실패하는 네트워크 조건을 재현했다. 기존 구현은 실패한 이미지 요소가 `GABA VIDEO` 표지를 가릴 수 있었으므로, 두 요청이 모두 실패한 뒤에만 이미지 요소를 숨기고 설계된 fallback 표면을 드러내도록 PR #158에서 보완했다.
- 로컬 typecheck·UI contract·127개 테스트·build와 PR #158 checks가 통과했다. 공개 320/390/1440px에서 첫 4개 eager 로드, 9개 스크롤 후 로드, 가로 넘침 없음·브라우저 오류 없음을 확인했고, 390px 강제 이중 실패에서 `is-unavailable`·표지 노출을 확인했다. main workflow `37144428732`, Pages·라이브 smoke·release status·live validator도 통과했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-FALLBACK-20261004`.

## Expert Video Thumbnail Loading Audit — 8093615 — 2026-10-04

- 모바일 전문가 영상 게시판에서 일부 lazy 썸네일이 초기 캡처 시 빈 연한 박스로 남아 시각적 완성도를 떨어뜨리는 경미한 결함을 확인했다. 첫 4개 이미지를 eager 로드하고 나머지는 lazy 로드로 유지했으며, 로딩 전에는 `GABA VIDEO` 표지를 노출하도록 보완했다.
- 로컬·공개 Chrome fallback 320/390/1440px에서 가로 넘침·브라우저 오류 없음, 첫 4개 eager 로드, 9개 썸네일 구조, `수면` 필터 4개 카드, 카드 선택 후 YouTube iframe·로딩 상태 전환을 확인했다. PR #155와 main workflow `37142835851`, Pages·라이브 smoke·release status·live validator도 통과했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAILS-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAILS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAILS-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAILS-20261004`.

## Mobile Definition Card Motif Audit — 4e558ee — 2026-10-04

- 320px 공개 화면에서 두 번째 GABA 기본 설명 카드의 달 아이콘이 본문과 시각적으로 겹치는 경미한 가독성 결함을 확인했다. 모바일 카드 하단에 장식 전용 여백을 추가해 본문과 아이콘 사이 6px 간격을 확보했다.
- 로컬과 공개 Chrome fallback 320/390px에서 카드 폭 280/350, 가로 넘침 없음, 브라우저 오류 없음과 본문-아이콘 분리를 재확인했다. PR #153 검사와 main workflow `37141668244`, Pages·라이브 smoke·release status·live validator도 통과했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-DEFINITION-MOTIF-20261004`, `E-PLAYWRIGHT-DEFINITION-MOTIF-20261004`, `E-DEPLOY-PIPELINE-DEFINITION-MOTIF-20261004`, `E-LIVE-PUBLIC-DEFINITION-MOTIF-20261004`.

## Mobile Research Card Width Audit — 7a6db416 — 2026-10-04

- 연구 결과 카드의 모바일 좌우 여백이 320px에서 도표 문구를 조기에 줄바꿈시키고 카드 높이를 키우는 경미한 사용성 결함을 확인했다. 카드 내부 폭을 모바일 가용 폭으로 확장했으며 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 typecheck/UI contract/127 tests/build, PR #151 검사, main workflow `37140273727`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 Playwright Chrome fallback 320/390/1440px에서 카드·도표 폭 개선, 가로 넘침 없음, 브라우저 오류 없음을 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser 플러그인 부재로 Chrome fallback을 사용했으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-CARD-WIDTH-20261004`, `E-PLAYWRIGHT-RESEARCH-CARD-WIDTH-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-CARD-WIDTH-20261004`, `E-LIVE-PUBLIC-RESEARCH-CARD-WIDTH-20261004`.

## Chapter Entry Clearance Recheck — b9f21d0 — 2026-10-04

- 장 진입 스크롤 기준을 제목 단일 요소에서 장 헤더 전체로 보정해 고정 읽기 진행 바와 작은 장 표시의 겹침을 해소했다. 320px·390px·1440px에서 `#research` 직접 진입 후 장 표시가 진행 바 아래에 노출되고 가로 넘침·브라우저 오류가 없었다.
- PR #149 검사, 로컬 typecheck/UI contract/127 tests/build, main workflow `37139270708`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 계속 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-CHAPTER-ENTRY-20261004`, `E-PLAYWRIGHT-CHAPTER-ENTRY-20261004`, `E-DEPLOY-PIPELINE-CHAPTER-ENTRY-20261004`, `E-LIVE-PUBLIC-CHAPTER-ENTRY-20261004`.

## Mobile Expert Video Topic Visibility Recheck — 71960f0 — 2026-10-04

- 모바일에서 일부 주제가 가로 스크롤 뒤에 숨던 탐색 단서를 전체 주제 줄바꿈으로 바꿔 320px·390px에서 7개 필터가 모두 보이도록 보완했다. `수용체` 선택은 해당 영상 1개와 iframe으로 전환된다.
- PR #147 검사, 로컬 typecheck/UI contract/127 tests/build, main workflow `37138030444`, Pages 배포·라이브 smoke·release status, 공개 validator와 320/390/1440px Playwright Chrome fallback이 통과했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 계속 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-FILTERS-20261004`, `E-PLAYWRIGHT-VIDEO-FILTERS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-FILTERS-20261004`, `E-LIVE-PUBLIC-VIDEO-FILTERS-20261004`.

## Explicit Original-Source Action Recheck — 32b37a1 — 2026-10-04

- 출처 카드에 `원문 보기`를 추가해 아이콘 의미를 추측하지 않고 PubMed 원문으로 이어지는 행동을 한눈에 인식하도록 보강했다. 이는 기존 연구 결과나 제품 경계를 바꾸지 않는 정보 구조 개선이다.
- PR #145 검사, 로컬 typecheck/UI contract/127 tests/build, main workflow `37136765623`, Pages 배포·라이브 smoke·release status, 공개 validator와 320/390/1440px Playwright Chrome fallback이 통과했다. 공개 클릭 검증은 PubMed 새 탭 URL까지 확인했고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 계속 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-SOURCE-ACTION-20261004`, `E-PLAYWRIGHT-SOURCE-ACTION-20261004`, `E-DEPLOY-PIPELINE-SOURCE-ACTION-20261004`, `E-LIVE-PUBLIC-SOURCE-ACTION-20261004`.

## Source Reading Bridge Recheck — a8cc869 — 2026-10-04

- 제목·설명만 있던 `출처 읽기` 구간을 네 가지 연구 읽기 질문과 실제 PubMed 원문 예시가 있는 편집형 브리지로 보강했다. 방문자는 연구 결과를 바로 단정하지 않고 대상·비교·관찰 결과·해석 범위를 순서대로 확인할 수 있다.
- PR #143 검사, 로컬 typecheck/UI contract/127 tests/build, main workflow `37135553445`, Pages 배포·라이브 smoke·release status, 공개 validator와 320/390/1440px Playwright Chrome fallback이 통과했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 계속 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-SOURCE-BRIDGE-20261004`, `E-PLAYWRIGHT-SOURCE-BRIDGE-20261004`, `E-DEPLOY-PIPELINE-SOURCE-BRIDGE-20261004`, `E-LIVE-PUBLIC-SOURCE-BRIDGE-20261004`.

## NAVI Documentation Sync Recheck — 6212511 — 2026-10-04

- NAVI 문서 PR #141 병합 후 main workflow `37134462216`와 라이브 validator를 재확인했다. 문서 병합은 공개 UI·과학 카피·제품 경계를 변경하지 않았고, 정적 공개 candidate `6212511…`가 최신 main과 일치한다.
- 기존 코드 개선의 모바일 차트 가독성·긴 장 이동 검증은 `E-LOCAL-BUILD-CHART-NAV-20261004` 및 `E-PLAYWRIGHT-MOBILE-CHART-NAV-20261004`에 남아 있으며, 최신 공개 SHA 동기화는 `E-LIVE-PUBLIC-NAVI-SYNC-20261004`로 기록했다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 계속 외부 검증 항목이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LIVE-PUBLIC-NAVI-SYNC-20261004`.

## Mobile Chart Readability and Long-Jump Navigation Recheck — b778f23 — 2026-10-04

- 모바일 연구 결과 도표의 비교 조건·연구 메타데이터에 작은 화면용 글자 바닥값을 적용했고, 사용자의 메뉴 이동 뒤 초기 hash 정렬이 다시 실행되던 충돌을 수동 이동 취소 ref로 보완했다. 제품 독립 과학 카피·출처·연구 데이터는 변경하지 않았다.
- PR #140의 release-verify·site-quality-verify, 로컬 typecheck/UI contract/127 tests/build가 통과했고, main workflow `37133909361`의 release-verify·worker-readiness·Pages 배포·smoke-live·release status가 성공했다. Worker는 `STATIC_ONLY`라 건너뛰었다.
- 공개 validator candidate `b778f23b65a67cf919171d212a9305927a34d0ff`, HTTP 200, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`, 내부 운영 스냅샷 제외, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. 공개 Playwright Chrome fallback 320/390/1440px에서 차트 폭·가로 넘침·연구 지도 장 이동·전문가 영상 선택 재생·브라우저 오류 없음을 확인했다.
- Browser 플러그인은 사용할 수 없어 Playwright Chrome fallback으로 대체했다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 계속 외부 검증 항목이며 결과는 `PASS_WITH_CONDITIONS`다.

증적: `E-LOCAL-BUILD-CHART-NAV-20261004`, `E-PLAYWRIGHT-MOBILE-CHART-NAV-20261004`, `E-DEPLOY-PIPELINE-CHART-NAV-20261004`, `E-LIVE-PUBLIC-CHART-NAV-20261004`.

## Research Scale Infographic Polish — b8e6236 — 2026-10-03

- 연구 규모 인포그래픽에서 같은 PubMed 검색 기준의 Harvard·Oxford 문헌을 같은 비교 그룹으로 묶고, 별도 WoS Core Collection SCIE 분석은 독립된 강조 블록으로 분리했다. 큰 수치는 유지하되 서로 다른 조사 범위를 하나의 막대 척도로 오인하지 않도록 시각 구조를 정리했으며, 과학·제품 카피는 추가하지 않았다.
- PR #119 로컬 typecheck/UI contract/127 tests/build/perf가 통과했고, main workflow `37118207429`의 release-verify·worker-readiness·Pages 배포·smoke-live·release-status가 성공했다. Worker는 `STATIC_ONLY`라 건너뛰었다.
- live candidate `b8e6236d6dc749ea23191e45dd58d0ab9c542a0a`, HTTP 200, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`, 내부 운영 스냅샷 제외, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. Chrome CDP fallback에서 390px은 기관 비교 2개·SCIE 강조 1개, 320px과 1440px은 가로 넘침 없음, 피부 연구 지도 선택은 읽기 레일·상세 카드와 동기화됐다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 계속 외부 검증 항목이다.

증적: `E-LOCAL-BUILD-RESEARCH-SCALE-20261003`, `E-CDP-RESEARCH-SCALE-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-SCALE-20261003`, `E-LIVE-PUBLIC-RESEARCH-SCALE-20261003`.

## Sticky Research Rail Orientation — 77a3032 — 2026-10-03

- 긴 연구 카드 구간에서 현재 읽는 주제를 잃지 않도록 sticky 읽기 레일에 활성 연구 결과 제목을 표시했다. 연구 지도에서 피부를 선택하면 `피부 연구 결과`와 `research-skin` 카드가 함께 활성화되며, 좁은 화면에서는 제목을 한 줄 말줄임으로 보호한다.
- PR #117의 로컬 typecheck/UI contract/127 tests/build가 통과했고, main workflow `37116937264`의 release-verify·worker-readiness·Pages 배포·smoke-live·release-status가 성공했다. Worker는 정적 전용 모드라 건너뛰었다.
- live validator candidate `77a30323d2e5097a0f2be092c013615b1ee2ddd6`, HTTP 200, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`, 내부 운영 스냅샷 제외, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. Chrome CDP fallback 390px에서 레일 `피부 연구 결과`, 카드 top `113px`, document width `390px`, overlay false를 확인했고 320px은 한 열, 1440px은 가로 넘침이 없었다.
- 새 과학·제품 주장은 추가하지 않았다. Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했으며, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 계속 외부 검증 항목이다.

증적: `E-LOCAL-BUILD-RESEARCH-RAIL-ORIENTATION-20261003`, `E-CDP-RESEARCH-RAIL-ORIENTATION-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-RAIL-ORIENTATION-20261003`, `E-LIVE-PUBLIC-RESEARCH-RAIL-ORIENTATION-20261003`.

## Mobile Research Comparison Polish — 4058bf6 — 2026-10-03

- PR #115에서 연구 결과 비교 도표를 모바일에서 재구성했다. 390px에서는 비교 조건과 GABA 조건을 좌우로 나란히 보여주고, 320px에서는 한 열로 전환해 문구를 보존한다. 차트의 보조기기용 라벨에는 각 행의 두 조건별 관찰 문장을 포함했다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 311,157, CSS 95,703, total assets 1,455,334. PR #115 checks와 main workflow `37115590977`의 release-verify·worker-readiness·Pages 배포·smoke-live·release-status가 성공했고 Worker는 `STATIC_ONLY`라 건너뛰었다.
- live validator candidate `4058bf61ed25d8fc95b3023f1187cdd78436cdb4`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. Chrome CDP fallback 390px에서 lanes `120.5px 120.5px`, chart height `603.84px`, document width `390px`; 320px에서 lanes `178px`, document width `320px`; 1440px document width는 `1425px`였다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 외부 검증 항목이며 자동화 결과를 그 완료로 확대하지 않는다.

증적: `E-LOCAL-BUILD-MOBILE-COMPARISON-20261003`, `E-CDP-MOBILE-COMPARISON-20261003`, `E-DEPLOY-PIPELINE-MOBILE-COMPARISON-20261003`, `E-LIVE-PUBLIC-MOBILE-COMPARISON-20261003`.

## Expert Video Gallery Polish — 10a6192 — 2026-10-03

- PR #113에서 전문가 영상 썸네일을 고해상도 우선·`hqdefault` 대체 경로로 보완하고, 모바일 주제 필터에 다음 항목 존재를 알려주는 연속성 단서를 추가했다. 과학 카피·제품 경계·선택 영상 즉시 재생은 변경하지 않았다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 311,157, CSS 95,703, total assets 1,454,704. PR #113 checks와 main workflow `37114410997`의 release-verify·worker-readiness·Pages 배포·smoke-live·release-status가 성공했고 Worker는 `STATIC_ONLY`라 건너뛰었다.
- live validator candidate `10a61920df8bbcbe1b6f288a1d61425f48687800`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. Chrome CDP fallback 390px에서 필터 `scrollWidth 705 / clientWidth 322`, maxres 썸네일, `연구 읽기` 선택 카드·iframe, 가로 폭 390px를 확인했고 끝까지 이동하면 `has-more` 단서가 사라졌다. 1440px document width는 `1425px`였다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 외부 검증 항목이며 자동화 결과를 그 완료로 확대하지 않는다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-BROWSING-20261003`, `E-CDP-EXPERT-VIDEO-BROWSING-20261003`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-BROWSING-20261003`, `E-LIVE-PUBLIC-EXPERT-VIDEO-BROWSING-20261003`.

## Final Public Recheck — 16fc5d4 — 2026-10-03

- NAVI 문서 PR #111 병합 후 main workflow `37113016531`의 release-verify·worker-readiness·Pages 배포·smoke-live·release-status가 성공했다. Worker 실제 배포는 정적 전용 모드로 건너뛰었다.
- 최종 `validate:live-public`은 HTTP 200, `STATIC`, candidate `16fc5d491c3a4bae1f81d060727fac111e48df33`, 70개 번들 해시, 12개 공개 claim, 6개 master record, 6개 share page, `teaser HOLD`, 내부 운영 스냅샷 제외, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 여전히 외부 검증 항목이다. 자동화 완료를 외부 검증 완료로 확대하지 않는다.

증적: `E-LIVE-PUBLIC-NAVI-MERGE-20261003`.

## Latest Public Release Recheck — cbd2f8e — 2026-10-03

- 연구 지도에서 주제를 선택할 때 상세 카드에도 즉시 활성 상태를 표시해 긴 모바일 페이지의 방향 감각을 보완했다. 새 과학·제품 주장이나 출처 변경은 없었다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 311,157, CSS 95,703, total assets 1,453,735. PR #110 checks와 main `37112425820`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 건너뛰었다.
- live validator candidate `cbd2f8ea1d5b341dbe5804b5f16f756e157c553b`, generatedAt `2026-10-03T09:16:03.359Z`, HTTP 200, 70 hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. 라이브 CDP 390px에서 지도 `인지`와 카드 `research-cognition`이 함께 활성화되고 target top `113.09px`, rail bottom `105px`, document width `390px`, overlay false, errors `[]`를 확인했다. 1440px document width는 `1425px`였다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-ORIENTATION`, `E-CDP-RESEARCH-MAP-ORIENTATION`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-ORIENTATION`, `E-LIVE-PUBLIC-RESEARCH-MAP-ORIENTATION`.

## Latest Public Release Recheck — c6291f6 — 2026-10-03

- 모바일에서 전역으로 숨겨지던 작은 장 제목을 다시 표시해 수면·회복, 연구 규모, 출처 읽기, 이야기 공유의 위치 단서를 복원했다. 과학 카피·제품 경계·연구 데이터는 변경하지 않았다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 311,157, CSS 95,703, total assets 1,453,225. PR #108 checks와 main `37111226511`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 건너뛰었다.
- live validator candidate `c6291f6bd2c62e77529da767b1d2a985f4acaab5`, generatedAt `2026-10-03T08:54:53.143Z`, HTTP 200, 70 hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. 라이브 CDP 390px의 5개 작은 제목은 모두 `display:block`·14px로 표시됐고, 수면·회복 number top `109.5px`, heading top `133.5px`, final number top `109.9px`, rail bottom `105px`, document width `390px`를 확인했다. 메뉴 열림 `aria-expanded=true`·본문 스크롤 잠금·닫힘 복원과 1440px document width `1425px`도 확인했다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-CHAPTER-LABELS`, `E-CDP-MOBILE-CHAPTER-LABELS`, `E-DEPLOY-PIPELINE-MOBILE-CHAPTER-LABELS`, `E-LIVE-PUBLIC-MOBILE-CHAPTER-LABELS`.

## Latest Public Release Recheck — 2ae71ef — 2026-10-03

- 모바일 장 진입 시 고정 읽기 진행 레일이 장 번호·제목 첫 줄을 가리던 UI 결함을 PR #106의 110px 상단 여백과 정적 UI contract guard로 보완했다. 과학 카피·제품 경계·연구 데이터는 변경하지 않았다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 311,157, CSS 95,703, total assets 1,453,052. PR #106 checks와 main `37109900221`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 건너뛰었다.
- live validator candidate `2ae71ef1e1aa7c5ff71ca429197ad70c22dce3c1`, HTTP 200, 70 hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. 라이브 CDP 390px exact entry는 number `110.19px`, heading `124.19px`, rail bottom `105px`, document width `390px`; 메뉴 열린 상태 `aria-expanded=true`·본문 스크롤 잠금·닫힘 복원; 1440px 제목·히어로·헤더/내비게이션·document width `1425px`를 확인했다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RAIL-TITLE-CLEAR`, `E-CDP-RAIL-TITLE-CLEAR`, `E-DEPLOY-PIPELINE-RAIL-TITLE-CLEAR`, `E-LIVE-PUBLIC-RAIL-TITLE-CLEAR`.

## Latest Public Release Recheck — bf235ed — 2026-10-03

- 기본 공개 GABA 안내서 entry만 선행 import하고, 대기 중에도 브랜드·히어로 리듬을 유지하는 반응형 loading shell을 추가했다. 다른 route는 lazy loading을 유지했고 과학 카피·제품 경계는 변경하지 않았다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 311,157, CSS 95,703, total 1,452,939. PR #104 checks `37108351783`·`37108351789`와 main `37108431389` release-verify/worker-readiness/Pages publish/smoke-live/release-status가 성공했다. Worker는 `STATIC_ONLY`라 건너뛰었다.
- live validator candidate `bf235edeeea780dd42d0261a5760f100cff2ba9d`, generatedAt `2026-10-03T08:04:35.204Z`, HTTP 200, 70 hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. Live CDP 390px 메뉴 열린 상태와 1440px 제목·내비게이션·히어로·가로 폭 1425를 확인했다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-GUIDE-LOADING-SHELL`, `E-CDP-GUIDE-LOADING-SHELL`, `E-DEPLOY-PIPELINE-GUIDE-LOADING-SHELL`, `E-LIVE-PUBLIC-GUIDE-LOADING-SHELL`.

## Latest Public Release Recheck — b9160e4 — 2026-10-03

- 모바일 메뉴가 열린 상태에서 키보드 Tab·Shift+Tab 포커스를 메뉴 내부로 순환시키고 현재 읽는 장을 `location`으로 노출했다. 기존 시각 디자인·연구 카피·제품 경계는 유지했다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 309,865, CSS 92,953, total 1,448,897.
- PR #102 checks `37106896121`·`37106996105`와 main `37106966171` release-verify/worker-readiness/Pages publish/smoke-live/release-status가 성공했다. Worker는 `STATIC_ONLY`라 건너뛰었다.
- live validator candidate `b9160e40fbca673134ca1563651a00d8dfdd615a`, generatedAt `2026-10-03T07:38:26.221Z`, HTTP 200, 70 hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. Live CDP 390px 포커스 순환·메뉴 열림/닫힘과 1440px 데스크톱 가로 폭 1425를 확인했다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-FOCUS-TRAP`, `E-CDP-MOBILE-FOCUS-TRAP`, `E-DEPLOY-PIPELINE-MOBILE-FOCUS-TRAP`, `E-LIVE-PUBLIC-MOBILE-FOCUS-TRAP`.

## Latest Public Release Recheck — 9c2913d — 2026-10-03

- 읽기 진행 레일의 실제 DOM 순서를 13장으로 정합화하고 수면·회복 프롤로그를 03/13으로 표시했다. 해시 링크와 모바일 전문가 영상 선택 이동은 sticky header·reading rail 아래에 도착하도록 보정했다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 309,865, CSS 92,953, total 1,448,297.
- PR #100 checks와 main `37105696713`의 release-verify/worker-readiness/Pages publish/smoke-live/release-status가 성공했다. Worker는 `STATIC_ONLY`라 건너뛰었다.
- live validator candidate `9c2913db11440b10734345bc5bcba1d31161cc71`, generatedAt `2026-10-03T07:15:35.007Z`, HTTP 200, 70 hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. Live CDP 390px에서 해시 도착 위치·메뉴 열림/닫힘을, 1440px에서 데스크톱 내비게이션과 가로 폭 1425를 확인했다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-READING-RAIL-DEEPLINK`, `E-CDP-READING-RAIL-DEEPLINK`, `E-DEPLOY-PIPELINE-READING-RAIL-DEEPLINK`, `E-LIVE-PUBLIC-READING-RAIL-DEEPLINK`.

## Latest Public Release Recheck — 3d788e3 — 2026-10-03

- 모바일·태블릿 메뉴가 열린 상태에서 배경을 분리하고 body 스크롤을 잠그며, 배경 버튼으로 닫을 수 있도록 보완했다. 닫은 뒤 `overflow: visible`과 메뉴 상태가 복원된다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 309,865, CSS 92,953, total 1,448,098.
- PR #98 checks `37104089583`·`37104089543`와 main `37104179510` release-verify/worker-readiness/Pages publish/smoke-live/release-status가 성공했다. Worker는 `STATIC_ONLY`라 건너뛰었다.
- live validator candidate `3d788e39ef4d1dfa9d6d20845380ddcf7bfcc255`, generatedAt `2026-10-03T06:47:43.507Z`, HTTP 200, 70 hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. Live CDP 390px에서 메뉴 열림·닫힘과 스크롤 잠금·복원, 1440px에서 데스크톱 내비게이션과 가로 폭 1425를 확인했다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS`, `E-CDP-MOBILE-MENU-FOCUS`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS`.

## Latest Public Release Recheck — cf2f123 — 2026-10-03

- 연구 비교 도표에서 효과 크기처럼 보일 수 있던 장식형 신호를 증가·감소 방향 화살표와 명시적 라벨로 바꿨다. 조건명은 모바일에서도 한 단위로 유지된다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 309,865, CSS 92,953, total 1,447,491.
- PR #96 checks `37102991208`·`37102991278` and main `37103072296` release-verify/worker-readiness/Pages publish/smoke-live/release-status success; worker STATIC_ONLY skipped.
- live validator candidate `cf2f123a74013956399306c591f2de261d1bf049`, generatedAt `2026-10-03T06:27:38.833Z`, HTTP 200, 70 hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. Live CDP 390/1440 rendered direction labels, widths 390/1425, errors `[]`.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-OUTCOME-DIRECTION`, `E-CDP-RESEARCH-OUTCOME-DIRECTION`, `E-DEPLOY-PIPELINE-RESEARCH-OUTCOME-DIRECTION`, `E-LIVE-PUBLIC-RESEARCH-OUTCOME-DIRECTION`.

## Latest Public Release Recheck — b1afe87 — 2026-10-03

- 전문가 영상 게시판에 주제 필터·영상 수를 추가해 영상 확장에 따른 탐색 부담을 낮췄고, 선택 주제·카드 목록·선택 영상·즉시 재생을 동기화했다. 모바일 활성 필터는 가로 스크롤 안에서 중앙 정렬된다.
- 로컬 typecheck/UI contract/127 tests/build/perf pass; 11 routes/70 files, initial JS 309,865, CSS 92,953, total 1,446,627.
- PR #94 checks `37101853245`·`37101853172` and main `37101931045` release-verify/worker-readiness/Pages publish/smoke-live/release-status success; worker STATIC_ONLY skipped.
- live validator candidate `b1afe879a3266dd802e4f3d470a49d5985616b70`, generatedAt `2026-10-03T06:06:50.513Z`, HTTP 200, 70 hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal ops excluded, `smartStoreOnly`, `removed750`, `provenance matched`. Live CDP 390/1440 selected filter/card, widths 390/1425, errors `[]`.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-FILTER`, `E-CDP-EXPERT-VIDEO-FILTER`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-FILTER`, `E-LIVE-PUBLIC-EXPERT-VIDEO-FILTER`.

## Latest Public Release Recheck — bed5bf3 — 2026-10-03

- 연구 비교 도표는 보고되지 않은 수치를 시각적으로 만들어내지 않도록 1·2단계 상대 방향 신호로 보완했고, 조건명을 `비교 조건`·`GABA 섭취`로 중립화했다. 안내 문구는 신호 개수가 실제 효과 크기나 수치를 뜻하지 않는다고 명시한다.
- 로컬 typecheck, UI contract, research copy, 127개 테스트, production build·정적 bundle·성능 예산이 통과했다. 정적 Pages 번들은 11개 라우트·70개 파일·초기 JS 309,865 bytes·CSS 92,953 bytes·전체 1,444,313 bytes였다.
- PR #92 checks `37100682489`·`37100682442`와 main workflow `37100751730`의 release-verify·worker-readiness·Pages publish·smoke-live·release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 candidate `bed5bf3245d489e74a79b33249bcdf9fba00668d`, generatedAt `2026-10-03T05:44:39.892Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal operations snapshots 제외, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. 라이브 390/1440px CDP에서 신호 표시·중립 라벨·가로 폭 390/1425·runtime errors `[]`를 확인했다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-QUALITATIVE-DIRECTION`, `E-CDP-QUALITATIVE-DIRECTION`, `E-DEPLOY-PIPELINE-QUALITATIVE-DIRECTION`, `E-LIVE-PUBLIC-QUALITATIVE-DIRECTION`.

## Latest Public Release Recheck — 0257636 — 2026-10-03

- 연구 비교 도표는 정량 효과 크기가 보고되지 않은 연구에서 임의 막대 길이를 사용하지 않는다. 비교 조건은 같은 길이의 점선 리본, GABA 조건은 같은 길이의 실선 리본으로 표시하고, 카드 문구도 정확한 수치 비교가 아니라 관찰된 변화 방향을 보여준다는 점을 명시한다.
- 로컬 typecheck, UI contract, research copy, public export, production build·정적 bundle·성능 예산과 127개 테스트가 통과했다. 정적 Pages 번들은 11개 라우트·70개 파일·초기 JS 309,865 bytes·CSS 92,953 bytes·전체 1,443,832 bytes였다.
- PR #89 checks `37099258471`·`37099258406`은 성공했다. 첫 main workflow `37099359755`는 코드가 아닌 TF heartbeat age 484분 초과로 중단됐고, PR #90에서 heartbeat를 갱신한 뒤 checks `37099478278`·`37099478245`와 최종 main workflow `37099561557`의 release-verify·worker-readiness·Pages publish·smoke-live·release-status가 모두 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 candidate `0257636233ae758a4bc6e90dac7c77e6fd42bc67`, generatedAt `2026-10-03T05:22:11.052Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal operations snapshots 제외, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. 390/1440px Chrome CDP fallback에서 두 조건 리본의 동일 197px 길이, 점선·실선 구분, 가로 폭 390/1425, runtime errors `[]`를 확인했다.
- Browser 플러그인은 사용할 수 없어 Chrome CDP fallback으로 대체했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-QUALITATIVE-COMPARISON`, `E-CDP-QUALITATIVE-COMPARISON`, `E-DEPLOY-PIPELINE-QUALITATIVE-COMPARISON`, `E-LIVE-PUBLIC-QUALITATIVE-COMPARISON`, `E-NAVI-TF-HEARTBEAT-REFRESH`.

## Latest Public Release Recheck — 698f1fb — 2026-10-03

- 모바일 수면·회복 진행 맵을 7×2 전체 단계 표시로 보완해 14개 카드의 읽기 순서를 한 화면에서 파악할 수 있게 했다. 기존 3초 자동 전환·수동 선택·일시정지·카드 일러스트는 유지했다.
- 로컬 typecheck, UI contract, research copy, public export, production build·정적 bundle·성능 예산과 127개 테스트가 통과했다. 정적 Pages 번들은 11개 라우트·70개 파일·초기 JS 309,865 bytes·CSS 92,953 bytes·전체 1,443,834 bytes였다.
- PR #87 checks와 main workflow `37098162499`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았고 과거 Git 이력 local-path scanner annotation은 비차단 경고로 남았다.
- 라이브 validator는 candidate `698f1fbf93b960df38955fdb85ee223260df4cc7`, generatedAt `2026-10-03T04:56:33.135Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다. 390px 라이브 CDP에서 14단계·마지막 카드 `14 / 14`·scrollWidth 390·runtime errors `[]`, 1440px에서 scrollWidth 1425를 확인했다.
- Browser 플러그인은 사용할 수 없어 CDP fallback으로 대체했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-MOBILE`, `E-CDP-RECOVERY-MAP-MOBILE`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-MOBILE`, `E-LIVE-PUBLIC-RECOVERY-MAP-MOBILE`.

## Latest Public Release Recheck — 3b75bae — 2026-10-03

- PR #85에서 공개 `/research/` 경로의 제품 CTA·제품 브랜드 노출·`view=products` 연결을 제거하고, 연구 결과·연구 조건·출처만 이어지는 제품 독립 읽기 흐름으로 보완했다. 별도 제품 경로와 내부 데이터 ledger는 유지했다.
- 로컬 typecheck, UI contract, research copy, public export, production build·정적 bundle·성능 예산과 127개 테스트가 통과했다. 정적 Pages 번들은 11개 라우트·70개 파일·초기 JS 309,865 bytes·CSS 92,953 bytes·전체 1,443,798 bytes였다.
- PR #85 checks와 main workflow `37096916896`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았고 과거 Git 이력 local-path scanner annotation은 비차단 경고로 남았다.
- 라이브 validator는 candidate `3b75baecbc84623a759131393ef1e47f3aa2ba07`, generatedAt `2026-10-03T04:33:54.616Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 `/research/` 390px Chrome CDP fallback에서 `productCta=false`, `productView=false`, `smartStore=false`, document/body scrollWidth 390, runtime errors `[]`를 확인했다. Browser 플러그인은 사용할 수 없어 CDP fallback으로 대체했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-RESEARCH-PRODUCT-FREE`, `E-CDP-RESEARCH-PRODUCT-FREE`, `E-DEPLOY-PIPELINE-RESEARCH-PRODUCT-FREE`, `E-LIVE-PUBLIC-RESEARCH-PRODUCT-FREE`.

## Latest Public Release Recheck — a0ee159 — 2026-10-03

- PR #83에서 모바일 연구 카드의 `출처`와 원문 링크가 붙어 읽히던 가독성 결함을 보완했다. 출처 라벨을 `출처 ·`로 명확히 표시하고 작은 화면에서는 원문 링크를 다음 줄로 분리했다. 연구 카피·출처의 의미·제품 독립 경계는 변경하지 않았다.
- 로컬 typecheck, UI contract, 127개 테스트, production build·정적 bundle·성능 예산이 통과했다. Pages 정적 번들은 11개 라우트·70개 파일·초기 JS 310,538 bytes·CSS 92,953 bytes·전체 1,444,403 bytes를 유지했다.
- PR #83 checks와 main workflow `37095659387`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다. 과거 Git 이력의 local-path scanner annotation은 비차단 경고로 남았다.
- 라이브 validator는 candidate `a0ee159235477ee24c2855251b2d17b21c0b317e`, generatedAt `2026-10-03T04:11:28.734Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL 390px Chrome CDP fallback에서 성장호르몬 연구 카드의 `출처 ·`와 PMID 원문 링크가 분리되어 표시되고, document/body scrollWidth 390·runtime errors `[]`를 확인했다. Browser 플러그인은 사용할 수 없어 CDP fallback으로 대체했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-RESEARCH-SOURCE-LABEL`, `E-CDP-RESEARCH-SOURCE-LABEL`, `E-DEPLOY-PIPELINE-RESEARCH-SOURCE-LABEL`, `E-LIVE-PUBLIC-RESEARCH-SOURCE-LABEL`.

## Latest Public Release Recheck — 10aedca — 2026-10-03

- PR #81에서 이미 재생 중인 전문가 영상 카드를 다시 선택할 때 `videoFrameReady`를 불필요하게 초기화하던 예외를 보완했다. 다른 영상을 선택할 때만 iframe 로딩 상태를 초기화하고, 모바일에서는 기존처럼 플레이어 영역으로 이동한다. 연구 카피·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 `validate:ui-contract`, typecheck, 127개 테스트, production build·정적 bundle·성능 예산이 통과했다. release manifest candidate는 `862da0cf93cf5d209dd601bc36d2592fb52ef573`이며 Pages 정적 번들은 70개 파일과 `1,444,197 <= 1,650,000` bytes 예산을 유지했다.
- PR #81 checks와 main workflow `37094629598`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다. 과거 Git 이력의 local-path scanner annotation은 비차단 경고로 남았다.
- 라이브 validator는 candidate `10aedcab10448e5341123234b6ce9979b068bc58`, generatedAt `2026-10-03T03:53:19.520Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL 390px Chrome CDP fallback에서 같은 전문가 영상 카드를 연속 두 번 선택해도 autoplay iframe·`aria-pressed=true`·`재생 중` 배지·로딩 opacity `0`·가로 폭 390·runtime errors `[]`가 유지됐다. Browser 플러그인은 사용할 수 없어 CDP fallback으로 대체했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-VIDEO-RESELECT`, `E-CDP-VIDEO-RESELECT`, `E-DEPLOY-PIPELINE-VIDEO-RESELECT`, `E-LIVE-PUBLIC-VIDEO-RESELECT`.

## Latest Public Release Recheck — 4604805 — 2026-10-03

- PR #79에서 전문가 영상 게시판의 현재 선택 카드에 `재생 중` 상태를 추가해 플레이어와 목록의 연결을 명확히 했다. 즉시 재생·로딩 오버레이·제품 독립 정보 흐름은 유지했다.
- 로컬 `validate:ui-contract`, typecheck, 127개 테스트, production build·정적 bundle·성능 예산이 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,444,197 <= 1,650,000` bytes였고 초기 JS 310,538 bytes·CSS 92,953 bytes였다.
- PR #79 checks `37093437327`, `37093437351`와 main workflow `37093519815`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다. 과거 Git 이력의 local-path scanner annotation은 비차단 경고로 남았다.
- 라이브 validator는 candidate `4604805e746be4d28b34fb200196ce8d5905c85f`, generatedAt `2026-10-03T03:33:03.789Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL 390px Chrome CDP fallback에서 두 번째 전문가 영상 선택 시 autoplay iframe·`aria-pressed=true`·`재생 중` 배지·가로 폭 390·runtime errors `[]`를 확인했다. Browser 플러그인은 사용할 수 없어 CDP fallback으로 대체했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-VIDEO-SELECTION-STATE`, `E-CDP-VIDEO-SELECTION-STATE`, `E-DEPLOY-PIPELINE-VIDEO-SELECTION-STATE`, `E-LIVE-PUBLIC-VIDEO-SELECTION-STATE`.

## Latest Public Release Recheck — 95c3830 — 2026-10-03

- PR #77에서 전문가 영상 카드를 선택한 직후 검은 빈 iframe처럼 보이던 구간을 로딩 오버레이와 `영상을 불러오는 중` 상태로 보완했다. iframe `onLoad` 이후 오버레이가 사라지고, `prefers-reduced-motion`에서는 스피너를 정지한다.
- 로컬 `validate:ui-contract`, typecheck, 127개 테스트, production build·정적 bundle·성능 예산이 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,443,693 <= 1,650,000` bytes였고 초기 JS 310,538 bytes·CSS 92,953 bytes였다.
- PR #77 checks `37092610225`, `37092610245`와 main workflow `37092613987`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다. 과거 Git 이력의 local-path scanner annotation은 비차단 경고로 남았다.
- 라이브 validator는 candidate `95c3830984d09ee8baca62ebafacd3a0c8c3d715`, generatedAt `2026-10-03T03:16:47.323Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL 390px Chrome CDP fallback에서 전문가 영상 선택 시 iframe autoplay URL·`aria-pressed=true`·가로 폭 390·runtime errors `[]`를 확인했고, 로컬에서는 로딩 상태가 표시되며 라이브에서는 iframe 로드 후 오버레이가 사라지는 것을 확인했다. Browser 플러그인은 사용할 수 없어 CDP fallback으로 대체했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-VIDEO-LOADING`, `E-CDP-VIDEO-LOADING`, `E-DEPLOY-PIPELINE-VIDEO-LOADING`, `E-LIVE-PUBLIC-VIDEO-LOADING`.

## Latest Public Release Recheck — 79eea1f — 2026-10-03

- PR #75에서 701–860px 태블릿 구간의 전체 메뉴를 아이콘 메뉴로 전환해 헤더 컨트롤이 화면 밖으로 밀리던 결함을 보완했다. 44px 메뉴·읽기 크기·공유 컨트롤을 유지하고 768px·820px에서 메뉴를 열어도 가로 넘침이 없었다.
- 로컬 UI 계약·typecheck·127개 테스트·production build와 성능 예산이 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,442,606 <= 1,650,000` bytes였고 초기 JS 310,538 bytes·CSS 92,953 bytes였다.
- PR #75 checks `37091618659`, `37091618584`와 main workflow `37091703892`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다. 과거 Git 이력의 local-path scanner annotation은 비차단 경고로 남았다.
- 라이브 validator는 candidate `79eea1f08423f7d9f52021770310691b9f6e4db2`, generatedAt `2026-10-03T03:00:28.473Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL Chrome CDP fallback은 768px·820px에서 메뉴·큰 글씨·공유 버튼이 화면 안에 남고 runtime errors `[]`, 390px에서 `#recovery-break`·`수면과 회복 02 / 12`, 1440px에서 같은 진행 상태와 `aria-current="page"`를 확인했다. Browser 플러그인은 사용할 수 없어 CDP fallback으로 대체했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-TABLET-HEADER`, `E-CDP-TABLET-HEADER`, `E-DEPLOY-PIPELINE-TABLET-HEADER`, `E-LIVE-PUBLIC-TABLET-HEADER`.

## Latest Public Release Recheck — e5f1eab — 2026-10-03

- PR #73에서 기존 `수면과 회복` 인터스티셜을 전역 메뉴의 첫 항목으로 연결했다. 읽기 진행 메타는 시각 요소를 중복 안내하지 않고 `role="status"`와 하나의 `aria-label`로 현재 장을 전달하며, 모바일 메뉴는 sticky 진행 바보다 위에 표시된다. 연구 카피·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 `validate:ui-contract`, typecheck, 127개 테스트, production build·정적 번들·성능 검사가 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,441,592 <= 1,650,000` bytes였고 초기 JS 310,538 bytes·CSS 92,953 bytes였다.
- PR #73 checks `37090707571`, `37090707626`과 main workflow `37090787855`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다. 과거 Git 이력의 local-path scanner annotation은 비차단 경고로 남았다.
- 라이브 validator는 candidate `e5f1eab190cd29fb4c18ffe2e469f18edb92ba1f`, generatedAt `2026-10-03T02:44:23.942Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL Chrome CDP fallback은 390px·1440px에서 가로 폭 `390/1425`, 메뉴 선택 후 `#recovery-break`, `aria-current="page"`, `수면과 회복 02 / 12`, 44px 모바일 컨트롤, runtime errors `[]`를 확인했다. Browser 플러그인은 사용할 수 없어 CDP fallback으로 대체했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Latest Public Release Recheck — 288a883 — 2026-10-03

- PR #70에서 `수면과 회복` 인터스티셜을 읽기 진행 맥락에 포함했다. 공개 화면의 sticky 진행 표시가 이전 장에 머물지 않고 `수면과 회복 02 / 12`를 보여준 뒤 학술 연구 섹션에서 `연구 지도 03 / 12`로 전환된다. 연구 카피·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산이 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,441,171 <= 1,650,000` bytes였다.
- PR #70 checks `37089258670`, `37089258687`과 main push run `37089334725`, 문서 동기화 main push run `37089833696`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 HTTP 200, candidate `288a883d5e0537a1be6bdd2660d90edcc5e82df0`, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL Chrome CDP fallback은 390px·1440px에서 가로 폭 `390/1425`, 44px 헤더·복사 컨트롤, 수면과 회복 `02 / 12`, 연구 지도 `03 / 12`, 지도 클릭 후 `인지` 활성, runtime errors `[]`를 확인했다. Browser 플러그인은 사용할 수 없어 CDP fallback으로 대체했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Latest Public Release Recheck — 48f4876 — 2026-10-03

- 연구 상세 카드가 보이는 위치를 감지해 연구 지도에서 현재 주제를 활성화하도록 보완했다. 지도 선택은 기존처럼 해당 카드로 이동하고, `aria-current`로 현재 맥락을 보조한다. 연구 카피·출처·제품 독립 경계는 변경하지 않았다.
- PR #68 checks `37087953864`, `37087953888`과 main push run `37088047547`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 HTTP 200, candidate `48f48764fd4fa06bb785a2b12cc5c639104e2dd2`, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL Chrome CDP fallback은 390px·1440px에서 가로 폭 `390/1425`, 44px 헤더·복사 컨트롤, 지도 클릭 후 `인지` 활성, runtime errors `[]`를 확인했다. Browser 플러그인은 사용할 수 없어 CDP fallback으로 대체했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Latest Public Release Recheck — d3ff9e3 — 2026-10-03

- 연구 지도 5개 주제를 실제 선택 요소로 바꾸고, `인지·피부·근육·성장호르몬·면역`을 누르면 해당 상세 연구 카드로 이어지도록 연결했다. 연구 카피·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산이 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,439,994 <= 1,650,000` bytes였다.
- PR #66 checks `37086888705`, `37086888733`과 main push run `37086967211`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 HTTP 200, candidate `d3ff9e3f27833f3719b76f0cc377468a23bcc421`, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL Chrome CDP는 390px·1440px에서 가로 폭·44px 컨트롤·연구 프로필·runtime errors `[]`를 확인했고, 390px에서 첫 지도 항목을 눌러 첫 상세 연구 카드로 이동하는 흐름을 캡처했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Latest Public Release Recheck — e514a37 — 2026-10-03

- PR #64에서 기존 `지도 → 대상 → 결과 → 해석` 문장을 01–04 번호 노드와 연결선이 있는 읽기 레일로 정리했다. 정보 구조와 연구 카피·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산이 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,439,166 <= 1,650,000` bytes였다.
- PR #64 checks `37085704930`, `37085704950`과 main push run `37085785228`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 HTTP 200, candidate `e514a375f0d8fdfeefbba2043b0a18268224b5d2`, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL Chrome CDP는 390px·1440px에서 연구 읽기 레일, 가로 폭, 44px 모바일 컨트롤, 연구 프로필, runtime errors `[]`를 확인했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Latest Public Release Recheck — 0147e3c — 2026-10-03

- PR #62에서 모바일 첫 화면의 편집 안내와 `3분 읽기` 레일에 반투명 읽기 표면을 적용했다. 자연 이미지 위에서 보조 문장이 묻히지 않도록 하되, 히어로 카피·연구 카피·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 `validate:ui-contract`, typecheck, 127개 테스트, production build와 성능 검사가 모두 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,437,548 <= 1,650,000` bytes였다.
- PR #62 checks `37084353265`, `37084353239`와 main push run `37084454201`의 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 HTTP 200, candidate `0147e3c15a7e0acd700ff4f75e9fcddc03b39b05`, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL Chrome CDP는 390px·320px에서 가로 넘침 없이 헤더·모바일 컨트롤을 확인했고, 1440px에서도 `scrollWidth 1425`, runtime errors `[]`, 연구 프로필·44px 복사 버튼을 확인했다. 메뉴·큰 글씨 상호작용도 다시 실행했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Latest Public Release Recheck — 078d231 — 2026-10-03

- PR #60은 스크롤 중 읽기 진행 바에 아래 연구 문장이 비치는 현상을 발견해 진행 바를 불투명 레이어로 보정했다. 헤더의 시각적 깊이는 유지하면서 연구 도표 위 텍스트 비침을 제거했다.
- 로컬 `validate:ui-contract`, typecheck, 127개 테스트, production build와 성능 검사가 모두 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,437,158 <= 1,650,000` bytes였다.
- 최신 main push run `37082824190`은 release-verify, worker-readiness, Pages publish, smoke-live, release-status가 성공했고 Worker는 `STATIC_ONLY`라 배포하지 않았다. PR #60 checks `37082565225`, `37082565283`도 통과했다.
- 라이브 validator는 HTTP 200, candidate `078d231b637fd4a2267d74b01cc304d025b88576`, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 390px 연구 도표·320px 좁은 화면·1440px 데스크톱 CDP에서 가로 넘침과 runtime errors `[]`를 확인했고, 메뉴·큰 글씨·연구 결과 복사 대체 안내를 다시 실행했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Latest Public Release Recheck — 89978ea — 2026-10-03

- PR #58은 연구 카드 앞에 `연구를 읽는 기준` 시각 키를 추가해 `사람 대상 연구`와 `피부·성장 등 확장 연구` 라벨의 의미를 먼저 설명하고, 모바일 헤더 아이콘 컨트롤에 보조 title을 추가했다.
- 로컬 `validate:ui-contract`, typecheck, 127개 테스트, production build와 성능 검사가 모두 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,437,100 <= 1,650,000` bytes였다.
- Chrome CDP 대체 라이브 QA는 390px·320px·1440px에서 연구 지도와 시각 키의 연결, 헤더 44px 컨트롤, 5개 연구 결과 복사 버튼, 가로 넘침 없음, runtime errors `[]`를 확인했다.
- 메뉴 열기·큰 글씨 전환·연구 결과 복사 동작을 다시 실행했으며, CDP 클립보드 권한이 없는 환경에서는 `문장을 선택해 활용해 보세요.`라는 수동 선택 안내가 표시됐다.
- PR #58 검사 `37081285437`, `37081285448`과 main 배포 run `37081390114`의 release verification, Pages publish, smoke-live, release status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 HTTP 200, candidate `89978ea124178774617b5f97ac469b6dca2e4027`, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Latest Public Release Recheck — 19a38ab — 2026-10-03

- PR #55는 각 공개 연구 카드의 관찰된 결과에 `핵심 결과 복사` 동작을 추가했고, PR #56은 브라우저 클립보드 권한이 없을 때 숨은 textarea와 `execCommand('copy')`를 시도하는 대체 경로를 추가했다.
- 로컬 `validate:ui-contract`, typecheck, 127개 테스트, production build와 성능 검사가 모두 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,435,325 <= 1,650,000` bytes였다.
- Chrome CDP 대체 라이브 QA는 390px·1440px에서 5개 44px 복사 버튼, 6개 연구 프로필, 가로 넘침 없음, runtime errors `[]`를 확인했다.
- CDP 컨텍스트에서는 클립보드 권한이 없어 실제 복사 대신 `문장을 선택해 활용해 보세요.`라는 수동 선택 안내가 표시됐다. 권한이 없는 환경에서 성공을 가장하지 않는 fallback 동작을 확인한 것이다.
- PR #56 검사 `37079795500`, `37079795543`과 main 배포 run `37079889105`의 release verification, Pages publish, smoke-live, release status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 HTTP 200, candidate `19a38abc7f1a7b5591f228c7abe1e42862ef0cca`, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Latest Public Release Recheck — 3f4a3e5 — 2026-10-03

- PR #53은 각 연구 결과 그래프 앞에 `대상·방법·측정` 3요소 연구 프로필을 추가했으며, 수면 연구에도 같은 구조를 적용했다.
- 로컬 `validate:ui-contract`, typecheck, 127개 테스트, production build와 성능 검사가 모두 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,433,980 <= 1,650,000` bytes였다.
- Chrome CDP 대체 라이브 QA는 390px·1440px에서 6개 연구 프로필, viewport 내부 배치, 가로 넘침 없음, runtime errors `[]`를 확인했다.
- PR #53 검사 `37077495017`, `37077495007`과 main 배포 run `37077676557`의 release verification, Pages publish, smoke-live, release status가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 HTTP 200, candidate `3f4a3e552978721ccc72187ae85a89af05174d5f`, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Narrow-phone Mobile Hardening Recheck — d0f1741 — 2026-10-03

- PR #51의 모바일 보정은 320–430px에서 헤드라인이 오른쪽으로 잘리지 않도록 줄 크기·줄바꿈을 조정하고, 메뉴·큰 글씨·공유 컨트롤을 각각 44px 터치 영역으로 정렬했다. 데스크톱 히어로 구성은 유지했다.
- 로컬 검증은 `validate:ui-contract`, typecheck, 127개 테스트, production build를 통과했다. 정적 Pages 재현은 11개 라우트·70개 파일·`1,431,521 <= 1,650,000` bytes였다.
- PR #51 검사 `release-verify 37075945151`, `site-quality-verify 37075945212`와 main 배포 run `37076052369`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 성공했다. Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 실제 공개 URL Chrome CDP 대체 QA는 390px에서 `scrollWidth=390`, 헤더 3개 컨트롤 각 44px, 메뉴 열기·큰 글씨 전환, runtime errors `[]`를 확인했다. 라이브 validator는 candidate `d0f17418c6e2b255a2999e64a6f8bd861bc088bd`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, 내부 운영 스냅샷 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 사용했다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 계속 OPEN이다.

## Final Public Recheck After NAVI Sync — 6f48bae — 2026-10-03

- NAVI 문서 동기화 이후 main 공개 후보 `6f48bae7a7adcc22b68fbefc2a9ca13b002fe540`의 배포 run `37074307727`을 재검증했다. `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 성공했고 Worker는 `STATIC_ONLY`라 배포하지 않았다.
- 라이브 validator는 HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 배포 품질은 자동·대표 브라우저 범위에서 유지되지만, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 여전히 OPEN이다. 따라서 NAVI 상태는 `PASS_WITH_CONDITIONS` / `USER_DECISION`을 유지한다.

## Final NAVI Documentation Release Recheck — 49daf99 — 2026-10-03

- NAVI 증적·감사·레드팀·완료 문서를 main에 병합한 뒤 공개 배포가 다시 완료됐다. 문서 변경은 공개 런타임 코드를 변경하지 않았으며, 현재 라이브 candidate는 `49daf9901113be3876b7fd6f94684ba2121c3b9a`다.
- 최종 라이브 validator는 HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다. main workflow `37073665476`의 release verification, Pages publish, smoke-live, release status도 성공했다.
- 이전 읽기 진행 표시 보완의 코드·시각·배포 증적은 유지되며, NAVI 문서까지 반영된 최종 공개 SHA로 정합성을 갱신했다.
- 감사·레드팀 결과는 `PASS_WITH_CONDITIONS`를 유지한다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 여전히 OPEN이며 `COMPLETED`로 승격하지 않는다.

## Latest Public Release Recheck — 7a64726 — 2026-10-03

- 읽기 진행 표시를 `role="progressbar"`와 현재 장 번호에 연결하고, 기존 CSS 규칙에 시각 보정을 통합해 데스크톱·모바일에서 현재 위치가 더 또렷하게 읽히도록 했다. 실제 사용하지 않는 구형 챌린지 이미지 4종은 배포 번들에서 제거하고 현재 사용하는 `focus-game-card-v5.png`와 SVG는 보존했다.
- 로컬 검증은 `pnpm run validate:ui-contract`, `pnpm run typecheck`, `pnpm test` 127/127, production build, 11개 정적 라우트, 70개 번들 파일을 통과했다. `/gaba_info/` Pages 빌드의 로컬 재현 성능은 `1,430,551 <= 1,650,000` bytes였다.
- PR #47의 `release-verify` run `37072831937`와 `site-quality-verify` run `37072831902`가 성공했고, main 병합 SHA `7a64726c5e5df25d0b1f0377bb42e2b15face784`의 배포 run `37072974276`에서 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 성공했다. Worker는 구성되지 않은 `STATIC_ONLY` 상태로 배포하지 않았다.
- 라이브 validator는 candidate `7a64726c5e5df25d0b1f0377bb42e2b15face784`, generatedAt `2026-10-02T22:32:43.088Z`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- Chrome CDP 대체 QA는 병합 전 동일 후보의 1440px·390px에서 진행 표시의 `progressbar` 역할·현재 장 값, 큰 글씨 모드의 가독성, 핵심 앵커의 고정 UI 비가림, 가로 넘침 없음과 runtime errors `[]`를 확인했다. Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 사용했다.
- 남은 조건은 동일하다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 자동 검증으로 대체하지 않으며 OPEN으로 유지한다. 과거 Git 기록의 local-path 패턴 12건은 CI 경고로 남지만 현재 공개 번들에는 포함되지 않는다.

## Latest Public Release Recheck — 2c8bd84 — 2026-10-03

- 섹션·헤더 앵커 이동을 고정 헤더와 읽기 진행 표시 아래에 가리지 않도록 보완했다. 실제 헤더 메뉴의 `연구 확장` 이동과 `history`·`sleep`·`research`·`expert-videos`·`final` 앵커를 1440px·390px에서 점검했으며 각 제목이 진행 표시 아래에 남았다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 74개 번들 파일, 정확한 Pages 성능 `1649668 <= 1650000` bytes와 UI 계약 검사를 통과했다. PR #45의 `release-verify`·`site-quality-verify`도 성공했다.
- main 배포 run `37070479805`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 성공했고 `deploy-worker`는 `STATIC_ONLY`로 건너뛰었다. 과거 revision의 로컬 경로 패턴 12건에 대한 scanner annotation warning은 남아 있지만 release gate 실패는 아니다.
- 라이브 validator는 candidate `2c8bd8452eaf978b41717feb999bbbcc35b84a33`, HTTP 200, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750 및 provenance matched를 확인했다.
- 공개 URL Chrome CDP 대체 QA에서 1440px·390px의 연구 확장 메뉴 이동 및 모든 핵심 앵커가 진행 표시와 겹치지 않았고, 가로 넘침은 없었으며 runtime errors `[]`였다. Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 사용했다.
- 이번 변경은 고정 UI에 가려지는 탐색 결함을 보완한 것이다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 기존처럼 OPEN으로 유지한다.

## Latest Public Release Recheck — 5af1f11 — 2026-10-03

- `06 · 연구의 확장` 연구 지도 아래에 `읽는 순서 → 01 지도 → 02 대상 → 03 결과 → 04 해석`을 추가했다. 별도 링크나 중간 이동 없이 첫 연구 결과 카드로 이어지는 읽기 흐름을 데스크톱·모바일에 맞췄다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 74개 번들 파일, 성능 `1649481 <= 1650000` bytes를 통과했다. Pages CI도 `1649972 <= 1650000` bytes를 통과했다.
- PR #43의 `release-verify`·`site-quality-verify`와 main GitHub Actions `37068741690`의 `release-verify`, fresh TF pulse, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했고 `deploy-worker`는 `STATIC_ONLY`로 건너뛰었다.
- 라이브 validator는 candidate `5af1f11d688c09b95ee3f9e6a391f12e0a0d3c16`, HTTP 200, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly 및 provenance matched를 확인했다.
- 공개 URL Chrome CDP 대체 QA에서 1440px·390px의 연구 지도 → 읽기 레일 → 첫 `인지 연구 결과` 카드 흐름을 확인했다. 가로 넘침은 없었고 runtime errors `[]`였다. Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 사용했다.
- 위 변경은 히어로 카피와 제품 독립 과학 정보 경계를 유지한 채 연구 읽기 흐름만 보완한 것이다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 기존처럼 OPEN으로 유지한다.

## Latest Public Release Recheck — ca20d1e — 2026-10-03

- `06 · 연구의 확장` 연구 지도를 본 뒤 별도 링크나 중간 이동 없이 `지도 → 대상 → 결과 → 해석` 순서로 상세 연구 카드로 이어지는 읽기 큐를 추가했다. 데스크톱·모바일에서 시각 지도와 첫 카드의 연결이 한 흐름으로 읽힌다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 74개 번들 파일, 성능 `1649489 <= 1650000` bytes를 통과했다. PR #38의 `release-verify`·`site-quality-verify`도 통과했다.
- heartbeat PR #39를 보호된 main에 병합한 뒤 GitHub Actions `37065791706`의 `release-verify`, fresh TF pulse, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했고 `deploy-worker`는 `STATIC_ONLY` 조건으로 건너뛰었다. NAVI 문서 동기화 후 최종 main 배포 run은 `37066583312`로 같은 게이트를 다시 통과했다.
- 라이브 validator는 최종 candidate `ca20d1e995f3adbdeba4015b1827f3c9a001a7a2`, HTTP 200, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly 및 provenance matched를 확인했다. 기능 변경은 `79432de`에서 시작했고 최종 공개본에는 NAVI 문서 동기화까지 반영됐다.
- Chrome CDP 대체 QA로 공개 URL 1440px·390px 연구 지도를 캡처해 확인했고, 390px에서 `순서 지도 → 대상 → 결과 → 해석`과 첫 상세 카드가 연속 표시됐다. runtime errors `[]`였으며, Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 사용했다.
- 이번 보완은 연구 지도에서 상세 카드로의 독해 전환을 개선한 것이다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수의 잔여 조건은 기존처럼 OPEN으로 유지한다.

## Latest Public Release Recheck — 713627f — 2026-10-03

- `06 · 연구의 확장` 지도에 인지·피부·근육·성장호르몬·면역을 의미별로 구분하는 선형 아이콘을 추가해 다섯 연구 영역의 식별성을 높였다. 중앙 GABA 노드·연결선·연구 카드·제품 독립 안내 문구는 유지했다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 74개 번들 파일, 성능 `1649348 <= 1650000` bytes를 통과했다. PR #37의 `release-verify`·`site-quality-verify`도 통과했다.
- GitHub Actions `37063502715`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했고 `deploy-worker`는 `STATIC_ONLY` 조건으로 건너뛰었다.
- 라이브 validator는 candidate `713627f3faa7d876ffabc2aa58332433342c6fad`, HTTP 200, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly 및 provenance matched를 확인했다.
- Chrome CDP 대체 QA로 공개 URL 1440px·390px 연구 지도와 히어로·최종 화면을 캡처해 확인했고 runtime errors `[]`였다. 320/360/390px 헤더·큰 글씨 모드도 가로 넘침 없이 유지됐다. Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 사용했다.
- 이 보완은 연구 영역의 시각적 식별성을 개선한 것이며, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수의 잔여 조건은 기존처럼 OPEN으로 유지한다.

## Latest Public Release Recheck — 34807cb — 2026-10-03

- 연구 결과 도표의 글자 크기를 차트 내부 기준 글자에 상대적으로 묶어, 큰 글씨 모드에서 비교 조건·측정값·막대 설명·신호·주석까지 같은 비율로 읽히도록 보완했다. 기존 모바일 헤더의 44px 터치 목표와 가로 폭 제약은 유지했다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 74개 번들 파일, 성능 `1649104 <= 1650000` bytes를 통과했다. PR #36의 `release-verify`·`site-quality-verify`도 통과했다.
- Chrome CDP 라이브 QA에서 390px 기본 본문 16px가 큰 글씨 선택 후 16.96px로 확대되고, 도표 요약 16.96px·도표 주석 17.9776px가 함께 확대되며 선택 상태가 새로고침 후 유지됐다. 320/360/390px에서 헤더 겹침 없음, 세 컨트롤 44px 이상, 가로 넘침 없음, 런타임 오류 0건을 확인했다.
- main Actions `37061173471`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했다. `deploy-worker`는 `STATIC_ONLY` 조건으로 건너뛰었다.
- 라이브 validator는 candidate `34807cba60794717d4bc3c110f59767fb184fc23`, HTTP 200, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly 및 provenance matched를 확인했다.
- 이번 변경은 연구 결과 도표의 읽기 일관성을 개선한 것이며, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수의 잔여 조건은 기존처럼 OPEN으로 유지한다.

## Latest Public Release Recheck — 24c718b — 2026-10-03

- 큰 글씨 모드에서 연구 결과 도표의 핵심 요약·측정값·비교 결과·차트 주석도 함께 확대되도록 보완했다. 헤더 공유 버튼에는 접근성 라벨을 유지하고, 320/360px에서는 메뉴·큰 글씨·공유 컨트롤을 44px 아이콘형으로 유지했다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 74개 번들 파일, 성능 `1649462 <= 1650000` bytes를 통과했다. GitHub Pages release verification도 같은 성능 게이트를 통과했다.
- Chrome CDP 라이브 QA에서 390px 기본 본문 16px가 큰 글씨 선택 후 본문·도표 요약·도표 주석 모두 16.96px로 확대되고, 선택 상태가 새로고침 후 유지되며 `scrollWidth=390`, `runtimeErrors []`였다. 320/360/390px에서 헤더 겹침 없음, 세 컨트롤 44px 이상, 각 화면 가로 넘침 없음, 런타임 오류 0건을 확인했다.
- PR #35의 `release-verify`·`site-quality-verify`와 main Actions `37059529485`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했다. `deploy-worker`는 `STATIC_ONLY` 조건으로 건너뛰었다.
- 라이브 validator는 candidate `24c718bc46ae818ab09a460c09ff8823dd1c8560`, HTTP 200, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly 및 provenance matched를 확인했다.
- 이번 변경은 큰 글씨 독해성과 모바일 조작성을 개선한 것이며, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수의 잔여 조건은 기존처럼 OPEN으로 유지한다.

## Latest Public Release Recheck — b3059b2 — 2026-10-03

- 320–360px 초소형 모바일 헤더에서 메뉴·읽기 크기·공유 컨트롤을 아이콘형으로 압축하고 세 컨트롤의 최소 터치 영역을 44px로 고정했다. 390px에서는 기존 텍스트형 표현을 유지한다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 74개 번들 파일, 성능 `1648900 <= 1650000` bytes를 통과했다.
- Chrome CDP 라이브 QA에서 320/360/390px 모두 버튼 간 수평 겹침 없음, 각 컨트롤 44px 이상, 읽기 버튼 접근성 라벨, `scrollWidth`가 뷰포트와 동일, `runtimeErrors []`를 확인했다. Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 대체 증거로 사용했다.
- PR #34의 `release-verify`·`site-quality-verify`가 통과했고, GitHub Actions `37057405022`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했다. `deploy-worker`는 `STATIC_ONLY` 조건으로 건너뛰었다.
- 라이브 validator는 candidate `b3059b2e45b60af031bf174e07bff7f532906643`, HTTP 200, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly 및 provenance matched를 확인했다.
- 이번 변경은 초소형 화면의 조작 가능성을 개선한 것이며, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수의 잔여 조건은 기존처럼 OPEN으로 유지한다.

## Latest Public Release Recheck — 0c464c1 — 2026-10-03

- 공개 GABA 안내서 헤더에 `큰 글씨`·`기본 글씨` 토글을 추가해 모바일에서 본문 읽기 크기를 선택할 수 있게 했다. 선택 상태는 새로고침 후에도 유지되며 기본 글씨 상태의 레이아웃은 변경하지 않는다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 74개 번들 파일, 성능 `1648238 <= 1650000` bytes를 통과했다.
- Chrome CDP 라이브 QA에서 390px 화면의 기본 본문 16px가 큰 글씨 선택 후 16.96px로 바뀌고, `aria-pressed=true`, localStorage 유지, `scrollWidth=390`, `runtimeErrors []`를 확인했다. Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 대체 증거로 사용했다.
- PR #33의 `release-verify`·`site-quality-verify`가 통과했고, GitHub Actions `37055827540`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했다. `deploy-worker`는 `STATIC_ONLY` 조건으로 건너뛰었다.
- 라이브 validator는 candidate `0c464c197d7ab3b3c7f992be89b49a310339075d`, HTTP 200, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly 및 provenance matched를 확인했다.
- 이번 변경은 읽기 접근성을 개선한 것이며, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수의 잔여 조건은 기존처럼 OPEN으로 유지한다.

## Latest Public Release Recheck — 5321f9d — 2026-10-03

- 수면·회복 14단계 지도에 `01–14` 단계 번호와 `aria-current="step"` 현재 위치 표시를 추가해 모바일에서 읽기 순서를 숫자로 빠르게 파악할 수 있도록 보완했다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 74개 번들 파일, 성능 `1644866 <= 1650000` bytes를 통과했다.
- Chrome CDP 라이브 QA에서 390px 화면의 14개 단계 번호, 마지막 단계 선택, 활성 단계 자동 중앙 정렬, 가로 넘침 없음, `runtimeErrors []`를 확인했다. Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 대체 증거로 사용했다.
- PR #32의 필수 검사가 통과했고, GitHub Actions `37053872031`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했다. `deploy-worker`는 `STATIC_ONLY` 조건으로 건너뛰었다.
- 라이브 validator는 candidate `5321f9d4f3f0e1af56b73b225ea0dfc00fc3f4be`, HTTP 200, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly 및 provenance matched를 확인했다.
- 이번 변경은 수면·회복 흐름의 위치 인지성과 접근성을 개선한 것이며, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수의 잔여 조건은 기존처럼 OPEN으로 유지한다.

## Latest Public Release Recheck — 3af1327 — 2026-10-03

- 성장호르몬 연구 카드의 `약 +400%`·`약 +375%` 수치를 상대 크기 막대로 시각화하고, 막대가 해당 연구 안에서 가장 높은 반응을 100으로 둔 표시라는 설명을 추가했다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 74개 번들 파일, 성능 `1644458 <= 1650000` bytes를 통과했다.
- 캐시를 비활성화한 Chrome CDP 라이브 QA에서 390px 화면의 두 막대와 해석 문구, 가로 넘침 없음, runtimeErrors 0건을 확인했다. Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 대체 증거로 사용했다.
- PR #31의 필수 검사가 통과했고, GitHub Actions `37052611008`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했다. `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 validator는 candidate `3af1327b2f2e47a7feea54201928183271dfce20`, HTTP 200, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly 및 provenance matched를 확인했다.
- 이번 변경은 연구 카드의 판독성을 개선한 것이며, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수의 잔여 조건은 기존처럼 OPEN으로 유지한다.

## Final Public Release Recheck — 588f266 — 2026-10-02

- 연구 히스토리의 보조 문구를 기존 섹션 헤더 구조 안에서 `하나의 발견이 / 넓어진 연구로 이어졌습니다.`로 정리해 모바일·데스크톱 흐름을 유지했다.
- 최종 로컬 검증은 127개 테스트, production build, 11개 정적 라우트, 73개 번들 파일, Pages 성능 `1599636 <= 1600000` bytes로 통과했다.
- 최종 소스 Chrome CDP QA는 390px·1440px에서 가로 넘침 없이 통과했으며 메뉴 열기·외부 클릭 닫기·Escape·포커스 복귀·`#academic` 이동·sticky 헤더·runtimeErrors 0건을 재확인했다. Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 대체 증거로 사용했다.
- GitHub Actions `37008218277`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했고 `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 validator는 candidate `588f2664d08248cf974ef2de5640042b6f47fd64`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly 및 provenance matched를 확인했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수의 잔여 조건은 기존처럼 OPEN으로 유지한다.

- Result: PASS_WITH_CONDITIONS
- Auditor: 독립 QA work pass
- Reviewer ID: NAVI-AUDITOR-GABA-20261002
- Scope Reviewed: 공개 사이트, 연구 확장 카드, 공개 번들, 라이브 URL, 대표 데스크톱·모바일 렌더, 메뉴 상호작용
- Date: 2026-10-02

## Deployment Follow-up

- Heartbeat PR #6 passed `release-verify` and `site-quality-verify` before merge.
- Main deployment run `36984877866` passed `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, and `release-status`.
- `pnpm run validate:live-public` confirmed candidate `bb4504fa902abbdb52b99f2998da6f2cd20ef1b0`, 73 bundle hashes, 6 research records, 6 share pages, and excluded internal operations snapshots.
- This confirms deployment integrity; it does not close the independent science/regulatory, full-browser, or older-adult usability findings below.

## Latest Release Follow-up — 2026-10-02

- Commit `f82bcb4` kept the mobile comparison legend and research-count units while reducing the Pages bundle below the 1,600,000-byte budget.
- GitHub Actions run `36996976297` passed `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, and `release-status`.
- `pnpm run validate:live-public` confirmed candidate `f82bcb4b984df74545c4d5c78b42afb67b042471`, HTTP 200, 73 bundle hashes, 12 claims, 6 research records, 6 share pages, and product-independent public boundaries.
- This follow-up updates deployment and UI evidence; it does not close the open browser, independent science/regulatory, or older-adult usability findings.

## Readability Follow-up — b7cf813 — 2026-10-02

- Research comparison, scale, and video-support labels were increased from 10px to 11px without changing the section structure or adding bundle bytes.
- Local validation passed: 127 tests, production build, Pages-style static bundle, and performance total `1599565 <= 1600000` bytes.
- Chrome CDP QA passed at 390px and 1440px: no horizontal overflow, no runtime errors, and navigation/menu state remained correct.
- GitHub Actions run `36998491670` passed release verification, Pages deployment, live smoke test, and release status; `deploy-worker` was skipped by the static release condition.
- Live validation confirmed candidate `b7cf813f5b7cf6144e138b210d1f9a8073684c67`, HTTP 200, 73 bundle hashes, 12 claims, 6 research records, 6 share pages, teaser HOLD, and internal operations snapshots excluded.
- This is a readability and deployment evidence update; it does not close the open browser, independent science/regulatory, or older-adult usability findings.

## Findings

| ID | Severity | Area | Evidence | Impact | Required Fix | Owner | Status |
|---|---|---|---|---|---|---|---|
| AUD-001 | MINOR | Browser QA | E-CDP-DESKTOP, E-CDP-MOBILE | Browser 플러그인과 실기기 전체 조합은 확인하지 못함 | Safari/iOS/Android 환경에서 대표 화면을 추가 확인 | QA | OPEN |
| AUD-002 | MAJOR | Science/Regulation | E-RESEARCH-COPY, E-REDTEAM-REVIEW | 자동 카피 검사는 독립 과학·규제 적합성 판정을 대신하지 못함 | 공개 전 독립 과학·규제 감수 증거를 별도 등록 | 콘텐츠 책임자 | OPEN |
| AUD-003 | OBSERVATION | UI | E-CDP-DESKTOP, E-CDP-MOBILE | 연구 확장 지도와 결과 도표가 두 화면 크기에서 자연스럽게 읽힘 | 현재 구현 유지, 변경 시 동일 QA 재실행 | 프런트엔드 | CLOSED |

## Checks

- Facts and sources: 공개 연구 인덱스·카피 정합성 검사 통과; 외부 과학 감수는 미완료.
- Calculations and logic: 연구 도표는 승인된 소비자 시각화 구조로 렌더되고 자동 검사 통과.
- Requirements and consistency: 5개 연구 영역, 5개 상세 카드, 모바일·출처 흐름 확인.
- Data quality: 공개 인덱스와 빌드 번들 정합성 통과.
- Code and tests: TypeScript 타입체크와 127개 테스트 전체 통과.
- Security / regulatory: 비공개 운영 자료 제외와 정적 공개 경계 통과; 독립 규제 감수는 남음.
- Deliverable integrity: 라이브 200, 정적 11개 라우트, 성능 예산 통과.

## Result Notes

- 1440px 첫 화면과 연구 확장 카드, 390px 첫 화면·연구 지도·상세 카드 확인.
- 390px에서 `document.documentElement.scrollWidth === 390`.
- 모바일 메뉴가 `aria-expanded=false`에서 `true`, navigation에 `is-open`으로 변경.
- CDP 런타임 오류 0건.
- 감사는 실행 역할과 분리되어 있으며, 외부 검증을 완료로 가장하지 않는다.

## Release Recheck — 24aca41 — 2026-10-02

- Pages 동일 조건에서 정적 번들 `1599505 <= 1600000` bytes로 통과했고 127개 테스트·production build·정적 라우트 검증을 재실행했다.
- Chrome CDP 대표 화면에서 390px·1440px 레이아웃, 연구 도표, 메뉴·앵커 이동과 포커스 복귀를 재확인했다.
- GitHub Actions `37000610411`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고 라이브 URL이 후보 SHA `24aca41...`를 반환했다.
- 브라우저 전체 조합, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다.

- 후속 커밋 `d7bf1cb`에서 모바일 섹션 장 제목을 복원했고, Actions `37001880683` 및 라이브 candidate `d7bf1cb...` 검증을 추가로 통과했다.

## Release Recheck — c13be36 — 2026-10-02

- 연구 비교 도표의 모바일 범례에 `변화 방향`을 명시하고, 막대 의미를 짧게 설명해 비교 조건과 GABA 조건의 판독 순서를 보완했다.
- 로컬 Pages-style 성능 검증은 `1599599 <= 1600000` bytes였고, 127개 테스트가 통과했다.
- Chrome CDP 대표 QA는 390px·1440px에서 가로 넘침 없이 통과했으며, 메뉴·앵커 이동·포커스 복귀·runtimeErrors 0건을 재확인했다.
- GitHub Actions `37003371638`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고, 라이브 candidate `c13be36...`가 확인됐다.
- Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다.

## Release Recheck — 6df3e36 — 2026-10-02

- 연구 지도 레이아웃을 데스크톱·모바일 공통 3×3 중심 구조로 통일해 GABA와 인지·피부·근육·성장호르몬·면역의 관계를 같은 시각 언어로 정리했다.
- 로컬 Pages 정확 조건에서 타입체크·127개 테스트·공개 연구 카피·정적 11개 라우트·73개 번들·성능 `1599644 <= 1600000` bytes를 통과했다.
- Chrome CDP에서 390px·320px·1440px 연구 지도와 390px·1440px 대표 화면을 확인했고 가로 넘침·runtimeErrors 0건을 재확인했다.
- GitHub Actions `37013863270`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고 `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 validator는 candidate `6df3e3665e9172e90267f9ebcd33fd3684af0f3a`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다.

## Release Recheck — cd0912f — 2026-10-02

- 헤더 `공유하기` 버튼의 대비를 보강해 비활성처럼 보이던 인상을 제거했고, 연구 규모 표기를 `1950 → 지금`으로 정리했다.
- 로컬 검증은 타입체크, 공개 연구 카피 검사, 127개 테스트, Pages 정적 번들 검증, 성능 `1599644 <= 1600000` bytes를 통과했다.
- Chrome CDP에서 모바일 390px·데스크톱 1440px 대표 화면의 공유 버튼·연구 규모 표기·가로 넘침·런타임 오류 0건을 확인했고, 메뉴·Escape·포커스 복귀·연구 지도 이동도 재확인했다.
- GitHub Actions `37011130709`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고 `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 manifest는 candidate `cd0912f1c35aace859c7b05127afb9a6994c6697`, HTTP 200, static runtime, 11개 라우트와 공개 번들 UI 문자열을 확인했다.
- Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다.

## Release Recheck — 7ee9b3d — 2026-10-02

- 마지막 공유 영역의 접힌 라벨을 `사업자용 GABA 핵심 5문장 · 바로 복사하기`로 정리해 사업자가 활용할 수 있는 행동을 첫 화면에서 바로 이해하도록 보완했다. 메시지 내용·연구 데이터·제품 경계는 변경하지 않았다.
- 로컬 검증은 공개 연구 카피 검사, 127개 테스트, Pages 정적 번들 검증, 성능 `1599631 <= 1600000` bytes를 통과했다.
- Chrome CDP에서 390px 최종 공유 화면의 문구 흐름·가로 넘침·런타임 오류 0건을 확인했고, 메뉴·Escape·포커스 복귀·연구 지도 이동도 재확인했다.
- GitHub Actions `37009746032`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고 `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 validator는 candidate `7ee9b3df20499d86058b0f5bfd461b9b30e7189d`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다.

## Release Recheck — 1f56cb6 — 2026-10-02

- 읽기 진행 표시가 본문 장 번호와 일치하도록 정렬되어 모바일 대표 화면에서 `07 / 12`, `08 / 12`, `11 / 12`, `12 / 12`가 확인됐다.
- 로컬 검증은 127개 테스트, production build, 11개 정적 라우트, 73개 번들 파일, Pages 성능 `1599635 <= 1600000` bytes로 통과했다.
- Chrome CDP QA는 390px·1440px에서 가로 넘침 없이 통과했으며 메뉴·앵커 이동·포커스 복귀·sticky 헤더·runtimeErrors 0건을 재확인했다.
- GitHub Actions `37005335681`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고, `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 validator는 candidate `1f56cb68799a8a430ec27940240b7f894a00f2be`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다.

## Release Recheck — 5350da8 — 2026-10-02

- 연구 확장 지도를 GABA 중심의 연결 인포그래픽으로 보강해 인지·피부·근육·성장호르몬·면역의 관계를 모바일에서도 한 번에 읽도록 정리했다. 연결선은 SVG로 분리하고 노드와 중앙 원의 겹침을 방지했다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 공개 연구 카피, 11개 정적 라우트·73개 파일, 성능 `1598211 <= 1600000` bytes를 통과했다.
- Chrome CDP 대표 QA는 390px·320px·1440px에서 연구 지도와 5개 라벨을 확인했고 scrollWidth `390/320/1425`, runtimeErrors `[]`를 기록했다. 메뉴·회복 카드 이동 상호작용도 통과했다.
- 예약 TF pulse가 생성한 heartbeat 브랜치를 보호된 PR #7로 복구했고 `release-verify`·`site-quality-verify` 통과 후 main merge `5350da8`을 확인했다. GitHub Actions `37020753980`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고 deploy-worker는 STATIC_ONLY로 건너뛰었다.
- 라이브 validator는 candidate `5350da8d34ef3a2aa875b2ff3ec479fe55f9bf16`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance 일치를 확인했다.
- 과거 Git 기록의 local-path 패턴 12건은 CI 경고로 남지만 현재 공개 번들에는 포함되지 않는 것으로 검증됐다.
- Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다. 상태는 `USER_DECISION / NOT_READY`를 유지한다.

## Release Recheck — 9457237 — 2026-10-02

- NAVI 증적·감사·변경 이력 동기화 커밋까지 보호된 main에 반영한 뒤 Pages 게시와 라이브 smoke를 다시 통과했다.
- 최종 라이브 validator는 candidate `9457237b8938109312482ce38199f05096da9365`, generatedAt `2026-10-02T14:41:14.592Z`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- 공개 UI 코드의 최종 연구 지도 보완은 이전 `f5f7cb6` 검증 증적에 기록되어 있고, 이번 커밋은 그 증적과 NAVI 상태를 공개 배포 기록에 정합화한 문서 동기화다.
- Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다. 상태는 `USER_DECISION / NOT_READY`를 유지한다.

## Release Recheck — 28315ad — 2026-10-02

- 연구 결과 비교 도표에 `↔` 안내 큐와 `막대가 짧을수록 감소 폭이 작다는 뜻입니다` 문구를 추가해 모바일 판독 순서를 보완했다. 비교 결과의 연구 요약·출처·제품 독립 경계는 변경하지 않았다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 73개 번들 파일, 성능 예산 `1598595 <= 1600000`을 통과했다.
- Chrome CDP 대표 QA는 390px·1440px에서 업데이트된 비교 도표, 가로 넘침 없음, runtimeErrors 0건을 확인했다.
- PR #8의 `release-verify`·`site-quality-verify` 통과 후 merge `28315ad`를 확인했다. GitHub Actions `37023282248`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고 `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 validator는 candidate `28315ad3502b3400053f70e412cdee4e1d7ef318`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance 일치를 확인했다.
- 과거 Git 기록의 local-path 패턴 12건은 CI 경고로 남지만 현재 공개 번들에는 포함되지 않는 것으로 검증됐다. Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다. 상태는 `USER_DECISION / NOT_READY`를 유지한다.

## Release Recheck — fed8b6a — 2026-10-03

- 14단계 수면·회복 카드가 읽기 영역에 포커스되거나 포인터가 들어오면 자동 전환을 멈추고, 전체 카드 문장 대신 현재 단계만 라이브 안내하도록 보완했다. 단계 버튼에는 단계 번호·현재 선택 상태·연결 카드 관계를 명시했다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 73개 번들 파일, 성능 `1599487 <= 1600000` bytes를 통과했다. Pages CI의 `release-verify`와 `site-quality-verify`도 통과했다.
- Chrome CDP 390px에서 단계 접근성 라벨과 `aria-controls="recovery-story-card"`를 확인했고, `focusin` 후 카드가 `is-paused`로 유지되며 scrollWidth 390, runtimeErrors 0건을 확인했다.
- PR #14 병합 후 GitHub Actions `37027958956`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고 `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 validator는 candidate `fed8b6aa378521694bca6f84c14dd8b4227f7bd8`, generatedAt `2026-10-02T15:35:36.544Z`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance 일치를 확인했다. 라이브 Chrome CDP도 active index 13, activeWithinViewport true, mapScrollLeft 529, pageScrollWidth 390, 최종 연결 문구 표시와 runtimeErrors 0건을 확인했다.
- Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다. 상태는 `USER_DECISION / NOT_READY`를 유지한다.

## Release Recheck — 454f506 — 2026-10-03

- 14단계 수면·회복 카드의 모바일 가로 단계 표시가 자동 전환·선택 시 활성 아이콘을 화면 안으로 따라가도록 보완했다. 기존 3초 자동 전환, 일시정지, 스와이프, 키보드 조작은 유지했다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 73개 번들 파일, 성능 예산 `1599009 <= 1600000`을 통과했다.
- Chrome CDP 로컬 QA는 390px에서 14개 단계·활성 index 13·`activeWithinViewport=true`·scrollWidth 390을, 1440px에서 scrollWidth 1425를 확인했고 runtimeErrors는 0건이었다.
- PR #12의 `release-verify`·`site-quality-verify` 통과 후 merge `454f506`을 확인했다. GitHub Actions `37025368458`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고 `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 validator와 Chrome CDP는 candidate `454f506672440c49b5583f0d4f077f5d0f67fc3e`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance 일치, 마지막 카드 활성 단계 노출을 확인했다.
- 과거 Git 기록의 local-path 패턴 12건은 CI 경고로 남지만 현재 공개 번들에는 포함되지 않는 것으로 검증됐다. Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다. 상태는 `USER_DECISION / NOT_READY`를 유지한다.

## Release Recheck — b0183b8 — 2026-10-03

- 모바일 메뉴를 연 직후 첫 메뉴 링크로 포커스를 이동하도록 보완해, 작은 화면에서 키보드·보조기기 사용자가 탐색을 바로 시작할 수 있게 했다.
- 로컬 검증은 타입체크, 127개 테스트, production build, 11개 정적 라우트, 73개 번들 파일, 성능 예산 `1599468 <= 1600000`을 통과했다. PR #16의 `release-verify`·`site-quality-verify`도 통과했다.
- Chrome CDP 390px 로컬 QA는 메뉴 열림·첫 포커스 `발견`·외부 클릭 닫힘·회복 단계 이동·scrollWidth 390·runtimeErrors 0건을 확인했다. 공개 URL에서도 메뉴 열림·첫 포커스 `발견`·scrollWidth 375·runtimeErrors 0건을 재확인했다. Browser/Playwright 플러그인은 사용할 수 없어 Chrome CDP를 대체 증거로 사용했다.
- GitHub Actions `37030197880`의 `release-verify`, `worker-readiness`, `deploy-pages`, `smoke-live`, `release-status`가 모두 성공했고 `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 validator는 candidate `b0183b85cb3c88c57dc81373ab82c75887882406`, generatedAt `2026-10-02T15:55:00.193Z`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, Smart Store only, 750 제거, provenance 일치를 확인했다.
- 과거 Git 기록의 local-path 패턴 12건은 CI 경고로 남지만 현재 공개 번들에는 포함되지 않는다. Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다. 상태는 `USER_DECISION / NOT_READY`를 유지한다.

## Current Release Recheck — 83dc4e5a — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `83dc4e5a19d3895ec42437ccd11a87fb4801f894`·71개 bundle hash를 확인했다.
- AC-003/AC-004 초소형 모바일 연구 도표의 문장 흐름과 반응형 가독성: PASS. 280·320px에서 `GABA를 섭취한 그룹의 변화` 라벨이 두 줄로 흐르고, 390·1440px 기존 도표 구조가 유지되며 모든 폭에서 document scrollWidth와 viewport가 일치하고 page/console errors 0이다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. PR #436과 main workflow `37419534993`의 필수 검증·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 과학 정보 경계와 연구 수치·출처: PASS. 이번 변경은 초소형 화면에서 라벨 줄바꿈만 보정했으며 연구 수치·해석·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남기며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-CHART-NARROW-20261008`, `E-UI-CONTRACT-CHART-NARROW-20261008`, `E-PLAYWRIGHT-CHART-NARROW-20261008`, `E-DEPLOY-PIPELINE-CHART-NARROW-20261008`, `E-LIVE-PUBLIC-CHART-NARROW-20261008`.

## Current Release Recheck — e80cd52b — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `e80cd52b28efc20c245eacd28c099bf3bd7e99b1`·71개 bundle hash를 확인했다.
- AC-003/AC-004 초소형 모바일 수면 연구 도표의 전체 폭과 문장 흐름: PASS. 280px에서 번호가 붙은 본문 열 안에 갇히던 도표를 연구 카드 전체 폭으로 펼쳤고, 비교 안내 제목을 줄바꿈했다. 280·320·390·1440px에서 도표 clientWidth와 scrollWidth가 일치하며 document scrollWidth가 viewport와 같고 page/console errors 0이다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. PR #438과 main workflow `37420961105`의 필수 검증·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 과학 정보 경계와 연구 수치·출처: PASS. 이번 변경은 수면 도표의 반응형 배치와 줄바꿈만 보정했으며 연구 수치·해석·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남기며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-SLEEP-CHART-NARROW-20261008`, `E-UI-CONTRACT-SLEEP-CHART-NARROW-20261008`, `E-PLAYWRIGHT-SLEEP-CHART-NARROW-20261008`, `E-DEPLOY-PIPELINE-SLEEP-CHART-NARROW-20261008`, `E-LIVE-PUBLIC-SLEEP-CHART-NARROW-20261008`.

## Current Release Recheck — 06013ba — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `06013ba08af184913ac36a1f4fa9d692153dfd63`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-002/AC-003 초소형 모바일 읽기 조절 가독성: PASS. 280·320px에서 `글자` 라벨 11px·크기 표식 14px·컨트롤 폭 60px, 390px에서 기존 72px, 1440px에서 기존 114.1875px 구성이 유지되며 모든 폭에서 document/body scrollWidth가 viewport와 같다.
- AC-005 배포 게이트: PASS. PR #440·#441 검사, main workflow `37423305842`의 release-verify·fresh TF pulse·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다. 최초 main run `37423001085`의 stale TF pulse 중단은 공식 heartbeat PR #441로 복구했다.
- AC-006 제품 독립 과학 정보 경계와 연구 수치·출처: PASS. 이번 변경은 헤더 읽기 조절 가독성만 보정했고 연구 수치·해석·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-COMPACT-READING-20261008`, `E-UI-CONTRACT-COMPACT-READING-20261008`, `E-PLAYWRIGHT-COMPACT-READING-20261008`, `E-DEPLOY-PIPELINE-COMPACT-READING-20261008`, `E-LIVE-PUBLIC-COMPACT-READING-20261008`.

## Current Release Recheck — bd8717b — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `bd8717b921e18a2a014f73af4344edee552e2dbd`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-002/AC-004 태블릿 읽기 조절 가독성: PASS. 701·768·820·900px에서 `가+ 글자`가 표시되고 44px 터치 영역과 72px 컨트롤 폭을 유지하며, 큰 글씨 전환 후 `가− 기본`으로 바뀐다. 1024px에서는 기존 데스크톱 헤더로 전환되고 모든 폭에서 가로 넘침·페이지 오류가 없다.
- AC-005 배포 게이트: PASS. PR #443의 UI 계약·typecheck·127개 테스트·production build·성능 예산, main workflow `37424970431`의 release-verify·fresh TF pulse·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다.
- AC-006 제품 독립 과학 정보 경계와 연구 수치·출처: PASS. 이번 변경은 태블릿 헤더에서 읽기 크기 조절 기능의 명칭을 보강한 UI 변경이며 연구 수치·해석·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-TABLET-READING-20261008`, `E-UI-CONTRACT-TABLET-READING-20261008`, `E-PLAYWRIGHT-TABLET-READING-20261008`, `E-DEPLOY-PIPELINE-TABLET-READING-20261008`, `E-LIVE-PUBLIC-TABLET-READING-20261008`.

## Current Release Recheck — 550b4eb — 2026-10-06

- 390px 공개 모바일에서 히어로의 `GABA에서 읽습니다` 강조 문구 잘림과 헤더의 `글자 크게`·공유 버튼 충돌을 확인하고, 381–430px에 압축 읽기 레일과 폭 내 줄바꿈을 적용했다. 768px 태블릿과 1024px 데스크톱 전환은 유지했다.
- PR #445, main workflow `37426950620`, 공개 validator와 Chrome CDP fallback 390·768·1024px 검증이 성공했고 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

## 전문가 영상 중간 모바일 프레임 — 7d81419 — 2026-10-06

- Red-team finding: 351–700px에서 세로형 전문가 영상 플레이어와 선택 영상의 제목·출처·공유 동작이 위아래로 분리되어, 무엇을 보고 있는지와 재생 대상을 한 번 더 찾아야 하는 잔여 스캔 리스크가 있었다. 플레이어와 선택 정보를 좌우 한 단위로 배치하고 350px 이하에서는 기존 세로 흐름을 유지했다.
- Recheck: 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산과 공개 Chrome CDP fallback 390·350·1440px에서 중간 폭 좌우 배치·초소형 세로 흐름·데스크톱 갤러리, 두 번째 영상 iframe 자동재생, page/console/http errors 0을 확인했다. 영상 데이터·제목·출처·제품 독립 공개 경계는 변경하지 않았다.
- PR #484와 main workflow `37471094112`, 공개 validator candidate `7d8141987b580e9987012f0fe628527d96ac0975`·HTTP 200·72개 bundle hash·provenance matched가 성공했다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. teaser preview는 `HOLD`이며 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-UI-CONTRACT-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-CDP-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-LIVE-PUBLIC-EXPERT-VIDEO-MID-MOBILE-20261006`.

## Current Release Recheck — 32612fe — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `32612fefb6c022ef80ef32609abf08b7ad43254d`와 71개 bundle hash를 확인했다.
- AC-003/AC-004 모바일 전문가 영상 흐름: PASS. 390px 공유 deep link에서 `수용체` 주제 칩이 가로 레일 안으로 자동 정렬되고 선택 영상 `GABA 수용체와 수면`, 원본 링크·공유 버튼이 함께 표시되며 document scrollWidth 390px을 유지했다.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #449 및 main workflow `37431243216`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 과학 정보 경계와 연구 수치·출처: PASS. 이번 변경은 선택 주제의 모바일 가시성만 보정했으며 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-EXPERT-TOPIC-RAIL-20261006`, `E-UI-CONTRACT-EXPERT-TOPIC-RAIL-20261006`, `E-CDP-EXPERT-TOPIC-RAIL-20261006`, `E-DEPLOY-PIPELINE-EXPERT-TOPIC-RAIL-20261006`, `E-LIVE-PUBLIC-EXPERT-TOPIC-RAIL-20261006`.

## Current Release Recheck — 39cb1c9 — 2026-10-06

- AC-001 공개 URL·Pages·candidate 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `39cb1c9b5a6a2fb2fa7cace0217ae78db4945f2a`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-002/AC-003 연구 지도 시각화: PASS. 280·390·1440px에서 GABA 중심과 5개 연구 영역의 관계를 동심원·중심 신호·연결선으로 읽을 수 있고, 390px 공개 화면에서 선택 주제 `인지`와 `06 / 12 · 연구 01 / 05`가 유지되며 document scrollWidth 390px이다.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #451 및 main workflow `37433290064`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 연구 수치·출처·제품 독립 경계: PASS. 이번 변경은 CSS 시각 리듬만 추가했으며 카피·수치·출처·제품 경계는 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-RHYTHM-20261006`, `E-UI-CONTRACT-RESEARCH-MAP-RHYTHM-20261006`, `E-CDP-RESEARCH-MAP-RHYTHM-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-RHYTHM-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-RHYTHM-20261006`.

## Current Release Recheck — 65eed515 — 2026-10-06

- AC-001 공개 URL·Pages·candidate 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `65eed5159bfde50dec7087d26441186390e59dc6`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-002/AC-003 연구 지도 첫 진입 흐름: PASS. 390px에서 첫 진입 시 `인지`가 기본 선택되고 `현재 선택 · 인지`와 `06 / 12 · 연구 01 / 05`가 보이며, `피부` 선택 시 `피부 연구 결과`·`#research-skin`·`06 / 12 · 연구 02 / 05`로 연결된다.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #453 및 main workflow `37435517535`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 연구 수치·출처·제품 독립 경계: PASS. 이번 변경은 연구 지도의 기본 선택·탐색 흐름과 계약 검사만 보정했으며 카피·수치·출처·제품 경계는 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-FIRST-20261006`, `E-UI-CONTRACT-RESEARCH-MAP-FIRST-20261006`, `E-CDP-RESEARCH-MAP-FIRST-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-FIRST-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-FIRST-20261006`.

## Current Governance Recheck — 4c370795 — 2026-10-06

- AC-005 자동 검증 재현성: PASS. 이력 개인정보 감사가 `git cat-file --batch` stdout pipe의 `ENOBUFS` 결함 없이 reachable history를 끝까지 검사했고, 로컬 경고는 14개 과거 경로 수만 표시했다.
- 공개 사이트·연구 카피·수치·출처·제품 독립 경계는 변경되지 않았다. PR #455의 release-verify·site-quality, main workflow의 history privacy test·reachable history review·Pages·라이브 smoke·release-status가 성공했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-HISTORY-AUDIT-STREAM-20261006`, `E-DEPLOY-PIPELINE-HISTORY-AUDIT-STREAM-20261006`, `E-LIVE-PUBLIC-HISTORY-AUDIT-STREAM-20261006`.

## Current Release Recheck — 86c869ed — 2026-10-06

- AC-001 공개 URL·Pages·candidate 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `86c869ed743546b325e01c6da91c4f42391e9dd8`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-003/AC-004 초소형 모바일 연구 읽기 레일: PASS. 280px에서 전체 연구 라벨 대신 현재 주제명 `인지`가 진행 수치와 함께 보이며, 390·768·1440px에서도 가로 넘침 없이 연구 지도·카드 흐름이 유지된다. document/body scrollWidth는 280·390·753·1425px이고 page/console errors는 0이다. 접근성용 전체 라벨과 live announcement는 유지했다.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #457 및 main workflow `37439945690`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 연구 수치·출처·제품 독립 경계: PASS. 이번 변경은 좁은 화면의 시각 라벨과 접근성 연결만 보정했으며 연구 내용·카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-NARROW-RESEARCH-LABEL-20261006`, `E-UI-CONTRACT-NARROW-RESEARCH-LABEL-20261006`, `E-CDP-NARROW-RESEARCH-LABEL-20261006`, `E-DEPLOY-PIPELINE-NARROW-RESEARCH-LABEL-20261006`, `E-LIVE-PUBLIC-NARROW-RESEARCH-LABEL-20261006`.

## Current Release Recheck — 449d65a — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `449d65afa7d24ada9f2c7bdc40357d0518db833a`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-003/AC-004 모바일 연구 비교 도표: PASS. 390px cognition deep link에서 `뇌파 변화`·`활력 점수`가 `GABA 그룹`·`비교 조건`과 나란히 읽히고, 반복되던 긴 라벨은 제거되었으며 document/body scrollWidth 375px(390px viewport의 세로 스크롤바 제외 콘텐츠 폭), page/console errors 0을 확인했다.
- AC-005 배포 게이트: PASS. PR #459의 release-verify·site-quality-verify, main workflow `37442415197`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다. 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-006 연구 수치·출처·제품 독립 경계: PASS. 이번 변경은 반복 라벨을 `GABA 그룹`으로 줄인 표시 보정이며 연구 수치·해석·출처·접근성 설명·상단 카피·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-COMPARISON-VERDICT-20261006`, `E-UI-CONTRACT-COMPARISON-VERDICT-20261006`, `E-CDP-COMPARISON-VERDICT-20261006`, `E-DEPLOY-PIPELINE-COMPARISON-VERDICT-20261006`, `E-LIVE-PUBLIC-COMPARISON-VERDICT-20261006`.

## Current Release Recheck — 81c91d2 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `81c91d2b96c1e8057a81272cda1cff8d2b7fe1a0`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-003/AC-004 비교 도표 문구 일관성: PASS. 390px cognition deep link에서 결과 요약과 두 비교 레인이 모두 `GABA 그룹`으로 표시되고, 해당 도표의 `GABA 섭취` 혼용 표기는 사라졌으며 document/body scrollWidth 375px(390px viewport의 세로 스크롤바 제외 콘텐츠 폭), page/console errors 0을 확인했다.
- AC-005 배포 게이트: PASS. PR #461의 release-verify·site-quality-verify, main workflow `37444743950`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다. 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-006 연구 내용·수치·출처·제품 독립 경계: PASS. 이번 변경은 인지·수면 비교 도표의 visible resultLabel만 통일했으며 연구 내용·해석·출처·접근성 설명·상단 카피는 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-UI-CONTRACT-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-CDP-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-DEPLOY-PIPELINE-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-LIVE-PUBLIC-COMPARISON-LABEL-CONSISTENCY-20261006`.

## Current Release Recheck — de96345 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `de963459940fd475b2802180d485523caa4c0b3b`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-003/AC-004 국내외 활용 카드 흐름: PASS. 공개 Chrome CDP fallback 390x844와 1440x900에서 국내·일본·세계 카드가 `01 / 03`, `02 / 03`, `03 / 03` 순서로 표시되고 콘텐츠 폭은 각각 375·1425px로 viewport의 세로 스크롤바를 제외한 문서 폭과 일치했다. `#applications`의 다음 장 이동은 `#fermented-safety`로 갱신됐다. page/console errors 0을 확인했다.
- AC-005 배포 게이트: PASS. PR #463의 release-verify·site-quality-verify, main workflow `37447228688`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다. 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-006 연구 내용·출처·제품 독립 경계: PASS. 이번 변경은 활용 카드의 순서 표식과 해당 스타일만 추가했으며 연구 카피·수치·출처·접근성 설명·상단 카피·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-APPLICATION-FLOW-INDEX-20261006`, `E-UI-CONTRACT-APPLICATION-FLOW-INDEX-20261006`, `E-CDP-APPLICATION-FLOW-INDEX-20261006`, `E-DEPLOY-PIPELINE-APPLICATION-FLOW-INDEX-20261006`, `E-LIVE-PUBLIC-APPLICATION-FLOW-INDEX-20261006`.

## Current Release Recheck — 8201ad4 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `8201ad40ca47fb60123575baa23f626d5a2c41a9`·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-003/AC-004 국내외 활용 카드 가독성: PASS. `01 / 03`, `02 / 03`, `03 / 03` 순서 표식의 크기·대비를 강화했으며 390·1440px에서 카드 흐름과 콘텐츠 폭이 유지된다. page/console errors 0을 확인했다.
- AC-005 배포 게이트: PASS. PR #465의 release-verify·site-quality-verify, main workflow `37449714953`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 Worker는 STATIC_ONLY로 건너뛰었다. 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-006 연구 내용·출처·제품 독립 경계: PASS. 이번 변경은 순서 표식의 시각적 크기·대비만 보정했으며 연구 카피·수치·출처·접근성 설명·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-UI-CONTRACT-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-CDP-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-DEPLOY-PIPELINE-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-LIVE-PUBLIC-APPLICATION-FLOW-MARKER-CONTRAST-20261006`.

## Current Release Recheck — fc61732 — 2026-10-06

- AC-001: PASS — live validator 200, candidate `fc617329e60bdf4f155e1c0c4bc273833bd36447`, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal operations snapshot excluded, Smart Store only, 750 removed, provenance matched.
- AC-003/AC-004: PASS — 351–380px 공개 모바일 헤더에서 `가+ 글자` 라벨과 60x44px 읽기 조절 버튼을 표시하고, 메뉴·공유 44px 컨트롤과 겹치지 않으며 큰 글씨 전환 후 `가− 기본` 상태가 유지된다. Chrome CDP fallback 360px에서 document scrollWidth 360, page errors 0을 확인했다.
- AC-005: PASS — UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #467, 재시작한 main workflow `37453296672`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006: PASS — 이번 변경은 중간 폭 헤더의 읽기 조절 기능명과 배치만 보정했으며 연구 내용·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007: PASS_WITH_CONDITIONS — 외부 브라우저·실기기·고령 사용자·독립 과학·규제 검토는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-MID-NARROW-TYPE-CONTROL-20261006`, `E-UI-CONTRACT-MID-NARROW-TYPE-CONTROL-20261006`, `E-CDP-MID-NARROW-TYPE-CONTROL-20261006`, `E-DEPLOY-PIPELINE-MID-NARROW-TYPE-CONTROL-20261006`, `E-LIVE-PUBLIC-MID-NARROW-TYPE-CONTROL-20261006`.

## 연구 결과 카드 순번·공개 배포 — 9ee09d8 — 2026-10-06

- Red-team finding: 긴 연구 결과 흐름에서 카드 안의 현재 위치와 전체 연구 수가 상단 진행 레일에만 보여, 사용자가 카드 자체만 보고는 순서를 즉시 파악하기 어려운 작은 가독성 리스크가 있었다. 연구 카드 제목에 `01 / 05` 형식의 순번 표식을 추가했다.
- Recheck: 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 공개 Chrome CDP fallback 390px 직접 링크에서 인지 `01 / 05`, 피부 `02 / 05`, 진행 레일 정합성, 앵커 정렬, pageWidth 390을 확인했다. 연구 내용·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- PR #469와 main workflow `37455647902`, 공개 validator candidate `9ee09d8`·HTTP 200·71개 bundle hash·provenance matched가 성공했다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-CARD-MARKER-20261006`, `E-UI-CONTRACT-RESEARCH-CARD-MARKER-20261006`, `E-CDP-RESEARCH-CARD-MARKER-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-CARD-MARKER-20261006`, `E-LIVE-PUBLIC-RESEARCH-CARD-MARKER-20261006`.

## 연구 지도 영역 순서·공개 배포 — a66d8e5 — 2026-10-06

- Red-team finding: 연구 지도 아래 5개 학술 영역 카드가 `01`, `02`처럼만 표시되어 모바일에서 전체 확장 흐름을 한 번 더 해석해야 하는 작은 가독성 리스크가 있었다. 카드 순서를 `01 / 05`부터 `05 / 05`까지 명시했다.
- Recheck: 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 공개 Chrome CDP fallback 390·1440px 직접 링크에서 5개 표식, 카드 폭, pageWidth, page/console errors 0을 확인했다. 학술 내용·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- PR #471와 main workflow `37457022682`, 공개 validator candidate `a66d8e5`·HTTP 200·71개 bundle hash·provenance matched가 성공했다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-ACADEMIC-MAP-SEQUENCE-20261006`, `E-UI-CONTRACT-ACADEMIC-MAP-SEQUENCE-20261006`, `E-CDP-ACADEMIC-MAP-SEQUENCE-20261006`, `E-DEPLOY-PIPELINE-ACADEMIC-MAP-SEQUENCE-20261006`, `E-LIVE-PUBLIC-ACADEMIC-MAP-SEQUENCE-20261006`.

## 일상 속 GABA 카드 순서·공개 배포 — df90375 — 2026-10-06

- Red-team finding: 일상 속 GABA 카드가 `01`–`05`만 보여 긴 흐름에서 현재 장면과 전체 장면 수를 한 번 더 해석해야 하는 작은 가독성 리스크가 있었다. 카드 표식을 `01 / 05`부터 `05 / 05`까지 명시하고 번호 대비·줄바꿈을 보정했다.
- Recheck: 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 공개 Chrome CDP fallback 390·1440px에서 5개 순서 표식, 카드 폭, pageWidth, page/console errors 0을 확인했다. 카드 문구·과학 정보·출처·제품 독립 공개 경계는 변경하지 않았다.
- PR #473과 main workflow `37458317176`, 공개 validator candidate `df90375`·HTTP 200·71개 bundle hash·provenance matched가 성공했다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-EVERYDAY-CARD-SEQUENCE-20261006`, `E-UI-CONTRACT-EVERYDAY-CARD-SEQUENCE-20261006`, `E-CDP-EVERYDAY-CARD-SEQUENCE-20261006`, `E-DEPLOY-PIPELINE-EVERYDAY-CARD-SEQUENCE-20261006`, `E-LIVE-PUBLIC-EVERYDAY-CARD-SEQUENCE-20261006`.

## 전문가 영상 카드 순서·공개 배포 — a84d6f0 — 2026-10-06

- 독립 감사 관점에서 전문가 영상 9개를 연속으로 읽을 때 현재 카드와 전체 카드 수가 즉시 보이는지 확인했다. 모바일·데스크톱 모두 `01 / 09`–`09 / 09`가 유지되고, `수면` 필터에서도 전체 컬렉션 순서 `01 / 09`–`04 / 09`가 유지된다.
- 두 번째 카드 선택 시 YouTube iframe 자동재생 URL이 생성되고, 공개 화면·카드 표식·필터·iframe 상호작용에서 page/console errors 0을 확인했다. 영상 제목·출처·자동재생 동작·제품 독립 공개 경계는 변경되지 않았다.
- PR #476과 main workflow `37460547815`, 공개 validator candidate `a84d6f0467c72793ffe5fbe7483305ee63bd9982`·HTTP 200·71개 bundle hash·provenance matched가 성공했다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 결과는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-UI-CONTRACT-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-CDP-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-LIVE-PUBLIC-EXPERT-VIDEO-CARD-SEQUENCE-20261006`.

## Current Release Recheck — 9b6df19 — 2026-10-06

- 280–350px 초소형 모바일 진행 레일에서 `지금 읽는 중`이 두 줄로 깨지던 반응형 결함을 확인하고, 해당 폭에서만 `읽는 중`으로 압축했다. 현재 장 제목·진행 수치·접근성 live announcement와 390px 이상 표기는 유지했다.
- PR #447, main workflow `37429369421`, 공개 validator와 Chrome CDP fallback 280px 검증이 성공했고 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

## 연구 지도 맥락 정렬 — 7fe6a4d — 2026-10-06

- Red-team finding: `#research`로 직접 진입했을 때 첫 연구 카드가 자동 선택된 것처럼 보여 지도 장과 카드 장의 읽기 레일이 어긋나는 잔여 UX 리스크가 있었다.
- 보정: 연구 지도 chapter-level hash에서는 선택 연구를 만들지 않고, 지도 노드 선택·연구 카드 진입·공유 카드 해시에서만 선택 연구 맥락을 표시하도록 상태 복원 경로를 정렬했다.
- Recheck: 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #486, main workflow `37474843826`, 공개 validator candidate `7fe6a4d`, 공개 Chrome CDP fallback 390px에서 지도 레일 `다섯 연구 영역 / 06 / 12`, 지도 중심 `GABA 연구의 중심`, 인지 카드 선택 후 `인지 연구 결과 / 연구 01 / 05`, URL·`aria-pressed`·`is-active`, page/console/http errors 0을 확인했다.
- 공개 과학 카피·수치·출처·제품 독립 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-CONTEXT-20261006`, `E-UI-CONTRACT-RESEARCH-MAP-CONTEXT-20261006`, `E-CDP-RESEARCH-MAP-CONTEXT-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-CONTEXT-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-CONTEXT-20261006`.

## 연구 지도 첫 렌더 중립화 — d450e98 — 2026-10-06

- Red-team follow-up: 지도 상태를 effect에서 중립으로 바꾼 뒤에도 첫 렌더 초기값에 첫 연구 fallback이 남아 있을 수 있는 구현 리스크를 확인했다.
- 보정: `getInitialResearchTopicId`가 chapter-level hash에서는 `null`을 반환하고, 연구 카드 hash가 있을 때만 요청된 연구 주제를 첫 렌더부터 복원하도록 정리했다.
- Recheck: 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #488, main workflow `37476812066`, 공개 validator candidate `d450e98`, 공개 Chrome CDP fallback 390px에서 `selectedNodes=0`, `firstCardActive=false`, 지도 중심 `GABA 연구의 중심`, 인지 선택 뒤 URL·rail·`aria-pressed`·`is-active`, page/console/http errors 0을 확인했다.
- 공개 과학 카피·수치·출처·제품 독립 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-UI-CONTRACT-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-CDP-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`.

## 중간 폭 모바일 공유 라벨·정적 번들 — a6c8c6e — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `a6c8c6e7dccbfc80e9f189d502ba43714e650ee0`·HTTP 200·STATIC·72개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 모바일 헤더 발견성·반응형: PASS. 390·380·351px에서는 `공유하기` 라벨이 표시되고 메뉴·글자 크기·공유 버튼이 겹치지 않으며, 350px에서는 기존 아이콘 레일로 압축된다. 네 폭 모두 body width와 scroll width가 viewport와 같고 runtime/console/http errors 0이다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산, PR #494, main workflow `37482350132`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 헤더 발견성과 공개 manifest 압축만 다뤘으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-UI-CONTRACT-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-CDP-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-DEPLOY-PIPELINE-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-LIVE-PUBLIC-MEDIUM-PHONE-SHARE-LABEL-20261006`.

## 모바일 첫 화면 hero 가독성·최종 공개 배포 — fb603a48 — 2026-10-07

- Red-team finding: 390·350px에서 첫 화면 강조 문구가 화면 폭에 따라 줄바꿈 기회를 명시적으로 갖지 않아 마지막 글자 잘림 여부를 반복 확인해야 하는 잔여 읽기 리스크가 있었다.
- 보정: `GABA에서<wbr /> 읽습니다`로 표준 줄바꿈 기회를 추가하고 중간 폭 공유 컨트롤의 중복 선언을 줄였다. 폭이 충분한 공개 화면에서는 자연스럽게 한 줄을 유지하며, 모든 검증 폭에서 문장 전체가 표시된다.
- Recheck: 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산, PR #498, main workflow `37487864715`, 공개 validator candidate `fb603a48dbffc5fdb6da2732487c2f759749b408`, Chrome CDP fallback 390·350·1440px에서 hero·공유 라벨·가로폭·runtime/console/http errors 0을 확인했다.
- 공개 과학 카피·수치·출처·제품 독립 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- teaser preview는 `HOLD`이며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-HERO-LINE-BREAK-20261007`, `E-UI-CONTRACT-MOBILE-HERO-LINE-BREAK-20261007`, `E-CDP-MOBILE-HERO-LINE-BREAK-20261007`, `E-DEPLOY-PIPELINE-MOBILE-HERO-LINE-BREAK-20261007`, `E-LIVE-PUBLIC-MOBILE-HERO-LINE-BREAK-20261007`.

## 전문가 영상 상태 레일 정돈·공개 배포 — d17014d6 — 2026-10-07

- 감사 finding: 모바일 전문가 영상 선택 카드의 상태 문구가 길어 선택 제목·출처·순서를 한 번에 스캔하는 흐름을 끊을 수 있는 잔여 UX 리스크가 있었다.
- 보정: 상태 문구를 `선택 후 재생`·`준비 중`·`재생 중`으로 정돈하고 `.guide-video-feature-state` 클래스를 보존해 390px에서 주제·상태·순서가 한 줄 메타 레일로 읽히도록 했다. 카드 선택 뒤 제목·상태·`aria-pressed`·포커스가 함께 갱신된다.
- Recheck: 로컬 UI contract·typecheck·production build·성능 예산, PR #500/#501, main merge `d17014d6`, main workflow `37491933306`, 공개 validator candidate `d17014d6`, Chrome CDP fallback 390·1440px 및 두 번째 영상 선택 interaction에서 상태·focus·document width·errors 0을 확인했다.
- 배포 품질: 첫 PR 검사에서 정적 자산 총량이 예산보다 103 bytes 초과했으나 사용하지 않는 메시지 카드 스타일을 제거한 뒤 재검사에서 `1,648,499 bytes <= 1,650,000`으로 회복했다. 시각적 동작 손실은 없으며 final class-only markup 복원은 UI contract·typecheck·원격 site-quality로 재확인했다.
- 공개 경계: 영상 출처·연구 카피·수치·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Residual: teaser preview는 `HOLD`이며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-VIDEO-STATE-RAIL-20261007`, `E-UI-CONTRACT-VIDEO-STATE-RAIL-20261007`, `E-CDP-VIDEO-STATE-RAIL-20261007`, `E-DEPLOY-PIPELINE-VIDEO-STATE-RAIL-20261007`, `E-LIVE-PUBLIC-VIDEO-STATE-RAIL-20261007`.

## 전문가 영상 필터 순번 정합성 — f2241eb — 2026-10-07

- 감사 finding: 주제 필터에서 카드 우측 순번은 전체 9개 기준인데, 썸네일 내부 순번은 필터 기준으로 다시 시작해 같은 영상의 위치를 다르게 읽게 하는 잔여 UX 리스크가 있었다.
- 보정: 포스터 fallback 내부 순번을 전체 `videoNumber` 기준으로 통일하고, 기존 카드별 포스터 크롭 변화와 영상 출처는 유지했다. `연구 읽기` 필터의 GABA 섭취 연구 읽기는 `05`·`05 / 09`로 같은 위치를 보여준다.
- Recheck: 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산, PR #503, main merge `f2241eb`, main workflow `37495381996`, 공개 validator candidate `f2241eb`, Chrome CDP fallback 390px에서 필터·순번·가로폭·errors 0을 확인했다.
- 공개 경계: 이번 변경은 전문가 영상 게시판의 시각적 순서 표식에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Residual: teaser preview는 `HOLD`이며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-VIDEO-ORDER-20261007`, `E-UI-CONTRACT-VIDEO-ORDER-20261007`, `E-CDP-VIDEO-ORDER-20261007`, `E-DEPLOY-PIPELINE-VIDEO-ORDER-20261007`, `E-LIVE-PUBLIC-VIDEO-ORDER-20261007`.

## 좁은 모바일 깊은 이동 안정성·공개 배포 — 0869337 — 2026-10-07

- 독립 감사 관점에서 320px·360px 화면의 지연 렌더링 실제 높이와 한국어 줄바꿈 때문에 연구·전문가 영상·마지막 장의 절대 위치가 깊은 이동 뒤 바뀌는 리스크를 확인했다.
- 380px 이하에서 `content-visibility` 지연을 해제해 실제 높이를 첫 렌더부터 확정하고, UI 계약에 해당 회귀 조건을 추가했다. 320px·380px의 연구·전문가 영상·마지막 장 제목 도착, document width, 오류 0과 전문가 영상 handoff를 다시 확인했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산, PR #505, main workflow `37498997965`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 공개 Pages 320px에서도 동일 결과를 확인했다.
- 공개 과학 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Residual: teaser preview는 `HOLD`이며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-NARROW-DEEP-LINK-20261007`, `E-UI-CONTRACT-NARROW-DEEP-LINK-20261007`, `E-CDP-NARROW-DEEP-LINK-20261007`, `E-DEPLOY-PIPELINE-NARROW-DEEP-LINK-20261007`, `E-LIVE-PUBLIC-NARROW-DEEP-LINK-20261007`.

## 중간 폭 모바일 공유 라벨·공개 배포 — 7997fd5 — 2026-10-07

- 독립 감사 관점에서 351–430px 중간 폭 모바일에서 공유 버튼이 접근성 이름만 있고 화면에서는 아이콘만 보이는 발견성 회귀를 확인했다.
- v154에서 공유 라벨을 72px 레일로 복원하고 safe-area를 고려해 메뉴·읽기 크기·공유 버튼을 재배치했다. 350px 이하 아이콘 레일은 유지했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산, PR #507, main workflow `37501337335`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 공개 cache-busted 390·351·350px에서 라벨·컨트롤 폭·가로폭·공유 토스트·오류 0을 확인했다.
- 공개 과학 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Residual: teaser preview는 `HOLD`이며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MEDIUM-SHARE-LABEL-20261007`, `E-UI-CONTRACT-MEDIUM-SHARE-LABEL-20261007`, `E-CDP-MEDIUM-SHARE-LABEL-20261007`, `E-DEPLOY-PIPELINE-MEDIUM-SHARE-LABEL-20261007`, `E-LIVE-PUBLIC-MEDIUM-SHARE-LABEL-20261007`.

## 공유 피드백의 다음 장 가림 방지·공개 배포 — 7669136 — 2026-10-07

- 독립 감사 관점에서 공유 확인 토스트가 4.2초 고정되어 사용자가 즉시 다음 장으로 이동할 때 전문가 영상·마지막 메시지 일부를 가릴 수 있는 잔여 UX 리스크를 확인했다.
- 공유 직후에는 기존 피드백을 유지하고, 독자가 32px 이상 스크롤하면 토스트를 닫도록 보정했다. 기존 safe-area와 중간 폭 `공유하기` 라벨·350px 이하 아이콘 레일은 유지했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·성능 예산, PR #510, main workflow `37504028167`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 공개 cache-busted 390·1440px에서 토스트 표시·스크롤 후 해제·연구·전문가 영상·마지막 장 제목·가로폭·오류 0을 확인했다.
- 공개 과학 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Residual: teaser preview는 `HOLD`이며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-SHARE-DISMISS-20261007`, `E-UI-CONTRACT-SHARE-DISMISS-20261007`, `E-CDP-SHARE-DISMISS-20261007`, `E-DEPLOY-PIPELINE-SHARE-DISMISS-20261007`, `E-LIVE-PUBLIC-SHARE-DISMISS-20261007`.

## 태블릿 성장 연구 흐름·직접 진입 안정화 — 20a4713 — 2026-10-07

- 감사 finding: 701–1100px에서 성장 연구 6단계가 3열로 재배치될 때 행간 연결 화살표가 사라지고, 701–1199px에서 지연 렌더링 장의 intrinsic 높이가 직접 해시 진입 위치를 흔들 수 있었다.
- 보정: 태블릿에서 같은 행 연결만 복원하고 행 끝 화살표는 숨겼으며, 성장 흐름을 `list/listitem`으로 노출했다. 태블릿·컴팩트 노트북은 실제 섹션 높이를 먼저 확정하도록 했다.
- Recheck: 로컬 UI contract·typecheck·127개 테스트·Pages 번들·성능 예산, PR #512, main workflow `37508721569`의 release-verify·Pages·라이브 smoke·release-status, 공개 HTTP 200, Chrome CDP fallback 390·768·1440px에서 성장 제목·전문가 영상·마지막 장·가로폭과 768px 연결 화살표를 확인했다.
- 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Residual: teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-TABLET-GROWTH-FLOW-20261007`, `E-UI-CONTRACT-TABLET-GROWTH-FLOW-20261007`, `E-CDP-TABLET-GROWTH-FLOW-20261007`, `E-DEPLOY-PIPELINE-TABLET-GROWTH-FLOW-20261007`, `E-LIVE-PUBLIC-TABLET-GROWTH-FLOW-20261007`.

## 태블릿 공유 라벨 발견성·공개 배포 — 0f7adb6 — 2026-10-07

- 감사 finding: 701–900px 태블릿 헤더에서 공유 버튼이 접근성 이름만 `공유하기`로 유지되고 화면에는 아이콘만 보여, 고령 사용자와 사업자가 공유 기능을 즉시 발견하기 어려운 잔여 UX 리스크가 있었다.
- 보정: v158에서 기존 아이콘과 함께 `공유하기` 라벨을 78px 레일에 표시하고 44px 터치 높이를 유지했다. 390px 모바일과 1440px 데스크톱 레이아웃은 변경하지 않았다.
- Recheck: 로컬 UI contract·typecheck·127개 테스트·Pages 번들·성능 예산, PR #514, main merge `0f7adb6`, main workflow `37511444066`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status, 공개 Chrome CDP fallback 390·701·768·900·1440px에서 라벨·터치 폭·가로폭·오류 없는 렌더링을 확인했다. 첫 원격 Pages 예산 15 bytes 초과는 중복 선언 제거 후 최종 검증에서 통과했다.
- 공개 경계: 공유 컨트롤 발견성만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Residual: teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-TABLET-SHARE-LABEL-20261007`, `E-UI-CONTRACT-TABLET-SHARE-LABEL-20261007`, `E-CDP-TABLET-SHARE-LABEL-20261007`, `E-DEPLOY-PIPELINE-TABLET-SHARE-LABEL-20261007`, `E-LIVE-PUBLIC-TABLET-SHARE-LABEL-20261007`.

## 태블릿 국내외 활용 카드 리듬·공개 배포 — 988c020 — 2026-10-07

- 감사 finding: 701–1100px에서 3장 카드가 2열·2열/1장으로 배치되어 마지막 카드 오른쪽에 큰 빈 공간이 남고, 사업자·고령 사용자의 세 사례 읽기 흐름이 끊길 수 있었다.
- 보정: 국내외 활용 카드를 701–1100px 태블릿 1열, 모바일 1열, 1101px 이상 데스크톱 3열로 정렬하고 카드 높이를 자연스럽게 조정했다.
- Recheck: PR #530 required checks, main workflow `37536776591`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status, 공개 validator candidate `988c020`, Chrome CDP fallback 390·768·1440px에서 카드 배열·다음 장 handoff·가로폭을 확인했다.
- 공개 경계: 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Residual: teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-TABLET-APPLICATION-RHYTHM-20261007`, `E-UI-CONTRACT-TABLET-APPLICATION-RHYTHM-20261007`, `E-CDP-TABLET-APPLICATION-RHYTHM-20261007`, `E-DEPLOY-PIPELINE-TABLET-APPLICATION-RHYTHM-20261007`, `E-LIVE-PUBLIC-TABLET-APPLICATION-RHYTHM-20261007`.

## 태블릿 전문가 영상 보드 리듬·공개 배포 — 55aa1b4 — 2026-10-07

- 감사 finding: 701–1100px에서 9개 전문가 영상 카드가 2열로 배치되어 마지막 카드가 왼쪽에 홀로 남고 오른쪽에 큰 빈 공간이 생겼다. 영상 선택·필터를 유지하면서도 한눈에 읽는 흐름이 약해질 수 있었다.
- 보정: 태블릿 영상 보드를 1열로 정렬하고, 390px 모바일 2열 썸네일 갤러리와 1440px 데스크톱 영상 갤러리는 유지했다.
- Recheck: 로컬 UI contract·typecheck·127개 테스트·production build·Pages 번들·성능 예산, PR #532, main workflow `37539036705`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status, 공개 validator candidate `55aa1b4`, Chrome Playwright 390·768·1440px 시각 점검이 성공했다.
- 공개 경계: 영상 보드 정보 배치만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Residual: teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-TABLET-VIDEO-RHYTHM-20261007`, `E-UI-CONTRACT-TABLET-VIDEO-RHYTHM-20261007`, `E-CDP-TABLET-VIDEO-RHYTHM-20261007`, `E-DEPLOY-PIPELINE-TABLET-VIDEO-RHYTHM-20261007`, `E-LIVE-PUBLIC-TABLET-VIDEO-RHYTHM-20261007`.

## 태블릿 학술 연구 지도 리듬·공개 배포 — 8926b4e — 2026-10-07

- 감사 finding: 701–1100px에서 5개 학술 연구 영역 카드가 3+2로 배치되어 두 번째 줄 오른쪽에 큰 빈 공간이 남고, 연구 영역을 순서대로 읽는 흐름이 끊길 수 있었다.
- 보정: 학술 연구 지도를 태블릿 1열로 정렬하고, 390px 모바일 1열·1440px 데스크톱 5열은 유지했다.
- Recheck: 로컬 UI contract·typecheck·127개 테스트·production build·Pages 번들·성능 예산, PR #534, main workflow `37541239081`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status, 공개 validator candidate `8926b4e`, Chrome Playwright 390·768·1440px 시각 점검이 성공했다.
- 공개 경계: 학술 연구 영역 카드의 반응형 배치만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- Residual: teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-TABLET-ACADEMIC-MAP-RHYTHM-20261007`, `E-UI-CONTRACT-TABLET-ACADEMIC-MAP-RHYTHM-20261007`, `E-CDP-TABLET-ACADEMIC-MAP-RHYTHM-20261007`, `E-DEPLOY-PIPELINE-TABLET-ACADEMIC-MAP-RHYTHM-20261007`, `E-LIVE-PUBLIC-TABLET-ACADEMIC-MAP-RHYTHM-20261007`.

## 좁은 모바일 전문가 영상 히어로·공개 배포 재감사 — 4d128fa — 2026-10-07

- 320px에서 선택한 전문가 영상의 포스터가 설명 영역 아래로 밀려 첫 화면에서 영상 정체성과 제목을 함께 읽기 어려운 잔여 퍼블리싱 리스크를 확인했다.
- 350px 이하를 104px 포스터와 설명을 나란히 보여주는 컴팩트 카드로 보정하고, 351–700px 중간 폭·390px 모바일·768px 태블릿·1440px 데스크톱 영상 갤러리는 유지했다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- 로컬 전체 build와 성능 예산(1,649,418 bytes), PR #536 required checks, freshness heartbeat PR #537, main workflow `37545095666`의 release-verify·fresh TF pulse·Pages·라이브 smoke·release-status, 공개 candidate `4d128fa`를 확인했다. 공개 320·390·768·1440px Playwright audit에서 오류와 문서 가로폭 초과는 없었고, 영상 선택 전환도 정상이다.
- 결과는 `PASS_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다. teaser preview는 `HOLD`이며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다.

증적: `E-LOCAL-BUILD-NARROW-EXPERT-HERO-20261008`, `E-UI-CONTRACT-NARROW-EXPERT-HERO-20261008`, `E-CDP-NARROW-EXPERT-HERO-20261008`, `E-DEPLOY-PIPELINE-NARROW-EXPERT-HERO-20261008`, `E-LIVE-PUBLIC-NARROW-EXPERT-HERO-20261008`.
## 인쇄·PDF 지연 렌더링 보정 — 2026-10-07

- 사업자 공유용 인쇄·PDF 출력에서 화면 성능을 위한 `content-visibility:auto`가 빈 여백으로 남을 수 있는 잔여 리스크를 확인했다.
- `public/print.css`에서 여섯 개 지연 섹션을 인쇄 시 실제 표시하도록 보정하고, 화면 전용 헤더·진행바·영상 게시판·공유 조작부는 숨긴 채 연구 출처 URL을 유지했다.
- 로컬 UI contract·typecheck·127개 테스트·production build·정적 번들·성능 예산과 Chrome Playwright 인쇄 미디어 렌더가 통과했다. 로컬 인쇄 문서 높이는 `21049px → 19401px`, 출처 링크는 14개로 확인됐다.
- 공개 배포 후 실제 Pages 인쇄 렌더 재검증이 남아 있으며, 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.

증적: `C-227`, `E-LOCAL-BUILD-PRINT-FLOW-20261008`, `E-UI-CONTRACT-PRINT-FLOW-20261008`, `E-CDP-PRINT-FLOW-20261008`, `E-DEPLOY-PIPELINE-PRINT-FLOW-20261008`, `E-LIVE-PUBLIC-PRINT-FLOW-20261008`.

## Current Release Recheck — 9533748e — 대형 글자 모드 전문가 영상 필터 — 2026-10-08

- AC-001 공개 URL·Pages 정합성: PASS. PR #615와 main workflow `37653847202`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, 공개 validator가 merge SHA `9533748ea1af24173e3867acd6e2ca9da413965c`, HTTP 200, STATIC, 73개 bundle hash를 확인했다.
- AC-003/AC-004 읽기·반응형: PASS. 320·390px 대형 글자 모드에서 7개 주제 필터가 4·3행으로 모두 보이고 768px에서는 2행으로 읽힌다. 일반 모드는 기존 수평 레일·cue를 유지하며 모든 확인 화면의 document 가로폭은 viewport와 일치했다.
- AC-005 자동 게이트: PASS. UI contract·typecheck·127개 테스트·production build·정적 bundle·release manifest·성능 검사가 통과했고 총 자산은 `1,649,405 bytes / 1,650,000 bytes`다.
- AC-006 제품 독립 경계: PASS. 전문가 영상 필터의 읽기 방식만 보완했으며 공개 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없으며 Browser plugin 부재에 따른 Playwright fallback, teaser `HOLD`, 외부 브라우저·실기기·실사용자 독해성·독립 과학·규제 검토 조건은 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-267`, `E-LOCAL-BUILD-LARGE-TEXT-VIDEO-20261008`, `E-PLAYWRIGHT-LARGE-TEXT-VIDEO-20261008`, `E-DEPLOY-PIPELINE-LARGE-TEXT-VIDEO-20261008`, `E-LIVE-PUBLIC-LARGE-TEXT-VIDEO-20261008`, `E-NAVI-STATE-LARGE-TEXT-VIDEO-20261008`.

## Current Public Recheck — ARIA 안내와 대형 글자 영상 필터 — de11782 — 2026-10-08

- AC-001 공개 URL·라이브 정합성: PASS. NAVI 문서 병합 후 main workflow `37656611634`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, 공개 validator가 candidate SHA `de117829713614249c7e7ee09381df4461dd13e4`·HTTP 200·STATIC·73개 bundle hash를 확인했다.
- AC-003/AC-004 소비자 흐름·반응형: PASS. 320·390px 일반 모드에서는 전문가 영상 필터가 수평 이동 안내를 제공하고, 대형 글자 모드에서는 모든 7개 주제가 각각 4·3행으로 표시된다. 두 모드 모두 document 가로폭은 viewport와 같고 runtime/console error는 없었다.
- AC-005 배포 게이트: PASS. 공개 데이터 12 claims·6 master records·6 share pages, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다. PR #617 코드 보정과 PR #616 NAVI 문서 병합 이후 Pages 배포·라이브 smoke가 모두 성공했다.
- AC-006 제품 독립 경계: PASS. 이번 회차는 ARIA 안내와 NAVI 증적만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 결함은 없으며 Browser plugin 부재에 따른 Playwright Chromium fallback, teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-268`, `E-LIVE-PUBLIC-ARIA-FINAL-20261008`, `E-DEPLOY-PIPELINE-ARIA-FINAL-20261008`, `E-NAVI-STATE-ARIA-FINAL-20261008`.

## 공개 배포 자동 재감리 — 모바일 전문가 영상 필터 cue — 2026-10-08

- 280·390px 전문가 영상 주제 필터의 오른쪽 수평 탐색 cue를 24px 원형 안내로 보완했다. 280·320·390·1440px 핵심 장에서 document 가로폭은 viewport와 일치했고 390px 영상 선택·재생·다음 카드 선택은 정상이다.
- 첫 Pages 후보는 GitHub runner 기준 성능 예산 73바이트 초과로 보류했으며, 비필수 shadow·transition·color와 flex 정렬을 줄인 최종 PR #610이 보호 검사를 통과했다. main workflow `37645030445`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다.
- stale TF pulse로 한 차례 배포가 보류되었으나 공식 pulse `37644428458`과 heartbeat PR #611을 보호된 main에 반영한 뒤 재배포가 성공했다. 공개 validator는 SHA `74549db11dc9ce37c794b1524739afbe68d75f96`, HTTP 200, 73개 bundle hash, 12개 claims, 6개 master records, 6개 share pages, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. 제품 독립 공개 경계·연구 카피·수치·출처는 변경하지 않았고, Browser plugin 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 외부 조건으로 유지한다. 상태는 `USER_DECISION / NOT_READY`다.

증적: `C-265`, `E-LOCAL-BUILD-MOBILE-FILTER-CUE-20261008`, `E-CDP-MOBILE-FILTER-CUE-20261008`, `E-DEPLOY-PIPELINE-MOBILE-FILTER-CUE-20261008`, `E-LIVE-PUBLIC-MOBILE-FILTER-CUE-20261008`, `E-NAVI-STATE-MOBILE-FILTER-CUE-20261008`.

## Audit recheck — 최종 공유 장의 인쇄·PDF action — bd0a33a / main 6bb3663 — 2026-10-07

- 최종 공유 장에 `GABA 이야기 공유하기`와 `인쇄 · PDF 저장`을 추가했다. 모바일에서는 세로 스택으로 읽히고 데스크톱에서는 2열로 정렬되며, 인쇄 미디어에서는 화면 전용 action이 숨겨진다.
- 로컬 typecheck·UI contract·127개 테스트·production build·정적 bundle·성능 예산을 통과했다. GitHub runner의 초기 번들 초과 3회는 중복 아이콘과 중복 라벨 markup을 줄여 최종 PR 보호 검사에서 해소했다.
- PR #606의 `release-verify 37633763482`·`site-quality-verify 37633763391`, main workflow `37634042762`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. 공개 validator는 merge SHA `6bb366388ef62775a96c8a69353fdca7b4b203c0`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- 공개 Chrome CDP fallback 390·1440px에서 두 action과 print 호출·가로폭을 재현했고, 인쇄 미디어에서 14개 장·14개 출처 링크·화면 전용 action 숨김을 확인했다. 신규 CRITICAL/MAJOR 결함은 없다.
- Browser plugin 부재에 따른 CDP fallback, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토, teaser `HOLD`는 외부 잔여 조건으로 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `C-262`, `E-LOCAL-BUILD-PRINT-ACTION-20261007`, `E-CDP-PRINT-ACTION-20261007`, `E-DEPLOY-PIPELINE-PRINT-ACTION-20261007`, `E-LIVE-PUBLIC-PRINT-ACTION-20261007`, `E-NAVI-STATE-PRINT-ACTION-20261007`.

## Current Release Recheck — ec29f7cf — 접근성·영상·초소형 모바일 재감리 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. 공개 validator가 main 공개본 candidate `ec29f7cf3910d1b379f6cb8c37f18e4c1981331c`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 접근성·반응형·전문가 영상: PASS. 280·320·390·768·1440px에서 document 가로폭이 viewport와 일치했다. heading jump·이름 없는 조작부·이미지 대체텍스트 누락·iframe title 누락·중복 id가 없었고, 큰 글자 모드의 본문과 조작 영역도 화면 안에 유지됐다. 390px에서 포스터 선택 후 iframe 재생과 두 번째 영상 카드 선택 상태를 재현했다.
- AC-005 자동 게이트: PASS. `validate:governance`, `validate:ops-docs`, `validate:tf-pulse-workflow`, `audit:goal`이 통과했다. 이번 회차는 재현 가능한 UI 결함이 없어 기능 코드를 변경하지 않았고, 기존 production build·127개 테스트·정적 번들·성능 게이트는 C-262 릴리스 증적으로 유지했다.
- AC-006 제품 독립 경계: PASS. 연구 카피·수치·출처·제품 독립 공개 경계와 teaser `HOLD`를 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없으며, Browser plugin 부재에 따른 Chrome CDP fallback, YouTube 외부 프레임, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다. 이번 회차에는 코드 패치를 만들지 않고 NAVI 증적만 갱신했다.

증적: `C-263`, `E-CDP-PUBLIC-A11Y-LARGE-TEXT-20261007`, `E-CDP-PUBLIC-EXPERT-VIDEO-20261007`, `E-LIVE-PUBLIC-RECHECK-20261007`, `E-NAVI-STATE-PUBLIC-REAUDIT-20261007`.

## Final Release Recheck — 1a54a7d7 — NAVI 문서-only 병합 후 공개 정합성 — 2026-10-07

- AC-001 공개 배포: PASS. PR #608 병합 후 main workflow `37639573788`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. 공개 validator는 merge SHA `1a54a7d7f812175d313463725e20eb6e9b50cca0`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 라이브 상호작용: PASS. 최종 공개 390px에서 전문가 영상 포스터 선택 후 `autoplay=1&mute=1&playsinline=1` iframe이 생성되고, 두 번째 카드 선택 상태가 유지되었으며 runtime error는 0건이었다.
- AC-005 자동 게이트: PASS. 이번 병합은 NAVI 문서-only 업데이트이며 PR 보호 검사와 main 배포 workflow가 통과했다. 기존 production build·127개 테스트·정적 번들·성능 예산은 C-263 릴리스 증적으로 유지한다.
- AC-006 제품 독립 경계: PASS. 기능 코드·연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. Browser plugin 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-264`, `E-DEPLOY-PIPELINE-PUBLIC-REAUDIT-20261007`, `E-LIVE-PUBLIC-FINAL-REAUDIT-20261007`, `E-NAVI-STATE-FINAL-REAUDIT-20261007`.

## Current Release Recheck — 3cef5f36 — 모바일 성장 연구 흐름 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. PR #600 병합 후 main workflow `37622082343`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, 공개 validator가 candidate `3cef5f36df8051d20ba1c73f24c50f4cd8d01d4c`·HTTP 200·STATIC·73개 bundle hash·12개 claims·6개 master records·6개 share pages·`teaser HOLD`·`smartStoreOnly=true`·`removed750=true`·`provenance=matched`를 확인했다.
- AC-003/AC-004 모바일 정보시각화: PASS. 390px 성장 연구 장에서 6단계가 번호 노드·세로 연결선·화살표가 있는 하나의 흐름으로 읽히고, 마지막 `어린이 연구`가 도착점으로 강조된다. 1440px에서는 기존 가로 카드 흐름이 유지되며 document scrollWidth는 viewport와 일치했다.
- AC-005 자동 게이트: PASS. 최종 PR release-verify·site-quality-verify와 main 배포 게이트가 통과했다. 로컬 Pages-style 성능은 `1,649,449 bytes / 1,650,000 bytes`이며, 첫 후보의 213바이트 초과는 비필수 장식 효과를 줄여 보정했다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 모바일 성장 연구 흐름의 시각적 구조만 보완했으며 공개 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 결함은 없으며 Browser plugin 부재에 따른 Chrome headless/CDP fallback, teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 계속 외부 검증으로 남긴다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-259`, `E-LOCAL-BUILD-MOBILE-GROWTH-PATH-20261007`, `E-CDP-MOBILE-GROWTH-PATH-20261007`, `E-DEPLOY-PIPELINE-MOBILE-GROWTH-PATH-20261007`, `E-LIVE-PUBLIC-MOBILE-GROWTH-PATH-20261007`, `E-NAVI-STATE-MOBILE-GROWTH-PATH-20261007`.

## Current Release Recheck — c24de966 — 좁은 모바일 회복 흐름 헤더 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. PR #602 병합 후 main workflow `37625896969`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, 공개 validator가 merge SHA `c24de9661cb9fb457ffcc12d3d26bf1671c3936f`·HTTP 200·STATIC·73개 bundle hash·12개 claims·6개 master records·6개 share pages·`teaser HOLD`·`smartStoreOnly=true`·`removed750=true`·`provenance=matched`를 확인했다.
- AC-003/AC-004 모바일 독해·반응형: PASS. 280px에서 회복 흐름의 제목·현재 카드·전체 단계 수가 한 줄로 정렬되고, 280·390px 큰 글씨 모드의 회복·연구·출처·공유 장은 가로 넘침 없이 유지되었다. 390px 실제 메뉴·연구 지도 선택·공유 fallback도 재현했다.
- AC-005 배포 게이트: PASS. 첫 PR 후보의 Pages 성능 한도 초과 `1,650,296 > 1,650,000`을 중복 CSS 제거로 해소했으며, 최종 로컬 총 자산은 `1,649,327 bytes`다. 최종 PR 보호 검사와 main 정적 공개 배포·라이브 smoke·release-status가 통과했다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 좁은 모바일 회복 지도 헤더와 중복 CSS만 조정했으며 공개 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없지만 Browser plugin 부재에 따른 Chrome CDP fallback, teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-260`, `E-LOCAL-BUILD-NARROW-RECOVERY-MAP-20261007`, `E-CDP-NARROW-RECOVERY-MAP-20261007`, `E-DEPLOY-PIPELINE-NARROW-RECOVERY-MAP-20261007`, `E-LIVE-PUBLIC-NARROW-RECOVERY-MAP-20261007`, `E-NAVI-STATE-NARROW-RECOVERY-MAP-20261007`.

## Current Release Recheck — eb0dcf3 — 인쇄·PDF 히어로 여백 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. main workflow `37628653269`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, 공개 validator가 candidate `eb0dcf3f20ffba47b5df55feadce5ff7a8664a3f`·HTTP 200·STATIC·73개 bundle hash·12개 claims·6개 master records·6개 share pages·`teaser HOLD`·`smartStoreOnly=true`·`removed750=true`·`provenance matched`를 확인했다.
- AC-003/AC-004 인쇄 활용성·반응형: PASS. 공개 인쇄 미디어에서 `print.css`가 로드되고, 첫 히어로 제목이 A4 좌우 여백 안에 배치되며 화면 전용 헤더·진행 레일·영상 보드·회복 조작부·마지막 액션이 숨겨졌다. 14개 장은 표시되고 14개 출처 링크가 남았으며 document `scrollWidth/clientWidth`는 `1425/1425`였다.
- AC-005 자동 게이트: PASS. typecheck·UI contract·127개 테스트·production build·정적 bundle·성능 예산, PR #604 required checks와 main 배포·라이브 smoke·release-status가 통과했다. 로컬 Pages-style 총 자산은 `1,649,327 bytes / 1,650,000 bytes`다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 인쇄 레이아웃만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없지만 Browser plugin 부재에 따른 Chrome CDP fallback, teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-261`, `E-LOCAL-BUILD-PRINT-HERO-MARGIN-20261007`, `E-CDP-PRINT-HERO-MARGIN-20261007`, `E-DEPLOY-PIPELINE-PRINT-HERO-MARGIN-20261007`, `E-LIVE-PUBLIC-PRINT-HERO-MARGIN-20261007`, `E-NAVI-STATE-PRINT-HERO-MARGIN-20261007`.

## 공개 배포 핵심 화면·상호작용 자동 재감리 — b7f0bbb — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. 코드 기준선 `b7f0bbb`와 문서-only PR #594 병합 SHA `f6a934d10ac08720be717e07bd86ea02513b24b9`가 연결된 뒤 `pnpm run validate:live-public`가 HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 전문 퍼블리싱·상호작용: PASS. Chrome headless/CDP fallback에서 320·390·768·1440px 핵심 장을 직접 열고 히어로·수면과 회복·발견·인지 연구 카드·출처 읽기·마지막 공유 화면을 확인했다. 390px에서는 메뉴 열림·포커스 이동·`#academic` 이동·연구 지도 `인지` 선택·공유 fallback 토스트를 실제 상태 변경으로 재현했으며 document 가로폭은 viewport와 일치했다.
- AC-005 자동 게이트: PASS. UI contract·research copy·typecheck·127개 테스트·production build·정적 bundle·release manifest·성능 검사가 통과했고 총 자산은 `1,649,431 bytes / 1,650,000 bytes`다.
- AC-006 제품 독립 경계: PASS. 이번 회차에는 기능 코드·공개 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다. teaser `HOLD`와 내부 운영 스냅샷 비공개 경계를 유지한다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser plugin 부재에 따른 Chrome headless/CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-256`, `E-LOCAL-BUILD-PUBLISHING-RECHECK-20261007`, `E-CDP-INTERACTION-PUBLISHING-RECHECK-20261007`, `E-LIVE-PUBLIC-PUBLISHING-RECHECK-20261007`, `E-NAVI-STATE-PUBLISHING-RECHECK-20261007`.

## Current Release Recheck — d39a4f0 — 초소형 모바일 비교 도표 고도화 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. main workflow `37615469457`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 공개 validator가 merge SHA `d39a4f0ee187cad5b12ab1f2da9470f0f9552d27`·HTTP 200·STATIC·73개 bundle hash·12 claims·6 master records·6 share pages·`teaser HOLD`·`provenance matched`를 확인했다.
- AC-003/AC-004 연구 도표·모바일: PASS. 320px에서 비교 조건과 GABA 그룹을 같은 시야에 유지하고 GABA 결과·변화 방향·상대 비교 범례를 한 번에 읽는 구조로 보정했으며 320·390px CDP 화면에서 가로 넘침과 잘림이 재현되지 않았다.
- AC-005 자동 게이트: PASS. UI contract·research copy·typecheck·127개 테스트·production build·정적 bundle·release manifest·성능 예산을 통과했으며 로컬 총 자산은 `1,648,820 bytes / 1,650,000 bytes`다. PR #596 보호 검사도 통과했다.
- AC-006 제품 독립 경계: PASS. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없지만 Chrome headless/CDP fallback, teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-257`, `E-LOCAL-BUILD-NARROW-COMPARISON-20261007`, `E-CDP-NARROW-COMPARISON-20261007`, `E-DEPLOY-PIPELINE-NARROW-COMPARISON-20261007`, `E-LIVE-PUBLIC-NARROW-COMPARISON-20261007`, `E-NAVI-STATE-NARROW-COMPARISON-20261007`.

## 공개 푸터 아이콘·번들 여유 재감리 — 60e90d4 — 2026-10-07

- AC-001 공개 URL·Pages 정합성: PASS. PR #572와 main workflow `37580070352`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, 공개 validator가 merge SHA `60e90d451bdfad3ea99bd7f0d2714230f98ef499`와 동일한 candidate를 확인했다.
- AC-003/AC-004 소비자 흐름·반응형: PASS. 푸터 `맨 위로`는 기존 번들 아이콘을 재사용해 사이트 아이콘 언어와 맞췄고, 320·390·1440px에서 문서 폭·아이콘 회전·맨 위로 포커스 복귀·오류 상태를 재현했다.
- AC-005 자동 게이트: PASS. typecheck·127개 테스트·UI contract·Pages-style build·release manifest·정적 bundle·성능 검사가 통과했다. 총 자산은 `1,647,536 bytes`, 초기 JS `311,475 bytes`, 초기 CSS `95,703 bytes`다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 푸터 시각 일관성과 미사용 레거시 스타일 정리만 포함하며 연구 카피·수치·출처·제품 독립 경계를 변경하지 않았다. 공개 validator의 `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`도 유지된다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없다. Browser plugin 부재에 따른 Playwright Chromium fallback, 과거 이력의 local-path 경고, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 외부 검증으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-245`, `E-LOCAL-BUILD-FOOTER-ICON-20261007`, `E-PLAYWRIGHT-FOOTER-ICON-20261007`, `E-DEPLOY-PIPELINE-FOOTER-ICON-20261007`, `E-LIVE-PUBLIC-FOOTER-ICON-20261007`, `E-NAVI-STATE-FOOTER-ICON-20261007`.

## Current Release Recheck — 7d059e8 — 모바일 장 이동 정합성 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. PR #574가 main에 병합되었고 workflow `37583630664`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. 공개 validator가 candidate `7d059e8f0def64d1c289a89b37cc59d15bd16acb`·HTTP 200·STATIC·bundle hash 73개·claims 12개·master records 6개·share pages 6개·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 모바일 읽기 흐름: PASS. `content-visibility:auto`로 지연되는 긴 장의 geometry를 보정하고 메뉴 닫힘·레이아웃 공개 후 sticky 읽기 레일 아래로 스크롤을 재정렬했다. 390·768·1440px에서 `발효·안전` 메뉴 이동 후 제목과 포커스가 보이고, 직접 `#research`·`#expert-videos`·`#top` 진입도 재현되었다. 가로 넘침·page error·console error는 0이다.
- AC-005 배포 게이트: PASS. UI contract·typecheck·127개 테스트·Pages-style build·release manifest·정적 bundle·성능 예산과 PR #574 보호 검사 및 main 공개 파이프라인이 성공했다. 초기 JS `311,475 bytes`, 초기 CSS `95,703 bytes`, 총 자산 `1,647,909 bytes`로 예산 안에 있다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 모바일 장 이동·포커스·sticky 읽기 위치 보정에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다. Browser plugin 부재에 따른 Playwright Chromium fallback, teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-246`, `E-LOCAL-BUILD-CHAPTER-NAV-20261007`, `E-PLAYWRIGHT-CHAPTER-NAV-20261007`, `E-DEPLOY-PIPELINE-CHAPTER-NAV-20261007`, `E-LIVE-PUBLIC-CHAPTER-NAV-20261007`, `E-NAVI-STATE-CHAPTER-NAV-20261007`.

## 공개 모바일 히어로 잘림 보정·재배포 — c4e27ab — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. 보호된 PR #577 병합 후 main workflow `37586165558`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, freshness 회복은 보호된 PR #578로 처리했다. 공개 validator가 candidate `c4e27ab043c92ee9ca6aeab8b827f4b93144334b`·HTTP 200·STATIC·bundle hash 73개·claims 12개·master records 6개·share pages 6개·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 모바일 읽기·시각 완결성: PASS. 390px 공개 히어로에서 우측이 잘리던 강조 문구에 모바일 전용 줄바꿈을 적용해 `GABA에서 읽습니다` 전체가 보이도록 했고, 320·390px 로컬 및 390·768·1440px 공개 화면을 확인했다. 768·1440px의 한 줄 강조와 가로폭 흐름은 유지된다.
- AC-005 자동 게이트: PASS. UI contract·typecheck·127개 테스트·Pages-style build·release manifest·정적 bundle·성능 검사가 통과했다. 초기 JS `311,475 bytes`, 초기 CSS `95,703 bytes`, 총 자산 `1,648,075 bytes`다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 모바일 히어로 줄바꿈과 가독성 보정에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다. `smartStoreOnly=true`, `removed750=true`, `internalOpsSnapshots=excluded`를 유지한다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없다. Browser plugin 부재에 따른 Chrome headless fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-247`, `E-LOCAL-BUILD-MOBILE-HERO-20261007`, `E-CHROME-MOBILE-HERO-20261007`, `E-DEPLOY-PIPELINE-MOBILE-HERO-20261007`, `E-LIVE-PUBLIC-MOBILE-HERO-20261007`, `E-NAVI-STATE-MOBILE-HERO-20261007`.

## 사업자용 공유 카드 모바일 가독성 보정 — 공개 배포 확인 — ddda08f — 2026-10-07

- 390px에서 사업자용 공유 카드 제목이 복사 조작부와 같은 행에서 압축되어 마지막 단어가 어색하게 갈리는 잔여 퍼블리싱 리스크를 확인했다. 제목·설명은 전체 폭으로 읽고 복사 조작부는 다음 행에서 조작하도록 재배치했으며, 350px 이하에서는 제목 크기만 한 단계 조정했다.
- UI contract·typecheck·127개 테스트·production build·정적 bundle·release manifest·성능 예산이 통과했다. PR #580 required checks, main workflow `37589452401`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고, 공개 validator는 merge SHA `ddda08f146b0f2a6ba2acb83c571ead84f71f40a`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, `provenance=matched`를 확인했다.
- 공개 320·390px Chrome headless/CDP fallback에서 직접 `#final` 진입·가로폭·공유 카드 읽기 순서를 확인했고, 390px `전체 복사` 클릭 후 클립보드 권한이 없는 환경의 fallback 토스트를 확인했다. 새 CRITICAL/MAJOR 결함은 없다.
- 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. Browser plugin 부재, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `C-248`, `E-LOCAL-BUILD-MOBILE-SHARE-KIT-20261007`, `E-CDP-MOBILE-SHARE-KIT-20261007`, `E-DEPLOY-PIPELINE-MOBILE-SHARE-KIT-20261007`, `E-LIVE-PUBLIC-MOBILE-SHARE-KIT-20261007`, `E-NAVI-STATE-MOBILE-SHARE-KIT-20261007`.

## 출처 읽기 연결 문구 한국어 줄바꿈 보정 — 공개 배포 확인 — 341beb5 — 2026-10-07

- 390px에서 `연구를 읽는 기준에서 공유 가능한 이야기로`의 조사 `로`가 다음 줄에 홀로 남는 잔여 퍼블리싱 리스크를 확인했다. 430px 이하 모바일 handoff 제목에 `word-break: keep-all`을 적용해 단어와 조사가 함께 이동하도록 보정했다.
- UI contract·typecheck·127개 테스트·production build·정적 bundle·release manifest·성능 예산이 통과했다. PR #582 required checks와 main workflow `37592004973`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고, 공개 validator는 merge SHA `341beb544580f2da9a18a5eeb2b2f97d1ddf8653`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, `provenance=matched`를 확인했다.
- 공개 320·390px Chrome headless/CDP fallback에서 직접 `#reading-note` 진입과 연결부를 확인했다. 390px은 `공유 가능한 / 이야기로`, 320px은 `공유 / 가능한 이야기로`로 자연스럽게 읽히며 가로폭이 유지된다. 새 CRITICAL/MAJOR 결함은 없다.
- 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. Browser plugin 부재, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `C-249`, `E-LOCAL-BUILD-KOREAN-HANDOFF-20261007`, `E-CDP-KOREAN-HANDOFF-20261007`, `E-DEPLOY-PIPELINE-KOREAN-HANDOFF-20261007`, `E-LIVE-PUBLIC-KOREAN-HANDOFF-20261007`, `E-NAVI-STATE-KOREAN-HANDOFF-20261007`.

## 공개 배포 반응형 다중 폭 재감리 — 최종 공개본 — 2026-10-07

- AC-001 공개 정합성: PASS. 최종 공개 manifest candidate `5fa5cf54635782a23291a3dcfc5659a2b528c95f3`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 반응형·읽기 흐름: PASS. 공개 `#top`·`#research`·`#reading-note`·`#final`을 360·390·430·768·1440px에서 직접 진입했다. document `scrollWidth`는 각 viewport와 일치했고 360·430·1440px 대표 캡처에서 헤더·히어로·출처 읽기 카드·다음 장 연결부의 잘림과 겹침이 없었다. 모바일 전문가 영상 필터의 넓은 요소는 페이지를 밀어내는 넘침이 아니라 의도된 내부 가로 스크롤 레일이었다.
- AC-006 제품 독립 경계: PASS. 이번 점검은 레이아웃·반응형 표시 검증만 수행했으며 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 발견되지 않았다. Browser plugin 부재에 따른 Chrome headless/CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-250`, `E-CDP-RESPONSIVE-AUDIT-20261007`, `E-LIVE-PUBLIC-RESPONSIVE-AUDIT-20261007`, `E-DEPLOY-PIPELINE-RESPONSIVE-AUDIT-20261007`, `E-NAVI-STATE-RESPONSIVE-AUDIT-20261007`.

## 좁은 모바일 공유 컨트롤 라벨 보정 — 공개 배포 확인 — c249e113 — 2026-10-07

- AC-001 공개 정합성: PASS. 공개 validator가 candidate `c249e113cfe3bcf7e6fe5b63098b6e612d1309c1`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 모바일 가독성·공유성: PASS. 280·320px에서 공유 아이콘 옆에 `공유` 라벨을 표시하고 351·390px에서는 기존 `공유하기`를 유지했다. 네 폭 모두 document 폭이 viewport와 일치하며 280px에서 공유 버튼 실제 클릭 후 fallback 토스트를 확인했다. 접근성 이름 `페이지 공유하기`는 유지했다.
- AC-005 자동 게이트: PASS. UI contract·typecheck·127개 테스트·production build·정적 bundle·성능 예산과 PR #585 보호 검사가 통과했다.
- AC-006 제품 독립 경계: PASS. 헤더 공유 라벨과 폭만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Chrome headless/CDP fallback, teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-251`, `E-LOCAL-BUILD-COMPACT-SHARE-20261007`, `E-CDP-COMPACT-SHARE-20261007`, `E-DEPLOY-PIPELINE-COMPACT-SHARE-20261007`, `E-LIVE-PUBLIC-COMPACT-SHARE-20261007`, `E-NAVI-STATE-COMPACT-SHARE-20261007`.

## Current Release Recheck — 9e9e0d3 — 초소형 전문가 영상 메타데이터 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. main workflow `37599175190`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 공개 validator가 candidate `9e9e0d35a0db4255c5151d09411706ec482d8717`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개를 확인했다.
- AC-003/AC-004 전문가 영상 흐름·반응형: PASS. 280·320·360·390·430·1440px에서 전문가 영상 장을 직접 열고 포스터 선택→iframe·`재생 중` 상태→`수면` 필터→4개 카드 표시를 재현했다. 350px 이하에서는 영상 순번이 메타 정보 아래로 자연스럽게 줄바꿈되며 카드 밖으로 나가지 않고, 페이지 document 폭은 각 viewport와 일치했다. 필터 폭 확장은 의도된 내부 가로 스크롤 레일로 확인했다.
- AC-005 자동 게이트: PASS. UI contract·typecheck·127개 테스트·production build·정적 bundle·release manifest·성능·개인정보 검사가 통과했고 initial JS 311,405 bytes, initial CSS 95,703 bytes, total assets 1,648,875 bytes로 예산 안에 있다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 초소형 모바일 전문가 영상 메타데이터 줄바꿈에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계와 teaser `HOLD`를 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Browser plugin 부재에 따른 Chrome headless/CDP fallback, YouTube 외부 프레임 로딩, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-252`, `E-LOCAL-BUILD-ULTRA-NARROW-VIDEO-META-20261007`, `E-CDP-ULTRA-NARROW-VIDEO-META-20261007`, `E-DEPLOY-PIPELINE-ULTRA-NARROW-VIDEO-META-20261007`, `E-LIVE-PUBLIC-ULTRA-NARROW-VIDEO-META-20261007`, `E-NAVI-STATE-ULTRA-NARROW-VIDEO-META-20261007`.

## Current Release Recheck — 560d9afe — 전문가 영상 지연 fallback — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. main workflow `37604557572`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, 공개 validator가 merge SHA `560d9afe6e0acbd257e9fb058a87078c06d76ac6`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, teaser `HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 전문가 영상·모바일: PASS. 외부 iframe 준비 지연을 재현한 Chrome headless/CDP fallback 280px에서 `재생 지연`, YouTube 원본 보기, 다시 시도, 다시 시도 후 `준비 중` 복귀를 확인했다. document 폭은 280/280이고 console error는 0이었다.
- AC-005 자동 게이트: PASS. UI contract·typecheck·127개 테스트·production build·정적 bundle·release manifest·성능 예산과 PR #589 보호 검사가 통과했다. 로컬 최종 total assets는 `1,649,388 bytes`다.
- AC-006 제품 독립 경계: PASS. 외부 영상 로딩 상태와 회복 조작만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계와 teaser `HOLD`는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없다. Browser plugin 부재에 따른 Chrome headless/CDP fallback, YouTube 외부 프레임, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-253`, `E-LOCAL-BUILD-VIDEO-TIMEOUT-FALLBACK-20261007`, `E-CDP-VIDEO-TIMEOUT-FALLBACK-20261007`, `E-DEPLOY-PIPELINE-VIDEO-TIMEOUT-FALLBACK-20261007`, `E-LIVE-PUBLIC-VIDEO-TIMEOUT-FALLBACK-20261007`, `E-NAVI-STATE-VIDEO-TIMEOUT-FALLBACK-20261007`.

## Current Release Recheck — f320f5d — 공개 표면·반응형 고도화 재감리 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. 공개 validator가 candidate `f320f5dfa4964770c306f3b643f5eedd6f363743`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 전문 퍼블리싱·반응형: PASS. 320px은 `#academic`·`#reading-note`·`#expert-videos`·`#final`, 390·768·1440px은 `#top`과 주요 장을 직접 진입시켰다. 확인 화면의 document 가로폭은 viewport와 일치했고 히어로·연구 지도·출처 읽기 카드·전문가 영상·마지막 공유 화면에서 잘림·겹침이 재현되지 않았다.
- AC-005 자동 게이트: PASS. UI contract·research copy·typecheck·127개 테스트·정적 성능 예산이 통과했고 총 자산은 `1,649,388 bytes`다. 이번 재감리에는 코드 변경이 필요하지 않았다.
- AC-006 제품 독립 경계: PASS. 기능 코드·공개 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없지만 Browser plugin 부재에 따른 Chrome headless/CDP fallback, teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-254`, `E-LOCAL-BUILD-PUBLISHING-AUDIT-20261007`, `E-CDP-PUBLISHING-SURFACE-AUDIT-20261007`, `E-LIVE-PUBLIC-PUBLISHING-REAUDIT-20261007`, `E-NAVI-STATE-PUBLISHING-AUDIT-20261007`.

## Current Release Recheck — 5fedb836 — 모바일 브라우저 호환성 퍼블리싱 보완 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. PR #592의 required checks와 main workflow `37608893903`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, 공개 validator가 merge SHA `5fedb836401de9469a4d86ae9b7403303b0961b7`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개를 확인했다.
- AC-003/AC-004 모바일 퍼블리싱: PASS. `text-size-adjust`·`-webkit-text-size-adjust`와 헤더 `-webkit-backdrop-filter` fallback을 추가해 모바일 브라우저별 텍스트 자동 확대·frosted header 차이를 줄였다. 헤딩 균형 규칙은 유지하면서 중복 선택자만 정리했고, 콘텐츠 화면·연구 결과 도표·공유 흐름의 구조는 변경하지 않았다.
- AC-005 자동 게이트: PASS. UI contract·typecheck·127개 테스트·production build·정적 bundle·Pages 성능 예산이 통과했다. Pages-style 총 자산은 `1,649,635 bytes / 1,650,000 bytes`다.
- AC-006 제품 독립 경계: PASS. 공개 연구 카피·수치·출처·제품 독립 공개 경계·teaser `HOLD`는 유지됐다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 확인되지 않았다. Chrome 자동 검증 밖의 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-255`, `E-LOCAL-BUILD-CROSS-BROWSER-SURFACE-20261007`, `E-DEPLOY-PIPELINE-CROSS-BROWSER-SURFACE-20261007`, `E-LIVE-PUBLIC-CROSS-BROWSER-SURFACE-20261007`, `E-NAVI-STATE-CROSS-BROWSER-SURFACE-20261007`.

## 공개 배포 다중 화면 자동 재감리 — 2de8c650 — 2026-10-07

- AC-001 공개 정합성: PASS. 공개 validator가 candidate `2de8c650ad89e94879ddc20c036666adc4913d30`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 소비자 흐름·반응형: PASS. 320·390·768·1440px에서 가로폭이 viewport와 일치하고 오류가 없었다. 390px에서 메뉴, 글자 크기, 피부 연구 카드 포커스, 전문가 영상 자동 재생을 재현했다.
- AC-005 자동 게이트: PASS. typecheck·UI contract·research copy·127개 테스트·production build·정적 bundle·release manifest·성능 검사가 통과했다. 총 자산은 `1,649,465 bytes`다.
- AC-006 제품 독립 경계: PASS. 공개 과학 카피·수치·출처와 제품 독립 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Browser plugin 부재에 따른 Playwright Chromium fallback, teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-241`, `E-LOCAL-BUILD-NAVI-PUBLIC-AUDIT-20261007`, `E-PLAYWRIGHT-NAVI-PUBLIC-AUDIT-20261007`, `E-DEPLOY-PIPELINE-NAVI-PUBLIC-AUDIT-20261007`, `E-LIVE-PUBLIC-NAVI-PUBLIC-AUDIT-20261007`, `E-NAVI-STATE-PUBLIC-AUDIT-20261007`.

## 사업자용 핵심 5문장 인쇄·PDF 공유 보정 — f3917100 — 2026-10-07

- AC-001 공개 정합성: PASS. main workflow `37574734151`이 성공했고 공개 validator가 candidate `f391710024d67181271a21098d41d2b0639aa295`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개를 확인했다.
- AC-003/AC-006 사업자 공유성·제품 독립 경계: PASS. 화면의 접기·문장 복사는 유지하고 인쇄 media에서 사업자용 핵심 5문장과 카드 본문을 표시했으며 복사 버튼은 숨겼다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- AC-004 반응형: PASS. 공개 320·390·768·1440px에서 가로폭이 viewport와 일치하고 page/console error가 없었다. 390px 인쇄 mode에서 접힌 details가 펼쳐진 출력으로 계산되며 5개 카드·본문이 표시됐다.
- AC-005 자동 게이트: PASS. typecheck·127개 테스트·production build·정적 bundle·release manifest·성능·개인정보 검사가 통과했고 총 자산은 `1,649,465 bytes`다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 Browser plugin 부재에 따른 Playwright Chromium fallback, teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-242`, `E-LOCAL-BUILD-PRINT-SHARE-KIT-20261007`, `E-PLAYWRIGHT-PRINT-SHARE-KIT-20261007`, `E-DEPLOY-PIPELINE-PRINT-SHARE-KIT-20261007`, `E-LIVE-PUBLIC-PRINT-SHARE-KIT-20261007`, `E-NAVI-STATE-PRINT-SHARE-KIT-20261007`.

## Current Release Recheck — 42be0181 — 직접 진입·공유 경계 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. 공개 validator가 candidate `42be0181c5ad0cfef839b34f9a4d9a74472fd660`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 소비자 흐름·반응형: PASS. `#research`·연구 주제 해시·전문가 영상 해시가 의도한 위치와 선택 상태로 열리고, 320·390·768px에서 가로폭·page/console error가 정상이다. 공유 알림과 사업자용 5문장 전체 복사도 실제 상태 변경을 재현했다.
- AC-005 자동 게이트: PASS. typecheck·127개 테스트·production build·정적 bundle·release manifest·성능·개인정보·NAVI 검사가 통과했다. 총 자산은 `1,649,465 bytes`다.
- AC-006 제품 독립 경계: PASS. 이번 재감리는 공개 UX 경계 검증이며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 결함은 없으며 Browser plugin 부재에 따른 Playwright Chromium fallback, teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토 조건은 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-243`, `E-LOCAL-EDGE-STATE-AUDIT-20261007`, `E-PLAYWRIGHT-EDGE-STATE-AUDIT-20261007`, `E-LIVE-PUBLIC-EDGE-STATE-AUDIT-20261007`, `E-NAVI-STATE-EDGE-STATE-AUDIT-20261007`.

## Current Release Recheck — abc51324 — 최종 공개 정합성 — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. PR #570 병합 후 main workflow `37577523048`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고, 공개 validator가 merge SHA `abc51324c26f596667100c3017c0c4b7ca49a4c1`와 동일한 candidate를 확인했다.
- AC-003/AC-004 소비자 흐름·반응형: PASS. 이전 재감리의 직접 해시·공유·복사·320·390·768px 검증 기록이 main 배포에 연결되며, 기능 코드 변경은 없었다.
- AC-005 배포 게이트: PASS. 정적 공개 데이터 12 claims·6 master records·6 share pages, bundle hash 73개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 NAVI 감사 기록만 추가했으며 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 결함은 없으며 과거 이력 경고, Browser plugin 부재에 따른 Playwright fallback, teaser `HOLD`, 외부 브라우저·실기기·실사용자 독해성·독립 과학·규제 검토 조건은 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-244`, `E-DEPLOY-PIPELINE-EDGE-STATE-AUDIT-20261007`, `E-LIVE-PUBLIC-EDGE-STATE-AUDIT-FINAL-20261007`, `E-NAVI-STATE-EDGE-STATE-AUDIT-FINAL-20261007`.

## 인쇄·PDF 공개 배포 재검증 — aa4ea2f — 2026-10-07

- AC-001 공개 URL·Pages 정합성: PASS. main workflow `37547332906`의 release-verify·Pages·라이브 smoke·release-status가 성공했고 공개 validator가 candidate `aa4ea2f147ac4997844221ed3c2c64ba86bdcc20`·HTTP 200·STATIC·73개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-006 인쇄·PDF 활용성: PASS. 공개 `print.css`가 HTTP 200 CSS로 제공되며, 인쇄 미디어에서 화면 전용 chrome 0개, 지연 섹션 6개 실제 표시, 출처 링크 14개, 문서 폭 1440px을 확인했다. 인쇄 미리보기 이미지도 검수했다.
- AC-005 배포 게이트: PASS. PR #539 required checks, main release-verify·fresh TF pulse·Pages·라이브 smoke·release-status가 성공했다. 정적 사이트 성능 예산과 연구·제품 독립 경계도 유지됐다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

증적: `C-227`, `E-LOCAL-BUILD-PRINT-FLOW-20261008`, `E-UI-CONTRACT-PRINT-FLOW-20261008`, `E-CDP-PRINT-FLOW-20261008`, `E-DEPLOY-PIPELINE-PRINT-FLOW-20261008`, `E-LIVE-PUBLIC-PRINT-FLOW-20261008`.

## 공개 배포 상호작용·대형 글자 재감리 — c0ff46f — 2026-10-08

- AC-001 공개 URL·라이브 정합성: PASS. 공개 validator가 candidate `c0ff46f910c4009cbcdd5d3870238541b6dc89b4`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-002/AC-003/AC-004 소비자 흐름·반응형: PASS. 공개 Chrome CDP fallback 대형 글자 모드에서 280·390px의 top·활용·발효·성장·전문가·최종 장, 768·1440px 연구 지도를 재감리했다. 각 대표 화면의 document width는 viewport와 일치했고 연구 지도 5개 항목, 카드 이미지, 연구 결과 흐름, 전문가 영상 게시판, 최종 공유 화면에서 잘림·겹침·runtime error가 재현되지 않았다.
- AC-004 상호작용: PASS. 390px에서 메뉴 열림·닫힘, 큰 글자 전환, 피부 연구 주제 선택 후 `#research-skin` 카드 활성화·포커스·스크롤, 전문가 영상 선택 후 `autoplay=1` iframe, 수면·회복 카드 3초 전환과 일시정지를 실제 상태 변경으로 재현했다.
- AC-005 자동 게이트: PASS_WITH_EXISTING_RELEASE. 이번 회차는 기능 코드를 변경하지 않았고, 최신 main의 기존 보호 검사·정적 번들·성능 증적을 유지한다. `validate:ui-contract`, `validate:research-copy`, `validate:static-bundle`, `validate:live-public`, `audit:goal`은 현재 공개본 기준으로 재실행했다.
- AC-006 제품 독립 경계: PASS. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없지만 Browser plugin 부재에 따른 Chrome CDP fallback, teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-283`, `E-CDP-LIVE-MULTICHAPTER-LARGE-TEXT-20261008`, `E-CDP-LIVE-INTERACTION-REAUDIT-20261008`, `E-LIVE-PUBLIC-INTERACTION-REAUDIT-20261008`, `E-NAVI-STATE-INTERACTION-REAUDIT-20261008`.

## NAVI 최종 동기화 — 3f7fa299 — 2026-10-08

- AC-001 공개 정합성: PASS. 상호작용 재감리 기록을 담은 PR #646 병합 후 main workflow `37696265479`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했으며 deploy-worker는 `STATIC_ONLY`로 skipped였다.
- 공개 validator는 최종 candidate `3f7fa299b6e6392c22a1e238bbd20dd654ff1ae2`, HTTP 200, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- 이번 최종 동기화는 NAVI 문서 provenance만 갱신했으며 기능 코드·연구 카피·수치·출처·제품 독립 공개 경계와 `USER_DECISION / NOT_READY` 상태는 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-283`, `E-PR-NAVI-INTERACTION-REAUDIT-20261008`, `E-DEPLOY-PIPELINE-NAVI-INTERACTION-REAUDIT-20261008`, `E-LIVE-PUBLIC-NAVI-INTERACTION-REAUDIT-20261008`, `E-NAVI-STATE-NAVI-INTERACTION-REAUDIT-20261008`.

## 연구 지도 큰 글자 범위 라벨 보정 — 93372da4 — 2026-10-08

- AC-001 공개 URL·라이브 정합성: PASS. PR #648 병합 후 main workflow `37698489905`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 deploy-worker는 `STATIC_ONLY`로 skipped였다. 공개 validator가 merge candidate `93372da4b520fabbe4bcd721392c09917d72a5bf`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 큰 글자·모바일 가독성: PASS. 연구 지도 보조 범위 라벨을 큰 글자 모드에서 10px에서 11px로 확대했다. 공개 Chrome CDP fallback 280·390px에서 5개 라벨 모두 computed `11px`, 지도 내부 배치, pageWidth/scrollWidth `280/280`·`390/390`, 이름 없는 버튼 0개, runtime error 0건을 확인했다. 메뉴·큰 글자 전환·연구 주제 선택·전문가 영상 자동재생·회복 카드 3초 전환·일시정지도 공개 URL에서 재현했다.
- AC-005 자동 게이트: PASS. UI contract·research copy·typecheck·127개 테스트·production build·정적 bundle·release manifest·Pages 성능·라이브 smoke가 통과했다. 로컬 총 자산은 `1,649,477 bytes / 1,650,000 bytes`다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 연구 지도 보조 라벨의 큰 글자 가독성 보정에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 코드 결함은 없다. Browser plugin 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-284`, `E-LOCAL-BUILD-RESEARCH-MAP-LABEL-20261008`, `E-PR-RESEARCH-MAP-LABEL-20261008`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-LABEL-20261008`, `E-CDP-LIVE-RESEARCH-MAP-LABEL-20261008`, `E-CDP-LIVE-INTERACTION-RESEARCH-MAP-LABEL-20261008`, `E-LIVE-PUBLIC-RESEARCH-MAP-LABEL-20261008`.

## NAVI 최종 동기화 — 9afc8dd4 — 2026-10-08

- 문서-only PR #649 병합 후 main workflow `37699268106`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 deploy-worker는 `STATIC_ONLY`로 skipped였다.
- 공개 validator는 최종 candidate `9afc8dd4b2be8cb4fecff6d3794eb44c426c983b`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- 기능 코드·연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았으며, NAVI 상태 `USER_DECISION`과 완료 게이트 `NOT_READY`를 유지했다.

증적: `C-284`, `E-NAVI-STATE-RESEARCH-MAP-LABEL-20261008`.

## 연구 지도 일반 모드 범위 라벨 보정 — f70e4896 — 2026-10-08

- AC-001 공개 URL·라이브 정합성: PASS. PR #651 병합 후 main workflow `37701087150`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 deploy-worker는 `STATIC_ONLY`로 skipped였다. 공개 validator가 merge candidate `f70e48961931cd3faad1ad32976f50cc457f7daa`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 모바일 가독성: PASS. 연구 지도 보조 범위 라벨의 기본값을 10px에서 11px로 확대해 일반 모드와 큰 글자 모드의 기준을 맞췄다. 공개 Chrome CDP fallback 280·390px에서 두 모드의 다섯 라벨 모두 computed `11px`, 지도 내부 배치, pageWidth/scrollWidth `280/280`·`390/390`, runtime error 0건을 확인했다.
- AC-005 자동 게이트: PASS. PR 보호 검사와 main workflow의 release-verify·Pages·라이브 smoke·release-status가 통과했다. 로컬 production build·정적 bundle·성능 예산과 127개 테스트도 통과했으며 총 자산은 `1,649,477 bytes / 1,650,000 bytes`다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 연구 지도 범위 라벨의 기본 가독성 보정에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Chrome CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-285`, `E-LOCAL-BUILD-RESEARCH-MAP-SCOPE-BASELINE-20261008`, `E-PR-RESEARCH-MAP-SCOPE-BASELINE-20261008`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-SCOPE-BASELINE-20261008`, `E-CDP-LIVE-RESEARCH-MAP-SCOPE-BASELINE-20261008`, `E-LIVE-PUBLIC-RESEARCH-MAP-SCOPE-BASELINE-20261008`.

## NAVI 최종 동기화 — 3241558c — 2026-10-08

- 문서-only PR #652 병합 후 main workflow `37701731921`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 deploy-worker는 `STATIC_ONLY`로 skipped였다.
- 공개 validator는 최종 candidate `3241558c4d6f821292d53a3153a2cbdda1de7a8e`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- 기능 코드·연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았으며, NAVI 상태 `USER_DECISION`과 완료 게이트 `NOT_READY`를 유지한다.

증적: `C-285`, `E-NAVI-STATE-RESEARCH-MAP-SCOPE-BASELINE-20261008`.

## NAVI 최종 공개 provenance 재동기화 — d45dfba9 — 2026-10-08

- PR #653 병합 후 main workflow `37702257470`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 deploy-worker는 `STATIC_ONLY`로 skipped였다.
- 공개 validator는 최신 candidate `d45dfba970374d64eda699061e250915e58befa0`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- 기능 코드·연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았으며, NAVI 상태 `USER_DECISION`과 완료 게이트 `NOT_READY`를 유지한다.

증적: `C-285`, `E-NAVI-STATE-RESEARCH-MAP-SCOPE-BASELINE-20261008`.

## 연구 지도 범위 라벨 12px 보정 — a1abe50e — 2026-10-08

- AC-001 공개 URL·라이브 정합성: PASS. PR #655 merge SHA `24c78b3ba4d46eacd30f1e8c1c4bdd89c9f6c5c7` 이후 heartbeat 신선도 게이트가 오래되어 한 차례 중단됐으나, 동일 snapshot의 운영 heartbeat 갱신 PR #656 merge SHA `a1abe50e8fa90b6ecf02f5fc04bf37ce5f0c2554` 후 main workflow `37704194129`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했다. 공개 validator는 candidate `a1abe50e8fa90b6ecf02f5fc04bf37ce5f0c2554`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 모바일·큰 글자 가독성: PASS. 연구 지도 보조 범위 라벨을 일반 모드와 큰 글자 모드에서 11px에서 12px로 확대했다. 공개 280·390px에서 5개 라벨 모두 computed `12px`, 지도 내부 배치, pageWidth/scrollWidth `280/280`·`390/390`을 확인했다. 공개 공유 안내는 모바일에서 `role=status`·`aria-live=polite`로 노출된 뒤 자동으로 사라졌다.
- AC-005 자동 게이트: PASS. 로컬 `pnpm run build`, `pnpm test` 127 pass / 0 fail, PR 보호검사, Pages 배포, 라이브 smoke, release-status가 통과했다. Worker는 `STATIC_ONLY`에 따라 실행하지 않았다. 첫 배포 시 실패한 원인은 코드가 아니라 TF heartbeat 491분 경과였으며, 내부 heartbeat 갱신 후 재검증에서 해소됐다.
- AC-006 제품 독립 경계: PASS. 이번 코드 변경은 연구 지도 보조 라벨의 가독성 보정에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다. 공개 validator의 제품 750 제거·Smart Store 단일 경계·teaser HOLD도 유지된다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Chrome Playwright/CDP fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-286`, `E-LOCAL-BUILD-RESEARCH-MAP-SCOPE-12PX-20261008`, `E-PR-RESEARCH-MAP-SCOPE-12PX-20261008`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-SCOPE-12PX-20261008`, `E-CDP-LIVE-RESEARCH-MAP-SCOPE-12PX-20261008`, `E-LIVE-PUBLIC-RESEARCH-MAP-SCOPE-12PX-20261008`, `E-NAVI-STATE-RESEARCH-MAP-SCOPE-12PX-20261008`.

## 연구 결과 비교 도표 결과 우선 보정 — a2a7ff6a — 2026-10-08

- AC-001 공개 URL·라이브 정합성: PASS. PR #658 merge SHA `a2a7ff6a88da7959d66cb73560a1a7a869fe5fe1` 이후 main workflow `37707042225`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 deploy-worker는 `STATIC_ONLY`로 skipped였다. 공개 validator는 candidate `a2a7ff6a88da7959d66cb73560a1a7a869fe5fe1`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-003/AC-004 연구 결과 이해·모바일 가독성: PASS. 비교 도표의 범례와 각 레인을 `GABA 그룹 → 비교 조건` 순서로 정리하고, 280px에서는 내부 레인을 한 열로 내려 가로 넘침을 제거했으며 390px·1440px에서는 화면 폭에 맞춰 비교가 유지된다. 공개 Chrome Playwright fallback에서 280·390·1440px 모두 `chartOverflow=[]`, `laneOverflow=false`, `errors=[]`, pageWidth/scrollWidth 일치를 확인했다.
- AC-005 자동 게이트: PASS. 로컬 `pnpm run build`, UI contract, typecheck, 정적 bundle, release manifest, 성능 예산과 `pnpm test` 127 pass / 0 fail이 통과했다. 로컬 총 자산은 `1,649,020 bytes / 1,650,000 bytes`다.
- AC-006 제품 독립 경계: PASS. 연구 수치·카피·출처·제품 독립 공개 경계는 변경하지 않았고, 도표는 실제 측정값이 아닌 변화 방향과 조건 간 상대 비교라는 기존 안내를 유지한다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Chrome Playwright fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-287`, `E-LOCAL-BUILD-RESEARCH-CHART-RESULT-FIRST-20261008`, `E-PR-RESEARCH-CHART-RESULT-FIRST-20261008`, `E-DEPLOY-PIPELINE-RESEARCH-CHART-RESULT-FIRST-20261008`, `E-CDP-LIVE-RESEARCH-CHART-RESULT-FIRST-20261008`, `E-LIVE-PUBLIC-RESEARCH-CHART-RESULT-FIRST-20261008`, `E-NAVI-STATE-RESEARCH-CHART-RESULT-FIRST-20261008`.

## 공개 표면·직접 진입 재감리 — 6d5c8a49 — 2026-10-08

- AC-001 공개 정합성: PASS. `pnpm run validate:live-public`가 최신 Pages candidate `6d5c8a4985018ace8acb52e27487b6811222338f`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-004 모바일·직접 진입: PASS. 실제 공개 URL의 Chrome Playwright fallback 280·390·1440px에서 13개 핵심 장의 해시 진입 제목이 sticky header와 읽기 진행 레일 아래에 정렬되고, `bodyOverflow=false`, `errors=[]`였다.
- AC-002/AC-006 공개 표면: PASS. 390·1440px 대표 스크린샷에서 히어로·연구 결과·전문가 영상·최종 공유 흐름의 잘림·겹침·이름 없는 조작부가 관찰되지 않았고, 전문가 영상 썸네일 10개는 2.5초 대기 후 모두 로드됐다. 정적 제품 독립 경계와 연구 출처 흐름은 유지됐다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 화면 결함은 확인되지 않았다. Chrome Playwright fallback은 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으므로 해당 검증 조건은 계속 OPEN이다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-288`, `E-PLAYWRIGHT-PUBLIC-DEEPLINK-AUDIT-20261008`, `E-PLAYWRIGHT-PUBLIC-SURFACE-VISUAL-20261008`, `E-PLAYWRIGHT-PUBLIC-VIDEO-LOAD-20261008`, `E-LIVE-PUBLIC-SURFACE-AUDIT-20261008`, `E-LIVE-PUBLIC-DEEPLINK-AUDIT-20261008`, `E-NAVI-STATE-PUBLIC-SURFACE-AUDIT-20261008`.

## 공개 표면 재감리 최종 배포 동기화 — 33c50766 — 2026-10-08

- AC-001 공개 배포: PASS. PR #660 병합 후 main workflow `37708551501`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 deploy-worker는 `STATIC_ONLY`로 skipped됐다.
- 라이브 정합성: PASS. 최종 candidate `33c507666fca2878413f22a382501467b3cc4aca`에서 HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 재확인했다.
- AC-004/AC-007: PASS_WITH_CONDITIONS. 직접 진입·표면 시각 점검·전문가 영상 썸네일 결과는 앞선 C-288과 일치한다. 기능 코드·연구 카피·수치·출처·제품 독립 경계는 변경되지 않았고, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 계속 외부 조건이다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-289`, `E-DEPLOY-PIPELINE-PUBLIC-SURFACE-FINAL-20261008`, `E-LIVE-PUBLIC-FINAL-SURFACE-20261008`, `E-NAVI-STATE-PUBLIC-SURFACE-FINAL-20261008`.

## 수면과 회복 14단계 모바일 균형 보정 — 5094bf25 — 2026-10-08

- AC-001 공개 배포: PASS. PR #662의 `release-verify`·`site-quality-verify`가 통과한 뒤 main merge SHA `5094bf254fbaa2023178043ed7afb5634af29887`의 workflow `37709888046`에서 `release-verify`·`worker-readiness`·`deploy-pages`·`smoke-live`·`release-status`가 성공했고 `deploy-worker`는 `STATIC_ONLY`로 skipped됐다.
- AC-002/AC-004 모바일 읽기 흐름: PASS. 351–700px에서는 수면과 회복 14단계를 7+7 두 행으로 정리해 마지막 두 단계가 분리되지 않도록 했고, 350px 이하에서는 6+6+2 안전 레이아웃을 유지했다. 로컬 Playwright 280·390·1440px에서 각각 3·2·1행과 viewport 일치 가로폭을 확인했으며, 라이브 390px에서 14개 단계·마지막 단계 선택·`aria-current`·최종 카드 연결·runtime error 0을 재현했다.
- AC-005 자동 게이트: PASS. 로컬 `pnpm run build`, `pnpm test` 127 pass / 0 fail, typecheck, UI contract, 정적 bundle, release manifest, 성능 예산과 보호 브랜치 검사가 통과했다. 총 자산은 `1,649,241 bytes / 1,650,000 bytes`다.
- AC-006 제품 독립 경계: PASS. 이번 보정은 회복 지도 레이아웃과 검증 계약에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다. 라이브 validator는 HTTP 200·STATIC·bundle hash 73·claims 12·master records 6·share pages 6·`teaser HOLD`·`smartStoreOnly=true`·`removed750=true`·`provenance=matched`를 유지했다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 확인되지 않았다. Chromium fallback은 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으므로 해당 외부 조건과 `USER_DECISION / NOT_READY`를 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-290`, `E-LOCAL-BUILD-RECOVERY-MAP-BALANCE-20261008`, `E-UI-CONTRACT-RECOVERY-MAP-BALANCE-20261008`, `E-PR-RECOVERY-MAP-BALANCE-20261008`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-BALANCE-20261008`, `E-LIVE-PUBLIC-RECOVERY-MAP-BALANCE-20261008`, `E-NAVI-STATE-RECOVERY-MAP-BALANCE-20261008`.

## 수면과 회복 단계 ARIA 순번 보강 — ec7cb47f — 2026-10-08

- AC-001 공개 배포: PASS. PR #664의 `release-verify`·`site-quality-verify`가 통과한 뒤 main merge SHA `ec7cb47f7a2a37e2404dbe5ad59026c6d0b57b63`의 workflow `37711484247`에서 `release-verify`·`worker-readiness`·`deploy-pages`·`smoke-live`·`release-status`가 성공했고 `deploy-worker`는 `STATIC_ONLY`로 skipped됐다.
- AC-002/AC-004 접근성·모바일 읽기 흐름: PASS. 14개 단계 버튼에 `aria-setsize=14`와 `aria-posinset=1…14`를 추가했으며, 280·390·1440px의 기존 3·2·1행 시각 배열과 자동 전환·선택 상태를 유지했다. 공개 390px에서 `aria-current=step`, `pageScrollWidth=390`, runtime error 0을 재현했다.
- AC-005 자동 게이트: PASS. 로컬 `pnpm run build`, `pnpm test` 127 pass / 0 fail, typecheck, UI contract, 정적 bundle, release manifest, 성능 예산과 보호 브랜치 검사가 통과했다. 총 자산은 `1,649,285 bytes / 1,650,000 bytes`다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 회복 지도 버튼의 접근성 의미와 UI contract에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다. 라이브 validator는 HTTP 200·STATIC·bundle hash 73·claims 12·master records 6·share pages 6·`teaser HOLD`·`smartStoreOnly=true`·`removed750=true`·`provenance=matched`를 유지했다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 확인되지 않았다. Chromium fallback은 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으므로 해당 외부 조건과 `USER_DECISION / NOT_READY`를 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-291`, `E-LOCAL-BUILD-RECOVERY-MAP-A11Y-20261008`, `E-UI-CONTRACT-RECOVERY-MAP-A11Y-20261008`, `E-PR-RECOVERY-MAP-A11Y-20261008`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-A11Y-20261008`, `E-LIVE-PUBLIC-RECOVERY-MAP-A11Y-20261008`, `E-NAVI-STATE-RECOVERY-MAP-A11Y-20261008`.

## 좁은 모바일 헤더 flex 겹침 보정 — 3d75b4e4 — 2026-10-08

- AC-001 공개 배포: PASS. PR #666 병합 후 main merge SHA `3d75b4e45637db316c07ae94b5f1a26d0a5c4301`의 workflow `37734617884`에서 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 deploy-worker는 `STATIC_ONLY`로 skipped됐다.
- AC-003/AC-004 모바일 품질: PASS. 381–430px 헤더의 로고 flex item에 `flex:0 1 auto`를 적용해 절대 위치 컨트롤 rail로의 확장을 차단했다. 로컬·공개 Chromium Playwright 280·320·390·430px에서 로고와 메뉴·글자 크기·공유 컨트롤 `overlap=false`, pageWidth/scrollWidth가 viewport와 일치했다.
- AC-005 자동 게이트: PASS. 로컬 `pnpm run build`, `pnpm run typecheck`, `pnpm test` 127 pass, UI contract, 정적 bundle, release manifest와 성능 예산이 통과했다. 공개 validator는 candidate `3d75b4e45637db316c07ae94b5f1a26d0a5c4301`, HTTP 200, STATIC, bundle hash 73개, claims 12개, master records 6개, share pages 6개, `teaser HOLD`, `smartStoreOnly=true`, `removed750=true`, `provenance=matched`를 확인했다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 좁은 모바일 헤더 레이아웃과 UI contract에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없다. Chromium fallback은 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수를 대신하지 않으므로 해당 조건은 계속 외부 검증으로 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-292`, `E-LOCAL-BUILD-NARROW-HEADER-FLEX-20261008`, `E-UI-CONTRACT-NARROW-HEADER-FLEX-20261008`, `E-PR-NARROW-HEADER-FLEX-20261008`, `E-DEPLOY-PIPELINE-NARROW-HEADER-FLEX-20261008`, `E-LIVE-PUBLIC-NARROW-HEADER-FLEX-20261008`, `E-NAVI-STATE-NARROW-HEADER-FLEX-20261008`.

## Audit recheck — 공유 내용 미리보기 — c4671fde — 2026-10-09

- 사업자가 공유 전에 실제 선택 문장과 출처명을 확인할 수 있도록 `공유 내용 미리보기`를 접이식 블록으로 추가했다. 기본 상태는 접힘이며 목적별 빠른 선택 변경 시 현재 선택 자료로 갱신된다.
- 로컬 UI contract·typecheck·127개 테스트·GitHub Pages base-path 정적 빌드·성능 예산이 통과했다. PR #724와 main workflow `37844326162`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 Worker는 `STATIC_ONLY`로 skipped됐다.
- 공개 Chrome CDP fallback 390px에서 미리보기 기본 접힘·실제 문장·`Yoto et al. 2012 · PMID 22203366`, `Byun et al. 2018 · PMID 29856155` 출처명·선택 변경·가로폭 390을 확인했다. 공개 validator도 최신 candidate와 정합성을 확인했다.
- 신규 CRITICAL/MAJOR 결함은 없다. 기존 전체 자료·개별 복사·출처 링크·제품 독립 경계는 유지한다. Browser plugin 부재·Safari/iOS/Android 실기기·실제 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 남기며 `USER_DECISION / NOT_READY`를 유지한다.

증적: `C-318`, `E-LOCAL-BUILD-SHARE-CONTENT-PREVIEW-20261009`, `E-UI-CONTRACT-SHARE-CONTENT-PREVIEW-20261009`, `E-PR-SHARE-CONTENT-PREVIEW-20261009`, `E-DEPLOY-SHARE-CONTENT-PREVIEW-20261009`, `E-CDP-LIVE-SHARE-CONTENT-PREVIEW-20261009`, `E-LIVE-PUBLIC-SHARE-CONTENT-PREVIEW-20261009`, `E-NAVI-STATE-SHARE-CONTENT-PREVIEW-20261009`.

## 모바일 연구 지도 범위 라벨 보정 — 77d14844 — 2026-10-08

- AC-003/AC-004 모바일 가독성: PASS. 390px에서 연구 지도 범위 라벨이 어절 단위로 끊겨 보이던 리스크를 확인하고 표시 라벨을 한 줄의 `사람 연구`·`동물·세포`로 정리했다. 상세 연구 범위는 버튼 `aria-label`에 그대로 보존했다.
- 자동 게이트: PASS. 로컬 UI contract·typecheck·production build·정적 bundle·성능 예산과 `pnpm test` 127 pass / 0 fail이 통과했다. 390px 로컬·공개 렌더에서 라벨 높이 15px, `pageWidth=scrollWidth=390`, runtime error 0을 확인했고, 지도 선택은 `research-skin` 카드로 연결됐다.
- AC-001 공개 정합성: PASS. PR #668의 main merge SHA `77d14844c112c3ab246b36f4afb6b621c6aae501`과 workflow `37736676442`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했으며 deploy-worker는 `STATIC_ONLY`로 skipped됐다. 공개 validator는 HTTP 200·STATIC·bundle hash 73개·claims 12개·master records 6개·share pages 6개·`teaser HOLD`·`smartStoreOnly=true`·`removed750=true`·`provenance=matched`를 확인했다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 표시 라벨·접근성 이름·UI contract에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 신규 CRITICAL/MAJOR 결함은 없다. Browser plugin 부재에 따른 Chrome Playwright fallback, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증 조건으로 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-293`, `E-LOCAL-BUILD-RESEARCH-MAP-LABELS-20261008`, `E-UI-CONTRACT-RESEARCH-MAP-LABELS-20261008`, `E-PR-RESEARCH-MAP-LABELS-20261008`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-LABELS-20261008`, `E-LIVE-PUBLIC-RESEARCH-MAP-LABELS-20261008`, `E-NAVI-STATE-RESEARCH-MAP-LABELS-20261008`.
