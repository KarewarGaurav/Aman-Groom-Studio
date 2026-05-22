"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ensureGsapScrollTrigger } from "@/lib/gsap-init";

type RevealOptions = {
  y?: number;
  stagger?: number;
  delay?: number;
  duration?: number;
  childSelector?: string;
};

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 28,
    stagger = 0.08,
    delay = 0,
    duration = 0.7,
    childSelector,
  } = options;

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      await ensureGsapScrollTrigger();
      if (cancelled) return;

      const el = ref.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set(childSelector ? el.querySelectorAll(childSelector) : el, {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const targets = childSelector
        ? gsap.utils.toArray<HTMLElement>(el.querySelectorAll(childSelector))
        : [el];

      gsap.set(targets, { opacity: 0, y });

      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger: childSelector ? stagger : 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [y, stagger, delay, duration, childSelector]);

  return ref;
}

export function useGsapHeroReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      await ensureGsapScrollTrigger();
      if (cancelled) return;

      const root = ref.current;
      if (!root) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-hero-label]", { opacity: 0, y: 16, duration: 0.6 })
          .from(
            "[data-hero-title]",
            { opacity: 0, y: 32, duration: 0.85 },
            "-=0.35"
          )
          .from(
            "[data-hero-sub]",
            { opacity: 0, y: 20, duration: 0.6 },
            "-=0.45"
          )
          .from(
            "[data-hero-cta]",
            { opacity: 0, y: 16, duration: 0.5, stagger: 0.1 },
            "-=0.35"
          )
          .from(
            "[data-hero-visual]",
            { opacity: 0, scale: 1.03, duration: 1 },
            "-=0.9"
          );
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return ref;
}
