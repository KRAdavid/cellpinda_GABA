import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {
  buildContractDecision,
  buildMvpApprovalReport,
  buildTaskDecision,
  generateMvpPlan,
  recordIndependentReview,
  runSandboxTask,
  runSandboxWave,
  verifySandboxTask,
} from '../src/domain/goal-mvp.ts';

const goal = '공개용 GABA 논문 기반 마스터 인덱스';
const roleRegistry = JSON.parse(await readFile(new URL('../data/tf-role-registry.json', import.meta.url), 'utf8'));
const timestamps = Array.from({length: 24}, (_, index) => `2026-09-10T10:${String(index).padStart(2, '0')}:00.000Z`);
const plan = generateMvpPlan(goal);
assert.equal(plan.contract.goalType, 'PUBLISH_RESEARCH_INDEX');
assert.ok(plan.contract.focusAreas.includes('공개 근거 인덱스'));
assert.equal(plan.contract.workstreams.length, 5);
assert.equal(plan.contract.team.length, 10);
assert.equal(plan.tasks.length, 6);
for (const task of plan.tasks) assert.notEqual(task.lead, task.verifier, `generated MVP task ${task.id} must have a distinct verifier`);
for (const stream of plan.contract.workstreams) assert.notEqual(stream.lead, stream.verifier, `generated MVP stream ${stream.id} must have a distinct verifier`);
const generatedRoleCorpus = [
  ...plan.contract.team.map(member => member.role),
  ...plan.contract.workstreams.flatMap(stream => [stream.lead, stream.verifier]),
].join(' · ');
assert.equal(roleRegistry.status, 'ACTIVE');
for (const role of roleRegistry.roles) assert.ok(role.match.some(term => generatedRoleCorpus.includes(term)), `generated MVP TF is missing ${role.label}`);

const interactiveWave = runSandboxWave(plan.contract, plan.tasks, timestamps[2], {autoVerify: false});
assert.deepEqual(interactiveWave.progressedTaskIds, ['G1']);
assert.equal(interactiveWave.stoppedReason, 'verification_required');
assert.equal(interactiveWave.tasks.find(task => task.id === 'G1')?.state, 'VERIFYING');
const interactiveReview = recordIndependentReview(interactiveWave.tasks, 'G1', {
  verifier: '품질감사관',
  acceptedCriteria: [...plan.tasks[0].acceptance],
  note: '수락 기준과 샌드박스 산출물의 연결을 모두 확인했습니다.',
  decision: 'accept',
}, timestamps[3]);
assert.equal(interactiveReview.tasks.find(task => task.id === 'G1')?.verification?.mode, 'independent_review');
const interactiveReport = buildMvpApprovalReport(plan.contract, interactiveReview.tasks, [...interactiveWave.events, ...interactiveReview.events], undefined, timestamps[4]);
assert.equal(interactiveReport.verificationStatus, 'independent_review_recorded');
assert.deepEqual(interactiveReport.independentlyVerifiedTasks, ['G1']);
assert.equal(interactiveReport.reviewRecords.G1?.mode, 'human_independent_review');

const wave = runSandboxWave(plan.contract, plan.tasks, timestamps[1]);
assert.deepEqual(wave.progressedTaskIds, ['G1', 'E1', 'E2', 'C1', 'Q1']);
assert.equal(wave.approval?.risk, 'E_EXTERNAL_COMMITMENT');
assert.equal(wave.approvalTaskId, 'P1');
assert.equal(wave.stoppedReason, 'approval_required');
assert.equal(wave.tasks.find(task => task.id === 'P1')?.state, 'WAITING');

let tasks = wave.tasks;
let events = wave.events;
let decisions = [buildContractDecision(plan.contract, timestamps[0]), ...wave.decisions];
let clock = 2;

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
assert.equal(report.recommendation, 'revise');
assert.deepEqual(report.completedTasks, ['G1', 'E1', 'E2', 'C1', 'Q1', 'P1']);
assert.equal(report.pendingTasks.length, 0);
assert.equal(report.sandboxOnly, true);
assert.equal(report.verificationStatus, 'sandbox_simulation_only');
assert.deepEqual(report.contractSnapshot.focusAreas, plan.contract.focusAreas);
assert.equal(Object.keys(report.verificationRecords).length, 6);
assert.equal(report.verificationRecords.P1?.verifier, '재무·QA');
assert.equal(report.verificationRecords.P1?.mode, 'sandbox_simulation');
assert.ok(report.auditEvents.some(event => event.taskId === 'P1' && event.note.includes('재무·QA')));
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
  automatedWave: `${wave.progressedTaskIds.length} internal tasks -> P1 approval`,
  recommendation: report.recommendation,
  verificationStatus: report.verificationStatus,
  interactiveReview: interactiveReport.verificationStatus,
  roleGroups: roleRegistry.roles.length,
}));
