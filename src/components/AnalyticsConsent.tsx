import {useState} from 'react';
import {ANALYTICS_CONSENT_KEY, currentAnalyticsConsent, type AnalyticsConsent} from '../domain/analytics-consent';
import './AnalyticsConsent.css';

function saveConsent(value: Exclude<AnalyticsConsent, 'unknown'>) {
  try { window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value); } catch { /* private mode keeps the default off */ }
  window.dispatchEvent(new Event('cellpinda:analytics-consent-changed'));
}

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<AnalyticsConsent>(currentAnalyticsConsent);
  const choose = (value: Exclude<AnalyticsConsent, 'unknown'>) => { saveConsent(value); setConsent(value); };
  return <aside className="analytics-consent" aria-label="익명 사용성 측정 안내">
    <div className="analytics-consent-copy"><span className="analytics-consent-label">선택형 익명 사용성 측정</span><p>체크 시작·완료, 공유·구매 링크 이동 같은 화면 흐름만 익명으로 살펴봅니다. 이름·연락처·문항별 답변은 보내지 않습니다.</p></div>
    {consent === 'unknown' ? <div className="analytics-consent-actions"><button type="button" onClick={() => choose('granted')}>측정 허용</button><button type="button" className="secondary" onClick={() => choose('denied')}>측정하지 않기</button></div> : <details className="analytics-consent-settings"><summary>{consent === 'granted' ? '현재 익명 측정 허용' : '현재 측정하지 않기'} · 설정 변경</summary><p>허용하지 않아도 리듬 체크·연구 읽기·제품 정보 확인은 그대로 이용할 수 있습니다.</p><button type="button" onClick={() => choose(consent === 'granted' ? 'denied' : 'granted')}>{consent === 'granted' ? '측정하지 않기' : '측정 허용'}</button></details>}
  </aside>;
}
