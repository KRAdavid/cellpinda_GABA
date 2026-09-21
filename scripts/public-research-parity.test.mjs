import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import {findPublicResearchParityMismatches} from './public-research-parity.mjs';

const readJson = async relative => JSON.parse(await readFile(new URL(`../${relative}`, import.meta.url), 'utf8'));
const loadIndexes = async () => [await readJson('public/data/content.json'), await readJson('public/data/gaba-master-index.json')];
const clone = value => JSON.parse(JSON.stringify(value));

test('public research content and master index have exact consumer-field parity', async () => {
  const [content, master] = await loadIndexes();
  assert.deepEqual(findPublicResearchParityMismatches(content, master), []);
});

test('parity check rejects a changed product applicability boundary', async () => {
  const [content, master] = await loadIndexes();
  const changed = clone(master);
  changed.records.find(record => record.id === 'research-powers-2008').productApplicability = '다른 제품 섭취량의 근거';
  assert.ok(findPublicResearchParityMismatches(content, changed).includes('research-powers-2008.productApplicability differs between content and master index'));
});

test('parity check rejects a missing and duplicate master record', async () => {
  const [content, master] = await loadIndexes();
  const changed = clone(master);
  const removedId = changed.records.at(-1).id;
  changed.records.pop();
  changed.records.push(clone(changed.records[0]));
  const mismatches = findPublicResearchParityMismatches(content, changed);
  assert.ok(mismatches.includes('duplicate research master id research-byun-2018'));
  assert.ok(mismatches.includes(`${removedId} is missing from the research master index`));
});
