# Completion Report

## Current Public Recheck — main 1334348 — 2026-10-07

- AC-001/AC-004/AC-005: PASS. 최신 main 기준 로컬 품질 게이트와 Pages-style 정적 bundle이 통과했고, 공개 validator가 HTTP 200·candidate SHA 일치·bundle hash 73개·공개 데이터 정합성을 확인했다.
- AC-003: PASS_WITH_CONDITIONS. 공개 Playwright Chromium fallback 390px·1440px에서 히어로·연구 지도·피부 주제 선택·전문가 영상 선택·마지막 공유 장을 재현했고 가로 넘침·page error·console error가 없었다. Browser 플러그인은 unavailable 상태라 fallback을 사용했다.
- AC-006/AC-007: PASS_WITH_CONDITIONS. 제품 독립 경계와 teaser `HOLD`는 유지된다. Worker 운영 비밀값, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-NAVI-PUBLIC-RECHECK-20261007`, `E-PLAYWRIGHT-PUBLIC-NAVI-RECHECK-20261007`, `E-LIVE-PUBLIC-NAVI-RECHECK-20261007`.

## Current Release Recheck — research cue scope line deployed — main af936c7 — 2026-10-07

- AC-001/AC-004/AC-005: PASS. PR #551 검사와 main workflow `37560044899`의 release-verify·Pages·라이브 smoke·release-status가 성공했고 공개 URL은 HTTP 200이다. 공개 validator는 candidate `af936c72c3b6140488b27d6a390809201ec99d25`와 73개 bundle hash를 확인했다.
- AC-003: PASS_WITH_CONDITIONS. 공개 연구 지도 아래 대표 결과와 대상·연구 범위 라인이 연결되고, 라이브 390px·1440px에서 연구 카드로 이어지는 흐름과 피부 주제 선택 갱신이 확인됐다.
- AC-006/AC-007: PASS_WITH_CONDITIONS. teaser `HOLD`, 공개 연구 데이터 경계, 제품 독립 경계는 유지됐다. 실기기·실제 고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-DEPLOY-PIPELINE-RESEARCH-CUE-SCOPE-20261008`, `E-LIVE-PUBLIC-RESEARCH-CUE-SCOPE-20261008`.

## Current Work Recheck — research cue scope line — working tree — 2026-10-07

- AC-003/AC-004: PASS_WITH_CONDITIONS. 연구 지도 아래 대표 결과에 기존 연구 카드의 대상·연구 범위 라인을 추가해 `결과 → 대상` 연결을 보강했다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-005: PASS. UI contract·typecheck·127개 테스트·Pages-style production build·정적 bundle·release manifest·성능 예산·Playwright Chromium fallback 390px·1440px 상호작용 감리를 통과했다. 초기 JS 311,269 bytes·CSS 95,703 bytes·총 자산 1,647,487 bytes다.
- 공개 main 배포·라이브 URL은 아직 이 작업 기록으로 검증하지 않았다. 새 CRITICAL/MAJOR 결함은 없으며, Safari/iOS/Android 실기기·실제 고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다. Final Status는 `NOT_READY`, NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-RESEARCH-CUE-SCOPE-20261008`, `E-UI-CONTRACT-RESEARCH-CUE-SCOPE-20261008`, `E-PLAYWRIGHT-RESEARCH-CUE-SCOPE-20261008`, `E-STATIC-BUNDLE-RESEARCH-CUE-SCOPE-20261008`.

## Current Release Recheck — research result cue hierarchy deployed — main e997683 — 2026-10-07

- AC-001/AC-004/AC-005: PASS. PR #549 검사와 main workflow `37557233295`의 release-verify·Pages·라이브 smoke·release-status가 성공했고 공개 URL은 HTTP 200이다. 공개 validator는 candidate `e99768344c18286b8edf8d46e4c6a08f9a6b3f42`와 73개 bundle hash를 확인했다.
- AC-003: PASS_WITH_CONDITIONS. 공개 CSS에 대표 결과와 실제 관찰 결과의 두 줄 계층이 반영되고, 공개 JS에 연구 읽기 레일·대표 결과 문구가 유지된다. 라이브 390px·1440px 렌더에서 가로 넘침과 실행 오류가 없다.
- AC-006/AC-007: PASS_WITH_CONDITIONS. teaser `HOLD`, 공개 연구 데이터 경계, 제품 독립 경계는 유지됐다. 실기기·실제 고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-DEPLOY-PIPELINE-RESEARCH-CUE-HIERARCHY-20261008`, `E-LIVE-PUBLIC-RESEARCH-CUE-HIERARCHY-20261008`.

## Current Work Recheck — research result cue hierarchy — working tree — 2026-10-07

- AC-003/AC-004: PASS_WITH_CONDITIONS. 06장 연구 지도 아래 전환 밴드에서 `대표 결과부터 읽기`와 실제 관찰 결과를 별도 줄로 보여 주어 모바일·데스크톱의 연구 읽기 흐름을 보정했다. 새 연구 주장·수치·출처·제품 광고는 추가하지 않았다.
- AC-005: PASS. UI contract·typecheck·127개 테스트·Pages-style production build·정적 bundle·release manifest·성능 예산·Playwright Chromium fallback을 통과했다. 초기 JS 311,199 bytes·CSS 95,703 bytes·총 자산 1,649,473 bytes다.
- 공개 main 배포·라이브 URL·공개 신규 캡처는 아직 이 작업 기록으로 검증하지 않았다. 연구 카피·수치·출처·제품 독립 경계는 유지했고 새 CRITICAL/MAJOR 결함은 없다. Final Status는 `NOT_READY`, NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-RESEARCH-CUE-HIERARCHY-20261008`, `E-UI-CONTRACT-RESEARCH-CUE-HIERARCHY-20261008`, `E-PLAYWRIGHT-RESEARCH-CUE-HIERARCHY-20261008`, `E-STATIC-BUNDLE-RESEARCH-CUE-HIERARCHY-20261008`.

## Current Release Recheck — research result transition band deployed — main 8538063 — 2026-10-07

- AC-001/AC-004/AC-005: PASS. PR #546 병합 후 main workflow `37555128673`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 공개 URL은 HTTP 200이다. 공개 validator는 candidate `8538063bd2cfd6b15eb8cf67f2c6944e87e4891b`·bundle hash 73개·제품 독립 경계를 확인했다.
- AC-003: PASS_WITH_CONDITIONS. 공개 CSS에서 연구 결과 전환 밴드가 반영되고, 공개 JS에서 `대표 결과부터 읽기`와 연구 읽기 레일을 확인했다. 기존 연구 카드 흐름과 별도 링크 없는 읽기 순서는 유지된다.
- AC-006/AC-007: PASS_WITH_CONDITIONS. teaser `HOLD`, 공개 연구 데이터 경계, 제품 독립 경계는 유지됐다. 신규 브라우저 시각 캡처·Safari/iOS/Android 실기기·실제 고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-DEPLOY-PIPELINE-RESEARCH-CUE-BAND-20261008`, `E-LIVE-PUBLIC-RESEARCH-CUE-BAND-20261008`.

## Current Work Recheck — research result transition band — working tree — 2026-10-07

- AC-003/AC-004: PASS_WITH_CONDITIONS. 06장 연구 지도와 대표 결과 사이의 기존 전환 영역을 연한 증거 밴드로 보정해 모바일·데스크톱에서 다음 연구 카드로 이어지는 흐름을 구분했다. 별도 링크 이동·새 연구 주장·새 데이터는 추가하지 않았다.
- AC-005: PASS. UI contract·typecheck·127개 테스트·Pages-style production build·정적 bundle·release manifest·성능 예산이 통과했다. 초기 JS 311,199 bytes·CSS 95,703 bytes·총 자산 1,649,433 bytes다.
- 공개 main 배포·라이브 URL·신규 브라우저 시각 캡처는 아직 이 작업 기록으로 검증하지 않았다. 연구 카피·수치·출처·제품 독립 경계는 유지했고 새 CRITICAL/MAJOR 결함은 없다. Final Status는 `NOT_READY`, NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-RESEARCH-CUE-BAND-20261008`, `E-UI-CONTRACT-RESEARCH-CUE-BAND-20261008`, `E-STATIC-BUNDLE-RESEARCH-CUE-BAND-20261008`.

## Current Release Recheck — research representative result preview deployed — main 5238808 — 2026-10-07

- AC-001/AC-004/AC-005: PASS. PR #544 병합 후 main workflow `37553497930`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 공개 URL은 HTTP 200이다. 공개 validator는 candidate `523880887ece2a91916d66db57c8265de702cd0a`·bundle hash 73개·제품 독립 경계를 확인했다.
- AC-003: PASS_WITH_CONDITIONS. 공개 번들에서 `대표 결과부터 읽기`와 연구 읽기 레일을 확인했다. 연구 지도 아래 대표 결과가 바로 이어지는 연구 카드 흐름으로 연결된다.
- AC-006/AC-007: PASS_WITH_CONDITIONS. teaser `HOLD`, 공개 연구 데이터 경계, 제품 독립 경계는 유지됐다. 신규 브라우저 시각 캡처·Safari/iOS/Android 실기기·실제 고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-DEPLOY-PIPELINE-RESEARCH-PREVIEW-20261008`, `E-LIVE-PUBLIC-RESEARCH-PREVIEW-20261008`.

## Current Work Recheck — research representative result preview — working tree — 2026-10-07

- AC-003/AC-004: PASS_WITH_CONDITIONS. 06장 연구 지도 아래의 기존 전환 영역에 대표 결과 요약을 넣어 모바일에서 결과를 먼저 읽고 바로 이어지는 연구 카드 흐름을 만들었다. 별도 링크 이동은 추가하지 않았다.
- AC-005: PASS. UI contract·typecheck·127개 테스트·Pages-style production build·정적 bundle·release manifest·성능 예산이 통과했다. 초기 JS 311,269 bytes·CSS 95,703 bytes·총 자산 1,649,610 bytes다.
- 공개 main 배포·라이브 URL·신규 브라우저 시각 캡처는 아직 이 작업 기록으로 검증하지 않았다. 연구 카피·수치·출처·제품 독립 경계는 유지했고 새 CRITICAL/MAJOR 결함은 없다. Final Status는 `NOT_READY`, NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-RESEARCH-PREVIEW-20261008`, `E-UI-CONTRACT-RESEARCH-PREVIEW-20261008`, `E-STATIC-BUNDLE-RESEARCH-PREVIEW-20261008`.

## Current Release Recheck — share API recovery deployed — main 93fa62f — 2026-10-07

- AC-001/AC-005: PASS. PR #541 병합 후 main workflow `37549529638`의 release-verify·Pages·라이브 smoke·release-status가 성공했고 공개 validator는 HTTP 200·candidate `93fa62f101259bcfeb2b7947431337b482114dbf`·73개 bundle hash를 확인했다. 첫 후보의 86 bytes 예산 초과는 재작업 후 해소됐다.
- AC-003/AC-006: PASS_WITH_CONDITIONS. 공개 번들에 공유 API `AbortError` 분기와 링크 복사 fallback이 반영되고, claims 12·master records 6·share pages 6·teaser `HOLD`·제품 독립 경계가 유지됐다.
- 실제 Web Share 지원 브라우저·모바일 실기기와 고령 사용자 이해도·독립 과학·규제 감수는 완료로 표시하지 않는다. Final Status는 `NOT_READY`, NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-PAGES-SHARE-RECOVERY-20261007`, `E-DEPLOY-PIPELINE-SHARE-RECOVERY-20261007`, `E-LIVE-PUBLIC-SHARE-RECOVERY-20261007`.

## Current Work Recheck — share API recovery — working tree — 2026-10-07

- AC-003/AC-006: PASS_WITH_CONDITIONS. 공개 안내서 공유 흐름은 선택한 장·연구·영상 URL을 유지하면서 사용자 취소와 회복 가능한 Web Share 실패를 구분하고, 후자의 경우 링크 복사를 시도한다.
- AC-005: PASS. UI contract·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 초기 JS 311,199 bytes·CSS 95,703 bytes·총 자산 1,649,565 bytes다.
- 공개 main 배포 후 실제 Web Share 지원 브라우저·모바일 실기기 확인이 남아 있으므로 Final Status는 `NOT_READY`, NAVI 상태는 `USER_DECISION`이다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.

증적: `E-LOCAL-BUILD-SHARE-RECOVERY-20261007`, `E-UI-CONTRACT-SHARE-RECOVERY-20261007`.

## Current Release Recheck — public surface audit — main 1083e3f — 2026-10-07

- AC-001/AC-004: PASS. 라이브 validator는 HTTP 200·candidate `1083e3f6b0669d1770e8db6bbff4ffc7425ac38b`·73개 bundle hash·제품 독립 경계를 확인했다. 320·390·768·1440px에서 document width가 viewport와 같고, 390px 메뉴 상호작용과 전문가 영상 해시 진입 정렬이 정상이다.
- AC-005: PASS. UI contract·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했다. 초기 JS 311,199 bytes, CSS 95,703 bytes, 총 자산 1,649,478 bytes다.
- AC-006/AC-007: PASS_WITH_CONDITIONS. 제품 독립 공개 경계·연구 출처·영상 접근성 이름은 유지됐고 새 CRITICAL/MAJOR 결함은 없다. Safari/iOS/Android 실기기·실제 고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-PUBLIC-SURFACE-AUDIT-20261007`, `E-ACCESSIBILITY-PUBLIC-SURFACE-AUDIT-20261007`, `E-DEEPLINK-PUBLIC-SURFACE-AUDIT-20261007`, `E-LIVE-PUBLIC-SURFACE-AUDIT-20261007`.

## Current Release Recheck — print/PDF publishing deployed — main ab096d1 — 2026-10-07

- AC-001/AC-003/AC-004: PASS. PR #527 병합 후 main workflow `37532761509`의 release-verify·worker-readiness·deploy-pages·smoke-live·release-status가 성공했고 공개 URL은 HTTP 200이다. 원격 390·1440px print media에서 `print.css`가 적용되어 화면 전용 크롬이 숨겨지고 본문 13개 섹션이 유지된다.
- AC-005: PASS. UI contract·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했고 공개 번들은 73개 hash로 검증됐다. 로컬 총 자산은 1,649,478 bytes다.
- AC-006/AC-007: PASS_WITH_CONDITIONS. 연구 출처 URL·제품 독립 경계·teaser `HOLD`를 유지했다. 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-PRINT-PUBLISHING-20261007`, `E-UI-CONTRACT-PRINT-PUBLISHING-20261007`, `E-CDP-PRINT-PUBLISHING-20261007`, `E-DEPLOY-PIPELINE-PRINT-PUBLISHING-20261007`, `E-LIVE-PUBLIC-PRINT-PUBLISHING-20261007`.

## Current Release Recheck — print/PDF publishing — 2026-10-07

- AC-003/AC-004: PASS. 공개 안내서 인쇄 미디어에서 A4 여백과 본문 흐름을 적용하고 화면 전용 헤더·진행바·영상 보드·복구 조작부를 숨겼다. 로컬 production preview 390·1440px에서 document width가 viewport와 같고 본문 섹션 13개가 렌더된다.
- AC-005: PASS. UI contract·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했고 총 자산은 1,649,991 bytes다.
- AC-006/AC-007: PASS_WITH_CONDITIONS. 연구 출처 URL을 인쇄본에 보존하고 제품 독립 경계를 유지했다. PR·main 공개 배포·라이브 URL 재검증 및 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-PRINT-PUBLISHING-20261007`, `E-UI-CONTRACT-PRINT-PUBLISHING-20261007`, `E-CDP-PRINT-PUBLISHING-20261007`, `E-DEPLOY-PIPELINE-PRINT-PUBLISHING-20261007`, `E-LIVE-PUBLIC-PRINT-PUBLISHING-20261007`.

## Current Release Recheck — large-text audit — 2026-10-07

- AC-001/AC-004: PASS. 공개 GitHub Pages는 HTTP 200이며 큰 글자 모드에서 320·390·768px document width가 각 viewport와 일치한다. 회복 14단계, 연구 지도, 전문가 영상, 마지막 공유 화면의 보이는 본문은 잘리지 않았다.
- AC-005: PASS. UI contract·typecheck·127개 테스트·production build·정적 번들·성능 예산이 통과했고 초기 JS 311,199 bytes, CSS 95,703 bytes, 총 자산 1,649,381 bytes다. 이번 재점검은 가시적 코드 결함이 없어 소스 UI를 변경하지 않았다.
- AC-006/AC-007: PASS_WITH_CONDITIONS. 제품 독립 공개 경계와 연구 출처 흐름은 유지됐다. 장식용 내부 overflow와 스크린리더 전용 텍스트는 시각 본문 잘림과 구분했으며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-LARGE-TEXT-AUDIT-20261007`, `E-UI-CONTRACT-LARGE-TEXT-AUDIT-20261007`, `E-CDP-LARGE-TEXT-AUDIT-20261007`, `E-LIVE-PUBLIC-LARGE-TEXT-AUDIT-20261007`.

## Current Release Recheck — b028897 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. main workflow `37526178585`의 release-verify·Pages·라이브 smoke·release-status가 성공했고 공개 URL은 HTTP 200으로 확인됐다.
- AC-003/AC-004 전문가 영상 필터·반응형: PASS. 공개 390px·1440px에서 `전체 9편`·`수면 4편` 등 영상 단위 카운트가 보이고, 필터 선택 후 feature focus와 YouTube iframe 즉시 재생·가로폭 안정성을 확인했다.
- AC-005 배포 게이트: PASS. UI contract·typecheck·127개 테스트·production build·성능 예산, PR #524 필수 검사와 main 공개 배포 파이프라인이 성공했다. 초기 JS 311,199 bytes, CSS 95,703 bytes, 총 자산 1,649,381 bytes가 예산 안에 있다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 연구 카피·수치·출처·공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-VIDEO-FILTER-COUNT-20261007`, `E-UI-CONTRACT-VIDEO-FILTER-COUNT-20261007`, `E-CDP-VIDEO-FILTER-COUNT-20261007`, `E-DEPLOY-PIPELINE-VIDEO-FILTER-COUNT-20261007`, `E-LIVE-PUBLIC-VIDEO-FILTER-COUNT-20261007`.

## Current Release Recheck — 9731c29 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. main workflow `37523587127`의 release-verify·Pages·라이브 smoke·release-status가 성공했고 공개 URL은 HTTP 200으로 확인됐다.
- AC-004 모바일 반응형·읽기 흐름: PASS. 공개 390px에서 회복 브리지 제목 top 270, document width 390, 읽기 레일 top 70·height 35를 확인했고 14단계 흐름과 회복 일러스트가 이어졌다. 1440px 히어로·연구 지도 렌더도 확인했다.
- AC-005 배포 게이트: PASS. UI contract·Pages 동등 정적 번들·성능 예산이 통과했고 총 자산은 1,649,961 bytes다. PR #522 release-verify·site-quality-verify와 main 배포 파이프라인의 필수 검사가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 연구 카피·수치·출처·공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-RECOVERY-BRIDGE-RHYTHM-20261007`, `E-UI-CONTRACT-RECOVERY-BRIDGE-RHYTHM-20261007`, `E-CDP-RECOVERY-BRIDGE-RHYTHM-20261007`, `E-DEPLOY-PIPELINE-RECOVERY-BRIDGE-RHYTHM-20261007`, `E-LIVE-PUBLIC-RECOVERY-BRIDGE-RHYTHM-20261007`.

## Current Release Recheck — ad52246 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. main workflow `37519850528`의 release-verify·Pages·라이브 smoke·release-status가 성공했고 공개 URL은 HTTP 200으로 확인됐다.
- AC-003/AC-004 초협폭 연구 결과 도표·반응형: PASS. 280·320px에서는 조건 카드를 세로로 쌓아 결과 문구가 카드 폭 전체에 표시되고, 390px에서는 기존 비교 구조를 유지했다. 세 폭 모두 document width가 viewport와 같고 phrase/lane DOM overflow가 false다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #520의 최종 필수 검사, main 공개 배포 파이프라인이 성공했다. 로컬 초기 JS 311,199 bytes, CSS 95,703 bytes, 총 자산 1,649,463 bytes가 예산 안에 있다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 연구 카피·수치·출처·공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-ULTRA-NARROW-CHART-20261007`, `E-UI-CONTRACT-ULTRA-NARROW-CHART-20261007`, `E-CDP-ULTRA-NARROW-CHART-20261007`, `E-DEPLOY-PIPELINE-ULTRA-NARROW-CHART-20261007`, `E-LIVE-PUBLIC-ULTRA-NARROW-CHART-20261007`.

## Current Release Recheck — 075b919 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. main workflow `37517088317`의 release-verify·Pages·라이브 smoke·release-status가 성공했고 공개 URL은 HTTP 200으로 확인됐다.
- AC-003/AC-004 섹션 직접 진입·반응형: PASS. 390px에서 앵커 여백 116px, 768·1440px에서 126px을 적용해 연구 지도 제목이 고정 헤더·읽기 진행바에 가리지 않으며, 세 폭 모두 document width가 viewport 안에 머문다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산 및 PR #518의 release-verify·site-quality 검사가 성공했다. 로컬 전체 자산은 1,649,067 bytes로 예산 안에 있다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 연구 카피·수치·출처·공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-ANCHOR-READABILITY-20261007`, `E-UI-CONTRACT-ANCHOR-READABILITY-20261007`, `E-CDP-ANCHOR-READABILITY-20261007`, `E-DEPLOY-PIPELINE-ANCHOR-READABILITY-20261007`, `E-LIVE-PUBLIC-ANCHOR-READABILITY-20261007`.

## Current Release Recheck — 443e85b — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. main workflow `37514564656`의 release-verify·Pages·라이브 smoke·release-status가 성공했고 공개 URL은 HTTP 200으로 확인됐다.
- AC-003/AC-004 연구 결과 도표·반응형: PASS. 390px에서 조건 카드 내부의 결과 문구와 변화 방향 표시가 분리되고, 768·1440px에서는 두 조건 비교 구조가 유지되며 document width가 각각 375·753·1425px 안에 머문다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산 및 PR #516의 release-verify·site-quality 검사가 성공했다. 로컬 전체 자산은 1,648,894 bytes로 예산 안에 있다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 연구 카피·수치·출처·공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-MOBILE-CHART-LANE-20261007`, `E-UI-CONTRACT-MOBILE-CHART-LANE-20261007`, `E-CDP-MOBILE-CHART-LANE-20261007`, `E-DEPLOY-PIPELINE-MOBILE-CHART-LANE-20261007`, `E-LIVE-PUBLIC-MOBILE-CHART-LANE-20261007`.

## Current Release Recheck — f785d7d — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `f785d7dc11be2c806d17ec757d5416ddeda0c9d5`·HTTP 200·STATIC·72개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-003/AC-004 수면·회복 도입 흐름·반응형: PASS. 280px·390px·1440px에서 낮·활동→밤·수면→다음 날·회복 인포그래픽과 기존 3개 카드가 연결되고 공개 CDP runtime/console/http errors 0이다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build와 PR #480·main workflow의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 초기 JS 311,199 bytes, CSS 95,703 bytes, 총 자산 1,649,422 bytes가 예산 안에 있다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 수면 카피·출처·공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-OPENING-RHYTHM-VISUAL-20261006`, `E-UI-CONTRACT-OPENING-RHYTHM-VISUAL-20261006`, `E-CDP-OPENING-RHYTHM-VISUAL-20261006`, `E-DEPLOY-PIPELINE-OPENING-RHYTHM-VISUAL-20261006`, `E-LIVE-PUBLIC-OPENING-RHYTHM-VISUAL-20261006`.

## Current Release Recheck — 813fd3a — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `813fd3a864e788548110863741a14ec018295d7e`·HTTP 200·STATIC·72개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-003/AC-004 연구 지도 시각 흐름·반응형: PASS. 전용 자연 편집 비주얼이 390px에서 350×210px, 1440px에서 1180×270px로 표시되고 5개 학술 카드가 이어지며 page/console errors 0이다.
- AC-005 배포 게이트: PASS. UI 계약·research copy·typecheck·127개 테스트·production build와 PR #478·main workflow의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 초기 JS 311,199 bytes, CSS 95,703 bytes, 총 자산 1,647,201 bytes가 예산 안에 있다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 연구 카피·수치·출처·공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-UI-CONTRACT-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-CDP-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-DEPLOY-PIPELINE-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-LIVE-PUBLIC-ACADEMIC-EDITORIAL-VISUAL-20261006`.

## Current Release Recheck — 9e7b9321 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `9e7b93210afe85fc39616ed6575887692dd95254`·HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-003/AC-004 수면 도표 읽기 흐름·반응형: PASS. 제목이 `수면 연구, 두 조건은 어떻게 달랐을까요?`, 보조 라벨이 `두 조건 비교`, 첫 열이 `측정 항목`으로 390·1440px 공개 화면에 표시되고 가로폭과 런타임 오류 없이 렌더링됐다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build와 main workflow의 release-verify·Pages·라이브 smoke·release-status 및 site-quality 검사가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 공개 데이터 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-SLEEP-COPY-20261006`, `E-UI-CONTRACT-SLEEP-COPY-20261006`, `E-PLAYWRIGHT-SLEEP-COPY-20261006`, `E-DEPLOY-PIPELINE-SLEEP-COPY-20261006`, `E-LIVE-PUBLIC-SLEEP-COPY-20261006`.

## Current Release Recheck — e0bfacdf — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `e0bfacdfaee78eea287e32bef32e968995a87423`·HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-003/AC-004 연구 도표 축 의미·반응형 흐름: PASS. 비교 도표의 첫 열이 `측정 항목`으로 표시되고 좌우 비교 아이콘이 390·1440px 공개 화면에서 보이며, 가로폭과 런타임 오류 없이 렌더링됐다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build와 main workflow의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 공개 데이터 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-CHART-AXIS-20261006`, `E-UI-CONTRACT-CHART-AXIS-20261006`, `E-PLAYWRIGHT-CHART-AXIS-20261006`, `E-DEPLOY-PIPELINE-CHART-AXIS-20261006`, `E-LIVE-PUBLIC-CHART-AXIS-20261006`.

## Current Release Recheck — a3ccd609 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `a3ccd6091146f0a9a76e60597e1b39b9211f2ddd`·HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-002/AC-004 연구 도표 읽기 흐름: PASS. 비교 도표가 변화 방향·상대적 차이·실제 측정값이 아닌 도식이라는 구분을 390·1440px 공개 화면에서 명확히 표시하며 가로폭과 런타임 오류 없이 렌더링됐다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build와 main workflow의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 공개 데이터 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-CHART-SEMANTICS-20261006`, `E-UI-CONTRACT-CHART-SEMANTICS-20261006`, `E-PLAYWRIGHT-CHART-SEMANTICS-20261006`, `E-DEPLOY-PIPELINE-CHART-SEMANTICS-20261006`, `E-LIVE-PUBLIC-CHART-SEMANTICS-20261006`.

## Current Release Recheck — 68e2c8b — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `68e2c8b5cbab13f4438c975b1ce118b2cec8308a`·HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-002/AC-004 모바일 독해 흐름: PASS. `GABA에서 읽습니다`가 280·320px에서는 자연스러운 두 줄, 390px에서는 한 줄, 1440px에서는 기존 데스크톱 구성을 유지하며 가로폭·오류 없는 렌더링을 통과했다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build와 main workflow의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 공개 데이터 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-HERO-LINE-20261006`, `E-UI-CONTRACT-HERO-LINE-20261006`, `E-PLAYWRIGHT-HERO-LINE-20261006`, `E-DEPLOY-PIPELINE-HERO-LINE-20261006`, `E-LIVE-PUBLIC-HERO-LINE-20261006`.

## Final Live Recheck — 449fb2d — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 최종 공개 validator가 candidate `449fb2d23285f1b971667aea698b80374e14d9e2`·HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-002/AC-003/AC-004 연구·도표·반응형 흐름: PASS. 기존 연구·출처·제품 독립 경계와 화면폭을 유지했고, 전문가 영상 선택 재생은 320·390·768·1440px에서 iframe·포커스·가로폭·오류 없는 렌더링을 통과했다.
- AC-005 배포 게이트: PASS. main workflow의 release-verify·Pages·라이브 smoke·release-status가 성공했다. Worker는 STATIC_ONLY 조건에 따라 배포하지 않았다.
- AC-006/AC-007 경계·감사: PASS_WITH_CONDITIONS. teaser `HOLD`와 내부 운영 데이터 제외를 유지하며 외부 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-DEPLOY-PIPELINE-FINAL-RECHECK-20261006`, `E-PLAYWRIGHT-VIDEO-FINAL-RECHECK-20261006`, `E-LIVE-PUBLIC-FINAL-RECHECK-20261006`.

## Current Release Recheck — 2515212 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `2515212345f30236f4f8603de8f27b7fbd932e5d`·71개 bundle hash·12개 claim·6개 master record·6개 share page를 확인했다.
- AC-002/AC-003/AC-004 연구 지도·연구 결과 도표·모바일 흐름: PASS. 기존 연구 결과·출처·제품 독립 경계와 반응형 폭을 유지한 채 자동 UI 계약 및 공개 데이터 검사를 통과했다.
- AC-005 자동 품질 기준: PASS. 목표·계획·외부 게이트·공개 데이터·거버넌스·운영 문서·typecheck·127개 테스트·production build가 통과했고 정적 성능 예산도 유지됐다.
- AC-006/AC-007 제품 독립 과학 정보 경계와 감사·레드팀 분리: PASS_WITH_CONDITIONS. teaser `HOLD`와 내부 운영 데이터 제외를 유지하며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남긴다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다. 외부 검증이 없다는 이유로 완료로 표시하지 않는다.

증적: `E-LOCAL-BUILD-PUBLIC-RECHECK-20261006`, `E-NAVI-GATES-PUBLIC-RECHECK-20261006`, `E-PLAYWRIGHT-VIDEO-RECHECK-20261006`, `E-DEPLOY-PIPELINE-PUBLIC-RECHECK-20261006`, `E-LIVE-PUBLIC-PUBLIC-RECHECK-20261006`.

## 공개 surface·초소형 모바일 재검증 — e2f9920 — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `e2f992033415efbcde7ae4b119ce44006e49651e`·71개 bundle hash·제품 독립 경계를 확인했다.
- AC-003/AC-004/AC-005 모바일 중심 읽기 경험: PASS_WITH_CONDITIONS. 280px에서 연구 지도·활성 카드·도표가 viewport 안에 배치되고, 390px·1440px에서 히어로·연구·전문가·공유 surface·5문장 복사 흐름·접근성 기본 계약·오류 0을 재현했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 결함은 없으며 Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남는다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-SURFACE-AUDIT-20261006`, `E-ACCESSIBILITY-PUBLIC-AUDIT-20261006`, `E-PLAYWRIGHT-NARROW-AUDIT-20261006`, `E-PLAYWRIGHT-SURFACE-AUDIT-20261006`, `E-LIVE-PUBLIC-RECHECK-20261006`.

## Current Release Recheck — 0e5c611 — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `0e5c611ae1b4c8ab0737c9e3bf5b51c4b08145b7`와 71개 bundle hash를 확인했다.
- AC-003/AC-004 연구 지도에서 선택한 주제의 현재 상태·연구 카드·출처 흐름과 보조기기 상태 전달: PASS. 로컬·공개 390px·1440px에서 `현재 선택 · 근육` 안내, `근육 연구 결과`, 출처, progress label, 포커스, viewport와 동일한 scrollWidth, page/console errors 0을 확인했다. UI 계약·typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-SELECTION-20261006`, `E-UI-CONTRACT-RESEARCH-SELECTION-20261006`, `E-PLAYWRIGHT-RESEARCH-SELECTION-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-SELECTION-20261006`, `E-LIVE-PUBLIC-RESEARCH-SELECTION-20261006`.

## Current Release Recheck — 009839b — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `009839b915b730f6c02e0a36ec307990ed6dd2fc`와 71개 bundle hash를 확인했다.
- AC-003/AC-005 연구 규모 도표 근거의 cross-width 읽기 체계: PASS. 로컬 320px·390px·1440px와 공개 390px·1440px에서 caption·검색 범위·출처 링크·feature metadata를 12px로 계산하고, 도표 폭·viewport와 동일한 scrollWidth·page errors·console errors 0을 확인했다. 연구 원문→이야기 공유 전환도 `#final`·`final-heading` 포커스로 재확인했다. UI 계약·typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-EVIDENCE-RHYTHM-20261006`, `E-UI-CONTRACT-RESEARCH-EVIDENCE-RHYTHM-20261006`, `E-PLAYWRIGHT-RESEARCH-EVIDENCE-RHYTHM-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-EVIDENCE-RHYTHM-20261006`, `E-LIVE-PUBLIC-RESEARCH-EVIDENCE-RHYTHM-20261006`.

## Current Release Recheck — b716f5d — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `b716f5d39e33e73e933b2b40228b0b021ff01763`와 71개 bundle hash를 확인했다.
- AC-004/AC-005 모바일 연구 규모 도표의 근거 텍스트 가독성: PASS. 320px·390px·1440px에서 모바일 12px 기준, 도표 폭, viewport와 동일한 scrollWidth, 공개 390px·1440px page errors·console errors 0을 확인했다. UI 계약·typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-EVIDENCE-FLOOR-20261006`, `E-UI-CONTRACT-RESEARCH-EVIDENCE-FLOOR-20261006`, `E-PLAYWRIGHT-RESEARCH-EVIDENCE-FLOOR-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-EVIDENCE-FLOOR-20261006`, `E-LIVE-PUBLIC-RESEARCH-EVIDENCE-FLOOR-20261006`.

## Current Release Recheck — 9f0ec68 — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `9f0ec68c8acc8c5ee6246cb0e262a95db5e68d3b`와 71개 bundle hash를 확인했다.
- AC-004/AC-005 연구 원문 읽기에서 이야기 공유로 이어지는 전환 띠의 데스크톱 전체폭 정렬: PASS. 공개 390px·1440px에서 버튼 내부 정렬·가로폭·클릭 후 `#final`·`final-heading` 포커스·page errors·console errors 0을 확인했다. UI 계약·typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-READING-GRID-20261006`, `E-UI-CONTRACT-READING-GRID-20261006`, `E-PLAYWRIGHT-READING-GRID-20261006`, `E-DEPLOY-PIPELINE-READING-GRID-20261006`, `E-LIVE-PUBLIC-READING-GRID-20261006`.

## Current Release Recheck — 84fd53b — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `84fd53bfc9d4c02673f4797839ad79d7ad7c52b3`와 71개 bundle hash를 확인했다.
- AC-004/AC-005 연구 원문 읽기에서 이야기 공유로 이어지는 내부 전환: PASS. 공개 390px·1440px에서 카드 표시와 클릭 후 `#final`·`final-heading` 포커스·가로폭·page errors·console errors 0을 확인했다. UI 계약·typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-READING-HANDOFF-20261006`, `E-UI-CONTRACT-READING-HANDOFF-20261006`, `E-PLAYWRIGHT-READING-HANDOFF-20261006`, `E-DEPLOY-PIPELINE-READING-HANDOFF-20261006`, `E-LIVE-PUBLIC-READING-HANDOFF-20261006`.

## Current Release Recheck — 658eb99 — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `658eb99672fcf8031d7c82b606a4aa0a5eb28a31`와 71개 bundle hash를 확인했다.
- AC-004/AC-005 수면·회복 도입부의 내부 전환 카드: PASS. 390px·1440px 공개 화면에서 `회복의 균형에서 GABA의 발견으로`를 표시하고, 클릭 후 `#history`·`history-heading` 포커스·가로폭·page errors·console errors 0을 확인했다. UI 계약·typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-OPENING-HANDOFF-20261006`, `E-UI-CONTRACT-OPENING-HANDOFF-20261006`, `E-PLAYWRIGHT-OPENING-HANDOFF-20261006`, `E-DEPLOY-PIPELINE-OPENING-HANDOFF-20261006`, `E-LIVE-PUBLIC-OPENING-HANDOFF-20261006`.

## Current Release Recheck — 0880c55 — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `0880c55b1de66bffeeb0d9d86fd97f51ed660d23`와 71개 bundle hash를 확인했다.
- AC-002/AC-003 수면·회복 카드의 자동 진행 상태·수동 일시정지·보조공학 상태 전달: PASS. 공개 320px·390px·1440px에서 `자동 진행 · 3초마다` → `일시정지` 전환, `aria-live="polite"`·`aria-atomic="true"`, 제목, 14단계 경로, viewport와 동일한 scrollWidth, page errors·console errors 0을 확인했다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. workflow `37390751297`의 Pages·라이브 smoke·release-status와 site-quality `37390559874`도 성공했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-RECOVERY-STATUS-A11Y-20261006`, `E-UI-CONTRACT-RECOVERY-STATUS-A11Y-20261006`, `E-PLAYWRIGHT-RECOVERY-STATUS-A11Y-20261006`, `E-DEPLOY-PIPELINE-RECOVERY-STATUS-A11Y-20261006`, `E-LIVE-PUBLIC-RECOVERY-STATUS-A11Y-20261006`.

## Current Release Recheck — befeea5 — 2026-10-07

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `befeea5590f11218ab7b9932a4dde06004bc8f57`와 71개 bundle hash를 확인했다.
- AC-002/AC-003 수면·회복 카드의 자동 진행 상태·수동 일시정지·모션 감소 상태: PASS. 공개 320px·390px·1440px에서 `자동 진행 · 3초마다` → `일시정지` 전환, 14단계 경로, 제목, viewport와 동일한 scrollWidth, page errors·console errors 0을 확인했다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. workflow `37388830638`의 Pages·라이브 smoke·release-status와 site-quality `37388682654`도 성공했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-RECOVERY-AUTOPLAY-LABEL-20261007`, `E-UI-CONTRACT-RECOVERY-AUTOPLAY-LABEL-20261007`, `E-PLAYWRIGHT-RECOVERY-AUTOPLAY-LABEL-20261007`, `E-DEPLOY-PIPELINE-RECOVERY-AUTOPLAY-LABEL-20261007`, `E-LIVE-PUBLIC-RECOVERY-AUTOPLAY-LABEL-20261007`.

## Current Release Recheck — 28ff210 — 2026-10-07

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `28ff210aedeb2c0e26f138a8541806622e241764`와 71개 bundle hash를 확인했다.
- AC-003/AC-004 전문가 영상 feature 메타·카드 badge·선택 lifecycle: PASS. 공개 390px·1440px에서 초기 `선택하면 바로 재생`, 두 번째 영상 선택 후 `준비 중`을 거쳐 `재생 중`으로 갱신되고 카드 badge·iframe·가로폭·page errors·console errors 0을 확인했다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. workflow `37385885986`의 Pages·라이브 smoke·release-status와 site-quality `37385689961`도 성공했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-VIDEO-FEATURE-STATE-20261007`, `E-UI-CONTRACT-VIDEO-FEATURE-STATE-20261007`, `E-PLAYWRIGHT-VIDEO-FEATURE-STATE-20261007`, `E-DEPLOY-PIPELINE-VIDEO-FEATURE-STATE-20261007`, `E-LIVE-PUBLIC-VIDEO-FEATURE-STATE-20261007`.

## Current Release Recheck — a5e3f72 — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `a5e3f72fce5f8a2dbe681ef98d0698f5989a4986`와 71개 bundle hash를 확인했다.
- AC-003/AC-004 전문가 영상 상태·선택·접근성 전달: PASS. 공개 390px·1440px에서 초기 `선택됨`, 두 번째 영상 선택 후 `준비 중`에서 `재생 중`으로 갱신되고 iframe·aria-label·가로폭·runtime errors 0을 확인했다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. workflow `37384062137`의 Pages·라이브 smoke·release-status도 성공했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-VIDEO-STATE-20261006, E-UI-CONTRACT-VIDEO-STATE-20261006, E-PLAYWRIGHT-VIDEO-STATE-20261006, E-DEPLOY-PIPELINE-VIDEO-STATE-20261006, E-LIVE-PUBLIC-VIDEO-STATE-20261006.

## Current Release Recheck — cea481f — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `cea481fc08ec48cc2dee0c98594904cef6771851`와 71개 bundle hash를 확인했다.
- AC-003/AC-004 연구 내부 진행 표시·주제 선택·가로폭·상태 전달: PASS. 공개 320px·390px·1440px에서 `06 / 12 · 연구 01 / 05`가 시작되고 세 번째 주제 선택 후 `06 / 12 · 연구 03 / 05`·활성 `근육`·live status·scrollWidth 일치·runtime errors 0을 확인했다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. workflow `37382053311`의 Pages·라이브 smoke·release-status도 성공했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-RESEARCH-SUBPROGRESS-20261006, E-UI-CONTRACT-RESEARCH-SUBPROGRESS-20261006, E-PLAYWRIGHT-RESEARCH-SUBPROGRESS-20261006, E-DEPLOY-PIPELINE-RESEARCH-SUBPROGRESS-20261006, E-LIVE-PUBLIC-RESEARCH-SUBPROGRESS-20261006.

## Current Release Recheck — d228a3d — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `d228a3df717136cfe3ab27c5ef092d2ea62bf320`와 71개 bundle hash를 확인했다.
- AC-003/AC-004 전문가 영상 fallback poster identity·crop variation·가로폭·선택 흐름: PASS. 공개 390px·1440px에서 첫 네 카드의 제목·주제·회차·crop, 두 번째 영상 선택·aria-pressed=true·feature title·iframe title·scrollWidth 390/1440·runtime errors 0을 확인했다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. workflow `37379778619`의 Pages·라이브 smoke·release-status도 성공했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-FALLBACK-POSTER-20261006, E-UI-CONTRACT-MOBILE-VIDEO-FALLBACK-POSTER-20261006, E-PLAYWRIGHT-MOBILE-VIDEO-FALLBACK-POSTER-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FALLBACK-POSTER-20261006, E-LIVE-PUBLIC-MOBILE-VIDEO-FALLBACK-POSTER-20261006.

## Current Release Recheck — 7fff775 — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `7fff775a6735c85f0ae7ff2362bf3604d19085d0`와 71개 bundle hash를 확인했다.
- AC-003/AC-004 모바일 전문가 영상 필터 접근성 의미·overscroll·cue 상태·가로폭·선택 흐름: PASS. 320px에서 region/aria-label·contain·44px 필터·끝 숨김·복귀 표시·마지막 주제 선택·aria-pressed=true·scrollWidth 320·runtime errors 0을 확인했다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. workflow `37377603302`의 Pages·라이브 smoke·release-status도 성공했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-FILTER-A11Y-20261006, E-UI-CONTRACT-MOBILE-VIDEO-FILTER-A11Y-20261006, E-PLAYWRIGHT-MOBILE-VIDEO-FILTER-A11Y-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FILTER-A11Y-20261006, E-LIVE-PUBLIC-MOBILE-VIDEO-FILTER-A11Y-20261006.

## Live Public Release Recheck — 16f3fec — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `16f3fec3403545098ed9e74a8ce058f75d59b9ce`와 71개 bundle hash를 확인했고, deploy-pages·smoke-live가 성공했다.
- AC-003/AC-004 공개 모바일 전문가 영상 필터 cue 상태·가로폭·선택 흐름: PASS. 320px에서 시작 표시·끝 숨김·복원·마지막 주제 선택·aria-pressed=true·scrollWidth 320·runtime errors 0을 확인했다.
- AC-005 release-verify·Worker gate·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. release-status는 기록 시점 queue 대기다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LIVE-PUBLIC-MOBILE-VIDEO-FILTER-CUE-STATE-20261006.

## Current Release Recheck — cdbc6f3 — 2026-10-06

- AC-003/AC-004 모바일 전문가 영상 필터 cue 상태·가로폭·선택 흐름: PASS. 로컬 320px에서 시작 표시, 끝 숨김, 시작 복원, `수면·기분` 선택과 aria-pressed=true, runtime errors 0을 확인했다.
- AC-005 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산: PASS.
- AC-001 새 main candidate의 공개 URL·Pages 배포·라이브 smoke: PENDING. workflow `37373171340`의 release-verify는 성공했지만 worker-readiness가 runner queue에서 대기 중이며 공개 validator candidate는 이전 `ffd7c2e`다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-FILTER-CUE-STATE-20261006, E-UI-CONTRACT-MOBILE-VIDEO-FILTER-CUE-STATE-20261006, E-PLAYWRIGHT-MOBILE-VIDEO-FILTER-CUE-STATE-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FILTER-CUE-STATE-20261006.

## Current Release Recheck — c61c535 — 2026-10-06

- AC-003/AC-004 모바일 전문가 영상 필터 발견성·가로폭·선택 흐름: PASS. 320px에서 cue 표시, rail 끝 도달, `수면·기분` 선택과 aria-pressed=true, runtime errors 0을 확인했다.
- AC-005 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산: PASS.
- AC-001 새 main candidate의 공개 URL·Pages 배포·라이브 smoke: PENDING. main workflow `37371457391`은 아직 pending이고 공개 validator candidate는 이전 `ffd7c2e`다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-FILTER-CUE-20261006, E-UI-CONTRACT-MOBILE-VIDEO-FILTER-CUE-20261006, E-PLAYWRIGHT-MOBILE-VIDEO-FILTER-CUE-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FILTER-CUE-20261006.

## Current Release Recheck — 27445e9 — 2026-10-06

- AC-004 로컬 초소형 모바일 헤더의 메뉴·읽기 크기 버튼 간격, 가로폭, 320px 토글: PASS. 280·300·320·350·390·1440px에서 overlap 없음과 viewport 일치 scrollWidth를 확인했다.
- AC-005 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산과 PR #385 필수 검증: PASS.
- AC-001 새 main candidate의 공개 URL·Pages 배포·라이브 smoke: PENDING. main workflow는 runner 후처리 queue로 취소되었고, 현재 공개 validator candidate는 이전 `ffd7c2e`다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-ULTRA-NARROW-HEADER-20261006, E-UI-CONTRACT-ULTRA-NARROW-HEADER-20261006, E-PLAYWRIGHT-ULTRA-NARROW-HEADER-20261006, E-DEPLOY-PIPELINE-ULTRA-NARROW-HEADER-20261006.

## Current Release Recheck — ffd7c2e — 2026-10-06

- AC-001 공개 URL·정적 번들·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·71개 bundle hash·12개 claim·6개 master record·1개 product·6개 share page·teaser HOLD를 확인했다.
- AC-004 320·390·1440px 읽기 크기 버튼의 명시적 라벨, 320px 토글, 가로 폭, runtime console errors: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·Pages 배포·라이브 smoke: PASS. release-status job은 기록 시점 GitHub Actions queue 대기였다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-READING-CONTROL-COMPACT-20261006, E-UI-CONTRACT-READING-CONTROL-COMPACT-20261006, E-PLAYWRIGHT-READING-CONTROL-COMPACT-20261006, E-DEPLOY-PIPELINE-READING-CONTROL-COMPACT-20261006, E-LIVE-PUBLIC-READING-CONTROL-COMPACT-20261006.

## Final Public Manifest Recheck — f54bae6 — 2026-10-06

- AC-001 최종 공개 URL·정적 번들·manifest candidate: PASS.
- AC-004 최종 공개 390·1440px 연구 지도 중심 10px 읽기 하한·선택 카드 흐름·가로 폭·runtime console errors: PASS.
- AC-005 문서 병합 후 메인 release-verify·Pages 배포·라이브 smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 최종 공개 candidate `f54bae600ce55ab6a2439bbd337eb26fc1949a1d`는 HTTP 200·STATIC·71개 bundle hash를 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-DEPLOY-PIPELINE-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006.

## Current Release Recheck — fb874662 — 2026-10-06

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-004 320·350·390·768·1440px 연구 지도 중심 보조 문구의 10px 읽기 하한·5개 영역·선택 카드 흐름·가로 폭·runtime console errors: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·Pages 배포·라이브 smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 공개 candidate `fb87466241c67311cbd990228acf48fab7f65068`는 HTTP 200·STATIC·71개 bundle hash를 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-UI-CONTRACT-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-CDP-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-DEPLOY-PIPELINE-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006.

## Current Release Recheck — 8a6260f — 2026-10-06

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-002 390·1440px 연구 지도 중심 보조 문구의 읽기 계층·5개 영역·선택 카드 흐름·가로 폭: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·Pages 배포·라이브 smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 공개 candidate `8a6260f4342be4979cf28d4c7f3ae46f6f67b0a6`는 HTTP 200·STATIC·71개 bundle hash를 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-SCALE-LEGIBILITY-20261006, E-UI-CONTRACT-RESEARCH-MAP-SCALE-LEGIBILITY-20261006, E-CDP-RESEARCH-MAP-SCALE-LEGIBILITY-20261006, E-DEPLOY-PIPELINE-RESEARCH-MAP-SCALE-LEGIBILITY-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-SCALE-LEGIBILITY-20261006.

## Current Release Recheck — 8724f4c — 2026-10-06

- AC-001 공개 URL·정적 번들·현재 배포 후보: PASS.
- AC-004 390·1440px 전문가 영상 카드·필터·선택 즉시 재생·포커스·가로 폭·runtime console errors: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·Pages 공개본·배포 후 live validator·NAVI project-state·risk-control: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 공개 candidate `8724f4cb2fe036f1ea227bb1c75826a70dffb13e`는 HTTP 200·STATIC·71개 bundle hash를 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-DEPLOY-PIPELINE-EXPERT-VIDEO-INTERACTION-20261006, E-LIVE-PUBLIC-EXPERT-VIDEO-POSTDEPLOY-20261006.

## Current Release Recheck — b73e086 — 2026-10-06

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-004 390·1440px 연구 지도 중심 규모·읽는 순서·가로 폭·runtime console errors: PASS.
- AC-005 PR 검증·UI 계약·typecheck·127개 테스트·production build·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 공개 candidate `b73e086f1cf110542f57c417d3962c56e3f631de`는 HTTP 200·STATIC·71개 bundle hash를 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-DEPLOY-PIPELINE-RESEARCH-MAP-SCALE-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-SCALE-20261006.

## Current Release Recheck — f1cd671 — 2026-10-06

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-004 390·1440px 첫 화면 읽기 진입 컨트롤·도입부 이동·읽기 진행 레일·가로 폭·runtime 안정성: PASS.
- AC-005 PR 검증·UI 계약·typecheck·127개 테스트·production build·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 공개 candidate `f1cd67136368c26fb7d2a12af25a010a3cff735b`는 HTTP 200·STATIC·71개 bundle hash를 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-DEPLOY-PIPELINE-HERO-CUE-CONTRAST-20261006, E-LIVE-PUBLIC-HERO-CUE-CONTRAST-20261006.

## Current Release Recheck — 589055e — 2026-10-06

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-004 390·1440px 글자 크기 조절 문구·토글 상태·가로 폭·runtime 안정성: PASS.
- AC-005 PR 검증·UI 계약·typecheck·127개 테스트·production build·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 공개 candidate `589055e10aad8e53d879e1217e8ac540072986e8`는 HTTP 200·STATIC·71개 bundle hash를 유지한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-DEPLOY-PIPELINE-READING-SIZE-LABEL-20261006, E-LIVE-PUBLIC-READING-SIZE-LABEL-20261006.

## Current Release Recheck — 1daf71b — 2026-10-06

- AC-004 모바일 헤더의 글자 크기 조절 문구·토글 상태·가로 폭: PASS locally.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 공개 배포와 live validator는 후속 PR 검증 이후 확인해야 한다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: E-LOCAL-BUILD-READING-SIZE-LABEL-20261006, E-UI-CONTRACT-READING-SIZE-LABEL-20261006, E-CDP-READING-SIZE-LABEL-20261006, E-DEPLOY-PIPELINE-READING-SIZE-LABEL-20261006.

## Current Release Recheck — d593491 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 UI 배포 후보: PASS.
- AC-004 390·1440px 첫 화면의 `3분 읽기 시작` 행동, `#opening-bridge` 직접 이동, 진행 레일 동기화, 가로 넘침·runtimeErrors 0: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- PR #367과 main 공개 배포 workflow `37338231096`이 성공했고 공개 candidate `d59349199a50c7f2662238ab822495118f087f4a`는 HTTP 200·STATIC을 유지한다. C-146과 네 증거를 등록했다.
- NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있기 때문이다.

증적: E-LOCAL-BUILD-HERO-READING-START-20261006, E-UI-CONTRACT-HERO-READING-START-20261006, E-DEPLOY-PIPELINE-HERO-READING-START-20261006, E-LIVE-PUBLIC-HERO-READING-START-20261006.

## Current Release Recheck — 012e531 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-003 비교형 연구 결과 도표의 읽는 법 범례·두 조건 비교·접근성 전체 설명 보존: PASS.
- AC-004 320·390·1440px 범례 줄바꿈·가로 폭 안정성·390·1440px 전체 섹션 runtimeErrors 0: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 최종 main 공개 배포 workflow `37335287439`가 성공했고, 공개 manifest는 candidate `012e5318cb45c5af734e5d83b0b79e654f0f6665`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, 6 share pages, teaser HOLD를 확인했다. 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다.
- NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있기 때문이다.

증적: E-DEPLOY-PIPELINE-RESEARCH-CHART-LEGEND-FINAL-20261006, E-LIVE-PUBLIC-RESEARCH-CHART-LEGEND-FINAL-20261006.

## Current Release Recheck — 859bb59 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-003 비교형 연구 결과 도표의 읽는 법 범례, 두 조건 비교, 접근성 전체 설명 보존: PASS.
- AC-004 320·390·1440px 범례 줄바꿈·가로 폭 안정성·runtimeErrors 0: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #362와 main 공개 배포 workflow `37333111161`이 성공했고, 공개 manifest는 candidate `859bb59f901eb038f6152f5b89749616a3532aac`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, 6 share pages, teaser HOLD를 확인했다. 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다.
- NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESEARCH-CHART-LEGEND-20261006, E-UI-CONTRACT-RESEARCH-CHART-LEGEND-20261006, E-DEPLOY-PIPELINE-RESEARCH-CHART-LEGEND-20261006, E-LIVE-PUBLIC-RESEARCH-CHART-LEGEND-20261006.

## Current Release Recheck — 2eb17a7 — 2026-10-05

- AC-002·AC-003 연구 지도·상세 연구 결과·출처 연결 흐름: PASS.
- AC-004 390px 연구 지도 선택·다음 연구 이동·`#final` 직접 링크·가로 폭 안정성: PASS.
- AC-005 전문가 영상 9개 선택 즉시 재생, 사업자용 5문장 실제 복사 상태, runtimeErrors 0: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 연구 수치·출처·카피·제품 독립 공개 경계는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 전체 브라우저·실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있기 때문이다.

증적: E-LIVE-PUBLIC-RESEARCH-FLOW-20261005, E-LIVE-PUBLIC-DIRECT-FINAL-CONTEXT-20261005, E-LIVE-PUBLIC-TRUSTED-SHARE-COPY-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-FLOW-20261005.

## Current Release Recheck — 8605724 — 2026-10-05

- AC-004 좁은 모바일 헤더 280·300·320·360·390px 충돌 없음·44px 터치 영역·가로 폭 안정성 및 390px 키보드 메뉴 흐름: PASS.
- AC-005 기존 UI 계약·typecheck·127개 테스트·production build·Pages 배포·live smoke·release status와 이번 공개 키보드·헤더 감리: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 공개 연구 수치·출처·카피·제품 독립 공개 경계는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 전체 브라우저·실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있기 때문이다.

증적: E-LIVE-PUBLIC-NARROW-HEADER-KEYBOARD-20261005, E-LIVE-PUBLIC-MOBILE-MENU-KEYBOARD-20261005.

## Current Release Recheck — 2c1bca9 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-004 390·768·1440px 발견 섹션 제목의 자연스러운 공백, 가로 폭 안정성, 접근성 기본 점검·runtimeErrors 0: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #331과 main 공개 배포 workflow `37290461697`이 성공했고, 최종 공개 manifest는 candidate `2c1bca9eacd16149debff1a580155996b335987e`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, 6 share pages, teaser HOLD를 확인했다. 발견 제목은 모바일 전용 줄바꿈이 숨겨지는 태블릿·데스크톱에서도 자연스러운 한국어 공백을 보존한다.
- 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있기 때문이다.

증적: E-LOCAL-BUILD-HISTORY-HEADING-SPACING-20261005, E-UI-CONTRACT-HISTORY-HEADING-SPACING-20261005, E-DEPLOY-PIPELINE-HISTORY-HEADING-SPACING-20261005, E-LIVE-PUBLIC-HISTORY-HEADING-SPACING-20261005.

## Current Release Recheck — 9c1a5cf — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-004 320·390·768·1024·1440px 장 제목·첫 화면 H1의 자연스러운 공백, 가로 폭 안정성·runtimeErrors 0: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #328·#329와 main 공개 배포 workflow `37287592876`·`37288363450`이 성공했고, 최종 공개 manifest는 candidate `9c1a5cf0200a46f8505ce471f0c67f46c27a1724`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, 6 share pages, teaser HOLD를 확인했다. 첫 화면 H1과 14개 H2의 textContent가 자연스러운 한국어 공백을 보존하고, 공개 CDP responsive audit의 scrollWidth는 320·390·753·1009·1425px이었다.
- 연구 수치·출처·공개 카피의 의미·제품 독립 공개 경계는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있기 때문이다.

증적: E-LOCAL-BUILD-KOREAN-HEADING-SPACING-20261005, E-UI-CONTRACT-KOREAN-HEADING-SPACING-20261005, E-DEPLOY-PIPELINE-KOREAN-HEADING-SPACING-20261005, E-LIVE-PUBLIC-KOREAN-HEADING-SPACING-20261005.

## Current Release Recheck — a18561f — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-003 모바일 연구 비교 도표의 조건 범례와 결과 막대 연결성: PASS.
- AC-004 280·300·320·360·390px 헤더·큰 글씨 모드·연구 카드·메뉴 상호작용·가로 폭 안정성: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #326과 main 공개 배포 workflow `37284733229`가 성공했고, 공개 manifest는 candidate `a18561f8b00a6f808e8ee858c9e833089537f3e4`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, teaser HOLD를 확인했다. 모바일 범례는 세로 읽기 순서로 개선됐고 데스크톱 비교 도표는 유지됐다.
- NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-COMPARISON-LEGEND-20261005, E-UI-CONTRACT-MOBILE-COMPARISON-LEGEND-20261005, E-DEPLOY-PIPELINE-MOBILE-COMPARISON-LEGEND-20261005, E-LIVE-PUBLIC-MOBILE-COMPARISON-LEGEND-20261005.

## Current Release Recheck — 726fe8a8 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-004 280·300·320·360·390px 헤더·큰 글씨 모드·390px 전문가 영상 선택·390·768·1024·1440px 장 직접 진입: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #324와 main 공개 배포 workflow `37282401884`가 성공했고, 공개 manifest는 candidate `726fe8a85f5729c780d5da21dee36f4fa86d6412`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, teaser HOLD를 확인했다. v111 읽기 레일은 전환 중 opacity 1·흰색 표면을 유지한다.
- NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-READING-RAIL-OPAQUE-20261005, E-UI-CONTRACT-READING-RAIL-OPAQUE-20261005, E-DEPLOY-PIPELINE-READING-RAIL-OPAQUE-20261005, E-LIVE-PUBLIC-READING-RAIL-OPAQUE-20261005.

## Current Release Recheck — 2ca5a8a — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-002 390·768·1024·1440px 장문 안내서의 지연 렌더링 후 섹션 위치·직접 진입·가로 폭 안정성: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #322와 main 공개 배포 workflow `37280003369`가 성공했고, 공개 manifest는 candidate `2ca5a8a264321c7d9fa16e0fe2cb63a5aed4694f`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, teaser HOLD를 확인했다.
- v110 반응형 예약 높이로 로컬 깊은 스크롤 위치 차이는 모바일 1–5px, 768px 1px, 1024px·1440px 0px로 정리됐다. 공개 URL에서 세 주요 직접 진입과 가로 폭도 확인했다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-DEFERRED-CHAPTER-STABILITY-20261005, E-UI-CONTRACT-DEFERRED-CHAPTER-STABILITY-20261005, E-DEPLOY-PIPELINE-DEFERRED-CHAPTER-STABILITY-20261005, E-LIVE-PUBLIC-DEFERRED-CHAPTER-STABILITY-20261005.

## Current Release Recheck — 2226541 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-002 데스크톱·모바일 hero 읽기 안내와 가로 폭 안정성: PASS.
- AC-005 UI 계약·typecheck·규칙/API 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #320과 main 공개 배포 workflow `37277241941`가 성공했고, 공개 manifest는 candidate `22265413532d4264cb9640070a677aebbe66dbf7`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, teaser HOLD를 확인했다.
- 캐시 비활성화 Chrome CDP fallback 공개 1440px에서 데스크톱 안내의 대비 분리와 `scrollWidth=1425`, 390px에서 모바일 안내와 `scrollWidth=390`을 확인했다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 브라우저 전체 조합, 대표 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-DESKTOP-READING-CUE-20261005, E-UI-CONTRACT-DESKTOP-READING-CUE-20261005, E-DEPLOY-PIPELINE-DESKTOP-READING-CUE-20261005, E-LIVE-PUBLIC-DESKTOP-READING-CUE-20261005.

## Current Release Recheck — 2c7433b — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-002 320·350·381·390·430px 모바일 헤더 컨트롤 간격과 가로 폭: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #318과 main 공개 배포 workflow `37275123302`가 성공했고, 공개 manifest는 candidate `2c7433b144ef1930e7b7a21c744dd468d751e431`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, teaser HOLD를 확인했다.
- 캐시 비활성화 Chrome CDP fallback 공개 320·350·381·390·430px에서 헤더 세 컨트롤의 겹침 0건과 각 뷰포트 가로 폭 유지를 확인했다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 브라우저 전체 조합, 대표 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-NARROW-HEADER-SPACING-20261005, E-UI-CONTRACT-NARROW-HEADER-SPACING-20261005, E-DEPLOY-PIPELINE-NARROW-HEADER-SPACING-20261005, E-LIVE-PUBLIC-NARROW-HEADER-SPACING-20261005.

## Current Release Recheck — 030f43a — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-004 320·350·390·768px 연구 비교 도표에서 조건 레이블 줄바꿈·가로 넘침 없음: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #316과 main 공개 배포 workflow `37273248778`가 성공했고, 공개 manifest는 candidate `030f43a6b481a22311803c3e9d4d39c196cab23e`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, teaser HOLD를 확인했다.
- 캐시 비활성화 Chrome CDP fallback 공개 320·350·390·768px에서 각 뷰포트 가로 폭 유지와 overflowCount `0`을 확인했다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 브라우저 전체 조합, 대표 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-NARROW-CHART-HEADER-20261005, E-UI-CONTRACT-NARROW-CHART-HEADER-20261005, E-DEPLOY-PIPELINE-NARROW-CHART-HEADER-20261005, E-LIVE-PUBLIC-NARROW-CHART-HEADER-20261005.

## Current Release Recheck — 80bd0f2 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-004 390px 모바일 첫 화면에서 읽기 안내 표시·큰 글씨 토글·가로 넘침 없음: PASS.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산·Pages 배포·live smoke·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #313 merge `76dc972d`와 heartbeat PR #314 merge `80bd0f22` 이후 main workflow `37271282282`가 성공했다. 공개 manifest는 candidate `80bd0f223dcf75e10b63ac13d7115135e845a8cb`, HTTP 200, STATIC, 12 claims, 6 research, 1 product, teaser HOLD를 확인했다.
- Chrome CDP fallback 공개 390×844에서 `아래로 읽기` pill의 대비·테두리·색상과 큰 글씨 토글 후 `scrollWidth=390px`를 확인했다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 브라우저 전체 조합, 대표 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-READING-CUE-CONTRAST-20261005, E-UI-CONTRACT-MOBILE-READING-CUE-CONTRAST-20261005, E-DEPLOY-PIPELINE-MOBILE-READING-CUE-CONTRAST-20261005, E-LIVE-PUBLIC-MOBILE-READING-CUE-CONTRAST-20261005.

## Current Release Recheck — 21a34c7 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-004 390px 메뉴에서 장면 선택 후 메뉴 닫힘·즉시 이동·가로 넘침 없음: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #311과 main 공개 배포 workflow `37269235739`가 성공했고, 공개 URL candidate `21a34c7964a72c5fbb48eedba972a10da419f22c`가 HTTP 200 정적 사이트로 확인됐다. Chrome CDP fallback 공개 390px에서 메뉴 열기→발견 선택 후 메뉴가 닫히고 제목 top `132.1px`, 가로 넘침 `0`으로 정렬됐다.
- NAVI 로컬 감사는 오류 없이 새 증적을 연결했다. 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 실제 브라우저 전체 조합, 대표 실기기, 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-MENU-NAVIGATION-20261005, E-UI-CONTRACT-MOBILE-MENU-NAVIGATION-20261005, E-DEPLOY-PIPELINE-MOBILE-MENU-NAVIGATION-20261005, E-LIVE-PUBLIC-MOBILE-MENU-NAVIGATION-20261005.

## Current Release Recheck — fb3d19c — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-002 연구 상세 카드와 결과 도표의 모바일 읽기 순서: PASS.
- AC-003 연구 결과 비교·출처 연결: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #309와 main 공개 배포 workflow `37267840225`가 성공했고, 공개 URL의 candidate `fb3d19c64e54f238d32d859c5d63a39898889250`가 HTTP 200 정적 사이트로 확인됐다. 공개 번들은 71개 파일이며 390px 연구 결과 카드에서 제목과 결과 요약이 겹치지 않는다.
- NAVI 로컬 감사는 오류 없이 대기 게이트를 분리해 기록했다. 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 실제 브라우저 전체 조합, 대표 실기기, 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-RESEARCH-CARD-LAYOUT-20261005, E-UI-CONTRACT-MOBILE-RESEARCH-CARD-LAYOUT-20261005, E-DEPLOY-PIPELINE-MOBILE-RESEARCH-CARD-LAYOUT-20261005, E-LIVE-PUBLIC-MOBILE-RESEARCH-CARD-LAYOUT-20261005.

## Current Release Recheck — 85ec17f — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #307과 main 공개 배포 workflow `37266107250`이 성공했고, 공개 URL의 candidate `85ec17fc17b7816096e98b1b995b1b1d5f72953b`가 HTTP 200 정적 사이트로 확인됐다. 공개 번들은 71개 파일이며 제품 독립 안내 문구와 발효·안전→성장 연구→전문가 영상 handoff를 포함한다.
- 이번 변경은 연구 수치·출처·공개 카피·제품 경계를 바꾸지 않고 긴 모바일 읽기 흐름의 다음 장면을 명시했다. Chrome CDP fallback으로 390px·1440px 공개 렌더의 가로 넘침 없음을 확인했다.
- NAVI 로컬 감사는 오류 없이 대기 게이트를 분리해 기록했다. 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 실제 브라우저 전체 조합, 대표 실기기, 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-EDITORIAL-HANDOFFS-20261005, E-UI-CONTRACT-EDITORIAL-HANDOFFS-20261005, E-DEPLOY-PIPELINE-EDITORIAL-HANDOFFS-20261005, E-LIVE-PUBLIC-EDITORIAL-HANDOFFS-20261005.

## Current Release Recheck — 31fcd55 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #305와 main 공개 배포 workflow 37264643742가 성공했고, 공개 URL의 candidate `31fcd55abdab529653c8d19539b3e88ef651a33a`가 HTTP 200 정적 사이트로 확인됐다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 연구 규모 숫자보다 먼저 비교 범위를 보여 주어 기관별 PubMed 검색과 별도 SCIE 분석의 읽기 순서를 분리했다. 연구 수치·출처·공개 카피·제품 경계는 변경하지 않았다.
- NAVI 로컬 감사는 오류 없이 대기 게이트를 분리해 기록했다. 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 실제 브라우저 상호작용, 대표 실기기, 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESEARCH-SCALE-SCOPE-20261005, E-UI-CONTRACT-RESEARCH-SCALE-SCOPE-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCALE-SCOPE-20261005, E-LIVE-PUBLIC-RESEARCH-SCALE-SCOPE-20261005.

## Current Release Recheck — 5ebcfaa — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #303과 main 공개 배포 workflow 37263567643이 성공했고, 공개 URL validator가 candidate 5ebcfaa906f03a8b8b0755bb9dd1a0b780643458을 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 모바일 hero에서 다음 읽기 방향을 시각적으로 안내하고, 회복 브리지의 문장 흐름을 자연스럽게 보강했다. 연구 수치·출처·공개 카피·즉시 재생·공유 URL·제품 경계는 변경하지 않았다.
- NAVI 로컬 감사는 오류 없이 대기 게이트를 분리해 기록했다. 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 실제 브라우저 상호작용, 대표 실기기, 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-READING-CUE-20261005, E-UI-CONTRACT-MOBILE-READING-CUE-20261005, E-DEPLOY-PIPELINE-MOBILE-READING-CUE-20261005, E-LIVE-PUBLIC-MOBILE-READING-CUE-20261005.

## Current Release Recheck — 72f3cd9 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #301과 main 공개 배포 workflow 37262103043이 성공했고, 공개 URL validator가 candidate 72f3cd986633974a46aca460eaa23e3c05ccce11을 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 공개 안내서 경로에서 불필요한 공용 제품·주문 콘텐츠 요청을 차단해 시작 성능과 제품 독립 경계를 보강했다. 연구 수치·출처·공개 카피·즉시 재생·공유 URL·제품 경계는 변경하지 않았다.
- NAVI 로컬 감사는 오류 없이 대기 게이트를 분리해 기록했다. 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 실제 브라우저 상호작용, 대표 실기기, 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005, E-UI-CONTRACT-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005, E-DEPLOY-PIPELINE-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005, E-LIVE-PUBLIC-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005.

## Current Release Recheck — 594352e — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #299와 main 공개 배포 workflow 37260971979가 성공했고, 공개 URL validator가 candidate 594352e3c39b3eb15aee6095d4245cabaa5272d8를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 모바일 연구 지도의 선택 semantics와 중심 현재 주제 문구의 가독성을 보강했다. 연구 수치·출처·공개 카피·즉시 재생·공유 URL·제품 경계는 변경하지 않았다.
- NAVI 로컬 감사는 오류 없이 대기 게이트를 분리해 기록했다. 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 실제 브라우저 상호작용, 대표 실기기, 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-CONTEXT-20261005, E-UI-CONTRACT-RESEARCH-MAP-CONTEXT-20261005, E-DEPLOY-PIPELINE-RESEARCH-MAP-CONTEXT-20261005, E-LIVE-PUBLIC-RESEARCH-MAP-CONTEXT-20261005.

## Current Release Recheck — 4b30428 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #297과 main 공개 배포 workflow 37259915121이 성공했고, 공개 URL validator가 candidate 4b30428ce6cb048373b1f7d03eb36ce674234a55를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 연구 확장 지도 선택과 연구 결과 영역, 전문가 영상 선택과 대표 영상 영역의 명시적 연결 및 선택·포커스 구분을 보강했다. 연구 수치·출처·공개 카피·즉시 재생·공유 URL·제품 경계는 변경하지 않았다.
- NAVI 로컬 감사는 오류 없이 대기 게이트를 분리해 기록했다. 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 실제 브라우저 상호작용, 대표 실기기, 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESEARCH-VIDEO-DESTINATION-20261005, E-UI-CONTRACT-RESEARCH-VIDEO-DESTINATION-20261005, E-DEPLOY-PIPELINE-RESEARCH-VIDEO-DESTINATION-20261005, E-LIVE-PUBLIC-RESEARCH-VIDEO-DESTINATION-20261005.

## Current Release Recheck — a796f3d — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #295와 main 공개 배포 workflow 37258419309가 성공했고, 공개 URL validator가 candidate a796f3d595acf7ebd5bad70ad8896d0e086116ec를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 전문가 영상 게시판의 한국어 헤더 가독성, 필터-영상 목록 접근성 연결과 NAVI 빈 입력 매니페스트 계약을 보강했으며 연구 수치·출처·공개 카피·즉시 재생·공유 URL·제품 경계는 변경하지 않았다.
- NAVI 로컬 감사는 오류 없이 대기 게이트를 분리해 기록했다. 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 실제 브라우저 상호작용, 대표 실기기, 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-KOREAN-VIDEO-BOARD-TYPE-20261005, E-UI-CONTRACT-KOREAN-VIDEO-BOARD-TYPE-20261005, E-DEPLOY-PIPELINE-KOREAN-VIDEO-BOARD-TYPE-20261005, E-LIVE-PUBLIC-KOREAN-VIDEO-BOARD-TYPE-20261005.

## Current Release Recheck — 02ad4cc — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #293과 main 공개 배포 workflow 37257033514가 성공했고, 공개 URL validator가 candidate 02ad4ccf8f83560f858b89d3ed3cd214d6e46800를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 전문가 영상 갤러리의 현재 주제·영상 수·선택 영상 맥락과 접근 가능한 이름을 보강했으며 즉시 재생·공유 URL·연구 수치·출처·공개 카피·제품 경계는 변경하지 않았다.
- NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 실제 브라우저 상호작용, 대표 실기기, 고령 사용자 독해성, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-VIDEO-FILTER-CONTEXT-20261005, E-UI-CONTRACT-VIDEO-FILTER-CONTEXT-20261005, E-DEPLOY-PIPELINE-VIDEO-FILTER-CONTEXT-20261005, E-LIVE-PUBLIC-VIDEO-FILTER-CONTEXT-20261005.

## Current Release Recheck — efb3f20 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #291과 main 공개 배포 workflow 37255772910이 성공했고, 공개 URL validator가 candidate efb3f20540f88c0909e89826238c7d70f9c7ab50를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 연구 또는 출처 읽기 장면에서 선택 연구의 제목·관찰 결과·`research-{id}` 딥링크를 공유하도록 보강했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다. 전문가 영상과 다른 장의 공유 목적지도 유지했다.
- NAVI 공식 구조 검증과 risk-control assessment는 PASS이며, 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.
- 완료 상태는 NOT_READY를 유지한다. 실제 브라우저 상호작용 캡처, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESEARCH-SHARE-CONTEXT-20261005, E-UI-CONTRACT-RESEARCH-SHARE-CONTEXT-20261005, E-DEPLOY-PIPELINE-RESEARCH-SHARE-CONTEXT-20261005, E-LIVE-PUBLIC-RESEARCH-SHARE-CONTEXT-20261005.

## Current Release Recheck — 4143e45 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #289와 main 공개 배포 workflow 37254552858이 성공했고, 공개 URL validator가 candidate 4143e45fb6b19f8f1b8adc77712c9f7f1bde85cf를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 연구 카드 선택과 출처 읽기 패널의 source·subject·measured·design을 동기화하고 직접 진입 시 인지 연구를 기본 예시로 유지했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- NAVI 공식 구조 검증과 risk-control assessment는 PASS이며, 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.
- 완료 상태는 NOT_READY를 유지한다. 실제 브라우저 렌더 검증, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-CONTEXTUAL-SOURCE-20261005, E-UI-CONTRACT-CONTEXTUAL-SOURCE-20261005, E-DEPLOY-PIPELINE-CONTEXTUAL-SOURCE-20261005, E-LIVE-PUBLIC-CONTEXTUAL-SOURCE-20261005.

## Current Release Recheck — 7c409a1 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #287과 main 공개 배포 workflow 37253350843이 성공했고, 공개 URL validator가 candidate 7c409a1e6aa80cf0bebc462fbce8741b284a79d4를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 모바일 출처 읽기 패널의 네 가지 질문을 세로 읽기 레일로 연결하고 원문 출처 카드의 한글 읽기 폭을 보강했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- NAVI 공식 구조 검증과 risk-control assessment는 PASS이며, 상태 전이는 `RED_TEAM → USER_DECISION`으로 정합화했다.
- 완료 상태는 NOT_READY를 유지한다. 실제 브라우저 렌더 검증, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-SOURCE-RAIL-20261005, E-UI-CONTRACT-MOBILE-SOURCE-RAIL-20261005, E-DEPLOY-PIPELINE-MOBILE-SOURCE-RAIL-20261005, E-LIVE-PUBLIC-MOBILE-SOURCE-RAIL-20261005.

## Current Release Recheck — 3904b39 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #285와 main 공개 배포 workflow 37252460081이 성공했고, 공개 URL validator가 candidate 3904b39eacd708d34a3842023c0884c3aa8449b5를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 좁은 모바일의 연구·활용·전문가 영상 연결부를 현재 맥락·구분선·다음 읽을 장면 순서로 정리했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. 실제 브라우저 렌더 검증, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-HANDOFF-20261005, E-UI-CONTRACT-MOBILE-HANDOFF-20261005, E-DEPLOY-PIPELINE-MOBILE-HANDOFF-20261005, E-LIVE-PUBLIC-MOBILE-HANDOFF-20261005.

## Current Release Recheck — b343def — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #283과 main 공개 배포 workflow 37251345872가 성공했고, 공개 URL validator가 candidate b343def175eb3d65b3ee844c4cb14a2e4ba9f2ea를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 좁은 모바일 연구 결과 비교 레인을 세로 읽기 순서로 정리하고 GABA 결과 시각 표식을 강화했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. 실제 브라우저 렌더 검증, Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-NARROW-COMPARISON-20261005, E-UI-CONTRACT-NARROW-COMPARISON-20261005, E-DEPLOY-PIPELINE-NARROW-COMPARISON-20261005, E-LIVE-PUBLIC-NARROW-COMPARISON-20261005.

## Current Release Recheck — de91cbb — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #281과 main 공개 배포 workflow 37250175467이 성공했고, 공개 URL validator가 candidate de91cbb35dbc1c7c58451c13d0ad10398851f822를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 모바일 장 제목 아래의 짧은 맥락 문구에 읽기 크기 하한과 좌측 시각 표식을 추가했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. 실제 브라우저 렌더 검증, Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-CONTEXT-FLOOR-20261005, E-UI-CONTRACT-MOBILE-CONTEXT-FLOOR-20261005, E-DEPLOY-PIPELINE-MOBILE-CONTEXT-FLOOR-20261005, E-LIVE-PUBLIC-MOBILE-CONTEXT-FLOOR-20261005.

## Current Release Recheck — b98df10 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #279와 main 공개 배포 workflow 37248925292가 성공했고, 공개 URL validator가 candidate b98df102dda6a54ac2fd2d570d6f0248e7c465b3를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 모바일 섹션 제목 아래의 짧은 맥락 문구를 복원하고 v93 UI 계약으로 고정했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. 실제 브라우저 렌더 검증, Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-CHAPTER-CONTEXT-20261005, E-UI-CONTRACT-MOBILE-CHAPTER-CONTEXT-20261005, E-DEPLOY-PIPELINE-MOBILE-CHAPTER-CONTEXT-20261005, E-LIVE-PUBLIC-MOBILE-CHAPTER-CONTEXT-20261005.

## Current Release Recheck — 13450f2 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #277과 main 공개 배포 workflow 37248181705가 성공했고, 공개 URL validator가 candidate 13450f232c0b75ea337c05aa6fbb3cb53ef0ae3f를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 읽기 진행 표시의 보조기기용 라이브 문맥을 별도 status 영역으로 분리하고 UI 계약으로 고정했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. 실제 스크린리더 조합, Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-READING-LIVE-CONTEXT-20261005, E-UI-CONTRACT-READING-LIVE-CONTEXT-20261005, E-DEPLOY-PIPELINE-READING-LIVE-CONTEXT-20261005, E-LIVE-PUBLIC-READING-LIVE-CONTEXT-20261005.

## Current Release Recheck — 0d4981d — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #275와 main 공개 배포 workflow 37247369428이 성공했고, 공개 URL validator가 candidate 0d4981dd42fd3b394d5a35db28fbfc3c13b3399d를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 제목과 본문의 한글 줄바꿈 규칙을 보강하고 UI 계약으로 고정했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. 실제 브라우저 렌더 검증, Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-TYPOGRAPHY-WRAP-20261005, E-UI-CONTRACT-TYPOGRAPHY-WRAP-20261005, E-DEPLOY-PIPELINE-TYPOGRAPHY-WRAP-20261005, E-LIVE-PUBLIC-TYPOGRAPHY-WRAP-20261005.

## Current Release Recheck — 98c59eb — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #273과 main 공개 배포 workflow 37246552896이 성공했고, 공개 URL validator가 candidate 98c59eb3a683a2f5dd51093ede4efe7a78f6ebfc를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 하단 편집 섹션의 점진 렌더링과 예약 높이를 추가하고 연구 카드의 활성 주제 감지 영역을 보존했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. 실제 브라우저 성능 trace, Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-PROGRESSIVE-PUBLISHING-20261005, E-UI-CONTRACT-PROGRESSIVE-PUBLISHING-20261005, E-DEPLOY-PIPELINE-PROGRESSIVE-PUBLISHING-20261005, E-LIVE-PUBLIC-PROGRESSIVE-PUBLISHING-20261005.

## Current Release Recheck — 7eef131 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 배포 후보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #271과 main 공개 배포 workflow 37245784203이 성공했고, 공개 URL validator가 candidate 7eef1314d6aab545383153573a9cbbb021c6db00를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 전문가 영상·썸네일 외부 미디어 연결 힌트를 진입 HTML에 추가하고 기존 지연 로딩을 보존했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. 실제 브라우저 네트워크 waterfall, Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MEDIA-HINTS-20261005, E-UI-CONTRACT-MEDIA-HINTS-20261005, E-DEPLOY-PIPELINE-MEDIA-HINTS-20261005, E-LIVE-PUBLIC-MEDIA-HINTS-20261005.

## Current Release Recheck — ee77f28 — 2026-10-05

- AC-003 연구 지도·상세 카드 연결을 유지하면서 카드별 최신 교차 상태로 활성 주제 선택을 안정화: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #269와 main 공개 배포 workflow 37245122445가 성공했고, 공개 URL validator가 candidate ee77f2846932917ec1591b7e1ae4b985f57e1cde를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 연구 카드별 최신 교차 상태를 기준으로 활성 주제를 선택하고 같은 주제의 중복 발행을 줄였으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-OBSERVER-STATE-20261005, E-UI-CONTRACT-OBSERVER-STATE-20261005, E-DEPLOY-PIPELINE-OBSERVER-STATE-20261005, E-LIVE-PUBLIC-OBSERVER-STATE-20261005.

## Current Release Recheck — 7395768 — 2026-10-05

- AC-003 연구 지도·상세 카드 연결을 유지하면서 스크롤 주제 갱신을 프레임 단위로 배칭하고 비차단 처리: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #267과 main 공개 배포 workflow 37244243638이 성공했고, 공개 URL validator가 candidate 7395768ec70c9047f9102233a1fb22e89fa660fc를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 연구 카드 스크롤 이벤트를 requestAnimationFrame으로 합친 뒤 startTransition으로 반영했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RAF-20261005, E-UI-CONTRACT-RAF-20261005, E-DEPLOY-PIPELINE-RAF-20261005, E-LIVE-PUBLIC-RAF-20261005.

## Current Release Recheck — 3007891 — 2026-10-05

- AC-003 연구 지도·상세 카드 연결을 유지하면서 스크롤 주제 갱신을 비차단 처리: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #265와 main 공개 배포 workflow 37243296161이 성공했고, 공개 URL validator가 candidate 30078911bfd1838f9c2595d68f781520c9fc7b82를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 연구 카드 현재 주제 상태 갱신을 비긴급 transition으로 처리했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-TRANSITION-20261005, E-UI-CONTRACT-TRANSITION-20261005, E-DEPLOY-PIPELINE-TRANSITION-20261005, E-LIVE-PUBLIC-TRANSITION-20261005.

## Current Release Recheck — 8e1e335 — 2026-10-05

- AC-003 연구 지도·상세 카드의 현재 주제 연결 흐름과 연구 시각 요소 렌더링 최적화: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #263과 main 공개 배포 workflow 37242328341이 성공했고, 공개 URL validator가 candidate 8e1e3355605d9ca12c103beb7b447a7bd94194bd를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 이번 변경은 현재 연구 주제 추적 중 정적 glyph·연구 프로필·결과 도표의 중복 렌더링을 줄였으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MEMO-20261005, E-UI-CONTRACT-MEMO-20261005, E-DEPLOY-PIPELINE-MEMO-20261005, E-LIVE-PUBLIC-MEMO-20261005.

## Current Release Recheck — 5519791 — 2026-10-05

- AC-003 연구 지도와 상세 카드의 현재 주제 연결 표시: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #261과 main 공개 배포 workflow 37241358621이 성공했고, 공개 URL validator가 candidate 551979122680c2bccfcbfbdf2b420abfb7194564를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했고 live guide bundle에 현재 연구 주제 라벨이 포함됐다.
- 이번 변경은 연구 지도 중심의 현재 주제 표시와 모바일 가독성만 보완했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MAP-CURRENT-20261005, E-UI-CONTRACT-MAP-CURRENT-20261005, E-DEPLOY-PIPELINE-MAP-CURRENT-20261005, E-LIVE-PUBLIC-MAP-CURRENT-20261005.

## Current Release Recheck — efc6246 — 2026-10-05

- AC-003 연구 카드의 핵심 결과 선행 표시와 모바일 읽기 순서: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #259와 main 공개 배포 workflow 37240376184가 성공했고, 공개 URL validator가 candidate efc624679105d2665b94a887e4866429451c4478을 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했고 live guide bundle에 `결과 한 줄`이 포함됐다.
- 이번 변경은 연구 결과의 표시 순서와 중복 요약만 보완했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESULT-FIRST-20261005, E-UI-CONTRACT-RESULT-FIRST-20261005, E-DEPLOY-PIPELINE-RESULT-FIRST-20261005, E-LIVE-PUBLIC-RESULT-FIRST-20261005.

## Current Release Recheck — e48acaa — 2026-10-05

- AC-004 모바일·키보드·보조기기 모션 선호 대응: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #257과 main 공개 배포 workflow 37239457353이 성공했고, 공개 URL validator가 candidate e48acaa917d2063273757c12f715316ab585ecdb를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 전역 reduced-motion 보정은 시스템 설정에 따른 UI 동작만 변경했으며 연구 수치·출처·공개 카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-REDUCED-MOTION-20261005, E-UI-CONTRACT-REDUCED-MOTION-20261005, E-DEPLOY-PIPELINE-REDUCED-MOTION-20261005, E-LIVE-PUBLIC-REDUCED-MOTION-20261005.

## Current Release Recheck — 7a111d8 — 2026-10-05

- AC-001 공개 URL·정적 번들·최신 main candidate 일치: PASS.
- AC-005 보호 배포 게이트·TF pulse freshness·release status: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #255와 main 공개 배포 workflow 37238318730이 성공했고, 공개 URL validator가 candidate 7a111d831fecfa42e74c0947ca4f40238c912e37을 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- heartbeat 변경은 내부 freshness gate 기록에 한정되며 공개 연구자료·카피·제품 데이터는 변경하지 않았다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-TF-PULSE-HEARTBEAT-20261005, E-DEPLOY-PIPELINE-TF-PULSE-HEARTBEAT-20261005, E-LIVE-PUBLIC-TF-PULSE-HEARTBEAT-20261005, E-RELEASE-STATUS-TF-PULSE-HEARTBEAT-20261005.

## Current Release Recheck — c9b3eda — 2026-10-05

- AC-004 본문 장 메뉴·직접 장 딥링크의 실제 제목 포커스 handoff: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #254와 main 공개 배포 workflow 37237686704가 성공했고, 공개 URL validator가 candidate c9b3edabc6c11e4b0eae3a64479599dfed1bb077을 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-GUIDE-HEADING-FOCUS-20261005, E-UI-CONTRACT-GUIDE-HEADING-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-HEADING-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-HEADING-FOCUS-20261005.

## Current Release Recheck — d545013 — 2026-10-05

- AC-004 일반 장 메뉴·직접 장 딥링크의 키보드·보조기기 제목 포커스 handoff: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #253과 main 공개 배포 workflow 37236810722가 성공했고, 공개 URL validator가 candidate d5450135891a6e871561d4a1fe97e1820ca88701을 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-GUIDE-CHAPTER-FOCUS-20261005, E-UI-CONTRACT-GUIDE-CHAPTER-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-CHAPTER-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-CHAPTER-FOCUS-20261005.

## Current Release Recheck — 13cb639 — 2026-10-05

- AC-004 연구 직접 딥링크·hash 변경의 키보드·보조기기 포커스 handoff: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #252와 main 공개 배포 workflow 37235537953이 성공했고, 공개 URL validator가 candidate 13cb6399b3ef5314e95f75c2edd649fab0fd41f9를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-UI-CONTRACT-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005.

## Current Release Recheck — 544ce7d — 2026-10-05

- AC-004 연구 지도·다음 연구 이동의 키보드·보조기기 포커스 handoff: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #251과 main 공개 배포 workflow 37234697205가 성공했고, 공개 URL validator가 candidate 544ce7d3112a8f6a50e9813f85b1e421c4e41e4a를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-GUIDE-RESEARCH-FOCUS-20261005, E-UI-CONTRACT-GUIDE-RESEARCH-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-RESEARCH-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-RESEARCH-FOCUS-20261005.

## Current Release Recheck — b393393d — 2026-10-05

- AC-004 본문으로 이동 링크의 키보드·보조기기 포커스 기준: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #250과 main 공개 배포 workflow 37233770435가 성공했고, 공개 URL validator가 candidate b393393d44d829bf5b735d3218cc4c8cde34aaa1를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-GUIDE-SKIP-FOCUS-20261005, E-UI-CONTRACT-GUIDE-SKIP-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-SKIP-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-SKIP-FOCUS-20261005.

## Current Release Recheck — bd2adafd — 2026-10-05

- AC-003 장 이동·전문가 영상 공유 맥락 보존: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #249와 main 공개 배포 workflow 37232929565가 성공했고, 공개 URL validator가 candidate bd2adafd5d1112f4f6cb0465a1f9c7e94a846454를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-GUIDE-ROUTE-CONTEXT-20261005, E-UI-CONTRACT-GUIDE-ROUTE-CONTEXT-20261005, E-DEPLOY-PIPELINE-GUIDE-ROUTE-CONTEXT-20261005, E-LIVE-PUBLIC-GUIDE-ROUTE-CONTEXT-20261005.

## Current Release Recheck — 7e9adf5 — 2026-10-05

- AC-003 도입부와 본문 장 번호가 일치하는 읽기 진행 구조: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #248과 main 공개 배포 workflow 37232067717가 성공했고, 공개 URL validator가 candidate 7e9adf5aa26eaae5430089fa3b10553a709d0f6e를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-READING-PROGRESS-NUMBERING-20261005, E-UI-CONTRACT-READING-PROGRESS-NUMBERING-20261005, E-DEPLOY-PIPELINE-READING-PROGRESS-NUMBERING-20261005, E-LIVE-PUBLIC-READING-PROGRESS-NUMBERING-20261005.

## Current Release Recheck — 40c540b — 2026-10-05

- AC-003 첫 도입부와 중간 자동 전환 카드의 읽기 진행 명칭 구분: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #247와 main 공개 배포 workflow 37231321693가 성공했고, 공개 URL validator가 candidate 40c540b119088972ef6b180fd95b54b4931551a8를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RECOVERY-CONTEXT-20261005, E-UI-CONTRACT-RECOVERY-CONTEXT-20261005, E-DEPLOY-PIPELINE-RECOVERY-CONTEXT-20261005, E-LIVE-PUBLIC-RECOVERY-CONTEXT-20261005.

## Current Release Recheck — 85b1179 — 2026-10-05

- AC-003 첫 화면에서 수면·회복 설명 브리지로 이어지는 헤더 내비게이션과 읽기 진행: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #246와 main 공개 배포 workflow 37230507157가 성공했고, 공개 URL validator가 candidate 85b1179edca779d98682f77b15ef54a497305341를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-OPENING-BRIDGE-NAV-20261005, E-UI-CONTRACT-OPENING-BRIDGE-NAV-20261005, E-DEPLOY-PIPELINE-OPENING-BRIDGE-NAV-20261005, E-LIVE-PUBLIC-OPENING-BRIDGE-NAV-20261005.

## Current Release Recheck — b3fcffb — 2026-10-05

- AC-004 좁은 휴대폰 헤더 컨트롤·공유 토스트의 가로 안전영역 보정: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #245와 main 공개 배포 workflow 37229660026가 성공했고, 공개 URL validator가 candidate b3fcffbc5acb5515e45facd579c44e3d34b9c53c를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-HEADER-SAFE-AREA-20261005, E-UI-CONTRACT-MOBILE-HEADER-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-MOBILE-HEADER-SAFE-AREA-20261005, E-LIVE-PUBLIC-MOBILE-HEADER-SAFE-AREA-20261005.

## Current Release Recheck — 06d737f — 2026-10-05

- AC-004 모바일 공유·복사 완료 피드백의 하단 안전영역 보정: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #244와 main 공개 배포 workflow 37228652043가 성공했고, 공개 URL validator가 candidate 06d737f09c3cf915b29a8f7b7ddc0208b9006d6e를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수가 남아 있기 때문이다.

증적: E-LOCAL-BUILD-SHARE-TOAST-SAFE-AREA-20261005, E-UI-CONTRACT-SHARE-TOAST-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-SHARE-TOAST-SAFE-AREA-20261005, E-LIVE-PUBLIC-SHARE-TOAST-SAFE-AREA-20261005.

## Current Release Recheck — 83715cc — 2026-10-05

- AC-003 연구 지도에서 개별 연구 카드로 이어지는 직접 이동과 연구 결과 읽기 기준: PASS_WITH_CONDITIONS.
- AC-004 390px 모바일과 701–900px 태블릿형 모바일 폭의 안전영역을 고려한 연구 카드 장 이동 위치: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #243과 main 공개 배포 workflow 37227713682가 성공했고, 공개 URL validator가 candidate 83715cc9db72c90a401b4869497b549e8e404f04를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-UI-CONTRACT-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-LIVE-PUBLIC-RESEARCH-ANCHOR-SAFE-AREA-20261005.

## Current Release Recheck — 80436662 — 2026-10-05

- AC-004 390px 모바일과 701–900px 태블릿형 모바일 폭의 안전영역을 고려한 건너뛰기 링크·헤더·메뉴·장 이동 위치: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #242와 main 공개 배포 workflow 37226718498이 성공했고, 공개 URL validator가 candidate 80436662c1e26b397fca2253fe95d260e51f5dc2를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Browser/Playwright, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-SAFE-AREA-TABLET-20261005, E-UI-CONTRACT-MOBILE-SAFE-AREA-TABLET-20261005, E-DEPLOY-PIPELINE-MOBILE-SAFE-AREA-TABLET-20261005, E-LIVE-PUBLIC-MOBILE-SAFE-AREA-TABLET-20261005.

## Current Release Recheck — 74fc0300 — 2026-10-05

- AC-004 390px 모바일 대응과 iPhone 안전영역을 고려한 헤더·메뉴·장 이동 위치: PASS_WITH_CONDITIONS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #241과 main 공개 배포 workflow 37225805478이 성공했고, 공개 URL validator가 candidate 74fc03003db5af9f4e58c5a3b6a5480240ceba62를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: E-LOCAL-BUILD-MOBILE-SAFE-AREA-20261005, E-UI-CONTRACT-MOBILE-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-MOBILE-SAFE-AREA-20261005, E-LIVE-PUBLIC-MOBILE-SAFE-AREA-20261005.

## Current Release Recheck — 9131138a — 2026-10-05

- AC-003 전문가 영상 선택 카드에 현재 위치와 전체 영상 수를 표시하고, 모바일에서도 선택 상태를 빠르게 읽는 메타 정보: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #240과 main 공개 배포 workflow 37224932902가 성공했고, 공개 URL validator가 candidate 9131138aff6839851e6efdca4118a0bc9953fd66를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-INDEX-20261005, E-UI-CONTRACT-EXPERT-VIDEO-INDEX-20261005, E-DEPLOY-PIPELINE-EXPERT-VIDEO-INDEX-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-INDEX-20261005.

## Current Release Recheck — 84897891 — 2026-10-05

- AC-003 전문가 영상 다음의 읽기 흐름을 `연구를 읽는 기준 → 원문 출처`로 실제 페이지 순서와 일치시키고 모바일에서도 읽히는 안내 계층: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #239와 main 공개 배포 workflow 37224127512가 성공했고, 공개 URL validator가 candidate 8489789124bb7880bcbd369566a981181b1d7ffe를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-HANDOFF-20261005, E-UI-CONTRACT-EXPERT-VIDEO-HANDOFF-20261005, E-DEPLOY-PIPELINE-EXPERT-VIDEO-HANDOFF-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-HANDOFF-20261005.

## Current Release Recheck — 0e7836e — 2026-10-05

- AC-003 연구 지도에서 주제 선택 후 연구 카드의 대상·결과·해석으로 이어지는 안내와 모바일 줄바꿈: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #238과 main 공개 배포 workflow 37223345781이 성공했고, 공개 URL validator가 candidate 0e7836e6007b6bf16605c26386e5eaf57bcbb951를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-CUE-20261005, E-UI-CONTRACT-RESEARCH-MAP-CUE-20261005, E-DEPLOY-PIPELINE-RESEARCH-MAP-CUE-20261005, E-LIVE-PUBLIC-RESEARCH-MAP-CUE-20261005.

## Current Release Recheck — 13004052 — 2026-10-05

- AC-003 연구 카드 상단의 연구 범위 표식과 모바일 단일 열 범위·대상·영역 배치: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #237과 main 공개 배포 workflow 37222305395가 성공했고, 공개 URL validator가 candidate 13004052e50effcbf6d7011e04003e6ca0f0f23e를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESEARCH-SCOPE-CONTEXT-20261005, E-UI-CONTRACT-RESEARCH-SCOPE-CONTEXT-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCOPE-CONTEXT-20261005, E-LIVE-PUBLIC-RESEARCH-SCOPE-CONTEXT-20261005.

## Current Release Recheck — af43e264 — 2026-10-05

- AC-003 연구 카드 상단의 대상·방법·측정 연구 범위 라벨을 데스크톱·모바일에서 결과보다 먼저 읽히는 시각 계층으로 보강: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #236과 main 공개 배포 workflow 37221235472가 성공했고, 공개 URL validator가 candidate af43e264f5b6ca37f42937d49cd3b24b8576d3c9를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESEARCH-SCOPE-READABILITY-20261005, E-UI-CONTRACT-RESEARCH-SCOPE-READABILITY-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCOPE-READABILITY-20261005, E-LIVE-PUBLIC-RESEARCH-SCOPE-READABILITY-20261005.

## Current Release Recheck — c5a60fe — 2026-10-05

- AC-003 연구 카드의 대상·방법·측정 정보와 차트 핵심 결과 라벨을 데스크톱·모바일에서 빠르게 읽히는 시각 계층으로 보강: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #235와 main 공개 배포 workflow 37220018831이 성공했고, 공개 URL validator가 candidate c5a60fe085e9b2e042eeaf89bc75e562fce09234를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 NOT_READY를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: E-LOCAL-BUILD-RESEARCH-PROFILE-READABILITY-20261005, E-UI-CONTRACT-RESEARCH-PROFILE-READABILITY-20261005, E-DEPLOY-PIPELINE-RESEARCH-PROFILE-READABILITY-20261005, E-LIVE-PUBLIC-RESEARCH-PROFILE-READABILITY-20261005.

## Current Release Recheck — 1226c06 — 2026-10-05

- AC-003 연구 결과 도표의 각 지표에 GABA 결과 요약을 먼저 보여 주고, 해당 요약을 비교 레인보다 읽기 쉽게 표시하는 읽기 순서·시각 계층: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #234와 main 공개 배포 workflow `37219113458`이 성공했고, 공개 URL validator가 candidate `1226c0649618e5fa5fa231a49a082618ad035496`를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 `NOT_READY`를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: `E-LOCAL-BUILD-RESEARCH-VERDICT-READABILITY-20261005`, `E-UI-CONTRACT-RESEARCH-VERDICT-READABILITY-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-VERDICT-READABILITY-20261005`, `E-LIVE-PUBLIC-RESEARCH-VERDICT-READABILITY-20261005`.

## Current Release Recheck — 4036d0d — 2026-10-05

- AC-003 연구 결과 도표의 각 지표에 GABA 결과 요약을 먼저 보여 주는 읽기 순서: PASS.
- AC-005 로컬 UI 계약·품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- PR #233과 main 공개 배포 workflow `37217858013`이 성공했고, 공개 URL validator가 candidate `4036d0ddc109b00ddbbab9837f31b3f715596513`를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 `NOT_READY`를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: `E-LOCAL-BUILD-RESEARCH-OUTCOME-VERDICT-20261005`, `E-UI-CONTRACT-RESEARCH-OUTCOME-VERDICT-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-OUTCOME-VERDICT-20261005`, `E-LIVE-PUBLIC-RESEARCH-OUTCOME-VERDICT-20261005`.

## Current Release Recheck — 647df28 — 2026-10-05

- AC-001 공개 URL·정적 번들·라이브 candidate: PASS.
- AC-002 연구 확장 5개 영역 지도와 상세 카드의 모바일 주제 조작 가독성 계약: PASS.
- AC-005 로컬 품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 공개본은 GitHub Pages에 배포되어 있고 NAVI 기록 동기화 시점 `pnpm run validate:live-public`가 candidate `647df28185305e61915254693a052a6bc86c6ac8`에 대해 HTTP 200·STATIC·71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다. UI 코드는 `8ba4a76`에서 배포됐다.
- 완료 상태는 `NOT_READY`를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-TOUCH-20261005`, `E-UI-CONTRACT-RESEARCH-MAP-TOUCH-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-TOUCH-20261005`, `E-LIVE-PUBLIC-RESEARCH-MAP-TOUCH-20261005`.

## Current Release Recheck — 3510d2c — 2026-10-05

- AC-001 공개 URL·정적 번들·라이브 candidate: PASS.
- AC-002 모바일 회복 지도 구조와 단계 조작 계약: PASS.
- AC-005 로컬 품질·빌드·성능 예산: PASS.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS.
- 공개본은 GitHub Pages에 배포되어 있고 `pnpm run validate:live-public`가 HTTP 200·STATIC·71 bundle hashes·12 claims·6 master records·6 share pages·제품 독립 경계를 확인했다.
- 완료 상태는 `NOT_READY`를 유지한다. Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트, 독립 과학·규제 감수와 같은 외부 검증이 남아 있기 때문이다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-TOUCH-20261005`, `E-UI-CONTRACT-RECOVERY-MAP-TOUCH-20261005`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-TOUCH-20261005`, `E-LIVE-PUBLIC-RECOVERY-MAP-TOUCH-20261005`.

## 공유·연구 복사 버튼 모바일 터치 영역 배포 품질 게이트 — ca65f61 — 2026-10-05

- 사업자용 문장 복사·전체 복사·연구 결과 복사 동작을 데스크톱·모바일 44px 이상 터치 영역으로 명시하고 UI 계약 회귀 검사를 추가했다.
- PR #230과 main 공개 배포 workflow `37214622993`이 성공했고, 공개 URL validator가 merge commit `ca65f61af42522f51e7b20db1057c4bc71368529`를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71개 번들·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- 기능·배포 완료는 확인했지만 실제 브라우저·실기기 터치·고령 사용자 독해성은 외부 검증이 남아 있어 NAVI 상태는 USER_DECISION / NOT_READY, 결과는 PASS_WITH_CONDITIONS다.

증적: `E-LOCAL-BUILD-SHARE-CONTROLS-20261005`, `E-UI-CONTRACT-SHARE-CONTROLS-20261005`, `E-DEPLOY-PIPELINE-SHARE-CONTROLS-20261005`, `E-LIVE-PUBLIC-SHARE-CONTROLS-20261005`.

## 첫 화면 히어로 문구 최소화 배포 품질 게이트 — 2e31d60 — 2026-10-05

- 첫 화면의 중복 프리타이틀을 제거해 하나의 주 헤드라인에 시선을 모으고, 제목 시작 위치를 보정했다. UI 계약에 중복 프리타이틀 재유입 방어를 추가했다.
- PR #229와 main 공개 배포 workflow `37213839261`이 성공했고, 공개 URL validator가 최신 merge commit `2e31d603630fe64d2c3ec16a30f180f475b20d92`를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71개 번들·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- 기능·배포 완료는 확인했지만 실제 브라우저·실기기 시각 검증과 고령 사용자 독해성은 외부 검증이 남아 있어 NAVI 상태는 USER_DECISION / NOT_READY, 결과는 PASS_WITH_CONDITIONS다.

증적: `E-LOCAL-BUILD-MINIMAL-HERO-20261005`, `E-UI-CONTRACT-MINIMAL-HERO-20261005`, `E-DEPLOY-PIPELINE-MINIMAL-HERO-20261005`, `E-LIVE-PUBLIC-MINIMAL-HERO-20261005`.

## 전문가 영상 모바일 터치 영역 배포 품질 게이트 — 0b5a2a1 — 2026-10-05

- 전문가 영상 선택 공유 버튼과 주제 필터를 데스크톱·모바일 44px 이상 터치 영역으로 통일하고 UI 계약 회귀 검사를 추가했다.
- PR #228과 main 공개 배포 workflow `37212827380`이 성공했고, 공개 URL validator가 최신 merge commit `0b5a2a104ce4d8442e3210a0e12b1c8bbccaaaa9`를 HTTP 200 정적 사이트로 확인했다. 공개 검증은 71개 번들·12개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- 기능·배포 완료는 확인했지만 실제 브라우저·실기기 터치·고령 사용자 독해성은 외부 검증이 남아 있어 NAVI 상태는 USER_DECISION / NOT_READY, 결과는 PASS_WITH_CONDITIONS다.

증적: `E-LOCAL-BUILD-VIDEO-CONTROLS-20261005`, `E-UI-CONTRACT-VIDEO-CONTROLS-20261005`, `E-DEPLOY-PIPELINE-VIDEO-CONTROLS-20261005`, `E-LIVE-PUBLIC-VIDEO-CONTROLS-20261005`.

## 공개 공유 카드 분리 배포 품질 게이트 — 0e93fb3 — 2026-10-05

- 공개 root·guide·research 경로의 공유 미리보기를 제품·하루리듬 카드와 분리하고, GABA 공개 안내서 전용 1200×630 JPEG와 직접 안내서 런타임 메타데이터를 배포했다.
- 로컬 UI contract·typecheck·127 tests·production build/performance, PR #227 checks, main workflow `37211921700`의 Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·71개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- 새 과학 주장이나 제품 광고는 추가하지 않았다. 기능·배포 완료는 확인했지만 소셜 크롤러 캐시 갱신, 실제 브라우저·실기기·고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증이 남아 있어 NAVI 상태는 USER_DECISION / NOT_READY, 결과는 PASS_WITH_CONDITIONS다.

증적: `E-LOCAL-BUILD-SOCIAL-PREVIEW-20261005`, `E-UI-CONTRACT-SOCIAL-PREVIEW-20261005`, `E-DEPLOY-PIPELINE-SOCIAL-PREVIEW-20261005`, `E-LIVE-PUBLIC-SOCIAL-PREVIEW-20261005`.

## 큰 글씨 읽기 모드 가독성 강화 — 5f4f6c7 — 2026-10-04

- 본문·연구 도표의 큰 글씨 모드를 desktop 12%, mobile 10% 확대하고, 모바일 도표 방향 문구가 확대 상태에서도 자연스럽게 읽히도록 줄바꿈을 반영했다.
- PR #226과 main 공개 배포 workflow `37210637085`가 성공했고, 공개 URL validator가 최신 merge commit `5f4f6c7cd8d429da85e2f93f3beaf29571e437fa`를 HTTP 200 정적 사이트로 확인했다.
- 기능·배포 완료는 확인했지만 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증이 남아 있어 NAVI 상태는 USER_DECISION / NOT_READY, 결과는 PASS_WITH_CONDITIONS다.

증적: `E-LOCAL-BUILD-LARGE-TEXT-20261004`, `E-UI-CONTRACT-LARGE-TEXT-20261004`, `E-DEPLOY-PIPELINE-LARGE-TEXT-20261004`, `E-LIVE-PUBLIC-LARGE-TEXT-20261004`.

## 좁은 모바일 헤더 충돌 방지 — 5215ab5 — 2026-10-04

- 381–430px 모바일 헤더에서 로고가 우측 메뉴·큰 글씨·공유 버튼과 겹치지 않도록 폭을 보정했다. UI 계약에 해당 화면 폭 검사를 추가했다.
- PR #225와 main 공개 배포 workflow `37210073919`이 성공했고, 공개 URL validator가 최신 merge commit `5215ab5758e0e9e849ed634243e54c6e34c0e7cd`를 HTTP 200 정적 사이트로 확인했다.
- 기능·배포 완료는 확인했지만 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증이 남아 있어 NAVI 상태는 USER_DECISION / NOT_READY, 결과는 PASS_WITH_CONDITIONS다.

증적: `E-LOCAL-BUILD-NARROW-HEADER-20261004`, `E-UI-CONTRACT-NARROW-HEADER-20261004`, `E-DEPLOY-PIPELINE-NARROW-HEADER-20261004`, `E-LIVE-PUBLIC-NARROW-HEADER-20261004`.

## 연구 카드 원문 보기 링크 가독성 고도화 — 6248808 — 2026-10-04

- 연구 카드마다 읽기 쉬운 출처명과 분리된 `원문 보기` 액션을 제공하도록 고도화했다. 모바일 터치 높이 44px, 키보드 포커스 표시, 긴 출처명 줄바꿈을 반영했다.
- PR #224와 main 공개 배포 workflow `37209426168`이 성공했고, 공개 URL validator가 최신 merge commit `6248808a56db53bd1a5d5fb3b822f2d58a8fc3bf`를 HTTP 200 정적 사이트로 확인했다.
- 기능·배포 완료는 확인했지만 실제 브라우저·실기기·고령 사용자 독해성은 외부 검증이 남아 있어 NAVI 상태는 USER_DECISION / NOT_READY, 결과는 PASS_WITH_CONDITIONS다.

증적: `E-LOCAL-BUILD-RESEARCH-SOURCE-ACTION-20261004`, `E-UI-CONTRACT-RESEARCH-SOURCE-ACTION-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-SOURCE-ACTION-20261004`, `E-LIVE-PUBLIC-RESEARCH-SOURCE-ACTION-20261004`.

## 사업자용 전체 공유 복사 피드백 배포 품질 게이트 — 94bcd16 — 2026-10-04

- PR #223을 main에 병합하고 사업자용 GABA 핵심 5문장 전체 복사 성공을 버튼 자체의 `복사 완료` 상태로 표시하도록 공개 사이트를 업데이트했다. 개별 문장 복사와 동일한 모바일·키보드 피드백을 유지했다.
- main workflow `37208889644`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 candidate `94bcd1606e1521476e07f2057823517b6c8915ff`, HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인/Playwright 부재로 실제 클립보드·모바일 공유 UI, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-FULL-SHARE-COPY-ACK-20261004`, `E-UI-CONTRACT-FULL-SHARE-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-FULL-SHARE-COPY-ACK-20261004`, `E-LIVE-PUBLIC-FULL-SHARE-COPY-ACK-20261004`.

## 사업자용 공유 문장 개별 복사 피드백 배포 품질 게이트 — 5aa9f05 — 2026-10-04

- PR #222를 main에 병합하고 사업자용 GABA 핵심 5문장 각각의 복사 성공을 카드별 `복사 완료` 상태로 표시하도록 공개 사이트를 업데이트했다. 공유 문구·출처·제품 독립 경계는 유지했다.
- main workflow `37208090180`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 candidate `5aa9f05589d3878d0adc02cff01829198b29a344`, HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다. NAVI 문서 동기화 workflow `37208345128`도 같은 공개 경계를 재검증했으며 최종 candidate는 `df5c06aa3e75d2bfe4e471091b557050122d74dd`다.
- 완료 게이트는 닫지 않는다. Browser 플러그인/Playwright 부재로 실제 클립보드·모바일 공유 UI, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-SHARE-LINE-COPY-ACK-20261004`, `E-UI-CONTRACT-SHARE-LINE-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-SHARE-LINE-COPY-ACK-20261004`, `E-LIVE-PUBLIC-SHARE-LINE-COPY-ACK-20261004`.

## 연구 카드 복사 완료 상태 및 TF freshness 복구 배포 게이트 — bb5e260 — 2026-10-04

- PR #220을 main에 병합하고 연구 카드의 결과·출처 복사 성공을 카드별 ‘복사 완료’ 상태로 표시하도록 공개 사이트를 업데이트했다. 사업자 공유 문구·출처·제품 독립 경계는 유지했다.
- 첫 main 후보의 TF freshness 게이트가 heartbeat 487분/허용 480분으로 중단된 뒤, 공식 pulse run `37207031442`와 safe internal checks MET 증거를 사용해 보호 PR #221에서 heartbeat를 갱신했다. PR #221 병합 후 main workflow `37207209603`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다.
- live validator는 candidate `bb5e26036355650083eefe57cefc7cfd24993e9f`, HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. 완료 게이트는 닫지 않는다. Browser 플러그인/Playwright 부재로 실제 클립보드·모바일 공유 UI, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-COPY-ACK-20261004`, `E-UI-CONTRACT-RESEARCH-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-COPY-ACK-20261004`, `E-LIVE-PUBLIC-RESEARCH-COPY-ACK-20261004`, `E-TF-PULSE-REFRESH-20261004`.

## 연구 결과 공유 문맥 배포 품질 게이트 — 348f9b6 — 2026-10-04

- PR #219를 main에 병합하고, 연구 카드의 공유 결과에 연구 대상·방법·관찰 결과·연구 범위·원문 출처·해당 연구 딥링크를 포함하도록 공개 사이트를 업데이트했다. 사업자용 GABA 5문장 전체 복사에는 공개 안내서 링크를 포함했다.
- main workflow `37206009673`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인과 Playwright 부재로 실제 클립보드·모바일 공유 UI, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-SHARE-CONTEXT-20261004`, `E-UI-CONTRACT-RESEARCH-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-RESEARCH-SHARE-CONTEXT-20261004`.

## 전문가 영상 공유 링크 주제 필터 배포 품질 게이트 — 597bf37 — 2026-10-04

- PR #218을 main에 병합하고, 유효한 `?video=` 링크가 선택 영상·초기 재생 상태·주제 필터를 함께 복원하도록 공개 사이트를 업데이트했다.
- main workflow `37204949680`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인과 Playwright 부재로 직접 영상 재생·필터 전환의 브라우저 런타임 검증, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-CONTEXT-20261004`, `E-UI-CONTRACT-EXPERT-VIDEO-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-CONTEXT-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-CONTEXT-20261004`.

## 전문가 영상 공유 링크 직접 재생 배포 품질 게이트 — 2305b5b — 2026-10-04

- PR #217을 main에 병합하고, 유효한 `?video=` 링크가 선택 영상과 초기 재생 상태를 함께 복원하도록 공개 사이트를 업데이트했다. UI 계약 회귀 검사도 추가했다.
- main workflow `37203920793`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인과 Playwright 부재로 직접 영상 재생의 브라우저 런타임 검증, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-DEEPLINK-20261004`, `E-UI-CONTRACT-EXPERT-VIDEO-DEEPLINK-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-DEEPLINK-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-DEEPLINK-20261004`.

## 공유·직접 진입 해시와 모바일 폭 변경 배포 품질 게이트 — cf893f8 — 2026-10-04

- 공유·직접 진입 링크가 lazy 콘텐츠 정착 뒤 고정 헤더·읽기 레일 아래에 놓이도록 재정렬하고, 320px→390px 뷰포트 변경에서도 제목 기준선을 다시 계산하도록 보강했다. 사용자 입력 후에는 자동 재정렬을 멈춘다.
- PR #216 main 병합과 workflow `37202619125`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했고, Chrome DevTools fallback 320px·390px에서도 정렬과 공유 피드백을 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-DEEP-LINK-REALIGN-20261004`, `E-CDP-DEEP-LINK-REALIGN-20261004`, `E-DEPLOY-PIPELINE-DEEP-LINK-REALIGN-20261004`, `E-LIVE-PUBLIC-DEEP-LINK-REALIGN-20261004`.

## 초소형 모바일 회복 경로 마지막 행 배포 품질 게이트 — a13e82f — 2026-10-04

- 320px 이하에서 수면·회복 14단계 지도의 마지막 두 단계를 중앙 정렬해 6·6·2 경로의 시각적 리듬을 보완했다. 기존 터치 영역·390px 흐름·제품 독립 경계는 유지했다.
- PR #213 main 병합과 workflow `37200663786`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-NARROW-RECOVERY-END-20261004`, `E-CDP-NARROW-RECOVERY-END-20261004`, `E-DEPLOY-PIPELINE-NARROW-RECOVERY-END-20261004`, `E-LIVE-PUBLIC-NARROW-RECOVERY-END-20261004`.

## 초소형 모바일 회복 경로 배포 품질 게이트 — 5bf2921 — 2026-10-04

- 320px 이하에서 수면·회복 14단계 지도를 6·6·2의 3행으로 재배치하고 단계 버튼·아이콘을 키웠다. 390px 이상 흐름과 제품 독립 공개 경계는 유지했다.
- PR #212 main 병합과 workflow `37199796734`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-NARROW-RECOVERY-MAP-20261004`, `E-CDP-NARROW-RECOVERY-MAP-20261004`, `E-DEPLOY-PIPELINE-NARROW-RECOVERY-MAP-20261004`, `E-LIVE-PUBLIC-NARROW-RECOVERY-MAP-20261004`.

## 태블릿 읽기 진행 레일 기준선 정렬 배포 품질 게이트 — fc07f6f — 2026-10-04

- 701px·900px 태블릿의 헤더와 읽기 진행 레일을 같은 70px 기준선에 맞췄다. 공개 768px·390px에서 읽기 진행·제품 독립 안내·가로폭·오류 기준을 재확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TABLET-PROGRESS-ALIGN-20261004, E-CDP-TABLET-PROGRESS-ALIGN-20261004, E-DEPLOY-PIPELINE-TABLET-PROGRESS-ALIGN-20261004, E-LIVE-PUBLIC-TABLET-PROGRESS-ALIGN-20261004.

## 태블릿 히어로 공개 안내 패널 보강 배포 품질 게이트 — c0b08ee — 2026-10-04

- 701px·900px에서 제품 독립 과학 안내와 읽기 레일을 폭 340px 반투명 패널로 분리해 자연 이미지 위에서도 정보 계층이 유지되도록 했다. 768px·820px 가로폭·오류 기준을 확인했다.
- PR #210 main 병합과 workflow `37197239653`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TABLET-HERO-DISCLOSURE-20261004, E-CDP-TABLET-HERO-DISCLOSURE-20261004, E-DEPLOY-PIPELINE-TABLET-HERO-DISCLOSURE-20261004, E-LIVE-PUBLIC-TABLET-HERO-DISCLOSURE-20261004.

## 모바일 큰 글씨 제어 라벨 보강 배포 품질 게이트 — 37147625 — 2026-10-04

- 381px·430px에서 큰 글씨 제어 이름을 노출하고 320px 이하에서 컴팩트 터치 타깃을 유지해 모바일 헤더의 기능 식별성을 높였다. 큰 글씨 전환, 가로폭, 오류 기준을 로컬·공개 390px·320px에서 확인했다.
- PR #209 main 병합과 workflow `37196206238`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-TYPE-CONTROL-20261004, E-CDP-MOBILE-TYPE-CONTROL-20261004, E-DEPLOY-PIPELINE-MOBILE-TYPE-CONTROL-20261004, E-LIVE-PUBLIC-MOBILE-TYPE-CONTROL-20261004.

## 전문가 영상 갤러리 공개 화면 품질 게이트 — 73b32d2 — 2026-10-04

- 전문가 영상 9개와 주제 필터, 선택 즉시 재생 영역을 모바일·데스크톱 흐름으로 재점검했다. 390px에서는 2열 카드, 1440px에서는 선택 영상과 갤러리 병렬 구성이 유지됐다.
- 최신 정적 공개본 live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했고 NAVI project-state validation은 PASS였다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-VIDEO-GALLERY-QA-20261004, E-CDP-VIDEO-GALLERY-QA-20261004, E-LIVE-PUBLIC-VIDEO-GALLERY-QA-20261004.

## 좁은 모바일 연구 결과 카드 가독성 보강 배포 품질 게이트 — 53a7c41 — 2026-10-04

- 연구 결과 카드의 좁은 화면 라벨을 보정하고 350px 이하에서 지표명·결과값·방향 그래픽을 세 줄로 재배치해 320px에서도 읽기 순서를 분명하게 했다. 390px 레이아웃과 비정량 방향 안내·출처 연결은 유지했다.
- PR #207·#208 main 병합과 workflow `37194121269`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- Chrome DevTools fallback 320px·390px에서 지표명·결과값·방향 그래픽 순서·가로폭 일치·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-NARROW-SIGNAL-LABEL-20261004, E-CDP-NARROW-SIGNAL-LABEL-20261004, E-DEPLOY-PIPELINE-NARROW-SIGNAL-LABEL-20261004, E-LIVE-PUBLIC-NARROW-SIGNAL-LABEL-20261004.

## 성장·면역 연구 방향 그래픽 배포 품질 게이트 — 074822b — 2026-10-04

- 성장호르몬·면역 연구 결과 카드에 상승·하강 방향 그래픽과 자연어 결과를 추가해 모바일에서도 방향을 빠르게 읽도록 보완했다. 실제 효과 크기나 수치로 해석하지 않도록 비정량 안내와 출처 연결을 유지했다.
- PR #206 main 병합과 workflow `37192302993`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- Chrome DevTools fallback 390px·1440px에서 성장호르몬 그래픽 4개·면역 그래픽 3개·가로폭 일치·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-DIRECTION-GRAPHIC-20261004, E-CDP-DIRECTION-GRAPHIC-20261004, E-DEPLOY-PIPELINE-DIRECTION-GRAPHIC-20261004, E-LIVE-PUBLIC-DIRECTION-GRAPHIC-20261004.

## 비교 연구 결과 미터 보강 배포 품질 게이트 — 1cc9440 — 2026-10-04

- 비교 연구 카드에 5단계 질적 미터와 `더 많이·덜 증가/감소` 문구를 추가해 모바일에서도 비교 방향을 먼저 읽도록 보완했다. 실제 효과 크기나 수치로 해석하지 않도록 비정량 비교 안내와 출처 연결을 유지했다.
- PR #205 main 병합과 workflow `37190962129`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- Chrome DevTools fallback 390px·1440px에서 비교 도표의 네 방향 문구·미터·가로폭 일치를 확인했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-QUALITATIVE-METER-20261004, E-CDP-QUALITATIVE-METER-20261004, E-DEPLOY-PIPELINE-QUALITATIVE-METER-20261004, E-LIVE-PUBLIC-QUALITATIVE-METER-20261004.

## 연구 확장 지도 시작점·딥링크 방향 배포 품질 게이트 — c747f67 — 2026-10-04

- 연구 확장 장에 진입하면 인지 연구가 기본 활성화되고 특정 연구 딥링크에서는 지도·상세 카드·읽기 진행명이 동기화되도록 보완했다. 연구 지도의 첫 읽기 방향이 명확해졌으며 기존 제품 독립 안내와 연구 결과 표현은 유지됐다.
- PR #204 main 병합과 workflow `37189726191`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 로컬 및 공개 Playwright Chromium fallback 390px·1440px에서 인지 기본 활성화·피부 딥링크 동기화·가로폭·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-ENTRY-20261004, E-PLAYWRIGHT-RESEARCH-MAP-ENTRY-20261004, E-DEPLOY-PIPELINE-RESEARCH-MAP-ENTRY-20261004, E-LIVE-PUBLIC-RESEARCH-MAP-ENTRY-20261004.

## 수면·회복 14단계 현재 위치 표시 배포 품질 게이트 — 0641f60 — 2026-10-04

- 수면과 회복 14단계 지도 위에 현재 단계명과 진행 번호를 추가해 첫 방문자가 아이콘 지도와 큰 카드를 연결해 읽도록 보완했다. 단계 선택 시 지도·카드·진행 번호가 동기화되고 기존 3초 자동 전환·제품 독립 안내는 유지됐다.
- PR #203 main 병합과 workflow `37188742301`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 로컬 및 공개 Playwright Chromium fallback 390px·1440px에서 현재 단계 표시·14번째 카드 선택·가로폭·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RECOVERY-MAP-STAGE-CUE-20261004, E-PLAYWRIGHT-RECOVERY-MAP-STAGE-CUE-20261004, E-DEPLOY-PIPELINE-RECOVERY-MAP-STAGE-CUE-20261004, E-LIVE-PUBLIC-RECOVERY-MAP-STAGE-CUE-20261004.

## 사업자용 5문장 전체 복사 배포 품질 게이트 — 58bbc70 — 2026-10-04

- 첫 목표인 사업자 활용성을 높이기 위해 마지막 이야기 공유 장에 5문장 전체 복사 버튼을 추가했다. 기존 문장별 복사·제품 독립 공개 과학 문구·구매 CTA 부재는 유지했다.
- PR #202 main 병합과 workflow `37187761596`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 로컬 및 공개 Playwright Chromium fallback 390px·1440px에서 버튼 표시·216자 복사 결과·성공 상태·5개 카드·기존 연구 다음 이동·가로폭·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-BUSINESS-COPY-ALL-20261004, E-PLAYWRIGHT-BUSINESS-COPY-ALL-20261004, E-DEPLOY-PIPELINE-BUSINESS-COPY-ALL-20261004, E-LIVE-PUBLIC-BUSINESS-COPY-ALL-20261004.

## 연구 → 활용 → 발효와 안전 편집 흐름 배포 품질 게이트 — 8d493d3 — 2026-10-04

- 국내외 활용 카드 뒤에 `활용은 만들어지는 과정에서 이어집니다` 전환과 `발효와 안전` 다음 장을 연결해 공개 안내서의 후반 읽기 흐름을 보강했다. 제품 광고·구매 CTA·새로운 효능 주장은 추가하지 않았다.
- PR #201 main 병합과 workflow `37186666660`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 로컬 및 공개 Playwright Chromium fallback 390px·1440px에서 handoff 표시·발효와 안전 제목 연결·기존 연구 다음 이동·가로폭·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-APPLICATION-FERMENTATION-HANDOFF-20261004, E-PLAYWRIGHT-APPLICATION-FERMENTATION-HANDOFF-20261004, E-DEPLOY-PIPELINE-APPLICATION-FERMENTATION-HANDOFF-20261004, E-LIVE-PUBLIC-APPLICATION-FERMENTATION-HANDOFF-20261004.

## 사업자용 GABA 공유 패키지 배포 품질 게이트 — 02f8fac — 2026-10-04

- 첫 목표인 사업자 활용성을 높이기 위해 마지막 이야기 공유 장에 사업자용 안내를 먼저 노출하고, GABA의 기본 역할과 연구 흐름을 담은 5문장을 펼쳐 바로 복사할 수 있게 했다. 제품 광고·구매 CTA·새로운 효능 주장은 추가하지 않았다.
- PR #200 main 병합과 workflow `37185751209`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 로컬 및 공개 Playwright Chromium fallback 390px·1440px에서 안내 표시·5개 카드·복사 동작·가로폭·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-BUSINESS-SHARE-KIT-20261004, E-PLAYWRIGHT-BUSINESS-SHARE-KIT-20261004, E-DEPLOY-PIPELINE-BUSINESS-SHARE-KIT-20261004, E-LIVE-PUBLIC-BUSINESS-SHARE-KIT-20261004.

## 모바일 전문가 영상 정보 계층 배포 품질 게이트 — 0feb5743 — 2026-10-04

- PR #197의 모바일 보정이 main에 병합되고 GitHub Pages 공개본에 반영됐다. 700px 이하에서 제목·채널·공유 동작을 영상 프레임 앞에 배치했으며, 데스크톱 레이아웃은 유지했다.
- UI contract·typecheck·127개 테스트·production build·성능 예산과 배포 workflow 37182224154의 release verify·Pages·live smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·candidate `0feb5743dc81fe0f46c75972c8a1eb358ae25996`·12개 claim·6개 master record·제품 독립 경계를 확인했다.
- Playwright Chromium fallback 320·350·390·1440px에서 선택 제목 표시·9:16 비율·가로 넘침 없음·오류 0건을 확인했다. 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-CONTEXT-20261004, E-PLAYWRIGHT-MOBILE-VIDEO-CONTEXT-20261004, E-DEPLOY-PIPELINE-MOBILE-VIDEO-CONTEXT-20261004, E-LIVE-PUBLIC-MOBILE-VIDEO-CONTEXT-20261004.

## 공개 사이트 전 구간 배포 품질 게이트 — 66ec3c6 — 2026-10-04

- GitHub Pages 공개본에서 첫 화면·수면과 회복·연구 지도·전문가 영상·이야기 공유 장을 390px·1440px로 직접 감리했다. 10개 캡처 모두 가로 넘침·page error·console error가 없었고, 카드·도표·영상 갤러리·공유 장의 정보 계층과 자연 이미지 비율이 유지됐다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 live validator HTTP 200·STATIC·candidate `63bc6b1`·70개 번들 해시·제품 독립 공개 데이터 경계를 확인했다.
- 공개 배포 품질 기준은 통과했지만 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-VISUAL-PUBLISHING-20261004.

## 전문가 영상 공유·모바일 진행 문맥 공개 배포 게이트 — 34c5b08 — 2026-10-04

- PR #194에서 영상 선택 직후 공유 URL이 이전 장 문맥을 갖는 경합을 제거하고, PR #196에서 모바일 smooth scroll 중 진행 라벨이 선택 영상과 일치하도록 보완했다. heartbeat refresh PR #195 이후 main workflow 37181007734가 fresh TF pulse·Pages·라이브 smoke·release status를 모두 통과했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, Playwright Chromium fallback 390px·1440px 17/17, live validator HTTP 200·STATIC·candidate 34c5b08·70개 번들 해시·12개 claim·6개 master record·제품 독립 경계를 연결했다. Worker는 STATIC_ONLY로 유지됐다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-SHARE-20261004, E-PLAYWRIGHT-EXPERT-VIDEO-SHARE-20261004, E-DEPLOY-PIPELINE-EXPERT-VIDEO-SHARE-20261004, E-LIVE-PUBLIC-EXPERT-VIDEO-SHARE-20261004.

## 최종 NAVI 문서 동기화 공개 재검증 — cc312de — 2026-10-04

- NAVI 문서를 main에 동기화한 최종 공개 candidate에서 live validator와 55개 반응형·직접 진입 조합을 재실행했다. HTTP 200·정적 번들·공개 데이터 정합성·가로폭·페이지 오류·콘솔 오류 0건을 확인했다.
- 문서 동기화는 UI 코드를 바꾸지 않았고, 직전 91808af의 320px 연구 카드 폭 보정이 최종 공개본에 유지된다. 완료 게이트는 외부 검증 조건을 보존해 USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-NARROW-PHONE-20261004.

## 초소형 모바일 연구 카드 폭 및 공개본 전수 배포 게이트 — 91808af — 2026-10-04

- PR #193에서 320px 수면 연구 카드의 내부 그리드 최소 폭을 보정해 도표와 출처가 카드 안에서 축소되도록 했다. 연구 내용·수치·출처·제품 독립 경계는 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, Playwright Chromium fallback의 320·350·390·768·1440px × 11개 주요 장 직접 진입, PR checks, main workflow 37179404463, Pages·라이브 smoke·release status·live validator candidate 91808af가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지. 55개 레이아웃 조합에서 가로 넘침·페이지 오류·콘솔 오류는 0건이었다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-NARROW-PHONE-20261004, E-PLAYWRIGHT-NARROW-PHONE-20261004, E-DEPLOY-PIPELINE-NARROW-PHONE-20261004, E-LIVE-PUBLIC-NARROW-PHONE-20261004.

## 모바일 터치 중 수면·회복 카드 읽기 흐름 공개 배포 게이트 — e6802d3 — 2026-10-04

- PR #192에서 터치 시작부터 종료까지 수면·회복 카드의 현재 단계를 유지하고, 손가락을 떼면 3초 자동 전환을 재개하도록 보완했다. 스와이프는 다음 단계로 이동한 뒤 수동 정지 상태를 유지한다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 390px touch context, PR checks, main workflow 37178489672, Pages·라이브 smoke·release status·live validator candidate e6802d3가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-RECOVERY-TOUCH-20261004, E-PLAYWRIGHT-RECOVERY-TOUCH-20261004, E-DEPLOY-PIPELINE-RECOVERY-TOUCH-20261004, E-LIVE-PUBLIC-RECOVERY-TOUCH-20261004.

## 수면·회복 자동 카드 읽기 흐름 공개 배포 게이트 — cbf05f6 — 2026-10-04

- PR #191에서 수면·회복 14단계 카드의 상호작용 일시정지와 사용자 수동 일시정지를 분리했다. 읽기 중에는 현재 카드를 유지하고, 상호작용이 끝나면 3초 자동 전환을 재개하며 reduced-motion에서는 자동 전환을 끈다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 390px·1440px Chrome fallback, PR checks, main workflow 37177762069, Pages·라이브 smoke·release status·live validator candidate cbf05f6가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-RECOVERY-AUTOPLAY-20261004, E-PLAYWRIGHT-RECOVERY-AUTOPLAY-20261004, E-DEPLOY-PIPELINE-RECOVERY-AUTOPLAY-20261004, E-LIVE-PUBLIC-RECOVERY-AUTOPLAY-20261004.

## 모바일 연구 결과 도표 보조문구 공개 배포 게이트 — 43e5942 — 2026-10-04

- PR #190에서 연구 결과 도표의 모바일 증가·감소 방향 표기와 시각 요소 설명문을 키워, 320px·390px에서도 핵심 비교가 먼저 읽히도록 보완했다. 연구 수치·출처·제품 독립 경계는 유지했다.
- UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 320px·390px·768px·1440px Chrome fallback, PR checks, main workflow 37176650203, Pages·라이브 smoke·release status·live validator candidate 43e5942가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-RESEARCH-CHART-LEGIBILITY-20261004, E-PLAYWRIGHT-RESEARCH-CHART-LEGIBILITY-20261004, E-DEPLOY-PIPELINE-RESEARCH-CHART-LEGIBILITY-20261004, E-LIVE-PUBLIC-RESEARCH-CHART-LEGIBILITY-20261004.

## 반응형 헤더 경계 공개 배포 게이트 — 25c55f9 — 2026-10-04

- PR #189에서 861px 전환 시 잘리던 공유 버튼을 발견하고 compact 헤더·메뉴 배경을 900px까지 연장했다. 861px·900px는 터치 안전한 메뉴형 헤더, 920px 이상은 전체 내비게이션으로 유지된다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 390px·861px·900px·920px·1440px Chrome fallback, PR checks, main workflow 37175326245, Pages·라이브 smoke·release status·live validator candidate 25c55f9가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-TABLET-BREAKPOINT-20261004, E-PLAYWRIGHT-TABLET-BREAKPOINT-20261004, E-DEPLOY-PIPELINE-TABLET-BREAKPOINT-20261004, E-LIVE-PUBLIC-TABLET-BREAKPOINT-20261004.

## 태블릿 헤더 큰 글씨 조절 표식 공개 배포 게이트 — 45a01bf — 2026-10-04

- PR #188에서 701–860px 태블릿 헤더의 빈 큰 글씨 조절 버튼을 `가+` 표식이 보이는 컨트롤로 보완했다. 접근성 레이블·44px 터치 영역과 기존 모바일·데스크톱 표현은 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 320px·390px·768px·1440px Chrome fallback, PR checks, main workflow 37174574201, Pages·라이브 smoke·release status·live validator candidate 45a01bf가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-TABLET-READING-CONTROL-20261004, E-PLAYWRIGHT-TABLET-READING-CONTROL-20261004, E-DEPLOY-PIPELINE-TABLET-READING-CONTROL-20261004, E-LIVE-PUBLIC-TABLET-READING-CONTROL-20261004.

## 모바일 연구 기준 범례 가독성 공개 배포 게이트 — 746fd126 — 2026-10-04

- PR #187에서 모바일 연구 기준 범례를 세로 흐름으로 정리하고, 연구 기준 제목·범례·설명 글자 크기를 13px·13px·12px로 조정했다. 연구 확장 제목의 줄바꿈 뒤 공백을 보존했으며, 기존 연구 내용·수치·출처·제품 독립 경계는 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 390px·1440px Chrome fallback, PR checks, main workflow 37173572877, Pages·라이브 smoke·release status·live validator candidate 746fd126이 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-MOBILE-RESEARCH-LEGEND-20261004, E-PLAYWRIGHT-MOBILE-RESEARCH-LEGEND-20261004, E-DEPLOY-PIPELINE-MOBILE-RESEARCH-LEGEND-20261004, E-LIVE-PUBLIC-MOBILE-RESEARCH-LEGEND-20261004.

## 모바일 연구 읽기 순서 가독성 공개 배포 게이트 — 76b3adc — 2026-10-04

- PR #186에서 모바일 연구 지도 아래의 읽는 순서를 지도·대상·결과·해석 4단계 시각 순서표로 보완했다. 모바일 13px 본문과 30px 번호 원형으로 시각적 비교성을 높였고, 기존 연구 내용·수치·출처·제품 독립 경계는 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 390px·1440px Chrome fallback, PR checks, main workflow 37172733343, Pages·라이브 smoke·release status·live validator candidate 76b3adc가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-RESEARCH-READ-ORDER-20261004, E-PLAYWRIGHT-RESEARCH-READ-ORDER-20261004, E-DEPLOY-PIPELINE-RESEARCH-READ-ORDER-20261004, E-LIVE-PUBLIC-RESEARCH-READ-ORDER-20261004.

## Expert Video Poster Resilience Release Gate — c97d2ac — 2026-10-04

- PR #185에서 원격 YouTube 썸네일이 응답하지 않아도 주제별 자연 이미지 fallback 포스터가 보이도록 보완하고, 실제 썸네일 우선 표시와 영상 선택·즉시 재생 흐름을 유지했다. 지원하지 않는 iframe `web-share` 권한 토큰도 제거했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px·1440px Chrome fallback, PR checks, main workflow `37171708026`, Pages·라이브 smoke·release status·live validator candidate `c97d2ac`가 연결됐다.
- NAVI 문서 동기화 당시 live validator candidate `88c6efd`에서도 HTTP 200·STATIC·번들 70개와 공개 경계를 재확인했다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-POSTERS-20261004`, `E-PLAYWRIGHT-EXPERT-VIDEO-POSTERS-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-POSTERS-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-POSTERS-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-POSTERS-FINAL-20261004`.

## Research Comparison Direction Release Gate — 86891bc — 2026-10-04

- PR #184에서 연구 결과 도표의 상대 비교 막대가 같은 길이로 보이던 문제를 보완했다. 비교 조건과 GABA 조건의 변화 방향을 먼저 시각적으로 구분하고, 실제 효과 크기로 읽히지 않도록 기존 안내 문구를 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px·1440px Chrome fallback, PR checks, main workflow `37170799368`, Pages·라이브 smoke·release status·live validator candidate `86891bc`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-PLAYWRIGHT-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-LIVE-PUBLIC-RESEARCH-COMPARISON-DIRECTION-20261004`.

## Mobile Expert Video Gallery Release Gate — a77c91c — 2026-10-04

- PR #183에서 390px 모바일 전문가 영상 게시판을 썸네일 중심 2열 갤러리로 정리하고, 350px 이하에서는 1열 카드로 복귀하도록 보완했다. 제목·채널명·선택 상태의 가독성을 유지하면서 영상 선택·즉시 재생·출처·공유 흐름은 그대로 두었다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 320px·390px·1440px Chrome fallback, PR checks, main workflow `37169365913`, Pages·라이브 smoke·release status·live validator candidate `a77c91c`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. 320px에서 관찰된 외부 YouTube `compute-pressure` 경고는 재실행에서 사라졌지만 브라우저별 iframe 검증을 남기며, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-VIDEO-GALLERY-20261004`, `E-PLAYWRIGHT-MOBILE-VIDEO-GALLERY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-VIDEO-GALLERY-20261004`, `E-LIVE-PUBLIC-MOBILE-VIDEO-GALLERY-20261004`.

## Final Chapter Signal Release Gate — ec2a1bd — 2026-10-04

- PR #182에서 마지막 이야기 공유 장의 데스크톱 시각 균형을 보완했다. 저채도 동심원 신호와 GABA 워터마크를 추가했으며, 모바일에서는 낮은 대비·하단 배치로 핵심 문구와 공유 행동을 우선했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px·1440px 마지막 장, 공개 390px 회복 카드 focus-visible 상호작용, PR checks, main workflow `37168287853`, Pages·라이브 smoke·release status·live validator candidate `ec2a1bd`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-FINAL-SIGNAL-20261004`, `E-PLAYWRIGHT-FINAL-SIGNAL-20261004`, `E-DEPLOY-PIPELINE-FINAL-SIGNAL-20261004`, `E-LIVE-PUBLIC-FINAL-SIGNAL-20261004`.

## Recovery Map Affordance Release Gate — 8e22d51 — 2026-10-04

- PR #181에서 모바일 수면·회복 보충 구간의 14단계 읽기 지도를 보강했다. 아이콘·번호를 더 선명하게 표시하고 focus-visible·선택 상태를 연결해 다음 카드를 찾는 흐름을 개선했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px 회복 지도, PR checks, main workflow `37167336445`, Pages·라이브 smoke·release status·live validator candidate `8e22d51`이 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-AFFORDANCE-20261004`, `E-PLAYWRIGHT-RECOVERY-MAP-AFFORDANCE-20261004`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-AFFORDANCE-20261004`, `E-LIVE-PUBLIC-RECOVERY-MAP-AFFORDANCE-20261004`.

## Expert Video Loading Continuity Release Gate — 44337e5 — 2026-10-04

- PR #179에서 전문가 영상 iframe 로딩 중에도 기존 Shorts 썸네일을 유지하고 로딩 상태를 겹쳐 표시하도록 보완했다. 선택 영상의 9:16 프레임과 기존 재생·공유 흐름은 유지된다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px 포스터 상태, 320px·390px·1440px 대표 감사, PR checks, main workflow `37166334839`, Pages·라이브 smoke·release status·live validator candidate `44337e5`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-LOADING-POSTER-20261004`, `E-PLAYWRIGHT-VIDEO-LOADING-POSTER-20261004`, `E-DEPLOY-PIPELINE-VIDEO-LOADING-POSTER-20261004`, `E-LIVE-PUBLIC-VIDEO-LOADING-POSTER-20261004`.

## Mobile Label and Media Release Gate — a2a2d3f — 2026-10-04

- PR #178에서 320px 모바일 첫 화면의 보조 문구를 12px로 조정하고, 전문가 세로 영상 영역을 250x444px로 확장했다. 9:16 프레임은 유지되어 시각 비율을 손상하지 않는다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 320px·390px Chrome fallback, PR checks, main workflow `37165443025`, Pages·라이브 smoke·release status·live validator candidate `a2a2d3f`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-LABEL-MEDIA-20261004`, `E-PLAYWRIGHT-MOBILE-LABEL-MEDIA-20261004`, `E-DEPLOY-PIPELINE-MOBILE-LABEL-MEDIA-20261004`, `E-LIVE-PUBLIC-MOBILE-LABEL-MEDIA-20261004`.

## Interlude Copy Release Gate — eded7a9 — 2026-10-04

- PR #177에서 수면과 회복 연결 구간의 상단 진행 문구를 `다음 장으로 이어져요`로 정리하고, 보조기기 안내와 공개 화면의 의미를 맞췄다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px Chrome fallback, 320px·1440px 대표 감사, PR checks, main workflow `37164504662`, Pages·라이브 smoke·release status·live validator candidate `eded7a9`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 한 차례 YouTube iframe의 Chrome Permissions Policy `compute-pressure` 경고가 있었으나 즉시 재검증에서 재현되지 않았다. 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-INTERLUDE-COPY-20261004`, `E-PLAYWRIGHT-INTERLUDE-COPY-20261004`, `E-DEPLOY-PIPELINE-INTERLUDE-COPY-20261004`, `E-LIVE-PUBLIC-INTERLUDE-COPY-20261004`.

## Same-page Hash Context Release Gate — a8689a3 — 2026-10-04

- PR #176에서 같은 페이지 해시 이동 시 장 제목·읽기 진행 레일·연구 선택 상태가 함께 바뀌도록 보완했다. 초기 진입 안정화 타이머는 새 해시를 덮어쓰지 않는다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px Chrome fallback의 recovery-break→research-skin→expert-videos 이동, PR checks, main workflow `37163479968`, Pages·라이브 smoke·release status·live validator candidate `a8689a3`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-HASH-CONTEXT-20261004`, `E-PLAYWRIGHT-HASH-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-HASH-CONTEXT-20261004`, `E-LIVE-PUBLIC-HASH-CONTEXT-20261004`.

## Mobile Menu Focus Restoration Release Gate — 510e9ad — 2026-10-04

- PR #163에서 모바일 메뉴 항목 이동·배경 클릭으로 닫히는 두 경로의 포커스를 메뉴 토글로 복귀시켰다. 공개 390px Chrome fallback 상호작용과 로컬 품질검사, PR checks, main workflow `37149705144`, Pages 라이브 smoke·release status·live validator candidate `510e9ad`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS-20261004`, `E-PLAYWRIGHT-MOBILE-MENU-FOCUS-20261004`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS-20261004`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS-20261004`.

## Direct Hash Entry Release Gate — 70d66b5 — 2026-10-04

- PR #162에서 직접 해시 진입 시 초기 정렬을 동기화하고 안정화 재정렬 시간을 줄였다. 로컬 검증과 공개 390px Chrome fallback 세 해시 검증, main workflow `37148328986`, GitHub Pages 라이브 validator가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, candidate SHA `70d66b5`, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 6개 share page, 제품 독립 공개 경계 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-DIRECT-HASH-NAV-20261004`, `E-PLAYWRIGHT-DIRECT-HASH-NAV-20261004`, `E-DEPLOY-PIPELINE-DIRECT-HASH-NAV-20261004`, `E-LIVE-PUBLIC-DIRECT-HASH-NAV-20261004`.

## Mobile Reading Clarity Release Gate — 37737d2 — 2026-10-04

- 이번 보완은 모바일 기능 라벨의 최소 가독성과 읽기 크기 조절의 시각 단서를 강화한 범위다. 로컬 검증과 공개 Chrome fallback 320/390/1440px 검증, PR #161 병합, main workflow `37147186088`, GitHub Pages 라이브 validator가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, candidate SHA `37737d2`, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 6개 share page, 제품 독립 공개 경계 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-READING-CLARITY-20261004`, `E-PLAYWRIGHT-MOBILE-READING-CLARITY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-READING-CLARITY-20261004`, `E-LIVE-PUBLIC-MOBILE-READING-CLARITY-20261004`.

## Expert Video Thumbnail Resolution Release Recheck — 52ff08b — 2026-10-04

- 전문가 영상 썸네일이 오류가 아닌 저해상도 성공 응답을 반환하는 경우에도 decoded width를 검사해 대체 이미지를 시도하고, 두 이미지 모두 기준 미달이면 `GABA VIDEO` 표지를 보여주도록 보완했다.
- 로컬 typecheck·UI contract·127 tests·build, 로컬·공개 저해상도 강제 Playwright, 320/390/1440px 공개 정상 로딩, main workflow `37145916564`, Pages·라이브 smoke·release status와 공개 validator candidate `52ff08b`를 통과했다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-RESOLUTION-20261004`.

## Expert Video Thumbnail Fallback Release Recheck — 342f43f — 2026-10-04

- 기본·대체 썸네일이 모두 실패하는 상황에서도 빈 박스가 아닌 `GABA VIDEO` 표지가 보이도록 전문가 영상 게시판의 실패 상태를 보완했다.
- 로컬 typecheck·UI contract·127 tests·build, 390px 강제 이중 실패 Playwright, PR #158 checks, main workflow `37144428732`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 candidate는 `342f43ff5242a44e5a32cb9c3909be5c37c3809b`다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-FALLBACK-20261004`.

## Expert Video Thumbnail Release Recheck — 8093615 — 2026-10-04

- 전문가 영상 게시판의 첫 4개 썸네일 eager 로드와 지연 로드용 `GABA VIDEO` 표지를 추가해 모바일 초기 빈 썸네일 문제를 보완했다. 320/390/1440px에서 가로 넘침 없음·브라우저 오류 없음, 필터 4개 카드 전환, 영상 선택·iframe 로딩 상태를 확인했다.
- 로컬 typecheck·UI contract·127 tests·build, PR #155 checks, main workflow `37142835851`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 candidate는 `8093615ce8cebac23d1baf941ec1ea5d503bbcce`다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAILS-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAILS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAILS-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAILS-20261004`.

## Mobile Definition Card Motif Release Recheck — 4e558ee — 2026-10-04

- GABA 기본 설명 카드의 장식 아이콘이 모바일 본문과 겹치지 않도록 하단 읽기 여백을 추가했다. 320/390px에서 본문-아이콘 간격 6px와 가로 넘침 없음, 브라우저 오류 없음을 확인했다.
- 로컬 typecheck·UI contract·127 tests·build, PR #153 checks, main workflow `37141668244`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 candidate는 `4e558eeefec8e9cbbb133629658fb0b5b28b7762`다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-DEFINITION-MOTIF-20261004`, `E-PLAYWRIGHT-DEFINITION-MOTIF-20261004`, `E-DEPLOY-PIPELINE-DEFINITION-MOTIF-20261004`, `E-LIVE-PUBLIC-DEFINITION-MOTIF-20261004`.

## Mobile Research Card Width Release Recheck — 7a6db416 — 2026-10-04

- 모바일 연구 결과 카드의 내부 폭을 가용 폭으로 보정해 320px·390px에서 도표 문구가 더 자연스럽게 읽히도록 고도화했다. 연구 문구·데이터·해석·출처와 제품 독립 경계는 그대로 유지했다.
- 로컬 typecheck/UI contract/127 tests/build, PR #151 검사, main workflow `37140273727`, GitHub Pages 배포·라이브 smoke·release status, 공개 validator와 320/390/1440px Playwright Chrome fallback이 통과했다. 공개 candidate는 `7a6db416a08d78a8d3bd31f4c66bca89f5c1b2c8`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-CARD-WIDTH-20261004`, `E-PLAYWRIGHT-RESEARCH-CARD-WIDTH-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-CARD-WIDTH-20261004`, `E-LIVE-PUBLIC-RESEARCH-CARD-WIDTH-20261004`.

## Chapter Entry Clearance Release Recheck — b9f21d0 — 2026-10-04

- 장 진입 시 제목만 보이던 위치를 장 헤더 전체가 보이는 위치로 보정해 모바일에서도 `06 · 연구의 확장` 같은 장 표시와 제목을 함께 읽도록 고도화했다.
- 로컬 typecheck/UI contract/127 tests/build, PR #149 검사, main workflow `37139270708`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 320/390/1440px Playwright에서 `#research` 직접 진입 시 장 표시가 진행 바 아래에 있고, 가로 넘침과 브라우저 오류가 없음을 확인했다.
- 공개 candidate는 `b9f21d0ceba52e0d3ea4745d65232e3661ffd7ea`이며, 제품 독립 과학 안내·연구 데이터·출처 경계는 유지했다. 외부 브라우저·실사용자·독립 과학·규제 검토가 남아 NAVI 상태는 `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-CHAPTER-ENTRY-20261004`, `E-PLAYWRIGHT-CHAPTER-ENTRY-20261004`, `E-DEPLOY-PIPELINE-CHAPTER-ENTRY-20261004`, `E-LIVE-PUBLIC-CHAPTER-ENTRY-20261004`.

## Mobile Expert Video Topic Visibility Release Recheck — 71960f0 — 2026-10-04

- 전문가 영상 주제 필터를 모바일 가로 스크롤에서 전체 노출형 줄바꿈으로 바꿔 320px·390px에서 7개 주제를 즉시 읽고 선택할 수 있게 고도화했다. 선택 후 `수용체` 영상 1개와 iframe 재생 상태를 확인했다.
- 로컬 typecheck/UI contract/127 tests/build, PR #147 검사, main workflow `37138030444`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 320/390/1440px Playwright Chrome fallback에서 모든 필터 표시·가로 넘침 없음·영상 선택 전환을 확인했다.
- 공개 candidate는 `71960f083e21577641074358b74a0ca447cdd216`이며, 제품 독립 과학 안내·연구 데이터·출처 경계는 유지했다. 외부 브라우저·실사용자·독립 과학·규제 검토가 남아 NAVI 상태는 `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-FILTERS-20261004`, `E-PLAYWRIGHT-VIDEO-FILTERS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-FILTERS-20261004`, `E-LIVE-PUBLIC-VIDEO-FILTERS-20261004`.

## Explicit Original-Source Action Release Recheck — 32b37a1 — 2026-10-04

- 출처 읽기 카드에 `원문 보기`를 명시해 모바일·고령 사용자도 원문 이동을 바로 이해하도록 고도화했다. 기존 네 가지 연구 읽기 질문과 Yoto et al. 2012 PubMed 예시는 유지했다.
- 로컬 typecheck/UI contract/127 tests/build, PR #145 검사, main workflow `37136765623`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 320/390/1440px Playwright에서 `원문 보기` 표시·PubMed 새 탭 이동·가로 넘침 없음·메뉴/연구 지도/전문가 영상 선택 재생을 확인했다.
- 공개 candidate는 `32b37a11a327a351b79a3822029d35d19d58bae6`이며, 제품 독립 과학 안내·연구 데이터·출처 경계는 유지했다. 외부 브라우저·실사용자·독립 과학·규제 검토가 남아 NAVI 상태는 `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-SOURCE-ACTION-20261004`, `E-PLAYWRIGHT-SOURCE-ACTION-20261004`, `E-DEPLOY-PIPELINE-SOURCE-ACTION-20261004`, `E-LIVE-PUBLIC-SOURCE-ACTION-20261004`.

## Source Reading Bridge Release Recheck — a8cc869 — 2026-10-04

- `출처 읽기` 구간을 네 가지 연구 읽기 질문과 Yoto et al. 2012 PubMed 원문 예시가 연결된 편집형 브리지로 고도화했다. 결과만 소비하지 않고 연구 대상·비교·관찰 결과·해석 범위를 한 흐름으로 읽게 하는 개선이다.
- 로컬 typecheck/UI contract/127 tests/build, PR #143 검사, main workflow `37135553445`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 320/390/1440px Playwright Chrome fallback에서 네 단계·원문 링크·가로 넘침 없음·메뉴/연구 지도/전문가 영상 선택 재생을 확인했다.
- 공개 UI 후보는 `a8cc869b2c1537b2568b2f0e99c31adc3eae9353`이며, 제품 독립 과학 안내·기존 연구 데이터·출처 경계는 유지했다. 외부 브라우저·실사용자·독립 과학·규제 검토가 남아 NAVI 상태는 `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-SOURCE-BRIDGE-20261004`, `E-PLAYWRIGHT-SOURCE-BRIDGE-20261004`, `E-DEPLOY-PIPELINE-SOURCE-BRIDGE-20261004`, `E-LIVE-PUBLIC-SOURCE-BRIDGE-20261004`.

## NAVI 문서 병합 후 최신 공개본 동기화 — 6212511 — 2026-10-04

- NAVI 문서 PR #141 병합 후 main workflow `37134462216`, Pages 배포, 라이브 smoke, release status와 공개 validator가 통과했다. 라이브 공개 candidate는 `621251166c2902a7ea2a8fae44b5230f97242ff9`다.
- 이번 동기화는 문서·증거 기록만 변경했으며 공개 UI, 과학 카피, 제품 독립 경계는 변경하지 않았다. 완료 게이트는 외부 브라우저·실사용자·독립 과학·규제 검토가 남아 `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LIVE-PUBLIC-NAVI-SYNC-20261004`.

## Mobile Chart Readability and Long-Jump Navigation Release Recheck — b778f23 — 2026-10-04

- 모바일 연구 결과 도표의 비교 조건·연구 메타데이터를 읽기 쉽게 보정하고, 사용자의 긴 장 이동을 초기 hash 정렬 타이머가 되돌리지 않도록 보완했다. 공개 과학 카피·제품 독립 경계·연구 출처는 변경하지 않았다.
- PR #140 검사, 로컬 typecheck/UI contract/127 tests/build, main workflow `37133909361`, GitHub Pages 배포, 라이브 smoke, release status, 공개 validator와 320/390/1440px Playwright Chrome fallback이 통과했다. 공개 candidate는 `b778f23b65a67cf919171d212a9305927a34d0ff`다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-CHART-NAV-20261004`, `E-PLAYWRIGHT-MOBILE-CHART-NAV-20261004`, `E-DEPLOY-PIPELINE-CHART-NAV-20261004`, `E-LIVE-PUBLIC-CHART-NAV-20261004`.

## Narrow-phone Sleep Layout Release Recheck — 81d9dbb — 2026-10-03

- 320px 협소 화면에서 수면 연구 카드가 화면 밖으로 밀리던 레이아웃 문제를 `min-width: 0`과 `minmax(0, 1fr)`로 보완했다. 공개 카피·제품 독립 경계와 연구 내용은 변경하지 않았다.
- PR #126 필수 검사, 로컬 typecheck/UI contract/test/build, Playwright Chrome 320/390/1440px 레이아웃과 390px 상호작용, main workflow `37123264421`, Pages/live validator가 통과했다. 공개 UI 후보는 `81d9dbba61ec9080a58be8c5b0824843b0a13ed9`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-NARROW-SLEEP-20261003`, `E-PLAYWRIGHT-NARROW-SLEEP-20261003`, `E-DEPLOY-PIPELINE-NARROW-SLEEP-20261003`, `E-LIVE-PUBLIC-NARROW-SLEEP-20261003`.

## Hero Headline Rhythm and Highlight Release Recheck — f209269 — 2026-10-03

- 데스크톱 히어로의 모바일 전용 줄바꿈·색상 상속 범위를 직계 제목 요소로 제한해 `GABA에서 읽습니다`를 한 문장으로 읽히게 했고, 모바일의 의도된 줄바꿈과 teal 강조는 유지했다. 공개 카피·제품 독립 경계는 변경하지 않았다.
- PR #124 필수 검사, 로컬 typecheck/UI contract/test/build, Playwright 390/1440px 상호작용 2건, main workflow `37121944648`, Pages/live validator, 공개 320/390/1440px 캡처가 통과했다. 공개 후보는 `f2092694c7f3fb6e7ea940de828f1577769a6bf3`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-HERO-RHYTHM-20261003`, `E-PLAYWRIGHT-HERO-RHYTHM-20261003`, `E-DEPLOY-PIPELINE-HERO-RHYTHM-20261003`, `E-LIVE-PUBLIC-HERO-RHYTHM-20261003`.

## Mobile Hero and Narrow Header Release Recheck — badde8b — 2026-10-03

- 모바일 히어로를 단일 열로 전환해 데스크톱 비주얼 트랙 때문에 제목이 잘리던 문제를 제거하고, 430px 이하에서 메뉴·큰 글씨·공유 컨트롤을 44px 아이콘 버튼으로 화면 안에 고정했다. 공개 카피·제품 독립 경계는 유지했다.
- PR #121의 필수 검사, main workflow `37120130983`, Pages/live validator, 로컬·라이브 Playwright Chrome 실제 viewport 320/390/1440px 시각 검증이 통과했다. 공개 후보는 `badde8b982e1cee73b3a75d3513e65fcc38508c9`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-HERO-20261003`, `E-PLAYWRIGHT-MOBILE-HERO-20261003`, `E-DEPLOY-PIPELINE-MOBILE-HERO-20261003`, `E-LIVE-PUBLIC-MOBILE-HERO-20261003`.

## Research Scale Infographic Release Recheck — b8e6236 — 2026-10-03

- 연구 규모 인포그래픽을 고도화해 같은 PubMed 검색 기준의 Harvard·Oxford 문헌은 기관 비교로, 별도 WoS Core Collection SCIE 분석은 독립된 강조 수치로 읽히도록 분리했다. 연구 카피·제품 경계는 유지했다.
- PR #119 checks, main workflow `37118207429`, Pages/live validator, 390px·320px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `b8e6236d6dc749ea23191e45dd58d0ab9c542a0a`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-SCALE-20261003`, `E-CDP-RESEARCH-SCALE-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-SCALE-20261003`, `E-LIVE-PUBLIC-RESEARCH-SCALE-20261003`.

## Research Reading Orientation Release Recheck — 77a3032 — 2026-10-03

- 긴 연구 카드 구간의 sticky 읽기 레일이 현재 활성 연구 결과 제목을 보여주도록 고도화했다. 390px에서 지도 피부 선택 → `피부 연구 결과` 레일 → `research-skin` 카드 도착 흐름을 확인했고, 320px 한 열·1440px 데스크톱 레이아웃도 유지했다.
- PR #117 checks, main workflow `37116937264`, Pages/live validator, 390/320/1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `77a30323d2e5097a0f2be092c013615b1ee2ddd6`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-RAIL-ORIENTATION-20261003`, `E-CDP-RESEARCH-RAIL-ORIENTATION-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-RAIL-ORIENTATION-20261003`, `E-LIVE-PUBLIC-RESEARCH-RAIL-ORIENTATION-20261003`.

## Mobile Research Comparison Release Recheck — 4058bf6 — 2026-10-03

- 연구 결과 비교 도표의 모바일 정보 밀도를 고도화해 390px에서는 두 조건을 좌우로 비교하고, 320px에서는 한 열로 읽도록 적용했다. 공개 과학 카피·제품 경계는 유지했다.
- PR #115 checks, main workflow `37115590977`, Pages/live validator, 390px·320px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `4058bf61ed25d8fc95b3023f1187cdd78436cdb4`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-COMPARISON-20261003`, `E-CDP-MOBILE-COMPARISON-20261003`, `E-DEPLOY-PIPELINE-MOBILE-COMPARISON-20261003`, `E-LIVE-PUBLIC-MOBILE-COMPARISON-20261003`.

## Expert Video Gallery Release Recheck — 10a6192 — 2026-10-03

- 전문가 영상 갤러리에 고해상도 썸네일, 안전한 대체 이미지, 모바일 필터 연속성 단서를 적용하고 PR #113을 main에 병합했다. 공개 과학 카피·제품 경계는 유지했다.
- PR #113 checks, main workflow `37114410997`, Pages/live validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `10a61920df8bbcbe1b6f288a1d61425f48687800`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-BROWSING-20261003`, `E-CDP-EXPERT-VIDEO-BROWSING-20261003`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-BROWSING-20261003`, `E-LIVE-PUBLIC-EXPERT-VIDEO-BROWSING-20261003`.

## Final Public Recheck — 16fc5d4 — 2026-10-03

- NAVI 문서 동기화 PR #111 병합과 main workflow `37113016531`의 release-verify·Pages 배포·라이브 smoke·release-status 성공을 확인했다.
- 최종 공개 validator는 HTTP 200과 70개 번들 해시, 공개 데이터 경계를 확인했다. 공개 사이트는 `https://kradavid.github.io/gaba_info/`에서 유지된다.
- 공개 배포 자동 게이트는 통과했지만 실제 브라우저·사용자·독립 과학·규제 감수는 남아 있으므로 NAVI 상태는 `USER_DECISION` / 완료 게이트 `NOT_READY`를 유지한다.

증적: `E-LIVE-PUBLIC-NAVI-MERGE-20261003`.

## Latest Release Recheck — cbd2f8e — 2026-10-03

- 연구 지도에서 선택한 주제가 상세 카드에서도 즉시 보이도록 활성 카드 강조와 선택 상태 동기화를 추가했다. 공개 과학 카피·제품 경계·연구 출처는 유지했다.
- PR #110 checks, main `37112425820`, Pages/live validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `cbd2f8ea1d5b341dbe5804b5f16f756e157c553b`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-ORIENTATION`, `E-CDP-RESEARCH-MAP-ORIENTATION`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-ORIENTATION`, `E-LIVE-PUBLIC-RESEARCH-MAP-ORIENTATION`.

## Latest Release Recheck — c6291f6 — 2026-10-03

- 공개 GABA 안내서 모바일 화면에서 작은 장 제목을 복원해 긴 페이지의 위치 단서를 강화했다. 공개 과학 카피·제품 경계는 유지했다.
- PR #108 checks, main `37111226511`, Pages/live validator, 320/390/1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `c6291f6bd2c62e77529da767b1d2a985f4acaab5`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-CHAPTER-LABELS`, `E-CDP-MOBILE-CHAPTER-LABELS`, `E-DEPLOY-PIPELINE-MOBILE-CHAPTER-LABELS`, `E-LIVE-PUBLIC-MOBILE-CHAPTER-LABELS`.

## Latest Release Recheck — 2ae71ef — 2026-10-03

- 공개 GABA 안내서의 모바일 장 진입점 제목이 고정 읽기 진행 레일에 가려지지 않도록 110px 상단 여백과 UI contract guard를 적용했다. 공개 과학 카피·제품 경계는 유지했다.
- PR #106 checks, main `37109900221`, Pages/live validator, 320/390/1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `2ae71ef1e1aa7c5ff71ca429197ad70c22dce3c1`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RAIL-TITLE-CLEAR`, `E-CDP-RAIL-TITLE-CLEAR`, `E-DEPLOY-PIPELINE-RAIL-TITLE-CLEAR`, `E-LIVE-PUBLIC-RAIL-TITLE-CLEAR`.

## Latest Release Recheck — bf235ed — 2026-10-03

- 기본 공개 GABA 안내서만 선행 import하고, 로딩 중에도 Apple-like 헤더·히어로 리듬을 보여주는 반응형 branded loading shell을 적용했다.
- PR #104 checks, main `37108431389`, Pages/live validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `bf235edeeea780dd42d0261a5760f100cff2ba9d`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-GUIDE-LOADING-SHELL`, `E-CDP-GUIDE-LOADING-SHELL`, `E-DEPLOY-PIPELINE-GUIDE-LOADING-SHELL`, `E-LIVE-PUBLIC-GUIDE-LOADING-SHELL`.

## Latest Release Recheck — b9160e4 — 2026-10-03

- 모바일 메뉴 접근성을 고도화해 키보드 포커스 순환과 현재 읽는 위치 semantics를 추가했다.
- PR #102 checks, main `37106966171`, Pages/live validator, 390/1440px Chrome CDP fallback이 통과했다. 공개 UI candidate는 `b9160e40fbca673134ca1563651a00d8dfdd615a`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-FOCUS-TRAP`, `E-CDP-MOBILE-FOCUS-TRAP`, `E-DEPLOY-PIPELINE-MOBILE-FOCUS-TRAP`, `E-LIVE-PUBLIC-MOBILE-FOCUS-TRAP`.

## Latest Release Recheck — 9c2913d — 2026-10-03

- 읽기 진행 레일의 장 순서를 실제 페이지 흐름과 맞추고 수면·회복 프롤로그를 03/13으로 정합화했다. 해시 링크·전문가 영상 선택 이동도 고정 헤더 아래에 안전하게 도착한다.
- PR #100 checks, main `37105696713`, Pages/live validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `9c2913db11440b10734345bc5bcba1d31161cc71`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-READING-RAIL-DEEPLINK`, `E-CDP-READING-RAIL-DEEPLINK`, `E-DEPLOY-PIPELINE-READING-RAIL-DEEPLINK`, `E-LIVE-PUBLIC-READING-RAIL-DEEPLINK`.

## Latest Release Recheck — 3d788e3 — 2026-10-03

- 모바일·태블릿 메뉴에 배경 분리·스크롤 잠금·배경 버튼 닫힘을 적용해 메뉴를 읽는 동안 페이지 위치가 흔들리지 않도록 했다.
- PR #98 checks, main `37104179510`, Pages/live validator, 390px 메뉴 열림·닫힘과 1440px Chrome CDP fallback 검증이 통과했다. 공개 candidate는 `3d788e39ef4d1dfa9d6d20845380ddcf7bfcc255`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS`, `E-CDP-MOBILE-MENU-FOCUS`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS`.

## Latest Release Recheck — cf2f123 — 2026-10-03

- 연구 결과 도표를 증가·감소 방향 화살표와 명시적 라벨로 고도화하고 320px 조건명 줄바꿈을 보정했다. 비교 문장과 방향 시각화가 한 화면에서 연결된다.
- PR #96 checks, main `37103072296`, Pages/live validator, 320/390/1440px Chrome CDP fallback 검증이 통과했다. 공개 candidate는 `cf2f123a74013956399306c591f2de261d1bf049`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-OUTCOME-DIRECTION`, `E-CDP-RESEARCH-OUTCOME-DIRECTION`, `E-DEPLOY-PIPELINE-RESEARCH-OUTCOME-DIRECTION`, `E-LIVE-PUBLIC-RESEARCH-OUTCOME-DIRECTION`.

## Latest Release Recheck — b1afe87 — 2026-10-03

- 전문가 영상 게시판에 주제 필터·영상 수를 추가하고 활성 필터를 모바일에서 중앙 정렬해, 필터 목록·선택 카드·즉시 재생이 함께 움직이도록 고도화했다.
- PR #94 checks, main `37101931045`, Pages/live validator, 320/390/1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `b1afe879a3266dd802e4f3d470a49d5985616b70`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-FILTER`, `E-CDP-EXPERT-VIDEO-FILTER`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-FILTER`, `E-LIVE-PUBLIC-EXPERT-VIDEO-FILTER`.

## Latest Release Recheck — bed5bf3 — 2026-10-03

- 공개 연구 결과 도표를 1·2단계 상대 방향 신호와 중립 조건명으로 고도화해, 보고되지 않은 정량 효과를 시각적으로 암시하지 않으면서 비교 방향을 빠르게 읽도록 했다.
- PR #92 checks, main workflow `37100751730`, Pages 배포·라이브 validator, 390/320/1440px Chrome CDP fallback 검증이 통과했다. 공개 candidate는 `bed5bf3245d489e74a79b33249bcdf9fba00668d`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-QUALITATIVE-DIRECTION`, `E-CDP-QUALITATIVE-DIRECTION`, `E-DEPLOY-PIPELINE-QUALITATIVE-DIRECTION`, `E-LIVE-PUBLIC-QUALITATIVE-DIRECTION`.

## Latest Release Recheck — 0257636 — 2026-10-03

- 공개 연구 결과 도표의 비교 리본을 정성적 방향 비교에 맞게 보완했다. 두 조건을 같은 길이로 유지하고 점선·실선으로 구분해, 보고되지 않은 효과 크기를 시각적으로 만들어내지 않도록 했다.
- PR #89 checks, TF heartbeat 복구 PR #90 checks, main workflow `37099561557`, 라이브 validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 candidate는 `0257636233ae758a4bc6e90dac7c77e6fd42bc67`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-QUALITATIVE-COMPARISON`, `E-CDP-QUALITATIVE-COMPARISON`, `E-DEPLOY-PIPELINE-QUALITATIVE-COMPARISON`, `E-LIVE-PUBLIC-QUALITATIVE-COMPARISON`, `E-NAVI-TF-HEARTBEAT-REFRESH`.

## Latest Release Recheck — 698f1fb — 2026-10-03

- 모바일 수면·회복 카드 진행 맵을 7×2 전체 단계 표시로 고도화해 14개 카드의 흐름을 한눈에 확인하도록 했다. 320/390/1440px 렌더와 마지막 단계 선택, 자동 전환·일시정지 구조를 확인했다.
- PR #87 checks, main workflow `37098162499`, live validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 candidate는 `698f1fbf93b960df38955fdb85ee223260df4cc7`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-MOBILE`, `E-CDP-RECOVERY-MAP-MOBILE`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-MOBILE`, `E-LIVE-PUBLIC-RECOVERY-MAP-MOBILE`.

## Latest Release Recheck — 3b75bae — 2026-10-03

- 공개 `/research/`를 제품 광고·구매 유도와 분리된 일반 GABA 연구 읽기 경로로 고도화했다. 연구 카드의 관찰 결과, 연구 조건, 출처 연결은 유지하고 제품 CTA·제품 브랜드·`view=products`·SmartStore 연결은 제거했다.
- PR #85 checks, main workflow `37096916896`, live validator, 390px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `3b75baecbc84623a759131393ef1e47f3aa2ba07`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-PRODUCT-FREE`, `E-CDP-RESEARCH-PRODUCT-FREE`, `E-DEPLOY-PIPELINE-RESEARCH-PRODUCT-FREE`, `E-LIVE-PUBLIC-RESEARCH-PRODUCT-FREE`.

## Latest Release Recheck — a0ee159 — 2026-10-03

- 모바일 연구 카드에서 출처 라벨과 원문 링크가 붙어 읽히던 문제를 보완해 `출처 ·`와 PMID 링크를 분리했다. 연구 결과나 과학적 주장을 새로 추가하지 않았다.
- PR #83 checks, main workflow `37095659387`, live validator, 390px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `a0ee159235477ee24c2855251b2d17b21c0b317e`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-SOURCE-LABEL`, `E-CDP-RESEARCH-SOURCE-LABEL`, `E-DEPLOY-PIPELINE-RESEARCH-SOURCE-LABEL`, `E-LIVE-PUBLIC-RESEARCH-SOURCE-LABEL`.

## Latest Release Recheck — 10aedca — 2026-10-03

- 전문가 영상 카드에서 현재 재생 중인 동일 영상을 다시 선택해도 iframe이 다시 로딩 상태로 돌아가지 않도록 보완했다. 다른 영상을 선택할 때만 로딩 상태를 새로 시작하며, 모바일 선택 이동과 `재생 중` 상태는 유지한다.
- PR #81 checks, main workflow `37094629598`, live validator, 390px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `10aedcab10448e5341123234b6ce9979b068bc58`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-RESELECT`, `E-CDP-VIDEO-RESELECT`, `E-DEPLOY-PIPELINE-VIDEO-RESELECT`, `E-LIVE-PUBLIC-VIDEO-RESELECT`.

## Latest Release Recheck — 4604805 — 2026-10-03

- 전문가 영상 게시판에서 현재 선택된 영상 카드에 `재생 중` 배지를 추가해 모바일에서도 플레이어와 목록의 연결을 즉시 이해할 수 있게 했다.
- PR #79 checks, main workflow `37093519815`, live validator, 390px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `4604805e746be4d28b34fb200196ce8d5905c85f`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-SELECTION-STATE`, `E-CDP-VIDEO-SELECTION-STATE`, `E-DEPLOY-PIPELINE-VIDEO-SELECTION-STATE`, `E-LIVE-PUBLIC-VIDEO-SELECTION-STATE`.

## Latest Release Recheck — 95c3830 — 2026-10-03

- 전문가 영상 선택 직후 검은 빈 화면처럼 보이던 구간을 로딩 오버레이로 보완하고, 영상이 준비되면 자연스럽게 실제 화면으로 전환되도록 했다. 모션 감소 환경의 스피너 정지도 반영했다.
- PR #77 checks, main workflow `37092613987`, live validator, 390px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `95c3830984d09ee8baca62ebafacd3a0c8c3d715`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-LOADING`, `E-CDP-VIDEO-LOADING`, `E-DEPLOY-PIPELINE-VIDEO-LOADING`, `E-LIVE-PUBLIC-VIDEO-LOADING`.

## Latest Release Recheck — 79eea1f — 2026-10-03

- 공개 배포본의 701–860px 태블릿 헤더를 아이콘 메뉴 전환으로 보완해 메뉴·큰 글씨·공유 버튼이 화면 밖으로 밀리지 않도록 했다. 768px·820px에서 실제 메뉴를 열어 44px 컨트롤과 가로 폭을 확인했다.
- PR #75 checks, main workflow `37091703892`, live validator, 768/820/390/1440px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `79eea1f08423f7d9f52021770310691b9f6e4db2`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

증적: `E-LOCAL-BUILD-TABLET-HEADER`, `E-CDP-TABLET-HEADER`, `E-DEPLOY-PIPELINE-TABLET-HEADER`, `E-LIVE-PUBLIC-TABLET-HEADER`.

## Latest Release Recheck — e5f1eab — 2026-10-03

- 전역 메뉴 첫 항목에 `수면과 회복`을 연결하고, 읽기 진행 메타를 보조기기용 단일 상태로 정리했으며, 모바일 메뉴 레이어를 sticky 진행 바 위로 보정했다.
- PR #73 checks, main workflow `37090787855`, 라이브 validator, 390/1440px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `e5f1eab190cd29fb4c18ffe2e469f18edb92ba1f`이다.
- 자동 검증은 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 288a883 — 2026-10-03

- 수면과 회복 인터스티셜을 읽기 진행 표시와 동기화해 모바일·데스크톱에서 `수면과 회복 02 / 12` 이후 `연구 지도 03 / 12`로 자연스럽게 이어지도록 고도화했다.
- PR #70 checks, main push run `37089334725`, 문서 동기화 main push run `37089833696`, 라이브 validator, 390/1440px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `288a883d5e0537a1be6bdd2660d90edcc5e82df0`이다.
- 자동 검증은 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 48f4876 — 2026-10-03

- 연구 상세 카드가 보이는 위치에 맞춰 연구 지도에서 현재 주제를 활성화하고, 지도 선택에는 `aria-current`를 연결했다.
- PR #68 checks, main push run `37088047547`, 라이브 validator, 390/1440px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `48f48764fd4fa06bb785a2b12cc5c639104e2dd2`이다.
- 자동 검증은 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — d3ff9e3 — 2026-10-03

- 연구 지도 5개 항목을 키보드·터치로 선택할 수 있게 하고, 선택한 주제의 상세 연구 카드로 자연스럽게 이어지도록 고도화했다.
- PR #66 checks, main push run `37086967211`, 라이브 validator, 390/1440px Chrome CDP 검증이 통과했다. 공개 후보는 `d3ff9e3f27833f3719b76f0cc377468a23bcc421`이다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — e514a37 — 2026-10-03

- 연구 지도 아래의 읽기 순서를 01–04 시각 레일로 정리해 `지도 → 대상 → 결과 → 해석` 흐름을 한눈에 파악하도록 개선했다.
- PR #64 checks, main push run `37085785228`, 라이브 validator, 390/1440px Chrome CDP 검증이 통과했다. 공개 후보는 `e514a375f0d8fdfeefbba2043b0a18268224b5d2`이다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 0147e3c — 2026-10-03

- 모바일 히어로의 편집 안내와 `3분 읽기` 레일을 반투명 읽기 표면으로 보강해 자연 이미지 위의 보조 문장 가독성을 높였다.
- PR #62 checks, main push run `37084454201`, 라이브 validator, 390/320/1440px Chrome CDP 검증이 통과했다. 공개 후보는 `0147e3c15a7e0acd700ff4f75e9fcddc03b39b05`이다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 078d231 — 2026-10-03

- 연구 도표를 읽는 중 상단 진행 바 뒤로 콘텐츠가 비치던 작은 가독성 결함을 불투명 레이어로 보정했다. 연구 결과·해석 텍스트가 진행 안내와 시각적으로 분리된다.
- PR #60 checks, main push run `37082824190`, 라이브 validator, 390/320/1440px CDP 검증이 통과했다. 공개 후보는 `078d231b637fd4a2267d74b01cc304d025b88576`이다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Original Goal

GABA 공개 안내서를 모바일 중심·제품 독립적·출처 연결형 정보 경험으로 점검하고, 공개 배포 품질을 재현 가능한 증거로 관리한다.

## Final Deliverables

- 공개 사이트: https://kradavid.github.io/gaba_info/
- 연구 확장 지도와 인지·피부·근육·성장호르몬·면역 상세 카드
- 결과 비교 도표와 성장호르몬 상대 크기 막대, 출처 연결 구조
- NAVI 목표·산출물·coverage·증거·감사·레드팀 기록

## Latest Release Recheck — 89978ea — 2026-10-03

- 연구 카드 시작 전에 사람 대상 연구와 피부·성장 등 확장 연구를 구분하는 시각 키를 제공해 연구 결과를 읽는 기준을 먼저 전달한다.
- 모바일 아이콘 컨트롤에 보조 title을 추가했으며, 로컬 UI 계약·typecheck·127개 테스트·build·성능, 라이브 390/320/1440px CDP, main 배포가 모두 통과했다.
- 현재 공개 후보는 `89978ea124178774617b5f97ac469b6dca2e4027`이며 validator는 HTTP 200·70 bundles·12 claims·6 master records·6 share pages를 보고했다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 19a38ab — 2026-10-03

- 공개 연구 카드에서 관찰된 핵심 결과 문장을 바로 복사할 수 있고, 브라우저 클립보드 권한이 없으면 대체 선택 안내를 표시한다.
- 로컬 UI 계약·typecheck·127개 테스트·build·성능, 라이브 390/1440px CDP, main 배포가 모두 통과했다.
- 현재 확인한 공개 후보는 `19a38abc7f1a7b5591f228c7abe1e42862ef0cca`이며 validator는 HTTP 200·70 bundles·12 claims·6 master records·6 share pages를 보고했다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 3f4a3e5 — 2026-10-03

- 연구 결과 그래프 앞에 `대상·방법·측정` 연구 프로필을 추가해 소비자가 결과를 보기 전에 연구의 범위와 측정 대상을 한눈에 파악하도록 보완했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 검사가 통과했고, 390px·1440px 라이브 CDP에서 6개 프로필·가로 넘침 없음·runtime errors `[]`를 확인했다.
- PR #53 필수 검사와 main 배포 run `37077676557`의 release verification·Pages publish·smoke-live·release status가 성공했고, 라이브 validator도 HTTP 200·70 bundle hashes·12 claims·6 master records·6 share pages를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있어 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Narrow-phone Mobile Hardening Recheck — d0f1741 — 2026-10-03

- 320–430px 좁은 모바일에서 히어로 제목 클리핑과 헤더 버튼 잘림을 보완했고, 메뉴·큰 글씨·공유 컨트롤을 44px 터치 영역으로 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했고, main 배포 run `37076052369`와 실제 공개 URL validator도 성공했다.
- 공개 390px CDP 검증에서 가로 넘침 없음, 메뉴·큰 글씨 상호작용, runtime errors `[]`를 확인했다. 외부 브라우저·실사용자·독립 과학·규제 검증이 남아 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`이다.

## Final Public Recheck After NAVI Sync — 6f48bae — 2026-10-03

- 공개 후보 `6f48bae7a7adcc22b68fbefc2a9ca13b002fe540`의 main 배포 run `37074307727`이 성공했고, 라이브 validator가 HTTP 200·70 bundle hashes·12 claims·6 master records·6 share pages를 확인했다.
- 제품 데이터 경계, 내부 운영 스냅샷 제외, teaser HOLD, smartStoreOnly, removed750 및 provenance 일치도 유지됐다.
- 자동 검증은 통과했지만 외부 과학·규제 감수, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트가 남아 있어 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Final NAVI Documentation Release Recheck — 49daf99 — 2026-10-03

- NAVI 상태·감사·레드팀·증적 문서를 main에 반영한 최종 공개 candidate `49daf9901113be3876b7fd6f94684ba2121c3b9a`를 확인했다.
- 공개 validator는 HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, 내부 운영 스냅샷 제외, 제품 데이터 경계와 provenance 일치를 확인했고, main 배포 run `37073665476`도 성공했다.
- 자동 검증과 라이브 배포는 완료됐지만 외부 과학·규제 감수, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트가 남아 있어 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 7a64726 — 2026-10-03

- 긴 안내서의 현재 위치를 `progressbar`로 보조기기에 노출하고 진행 표시의 숫자·글자 크기를 모바일에서도 읽기 쉽게 보완했다. 현재 사용하지 않는 구형 챌린지 이미지 4종은 정적 번들에서 제거했다.
- 로컬 검증은 UI 계약, 타입체크, 127개 테스트, production build, 11개 라우트, 70개 번들을 통과했다. `/gaba_info/` Pages 빌드 로컬 재현 성능은 `1,430,551 <= 1,650,000` bytes였다.
- PR #47 필수 검사(`37072831937`, `37072831902`)와 main 배포 run `37072974276`의 Pages publish·라이브 smoke·release status가 성공했다. 공개 validator는 candidate `7a64726c5e5df25d0b1f0377bb42e2b15face784`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, 내부 운영 스냅샷 제외, 제품 데이터 경계 유지와 provenance 일치를 확인했다.
- 1440px·390px Chrome CDP 대체 QA에서 진행 표시 접근성 값·큰 글씨 상태·앵커 비가림·가로 넘침 없음·runtime errors `[]`를 확인했다.

## Latest Release Recheck — 2c8bd84 — 2026-10-03

- 고정 헤더·읽기 진행 표시와 섹션 앵커가 겹치지 않도록 이동 오프셋을 보완해, 모바일·데스크톱에서 메뉴를 누른 뒤 섹션 제목과 다음 콘텐츠가 바로 읽히도록 했다.
- 로컬 타입체크·127개 테스트·production build·11개 정적 라우트·74개 번들·UI 계약 검사와 정확한 Pages 성능 `1649668 <= 1650000` bytes를 통과했다. PR #45 필수 검사와 main 배포 run `37070479805`의 Pages·smoke·release status도 성공했다.
- 라이브 validator는 HTTP 200, candidate `2c8bd8452eaf978b41717feb999bbbcc35b84a33`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750, provenance matched를 확인했다.
- 공개 URL 1440px·390px Chrome CDP 시각·상호작용 검증에서 연구 확장 메뉴 이동과 핵심 앵커의 고정 UI 충돌 없음, 가로 넘침 없음, runtime errors `[]`를 확인했다. 잔여 외부 조건은 유지한다.

## Latest Release Recheck — 5af1f11 — 2026-10-03

- `06 · 연구의 확장` 지도 아래에 `읽는 순서 → 01 지도 → 02 대상 → 03 결과 → 04 해석` 시각 레일을 추가해 연구 카드의 대상·결과·해석을 별도 이동 없이 바로 읽도록 보완했다.
- 로컬 타입체크·127개 테스트·production build·11개 정적 라우트·74개 번들·성능 `1649481 <= 1650000` bytes와 Pages CI 성능 `1649972 <= 1650000` bytes를 통과했다.
- PR #43 필수 검사와 main 배포 run `37068741690`의 release verification, fresh TF pulse, Pages 배포, 라이브 smoke, release status가 성공했다. `deploy-worker`는 `STATIC_ONLY`로 건너뛰었다.
- 라이브 validator는 HTTP 200, candidate `5af1f11d688c09b95ee3f9e6a391f12e0a0d3c16`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- 공개 URL 1440px·390px Chrome CDP 시각 검증에서 연구 지도와 읽기 레일, 첫 연구 카드 연결을 확인했고 runtime errors `[]`였다. 잔여 외부 조건은 유지한다.

## Latest Release Recheck — ca20d1e — 2026-10-03

- 연구 확장 지도 아래에 `지도 → 대상 → 결과 → 해석` 읽기 순서를 표시해, 연구 영역을 선택하거나 다른 페이지로 이동하지 않고 바로 상세 카드로 이해하도록 흐름을 보완했다.
- 로컬 타입체크·127개 테스트·production build·11개 정적 라우트·74개 번들·성능 `1649489 <= 1650000` bytes와 PR #38 필수 검사를 통과했다.
- heartbeat PR #39 병합 후 main 배포 run `37065791706`의 release verification, fresh TF pulse, Pages 배포, 라이브 smoke, release status가 성공했다. NAVI 문서 동기화 PR #40 병합 후 최종 main run `37066583312`도 같은 게이트를 통과했으며 `deploy-worker`는 `STATIC_ONLY`로 건너뛰었다.
- 최종 라이브 validator는 HTTP 200, candidate `ca20d1e995f3adbdeba4015b1827f3c9a001a7a2`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다. 기능 변경 기준은 `79432de`이며 최종 공개본에는 NAVI 문서 동기화가 포함됐다.
- Chrome CDP 대체 시각 QA에서 1440px·390px 연구 지도와 연구 카드 전환을 확인했고 runtime errors `[]`였다. 320/360/390px 헤더의 기존 충돌·가로 넘침 없음과 큰 글씨 선택 유지도 보존됐다.
- 외부 과학·규제 감수, Safari/iOS/Android 실기기, 실제 고령 사용자 테스트는 완료로 표시하지 않는다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`, NAVI 상태는 `USER_DECISION`을 유지한다.

## Latest Release Recheck — 713627f — 2026-10-03

- 연구 확장 지도에 인지·피부·근육·성장호르몬·면역을 구분하는 의미 기반 선형 아이콘을 추가해 소비자가 다섯 영역을 연결 구조 안에서 빠르게 식별하도록 보완했다.
- 로컬 타입체크·127개 테스트·production build·11개 정적 라우트·74개 번들·성능 `1649348 <= 1650000` bytes와 PR #37 필수 검사를 통과했다.
- main 배포 run `37063502715`의 release verification, Pages 배포, 라이브 smoke, release status가 성공했다. `deploy-worker`는 `STATIC_ONLY`로 건너뛰었다.
- 라이브 validator는 HTTP 200, candidate `713627f3faa7d876ffabc2aa58332433342c6fad`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- Chrome CDP 대체 시각 QA에서 1440px·390px 연구 지도와 대표 화면을 확인했고 runtime errors `[]`였다. 320/360/390px 헤더의 충돌·가로 넘침 없음과 큰 글씨 선택 유지도 재확인했다.
- 외부 과학·규제 감수, Safari/iOS/Android 실기기, 실제 고령 사용자 테스트는 완료로 표시하지 않는다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`, NAVI 상태는 `USER_DECISION`을 유지한다.

## Latest Release Recheck — 34807cb — 2026-10-03

- `34807cb` 공개본에서 연구 결과 도표의 모든 읽을 수 있는 문구를 차트 기준 글자에 상대적으로 묶어 큰 글씨 모드의 확대 일관성을 높였다.
- 로컬 타입체크·127개 테스트·production build·정적 라우트·성능 예산과 PR #36 필수 검사를 통과했다. 로컬 성능 total은 `1649104 <= 1650000` bytes였다.
- 라이브 390px Chrome CDP에서 본문 16px가 큰 글씨 선택 후 16.96px, 도표 요약 16.96px, 도표 주석 17.9776px로 확대되고 선택 상태가 유지됐다. 320/360/390px 헤더의 터치 영역·가로 폭·런타임 오류도 통과했다.
- 라이브 validator는 HTTP 200, candidate `34807cba60794717d4bc3c110f59767fb184fc23`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다. main 배포 run `37061173471`의 Pages·smoke·release status도 성공했다.

## Latest Release Recheck — 24c718b — 2026-10-03

- `24c718b` 공개본에서 큰 글씨 모드가 연구 결과 도표의 요약·측정값·주석까지 함께 확대되도록 보완했다.
- 라이브 390px Chrome CDP에서 본문·도표 요약·도표 주석이 16px에서 16.96px로 확대되고 새로고침 후 선택이 유지되며, 320/360/390px 헤더의 세 컨트롤이 44px 이상이고 가로 넘침·런타임 오류가 없음을 확인했다.
- 라이브 validator는 HTTP 200, candidate `24c718bc46ae818ab09a460c09ff8823dd1c8560`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- GitHub Actions `37059529485`의 release verification, Pages 배포, 라이브 smoke test, release status가 모두 성공했다.

## Latest Release Recheck — b3059b2 — 2026-10-03

- `b3059b2` 공개본에서 320–360px 초소형 모바일 헤더를 아이콘형으로 정리해 메뉴·큰 글씨·공유 컨트롤이 각각 44px 터치 영역을 유지하도록 보완했다.
- 320/360/390px Chrome CDP 라이브 QA에서 버튼 겹침 없음, 뷰포트 가로 폭 유지, 접근성 라벨, 런타임 오류 0건을 확인했다.
- 라이브 validator는 HTTP 200, candidate `b3059b2e45b60af031bf174e07bff7f532906643`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- GitHub Actions `37057405022`의 release verification, Pages 배포, 라이브 smoke test, release status가 모두 성공했다.

## Latest Release Recheck — 0c464c1 — 2026-10-03

- `0c464c1` 공개본에서 헤더의 `큰 글씨`·`기본 글씨` 토글을 추가해 모바일 독자가 본문 크기를 직접 조절할 수 있게 했다.
- 390px Chrome CDP 라이브 QA에서 기본 상태와 큰 글씨 상태의 전환, `aria-pressed` 상태, 새로고침 후 선택 유지, 가로 넘침 없음, 런타임 오류 0건을 확인했다.
- 라이브 validator는 HTTP 200, candidate `0c464c197d7ab3b3c7f992be89b49a310339075d`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- GitHub Actions `37055827540`의 release verification, Pages 배포, 라이브 smoke test, release status가 모두 성공했다.

## Latest Release Recheck — 5321f9d — 2026-10-03

- `5321f9d` 공개본에서 수면·회복 14단계 지도에 `01–14` 단계 번호와 현재 선택 단계 표시를 추가했다.
- 390px Chrome CDP 라이브 QA에서 마지막 단계 선택 시 단계가 화면 안으로 자동 중앙 정렬되고, 페이지 가로 폭이 390px로 유지되며 런타임 오류가 없음을 확인했다.
- 라이브 validator는 HTTP 200, candidate `5321f9d4f3f0e1af56b73b225ea0dfc00fc3f4be`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- GitHub Actions `37053872031`의 release verification, Pages 배포, 라이브 smoke test, release status가 모두 성공했다.

## Previous Release Recheck — 3af1327 — 2026-10-03

- `3af1327` 공개본에서 성장호르몬 연구 카드의 `약 +400%`·`약 +375%` 결과를 상대 막대로 빠르게 비교할 수 있도록 보완했다.
- 막대는 해당 연구 안에서 가장 높은 반응을 100으로 둔 상대 표시라는 설명을 함께 제공해 숫자와 시각화의 의미를 분리했다.
- 라이브 validator는 HTTP 200, candidate `3af1327b2f2e47a7feea54201928183271dfce20`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- Chrome CDP 390px QA에서 두 막대·해석 문구·가로 넘침 없음·runtimeErrors 0건을 확인했다.

## Success Criteria Results

| Criterion | Result | Evidence | Notes |
|---|---|---|---|
| AC-001 | PASS | E-LIVE-PUBLIC-COMPACT-HEADER, E-DEPLOY-PIPELINE-COMPACT-HEADER, E-LIVE-PUBLIC-READING-SIZE, E-DEPLOY-PIPELINE-RESEARCH-PROFILE, E-LIVE-PUBLIC-RESEARCH-PROFILE | `3f4a3e5` 최신 runtime candidate의 main 배포 성공, 라이브 200, 공개 데이터 경계와 정적 번들 재확인 |
| AC-002 | PASS | E-CDP-DESKTOP, E-CDP-MOBILE, E-CDP-RECOVERY-INDEX, E-CDP-RESEARCH-MAP-CONNECTORS, E-CDP-RESEARCH-PROFILE, E-LIVE-PUBLIC-RESEARCH-PROFILE | 연구 영역 5개·상세 카드 5개·수면 연구 프로필과 390/1440px 배치 확인 |
| AC-003 | PASS | E-CDP-METRIC-VIZ, E-LIVE-PUBLIC-METRIC-VIZ, E-CDP-RESEARCH-PROFILE, E-LIVE-PUBLIC-RESEARCH-PROFILE | 비교 조건·연구 대상·방법·측정·핵심 결과·성장호르몬 상대 막대·출처가 표시됨 |
| AC-004 | PASS | E-CDP-COMPACT-HEADER, E-CDP-READING-SIZE, E-CDP-RECOVERY-INDEX | 320/360/390px 가로 넘침 없음, 44px 터치 영역·읽기 크기 전환·단계 흐름 확인 |
| AC-005 | PASS | E-LOCAL-BUILD-COMPACT-HEADER, E-LOCAL-BUILD-READING-SIZE, E-LOCAL-TESTS, E-LOCAL-BUILD-RESEARCH-PROFILE, E-LIVE-PUBLIC-RESEARCH-PROFILE | 타입체크·127개 테스트·공개 검사·Pages 성능 예산과 연구 프로필 구조 통과 |
| AC-006 | PASS | E-RESEARCH-COPY | 제품 독립 과학 정보 경계와 연구 출처 연결 유지 |
| AC-007 | PASS_WITH_CONDITIONS | E-LOCAL-BUILD, E-REDTEAM-REVIEW | 감사·레드팀은 분리됐으나 외부 검증은 남음 |

## Review Summary

- Coverage Summary: Technology, Product, User, Data, Quality, Distribution, Marketing, Operations, Security, Risk, Execution은 확인. Science, Regulation, Legal, People, Post-launch는 외부 검토 상태.
- Key Findings: 코드·번들·라이브·대표 화면은 통과했으나 전체 브라우저, 고령 사용자, 독립 과학·규제 감수는 남음.
- Evidence Quality: 자동 명령과 Chrome CDP 실행 증거는 재현 가능하며 외부 적합성의 증거는 없음.
- Remaining Assumptions: CDP 대표성, 실제 사용자 독해성, 공유 과정의 카피 재해석.
- Remaining Unknowns: Safari/iOS/Android 렌더, 고령 사용자 이해도, 외부 reviewer 판단.
- Residual Risks: 과학 카피 오인, 브라우저별 시각 차이, 새 콘텐츠 추가 시 출처 경계 훼손.
- Audit Result: PASS_WITH_CONDITIONS
- Red Team Result: PASS_WITH_CONDITIONS
- User Decisions Required: 외부 과학·규제 감수와 추가 실기기 QA를 언제 완료할지 결정.
- Recommended Next Actions: 외부 검토 증거와 대표 실기기 QA를 등록한 뒤 동일 gate를 재실행.
- Deployment Follow-up: main 배포 run `37077676557`가 통과했고, Pages 배포·라이브 smoke test·release status를 확인했다. 공개 URL의 runtime candidate SHA는 `3f4a3e552978721ccc72187ae85a89af05174d5f`이다.
- Final Status: INTERNAL_QA_READY_WITH_CONDITIONS; NAVI 상태는 USER_DECISION. 외부 과학·규제 감수, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트는 완료로 표시하지 않는다.

## Current Release Recheck — 8a6eeb6 — 2026-10-06

- 연구 결과 비교 도표의 행별 라벨을 `GABA를 섭취한 그룹의 변화`로 정리해 소비자가 결과 문장을 자연스럽게 읽도록 보완했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산, PR #434 필수 검사, main workflow `37418115559`, Pages·라이브 smoke·release-status, 공개 validator와 390·1440px Chromium fallback이 모두 통과했다.
- 공개 데이터는 12 claims·6 master records·6 share pages·teaser HOLD·internal operations snapshot 제외·Smart Store only·750 제거·provenance matched 상태를 유지한다.
- 연구 수치·출처·제품 독립 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 없으며 C-179와 다섯 증거를 등록했다.
- 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다.
## Current Release Recheck — 3339309 — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator가 HTTP 200·STATIC·candidate `3339309c8565f874843b757afa5f843206bd2df3`·71개 bundle hash를 확인했다.
- AC-003/AC-004 연구 결과 비교 도표의 읽기 순서와 모바일 가독성: PASS. 320px·390px·1440px에서 `두 조건을 나란히 비교` 안내, `막대가 짧을수록 변화가 작습니다` 안내, 네 개 비교 lane, viewport와 동일한 document scrollWidth, page/console errors 0을 확인했다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남기며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-CHART-CUE-20261006`, `E-UI-CONTRACT-RESEARCH-CHART-CUE-20261006`, `E-PLAYWRIGHT-RESEARCH-CHART-CUE-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-CHART-CUE-20261006`, `E-LIVE-PUBLIC-RESEARCH-CHART-CUE-20261006`.

## Current Release Recheck — 8da328d — 2026-10-06

- AC-001 공개 URL·Pages 배포·라이브 smoke·candidate 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `8da328d112d40554ae41308df660ef1f7c9d781b`와 71개 bundle hash를 확인했다.
- AC-002/AC-004 기본 과학 설명의 이해 흐름과 모바일 가독성: PASS. GABA 기본 설명 직후 글루탐산→GABA 생성→신경 활동 조절 3단계 카드가 표시되고, 320·390px에서는 1열, 768·1440px에서는 3열로 전환된다. NCBI 출처 링크·가로폭·page/console errors 0을 확인했다.
- AC-005 release-verify·worker-readiness·UI 계약·typecheck·127개 테스트·production build·성능 예산: PASS. PR #422와 main workflow `37410404149`의 필수 검증·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 과학 정보 경계와 출처 연결: PASS. 기본 원리 설명은 일반 생리학 정보와 NCBI 출처로만 구성했으며 제품 CTA·구매 유도·효능 주장 추가는 없다.
- AC-007 감사·레드팀 분리와 잔여 위험 기록: PASS_WITH_CONDITIONS. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 외부 검증으로 남으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-GABA-PROCESS-20261006`, `E-UI-CONTRACT-GABA-PROCESS-20261006`, `E-PLAYWRIGHT-GABA-PROCESS-20261006`, `E-DEPLOY-PIPELINE-GABA-PROCESS-20261006`, `E-LIVE-PUBLIC-GABA-PROCESS-20261006`.

## Current Release Recheck — 83dc4e5a — 2026-10-06

- 280px 초소형 모바일 비교 도표에서 결과 라벨이 잘리지 않고 두 줄로 흐르도록 보완했다. 320·390·1440px에서는 기존 조건 비교 구조와 결과 문구가 유지된다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산, PR #436 필수 검사, main workflow `37419534993`, Pages·라이브 smoke·release-status, 공개 validator와 280·320·390·1440px Chromium fallback이 모두 통과했다.
- 공개 데이터는 12 claims·6 master records·6 share pages·teaser HOLD·internal operations snapshot 제외·Smart Store only·750 제거·provenance matched 상태를 유지한다.
- 연구 수치·출처·제품 독립 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 코드 결함은 없으며 C-180과 다섯 증거를 등록했다.
- 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다.

## Current Release Recheck — e80cd52b — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `e80cd52b28efc20c245eacd28c099bf3bd7e99b1`·HTTP 200·STATIC·71개 bundle hash·12개 공개 claim·6개 master record·6개 share page를 확인했다.
- AC-003/AC-004 수면 도표 읽기 흐름·반응형: PASS. 280px에서 도표가 번호 열을 벗어나 연구 카드 전체 폭으로 표시되고, 비교 안내 문구와 조건 카드가 잘리지 않는다. 320·390·1440px에서도 도표 폭·가로폭·page/console errors 0을 확인했다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build와 main workflow의 release-verify·Pages·라이브 smoke·release-status 및 PR 품질 검사가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 공개 데이터 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-SLEEP-CHART-NARROW-20261008`, `E-UI-CONTRACT-SLEEP-CHART-NARROW-20261008`, `E-PLAYWRIGHT-SLEEP-CHART-NARROW-20261008`, `E-DEPLOY-PIPELINE-SLEEP-CHART-NARROW-20261008`, `E-LIVE-PUBLIC-SLEEP-CHART-NARROW-20261008`.

## Current Release Recheck — 06013ba — 2026-10-06

- 초소형 모바일 읽기 조절 컨트롤의 `글자` 라벨과 크기 표식을 확대해 280·320px에서도 기능 의미가 더 빠르게 읽히도록 보정했다. 390·1440px 헤더 구성은 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산, PR #440·#441, main workflow `37423305842`, Pages·라이브 smoke·release-status와 공개 validator·Chromium fallback 280·320·390·1440px 검증이 성공했다.
- 공개 데이터는 12 claims·6 master records·6 share pages·teaser HOLD·internal operations snapshot 제외·Smart Store only·750 제거·provenance matched 상태를 유지한다. 연구 수치·출처·제품 독립 경계는 변경하지 않았다.
- 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다.

증적: `E-LOCAL-BUILD-COMPACT-READING-20261008`, `E-UI-CONTRACT-COMPACT-READING-20261008`, `E-PLAYWRIGHT-COMPACT-READING-20261008`, `E-DEPLOY-PIPELINE-COMPACT-READING-20261008`, `E-LIVE-PUBLIC-COMPACT-READING-20261008`.

## Current Release Recheck — bd8717b — 2026-10-06

- 태블릿 헤더에서 `가+ 글자`를 함께 표시해 읽기 크기 조절 기능을 즉시 이해할 수 있도록 보완했다. 701·768·820·900px의 44px 터치 영역·72px 컨트롤 폭과 1024px 데스크톱 전환을 확인했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산, PR #443 필수 검사, main workflow `37424970431`, Pages·라이브 smoke·release-status와 공개 validator·Chrome fallback이 모두 통과했다.
- 공개 데이터는 12 claims·6 master records·6 share pages·teaser HOLD·internal operations snapshot 제외·Smart Store only·750 제거·provenance matched 상태를 유지한다. 연구 수치·출처·제품 독립 경계는 변경하지 않았다.
- 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 외부 검증으로 남긴다.

증적: `E-LOCAL-BUILD-TABLET-READING-20261008`, `E-UI-CONTRACT-TABLET-READING-20261008`, `E-PLAYWRIGHT-TABLET-READING-20261008`, `E-DEPLOY-PIPELINE-TABLET-READING-20261008`, `E-LIVE-PUBLIC-TABLET-READING-20261008`.

## Current Release Recheck — 550b4eb — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `550b4eb71f91015245ab52d4d287f376e8b70c9d`와 71개 bundle hash를 확인했다.
- AC-003/AC-004 모바일 첫 화면·헤더 가독성: PASS. 390px에서 `GABA에서 읽습니다` 강조 문구가 화면 안에 표시되고 `가+ 글자` 읽기 레일과 공유 버튼이 분리되며, 768px 태블릿·1024px 데스크톱 전환이 유지된다. page/console errors 0을 확인했다.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #445 및 main workflow의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 연구 수치·출처·공개 카피는 변경하지 않았고 teaser `HOLD`를 유지한다. 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-HERO-RAIL-20261006`, `E-UI-CONTRACT-MOBILE-HERO-RAIL-20261006`, `E-CDP-MOBILE-HERO-RAIL-20261006`, `E-DEPLOY-PIPELINE-MOBILE-HERO-RAIL-20261006`, `E-LIVE-PUBLIC-MOBILE-HERO-RAIL-20261006`.

## Current Release Recheck — 9b6df19 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `9b6df192005919f4cfbb610c2797317a30311543`와 71개 bundle hash를 확인했다.
- AC-003/AC-004 초소형 모바일 진행 레일: PASS. 280px에서 `읽는 중`이 한 줄로 표시되고 현재 장 제목·진행 수치가 함께 읽히며, 390px 이상 표기와 접근성 live announcement가 유지된다. document scrollWidth 280px, page/console errors 0을 확인했다.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #447 및 main workflow의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 연구 수치·출처·공개 카피는 변경하지 않았고 teaser `HOLD`를 유지한다. 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-NARROW-READING-RAIL-20261006`, `E-UI-CONTRACT-NARROW-READING-RAIL-20261006`, `E-CDP-NARROW-READING-RAIL-20261006`, `E-DEPLOY-PIPELINE-NARROW-READING-RAIL-20261006`, `E-LIVE-PUBLIC-NARROW-READING-RAIL-20261006`.

## Current Release Recheck — 32612fe — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator는 HTTP 200·STATIC·candidate `32612fefb6c022ef80ef32609abf08b7ad43254d`와 71개 bundle hash를 확인했다.
- AC-003/AC-004 모바일 전문가 영상 흐름: PASS. 390px 공유 deep link에서 `수용체` 주제 칩이 레일 안으로 자동 정렬되고 선택 영상·원본 링크·공유 버튼이 함께 표시되며 document scrollWidth 390px을 유지했다.
- AC-005 UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #449 및 main workflow `37431243216`이 성공했다.
- AC-006 제품 독립 과학 정보 경계: PASS. 연구 수치·출처·공개 카피·제품 독립 경계는 변경하지 않았다.
- AC-007 Final Status: `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다. 외부 브라우저·실기기·고령 사용자·독립 과학·규제 검증은 남아 있다.

증적: `E-LOCAL-BUILD-EXPERT-TOPIC-RAIL-20261006`, `E-UI-CONTRACT-EXPERT-TOPIC-RAIL-20261006`, `E-CDP-EXPERT-TOPIC-RAIL-20261006`, `E-DEPLOY-PIPELINE-EXPERT-TOPIC-RAIL-20261006`, `E-LIVE-PUBLIC-EXPERT-TOPIC-RAIL-20261006`.

## Current Release Recheck — 39cb1c9 — 2026-10-06

- AC-001: PASS — live validator 200, candidate 39cb1c9b5a6a2fb2fa7cace0217ae78db4945f2a, 71 bundle hashes.
- AC-002/AC-003: PASS — research map visual hierarchy verified at 280/390/1440; selected topic and reading progress preserved.
- AC-004/AC-005: PASS — no overflow at tested widths; UI contract/typecheck/127 tests/build/performance and main workflow succeeded.
- AC-006: PASS — no research/product/copy boundary changes.
- AC-007: PASS_WITH_CONDITIONS — external browser/device, older-reader, independent science/regulatory review remain open.
- Final Status: `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI `USER_DECISION / NOT_READY`.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-RHYTHM-20261006`, `E-UI-CONTRACT-RESEARCH-MAP-RHYTHM-20261006`, `E-CDP-RESEARCH-MAP-RHYTHM-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-RHYTHM-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-RHYTHM-20261006`.

## Current Release Recheck — 65eed515 — 2026-10-06

- AC-001: PASS — live validator 200, candidate 65eed5159bfde50dec7087d26441186390e59dc6, 71 bundle hashes.
- AC-002/AC-003: PASS — research map defaults to `인지` and topic selection reaches the matching card, hash, and reading progress on 390px.
- AC-004/AC-005: PASS — no overflow at tested widths; UI contract/typecheck/127 tests/build/performance and main workflow succeeded.
- AC-006: PASS — no research/product/copy boundary changes.
- AC-007: PASS_WITH_CONDITIONS — external browser/device, older-reader, independent science/regulatory review remain open.
- Final Status: `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI `USER_DECISION / NOT_READY`.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-FIRST-20261006`, `E-UI-CONTRACT-RESEARCH-MAP-FIRST-20261006`, `E-CDP-RESEARCH-MAP-FIRST-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-FIRST-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-FIRST-20261006`.

## Current Release Recheck — 4c370795 — 2026-10-06

- AC-001: PASS — 공개 validator 200, candidate `4c3707955a0517e4f7a140591d257275069e683d`, 71개 bundle hashes, 공개 데이터 정합성 일치.
- AC-005: PASS — 이력 privacy audit의 `ENOBUFS` 재현성 결함을 수정했고, PR #455 및 main workflow `37437900625`의 필수 검사가 성공했다. 로컬 typecheck·127개 테스트·production build·성능 예산도 통과했다.
- AC-006: PASS — 이번 변경은 NAVI 이력 감사 도구만 수정했으며 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- AC-007: PASS_WITH_CONDITIONS — 외부 브라우저·실기기·고령 사용자·독립 과학·규제 검증은 남아 있다. NAVI `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-HISTORY-AUDIT-STREAM-20261006`, `E-DEPLOY-PIPELINE-HISTORY-AUDIT-STREAM-20261006`, `E-LIVE-PUBLIC-HISTORY-AUDIT-STREAM-20261006`.

## Current Release Recheck — 86c869ed — 2026-10-06

- AC-001: PASS — 공개 validator 200, candidate `86c869ed743546b325e01c6da91c4f42391e9dd8`, 71개 bundle hashes, 공개 데이터 정합성 일치.
- AC-002/AC-003/AC-004: PASS — 280px에서는 연구 주제명 `인지`와 진행 수치가 한눈에 읽히고 390·768·1440px에서도 지도·연구 카드·가로폭이 유지된다. 접근성 전체 라벨과 live announcement도 유지된다.
- AC-005: PASS — UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #457 및 main workflow `37439945690`의 필수 배포 검사가 성공했다.
- AC-006: PASS — 이번 변경은 연구 읽기 레일의 좁은 폭 표시 방식만 보정했으며 연구 수치·출처·공개 카피·제품 독립 경계는 변경하지 않았다.
- AC-007: PASS_WITH_CONDITIONS — 외부 브라우저·실기기·고령 사용자·독립 과학·규제 검토는 남아 있다. Final Status는 `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-NARROW-RESEARCH-LABEL-20261006`, `E-UI-CONTRACT-NARROW-RESEARCH-LABEL-20261006`, `E-CDP-NARROW-RESEARCH-LABEL-20261006`, `E-DEPLOY-PIPELINE-NARROW-RESEARCH-LABEL-20261006`, `E-LIVE-PUBLIC-NARROW-RESEARCH-LABEL-20261006`.

## Current Release Recheck — 449d65a — 2026-10-06

- AC-001: PASS — live validator 200, candidate `449d65afa7d24ada9f2c7bdc40357d0518db833a`, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal operations snapshot excluded, Smart Store only, 750 removed, provenance matched.
- AC-003/AC-004: PASS — 390px cognition research deep link에서 비교 도표가 `뇌파 변화`·`활력 점수`·`GABA 그룹`·`비교 조건` 순서로 읽히며, 긴 라벨을 제거하고 실제 결과 요약·읽는 법을 유지했다. Chrome CDP fallback에서 page/console errors 0을 확인했다.
- AC-005: PASS — UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #459, main workflow `37442415197`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다.
- AC-006: PASS — 연구 수치·결과·해석·출처·접근성 설명·제품 독립 공개 경계와 상단 카피는 변경하지 않았다.
- AC-007: PASS_WITH_CONDITIONS — 외부 브라우저·실기기·고령 사용자·독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-COMPARISON-VERDICT-20261006`, `E-UI-CONTRACT-COMPARISON-VERDICT-20261006`, `E-CDP-COMPARISON-VERDICT-20261006`, `E-DEPLOY-PIPELINE-COMPARISON-VERDICT-20261006`, `E-LIVE-PUBLIC-COMPARISON-VERDICT-20261006`.

## Current Release Recheck — 81c91d2 — 2026-10-06

- AC-001: PASS — live validator 200, candidate `81c91d2b96c1e8057a81272cda1cff8d2b7fe1a0`, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal operations snapshot excluded, Smart Store only, 750 removed, provenance matched.
- AC-003/AC-004: PASS — 인지·수면 비교 도표에서 `비교 조건`과 `GABA 그룹`이 같은 이름 체계로 읽히며, 390px 공개 CDP fallback에서 두 결과 레인·결과 요약·읽는 법이 유지되고 가로 넘침·page/console errors 0을 확인했다.
- AC-005: PASS — UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #461, main workflow `37444743950`의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다.
- AC-006: PASS — 연구 수치·결과·해석·출처·접근성 설명·제품 독립 공개 경계와 상단 카피는 변경하지 않았다.
- AC-007: PASS_WITH_CONDITIONS — 외부 브라우저·실기기·고령 사용자·독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-UI-CONTRACT-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-CDP-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-DEPLOY-PIPELINE-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-LIVE-PUBLIC-COMPARISON-LABEL-CONSISTENCY-20261006`.

## Current Release Recheck — de96345 — 2026-10-06

- AC-001: PASS — live validator 200, candidate `de963459940fd475b2802180d485523caa4c0b3b`, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal operations snapshot excluded, Smart Store only, 750 removed, provenance matched.
- AC-003/AC-004: PASS — 국내외 활용 카드에 `01 / 03`, `02 / 03`, `03 / 03`이 보이며 390·1440px에서 이미지·제목·본문의 계층과 폭이 유지된다. `#applications` 다음 장 이동은 `#fermented-safety`로 확인되며 page/console errors 0이다.
- AC-005: PASS — UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #463, main workflow `37447228688`의 필수 배포 검사가 성공했다.
- AC-006: PASS — 이번 변경은 국내외 활용 카드의 편집 순서 표식과 스타일만 추가했으며 연구 카피·수치·출처·접근성 설명·제품 독립 공개 경계는 변경하지 않았다.
- AC-007: PASS_WITH_CONDITIONS — 외부 브라우저·실기기·고령 사용자·독립 과학·규제 검토는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-APPLICATION-FLOW-INDEX-20261006`, `E-UI-CONTRACT-APPLICATION-FLOW-INDEX-20261006`, `E-CDP-APPLICATION-FLOW-INDEX-20261006`, `E-DEPLOY-PIPELINE-APPLICATION-FLOW-INDEX-20261006`, `E-LIVE-PUBLIC-APPLICATION-FLOW-INDEX-20261006`.

## Current Release Recheck — 8201ad4 — 2026-10-06

- AC-001: PASS — live validator 200, candidate `8201ad40ca47fb60123575baa23f626d5a2c41a9`, 71 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal operations snapshot excluded, Smart Store only, 750 removed, provenance matched.
- AC-003/AC-004: PASS — 국내·일본·세계 활용 카드의 `01 / 03`, `02 / 03`, `03 / 03` 표식 대비를 강화했으며 390·1440px 공개 화면에서 카드·이미지·본문 계층과 가로폭이 유지된다. page/console errors 0을 확인했다.
- AC-005: PASS — UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #465 및 main workflow `37449714953`의 필수 배포 검사가 성공했다.
- AC-006: PASS — 이번 변경은 순서 표식의 시각적 크기·대비만 보정했으며 연구 내용·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007: PASS_WITH_CONDITIONS — 외부 브라우저·실기기·고령 사용자·독립 과학·규제 검토는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`다.

증적: `E-LOCAL-BUILD-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-UI-CONTRACT-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-CDP-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-DEPLOY-PIPELINE-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-LIVE-PUBLIC-APPLICATION-FLOW-MARKER-CONTRAST-20261006`.

## Current Release Recheck — fc61732 — 2026-10-06

- AC-001: PASS — 공개 validator HTTP 200, candidate `fc617329e60bdf4f155e1c0c4bc273833bd36447`, STATIC, 71 bundle hashes, 공개 데이터 정합성 일치.
- AC-002/AC-004: PASS — 351–380px 모바일에서 `가+ 글자` 라벨, 60x44px 터치 영역, 메뉴·공유 컨트롤 비충돌을 확인했고 큰 글씨 토글 상태도 실제 변경된다.
- AC-005: PASS — UI 계약·typecheck·127개 테스트·production build·성능 예산·PR #467·main 배포 workflow `37453296672`의 필수 단계가 성공했다.
- AC-006: PASS — 연구 수치·결과·해석·출처·공개 카피·제품 독립 공개 경계는 변경하지 않았다.
- AC-007: PASS_WITH_CONDITIONS — 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 남아 있다.

Final Status: `INTERNAL_QA_READY_WITH_CONDITIONS`; NAVI `USER_DECISION`; 완료 게이트 `NOT_READY`.

증적: `E-LOCAL-BUILD-MID-NARROW-TYPE-CONTROL-20261006`, `E-UI-CONTRACT-MID-NARROW-TYPE-CONTROL-20261006`, `E-CDP-MID-NARROW-TYPE-CONTROL-20261006`, `E-DEPLOY-PIPELINE-MID-NARROW-TYPE-CONTROL-20261006`, `E-LIVE-PUBLIC-MID-NARROW-TYPE-CONTROL-20261006`.

## Current Release Recheck — 9ee09d8 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `9ee09d8721b75bf875e28fe18476a0c63de1bd25`·HTTP 200·STATIC·71개 bundle hash·provenance `matched`를 확인했다.
- AC-003/AC-004 연구 카드 흐름·반응형: PASS. 390px 직접 링크에서 인지 카드 `01 / 05`, 피부 카드 `02 / 05`가 상단 연구 진행값과 일치하고, 앵커가 sticky 진행 레일 아래에 정렬되며 pageWidth가 390으로 유지된다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #469, main workflow `37455647902`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 연구 내용·출처·제품 독립 공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-RESEARCH-CARD-MARKER-20261006`, `E-UI-CONTRACT-RESEARCH-CARD-MARKER-20261006`, `E-CDP-RESEARCH-CARD-MARKER-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-CARD-MARKER-20261006`, `E-LIVE-PUBLIC-RESEARCH-CARD-MARKER-20261006`.

## Current Release Recheck — a66d8e5 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `a66d8e55bf3d115c082027bd8c1f69e8ffe7b2bb`·HTTP 200·STATIC·71개 bundle hash·provenance `matched`를 확인했다.
- AC-003/AC-004 연구 지도 흐름·반응형: PASS. 390·1440px 직접 링크에서 5개 영역 카드가 `01 / 05`부터 `05 / 05`까지 표시되고, 모바일 카드 폭 350px·데스크톱 카드 폭 228px과 pageWidth가 유지된다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #471, main workflow `37457022682`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 학술 내용·출처·제품 독립 공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-ACADEMIC-MAP-SEQUENCE-20261006`, `E-UI-CONTRACT-ACADEMIC-MAP-SEQUENCE-20261006`, `E-CDP-ACADEMIC-MAP-SEQUENCE-20261006`, `E-DEPLOY-PIPELINE-ACADEMIC-MAP-SEQUENCE-20261006`, `E-LIVE-PUBLIC-ACADEMIC-MAP-SEQUENCE-20261006`.

## Current Release Recheck — df90375 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `df90375ade5323334b79ef13e25fd2cba173981d`·HTTP 200·STATIC·71개 bundle hash·provenance `matched`를 확인했다.
- AC-003/AC-004 일상 카드 흐름·반응형: PASS. 390·1440px 직접 링크에서 5개 카드가 `01 / 05`부터 `05 / 05`까지 표시되고, 모바일 카드 폭 350px·데스크톱 카드 폭 228px과 pageWidth가 유지되며 page/console errors 0이다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #473, main workflow `37458317176`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 카드 문구·과학 정보·출처·제품 독립 공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-EVERYDAY-CARD-SEQUENCE-20261006`, `E-UI-CONTRACT-EVERYDAY-CARD-SEQUENCE-20261006`, `E-CDP-EVERYDAY-CARD-SEQUENCE-20261006`, `E-DEPLOY-PIPELINE-EVERYDAY-CARD-SEQUENCE-20261006`, `E-LIVE-PUBLIC-EVERYDAY-CARD-SEQUENCE-20261006`.

## Current Release Recheck — a84d6f0 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `a84d6f0467c72793ffe5fbe7483305ee63bd9982`·HTTP 200·STATIC·71개 bundle hash·provenance `matched`를 확인했다.
- AC-003/AC-004 전문가 영상 흐름·반응형: PASS. 390·1440px 직접 링크에서 9개 카드가 `01 / 09`부터 `09 / 09`까지 표시되고, `수면` 필터에서도 원래 컬렉션 순서를 유지한다. 두 번째 카드 선택 시 iframe 자동재생이 확인되며 page/console errors 0이다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #476, main workflow `37460547815`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006/AC-007 제품 독립 경계와 감사·레드팀: PASS_WITH_CONDITIONS. 영상 제목·출처·자동재생 동작·제품 독립 공개 경계와 teaser `HOLD`를 유지하며 실기기·고령 사용자·독립 과학·규제 감수는 완료로 표시하지 않는다.
- Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-UI-CONTRACT-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-CDP-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-LIVE-PUBLIC-EXPERT-VIDEO-CARD-SEQUENCE-20261006`.

## Current Release Recheck — e2ef8f0 — 2026-10-06

- AC-001: PASS — live validator HTTP 200, candidate `e2ef8f06b415c7747d991ab1575be0721c456b1e`, 72 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser `HOLD`, internal operations snapshot excluded, Smart Store only, provenance matched.
- AC-003/AC-004: PASS — 390px 연구 결과 카드에서 GABA 결과 요약 띠와 두 조건 레인이 한 번에 보이고 1440px에서는 기존 비교 도표가 유지된다. 두 공개 화면의 body width는 viewport와 일치하며 오류 0이다.
- AC-005: PASS — UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #482, main workflow `37467358386`의 필수 배포 검사가 성공했다.
- AC-006: PASS — 이번 변경은 모바일 도표 배치와 이미지 압축만 보정했으며 연구 내용·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007: PASS_WITH_CONDITIONS — 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 외부 게이트로 남아 있다.

Final Status: `NOT_READY`; NAVI `USER_DECISION`.

증적: `E-LOCAL-BUILD-RESEARCH-COMPARISON-SCAN-20261006`, `E-UI-CONTRACT-RESEARCH-COMPARISON-SCAN-20261006`, `E-CDP-RESEARCH-COMPARISON-SCAN-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-COMPARISON-SCAN-20261006`, `E-LIVE-PUBLIC-RESEARCH-COMPARISON-SCAN-20261006`.

## Current Release Recheck — 7d81419 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `7d8141987b580e9987012f0fe628527d96ac0975`·HTTP 200·STATIC·72개 bundle hash·12개 claim·6개 master record·6개 share page·provenance `matched`를 확인했다.
- AC-003/AC-004 전문가 영상 흐름·반응형: PASS. 390px에서 플레이어와 선택 정보가 좌우로 함께 보이고 350px에서는 세로 흐름, 1440px에서는 기존 갤러리가 유지된다. 두 번째 카드 선택 시 iframe 자동재생 URL과 선택 상태가 갱신되며 page/console/http errors 0이다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산과 PR #484, main workflow `37471094112`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006: PASS. 이번 변경은 전문가 영상 카드의 반응형 배치만 보정했으며 영상 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007: PASS_WITH_CONDITIONS. teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI `USER_DECISION`.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-UI-CONTRACT-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-CDP-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-LIVE-PUBLIC-EXPERT-VIDEO-MID-MOBILE-20261006`.

## Current Release Recheck — 7fe6a4d — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `7fe6a4d260419a704e68c43c92276da3852bba82`·HTTP 200·STATIC·72개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 연구 지도·카드 맥락: PASS. `#research`는 첫 카드를 자동 선택하지 않고 `다섯 연구 영역 / 06 / 12`로 시작하며, 인지 노드 선택 뒤에만 `인지 연구 결과 / 연구 01 / 05`와 카드 active 상태를 표시한다. 390px에서 URL·`aria-pressed`·카드 active·page/console/http errors 0을 확인했다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #486, main workflow `37474843826`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 연구 지도 선택 맥락만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-CONTEXT-20261006`, `E-UI-CONTRACT-RESEARCH-MAP-CONTEXT-20261006`, `E-CDP-RESEARCH-MAP-CONTEXT-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-CONTEXT-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-CONTEXT-20261006`.

## Current Release Recheck — d450e98 — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `d450e98a41923491acb51adc7efd4c8f086c877b`·HTTP 200·STATIC·72개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 연구 지도 첫 렌더·카드 선택: PASS. `#research` 첫 렌더에서 `selectedNodes=0`, `firstCardActive=false`, `GABA 연구의 중심`을 유지하며, 인지 선택 뒤 URL·`인지 연구 결과 / 연구 01 / 05` 레일·`aria-pressed=true`·카드 active가 함께 갱신된다. 390px page/console/http errors 0이다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #488, main workflow `37476812066`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 연구 지도 초기 상태만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-UI-CONTRACT-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-CDP-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`.

## Current Release Recheck — a6c8c6e — 2026-10-06

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `a6c8c6e7dccbfc80e9f189d502ba43714e650ee0`·HTTP 200·STATIC·72개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 모바일 헤더·발견성: PASS. 351–430px에서는 `공유하기` 라벨, 350px에서는 compact icon rail이 표시되며 메뉴·글자 크기·공유 버튼 비겹침과 가로폭 정합을 확인했다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산, PR #494, main workflow `37482350132`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 경계: PASS. 공유 라벨과 공개 릴리스 manifest 표현만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-UI-CONTRACT-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-CDP-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-DEPLOY-PIPELINE-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-LIVE-PUBLIC-MEDIUM-PHONE-SHARE-LABEL-20261006`.

## Current Release Recheck — fb603a48 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `fb603a48dbffc5fdb6da2732487c2f759749b408`·HTTP 200·STATIC·72개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 모바일 첫 화면·반응형: PASS. 390·350px의 hero 문구가 화면 안에 완전히 표시되고 공유 라벨·헤더 조작이 유지되며, 1440px 제목 흐름도 유지된다. 세 폭 모두 document width와 scroll width가 일치하고 hero line overflow가 없다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산, PR #498, main workflow `37487864715`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 hero 줄바꿈 기회와 모바일 헤더 번들 최적화만 다뤘으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-MOBILE-HERO-LINE-BREAK-20261007`, `E-UI-CONTRACT-MOBILE-HERO-LINE-BREAK-20261007`, `E-CDP-MOBILE-HERO-LINE-BREAK-20261007`, `E-DEPLOY-PIPELINE-MOBILE-HERO-LINE-BREAK-20261007`, `E-LIVE-PUBLIC-MOBILE-HERO-LINE-BREAK-20261007`.

## Current Release Recheck — d17014d6 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `d17014d6d7baad43a53e39953a397f32307488e9`·HTTP 200·STATIC·72개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 전문가 영상 선택·모바일 반응형: PASS. 390px에서 메타 레일이 `수면 · 선택 후 재생 · 01 / 09`로 읽히며 두 번째 카드 선택 뒤 `준비 중`·제목 갱신·`aria-pressed=true`·feature 포커스 복귀가 확인됐다. 390px 문서 폭은 `390/390`, 데스크톱은 `1425/1425`로 정합했다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·production build·성능 예산, PR #500/#501, main workflow `37491933306`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 최종 정적 자산 총량은 `1,648,499 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 전문가 영상 상태 표시·선택 피드백·정적 스타일 정리에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-VIDEO-STATE-RAIL-20261007`, `E-UI-CONTRACT-VIDEO-STATE-RAIL-20261007`, `E-CDP-VIDEO-STATE-RAIL-20261007`, `E-DEPLOY-PIPELINE-VIDEO-STATE-RAIL-20261007`, `E-LIVE-PUBLIC-VIDEO-STATE-RAIL-20261007`.

## Current Release Recheck — f2241eb — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. 공개 validator가 candidate `f2241eb98301a4f4a06a2df9b0b153bccd8aa913`·HTTP 200·STATIC·72개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 전문가 영상 필터·모바일 반응형: PASS. 390px `연구 읽기` 필터에서 포스터 내부 `05`와 카드 `05 / 09`가 일치하고, document width와 scroll width가 `390/390`이며 errors `[]`다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·production build·성능 예산, PR #503, main workflow `37495381996`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 정적 자산 총량은 `1,648,293 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 영상 순번 표식과 UI 계약 보강에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-VIDEO-ORDER-20261007`, `E-UI-CONTRACT-VIDEO-ORDER-20261007`, `E-CDP-VIDEO-ORDER-20261007`, `E-DEPLOY-PIPELINE-VIDEO-ORDER-20261007`, `E-LIVE-PUBLIC-VIDEO-ORDER-20261007`.

## Current Release Recheck — 0869337 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. PR #505가 main에 병합됐고 workflow `37498997965`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-003/AC-004 좁은 모바일 깊은 이동·반응형: PASS. 공개 320px에서 연구·전문가 영상·마지막 장이 각각 절대 위치 15793·33816·38110에 안정적으로 도착하며 targetTop 184, document width 320, errors `[]`다. 전문가 영상 handoff 버튼도 제목·첫 영상 카드까지 연결된다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #505, main workflow `37498997965`가 성공했다. 정적 자산 총량은 `1,648,563 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 좁은 모바일 렌더링 안정성에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-NARROW-DEEP-LINK-20261007`, `E-UI-CONTRACT-NARROW-DEEP-LINK-20261007`, `E-CDP-NARROW-DEEP-LINK-20261007`, `E-DEPLOY-PIPELINE-NARROW-DEEP-LINK-20261007`, `E-LIVE-PUBLIC-NARROW-DEEP-LINK-20261007`.

## Current Release Recheck — 7997fd5 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. PR #507이 main에 병합됐고 workflow `37501337335`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-003/AC-004 중간 폭 공유 발견성·반응형: PASS. 공개 cache-busted 390·351px에서 `공유하기` 라벨과 72px rail, 350px에서 44px icon rail을 확인했다. 390px 실제 공유 클릭 후 토스트와 document width 390, errors `[]`다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #507, main workflow `37501337335`가 성공했다. 정적 자산 총량은 `1,648,675 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. UI 발견성·safe-area 레일만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.
증적: `E-LOCAL-BUILD-MEDIUM-SHARE-LABEL-20261007`, `E-UI-CONTRACT-MEDIUM-SHARE-LABEL-20261007`, `E-CDP-MEDIUM-SHARE-LABEL-20261007`, `E-DEPLOY-PIPELINE-MEDIUM-SHARE-LABEL-20261007`, `E-LIVE-PUBLIC-MEDIUM-SHARE-LABEL-20261007`.

## Current Release Recheck — 7669136 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. PR #510이 main에 병합됐고 workflow `37504028167`의 release-verify·Pages·라이브 smoke·release-status가 성공했다.
- AC-003/AC-004 공유 피드백·읽기 흐름·반응형: PASS. 공개 390px에서 공유 직후 토스트가 표시되고 120px 스크롤 후 숨겨지며 연구·전문가 영상·마지막 장 제목이 보인다. document width는 390이고 errors `[]`다. 1440px에서도 hero와 핵심 제목이 정합했다.
- AC-005 배포 게이트: PASS. UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #510과 main workflow `37504028167`가 성공했다. 정적 자산 총량은 `1,648,979 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. 공유 피드백 자동 해제만 보정했으며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.
증적: `E-LOCAL-BUILD-SHARE-DISMISS-20261007`, `E-UI-CONTRACT-SHARE-DISMISS-20261007`, `E-CDP-SHARE-DISMISS-20261007`, `E-DEPLOY-PIPELINE-SHARE-DISMISS-20261007`, `E-LIVE-PUBLIC-SHARE-DISMISS-20261007`.

## Current Release Recheck — 20a4713 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. PR #512가 main에 병합됐고 workflow `37508721569`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 공개 URL HTTP 200을 확인했다.
- AC-003/AC-004 태블릿 성장 연구 흐름·직접 진입·반응형: PASS. 공개 768px에서 sticky reading rail 아래 성장 제목과 3×2 6단계 흐름, 행간 연결을 확인했다. 공개 390·1440px에서도 성장·전문가 영상·마지막 장 제목과 document width 정합을 확인했다.
- AC-005 배포 게이트: PASS. UI contract·typecheck·127개 테스트·정적 Pages bundle·성능 예산, PR #512와 main workflow `37508721569`가 성공했다. 최종 local Pages 자산 총량은 `1,649,489 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 태블릿 정보 구조·깊은 이동 안정성·접근성 의미 구조에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-TABLET-GROWTH-FLOW-20261007`, `E-UI-CONTRACT-TABLET-GROWTH-FLOW-20261007`, `E-CDP-TABLET-GROWTH-FLOW-20261007`, `E-DEPLOY-PIPELINE-TABLET-GROWTH-FLOW-20261007`, `E-LIVE-PUBLIC-TABLET-GROWTH-FLOW-20261007`.

## Current Release Recheck — 0f7adb6 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. PR #514가 main에 병합됐고 workflow `37511444066`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 공개 URL은 HTTP 200이다.
- AC-003/AC-004 태블릿 공유 발견성·반응형: PASS. 공개 390·701·768·900·1440px에서 `공유하기` 라벨, 44px 터치 높이, 701–900px 78px 레일, 가로폭 초과 없음이 확인됐다.
- AC-005 배포 게이트: PASS. UI contract·typecheck·127개 테스트·Pages 번들·성능 예산, PR #514 required checks와 main workflow `37511444066`이 성공했다. 최종 local Pages 자산 총량은 `1,649,679 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 태블릿 헤더 공유 라벨과 UI 계약에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-TABLET-SHARE-LABEL-20261007`, `E-UI-CONTRACT-TABLET-SHARE-LABEL-20261007`, `E-CDP-TABLET-SHARE-LABEL-20261007`, `E-DEPLOY-PIPELINE-TABLET-SHARE-LABEL-20261007`, `E-LIVE-PUBLIC-TABLET-SHARE-LABEL-20261007`.

## Current Release Recheck — 988c020 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. main workflow `37536776591`의 Pages 배포·라이브 smoke·release-status가 성공했고 공개 validator가 candidate `988c0201755be798598bf06c3ef2a9631a69e078`·HTTP 200·STATIC·73개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 태블릿 정보 배치·반응형: PASS. 공개 390·768·1440px에서 국내외 활용 카드가 모바일·태블릿 1열, 데스크톱 3열로 읽히고 768px 마지막 카드 오른쪽 빈 공간과 다음 장 handoff의 끊김이 제거됐다.
- AC-005 배포 게이트: PASS. PR #530 required checks와 main workflow의 release-verify·worker-readiness·Pages·라이브 smoke·release-status가 성공했다. 로컬 Pages 성능 예산은 `1,649,674 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 태블릿 카드 배치와 높이 보정에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-TABLET-APPLICATION-RHYTHM-20261007`, `E-UI-CONTRACT-TABLET-APPLICATION-RHYTHM-20261007`, `E-CDP-TABLET-APPLICATION-RHYTHM-20261007`, `E-DEPLOY-PIPELINE-TABLET-APPLICATION-RHYTHM-20261007`, `E-LIVE-PUBLIC-TABLET-APPLICATION-RHYTHM-20261007`.

## Current Release Recheck — 55aa1b4 — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. PR #532가 main에 병합됐고 workflow `37539036705`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 공개 validator가 candidate `55aa1b483531176bd4eba3f32fc47925ee6ff61a`·HTTP 200·STATIC·73개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 전문가 영상·태블릿 반응형: PASS. 공개 768px에서 9개 영상 카드가 1열로 읽히고 마지막 카드 오른쪽 빈 공간이 제거됐다. 공개 390px에서는 2열 썸네일 갤러리, 1440px에서는 기존 데스크톱 갤러리가 유지됐다.
- AC-005 배포 게이트: PASS. UI contract·typecheck·127개 테스트·production build·Pages 번들·성능 예산, PR #532 required checks와 main workflow `37539036705`가 성공했다. remote Pages 성능 총량은 `1,649,937 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 전문가 영상 카드의 반응형 정보 배치에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-TABLET-VIDEO-RHYTHM-20261007`, `E-UI-CONTRACT-TABLET-VIDEO-RHYTHM-20261007`, `E-CDP-TABLET-VIDEO-RHYTHM-20261007`, `E-DEPLOY-PIPELINE-TABLET-VIDEO-RHYTHM-20261007`, `E-LIVE-PUBLIC-TABLET-VIDEO-RHYTHM-20261007`.

## Current Release Recheck — 8926b4e — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. PR #534가 main에 병합됐고 workflow `37541239081`의 release-verify·Pages·라이브 smoke·release-status가 성공했다. 공개 validator가 candidate `8926b4e10e43dca547ccf35a002d740553be474e`·HTTP 200·STATIC·73개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 학술 연구 지도·태블릿 반응형: PASS. 공개 768px에서 5개 연구 영역 카드가 1열로 읽히고 두 번째 줄 오른쪽 빈 공간이 제거됐다. 공개 390px에서는 1열, 1440px에서는 기존 5열 지도가 유지됐다.
- AC-005 배포 게이트: PASS. UI contract·typecheck·127개 테스트·production build·Pages 번들·성능 예산, PR #534 required checks와 main workflow `37541239081`가 성공했다. remote Pages 성능 총량은 `1,649,901 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 학술 연구 지도 카드의 반응형 정보 배치에 한정되며 연구 카피·수치·출처·제품 독립 공개 경계를 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, 외부 브라우저·실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-TABLET-ACADEMIC-MAP-RHYTHM-20261007`, `E-UI-CONTRACT-TABLET-ACADEMIC-MAP-RHYTHM-20261007`, `E-CDP-TABLET-ACADEMIC-MAP-RHYTHM-20261007`, `E-DEPLOY-PIPELINE-TABLET-ACADEMIC-MAP-RHYTHM-20261007`, `E-LIVE-PUBLIC-TABLET-ACADEMIC-MAP-RHYTHM-20261007`.

## Current Release Recheck — 4d128fa — 2026-10-07

- AC-001 공개 URL·Pages candidate·라이브 정합성: PASS. main workflow `37545095666`의 release-verify·fresh TF pulse·worker-readiness·Pages·라이브 smoke·release-status가 성공했고 공개 validator가 candidate `4d128fa1ca6cda9f4a2f5c3ee1463aa829703b8c`·HTTP 200·STATIC·73개 bundle hash·12개 claim·6개 master record·6개 share page·teaser `HOLD`·provenance `matched`를 확인했다.
- AC-003/AC-004 좁은 모바일 전문가 영상·반응형: PASS. 320·350px 컴팩트 카드에서 포스터와 영상 설명이 함께 보이고 390px·768px·1440px 영상 흐름과 document width 정합을 유지했다. 선택 영상 전환·iframe 로딩·공유 버튼은 정상이다.
- AC-005 배포 게이트: PASS. PR #536·#537 required checks, local build·UI contract·typecheck·Pages 번들·성능 예산, main workflow의 freshness·Pages·라이브 smoke·release status가 성공했다. 최종 local Pages 자산 총량은 `1,649,418 bytes <= 1,650,000`이다.
- AC-006 제품 독립 경계: PASS. 이번 변경은 전문가 영상의 초소형 모바일 정보 배치와 NAVI heartbeat freshness 기록에 한정되며 공개 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. 새 CRITICAL/MAJOR 코드 결함은 없으며 teaser `HOLD`, Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 검토는 완료로 표시하지 않는다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-NARROW-EXPERT-HERO-20261008`, `E-UI-CONTRACT-NARROW-EXPERT-HERO-20261008`, `E-CDP-NARROW-EXPERT-HERO-20261008`, `E-DEPLOY-PIPELINE-NARROW-EXPERT-HERO-20261008`, `E-LIVE-PUBLIC-NARROW-EXPERT-HERO-20261008`.
## Current Release Recheck — 인쇄·PDF 지연 렌더링 — 2026-10-07

- AC-003/AC-006 인쇄·PDF 활용성: LOCAL PASS. `public/print.css`가 화면용 지연 렌더링을 인쇄 시 펼치고, 화면 전용 조작부를 숨기며, 연구 출처 URL 14개를 유지한다.
- AC-005 로컬 품질 게이트: PASS. UI contract·typecheck·127개 테스트·production build·정적 번들·성능 예산과 Chrome Playwright 인쇄 미디어 검증이 성공했다. 문서 높이는 `21049px → 19401px`로 줄었다.
- 공개 Pages 배포 후 live print stylesheet·computed style·PDF screenshot 재검증은 PENDING이다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `E-LOCAL-BUILD-PRINT-FLOW-20261008`, `E-UI-CONTRACT-PRINT-FLOW-20261008`, `E-CDP-PRINT-FLOW-20261008`, `E-DEPLOY-PIPELINE-PRINT-FLOW-20261008`, `E-LIVE-PUBLIC-PRINT-FLOW-20261008`.
## Current Release Recheck — aa4ea2f — 2026-10-07

- AC-001 공개 URL·라이브 정합성: PASS. 공개 validator가 candidate `aa4ea2f147ac4997844221ed3c2c64ba86bdcc20`와 HTTP 200을 확인했다.
- AC-003/AC-006 인쇄·PDF: PASS. 공개 print.css·인쇄 미디어 계산값·출처 URL 14개·화면 전용 chrome 0개·지연 섹션 6개 실제 렌더를 확인했다.
- AC-005 배포 게이트: PASS. PR #539와 main workflow `37547332906`의 필수 검증 및 공개 Pages 배포가 성공했다.
- AC-007 감사·레드팀: PASS_WITH_CONDITIONS. teaser `HOLD`와 외부 브라우저·실기기·실제 고령 사용자·독립 과학·규제 검토 조건을 유지한다.

Final Status: `NOT_READY`; NAVI 상태는 `USER_DECISION`이다.

증적: `C-227`, `E-LOCAL-BUILD-PRINT-FLOW-20261008`, `E-UI-CONTRACT-PRINT-FLOW-20261008`, `E-CDP-PRINT-FLOW-20261008`, `E-DEPLOY-PIPELINE-PRINT-FLOW-20261008`, `E-LIVE-PUBLIC-PRINT-FLOW-20261008`.
