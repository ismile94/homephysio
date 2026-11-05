/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // The vercel.app production alias serves the same pages as the real domain;
  // without this Google can index both and split ranking between them.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'homephysio-pi.vercel.app' }],
        destination: 'https://www.physiovisit.co.uk/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
