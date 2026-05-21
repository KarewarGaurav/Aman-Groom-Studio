"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { IMAGES } from "@/lib/images";
import { BRAND } from "@/lib/constants";

const aspectClasses = [
  "aspect-[3/4]",   // tall — hero spot
  "aspect-square",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/3]",   // wide
  "aspect-square",
];

export function InstagramGallery() {
  return (
    <SectionWrapper
      label="@amangroomstudio"
      title="Gallery"
      subtitle="Editorial moments from our atelier and celebrations"
      align="center"
    >
      {/* Masonry-style grid */}
      <div className="columns-2 gap-3 md:columns-3 md:gap-4">
        {IMAGES.gallery.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.65,
              delay: i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group mb-3 break-inside-avoid md:mb-4"
          >
            <div className="relative overflow-hidden">
              <LuxuryImage
                src={src}
                alt={`Groom couture editorial ${i + 1}`}
                aspectClass={aspectClasses[i] ?? "aspect-square"}
                className="transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-charcoal/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-400 group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-gold" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-champagne/80">
                  View on Instagram
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Instagram CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-10 text-center"
      >
        <a
          href={BRAND.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-gold/30 px-8 py-3 text-[11px] uppercase tracking-[0.3em] text-champagne transition-colors hover:border-gold hover:text-gold"
        >
          <Instagram className="h-4 w-4" />
          Follow @amangroomstudio
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
