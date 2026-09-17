import { googleAnalytics, googleTagBootstrap } from "@/config/analytics";

/**
 * Official gtag.js snippet, once per page, directly after CCM19 in <head>.
 *
 * One inline script only: Next.js would hoist a separate `async` src tag
 * above CCM19. Consent Mode v2 starts denied; CCM19 updates it after the
 * banner choice. The gtag.js file is injected from this script so it is
 * not duplicated via the RSC payload.
 */
export function GoogleTag() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: googleTagBootstrap(googleAnalytics.measurementId),
      }}
    />
  );
}
