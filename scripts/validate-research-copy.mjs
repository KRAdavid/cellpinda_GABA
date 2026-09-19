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
const gameDomain = await readFile(new URL('../src/domain/fatigue-game.ts', import.meta.url), 'utf8');
const purchaseQuestions = consumerSources['PurchaseQuestions.tsx'];
const reviewExperience = consumerSources['ReviewExperience.tsx'];
const gabaStory = consumerSources['GabaStory.tsx'];
const consumerUi = [Object.values(consumerSources).join('\n'), appSource, indexHtml, gameDomain].join('\n');
const fail = message => { throw new Error(`Research consumer copy invalid: ${message}`); };
const research = ledger.claims.filter(claim => claim.status === 'approved' && claim.id.startsWith('research-'));
if (research.length === 0) fail('at least one approved research claim is required');
const yoto = research.find(claim => claim.id === 'research-yoto-2012');
const yotoConsumerData = JSON.stringify({publicText:yoto?.publicText,metadata:yoto?.metadata});
if (!yoto?.publicText?.includes('GABA 캡슐') || !yoto.metadata?.dose?.includes('덱스트린 캡슐') || !yoto.metadata?.consumerVisual?.steps?.[0]?.includes('캡슐') || !yoto.metadata?.consumerScope?.includes('건강한 성인') || /100mg|30분/.test(yoto.metadata.consumerScope) || /음료|마시/.test(yotoConsumerData) || yoto.topic !== '뇌파·과제') fail('Yoto consumer copy must match the capsule study, keep repeated details in its visual, and avoid suggesting a stress-relief outcome');
if (!yoto.metadata?.consumerFinding?.startsWith('이 연구에서는') || !yoto.metadata.consumerFinding.includes('뇌파와 활력 설문 점수의 감소 폭') || !yoto.metadata.consumerFinding.includes('비교 조건보다 작게 기록됐어요') || /안정적으로 유지|뇌 활력 개선|개선됐/.test(yoto.metadata.consumerFinding) || !yoto.metadata.consumerVisual?.outcomes?.some(item => item.label === '활력 설문 점수' && item.result.includes('감소 폭이 작게 기록됐어요'))) fail('Yoto consumer finding must name the study context and describe the observed decrease range against the comparison condition without implying a general stabilizing or improvement effect');
const heba = research.find(claim => claim.id === 'research-heba-2016');
if (heba?.publicText?.includes('12%') || heba?.metadata?.consumerSummary?.includes('높게 측정') || !heba?.metadata?.consumerVisual?.boundaryLabel?.includes('관계') || !heba?.metadata?.dose?.includes('GABA를 먹지 않고')) fail('Heba study must not frame tactile practice as a GABA intake benefit');
const yoon = ledger.claims.find(claim => claim.id === 'research-yoon-2022');
if (yoon?.status !== 'hold' || !yoon.holdReason?.includes('p=0.0240') || !yoon.metadata?.result?.includes('p=0.0038') || !yoon.metadata?.result?.includes('p=0.0240') || research.some(claim => claim.id === 'research-yoon-2022')) fail('Yoon 2022 must stay out of public research until its conflicting result descriptions are independently resolved');
const retractedSteenbergen = ledger.claims.find(claim => claim.id === 'research-steenbergen-2015');
const approvedRetractedStudy = research.find(claim => claim.sources.some(source => /srep12770|26227783|s41598-022-13116-1/i.test(`${source.url} ${source.locator}`)));
if (retractedSteenbergen?.status !== 'hold' || !retractedSteenbergen.sources.some(source => source.url?.includes('s41598-022-13116-1')) || approvedRetractedStudy) fail('the retracted 2015 action-selection paper must remain held and must never enter public research');
const byun = research.find(claim => claim.id === 'research-byun-2018');
if (!byun?.publicText?.includes('수면 불편을 호소한 성인') || !byun.publicText.includes('GABA가 없는') || !byun.publicText.includes('40명') || byun.metadata?.consumerVisual?.kind !== 'paired-before-after' || byun.metadata.consumerVisual.groups?.length !== 2 || byun.metadata.consumerVisual.groups[0]?.participants !== 30 || byun.metadata.consumerVisual.groups[1]?.participants !== 10 || byun.metadata.consumerVisual.groups[1]?.afterValue !== 15.2 || !byun.metadata.consumerFinding?.includes('13.4분') || !byun.metadata.consumerContext?.includes('잠의 질') || !byun.metadata.consumerContext?.includes('잠드는 어려움') || /PSQI|ISI|불면 증상/.test(byun.metadata.consumerContext) || byun.metadata.consumerScope?.includes('300mg') || byun.metadata.consumerScope?.includes('4주') || !byun.metadata.productApplicability?.includes('별도 제품')) fail('Byun study must state the selected population in plain consumer language, groups and product boundary');
const review = research.find(claim => claim.id === 'research-review-2020');
if (review?.metadata?.studyCount !== '14' || !review.metadata.consumerSummary?.includes('참여자') || !review.metadata.consumerSummary.includes('먹은 양·기간') || !review.metadata.consumerSummary.includes('살펴본 항목') || !review.metadata.consumerContext?.includes('2020년 2월까지') || review.metadata.consumerFinding !== undefined) fail('2020 review must show its consumer scope and date range without surfacing an efficacy conclusion');
if (!yoto?.metadata?.consumerDisclosure?.includes('저자 9명 중 4명') || !yoto.metadata.consumerDisclosure.includes('Pharma Foods International')) fail('Yoto study must disclose the author affiliation shown in the paper');
if (!yoto.sources.some(source => source.url === 'https://link.springer.com/article/10.1007/s00726-011-1206-6' && source.locator?.includes('Author affiliations'))) fail('Yoto author affiliation disclosure must link directly to the publisher source that lists the affiliations');
const powers = research.find(claim => claim.id === 'research-powers-2008');
const powersConsumerData = JSON.stringify({publicText:powers?.publicText,metadata:powers?.metadata});
if (!powers?.metadata?.consumerSummary?.includes('남성 11명') || !powers.metadata.consumerSummary.includes('GABA 3g') || !powers.metadata.consumerSummary.includes('90분') || !powers.metadata?.dose?.includes('750mg 캡슐 4개') || !powers.metadata?.consumerScope?.includes('설탕 캡슐') || powers.metadata?.consumerFindingFirst === true || !powers.metadata?.consumerFinding?.includes('성장호르몬 최고 수치') || !powers.metadata.consumerFinding.includes('근육 크기와 근력 변화는 측정하지 않았어요') || /AUC|곡선|합산|약 4배|400%|누적값/.test(powers.metadata.consumerFinding) || /음료|마시|근육이 커|근력이 좋아/.test(powersConsumerData) || powers.metadata?.consumerVisual) fail('Powers study must lead with its 11-person, single-dose, 90-minute measurement design and keep the outcome in context');
if (powers?.metadata?.consumerDisclosureStatus !== 'not_reported_in_pubmed_abstract' || powers.metadata?.fullTextDisclosureCheck !== 'required' || !powers.metadata?.consumerDisclosure?.includes('PubMed 초록에는') || !powers.metadata.consumerDisclosure.includes('원문 확인 전까지')) fail('Powers study must show a plain-language disclosure status until the full text is reviewed');
const sakashita = ledger.claims.find(claim => claim.id === 'research-sakashita-2019');
if (sakashita?.status !== 'hold' || sakashita.publicText !== null || !sakashita.holdReason?.includes('독립 통계 검토자') || research.some(claim => claim.id === 'research-sakashita-2019')) fail('Sakashita results must stay out of public copy until independent statistical review');
if ((appSource.match(/<ResearchLibrary\b/g) ?? []).length !== 1 || /GabaEvidenceHighlights/.test(appSource)) fail('the detailed research library must be the only research-results section on the consumer page');
if (/research-(?:yoto|byun|sakashita)-\d{4}|metadata\.consumerSummary/.test(gabaStory)) fail('the GABA introduction must point to the research list without repeating study results');
if (!researchLibrary.includes('canonicalStudySources')) fail('research records must be deduplicated by all linked primary sources');
if (!researchLibrary.includes('research-topic-cards') || researchLibrary.includes('research-review-metrics') || !researchLibrary.includes("'research-yamatsu-2016', 'research-byun-2018'") || !researchLibrary.includes('research-review-2020') || !researchLibrary.includes('setTopic(nextTopic)')) fail('a specific human study must lead, with the 14-paper scope review available separately and topic cards directly selectable');
if (powers?.metadata?.consumerFindingFirst && !researchLibrary.includes('사람 연구에서 관찰된 변화')) fail('the Powers finding must be visible before opening its methods');
if (!consumerUi.includes('게임 점수는 뇌 피로나 건강 상태를 뜻하지 않아요.') || !consumerUi.includes('뇌 피로나 건강 상태를 측정한 값은 아니에요.') || !consumerUi.includes('나랑 ‘1분 색 신호 게임’ 해볼래?') || !appSource.includes('셀핀다 완제품 연구와는 다른 자료입니다.') || !researchLibrary.includes('GABA를 먹지 않은 관찰 연구') || !researchLibrary.includes('사람 연구 여러 편을 모아 정리') || !researchLibrary.includes('일반 GABA 섭취 연구') || !researchLibrary.includes('연구는 이렇게 진행됐어요') || !researchLibrary.includes('metadata.consumerScope || metadata.consumerSummary') || !researchLibrary.includes('metadata.productApplicability') || !researchLibrary.includes('자료에서 다룬 내용') || !researchLibrary.includes('metadata.consumerDisclosure') || !researchLibrary.includes('research-library-disclosure') || !researchLibrary.includes('metadata.consumerDetail') || !researchLibrary.includes('metadata.consumerContext ?') || !researchLibrary.includes('누가·어떻게·무엇을 봤는지 보기') || !researchLibrary.includes('출처와 연구 배경') || !researchLibrary.includes('preferredStudyOrder') || !researchLibrary.includes('research-library-browse') || !researchLibrary.includes('if (browse) browse.open = true') || !researchLibrary.includes("new URL('research/',base)") || !researchLibrary.includes('논문 원문 보기') || !researchLibrary.includes('논문 정보 보기') || !researchLibrary.includes('source.title')) fail('research route must show plain-language findings, study relationships and context while preserving product boundaries and deep links');
if (!consumerSources['StudyInsightVisual.tsx'].includes('beforeSd') || !consumerSources['StudyInsightVisual.tsx'].includes('study-paired-trajectory') || !consumerSources['StudyInsightVisual.tsx'].includes('study-paired-spread') || !consumerSources['StudyInsightVisual.tsx'].includes('± 뒤 숫자는 사람마다 기록이 얼마나 달랐는지 보여줘요') || consumerSources['StudyInsightVisual.tsx'].includes('is-featured')) fail('paired study comparison must show both groups and preserve the reported spread behind a plain-language disclosure');

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
if (!researchLibrary.includes('metadata.consumerSummary || metadata.consumerFinding') || !researchLibrary.includes('metadata.consumerVisual') || !researchLibrary.includes('연구는 이렇게 진행됐어요')) fail('research cards must explain study design separately from a concrete visual result');
const yamatsu = research.find(claim => claim.id === 'research-yamatsu-2016');
const yamatsuVisual = yamatsu?.metadata?.consumerVisual;
const yamatsuEvidence = JSON.stringify({ publicText: yamatsu?.publicText, result: yamatsu?.metadata?.result, nestedPublicText: yamatsu?.metadata?.publicText });
if (!yamatsu?.publicText?.includes('수면 설문에서 잠의 질이 낮게 나온 일본 성인 10명') || !yamatsu.publicText.includes('2.2% 길게') || /2\.2%포인트|2\.2%p/.test(yamatsuEvidence) || !yamatsu.metadata?.consumerScope?.includes('수면 설문에서 잠의 질이 낮게 나온') || yamatsu.metadata.consumerScope.includes('100mg') || yamatsu.metadata.consumerScope.includes('1주') || !yamatsu.metadata.question?.includes('잠드는 시간과 수면 기록') || /잠든 모습/.test(JSON.stringify(yamatsu.metadata)) || !yamatsuVisual?.metrics?.some(metric => metric.label === '눈이 빠르게 움직이지 않는 수면 시간' && metric.value === '2.2' && metric.unit === '%' && metric.trendLabel?.includes('비교 조건보다 길게'))) fail('Yamatsu must report total non-REM sleep time in consumer language, use the reported 2.2% unit consistently, keep the question aligned to the measured sleep record, and avoid repeating dose and duration outside its visual');
if (researchLibrary.includes('숫자와 출처 더 확인하기')) fail('consumer research UI must use the conditions-and-source label');
if (/전체\s*구매자의\s*경험|제품\s*효과를\s*입증하는\s*연구\s*자료는\s*아니/.test(reviewExperience)) fail('consumer review UI must use context-first copy');
if (/원문에서\s*확인되지\s*않음|빠진\s*정보는\s*추측하지\s*않아도\s*됩니다/.test(reviewExperience)) fail('consumer review UI must guide readers toward source context');
if (discouragedMarketing.test(consumerUi)) fail('consumer UI contains a discouraged negative marketing phrase');
if (/연구 카드를 준비하고 있어요|후기를 확인할 수 있는 경로를 준비하고 있습니다|GABA 기본 자료를 확인하고 있습니다|현재 공개된 제품 구성 정보가 없습니다/.test(consumerUi)) fail('consumer UI must not expose empty or preparation-state copy');
if (/운동 뒤 혈액 속 호르몬과 몸무게 변화/.test(indexHtml)) fail('no-script research summary must not expose the held body-composition study');
if (/연구마다 다르게 보고됐어요|근거가 매우 제한적|근거가 제한적/.test(consumerUi)) fail('consumer UI must not expose discouraging review conclusions');
if (/이 사이트는 확인하지 못한 내용을 추정해 채우지 않습니다/.test(purchaseQuestions) || !/먹는 방법·보관법·주의사항은 구매 전에 제품 포장과 스마트스토어에서 확인해 주세요/.test(purchaseQuestions)) fail('purchase guidance must point consumers to the current package and Smart Store details');

console.log(JSON.stringify({approvedResearch: research.length, fields: ['consumerScope', 'consumerSummary', 'consumerFinding', 'consumerDetail', 'hopefulTakeaway', 'productApplicability'], visuals: 'reviewed consumerVisual schemas; raw results stay internal', detailFields: ['result', 'limitations'], flowGuard: 'independent-research-route-with-neutral-product-handoff', status: 'ok'}));
