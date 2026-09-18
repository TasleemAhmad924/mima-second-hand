/**
 * First-party file, not an inline snippet.
 *
 * CCM19 can block inline scripts whose text contains `gtag`. Putting that
 * bootstrap in the React tree also serializes it into `self.__next_f`, so the
 * whole RSC payload was treated as a tracking script and hydration never ran.
 */
export function GoogleTag() {
  return <script src="/analytics-consent.js" />;
}
