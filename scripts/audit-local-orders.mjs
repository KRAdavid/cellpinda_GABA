import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readdir, readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(await readFile(resolve(root, 'data/local-order-manifest.json'), 'utf8'));
const strict = process.argv.includes('--strict');
const configuredRoots = process.env.CELLPINDA_ORDER_ROOTS
  ? process.env.CELLPINDA_ORDER_ROOTS.split(';').map(value => value.trim()).filter(Boolean)
  : manifest.sourceRoots;
const roots = configuredRoots.map(value => resolve(value));
const patterns = manifest.filePatterns.map(pattern => new RegExp(`^${pattern
  .replace(/[.+^${}()|[\]\\]/g, '\\$&')
  .replaceAll('*', '.*')}$`, 'i'));
const isCandidate = name => patterns.some(pattern => pattern.test(name));

async function walk(directory, found = []) {
  if (!existsSync(directory)) return found;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await walk(path, found);
    else if (entry.isFile() && isCandidate(entry.name)) found.push(path);
  }
  return found;
}

const decode = bytes => {
  const utf8 = new TextDecoder('utf-8', { fatal: false }).decode(bytes).replace(/^\uFEFF/, '');
  const euckr = new TextDecoder('euc-kr', { fatal: false }).decode(bytes).replace(/^\uFEFF/, '');
  const score = value => (value.match(/�/g) ?? []).length;
  return score(utf8) <= score(euckr) ? utf8 : euckr;
};

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"') {
      if (quoted && text[index + 1] === '"') { cell += '"'; index += 1; }
      else quoted = !quoted;
    } else if (character === ',' && !quoted) { row.push(cell.trim()); cell = ''; }
    else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && text[index + 1] === '\n') index += 1;
      row.push(cell.trim()); cell = '';
      if (row.some(value => value.length > 0)) rows.push(row);
      row = [];
    } else cell += character;
  }
  if (cell.length || row.length) { row.push(cell.trim()); if (row.some(value => value.length > 0)) rows.push(row); }
  return rows;
}

const normalizeHeader = value => String(value ?? '').toLowerCase().replace(/[\s_()\-]/g, '');
const pick = (headers, tests) => headers.findIndex(header => tests.some(test => test.test(normalizeHeader(header))));
const fieldPresence = headers => ({
  orderId: pick(headers, [/주문번호/, /orderid/, /order_no/]) >= 0,
  date: pick(headers, [/주문일/, /발주일/, /결제일/, /date/, /일자/]) >= 0,
  productName: pick(headers, [/주문상품명/, /상품명/, /productname/, /product_name/]) >= 0,
  productId: pick(headers, [/상품번호/, /상품코드/, /productid/, /product_id/, /sku/, /품목코드/]) >= 0,
  quantity: pick(headers, [/수량/, /quantity/, /count/]) >= 0,
  amount: pick(headers, [/결제금액/, /판매가/, /주문금액/, /payment/, /amount/, /금액/]) >= 0,
  status: pick(headers, [/주문상태/, /배송상태/, /결제상태/, /status/, /상태/]) >= 0,
  cancellation: headers.some(header => /취소|cancel/i.test(String(header))),
  refund: headers.some(header => /환불|반품|refund|return/i.test(String(header))),
  delivery: headers.some(header => /배송|발송|waybill|택배/i.test(String(header))),
});

const classify = value => {
  const text = String(value ?? '');
  if (/(?<!\d)750\s*mg|가바\s*750/i.test(text)) return 'gaba750';
  if (/1\s*,?\s*500\s*mg|1500\s*mg|가바\s*1500/i.test(text)) return 'gaba1500';
  return 'other';
};
const parseQuantity = value => {
  const number = Number.parseFloat(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(number) && number >= 0 ? number : 0;
};
const coarseStatus = value => {
  const text = String(value ?? '').toLowerCase();
  if (/취소|환불|반품|cancel|refund|return/.test(text)) return 'cancel_or_refund';
  if (/결제|배송|발송|구매확정|paid|ship|deliver/.test(text)) return 'fulfilled_or_paid';
  return 'other';
};
const safeDate = value => {
  const match = String(value ?? '').match(/\d{4}[-./]\d{1,2}[-./]\d{1,2}/);
  return match ? match[0].replaceAll('.', '-').replace(/-(\d)(?=-|$)/g, '-0$1') : null;
};

function emptyAggregate() {
  return { rows: 0, quantity: 0, productIds: {}, statusBuckets: {}, dateMin: null, dateMax: null };
}
function addClass(aggregate, productClass, productId, quantity, date, status) {
  const target = aggregate[productClass] ??= emptyAggregate();
  target.rows += 1;
  target.quantity += quantity;
  if (productId) target.productIds[productId] = (target.productIds[productId] ?? 0) + 1;
  if (status) target.statusBuckets[status] = (target.statusBuckets[status] ?? 0) + 1;
  if (date && (!target.dateMin || date < target.dateMin)) target.dateMin = date;
  if (date && (!target.dateMax || date > target.dateMax)) target.dateMax = date;
}

const files = (await Promise.all(roots.map(directory => walk(directory)))).flat();
const aggregate = {};
const fileRecords = [];
const counters = { filesScanned: files.length, csvParsed: 0, xlsxEncrypted: 0, xlsxUnparsed: 0, unsupported: 0 };
const fieldTotals = {};
for (const path of files.sort()) {
  const bytes = await readFile(path);
  const metadata = await stat(path);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const name = basename(path);
  const record = { name, path, size: metadata.size, modifiedAt: metadata.mtime.toISOString(), sha256, format: path.toLowerCase().endsWith('.csv') ? 'csv' : 'xlsx', channelClue: name.includes('스마트스토어') ? 'smartstore_filename' : 'unverified_filename' };
  if (record.format === 'csv') {
    const rows = parseCsv(decode(bytes));
    const headers = rows.shift() ?? [];
    const presence = fieldPresence(headers);
    for (const [key, value] of Object.entries(presence)) fieldTotals[key] = (fieldTotals[key] ?? 0) + (value ? 1 : 0);
    const productNameIndex = pick(headers, [/주문상품명/, /상품명/, /productname/, /product_name/]);
    const productIdIndex = pick(headers, [/상품번호/, /상품코드/, /productid/, /product_id/, /sku/, /품목코드/]);
    const quantityIndex = pick(headers, [/수량/, /quantity/, /count/]);
    const dateIndex = pick(headers, [/주문일/, /발주일/, /결제일/, /date/, /일자/]);
    const statusIndex = pick(headers, [/주문상태/, /배송상태/, /결제상태/, /status/, /상태/]);
    const fileClassRows = {};
    for (const row of rows) {
      const productValue = productNameIndex >= 0 ? row[productNameIndex] : row.find(value => /gaba|가바/i.test(value)) ?? '';
      const productClass = classify(productValue);
      fileClassRows[productClass] = (fileClassRows[productClass] ?? 0) + 1;
      const productId = productIdIndex >= 0 ? String(row[productIdIndex] ?? '').trim() : '';
      const date = dateIndex >= 0 ? safeDate(row[dateIndex]) : null;
      const status = statusIndex >= 0 ? coarseStatus(row[statusIndex]) : null;
      addClass(aggregate, productClass, productId, quantityIndex >= 0 ? parseQuantity(row[quantityIndex]) : 0, date, status);
    }
    counters.csvParsed += 1;
    record.parseStatus = 'parsed_aggregate_only';
    record.rowCount = rows.length;
    record.fieldPresence = presence;
    record.productClassRows = fileClassRows;
  } else if (bytes.subarray(0, 8).equals(Buffer.from('D0CF11E0A1B11AE1', 'hex'))) {
    counters.xlsxEncrypted += 1;
    record.parseStatus = 'encrypted_ole_ooxml';
    record.reason = 'EncryptedPackage/EncryptionInfo container; no password or decryption is attempted.';
  } else if (bytes.subarray(0, 2).equals(Buffer.from('PK'))) {
    counters.xlsxUnparsed += 1;
    record.parseStatus = 'xlsx_unparsed';
    record.reason = 'Workbook is a ZIP OOXML container; raw rows stay outside this Node-only audit.';
  } else {
    counters.unsupported += 1;
    record.parseStatus = 'unsupported_container';
  }
  fileRecords.push(record);
}

const output = resolve(root, 'tmp/local-order-audit.json');
await mkdir(dirname(output), { recursive: true });
const result = {
  schemaVersion: 1,
  goalId: manifest.goalId,
  generatedAt: new Date().toISOString(),
  sourceRoots: roots,
  privacy: manifest.privacy,
  counters,
  aggregate,
  fieldPresenceFileCounts: fieldTotals,
  channelAssessment: {
    smartstoreNamedFiles: fileRecords.filter(record => record.channelClue === 'smartstore_filename').length,
    smartstoreNamedFilesParsed: fileRecords.filter(record => record.channelClue === 'smartstore_filename' && record.parseStatus === 'parsed_aggregate_only').length,
    conclusion: 'Historical files are evidence for a source archive only. Seller account, channel product id, and live order/claim responses remain unverified.'
  },
  files: fileRecords,
};
await writeFile(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ output, counters, aggregate, channelAssessment: result.channelAssessment }, null, 2));
if (strict && (!files.length || counters.unsupported > 0)) process.exitCode = 1;
