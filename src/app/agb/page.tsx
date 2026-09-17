import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalDocument } from "@/components/content/LegalDocument";
import { AGB_DOCUMENT } from "@/data/agb";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AGB",
  description:
    "Allgemeine Geschäftsbedingungen von MiMa Second Hand für die Regalmiete und die Verkaufsabwicklung.",
  path: "/agb",
});

export default function AgbPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rechtliches"
        title="Allgemeine Geschäftsbedingungen"
        intro="Die Vertragsbedingungen für die Regalmiete und die Verkaufsabwicklung bei MiMa Second Hand. Stand: August 2026."
      />
      <section className="py-10 sm:py-16 lg:py-20">
        <Container size="narrow">
          <LegalDocument document={AGB_DOCUMENT} />
        </Container>
      </section>
    </>
  );
}
