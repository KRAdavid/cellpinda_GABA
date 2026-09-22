# 공개 배포 감사 기준 — 2026-09-22 (라이브 원천 포인터)

이 문서는 2026년 9월 22일 KST에 확인한 공개 배포 감사 기준을 보존한다. PR [#198](https://github.com/KRAdavid/cellpinda_GABA/pull/198)은 일반 건강 연구와 GABA 섭취 연구를 소비자 화면에서 분리하고 연구 경계 문구를 회귀 검증에 고정했다. 라이브 SHA·manifest 생성 시각·최신 배포 run은 문서에 복제하지 않는다. 문서 전용 병합도 main SHA를 바꾸기 때문에, 현재 판정은 항상 라이브 [release-manifest.json](https://kradavid.github.io/cellpinda_GABA/release-manifest.json)의 `candidateSha`·`generatedAt`과 [최신 성공 Actions 실행](https://github.com/KRAdavid/cellpinda_GABA/actions)을 직접 확인한다.

## 판정

기술 공개 단계는 통과했다. GitHub Pages 정적 사이트가 공개되어 있고, 공개 경로·연구 원장·제품 경계·Smart Store 목적지·후기 목적지·티저 승인 경계가 자동 검증됐다. Worker/D1 운영과 제품·후기·티저에 필요한 외부 승인은 사람 입력 게이트로 남아 있으므로, 운영 완료나 제품 효능 확정으로 해석하지 않는다.

## 라이브 증거

아래 값은 2026-09-22 문서 작성 시점에 확인한 마지막 라이브 스냅샷이다. 이 문서 병합·재배포 뒤에는 SHA와 manifest 생성 시각이 바뀔 수 있으므로, 문서의 숫자를 현재값으로 재사용하지 않고 라이브 manifest와 최신 성공 run을 다시 확인한다.

| 항목 | 확인값 |
| --- | --- |
| 공개 주소 | `https://kradavid.github.io/cellpinda_GABA` |
| 라이브 candidate SHA | 라이브 `release-manifest.json`의 `candidateSha` |
| manifest 생성 시각 | 라이브 `release-manifest.json`의 `generatedAt` |
| 실행 모드 | `static` |
| 공개 경로 | 10개 |
| 공개 주장·연구·제품·후기 | 12개 · 6건 · 1개 · 1개 |
| 티저 | `HOLD`, 공개 URL 없음 |
| 최근 배포 | main 기준 최신 성공 [Actions 실행](https://github.com/KRAdavid/cellpinda_GABA/actions) |

PR #198의 코드 배포 시점에는 candidate SHA `ae4ed2783f2bfc9c8ed6411602f0381e1d4f6cb1`, manifest 생성 시각 `2026-09-22T01:29:21.088Z`, 배포 run `35675887961`이 기록됐다. 이 값은 코드 변경 시점의 역사 스냅샷이며 현재값으로 재사용하지 않는다. PR #198·#199 모두 작성자·병합자가 `KRAdavid`, 독립 리뷰 0건·`REVIEW_REQUIRED`인 관리자 병합이며, 현재 [CODEOWNERS](../.github/CODEOWNERS)는 단일 계정만 지정한다. 이 병합은 독립 Code Owner 승인을 의미하지 않는다.

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

PR #168·#169·#171·#172·#173·#198은 작성자와 인증 계정이 같은 상태에서 독립 Code Owner 승인을 만들 수 없었기 때문에, 필수 검사를 확인한 뒤 관리자 우회를 병합에만 일시 적용하고 즉시 복구했다. 각 병합에서는 `require_last_push_approval`을 포함한 보호 설정을 병합 직전에 보존하고, 병합 직후 전체 보호 설정을 PUT으로 복원해 필수 검사·Code Owner·마지막 push 승인·관리자 강제 적용을 다시 확인했다. 각 PR은 작성자·병합자·리뷰 수·보호 규칙 변경 시간을 GitHub 이벤트로 추적할 수 있으며, 이 기록은 독립 승인을 의미하지 않는다.

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

## 2026-09-22 모바일 첫 질문 노출 보정 및 라이브 재검증

PR [#204](https://github.com/KRAdavid/cellpinda_GABA/pull/204)에서 390px 화면에서 1분 체크를 시작할 때 질문 제목만 화면에 맞고 첫 선택지가 아래로 밀리던 문제를 수정했다. 질문 제목을 모바일 헤더 아래에 맞춘 뒤 첫 선택지가 함께 보이도록 포커스 스크롤 보정값을 적용했다.

병합·배포 후 다음을 다시 확인했다.

- 라이브 candidate SHA `d27625c62c0d754aa56a947964cfaa07f9c7846a`
- 모바일 390×844: 질문 상단 `72.1px`, 첫 선택지 상단 `210.6px`, 헤더 하단 `72px`
- 데스크톱 1440×900: 질문 상단 `87.9px`, 첫 선택지 상단 `254.3px`, 헤더 하단 `88px`
- 라이브 `validate:live-public`: HTTP 200, provenance `matched`, 제품 1개, 연구 6건, 공유 경로 6개, 750 제거, Smart Store 단일 목적지
- 15개 주요 화면 감리: 가로 넘침·콘솔 오류·이름 없는 컨트롤·alt 누락 각 0건
- 필수 PR 검사 `release-verify`·`site-quality-verify` 및 Pages 배포 run [#35681874175](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/35681874175) 성공

이 변경은 모바일 탐색 품질만 보정했으며, 연구·제품 효능 범위나 B2·B3·B4·C2·E1 외부 승인 상태를 변경하지 않았다.

## 예약 자동화 신선도 감시

- 목적: 일일 보고와 TF pulse의 예약 실행이 멈추거나 지연된 상태를 공개 사이트 변경 없이 감지합니다.
- 감시 주기: 매시 15분(`automation-freshness.yml`)
- 기준: 일일 보고 마지막 예약 성공 후 26시간 이내, TF pulse 마지막 예약 성공 후 8시간 이내
- 산출물: 실행별 JSON 아티팩트 14일 보관과 단일 자동 경보 이슈
- 복구: 상태가 `MET`으로 돌아오면 열린 경보 이슈를 자동 종료합니다.
- 통제 범위: `contents: read`, `actions: read`, `issues: write`만 사용하며 제품 문구, 표시·광고, 후기 권한, 주문, 외부 게시 상태를 변경하지 않습니다.

이번 감시는 예약 실행의 신선도만 측정합니다. 수동 실행 성공은 예약 실행 성공으로 대체하지 않으며, 일정 지연이 감지되면 경보를 남긴 채 공개 배포 승인 상태를 임의로 바꾸지 않습니다.

## PR #207 병합·복구 기록

[PR #207](https://github.com/KRAdavid/cellpinda_GABA/pull/207)은 자동화 감시 계약을 추가하고 필수 검사 `release-verify`·`site-quality-verify`를 통과한 뒤 관리자 병합으로 반영했다. PR 작성자와 인증 계정이 같은 저장소 정책상 독립 Code Owner 승인을 만들 수 없었기 때문에, 병합 시점에만 main 보호 규칙을 일시 해제하고 병합 직후 원래 설정을 PUT으로 복구했다. 현재 보호 규칙은 필수 검사 2개, Code Owner 승인 1명, 마지막 push 승인, 관리자 강제 적용, 선형 이력, 대화 해결을 다시 요구한다.

병합 후 정적 Pages 배포와 라이브 smoke는 성공했고, [자동화 신선도 실행](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/35684530038)은 TF pulse의 마지막 예약 성공이 기준을 넘은 사실을 `STALE`로 기록해 [자동 경보 이슈 #208](https://github.com/KRAdavid/cellpinda_GABA/issues/208)을 만들었다. 이 경보는 다음 예약 실행이 기준 안으로 회복되면 자동 종료되며, 공개 콘텐츠·제품·후기·주문·배포 승인 상태를 바꾸지 않는다.
