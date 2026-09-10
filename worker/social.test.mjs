import test from 'node:test';
import assert from 'node:assert/strict';
import { socialMetadata, socialTags, PUBLIC_ORIGIN } from './social.ts';
import { resultTypes } from '../src/domain/rhythm.ts';

test('All four shared types use UI labels without answers or personal queries',()=>{
  for(const [type,info] of Object.entries(resultTypes)){
    const meta=socialMetadata(`${PUBLIC_ORIGIN}/?rhythm=${type}&email=private@example.com&answers=22222#private`);
    assert.ok(meta.title.includes(info.name));assert.ok(meta.title.startsWith('공유받은'));assert.ok(meta.description.includes('링크를 연 사람의 결과가 아니며'));assert.equal(meta.canonical,`${PUBLIC_ORIGIN}/?rhythm=${type}`);
    const tags=socialTags(meta);assert.ok(tags.includes('og:image'));assert.ok(tags.includes('twitter:card'));assert.ok(tags.includes('rel="canonical"'));
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
  assert.equal(meta.description,'1포 내용량과 구성을 확인하고 공식몰에서 구매 조건을 살펴보세요.');assert.equal(meta.canonical,`${PUBLIC_ORIGIN}/?view=products`);
  assert.ok(!socialTags(meta).includes('PRIVATE'));assert.ok(!socialTags(meta).includes('22222'));assert.ok(!socialTags(meta).includes('#products'));
  assert.equal(socialMetadata('https://hostile.example/?view=products').canonical,`${PUBLIC_ORIGIN}/?view=products`);
});
test('Duplicate or ambiguous product view parameters fall back to generic metadata',()=>{
  for(const query of ['view=products&view=products','view=unknown','view=products&rhythm=active','view=products&rhythm=','view=unknown&rhythm=steady']){
    const meta=socialMetadata(`${PUBLIC_ORIGIN}/?${query}`);assert.equal(meta.view,null);assert.equal(meta.type,null);assert.equal(meta.canonical,`${PUBLIC_ORIGIN}/`);
  }
  for(const path of ['/admin','/account']){const meta=socialMetadata(`${PUBLIC_ORIGIN}${path}?view=products`);assert.equal(meta.view,null);assert.equal(meta.robots,'noindex, nofollow, noarchive');}
});
