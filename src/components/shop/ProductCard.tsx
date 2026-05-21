"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye, ArrowRight } from "lucide-react";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/cms";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      {/* ── Image wrapper ── */}
      <div className="relative overflow-hidden border border-white/5 transition-colors duration-500 group-hover:border-gold/25">

        {/* Image is its own link — no other <a> inside */}
        <Link href={`/shop/${product.slug}`} className="block" tabIndex={-1} aria-hidden>
          <LuxuryImage
            src={product.images[0]}
            alt={product.name}
            aspectClass="aspect-[3/4]"
            className="transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Badges */}
        {product.isNew && (
          <span className="pointer-events-none absolute left-0 top-0 z-20 bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal">
            New
          </span>
        )}
        {!product.inStock && (
          <span className="pointer-events-none absolute left-0 top-0 z-20 glass-panel px-3 py-1 text-[10px] uppercase tracking-widest">
            Waitlist
          </span>
        )}

        {/* ── Hover CTA bar — sibling of the image link, NOT inside it ── */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 flex translate-y-full gap-2 p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          /* on mobile always visible */
          style={{ WebkitTransform: undefined }}
        >
          {/* Quick View modal — Dialog trigger is a button, no anchor */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="mr-1 h-3.5 w-3.5" />
                Quick View
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl border-gold/20">
              <DialogHeader>
                <DialogTitle>{product.name}</DialogTitle>
              </DialogHeader>
              <LuxuryImage
                src={product.images[0]}
                alt={product.name}
                aspectClass="aspect-[4/3]"
              />
              <p className="text-champagne/80">{product.shortDescription}</p>
              <p className="font-display text-2xl text-gold">
                {formatPrice(product.price)}
              </p>
              {/* Link inside modal is fine — it's not inside another <a> */}
              <Button asChild variant="gold" size="lg" className="w-full">
                <Link href={`/shop/${product.slug}`}>View Full Details</Link>
              </Button>
            </DialogContent>
          </Dialog>

          {/* View Piece — standalone link, NOT nested inside any other <a> */}
          <Button asChild variant="gold" size="sm" className="flex-1">
            <Link href={`/shop/${product.slug}`}>
              View Piece
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
            isWishlisted
              ? "border-gold bg-gold/20 text-gold"
              : "border-white/20 bg-charcoal/70 text-champagne backdrop-blur-md hover:border-gold hover:text-gold"
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
        </button>
      </div>

      {/* ── Text info — its own independent link ── */}
      <Link href={`/shop/${product.slug}`} className="mt-5 block">
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold/70">
          {product.category.replace("-", " ")}
        </p>
        <h3 className="mt-2 font-display text-xl text-ivory transition-colors duration-300 group-hover:text-gold">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="font-display text-lg text-gold">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-champagne/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
