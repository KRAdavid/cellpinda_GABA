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
node node_modules/vite/bin/vite.js build
```

pnpm 설치 시 esbuild 스크립트 승인 경고가 있었으나 현재 번들 빌드는 성공했다. 의존성 재설치 환경의 재현성은 배포 전에 다시 확인한다.

## 구현 상태

- 홈, 비진단 리듬 체크 5문항·4유형, 결과 PNG·공유 링크, GABA 개념 슬라이더, 연구 펼침, 발효 공개 자료, 공식 제품 사진·비교·구매 연결.
- 공식몰 후기 원문 탐색. 후기 재인용은 미완료.
- 브라우저 로컬 7일 실천 체크. 회원 간 기기 동기화는 미구현.
- 서버 영속 콘텐츠 수정·승인·감사 이력·이벤트 저장. 일부 설명 문구는 아직 코드에 있어 전체 콘텐츠 승인 범위로 확장해야 한다.
- 실구매·7일 재방문·추천보상·회원기록·AI·공개 배포는 미완료. 로컬 실행이나 build 성공을 최종 완료로 간주하지 않는다.

## 문서

- `docs/REQUIREMENTS.md`: 전체 목표 및 요구별 완료 증거
- `docs/TF_BOARD.md`: 팀 책임·의사결정·백로그
- `docs/IMPLEMENTATION_STATUS.md`: 최신 구현·검증·남은 작업
- `data/content-ledger.json`: 내부 근거 원장. 전체 파일을 public으로 복사하지 않는다.
- `docs/EVIDENCE_AUDIT.md`, `docs/ASSET_SOURCES.md`: 원문 검토·실제 제품 사진 출처

공개 응답은 검토된 문안과 공개 URL만 포함한다. 원본 자료·토큰·DB·개인 후기 스크린샷은 공개 배포 대상이 아니다.


## Cloudflare 중간 배포

`wrangler.jsonc`와 `worker/`는 정적 화면+Workers API+D1 저장소를 함께 배포한다. 로컬 검증은 `node node_modules/wrangler/bin/wrangler.js dev --port 8788`로 실행한다. `.dev.vars`의 ADMIN_TOKEN은 운영자 접근 키이며 Git에 포함하지 않는다.

`node node_modules/wrangler/bin/wrangler.js deploy --temporary --secrets-file .dev.vars`는 60분 임시 배포다. 현재 미리보기는 https://cellpinda-rhythm.marshy-shear.workers.dev 이며 만료 후 영구 주소로 사용할 수 없다. 정식 운영에는 사용자의 Cloudflare 계정으로 인수와 도메인 설정이 필요하다. QA 트래픽은 실제 소비자 성과가 아니다.

검증: `node --test src/domain/rhythm.test.ts server/server.test.mjs worker/worker.test.mjs`, `node node_modules/typescript/bin/tsc -p worker/tsconfig.json`.


## 회원 기록 개발 검증

`http://localhost:8788/account`에서 패스키 기반 회원 기능을 시험할 수 있다. `.dev.vars`의 MEMBER_ORIGIN이 정확히 해당 origin일 때만 활성화된다. 공개 임시주소에서는 비활성이다. 서버와 브라우저는 SimpleWebAuthn14를 사용하며 패스키비밀키를 서버에 저장하지 않는다. 현재회원당7일기록한개이며 추가패스키/분실복구/과거이력은미구현이다. 정식운영origin과개인정보정책확정없이공개회원가입을열지않는다. 상세검증/열린항목은 docs/MEMBER_RELEASE_REVIEW.md를참고한다.
