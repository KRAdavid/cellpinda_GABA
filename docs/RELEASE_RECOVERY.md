# 배포 복구 패킷 운영 절차

## 목적

main 배포 workflow는 Pages 게시·라이브 smoke·Worker 준비 상태를 하나의 릴리스 결과로 기록합니다. 이 중 하나라도 실패하면 `release-status` job이 실패하더라도 `release-recovery-packet.json`을 항상 생성하고, 같은 릴리스 상태 artifact에 보관합니다. 패킷은 복구 판단에 필요한 후보 SHA, 실행 기록, 공개 주소, 직전 GitHub Pages 성공 배포를 한곳에 모으는 감사 자료입니다.

패킷은 자동 롤백을 실행하거나 배포 승인을 대신하지 않습니다. Pages에 직접 파일을 덮어쓰거나 보호 브랜치를 우회하는 동작도 하지 않습니다. `rollback.automation`은 항상 `manual-approval-required`이며, 이전 성공 배포를 찾지 못하면 운영자가 보관된 artifact를 별도로 확인해야 합니다.

## 패킷을 읽는 법

| 항목 | 의미 |
| --- | --- |
| `candidate.sha` | 실패했거나 확인 중인 현재 main 후보 커밋 |
| `observed` | Pages, smoke, Worker 준비·배포 job의 실제 결과 |
| `deploymentHistory.previousKnownGood` | 현재 후보와 다른 SHA 중 GitHub Pages 성공 상태가 확인된 최근 배포 |
| `deploymentHistory.fallbackSha` | API에서 성공 배포를 확인하지 못했을 때 참고하는 이전 이벤트 SHA. 성공 배포라는 뜻이 아님 |
| `rollback.actions` | 사람 승인 뒤 수행할 순서가 고정된 복구 안내 |

`releaseMode`가 `STATIC_ONLY` 또는 `FULL_RELEASE`이면 복구가 필요하지 않습니다. `RELEASE_FAILED`이면 `rollback.status`가 `READY_FOR_OPERATOR`여야 하며, 기록된 이전 SHA가 실제 공개 `release-manifest.json`과 일치하는지 확인한 뒤에만 다음 단계로 이동합니다.

## 실패 시 운영 순서

1. GitHub Actions의 `cellpinda-gaba-release-status-*` artifact에서 `release-status.json`과 `release-recovery-packet.json`을 내려받습니다. 후보 SHA와 Pages·smoke·Worker 결과를 먼저 확인합니다.
2. 추가 push와 재배포를 잠시 멈추고, `previousKnownGood.sha`가 보존된 배포 artifact와 일치하는지 확인합니다. 값이 없거나 `fallbackSha`만 있으면 성공 배포로 간주하지 말고 보존 artifact를 사람이 찾아 기록합니다.
3. 책임자 승인을 남긴 뒤 보호된 `main` 경로를 통해 검증된 이전 SHA를 재배포합니다. GitHub Pages 파일을 직접 수정하거나 environment 보호 규칙을 우회하지 않습니다.
4. 복구 후보가 공개된 후 `EXPECTED_RELEASE_SHA`를 복구 SHA로 지정해 `pnpm run validate:live-public`을 실행하고, 라이브 manifest·파일 hash·공개 경로가 같은 SHA를 가리키는지 확인합니다.
5. 장애 원인, 승인자, 복구 SHA, 검증 시각과 smoke 결과를 릴리스 기록에 남깁니다. Worker/D1은 별도 Secrets·origin·사람 승인 게이트를 통과하기 전까지 `HOLD`로 유지합니다.

## 생성과 검증

로컬에서 동일한 형식을 재현할 때는 후보와 결과를 환경 변수로 주고 다음 명령을 사용합니다.

```text
node scripts/generate-release-recovery-packet.mjs --out release-recovery-packet.json
pnpm run validate:release-recovery -- release-recovery-packet.json
```

GitHub Actions에서는 deployment 읽기 권한으로 최근 Pages 배포 상태를 조회합니다. 조회가 실패해도 패킷 생성 자체는 중단하지 않고 `unavailable`로 남깁니다. 이 경우 검증된 복구 대상이 없는 상태이므로 사람이 보존 artifact를 확인해야 합니다. 패킷에는 토큰, Secret 값, 로컬 절대 경로를 기록하지 않으며 검증기가 이를 거부합니다.
