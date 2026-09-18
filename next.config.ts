import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
const isIonosStatic = process.env.IONOS_STATIC === "1";

/*
  Security header baseline.

  Kept intentionally small so it does not break Next.js, self-hosted fonts,
  local images or the motion library. Notes:
    - Fonts for the site are self-hosted by next/font. CCM19 may load its
      own assets from cloud.ccm19.de.
    - Framer Motion sets inline style attributes, so style-src allows
      'unsafe-inline'.
    - Next's runtime uses inline bootstrap scripts; without nonces we allow
      'unsafe-inline'. 'unsafe-eval' is only permitted in development.
    - Pladsly portal/shop/booking are top-level link navigations (not embedded
      subresources), so they need no CSP entry. If Pladsly content is ever
      embedded or fetched from the browser, extend connect-src/frame-src
      explicitly and re-test.
    - CCM19 Cloud is the cookie banner. It must load and fetch config from
      cloud.ccm19.de before other scripts run.
    - Google Maps Embed is framed on the public location map. frame-src must
      allow the Google embed origins.
    - Google Analytics 4 (gtag.js) loads from googletagmanager.com. Hits and
      Consent Mode pings go to Google Analytics / Tag Manager hosts. Ads
      stay off; still allow the standard GA image beacons.
    - The contact form posts from the browser to Web3Forms
      (api.web3forms.com). That origin belongs in connect-src only.
*/
const ccm19Origin = "https://cloud.ccm19.de";
const web3formsOrigin = "https://api.web3forms.com";
const googleMapsFrameSrc =
  "https://www.google.com https://maps.google.com https://www.google.de";
const googleTagScriptSrc =
  "https://www.googletagmanager.com https://www.google-analytics.com";
const googleTagImgSrc =
  "https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.google.de";
const googleTagConnectSrc =
  "https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com https://*.googletagmanager.com";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline' ${ccm19Origin} ${googleTagScriptSrc}${isProd ? "" : " 'unsafe-eval'"}`,
  `style-src 'self' 'unsafe-inline' ${ccm19Origin}`,
  `img-src 'self' data: blob: ${ccm19Origin} ${googleTagImgSrc}`,
  `font-src 'self' ${ccm19Origin}`,
  `connect-src 'self' ${ccm19Origin} ${web3formsOrigin} ${googleTagConnectSrc}`,
  `frame-src 'self' ${ccm19Origin} ${googleMapsFrameSrc}`,
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
  // IONOS Deploy Now has no Node runtime. `IONOS_STATIC=1` emits HTML into
  // `out/` (server routes are moved aside by `scripts/build-ionos.mjs`).
  // Local/Vercel builds stay a Next server so Pladsly secrets never ship.
  ...(isIonosStatic ? { output: "export" as const } : {}),
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    // Vercel can resize/convert. IONOS static export has no image optimizer.
    unoptimized: isIonosStatic,
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  ...(!isIonosStatic
    ? {
        async headers() {
          return [
            {
              source: "/sitemap.xml",
              headers: [
                {
                  key: "Content-Type",
                  value: "application/xml; charset=utf-8",
                },
                { key: "Content-Disposition", value: "inline" },
              ],
            },
            {
              source: "/:path*",
              headers: securityHeaders,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
