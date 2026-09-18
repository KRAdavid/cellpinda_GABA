import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

const textExtensions = new Set(['.md', '.json', '.jsonc', '.yml', '.yaml', '.txt', '.ts', '.tsx', '.js', '.mjs', '.css', '.html']);
const trackedFiles = execFileSync('git', ['ls-files', '-z']).toString('utf8').split('\0').filter(Boolean);
const localPathPattern = /(?<![A-Za-z0-9+.-])[A-Z]:[\\/](?:Users|Documents and Settings|셀핀다|다운로드)[\\/]|\/Users\/[^/\s]+/i;
const findings = [];

for (const file of trackedFiles) {
  if (!textExtensions.has(extname(file).toLowerCase())) continue;
  const content = readFileSync(file, 'utf8');
  const match = localPathPattern.exec(content);
  if (match) findings.push(`${file}:${content.slice(0, match.index).split(/\r?\n/).length}`);
}

if (findings.length) {
  console.error('Tracked public sources contain an absolute local path. Replace it with a source description, not a machine-specific location.');
  for (const finding of findings) console.error(` - ${finding}`);
  process.exit(1);
}

console.log(`Repository privacy check passed (${trackedFiles.length} tracked files scanned).`);
