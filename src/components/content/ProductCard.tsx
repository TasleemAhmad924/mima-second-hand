import Image from "next/image";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  sizes?: string;
}

/**
 * Understated discovery tile: strong image, minimal metadata, no price — items
 * are discovered online and bought in the store.
 */
export function ProductCard({ product, sizes }: ProductCardProps) {
  return (
    <article className="group">
      <div className="media-zoom relative aspect-[3/4] w-full overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 22vw"}
          className="object-cover"
        />
      </div>
      <h3 className="mt-3.5 font-display text-[1.05rem] leading-snug text-charcoal sm:mt-4 sm:text-lg">
        {product.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{product.detail}</p>
    </article>
  );
}
