# Red Team Report

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
