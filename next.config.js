const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/ALFSTORE' : '',
  assetPrefix: isProd ? '/ALFSTORE/' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;