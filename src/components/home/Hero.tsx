import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line lg:min-h-[min(100dvh,52rem)]">
      <div className="relative z-10 mx-auto grid w-full max-w-[82rem] grid-cols-1 lg:grid-cols-12 lg:min-h-[min(100dvh,52rem)]">
        <div className="flex flex-col justify-end px-6 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12 lg:col-span-6 lg:px-12 lg:pb-20 lg:pt-16 xl:px-16 xl:pb-24">
          <Reveal immediate>
            <p className="eyebrow">Second Hand · Lübeck</p>
          </Reveal>

          <h1 className="display mt-5 text-charcoal sm:mt-6">
            <span className="block overflow-hidden">
              <Reveal as="span" immediate className="block" y={24}>
                Lieblingsstücke.
              </Reveal>
            </span>
            <span className="block overflow-hidden pb-1">
              <Reveal
                as="span"
                immediate
                delay={0.08}
                className="block italic text-[0.94em] leading-[1.14] text-taupe-ink"
                y={24}
              >
                Neu entdeckt.
              </Reveal>
            </span>
          </h1>

          <Reveal immediate delay={0.16}>
            <p className="mt-6 max-w-[20rem] text-base leading-relaxed text-muted sm:mt-7 sm:max-w-[22rem] sm:text-lg">
              Indoor-Flohmarkt für besondere Dinge und dein eigenes Verkaufsregal.
            </p>
          </Reveal>

          <Reveal immediate delay={0.22}>
            <div className="mt-8 flex flex-col items-start gap-4 sm:mt-9 sm:flex-row sm:items-center sm:gap-6">
              <Button href="/regal-mieten">Regal mieten</Button>
              <ArrowLink href="/entdecken">Second Hand entdecken</ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className="hidden lg:col-span-6 lg:block" aria-hidden="true" />
      </div>

      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[50%] xl:w-[52%]">
        <RevealMedia
          src="/images/store-wall.jpg"
          alt="Wand mit sorgfältig sortierter Second-Hand-Kleidung im MiMa Store."
          priority
          immediate
          delay={0.14}
          sizes="(max-width: 1024px) 100vw, 52vw"
          className="aspect-[4/5] w-full sm:aspect-[5/4] lg:h-full lg:min-h-full lg:aspect-auto"
        />
      </div>
    </section>
  );
}
