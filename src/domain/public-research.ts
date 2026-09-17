type ValueRecord=Record<string,unknown>;

const isRecord=(value:unknown):value is ValueRecord=>Boolean(value)&&typeof value==='object'&&!Array.isArray(value);
const isText=(value:unknown,max=240):value is string=>typeof value==='string'&&value.trim().length>0&&value.length<=max;
const isNumber=(value:unknown,max=100_000):value is number=>typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<=max;
function exactShape(value:ValueRecord,required:string[],optional:string[]=[]){
  const allowed=new Set([...required,...optional]);
  return required.every(key=>Object.hasOwn(value,key))&&Object.keys(value).every(key=>allowed.has(key));
}
function textList(value:unknown,min:number,max:number):value is string[]{
  return Array.isArray(value)&&value.length>=min&&value.length<=max&&value.every(item=>isText(item));
}

/** Copy only the reviewed visual data shapes that the public research cards can render. */
export function projectConsumerVisual(value:unknown):ValueRecord|undefined{
  if(!isRecord(value)||typeof value.kind!=='string')return undefined;
  if(value.kind==='before-after'){
    if(!exactShape(value,['kind','metric','unit','beforeLabel','beforeValue','afterLabel','afterValue','seriesLabel','scaleMax'],['beforeSd','afterSd','comparisonLabel'])||!isText(value.metric)||!isText(value.unit,24)||!isText(value.beforeLabel,60)||!isNumber(value.beforeValue,10_000)||!isText(value.afterLabel,60)||!isNumber(value.afterValue,10_000)||!isText(value.seriesLabel,180)||!isNumber(value.scaleMax,10_000)||value.scaleMax===0)return undefined;
    if(value.beforeSd!==undefined&&!isNumber(value.beforeSd,10_000)||value.afterSd!==undefined&&!isNumber(value.afterSd,10_000))return undefined;
    if(value.comparisonLabel!==undefined&&!isText(value.comparisonLabel,180))return undefined;
    return {...value};
  }
  if(value.kind==='metric-pair'){
    if(!exactShape(value,['kind','metrics','participantLabel'])||!isText(value.participantLabel,180)||!Array.isArray(value.metrics)||value.metrics.length<1||value.metrics.length>4)return undefined;
    const metrics=value.metrics.map(item=>{
      if(!isRecord(item)||!exactShape(item,['label','value','unit','comparison'])||!isText(item.label,120)||!isText(item.value,40)||!isText(item.unit,40)||!isText(item.comparison,180))return null;
      return {label:item.label,value:item.value,unit:item.unit,comparison:item.comparison};
    });
    return metrics.some(item=>item===null)?undefined:{kind:value.kind,metrics,participantLabel:value.participantLabel};
  }
  if(value.kind==='study-journey'){
    if(!exactShape(value,['kind','steps','participantLabel','comparisonLabel'],['outcomes'])||!textList(value.steps,2,8)||!isText(value.participantLabel,180)||!isText(value.comparisonLabel,180))return undefined;
    const outcomes=value.outcomes;
    if(outcomes!==undefined&&(!Array.isArray(outcomes)||outcomes.length<1||outcomes.length>4||outcomes.some(item=>!isRecord(item)||!exactShape(item,['label','result'])||!isText(item.label,80)||!isText(item.result,160))))return undefined;
    return {kind:value.kind,steps:value.steps,participantLabel:value.participantLabel,comparisonLabel:value.comparisonLabel,...(Array.isArray(outcomes)?{outcomes:outcomes.map(item=>({label:(item as ValueRecord).label,result:(item as ValueRecord).result}))}:{})};
  }
  if(value.kind==='observational-link'){
    if(!exactShape(value,['kind','leftLabel','rightLabel','participantLabel','studyLabel','boundaryLabel'])||!isText(value.leftLabel,160)||!isText(value.rightLabel,160)||!isText(value.participantLabel,180)||!isText(value.studyLabel,180)||!isText(value.boundaryLabel,120))return undefined;
    return {...value};
  }
  if(value.kind==='ratio'){
    if(!exactShape(value,['kind','metric','unit','baseline','observed','comparisonLabel','participantLabel','doseLabel'])||!isText(value.metric,160)||!isText(value.unit,24)||!isNumber(value.baseline,10_000)||value.baseline===0||!isNumber(value.observed,10_000)||!isText(value.comparisonLabel,160)||!isText(value.participantLabel,180)||!isText(value.doseLabel,180))return undefined;
    return {...value};
  }
  if(value.kind==='group-values'){
    if(!exactShape(value,['kind','metric','unit','groups','scaleMax','participantLabel','comparisonNote'])||!isText(value.metric,160)||!isText(value.unit,24)||!Array.isArray(value.groups)||value.groups.length<2||value.groups.length>4||!isNumber(value.scaleMax,100_000)||value.scaleMax===0||!isText(value.participantLabel,180)||!isText(value.comparisonNote,500))return undefined;
    const groups=value.groups.map(item=>isRecord(item)&&exactShape(item,['label','value'])&&isText(item.label,160)&&isNumber(item.value,100_000)?{label:item.label,value:item.value}:null);
    return groups.some(item=>item===null)?undefined:{kind:value.kind,metric:value.metric,unit:value.unit,groups,scaleMax:value.scaleMax,participantLabel:value.participantLabel,comparisonNote:value.comparisonNote};
  }
  return undefined;
}
