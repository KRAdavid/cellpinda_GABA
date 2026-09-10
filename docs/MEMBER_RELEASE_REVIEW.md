# 회원 기능 배포 검토

작성: 2026-09-10, 독립 AI 코드·동작 검토 담당. 현재는 구현 도착 전 요구사항이다. 체크되지 않은 항목을 통과로 해석하지 않는다. 실제 보안 전문기관 인증, 연구 또는 법률 검토가 아니다.

## 배포 판정 규칙

회원가입 활성화는 아래 인증·격리·삭제·동의·실제 브라우저 검증의 증거를 확보한 배포 환경에서만 한다. 정적 코드 검토, 모의 응답 테스트, 패스키 UI 표시만으로 실제 인증 통과를 대신하지 않는다. 임시 배포에서는 공개 정보 열람과 로컬 체험을 사용할 수 있되 회원가입을 서버와 화면 양쪽에서 비활성화한다.

## 요구 체크리스트

| 확인 | 영역 | 통과 기준 및 남길 증거 |
| --- | --- | --- |
| [ ] | 정확한 origin·RP ID | 환경 설정의 HTTPS origin과 RP ID를 고정한다. 요청 Host나 사용자가 보낸 origin을 검증 기준으로 채택하지 않는다. 인증 응답의 origin, RP ID hash, challenge, ceremony type, 서명, 사용자 확인 조건을 서버에서 검증한다. 잘못된 origin/RP의 거부 테스트를 남긴다. |
| [ ] | challenge | 암호학적으로 무작위 생성하고 만료시각·용도·해당 시도에 묶는다. 한 번 소비한 challenge, 만료, 다른 가입/로그인 시도의 challenge를 거부한다. 병렬 검증에서도 한 번만 성공해야 한다. 실패 후 재시도 정책을 명시한다. |
| [ ] | 자격증명 | credential ID 중복을 거부하고 공개키를 서버에서 보관한다. 로그인에서 credential의 실제 소유 회원을 서버가 결정한다. 클라이언트가 지정한 회원 ID로 소유자를 대체하지 않는다. 검증 라이브러리 오류를 성공으로 처리하지 않는다. |
| [ ] | 세션 | 무작위 불투명 토큰을 발급하고 서버에는 토큰 hash를 저장한다. 로그인 후 새 세션을 발급한다. HTTPS의 Secure·HttpOnly·SameSite=Strict 쿠키와 적절한 Path를 확인한다. 세션을 localStorage, URL, 분석 이벤트에 넣지 않는다. |
| [ ] | 만료·로그아웃 | 서버에서 만료를 검사하고 로그아웃 시 저장된 세션을 무효화하며 쿠키를 지운다. 만료 토큰·로그아웃 전 토큰의 재사용을 거부한다. 사용 중 만료 시 입력 보존과 재인증 안내가 작동한다. |
| [ ] | 회원 간 CRUD 격리 | 조회·생성·갱신·삭제 모두 인증 세션의 회원 ID로 범위를 정한다. 회원 A가 B의 ID·기록 ID를 제출해도 읽거나 바꾸지 못한다. 두 회원과 비회원으로 API 경계 테스트를 수행한다. |
| [ ] | revision 충돌 | 서버가 현재 revision과 요청 revision을 원자적으로 비교한다. 오래된 탭의 갱신은 409 등 충돌 응답으로 차단한다. 화면이 서버 기록을 무조건 덮어쓰거나 자동 재전송하지 않고 재조회·사용자 선택을 제공한다. |
| [ ] | 계정 삭제 | 회원·자격증명·모든 세션·서버 기록·회원 연결 challenge 등 관련 행을 함께 정리한다. 삭제 후 기존 세션과 credential로 접근할 수 없다. 로컬 사본의 처리와 서버 삭제 범위를 화면에 구분한다. 부분 실패가 남지 않는 트랜잭션 또는 동등한 처리를 확인한다. |
| [ ] | 서버 저장 동의 | 저장할 항목·서버 저장 목적·삭제 방법을 먼저 알리고 명시적 선택을 받는다. 동의는 미리 선택하지 않는다. 가입만으로 로컬 체험 기록을 자동 전송하지 않는다. API에서도 동의 여부를 검증한다. |
| [ ] | 임시 도메인 차단 | 임시 origin에서 UI 버튼뿐 아니라 직접 가입·인증 API도 활성화되지 않는다. 본 도메인으로 변경하면 기존 임시 RP의 패스키가 자동 이전된다고 안내하지 않는다. |
| [ ] | 실제 브라우저 패스키 | 실제 navigator.credentials 생성·인증을 거쳐 가입→로그아웃→로그인→기록 저장→다시 조회→삭제를 검증한다. 브라우저 가상 authenticator 사용 여부와 물리기기 테스트 여부를 구분한다. 취소·미지원·패스키 미보유 상황도 확인한다. |
| [ ] | 복구 미지원 | 이메일·비밀번호 복구가 없다는 한계를 가입 전에 안내한다. 패스키 접근을 잃으면 서버 계정에 재접속하지 못할 수 있음을 밝힌다. 구현되지 않은 복구·다중 기기 동기화를 보장하지 않는다. |
| [ ] | 요청 경계 | 인증·상태 변경 요청의 origin/CSRF 방어, JSON 입력·크기 제한, 인증 시도 남용 제한을 검토한다. 개인정보·토큰·기록 내용이 로그/분석에 섞이지 않는지 확인한다. |

인증 검증 기준은 [W3C WebAuthn](https://www.w3.org/TR/webauthn-3/)의 등록·인증 응답 검증 절차를 참고한다. 세션 속성·만료·무효화 기준은 [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)를 참고한다. 회원 격리·동의·revision·계정 삭제 항목은 이 제품의 구현 요구사항이다.

## 구현 도착 후 기록할 결과

- 검토 대상 commit/파일/설정: 미확인.
- API 테스트 결과: 미실행.
- 브라우저와 origin, authenticator 종류: 미실행.
- 차단 이슈 및 수정 권고: 구현 확인 후 기록.
- 현재 판정: 회원 공개 활성화 준비 여부 미판정. 요구사항 작성 완료.

검토자는 회원 구현 코드를 소유하거나 수정하지 않는다. 발견 사항은 해당 파일·영향·재현 조건과 함께 통합 담당자에게 전달한다.

## 1차 코드 검토 인계 (2026-09-10)

대상은 작업 중인 `worker/members.ts`, `worker/index.ts`, `src/components/MemberRecords.tsx`, `wrangler.jsonc`다. commit 고정 전 정적 확인이며 실제 인증 통과 판정이 아니다.

- backend에서 설정된 origin/RP 고정, challenge DELETE RETURNING 소비, 라이브러리 서명·UV 검증, hash 세션, 쿠키 속성, 회원 ID 범위 SQL, revision 조건부 UPDATE를 확인했다. outer router의 본문 제한·rate limit·dispatch가 연결되어 있다. MEMBER_ORIGIN은 배포 설정에 아직 없다.
- 발견 및 인계: 계정 삭제에서 pending challenge 정리가 누락되어 backend 담당에게 전달했다. 담당자가 회원 ID 또는 현재 challenge cookie hash 삭제, 로그아웃 challenge 삭제도 추가했다고 회신했고 변경 코드를 확인했다.
- 수정 필요: MemberRecords.authenticate에서 새 사용자 상태를 먼저 반영한 후 기록 조회가 실패하면 이전 사용자의 saved/draft가 남는다. 다른 패스키로 재로그인할 때 발생 가능하다. 회원 ID 변경 시 이전 기록 state를 먼저 지우고 새 회원 기록 로드 성공 전 편집을 잠그도록 frontend 담당 및 main에 인계했다. 동일 계정 재인증 시 미저장 draft 소실도 함께 검토 요청했다.
- 실제 브라우저 ceremony, 두 회원의 API 격리, 동시 revision, 삭제 후 토큰 재사용 테스트 증거는 아직 미확인이다. 체크리스트 전체 통과로 변경하지 않았다.

## 후속 정적 검토 및 테스트 인계

- 기존 계정 전환 문제는 `recordOwner`, `recordReady`와 새 회원 전환 시 state 초기화로 수정된 것을 확인했다. 동일 회원 재인증은 미저장 초안을 유지하고 서버 revision 차이에 충돌 잠금을 건다.
- backend 담당 보고: 실제 EC 키·CBOR 등록·서명 검증을 사용하는 통합 테스트 2개 통과. 병렬 challenge 재사용, 잘못된 서명·UV·origin, 만료, 회원 격리, 삭제 재인증을 포함한다. 이는 브라우저 테스트와 별도 증거다.
- main 보고: localhost:8788에서 CDP 가상 CTAP2 authenticator로 실제 SimpleWebAuthn 등록→저장→새로고침→로그아웃→패스키 로그인→계정 삭제를 완료했다. 별도 context·별도 키의 회원 B에서 A 기록이 없음을 확인하고 B도 삭제했다. 오류 0. 외부 QA 폴더의 `member-passkey-qa.cjs`가 실행 기록이다. 물리기기·운영 origin 테스트를 대신하지 않는다.
- 추가 인계: 같은 브라우저의 다른 탭에서 계정이 변경되면 공유 세션 쿠키는 새 회원이지만 기존 탭의 기록은 이전 회원일 수 있다. revision이 같으면 이전 초안을 새 계정에 저장할 수 있으므로 mutation의 expectedMemberId와 서버 세션 소유자가 다를 때 거부하도록 main/backend/frontend에 권고했다. 이 항목은 수정 확인 전 열려 있다.
- 공개 임시 도메인의 status disabled 실측은 main이 진행 예정이며 아직 본 문서에서 통과 처리하지 않는다.


## 통합 수정 확인

다중탭 계정전환 결함은 보호API의 X-Member-ID와 세션회원 비교로 수정했다. 누락400,불일치409 account_changed이며 조회·저장·기록삭제·계정삭제를 차단한다. UI는 계정변경 오류시 이전초안을 숨기고 제거하며 일반revision충돌과구분한다. 실제CDP브라우저에서 A화면에B쿠키를적용하여 A초안PUT409, A원래기록유지,B기록변경없음 확인. 별도회원가입/로그인/조회/삭제도같이검증했다.

공개 https://cellpinda-rhythm.marshy-shear.workers.dev/api/member/status 는 enabled:false,user:null (실측200). /account 는 noindex,nofollow,noarchive. MEMBER_ORIGIN은 .dev.vars의 localhost:8788로만일치하고 임시공개주소와는불일치다. 코드업로드는회원운영오픈을의미하지않는다.

테스트환경은 Chromium CDP가상CTAP2인증장치와 localhost:8788의 실제Worker/D1·SimpleWebAuthn14이다. 물리기기/영구도메인테스트,추가패스키·키분실복구,전체기록이력,운영개인정보정책확정은미완이다. 로컬QA에이전실패테스트의더미계정이남을수있으며실제회원지표로해석하지않는다.

## 회원 경계 최종 갱신

다중 탭 계정 전환 항목은 backend의 `x-member-id`와 `session.member_id` 비교 및 frontend의 `account_changed` 상태 초기화로 수정된 것을 정적으로 확인했다. backend 담당은 두 실제 서명 계정의 B 세션+A 기대 ID에 대한 4개 보호 경로 거부와 기록 무변경 테스트 통과를 보고했다. IMPLEMENTATION_STATUS 최신 기록에서 공개 임시주소 enabled:false 실측도 확인했다. 정식 origin·물리기기·복구/보유기간 운영 게이트는 계속 미완료이며 전체 플랫폼 완료 판정은 COMPLETION_AUDIT.md를 따른다.
