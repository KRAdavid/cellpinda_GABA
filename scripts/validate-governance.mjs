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
  '.github/workflows/daily-status-report.yml': {contents: 'read', actions: 'read', issues: 'write'},
  '.github/workflows/tf-pulse.yml': {contents: 'read', 'pull-requests': 'read'},
};

function permissionBlock(source, path) {
  const match = source.match(/^permissions:\r?\n((?:  [^\r\n]+\r?\n)+)/m);
  assert.ok(match, `${path} must declare workflow permissions explicitly`);
  return Object.fromEntries(match[1].trim().split(/\r?\n/).filter(line => !line.trim().startsWith('#')).map(line => {
    const [key, value] = line.trim().split(/:\s*/, 2);
    return [key, value];
  }));
}

for (const [path, expected] of Object.entries(expectedPermissions)) {
  const permissions = permissionBlock(await read(path), path);
  assert.deepEqual(permissions, expected, `${path} permissions must match the reviewed least-privilege contract`);
}

const pulseWorkflow = await read('.github/workflows/tf-pulse.yml');
assert.match(pulseWorkflow, /persist-heartbeat:\s*\r?\n\s+if:\s*github\.event_name == 'schedule' && github\.ref == 'refs\/heads\/main'/, 'tf-pulse heartbeat writer must be schedule/main-only');
assert.match(pulseWorkflow, /persist-heartbeat:[\s\S]*?\r?\n\s+permissions:\s*\r?\n\s+contents:\s*write\s*\r?\n\s+pull-requests:\s*write/, 'tf-pulse write permissions must be scoped to the guarded heartbeat job');
assert.match(pulseWorkflow, /pulse:\s*\r?\n\s+permissions:\s*\r?\n\s+contents:\s*read\s*\r?\n\s+pull-requests:\s*read/, 'tf-pulse candidate job must remain read-only');

console.log(JSON.stringify({
  status: 'ok',
  codeowners: 'repository-wide owner present',
  workflows: Object.keys(expectedPermissions).length,
  permissions: 'explicit and allowlisted',
}));
