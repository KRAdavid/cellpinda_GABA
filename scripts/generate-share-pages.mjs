import fs from 'node:fs';
import path from 'node:path';

const shareTypes = [
  ['active', '퇴근 뒤에도 일이 생각나는 날'],
  ['sleep', '누워도 잠이 오지 않았던 날'],
  ['irregular', '하루에 쉴 틈이 부족했던 날'],
  ['sensory', '사람과 화면에 지친 날'],
  ['unrested', '아침에도 피곤했던 날'],
  ['steady', '잠과 휴식이 괜찮았던 날'],
];
const shareRoot = path.resolve('public/share');
const siteRoot = 'https://kradavid.github.io/cellpinda_GABA';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function pngDimensions(filePath) {
  const image = fs.readFileSync(filePath);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (image.length < 24 || !image.subarray(0, 8).equals(signature)) throw new Error(`Share image is not a valid PNG: ${filePath}`);
  return {width: image.readUInt32BE(16), height: image.readUInt32BE(20)};
}

fs.rmSync(shareRoot, { recursive: true, force: true });
for (const [id, name] of shareTypes) {
  const directory = path.join(shareRoot, id);
  fs.mkdirSync(directory, { recursive: true });
  const safeName = escapeHtml(name);
  const imagePath = path.resolve('public', 'assets', `social-rhythm-${id}.png`);
  const {width: imageWidth, height: imageHeight} = pngDimensions(imagePath);
  const image = `${siteRoot}/assets/social-rhythm-${id}.png`;
  const canonical = `${siteRoot}/share/${id}/`;
  const destination = `../../?rhythm=${id}`;
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `공유받은 하루 리듬: ‘${name}’ | Cellpinda`,
    url: canonical,
    description: `공유받은 ‘${name}’ 생활 기록이에요. 건강 검사가 아니며, 내 하루도 1분이면 확인해 보세요.`,
    inLanguage: 'ko-KR',
    isPartOf: { '@type': 'WebSite', url: `${siteRoot}/` },
  }).replace(/</g, '\\u003c');
  const html = `<!doctype html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>공유받은 하루 리듬: ‘${safeName}’ | Cellpinda</title>
<meta name="description" content="공유받은 ‘${safeName}’ 생활 기록이에요. 건강 검사가 아니며, 내 하루도 1분이면 확인해 보세요.">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website"><meta property="og:site_name" content="셀핀다 발효가바"><meta property="og:locale" content="ko_KR"><meta property="og:url" content="${canonical}"><meta property="og:title" content="공유받은 하루 리듬: ‘${safeName}’ | Cellpinda"><meta property="og:description" content="공유받은 ‘${safeName}’ 생활 기록이에요. 건강 검사가 아니며, 내 하루도 1분이면 확인해 보세요."><meta property="og:image" content="${image}"><meta property="og:image:type" content="image/png"><meta property="og:image:alt" content="${safeName} 하루 리듬 공유 카드"><meta property="og:image:width" content="${imageWidth}"><meta property="og:image:height" content="${imageHeight}"><script type="application/ld+json">${structuredData}</script>
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="공유받은 하루 리듬: ‘${safeName}’ | Cellpinda"><meta name="twitter:description" content="공유받은 ‘${safeName}’ 생활 기록이에요. 건강 검사가 아니며, 내 하루도 1분이면 확인해 보세요."><meta name="twitter:image" content="${image}">
<meta http-equiv="refresh" content="0;url=${destination}"></head><body><main><p>공유받은 하루 리듬 이야기를 여는 중입니다.</p><p><a href="${destination}">리듬 이야기 열기</a></p></main><script>
(function(){const target=new URL('../../',location.href);target.searchParams.set('rhythm','${id}');for(const key of ['ref','campaign']){const value=new URLSearchParams(location.search).get(key)||'';if(/^[A-Za-z0-9_-]{1,64}$/.test(value))target.searchParams.set(key,value);}location.replace(target.toString());})();
</script></body></html>
`;
  fs.writeFileSync(path.join(directory, 'index.html'), html, 'utf8');
}

const siteProductsRoot = path.resolve('public/products');
const ledger = JSON.parse(fs.readFileSync(path.resolve('data/content-ledger.json'), 'utf8'));
const product = ledger.products.find(item => item.id === 'gaba1500');
if (!product) throw new Error('Approved GABA 1500 product is required to generate its share page.');
fs.mkdirSync(siteProductsRoot, { recursive: true });
const productTitle = `셀핀다 가바 1500 · ${product.servings}포 구성 보기`;
const productDescription = `셀핀다 가바 1500 · ${product.servings}포 구성. 낱포 표시와 가격·재고는 스마트스토어에서 확인해 보세요.`;
const productCanonical = `${siteRoot}/products/`;
const productImage = `${siteRoot}/assets/product-composition-1500.png`;
const productStoreUrl = product.officialUrl;
const productDestination = '../?view=products#products';
const productSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: productTitle,
  url: productCanonical,
  description: productDescription,
  inLanguage: 'ko-KR',
  isPartOf: { '@type': 'WebSite', url: `${siteRoot}/` },
}).replace(/</g, '\\u003c');
const productShareHtml = `<!doctype html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(productTitle)}</title><meta name="description" content="${escapeHtml(productDescription)}">
<link rel="canonical" href="${productCanonical}"><meta name="robots" content="index,follow">
<meta property="og:type" content="product"><meta property="og:site_name" content="셀핀다 발효가바"><meta property="og:locale" content="ko_KR"><meta property="og:url" content="${productCanonical}"><meta property="og:title" content="${escapeHtml(productTitle)}"><meta property="og:description" content="${escapeHtml(productDescription)}"><meta property="og:image" content="${productImage}"><meta property="og:image:alt" content="셀핀다 가바 1500, ${product.servings}포 한 상자 구성 안내">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(productTitle)}"><meta name="twitter:description" content="${escapeHtml(productDescription)}"><meta name="twitter:image" content="${productImage}">
<script type="application/ld+json">${productSchema}</script><link rel="icon" type="image/svg+xml" href="../favicon.svg">
<meta http-equiv="refresh" content="0;url=${productDestination}"></head><body>
<main style="max-width:720px;margin:0 auto;padding:40px 24px;font-family:Arial,'Malgun Gothic',sans-serif;line-height:1.7;color:#18382b">
<p>셀핀다 발효가바 · 제품 구성</p><h1>${escapeHtml(productTitle)}</h1>
<img src="../assets/product-composition-1500.svg" alt="셀핀다 가바 1500, ${product.servings}포 한 상자 구성 안내" style="display:block;width:min(100%,560px);height:auto;margin:24px auto">
<p>셀핀다 가바 1500 · ${product.servings}포 구성입니다. 낱포 표시는 제품 포장에서, 가격과 재고는 스마트스토어에서 확인해 주세요.</p>
<p><a href="${productDestination}" style="color:#158457;font-weight:700">사이트에서 제품 구성 보기 →</a></p>
<p><a href="${escapeHtml(productStoreUrl)}" style="color:#158457;font-weight:700">스마트스토어에서 판매 정보 보기 ↗</a></p>
</main><script>(function(){const target=new URL('../',location.href);target.searchParams.set('view','products');for(const key of ['ref','campaign']){const value=new URLSearchParams(location.search).get(key)||'';if(/^[A-Za-z0-9_-]{1,64}$/.test(value))target.searchParams.set(key,value);}target.hash='products';location.replace(target.toString());})()</script>
</body></html>
`;
fs.writeFileSync(path.join(siteProductsRoot, 'index.html'), productShareHtml, 'utf8');
console.log(JSON.stringify({ generated: shareTypes.length, directory: 'public/share', ids: shareTypes.map(([id]) => id), productSharePage: 'public/products/index.html' }));
