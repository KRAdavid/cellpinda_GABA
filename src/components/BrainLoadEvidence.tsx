import {Brain, HeartPulse, Moon, ShieldAlert, ExternalLink, type LucideIcon} from 'lucide-react';
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
    summary: 'CDC/NIOSH는 피로가 반응 시간을 늦추고 주의·집중, 단기기억, 판단에 영향을 줄 수 있다고 안내합니다.',
    finding: '운전·업무·가사처럼 실수가 안전과 연결되는 순간에는 먼저 쉬는 신호로 읽어 보세요.',
    scale: '공공기관 안전·건강 근거',
    source: 'CDC/NIOSH · Fatigue and Work',
    sourceUrl: 'https://www.cdc.gov/niosh/fatigue/about/index.html',
    Icon: ShieldAlert,
    tone: 'alert',
  },
  {
    id: 'sleep-cognition',
    number: '02',
    tag: '수면·인지',
    title: '짧은 수면은 다음 날 머리 쓰는 일을 어렵게 할 수 있어요',
    summary: '61개 연구를 모은 메타분석에서 수면 제한 뒤 전반적인 인지 처리와 실행기능, 지속적 주의, 장기기억이 낮아지는 방향이 확인됐습니다.',
    finding: '잠드는 데 오래 걸린 날이 반복되면 의지 문제로만 보지 말고 다음 날 회복 시간을 먼저 확보하세요.',
    scale: '61개 연구 · 메타분석',
    source: 'PubMed · The neurocognitive consequences of sleep restriction',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/28757454/',
    Icon: Moon,
    tone: 'sleep',
  },
  {
    id: 'stress-health',
    number: '03',
    tag: '지속 스트레스',
    title: '스트레스 부담이 오래 누적되면 몸의 조절 부담도 커질 수 있어요',
    summary: '267개 연구를 검토한 체계적 문헌고찰에서 만성 스트레스의 누적 부담은 신체·정신 건강 결과가 더 나쁜 방향과 연관됐습니다.',
    finding: '며칠 바쁜 것과 몇 달째 계속 긴장하는 것은 다릅니다. 반복되면 생활 조정과 전문가 상담을 함께 고려하세요.',
    scale: '267개 원 연구 · 체계적 문헌고찰',
    source: 'PubMed · Allostatic Load and Its Impact on Health',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/32799204/',
    Icon: HeartPulse,
    tone: 'health',
  },
  {
    id: 'mental-fatigue-brain',
    number: '04',
    tag: '정신적 피로',
    title: '정신적 피로가 쌓이면 뇌 활동 패턴이 달라질 수 있어요',
    summary: '21개 연구를 묶은 체계적 문헌고찰·메타분석에서 정신적으로 지치는 과제 뒤 EEG 활동 변화가 반복해서 관찰됐습니다.',
    finding: '짧은 반응 게임은 뇌를 촬영하는 검사가 아니라, 쉬기 전후 내 반응 변화를 살펴보는 참고 기록으로 활용하세요.',
    scale: '21개 연구 · EEG 체계적 문헌고찰·메타분석',
    source: 'PubMed · The influence of mental fatigue on brain activity',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/32108954/',
    Icon: Brain,
    tone: 'brain',
  },
];

export default function BrainLoadEvidence() {
  return (
    <section id="brain-load-evidence" className="section brain-load-evidence" aria-labelledby="brain-load-evidence-heading">
      <div className="wrap">
        <div className="section-head brain-load-evidence-head">
          <div>
            <p className="chapter">더 알아보기 · 뇌 피로와 건강</p>
            <h2 id="brain-load-evidence-heading">계속 버티면,<br />몸과 일상에 어떤 신호가 생길까요?</h2>
          </div>
          <p>‘뇌 과부하’라는 표현을 질병명처럼 단정하지 않고,<br />정신적 부담·수면·스트레스 연구에서 반복된 신호를 쉽게 보여드립니다.</p>
        </div>

        <div className="brain-load-reading-path" aria-label="근거 읽는 순서">
          <div><span>01</span><strong>무엇이 달라지나요?</strong><small>집중·반응·잠을 먼저 봅니다.</small></div>
          <div><span>02</span><strong>얼마나 확인했나요?</strong><small>연구 규모와 방법을 함께 봅니다.</small></div>
          <div><span>03</span><strong>오늘 무엇을 하나요?</strong><small>휴식과 상담 신호로 연결합니다.</small></div>
        </div>

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
              <div className="brain-load-evidence-scale"><strong>근거 규모</strong><span>{scale}</span></div>
              <p className="brain-load-evidence-finding"><strong>내 생활에서</strong>{finding}</p>
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="brain-load-evidence-source">{source} <ExternalLink size={15} aria-hidden="true" /></a>
            </article>
          ))}
        </div>
        <p className="brain-load-evidence-note">이 섹션은 뇌 피로와 건강을 이해하기 위한 일반 연구입니다. GABA 섭취 연구와 셀핀다 제품 정보는 아래 카드에서 별도로 확인하세요.</p>
      </div>
    </section>
  );
}
