import {Activity, ArrowDown, ArrowRight, ArrowUp, Brain, Clock3, Dumbbell, Hand, Moon, Pill, ScanFace, Waves} from 'lucide-react';
import type {ConsumerVisual} from './ResearchLibrary';
import './StudyInsightVisual.css';

const numberText=(value:number)=>value.toLocaleString('ko-KR',{maximumFractionDigits:2});

function Trend({direction,label}:{direction:'down'|'up';label:string}){
  const Icon=direction==='down'?ArrowDown:ArrowUp;
  return <span className={`study-trend study-trend--${direction}`}><Icon size={17} strokeWidth={2.3} aria-hidden="true"/>{label}</span>;
}

export default function StudyInsightVisual({visual}:{visual:ConsumerVisual}){
  if(visual.kind==='paired-before-after'){
    const meanAndSpread=(value:number,sd?:number)=>`${numberText(value)}${sd===undefined?'':` ± ${numberText(sd)}`}`;
    return <figure className="study-insight study-insight--paired-before-after" aria-label={`${visual.metric}. ${visual.groups.map(group=>`${group.label}, ${group.participants}명, ${visual.beforeLabel} 평균 ${meanAndSpread(group.beforeValue,group.beforeSd)}${visual.unit}, ${visual.afterLabel} 평균 ${meanAndSpread(group.afterValue,group.afterSd)}${visual.unit}`).join('. ')}. ${visual.comparisonLabel}`}>
      <figcaption><Clock3 size={18} aria-hidden="true"/>잠들기까지 걸린 평균 시간<span>연구 조건 · {visual.comparisonLabel}</span></figcaption>
      <div className="study-paired-groups">{visual.groups.map(group=><section className="study-paired-group" key={group.label} aria-label={`${group.label}, ${group.participants}명`}>
        <h4>{group.label}<small>{group.participants}명</small></h4>
        <div className="study-paired-trajectory">
          <div><span>{visual.beforeLabel}</span><strong>{numberText(group.beforeValue)}<small>{visual.unit}</small></strong></div>
          <ArrowRight size={19} aria-hidden="true"/>
          <div><span>{visual.afterLabel}</span><strong>{numberText(group.afterValue)}<small>{visual.unit}</small></strong></div>
        </div>
        <details className="study-paired-spread">
          <summary>참여자별 기록 차이 보기</summary>
          <p>± 뒤 숫자는 사람마다 기록이 얼마나 달랐는지 보여줘요.</p>
          <ul>
            <li>{visual.beforeLabel} {meanAndSpread(group.beforeValue,group.beforeSd)} {visual.unit}</li>
            <li>{visual.afterLabel} {meanAndSpread(group.afterValue,group.afterSd)} {visual.unit}</li>
          </ul>
        </details>
      </section>)}</div>
      <small className="study-insight-footnote">각 그룹의 평균을 같은 기준으로 비교했어요. 이 연구에서 사용한 양은 제품 권장량을 뜻하지 않아요.</small>
    </figure>;
  }

  if(visual.kind==='before-after'){
    const difference=Math.abs(visual.beforeValue-visual.afterValue);
    const direction=visual.afterValue<visual.beforeValue?'down':'up';
    return <figure className="study-insight study-insight--before-after" aria-label={`${visual.seriesLabel}, ${visual.metric}: ${visual.beforeLabel} ${visual.beforeValue}${visual.unit}, ${visual.afterLabel} ${visual.afterValue}${visual.unit}`}>
      <figcaption><Clock3 size={18} aria-hidden="true"/>{visual.metric}{visual.comparisonLabel?<span>{visual.comparisonLabel}</span>:null}</figcaption>
      <div className="study-time-comparison">
        <div><span>{visual.beforeLabel}</span><strong>{numberText(visual.beforeValue)}<small>{visual.unit}</small></strong></div>
        <ArrowRight className="study-time-arrow" size={22} aria-hidden="true"/>
        <div className="study-time-comparison-after"><span>{visual.afterLabel}</span><strong>{numberText(visual.afterValue)}<small>{visual.unit}</small></strong></div>
      </div>
      <div className="study-insight-footer"><Trend direction={direction} label={`${numberText(difference)}${visual.unit} ${direction==='down'?'짧게':'길게'}`}/><small>{visual.seriesLabel} 평균</small></div>
    </figure>;
  }

  if(visual.kind==='metric-pair')return <figure className="study-insight study-insight--pair" aria-label={`${visual.participantLabel}: ${visual.metrics.map(metric=>`${metric.label} ${metric.value}${metric.unit}`).join(', ')}`}>
    <figcaption><Moon size={18} aria-hidden="true"/>잠과 관련해 기록한 변화 <span>{visual.metrics[0]?.comparison}</span></figcaption>
    <div className="study-pair-metrics">{visual.metrics.map((metric,index)=>{
      const down=/짧|감소/.test(metric.unit);
      const label=metric.unit.replace(/\s*(짧게|늘게|증가|감소|높게|낮게)/,'').trim();
      return <div key={metric.label}>
        <span>{metric.label}</span>
        <strong>{metric.value}<small>{label}</small></strong>
        <Trend direction={down?'down':'up'} label={metric.trendLabel || (down?'비교 조건보다 짧게':'비교 조건보다 길게')}/>
      </div>;
    })}</div>
    <small className="study-insight-footnote">{visual.participantLabel}</small>
  </figure>;

  if(visual.kind==='study-journey')return <figure className="study-insight study-insight--journey" aria-label={`${visual.participantLabel}. ${visual.steps.join(' 다음 ')}. ${(visual.outcomes||[]).map(item=>`${item.label} ${item.result}`).join('. ')}`}>
    <figcaption><Brain size={18} aria-hidden="true"/>{visual.participantLabel} <span>{visual.comparisonLabel}</span></figcaption>
    <ol>{visual.steps.map((step,index)=>{
      const Icon=index===0?Pill:index===1?Clock3:index===2?Activity:Waves;
      const label=step.replace(/^GABA\s*/,'').replace(/\s*1회$/,'').replace('정신 과제','과제');
      return <li key={step}><Icon size={21} strokeWidth={1.8} aria-hidden="true"/><strong>{label}</strong>{index<visual.steps.length-1?<ArrowRight size={15} className="study-journey-arrow" aria-hidden="true"/>:null}</li>;
    })}</ol>
    {visual.outcomes?.length?<div className="study-journey-outcome">{visual.outcomes.map(item=><span key={item.label}><Waves size={16} aria-hidden="true"/><b>{item.label}</b><small>{item.result}</small></span>)}</div>:null}
  </figure>;

  if(visual.kind==='observational-link')return <figure className="study-insight study-insight--observation" aria-label={`${visual.participantLabel}. ${visual.leftLabel}와 ${visual.rightLabel}를 함께 살펴봤어요`}>
    <figcaption><ScanFace size={18} aria-hidden="true"/>손끝 연습과 뇌 신호를 살펴봄 <span>{visual.participantLabel}</span></figcaption>
    <div className="study-observation-map"><div><Brain size={31} strokeWidth={1.5} aria-hidden="true"/><span>{visual.leftLabel}</span></div><span className="study-observation-link" aria-hidden="true"><i/></span><div><Hand size={31} strokeWidth={1.5} aria-hidden="true"/><span>{visual.rightLabel}</span></div></div>
    <small className="study-insight-footnote">{visual.studyLabel} · {visual.boundaryLabel}</small>
  </figure>;

  if(visual.kind==='ratio'){
    const max=Math.max(visual.observed,visual.baseline);
    return <figure className="study-insight study-insight--ratio" aria-label={`${visual.metric}: ${visual.comparisonLabel}, 비교 음료를 먹은 경우 ${visual.baseline}${visual.unit}, GABA를 먹은 경우 ${visual.observed}${visual.unit}`}>
      <figcaption><Activity size={18} aria-hidden="true"/>{visual.metric}</figcaption>
      <div className="study-ratio-hero"><strong>약 {numberText(visual.observed/visual.baseline)}<small>배</small></strong><span>{visual.comparisonLabel}</span></div>
      <div className="study-ratio-bars">{[{label:'비교 음료',value:visual.baseline},{label:'GABA를 먹은 경우',value:visual.observed}].map(item=><div key={item.label}><span>{item.label}</span><i><b style={{width:`${Math.max(item.value/max*100,5)}%`}}/></i><strong>{numberText(item.value)}×</strong></div>)}</div>
      <small className="study-insight-footnote">{visual.participantLabel} · {visual.doseLabel}</small>
    </figure>;
  }

  const max=Math.max(visual.scaleMax,...visual.groups.map(group=>group.value));
  return <figure className="study-insight study-insight--groups" aria-label={`${visual.metric}: ${visual.groups.map(group=>`${group.label} ${group.value}${visual.unit}`).join(', ')}`}>
    <figcaption><Dumbbell size={18} aria-hidden="true"/>{visual.metric}</figcaption>
    {visual.groups.map(group=><div className="study-group-row" key={group.label}>
      <span>{group.label.replace('유청단백질','단백질')}</span><i><b style={{width:`${Math.max(group.value/max*100,5)}%`}}/></i><strong>{numberText(group.value)}<small>{visual.unit}</small></strong>
    </div>)}
    <div className="study-insight-footer"><small>{visual.comparisonNote} · {visual.participantLabel}</small></div>
  </figure>;
}
