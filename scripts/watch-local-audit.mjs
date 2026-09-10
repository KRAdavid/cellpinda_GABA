import {spawn} from 'node:child_process';
import {existsSync, watch} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const root = process.cwd();
const readManifest = async name => JSON.parse(await readFile(resolve(root, `data/${name}`), 'utf8'));
const [materialManifest, orderManifest] = await Promise.all([
  readManifest('local-material-manifest.json'),
  readManifest('local-order-manifest.json'),
]);

const configuredRoots = (environmentName, fallback) => process.env[environmentName]
  ? process.env[environmentName].split(';').map(value => value.trim()).filter(Boolean)
  : fallback;
const roots = [...new Set([
  ...configuredRoots('CELLPINDA_MATERIAL_ROOTS', materialManifest.sourceRoots),
  ...configuredRoots('CELLPINDA_ORDER_ROOTS', orderManifest.sourceRoots),
].map(value => resolve(value)))];
const existingRoots = roots.filter(directory => existsSync(directory));
if (!existingRoots.length) {
  throw new Error('감시할 로컬 자료 폴더가 없습니다. CELLPINDA_MATERIAL_ROOTS 또는 CELLPINDA_ORDER_ROOTS를 확인하세요.');
}

let running = false;
let queued = false;
let timer;

function runAudit(reason) {
  if (running) {
    queued = true;
    return Promise.resolve();
  }
  running = true;
  console.log(JSON.stringify({event: 'local-audit-start', reason, privacyBoundary: 'private_tmp_only'}));
  return new Promise(resolveRun => {
    const child = spawn(process.execPath, [resolve(root, 'scripts/run-local-audit-cycle.mjs')], {stdio: 'inherit'});
    child.on('error', error => {
      console.error(`로컬 감사 실행 실패: ${error.message}`);
      running = false;
      resolveRun();
    });
    child.on('close', code => {
      running = false;
      if (code !== 0) console.error(`로컬 감사가 종료 코드 ${code}로 끝났습니다. 다음 변경 때 다시 시도합니다.`);
      if (queued) {
        queued = false;
        scheduleAudit('감사 중 수신된 변경');
      }
      resolveRun();
    });
  });
}

function scheduleAudit(reason) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = undefined;
    void runAudit(reason);
  }, 750);
}

await runAudit('initial');
const watchers = existingRoots.map(directory => {
  let watcher;
  try {
    watcher = watch(directory, {recursive: true}, (_event, filename) => {
      if (filename) scheduleAudit(`변경 감지: ${String(filename)}`);
    });
  } catch (error) {
    console.warn(`하위 폴더 감시를 사용할 수 없어 상위 폴더만 감시합니다: ${directory}`);
    watcher = watch(directory, (_event, filename) => {
      if (filename) scheduleAudit(`변경 감지: ${String(filename)}`);
    });
    if (error instanceof Error) console.warn(error.message);
  }
  watcher.on('error', error => console.error(`감시 오류(${directory}): ${error.message}`));
  return watcher;
});

console.log(JSON.stringify({
  event: 'local-audit-watching',
  roots: existingRoots,
  interval: 'filesystem-events+750ms-debounce',
  destination: resolve(root, 'tmp/local-goal-audit.json'),
  publicExportChanged: false,
  privacyBoundary: 'private_tmp_only',
}));

function stop(signal) {
  if (timer) clearTimeout(timer);
  for (const watcher of watchers) watcher.close();
  console.log(JSON.stringify({event: 'local-audit-stopped', signal}));
  process.exitCode = 0;
}
process.once('SIGINT', () => stop('SIGINT'));
process.once('SIGTERM', () => stop('SIGTERM'));
