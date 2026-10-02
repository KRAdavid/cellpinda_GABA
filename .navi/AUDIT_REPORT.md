# Audit Report

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
