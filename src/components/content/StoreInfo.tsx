import { siteConfig } from "@/config/site";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface StoreInfoProps {
  className?: string;
}

/** Renders the store's factual details from the central config. */
export function StoreInfo({ className = "" }: StoreInfoProps) {
  const { address, openingHours, contact, mapUrl, city } = siteConfig;
  const hasStreet = address.street.length > 0;
  const telHref = contact.phone
    ? `tel:${contact.phone.replace(/\s+/g, "")}`
    : null;

  return (
    <dl className={`grid gap-x-10 gap-y-7 sm:grid-cols-2 sm:gap-y-9 ${className}`}>
      <div>
        <dt className="eyebrow">Adresse</dt>
        <dd className="mt-3 text-base leading-relaxed text-charcoal">
          {hasStreet ? (
            <address className="not-italic">
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </address>
          ) : (
            <span className="not-italic">
              {city}
              <span className="mt-1 block text-sm text-muted">
                Die genaue Anschrift folgt.
              </span>
            </span>
          )}
        </dd>
      </div>

      <div>
        <dt className="eyebrow">Öffnungszeiten</dt>
        <dd className="mt-3 space-y-1 text-base text-charcoal">
          {openingHours.map((entry) => (
            <p key={entry.days}>
              <span className="text-muted">{entry.days}: </span>
              {entry.hours}
            </p>
          ))}
        </dd>
      </div>

      <div>
        <dt className="eyebrow">Kontakt</dt>
        <dd className="mt-3 space-y-1 text-base text-charcoal">
          <a
            href={`mailto:${contact.email}`}
            className="link-underline block w-fit"
          >
            {contact.email}
          </a>
          {telHref ? (
            <a href={telHref} className="link-underline block w-fit">
              {contact.phone}
            </a>
          ) : null}
        </dd>
      </div>

      <div>
        <dt className="eyebrow">Anfahrt</dt>
        <dd className="mt-3">
          <ArrowLink href={mapUrl} external>
            Auf der Karte
          </ArrowLink>
        </dd>
      </div>
    </dl>
  );
}
