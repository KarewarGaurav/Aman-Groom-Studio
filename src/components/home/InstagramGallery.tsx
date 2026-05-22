"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { IMAGES } from "@/lib/images";
import { BRAND } from "@/lib/constants";
import { useGsapReveal } from "@/hooks/useGsapReveal";

const aspectClasses = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-square",
];

export function InstagramGallery() {
  const gridRef = useGsapReveal<HTMLDivElement>({
    childSelector: "[data-gallery-item]",
    stagger: 0.05,
    y: 16,
  });

  return (
    <SectionWrapper
      label="Style Inspo"
      title="Shop the Look"
      subtitle="Editorial groom fashion — tap to explore"
      align="center"
      tone="sand"
    >
      <div ref={gridRef} className="columns-2 gap-3 md:columns-4 md:gap-4">
        {IMAGES.gallery.map((src, i) => (
          <Link
            key={`${src}-${i}`}
            href="/shop"
            data-gallery-item
            className="group mb-3 block break-inside-avoid overflow-hidden rounded-sm border border-sandgold/15 shadow-soft transition-all duration-300 hover:border-sandgold/30 hover:shadow-luxury md:mb-4"
          >
            <div className="relative">
              <LuxuryImage
                src={src}
                alt={`Groom fashion look ${i + 1}`}
                aspectClass={aspectClasses[i] ?? "aspect-square"}
                className="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors group-hover:bg-charcoal/25">
                <Instagram className="h-6 w-6 text-warmwhite opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href={BRAND.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoalsoft transition-colors hover:text-burgundy"
        >
          <Instagram className="h-4 w-4" />
          @amangroomstudio
        </a>
      </div>
    </SectionWrapper>
  );
}
