import {readFile, writeFile} from 'node:fs/promises';

const RESULT_STATES = new Set(['success', 'failure', 'cancelled', 'skipped', 'unknown']);
const SHA_PATTERN = /^[a-f0-9]{40}$/;
const DEFAULT_PUBLIC_SITE_URL = 'https://kradavid.github.io/cellpinda_GABA';

function optionValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function normalizeResult(value) {
  return RESULT_STATES.has(value || '') ? value : 'unknown';
}

function validSha(value) {
  return typeof value === 'string' && SHA_PATTERN.test(value);
}

function validTimestamp(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function cleanUrl(value, fallback = null) {
  if (!value) return fallback;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString().replace(/\/$/, '') : fallback;
  } catch {
    return fallback;
  }
}

function releaseMode({pages, smoke, workerReadinessResult, workerEnabled, workerDeployment}) {
  if (pages !== 'success' || smoke !== 'success' || workerReadinessResult !== 'success' || (workerEnabled && workerDeployment !== 'success')) {
    return 'RELEASE_FAILED';
  }
  return workerEnabled ? 'FULL_RELEASE' : 'STATIC_ONLY';
}

function deploymentTimestamp(deployment) {
  return deployment.updated_at || deployment.updatedAt || deployment.created_at || deployment.createdAt || null;
}

function deploymentStatuses(deployment) {
  if (Array.isArray(deployment?.statuses)) return deployment.statuses;
  if (deployment?.status && typeof deployment.status === 'object') return [deployment.status];
  if (typeof deployment?.state === 'string') return [{state: deployment.state, created_at: deployment.updated_at || deployment.created_at}];
  return [];
}

function verifiedDeployment(deployment, candidateSha) {
  const sha = deployment?.sha || deployment?.commit?.sha;
  if (!validSha(sha) || sha === candidateSha) return null;
  if ((deployment.environment || '') !== 'github-pages') return null;
  const statuses = deploymentStatuses(deployment)
    .filter(status => status?.state === 'success' && validTimestamp(status?.created_at || status?.createdAt || deploymentTimestamp(deployment)))
    .sort((left, right) => Date.parse(right.created_at || right.createdAt || 0) - Date.parse(left.created_at || left.createdAt || 0));
  const success = statuses[0];
  if (!success) return null;
  const createdAt = deployment.created_at || deployment.createdAt || success.created_at || success.createdAt;
  const updatedAt = deployment.updated_at || deployment.updatedAt || success.created_at || success.createdAt;
  if (!validTimestamp(createdAt) || !validTimestamp(updatedAt)) return null;
  return {
    id: String(deployment.id ?? deployment.databaseId ?? ''),
    sha,
    environment: 'github-pages',
    createdAt,
    updatedAt,
    status: 'success',
    url: cleanUrl(success.target_url || success.environment_url || deployment.url || deployment.html_url),
    verified: true,
  };
}

function choosePreviousKnownGood(entries, candidateSha) {
  const matches = (Array.isArray(entries) ? entries : [])
    .map(entry => verifiedDeployment(entry, candidateSha))
    .filter(Boolean)
    .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt));
  return matches[0] || null;
}

async function readHistoryFile(file) {
  const parsed = JSON.parse(await readFile(file, 'utf8'));
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed?.deployments)) return parsed.deployments;
  throw new Error('deployment history file must be an array or an object with a deployments array');
}

async function fetchJson(url, token) {
  const headers = {
    accept: 'application/vnd.github+json',
    'x-github-api-version': '2022-11-28',
  };
  if (token) headers.authorization = `Bearer ${token}`;
  const response = await fetch(url, {headers, signal: AbortSignal.timeout(8000)});
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
  return response.json();
}

async function fetchDeploymentHistory() {
  const historyFile = optionValue('--deployment-history') || process.env.DEPLOYMENT_HISTORY_FILE;
  if (historyFile) {
    return {source: 'file', status: 'available', entries: await readHistoryFile(historyFile)};
  }

  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  const apiUrl = (process.env.GITHUB_API_URL || 'https://api.github.com').replace(/\/$/, '');
  if (!token || !repository) return {source: 'none', status: 'unavailable', entries: []};

  try {
    const deployments = await fetchJson(`${apiUrl}/repos/${repository}/deployments?environment=github-pages&per_page=20`, token);
    const entries = [];
    for (const deployment of Array.isArray(deployments) ? deployments.slice(0, 20) : []) {
      const statusesUrl = deployment.statuses_url || `${apiUrl}/repos/${repository}/deployments/${deployment.id}/statuses?per_page=20`;
      try {
        const statuses = await fetchJson(statusesUrl, token);
        entries.push({...deployment, statuses: Array.isArray(statuses) ? statuses : []});
      } catch {
        // A deployment without readable statuses cannot be used as a verified rollback target.
        entries.push(deployment);
      }
    }
    return {source: 'github-api', status: 'available', entries};
  } catch {
    return {source: 'github-api', status: 'unavailable', entries: []};
  }
}

const output = optionValue('--out') || 'release-recovery-packet.json';
const candidateSha = process.env.CANDIDATE_SHA || process.env.GITHUB_SHA;
if (!validSha(candidateSha)) throw new Error('CANDIDATE_SHA or GITHUB_SHA must be a full commit SHA');

const pages = normalizeResult(process.env.PAGES_RESULT);
const smoke = normalizeResult(process.env.SMOKE_RESULT);
const workerReadinessResult = normalizeResult(process.env.WORKER_READINESS_RESULT);
const workerDeployment = normalizeResult(process.env.WORKER_RESULT);
const workerEnabled = process.env.WORKER_ENABLED === 'true';
const mode = releaseMode({pages, smoke, workerReadinessResult, workerEnabled, workerDeployment});
const history = await fetchDeploymentHistory();
const previousKnownGood = choosePreviousKnownGood(history.entries, candidateSha);
const fallbackSha = !previousKnownGood && validSha(process.env.PREVIOUS_CANDIDATE_SHA) && process.env.PREVIOUS_CANDIDATE_SHA !== '0'.repeat(40)
  ? process.env.PREVIOUS_CANDIDATE_SHA
  : null;
const historyStatus = previousKnownGood ? 'matched' : fallbackSha ? 'fallback' : history.status === 'unavailable' ? 'unavailable' : 'no-known-good';
const repository = process.env.GITHUB_REPOSITORY || 'local/unknown';
const serverUrl = (process.env.GITHUB_SERVER_URL || 'https://github.com').replace(/\/$/, '');
const runId = process.env.GITHUB_RUN_ID || 'local';
const runUrl = `${serverUrl}/${repository}/actions/runs/${runId}`;
const publicSiteUrl = cleanUrl(process.env.PUBLIC_SITE_URL, DEFAULT_PUBLIC_SITE_URL);
const recoveryRequired = mode === 'RELEASE_FAILED';

const actions = recoveryRequired ? [
  'Pause further releases and retain this run\'s release artifact.',
  'Confirm the previous known-good SHA against its retained release artifact and the live manifest.',
  'After human approval, redeploy the verified SHA through the protected main to Pages path.',
  'Run live smoke validation with EXPECTED_RELEASE_SHA set to the recovery SHA and record the evidence.',
] : [];

const packet = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  recoveryRequired,
  releaseMode: mode,
  candidate: {
    sha: candidateSha,
    repository,
    runId: String(runId),
    runUrl,
    publicSiteUrl,
  },
  observed: {
    pages,
    smoke,
    workerReadinessResult,
    workerReadiness: workerEnabled,
    workerDeployment,
  },
  deploymentHistory: {
    source: history.source,
    status: historyStatus,
    inspectedCount: Array.isArray(history.entries) ? history.entries.length : 0,
    previousKnownGood,
    fallbackSha,
  },
  rollback: {
    status: recoveryRequired ? 'READY_FOR_OPERATOR' : 'NOT_REQUIRED',
    automation: 'manual-approval-required',
    currentCandidateSha: candidateSha,
    previousKnownGood,
    actions,
  },
};

await writeFile(output, `${JSON.stringify(packet, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({status: 'ok', output, recoveryRequired, releaseMode: mode, previousKnownGood: previousKnownGood?.sha || null, fallbackSha}));
