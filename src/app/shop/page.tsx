"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { getProductsByCategory } from "@/data/products";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "featured";

  const filtered = useMemo(() => {
    let list = getProductsByCategory(category);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "featured") {
      list = [...list].sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      );
    }
    return list;
  }, [category, sort]);

  return (
    <div className="pt-28">
      <SectionWrapper
        label="Shop"
        title="Luxury Collections"
        subtitle={`${filtered.length} curated pieces`}
      >
        <div className="mb-10 flex flex-wrap gap-2">
          <Link
            href="/shop"
            className={cn(
              "px-4 py-2 text-xs uppercase tracking-widest transition-colors",
              !category
                ? "bg-gold text-charcoal"
                : "glass-panel text-champagne hover:text-ivory"
            )}
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={cn(
                "px-4 py-2 text-xs uppercase tracking-widest transition-colors",
                category === cat.id
                  ? "bg-gold text-charcoal"
                  : "glass-panel text-champagne hover:text-ivory"
              )}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-champagne/60">
            No products in this category yet.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center pt-28">
          <p className="animate-pulse text-gold">Loading collections...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
