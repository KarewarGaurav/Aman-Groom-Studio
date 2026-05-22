"use client";

import Link from "next/link";
import { AccountShell } from "@/components/account/AccountShell";
import { EmptyAccountState } from "@/components/account/EmptyAccountState";
import { ProductCard } from "@/components/shop/ProductCard";
import { useWishlistStore } from "@/store/wishlist-store";
import { products } from "@/data/products";

export default function AccountWishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const wishlistProducts = products.filter((p) => ids.includes(p.id));

  return (
    <AccountShell
      skeletonVariant="grid"
      title="Wishlist"
      subtitle="Pieces you've saved for your celebration."
    >
      {wishlistProducts.length === 0 ? (
        <EmptyAccountState
          title="Your wishlist is empty"
          description="Save pieces you love while browsing the collection."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <Link
        href="/wishlist"
        className="mt-8 inline-block text-xs uppercase tracking-widest text-burgundy hover:underline"
      >
        View public wishlist page →
      </Link>
    </AccountShell>
  );
}
