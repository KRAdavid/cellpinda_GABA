import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
const workflow = await read('.github/workflows/automation-freshness.yml');
const script = await read('scripts/check-automation-freshness.mjs');
const issues = [];
const requireText = (pattern, message) => { if (!pattern.test(workflow)) issues.push(message); };

requireText(/cron:\s*['"]15 \* \* \* \*['"]/, '시간별 자동화 신선도 감시 일정이 없습니다.');
requireText(/workflow_dispatch:/, '수동 신선도 점검 트리거가 없습니다.');
requireText(/contents:\s*read/, '모니터가 contents read 권한을 선언하지 않습니다.');
requireText(/actions:\s*read/, '모니터가 Actions read 권한을 선언하지 않습니다.');
requireText(/issues:\s*write/, '모니터가 경보 이슈 갱신 권한을 선언하지 않습니다.');
requireText(/check-automation-freshness\.mjs --out automation-freshness\.json/, '신선도 검사 스크립트가 연결되지 않았습니다.');
requireText(/continue-on-error:\s*true/, '신선도 실패 시에도 경보 이슈를 갱신해야 합니다.');
requireText(/automation-freshness\.json/, '신선도 결과 artifact가 보존되지 않습니다.');
requireText(/actions\/github-script@373c709c69115d41ff229c7e5df9f8788daa9553/, '경보 이슈 갱신 action이 고정되지 않았습니다.');
requireText(/steps\.freshness\.outcome == ['"]failure['"]/, '신선도 실패를 workflow 실패로 전파하지 않습니다.');
assert.match(script, /daily-status-report\.yml/);
assert.match(script, /tf-pulse\.yml/);
assert.match(script, /26 \* 60/);
assert.match(script, /8 \* 60/);
assert.match(script, /event=schedule/);
assert.match(script, /publicMutation: false/);

if (/contents:\s*write|pull-requests:\s*write/.test(workflow)) issues.push('신선도 모니터에 쓰기 권한이 과도하게 열려 있습니다.');
if (issues.length) {
  console.error(JSON.stringify({workflow: '.github/workflows/automation-freshness.yml', status: 'invalid', issues}, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({workflow: '.github/workflows/automation-freshness.yml', status: 'ok', schedule: '15 * * * *', thresholds: {dailyStatusMinutes: 1560, tfPulseMinutes: 480}}));
}
