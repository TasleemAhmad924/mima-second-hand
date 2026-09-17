import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProductCard } from "@/components/content/ProductCard";
import { mockProducts } from "@/data/products";

/** Mixed assortment: fashion, home, accessory — not a clothing boutique. */
const featuredIds = ["p-ceramics", "p-trench", "p-cups", "p-satchel"];
const featured = featuredIds
  .map((id) => mockProducts.find((product) => product.id === id))
  .filter((product): product is NonNullable<typeof product> => Boolean(product));

export function DiscoverPreview() {
  return (
    <Section space="lg">
      <Container>
        <Reveal>
          <h2 className="headline max-w-lg text-charcoal">
            Eine Auswahl, die sich immer wieder ändert.
          </h2>
          <div className="mt-4">
            <ArrowLink href="/entdecken">Alles entdecken</ArrowLink>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <Reveal
              key={product.id}
              delay={index * 0.05}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <ProductCard
                product={product}
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : undefined
                }
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-9 text-sm text-muted">
            Online entdecken, vor Ort kaufen. Jedes Stück gibt es nur einmal.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
