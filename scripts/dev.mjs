import {spawn} from 'node:child_process';
import {resolve} from 'node:path';

const root = process.cwd();
const children = [];
let stopping = false;
const viteArgs = process.argv.slice(2).filter((argument, index) => !(index === 0 && argument === '--'));

const start = (label, command, args) => {
  const child = spawn(command, args, {cwd: root, stdio: 'inherit', env: process.env});
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
    if (!child.killed) child.kill('SIGTERM');
  }
  process.exitCode = code;
};

const api = start('로컬 API', process.execPath, [resolve(root, 'server/index.mjs')]);
api.on('close', code => {
  if (!stopping && code && code !== 0) {
    console.warn(`로컬 API가 코드 ${code}로 종료되었습니다. 이미 실행 중인 API가 있으면 Vite는 계속 실행합니다.`);
  }
});

const vite = start('Vite', process.execPath, [resolve(root, 'node_modules/vite/bin/vite.js'), '--host', '127.0.0.1', ...viteArgs]);
vite.on('close', code => stop(code ?? 0));

process.once('SIGINT', () => stop(0));
process.once('SIGTERM', () => stop(0));

console.log(JSON.stringify({event: 'local-dev-start', services: ['api+local-audit-watcher', 'vite'], apiPort: Number.parseInt(process.env.CELLPINDA_API_PORT || '4318', 10), privacyBoundary: 'private_local_only'}));
