"use client";

let registered = false;
let resizeBound = false;

/** Register ScrollTrigger once; safe to call from animation hooks. */
export async function ensureGsapScrollTrigger(): Promise<void> {
  if (typeof window === "undefined" || registered) return;

  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({ markers: false });
  registered = true;

  if (!resizeBound) {
    resizeBound = true;
    window.addEventListener(
      "resize",
      () => ScrollTrigger.refresh(),
      { passive: true }
    );
  }
}