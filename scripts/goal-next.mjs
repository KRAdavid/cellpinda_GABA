import { readFile } from 'node:fs/promises';

const readJson = async relative => JSON.parse(await readFile(new URL(`../${relative}`, import.meta.url), 'utf8'));
const contract = await readJson('data/goal-contract.json');
const graph = await readJson('data/task-graph.json');
const fail = message => { throw new Error(`Task graph invalid: ${message}`); };
const allowed = new Set(graph.stateMachine);
if (graph.goalId !== contract.goalId) fail('goalId does not match Goal Contract');
if (!Array.isArray(graph.tasks) || graph.tasks.length === 0) fail('tasks are required');
const ids = new Set();
const byId = new Map();
const contractStreams = new Set(contract.workstreams.map(stream => stream.id));
for (const task of graph.tasks) {
  if (!task.id || ids.has(task.id)) fail(`duplicate or missing task id: ${task.id ?? '(unknown)'}`);
  ids.add(task.id); byId.set(task.id, task);
  if (!contractStreams.has(task.stream)) fail(`${task.id} belongs to undeclared stream ${task.stream}`);
  if (!allowed.has(task.state)) fail(`${task.id} has unsupported state ${task.state}`);
  if (!task.title || !task.stream || !task.lead || !task.verifier || !Array.isArray(task.dependencies) || !Array.isArray(task.acceptance) || !Array.isArray(task.evidence)) fail(`${task.id} is missing a task contract field`);
  if (task.state === 'DONE' && task.evidence.length === 0) fail(`${task.id} is DONE without evidence`);
  if (task.risk === 'E_EXTERNAL_COMMITMENT' && !task.blockedBy) fail(`${task.id} needs an approval/block reason`);
}
for (const stream of contract.workstreams) {
  if (!graph.tasks.some(task => task.stream === stream.id)) fail(`contract stream ${stream.id} has no graph task`);
}
for (const task of graph.tasks) {
  for (const dependency of task.dependencies) {
    if (!byId.has(dependency)) fail(`${task.id} depends on unknown task ${dependency}`);
    if (dependency === task.id) fail(`${task.id} cannot depend on itself`);
  }
}
const visiting = new Set();
const visited = new Set();
const visit = (id, chain = []) => {
  if (visiting.has(id)) {
    const cycleStart = chain.indexOf(id);
    fail(`dependency cycle: ${[...chain.slice(cycleStart), id].join(' -> ')}`);
  }
  if (visited.has(id)) return;
  visiting.add(id);
  for (const dependency of byId.get(id).dependencies) visit(dependency, [...chain, id]);
  visiting.delete(id);
  visited.add(id);
};
for (const id of ids) visit(id);
const ready = graph.tasks.filter(task => task.state === 'READY' && task.dependencies.every(id => byId.get(id).state === 'DONE')).sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
const invalidReady = graph.tasks.filter(task => task.state === 'READY' && !task.dependencies.every(id => byId.get(id).state === 'DONE'));
if (invalidReady.length) fail(`READY tasks have unfinished dependencies: ${invalidReady.map(task => task.id).join(', ')}`);
const waiting = graph.tasks.filter(task => task.state === 'WAITING' || task.state === 'BACKLOG').sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
const summary = { goalId: graph.goalId, goalStatus: contract.status, ready, waiting, counts: Object.fromEntries(graph.stateMachine.map(state => [state, graph.tasks.filter(task => task.state === state).length])) };
if (process.argv.includes('--check')) {
  console.log(JSON.stringify({ goalId: summary.goalId, ready: ready.length, waiting: waiting.length, tasks: graph.tasks.length }));
} else {
  console.log(`Goal ${summary.goalId} · ${summary.goalStatus}`);
  console.log(`준비된 다음 작업 ${ready.length}개`);
  for (const task of ready) console.log(`- ${task.id} [P${task.priority}] ${task.title} · 담당 ${task.lead} · 검증 ${task.verifier}`);
  console.log(`외부 입력 또는 선행조건 대기 ${waiting.length}개`);
  for (const task of waiting) console.log(`- ${task.id} [${task.state}] ${task.title}${task.blockedBy ? ` · 대기: ${task.blockedBy}` : ''}`);
  console.log(`상태 집계: ${Object.entries(summary.counts).filter(([, count]) => count).map(([state, count]) => `${state}=${count}`).join(', ')}`);
}
