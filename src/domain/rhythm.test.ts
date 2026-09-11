import assert from 'node:assert/strict';
import test from 'node:test';
import { classifyRhythm, questions, resultTypes, rhythmIdFromUrl } from './rhythm.ts';

test('all five questions provide four unique recovery choices', () => {
  assert.equal(questions.length, 5);
  assert.equal(new Set(questions.map(question => question.id)).size, 5);
  for (const question of questions) {
    assert.deepEqual(question.options.map(option => option.value), [0, 1, 2, 3]);
    assert.ok(question.prompt.length > 0);
    assert.ok(question.helper.length > 0);
  }
});

test('representative responses reach every named type', () => {
  assert.equal(classifyRhythm([0, 0, 0, 0, 0]).type.name, '안정 리듬형');
  assert.equal(classifyRhythm([3, 0, 0, 0, 0]).type.name, '계속 작동형');
  assert.equal(classifyRhythm([0, 3, 0, 0, 0]).type.name, '잠자리 전환형');
  assert.equal(classifyRhythm([0, 0, 3, 0, 0]).type.name, '휴식 공백형');
  assert.equal(classifyRhythm([0, 0, 0, 3, 0]).type.name, '자극 과부하형');
  assert.equal(classifyRhythm([0, 0, 0, 0, 3]).type.name, '회복 우선형');
});

test('boundaries and tie priority follow the published editorial rule', () => {
  assert.equal(classifyRhythm([1, 1, 0, 0, 0]).type.id, 'steady');
  assert.equal(classifyRhythm([1, 0, 0, 2, 0]).type.id, 'sensory');
  assert.equal(classifyRhythm([0, 0, 0, 0, 1]).type.id, 'steady');
  assert.equal(classifyRhythm([2, 2, 2, 2, 2]).type.id, 'unrested');
  assert.equal(classifyRhythm([2, 2, 0, 0, 0]).type.id, 'sleep');
  assert.equal(classifyRhythm([2, 0, 0, 2, 0]).type.id, 'active');
  assert.equal(classifyRhythm([0, 0, 3, 3, 0]).type.id, 'irregular');
  assert.equal(classifyRhythm([0, 0, 0, 3, 0]).type.id, 'sensory');
});

test('invalid inputs including sparse answers are rejected without coercion', () => {
  const invalid: unknown[] = [null, undefined, {}, '00000', [], [0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, -1], [0, 0, 0, 0, 4],
    [0, 0, 0, 0, 0.5], [0, 0, 0, 0, NaN], [0, 0, 0, 0, Infinity],
    [0, 0, 0, 0, '1'], [0, 0, 0, 0, false], new Array(5)];
  for (const input of invalid) {
    assert.throws(() => classifyRhythm(input as number[]), TypeError);
  }
});

test('all 1024 complete responses are deterministic and preserve their inputs', () => {
  const found = new Set<string>();
  for (let sequence = 0; sequence < 1024; sequence++) {
    const answers = Object.freeze(Array.from({ length: 5 }, (_, i) => Math.floor(sequence / 4 ** i) % 4));
    const before = [...answers];
    const result = classifyRhythm(answers);
    assert.deepEqual(classifyRhythm(answers), result);
    assert.deepEqual(answers, before);
    assert.ok(Object.values(result.scores).every(score => score >= 0 && score <= 3));
    assert.equal(result.type, resultTypes[result.type.id]);
    found.add(result.type.id);
  }
  assert.deepEqual([...found].sort(), Object.keys(resultTypes).sort());
});

test('shared result URLs resolve both static paths and query fallbacks safely', () => {
  assert.equal(rhythmIdFromUrl(new URL('https://example.test/cellpinda_GABA/share/active/')), 'active');
  assert.equal(rhythmIdFromUrl(new URL('https://example.test/cellpinda_GABA/?rhythm=sleep#rhythm')), 'sleep');
  assert.equal(rhythmIdFromUrl(new URL('https://example.test/cellpinda_GABA/share/not-a-type/')), null);
  assert.equal(rhythmIdFromUrl(new URL('https://example.test/cellpinda_GABA/?rhythm=active<script>')), null);
});
