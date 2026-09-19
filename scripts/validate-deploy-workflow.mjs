import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workflow = await readFile(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');
const siteQualityWorkflow = await readFile(new URL('../.github/workflows/verify.yml', import.meta.url), 'utf8');

assert.match(workflow, /^  pull_request:\r?\n    branches: \[main\]$/m, 'PRs targeting main must run verification');
assert.match(workflow, /^  release-verify:\r?\n/m, 'the release verification job must exist');
assert.match(siteQualityWorkflow, /^  site-quality-verify:\r?\n/m, 'the independent site quality job must exist');
assert.doesNotMatch(siteQualityWorkflow, /^  release-verify:\r?\n/m, 'the site quality workflow must not duplicate the release check context');
assert.doesNotMatch(workflow, /^  site-quality-verify:\r?\n/m, 'the release workflow must not duplicate the site quality check context');
assert.ok(!/ubuntu-latest/.test(workflow + siteQualityWorkflow), 'release and site quality workflows must use a fixed Ubuntu runner image');

const lines = workflow.split(/\r?\n/);
for (const job of ['deploy-pages', 'smoke-live', 'worker-readiness', 'deploy-worker']) {
  const start = lines.findIndex(line => line === `  ${job}:`);
  const end = lines.findIndex((line, index) => index > start && /^  [\w-]+:$/.test(line));
  const jobBlock = start >= 0 ? lines.slice(start + 1, end < 0 ? lines.length : end).join('\n') : '';
  assert.ok(jobBlock, `${job} job must exist`);
  assert.match(jobBlock, /if:.*github\.event_name != 'pull_request'/, `${job} must never run for pull requests`);
  assert.match(jobBlock, /github\.ref == 'refs\/heads\/main'/, `${job} must only run for main`);
}

assert.match(workflow, /^    needs: release-verify$/m, 'publishing jobs must depend on release verification');
assert.match(workflow, /DEPLOY_ENABLED:.*secrets\.CLOUDFLARE_API_TOKEN.*secrets\.CLOUDFLARE_ACCOUNT_ID.*secrets\.CLOUDFLARE_D1_DATABASE_ID.*secrets\.ADMIN_TOKEN.*secrets\.MEMBER_ORIGIN/, 'Worker deployment must stay gated on required secrets');
assert.match(workflow, /worker-readiness:[\s\S]*outputs:[\s\S]*enabled: \$\{\{ steps\.gate\.outputs\.enabled \}\}/, 'Worker readiness must be an explicit pre-deployment gate');
assert.match(workflow, /needs: \[release-verify, worker-readiness\][\s\S]*needs\.worker-readiness\.outputs\.enabled == 'true'/, 'Worker deployment must run only after the readiness gate opens');
assert.match(workflow, /HOLD — Worker\/D1 deployment was not run\./, 'missing Worker secrets must be visible as a hold rather than a green skipped deployment step');
assert.doesNotMatch(workflow, /CLOUDFLARE_WORKER_URL \|\|/, 'Worker live verification must not fall back to an unverified temporary origin');
assert.match(workflow, /^permissions:\r?\n  contents: read$/m, 'workflow-wide permissions must remain read-only');

const actionRefs = [...workflow.matchAll(/^\s+uses:\s+(\S+)(?:\s+#.*)?$/gm)].map((match) => match[1]);
assert.ok(actionRefs.length > 0, 'workflow must use pinned GitHub actions');
for (const actionRef of actionRefs) {
  assert.match(actionRef, /^[^@]+@[a-f0-9]{40}(?:\s+#\s+.+)?$/, `GitHub action must be pinned to a full commit SHA: ${actionRef}`);
}

console.log(`Deployment workflow contract passed (${actionRefs.length} SHA-pinned actions; PR verification; main-only publishing).`);
