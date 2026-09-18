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
      <picture>
        <source
          media="(max-width: 1024px)"
          srcSet={heroImage.srcMobile}
          type="image/webp"
          width={640}
          height={853}
        />
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          width={864}
          height={1152}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-warm/50 to-transparent lg:block"
      />
    </figure>
  );
}
