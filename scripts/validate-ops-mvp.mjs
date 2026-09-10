import assert from 'node:assert/strict';
import {
  buildContractDecision,
  buildMvpApprovalReport,
  buildTaskDecision,
  generateMvpPlan,
  runSandboxTask,
  verifySandboxTask,
} from '../src/domain/goal-mvp.ts';

const goal = '공개용 GABA 논문 기반 마스터 인덱스';
const timestamps = Array.from({length: 24}, (_, index) => `2026-09-10T10:${String(index).padStart(2, '0')}:00.000Z`);
const plan = generateMvpPlan(goal);
assert.equal(plan.contract.goalType, 'PUBLISH_RESEARCH_INDEX');
assert.equal(plan.contract.workstreams.length, 5);
assert.equal(plan.contract.team.length, 10);
assert.equal(plan.tasks.length, 6);

let tasks = plan.tasks;
let events = [];
let decisions = [buildContractDecision(plan.contract, timestamps[0])];
let clock = 1;

for (const taskId of ['G1', 'E1', 'E2', 'C1', 'Q1']) {
  const execution = runSandboxTask(tasks, taskId, undefined, timestamps[clock++]);
  assert.equal(execution.approval, undefined, `${taskId} unexpectedly requires approval`);
  tasks = execution.tasks;
  events = [...events, ...execution.events];
  decisions = [...decisions, buildTaskDecision(plan.contract, tasks.find(task => task.id === taskId), timestamps[clock++])];
  const verification = verifySandboxTask(tasks, taskId, timestamps[clock++]);
  tasks = verification.tasks;
  events = [...events, ...verification.events];
  decisions = [...decisions, buildTaskDecision(plan.contract, tasks.find(task => task.id === taskId), timestamps[clock++])];
}

const approval = runSandboxTask(tasks, 'P1', undefined, timestamps[clock++]);
assert.equal(approval.approval?.risk, 'E_EXTERNAL_COMMITMENT');
assert.equal(approval.tasks.find(task => task.id === 'P1')?.state, 'WAITING');
tasks = approval.tasks;
decisions = [...decisions, buildTaskDecision(plan.contract, tasks.find(task => task.id === 'P1'), timestamps[clock++])];

const resumed = runSandboxTask(tasks, 'P1', 'sandbox-approval', timestamps[clock++]);
assert.equal(resumed.approval, undefined);
assert.equal(resumed.tasks.find(task => task.id === 'P1')?.state, 'VERIFYING');
assert.deepEqual(resumed.events.map(event => `${event.from}->${event.to}`), ['WAITING->READY', 'READY->RUNNING', 'RUNNING->VERIFYING']);
tasks = resumed.tasks;
events = [...events, ...resumed.events];
decisions = [...decisions, buildTaskDecision(plan.contract, tasks.find(task => task.id === 'P1'), timestamps[clock++])];

const final = verifySandboxTask(tasks, 'P1', timestamps[clock++]);
tasks = final.tasks;
events = [...events, ...final.events];
decisions = [...decisions, buildTaskDecision(plan.contract, tasks.find(task => task.id === 'P1'), timestamps[clock++])];

const report = buildMvpApprovalReport(plan.contract, tasks, events, undefined, timestamps[clock++], decisions);
assert.equal(report.recommendation, 'approve');
assert.deepEqual(report.completedTasks, ['G1', 'E1', 'E2', 'C1', 'Q1', 'P1']);
assert.equal(report.pendingTasks.length, 0);
assert.equal(report.sandboxOnly, true);
assert.equal(report.verificationStatus, 'sandbox_simulation_only');
assert.ok(report.decisionRecords.length >= 14);
assert.ok(report.decisionRecords.some(record => record.state === 'WAITING'));
assert.ok(report.decisionRecords.some(record => record.nextAction.includes('승인')));
assert.ok(report.auditEvents.some(event => event.from === 'WAITING' && event.to === 'READY'));

console.log(JSON.stringify({
  goalId: plan.contract.goalId,
  tasks: report.completedTasks.length,
  decisions: report.decisionRecords.length,
  auditEvents: report.auditEvents.length,
  approvalGate: 'WAITING->READY->RUNNING->VERIFYING',
  recommendation: report.recommendation,
  verificationStatus: report.verificationStatus,
}));
