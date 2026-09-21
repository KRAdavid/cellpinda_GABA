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
requireText(/actions\/github-script@373c709c69115d41ff229c7e5df9f8788daa9553\s+# v9\.0\.0/, '일일 보고 이슈 갱신이 Node 24 호환 github-script 버전으로 고정되지 않았습니다.');
requireText(/issues:\s*write/, '누적 보고 이슈 갱신 권한이 없습니다.');
requireText(/steps\.report\.outcome == ['"]failure['"]/, '보고서 검증 실패를 작업 실패로 전파하지 않습니다.');
requireText(/const productCount = Number\.isFinite\(report\.live\?\.products\)/, '제품 수가 없을 때 단위를 잘못 붙이지 않도록 처리하지 않습니다.');
requireText(/공개 사이트 점검 사유/, '공개 사이트 점검 실패 원인을 보고서에 기록하지 않습니다.');
requireText(/report\.live\?\.error/, '공개 사이트 점검 오류 필드가 보고서에 연결되지 않았습니다.');
const reportSource = readFileSync(resolve(process.cwd(), 'scripts/generate-daily-status-report.mjs'), 'utf8');
if (!/\.replace\(\/\\s\+\/g,\s*['"] ['"]\)/.test(reportSource)) {
  issues.push('일일 보고 오류가 여러 줄 스택 트레이스로 남아 읽기 어렵습니다.');
}
if (!/normalized\.match\(\/\\bError:/.test(reportSource) || !/\.slice\(0, 1200\)/.test(reportSource)) {
  issues.push('일일 보고 오류에서 핵심 Error 메시지만 추출하지 않습니다.');
}
if (/확인 필요\}\s*개/.test(source) || /확인 필요개/.test(source)) {
  issues.push('제품 수가 없는 경우에도 확인 필요 뒤에 개가 붙습니다.');
}

if (issues.length) {
  console.error(JSON.stringify({workflow: '.github/workflows/daily-status-report.yml', status: 'invalid', issues}, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({workflow: '.github/workflows/daily-status-report.yml', status: 'ok', schedule: '0 1 * * *', timezone: 'Asia/Seoul'}));
}
