# Audit Report

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

## Release Recheck — 1f56cb6 — 2026-10-02

- 읽기 진행 표시가 본문 장 번호와 일치하도록 정렬되어 모바일 대표 화면에서 `07 / 12`, `08 / 12`, `11 / 12`, `12 / 12`가 확인됐다.
- 로컬 검증은 127개 테스트, production build, 11개 정적 라우트, 73개 번들 파일, Pages 성능 `1599635 <= 1600000` bytes로 통과했다.
- Chrome CDP QA는 390px·1440px에서 가로 넘침 없이 통과했으며 메뉴·앵커 이동·포커스 복귀·sticky 헤더·runtimeErrors 0건을 재확인했다.
- GitHub Actions `37005335681`의 release-verify, worker-readiness, deploy-pages, smoke-live, release-status가 모두 성공했고, `deploy-worker`는 STATIC_ONLY 조건으로 건너뛰었다.
- 라이브 validator는 candidate `1f56cb68799a8a430ec27940240b7f894a00f2be`, HTTP 200, 73 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- Safari/iOS/Android 실기기, 고령 사용자 실제 독해성, 독립 과학·규제 감수의 잔여 조건은 계속 OPEN으로 유지한다.
