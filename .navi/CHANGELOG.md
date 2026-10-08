# Project Changelog

| Date | State / Change | Reason | Evidence or Decision | Owner |
|---|---|---|---|---|
| 2026-10-08 | 상단 주 메뉴에 `공유 키트` 바로가기를 추가 | 사업자가 공개 안내서의 긴 흐름을 다시 탐색하지 않고 설명 문장·출처·복사 기능으로 바로 이동하도록 개선 | DEC-014, E-LOCAL-BUILD-SHARE-KIT-NAV | NAVI / QA |
| 2026-10-08 | 사업자용 공유 키트 설명을 목적 중심의 짧은 문장으로 정리 | 문장을 읽는 순간 공유 키트의 구성과 활용 목적을 이해하도록 개선 | DEC-015, E-LOCAL-BUILD-SHARE-KIT-COPY | NAVI / QA |
| 2026-10-08 | 인지·수면 공유 카드의 복사·공유 결과에 PubMed 원문 라인을 추가 | 사업자가 연구 요약과 원문 출처를 함께 전달하도록 개선 | DEC-016, E-LOCAL-BUILD-SHARE-KIT-PAPER-SOURCE | NAVI / QA |
| 2026-10-08 | 공유 URL에 사업자·소비자 대상 상태를 보존 | 소비자용 묶음을 받은 사람도 동일한 소비자용 설명 화면에서 시작하도록 개선 | DEC-017, E-LOCAL-BUILD-SHARE-AUDIENCE-URL | NAVI / QA |
| 2026-10-08 | 모바일 상단 `공유 키트` 앵커의 메뉴 닫힘을 보완 | 공유 키트 도착 시 모바일 메뉴가 닫혀 자료를 바로 읽고 복사하도록 보완 | DEC-018, E-LOCAL-BUILD-SHARE-NAV-MOBILE | NAVI / QA |
| 2026-10-08 | 사업자용 공유 키트 설명을 짧게 정리 | 중복되는 위치 표현을 줄여 첫 시선의 목적 이해와 번들 성능을 함께 유지 | DEC-019, E-LOCAL-BUILD-SHARE-NAV-MOBILE | NAVI / QA |
| 2026-10-08 | 카드별 복사 완료 피드백을 구체화 | 사업자가 카드와 출처가 함께 복사됐는지 즉시 확인하도록 보완 | DEC-020, E-LOCAL-BUILD-SHARE-NAV-MOBILE | NAVI / QA |
| 2026-10-08 | 공유 키트 카드 열 수를 읽기 중심으로 재배치 | 데스크톱 3열·태블릿 2열·모바일 1열로 카드 폭을 넓혀 사업자와 큰 글씨 사용자의 가독성을 보완 | DEC-021, E-LOCAL-BUILD-SHARE-READABILITY | NAVI / QA |
| 2026-10-08 | 개별 카드 공유를 해당 주제 본문으로 연결 | 카드 하나를 전달받은 사람도 대상별 안내서 상태를 유지한 채 관련 공개 섹션에서 바로 읽도록 보완 | DEC-022, E-LOCAL-BUILD-SHARE-DEEP-LINK | NAVI / QA |
| 2026-10-08 | 모든 페이지 공유 진입점의 대상 URL을 통일 | 상단·마지막 공유에서도 사업자·소비자 선택 상태가 유지되도록 보완 | DEC-023, E-LOCAL-BUILD-SHARE-AUDIENCE-ALL | NAVI / QA |
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
| 2026-10-08 | `11 · 공유 키트`를 사업자·소비자 대상별 카드 5개, 연구 앵커, 개별·전체 복사, 공유 동작으로 고도화 | 사업자 설명 자료 활용성과 소비자 공유 흐름을 같은 페이지에서 강화 | E-LOCAL-BUILD-SHARE-KIT-V2, E-CDP-SHARE-KIT-V2 | NAVI / QA |
| 2026-10-08 | `10 · 전문가 영상`을 `03 · 전문가 영상`으로 앞당기고 연구 지도 이후 장 번호와 도입 읽기 순서를 재정렬 | 기본 개념 → 전문가 설명 → 연구 지도의 인지 흐름을 구현하고 진행 표시 정합성을 유지 | E-LOCAL-BUILD-EXPERT-FIRST, E-CHROME-EXPERT-FIRST | NAVI / QA |
| 2026-10-08 | 모바일 헤더를 컴팩트 고정형 컨트롤로 보완 | 700px 이하에서 메뉴·읽기 크기·공유 버튼을 각각 44px 조작 영역으로 유지해 핵심 탐색과 사업자 공유를 보존 | E-LOCAL-BUILD-MOBILE-HEADER | NAVI / QA |
| 2026-10-08 | 공유 키트 카드의 출처 연결 문구를 카드별 라벨로 개선 | 사업자가 `GABA란`, `일상 속 GABA`, `연구 지도`, `발효·안전` 중 어떤 정보로 이어지는지 카드에서 바로 확인하도록 보완 | E-LOCAL-BUILD-SOURCE-LABEL | NAVI / QA |
| 2026-10-08 | 공유 키트의 개별 카드 복사를 출처 포함 자료 카드 복사로 개선 | 문장 하나만 전달해도 카드 출처 라벨과 공개 페이지 주소가 함께 복사되도록 기존 전체 공유 번들 로직을 재사용 | E-LOCAL-BUILD-CARD-SOURCE-COPY | NAVI / QA |
| 2026-10-08 | 메인·가이드 링크 미리보기의 공개 과학 정체성을 통일 | 정적 description·Open Graph·Twitter·구조화 데이터에 제품과 무관한 공개 과학 안내서 설명을 반영 | E-LOCAL-BUILD-SHARE-METADATA | NAVI / QA |
| 2026-10-08 | 공유 묶음의 도착 링크를 공유 키트 직행으로 개선 | 전체 묶음·개별 카드 복사의 공개 안내서 URL을 `/guide/`로 연결하고 해당 경로가 `#reading-note` 공유 키트로 이어지도록 보완 | E-LOCAL-BUILD-SHARE-LANDING | NAVI / QA |
| 2026-10-08 | 공유 대상 전환의 접근성 의미를 정리 | 사업자·소비자 전환을 tablist가 아닌 선택 그룹으로 표현하고 `aria-pressed`로 선택 상태를 전달 | E-LOCAL-BUILD-SHARE-A11Y | NAVI / QA |
| 2026-10-08 | 사업자용 공유 5문장에 대표 사람 연구를 연결 | 인지·수면의 공개 연구 결과를 요약 카드에 포함하고 연구 상세 카드와 원문으로 바로 이어지도록 보완 | E-LOCAL-BUILD-BUSINESS-RESEARCH-CARDS | NAVI / QA |
| 2026-10-08 | 사업자용 연구 카드에 원문 출처를 직접 표시 | 인지·수면 카드가 카드 안에서 논문명·연도·PMID를 보여 주고 해당 원문 URL로 연결되도록 보완 | E-LOCAL-BUILD-SHARE-PAPER-SOURCE | NAVI / QA |
| 2026-10-08 | 공유 대상 선택 상태를 주소에도 반영 | 사업자·소비자 버튼을 선택하면 `/guide/?audience=...`로 갱신되어 주소창 복사만으로 같은 공유 대상 화면을 전달하도록 보완 | E-LOCAL-BUILD-SHARE-AUDIENCE-ADDRESS | NAVI / QA |
| 2026-10-08 | 390px 모바일 히어로를 단일 흐름으로 보정 | 숨은 보조 grid 열 때문에 첫 제목이 오른쪽에서 잘리던 문제를 모바일 `display:block`으로 제거하고, 전체 production build·성능 예산을 재검증 | E-LOCAL-BUILD-MOBILE-HERO-FLOW | NAVI / QA |
| 2026-10-08 | 공유 키트 390px·1440px 후속 렌더 감리 | 사업자용 5개 카드의 원문 출처, 복사 버튼, 390px 카드 폭과 1440px 3열 구조를 Chrome CDP로 재확인 | E-CDP-SHARE-KIT-FOLLOWUP | NAVI / QA |
| 2026-10-08 | 공유 키트에 선택형 묶음 공유를 추가 | 카드별 체크박스로 필요한 문장만 모아 복사·공유하고, 원문 링크·모바일 1열·데스크톱 3열·성능 예산을 유지 | E-LOCAL-BUILD-SHARE-SELECTION | NAVI / QA |
| 2026-10-08 | 공유 키트 카드 선택을 React 상태와 선택 수 표시로 안정화 | DOM 직접 조회 대신 화면·복사·공유가 같은 선택 상태를 사용하고 대상 전환 시 5개 카드 선택을 복원 | E-LOCAL-BUILD-SHARE-SELECTION-STATE | NAVI / QA |
| 2026-10-08 | NAVI 변경 이력의 구형 메타데이터를 보존형으로 현재 검증기와 정합화 | 기존 요청·결정·승인 기록은 유지하고 구조 검증에 필요한 분류·영향·산출물·승인 주체 필드를 보완해 `validate_project_state.py` 통과 | E-NAVI-STATE-SCHEMA-MIGRATION | NAVI / QA |

Record lifecycle transitions, approved changes, rework, and meaningful evidence updates. Do not use this file to erase history.
# 2026-10-02 · Public deployment verification follow-up

- Scheduled TF pulse produced a verified heartbeat commit; automatic PR creation was blocked by repository policy, so PR #6 was opened through the repository workflow.
- PR #6 passed `release-verify` and `site-quality-verify` and was merged without changing the public science copy.
- Main deployment run `36984877866` passed release verification, GitHub Pages deployment, live smoke test, and release status.
- Live validation confirmed candidate `bb4504fa902abbdb52b99f2998da6f2cd20ef1b0`, 6 research records, 6 share pages, and no public internal-operation snapshots.
- NAVI remains `USER_DECISION` / `INTERNAL_QA_READY_WITH_CONDITIONS`; open external-validation items remain open.
