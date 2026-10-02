# Project Plan

## Phases

1. Discovery: 저장소·기존 NAVI 상태·공개 URL·검증 명령을 확인한다.
2. Goal Lock: 공개 배포 품질 고도화 목표와 제품 독립 경계를 고정한다.
3. Deliverable Lock: 사이트와 검증 패킷의 기능·품질·금지 조건을 고정한다.
4. Architecture: 콘텐츠·프런트엔드·QA·배포·감사 workstream과 증거 구조를 연결한다.
5. Execution: 타입체크, 테스트, 빌드, 정적·성능·라이브·시각·상호작용 검증을 실행한다.
6. Audit: 실행 역할과 분리된 검토로 요구사항·근거·번들·사용성을 재확인한다.
7. Red Team: 브라우저 범위, 과학 카피 오인, 고령 사용자 독해성, 운영 실패를 공격적으로 점검한다.
8. Rework / Completion: 결함이 있으면 보완 후 재검증하고, 남은 외부 검증은 사용자 결정 상태로 보낸다.

## Workstreams

| ID | Capability | Output | Dependency | Verification | Owner | Status |
|---|---|---|---|---|---|---|
| WS-001 | 콘텐츠·근거 검토 | 공개 카피·연구 카드·출처 경계 | 공개 연구 인덱스 | validate:research-copy, validate:public | 콘텐츠 QA | DONE |
| WS-002 | React/Vite UX | 첫 화면·연구 확장·모바일 레이아웃 | 기존 디자인 시스템 | typecheck, build, screenshot | 프런트엔드 | DONE |
| WS-003 | 반응형·상호작용 QA | 1440px·390px·메뉴 상태 검증 | 로컬 Vite 서버 | Chrome CDP, runtime logs | UX QA | DONE_WITH_CONDITIONS |
| WS-004 | 배포·운영 | GitHub Pages 공개 번들·라이브 검증 | main 배포 워크플로 | validate:live-public | 배포 QA | DONE |
| WS-005 | 독립 감사·레드팀 | 감사 보고서·잔여 위험·다음 게이트 | WS-001~004 증거 | 별도 reviewer IDs | NAVI | DONE_WITH_CONDITIONS |

## Three questions

- What are we trying to achieve exactly? 공개 방문자가 GABA 안내서를 고급스럽고 쉽게 읽고, 배포 품질을 반복 검증할 수 있게 한다.
- Does current work directly contribute to that goal? 모든 실행 결과가 사이트 렌더, 연구 이해, 모바일 접근성, 공개 번들 검증에 직접 연결된다.
- What has not yet been considered or verified? Safari/iOS/Android 실기기 조합, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다.
