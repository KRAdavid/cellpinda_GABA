# Assumptions Register

| ID | Statement | Type | Evidence | Impact | Validation Method | Owner | Status |
|---|---|---|---|---|---|---|---|
| A-001 | 현재 저장소와 GitHub Pages 공개 URL이 실행 대상이다. | FACT | E-LIVE-PUBLIC | 범위가 다른 사이트로 이동하지 않도록 함 | 라이브 URL·candidate SHA 대조 | NAVI | VALIDATED |
| A-002 | 공개 번들은 제품 구매 안내가 아닌 GABA 과학 정보 안내 흐름이다. | FACT | E-RESEARCH-COPY | 콘텐츠 경계를 유지 | 공개 카피 검사와 화면 확인 | 콘텐츠 QA | VALIDATED |
| A-003 | Chrome CDP 1440px·390px 렌더가 대표 화면을 점검하는 기준이다. | ASSUMPTION | E-CDP-DESKTOP, E-CDP-MOBILE | 다른 브라우저 차이가 남음 | Safari/iOS/Android 추가 QA | UX QA | OPEN |
| U-001 | Safari, iOS Safari, Android Chrome의 폰트·이미지·sticky header 차이는 확인하지 않았다. | UNKNOWN | E-REDTEAM-REVIEW | 라이브 시각 품질의 잔여 위험 | 대표 실기기 또는 브라우저 실행 | QA | OPEN |
| U-002 | 고령 사용자의 실제 독해 시간·회상률·연구 도표 이해도는 사용자 테스트로 확인하지 않았다. | UNKNOWN | E-REDTEAM-REVIEW | 가독성 평가의 외삽 한계 | 3~5명 사용성 테스트 | UX QA | OPEN |
| U-003 | 공개 과학·건강 표현에 대한 독립 과학·규제 감수는 자동화된 QA로 대체할 수 없다. | EXTERNAL_VALIDATION_REQUIRED | E-REDTEAM-REVIEW | 공개 표현의 외부 적합성 미확정 | 독립 검토 증거 등록 | 콘텐츠 책임자 | OPEN |
