/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/qwen-landing',
  assetPrefix: '/qwen-landing/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
