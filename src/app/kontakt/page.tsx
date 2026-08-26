import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { StoreInfo } from "@/components/content/StoreInfo";
import { ContactForm } from "@/components/content/ContactForm";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description: `MiMa Second Hand in ${siteConfig.city}: Adresse, Öffnungszeiten und Kontakt. Schreib uns eine Nachricht oder komm im Store vorbei.`,
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Komm vorbei oder schreib uns."
        intro="Alles Wichtige zum Store auf einen Blick – und ein direkter Draht zu uns."
      />

      <Section space="md" divider={false}>
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="headline text-charcoal">Der Store</h2>
              <div className="mt-8">
                <StoreInfo />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.05}>
              <h2 className="headline text-charcoal">Nachricht senden</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
