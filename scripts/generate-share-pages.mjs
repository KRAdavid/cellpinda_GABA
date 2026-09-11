import fs from 'node:fs';
import path from 'node:path';

const shareTypes = [
  ['active', '계속 작동형'],
  ['sleep', '잠자리 전환형'],
  ['irregular', '휴식 공백형'],
  ['sensory', '자극 과부하형'],
  ['unrested', '회복 우선형'],
  ['steady', '안정 리듬형'],
];
const shareRoot = path.resolve('public/share');
const siteRoot = 'https://kradavid.github.io/cellpinda_GABA';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

fs.rmSync(shareRoot, { recursive: true, force: true });
for (const [id, name] of shareTypes) {
  const directory = path.join(shareRoot, id);
  fs.mkdirSync(directory, { recursive: true });
  const safeName = escapeHtml(name);
  const image = `${siteRoot}/assets/social-rhythm-${id}.png`;
  const canonical = `${siteRoot}/share/${id}/`;
  const destination = `../../?rhythm=${id}#rhythm`;
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `공유받은 하루 리듬: ‘${name}’ | Cellpinda`,
    url: canonical,
    description: `공유받은 ‘${name}’의 생활 리듬 이야기를 살펴보고, 내 하루도 1분이면 확인해 보세요.`,
    inLanguage: 'ko-KR',
    isPartOf: { '@type': 'WebSite', url: `${siteRoot}/` },
  }).replace(/</g, '\\u003c');
  const html = `<!doctype html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>공유받은 하루 리듬: ‘${safeName}’ | Cellpinda</title>
<meta name="description" content="공유받은 ‘${safeName}’의 생활 리듬 이야기를 살펴보고, 내 하루도 1분이면 확인해 보세요.">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website"><meta property="og:site_name" content="셀핀다 발효가바"><meta property="og:locale" content="ko_KR"><meta property="og:url" content="${canonical}"><meta property="og:title" content="공유받은 하루 리듬: ‘${safeName}’ | Cellpinda"><meta property="og:description" content="공유받은 ‘${safeName}’의 생활 리듬 이야기를 살펴보고, 내 하루도 1분이면 확인해 보세요."><meta property="og:image" content="${image}"><meta property="og:image:alt" content="${safeName} 하루 리듬 공유 카드"><meta property="og:image:width" content="1080"><meta property="og:image:height" content="1350"><script type="application/ld+json">${structuredData}</script>
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="공유받은 하루 리듬: ‘${safeName}’ | Cellpinda"><meta name="twitter:description" content="공유받은 ‘${safeName}’의 생활 리듬 이야기를 살펴보고, 내 하루도 1분이면 확인해 보세요."><meta name="twitter:image" content="${image}">
<meta http-equiv="refresh" content="0;url=${destination}"></head><body><main><p>공유받은 하루 리듬 이야기를 여는 중입니다.</p><p><a href="${destination}">리듬 이야기 열기</a></p></main><script>
(function(){const target=new URL('../../',location.href);target.searchParams.set('rhythm','${id}');for(const key of ['ref','campaign']){const value=new URLSearchParams(location.search).get(key)||'';if(/^[A-Za-z0-9_-]{1,64}$/.test(value))target.searchParams.set(key,value);}target.hash='rhythm';location.replace(target.toString());})();
</script></body></html>
`;
  fs.writeFileSync(path.join(directory, 'index.html'), html, 'utf8');
}
console.log(JSON.stringify({ generated: shareTypes.length, directory: 'public/share', ids: shareTypes.map(([id]) => id) }));
