# Dependency Register

| ID | Depends On | Statement | Blocker | Owner | Status | Required Before |
|---|---|---|---|---|---|---|
| D-001 | 공개 연구 인덱스 | 승인된 공개 연구 인덱스와 소비자 카피가 연구 카드에 연결되어야 한다. | no | 콘텐츠 QA | RESOLVED | WS-001 |
| D-002 | GitHub Pages workflow | `main` 배포와 라이브 검증이 공개 URL을 확인해야 한다. | no | 배포 QA | RESOLVED | WS-004 |
| D-003 | React/Vite build | 타입체크와 성능 예산이 통과되어야 정적 번들을 배포할 수 있다. | no | 프런트엔드 | RESOLVED | WS-002 |
| D-004 | 추가 브라우저 환경 | Safari/iOS/Android 대표 화면 검증 환경이 필요하다. | yes | UX QA | OPEN | WS-005 |
| D-005 | 독립 과학·규제 감수 | 공개 과학 표현을 외부 검토할 독립 reviewer가 필요하다. | yes | 콘텐츠 책임자 | OPEN | WS-005 |

## Common ordering patterns

- Regulatory -> Product -> Label
- Product -> Label
- Architecture -> Implementation
- Data Definition -> Analysis
- Requirements -> Development

Delay high-rework work until its prerequisites are resolved or explicitly accepted as risk.
