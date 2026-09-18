import {readFile} from 'node:fs/promises';

const ledger = JSON.parse(await readFile(new URL('../data/content-ledger.json', import.meta.url), 'utf8'));
const consumerSourceFiles = [
  'ResearchLibrary.tsx', 'ReviewExperience.tsx', 'GabaStory.tsx', 'StudyInsightVisual.tsx', 'RhythmExperience.tsx',
  'PurchaseQuestions.tsx', 'ProductShare.tsx', 'SevenDayChallenge.tsx', 'TeaserPreview.tsx', 'BrainLoadEvidence.tsx',
  'FatigueGame.tsx', 'MemberRecords.tsx', 'AnalyticsConsent.tsx',
];
const consumerSources = Object.fromEntries(await Promise.all(consumerSourceFiles.map(async file => [
  file,
  await readFile(new URL(`../src/components/${file}`, import.meta.url), 'utf8'),
])));
const appSource = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const researchLibrary = consumerSources['ResearchLibrary.tsx'];
const purchaseQuestions = consumerSources['PurchaseQuestions.tsx'];
const reviewExperience = consumerSources['ReviewExperience.tsx'];
const gabaStory = consumerSources['GabaStory.tsx'];
const consumerUi = [Object.values(consumerSources).join('\n'), appSource, indexHtml].join('\n');
const fail = message => { throw new Error(`Research consumer copy invalid: ${message}`); };
const research = ledger.claims.filter(claim => claim.status === 'approved' && claim.id.startsWith('research-'));
if (research.length === 0) fail('at least one approved research claim is required');
const yoto = research.find(claim => claim.id === 'research-yoto-2012');
const yotoConsumerData = JSON.stringify({publicText:yoto?.publicText,metadata:yoto?.metadata});
if (!yoto?.publicText?.includes('GABA 캡슐') || !yoto.metadata?.dose?.includes('덱스트린 캡슐') || !yoto.metadata?.consumerVisual?.steps?.[0]?.includes('캡슐') || /음료|마시/.test(yotoConsumerData) || yoto.topic !== '뇌파·과제') fail('Yoto consumer copy must match the capsule study and avoid suggesting a stress-relief outcome');
const heba = research.find(claim => claim.id === 'research-heba-2016');
if (heba?.publicText?.includes('12%') || heba?.metadata?.consumerSummary?.includes('높게 측정') || !heba?.metadata?.consumerVisual?.boundaryLabel?.includes('관계') || !heba?.metadata?.dose?.includes('GABA를 먹지 않고')) fail('Heba study must not frame tactile practice as a GABA intake benefit');
const yoon = research.find(claim => claim.id === 'research-yoon-2022');
if (!yoon?.metadata?.consumerSummary?.includes('54명이 연구를 시작해 50명이 4주를 마쳤어요') || !yoon.metadata.consumerSummary.includes('수면 기록') || yoon.metadata?.consumerFinding || !yoon.metadata?.result?.includes('9.0') || yoon.metadata?.consumerVisual || /짧아졌|줄었|개선|높아졌/.test(yoon.publicText)) fail('Yoon study must remain in the evidence ledger while the consumer view describes its scope without an unsupported efficacy takeaway');
const byun = research.find(claim => claim.id === 'research-byun-2018');
if (!byun?.publicText?.includes('잠드는 데 어려움') || !byun.publicText.includes('GABA가 없는') || !byun.publicText.includes('40명') || byun.metadata?.consumerVisual?.kind !== 'paired-before-after' || byun.metadata.consumerVisual.groups?.length !== 2 || byun.metadata.consumerVisual.groups[0]?.participants !== 30 || byun.metadata.consumerVisual.groups[1]?.participants !== 10 || byun.metadata.consumerVisual.groups[1]?.afterValue !== 15.2 || !byun.metadata.consumerFinding?.includes('13.4분') || !byun.metadata.consumerContext?.includes('30명') || !byun.metadata.productApplicability?.includes('별도 제품')) fail('Byun study must accurately show its selected population, both groups and applicability');
const review = research.find(claim => claim.id === 'research-review-2020');
if (!review?.metadata?.consumerFinding?.includes('2020년 2월까지') || !review.metadata.consumerFinding.includes('14편') || !review.metadata.consumerFinding.includes('제품·양·기간·확인 방법') || /매우 제한|효과가 없|차이가 없|어려웠어요/.test(review.metadata.consumerFinding)) fail('2020 review must explain its date range and varied research conditions without a discouraging verdict');
const powers = research.find(claim => claim.id === 'research-powers-2008');
const powersConsumerData = JSON.stringify({publicText:powers?.publicText,metadata:powers?.metadata});
if (!powers?.metadata?.consumerSummary?.includes('성장호르몬 수치') || !powers.metadata?.dose?.includes('750mg 캡슐 4개') || !powers.metadata?.consumerScope?.includes('설탕 캡슐') || !powers.metadata?.consumerFinding?.includes('성장호르몬') || powers.metadata.consumerFinding.includes('4배') || !powers.metadata?.consumerDetail?.includes('약 4배') || !powers.metadata.consumerDetail.includes('근육 크기나 근력은 측정하지 않았어요') || /음료|마시|근육이 커|근력이 좋아/.test(powersConsumerData) || powers.metadata?.consumerVisual || /4배|높았/.test(powers.publicText)) fail('Powers study must keep its fourfold hormone number inside the expanded detail and state what was not measured');
const sakashita = research.find(claim => claim.id === 'research-sakashita-2019');
if (!sakashita?.publicText?.includes('1.34kg') || !sakashita.publicText.includes('0.15kg') || sakashita.publicText.includes('더 늘었어요')) fail('Sakashita study must show the measured group values instead of a vague improvement claim');
if ((appSource.match(/<ResearchLibrary\b/g) ?? []).length !== 1 || /GabaEvidenceHighlights/.test(appSource)) fail('the detailed research library must be the only research-results section on the consumer page');
if (/research-(?:yoto|byun|sakashita)-\d{4}|metadata\.consumerSummary/.test(gabaStory)) fail('the GABA introduction must point to the research list without repeating study results');
if (!researchLibrary.includes('canonicalStudySources')) fail('research records must be deduplicated by all linked primary sources');
if (!consumerUi.includes('뇌 피로나 건강 상태를 재는 점수는 아니에요') || !researchLibrary.includes('누가 무엇을 먹고 무엇을 살펴봤는지 쉬운 말과 그림') || !researchLibrary.includes('GABA를 먹지 않고 뇌 신호를 살펴본 연구') || !researchLibrary.includes('연구에서 기록한 내용') || !researchLibrary.includes('metadata.productApplicability') || !researchLibrary.includes('metadata.consumerDisclosure') || !researchLibrary.includes('metadata.consumerDetail') || !researchLibrary.includes("new URL('research/',base)") || !researchLibrary.includes('논문 원문 보기') || !researchLibrary.includes('source.title')) fail('research route must explain study scope in consumer language, disclose research relationships, and distinguish game scores from health measures');
if (!consumerSources['StudyInsightVisual.tsx'].includes('beforeSd') || !consumerSources['StudyInsightVisual.tsx'].includes('± 뒤 숫자는 참여자별 기록의 퍼짐') || consumerSources['StudyInsightVisual.tsx'].includes('is-featured')) fail('paired study chart must show both groups with their reported spread and neutral visual emphasis');

const unsafe = /치료|완치|진단|결핍|예방|효과\s*보장|권장량|먹으면\s*개선|개선.*보장|직접\s*(먹어|경험)|가바\s*(경험|섭취를\s*시작)/;
const discouragedMarketing = /효과가\s*확실|효과\s*보장|반드시\s*개선|누구나\s*효과|치료에\s*도움/;
const technicalResearchTerms = /무작위.{0,5}|이중눈가림|단일눈가림|위약대조|교차시험|평행군|MRS|비REM|REM\s*수면|혈중|정량\s*메타분석|체계적\s*문헌고찰/i;
const collectStrings = value => Array.isArray(value) ? value.flatMap(collectStrings) : value && typeof value === 'object' ? Object.values(value).flatMap(collectStrings) : typeof value === 'string' ? [value] : [];
for (const claim of research) {
  const metadata = claim.metadata ?? {};
  const readerCopy = [claim.topic, claim.publicText, metadata.question, metadata.population, metadata.sampleSize, metadata.dose, metadata.duration, metadata.comparison, metadata.outcome, metadata.consumerScope, metadata.consumerSummary, metadata.consumerFinding, metadata.consumerDetail, metadata.consumerContext, metadata.consumerDisclosure, metadata.hopefulTakeaway, metadata.productApplicability, ...collectStrings(metadata.consumerVisual)].filter(Boolean).join(' ');
  if (technicalResearchTerms.test(readerCopy)) fail(claim.id + ' exposes a researcher-only term in consumer copy');
  if (typeof claim.publicText !== 'string' || claim.publicText.trim().length < 30) fail(`${claim.id}.publicText must be a consumer-ready summary`);
  if (discouragedMarketing.test(claim.publicText)) fail(`${claim.id}.publicText contains a discouraged negative marketing phrase`);
  for (const field of ['consumerScope', 'consumerSummary', 'hopefulTakeaway', 'productApplicability']) {
    const value = metadata[field];
    if (typeof value !== 'string' || value.trim().length < 30) fail(`${claim.id}.${field} must be a consumer-ready sentence`);
    if (unsafe.test(value)) fail(`${claim.id}.${field} contains an unsupported promise or medical expression`);
    if (discouragedMarketing.test(value)) fail(`${claim.id}.${field} contains a discouraged negative marketing phrase`);
    if (field === 'hopefulTakeaway' && !/(표시사항|루틴|살펴보|확인해|선택해)/.test(value)) fail(`${claim.id}.hopefulTakeaway must name a check or choice action`);
  }
  if (metadata.consumerFinding !== undefined) {
    if (typeof metadata.consumerFinding !== 'string' || metadata.consumerFinding.trim().length < 30) fail(`${claim.id}.consumerFinding must state the observed result in consumer language`);
    if (unsafe.test(metadata.consumerFinding)) fail(`${claim.id}.consumerFinding contains an unsupported promise or medical expression`);
    if (discouragedMarketing.test(metadata.consumerFinding)) fail(`${claim.id}.consumerFinding contains a discouraged generalized negative phrase`);
  }
  if (metadata.consumerDetail !== undefined && (typeof metadata.consumerDetail !== 'string' || metadata.consumerDetail.trim().length < 35 || unsafe.test(metadata.consumerDetail))) fail(`${claim.id}.consumerDetail must give the selected research detail without a product promise`);
  if (metadata.consumerContext !== undefined && (typeof metadata.consumerContext !== 'string' || metadata.consumerContext.trim().length < 25 || unsafe.test(metadata.consumerContext))) fail(`${claim.id}.consumerContext must provide plain-language context without a product promise`);
  if (metadata.consumerDisclosure !== undefined && (typeof metadata.consumerDisclosure !== 'string' || metadata.consumerDisclosure.trim().length < 20 || unsafe.test(metadata.consumerDisclosure))) fail(`${claim.id}.consumerDisclosure must plainly disclose research funding or author relationships`);
}

if (/href="#products"|셀핀다 제품 구성 확인|스마트스토어/.test(researchLibrary)) fail('research reading route must remain separate from product-purchase links');
if (researchLibrary.includes('metadata.result') || researchLibrary.includes('metadata.limitations')) fail('consumer research UI must not expose raw internal analysis fields');
if (!researchLibrary.includes('metadata.consumerFinding || metadata.consumerSummary')) fail('research cards must show one concise consumer explanation instead of duplicated method and finding copy');
if (researchLibrary.includes('숫자와 출처 더 확인하기')) fail('consumer research UI must use the conditions-and-source label');
if (/전체\s*구매자의\s*경험|제품\s*효과를\s*입증하는\s*연구\s*자료는\s*아니/.test(reviewExperience)) fail('consumer review UI must use context-first copy');
if (/원문에서\s*확인되지\s*않음|빠진\s*정보는\s*추측하지\s*않아도\s*됩니다/.test(reviewExperience)) fail('consumer review UI must guide readers toward source context');
if (discouragedMarketing.test(consumerUi)) fail('consumer UI contains a discouraged negative marketing phrase');
if (/연구 카드를 준비하고 있어요|후기를 확인할 수 있는 경로를 준비하고 있습니다|GABA 기본 자료를 확인하고 있습니다|현재 공개된 제품 구성 정보가 없습니다/.test(consumerUi)) fail('consumer UI must not expose empty or preparation-state copy');
if (/이 사이트는 확인하지 못한 내용을 추정해 채우지 않습니다/.test(purchaseQuestions) || !/먹는 방법·보관법·주의사항은 구매 전에 제품 포장과 스마트스토어에서 확인해 주세요/.test(purchaseQuestions)) fail('purchase guidance must point consumers to the current package and Smart Store details');

console.log(JSON.stringify({approvedResearch: research.length, fields: ['consumerScope', 'consumerSummary', 'consumerFinding', 'consumerDetail', 'hopefulTakeaway', 'productApplicability'], visuals: 'reviewed consumerVisual schemas; raw results stay internal', detailFields: ['result', 'limitations'], flowGuard: 'independent-research-route-without-purchase-link', status: 'ok'}));
