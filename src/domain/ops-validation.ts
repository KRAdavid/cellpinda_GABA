import {canTransitionTask, type TaskState} from './operations.ts';

type JsonObject = Record<string, unknown>;

const taskStates = new Set<TaskState>(['BACKLOG','READY','RUNNING','VERIFYING','WAITING','EXPIRED','RETRY','REWORK','DONE','FAILED','CANCELLED']);
const riskLevels = new Set(['A_READ','B_INTERNAL_WRITE','C_LOW_RISK_INTERNAL','D_EXTERNAL_REVERSIBLE','E_EXTERNAL_COMMITMENT','F_LEGAL_IRREVERSIBLE']);
const approvalRecommendations = new Set(['approve','revise','reject']);
const rootKeys = new Set(['input','plan','audit','approval','approvalTaskId','decisions']);
const forbiddenKeys = /^(?:email|phone|mobile|tel|address|customer|buyer|recipient|password|secret|adminToken|token|runKey|privatePath|original|rightsEvidence|reviewer)$/i;
const sensitiveValue = /(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|(?:\+?82[-. ]?)?0?1[016789][-\s.]?\d{3,4}[-\s.]?\d{4})/i;
const MAX_NODES = 1200;
const MAX_DEPTH = 10;

const isObject = (value: unknown): value is JsonObject => !!value && typeof value === 'object' && !Array.isArray(value);
const text = (value: unknown, max = 4000): value is string => typeof value === 'string' && value.length > 0 && value.length <= max;
const stringArray = (value: unknown, maxItems = 100, maxLength = 2000): value is string[] => Array.isArray(value) && value.length <= maxItems && value.every(item => typeof item === 'string' && item.length <= maxLength);

function walk(value: unknown, depth: number, nodes: {count: number}): string | null {
  if (++nodes.count > MAX_NODES) return '상태 객체가 너무 복잡합니다.';
  if (depth > MAX_DEPTH) return '상태 객체의 중첩 깊이가 너무 깊습니다.';
  if (typeof value === 'string') return sensitiveValue.test(value) ? '개인 연락처가 포함된 상태는 저장할 수 없습니다.' : null;
  if (Array.isArray(value)) {
    for (const item of value) { const issue = walk(item, depth + 1, nodes); if (issue) return issue; }
    return null;
  }
  if (!isObject(value)) return null;
  for (const [key, item] of Object.entries(value)) {
    if (forbiddenKeys.test(key) || key.startsWith('__')) return `보호 필드가 포함되어 있습니다: ${key}`;
    const issue = walk(item, depth + 1, nodes); if (issue) return issue;
  }
  return null;
}

function validateVerification(value: unknown, taskId: string): string | null {
  if (!isObject(value)) return `${taskId} 완료 검증 기록이 없습니다.`;
  if (value.mode !== 'sandbox_simulation' && value.mode !== 'independent_review') return `${taskId} 검증 모드가 올바르지 않습니다.`;
  if (!text(value.verifier, 200) || !stringArray(value.acceptedCriteria, 30, 1000) || value.acceptedCriteria.length === 0) return `${taskId} 검증자·수락 기준이 올바르지 않습니다.`;
  if (!stringArray(value.evidence, 50, 2000) || value.evidence.length === 0) return `${taskId} 검증 증거가 없습니다.`;
  if (value.reviewerNote !== undefined && !text(value.reviewerNote, 2000)) return `${taskId} 검증 메모가 올바르지 않습니다.`;
  if (!text(value.recordedAt, 80) || Number.isNaN(Date.parse(value.recordedAt))) return `${taskId} 검증 기록 시간이 올바르지 않습니다.`;
  return null;
}

function validateReview(value: unknown, taskId: string): string | null {
  if (!isObject(value)) return `${taskId} 독립 검토 기록이 올바르지 않습니다.`;
  if (value.mode !== 'human_independent_review' || !text(value.verifier, 200) || !stringArray(value.acceptedCriteria, 30, 1000) || value.acceptedCriteria.length === 0 || !stringArray(value.evidence, 50, 2000) || value.evidence.length === 0 || !text(value.note, 2000) || value.note.length < 10 || !['accept', 'rework'].includes(String(value.decision)) || !text(value.recordedAt, 80) || Number.isNaN(Date.parse(value.recordedAt))) return `${taskId} 독립 검토 기록 필드가 올바르지 않습니다.`;
  return null;
}

function validatePlan(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (!isObject(value)) return 'plan은 JSON 객체 또는 null이어야 합니다.';
  const contract = value.contract;
  if (!isObject(contract) || !text(contract.goalId, 120)) return 'plan.contract.goalId가 필요합니다.';
  // The API accepts a small draft contract for resumability, but a task-bearing
  // plan must carry the fields needed to audit ownership and decisions.
  if (value.tasks === undefined) return null;
  if (!Array.isArray(value.tasks) || value.tasks.length > 100) return 'plan.tasks가 올바르지 않습니다.';
  const ids = new Set<string>();
  for (const task of value.tasks) {
    if (!isObject(task) || !text(task.id, 80) || ids.has(task.id)) return '업무 그래프의 작업 ID가 올바르지 않거나 중복됩니다.';
    ids.add(task.id);
    if (!text(task.title, 300) || !text(task.description, 2000) || !text(task.output, 500) || !taskStates.has(task.state as TaskState) || typeof task.priority !== 'number' || !Number.isInteger(task.priority) || task.priority < 0 || task.priority > 100) return `${task.id} 작업 기본 필드가 올바르지 않습니다.`;
    if (!stringArray(task.dependencies, 100, 80) || !stringArray(task.acceptance, 50, 2000) || task.acceptance.length === 0 || !stringArray(task.evidence, 50, 2000) || !text(task.lead, 200) || !text(task.verifier, 200)) return `${task.id} 작업의 담당·검증·수락 기준이 올바르지 않습니다.`;
    if (task.risk !== undefined && (typeof task.risk !== 'string' || !riskLevels.has(task.risk))) return `${task.id} 위험도가 올바르지 않습니다.`;
    if (task.state === 'DONE') {
      const issue = validateVerification(task.verification, task.id); if (issue) return issue;
      if (!task.evidence.some((item: string) => item.startsWith(`independent-review:${task.id}:`))) return `${task.id} 독립 검증 증거가 없습니다.`;
      if (isObject(task.verification) && task.verification.mode === 'independent_review' && task.verification.verifier !== task.verifier) return `${task.id} 독립 검토 역할이 지정 검증자와 다릅니다.`;
    } else if (task.verification !== undefined) return `${task.id} 미완료 작업에는 검증 완료 기록을 둘 수 없습니다.`;
    if (task.review !== undefined) {
      const review = task.review;
      const issue = validateReview(review, task.id); if (issue) return issue;
      if (isObject(review) && review.verifier !== task.verifier) return `${task.id} 독립 검토 역할이 지정 검증자와 다릅니다.`;
      if (isObject(review) && review.decision === 'accept' && (task.state !== 'DONE' || !isObject(task.verification) || task.verification.mode !== 'independent_review')) return `${task.id} 승인된 독립 검토는 independent_review 완료 기록과 연결되어야 합니다.`;
      if (isObject(review) && review.decision === 'rework' && (task.state !== 'REWORK' || task.verification !== undefined)) return `${task.id} 보완 요청 기록은 REWORK 상태에만 연결할 수 있습니다.`;
    }
  }
  for (const task of value.tasks) for (const dependency of task.dependencies) if (!ids.has(dependency)) return `${task.id}가 존재하지 않는 선행 작업을 참조합니다.`;
  return null;
}

function validateAudit(value: unknown): string | null {
  if (value === undefined) return null;
  if (!Array.isArray(value) || value.length > 500) return 'audit 로그가 올바르지 않습니다.';
  for (const event of value) {
    if (!isObject(event) || !text(event.id, 160) || !text(event.taskId, 80) || !taskStates.has(event.from as TaskState) || !taskStates.has(event.to as TaskState) || !text(event.note, 2000) || !text(event.createdAt, 80) || Number.isNaN(Date.parse(event.createdAt))) return 'audit 이벤트 필드가 올바르지 않습니다.';
    if (!canTransitionTask(event.from as TaskState, event.to as TaskState)) return `${event.taskId}에 허용되지 않은 상태 전환이 있습니다.`;
  }
  return null;
}

function validateApproval(value: unknown): string | null {
  if (value === undefined) return null;
  if (!isObject(value) || !text(value.action, 500) || typeof value.recommendation !== 'string' || !approvalRecommendations.has(value.recommendation) || typeof value.risk !== 'string' || !riskLevels.has(value.risk) || !text(value.expectedResult, 1000) || !stringArray(value.evidence, 50, 2000) || typeof value.reversible !== 'boolean' || !text(value.expiresAt, 80) || Number.isNaN(Date.parse(value.expiresAt))) return '승인 요청 구조가 올바르지 않습니다.';
  return null;
}

function validateDecisions(value: unknown): string | null {
  if (value === undefined) return null;
  if (!Array.isArray(value) || value.length > 500) return 'TF 의사결정 로그가 올바르지 않습니다.';
  for (const decision of value) {
    if (!isObject(decision) || !text(decision.id, 180) || !text(decision.taskId, 80) || !text(decision.chair, 200) || !stringArray(decision.participants, 30, 300) || !text(decision.question, 1000) || !text(decision.decision, 2000) || typeof decision.dissent !== 'string' || decision.dissent.length > 2000 || !stringArray(decision.evidence, 50, 2000) || !text(decision.nextAction, 1000) || !(decision.state === 'CONTRACT' || taskStates.has(decision.state as TaskState)) || !text(decision.createdAt, 80) || Number.isNaN(Date.parse(decision.createdAt)) || (decision.dissentStatus !== undefined && !['guardrail', 'human-meeting'].includes(String(decision.dissentStatus))) || (decision.dissentRecordedAt !== undefined && (!text(decision.dissentRecordedAt, 80) || Number.isNaN(Date.parse(decision.dissentRecordedAt)))) || (decision.dissentStatus === 'human-meeting' && decision.dissentRecordedAt === undefined)) return 'TF 의사결정 기록 필드가 올바르지 않습니다.';
  }
  return null;
}

export function opsStateIssue(value: unknown): string | null {
  if (!isObject(value)) return 'Sandbox state must be a JSON object';
  const nodes = {count: 0};
  const walkIssue = walk(value, 0, nodes); if (walkIssue) return walkIssue;
  for (const key of Object.keys(value)) if (!rootKeys.has(key)) return `Sandbox state에 허용되지 않은 필드가 있습니다: ${key}`;
  if (value.input !== undefined && !text(value.input, 160)) return 'input은 160자 이내의 문자열이어야 합니다.';
  if (value.approvalTaskId !== undefined && (typeof value.approvalTaskId !== 'string' || value.approvalTaskId.length > 80)) return 'approvalTaskId가 올바르지 않습니다.';
  for (const issue of [validatePlan(value.plan), validateAudit(value.audit), validateApproval(value.approval), validateDecisions(value.decisions)]) if (issue) return issue;
  if (isObject(value.plan) && Array.isArray(value.plan.tasks)) {
    const taskIds = new Set(value.plan.tasks.filter(isObject).map(task => task.id).filter((id): id is string => typeof id === 'string'));
    if (Array.isArray(value.audit) && value.audit.some(event => isObject(event) && typeof event.taskId === 'string' && !taskIds.has(event.taskId))) return 'audit 이벤트가 업무 그래프에 없는 작업을 참조합니다.';
    if (Array.isArray(value.decisions) && value.decisions.some(decision => isObject(decision) && decision.state !== 'CONTRACT' && typeof decision.taskId === 'string' && !taskIds.has(decision.taskId))) return 'TF 의사결정 기록이 업무 그래프에 없는 작업을 참조합니다.';
    const waiting = value.plan.tasks.filter(task => isObject(task) && task.state === 'WAITING');
    if (waiting.length && (!isObject(value.approval) || typeof value.approvalTaskId !== 'string' || !waiting.some(task => task.id === value.approvalTaskId))) return '승인 대기 작업에는 연결된 승인 요청이 필요합니다.';
    if (isObject(value.approval) && (typeof value.approvalTaskId !== 'string' || !waiting.some(task => task.id === value.approvalTaskId))) return '승인 요청과 승인 대기 작업의 연결이 올바르지 않습니다.';
  }
  return null;
}
