export type TaskState = 'BACKLOG' | 'READY' | 'RUNNING' | 'VERIFYING' | 'WAITING' | 'EXPIRED' | 'RETRY' | 'REWORK' | 'DONE' | 'FAILED' | 'CANCELLED';
export type RiskLevel = 'A_READ' | 'B_INTERNAL_WRITE' | 'C_LOW_RISK_INTERNAL' | 'D_EXTERNAL_REVERSIBLE' | 'E_EXTERNAL_COMMITMENT' | 'F_LEGAL_IRREVERSIBLE';

export type TaskNode = {
  id: string;
  title: string;
  state: TaskState;
  priority: number;
  dependencies: string[];
  acceptance: string[];
  evidence: string[];
  lead: string;
  verifier: string;
  risk?: RiskLevel;
};

export type ApprovalRequest = {
  action: string;
  recommendation: 'approve' | 'revise' | 'reject';
  risk: RiskLevel;
  expectedResult: string;
  evidence: string[];
  reversible: boolean;
  expiresAt: string;
};

const transitions: Record<TaskState, readonly TaskState[]> = {
  BACKLOG: ['READY', 'CANCELLED'],
  READY: ['RUNNING', 'CANCELLED'],
  RUNNING: ['VERIFYING', 'WAITING', 'RETRY'],
  VERIFYING: ['DONE', 'REWORK'],
  WAITING: ['READY', 'EXPIRED'],
  EXPIRED: ['READY', 'CANCELLED'],
  RETRY: ['RUNNING', 'FAILED'],
  REWORK: ['RUNNING'],
  DONE: [],
  FAILED: ['RETRY', 'CANCELLED'],
  CANCELLED: [],
};

export function canTransitionTask(from: TaskState, to: TaskState): boolean {
  return transitions[from]?.includes(to) ?? false;
}

export function readyTasks(tasks: readonly TaskNode[]): TaskNode[] {
  const byId = new Map(tasks.map(task => [task.id, task]));
  return tasks
    .filter(task => task.state === 'READY' && task.dependencies.every(dependency => byId.get(dependency)?.state === 'DONE'))
    .sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
}

export function completionIssues(task: TaskNode): string[] {
  const issues: string[] = [];
  if (task.state !== 'VERIFYING') issues.push('Task must be VERIFYING before completion');
  if (task.acceptance.length === 0) issues.push('Acceptance criteria are required');
  if (task.evidence.length === 0) issues.push('Evidence is required');
  if (!task.verifier.trim()) issues.push('An independent verifier is required');
  return issues;
}

export function requiresApproval(risk: RiskLevel): boolean {
  return risk === 'E_EXTERNAL_COMMITMENT' || risk === 'F_LEGAL_IRREVERSIBLE';
}

export function canExecute(risk: RiskLevel, approvalToken?: string): boolean {
  return !requiresApproval(risk) || Boolean(approvalToken?.trim());
}

export function buildApprovalRequest(input: Omit<ApprovalRequest, 'reversible'> & { reversible?: boolean }): ApprovalRequest {
  return {
    ...input,
    reversible: input.reversible ?? (input.risk !== 'F_LEGAL_IRREVERSIBLE'),
  };
}
