import { resultTypes, type RhythmId } from '../src/domain/rhythm.ts';

// Exact deployed origin only. Never trust Host, Forwarded or arbitrary *.workers.dev hosts.
export const PUBLIC_ORIGIN='https://cellpinda-rhythm.marshy-shear.workers.dev';
const TRUSTED_ORIGINS=new Set([PUBLIC_ORIGIN,...['localhost','127.0.0.1'].flatMap(host=>[8787,8788,5173,4173].map(port=>`http://${host}:${port}`))]);
const RHYTHMS=new Set<string>(['active','irregular','unrested','steady']);
const escape=(text:string)=>text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll("'",'&#39;');

export function socialMetadata(requestUrl:string) {
  const url=new URL(requestUrl);
  const origin=TRUSTED_ORIGINS.has(url.origin)?url.origin:PUBLIC_ORIGIN;
  const admin=url.pathname==='/admin' || url.pathname.startsWith('/admin/');
  const values=url.searchParams.getAll('rhythm');
  const type=!admin && url.pathname==='/' && values.length===1 && RHYTHMS.has(values[0])?values[0] as RhythmId:null;
  const title=admin?'콘텐츠 검토실 | Cellpinda':type?`공유받은 하루 리듬: ‘${resultTypes[type].name}’ | Cellpinda`:'오늘, 내 뇌는 쉴 틈이 있었을까? | Cellpinda';
  const description=admin?'셀핀다 콘텐츠 운영자를 위한 검토실입니다.':type?`공유받은 ‘${resultTypes[type].name}’의 이야기를 살펴보세요. 링크를 연 사람의 결과가 아니며, 의학적 진단이나 체내 GABA 측정이 아닙니다.`:'나의 하루 리듬을 돌아보고, GABA 이야기와 셀핀다 발효 가바 제품을 알아보세요.';
  const canonical=`${origin}/${type?`?rhythm=${type}`:''}`;
  return {title,description,canonical,image:`${origin}/assets/social-card.png`,imageAlt:'Cellpinda — 오늘의 하루 리듬과 GABA 이야기',robots:admin?'noindex, nofollow, noarchive':'index, follow',admin,type};
}

export function socialTags(meta:ReturnType<typeof socialMetadata>) {
  const tag=(key:string,value:string,property=false)=>`<meta ${property?'property':'name'}="${key}" content="${escape(value)}">`;
  return [tag('description',meta.description),tag('robots',meta.robots),tag('og:type','website',true),tag('og:site_name','Cellpinda',true),tag('og:locale','ko_KR',true),tag('og:title',meta.title,true),tag('og:description',meta.description,true),tag('og:url',meta.canonical,true),tag('og:image',meta.image,true),tag('og:image:width','1200',true),tag('og:image:height','630',true),tag('og:image:alt',meta.imageAlt,true),tag('twitter:card','summary_large_image'),tag('twitter:title',meta.title),tag('twitter:description',meta.description),tag('twitter:image',meta.image),tag('twitter:image:alt',meta.imageAlt),`<link rel="canonical" href="${escape(meta.canonical)}">`].join('');
}

export function rewriteSocialHtml(request:Request,response:Response):Response {
  if(!response.headers.get('content-type')?.includes('text/html'))return response;
  const meta=socialMetadata(request.url);
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
