import assert from 'node:assert/strict';
import {test} from 'node:test';
import {findPublicResearchParityMismatches, PUBLIC_RESEARCH_METADATA_FIELDS} from './public-research-parity.mjs';

const clone = value => JSON.parse(JSON.stringify(value));

const createClaim = (id, topic) => {
  const metadataValues = {
    question: `${topic} 질문`,
    studyType: '무작위 비교 연구',
    population: '건강한 성인',
    sampleSize: '참여자 10명',
    dose: 'GABA 100mg 한 번',
    duration: '30분',
    comparison: '비교 캡슐',
    outcome: '기록 변화',
    consumerScope: `${topic} 연구 범위`,
    consumerSummary: `${topic} 연구 요약`,
    consumerFinding: `${topic} 연구에서 기록된 내용`,
    consumerHighlight: `${topic} 핵심 기록`,
    consumerFindingFirst: false,
    consumerDetail: `${topic} 상세 기록`,
    consumerContext: `${topic} 연구 맥락`,
    consumerDisclosure: '지원 정보 공개',
    consumerDisclosureStatus: 'reported',
    consumerVisual: {kind: 'study-journey', steps: [{label: '전', value: '1'}, {label: '후', value: '2'}]},
    hopefulTakeaway: '오늘 내 생활을 돌아보기',
    productApplicability: '일반 GABA 연구 조건이며 셀핀다 제품 정보와는 따로 확인합니다.',
  };
  return {
    id,
    topic,
    reviewedAt: '2026-09-22',
    evidenceHash: 'a'.repeat(64),
    sources: [{title: `${id} source`, url: `https://example.com/${id}`}],
    metadata: Object.fromEntries(PUBLIC_RESEARCH_METADATA_FIELDS.map(field => [field, metadataValues[field]])),
  };
};

const toMasterRecord = claim => ({
  id: claim.id,
  topic: claim.topic,
  reviewedAt: claim.reviewedAt,
  ...Object.fromEntries(PUBLIC_RESEARCH_METADATA_FIELDS.map(field => [field, claim.metadata[field]])),
  sources: claim.sources,
  evidenceHash: claim.evidenceHash,
});

const makeIndexes = () => {
  const claims = [createClaim('research-powers-2008', '성장호르몬'), createClaim('research-yamatsu-2016', '수면')];
  return [{claims}, {records: claims.map(toMasterRecord)}];
};

test('public research content and master index have exact consumer-field parity', () => {
  const [content, master] = makeIndexes();
  assert.deepEqual(findPublicResearchParityMismatches(content, master), []);
});

test('parity check rejects a changed product applicability boundary', () => {
  const [content, master] = makeIndexes();
  const changed = clone(master);
  changed.records.find(record => record.id === 'research-powers-2008').productApplicability = '다른 제품 섭취량의 근거';
  assert.ok(findPublicResearchParityMismatches(content, changed).includes('research-powers-2008.productApplicability differs between content and master index'));
});

test('parity check rejects a missing and duplicate master record', () => {
  const [content, master] = makeIndexes();
  const changed = clone(master);
  const removedId = changed.records.at(-1).id;
  changed.records.pop();
  changed.records.push(clone(changed.records[0]));
  const mismatches = findPublicResearchParityMismatches(content, changed);
  assert.ok(mismatches.includes('duplicate research master id research-powers-2008'));
  assert.ok(mismatches.includes(`${removedId} is missing from the research master index`));
});
