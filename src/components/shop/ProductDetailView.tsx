"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Ruler } from "lucide-react";
import { getRecommendations } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
    <div className="pt-24 pb-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[3/4] overflow-hidden bg-wine/20">
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
                    "relative h-20 w-16 shrink-0 overflow-hidden border-2 transition-colors duration-200",
                    selectedImage === i ? "border-gold" : "border-transparent"
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

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:py-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              {product.category.replace("-", " ")}
            </p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl text-gold">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-champagne/50 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <p className="mt-6 leading-relaxed text-champagne/85">
              {product.description}
            </p>

            {product.stockCount !== undefined && (
              <p
                className={cn(
                  "mt-4 text-sm",
                  product.inStock ? "text-champagne/70" : "text-red-400/80"
                )}
              >
                {product.inStock
                  ? `Only ${product.stockCount} left in atelier`
                  : "Currently on waitlist"}
              </p>
            )}

            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-champagne/60">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSize(s.value)}
                      className={cn(
                        "min-w-[3rem] border px-4 py-2 text-sm transition-colors duration-200",
                        size === s.value
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-white/20 hover:border-gold/50"
                      )}
                    >
                      {s.value}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-champagne/60">
                  Color
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={cn(
                        "border px-4 py-2 text-sm transition-colors duration-200",
                        color === c.value
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-white/20 hover:border-gold/50"
                      )}
                    >
                      {c.value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                variant="gold"
                size="lg"
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
                  className={cn("h-5 w-5", isWishlisted && "fill-gold text-gold")}
                />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Ruler className="h-4 w-4" />
                    Size Guide
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Size Guide</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-champagne/80">
                    Measure chest at fullest point. Our stylists recommend booking
                    a fitting for bespoke accuracy. Standard sizes 38–44 correspond
                    to chest measurements in inches.
                  </p>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8 text-sm text-champagne/70">
              <p>Complimentary shipping across India on orders above ₹1,00,000</p>
              <p className="mt-2">14-day exchange on unworn ready-to-wear pieces</p>
            </div>
          </motion.div>
        </div>

        {recommendations.length > 0 && (
          <section className="mt-24 content-auto">
            <h2 className="mb-8 font-display text-3xl">You May Also Adore</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {recommendations.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="fixed bottom-20 left-0 right-0 z-30 glass-panel border-t border-gold/20 p-4 md:hidden">
        <Button
          className="w-full"
          variant="gold"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          Add to Cart — {formatPrice(product.price)}
        </Button>
      </div>
    </div>
  );
}
