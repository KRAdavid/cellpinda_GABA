# TF pulse 예약 실행 복구 런북

이 문서는 `TF decision pulse` 예약 실행이 `startup_failure`로 끝나거나 heartbeat가 오래된 상태일 때, 공개 배포 통제를 유지하면서 복구하는 절차를 고정한다.

## 1. 상태 확인

저장소에서 다음 세 가지를 각각 확인한다.

```sh
gh run list --workflow tf-pulse.yml --event schedule --limit 5
gh api repos/KRAdavid/cellpinda_GABA/branches/automation%2Ftf-pulse-heartbeat
gh pr list --state open --base main --head automation/tf-pulse-heartbeat
```

`workflow_dispatch` 성공은 현재 코드가 실행된다는 증거일 뿐, 예약 heartbeat 성공으로 대체하지 않는다. 예약 성공은 `event_name=schedule`, `ref=refs/heads/main`인 실행만 인정한다.

신선도 감시는 실행 시점뿐 아니라 예약 run의 `head_sha`가 현재 monitor의 `GITHUB_SHA`와 같은지도 확인한다. 오래된 커밋의 예약 run을 재실행한 경우에는 시간이 최근이어도 현재 heartbeat의 근거로 인정하지 않는다.

## 2. 안전한 재시도

예약 실행이 재시도 가능한 상태라면 해당 실행의 재실행을 먼저 시도한다.

```sh
gh run rerun <scheduled-run-id>
gh run watch <scheduled-run-id> --interval 10 --exit-status
```

재실행이 허용되지 않거나 오래된 커밋에서 실행된 경우에는 다음 예약 실행을 기다린다. 임의의 로컬 timestamp를 heartbeat에 기록하거나, 수동 실행 결과를 예약 성공으로 표시하지 않는다.

## 3. heartbeat PR 처리

예약 실행이 성공하면 `automation/tf-pulse-heartbeat` 브랜치의 SHA와 `data/tf-pulse-heartbeat.json`의 `generatedAt`을 확인한다. 브랜치가 갱신되었지만 PR 자동 생성이 실패했다면 사람은 해당 브랜치에서 `main`으로 PR을 연다.

PR은 다음 조건을 모두 만족해야 한다.

- `release-verify`와 `site-quality-verify`가 성공
- heartbeat의 `snapshotHash`와 현재 Goal Contract·업무 그래프가 일치
- 보호 규칙이 요구하는 독립 승인과 대화 해결이 충족
- 외부 게시·구매·후기·제품 표시 상태를 자동으로 바꾸지 않음

조건이 충족되지 않으면 heartbeat를 `main`에 직접 push하거나 보호 규칙을 우회하지 않는다.

## 4. 신선도 게이트 회복 확인

heartbeat PR이 `main`에 반영된 뒤 다음을 순서대로 확인한다.

```sh
pnpm run validate:tf-pulse-freshness
pnpm run audit:goal -- --json
pnpm run validate:live-public
```

신선도 게이트가 회복되어도 B2·B3·B4·C2·E1 외부 게이트가 자동으로 완료되는 것은 아니다. 각 게이트의 승인 자료와 책임자 확인을 별도로 기록한다.

## 금지 사항

- 수동 실행을 예약 실행으로 간주하지 않음
- 현재 시각을 임의로 heartbeat에 기록하지 않음
- 실패한 검사를 삭제·완화하지 않음
- 보호 규칙을 끈 채 공개 배포를 진행하지 않음
- 티저·제품 표시·후기·주문 상태를 heartbeat 복구와 함께 자동 공개하지 않음
