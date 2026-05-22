"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "New Arrivals" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
] as const;

function buildHref(category: string, sort: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (sort && sort !== "featured") params.set("sort", sort);
  const q = params.toString();
  return q ? `/shop?${q}` : "/shop";
}

export function ShopFilters() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "featured";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Link
          href={buildHref("", sort)}
          className={cn(
            "rounded-sm px-4 py-2 text-xs uppercase tracking-widest transition-colors",
            !category
              ? "bg-charcoal text-warmwhite"
              : "border border-bronze/20 bg-gradient-to-b from-warmwhite to-cream/60 text-charcoalsoft hover:border-sandgold/30 hover:from-champagne/20 hover:to-cream"
          )}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={buildHref(cat.id, sort)}
            className={cn(
              "rounded-sm px-4 py-2 text-xs uppercase tracking-widest transition-colors",
              category === cat.id
                ? "bg-charcoal text-warmwhite"
                : "border border-bronze/20 bg-gradient-to-b from-warmwhite to-cream/60 text-charcoalsoft hover:border-sandgold/30 hover:from-champagne/20 hover:to-cream"
            )}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] uppercase tracking-widest text-bronze">
          Sort
        </span>
        {SORT_OPTIONS.map((opt) => (
          <Link
            key={opt.id}
            href={buildHref(category, opt.id)}
            className={cn(
              "text-xs uppercase tracking-wider transition-colors",
              sort === opt.id
                ? "text-burgundy font-medium"
                : "text-charcoalsoft hover:text-charcoal"
            )}
          >
            {opt.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
