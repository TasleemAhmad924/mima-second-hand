"use client";

import { useEffect, useMemo, useState } from "react";
import { catalogue } from "@/lib/pladsly";
import { productCategories } from "@/data/products";
import type { Product, ProductCategory } from "@/types";
import { ProductCard } from "@/components/content/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";

type Filter = ProductCategory | "alle";

export function ProductGrid() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("alle");

  useEffect(() => {
    let active = true;
    catalogue
      .getProducts()
      .then((result) => {
        if (active) setProducts(result);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!products) return null;
    if (filter === "alle") return products;
    return products.filter((product) => product.category === filter);
  }, [products, filter]);

  return (
    <div>
      <div
        className="-mx-1 flex gap-x-1 overflow-x-auto overscroll-x-contain pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:gap-x-6 sm:overflow-visible"
        role="group"
        aria-label="Nach Kategorie filtern"
      >
        {productCategories.map((category) => {
          const active = filter === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilter(category.id)}
              aria-pressed={active}
              className={`relative min-h-11 shrink-0 px-1 pb-1 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 [transition-timing-function:var(--ease-inout)] ${
                active ? "text-charcoal" : "text-muted hover:text-charcoal"
              }`}
            >
              {category.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-1 bottom-0 h-px origin-left bg-charcoal transition-transform duration-300 [transition-timing-function:var(--ease-inout)] ${
                  active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="border-t border-line pt-10">
        {error ? (
          <div className="py-16 text-center">
            <p className="font-display text-xl text-charcoal">
              Die Vorschau ist gerade nicht verfügbar.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Bitte versuche es in Kürze erneut. Das vollständige Sortiment
              findest du jederzeit im Online-Katalog.
            </p>
          </div>
        ) : filtered === null ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="mt-4 h-4 w-3/4" />
                <Skeleton className="mt-2 h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-xl text-charcoal">
              Hier ist gerade nichts gelistet.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Das Sortiment ändert sich ständig. Schau bald wieder vorbei – oder
              stöber in einer anderen Kategorie.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, index) => (
              <div
                key={product.id}
                className={
                  filter === "alle" && index === 0
                    ? "md:col-span-2 lg:col-span-2"
                    : ""
                }
              >
                <ProductCard
                  product={product}
                  sizes={
                    filter === "alle" && index === 0
                      ? "(max-width: 768px) 100vw, 66vw"
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
