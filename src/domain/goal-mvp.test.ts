import {strict as assert} from 'node:assert';
import test from 'node:test';
import {buildMvpApprovalReport, generateMvpPlan, promoteReady, runSandboxTask, taskGraphEdges} from './goal-mvp.ts';

test('one sentence goal generates a contract, TF and dependency graph', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  assert.match(plan.contract.goalId, /^GMVP-GABA-[0-9A-F]{8}$/);
  assert.equal(plan.contract.workstreams.length, 4);
  assert.equal(plan.contract.team.length, 8);
  assert.equal(plan.contract.team.find(member => member.verifier)?.role, '품질감사관');
  assert.equal(plan.contract.goalType, 'PUBLISH_RESEARCH_INDEX');
  assert.equal(plan.contract.readiness, 'READY');
  assert.deepEqual(plan.tasks[0].state, 'READY');
  assert.deepEqual(taskGraphEdges(plan.tasks).slice(0, 2), [{from: 'G1', to: 'E1'}, {from: 'E1', to: 'E2'}]);
});

test('sandbox execution verifies a task and unlocks its dependent task', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const result = runSandboxTask(plan.tasks, 'G1', undefined, '2026-09-10T10:00:00.000Z');
  assert.equal(result.tasks.find(task => task.id === 'G1')?.state, 'DONE');
  assert.equal(result.tasks.find(task => task.id === 'E1')?.state, 'READY');
  assert.equal(result.events.length, 3);
});

test('external commitment produces an approval packet before execution', () => {
  const base = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const completed = base.tasks.map(task => task.id === 'P1' ? {...task, state: 'READY' as const} : {...task, state: 'DONE' as const});
  const blocked = runSandboxTask(completed, 'P1', undefined, '2026-09-10T10:00:00.000Z');
  assert.equal(blocked.approval?.risk, 'E_EXTERNAL_COMMITMENT');
  assert.equal(blocked.approvalTaskId, 'P1');
  assert.equal(blocked.tasks.find(task => task.id === 'P1')?.state, 'WAITING');
  const approved = runSandboxTask(completed, 'P1', 'sandbox-approval', '2026-09-10T10:00:00.000Z');
  assert.equal(approved.tasks.find(task => task.id === 'P1')?.state, 'DONE');
});

test('approval report distinguishes completed and pending work', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const after = runSandboxTask(plan.tasks, 'G1', undefined, '2026-09-10T10:00:00.000Z');
  const report = buildMvpApprovalReport(plan.contract, after.tasks, after.events, undefined, '2026-09-10T10:00:00.000Z');
  assert.equal(report.sandboxOnly, true);
  assert.equal(report.verificationStatus, 'sandbox_simulation_only');
  assert.equal(report.auditEvents.length, 3);
  assert.deepEqual(report.taskEvidence.G1, ['sandbox:G1:2026-09-10T10:00:00.000Z']);
  assert.equal(report.contractSnapshot.goalId, plan.contract.goalId);
  assert.deepEqual(report.taskAcceptance.G1, plan.tasks.find(task => task.id === 'G1')?.acceptance);
  assert.deepEqual(report.completedTasks, ['G1']);
  assert.ok(report.pendingTasks.includes('P1'));
});

test('readiness promotion never skips a dependency', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  assert.deepEqual(promoteReady(plan.tasks).filter(task => task.state === 'READY').map(task => task.id), ['G1']);
});
