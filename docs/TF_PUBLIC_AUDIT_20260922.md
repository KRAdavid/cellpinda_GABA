# 공개 배포 감리 기록 · 2026-09-22

## 판정

이번 후보는 기존 공개 흐름을 유지하면서 제품 표시와 연구 결과의 경계를 더 분명하게 보정했다. 공개 사이트의 최종 SHA·경로·콘텐츠 수는 병합 후 생성되는 `release-manifest.json`을 기준으로 판단한다.

## 감리에서 확인한 문제와 조치

- 제품 포장 사진에 현재 승인되지 않은 라벨·인증·순도 문구가 보일 수 있어 공개 자산에서 제거했다. 제품 화면은 중립적인 30포 구성 시각화만 사용한다.
- 제품 분류가 현행 라벨과 최종 대조되기 전까지 공개 데이터는 `판매처 표기 기준 · 기타가공품`으로 표시하고, 제품 JSON-LD에는 분류를 넣지 않는다.
- 홈페이지 연구 카드와 연구 목록 카드에는 `일반 GABA 연구에서 본 내용 · 셀핀다 제품 정보와는 따로 확인해요`라는 짧은 안내를 두고, 섹션 상단의 안내문에서 연구와 제품의 범위를 한 번에 설명한다.
- 성장호르몬 연구 카드에는 혈액 속 수치를 섭취 후 90분 동안 본 연구라는 범위와 성장·근육 효과를 확인한 연구가 아니라는 설명을 결과 옆에 고정했다.
- 첫 화면에서는 `잠과 휴식 1분 체크`를 주 버튼으로, GABA 설명 이동을 보조 링크로 구분했다.
- 티저가 `HOLD`인 동안에도 스크린리더가 자동 재생 문구를 먼저 읽던 문제를 `영상 공개 준비 상태 → 재생 가능할 때 자동 재생 → 실패 시 재생 버튼` 순서로 정리했다(PR #196).
- TF pulse가 `startup_failure`로 시작되지 않던 원인을 저장소 Actions 허용 목록에서 `actions/download-artifact`가 빠진 것으로 확인했다. 공식 액션의 고정 패턴만 추가한 뒤 수동 pulse `35675041821`이 검증·안전 실행·아티팩트 업로드를 모두 통과했다. 예약 실행의 heartbeat 반영은 다음 schedule에서 확인한다.

## 검증 기준

다음 검사는 후보에서 통과해야 한다.

- `pnpm run validate:ui-contract`
- `pnpm run validate:research-copy`
- `pnpm run validate:public`
- `pnpm run typecheck`
- `pnpm test`
- `pnpm run build`
- `pnpm run validate:live-public` (병합·배포 후)

티저 공개, 후기 재게시 권한, 현행 포장·표시사항 승인, Worker·D1 운영 연결, 실제 주문 대사는 별도 외부 게이트로 유지한다. 이 문서는 그 승인을 대신하지 않는다.

## 2026-09-22 11:06 KST 재감리 · 현재 라이브 기준

최신 `main`과 공개 `release-manifest.json`의 후보 SHA `929691c4e2d1af949d44744736d2593595ec0dfb`를 기준으로 시각·접근성·메타데이터 감리를 다시 수행했다. 이전 `ada1984` 후보의 결과를 현재 배포본으로 갱신한 기록이다.

- 정적 공개 라우트 10개가 모두 HTTP 200이며, 라이브 provenance가 `matched`였다.
- 390·768·1440px 5개 주요 경로(총 15케이스)에서 가로 넘침, 콘솔·예외·네트워크 오류, 이름 없는 컨트롤, 이미지 alt 누락을 모두 0건으로 확인했다.
- 각 경로의 `lang=ko`, `main`, `h1`, title, description, canonical, Open Graph·Twitter 카드 경로가 일치했다. 404 응답은 `noindex,nofollow`를 유지했다.
- 뇌 컨디션 챌린지 CTA, 연구·제품 CTA, Smart Store 제품·후기 목적지를 실제 렌더링에서 확인했다. 후기 목적지는 `https://smartstore.naver.com/cellpinda/products/4701017202#REVIEW_DIALOG`로 고정되어 있다.
- `validate:ui-contract`, `validate:research-copy`, `validate:public`, `validate:static-bundle`, `validate:governance`, `typecheck`, `pnpm test`, `validate:live-public`가 모두 통과했다.
- 신규 P0/P1/P2는 발견되지 않았다. GitHub Pages 응답의 CSP·`X-Content-Type-Options`·`Referrer-Policy`·`Permissions-Policy` 부재는 Worker/프록시 도입 시 보강하는 조건부 P2로 유지한다.

이번 재감리는 공개 문구·제품 데이터·티저 승인 상태를 변경하지 않았다. B2·B3·B4·C2·E1 외부 입력 게이트와 독립 Code Owner 검토 조건은 그대로 열어 둔다.
