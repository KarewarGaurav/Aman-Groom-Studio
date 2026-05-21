"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { IMAGES } from "@/lib/images";
import { BRAND } from "@/lib/constants";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0!2d77.243!3d28.567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c14c0e29a7%3A0x0!2sLajpat%20Nagar%20Central%20Market!5e0!3m2!1sen!2sin!4v1";

const FEATURES = [
  {
    icon: MapPin,
    title: "Central Market, Delhi",
    desc: "E-19, BM, Lajpat Nagar-II — Delhi's premier wedding couture destination.",
  },
  {
    icon: Clock,
    title: "Open Daily",
    desc: "Mon – Sat, 11 AM – 8 PM. Sundays by appointment only.",
  },
  {
    icon: Phone,
    title: "Private Appointments",
    desc: "Reserve an exclusive time slot for a dedicated styling session.",
  },
];

export function StoreSection() {
  return (
    <section id="store" className="relative overflow-hidden">
      {/* ── Full-width editorial image header ── */}
      <div className="relative h-[55vh] min-h-[360px] w-full md:h-[65vh]">
        <LuxuryImage
          src={IMAGES.store}
          alt="Aman Groom Studio boutique showroom"
          aspectClass="h-full w-full"
          className="h-full w-full"
          priority={false}
        />
        {/* Gradient overlay so text pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />

        {/* Heading overlaid on image */}
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-12 md:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px w-8 bg-gold/60" />
                <p className="editorial-label">The Atelier</p>
              </div>
              <h2 className="editorial-title max-w-2xl text-ivory">
                Step Inside the
                <br />
                <em className="text-gradient-gold not-italic">Experience</em>
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Content below image ── */}
      <div className="relative bg-gradient-to-b from-charcoal via-wine/10 to-charcoal">
        <div className="grain-overlay absolute inset-0 opacity-25" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20 lg:px-12">

          {/* ── Description + feature cards ── */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Left — description */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
              <p className="font-display text-2xl font-light text-ivory md:text-3xl">
                Boutique Showroom,{" "}
                <span className="text-gradient-gold">Lajpat Nagar</span>
              </p>
              <p className="mt-5 leading-relaxed text-champagne/80">
                Step into our Delhi atelier — a sanctuary of premium fabrics,
                curated accessories, and private fitting lounges designed
                exclusively for the modern groom and his family. Every visit is
                a bespoke experience in itself.
              </p>

              {/* Feature rows */}
              <ul className="mt-8 space-y-5">
                {FEATURES.map((f, i) => (
                  <motion.li
                    key={f.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.1 + i * 0.1,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/25 bg-wine/30 text-gold">
                      <f.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-ivory">
                        {f.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-champagne/65">
                        {f.desc}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <Button asChild variant="gold" size="lg">
                  <Link href="/booking" className="inline-flex items-center gap-2">
                    Book Atelier Visit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="luxury" size="lg">
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <WhatsAppIcon />
                    Chat on WhatsApp
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right — map */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              {/* Address badge */}
              <div className="glass-panel flex items-start gap-3 p-5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold/80">
                    Find Us
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-champagne/80">
                    {BRAND.location}
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="relative overflow-hidden border border-gold/20">
                <iframe
                  title="Aman Groom Studio location"
                  src={MAP_EMBED}
                  className="aspect-[4/3] w-full grayscale opacity-85 transition-opacity duration-300 hover:opacity-100 hover:grayscale-0 md:aspect-video"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                {/* Subtle corner marks */}
                <span className="pointer-events-none absolute inset-0 corner-marks" aria-hidden />
              </div>

              {/* Atelier quote — replaces redundant second image strip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden border border-gold/20 bg-gradient-to-br from-wine/40 via-charcoal to-burgundy/30 px-6 py-8 md:px-8"
              >
                <span className="pointer-events-none absolute inset-0 corner-marks" aria-hidden />
                <p className="font-display text-xl font-light italic leading-relaxed text-ivory md:text-2xl">
                  &ldquo;Where every detail is deliberate.&rdquo;
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-gold/70">
                  — Aman Groom Studio, New Delhi
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
