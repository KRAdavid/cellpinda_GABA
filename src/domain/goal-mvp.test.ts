import {strict as assert} from 'node:assert';
import test from 'node:test';
import {buildContractDecision, buildMvpApprovalReport, buildTaskDecision, generateMvpPlan, promoteReady, recordHumanDissent, recordIndependentReview, runSandboxTask, runSandboxWave, startMvpSession, taskGraphEdges, verifySandboxTask} from './goal-mvp.ts';
import {opsStateIssue} from './ops-validation.ts';

test('one sentence goal generates a contract, TF and dependency graph', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  assert.match(plan.contract.goalId, /^GMVP-GABA-[0-9A-F]{8}$/);
  assert.equal(plan.contract.workstreams.length, 5);
  assert.equal(plan.contract.team.length, 10);
  assert.ok(plan.contract.team.some(member => member.verifier && member.role === '품질감사관'));
  assert.ok(plan.contract.team.some(member => member.verifier && member.role === '재무·QA'));
  assert.equal(plan.contract.goalType, 'PUBLISH_RESEARCH_INDEX');
  assert.equal(plan.contract.readiness, 'READY');
  assert.ok(plan.contract.focusAreas.includes('공개 근거 인덱스'));
  assert.deepEqual(plan.tasks[0].state, 'READY');
  assert.deepEqual(taskGraphEdges(plan.tasks).slice(0, 2), [{from: 'G1', to: 'E1'}, {from: 'E1', to: 'E2'}]);
});

test('goal focus areas follow the entered sentence', () => {
  const plan = generateMvpPlan('운동 후 근육발달과 회복을 설명하는 GABA 제품 연구 인덱스');
  assert.ok(plan.contract.focusAreas.includes('근육·운동'));
  assert.ok(plan.contract.focusAreas.includes('제품·커머스'));
  assert.ok(plan.contract.focusAreas.includes('공개 근거 인덱스'));
  assert.notEqual(plan.contract.goalId, generateMvpPlan('수면과 스트레스 연구를 설명하는 GABA 인덱스').contract.goalId);
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
  assert.equal(verified.tasks.find(task => task.id === 'G1')?.verification?.verifier, '품질감사관');
  assert.deepEqual(verified.tasks.find(task => task.id === 'G1')?.verification?.acceptedCriteria, plan.tasks.find(task => task.id === 'G1')?.acceptance);
});

test('sandbox wave advances internal work and stops at the approval boundary', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const wave = runSandboxWave(plan.contract, plan.tasks, '2026-09-10T10:00:00.000Z');
  assert.deepEqual(wave.progressedTaskIds, ['G1', 'E1', 'E2', 'C1', 'Q1']);
  assert.equal(wave.tasks.find(task => task.id === 'P1')?.state, 'WAITING');
  assert.equal(wave.approvalTaskId, 'P1');
  assert.equal(wave.stoppedReason, 'approval_required');
  assert.ok(wave.decisions.some(record => record.state === 'WAITING'));
  assert.equal(wave.events.filter(event => event.to === 'DONE').length, 5);
});

test('starting a session runs the internal wave before returning the approval report', () => {
  const session = startMvpSession('공개용 GABA 논문 기반 마스터 인덱스', '2026-09-10T10:00:00.000Z');
  assert.deepEqual(session.progressedTaskIds, ['G1', 'E1', 'E2', 'C1', 'Q1']);
  assert.equal(session.plan.tasks.filter(task => task.state === 'DONE').length, 5);
  assert.equal(session.plan.tasks.find(task => task.id === 'P1')?.state, 'WAITING');
  assert.equal(session.approvalTaskId, 'P1');
  assert.equal(session.stoppedReason, 'approval_required');
  assert.equal(session.decisions[0].state, 'CONTRACT');
  assert.ok(session.decisions.some(record => record.taskId === 'P1' && record.state === 'WAITING'));
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
  assert.equal(report.recommendation, 'revise');
  assert.equal(report.verificationStatus, 'sandbox_simulation_only');
  assert.equal(report.verificationRecords.G1?.mode, 'sandbox_simulation');
  assert.equal(report.verificationRecords.G1?.verifier, '품질감사관');
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

test('human independent review records a decision and unlocks the next task', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const started = runSandboxTask(plan.tasks, 'G1', undefined, '2026-09-10T10:00:00.000Z');
  const reviewed = recordIndependentReview(started.tasks, 'G1', {
    verifier: '품질감사관',
    acceptedCriteria: [...plan.tasks[0].acceptance],
    note: '수락 기준과 샌드박스 산출물의 연결을 모두 확인했습니다.',
    decision: 'accept',
  }, '2026-09-10T10:01:00.000Z');
  const task = reviewed.tasks.find(item => item.id === 'G1');
  assert.equal(task?.state, 'DONE');
  assert.equal(task?.verification?.mode, 'independent_review');
  assert.equal(task?.review?.mode, 'human_independent_review');
  assert.equal(task?.review?.decision, 'accept');
  assert.equal(reviewed.tasks.find(item => item.id === 'E1')?.state, 'READY');
  assert.deepEqual(reviewed.events.map(event => `${event.from}->${event.to}`), ['VERIFYING->DONE']);
  const report = buildMvpApprovalReport(plan.contract, reviewed.tasks, [...started.events, ...reviewed.events]);
  assert.equal(report.verificationStatus, 'independent_review_recorded');
  assert.deepEqual(report.independentlyVerifiedTasks, ['G1']);
  assert.deepEqual(report.sandboxCompletedTasks, []);
  assert.equal(report.reviewRecords.G1?.decision, 'accept');
  assert.equal(opsStateIssue({plan: {contract: {goalId: plan.contract.goalId}, tasks: reviewed.tasks}, audit: reviewed.events}), null);
});

test('human independent review can return work to rework and rerun it', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const started = runSandboxTask(plan.tasks, 'G1', undefined, '2026-09-10T10:00:00.000Z');
  const rework = recordIndependentReview(started.tasks, 'G1', {
    verifier: '품질감사관',
    acceptedCriteria: [...plan.tasks[0].acceptance],
    note: '산출물에 한 가지 보완 설명이 필요합니다.',
    decision: 'rework',
  }, '2026-09-10T10:01:00.000Z');
  assert.equal(rework.tasks.find(item => item.id === 'G1')?.state, 'REWORK');
  const rerun = runSandboxTask(rework.tasks, 'G1', undefined, '2026-09-10T10:02:00.000Z');
  assert.equal(rerun.tasks.find(item => item.id === 'G1')?.state, 'VERIFYING');
  assert.equal(rerun.tasks.find(item => item.id === 'G1')?.review, undefined);
  assert.deepEqual(rerun.events.map(event => `${event.from}->${event.to}`), ['REWORK->RUNNING', 'RUNNING->VERIFYING']);
});

test('interactive wave stops at a human verification gate', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const wave = runSandboxWave(plan.contract, plan.tasks, '2026-09-10T10:00:00.000Z', {autoVerify: false});
  assert.deepEqual(wave.progressedTaskIds, ['G1']);
  assert.equal(wave.tasks.find(task => task.id === 'G1')?.state, 'VERIFYING');
  assert.equal(wave.stoppedReason, 'verification_required');
});

test('independent review refuses incomplete criteria or short rationale', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const started = runSandboxTask(plan.tasks, 'G1', undefined, '2026-09-10T10:00:00.000Z');
  assert.throws(() => recordIndependentReview(started.tasks, 'G1', {
    verifier: '품질감사관', acceptedCriteria: [plan.tasks[0].acceptance[0]], note: '짧음', decision: 'accept',
}, '2026-09-10T10:01:00.000Z'), /모든 수락 기준/);
});

test('independent review is bound to the task verifier role', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const started = runSandboxTask(plan.tasks, 'G1', undefined, '2026-09-10T10:00:00.000Z');
  assert.throws(() => recordIndependentReview(started.tasks, 'G1', {
    verifier: '마케팅·소비자심리', acceptedCriteria: [...plan.tasks[0].acceptance], note: '모든 기준을 확인했지만 지정된 검증 역할이 아닙니다.', decision: 'accept',
  }, '2026-09-10T10:01:00.000Z'), /지정된 독립 검증 역할/);
});

test('human meeting dissent is appended separately from the generated guardrail', () => {
  const plan = generateMvpPlan('공개용 GABA 논문 기반 마스터 인덱스');
  const generated = [
    buildContractDecision(plan.contract, '2026-09-10T10:00:00.000Z'),
    buildTaskDecision(plan.contract, plan.tasks[0], '2026-09-10T10:00:01.000Z'),
  ];
  const recorded = recordHumanDissent(generated, 'G1', '표시 승인 전 제품 분류 확인을 먼저 진행해야 합니다.', '2026-09-10T10:01:00.000Z');
  assert.equal(recorded.length, 3);
  assert.equal(recorded[1].dissentStatus, 'guardrail');
  assert.equal(recorded[2].dissentStatus, 'human-meeting');
  assert.equal(recorded[2].dissentRecordedAt, '2026-09-10T10:01:00.000Z');
  assert.equal(opsStateIssue({plan: {contract: {goalId: plan.contract.goalId}, tasks: plan.tasks}, decisions: recorded}), null);
});
