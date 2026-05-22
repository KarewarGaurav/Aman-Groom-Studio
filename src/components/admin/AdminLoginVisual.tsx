"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IMAGES } from "@/lib/images";

export function AdminLoginVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from("[data-auth-visual]", {
        opacity: 0,
        scale: 1.03,
        duration: 1.2,
        ease: "power2.out",
      });
      gsap.from("[data-auth-caption]", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="w-full lg:flex lg:flex-1">
      <div
        data-auth-visual
        className="relative h-40 w-full shrink-0 overflow-hidden sm:h-48 lg:hidden"
        aria-hidden
      >
        <Image
          src={IMAGES.adminLogin}
          alt=""
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <p className="absolute bottom-4 left-4 font-body text-[10px] uppercase tracking-[0.35em] text-champagne">
          Studio operations
        </p>
      </div>

      <div
        className="pointer-events-none relative hidden min-h-[280px] flex-1 lg:block"
        aria-hidden={false}
      >
        <div
          data-auth-visual
          className="absolute inset-4 overflow-hidden rounded-3xl border border-champagne/40 shadow-luxury"
        >
          <Image
            src={IMAGES.adminLogin}
            alt="Aman Groom Studio atelier — luxury groom couture"
            fill
            className="object-cover object-top"
            priority
            sizes="(min-width: 1024px) 50vw, 0px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-ivory/5" />
        </div>
        <div
          data-auth-caption
          className="pointer-events-none absolute bottom-12 left-12 right-12 z-10 text-ivory"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-champagne">
            Aman Groom Studio
          </p>
          <p className="mt-2 font-display text-2xl font-light xl:text-3xl">
            Luxury operations console
          </p>
        </div>
      </div>
    </div>
  );
}
