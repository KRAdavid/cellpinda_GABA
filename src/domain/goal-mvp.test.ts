import {strict as assert} from 'node:assert';
import test from 'node:test';
import {buildContractDecision, buildMvpApprovalReport, buildTaskDecision, generateMvpPlan, promoteReady, runSandboxTask, taskGraphEdges, verifySandboxTask} from './goal-mvp.ts';

test('one sentence goal generates a contract, TF and dependency graph', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  assert.match(plan.contract.goalId, /^GMVP-GABA-[0-9A-F]{8}$/);
  assert.equal(plan.contract.workstreams.length, 5);
  assert.equal(plan.contract.team.length, 10);
  assert.ok(plan.contract.team.some(member => member.verifier && member.role === '품질감사관'));
  assert.ok(plan.contract.team.some(member => member.verifier && member.role === '재무·QA'));
  assert.equal(plan.contract.goalType, 'PUBLISH_RESEARCH_INDEX');
  assert.equal(plan.contract.readiness, 'READY');
  assert.deepEqual(plan.tasks[0].state, 'READY');
  assert.deepEqual(taskGraphEdges(plan.tasks).slice(0, 2), [{from: 'G1', to: 'E1'}, {from: 'E1', to: 'E2'}]);
});

test('sandbox execution verifies a task and unlocks its dependent task', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const result = runSandboxTask(plan.tasks, 'G1', undefined, '2026-09-10T10:00:00.000Z');
  assert.equal(result.tasks.find(task => task.id === 'G1')?.state, 'VERIFYING');
  assert.equal(result.tasks.find(task => task.id === 'E1')?.state, 'BACKLOG');
  assert.equal(result.events.length, 2);
  const verified = verifySandboxTask(result.tasks, 'G1', '2026-09-10T10:01:00.000Z');
  assert.equal(verified.tasks.find(task => task.id === 'G1')?.state, 'DONE');
  assert.equal(verified.tasks.find(task => task.id === 'E1')?.state, 'READY');
  assert.equal(verified.events.length, 1);
});

test('external commitment produces an approval packet before execution', () => {
  const base = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const completed = base.tasks.map(task => task.id === 'P1' ? {...task, state: 'READY' as const} : {...task, state: 'DONE' as const});
  const blocked = runSandboxTask(completed, 'P1', undefined, '2026-09-10T10:00:00.000Z');
  assert.equal(blocked.approval?.risk, 'E_EXTERNAL_COMMITMENT');
  assert.equal(blocked.approvalTaskId, 'P1');
  assert.equal(blocked.tasks.find(task => task.id === 'P1')?.state, 'WAITING');
  const approved = runSandboxTask(completed, 'P1', 'sandbox-approval', '2026-09-10T10:00:00.000Z');
  assert.equal(approved.tasks.find(task => task.id === 'P1')?.state, 'VERIFYING');
  const verified = verifySandboxTask(approved.tasks, 'P1', '2026-09-10T10:01:00.000Z');
  assert.equal(verified.tasks.find(task => task.id === 'P1')?.state, 'DONE');
});

test('approval request can resume the persisted WAITING task', () => {
  const base = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const completed = base.tasks.map(task => task.id === 'P1' ? {...task, state: 'READY' as const} : {...task, state: 'DONE' as const});
  const blocked = runSandboxTask(completed, 'P1', undefined, '2026-09-10T10:00:00.000Z');
  const resumed = runSandboxTask(blocked.tasks, 'P1', 'sandbox-approval', '2026-09-10T10:02:00.000Z');
  assert.equal(resumed.tasks.find(task => task.id === 'P1')?.state, 'VERIFYING');
  assert.deepEqual(resumed.events.map(event => `${event.from}->${event.to}`), ['WAITING->READY', 'READY->RUNNING', 'RUNNING->VERIFYING']);
  assert.match(resumed.events[0].note, /승인/);
});

test('approval report distinguishes completed and pending work', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const after = runSandboxTask(plan.tasks, 'G1', undefined, '2026-09-10T10:00:00.000Z');
  const verified = verifySandboxTask(after.tasks, 'G1', '2026-09-10T10:01:00.000Z');
  const contractDecision = buildContractDecision(plan.contract, '2026-09-10T09:59:00.000Z');
  const taskDecision = buildTaskDecision(plan.contract, verified.tasks.find(task => task.id === 'G1')!, '2026-09-10T10:01:00.000Z');
  const report = buildMvpApprovalReport(plan.contract, verified.tasks, [...after.events, ...verified.events], undefined, '2026-09-10T10:00:00.000Z', [contractDecision, taskDecision]);
  assert.equal(report.sandboxOnly, true);
  assert.equal(report.verificationStatus, 'sandbox_simulation_only');
  assert.equal(report.auditEvents.length, 3);
  assert.deepEqual(report.taskEvidence.G1, ['sandbox-output:G1:2026-09-10T10:00:00.000Z', 'independent-review:G1:2026-09-10T10:01:00.000Z']);
  assert.equal(report.contractSnapshot.goalId, plan.contract.goalId);
  assert.deepEqual(report.taskAcceptance.G1, plan.tasks.find(task => task.id === 'G1')?.acceptance);
  assert.equal(report.decisionRecords.length, 2);
  assert.equal(report.decisionRecords[0].participants.length, 10);
  assert.match(report.decisionRecords[1].decision, /독립 검증/);
  assert.ok(report.decisionRecords[0].dissent.length > 0);
  assert.ok(report.decisionRecords[1].evidence.includes('sandbox-output:G1:2026-09-10T10:00:00.000Z'));
  assert.deepEqual(report.completedTasks, ['G1']);
  assert.ok(report.pendingTasks.includes('P1'));
});

test('readiness promotion never skips a dependency', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  assert.deepEqual(promoteReady(plan.tasks).filter(task => task.state === 'READY').map(task => task.id), ['G1']);
});
