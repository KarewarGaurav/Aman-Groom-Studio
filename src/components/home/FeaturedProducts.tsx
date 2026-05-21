"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <SectionWrapper
      label="The Edit"
      title="Featured Pieces"
      subtitle="Handpicked ensembles for the discerning groom"
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      <div className="mt-14 text-center">
        <Button asChild variant="luxury" size="lg">
          <Link href="/shop">View All Collections</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
