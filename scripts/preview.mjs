import {existsSync} from 'node:fs';
import {spawn} from 'node:child_process';
import {resolve} from 'node:path';
import {findLocalApiPort, isLocalPortAvailable, localApiMatches, sourceLedgerRevision, waitForLocalApi} from './local-api-runtime.mjs';

const root = process.cwd();
const rawRequestedPort = process.env.CELLPINDA_API_PORT?.trim();
const requestedPort = rawRequestedPort ? Number(rawRequestedPort) : 4318;
const viteArgs = process.argv.slice(2).filter(argument => argument !== '--');
const buildIndex = resolve(root, 'dist/index.html');

if (!existsSync(buildIndex)) {
  console.error('미리보기 산출물이 없습니다. 먼저 pnpm run build를 실행해 주세요.');
  process.exit(1);
}

function start(label, command, args, env) {
  const child = spawn(command, args, {cwd: root, stdio: 'inherit', env});
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

async function main() {
  if (!Number.isInteger(requestedPort) || requestedPort < 1 || requestedPort > 65535) {
    throw new Error('CELLPINDA_API_PORT에는 1~65535 사이 포트를 입력해 주세요.');
  }
  const revision = await sourceLedgerRevision(root);
  let apiPort = requestedPort;
  const reusedApi = await localApiMatches(apiPort, revision);

  if (!reusedApi) {
    const available = await isLocalPortAvailable(apiPort);
    if (!available && rawRequestedPort) {
      throw new Error(`지정한 로컬 API 포트 ${apiPort}가 사용 중이며 현재 원장과 일치하지 않습니다.`);
    }
    if (!available) apiPort = await findLocalApiPort(apiPort + 1);
    apiChild = start('로컬 API', process.execPath, [resolve(root, 'server/index.mjs')], {
      ...process.env,
      CELLPINDA_API_PORT: String(apiPort),
    });
    apiChild.on('close', code => {
      if (!stopping) stop(code ?? 1);
    });
    if (!(await waitForLocalApi(apiPort, revision, apiChild))) {
      throw new Error(`현재 원장과 일치하는 로컬 API가 ${apiPort} 포트에서 준비되지 않았습니다.`);
    }
  }

  previewChild = start('Vite 미리보기', process.execPath, [
    resolve(root, 'node_modules/vite/bin/vite.js'),
    'preview',
    '--host', '127.0.0.1',
    '--strictPort',
    ...viteArgs,
  ], {
    ...process.env,
    CELLPINDA_API_TARGET: `http://127.0.0.1:${apiPort}`,
  });

  console.log(JSON.stringify({event: 'local-preview-start', api: reusedApi ? 'reused-matching-ledger' : 'started', apiPort, ledgerRevision: revision, privacyBoundary: 'private_local_only'}));
  previewChild.on('close', code => stop(code ?? 0));
  process.once('SIGINT', () => stop(0));
  process.once('SIGTERM', () => stop(0));
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  stop(1);
});
