import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

/*
  Security header baseline.

  Kept intentionally small so it does not break Next.js, self-hosted fonts,
  local images or the motion library. Notes:
    - Fonts are self-hosted by next/font, so no external font-src is required.
    - Framer Motion sets inline style attributes, so style-src allows
      'unsafe-inline'.
    - Next's runtime uses inline bootstrap scripts; without nonces we allow
      'unsafe-inline'. 'unsafe-eval' is only permitted in development.
    - Pladsly portal/shop/booking are top-level link navigations (not embedded
      subresources), so they need no CSP entry. If Pladsly content is ever
      embedded or fetched from the browser, extend connect-src/frame-src
      explicitly and re-test.
*/
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // NOTE: Static export (`output: "export"`) was intentionally removed. The app
  // now runs as a standard Next.js app on Vercel so that sensitive Pladsly
  // requests can execute server-side (API routes / server modules) and secret
  // credentials never reach the browser. The public UI is unchanged.
  trailingSlash: true,
  images: {
    // Image sources are local assets today; keep optimization off to preserve
    // current behaviour. Revisit if remote (Pladsly) images are introduced.
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
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
