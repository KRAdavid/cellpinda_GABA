# TF 자동 협업 파동

`pnpm run tf:pulse`는 현재 `Goal Contract`와 canonical 업무 그래프를 읽어 다음 회의에서 검토할 작업별 결정 제안을 만든다. 실행 담당과 독립 검증자를 함께 참여시키고, 상태를 바꾸지 않은 채 증거·대기 입력·다음 행동을 정리한다. `WAITING`·`BACKLOG` 작업은 그래프의 `requiredInputs` 체크리스트를 함께 내보내 회의에서 준비할 자료를 한눈에 확인한다.

GitHub Actions의 `TF decision pulse` workflow가 6시간마다 같은 명령을 실행하고 JSON 결과를 run summary와 14일 보존 artifact로 남긴다. 안전한 요약 heartbeat는 `data/tf-pulse-heartbeat.json`에 저장되며, `[skip ci]`가 붙은 heartbeat 커밋을 `main`에 push한 뒤 `deploy.yml`을 한 번 명시적으로 dispatch한다. GitHub `GITHUB_TOKEN`으로 만든 push는 후속 workflow를 자동 실행하지 않으므로 명시적 dispatch가 필요하고, `[skip ci]`는 push 기반 중복 실행을 차단한다. 공개 운영 큐는 마지막 pulse 시각·상태 지문을 계속 보여 준다. heartbeat에는 역할·상태·필요 입력만 포함하며 원문 경로와 비밀값은 저장하지 않는다. `workflow_dispatch`로 즉시 다시 실행할 수도 있다. 이 주기는 상태를 임의로 바꾸거나 외부 게시·구매를 실행하지 않고, 새 입력이 필요한 TF 회의 안건을 계속 갱신한다.
같은 workflow는 pulse 생성 직후 `run-safe-tf-actions.mjs`를 실행한다. 이 단계는 CI에 없는 공개 패킷을 내부에서 재생성한 뒤 Goal Contract·연구 문구·티저 경계·샌드박스 MVP·공개 export·TF pulse 검증 여섯 가지를 매회 재실행하고, 결과를 `safe_internal_tf_run` artifact와 run summary에 남긴다. 내부 산출물 생성은 `B_INTERNAL_WRITE`, 검증은 `A_READ`로 기록하며 외부 게시·구매·승인·canonical 업무 그래프 상태 변경은 하지 않는다. 사람 판단 게이트를 감시하는 동안 내부 품질 확인을 멈추지 않는다.
이 결과는 `validate-safe-tf-run.mjs`가 별도로 확인한 뒤에만 heartbeat 저장으로 넘어간다. 검증기는 pulse 지문·목표 ID·사람 게이트 목록·검사 순서·위험 등급·외부 효과 없음·모든 `MET` 결과를 다시 대조하므로, 실행 스크립트의 자기 보고만으로 다음 배포가 진행되지 않는다.

`pnpm run validate:tf-pulse-workflow`는 schedule·수동 실행·최소 권한·heartbeat 커밋·push·명시적 deploy dispatch 순서를 자동 검사한다. `pnpm run validate:tf-pulse`는 heartbeat의 상태 지문·카운트·대기 목록이 현재 pulse와 같은 실행인지도 확인한다. workflow를 수정할 때 `[skip ci]`를 빠뜨리거나 dispatch를 제거하면 build가 실패한다.

화면의 `목표 감사 JSON`은 Goal Contract, 역할 커버리지, 상태 카운트, 완료 마일스톤과 현재 입력 게이트를 같은 실행에서 만든 공개 요약이다. [공개 목표 감사](https://kradavid.github.io/cellpinda_GABA/data/goal-audit.json)는 중간 회의용 상태 패킷이며 실제 자격·외부 승인·주문 완료를 증명하지 않는다.

`pnpm run validate:tf-pulse`는 pulse가 ACTIVE Goal Contract·canonical 그래프·B4 티저 게이트와 일치하는지, 모든 활성 작업에 서로 다른 담당자·독립 검증자·다음 행동이 있는지, 입력 대기 작업에 `requiredInputs`가 있는지, 자동화가 사람의 반대 의견을 만들어내지 않았는지를 배포 전에 확인한다. 필수 역할의 책임·권한·매칭어는 `data/tf-role-registry.json`에서 읽고, 마케팅·소비자심리, 연구·근거, 제품·표시, 스토리·UX·프런트, 데이터·판매처, QA·감사 역할군이 그래프에 함께 남아 있는지 검사한다. 이는 역할 책임의 존재를 확인하는 규칙이며 실제 전문가 자격·섭외를 의미하지 않는다. 각 pulse에는 그래프 상태 지문(`snapshotHash`), 역할군 상태(`roleCoverage`), 회의 안건(`meetingAgenda`), 외부 입력 게이트(`inputGates`)와 사람 판단 필요 여부(`requiresHumanDecision`)가 함께 기록된다. 안전한 heartbeat에도 같은 역할 ID·라벨·상태를 보존해 다음 실행이 TF 구성을 재현하지 못한 경우 배포를 차단한다. heartbeat는 직전 상태 지문과 비교한 `stateChanged`도 기록해 새 결정과 반복 안건을 구분한다.

Goal Contract의 `decisionProtocol`은 각 pulse의 `meetingProtocol`으로 복제된다. 운영 큐·공개 TF pulse·heartbeat가 같은 회의 주기, 정족수, 필수 기록 항목을 보여 주며, 정족수 규칙이 바뀌면 상태 지문도 달라져 다음 회의에서 변경을 확인할 수 있다. 이 패킷은 회의 운영을 재현하기 위한 공개 요약이며 실제 참석·자격·승인을 증명하지 않는다.

각 `meetingAgenda`와 `inputGates`에는 작업별 `quorum`이 추가된다. 내부 위험 작업은 실행 담당자·독립 검증자 2인, 외부 약속 위험(D/E/F)은 여기에 TF 리드·AI 비서실을 더한 3인으로 고정한다. 검증기는 이 역할 배열과 위험도 매핑을 비교해 담당자만으로 승인된 것처럼 보이는 안건을 배포 전에 거부한다.

`tf-meeting-packet.json`은 회의 준비에 필요한 단일 공개 패킷이다. 회의 규칙·역할 커버리지·활성 안건·입력 게이트·목표 감사 요약을 한 문서로 묶고, pulse·운영 큐·목표 감사와 동일한 `snapshotHash`를 사용한다. 원문·개인정보·토큰·실제 참석 기록은 포함하지 않는다.

패킷의 `executionPolicy`는 자동 계속 범위(`READY`와 A/B/C 내부 위험), 사람 검토 전환점(`VERIFYING`·`WAITING` 등), 승인 필요 위험(D/E/F)을 분리한다. 이는 “계속 실행”을 내부 샌드박스로 한정하고 외부 행동은 책임자 승인으로 넘기는 운영 경계다.

로컬에서 `pnpm run tf:pulse:heartbeat`를 직접 실행하면 별도 파일을 준비하지 않아도 최신 pulse를 내부적으로 생성해 `data/tf-pulse-heartbeat.json`에 저장한다. CI처럼 `tf-pulse.json` 경로를 인자로 주면 그 파일을 명시적으로 검증하며, 존재하지 않는 명시 경로는 조용히 대체하지 않는다.

```sh
pnpm run tf:pulse
pnpm run tf:pulse -- --json
```

`VERIFYING` 작업은 독립 검증이 끝날 때까지 완료·공개로 전환하지 않는다. `WAITING`과 `BACKLOG` 작업은 대기 입력이나 선행조건이 없으면 자동 실행하지 않는다. `READY` 작업은 내부 샌드박스 실행을 제안하지만 외부 게시·구매·법적 약속을 만들지 않는다. 티저 B4가 `HOLD`이면 pulse가 반드시 `WAITING` 결정을 유지한다.

출력의 `dissent: null`과 `dissentStatus: human-meeting-required`는 자동화가 실제 사람의 반대 의견을 만들어내지 않았다는 뜻이다. 대표 또는 지정 책임자가 회의에서 반대 의견·결정자·재검토 조건을 보완해야 하며, 이 명령의 결과만으로 콘텐츠 승인이나 운영 배포를 완료 처리하지 않는다.
