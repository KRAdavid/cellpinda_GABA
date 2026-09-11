import {readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';

const root = process.cwd();
const read = relative => readFile(resolve(root, relative), 'utf8');
const app = await read('src/App.tsx');
const styles = await read('src/styles.css');
const rhythm = await read('src/components/RhythmExperience.tsx');
const rhythmStyles = await read('src/components/rhythm.css');
const challenge = await read('src/components/SevenDayChallenge.tsx');
const productShare = await read('src/components/ProductShare.tsx');
const shareDomain = await read('src/domain/share.ts');
const researchStyles = await read('src/components/ResearchLibrary.css');
const reviewStyles = await read('src/components/ReviewExperience.css');
const review = await read('src/components/ReviewExperience.tsx');
const teaser = await read('src/components/TeaserPreview.tsx');
const research = await read('src/components/ResearchLibrary.tsx');
const story = await read('src/components/GabaStory.tsx');
const analyticsConsent = await read('src/components/AnalyticsConsent.tsx');
const analyticsConsentStyles = await read('src/components/AnalyticsConsent.css');
const indexHtml = await read('index.html');
const fail = message => { throw new Error(`UI contract invalid: ${message}`); };
const requireMatch = (source, pattern, label) => { if (!pattern.test(source)) fail(label); };
const approvedSmartStoreUrl = 'https://smartstore.naver.com/cellpinda/products/4701017202';

for (const id of ['main', 'rhythm', 'story', 'fermentation', 'products', 'reviews', 'research']) {
  requireMatch(app, new RegExp(`(?:id|href)=["']#?${id}["']`), `consumer section or link ${id} is missing`);
}
requireMatch(app, /<main id="main">/, 'main landmark is missing');
requireMatch(app, /className="skip" href="#main"/, 'keyboard skip link is missing');
requireMatch(app, /<nav aria-label="주 메뉴"/, 'consumer navigation label is missing');
requireMatch(app, /analyticsConsentGranted/, 'analytics events must be consent-gated');
requireMatch(app, /<AnalyticsConsent\/>/, 'analytics consent control is missing from the consumer footer');
requireMatch(analyticsConsent, /이름·연락처·문항별 답변은 보내지 않습니다/, 'analytics consent copy must state its privacy boundary');
requireMatch(analyticsConsent, /측정 허용|측정하지 않기/, 'analytics consent must provide explicit allow and deny choices');
requireMatch(analyticsConsentStyles, /\.footer \.analytics-consent\{[^}]*flex:0 0 100%/, 'analytics consent must occupy its own full-width footer row');
requireMatch(app, /const isLocalHost = \['localhost', '127\.0\.0\.1', '\[::1\]'\]\.includes\(location\.hostname\)/, 'internal operations route must be local-host gated');
requireMatch(app, /const operationsView = isLocalHost && \(requestedView === 'ops' \|\| currentPath === '\/ops'\)/, 'internal operations route must not render on public hosts');
requireMatch(app, /const adminView = isLocalHost && \(requestedView === 'admin' \|\| currentPath === '\/admin'\)/, 'admin review route must not render on public hosts');
const nav = app.match(/<nav[\s\S]*?<\/nav>/)?.[0] || '';
if (/ops|admin|account|운영판|관리자/i.test(nav)) fail('internal routes leaked into consumer navigation');
if (!/<a href="#products">제품 비교<\/a>/.test(nav)) fail('consumer navigation must expose the product comparison destination');
for (const marker of ['오늘도 몸보다', '1분 리듬 체크 시작', 'GABA는 신경 신호', '스마트스토어']) {
  requireMatch(app, new RegExp(marker), `consumer value proposition marker ${marker} is missing`);
}
requireMatch(app, /gaba-master-index\.json/, 'consumer research fallback link is missing');
requireMatch(research, /핵심은 짧게, 이야기는 펼쳐서/, 'research section must lead with a consumer story');
requireMatch(research, /숫자와 맥락을 더 보기/, 'research detail must use a consumer-friendly label');
requireMatch(research, /다른 주제나 방식을 골라 관련 연구 이야기를 이어서 살펴보세요/, 'research empty state must guide the next consumer action');
requireMatch(indexHtml, /GABA 연구를 쉬운 말로 더 보기/, 'no-script research fallback must use a consumer-friendly label');
requireMatch(story, /쉬운 말과 도표로 정리/, 'GABA story must explain research with a visual aid');
requireMatch(app, /함량 확인/, 'fermentation flow must use a consumer-friendly label');
if (/조건·수치·한계 자세히 보기|연구 조건과 원문 확인하기|수치와 제품 적용 문장은 펼쳐서|연구 카드에서 조건 확인|숫자와 출처 더 보기|근거 식별자|정량분석/.test(app + research + story + indexHtml)) fail('researcher-oriented detail labels leaked into consumer source');
requireMatch(rhythm, /(?:window\.)?setTimeout\(\(\) => \{[\s\S]*?next\(value\)[\s\S]*?\}, 180\)/, 'touch answers must auto-advance to the next question');
requireMatch(app, /<img[^>]+alt=\{/, 'product and hero images must expose alternative text');
requireMatch(rhythm, /navigator\.share|copyLink/, 'result sharing fallback is missing');
requireMatch(rhythm, /share\/(?:\$\{type\.id\}|type\.id)/, 'result-specific share URL is missing');
requireMatch(rhythm, /social-rhythm-\$\{type\.id\}\.png/, 'Kakao share must use a result-specific image');
requireMatch(rhythmStyles, /rhythm-mobile-share-bar[\s\S]*?position:fixed/, 'mobile result share bar is missing');
requireMatch(rhythmStyles, /rhythm-experience:has\(\.rhythm-mobile-share-bar\)[\s\S]*?padding-bottom/, 'mobile share bar content clearance is missing');
requireMatch(rhythmStyles, /@media\(prefers-reduced-motion:reduce\)/, 'reduced-motion rule is missing');
requireMatch(styles, /@media\(max-width:680px\)/, 'mobile layout breakpoint is missing');
requireMatch(styles, /@media\(prefers-reduced-motion:reduce\)/, 'global reduced-motion rule is missing');
requireMatch(styles, /\.hero-question,[\s\S]*?font-size:\s*16px;\s*line-height:\s*1\.75/, 'core consumer copy must be at least 16px on mobile');
requireMatch(rhythm, /touch-action|autoAdvance/, 'rhythm touch interaction contract is missing');
requireMatch(rhythmStyles, /font-size:\s*16px;\s*line-height:\s*1\.75/, 'rhythm copy must be at least 16px on mobile');
requireMatch(researchStyles, /research-library-consumer-summary[\s\S]*?font-size:\s*16px;\s*line-height:\s*1\.75/, 'research copy must be at least 16px on mobile');
requireMatch(researchStyles, /research-library-empty[\s\S]*?font-size:\s*16px;\s*line-height:\s*1\.75/, 'research empty-state copy must be at least 16px');
requireMatch(reviewStyles, /review-quote-card p:not\(\.review-quote-label\)[\s\S]*?font-size:\s*16px;\s*line-height:\s*1\.75/, 'review copy must be at least 16px on mobile');
requireMatch(challenge, /challenge_start|challenge_day_complete|seven_day_complete/, 'challenge measurement events are missing');
requireMatch(shareDomain, /approvedCampaign[\s\S]*?URLSearchParams\(currentSearch\)[\s\S]*?\.get\('campaign'\)/, 'shared campaign tokens must use the approved helper');
requireMatch(productShare, /preserveCampaign\(url,window\.location\.search\)/, 'product share must preserve an approved campaign identifier');
requireMatch(challenge, /preserveCampaign\(url, window\.location\.search\)/, 'challenge share must preserve an approved campaign identifier');
for (const event of ['hero_check_start', 'rhythm_check_complete', 'result_share_click', 'result_share_success', 'friend_check_start', 'product_compare_view', 'review_source_click', 'purchase_cta_click', 'challenge_start', 'challenge_day_complete', 'seven_day_complete']) {
  requireMatch(app + rhythm + challenge, new RegExp(event), `required measurement event ${event} is missing`);
}
requireMatch(teaser, /allow="autoplay; fullscreen; picture-in-picture"/, 'teaser autoplay permission is missing');
requireMatch(teaser, /loading="eager"/, 'teaser must load eagerly when exposed');
requireMatch(app, /발효가바 이야기 영상 보기/, 'hero teaser CTA must use a duration-neutral consumer label');
if (/발효가바가 무엇인지\s*\d+초/.test(app)) fail('hero teaser CTA must not promise an unverified duration');
requireMatch(indexHtml, /<noscript[\s>]/i, 'static no-script fallback is missing');
requireMatch(indexHtml, /<link rel="icon" type="image\/svg\+xml" href="\.\/favicon\.svg"\s*\/>/, 'favicon must resolve under the GitHub Pages subpath');
requireMatch(app + indexHtml, /https:\/\/smartstore\.naver\.com\/cellpinda\/products\/4701017202/, 'Smart Store CTA must target the approved GABA 1500 product detail');
requireMatch(review, /가바 1500 · 스마트스토어 후기 읽기/, 'review CTA must identify the GABA 1500 Smart Store destination');
requireMatch(app, /content\.reviews\?\.length \? <a href="#reviews">후기 읽기/, 'hero product card must expose the approved review destination');
requireMatch(review, /quotes\.length > 0 \|\| destinations\.length > 0/, 'review reading guide must remain visible with an approved Smart Store destination');
requireMatch(indexHtml, /rel="canonical" href="https:\/\/kradavid\.github\.io\/cellpinda_GABA\//, 'root canonical metadata is missing');
requireMatch(indexHtml, /property="og:url" content="https:\/\/kradavid\.github\.io\/cellpinda_GABA\//, 'root Open Graph URL is missing');
requireMatch(indexHtml, /application\/ld\+json[\s\S]*"@type":"WebSite"[\s\S]*"inLanguage":"ko-KR"/, 'root WebSite structured data is missing');
if (/cellpinda\.co\.kr|cellpindamall\.com|공식몰/i.test(app + indexHtml)) fail('legacy official-mall destination leaked into consumer source');
const consumerSource = app + indexHtml + review;
const smartStoreLinks = [...consumerSource.matchAll(/https:\/\/smartstore\.naver\.com\/[A-Za-z0-9_/?=&.%:-]+/g)].map(match => match[0]);
if (!smartStoreLinks.length || smartStoreLinks.some(url => url !== approvedSmartStoreUrl)) {
  fail(`every consumer Smart Store link must be the approved GABA 1500 detail (${approvedSmartStoreUrl})`);
}

const shareRoot = resolve(root, 'public/share');
const shareIds = ['active', 'sleep', 'irregular', 'sensory', 'unrested', 'steady'];
for (const id of shareIds) {
  const page = resolve(shareRoot, id, 'index.html');
  if (!existsSync(page)) fail(`share page ${id} is missing`);
  const html = await readFile(page, 'utf8');
  requireMatch(html, new RegExp(`canonical" href="https:\\/\\/kradavid\\.github\\.io\\/cellpinda_GABA\\/share\\/${id}\\/`), `share page ${id} canonical metadata is missing`);
  requireMatch(html, new RegExp(`rhythm=${id}`), `share page ${id} handoff is missing`);
  requireMatch(html, /og:image/, `share page ${id} Open Graph image is missing`);
  requireMatch(html, /property="og:site_name" content="셀핀다 발효가바"/, `share page ${id} site name metadata is missing`);
  requireMatch(html, /property="og:locale" content="ko_KR"/, `share page ${id} locale metadata is missing`);
  requireMatch(html, /application\/ld\+json[\s\S]*"@type":"WebPage"[\s\S]*"inLanguage":"ko-KR"/, `share page ${id} WebPage structured data is missing`);
}

console.log(JSON.stringify({status: 'ok', sections: ['main', 'rhythm', 'story', 'fermentation', 'products', 'reviews', 'research'], events: 11, accessibility: ['skip-link', 'landmarks', 'alt-text', 'reduced-motion'], mobile: ['responsive-breakpoint', 'readable-body-copy', 'share-bar-clearance'], teaser: ['autoplay-permission', 'eager-load'], seo: ['canonical', 'og-url'], smartStoreLinks: smartStoreLinks.length, smartStoreOnly: true}));
