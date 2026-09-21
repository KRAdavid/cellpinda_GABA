import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const readJson = file => JSON.parse(readFileSync(resolve(process.cwd(), file), 'utf8'));
const readText = file => readFileSync(resolve(process.cwd(), file), 'utf8');
const registry = readJson('data/tf-role-registry.json');
const taskGraph = readJson('data/task-graph.json');
const opsMvp = readText('docs/OPS_MVP.md');
const tfBoard = readText('docs/TF_BOARD.md');
const roleCount = registry.roles.length;
const taskCount = taskGraph.tasks.length;
const issues = [];

const requireText = (source, pattern, label) => {
  if (!pattern.test(source)) issues.push(`${label}가 현재 데이터와 일치하지 않습니다.`);
};

requireText(opsMvp, new RegExp(`${roleCount}개 필수 역할군`), 'OPS_MVP의 TF 역할 수');
requireText(opsMvp, new RegExp(`${roleCount}개 역할군`), 'OPS_MVP의 역할 커버리지 수');
requireText(opsMvp, new RegExp(`${roleCount}개 역할 커버리지`), 'OPS_MVP의 목표 감사 역할 수');
requireText(opsMvp, new RegExp(`${taskCount}개 canonical 작업`), 'OPS_MVP의 업무 카드 수');
requireText(opsMvp, new RegExp(`5개 스트림·${taskCount}개 작업`), 'OPS_MVP의 공개 큐 범위');
requireText(tfBoard, new RegExp(`필수 ${roleCount}개 역할`), 'TF_BOARD의 역할 레지스트리 수');
requireText(tfBoard, /현재 canonical 큐의 `DONE`·`VERIFYING`·`WAITING` 카운트는 최신 pulse/, 'TF_BOARD의 동적 상태 안내');

for (const [source, label] of [[opsMvp, 'OPS_MVP'], [tfBoard, 'TF_BOARD']]) {
  for (const stale of [/7개 필수 역할군/, /7개 역할군/, /14개 canonical 작업/, /5개 스트림·14개 작업/, /필수 7개 역할/]) {
    if (stale.test(source)) issues.push(`${label}에 오래된 TF·업무 수 표현이 남아 있습니다: ${stale}`);
  }
}

if (!opsMvp.includes('일러스트·정보시각화 디자이너')) issues.push('OPS_MVP에 일러스트·정보시각화 역할이 누락되었습니다.');
if (!tfBoard.includes('일러스트·정보시각화 디자이너')) issues.push('TF_BOARD에 일러스트·정보시각화 역할 설명이 누락되었습니다.');

if (issues.length) {
  console.error(JSON.stringify({status: 'invalid', roleCount, taskCount, issues}, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({status: 'ok', roleCount, taskCount, sources: ['docs/OPS_MVP.md', 'docs/TF_BOARD.md']}));
}
