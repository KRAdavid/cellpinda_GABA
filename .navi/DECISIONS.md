# Decision Log

| ID | Date | Decision | Options Considered | Evidence | Owner / Authority | Impact | Revisit Trigger |
|---|---|---|---|---|---|---|---|
| DEC-001 | 2026-10-02 | 공개 배포 품질을 NAVI로 자동 점검하고 저장소 보완을 진행한다. | 수동 점검만 진행 / 자동 점검과 기록 병행 | E-USER-AUTO-UPDATE | 현재 사용자 | 코드·문서 보완 권한을 부여함 | 목표·범위가 바뀔 때 |
| DEC-002 | 2026-10-02 | Browser 플러그인 부재로 Chrome CDP를 대표 시각 QA로 사용한다. | 브라우저 QA 생략 / CDP fallback | E-CDP-DESKTOP, E-CDP-MOBILE | 현재 사용자·NAVI | 검증 한계를 명시함 | Browser 또는 실기기 환경 확보 시 |
| DEC-003 | 2026-10-02 | 자동 QA 통과를 독립 과학·규제 감수 완료로 간주하지 않는다. | 자동 검사만으로 완료 / 외부 검증 게이트 유지 | E-REDTEAM-REVIEW | NAVI | 공개 표현의 잔여 위험을 숨기지 않음 | 외부 reviewer 증거 등록 시 |
| DEC-004 | 2026-10-02 | 재현 가능한 사용자 결함이 없어 UI 코드를 불필요하게 변경하지 않는다. | 장식 추가 / 기준선 유지 | E-LOCAL-BUILD, E-CDP-MOBILE | NAVI | 안정성과 시각 일관성을 유지함 | 새로운 결함 증거가 생길 때 |

Record user decisions, approval gates, material assumptions accepted as risk, and decisions to defer work.
