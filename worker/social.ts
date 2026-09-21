import { resultTypes, type RhythmId } from '../src/domain/rhythm.ts';

// Exact deployed origin only. Never trust Host, Forwarded or arbitrary *.workers.dev hosts.
export const PUBLIC_ORIGIN='https://cellpinda-rhythm.marshy-shear.workers.dev';
const LOCAL_ORIGINS=['localhost','127.0.0.1'].flatMap(host=>[8787,8788,5173,4173].map(port=>`http://${host}:${port}`));
const normalizePublicOrigin=(value:unknown)=>{
  const raw=String(value ?? PUBLIC_ORIGIN).trim();
  try {
    const parsed=new URL(raw);
    if(parsed.protocol!=='https:' || parsed.username || parsed.password || parsed.search || parsed.hash) return PUBLIC_ORIGIN;
    parsed.pathname=parsed.pathname.replace(/\/+$/,'') || '/';
    return parsed.href.replace(/\/$/,'');
  } catch { return PUBLIC_ORIGIN; }
};
const RHYTHMS=new Set<string>(Object.keys(resultTypes));
const escape=(text:string)=>text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll("'",'&#39;');

export function socialMetadata(requestUrl:string,configuredOrigin?:string) {
  const url=new URL(requestUrl);
  const publicOrigin=normalizePublicOrigin(configuredOrigin);
  const trustedOrigins=new Set([publicOrigin,...LOCAL_ORIGINS]);
  const origin=trustedOrigins.has(url.origin)?url.origin:publicOrigin;
  const views=url.searchParams.getAll('view');
  const account=url.pathname==='/account' || url.pathname.startsWith('/account/') || (url.pathname==='/' && views.length===1 && views[0]==='account');
  const admin=account || url.pathname==='/admin' || url.pathname.startsWith('/admin/');
  const values=url.searchParams.getAll('rhythm');
  const productView=!admin && url.pathname==='/' && views.length===1 && views[0]==='products' && values.length===0;
  const researchView=!admin && url.pathname==='/' && views.length===1 && views[0]==='research' && values.length===0;
  const type=!admin && url.pathname==='/' && views.length===0 && values.length===1 && RHYTHMS.has(values[0])?values[0] as RhythmId:null;
  const title=account?'내 리듬 기록 | Cellpinda':admin?'콘텐츠 검토실 | Cellpinda':productView?'셀핀다 가바 제품 구성 비교 | Cellpinda':researchView?'사람을 대상으로 한 GABA 연구를 쉽게 보기 | 셀핀다':type?`공유받은 하루 리듬: ‘${resultTypes[type].shareLabel} · ${resultTypes[type].name}’ | Cellpinda`:'오늘, 내 뇌는 쉴 틈이 있었을까? | Cellpinda';
  const description=account?'내가 저장한 하루 리듬 기록을 확인합니다.':admin?'셀핀다 콘텐츠 운영자를 위한 검토실입니다.':productView?'1포 내용량과 구성을 확인하고 스마트스토어에서 구매 조건을 살펴보세요.':researchView?'잠·스트레스·머리를 많이 쓴 뒤 관찰한 내용을 그림과 쉬운 말로 정리했어요. 셀핀다 완제품 연구와는 다른 자료입니다.':type?`공유받은 ‘${resultTypes[type].shareLabel} · ${resultTypes[type].name}’의 이야기를 살펴보세요. 링크를 연 사람의 결과가 아니며, 의학적 진단이나 체내 GABA 측정이 아닙니다.`:'나의 하루 리듬을 돌아보고, GABA 이야기와 셀핀다 발효 가바 제품을 알아보세요.';
  const canonical=account ? `${origin}/account` : productView ? `${origin}/products/` : researchView ? `${origin}/research/` : `${origin}/${type?`?rhythm=${type}`:''}`;
  const image=productView ? `${origin}/assets/product-composition-1500.png` : `${origin}/assets/${type ? `social-rhythm-${type}.png` : 'social-card.png'}`;
  const imageAlt=productView ? '셀핀다 가바 1500, 30포 한 상자 구성 안내' : type ? `Cellpinda — ${resultTypes[type].shareLabel} · ${resultTypes[type].name} 하루 리듬` : 'Cellpinda — 오늘의 하루 리듬과 GABA 이야기';
  return {title,description,canonical,image,imageAlt,robots:admin?'noindex, nofollow, noarchive':'index, follow',admin,type,view:productView?'products':researchView?'research':null};
}

export function socialTags(meta:ReturnType<typeof socialMetadata>) {
  const tag=(key:string,value:string,property=false)=>`<meta ${property?'property':'name'}="${key}" content="${escape(value)}">`;
  return [tag('description',meta.description),tag('robots',meta.robots),tag('og:type',meta.view==='products'?'product':'website',true),tag('og:site_name','셀핀다 발효가바',true),tag('og:locale','ko_KR',true),tag('og:title',meta.title,true),tag('og:description',meta.description,true),tag('og:url',meta.canonical,true),tag('og:image',meta.image,true),tag('og:image:type','image/png',true),tag('og:image:width','1200',true),tag('og:image:height','630',true),tag('og:image:alt',meta.imageAlt,true),tag('twitter:card','summary_large_image'),tag('twitter:title',meta.title),tag('twitter:description',meta.description),tag('twitter:image',meta.image),tag('twitter:image:alt',meta.imageAlt),`<link rel="canonical" href="${escape(meta.canonical)}">`].join('');
}

export function rewriteSocialHtml(request:Request,response:Response,configuredOrigin?:string):Response {
  // Static route documents are built with PUBLIC_SITE_URL and already carry
  // route-specific canonical/OG metadata. Only root query views and private
  // account/admin shells need runtime rewriting. Keep 404 documents untouched
  // so an unknown URL cannot acquire a misleading indexable home-page card.
  const pathname=new URL(request.url).pathname.replace(/\/+$/,'') || '/';
  const runtimeMetaPath=pathname==='/' || pathname==='/account' || pathname.startsWith('/account/') || pathname==='/admin' || pathname.startsWith('/admin/');
  if(response.status!==200 || !runtimeMetaPath || !response.headers.get('content-type')?.includes('text/html'))return response;
  const meta=socialMetadata(request.url,configuredOrigin);
  const headers=new Headers(response.headers);
  headers.set('Cache-Control','no-store');
  // Asset validators no longer describe the transformed representation.
  headers.delete('etag');headers.delete('content-length');
  if(meta.admin)headers.set('X-Robots-Tag',meta.robots);
  const html=new Response(response.body,{status:response.status,statusText:response.statusText,headers});
  return new HTMLRewriter()
    .on('meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]',{element(element){element.remove();}})
    .on('title',{element(element){element.setInnerContent(meta.title);}})
    .on('head',{element(element){element.append(socialTags(meta),{html:true});}})
    .transform(html);
}
