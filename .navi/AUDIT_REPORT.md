# Audit Report

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
