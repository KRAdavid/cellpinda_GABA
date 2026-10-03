# Red Team Report

## Recheck — 2026-10-03 — 078d231

- 읽기 진행 바가 연구 카드의 스크롤 콘텐츠를 비추던 시각 결함을 확인하고 불투명 레이어로 보정했다. 320/390/1440px CDP에서 진행 안내·연구 결과 분리가 유지되고 새 runtime error는 없었다.
- PR #60 및 main push `37082824190`의 자동 검사와 라이브 validator가 통과했다. 이 변경은 연구 카피·제품 경계·출처를 변경하지 않았다.
- 기존 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이며 `PASS_WITH_CONDITIONS`를 유지한다.

## Recheck — 2026-10-03 — 7a64726

- 읽기 진행 표시의 접근성·가독성 보완과 사용하지 않는 구형 챌린지 이미지 제거는 `E-LOCAL-BUILD-READING-PROGRESS`, `E-CDP-READING-PROGRESS`, `E-DEPLOY-PIPELINE-READING-PROGRESS`, `E-LIVE-PUBLIC-READING-PROGRESS`로 확인됐다.
- 이 변경은 과학 카피의 의미나 제품 독립 경계를 확장하지 않았고, 새 치명적 결함은 확인되지 않았다. 기존 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 그대로 OPEN이다.
- 결과는 `PASS_WITH_CONDITIONS`를 유지하며, 외부 과학·규제 감수와 대표 실기기·실사용자 검증 전에는 `COMPLETED`로 승격하지 않는다.

- Result: PASS_WITH_CONDITIONS
- Reviewer: 독립 omission·failure-mode work pass
- Reviewer ID: NAVI-REDTEAM-GABA-20261002
- Date: 2026-10-02

## Required questions

- Most likely failure cause: 공개 카피가 소비자에게 의학적 효능 보장처럼 읽히거나 브라우저별 레이아웃 차이가 라이브에서 드러나는 경우다.
- Outside expert criticism: 자동화된 결과·도표 검증과 독립적인 과학·규제 감수는 서로 다른 증거라고 지적할 것이다.
- User-needed but unrequested consideration: 실제 고령 사용자 독해성 테스트, Safari·실기기 시각 QA, 변경 시 연구 근거 재검토가 필요하다.
- Why the result could become useless: 새로운 영상·연구·카피가 추가되면서 현재의 제품 독립 경계와 출처 연결이 깨질 수 있다.
- Shared false assumption: 화면 크기와 자동 검사를 통과하면 모든 사용자의 이해도와 브라우저 품질이 보장된다고 가정할 위험이 있다.
- Missing stakeholder: 독립 과학 감수자, 규제·광고 검토자, 고령 사용자 대표다.
- Most dangerous UNKNOWN: 건강 관련 공개 문구가 외부 공유 과정에서 효능 주장으로 확대되는지 여부다.

## Findings

| ID | Severity | Lens | Evidence / Reasoning | Impact | Required Fix | Owner | Status |
|---|---|---|---|---|---|---|---|
| RT-001 | MAJOR | 브라우저 범위 | E-CDP-DESKTOP, E-CDP-MOBILE만으로 모든 브라우저·실기기를 보장할 수 없음 | 라이브에서 폰트·sticky·이미지 차이가 생길 수 있음 | Safari/iOS/Android 대표 환경 검증을 추가하거나 미검증 범위를 계속 표시 | QA | OPEN |
| RT-002 | MAJOR | 과학 카피 오인 | E-RESEARCH-COPY와 화면은 경계를 보여주지만 공유 과정의 재해석을 통제하지 않음 | 연구 결과가 효능 단정으로 확산될 수 있음 | 독립 과학·규제 감수와 공유용 카피 변경 감시 추가 | 콘텐츠 책임자 | OPEN |
| RT-003 | MINOR | 사용자 이해도 | E-CDP-MOBILE은 레이아웃만 증명하고 실제 고령 사용자 이해도는 증명하지 않음 | “한번에 읽히는가”의 실제 검증이 부족함 | 3~5명 사용성 테스트 또는 읽기 시간·이해도 측정 | UX QA | OPEN |

## Result Notes

치명적 결함은 발견하지 않았지만, 위 조건을 해결하기 전 `COMPLETED`로 표시하지 않는다.
