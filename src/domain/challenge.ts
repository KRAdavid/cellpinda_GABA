export const CHALLENGE_STORAGE_KEY = 'cellpinda.challenge.v2';
export const challengeHabits = ['늦은 시간의 카페인 습관 돌아보기', '잠들기 전 화면을 잠시 내려놓기', '편안한 조명 찾기', '잠깐 멈추고 편하게 호흡하기', '기상 시간을 기록하기', '오늘의 휴식 시간을 돌아보기', '계속하고 싶은 작은 루틴 고르기'] as const;
export interface ChallengeDay { date: string; completed: boolean; note: string }
export interface ChallengeRecord { version: 2; startDate: string; days: ChallengeDay[] }

export function isCalendarDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/** Local calendar date, never a UTC instant interpreted as a local date. */
export function localCalendarDate(date = new Date()): string {
  if (!Number.isFinite(date.getTime())) throw new TypeError('유효한 날짜가 필요합니다.');
  return `${String(date.getFullYear()).padStart(4, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/** UTC is used only as an arithmetic carrier for calendar dates, avoiding DST hours. */
export function addCalendarDays(date: string, amount: number): string {
  if (!isCalendarDate(date) || !Number.isInteger(amount)) throw new TypeError('날짜와 정수 일수가 필요합니다.');
  const result = new Date(`${date}T00:00:00Z`);
  result.setUTCDate(result.getUTCDate() + amount);
  const output = result.toISOString().slice(0, 10);
  if (!isCalendarDate(output)) throw new RangeError('지원하는 날짜 범위를 벗어났습니다.');
  return output;
}

export function createChallenge(startDate: string): ChallengeRecord {
  return { version: 2, startDate, days: challengeHabits.map((_, index) => ({ date: addCalendarDays(startDate, index), completed: false, note: '' })) };
}

/** Legacy arrays, malformed records, and date sequences are never silently migrated. */
export function parseChallenge(value: unknown): ChallengeRecord | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const record = value as Partial<ChallengeRecord>;
  if (record.version !== 2 || !isCalendarDate(record.startDate) || !Array.isArray(record.days) || record.days.length !== 7) return null;
  try {
    for (let i = 0; i < 7; i++) {
      const day = record.days[i];
      if (!day || day.date !== addCalendarDays(record.startDate, i) || typeof day.completed !== 'boolean' || typeof day.note !== 'string' || day.note.length > 1000) return null;
    }
  } catch { return null; }
  return { version: 2, startDate: record.startDate, days: record.days.map(day => ({ date: day.date, completed: day.completed, note: day.note })) };
}

export function updateChallengeDay(record: ChallengeRecord, index: number, update: { completed?: boolean; note?: string }, today: string): ChallengeRecord {
  const valid = parseChallenge(record);
  if (!valid || !isCalendarDate(today) || !Number.isInteger(index) || index < 0 || index >= 7) throw new TypeError('기록과 날짜를 확인해 주세요.');
  if (valid.days[index]!.date > today) throw new RangeError('미래 날짜에는 실천이나 메모를 기록할 수 없습니다.');
  if (update.completed !== undefined && typeof update.completed !== 'boolean') throw new TypeError('완료 여부는 참 또는 거짓이어야 합니다.');
  if (update.note !== undefined && (typeof update.note !== 'string' || update.note.length > 1000)) throw new TypeError('메모는 1,000자 이내여야 합니다.');
  return { ...valid, days: valid.days.map((day, i) => i === index ? { ...day, completed: update.completed ?? day.completed, note: update.note ?? day.note } : day) };
}

export function challengeFinished(record: ChallengeRecord, today: string): boolean {
  if (!isCalendarDate(today) || !parseChallenge(record)) throw new TypeError('기록과 날짜를 확인해 주세요.');
  return today >= addCalendarDays(record.startDate, 7);
}

/** Number of consecutive completed days ending on the latest available day. */
export function challengeStreak(record: ChallengeRecord, today: string): number {
  const valid = parseChallenge(record);
  if (!valid || !isCalendarDate(today)) throw new TypeError('기록과 날짜를 확인해 주세요.');
  const lastIndex = valid.days.reduce((latest, day, index) => day.date <= today ? index : latest, -1);
  if (lastIndex < 0 || !valid.days[lastIndex]!.completed) return 0;
  let streak = 0;
  for (let index = lastIndex; index >= 0 && valid.days[index]!.completed; index -= 1) streak += 1;
  return streak;
}
