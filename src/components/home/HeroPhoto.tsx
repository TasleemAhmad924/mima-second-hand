import Image from "next/image";
import { heroImage } from "@/config/media";

/** Static hero crop of the storefront. No zoom, no drift. */
export function HeroPhoto() {
  return (
    <figure
      className="hero-photo media-crop relative overflow-hidden aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[38rem]"
      style={{
        ["--media-pos" as string]: heroImage.objectPosition,
        ["--media-pos-mobile" as string]: heroImage.mobileObjectPosition,
      }}
    >
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-warm/50 to-transparent lg:block"
      />
    </figure>
  );
}
