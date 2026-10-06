# Red Team Report

## 수면·회복 도입 리듬 인포그래픽·공개 배포 — 2026-10-06 — f785d7d

- 공격 관점에서 280px 초소형 모바일·390px 모바일·1440px 데스크톱에서 낮→밤→회복 연결선이 카드·헤더·본문과 충돌하지 않고, 도입부가 이미지 없이도 시각적으로 이해되는지 확인했다. 세 폭에서 흐름과 가로폭이 안정적이었다.
- 기존 수면 카피·참고 도서·출처·제품 독립 경계는 변경되지 않았고, UI 계약·배포 workflow·라이브 validator가 공개 SHA와 일치한다. 새 CRITICAL/MAJOR 결함은 없다.
- 인포그래픽은 시각적 탐색성을 높이는 증거지만 실제 고령 사용자 이해도, Safari/iOS/Android 실기기 동작, 독립 과학·규제 감수를 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-OPENING-RHYTHM-VISUAL-20261006`, `E-CDP-OPENING-RHYTHM-VISUAL-20261006`, `E-DEPLOY-PIPELINE-OPENING-RHYTHM-VISUAL-20261006`, `E-LIVE-PUBLIC-OPENING-RHYTHM-VISUAL-20261006`.

## 연구 지도 전용 편집 비주얼·공개 배포 — 2026-10-06 — 813fd3a

- 공격 관점에서 연구 지도 전용 비주얼이 첫 화면과 구분되고, 모바일에서는 이미지·문구·다음 카드가 끊기지 않으며 데스크톱에서는 이미지와 5개 카드가 한 시퀀스로 읽히는지 확인했다. 390·1440px 공개 렌더에서 이미지 크롭, 텍스트 대비, 카드 폭과 순서가 안정적이었다.
- 연구 카피·수치·출처·제품 독립 경계는 변경되지 않았고, 전용 이미지 URL·UI 계약·배포 workflow·라이브 validator가 공개 SHA와 일치한다. 새 CRITICAL/MAJOR 결함은 없다.
- 새 편집 비주얼은 시각적 탐색성을 높이는 증거지만 실제 고령 사용자 이해도, Safari/iOS/Android 실기기 동작, 독립 과학·규제 감수를 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-CDP-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-DEPLOY-PIPELINE-ACADEMIC-EDITORIAL-VISUAL-20261006`, `E-LIVE-PUBLIC-ACADEMIC-EDITORIAL-VISUAL-20261006`.

## 수면 비교 도표 문구·공개 배포 — 2026-10-06 — 9e7b9321

- 공격 관점에서 질문형 제목과 `두 조건 비교` 라벨이 `비교 조건`·`GABA 섭취`·`측정 항목`의 관계를 빠르게 전달하는지 확인했다. 390·1440px 공개 렌더에서 새 문구와 기존 시각 비교 구조가 안정적이었다.
- 연구 수치·결과·출처·제품 독립 경계는 변경되지 않았고 UI 계약·배포 workflow·라이브 validator가 새 공개 SHA와 일치한다. 새 CRITICAL/MAJOR 결함은 없다.
- 실제 실기기·고령 사용자 이해도·독립 과학·규제 감수는 Chromium 화면 검증으로 대체하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-PLAYWRIGHT-SLEEP-COPY-20261006`, `E-DEPLOY-PIPELINE-SLEEP-COPY-20261006`, `E-LIVE-PUBLIC-SLEEP-COPY-20261006`.

## 연구 결과 도표 축 의미·공개 배포 — 2026-10-06 — e0bfacdf

- 공격 관점에서 `측정 항목`이 실제 측정 항목 열을 가리키고 `비교 조건`·`GABA 섭취`가 조건 열로 분리되어, 축 의미를 잘못 읽을 여지가 줄었는지 확인했다. 좌우 비교 아이콘도 기존 정보 아이콘 체계와 일치하며 390·1440px 공개 렌더에서 안정적이었다.
- 연구 결과·수치·출처·제품 독립 경계는 변경되지 않았고, UI 계약·배포 workflow·라이브 validator가 모두 새 공개 SHA와 일치한다. 새 CRITICAL/MAJOR 결함은 없다.
- 실제 실기기·고령 사용자 이해도·독립 과학·규제 감수는 Chromium 화면 검증으로 대체하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-PLAYWRIGHT-CHART-AXIS-20261006`, `E-DEPLOY-PIPELINE-CHART-AXIS-20261006`, `E-LIVE-PUBLIC-CHART-AXIS-20261006`.

## 연구 결과 도표 의미 보정 — 2026-10-06 — a3ccd609

- 공격 관점에서 새 안내가 막대 길이를 실제 측정값이나 효과 크기로 오인하게 만들지 않고, 변화 방향과 조건 간 상대 비교로 읽히는지 확인했다. 280·390·768·1440px 로컬 및 390·1440px 공개 렌더에서 문구·범례·카드 폭과 오류 상태는 안정적이었다.
- 접근성 계약은 도표의 보조 설명과 `aria-label`에 같은 의미 경계를 반영했고, 제품 독립 공개 데이터와 teaser `HOLD`를 유지했다. 새 CRITICAL/MAJOR 결함은 없다.
- 실제 실기기·고령 사용자 이해도·독립 과학·규제 감수는 Chromium 화면 검증으로 대체하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-PLAYWRIGHT-CHART-SEMANTICS-20261006`, `E-DEPLOY-PIPELINE-CHART-SEMANTICS-20261006`, `E-LIVE-PUBLIC-CHART-SEMANTICS-20261006`.

## 모바일 히어로 문장 리듬 보정 — 2026-10-06 — 68e2c8b

- 공격 관점에서 강제 줄바꿈 제거가 280·320px에서 문장 클리핑·가로 넘침을 만들지 않고, 390px에서 한 줄 흐름과 1440px 데스크톱 구성을 유지하는지 확인했다. document scrollWidth는 각 viewport와 같고 page/console errors는 0이었다.
- 공개 validator는 HTTP 200·STATIC·71개 bundle hash·제품 독립 공개 데이터·teaser `HOLD`를 유지했다. 새 CRITICAL/MAJOR 결함은 없다.
- 이 검증은 Chromium fallback 화면 증거이며, 실기기·실제 고령 사용자 이해도·독립 과학·규제 감수는 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-PLAYWRIGHT-HERO-LINE-20261006`, `E-DEPLOY-PIPELINE-HERO-LINE-20261006`, `E-LIVE-PUBLIC-HERO-LINE-20261006`.

## 최종 라이브 SHA 정합성 재확인 — 2026-10-06 — 449fb2d

- main SHA `449fb2d`가 Pages에 반영된 뒤 공개 validator·배포 workflow·전문가 영상 선택 재생을 다시 대조했다. 320·390·768·1440px 모두 가로 넘침과 런타임 오류가 없고, 선택 후 `autoplay=1` iframe과 feature 포커스가 확인됐다.
- teaser `HOLD`, 내부 운영 snapshot 제외, Smart Store only, 750 제거, provenance 일치 상태가 유지되어 공개 안내서의 제품 독립 경계가 유지됐다.
- 새 CRITICAL/MAJOR 코드 결함은 없다. 브라우저 fallback·화면폭 검증은 실기기와 실제 고령 사용자 테스트를 대신하지 않으므로 RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-DEPLOY-PIPELINE-FINAL-RECHECK-20261006`, `E-PLAYWRIGHT-VIDEO-FINAL-RECHECK-20261006`, `E-LIVE-PUBLIC-FINAL-RECHECK-20261006`.

## 공개 배포 품질 자동 재점검 — 2026-10-06 — 2515212

- 공격 관점에서 최신 main 공개본의 배포 SHA·정적 번들·연구 데이터 경계·전문가 영상 선택 재생을 다시 대조했다. 320·390·768·1440px 모두 document scrollWidth가 viewport를 넘지 않았고, 선택 뒤 `guide-video-feature` 포커스와 `autoplay=1` iframe이 확인되며 page/console errors는 0이었다.
- `teaser=HOLD`, internal operations snapshot 제외, Smart Store only, 750 제거, provenance 일치 상태가 유지되어 공개 과학 안내와 내부 운영·제품 판매 경계가 섞이지 않았다.
- 새 CRITICAL/MAJOR 코드 결함은 없지만, Chrome fallback이 Safari/iOS/Android 실기기와 실제 고령 사용자 이해도를 대신하지는 않는다. RT-001·RT-002·RT-003과 독립 과학·규제 감수 조건은 계속 OPEN으로 둔다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-PUBLIC-RECHECK-20261006`, `E-NAVI-GATES-PUBLIC-RECHECK-20261006`, `E-PLAYWRIGHT-VIDEO-RECHECK-20261006`, `E-LIVE-PUBLIC-PUBLIC-RECHECK-20261006`.

## 공개 surface·초소형 모바일 재감리 — 2026-10-06 — e2f9920

- 공격 관점에서 280px에서 헤더·진행 rail·연구 지도·연구 카드·도표가 잘리거나, 선택 후 카드가 고정 rail 아래에 가려지는지 확인했다. 활성 `근육` 카드가 상단에 정렬되고 도표·12개 시각 lane·document scrollWidth 280px·page errors 0을 유지했다.
- 390px·1440px에서 히어로·연구 지도·전문가 영상·이야기 공유의 제목과 상태 흐름, 5개 사업자용 공유 문장, 이름 있는 상호작용, 이미지 alt, 외부 링크 rel을 대조했다. 새 CRITICAL/MAJOR 결함은 없다.
- 전문가 영상 필터 rail과 장식용 수면 궤도의 요소 경계가 viewport 밖으로 확장되는 것은 내부 수평 탐색·장식 의도이며 문서 자체의 `scrollWidth`를 늘리지 않는다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-ACCESSIBILITY-PUBLIC-AUDIT-20261006`, `E-PLAYWRIGHT-NARROW-AUDIT-20261006`, `E-PLAYWRIGHT-SURFACE-AUDIT-20261006`, `E-LIVE-PUBLIC-RECHECK-20261006`.

## Research Comparison Reading Cue — 2026-10-06 — 3339309

- 공격 관점에서 독자가 비교 도표의 두 조건과 막대 길이의 의미를 한 번에 파악하지 못하는 오독 경로를 점검했다. 도표 상단에 비교 기준과 읽기 안내를 배치했으며, 연구 수치·출처·해석은 변경하지 않았다.
- 320px·390px·1440px 공개본에서 안내 문구가 각각 모바일 두 줄·데스크톱 한 줄로 표시되고, 네 개 비교 lane·GABA 결과 강조·document scrollWidth·page/console errors 0이 일치했다. 새 CRITICAL/MAJOR 결함은 없다.
- Browser 플러그인 부재로 Chromium fallback을 사용했다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-PLAYWRIGHT-RESEARCH-CHART-CUE-20261006`, `E-LIVE-PUBLIC-RESEARCH-CHART-CUE-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-CHART-CUE-20261006`.

## GABA 기본 원리 3단계 인포그래픽·공개 배포 — 2026-10-06 — 8da328d

- 공격 관점에서 기본 원리 설명이 긴 문장에 묻히거나 모바일 카드가 잘리는지 확인했다. `글루탐산 → GABA 생성 → 신경 활동 조절`이 데스크톱에서는 3열, 모바일에서는 1열과 연결 화살표로 표시되고, 320·390·768·1440px에서 document scrollWidth가 viewport와 같았다.
- 각 카드의 생성·작용 문구와 NCBI 출처 링크가 함께 표시되고, 페이지 오류·콘솔 오류가 0이었다. 새 수치·효능 단정·제품 연결은 추가되지 않았다. 새 CRITICAL/MAJOR 결함은 없다.
- Browser 플러그인 부재로 Chromium fallback을 사용했다. Safari/iOS/Android 실기기·실제 고령 사용자 독해성·독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-PLAYWRIGHT-GABA-PROCESS-20261006`, `E-LIVE-PUBLIC-GABA-PROCESS-20261006`, `E-DEPLOY-PIPELINE-GABA-PROCESS-20261006`.

## Research Topic Selection Context — 2026-10-06 — 0e5c611

- 공격 관점에서 연구 지도 선택 후 사용자가 현재 선택 주제와 다음 연구 카드의 관계를 놓치거나, 보조기기가 상태 변화를 받지 못하는지 확인했다. 선택 전·후 안내가 한 영역에서 교체되고, `role=status`·`aria-live=polite`·`aria-atomic=true`가 유지되며, 390px·1440px에서 선택 카드 제목이 고정 읽기 레일 아래에 가려지지 않았다.
- 공개 흐름에서 390px·1440px 모두 근육 선택 → `근육 연구 결과` 카드 → 출처·progress label로 이어졌고 document scrollWidth는 viewport와 같았으며 page errors 0이었다. 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-PLAYWRIGHT-RESEARCH-SELECTION-20261006`, `E-LIVE-PUBLIC-RESEARCH-SELECTION-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-SELECTION-20261006`.

## Cross-Width Research Evidence Rhythm — 2026-10-06 — 009839b

- 공격 관점에서 320px·390px·1440px 연구 규모 도표의 숫자·검색 기준·출처·설명문이 폭별로 달라져 독자가 근거를 놓치거나, 작은 글자가 화면에서 사실상 사라지는지 확인했다. v135 이후 네 종류의 보조 근거 텍스트가 모든 폭에서 12px로 계산되고, 문서 가로폭은 viewport와 일치한다.
- 공개 390px·1440px에서 도표를 실제 화면에 배치해 캡처했으며, 12px 기준·도표 폭·page errors 0·console errors 0을 재현했다. 같은 공개본에서 연구 원문 전환 카드 클릭 후 `#final`·`final-heading` 포커스·가로폭·오류 0도 확인했다. 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-PLAYWRIGHT-RESEARCH-EVIDENCE-RHYTHM-20261006`, `E-LIVE-PUBLIC-RESEARCH-EVIDENCE-RHYTHM-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-EVIDENCE-RHYTHM-20261006`.

## Mobile Research Evidence Readability — 2026-10-06 — b716f5d

- 공격 관점에서 320px·390px·1440px 연구 규모 도표의 큰 수치, 검색 범위, 출처 링크, 하단 설명이 서로 다른 읽기 우선순위를 만들거나 잘리는지 대조했다. 700px 이하에서는 근거 텍스트가 12px로 유지되고 document scrollWidth가 viewport와 같았다.
- 공개 390px·1440px에서 12px 기준·도표 폭·page errors 0·console errors 0을 재현했다. 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-PLAYWRIGHT-RESEARCH-EVIDENCE-FLOOR-20261006`, `E-LIVE-PUBLIC-RESEARCH-EVIDENCE-FLOOR-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-EVIDENCE-FLOOR-20261006`.

## Source-to-Share Grid Alignment — 2026-10-06 — 9f0ec68

- 공격 관점에서 연구 원문 읽기 장의 전환 띠가 데스크톱 전체 편집 그리드 안에 있고 `이야기 공유` 라벨과 화살표가 버튼 영역을 벗어나지 않는지 확인했다. 모바일 390px에서는 기존 2행 구조를 유지한다.
- 390px·1440px 공개 화면에서 버튼 폭과 내부 콘텐츠 폭이 일치하고, 클릭 뒤 `#final`·`final-heading` 포커스·viewport와 동일한 scrollWidth·page errors 0·console errors 0을 확인했다. 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-PLAYWRIGHT-READING-GRID-20261006`, `E-LIVE-PUBLIC-READING-GRID-20261006`, `E-DEPLOY-PIPELINE-READING-GRID-20261006`.

## Source Reading to Story Sharing — 2026-10-06 — 84fd53b

- 공격 관점에서 연구 원문 읽기 장의 마지막 전환 카드를 확인했다. 카드에는 외부 링크가 없고 `scrollTo('final')`로 이야기 공유 장을 열며, 클릭 뒤 `final-heading`에 포커스가 도착한다.
- 390px·1440px 공개 화면에서 전환 카드가 표시되고 `#final`·헤딩 가시성·viewport와 동일한 scrollWidth·page errors 0·console errors 0을 확인했다. 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-PLAYWRIGHT-READING-HANDOFF-20261006`, `E-LIVE-PUBLIC-READING-HANDOFF-20261006`, `E-DEPLOY-PIPELINE-READING-HANDOFF-20261006`.

## Opening Bridge Chapter Handoff — 2026-10-06 — 658eb99

- 공격 관점에서 수면·회복 도입부의 다음 장 카드를 확인했다. 카드에는 외부 링크가 없고 `scrollTo('history')`로 GABA 발견 장을 열며, 클릭 뒤 `history-heading`에 포커스가 도착한다.
- 390px·1440px 공개 화면에서 전환 카드가 표시되고 `#history`·헤딩 가시성·viewport와 동일한 scrollWidth·page errors 0·console errors 0을 확인했다. 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-PLAYWRIGHT-OPENING-HANDOFF-20261006`, `E-LIVE-PUBLIC-OPENING-HANDOFF-20261006`, `E-DEPLOY-PIPELINE-OPENING-HANDOFF-20261006`.

## Recovery Playback Status Accessibility — 2026-10-06 — 0880c55

- 공격 관점에서 320px·390px·1440px 공개 수면·회복 카드의 시각 상태와 보조공학 상태를 대조했다. 초기에는 `자동 진행 · 3초마다`, 토글 클릭 후에는 `일시정지`로 바뀌며 `aria-live="polite"`·`aria-atomic="true"`가 두 상태에 모두 유지된다.
- 세 폭 모두 document scrollWidth가 viewport와 같고 page errors 0·console errors 0이었다. `GABA를 모르면 노화는 가속됩니다.` 제목과 14단계 흐름도 유지된다. 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-PLAYWRIGHT-RECOVERY-STATUS-A11Y-20261006`, `E-LIVE-PUBLIC-RECOVERY-STATUS-A11Y-20261006`, `E-DEPLOY-PIPELINE-RECOVERY-STATUS-A11Y-20261006`.

## Recovery Autoplay Status Clarity — 2026-10-07 — befeea5

- 공격 관점에서 320px·390px·1440px 공개 수면·회복 카드의 상태 문구와 조작 결과를 대조했다. 자동 상태는 `자동 진행 · 3초마다`, 토글 클릭 후에는 `일시정지`로 바뀌고, `GABA를 모르면 노화는 가속됩니다.` 제목과 14단계 경로가 유지된다.
- 세 폭 모두 document scrollWidth가 viewport와 같았고 page errors 0·console error 0이었다. 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-PLAYWRIGHT-RECOVERY-AUTOPLAY-LABEL-20261007`, `E-LIVE-PUBLIC-RECOVERY-AUTOPLAY-LABEL-20261007`, `E-DEPLOY-PIPELINE-RECOVERY-AUTOPLAY-LABEL-20261007`.

## Expert Video Feature State Synchronization — 2026-10-07 — 28ff210

- 공격 관점에서 390px·1440px 공개 전문가 영상 화면의 feature 메타, 선택 카드 badge, iframe lifecycle을 대조했다. 초기에는 `선택하면 바로 재생`, 두 번째 카드 선택 직후에는 `준비 중`, iframe 준비 후에는 feature와 카드 모두 `재생 중`으로 일치했다.
- iframe 1개·document scrollWidth·page errors 0·console error 0을 확인했고, 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했다.
- Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: `E-PLAYWRIGHT-VIDEO-FEATURE-STATE-20261007`, `E-LIVE-PUBLIC-VIDEO-FEATURE-STATE-20261007`, `E-DEPLOY-PIPELINE-VIDEO-FEATURE-STATE-20261007`.

## Expert Video Selection State Clarity — 2026-10-06 — a5e3f72

- 공격 관점에서 초기 전문가 영상 카드의 표시 상태, 두 번째 카드 선택 직후의 준비 상태, iframe load 이후의 재생 상태와 aria-label을 390px·1440px에서 대조했다.
- `선택됨` → `준비 중` → `재생 중`이 순서대로 일치했고 iframe 1개·document scrollWidth·runtime errors 0을 확인했다. 기존의 초기 `재생 중` 과대표시와 썸네일 `선택 후 재생`의 충돌은 제거됐다. 새 CRITICAL/MAJOR 결함은 없다.
- Browser 플러그인 부재로 Chromium fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-VIDEO-STATE-20261006, E-LIVE-PUBLIC-VIDEO-STATE-20261006, E-DEPLOY-PIPELINE-VIDEO-STATE-20261006.

## Research Subprogress Reading Rail — 2026-10-06 — cea481f

- 공격 관점에서 연구 지도에 직접 진입한 뒤 320px·390px·1440px에서 전체 장 번호와 연구 내부 순서가 함께 보이는지, 세 번째 지도 항목 선택이 진행 표시·live status·활성 카드와 일치하는지 확인했다.
- `06 / 12 · 연구 01 / 05`에서 세 번째 주제 선택 후 `06 / 12 · 연구 03 / 05`로 갱신되고, 활성 주제는 `근육`, document scrollWidth는 각 viewport와 같으며 runtime errors는 0이었다. 새 CRITICAL/MAJOR 결함은 없다.
- Browser 플러그인 부재로 Chromium fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-RESEARCH-SUBPROGRESS-20261006, E-LIVE-PUBLIC-RESEARCH-SUBPROGRESS-20261006, E-DEPLOY-PIPELINE-RESEARCH-SUBPROGRESS-20261006.

## Expert Video Editorial Fallback Posters — 2026-10-06 — d228a3d

- 공격 관점에서 원격 썸네일을 차단한 390px·1440px 공개 화면을 확인했다. 첫 네 카드가 제목·주제·회차를 잃지 않고, crop position이 달라지며, 두 번째 카드 선택이 feature title·iframe title·aria-pressed 상태를 함께 갱신했다.
- 새 CRITICAL/MAJOR 결함은 없다. Browser 플러그인 부재로 Chromium fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다.
- 공개 validator는 main candidate `d228a3df717136cfe3ab27c5ef092d2ea62bf320`를 반환했고 Pages 배포·라이브 smoke·release-status는 성공했다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-MOBILE-VIDEO-FALLBACK-POSTER-20261006, E-LIVE-PUBLIC-MOBILE-VIDEO-FALLBACK-POSTER-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FALLBACK-POSTER-20261006.

## Mobile Video Filter Accessibility Hardening — 2026-10-06 — 7fff775

- 공격 관점에서 320px 모바일 rail의 보조공학 의미, 좌우 이동 안내, 수평 overscroll, 44px 터치 영역, 시작·끝·복귀 cue와 마지막 주제 선택을 비교했다. region/aria-label과 `contain`이 공개 로컬·라이브에서 일치하고 document scrollWidth는 320으로 유지됐다.
- 새 CRITICAL/MAJOR 결함은 없다. 다만 Browser 플러그인 부재로 Chromium fallback을 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 RT-001·RT-002·RT-003 OPEN으로 유지한다.
- 공개 validator는 main code candidate `7fff775a6735c85f0ae7ff2362bf3604d19085d0`를 반환했고, Pages 배포·라이브 smoke·release-status는 성공했다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-MOBILE-VIDEO-FILTER-A11Y-20261006, E-LIVE-PUBLIC-MOBILE-VIDEO-FILTER-A11Y-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FILTER-A11Y-20261006.

## Live Public Recheck — 2026-10-06 — 16f3fec

- 공개 320px에서 시작 cue가 보이고 rail 끝에서는 숨겨지며, 시작점 복귀 후 다시 표시되는 상태를 확인했다. 마지막 `수면·기분` 주제 선택, document scrollWidth 320, runtime errors 0도 확인했다.
- 공개 validator의 candidate는 `16f3fec3403545098ed9e74a8ce058f75d59b9ce`로 main과 일치하고, deploy-pages·smoke-live는 성공했다. release-status queue는 운영 상태로 별도 표시한다.
- 새 CRITICAL/MAJOR 결함은 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-MOBILE-VIDEO-FILTER-CUE-STATE-20261006.

## Mobile Expert Video Filter Cue State — 2026-10-06 — cdbc6f3

- 공격 관점에서 320px rail 시작·끝·복귀 상태를 비교했다. v125 이후 시작점에서는 다음 주제 cue가 보이고, 끝점에서는 cue가 숨겨지며, 다시 시작점으로 돌아오면 복원된다. 마지막 `수면·기분` 선택, 44px 터치 영역, scrollWidth 320, runtime errors 0을 확인했다.
- 새 CRITICAL/MAJOR 결함은 없다. 다만 공개 validator는 이전 candidate `ffd7c2e`이고 main workflow `37373171340`은 worker-readiness runner queue에서 대기 중이므로, 이번 상태 보강이 공개본에 반영됐다고 주장하지 않는다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도와 공개 배포 후 라이브 재현을 OPEN으로 유지한다. 상태는 PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-MOBILE-VIDEO-FILTER-CUE-STATE-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FILTER-CUE-STATE-20261006.

## Mobile Expert Video Filter Continuation Cue — 2026-10-06 — c61c535

- 공격 관점에서 320px 전문가 영상 필터 rail의 첫 화면 발견성을 확인했다. 기존에는 `전체·수면·연구 읽기`만 노출되고 다음 주제 신호가 약했지만, v124 이후 오른쪽 gradient·ChevronRight가 추가되고 7개 주제·가로 스크롤·44px 터치 영역·끝 주제 선택이 유지된다.
- 로컬 Playwright에서 rail 끝 도달과 `수면·기분` 필터 활성화를 재현했으며 runtime errors는 0이었다. 새 CRITICAL/MAJOR 결함은 없다.
- 공개 검증은 의도적으로 보수적으로 기록한다. main run `37371457391`이 pending이고 공개 validator는 이전 candidate `ffd7c2e`를 반환하므로, 이번 cue의 라이브 반영을 주장하지 않는다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도와 함께 공개 배포 후 라이브 재현을 OPEN으로 유지한다.

증적: E-PLAYWRIGHT-MOBILE-VIDEO-FILTER-CUE-20261006, E-DEPLOY-PIPELINE-MOBILE-VIDEO-FILTER-CUE-20261006.

## Ultra-Narrow Header Clearance — 2026-10-06 — 27445e9

- 공격 관점에서 280·300·320·350px 헤더의 메뉴·읽기 크기 컨트롤 터치 영역을 비교해 8px overlap을 재현했다. v123 수정 후 네 폭 모두 overlap 없음, scrollWidth 일치, 320px 토글 상태와 runtime errors 0을 확인했다.
- PR #385의 필수 PR 검증은 성공했지만 main 공개 배포 run은 후처리 queue 때문에 취소되었고, 공개 validator는 새 CSS가 아닌 이전 candidate `ffd7c2e`를 반환했다. 따라서 이번 수정의 라이브 공개 반영은 아직 주장하지 않는다.
- 새 CRITICAL/MAJOR 결함은 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도와 함께 공개 배포 후 초소형 헤더 라이브 재현을 OPEN으로 유지한다.

증적: E-PLAYWRIGHT-ULTRA-NARROW-HEADER-20261006, E-DEPLOY-PIPELINE-ULTRA-NARROW-HEADER-20261006.

## Compact Mobile Reading Control — 2026-10-06 — ffd7c2e

- 공격 관점에서 320px 헤더의 읽기 크기 버튼 의미 노출, 터치 가능한 폭, 글자 크기 전환, 390·1440px 기존 라벨 보존, 가로 넘침과 콘솔 오류를 확인했다.
- 공개 320px에서 `가+ 글자`가 보이고 클릭 후 `가− 기본`, `aria-pressed=true`, `is-large-text`, scrollWidth 320이 유지됐다. 공개 390·1440px에서는 전체 라벨과 scrollWidth 390·1440이 유지됐다. 새 CRITICAL/MAJOR 결함은 없다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다. release-status job은 기록 시점에 queue 대기 상태였다.

증적: E-PLAYWRIGHT-READING-CONTROL-COMPACT-20261006, E-LIVE-PUBLIC-READING-CONTROL-COMPACT-20261006.

## Final Public Recheck — 2026-10-06 — f54bae6

- 최종 manifest candidate `f54bae600ce55ab6a2439bbd337eb26fc1949a1d` 공개본에서 연구 지도 중심 10px cue, 연구 영역 선택 후 카드 포커스·스크롤, 모바일·데스크톱 가로폭을 다시 확인했다.
- 공개 390px·1440px의 scrollWidth는 390·1425이고 runtime errors는 0이었다. 새 CRITICAL/MAJOR 결함은 없다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006.

## Public Recheck — 2026-10-06 — fb874662

- 공격 관점에서 연구 지도 중심 보조 문구의 모바일 최소 크기, 중심 원과의 충돌, 연구 영역 선택 후 카드 포커스·스크롤, 320·350·390·768·1440px 가로폭과 콘솔 오류를 재점검했다.
- 공개 390px·1440px에서 보조 문구는 모두 10px·900 weight·청록으로 계산되고, 인지 영역 선택 후 `aria-pressed=true`, `research-cognition` 포커스와 도착 카드가 확인됐다. scrollWidth는 390·1425, runtime errors는 0이었다. 새 CRITICAL/MAJOR 결함은 없다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-CDP-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-MOBILE-CUE-FLOOR-20261006.

## Public Recheck — 2026-10-06 — 8a6260f

- 공격 관점에서 연구 지도 중심 보조 문구의 모바일 축소·색 대비·중심 원과의 충돌, 연구 영역 선택 후 카드 포커스·스크롤, 가로 넘침과 콘솔 오류를 확인했다.
- 공개 390px에서 보조 문구는 9px·900 weight·청록으로 계산되고, 1440px에서는 10px·900 weight·같은 토큰으로 계산됐다. 인지 영역 선택 후 `aria-pressed=true`, `research-cognition` 포커스와 도착 카드가 확인됐으며 scrollWidth는 390·1425, runtime errors는 0이었다. 새 CRITICAL/MAJOR 결함은 없다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-CDP-RESEARCH-MAP-SCALE-LEGIBILITY-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-SCALE-LEGIBILITY-20261006.

## Public Recheck — 2026-10-06 — 8724f4c

- 공격 관점에서 모바일·데스크톱 전문가 영상 갤러리의 카드 선택, 주제 필터, 자동 재생 iframe, 포커스 이동, 가로 넘침과 콘솔 오류를 확인했다.
- 공개 390·1440px에서 9개 카드와 필터가 표시되고, 두 번째 카드 선택 후 feature 영역 포커스·선택 상태·`autoplay=1&mute=1&playsinline=1` iframe이 갱신되며 runtime 오류 0이었다. 새 CRITICAL/MAJOR 결함은 없다.
- 배포 후 재확인에서도 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-EXPERT-VIDEO-POSTDEPLOY-20261006.

## Public Recheck — 2026-10-06 — b73e086

- 공격 관점에서 연구 지도 중심 문구의 모바일 축소·겹침, 지도와 연구 카드의 순서, hero route의 잘못된 HTML 중첩, 콘솔 오류를 점검했다.
- 공개 390·1440px에서 `5개 연구 영역`, 다섯 topic 버튼, 읽는 순서, scrollWidth 390·1425, runtime console errors 0을 재현했고 새 CRITICAL/MAJOR 결함은 없었다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-CDP-RESEARCH-MAP-SCALE-20261006, E-LIVE-PUBLIC-RESEARCH-MAP-SCALE-20261006.

## Public Recheck — 2026-10-06 — f1cd671

- 공격 관점에서 사진 위 읽기 진입 컨트롤의 가독성, 최소 터치 영역, 키보드 초점, 모바일 가로 넘침, 클릭 후 목적지 정렬을 확인했다.
- 공개 390·1440px에서 버튼 표시·가로 폭·`#opening-bridge` 이동·읽기 진행 레일 동기화·runtime 오류 0을 재현했고 새 CRITICAL/MAJOR 결함은 없었다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-CDP-HERO-CUE-CONTRAST-20261006, E-LIVE-PUBLIC-HERO-CUE-CONTRAST-20261006.

## Public Recheck — 2026-10-06 — 589055e

- 공개 390·1440px에서 글자 크기 조절의 초기·토글 후 문구, aria-pressed, 가+/가− 신호, 가로 폭과 runtime 오류를 확인했다.
- 공개 배포 후에도 새 CRITICAL/MAJOR 결함은 재현되지 않았다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-READING-SIZE-LABEL-20261006.

## Recheck — 2026-10-06 — 1daf71b

- 공격 관점에서 `글자 크게`·`기본 크기` 문구가 모바일 헤더에서 잘리거나 기존 가+/가− 신호와 충돌하는지, 토글 후 가로 폭이 늘어나는지 확인했다.
- 390·1440px에서 초기·토글 후 문구, 접근성 라벨, aria-pressed, scrollWidth를 확인했고 새 CRITICAL/MAJOR 결함은 없었다.
- 공개 배포 전이므로 live Pages 검증은 남아 있다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-CDP-READING-SIZE-LABEL-20261006.

## Recheck — 2026-10-05 — d593491

- 공격 관점에서 첫 화면의 `3분 읽기 시작` 버튼이 실제 행동 요소인지, 포커스·클릭·해시 이동이 작동하는지, 390·1440px에서 고정 진행 레일과 도착 제목이 어긋나지 않는지 확인했다.
- 공개 화면에서 버튼 표시, `#opening-bridge` 이동, 진행 레일 동기화, 가로 넘침 없음, runtimeErrors 0을 확인했고 새 CRITICAL/MAJOR 결함은 없었다.
- 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장할 수 없으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-HERO-READING-START-20261006.

## Final Recheck — 2026-10-05 — 012e531

- 공격 관점에서 최종 공개본의 비교형 연구 도표 범례가 320·390·1440px에서 겹치거나 잘리지 않는지, 전체 도표 설명·가로 폭·runtime 오류·섹션 흐름이 유지되는지 확인했다. 결함은 재현되지 않았고 새 CRITICAL/MAJOR 결함은 없었다.
- 공개 candidate `012e5318cb45c5af734e5d83b0b79e654f0f6665`는 HTTP 200·STATIC을 반환했고 범례는 모바일에서 읽기 순서에 맞게 줄바꿈되며 데스크톱에서는 한 줄로 표시됐다. document scrollWidth는 320·390·1425px이고 runtimeErrors는 0이었다.
- 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장할 수 없으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-RESEARCH-CHART-LEGEND-FINAL-20261006.

## Recheck — 2026-10-05 — 859bb59

- 공격 관점에서 비교형 연구 도표의 읽는 법 범례가 모바일에서 겹치거나 잘리는지, 1440px에서 과도하게 작아지거나 차트와 충돌하는지, 전체 도표 설명이 사라지지 않는지 확인했다. 320·390·1440px에서 결함은 재현되지 않았고 새 CRITICAL/MAJOR 결함은 없었다.
- 공개 candidate `859bb59f901eb038f6152f5b89749616a3532aac`의 document scrollWidth는 320·390·1425px으로 viewport를 넘지 않았다. 범례는 모바일에서 각각 2줄·1줄로 자연스럽게 배치되고 데스크톱에서는 한 줄로 표시됐으며 runtimeErrors는 0이었다.
- 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장할 수 없으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-RESEARCH-CHART-LEGEND-20261006.

## Final Public Evidence Recheck — 2026-10-05 — 791450b

- 공격 관점에서 NAVI 문서 병합 이후 최종 공개본의 320·390·1440px 연구 도표, 가로 폭, GABA 결과 강조, runtime 오류와 공개 validator 상태를 다시 확인했다. 새 CRITICAL/MAJOR 결함은 없었다.
- 공개 candidate `791450bc6e929ddd6597ee9084a47750682262d4`는 HTTP 200·STATIC을 반환했고, 두 비교 조건은 lane width 96·131·195px로 나란히 표시됐다. document scrollWidth 320·390·1425로 가로 넘침은 없었다.
- 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장할 수 없으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-DEPLOY-PIPELINE-NAVI-SYNC-20261006, E-LIVE-PUBLIC-NAVI-SYNC-20261006.

## Recheck — 2026-10-05 — 0acdb90

- 공격 관점에서 320·390px 연구 결과 도표의 비교 조건·GABA 섭취 조건이 같은 행에 함께 보이는지, 좁은 화면 가로 넘침, GABA 결과 강조, 방향 문구, 1440px 데스크톱 회귀와 runtime 오류를 확인했다. 결함은 재현되지 않았고 새 CRITICAL/MAJOR 결함은 없었다.
- 공개 결과는 320px lane width 96px, 390px lane width 131px, 1440px lane width 195px였으며 document scrollWidth는 320·390·1425로 viewport를 넘지 않았다. 도표 높이는 845·765·456px로 확인되어 기존 세로 적층보다 짧아졌고 두 조건의 직접 비교가 유지됐다.
- 연구 수치·출처·제품 독립 공개 경계는 변경되지 않았다. 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장할 수 없으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-MOBILE-RESEARCH-COMPARISON-20261006.

## Full Public Flow Recheck — 2026-10-05 — 7c7e772

- 공격 관점에서 390px·1440px의 도입부터 공유까지 장별 진입, 고정 읽기 레일과 제목 간 간격, 연구 카드·출처·공유 영역의 화면 폭, 전문가 영상 필터 선택과 즉시 재생을 확인했다. 새 CRITICAL/MAJOR 결함과 runtime 오류는 재현되지 않았다.
- 390px와 1440px 모두 document scrollWidth가 viewport보다 커지지 않았고, 출처 읽기와 마지막 공유 구간도 콘텐츠가 고정 레일에 가려지지 않았다. 320·350·390px 전문가 영상 선택 흐름의 마지막 주제·제목·활성 카드·iframe·44px 공유 버튼도 기존 증적과 일치했다.
- 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장할 수 없으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LOCAL-BUILD-FULL-FLOW-20261005, E-LIVE-PUBLIC-FULL-FLOW-20261005.

## Recheck — 2026-10-05 — a37adcb

- 공격 관점에서 전문가 영상 주제 필터의 모바일 다중 줄 쌓임, 가로 레일 도달성, 44px 터치 영역, 마지막 주제 선택 후 제목·활성 카드·autoplay iframe 동기화, 가로 넘침, runtime 오류를 320·350·390px에서 확인했다. 결함은 재현되지 않았고 새 CRITICAL/MAJOR 결함은 없었다.
- 수평 rail은 wrapper clientWidth 256·286·326px, content scrollWidth 711px, 끝 도달 scrollLeft 455·425·385px으로 확인되었고 필터 레일 높이는 45px이었다. 선택 후 `불면·우울감과 GABA 이야기`, active card 1, iframe 1이 함께 갱신됐다.
- 연구 수치·출처·제품 독립 공개 경계는 변경되지 않았다. 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장하지 않으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-MOBILE-VIDEO-FILTER-RAIL-20261005.

## Recheck — 2026-10-05 — 88f9382

- 공격 관점에서 첫 화면 읽기 경로의 모바일 줄바꿈, 데스크톱 한 줄 정렬, chevron 누락·겹침, 발견 장 시간축의 연결부 누락, 가로 넘침, runtime 오류를 390px·1440px에서 확인했다. 결함은 재현되지 않았고 새 CRITICAL/MAJOR 결함은 없었다.
- 390px 경로 항목은 두 줄로 분리되지만 각 항목이 서로 겹치지 않고, 1440px에서는 한 줄로 유지된다. `#history` 직접 진입에서도 scrollWidth 390·1425와 시간축 CSS chevron이 유지됐다.
- 연구 카피·수치·제품 독립 공개 경계는 변경되지 않았다. 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장하지 않으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-HERO-READING-ROUTE-20261005.

## Recheck — 2026-10-05 — 96333a6

- 공격 관점에서 연구 읽기 레일의 텍스트 화살표 잔존, 모바일 연결 장식 과밀, 데스크톱 chevron 누락, 연구 handoff 이동 실패, 가로 넘침, runtime 오류를 390px·1440px에서 확인했다. 해당 결함은 재현되지 않았고 새 CRITICAL/MAJOR 결함은 없었다.
- 390px에서는 research rail pseudo content가 `none`이고 scrollWidth가 390px이며, 1440px에서는 연결부 3개가 6px CSS chevron으로 표시되고 scrollWidth가 1425px이다. 연구→국내외 활용→발효·안전→출처 읽기 이동은 현재 장·hash·도착 위치를 함께 갱신했다.
- 연구 카피·수치·제품 독립 공개 경계는 변경되지 않았다. 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장하지 않으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-RESEARCH-RAIL-20261005.

## Recheck — 2026-10-05 — d98abdd

- 공격 관점에서 회복 장의 연결 흐름과 출처 읽기 장의 연구 카드 → 원문 출처 연결부를 390px·1440px에서 확인했다. 텍스트 화살표 잔존, SVG 누락, handoff 이동 실패, 가로 넘침, runtime 오류는 재현되지 않았고 새 CRITICAL/MAJOR 결함은 없었다.
- 연구 카피·수치·제품 독립 공개 경계는 변경되지 않았다. 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장하지 않으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-FLOW-ARROWS-20261005.

## Recheck — 2026-10-05 — 62ad947

- 전문가 영상 다음 읽기 연결부를 390px·1440px에서 공격적으로 확인했다. SVG 화살표가 표시되고, 국내외 활용·발효·안전·출처 읽기 handoff의 해시와 현재 장 표시가 함께 갱신되며 scrollWidth는 390·1425px으로 유지됐다.
- 오류·가로 넘침·터치 영역 결함은 재현되지 않았고 새 CRITICAL/MAJOR 결함은 없었다. 연구 카피·수치·제품 독립 공개 경계는 변경되지 않았다.
- 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장하지 않는다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-EDITORIAL-ARROW-20261005.

## Recheck — 2026-10-05 — 2eb17a7

- 공격 관점에서 연구 지도 선택, 다음 연구 이동, `#final` 직접 진입, 사업자용 전체 복사, 전문가 영상 선택·자동 재생을 390px 공개 화면에서 실행했다. 연구 카드·읽기 레일·진행 수·복사 완료·iframe 상태가 서로 어긋나는 실패는 재현되지 않았다.
- 가로폭 390px, runtimeErrors 0, 직접 진입 제목 위치 115px, `12 / 12`, 연구 카드 도착 113px을 확인했다. 새 CRITICAL/MAJOR 결함은 없었다.
- Chrome CDP 대표 렌더만으로 전체 브라우저·실기기를 보장하지 않는다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-RESEARCH-FLOW-20261005, E-LIVE-PUBLIC-DIRECT-FINAL-CONTEXT-20261005, E-LIVE-PUBLIC-TRUSTED-SHARE-COPY-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-FLOW-20261005.

## Recheck — 2026-10-05 — 8605724

- 공격 관점에서 280·300·320·360·390px의 헤더 폭 경계와 모바일 메뉴 키보드 순환을 확인했다. 컨트롤 충돌, 44px 미만 터치 영역, 가로 넘침, 포커스 이탈, Escape 후 포커스 분실은 재현되지 않았다.
- 390px에서 메뉴를 연 뒤 첫 링크 포커스, 8회 Tab 순환, Escape 닫힘과 `메뉴 열기` 토글 복귀를 확인했으며 새 CRITICAL/MAJOR 결함은 없었다.
- 대표 Chrome CDP 렌더만으로 전체 브라우저·실기기를 보장할 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LIVE-PUBLIC-NARROW-HEADER-KEYBOARD-20261005, E-LIVE-PUBLIC-MOBILE-MENU-KEYBOARD-20261005.

## Recheck — 2026-10-05 — 2c1bca9

- 공격 관점에서 모바일 줄바꿈 전용 요소가 사라지는 태블릿·데스크톱 조건을 확인했고, 발견 섹션 제목이 `이름도없었습니다`로 붙는 실패 모드를 재현했다. PR #331에서 공백을 요소 밖으로 이동해 보정했다.
- 공개 390·768·1440px Chrome CDP fallback에서 `처음에는 이름도 없었습니다. 다만, 뇌 속에 있었습니다.`가 동일하게 읽히고 가로 넘침·이름 없는 컨트롤·누락 alt·누락 iframe title·중복 ID·heading jump·runtimeErrors가 없었다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 대표 Chrome 렌더 확인이지 전체 브라우저·실기기 보장은 아니다. Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-HISTORY-HEADING-SPACING-20261005, E-UI-CONTRACT-HISTORY-HEADING-SPACING-20261005, E-DEPLOY-PIPELINE-HISTORY-HEADING-SPACING-20261005, E-LIVE-PUBLIC-HISTORY-HEADING-SPACING-20261005.

## Recheck — 2026-10-05 — 9c1a5cf

- 공격 관점에서 첫 화면 H1과 장 제목의 줄바꿈을 제거·복사·보조기기 읽기 상황에 적용했을 때 `저속노화,회복하는`, `시작됩니다그`, `넘어여러`처럼 단어가 붙는 실패 모드를 확인했다. PR #328·#329에서 의미 있는 JSX 공백과 정적 제목 공백을 보존하고 UI 계약으로 회귀를 고정했다.
- 캐시를 비활성화한 Chrome CDP fallback 공개 320·390·768·1024·1440px에서 H1과 14개 H2의 자연스러운 textContent, 각 뷰포트와 일치하는 scrollWidth, runtimeErrors 0을 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 대표 Chrome 렌더 확인이지 전체 브라우저·실기기 보장은 아니다. Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-KOREAN-HEADING-SPACING-20261005, E-UI-CONTRACT-KOREAN-HEADING-SPACING-20261005, E-DEPLOY-PIPELINE-KOREAN-HEADING-SPACING-20261005, E-LIVE-PUBLIC-KOREAN-HEADING-SPACING-20261005.

## Recheck — 2026-10-05 — a18561f

- 공격 관점에서 확인한 실패 모드는 390px 모바일 연구 비교 도표의 세 칸 범례가 `GABA를 바른 조건`을 음절 단위로 끊어 조건과 결과 막대의 의미 연결을 약하게 만드는 것이었다. PR #326에서 모바일 범례를 세로 순서로 분리하고 조건명을 한 줄로 유지했다.
- 로컬·공개 390px에서 `변화 방향`, `비교 조건`, `GABA를 바른 조건`이 각각 독립된 줄에 표시되고 가로 넘침과 런타임 오류가 없었으며, 1440px의 좌우 비교 도표는 유지됐다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 이는 대표 Chrome CDP 확인이지 전체 브라우저·실기기 보장이 아니다. Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 계속 OPEN이며 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도와 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LOCAL-BUILD-MOBILE-COMPARISON-LEGEND-20261005, E-UI-CONTRACT-MOBILE-COMPARISON-LEGEND-20261005, E-DEPLOY-PIPELINE-MOBILE-COMPARISON-LEGEND-20261005, E-LIVE-PUBLIC-MOBILE-COMPARISON-LEGEND-20261005.

## Recheck — 2026-10-05 — 726fe8a8

- 공격 관점에서 확인한 실패 모드는 읽기 진행 레일이 나타나는 찰나에 히어로 사진이 레일의 위치 안내 문구에 비쳐 대비가 약해지는 것이었다. PR #324에서 opacity 전환을 transform 전환으로 바꿔 불투명한 흰색 위치 표면을 즉시 노출했다.
- 280·300·320·360·390px 헤더, 큰 글씨 모드, 390px 전문가 영상 선택·즉시 재생, 390·768·1024·1440px 장 직접 진입을 재검증했고 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- 공개 Pages candidate `726fe8a85f5729c780d5da21dee36f4fa86d6412`와 라이브 smoke가 성공했지만 대표 Chrome CDP 확인만으로 전체 브라우저·실기기를 보장할 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LOCAL-BUILD-READING-RAIL-OPAQUE-20261005, E-UI-CONTRACT-READING-RAIL-OPAQUE-20261005, E-DEPLOY-PIPELINE-READING-RAIL-OPAQUE-20261005, E-LIVE-PUBLIC-READING-RAIL-OPAQUE-20261005.

## Recheck — 2026-10-05 — 2ca5a8a

- 공격 관점에서 확인한 실패 모드는 지연 렌더링 하위 장을 처음 열 때 실제 콘텐츠 높이가 예약값보다 커져 현재 읽는 장면과 다음 장면의 위치가 갑자기 바뀌는 것이었다. PR #322에서 모바일·태블릿·데스크톱 폭별 예약 높이를 분리해 이 실패 모드를 보정했다.
- 로컬 CDP 감사는 390·768·1024·1440px에서 방문 전·후 위치 차이를 각각 모바일 1–5px, 768px 1px, 1024px·1440px 0px로 확인했으며 390·768·1024·1440px의 가로 넘침도 없었다. 공개 URL 직접 진입도 동일 폭에서 연구·전문가 영상·마지막 장의 헤더 아래 정렬을 유지했다.
- 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 결함은 확인되지 않았지만 Chrome 대표 렌더만으로 모든 브라우저·실기기를 보장할 수 없으므로 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다.

증적: E-LOCAL-BUILD-DEFERRED-CHAPTER-STABILITY-20261005, E-UI-CONTRACT-DEFERRED-CHAPTER-STABILITY-20261005, E-DEPLOY-PIPELINE-DEFERRED-CHAPTER-STABILITY-20261005, E-LIVE-PUBLIC-DEFERRED-CHAPTER-STABILITY-20261005.

## Recheck — 2026-10-05 — 2226541

- 공격 관점에서 확인한 실패 모드는 1440px 데스크톱 hero 사진 위의 `아래로 읽기` 안내가 낮은 대비로 묻혀 방문자가 긴 안내서의 다음 장면을 놓치는 것이었다. PR #320에서 701px 이상 안내를 pill·테두리·그림자·blur로 분리하고 v109 UI 계약으로 회귀를 고정했다.
- PR #320 checks와 main Pages 배포·라이브 smoke·release status가 통과했다. 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 캐시 비활성화 Chrome CDP fallback 공개 1440px에서 `border`, `rgba(255,255,255,.72)` 배경, `blur(8px)`, `scrollWidth=1425`를 확인했고 390px에서는 모바일 안내와 `scrollWidth=390`을 확인했다. 다만 이는 대표 렌더 확인이지 전체 브라우저·실기기 보장은 아니다. Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-DESKTOP-READING-CUE-20261005, E-UI-CONTRACT-DESKTOP-READING-CUE-20261005, E-DEPLOY-PIPELINE-DESKTOP-READING-CUE-20261005, E-LIVE-PUBLIC-DESKTOP-READING-CUE-20261005.

## Recheck — 2026-10-05 — 2c7433b

- 공격 관점에서 381–430px에서 메뉴 아이콘과 이름이 표시된 읽기 크기 버튼이 겹쳐 헤더의 조작 의미가 흐려지는 실패 모드를 확인했다. PR #318에서 메뉴 오프셋을 보정해 컨트롤 사이 12px 간격을 고정했다.
- UI 계약·typecheck·127개 테스트·production build·Pages 배포·라이브 smoke·release status가 통과했다. 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 캐시 비활성화 Chrome CDP fallback 공개 320·350·381·390·430px에서 헤더 컨트롤 겹침 0건과 가로 폭 일치를 확인했다. 다만 이는 대표 렌더 확인이지 전체 브라우저·실기기 보장은 아니다. Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-NARROW-HEADER-SPACING-20261005, E-UI-CONTRACT-NARROW-HEADER-SPACING-20261005, E-DEPLOY-PIPELINE-NARROW-HEADER-SPACING-20261005, E-LIVE-PUBLIC-NARROW-HEADER-SPACING-20261005.

## Recheck — 2026-10-05 — 030f43a

- 공격 관점에서 확인한 실패 모드는 320px 폭에서 연구 비교 도표의 GABA 조건 레이블이 한 줄 고정으로 화면 밖으로 밀려나 비교 의미를 즉시 읽을 수 없게 되는 것이었다. PR #316에서 좁은 화면의 도표 헤더를 grid로 바꾸고 레이블 줄바꿈을 고정했다.
- UI 계약·typecheck·127개 테스트·production build·Pages 배포·라이브 smoke·release status가 통과했다. 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 캐시 비활성화 Chrome CDP fallback 공개 320·350·390·768px에서 overflowCount `0`과 뷰포트별 scrollWidth 일치를 확인했다. 다만 이는 대표 렌더 확인이지 전체 브라우저·실기기 보장은 아니다. Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-NARROW-CHART-HEADER-20261005, E-UI-CONTRACT-NARROW-CHART-HEADER-20261005, E-DEPLOY-PIPELINE-NARROW-CHART-HEADER-20261005, E-LIVE-PUBLIC-NARROW-CHART-HEADER-20261005.

## Recheck — 2026-10-05 — 80bd0f2

- 공격 관점에서 확인한 실패 모드는 모바일 hero 사진 위의 `아래로 읽기` 안내가 낮은 대비로 묻혀 방문자가 긴 안내서의 다음 장면을 놓치는 것이었다. PR #313에서 흰색 pill·테두리·그림자로 안내를 분리하고 UI 계약으로 회귀를 고정했다.
- UI 계약·typecheck·127개 테스트·production build·Pages 배포·라이브 smoke·release status가 통과했다. 초기 배포가 오래된 TF heartbeat 때문에 중단된 것은 보호 게이트가 정상 작동한 결과이며, PR #314 반영 후 최종 배포가 성공했다. 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았다.
- Chrome CDP fallback 공개 390px에서 안내 문구·대비·큰 글씨 토글·가로 넘침 없음이 확인됐다. 다만 대표 렌더는 전체 브라우저·실기기 보장이 아니므로 Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-READING-CUE-CONTRAST-20261005, E-UI-CONTRACT-MOBILE-READING-CUE-CONTRAST-20261005, E-DEPLOY-PIPELINE-MOBILE-READING-CUE-CONTRAST-20261005, E-LIVE-PUBLIC-MOBILE-READING-CUE-CONTRAST-20261005.

## Recheck — 2026-10-05 — 21a34c7

- 공격 관점에서 확인한 실패 모드는 모바일 메뉴를 연 뒤 `발견` 장면을 선택할 때 body 스크롤 잠금 해제와 smooth scroll이 경합해 메뉴만 닫히고 화면이 현재 위치에 남는 것이었다. PR #311에서 메뉴 선택은 즉시 정렬하도록 보정했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status가 통과했다. 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Chrome CDP fallback 공개 390px에서 메뉴 열기→발견 선택 후 메뉴 닫힘, `scrollY=1660`, 제목 top `132.1px`, body overflow 해제, 가로 넘침 없음이 확인됐다. 다만 이는 대표 렌더 확인이지 전체 브라우저·실기기 보장은 아니다. Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-MENU-NAVIGATION-20261005, E-UI-CONTRACT-MOBILE-MENU-NAVIGATION-20261005, E-DEPLOY-PIPELINE-MOBILE-MENU-NAVIGATION-20261005, E-LIVE-PUBLIC-MOBILE-MENU-NAVIGATION-20261005.

## Recheck — 2026-10-05 — fb3d19c

- 공격 관점에서 확인한 실패 모드는 모바일 연구 결과 카드의 제목과 직접 결과가 한 행에서 폭을 다투어 제목이 세로로 찌그러지고, 독자가 연구 결과를 즉시 비교하기 어려워지는 것이었다. PR #309에서 제목과 결과 요약을 세로 리듬으로 분리했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status가 통과했다. 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Chrome CDP fallback은 대표 렌더 확인이지 전체 브라우저·실기기 보장이 아니다. Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-RESEARCH-CARD-LAYOUT-20261005, E-UI-CONTRACT-MOBILE-RESEARCH-CARD-LAYOUT-20261005, E-DEPLOY-PIPELINE-MOBILE-RESEARCH-CARD-LAYOUT-20261005, E-LIVE-PUBLIC-MOBILE-RESEARCH-CARD-LAYOUT-20261005.

## Recheck — 2026-10-05 — 85ec17f

- 공격 관점에서 확인한 실패 모드는 발효·안전에서 성장 연구, 성장 연구에서 전문가 영상으로 넘어갈 때 다음 읽기 장면이 암묵적으로 남아 긴 모바일 페이지의 맥락이 끊기는 것이었다. PR #307에서 두 handoff를 추가해 현재 장면과 다음 장면을 같은 시각 레일로 연결했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status가 통과했다. 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 다만 Chrome CDP fallback은 대표 렌더 확인이지 전체 브라우저·실기기 보장이 아니다. Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 계속 OPEN이며 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-EDITORIAL-HANDOFFS-20261005, E-UI-CONTRACT-EDITORIAL-HANDOFFS-20261005, E-DEPLOY-PIPELINE-EDITORIAL-HANDOFFS-20261005, E-LIVE-PUBLIC-EDITORIAL-HANDOFFS-20261005.

## Recheck — 2026-10-05 — 31fcd55

- 공격 관점에서 확인한 실패 모드는 연구 규모 카드의 984·557·12,124가 동일한 모집단·검색 범위의 숫자처럼 읽혀 기관별 PubMed 검색과 별도 SCIE 분석의 의미가 흐려지는 것이었다. PR #305에서 숫자보다 먼저 두 범위를 색상·라벨로 분리하고 모바일에서는 세로 순서를 유지했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status가 통과했다. 연구 원문·공개 수치·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 다만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 현재 환경에서 증명하지 않았으므로 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RESEARCH-SCALE-SCOPE-20261005, E-UI-CONTRACT-RESEARCH-SCALE-SCOPE-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCALE-SCOPE-20261005, E-LIVE-PUBLIC-RESEARCH-SCALE-SCOPE-20261005.

## Recheck — 2026-10-05 — 5ebcfaa

- 공격 관점에서 확인한 실패 모드는 모바일 독자가 hero에서 어디로 읽어야 하는지 즉시 알기 어렵고, 회복 브리지의 작은 제목이 '잠깐'이라는 삽입어로 장문의 편집 흐름을 끊는 것이었다. PR #303에서 아래로 읽기 큐와 자연스러운 연결 제목을 추가했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. reduced-motion 차단도 계약으로 확인했고 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 다만 실제 네트워크 waterfall·브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 환경에서 증명하지 않았으므로 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-READING-CUE-20261005, E-UI-CONTRACT-MOBILE-READING-CUE-20261005, E-DEPLOY-PIPELINE-MOBILE-READING-CUE-20261005, E-LIVE-PUBLIC-MOBILE-READING-CUE-20261005.

## Recheck — 2026-10-05 — 72f3cd9

- 공격 관점에서 확인한 실패 모드는 공개 GABA 안내서에 제품·주문용 콘텐츠 요청이 먼저 발생해 첫 화면 네트워크 비용이 늘고, 제품 독립 안내서가 공용 상거래 데이터에 불필요하게 결합되는 것이었다. PR #301에서 guide·account·local admin·operations 경로를 분리하고, 필요한 연구·제품·공유·챌린지 경로의 로딩은 유지했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 다만 실제 네트워크 waterfall·브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 환경에서 증명하지 않았으므로 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005, E-UI-CONTRACT-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005, E-DEPLOY-PIPELINE-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005, E-LIVE-PUBLIC-PUBLIC-GUIDE-CONTENT-BOUNDARY-20261005.

## Recheck — 2026-10-05 — 594352e

- 공격 관점에서 확인한 실패 모드는 모바일 연구 지도에서 중심의 현재 주제가 너무 작게 표시되고, 지도 선택이 보조기기에 일반 장식 영역처럼 전달되어 현재 선택과 다음 연구 카드의 관계를 잃는 것이었다. PR #299에서 지도에 명명된 group 역할과 주제별 `aria-pressed` 상태를 추가하고 모바일 현재 주제 문구를 확대했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 다만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 환경에서 증명하지 않았으므로 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-CONTEXT-20261005, E-UI-CONTRACT-RESEARCH-MAP-CONTEXT-20261005, E-DEPLOY-PIPELINE-RESEARCH-MAP-CONTEXT-20261005, E-LIVE-PUBLIC-RESEARCH-MAP-CONTEXT-20261005.

## Recheck — 2026-10-05 — 4b30428

- 공격 관점에서 확인한 실패 모드는 연구 지도나 전문가 영상 카드를 선택해도 보조기기가 실제로 갱신되는 연구 결과·대표 영상 영역을 명시적으로 알지 못해, 화면의 선택 상태와 읽기 목적지가 분리되는 것이었다. PR #297에서 연구 선택을 `research-flow` 명명 영역에, 영상 선택을 `expert-video-feature` 대상에 연결하고 선택·포커스 윤곽을 추가했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 다만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 환경에서 증명하지 않았으므로 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RESEARCH-VIDEO-DESTINATION-20261005, E-UI-CONTRACT-RESEARCH-VIDEO-DESTINATION-20261005, E-DEPLOY-PIPELINE-RESEARCH-VIDEO-DESTINATION-20261005, E-LIVE-PUBLIC-RESEARCH-VIDEO-DESTINATION-20261005.

## Recheck — 2026-10-05 — a796f3d

- 공격 관점에서 확인한 실패 모드는 한국어 전문가 영상 게시판 헤더가 영문식 자간으로 벌어져 주제와 영상 수의 관계를 한 번에 읽기 어렵고, 필터가 업데이트하는 영상 목록이 보조기기에 명시되지 않는 것이었다. PR #295에서 헤더 자간을 줄이고 필터-목록 `aria-controls` 연결을 추가했다.
- 빈 로컬 주문 입력 매니페스트의 계약도 복구했지만 실제 주문 자료를 추가하거나 공개 export에 포함하지 않았다. UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 다만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 환경에서 증명하지 않았으므로 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-KOREAN-VIDEO-BOARD-TYPE-20261005, E-UI-CONTRACT-KOREAN-VIDEO-BOARD-TYPE-20261005, E-DEPLOY-PIPELINE-KOREAN-VIDEO-BOARD-TYPE-20261005, E-LIVE-PUBLIC-KOREAN-VIDEO-BOARD-TYPE-20261005.

## Recheck — 2026-10-05 — 02ad4cc

- 공격 관점에서 확인한 실패 모드는 전문가 영상 주제를 바꾼 뒤 화면의 현재 필터·표시 수·대표 영상과 보조기기 안내가 서로 분리되는 것이었다. PR #293에서 현재 주제 pill, 영상 수, polite live 상태, 완전한 filter/card accessible names를 연결했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 다만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 환경에서 증명하지 않았으므로 PASS_WITH_CONDITIONS를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-VIDEO-FILTER-CONTEXT-20261005, E-UI-CONTRACT-VIDEO-FILTER-CONTEXT-20261005, E-DEPLOY-PIPELINE-VIDEO-FILTER-CONTEXT-20261005, E-LIVE-PUBLIC-VIDEO-FILTER-CONTEXT-20261005.

## Recheck — 2026-10-05 — efb3f20

- 공격 관점에서 확인한 실패 모드는 연구 카드나 출처 읽기 장면에서 공유할 때 화면의 선택 연구와 공유 링크·제목·문장이 분리되어, 수신자가 일반 출처 읽기 장으로 이동하는 것이었다. PR #291에서 `research`·`reading-note` 장면의 선택 연구를 `research-{id}` 딥링크와 연구별 공유 문장에 연결하고, 영상·다른 장의 분기는 보존했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 브라우저 상호작용 캡처, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 실행 환경에서 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RESEARCH-SHARE-CONTEXT-20261005, E-UI-CONTRACT-RESEARCH-SHARE-CONTEXT-20261005, E-DEPLOY-PIPELINE-RESEARCH-SHARE-CONTEXT-20261005, E-LIVE-PUBLIC-RESEARCH-SHARE-CONTEXT-20261005.

## Recheck — 2026-10-05 — 4143e45

- 공격 관점에서 확인한 실패 모드는 연구 카드를 선택한 뒤에도 출처 읽기 패널이 첫 연구에 고정되어 대상·측정 항목·설계와 원문 출처가 선택된 연구와 어긋나 보이는 것이었다. PR #289에서 `activeResearchTopic`을 출처 읽기 패널에 연결하고, 직접 진입 시에만 인지 연구를 기본 예시로 사용하도록 보정했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 실행 환경에서 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-CONTEXTUAL-SOURCE-20261005, E-UI-CONTRACT-CONTEXTUAL-SOURCE-20261005, E-DEPLOY-PIPELINE-CONTEXTUAL-SOURCE-20261005, E-LIVE-PUBLIC-CONTEXTUAL-SOURCE-20261005.

## Recheck — 2026-10-05 — 7c409a1

- 공격 관점에서 확인한 실패 모드는 모바일 출처 읽기 패널의 네 가지 질문이 독립 목록으로 보여 “누구를 살폈는가 → 어떻게 비교했는가 → 무엇이 달라졌는가 → 어디까지 알 수 있는가”의 순서가 빠르게 보이지 않는 것이었다. PR #287에서 번호를 연결하는 세로 레일과 흰색 번호 표면을 적용하고, 원문 출처 카드의 가로 읽기 폭을 보강했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 실행 환경에서 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-SOURCE-RAIL-20261005, E-UI-CONTRACT-MOBILE-SOURCE-RAIL-20261005, E-DEPLOY-PIPELINE-MOBILE-SOURCE-RAIL-20261005, E-LIVE-PUBLIC-MOBILE-SOURCE-RAIL-20261005.

## Recheck — 2026-10-05 — 3904b39

- 공격 관점에서 확인한 실패 모드는 좁은 화면에서 “다음 장” 연결부의 flex 줄바꿈이 문장 순서를 흐려 연구·활용·전문가 영상 사이의 다음 읽기 장면을 즉시 파악하기 어렵게 만드는 것이었다. PR #285에서 연구·활용 handoff를 현재 맥락·구분선·다음 장면의 grid로, 전문가 영상 handoff를 현재 장·다음 기준·원문 출처의 순서로 재배치했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 실행 환경에서 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-HANDOFF-20261005, E-UI-CONTRACT-MOBILE-HANDOFF-20261005, E-DEPLOY-PIPELINE-MOBILE-HANDOFF-20261005, E-LIVE-PUBLIC-MOBILE-HANDOFF-20261005.

## Recheck — 2026-10-05 — b343def

- 공격 관점에서 확인한 실패 모드는 좁은 휴대폰 연구 카드에서 비교 조건과 GABA 결과가 좌우로 압축되어 시선이 오갈 때 핵심 차이를 놓칠 수 있는 것이었다. PR #283에서 두 레인을 한 열로 세로 배치하고 GABA 결과에 좌측 teal 표식을 적용해 읽기 순서를 명확히 했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 실행 환경에서 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-NARROW-COMPARISON-20261005, E-UI-CONTRACT-NARROW-COMPARISON-20261005, E-DEPLOY-PIPELINE-NARROW-COMPARISON-20261005, E-LIVE-PUBLIC-NARROW-COMPARISON-20261005.

## Recheck — 2026-10-05 — de91cbb

- 공격 관점에서 확인한 실패 모드는 모바일 장 맥락 문구가 복원됐어도 작은 글자·긴 행간·본문과의 약한 구분 때문에 장면의 의미를 빠르게 놓칠 수 있는 것이었다. PR #281에서 14px 읽기 크기, 26ch 폭, 1.65 행간, 좌측 포인트 라인을 적용해 시각 위계를 보강했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 실행 환경에서 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-CONTEXT-FLOOR-20261005, E-UI-CONTRACT-MOBILE-CONTEXT-FLOOR-20261005, E-DEPLOY-PIPELINE-MOBILE-CONTEXT-FLOOR-20261005, E-LIVE-PUBLIC-MOBILE-CONTEXT-FLOOR-20261005.

## Recheck — 2026-10-05 — b98df10

- 공격 관점에서 확인한 실패 모드는 모바일에서 섹션 제목 아래의 짧은 보조 맥락이 사라져 장면의 의미와 다음 내용이 단절되어 보이는 것이었다. PR #279에서 700px 이하 화면에 해당 문구를 복원하고 폭·글자 크기·행간을 UI 계약으로 고정했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 브라우저 렌더 결과, Safari/iOS/Android 실기기, 실제 고령 사용자 이해도는 현재 실행 환경에서 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-CHAPTER-CONTEXT-20261005, E-UI-CONTRACT-MOBILE-CHAPTER-CONTEXT-20261005, E-DEPLOY-PIPELINE-MOBILE-CHAPTER-CONTEXT-20261005, E-LIVE-PUBLIC-MOBILE-CHAPTER-CONTEXT-20261005.

## Recheck — 2026-10-05 — 13450f2

- 공격 관점에서 확인한 실패 모드는 읽기 진행 표시가 시각용 메타와 보조기기용 status 역할을 동시에 맡아, 화면에 보이지 않는 현재 장·연구 문맥이 안정적으로 읽히지 않을 수 있는 것이었다. PR #277에서 두 표현을 분리하고 별도 라이브 안내를 추가했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 스크린리더·브라우저 조합과 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 보조기기별 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-READING-LIVE-CONTEXT-20261005, E-UI-CONTRACT-READING-LIVE-CONTEXT-20261005, E-DEPLOY-PIPELINE-READING-LIVE-CONTEXT-20261005, E-LIVE-PUBLIC-READING-LIVE-CONTEXT-20261005.

## Recheck — 2026-10-05 — 0d4981d

- 공격 관점에서 확인한 실패 모드는 한글 제목이 좁은 모바일 폭에서 불균형하게 끊기거나 본문 설명이 짧은 구간마다 과도하게 분절되어 읽기 리듬을 해칠 수 있는 것이었다. PR #275에서 지원 브라우저의 제목 균형 줄바꿈과 본문 자연스러운 줄바꿈을 CSS 계약으로 고정했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 렌더 결과를 확인하는 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 브라우저별 줄바꿈·실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-TYPOGRAPHY-WRAP-20261005, E-UI-CONTRACT-TYPOGRAPHY-WRAP-20261005, E-DEPLOY-PIPELINE-TYPOGRAPHY-WRAP-20261005, E-LIVE-PUBLIC-TYPOGRAPHY-WRAP-20261005.

## Recheck — 2026-10-05 — 98c59eb

- 공격 관점에서 확인한 실패 모드는 긴 안내서의 하단 영상·출처·공유 섹션까지 초기 계산에 참여해 모바일 첫 화면과 긴 스크롤 반응을 무겁게 만들 수 있는 것이었다. PR #273에서 화면 근처까지 하단 섹션을 점진 렌더링하고 예약 높이를 제공했으며 연구 활성 주제 감지 영역은 제외했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 브라우저 성능 trace, Browser/Playwright, Safari/iOS/Android 실기기가 현재 실행 환경에 없어 체감 성능 개선과 브라우저별 동작은 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-PROGRESSIVE-PUBLISHING-20261005, E-UI-CONTRACT-PROGRESSIVE-PUBLISHING-20261005, E-DEPLOY-PIPELINE-PROGRESSIVE-PUBLISHING-20261005, E-LIVE-PUBLIC-PROGRESSIVE-PUBLISHING-20261005.

## Recheck — 2026-10-05 — 7eef131

- 공격 관점에서 확인한 실패 모드는 전문가 영상·썸네일의 외부 연결이 첫 선택 시점에 준비되지 않아 모바일 네트워크 상태에 따라 영상 갤러리 반응이 늦어질 수 있는 것이었다. PR #271에서 미디어 origin 연결 힌트를 추가하고 기존 lazy loading을 유지했다.
- UI 계약, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 실제 브라우저 네트워크 waterfall, Browser/Playwright, Safari/iOS/Android 실기기가 현재 실행 환경에 없어 연결시간 개선의 실측과 브라우저별 동작은 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MEDIA-HINTS-20261005, E-UI-CONTRACT-MEDIA-HINTS-20261005, E-DEPLOY-PIPELINE-MEDIA-HINTS-20261005, E-LIVE-PUBLIC-MEDIA-HINTS-20261005.

## Recheck — 2026-10-05 — ee77f28

- 공격 관점에서 확인한 실패 모드는 IntersectionObserver 콜백에 포함된 일부 카드만 비교해 빠른 스크롤 중 활성 연구 주제가 흔들릴 수 있는 것이었다. PR #269에서 카드별 최신 상태를 누적하고 가장 높은 교차 비율을 가진 카드만 발행하도록 보완했다.
- UI 계약 v88, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-OBSERVER-STATE-20261005, E-UI-CONTRACT-OBSERVER-STATE-20261005, E-DEPLOY-PIPELINE-OBSERVER-STATE-20261005, E-LIVE-PUBLIC-OBSERVER-STATE-20261005.

## Recheck — 2026-10-05 — 7395768

- 공격 관점에서 확인한 실패 모드는 여러 IntersectionObserver 이벤트가 짧은 스크롤 구간에 몰릴 때 현재 연구 주제 상태 갱신이 반복되어 모바일 입력과 경쟁할 수 있는 것이었다. PR #267에서 pending topic을 requestAnimationFrame으로 합치고 React startTransition으로 비긴급 반영했다.
- UI 계약 v87, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RAF-20261005, E-UI-CONTRACT-RAF-20261005, E-DEPLOY-PIPELINE-RAF-20261005, E-LIVE-PUBLIC-RAF-20261005.

## Recheck — 2026-10-05 — 3007891

- 공격 관점에서 확인한 실패 모드는 연구 카드 IntersectionObserver가 현재 주제 표시를 일반 업데이트로 갱신해 빠른 모바일 스크롤과 같은 프레임에서 경쟁할 수 있는 것이었다. PR #265에서 startTransition으로 비긴급 상태임을 명시했다.
- UI 계약 v86, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-TRANSITION-20261005, E-UI-CONTRACT-TRANSITION-20261005, E-DEPLOY-PIPELINE-TRANSITION-20261005, E-LIVE-PUBLIC-TRANSITION-20261005.

## Recheck — 2026-10-05 — 8e1e335

- 공격 관점에서 확인한 실패 모드는 연구 지도 스크롤로 activeResearchTopicId가 바뀔 때 모든 정적 연구 glyph·프로필·도표가 다시 그려져 모바일 읽기 흐름이 무거워질 수 있는 것이었다. PR #263에서 세 정적 시각 컴포넌트를 memo 경계로 보호했다.
- UI 계약 v85, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MEMO-20261005, E-UI-CONTRACT-MEMO-20261005, E-DEPLOY-PIPELINE-MEMO-20261005, E-LIVE-PUBLIC-MEMO-20261005.

## Recheck — 2026-10-05 — 5519791

- 공격 관점에서 확인한 실패 모드는 연구 지도에서 활성 카드 테두리만 바뀌고 지도 중앙은 계속 GABA로 남아, 사용자가 선택한 주제와 아래 상세 카드의 연결을 놓치는 것이었다. PR #261에서 중앙에 현재 연구 주제 상태 라벨을 추가해 이 시각적 연결을 닫았다.
- UI 계약 v84, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MAP-CURRENT-20261005, E-UI-CONTRACT-MAP-CURRENT-20261005, E-DEPLOY-PIPELINE-MAP-CURRENT-20261005, E-LIVE-PUBLIC-MAP-CURRENT-20261005.

## Recheck — 2026-10-05 — efc6246

- 공격 관점에서 확인한 실패 모드는 모바일 연구 카드가 연구 대상·방법·측정 항목과 도표를 먼저 노출해 방문자가 핵심 관찰 결과를 놓치거나 늦게 읽는 것이었다. PR #259에서 제목 바로 아래에 `결과 한 줄`을 두고, 도표의 요약 중복을 제거해 결과 우선 읽기 순서를 고정했다.
- UI 계약 v83, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RESULT-FIRST-20261005, E-UI-CONTRACT-RESULT-FIRST-20261005, E-DEPLOY-PIPELINE-RESULT-FIRST-20261005, E-LIVE-PUBLIC-RESULT-FIRST-20261005.

## Recheck — 2026-10-05 — e48acaa

- 공격 관점에서 확인한 실패 모드는 시스템 reduced-motion 사용자가 영상 로딩 스피너·읽기 진행 전환·카드 전환의 시각 움직임을 계속 보는 것이었다. PR #257에서 전역 모션 비활성화 규칙을 추가해 이 경로를 닫았다.
- UI 계약 v82, typecheck, 127개 테스트, production build, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 공개 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-REDUCED-MOTION-20261005, E-UI-CONTRACT-REDUCED-MOTION-20261005, E-DEPLOY-PIPELINE-REDUCED-MOTION-20261005, E-LIVE-PUBLIC-REDUCED-MOTION-20261005.

## Recheck — 2026-10-05 — 7a111d8

- 공격 관점에서 확인한 배포 실패 모드는 TF pulse heartbeat 만료로 보호된 main 배포가 실행되지 않는 것이었다. PR #255는 공개 콘텐츠를 건드리지 않고 heartbeat 시각만 갱신했으며 freshness 검증과 safe execution을 통과했다.
- PR #255 필수 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 최신 공개본은 candidate 7a111d831fecfa42e74c0947ca4f40238c912e37, HTTP 200, STATIC, 71 bundle hashes, 제품 독립 공개 경계를 유지한다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-TF-PULSE-HEARTBEAT-20261005, E-DEPLOY-PIPELINE-TF-PULSE-HEARTBEAT-20261005, E-LIVE-PUBLIC-TF-PULSE-HEARTBEAT-20261005, E-RELEASE-STATUS-TF-PULSE-HEARTBEAT-20261005.

## Recheck — 2026-10-05 — c9b3eda

- 공격 관점에서 확인한 실패 모드는 스크롤을 맞추기 위한 `.guide-section-heading` 래퍼가 포커스 대상으로 선택되어 history·GABA란·연구 지도 같은 본문 장에서 제목부터 읽기가 이어지지 않는 것이었다. PR #254에서 실제 `aria-labelledby` 제목을 포커스하는 `getGuideFocusTarget`을 분리했다.
- UI 계약 v81, typecheck, 127개 테스트, production build, PR #254 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-GUIDE-HEADING-FOCUS-20261005, E-UI-CONTRACT-GUIDE-HEADING-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-HEADING-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-HEADING-FOCUS-20261005.

## Recheck — 2026-10-05 — d545013

- 공격 관점에서 확인한 실패 모드는 일반 장 메뉴나 직접 장 링크로 이동해도 화면만 바뀌고 제목 포커스가 남지 않아, 키보드·스크린리더 사용자가 선택 장의 읽기 시작점을 즉시 알기 어려운 것이었다. PR #253에서 히어로·본문·회복·최종 장 제목에 `tabIndex=-1`을 추가하고 메뉴 이동·hash 변경·직접 진입의 포커스 handoff를 보완했다.
- UI 계약 v80, typecheck, 127개 테스트, production build, PR #253 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-GUIDE-CHAPTER-FOCUS-20261005, E-UI-CONTRACT-GUIDE-CHAPTER-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-CHAPTER-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-CHAPTER-FOCUS-20261005.

## Recheck — 2026-10-05 — 13cb639

- 공격 관점에서 확인한 실패 모드는 연구 공유 링크를 직접 열거나 hash를 변경해도 화면만 이동하고 카드 제목에 포커스가 도착하지 않아, 키보드·스크린리더 사용자가 선택 연구의 읽기 시작점을 즉시 알기 어려운 것이었다. PR #252에서 초기 딥링크와 hash 변경 모두 선택 카드로 포커스를 넘겼다.
- UI 계약 v79, typecheck, 127개 테스트, production build, PR #252 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 공개 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-UI-CONTRACT-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-RESEARCH-DEEPLINK-FOCUS-20261005.

## Recheck — 2026-10-05 — 544ce7d

- 공격 관점에서 확인한 실패 모드는 연구 지도 버튼을 눌러 카드로 이동해도 포커스가 지도에 남아, 키보드·스크린리더 사용자가 선택한 연구의 제목과 결과를 바로 이어서 읽지 못하는 것이었다. PR #251에서 연구 카드에 `tabIndex=-1`과 고유 `aria-labelledby`를 추가하고 지도·다음 연구 이동 후 포커스를 카드로 넘겼다.
- UI 계약 v78, typecheck, 127개 테스트, production build, PR #251 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-GUIDE-RESEARCH-FOCUS-20261005, E-UI-CONTRACT-GUIDE-RESEARCH-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-RESEARCH-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-RESEARCH-FOCUS-20261005.

## Recheck — 2026-10-05 — b393393d

- 공격 관점에서 확인한 실패 모드는 본문으로 이동 링크가 화면을 스크롤하더라도 대상 `main` landmark에 포커스를 넘기지 못해, 키보드·보조기기 사용자가 본문 읽기를 이어가기 어려운 것이었다. PR #250에서 `main#guide-main`에 `tabIndex=-1`을 추가해 포커스 기준을 보완했다.
- UI 계약 v77, typecheck, 127개 테스트, production build, PR #250 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 브라우저·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-GUIDE-SKIP-FOCUS-20261005, E-UI-CONTRACT-GUIDE-SKIP-FOCUS-20261005, E-DEPLOY-PIPELINE-GUIDE-SKIP-FOCUS-20261005, E-LIVE-PUBLIC-GUIDE-SKIP-FOCUS-20261005.

## Recheck — 2026-10-05 — bd2adafd

- 공격 관점에서 확인한 실패 모드는 전문가 영상 query를 가진 상태에서 장 메뉴를 누르면 guide 경로와 선택 영상 맥락이 분리되어, 새로고침이나 공유 시 실제 읽는 장과 주소가 달라지는 것이었다. PR #249에서 공통 guide 주소 갱신기를 적용해 장 이동 시 이전 영상 query를 제거하고 전문가 영상 선택 시에는 선택 ID를 보존했다.
- UI 계약 v76, typecheck, 127개 테스트, production build, PR #249 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 URL 상태 변화의 브라우저별 렌더·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-GUIDE-ROUTE-CONTEXT-20261005, E-UI-CONTRACT-GUIDE-ROUTE-CONTEXT-20261005, E-DEPLOY-PIPELINE-GUIDE-ROUTE-CONTEXT-20261005, E-LIVE-PUBLIC-GUIDE-ROUTE-CONTEXT-20261005.

## Recheck — 2026-10-05 — 7e9adf5

- 공격 관점에서 확인한 실패 모드는 번호 없는 도입부가 본문 장 수에 포함되어 `01 · 발견`이 진행 레일에서 `02 / 13`으로 보이는 것이었다. PR #248에서 도입부를 `도입부`로 분리하고 본문 진행을 `01 / 12`로 정렬했다.
- UI 계약 v75, typecheck, 127개 테스트, production build, PR #248 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 진행 레일 렌더·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-READING-PROGRESS-NUMBERING-20261005, E-UI-CONTRACT-READING-PROGRESS-NUMBERING-20261005, E-DEPLOY-PIPELINE-READING-PROGRESS-NUMBERING-20261005, E-LIVE-PUBLIC-READING-PROGRESS-NUMBERING-20261005.

## Recheck — 2026-10-05 — 40c540b

- 공격 관점에서 확인한 실패 모드는 첫 도입부와 중간 자동 전환 카드가 모두 ‘수면과 회복’으로 표시되어 사용자가 읽기 진행의 현재 위치를 구분하기 어려운 것이었다. PR #247에서 중간 카드를 ‘회복의 고리’로 명확히 분리했다.
- UI 계약 v74, typecheck, 127개 테스트, production build, PR #247 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 읽기 레일 렌더·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RECOVERY-CONTEXT-20261005, E-UI-CONTRACT-RECOVERY-CONTEXT-20261005, E-DEPLOY-PIPELINE-RECOVERY-CONTEXT-20261005, E-LIVE-PUBLIC-RECOVERY-CONTEXT-20261005.

## Recheck — 2026-10-05 — 85b1179

- 공격 관점에서 확인한 실패 모드는 헤더의 ‘수면과 회복’ 메뉴가 첫 설명 브리지를 건너뛰고 뒤쪽 반복 카드로 이동해 도입부의 맥락이 끊기는 것이었다. PR #246에서 첫 브리지의 안정적인 앵커와 읽기 진행 항목을 추가하고 메뉴 도착점을 같은 장으로 정렬했다.
- UI 계약 v73, typecheck, 127개 테스트, production build, PR #246 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 딥링크 렌더·실기기 동작과 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-OPENING-BRIDGE-NAV-20261005, E-UI-CONTRACT-OPENING-BRIDGE-NAV-20261005, E-DEPLOY-PIPELINE-OPENING-BRIDGE-NAV-20261005, E-LIVE-PUBLIC-OPENING-BRIDGE-NAV-20261005.

## Recheck — 2026-10-05 — b3fcffb

- 공격 관점에서 확인한 실패 모드는 430px 이하 좁은 휴대폰의 절대 위치 헤더 컨트롤이 가로 안전영역 안쪽으로 이동하지 않아 메뉴·글자 크기·공유 조작이 가장자리와 겹칠 수 있는 것이었다. PR #245에서 오른쪽 안전영역을 컨트롤 간격을 보존한 채 반영하고, 공유 완료 토스트에는 좌우 안전영역을 명시했다.
- UI 계약 v72, typecheck, 127개 테스트, production build, PR #245 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 헤더 정렬·안전영역 렌더와 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-HEADER-SAFE-AREA-20261005, E-UI-CONTRACT-MOBILE-HEADER-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-MOBILE-HEADER-SAFE-AREA-20261005, E-LIVE-PUBLIC-MOBILE-HEADER-SAFE-AREA-20261005.

## Recheck — 2026-10-05 — 06d737f

- 공격 관점에서 확인한 실패 모드는 모바일 공유·복사 완료 토스트가 하단 홈 인디케이터와 겹쳐 사용자가 복사·공유 결과를 확인하지 못할 수 있는 것이었다. PR #244에서 700px 이하 토스트에 하단·좌우 안전영역을 반영했다.
- UI 계약 v71, typecheck, 127개 테스트, production build, PR #244 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 토스트 정렬·안전영역 렌더와 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-SHARE-TOAST-SAFE-AREA-20261005, E-UI-CONTRACT-SHARE-TOAST-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-SHARE-TOAST-SAFE-AREA-20261005, E-LIVE-PUBLIC-SHARE-TOAST-SAFE-AREA-20261005.

## Recheck — 2026-10-05 — 83715cc

- 공격 관점에서 확인한 실패 모드는 연구 지도에서 개별 카드를 선택했을 때 카드 상단이 고정 읽기 레일 아래에 도착하지 않아 연구 대상·결과가 가려질 수 있는 것이었다. PR #243에서 900px 이하와 700px 이하 연구 카드의 안전영역 스크롤 기준을 추가했다.
- UI 계약 v70, typecheck, 127개 테스트, production build, PR #243 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 연구 카드 정렬·안전영역 렌더와 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-UI-CONTRACT-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-RESEARCH-ANCHOR-SAFE-AREA-20261005, E-LIVE-PUBLIC-RESEARCH-ANCHOR-SAFE-AREA-20261005.

## Recheck — 2026-10-05 — 80436662

- 공격 관점에서 확인한 실패 모드는 701–900px 태블릿형 모바일 폭에서 헤더·메뉴·장 이동 기준과 안전영역, 키보드 건너뛰기 링크의 기준이 서로 달라 일부 콘텐츠가 가려질 수 있는 것이었다. PR #242에서 max-width 900px 안전영역 규칙과 메뉴 좌우 inset을 확장하고 700px 이하 장 이동 기준을 유지했다.
- UI 계약 v69, typecheck, 127개 테스트, production build, PR #242 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 태블릿·안전영역 렌더와 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-SAFE-AREA-TABLET-20261005, E-UI-CONTRACT-MOBILE-SAFE-AREA-TABLET-20261005, E-DEPLOY-PIPELINE-MOBILE-SAFE-AREA-TABLET-20261005, E-LIVE-PUBLIC-MOBILE-SAFE-AREA-TABLET-20261005.

## Recheck — 2026-10-05 — 74fc0300

- 공격 관점에서 확인한 실패 모드는 iPhone 상단 안전영역이 고정 헤더·읽기 진행 표시·모바일 메뉴·장 이동 기준과 겹쳐 제목이나 메뉴가 가려질 수 있는 것이었다. PR #241에서 viewport-fit=cover와 env(safe-area-inset-top) 보정을 추가했다.
- UI 계약 v68, typecheck, 127개 테스트, production build, PR #241 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright와 Safari/iOS/Android 실기기가 현재 실행 환경에 없어 실제 안전영역 렌더와 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-MOBILE-SAFE-AREA-20261005, E-UI-CONTRACT-MOBILE-SAFE-AREA-20261005, E-DEPLOY-PIPELINE-MOBILE-SAFE-AREA-20261005, E-LIVE-PUBLIC-MOBILE-SAFE-AREA-20261005.

## Recheck — 2026-10-05 — 9131138a

- 공격 관점에서 확인한 실패 모드는 전문가 영상 선택 카드가 전체 영상 중 현재 위치를 알려주지 않아, 갤러리에서 선택 상태를 빠르게 파악하기 어려운 것이었다. PR #240에서 주제·선택 즉시 재생·`01 / 09` 위치 정보를 한 줄로 정리하고 모바일 표시를 보강했다.
- UI 계약 v67, typecheck, 127개 테스트, production build, PR #240 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright가 현재 실행 환경에 없어 실제 브라우저·실기기·실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-INDEX-20261005, E-UI-CONTRACT-EXPERT-VIDEO-INDEX-20261005, E-DEPLOY-PIPELINE-EXPERT-VIDEO-INDEX-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-INDEX-20261005.

## Recheck — 2026-10-05 — 84897891

- 공격 관점에서 확인한 실패 모드는 전문가 영상 아래의 `이어서 읽기 → 수면 연구 → 연구 결과 → 출처 원문`이 실제 다음 섹션과 어긋나 독자를 잘못된 위치로 안내하는 것이었다. PR #239에서 `다음 장 · 연구를 읽는 기준 → 원문 출처`로 정렬하고 모바일 표시 계층을 보강했다.
- UI 계약 v66, typecheck, 127개 테스트, production build, PR #239 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright가 현재 실행 환경에 없어 실제 브라우저·실기기·실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-HANDOFF-20261005, E-UI-CONTRACT-EXPERT-VIDEO-HANDOFF-20261005, E-DEPLOY-PIPELINE-EXPERT-VIDEO-HANDOFF-20261005, E-LIVE-PUBLIC-EXPERT-VIDEO-HANDOFF-20261005.

## Recheck — 2026-10-05 — 0e7836e

- 공격 관점에서 확인한 실패 모드는 연구 지도와 아래 카드 사이의 이동 의도가 처음 보는 독자에게 보이지 않는 것이었다. PR #238에서 지도 버튼에 안내 설명을 연결하고, 지도 아래에 `주제를 선택하면 아래 연구 카드의 대상·결과·해석으로 바로 이어집니다`라는 전환 문장을 추가했다.
- UI 계약 v65, typecheck, 127개 테스트, production build, PR #238 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright가 현재 실행 환경에 없어 실제 브라우저·실기기·실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-CUE-20261005, E-UI-CONTRACT-RESEARCH-MAP-CUE-20261005, E-DEPLOY-PIPELINE-RESEARCH-MAP-CUE-20261005, E-LIVE-PUBLIC-RESEARCH-MAP-CUE-20261005.

## Recheck — 2026-10-05 — 13004052

- 공격 관점에서 확인한 실패 모드는 연구 카드 상단의 색상 라벨이 무엇을 의미하는지 즉시 알기 어려운 것이었다. PR #237에서 `연구 범위` 표식을 명시하고, 모바일에서 범위·연구 대상·세부 영역을 단일 열로 분리했다.
- UI 계약 v64, typecheck, 127개 테스트, production build, PR #237 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright가 현재 실행 환경에 없어 실제 브라우저·실기기·실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RESEARCH-SCOPE-CONTEXT-20261005, E-UI-CONTRACT-RESEARCH-SCOPE-CONTEXT-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCOPE-CONTEXT-20261005, E-LIVE-PUBLIC-RESEARCH-SCOPE-CONTEXT-20261005.

## Recheck — 2026-10-05 — af43e264

- 공격 관점에서 확인한 실패 모드는 연구 범위 라벨이 작거나 줄바꿈되지 않아 사용자가 연구 대상·방법·측정 맥락을 결과보다 먼저 읽지 못하는 것이었다. PR #236에서 데스크톱·모바일의 크기·간격·줄바꿈을 보강했다.
- UI 계약 v63, typecheck, 127개 테스트, production build, PR #236 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright가 현재 실행 환경에 없어 실제 브라우저·실기기·실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RESEARCH-SCOPE-READABILITY-20261005, E-UI-CONTRACT-RESEARCH-SCOPE-READABILITY-20261005, E-DEPLOY-PIPELINE-RESEARCH-SCOPE-READABILITY-20261005, E-LIVE-PUBLIC-RESEARCH-SCOPE-READABILITY-20261005.

## Recheck — 2026-10-05 — c5a60fe

- 공격 관점에서 확인한 실패 모드는 연구 카드의 대상·방법·측정 정보와 핵심 결과 라벨이 작아 사용자가 연구 맥락과 결론을 한 번에 읽지 못하는 것이었다. PR #235에서 두 정보층의 크기·간격을 데스크톱·모바일에 맞춰 보강했다.
- UI 계약 v62, typecheck, 127개 테스트, production build, PR #235 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright가 현재 실행 환경에 없어 실제 브라우저·실기기·실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 PASS_WITH_CONDITIONS를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-LOCAL-BUILD-RESEARCH-PROFILE-READABILITY-20261005, E-UI-CONTRACT-RESEARCH-PROFILE-READABILITY-20261005, E-DEPLOY-PIPELINE-RESEARCH-PROFILE-READABILITY-20261005, E-LIVE-PUBLIC-RESEARCH-PROFILE-READABILITY-20261005.

## Recheck — 2026-10-05 — 1226c06

- 공격 관점에서 확인한 실패 모드는 핵심 GABA 결과 문구가 비교 막대보다 작아 사용자가 먼저 읽지 못하는 것이었다. 결과 문구를 모바일·데스크톱에서 독립적으로 읽히는 크기와 시각 계층으로 보강하고 비교 레인은 근거로 유지했다.
- UI 계약 v61, typecheck, 127개 테스트, production build, PR #234 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright가 현재 실행 환경에 없어 실제 브라우저·실기기·실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 `PASS_WITH_CONDITIONS`를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-RESEARCH-VERDICT-READABILITY-20261005`, `E-UI-CONTRACT-RESEARCH-VERDICT-READABILITY-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-VERDICT-READABILITY-20261005`, `E-LIVE-PUBLIC-RESEARCH-VERDICT-READABILITY-20261005`.

## Recheck — 2026-10-05 — 4036d0d

- 공격 관점에서 확인한 실패 모드는 연구 비교 도표를 읽을 때 사용자가 두 조건의 막대를 먼저 비교해야 GABA 결과의 방향을 파악할 수 있다는 점이었다. 각 지표에 `GABA 결과` 요약을 먼저 배치하고 두 조건 레인은 근거로 유지했다.
- UI 계약 v60, typecheck, 127개 테스트, production build, PR #233 checks, main Pages 배포·라이브 smoke·release status와 라이브 validator가 통과했다. 연구 수치·출처 데이터와 제품 독립 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright가 현재 실행 환경에 없어 실제 브라우저·실기기·실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 `PASS_WITH_CONDITIONS`를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-RESEARCH-OUTCOME-VERDICT-20261005`, `E-UI-CONTRACT-RESEARCH-OUTCOME-VERDICT-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-OUTCOME-VERDICT-20261005`, `E-LIVE-PUBLIC-RESEARCH-OUTCOME-VERDICT-20261005`.

## Recheck — 2026-10-05 — 647df28

- 공격 관점에서 확인한 실패 모드는 모바일 연구 확장 지도의 주제 버튼·아이콘이 작아 고령 사용자가 연구 영역을 식별하거나 누르기 어려워지는 것이었다. 표준 모바일 80px·82px 버튼과 40px 아이콘, 350px 이하 76px·78px·38px 보정으로 보완하고 v59 UI 계약을 추가했다.
- UI 계약, typecheck, 127개 테스트, production build, PR #232 checks, main Pages 배포·라이브 smoke·release status가 통과했다. 코드 배포 `8ba4a76` 이후 NAVI 기록 동기화가 완료됐고, 동기화 시점 라이브 validator candidate `647df28185305e61915254693a052a6bc86c6ac8`와 공개 데이터·제품 독립 경계를 일치 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright가 현재 실행 환경에 없어 실제 브라우저·실기기 터치와 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 `PASS_WITH_CONDITIONS`를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-TOUCH-20261005`, `E-UI-CONTRACT-RESEARCH-MAP-TOUCH-20261005`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-TOUCH-20261005`, `E-LIVE-PUBLIC-RESEARCH-MAP-TOUCH-20261005`.

## Recheck — 2026-10-05 — 3510d2c

- 좁은 모바일에서 14단계 회복 지도가 7열로 압축되어 단계 식별과 조작 공간이 작아질 수 있는 잔여 결함을 확인했고, 6열·44px 최소 터치 영역·마지막 두 단계 중앙 정렬로 보완했다.
- UI 계약, typecheck, 127개 테스트, production build, PR #231 checks, main Pages 배포·라이브 smoke·release status가 통과했다. 라이브 validator도 candidate `3510d2c`와 공개 데이터·제품 독립 경계를 일치 확인했다.
- 새 CRITICAL/MAJOR 결함은 확인하지 않았다. 다만 Browser/Playwright가 현재 실행 환경에 없어 실제 브라우저·실기기 터치와 실제 고령 사용자 이해도는 증명하지 않았으므로 결과는 `PASS_WITH_CONDITIONS`를 유지한다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-TOUCH-20261005`, `E-UI-CONTRACT-RECOVERY-MAP-TOUCH-20261005`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-TOUCH-20261005`, `E-LIVE-PUBLIC-RECOVERY-MAP-TOUCH-20261005`.

## 공유·연구 복사 버튼 모바일 터치 영역 명시 — ca65f61 — 2026-10-05

- 공격 관점에서 확인한 실패 모드는 사업자용 공유 문장과 연구 결과 복사 동작의 개별 CSS 높이가 작게 남아 모바일·고령 사용자 조작을 어렵게 만드는 것이었다. 세 동작을 44px 이상으로 통일하고 UI 계약으로 재발을 막았다.
- PR #230 checks, main workflow `37214622993`, Pages 배포, 라이브 smoke, release status와 공개 validator가 성공했다. Worker는 STATIC_ONLY이므로 실행하지 않았다.
- 잔여 위험은 Browser 플러그인·Playwright 부재에 따른 실제 브라우저·실기기 터치, 고령 사용자 독해성, 독립 과학·규제 감수다. 결과는 PASS_WITH_CONDITIONS이며 NAVI 완료 게이트는 NOT_READY다.

증적: `E-LOCAL-BUILD-SHARE-CONTROLS-20261005`, `E-UI-CONTRACT-SHARE-CONTROLS-20261005`, `E-DEPLOY-PIPELINE-SHARE-CONTROLS-20261005`, `E-LIVE-PUBLIC-SHARE-CONTROLS-20261005`.

## 첫 화면 히어로 문구 최소화 — 2e31d60 — 2026-10-05

- 공격 관점에서 확인한 실패 모드는 첫 화면의 프리타이틀과 메인 헤드라인이 같은 의미를 반복해 모바일 첫 시선에서 핵심 메시지의 대비를 낮추는 것이었다. 프리타이틀을 제거하고 제목 시작 위치를 보정했으며 UI 계약으로 재발을 막았다.
- PR #229 checks, main workflow `37213839261`, Pages 배포, live smoke, release status와 공개 validator가 성공했다. Worker는 STATIC_ONLY이므로 실행하지 않았다.
- 잔여 위험은 Browser 플러그인·Playwright 부재에 따른 실제 브라우저·실기기 시각 검증, 고령 사용자 독해성, 독립 과학·규제 감수다. 결과는 PASS_WITH_CONDITIONS이며 NAVI 완료 게이트는 NOT_READY다.

증적: `E-LOCAL-BUILD-MINIMAL-HERO-20261005`, `E-UI-CONTRACT-MINIMAL-HERO-20261005`, `E-DEPLOY-PIPELINE-MINIMAL-HERO-20261005`, `E-LIVE-PUBLIC-MINIMAL-HERO-20261005`.

## 전문가 영상 모바일 터치 영역 고도화 — 0b5a2a1 — 2026-10-05

- 공격 관점에서 확인한 실패 모드는 전문가 영상의 선택 공유·주제 필터가 작은 명시적 높이로 남아 모바일·고령 사용자 탐색을 어렵게 만드는 것이었다. 두 컨트롤을 44px 이상으로 통일하고 UI 계약으로 재발을 막았다.
- PR #228 checks, main workflow `37212827380`, Pages 배포, live smoke, release status와 공개 validator가 성공했다. Worker는 STATIC_ONLY이므로 실행하지 않았다.
- 잔여 위험은 Browser 플러그인·Playwright 부재에 따른 실제 브라우저·실기기 터치, 고령 사용자 독해성, 독립 과학·규제 감수다. 결과는 PASS_WITH_CONDITIONS이며 NAVI 완료 게이트는 NOT_READY다.

증적: `E-LOCAL-BUILD-VIDEO-CONTROLS-20261005`, `E-UI-CONTRACT-VIDEO-CONTROLS-20261005`, `E-DEPLOY-PIPELINE-VIDEO-CONTROLS-20261005`, `E-LIVE-PUBLIC-VIDEO-CONTROLS-20261005`.

## 공개 공유 카드 분리 — 0e93fb3 — 2026-10-05

- 확인된 결함은 공개 안내서 root·guide·research의 소셜 미리보기가 GABA 안내서보다 제품·하루리듬 카드로 인식될 수 있었던 점이다. 새 1200×630 JPEG와 정적·런타임 메타데이터 계약으로 경계를 보강했다.
- PR #227 필수 checks, main workflow `37211921700`, Pages 배포, live smoke, release status와 공개 validator가 성공했다. 공유 카드 변경은 메타데이터·시각 자산 범위에 한정됐고 연구 수치·과학 주장은 변경하지 않았다.
- 잔여 위험은 소셜 플랫폼별 캐시 갱신 시간, Browser 플러그인·Safari/iOS/Android 실기기 검증, 실제 고령 사용자 독해성, 독립 과학·규제 감수다. 카드 이미지가 제품 효능을 암시하지 않도록 `공개 과학 정보 · 제품과 무관한 GABA 안내서` 문구를 유지했다.
- 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-SOCIAL-PREVIEW-20261005`, `E-UI-CONTRACT-SOCIAL-PREVIEW-20261005`, `E-DEPLOY-PIPELINE-SOCIAL-PREVIEW-20261005`, `E-LIVE-PUBLIC-SOCIAL-PREVIEW-20261005`.

## 큰 글씨 읽기 모드 가독성 강화 — 5f4f6c7 — 2026-10-04

- 공격 관점에서 기존 확대 폭이 고령 사용자에게 충분한지와 모바일 도표 방향 문구가 확대 상태에서 잘리는지를 점검했다. 본문·연구 도표를 desktop 12%, mobile 10% 확대하고 방향 문구를 줄바꿈하도록 해 해당 실패 모드를 보완했다.
- 로컬 UI contract·typecheck·127 tests·production build/performance, PR #226 checks, main workflow `37210637085`의 Pages·라이브 smoke·release status를 모두 확인했다. Worker는 STATIC_ONLY이므로 실행하지 않았다.
- 공개 URL validator는 candidate `5f4f6c7cd8d429da85e2f93f3beaf29571e437fa`, HTTP 200, STATIC, 70개 bundle hash, 12개 claim, 6개 master record, 6개 share page를 확인했다.
- 브라우저 플러그인과 Playwright가 없어 실제 브라우저·실기기·고령 사용자 독해성은 확인 범위 밖이다. 결과는 PASS_WITH_CONDITIONS이며 NAVI 완료 게이트는 NOT_READY다.

증적: `E-LOCAL-BUILD-LARGE-TEXT-20261004`, `E-UI-CONTRACT-LARGE-TEXT-20261004`, `E-DEPLOY-PIPELINE-LARGE-TEXT-20261004`, `E-LIVE-PUBLIC-LARGE-TEXT-20261004`.

## 좁은 모바일 헤더 충돌 방지 — 5215ab5 — 2026-10-04

- 공격 관점에서 좁은 화면의 고정 컨트롤이 긴 로고와 겹쳐 메뉴 접근성과 브랜드 식별성을 동시에 해칠 수 있는 실패 모드를 확인했다. 381–430px 구간의 로고 폭을 컨트롤 레일보다 작게 제한하고 UI 계약으로 재발을 막았다.
- 로컬 typecheck·UI contract·127 tests·production build/performance, PR #225 checks, main workflow `37210073919`의 Pages·라이브 smoke·release status를 모두 확인했다. Worker는 STATIC_ONLY이므로 실행하지 않았다.
- 공개 URL validator는 candidate `5215ab5758e0e9e849ed634243e54c6e34c0e7cd`, HTTP 200, STATIC, 70개 bundle hash, 12개 claim, 6개 master record, 6개 share page를 확인했다.
- 브라우저 플러그인과 Playwright가 없어 실제 모바일 레이아웃·터치·고령 사용자 사용성은 확인 범위 밖이다. 결과는 PASS_WITH_CONDITIONS이며 NAVI 완료 게이트는 NOT_READY다.

증적: `E-LOCAL-BUILD-NARROW-HEADER-20261004`, `E-UI-CONTRACT-NARROW-HEADER-20261004`, `E-DEPLOY-PIPELINE-NARROW-HEADER-20261004`, `E-LIVE-PUBLIC-NARROW-HEADER-20261004`.

## 연구 카드 원문 보기 링크 가독성 고도화 — 6248808 — 2026-10-04

- 공격 관점에서 확인한 개선 지점은 연구 출처의 발견성이다. 출처명과 `원문 보기` 액션이 같은 카드 안에서 분리되어 있고, 링크 전체가 44px 터치 영역과 명시적 포커스 스타일을 갖는다.
- 로컬 typecheck·UI contract·127 tests·production build/performance, PR #224 checks, main workflow `37209426168`의 Pages·라이브 smoke·release status를 모두 확인했다. Worker는 STATIC_ONLY이므로 실행하지 않았다.
- 공개 URL validator는 candidate `6248808a56db53bd1a5d5fb3b822f2d58a8fc3bf`, HTTP 200, STATIC, 70개 bundle hash, 12개 claim, 6개 master record, 6개 share page를 확인했다.
- 브라우저 플러그인과 Playwright가 없어 실제 모바일 탭 동작, 외부 원문 로딩, 실기기·고령 사용자 사용성은 확인 범위 밖이다. 결과는 PASS_WITH_CONDITIONS이며 NAVI 완료 게이트는 NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-SOURCE-ACTION-20261004`, `E-UI-CONTRACT-RESEARCH-SOURCE-ACTION-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-SOURCE-ACTION-20261004`, `E-LIVE-PUBLIC-RESEARCH-SOURCE-ACTION-20261004`.

## 사업자용 전체 공유 복사 상태 재검증 — 94bcd16 — 2026-10-04

- 5문장 전체 복사 성공을 전역 토스트만으로 알리면 사업자가 버튼 상태를 다시 확인하기 어려운 실패 모드를 확인했다. PR #223에서 전체 복사 버튼 자체를 `복사 완료`로 표시하고 2.4초 후 원상태로 돌아가도록 보강했다.
- PR #223 checks, 로컬 UI 계약·typecheck·127 tests·production build/performance, main workflow `37208889644`, live validator HTTP 200·STATIC를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인과 Playwright 부재로 실제 클립보드 권한·모바일 공유 UI는 직접 증명하지 못했으며 RT-001·RT-002·RT-003은 계속 OPEN이다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-FULL-SHARE-COPY-ACK-20261004`, `E-UI-CONTRACT-FULL-SHARE-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-FULL-SHARE-COPY-ACK-20261004`, `E-LIVE-PUBLIC-FULL-SHARE-COPY-ACK-20261004`.

## 사업자용 공유 문장 개별 복사 상태 재검증 — 5aa9f05 — 2026-10-04

- 사업자용 공유 문장을 복사한 뒤 전역 토스트만으로는 처리된 문장을 구분하기 어렵다는 실패 모드를 확인했다. PR #222에서 선택한 카드만 `복사 완료`로 표시하고 2.4초 후 원상태로 돌아가도록 보강했다.
- PR #222 checks, 로컬 UI 계약·typecheck·127 tests·production build/performance, main workflow `37208090180`, live validator HTTP 200·STATIC를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인과 Playwright 부재로 실제 클립보드 권한·모바일 공유 UI는 직접 증명하지 못했으며 RT-001·RT-002·RT-003은 계속 OPEN이다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-SHARE-LINE-COPY-ACK-20261004`, `E-UI-CONTRACT-SHARE-LINE-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-SHARE-LINE-COPY-ACK-20261004`, `E-LIVE-PUBLIC-SHARE-LINE-COPY-ACK-20261004`.

## 연구 카드 복사 상태 및 배포 freshness 재검증 — bb5e260 — 2026-10-04

- 연구 카드에서 복사 성공을 전역 토스트만으로 알리면 사업자가 어느 카드의 결과·출처를 가져갔는지 즉시 확인하기 어려운 실패 모드를 확인했다. PR #220에서 해당 카드만 ‘복사 완료’로 표시하도록 보강했다.
- PR #220 checks, 로컬 UI 계약·typecheck·127 tests·production build/performance, TF pulse run `37207031442`, heartbeat PR #221 checks와 main workflow `37207209603`, live validator HTTP 200·STATIC를 확인했다. 첫 배포 실패는 UI 회귀가 아니라 487분으로 만료된 TF heartbeat freshness 게이트였다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. Browser 플러그인과 Playwright 부재로 실제 클립보드 권한·모바일 공유 UI는 직접 증명하지 못했으며 RT-001·RT-002·RT-003은 계속 OPEN이다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-COPY-ACK-20261004`, `E-UI-CONTRACT-RESEARCH-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-COPY-ACK-20261004`, `E-LIVE-PUBLIC-RESEARCH-COPY-ACK-20261004`, `E-TF-PULSE-REFRESH-20261004`.

## 연구 결과 공유 문맥 재검증 — 348f9b6 — 2026-10-04

- 연구 카드에서 결과만 복사하면 대상·방법·출처가 빠져 공유 과정에서 의미가 축약될 수 있는 실패 모드를 확인했다. PR #219에서 연구 대상·방법, 관찰 결과, 연구 범위, 출처, 연구 딥링크를 하나의 복사 블록으로 묶고 사업자용 5문장 전체 복사에도 공개 안내서 링크를 추가했다.
- UI 계약·typecheck·127개 테스트·production build/performance와 PR #219 checks, main workflow `37206009673`, live validator HTTP 200·STATIC를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았으며 결과는 PASS_WITH_CONDITIONS다.
- Browser 플러그인과 Playwright 부재로 실제 클립보드 권한·모바일 공유 UI는 브라우저 런타임에서 직접 증명하지 못했다. RT-001·RT-002·RT-003은 계속 OPEN이고 NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-SHARE-CONTEXT-20261004`, `E-UI-CONTRACT-RESEARCH-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-RESEARCH-SHARE-CONTEXT-20261004`.

## 전문가 영상 공유 링크 주제 필터 재검증 — 597bf37 — 2026-10-04

- 유효한 전문가 영상 공유 링크가 선택 영상·초기 재생 상태뿐 아니라 해당 영상의 주제 필터까지 복원하도록 보강되었다. 직접 진입한 독자는 선택 영상과 관련 영상 목록을 한 화면의 같은 맥락에서 이해할 수 있다.
- UI 계약·typecheck·127개 테스트·production build/성능 예산과 PR #218 checks, main workflow `37204949680`, live validator HTTP 200·STATIC를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았으며 결과는 PASS_WITH_CONDITIONS다.
- Browser 플러그인과 Playwright 부재로 실제 iframe 재생과 필터 전환은 브라우저 런타임에서 직접 증명하지 못했다. RT-001·RT-002·RT-003은 계속 OPEN이고 NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-CONTEXT-20261004`, `E-UI-CONTRACT-EXPERT-VIDEO-CONTEXT-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-CONTEXT-20261004`.

## 전문가 영상 공유 링크 직접 재생 재검증 — 2305b5b — 2026-10-04

- 유효한 전문가 영상 공유 링크가 선택 영상 ID와 초기 재생 상태를 함께 복원하도록 보강되었다. 사용자는 직접 진입 후 영상을 다시 선택하지 않고 바로 재생 흐름으로 들어간다.
- UI 계약·typecheck·127개 테스트·production build/성능 예산과 PR #217 checks, main workflow `37203920793`, live validator HTTP 200·STATIC를 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았으며 결과는 PASS_WITH_CONDITIONS다.
- Browser 플러그인과 Playwright 부재로 실제 iframe 재생 여부는 브라우저 런타임에서 직접 증명하지 못했다. RT-001·RT-002·RT-003은 계속 OPEN이고 NAVI는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-DEEPLINK-20261004`, `E-UI-CONTRACT-EXPERT-VIDEO-DEEPLINK-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-DEEPLINK-20261004`.

## 공유·직접 진입 해시와 모바일 폭 변경 정렬 재검증 — cf893f8 — 2026-10-04

- 320px·390px의 공유·직접 진입 링크에서 lazy 레이아웃이 안정된 뒤 제목을 다시 고정 헤더와 읽기 레일 아래로 정렬하고, 같은 페이지의 뷰포트 폭 변경에도 기준선을 재계산한다. 사용자 스크롤·터치·키보드 입력이 시작되면 대기 재정렬을 취소한다.
- Chrome DevTools fallback 측정에서 두 폭의 제목 top이 약 115px, 읽기 레일 bottom이 105px로 유지되었고 가로 넘침·page error·console exception은 확인되지 않았다. 새 CRITICAL/MAJOR 결함은 확인되지 않았으며 결과는 PASS_WITH_CONDITIONS다.
- Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 자동화로 닫히지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이며 NAVI는 USER_DECISION / NOT_READY다.

증적: `E-CDP-DEEP-LINK-REALIGN-20261004`, `E-LIVE-PUBLIC-DEEP-LINK-REALIGN-20261004`.

## 초소형 모바일 회복 경로 마지막 행 공개 재검증 — a13e82f — 2026-10-04

- 320px에서 14단계 경로의 마지막 두 단계가 3·4열에 중앙 정렬되어 6·6·2 흐름의 끝맺음이 균형 있게 보인다. 가로 넘침과 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 결과는 PASS_WITH_CONDITIONS다. Browser 플러그인 부재로 Chrome DevTools fallback 기준을 사용했으며 Safari/iOS/Android 실기기와 실제 고령 사용자 독해성은 자동화만으로 닫을 수 없다. RT-001·RT-002·RT-003은 계속 OPEN이고 NAVI는 USER_DECISION / NOT_READY다.
- 중앙 정렬은 시각적 완성도를 높이지만, 실제 사용자 이해도나 독립 과학·규제 감수를 대체하지 않는다.

증적: `E-CDP-NARROW-RECOVERY-END-20261004`, `E-LIVE-PUBLIC-NARROW-RECOVERY-END-20261004`.

## 초소형 모바일 회복 경로 공개 재검증 — 5bf2921 — 2026-10-04

- 320px에서는 14단계 회복 경로가 6·6·2의 3행으로 표시되고 약 42.5px 단계 버튼을 확보했으며, 390px에서는 7·7 흐름을 유지했다. 가로 넘침과 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 결과는 PASS_WITH_CONDITIONS다. Browser 플러그인 부재로 Chrome DevTools fallback을 사용했으며 Safari/iOS/Android 실기기와 실제 고령 사용자 독해성은 자동화만으로 닫을 수 없다. RT-001·RT-002·RT-003은 계속 OPEN이고 NAVI는 USER_DECISION / NOT_READY다.
- 회복 경로 크기 보강은 화면 가독성과 터치 여유를 개선하지만, 실제 고령 사용자 이해도나 독립 과학·규제 감수를 대체하지 않는다.

증적: `E-CDP-NARROW-RECOVERY-MAP-20261004`, `E-LIVE-PUBLIC-NARROW-RECOVERY-MAP-20261004`.

## 태블릿 읽기 진행 레일 기준선 정렬 공개 재검증 — fc07f6f — 2026-10-04

- 768px 공개 화면에서 헤더와 진행 레일이 모두 70px 기준선에 맞고, 390px에서도 같은 레일 구조가 유지됐다. 두 화면 모두 가로 넘침·page error·console error가 없었다.
- RT-001·RT-002·RT-003은 계속 OPEN이며 이번 보정은 레이아웃 정렬을 개선했을 뿐 Safari/iOS/Android·실제 고령 사용자·독립 과학·규제 검토를 대체하지 않는다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-CDP-TABLET-PROGRESS-ALIGN-20261004, E-LIVE-PUBLIC-TABLET-PROGRESS-ALIGN-20261004.

## 태블릿 히어로 공개 안내 패널 보강 공개 재검증 — c0b08ee — 2026-10-04

- 768px·820px에서 자연 이미지 위에 있던 공개 안내 고지문과 읽기 레일이 반투명 패널로 분리되고, 패널 폭·가로폭·오류 기준이 유지됐다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS다. Chrome DevTools fallback만으로 Safari/iOS/Android 실기기와 실제 고령 사용자 이해도를 닫을 수 없다.
- RT-001·RT-002·RT-003은 계속 OPEN이며 NAVI는 USER_DECISION / NOT_READY다. 패널 보강은 시각적 가독성을 높였지만 독립 과학·규제 감수와 실제 사용자 이해도 검증을 대체하지 않는다.

증적: E-CDP-TABLET-HERO-DISCLOSURE-20261004, E-LIVE-PUBLIC-TABLET-HERO-DISCLOSURE-20261004.

## 모바일 큰 글씨 제어 라벨 보강 공개 재검증 — 37147625 — 2026-10-04

- 390px에서 큰 글씨 기능명이 표시되고 메뉴·공유 버튼과 충돌하지 않으며, 320px에서는 컴팩트 제어로 전환되어 가로 넘침이 재현되지 않았다. 큰 글씨 전환 후에도 헤더 폭과 상태 라벨이 유지됐다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS다. Chrome DevTools fallback만으로 Safari/iOS/Android 실기기와 실제 고령 사용자 이해도를 닫을 수 없다.
- RT-001·RT-002·RT-003은 계속 OPEN이며 NAVI는 USER_DECISION / NOT_READY다. 기능 라벨 개선은 화면 상태를 명확하게 했지만 독립 과학·규제 감수와 사용자 이해도 검증을 대체하지 않는다.

증적: E-CDP-MOBILE-TYPE-CONTROL-20261004, E-LIVE-PUBLIC-MOBILE-TYPE-CONTROL-20261004.

## 전문가 영상 갤러리 공개 화면 재검증 — 73b32d2 — 2026-10-04

- 390px·1440px에서 선택 영상·주제 필터·썸네일 카드·원본 링크의 정보 계층이 유지되고 가로 넘침·page error·console error는 재현되지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS다. Chromium fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도와 영상별 권리·독립 과학 검토를 닫을 수 없다.
- RT-001·RT-002·RT-003은 계속 OPEN이며 NAVI는 USER_DECISION / NOT_READY다.

증적: E-CDP-VIDEO-GALLERY-QA-20261004, E-LIVE-PUBLIC-VIDEO-GALLERY-QA-20261004.

## 좁은 모바일 연구 결과 카드 가독성 보강 공개 배포 레드팀 재검증 — 53a7c41 — 2026-10-04

- 320px에서 연구 결과 카드가 지표명 → 결과값 → 방향 그래픽 순서로 분리되고, 390px에서도 카드 흐름과 방향 그래픽이 유지되는지 확인했다. 가로 넘침·page error·console error는 재현되지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS다. 자동화와 Chromium fallback만으로 Safari/iOS/Android 실기기와 실제 고령 사용자 이해도를 닫을 수 없다.
- RT-001·RT-002·RT-003은 계속 OPEN이며 NAVI는 USER_DECISION / NOT_READY다.

증적: E-CDP-NARROW-SIGNAL-LABEL-20261004, E-LIVE-PUBLIC-NARROW-SIGNAL-LABEL-20261004.

## 성장·면역 연구 방향 그래픽 보강 공개 배포 레드팀 재검증 — 074822b — 2026-10-04

- 390px·1440px에서 성장호르몬 카드 4개와 면역 카드 3개의 상승·하강 방향 그래픽, 자연어 결과, 비정량 안내가 함께 보이고 가로 넘침은 재현되지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS다. 방향 그래픽은 효과 크기를 뜻하지 않지만 실제 고령 사용자 이해도에 대한 정성 검증은 아직 없다.
- Safari/iOS/Android 실기기·독립 과학·규제 감수는 자동화 검증으로 닫을 수 없으며 RT-001·RT-002·RT-003은 계속 OPEN이다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-CDP-DIRECTION-GRAPHIC-20261004, E-LIVE-PUBLIC-DIRECTION-GRAPHIC-20261004.

## 비교 연구 결과 미터 보강 공개 배포 레드팀 재검증 — 1cc9440 — 2026-10-04

- 390px·1440px에서 비교 카드의 조건별 질적 미터와 `더 많이·덜 증가/감소` 문구가 함께 보이고, 도표 하단의 비정량 비교 경계가 유지되는지 확인했다. 가로 넘침은 재현되지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS다. 미터는 효과 크기를 뜻하지 않지만 실제 고령 사용자 이해도에 대한 정성 검증은 아직 없다.
- RT-001·RT-002·RT-003은 계속 OPEN이며 NAVI는 USER_DECISION / NOT_READY다.

증적: E-CDP-QUALITATIVE-METER-20261004, E-LIVE-PUBLIC-QUALITATIVE-METER-20261004.

## 연구 확장 지도 시작점·딥링크 방향 보강 공개 배포 레드팀 재검증 — c747f67 — 2026-10-04

- 390px·1440px에서 연구 지도 진입 시 `인지`가 활성화되고, `#research-skin` 딥링크에서는 피부 지도·카드·읽기 진행명이 일치하는지 확인했다. 가로 넘침·page error·console error는 재현되지 않았으며 지도와 상세 결과의 방향이 유지됐다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS다. 자동화와 Chromium fallback만으로 Safari/iOS/Android 실기기와 실제 고령 사용자 이해도를 닫을 수 없다.
- RT-001·RT-002·RT-003은 계속 OPEN이며 NAVI는 USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-RESEARCH-MAP-ENTRY-20261004, E-LIVE-PUBLIC-RESEARCH-MAP-ENTRY-20261004.

## 수면·회복 14단계 현재 위치 표시 공개 배포 레드팀 재검증 — 0641f60 — 2026-10-04

- 390px·1440px에서 14단계 아이콘 지도 위 현재 단계명·진행 번호가 표시되고, 14번째 단계를 선택하면 지도 표식·카드 제목·`14 / 14`가 함께 바뀌는지 확인했다. 가로 넘침·page error·console error는 재현되지 않았으며 기존 자동 전환 카드 흐름도 유지됐다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS다. 자동화와 Chromium fallback만으로 Safari/iOS/Android 실기기와 실제 고령 사용자 이해도를 닫을 수 없다.
- RT-001·RT-002·RT-003은 계속 OPEN이며 NAVI는 USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-RECOVERY-MAP-STAGE-CUE-20261004, E-LIVE-PUBLIC-RECOVERY-MAP-STAGE-CUE-20261004.

## 사업자용 5문장 전체 복사 공개 배포 레드팀 재검증 — 58bbc70 — 2026-10-04

- 모바일·데스크톱에서 사업자용 활용 자료의 `전체 복사` 버튼이 발견되고, 클릭 뒤 성공 상태가 표시되는지 확인했다. 5개 문장 카드 펼치기와 기존 문장별 복사 흐름도 유지됐다.
- 390px·1440px에서 가로 넘침·page error·console error는 재현되지 않았고, 기존 인지 연구 카드의 다음 연구 → 피부 연구 이동도 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았으며 결과는 PASS_WITH_CONDITIONS다.
- 자동화와 Chromium fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001·RT-002·RT-003은 계속 OPEN이며 NAVI는 USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-BUSINESS-COPY-ALL-20261004, E-LIVE-PUBLIC-BUSINESS-COPY-ALL-20261004.

## 활용에서 발효와 안전으로 이어지는 편집 전환 레드팀 재검증 — 8d493d3 — 2026-10-04

- 국내외 활용 장의 마지막 카드 다음에 편집 전환과 발효와 안전 장이 바로 이어지는지 390px·1440px에서 확인했다. 모바일은 줄바꿈 가능한 세로 흐름, 데스크톱은 수평 handoff로 표시되며 가로 넘침·page error·console error는 재현되지 않았다.
- 기존 인지 연구 카드의 다음 연구 버튼 → 피부 연구 카드 이동도 재현해 새 전환이 기존 연구 탐색 흐름을 깨지 않음을 확인했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS다.
- 자동화와 Chromium fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001·RT-002·RT-003은 계속 OPEN이며 NAVI는 USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-APPLICATION-FERMENTATION-HANDOFF-20261004, E-LIVE-PUBLIC-APPLICATION-FERMENTATION-HANDOFF-20261004.

## 사업자용 GABA 공유 패키지 공개 배포 레드팀 재검증 — 02f8fac — 2026-10-04

- 마지막 장에서 사업자용 안내가 접힌 details 안에만 남아 발견되지 않는 경로를 보완한 뒤, 모바일·데스크톱에서 안내 카드가 먼저 보이고 5개 공유 문장이 펼쳐지는지 확인했다. 기존 제품 독립 문구와 공유 표제는 유지됐다.
- 첫 문장 복사 후 상태 안내, 390px·1440px 화면 폭, page error·console error 0건을 확인했으며 공개 candidate에서도 동일 흐름을 재현했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chromium fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001·RT-002·RT-003은 계속 OPEN이며 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-BUSINESS-SHARE-KIT-20261004, E-LIVE-PUBLIC-BUSINESS-SHARE-KIT-20261004.

## 모바일 전문가 영상 읽기 순서 레드팀 재검증 — 0feb5743 — 2026-10-04

- 320·350·390px에서 선택된 영상의 제목·채널·공유 동작이 긴 세로형 영상보다 먼저 노출되는지, 1440px에서 데스크톱 정보 계층이 유지되는지 확인했다. 제목이 늦게 나타나거나 선택 문맥이 사라지는 경로는 재현되지 않았다.
- 9:16 영상 비율, viewport 폭 일치, page/console error 0건을 확인했다. live 공개본에서도 두 번째 영상을 선택한 뒤 제목 `갱년기와 수면, GABA에 대한 질문`, active card 1, 진행 라벨 `전문가 영상`이 일치했다.
- 자동화는 Chromium fallback 범위의 검증이다. Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 대체하지 않으므로 RT-001·RT-002·RT-003은 계속 OPEN이다. 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-PLAYWRIGHT-MOBILE-VIDEO-CONTEXT-20261004, E-LIVE-PUBLIC-MOBILE-VIDEO-CONTEXT-20261004.

## 공개 사이트 전 구간 시각 레드팀 재검증 — 63bc6b1 — 2026-10-04

- 390px·1440px에서 첫 화면·수면과 회복·연구 지도·전문가 영상·이야기 공유 장을 직접 열어 화면 폭·이미지 비율·카드 정보 계층을 확인했다. 10개 캡처 모두 page error·console error 없이 통과했다.
- 모바일과 데스크톱 대표 폭의 일관성은 확인됐지만, Chromium fallback만으로 Safari/iOS/Android 실기기나 실제 고령 사용자 이해도를 보장할 수 없다. RT-001·RT-003은 계속 OPEN이며, 독립 과학·규제 감수인 RT-002도 닫지 않는다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았고 결과는 PASS_WITH_CONDITIONS, NAVI는 USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-VISUAL-PUBLISHING-20261004.

## 전문가 영상 공유 경합·공개 재배포 레드팀 재검증 — 34c5b08 — 2026-10-04

- 모바일 전문가 영상 선택 직후 공유할 때 smooth scroll이 이전 장 문맥을 덮어쓰는 경로를 재현하고, 선택 직후 읽기 장 고정과 공유 URL 문맥 재구성으로 보완했다. 최종 공개본에서 선택 영상·진행 라벨·공유 payload가 모두 `전문가 영상`으로 일치했다.
- 390px·1440px Playwright Chromium fallback 17/17, 메뉴 포커스·큰 글씨·reduced-motion·가로폭·콘솔 오류 0건과 공개 candidate 34c5b08의 live validator를 확인했다. 영상 선택·공유 기능은 통과했지만 자동화 결과가 실제 브라우저·실기기 호환성을 대체하지는 않는다.
- 첫 배포의 stale heartbeat 실패는 게이트 우회 없이 공식 heartbeat refresh PR #195로 복구했고, 최종 배포 workflow 37181007734의 fresh TF pulse·Pages·라이브 smoke·release status 성공을 확인했다. 기존 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이다.

증적: E-PLAYWRIGHT-EXPERT-VIDEO-SHARE-20261004, E-DEPLOY-PIPELINE-EXPERT-VIDEO-SHARE-20261004, E-LIVE-PUBLIC-EXPERT-VIDEO-SHARE-20261004.

## NAVI 문서 동기화 후 최종 공개본 레드팀 재검증 — cc312de — 2026-10-04

- 최종 공개 candidate에서 초소형 모바일 연구 카드와 주요 장 직접 진입을 다시 확인했다. 55개 조합 모두 가로폭·페이지 오류·콘솔 오류 기준을 통과했으며, 문서 동기화로 UI 자산이 변경되지 않았음을 확인했다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001·RT-002·RT-003은 계속 OPEN이며 결과는 PASS_WITH_CONDITIONS다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-NARROW-PHONE-20261004.

## 초소형 모바일 연구 카드 폭 및 공개본 전수 레이아웃 레드팀 재검증 — 91808af — 2026-10-04

- 320px 공개 화면에서 수면 연구 도표의 오른쪽 잘림을 재현한 뒤, 내부 그리드가 부모 폭 안에서 축소되도록 보정했다. 350·390·768·1440px와 11개 주요 장 직접 진입에서도 동일 문제가 재현되지 않았다.
- 55개 자동 조합의 targetFound·scrollWidth·페이지 오류·콘솔 오류가 모두 기준을 통과했고, 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 결과는 PASS_WITH_CONDITIONS다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-NARROW-PHONE-20261004, E-PLAYWRIGHT-NARROW-PHONE-20261004, E-DEPLOY-PIPELINE-NARROW-PHONE-20261004, E-LIVE-PUBLIC-NARROW-PHONE-20261004.

## 모바일 터치 중 수면·회복 카드 읽기 흐름 레드팀 재검증 — e6802d3 — 2026-10-04

- 390px touch context에서 카드를 누르고 3.4초 대기해도 1단계가 유지되는지, 손가락을 떼면 2단계로 자동 전환되는지 확인했다. 좌우 스와이프는 2단계로 이동하고 `다시 재생` 상태를 유지해 자동으로 다시 넘어가지 않는다.
- 단계 표시·이미지·카드 하단 진행선·모바일 가로폭은 유지됐고 page error·console error는 없었다. 변경은 터치 입력 처리에 한정되어 연구 카피·수치·출처·제품 독립 경계를 변경하지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 결과는 PASS_WITH_CONDITIONS다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RECOVERY-TOUCH-20261004, E-PLAYWRIGHT-RECOVERY-TOUCH-20261004, E-DEPLOY-PIPELINE-RECOVERY-TOUCH-20261004, E-LIVE-PUBLIC-RECOVERY-TOUCH-20261004.

## 수면·회복 자동 카드 읽기 흐름 레드팀 재검증 — cbf05f6 — 2026-10-04

- 자동 카드가 독자를 방해하지 않는지 확인했다. 기본 상태에서는 3초 후 1→2단계로 이동하고, 카드 영역에 포인터를 두거나 키보드 포커스를 둔 동안에는 현재 카드가 유지되며, 상호작용이 끝나면 자동 전환이 다시 시작된다. 직접 `잠시 멈춤`을 누른 경우에는 1단계가 유지된다.
- reduced-motion 설정에서는 카드가 자동 전환되지 않고 상태 문구가 명시된다. 390px·1440px에서 단계 표시·자연 이미지·카드 하단 진행선·다음 장 연결이 화면 안에 유지되며 page error·console error·모바일 가로 넘침은 없었다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 결과는 PASS_WITH_CONDITIONS다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RECOVERY-AUTOPLAY-20261004, E-PLAYWRIGHT-RECOVERY-AUTOPLAY-20261004, E-DEPLOY-PIPELINE-RECOVERY-AUTOPLAY-20261004, E-LIVE-PUBLIC-RECOVERY-AUTOPLAY-20261004.

## 모바일 연구 결과 도표 보조문구 가독성 레드팀 재검증 — 43e5942 — 2026-10-04

- 공개 320px·390px에서 연구 결과 도표의 비교 조건·GABA 조건, 감소 표기와 시각 요소 설명문이 읽히는지 확인했다. 768px·1440px에서도 도표 카드가 화면 안에 유지된다.
- 연구 수치·출처·제품 독립 경계는 변경하지 않았고, 도표 설명문은 시각 요소가 실제 효과 크기를 뜻하지 않는다는 기존 안내를 유지한다. 가로 넘침·page error·console error는 없었다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 결과는 PASS_WITH_CONDITIONS다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-CHART-LEGIBILITY-20261004, E-PLAYWRIGHT-RESEARCH-CHART-LEGIBILITY-20261004, E-DEPLOY-PIPELINE-RESEARCH-CHART-LEGIBILITY-20261004, E-LIVE-PUBLIC-RESEARCH-CHART-LEGIBILITY-20261004.

## 반응형 헤더 경계 레드팀 재검증 — 25c55f9 — 2026-10-04

- 861px 공개 화면에서 잘리던 공유 버튼을 재현한 뒤 compact 헤더 상한을 900px로 연장했다. 공개 861px·900px에서는 메뉴와 배경 레이어가 함께 열리고, 920px·1440px에서는 전체 내비게이션이 화면 안에 유지된다.
- 390px·861px·900px·920px·1440px에서 페이지 정체성·hero·큰 글씨 토글·가로 폭·공유 버튼 경계·콘솔 오류를 확인했다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 결과는 PASS_WITH_CONDITIONS다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TABLET-BREAKPOINT-20261004, E-PLAYWRIGHT-TABLET-BREAKPOINT-20261004, E-DEPLOY-PIPELINE-TABLET-BREAKPOINT-20261004, E-LIVE-PUBLIC-TABLET-BREAKPOINT-20261004.

## 태블릿 헤더 큰 글씨 조절 표식 레드팀 재검증 — 45a01bf — 2026-10-04

- 공개 768px에서 큰 글씨 조절 버튼이 빈 외곽선이 아니라 `가+` 표식과 44px 터치 영역으로 보이는지 확인했고, 320px·390px·1440px에서도 기존 표식과 헤더 균형을 유지했다.
- 페이지 정체성·가로 넘침·page error·console error는 없었고, 직접 해시 진입과 연구 카드 선택 흐름도 정상이다. 변경은 태블릿 CSS 표시 규칙에 한정되어 연구 카피·수치·출처·제품 독립 경계를 변경하지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 결과는 PASS_WITH_CONDITIONS다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TABLET-READING-CONTROL-20261004, E-PLAYWRIGHT-TABLET-READING-CONTROL-20261004, E-DEPLOY-PIPELINE-TABLET-READING-CONTROL-20261004, E-LIVE-PUBLIC-TABLET-READING-CONTROL-20261004.

## 모바일 연구 기준 범례 가독성 레드팀 재검증 — 746fd126 — 2026-10-04

- 공개 390px·1440px에서 연구 기준 범례가 연구 읽는 순서표 다음에 명확한 세로 흐름으로 표시되고, 모바일 제목·범례·설명이 13px·13px·12px로 읽히는지 확인했다. 줄바꿈 뒤 제목 텍스트도 자연스러운 띄어쓰기를 유지했다.
- 가로 넘침·page error·console error는 없었다. 피부 연구 지도를 선택하면 URL이 research-skin으로 바뀌고 해당 연구 카드가 활성화됐다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 결과는 PASS_WITH_CONDITIONS다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-RESEARCH-LEGEND-20261004, E-PLAYWRIGHT-MOBILE-RESEARCH-LEGEND-20261004, E-DEPLOY-PIPELINE-MOBILE-RESEARCH-LEGEND-20261004, E-LIVE-PUBLIC-MOBILE-RESEARCH-LEGEND-20261004.

## 모바일 연구 읽기 순서 가독성 레드팀 재검증 — 76b3adc — 2026-10-04

- 공개 390px·1440px에서 연구 지도 아래 4단계 순서표가 지도·대상·결과·해석으로 분리되고, 모바일 본문 13px·번호 원형 30px이 적용되는지 확인했다. 연구 제목이 순서표 아래에 자연스럽게 이어지고, 큰 글씨 토글과 연구 읽기 영상 필터도 실제 상태로 변했다.
- 가로 넘침·page error·console error는 없었다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 OPEN이며 결과는 PASS_WITH_CONDITIONS다. NAVI는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-READ-ORDER-20261004, E-PLAYWRIGHT-RESEARCH-READ-ORDER-20261004, E-DEPLOY-PIPELINE-RESEARCH-READ-ORDER-20261004, E-LIVE-PUBLIC-RESEARCH-READ-ORDER-20261004.

## 전문가 영상 fallback 포스터·콘솔 정리 레드팀 재검증 — c97d2ac — 2026-10-04

- 공개 390px·1440px에서 원격 썸네일 fallback이 동일한 회색 화면이 아니라 기존 자연 이미지 톤의 주제별 포스터로 표시되는지 확인했다. `연구 읽기` 필터 선택 후 대표 영상 제목과 활성 카드가 함께 갱신됐다.
- 가로 넘침·page error·console error는 없었다. 실제 YouTube 썸네일이 응답하는 경우 우선 표시하는 경로와 실패 시 fallback 경로를 유지하며, `web-share` 권한 토큰 제거는 영상 선택·즉시 재생·원문 링크·공유를 변경하지 않는다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.
- NAVI 문서 동기화 당시 live candidate `88c6efd`에서도 같은 공개 경계와 정적 번들을 재확인했지만, 외부 검증 조건은 변하지 않는다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-POSTERS-20261004`, `E-PLAYWRIGHT-EXPERT-VIDEO-POSTERS-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-POSTERS-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-POSTERS-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-POSTERS-FINAL-20261004`.

## 연구 결과 비교 도표 방향성 레드팀 재검증 — 86891bc — 2026-10-04

- 공개 390px·1440px에서 비교 조건과 GABA 조건의 막대 길이가 결과 방향에 따라 달라지는지 확인했다. `result-less`와 `result-more`가 서로 반대 방향으로 표시되고, 도표 주석은 시각 요소가 실제 효과 크기나 수치를 뜻하지 않는다는 경계를 유지한다.
- 연구 지도에서 피부 카드를 선택했을 때 지도와 상세 카드가 함께 활성화됐고, 가로 넘침·page error·console error는 없었다. CSS-only 변경으로 연구 수치·출처·제품 정보·영상·공유 로직은 건드리지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-PLAYWRIGHT-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-LIVE-PUBLIC-RESEARCH-COMPARISON-DIRECTION-20261004`.

## 모바일 전문가 영상 갤러리 레드팀 재검증 — a77c91c — 2026-10-04

- 공개 390px에서 영상 카드가 썸네일 중심 2열로 보이고, 320px에서는 1열로 복귀하는지 확인했다. 1440px에서는 기존 2열 게시판과 선택 영상 패널을 유지하며, 두 번째 카드 선택 시 제목과 iframe 상태가 함께 바뀌었다.
- 9개 썸네일 로드, 가로 넘침 없음, 선택 상태 1개, 앱 오류 없음으로 확인했다. 첫 320px 실행에서 외부 YouTube iframe의 `compute-pressure` Permissions Policy 경고가 관찰됐으나 즉시 재실행에서 재현되지 않아 사이트 코드 결함이 아닌 외부 임베드 브라우저 경고로 분류했다.
- 카드 밀도 보정은 CSS에 한정되어 연구 수치·출처·제품 정보·영상 재생·공유 로직을 변경하지 않았다. Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 자동화로 닫을 수 없으며 RT-001·RT-002·RT-003은 계속 `OPEN`, 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-VIDEO-GALLERY-20261004`, `E-PLAYWRIGHT-MOBILE-VIDEO-GALLERY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-VIDEO-GALLERY-20261004`, `E-LIVE-PUBLIC-MOBILE-VIDEO-GALLERY-20261004`.

## 마지막 이야기 공유 장 시각 균형 레드팀 재검증 — ec2a1bd — 2026-10-04

- 공개 390px·1440px에서 마지막 장으로 이동해 동심원 신호와 GABA 워터마크가 제목·본문·공유 버튼의 대비와 읽기 순서를 침범하지 않는지 확인했다. 모바일에서는 그래픽이 하단·저대비로 남고 데스크톱에서는 오른쪽 빈 공간을 보완했으며, 가로 넘침과 브라우저 오류는 없었다.
- 변경은 `PublicGabaGuide.css`의 장식 레이어에 한정된다. 연구 수치·출처·제품 정보·공유 로직·회복 카드 동작은 변경하지 않았다. 390px에서 회복 카드 마지막 단계 선택과 focus-visible 윤곽선도 반복 확인했다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-FINAL-SIGNAL-20261004`, `E-PLAYWRIGHT-FINAL-SIGNAL-20261004`, `E-DEPLOY-PIPELINE-FINAL-SIGNAL-20261004`, `E-LIVE-PUBLIC-FINAL-SIGNAL-20261004`.

## 모바일 회복 카드 탐색 affordance 레드팀 재검증 — 8e22d51 — 2026-10-04

- 공개 390px에서 `#recovery-break`에 직접 진입해 14개 단계가 두 줄의 읽기 경로로 보이고, 아이콘·번호가 화면 폭 안에 머무는지 확인했다. 마지막 단계를 클릭하면 카드 14/14가 활성화되고 자동 전환이 멈추며, 콘솔·페이지 오류는 없었다.
- hover·focus-visible 스타일과 클릭 선택은 시각적 안내만 보강하고 카드 내용·자동 진행·다음 장 흐름은 유지한다. 320px·1440px 전체 대표 감사는 이전 공개 검증에서 통과했으며 이번 변경은 390px 모바일 지도 affordance에 한정된다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-AFFORDANCE-20261004`, `E-PLAYWRIGHT-RECOVERY-MAP-AFFORDANCE-20261004`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-AFFORDANCE-20261004`, `E-LIVE-PUBLIC-RECOVERY-MAP-AFFORDANCE-20261004`.

## 전문가 영상 로딩 포스터 연속성 레드팀 재검증 — 44337e5 — 2026-10-04

- 공개 390px에서 전문가 영상을 선택한 직후 썸네일이 유지되고 로딩 문구가 표시되는지, 실제 iframe이 준비되면 영상으로 전환될 수 있는지 확인했다. 프레임은 250x444px의 9:16 비율이고 가로 넘침은 없었다.
- 포스터를 로딩 상태의 시각적 바탕으로만 사용하고 영상 iframe이 준비된 뒤 제거하도록 제한해, 기존 재생·원문 링크·공유 흐름을 바꾸지 않았다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-VIDEO-LOADING-POSTER-20261004`, `E-PLAYWRIGHT-VIDEO-LOADING-POSTER-20261004`, `E-DEPLOY-PIPELINE-VIDEO-LOADING-POSTER-20261004`, `E-LIVE-PUBLIC-VIDEO-LOADING-POSTER-20261004`.

## 모바일 보조 문구·전문가 영상 영역 고도화 레드팀 재검증 — a2a2d3f — 2026-10-04

- 공개 320px hero와 390px 전문가 영상 화면에서 작은 보조 문구가 12px로 읽히고, 선택한 세로 영상이 250x444px의 9:16 프레임으로 유지되는지 확인했다. 가로 넘침과 앱 오류는 없었다.
- 영상 확대는 프레임 비율을 바꾸지 않는 `max-width` 조정으로 제한해 이미지 찌그러짐 위험을 만들지 않았다. 320px hero, 390px expert, 연구·마지막 공유 흐름의 반복 검증에서 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-LABEL-MEDIA-20261004`, `E-PLAYWRIGHT-MOBILE-LABEL-MEDIA-20261004`, `E-DEPLOY-PIPELINE-MOBILE-LABEL-MEDIA-20261004`, `E-LIVE-PUBLIC-MOBILE-LABEL-MEDIA-20261004`.

## 수면과 회복 연결 문구 명료화 레드팀 재검증 — eded7a9 — 2026-10-04

- 공개 390px에서 `#recovery-break`에 직접 진입해 `다음 장으로 이어져요`가 상단 진행 레일에 표시되고, 제목·aria-label·가로 폭이 함께 유지되는지 확인했다. 320px과 1440px에서도 가로 넘침은 없었다.
- 공개 전체 흐름에서 한 차례 YouTube iframe의 Chrome `compute-pressure` Permissions Policy 경고가 발생했지만, 같은 검증을 즉시 재실행한 결과 page/console errors가 없었다. 사이트 코드 오류가 아닌 외부 iframe 브라우저 경고로 분류하고, 영상 임베드 브라우저별 재검증 항목으로 남긴다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-INTERLUDE-COPY-20261004`, `E-PLAYWRIGHT-INTERLUDE-COPY-20261004`, `E-DEPLOY-PIPELINE-INTERLUDE-COPY-20261004`, `E-LIVE-PUBLIC-INTERLUDE-COPY-20261004`.

## 같은 페이지 해시 맥락 동기화 레드팀 재검증 — a8689a3 — 2026-10-04

- 공개 390px에서 `recovery-break`에 진입한 뒤 같은 페이지 해시를 `research-skin`, `expert-videos`로 바꾸어 공격적으로 확인했다. 연구 선택·스크롤 위치·브라우저 제목·진행 레일이 각각 피부 연구·전문가 영상으로 함께 바뀌었다.
- 초기 정렬 타이머가 이전 해시로 되돌리는 경로를 차단했고, 연구 카드·영상·마지막 공유를 포함한 일반 모바일 흐름에서도 가로 폭은 viewport와 같고 page/console errors는 없었다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-HASH-CONTEXT-20261004`, `E-PLAYWRIGHT-HASH-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-HASH-CONTEXT-20261004`, `E-LIVE-PUBLIC-HASH-CONTEXT-20261004`.

## 현재 장 이동 읽기 레일 동기화 레드팀 재검증 — a396ca8 — 2026-10-04

- 공개 390px에서 모바일 메뉴로 연구 지도를 선택한 직후 제목·진행 레일이 `연구 지도 | GABA Guide`·`연구 지도 03 / 12`로 유지되는지 확인했다. 이후 연구 카드→전문가 영상→마지막 공유까지 이동해 이전 장 잠금이 남지 않는 경로를 재현했다.
- smooth scroll 중 잠금은 읽기 관찰자의 되돌림을 막고, 사용자 wheel/touch와 연구→영상 선택에서는 해제된다. 390px 가로 폭은 viewport와 같고 page/console errors는 없었다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-CHAPTER-RAIL-SYNC-20261004`, `E-PLAYWRIGHT-CHAPTER-RAIL-SYNC-20261004`, `E-DEPLOY-PIPELINE-CHAPTER-RAIL-SYNC-20261004`, `E-LIVE-PUBLIC-CHAPTER-RAIL-SYNC-20261004`.

## 현재 읽는 위치 공유 맥락 레드팀 재검증 — b03b7df — 2026-10-04

- 공개 390px에서 연구 지도 근육 카드 선택 후 공유, 전문가 영상 선택 후 공유, 마지막 장까지 자연 스크롤 후 공유를 각각 재현해 주소가 현재 맥락으로 바뀌는지 확인했다. 이전 `#expert-videos` 주소가 마지막 장 공유에 남지 않고 `#final`로 재구성됐다.
- 연구 공유는 `#research-muscle`, 선택 영상 공유는 `?video=RLAU1VWGsaI#expert-videos`를 유지했으며 390px 가로 폭은 viewport와 같고 console/page error는 없었다. 제품 광고·연구 카피·출처 경계는 변경하지 않았다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-SHARE-CONTEXT-20261004`, `E-PLAYWRIGHT-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-SHARE-CONTEXT-20261004`.

## 마지막 이야기 공유 라벨 일관성 레드팀 재검증 — 26077a2 — 2026-10-04

- 최종 GitHub Pages 공개본 390px에서 `#final` 직접 진입을 공격적으로 확인했다. 브라우저 제목·상단 진행 레일·본문 섹션 번호가 모두 `이야기 공유`로 일치했고, 가로 넘침과 페이지 오류는 없었다.
- 라벨 변경은 독자 위치 인식만 일관되게 만들고 연구 카피·출처·제품 독립 경계를 변경하지 않았다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-FINAL-LABEL-20261004`, `E-PLAYWRIGHT-FINAL-LABEL-20261004`, `E-DEPLOY-PIPELINE-FINAL-LABEL-20261004`, `E-LIVE-PUBLIC-FINAL-LABEL-20261004`.

## 수면과 회복 진행 문구 명료화 레드팀 재검증 — 14528e9 — 2026-10-04

- 최종 GitHub Pages 공개본 390px에서 `#recovery-break` 직접 진입을 공격적으로 확인했다. 상단에는 `이어 읽기 / 12`가 표시되고 `aria-label`은 본문 사이에 이어지는 설명이라는 문구를 전달했으며, 제목·가로 폭·페이지 오류는 안정적이었다.
- 문구 변경은 진행 상태의 의미만 명료화하고 연구 카피·출처·제품 독립 경계를 변경하지 않았다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-INTERLUDE-PROGRESS-20261004`, `E-PLAYWRIGHT-INTERLUDE-PROGRESS-20261004`, `E-DEPLOY-PIPELINE-INTERLUDE-PROGRESS-20261004`, `E-LIVE-PUBLIC-INTERLUDE-PROGRESS-20261004`.

## 연구 지도 딥링크 상태 복원 레드팀 재검증 — 4d9bfde — 2026-10-04

- 최종 GitHub Pages 공개본에서 390·1440px `#research-skin` 직접 진입을 재현해 선택 지도·상세 카드·읽기 진행·브라우저 제목이 `피부 연구 결과`로 일치하는지 확인했다. 이후 `location.hash`를 `#research-muscle`로 변경해 선택 상태가 `근육 연구 결과`로 동기화되는 경로를 공격적으로 확인했다.
- 공개 배포 파이프라인과 live validator는 HTTP 200·STATIC·최종 candidate `cb494e2`·공개 데이터·제품 독립 경계를 확인했고, 테스트 중 가로 넘침과 브라우저 오류는 없었다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-PLAYWRIGHT-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-LIVE-PUBLIC-RESEARCH-DEEPLINK-CONTEXT-20261004`.

## 선택 영상 카드 직접 공유 레드팀 재검증 — e709f2c — 2026-10-04

- 320·390·1440px에서 선택 영상 카드 내부의 `이 영상 공유` 버튼을 직접 클릭하고 공유 payload를 가로채 확인했다. 버튼은 세 viewport에서 표시됐고, 제목은 선택 영상에 맞았으며 URL은 `video=roEtojyk9_0#expert-videos`를 보존했다.
- 공유 후 상태 문구가 `공유 창을 열었어요.`로 표시됐고, 포스터·iframe 지연·진행 표시·가로 폭·콘솔/페이지 오류가 안정적이었다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-DIRECT-VIDEO-SHARE-20261004`, `E-PLAYWRIGHT-DIRECT-VIDEO-SHARE-20261004`, `E-DEPLOY-PIPELINE-DIRECT-VIDEO-SHARE-20261004`, `E-LIVE-PUBLIC-DIRECT-VIDEO-SHARE-20261004`.

## 전문가 영상 공유 맥락 레드팀 재검증 — 68efaca — 2026-10-04

- 320·390·1440px에서 `?video=roEtojyk9_0#expert-videos`로 직접 진입하고 새로고침을 반복해 선택 영상·장 제목·진행 표시·가로 폭을 공격적으로 확인했다. `잠이 안 올 때 GABA 이야기`가 복원됐고, 포스터는 유지되며 사용자가 재생하기 전 iframe은 생성되지 않았다.
- 기본 `/guide/` 390px 진입에서는 초기 YouTube 관련 요청 0건을 확인했다. 공개본에서 브라우저 제목은 선택 장·영상과 일치했고 콘솔·페이지 오류와 가로 넘침은 없었다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-VIDEO-SHARE-CONTEXT-20261004`, `E-PLAYWRIGHT-VIDEO-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-VIDEO-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-VIDEO-SHARE-CONTEXT-20261004`.

## Mobile Publishing Performance Red-Team Recheck — d71ab6c — 2026-10-04

- 초기 390px 진입에서 전문가 영상 썸네일 네트워크 요청이 0건인지, `#expert-videos` 직접 진입 뒤 필요한 썸네일만 로드되는지 공격적으로 확인했다. 320·390·1440px에서 제목은 131/132/151px에 정렬되고 진행 상태는 `전문가 영상 10 / 12`로 유지됐다.
- 연구 지도에서 근육 카드를 선택하면 `근육 연구 결과` 카드로 이동했고, 공개본의 가로 폭은 각 viewport와 일치했으며 콘솔·페이지 오류가 없었다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 지연 로딩과 제목 줄바꿈 변경은 영상·연구 내용, 출처, 제품 독립 경계를 바꾸지 않았다. 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없으므로 RT-001·RT-002·RT-003은 계속 `OPEN`, 결과는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-PERFORMANCE-20261004`, `E-PLAYWRIGHT-MOBILE-PERFORMANCE-20261004`, `E-DEPLOY-PIPELINE-MOBILE-PERFORMANCE-20261004`, `E-LIVE-PUBLIC-MOBILE-PERFORMANCE-20261004`.

## Direct Chapter Link Stability Red-Team Recheck — 818cc2f — 2026-10-04

- 320·390·1440px에서 `#expert-videos` 직접 진입을 반복 재현해 초기 화면·지연 로딩 후·안정화 시점의 제목 위치, 읽기 진행 레일, 영상 영역, 문서 폭을 공격적으로 확인했다. 제목은 131.34/131.63/150.50px에 놓였고 진행 상태는 `전문가 영상 10 / 12`로 유지됐다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 공개 Chrome fallback에서 가로 넘침과 콘솔·페이지 오류가 없었고, PR #165의 정렬 보강은 공유 링크 흐름에만 한정됐다. 공개 연구 카피와 제품 독립 경계는 변경하지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-DEEP-LINK-ALIGN-20261004`, `E-PLAYWRIGHT-DEEP-LINK-ALIGN-20261004`, `E-DEPLOY-PIPELINE-DEEP-LINK-ALIGN-20261004`, `E-LIVE-PUBLIC-DEEP-LINK-ALIGN-20261004`.

## Expert Video Feature Focus Red-Team Recheck — c33b427 — 2026-10-04

- 390px에서 전문가 영상 두 번째 카드를 클릭하고 Enter로 선택하는 경로를 공격적으로 재현했다. 선택된 영상 iframe으로 전환되면서 `#expert-video-feature`에 실제 포커스가 놓이고 focus-visible 윤곽선이 표시되며 선택 카드는 하나로 유지됐다.
- 로컬 preview에서 가로 넘침과 콘솔·페이지 오류가 없었고, main workflow `37152307391`의 정적 Pages 배포·라이브 smoke·release status와 live validator candidate `c33b427`가 성공했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다. 공개 연구 카피와 제품 독립 경계는 변경하지 않았다.

증적: `E-LOCAL-BUILD-VIDEO-FEATURE-FOCUS-20261004`, `E-PLAYWRIGHT-VIDEO-FEATURE-FOCUS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-FEATURE-FOCUS-20261004`, `E-LIVE-PUBLIC-VIDEO-FEATURE-FOCUS-20261004`.

## Public Release Interaction and Cross-Viewport Red-Team Recheck — 4d94150 — 2026-10-04

- 메뉴 항목 이동·Escape·연구 지도 선택·영상 주제 필터·선택 즉시 재생·회복 카드 자동 전환을 공격 경로로 재현했으며, 상태가 하나로 유지되고 포커스가 문서 배경으로 빠지지 않았다. 320·390·412·768·1440px 직접 해시 진입에서도 제목 정렬·진행 상태·가로 폭이 유지됐다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수는 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`다.
- 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았다. NAVI는 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-PLAYWRIGHT-PUBLIC-INTERACTION-AUDIT-20261004`, `E-PLAYWRIGHT-PUBLIC-HASH-CROSSWIDTH-20261004`, `E-DEPLOY-PIPELINE-PUBLIC-RECHECK-20261004`, `E-LIVE-PUBLIC-CURRENT-RECHECK-20261004`.

## Mobile Menu Focus Restoration Red-Team Recheck — 510e9ad — 2026-10-04

- 공격 경로로 모바일 메뉴 항목 선택, 메뉴 외부 `pointerdown`, 배경 버튼 클릭을 각각 재현해 닫힌 뒤 포커스가 문서 `body`로 남는 결함을 점검했다. PR #163에서 외부 닫힘과 메뉴 이동 모두 `guide-menu-toggle`로 포커스를 복귀하도록 보완했고, 메뉴 첫 항목 포커스와 가로 폭 390px도 재확인했다.
- 공개 390px Chrome fallback에서 메뉴 열림·첫 링크 포커스·`#academic` 이동·배경 닫기·토글 포커스 복귀·콘솔/페이지 오류 없음이 확인됐다. 새 CRITICAL/MAJOR 결함은 없으며 결과는 `PASS_WITH_CONDITIONS`다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS-20261004`, `E-PLAYWRIGHT-MOBILE-MENU-FOCUS-20261004`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS-20261004`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS-20261004`.

## Direct Hash Entry Alignment Red-Team Recheck — 70d66b5 — 2026-10-04

- 390px 공개본에서 `#recovery-break`, `#research`, `#expert-videos`를 새로고침해도 장 제목이 고정 읽기 레일 아래에 놓이고, 진행 상태가 `보충 / 12`, `06 / 12`, `10 / 12`로 맞춰지는지 재현했다. 가로 넘침과 브라우저 오류는 없었다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 수정은 해시 진입 정렬 타이밍에 한정됐고, 연구 카피·출처·제품 독립 경계와 전문가 영상 흐름은 변경하지 않았다.
- 잔여 위험은 동일하다. Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-DIRECT-HASH-NAV-20261004`, `E-PLAYWRIGHT-DIRECT-HASH-NAV-20261004`, `E-DEPLOY-PIPELINE-DIRECT-HASH-NAV-20261004`, `E-LIVE-PUBLIC-DIRECT-HASH-NAV-20261004`.

## Mobile Reading Clarity Red-Team Recheck — 37737d2 — 2026-10-04

- 좁은 화면에서 기능 라벨이 장식 요소보다 작아질 수 있는 사용성 결함을 재검토했다. 320/390px 공개본에서 진행 상태·장 표시·연구 출처·결과 방향 라벨을 12px로 확인했고, 읽기 크기 버튼은 `가+`/`가−`로 상태를 시각적으로 드러냈다.
- Chrome fallback 기준 320/390/1440px에서 가로 넘침과 런타임 오류가 없고, 읽기 크기 클릭 후 `is-large-text`와 상태 문구가 갱신된다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 잔여 위험은 동일하다. Browser 플러그인 부재로 Chrome fallback만 사용했으며 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 별도 검증이 필요하다. 연구 카피나 제품 광고는 이번 변경에서 추가하지 않았다. 상태는 `PASS_WITH_CONDITIONS`, NAVI는 `USER_DECISION / NOT_READY`다.

증적: `E-LOCAL-BUILD-MOBILE-READING-CLARITY-20261004`, `E-PLAYWRIGHT-MOBILE-READING-CLARITY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-READING-CLARITY-20261004`, `E-LIVE-PUBLIC-MOBILE-READING-CLARITY-20261004`.

## Expert Video Thumbnail Resolution Red-Team Recheck — 52ff08b — 2026-10-04

- `maxres`와 `hq` 썸네일을 모두 1px 이미지로 성공 응답시키는 조건에서 공개 390px 화면을 재현했다. 이미지가 `is-unavailable`로 숨겨지고 `GABA VIDEO` 표지가 표시되는 것을 확인했으며, 정상 320/390/1440px에서는 가로 넘침과 브라우저 오류가 없었다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 영상 선택·iframe 재생·공개 카피·제품 독립 경계는 변경하지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-RESOLUTION-20261004`.

## Expert Video Thumbnail Fallback Red-Team Recheck — 342f43f — 2026-10-04

- 기본·대체 썸네일 요청을 모두 실패시키는 조건에서 이미지 요소가 숨겨지고 `GABA VIDEO` 표지가 실제로 보이는지 확인했다. 정상 공개본에서는 320/390/1440px의 9개 썸네일 로딩, 첫 4개 eager, 가로 폭과 브라우저 오류도 재확인했다.
- 새 CRITICAL/MAJOR 결함은 확인되지 않았다. 영상 선택·iframe 재생·영상 데이터·제품 독립 경계는 변경하지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-FALLBACK-20261004`.

## Expert Video Thumbnail Loading Red-Team Recheck — 8093615 — 2026-10-04

- 모바일 전문가 영상 게시판의 일부 카드가 이미지 로딩 전 빈 표면으로 보이던 결함을 확인했고, 첫 4개 eager 로드와 `GABA VIDEO` 대체 표면으로 보완했다. 320/390/1440px 공개 Chrome fallback에서 첫 4개 썸네일 로드, 가로 넘침 없음, 브라우저 오류 없음을 확인했으며 새 CRITICAL/MAJOR 결함은 없었다.
- `수면` 필터 선택 시 4개 카드로 줄고, `잠이 안 올 때 GABA 이야기` 선택 시 해당 YouTube iframe과 로딩 상태로 전환되는 실제 상호작용을 재확인했다. 영상 데이터·출처·제품 독립 경계는 변경하지 않았다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAILS-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAILS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAILS-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAILS-20261004`.

## Mobile Definition Card Motif Red-Team Recheck — 4e558ee — 2026-10-04

- 320px에서 두 번째 기본 설명 카드의 달 장식이 본문 마지막 줄과 겹치던 결함을 확인했고, 모바일 카드 하단의 장식 전용 여백으로 보완했다. 320/390px 공개 Chrome fallback에서 본문-아이콘 간격 6px, 가로 넘침 없음, 브라우저 오류 없음을 확인했으며 새 CRITICAL/MAJOR 결함은 없었다.
- 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았다. 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-DEFINITION-MOTIF-20261004`, `E-PLAYWRIGHT-DEFINITION-MOTIF-20261004`, `E-DEPLOY-PIPELINE-DEFINITION-MOTIF-20261004`, `E-LIVE-PUBLIC-DEFINITION-MOTIF-20261004`.

## Mobile Research Card Width Red-Team Recheck — 7a6db416 — 2026-10-04

- 320px에서 연구 결과 카드가 필요 이상으로 좁아져 도표 조건 문구가 여러 줄로 꺾이던 결함을 확인했고, 320/390/1440px에서 모바일 가용 폭을 사용하는 보정 후 재검증했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 공개 연구 카피·제품 독립 경계·출처·연구 데이터는 변경하지 않았다. 공개 validator와 Chrome fallback에서 가로 넘침·브라우저 오류가 없었으며 카드 폭과 도표 폭이 개선됐다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-CARD-WIDTH-20261004`, `E-PLAYWRIGHT-RESEARCH-CARD-WIDTH-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-CARD-WIDTH-20261004`, `E-LIVE-PUBLIC-RESEARCH-CARD-WIDTH-20261004`.

## Chapter Entry Clearance Red-Team Recheck — b9f21d0 — 2026-10-04

- 장 헤더 전체를 앵커로 삼아 `06 · 연구의 확장` 같은 작은 장 표시가 고정 읽기 진행 바와 겹치지 않도록 보완했다. 320px·390px·1440px에서 표시·제목·진행 바의 세로 관계와 가로 폭을 확인했으며 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 직접 해시 진입과 기존 메뉴 이동 경로의 공개 정적 동작을 확인했지만, Chrome fallback만으로 Safari/iOS/Android 실기기와 실제 고령 사용자 이해도를 닫을 수 없다. 독립 과학·규제 감수도 외부 게이트로 남는다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-CHAPTER-ENTRY-20261004`, `E-PLAYWRIGHT-CHAPTER-ENTRY-20261004`, `E-DEPLOY-PIPELINE-CHAPTER-ENTRY-20261004`, `E-LIVE-PUBLIC-CHAPTER-ENTRY-20261004`.

## Mobile Expert Video Topic Visibility Red-Team Recheck — 71960f0 — 2026-10-04

- 320px·390px에서 모든 전문가 영상 주제가 보이고, 1440px에서는 기존 갤러리 2열 균형이 유지되며 `수용체` 선택 시 1개 영상·iframe으로 전환된다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 전체 노출은 숨은 가로 스크롤을 없애 발견성을 높였지만, 필터 수가 계속 늘어나면 모바일 세로 길이가 커질 수 있으므로 이후 영상 추가 시 다시 밀도 감사를 실행한다.
- 자동화와 Chrome fallback만으로 Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-FILTERS-20261004`, `E-PLAYWRIGHT-VIDEO-FILTERS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-FILTERS-20261004`, `E-LIVE-PUBLIC-VIDEO-FILTERS-20261004`.

## Explicit Original-Source Action Red-Team Recheck — 32b37a1 — 2026-10-04

- 아이콘만 있던 출처 카드의 다음 행동 불명확성을 `원문 보기` 텍스트 행동으로 보완했다. 공개 320/390/1440px에서 표시·가로 폭·오류를 확인했고 클릭 시 `https://pubmed.ncbi.nlm.nih.gov/22203366/` 새 탭으로 이동했다. 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- 이 변경은 연구 결과 문장·제품 독립 경계를 바꾸지 않는다. 자동화와 Chrome fallback만으로 Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-SOURCE-ACTION-20261004`, `E-PLAYWRIGHT-SOURCE-ACTION-20261004`, `E-DEPLOY-PIPELINE-SOURCE-ACTION-20261004`, `E-LIVE-PUBLIC-SOURCE-ACTION-20261004`.

## Source Reading Bridge Red-Team Recheck — a8cc869 — 2026-10-04

- 기존 출처 읽기 구간이 다음 행동을 안내하지 못하던 정보 구조 결함을 네 질문과 실제 원문 출처 카드로 보완했다. 320/390/1440px 공개 Playwright에서 네 단계·PubMed 링크·모바일 이동·영상 선택 재생·가로 폭을 확인했고 새 CRITICAL/MAJOR 결함은 확인하지 않았다.
- 이 개선은 기존 연구 카피·제품 독립 경계를 바꾸지 않는다. 자동 검증과 공개 배포 검증이 통과했어도 Chrome fallback만으로 Safari/iOS/Android, 실제 고령 사용자 이해도, 독립 과학·규제 감수를 닫을 수 없다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-SOURCE-BRIDGE-20261004`, `E-PLAYWRIGHT-SOURCE-BRIDGE-20261004`, `E-DEPLOY-PIPELINE-SOURCE-BRIDGE-20261004`, `E-LIVE-PUBLIC-SOURCE-BRIDGE-20261004`.

## Mobile Chart Readability and Long-Jump Navigation Red-Team Recheck — b778f23 — 2026-10-04

- 모바일 차트의 작은 메타데이터가 고령 사용자의 비교 판단을 방해할 수 있었고, 초기 hash 정렬 타이머가 메뉴 이동 뒤 목적지에서 다시 맨 위로 돌릴 수 있었다. 글자 바닥값·수동 이동 취소를 추가한 뒤 320/390/1440px 공개 Playwright에서 차트와 장 이동을 재확인했으며 새 CRITICAL/MAJOR 결함은 확인하지 않았다.
- 제품 독립 경계·출처·연구 카피는 변경되지 않았고, 자동 검증·배포 검증·라이브 검증은 일치했다. 다만 Chrome fallback만으로 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수를 닫을 수 없다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 사용자 이해도는 계속 `OPEN`이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-CHART-NAV-20261004`, `E-PLAYWRIGHT-MOBILE-CHART-NAV-20261004`, `E-DEPLOY-PIPELINE-CHART-NAV-20261004`, `E-LIVE-PUBLIC-CHART-NAV-20261004`.

## Research Scale Infographic Red-Team Recheck — b8e6236 — 2026-10-03

- 기존 연구 규모 화면은 Harvard·Oxford PubMed 검색 결과와 별도 GABA-A receptor SCIE/WoS 분석을 같은 시각 척도처럼 보여 첫 두 막대가 과도하게 작아지고, 비교 대상의 범위를 혼동할 여지가 있었다. PR #119에서 동일 PubMed 기관 비교와 별도 SCIE 강조 블록으로 분리해 시각적 비교 범위를 명시했다.
- 390px에서 기관 비교 2개와 SCIE 강조 1개가 분리되어 보이고, 320px·1440px 가로 넘침이 없었다. 피부 연구 지도 선택 시 `피부 연구 결과` 레일과 `research-skin` 카드 동기화도 유지됐다. 새 과학 주장·제품 광고는 추가되지 않았고 새 CRITICAL/MAJOR 결함은 확인되지 않았다.
- Browser 플러그인, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-SCALE-20261003`, `E-CDP-RESEARCH-SCALE-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-SCALE-20261003`, `E-LIVE-PUBLIC-RESEARCH-SCALE-20261003`.

## Sticky Research Rail Orientation Red-Team Recheck — 77a3032 — 2026-10-03

- 긴 모바일 연구 카드에서 진행 레일의 제목이 전체 장 이름만 보여 현재 세부 주제를 잃을 수 있던 경미한 방향성 결함을 PR #117에서 보완했다. 지도에서 피부를 선택한 뒤 레일·선택 카드가 `피부 연구 결과`로 동기화되고, 390px·320px·1440px에서 가로 넘침과 오류 오버레이가 없음을 확인했다.
- 새 과학 주장·제품 광고는 추가되지 않았고, 데이터·출처·제품 독립 경계는 유지됐다. 새 치명적 결함은 확인되지 않았다.
- Browser 플러그인, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-RAIL-ORIENTATION-20261003`, `E-CDP-RESEARCH-RAIL-ORIENTATION-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-RAIL-ORIENTATION-20261003`, `E-LIVE-PUBLIC-RESEARCH-RAIL-ORIENTATION-20261003`.

## Mobile Research Comparison Red-Team Recheck — 4058bf6 — 2026-10-03

- 기존 모바일 비교 도표가 조건을 세로로 길게 쌓아 결과를 즉시 비교하기 어려웠던 점을 PR #115에서 보완했다. 390px 좌우 비교와 320px 한 열 fallback을 확인했으며, 두 상태 모두 가로 넘침과 오류 오버레이가 없었다.
- 차트의 접근성 라벨이 제목과 주의 문장만 전달하던 범위를 넓혀 `잠드는 시간`과 `전체 비렘수면`의 조건별 관찰 결과를 포함했다. 새 과학 주장·제품 광고는 추가되지 않았다.
- 새 치명적 결함은 확인되지 않았지만 Browser 플러그인, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-COMPARISON-20261003`, `E-CDP-MOBILE-COMPARISON-20261003`, `E-DEPLOY-PIPELINE-MOBILE-COMPARISON-20261003`, `E-LIVE-PUBLIC-MOBILE-COMPARISON-20261003`.

## Expert Video Gallery Red-Team Recheck — 10a6192 — 2026-10-03

- 긴 주제 목록이 모바일에서 잘린 것처럼 보일 수 있던 탐색 단서를 PR #113에서 보완했다. 390px에서 오른쪽 continuation cue가 표시되고, 끝에 도달하면 사라지며, 고해상도 썸네일이 선택 영상과 일치하는지 확인했다.
- `연구 읽기`를 선택하면 해당 카드와 YouTube iframe이 동기화되고, 390px·1440px에서 가로 넘침이나 오류 오버레이가 없었다. 새 과학 주장·제품 광고는 추가되지 않았다.
- 새 치명적 결함은 확인되지 않았지만 Browser 플러그인, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-BROWSING-20261003`, `E-CDP-EXPERT-VIDEO-BROWSING-20261003`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-BROWSING-20261003`, `E-LIVE-PUBLIC-EXPERT-VIDEO-BROWSING-20261003`.

## Final Red-Team Recheck — 16fc5d4 — 2026-10-03

- 문서 PR #111 병합 뒤 공개 URL의 상태·번들·공개 데이터 경계를 재확인했다. 새 코드 결함이나 공개 배포 실패는 확인되지 않았다.
- 남은 위험은 자동화 범위를 넘는 Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 감수다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LIVE-PUBLIC-NAVI-MERGE-20261003`.

## Latest Red-Team Recheck — cbd2f8e — 2026-10-03

- 지도 선택 후 도착 카드가 선택 상태를 충분히 드러내지 않아 긴 연구 섹션에서 시선이 끊길 수 있던 경미한 방향성 결함을 PR #110에서 보완했다. 390px에서 카드 테두리·그림자·왼쪽 포인트와 지도 `인지` 상태가 함께 활성화되고, 1440px 레이아웃 보존·가로 넘침 없음·런타임 오류 0건을 확인했다.
- PR #110 checks, main `37112425820`, live validator, 390px 지도 클릭·카드 도착·메뉴 열림/닫힘, 1440px 히어로·헤더를 재확인했다. 새 과학·제품 주장은 추가되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-ORIENTATION`, `E-CDP-RESEARCH-MAP-ORIENTATION`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-ORIENTATION`, `E-LIVE-PUBLIC-RESEARCH-MAP-ORIENTATION`.

## Latest Red-Team Recheck — c6291f6 — 2026-10-03

- 모바일 CSS가 작은 장 제목을 전역으로 숨겨 긴 페이지에서 현재 위치를 잃게 하던 가독성 결함을 PR #108에서 보완했다. 390px·320px 제목 표시와 1440px 데스크톱 보존, 레일과의 간격을 확인했으며 새 치명적 결함은 확인되지 않았다.
- PR #108 checks, main `37111226511`, live validator, 390px 메뉴 열림·닫힘·스크롤 복원, 1440px 제목·히어로·헤더를 재확인했다. 새 과학·제품 주장은 추가되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-CHAPTER-LABELS`, `E-CDP-MOBILE-CHAPTER-LABELS`, `E-DEPLOY-PIPELINE-MOBILE-CHAPTER-LABELS`, `E-LIVE-PUBLIC-MOBILE-CHAPTER-LABELS`.

## Latest Red-Team Recheck — 2ae71ef — 2026-10-03

- 모바일 장 진입점에서 sticky reading rail이 장 번호와 제목 첫 줄을 덮을 수 있던 가독성 결함을 PR #106의 110px section-entry spacing으로 보완했다. 정적 UI contract guard, 320/390px title clearance, 1440px desktop preservation을 확인했으며 새 치명적 결함은 확인되지 않았다.
- PR #106 checks, main `37109900221`, live validator, 390px 메뉴 열림·닫힘·스크롤 복원, 1440px 제목·히어로·헤더를 재확인했다. 새 과학·제품 주장은 추가되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RAIL-TITLE-CLEAR`, `E-CDP-RAIL-TITLE-CLEAR`, `E-DEPLOY-PIPELINE-RAIL-TITLE-CLEAR`, `E-LIVE-PUBLIC-RAIL-TITLE-CLEAR`.

## Latest Red-Team Recheck — bf235ed — 2026-10-03

- 새 방문자가 기본 공개 경로에서 코드 split 대기 시간을 마주칠 때 헤더와 히어로가 잠시 사라질 수 있던 첫 상호작용 결함을 PR #104에서 guide-only preloading과 branded loading shell로 보완했다. 390px 메뉴 상태·1440px 데스크톱 내비게이션·히어로 유지와 새 치명적 결함 없음 확인.
- PR #104 checks, main `37108431389`, live validator, 390/1440px CDP를 재확인했다. 이번 변경으로 새 과학·제품 주장은 추가되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-GUIDE-LOADING-SHELL`, `E-CDP-GUIDE-LOADING-SHELL`, `E-DEPLOY-PIPELINE-GUIDE-LOADING-SHELL`, `E-LIVE-PUBLIC-GUIDE-LOADING-SHELL`.

## Latest Red-Team Recheck — b9160e4 — 2026-10-03

- 모바일 메뉴에서 Tab 이동이 배경 콘텐츠로 빠질 수 있던 접근성 결함을 PR #102에서 포커스 순환으로 보완했다. `aria-current=location`, 390px 메뉴 상태, 가로 폭, 새 치명적 결함 없음을 확인했다.
- PR #102 checks, main `37106966171`, live validator, 390/1440px CDP를 재확인했다. 새 과학·제품 주장은 추가되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-FOCUS-TRAP`, `E-CDP-MOBILE-FOCUS-TRAP`, `E-DEPLOY-PIPELINE-MOBILE-FOCUS-TRAP`, `E-LIVE-PUBLIC-MOBILE-FOCUS-TRAP`.

## Latest Red-Team Recheck — 9c2913d — 2026-10-03

- 진행 레일이 실제 페이지 순서와 어긋나 수면·회복 프롤로그가 뒤늦게 표시될 수 있고, 해시 앵커가 sticky rail 아래에 가려질 수 있던 결함을 PR #100에서 보완했다. DOM 순서 기반 13단계 진행, 동적 오프셋, 전문가 영상 선택 이동을 확인했으며 새 치명적 결함은 확인되지 않았다.
- PR #100 checks, main `37105696713`, live validator, 390/1440px CDP를 재확인했다. 이번 변경으로 새 과학·제품 주장은 추가되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-READING-RAIL-DEEPLINK`, `E-CDP-READING-RAIL-DEEPLINK`, `E-DEPLOY-PIPELINE-READING-RAIL-DEEPLINK`, `E-LIVE-PUBLIC-READING-RAIL-DEEPLINK`.

## Latest Red-Team Recheck — 3d788e3 — 2026-10-03

- 모바일·태블릿 메뉴가 열린 상태에서 배경 콘텐츠가 계속 스크롤되어 사용자의 읽기 위치를 잃을 수 있던 결함을 PR #98에서 보완했다. backdrop, `overflow: hidden`, 배경 버튼 닫힘과 닫힌 뒤 복원을 확인했으며 새 치명적 결함은 확인되지 않았다.
- PR #98 checks, main `37104179510`, live validator, 390/1440px CDP를 재확인했다. 이번 변경으로 새 과학·제품 주장은 추가되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS`, `E-CDP-MOBILE-MENU-FOCUS`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS`.

## Latest Red-Team Recheck — cf2f123 — 2026-10-03

- 기존 비교 도표의 장식형 신호가 효과 크기처럼 읽힐 가능성을 PR #96에서 증가·감소 방향 화살표와 명시적 라벨로 보완했다. 320px 조건명 중간 줄바꿈도 수정했으며 새 치명적 결함은 확인되지 않았다.
- PR #96 checks, main `37103072296`, live validator, 390/1440px CDP를 재확인했다. 이번 변경으로 새 과학·제품 주장은 추가되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-OUTCOME-DIRECTION`, `E-CDP-RESEARCH-OUTCOME-DIRECTION`, `E-DEPLOY-PIPELINE-RESEARCH-OUTCOME-DIRECTION`, `E-LIVE-PUBLIC-RESEARCH-OUTCOME-DIRECTION`.

## Latest Red-Team Recheck — b1afe87 — 2026-10-03

- 전문가 영상이 늘어나면 단일 그리드 탐색성이 떨어질 수 있었던 점을 PR #94에서 주제 필터·영상 수·활성 상태로 보완했다. 모바일에서 filter min-content expansion을 발견해 `min-width: 0`으로 수정했고, 활성 칩은 중앙 정렬된다. 새 치명적 결함은 확인되지 않았다.
- PR #94 checks, main `37101931045`, live validator, 390/1440px CDP를 재확인했다. 이번 변경으로 새 과학·제품 주장은 추가되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-FILTER`, `E-CDP-EXPERT-VIDEO-FILTER`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-FILTER`, `E-LIVE-PUBLIC-EXPERT-VIDEO-FILTER`.

## Latest Red-Team Recheck — bed5bf3 — 2026-10-03

- 이전 동일 길이 리본은 시각적으로 두 조건이 같은 값처럼 읽힐 수 있었다. PR #92에서 1·2단계 상대 방향 신호를 추가하고 조건명을 `비교 조건`·`GABA 섭취`로 중립화했다. 신호 개수는 실제 효과 크기나 수치를 뜻하지 않는다는 안내도 함께 확인했다.
- PR #92 checks, main workflow `37100751730`, live validator, 390/1440px Chrome CDP에서 변경된 도표·가로 폭·runtime errors `[]`를 재확인했다. 이번 변경으로 새 치명적 결함이나 새 과학·제품 주장은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-QUALITATIVE-DIRECTION`, `E-CDP-QUALITATIVE-DIRECTION`, `E-DEPLOY-PIPELINE-QUALITATIVE-DIRECTION`, `E-LIVE-PUBLIC-QUALITATIVE-DIRECTION`.

## Latest Red-Team Recheck — 0257636 — 2026-10-03

- 이전 비교 도표의 임의 막대 길이는 실제 효과 크기처럼 읽힐 수 있었다. PR #89에서 이를 제거하고 같은 길이의 점선·실선 조건 리본으로 바꿔, 보고된 숫자와 시각적 크기를 혼동할 가능성을 줄였다. 카드 문구도 정성적 변화 방향을 보여주는 표현으로 정리됐다.
- PR #89의 로컬·배포 검증, PR #90의 TF heartbeat 복구, 최종 main workflow `37099561557`, 라이브 validator, 390/1440px CDP에서 새 도표·가로 폭·runtime errors `[]`를 재확인했다. 이번 변경으로 새 치명적 결함은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-QUALITATIVE-COMPARISON`, `E-CDP-QUALITATIVE-COMPARISON`, `E-DEPLOY-PIPELINE-QUALITATIVE-COMPARISON`, `E-LIVE-PUBLIC-QUALITATIVE-COMPARISON`, `E-NAVI-TF-HEARTBEAT-REFRESH`.

## Latest Red-Team Recheck — 698f1fb — 2026-10-03

- 모바일에서 14장 중 첫 6장만 보이던 진행 맵은 후속 단계가 숨겨져 있다는 점에서 실제 독해 흐름을 약화시킬 수 있었고, PR #87에서 7×2 전체 표시로 보완됐다. 320px·390px에서 01–14 단계와 마지막 카드 선택을 확인했다.
- 이번 변경은 과학 카피·제품 효능·제품 CTA를 추가하지 않았고, 카드 자동 전환과 수동 조작을 유지했다. 새 치명적 결함은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 독해성은 자동화·CDP만으로 닫을 수 없으므로 계속 `OPEN`이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-MOBILE`, `E-CDP-RECOVERY-MAP-MOBILE`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-MOBILE`, `E-LIVE-PUBLIC-RECOVERY-MAP-MOBILE`.

## Latest Red-Team Recheck — 3b75bae — 2026-10-03

- 공개 `/research/`에 제품 CTA와 제품 브랜드가 섞여 연구 읽기 흐름을 방해하던 결함은 PR #85에서 제거됐다. 390px 라이브 CDP에서 제품 CTA·`view=products`·SmartStore 연결이 모두 없고 연구 조건·출처가 카드 안에 남아 있는 것을 확인했다.
- 이 보완은 RT-002의 제품 효능처럼 재해석될 가능성을 낮추지만, 자동 카피 검사가 독립 과학·규제 감수를 대신하지는 않으므로 RT-002는 `OPEN`으로 유지한다. RT-001 브라우저 범위와 RT-003 실제 고령 사용자 독해성도 그대로 `OPEN`이다.
- 결과는 `PASS_WITH_CONDITIONS`를 유지한다. 새 과학 주장이나 제품 효능 주장을 추가하지 않았고, 공개 경로의 제품 독립 경계만 명확히 했다.

증적: `E-LOCAL-BUILD-RESEARCH-PRODUCT-FREE`, `E-CDP-RESEARCH-PRODUCT-FREE`, `E-DEPLOY-PIPELINE-RESEARCH-PRODUCT-FREE`, `E-LIVE-PUBLIC-RESEARCH-PRODUCT-FREE`.

## Recheck — 2026-10-03 — a0ee159

- 모바일 연구 카드에서 `출처`와 인용 링크가 시각적으로 붙어 읽히던 결함을 확인하고, `출처 ·` 라벨과 원문 링크를 분리했다. 390px 공개본에서 성장호르몬 연구 카드의 출처 계층·가로 폭·runtime errors를 다시 확인했다.
- PR #83 checks와 main workflow `37095659387`, 라이브 validator가 통과했다. 공개 데이터·연구 카피·제품 독립 경계와 teaser HOLD는 변하지 않았다.
- 새 치명적 결함은 확인되지 않았고 결과는 `PASS_WITH_CONDITIONS`를 유지한다. Browser 플러그인 미사용으로 CDP fallback을 사용했으며 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-RESEARCH-SOURCE-LABEL`, `E-CDP-RESEARCH-SOURCE-LABEL`, `E-DEPLOY-PIPELINE-RESEARCH-SOURCE-LABEL`, `E-LIVE-PUBLIC-RESEARCH-SOURCE-LABEL`.

## Recheck — 2026-10-03 — 10aedca

- 이미 재생 중인 전문가 영상 카드를 다시 선택하는 시나리오에서 준비 완료 iframe을 다시 로딩 상태로 되돌릴 수 있는 예외를 확인하고, 새 영상 선택과 동일 영상 재선택을 분리했다. 동일 영상 재선택 후에도 autoplay iframe·`재생 중`·`aria-pressed=true`·로딩 완료·가로 폭 390px을 재확인했다.
- PR #81 checks와 main workflow `37094629598`, 라이브 validator가 통과했다. 공개 데이터·연구 카피·제품 독립 경계와 teaser HOLD는 변하지 않았다.
- 새 치명적 결함은 확인되지 않았고 결과는 `PASS_WITH_CONDITIONS`를 유지한다. Browser 플러그인 미사용으로 CDP fallback을 사용했으며 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-VIDEO-RESELECT`, `E-CDP-VIDEO-RESELECT`, `E-DEPLOY-PIPELINE-VIDEO-RESELECT`, `E-LIVE-PUBLIC-VIDEO-RESELECT`.

## Recheck — 2026-10-03 — 4604805

- 전문가 영상 목록에서 현재 선택된 카드가 분명하지 않은 상태를 확인하고, 선택 카드에 `재생 중` 배지를 추가했다. 390px 로컬·라이브에서 선택 상태, autoplay iframe, 가로 폭과 runtime errors를 다시 확인했다.
- PR #79 checks와 main workflow `37093519815`, live validator가 통과했다. 공개 데이터·연구 카피·제품 독립 경계와 teaser HOLD는 변하지 않았다.
- 새 치명적 결함은 확인되지 않았고 결과는 `PASS_WITH_CONDITIONS`를 유지한다. Browser 플러그인 미사용으로 CDP fallback을 사용했으며 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-VIDEO-SELECTION-STATE`, `E-CDP-VIDEO-SELECTION-STATE`, `E-DEPLOY-PIPELINE-VIDEO-SELECTION-STATE`, `E-LIVE-PUBLIC-VIDEO-SELECTION-STATE`.

## Recheck — 2026-10-03 — 95c3830

- 전문가 영상 선택 직후의 검은 빈 iframe 인상을 재현하고, iframe 로딩 중 상태 문구·오버레이를 추가해 사용자가 고장으로 오인할 가능성을 낮췄다. 로컬 390px에서는 로딩 상태, 라이브 390px에서는 autoplay iframe과 로드 완료 상태를 확인했다.
- PR #77 checks와 main workflow `37092613987`, live validator가 통과했다. 공개 데이터·연구 카피·제품 독립 경계와 teaser HOLD는 변하지 않았다.
- 새 치명적 결함은 확인되지 않았고 결과는 `PASS_WITH_CONDITIONS`를 유지한다. Browser 플러그인 미사용으로 CDP fallback을 사용했으며 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-VIDEO-LOADING`, `E-CDP-VIDEO-LOADING`, `E-DEPLOY-PIPELINE-VIDEO-LOADING`, `E-LIVE-PUBLIC-VIDEO-LOADING`.

## Recheck — 2026-10-03 — 79eea1f

- 768px·820px 태블릿에서 기존 데스크톱 메뉴가 공유 버튼을 화면 밖으로 밀어내던 실패 모드를 확인했고, 701–860px 아이콘 메뉴 전환으로 보완했다. 메뉴·큰 글씨·공유 동작, 모바일 회복 이동, 데스크톱 진행 상태를 다시 실행했으며 새 치명적 결함과 runtime errors는 확인되지 않았다.
- PR #75와 main workflow `37091703892`, 라이브 validator, 768/820/390/1440px Chrome CDP fallback이 통과했다. 공개 데이터·연구 카피·제품 독립 경계와 teaser HOLD는 변하지 않았다.
- 결과는 `PASS_WITH_CONDITIONS`를 유지한다. Browser 플러그인 미사용으로 CDP fallback을 사용했으며 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

증적: `E-LOCAL-BUILD-TABLET-HEADER`, `E-CDP-TABLET-HEADER`, `E-DEPLOY-PIPELINE-TABLET-HEADER`, `E-LIVE-PUBLIC-TABLET-HEADER`.

## Recheck — 2026-10-03 — e5f1eab

- 전역 메뉴에서 `수면과 회복`을 바로 선택할 수 있게 해 긴 페이지의 핵심 회복 흐름 접근성을 높였고, 읽기 진행 안내를 단일 보조기기 상태로 정리했다. 모바일 메뉴가 sticky 진행 바에 가려지던 레이어 결함도 보완했다. 새 과학 주장·제품 광고·출처 변경은 없었다.
- PR #73 checks와 main workflow `37090787855`, 라이브 validator, 390/1440px Chrome CDP fallback이 통과했다. 모바일 메뉴 선택은 메뉴 닫힘·해시·현재 메뉴 표시·`수면과 회복 02 / 12`까지 실제 상태로 확인했고, 새 레이아웃 결함과 runtime errors는 확인되지 않았다.
- 새 치명적 결함은 확인되지 않았고 결과는 `PASS_WITH_CONDITIONS`를 유지한다. Browser 플러그인 미사용으로 CDP fallback을 사용했으며 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

## Recheck — 2026-10-03 — 288a883

- 수면과 회복 인터스티셜을 sticky 진행 표시의 별도 맥락으로 연결해 `수면과 회복 02 / 12`에서 `연구 지도 03 / 12`로 이어지는 방향성을 보완했다. 새 과학 주장·제품 광고·출처 변경은 없었다.
- PR #70과 main push `37089334725`, 문서 동기화 main push `37089833696`의 자동 검사·Pages 배포·라이브 validator가 통과했고, 390px·1440px 대표 렌더에서 가로 넘침·runtime errors 없이 진행 표시 전환과 지도 클릭 후 `인지` 활성 흐름을 확인했다.
- 새 치명적 결함은 확인되지 않았고 결과는 `PASS_WITH_CONDITIONS`를 유지한다. Browser 플러그인 미사용으로 CDP fallback을 사용했으며 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

## Recheck — 2026-10-03 — 48f4876

- 연구 상세 카드를 읽는 동안 지도에서 현재 연구 주제를 활성화해 긴 모바일 페이지의 방향 감각을 보완했다. 새 과학 주장·제품 광고·출처 변경은 없었다.
- PR #68과 main push `37088047547`의 자동 검사·Pages 배포·라이브 validator가 통과했고, 390px·1440px 대표 렌더에서 지도 클릭 → 상세 카드 → `인지` 활성 흐름과 새 레이아웃 결함 부재를 확인했다.
- 새 치명적 결함은 확인되지 않았고 결과는 `PASS_WITH_CONDITIONS`를 유지한다. Browser 플러그인 미사용으로 CDP fallback을 사용했으며 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

## Recheck — 2026-10-03 — d3ff9e3

- 연구 지도 항목을 버튼으로 연결해 탐색성을 높였지만 새 과학 주장·제품 광고·출처 변경은 없었다. 모바일에서 첫 지도 항목을 선택하면 첫 상세 카드로 이어지는 실제 동작을 확인했다.
- PR #66과 main push `37086967211`의 자동 검사·Pages 배포·라이브 validator가 통과했고, 390px·1440px 대표 렌더에서 새 레이아웃 결함은 확인되지 않았다.
- 새 치명적 결함은 확인되지 않았고 결과는 `PASS_WITH_CONDITIONS`를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

## Recheck — 2026-10-03 — e514a37

- 연구 지도 아래 읽기 순서를 01–04 시각 레일로 바꾼 뒤 390px에서 단계 구분·연결선·본문 가독성을 확인하고, 1440px에서 연구 지도와 기존 여백이 유지되는지 확인했다.
- PR #64와 main push `37085785228`의 자동 검사 및 live validator가 통과했다. 새 연구 주장이나 제품 광고는 추가하지 않았다.
- 새 치명적 결함은 확인되지 않았고 결과는 `PASS_WITH_CONDITIONS`를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

## Recheck — 2026-10-03 — 0147e3c

- 모바일 히어로의 편집 안내와 `3분 읽기` 레일에 읽기 표면을 추가한 뒤 320/390px에서 문장 대비와 가로 폭을 확인하고, 1440px에서 데스크톱 레이아웃 회귀가 없는지 확인했다.
- PR #62와 main push `37084454201`의 자동 검사 및 live validator가 통과했다. 이 변경은 새로운 과학 주장이나 제품 광고를 추가하지 않았다.
- 새 치명적 결함은 확인되지 않았고 결과는 `PASS_WITH_CONDITIONS`를 유지한다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다.

## Recheck — 2026-10-03 — 078d231

- 읽기 진행 바가 연구 카드의 스크롤 콘텐츠를 비추던 시각 결함을 확인하고 불투명 레이어로 보정했다. 320/390/1440px CDP에서 진행 안내·연구 결과 분리가 유지되고 새 runtime error는 없었다.
- PR #60 및 main push `37082824190`의 자동 검사와 라이브 validator가 통과했다. 이 변경은 연구 카피·제품 경계·출처를 변경하지 않았다.
- 기존 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이며 `PASS_WITH_CONDITIONS`를 유지한다.

## Recheck — 2026-10-03 — 7a64726

- 읽기 진행 표시의 접근성·가독성 보완과 사용하지 않는 구형 챌린지 이미지 제거는 `E-LOCAL-BUILD-READING-PROGRESS`, `E-CDP-READING-PROGRESS`, `E-DEPLOY-PIPELINE-READING-PROGRESS`, `E-LIVE-PUBLIC-READING-PROGRESS`로 확인됐다.
- 이 변경은 과학 카피의 의미나 제품 독립 경계를 확장하지 않았고, 새 치명적 결함은 확인되지 않았다. 기존 RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 그대로 OPEN이다.
- 결과는 `PASS_WITH_CONDITIONS`를 유지하며, 외부 과학·규제 감수와 대표 실기기·실사용자 검증 전에는 `COMPLETED`로 승격하지 않는다.

- Result: PASS_WITH_CONDITIONS
- Reviewer: 독립 omission·failure-mode work pass
- Reviewer ID: NAVI-REDTEAM-GABA-20261002
- Date: 2026-10-02

## Required questions

- Most likely failure cause: 공개 카피가 소비자에게 의학적 효능 보장처럼 읽히거나 브라우저별 레이아웃 차이가 라이브에서 드러나는 경우다.
- Outside expert criticism: 자동화된 결과·도표 검증과 독립적인 과학·규제 감수는 서로 다른 증거라고 지적할 것이다.
- User-needed but unrequested consideration: 실제 고령 사용자 독해성 테스트, Safari·실기기 시각 QA, 변경 시 연구 근거 재검토가 필요하다.
- Why the result could become useless: 새로운 영상·연구·카피가 추가되면서 현재의 제품 독립 경계와 출처 연결이 깨질 수 있다.
- Shared false assumption: 화면 크기와 자동 검사를 통과하면 모든 사용자의 이해도와 브라우저 품질이 보장된다고 가정할 위험이 있다.
- Missing stakeholder: 독립 과학 감수자, 규제·광고 검토자, 고령 사용자 대표다.
- Most dangerous UNKNOWN: 건강 관련 공개 문구가 외부 공유 과정에서 효능 주장으로 확대되는지 여부다.

## Findings

| ID | Severity | Lens | Evidence / Reasoning | Impact | Required Fix | Owner | Status |
|---|---|---|---|---|---|---|---|
| RT-001 | MAJOR | 브라우저 범위 | E-CDP-DESKTOP, E-CDP-MOBILE만으로 모든 브라우저·실기기를 보장할 수 없음 | 라이브에서 폰트·sticky·이미지 차이가 생길 수 있음 | Safari/iOS/Android 대표 환경 검증을 추가하거나 미검증 범위를 계속 표시 | QA | OPEN |
| RT-002 | MAJOR | 과학 카피 오인 | E-RESEARCH-COPY와 화면은 경계를 보여주지만 공유 과정의 재해석을 통제하지 않음 | 연구 결과가 효능 단정으로 확산될 수 있음 | 독립 과학·규제 감수와 공유용 카피 변경 감시 추가 | 콘텐츠 책임자 | OPEN |
| RT-003 | MINOR | 사용자 이해도 | E-CDP-MOBILE은 레이아웃만 증명하고 실제 고령 사용자 이해도는 증명하지 않음 | “한번에 읽히는가”의 실제 검증이 부족함 | 3~5명 사용성 테스트 또는 읽기 시간·이해도 측정 | UX QA | OPEN |

## Result Notes

치명적 결함은 발견하지 않았지만, 위 조건을 해결하기 전 `COMPLETED`로 표시하지 않는다.

## Recheck — 2026-10-06 — 8a6eeb6

- 인지 연구 비교 도표의 `GABA 결과` 라벨을 `GABA를 섭취한 그룹의 변화`로 바꿔 소비자 문장 흐름을 보정했다. 연구 수치·결과·해석·출처·제품 독립 경계는 바뀌지 않았다.
- PR #434, main workflow `37418115559`, 공개 validator와 Chromium fallback 390·1440px 검증이 성공했고 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

## Recheck — 2026-10-06 — 9b6df19

- 280px 공개 화면에서 진행 레일의 시각 문구를 한 줄로 정리했으며 document scrollWidth가 viewport와 같고 page/console errors 0을 확인했다. 새 CRITICAL/MAJOR 코드 결함은 발견되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

## Recheck — 2026-10-06 — 06013ba

- 초소형 모바일 헤더의 읽기 크기 조절 `글자` 라벨과 크기 표식을 키워 고령 사용자가 기능을 더 쉽게 인지하도록 보정했다. 280·320·390·1440px 공개 Chromium fallback에서 컨트롤 폭·가로폭·page/console errors 0을 확인했고 새 CRITICAL/MAJOR 코드 결함은 발견하지 않았다.
- stale TF pulse로 멈춘 최초 main run은 heartbeat 전용 PR #441과 최종 workflow `37423305842`로 복구됐으며, 외부 공개 데이터·연구 카피는 변경하지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

## Recheck — 2026-10-06 — 83dc4e5a

- 280px에서 비교 도표 결과 라벨이 오른쪽으로 잘리던 반응형 결함을 확인하고, 350px 이하에서 자연어 라벨을 두 줄로 감싸도록 보정했다. 320·390·1440px 구조와 연구 내용은 유지했다.
- PR #436, main workflow `37419534993`, 공개 validator와 Chromium fallback 280·320·390·1440px 검증이 성공했고 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

## Recheck — 2026-10-06 — e80cd52b

- 초소형 모바일 재감리에서 수면 연구 도표가 번호 열 폭에 갇혀 비교 안내와 조건 카드가 잘릴 수 있는 별도 결함을 확인했다. 350px 이하에서 도표를 연구 카드 전체 폭으로 확장하고 비교 안내 제목을 줄바꿈하는 수정이 반영됐다.
- PR #438, main workflow `37420961105`, 공개 validator와 Chromium fallback 280·320·390·1440px 검증이 성공했고 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

## Recheck — 2026-10-06 — bd8717b

- 701–900px 태블릿 헤더에서 읽기 크기 조절 기능이 `가+`만으로 보이던 의미 전달 리스크를 확인하고, `글자` 라벨을 함께 표시하도록 보정했다. 44px 터치 영역·72px 컨트롤 폭·1024px 이상 데스크톱 전환을 유지했다.
- PR #443, main workflow `37424970431`, 공개 validator와 Chrome fallback 701·768·820·900·1024px 검증이 성공했고 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

## Recheck — 2026-10-06 — 550b4eb

- 390px 히어로 강조 문구와 헤더 읽기 크기 명칭의 충돌을 보정했으며 390·768·1024px에서 폭 내 렌더링과 page/console errors 0을 확인했다. 새 CRITICAL/MAJOR 코드 결함은 발견되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

## Recheck — 2026-10-06 — 32612fe

- 모바일 전문가 영상 공유 링크에서 선택 주제가 레일 밖에 남는 탐색 리스크를 확인했고, `activeVideoTopic` 변경 시 선택 칩을 레일 안으로 자동 정렬하는 보정으로 rework했다.
- 공개 Chrome CDP fallback 390px에서 `수용체` 칩의 레일 내 위치, 선택 영상·원본 링크·공유 버튼·가로폭 390px·page/console errors 0을 재확인했다. 연구 수치·출처·제품 독립 경계는 변경하지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-TOPIC-RAIL-20261006`, `E-UI-CONTRACT-EXPERT-TOPIC-RAIL-20261006`, `E-CDP-EXPERT-TOPIC-RAIL-20261006`, `E-DEPLOY-PIPELINE-EXPERT-TOPIC-RAIL-20261006`, `E-LIVE-PUBLIC-EXPERT-TOPIC-RAIL-20261006`.

## Recheck — 2026-10-06 — 39cb1c9

- Red-team finding: 이전 연구 지도는 연결선은 명확했지만 중심과 확장 구조의 시각적 위계가 약해, 넓은 화면에서 빈 공간으로 읽힐 수 있었다. 저위험 CSS 보정으로 동심원·중심 신호·배경 리듬을 추가했다.
- Recheck: 280·390·1440px local and 390px public Chrome CDP fallback; document/body scrollWidth matched viewport; page/console errors 0; no science/copy/product changes.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-RHYTHM-20261006`, `E-UI-CONTRACT-RESEARCH-MAP-RHYTHM-20261006`, `E-CDP-RESEARCH-MAP-RHYTHM-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-RHYTHM-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-RHYTHM-20261006`.

## Recheck — 2026-10-06 — 65eed515

- Red-team finding: 연구 지도는 시각적으로 정리됐지만 첫 진입에서 활성 주제가 없어 다음 읽을 카드가 즉시 지정되지 않는 작은 흐름 단절이 있었다. 첫 연구 주제 `인지`를 기본 선택으로 연결하고, 공유 해시는 계속 우선하도록 보정했다.
- Recheck: local/public 390px Chrome CDP fallback; default `인지`, `피부` 선택 후 card/hash/progress synchronization, document/body scrollWidth 390px, page/console errors 0; no science/copy/product changes.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-FIRST-20261006`, `E-UI-CONTRACT-RESEARCH-MAP-FIRST-20261006`, `E-CDP-RESEARCH-MAP-FIRST-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-FIRST-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-FIRST-20261006`.

## Recheck — 2026-10-06 — 4c370795

- Red-team finding: 대규모 Git history에서 privacy audit 자체가 `ENOBUFS`로 중단될 수 있던 운영 도구 결함을 확인했다. stdout pipe 대신 저장소 밖 임시 파일로 처리하고, 감사 종료 후 삭제하도록 rework했다.
- Recheck: `node --check`, `pnpm run audit:history-privacy` exit 0, main release workflow의 history privacy test·reachable history review 성공, 공개 validator candidate `4c370795`·HTTP 200·71 bundle hashes 확인. 실제 매칭 값은 계속 출력하지 않는다.
- 연구 수치·출처·제품 독립 공개 경계는 변경하지 않았다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-HISTORY-AUDIT-STREAM-20261006`, `E-DEPLOY-PIPELINE-HISTORY-AUDIT-STREAM-20261006`, `E-LIVE-PUBLIC-HISTORY-AUDIT-STREAM-20261006`.

## Recheck — 2026-10-06 — 86c869ed

- Red-team finding: 280px 연구 화면에서 진행 레일의 전체 연구 라벨이 말줄임되어 현재 주제와 수치가 즉시 읽히지 않는 작은 가독성 리스크가 있었다. 350px 이하에서만 시각 라벨을 현재 주제명으로 압축하고, 전체 문구는 aria-label과 live announcement에 남겼다.
- Recheck: 공개 Chrome CDP fallback 280·390·768·1440px에서 `인지`, 진행 수치, `인지 연구 결과`가 표시되고 document/body scrollWidth 280·390·753·1425px, page/console errors 0을 확인했다. 연구 수치·출처·제품 독립 경계는 변경하지 않았다.
- PR #457과 main workflow `37439945690`, 공개 validator candidate `86c869ed`·HTTP 200·71 bundle hashes가 성공했다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-NARROW-RESEARCH-LABEL-20261006`, `E-UI-CONTRACT-NARROW-RESEARCH-LABEL-20261006`, `E-CDP-NARROW-RESEARCH-LABEL-20261006`, `E-DEPLOY-PIPELINE-NARROW-RESEARCH-LABEL-20261006`, `E-LIVE-PUBLIC-NARROW-RESEARCH-LABEL-20261006`.

## Recheck — 2026-10-06 — 449d65a

- Red-team finding: 긴 `GABA를 섭취한 그룹의 변화` 라벨이 390px 비교 도표 안에서 핵심 결과보다 시선을 끌고 반복되어, 일반 소비자가 두 조건의 차이를 빠르게 읽기 어려웠다. 시각 라벨을 `GABA 그룹`으로 줄이고 `뇌파 변화`·`활력 점수`·`비교 조건`과 결과 요약의 위계를 유지했다.
- Recheck: 공개 Chrome CDP fallback 390x844 deep link에서 `GABA 그룹`·`비교 조건`·`덜 줄었습니다`가 표시되고 긴 라벨은 없으며 document/body scrollWidth 375px, page/console errors 0을 확인했다. 연구 수치·출처·접근성 설명·제품 독립 경계는 변경하지 않았다.
- PR #459, main workflow `37442415197`, 공개 validator candidate `449d65a`·HTTP 200·71 bundle hashes가 성공했다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-COMPARISON-VERDICT-20261006`, `E-UI-CONTRACT-COMPARISON-VERDICT-20261006`, `E-CDP-COMPARISON-VERDICT-20261006`, `E-DEPLOY-PIPELINE-COMPARISON-VERDICT-20261006`, `E-LIVE-PUBLIC-COMPARISON-VERDICT-20261006`.

## Recheck — 2026-10-06 — 81c91d2

- Red-team finding: 비교 도표의 결과 요약은 `GABA 그룹`인데 조건 레인은 `GABA 섭취`로 표시되어 모바일 독자가 같은 대상을 한 번 더 해석해야 했다. 인지·수면 비교 도표의 조건 레인과 결과 요약을 `GABA 그룹`으로 통일했다.
- Recheck: 공개 Chrome CDP fallback 390x844 deep link에서 두 비교 레인과 결과 요약에 `GABA 그룹`이 표시되고 `GABA 섭취`는 해당 도표에서 사라졌으며 document/body scrollWidth 375px, page/console errors 0을 확인했다. 연구 내용·수치·출처·접근성 설명·제품 독립 경계는 변경하지 않았다.
- PR #461, main workflow `37444743950`, 공개 validator candidate `81c91d2`·HTTP 200·71 bundle hashes가 성공했다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-UI-CONTRACT-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-CDP-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-DEPLOY-PIPELINE-COMPARISON-LABEL-CONSISTENCY-20261006`, `E-LIVE-PUBLIC-COMPARISON-LABEL-CONSISTENCY-20261006`.

## Recheck — 2026-10-06 — de96345

- Red-team finding: 국내외 활용 카드에는 지역·분야 정보가 있었지만 카드 간 순서가 시각적으로 명시되지 않아 모바일에서 국내·일본·세계의 흐름을 한 번 더 해석해야 했다. 카드 상단에 `01 / 03`, `02 / 03`, `03 / 03` 표식을 추가했다.
- Recheck: 공개 Chrome CDP fallback 390x844·1440x900에서 세 표식, 이미지·본문 계층, document/body scrollWidth 375·1425px, page/console errors 0을 확인했다. 활용 다음 장 버튼은 `#applications`에서 `#fermented-safety`로 이동했다. 연구 카피·수치·출처·제품 독립 경계는 변경하지 않았다.
- PR #463, main workflow `37447228688`, 공개 validator candidate `de96345`·HTTP 200·71 bundle hashes가 성공했다. RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이며 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-APPLICATION-FLOW-INDEX-20261006`, `E-UI-CONTRACT-APPLICATION-FLOW-INDEX-20261006`, `E-CDP-APPLICATION-FLOW-INDEX-20261006`, `E-DEPLOY-PIPELINE-APPLICATION-FLOW-INDEX-20261006`, `E-LIVE-PUBLIC-APPLICATION-FLOW-INDEX-20261006`.

## Recheck — 2026-10-06 — 8201ad4

- Red-team finding: 국내외 활용 카드의 순서 표식이 기능에 비해 작고 낮은 대비로 보여 고령 독자가 국내·일본·세계 흐름을 즉시 인지하기 어려웠다. `.guide-application-order`의 글자 크기·굵기·색 대비를 강화해 rework했다.
- Recheck: 로컬 UI 계약·typecheck·127개 테스트·production build·정적 번들·성능 예산과 공개 Chrome CDP fallback 390·1440px에서 강화된 표식, 카드 흐름, 가로폭, page/console errors 0을 확인했다. 연구 내용·수치·출처·제품 독립 경계는 변경하지 않았다.
- PR #465와 main workflow `37449714953`, 공개 validator candidate `8201ad4`·HTTP 200·71 bundle hashes가 성공했다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-UI-CONTRACT-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-CDP-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-DEPLOY-PIPELINE-APPLICATION-FLOW-MARKER-CONTRAST-20261006`, `E-LIVE-PUBLIC-APPLICATION-FLOW-MARKER-CONTRAST-20261006`.

## Recheck — 2026-10-06 — fc61732

- Red-team finding: 351–380px 모바일 헤더에서 읽기 크기 조절 기능이 아이콘만 남아 고령 독자에게 의미가 즉시 전달되지 않는 가독성 잔여 리스크가 있었다. 해당 폭에만 `가+ 글자` compact label과 60x44px 컨트롤을 적용하고 메뉴·공유 버튼과의 간격을 재배치했다.
- Recheck: 공개 Chrome CDP fallback 360px에서 `가+ 글자` 표시, 메뉴·공유 비충돌, 큰 글씨 전환에 따른 `aria-pressed`·라벨 상태 변경, document scrollWidth 360, page errors 0을 확인했다. 연구 내용·수치·출처·제품 독립 경계는 변경하지 않았다.
- PR #467, main merge `fc61732`, 재시작 workflow `37453296672`, 공개 validator candidate `fc61732`·HTTP 200·71 bundle hashes가 성공했다. 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- RT-001 브라우저 범위, RT-002 과학·규제 감수, RT-003 실제 고령 사용자 이해도는 계속 OPEN이다. 결과는 `PASS_WITH_CONDITIONS`를 유지한다.

증적: `E-LOCAL-BUILD-MID-NARROW-TYPE-CONTROL-20261006`, `E-UI-CONTRACT-MID-NARROW-TYPE-CONTROL-20261006`, `E-CDP-MID-NARROW-TYPE-CONTROL-20261006`, `E-DEPLOY-PIPELINE-MID-NARROW-TYPE-CONTROL-20261006`, `E-LIVE-PUBLIC-MID-NARROW-TYPE-CONTROL-20261006`.

## 연구 결과 카드 순번·공개 배포 — 2026-10-06 — 9ee09d8

- 공격 관점에서 긴 연구 섹션을 카드 단위로 읽을 때 현재 카드와 전체 카드 수를 빠르게 파악할 수 있는지 확인했다. 인지 `01 / 05`, 피부 `02 / 05`가 카드 제목과 상단 연구 진행 레일에 일치해 표시되며 390px 직접 링크에서도 앵커가 레일 아래에 정렬된다.
- 연구 결과·수치·출처·제품 독립 공개 경계는 변경되지 않았고, UI 계약·배포 workflow·라이브 validator가 공개 SHA와 일치한다. 새 CRITICAL/MAJOR 결함은 없다.
- 표시 순번은 화면 가독성 개선을 증명하지만 실제 고령 사용자 이해도나 Safari/iOS/Android 실기기 동작을 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-RESEARCH-CARD-MARKER-20261006`, `E-CDP-RESEARCH-CARD-MARKER-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-CARD-MARKER-20261006`, `E-LIVE-PUBLIC-RESEARCH-CARD-MARKER-20261006`.

## 연구 지도 영역 순서·공개 배포 — 2026-10-06 — a66d8e5

- 공격 관점에서 연구 지도 카드 5개를 처음부터 끝까지 읽을 때 전체 순서가 즉시 보이는지 확인했다. 모바일·데스크톱 모두 `01 / 05`–`05 / 05`가 유지되고 카드 폭과 상단 진행 레일이 충돌하지 않는다.
- 학술 내용·수치·출처·제품 독립 공개 경계는 변경되지 않았고, UI 계약·배포 workflow·라이브 validator가 공개 SHA와 일치한다. 새 CRITICAL/MAJOR 결함은 없다.
- 순서 표식은 시각적 탐색성을 높이지만 실제 고령 사용자 이해도나 Safari/iOS/Android 실기기 동작을 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-ACADEMIC-MAP-SEQUENCE-20261006`, `E-CDP-ACADEMIC-MAP-SEQUENCE-20261006`, `E-DEPLOY-PIPELINE-ACADEMIC-MAP-SEQUENCE-20261006`, `E-LIVE-PUBLIC-ACADEMIC-MAP-SEQUENCE-20261006`.

## 일상 속 GABA 카드 순서·공개 배포 — 2026-10-06 — df90375

- 공격 관점에서 일상 카드 5장을 연속으로 읽을 때 현재 카드와 전체 카드 수를 바로 파악할 수 있는지 확인했다. 모바일·데스크톱 모두 `01 / 05`–`05 / 05`가 유지되고 카드 폭과 섹션 정렬이 안정적이다.
- 카드 문구·과학 정보·출처·제품 독립 공개 경계는 변경되지 않았고, UI 계약·배포 workflow·라이브 validator가 공개 SHA와 일치한다. 새 CRITICAL/MAJOR 결함은 없다.
- 순서 표식은 시각적 탐색성을 높이지만 실제 고령 사용자 이해도나 Safari/iOS/Android 실기기 동작을 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-EVERYDAY-CARD-SEQUENCE-20261006`, `E-CDP-EVERYDAY-CARD-SEQUENCE-20261006`, `E-DEPLOY-PIPELINE-EVERYDAY-CARD-SEQUENCE-20261006`, `E-LIVE-PUBLIC-EVERYDAY-CARD-SEQUENCE-20261006`.

## 전문가 영상 카드 순서·공개 배포 — 2026-10-06 — a84d6f0

- 공격 관점에서 전문가 영상 갤러리를 처음부터 끝까지 읽을 때 현재 영상과 전체 영상 수를 한 번에 파악할 수 있는지 확인했다. 모바일·데스크톱 모두 `01 / 09`–`09 / 09`가 유지되고 `수면` 필터에서도 원래 컬렉션 순서가 유지된다.
- 카드 선택 즉시 재생, 제목·출처 표시, 필터 결과, 공개 정적 번들 및 제품 독립 경계를 확인했으며 새 CRITICAL/MAJOR 결함은 없다.
- 순서 표식과 CDP 검증은 시각적 탐색성을 높이는 증거지만 실제 고령 사용자 이해도, Safari/iOS/Android 실기기 동작, 독립 과학·규제 감수를 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-CDP-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-CARD-SEQUENCE-20261006`, `E-LIVE-PUBLIC-EXPERT-VIDEO-CARD-SEQUENCE-20261006`.

## 모바일 연구 비교 도표 재감사 — e2ef8f0 — 2026-10-06

- Red-team finding: 기존 비교 도표는 모바일에서 각 조건 카드와 GABA 결과 문구가 반복되어 한 지표의 결론을 읽는 데 세로 이동이 필요했다. 351–700px 구간에서 결과 요약 띠와 비교·GABA 컴팩트 레인을 한 행 단위로 재배치했다.
- Recheck: 공개 Chrome CDP fallback 390x844·1440x900에서 인지 연구 카드 5개, chartHeight 661.265625px·482.53125px, pageWidth 390·1425, runtime/console/http errors 0을 확인했다. 데스크톱 도표의 조건별 막대·읽는 법·실제 측정값이 아닌 방향 도식 설명은 유지된다.
- PR #482와 main workflow `37467358386`, 공개 validator candidate `e2ef8f0`가 성공했다. 연구 카피·수치·출처·제품 독립 공개 경계는 변경하지 않았고 새 CRITICAL/MAJOR 코드 결함은 확인되지 않았다.
- 컴팩트 도표 검증은 시각 스캔성의 증거이며 실제 고령 사용자 이해도나 Safari/iOS/Android 실기기 동작을 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이며 결과는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-RESEARCH-COMPARISON-SCAN-20261006`, `E-CDP-RESEARCH-COMPARISON-SCAN-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-COMPARISON-SCAN-20261006`, `E-LIVE-PUBLIC-RESEARCH-COMPARISON-SCAN-20261006`.

## 전문가 영상 중간 모바일 프레임 — 2026-10-06 — 7d81419

- 공격 관점에서 351–700px 전문가 영상 카드의 플레이어·제목·출처·공유 동작을 한 화면에서 읽을 수 있는지 확인했다. 중간 폭은 좌우 한 단위로, 350px 이하는 기존 세로 흐름으로 유지되며 1440px 데스크톱 갤러리도 보존된다.
- 두 번째 영상 선택 시 선택 상태·URL·YouTube iframe 자동재생이 함께 갱신되고, 공개 화면에서 page/console/http errors 0이다. 영상 콘텐츠·출처·제품 독립 공개 경계는 바뀌지 않았다. 새 CRITICAL/MAJOR 결함은 없다.
- 이번 점검은 Chrome CDP fallback 증거이며 실제 고령 사용자 이해도와 Safari/iOS/Android 실기기 동작을 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이고 teaser preview는 `HOLD`다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-CDP-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-MID-MOBILE-20261006`, `E-LIVE-PUBLIC-EXPERT-VIDEO-MID-MOBILE-20261006`.

## 연구 지도 중립 맥락 — 2026-10-06 — 7fe6a4d

- 공격 관점에서 `#research` chapter-level deep link가 첫 연구 카드를 암묵적으로 고른 것처럼 표시되는지 확인했다. 보정 후 지도 화면은 `다섯 연구 영역 / 06 / 12`와 `GABA 연구의 중심`을 표시하고 선택 노드는 없다.
- 인지 노드를 선택하면 URL이 `#research-cognition`으로 바뀌고 읽기 레일이 `인지 연구 결과 / 06 / 12 · 연구 01 / 05`, 선택 버튼 `aria-pressed=true`, 카드 `is-active`로 함께 갱신된다. 지도 단계와 카드 단계의 맥락이 분리된다.
- 공개 화면의 연구 카피·수치·출처·제품 독립 경계는 바뀌지 않았고 page/console/http errors 0이다. 새 CRITICAL/MAJOR 결함은 없다.
- 이 검증은 Chrome CDP fallback 390px 증거이며 실제 고령 사용자 이해도, Safari/iOS/Android 실기기 동작, 독립 과학·규제 감수를 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이고 teaser preview는 `HOLD`다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-RESEARCH-MAP-CONTEXT-20261006`, `E-CDP-RESEARCH-MAP-CONTEXT-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-CONTEXT-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-CONTEXT-20261006`.

## 연구 지도 첫 렌더 중립화 — 2026-10-06 — d450e98

- 공격 관점에서 chapter-level `#research` 진입 순간에 첫 카드가 기본 선택되는 초기 상태가 남아 있는지 재검토했다. `getInitialResearchTopicId`의 첫 주제 fallback을 제거한 뒤 첫 렌더에서 선택 노드 0개, 인지 카드 active false, 중심 문구 `GABA 연구의 중심`을 확인했다.
- 공유 카드 hash 또는 지도 노드를 선택하면 인지 연구 카드 URL·읽기 레일·`aria-pressed`·카드 active가 함께 갱신된다. 지도와 카드의 선택 맥락이 첫 화면부터 분리된다.
- 공개 화면의 연구 카피·수치·출처·제품 독립 경계는 바뀌지 않았고 page/console/http errors 0이다. 새 CRITICAL/MAJOR 결함은 없다.
- 이 검증은 Chrome CDP fallback 390px 증거이며 실제 고령 사용자 이해도, Safari/iOS/Android 실기기 동작, 독립 과학·규제 감수를 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이고 teaser preview는 `HOLD`다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-CDP-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`, `E-LIVE-PUBLIC-RESEARCH-MAP-INITIAL-NEUTRAL-20261006`.

## 중간 폭 모바일 공유 라벨 — 2026-10-06 — a6c8c6e

- Red-team finding: 351–430px 헤더에서 공유 기능이 아이콘만 보여 처음 방문자가 기능을 즉시 찾기 어려운 발견성 리스크가 있었다.
- 보정: v154에서 `공유하기` 라벨을 표시하고 메뉴·글자 크기·공유 버튼을 비겹침 좌표로 정렬했다. 350px 이하에서는 기존 아이콘 레일을 유지했다.
- Recheck: 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, PR #494, main workflow `37482350132`, 공개 validator candidate `a6c8c6e`, 공개 Chrome CDP fallback 390·380·351·350px에서 라벨·compact rail·body/scroll width·page/console/http errors 0을 확인했다.
- compact release manifest는 해시·검증 필드를 유지한 채 정적 오버헤드만 줄였다. 공개 과학 카피·수치·출처·제품 독립 경계는 바뀌지 않았다. 새 CRITICAL/MAJOR 결함은 없다.
- 이 검증은 Chrome CDP fallback 증거이며 실제 고령 사용자 이해도, Safari/iOS/Android 실기기 동작, 독립 과학·규제 감수를 대신하지 않는다. RT-001·RT-002·RT-003은 계속 OPEN이고 teaser preview는 `HOLD`다.
- 상태는 `PASS_WITH_CONDITIONS / USER_DECISION / NOT_READY`다.

증적: `E-UI-CONTRACT-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-CDP-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-DEPLOY-PIPELINE-MEDIUM-PHONE-SHARE-LABEL-20261006`, `E-LIVE-PUBLIC-MEDIUM-PHONE-SHARE-LABEL-20261006`.

## Red-team recheck — 모바일 첫 화면 hero — fb603a48 — 2026-10-07

- Finding: 좁은 모바일 화면에서 강조 문구의 자연스러운 줄바꿈 기회와 실제 표시 폭을 다시 확인할 필요가 있었다.
- Repair: 표준 `wbr`를 적용해 의미 단위 줄바꿈 기회를 제공하고, 390·350px에서는 한 줄로 완전히 표시되는 실제 결과를 확인했다. 1440px 제목 흐름과 공유 컨트롤도 유지된다.
- Evidence: 로컬·UI 계약·배포·라이브 validator·Chrome CDP fallback 390·350·1440px 검사에서 body/scroll width 정합, hero line overflow false, 공유 라벨, page/console/http errors 0.
- Boundary: 이번 변경은 UI·번들 최적화에 한정된다. 과학적 효능·제품 적용성·규제 적합성을 새로 주장하지 않는다.
- Residual: 이 검증은 Chrome CDP fallback이며 실제 고령 사용자 이해도와 Safari/iOS/Android 실기기 동작을 대신하지 않는다. teaser preview는 `HOLD`다.

증적: `E-LOCAL-BUILD-MOBILE-HERO-LINE-BREAK-20261007`, `E-UI-CONTRACT-MOBILE-HERO-LINE-BREAK-20261007`, `E-CDP-MOBILE-HERO-LINE-BREAK-20261007`, `E-DEPLOY-PIPELINE-MOBILE-HERO-LINE-BREAK-20261007`, `E-LIVE-PUBLIC-MOBILE-HERO-LINE-BREAK-20261007`.
