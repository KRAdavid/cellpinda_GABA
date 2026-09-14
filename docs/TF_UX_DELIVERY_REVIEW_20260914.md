# UX·기술·배포 TF 인계 기록

기준일: 2026-09-14  
대상: `KRAdavid/cellpinda_GABA` 공개 사이트와 로컬 운영 화면  
목적: 한 문장 목표에서 실제 공개 사이트 완성까지, 작업 소유권과 검증 순서를 고정한다.

## 현재 실행 경로

```text
pnpm run dev
  ├─ Vite: 127.0.0.1:5173
  └─ Node API + local audit watcher: 127.0.0.1:4318

pnpm run build
  ├─ public/data/content.json 동기화
  ├─ 공개 연구·제품·후기·운영 export 검증
  ├─ TypeScript 검사
  └─ dist 생성

GitHub Actions main push
  ├─ verify: install → sync → contract/test/build/preflight
  ├─ GitHub Pages: /cellpinda_GABA/
  └─ smoke-live: 공개 HTML·데이터·자산 HTTP 확인
```

소비자 화면은 `/`에 있으며, `?view=ops`와 `?view=admin`은 localhost에서만 렌더링된다. 공개 Pages에서 내부 업무 큐·회의 기록·관리자 화면을 노출하지 않는 것이 기술 완료 조건이다.

## TF 구성과 파일 소유권

| TF 역할 | 책임 | 1차 소유 파일 | 완료 판단 |
|---|---|---|---|
| PM·AI 비서실 | Goal Contract, 작업 그래프, 승인 게이트, 중간 보고 | `data/goal-contract.json`, `data/task-graph.json`, `src/domain/goal-mvp.ts` | 목표→계약→업무→검증→보고가 재현됨 |
| 마케팅·소비자심리 | 공감 장면, 참여 동기, 공유 이유, 구매 압박 점검 | `docs/CONSUMER_CONVERSION_REVIEW.md`, 문안 제안 | 1분 안에 사이트 목적·다음 행동을 설명함 |
| 스토리·UX·접근성 | 화면 순서, 문항 이해, 결과 해석, 모바일·키보드 | `src/components/RhythmExperience.tsx`, `src/components/rhythm.css` | 선택→다음 문항→결과→공유가 막힘없이 이어짐 |
| 연구·근거·표시 | GABA 일반 연구와 완제품 사실의 범위 분리 | `public/data/content.json`, `public/data/gaba-master-index.json` | 출처·검토일·연구 조건이 원장과 일치함 |
| 후기·고객지원 | 후기 원문·권한·제품·사용 맥락 검토 | `src/components/ReviewExperience.tsx`, `src/components/ReviewEditor.tsx` | 권한 확인된 후기만 공개, 미확인 시 원문 목적지만 연결 |
| 서버·보안·데이터 | 승인 원장, 이벤트, 회원·주문 경계 | `server/`, `worker/`, `src/domain/ops-validation.ts` | 허위 완료·권한 우회·개인정보 저장이 차단됨 |
| 프런트·배포 | 빌드 자산, base path, Pages, rollback | `src/App.tsx`, `src/styles.css`, `.github/workflows/deploy.yml` | CI와 live smoke가 같은 커밋을 확인함 |
| QA·독립 감사 | 구현 담당과 분리된 회귀·접근성·공개 범위 검증 | `scripts/validate-*.mjs`, `docs/LIVE_UI_QA.md` | 실패 시 `DONE`·`released` 승격을 막음 |

같은 파일을 여러 역할이 동시에 편집하지 않는다. 문안 제안은 근거 원장 또는 별도 리뷰 문서에 먼저 기록하고, 제품 책임자·표시 검토자가 공개 승인한 뒤 프런트가 렌더링한다.

## 실행 그래프

```text
G0 목표 입력
  ↓
G1 계약·TF·업무 그래프 생성
  ↓
G2 소비자 여정 QA ───────────────┐
  ├─ G2a 공감→1분 체크             │
  ├─ G2b 자동 다음 질문·키보드       │
  ├─ G2c 결과·유형별 공유 URL         │
  └─ G2d 모바일 360/390px·대비       │
                                   ↓
G3 근거·표시 검토 → G4 티저 노출 검토 → G5 제품·후기·구매 링크 검토
                                   ↓
G6 정적 빌드·공개 범위 검증 → G7 Pages 배포 → G8 live smoke
```

### G2 소비자 여정

- `RhythmExperience`는 질문 5개를 같은 순서로 표시하고, 포인터로 답하면 180ms 뒤 다음 질문으로 이동한다.
- 키보드 사용자는 자동 이동에 의존하지 않고 `다음 질문` 버튼으로 진행한다. 이전 버튼, legend 포커스, `aria-live` 상태를 함께 확인한다.
- 결과는 `share/{type}/` 정적 페이지와 `?rhythm={type}` 런타임 경로를 사용한다. 공유 URL에는 문항별 답변을 넣지 않는다.
- 제품 CTA는 현재 가바 1500 스마트스토어 상세 URL 하나로 고정한다. 750 식별자·제품 카드·이미지가 공개 export에 다시 들어오면 빌드를 실패시킨다.

### G3~G5 신뢰·전환

- 티저는 `public/data/teaser-preview.json`의 HTTPS 주소에서 읽고 페이지 안에서 바로 재생한다. 비로그인 재생·제목·iframe `title`·외부 대체 링크·권리·자막·CTA 승인 여부를 별도로 기록한다.
- 연구 카드는 “한 문장으로”와 “한눈에 이해하기”를 먼저 보여주고, 수치·조건·출처는 펼쳐서 제공한다. 일반 GABA 연구를 셀핀다 완제품 시험이나 권장량으로 읽히게 연결하지 않는다.
- 후기 데이터가 공개 권한을 갖지 못한 동안에는 스마트스토어 후기 원문 목적지만 보여준다. 임의 평점·대표성·제품 효능 증언을 만들지 않는다.

## 검증 명령과 배포 순서

로컬 변경마다 다음 순서로 실행한다.

```powershell
pnpm run validate:goal
pnpm run validate:research-copy
pnpm run validate:ui-contract
pnpm run validate:teaser
pnpm run validate:ops
pnpm run validate:public
pnpm test
pnpm run typecheck
pnpm run build
pnpm run preflight:deploy
```

`preflight:deploy`가 Cloudflare 운영 비밀값 부족으로 `WAITING`을 보고하는 것은 Pages 정적 배포 실패가 아니다. Worker·D1 영구 운영 배포는 판매자·관리자·회원 origin·복구 비밀값이 준비된 뒤 별도 승인한다.

main push 후 `.github/workflows/deploy.yml`의 `verify → deploy-pages → smoke-live`를 확인한다. 성공한 커밋 SHA, Pages URL, 공개 `content.json`, 마스터 인덱스, 제품 수, 750 미포함, 공유 경로 6개를 배포 증거로 남긴다. 실제 브라우저·모바일 공유 앱 검증을 수행하지 못한 경우에는 `local verified`로 표현하고 `released`로 과장하지 않는다.

## 다음 회의 안건

1. 390px에서 자동 이동 후 새 질문 legend 포커스와 스크롤 위치 확인
2. 티저 외부 페이지가 브라우저 정책으로 재생되지 않을 때 poster·자막·대체 경로 확정
3. 실제 후기의 재게시 권한·제품·사용 기간·제공 관계를 확인하기 전 공개 여부 결정
4. 현행 1500 포장 표시사항과 스마트스토어 상품 정보의 차이를 제품 책임자가 승인
5. Pages 공개 자산과 Worker API의 base path·Origin·캐시 무효화 및 롤백 순서 리허설

회의 기록은 `docs/TF_BOARD.md`의 결정 양식을 사용하고, 각 안건은 `문제 → 사용자 영향 → 제안 → 반론 → 증거 → 결정 → 재검토 조건` 순서로 남긴다.
