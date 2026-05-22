"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { collections } from "@/data/collections";

const COLLECTION_CATEGORY: Record<string, string> = {
  "royal-wedding": "sherwanis",
  "black-tie": "tuxedos",
  "fusion-couture": "indo-western",
  "reception-nights": "reception",
};

export function FeaturedCollections() {
  const featured = collections.filter((c) => c.featured);

  return (
    <SectionWrapper
      id="collections"
      label="Curated Edits"
      title="Featured Luxury Collections"
      subtitle="Each collection tells a chapter of your wedding story"
    >
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {featured.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
          >
            <Link
              href={`/shop?category=${COLLECTION_CATEGORY[col.id] ?? "sherwanis"}`}
              className="group relative block overflow-hidden border border-white/5 transition-colors hover:border-gold/30"
            >
              <LuxuryImage
                src={col.image}
                alt={col.title}
                aspectClass="aspect-[4/5]"
              />
              <motion.div
                className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent p-4 sm:p-6 md:p-8"
                initial={false}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-gold">
                  {col.subtitle}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ivory transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                  {col.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-champagne opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-gold">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
