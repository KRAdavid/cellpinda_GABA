import {readFile} from 'node:fs/promises';

const ledger = JSON.parse(await readFile(new URL('../data/content-ledger.json', import.meta.url), 'utf8'));
const researchLibrary = await readFile(new URL('../src/components/ResearchLibrary.tsx', import.meta.url), 'utf8');
const fail = message => { throw new Error(`Research consumer copy invalid: ${message}`); };
const research = ledger.claims.filter(claim => claim.status === 'approved' && claim.id.startsWith('research-'));
if (research.length === 0) fail('at least one approved research claim is required');

const unsafe = /치료|완치|진단|결핍|예방|효과\s*보장|권장량|먹으면\s*개선|개선.*보장|직접\s*(먹어|경험)|가바\s*(경험|섭취를\s*시작)/;
const discouragedMarketing = /뚜렷한\s*차이는\s*확인되지|유의한\s*차이는\s*확인되지|개선이\s*확인된\s*것은\s*아닙니다|제한적(?:인)?\s*근거|매우\s*제한적|연구\s*간\s*결과가\s*일치하지|정량\s*메타분석.*수행하지|결과를\s*한\s*문장으로\s*묶기\s*어려/;
for (const claim of research) {
  const metadata = claim.metadata ?? {};
  if (typeof claim.publicText !== 'string' || claim.publicText.trim().length < 30) fail(`${claim.id}.publicText must be a consumer-ready summary`);
  if (discouragedMarketing.test(claim.publicText)) fail(`${claim.id}.publicText contains a discouraged negative marketing phrase`);
  for (const field of ['consumerScope', 'consumerSummary', 'hopefulTakeaway', 'productApplicability']) {
    const value = metadata[field];
    if (typeof value !== 'string' || value.trim().length < 30) fail(`${claim.id}.${field} must be a consumer-ready sentence`);
    if (unsafe.test(value)) fail(`${claim.id}.${field} contains an unsupported promise or medical expression`);
    if (discouragedMarketing.test(value)) fail(`${claim.id}.${field} contains a discouraged negative marketing phrase`);
    if (field === 'hopefulTakeaway' && !/(제품|가바\s*1500)/.test(value)) fail(`${claim.id}.hopefulTakeaway must connect to product discovery without making a promise`);
    if (field === 'hopefulTakeaway' && !/(표시사항|루틴|살펴보|확인해|선택해)/.test(value)) fail(`${claim.id}.hopefulTakeaway must name a check or choice action`);
  }
}

const detailBlock = researchLibrary.indexOf('<details className="research-detail"');
const productLink = researchLibrary.indexOf('className="text-link research-try-link"');
if (detailBlock < 0 || productLink < detailBlock) fail('product information link must follow research conditions and observed changes');
if (!researchLibrary.slice(productLink, productLink + 180).includes('제품 구성·표시사항')) fail('product information link must lead to product composition and label details');

console.log(JSON.stringify({approvedResearch: research.length, fields: ['consumerScope', 'consumerSummary', 'hopefulTakeaway', 'productApplicability'], detailFields: ['result', 'limitations'], flowGuard: 'research-context-before-product-link', status: 'ok'}));
