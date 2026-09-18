import {useState} from 'react';
import {ANALYTICS_CONSENT_KEY, currentAnalyticsConsent, type AnalyticsConsent} from '../domain/analytics-consent';
import './AnalyticsConsent.css';

function saveConsent(value: Exclude<AnalyticsConsent, 'unknown'>) {
  try { window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value); } catch { /* private mode keeps the default off */ }
  window.dispatchEvent(new Event('cellpinda:analytics-consent-changed'));
}

export default function AnalyticsConsent({enabled}: {enabled: boolean}) {
  const [consent, setConsent] = useState<AnalyticsConsent>(currentAnalyticsConsent);
  const choose = (value: Exclude<AnalyticsConsent, 'unknown'>) => { saveConsent(value); setConsent(value); };
  if (!enabled) return <aside className="analytics-consent" aria-label="사이트 이용 통계 안내">
    <div className="analytics-consent-copy"><span className="analytics-consent-label">사이트 이용 통계</span><p>현재 공개 사이트에서는 방문 통계를 전송하지 않습니다.</p></div>
  </aside>;
  return <aside className="analytics-consent" aria-label="사이트 이용 통계 안내">
    <div className="analytics-consent-copy"><span className="analytics-consent-label">사이트 이용 통계</span><p>어떤 메뉴를 열고, 체크를 마치거나, 후기·제품 링크를 눌렀는지 익명으로 셉니다. 이름·연락처·내 답변은 수집하지 않아요.</p></div>
    {consent === 'unknown' ? <div className="analytics-consent-actions"><button type="button" onClick={() => choose('granted')}>방문 통계 보내기</button><button type="button" className="secondary" onClick={() => choose('denied')}>보내지 않기</button></div> : <details className="analytics-consent-settings"><summary>{consent === 'granted' ? '방문 통계를 보내고 있어요' : '방문 통계를 보내지 않아요'} · 설정 바꾸기</summary><p>방문 통계를 보내지 않아도 체크·연구 이야기·제품 정보는 그대로 볼 수 있어요.</p><button type="button" onClick={() => choose(consent === 'granted' ? 'denied' : 'granted')}>{consent === 'granted' ? '보내지 않기' : '방문 통계 보내기'}</button></details>}
  </aside>;
}
