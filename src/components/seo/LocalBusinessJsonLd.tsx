import { buildLocalBusinessJsonLd } from "@/lib/local-business";

/**
 * LocalBusiness JSON-LD from the central site config.
 * Opening hours follow the confirmed Stockelsdorf schedule.
 */
export function LocalBusinessJsonLd() {
  const data = buildLocalBusinessJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
