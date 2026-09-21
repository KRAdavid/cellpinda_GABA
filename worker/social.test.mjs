import test from 'node:test';
import assert from 'node:assert/strict';
import { socialMetadata, socialTags, PUBLIC_ORIGIN } from './social.ts';
import { resultTypes } from '../src/domain/rhythm.ts';

test('All shared types use UI labels without answers or personal queries',()=>{
  for(const [type,info] of Object.entries(resultTypes)){
    const meta=socialMetadata(`${PUBLIC_ORIGIN}/?rhythm=${type}&email=private@example.com&answers=22222#private`);
    assert.ok(meta.title.includes(info.shareLabel));assert.ok(meta.title.includes(info.name));assert.ok(meta.title.startsWith('공유받은'));assert.ok(meta.description.includes('링크를 연 사람의 결과가 아니며'));assert.equal(meta.canonical,`${PUBLIC_ORIGIN}/?rhythm=${type}`);
    assert.equal(meta.image,`${PUBLIC_ORIGIN}/assets/social-rhythm-${type}.png`);assert.ok(meta.imageAlt.includes(info.shareLabel));assert.ok(meta.imageAlt.includes(info.name));
    const tags=socialTags(meta);assert.ok(tags.includes('og:image'));assert.ok(tags.includes('twitter:card'));assert.ok(tags.includes('rel="canonical"'));
    assert.ok(tags.includes('property="og:site_name" content="셀핀다 발효가바"'));
    assert.ok(!tags.includes('private'));assert.ok(!tags.includes('22222'));assert.ok(meta.description.includes('의학적 진단'));
  }
});
test('Invalid, duplicate, non-root and hostile host inputs produce safe generic metadata',()=>{
  for(const path of ['/?rhythm=unknown','/?rhythm=active&rhythm=steady','/?rhythm=%22%3E%3Cscript%3E','/untrusted?rhythm=active']){
    const meta=socialMetadata(`${PUBLIC_ORIGIN}${path}`);assert.equal(meta.type,null);assert.equal(meta.canonical,`${PUBLIC_ORIGIN}/`);
  }
  const hostile=socialMetadata('https://hostile.example/?rhythm=active&name=SECRET');
  assert.equal(hostile.canonical,`${PUBLIC_ORIGIN}/?rhythm=active`);assert.ok(!socialTags(hostile).includes('hostile.example'));assert.ok(!socialTags(hostile).includes('SECRET'));
  assert.equal(socialMetadata('http://127.0.0.1:8788/?rhythm=steady').canonical,'http://127.0.0.1:8788/?rhythm=steady');
});
test('Admin is excluded from indexing and shared classifications',()=>{
  const meta=socialMetadata(`${PUBLIC_ORIGIN}/admin?rhythm=active&token=SECRET`);
  assert.equal(meta.admin,true);assert.equal(meta.type,null);assert.equal(meta.robots,'noindex, nofollow, noarchive');assert.ok(!socialTags(meta).includes('SECRET'));
});
test('Product comparison sharing has its own safe metadata without price or personal data',()=>{
  const meta=socialMetadata(`${PUBLIC_ORIGIN}/?view=products&email=PRIVATE&answers=22222#products`);
  assert.equal(meta.view,'products');assert.equal(meta.type,null);assert.equal(meta.title,'셀핀다 가바 제품 구성 비교 | Cellpinda');
  assert.equal(meta.description,'1포 내용량과 구성을 확인하고 스마트스토어에서 구매 조건을 살펴보세요.');assert.equal(meta.canonical,`${PUBLIC_ORIGIN}/products/`);
  assert.equal(meta.image,`${PUBLIC_ORIGIN}/assets/product-composition-1500.png`);assert.equal(meta.imageAlt,'셀핀다 가바 1500, 30포 한 상자 구성 안내');
  assert.ok(!socialTags(meta).includes('PRIVATE'));assert.ok(!socialTags(meta).includes('22222'));assert.ok(!socialTags(meta).includes('#products'));assert.ok(socialTags(meta).includes('og:image:type'));assert.ok(socialTags(meta).includes('property="og:type" content="product"'));
  assert.equal(socialMetadata('https://hostile.example/?view=products').canonical,`${PUBLIC_ORIGIN}/products/`);
});
test('Private account and research query views receive route-specific metadata',()=>{
  const account=socialMetadata(`${PUBLIC_ORIGIN}/?view=account`);
  assert.equal(account.admin,true);assert.equal(account.robots,'noindex, nofollow, noarchive');assert.equal(account.canonical,`${PUBLIC_ORIGIN}/account`);assert.ok(!socialTags(account).includes('index, follow'));
  const research=socialMetadata(`${PUBLIC_ORIGIN}/?view=research`);
  assert.equal(research.view,'research');assert.equal(research.canonical,`${PUBLIC_ORIGIN}/research/`);assert.ok(research.title.includes('GABA 연구'));assert.ok(socialTags(research).includes(`og:url\" content=\"${PUBLIC_ORIGIN}/research/`));
});
test('Duplicate or ambiguous product view parameters fall back to generic metadata',()=>{
  for(const query of ['view=products&view=products','view=unknown','view=products&rhythm=active','view=products&rhythm=','view=unknown&rhythm=steady']){
    const meta=socialMetadata(`${PUBLIC_ORIGIN}/?${query}`);assert.equal(meta.view,null);assert.equal(meta.type,null);assert.equal(meta.canonical,`${PUBLIC_ORIGIN}/`);
  }
  for(const path of ['/admin','/account']){const meta=socialMetadata(`${PUBLIC_ORIGIN}${path}?view=products`);assert.equal(meta.view,null);assert.equal(meta.robots,'noindex, nofollow, noarchive');}
});
test('Configured public origin drives Worker canonical and Open Graph URLs',()=>{
  const configured='https://public.cellpinda.example';
  const meta=socialMetadata(`${configured}/?rhythm=active&email=private@example.com`,configured);
  assert.equal(meta.canonical,`${configured}/?rhythm=active`);
  assert.equal(meta.image,`${configured}/assets/social-rhythm-active.png`);
  const tags=socialTags(meta);
  assert.ok(tags.includes(`og:url\" content=\"${configured}/?rhythm=active`));
  assert.ok(tags.includes(`og:image\" content=\"${configured}/assets/social-rhythm-active.png`));
  assert.ok(!tags.includes('private@example.com'));
  const invalid=socialMetadata(`${configured}/?rhythm=active`,'http://insecure.example');
  assert.equal(invalid.canonical,`${PUBLIC_ORIGIN}/?rhythm=active`);
});
