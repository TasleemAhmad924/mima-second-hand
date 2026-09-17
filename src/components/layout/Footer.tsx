import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { footerNav, legalNav } from "@/config/navigation";
import { InstagramLink } from "@/components/content/InstagramLink";
import { toTelHref } from "@/lib/format";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact, address, openingHours } = siteConfig;
  const hasStreet = address.street.length > 0;
  const telHref = contact.phone ? toTelHref(contact.phone) : null;

  return (
    <footer className="mt-auto bg-charcoal text-warm">
      <Container className="py-9 sm:py-11 lg:py-12">
        <div className="grid grid-cols-1 gap-8 border-b border-warm/12 pb-8 sm:gap-10 sm:pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" width={120} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm/65">
              Second-Hand-Laden in {siteConfig.city}. Miete dein eigenes Regal
              oder entdecke gebrauchte Lieblingsstücke vor Ort.
            </p>
            <div className="mt-4 text-warm/70">
              <InstagramLink
                label="MiMa auf Instagram"
                className="text-warm/70 hover:text-warm"
              />
            </div>
          </div>

          <nav
            className="md:col-span-4 md:col-start-7"
            aria-label="Footer-Navigation"
          >
            <h2 className="eyebrow text-taupe">Übersicht</h2>
            <ul className="mt-3.5 grid grid-cols-2 gap-x-6 gap-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-warm/70 transition-colors duration-300 hover:text-warm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-taupe">Laden &amp; Kontakt</h2>
            <div className="mt-3.5 space-y-2.5 text-sm text-warm/70">
              {hasStreet ? (
                <address className="not-italic leading-relaxed">
                  {address.street}
                  <br />
                  {address.postalCode} {address.city}
                </address>
              ) : (
                <p className="leading-relaxed">{address.city}</p>
              )}

              <div className="space-y-0.5">
                {openingHours.map((entry) => (
                  <p key={entry.days}>
                    <span className="text-warm/50">{entry.days} </span>
                    {entry.hours}
                  </p>
                ))}
              </div>

              <div className="space-y-0.5">
                <a
                  href={`mailto:${contact.email}`}
                  className="block transition-colors duration-300 hover:text-warm"
                >
                  {contact.email}
                </a>
                {telHref ? (
                  <a
                    href={telHref}
                    className="block transition-colors duration-300 hover:text-warm"
                  >
                    {contact.phone}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 pt-5 text-xs text-warm/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <nav aria-label="Rechtliches">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-300 hover:text-warm/80"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
