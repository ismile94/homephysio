import type { GetServerSideProps } from 'next';
import { site } from '@/data/site';
import { serviceList } from '@/data/services';

/** Generated so new service pages appear automatically. */
const pages: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  ...serviceList.map((service) => ({
    path: `/services/${service.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  { path: '/privacy', priority: '0.2', changefreq: 'yearly' },
];

function buildSitemap(): string {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${site.url}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
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
