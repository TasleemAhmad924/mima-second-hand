import { siteConfig } from "@/config/site";
import { googleMapsPlaceUrl } from "@/config/maps";
import { toTelNumber } from "@/lib/format";

/**
 * LocalBusiness JSON-LD from the central site config.
 * Opening hours follow the confirmed Stockelsdorf schedule.
 */
export function LocalBusinessJsonLd() {
  const { name, description, url, address, contact, openingHours, owner, social } =
    siteConfig;
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    hasMap: googleMapsPlaceUrl(),
    email: contact.email,
    ...(contact.phone ? { telephone: toTelNumber(contact.phone) } : {}),
    founder: {
      "@type": "Person",
      name: owner.name,
    },
    ...(social.instagram
      ? { sameAs: [social.instagram] }
      : {}),
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
