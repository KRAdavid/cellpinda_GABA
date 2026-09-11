import {readFile} from 'node:fs/promises';

const ledger = JSON.parse(await readFile(new URL('../data/content-ledger.json', import.meta.url), 'utf8'));
const researchLibrary = await readFile(new URL('../src/components/ResearchLibrary.tsx', import.meta.url), 'utf8');
const reviewExperience = await readFile(new URL('../src/components/ReviewExperience.tsx', import.meta.url), 'utf8');
const fail = message => { throw new Error(`Research consumer copy invalid: ${message}`); };
const research = ledger.claims.filter(claim => claim.status === 'approved' && claim.id.startsWith('research-'));
if (research.length === 0) fail('at least one approved research claim is required');

const unsafe = /치료|완치|진단|결핍|예방|효과\s*보장|권장량|먹으면\s*개선|개선.*보장|직접\s*(먹어|경험)|가바\s*(경험|섭취를\s*시작)/;
const discouragedMarketing = /뚜렷한\s*차이는\s*확인되지|유의한\s*차이는\s*확인되지|개선이\s*확인된\s*것은\s*아닙니다|제한적(?:인)?\s*근거|매우\s*제한적|연구\s*간\s*결과가\s*일치하지|정량\s*메타분석.*수행하지|결과를\s*한\s*문장으로\s*묶기\s*어려|중증\s*수면질환|수면이\s*좋지\s*않|이상사례|유의하지\s*않/;
for (const claim of research) {
  const metadata = claim.metadata ?? {};
  if (typeof claim.publicText !== 'string' || claim.publicText.trim().length < 30) fail(`${claim.id}.publicText must be a consumer-ready summary`);
  if (discouragedMarketing.test(claim.publicText)) fail(`${claim.id}.publicText contains a discouraged negative marketing phrase`);
  for (const field of ['consumerScope', 'consumerSummary', 'hopefulTakeaway', 'productApplicability']) {
    const value = metadata[field];
    if (typeof value !== 'string' || value.trim().length < 30) fail(`${claim.id}.${field} must be a consumer-ready sentence`);
    if (unsafe.test(value)) fail(`${claim.id}.${field} contains an unsupported promise or medical expression`);
    if (discouragedMarketing.test(value)) fail(`${claim.id}.${field} contains a discouraged negative marketing phrase`);
    if (field === 'hopefulTakeaway' && !/(표시사항|루틴|살펴보|확인해|선택해)/.test(value)) fail(`${claim.id}.hopefulTakeaway must name a check or choice action`);
  }
}

const detailBlock = researchLibrary.indexOf('<details className="research-detail"');
const productLink = researchLibrary.indexOf('className="button outline" href="#products"');
if (detailBlock < 0 || productLink < detailBlock) fail('product information link must follow research conditions and observed changes');
if (!researchLibrary.slice(productLink, productLink + 220).includes('셀핀다 제품 구성 확인')) fail('product information link must lead to product composition and label details');
if (researchLibrary.includes('metadata.result') || researchLibrary.includes('metadata.limitations')) fail('consumer research UI must not render internal result or limitation fields');
if (researchLibrary.includes('숫자와 출처 더 확인하기')) fail('consumer research UI must use the conditions-and-source label');
if (/전체\s*구매자의\s*경험|제품\s*효과를\s*입증하는\s*연구\s*자료는\s*아니/.test(reviewExperience)) fail('consumer review UI must use context-first copy');

console.log(JSON.stringify({approvedResearch: research.length, fields: ['consumerScope', 'consumerSummary', 'hopefulTakeaway', 'productApplicability'], detailFields: ['result', 'limitations'], flowGuard: 'research-context-before-section-product-link', status: 'ok'}));
