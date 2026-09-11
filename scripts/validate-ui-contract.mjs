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
const researchStyles = await read('src/components/ResearchLibrary.css');
const reviewStyles = await read('src/components/ReviewExperience.css');
const teaser = await read('src/components/TeaserPreview.tsx');
const indexHtml = await read('index.html');
const fail = message => { throw new Error(`UI contract invalid: ${message}`); };
const requireMatch = (source, pattern, label) => { if (!pattern.test(source)) fail(label); };

for (const id of ['main', 'rhythm', 'story', 'fermentation', 'products', 'reviews', 'research']) {
  requireMatch(app, new RegExp(`(?:id|href)=["']#?${id}["']`), `consumer section or link ${id} is missing`);
}
requireMatch(app, /<main id="main">/, 'main landmark is missing');
requireMatch(app, /className="skip" href="#main"/, 'keyboard skip link is missing');
requireMatch(app, /<nav aria-label="주 메뉴"/, 'consumer navigation label is missing');
const nav = app.match(/<nav[\s\S]*?<\/nav>/)?.[0] || '';
if (/ops|admin|account|운영판|관리자/i.test(nav)) fail('internal routes leaked into consumer navigation');
for (const marker of ['오늘도 몸보다', '1분 리듬 체크 시작', 'GABA는 신경 신호', '스마트스토어']) {
  requireMatch(app, new RegExp(marker), `consumer value proposition marker ${marker} is missing`);
}
requireMatch(app, /gaba-master-index\.json/, 'consumer research fallback link is missing');
requireMatch(rhythm, /(?:window\.)?setTimeout\(\(\) => \{[\s\S]*?next\(value\)[\s\S]*?\}, 180\)/, 'touch answers must auto-advance to the next question');
requireMatch(app, /<img[^>]+alt=\{/, 'product and hero images must expose alternative text');
requireMatch(rhythm, /navigator\.share|copyLink/, 'result sharing fallback is missing');
requireMatch(rhythm, /share\/(?:\$\{type\.id\}|type\.id)/, 'result-specific share URL is missing');
requireMatch(rhythmStyles, /rhythm-mobile-share-bar[\s\S]*?position:fixed/, 'mobile result share bar is missing');
requireMatch(rhythmStyles, /rhythm-experience:has\(\.rhythm-mobile-share-bar\)[\s\S]*?padding-bottom/, 'mobile share bar content clearance is missing');
requireMatch(rhythmStyles, /@media\(prefers-reduced-motion:reduce\)/, 'reduced-motion rule is missing');
requireMatch(styles, /@media\(max-width:680px\)/, 'mobile layout breakpoint is missing');
requireMatch(styles, /@media\(prefers-reduced-motion:reduce\)/, 'global reduced-motion rule is missing');
requireMatch(styles, /\.hero-question,[\s\S]*?font-size:\s*16px;\s*line-height:\s*1\.75/, 'core consumer copy must be at least 16px on mobile');
requireMatch(rhythm, /touch-action|autoAdvance/, 'rhythm touch interaction contract is missing');
requireMatch(rhythmStyles, /font-size:\s*16px;\s*line-height:\s*1\.75/, 'rhythm copy must be at least 16px on mobile');
requireMatch(researchStyles, /research-library-consumer-summary[\s\S]*?font-size:\s*16px;\s*line-height:\s*1\.75/, 'research copy must be at least 16px on mobile');
requireMatch(reviewStyles, /review-quote-card p:not\(\.review-quote-label\)[\s\S]*?font-size:\s*16px;\s*line-height:\s*1\.75/, 'review copy must be at least 16px on mobile');
requireMatch(challenge, /challenge_start|challenge_day_complete|seven_day_complete/, 'challenge measurement events are missing');
for (const event of ['hero_check_start', 'rhythm_check_complete', 'result_share_click', 'result_share_success', 'friend_check_start', 'product_compare_view', 'review_source_click', 'purchase_cta_click', 'challenge_start', 'challenge_day_complete', 'seven_day_complete']) {
  requireMatch(app + rhythm + challenge, new RegExp(event), `required measurement event ${event} is missing`);
}
requireMatch(teaser, /allow="autoplay; fullscreen; picture-in-picture"/, 'teaser autoplay permission is missing');
requireMatch(teaser, /loading="eager"/, 'teaser must load eagerly when exposed');
requireMatch(indexHtml, /<noscript[\s>]/i, 'static no-script fallback is missing');
requireMatch(indexHtml, /rel="canonical" href="https:\/\/kradavid\.github\.io\/cellpinda_GABA\//, 'root canonical metadata is missing');
requireMatch(indexHtml, /property="og:url" content="https:\/\/kradavid\.github\.io\/cellpinda_GABA\//, 'root Open Graph URL is missing');
if (/cellpinda\.co\.kr|cellpindamall\.com|공식몰/i.test(app + indexHtml)) fail('legacy official-mall destination leaked into consumer source');

const shareRoot = resolve(root, 'public/share');
const shareIds = ['active', 'sleep', 'irregular', 'sensory', 'unrested', 'steady'];
for (const id of shareIds) {
  const page = resolve(shareRoot, id, 'index.html');
  if (!existsSync(page)) fail(`share page ${id} is missing`);
  const html = await readFile(page, 'utf8');
  requireMatch(html, new RegExp(`canonical" href="https:\\/\\/kradavid\\.github\\.io\\/cellpinda_GABA\\/share\\/${id}\\/`), `share page ${id} canonical metadata is missing`);
  requireMatch(html, new RegExp(`rhythm=${id}`), `share page ${id} handoff is missing`);
  requireMatch(html, /og:image/, `share page ${id} Open Graph image is missing`);
}

console.log(JSON.stringify({status: 'ok', sections: ['main', 'rhythm', 'story', 'fermentation', 'products', 'reviews', 'research'], events: 11, accessibility: ['skip-link', 'landmarks', 'alt-text', 'reduced-motion'], mobile: ['responsive-breakpoint', 'readable-body-copy', 'share-bar-clearance'], teaser: ['autoplay-permission', 'eager-load'], seo: ['canonical', 'og-url']}));
