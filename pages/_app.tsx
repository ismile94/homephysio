import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import CookieConsent from '@/components/CookieConsent';
import { conversionKindForHref, trackConversion } from '@/lib/gtag';
import '@/styles/globals.css';

// Self-hosted and preloaded, with a metric-matched fallback so the swap does not
// reflow. The opsz axis gives headings Inter's display cut and body text its text cut.
const inter = Inter({ subsets: ['latin'], axes: ['opsz'], display: 'swap' });

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
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <CookieConsent />
      <Analytics />
    </>
  );
}
