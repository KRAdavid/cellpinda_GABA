import {useState} from 'react';

type Props={onEvent?:(name:string,properties:Record<string,string>)=>void};
export default function ProductShare({onEvent}:Props){
 const [busy,setBusy]=useState(false),[message,setMessage]=useState(''),[manual,setManual]=useState('');
 function link(){const url=new URL('/',window.location.origin);url.searchParams.set('view','products');url.hash='products';return url.href;}
 async function copy(){
  const url=link();
  try{await navigator.clipboard.writeText(url);setManual('');setMessage('제품 비교 링크를 복사했어요. 함께 보고 싶은 사람에게 전달하세요.');onEvent?.('share_link_copied',{path:'/products',channel:'clipboard'});}
  catch{setManual(url);setMessage('아래 링크를 선택해 직접 복사해 주세요.');}
 }
 async function share(){
  if(busy)return;setBusy(true);setMessage('');setManual('');
  try{
   if(typeof navigator.share!=='function'){await copy();return;}
   onEvent?.('share_requested',{path:'/products',channel:'native'});
   await navigator.share({title:'셀핀다 가바 제품 구성 비교',text:'1포 내용량과 구성을 함께 살펴보세요.',url:link()});
   setMessage('공유 창에서 선택한 앱을 확인해 주세요.');
  }catch(error){
   if(error instanceof Error&&error.name==='AbortError'){setMessage('공유를 취소했어요.');onEvent?.('share_cancelled',{path:'/products',channel:'native'});}
   else{setManual(link());setMessage('공유 창을 열지 못했어요. 아래 링크를 복사해 전달해 주세요.');}
  }finally{setBusy(false);}
 }
 return <aside className="product-share" aria-labelledby="product-share-heading"><div><h3 id="product-share-heading">함께 보고, 선택하세요.</h3><p>제품 구성이 궁금한 사람에게 비교 페이지를 보내세요.</p></div><div>
  <button type="button" className="button outline" disabled={busy} onClick={()=>void share()}>제품 비교 링크 공유 ↗</button>
  {typeof navigator.share==='function'&&<button type="button" className="text-link" disabled={busy} onClick={()=>void copy()}>링크 복사</button>}
  <p role="status" aria-live="polite">{message}</p>{manual&&<label>직접 복사할 제품 비교 링크<input value={manual} readOnly onFocus={event=>event.currentTarget.select()}/></label>}
 </div></aside>;
}
