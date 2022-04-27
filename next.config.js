/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';


module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localeDetection: true,
  },
  images: isProd
    ? {
        minimumCacheTTL: 60 * 60 * 24, // One day in seconds
      }
    : undefined,
  compress: true,
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/healthcheck',
        destination: '/api/healthcheck',
      },
      {
        source: '/sitemap',
        destination: '/api/sitemap',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/metrics',
        destination: '/api/metrics',
      }
    ];
  },
};
