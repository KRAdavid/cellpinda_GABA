import assert from 'node:assert/strict';
import test from 'node:test';
import { countLocalPathMatches } from './audit-history-privacy.mjs';

test('detects Windows paths with literal and JSON-escaped separators without exposing values', () => {
  const backslash = String.fromCharCode(92);
  const windowsPath = ['E:', 'Users', 'qa-user', 'Documents', 'notes.json'].join(backslash);
  const jsonEscapedPath = JSON.stringify(windowsPath);

  assert.equal(countLocalPathMatches(`${windowsPath}\n${jsonEscapedPath}`), 2);
});

test('detects common Unix home, root, macOS user, and temporary paths', () => {
  const slash = String.fromCharCode(47);
  const paths = [
    ['home', 'qa-user', 'project', 'file.txt'],
    ['root', 'project', 'file.txt'],
    ['Users', 'qa-user', 'Desktop', 'file.txt'],
    ['tmp', 'session-123', 'file.txt'],
  ].map(parts => `${slash}${parts.join(slash)}`);
  paths.push(['~', 'qa-user', 'project', 'file.txt'].join(slash));

  assert.equal(countLocalPathMatches(paths.join('\n')), paths.length);
});

test('ignores ordinary public URLs and relative repository paths', () => {
  assert.equal(countLocalPathMatches('https://example.test/catalog/item and data/content-ledger.json'), 0);
});
