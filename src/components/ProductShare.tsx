import {useState} from 'react';
import {preserveCampaign} from '../domain/share';

type Props={onEvent?:(name:string,properties:Record<string,string>)=>void};
export default function ProductShare({onEvent}:Props){
 const [busy,setBusy]=useState(false),[message,setMessage]=useState(''),[manual,setManual]=useState('');
 function link(){const url=new URL(import.meta.env.BASE_URL,window.location.origin);url.searchParams.set('view','products');preserveCampaign(url,window.location.search);url.hash='products';return url.href;}
 async function copy(){
  const url=link();
   try{await navigator.clipboard.writeText(url);setManual('');setMessage('제품 정보 링크를 복사했어요. 함께 확인할 사람에게 전달하세요.');onEvent?.('share_link_copied',{path:'/products',channel:'clipboard'});}
  catch{setManual(url);setMessage('아래 링크를 선택해 직접 복사해 주세요.');}
 }
 async function share(){
  if(busy)return;setBusy(true);setMessage('');setManual('');
  try{
   if(typeof navigator.share!=='function'){await copy();return;}
   onEvent?.('share_requested',{path:'/products',channel:'native'});
   await navigator.share({title:'셀핀다 가바 1500 제품 정보',text:'한 포에 든 양과 포장 구성을 함께 확인해 보세요.',url:link()});
   setMessage('공유 창에서 선택한 앱을 확인해 주세요.');
  }catch(error){
   if(error instanceof Error&&error.name==='AbortError'){setMessage('공유를 취소했어요.');onEvent?.('share_cancelled',{path:'/products',channel:'native'});}
   else{setManual(link());setMessage('공유 창을 열지 못했어요. 아래 링크를 복사해 전달해 주세요.');}
  }finally{setBusy(false);}
 }
 return <aside className="product-share" aria-labelledby="product-share-heading"><div><h3 id="product-share-heading">가족·친구와 함께 확인해 보세요.</h3><p>한 포에 든 양과 포장 구성을 확인할 사람에게 보내세요.</p></div><div>
  <button type="button" className="button outline" disabled={busy} onClick={()=>void share()}>제품 정보 링크 공유 ↗</button>
  {typeof navigator.share==='function'&&<button type="button" className="text-link" disabled={busy} onClick={()=>void copy()}>링크 복사</button>}
  <p role="status" aria-live="polite">{message}</p>{manual&&<label>직접 복사할 제품 구성 링크<input value={manual} readOnly onFocus={event=>event.currentTarget.select()}/></label>}
 </div></aside>;
}
