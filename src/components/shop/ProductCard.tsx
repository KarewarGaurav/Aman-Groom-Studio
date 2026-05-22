"use client";

import Link from "next/link";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/cms";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  quickAdd?: boolean;
}

export function ProductCard({
  product,
  quickAdd = false,
}: ProductCardProps) {
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const addItem = useCartStore((s) => s.addItem);

  const defaultSize = product.variants.sizes[0]?.value ?? "";
  const defaultColor = product.variants.colors[0]?.value ?? "";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock || !defaultSize || !defaultColor) return;
    addItem(product, defaultSize, defaultColor);
  };

  const productActionBtn =
    "w-full min-w-0 gap-1.5 whitespace-nowrap shadow-none";

  return (
    <article className="group relative">
      <div className="product-card-luxury relative rounded-sm">
        <div className="relative">
          <Link
            href={`/shop/${product.slug}`}
            className="block overflow-hidden rounded-sm"
            tabIndex={-1}
            aria-hidden
          >
            <LuxuryImage
              src={product.images[0]}
              alt={product.name}
              aspectClass="aspect-[3/4]"
              className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </Link>

          {product.isNew && (
            <span className="pointer-events-none absolute left-3 top-3 z-20 bg-charcoal px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-warmwhite">
              New
            </span>
          )}
          {!product.inStock && (
            <span className="pointer-events-none absolute left-3 top-3 z-20 bg-cream px-2.5 py-1 text-[10px] uppercase tracking-widest text-charcoalsoft">
              Waitlist
            </span>
          )}

          {product.stockCount != null && product.stockCount <= 5 && product.inStock && (
            <span className="pointer-events-none absolute right-3 top-3 z-20 bg-champagne/90 px-2 py-0.5 text-[9px] uppercase tracking-wider text-charcoal">
              Only {product.stockCount} left
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={cn(
              "absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border bg-warmwhite/90 shadow-soft transition-all",
              isWishlisted
                ? "border-gold text-burgundy"
                : "border-taupe/20 text-charcoalsoft hover:border-gold hover:text-burgundy"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
          </button>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-20 translate-y-0 opacity-100 transition-all duration-300",
              "md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            )}
          >
            <div className="flex items-stretch gap-2 bg-gradient-to-t from-charcoal/75 via-charcoal/35 to-transparent px-3 pb-3 pt-8">
              <div className="flex min-w-0 flex-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="card"
                      className={cn(productActionBtn, "bg-warmwhite/95")}
                    >
                      <Eye className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span className="truncate">Quick View</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    title={product.name}
                    className="max-w-2xl border-taupe/20 bg-warmwhite"
                  >
                    <LuxuryImage
                      src={product.images[0]}
                      alt={product.name}
                      aspectClass="aspect-[4/3]"
                    />
                    <p className="text-charcoalsoft">{product.shortDescription}</p>
                    <p className="font-display text-2xl text-burgundy">
                      {formatPrice(product.price)}
                    </p>
                    <Button asChild variant="default" size="lg" className="w-full">
                      <Link href={`/shop/${product.slug}`}>View Full Details</Link>
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex min-w-0 flex-1">
                {quickAdd && product.inStock ? (
                  <Button
                    variant="gold"
                    size="card"
                    className={productActionBtn}
                    onClick={handleQuickAdd}
                  >
                    <ShoppingBag className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span className="truncate">Add</span>
                  </Button>
                ) : (
                  <Button
                    asChild
                    variant="gold"
                    size="card"
                    className={productActionBtn}
                  >
                    <Link
                      href={`/shop/${product.slug}`}
                      className="inline-flex w-full items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span className="truncate">View</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link href={`/shop/${product.slug}`} className="mt-5 block px-0.5">
        <p className="text-[10px] uppercase tracking-[0.28em] text-bronze">
          {product.category.replace("-", " ")}
        </p>
        <h3 className="mt-1 font-display text-lg text-charcoal transition-colors group-hover:text-burgundy md:text-xl">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="font-display text-base text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-taupe line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
