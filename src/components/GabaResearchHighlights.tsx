import {Activity, Dumbbell, Moon, type LucideIcon} from 'lucide-react';
import type {Claim} from './ResearchLibrary';
import './GabaResearchHighlights.css';

type Highlight = {
  id: string;
  label: string;
  title: string;
  summary: string;
  facts: string[];
  Icon: LucideIcon;
};

const highlightOrder: Highlight[] = [
  {
    id: 'research-yamatsu-2016',
    label: '잠',
    title: '잠드는 시간과 수면 기록',
    summary: 'GABA 캡슐을 먹은 주와 비교 캡슐을 먹은 주의 잠 기록을 비교했어요.',
    facts: ['참여: 성인 10명', '연구 조건: 하루 100mg', '살펴본 내용: 잠드는 시간·수면 기록'],
    Icon: Moon,
  },
  {
    id: 'research-yoto-2012',
    label: '머리를 많이 쓴 뒤',
    title: '머리를 많이 쓴 뒤에도 뇌파와 활력이 더 유지됐어요',
    summary: 'GABA 캡슐 조건에서 머리를 많이 쓴 뒤 비교 캡슐보다 뇌파 변화와 활력 점수의 저하가 작게 기록됐어요.',
    facts: ['참여: 성인 63명', '연구 조건: 100mg 한 번', '비교 결과: 뇌파 변화·활력 점수의 감소 폭'],
    Icon: Activity,
  },
  {
    id: 'research-powers-2008',
    label: '쉬었을 때·운동했을 때',
    title: '쉰 날·운동한 날 몸의 변화',
    summary: 'GABA 또는 비교 캡슐을 먹고 쉬었을 때와 운동했을 때 혈액 속 변화를 비교했어요.',
    facts: ['참여: 운동 경험 남성 11명', '연구 조건: 3g 한 번', '비교: 쉬었을 때·운동했을 때'],
    Icon: Dumbbell,
  },
];

function isEligible(claim: Claim, id: string): boolean {
  return claim.id === id && claim.status === 'approved' && Boolean(claim.metadata?.consumerSummary) &&
    Boolean(claim.metadata?.productApplicability);
}

export default function GabaResearchHighlights({claims, onEvent}: {claims: Claim[]; onEvent?: (name: string, properties?: Record<string, string>) => void}) {
  const available = new Map(claims.filter(claim => highlightOrder.some(item => isEligible(claim, item.id))).map(claim => [claim.id, claim]));
  const highlights = highlightOrder.filter(item => available.has(item.id));
  if (!highlights.length) return null;

  return <section id="gaba-research-highlights" className="section gaba-research-highlights" aria-labelledby="gaba-research-highlights-heading">
    <div className="wrap">
      <div className="section-head gaba-research-highlights-head">
        <div>
          <p className="chapter">사람 연구 한눈에</p>
          <h2 id="gaba-research-highlights-heading">GABA를 먹은 사람 연구에서<br />무엇이 기록됐을까요?</h2>
        </div>
        <p>잠·머리를 많이 쓴 뒤·쉬었을 때와 운동했을 때,<br />일반 GABA 연구에서 관찰한 내용을 쉽게 정리했어요.</p>
      </div>
      <p className="gaba-research-highlights-boundary"><span aria-hidden="true">i</span> 일반 GABA를 살펴본 사람 연구를 쉬운 말로 정리했어요. 아래 숫자는 각 논문에서 사용한 조건이며, 셀핀다 제품의 표시사항은 제품 카드에서 확인할 수 있어요.</p>
      <div className="gaba-research-highlights-grid">
        {highlights.map(({id, label, title, summary, facts, Icon}) => {
          const claim = available.get(id)!;
          // Older local API snapshots may not have the dedicated highlight field yet.
          // Keep the reviewed finding/consumer summary visible until the next sync.
          const result = claim.metadata?.consumerHighlight ?? claim.metadata?.consumerFinding ?? claim.publicText;
          if (!summary || !result) return null;
          return <article className="gaba-research-highlight-card" key={id}>
          <div className="gaba-research-highlight-top"><span className="gaba-research-highlight-icon"><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></span><span>{label}</span></div>
          <h3>{title}</h3>
          <p className="gaba-research-highlight-summary">{summary}</p>
          <div className="gaba-research-highlight-result"><strong>연구에서 관찰된 내용</strong><span>{result}</span></div>
          <ul className="gaba-research-highlight-facts" aria-label="연구 조건">{facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
          <a className="text-link" href={`${import.meta.env.BASE_URL}research/#${id}`} onClick={() => onEvent?.('research_highlight_opened', {researchId: id, path: '/research-highlights'})}>그림으로 한눈에 보기 <span aria-hidden="true">↗</span></a>
        </article>;
        })}
      </div>
      <div className="gaba-research-highlights-footer"><p>연구 조건과 참여자 정보를 더 보고 싶다면 전체 카드에서 확인할 수 있어요.</p><a className="button outline" href={`${import.meta.env.BASE_URL}research/`} onClick={() => onEvent?.('research_library_opened', {path: '/research-highlights'})}>전체 연구 카드 보기 <span aria-hidden="true">→</span></a></div>
    </div>
  </section>;
}
