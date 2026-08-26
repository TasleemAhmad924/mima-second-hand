import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Accordion } from "@/components/content/Accordion";
import { faqItems } from "@/data/faq";

const previewItems = [
  faqItems.find((item) => item.question === "Wie miete ich ein Regal?"),
  faqItems.find((item) => item.question === "Muss ich selbst im Laden stehen?"),
  faqItems.find((item) => item.question === "Kann ich online kaufen?"),
].filter((item): item is (typeof faqItems)[number] => Boolean(item));

export function FaqPreview() {
  return (
    <Section space="md" divider={false}>
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="headline text-charcoal">Das Wichtigste vorab.</h2>
            <div className="mt-6 sm:mt-7">
              <ArrowLink href="/faq">Alle Fragen</ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.05}>
            <Accordion items={previewItems} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
