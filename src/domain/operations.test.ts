import { strict as assert } from 'node:assert';
import test from 'node:test';
import { buildApprovalRequest, canExecute, canTransitionTask, completionIssues, readyTasks, requiresApproval, type TaskNode } from './operations.ts';

const task = (partial: Partial<TaskNode> = {}): TaskNode => ({
  id: 'A1', title: 'test', state: 'READY', priority: 1, dependencies: [], acceptance: ['done'], evidence: [], lead: 'lead', verifier: 'verifier', ...partial,
});

test('task transitions follow the operating state machine', () => {
  assert.equal(canTransitionTask('READY', 'RUNNING'), true);
  assert.equal(canTransitionTask('RUNNING', 'DONE'), false);
  assert.equal(canTransitionTask('VERIFYING', 'DONE'), true);
  assert.equal(canTransitionTask('DONE', 'RUNNING'), false);
});

test('only tasks with completed dependencies become ready', () => {
  const tasks = [task({ id: 'A1', state: 'DONE', evidence: ['qa'] }), task({ id: 'A2', dependencies: ['A1'] }), task({ id: 'A3', dependencies: ['missing'] })];
  assert.deepEqual(readyTasks(tasks).map(item => item.id), ['A2']);
});

test('completion requires verification, acceptance and evidence', () => {
  assert.deepEqual(completionIssues(task({ state: 'READY' })), ['Task must be VERIFYING before completion', 'Evidence is required']);
  assert.deepEqual(completionIssues(task({ state: 'VERIFYING', evidence: ['test-log'] })), []);
  assert.ok(completionIssues(task({ state: 'VERIFYING', acceptance: [], evidence: ['test-log'] })).includes('Acceptance criteria are required'));
});

test('high-risk actions require approval before execution', () => {
  assert.equal(requiresApproval('A_READ'), false);
  assert.equal(requiresApproval('E_EXTERNAL_COMMITMENT'), true);
  assert.equal(canExecute('E_EXTERNAL_COMMITMENT'), false);
  assert.equal(canExecute('E_EXTERNAL_COMMITMENT', 'approval-1'), true);
  assert.equal(canExecute('F_LEGAL_IRREVERSIBLE', '   '), false);
});

test('approval packets preserve risk, evidence and reversibility', () => {
  const packet = buildApprovalRequest({ action: 'Publish approved copy', recommendation: 'approve', risk: 'D_EXTERNAL_REVERSIBLE', expectedResult: 'Published draft', evidence: ['copy-review'], expiresAt: '2026-09-11T00:00:00Z' });
  assert.equal(packet.reversible, true);
  assert.deepEqual(packet.evidence, ['copy-review']);
  const legal = buildApprovalRequest({ action: 'Sign contract', recommendation: 'reject', risk: 'F_LEGAL_IRREVERSIBLE', expectedResult: 'No signature', evidence: ['legal-review'], expiresAt: '2026-09-11T00:00:00Z' });
  assert.equal(legal.reversible, false);
});
