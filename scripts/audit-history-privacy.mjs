import { execFileSync, spawnSync } from 'node:child_process';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const textExtensions = new Set(['.md', '.json', '.jsonc', '.yml', '.yaml', '.txt', '.ts', '.tsx', '.js', '.mjs', '.css', '.html']);

// Match absolute Windows drive paths with either ordinary or JSON-escaped
// separators, plus common Unix user/home/temp locations. Keep matches private:
// callers receive a count only, never the matched text.
const localPathPattern = new RegExp([
  String.raw`(?<![A-Za-z0-9+.-])[A-Z]:[\\/]{1,2}(?:[^\\/\r\n"'<>|]+[\\/]{1,2})*[^\\/\r\n"'<>|]+`,
  String.raw`(?<![A-Za-z0-9_.-])\/(?:Users|home|root|private\/var\/folders|var\/folders|tmp|mnt|media)\/[^\s"'<>|\\]+`,
  String.raw`(?<![A-Za-z0-9_.-])~\/[^\s"'<>|\\]+`,
].join('|'), 'gi');

export function countLocalPathMatches(content) {
  return [...content.matchAll(localPathPattern)].length;
}

export function auditHistory() {
  const entries = execFileSync('git', ['rev-list', '--objects', '--all'], { encoding: 'utf8' })
    .split(/\r?\n/)
    .map(line => {
      const splitAt = line.indexOf(' ');
      return splitAt < 0 ? null : { oid: line.slice(0, splitAt), path: line.slice(splitAt + 1) };
    })
    .filter(entry => entry && /^[a-f0-9]{40,64}$/i.test(entry.oid));

  const pathsByObject = new Map();
  for (const entry of entries) {
    if (!textExtensions.has(extname(entry.path).toLowerCase())) continue;
    const paths = pathsByObject.get(entry.oid) ?? new Set();
    paths.add(entry.path);
    pathsByObject.set(entry.oid, paths);
  }

  const objectIds = [...pathsByObject.keys()];
  const batch = spawnSync('git', ['cat-file', '--batch'], {
    input: Buffer.from(`${objectIds.join('\n')}\n`),
    maxBuffer: 512 * 1024 * 1024,
  });
  if (batch.error) throw batch.error;
  if (batch.status !== 0) throw new Error('Unable to inspect reachable Git objects.');

  const findingsByPath = new Map();
  let offset = 0;
  while (offset < batch.stdout.length) {
    const headerEnd = batch.stdout.indexOf(0x0a, offset);
    if (headerEnd < 0) throw new Error('Malformed Git object batch header.');
    const header = batch.stdout.toString('utf8', offset, headerEnd);
    offset = headerEnd + 1;
    const parsed = /^([a-f0-9]{40,64}) blob (\d+)$/i.exec(header);
    if (!parsed) throw new Error('Unexpected Git object in history scan.');
    const oid = parsed[1];
    const size = Number(parsed[2]);
    const content = batch.stdout.toString('utf8', offset, offset + size);
    offset += size + 1;
    const matches = countLocalPathMatches(content);
    if (!matches) continue;

    const paths = [...(pathsByObject.get(oid) ?? [])];
    const history = execFileSync('git', ['log', '--all', '--format=%H', `--find-object=${oid}`], { encoding: 'utf8' }).trim().split(/\r?\n/);
    const commit = history.at(-1) || 'unknown';
    for (const path of paths) {
      const finding = findingsByPath.get(path) ?? { path, commit, blobs: 0, matches: 0 };
      finding.blobs += 1;
      finding.matches += matches;
      findingsByPath.set(path, finding);
    }
  }

  const findings = [...findingsByPath.values()];
  if (findings.length) {
    console.warn(`::warning title=Historical privacy review::${findings.length} reachable repository paths contain local-path patterns in prior revisions. The scanner intentionally omits matched values.`);
    for (const finding of findings) {
      console.warn(` - ${finding.commit} ${finding.path} (${finding.blobs} historical version${finding.blobs === 1 ? '' : 's'}, ${finding.matches} matches)`);
    }
    console.log('History scan is advisory: remove current copies and coordinate any history rewrite before publishing a clean repository history.');
  } else {
    console.log(`Historical privacy scan passed (${objectIds.length} reachable text blobs checked).`);
  }
  return findings;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  auditHistory();
}
