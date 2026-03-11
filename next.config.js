/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: API routes require server runtime
  // For static export deployment (Cloudflare Pages), API routes need to be deployed separately
  // or use Next.js on Vercel for full API support
  basePath: '/qwen-landing',
  assetPrefix: '/qwen-landing/',
};

module.exports = nextConfig;
