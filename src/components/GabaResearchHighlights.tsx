import {Activity, Dumbbell, Moon, type LucideIcon} from 'lucide-react';
import type {Claim} from './ResearchLibrary';
import {isPublicUrl} from '../domain/research-sources';
import './GabaResearchHighlights.css';

type Highlight = {
  id: string;
  label: string;
  title: string;
  summary: string;
  result: string;
  facts: string[];
  Icon: LucideIcon;
};

const highlightOrder: Highlight[] = [
  {
    id: 'research-yamatsu-2016',
    label: '잠',
    title: '잠드는 시간과 수면 기록',
    summary: '성인 10명이 GABA 100mg 캡슐과 비교 캡슐을 각각 1주 먹고, 잠드는 시간과 수면 기록을 살펴봤어요.',
    result: '잠드는 시간이 비교 캡슐을 먹은 주보다 평균 5분 짧게 기록됐어요.',
    facts: ['성인 10명', '연구용 양: 하루 100mg', '기간: 각 1주', '제품 표기 섭취량과 달라요'],
    Icon: Moon,
  },
  {
    id: 'research-yoto-2012',
    label: '생각을 많이 쓴 뒤',
    title: '과제 뒤 뇌파와 활력 점수',
    summary: '성인 63명이 GABA 100mg 캡슐 또는 비교 캡슐을 한 번 먹고, 생각을 많이 쓰는 과제 전후를 살펴봤어요.',
    result: '과제 뒤 뇌파와 활력 점수가 비교 캡슐을 먹었을 때보다 덜 떨어졌어요.',
    facts: ['성인 63명', '연구용 양: 100mg 1회', '30분 뒤 과제', '제품 표기 섭취량과 달라요'],
    Icon: Activity,
  },
  {
    id: 'research-powers-2008',
    label: '운동 뒤',
    title: '휴식·운동 뒤 혈액 속 변화',
    summary: '운동 경험이 있는 남성 11명이 GABA 캡슐 또는 설탕 캡슐을 한 번 먹고, 휴식·운동 뒤 혈액 속 성장호르몬을 살펴봤어요.',
    result: '쉬는 날 GABA 캡슐 그룹의 혈액 속 성장호르몬 최고 수치가 비교 캡슐 그룹보다 높게 기록됐어요.',
    facts: ['남성 11명', '연구용 양: 3g 1회', '제품 표기 섭취량과 달라요'],
    Icon: Dumbbell,
  },
];

function isEligible(claim: Claim, id: string): boolean {
  return claim.id === id && claim.status === 'approved' && Boolean(claim.metadata?.consumerSummary) &&
    Boolean(claim.metadata?.productApplicability) && claim.sources.some(source => isPublicUrl(source.url));
}

export default function GabaResearchHighlights({claims, onEvent}: {claims: Claim[]; onEvent?: (name: string, properties?: Record<string, string>) => void}) {
  const available = new Map(claims.filter(claim => highlightOrder.some(item => isEligible(claim, item.id))).map(claim => [claim.id, claim]));
  const highlights = highlightOrder.filter(item => available.has(item.id));
  if (!highlights.length) return null;

  return <section className="section gaba-research-highlights" aria-labelledby="gaba-research-highlights-heading">
    <div className="wrap">
      <div className="section-head gaba-research-highlights-head">
        <div>
          <p className="chapter">사람 연구 한눈에</p>
          <h2 id="gaba-research-highlights-heading">사람 연구에서 본<br />GABA 이야기를 확인해 보세요.</h2>
        </div>
        <p>잠·머리를 많이 쓴 뒤·운동 뒤,<br />일반 GABA 연구에서 관찰한 내용을 쉽게 정리했어요.</p>
      </div>
      <p className="gaba-research-highlights-boundary"><span aria-hidden="true">i</span> 사람 대상 일반 GABA 연구예요. 셀핀다 완제품을 시험한 결과와는 구분해서 봐 주세요.</p>
      <div className="gaba-research-highlights-grid">
        {highlights.map(({id, label, title, summary, result, facts, Icon}) => <article className="gaba-research-highlight-card" key={id}>
          <div className="gaba-research-highlight-top"><span className="gaba-research-highlight-icon"><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></span><span>{label}</span></div>
          <h3>{title}</h3>
          <p className="gaba-research-highlight-summary">{summary}</p>
          <div className="gaba-research-highlight-result"><strong>연구에서 관찰된 내용</strong><span>{result}</span></div>
          <ul className="gaba-research-highlight-facts" aria-label="연구 조건">{facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
          <a className="text-link" href={`${import.meta.env.BASE_URL}research/#${id}`} onClick={() => onEvent?.('research_highlight_opened', {researchId: id, path: '/research-highlights'})}>이 연구 자세히 보기 <span aria-hidden="true">↗</span></a>
        </article>)}
      </div>
      <div className="gaba-research-highlights-footer"><p>연구 조건과 참여자 정보를 더 보고 싶다면 전체 카드에서 확인할 수 있어요.</p><a className="button outline" href={`${import.meta.env.BASE_URL}research/`} onClick={() => onEvent?.('research_library_opened', {path: '/research-highlights'})}>전체 연구 카드 보기 <span aria-hidden="true">→</span></a></div>
    </div>
  </section>;
}
