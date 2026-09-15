import {writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const outputIndex = args.indexOf('--out');
const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : null;
const base = process.env.PUBLIC_SITE_URL || 'https://kradavid.github.io/cellpinda_GABA';

const run = (script, scriptArgs = []) => {
  const result = spawnSync(process.execPath, [resolve(root, script), ...scriptArgs], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
  });
  return {
    ok: result.status === 0,
    output: result.stdout?.trim() || '',
    error: result.stderr?.trim() || '',
    exitCode: result.status,
  };
};

const parseJson = value => {
  try { return JSON.parse(value); } catch { return null; }
};
const scrub = value => String(value || '').replaceAll(root, '<workspace>').slice(-2400);

const syncRun = run('scripts/sync-public-data.mjs');
const auditRun = run('scripts/audit-goal.mjs', ['--json']);
const pulseRun = run('scripts/tf-pulse.mjs', ['--json']);
const liveRun = run('scripts/validate-live-public.mjs', [base]);
const audit = parseJson(auditRun.output);
const pulse = parseJson(pulseRun.output);
const live = parseJson(liveRun.output);

const report = {
  schemaVersion: 1,
  mode: 'daily_status_report',
  generatedAt: new Date().toISOString(),
  timezone: 'Asia/Seoul',
  base,
  goalId: audit?.goalId || pulse?.goalId || null,
  goalStatus: audit?.goalStatus || pulse?.goalStatus || 'UNKNOWN',
  overallStatus: audit?.overallStatus || 'UNKNOWN',
  coreValid: audit?.coreValid === true,
  taskCounts: audit?.taskCounts || pulse?.counts || {},
  pulseHealth: audit?.pulseHealth || null,
  continuation: pulse?.continuation || null,
  nextActions: audit?.nextActions || [],
  live: {
    status: liveRun.ok ? 'HEALTHY' : 'FAILED',
    page: live?.page ?? null,
    claims: live?.claims ?? null,
    masterRecords: live?.masterRecords ?? null,
    products: live?.products ?? null,
    smartStoreOnly: live?.smartStoreOnly ?? null,
    removed750: live?.removed750 ?? null,
    provenance: live?.provenance ?? null,
    error: liveRun.ok ? null : scrub(liveRun.error || liveRun.output),
  },
  checks: {
    publicDataSync: syncRun.ok ? 'MET' : 'FAILED',
    goalAudit: auditRun.ok ? 'MET' : 'FAILED',
    tfPulse: pulseRun.ok ? 'MET' : 'FAILED',
    livePublic: liveRun.ok ? 'MET' : 'FAILED',
  },
  executionBoundary: {
    externalEffects: false,
    note: '목표·공개 사이트 상태를 읽어 보고서로 기록하며 제품·광고·주문·외부 게시 상태는 변경하지 않습니다.',
  },
};

if (outputPath) await writeFile(resolve(root, outputPath), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

if (!syncRun.ok || !auditRun.ok || !pulseRun.ok || !liveRun.ok) process.exitCode = 1;
