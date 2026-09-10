import {spawnSync} from 'node:child_process';
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

const root = process.cwd();
const destination = resolve(root, 'tmp/local-goal-audit.json');
const result = spawnSync(process.execPath, [resolve(root, 'scripts/audit-goal.mjs'), '--local-inputs', '--json'], {encoding: 'utf8'});

if (result.error) throw result.error;
if (result.status !== 0) {
  process.stderr.write(result.stderr || 'local goal audit failed\n');
  process.exitCode = result.status || 1;
} else {
  let report;
  try {
    report = JSON.parse(result.stdout.trim());
  } catch {
    throw new Error('local goal audit did not return JSON');
  }
  if (report.goalStatus !== 'ACTIVE' || !report.goalId || report.localInputAudit?.enabled !== true) {
    throw new Error('local goal audit is missing the active goal or local input packet');
  }
  mkdirSync(dirname(destination), {recursive: true});
  writeFileSync(destination, `${JSON.stringify(report, null, 2)}\n`);
  const localChecks = Array.isArray(report.checks) ? report.checks.filter(item => item.id.startsWith('local-')) : [];
  const localAuditFailed = localChecks.some(item => item.status === 'INVALID') || report.overallStatus === 'IN_PROGRESS_WITH_ERRORS';
  console.log(JSON.stringify({
    destination,
    goalId: report.goalId,
    overallStatus: report.overallStatus,
    localChecks: localChecks.map(item => ({id: item.id, status: item.status})),
    auditFailed: localAuditFailed,
    privacyBoundary: 'private_tmp_only',
    publicExportChanged: false,
  }));
  if (localAuditFailed) process.exitCode = 1;
}
