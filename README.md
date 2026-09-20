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

- 홈, 비진단 리듬 체크 5문항·4단계·6유형, 결과 PNG·공유 링크, GABA 안정·회복 안내, 사람 연구 요약, 발효 설명, 제품 구성 도식·구매 연결.
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
- `data/tf-role-registry.json`: 마케팅·소비자심리부터 일러스트·정보시각화와 QA·감사까지 8개 교차 검토 역할의 책임·권한·매칭 기준
- `data/tf-pulse-heartbeat.json`: 다음 실행에서도 재현하는 안전한 pulse 시각·상태 지문·역할·입력 게이트
- `docs/IMPLEMENTATION_STATUS.md`: 최신 구현·검증·남은 작업
- `data/content-ledger.json`: 내부 근거 원장. 전체 파일을 public으로 복사하지 않는다.
- `docs/EVIDENCE_AUDIT.md`, `docs/ASSET_SOURCES.md`: 원문 검토·실제 제품 사진 출처

공개 응답은 검토된 문안과 공개 URL만 포함한다. 원본 자료·토큰·DB·개인 후기 스크린샷은 공개 배포 대상이 아니다.


## 로컬 데이터와 배포 데이터 동기화

`data/content-ledger.json`이 승인된 콘텐츠의 단일 원장이다. `pnpm run sync:data`는 승인 상태이고 HTTPS 출처가 있는 연구 카드, 승인된 제품·후기만 `public/data/content.json`으로 내보낸다. 이 파일은 Git에 커밋하지 않고 `pnpm run build`와 GitHub Actions에서 매번 새로 생성한다. Worker API가 있는 환경은 `/api/content`를 우선 사용하고, 정적 호스팅에서는 같은 공개 JSON으로 자동 폴백한다.

판매 자료는 별도 경계로 둔다. `data/local-order-manifest.json`을 기준으로 `pnpm run audit:orders`를 실행하면 지정한 로컬 주문 파일에서 개인정보를 제외한 상품군·수량·기간·필드 존재와 파일 해시를 `tmp/local-order-audit.json`에 기록한다. 이 감사 결과는 공개 export에 포함하지 않으며, 판매자 계정과 스마트스토어 API 응답을 확인하기 전까지 실제 매출·환불로 해석하지 않는다. 제품 포장 자료는 같은 방식으로 `pnpm run audit:materials`가 감사한다.

두 로컬 입력을 전체 목표 판정과 함께 확인하려면 로컬 PC에서 `pnpm run audit:goal:local`을 실행한다. 회의용 JSON을 자동 저장하려면 `pnpm run audit:goal:local:json`을 사용한다. 이 명령은 `audit-local-materials`와 `audit-local-orders`를 읽기 전용으로 다시 실행해 완제품 후보·제품군·주문 파일 구조·상태 필드 유무·가장 최근 파일 수정 시각을 비공개 `tmp/local-goal-audit.json`에 붙이며, 스캔 자체가 실패하면 종료 코드 1로 알려 준다. 자료 스캔 성공은 B2 표시 승인, 과거 주문 수량은 E1 실구매·환불 대사를 의미하지 않는다. 결과에는 개인정보·원문 행·로컬 경로를 넣지 않고 공개 export도 변경하지 않으며, CI 기본 감사는 외부 폴더가 없어도 재현되도록 옵션을 생략한다.

로컬 API를 `pnpm server`로 실행하면 API가 포트를 연 직후 자료 watcher도 자동으로 시작한다. watcher는 두 매니페스트의 폴더를 감시하고 750ms 동안 변경을 묶은 뒤 `tmp/local-goal-audit.json`만 갱신한다. 원문 행·개인정보·로컬 경로는 공개 export와 CI artifact로 이동하지 않으며, API를 종료하면 감시도 함께 정리된다. API 없이 감시만 실행할 때는 `pnpm run audit:watch`를 사용할 수 있고 `Ctrl+C`로 종료한다. 감시할 폴더를 바꾸려면 `CELLPINDA_MATERIAL_ROOTS` 또는 `CELLPINDA_ORDER_ROOTS`에 세미콜론으로 구분한 경로를 지정한다.

`pnpm dev` 한 번으로 Vite와 로컬 API가 함께 실행되며, API가 포트를 연 뒤 자료 watcher도 자동으로 시작한다. 운영 화면은 `/api/ops/local-audit`와 `/api/ops/snapshot`에서 비공개 감사·업무 스냅샷을 60초마다 읽어 완제품 후보·누락·주문 파일 수·1500 과거 집계·현재 큐를 중간 확인 카드에 표시한다. 이 운영 스냅샷은 `tmp/operations`에만 저장하고 루프백 API에서만 제공한다. `public/data`와 정적 배포본에는 운영 큐·pulse·감사·회의 패킷을 만들지 않으며, 스냅샷이 없거나 갱신이 실패해도 마지막 요약을 유지한다. API 포트를 바꾸려면 `CELLPINDA_API_PORT`를 지정하고 Vite 인자는 `pnpm dev -- --port 5174`처럼 전달한다. GitHub Pages처럼 API가 없는 정적 환경에서는 내부 운영 화면이 열리지 않는다.

프로덕션 빌드를 API와 함께 미리 보려면 `pnpm run build` 다음 `pnpm run preview`를 실행한다. 미리보기 명령은 로컬 API 상태를 확인해 없으면 함께 켜므로, API 프록시가 빠진 채 실행되어 콘텐츠 요청이 실패하는 일을 막는다. 다른 포트를 사용하려면 `pnpm run preview -- --port 4174`처럼 지정한다.

`pnpm exec vite` 또는 Vite를 직접 실행하는 방식은 사용하지 않는다. 이 방식은 로컬 API 프록시가 연결되지 않아 `/api/content`가 JSON 대신 앱 HTML을 반환하고 연구·제품 화면이 fallback으로 보일 수 있다. 팀 검토와 실제 데이터 연동은 반드시 `pnpm dev` 또는 `pnpm run preview`로 시작한다.

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
pnpm run validate:live-public
```

`validate:live-public`는 현재 GitHub Pages 공개 주소를 대상으로 제품·후기 상세 링크, 750 제거, 연구·공유·티저와 내부 운영 경로 비노출을 한 번에 확인한다. `PUBLIC_SITE_URL`과 URL 인자를 모두 생략하면 저장된 기본 공개 주소(`https://kradavid.github.io/cellpinda_GABA`)를 사용한다. 다른 공개 주소나 임시 배포를 점검할 때는 `pnpm run validate:live -- https://example.com`처럼 URL을 넘긴다.

`TF decision pulse` workflow는 6시간마다 canonical 업무 그래프의 실행·검증·입력 대기 안건을 읽어 run summary와 JSON artifact로 남긴다. 동시에 원문 경로·비밀값을 제외한 안전한 heartbeat를 `data/tf-pulse-heartbeat.json`에 만들고, 보호된 `main`에 직접 쓰지 않고 고정된 자동화 브랜치의 PR로 갱신한다. 기존 heartbeat PR이 있으면 재사용하고 없으면 새로 만들며, PR 생성으로 자동 검사가 생략되거나 별도 workflow 승인이 필요한 GitHub 토큰 경계를 고려해 heartbeat 후보 브랜치에서 타입검사·전체 테스트·정적 build·배포 readiness·Worker dry-run을 검증 증거로 실행한다. 이 축약 pulse는 보호된 필수 상태를 직접 녹색 처리하지 않으며, 완전한 `pull_request` 검사가 실행되지 않으면 브랜치 보호가 계속 대기하도록 fail-closed로 동작한다. 필수 상태와 사람의 merge를 통과한 뒤 `main` push가 일반 배포를 실행한다. 따라서 보호 규칙을 우회하지 않으면서도 TF 회의 안건 생성은 멈추지 않고 계속된다.

`pnpm run validate:tf-pulse-workflow`는 이 heartbeat→자동화 PR→후보 검증 순서, 최소 `contents`·`pull-requests` 권한, 보호된 `main` 직접 push 금지와 필수 상태 fail-closed 조건을 build에서 고정한다.

로컬 운영 보드(`http://127.0.0.1:5173/?view=ops`)는 마지막 pulse 시각과 신선도 상태를 함께 표시해 6시간 주기 자동 협업이 지연됐는지 바로 확인할 수 있게 한다. 소비자 사이트에는 `TF 운영판` 링크를 노출하지 않으며, 운영자는 로컬 주소에서만 이 중간 확인 화면을 연다. 직전 상태 지문과 비교한 `stateChanged`도 표시해 새 안건과 반복 안건을 구분한다.
`pnpm run audit:goal -- --json`의 `pulseHealth`에도 같은 신선도 판정과 상태 지문이 포함되어 회의·CI에서 화면과 같은 기준을 사용할 수 있다.
`pnpm run validate:tf-pulse`는 heartbeat의 상태 지문·카운트·대기 목록이 현재 pulse와 같은 실행인지도 확인해 오래된 회의 안건이 공개 큐에 남지 않게 한다.

각 pulse에는 업무 그래프 상태 지문, 회의 안건, 외부 입력 게이트, 사람 판단 필요 여부가 포함되며 `pnpm run validate:tf-pulse`가 이 연결을 배포 전에 검증한다.

회의 안건은 작업 상태별 선택지와 판정 기준도 함께 제공한다. `VERIFYING`은 수락 또는 보완, `WAITING`은 보류 또는 필요한 입력을 채운 뒤 READY로 올리는 경로를 보여 주며, 자동화가 실제 상태를 바꾸지 않고 사람이 근거를 확인해 결정하도록 한다. 이 선택지는 로컬 운영 스냅샷에만 남기고, 소비자용 정적 번들에는 포함하지 않는다.

`data/tf-role-registry.json`은 역할 책임의 단일 기준이다. pulse와 안전한 heartbeat는 이 레지스트리에서 확인한 8개 역할군을 ID·라벨·상태로만 기록하며, 실제 외부 전문가 자격이나 섭외를 의미하지 않는다. 역할군이 그래프·Goal Contract·heartbeat에서 어긋나면 배포 검증이 실패한다.

`pnpm run tf:pulse:heartbeat`는 CI가 만든 임시 pulse 파일 없이도 최신 pulse를 생성해 안전한 heartbeat를 갱신한다. CI처럼 파일 경로를 직접 넘기면 지정한 파일만 읽는다.

`.github/workflows/daily-status-report.yml`은 매일 한국 시간 오전 10시(UTC 01:00)에 Goal Audit·TF Pulse·공개 사이트 라이브 검증을 다시 실행한다. 결과는 30일 보관 아티팩트와 하나의 누적 GitHub 이슈(`[자동 보고] 셀핀다 GABA 업무 진행상황`)에 갱신되며, 제품 표시·후기 권한·티저 공개·주문처럼 사람 승인이 필요한 상태는 자동으로 바꾸지 않는다. 수동 확인은 `workflow_dispatch`로 실행할 수 있다.

회의 안건·목표 감사·업무 큐 JSON은 `tmp/operations`에만 생성되고 로컬 루프백 API에서만 읽힌다. 소비자용 Pages에는 운영 상태·담당 역할·대기 게이트를 노출하지 않으며, 배포 전 검증기는 관련 정적 경로가 404인지 확인한다.

`pnpm run preflight:deploy -- --strict`는 Cloudflare Worker 영구 배포에 필요한 설정·빌드 산출물·공개 export·필수 Secrets를 값 노출 없이 검사하고, 하나라도 없으면 실패한다. 일반 실행은 현재 상태를 `READY` 또는 `WAITING`으로 보고해 로컬·Pages 환경에서도 배포 준비도를 확인할 수 있다.

각 pulse에는 `continuation`이 함께 기록된다. 현재 게이트가 사람 판단 대기인지, 실행을 계속할 수 있는지, 다음 주기에 재평가할지 또는 종료 조건을 확인할지와 6시간 뒤 재검토 시각·다음 행동을 pulse·heartbeat·공개 큐·목표 감사에 동일하게 남긴다. 승인 때문에 자동화가 멈추는 대신 다음 관찰 주기를 예약하되, 사람 승인·외부 게시·구매 상태를 자동으로 바꾸지는 않는다.

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
