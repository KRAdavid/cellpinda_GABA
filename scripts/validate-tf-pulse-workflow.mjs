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
requireText(/contents:\s*write/, 'heartbeat 커밋에 필요한 contents: write 권한이 없습니다.');
requireText(/actions:\s*write/, '명시적 deploy dispatch에 필요한 actions: write 권한이 없습니다.');
requireText(/git commit -m ["']chore: refresh TF pulse heartbeat \[skip ci\]["']/, 'heartbeat 커밋에 [skip ci] 보호가 없습니다.');
requireText(/git push origin HEAD:main/, 'heartbeat push 단계가 없습니다.');
requireText(/gh workflow run deploy\.yml --repo \"\$GITHUB_REPOSITORY\" --ref main/, 'heartbeat 후 deploy.yml 명시적 dispatch가 없습니다.');
requireText(/GH_TOKEN:\s*\$\{\{ github\.token \}\}/, 'gh dispatch에 GITHUB_TOKEN 연결이 없습니다.');
requireText(/tf-safe-run\.json/, 'safe internal TF 결과 artifact가 없습니다.');
requireText(/tf-safe-run-validation\.json/, 'safe internal TF 독립 검증 결과 artifact가 없습니다.');

const commitIndex = source.indexOf('git commit -m');
const pushIndex = source.indexOf('git push origin HEAD:main');
const dispatchIndex = source.indexOf('gh workflow run deploy.yml');
const safeRunIndex = source.indexOf('name: Execute safe internal TF checks');
const safeValidationIndex = source.indexOf('name: Independently validate safe TF run');
const heartbeatIndex = source.indexOf('name: Persist safe pulse heartbeat');
if (!(safeRunIndex >= 0 && safeRunIndex < safeValidationIndex && safeValidationIndex < heartbeatIndex)) issues.push('safe internal TF 실행·독립 검증이 heartbeat 저장보다 먼저 실행되어야 합니다.');
if (!(commitIndex >= 0 && commitIndex < pushIndex && pushIndex < dispatchIndex)) issues.push('heartbeat 커밋·push·deploy dispatch 순서가 올바르지 않습니다.');
if (/git commit -m ["']chore: refresh TF pulse heartbeat["']/.test(source)) issues.push('중복 push workflow를 막는 [skip ci] 없는 heartbeat 커밋이 남아 있습니다.');

if (issues.length) {
  console.error(JSON.stringify({workflow: '.github/workflows/tf-pulse.yml', status: 'invalid', issues}, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({workflow: '.github/workflows/tf-pulse.yml', status: 'ok', schedule: '17 */6 * * *', dispatch: 'deploy.yml', duplicateGuard: '[skip ci]'}));
}
