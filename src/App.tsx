import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import RhythmExperience from './components/RhythmExperience';
import ResearchLibrary, {type Claim} from './components/ResearchLibrary';
import './components/research-route.css';
import ReviewExperience,{type PublicReview} from './components/ReviewExperience';
import SevenDayChallenge from './components/SevenDayChallenge';
import GabaStory from './components/GabaStory';
import BrainLoadEvidence from './components/BrainLoadEvidence';
import TeaserPreview from './components/TeaserPreview';
import ProductShare from './components/ProductShare';
import PurchaseQuestions from './components/PurchaseQuestions';
import OperationsMvp from './components/OperationsMvp';
import AnalyticsConsent from './components/AnalyticsConsent';
import {apiEndpoint} from './api-origin';
import {resultTypes, rhythmIdFromUrl} from './domain/rhythm';
import {analyticsConsentGranted} from './domain/analytics-consent';
import {REVIEW_DESTINATION_URL} from './domain/reviews';
const Admin = lazy(() => import('./components/Admin'));
const MemberRecords=lazy(()=>import('./components/MemberRecords'));
type Product={id:string;name:string;amountMg:number;servings:number;totalG:number;category:string;officialUrl:string;availability?:string;priceDisplay?:string|null};
type Content={claims:Claim[];products:Product[];reviews:PublicReview[]};
const eventMap:Record<string,string>={rhythm_start:'rhythm_check_started',rhythm_complete:'rhythm_check_completed',share_request:'share_requested',share_copy:'share_link_copied',card_download:'share_image_downloaded',purchase_click:'purchase_outbound_clicked',review_open:'review_opened',review_nav:'review_section_navigated',faq_open:'purchase_question_opened'};
const siteRoot=import.meta.env.BASE_URL;
const asset=(path:string)=>`${siteRoot}${path}`;
function relativePath(path:string):string{
 const base=siteRoot==='/'?'':siteRoot.replace(/\/$/,'');
 const relative=base&&path.startsWith(base)?path.slice(base.length):path;
 return relative||'/';
}
const flowId=crypto.randomUUID();
const safeQueryValue=(name:string,maxLength=64)=>{const value=new URLSearchParams(window.location.search).get(name)?.trim()||'';return /^[A-Za-z0-9_-]+$/.test(value)&&value.length>=1&&value.length<=maxLength?value:'';};
const campaignId=safeQueryValue('campaign');
const referralId=(()=>{const value=safeQueryValue('ref');return value.length>=8?value:'';})();
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
 const endpoint=apiEndpoint('/api/content');
 if(endpoint){
  try{
   const api=await fetchContent(endpoint,signal);
   if(api.ok)return api.json();
  }catch(error){
   if((error as Error).name==='AbortError')throw error;
  }
 }
 const fallback=await fetchContent(`${import.meta.env.BASE_URL}data/content.json`,signal);
 if(!fallback.ok)throw Error('Content unavailable');
 return fallback.json();
}
function ContentFallback({loading,onRetry}:{loading:boolean;onRetry:()=>void}){
 return <section className="section wrap content-status" aria-live="polite"><p className="chapter">셀핀다 발효가바</p><h2>{loading?'정보를 불러오고 있어요.':'연결이 잠시 늦어졌어요.'}</h2><p>{loading?'제품과 연구 정보를 불러오는 중입니다.':'1분 체크는 바로 할 수 있어요. 아래에서 GABA와 제품 정보를 먼저 살펴보세요.'}</p>{!loading?<div className="actions"><a className="button outline" href="https://smartstore.naver.com/cellpinda/products/4701017202" target="_blank" rel="noreferrer">스마트스토어 제품 보기 ↗</a><button type="button" className="button outline" onClick={onRetry}>다시 불러오기</button></div>:null}{!loading?<div className="content-status-grid"><article id="story"><p className="chapter">GABA는?</p><h3>뇌세포 사이에서 신호를 주고받는 데 쓰이는 물질</h3><p>GABA는 뇌세포 사이에서 신호를 주고받는 과정에 쓰이는 물질 중 하나예요.</p></article><article id="fermentation"><p className="chapter">발효가바는?</p><h3>발효 기술로 만든 GABA</h3><p>발효가바를 만드는 방법과 확인 자료를 쉽게 소개해요.</p></article><article id="products"><p className="chapter">제품 구성</p><h3>셀핀다 가바 1,500 mg × 30포</h3><p>현재 구성과 먹는 방법은 스마트스토어와 제품 포장에서 확인해 보세요.</p><a className="text-link" href="https://smartstore.naver.com/cellpinda/products/4701017202" target="_blank" rel="noreferrer">스마트스토어에서 제품 보기 ↗</a></article><article id="reviews"><p className="chapter">구매자 후기</p><h3>가바 1500 구매자 후기</h3><p>스마트스토어에서 구매한 사람들의 후기를 읽어보세요.</p></article><article id="research"><p className="chapter">연구 이야기</p><h3>사람 연구에서 무엇을 살펴봤나요?</h3><p>GABA와 잠·긴장·운동에 관한 연구를 쉬운 말로 정리했어요.</p><ul><li><strong>긴장할 때</strong> 생각을 많이 쓰는 과제 뒤 뇌파와 기분</li><li><strong>잠</strong> 잠드는 시간과 수면 기록</li><li><strong>운동</strong> 운동 뒤 몸에서 살펴본 변화</li></ul></article></div>:null}</section>;
}
export default function App(){
 const [content,setContent]=useState<Content|null>(null),[error,setError]=useState(false),[loading,setLoading]=useState(true),[menu,setMenu]=useState(false),[retryKey,setRetryKey]=useState(0);
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
 const adminView = import.meta.env.DEV && isLocalHost && (requestedView === 'admin' || currentPath === '/admin');
 useEffect(()=>{const c=new AbortController();setLoading(true);setError(false);loadContent(c.signal).then(setContent).catch(e=>{if(e.name!=='AbortError')setError(true)}).finally(()=>setLoading(false));return()=>c.abort()},[retryKey]);
 useEffect(()=>{
  const value=rhythmIdFromUrl(new URL(location.href));
  const type=value ? resultTypes[value] : null;
  const focusInvite=new URLSearchParams(location.search).get('focus')==='1' || location.pathname.endsWith('/focus/');
  if(!type&&!focusInvite)return;
   const title=focusInvite ? '“너도 해봐” 뇌 컨디션 확인 챌린지 | 셀핀다' : `공유받은 하루 리듬: ‘${type!.name}’ | Cellpinda`;
   const description=focusInvite ? '1분 동안 신호를 보고 누르거나 멈추는 게임이에요. 순서는 매번 달라져요.' : `친구가 고른 ‘${type!.name}’ 장면을 공유했어요. 내 체크 결과는 아니에요.`;
  document.title=title;
  const update=(selector:string,attribute:'name'|'property',value:string)=>{const element=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}=\"${selector}\"]`);if(element)element.content=value;else{const next=document.createElement('meta');next.setAttribute(attribute,selector);next.content=value;document.head.appendChild(next);}};
   const image=new URL(asset(focusInvite ? 'assets/focus-game-card-v4.png' : `assets/social-rhythm-${type!.id}.png`),window.location.origin).toString();
  update('description','name',description);update('og:title','property',title);update('og:description','property',description);update('og:image','property',image);update('og:url','property',window.location.href);update('twitter:title','name',title);update('twitter:description','name',description);update('twitter:image','name',image);
 },[]);
 useEffect(()=>{
  if(!researchView)return;
  const title='GABA 사람 연구를 쉬운 말로 | 셀핀다';
  const description='GABA를 섭취한 사람 연구를 쉬운 말과 그림으로 소개하고, 연구 조건과 셀핀다 제품 정보를 구분해 보여드립니다.';
  document.title=title;
  const update=(selector:string,attribute:'name'|'property',value:string)=>{const element=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${selector}"]`);if(element)element.content=value;else{const next=document.createElement('meta');next.setAttribute(attribute,selector);next.content=value;document.head.appendChild(next);}};
  update('description','name',description);update('og:title','property',title);update('og:description','property',description);update('og:url','property',new URL(`${siteRoot}research/`,window.location.origin).toString());update('twitter:title','name',title);update('twitter:description','name',description);
  const canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if(canonical)canonical.href=new URL(`${siteRoot}research/`,window.location.origin).toString();
 },[researchView]);
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
 if(!content||currentPath!=='/')return;
  const url=new URL(location.href);
  const productView=url.searchParams.getAll('view').length===1&&url.searchParams.get('view')==='products'&&!url.searchParams.has('rhythm');
  if(productView){document.getElementById('products')?.scrollIntoView({block:'start',behavior:'instant'});trackOnce('shared_link_landed',{path:'/products',channel:'direct'});}
  else if(content.products.some(product=>url.hash===`#product-${product.id}`)){document.getElementById(url.hash.slice(1))?.scrollIntoView({block:'start',behavior:'instant'});}
 },[content,currentPath]);
 if(accountView)return <Suspense fallback={<p className="loading">내 기록을 여는 중입니다.</p>}><MemberRecords/></Suspense>;
 if(adminView)return <Suspense fallback={<p className="loading">검토실을 여는 중입니다.</p>}><Admin/></Suspense>;
 if(operationsView)return <OperationsMvp/>;
  if(researchView)return <><a className="skip" href="#main">본문으로 이동</a><header className="header research-route-header"><a href={siteRoot} className="brand">Cellpinda<span className="brand-dot">.</span></a><nav aria-label="연구 메뉴"><a href={siteRoot}>메인으로 돌아가기</a></nav></header><main id="main" className="research-route-main">{content?<><section className="research-route-intro wrap"><p className="chapter">GABA 사람 연구</p><h1>사람 연구 내용을<br/>그림과 쉬운 말로 살펴봐요.</h1><p>GABA 사람 연구를 쉬운 말로 소개해요. 셀핀다 제품 정보는 제품 페이지에서 확인해 보세요.</p></section><ResearchLibrary claims={content.claims} onOpen={()=>track('evidence_opened',{path:'/research'})}/><section className="section wrap research-route-product" aria-labelledby="research-route-product-heading"><div><p className="chapter">제품 구성</p><h2 id="research-route-product-heading">연구 내용과 제품 구성은<br/>따로 확인해 보세요.</h2><p>셀핀다 가바 1500의 한 포 기준 양과 상자 구성을 확인할 수 있어요.</p></div><a className="button outline" href={`${siteRoot}#products`}>셀핀다 가바 1500 구성 보기 <ArrowRight size={18}/></a></section></>:<section className="section wrap content-status"><p className="chapter">GABA 사람 연구</p><h1>{loading?'연구 내용을 불러오고 있어요.':'연결이 잠시 늦어졌어요.'}</h1><p>{loading?'사람 연구를 쉽게 정리한 내용을 불러오는 중입니다.':'연구 자료를 불러오지 못했습니다. 다시 시도해 주세요.'}</p>{!loading?<button type="button" className="button outline" onClick={()=>setRetryKey(value=>value+1)}>다시 불러오기</button>:null}</section>}</main><footer className="wrap footer research-route-footer"><a className="brand" href={siteRoot}>Cellpinda.</a><p>GABA 사람 연구 안내</p><a href={siteRoot}>메인으로 돌아가기</a></footer></>;
 const linkContext=referralId?<aside className="link-context" aria-live="polite">공유된 리듬 링크로 방문했어요. 내 하루도 1분이면 확인할 수 있어요.</aside>:campaignId?<aside className="link-context" aria-live="polite">캠페인 링크로 방문했어요. 원하는 흐름부터 살펴보세요.</aside>:null;
   return <><a className="skip" href="#main">본문으로 이동</a><header className="header"><a href={siteRoot} className="brand">Cellpinda<span className="brand-dot">.</span></a><nav id="primary-navigation" ref={menuNavRef} aria-label="주 메뉴" className={menu?'open':''} onClick={()=>closeMenu()} onKeyDown={event=>{if(event.key==='Escape')closeMenu(true)}}><a href="#rhythm">잠과 휴식 체크</a><a href="#story">GABA는?</a><a href={`${siteRoot}research/`}>GABA 연구 읽기</a><a href="#fermentation">발효가바는?</a><a href="#products">제품 구성</a>{content?.reviews?.length ? <a href={REVIEW_DESTINATION_URL} target="_blank" rel="noopener noreferrer" onClick={()=>track('review_open',{productId:'gaba1500',path:'/header'})}>가바 1500 구매자 후기 ↗</a> : null}</nav><a href="#rhythm" className="button small" onClick={()=>track('hero_check_start',{path:'/header'})}>1분 체크 <ArrowRight size={18}/></a><button ref={menuToggleRef} className="menu-toggle" aria-label={menu?'메뉴 닫기':'메뉴 열기'} aria-expanded={menu} aria-controls="primary-navigation" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>{linkContext}
 <main id="main"><section className="hero"><img className="hero-photo" src={asset('assets/rhythm-window.webp')} width={1536} height={1024} fetchPriority="high" decoding="async" alt="초록 나무가 보이는 열린 창가와 물 한 잔"/><div className="hero-copy"><p className="chapter">나의 하루 리듬 체크</p><h1>퇴근했는데도<br/>일 생각이<br className="mobile-break"/> 계속 나나요?</h1><p className="hero-question">지난 7일, 잠들기 어렵거나<br className="mobile-break"/> 아침에도 피곤한 날이 있었나요?</p><div className="actions"><a className="button" href="#rhythm" onClick={()=>track('hero_check_start',{path:'/'})}>잠과 휴식 1분 체크 <ArrowRight/></a><a className="button outline" href="#teaser">발효가바 이야기 보기 <ArrowRight/></a></div><a className="hero-game-link" href="#focus-game" onClick={()=>track('focus_game_start',{path:'/hero'})}>뇌 컨디션 확인 챌린지 해보기 <ArrowRight size={16}/></a></div></section>
 <section className="intro-strip wrap"><h2>내 하루를 돌아보는 1분,<br/>오늘 쉴 시간을 찾아요.</h2>{[['01','돌아보기','지난 7일, 잠과 휴식은 어땠나요?','#rhythm'],['02','알아보기','GABA가 무엇인지 쉬운 말로 봐요.','#story'],['03','제품 확인','한 포의 양과 먹는 법을 확인해요.','#products']].map(([n,t,d,href])=><a className="step" href={href} key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></a>)}</section>
  <div className="wrap section"><RhythmExperience onEvent={track}/></div>
  {content ? <>
   <BrainLoadEvidence />
   <GabaStory claims={content.claims} hasReviews={content.reviews.length > 0}/>
   <TeaserPreview onEvent={track}/>
    <section className="section wrap research-gateway" aria-label="GABA 사람 연구">
     <div><p className="chapter">GABA 연구 읽기</p><h2>수면·긴장·운동 연구를<br/>그림과 쉬운 말로</h2><p>누가 참여했고 무엇을 살펴봤는지 한곳에서 확인해 보세요.</p></div>
     <div className="research-gateway-actions"><a className="button outline" href={`${siteRoot}research/`}>사람 연구 살펴보기 <ArrowRight size={18}/></a><a className="research-gateway-product-link" href="#products">가바 1500 구성 보기 <ArrowRight size={16}/></a></div>
   </section>
 <section id="fermentation" className="section sage"><div className="wrap"><div className="section-head"><div><p className="chapter">03 / 발효가바는?</p><h2>발효가바를<br/>쉽게 알아보세요.</h2></div><p>발효가 무엇인지, 제품 정보를 어디서 볼 수 있는지<br/>쉬운 말로 안내합니다.</p></div><div className="fermentation-questions">{[['무엇으로 만들었나요?','셀핀다 스마트스토어 상품은 발효가바로 소개돼 있어요. 원재료와 함량은 제품 표시사항에서 확인해 주세요.'],['발효 기술이 뭔가요?','특허 문서는 유산균으로 GABA를 만드는 방법을 설명하는 자료예요. 제품의 실제 제조공정은 제품 자료에서 따로 확인해 주세요.'],['제품 정보는 어디서 보나요?','한 포에 든 양과 제품 구성은 제품 포장과 스마트스토어에서 확인할 수 있어요.'],['먹는 법은 어디에 있나요?','제품 포장에 적힌 먹는 방법과 주의사항을 확인해 주세요.']].map(([question,answer],index)=><article key={question}><span>0{index+1}</span><h3>{question}</h3><p>{answer}</p></article>)}</div><div className="process">{['발효하기','걸러내기','한 포에 든 양 확인','품질 살피기'].map((t,i)=><div key={t}><span>0{i+1}</span><h3>{t}</h3></div>)}</div>{content.claims.filter(c=>!c.id.startsWith('product-')&&!c.id.startsWith('research-')&&!c.id.startsWith('gaba-')&&c.publicText).map(c=><details className="claim" key={c.id}><summary>{c.publicText}</summary><div>{c.sources.filter(s=>s.url).map(s=><a key={s.url} href={s.url!} target="_blank" rel="noreferrer" aria-label={`${s.title} 문서 보기`}>특허 문서에서 보기 ↗</a>)}</div></details>)}</div></section>
 <section id="products" className="section wrap"><div className="section-head"><div><p className="chapter">04 / 제품 구성</p><h2>가바 1500 한 상자에는<br/>무엇이 들어 있나요?</h2></div><p>한 포에 든 양과 상자 안 포 수를 확인해 보세요.<br/>먹는 법과 주의사항은 제품 포장에 적혀 있어요.{content.reviews?.length ? <><br/><a className="products-review-shortcut" href={REVIEW_DESTINATION_URL} target="_blank" rel="noopener noreferrer" onClick={()=>{track('review_open',{productId:'gaba1500',path:'/products-intro'});track('review_source_click',{productId:'gaba1500',path:'/products-intro'})}}>구매자 후기 먼저 보기 ↗</a></> : null}</p></div><div className="products">{content.products.map(p=><article id={`product-${p.id}`} className="product" key={p.id}><div className="product-visual" role="img" aria-label={`${p.name}: 한 포 ${p.amountMg.toLocaleString()} mg, ${p.servings}포, 전체 ${p.totalG} g 구성 안내`}><span className="product-visual-kicker">한 상자 구성</span><strong>{p.amountMg.toLocaleString()}<small>mg</small></strong><span className="product-visual-subtitle">한 포 기준</span><div className="product-portion-grid" aria-hidden="true">{Array.from({length:p.servings},(_,index)=><i key={index}/>)}</div><div className="product-visual-facts"><span><strong>{p.servings}포</strong> 한 상자</span><span><strong>{p.totalG} g</strong> 전체 무게</span></div></div><div className="product-body"><h3>{p.name} <small className="product-category">{p.category}</small></h3><dl><div><dt>가격·재고</dt><dd>{p.availability || '스마트스토어에서 확인'}</dd></div><div><dt>먹는 법·보관</dt><dd>제품 포장에서 확인</dd></div></dl><a className="button outline" href={p.officialUrl} target="_blank" rel="noreferrer" onClick={()=>{track('purchase_click',{productId:p.id,path:'/products'});track('purchase_cta_click',{productId:p.id,path:'/products'})}}>가격·재고 확인하기 <ArrowUpRight size={18}/></a></div></article>)}</div><PurchaseQuestions products={content.products} onEvent={track} />{content.products.length>0&&<ProductShare onEvent={track}/>}</section>
 <ReviewExperience reviews={content.reviews} onOpen={productId=>{track('review_open',{productId});track('review_source_click',{productId,path:'/reviews'})}}/>
 </> : <ContentFallback loading={loading} onRetry={()=>setRetryKey(value=>value+1)}/>} 
 <SevenDayChallenge onEvent={track}/>
  <section className="closing"><div className="wrap between"><h2>오늘은 언제 잠깐 쉴 수 있을까요?<br/>1분 체크로 돌아봐요.</h2><a className="button light" href="#rhythm">잠과 휴식 1분 체크 <ArrowRight/></a></div></section></main><footer className="wrap footer"><a className="brand" href={siteRoot}>Cellpinda.</a><p>잠과 휴식에 대해 알아보고, 내게 맞는 선택을 해보세요.</p><a href="https://smartstore.naver.com/cellpinda/products/4701017202" target="_blank" rel="noreferrer">스마트스토어 제품 보기 ↗</a><a href={`${siteRoot}?view=account`}>내 기록</a><AnalyticsConsent enabled={apiEndpoint('/api/events') !== null}/></footer></>;
}
