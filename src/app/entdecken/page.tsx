import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/content/ProductGrid";
import { CtaBand } from "@/components/content/CtaBand";
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
        intro="Online entdecken, vor Ort kaufen. Was du hier siehst, ist ein Blick ins Sortiment – es verändert sich ständig."
      />

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
