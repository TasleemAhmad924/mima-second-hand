import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { toTelHref } from "@/lib/format";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz",
  description: `Datenschutzhinweise von MiMa Second Hand. Verantwortliche: ${siteConfig.owner.name}.`,
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  const { name, owner, address, contact } = siteConfig;

  return (
    <>
      <PageHeader
        eyebrow="Rechtliches"
        title="Datenschutz"
        intro="Wer für die Datenverarbeitung verantwortlich ist, und wie du uns erreichst."
      />
      <section className="py-10 sm:py-16 lg:py-20">
        <Container size="narrow">
          <article className="text-[0.975rem] leading-[1.65] text-muted sm:text-base">
            <h2 className="font-display text-[1.35rem] leading-tight text-charcoal sm:text-[1.55rem]">
              Verantwortliche
            </h2>
            <address className="mt-4 not-italic text-charcoal">
              <p>
                {owner.name}
                <br />
                {name}
                <br />
                {address.street}
                <br />
                {address.postalCode} {address.city}
              </p>
              <p className="mt-3">
                E-Mail:{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="link-underline text-charcoal"
                >
                  {contact.email}
                </a>
              </p>
              {contact.phone ? (
                <p className="mt-1">
                  Telefon:{" "}
                  <a
                    href={toTelHref(contact.phone)}
                    className="link-underline text-charcoal"
                  >
                    {contact.phone}
                  </a>
                </p>
              ) : null}
            </address>
            <p className="mt-8">
              Die ausführliche Datenschutzerklärung wird derzeit vorbereitet und
              in Kürze ergänzt. Bis dahin erreichst du uns bei Fragen zum
              Datenschutz unter der angegebenen E-Mail-Adresse.
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
