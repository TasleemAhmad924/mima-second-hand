import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/content/ProductGrid";
import { CtaBand } from "@/components/content/CtaBand";
import { TrackedButton } from "@/components/analytics/TrackedButton";
import { AnalyticsEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Entdecken",
  description:
    "Stöbere durch eine wechselnde Auswahl an Second-Hand-Stücken – Mode, Accessoires und Dinge fürs Zuhause. Online entdecken, im Store kaufen.",
  path: "/entdecken",
});

export default function EntdeckenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Second Hand entdecken"
        title="Eine Auswahl, die lebt."
        intro="Was du hier siehst, ist eine kuratierte Vorschau des Sortiments. Das vollständige, tagesaktuelle Angebot findest du in unserem Online-Shop – online stöbern, vor Ort kaufen."
      />

      <Section space="sm" divider={false}>
        <Container>
          <Reveal>
            <div className="flex flex-col gap-5 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-base leading-relaxed text-muted">
                Der komplette Shop mit allen aktuellen Stücken wird von unserem
                Partner Pladsly bereitgestellt. Dort kannst du das gesamte
                Sortiment durchsuchen.
              </p>
              <TrackedButton
                href={siteConfig.external.shopUrl}
                event={AnalyticsEvent.EntdeckenShopClick}
                variant="secondary"
                className="shrink-0"
              >
                Zum MiMa Shop
              </TrackedButton>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section space="sm">
        <Container>
          <ProductGrid />
        </Container>
      </Section>

      <CtaBand
        title="Lieber selbst verkaufen?"
        text="Miete dein eigenes Regal und bring deine Lieblingsstücke ins Sortiment."
        primary={{ label: "Regal mieten", href: "/regal-mieten" }}
        secondary={{ label: "Zum Store", href: "/kontakt" }}
      />
    </>
  );
}
