import assert from 'node:assert/strict';
import test from 'node:test';
import { classifyRhythm, questions, resultTypes } from './rhythm.ts';

test('all five questions provide three unique valid choices', () => {
  assert.equal(questions.length, 5);
  assert.equal(new Set(questions.map(question => question.id)).size, 5);
  for (const question of questions) {
    assert.deepEqual(question.options.map(option => option.value), [0, 1, 2]);
    assert.ok(question.prompt.length > 0);
  }
});

test('representative responses reach every named type', () => {
  assert.equal(classifyRhythm([0, 0, 0, 0, 0]).type.name, '안정 리듬형');
  assert.equal(classifyRhythm([2, 0, 0, 2, 0]).type.name, '계속 작동형');
  assert.equal(classifyRhythm([0, 2, 2, 0, 0]).type.name, '리듬 불균형형');
  assert.equal(classifyRhythm([0, 0, 0, 0, 2]).type.name, '회복 부족형');
});

test('boundaries and tie priority follow the published editorial rule', () => {
  assert.equal(classifyRhythm([1, 1, 0, 0, 0]).type.id, 'steady');
  assert.equal(classifyRhythm([1, 0, 0, 1, 0]).type.id, 'active');
  assert.equal(classifyRhythm([0, 0, 0, 0, 1]).type.id, 'unrested');
  assert.equal(classifyRhythm([2, 2, 2, 2, 2]).type.id, 'unrested');
  assert.equal(classifyRhythm([2, 2, 0, 0, 0]).type.id, 'active');
  assert.equal(classifyRhythm([0, 2, 0, 0, 1]).type.id, 'unrested');
});

test('invalid inputs including sparse answers are rejected without coercion', () => {
  const invalid: unknown[] = [null, undefined, {}, '00000', [], [0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, -1], [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0.5], [0, 0, 0, 0, NaN], [0, 0, 0, 0, Infinity],
    [0, 0, 0, 0, '1'], [0, 0, 0, 0, false], new Array(5)];
  for (const input of invalid) {
    assert.throws(() => classifyRhythm(input as number[]), TypeError);
  }
});

test('all 243 complete responses are deterministic and preserve their inputs', () => {
  const found = new Set<string>();
  for (let sequence = 0; sequence < 243; sequence++) {
    const answers = Object.freeze(Array.from({ length: 5 }, (_, i) => Math.floor(sequence / 3 ** i) % 3));
    const before = [...answers];
    const result = classifyRhythm(answers);
    assert.deepEqual(classifyRhythm(answers), result);
    assert.deepEqual(answers, before);
    assert.ok(Object.values(result.scores).every(score => score >= 0 && score <= 4));
    assert.equal(result.type, resultTypes[result.type.id]);
    found.add(result.type.id);
  }
  assert.deepEqual([...found].sort(), Object.keys(resultTypes).sort());
});
