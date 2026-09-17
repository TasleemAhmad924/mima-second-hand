/**
 * Public Google Analytics 4 measurement ID. This is not a secret.
 * Consent still goes through CCM19; the tag itself ships with Consent Mode v2
 * defaults set to denied.
 */
export const googleAnalytics = {
  measurementId: "G-7MBL4EZ18H",
} as const;

export function isGaMeasurementId(id: string): boolean {
  return /^G-[A-Z0-9]+$/.test(id);
}

/** Inline bootstrap: consent defaults first, then the official gtag config. */
export function googleTagBootstrap(measurementId: string): string {
  if (!isGaMeasurementId(measurementId)) {
    throw new Error("Ungültige Google-Analytics-Mess-ID.");
  }

  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', '${measurementId}', { anonymize_ip: true });
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src = '${googleTagSrc(measurementId)}';
  document.head.appendChild(script);
})();
`.trim();
}

export function googleTagSrc(measurementId: string): string {
  if (!isGaMeasurementId(measurementId)) {
    throw new Error("Ungültige Google-Analytics-Mess-ID.");
  }
  return `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
}
