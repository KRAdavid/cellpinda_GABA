import { useEffect, useState, lazy, Suspense } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import RhythmExperience from './components/RhythmExperience';
import ResearchLibrary, {type Claim} from './components/ResearchLibrary';
import ReviewExperience,{type PublicReview} from './components/ReviewExperience';
import SevenDayChallenge from './components/SevenDayChallenge';
import GabaStory from './components/GabaStory';
import TeaserPreview from './components/TeaserPreview';
import ProductShare from './components/ProductShare';
import PurchaseQuestions from './components/PurchaseQuestions';
import OperationsMvp from './components/OperationsMvp';
import {apiEndpoint} from './api-origin';
import {resultTypes, rhythmIdFromUrl} from './domain/rhythm';
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
function trackOnce(name:string,properties:Record<string,string>={}){if(seenEvents.has(name))return;seenEvents.add(name);track(name,properties)}
function track(name:string,properties:Record<string,string>={}){
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
 return <section className="section wrap content-status" aria-live="polite"><p className="chapter">셀핀다 발효가바</p><h2>{loading?'정보를 준비하고 있어요.':'잠시 연결이 늦어졌어요.'}</h2><p>{loading?'제품 구성과 연구 자료를 불러오는 중입니다.':'기본 리듬 체크는 바로 사용할 수 있어요. 아래에서 GABA와 제품 정보를 먼저 살펴보세요.'}</p>{!loading?<div className="actions"><a className="button outline" href="https://smartstore.naver.com/cellpinda" target="_blank" rel="noreferrer">스마트스토어에서 확인 ↗</a><button type="button" className="button outline" onClick={onRetry}>자료 다시 불러오기</button></div>:null}{!loading?<div className="content-status-grid"><article id="story"><p className="chapter">GABA란?</p><h3>신경 신호의 균형을 돕는 물질</h3><p>GABA는 과도하게 켜진 신경 신호의 강도를 조절하는 데 관여합니다.</p></article><article id="fermentation"><p className="chapter">왜 발효가바?</p><h3>발효에서 품질 확인까지</h3><p>셀핀다는 발효 → 분리·회수 → 정량분석 → 품질확인의 흐름으로 제품을 소개합니다.</p></article><article id="products"><p className="chapter">제품 구성</p><h3>셀핀다 가바 1,500 mg × 30포</h3><p>최신 구성과 섭취 정보는 스마트스토어와 포장 표시사항에서 확인해 보세요.</p><a className="text-link" href="https://smartstore.naver.com/cellpinda" target="_blank" rel="noreferrer">스마트스토어에서 제품 정보 확인 ↗</a></article><article id="reviews"><p className="chapter">구매자 경험</p><h3>스마트스토어 원문에서 확인</h3><p>제품을 선택한 사람들의 경험은 스마트스토어에서 직접 살펴볼 수 있어요.</p></article><article id="research"><p className="chapter">연구를 쉽게 읽기</p><h3>사람 대상 연구를 쉬운 말로</h3><p>GABA와 휴식·수면·운동 관련 연구를 소비자 언어로 정리해 소개합니다.</p></article></div>:null}</section>;
}
export default function App(){
 const [content,setContent]=useState<Content|null>(null),[error,setError]=useState(false),[loading,setLoading]=useState(true),[menu,setMenu]=useState(false),[retryKey,setRetryKey]=useState(0);
 const currentPath=relativePath(location.pathname);
 const requestedView = new URLSearchParams(location.search).get('view');
 const operationsView = requestedView === 'ops' || currentPath === '/ops';
 const accountView = requestedView === 'account' || currentPath === '/account';
 const adminView = requestedView === 'admin' || currentPath === '/admin';
 useEffect(()=>{const c=new AbortController();setLoading(true);setError(false);loadContent(c.signal).then(setContent).catch(e=>{if(e.name!=='AbortError')setError(true)}).finally(()=>setLoading(false));return()=>c.abort()},[retryKey]);
 useEffect(()=>{
  const value=rhythmIdFromUrl(new URL(location.href));
  const type=value ? resultTypes[value] : null;
  if(!type)return;
  const title=`공유받은 하루 리듬: ‘${type.name}’ | Cellpinda`;
  const description=`공유받은 ‘${type.name}’의 이야기를 살펴보세요. 링크를 연 사람의 결과가 아니며, 의학적 진단이나 체내 GABA 측정이 아닙니다.`;
  document.title=title;
  const update=(selector:string,attribute:'name'|'property',value:string)=>{const element=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}=\"${selector}\"]`);if(element)element.content=value;else{const next=document.createElement('meta');next.setAttribute(attribute,selector);next.content=value;document.head.appendChild(next);}};
  const image=new URL(asset(`assets/social-rhythm-${type.id}.png`),window.location.origin).toString();
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
 return <><a className="skip" href="#main">본문으로 이동</a><header className="header"><a href={siteRoot} className="brand">Cellpinda<span className="brand-dot">.</span></a><nav aria-label="주 메뉴" className={menu?'open':''} onClick={()=>setMenu(false)}><a href="#rhythm">1분 체크</a><a href="#story">GABA란?</a><a href="#fermentation">왜 발효가바?</a><a href="#products">제품 구성 확인</a>{content?.reviews?.length ? <a href="#reviews">구매자 경험</a> : null}</nav><a href="#rhythm" className="button small" onClick={()=>track('hero_check_start',{path:'/header'})}>1분 체크 <ArrowRight size={18}/></a><button className="menu-toggle" aria-label={menu?'메뉴 닫기':'메뉴 열기'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>{linkContext}
 <main id="main"><section className="hero"><img className="hero-photo" src={asset('assets/rhythm-window.png')} alt="초록 나무가 보이는 열린 창가와 물 한 잔"/><div className="hero-copy"><p className="chapter">셀핀다 발효가바 · 나의 하루 리듬</p><h1>오늘도 몸보다<br/>머리가 먼저 지치지 않았나요?</h1><p className="hero-question">생각이 멈추지 않는 밤, 쉽게 예민해지는 하루.<br className="mobile-break"/> 1분 리듬 체크로 지금 나에게 필요한 휴식 신호를 확인해 보세요.</p><p className="muted">GABA는 신경 신호의 균형 조절에 관여하는 물질입니다.<br/>셀핀다는 발효기술로 만든 발효가바를 하루 한 포에 담았습니다.</p><div className="actions"><a className="button" href="#rhythm" onClick={()=>track('hero_check_start',{path:'/'})}>1분 리듬 체크 시작 <ArrowRight/></a><a className="button outline" href="#teaser">발효가바가 무엇인지 30초 만에 보기 <ArrowRight/></a></div>{content?.products.length ? <div className="hero-product"><img src={asset(`assets/product-${content.products[0].amountMg}.jpg`)} alt={`${content.products[0].name} 실제 제품 포장`}/><div><strong>김치 유래 유산균 발효기술로 만든 셀핀다 발효가바</strong><span className="hero-product-meta">{content.products[0].name} · {content.products[0].amountMg.toLocaleString()} mg × {content.products[0].servings}포</span><div className="hero-shortcuts"><a href="#products">제품 구성 보기 →</a><a href={content.products[0].officialUrl} target="_blank" rel="noreferrer">구매처 확인 →</a></div></div></div> : null}</div></section>
 <section className="intro-strip wrap"><h2>나를 돌아보는 1분,<br/>작은 변화의 시작.</h2>{[['01','발견','나의 하루를 짧게 돌아봐요.'],['02','이해','GABA 이야기를 살펴봐요.'],['03','선택','제품을 충분히 알고 선택해요.']].map(([n,t,d])=><div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</section>
 <section className="section empathy" aria-labelledby="empathy-heading"><div className="wrap"><div className="section-head"><div><p className="chapter">잠깐, 나의 하루</p><h2 id="empathy-heading">이런 하루가<br/>반복되고 있나요?</h2></div><p>아래 문장 중 마음에 닿는 장면을 골라 보세요.<br/>체크 시작 화면으로 이동해요.</p></div><div className="empathy-cards">{[['누워도 생각이 계속 이어져요','잠자리에서도 오늘의 일이 쉽게 멈추지 않아요.'],['작은 자극에도 예민해져요','소리·화면·사람이 많은 뒤에 감각이 크게 느껴져요.'],['집중하려는데 흐름이 끊겨요','하던 일을 잠깐 멈추고 다시 시작하는 일이 잦아요.'],['쉬어도 충분히 쉰 느낌이 없어요','몸은 멈췄는데 머리는 계속 켜져 있는 것 같아요.']].map(([title,description],index)=><a className="empathy-card" href="#rhythm" key={title} onClick={()=>track('hero_check_start',{path:'/empathy',signal:`0${index+1}`})}><span>0{index+1}</span><h3>{title}</h3><p>{description}</p><strong>내 리듬 확인하기 <ArrowRight size={16}/></strong></a>)}</div></div></section>
 <div className="wrap section"><RhythmExperience onEvent={track}/></div>
 <TeaserPreview onEvent={track}/>
 {content ? <>
 <GabaStory claims={content.claims} hasReviews={content.reviews.length > 0}/>
 <section id="fermentation" className="section sage"><div className="wrap"><div className="section-head"><div><p className="chapter">03 / 왜 발효가바?</p><h2>한 포의 출처를<br/>네 가지 질문으로.</h2></div><p>기술 용어보다 소비자가 확인할 차이를 먼저 살펴봅니다.<br/>자료로 확인되는 내용만 차례로 공개합니다.</p></div><div className="fermentation-questions">{[['무엇으로 만드나요?','셀핀다는 발효 가바 제품으로 소개됩니다.'],['어떻게 만드나요?','공개 특허 문헌에는 유산균에 L-글루탐산을 공급해 GABA를 생산하는 방법이 나옵니다.'],['어떻게 확인하나요?','발효 → 분리·회수 → 정량분석 → 품질확인의 흐름으로 자료를 살펴봅니다.'],['왜 셀핀다인가요?','확인된 제품 구성과 표시사항을 스마트스토어에서 비교해 보세요.']].map(([question,answer],index)=><article key={question}><span>0{index+1}</span><h3>{question}</h3><p>{answer}</p></article>)}</div><div className="process">{['발효','분리·회수','정량분석','품질 확인'].map((t,i)=><div key={t}><span>0{i+1}</span><h3>{t}</h3></div>)}</div>{content.claims.filter(c=>!c.id.startsWith('product-')&&!c.id.startsWith('research-')&&!c.id.startsWith('gaba-')&&c.publicText).map(c=><details className="claim" key={c.id}><summary>{c.publicText}</summary><div>{c.sources.filter(s=>s.url).map(s=><a key={s.url} href={s.url!} target="_blank" rel="noreferrer">공개 자료 확인 · {s.title} ↗ </a>)}</div></details>)}</div></section>
 <section id="products" className="section wrap"><div className="section-head"><div><p className="chapter">04 / 제품 구성</p><h2>한 포에 담긴 구성을,<br/>한눈에.</h2></div><p>현재 판매 제품의 내용량과 구성을 확인하세요.<br/>리듬 체크 후 제품의 구성과 표시사항을 스스로 비교해 보세요.</p></div><div className="products">{content.products.map(p=><article id={`product-${p.id}`} className="product" key={p.id}><img src={asset(`assets/product-${p.amountMg}.jpg`)} alt={`${p.name} 실제 제품 포장`} decoding="async"/><div className="product-body"><h3>{p.name}</h3><dl><div><dt>1포 내용량</dt><dd>{p.amountMg.toLocaleString()} mg</dd></div><div><dt>구성</dt><dd>{p.servings}포</dd></div><div><dt>총 내용량</dt><dd>{p.totalG} g</dd></div><div><dt>가격</dt><dd>{p.priceDisplay || '스마트스토어에서 확인'}</dd></div><div><dt>맛·섭취·휴대</dt><dd>스마트스토어와 포장 표시사항 확인</dd></div></dl><div className="product-boundary"><p>구매 전에 확인할 것</p><ul><li><strong>구성</strong> {p.name} {p.amountMg.toLocaleString()} mg × {p.servings}포</li><li><strong>재고·가격</strong> {p.availability || '스마트스토어에서 확인'}</li><li><strong>섭취 방법</strong> 스마트스토어와 제품 표시사항 확인</li></ul></div>{content.reviews?.length ? <p><a className="text-link" href="#reviews" onClick={()=>{track('review_nav',{productId:p.id,path:'/products'});track('review_source_click',{productId:p.id,path:'/products'})}}>{p.name} 구매자 경험 보기 →</a></p> : null}<a className="button outline" href={p.officialUrl} target="_blank" rel="noreferrer" onClick={()=>{track('purchase_click',{productId:p.id,path:'/products'});track('purchase_cta_click',{productId:p.id,path:'/products'})}}>스마트스토어에서 구성·재고 확인 <ArrowUpRight size={18}/></a></div></article>)}</div><p className="note">상품 구성 기준 · 확인일 2026.09.10. 가격·재고·섭취 방법·주의사항은 구매 시 스마트스토어와 제품 표시사항에서 확인하세요.</p><PurchaseQuestions products={content.products} onEvent={track} />{content.products.length>0&&<ProductShare onEvent={track}/>}</section>
 <ReviewExperience reviews={content.reviews} onOpen={productId=>{track('review_open',{productId});track('review_source_click',{productId,path:'/reviews'})}}/>
 <ResearchLibrary claims={content.claims} onOpen={()=>track('evidence_opened',{path:'/research'})}/>
 </> : <ContentFallback loading={loading} onRetry={()=>setRetryKey(value=>value+1)}/>} 
 <SevenDayChallenge onEvent={track}/>
 <section className="closing"><div className="wrap between"><h2>오늘의 나를 돌아보는 시간.<br/>지금, 시작해 볼까요?</h2><a className="button light" href="#rhythm">1분 리듬 체크 <ArrowRight/></a></div></section></main><footer className="wrap footer"><a className="brand" href={siteRoot}>Cellpinda.</a><p>하루 리듬을 돌아보고, 충분히 알고 선택하세요.</p><a href="https://smartstore.naver.com/cellpinda" target="_blank" rel="noreferrer">스마트스토어 ↗</a><a href={`${siteRoot}?view=account`}>내 기록</a></footer></>;
}
