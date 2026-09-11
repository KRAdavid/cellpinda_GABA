# TF 자동 협업 파동

`pnpm run tf:pulse`는 현재 `Goal Contract`와 canonical 업무 그래프를 읽어 다음 회의에서 검토할 작업별 결정 제안을 만든다. 실행 담당과 독립 검증자를 함께 참여시키고, 상태를 바꾸지 않은 채 증거·대기 입력·다음 행동을 정리한다. `WAITING`·`BACKLOG` 작업은 그래프의 `requiredInputs` 체크리스트를 함께 내보내 회의에서 준비할 자료를 한눈에 확인한다.

GitHub Actions의 `TF decision pulse` workflow가 6시간마다 같은 명령을 실행하고 JSON 결과를 run summary와 14일 보존 artifact로 남긴다. 안전한 요약 heartbeat는 `data/tf-pulse-heartbeat.json`에 저장되며, `[skip ci]`가 붙은 heartbeat 커밋을 `main`에 push한 뒤 `deploy.yml`을 한 번 명시적으로 dispatch한다. GitHub `GITHUB_TOKEN`으로 만든 push는 후속 workflow를 자동 실행하지 않으므로 명시적 dispatch가 필요하고, `[skip ci]`는 push 기반 중복 실행을 차단한다. 공개 운영 큐는 마지막 pulse 시각·상태 지문을 계속 보여 준다. heartbeat에는 역할·상태·필요 입력만 포함하며 원문 경로와 비밀값은 저장하지 않는다. `workflow_dispatch`로 즉시 다시 실행할 수도 있다. 이 주기는 상태를 임의로 바꾸거나 외부 게시·구매를 실행하지 않고, 새 입력이 필요한 TF 회의 안건을 계속 갱신한다.

`pnpm run validate:tf-pulse-workflow`는 schedule·수동 실행·최소 권한·heartbeat 커밋·push·명시적 deploy dispatch 순서를 자동 검사한다. `pnpm run validate:tf-pulse`는 heartbeat의 상태 지문·카운트·대기 목록이 현재 pulse와 같은 실행인지도 확인한다. workflow를 수정할 때 `[skip ci]`를 빠뜨리거나 dispatch를 제거하면 build가 실패한다.

화면의 `목표 감사 JSON`은 Goal Contract, 역할 커버리지, 상태 카운트, 완료 마일스톤과 현재 입력 게이트를 같은 실행에서 만든 공개 요약이다. [공개 목표 감사](https://kradavid.github.io/cellpinda_GABA/data/goal-audit.json)는 중간 회의용 상태 패킷이며 실제 자격·외부 승인·주문 완료를 증명하지 않는다.

`pnpm run validate:tf-pulse`는 pulse가 ACTIVE Goal Contract·canonical 그래프·B4 티저 게이트와 일치하는지, 모든 활성 작업에 서로 다른 담당자·독립 검증자·다음 행동이 있는지, 입력 대기 작업에 `requiredInputs`가 있는지, 자동화가 사람의 반대 의견을 만들어내지 않았는지를 배포 전에 확인한다. 필수 역할의 책임·권한·매칭어는 `data/tf-role-registry.json`에서 읽고, 마케팅·소비자심리, 연구·근거, 제품·표시, 스토리·UX·프런트, 데이터·판매처, QA·감사 역할군이 그래프에 함께 남아 있는지 검사한다. 이는 역할 책임의 존재를 확인하는 규칙이며 실제 전문가 자격·섭외를 의미하지 않는다. 각 pulse에는 그래프 상태 지문(`snapshotHash`), 역할군 상태(`roleCoverage`), 회의 안건(`meetingAgenda`), 외부 입력 게이트(`inputGates`)와 사람 판단 필요 여부(`requiresHumanDecision`)가 함께 기록된다. 안전한 heartbeat에도 같은 역할 ID·라벨·상태를 보존해 다음 실행이 TF 구성을 재현하지 못한 경우 배포를 차단한다. heartbeat는 직전 상태 지문과 비교한 `stateChanged`도 기록해 새 결정과 반복 안건을 구분한다.

Goal Contract의 `decisionProtocol`은 각 pulse의 `meetingProtocol`으로 복제된다. 운영 큐·공개 TF pulse·heartbeat가 같은 회의 주기, 정족수, 필수 기록 항목을 보여 주며, 정족수 규칙이 바뀌면 상태 지문도 달라져 다음 회의에서 변경을 확인할 수 있다. 이 패킷은 회의 운영을 재현하기 위한 공개 요약이며 실제 참석·자격·승인을 증명하지 않는다.

로컬에서 `pnpm run tf:pulse:heartbeat`를 직접 실행하면 별도 파일을 준비하지 않아도 최신 pulse를 내부적으로 생성해 `data/tf-pulse-heartbeat.json`에 저장한다. CI처럼 `tf-pulse.json` 경로를 인자로 주면 그 파일을 명시적으로 검증하며, 존재하지 않는 명시 경로는 조용히 대체하지 않는다.

```sh
pnpm run tf:pulse
pnpm run tf:pulse -- --json
```

`VERIFYING` 작업은 독립 검증이 끝날 때까지 완료·공개로 전환하지 않는다. `WAITING`과 `BACKLOG` 작업은 대기 입력이나 선행조건이 없으면 자동 실행하지 않는다. `READY` 작업은 내부 샌드박스 실행을 제안하지만 외부 게시·구매·법적 약속을 만들지 않는다. 티저 B4가 `HOLD`이면 pulse가 반드시 `WAITING` 결정을 유지한다.

출력의 `dissent: null`과 `dissentStatus: human-meeting-required`는 자동화가 실제 사람의 반대 의견을 만들어내지 않았다는 뜻이다. 대표 또는 지정 책임자가 회의에서 반대 의견·결정자·재검토 조건을 보완해야 하며, 이 명령의 결과만으로 콘텐츠 승인이나 운영 배포를 완료 처리하지 않는다.
