# Project Changelog

## 연구 지도 딥링크 상태 복원 공개 배포: 2026-10-04 / candidate `4d9bfde`

`#research-skin` 등 연구 카드 공유 링크가 초기 진입에서 선택 연구 지도·상세 카드·읽기 진행·브라우저 제목을 함께 복원하도록 보완했다. 브라우저 해시 변경 시에도 연구 주제 상태를 동기화한다. PR #170, main workflow `37158456376`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 로컬·Playwright Chrome fallback 390/1440px에서 피부 딥링크 진입 후 근육 해시 변경을 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-PLAYWRIGHT-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-DEEPLINK-CONTEXT-20261004`, `E-LIVE-PUBLIC-RESEARCH-DEEPLINK-CONTEXT-20261004`.

## 선택 영상 카드 직접 공유 고도화 공개 배포: 2026-10-04 / candidate `e709f2c`

전문가 영상 선택 카드 안에 `이 영상 공유` 행동을 추가했다. 현재 영상의 제목·video 쿼리·`#expert-videos` 위치를 그대로 공유하도록 기존 chapter-aware payload를 연결하고, 모바일에서도 읽기 쉬운 dark-panel 버튼과 focus-visible 상태를 적용했다. PR #169, main workflow `37157666983`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 공개 320/390/1440px에서 공유 버튼·toast·payload·포스터·진행 표시·가로 폭·브라우저 오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-DIRECT-VIDEO-SHARE-20261004`, `E-PLAYWRIGHT-DIRECT-VIDEO-SHARE-20261004`, `E-DEPLOY-PIPELINE-DIRECT-VIDEO-SHARE-20261004`, `E-LIVE-PUBLIC-DIRECT-VIDEO-SHARE-20261004`.

## 전문가 영상 공유·재진입 맥락 고도화 공개 배포: 2026-10-04 / candidate `68efaca`

선택한 전문가 영상의 식별자를 `?video=...#expert-videos`에 보존하고, 공유 URL 재진입 시 같은 영상과 장 위치를 복원하도록 고도화했다. 브라우저 제목과 공유 문구도 현재 장·선택 영상에 맞춰 갱신하고 recovery heading의 접근성 문장을 보정했다. PR #167 merge `a1de959`, heartbeat PR #168 merge `68efaca`, main workflow `37156517433`, live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 로컬·공개 320/390/1440px에서 클릭·새로고침 복원·포스터/iframe 지연·가로 폭·브라우저 오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-VIDEO-SHARE-CONTEXT-20261004`, `E-PLAYWRIGHT-VIDEO-SHARE-CONTEXT-20261004`, `E-DEPLOY-PIPELINE-VIDEO-SHARE-CONTEXT-20261004`, `E-LIVE-PUBLIC-VIDEO-SHARE-CONTEXT-20261004`.

## 모바일 퍼블리싱 성능·타이포그래피 고도화 공개 배포: 2026-10-04 / candidate `d71ab6c`

첫 화면에 보이지 않는 전문가 영상 썸네일을 지연 로딩으로 전환해 초기 모바일 진입 요청을 줄이고, 한국어 장문 제목에 균형 잡힌 줄바꿈을 적용했다. PR #166, main workflow `37154976973`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 로컬·공개 320/390/1440px 직접 링크, 초기 영상 요청 0건, 연구 지도 근육 카드 이동, 가로 폭·브라우저 오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-LOCAL-BUILD-MOBILE-PERFORMANCE-20261004`, `E-PLAYWRIGHT-MOBILE-PERFORMANCE-20261004`, `E-DEPLOY-PIPELINE-MOBILE-PERFORMANCE-20261004`, `E-LIVE-PUBLIC-MOBILE-PERFORMANCE-20261004`.

## 직접 공유 링크 정렬 안정화 공개 배포: 2026-10-04 / candidate `818cc2f`

`#expert-videos` 같은 장으로 직접 진입할 때 이미지·폰트·레이아웃이 늦게 안정화되어 제목이 어긋날 수 있는 흐름을 PR #165에서 보완했다. 초기 정렬과 다중 안정화 시점, `window.load`·`document.fonts`·`ResizeObserver` 재정렬을 적용했다. main workflow `37153757926`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 로컬·공개 320/390/1440px Chrome fallback에서 제목·진행 레일·영상 영역·가로 폭·오류를 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-DEEP-LINK-ALIGN-20261004`, `E-PLAYWRIGHT-DEEP-LINK-ALIGN-20261004`, `E-DEPLOY-PIPELINE-DEEP-LINK-ALIGN-20261004`, `E-LIVE-PUBLIC-DEEP-LINK-ALIGN-20261004`.

## 전문가 영상 선택 포커스 복귀 공개 배포: 2026-10-04 / candidate `c33b427`

전문가 영상 카드를 클릭하거나 Enter로 선택한 뒤 새 영상 영역을 바로 읽을 수 있도록 `#expert-video-feature`에 포커스를 복귀시키고 동적 제목 연결·`aria-live`·focus-visible 윤곽선을 보강했다. PR #164, main workflow `37152307391`, Pages 배포·라이브 smoke·release status와 live validator HTTP 200·STATIC·공개 데이터 정합성이 성공했다. 로컬 390px Chrome fallback에서 영상 iframe 전환·선택 카드 1개·가로 넘침 없음·오류 없음을 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-VIDEO-FEATURE-FOCUS-20261004`, `E-PLAYWRIGHT-VIDEO-FEATURE-FOCUS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-FEATURE-FOCUS-20261004`, `E-LIVE-PUBLIC-VIDEO-FEATURE-FOCUS-20261004`.

## 공개 배포 자동 재감리·NAVI 동기화: 2026-10-04 / candidate `4d94150`

최신 공개본을 실제 독자 흐름으로 자동 재현했다. 390px 메뉴·포커스·연구 지도·수면 영상 필터·iframe 즉시 재생·3초 회복 카드, 320/390/412/768/1440px 직접 해시 진입을 확인했고 새 CRITICAL/MAJOR 결함은 없었다. NAVI 문서 동기화 후 main workflow `37151251781`의 Pages 배포·라이브 smoke·release status까지 성공했으며 라이브 validator도 HTTP 200·STATIC·candidate `4d94150`·정적 공개 경계 정합성을 유지했다. Browser 플러그인 부재로 Chrome fallback을 사용했으며 외부 브라우저·실사용자·독립 과학·규제 감수는 남아 있다. 공개 UI 코드 변경은 필요하지 않아 불필요한 재작업은 하지 않고 NAVI 증거·감사·레드팀 기록만 갱신했다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다.

증적: `E-PLAYWRIGHT-PUBLIC-INTERACTION-AUDIT-20261004`, `E-PLAYWRIGHT-PUBLIC-HASH-CROSSWIDTH-20261004`, `E-DEPLOY-PIPELINE-PUBLIC-RECHECK-20261004`, `E-LIVE-PUBLIC-CURRENT-RECHECK-20261004`.

## 모바일 메뉴 닫힘 포커스 복귀 공개 배포: 2026-10-04 / candidate `510e9ad`

모바일 메뉴 항목 이동과 배경 클릭으로 메뉴가 닫힐 때 키보드·스크린리더 포커스가 문서 배경에 남지 않도록 토글 버튼으로 복귀시켰다. PR #163, main workflow `37149705144`, Pages·라이브 smoke·release status와 공개 live validator, 390px Chrome fallback 상호작용 검증이 성공했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS-20261004`, `E-PLAYWRIGHT-MOBILE-MENU-FOCUS-20261004`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS-20261004`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS-20261004`.

## 직접 해시 진입 정렬 고도화 공개 배포: 2026-10-04 / candidate `70d66b5`

직접 링크로 연구·수면·전문가 영상 장에 들어올 때 제목이 고정 읽기 레일에 늦게 맞춰지던 문제를 PR #162에서 `useLayoutEffect` 초기 정렬과 180/420/780ms 안정화 재정렬로 보완했다. main workflow `37148328986`, Pages·라이브 smoke·release status, 공개 390px 해시 진입 검증과 live validator가 성공했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-DIRECT-HASH-NAV-20261004`, `E-PLAYWRIGHT-DIRECT-HASH-NAV-20261004`, `E-DEPLOY-PIPELINE-DIRECT-HASH-NAV-20261004`, `E-LIVE-PUBLIC-DIRECT-HASH-NAV-20261004`.

## 모바일 읽기 라벨·읽기 크기 조절 고도화 공개 배포: 2026-10-04 / candidate `37737d2`

모바일 읽기 흐름의 진행 상태·장 표시·연구 출처·결과 방향 라벨을 12px 기준으로 보정하고, 읽기 크기 조절 버튼에 `가+`/`가−` 표기를 추가했다. PR #161, main workflow `37147186088`, Pages·라이브 smoke·release status와 공개 validator, 320/390/1440px Chrome fallback 검증이 성공했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-MOBILE-READING-CLARITY-20261004`, `E-PLAYWRIGHT-MOBILE-READING-CLARITY-20261004`, `E-DEPLOY-PIPELINE-MOBILE-READING-CLARITY-20261004`, `E-LIVE-PUBLIC-MOBILE-READING-CLARITY-20261004`.

## 전문가 영상 저해상도 썸네일 방어 공개 배포: 2026-10-04 / candidate `52ff08b`

YouTube 썸네일이 오류 대신 저해상도 성공 응답을 반환해도 decoded width를 검사하고, 기본·대체 이미지 모두 기준 미달이면 `GABA VIDEO` 표지를 노출하도록 PR #160에서 보완했다. 로컬·공개 Playwright, main workflow `37145916564`, Pages·라이브 smoke·release status·공개 validator를 재검증했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-RESOLUTION-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-RESOLUTION-20261004`.

## 전문가 영상 썸네일 이중 실패 fallback 보완 공개 배포: 2026-10-04 / candidate `342f43f`

기본·대체 썸네일 URL이 모두 실패하는 경우에도 이미지 요소가 `GABA VIDEO` 표지를 가리지 않도록 실패 상태를 보완했다. PR #158 checks, main workflow `37144428732`, Pages·라이브 smoke·release status와 공개 validator, 320/390/1440px 정상 썸네일 로딩 및 390px 강제 이중 실패 fallback을 재검증했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAIL-FALLBACK-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAIL-FALLBACK-20261004`.

## 전문가 영상 썸네일 로딩 품질 공개 배포: 2026-10-04 / candidate `8093615`

전문가 영상 게시판의 첫 4개 썸네일을 eager 로드하고, 지연 로드 중에는 `GABA VIDEO` 표지를 보여줘 빈 썸네일 영역이 완성도 저하로 보이지 않도록 보완했다. PR #155 checks, main workflow `37142835851`, Pages·라이브 smoke·release status, 공개 validator와 320/390/1440px Chrome fallback을 재검증했다. `수면` 필터 4개 카드와 `잠이 안 올 때 GABA 이야기` 선택 후 iframe 전환도 확인했다. 공개 연구 카피·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-VIDEO-THUMBNAILS-20261004`, `E-PLAYWRIGHT-VIDEO-THUMBNAILS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-THUMBNAILS-20261004`, `E-LIVE-PUBLIC-VIDEO-THUMBNAILS-20261004`.

## 모바일 기본 카드 장식 겹침 보정 공개 배포: 2026-10-04 / candidate `4e558ee`

320px 화면에서 GABA 기본 설명 카드의 달 아이콘이 본문 마지막 줄과 겹치던 가독성 결함을 확인하고 모바일 카드에 장식 전용 하단 여백을 확보했다. 로컬 typecheck·UI contract·127 tests·build, PR #153 checks, main workflow `37141668244`, Pages·라이브 smoke·release status, 공개 validator와 320/390px Chrome fallback을 재검증했다. 공개 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-DEFINITION-MOTIF-20261004`, `E-PLAYWRIGHT-DEFINITION-MOTIF-20261004`, `E-DEPLOY-PIPELINE-DEFINITION-MOTIF-20261004`, `E-LIVE-PUBLIC-DEFINITION-MOTIF-20261004`.

## 모바일 연구 결과 카드 가독성 고도화 공개 배포: 2026-10-04 / candidate `7a6db416`

320px·390px에서 연구 결과 카드가 가용 폭을 모두 사용하도록 보정해 도표 라벨의 불필요한 줄바꿈과 세로 밀도를 줄였다. 연구 문구·데이터·해석·제품 독립 경계는 변경하지 않았다. PR #151의 release-verify·site-quality-verify, main workflow `37140273727`의 정적 Pages 배포·라이브 smoke·release status와 공개 validator가 성공했다. 공개 Playwright Chrome fallback 320/390/1440px에서 카드 폭 280/350/1180px, 도표 폭 244/314/687px, 가로 넘침 없음·브라우저 오류 없음을 확인했다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-RESEARCH-CARD-WIDTH-20261004`, `E-PLAYWRIGHT-RESEARCH-CARD-WIDTH-20261004`, `E-DEPLOY-PIPELINE-RESEARCH-CARD-WIDTH-20261004`, `E-LIVE-PUBLIC-RESEARCH-CARD-WIDTH-20261004`.

## 장 진입 표시와 고정 읽기 바 겹침 보정 공개 배포: 2026-10-04 / candidate `b9f21d0ceba52e0d3ea4745d65232e3661ffd7ea`

장 링크로 이동할 때 제목만 맞추던 기준을 장 헤더 전체로 바꿔 `06 · 연구의 확장` 같은 작은 장 표시가 고정 읽기 진행 바 뒤에 숨지 않도록 보완했다. PR #149의 필수 검사, main workflow `37139270708`, Pages 배포, 라이브 smoke, release status와 공개 validator가 성공했다. 공개 Playwright Chrome fallback 320/390/1440px에서 `#research` 직접 진입 시 장 표시·제목·진행 바 간격, 가로 넘침 없음, 브라우저 오류 없음을 확인했다. 공개 과학 카피·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-CHAPTER-ENTRY-20261004`, `E-PLAYWRIGHT-CHAPTER-ENTRY-20261004`, `E-DEPLOY-PIPELINE-CHAPTER-ENTRY-20261004`, `E-LIVE-PUBLIC-CHAPTER-ENTRY-20261004`.

## 모바일 전문가 영상 주제 전체 노출 공개 배포: 2026-10-04 / candidate `71960f083e21577641074358b74a0ca447cdd216`

모바일 전문가 영상 주제 필터를 가로 스크롤에서 전체 주제 즉시 노출형 줄바꿈으로 바꿔 320px·390px에서도 7개 주제를 한눈에 확인할 수 있도록 보강했다. PR #147의 필수 검사, main workflow `37138030444`, Pages 배포, 라이브 smoke, release status와 공개 validator가 성공했다. 공개 Playwright Chrome fallback에서 320/390/1440px 가로 넘침 없음, `수용체` 필터 선택과 iframe 전환을 확인했다. 기존 과학 카피·제품 독립 경계는 변경하지 않았으며 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-VIDEO-FILTERS-20261004`, `E-PLAYWRIGHT-VIDEO-FILTERS-20261004`, `E-DEPLOY-PIPELINE-VIDEO-FILTERS-20261004`, `E-LIVE-PUBLIC-VIDEO-FILTERS-20261004`.

## 출처 원문 행동 명시화 공개 배포: 2026-10-04 / candidate `32b37a11a327a351b79a3822029d35d19d58bae6`

출처 읽기 브리지의 실제 연구 카드에 아이콘만 두지 않고 `원문 보기` 행동을 명시해 모바일과 큰 글씨 읽기에서 다음 행동을 바로 이해하도록 보강했다. PR #145의 필수 검사, main workflow `37136765623`, Pages 배포, 라이브 smoke, release status와 공개 validator가 성공했다. 공개 Playwright Chrome fallback 320/390/1440px에서 네 단계·원문 표시·가로 넘침 없음·메뉴/연구 지도/전문가 영상 선택 재생을 확인했고, `원문 보기` 클릭은 PubMed 새 탭으로 이동했다. 기존 과학 카피·제품 독립 경계는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-SOURCE-ACTION-20261004`, `E-PLAYWRIGHT-SOURCE-ACTION-20261004`, `E-DEPLOY-PIPELINE-SOURCE-ACTION-20261004`, `E-LIVE-PUBLIC-SOURCE-ACTION-20261004`.

## 출처 읽기 브리지 고도화 공개 배포: 2026-10-04 / candidate `a8cc869b2c1537b2568b2f0e99c31adc3eae9353`

`출처 읽기`의 빈 연결 구간을 `누구를 살폈나요? → 어떻게 비교했나요? → 무엇이 달라졌나요? → 어디까지 알 수 있나요?`의 네 질문과 Yoto et al. 2012 PubMed 원문 예시로 보강했다. PR #143의 필수 검사, main workflow `37135553445`, Pages 배포, 라이브 smoke, release status와 공개 validator가 성공했으며 공개 Playwright Chrome fallback 320/390/1440px에서 네 단계·원문 링크·가로 넘침 없음·핵심 메뉴/영상 상호작용을 확인했다. 과학 카피·제품 독립 경계는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-SOURCE-BRIDGE-20261004`, `E-PLAYWRIGHT-SOURCE-BRIDGE-20261004`, `E-DEPLOY-PIPELINE-SOURCE-BRIDGE-20261004`, `E-LIVE-PUBLIC-SOURCE-BRIDGE-20261004`.

## NAVI 문서 병합 후 최신 공개 SHA 동기화: 2026-10-04 / candidate `621251166c2902a7ea2a8fae44b5230f97242ff9`

NAVI 증거·감사·레드팀 문서 PR #141 병합 후 main workflow `37134462216`의 release-verify·worker-readiness·GitHub Pages 배포·라이브 smoke·release status가 성공했다. 라이브 validator는 문서 병합 후 공개 candidate `6212511…`, HTTP 200, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 재확인했다. 공개 UI·과학 카피·제품 정보는 변경하지 않았고 NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LIVE-PUBLIC-NAVI-SYNC-20261004`.

## 모바일 차트 가독성·긴 장 이동 충돌 보완 공개 재검증: 2026-10-04 / candidate `b778f23b65a67cf919171d212a9305927a34d0ff`

모바일 연구 결과 도표의 비교 조건·연구 메타데이터에 가독성 바닥값을 적용하고, 초기 `#top` 정렬 타이머가 사용자의 긴 장 이동을 되돌리던 충돌을 수동 이동 시 취소하도록 보완했다. PR #140의 필수 검사와 main workflow `37133909361`의 release-verify·worker-readiness·GitHub Pages 배포·라이브 smoke·release status가 성공했으며 Worker는 정적 전용 모드로 건너뛰었다. 공개 validator는 HTTP 200, candidate SHA 일치, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 공개 Playwright Chrome fallback 320/390/1440px에서 차트 폭·가로 넘침·연구 지도 장 이동·전문가 영상 선택 재생·브라우저 오류 없음을 재확인했다. 공개 과학 카피와 제품 정보는 변경하지 않았다. NAVI 상태는 `USER_DECISION`, 완료 게이트는 `NOT_READY`로 유지한다. 증적: `E-LOCAL-BUILD-CHART-NAV-20261004`, `E-PLAYWRIGHT-MOBILE-CHART-NAV-20261004`, `E-DEPLOY-PIPELINE-CHART-NAV-20261004`, `E-LIVE-PUBLIC-CHART-NAV-20261004`.

## 출처 읽기 장의 시각·시맨틱 계층 보강: 2026-10-04 / candidate `4379325e8773cbbea9ee1a9aee86ed02ac282bab`

`출처 읽기` 장에 `연구를 이해하는 마지막 단계` h2와 `연구 카드 → 원문 출처` 흐름을 추가하고 `aria-labelledby`를 연결했다. PR #138의 release-verify·site-quality-verify, main workflow `37131613828`의 release-verify·worker-readiness·정적 Pages 배포·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200, 정적 모드, candidate SHA 일치, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 공개 Playwright Chrome fallback 390/1440px에서 출처 읽기 제목 정렬과 13개 장 직접 링크, 모바일 메뉴·전문가 영상 필터·선택 즉시 재생·가로 넘침·브라우저 오류 없음을 확인했다. 기존 공개 과학 카피와 제품 정보는 변경하지 않았다. NAVI 상태는 사용자 결정 대기(`USER_DECISION`)로 유지한다. 증적: `E-LOCAL-BUILD-READING-NOTE-20261004`, `E-PLAYWRIGHT-READING-NOTE-20261004`, `E-DEPLOY-PIPELINE-READING-NOTE-20261004`, `E-LIVE-PUBLIC-READING-NOTE-20261004`.

## 모바일 장 딥링크를 실제 제목에 정렬: 2026-10-03 / candidate `a189d9432cc7003def5a791b381c6b15a55aab09`

상단 메뉴와 장 직접 링크가 섹션의 넓은 상단 여백에 멈추지 않고 실제 장 제목을 sticky 읽기 레일 아래에 보여주도록 보정했다. PR #136의 release-verify·site-quality-verify, main workflow `37130208546`의 release-verify·worker-readiness·정적 Pages 배포·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200, 정적 모드, candidate SHA 일치, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 공개 Playwright Chrome fallback 390/1440px에서 `#basics`, `#recovery-break`, `#research`, `#expert-videos`, `#final` 제목 정렬과 `02 / 12`, `보충 / 12`, `06 / 12`, `10 / 12`, `12 / 12` 진행표를 확인했고 모바일 메뉴 이동·영상 필터·선택 즉시 재생·가로 넘침·브라우저 오류가 없었다. 기존 공개 과학 카피와 제품 정보는 변경하지 않았다. NAVI 상태는 사용자 결정 대기(`USER_DECISION`)로 유지한다. 증적: `E-LOCAL-BUILD-CHAPTER-DEEPLINK-20261003`, `E-PLAYWRIGHT-CHAPTER-DEEPLINK-20261003`, `E-DEPLOY-PIPELINE-CHAPTER-DEEPLINK-20261003`, `E-LIVE-PUBLIC-CHAPTER-DEEPLINK-20261003`.

## NAVI 기록 병합 후 공개본 동기화: 2026-10-03 / candidate `1d74ed2ae7ed4cc8b090c0f8f8e98dfb0bff3a81`

PR #134로 앞선 읽기 진행표·직접 링크 고도화의 NAVI 증거대장을 main에 병합했다. 문서 병합 후 main workflow `37128765447`의 release-verify·worker-readiness·정적 Pages 배포·라이브 smoke·release status가 성공했고, 공개 validator는 candidate SHA `1d74ed2…`, HTTP 200, 정적 모드, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 이번 기록은 문서·운영 증거 동기화이며 공개 화면의 과학 카피나 제품 광고는 변경하지 않았다. 증적: `E-DEPLOY-PIPELINE-NAVI-DOCS-20261003`, `E-LIVE-PUBLIC-NAVI-DOCS-20261003`.

## 읽기 진행표·직접 링크 정합성 고도화 공개 재검증: 2026-10-03 / candidate `33e8b6a57202c21826ec2ebf3ffcd8b55ee01466`

읽기 진행표에서 실제 본문 12개 장과 수면·회복 보충 구간을 분리했다. 보충 구간은 `보충 / 12`, 마지막 공유 장은 `12 / 12`로 표시해 숫자와 본문 흐름을 일치시켰다. `#recovery-break`·`#final` 직접 링크는 이미지 레이아웃이 안정된 뒤 고정 읽기 레일 아래에 제목이 도착하도록 재정렬했다. PR #133의 release-verify·site-quality-verify, main workflow `37128146175`의 정적 Pages 배포·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200, candidate SHA 일치, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 공개 Playwright Chrome fallback 390/1440px에서 진행표·직접 링크·전문가 영상 필터·영상 즉시 재생·가로폭·오류를 재확인했다. 공개 GABA 과학 카피와 제품 정보는 변경하지 않았다. NAVI 상태는 사용자 결정 대기(`USER_DECISION`)로 유지한다. 증적: `E-LOCAL-BUILD-READING-PROGRESS-20261003`, `E-PLAYWRIGHT-READING-PROGRESS-20261003`, `E-DEPLOY-PIPELINE-READING-PROGRESS-20261003`, `E-LIVE-PUBLIC-READING-PROGRESS-20261003`.

## 모바일 전문가 영상 탐색 단서 고도화 공개 재검증: 2026-10-03 / candidate `5f7f1cdb0db9315ed39535ffb290160a98afedb9`

전문가 영상 주제 필터가 모바일에서 더 이어진다는 사실을 원형 화살표 단서로 명확히 표시하고, 가로 터치 스크롤 스냅과 오버스크롤 경계를 보완했다. PR #130의 release-verify·site-quality-verify와 main workflow `37126713484`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200, candidate SHA 일치, 70개 번들 해시, 12개 공개 claim, 6개 master record, 제품 독립 경계를 확인했다. 공개 Playwright Chrome fallback 390px에서는 단서가 시작 시 보이고 끝에서 사라졌으며, 영상 카드 선택 시 iframe 재생과 선택 상태가 갱신됐다. 1440px에서는 필터가 한 화면에 들어왔다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 배포 전 stale TF heartbeat gate는 예약 pulse 재실행과 보호된 heartbeat PR #131 병합으로 갱신한 뒤 재배포했다. 증적: `E-LOCAL-BUILD-VIDEO-RAIL-CUE-20261003`, `E-PLAYWRIGHT-VIDEO-RAIL-CUE-20261003`, `E-DEPLOY-PIPELINE-VIDEO-RAIL-CUE-20261003`, `E-LIVE-PUBLIC-VIDEO-RAIL-CUE-20261003`, `E-NAVI-TF-FRESHNESS-20261003`.

## 수면·회복 앵커와 고정 읽기 레일 충돌 보완 공개 재검증: 2026-10-03 / candidate `27e9f6f643f939e1a99bb9fe540493e76afa0860`

`#recovery-break`로 바로 진입하거나 메뉴에서 수면·회복으로 이동할 때 고정 읽기 레일이 장 제목을 가리지 않도록 `.guide-recovery-break`의 상단 여백 계약을 추가했다. PR #128 필수 검사와 main workflow `37124665367`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했다. 공개 validator는 HTTP 200, candidate SHA 일치, 70개 번들 해시, 공개 데이터 경계를 확인했고, 공개 Playwright Chrome 320/390/1440px에서 가로 넘침·런타임 오류가 없었으며 390/1440px 앵커 제목이 읽기 레일 아래에 도착했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RECOVERY-ANCHOR-20261003`, `E-PLAYWRIGHT-RECOVERY-ANCHOR-20261003`, `E-DEPLOY-PIPELINE-RECOVERY-ANCHOR-20261003`, `E-LIVE-PUBLIC-RECOVERY-ANCHOR-20261003`.

## 좁은 모바일 수면 연구 레이아웃 고도화 공개 재검증: 2026-10-03 / candidate `81d9dbba61ec9080a58be8c5b0824843b0a13ed9`

320px에서 수면 연구 카드가 콘텐츠 최소폭 때문에 우측으로 밀리던 문제를 `min-width: 0`과 `minmax(0, 1fr)`로 보완했다. 320/390/1440px 로컬·공개 Playwright Chrome에서 수면 그리드와 문서 가로폭을 확인했고, 390px 메뉴 이동·GABA란 앵커·큰 글씨 전환·연구 지도 선택도 재검증했다. PR #126 필수 검사와 main workflow `37123264421`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했으며, 라이브 validator는 HTTP 200·정적 번들·공개 데이터 경계를 확인했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-NARROW-SLEEP-20261003`, `E-PLAYWRIGHT-NARROW-SLEEP-20261003`, `E-DEPLOY-PIPELINE-NARROW-SLEEP-20261003`, `E-LIVE-PUBLIC-NARROW-SLEEP-20261003`.

## 히어로 제목 리듬·강조 색상 고도화 공개 재검증: 2026-10-03 / candidate `f2092694c7f3fb6e7ea940de828f1577769a6bf3`

데스크톱에서 모바일 전용 줄바꿈 요소가 안쪽 문장까지 블록으로 만들던 선택자를 제목 직계 요소로 제한하고, `GABA에서 읽습니다`를 넓은 화면에서는 한 문장 단위로 묶었다. 모바일 줄바꿈·teal 강조, 320/390/1440px 헤더와 다음 장 진입은 유지했다. PR #124의 필수 검사, main workflow `37121944648`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status, 라이브 validator가 성공했다. 로컬 Playwright 2개 상호작용 테스트와 공개 320/390/1440px 캡처를 확인했으며 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-HERO-RHYTHM-20261003`, `E-PLAYWRIGHT-HERO-RHYTHM-20261003`, `E-DEPLOY-PIPELINE-HERO-RHYTHM-20261003`, `E-LIVE-PUBLIC-HERO-RHYTHM-20261003`.

## 모바일 히어로·좁은 화면 헤더 고도화 공개 재검증: 2026-10-03 / candidate `badde8b982e1cee73b3a75d3513e65fcc38508c9`

모바일 히어로의 데스크톱 시각 트랙 잔류로 제목 일부가 잘리던 문제를 단일 열로 보정하고, 430px 이하 헤더에서 메뉴·큰 글씨·공유 컨트롤을 고정 44px 아이콘 버튼으로 배치했다. PR #121의 `release-verify`·`site-quality-verify`, main workflow `37120130983`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했다. 로컬과 공개 URL에서 실제 Playwright Chrome viewport 320/390/1440px를 캡처해 히어로 문장·제품 독립 안내·3분 읽기 레일·다음 장 진입과 데스크톱 2열 이미지를 확인했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-MOBILE-HERO-20261003`, `E-PLAYWRIGHT-MOBILE-HERO-20261003`, `E-DEPLOY-PIPELINE-MOBILE-HERO-20261003`, `E-LIVE-PUBLIC-MOBILE-HERO-20261003`.

## 연구 규모 인포그래픽 고도화 공개 재검증: 2026-10-03 / candidate `b8e6236d6dc749ea23191e45dd58d0ab9c542a0a`

같은 PubMed 검색 기준의 Harvard·Oxford 문헌은 기관 비교로 묶고, 별도 WoS Core Collection SCIE 분석은 독립된 강조 블록으로 분리해 연구 범위를 한눈에 구분하도록 고도화했다. PR #119 checks, main workflow `37118207429`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status, live validator, 390/320/1440px Chrome CDP fallback을 통과했다. 390px 연구 지도 피부 선택의 읽기 레일·상세 카드 동기화도 유지했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-SCALE-20261003`, `E-CDP-RESEARCH-SCALE-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-SCALE-20261003`, `E-LIVE-PUBLIC-RESEARCH-SCALE-20261003`.

## 연구 읽기 방향성 고도화 공개 재검증: 2026-10-03 / candidate `77a30323d2e5097a0f2be092c013615b1ee2ddd6`

긴 연구 카드 구간에서 sticky 읽기 레일이 현재 활성 연구 결과 제목을 함께 표시하도록 보완했다. 연구 지도에서 피부를 선택하면 `피부 연구 결과`와 `research-skin` 카드가 동기화되고, 좁은 화면에서는 제목이 한 줄 말줄임으로 보호된다. PR #117 checks, main workflow `37116937264`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status, live validator, 390/320/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-RAIL-ORIENTATION-20261003`, `E-CDP-RESEARCH-RAIL-ORIENTATION-20261003`, `E-DEPLOY-PIPELINE-RESEARCH-RAIL-ORIENTATION-20261003`, `E-LIVE-PUBLIC-RESEARCH-RAIL-ORIENTATION-20261003`.

## 모바일 연구 비교 도표 고도화 공개 재검증: 2026-10-03 / candidate `4058bf61ed25d8fc95b3023f1187cdd78436cdb4`

연구 결과 도표에서 비교 조건과 GABA 조건을 390px 모바일에서는 좌우로 나란히 배치하고, 320px에서는 한 열로 전환했다. 보조기기용 차트 라벨에도 각 지표의 조건별 관찰 문장을 포함했다. PR #115 checks, main workflow `37115590977`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status, live validator, 390/320/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-MOBILE-COMPARISON-20261003`, `E-CDP-MOBILE-COMPARISON-20261003`, `E-DEPLOY-PIPELINE-MOBILE-COMPARISON-20261003`, `E-LIVE-PUBLIC-MOBILE-COMPARISON-20261003`.

## 전문가 영상 갤러리 고도화 공개 재검증: 2026-10-03 / candidate `10a61920df8bbcbe1b6f288a1d61425f48687800`

전문가 영상 썸네일을 고해상도 우선·대체 이미지 경로로 보완하고, 모바일에서 다음 주제가 더 있음을 보여주는 필터 continuation cue를 추가했다. `연구 읽기` 선택 시 카드와 영상이 즉시 동기화되고, 필터 끝에서는 단서가 사라진다. PR #113 checks, main workflow `37114410997`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status, live validator, 390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-EXPERT-VIDEO-BROWSING-20261003`, `E-CDP-EXPERT-VIDEO-BROWSING-20261003`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-BROWSING-20261003`, `E-LIVE-PUBLIC-EXPERT-VIDEO-BROWSING-20261003`.

## 최종 공개 재검증: 2026-10-03 / main `16fc5d4`

NAVI 문서 PR #111 병합 후 main workflow `37113016531`과 공개 URL을 재검증했다. release-verify·worker-readiness·Pages 배포·라이브 smoke·release-status가 성공했고 Worker는 정적 전용 모드로 건너뛰었다. 최종 live validator는 HTTP 200, 70개 번들 해시, 12개 공개 claim, 6개 master record, 6개 share page, `teaser HOLD`, 내부 운영 스냅샷 제외, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. 증적: `E-LIVE-PUBLIC-NAVI-MERGE-20261003`.

## 최신 공개 재검증: 2026-10-03 / candidate `cbd2f8ea1d5b341dbe5804b5f16f756e157c553b`

연구 지도에서 주제를 선택하면 도착한 상세 카드도 즉시 활성화되도록 보완했다. 카드 테두리·그림자·왼쪽 포인트가 지도 선택과 동기화되어 `지도 → 대상 → 결과` 흐름을 한눈에 따라갈 수 있다. PR #110의 검증, main workflow `37112425820`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했고 Worker는 `STATIC_ONLY` 조건으로 건너뛰었다. live validator는 HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. Chrome CDP fallback에서 390px 연구 지도 클릭 후 선택 지도·상세 카드가 함께 활성화되고 카드 top `113.09px`, 읽기 레일 bottom `105px`, document width `390px`, 오류 오버레이·런타임 오류 0건을 확인했으며 1440px document width는 `1425px`였다. 새 과학 주장·제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-MAP-ORIENTATION`, `E-CDP-RESEARCH-MAP-ORIENTATION`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-ORIENTATION`, `E-LIVE-PUBLIC-RESEARCH-MAP-ORIENTATION`.

## 최신 공개 재검증: 2026-10-03 / candidate `c6291f6bd2c62e77529da767b1d2a985f4acaab5`

모바일 CSS가 전역으로 숨기던 작은 장 제목을 다시 표시해 `수면과 회복`, `연구 규모`, `출처 읽기`, `이야기 공유`의 읽기 위치 단서를 복원했다. PR #108의 `release-verify`·`site-quality-verify`, main workflow `37111226511`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했다. live validator는 HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. Chrome CDP fallback에서 390px 제목 위치와 레일 하단 간격, 320px 가로 폭, 1440px 데스크톱 레이아웃을 재확인했다. 새 과학 주장·제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-MOBILE-CHAPTER-LABELS`, `E-CDP-MOBILE-CHAPTER-LABELS`, `E-DEPLOY-PIPELINE-MOBILE-CHAPTER-LABELS`, `E-LIVE-PUBLIC-MOBILE-CHAPTER-LABELS`.

## 최신 공개 재검증: 2026-10-03 / candidate `2ae71ef1e1aa7c5ff71ca429197ad70c22dce3c1`

모바일 장 진입점에서 고정 읽기 진행 레일이 장 번호와 제목 첫 줄을 덮던 문제를 PR #106에서 보완했다. 모바일 story section·수면/회복 break·final에 110px 상단 여백을 적용하고 UI contract guard를 추가했다. PR #106의 `release-verify`·`site-quality-verify`, main workflow `37109900221`의 release-verify·worker-readiness·Pages 배포·라이브 smoke·release status가 성공했다. live validator는 HTTP 200, 70 bundle hashes, 12 claims, 6 master records, 1 product, 6 share pages, teaser `HOLD`, `smartStoreOnly`, `removed750`, `provenance matched`를 확인했다. Chrome CDP fallback에서 390px exact entry의 number top `110.19px`, heading top `124.19px`, rail bottom `105px`, document width `390px`, 1440px document width `1425px`를 확인했다. 새 과학 주장·제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RAIL-TITLE-CLEAR`, `E-CDP-RAIL-TITLE-CLEAR`, `E-DEPLOY-PIPELINE-RAIL-TITLE-CLEAR`, `E-LIVE-PUBLIC-RAIL-TITLE-CLEAR`.

## 최신 공개 재검증: 2026-10-03 / candidate `bf235edeeea780dd42d0261a5760f100cff2ba9d`

기본 공개 GABA 안내서 경로만 선행 import해 첫 상호작용을 앞당기고, 대기 중에도 동일한 헤더·히어로 리듬을 유지하는 branded loading shell을 추가했다. PR #104 checks `37108351783`·`37108351789`, main workflow `37108431389`, Pages 배포·라이브 smoke·release status, live validator, 390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-GUIDE-LOADING-SHELL`, `E-CDP-GUIDE-LOADING-SHELL`, `E-DEPLOY-PIPELINE-GUIDE-LOADING-SHELL`, `E-LIVE-PUBLIC-GUIDE-LOADING-SHELL`.

최신 공개 재검증: 2026-10-03 / candidate `b9160e40fbca673134ca1563651a00d8dfdd615a`

모바일 메뉴의 키보드 포커스가 배경으로 빠지지 않도록 Tab·Shift+Tab 순환을 추가하고, 현재 읽는 장을 `aria-current=location`으로 정리했다. PR #102 checks, main workflow `37106966171`, Pages 배포·라이브 smoke·release status, live validator, 390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-MOBILE-FOCUS-TRAP`, `E-CDP-MOBILE-FOCUS-TRAP`, `E-DEPLOY-PIPELINE-MOBILE-FOCUS-TRAP`, `E-LIVE-PUBLIC-MOBILE-FOCUS-TRAP`.

최신 공개 재검증: 2026-10-03 / candidate `9c2913db11440b10734345bc5bcba1d31161cc71`

읽기 진행 레일의 장 순서를 실제 페이지 흐름과 일치시키고 수면·회복 프롤로그를 03/13으로 정합화했다. 공유 해시 링크와 모바일 전문가 영상 선택 이동이 sticky header·reading rail 아래에 도착하도록 보정했다. PR #100 checks, main workflow `37105696713`, Pages 배포·라이브 smoke·release status, live validator, 390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-READING-RAIL-DEEPLINK`, `E-CDP-READING-RAIL-DEEPLINK`, `E-DEPLOY-PIPELINE-READING-RAIL-DEEPLINK`, `E-LIVE-PUBLIC-READING-RAIL-DEEPLINK`.

최신 공개 재검증: 2026-10-03 / candidate `3d788e39ef4d1dfa9d6d20845380ddcf7bfcc255`

모바일·태블릿 메뉴가 열릴 때 배경 콘텐츠를 어둡고 부드럽게 분리하고, body 스크롤을 잠그며, 배경 버튼으로 닫을 수 있도록 보완했다. 닫으면 원래 스크롤 상태로 복원된다. PR #98의 release-verify·site-quality-verify, main workflow `37104179510`, Pages 배포·라이브 smoke·release status, live validator, 390px·1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-MOBILE-MENU-FOCUS`, `E-CDP-MOBILE-MENU-FOCUS`, `E-DEPLOY-PIPELINE-MOBILE-MENU-FOCUS`, `E-LIVE-PUBLIC-MOBILE-MENU-FOCUS`.

최신 공개 재검증: 2026-10-03 / candidate `cf2f123a74013956399306c591f2de261d1bf049`

연구 결과 비교 도표의 장식형 신호를 증가·감소 방향 화살표와 `증가`·`감소` 라벨로 바꿔, 연구 문장을 시각적으로 더 빠르게 읽도록 했다. 320px 모바일에서는 `비교 조건`과 `GABA 섭취`가 글자 중간에서 끊기지 않도록 조건명을 고정했다. PR #96의 release-verify·site-quality-verify, main workflow `37103072296`, Pages 배포·라이브 smoke·release status, live validator, 320/390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-OUTCOME-DIRECTION`, `E-CDP-RESEARCH-OUTCOME-DIRECTION`, `E-DEPLOY-PIPELINE-RESEARCH-OUTCOME-DIRECTION`, `E-LIVE-PUBLIC-RESEARCH-OUTCOME-DIRECTION`.

최신 공개 재검증: 2026-10-03 / candidate `b1afe879a3266dd802e4f3d470a49d5985616b70`

전문가 영상 게시판에 주제 필터와 영상 수를 추가해 앞으로 영상이 늘어나도 수면·GABA란·연구 읽기·자율신경 등 관심 주제만 빠르게 탐색할 수 있도록 했다. 선택한 주제는 영상 목록·선택 상태·즉시 재생과 동기화되고 모바일에서는 활성 필터를 중앙에 정렬한다. PR #94의 release-verify·site-quality-verify, main workflow `37101931045`, Pages 배포·라이브 smoke·release status, live validator, 320/390/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-EXPERT-VIDEO-FILTER`, `E-CDP-EXPERT-VIDEO-FILTER`, `E-DEPLOY-PIPELINE-EXPERT-VIDEO-FILTER`, `E-LIVE-PUBLIC-EXPERT-VIDEO-FILTER`.

최신 공개 재검증: 2026-10-03 / candidate `bed5bf3245d489e74a79b33249bcdf9fba00668d`

연구 결과 비교 도표의 동일 길이 장식을 1·2단계 상대 방향 신호로 보완하고, 조건명을 `비교 조건`·`GABA 섭취`로 중립화했다. 설명에는 신호 개수가 실제 효과 크기나 수치를 뜻하지 않는다는 점을 명시했다. PR #92의 release-verify·site-quality-verify, main workflow `37100751730`, Pages 배포·라이브 smoke·release status, live validator, 390/320/1440px Chrome CDP fallback을 통과했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-QUALITATIVE-DIRECTION`, `E-CDP-QUALITATIVE-DIRECTION`, `E-DEPLOY-PIPELINE-QUALITATIVE-DIRECTION`, `E-LIVE-PUBLIC-QUALITATIVE-DIRECTION`.

최신 공개 재검증: 2026-10-03 / candidate `0257636233ae758a4bc6e90dac7c77e6fd42bc67`

연구 결과 비교 도표에서 보고되지 않은 효과 크기를 암시하던 임의 막대 길이를 제거하고, 비교 조건은 점선 리본·GABA 조건은 실선 리본으로 같은 길이에 표시했다. PR #89의 타입체크·UI contract·research copy·127개 테스트·production build와 Pages 성능 예산, main 배포 workflow `37099561557`, 라이브 validator, 390/1440px Chrome CDP fallback을 통과했다. stale TF heartbeat로 한 차례 중단된 배포는 PR #90에서 heartbeat를 갱신해 복구했다. 새 과학 주장이나 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-QUALITATIVE-COMPARISON`, `E-CDP-QUALITATIVE-COMPARISON`, `E-DEPLOY-PIPELINE-QUALITATIVE-COMPARISON`, `E-LIVE-PUBLIC-QUALITATIVE-COMPARISON`, `E-NAVI-TF-HEARTBEAT-REFRESH`.

최신 공개 재검증: 2026-10-03 / candidate `698f1fbf93b960df38955fdb85ee223260df4cc7`

모바일 수면·회복 카드 진행 맵을 가로 스크롤에서 7×2 전체 단계 표시로 바꿔 14개 카드의 흐름을 한눈에 읽도록 보완했다. PR #87 검사와 main 배포, 라이브 validator·320/390/1440px Chrome CDP fallback에서 전체 단계·마지막 카드 선택·가로 폭·runtime errors `[]`를 확인했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RECOVERY-MAP-MOBILE`, `E-CDP-RECOVERY-MAP-MOBILE`, `E-DEPLOY-PIPELINE-RECOVERY-MAP-MOBILE`, `E-LIVE-PUBLIC-RECOVERY-MAP-MOBILE`.

최신 공개 재검증: 2026-10-03 / candidate `3b75baecbc84623a759131393ef1e47f3aa2ba07`

공개 `/research/` 경로에서 제품 CTA·제품 브랜드 노출·`view=products`·SmartStore 연결을 제거하고 연구 결과·연구 조건·출처 중심의 읽기 흐름으로 정리했다. PR #85 검사와 main 배포, 라이브 validator·390px Chrome CDP fallback에서 HTTP 200·가로 폭 390px·runtime errors `[]`·제품 문구 부재를 확인했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-PRODUCT-FREE`, `E-CDP-RESEARCH-PRODUCT-FREE`, `E-DEPLOY-PIPELINE-RESEARCH-PRODUCT-FREE`, `E-LIVE-PUBLIC-RESEARCH-PRODUCT-FREE`.

최신 공개 재검증: 2026-10-03 / candidate `a0ee159235477ee24c2855251b2d17b21c0b317e`

모바일 연구 카드에서 `출처`와 원문 링크가 붙어 읽히던 문제를 `출처 ·` 라벨과 링크의 줄 분리로 보완했다. PR #83 검사와 main 배포, 라이브 validator·390px Chrome CDP fallback에서 출처 계층·가로 폭 390px·runtime errors `[]`를 확인했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-SOURCE-LABEL`, `E-CDP-RESEARCH-SOURCE-LABEL`, `E-DEPLOY-PIPELINE-RESEARCH-SOURCE-LABEL`, `E-LIVE-PUBLIC-RESEARCH-SOURCE-LABEL`.

최신 공개 재검증: 2026-10-03 / candidate `10aedcab10448e5341123234b6ce9979b068bc58`

이미 재생 중인 전문가 영상 카드를 다시 선택할 때 iframe 로딩 상태가 재점화될 수 있던 예외를 보완했다. PR #81 검사와 main 배포, 라이브 validator·390px Chrome CDP fallback에서 동일 영상 연속 선택 후에도 자동재생·`재생 중`·로딩 완료·가로 폭 390px을 확인했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-VIDEO-RESELECT`, `E-CDP-VIDEO-RESELECT`, `E-DEPLOY-PIPELINE-VIDEO-RESELECT`, `E-LIVE-PUBLIC-VIDEO-RESELECT`.

이전 공개 재검증: 2026-10-03 / candidate `4604805e746be4d28b34fb200196ce8d5905c85f`

전문가 영상 게시판에서 현재 선택된 카드에 `재생 중` 상태를 추가해 플레이어와 목록의 연결을 명확히 했다. PR #79 검사와 main 배포, 라이브 validator·390px Chrome CDP fallback 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-VIDEO-SELECTION-STATE`, `E-CDP-VIDEO-SELECTION-STATE`, `E-DEPLOY-PIPELINE-VIDEO-SELECTION-STATE`, `E-LIVE-PUBLIC-VIDEO-SELECTION-STATE`.

최신 공개 재검증: 2026-10-03 / candidate `95c3830984d09ee8baca62ebafacd3a0c8c3d715`

전문가 영상 카드를 선택한 직후 검은 빈 iframe처럼 보이던 구간을 로딩 오버레이와 `영상을 불러오는 중` 상태로 보완하고, iframe 로드 완료 후 오버레이가 사라지도록 했다. `prefers-reduced-motion`에서는 스피너를 정지한다. PR #77 검사와 main 배포, 라이브 validator·390px Chrome CDP fallback 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-VIDEO-LOADING`, `E-CDP-VIDEO-LOADING`, `E-DEPLOY-PIPELINE-VIDEO-LOADING`, `E-LIVE-PUBLIC-VIDEO-LOADING`.

최신 공개 재검증: 2026-10-03 / candidate `79eea1f08423f7d9f52021770310691b9f6e4db2`

701–860px 태블릿에서 전체 메뉴를 아이콘 메뉴로 전환해 헤더 컨트롤이 화면 밖으로 밀리던 결함을 보완했다. PR #75 검사와 main 배포, 라이브 validator·768/820/390/1440px Chrome CDP fallback 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-TABLET-HEADER`, `E-CDP-TABLET-HEADER`, `E-DEPLOY-PIPELINE-TABLET-HEADER`, `E-LIVE-PUBLIC-TABLET-HEADER`.

최신 공개 재검증: 2026-10-03 / candidate `e5f1eab190cd29fb4c18ffe2e469f18edb92ba1f`

전역 메뉴 첫 항목에 `수면과 회복`을 연결하고, 읽기 진행 안내를 하나의 보조기기 상태로 정리했으며 모바일 메뉴가 sticky 진행 바에 가려지지 않도록 레이어를 보정했다. PR #73 검사와 main 배포, 라이브 validator·390/1440px Chrome CDP fallback·실제 메뉴 선택 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RECOVERY-NAV`, `E-CDP-RECOVERY-NAV`, `E-DEPLOY-PIPELINE-RECOVERY-NAV`, `E-LIVE-PUBLIC-RECOVERY-NAV`.

이전 공개 재검증: 2026-10-03 / candidate `288a883d5e0537a1be6bdd2660d90edcc5e82df0`

수면과 회복 인터스티셜을 읽기 진행 표시의 독립 맥락으로 연결해 모바일·데스크톱에서 `수면과 회복 02 / 12` 다음 `연구 지도 03 / 12`로 자연스럽게 이어지도록 보완했다. PR #70 검사와 main 문서 동기화 배포 #71, 라이브 validator·390/1440px Chrome CDP fallback·연구 지도 `인지` 활성 동작 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RECOVERY-PROGRESS`, `E-CDP-RECOVERY-PROGRESS`, `E-DEPLOY-PIPELINE-RECOVERY-PROGRESS`, `E-LIVE-PUBLIC-RECOVERY-PROGRESS`.

최신 공개 재검증: 2026-10-03 / candidate `48f48764fd4fa06bb785a2b12cc5c639104e2dd2`

연구 상세 카드를 읽는 동안 연구 지도에서 현재 주제를 활성화하고 지도 선택 상태를 `aria-current`와 함께 유지했다. PR #68 검사, main 배포·라이브 validator·390/1440px Chrome CDP fallback·지도 클릭 후 `인지` 활성 동작 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-MAP-ACTIVE`, `E-CDP-RESEARCH-MAP-ACTIVE`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-ACTIVE`, `E-LIVE-PUBLIC-RESEARCH-MAP-ACTIVE`.

최신 공개 재검증: 2026-10-03 / candidate `d3ff9e3f27833f3719b76f0cc377468a23bcc421`

연구 지도 5개 주제를 키보드·터치로 선택할 수 있게 하고 각 상세 연구 카드로 연결했다. PR #66 검사, main 배포·라이브 validator·390/1440px Chrome CDP·지도 선택 동작 검증을 통과했다. 새 과학 주장과 제품 광고는 추가하지 않았다. 증적: `E-LOCAL-BUILD-RESEARCH-MAP-NAV`, `E-CDP-RESEARCH-MAP-NAV`, `E-DEPLOY-PIPELINE-RESEARCH-MAP-NAV`, `E-LIVE-PUBLIC-RESEARCH-MAP-NAV`.

최신 공개 재검증: 2026-10-03 / candidate `e514a375f0d8fdfeefbba2043b0a18268224b5d2`

연구 지도 아래의 기존 읽기 순서를 01–04 시각 레일로 정리했다. 모바일에서는 번호 노드와 연결선으로 `지도 → 대상 → 결과 → 해석`을 분리하고, 데스크톱에서는 기존 여백과 지도 구조를 유지했다. PR #64 검사, main 배포·라이브 validator·390/1440px Chrome CDP 검증을 통과했다. 증적: `E-LOCAL-BUILD-RESEARCH-RAIL`, `E-CDP-RESEARCH-RAIL`, `E-DEPLOY-PIPELINE-RESEARCH-RAIL`, `E-LIVE-PUBLIC-RESEARCH-RAIL`.

최신 공개 재검증: 2026-10-03 / candidate `0147e3c15a7e0acd700ff4f75e9fcddc03b39b05`

모바일 히어로의 편집 안내와 `3분 읽기` 레일에 읽기용 반투명 표면을 적용했다. PR #62 검사, main 배포·라이브 validator·320/390/1440px Chrome CDP 검증을 통과했으며 카피·출처·제품 독립 경계는 유지했다. 증적: `E-LOCAL-BUILD-HERO-SURFACE`, `E-CDP-HERO-SURFACE`, `E-DEPLOY-PIPELINE-HERO-SURFACE`, `E-LIVE-PUBLIC-HERO-SURFACE`.

| Date | State / Change | Reason | Evidence or Decision | Owner |
|---|---|---|---|---|
| 2026-10-03 | 스크롤 중 읽기 진행 바를 불투명 레이어로 보정하고 `078d231`로 공개 배포 | 연구 결과 도표 위로 아래 콘텐츠가 비치는 현상을 제거해 모바일·데스크톱에서 읽기 안내와 연구 문장을 분리. PR #60 검사, main 배포·라이브 validator·320/390/1440px Chrome CDP 검증 통과 | E-LOCAL-BUILD-RAIL-LEGIBILITY, E-CDP-RAIL-LEGIBILITY, E-DEPLOY-PIPELINE-RAIL-LEGIBILITY, E-LIVE-PUBLIC-RAIL-LEGIBILITY | NAVI / QA |
| 2026-10-03 | 연구 카드 앞에 `연구를 읽는 기준` 시각 키와 모바일 컨트롤 보조 설명을 추가하고 `89978ea`로 공개 배포 | 사람 대상 연구와 확장 연구 라벨을 먼저 설명해 결과 해석 부담을 낮춤. PR #58 검사, main 배포·라이브 validator·320/390/1440px Chrome CDP 검증 통과 | E-LOCAL-BUILD-RESEARCH-KEY, E-CDP-RESEARCH-KEY, E-DEPLOY-PIPELINE-RESEARCH-KEY, E-LIVE-PUBLIC-RESEARCH-KEY | NAVI / QA |
| 2026-10-03 | 연구 결과 카드에 `핵심 결과 복사`와 브라우저 복사 대체 경로를 추가하고 `19a38ab`로 공개 배포 | 사업자가 관찰된 연구 결과 문장을 바로 재사용할 수 있게 보완. PR #55·#56 검사, main 배포·라이브 validator·390/1440px Chrome CDP 검증 통과 | E-LOCAL-BUILD-RESEARCH-SHARING, E-CDP-RESEARCH-SHARING, E-DEPLOY-PIPELINE-RESEARCH-SHARING, E-LIVE-PUBLIC-RESEARCH-SHARING | NAVI / QA |
| 2026-10-03 | 연구 카드에 대상·방법·측정 프로필을 추가하고 `3f4a3e5`로 공개 배포 | 결과 그래프를 보기 전 연구 대상·방법·측정 항목을 한눈에 파악하도록 보완. PR #53 검사, main 배포·라이브 validator·390/1440px Chrome CDP 검증을 통과 | E-LOCAL-BUILD-RESEARCH-PROFILE, E-CDP-RESEARCH-PROFILE, E-DEPLOY-PIPELINE-RESEARCH-PROFILE, E-LIVE-PUBLIC-RESEARCH-PROFILE | NAVI / QA |
| 2026-10-03 | 320–430px 좁은 모바일의 히어로·헤더를 보완하고 `d0f1741`로 공개 배포 | 헤드라인 클리핑과 공유 버튼 잘림을 제거하고 44px 터치 영역을 확보. PR #51 검사, main 배포·라이브 validator·390/360/320px CDP QA 통과 | E-LOCAL-BUILD-MOBILE-HARDENING, E-CDP-MOBILE-HARDENING, E-DEPLOY-PIPELINE-MOBILE-HARDENING, E-LIVE-PUBLIC-MOBILE-HARDENING | NAVI / QA |
| 2026-10-03 | NAVI 문서 동기화 이후 최종 공개 후보 `6f48bae`를 재검증 | main 배포·라이브 공개본·제품 독립 데이터 경계·공유 경로의 최신 SHA 정합성을 확인. release-verify, Pages publish, smoke-live, release status와 live validator 성공 | E-LIVE-PUBLIC-NAVI-FINAL, GitHub Actions 37074307727 | NAVI / QA |
| 2026-10-03 | NAVI 감사·레드팀·완료 문서를 main에 반영하고 최종 candidate `49daf99`를 재검증 | 공개 코드 변경 이후 governance 증적과 실제 라이브 SHA의 정합성을 맞춤. main 배포·라이브 validator를 다시 통과 | E-LIVE-PUBLIC-NAVI-RELEASE, GitHub Actions 37073665476 | NAVI / QA |
| 2026-10-03 | 읽기 진행 표시의 접근성·가독성을 보완하고 사용하지 않는 구형 챌린지 이미지 4종을 제거한 뒤 `7a64726`으로 공개 배포 | 긴 모바일 안내서에서 현재 장을 더 빠르게 파악하고 Pages 번들 성능 여유를 확보. PR #47 필수 검사, main 배포·라이브 validator·1440/390px Chrome CDP 검증을 통과 | E-LOCAL-BUILD-READING-PROGRESS, E-CDP-READING-PROGRESS, E-DEPLOY-PIPELINE-READING-PROGRESS, E-LIVE-PUBLIC-READING-PROGRESS | NAVI / QA |
| 2026-10-03 | 고정 헤더·읽기 진행 표시와 섹션 앵커가 겹치지 않도록 보완하고 `2c8bd84`로 공개 배포 | 메뉴·앵커 이동 뒤 섹션 제목이 가려지지 않게 해 모바일·데스크톱의 자연스러운 독해 흐름을 회복. PR #45 필수 검사, main 배포·라이브 validator·1440/390px Chrome CDP 검증을 통과 | E-LOCAL-BUILD-ANCHOR-OFFSET, E-CDP-ANCHOR-OFFSET, E-DEPLOY-PIPELINE-ANCHOR-OFFSET, E-LIVE-PUBLIC-ANCHOR-OFFSET | NAVI / QA |
| 2026-10-03 | 연구 지도 아래에 `읽는 순서 → 01 지도 → 02 대상 → 03 결과 → 04 해석` 시각 레일을 추가하고 `5af1f11`로 공개 배포 | 별도 이동 링크 없이 연구 지도를 본 뒤 대상·결과·해석 카드로 자연스럽게 이어지도록 보완. PR #43 필수 검사, main 배포·라이브 validator·1440/390px Chrome CDP 검증을 통과 | E-LOCAL-BUILD-RESEARCH-READING-RAIL, E-CDP-RESEARCH-READING-RAIL, E-DEPLOY-PIPELINE-RESEARCH-READING-RAIL, E-LIVE-PUBLIC-RESEARCH-READING-RAIL | NAVI / QA |
| 2026-10-03 | 연구 지도에서 상세 카드로 이어지는 `지도 → 대상 → 결과 → 해석` 읽기 순서를 추가하고 기능 변경 `79432de`·최종 공개본 `ca20d1e`로 반영 | 별도 이동 링크 없이 연구 지도 다음에 대상·결과·해석 카드를 바로 보여줘 연구 흐름을 자연스럽게 연결. PR #38 품질 검사, heartbeat PR #39, NAVI 문서 PR #40, main 배포·라이브 validator·1440/390px Chrome CDP 검증을 통과 | E-LOCAL-BUILD-RESEARCH-READING-SEQUENCE, E-CDP-RESEARCH-READING-SEQUENCE, E-DEPLOY-PIPELINE-RESEARCH-READING-SEQUENCE, E-LIVE-PUBLIC-RESEARCH-READING-SEQUENCE | NAVI / QA |
| 2026-10-03 | 연구 확장 지도에 의미 기반 아이콘을 적용하고 `713627f`로 공개 배포 | 인지·피부·근육·성장호르몬·면역을 동일한 구조 안에서 빠르게 구분하도록 선형 아이콘을 추가. PR #37 필수 검사, main 배포, 라이브 validator, 1440/390px Chrome CDP 시각 검증을 통과 | E-LOCAL-BUILD-RESEARCH-MAP-ICONS, E-CDP-RESEARCH-MAP-ICONS, E-DEPLOY-PIPELINE-RESEARCH-MAP-ICONS, E-LIVE-PUBLIC-RESEARCH-MAP-ICONS | NAVI / QA |
| 2026-10-03 | 연구 결과 도표의 큰 글씨 모드를 차트 전체 글자 체계로 정리하고 `34807cb`로 공개 배포 | 비교 조건·측정값·막대 설명·신호·주석이 큰 글씨 선택과 함께 일관되게 확대되도록 보완하고, 320/360/390px 모바일 QA·라이브 validator·Pages 배포를 재확인 | E-LOCAL-BUILD-LARGE-TEXT-CHART-TYPE, E-CDP-LARGE-TEXT-CHART-TYPE, E-DEPLOY-PIPELINE-LARGE-TEXT-CHART-TYPE, E-LIVE-PUBLIC-LARGE-TEXT-CHART-TYPE | NAVI / QA |
| 2026-10-03 | 연구 결과 도표의 큰 글씨 읽기 모드를 보완하고 `24c718b`로 공개 배포 | 핵심 결과·측정값·주석이 본문 확대와 함께 커지도록 보완하고, 320/360/390px 헤더의 44px 터치 목표·가로 폭·접근성 상태를 라이브에서 재확인 | E-LOCAL-BUILD-LARGE-TEXT-CHART, E-CDP-LARGE-TEXT-CHART, E-DEPLOY-PIPELINE-LARGE-TEXT-CHART, E-LIVE-PUBLIC-LARGE-TEXT-CHART | NAVI / QA |
| 2026-10-03 | 320–360px 초소형 모바일 헤더를 압축하고 `b3059b2`로 공개 배포 | 메뉴·큰 글씨·공유 컨트롤이 좁은 화면에서 수축하지 않도록 아이콘형으로 정리하고 모든 터치 목표를 44px로 보장. 라이브 320/360/390px에서 겹침·가로 넘침·런타임 오류를 재확인 | E-LOCAL-BUILD-COMPACT-HEADER, E-CDP-COMPACT-HEADER, E-DEPLOY-PIPELINE-COMPACT-HEADER, E-LIVE-PUBLIC-COMPACT-HEADER | NAVI / QA |
| 2026-10-03 | 모바일 읽기 크기 토글을 추가하고 `0c464c1`로 공개 배포 | 고령 사용자도 본문을 한 번 더 확대하지 않고 읽을 수 있도록 기본 글씨·큰 글씨를 선택하게 하고, 새로고침 후에도 선택을 유지. 390px 라이브에서 가로 넘침·런타임 오류 없이 동작을 재확인 | E-LOCAL-BUILD-READING-SIZE, E-CDP-READING-SIZE, E-DEPLOY-PIPELINE-READING-SIZE, E-LIVE-PUBLIC-READING-SIZE | NAVI / QA |
| 2026-10-03 | 수면·회복 14단계 지도에 `01–14` 번호를 추가하고 `5321f9d`로 공개 배포 | 모바일에서 현재 위치를 숫자로 즉시 확인하고, 자동 전환·스와이프 후에도 선택 단계가 보이도록 보완. 라이브 390px에서 중앙 정렬·가로 넘침·런타임 오류를 재확인 | E-LOCAL-BUILD-RECOVERY-INDEX, E-CDP-RECOVERY-INDEX, E-DEPLOY-PIPELINE-RECOVERY-INDEX, E-LIVE-PUBLIC-RECOVERY-INDEX | NAVI / QA |
| 2026-10-03 | 성장호르몬 연구 결과 카드에 상대 크기 막대와 해석 문구를 추가하고 `3af1327`로 공개 배포 | `약 +400%`와 `약 +375%`를 숫자만 읽지 않고 한 화면에서 비교하도록 보완하되, 막대가 연구 내부의 상대 표시임을 명시해 과대 해석을 막음 | E-LOCAL-BUILD-METRIC-VIZ, E-CDP-METRIC-VIZ, E-DEPLOY-PIPELINE-METRIC-VIZ, E-LIVE-PUBLIC-METRIC-VIZ | NAVI / QA |
| 2026-10-03 | 모바일 메뉴 포커스 흐름을 보완하고 `b0183b8`로 공개 배포 | 메뉴를 연 뒤 첫 메뉴 링크로 포커스를 이동해 키보드·보조기기 사용자가 즉시 탐색을 시작하도록 보완하고, 390px 라이브 화면에서 가로 넘침과 런타임 오류가 없는지 재확인 | E-LOCAL-BUILD-MENU-FOCUS, E-CDP-MENU-FOCUS, E-DEPLOY-PIPELINE-MENU-FOCUS, E-LIVE-PUBLIC-MENU-FOCUS | NAVI / QA |
| 2026-10-03 | 14단계 수면·회복 카드의 읽기 중 일시정지와 단계 접근성 안내를 보완하고 `fed8b6a`로 공개 배포 | 포커스·포인터가 읽기 영역에 들어오면 자동 전환을 멈추고, 단계·현재 선택·카드 연결 관계를 짧은 라이브 안내로 제공해 모바일·고령 사용자 가독성을 보완 | E-LOCAL-BUILD-RECOVERY-A11Y, E-CDP-RECOVERY-A11Y, E-DEPLOY-PIPELINE-RECOVERY-A11Y, E-LIVE-PUBLIC-RECOVERY-A11Y | NAVI / QA |
| 2026-10-03 | 14단계 수면·회복 카드의 모바일 활성 단계 추적을 보완하고 `454f506`으로 공개 배포 | 자동 전환·스와이프 시 현재 단계가 화면 밖으로 사라지지 않도록 가로 단계 표시를 자동 중앙 정렬 | E-LOCAL-BUILD-RECOVERY-TRACK, E-CDP-RECOVERY-TRACK, E-DEPLOY-PIPELINE-RECOVERY-TRACK, E-LIVE-PUBLIC-RECOVERY-TRACK | NAVI / QA |
| 2026-10-02 | 연구 결과 비교 도표에 막대 해석 큐를 추가하고 `28315ad`로 공개 배포 | 모바일 소비자가 `짧은 막대 = 감소 폭이 작음`을 즉시 이해하도록 보완하고, 연구 결과·접근성 설명·제품 독립 경계를 유지 | E-LOCAL-BUILD-CHART-CUE, E-CDP-CHART-CUE, E-DEPLOY-PIPELINE-CHART-CUE, E-LIVE-PUBLIC-CHART-CUE | NAVI / QA |
| 2026-10-02 | NAVI 최종 증적과 라이브 candidate `9457237`을 동기화하고 재배포 검증 | 문서·감사 기록·공개 URL의 SHA 정합성을 맞추고 최종 라이브 validator 결과를 보존 | E-LIVE-PUBLIC-NAVI-SYNC, GitHub Actions 37021490282 | NAVI / QA |
| 2026-10-02 | GABA 중심 연구 확장 연결 인포그래픽을 모바일·데스크톱에 적용하고 5350da8로 공개 배포 | 인지·피부·근육·성장호르몬·면역의 관계를 연결선과 노드로 직관화하고, 예약 TF heartbeat PR과 필수 검사를 거쳐 공개본 정합성을 확보 | E-LOCAL-BUILD-RESEARCH-MAP-CONNECTORS, E-CDP-RESEARCH-MAP-CONNECTORS, E-DEPLOY-PIPELINE-RESEARCH-MAP-CONNECTORS, E-LIVE-PUBLIC-RESEARCH-MAP-CONNECTORS | NAVI / QA |
| 2026-10-02 | 연구 지도를 데스크톱·모바일 공통 3×3 중심 구조로 정리하고 6df3e36을 공개 배포 | 연구 확장 관계를 작은 화면에서도 겹침 없이 읽게 하고 Pages 성능 예산을 CI까지 통과시키도록 중복 CSS를 제거 | E-LOCAL-BUILD-RESEARCH-MAP, E-CDP-RESEARCH-MAP, E-DEPLOY-PIPELINE-RESEARCH-MAP, E-LIVE-PUBLIC-RESEARCH-MAP | NAVI / QA |
| 2026-10-02 | 헤더 공유 버튼 대비와 연구 규모 연혁 표기를 보완하고 cd0912f를 공개 배포 | 공유 행동의 즉시성·가독성을 높이고 고정된 연수 표기를 `1950 → 지금`의 지속 가능한 흐름으로 정리 | E-LOCAL-BUILD-UI-POLISH, E-CDP-UI-POLISH, E-DEPLOY-PIPELINE-UI-POLISH, E-LIVE-PUBLIC-UI-POLISH | NAVI / QA |
| 2026-10-02 | 사업자용 핵심 5문장 라벨을 `바로 복사하기` 중심으로 정리하고 7ee9b3d를 공개 배포 | 첫 목표인 사업자 활용성을 마지막 공유 영역에서 즉시 이해하도록 보완하고, 기존 메시지·연구 데이터·제품 경계를 유지 | E-LOCAL-BUILD-SHARE-KIT, E-CDP-SHARE-KIT, E-DEPLOY-PIPELINE-SHARE-KIT, E-LIVE-PUBLIC-SHARE-KIT | NAVI / QA |
| 2026-10-02 | 588f266 연구 히스토리 문구를 기존 헤더 구조로 정리하고 GitHub Pages에 공개 배포 | CI Pages 성능 예산 경계 초과를 제거하면서 연구 흐름과 공개 데이터 경계를 유지 | E-LOCAL-BUILD-FINAL, E-CDP-FINAL, E-DEPLOY-PIPELINE-FINAL, E-LIVE-PUBLIC-FINAL | NAVI / QA |
| 2026-10-02 | 연구 비교·영상 보조 라벨을 11px로 보강하고 b7cf813을 공개 배포 | 고령 사용자까지 연구 결과를 더 빠르게 읽도록 보완하면서 기존 성능 예산 유지 | E-LOCAL-BUILD-B7, E-CDP-READABILITY-B7, E-CDP-NAVIGATION-B7, E-DEPLOY-PIPELINE-B7, E-LIVE-PUBLIC-B7 | NAVI / QA |
| 2026-10-02 | 연구 규모 `편` 단위·모바일 비교 범례를 유지한 채 번들 용량을 줄이고 최신 main을 재배포 | GitHub Pages 성능 게이트 초과를 해소하고 공개본 정합성 갱신 | f82bcb4, E-LOCAL-BUILD-FOLLOWUP, E-CDP-POLISH-FOLLOWUP, E-DEPLOY-PIPELINE-LATEST, E-LIVE-PUBLIC-LATEST | NAVI / QA |
| 2026-10-02 | sticky 헤더·현재 읽는 섹션 표시·모바일 메뉴 닫기 동작을 보완하고 최신 공개본을 재검증 | 모바일 독해 흐름과 배포 후 버전 정합성 확보 | 2caf863, E-CDP-NAVIGATION-FOLLOWUP, E-LIVE-PUBLIC-FOLLOWUP, E-DEPLOY-PIPELINE-FOLLOWUP | NAVI / QA |
| 2026-10-02 | 전문가 영상 선택 즉시 재생 안내 문구와 모바일 상호작용 증거를 최신 공개 배포에 반영 | 선택 동작의 가시성·NAVI 증거 최신화 | 871cc71, E-CDP-INTERACTION, E-LIVE-PUBLIC | NAVI |
| 2026-10-02 | S’TEI 상태를 보존하고 GABA 전용 NAVI `.navi/`를 초기화 | 프로젝트 상태 분리 | 기존 상태 백업 / NAVI | NAVI |
| 2026-10-02 | 공개 배포 품질 목표·산출물·coverage·workstream을 잠금 | 자동 점검 범위 고정 | DEC-001 | NAVI |
| 2026-10-02 | 타입체크·127개 테스트·build·정적·성능·라이브·시각·상호작용 검증 | 공개 배포 기준선 확보 | E-LOCAL-TESTS, E-LIVE-PUBLIC, E-CDP-MOBILE | QA |
| 2026-10-02 | 코드 결함이 없어 UI 코드는 변경하지 않고 감사·레드팀 잔여 위험 기록 | 불필요한 회귀 방지 | DEC-004, E-REDTEAM-REVIEW | NAVI |
| 2026-10-02 | 모바일 히어로의 3분 읽기 순서를 배지·연결 문장으로 정리하고 Pages 번들 여유를 확보한 뒤 재배포 | 첫 화면 독해 흐름과 공개 배포 재현성 개선 | 24aca41, E-LOCAL-BUILD-RELEASE, E-CDP-POLISH-RELEASE, E-CDP-NAVIGATION-RELEASE, E-DEPLOY-PIPELINE-RELEASE, E-LIVE-PUBLIC-RELEASE | NAVI / QA |
| 2026-10-02 | 모바일 섹션 장 제목을 다시 표시해 긴 페이지의 읽기 위치를 즉시 인지하도록 보완 | 작은 장표와 큰 제목의 위계 복원 | d7bf1cb, E-RELEASE-D7 | NAVI / QA |
| 2026-10-02 | 연구 비교 도표에 `변화 방향` 축과 짧은 막대 설명을 추가하고 Pages 성능 예산을 통과하도록 정리해 재배포 | 모바일에서 비교 결과를 한눈에 읽고 공개 번들 예산을 안정적으로 지키도록 보완 | c13be36, E-RELEASE-C13 | NAVI / QA |
| 2026-10-02 | 읽기 진행 표시를 실제 본문 장 번호와 맞추고, Pages 성능 초과를 압축 보정한 뒤 재배포 | 긴 모바일 안내서에서 현재 위치를 `07 / 12`처럼 즉시 이해하고 공개 배포 게이트를 통과시키도록 보완 | 1f56cb6, E-LOCAL-BUILD-PROGRESS, E-CDP-NAVIGATION-PROGRESS, E-DEPLOY-PIPELINE-PROGRESS, E-LIVE-PUBLIC-PROGRESS | NAVI / QA |

Record lifecycle transitions, approved changes, rework, and meaningful evidence updates. Do not use this file to erase history.
# 2026-10-02 · Public deployment verification follow-up

- Scheduled TF pulse produced a verified heartbeat commit; automatic PR creation was blocked by repository policy, so PR #6 was opened through the repository workflow.
- PR #6 passed `release-verify` and `site-quality-verify` and was merged without changing the public science copy.
- Main deployment run `36984877866` passed release verification, GitHub Pages deployment, live smoke test, and release status.
- Live validation confirmed candidate `bb4504fa902abbdb52b99f2998da6f2cd20ef1b0`, 6 research records, 6 share pages, and no public internal-operation snapshots.
- NAVI remains `USER_DECISION` / `INTERNAL_QA_READY_WITH_CONDITIONS`; open external-validation items remain open.
# Change Log

## v43 · 모바일 기본 카드 장식 겹침 보정 — 4e558ee — 2026-10-04

- 320px 화면에서 GABA 기본 설명 카드의 달 아이콘이 본문 마지막 줄과 겹치던 가독성 결함을 확인하고, 모바일 카드에 장식 전용 하단 여백을 확보했다.
- 로컬 typecheck·UI contract·127 tests·build, PR #153 checks, main workflow `37141668244`, Pages·라이브 smoke·release status, 공개 validator와 320/390px Chrome fallback을 재검증했다.
- 공개 연구 카피·데이터·출처·제품 독립 경계는 변경하지 않았다. NAVI는 `USER_DECISION`, 완료 게이트는 `NOT_READY`를 유지한다.

증적: `E-LOCAL-BUILD-DEFINITION-MOTIF-20261004`, `E-PLAYWRIGHT-DEFINITION-MOTIF-20261004`, `E-DEPLOY-PIPELINE-DEFINITION-MOTIF-20261004`, `E-LIVE-PUBLIC-DEFINITION-MOTIF-20261004`.
