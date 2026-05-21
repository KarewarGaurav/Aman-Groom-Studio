"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col bg-charcoal/95 backdrop-blur-md"
        >
          <div className="mx-auto w-full max-w-2xl px-4 pt-24">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
              <Input
                autoFocus
                placeholder="Search sherwanis, tuxedos, collections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-12"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-champagne"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-8 max-h-[60vh] space-y-2 overflow-y-auto">
              {results.length === 0 && query && (
                <li className="py-8 text-center text-champagne/60">
                  No pieces found. Try &quot;sherwani&quot; or &quot;tuxedo&quot;.
                </li>
              )}
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/shop/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between border-b border-white/10 py-4 transition-colors hover:text-gold"
                  >
                    <span className="font-display text-lg">{p.name}</span>
                    <span className="text-sm text-gold">{formatPrice(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
