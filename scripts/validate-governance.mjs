import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');

const codeowners = await read('.github/CODEOWNERS');
assert.match(codeowners, /^\*\s+@[^\s#]+/m, 'CODEOWNERS must define a repository-wide accountable owner');
assert.doesNotMatch(codeowners, /@(?:example|owner|team|your-)/i, 'CODEOWNERS must not use a placeholder owner');

const expectedPermissions = {
  '.github/workflows/deploy.yml': {contents: 'read'},
  '.github/workflows/verify.yml': {contents: 'read'},
  '.github/workflows/daily-status-report.yml': {contents: 'read', issues: 'write'},
  '.github/workflows/tf-pulse.yml': {contents: 'write', 'pull-requests': 'write'},
};

function permissionBlock(source, path) {
  const match = source.match(/^permissions:\r?\n((?:  [^\r\n]+\r?\n)+)/m);
  assert.ok(match, `${path} must declare workflow permissions explicitly`);
  return Object.fromEntries(match[1].trim().split(/\r?\n/).map(line => {
    const [key, value] = line.trim().split(/:\s*/, 2);
    return [key, value];
  }));
}

for (const [path, expected] of Object.entries(expectedPermissions)) {
  const permissions = permissionBlock(await read(path), path);
  assert.deepEqual(permissions, expected, `${path} permissions must match the reviewed least-privilege contract`);
}

console.log(JSON.stringify({
  status: 'ok',
  codeowners: 'repository-wide owner present',
  workflows: Object.keys(expectedPermissions).length,
  permissions: 'explicit and allowlisted',
}));
