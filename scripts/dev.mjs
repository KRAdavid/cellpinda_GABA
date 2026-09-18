import {spawn} from 'node:child_process';
import {resolve} from 'node:path';
import {findLocalApiPort, isLocalPortAvailable, localApiMatches, sourceLedgerRevision, waitForLocalApi} from './local-api-runtime.mjs';

const root = process.cwd();
const children = [];
let stopping = false;
const viteArgs = process.argv.slice(2).filter((argument, index) => !(index === 0 && argument === '--'));
const rawRequestedPort = process.env.CELLPINDA_API_PORT?.trim();
const requestedPort = rawRequestedPort ? Number(rawRequestedPort) : 4318;

const start = (label, command, args, env) => {
  const child = spawn(command, args, {cwd: root, stdio: 'inherit', env});
  children.push({label, child});
  child.on('error', error => {
    if (!stopping) console.error(`${label} 시작 실패: ${error.message}`);
  });
  return child;
};

const stop = code => {
  if (stopping) return;
  stopping = true;
  for (const {child} of children) {
    if (child.exitCode === null && !child.killed) child.kill('SIGTERM');
  }
  process.exitCode = code;
};

async function main() {
  if (!Number.isInteger(requestedPort) || requestedPort < 1 || requestedPort > 65535) {
    throw new Error('CELLPINDA_API_PORT에는 1~65535 사이 포트를 입력해 주세요.');
  }
  const revision = await sourceLedgerRevision(root);
  let apiPort = requestedPort;
  let reusedApi = await localApiMatches(apiPort, revision);
  let api;

  if (!reusedApi) {
    const available = await isLocalPortAvailable(apiPort);
    if (!available && rawRequestedPort) {
      throw new Error(`지정한 로컬 API 포트 ${apiPort}가 사용 중이며 현재 원장과 일치하지 않습니다.`);
    }
    if (!available) apiPort = await findLocalApiPort(apiPort + 1);
    api = start('로컬 API', process.execPath, [resolve(root, 'server/index.mjs')], {
      ...process.env,
      CELLPINDA_API_PORT: String(apiPort),
    });
    children[children.length - 1].child.on('close', code => {
      if (!stopping && code !== 0) stop(code ?? 1);
    });
    if (!(await waitForLocalApi(apiPort, revision, api))) {
      throw new Error(`현재 원장과 일치하는 로컬 API가 ${apiPort} 포트에서 준비되지 않았습니다.`);
    }
  }

  const vite = start('Vite', process.execPath, [resolve(root, 'node_modules/vite/bin/vite.js'), '--host', '127.0.0.1', ...viteArgs], {
    ...process.env,
    CELLPINDA_API_TARGET: `http://127.0.0.1:${apiPort}`,
  });
  vite.on('close', code => stop(code ?? 0));
  process.once('SIGINT', () => stop(0));
  process.once('SIGTERM', () => stop(0));

  console.log(JSON.stringify({event: 'local-dev-start', services: ['api+local-audit-watcher', 'vite'], api: reusedApi ? 'reused-matching-ledger' : 'started', apiPort, ledgerRevision: revision, privacyBoundary: 'private_local_only'}));
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  stop(1);
});
