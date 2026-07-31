import { Head, Html, Main, NextScript } from 'next/document';

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
        <link rel="mask-icon" href="/favicon.svg" color="#2563eb" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Playfair Display for the wordmark and headings — high stroke contrast
            reads formal and premium; Inter for UI text */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Inter:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
