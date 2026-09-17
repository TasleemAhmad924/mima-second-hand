import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { comfortImage } from "@/config/media";

const amenities = [
  "Spielecke",
  "Wickeltisch",
  "Sitzecke",
  "2 Umkleiden",
] as const;

export function StoreComfort() {
  return (
    <Section space="lg" tone="cream">
      <Container className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Ein Wohlfühlort</p>
            <h2 className="headline mt-4 text-charcoal">
              Entspannt stöbern. In Ruhe ankommen.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:mt-6">
              MiMa soll ein Second-Hand-Laden sein, in dem du dir Zeit nehmen
              kannst. Zum Stöbern, Anprobieren und Einräumen. Eine Spielecke und
              ein Wickeltisch, dazu eine gemütliche Sitzecke und zwei Umkleiden.
              Damit sich auch Familien bei uns wohlfühlen.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3">
              {amenities.map((item, index) => (
                <li
                  key={item}
                  className="flex items-center gap-5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-taupe-ink"
                >
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-5 bg-taupe sm:block"
                    />
                  ) : null}
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <RevealMedia
            src={comfortImage.src}
            alt={comfortImage.alt}
            objectPosition={comfortImage.objectPosition}
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]"
          />
        </div>
      </Container>
    </Section>
  );
}
