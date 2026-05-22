"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
    if (!query.trim()) return products.slice(0, 6);
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-warmwhite/98 backdrop-blur-lg safe-x">
      <div className="mx-auto w-full max-w-2xl px-3 pt-20 safe-x sm:px-4 sm:pt-24">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-bronze" />
          <Input
            autoFocus
            placeholder="Search sherwanis, tuxedos, kurta sets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-12"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoalsoft"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-widest text-bronze">
          {query ? "Results" : "Popular searches"}
        </p>
        <ul className="mt-4 max-h-[min(60dvh,28rem)] space-y-1 overflow-y-auto pb-8">
          {results.length === 0 && query && (
            <li className="py-8 text-center text-charcoalsoft">
              No products found. Try &quot;sherwani&quot; or &quot;tuxedo&quot;.
            </li>
          )}
          {results.map((p) => (
            <li key={p.id}>
              <Link
                href={`/shop/${p.slug}`}
                onClick={onClose}
                className="flex items-center justify-between gap-3 rounded-sm px-3 py-4 transition-colors hover:bg-cream"
              >
                <span className="min-w-0 flex-1 font-display text-base text-charcoal sm:text-lg">
                  {p.name}
                </span>
                <span className="text-sm text-burgundy">{formatPrice(p.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
