import {readFile} from 'node:fs/promises';

const ledger = JSON.parse(await readFile(new URL('../data/content-ledger.json', import.meta.url), 'utf8'));
const fail = message => { throw new Error(`Research consumer copy invalid: ${message}`); };
const research = ledger.claims.filter(claim => claim.status === 'approved' && claim.id.startsWith('research-'));
if (research.length === 0) fail('at least one approved research claim is required');

const unsafe = /치료|완치|진단|결핍|예방|효과\s*보장|권장량|먹으면\s*개선|개선.*보장|직접\s*(먹어|경험)|가바\s*(경험|섭취를\s*시작)/;
for (const claim of research) {
  const metadata = claim.metadata ?? {};
  for (const field of ['consumerSummary', 'hopefulTakeaway']) {
    const value = metadata[field];
    if (typeof value !== 'string' || value.trim().length < 30) fail(`${claim.id}.${field} must be a consumer-ready sentence`);
    if (unsafe.test(value)) fail(`${claim.id}.${field} contains an unsupported promise or medical expression`);
  }
}

console.log(JSON.stringify({approvedResearch: research.length, fields: ['consumerSummary', 'hopefulTakeaway'], status: 'ok'}));
