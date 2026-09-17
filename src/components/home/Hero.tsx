import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BookingCta } from "@/components/booking/BookingCta";
import { HeroPhoto } from "@/components/home/HeroPhoto";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid w-full max-w-[82rem] grid-cols-1 lg:min-h-[min(38rem,calc(100dvh-4.5rem))] lg:grid-cols-12">
        <div className="order-2 flex min-w-0 flex-col justify-center px-6 pb-9 pt-7 sm:px-8 sm:pb-12 sm:pt-9 lg:order-1 lg:col-span-6 lg:px-10 lg:py-14 xl:col-span-5 xl:px-14">
          <Reveal immediate>
            <p className="eyebrow">Second-Hand-Laden · Stockelsdorf</p>
          </Reveal>

          <h1 className="display mt-4 text-[clamp(2.05rem,0.92rem+4.15vw,3.85rem)] text-charcoal sm:mt-5">
            <span className="block overflow-hidden">
              <Reveal as="span" immediate className="block pr-[0.06em]" y={20}>
                Lieblingsstücke.
              </Reveal>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <Reveal
                as="span"
                immediate
                delay={0.08}
                className="block pr-[0.06em] italic text-[0.94em] leading-[1.14] text-taupe-ink"
                y={20}
              >
                Neu entdeckt.
              </Reveal>
            </span>
          </h1>

          <Reveal immediate delay={0.16}>
            <p className="mt-5 max-w-[21rem] text-[0.98rem] leading-relaxed text-muted sm:mt-6 sm:text-lg">
              Second-Hand-Laden für besondere Dinge und dein eigenes Verkaufsregal.
            </p>
          </Reveal>

          <Reveal immediate delay={0.22}>
            <div className="mt-7 flex w-full flex-col items-stretch gap-3.5 sm:mt-8 sm:flex-row sm:items-start sm:gap-6">
              <BookingCta className="w-full sm:w-auto" />
              <ArrowLink href="/entdecken" className="sm:mt-3">
                Second Hand entdecken
              </ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:h-full xl:col-span-7">
          <HeroPhoto />
        </div>
      </div>
    </section>
  );
}
