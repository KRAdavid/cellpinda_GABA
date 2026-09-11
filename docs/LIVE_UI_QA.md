# 공개 Pages UI 검증 기록

검증일: 2026-09-10. 대상: `https://kradavid.github.io/cellpinda_GABA/`. Chromium headless 브라우저에서 최신 Pages를 직접 열어 확인했다. HTTP smoke만으로는 확인할 수 없는 화면 텍스트·상태·가로폭·콘솔 오류를 별도로 점검했다.

| 화면·폭 | 확인 결과 |
|---|---|
| 제품 비교 · 1440px | `셀핀다 가바 1500` 표시, `750` 미표시, 스마트스토어 링크 4개, `scrollWidth=clientWidth=1440`, 콘솔 오류 0 |
| 제품 비교 · 390px | `셀핀다 가바 1500` 표시, `750` 미표시, 스마트스토어 링크 4개, `scrollWidth=clientWidth=390`, 콘솔 오류 0 |
| 운영 MVP · 1440px | 현재 운영 큐 표시, `마케팅·소비자심리` TF 역할 표시, 목표 생성 후 내부 자동 파동 5건·승인 요청·TF 의사결정 기록 표시, `scrollWidth=clientWidth=1440`, 콘솔 오류 0 |
| 회원 기록 · `?view=account` · 390px | HTTP 200, `지금은 브라우저 기록으로 만나요.` 표시, 패스키 로그인 UI 미표시, `scrollWidth=clientWidth=390`, 콘솔·오류 응답 0 |
| 콘텐츠 검토실 · `?view=admin` · 1440px | HTTP 200, `콘텐츠 검토실`·운영자 접근 키 표시, `scrollWidth=clientWidth=1440`, 콘솔·오류 응답 0 |

운영 화면은 정적 Pages에서 Worker API를 호출하지 않고 공개 JSON·브라우저 임시 저장 폴백을 사용한다. `?view=ops`에서 목표를 다시 생성해도 외부 게시·구매는 실행하지 않고 P1 승인 대기에서 멈춘다. 이는 합성 샌드박스 UI 검증이며 실제 소비자 사용성 조사나 영구 Worker·D1 운영 검증을 뜻하지 않는다.

`/account`는 정적 호스트에서 회원 API 대신 브라우저 7일 기록 안내로 전환하고, `/admin`은 운영 Worker가 없다는 안내를 보여 준다. 두 화면 모두 Worker API가 연결된 호스트에서만 서버 기능을 요청한다.

코드 기준 release HEAD는 `3d78f23`이며, 해당 변경의 [GitHub Actions 34494224366](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34494224366)에서 타입검사·테스트·빌드·Pages·라이브 smoke가 성공했다.

## 2026-09-12 소비자 공유·구매 흐름 재검증

Chrome 기반 Playwright로 최신 GitHub Pages를 다시 열어 첫 방문부터 공유까지의 실제 상호작용을 점검했다. 첫 화면은 GABA 설명·`1분 리듬 체크 시작`·`셀핀다 가바 1500`을 노출하고, `750`·내부 운영 메뉴·빈 자료 문구는 노출하지 않았다.

| 흐름 | 확인 결과 |
|---|---|
| 1분 리듬 체크 | 다섯 문항이 `01 → 02 → 03 → 04 → 05`로 터치 선택 후 자동 진행되고 `안정 리듬형` 결과 카드 생성 |
| 결과 공유 | `share/steady/` 유형별 URL과 익명 `ref` 생성, 링크 복사 성공 |
| 구매·후기 | 제품·후기 CTA 모두 `https://smartstore.naver.com/cellpinda/products/4701017202`로 직접 연결 |
| 캠페인 보존 | 제품 구성 공유·7일 챌린지 초대에 승인된 `campaign`만 유지하고 답변·개인정보 파라미터는 제외 |
| 공유 유입 | `share/active/`가 `공유받은 리듬 이야기`와 `나도 1분 리듬 체크`를 표시하고 새 체크로 이어짐 |
| 모바일·오류 | 390×844에서 가로 오버플로 없음, 콘솔·페이지 오류 0 |

동일 시점 `validate:live`도 HTTP 200, 연구 8건, 제품 1종, 공유 페이지 6개, `smartStoreOnly=true`, `removed750=true`, `teaserPreview=true`, `provenance=matched`를 반환했다. 이 기록은 공개 UI와 익명 공유 경계를 검증한 것이며 실제 주문·후기 권한·티저 최종 공개 승인을 대신하지 않는다.

같은 배포본의 루트와 결과별 공유 HTML도 직접 확인했다. 루트 canonical·OG 제목이 셀핀다 페이지를 가리키고, `active`, `sleep`, `irregular`, `sensory`, `unrested`, `steady` 여섯 경로가 각각 자신의 canonical URL과 `social-rhythm-{id}.png` 이미지를 사용한다. 제목·설명에는 750 제품이나 내부 운영 문구가 없으며, 여섯 경로 모두 HTTP 200으로 응답했다.
