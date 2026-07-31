import type { GetServerSideProps } from 'next';
import { site } from '@/data/site';

/** Generated so the Sitemap line follows NEXT_PUBLIC_SITE_URL if the domain moves. */
function buildRobots(): string {
  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${site.url}/sitemap.xml
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(buildRobots());
  res.end();
  return { props: {} };
};

export default function Robots() {
  return null;
}
