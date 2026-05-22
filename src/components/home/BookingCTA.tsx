"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

export function BookingCTA() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-36">
      {/* Deep background */}
      <div className="absolute inset-0 bg-gradient-to-br from-wine via-charcoal to-burgundy/80" />
      <div className="grain-overlay absolute inset-0 opacity-60" aria-hidden />

      {/* Animated orbs */}
      <motion.div
        className="absolute -left-24 top-1/2 h-96 w-96 orb bg-gold/15"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-24 top-1/4 h-80 w-80 orb bg-burgundy/40"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
      />
      <motion.div
        className="absolute left-1/2 bottom-0 h-64 w-64 orb bg-wine/50"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, delay: 3 }}
      />

      {/* Decorative corner frame */}
      <div className="pointer-events-none absolute inset-8 corner-marks md:inset-12" aria-hidden />

      {/* Horizontal gold rules */}
      <div className="pointer-events-none absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

      {/* Content */}
      <div className="relative mx-auto max-w-3xl px-3 text-center safe-x sm:px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold/50" />
            <p className="editorial-label">Private Styling</p>
            <span className="h-px w-10 bg-gold/50" />
          </div>

          <h2 className="font-display text-3xl font-light leading-[1.05] text-ivory sm:text-4xl md:text-6xl lg:text-7xl">
            Reserve Your
            <br />
            <em className="text-gradient-gold not-italic">Consultation</em>
          </h2>

          <p className="mx-auto mt-6 max-w-md font-body text-champagne/80 md:text-lg">
            An intimate appointment with our style director — where your wedding
            vision becomes couture reality.
          </p>

          {/* Stats row */}
          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-4 border-y border-gold/20 py-6 sm:mt-10 sm:flex-row sm:justify-around sm:gap-0">
            {[
              ["By Appointment", "Exclusive Access"],
              ["Same Week", "Slots Available"],
            ].map(([v, l]) => (
              <div key={v} className="text-center">
                <p className="font-display text-xl text-gold">{v}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-champagne/50">{l}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button asChild size="lg" variant="gold" className="w-full sm:w-auto">
              <Link href="/booking" className="inline-flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="luxury" className="w-full sm:w-auto">
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                <WhatsAppIcon />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
