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
- `docs/IMPLEMENTATION_STATUS.md`: 최신 구현·검증·남은 작업
- `data/content-ledger.json`: 내부 근거 원장. 전체 파일을 public으로 복사하지 않는다.
- `docs/EVIDENCE_AUDIT.md`, `docs/ASSET_SOURCES.md`: 원문 검토·실제 제품 사진 출처

공개 응답은 검토된 문안과 공개 URL만 포함한다. 원본 자료·토큰·DB·개인 후기 스크린샷은 공개 배포 대상이 아니다.


## 로컬 데이터와 배포 데이터 동기화

`data/content-ledger.json`이 승인된 콘텐츠의 단일 원장이다. `pnpm run sync:data`는 승인 상태이고 HTTPS 출처가 있는 연구 카드, 승인된 제품·후기만 `public/data/content.json`으로 내보낸다. 이 파일은 Git에 커밋하지 않고 `pnpm run build`와 GitHub Actions에서 매번 새로 생성한다. Worker API가 있는 환경은 `/api/content`를 우선 사용하고, 정적 호스팅에서는 같은 공개 JSON으로 자동 폴백한다.

판매 자료는 별도 경계로 둔다. `data/local-order-manifest.json`을 기준으로 `pnpm run audit:orders`를 실행하면 지정한 로컬 주문 파일에서 개인정보를 제외한 상품군·수량·기간·필드 존재와 파일 해시를 `tmp/local-order-audit.json`에 기록한다. 이 감사 결과는 공개 export에 포함하지 않으며, 판매자 계정과 스마트스토어 API 응답을 확인하기 전까지 실제 매출·환불로 해석하지 않는다. 제품 포장 자료는 같은 방식으로 `pnpm run audit:materials`가 감사한다.

운영 MVP의 재개 상태는 `src/domain/ops-validation.ts`의 공통 검증을 거쳐 Node API와 Cloudflare Worker에 저장된다. 업무 상태 전환·검증 증거·승인 연결을 확인하고 이메일·전화번호·비공개 경로·토큰 같은 필드는 거부한다. 샌드박스 상태 저장은 외부 게시나 실구매 완료를 의미하지 않는다.

```sh
pnpm run sync:data
pnpm run build
pnpm run goal:next
pnpm run audit:orders
```

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
