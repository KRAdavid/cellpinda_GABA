# 공개 Pages UI 검증 기록

검증일: 2026-09-10. 대상: `https://kradavid.github.io/cellpinda_GABA/`. Chromium headless 브라우저에서 최신 Pages를 직접 열어 확인했다. HTTP smoke만으로는 확인할 수 없는 화면 텍스트·상태·가로폭·콘솔 오류를 별도로 점검했다.

| 화면·폭 | 확인 결과 |
|---|---|
| 제품 비교 · 1440px | `셀핀다 가바 1500` 표시, `750` 미표시, 스마트스토어 링크 4개, `scrollWidth=clientWidth=1440`, 콘솔 오류 0 |
| 제품 비교 · 390px | `셀핀다 가바 1500` 표시, `750` 미표시, 스마트스토어 링크 4개, `scrollWidth=clientWidth=390`, 콘솔 오류 0 |
| 운영 MVP · 1440px | 현재 운영 큐 표시, `마케팅·소비자심리` TF 역할 표시, 목표 생성 후 내부 자동 파동 5건·승인 요청·TF 의사결정 기록 표시, `scrollWidth=clientWidth=1440`, 콘솔 오류 0 |

운영 화면은 정적 Pages에서 Worker API를 호출하지 않고 공개 JSON·브라우저 임시 저장 폴백을 사용한다. `?view=ops`에서 목표를 다시 생성해도 외부 게시·구매는 실행하지 않고 P1 승인 대기에서 멈춘다. 이는 합성 샌드박스 UI 검증이며 실제 소비자 사용성 조사나 영구 Worker·D1 운영 검증을 뜻하지 않는다.

`/account`는 정적 호스트에서 회원 API 대신 브라우저 7일 기록 안내로 전환하고, `/admin`은 운영 Worker가 없다는 안내를 보여 준다. 두 화면 모두 Worker API가 연결된 호스트에서만 서버 기능을 요청한다.

코드 기준 release HEAD는 `4c078ed`이며, 해당 변경의 [GitHub Actions 34492465269](https://github.com/KRAdavid/cellpinda_GABA/actions/runs/34492465269)에서 타입검사·테스트·빌드·Pages·라이브 smoke가 성공했다.
