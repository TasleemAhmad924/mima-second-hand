"use client";

import { useEffect } from "react";

interface CcmEmbedding {
  id?: string;
  name?: string;
}

interface CcmApi {
  acceptedEmbeddings?: CcmEmbedding[];
}

interface GtagWindow {
  CCM?: CcmApi;
  gtag?: (...args: unknown[]) => void;
}

function looksLikeGoogleAnalytics(name: string): boolean {
  const value = name.toLowerCase();
  return (
    value.includes("google analytics") ||
    value.includes("google-analytics") ||
    value.includes("gtag") ||
    /\bga4\b/.test(value)
  );
}

function analyticsConsentGranted(): boolean {
  const accepted = (window as unknown as GtagWindow).CCM?.acceptedEmbeddings;
  if (!Array.isArray(accepted)) return false;
  return accepted.some((item) => looksLikeGoogleAnalytics(item.name ?? ""));
}

function syncGoogleConsent() {
  const gtag = (window as unknown as GtagWindow).gtag;
  if (typeof gtag !== "function") return;

  const granted = analyticsConsentGranted();
  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

/**
 * Keeps GA4 Consent Mode in sync with CCM19. Ads stay denied: this site has
 * no Google Ads tag. CCM19 can also push the same update when Consent Mode
 * is enabled on the Google-Analytics embedding.
 */
export function Ccm19AnalyticsConsent() {
  useEffect(() => {
    syncGoogleConsent();
    const events = ["ccm19WidgetLoaded", "ccm19WidgetClosed"] as const;
    for (const event of events) {
      window.addEventListener(event, syncGoogleConsent);
    }
    const timer = window.setInterval(syncGoogleConsent, 1500);
    const stop = window.setTimeout(() => window.clearInterval(timer), 12000);

    return () => {
      for (const event of events) {
        window.removeEventListener(event, syncGoogleConsent);
      }
      window.clearInterval(timer);
      window.clearTimeout(stop);
    };
  }, []);

  return null;
}
