"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PROMO } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function PromoBanner() {
  const ref = useGsapReveal<HTMLElement>({ y: 24, duration: 0.75 });

  return (
    <section ref={ref} className="section-padding section-bg-champagne">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-sm promo-banner-rich">
        <div
          className="pointer-events-none absolute inset-0 opacity-30 grain-overlay"
          aria-hidden
        />
        <div className="relative grid md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16">
            <p className="editorial-label">Limited Offer</p>
            <h2 className="mt-3 font-displayAlt text-3xl text-charcoal md:text-4xl lg:text-5xl">
              {PROMO.headline}
            </h2>
            <p className="mt-4 max-w-md font-sans leading-relaxed text-charcoalsoft">
              {PROMO.subline}
            </p>
            <Button asChild className="mt-8 w-fit" variant="default" size="lg">
              <Link href={PROMO.href}>{PROMO.cta}</Link>
            </Button>
          </div>
          <div className="relative min-h-[260px] md:min-h-full">
            <Image
              src={IMAGES.promo}
              alt="Wedding season promotion"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/30 to-transparent md:from-cream/80" />
          </div>
        </div>
      </div>
    </section>
  );
}
