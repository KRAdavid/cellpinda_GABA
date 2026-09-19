import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const workflowPath = resolve(process.cwd(), '.github/workflows/tf-pulse.yml');
const source = readFileSync(workflowPath, 'utf8');
const issues = [];
const requireText = (pattern, message) => { if (!pattern.test(source)) issues.push(message); };

requireText(/cron:\s*['"]17 \*\/6 \* \* \*['"]/, '6시간 pulse schedule이 없습니다.');
requireText(/workflow_dispatch:/, '수동 pulse 실행 트리거가 없습니다.');
requireText(/name: Execute safe internal TF checks/, '읽기 전용 safe internal TF 실행 단계가 없습니다.');
requireText(/run: node scripts\/run-safe-tf-actions\.mjs tf-pulse\.json --out tf-safe-run\.json \| tee tf-safe-run-summary\.json/, 'safe internal TF 실행 명령이 없습니다.');
requireText(/name: Independently validate safe TF run/, 'safe internal TF 독립 검증 단계가 없습니다.');
requireText(/run: node scripts\/validate-safe-tf-run\.mjs tf-safe-run\.json tf-pulse\.json \| tee tf-safe-run-validation\.json/, 'safe internal TF 독립 검증 명령이 없습니다.');
requireText(/run:\s*\|\s*node scripts\/write-tf-pulse-heartbeat\.mjs tf-pulse\.json tf-safe-run\.json tf-safe-run-validation\.json/, 'heartbeat에 독립 검증된 safe 실행을 전달하지 않습니다.');
requireText(/contents:\s*write/, 'heartbeat 커밋에 필요한 contents: write 권한이 없습니다.');
requireText(/pull-requests:\s*write/, 'heartbeat PR 생성에 필요한 pull-requests: write 권한이 없습니다.');
requireText(/actions:\s*write/, 'heartbeat 검증 workflow dispatch에 필요한 actions: write 권한이 없습니다.');
requireText(/statuses:\s*write/, 'heartbeat 커밋 상태 기록에 필요한 statuses: write 권한이 없습니다.');
requireText(/heartbeat_branch=\"automation\/tf-pulse-heartbeat\"/, '보호된 main에 반영할 고정 heartbeat PR 브랜치가 없습니다.');
requireText(/git switch --create \"\$heartbeat_branch\"/, 'heartbeat PR 브랜치 전환 단계가 없습니다.');
requireText(/git push --force origin \"HEAD:refs\/heads\/\$\{heartbeat_branch\}\"/, 'heartbeat PR 브랜치 push 단계가 없습니다.');
requireText(/gh pr list --repo \"\$GITHUB_REPOSITORY\" --state open --base main --head \"\$heartbeat_branch\" --json number,url --jq 'if length > 0 then/, '기존 heartbeat PR 재사용 검사가 없습니다.');
requireText(/gh pr create --repo \"\$GITHUB_REPOSITORY\" --base main --head \"\$heartbeat_branch\"/, 'heartbeat PR 생성 단계가 없습니다.');
requireText(/gh workflow run deploy\.yml --repo \"\$GITHUB_REPOSITORY\" --ref \"\$heartbeat_branch\"/, 'heartbeat release-verify dispatch 단계가 없습니다.');
requireText(/gh workflow run verify\.yml --repo \"\$GITHUB_REPOSITORY\" --ref \"\$heartbeat_branch\"/, 'heartbeat site-quality dispatch 단계가 없습니다.');
requireText(/gh run watch \"\$\{deploy_run_url##\*\/\}\" --repo \"\$GITHUB_REPOSITORY\" --exit-status/, 'heartbeat release-verify 결과 대기 단계가 없습니다.');
requireText(/gh run watch \"\$\{verify_run_url##\*\/\}\" --repo \"\$GITHUB_REPOSITORY\" --exit-status/, 'heartbeat site-quality 결과 대기 단계가 없습니다.');
requireText(/gh api --method POST \"repos\/\$GITHUB_REPOSITORY\/statuses\/\$heartbeat_sha\"/, '검증 결과를 heartbeat 커밋 상태로 기록하지 않습니다.');
requireText(/GH_TOKEN:\s*\$\{\{ github\.token \}\}/, 'gh CLI에 GITHUB_TOKEN 연결이 없습니다.');
requireText(/tf-safe-run\.json/, 'safe internal TF 결과 artifact가 없습니다.');
requireText(/tf-safe-run-validation\.json/, 'safe internal TF 독립 검증 결과 artifact가 없습니다.');
if (/git push origin HEAD:main/.test(source)) issues.push('보호된 main에 heartbeat를 직접 push하면 안 됩니다.');

const commitIndex = source.indexOf('git commit -m "chore: refresh TF pulse heartbeat"');
const pushIndex = source.indexOf('git push --force origin "HEAD:refs/heads/${heartbeat_branch}"');
const prListIndex = source.indexOf('gh pr list --repo "$GITHUB_REPOSITORY"');
const prCreateIndex = source.indexOf('gh pr create --repo "$GITHUB_REPOSITORY"');
const dispatchIndex = source.indexOf('gh workflow run deploy.yml --repo "$GITHUB_REPOSITORY"');
const watchIndex = source.indexOf('gh run watch "${deploy_run_url##*/}" --repo "$GITHUB_REPOSITORY" --exit-status');
const statusIndex = source.indexOf('gh api --method POST "repos/$GITHUB_REPOSITORY/statuses/$heartbeat_sha"');
const safeRunIndex = source.indexOf('name: Execute safe internal TF checks');
const safeValidationIndex = source.indexOf('name: Independently validate safe TF run');
const heartbeatIndex = source.indexOf('name: Persist safe pulse heartbeat');
if (!(safeRunIndex >= 0 && safeRunIndex < safeValidationIndex && safeValidationIndex < heartbeatIndex)) issues.push('safe internal TF 실행·독립 검증이 heartbeat 저장보다 먼저 실행되어야 합니다.');
if (!(commitIndex >= 0 && commitIndex < pushIndex && pushIndex < prListIndex && prListIndex < prCreateIndex && prCreateIndex < dispatchIndex && dispatchIndex < watchIndex && watchIndex < statusIndex)) issues.push('heartbeat 커밋·브랜치 push·PR 검사·검증 dispatch·결과 대기·상태 기록 순서가 올바르지 않습니다.');
if (/\[skip ci\]/.test(source)) issues.push('heartbeat PR은 자체 검증을 받아야 하므로 [skip ci]를 사용하면 안 됩니다.');

if (issues.length) {
  console.error(JSON.stringify({workflow: '.github/workflows/tf-pulse.yml', status: 'invalid', issues}, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({workflow: '.github/workflows/tf-pulse.yml', status: 'ok', schedule: '17 */6 * * *', persistence: 'protected-main PR', verification: 'explicit workflow runs + commit statuses', reviewGate: 'required checks + human merge'}));
}
