"use client";

import Image from "next/image";
import { useAdminPageEnter } from "@/hooks/useAdminGsap";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminStore } from "@/store/admin-store";

export function AdminCategoriesView() {
  const ref = useAdminPageEnter();
  const categories = useAdminStore((s) => s.categories);

  return (
    <div ref={ref}>
      <AdminPageHeader
        label="Catalogue"
        title="Categories"
        description="Shop navigation and collection groupings."
      />

      <div
        data-admin-enter
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map((cat) => (
          <article
            key={cat.id}
            className="group overflow-hidden rounded-2xl border border-champagne/50 bg-warmwhite shadow-soft transition-shadow hover:shadow-luxury"
          >
            <div className="relative aspect-[4/3] bg-cream">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              {cat.featured ? (
                <span className="absolute left-3 top-3 rounded-full bg-warmwhite/90 px-2 py-0.5 font-body text-[9px] uppercase tracking-wider text-bronze">
                  Featured
                </span>
              ) : null}
            </div>
            <div className="p-4">
              <h3 className="font-display text-xl font-light">{cat.name}</h3>
              <p className="mt-1 font-body text-sm text-charcoalsoft">
                {cat.productCount} products · /{cat.slug}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
