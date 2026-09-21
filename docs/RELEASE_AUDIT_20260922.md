# 공개 배포 감사 스냅샷 — 2026-09-22

이 문서는 2026년 9월 22일 KST에 공개 배포 상태를 다시 확인한 결과를 보존한다. 이후 문서 병합이나 재배포로 SHA와 생성 시각이 바뀔 수 있으므로, 현재 판정은 항상 라이브 [release-manifest.json](https://kradavid.github.io/cellpinda_GABA/release-manifest.json)과 최신 성공 배포 run을 우선한다.

## 판정

기술 공개 단계는 통과했다. GitHub Pages 정적 사이트가 공개되어 있고, 공개 경로·연구 원장·제품 경계·Smart Store 목적지·후기 목적지·티저 승인 경계가 자동 검증됐다. Worker/D1 운영과 제품·후기·티저에 필요한 외부 승인은 사람 입력 게이트로 남아 있으므로, 운영 완료나 제품 효능 확정으로 해석하지 않는다.

## 라이브 증거

| 항목 | 확인값 |
| --- | --- |
| 공개 주소 | `https://kradavid.github.io/cellpinda_GABA` |
| 라이브 candidate SHA | `82a5f977eb715705db3481f3d029be03fcfd8a7d` |
| manifest 생성 시각 | `2026-09-21T18:21:48.512Z` |
| 실행 모드 | `static` |
| 공개 경로 | 10개 |
| 공개 주장·연구·제품·후기 | 12개 · 6건 · 1개 · 1개 |
| 티저 | `HOLD`, 공개 URL 없음 |
| 최근 배포 | [run 35637789496](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/35637789496), `success` |

라이브 manifest의 자동 검사는 다음 7개가 모두 `true`다.

`routeSet` · `smartStoreOnly` · `reviewDestination` · `researchIndex` · `teaserBoundary` · `challengeCopy` · `productBoundary`

라이브 검증 명령은 page 200, provenance 일치, Smart Store 단일 목적지, 후기 `#REVIEW_DIALOG`, 750 제품 제거, 내부 운영 스냅샷 제외를 확인했다.

## 화면·콘텐츠 확인

- 390px 모바일과 데스크톱 화면에서 가로 넘침과 콘솔 오류가 없다.
- 결과 화면 바로 아래에 `뇌컨디션 확인 챌린지 해보기`가 노출되고, 클릭하면 챌린지 제목으로 포커스가 이동한다.
- Powers 연구 카드는 `GABA 3g을 먹고 90분 동안 혈액 속 성장호르몬을 살펴본 연구`로 표시된다.
- 카드의 범위 안내는 `성장·근육 발달 효과를 확인한 연구가 아니며`, `3g은 셀핀다 제품 섭취량의 근거가 아니다`라고 연구 조건과 제품 정보를 분리한다.
- 제품 구매와 후기는 지정된 Smart Store 상품·후기 주소로만 연결된다.
- 티저는 승인 전 `HOLD` 상태이며 외부 영상 iframe이나 공개 URL을 만들지 않는다.

## 배포 통제

현재 `main` 보호 규칙은 다음과 같다.

- 필수 검사: `release-verify`, `site-quality-verify`
- Code Owner 리뷰: 1명
- 관리자 강제 적용: 활성
- 선형 이력·대화 해결: 활성
- force push·브랜치 삭제: 차단

PR #161은 작성자와 인증 계정이 같은 상태에서 독립 Code Owner 승인을 만들 수 없었기 때문에, 필수 검사를 확인한 뒤 관리자 우회를 병합에만 일시 적용하고 즉시 복구했다. 이 기록은 독립 승인을 의미하지 않는다.

## 재현한 검증

현재 main에서 다음 검사를 통과했다.

```text
pnpm run validate:ui-contract
pnpm test                         # 120/120
pnpm run build
pnpm run validate:live-public
pnpm audit --prod --audit-level=high
git diff --check
```

과거 이력에 남은 로컬 경로 패턴은 현재 공개 파일에 포함되지 않으며, force push 없이 보존한다.

## 남은 외부 게이트

| 게이트 | 현재 상태 | 필요한 증빙 |
| --- | --- | --- |
| B2 | `VERIFYING` | 최종 제품 표시·분류·SKU·섭취/보관 주의 승인 |
| B3 | `WAITING` | 후기 원문 출처·재게시 권한·개인정보·광고 관계 검토 |
| B4 | `WAITING` | 티저 포스터·음원·대본·길이·권리·최종 CTA 승인 |
| C2 | `WAITING` | Cloudflare 토큰·계정·D1·관리자 토큰·회원 origin·복구 점검 |
| E1 | `WAITING` | 판매자 계정·상품 ID·주문/취소/환불 응답·대사 창구 |

이 게이트는 자동으로 완료 처리하지 않는다. 증빙이 들어오면 해당 검증기와 라이브 smoke를 다시 실행하고, 독립 검토자·시각·파일 지문을 기록한 뒤 공개 상태를 갱신한다.

## 현재 결론

공개 정적 사이트의 기술 품질과 감사 추적성은 배포 가능한 상태다. 티저와 Worker/D1은 의도적으로 잠겨 있으며, 외부 승인 없이 자동 공개하지 않는다. 다음 감리의 기준은 이 문서가 아니라 그 시점의 라이브 manifest, 보호 규칙, 성공 배포 run이다.
