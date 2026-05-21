"use client";

import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useWishlistStore } from "@/store/wishlist-store";

export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const wishlisted = products.filter((p) => ids.includes(p.id));

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h1 className="font-display text-4xl">Saved Pieces</h1>
        <p className="mt-2 text-champagne/70">
          {wishlisted.length} {wishlisted.length === 1 ? "piece" : "pieces"} in
          your wishlist
        </p>

        {wishlisted.length === 0 ? (
          <div className="mt-20 text-center">
            <p className="font-display text-xl text-champagne/60">
              No saved pieces yet
            </p>
            <Button asChild className="mt-6" variant="gold">
              <Link href="/shop">Discover Collections</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {wishlisted.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
