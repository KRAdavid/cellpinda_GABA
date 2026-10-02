# Project Changelog

| Date | State / Change | Reason | Evidence or Decision | Owner |
|---|---|---|---|---|
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
