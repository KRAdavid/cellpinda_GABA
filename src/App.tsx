import { useEffect, useState, lazy, Suspense } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import RhythmExperience from './components/RhythmExperience';
import ResearchLibrary, {type Claim} from './components/ResearchLibrary';
import ReviewExperience,{type PublicReview} from './components/ReviewExperience';
import SevenDayChallenge from './components/SevenDayChallenge';
import GabaStory from './components/GabaStory';
import GabaEvidenceHighlights from './components/GabaEvidenceHighlights';
import BrainLoadEvidence from './components/BrainLoadEvidence';
import TeaserPreview from './components/TeaserPreview';
import ProductShare from './components/ProductShare';
import PurchaseQuestions from './components/PurchaseQuestions';
import OperationsMvp from './components/OperationsMvp';
import AnalyticsConsent from './components/AnalyticsConsent';
import {apiEndpoint} from './api-origin';
import {resultTypes, rhythmIdFromUrl} from './domain/rhythm';
import {analyticsConsentGranted} from './domain/analytics-consent';
const Admin = lazy(() => import('./components/Admin'));
const MemberRecords=lazy(()=>import('./components/MemberRecords'));
type Product={id:string;name:string;amountMg:number;servings:number;totalG:number;officialUrl:string;availability?:string;priceDisplay?:string|null};
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
 return <section className="section wrap content-status" aria-live="polite"><p className="chapter">셀핀다 발효가바</p><h2>{loading?'정보를 준비하고 있어요.':'잠시 연결이 늦어졌어요.'}</h2><p>{loading?'제품 구성과 연구 자료를 불러오는 중입니다.':'기본 1분 체크는 바로 사용할 수 있어요. 아래에서 GABA와 제품 정보를 먼저 확인해 보세요.'}</p>{!loading?<div className="actions"><a className="button outline" href="https://smartstore.naver.com/cellpinda/products/4701017202" target="_blank" rel="noreferrer">스마트스토어에서 확인 ↗</a><button type="button" className="button outline" onClick={onRetry}>자료 다시 불러오기</button></div>:null}{!loading?<div className="content-status-grid"><article id="story"><p className="chapter">GABA란?</p><h3>뇌의 신경 신호를 조절하는 물질</h3><p>GABA는 뇌에서 신경세포 사이의 신호를 조절하는 데 관여합니다.</p></article><article id="fermentation"><p className="chapter">왜 발효가바?</p><h3>만드는 과정과 확인 방법</h3><p>발효한 뒤 분리하고, 함량과 품질을 차례로 확인합니다.</p></article><article id="products"><p className="chapter">제품 구성</p><h3>셀핀다 가바 1,500 mg × 30포</h3><p>최신 구성과 섭취 정보는 스마트스토어와 포장 표시에서 확인해 보세요.</p><a className="text-link" href="https://smartstore.naver.com/cellpinda/products/4701017202" target="_blank" rel="noreferrer">스마트스토어에서 제품 정보 확인 ↗</a></article><article id="reviews"><p className="chapter">구매자 후기</p><h3>스마트스토어 원문에서 확인</h3><p>제품을 선택한 사람들의 경험은 스마트스토어에서 직접 확인할 수 있어요.</p></article><article id="research"><p className="chapter">연구를 쉽게 읽기</p><h3>사람 대상 연구를 쉬운 말로</h3><p>GABA와 수면·스트레스·운동 관련 연구를 소비자 말로 정리해 소개합니다.</p><ul><li><strong>스트레스·기분</strong> 바쁜 과제 중 뇌파와 기분을 살펴본 연구</li><li><strong>수면</strong> 잠드는 시간과 수면 상태를 살펴본 연구</li><li><strong>운동·회복</strong> 운동 뒤 호르몬과 몸의 변화를 살펴본 연구</li></ul><a className="text-link" href={`${siteRoot}data/gaba-master-index.json`}>GABA 연구를 쉬운 말로 더 보기</a></article></div>:null}</section>;
}
export default function App(){
 const [content,setContent]=useState<Content|null>(null),[error,setError]=useState(false),[loading,setLoading]=useState(true),[menu,setMenu]=useState(false),[retryKey,setRetryKey]=useState(0);
 const currentPath=relativePath(location.pathname);
 const requestedView = new URLSearchParams(location.search).get('view');
 // TF operations are an internal, local review surface. Keep the route useful
 // for the operator's local workspace while preventing a public Pages URL from
 // exposing the internal queue, gates, or meeting notes to consumers.
 const isLocalHost = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
 const operationsView = isLocalHost && (requestedView === 'ops' || currentPath === '/ops');
 const accountView = requestedView === 'account' || currentPath === '/account';
 const adminView = isLocalHost && (requestedView === 'admin' || currentPath === '/admin');
 useEffect(()=>{const c=new AbortController();setLoading(true);setError(false);loadContent(c.signal).then(setContent).catch(e=>{if(e.name!=='AbortError')setError(true)}).finally(()=>setLoading(false));return()=>c.abort()},[retryKey]);
 useEffect(()=>{
  const value=rhythmIdFromUrl(new URL(location.href));
  const type=value ? resultTypes[value] : null;
  const focusInvite=new URLSearchParams(location.search).get('focus')==='1' || location.pathname.endsWith('/focus/');
  if(!type&&!focusInvite)return;
  const title=focusInvite ? '“너도 해봐” 1분 집중 리듬 챌린지 | 셀핀다' : `공유받은 하루 리듬: ‘${type!.name}’ | Cellpinda`;
  const description=focusInvite ? '매번 달라지는 신호 24개로 반응·멈춤·규칙 전환에 도전해 보세요. 내 기록은 각자만 볼 수 있어요.' : `공유받은 ‘${type!.name}’의 이야기를 살펴보세요. 링크를 연 사람의 결과가 아니며, 의학적 진단이나 체내 GABA 측정이 아닙니다.`;
  document.title=title;
  const update=(selector:string,attribute:'name'|'property',value:string)=>{const element=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}=\"${selector}\"]`);if(element)element.content=value;else{const next=document.createElement('meta');next.setAttribute(attribute,selector);next.content=value;document.head.appendChild(next);}};
  const image=new URL(asset(focusInvite ? 'assets/social-card.png' : `assets/social-rhythm-${type!.id}.png`),window.location.origin).toString();
  update('description','name',description);update('og:title','property',title);update('og:description','property',description);update('og:image','property',image);update('og:url','property',window.location.href);update('twitter:title','name',title);update('twitter:description','name',description);update('twitter:image','name',image);
 },[]);
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
 const linkContext=referralId?<aside className="link-context" aria-live="polite">공유된 리듬 링크로 방문했어요. 내 하루도 1분이면 확인할 수 있어요.</aside>:campaignId?<aside className="link-context" aria-live="polite">캠페인 링크로 방문했어요. 원하는 흐름부터 살펴보세요.</aside>:null;
 return <><a className="skip" href="#main">본문으로 이동</a><header className="header"><a href={siteRoot} className="brand">Cellpinda<span className="brand-dot">.</span></a><nav aria-label="주 메뉴" className={menu?'open':''} onClick={()=>setMenu(false)}><a href="#rhythm">1분 체크</a><a href="#story">GABA란?</a><a href="#fermentation">왜 발효가바?</a><a href="#products">제품 구성</a>{content?.reviews?.length ? <a href="#reviews">구매자 후기</a> : null}</nav><a href="#rhythm" className="button small" onClick={()=>track('hero_check_start',{path:'/header'})}>1분 체크 <ArrowRight size={18}/></a><button className="menu-toggle" aria-label={menu?'메뉴 닫기':'메뉴 열기'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>{linkContext}
 <main id="main"><section className="hero"><img className="hero-photo" src={asset('assets/rhythm-window.png')} alt="초록 나무가 보이는 열린 창가와 물 한 잔"/><div className="hero-copy"><p className="chapter">셀핀다 발효가바 · 오늘 내 상태</p><h1>일이 끝나도<br/>머리가 쉬지 않으신가요?</h1><p className="hero-question">잠자리에 누워도 잠이 안 오고, 쉬어도 피곤한 날.<br className="mobile-break"/> 1분 체크로 지금 뇌 피로가 쌓였는지 돌아보세요.</p><p className="muted">GABA는 뇌에서 신경세포 사이의 신호를 조절하는 물질입니다.<br/>셀핀다는 발효 기술로 만든 발효가바를 하루 한 포에 담았습니다.</p><div className="actions"><a className="button" href="#rhythm" onClick={()=>track('hero_check_start',{path:'/'})}>1분 리듬 체크 시작 <ArrowRight/></a><a className="button outline" href="#teaser">발효가바 이야기 영상 보기 <ArrowRight/></a></div>{content?.products.length ? <div className="hero-product"><img src={asset(`assets/product-${content.products[0].amountMg}.jpg`)} alt={`${content.products[0].name} 실제 제품 포장`}/><div><strong>발효 기술로 만든 셀핀다 발효가바</strong><span className="hero-product-meta">{content.products[0].name} · {content.products[0].amountMg.toLocaleString()} mg × {content.products[0].servings}포</span><div className="hero-shortcuts"><a href="#products">제품 구성 보기 →</a><a href={content.products[0].officialUrl} target="_blank" rel="noreferrer" onClick={()=>{track('purchase_click',{productId:content.products![0].id,path:'/hero'});track('purchase_cta_click',{productId:content.products![0].id,path:'/hero'})}}>구매처 확인 →</a>{content.reviews?.length ? <a href="#reviews" onClick={()=>track('review_nav',{productId:content.products![0].id,path:'/hero'})}>후기 읽기 →</a> : null}</div></div></div> : null}</div></section>
 <section className="intro-strip wrap"><h2>나를 돌아보는 1분,<br/>오늘을 가볍게.</h2>{[['01','확인','오늘 내 상태를 짧게 확인해요.'],['02','이해','GABA가 어떤 물질인지 알아봐요.'],['03','선택','제품 표시를 확인하고 결정해요.']].map(([n,t,d])=><div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</section>
 <section className="section empathy" aria-labelledby="empathy-heading"><div className="wrap"><div className="section-head"><div><p className="chapter">잠깐, 오늘 내 상태</p><h2 id="empathy-heading">이런 날이<br/>자주 있나요?</h2></div><p>아래에서 가장 가까운 장면을 골라 주세요.<br/>1분 체크로 바로 이어집니다.</p></div><div className="empathy-cards">{[['일이 끝나도 계속 생각나나요?','퇴근하거나 집안일을 끝내도 할 일이 머릿속에서 떠나지 않습니다.'],['잠자리에 누워도 잠이 안 오나요?','불을 끄고 누워도 한참 뒤척이다 잠듭니다.'],['5분도 쉬지 못하고 하루를 보내나요?','일과 집안일 사이에 앉아서 쉬는 시간이 거의 없습니다.'],['쉬어도 아침에 피곤한가요?','잠을 자고 일어나도 몸과 머리가 무겁습니다.']].map(([title,description],index)=><a className="empathy-card" href="#rhythm" key={title} onClick={()=>track('hero_check_start',{path:'/empathy',signal:`0${index+1}`})}><span>0{index+1}</span><h3>{title}</h3><p>{description}</p><strong>지금 내 상태 확인하기 <ArrowRight size={16}/></strong></a>)}</div></div></section>
 <div className="wrap section"><RhythmExperience onEvent={track}/></div>
  <BrainLoadEvidence />
  <TeaserPreview onEvent={track}/>
  {content ? <>
   <GabaEvidenceHighlights claims={content.claims} onOpen={claimId=>track('evidence_opened',{path:'/gaba-evidence',claimId})}/>
   <GabaStory claims={content.claims} hasReviews={content.reviews.length > 0}/>
 <section id="fermentation" className="section sage"><div className="wrap"><div className="section-head"><div><p className="chapter">03 / 왜 발효가바?</p><h2>한 포의 출처를<br/>네 가지 질문으로.</h2></div><p>어려운 기술 설명보다, 제품을 만들고 확인하는 과정을 쉽게 보여드립니다.<br/>확인할 수 있는 자료만 차례로 공개합니다.</p></div><div className="fermentation-questions">{[['무엇으로 만드나요?','셀핀다는 발효 기술로 만든 가바 제품입니다.'],['어떻게 만드나요?','공개된 특허에는 유산균에 L-글루탐산을 넣어 GABA를 만드는 방법이 소개돼 있습니다.'],['어떻게 확인하나요?','발효한 뒤 분리하고, 함량과 품질을 차례로 확인합니다.'],['구매 전 무엇을 보나요?','1포 내용량·포 수·섭취 방법은 스마트스토어와 포장 표시에서 확인하세요.']].map(([question,answer],index)=><article key={question}><span>0{index+1}</span><h3>{question}</h3><p>{answer}</p></article>)}</div><div className="process">{['발효','분리','함량 확인','품질 확인'].map((t,i)=><div key={t}><span>0{i+1}</span><h3>{t}</h3></div>)}</div>{content.claims.filter(c=>!c.id.startsWith('product-')&&!c.id.startsWith('research-')&&!c.id.startsWith('gaba-')&&c.publicText).map(c=><details className="claim" key={c.id}><summary>{c.publicText}</summary><div>{c.sources.filter(s=>s.url).map(s=><a key={s.url} href={s.url!} target="_blank" rel="noreferrer">공개 자료 확인 · {s.title} ↗ </a>)}</div></details>)}</div></section>
 <section id="products" className="section wrap"><div className="section-head"><div><p className="chapter">04 / 제품 구성</p><h2>가바 1500, 한 포에<br/>어떤 내용이 담겼는지.</h2></div><p>현재 판매 중인 가바 1500의 내용량과 포장 구성을 확인하세요.<br/>섭취 방법과 주의사항은 제품 표시에서 확인할 수 있습니다.</p></div><div className="products">{content.products.map(p=><article id={`product-${p.id}`} className="product" key={p.id}><img src={asset(`assets/product-${p.amountMg}.jpg`)} alt={`${p.name} 실제 제품 포장`} decoding="async"/><div className="product-body"><h3>{p.name}</h3><dl><div><dt>1포 내용량</dt><dd>{p.amountMg.toLocaleString()} mg</dd></div><div><dt>구성</dt><dd>{p.servings}포</dd></div><div><dt>총 내용량</dt><dd>{p.totalG} g</dd></div><div><dt>가격</dt><dd>{p.priceDisplay || '스마트스토어에서 확인'}</dd></div><div><dt>섭취·보관</dt><dd>스마트스토어와 포장 표시에서 확인</dd></div></dl><div className="product-boundary"><p>구매 전에 확인할 내용</p><ul><li><strong>포장 구성</strong> {p.name} {p.amountMg.toLocaleString()} mg × {p.servings}포</li><li><strong>가격·재고</strong> {p.availability || '스마트스토어에서 확인'}</li><li><strong>섭취·보관 방법</strong> 스마트스토어와 제품 표시에서 확인</li></ul></div>{content.reviews?.length ? <p><a className="text-link" href="#reviews" onClick={()=>{track('review_nav',{productId:p.id,path:'/products'});track('review_source_click',{productId:p.id,path:'/products'})}}>{p.name} 구매자 후기 보기 →</a></p> : null}<a className="button outline" href={p.officialUrl} target="_blank" rel="noreferrer" onClick={()=>{track('purchase_click',{productId:p.id,path:'/products'});track('purchase_cta_click',{productId:p.id,path:'/products'})}}>스마트스토어에서 제품 정보 확인 <ArrowUpRight size={18}/></a></div></article>)}</div><p className="note">상품 구성 기준 · 확인일 2026.09.10. 가격·재고·섭취 방법·주의사항은 구매 시 스마트스토어와 제품 표시에서 확인하세요.</p><PurchaseQuestions products={content.products} onEvent={track} />{content.products.length>0&&<ProductShare onEvent={track}/>}</section>
 <ReviewExperience reviews={content.reviews} onOpen={productId=>{track('review_open',{productId});track('review_source_click',{productId,path:'/reviews'})}}/>
 <ResearchLibrary claims={content.claims} onOpen={()=>track('evidence_opened',{path:'/research'})}/>
 </> : <ContentFallback loading={loading} onRetry={()=>setRetryKey(value=>value+1)}/>} 
 <SevenDayChallenge onEvent={track}/>
 <section className="closing"><div className="wrap between"><h2>오늘의 나를 돌아보는 시간.<br/>지금, 시작해 볼까요?</h2><a className="button light" href="#rhythm">1분 리듬 체크 <ArrowRight/></a></div></section></main><footer className="wrap footer"><a className="brand" href={siteRoot}>Cellpinda.</a><p>하루 리듬을 돌아보고, 충분히 알고 선택하세요.</p><a href="https://smartstore.naver.com/cellpinda/products/4701017202" target="_blank" rel="noreferrer">스마트스토어 ↗</a><a href={`${siteRoot}?view=account`}>내 기록</a><AnalyticsConsent/></footer></>;
}
