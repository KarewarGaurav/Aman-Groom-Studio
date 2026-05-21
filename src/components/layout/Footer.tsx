"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BRAND, CATEGORIES } from "@/lib/constants";

const EXPERIENCE_LINKS = [
  { label: "Book Styling Session", href: "/booking" },
  { label: "Bespoke Tailoring", href: "/#bespoke" },
  { label: "Shop Collections", href: "/shop" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "FAQ", href: "/#faq" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-[#0e0609] to-wine/30" />
      <div className="grain-overlay absolute inset-0 opacity-30" aria-hidden />

      {/* Ambient orb */}
      <div className="orb absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 bg-burgundy/20" aria-hidden />

      {/* Top gold rule */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* ── Brand statement strip ── */}
      <div className="relative border-b border-white/8 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            {/* Logo + name */}
            <Link href="/" className="group flex items-center gap-5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo.png"
                  alt={BRAND.name}
                  width={64}
                  height={64}
                  className="h-14 w-14 md:h-16 md:w-16"
                />
              </motion.div>
              <div>
                <p className="font-display text-3xl font-light text-ivory transition-colors group-hover:text-gold">
                  {BRAND.name}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.35em] text-gold/80">
                  {BRAND.tagline}
                </p>
              </div>
            </Link>

            {/* Brand statement */}
            <p className="max-w-sm font-display text-lg font-light italic text-champagne/70 md:text-right">
              &ldquo;Crafting legacies, one silhouette at a time.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Col 1 — Contact */}
          <div>
            <p className="editorial-label mb-6">Contact Us</p>
            <ul className="space-y-4">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-champagne/70 transition-colors hover:text-ivory"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70 transition-colors group-hover:text-gold" />
                  <span className="leading-relaxed">{BRAND.location}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="group flex items-center gap-3 text-sm text-champagne/70 transition-colors hover:text-ivory"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold/70 group-hover:text-gold" />
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="group flex items-center gap-3 text-sm text-champagne/70 transition-colors hover:text-ivory"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold/70 group-hover:text-gold" />
                  {BRAND.email}
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="mt-8 flex gap-3">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-gold/25 bg-white/5 text-champagne/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center border border-gold/25 bg-white/5 text-champagne/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Collections */}
          <div>
            <p className="editorial-label mb-6">Collections</p>
            <ul className="space-y-3">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={c.href}
                    className="group flex items-center gap-2 text-sm text-champagne/65 transition-colors hover:text-ivory"
                  >
                    <span className="h-px w-0 bg-gold/60 transition-all duration-300 group-hover:w-4" />
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Experience */}
          <div>
            <p className="editorial-label mb-6">Experience</p>
            <ul className="space-y-3">
              {EXPERIENCE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 text-sm text-champagne/65 transition-colors hover:text-ivory"
                  >
                    <span className="h-px w-0 bg-gold/60 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Book CTA */}
            <Button asChild variant="luxury" size="sm" className="mt-8">
              <Link href="/booking" className="inline-flex items-center gap-2">
                Book Appointment
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <p className="editorial-label mb-6">Stay Inspired</p>
            <p className="mb-5 text-sm leading-relaxed text-champagne/65">
              Exclusive style insights, new arrivals, and wedding inspiration —
              curated for the discerning groom.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
              />
              <Button type="submit" variant="gold" className="w-full">
                Subscribe
              </Button>
            </form>

            {/* Promise badges */}
            <div className="mt-8 space-y-2">
              {[
                "Free styling consultation",
                "Complimentary first fitting",
                "Lifetime alteration guarantee",
              ].map((p) => (
                <p
                  key={p}
                  className="flex items-center gap-2 text-[11px] text-champagne/50"
                >
                  <span className="h-1 w-1 rounded-full bg-gold/60" />
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8 lg:px-12">
          <p className="text-[11px] text-champagne/40">
            © {new Date().getFullYear()}{" "}
            <span className="text-champagne/60">{BRAND.name}</span>. All rights
            reserved. Lajpat Nagar, New Delhi.
          </p>

          {/* Quick social + WhatsApp row */}
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest text-champagne/40">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <Instagram className="h-3.5 w-3.5" />
              Instagram
            </a>
            <span className="text-gold/30">·</span>
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
