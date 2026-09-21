import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const workflowPath = resolve(process.cwd(), '.github/workflows/tf-pulse.yml');
const source = readFileSync(workflowPath, 'utf8');
const heartbeatScript = readFileSync(resolve(process.cwd(), 'scripts/write-tf-pulse-heartbeat.mjs'), 'utf8');
const packageJson = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'));
const issues = [];
const requireText = (pattern, message) => { if (!pattern.test(source)) issues.push(message); };

requireText(/cron:\s*['"]17 \*\/6 \* \* \*['"]/, '6시간 pulse schedule이 없습니다.');
requireText(/workflow_dispatch:/, '수동 pulse 실행 트리거가 없습니다.');
requireText(/^permissions:\s*\n(?:  #[^\r\n]*\r?\n)*  contents:\s*read\s*\r?\n  pull-requests:\s*read/m, 'workflow 기본 권한은 read-only여야 합니다.');
requireText(/pulse:\s*\r?\n\s+permissions:\s*\r?\n\s+contents:\s*read\s*\r?\n\s+pull-requests:\s*read/, 'pulse 후보 job은 read-only 권한이어야 합니다.');
requireText(/persist-heartbeat:\s*\r?\n\s+if:\s*github\.event_name == 'schedule' && github\.ref == 'refs\/heads\/main'/, 'heartbeat 쓰기 job은 schedule/main에서만 실행되어야 합니다.');
requireText(/persist-heartbeat:[\s\S]*?\r?\n\s+permissions:\s*\r?\n\s+contents:\s*write\s*\r?\n\s+pull-requests:\s*write/, 'heartbeat 쓰기 권한은 schedule/main job에만 있어야 합니다.');
requireText(/needs:\s*pulse/, 'heartbeat publisher가 검증된 pulse job에 의존해야 합니다.');
requireText(/name: Execute safe internal TF checks/, '읽기 전용 safe internal TF 실행 단계가 없습니다.');
requireText(/run: node scripts\/run-safe-tf-actions\.mjs tf-pulse\.json --out tf-safe-run\.json \| tee tf-safe-run-summary\.json/, 'safe internal TF 실행 명령이 없습니다.');
requireText(/name: Independently validate safe TF run/, 'safe internal TF 독립 검증 단계가 없습니다.');
requireText(/run: node scripts\/validate-safe-tf-run\.mjs tf-safe-run\.json tf-pulse\.json \| tee tf-safe-run-validation\.json/, 'safe internal TF 독립 검증 명령이 없습니다.');
requireText(/run:\s*\|\s*node scripts\/write-tf-pulse-heartbeat\.mjs tf-pulse\.json tf-safe-run\.json tf-safe-run-validation\.json/, 'heartbeat에 독립 검증된 safe 실행을 전달하지 않습니다.');
requireText(/name: Persist safe pulse heartbeat/, 'heartbeat 저장 단계가 없습니다.');
requireText(/name: Verify non-main pulse candidate\s+if: github\.ref != 'refs\/heads\/main'/, '비-main 수동 pulse 후보 검증 단계가 없습니다.');
requireText(/contents:\s*write/, 'heartbeat 커밋에 필요한 contents: write 권한이 없습니다.');
requireText(/pull-requests:\s*write/, 'heartbeat PR 생성에 필요한 pull-requests: write 권한이 없습니다.');
requireText(/heartbeat_branch=\"automation\/tf-pulse-heartbeat\"/, '보호된 main에 반영할 고정 heartbeat PR 브랜치가 없습니다.');
requireText(/git switch --create \"\$heartbeat_branch\"/, 'heartbeat PR 브랜치 전환 단계가 없습니다.');
requireText(/git push --force origin \"HEAD:refs\/heads\/\$\{heartbeat_branch\}\"/, 'heartbeat PR 브랜치 push 단계가 없습니다.');
requireText(/gh pr list --repo \"\$GITHUB_REPOSITORY\" --state open --base main --head \"\$heartbeat_branch\" --json number,url --jq 'if length > 0 then/, '기존 heartbeat PR 재사용 검사가 없습니다.');
requireText(/gh pr create --repo \"\$GITHUB_REPOSITORY\" --base main --head \"\$heartbeat_branch\"/, 'heartbeat PR 생성 단계가 없습니다.');
requireText(/pr_create_status=0[\s\S]*?set \+e[\s\S]*?pr_create_status=\$\?[\s\S]*?set -e/, 'PR 생성 권한이 없는 저장소에서도 heartbeat 검증을 계속하는 fallback이 없습니다.');
requireText(/repository policy blocked automatic PR creation/, '자동 PR 생성 차단 시 수동 승인 대기 상태를 알리는 경고가 없습니다.');
requireText(/A human must open the protected-main PR before the heartbeat can publish/, '자동 PR 생성 차단 시 보호된 main 수동 게이트가 summary에 기록되지 않습니다.');
requireText(/pnpm run typecheck/, 'heartbeat 후보 typecheck가 없습니다.');
requireText(/pnpm test/, 'heartbeat 후보 회귀 테스트가 없습니다.');
requireText(/pnpm run build/, 'heartbeat 후보 production build가 없습니다.');
requireText(/pnpm run preflight:deploy/, 'heartbeat 후보 배포 readiness 검사가 없습니다.');
requireText(/pnpm run test:worker-reviews/, 'heartbeat 후보 Worker review 통합 검사가 없습니다.');
requireText(/pnpm exec wrangler deploy --dry-run --outdir worker-build/, 'heartbeat 후보 Worker dry-run이 없습니다.');
requireText(/never write[\s\S]*protected release status contexts/, '축약 pulse가 보호된 release 상태를 직접 기록하지 않는다는 fail-closed 경계가 없습니다.');
requireText(/branch protection[\s\S]*must remain pending/, '완전한 pull_request 검사가 실행되지 않으면 보호 규칙을 통과하지 않는 fail-closed 설명이 없습니다.');
requireText(/GH_TOKEN:\s*\$\{\{ github\.token \}\}/, 'gh CLI에 GITHUB_TOKEN 연결이 없습니다.');
requireText(/persist-credentials:\s*false/, 'read-only pulse checkout은 persist-credentials: false여야 합니다.');
requireText(/persist-credentials:\s*true/, 'schedule/main heartbeat job은 push용 credential이 필요합니다.');
requireText(/tf-safe-run\.json/, 'safe internal TF 결과 artifact가 없습니다.');
requireText(/tf-safe-run-validation\.json/, 'safe internal TF 독립 검증 결과 artifact가 없습니다.');
if (!/const scriptArgs = process\.argv\.slice\(2\)\.filter\(argument => argument !== '--'\)/.test(heartbeatScript)) issues.push('heartbeat 로컬·CI 인자가 pnpm 구분자를 제거하지 않습니다.');
if (packageJson.scripts?.['tf:safe:local'] !== 'node scripts/run-local-safe-tf.mjs') issues.push('로컬 safe-run·독립 검증 래퍼가 package script에 연결되지 않았습니다.');
if (/git push origin HEAD:main/.test(source)) issues.push('보호된 main에 heartbeat를 직접 push하면 안 됩니다.');

const commitIndex = source.indexOf('git commit -m "chore: refresh TF pulse heartbeat"');
const pushIndex = source.indexOf('git push --force origin "HEAD:refs/heads/${heartbeat_branch}"');
const prListIndex = source.indexOf('gh pr list --repo "$GITHUB_REPOSITORY"');
const prCreateIndex = source.indexOf('gh pr create --repo "$GITHUB_REPOSITORY"');
const verifyIndex = source.indexOf('pnpm run typecheck', prCreateIndex);
const buildIndex = source.indexOf('pnpm run build', prCreateIndex);
const safeRunIndex = source.indexOf('name: Execute safe internal TF checks');
const safeValidationIndex = source.indexOf('name: Independently validate safe TF run');
const heartbeatIndex = source.indexOf('name: Persist safe pulse heartbeat');
if (!(safeRunIndex >= 0 && safeRunIndex < safeValidationIndex && safeValidationIndex < heartbeatIndex)) issues.push('safe internal TF 실행·독립 검증이 heartbeat 저장보다 먼저 실행되어야 합니다.');
if (!(commitIndex >= 0 && commitIndex < pushIndex && pushIndex < prListIndex && prListIndex < prCreateIndex && prCreateIndex < verifyIndex && verifyIndex < buildIndex)) issues.push('heartbeat 커밋·브랜치 push·PR 검사·후보 검증 순서가 올바르지 않습니다.');
if (/gh api\s+--method\s+POST\s+[^\n]*statuses\//.test(source) || /statuses:\s*write/.test(source)) issues.push('TF pulse가 보호된 release 상태를 직접 기록하거나 statuses 권한을 가져서는 안 됩니다.');
if (/\[skip ci\]/.test(source)) issues.push('heartbeat PR은 자체 검증을 받아야 하므로 [skip ci]를 사용하면 안 됩니다.');
if (/^permissions:\s*\r?\n\s+contents:\s*write/m.test(source)) issues.push('workflow 기본 권한을 write로 열어두면 수동 임의 ref가 쓰기 토큰을 상속하므로 job 수준으로 내려야 합니다.');

if (issues.length) {
  console.error(JSON.stringify({workflow: '.github/workflows/tf-pulse.yml', status: 'invalid', issues}, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({workflow: '.github/workflows/tf-pulse.yml', status: 'ok', schedule: '17 */6 * * *', persistence: 'protected-main PR', verification: 'candidate evidence only; complete pull_request checks remain authoritative', reviewGate: 'required checks + human merge'}));
}
