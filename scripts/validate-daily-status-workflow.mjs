import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const workflowPath = resolve(process.cwd(), '.github/workflows/daily-status-report.yml');
const source = readFileSync(workflowPath, 'utf8');
const issues = [];
const requireText = (pattern, message) => { if (!pattern.test(source)) issues.push(message); };

requireText(/cron:\s*['"]0 1 \* \* \*['"]/, '한국 시간 오전 10시(UTC 01:00) 일정이 없습니다.');
requireText(/workflow_dispatch:/, '수동 보고 실행 트리거가 없습니다.');
requireText(/sync-public-data\.mjs/, '보고 전 승인 공개 데이터 동기화가 없습니다.');
requireText(/generate-daily-status-report\.mjs/, '일일 상태 보고 생성 스크립트가 연결되지 않았습니다.');
requireText(/daily-status\.json/, '일일 상태 보고 산출물이 보존되지 않습니다.');
requireText(/actions\/upload-artifact@/, '일일 상태 보고 아티팩트 업로드가 없습니다.');
requireText(/github-script@/, '누적 보고 이슈 갱신 단계가 없습니다.');
requireText(/issues:\s*write/, '누적 보고 이슈 갱신 권한이 없습니다.');
requireText(/steps\.report\.outcome == ['"]failure['"]/, '보고서 검증 실패를 작업 실패로 전파하지 않습니다.');

if (issues.length) {
  console.error(JSON.stringify({workflow: '.github/workflows/daily-status-report.yml', status: 'invalid', issues}, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({workflow: '.github/workflows/daily-status-report.yml', status: 'ok', schedule: '0 1 * * *', timezone: 'Asia/Seoul'}));
}
