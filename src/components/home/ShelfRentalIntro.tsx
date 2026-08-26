import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PriceRows } from "@/components/content/PriceRows";
import { pricingNotes } from "@/config/pricing";

export function ShelfRentalIntro() {
  return (
    <Section space="md" tone="cream">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="headline text-charcoal">
              Ein Regal, drei Zeiträume.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:mt-6">
              Du wählst den Zeitraum, der zu dir passt. Ein Regal, keine
              Kompliziertheit. MiMa übernimmt den Verkauf im Store.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-7 space-y-3 text-sm text-charcoal sm:mt-8">
              {pricingNotes.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-px w-4 shrink-0 bg-taupe"
                  />
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
              <Button href="/regal-mieten">Regal auswählen</Button>
              <ArrowLink href="/preise">Preise ansehen</ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <PriceRows />
          <Reveal>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              {pricingNotes.disclaimer}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
