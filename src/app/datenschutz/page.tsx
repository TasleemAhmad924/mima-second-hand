import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrivacyDocument } from "@/components/content/LegalDocument";
import { siteConfig } from "@/config/site";
import {
  DATENSCHUTZ_SECTIONS,
  DATENSCHUTZ_SOURCE,
} from "@/data/datenschutz";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von MiMa Second Hand. Verantwortliche: ${siteConfig.owner.name}.`,
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        intro="Welche personenbezogenen Daten wir erheben, wofür wir sie nutzen, und welche Rechte Sie haben."
      />
      <section className="py-10 sm:py-16 lg:py-20">
        <Container size="narrow">
          <PrivacyDocument
            sections={DATENSCHUTZ_SECTIONS}
            source={DATENSCHUTZ_SOURCE}
          />
        </Container>
      </section>
    </>
  );
}
