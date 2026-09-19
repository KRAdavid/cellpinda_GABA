import {Brain, HeartPulse, Moon, Pause, ShieldAlert, ExternalLink, type LucideIcon} from 'lucide-react';
import './BrainLoadEvidence.css';

type EvidenceCard = {
  id: string;
  number: string;
  tag: string;
  title: string;
  summary: string;
  finding: string;
  scale: string;
  source: string;
  sourceUrl: string;
  Icon: LucideIcon;
  tone: string;
};

const evidence: EvidenceCard[] = [
  {
    id: 'fatigue-function',
    number: '01',
    tag: '일상 기능',
    title: '피로하면 반응·집중·판단이 느려질 수 있어요',
    summary: '피로하면 반응이 늦고, 집중·기억·판단이 어려워질 수 있다고 안전·건강 기관에서 안내해요.',
    finding: '운전·일·집안일 중 실수가 잦거나 집중이 끊기면 하던 일을 멈추고 쉬어 보세요.',
    scale: '안전·건강 기관 자료',
    source: 'CDC/NIOSH · Fatigue and Work',
    sourceUrl: 'https://www.cdc.gov/niosh/fatigue/about/index.html',
    Icon: ShieldAlert,
    tone: 'alert',
  },
  {
    id: 'sleep-cognition',
    number: '02',
    tag: '잠과 집중',
    title: '잠을 줄인 뒤 집중·기억·판단이 어려워질 수 있어요',
    summary: '잠을 줄인 실험 61개를 모아 보니, 기억하고 집중하고 판단하는 일이 어려워지는 경우가 많았어요.',
    finding: '잠들기 어렵거나 잠이 부족한 날이 이어지면, 다음 날 할 일 사이에 쉴 시간을 먼저 넣어 보세요.',
    scale: '61개 연구 결과를 함께 살펴봄',
    source: 'PubMed · 잠을 줄였을 때 기억과 집중에 생기는 변화',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/28757454/',
    Icon: Moon,
    tone: 'sleep',
  },
  {
    id: 'stress-health',
    number: '03',
    tag: '오래 이어지는 스트레스',
    title: '스트레스 부담이 오래 쌓이면 몸과 마음 건강을 함께 살펴야 해요',
    summary: '267개 연구에서 몸에 쌓인 부담과 건강 결과의 관계를 살펴봤어요.',
    finding: '스트레스와 피로가 오래 이어져 잠이나 일상에 영향을 주면 생활을 조정하고 전문가와 상담해 보세요.',
    scale: '267개 연구를 모아 살펴봄',
    source: 'PubMed · 오래 쌓인 스트레스와 건강',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/32799204/',
    Icon: HeartPulse,
    tone: 'health',
  },
  {
    id: 'mental-fatigue-brain',
    number: '04',
    tag: '머리를 많이 쓴 뒤',
    title: '생각을 많이 쓴 뒤 뇌의 전기 신호가 달라졌어요',
    summary: '21개 연구를 모아 보니, 머리를 많이 쓰는 과제 뒤 뇌파(뇌의 전기 신호)가 달라진 결과가 여러 번 나왔어요.',
    finding: '이 짧은 게임은 뇌파를 재는 검사가 아니에요. 쉬기 전후의 내 기록을 살펴보는 놀이예요.',
    scale: '21개 연구 결과를 함께 살펴봄',
    source: 'PubMed · 머리를 많이 쓴 뒤 관찰된 뇌파 변화',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/32108954/',
    Icon: Brain,
    tone: 'brain',
  },
  {
    id: 'rest-breaks',
    number: '05',
    tag: '짧은 휴식',
    title: '강의 중 짧게 쉰 학생들이 덜 피곤하고 기운이 났어요',
    summary: '대학생 66명이 네 가지 쉬는 방법을 해봤어요. 가볍게 움직이거나 안내에 따라 편안히 쉰 뒤 20분 후, 덜 피곤하고 기운이 난다고 답했어요.',
    finding: '일을 잠시 멈추고 가볍게 움직이거나 편안하게 호흡해 보세요. 이 연구는 대학생의 긴 강의 중 휴식을 살펴봤어요.',
    scale: '대학생 66명 · 강의 중 휴식 비교',
    source: 'PubMed Central · 대학 강의 중 휴식 방법 비교 · 2018',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6585675/',
    Icon: Pause,
    tone: 'rest',
  },
];

export default function BrainLoadEvidence() {
  return (
    <section id="brain-load-evidence" className="section brain-load-evidence" aria-labelledby="brain-load-evidence-heading">
      <div className="wrap">
        <div className="section-head brain-load-evidence-head">
          <div>
            <p className="chapter">잠·집중·휴식에 관한 연구</p>
            <h2 id="brain-load-evidence-heading">잠이 부족하면<br />집중·기억·판단이 흔들릴 수 있어요.</h2>
            <p className="brain-load-evidence-boundary">GABA 섭취 연구와 별도로, 잠·스트레스·집중을 이해하는 일반 건강 연구예요. 제품 정보는 따로 보여드려요.</p>
          </div>
          <p>잠이 부족하거나 스트레스가 오래 이어질 때를 살펴본 연구를<br />생활에서 쓰는 말로 간단히 정리했어요.</p>
        </div>

        <div className="brain-load-reading-path" aria-label="연구를 살펴보는 순서">
          <div><span>01</span><strong>무엇이 달라지나요?</strong><small>집중·반응·잠을 먼저 봐요.</small></div>
          <div><span>02</span><strong>누가 참여했나요?</strong><small>연구에 참여한 사람 수를 봐요.</small></div>
          <div><span>03</span><strong>오늘 뭘 해볼까요?</strong><small>쉴 때를 찾아봐요.</small></div>
        </div>

        <details className="brain-load-evidence-details">
          <summary><span>일반 건강 연구 5편 보기</span><small>잠·집중·스트레스·휴식</small></summary>
          <div className="brain-load-evidence-grid">
            {evidence.map(({id, number, tag, title, summary, finding, scale, source, sourceUrl, Icon, tone}) => (
              <article className={`brain-load-evidence-card brain-load-evidence-card--${tone}`} key={id}>
                <div className="brain-load-evidence-card-top">
                  <span className="brain-load-evidence-number">{number}</span>
                  <span className="brain-load-evidence-tag">{tag}</span>
                  <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p className="brain-load-evidence-summary">{summary}</p>
                <div className="brain-load-evidence-scale"><strong>연구 규모</strong><span>{scale}</span></div>
                <p className="brain-load-evidence-finding"><strong>오늘 해볼 일</strong>{finding}</p>
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="brain-load-evidence-source" aria-label={`${source} 연구 출처 보기`}>연구 출처 보기 <ExternalLink size={15} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </details>
        <p className="brain-load-evidence-note">여기에는 잠·스트레스·휴식에 관한 연구를 모았어요. GABA 연구와 셀핀다 제품 정보는 각각 따로 확인할 수 있어요.</p>
      </div>
    </section>
  );
}
