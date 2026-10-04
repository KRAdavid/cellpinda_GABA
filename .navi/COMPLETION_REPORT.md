# Completion Report

## 사업자용 공유 문장 개별 복사 피드백 배포 품질 게이트 — 5aa9f05 — 2026-10-04

- PR #222를 main에 병합하고 사업자용 GABA 핵심 5문장 각각의 복사 성공을 카드별 `복사 완료` 상태로 표시하도록 공개 사이트를 업데이트했다. 공유 문구·출처·제품 독립 경계는 유지했다.
- main workflow `37208090180`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 candidate `5aa9f05589d3878d0adc02cff01829198b29a344`, HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·6개 share page·제품 독립 경계를 확인했다. NAVI 문서 동기화 workflow `37208345128`도 같은 공개 경계를 재검증했으며 최종 candidate는 `df5c06aa3e75d2bfe4e471091b557050122d74dd`다.
- 완료 게이트는 닫지 않는다. Browser 플러그인/Playwright 부재로 실제 클립보드·모바일 공유 UI, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-SHARE-LINE-COPY-ACK-20261004`, `E-UI-CONTRACT-SHARE-LINE-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-SHARE-LINE-COPY-ACK-20261004`, `E-LIVE-PUBLIC-SHARE-LINE-COPY-ACK-20261004`.

## 연구 카드 복사 완료 상태 및 TF freshness 복구 배포 게이트 — bb5e260 — 2026-10-04

- PR #220을 main에 병합하고 연구 카드의 결과·출처 복사 성공을 카드별 ‘복사 완료’ 상태로 표시하도록 공개 사이트를 업데이트했다. 사업자 공유 문구·출처·제품 독립 경계는 유지했다.
- 첫 main 후보의 TF freshness 게이트가 heartbeat 487분/허용 480분으로 중단된 뒤, 공식 pulse run `37207031442`와 safe internal checks MET 증거를 사용해 보호 PR #221에서 heartbeat를 갱신했다. PR #221 병합 후 main workflow `37207209603`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했다.
- live validator는 candidate `bb5e26036355650083eefe57cefc7cfd24993e9f`, HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다. 완료 게이트는 닫지 않는다. Browser 플러그인/Playwright 부재로 실제 클립보드·모바일 공유 UI, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-COPY-ACK-20261004`, `E-UI-CONTRACT-RESEARCH-COPY-ACK-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-COPY-ACK-20261004`, `E-LIVE-PUBLIC-RESEARCH-COPY-ACK-20261004`, `E-TF-PULSE-REFRESH-20261004`.

## 연구 결과 공유 문맥 배포 품질 게이트 — 348f9b6 — 2026-10-04

- PR #219를 main에 병합하고, 연구 카드의 공유 결과에 연구 대상·방법·관찰 결과·연구 범위·원문 출처·해당 연구 딥링크를 포함하도록 공개 사이트를 업데이트했다. 사업자용 GABA 5문장 전체 복사에는 공개 안내서 링크를 포함했다.
- main workflow `37206009673`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인과 Playwright 부재로 실제 클립보드·모바일 공유 UI, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-RESEARCH-SHARE-CONTEXT-20261004`, `E-UI-CONTRACT-RESEARCH-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-RESEARCH-SHARE-CONTEXT-20261004`.

## 전문가 영상 공유 링크 주제 필터 배포 품질 게이트 — 597bf37 — 2026-10-04

- PR #218을 main에 병합하고, 유효한 `?video=` 링크가 선택 영상·초기 재생 상태·주제 필터를 함께 복원하도록 공개 사이트를 업데이트했다.
- main workflow `37204949680`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인과 Playwright 부재로 직접 영상 재생·필터 전환의 브라우저 런타임 검증, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-CONTEXT-20261004`, `E-UI-CONTRACT-EXPERT-VIDEO-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-CONTEXT-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-CONTEXT-20261004`.

## 전문가 영상 공유 링크 직접 재생 배포 품질 게이트 — 2305b5b — 2026-10-04

- PR #217을 main에 병합하고, 유효한 `?video=` 링크가 선택 영상과 초기 재생 상태를 함께 복원하도록 공개 사이트를 업데이트했다. UI 계약 회귀 검사도 추가했다.
- main workflow `37203920793`의 release-verify·worker-readiness·Pages·라이브 smoke·release status가 성공했고, live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인과 Playwright 부재로 직접 영상 재생의 브라우저 런타임 검증, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-DEEPLINK-20261004`, `E-UI-CONTRACT-EXPERT-VIDEO-DEEPLINK-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-DEEPLINK-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-DEEPLINK-20261004`.

## 공유·직접 진입 해시와 모바일 폭 변경 배포 품질 게이트 — cf893f8 — 2026-10-04

- 공유·직접 진입 링크가 lazy 콘텐츠 정착 뒤 고정 헤더·읽기 레일 아래에 놓이도록 재정렬하고, 320px→390px 뷰포트 변경에서도 제목 기준선을 다시 계산하도록 보강했다. 사용자 입력 후에는 자동 재정렬을 멈춘다.
- PR #216 main 병합과 workflow `37202619125`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했고, Chrome DevTools fallback 320px·390px에서도 정렬과 공유 피드백을 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-DEEP-LINK-REALIGN-20261004`, `E-CDP-DEEP-LINK-REALIGN-20261004`, `E-DEPLOY-PIPELINE-DEEP-LINK-REALIGN-20261004`, `E-LIVE-PUBLIC-DEEP-LINK-REALIGN-20261004`.

## 초소형 모바일 회복 경로 마지막 행 배포 품질 게이트 — a13e82f — 2026-10-04

- 320px 이하에서 수면·회복 14단계 지도의 마지막 두 단계를 중앙 정렬해 6·6·2 경로의 시각적 리듬을 보완했다. 기존 터치 영역·390px 흐름·제품 독립 경계는 유지했다.
- PR #213 main 병합과 workflow `37200663786`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-NARROW-RECOVERY-END-20261004`, `E-CDP-NARROW-RECOVERY-END-20261004`, `E-DEPLOY-PIPELINE-NARROW-RECOVERY-END-20261004`, `E-LIVE-PUBLIC-NARROW-RECOVERY-END-20261004`.

## 초소형 모바일 회복 경로 배포 품질 게이트 — 5bf2921 — 2026-10-04

- 320px 이하에서 수면·회복 14단계 지도를 6·6·2의 3행으로 재배치하고 단계 버튼·아이콘을 키웠다. 390px 이상 흐름과 제품 독립 공개 경계는 유지했다.
- PR #212 main 병합과 workflow `37199796734`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: `E-LOCAL-BUILD-NARROW-RECOVERY-MAP-20261004`, `E-CDP-NARROW-RECOVERY-MAP-20261004`, `E-DEPLOY-PIPELINE-NARROW-RECOVERY-MAP-20261004`, `E-LIVE-PUBLIC-NARROW-RECOVERY-MAP-20261004`.

## 태블릿 읽기 진행 레일 기준선 정렬 배포 품질 게이트 — fc07f6f — 2026-10-04

- 701px·900px 태블릿의 헤더와 읽기 진행 레일을 같은 70px 기준선에 맞췄다. 공개 768px·390px에서 읽기 진행·제품 독립 안내·가로폭·오류 기준을 재확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TABLET-PROGRESS-ALIGN-20261004, E-CDP-TABLET-PROGRESS-ALIGN-20261004, E-DEPLOY-PIPELINE-TABLET-PROGRESS-ALIGN-20261004, E-LIVE-PUBLIC-TABLET-PROGRESS-ALIGN-20261004.

## 태블릿 히어로 공개 안내 패널 보강 배포 품질 게이트 — c0b08ee — 2026-10-04

- 701px·900px에서 제품 독립 과학 안내와 읽기 레일을 폭 340px 반투명 패널로 분리해 자연 이미지 위에서도 정보 계층이 유지되도록 했다. 768px·820px 가로폭·오류 기준을 확인했다.
- PR #210 main 병합과 workflow `37197239653`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-TABLET-HERO-DISCLOSURE-20261004, E-CDP-TABLET-HERO-DISCLOSURE-20261004, E-DEPLOY-PIPELINE-TABLET-HERO-DISCLOSURE-20261004, E-LIVE-PUBLIC-TABLET-HERO-DISCLOSURE-20261004.

## 모바일 큰 글씨 제어 라벨 보강 배포 품질 게이트 — 37147625 — 2026-10-04

- 381px·430px에서 큰 글씨 제어 이름을 노출하고 320px 이하에서 컴팩트 터치 타깃을 유지해 모바일 헤더의 기능 식별성을 높였다. 큰 글씨 전환, 가로폭, 오류 기준을 로컬·공개 390px·320px에서 확인했다.
- PR #209 main 병합과 workflow `37196206238`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-TYPE-CONTROL-20261004, E-CDP-MOBILE-TYPE-CONTROL-20261004, E-DEPLOY-PIPELINE-MOBILE-TYPE-CONTROL-20261004, E-LIVE-PUBLIC-MOBILE-TYPE-CONTROL-20261004.

## 전문가 영상 갤러리 공개 화면 품질 게이트 — 73b32d2 — 2026-10-04

- 전문가 영상 9개와 주제 필터, 선택 즉시 재생 영역을 모바일·데스크톱 흐름으로 재점검했다. 390px에서는 2열 카드, 1440px에서는 선택 영상과 갤러리 병렬 구성이 유지됐다.
- 최신 정적 공개본 live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했고 NAVI project-state validation은 PASS였다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토와 로컬 사업 운영 게이트가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-VIDEO-GALLERY-QA-20261004, E-CDP-VIDEO-GALLERY-QA-20261004, E-LIVE-PUBLIC-VIDEO-GALLERY-QA-20261004.

## 좁은 모바일 연구 결과 카드 가독성 보강 배포 품질 게이트 — 53a7c41 — 2026-10-04

- 연구 결과 카드의 좁은 화면 라벨을 보정하고 350px 이하에서 지표명·결과값·방향 그래픽을 세 줄로 재배치해 320px에서도 읽기 순서를 분명하게 했다. 390px 레이아웃과 비정량 방향 안내·출처 연결은 유지했다.
- PR #207·#208 main 병합과 workflow `37194121269`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- Chrome DevTools fallback 320px·390px에서 지표명·결과값·방향 그래픽 순서·가로폭 일치·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-NARROW-SIGNAL-LABEL-20261004, E-CDP-NARROW-SIGNAL-LABEL-20261004, E-DEPLOY-PIPELINE-NARROW-SIGNAL-LABEL-20261004, E-LIVE-PUBLIC-NARROW-SIGNAL-LABEL-20261004.

## 성장·면역 연구 방향 그래픽 배포 품질 게이트 — 074822b — 2026-10-04

- 성장호르몬·면역 연구 결과 카드에 상승·하강 방향 그래픽과 자연어 결과를 추가해 모바일에서도 방향을 빠르게 읽도록 보완했다. 실제 효과 크기나 수치로 해석하지 않도록 비정량 안내와 출처 연결을 유지했다.
- PR #206 main 병합과 workflow `37192302993`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- Chrome DevTools fallback 390px·1440px에서 성장호르몬 그래픽 4개·면역 그래픽 3개·가로폭 일치·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-DIRECTION-GRAPHIC-20261004, E-CDP-DIRECTION-GRAPHIC-20261004, E-DEPLOY-PIPELINE-DIRECTION-GRAPHIC-20261004, E-LIVE-PUBLIC-DIRECTION-GRAPHIC-20261004.

## 비교 연구 결과 미터 보강 배포 품질 게이트 — 1cc9440 — 2026-10-04

- 비교 연구 카드에 5단계 질적 미터와 `더 많이·덜 증가/감소` 문구를 추가해 모바일에서도 비교 방향을 먼저 읽도록 보완했다. 실제 효과 크기나 수치로 해석하지 않도록 비정량 비교 안내와 출처 연결을 유지했다.
- PR #205 main 병합과 workflow `37190962129`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- Chrome DevTools fallback 390px·1440px에서 비교 도표의 네 방향 문구·미터·가로폭 일치를 확인했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-QUALITATIVE-METER-20261004, E-CDP-QUALITATIVE-METER-20261004, E-DEPLOY-PIPELINE-QUALITATIVE-METER-20261004, E-LIVE-PUBLIC-QUALITATIVE-METER-20261004.

## 연구 확장 지도 시작점·딥링크 방향 배포 품질 게이트 — c747f67 — 2026-10-04

- 연구 확장 장에 진입하면 인지 연구가 기본 활성화되고 특정 연구 딥링크에서는 지도·상세 카드·읽기 진행명이 동기화되도록 보완했다. 연구 지도의 첫 읽기 방향이 명확해졌으며 기존 제품 독립 안내와 연구 결과 표현은 유지됐다.
- PR #204 main 병합과 workflow `37189726191`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 로컬 및 공개 Playwright Chromium fallback 390px·1440px에서 인지 기본 활성화·피부 딥링크 동기화·가로폭·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RESEARCH-MAP-ENTRY-20261004, E-PLAYWRIGHT-RESEARCH-MAP-ENTRY-20261004, E-DEPLOY-PIPELINE-RESEARCH-MAP-ENTRY-20261004, E-LIVE-PUBLIC-RESEARCH-MAP-ENTRY-20261004.

## 수면·회복 14단계 현재 위치 표시 배포 품질 게이트 — 0641f60 — 2026-10-04

- 수면과 회복 14단계 지도 위에 현재 단계명과 진행 번호를 추가해 첫 방문자가 아이콘 지도와 큰 카드를 연결해 읽도록 보완했다. 단계 선택 시 지도·카드·진행 번호가 동기화되고 기존 3초 자동 전환·제품 독립 안내는 유지됐다.
- PR #203 main 병합과 workflow `37188742301`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 로컬 및 공개 Playwright Chromium fallback 390px·1440px에서 현재 단계 표시·14번째 카드 선택·가로폭·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-RECOVERY-MAP-STAGE-CUE-20261004, E-PLAYWRIGHT-RECOVERY-MAP-STAGE-CUE-20261004, E-DEPLOY-PIPELINE-RECOVERY-MAP-STAGE-CUE-20261004, E-LIVE-PUBLIC-RECOVERY-MAP-STAGE-CUE-20261004.

## 사업자용 5문장 전체 복사 배포 품질 게이트 — 58bbc70 — 2026-10-04

- 첫 목표인 사업자 활용성을 높이기 위해 마지막 이야기 공유 장에 5문장 전체 복사 버튼을 추가했다. 기존 문장별 복사·제품 독립 공개 과학 문구·구매 CTA 부재는 유지했다.
- PR #202 main 병합과 workflow `37187761596`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 로컬 및 공개 Playwright Chromium fallback 390px·1440px에서 버튼 표시·216자 복사 결과·성공 상태·5개 카드·기존 연구 다음 이동·가로폭·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-BUSINESS-COPY-ALL-20261004, E-PLAYWRIGHT-BUSINESS-COPY-ALL-20261004, E-DEPLOY-PIPELINE-BUSINESS-COPY-ALL-20261004, E-LIVE-PUBLIC-BUSINESS-COPY-ALL-20261004.

## 연구 → 활용 → 발효와 안전 편집 흐름 배포 품질 게이트 — 8d493d3 — 2026-10-04

- 국내외 활용 카드 뒤에 `활용은 만들어지는 과정에서 이어집니다` 전환과 `발효와 안전` 다음 장을 연결해 공개 안내서의 후반 읽기 흐름을 보강했다. 제품 광고·구매 CTA·새로운 효능 주장은 추가하지 않았다.
- PR #201 main 병합과 workflow `37186666660`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 로컬 및 공개 Playwright Chromium fallback 390px·1440px에서 handoff 표시·발효와 안전 제목 연결·기존 연구 다음 이동·가로폭·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-APPLICATION-FERMENTATION-HANDOFF-20261004, E-PLAYWRIGHT-APPLICATION-FERMENTATION-HANDOFF-20261004, E-DEPLOY-PIPELINE-APPLICATION-FERMENTATION-HANDOFF-20261004, E-LIVE-PUBLIC-APPLICATION-FERMENTATION-HANDOFF-20261004.

## 사업자용 GABA 공유 패키지 배포 품질 게이트 — 02f8fac — 2026-10-04

- 첫 목표인 사업자 활용성을 높이기 위해 마지막 이야기 공유 장에 사업자용 안내를 먼저 노출하고, GABA의 기본 역할과 연구 흐름을 담은 5문장을 펼쳐 바로 복사할 수 있게 했다. 제품 광고·구매 CTA·새로운 효능 주장은 추가하지 않았다.
- PR #200 main 병합과 workflow `37185751209`의 release-verify·Pages·라이브 smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·70개 번들 해시·12개 공개 claim·6개 master record·teaser HOLD·Smart Store only·제품 독립 경계를 확인했다.
- 로컬 및 공개 Playwright Chromium fallback 390px·1440px에서 안내 표시·5개 카드·복사 동작·가로폭·오류 기준을 통과했다. 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-BUSINESS-SHARE-KIT-20261004, E-PLAYWRIGHT-BUSINESS-SHARE-KIT-20261004, E-DEPLOY-PIPELINE-BUSINESS-SHARE-KIT-20261004, E-LIVE-PUBLIC-BUSINESS-SHARE-KIT-20261004.

## 모바일 전문가 영상 정보 계층 배포 품질 게이트 — 0feb5743 — 2026-10-04

- PR #197의 모바일 보정이 main에 병합되고 GitHub Pages 공개본에 반영됐다. 700px 이하에서 제목·채널·공유 동작을 영상 프레임 앞에 배치했으며, 데스크톱 레이아웃은 유지했다.
- UI contract·typecheck·127개 테스트·production build·성능 예산과 배포 workflow 37182224154의 release verify·Pages·live smoke·release status가 성공했다. live validator는 HTTP 200·STATIC·candidate `0feb5743dc81fe0f46c75972c8a1eb358ae25996`·12개 claim·6개 master record·제품 독립 경계를 확인했다.
- Playwright Chromium fallback 320·350·390·1440px에서 선택 제목 표시·9:16 비율·가로 넘침 없음·오류 0건을 확인했다. 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-MOBILE-VIDEO-CONTEXT-20261004, E-PLAYWRIGHT-MOBILE-VIDEO-CONTEXT-20261004, E-DEPLOY-PIPELINE-MOBILE-VIDEO-CONTEXT-20261004, E-LIVE-PUBLIC-MOBILE-VIDEO-CONTEXT-20261004.

## 공개 사이트 전 구간 배포 품질 게이트 — 66ec3c6 — 2026-10-04

- GitHub Pages 공개본에서 첫 화면·수면과 회복·연구 지도·전문가 영상·이야기 공유 장을 390px·1440px로 직접 감리했다. 10개 캡처 모두 가로 넘침·page error·console error가 없었고, 카드·도표·영상 갤러리·공유 장의 정보 계층과 자연 이미지 비율이 유지됐다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산과 live validator HTTP 200·STATIC·candidate `63bc6b1`·70개 번들 해시·제품 독립 공개 데이터 경계를 확인했다.
- 공개 배포 품질 기준은 통과했지만 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-VISUAL-PUBLISHING-20261004.

## 전문가 영상 공유·모바일 진행 문맥 공개 배포 게이트 — 34c5b08 — 2026-10-04

- PR #194에서 영상 선택 직후 공유 URL이 이전 장 문맥을 갖는 경합을 제거하고, PR #196에서 모바일 smooth scroll 중 진행 라벨이 선택 영상과 일치하도록 보완했다. heartbeat refresh PR #195 이후 main workflow 37181007734가 fresh TF pulse·Pages·라이브 smoke·release status를 모두 통과했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, Playwright Chromium fallback 390px·1440px 17/17, live validator HTTP 200·STATIC·candidate 34c5b08·70개 번들 해시·12개 claim·6개 master record·제품 독립 경계를 연결했다. Worker는 STATIC_ONLY로 유지됐다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 검토가 남아 NAVI 상태는 USER_DECISION / NOT_READY다.

증적: E-LOCAL-BUILD-EXPERT-VIDEO-SHARE-20261004, E-PLAYWRIGHT-EXPERT-VIDEO-SHARE-20261004, E-DEPLOY-PIPELINE-EXPERT-VIDEO-SHARE-20261004, E-LIVE-PUBLIC-EXPERT-VIDEO-SHARE-20261004.

## 최종 NAVI 문서 동기화 공개 재검증 — cc312de — 2026-10-04

- NAVI 문서를 main에 동기화한 최종 공개 candidate에서 live validator와 55개 반응형·직접 진입 조합을 재실행했다. HTTP 200·정적 번들·공개 데이터 정합성·가로폭·페이지 오류·콘솔 오류 0건을 확인했다.
- 문서 동기화는 UI 코드를 바꾸지 않았고, 직전 91808af의 320px 연구 카드 폭 보정이 최종 공개본에 유지된다. 완료 게이트는 외부 검증 조건을 보존해 USER_DECISION / NOT_READY다.

증적: E-LIVE-PUBLIC-NARROW-PHONE-20261004.

## 초소형 모바일 연구 카드 폭 및 공개본 전수 배포 게이트 — 91808af — 2026-10-04

- PR #193에서 320px 수면 연구 카드의 내부 그리드 최소 폭을 보정해 도표와 출처가 카드 안에서 축소되도록 했다. 연구 내용·수치·출처·제품 독립 경계는 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, Playwright Chromium fallback의 320·350·390·768·1440px × 11개 주요 장 직접 진입, PR checks, main workflow 37179404463, Pages·라이브 smoke·release status·live validator candidate 91808af가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지. 55개 레이아웃 조합에서 가로 넘침·페이지 오류·콘솔 오류는 0건이었다.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-NARROW-PHONE-20261004, E-PLAYWRIGHT-NARROW-PHONE-20261004, E-DEPLOY-PIPELINE-NARROW-PHONE-20261004, E-LIVE-PUBLIC-NARROW-PHONE-20261004.

## 모바일 터치 중 수면·회복 카드 읽기 흐름 공개 배포 게이트 — e6802d3 — 2026-10-04

- PR #192에서 터치 시작부터 종료까지 수면·회복 카드의 현재 단계를 유지하고, 손가락을 떼면 3초 자동 전환을 재개하도록 보완했다. 스와이프는 다음 단계로 이동한 뒤 수동 정지 상태를 유지한다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 390px touch context, PR checks, main workflow 37178489672, Pages·라이브 smoke·release status·live validator candidate e6802d3가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-RECOVERY-TOUCH-20261004, E-PLAYWRIGHT-RECOVERY-TOUCH-20261004, E-DEPLOY-PIPELINE-RECOVERY-TOUCH-20261004, E-LIVE-PUBLIC-RECOVERY-TOUCH-20261004.

## 수면·회복 자동 카드 읽기 흐름 공개 배포 게이트 — cbf05f6 — 2026-10-04

- PR #191에서 수면·회복 14단계 카드의 상호작용 일시정지와 사용자 수동 일시정지를 분리했다. 읽기 중에는 현재 카드를 유지하고, 상호작용이 끝나면 3초 자동 전환을 재개하며 reduced-motion에서는 자동 전환을 끈다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 390px·1440px Chrome fallback, PR checks, main workflow 37177762069, Pages·라이브 smoke·release status·live validator candidate cbf05f6가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-RECOVERY-AUTOPLAY-20261004, E-PLAYWRIGHT-RECOVERY-AUTOPLAY-20261004, E-DEPLOY-PIPELINE-RECOVERY-AUTOPLAY-20261004, E-LIVE-PUBLIC-RECOVERY-AUTOPLAY-20261004.

## 모바일 연구 결과 도표 보조문구 공개 배포 게이트 — 43e5942 — 2026-10-04

- PR #190에서 연구 결과 도표의 모바일 증가·감소 방향 표기와 시각 요소 설명문을 키워, 320px·390px에서도 핵심 비교가 먼저 읽히도록 보완했다. 연구 수치·출처·제품 독립 경계는 유지했다.
- UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 320px·390px·768px·1440px Chrome fallback, PR checks, main workflow 37176650203, Pages·라이브 smoke·release status·live validator candidate 43e5942가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-RESEARCH-CHART-LEGIBILITY-20261004, E-PLAYWRIGHT-RESEARCH-CHART-LEGIBILITY-20261004, E-DEPLOY-PIPELINE-RESEARCH-CHART-LEGIBILITY-20261004, E-LIVE-PUBLIC-RESEARCH-CHART-LEGIBILITY-20261004.

## 반응형 헤더 경계 공개 배포 게이트 — 25c55f9 — 2026-10-04

- PR #189에서 861px 전환 시 잘리던 공유 버튼을 발견하고 compact 헤더·메뉴 배경을 900px까지 연장했다. 861px·900px는 터치 안전한 메뉴형 헤더, 920px 이상은 전체 내비게이션으로 유지된다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 390px·861px·900px·920px·1440px Chrome fallback, PR checks, main workflow 37175326245, Pages·라이브 smoke·release status·live validator candidate 25c55f9가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-TABLET-BREAKPOINT-20261004, E-PLAYWRIGHT-TABLET-BREAKPOINT-20261004, E-DEPLOY-PIPELINE-TABLET-BREAKPOINT-20261004, E-LIVE-PUBLIC-TABLET-BREAKPOINT-20261004.

## 태블릿 헤더 큰 글씨 조절 표식 공개 배포 게이트 — 45a01bf — 2026-10-04

- PR #188에서 701–860px 태블릿 헤더의 빈 큰 글씨 조절 버튼을 `가+` 표식이 보이는 컨트롤로 보완했다. 접근성 레이블·44px 터치 영역과 기존 모바일·데스크톱 표현은 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 320px·390px·768px·1440px Chrome fallback, PR checks, main workflow 37174574201, Pages·라이브 smoke·release status·live validator candidate 45a01bf가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-TABLET-READING-CONTROL-20261004, E-PLAYWRIGHT-TABLET-READING-CONTROL-20261004, E-DEPLOY-PIPELINE-TABLET-READING-CONTROL-20261004, E-LIVE-PUBLIC-TABLET-READING-CONTROL-20261004.

## 모바일 연구 기준 범례 가독성 공개 배포 게이트 — 746fd126 — 2026-10-04

- PR #187에서 모바일 연구 기준 범례를 세로 흐름으로 정리하고, 연구 기준 제목·범례·설명 글자 크기를 13px·13px·12px로 조정했다. 연구 확장 제목의 줄바꿈 뒤 공백을 보존했으며, 기존 연구 내용·수치·출처·제품 독립 경계는 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 390px·1440px Chrome fallback, PR checks, main workflow 37173572877, Pages·라이브 smoke·release status·live validator candidate 746fd126이 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-MOBILE-RESEARCH-LEGEND-20261004, E-PLAYWRIGHT-MOBILE-RESEARCH-LEGEND-20261004, E-DEPLOY-PIPELINE-MOBILE-RESEARCH-LEGEND-20261004, E-LIVE-PUBLIC-MOBILE-RESEARCH-LEGEND-20261004.

## 모바일 연구 읽기 순서 가독성 공개 배포 게이트 — 76b3adc — 2026-10-04

- PR #186에서 모바일 연구 지도 아래의 읽는 순서를 지도·대상·결과·해석 4단계 시각 순서표로 보완했다. 모바일 13px 본문과 30px 번호 원형으로 시각적 비교성을 높였고, 기존 연구 내용·수치·출처·제품 독립 경계는 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 예산, 공개 390px·1440px Chrome fallback, PR checks, main workflow 37172733343, Pages·라이브 smoke·release status·live validator candidate 76b3adc가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser HOLD/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Browser 플러그인 부재, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 USER_DECISION / NOT_READY를 유지한다.

증적: E-LOCAL-BUILD-RESEARCH-READ-ORDER-20261004, E-PLAYWRIGHT-RESEARCH-READ-ORDER-20261004, E-DEPLOY-PIPELINE-RESEARCH-READ-ORDER-20261004, E-LIVE-PUBLIC-RESEARCH-READ-ORDER-20261004.

## Expert Video Poster Resilience Release Gate — c97d2ac — 2026-10-04

- PR #185에서 원격 YouTube 썸네일이 응답하지 않아도 주제별 자연 이미지 fallback 포스터가 보이도록 보완하고, 실제 썸네일 우선 표시와 영상 선택·즉시 재생 흐름을 유지했다. 지원하지 않는 iframe `web-share` 권한 토큰도 제거했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px·1440px Chrome fallback, PR checks, main workflow `37171708026`, Pages·라이브 smoke·release status·live validator candidate `c97d2ac`가 연결됐다.
- NAVI 문서 동기화 당시 live validator candidate `88c6efd`에서도 HTTP 200·STATIC·번들 70개와 공개 경계를 재확인했다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-POSTERS-20261004`, `E-PLAYWRIGHT-EXPERT-VIDEO-POSTERS-20261004`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-POSTERS-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-POSTERS-20261004`, `E-LIVE-PUBLIC-EXPERT-VIDEO-POSTERS-FINAL-20261004`.

## Research Comparison Direction Release Gate — 86891bc — 2026-10-04

- PR #184에서 연구 결과 도표의 상대 비교 막대가 같은 길이로 보이던 문제를 보완했다. 비교 조건과 GABA 조건의 변화 방향을 먼저 시각적으로 구분하고, 실제 효과 크기로 읽히지 않도록 기존 안내 문구를 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px·1440px Chrome fallback, PR checks, main workflow `37170799368`, Pages·라이브 smoke·release status·live validator candidate `86891bc`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-PLAYWRIGHT-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-COMPARISON-DIRECTION-20261004`, `E-LIVE-PUBLIC-RESEARCH-COMPARISON-DIRECTION-20261004`.

## Mobile Expert Video Gallery Release Gate — a77c91c — 2026-10-04

- PR #183에서 390px 모바일 전문가 영상 게시판을 썸네일 중심 2열 갤러리로 정리하고, 350px 이하에서는 1열 카드로 복귀하도록 보완했다. 제목·채널명·선택 상태의 가독성을 유지하면서 영상 선택·즉시 재생·출처·공유 흐름은 그대로 두었다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 320px·390px·1440px Chrome fallback, PR checks, main workflow `37169365913`, Pages·라이브 smoke·release status·live validator candidate `a77c91c`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. 320px에서 관찰된 외부 YouTube `compute-pressure` 경고는 재실행에서 사라졌지만 브라우저별 iframe 검증을 남기며, Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-VIDEO-GALLERY-20261004`, `E-PLAYWRIGHT-MOBILE-VIDEO-GALLERY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-VIDEO-GALLERY-20261004`, `E-LIVE-PUBLIC-MOBILE-VIDEO-GALLERY-20261004`.

## Final Chapter Signal Release Gate — ec2a1bd — 2026-10-04

- PR #182에서 마지막 이야기 공유 장의 데스크톱 시각 균형을 보완했다. 저채도 동심원 신호와 GABA 워터마크를 추가했으며, 모바일에서는 낮은 대비·하단 배치로 핵심 문구와 공유 행동을 우선했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px·1440px 마지막 장, 공개 390px 회복 카드 focus-visible 상호작용, PR checks, main workflow `37168287853`, Pages·라이브 smoke·release status·live validator candidate `ec2a1bd`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-FINAL-SIGNAL-20261004`, `E-PLAYWRIGHT-FINAL-SIGNAL-20261004`, `E-DEPLOY-PIPELINE-FINAL-SIGNAL-20261004`, `E-LIVE-PUBLIC-FINAL-SIGNAL-20261004`.

## Recovery Map Affordance Release Gate — 8e22d51 — 2026-10-04

- PR #181에서 모바일 수면·회복 보충 구간의 14단계 읽기 지도를 보강했다. 아이콘·번호를 더 선명하게 표시하고 focus-visible·선택 상태를 연결해 다음 카드를 찾는 흐름을 개선했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px 회복 지도, PR checks, main workflow `37167336445`, Pages·라이브 smoke·release status·live validator candidate `8e22d51`이 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-AFFORDANCE-20261004`, `E-PLAYWRIGHT-RECOVERY-MAP-AFFORDANCE-20261004`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-AFFORDANCE-20261004`, `E-LIVE-PUBLIC-RECOVERY-MAP-AFFORDANCE-20261004`.

## Expert Video Loading Continuity Release Gate — 44337e5 — 2026-10-04

- PR #179에서 전문가 영상 iframe 로딩 중에도 기존 Shorts 썸네일을 유지하고 로딩 상태를 겹쳐 표시하도록 보완했다. 선택 영상의 9:16 프레임과 기존 재생·공유 흐름은 유지된다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px 포스터 상태, 320px·390px·1440px 대표 감사, PR checks, main workflow `37166334839`, Pages·라이브 smoke·release status·live validator candidate `44337e5`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-LOADING-POSTER-20261004`, `E-PLAYWRIGHT-VIDEO-LOADING-POSTER-20261004`, `E-DEPLOY-PIPELINE-VIDEO-LOADING-POSTER-20261004`, `E-LIVE-PUBLIC-VIDEO-LOADING-POSTER-20261004`.

## Mobile Label and Media Release Gate — a2a2d3f — 2026-10-04

- PR #178에서 320px 모바일 첫 화면의 보조 문구를 12px로 조정하고, 전문가 세로 영상 영역을 250x444px로 확장했다. 9:16 프레임은 유지되어 시각 비율을 손상하지 않는다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 320px·390px Chrome fallback, PR checks, main workflow `37165443025`, Pages·라이브 smoke·release status·live validator candidate `a2a2d3f`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-LABEL-MEDIA-20261004`, `E-PLAYWRIGHT-MOBILE-LABEL-MEDIA-20261004`, `E-DEPLOY-PIPELINE-MOBILE-LABEL-MEDIA-20261004`, `E-LIVE-PUBLIC-MOBILE-LABEL-MEDIA-20261004`.

## Interlude Copy Release Gate — eded7a9 — 2026-10-04

- PR #177에서 수면과 회복 연결 구간의 상단 진행 문구를 `다음 장으로 이어져요`로 정리하고, 보조기기 안내와 공개 화면의 의미를 맞췄다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px Chrome fallback, 320px·1440px 대표 감사, PR checks, main workflow `37164504662`, Pages·라이브 smoke·release status·live validator candidate `eded7a9`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 한 차례 YouTube iframe의 Chrome Permissions Policy `compute-pressure` 경고가 있었으나 즉시 재검증에서 재현되지 않았다. 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-INTERLUDE-COPY-20261004`, `E-PLAYWRIGHT-INTERLUDE-COPY-20261004`, `E-DEPLOY-PIPELINE-INTERLUDE-COPY-20261004`, `E-LIVE-PUBLIC-INTERLUDE-COPY-20261004`.

## Same-page Hash Context Release Gate — a8689a3 — 2026-10-04

- PR #176에서 같은 페이지 해시 이동 시 장 제목·읽기 진행 레일·연구 선택 상태가 함께 바뀌도록 보완했다. 초기 진입 안정화 타이머는 새 해시를 덮어쓰지 않는다.
- 로컬 UI 계약·typecheck·127개 테스트·production build, 공개 390px Chrome fallback의 recovery-break→research-skin→expert-videos 이동, PR checks, main workflow `37163479968`, Pages·라이브 smoke·release status·live validator candidate `a8689a3`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-HASH-CONTEXT-20261004`, `E-PLAYWRIGHT-HASH-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-HASH-CONTEXT-20261004`, `E-LIVE-PUBLIC-HASH-CONTEXT-20261004`.

## Mobile Menu Focus Restoration Release Gate — 510e9ad — 2026-10-04

- PR #163에서 모바일 메뉴 항목 이동·배경 클릭으로 닫히는 두 경로의 포커스를 메뉴 토글로 복귀시켰다. 공개 390px Chrome fallback 상호작용과 로컬 품질검사, PR checks, main workflow `37149705144`, Pages 라이브 smoke·release status·live validator candidate `510e9ad`가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 1개 product, 6개 share page, teaser `HOLD`/public URL 없음, Smart Store only, removed750 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS-20261004`, `E-PLAYWRIGHT-MOBILE-MENU-FOCUS-20261004`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS-20261004`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS-20261004`.

## Direct Hash Entry Release Gate — 70d66b5 — 2026-10-04

- PR #162에서 직접 해시 진입 시 초기 정렬을 동기화하고 안정화 재정렬 시간을 줄였다. 로컬 검증과 공개 390px Chrome fallback 세 해시 검증, main workflow `37148328986`, GitHub Pages 라이브 validator가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, candidate SHA `70d66b5`, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 6개 share page, 제품 독립 공개 경계 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-DIRECT-HASH-NAV-20261004`, `E-PLAYWRIGHT-DIRECT-HASH-NAV-20261004`, `E-DEPLOY-PIPELINE-DIRECT-HASH-NAV-20261004`, `E-LIVE-PUBLIC-DIRECT-HASH-NAV-20261004`.

## Mobile Reading Clarity Release Gate — 37737d2 — 2026-10-04

- 이번 보완은 모바일 기능 라벨의 최소 가독성과 읽기 크기 조절의 시각 단서를 강화한 범위다. 로컬 검증과 공개 Chrome fallback 320/390/1440px 검증, PR #161 병합, main workflow `37147186088`, GitHub Pages 라이브 validator가 연결됐다.
- 배포 기준선은 통과했다: 라이브 HTTP 200, candidate SHA `37737d2`, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 6개 share page, 제품 독립 공개 경계 유지.
- 완료 게이트는 닫지 않는다. Safari/iOS/Android 실기기, 실제 고령 사용자 독해성, 독립 과학·규제 review가 남아 `USER_DECISION / NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-READING-CLARITY-20261004`, `E-PLAYWRIGHT-MOBILE-READING-CLARITY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-READING-CLARITY-20261004`, `E-LIVE-PUBLIC-MOBILE-READING-CLARITY-20261004`.

## Expert Video Thumbnail Resolution Release Recheck — 52ff08b — 2026-10-04

- 전문가 영상 썸네일이 오류가 아닌 저해상도 성공 응답을 반환하는 경우에도 decoded width를 검사해 대체 이미지를 시도하고, 두 이미지 모두 기준 미달이면 `GABA VIDEO` 표지를 보여주도록 보완했다.
- 로컬 typecheck·UI contract·127 tests·build, 로컬·공개 저해상도 강제 Playwright, 320/390/1440px 공개 정상 로딩, main workflow `37145916564`, Pages·라이브 smoke·release status와 공개 validator candidate `52ff08b`를 통과했다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-RESOLUTION-20261004`.

## Expert Video Thumbnail Fallback Release Recheck — 342f43f — 2026-10-04

- 기본·대체 썸네일이 모두 실패하는 상황에서도 빈 박스가 아닌 `GABA VIDEO` 표지가 보이도록 전문가 영상 게시판의 실패 상태를 보완했다.
- 로컬 typecheck·UI contract·127 tests·build, 390px 강제 이중 실패 Playwright, PR #158 checks, main workflow `37144428732`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 candidate는 `342f43ff5242a44e5a32cb9c3909be5c37c3809b`다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-FALLBACK-20261004`.

## Expert Video Thumbnail Release Recheck — 8093615 — 2026-10-04

- 전문가 영상 게시판의 첫 4개 썸네일 eager 로드와 지연 로드용 `GABA VIDEO` 표지를 추가해 모바일 초기 빈 썸네일 문제를 보완했다. 320/390/1440px에서 가로 넘침 없음·브라우저 오류 없음, 필터 4개 카드 전환, 영상 선택·iframe 로딩 상태를 확인했다.
- 로컬 typecheck·UI contract·127 tests·build, PR #155 checks, main workflow `37142835851`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 candidate는 `8093615ce8cebac23d1baf941ec1ea5d503bbcce`다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-THUMBNAILS-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAILS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAILS-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAILS-20261004`.

## Mobile Definition Card Motif Release Recheck — 4e558ee — 2026-10-04

- GABA 기본 설명 카드의 장식 아이콘이 모바일 본문과 겹치지 않도록 하단 읽기 여백을 추가했다. 320/390px에서 본문-아이콘 간격 6px와 가로 넘침 없음, 브라우저 오류 없음을 확인했다.
- 로컬 typecheck·UI contract·127 tests·build, PR #153 checks, main workflow `37141668244`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 candidate는 `4e558eeefec8e9cbbb133629658fb0b5b28b7762`다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-DEFINITION-MOTIF-20261004`, `E-PLAYWRIGHT-DEFINITION-MOTIF-20261004`, `E-DEPLOY-PIPELINE-DEFINITION-MOTIF-20261004`, `E-LIVE-PUBLIC-DEFINITION-MOTIF-20261004`.

## Mobile Research Card Width Release Recheck — 7a6db416 — 2026-10-04

- 모바일 연구 결과 카드의 내부 폭을 가용 폭으로 보정해 320px·390px에서 도표 문구가 더 자연스럽게 읽히도록 고도화했다. 연구 문구·데이터·해석·출처와 제품 독립 경계는 그대로 유지했다.
- 로컬 typecheck/UI contract/127 tests/build, PR #151 검사, main workflow `37140273727`, GitHub Pages 배포·라이브 smoke·release status, 공개 validator와 320/390/1440px Playwright Chrome fallback이 통과했다. 공개 candidate는 `7a6db416a08d78a8d3bd31f4c66bca89f5c1b2c8`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-CARD-WIDTH-20261004`, `E-PLAYWRIGHT-RESEARCH-CARD-WIDTH-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-CARD-WIDTH-20261004`, `E-LIVE-PUBLIC-RESEARCH-CARD-WIDTH-20261004`.

## Chapter Entry Clearance Release Recheck — b9f21d0 — 2026-10-04

- 장 진입 시 제목만 보이던 위치를 장 헤더 전체가 보이는 위치로 보정해 모바일에서도 `06 · 연구의 확장` 같은 장 표시와 제목을 함께 읽도록 고도화했다.
- 로컬 typecheck/UI contract/127 tests/build, PR #149 검사, main workflow `37139270708`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 320/390/1440px Playwright에서 `#research` 직접 진입 시 장 표시가 진행 바 아래에 있고, 가로 넘침과 브라우저 오류가 없음을 확인했다.
- 공개 candidate는 `b9f21d0ceba52e0d3ea4745d65232e3661ffd7ea`이며, 제품 독립 과학 안내·연구 데이터·출처 경계는 유지했다. 외부 브라우저·실사용자·독립 과학·규제 검토가 남아 NAVI 상태는 `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-CHAPTER-ENTRY-20261004`, `E-PLAYWRIGHT-CHAPTER-ENTRY-20261004`, `E-DEPLOY-PIPELINE-CHAPTER-ENTRY-20261004`, `E-LIVE-PUBLIC-CHAPTER-ENTRY-20261004`.

## Mobile Expert Video Topic Visibility Release Recheck — 71960f0 — 2026-10-04

- 전문가 영상 주제 필터를 모바일 가로 스크롤에서 전체 노출형 줄바꿈으로 바꿔 320px·390px에서 7개 주제를 즉시 읽고 선택할 수 있게 고도화했다. 선택 후 `수용체` 영상 1개와 iframe 재생 상태를 확인했다.
- 로컬 typecheck/UI contract/127 tests/build, PR #147 검사, main workflow `37138030444`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 320/390/1440px Playwright Chrome fallback에서 모든 필터 표시·가로 넘침 없음·영상 선택 전환을 확인했다.
- 공개 candidate는 `71960f083e21577641074358b74a0ca447cdd216`이며, 제품 독립 과학 안내·연구 데이터·출처 경계는 유지했다. 외부 브라우저·실사용자·독립 과학·규제 검토가 남아 NAVI 상태는 `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-FILTERS-20261004`, `E-PLAYWRIGHT-VIDEO-FILTERS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-FILTERS-20261004`, `E-LIVE-PUBLIC-VIDEO-FILTERS-20261004`.

## Explicit Original-Source Action Release Recheck — 32b37a1 — 2026-10-04

- 출처 읽기 카드에 `원문 보기`를 명시해 모바일·고령 사용자도 원문 이동을 바로 이해하도록 고도화했다. 기존 네 가지 연구 읽기 질문과 Yoto et al. 2012 PubMed 예시는 유지했다.
- 로컬 typecheck/UI contract/127 tests/build, PR #145 검사, main workflow `37136765623`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 320/390/1440px Playwright에서 `원문 보기` 표시·PubMed 새 탭 이동·가로 넘침 없음·메뉴/연구 지도/전문가 영상 선택 재생을 확인했다.
- 공개 candidate는 `32b37a11a327a351b79a3822029d35d19d58bae6`이며, 제품 독립 과학 안내·연구 데이터·출처 경계는 유지했다. 외부 브라우저·실사용자·독립 과학·규제 검토가 남아 NAVI 상태는 `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-SOURCE-ACTION-20261004`, `E-PLAYWRIGHT-SOURCE-ACTION-20261004`, `E-DEPLOY-PIPELINE-SOURCE-ACTION-20261004`, `E-LIVE-PUBLIC-SOURCE-ACTION-20261004`.

## Source Reading Bridge Release Recheck — a8cc869 — 2026-10-04

- `출처 읽기` 구간을 네 가지 연구 읽기 질문과 Yoto et al. 2012 PubMed 원문 예시가 연결된 편집형 브리지로 고도화했다. 결과만 소비하지 않고 연구 대상·비교·관찰 결과·해석 범위를 한 흐름으로 읽게 하는 개선이다.
- 로컬 typecheck/UI contract/127 tests/build, PR #143 검사, main workflow `37135553445`, Pages 배포·라이브 smoke·release status와 공개 validator가 통과했다. 공개 320/390/1440px Playwright Chrome fallback에서 네 단계·원문 링크·가로 넘침 없음·메뉴/연구 지도/전문가 영상 선택 재생을 확인했다.
- 공개 UI 후보는 `a8cc869b2c1537b2568b2f0e99c31adc3eae9353`이며, 제품 독립 과학 안내·기존 연구 데이터·출처 경계는 유지했다. 외부 브라우저·실사용자·독립 과학·규제 검토가 남아 NAVI 상태는 `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-SOURCE-BRIDGE-20261004`, `E-PLAYWRIGHT-SOURCE-BRIDGE-20261004`, `E-DEPLOY-PIPELINE-SOURCE-BRIDGE-20261004`, `E-LIVE-PUBLIC-SOURCE-BRIDGE-20261004`.

## NAVI 문서 병합 후 최신 공개본 동기화 — 6212511 — 2026-10-04

- NAVI 문서 PR #141 병합 후 main workflow `37134462216`, Pages 배포, 라이브 smoke, release status와 공개 validator가 통과했다. 라이브 공개 candidate는 `621251166c2902a7ea2a8fae44b5230f97242ff9`다.
- 이번 동기화는 문서·증거 기록만 변경했으며 공개 UI, 과학 카피, 제품 독립 경계는 변경하지 않았다. 완료 게이트는 외부 브라우저·실사용자·독립 과학·규제 검토가 남아 `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LIVE-PUBLIC-NAVI-SYNC-20261004`.

## Mobile Chart Readability and Long-Jump Navigation Release Recheck — b778f23 — 2026-10-04

- 모바일 연구 결과 도표의 비교 조건·연구 메타데이터를 읽기 쉽게 보정하고, 사용자의 긴 장 이동을 초기 hash 정렬 타이머가 되돌리지 않도록 보완했다. 공개 과학 카피·제품 독립 경계·연구 출처는 변경하지 않았다.
- PR #140 검사, 로컬 typecheck/UI contract/127 tests/build, main workflow `37133909361`, GitHub Pages 배포, 라이브 smoke, release status, 공개 validator와 320/390/1440px Playwright Chrome fallback이 통과했다. 공개 candidate는 `b778f23b65a67cf919171d212a9305927a34d0ff`다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-CHART-NAV-20261004`, `E-PLAYWRIGHT-MOBILE-CHART-NAV-20261004`, `E-DEPLOY-PIPELINE-CHART-NAV-20261004`, `E-LIVE-PUBLIC-CHART-NAV-20261004`.

## Narrow-phone Sleep Layout Release Recheck — 81d9dbb — 2026-10-03

- 320px 협소 화면에서 수면 연구 카드가 화면 밖으로 밀리던 레이아웃 문제를 `min-width: 0`과 `minmax(0, 1fr)`로 보완했다. 공개 카피·제품 독립 경계와 연구 내용은 변경하지 않았다.
- PR #126 필수 검사, 로컬 typecheck/UI contract/test/build, Playwright Chrome 320/390/1440px 레이아웃과 390px 상호작용, main workflow `37123264421`, Pages/live validator가 통과했다. 공개 UI 후보는 `81d9dbba61ec9080a58be8c5b0824843b0a13ed9`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-NARROW-SLEEP-20261003`, `E-PLAYWRIGHT-NARROW-SLEEP-20261003`, `E-DEPLOY-PIPELINE-NARROW-SLEEP-20261003`, `E-LIVE-PUBLIC-NARROW-SLEEP-20261003`.

## Hero Headline Rhythm and Highlight Release Recheck — f209269 — 2026-10-03

- 데스크톱 히어로의 모바일 전용 줄바꿈·색상 상속 범위를 직계 제목 요소로 제한해 `GABA에서 읽습니다`를 한 문장으로 읽히게 했고, 모바일의 의도된 줄바꿈과 teal 강조는 유지했다. 공개 카피·제품 독립 경계는 변경하지 않았다.
- PR #124 필수 검사, 로컬 typecheck/UI contract/test/build, Playwright 390/1440px 상호작용 2건, main workflow `37121944648`, Pages/live validator, 공개 320/390/1440px 캡처가 통과했다. 공개 후보는 `f2092694c7f3fb6e7ea940de828f1577769a6bf3`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-HERO-RHYTHM-20261003`, `E-PLAYWRIGHT-HERO-RHYTHM-20261003`, `E-DEPLOY-PIPELINE-HERO-RHYTHM-20261003`, `E-LIVE-PUBLIC-HERO-RHYTHM-20261003`.

## Mobile Hero and Narrow Header Release Recheck — badde8b — 2026-10-03

- 모바일 히어로를 단일 열로 전환해 데스크톱 비주얼 트랙 때문에 제목이 잘리던 문제를 제거하고, 430px 이하에서 메뉴·큰 글씨·공유 컨트롤을 44px 아이콘 버튼으로 화면 안에 고정했다. 공개 카피·제품 독립 경계는 유지했다.
- PR #121의 필수 검사, main workflow `37120130983`, Pages/live validator, 로컬·라이브 Playwright Chrome 실제 viewport 320/390/1440px 시각 검증이 통과했다. 공개 후보는 `badde8b982e1cee73b3a75d3513e65fcc38508c9`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-HERO-20261003`, `E-PLAYWRIGHT-MOBILE-HERO-20261003`, `E-DEPLOY-PIPELINE-MOBILE-HERO-20261003`, `E-LIVE-PUBLIC-MOBILE-HERO-20261003`.

## Research Scale Infographic Release Recheck — b8e6236 — 2026-10-03

- 연구 규모 인포그래픽을 고도화해 같은 PubMed 검색 기준의 Harvard·Oxford 문헌은 기관 비교로, 별도 WoS Core Collection SCIE 분석은 독립된 강조 수치로 읽히도록 분리했다. 연구 카피·제품 경계는 유지했다.
- PR #119 checks, main workflow `37118207429`, Pages/live validator, 390px·320px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `b8e6236d6dc749ea23191e45dd58d0ab9c542a0a`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-SCALE-20261003`, `E-CDP-RESEARCH-SCALE-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-SCALE-20261003`, `E-LIVE-PUBLIC-RESEARCH-SCALE-20261003`.

## Research Reading Orientation Release Recheck — 77a3032 — 2026-10-03

- 긴 연구 카드 구간의 sticky 읽기 레일이 현재 활성 연구 결과 제목을 보여주도록 고도화했다. 390px에서 지도 피부 선택 → `피부 연구 결과` 레일 → `research-skin` 카드 도착 흐름을 확인했고, 320px 한 열·1440px 데스크톱 레이아웃도 유지했다.
- PR #117 checks, main workflow `37116937264`, Pages/live validator, 390/320/1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `77a30323d2e5097a0f2be092c013615b1ee2ddd6`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-RAIL-ORIENTATION-20261003`, `E-CDP-RESEARCH-RAIL-ORIENTATION-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-RAIL-ORIENTATION-20261003`, `E-LIVE-PUBLIC-RESEARCH-RAIL-ORIENTATION-20261003`.

## Mobile Research Comparison Release Recheck — 4058bf6 — 2026-10-03

- 연구 결과 비교 도표의 모바일 정보 밀도를 고도화해 390px에서는 두 조건을 좌우로 비교하고, 320px에서는 한 열로 읽도록 적용했다. 공개 과학 카피·제품 경계는 유지했다.
- PR #115 checks, main workflow `37115590977`, Pages/live validator, 390px·320px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `4058bf61ed25d8fc95b3023f1187cdd78436cdb4`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-COMPARISON-20261003`, `E-CDP-MOBILE-COMPARISON-20261003`, `E-DEPLOY-PIPELINE-MOBILE-COMPARISON-20261003`, `E-LIVE-PUBLIC-MOBILE-COMPARISON-20261003`.

## Expert Video Gallery Release Recheck — 10a6192 — 2026-10-03

- 전문가 영상 갤러리에 고해상도 썸네일, 안전한 대체 이미지, 모바일 필터 연속성 단서를 적용하고 PR #113을 main에 병합했다. 공개 과학 카피·제품 경계는 유지했다.
- PR #113 checks, main workflow `37114410997`, Pages/live validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `10a61920df8bbcbe1b6f288a1d61425f48687800`이다.
- 자동 검증과 공개 배포 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 NAVI `USER_DECISION` / 완료 게이트 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-BROWSING-20261003`, `E-CDP-EXPERT-VIDEO-BROWSING-20261003`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-BROWSING-20261003`, `E-LIVE-PUBLIC-EXPERT-VIDEO-BROWSING-20261003`.

## Final Public Recheck — 16fc5d4 — 2026-10-03

- NAVI 문서 동기화 PR #111 병합과 main workflow `37113016531`의 release-verify·Pages 배포·라이브 smoke·release-status 성공을 확인했다.
- 최종 공개 validator는 HTTP 200과 70개 번들 해시, 공개 데이터 경계를 확인했다. 공개 사이트는 `https://kradavid.github.io/gaba_info/`에서 유지된다.
- 공개 배포 자동 게이트는 통과했지만 실제 브라우저·사용자·독립 과학·규제 감수는 남아 있으므로 NAVI 상태는 `USER_DECISION` / 완료 게이트 `NOT_READY`를 유지한다.

증적: `E-LIVE-PUBLIC-NAVI-MERGE-20261003`.

## Latest Release Recheck — cbd2f8e — 2026-10-03

- 연구 지도에서 선택한 주제가 상세 카드에서도 즉시 보이도록 활성 카드 강조와 선택 상태 동기화를 추가했다. 공개 과학 카피·제품 경계·연구 출처는 유지했다.
- PR #110 checks, main `37112425820`, Pages/live validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `cbd2f8ea1d5b341dbe5804b5f16f756e157c553b`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-MAP-ORIENTATION`, `E-CDP-RESEARCH-MAP-ORIENTATION`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-ORIENTATION`, `E-LIVE-PUBLIC-RESEARCH-MAP-ORIENTATION`.

## Latest Release Recheck — c6291f6 — 2026-10-03

- 공개 GABA 안내서 모바일 화면에서 작은 장 제목을 복원해 긴 페이지의 위치 단서를 강화했다. 공개 과학 카피·제품 경계는 유지했다.
- PR #108 checks, main `37111226511`, Pages/live validator, 320/390/1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `c6291f6bd2c62e77529da767b1d2a985f4acaab5`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-CHAPTER-LABELS`, `E-CDP-MOBILE-CHAPTER-LABELS`, `E-DEPLOY-PIPELINE-MOBILE-CHAPTER-LABELS`, `E-LIVE-PUBLIC-MOBILE-CHAPTER-LABELS`.

## Latest Release Recheck — 2ae71ef — 2026-10-03

- 공개 GABA 안내서의 모바일 장 진입점 제목이 고정 읽기 진행 레일에 가려지지 않도록 110px 상단 여백과 UI contract guard를 적용했다. 공개 과학 카피·제품 경계는 유지했다.
- PR #106 checks, main `37109900221`, Pages/live validator, 320/390/1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `2ae71ef1e1aa7c5ff71ca429197ad70c22dce3c1`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RAIL-TITLE-CLEAR`, `E-CDP-RAIL-TITLE-CLEAR`, `E-DEPLOY-PIPELINE-RAIL-TITLE-CLEAR`, `E-LIVE-PUBLIC-RAIL-TITLE-CLEAR`.

## Latest Release Recheck — bf235ed — 2026-10-03

- 기본 공개 GABA 안내서만 선행 import하고, 로딩 중에도 Apple-like 헤더·히어로 리듬을 보여주는 반응형 branded loading shell을 적용했다.
- PR #104 checks, main `37108431389`, Pages/live validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `bf235edeeea780dd42d0261a5760f100cff2ba9d`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-GUIDE-LOADING-SHELL`, `E-CDP-GUIDE-LOADING-SHELL`, `E-DEPLOY-PIPELINE-GUIDE-LOADING-SHELL`, `E-LIVE-PUBLIC-GUIDE-LOADING-SHELL`.

## Latest Release Recheck — b9160e4 — 2026-10-03

- 모바일 메뉴 접근성을 고도화해 키보드 포커스 순환과 현재 읽는 위치 semantics를 추가했다.
- PR #102 checks, main `37106966171`, Pages/live validator, 390/1440px Chrome CDP fallback이 통과했다. 공개 UI candidate는 `b9160e40fbca673134ca1563651a00d8dfdd615a`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-FOCUS-TRAP`, `E-CDP-MOBILE-FOCUS-TRAP`, `E-DEPLOY-PIPELINE-MOBILE-FOCUS-TRAP`, `E-LIVE-PUBLIC-MOBILE-FOCUS-TRAP`.

## Latest Release Recheck — 9c2913d — 2026-10-03

- 읽기 진행 레일의 장 순서를 실제 페이지 흐름과 맞추고 수면·회복 프롤로그를 03/13으로 정합화했다. 해시 링크·전문가 영상 선택 이동도 고정 헤더 아래에 안전하게 도착한다.
- PR #100 checks, main `37105696713`, Pages/live validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `9c2913db11440b10734345bc5bcba1d31161cc71`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-READING-RAIL-DEEPLINK`, `E-CDP-READING-RAIL-DEEPLINK`, `E-DEPLOY-PIPELINE-READING-RAIL-DEEPLINK`, `E-LIVE-PUBLIC-READING-RAIL-DEEPLINK`.

## Latest Release Recheck — 3d788e3 — 2026-10-03

- 모바일·태블릿 메뉴에 배경 분리·스크롤 잠금·배경 버튼 닫힘을 적용해 메뉴를 읽는 동안 페이지 위치가 흔들리지 않도록 했다.
- PR #98 checks, main `37104179510`, Pages/live validator, 390px 메뉴 열림·닫힘과 1440px Chrome CDP fallback 검증이 통과했다. 공개 candidate는 `3d788e39ef4d1dfa9d6d20845380ddcf7bfcc255`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS`, `E-CDP-MOBILE-MENU-FOCUS`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS`.

## Latest Release Recheck — cf2f123 — 2026-10-03

- 연구 결과 도표를 증가·감소 방향 화살표와 명시적 라벨로 고도화하고 320px 조건명 줄바꿈을 보정했다. 비교 문장과 방향 시각화가 한 화면에서 연결된다.
- PR #96 checks, main `37103072296`, Pages/live validator, 320/390/1440px Chrome CDP fallback 검증이 통과했다. 공개 candidate는 `cf2f123a74013956399306c591f2de261d1bf049`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-OUTCOME-DIRECTION`, `E-CDP-RESEARCH-OUTCOME-DIRECTION`, `E-DEPLOY-PIPELINE-RESEARCH-OUTCOME-DIRECTION`, `E-LIVE-PUBLIC-RESEARCH-OUTCOME-DIRECTION`.

## Latest Release Recheck — b1afe87 — 2026-10-03

- 전문가 영상 게시판에 주제 필터·영상 수를 추가하고 활성 필터를 모바일에서 중앙 정렬해, 필터 목록·선택 카드·즉시 재생이 함께 움직이도록 고도화했다.
- PR #94 checks, main `37101931045`, Pages/live validator, 320/390/1440px Chrome CDP fallback 검증이 통과했다. 공개 UI candidate는 `b1afe879a3266dd802e4f3d470a49d5985616b70`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-EXPERT-VIDEO-FILTER`, `E-CDP-EXPERT-VIDEO-FILTER`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-FILTER`, `E-LIVE-PUBLIC-EXPERT-VIDEO-FILTER`.

## Latest Release Recheck — bed5bf3 — 2026-10-03

- 공개 연구 결과 도표를 1·2단계 상대 방향 신호와 중립 조건명으로 고도화해, 보고되지 않은 정량 효과를 시각적으로 암시하지 않으면서 비교 방향을 빠르게 읽도록 했다.
- PR #92 checks, main workflow `37100751730`, Pages 배포·라이브 validator, 390/320/1440px Chrome CDP fallback 검증이 통과했다. 공개 candidate는 `bed5bf3245d489e74a79b33249bcdf9fba00668d`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-QUALITATIVE-DIRECTION`, `E-CDP-QUALITATIVE-DIRECTION`, `E-DEPLOY-PIPELINE-QUALITATIVE-DIRECTION`, `E-LIVE-PUBLIC-QUALITATIVE-DIRECTION`.

## Latest Release Recheck — 0257636 — 2026-10-03

- 공개 연구 결과 도표의 비교 리본을 정성적 방향 비교에 맞게 보완했다. 두 조건을 같은 길이로 유지하고 점선·실선으로 구분해, 보고되지 않은 효과 크기를 시각적으로 만들어내지 않도록 했다.
- PR #89 checks, TF heartbeat 복구 PR #90 checks, main workflow `37099561557`, 라이브 validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 candidate는 `0257636233ae758a4bc6e90dac7c77e6fd42bc67`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-QUALITATIVE-COMPARISON`, `E-CDP-QUALITATIVE-COMPARISON`, `E-DEPLOY-PIPELINE-QUALITATIVE-COMPARISON`, `E-LIVE-PUBLIC-QUALITATIVE-COMPARISON`, `E-NAVI-TF-HEARTBEAT-REFRESH`.

## Latest Release Recheck — 698f1fb — 2026-10-03

- 모바일 수면·회복 카드 진행 맵을 7×2 전체 단계 표시로 고도화해 14개 카드의 흐름을 한눈에 확인하도록 했다. 320/390/1440px 렌더와 마지막 단계 선택, 자동 전환·일시정지 구조를 확인했다.
- PR #87 checks, main workflow `37098162499`, live validator, 390px·1440px Chrome CDP fallback 검증이 통과했다. 공개 candidate는 `698f1fbf93b960df38955fdb85ee223260df4cc7`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RECOVERY-MAP-MOBILE`, `E-CDP-RECOVERY-MAP-MOBILE`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-MOBILE`, `E-LIVE-PUBLIC-RECOVERY-MAP-MOBILE`.

## Latest Release Recheck — 3b75bae — 2026-10-03

- 공개 `/research/`를 제품 광고·구매 유도와 분리된 일반 GABA 연구 읽기 경로로 고도화했다. 연구 카드의 관찰 결과, 연구 조건, 출처 연결은 유지하고 제품 CTA·제품 브랜드·`view=products`·SmartStore 연결은 제거했다.
- PR #85 checks, main workflow `37096916896`, live validator, 390px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `3b75baecbc84623a759131393ef1e47f3aa2ba07`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION` / `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-PRODUCT-FREE`, `E-CDP-RESEARCH-PRODUCT-FREE`, `E-DEPLOY-PIPELINE-RESEARCH-PRODUCT-FREE`, `E-LIVE-PUBLIC-RESEARCH-PRODUCT-FREE`.

## Latest Release Recheck — a0ee159 — 2026-10-03

- 모바일 연구 카드에서 출처 라벨과 원문 링크가 붙어 읽히던 문제를 보완해 `출처 ·`와 PMID 링크를 분리했다. 연구 결과나 과학적 주장을 새로 추가하지 않았다.
- PR #83 checks, main workflow `37095659387`, live validator, 390px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `a0ee159235477ee24c2855251b2d17b21c0b317e`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-SOURCE-LABEL`, `E-CDP-RESEARCH-SOURCE-LABEL`, `E-DEPLOY-PIPELINE-RESEARCH-SOURCE-LABEL`, `E-LIVE-PUBLIC-RESEARCH-SOURCE-LABEL`.

## Latest Release Recheck — 10aedca — 2026-10-03

- 전문가 영상 카드에서 현재 재생 중인 동일 영상을 다시 선택해도 iframe이 다시 로딩 상태로 돌아가지 않도록 보완했다. 다른 영상을 선택할 때만 로딩 상태를 새로 시작하며, 모바일 선택 이동과 `재생 중` 상태는 유지한다.
- PR #81 checks, main workflow `37094629598`, live validator, 390px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `10aedcab10448e5341123234b6ce9979b068bc58`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-RESELECT`, `E-CDP-VIDEO-RESELECT`, `E-DEPLOY-PIPELINE-VIDEO-RESELECT`, `E-LIVE-PUBLIC-VIDEO-RESELECT`.

## Latest Release Recheck — 4604805 — 2026-10-03

- 전문가 영상 게시판에서 현재 선택된 영상 카드에 `재생 중` 배지를 추가해 모바일에서도 플레이어와 목록의 연결을 즉시 이해할 수 있게 했다.
- PR #79 checks, main workflow `37093519815`, live validator, 390px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `4604805e746be4d28b34fb200196ce8d5905c85f`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-SELECTION-STATE`, `E-CDP-VIDEO-SELECTION-STATE`, `E-DEPLOY-PIPELINE-VIDEO-SELECTION-STATE`, `E-LIVE-PUBLIC-VIDEO-SELECTION-STATE`.

## Latest Release Recheck — 95c3830 — 2026-10-03

- 전문가 영상 선택 직후 검은 빈 화면처럼 보이던 구간을 로딩 오버레이로 보완하고, 영상이 준비되면 자연스럽게 실제 화면으로 전환되도록 했다. 모션 감소 환경의 스피너 정지도 반영했다.
- PR #77 checks, main workflow `37092613987`, live validator, 390px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `95c3830984d09ee8baca62ebafacd3a0c8c3d715`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-LOADING`, `E-CDP-VIDEO-LOADING`, `E-DEPLOY-PIPELINE-VIDEO-LOADING`, `E-LIVE-PUBLIC-VIDEO-LOADING`.

## Latest Release Recheck — 79eea1f — 2026-10-03

- 공개 배포본의 701–860px 태블릿 헤더를 아이콘 메뉴 전환으로 보완해 메뉴·큰 글씨·공유 버튼이 화면 밖으로 밀리지 않도록 했다. 768px·820px에서 실제 메뉴를 열어 44px 컨트롤과 가로 폭을 확인했다.
- PR #75 checks, main workflow `37091703892`, live validator, 768/820/390/1440px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `79eea1f08423f7d9f52021770310691b9f6e4db2`이다.
- 자동 검증과 공개 배포 품질 게이트는 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

증적: `E-LOCAL-BUILD-TABLET-HEADER`, `E-CDP-TABLET-HEADER`, `E-DEPLOY-PIPELINE-TABLET-HEADER`, `E-LIVE-PUBLIC-TABLET-HEADER`.

## Latest Release Recheck — e5f1eab — 2026-10-03

- 전역 메뉴 첫 항목에 `수면과 회복`을 연결하고, 읽기 진행 메타를 보조기기용 단일 상태로 정리했으며, 모바일 메뉴 레이어를 sticky 진행 바 위로 보정했다.
- PR #73 checks, main workflow `37090787855`, 라이브 validator, 390/1440px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `e5f1eab190cd29fb4c18ffe2e469f18edb92ba1f`이다.
- 자동 검증은 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 288a883 — 2026-10-03

- 수면과 회복 인터스티셜을 읽기 진행 표시와 동기화해 모바일·데스크톱에서 `수면과 회복 02 / 12` 이후 `연구 지도 03 / 12`로 자연스럽게 이어지도록 고도화했다.
- PR #70 checks, main push run `37089334725`, 문서 동기화 main push run `37089833696`, 라이브 validator, 390/1440px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `288a883d5e0537a1be6bdd2660d90edcc5e82df0`이다.
- 자동 검증은 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 48f4876 — 2026-10-03

- 연구 상세 카드가 보이는 위치에 맞춰 연구 지도에서 현재 주제를 활성화하고, 지도 선택에는 `aria-current`를 연결했다.
- PR #68 checks, main push run `37088047547`, 라이브 validator, 390/1440px Chrome CDP fallback 검증이 통과했다. 공개 후보는 `48f48764fd4fa06bb785a2b12cc5c639104e2dd2`이다.
- 자동 검증은 통과했지만 Browser 플러그인·Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — d3ff9e3 — 2026-10-03

- 연구 지도 5개 항목을 키보드·터치로 선택할 수 있게 하고, 선택한 주제의 상세 연구 카드로 자연스럽게 이어지도록 고도화했다.
- PR #66 checks, main push run `37086967211`, 라이브 validator, 390/1440px Chrome CDP 검증이 통과했다. 공개 후보는 `d3ff9e3f27833f3719b76f0cc377468a23bcc421`이다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — e514a37 — 2026-10-03

- 연구 지도 아래의 읽기 순서를 01–04 시각 레일로 정리해 `지도 → 대상 → 결과 → 해석` 흐름을 한눈에 파악하도록 개선했다.
- PR #64 checks, main push run `37085785228`, 라이브 validator, 390/1440px Chrome CDP 검증이 통과했다. 공개 후보는 `e514a375f0d8fdfeefbba2043b0a18268224b5d2`이다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 0147e3c — 2026-10-03

- 모바일 히어로의 편집 안내와 `3분 읽기` 레일을 반투명 읽기 표면으로 보강해 자연 이미지 위의 보조 문장 가독성을 높였다.
- PR #62 checks, main push run `37084454201`, 라이브 validator, 390/320/1440px Chrome CDP 검증이 통과했다. 공개 후보는 `0147e3c15a7e0acd700ff4f75e9fcddc03b39b05`이다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 078d231 — 2026-10-03

- 연구 도표를 읽는 중 상단 진행 바 뒤로 콘텐츠가 비치던 작은 가독성 결함을 불투명 레이어로 보정했다. 연구 결과·해석 텍스트가 진행 안내와 시각적으로 분리된다.
- PR #60 checks, main push run `37082824190`, 라이브 validator, 390/320/1440px CDP 검증이 통과했다. 공개 후보는 `078d231b637fd4a2267d74b01cc304d025b88576`이다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Original Goal

GABA 공개 안내서를 모바일 중심·제품 독립적·출처 연결형 정보 경험으로 점검하고, 공개 배포 품질을 재현 가능한 증거로 관리한다.

## Final Deliverables

- 공개 사이트: https://kradavid.github.io/gaba_info/
- 연구 확장 지도와 인지·피부·근육·성장호르몬·면역 상세 카드
- 결과 비교 도표와 성장호르몬 상대 크기 막대, 출처 연결 구조
- NAVI 목표·산출물·coverage·증거·감사·레드팀 기록

## Latest Release Recheck — 89978ea — 2026-10-03

- 연구 카드 시작 전에 사람 대상 연구와 피부·성장 등 확장 연구를 구분하는 시각 키를 제공해 연구 결과를 읽는 기준을 먼저 전달한다.
- 모바일 아이콘 컨트롤에 보조 title을 추가했으며, 로컬 UI 계약·typecheck·127개 테스트·build·성능, 라이브 390/320/1440px CDP, main 배포가 모두 통과했다.
- 현재 공개 후보는 `89978ea124178774617b5f97ac469b6dca2e4027`이며 validator는 HTTP 200·70 bundles·12 claims·6 master records·6 share pages를 보고했다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 19a38ab — 2026-10-03

- 공개 연구 카드에서 관찰된 핵심 결과 문장을 바로 복사할 수 있고, 브라우저 클립보드 권한이 없으면 대체 선택 안내를 표시한다.
- 로컬 UI 계약·typecheck·127개 테스트·build·성능, 라이브 390/1440px CDP, main 배포가 모두 통과했다.
- 현재 확인한 공개 후보는 `19a38abc7f1a7b5591f228c7abe1e42862ef0cca`이며 validator는 HTTP 200·70 bundles·12 claims·6 master records·6 share pages를 보고했다.
- 자동 검증은 통과했지만 Safari/iOS/Android, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 3f4a3e5 — 2026-10-03

- 연구 결과 그래프 앞에 `대상·방법·측정` 연구 프로필을 추가해 소비자가 결과를 보기 전에 연구의 범위와 측정 대상을 한눈에 파악하도록 보완했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build·성능 검사가 통과했고, 390px·1440px 라이브 CDP에서 6개 프로필·가로 넘침 없음·runtime errors `[]`를 확인했다.
- PR #53 필수 검사와 main 배포 run `37077676557`의 release verification·Pages publish·smoke-live·release status가 성공했고, 라이브 validator도 HTTP 200·70 bundle hashes·12 claims·6 master records·6 share pages를 확인했다.
- 자동 검증은 통과했지만 Safari/iOS/Android 대표 환경, 실제 고령 사용자 독해성, 독립 과학·규제 감수는 남아 있어 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Narrow-phone Mobile Hardening Recheck — d0f1741 — 2026-10-03

- 320–430px 좁은 모바일에서 히어로 제목 클리핑과 헤더 버튼 잘림을 보완했고, 메뉴·큰 글씨·공유 컨트롤을 44px 터치 영역으로 유지했다.
- 로컬 UI 계약·typecheck·127개 테스트·production build가 통과했고, main 배포 run `37076052369`와 실제 공개 URL validator도 성공했다.
- 공개 390px CDP 검증에서 가로 넘침 없음, 메뉴·큰 글씨 상호작용, runtime errors `[]`를 확인했다. 외부 브라우저·실사용자·독립 과학·규제 검증이 남아 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`이다.

## Final Public Recheck After NAVI Sync — 6f48bae — 2026-10-03

- 공개 후보 `6f48bae7a7adcc22b68fbefc2a9ca13b002fe540`의 main 배포 run `37074307727`이 성공했고, 라이브 validator가 HTTP 200·70 bundle hashes·12 claims·6 master records·6 share pages를 확인했다.
- 제품 데이터 경계, 내부 운영 스냅샷 제외, teaser HOLD, smartStoreOnly, removed750 및 provenance 일치도 유지됐다.
- 자동 검증은 통과했지만 외부 과학·규제 감수, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트가 남아 있어 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Final NAVI Documentation Release Recheck — 49daf99 — 2026-10-03

- NAVI 상태·감사·레드팀·증적 문서를 main에 반영한 최종 공개 candidate `49daf9901113be3876b7fd6f94684ba2121c3b9a`를 확인했다.
- 공개 validator는 HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, 내부 운영 스냅샷 제외, 제품 데이터 경계와 provenance 일치를 확인했고, main 배포 run `37073665476`도 성공했다.
- 자동 검증과 라이브 배포는 완료됐지만 외부 과학·규제 감수, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트가 남아 있어 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS` / NAVI `USER_DECISION`으로 유지한다.

## Latest Release Recheck — 7a64726 — 2026-10-03

- 긴 안내서의 현재 위치를 `progressbar`로 보조기기에 노출하고 진행 표시의 숫자·글자 크기를 모바일에서도 읽기 쉽게 보완했다. 현재 사용하지 않는 구형 챌린지 이미지 4종은 정적 번들에서 제거했다.
- 로컬 검증은 UI 계약, 타입체크, 127개 테스트, production build, 11개 라우트, 70개 번들을 통과했다. `/gaba_info/` Pages 빌드 로컬 재현 성능은 `1,430,551 <= 1,650,000` bytes였다.
- PR #47 필수 검사(`37072831937`, `37072831902`)와 main 배포 run `37072974276`의 Pages publish·라이브 smoke·release status가 성공했다. 공개 validator는 candidate `7a64726c5e5df25d0b1f0377bb42e2b15face784`, HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, 내부 운영 스냅샷 제외, 제품 데이터 경계 유지와 provenance 일치를 확인했다.
- 1440px·390px Chrome CDP 대체 QA에서 진행 표시 접근성 값·큰 글씨 상태·앵커 비가림·가로 넘침 없음·runtime errors `[]`를 확인했다.

## Latest Release Recheck — 2c8bd84 — 2026-10-03

- 고정 헤더·읽기 진행 표시와 섹션 앵커가 겹치지 않도록 이동 오프셋을 보완해, 모바일·데스크톱에서 메뉴를 누른 뒤 섹션 제목과 다음 콘텐츠가 바로 읽히도록 했다.
- 로컬 타입체크·127개 테스트·production build·11개 정적 라우트·74개 번들·UI 계약 검사와 정확한 Pages 성능 `1649668 <= 1650000` bytes를 통과했다. PR #45 필수 검사와 main 배포 run `37070479805`의 Pages·smoke·release status도 성공했다.
- 라이브 validator는 HTTP 200, candidate `2c8bd8452eaf978b41717feb999bbbcc35b84a33`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외, smartStoreOnly, removed750, provenance matched를 확인했다.
- 공개 URL 1440px·390px Chrome CDP 시각·상호작용 검증에서 연구 확장 메뉴 이동과 핵심 앵커의 고정 UI 충돌 없음, 가로 넘침 없음, runtime errors `[]`를 확인했다. 잔여 외부 조건은 유지한다.

## Latest Release Recheck — 5af1f11 — 2026-10-03

- `06 · 연구의 확장` 지도 아래에 `읽는 순서 → 01 지도 → 02 대상 → 03 결과 → 04 해석` 시각 레일을 추가해 연구 카드의 대상·결과·해석을 별도 이동 없이 바로 읽도록 보완했다.
- 로컬 타입체크·127개 테스트·production build·11개 정적 라우트·74개 번들·성능 `1649481 <= 1650000` bytes와 Pages CI 성능 `1649972 <= 1650000` bytes를 통과했다.
- PR #43 필수 검사와 main 배포 run `37068741690`의 release verification, fresh TF pulse, Pages 배포, 라이브 smoke, release status가 성공했다. `deploy-worker`는 `STATIC_ONLY`로 건너뛰었다.
- 라이브 validator는 HTTP 200, candidate `5af1f11d688c09b95ee3f9e6a391f12e0a0d3c16`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- 공개 URL 1440px·390px Chrome CDP 시각 검증에서 연구 지도와 읽기 레일, 첫 연구 카드 연결을 확인했고 runtime errors `[]`였다. 잔여 외부 조건은 유지한다.

## Latest Release Recheck — ca20d1e — 2026-10-03

- 연구 확장 지도 아래에 `지도 → 대상 → 결과 → 해석` 읽기 순서를 표시해, 연구 영역을 선택하거나 다른 페이지로 이동하지 않고 바로 상세 카드로 이해하도록 흐름을 보완했다.
- 로컬 타입체크·127개 테스트·production build·11개 정적 라우트·74개 번들·성능 `1649489 <= 1650000` bytes와 PR #38 필수 검사를 통과했다.
- heartbeat PR #39 병합 후 main 배포 run `37065791706`의 release verification, fresh TF pulse, Pages 배포, 라이브 smoke, release status가 성공했다. NAVI 문서 동기화 PR #40 병합 후 최종 main run `37066583312`도 같은 게이트를 통과했으며 `deploy-worker`는 `STATIC_ONLY`로 건너뛰었다.
- 최종 라이브 validator는 HTTP 200, candidate `ca20d1e995f3adbdeba4015b1827f3c9a001a7a2`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다. 기능 변경 기준은 `79432de`이며 최종 공개본에는 NAVI 문서 동기화가 포함됐다.
- Chrome CDP 대체 시각 QA에서 1440px·390px 연구 지도와 연구 카드 전환을 확인했고 runtime errors `[]`였다. 320/360/390px 헤더의 기존 충돌·가로 넘침 없음과 큰 글씨 선택 유지도 보존됐다.
- 외부 과학·규제 감수, Safari/iOS/Android 실기기, 실제 고령 사용자 테스트는 완료로 표시하지 않는다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`, NAVI 상태는 `USER_DECISION`을 유지한다.

## Latest Release Recheck — 713627f — 2026-10-03

- 연구 확장 지도에 인지·피부·근육·성장호르몬·면역을 구분하는 의미 기반 선형 아이콘을 추가해 소비자가 다섯 영역을 연결 구조 안에서 빠르게 식별하도록 보완했다.
- 로컬 타입체크·127개 테스트·production build·11개 정적 라우트·74개 번들·성능 `1649348 <= 1650000` bytes와 PR #37 필수 검사를 통과했다.
- main 배포 run `37063502715`의 release verification, Pages 배포, 라이브 smoke, release status가 성공했다. `deploy-worker`는 `STATIC_ONLY`로 건너뛰었다.
- 라이브 validator는 HTTP 200, candidate `713627f3faa7d876ffabc2aa58332433342c6fad`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- Chrome CDP 대체 시각 QA에서 1440px·390px 연구 지도와 대표 화면을 확인했고 runtime errors `[]`였다. 320/360/390px 헤더의 충돌·가로 넘침 없음과 큰 글씨 선택 유지도 재확인했다.
- 외부 과학·규제 감수, Safari/iOS/Android 실기기, 실제 고령 사용자 테스트는 완료로 표시하지 않는다. 최종 상태는 `INTERNAL_QA_READY_WITH_CONDITIONS`, NAVI 상태는 `USER_DECISION`을 유지한다.

## Latest Release Recheck — 34807cb — 2026-10-03

- `34807cb` 공개본에서 연구 결과 도표의 모든 읽을 수 있는 문구를 차트 기준 글자에 상대적으로 묶어 큰 글씨 모드의 확대 일관성을 높였다.
- 로컬 타입체크·127개 테스트·production build·정적 라우트·성능 예산과 PR #36 필수 검사를 통과했다. 로컬 성능 total은 `1649104 <= 1650000` bytes였다.
- 라이브 390px Chrome CDP에서 본문 16px가 큰 글씨 선택 후 16.96px, 도표 요약 16.96px, 도표 주석 17.9776px로 확대되고 선택 상태가 유지됐다. 320/360/390px 헤더의 터치 영역·가로 폭·런타임 오류도 통과했다.
- 라이브 validator는 HTTP 200, candidate `34807cba60794717d4bc3c110f59767fb184fc23`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다. main 배포 run `37061173471`의 Pages·smoke·release status도 성공했다.

## Latest Release Recheck — 24c718b — 2026-10-03

- `24c718b` 공개본에서 큰 글씨 모드가 연구 결과 도표의 요약·측정값·주석까지 함께 확대되도록 보완했다.
- 라이브 390px Chrome CDP에서 본문·도표 요약·도표 주석이 16px에서 16.96px로 확대되고 새로고침 후 선택이 유지되며, 320/360/390px 헤더의 세 컨트롤이 44px 이상이고 가로 넘침·런타임 오류가 없음을 확인했다.
- 라이브 validator는 HTTP 200, candidate `24c718bc46ae818ab09a460c09ff8823dd1c8560`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- GitHub Actions `37059529485`의 release verification, Pages 배포, 라이브 smoke test, release status가 모두 성공했다.

## Latest Release Recheck — b3059b2 — 2026-10-03

- `b3059b2` 공개본에서 320–360px 초소형 모바일 헤더를 아이콘형으로 정리해 메뉴·큰 글씨·공유 컨트롤이 각각 44px 터치 영역을 유지하도록 보완했다.
- 320/360/390px Chrome CDP 라이브 QA에서 버튼 겹침 없음, 뷰포트 가로 폭 유지, 접근성 라벨, 런타임 오류 0건을 확인했다.
- 라이브 validator는 HTTP 200, candidate `b3059b2e45b60af031bf174e07bff7f532906643`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- GitHub Actions `37057405022`의 release verification, Pages 배포, 라이브 smoke test, release status가 모두 성공했다.

## Latest Release Recheck — 0c464c1 — 2026-10-03

- `0c464c1` 공개본에서 헤더의 `큰 글씨`·`기본 글씨` 토글을 추가해 모바일 독자가 본문 크기를 직접 조절할 수 있게 했다.
- 390px Chrome CDP 라이브 QA에서 기본 상태와 큰 글씨 상태의 전환, `aria-pressed` 상태, 새로고침 후 선택 유지, 가로 넘침 없음, 런타임 오류 0건을 확인했다.
- 라이브 validator는 HTTP 200, candidate `0c464c197d7ab3b3c7f992be89b49a310339075d`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- GitHub Actions `37055827540`의 release verification, Pages 배포, 라이브 smoke test, release status가 모두 성공했다.

## Latest Release Recheck — 5321f9d — 2026-10-03

- `5321f9d` 공개본에서 수면·회복 14단계 지도에 `01–14` 단계 번호와 현재 선택 단계 표시를 추가했다.
- 390px Chrome CDP 라이브 QA에서 마지막 단계 선택 시 단계가 화면 안으로 자동 중앙 정렬되고, 페이지 가로 폭이 390px로 유지되며 런타임 오류가 없음을 확인했다.
- 라이브 validator는 HTTP 200, candidate `5321f9d4f3f0e1af56b73b225ea0dfc00fc3f4be`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- GitHub Actions `37053872031`의 release verification, Pages 배포, 라이브 smoke test, release status가 모두 성공했다.

## Previous Release Recheck — 3af1327 — 2026-10-03

- `3af1327` 공개본에서 성장호르몬 연구 카드의 `약 +400%`·`약 +375%` 결과를 상대 막대로 빠르게 비교할 수 있도록 보완했다.
- 막대는 해당 연구 안에서 가장 높은 반응을 100으로 둔 상대 표시라는 설명을 함께 제공해 숫자와 시각화의 의미를 분리했다.
- 라이브 validator는 HTTP 200, candidate `3af1327b2f2e47a7feea54201928183271dfce20`, 74 bundle hashes, 12 claims, 6 master records, 6 share pages, teaser HOLD, internal operations snapshots 제외를 확인했다.
- Chrome CDP 390px QA에서 두 막대·해석 문구·가로 넘침 없음·runtimeErrors 0건을 확인했다.

## Success Criteria Results

| Criterion | Result | Evidence | Notes |
|---|---|---|---|
| AC-001 | PASS | E-LIVE-PUBLIC-COMPACT-HEADER, E-DEPLOY-PIPELINE-COMPACT-HEADER, E-LIVE-PUBLIC-READING-SIZE, E-DEPLOY-PIPELINE-RESEARCH-PROFILE, E-LIVE-PUBLIC-RESEARCH-PROFILE | `3f4a3e5` 최신 runtime candidate의 main 배포 성공, 라이브 200, 공개 데이터 경계와 정적 번들 재확인 |
| AC-002 | PASS | E-CDP-DESKTOP, E-CDP-MOBILE, E-CDP-RECOVERY-INDEX, E-CDP-RESEARCH-MAP-CONNECTORS, E-CDP-RESEARCH-PROFILE, E-LIVE-PUBLIC-RESEARCH-PROFILE | 연구 영역 5개·상세 카드 5개·수면 연구 프로필과 390/1440px 배치 확인 |
| AC-003 | PASS | E-CDP-METRIC-VIZ, E-LIVE-PUBLIC-METRIC-VIZ, E-CDP-RESEARCH-PROFILE, E-LIVE-PUBLIC-RESEARCH-PROFILE | 비교 조건·연구 대상·방법·측정·핵심 결과·성장호르몬 상대 막대·출처가 표시됨 |
| AC-004 | PASS | E-CDP-COMPACT-HEADER, E-CDP-READING-SIZE, E-CDP-RECOVERY-INDEX | 320/360/390px 가로 넘침 없음, 44px 터치 영역·읽기 크기 전환·단계 흐름 확인 |
| AC-005 | PASS | E-LOCAL-BUILD-COMPACT-HEADER, E-LOCAL-BUILD-READING-SIZE, E-LOCAL-TESTS, E-LOCAL-BUILD-RESEARCH-PROFILE, E-LIVE-PUBLIC-RESEARCH-PROFILE | 타입체크·127개 테스트·공개 검사·Pages 성능 예산과 연구 프로필 구조 통과 |
| AC-006 | PASS | E-RESEARCH-COPY | 제품 독립 과학 정보 경계와 연구 출처 연결 유지 |
| AC-007 | PASS_WITH_CONDITIONS | E-LOCAL-BUILD, E-REDTEAM-REVIEW | 감사·레드팀은 분리됐으나 외부 검증은 남음 |

## Review Summary

- Coverage Summary: Technology, Product, User, Data, Quality, Distribution, Marketing, Operations, Security, Risk, Execution은 확인. Science, Regulation, Legal, People, Post-launch는 외부 검토 상태.
- Key Findings: 코드·번들·라이브·대표 화면은 통과했으나 전체 브라우저, 고령 사용자, 독립 과학·규제 감수는 남음.
- Evidence Quality: 자동 명령과 Chrome CDP 실행 증거는 재현 가능하며 외부 적합성의 증거는 없음.
- Remaining Assumptions: CDP 대표성, 실제 사용자 독해성, 공유 과정의 카피 재해석.
- Remaining Unknowns: Safari/iOS/Android 렌더, 고령 사용자 이해도, 외부 reviewer 판단.
- Residual Risks: 과학 카피 오인, 브라우저별 시각 차이, 새 콘텐츠 추가 시 출처 경계 훼손.
- Audit Result: PASS_WITH_CONDITIONS
- Red Team Result: PASS_WITH_CONDITIONS
- User Decisions Required: 외부 과학·규제 감수와 추가 실기기 QA를 언제 완료할지 결정.
- Recommended Next Actions: 외부 검토 증거와 대표 실기기 QA를 등록한 뒤 동일 gate를 재실행.
- Deployment Follow-up: main 배포 run `37077676557`가 통과했고, Pages 배포·라이브 smoke test·release status를 확인했다. 공개 URL의 runtime candidate SHA는 `3f4a3e552978721ccc72187ae85a89af05174d5f`이다.
- Final Status: INTERNAL_QA_READY_WITH_CONDITIONS; NAVI 상태는 USER_DECISION. 외부 과학·규제 감수, Safari/iOS/Android 대표 환경, 실제 고령 사용자 테스트는 완료로 표시하지 않는다.
