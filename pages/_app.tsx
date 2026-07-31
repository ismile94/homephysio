import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  // Scroll-reveal hides content with CSS, so only arm it once JS is confirmed live.
  useEffect(() => {
    document.documentElement.dataset.js = 'ready';
  }, []);

  return <Component {...pageProps} />;
}
