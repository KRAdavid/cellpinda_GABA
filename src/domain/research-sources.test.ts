import assert from 'node:assert/strict';
import test from 'node:test';
import {canonicalSourceKeys, canonicalStudySourceKeys} from './research-sources.ts';

test('normalizes DOI page variants and citation suffixes to one DOI key', () => {
  const variants = [
    {url: 'https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2020.00923/full'},
    {url: 'https://doi.org/10.3389/fnins.2020.00923'},
    {url: 'https://doi.org/10.3389/fnins.2020.00923/pdf'},
  ];
  assert.deepEqual(canonicalStudySourceKeys(variants), ['doi:10.3389/fnins.2020.00923']);
});

test('uses DOI in a citation locator to collapse PubMed and DOI references', () => {
  const pubmed = canonicalSourceKeys({
    title: 'Yoto et al. (2012), PubMed 22203366',
    url: 'https://pubmed.ncbi.nlm.nih.gov/22203366/',
    locator: 'Abstract; DOI 10.1007/s00726-011-1206-6',
  });
  const doi = canonicalSourceKeys({url: 'https://link.springer.com/article/10.1007/s00726-011-1206-6'});
  assert.ok(pubmed.includes('doi:10.1007/s00726-011-1206-6'));
  assert.ok(pubmed.includes('pmid:22203366'));
  assert.ok(doi.includes('doi:10.1007/s00726-011-1206-6'));
  assert.equal(pubmed.some(key => doi.includes(key)), true);
});

test('does not expose or key an unsafe source URL', () => {
  assert.deepEqual(canonicalSourceKeys({url: 'javascript:alert(1)'}), []);
  assert.deepEqual(canonicalSourceKeys({url: null}), []);
});
