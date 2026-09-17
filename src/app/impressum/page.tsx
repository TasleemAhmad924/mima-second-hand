import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { siteConfig } from "@/config/site";
import { impressumCopy } from "@/data/impressum";
import { toTelHref } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description: `Impressum von MiMa Second Hand. ${siteConfig.owner.label}: ${siteConfig.owner.name}, ${siteConfig.address.city}.`,
  path: "/impressum",
});

export default function ImpressumPage() {
  const { name, owner, address, contact } = siteConfig;
  const telHref = toTelHref(contact.phone);

  return (
    <>
      <PageHeader
        eyebrow="Rechtliches"
        title="Impressum"
        intro={impressumCopy.ddgLead}
      />
      <section className="py-10 sm:py-16 lg:py-20">
        <Container size="narrow">
          <article className="text-[0.975rem] leading-[1.65] text-muted sm:text-base">
            <address className="not-italic text-charcoal">
              <p className="font-display text-xl text-charcoal">{name}</p>
              <p className="mt-3">{address.street}</p>
              <p>
                {address.postalCode} {address.city}
              </p>
            </address>

            <LegalHeading>{impressumCopy.representedByLabel}</LegalHeading>
            <p className="mt-4 text-charcoal">{owner.name}</p>

            <LegalHeading>Kontakt</LegalHeading>
            <p className="mt-4 text-charcoal">
              Telefon:{" "}
              <a href={telHref} className="link-underline text-charcoal">
                {contact.phone}
              </a>
            </p>
            <p className="mt-1 text-charcoal">
              E-Mail:{" "}
              <a
                href={`mailto:${contact.email}`}
                className="link-underline text-charcoal"
              >
                {contact.email}
              </a>
            </p>

            <LegalHeading>{impressumCopy.disputeTitle}</LegalHeading>
            <p className="mt-4">{impressumCopy.dispute}</p>

            <LegalHeading>{impressumCopy.privacyTitle}</LegalHeading>
            <p className="mt-4">
              {impressumCopy.privacyBeforeLink}{" "}
              <Link href="/datenschutz" className="link-underline text-charcoal">
                {impressumCopy.privacyLinkLabel}
              </Link>.
            </p>

            <LegalHeading>{impressumCopy.disclaimerTitle}</LegalHeading>
            <LegalSubheading>{impressumCopy.contentTitle}</LegalSubheading>
            <p className="mt-4">{impressumCopy.content}</p>
            <LegalSubheading>{impressumCopy.linksTitle}</LegalSubheading>
            <p className="mt-4">{impressumCopy.links}</p>
            <LegalSubheading>{impressumCopy.copyrightTitle}</LegalSubheading>
            <p className="mt-4">{impressumCopy.copyright}</p>
          </article>
        </Container>
      </section>
    </>
  );
}

function LegalHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 font-display text-[1.35rem] leading-tight text-charcoal sm:text-[1.55rem]">
      {children}
    </h2>
  );
}

function LegalSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 font-display text-[1.15rem] text-charcoal">{children}</h3>
  );
}
