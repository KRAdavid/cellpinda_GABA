import {cpSync,existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';

// Export a new source snapshot, never the local history containing internal review material.
const root=process.cwd();
const target=resolve(root,process.argv[2] || 'tmp/github-consumer-release');
if(!relative(resolve(root,'tmp'),target) || relative(resolve(root,'tmp'),target).startsWith('..'+sep) || existsSync(target))throw Error('Choose a new directory inside workspace/tmp');
mkdirSync(target,{recursive:true});
const paths=['.github','src','server','worker','public','.gitignore','index.html','package.json','pnpm-lock.yaml','pnpm-workspace.yaml','tsconfig.json','vite.config.ts','wrangler.jsonc'];
for(const path of paths)cpSync(resolve(root,path),resolve(target,path),{recursive:true});
const ledger=JSON.parse(readFileSync(resolve(root,'data/content-ledger.json'),'utf8'));
const pick=(value,keys)=>Object.fromEntries(keys.filter(key=>value[key]!==undefined).map(key=>[key,value[key]]));
const claims=ledger.claims.filter(c=>c.status==='approved'&&c.publicText&&c.sources.some(s=>s.url?.startsWith('https://'))).map(c=>({...pick(c,['id','topic','publicText','status','limitations','metadata']),sources:c.sources.filter(s=>s.url?.startsWith('https://')).map(s=>pick(s,['title','url','page','locator']))}));
const ids=new Set(claims.map(c=>c.id));
const products=ledger.products.filter(p=>p.status==='approved'&&p.sourceIds?.every(id=>ids.has(id))).map(p=>pick(p,['id','name','amountMg','servings','totalG','officialUrl','status','availability','priceDisplay','sourceIds']));
const reviews=ledger.reviews.filter(r=>r.id==='shop-review-destination'&&r.status==='approved').map(r=>pick(r,['id','status','publicText','sourceTitle','sourceUrl','originalPublic','limitations']));
mkdirSync(resolve(target,'data'));
writeFileSync(resolve(target,'data/content-ledger.json'),JSON.stringify({schemaVersion:1,checkedAt:ledger.checkedAt,policy:{approvedMeaning:'Source-checked editorial text, not clinical or legal certification.',publicExport:'Public sources only. Internal reviews and customer quotations excluded.'},claims,products,reviews},null,2)+'\n');
writeFileSync(resolve(target,'.env.example'),'ADMIN_TOKEN=\nMEMBER_ORIGIN=\n');
writeFileSync(resolve(target,'README.md'),`# Cellpinda Rhythm

셀핀다 가바 완제품을 알아보는 한국어 체험형 사이트의 검토용 소스입니다. 생활 리듬 체크, 결과 카드 공유, 근거 탐색, 제품 비교, 콘텐츠 검토, 7일 기록 및 패스키 회원 기능을 포함합니다.

이 저장소는 승인된 공개 문안만 담은 별도 스냅샷입니다. 내부 문서, 비공개 후기, 로컬 Git 이력, 비밀키는 포함하지 않습니다. 승인 상태는 편집 검토 상태이며 임상·법률 인증이 아닙니다.

## 실행

Node.js 24와 pnpm을 사용합니다. pnpm install 후 pnpm build, pnpm test, pnpm worker:dev를 실행하세요. Worker 개발 주소는 http://localhost:8788 입니다. Node 전용 개발 API는 pnpm server, 화면은 pnpm dev로 실행합니다.

## 운영 설정

ADMIN_TOKEN은 비밀 저장소에 충분히 긴 무작위 값으로 설정하세요. MEMBER_ORIGIN이 정확히 일치하는 주소에서만 회원 기능이 활성화됩니다. 현재 소스의 공유 origin은 임시 미리보기이므로 정식 배포 때 worker/social.ts와 운영 설정을 함께 갱신해야 합니다.

회원 기능은 베타이며 물리 인증기·영구 도메인 검증과 운영 정책 확정이 남아 있습니다. 주문·환불 도메인 코드는 실제 쇼핑몰 연결이 아니며 추천 혜택 지급 기능도 활성화되지 않았습니다. AI API 연결, 후기 재게시, 현행 제품 표시사항 검증, 정식 운영 배포는 별도 남은 작업입니다.
`);
console.log(JSON.stringify({directory:target,claims:claims.length,products:products.length,reviews:reviews.length,internalHistoryIncluded:false}));
