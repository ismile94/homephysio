import type { GetServerSideProps } from 'next';
import { site } from '@/data/site';

/**
 * Generated rather than static so the hostname always tracks
 * NEXT_PUBLIC_SITE_URL — a stale sitemap pointing at the old domain after a
 * move is a silent indexing problem. Add paths here as pages are added.
 */
const paths = ['/'];

function buildSitemap(): string {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${site.url}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
