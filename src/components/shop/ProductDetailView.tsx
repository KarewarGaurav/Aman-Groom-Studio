"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Ruler } from "lucide-react";
import { getRecommendations } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types/cms";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const addRecent = useRecentlyViewedStore((s) => s.add);

  useEffect(() => {
    addRecent(product.id);
    setSize(product.variants.sizes[0]?.value ?? "");
    setColor(product.variants.colors[0]?.value ?? "");
  }, [product, addRecent]);

  const recommendations = getRecommendations(product.id);

  const handleAddToCart = () => {
    if (!size || !color) return;
    addItem(product, size, color);
  };

  return (
    <div className="bg-ivory pb-36 pt-20 sm:pb-32 sm:pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-3 safe-x sm:px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-cream product-card-shadow">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized={product.images[selectedImage].startsWith("http")}
              />
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-20 w-16 shrink-0 overflow-hidden rounded-sm border-2 transition-colors",
                    selectedImage === i ? "border-burgundy" : "border-transparent"
                  )}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized={img.startsWith("http")}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-bronze">
              {product.category.replace("-", " ")}
            </p>
            <h1 className="mt-2 font-displayAlt text-3xl text-charcoal sm:text-4xl md:text-5xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-2xl text-charcoal sm:text-3xl">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-taupe line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <p className="mt-6 leading-relaxed text-charcoalsoft">
              {product.description}
            </p>

            {product.stockCount !== undefined && (
              <p
                className={cn(
                  "mt-4 text-sm font-medium",
                  product.inStock ? "text-bronze" : "text-burgundy"
                )}
              >
                {product.inStock
                  ? `Only ${product.stockCount} left in stock`
                  : "Join waitlist — out of stock"}
              </p>
            )}

            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-charcoalsoft">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSize(s.value)}
                      className={cn(
                        "min-w-[3rem] rounded-sm border px-4 py-2 text-sm transition-colors",
                        size === s.value
                          ? "border-charcoal bg-charcoal text-warmwhite"
                          : "border-taupe/25 bg-warmwhite hover:border-charcoal"
                      )}
                    >
                      {s.value}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-charcoalsoft">
                  Color
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={cn(
                        "rounded-sm border px-4 py-2 text-sm transition-colors",
                        color === c.value
                          ? "border-charcoal bg-charcoal text-warmwhite"
                          : "border-taupe/25 bg-warmwhite hover:border-charcoal"
                      )}
                    >
                      {c.value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
              >
                <Heart
                  className={cn("h-5 w-5", isWishlisted && "fill-burgundy text-burgundy")}
                />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Ruler className="h-4 w-4" />
                    Size Guide
                  </Button>
                </DialogTrigger>
                <DialogContent title="Size Guide" className="bg-warmwhite">
                  <p className="text-sm text-charcoalsoft">
                    Measure chest at fullest point. Sizes 38–44 correspond to chest
                    in inches. Book a fitting for bespoke accuracy.
                  </p>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-10 border-t border-taupe/15 pt-6 text-sm text-charcoalsoft">
              <p>Free shipping across India on orders above ₹1,00,000</p>
              <p className="mt-1">14-day exchange on unworn ready-to-wear</p>
            </div>
          </div>
        </div>

        {recommendations.length > 0 && (
          <section className="mt-20 content-auto">
            <h2 className="mb-8 font-display text-2xl text-charcoal sm:text-3xl">
              You May Also Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recommendations.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} quickAdd />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mobile-sticky-above-nav fixed left-0 right-0 z-30 glass-panel-solid border-t border-taupe/15 p-3 safe-x sm:p-4 md:hidden">
        <Button
          className="w-full min-w-0"
          variant="default"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          Add to Cart — {formatPrice(product.price)}
        </Button>
      </div>
    </div>
  );
}
