import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProductCard } from "@/components/content/ProductCard";
import { mockProducts } from "@/data/products";

const featured = mockProducts.slice(0, 4);

export function DiscoverPreview() {
  return (
    <Section space="lg">
      <Container>
        <Reveal>
          <h2 className="headline max-w-xl text-charcoal">
            Eine Auswahl, die sich immer wieder ändert.
          </h2>
          <div className="mt-5">
            <ArrowLink href="/entdecken">Alles entdecken</ArrowLink>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-sm text-muted">
            Online entdecken, vor Ort kaufen. Jedes Stück gibt es nur einmal.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
