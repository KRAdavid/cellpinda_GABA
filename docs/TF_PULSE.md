# TF 자동 협업 파동

`pnpm run tf:pulse`는 현재 `Goal Contract`와 canonical 업무 그래프를 읽어 다음 회의에서 검토할 작업별 결정 제안을 만든다. 실행 담당과 독립 검증자를 함께 참여시키고, 상태를 바꾸지 않은 채 증거·대기 입력·다음 행동을 정리한다.

GitHub Actions의 `TF decision pulse` workflow가 6시간마다 같은 명령을 실행하고 JSON 결과를 run summary와 14일 보존 artifact로 남긴다. `workflow_dispatch`로 즉시 다시 실행할 수도 있다. 이 주기는 상태를 임의로 바꾸거나 외부 게시·구매를 실행하지 않고, 새 입력이 필요한 TF 회의 안건을 계속 갱신한다.

`pnpm run validate:tf-pulse`는 pulse가 ACTIVE Goal Contract·canonical 그래프·B4 티저 게이트와 일치하는지, 모든 활성 작업에 담당자·검증자·다음 행동이 있는지, 자동화가 사람의 반대 의견을 만들어내지 않았는지를 배포 전에 확인한다.

```sh
pnpm run tf:pulse
pnpm run tf:pulse -- --json
```

`VERIFYING` 작업은 독립 검증이 끝날 때까지 완료·공개로 전환하지 않는다. `WAITING`과 `BACKLOG` 작업은 대기 입력이나 선행조건이 없으면 자동 실행하지 않는다. `READY` 작업은 내부 샌드박스 실행을 제안하지만 외부 게시·구매·법적 약속을 만들지 않는다. 티저 B4가 `HOLD`이면 pulse가 반드시 `WAITING` 결정을 유지한다.

출력의 `dissent: null`과 `dissentStatus: human-meeting-required`는 자동화가 실제 사람의 반대 의견을 만들어내지 않았다는 뜻이다. 대표 또는 지정 책임자가 회의에서 반대 의견·결정자·재검토 조건을 보완해야 하며, 이 명령의 결과만으로 콘텐츠 승인이나 운영 배포를 완료 처리하지 않는다.
