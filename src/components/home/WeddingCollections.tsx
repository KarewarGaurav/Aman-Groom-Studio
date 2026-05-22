"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { collections } from "@/data/collections";
import { useGsapReveal } from "@/hooks/useGsapReveal";

const COLLECTION_LINKS: Record<string, string> = {
  "royal-wedding": "/shop?category=sherwanis",
  "black-tie": "/shop?category=tuxedos",
  "fusion-couture": "/shop?category=indo-western",
  "reception-nights": "/shop?category=reception",
};

export function WeddingCollections() {
  const gridRef = useGsapReveal<HTMLDivElement>({
    childSelector: "[data-collection]",
    stagger: 0.1,
  });

  return (
    <SectionWrapper
      label="Wedding Edit"
      title="Wedding Collections"
      subtitle="Curated looks for every ceremony"
      tone="warm"
    >
      <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {collections.map((col) => (
          <Link
            key={col.id}
            href={COLLECTION_LINKS[col.id] ?? "/shop"}
            data-collection
            className="group relative overflow-hidden rounded-sm border border-sandgold/15 shadow-luxury transition-all duration-300 hover:border-sandgold/30 hover:shadow-glow-gold"
          >
            <LuxuryImage
              src={col.image}
              alt={col.title}
              aspectClass="aspect-[3/4]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-warmwhite">
              <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">
                {col.subtitle}
              </p>
              <h3 className="mt-1 font-display text-2xl">{col.title}</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100">
                Shop Now
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
