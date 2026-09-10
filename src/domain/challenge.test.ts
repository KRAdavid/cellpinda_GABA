import test from 'node:test';
import assert from 'node:assert/strict';
import { addCalendarDays, challengeFinished, createChallenge, isCalendarDate, localCalendarDate, parseChallenge, updateChallengeDay } from './challenge.ts';

test('calendar arithmetic handles DST, leap days and year boundaries', () => {
  assert.equal(addCalendarDays('2026-03-07', 2), '2026-03-09');
  assert.equal(addCalendarDays('2026-10-31', 2), '2026-11-02');
  assert.equal(addCalendarDays('2024-02-28', 1), '2024-02-29');
  assert.equal(addCalendarDays('2025-12-31', 1), '2026-01-01');
  assert.equal(isCalendarDate('2026-02-29'), false);
  assert.equal(isCalendarDate('2026-02-31'), false);
  assert.throws(() => addCalendarDays('not-date', 1), TypeError);
});

test('local date uses the browser-local day across DST instead of UTC slicing', () => {
  const previous = process.env.TZ;
  try {
    process.env.TZ = 'America/Los_Angeles';
    assert.equal(localCalendarDate(new Date('2026-03-09T06:30:00Z')), '2026-03-08');
    assert.equal(localCalendarDate(new Date('2026-11-01T08:30:00Z')), '2026-11-01');
    assert.equal(localCalendarDate(new Date('2026-11-01T09:30:00Z')), '2026-11-01');
  } finally { if (previous === undefined) delete process.env.TZ; else process.env.TZ = previous; }
});

test('today and past days are editable, future dates are never completed or annotated', () => {
  const record = createChallenge('2026-09-10');
  const next = updateChallengeDay(record, 0, { completed: true, note: '조명을 살펴봤어요.' }, '2026-09-10');
  assert.equal(record.days[0]!.completed, false);
  assert.equal(next.days[0]!.completed, true);
  assert.equal(updateChallengeDay(next, 0, { completed: false }, '2026-09-12').days[0]!.completed, false);
  assert.throws(() => updateChallengeDay(record, 1, { completed: true }, '2026-09-10'), RangeError);
  assert.throws(() => updateChallengeDay(record, 1, { note: '미래' }, '2026-09-10'), RangeError);
  assert.throws(() => updateChallengeDay(record, 0, { note: 'a'.repeat(1001) }, '2026-09-10'), TypeError);
});

test('the wrap-up begins after seven calendar days, not seven checkmarks', () => {
  const record = createChallenge('2026-09-10');
  assert.equal(challengeFinished(record, '2026-09-16'), false);
  assert.equal(challengeFinished(record, '2026-09-17'), true);
  assert.equal(challengeFinished(record, '2026-09-18'), true);
});

test('stored records validate fully and legacy arrays are not dated retroactively', () => {
  const record = createChallenge('2026-09-10');
  assert.deepEqual(parseChallenge(JSON.parse(JSON.stringify(record))), record);
  assert.equal(parseChallenge([0, 1, 2]), null);
  assert.equal(parseChallenge({ ...record, version: 1 }), null);
  assert.equal(parseChallenge({ ...record, days: new Array(7) }), null);
  assert.equal(parseChallenge({ ...record, days: record.days.map(day => ({ ...day, date: '2026-09-10' })) }), null);
  assert.equal(parseChallenge({ ...record, days: record.days.map(day => ({ ...day, completed: 'true' })) }), null);
});
