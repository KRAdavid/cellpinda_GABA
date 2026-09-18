import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {createServer} from 'node:net';
import {resolve} from 'node:path';

const HOST = '127.0.0.1';

export async function sourceLedgerRevision(root = process.cwd()) {
  const source = await readFile(resolve(root, 'data/content-ledger.json'), 'utf8');
  return createHash('sha256').update(source, 'utf8').digest('hex');
}

export async function isLocalPortAvailable(port) {
  return new Promise(resolveAvailability => {
    const probe = createServer();
    probe.once('error', () => resolveAvailability(false));
    probe.listen(port, HOST, () => probe.close(() => resolveAvailability(true)));
  });
}

export async function findLocalApiPort(preferredPort = 4318, attempts = 128) {
  for (let offset = 0; offset < attempts; offset += 1) {
    const candidate = preferredPort + offset;
    if (candidate > 65535) break;
    if (await isLocalPortAvailable(candidate)) return candidate;
  }
  throw new Error(`로컬 API 포트를 ${preferredPort}부터 ${attempts}개 범위에서 찾지 못했습니다.`);
}

export async function localApiMatches(port, revision) {
  try {
    const response = await fetch(`http://${HOST}:${port}/api/health`, {signal: AbortSignal.timeout(500)});
    if (!response.ok) return false;
    const health = await response.json();
    return health?.ok === true && health?.sourceRevision === revision;
  } catch {
    return false;
  }
}

export async function waitForLocalApi(port, revision, child, timeoutMs = 10_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (child?.exitCode !== null && child?.exitCode !== undefined) {
      throw new Error(`로컬 API가 코드 ${child.exitCode}로 종료되었습니다.`);
    }
    if (await localApiMatches(port, revision)) return true;
    await new Promise(resolveDelay => setTimeout(resolveDelay, 150));
  }
  return false;
}

