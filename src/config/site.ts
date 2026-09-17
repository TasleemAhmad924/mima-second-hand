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
  /** German weekday label, e.g. "Di-Fr". */
  days: string;
  /** Human readable hours, e.g. "10:00-17:00 Uhr", or a closed note. */
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
  owner: {
    name: string;
    label: string;
  };
  contact: {
    email: string;
    /** Kept for Impressum and Datenschutz. Hidden on public contact surfaces until a business number exists. */
    phone: string;
    phonePublic: boolean;
  };
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  openingHours: OpeningHour[];
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
  city: "Stockelsdorf",

  /** Used for metadataBase, canonical URLs and the sitemap. */
  url: "https://www.mima-second-hand.de",

  tagline: "Dein Second-Hand-Laden zum Entdecken und Verkaufen.",
  description:
    "MiMa Second Hand ist ein Second-Hand-Laden in Stockelsdorf: miete ein Verkaufsregal oder entdecke gebrauchte Lieblingsstücke vor Ort.",

  owner: {
    name: "Miriam Vlot",
    label: "Inhaberin",
  },

  contact: {
    email: "info@mima-secondhand.de",
    phone: "+49 1512 2386262",
    phonePublic: false,
  },

  address: {
    street: "Segeberger Straße 8",
    postalCode: "23617",
    city: "Stockelsdorf",
    country: "Deutschland",
  },

  openingHours: [
    { days: "Di–Fr", hours: "10:00–17:00" },
    { days: "Sa", hours: "10:00–16:00" },
    { days: "Mo und So", hours: "Ruhetag", closed: true },
  ],

  /**
   * External services. The public frontend links out to these; the real
   * integrations (accounts, bookings, payments) live entirely on the provider.
   */
  external: {
    sellerPortalUrl: externalServices.pladslyPortalUrl,
    bookingUrl: externalServices.pladslyBookingUrl,
    shopUrl: externalServices.pladslyShopUrl,
  },

  social: {
    instagram: "https://www.instagram.com/mima.second.hand/",
  },
};
