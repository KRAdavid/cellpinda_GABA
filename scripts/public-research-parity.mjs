import {isDeepStrictEqual} from 'node:util';

// These are the consumer-facing research fields projected from a public claim
// into data/gaba-master-index.json by sync-public-data.mjs. Keep this list
// explicit so a schema or export change fails closed instead of silently
// drifting between the two public indexes.
export const PUBLIC_RESEARCH_METADATA_FIELDS = [
  'question',
  'studyType',
  'population',
  'sampleSize',
  'dose',
  'duration',
  'comparison',
  'outcome',
  'consumerScope',
  'consumerSummary',
  'consumerFinding',
  'consumerHighlight',
  'consumerFindingFirst',
  'consumerDetail',
  'consumerContext',
  'consumerDisclosure',
  'consumerDisclosureStatus',
  'consumerVisual',
  'hopefulTakeaway',
  'productApplicability',
];

const PUBLIC_RESEARCH_TOP_LEVEL_FIELDS = ['topic', 'reviewedAt', 'sources', 'evidenceHash'];

const duplicates = values => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];

const fieldValue = (claim, field) => {
  if (PUBLIC_RESEARCH_TOP_LEVEL_FIELDS.includes(field)) return claim[field];
  return claim.metadata?.[field];
};

/**
 * Compare the public claim projection with the public research master index.
 * Returning every mismatch lets callers report a useful fail-closed error
 * while keeping this rule identical for local and live validation.
 */
export function findPublicResearchParityMismatches(content, master) {
  const mismatches = [];
  const claims = Array.isArray(content?.claims) ? content.claims : [];
  const records = Array.isArray(master?.records) ? master.records : [];
  const researchClaims = claims.filter(claim => String(claim?.id || '').startsWith('research-'));
  const claimIds = researchClaims.map(claim => claim.id);
  const recordIds = records.map(record => record?.id);
  for (const id of duplicates(claimIds)) mismatches.push(`duplicate research claim id ${id}`);
  for (const id of duplicates(recordIds)) mismatches.push(`duplicate research master id ${id}`);
  if (researchClaims.length !== records.length) mismatches.push(`research/master record count ${researchClaims.length}/${records.length}`);

  const claimsById = new Map(researchClaims.map(claim => [claim.id, claim]));
  const recordsById = new Map(records.map(record => [record?.id, record]));
  for (const claim of researchClaims) {
    const record = recordsById.get(claim.id);
    if (!record) {
      mismatches.push(`${claim.id} is missing from the research master index`);
      continue;
    }
    for (const field of [...PUBLIC_RESEARCH_TOP_LEVEL_FIELDS, ...PUBLIC_RESEARCH_METADATA_FIELDS]) {
      const claimValue = fieldValue(claim, field);
      const recordValue = record[field];
      if (!isDeepStrictEqual(claimValue, recordValue)) mismatches.push(`${claim.id}.${field} differs between content and master index`);
    }
  }
  for (const record of records) {
    if (!claimsById.has(record?.id)) mismatches.push(`${record?.id || '<missing id>'} is missing from public content claims`);
  }
  return mismatches;
}
