"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BRAND, CATEGORIES } from "@/lib/constants";

const SUPPORT_LINKS = [
  { label: "Shipping & Delivery", href: "/shop" },
  { label: "Size Guide", href: "/shop" },
  { label: "Returns", href: "/shop" },
  { label: "Contact", href: `mailto:${BRAND.email}` },
  { label: "Book Fitting", href: "/booking" },
];

export function Footer() {
  return (
    <footer className="border-t border-sandgold/20 bg-gradient-to-b from-cream via-champagne/30 to-ivory">
      <div className="mx-auto max-w-7xl px-3 py-12 safe-x sm:px-4 sm:py-14 md:px-8 md:pb-14 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={BRAND.name}
                width={48}
                height={48}
                className="h-11 w-11"
              />
              <div>
                <p className="font-display text-lg text-charcoal">{BRAND.name}</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-bronze">
                  {BRAND.tagline}
                </p>
              </div>
            </Link>
            <p className="mt-4 text-sm text-charcoalsoft leading-relaxed">
              Premium groom fashion — shop sherwanis, tuxedos, and wedding wear online.
            </p>
          </div>

          <div>
            <p className="editorial-label mb-4">Categories</p>
            <ul className="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={c.href}
                    className="text-sm text-charcoalsoft transition-colors hover:text-burgundy"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="editorial-label mb-4">Support</p>
            <ul className="space-y-2">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-charcoalsoft transition-colors hover:text-burgundy"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-2 text-sm text-charcoalsoft">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                {BRAND.location}
              </li>
              <li>
                <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 hover:text-burgundy">
                  <Phone className="h-4 w-4 text-bronze" />
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-burgundy">
                  <Mail className="h-4 w-4 text-bronze" />
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="editorial-label mb-4">Newsletter</p>
            <p className="mb-4 text-sm text-charcoalsoft">
              New arrivals and exclusive offers.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Email address" aria-label="Email" />
              <Button type="submit" variant="default" className="w-full">
                Subscribe
              </Button>
            </form>
            <div className="mt-6 flex gap-3">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-taupe/20 text-charcoalsoft transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-taupe/20 text-charcoalsoft transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-taupe/15 pt-6 text-center text-[11px] text-charcoalsoft md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="max-w-xs md:max-w-none">{BRAND.location}</p>
        </div>
      </div>
    </footer>
  );
}
