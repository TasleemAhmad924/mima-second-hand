import { siteConfig } from "@/config/site";
import { googleMapsPlaceUrl } from "@/config/maps";
import { assetUrl, siteOrigin } from "@/lib/seo";
import { toTelNumber } from "@/lib/format";

/**
 * Confirmed LocalBusiness JSON-LD. Do not add ratings, geo coordinates,
 * founding dates or a priceRange unless the client supplies them.
 */
export function buildLocalBusinessJsonLd() {
  const { name, description, address, contact, openingHours, owner, social } =
    siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url: siteOrigin(),
    logo: assetUrl("/logo-transparent.png"),
    image: [assetUrl("/images/miriam-regal.jpg"), assetUrl("/logo-transparent.png")],
    hasMap: googleMapsPlaceUrl(),
    email: contact.email,
    ...(contact.phonePublic && contact.phone
      ? { telephone: toTelNumber(contact.phone) }
      : {}),
    founder: {
      "@type": "Person",
      name: owner.name,
    },
    ...(social.instagram ? { sameAs: [social.instagram] } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressCountry: "DE",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    openingHours: openingHours
      .filter((entry) => !entry.closed)
      .map((entry) => `${entry.days} ${entry.hours}`),
  };
}
