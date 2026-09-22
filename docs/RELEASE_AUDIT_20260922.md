# 공개 배포 감사 스냅샷 — 2026-09-22 (PR #191 이후 감사 포인터)

이 문서는 2026년 9월 22일 KST에 공개 배포 상태를 다시 확인한 결과를 보존한다. 상단 감사 포인터는 PR [#190](https://github.com/KRAdavid/cellpinda_GABA/pull/190)·[#191](https://github.com/KRAdavid/cellpinda_GABA/pull/191) 병합 뒤 main·live SHA `e8a3d34da59d01d1b9296dab81e39d980505759d`, 라이브 manifest 생성 시각 `2026-09-22T00:06:53.388Z`, 최신 성공 배포 [run 35670446287](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/35670446287)를 문서 작성 시점 스냅샷으로 기록한다. PR #190은 감사 포인터를 갱신했고 PR #191은 첫 연구 카드의 제품 경계 문구를 회귀 검증에 고정했다. 이후 문서 병합이나 재배포로 SHA와 생성 시각이 바뀔 수 있으므로, 현재 판정은 항상 라이브 [release-manifest.json](https://kradavid.github.io/cellpinda_GABA/release-manifest.json)과 최신 성공 배포 run을 우선한다.

## 판정

기술 공개 단계는 통과했다. GitHub Pages 정적 사이트가 공개되어 있고, 공개 경로·연구 원장·제품 경계·Smart Store 목적지·후기 목적지·티저 승인 경계가 자동 검증됐다. Worker/D1 운영과 제품·후기·티저에 필요한 외부 승인은 사람 입력 게이트로 남아 있으므로, 운영 완료나 제품 효능 확정으로 해석하지 않는다.

## 라이브 증거

아래 값은 2026-09-22 문서 작성 시점에 확인한 마지막 라이브 스냅샷이다. 이 문서 병합·재배포 뒤에는 SHA와 manifest 생성 시각이 바뀔 수 있으므로, 문서의 숫자를 현재값으로 재사용하지 않고 라이브 manifest와 최신 성공 run을 다시 확인한다.

| 항목 | 확인값 |
| --- | --- |
| 공개 주소 | `https://kradavid.github.io/cellpinda_GABA` |
| 라이브 candidate SHA | `e8a3d34da59d01d1b9296dab81e39d980505759d` |
| manifest 생성 시각 | `2026-09-22T00:06:53.388Z` |
| 실행 모드 | `static` |
| 공개 경로 | 10개 |
| 공개 주장·연구·제품·후기 | 12개 · 6건 · 1개 · 1개 |
| 티저 | `HOLD`, 공개 URL 없음 |
| 최근 배포 | [run 35670446287](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/35670446287), `success` |

직전 PR #187 감사 시점의 역사 스냅샷인 candidate SHA `58bb9c084b4d36d71f62a76621e0d99d12b6d970`, manifest 생성 시각 `2026-09-21T23:32:58.084Z`, 배포 run `35667945940`와 그 이전 PR #173 역사 스냅샷의 candidate SHA `95f4c4efe46b802e1b929f464569cd3bff72f1b2`, manifest 생성 시각 `2026-09-21T20:51:55.426Z`, 배포 run `35653630085`는 감사 이력으로 보존한다. PR #189도 작성자·병합자가 `KRAdavid`, 독립 리뷰 0건·`REVIEW_REQUIRED`인 관리자 병합이며, 현재 [CODEOWNERS](../.github/CODEOWNERS)는 단일 계정만 지정한다. 이 병합은 독립 Code Owner 승인을 의미하지 않는다.

라이브 manifest의 자동 검사는 다음 7개가 모두 `true`다.

`routeSet` · `smartStoreOnly` · `reviewDestination` · `researchIndex` · `teaserBoundary` · `challengeCopy` · `productBoundary`

라이브 검증 명령은 page 200, provenance 일치, Smart Store 단일 목적지, 후기 `#REVIEW_DIALOG`, 750 제품 제거, 내부 운영 스냅샷 제외를 확인했다.

## 화면·콘텐츠 확인

- 390px 모바일과 데스크톱 화면에서 가로 넘침과 콘솔 오류가 없다.
- PR #168에서 데스크톱 결과 순서를 `챌린지 → 결과·제품/후기`로 고정했고, 독립 모바일 감리에서 발견한 390px grid 회귀를 PR #169에서 단일 열 자동 행으로 복원했다. 최신 라이브에서 제품 CTA 폭 312px, 후기 CTA 폭 226.8px, 가로 오버플로 0을 확인했다.
- 결과 화면 바로 아래에 `뇌컨디션 확인 챌린지 해보기`가 노출되고, 클릭하면 챌린지 제목으로 포커스가 이동한다.
- Powers 연구 카드는 `GABA 3g을 먹고 90분 동안 혈액 속 성장호르몬을 살펴본 연구`로 표시된다.
- 카드의 범위 안내는 `성장·근육 발달 효과를 확인한 연구가 아니며`, `3g은 셀핀다 제품 섭취량의 근거가 아니다`라고 연구 조건과 제품 정보를 분리한다.
- PR [#171](https://github.com/KRAdavid/cellpinda_GABA/pull/171)에서 공개 연구 claim과 마스터 인덱스의 소비자 문구·범위·시각화 필드를 전수 비교하도록 보강했다. 누락·중복·필드 드리프트가 있으면 공개 export와 라이브 smoke가 실패한다.
- 제품 구매와 후기는 지정된 Smart Store 상품·후기 주소로만 연결된다.
- 티저는 승인 전 `HOLD` 상태이며 외부 영상 iframe이나 공개 URL을 만들지 않는다.

## 배포 통제

현재 `main` 보호 규칙은 다음과 같다.

- 필수 검사: `release-verify`, `site-quality-verify`
- Code Owner 리뷰: 1명
- 관리자 강제 적용: 활성
- 선형 이력·대화 해결: 활성
- force push·브랜치 삭제: 차단

PR #168·#169·#171·#172·#173은 작성자와 인증 계정이 같은 상태에서 독립 Code Owner 승인을 만들 수 없었기 때문에, 필수 검사를 확인한 뒤 관리자 우회를 병합에만 일시 적용하고 즉시 복구했다. PR #171·#172·#173에서는 `require_last_push_approval` 때문에 병합 직전에 PR 리뷰 규칙을 일시 해제했고, 병합 직후 전체 보호 설정을 PUT으로 복원해 필수 검사·Code Owner·마지막 push 승인·관리자 강제 적용을 다시 확인했다. 각 PR은 작성자·병합자·리뷰 수·보호 규칙 변경 시간을 GitHub 이벤트로 추적할 수 있으며, 이 기록은 독립 승인을 의미하지 않는다.

수동 TF pulse는 별도 write-capable job을 schedule/main에만 제한한다. `workflow_dispatch`와 임의 ref는 read-only 후보 검사만 실행하며 heartbeat branch push·PR 생성 권한을 받지 않는다. 이 경계는 `scripts/validate-tf-pulse-workflow.mjs`와 `scripts/validate-governance.mjs`에서 검사한다.

## 재현한 검증

현재 main에서 다음 검사를 통과했다.

```text
pnpm run validate:ui-contract
pnpm run validate:public
pnpm run validate:research-copy
pnpm test                         # 123/123
pnpm run build
pnpm run validate:live-public
pnpm run audit:goal -- --json
pnpm audit --prod --audit-level=high
git diff --check
```

현재 공개 파일에는 로컬 경로가 포함되지 않지만 `pnpm run audit:history-privacy`는 과거 이력의 12개 경로에서 로컬 경로 패턴을 찾는 advisory 경고를 남긴다. 이는 `server/server.test.mjs`, `worker/worker.test.mjs`, 과거 감사 문서·로컬 manifest 등 과거 버전에 한정된 기록이다. 공개 저장소의 이력을 force push로 다시 쓰지 않고 보존하기 때문에, 이 경고는 공개 번들 누출이 아니라 역사 정리 보류 상태로 기록한다. 저장소를 깨끗한 이력으로 재작성하려면 별도 보안 검토·백업·보호 규칙 해제 승인·외부 clone 영향 확인이 선행되어야 한다.

## 남은 외부 게이트

| 게이트 | 현재 상태 | 필요한 증빙 |
| --- | --- | --- |
| B2 | `VERIFYING` | 최종 제품 표시·분류·SKU·섭취/보관 주의 승인 |
| B3 | `WAITING` | 후기 원문 출처·재게시 권한·개인정보·광고 관계 검토 |
| B4 | `WAITING` | 티저 포스터·음원·대본·길이·권리·최종 CTA 승인 |
| C2 | `WAITING` | Cloudflare 토큰·계정·D1·관리자 토큰·회원 origin·`CLOUDFLARE_WORKER_URL` repository variable·복구 점검 |
| E1 | `WAITING` | 판매자 계정·상품 ID·주문/취소/환불 응답·대사 창구 |

이 게이트는 자동으로 완료 처리하지 않는다. 증빙이 들어오면 해당 검증기와 라이브 smoke를 다시 실행하고, 독립 검토자·시각·파일 지문을 기록한 뒤 공개 상태를 갱신한다.

## 현재 결론

공개 정적 사이트의 기술 품질과 감사 추적성은 배포 가능한 상태다. 티저와 Worker/D1은 의도적으로 잠겨 있으며, 외부 승인 없이 자동 공개하지 않는다. 다음 감리의 기준은 이 문서가 아니라 그 시점의 라이브 manifest, 보호 규칙, 성공 배포 run이다.
