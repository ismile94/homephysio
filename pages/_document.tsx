import { Head, Html, Main, NextScript } from 'next/document';
import { GOOGLE_ADS_ID, gtagBootstrapScript } from '@/lib/gtag';

export default function AppDocument() {
  return (
    <Html lang="en-GB">
      <Head>
        {/* Brand mark. Modern browsers take the SVG; .ico carries 16/32/48px
            rasters for everything older. Apple wants a square PNG — iOS applies
            its own corner mask, so that one is full-bleed rather than rounded. */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicon.svg" color="#0b2a5b" />

        {GOOGLE_ADS_ID && (
          <>
            <script dangerouslySetInnerHTML={{ __html: gtagBootstrapScript() }} />
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
