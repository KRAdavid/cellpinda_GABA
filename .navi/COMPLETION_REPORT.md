# Completion Report

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
