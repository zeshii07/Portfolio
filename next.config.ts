import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel-ready: standard build output (NOT standalone).
  // `output: "standalone"` is only for self-hosting and breaks Vercel.
  typescript: {
    // Don't fail the Vercel build on TS errors
    ignoreBuildErrors: true,
  },
  // Note: Next.js 16 does not run ESLint during `next build` by default,
  // so no eslint config is needed here.
  reactStrictMode: false,
  images: {
    // Allow local images from /public. Add remote patterns here if needed later.
    remotePatterns: [],
  },
};

export default nextConfig;
