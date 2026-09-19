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
for (const job of ['deploy-pages', 'smoke-live', 'worker-readiness', 'deploy-worker', 'release-status']) {
  const start = lines.findIndex(line => line === `  ${job}:`);
  const end = lines.findIndex((line, index) => index > start && /^  [\w-]+:$/.test(line));
  const jobBlock = start >= 0 ? lines.slice(start + 1, end < 0 ? lines.length : end).join('\n') : '';
  assert.ok(jobBlock, `${job} job must exist`);
  assert.match(jobBlock, /if:.*github\.event_name != 'pull_request'/, `${job} must never run for pull requests`);
  assert.match(jobBlock, /github\.ref == 'refs\/heads\/main'/, `${job} must only run for main`);
}

assert.match(workflow, /^    needs: release-verify$/m, 'publishing jobs must depend on release verification');
assert.match(workflow, /rewrite-public-origin\.mjs dist-pages/, 'Pages artifacts must apply the selected public origin');
assert.match(workflow, /rewrite-public-origin\.mjs dist-pages[\s\S]*check-public-artifacts\.mjs dist-pages/, 'Pages origin rewrite must be checked before publishing');
assert.match(workflow, /check-public-artifacts\.mjs dist-pages[\s\S]*validate:static-bundle -- dist-pages/, 'Pages artifacts must validate every public route before publishing');
assert.match(workflow, /RELEASE_SHA: \$\{\{ github\.sha \}\}[\s\S]*RELEASE_RUNTIME_MODE: static[\s\S]*generate:release-manifest -- dist-pages[\s\S]*validate:release-manifest -- dist-pages/, 'Pages artifacts must carry and validate a candidate release manifest');
assert.match(workflow, /PUBLIC_SITE_URL: \$\{\{ vars\.CLOUDFLARE_WORKER_URL \}\}[\s\S]*RELEASE_SHA: \$\{\{ github\.sha \}\}[\s\S]*RELEASE_RUNTIME_MODE: worker[\s\S]*run: pnpm run build/, 'Worker artifacts must carry a worker-mode candidate release manifest');
assert.match(workflow, /DEPLOY_ENABLED:.*secrets\.CLOUDFLARE_API_TOKEN.*secrets\.CLOUDFLARE_ACCOUNT_ID.*secrets\.CLOUDFLARE_D1_DATABASE_ID.*secrets\.ADMIN_TOKEN.*secrets\.MEMBER_ORIGIN/, 'Worker deployment must stay gated on required secrets');
assert.match(workflow, /worker-readiness:[\s\S]*outputs:[\s\S]*enabled: \$\{\{ steps\.gate\.outputs\.enabled \}\}/, 'Worker readiness must be an explicit pre-deployment gate');
assert.match(workflow, /needs: \[release-verify, worker-readiness\][\s\S]*needs\.worker-readiness\.outputs\.enabled == 'true'/, 'Worker deployment must run only after the readiness gate opens');
assert.match(workflow, /HOLD — Worker\/D1 deployment was not run\./, 'missing Worker secrets must be visible as a hold rather than a green skipped deployment step');
assert.match(workflow, /release-status:[\s\S]*needs: \[deploy-pages, smoke-live, worker-readiness, deploy-worker\]/, 'release mode must summarize both static and Worker deployment results');
assert.match(workflow, /release-status:[\s\S]*if: always\(\) && github\.event_name != 'pull_request'/, 'release status must run even when the optional Worker deployment is skipped');
assert.match(workflow, /mode="FULL_RELEASE"/, 'release status must identify a full Worker-backed release');
assert.match(workflow, /mode="STATIC_ONLY"/, 'release status must identify a static-only release');
assert.match(workflow, /Worker\/D1 remains HOLD; this run publishes the static public site only\./, 'static-only releases must expose the operational hold');
assert.match(workflow, /release-status:[\s\S]*actions\/upload-artifact@[a-f0-9]{40}/, 'release status must be retained as an auditable artifact');
assert.match(workflow, /release-status:[\s\S]*validate-release-status\.mjs release-status\.json/, 'release status artifact must be schema validated');
assert.match(workflow, /PAGES_PUBLIC_SITE_URL: https:\/\/kradavid\.github\.io\/cellpinda_GABA[\s\S]*WORKER_PUBLIC_SITE_URL: \$\{\{ vars\.CLOUDFLARE_WORKER_URL \}\}/, 'live smoke must keep Pages and Worker public origins explicit');
assert.match(workflow, /PUBLIC_SITE_URL="\$WORKER_PUBLIC_SITE_URL" PUBLIC_RUNTIME_MODE=worker/, 'full-release smoke must verify the Worker public origin');
assert.match(workflow, /PUBLIC_SITE_URL="\$PAGES_PUBLIC_SITE_URL" PUBLIC_RUNTIME_MODE=static/, 'static-only smoke must verify the Pages public origin');
assert.match(workflow, /EXPECTED_RELEASE_SHA: \$\{\{ github\.sha \}\}[\s\S]*validate-live-public\.mjs/, 'live smoke must compare the published release manifest with the candidate SHA');
assert.match(workflow, /Create deployment Wrangler config[\s\S]*PUBLIC_SITE_URL: \$\{\{ vars\.CLOUDFLARE_WORKER_URL \}\}[\s\S]*config\.vars=\{\.\.\.\(config\.vars\|\|\{\}\),PUBLIC_SITE_URL:process\.env\.PUBLIC_SITE_URL\}/, 'Worker deploy config must inject the selected public origin');
assert.match(workflow, /Strict deployment readiness gate[\s\S]*PUBLIC_SITE_URL: \$\{\{ vars\.CLOUDFLARE_WORKER_URL \}\}[\s\S]*pnpm run preflight:deploy -- --strict/, 'strict Worker readiness must validate the same public origin used for deployment');
assert.match(workflow, /elif \[ "\$WORKER_ENABLED" = "true" \] && \[ "\$WORKER_RESULT" != "success" \][\s\S]*mode="RELEASE_FAILED"/, 'a failed Worker deployment must not be relabeled as static-only');
assert.doesNotMatch(workflow, /CLOUDFLARE_WORKER_URL \|\|/, 'Worker live verification must not fall back to an unverified temporary origin');
assert.match(workflow, /^permissions:\r?\n  contents: read$/m, 'workflow-wide permissions must remain read-only');

const actionRefs = [...workflow.matchAll(/^\s+uses:\s+(\S+)(?:\s+#.*)?$/gm)].map((match) => match[1]);
assert.ok(actionRefs.length > 0, 'workflow must use pinned GitHub actions');
for (const actionRef of actionRefs) {
  assert.match(actionRef, /^[^@]+@[a-f0-9]{40}(?:\s+#\s+.+)?$/, `GitHub action must be pinned to a full commit SHA: ${actionRef}`);
}

console.log(`Deployment workflow contract passed (${actionRefs.length} SHA-pinned actions; PR verification; main-only publishing).`);
