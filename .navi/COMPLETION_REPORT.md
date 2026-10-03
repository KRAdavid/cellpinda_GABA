# Completion Report

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
