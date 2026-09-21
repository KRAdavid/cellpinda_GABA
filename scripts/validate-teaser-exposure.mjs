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
if (JSON.stringify(manifest.events) !== JSON.stringify(['teaser_impression', 'teaser_embed_loaded', 'teaser_external_opened'])) fail('teaser events must describe only observable actions available to the parent page');
const teaserComponent = await readFile(resolve(root, 'src/components/TeaserPreview.tsx'), 'utf8');
if (!teaserComponent.includes("onEvent?.('teaser_embed_loaded'") || !teaserComponent.includes("onEvent?.('teaser_external_opened'") || teaserComponent.includes("onEvent?.('teaser_play'")) fail('teaser playback metrics must not confuse iframe loading with actual video playback');
const serverStore = await readFile(resolve(root, 'server/store.mjs'), 'utf8');
const workerStore = await readFile(resolve(root, 'worker/store.ts'), 'utf8');
for (const event of manifest.events) {
  if (!serverStore.includes(`'${event}'`)) fail(`Node event allowlist is missing ${event}`);
  if (!workerStore.includes(`'${event}'`)) fail(`Worker event allowlist is missing ${event}`);
}

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
  if (!Array.isArray(manifest.approvalEvidence) || manifest.approvalEvidence.length !== manifest.requiredApprovals.length) fail('APPROVED teaser needs one evidence record for every approval item');
  const evidenceItems = new Set();
  for (const evidence of manifest.approvalEvidence) {
    if (!evidence || typeof evidence.item !== 'string' || !manifest.requiredApprovals.includes(evidence.item) || evidenceItems.has(evidence.item)) fail('APPROVED teaser approval evidence items must be unique and drawn from the checklist');
    if (typeof evidence.reviewer !== 'string' || evidence.reviewer.trim().length < 2) fail('APPROVED teaser approval evidence needs a reviewer');
    if (!/^\d{4}-\d{2}-\d{2}T/.test(evidence.approvedAt) || Number.isNaN(Date.parse(evidence.approvedAt))) fail('APPROVED teaser approval evidence needs a valid approval timestamp');
    if (!/^[a-f0-9]{64}$/.test(evidence.evidenceHash || '')) fail('APPROVED teaser approval evidence needs a SHA-256 evidence hash');
    if (typeof evidence.scope !== 'string' || evidence.scope.trim().length < 4) fail('APPROVED teaser approval evidence needs an approval scope');
    evidenceItems.add(evidence.item);
  }
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
