import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StoreInfo } from "@/components/content/StoreInfo";
import { LocationMap } from "@/components/location/LocationMap";
import { siteConfig } from "@/config/site";

export function StoreLocation() {
  return (
    <Section space="sm" tone="cream">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-sm text-taupe-ink">{siteConfig.name}</p>
              <h2 className="headline mt-3 text-charcoal">
                Ein fester Ort in {siteConfig.city}.
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
                Second-Hand-Laden in {siteConfig.city}: komm vorbei, stöber in
                Ruhe und nimm dein Lieblingsstück gleich mit.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}>
              <StoreInfo />
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 sm:mt-12 lg:mt-14">
            <LocationMap />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
