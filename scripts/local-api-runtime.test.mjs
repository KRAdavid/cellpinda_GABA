import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {test} from 'node:test';
import {findLocalApiPort, localApiMatches, sourceLedgerRevision} from './local-api-runtime.mjs';

test('local API port selection skips an occupied port', async () => {
  const occupied = createServer();
  await new Promise((resolve, reject) => {
    occupied.once('error', reject);
    occupied.listen(0, '127.0.0.1', resolve);
  });
  try {
    const address = occupied.address();
    assert.ok(address && typeof address === 'object');
    const selected = await findLocalApiPort(address.port, 3);
    assert.notEqual(selected, address.port);
  } finally {
    await new Promise(resolve => occupied.close(resolve));
  }
});

test('a local API is reusable only when its source revision matches', async () => {
  const revision = 'a'.repeat(64);
  const server = createServer((request, response) => {
    response.writeHead(200, {'content-type': 'application/json'});
    response.end(JSON.stringify({ok: true, sourceRevision: revision}));
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  try {
    const address = server.address();
    assert.ok(address && typeof address === 'object');
    assert.equal(await localApiMatches(address.port, revision), true);
    assert.equal(await localApiMatches(address.port, 'b'.repeat(64)), false);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});

test('the source ledger revision is an opaque SHA-256 fingerprint', async () => {
  assert.match(await sourceLedgerRevision(), /^[0-9a-f]{64}$/);
});

