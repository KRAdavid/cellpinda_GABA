import {mkdir, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const root = process.cwd();
const tmpDirectory = resolve(root, 'tmp');
const pulsePath = resolve(tmpDirectory, 'tf-pulse.json');
const safeRunPath = resolve(tmpDirectory, 'tf-safe-run.json');
const validationPath = resolve(tmpDirectory, 'tf-safe-run-validation.json');

await mkdir(tmpDirectory, {recursive: true});

function run(script, args = []) {
  return spawnSync(process.execPath, [resolve(root, script), ...args], {
    cwd: root,
    encoding: 'utf8',
  });
}

function scrub(value) {
  return String(value || '')
    .replaceAll(root, '<workspace>')
    .replaceAll(root.replaceAll('\\', '\\\\'), '<workspace>')
    .trim();
}

const pulse = run('scripts/tf-pulse.mjs', ['--json']);
if (pulse.status !== 0) {
  console.error(scrub(pulse.stderr || pulse.stdout || 'TF pulse generation failed'));
  process.exit(1);
}
await writeFile(pulsePath, `${pulse.stdout.trim()}\n`);

const safeRun = run('scripts/run-safe-tf-actions.mjs', ['tmp/tf-pulse.json', '--out', 'tmp/tf-safe-run.json']);
if (safeRun.status !== 0) {
  console.error(scrub(safeRun.stderr || safeRun.stdout || 'Safe TF run failed'));
  process.exit(1);
}

const validation = run('scripts/validate-safe-tf-run.mjs', ['tmp/tf-safe-run.json', 'tmp/tf-pulse.json']);
await writeFile(validationPath, `${(validation.stdout || validation.stderr || '').trim()}\n`);
if (validation.status !== 0) {
  console.error(scrub(validation.stderr || validation.stdout || 'Safe TF validation failed'));
  process.exit(1);
}

let validationSummary = null;
try {
  validationSummary = JSON.parse(validation.stdout.trim().split(/\r?\n/).at(-1) || '{}');
} catch {
  validationSummary = {status: 'ok'};
}

console.log(JSON.stringify({
  status: 'MET',
  pulse: 'tmp/tf-pulse.json',
  safeRun: 'tmp/tf-safe-run.json',
  validation: 'tmp/tf-safe-run-validation.json',
  ...validationSummary,
}, null, 2));
