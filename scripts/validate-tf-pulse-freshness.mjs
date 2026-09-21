import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const heartbeatPath = process.env.TF_PULSE_HEARTBEAT_PATH || resolve(process.cwd(), 'data/tf-pulse-heartbeat.json');
const maxAgeMinutes = Number(process.env.TF_PULSE_MAX_AGE_MINUTES || 8 * 60);
const nowValue = process.env.TF_PULSE_NOW;
const now = nowValue ? Date.parse(nowValue) : Date.now();
const fail = message => { throw new Error(`TF pulse freshness failed: ${message}`); };

if (!Number.isFinite(maxAgeMinutes) || maxAgeMinutes <= 0) fail('TF_PULSE_MAX_AGE_MINUTES must be a positive number');
if (!Number.isFinite(now)) fail('TF_PULSE_NOW must be a valid ISO timestamp');

let heartbeat;
try {
  heartbeat = JSON.parse(await readFile(heartbeatPath, 'utf8'));
} catch {
  fail('heartbeat is missing or unreadable');
}

const generatedAt = Date.parse(heartbeat?.generatedAt || '');
if (!Number.isFinite(generatedAt)) fail('heartbeat generatedAt is missing or invalid');
const ageMinutes = Math.max(0, Math.floor((now - generatedAt) / 60_000));
if (ageMinutes > maxAgeMinutes) fail(`heartbeat is ${ageMinutes} minutes old; maximum is ${maxAgeMinutes}`);

console.log(JSON.stringify({status: 'fresh', ageMinutes, maxAgeMinutes, generatedAt: heartbeat.generatedAt}));
