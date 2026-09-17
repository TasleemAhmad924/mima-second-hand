import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { TrackedButton } from "@/components/analytics/TrackedButton";
import { AnalyticsEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mein MiMa",
  description:
    "Dein Verkäuferkonto bei MiMa: Buchungen, Regale, Produkte und Verkäufe verwaltest du sicher im Verkäuferportal unseres Partners Pladsly.",
  path: "/mein-mima",
});

const capabilities = [
  {
    title: "Buchungen und Regale",
    text: "Laufende Mietzeiträume ansehen, verlängern und neue Regale buchen.",
  },
  {
    title: "Produkte und Bestand",
    text: "Deine Stücke anlegen, auszeichnen und den Bestand im Blick behalten.",
  },
  {
    title: "Verkäufe und Auszahlungen",
    text: "Nachvollziehen, was verkauft wurde, und deine Auszahlungen verwalten.",
  },
  {
    title: "Konto und Daten",
    text: "Deine Kontodaten pflegen – sicher und an einem Ort.",
  },
];

export default function MeinMimaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Mein MiMa"
        title="Dein Verkäuferkonto."
        intro="Dein Konto, deine Buchungen, Produkte und Verkäufe verwaltest du im Verkäuferportal unseres Partners Pladsly – sicher und getrennt von dieser Website."
      />

      <Section space="md" divider={false}>
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="headline text-charcoal">
                Weiter zum Portal.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                Anmeldung, Buchungen und Zahlungen laufen sicher über Pladsly.
                Du wirst in einem neuen Tab dorthin weitergeleitet.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <TrackedButton
                  href={siteConfig.external.sellerPortalUrl}
                  event={AnalyticsEvent.MeinMimaPortalClick}
                >
                  Zum Verkäuferportal
                </TrackedButton>
                <ArrowLink href="/regal-mieten">
                  Noch kein Regal? Zum Mietmodell
                </ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <dl className="border-t border-line">
              {capabilities.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="grid grid-cols-1 gap-1.5 border-b border-line py-6 sm:grid-cols-12 sm:items-baseline sm:gap-8">
                    <dt className="font-display text-lg text-charcoal sm:col-span-5">
                      {item.title}
                    </dt>
                    <dd className="text-sm leading-relaxed text-muted sm:col-span-7">
                      {item.text}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </Container>
      </Section>
    </>
  );
}
