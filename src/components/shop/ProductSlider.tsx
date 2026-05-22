"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/cms";
import { useGsapReveal } from "@/hooks/useGsapReveal";

type SectionTone = "ivory" | "champagne" | "cream" | "warm" | "sand";

interface ProductSliderProps {
  label: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  className?: string;
  tone?: SectionTone;
}

export function ProductSlider({
  label,
  title,
  subtitle,
  products,
  viewAllHref = "/shop",
  className,
  tone = "ivory",
}: ProductSliderProps) {
  const gridRef = useGsapReveal<HTMLDivElement>({
    childSelector: "[data-product-card]",
    stagger: 0.06,
    y: 20,
  });

  return (
    <SectionWrapper
      label={label}
      title={title}
      subtitle={subtitle}
      tone={tone}
      className={className}
    >
      <div
        ref={gridRef}
        className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
      >
        {products.map((p, i) => (
          <div key={p.id} data-product-card>
            <ProductCard product={p} index={i} quickAdd />
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline" size="default">
          <Link href={viewAllHref} className="inline-flex items-center gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
