import type { GetServerSideProps } from 'next';
import { site } from '@/data/site';
import { serviceList } from '@/data/services';

/**
 * Date the page content last changed. Bump it when you edit copy, FAQs or
 * metadata. Deliberately not "today": a lastmod that changes on every request
 * teaches Google to ignore it, and then it stops helping recrawl scheduling.
 */
const CONTENT_UPDATED = '2026-11-09';
const PRIVACY_UPDATED = '2026-11-05';

/** Generated so new service pages appear automatically. */
const pages: { path: string; lastmod: string; priority: string; changefreq: string }[] = [
  { path: '/', lastmod: CONTENT_UPDATED, priority: '1.0', changefreq: 'monthly' },
  ...serviceList.map((service) => ({
    path: `/services/${service.slug}`,
    lastmod: CONTENT_UPDATED,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  { path: '/privacy', lastmod: PRIVACY_UPDATED, priority: '0.2', changefreq: 'yearly' },
];

function buildSitemap(): string {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${site.url}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
