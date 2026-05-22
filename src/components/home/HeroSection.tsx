"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { BRAND } from "@/lib/constants";
import { useGsapHeroReveal } from "@/hooks/useGsapReveal";

export function HeroSection() {
  const ref = useGsapHeroReveal();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden hero-editorial-bg pt-24 md:pt-28"
    >
      <div
        className="hero-pattern-overlay pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-32 h-64 w-64 rounded-full bg-champagne/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-20 h-48 w-48 rounded-full bg-sandgold/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 md:px-8 lg:px-12 lg:pb-24">
        <div className="mb-8 hidden items-center gap-3 md:flex" aria-hidden>
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-sandgold/70" />
          <span className="editorial-label text-bronze/80">New Delhi · Couture</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-sandgold/70" />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-3 rounded-full border border-sandgold/25 bg-warmwhite/70 px-4 py-1.5 shadow-soft backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              <p data-hero-label className="editorial-label !tracking-[0.32em]">
                {BRAND.tagline}
              </p>
            </div>
            <h1
              data-hero-title
              className="mt-5 font-displayAlt text-5xl font-medium leading-[1.05] text-charcoal md:text-6xl lg:text-7xl"
            >
              Shop Luxury
              <br />
              <span className="text-gradient-gold">Groom Fashion</span>
            </h1>
            <p
              data-hero-sub
              className="mt-6 max-w-md border-l-2 border-sandgold/40 pl-5 font-sans text-base leading-relaxed text-charcoalsoft md:text-lg"
            >
              Discover curated sherwanis, tuxedos, and wedding ensembles —
              crafted for the modern groom.
            </p>
            <div
              data-hero-cta
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Button
                asChild
                size="lg"
                variant="default"
                className="hero-cta-btn !overflow-visible w-full sm:w-auto"
              >
                <Link href="/shop?category=sherwanis">Shop Sherwanis</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="gold"
                className="hero-cta-btn !overflow-visible w-full sm:w-auto"
              >
                <Link href="/shop">Explore Collection</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="hero-cta-btn !overflow-visible w-full sm:w-auto"
              >
                <Link href="/shop?sort=new">New Arrivals</Link>
              </Button>
            </div>
          </div>

          <div data-hero-visual className="relative order-1 md:order-2">
            <div
              className="pointer-events-none absolute -left-4 -top-4 z-0 h-24 w-24 border border-sandgold/20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-3 -right-3 z-0 h-16 w-16 border border-bronze/25"
              aria-hidden
            />
            <div className="hero-image-frame relative z-10 overflow-hidden rounded-sm">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                <Image
                  src={IMAGES.hero}
                  alt="Luxury groom fashion editorial"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-champagne/25 via-transparent to-warmwhite/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/15 via-transparent to-champagne/10" />
              </div>
            </div>
            <p
              className="pointer-events-none absolute -bottom-6 right-4 z-20 hidden font-display text-[10px] uppercase tracking-[0.4em] text-bronze/60 md:block"
              aria-hidden
            >
              Editorial · SS26
            </p>
          </div>
        </div>
      </div>

      <div
        className="gold-rule mx-auto max-w-7xl px-4 md:px-8 lg:px-12"
        aria-hidden
      />
    </section>
  );
}
