import {ArrowUpRight, Brain, Moon, ShieldCheck, Sparkles, type LucideIcon} from 'lucide-react';
import type {Claim, ResearchMetadata} from './ResearchLibrary';
import './GabaEvidenceHighlights.css';

type Icon = LucideIcon;

type SceneDefinition = {
  id: string;
  number: string;
  label: string;
  badge: string;
  title: string;
  fallbackSummary: string;
  icon: Icon;
  tone: string;
  hrefId?: string;
  linkLabel?: string;
  factKeys?: [keyof ResearchMetadata, string][];
  factText?: [string, string][];
};

const scenes: SceneDefinition[] = [
  {
    id: 'research-yamatsu-2016',
    number: '01',
    label: '수면',
    badge: '사람 대상 섭취 연구',
    title: '잠으로 넘어가는 시간을 살펴본 연구',
    fallbackSummary: '잠드는 시간과 깊은 수면 단계의 변화를 비교해 본 수면 연구예요.',
    icon: Moon,
    tone: 'sleep',
    factKeys: [['sampleSize', '참여'], ['dose', '조건'], ['duration', '기간']],
  },
  {
    id: 'research-yoto-2012',
    number: '02',
    label: '스트레스',
    badge: '사람 대상 섭취 연구',
    title: '정신적 과제 중 뇌파와 기분을 살펴본 연구',
    fallbackSummary: '바쁜 과제를 수행할 때 뇌파와 기분 설문을 비교해 본 연구예요.',
    icon: Brain,
    tone: 'stress',
    factKeys: [['sampleSize', '참여'], ['dose', '조건'], ['duration', '시점']],
  },
  {
    id: 'research-heba-2016',
    number: '03',
    label: '집중',
    badge: '몸속 신호 관찰',
    title: '감각 학습과 뇌 GABA 신호를 살펴본 연구',
    fallbackSummary: '뇌 속 GABA 신호와 반복 자극 뒤 감각 학습의 관계를 관찰한 연구예요.',
    icon: Sparkles,
    tone: 'focus',
    factKeys: [['sampleSize', '참여'], ['dose', '방법'], ['duration', '관찰']],
  },
  {
    id: 'gaba-definition',
    number: '04',
    label: '안정',
    badge: '몸속 역할',
    title: '신경 신호의 강도를 조절하는 GABA의 역할',
    fallbackSummary: 'GABA는 뇌에서 신경 신호의 강도를 조절하는 데 관여하는 물질로 설명돼요.',
    icon: ShieldCheck,
    tone: 'stability',
    hrefId: 'story',
    linkLabel: 'GABA 이야기에서 이어보기',
    factText: [['장면', '신경 신호'], ['자료', '생리학 설명'], ['초점', '몸속 역할']],
  },
];

function compact(value?: string): string {
  if (!value) return '자료에 표시된 조건';
  const first = value.split(';')[0].trim();
  return first.length > 46 ? `${first.slice(0, 45).trim()}…` : first;
}

function getClaim(claims: Claim[], id: string): Claim | undefined {
  return claims.find(claim => claim.id === id && claim.status === 'approved');
}

type Props = {
  claims: Claim[];
  onOpen?: (claimId: string) => void;
};

export default function GabaEvidenceHighlights({claims, onOpen}: Props) {
  const availableScenes = scenes
    .map(scene => ({scene, claim: getClaim(claims, scene.id)}))
    .filter(({claim}) => Boolean(claim));

  if (availableScenes.length === 0) return null;

  return (
    <section id="gaba-evidence" className="section wrap gaba-evidence" aria-labelledby="gaba-evidence-title">
      <div className="section-head gaba-evidence-head">
        <div>
          <p className="chapter">02 / GABA가 연구된 장면</p>
          <h2 id="gaba-evidence-title">다큐 다음,<br />네 장면으로 만나보세요.</h2>
        </div>
        <p>연구가 무엇을 물었는지부터<br />짧고 쉽게 확인해 보세요.</p>
      </div>

      <div className="gaba-evidence-grid" aria-label="GABA가 연구된 네 가지 장면">
        {availableScenes.map(({scene, claim}) => {
          const Icon = scene.icon;
          const metadata = claim!.metadata;
          const facts = scene.factText ?? (scene.factKeys ?? []).map(([key, label]) => [label, compact(metadata?.[key])] as [string, string]);
          const summary = metadata?.consumerSummary || scene.fallbackSummary;
          const sourceTitle = claim!.sources.find(source => source.url)?.title || '공개 자료';
          return (
            <article className={`gaba-evidence-card gaba-evidence-card--${scene.tone}`} key={scene.id}>
              <div className="gaba-evidence-card-top">
                <span className="gaba-evidence-number">{scene.number}</span>
                <span className="gaba-evidence-label">{scene.label}</span>
                <Icon size={21} strokeWidth={1.8} aria-hidden />
              </div>
              <span className="gaba-evidence-badge">{scene.badge}</span>
              <h3>{scene.title}</h3>
              <p className="gaba-evidence-summary">{summary}</p>
              <dl className="gaba-evidence-facts">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="gaba-evidence-source">{sourceTitle}</p>
              <a
                className="gaba-evidence-link"
                href={`#${scene.hrefId || scene.id}`}
                onClick={() => onOpen?.(scene.id)}
              >
                {scene.linkLabel || '연구 카드에서 자세히 보기'} <ArrowUpRight size={16} aria-hidden />
              </a>
            </article>
          );
        })}
      </div>
      <p className="gaba-evidence-note">카드의 수치와 결과는 각 자료의 연구 조건이며, 셀핀다 제품의 권장량이나 완제품 효과를 뜻하지 않습니다.</p>
      <a className="text-link gaba-evidence-all" href="#research" onClick={() => onOpen?.('research-library')}>
        전체 연구를 쉬운 말로 보기 <ArrowUpRight size={16} aria-hidden />
      </a>
    </section>
  );
}
