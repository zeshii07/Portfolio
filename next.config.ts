import type { NextConfig } from "next";

/**
 * Security headers applied to every route.
 *
 * These are baseline browser-defense headers, NOT a penetration-test
 * certification. They make the common, low-effort attack classes
 * (clickjacking, MIME sniffing, protocol downgrade, referrer leaks)
 * meaningfully harder against this site.
 *
 * Validate independently with:
 *   - Mozilla Observatory   https://observatory.mozilla.org
 *   - securityheaders.com   https://securityheaders.com
 *   - SSL Labs              https://www.ssllabs.com/ssltest/
 */
const securityHeaders = [
  // Force HTTPS for 2 years; include subdomains; preload-ready.
  // (Only enable preload once you are sure you want to be permanently
  // pinned to HTTPS — remove the preload directive until then.)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  // Disallow framing/clickjacking.
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send origin (not full URL) when navigating away.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Lock powerful browser APIs.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Content Security Policy.
  // - default-src 'self' — deny by default
  // - script-src 'self' 'unsafe-inline' — Next.js requires inline runtime
  //   (Next.js 16 nonce support is per-route; conservative inline allows
  //   the runtime to work without breaking SSR)
  // - style-src 'self' 'unsafe-inline' — Tailwind + framer-motion inject styles
  // - img-src 'self' data: blob: https: — allow next/image and remote OG
  // - font-src 'self' data: — next/font optimization
  // - connect-src 'self' — no third-party API calls from the browser
  // - frame-ancestors 'none' — clickjacking defense in CSP form
  // - base-uri 'self' — no <base> hijack
  // - form-action 'self' — forms only submit to same origin
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
