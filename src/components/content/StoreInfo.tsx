import { siteConfig } from "@/config/site";
import { InstagramLink } from "@/components/content/InstagramLink";
import { toTelHref } from "@/lib/format";

interface StoreInfoProps {
  className?: string;
}

/** Renders the store's factual details from the central config. */
export function StoreInfo({ className = "" }: StoreInfoProps) {
  const { address, openingHours, contact, city } = siteConfig;
  const hasStreet = address.street.length > 0;
  const telHref =
    contact.phonePublic && contact.phone
      ? toTelHref(contact.phone)
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
            className="link-underline block w-fit max-w-full break-words"
          >
            {contact.email}
          </a>
          {telHref ? (
            <a href={telHref} className="link-underline block w-fit">
              {contact.phone}
            </a>
          ) : null}
          <InstagramLink
            label="MiMa auf Instagram"
            className="mt-2 text-charcoal"
          />
        </dd>
      </div>
    </dl>
  );
}
