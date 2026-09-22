import {writeFile} from 'node:fs/promises';

const args = process.argv.slice(2);
const outputIndex = args.indexOf('--out');
const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : null;
const repository = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com';
const checkedAt = process.env.CHECKED_AT ? new Date(process.env.CHECKED_AT) : new Date();
// In Actions, GITHUB_SHA is the commit that the monitor checked out. A
// successful scheduled run from an older commit can be re-run later and look
// fresh by time alone while its heartbeat still describes stale source. Treat
// that run as incompatible with the current monitor commit.
const expectedHeadSha = process.env.EXPECTED_HEAD_SHA || process.env.GITHUB_SHA || null;

if (!repository || !token) throw new Error('GITHUB_REPOSITORY와 GITHUB_TOKEN이 필요합니다.');
if (!Number.isFinite(checkedAt.getTime())) throw new Error('CHECKED_AT이 올바른 ISO 시각이 아닙니다.');

const monitored = [
  {id: 'daily-status-report', workflow: 'daily-status-report.yml', label: '일일 보고', maxAgeMinutes: 26 * 60},
  {id: 'tf-pulse', workflow: 'tf-pulse.yml', label: 'TF pulse', maxAgeMinutes: 8 * 60},
];

async function request(path) {
  const response = await fetch(`${apiUrl}${path}`, {
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'x-github-api-version': '2022-11-28',
    },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
  return response.json();
}

const checks = [];
let status = 'MET';
try {
  for (const item of monitored) {
    const data = await request(`/repos/${repository}/actions/workflows/${item.workflow}/runs?event=schedule&status=completed&per_page=20`);
    const attempts = data.workflow_runs || [];
    const latestAttempt = attempts[0] || null;
    const successfulAttempts = attempts.filter(run => run.conclusion === 'success' && run.status === 'completed');
    const latestSuccess = successfulAttempts[0] || null;
    const successful = successfulAttempts.find(run => !expectedHeadSha || run.head_sha === expectedHeadSha);
    const completedAt = successful?.completed_at || successful?.updated_at || null;
    const ageMinutes = completedAt ? Math.max(0, Math.round((checkedAt.getTime() - new Date(completedAt).getTime()) / 60000)) : null;
    const fresh = Number.isFinite(ageMinutes) && ageMinutes <= item.maxAgeMinutes;
    const headMismatch = !successful && expectedHeadSha && latestSuccess && latestSuccess.head_sha !== expectedHeadSha;
    checks.push({
      id: item.id,
      label: item.label,
      workflow: item.workflow,
      status: fresh ? 'FRESH' : 'STALE',
      maxAgeMinutes: item.maxAgeMinutes,
      ageMinutes,
      lastAttempt: latestAttempt ? {
        id: latestAttempt.id,
        status: latestAttempt.status,
        conclusion: latestAttempt.conclusion,
        createdAt: latestAttempt.created_at,
        completedAt: latestAttempt.completed_at,
        url: latestAttempt.html_url,
      } : null,
      lastSuccess: successful ? {id: successful.id, completedAt, sha: successful.head_sha, url: successful.html_url} : null,
      latestSuccess: latestSuccess ? {id: latestSuccess.id, completedAt: latestSuccess.completed_at || latestSuccess.updated_at || null, sha: latestSuccess.head_sha, url: latestSuccess.html_url} : null,
      expectedHeadSha,
      reason: fresh ? '최근 예약 실행 성공' : headMismatch ? `예약 성공 기록은 있으나 현재 커밋과 불일치 (${latestSuccess.head_sha} ≠ ${expectedHeadSha})` : successful ? `마지막 예약 성공 후 ${ageMinutes}분 경과${latestAttempt && latestAttempt.id !== successful.id ? ` · 최근 시도 ${latestAttempt.conclusion || latestAttempt.status}` : ''}` : '성공한 예약 실행 기록 없음',
    });
  }
  status = checks.every(check => check.status === 'FRESH') ? 'MET' : 'STALE';
} catch (error) {
  status = 'ERROR';
  checks.push({
    id: 'automation-freshness-api',
    label: '자동화 신선도 API',
    workflow: null,
    status: 'ERROR',
    maxAgeMinutes: null,
    ageMinutes: null,
    lastSuccess: null,
    reason: error instanceof Error ? error.message : String(error),
  });
}

const result = {
  schemaVersion: 1,
  repository,
  checkedAt: checkedAt.toISOString(),
  status,
  checks,
  publicMutation: false,
};
if (outputPath) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(result));
if (result.status !== 'MET') process.exitCode = 1;
