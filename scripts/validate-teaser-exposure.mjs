import {readFile, readdir} from 'node:fs/promises';
import {join, resolve} from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(await readFile(resolve(root, 'data/teaser-manifest.json'), 'utf8'));
const fail = message => { throw new Error(`Teaser exposure invalid: ${message}`); };
if (manifest.schemaVersion !== 1) fail('unsupported manifest schema');
if (manifest.goalId !== 'GL-2026-CELL-GABA-001') fail('teaser is not tied to the active Goal Contract');
if (!['HOLD', 'PREVIEW', 'APPROVED'].includes(manifest.status)) fail('status must be HOLD, PREVIEW or APPROVED');
if (!/^https:\/\//.test(manifest.internalReviewUrl)) fail('internal review URL must be recorded as HTTPS');
if (!Array.isArray(manifest.requiredApprovals) || manifest.requiredApprovals.length < 5) fail('approval checklist is incomplete');
if (!Array.isArray(manifest.events) || manifest.events.length < 5) fail('measurement events are incomplete');

if (manifest.status === 'HOLD') {
  if (manifest.publicMediaUrl !== null) fail('a HOLD teaser cannot expose a public media URL');
  if (manifest.publicPreviewUrl !== undefined && manifest.publicPreviewUrl !== null) fail('a HOLD teaser cannot expose a public preview URL');
} else if (manifest.status === 'PREVIEW') {
  if (manifest.publicMediaUrl !== null) fail('a PREVIEW teaser cannot expose a public media URL');
  let previewUrl;
  try { previewUrl = new URL(manifest.publicPreviewUrl); } catch { fail('PREVIEW teaser needs a public HTTPS preview URL'); }
  if (previewUrl.protocol !== 'https:') fail('PREVIEW teaser preview URL must use HTTPS');
  if (manifest.publicPreviewUrl !== manifest.internalReviewUrl) fail('PREVIEW teaser must point to the reviewed public page');
} else {
  let publicUrl;
  try { publicUrl = new URL(manifest.publicMediaUrl); } catch { fail('APPROVED teaser needs a public HTTPS media URL'); }
  if (publicUrl.protocol !== 'https:') fail('APPROVED teaser media URL must use HTTPS');
  if (!manifest.approvedAt || !manifest.approvedBy) fail('APPROVED teaser needs reviewer and approval date');
}

const internalUrl = manifest.internalReviewUrl;
const sourceRoots = [resolve(root, 'src'), resolve(root, 'public'), resolve(root, 'index.html')];
const previewExport = resolve(root, 'public/data/teaser-preview.json');
const textExtensions = new Set(['.html', '.css', '.js', '.jsx', '.ts', '.tsx', '.json', '.md']);
async function scan(path) {
  let stat;
  try { stat = await (await import('node:fs/promises')).stat(path); } catch { return; }
  if (stat.isDirectory()) {
    for (const name of await readdir(path)) await scan(join(path, name));
    return;
  }
  if (!textExtensions.has(path.slice(path.lastIndexOf('.')))) return;
  const text = await readFile(path, 'utf8');
  const isApprovedPreviewExport = manifest.status === 'PREVIEW' && path === previewExport && manifest.publicPreviewUrl === internalUrl;
  if (text.includes(internalUrl) && !isApprovedPreviewExport) fail(`internal review URL leaked into public source: ${path}`);
}
for (const path of sourceRoots) await scan(path);

console.log(JSON.stringify({status: manifest.status, placement: manifest.placement, publicPreviewUrl: manifest.publicPreviewUrl ?? null, publicMediaUrl: manifest.publicMediaUrl, gateStatus: manifest.status === 'APPROVED' ? 'APPROVED' : 'HOLD', internalUrlExcluded: manifest.status !== 'PREVIEW', approvals: manifest.requiredApprovals.length, events: manifest.events.length}));
