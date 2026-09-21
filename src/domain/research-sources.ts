export type ResearchSourceReference = {
  title?: string | null;
  url?: string | null;
  locator?: string | null;
};

export function isPublicUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); }
  catch { return false; }
}

function identifiersFrom(value: string): string[] {
  const identifiers: string[] = [];
  const doi = decodeURIComponent(value).match(/10\.\d{4,9}\/[a-z0-9._;()/:+-]+/i)?.[0]
    ?.replace(/[?#].*$/, '')
    ?.replace(/\/(?:full|abstract|pdf)\/?$/i, '')
    ?.replace(/[.,;]+$/, '')
    ?.toLowerCase();
  if (doi) identifiers.push(`doi:${doi}`);

  const pmid = value.match(/(?:pubmed(?:\.ncbi\.nlm\.nih\.gov)?|pmid\s*[:/]?)\D*(\d{5,9})/i)?.[1];
  if (pmid) identifiers.push(`pmid:${pmid}`);

  const pmc = value.match(/(?:pmc|articles\/)\s*(PMC\d+)/i)?.[1];
  if (pmc) identifiers.push(`pmc:${pmc.toLowerCase()}`);
  return identifiers;
}

/**
 * Return stable identifiers for a study source, including identifiers that
 * appear in a source locator/title rather than in the visible URL.
 *
 * A single paper can be cited through a DOI page, PubMed, and PMC. Keeping all
 * identifiers lets the consumer index collapse those references when a DOI is
 * present only in the citation note.
 */
export function canonicalSourceKeys(source: ResearchSourceReference): string[] {
  if (!isPublicUrl(source.url)) return [];
  const values = [source.url, source.title || '', source.locator || ''];
  const keys = values.flatMap(identifiersFrom);
  if (keys.length) return [...new Set(keys)];
  try {
    const url = new URL(source.url);
    return [`${url.hostname.replace(/^www\./, '').toLowerCase()}${url.pathname.replace(/\/+$/, '').toLowerCase()}`];
  } catch {
    return [];
  }
}

export function canonicalStudySourceKeys(sources: ResearchSourceReference[]): string[] {
  const keys = sources.flatMap(canonicalSourceKeys);
  return keys.length ? [...new Set(keys)] : [];
}
