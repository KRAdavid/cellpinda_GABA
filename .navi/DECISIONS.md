# Decision Log

| ID | Date | Decision | Options Considered | Evidence | Owner / Authority | Impact | Revisit Trigger |
|---|---|---|---|---|---|---|---|
| DEC-001 | 2026-10-02 | 공개 배포 품질을 NAVI로 자동 점검하고 저장소 보완을 진행한다. | 수동 점검만 진행 / 자동 점검과 기록 병행 | E-USER-AUTO-UPDATE | 현재 사용자 | 코드·문서 보완 권한을 부여함 | 목표·범위가 바뀔 때 |
| DEC-002 | 2026-10-02 | Browser 플러그인 부재로 Chrome CDP를 대표 시각 QA로 사용한다. | 브라우저 QA 생략 / CDP fallback | E-CDP-DESKTOP, E-CDP-MOBILE | 현재 사용자·NAVI | 검증 한계를 명시함 | Browser 또는 실기기 환경 확보 시 |
| DEC-003 | 2026-10-02 | 자동 QA 통과를 독립 과학·규제 감수 완료로 간주하지 않는다. | 자동 검사만으로 완료 / 외부 검증 게이트 유지 | E-REDTEAM-REVIEW | NAVI | 공개 표현의 잔여 위험을 숨기지 않음 | 외부 reviewer 증거 등록 시 |
| DEC-004 | 2026-10-02 | 재현 가능한 사용자 결함이 없어 UI 코드를 불필요하게 변경하지 않는다. | 장식 추가 / 기준선 유지 | E-LOCAL-BUILD, E-CDP-MOBILE | NAVI | 안정성과 시각 일관성을 유지함 | 새로운 결함 증거가 생길 때 |
| DEC-005 | 2026-10-08 | 공개 안내서의 마지막 공유 영역을 사업자용 공유 자료 보드로 고도화한다. | 기존 5문장만 유지 / 소개·연구·연구범위·발효 자료를 한 화면에서 선택·복사 | E-USER-BUSINESS-SHARE-20261008 | 현재 사용자 | 사업자가 소비자·다른 사업자에게 제품 독립적인 GABA 정보를 전달할 수 있는 공개 자료 흐름을 추가함 | 독립 과학·규제 감수 또는 공유 자료 운영 요구가 바뀔 때 |
| DEC-006 | 2026-10-08 | 사업자용 공유 자료에 전달 대상 선택과 추천 카드 강조를 추가해 소비자·사업자·교육용 공유 판단을 빠르게 만든다. | 5개 자료만 동일하게 노출 / 대상 선택으로 추천 자료를 강조하고 전체·개별 복사 유지 | E-USER-BUSINESS-AUDIENCE-20261008 | 현재 사용자·NAVI | 공유 정보의 대상별 사용성을 높이되 제품 CTA와 연구 경계를 변경하지 않음 | 실제 사용자 공유 흐름에서 대상 분류가 바뀔 때 |

Record user decisions, approval gates, material assumptions accepted as risk, and decisions to defer work.
