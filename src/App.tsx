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
const seenEvents=new Set<string>();
let eventQueue=Promise.resolve();
function trackOnce(name:string,properties:Record<string,string>={}){if(seenEvents.has(name))return;seenEvents.add(name);track(name,properties)}
function track(name:string,properties:Record<string,string>={}){
 const endpoint=apiEndpoint('/api/events');
 if(!endpoint)return;
 eventQueue=eventQueue.then(()=>fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventId:crypto.randomUUID(),flowId,name:eventMap[name]||name,properties}),keepalive:true}).then(()=>{}).catch(()=>{}));
}
async function loadContent(signal:AbortSignal):Promise<Content>{
 const endpoint=apiEndpoint('/api/content');
 if(endpoint){
  try{
   const api=await fetch(endpoint,{signal});
   if(api.ok)return api.json();
  }catch(error){
   if((error as Error).name==='AbortError')throw error;
  }
 }
 const fallback=await fetch(`${import.meta.env.BASE_URL}data/content.json`,{signal});
 if(!fallback.ok)throw Error('Content unavailable');
 return fallback.json();
}
export default function App(){
 const [content,setContent]=useState<Content|null>(null),[error,setError]=useState(false),[menu,setMenu]=useState(false);
 const currentPath=relativePath(location.pathname);
 const requestedView = new URLSearchParams(location.search).get('view');
 const operationsView = requestedView === 'ops' || currentPath === '/ops';
 const accountView = requestedView === 'account' || currentPath === '/account';
 const adminView = requestedView === 'admin' || currentPath === '/admin';
 useEffect(()=>{const c=new AbortController();loadContent(c.signal).then(setContent).catch(e=>{if(e.name!=='AbortError')setError(true)});return()=>c.abort()},[]);
 useEffect(()=>{
 if(adminView || accountView || operationsView)return;
  trackOnce('landing_view',{path:'/'});
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){trackOnce(entry.target.id==='story'?'gaba_story_viewed':'product_comparison_viewed',{path:entry.target.id==='story'?'/story':'/products'});observer.unobserve(entry.target)}},{threshold:0.25});
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
 return <><a className="skip" href="#main">본문으로 이동</a><header className="header"><a href={siteRoot} className="brand">Cellpinda<span className="brand-dot">.</span></a><nav aria-label="주 메뉴" className={menu?'open':''} onClick={()=>setMenu(false)}><a href="#rhythm">1분 체크</a><a href="#story">GABA란?</a><a href="#fermentation">왜 발효가바?</a><a href="#products">제품 비교</a><a href="#reviews">구매자 경험</a></nav><a href="#rhythm" className="button small">1분 체크 <ArrowRight size={18}/></a><button className="menu-toggle" aria-label={menu?'메뉴 닫기':'메뉴 열기'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <main id="main"><section className="hero"><img className="hero-photo" src={asset('assets/rhythm-window.png')} alt="초록 나무가 보이는 열린 창가와 물 한 잔"/><div className="hero-copy"><p className="chapter">셀핀다 발효가바 · 나의 하루 리듬</p><h1>오늘도 몸보다<br/>머리가 먼저 지치지 않았나요?</h1><p className="hero-question">생각이 멈추지 않는 밤, 쉽게 예민해지는 하루.<br className="mobile-break"/> 1분 리듬 체크로 지금 나에게 필요한 휴식 신호를 확인해 보세요.</p><p className="muted">GABA는 신경 신호의 균형 조절에 관여하는 물질입니다.<br/>셀핀다는 발효기술로 만든 발효가바를 하루 한 포에 담았습니다.</p><div className="actions"><a className="button" href="#rhythm">1분 리듬 체크 시작 <ArrowRight/></a><a className="button outline" href="#teaser">발효가바가 무엇인지 30초 만에 보기 <ArrowRight/></a></div>{content?.products.length ? <div className="hero-product"><img src={asset(`assets/product-${content.products[0].amountMg}.jpg`)} alt={`${content.products[0].name} 실제 제품 포장`}/><div><strong>김치 유래 유산균 발효기술로 만든 셀핀다 발효가바</strong><span className="hero-product-meta">{content.products[0].name} · {content.products[0].amountMg.toLocaleString()} mg × {content.products[0].servings}포</span><div className="hero-shortcuts"><a href="#products">제품 구성 보기 →</a><a href={content.products[0].officialUrl} target="_blank" rel="noreferrer">구매처 확인 →</a></div></div></div> : null}</div></section>
 <section className="intro-strip wrap"><h2>나를 돌아보는 1분,<br/>작은 변화의 시작.</h2>{[['01','발견','나의 하루를 짧게 돌아봐요.'],['02','이해','GABA 이야기를 살펴봐요.'],['03','선택','제품을 충분히 알고 선택해요.']].map(([n,t,d])=><div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</section>
 <div className="wrap section"><RhythmExperience onEvent={track}/></div>
 <TeaserPreview onEvent={track}/>
 <GabaStory claims={content?.claims??[]}/>
 <section id="fermentation" className="section sage"><div className="wrap"><div className="section-head"><div><p className="chapter">03 / 왜 발효가바?</p><h2>한 포의 출처를<br/>네 가지 질문으로.</h2></div><p>기술 용어보다 소비자가 확인할 차이를 먼저 살펴봅니다.<br/>자료로 확인되는 내용만 차례로 공개합니다.</p></div><div className="fermentation-questions">{[['무엇으로 만드나요?','셀핀다는 발효 가바 제품으로 소개됩니다.'],['어떻게 만드나요?','공개 특허 문헌에는 유산균에 L-글루탐산을 공급해 GABA를 생산하는 방법이 나옵니다.'],['어떻게 확인하나요?','발효 → 분리·회수 → 정량분석 → 품질확인의 흐름으로 자료를 살펴봅니다.'],['왜 셀핀다인가요?','확인된 제품 구성과 표시사항을 스마트스토어에서 비교해 보세요.']].map(([question,answer],index)=><article key={question}><span>0{index+1}</span><h3>{question}</h3><p>{answer}</p></article>)}</div><div className="process">{['발효','분리·회수','정량분석','품질 확인'].map((t,i)=><div key={t}><span>0{i+1}</span><h3>{t}</h3></div>)}</div>{error?<p role="status">제품 자료를 불러오지 못했습니다. 잠시 후 새로고침해 주세요.</p>:content?.claims.filter(c=>!c.id.startsWith('product-')&&!c.id.startsWith('research-')&&!c.id.startsWith('gaba-')).map(c=><details className="claim" key={c.id}><summary>{c.publicText}</summary><div><p>{(c.limitations??[]).join(' ')}</p>{c.sources.filter(s=>s.url).map(s=><a key={s.url} href={s.url!} target="_blank" rel="noreferrer">{s.title} ↗ </a>)}</div></details>)}</div></section>
 <section id="products" className="section wrap"><div className="section-head"><div><p className="chapter">04 / 제품 비교</p><h2>선택에 필요한 차이를,<br/>한눈에.</h2></div><p>현재 판매 제품의 내용량과 구성을 확인하세요.<br/>리듬 체크 결과로 제품이나 용량을 권하지 않습니다.</p></div><div className="products">{content?.products.map(p=><article id={`product-${p.id}`} className="product" key={p.id}><img src={asset(`assets/product-${p.amountMg}.jpg`)} alt={`${p.name} 실제 제품 포장`} decoding="async"/><div className="product-body"><h3>{p.name}</h3><dl><div><dt>1포 내용량</dt><dd>{p.amountMg.toLocaleString()} mg</dd></div><div><dt>구성</dt><dd>{p.servings}포</dd></div><div><dt>총 내용량</dt><dd>{p.totalG} g</dd></div><div><dt>가격</dt><dd>{p.priceDisplay || '스마트스토어에서 확인'}</dd></div><div><dt>맛·섭취·휴대</dt><dd>스마트스토어와 포장 표시사항 확인</dd></div></dl><div className="product-boundary"><p>구매 전에 확인할 것</p><ul><li><strong>구성</strong> {p.name} {p.amountMg.toLocaleString()} mg × {p.servings}포</li><li><strong>재고·가격</strong> {p.availability || '스마트스토어에서 확인'}</li><li><strong>섭취 방법</strong> 스마트스토어와 제품 표시사항 확인</li></ul></div><p><a className="text-link" href="#reviews" onClick={()=>track('review_nav',{productId:p.id,path:'/products'})}>{p.name} 구매자 경험 보기 →</a></p><a className="button outline" href={p.officialUrl} target="_blank" rel="noreferrer" onClick={()=>track('purchase_click',{productId:p.id})}>스마트스토어에서 구성·재고 확인 <ArrowUpRight size={18}/></a></div></article>)}</div><p className="note">상품 구성 기준 · 확인일 2026.09.10. 가격·재고·섭취 방법·주의사항은 구매 시 스마트스토어와 제품 표시사항에서 확인하세요.</p><PurchaseQuestions products={content?.products??[]} onEvent={track} />{Boolean(content?.products.length&&content.products.length>1)&&<ProductShare onEvent={track}/>}</section>
 <ReviewExperience reviews={content?.reviews??[]} onOpen={productId=>track('review_open',{productId})}/>
 <ResearchLibrary claims={content?.claims??[]} onOpen={()=>track('evidence_opened',{path:'/research'})}/>
 <SevenDayChallenge/>
 <section className="closing"><div className="wrap between"><h2>오늘의 나를 돌아보는 시간.<br/>지금, 시작해 볼까요?</h2><a className="button light" href="#rhythm">1분 리듬 체크 <ArrowRight/></a></div></section></main><footer className="wrap footer"><a className="brand" href={siteRoot}>Cellpinda.</a><p>하루 리듬을 돌아보고, 충분히 알고 선택하세요.</p><a href="https://smartstore.naver.com/cellpinda" target="_blank" rel="noreferrer">스마트스토어 ↗</a><a href={`${siteRoot}?view=account`}>내 기록</a></footer></>;
}
