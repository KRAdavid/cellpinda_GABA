import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import RhythmExperience from './components/RhythmExperience';
import type {Claim} from './components/ResearchLibrary';
import type {PublicReview} from './components/ReviewExperience';
import {apiEndpoint} from './api-origin';
import {resultTypes, rhythmIdFromUrl} from './domain/rhythm';
import {analyticsConsentGranted} from './domain/analytics-consent';
import {REVIEW_DESTINATION_URL} from './domain/reviews';
// Admin and TF operations are local-only review surfaces. Keep their route
// chunks out of production/static bundles so a public visitor cannot download
// internal labels or API paths even though the server still protects them.
const Admin = import.meta.env.DEV ? lazy(() => import('./components/Admin')) : null;
const MemberRecords=lazy(()=>import('./components/MemberRecords'));
const OperationsMvp=import.meta.env.DEV ? lazy(()=>import('./components/OperationsMvp')) : null;
const ResearchLibrary=lazy(()=>import('./components/ResearchLibrary'));
// Keep the first route payload focused on the hero and one-minute check. The
// long-form story, evidence, commerce, review and challenge sections load as
// independent chunks after the shell is interactive.
const ReviewExperience=lazy(()=>import('./components/ReviewExperience'));
const SevenDayChallenge=lazy(()=>import('./components/SevenDayChallenge'));
const GabaStory=lazy(()=>import('./components/GabaStory'));
const ConsumerGabaReel=lazy(()=>import('./components/ConsumerGabaReel'));
const GabaResearchHighlights=lazy(()=>import('./components/GabaResearchHighlights'));
const BrainLoadEvidence=lazy(()=>import('./components/BrainLoadEvidence'));
const TeaserPreview=lazy(()=>import('./components/TeaserPreview'));
const ProductShare=lazy(()=>import('./components/ProductShare'));
const PurchaseQuestions=lazy(()=>import('./components/PurchaseQuestions'));
const AnalyticsConsent=lazy(()=>import('./components/AnalyticsConsent'));
type Product={id:string;name:string;servings:number;category:string;officialUrl:string;availability?:string;priceDisplay?:string|null};
type Content={claims:Claim[];products:Product[];reviews:PublicReview[]};
const eventMap:Record<string,string>={rhythm_start:'rhythm_check_started',rhythm_complete:'rhythm_check_completed',share_request:'share_requested',share_copy:'share_link_copied',card_download:'share_image_downloaded',purchase_click:'purchase_outbound_clicked',review_open:'review_opened',review_nav:'review_section_navigated',faq_open:'purchase_question_opened',research_highlight_opened:'research_highlight_opened',research_library_opened:'research_library_opened',consumer_reel_impression:'consumer_reel_impression',consumer_reel_step:'consumer_reel_step',consumer_reel_navigation:'consumer_reel_navigation',consumer_reel_cta:'consumer_reel_cta'};
const siteRoot=import.meta.env.BASE_URL;
const asset=(path:string)=>`${siteRoot}${path}`;
function updateStructuredData(value: unknown) {
 const element=document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
 if(element)element.textContent=JSON.stringify(value);
}
function evidenceLinkLabel(url:string): string {
 try {
  const host=new URL(url).hostname.toLowerCase();
  if(host.includes('smartstore.naver.com')) return '스마트스토어 제품 정보 보기 ↗';
  if(host.includes('patents.google.com')) return '특허 문서 보기 ↗';
 } catch { /* keep a neutral label for an unexpected public source */ }
 return '자료 출처 보기 ↗';
}
function productCategoryDisplay(category:string): string {
 const sourcePrefix='판매처 표기 기준 · ';
 return category.startsWith(sourcePrefix)?category.slice(sourcePrefix.length):category;
}
function relativePath(path:string):string{
 const base=siteRoot==='/'?'':siteRoot.replace(/\/$/,'');
 const relative=base&&path.startsWith(base)?path.slice(base.length):path;
 return relative||'/';
}
const flowId=crypto.randomUUID();
const safeQueryValue=(name:string,maxLength=64)=>{const value=new URLSearchParams(window.location.search).get(name)?.trim()||'';return /^[A-Za-z0-9_-]+$/.test(value)&&value.length>=1&&value.length<=maxLength?value:'';};
const campaignId=safeQueryValue('campaign');
const challengeInvite=safeQueryValue('challenge')==='7days';
const referralId=(()=>{const value=safeQueryValue('ref');return value.length>=8?value:'';})();
const sharedRhythmId=rhythmIdFromUrl(new URL(window.location.href));
const seenEvents=new Set<string>();
let eventQueue=Promise.resolve();
function trackOnce(name:string,properties:Record<string,string>={}){if(seenEvents.has(name)||!analyticsConsentGranted())return;seenEvents.add(name);track(name,properties)}
function track(name:string,properties:Record<string,string>={}){
 if(!analyticsConsentGranted())return;
 const endpoint=apiEndpoint('/api/events');
 if(!endpoint)return;
 const enriched={...properties,...(campaignId?{campaignId}:{}),...(referralId?{referralId}:{})};
 eventQueue=eventQueue.then(()=>fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventId:crypto.randomUUID(),flowId,name:eventMap[name]||name,properties:enriched}),keepalive:true}).then(()=>{}).catch(()=>{}));
}
async function fetchContent(url:string, signal:AbortSignal, timeoutMs=8000):Promise<Response>{
 const controller=new AbortController();
 let timedOut=false;
 const abortFromParent=()=>controller.abort();
 signal.addEventListener('abort',abortFromParent,{once:true});
 const timer=window.setTimeout(()=>{timedOut=true;controller.abort()},timeoutMs);
 try{
  return await fetch(url,{signal:controller.signal});
 }catch(error){
  if(signal.aborted)throw error;
  if(timedOut)throw Error('Content request timed out');
  throw error;
 }finally{
  window.clearTimeout(timer);
  signal.removeEventListener('abort',abortFromParent);
 }
}
async function loadContent(signal:AbortSignal):Promise<Content>{
 const loadStaticContent=async():Promise<Content>=>{
  const fallback=await fetchContent(`${import.meta.env.BASE_URL}data/content.json`,signal);
  if(!fallback.ok)throw Error('Content unavailable');
  const contentType=fallback.headers.get('content-type')?.toLowerCase()||'';
  if(!contentType.includes('json'))throw Error('Content response was not JSON');
  return fallback.json();
 };
 const endpoint=apiEndpoint('/api/content');
 if(endpoint){
  try{
   const api=await fetchContent(endpoint,signal);
   const contentType=api.headers.get('content-type')?.toLowerCase()||'';
   if(api.ok&&contentType.includes('json'))return api.json();
   // A directly started Vite server has no API proxy and serves the app shell
   // for /api/content. In development only, use the same reviewed public
   // export that static hosting serves. Production Worker failures remain
   // visible instead of silently masking an unavailable runtime API.
   if(import.meta.env.DEV&&api.ok&&contentType.includes('text/html'))return loadStaticContent();
  }catch(error){
   if((error as Error).name==='AbortError')throw error;
  }
  throw Error('Content API unavailable');
 }
 return loadStaticContent();
}
function ContentFallback({loading,onRetry}:{loading:boolean;onRetry:()=>void}){
 return <section className="section wrap content-status" aria-live="polite"><p className="chapter">셀핀다 발효가바</p><h2>{loading?'정보를 불러오고 있어요.':'연결이 잠시 늦어졌어요.'}</h2><p>{loading?'제품과 연구 정보를 불러오는 중입니다.':'1분 체크는 바로 할 수 있어요. 아래에서 GABA와 제품 정보를 먼저 살펴보세요.'}</p>{!loading?<div className="actions"><a className="button outline" href="https://smartstore.naver.com/cellpinda/products/4701017202" target="_blank" rel="noopener noreferrer">스마트스토어 제품 보기 ↗</a><button type="button" className="button outline" onClick={onRetry}>다시 불러오기</button></div>:null}{!loading?<div className="content-status-grid"><article id="story"><p className="chapter">GABA는?</p><h3>뇌세포 사이에서 신호를 주고받는 데 쓰이는 물질</h3><p>GABA는 뇌세포 사이에서 신호를 주고받는 과정에 쓰이는 물질 중 하나예요.</p></article><article id="fermentation"><p className="chapter">발효가바는?</p><h3>발효가바를 쉽게 알아보기</h3><p>발효가바를 만드는 방법과 확인 자료를 쉽게 소개해요.</p></article><article id="products"><p className="chapter">제품 구성</p><h3>셀핀다 가바 1500 · 30포 구성</h3><p>낱포 표시와 먹는 방법은 제품 포장에서, 가격과 재고는 스마트스토어에서 확인해 보세요.</p><a className="text-link" href="https://smartstore.naver.com/cellpinda/products/4701017202" target="_blank" rel="noopener noreferrer">스마트스토어에서 제품 보기 ↗</a></article><article id="reviews"><p className="chapter">구매자 후기</p><h3>가바 1500 구매자 후기</h3><p>스마트스토어에서 구매한 사람들의 후기를 읽어보세요.</p></article><article id="research"><p className="chapter">연구 이야기</p><h3>사람 연구에서 무엇을 살펴봤나요?</h3><p>GABA와 잠·스트레스·운동에 관한 연구를 쉬운 말로 정리했어요.</p><ul><li><strong>스트레스가 쌓일 때</strong> 머리를 많이 쓴 뒤 뇌파와 기분</li><li><strong>잠</strong> 잠드는 시간과 수면 기록</li><li><strong>쉰 날·운동한 날</strong> 쉬었을 때와 운동했을 때 몸에서 살펴본 변화</li></ul></article></div>:null}</section>;
}
function ExperienceLoading({research=false,label,compact=false}:{research?:boolean;label?:string;compact?:boolean}){
 const heading=research?'연구 카드를 불러오고 있어요.':label?`${label} 내용을 불러오고 있어요.`:'다음 이야기를 불러오고 있어요.';
 const eyebrow=research?'사람 대상 GABA 연구':label||'셀핀다 발효가바';
 return <section className={`section wrap experience-loading${research?' experience-loading-research':''}${compact?' experience-loading-compact':''}`} aria-live="polite" aria-busy="true"><div className="experience-loading-heading"><span className="experience-loading-orb" aria-hidden="true"/><div><p className="chapter">{eyebrow}</p><h2>{heading}</h2></div></div><div className="experience-loading-grid" aria-hidden="true"><span/><span/><span/></div><p className="sr-only">잠시만 기다리면 {research?'사람 연구와 제품 정보를':`${eyebrow} 정보를`} 이어서 볼 수 있어요.</p></section>;
}
export default function App(){
 const [content,setContent]=useState<Content|null>(null),[error,setError]=useState(false),[loading,setLoading]=useState(true),[menu,setMenu]=useState(false),[retryKey,setRetryKey]=useState(0),[hasRhythmResult,setHasRhythmResult]=useState(false);
 const menuNavRef=useRef<HTMLElement>(null),menuToggleRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(menu)requestAnimationFrame(()=>menuNavRef.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus())},[menu]);
 const closeMenu=(restoreFocus=false)=>{setMenu(false);if(restoreFocus)requestAnimationFrame(()=>menuToggleRef.current?.focus())};
 const currentPath=relativePath(location.pathname);
 const requestedView = new URLSearchParams(location.search).get('view');
 // TF operations are an internal, local review surface. Keep the route useful
 // for the operator's local workspace while preventing a public Pages URL from
 // exposing the internal queue, gates, or meeting notes to consumers.
 const isLocalHost = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
 const operationsView = import.meta.env.DEV && isLocalHost && (requestedView === 'ops' || currentPath === '/ops');
 const accountView = requestedView === 'account' || currentPath === '/account';
 const researchView = requestedView === 'research' || currentPath === '/research/';
 const isProductView = requestedView === 'products' || currentPath === '/products/';
 const adminView = import.meta.env.DEV && isLocalHost && (requestedView === 'admin' || currentPath === '/admin');
 useEffect(()=>{
  if(!researchView)return;
  // Research-only layout rules should not add ~36 kB to the homepage CSS.
  // Vite emits this CSS as a route chunk and injects it before the research
  // cards resolve, while the shared shell stays immediately interactive.
  void import('./components/research-route.css');
 },[researchView]);
 useEffect(()=>{const c=new AbortController();setLoading(true);setError(false);loadContent(c.signal).then(setContent).catch(e=>{if(e.name!=='AbortError')setError(true)}).finally(()=>setLoading(false));return()=>c.abort()},[retryKey]);
 useEffect(()=>{
  const value=rhythmIdFromUrl(new URL(location.href));
  const type=value ? resultTypes[value] : null;
  const focusInvite=new URLSearchParams(location.search).get('focus')==='1' || location.pathname.endsWith('/focus/');
  if(!type&&!focusInvite)return;
   const title=focusInvite ? '너도 해봐 · 뇌컨디션 확인 챌린지 | 셀핀다' : `공유받은 하루 리듬: ‘${type!.shareLabel} · ${type!.name}’ | Cellpinda`;
   const description=focusInvite ? '초록 신호는 누르고 빨강 신호는 기다리는 게임이에요. 24개 신호 순서는 매번 달라져요. 점수는 건강 상태가 아닌 게임 기록이에요.' : `친구가 고른 ‘${type!.shareLabel} · ${type!.name}’ 장면을 공유했어요. 내 체크 결과는 아니에요.`;
   const routeUrl=focusInvite
    ? new URL(`${siteRoot}focus/`,window.location.origin).toString()
    : new URL(`${siteRoot}share/${type!.id}/`,window.location.origin).toString();
  document.title=title;
  const update=(selector:string,attribute:'name'|'property',value:string)=>{const element=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}=\"${selector}\"]`);if(element)element.content=value;else{const next=document.createElement('meta');next.setAttribute(attribute,selector);next.content=value;document.head.appendChild(next);}};
   const image=new URL(asset(focusInvite ? 'assets/focus-game-card-v5.png' : `assets/social-rhythm-${type!.id}.png`),window.location.origin).toString();
   update('description','name',description);update('og:type','property','website');update('og:title','property',title);update('og:description','property',description);update('og:image','property',image);update('og:image:alt','property',focusInvite ? '초록은 누르고 빨강은 기다리며, 표시된 색 신호를 따라가는 챌린지' : '친구가 고른 하루 리듬 장면 공유 카드');update('og:url','property',routeUrl);update('twitter:title','name',title);update('twitter:description','name',description);update('twitter:image','name',image);update('twitter:image:alt','name',focusInvite ? '초록은 누르고 빨강은 기다리며, 표시된 색 신호를 따라가는 챌린지' : '친구가 고른 하루 리듬 장면 공유 카드');
   const canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
   if(canonical)canonical.href=routeUrl;
   updateStructuredData({'@context':'https://schema.org','@type':'WebPage',name:title,url:routeUrl,description,inLanguage:'ko-KR',isPartOf:{'@type':'WebSite',url:new URL(siteRoot,window.location.origin).toString()}});
 },[]);
 useEffect(()=>{
  if(!researchView)return;
  const title='사람을 대상으로 한 GABA 연구를 쉽게 보기 | 셀핀다';
  const description='잠·스트레스·머리를 많이 쓴 뒤 관찰한 내용을 그림으로 정리했어요. 셀핀다 완제품 연구와는 다른 자료입니다.';
  document.title=title;
  const update=(selector:string,attribute:'name'|'property',value:string)=>{const element=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${selector}"]`);if(element)element.content=value;else{const next=document.createElement('meta');next.setAttribute(attribute,selector);next.content=value;document.head.appendChild(next);}};
  update('description','name',description);update('og:title','property',title);update('og:description','property',description);update('og:image:alt','property','GABA 사람 연구를 쉬운 말로 살펴보는 셀핀다 연구 안내');update('og:url','property',new URL(`${siteRoot}research/`,window.location.origin).toString());update('twitter:title','name',title);update('twitter:description','name',description);update('twitter:image:alt','name','GABA 사람 연구를 쉬운 말로 살펴보는 셀핀다 연구 안내');
  update('og:type','property','website');
  const canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const researchUrl=new URL(`${siteRoot}research/`,window.location.origin).toString();
  if(canonical)canonical.href=researchUrl;
  updateStructuredData({'@context':'https://schema.org','@type':'WebPage',name:title,url:researchUrl,description,inLanguage:'ko-KR',isPartOf:{'@type':'WebSite',url:new URL(siteRoot,window.location.origin).toString()}});
 },[researchView]);
 useEffect(()=>{
  if(!isProductView || researchView || accountView || adminView || operationsView)return;
  const title='셀핀다 가바 1500 · 30포 구성 보기';
  const description='셀핀다 가바 1500 · 30포 구성. 낱포 표시는 제품 포장에서, 가격과 재고는 스마트스토어에서 확인해 보세요.';
  const productUrl=new URL(`${siteRoot}products/`,window.location.origin).toString();
  document.title=title;
  const update=(selector:string,attribute:'name'|'property',value:string)=>{
   const element=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${selector}"]`);
   if(element)element.content=value;
   else{const next=document.createElement('meta');next.setAttribute(attribute,selector);next.content=value;document.head.appendChild(next);}
  };
  update('description','name',description);
  update('og:title','property',title);
  update('og:description','property',description);
  update('og:type','property','product');
  update('og:url','property',productUrl);
  update('og:image','property',new URL(asset('assets/product-composition-1500.png'),window.location.origin).toString());
  update('og:image:alt','property','셀핀다 가바 1500, 30포 한 상자 구성 안내');
  update('twitter:title','name',title);
  update('twitter:description','name',description);
  update('twitter:image','name',new URL(asset('assets/product-composition-1500.png'),window.location.origin).toString());
  update('twitter:image:alt','name','셀핀다 가바 1500, 30포 한 상자 구성 안내');
  const canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if(canonical)canonical.href=productUrl;
  updateStructuredData({'@context':'https://schema.org','@graph':[
   {'@type':'WebPage',name:title,url:productUrl,description,inLanguage:'ko-KR',isPartOf:{'@type':'WebSite',url:new URL(siteRoot,window.location.origin).toString()},about:{'@id':`${productUrl}#product`}},
   {'@type':'Product','@id':`${productUrl}#product`,name:'셀핀다 가바 1500',brand:{'@type':'Brand',name:'셀핀다'},image:new URL(asset('assets/product-composition-1500.png'),window.location.origin).toString(),url:productUrl,sameAs:'https://smartstore.naver.com/cellpinda/products/4701017202',description}
  ]});
 },[isProductView,researchView,accountView,adminView,operationsView]);
 useEffect(()=>{
  if(!accountView)return;
  const title='내 리듬 기록 | Cellpinda';
  const description='저장한 하루 리듬 기록을 확인하는 개인 공간입니다.';
  const accountUrl=new URL(`${siteRoot}account`,window.location.origin).toString();
  document.title=title;
  const update=(selector:string,attribute:'name'|'property',value:string)=>{
   const element=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${selector}"]`);
   if(element)element.content=value;
   else{const next=document.createElement('meta');next.setAttribute(attribute,selector);next.content=value;document.head.appendChild(next);}
  };
  update('robots','name','noindex, nofollow, noarchive');
  update('description','name',description);
  update('og:type','property','website');
  update('og:title','property',title);
  update('og:description','property',description);
  update('og:url','property',accountUrl);
  update('twitter:title','name',title);
  update('twitter:description','name',description);
  const canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if(canonical)canonical.href=accountUrl;
  updateStructuredData({'@context':'https://schema.org','@type':'WebPage',name:title,url:accountUrl,description,inLanguage:'ko-KR'});
 },[accountView]);
 useEffect(()=>{
 if(adminView || accountView || operationsView)return;
  trackOnce('landing_view',{path:'/'});
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){if(entry.target.id==='story'){trackOnce('gaba_story_viewed',{path:'/story'});}else{trackOnce('product_comparison_viewed',{path:'/products'});trackOnce('product_compare_view',{path:'/products'});}observer.unobserve(entry.target)}},{threshold:0.25});
  for(const id of ['story','products']){const ready=id==='products'?Boolean(content?.products.length):Boolean(content?.claims.some(claim=>claim.id==='gaba-definition'&&claim.status==='approved'));const element=document.getElementById(id);if(ready&&element)observer.observe(element)}
  return()=>observer.disconnect();
 },[content,operationsView,currentPath,adminView,accountView]);
 useEffect(()=>{
  const onConsent=()=>{if(!adminView && !accountView && !operationsView)trackOnce('landing_view',{path:'/'});};
  window.addEventListener('cellpinda:analytics-consent-changed',onConsent);
  return()=>window.removeEventListener('cellpinda:analytics-consent-changed',onConsent);
 },[operationsView,adminView,accountView]);
 useEffect(()=>{
  if(!content||!['/','/products/'].includes(currentPath))return;
  const url=new URL(location.href);
  if(rhythmIdFromUrl(url)){
   // RhythmExperience owns the shared-result alignment. Keeping a second
   // app-level scroll here made shared links move twice: first to the section
   // shell, then again to the result card after it rendered.
   return;
  }
  if(challengeInvite){
   let secondFrame=0;
   let alignmentInterval=0;
   const stopAlignment=()=>{
    if(alignmentInterval)window.clearInterval(alignmentInterval);
    alignmentInterval=0;
    window.removeEventListener('wheel',stopAlignment);
    window.removeEventListener('touchstart',stopAlignment);
    window.removeEventListener('pointerdown',stopAlignment);
    window.removeEventListener('keydown',onKeyDown);
   };
   const onKeyDown=(event:KeyboardEvent)=>{if(['Tab','ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))stopAlignment();};
   const scrollToChallenge=()=>{
    const target=document.getElementById('lab');
    if(!target)return;
    const align=()=>{
     target.scrollIntoView({block:'start',behavior:'instant'});
     window.scrollBy({top:target.getBoundingClientRect().top-96,behavior:'instant'});
    };
    align();
    const startedAt=performance.now();
    window.addEventListener('wheel',stopAlignment,{passive:true});
    window.addEventListener('touchstart',stopAlignment,{passive:true});
    window.addEventListener('pointerdown',stopAlignment,{passive:true});
    window.addEventListener('keydown',onKeyDown);
    alignmentInterval=window.setInterval(()=>{
     if(!target.isConnected||performance.now()-startedAt>2500){stopAlignment();return;}
     const top=target.getBoundingClientRect().top;
     if(top>=88&&top<=104){stopAlignment();return;}
     align();
    },120);
   };
   const firstFrame=window.requestAnimationFrame(()=>{secondFrame=window.requestAnimationFrame(scrollToChallenge);});
   trackOnce('shared_link_landed',{path:'/challenge',channel:'direct'});
   return()=>{window.cancelAnimationFrame(firstFrame);if(secondFrame)window.cancelAnimationFrame(secondFrame);stopAlignment();};
  }
  if(url.hash==='#brain-load-evidence'){
   const target=document.getElementById('brain-load-evidence');
   if(!target)return;
   const align=()=>{target.scrollIntoView({block:'start',behavior:'instant'});window.scrollBy({top:target.getBoundingClientRect().top-96,behavior:'instant'});};
   const firstFrame=window.requestAnimationFrame(()=>{align();window.requestAnimationFrame(align);});
   return()=>window.cancelAnimationFrame(firstFrame);
  }
  const productView=(currentPath==='/products/' || (url.searchParams.getAll('view').length===1&&url.searchParams.get('view')==='products'))&&!url.searchParams.has('rhythm');
  if(productView){
   const target=document.getElementById('products');
   if(!target)return;
   let alignmentInterval=0;
   let stopped=false;
   const stopAlignment=()=>{
    if(stopped)return;
    stopped=true;
    if(alignmentInterval)window.clearInterval(alignmentInterval);
    alignmentInterval=0;
    window.removeEventListener('wheel',stopAlignment);
    window.removeEventListener('touchstart',stopAlignment);
    window.removeEventListener('pointerdown',stopAlignment);
    window.removeEventListener('keydown',onKeyDown);
   };
   const onKeyDown=(event:KeyboardEvent)=>{if(['Tab','ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))stopAlignment();};
   const align=()=>{
    if(stopped||!target.isConnected)return;
    target.scrollIntoView({block:'start',behavior:'instant'});
    window.scrollBy({top:target.getBoundingClientRect().top-96,behavior:'instant'});
   };
   const settle=async()=>{
    align();
    try{await document.fonts?.ready;}catch{}
    const images=[...document.images].filter(image=>!image.complete);
    await Promise.all(images.map(image=>new Promise<void>(resolve=>{
     const done=()=>{image.removeEventListener('load',done);image.removeEventListener('error',done);resolve();};
     image.addEventListener('load',done,{once:true});image.addEventListener('error',done,{once:true});
    })));
    await Promise.all([...document.images].map(image=>image.decode().catch(()=>undefined)));
    align();
   };
   const firstFrame=window.requestAnimationFrame(()=>window.requestAnimationFrame(()=>void settle()));
   const startedAt=performance.now();
   window.addEventListener('wheel',stopAlignment,{passive:true});
   window.addEventListener('touchstart',stopAlignment,{passive:true});
   window.addEventListener('pointerdown',stopAlignment,{passive:true});
   window.addEventListener('keydown',onKeyDown);
   alignmentInterval=window.setInterval(()=>{
    if(!target.isConnected||performance.now()-startedAt>3000){stopAlignment();return;}
    const top=target.getBoundingClientRect().top;
    if(top>=88&&top<=104){stopAlignment();return;}
    align();
   },120);
   trackOnce('shared_link_landed',{path:'/products',channel:'direct'});
   return()=>{window.cancelAnimationFrame(firstFrame);stopAlignment();};
  }
  else if(content.products.some(product=>url.hash===`#product-${product.id}`)){document.getElementById(url.hash.slice(1))?.scrollIntoView({block:'start',behavior:'instant'});}
 },[content,currentPath]);
 if(accountView)return <Suspense fallback={<p className="loading">내 기록을 여는 중입니다.</p>}><MemberRecords/></Suspense>;
 if(adminView && Admin)return <Suspense fallback={<p className="loading">검토실을 여는 중입니다.</p>}><Admin/></Suspense>;
 if(operationsView && OperationsMvp)return <Suspense fallback={<p className="loading">운영판을 여는 중입니다.</p>}><OperationsMvp/></Suspense>;
 if(researchView)return <><a className="skip" href="#main">본문으로 이동</a><header className="header research-route-header"><a href={siteRoot} className="brand">Cellpinda<span className="brand-dot">.</span></a><nav aria-label="연구 메뉴"><a href={siteRoot}>메인으로</a></nav></header><main id="main" className="research-route-main">{content?<><section className="research-route-intro wrap"><p className="chapter">사람을 대상으로 한 GABA 연구</p><h1>사람 연구 결과를 한눈에 보기</h1><p>잠·스트레스·머리를 많이 쓴 뒤 관찰한 내용을 그림과 쉬운 말로 정리했어요. 카드에서 결과와 연구 조건을 함께 확인해 보세요.</p></section><Suspense fallback={<ExperienceLoading research/>}><ResearchLibrary claims={content.claims} sectionTitle="주제별로 한눈에 보기" onOpen={()=>track('evidence_opened',{path:'/research'})}/></Suspense><section className="research-route-product wrap" aria-labelledby="research-route-product-heading"><div><p className="chapter">다음으로</p><h2 id="research-route-product-heading">가바 1500 한 상자 구성을 확인하세요.</h2><p>연구에서 본 일반 GABA 자료와 셀핀다 제품 정보는 따로 확인할 수 있어요.</p></div><a className="button" href={`${siteRoot}?view=products#products`} onClick={()=>track('product_compare_view',{path:'/research'})}>가바 1500 제품 구성 보기 <ArrowRight size={18} aria-hidden="true"/></a></section></>:<section className="section wrap content-status"><p className="chapter">사람 대상 GABA 연구</p><h1>{loading?'연구 내용을 불러오고 있어요.':'연결이 잠시 늦어졌어요.'}</h1><p>{loading?'사람 연구를 쉽게 정리한 내용을 불러오는 중입니다.':'연구 자료를 불러오지 못했습니다. 다시 시도해 주세요.'}</p>{!loading?<button type="button" className="button outline" onClick={()=>setRetryKey(value=>value+1)}>다시 불러오기</button>:null}</section>}</main><footer className="wrap footer research-route-footer"><a className="brand" href={siteRoot}>Cellpinda.</a><p>사람 대상 GABA 연구 안내</p><a href={siteRoot}>메인으로</a></footer></>;
 const linkContext=sharedRhythmId
  ? <aside className="link-context link-context-shared" aria-live="polite"><span>친구가 공유한 하루 리듬 · {resultTypes[sharedRhythmId].name}</span><a href="#rhythm-result">공유 결과 바로 보기 <ArrowRight size={15} aria-hidden="true"/></a><small>내 답변은 아직 시작하지 않았어요.</small></aside>
  : referralId
    ? <aside className="link-context" aria-live="polite">공유된 리듬 링크로 방문했어요. 내 하루도 1분이면 확인할 수 있어요.</aside>
    : campaignId
      ? <aside className="link-context" aria-live="polite">캠페인 링크로 방문했어요. 원하는 흐름부터 살펴보세요.</aside>
      : null;
 return <><a className="skip" href="#main">본문으로 이동</a><header className="header"><a href={siteRoot} className="brand">Cellpinda<span className="brand-dot">.</span></a><nav id="primary-navigation" ref={menuNavRef} aria-label="주 메뉴" className={menu?'open':''} onClick={()=>closeMenu()} onKeyDown={event=>{if(event.key==='Escape')closeMenu(true)}}><a href="#rhythm">잠과 휴식 체크</a><a href="#story">GABA는?</a><a href={`${siteRoot}research/`}>GABA 연구 읽기</a><a href="#fermentation">발효가바는?</a><a href="#products">제품 구성</a>{content?.reviews?.length ? <a href={REVIEW_DESTINATION_URL} target="_blank" rel="noopener noreferrer" aria-label="가바 1500 스마트스토어 후기 읽기 · 새 창" onClick={()=>track('review_open',{productId:'gaba1500',path:'/header'})}>가바 1500 스마트스토어 후기 읽기 ↗</a> : null}</nav><a href="#rhythm" className="button small" onClick={()=>track('hero_check_start',{path:'/header'})}>1분 체크 <ArrowRight size={18} aria-hidden="true"/></a><button type="button" ref={menuToggleRef} className="menu-toggle" aria-label={menu?'메뉴 닫기':'메뉴 열기'} aria-expanded={menu} aria-controls="primary-navigation" onClick={()=>setMenu(!menu)}>{menu?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button></header>{linkContext}
  <main id="main"><section className="hero" aria-labelledby="hero-heading"><img className="hero-photo" src={asset('assets/rhythm-window.webp')} width={1536} height={1024} fetchPriority="high" loading="eager" decoding="sync" alt="초록 나무가 보이는 열린 창가와 물 한 잔"/><div className="hero-copy"><p className="chapter">셀핀다 발효가바 · 나의 하루 리듬 체크</p><h1 id="hero-heading" aria-label="퇴근했는데도 일 생각이 계속 나나요?">퇴근했는데도<br/>일 생각이<br className="mobile-break"/> 계속 나나요?</h1><p className="hero-question">지난 7일, 잠들기 어렵거나<br className="mobile-break"/> 아침에도 피곤한 날이 있었나요?</p><div className="actions"><a className="button" href="#rhythm" onClick={()=>track('hero_check_start',{path:'/'})}>잠과 휴식 1분 체크 <ArrowRight aria-hidden="true"/></a><a className="hero-secondary-link" href="#consumer-reel" onClick={event=>{event.preventDefault();window.history.replaceState(null,'','#consumer-reel');const jump=()=>document.getElementById('consumer-reel')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});jump();window.setTimeout(jump,180);track('consumer_reel_cta',{path:'/',destination:'#consumer-reel',slideId:'hero'})}}>GABA 한 장씩 보기 <ArrowRight aria-hidden="true"/></a><p className="hero-cta-note">1분 뒤, 내 상태와 오늘 해볼 일을 확인해 보세요.</p></div></div></section>

  <div className="wrap section"><RhythmExperience onEvent={track} onResultChange={setHasRhythmResult}/></div>
  <Suspense fallback={<ExperienceLoading label="GABA 이야기" compact/>}><ConsumerGabaReel onEvent={track} hasRhythmResult={hasRhythmResult}/></Suspense>
  <Suspense fallback={<ExperienceLoading/>}>
  {content ? <>
   <Suspense fallback={<ExperienceLoading label="GABA 이야기" compact/>}><GabaStory claims={content.claims} hasReviews={content.reviews.length > 0} hasRhythmResult={hasRhythmResult}/></Suspense>
   <Suspense fallback={<ExperienceLoading label="발효가바 영상" compact/>}><div className="teaser-consumer-copy" aria-label="티저 영상 자동 재생 안내"><p className="sr-only">화면에 들어오면 자동 시작을 시도해요. 이 화면에 들어오면 영상이 자동으로 시작돼요. 자동 시작이 막히면 화면 안의 재생 버튼을 눌러 주세요.</p><TeaserPreview onEvent={track}/></div></Suspense>
   <Suspense fallback={<ExperienceLoading label="사람 연구" compact/>}><GabaResearchHighlights claims={content.claims} onEvent={track}/></Suspense>
   <Suspense fallback={<ExperienceLoading label="휴식과 집중 연구" compact/>}><BrainLoadEvidence /></Suspense>
 <section id="fermentation" className="section sage" aria-labelledby="fermentation-heading"><div className="wrap"><div className="section-head"><div><p className="chapter">03 / 발효가바는?</p><h2 id="fermentation-heading">발효가바를<br/>쉽게 알아보세요.</h2></div><p>발효가 무엇인지, 제품 정보를 어디서 볼 수 있는지<br/>쉬운 말로 안내합니다.</p></div><div className="fermentation-questions">{[['무엇으로 만들었나요?','셀핀다 스마트스토어 상품은 발효가바로 소개돼 있어요. 원재료와 함량은 제품 표시사항에서 확인해 주세요.'],['발효 기술이 뭔가요?','특허 문서에 GABA를 만드는 방법이 소개돼 있어요. 셀핀다 제품의 실제 제조공정은 제품 자료에서 따로 확인해 주세요.'],['제품 정보는 어디서 보나요?','한 포에 든 양과 제품 구성은 제품 포장과 스마트스토어에서 확인할 수 있어요.'],['먹는 법은 어디에 있나요?','제품 포장에 적힌 먹는 방법과 주의사항을 확인해 주세요.']].map(([question,answer],index)=><article key={question}><span>0{index+1}</span><h3>{question}</h3><p>{answer}</p></article>)}</div><p className="process-note"><span>특허 문서의 기술 예시</span>특허 문서에 GABA를 만드는 방법이 소개돼 있어요. 셀핀다 제품의 실제 공정·순도 확인 자료와는 별도예요. <a className="text-link" href="https://patents.google.com/patent/KR101740968B1/ko" target="_blank" rel="noopener noreferrer">특허 문서 보기 ↗</a></p><div className="process">{['유산균 + 재료 성분','발효','GABA 생성'].map((t,i)=><div key={t}><span>0{i+1}</span><h3>{t}</h3></div>)}</div>{content.claims.filter(c=>!c.id.startsWith('product-')&&!c.id.startsWith('research-')&&!c.id.startsWith('gaba-')&&c.publicText).map(c=><details className="claim" key={c.id}><summary>{c.publicText}</summary><div>{c.sources.filter(s=>s.url).map(s=><a className="evidence-source-link" key={s.url} href={s.url!} target="_blank" rel="noopener noreferrer" aria-label={`${s.title} 문서 보기`}>{evidenceLinkLabel(s.url!)}</a>)}</div></details>)}</div></section>
 <section id="products" className="section wrap" aria-labelledby="products-heading"><div className="section-head"><div><p className="chapter">04 / 제품 구성</p><h2 id="products-heading">가바 1500 한 상자에는<br/>무엇이 들어 있나요?</h2></div></div><div className="products">{content.products.map(p=><article id={`product-${p.id}`} className="product" key={p.id}><div className="product-visual" role="group" aria-label={`${p.name}, ${p.servings}포 한 상자 구성`}><span className="product-visual-kicker">한 상자 구성</span><strong>{p.servings}<small>포</small></strong><span className="product-visual-subtitle">한 상자에 든 포 수</span><div className="product-portion-grid" aria-hidden="true">{Array.from({length:p.servings},(_,index)=><i key={index}/>)}</div><div className="product-visual-facts"><span><strong>판매처에 표시된 유형</strong><small>{productCategoryDisplay(p.category)}</small></span></div></div><div className="product-body"><h3>{p.name} <small className="product-category" aria-label={p.category}>제품 유형 · {productCategoryDisplay(p.category)}</small></h3><a className="button outline product-cta" href={p.officialUrl} target="_blank" rel="noopener noreferrer" onClick={()=>{track('purchase_click',{productId:p.id,path:'/products'});track('purchase_cta_click',{productId:p.id,path:'/products'})}}>스마트스토어에서 가격·재고 확인하기 <ArrowUpRight size={18} aria-hidden="true"/></a><dl><div><dt>가격·재고</dt><dd>{p.availability || '스마트스토어에서 확인'}</dd></div><div><dt>먹는 법·보관</dt><dd>제품 포장에서 확인</dd></div></dl></div></article>)}</div><Suspense fallback={<ExperienceLoading label="구매 전 안내" compact/>}><PurchaseQuestions products={content.products} onEvent={track} />{content.products.length>0&&<ProductShare onEvent={track}/>}</Suspense></section>
 <Suspense fallback={<ExperienceLoading label="구매자 후기" compact/>}><ReviewExperience reviews={content.reviews} onOpen={productId=>{track('review_open',{productId});track('review_source_click',{productId,path:'/reviews'})}}/></Suspense>
 </> : <ContentFallback loading={loading} onRetry={()=>setRetryKey(value=>value+1)}/>} 
 <Suspense fallback={<ExperienceLoading label="7일 휴식 챌린지" compact/>}><SevenDayChallenge onEvent={track} isInvite={challengeInvite}/></Suspense>
  <section className="closing" aria-labelledby="closing-heading"><div className="wrap between"><h2 id="closing-heading">오늘은 언제 잠깐 쉴 수 있을까요?<br/>1분 체크로 돌아봐요.</h2><a className="button light" href="#rhythm">잠과 휴식 1분 체크 <ArrowRight aria-hidden="true"/></a></div></section>
  </Suspense></main><footer className="wrap footer"><a className="brand" href={siteRoot}>Cellpinda.</a><p>잠과 휴식에 대해 알아보고, 내게 맞는 선택을 해보세요.</p><a href="https://smartstore.naver.com/cellpinda/products/4701017202" target="_blank" rel="noopener noreferrer">스마트스토어 제품 보기 ↗</a><a href={`${siteRoot}?view=account`}>내 기록</a><Suspense fallback={null}><AnalyticsConsent enabled={apiEndpoint('/api/events') !== null}/></Suspense></footer></>;
}
