import {existsSync} from 'node:fs';
import {spawn} from 'node:child_process';
import {resolve} from 'node:path';

const root = process.cwd();
const apiPortValue = Number.parseInt(process.env.CELLPINDA_API_PORT || '4318', 10);
const apiPort = Number.isInteger(apiPortValue) && apiPortValue > 0 && apiPortValue < 65536 ? apiPortValue : 4318;
const apiHealthUrl = `http://127.0.0.1:${apiPort}/api/health`;
const viteArgs = process.argv.slice(2).filter(argument => argument !== '--');
const buildIndex = resolve(root, 'dist/index.html');

if (!existsSync(buildIndex)) {
  console.error('미리보기 산출물이 없습니다. 먼저 pnpm run build를 실행해 주세요.');
  process.exit(1);
}

async function apiIsReady() {
  try {
    const response = await fetch(apiHealthUrl, {signal: AbortSignal.timeout(500)});
    return response.ok;
  } catch {
    return false;
  }
}

function start(label, command, args) {
  const child = spawn(command, args, {cwd: root, stdio: 'inherit', env: process.env});
  child.on('error', error => console.error(`${label} 시작 실패: ${error.message}`));
  return child;
}

let apiChild;
let previewChild;
let stopping = false;

function stop(code) {
  if (stopping) return;
  stopping = true;
  for (const child of [previewChild, apiChild]) {
    if (child && child.exitCode === null && !child.killed) child.kill('SIGTERM');
  }
  process.exitCode = code;
}

try {
  const reusedApi = await apiIsReady();
  if (!reusedApi) {
    apiChild = start('로컬 API', process.execPath, [resolve(root, 'server/index.mjs')]);
    const readyDeadline = Date.now() + 10_000;
    while (Date.now() < readyDeadline && !(await apiIsReady())) {
      if (apiChild.exitCode !== null) throw new Error(`로컬 API가 코드 ${apiChild.exitCode}로 종료되었습니다.`);
      await new Promise(resolveDelay => setTimeout(resolveDelay, 250));
    }
    if (!(await apiIsReady())) throw new Error(`로컬 API가 ${apiPort} 포트에서 준비되지 않았습니다.`);
  }

  console.log(JSON.stringify({event: 'local-preview-start', api: reusedApi ? 'reused' : 'started', apiPort, privacyBoundary: 'private_local_only'}));
  previewChild = start('Vite 미리보기', process.execPath, [
    resolve(root, 'node_modules/vite/bin/vite.js'),
    'preview',
    '--host', '127.0.0.1',
    '--strictPort',
    ...viteArgs,
  ]);

  previewChild.on('close', code => stop(code ?? 0));
  apiChild?.on('close', code => {
    if (!stopping && code !== 0) stop(code ?? 1);
  });
  process.once('SIGINT', () => stop(0));
  process.once('SIGTERM', () => stop(0));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  stop(1);
}
