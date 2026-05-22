"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { CATEGORIES } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function FeaturedCategories() {
  const gridRef = useGsapReveal<HTMLDivElement>({
    childSelector: "[data-category-card]",
    stagger: 0.07,
    y: 24,
  });

  return (
    <SectionWrapper
      label="Shop by Category"
      title="Featured Categories"
      subtitle="Browse our signature groom collections"
      tone="champagne"
    >
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6"
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            data-category-card
            className="category-card-luxury group overflow-hidden rounded-sm"
          >
            <div className="relative overflow-hidden">
              <LuxuryImage
                src={IMAGES.categories[cat.imageKey]}
                alt={cat.label}
                aspectClass="aspect-[4/5]"
                className="transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-champagne/10 opacity-80 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="flex items-center justify-between border-t border-sandgold/15 bg-gradient-to-r from-warmwhite/90 to-champagne/20 px-4 py-4">
              <h3 className="font-display text-lg text-charcoal transition-colors group-hover:text-burgundy md:text-xl">
                {cat.label}
              </h3>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-sandgold/25 bg-warmwhite/80 transition-all group-hover:border-gold/40 group-hover:bg-champagne/40">
                <ArrowRight className="h-4 w-4 text-bronze transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
