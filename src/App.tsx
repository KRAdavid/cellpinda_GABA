import { useEffect, useState, lazy, Suspense } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import RhythmExperience from './components/RhythmExperience';
import ResearchLibrary, {type Claim} from './components/ResearchLibrary';
import ReviewExperience,{type PublicReview} from './components/ReviewExperience';
import SevenDayChallenge from './components/SevenDayChallenge';
import GabaStory from './components/GabaStory';
import ProductShare from './components/ProductShare';
import PurchaseQuestions from './components/PurchaseQuestions';
const Admin = lazy(() => import('./components/Admin'));
const MemberRecords=lazy(()=>import('./components/MemberRecords'));
type Product={id:string;name:string;amountMg:number;servings:number;totalG:number;officialUrl:string};
type Content={claims:Claim[];products:Product[];reviews:PublicReview[]};
const eventMap:Record<string,string>={rhythm_start:'rhythm_check_started',rhythm_complete:'rhythm_check_completed',share_request:'share_requested',share_copy:'share_link_copied',card_download:'share_image_downloaded',purchase_click:'purchase_outbound_clicked',review_open:'review_opened',review_nav:'review_section_navigated',faq_open:'purchase_question_opened'};
const flowId=crypto.randomUUID();
const seenEvents=new Set<string>();
let eventQueue=Promise.resolve();
function trackOnce(name:string,properties:Record<string,string>={}){if(seenEvents.has(name))return;seenEvents.add(name);track(name,properties)}
function track(name:string,properties:Record<string,string>={}){eventQueue=eventQueue.then(()=>fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventId:crypto.randomUUID(),flowId,name:eventMap[name]||name,properties}),keepalive:true}).then(()=>{}).catch(()=>{}));}
export default function App(){
 const [content,setContent]=useState<Content|null>(null),[error,setError]=useState(false),[menu,setMenu]=useState(false);
 useEffect(()=>{const c=new AbortController();fetch('/api/content',{signal:c.signal}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(setContent).catch(e=>{if(e.name!=='AbortError')setError(true)});return()=>c.abort()},[]);
 useEffect(()=>{
 if(['/admin','/account'].includes(location.pathname))return;
  trackOnce('landing_view',{path:'/'});
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){trackOnce(entry.target.id==='story'?'gaba_story_viewed':'product_comparison_viewed',{path:entry.target.id==='story'?'/story':'/products'});observer.unobserve(entry.target)}},{threshold:0.25});
  for(const id of ['story','products']){const ready=id==='products'?Boolean(content?.products.length):Boolean(content?.claims.some(claim=>claim.id==='gaba-definition'&&claim.status==='approved'));const element=document.getElementById(id);if(ready&&element)observer.observe(element)}
  return()=>observer.disconnect();
 },[content]);
 useEffect(()=>{
  if(!content||location.pathname!=='/')return;
  const url=new URL(location.href);
  const productView=url.searchParams.getAll('view').length===1&&url.searchParams.get('view')==='products'&&!url.searchParams.has('rhythm');
  if(productView){document.getElementById('products')?.scrollIntoView({block:'start',behavior:'instant'});trackOnce('shared_link_landed',{path:'/products',channel:'direct'});}
  else if(content.products.some(product=>url.hash===`#product-${product.id}`)){document.getElementById(url.hash.slice(1))?.scrollIntoView({block:'start',behavior:'instant'});}
 },[content]);
 if(location.pathname==='/account')return <Suspense fallback={<p className="loading">내 기록을 여는 중입니다.</p>}><MemberRecords/></Suspense>;
 if(location.pathname==='/admin')return <Suspense fallback={<p className="loading">검토실을 여는 중입니다.</p>}><Admin/></Suspense>;
 return <><a className="skip" href="#main">본문으로 이동</a><header className="header"><a href="/" className="brand">Cellpinda<span className="brand-dot">.</span></a><nav aria-label="주 메뉴" className={menu?'open':''} onClick={()=>setMenu(false)}><a href="#story">GABA 이야기</a><a href="#fermentation">발효기술</a><a href="#products">제품 경험</a><a href="#reviews">후기 원문</a><a href="#research">연구 근거</a></nav><a href="#rhythm" className="button small">리듬 체크 <ArrowRight size={18}/></a><button className="menu-toggle" aria-label={menu?'메뉴 닫기':'메뉴 열기'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <main id="main"><section className="hero"><img className="hero-photo" src="/assets/rhythm-window.png" alt="초록 나무가 보이는 열린 창가와 물 한 잔"/><div className="hero-copy"><p className="chapter">셀핀다 가바 · 제품과 연구 이야기</p><h1>오늘, 내 뇌는<br/>쉴 틈이 있었을까?</h1><p className="hero-question">몸은 쉬고 있는데,<br className="mobile-break"/> 머리는 계속 일하고 있나요?</p><p className="muted">바쁜 하루 속, 나의 긴장과 휴식 습관을 돌아보세요.</p><div className="actions"><a className="button" href="#rhythm">1분 리듬 체크 <ArrowRight/></a><a className="button outline" href="#fermentation">발효가바 알아보기 <ArrowRight/></a></div>{content?.products.length ? <div className="hero-product"><img src={`/assets/product-${content.products[0].amountMg}.jpg`} alt={`${content.products[0].name} 제품 포장`}/><div><strong>셀핀다 가바를 알아보세요.</strong><div className="hero-shortcuts"><a href="#products">제품 구성 보기 →</a><a href="#reviews">가바 750·1500 후기 원문 안내 →</a></div></div></div> : null}</div></section>
 <section className="intro-strip wrap"><h2>나를 돌아보는 1분,<br/>작은 변화의 시작.</h2>{[['01','발견','나의 하루를 짧게 돌아봐요.'],['02','이해','GABA 이야기를 살펴봐요.'],['03','선택','제품을 충분히 알고 선택해요.']].map(([n,t,d])=><div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</section>
 <div className="wrap section"><RhythmExperience onEvent={track}/></div>
 <GabaStory claims={content?.claims??[]}/>
 <ResearchLibrary claims={content?.claims??[]} onOpen={()=>track('evidence_opened',{path:'/research'})}/>
 <section id="fermentation" className="section sage"><div className="wrap"><div className="section-head"><div><p className="chapter">03 / 발효의 이야기</p><h2>한 포의 출처를<br/>따라가다.</h2></div><p>발효라는 설명에서 한 걸음 더.<br/>균주와 제조 기술의 공개 자료를 살펴봅니다.</p></div><div className="process">{['발효','분리·회수','정량분석','품질 확인'].map((t,i)=><div key={t}><span>0{i+1}</span><h3>{t}</h3></div>)}</div><p className="note">제조 자료를 읽는 네 가지 관점입니다. 현재 제품의 전체 공정을 보증하는 도식은 아닙니다.</p>{error?<p role="status">제품 자료를 불러오지 못했습니다. 잠시 후 새로고침해 주세요.</p>:content?.claims.filter(c=>!c.id.startsWith('product-')&&!c.id.startsWith('research-')&&!c.id.startsWith('gaba-')).map(c=><details className="claim" key={c.id}><summary>{c.publicText}</summary><div><p>{(c.limitations??[]).join(' ')}</p>{c.sources.filter(s=>s.url).map(s=><a key={s.url} href={s.url!} target="_blank" rel="noreferrer">{s.title} ↗ </a>)}</div></details>)}</div></section>
 <section id="products" className="section wrap"><div className="section-head"><div><p className="chapter">04 / 제품 경험</p><h2>선택에 필요한 차이를,<br/>한눈에.</h2></div><p>1포의 내용량과 구성을 비교하세요.<br/>리듬 체크 결과로 제품이나 용량을 권하지 않습니다.</p></div><div className="products">{content?.products.map(p=><article id={`product-${p.id}`} className="product" key={p.id}><img src={`/assets/product-${p.amountMg}.jpg`} alt={`${p.name} 실제 제품 포장`} decoding="async"/><div className="product-body"><h3>{p.name}</h3><dl><div><dt>1포 내용량</dt><dd>{p.amountMg.toLocaleString()} mg</dd></div><div><dt>구성</dt><dd>{p.servings}포</dd></div><div><dt>총 내용량</dt><dd>{p.totalG} g</dd></div></dl><div className="product-boundary"><p>이 카드에서 확인한 범위</p><ul><li><strong>구성</strong> 공식몰 상품명과 제품 이미지 기준</li><li><strong>효능·권장량</strong> 이 카드에서 판단하지 않음</li><li><strong>구매 전</strong> 가격·재고·섭취 방법·주의사항은 공식몰과 포장 표시사항 확인</li></ul></div><p><a className="text-link" href="#reviews" onClick={()=>track('review_nav',{productId:p.id,path:'/products'})}>{p.name} 후기 원문 안내 →</a></p><a className="button outline" href={p.officialUrl} target="_blank" rel="noreferrer" onClick={()=>track('purchase_click',{productId:p.id})}>공식몰에서 구성·재고 확인 <ArrowUpRight size={18}/></a></div></article>)}</div><p className="note">공식몰 상품명 기준 구성 · 확인일 2026.09.10. 가격·재고·섭취 방법·주의사항은 구매 시 제품 표시사항과 공식몰에서 확인하세요.</p><PurchaseQuestions products={content?.products??[]} onEvent={track} />{Boolean(content?.products.length)&&<ProductShare onEvent={track}/>}</section>
 <ReviewExperience reviews={content?.reviews??[]} onOpen={productId=>track('review_open',{productId})}/>
 <SevenDayChallenge/>
 <section className="closing"><div className="wrap between"><h2>오늘의 나를 돌아보는 시간.<br/>지금, 시작해 볼까요?</h2><a className="button light" href="#rhythm">1분 리듬 체크 <ArrowRight/></a></div></section></main><footer className="wrap footer"><a className="brand" href="/">Cellpinda.</a><p>하루 리듬을 돌아보고, 충분히 알고 선택하세요.</p><a href="https://cellpinda.co.kr" target="_blank" rel="noreferrer">공식몰 ↗</a><a href="/account">내 기록</a><a href="/admin">콘텐츠 검토실</a></footer></>;
}
