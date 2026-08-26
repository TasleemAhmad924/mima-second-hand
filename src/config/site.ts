/**
 * Central site configuration — the single source of truth for factual data.
 *
 * IMPORTANT (developer note):
 * Values marked `PLACEHOLDER` were carried over from the previous MiMa draft or
 * left blank. They must be confirmed with the client before launch. Do not
 * scatter these values across components — always import from here.
 *
 * Never place API keys, tokens or payment secrets in this file. It is bundled
 * into client-side JavaScript.
 */
import { externalServices } from "@/config/external-services";

export interface OpeningHour {
  /** German weekday label, e.g. "Dienstag – Samstag". */
  days: string;
  /** Human readable hours, e.g. "10:00 – 18:00 Uhr", or a closed note. */
  hours: string;
  closed?: boolean;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  city: string;
  url: string;
  tagline: string;
  description: string;
  contact: {
    email: string;
    /** Empty until confirmed. A tel: link only renders when set. */
    phone: string;
  };
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  openingHours: OpeningHour[];
  mapUrl: string;
  external: {
    sellerPortalUrl: string;
    bookingUrl: string;
    shopUrl: string;
  };
  social: {
    instagram: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "MiMa Second Hand",
  shortName: "MiMa",
  city: "Lübeck", // PLACEHOLDER — Standort laut Vorentwurf. Bitte bestätigen.

  /** Used for metadataBase, canonical URLs and the sitemap. */
  url: "https://www.mima-secondhand.de", // PLACEHOLDER — finale Domain bestätigen.

  tagline: "Dein Indoor-Flohmarkt für besondere Dinge.",
  description:
    "MiMa Second Hand ist ein Indoor-Flohmarkt in Lübeck: Miete dein eigenes Verkaufsregal oder entdecke gebrauchte Lieblingsstücke, die im Store auf dich warten.",

  contact: {
    email: "hallo@mima-secondhand.de", // PLACEHOLDER — aus Vorentwurf.
    phone: "", // PLACEHOLDER — Telefonnummer vom Mandanten ergänzen.
  },

  address: {
    // PLACEHOLDER — vollständige Anschrift wurde noch nicht bereitgestellt.
    street: "", // z. B. "Musterstraße 1"
    postalCode: "", // z. B. "23552"
    city: "Lübeck",
    country: "Deutschland",
  },

  /** PLACEHOLDER — Öffnungszeiten aus Vorentwurf. Bitte bestätigen. */
  openingHours: [
    { days: "Dienstag – Samstag", hours: "10:00 – 18:00 Uhr" },
    { days: "Sonntag & Montag", hours: "Ruhetag", closed: true },
  ],

  /** PLACEHOLDER — echten Kartenlink (Google Maps / OSM) einsetzen. */
  mapUrl: "https://www.openstreetmap.org/search?query=L%C3%BCbeck%20Altstadt",

  /**
   * External services. The public frontend links out to these; the real
   * integrations (accounts, bookings, payments) live entirely on the provider.
   * All values are PLACEHOLDERS until the client accounts exist.
   */
  external: {
    // Pladsly handles seller accounts, dashboard, bookings, catalogue, payouts.
    // Values come from the centralized external-service config (env-overridable,
    // public URLs only — never secrets).
    sellerPortalUrl: externalServices.pladslyPortalUrl,
    bookingUrl: externalServices.pladslyBookingUrl,
    shopUrl: externalServices.pladslyShopUrl,
  },

  /** Optional social profiles. Empty entries are simply not rendered. */
  social: {
    instagram: "", // PLACEHOLDER
  },
};
