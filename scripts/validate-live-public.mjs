import assert from 'node:assert/strict';

const cliBase = process.argv.slice(2).find(value => /^https:\/\//.test(value)) || '';
const base = (process.env.PUBLIC_SITE_URL || cliBase).replace(/\/$/, '');
if (!/^https:\/\//.test(base)) throw new Error('PUBLIC_SITE_URL must be an HTTPS URL');
const approvedSmartStoreUrl = 'https://smartstore.naver.com/cellpinda/products/4701017202';
const approvedSmartStoreReviewUrl = `${approvedSmartStoreUrl}#REVIEW_DIALOG`;
const approvedReviewText = '가바 1500 구매자 후기를 스마트스토어에서 읽어보세요.';

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const isSmartStore = value => {
  try { return new URL(value).href === approvedSmartStoreUrl; } catch { return false; }
};
const isSmartStoreReview = value => {
  try { return new URL(value).href === approvedSmartStoreReviewUrl; } catch { return false; }
};
const expectedDecisionOptionIds = state => state === 'VERIFYING' ? ['accept', 'rework'] : state === 'WAITING' || state === 'BACKLOG' ? ['hold', 'promote'] : state === 'READY' ? ['sandbox', 'hold'] : state === 'RUNNING' ? ['verify', 'retry'] : ['preserve', 'reopen'];
const approvalRiskClasses = new Set(['D_EXTERNAL_REVERSIBLE', 'E_EXTERNAL_COMMITMENT', 'F_LEGAL_IRREVERSIBLE']);
const expectedQuorum = task => approvalRiskClasses.has(task.risk)
  ? {minimum: 3, roles: [task.lead, task.verifier, 'TF 리드·AI 비서실'], rule: '책임자·독립 검증자·TF 리드 추가 확인'}
  : {minimum: 2, roles: [task.lead, task.verifier], rule: '실행 담당자·독립 검증자 확인'};
const validateQuorum = (value, task, label) => {
  assert.deepEqual(Object.keys(value || {}).sort(), ['minimum', 'roles', 'rule'].sort(), `${label} quorum fields are invalid`);
  assert.ok(Number.isInteger(value.minimum) && Array.isArray(value.roles) && value.roles.length === value.minimum && value.roles.every(role => typeof role === 'string' && role.trim().length >= 2) && typeof value.rule === 'string' && value.rule.trim().length >= 8, `${label} quorum is malformed`);
  assert.deepEqual(value, expectedQuorum(task), `${label} quorum is out of sync`);
};
const validateDecisionOptions = (options, state, label) => {
  assert.ok(Array.isArray(options) && options.length === 2, `${label} must expose two decision options`);
  assert.deepEqual(options.map(option => option?.id), expectedDecisionOptionIds(state), `${label} decision option order is invalid`);
  for (const option of options) {
    assert.deepEqual(Object.keys(option).sort(), ['id', 'label', 'criteria'].sort(), `${label} decision option fields are invalid`);
    assert.equal(typeof option.id, 'string', `${label} decision option id is invalid`);
    assert.equal(typeof option.label, 'string', `${label} decision option label is invalid`);
    assert.ok(Array.isArray(option.criteria) && option.criteria.length >= 2 && option.criteria.every(criteria => typeof criteria === 'string' && criteria.trim().length >= 4), `${label} decision option criteria are incomplete`);
  }
};
const validateContinuation = (value, label) => {
  assert.ok(value && ['close', 'human-gate-monitor', 'continue-execution', 'reassess-next-cycle'].includes(value.mode), `${label} continuation mode is invalid`);
  assert.equal(value.cadenceHours, 6, `${label} continuation cadence must be six hours`);
  assert.match(value.nextReviewAt || '', /^\d{4}-\d{2}-\d{2}T/, `${label} continuation review time is invalid`);
  assert.ok(typeof value.nextAction === 'string' && value.nextAction.trim().length >= 10, `${label} continuation action is missing`);
};
const expectedSafeChecks = ['goal-contract', 'research-copy', 'teaser-boundary', 'sandbox-mvp', 'public-export', 'tf-pulse'];
const sharedResultIds = ['active', 'sleep', 'irregular', 'sensory', 'unrested', 'steady'];
const metaContent = (html, attribute, value) => {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const forward = new RegExp(`<meta[^>]+${attribute}="${escaped}"[^>]+content="([^"]+)"`, 'i').exec(html);
  const reverse = new RegExp(`<meta[^>]+content="([^"]+)"[^>]+${attribute}="${escaped}"`, 'i').exec(html);
  return forward?.[1] ?? reverse?.[1] ?? '';
};
const canonicalHref = html => /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i.exec(html)?.[1] ?? '';
const validateSafeExecution = (value, label) => {
  if (value === undefined) return;
  assert.deepEqual(Object.keys(value).sort(), ['mode', 'status', 'validatedAt', 'executionBoundary', 'preparation', 'checks', 'candidateTaskIds', 'humanGateTaskIds'].sort(), `${label} safe execution fields are invalid`);
  assert.equal(value.mode, 'safe_internal_tf_run', `${label} safe execution mode is invalid`);
  assert.equal(value.status, 'MET', `${label} safe execution status is invalid`);
  assert.match(value.validatedAt || '', /^\d{4}-\d{2}-\d{2}T/, `${label} safe execution timestamp is invalid`);
  assert.deepEqual(value.executionBoundary, {state: 'READY', risk: 'B_INTERNAL_WRITE', externalEffects: false}, `${label} safe execution boundary is unsafe`);
  assert.deepEqual(value.preparation, {id: 'sync-public-data', risk: 'B_INTERNAL_WRITE', status: 'MET'}, `${label} safe execution preparation is invalid`);
  assert.ok(Array.isArray(value.checks), `${label} safe execution checks are invalid`);
  assert.deepEqual(value.checks.map(item => item?.id), expectedSafeChecks, `${label} safe execution checks are incomplete`);
  for (const check of value.checks) {
    assert.deepEqual(Object.keys(check).sort(), ['id', 'risk', 'status'].sort(), `${label} safe execution check fields are invalid`);
    assert.equal(check.risk, 'A_READ', `${label} safe execution check risk is invalid`);
    assert.equal(check.status, 'MET', `${label} safe execution check status is invalid`);
  }
  assert.ok(Array.isArray(value.candidateTaskIds) && Array.isArray(value.humanGateTaskIds), `${label} safe execution task lists are invalid`);
};
const request = async path => {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${base}${path}${separator}release-smoke=1`);
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return response;
};
const requestPublicRoute = async path => {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${base}${path}${separator}release-smoke=1`);
  if (![200, 404].includes(response.status)) throw new Error(`${path} returned unexpected HTTP ${response.status}`);
  return {status: response.status, text: await response.text()};
};

let lastError;
for (let attempt = 1; attempt <= 12; attempt += 1) {
  try {
    const [page, focusPageResponse, faviconResponse, robotsResponse, sitemapResponse, contentResponse, masterResponse, teaserPreviewResponse, queueResponse, pulseResponse, auditResponse, meetingPacketResponse, adminRoute, opsRoute, adminQueryRoute, opsQueryRoute] = await Promise.all([
      request('/?view=ops'),
      request('/focus/'),
      request('/favicon.svg'),
      request('/robots.txt'),
      request('/sitemap.xml'),
      request('/data/content.json'),
      request('/data/gaba-master-index.json'),
      request('/data/teaser-preview.json'),
      requestPublicRoute('/data/operations-queue.json'),
      requestPublicRoute('/data/tf-pulse.json'),
      requestPublicRoute('/data/goal-audit.json'),
      requestPublicRoute('/data/tf-meeting-packet.json'),
      requestPublicRoute('/admin'),
      requestPublicRoute('/ops'),
      requestPublicRoute('/?view=admin'),
      requestPublicRoute('/?view=ops'),
    ]);
    assert.match(faviconResponse.headers.get('content-type') || '', /image\/svg\+xml/i, 'live favicon must be served as SVG');
    const [pageText, focusPageText, robotsText, sitemapText, content, master, teaserPreview] = await Promise.all([page.text(), focusPageResponse.text(), robotsResponse.text(), sitemapResponse.text(), contentResponse.json(), masterResponse.json(), teaserPreviewResponse.json()]);
    const internalSnapshots = [
      ['/data/operations-queue.json', queueResponse],
      ['/data/tf-pulse.json', pulseResponse],
      ['/data/goal-audit.json', auditResponse],
      ['/data/tf-meeting-packet.json', meetingPacketResponse],
    ];
    const productSharePageResponse = await request('/products/');
    const productSharePageText = await productSharePageResponse.text();
    const researchPageResponse = await request('/research/');
    const researchPageText = await researchPageResponse.text();
    assert.equal(canonicalHref(researchPageText), `${base}/research/`, 'live research route must have its own canonical URL');
    assert.match(researchPageText, /property="og:title" content="GABA 사람 연구를 쉬운 말로"/, 'live research route must identify itself as an educational page');
    assert.ok(researchPageText.includes('GABA를 먹은 연구와 먹지 않고 뇌 신호를 살펴본 연구') && researchPageText.includes('셀핀다 완제품을 시험한 결과는 아닙니다'), 'live research page must explain intake versus observation and product scope before readers enter the data');
    assert.match(researchPageText, /view=research/, 'live research route must hand off to its separate reading view');
    assert.ok(!researchPageText.includes(approvedSmartStoreUrl), 'research preview must not send readers directly to the product purchase page');
    assert.match(productSharePageText, /property="og:url" content="https:\/\/kradavid\.github\.io\/cellpinda_GABA\/products\/"/, 'live product share route must expose a product-specific Open Graph URL');
    assert.match(productSharePageText, /property="og:title" content="셀핀다 가바 1,500 · 제품 구성 보기"/, 'live product share route must show a product-specific preview title');
    assert.match(productSharePageText, /assets\/product-1500\.jpg/, 'live product share route must use the product package preview image');
    const moduleSources = [...pageText.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/gi)].map(match => match[1]).filter(Boolean);
    assert.ok(moduleSources.length > 0, 'live root must expose a module bundle for the consumer UI');
    const moduleBundles = await Promise.all(moduleSources.map(async source => {
      const url = new URL(source, `${base}/`);
      const response = await fetch(`${url.href}${url.search ? '&' : '?'}release-smoke=1`);
      if (!response.ok) throw new Error(`consumer bundle returned HTTP ${response.status}`);
      return response.text();
    }));
    const consumerBundle = moduleBundles.join('\n');
    assert.ok(consumerBundle.includes('발효가바 이야기 보기'), 'live consumer bundle must contain the consumer-facing teaser CTA');
    assert.ok(consumerBundle.includes('1분 집중 신호 게임'), 'live consumer bundle must contain the consumer-facing focus game');
    assert.ok(consumerBundle.includes('매번 달라지는 신호') && consumerBundle.includes('초록은 누르고') && consumerBundle.includes('빨강은 누르지 않아요') && consumerBundle.includes('색 규칙 바꾸기') && consumerBundle.includes('색과 모양에 상관없이'), 'live consumer bundle must explain the three game stages in their actual order');
    assert.ok(consumerBundle.includes('5분 쉰 뒤 한 번 더 하기') && consumerBundle.includes('싱잉볼 소리'), 'live consumer bundle must expose optional rest and breathing-stage singing bowl cues');
    assert.ok(consumerBundle.includes('쉬지 않고 이어서 하기') && consumerBundle.includes('휴식이 기록 변화의 원인이라고 단정할 수는 없어요'), 'live consumer bundle must distinguish repeat records without claiming a rest effect');
    assert.ok(consumerBundle.includes('뇌 피로나 건강 상태를 진단하지 않습니다') && consumerBundle.includes('초록') && consumerBundle.includes('보라'), 'live consumer bundle must clarify the non-diagnostic game and show accessible color labels');
    assert.ok(!consumerBundle.includes('needsFocusRecovery') && !consumerBundle.includes('쉬고 난 뒤 게임 기록이 좋아졌어요'), 'live consumer bundle must not diagnose recovery from a score or claim a rest effect');
    assert.ok(consumerBundle.includes('시작 준비') && consumerBundle.includes('첫 신호가 나타나면'), 'live consumer bundle must give users a ready countdown before the focus game starts');
    assert.ok(consumerBundle.includes('세 가지 규칙 연습하기') && consumerBundle.includes('연습 없이 바로 시작') && consumerBundle.includes('연습 1 / 5') && consumerBundle.includes('연습 2 / 5') && consumerBundle.includes('연습 3 / 5') && consumerBundle.includes('연습 4 / 5') && consumerBundle.includes('연습 5 / 5') && consumerBundle.includes('연습 완료') && consumerBundle.includes('연습 기록은 점수에 들어가지 않아요'), 'live consumer bundle must teach all scored rules through a skippable no-score practice');
    const yamatsu = content.claims.find(claim => claim.id === 'research-yamatsu-2016');
    assert.ok(yamatsu && JSON.stringify(yamatsu).includes('캡슐') && !JSON.stringify(yamatsu).includes('정제'), 'live Yamatsu study must accurately describe capsule forms');
    assert.ok(!consumerBundle.includes('SpeechSynthesisUtterance') && !consumerBundle.includes('짧은 음성 안내'), 'live consumer bundle must not contain spoken rest narration');
    assert.ok(consumerBundle.includes('친구에게 1분 게임 보내기') && consumerBundle.includes('내 답변과 점수는 포함되지 않아요'), 'live consumer bundle must expose the clear friend game invitation and privacy note');
    assert.ok(consumerBundle.includes('피로와 집중 저하가 몇 주째 이어지거나 일상에 지장을 주면 전문가와 상담해 보세요.'), 'live consumer bundle must include the care-seeking guide');
    assert.ok(consumerBundle.includes('지난 7일 다섯 질문에 고른 답을 더한 숫자'), 'live consumer bundle must explain the personal answer score');
    assert.ok(consumerBundle.includes('집중과 휴식 관련 연구 쉽게 보기'), 'live consumer bundle must include the secondary health evidence section');
    assert.ok(consumerBundle.includes('61개 연구') && consumerBundle.includes('267개 연구') && consumerBundle.includes('21개 연구'), 'live consumer bundle must include evidence scale markers');
    assert.ok(!consumerBundle.includes('발효가바가 무엇인지 30초'), 'live consumer bundle still contains the retired teaser duration promise');
    assert.ok(robotsText.includes(`Sitemap: ${base}/sitemap.xml`), 'live robots.txt must point to the current public sitemap');
    assert.match(robotsText, /Disallow: \/cellpinda_GABA\/admin\nDisallow: \/cellpinda_GABA\/ops/, 'live robots.txt must keep internal paths out of discovery');
    const sitemapUrls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
    const expectedSitemapUrls = [`${base}/`, `${base}/products/`, `${base}/research/`, `${base}/focus/`, ...sharedResultIds.map(id => `${base}/share/${id}/`)];
    assert.deepEqual(sitemapUrls, expectedSitemapUrls, 'live sitemap must contain public landing, product, independent research, focus invite and share pages only');
    assert.ok(!sitemapText.includes('/admin') && !sitemapText.includes('/ops'), 'live sitemap must not list internal routes');
    for (const [label, route] of [['/admin', adminRoute], ['/ops', opsRoute], ['/?view=admin', adminQueryRoute], ['/?view=ops', opsQueryRoute]]) {
      assert.ok(!/콘텐츠 검토실|운영자 접근 키|TF 운영판|운영 큐|관리자 기능/i.test(route.text), `public route ${label} leaks an internal operations surface`);
    }
    const sharePageResponses = await Promise.all(sharedResultIds.map(id => request(`/share/${id}/`)));
    const sharePageTexts = await Promise.all(sharePageResponses.map(response => response.text()));
    assert.equal(canonicalHref(pageText), `${base}/`, 'live root canonical URL is invalid');
    assert.ok(metaContent(pageText, 'property', 'og:title'), 'live root is missing an Open Graph title');
    assert.ok(metaContent(pageText, 'property', 'og:description'), 'live root is missing an Open Graph description');
    assert.equal(metaContent(pageText, 'property', 'og:image'), `${base}/assets/social-card.png`, 'live root Open Graph image is invalid');
    assert.equal(canonicalHref(focusPageText), `${base}/focus/`, 'live focus invite canonical URL is invalid');
    assert.equal(metaContent(focusPageText, 'property', 'og:url'), `${base}/focus/`, 'live focus invite Open Graph URL is invalid');
    assert.equal(metaContent(focusPageText, 'property', 'og:image'), `${base}/assets/focus-game-card.png`, 'live focus invite Open Graph image is invalid');
    assert.equal(metaContent(focusPageText, 'property', 'og:site_name'), '셀핀다 발효가바', 'live focus invite Open Graph site name is invalid');
    assert.ok(focusPageText.includes('focus=1') && focusPageText.includes('#focus-game'), 'live focus invite must hand off to the explained game without auto-start');
    assert.ok(focusPageText.includes('24개') && focusPageText.includes('먼저 연습하고 게임 시작하기') && focusPageText.includes('초록을 누르고 빨강은 기다려요'), 'live focus invite must explain the randomized game before the user starts it');
    const focusGameCardResponse = await request('/assets/focus-game-card.png');
    assert.equal(focusGameCardResponse.status, 200, 'live focus invite card image must be available');
    assert.match(pageText, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"WebSite","name":"셀핀다 발효가바","url":"https:\/\/kradavid\.github\.io\/cellpinda_GABA\/"[^<]*"inLanguage":"ko-KR"\}<\/script>/, 'live root WebSite structured data is invalid');
    for (const [index, id] of sharedResultIds.entries()) {
      const sharePage = sharePageTexts[index] || '';
      assert.match(metaContent(sharePage, 'property', 'og:title'), /^공유받은 하루 리듬:/, `share page ${id} is missing an Open Graph title`);
      assert.ok(metaContent(sharePage, 'property', 'og:description'), `share page ${id} is missing an Open Graph description`);
      assert.equal(canonicalHref(sharePage), `${base}/share/${id}/`, `share page ${id} canonical URL is invalid`);
      assert.equal(metaContent(sharePage, 'property', 'og:url'), `${base}/share/${id}/`, `share page ${id} Open Graph URL is invalid`);
      assert.equal(metaContent(sharePage, 'property', 'og:image'), `${base}/assets/social-rhythm-${id}.png`, `share page ${id} Open Graph image is invalid`);
      assert.equal(metaContent(sharePage, 'property', 'og:site_name'), '셀핀다 발효가바', `share page ${id} Open Graph site name is invalid`);
      assert.equal(metaContent(sharePage, 'property', 'og:locale'), 'ko_KR', `share page ${id} Open Graph locale is invalid`);
      assert.match(sharePage, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"WebPage"[\s\S]*"inLanguage":"ko-KR"[\s\S]*<\/script>/, `share page ${id} WebPage structured data is invalid`);
      assert.equal(metaContent(sharePage, 'name', 'twitter:image'), `${base}/assets/social-rhythm-${id}.png`, `share page ${id} Twitter image is invalid`);
      assert.ok(sharePage.includes(`?rhythm=${id}`), `share page ${id} is missing the app handoff`);
      assert.ok(!/제한적|결과가 일치하지|정량 메타분석|이상사례|유의하지 않음/i.test(sharePage), `share page ${id} contains blocked research copy`);
    }
    assert.match(pageText, /Cellpinda|GABA/i, 'public page does not contain the site shell');
    assert.ok(pageText.includes(approvedSmartStoreUrl), 'live static fallback must keep the approved Smart Store 1500 detail link');
    assert.ok(pageText.includes('스마트스토어에서 제품 보기'), 'live static fallback must label the Smart Store destination for consumers');
    assert.ok(pageText.includes('스마트스토어에서 후기 읽기'), 'live static fallback must expose the Smart Store review label');
    assert.ok(pageText.includes(approvedSmartStoreReviewUrl), 'live static fallback must deep-link to the Smart Store review dialog');
    assert.ok(pageText.includes(approvedReviewText), 'live static fallback must expose the approved consumer review guidance');
    assert.equal(content.products.length, 1, 'live export must contain one product');
    assert.equal(content.products[0].id, 'gaba1500', 'live export product must be gaba1500');
    assert.equal(content.products[0].officialUrl, approvedSmartStoreUrl, 'live product must point to the Smart Store 1500 product');
    assert.equal(content.reviews.length, 1, 'live export must contain the approved Smart Store review destination');
    assert.equal(content.reviews[0].id, 'shop-review-destination-1500', 'live review destination must be the approved GABA 1500 record');
    assert.ok(isSmartStoreReview(content.reviews[0].sourceUrl), 'live review destination must deep-link to the Smart Store 1500 review dialog');
    assert.equal(content.reviews[0].publicText, approvedReviewText, 'live review destination must keep the approved consumer message');
    assert.equal(teaserPreview.status, 'PREVIEW', 'live teaser preview must be marked PREVIEW');
    assert.equal(teaserPreview.url, 'https://fermented-gaba-documentary-20260903.dubaissday.chatgpt.site/', 'live teaser preview must use the supplied HTTPS URL');
    assert.equal(teaserPreview.placement, '선택형 보조 CTA · 리듬 체크 다음', 'live teaser preview must keep the approved placement');
    assert.ok(!/제한적|매우 제한적|결과가 일치하지|정량 메타분석|다만 GABA만의 효과|이상사례|유의하지 않음/i.test(JSON.stringify({content, master})), 'live public research data contains blocked negative marketing copy');
    assert.ok(!/cellpinda\.co\.kr|cellpindamall\.com|공식몰/i.test(JSON.stringify(content)), 'live public content contains a legacy official-mall destination');
    for (const claim of content.claims.filter(item => ['product-1500', 'fermentation-listed'].includes(item.id))) assert.ok(claim.sources?.every(source => isSmartStore(source.url)), `live product claim ${claim.id} must use the Smart Store source only`);
    assert.ok(!content.products.some(item => item.id === 'gaba750' || Number(item.amountMg) === 750 || String(item.name || '').includes('750')), 'live export contains removed 750 product');
    assert.equal(master.records.length, 8, 'live master index must contain eight research records');
    for (const [path, snapshot] of internalSnapshots) {
      let parsed = false;
      if (snapshot.status === 200) {
        try { JSON.parse(snapshot.text); parsed = true; } catch { /* static host fallback HTML is not an operations packet */ }
      }
      assert.equal(parsed, false, 'live public site must not expose internal operations snapshot ' + path);
    }
    const required = ['research-yoto-2012', 'research-yamatsu-2016', 'research-powers-2008', 'research-sakashita-2019'];
    for (const id of required) assert.ok(master.records.some(record => record.id === id), 'live master index is missing ' + id);
    const claimsById = new Map(content.claims.map(claim => [claim.id, claim]));
    for (const record of master.records) {
      const claim = claimsById.get(record.id);
      assert.ok(claim, `live claim is missing for ${record.id}`);
      assert.equal(record.evidenceHash, claim.evidenceHash, `live provenance mismatch for ${record.id}`);
    assert.equal(record.reviewedAt, claim.reviewedAt, `live review date mismatch for ${record.id}`);
    }
    console.log(JSON.stringify({base, attempt, page: 200, claims: content.claims.length, masterRecords: master.records.length, products: content.products.length, sharePages: sharedResultIds.length, teaserPreview: true, internalOpsSnapshots: 'excluded', smartStoreOnly: true, removed750: true, provenance: 'matched'}));
    lastError = undefined;
    break;
  } catch (error) {
    lastError = error;
    if (attempt < 12) await sleep(5000);
  }
}
if (lastError) throw new Error(`Live public smoke check failed after 12 attempts: ${lastError instanceof Error ? lastError.message : lastError}`);
