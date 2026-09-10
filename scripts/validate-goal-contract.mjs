import { readFile } from 'node:fs/promises';

const contract = JSON.parse(await readFile(new URL('../data/goal-contract.json', import.meta.url), 'utf8'));
const fail = message => { throw new Error(`Goal Contract invalid: ${message}`); };
const required = ['schemaVersion', 'goalId', 'title', 'status', 'outcome', 'successMetrics', 'scope', 'constraints', 'assumptions', 'stopConditions', 'approvalPolicy', 'workstreams'];
for (const key of required) if (!(key in contract)) fail(`missing ${key}`);
if (contract.schemaVersion !== 1) fail('unsupported schemaVersion');
if (!/^GL-\d{4}-CELL-GABA-\d{3}$/.test(contract.goalId)) fail('goalId format');
if (contract.status !== 'ACTIVE') fail('the current site goal must remain ACTIVE until all metrics are complete');
if (!contract.outcome.includes('셀핀다 가바 1500')) fail('outcome must name the current finished product');
if (!Array.isArray(contract.successMetrics) || contract.successMetrics.length < 3) fail('successMetrics must contain at least three metrics');
const metricIds = contract.successMetrics.map(metric => metric.id);
if (new Set(metricIds).size !== metricIds.length) fail('success metric ids must be unique');
if (!contract.successMetrics.some(metric => metric.id === 'M5' && metric.status === 'BLOCKED')) fail('real purchase attribution must stay blocked until order reconciliation exists');
if (!Array.isArray(contract.workstreams) || contract.workstreams.length < 3) fail('workstreams must include the active operating areas');
for (const stream of contract.workstreams) {
  if (!stream.id || !stream.name || !stream.lead || !stream.verifier || !stream.status || !stream.nextAction) fail(`incomplete workstream ${stream.id ?? '(unknown)'}`);
}
const serialized = JSON.stringify(contract);
const discontinuedNumber = String.fromCharCode(55, 53, 48);
const legacyProductNumber = String.fromCharCode(51, 57);
const bannedTokens = [`gaba${discontinuedNumber}`, `product-${discontinuedNumber}`, `product_no=${legacyProductNumber}`, discontinuedNumber];
if (bannedTokens.some(token => serialized.includes(token))) fail('a discontinued product must not return to the active contract');
console.log(JSON.stringify({ goalId: contract.goalId, status: contract.status, metrics: contract.successMetrics.length, workstreams: contract.workstreams.length }));
