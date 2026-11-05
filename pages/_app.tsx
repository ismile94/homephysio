import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/next';
import CookieConsent from '@/components/CookieConsent';
import { conversionKindForHref, trackConversion } from '@/lib/gtag';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  // Scroll-reveal hides content with CSS, so only arm it once JS is confirmed live.
  useEffect(() => {
    document.documentElement.dataset.js = 'ready';
  }, []);

  // One listener covers every call, SMS, WhatsApp and email link on every page.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!link) return;
      const kind = conversionKindForHref(link.getAttribute('href') || '');
      if (kind) trackConversion(kind);
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <CookieConsent />
      <Analytics />
    </>
  );
}
