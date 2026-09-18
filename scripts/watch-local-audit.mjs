import {spawn} from 'node:child_process';
import {existsSync, watch} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const root = process.cwd();
const readManifest = async (name, environmentName) => {
  const privatePath = resolve(root, process.env[environmentName] || `var/private-audit/${name}`);
  const path = existsSync(privatePath) ? privatePath : resolve(root, `data/${name}`);
  return JSON.parse(await readFile(path, 'utf8'));
};
const [materialManifest, orderManifest] = await Promise.all([
  readManifest('local-material-manifest.json', 'CELLPINDA_MATERIAL_MANIFEST'),
  readManifest('local-order-manifest.json', 'CELLPINDA_ORDER_MANIFEST'),
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
    throw new Error('감시할 로컬 자료 폴더가 없습니다. 비공개 감사 설정 또는 CELLPINDA_*_ROOTS 환경 변수를 확인하세요.');
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
      console.error('로컬 감사 실행에 실패했습니다. 비공개 설정과 로컬 자료 접근 권한을 확인하세요.');
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
      if (filename) scheduleAudit('local-file-change');
    });
  } catch (error) {
    console.warn('하위 폴더 감시를 사용할 수 없어 지정한 폴더만 감시합니다.');
    watcher = watch(directory, (_event, filename) => {
      if (filename) scheduleAudit('local-file-change');
    });
    if (error instanceof Error) console.warn('운영체제에서 하위 폴더 감시를 지원하지 않아 상위 폴더만 감시합니다.');
  }
  watcher.on('error', () => console.error('로컬 폴더 감시에 실패했습니다. 폴더 접근 권한을 확인하세요.'));
  return watcher;
});

console.log(JSON.stringify({
  event: 'local-audit-watching',
  watchedFolders: existingRoots.length,
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
