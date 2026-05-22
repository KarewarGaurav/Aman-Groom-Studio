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
    <div className="bg-ivory pb-20 pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h1 className="font-display text-4xl text-charcoal">Wishlist</h1>
        <p className="mt-2 text-charcoalsoft">
          {wishlisted.length} {wishlisted.length === 1 ? "item" : "items"} saved
        </p>

        {wishlisted.length === 0 ? (
          <div className="mt-20 text-center">
            <p className="font-display text-xl text-charcoalsoft">
              No saved items yet
            </p>
            <Button asChild className="mt-6" variant="default">
              <Link href="/shop">Shop Collections</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlisted.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} quickAdd />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
