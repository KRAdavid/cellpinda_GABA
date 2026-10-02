# Coverage Map

| Area | Applicability | Status | Rationale | Evidence / Owner |
|---|---|---|---|---|
| Technology | APPLICABLE | CHECKED | React/Vite 타입·빌드·정적 라우트 검증 | E-LOCAL-TYPECHECK, E-LOCAL-BUILD / 프런트엔드 QA |
| Product | APPLICABLE | CHECKED | 제품 광고와 공개 과학 안내의 경계 확인 | E-RESEARCH-COPY / 콘텐츠 QA |
| User | APPLICABLE | CHECKED | 소비자 흐름·가독성·모바일 화면 확인 | E-CDP-DESKTOP, E-CDP-MOBILE / UX QA |
| Market | NOT_APPLICABLE | NOT_APPLICABLE | 시장 규모나 판매 의사결정이 이번 배포 품질 범위가 아님 | 범위 제외 |
| Competitors | NOT_APPLICABLE | NOT_APPLICABLE | 경쟁사 비교를 하지 않는 공개 안내서 | 범위 제외 |
| Science | APPLICABLE | EXTERNAL_REVIEW | 공개 연구 요약은 자동 검증을 통과했으나 독립 과학 감수는 별도 게이트 | E-RESEARCH-COPY / 외부 과학 감수 필요 |
| Data | APPLICABLE | CHECKED | 공개 인덱스·카피·번들 간 정합성 확인 | E-LOCAL-BUILD / 데이터 QA |
| Regulation | APPLICABLE | EXTERNAL_REVIEW | 건강·과학 정보의 공개 표현에 대한 독립 규제 검토 필요 | E-REDTEAM-REVIEW / 외부 검토 필요 |
| Legal | APPLICABLE | EXTERNAL_REVIEW | 법률 의견이나 광고 적합성 판정은 이번 자동 QA 범위 밖 | E-REDTEAM-REVIEW / 외부 검토 필요 |
| IP | NOT_APPLICABLE | NOT_APPLICABLE | 신규 지식재산권 판단을 하지 않음 | 범위 제외 |
| Finance | NOT_APPLICABLE | NOT_APPLICABLE | 비용·매출·가격을 결정하지 않음 | 범위 제외 |
| Cost | NOT_APPLICABLE | NOT_APPLICABLE | 비용 산정이 이번 목표가 아님 | 범위 제외 |
| Manufacturing | NOT_APPLICABLE | NOT_APPLICABLE | 제조 공정을 다루지 않음 | 범위 제외 |
| Supply Chain | NOT_APPLICABLE | NOT_APPLICABLE | 공급망 실행을 다루지 않음 | 범위 제외 |
| Quality | APPLICABLE | CHECKED | 콘텐츠·코드·정적 번들 품질을 점검 | E-LOCAL-TESTS, E-LOCAL-BUILD / QA |
| Distribution | APPLICABLE | CHECKED | GitHub Pages 라이브 공개 응답과 번들 확인 | E-LIVE-PUBLIC / 배포 QA |
| Sales | NOT_APPLICABLE | NOT_APPLICABLE | 판매 전환을 목표로 하지 않음 | 범위 제외 |
| Marketing | APPLICABLE | CHECKED | 사업자 활용을 고려하되 제품 광고와 분리 | E-RESEARCH-COPY / 콘텐츠 QA |
| Operations | APPLICABLE | CHECKED | 배포·검증·복구 절차가 저장소에 존재 | E-LIVE-PUBLIC / 운영 QA |
| People | APPLICABLE | EXTERNAL_REVIEW | 실제 고령 사용자 독해성은 사용자 테스트가 필요 | E-CDP-MOBILE / 사용자 테스트 필요 |
| Contracts | NOT_APPLICABLE | NOT_APPLICABLE | 계약을 체결하거나 검토하지 않음 | 범위 제외 |
| Tax | NOT_APPLICABLE | NOT_APPLICABLE | 세무를 다루지 않음 | 범위 제외 |
| Security | APPLICABLE | CHECKED | 공개 번들에서 비공개 운영 자료 제외 확인 | E-LOCAL-BUILD / 보안 QA |
| Risk | APPLICABLE | CHECKED | 잔여 위험과 외부 검증 게이트를 기록 | E-REDTEAM-REVIEW / NAVI |
| Execution | APPLICABLE | CHECKED | 자동 점검 명령과 결과를 재현 | E-LOCAL-TESTS, E-CDP-MOBILE / QA |
| Post-launch | APPLICABLE | EXTERNAL_REVIEW | 실제 사용자 반응·브라우저 전체 조합은 공개 후 관찰 필요 | E-LIVE-PUBLIC / 운영자 |
