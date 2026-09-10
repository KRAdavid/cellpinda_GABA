# Cellpinda Rhythm

소비자가 하루 리듬을 돌아보고 GABA·발효 기술·제품·후기를 이해한 뒤 결과 공유와 구매로 이어지는 체험형 사이트.

## 현재 실행

Node 24 기준. 의존성은 pnpm lockfile로 관리한다.

```sh
pnpm install
node server/index.mjs
# 별도 터미널
node node_modules/vite/bin/vite.js --host 127.0.0.1
```

사이트: http://127.0.0.1:5173/
검토실: http://127.0.0.1:5173/admin
API: http://127.0.0.1:4318/api/health

운영자 토큰은 서버 시작 시 `var/operator-token`에 생성된다. 토큰을 로그·Git·공개 사이트에 포함하지 않는다. SQLite는 `var/site.sqlite`. 이 인증은 로컬 운영자 모델이며 공개 서버용 인증이 아니다.

```sh
node node_modules/typescript/bin/tsc --noEmit
node --test src/domain/rhythm.test.ts server/server.test.mjs
pnpm run sync:data
node node_modules/vite/bin/vite.js build
```

pnpm 설치 시 esbuild 스크립트 승인 경고가 있었으나 현재 번들 빌드는 성공했다. 의존성 재설치 환경의 재현성은 배포 전에 다시 확인한다.

## 구현 상태

- 홈, 비진단 리듬 체크 5문항·4유형, 결과 PNG·공유 링크, GABA 개념 슬라이더, 연구 펼침, 발효 공개 자료, 공식 제품 사진·비교·구매 연결.
- 스마트스토어 후기 원문 탐색. 후기 재인용은 권한 확인 전까지 보류한다.
- 브라우저 로컬 7일 실천 체크. 회원 간 기기 동기화는 미구현.
- 서버 영속 콘텐츠 수정·승인·감사 이력·이벤트 저장. 일부 설명 문구는 아직 코드에 있어 전체 콘텐츠 승인 범위로 확장해야 한다.
- 실구매·7일 재방문·추천보상·회원기록·AI는 운영 정책과 계정 연동이 필요한 후속 범위다. 공개 배포 번들은 GitHub Actions에서 검증한다.

## 문서

- `docs/REQUIREMENTS.md`: 전체 목표 및 요구별 완료 증거
- `docs/TF_BOARD.md`: 팀 책임·의사결정·백로그
- `docs/CACOS_GOAL_CONTRACT.md`: 운영체제 설계서에 맞춘 현재 목표·성공 기준·다음 실행 파동
- `data/goal-contract.json`: 공개 데이터와 분리된 기계 검증용 Goal Contract
- `data/task-graph.json`: 목표에 연결된 작업·의존성·완료 증거·대기 조건
- `data/tf-role-registry.json`: 마케팅·소비자심리부터 QA·감사까지 6개 교차 검토 역할의 책임·권한·매칭 기준
- `data/tf-pulse-heartbeat.json`: 다음 실행에서도 재현하는 안전한 pulse 시각·상태 지문·역할·입력 게이트
- `docs/IMPLEMENTATION_STATUS.md`: 최신 구현·검증·남은 작업
- `data/content-ledger.json`: 내부 근거 원장. 전체 파일을 public으로 복사하지 않는다.
- `docs/EVIDENCE_AUDIT.md`, `docs/ASSET_SOURCES.md`: 원문 검토·실제 제품 사진 출처

공개 응답은 검토된 문안과 공개 URL만 포함한다. 원본 자료·토큰·DB·개인 후기 스크린샷은 공개 배포 대상이 아니다.


## 로컬 데이터와 배포 데이터 동기화

`data/content-ledger.json`이 승인된 콘텐츠의 단일 원장이다. `pnpm run sync:data`는 승인 상태이고 HTTPS 출처가 있는 연구 카드, 승인된 제품·후기만 `public/data/content.json`으로 내보낸다. 이 파일은 Git에 커밋하지 않고 `pnpm run build`와 GitHub Actions에서 매번 새로 생성한다. Worker API가 있는 환경은 `/api/content`를 우선 사용하고, 정적 호스팅에서는 같은 공개 JSON으로 자동 폴백한다.

판매 자료는 별도 경계로 둔다. `data/local-order-manifest.json`을 기준으로 `pnpm run audit:orders`를 실행하면 지정한 로컬 주문 파일에서 개인정보를 제외한 상품군·수량·기간·필드 존재와 파일 해시를 `tmp/local-order-audit.json`에 기록한다. 이 감사 결과는 공개 export에 포함하지 않으며, 판매자 계정과 스마트스토어 API 응답을 확인하기 전까지 실제 매출·환불로 해석하지 않는다. 제품 포장 자료는 같은 방식으로 `pnpm run audit:materials`가 감사한다.

두 로컬 입력을 전체 목표 판정과 함께 확인하려면 로컬 PC에서 `pnpm run audit:goal:local`을 실행한다. 회의용 JSON을 자동 저장하려면 `pnpm run audit:goal:local:json`을 사용한다. 이 명령은 `audit-local-materials`와 `audit-local-orders`를 읽기 전용으로 다시 실행해 완제품 후보·제품군·주문 파일 구조·상태 필드 유무·가장 최근 파일 수정 시각을 비공개 `tmp/local-goal-audit.json`에 붙이며, 스캔 자체가 실패하면 종료 코드 1로 알려 준다. 자료 스캔 성공은 B2 표시 승인, 과거 주문 수량은 E1 실구매·환불 대사를 의미하지 않는다. 결과에는 개인정보·원문 행·로컬 경로를 넣지 않고 공개 export도 변경하지 않으며, CI 기본 감사는 외부 폴더가 없어도 재현되도록 옵션을 생략한다.

운영 MVP의 재개 상태는 `src/domain/ops-validation.ts`의 공통 검증을 거쳐 Node API와 Cloudflare Worker에 저장된다. 업무 상태 전환·검증 증거·승인 연결을 확인하고 이메일·전화번호·비공개 경로·토큰 같은 필드는 거부한다. 샌드박스 상태 저장은 외부 게시나 실구매 완료를 의미하지 않는다.

```sh
pnpm run sync:data
pnpm run build
pnpm run goal:next
pnpm run tf:pulse
pnpm run validate:tf-pulse
pnpm run audit:goal
pnpm run audit:orders
pnpm run preflight:deploy
```

`TF decision pulse` workflow는 6시간마다 canonical 업무 그래프의 실행·검증·입력 대기 안건을 읽어 run summary와 JSON artifact로 남긴다. 동시에 원문 경로·비밀값을 제외한 안전한 heartbeat를 `data/tf-pulse-heartbeat.json`에 저장하고 `[skip ci]` 커밋으로 `main`에 push한 뒤 `deploy.yml`을 한 번 수동 dispatch한다. GitHub `GITHUB_TOKEN` push가 후속 workflow를 자동 실행하지 않는 제약을 고려한 방식이며, `[skip ci]`가 push 기반 중복 실행도 차단한다. 상태를 자동 변경하지 않으므로 사람이 반대 의견과 승인 조건을 확인하면서도 TF 회의 안건이 멈추지 않고 갱신된다.

`pnpm run validate:tf-pulse-workflow`는 이 heartbeat→dispatch 순서, 최소 권한, `[skip ci]` 중복 방지 조건을 build에서 고정한다.

공개 운영 보드(`?view=ops`)는 마지막 pulse 시각과 신선도 상태를 함께 표시해 6시간 주기 자동 협업이 지연됐는지 바로 확인할 수 있게 한다.
`pnpm run audit:goal -- --json`의 `pulseHealth`에도 같은 신선도 판정과 상태 지문이 포함되어 회의·CI에서 화면과 같은 기준을 사용할 수 있다.
`pnpm run validate:tf-pulse`는 heartbeat의 상태 지문·카운트·대기 목록이 현재 pulse와 같은 실행인지도 확인해 오래된 회의 안건이 공개 큐에 남지 않게 한다.

각 pulse에는 업무 그래프 상태 지문, 회의 안건, 외부 입력 게이트, 사람 판단 필요 여부가 포함되며 `pnpm run validate:tf-pulse`가 이 연결을 배포 전에 검증한다.

`data/tf-role-registry.json`은 역할 책임의 단일 기준이다. pulse와 안전한 heartbeat는 이 레지스트리에서 확인한 6개 역할군을 ID·라벨·상태로만 기록하며, 실제 외부 전문가 자격이나 섭외를 의미하지 않는다. 역할군이 그래프·Goal Contract·heartbeat에서 어긋나면 배포 검증이 실패한다.

`pnpm run tf:pulse:heartbeat`는 CI가 만든 임시 pulse 파일 없이도 최신 pulse를 생성해 안전한 heartbeat를 갱신한다. CI처럼 파일 경로를 직접 넘기면 지정한 파일만 읽는다.

공개 운영 화면의 `회의 안건 JSON` 링크는 같은 pulse를 안전한 공개 패킷으로 제공한다. [공개 TF pulse](https://kradavid.github.io/cellpinda_GABA/data/tf-pulse.json)에는 원문 경로·개인정보·비밀값 없이 상태, 참여 역할, 필요한 입력과 다음 조치만 담긴다.

공개 운영 화면의 `목표 감사 JSON` 링크는 Goal Contract·6개 역할군·업무 상태 카운트·완료 마일스톤·현재 승인 게이트를 한 파일로 묶은 중간 검토 패킷이다. [공개 목표 감사](https://kradavid.github.io/cellpinda_GABA/data/goal-audit.json)는 내부 경로와 개인정보를 제외하며, 실제 전문가 자격·외부 승인·주문 완료를 증명하지 않는다.

`pnpm run preflight:deploy -- --strict`는 Cloudflare Worker 영구 배포에 필요한 설정·빌드 산출물·공개 export·필수 Secrets를 값 노출 없이 검사하고, 하나라도 없으면 실패한다. 일반 실행은 현재 상태를 `READY` 또는 `WAITING`으로 보고해 로컬·Pages 환경에서도 배포 준비도를 확인할 수 있다.

## GitHub Actions 배포

기본 배포 저장소는 [KRAdavid/cellpinda_GABA](https://github.com/KRAdavid/cellpinda_GABA)이며 `main`에 push하면 `.github/workflows/deploy.yml`이 데이터 동기화 → 타입 검사 → 테스트 → 정적 번들 및 Worker dry-run을 수행한다. Cloudflare 계정 값을 저장소 Secrets에 넣으면 같은 workflow가 Worker·D1·assets까지 배포한다. 필요한 Secrets는 `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, `ADMIN_TOKEN`, `MEMBER_ORIGIN`이다. Secrets가 없으면 검증만 실행하고 배포 단계는 명확히 건너뛴다.

같은 workflow는 Worker Secrets 없이도 GitHub Pages 정적 사이트를 갱신한다: [https://kradavid.github.io/cellpinda_GABA/](https://kradavid.github.io/cellpinda_GABA/). 정적 사이트는 승인 콘텐츠 JSON과 스마트스토어 구매 링크를 사용하고, `/api/content`가 없는 환경에서는 자동으로 공개 JSON을 읽는다.

`CLOUDFLARE_D1_DATABASE_ID`는 운영 D1 데이터베이스를 가리켜야 하며, `ADMIN_TOKEN`과 `MEMBER_ORIGIN`은 저장소 파일이나 로그에 넣지 않는다. GitHub Pages 같은 정적 호스팅을 선택해도 승인 콘텐츠와 제품 링크는 `public/data/content.json`으로 동작한다.

## Cloudflare 중간 배포

`wrangler.jsonc`와 `worker/`는 정적 화면+Workers API+D1 저장소를 함께 배포한다. 로컬 검증은 `node node_modules/wrangler/bin/wrangler.js dev --port 8788`로 실행한다. `.dev.vars`의 ADMIN_TOKEN은 운영자 접근 키이며 Git에 포함하지 않는다.

`node node_modules/wrangler/bin/wrangler.js deploy --temporary --secrets-file .dev.vars`는 60분 임시 배포다. 현재 미리보기는 https://cellpinda-rhythm.marshy-shear.workers.dev 이며 만료 후 영구 주소로 사용할 수 없다. 정식 운영에는 사용자의 Cloudflare 계정으로 인수와 도메인 설정이 필요하다. QA 트래픽은 실제 소비자 성과가 아니다.

검증: `node --test src/domain/rhythm.test.ts server/server.test.mjs worker/worker.test.mjs`, `node node_modules/typescript/bin/tsc -p worker/tsconfig.json`.


## 회원 기록 개발 검증

`http://localhost:8788/account`에서 패스키 기반 회원 기능을 시험할 수 있다. `.dev.vars`의 MEMBER_ORIGIN이 정확히 해당 origin일 때만 활성화된다. 공개 임시주소에서는 비활성이다. 서버와 브라우저는 SimpleWebAuthn14를 사용하며 패스키비밀키를 서버에 저장하지 않는다. 현재회원당7일기록한개이며 추가패스키/분실복구/과거이력은미구현이다. 정식운영origin과개인정보정책확정없이공개회원가입을열지않는다. 상세검증/열린항목은 docs/MEMBER_RELEASE_REVIEW.md를참고한다.
