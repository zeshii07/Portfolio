import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel-ready: standard build output (NOT standalone).
  // `output: "standalone"` is only for self-hosting (Docker / bare metal)
  // and breaks Vercel deployments.
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
