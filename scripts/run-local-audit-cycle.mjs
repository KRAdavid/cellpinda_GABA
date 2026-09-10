import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
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
  let previousLocalSnapshotHash = null;
  try {
    const previous = JSON.parse(readFileSync(destination, 'utf8'));
    previousLocalSnapshotHash = typeof previous.localSnapshotHash === 'string' ? previous.localSnapshotHash : null;
  } catch (error) {
    if (error?.code !== 'ENOENT') throw new Error('existing local goal audit snapshot is invalid');
  }
  const localSnapshotHash = createHash('sha256').update(JSON.stringify({
    localInputAudit: report.localInputAudit,
    checks: (report.checks || []).filter(item => item.id === 'local-material-inputs' || item.id === 'local-order-inputs').map(item => ({id: item.id, status: item.status, detail: item.detail, blockers: item.blockers})),
  })).digest('hex');
  report.localSnapshotHash = localSnapshotHash;
  report.previousLocalSnapshotHash = previousLocalSnapshotHash;
  report.localStateChanged = Boolean(previousLocalSnapshotHash && previousLocalSnapshotHash !== localSnapshotHash);
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
    localStateChanged: report.localStateChanged,
    localSnapshotHash: report.localSnapshotHash,
    publicExportChanged: false,
  }));
  if (localAuditFailed) process.exitCode = 1;
}
