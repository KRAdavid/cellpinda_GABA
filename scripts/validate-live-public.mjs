import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {normalizePublicSiteUrl, publicSitePath} from './public-origin.mjs';
import {findPublicResearchParityMismatches} from './public-research-parity.mjs';

const cliBase = process.argv.slice(2).find(value => /^https:\/\//.test(value)) || '';
const base = normalizePublicSiteUrl(process.env.PUBLIC_SITE_URL || cliBase || undefined);
const publicPath = publicSitePath(base);
const routePath = segment => `${publicPath}/${segment}`;
const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const runtimeMode = process.env.PUBLIC_RUNTIME_MODE || (base === normalizePublicSiteUrl() ? 'static' : '');
if (!runtimeMode) throw new Error('PUBLIC_RUNTIME_MODE is required when validating a non-default public origin');
if (!['static', 'worker'].includes(runtimeMode)) throw new Error('PUBLIC_RUNTIME_MODE must be static or worker');
const expectedReleaseSha = process.env.EXPECTED_RELEASE_SHA || '';
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
const expectedReleaseRoutes = ['/', '/products/', '/research/', '/focus/', '/share/active/', '/share/sleep/', '/share/irregular/', '/share/sensory/', '/share/unrested/', '/share/steady/'];
const sharedResultLabels = Object.fromEntries(Object.entries(JSON.parse(readFileSync(resolve('data/rhythm-share-labels.json'), 'utf8'))).map(([id, value]) => [id, value.label]));
const metaContent = (html, attribute, value) => {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const forward = new RegExp(`<meta[^>]+${attribute}="${escaped}"[^>]+content="([^"]+)"`, 'i').exec(html);
  const reverse = new RegExp(`<meta[^>]+content="([^"]+)"[^>]+${attribute}="${escaped}"`, 'i').exec(html);
  return forward?.[1] ?? reverse?.[1] ?? '';
};
const canonicalHref = html => /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i.exec(html)?.[1] ?? '';
const jsonLd = html => {
  const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1] || '';
  try { return JSON.parse(raw); } catch { return null; }
};
const validatePublicMetadata = (html, path, expectedCanonical) => {
  assert.match(html, /<html[^>]+lang="ko"/i, `${path} must declare Korean language`);
  assert.match(html, /<meta[^>]+name="viewport"[^>]+content="width=device-width/i, `${path} must expose a responsive viewport`);
  assert.ok(!/<meta[^>]+http-equiv="refresh"/i.test(html), `${path} must preserve its static fallback without an immediate meta refresh`);
  assert.equal(canonicalHref(html), expectedCanonical, `${path} canonical URL is invalid`);
  assert.match(html, /<title>[^<]*\S[^<]*<\/title>/i, `${path} title is missing`);
  assert.ok(metaContent(html, 'name', 'description').trim().length >= 20, `${path} description is missing or too short`);
  assert.ok(metaContent(html, 'property', 'og:title'), `${path} Open Graph title is missing`);
  assert.ok(metaContent(html, 'property', 'og:description'), `${path} Open Graph description is missing`);
  const socialImage = metaContent(html, 'property', 'og:image');
  assert.match(socialImage, /^https:\/\/[^/]+\/[^\s]+\/assets\/.+\.(?:png|webp|svg)$/i, `${path} Open Graph image is invalid`);
  assert.ok(metaContent(html, 'property', 'og:image:alt').trim().length >= 12, `${path} Open Graph image alt text is missing`);
  assert.equal(metaContent(html, 'property', 'og:image:width'), '1200', `${path} Open Graph image width is invalid`);
  assert.equal(metaContent(html, 'property', 'og:image:height'), '630', `${path} Open Graph image height is invalid`);
  assert.equal(metaContent(html, 'name', 'twitter:card'), 'summary_large_image', `${path} Twitter card is invalid`);
  assert.ok(metaContent(html, 'name', 'twitter:title'), `${path} Twitter title is missing`);
  assert.ok(metaContent(html, 'name', 'twitter:description'), `${path} Twitter description is missing`);
  assert.equal(metaContent(html, 'name', 'twitter:image'), socialImage, `${path} Twitter image must match its Open Graph image`);
  assert.match(html, /<script[^>]+type="application\/ld\+json">[\s\S]*"inLanguage":"ko-KR"[\s\S]*<\/script>/i, `${path} structured data must declare Korean language`);
};
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
const requestRuntimeRoute = async path => {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${base}${path}${separator}release-smoke=1`);
  return {status: response.status, type: response.headers.get('content-type') || ''};
};
const validateLiveBundleHashes = async manifest => {
  const entries = Object.entries(manifest?.fileHashes || {});
  assert.ok(entries.length > 0, 'live release manifest must include public file hashes');
  const safePath = /^\/?[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*$/;
  for (const [relativePath, expectedHash] of entries) {
    assert.match(relativePath, safePath, `live release manifest contains an unsafe file path: ${relativePath}`);
    assert.match(expectedHash || '', /^[a-f0-9]{64}$/, `live release manifest contains an invalid hash for ${relativePath}`);
  }
  const mismatches = [];
  await Promise.all(entries.map(async ([relativePath, expectedHash]) => {
    const response = await request(`/${relativePath}`);
    const actualHash = createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
    if (actualHash !== expectedHash) mismatches.push(`${relativePath} expected ${expectedHash} got ${actualHash}`);
  }));
  assert.deepEqual(mismatches, [], `live public bundle hash drift detected: ${mismatches.join('; ')}`);
  return entries.length;
};

let lastError;
for (let attempt = 1; attempt <= 12; attempt += 1) {
  try {
    const [page, focusPageResponse, faviconResponse, heroImageResponse, robotsResponse, sitemapResponse, contentResponse, masterResponse, teaserPreviewResponse, queueResponse, pulseResponse, auditResponse, meetingPacketResponse, adminRoute, opsRoute, adminQueryRoute, opsQueryRoute, healthRoute, contentApiRoute, releaseManifestResponse] = await Promise.all([
      request('/?view=ops'),
      request('/focus/'),
      request('/favicon.svg'),
      request('/assets/rhythm-window.webp'),
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
      requestRuntimeRoute('/api/health'),
      requestRuntimeRoute('/api/content'),
      request('/release-manifest.json'),
    ]);
    if (runtimeMode === 'static') {
      assert.ok([404, 405].includes(healthRoute.status), `STATIC_ONLY /api/health must not expose a live API (HTTP ${healthRoute.status})`);
      assert.ok([404, 405].includes(contentApiRoute.status), `STATIC_ONLY /api/content must not expose a live API (HTTP ${contentApiRoute.status})`);
    } else {
      assert.equal(healthRoute.status, 200, 'WORKER runtime /api/health must be available');
      assert.equal(contentApiRoute.status, 200, 'WORKER runtime /api/content must be available');
    }
    assert.match(faviconResponse.headers.get('content-type') || '', /image\/svg\+xml/i, 'live favicon must be served as SVG');
    assert.match(heroImageResponse.headers.get('content-type') || '', /^image\/webp/i, 'live hero image must be served as WebP');
    const heroImageBytes = await heroImageResponse.arrayBuffer();
    assert.ok(heroImageBytes.byteLength >= 10_000, 'live hero image must contain the published visual asset');
    const [pageText, focusPageText, robotsText, sitemapText, content, master, teaserPreview, releaseManifest] = await Promise.all([page.text(), focusPageResponse.text(), robotsResponse.text(), sitemapResponse.text(), contentResponse.json(), masterResponse.json(), teaserPreviewResponse.json(), releaseManifestResponse.json()]);
    const researchParityMismatches = findPublicResearchParityMismatches(content, master);
    assert.deepEqual(researchParityMismatches, [], `live research content/master parity mismatch: ${researchParityMismatches.join('; ')}`);
    assert.equal(releaseManifest.schemaVersion, 1, 'live release manifest schema is invalid');
    assert.match(releaseManifest.candidateSha || '', /^[a-f0-9]{40}$/, 'live release manifest candidate SHA is invalid');
    if (expectedReleaseSha) assert.equal(releaseManifest.candidateSha, expectedReleaseSha, 'live release manifest does not match the deployed candidate SHA');
    assert.equal(releaseManifest.publicSiteUrl, base, 'live release manifest public origin is out of sync');
    assert.equal(releaseManifest.runtimeMode, runtimeMode, 'live release manifest runtime mode is out of sync');
    assert.deepEqual(releaseManifest.routePaths, expectedReleaseRoutes, 'live release manifest route set is invalid');
    assert.equal(releaseManifest.counts.claims, content.claims.length, 'live release manifest claim count is out of sync');
    assert.equal(releaseManifest.counts.research, master.records.length, 'live release manifest research count is out of sync');
    assert.equal(releaseManifest.counts.products, content.products.length, 'live release manifest product count is out of sync');
    assert.equal(releaseManifest.counts.reviews, content.reviews.length, 'live release manifest review count is out of sync');
    assert.equal(releaseManifest.teaser.status, teaserPreview.status, 'live release manifest teaser state is out of sync');
    assert.ok(releaseManifest.checks?.smartStoreOnly && releaseManifest.checks?.reviewDestination && releaseManifest.checks?.researchIndex && releaseManifest.checks?.teaserBoundary && releaseManifest.checks?.challengeCopy && releaseManifest.checks?.productBoundary, 'live release manifest checks are incomplete');
    const bundleHashCount = await validateLiveBundleHashes(releaseManifest);
    validatePublicMetadata(pageText, '/', `${base}/`);
    assert.ok(pageText.includes('사람 연구에서 관찰한 내용을 쉽게 정리했어요. 셀핀다 완제품 연구와는 다른 자료입니다.'), 'live root fallback must distinguish general GABA research from Cellpinda product research');
    validatePublicMetadata(focusPageText, '/focus/', `${base}/focus/`);
    const internalSnapshots = [
      ['/data/operations-queue.json', queueResponse],
      ['/data/tf-pulse.json', pulseResponse],
      ['/data/goal-audit.json', auditResponse],
      ['/data/tf-meeting-packet.json', meetingPacketResponse],
    ];
    for (const [path, response] of internalSnapshots) assert.equal(response.status, 404, `${path} must stay private and return 404`);
    const productSharePageResponse = await request('/products/');
    const productSharePageText = await productSharePageResponse.text();
    const researchPageResponse = await request('/research/');
    const researchPageText = await researchPageResponse.text();
    validatePublicMetadata(productSharePageText, '/products/', `${base}/products/`);
    validatePublicMetadata(researchPageText, '/research/', `${base}/research/`);
    assert.equal(canonicalHref(researchPageText), `${base}/research/`, 'live research route must have its own canonical URL');
    assert.match(researchPageText, /property="og:title" content="사람을 대상으로 한 GABA 연구를 쉽게 보기"/, 'live research route must identify itself as an educational page');
    assert.ok(researchPageText.includes('사람 연구에서 관찰한 내용을 쉽게 정리했어요. 셀핀다 완제품 연구와는 다른 자료입니다.'), 'live research page must distinguish general GABA research from Cellpinda product research');
    assert.match(researchPageText, /view=research/, 'live research route must hand off to its separate reading view');
    assert.ok(researchPageText.includes('카드마다 누가 참여했고 무엇을 살펴봤는지 먼저 보여드려요.') && researchPageText.includes('손끝 감각: GABA를 먹지 않고 뇌 속 GABA 신호와 손끝 연습을 살펴본 연구예요.') && !researchPageText.includes('일반 GABA 섭취 연구') && !researchPageText.includes('GABA를 먹지 않은 관찰 연구'), 'live research fallback must keep the consumer-first topic guide and plain-language non-ingestion study boundary');
    assert.ok(!researchPageText.includes(approvedSmartStoreUrl), 'research preview must not send readers directly to the product purchase page');
    assert.ok(researchPageText.includes('가바 1500 제품 구성 보기') && researchPageText.includes('view=products'), 'live research page must offer a neutral product-information handoff');
    assert.ok(researchPageText.includes('운동 경험이 있는 남성 11명이 GABA 3g을 한 번 먹고, 운동 없이 쉰 조건과 운동 조건에서 90분 동안 혈액 속 수치를 살펴봤어요. 성장이나 근육 발달 효과를 확인한 연구는 아니며, 연구에 사용한 3g은 셀핀다 제품 섭취량의 근거가 아니에요.') && !researchPageText.includes('GABA와 단백질을 함께 사용한 연구'), 'live research fallback must match the approved Powers study scope and separate its research amount from the product');
    assert.equal(canonicalHref(productSharePageText), `${base}/products/`, 'live product share route must expose a product-specific canonical URL');
    assert.equal(metaContent(productSharePageText, 'property', 'og:url'), `${base}/products/`, 'live product share route must expose a product-specific Open Graph URL');
    assert.match(productSharePageText, /property="og:title" content="셀핀다 가바 1500 · 30포 구성 보기"/, 'live product share route must show the confirmed product name and package count');
    assert.match(productSharePageText, /assets\/product-composition-1500\.png/, 'live product share route must use the neutral product composition preview');
    assert.ok(!/한 포 1,500 mg|전체 45 g/.test(productSharePageText), 'live product share route must omit unverified label amounts');
    const moduleSources = [...pageText.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/gi)].map(match => match[1]).filter(Boolean);
    assert.ok(moduleSources.length > 0, 'live root must expose a module bundle for the consumer UI');
    const releaseBundleSources = Object.keys(releaseManifest.fileHashes || {})
      .filter(relativePath => relativePath.startsWith('assets/') && relativePath.endsWith('.js'));
    const consumerBundleSources = [...new Set([...moduleSources, ...releaseBundleSources])];
    const moduleBundles = await Promise.all(consumerBundleSources.map(async source => {
      const url = new URL(source, `${base}/`);
      const response = await fetch(`${url.href}${url.search ? '&' : '?'}release-smoke=1`);
      if (!response.ok) throw new Error(`consumer bundle returned HTTP ${response.status}`);
      return response.text();
    }));
    const consumerBundle = moduleBundles.join('\n');
    assert.ok(consumerBundle.includes('발효가바 영상') && consumerBundle.includes('발효가바는'), 'live consumer bundle must contain the embedded fermentation teaser section');
    if (teaserPreview.status === 'HOLD') {
      assert.ok(consumerBundle.includes('영상 공개 준비 중이에요') && consumerBundle.includes('공개가 확정되면 이 자리에서 바로 만나보세요.') && consumerBundle.includes('GABA 연구 쉽게 보기') && consumerBundle.includes('가바 1500 구성 보기') && consumerBundle.includes('#gaba-research-highlights'), 'live consumer bundle must show the approved teaser hold state and its next actions');
    } else {
      assert.ok(consumerBundle.includes('화면에 들어오면 자동 시작') && consumerBundle.includes('이 화면에 들어오면 영상이 자동으로 시작돼요') && consumerBundle.includes('자동 시작이 막히면'), 'live consumer bundle must explain teaser autoplay and its user-controlled fallback');
    }
    assert.ok(!consumerBundle.includes('운영 큐') && !consumerBundle.includes('운영판을 여는 중입니다.'), 'live consumer bundle must keep the internal operations UI in its lazy route chunk');
    assert.ok(consumerBundle.includes('뇌컨디션 확인 챌린지') && consumerBundle.includes('1분 색 신호 게임'), 'live consumer bundle must contain the current focus challenge name and its simple game description');
    const publicResearchPayload = JSON.stringify(content.claims);
    assert.ok(publicResearchPayload.includes('비교 캡슐을 먹었을 때보다 평균 잠드는 시간이 5분 짧게 기록됐어요.') && publicResearchPayload.includes('뇌파와 활력 점수의 감소 폭이 비교 캡슐보다 작게 기록됐어요.') && publicResearchPayload.includes('연구에서 먹은 양: 하루 100mg'), 'live public research data must preserve plain-language highlights and separate research amounts from product servings');
    assert.ok(consumerBundle.includes('브라우저가 자동 소리를 막았어요.') && consumerBundle.includes('화면 신호로 계속 진행합니다.'), 'live consumer bundle must explain blocked game audio without stopping the visual game');
    assert.ok(consumerBundle.includes('매번 신호 순서가 달라져요') && consumerBundle.includes('초록은 누르고, 빨강은 기다려요') && consumerBundle.includes('뜨면 누르기') && consumerBundle.includes('표시된 색 누르기'), 'live consumer bundle must show the three game rules in direct, visual language');
    assert.ok(consumerBundle.includes('5분 쉰 뒤 한 번 더 하기') && consumerBundle.includes('싱잉볼 소리'), 'live consumer bundle must expose optional rest and breathing-stage singing bowl cues');
    assert.ok(consumerBundle.includes('쉬지 않고 이어서 하기') && consumerBundle.includes('휴식이 기록 변화의 원인이라고 단정할 수는 없어요'), 'live consumer bundle must distinguish repeat records without claiming a rest effect');
    assert.ok(consumerBundle.includes('초록 신호는 누르고 빨강 신호는 기다려요. 24개 신호에 반응하며 기록을 남겨 보세요. 게임 점수는 뇌 피로나 건강 상태를 뜻하지 않아요.') && consumerBundle.includes('초록') && consumerBundle.includes('보라'), 'live consumer bundle must clarify the non-diagnostic game and show accessible color labels');
    assert.ok(!consumerBundle.includes('needsFocusRecovery') && !consumerBundle.includes('쉬고 난 뒤 게임 기록이 좋아졌어요'), 'live consumer bundle must not diagnose recovery from a score or claim a rest effect');
    assert.ok(consumerBundle.includes('시작 준비') && consumerBundle.includes('첫 신호가 나타나면'), 'live consumer bundle must give users a ready countdown before the focus game starts');
    assert.ok(consumerBundle.includes('먼저 연습하고 시작하기') && consumerBundle.includes('바로 시작하기') && consumerBundle.includes('연습 1 / 5') && consumerBundle.includes('연습 2 / 5') && consumerBundle.includes('연습 3 / 5') && consumerBundle.includes('연습 4 / 5') && consumerBundle.includes('연습 5 / 5') && consumerBundle.includes('연습 완료') && consumerBundle.includes('연습 기록은 점수에 들어가지 않아요'), 'live consumer bundle must teach all scored rules through a skippable no-score practice');
    const yamatsu = content.claims.find(claim => claim.id === 'research-yamatsu-2016');
    assert.ok(yamatsu && JSON.stringify(yamatsu).includes('캡슐') && !JSON.stringify(yamatsu).includes('정제'), 'live Yamatsu study must accurately describe capsule forms');
    const review2020 = content.claims.find(claim => claim.id === 'research-review-2020');
    assert.ok(review2020?.metadata?.consumerSummary?.includes('참여자') && review2020.metadata.consumerSummary.includes('먹은 양·기간') && review2020.metadata.consumerSummary.includes('살펴본 항목') && review2020.metadata.studyCount === '14' && review2020.metadata.consumerContext?.includes('2020년 2월까지') && review2020.metadata.consumerFinding === undefined, 'live research review must show its scope and date range without discouraging efficacy copy');
    assert.ok(!content.claims.some(claim => claim.id === 'research-yoon-2022'), 'live public research must exclude the Yoon study while the result discrepancy is unresolved');
    assert.ok(!content.claims.some(claim => claim.id === 'research-steenbergen-2015'), 'live public research must exclude the retracted action-selection paper');
    const byun2018 = content.claims.find(claim => claim.id === 'research-byun-2018');
    assert.ok(byun2018?.metadata?.sampleSize?.includes('40명') && byun2018.metadata.sampleSize.includes('30명') && byun2018.metadata.sampleSize.includes('10명') && byun2018.metadata.consumerVisual?.groups?.length === 2, 'live Byun study must show the participant split and both groups');
    const powers2008 = content.claims.find(claim => claim.id === 'research-powers-2008');
    assert.ok(powers2008?.metadata?.consumerFindingFirst !== true && powers2008.metadata?.consumerSummary?.includes('남성 11명') && powers2008.metadata.consumerSummary.includes('GABA 3g') && powers2008.metadata.consumerSummary.includes('90분') && powers2008.metadata.consumerFinding?.includes('성장호르몬 최고 수치') && powers2008.metadata.consumerFinding.includes('쉬었을 때와 운동했을 때의 혈액 속 변화를 살펴본 자료') && !/750mg 캡슐|750\s*제품|근육 크기와 근력 변화는 측정하지 않았어요/.test(JSON.stringify(powers2008.metadata)) && powers2008.metadata.consumerDetail?.includes('약 4배') && powers2008.metadata.productApplicability?.includes('성장이나 근육 발달 효과를 확인한 연구가 아니며') && powers2008.metadata.productApplicability?.includes('연구에 사용한 3g은 셀핀다 제품 섭취량의 근거가 아니에요') && powers2008.metadata.consumerDisclosure === 'PubMed 초록에는 연구비와 저자 소속이 따로 적혀 있지 않아요.' && powers2008.metadata.consumerDisclosureStatus === 'not_reported_in_pubmed_abstract', 'live Powers study must lead with its measurement design, keep the result boundary visible in the detail card, avoid removed SKU wording, and keep the numeric finding in context');
    const yoto2012 = content.claims.find(claim => claim.id === 'research-yoto-2012');
    assert.ok(yoto2012?.metadata?.consumerFinding?.startsWith('이 연구에서는') && yoto2012.metadata.consumerFinding.includes('뇌파와 활력 설문 점수의 감소 폭') && yoto2012.metadata.consumerFinding.includes('비교 조건보다 작게 기록됐어요') && !/안정적으로 유지|뇌 활력 개선|개선됐/.test(yoto2012.metadata.consumerFinding) && yoto2012.metadata.consumerVisual?.outcomes?.some(item => item.label === '활력 설문 점수' && item.result.includes('감소 폭이 작게 기록됐어요')), 'live Yoto copy must name the study context and describe the observed decrease range against the comparison condition without implying a general stabilizing or improvement effect');
    assert.ok(yoto2012.metadata.consumerSummary?.includes('뇌파와 활력 점수 변화') && !/알파·베타/.test(yoto2012.metadata.consumerSummary), 'live Yoto summary must use plain-language brain-wave wording');
    const sensory2016 = content.claims.find(claim => claim.id === 'research-heba-2016');
    assert.ok(sensory2016?.metadata?.consumerSummary?.includes('손끝 자극 전후의 감각 점수') && sensory2016.metadata?.consumerScope?.includes('손끝 감각 점수') && sensory2016.metadata?.consumerVisual?.rightLabel === '손끝 감각 점수', 'live sensory study must use plain-language fingertip-sensation wording');
    assert.ok(review2020?.metadata?.consumerDisclosure?.includes('게재 비용 지원') && review2020.metadata.consumerDisclosure.includes('산업계 관계'), 'live review must preserve its published funding and relationship disclosure');
    assert.ok(content.claims.find(claim => claim.id === 'research-yoto-2012')?.metadata?.consumerDisclosure?.includes('저자 9명 중 4명'), 'live Yoto study must show the published author affiliation disclosure');
    assert.ok(!content.claims.some(claim => claim.id === 'research-sakashita-2019') && !master.records.some(record => record.id === 'research-sakashita-2019'), 'live public research must keep the study with unresolved statistical review out of the public master index');
    assert.ok(!consumerBundle.includes('SpeechSynthesisUtterance') && !consumerBundle.includes('짧은 음성 안내'), 'live consumer bundle must not contain spoken rest narration');
    assert.ok(consumerBundle.includes('친구에게 챌린지 보내기') && consumerBundle.includes('나랑 ‘뇌컨디션 확인 챌린지’ 해볼래?') && consumerBundle.includes('초대에는 내 게임 기록이나 답변이 포함되지 않아요.'), 'live consumer bundle must invite a friend without transmitting the player result');
    assert.ok(consumerBundle.includes('피로가 몇 주째 이어지거나 일상에 지장을 준다면') && consumerBundle.includes('불편이 계속되면 의료진에게 현재 상황을 설명해 보세요.'), 'live consumer bundle must include the concise, expandable care-seeking guide');
    assert.ok(consumerBundle.includes('건강 상태를 검사한 결과가 아니라, 다섯 질문에 고른 답을 정리한 기록이에요.'), 'live consumer bundle must explain the personal answer score without implying a health measurement');
    assert.ok(consumerBundle.includes('집중과 휴식 관련 연구 쉽게 보기'), 'live consumer bundle must include the secondary health evidence section');
    assert.ok(consumerBundle.includes('61개 연구') && consumerBundle.includes('267개 연구') && consumerBundle.includes('21개 연구'), 'live consumer bundle must include evidence scale markers');
    assert.ok(!consumerBundle.includes('발효가바가 무엇인지 30초'), 'live consumer bundle still contains the retired teaser duration promise');
    assert.ok(robotsText.includes(`Sitemap: ${base}/sitemap.xml`), 'live robots.txt must point to the current public sitemap');
    assert.match(robotsText, new RegExp(`Disallow: ${escapeRegExp(routePath('admin'))}\\nDisallow: ${escapeRegExp(routePath('ops'))}`), 'live robots.txt must keep internal paths out of discovery');
    assert.match(adminRoute.text, /<meta[^>]+name="robots"[^>]+content="noindex, nofollow"/i, 'live 404 page must keep missing and internal routes out of search indexes');
    assert.ok(!/<link[^>]+rel="canonical"|<meta[^>]+property="og:(?:url|title|image)"/i.test(adminRoute.text), 'live 404 page must not reuse public canonical or social metadata');
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
    assert.equal(metaContent(pageText, 'property', 'og:image:type'), 'image/png', 'live root Open Graph image type is invalid');
    assert.equal(metaContent(pageText, 'property', 'og:image:width'), '1200', 'live root Open Graph image width is invalid');
    assert.equal(metaContent(pageText, 'property', 'og:image:height'), '630', 'live root Open Graph image height is invalid');
    assert.equal(metaContent(researchPageText, 'property', 'og:image:type'), 'image/png', 'live research Open Graph image type is invalid');
    assert.equal(metaContent(researchPageText, 'property', 'og:image:width'), '1200', 'live research Open Graph image width is invalid');
    assert.equal(metaContent(researchPageText, 'property', 'og:image:height'), '630', 'live research Open Graph image height is invalid');
    assert.equal(metaContent(productSharePageText, 'property', 'og:image:type'), 'image/png', 'live product Open Graph image type is invalid');
    assert.equal(metaContent(productSharePageText, 'property', 'og:image:width'), '1200', 'live product Open Graph image width is invalid');
    assert.equal(metaContent(productSharePageText, 'property', 'og:image:height'), '630', 'live product Open Graph image height is invalid');
    const productSchema = jsonLd(productSharePageText);
    const productSchemaNode = Array.isArray(productSchema?.['@graph']) ? productSchema['@graph'].find(node => node?.['@type'] === 'Product') : null;
    assert.ok(productSchema?.['@context'] === 'https://schema.org' && productSchemaNode?.name === '셀핀다 가바 1500' && !('category' in productSchemaNode), 'live product page Product structured data is missing or contains unverified classification');
    assert.equal(productSchemaNode.image, `${base}/assets/product-composition-1500.png`, 'live product Product image is invalid');
    assert.equal(productSchemaNode.sameAs, approvedSmartStoreUrl, 'live product Product destination is invalid');
    assert.ok(!productSchemaNode.offers && !productSchemaNode.aggregateRating && !productSchemaNode.review, 'live product Product structured data must not invent price, rating or review claims');
    assert.equal(canonicalHref(focusPageText), `${base}/focus/`, 'live focus invite canonical URL is invalid');
    assert.equal(metaContent(focusPageText, 'property', 'og:url'), `${base}/focus/`, 'live focus invite Open Graph URL is invalid');
    assert.equal(metaContent(focusPageText, 'property', 'og:title'), '“너도 해봐” 뇌컨디션 확인 챌린지', 'live focus invite Open Graph title is invalid');
    assert.equal(metaContent(focusPageText, 'property', 'og:image'), `${base}/assets/focus-game-card-v5.png`, 'live focus invite Open Graph image is invalid');
    assert.equal(metaContent(focusPageText, 'property', 'og:site_name'), '셀핀다 발효가바', 'live focus invite Open Graph site name is invalid');
    assert.ok(focusPageText.includes('focus=1') && focusPageText.includes('#focus-game'), 'live focus invite must hand off to the explained game without auto-start');
    assert.ok(focusPageText.includes('24개') && focusPageText.includes('먼저 연습하고 시작하기') && focusPageText.includes('초록 신호는 누르고 빨강 신호는 기다려요'), 'live focus invite must explain the randomized game before the user starts it');
    const focusGameCardResponse = await request('/assets/focus-game-card-v5.png');
    assert.equal(focusGameCardResponse.status, 200, 'live focus invite card image must be available');
    assert.match(pageText, new RegExp(`<script type="application\\/ld\\+json">\\{"@context":"https:\\/\\/schema\\.org","@type":"WebSite","name":"셀핀다 발효가바","url":"${escapeRegExp(`${base}/`)}"[^<]*"inLanguage":"ko-KR"\\}<\\/script>`), 'live root WebSite structured data is invalid');
    for (const [index, id] of sharedResultIds.entries()) {
      const sharePage = sharePageTexts[index] || '';
      validatePublicMetadata(sharePage, `/share/${id}/`, `${base}/share/${id}/`);
      assert.match(metaContent(sharePage, 'property', 'og:title'), /^공유받은 하루 리듬:/, `share page ${id} is missing an Open Graph title`);
      assert.match(metaContent(sharePage, 'property', 'og:title'), new RegExp(`^공유받은 하루 리듬: ‘${sharedResultLabels[id]} ·`), `share page ${id} must connect its image label to consumer wording`);
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
    assert.equal(content.products[0].category, '판매처 표기 기준 · 기타가공품', 'live export must keep the product type source-qualified until label confirmation');
    assert.equal(content.products[0].name, '셀핀다 가바 1500', 'live product must use the current confirmed product name');
    assert.equal(content.products[0].servings, 30, 'live product must preserve the confirmed package count');
    assert.ok(!('amountMg' in content.products[0]) && !('totalG' in content.products[0]), 'live export must not imply unverified per-packet GABA or net-content values');
    assert.equal(content.products[0].officialUrl, approvedSmartStoreUrl, 'live product must point to the Smart Store 1500 product');
    assert.equal(content.reviews.length, 1, 'live export must contain the approved Smart Store review destination');
    assert.equal(content.reviews[0].id, 'shop-review-destination-1500', 'live review destination must be the approved GABA 1500 record');
    assert.ok(isSmartStoreReview(content.reviews[0].sourceUrl), 'live review destination must deep-link to the Smart Store 1500 review dialog');
    assert.equal(content.reviews[0].publicText, approvedReviewText, 'live review destination must keep the approved consumer message');
    assert.ok(['HOLD', 'PREVIEW', 'APPROVED'].includes(teaserPreview.status), 'live teaser preview must expose a supported approval state');
    if (teaserPreview.status === 'HOLD') assert.equal(teaserPreview.url, null, 'live teaser HOLD state must not expose an external preview URL');
    if (teaserPreview.status === 'PREVIEW') assert.equal(teaserPreview.url, 'https://fermented-gaba-documentary-20260903.dubaissday.chatgpt.site/', 'live teaser preview must use the supplied HTTPS URL');
    assert.equal(teaserPreview.placement, '선택형 보조 CTA · 리듬 체크 다음', 'live teaser preview must keep the approved placement');
    assert.ok(!/제한적|매우 제한적|결과가 일치하지|정량 메타분석|다만 GABA만의 효과|이상사례|유의하지 않음/i.test(JSON.stringify({content, master})), 'live public research data contains blocked negative marketing copy');
    assert.ok(!/cellpinda\.co\.kr|cellpindamall\.com|공식몰/i.test(JSON.stringify(content)), 'live public content contains a legacy official-mall destination');
    for (const claim of content.claims.filter(item => ['product-1500', 'fermentation-listed'].includes(item.id))) assert.ok(claim.sources?.every(source => isSmartStore(source.url)), `live product claim ${claim.id} must use the Smart Store source only`);
    assert.ok(!content.products.some(item => item.id === 'gaba750' || String(item.name || '').includes('750')), 'live export contains removed 750 product');
    const publicResearchIds=new Set(content.claims.filter(claim=>claim.id?.startsWith('research-')).map(claim=>claim.id));
    const masterResearchIds=new Set(master.records.map(record=>record.id));
    assert.equal(master.records.length,publicResearchIds.size,'live master index and public research claims must have the same record count');
    assert.equal(master.records.length,masterResearchIds.size,'live master index must not duplicate research records');
    assert.ok([...masterResearchIds].every(id=>publicResearchIds.has(id)),'live master index must match the public research claim IDs');
    assert.ok(!publicResearchIds.has('research-yoon-2022'),'live export must keep the unresolved Yoon study on hold');
    assert.ok(!publicResearchIds.has('research-steenbergen-2015'),'live export must keep the retracted Steenbergen study on hold');
    for (const [path, snapshot] of internalSnapshots) {
      let parsed = false;
      if (snapshot.status === 200) {
        try { JSON.parse(snapshot.text); parsed = true; } catch { /* static host fallback HTML is not an operations packet */ }
      }
      assert.equal(parsed, false, 'live public site must not expose internal operations snapshot ' + path);
    }
    const required = ['research-review-2020', 'research-yoto-2012', 'research-yamatsu-2016', 'research-powers-2008'];
    for (const id of required) assert.ok(master.records.some(record => record.id === id), 'live master index is missing ' + id);
    const claimsById = new Map(content.claims.map(claim => [claim.id, claim]));
    for (const record of master.records) {
      const claim = claimsById.get(record.id);
      assert.ok(claim, `live claim is missing for ${record.id}`);
      assert.equal(record.evidenceHash, claim.evidenceHash, `live provenance mismatch for ${record.id}`);
    assert.equal(record.reviewedAt, claim.reviewedAt, `live review date mismatch for ${record.id}`);
    }
    console.log(JSON.stringify({base, runtimeMode: runtimeMode.toUpperCase(), attempt, page: 200, heroImage: 'webp-ready', candidateSha: releaseManifest.candidateSha, generatedAt: releaseManifest.generatedAt, bundleHashes: bundleHashCount, claims: content.claims.length, masterRecords: master.records.length, products: content.products.length, sharePages: sharedResultIds.length, teaserPreview: {status: teaserPreview.status, publicUrl: Boolean(teaserPreview.url)}, internalOpsSnapshots: 'excluded', smartStoreOnly: true, removed750: true, provenance: 'matched'}));
    lastError = undefined;
    break;
  } catch (error) {
    lastError = error;
    if (attempt < 12) await sleep(5000);
  }
}
if (lastError) throw new Error(`Live public smoke check failed after 12 attempts: ${lastError instanceof Error ? lastError.message : lastError}`);
