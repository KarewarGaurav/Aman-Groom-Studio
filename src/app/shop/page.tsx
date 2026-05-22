"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { products, getProductsByCategory } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "featured";

  const filtered = useMemo(() => {
    let list = getProductsByCategory(category);
    if (sort === "new") {
      list = list.filter((p) => p.isNew);
      if (list.length === 0) list = products.filter((p) => p.isNew);
    }
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
    <div className="pt-20 sm:pt-24 md:pt-28">
      <SectionWrapper
        label="Shop"
        title="All Collections"
        subtitle={`${filtered.length} pieces — luxury groom fashion`}
        tone="champagne"
      >
        <ShopFilters />

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-charcoalsoft">
            No products match this filter.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 min-[400px]:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} quickAdd />
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
          <p className="animate-pulse text-bronze">Loading shop...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
