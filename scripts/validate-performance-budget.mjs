import assert from 'node:assert/strict';
import {readdir, readFile, stat} from 'node:fs/promises';
import {resolve, relative, extname, join} from 'node:path';

const outputDirectory = resolve(process.cwd(), process.argv.slice(2).find(value => !value.startsWith('-')) || 'dist');
const assetsDirectory = resolve(outputDirectory, 'assets');
const rootHtmlPath = resolve(outputDirectory, 'index.html');
const budgets = {
  initialJs: 380_000,
  initialCss: 110_000,
  totalAssets: 1_600_000,
  largestAsset: 380_000,
};

const filesIn = async directory => {
  const entries = await readdir(directory, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(path));
    else files.push(path);
  }
  return files;
};

assert.ok((await stat(rootHtmlPath)).isFile(), `performance budget is missing ${relative(process.cwd(), rootHtmlPath)}`);
assert.ok((await stat(assetsDirectory)).isDirectory(), `performance budget is missing ${relative(process.cwd(), assetsDirectory)}`);
const html = await readFile(rootHtmlPath, 'utf8');
const assetFiles = await filesIn(assetsDirectory);
const assetByPath = new Map(assetFiles.map(file => [`/${relative(outputDirectory, file).replaceAll('\\', '/')}`, file]));
const initialUrls = [...html.matchAll(/(?:src|href)="([^"]*assets\/[^"?#]+)"/g)].map(match => match[1]);
const assetPathFromUrl = url => {
  const marker = '/assets/';
  const markerIndex = url.indexOf(marker);
  return markerIndex >= 0 ? url.slice(markerIndex) : null;
};
const initialFiles = [...new Set(initialUrls.map(url => assetByPath.get(assetPathFromUrl(url))).filter(Boolean))];
const bytes = async file => (await stat(file)).size;
const sizeByExtension = async extension => (await Promise.all(assetFiles.filter(file => extname(file) === extension).map(bytes))).reduce((sum, value) => sum + value, 0);
const initialJs = (await Promise.all(initialFiles.filter(file => extname(file) === '.js').map(bytes))).reduce((sum, value) => sum + value, 0);
const initialCss = (await Promise.all(initialFiles.filter(file => extname(file) === '.css').map(bytes))).reduce((sum, value) => sum + value, 0);
const totalAssets = (await Promise.all(assetFiles.map(bytes))).reduce((sum, value) => sum + value, 0);
const largestAsset = Math.max(...await Promise.all(assetFiles.map(bytes)));
const violations = [];
if (initialJs > budgets.initialJs) violations.push(`initial JS ${initialJs} > ${budgets.initialJs}`);
if (initialCss > budgets.initialCss) violations.push(`initial CSS ${initialCss} > ${budgets.initialCss}`);
if (totalAssets > budgets.totalAssets) violations.push(`all assets ${totalAssets} > ${budgets.totalAssets}`);
if (largestAsset > budgets.largestAsset) violations.push(`largest asset ${largestAsset} > ${budgets.largestAsset}`);
assert.deepEqual(violations, [], `performance budget exceeded: ${violations.join('; ')}`);

console.log(JSON.stringify({
  directory: outputDirectory,
  initial: {js: initialJs, css: initialCss},
  assets: {total: totalAssets, largest: largestAsset, javascript: await sizeByExtension('.js'), stylesheets: await sizeByExtension('.css')},
  budgets,
  status: 'ok',
}));
