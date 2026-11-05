/**
 * Google Ads tag helpers. Everything is a no-op until NEXT_PUBLIC_GOOGLE_ADS_ID
 * is set, so the site ships no Google tag (and no cookie banner) by default.
 *
 * NEXT_PUBLIC_* values are inlined at build time, so each one must be read with
 * its literal name rather than through a dynamic key.
 */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';

const LABELS = {
  call: process.env.NEXT_PUBLIC_GADS_LABEL_CALL || '',
  whatsapp: process.env.NEXT_PUBLIC_GADS_LABEL_WHATSAPP || '',
  sms: process.env.NEXT_PUBLIC_GADS_LABEL_SMS || '',
  email: process.env.NEXT_PUBLIC_GADS_LABEL_EMAIL || '',
  form: process.env.NEXT_PUBLIC_GADS_LABEL_FORM || '',
};

export type ConversionKind = keyof typeof LABELS;

export const CONSENT_KEY = 'pv-consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function conversionKindForHref(href: string): ConversionKind | null {
  if (href.startsWith('tel:')) return 'call';
  if (href.startsWith('sms:')) return 'sms';
  if (href.startsWith('mailto:')) return 'email';
  if (href.includes('wa.me/') || href.includes('whatsapp.com')) return 'whatsapp';
  return null;
}

export function trackConversion(kind: ConversionKind): void {
  const label = LABELS[kind];
  if (!GOOGLE_ADS_ID || !label || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${label}` });
}

export function readConsent(): 'granted' | 'denied' | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(granted: boolean): void {
  const value = granted ? 'granted' : 'denied';
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch (error) {
    console.warn('Could not store cookie choice:', error);
  }
  window.gtag?.('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

/**
 * Runs in <head> before gtag.js loads: Consent Mode v2 defaults to "denied"
 * unless the visitor already accepted, as UK PECR requires.
 */
export function gtagBootstrapScript(): string {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c=null;try{c=localStorage.getItem('${CONSENT_KEY}');}catch(e){}
var g=c==='granted'?'granted':'denied';
gtag('consent','default',{ad_storage:g,ad_user_data:g,ad_personalization:g,analytics_storage:g,wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');`;
}
