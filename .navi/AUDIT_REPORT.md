# Audit Report

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
