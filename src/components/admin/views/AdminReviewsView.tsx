"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminPageEnter } from "@/hooks/useAdminGsap";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminStore } from "@/store/admin-store";
import { cn } from "@/lib/utils";

export function AdminReviewsView() {
  const ref = useAdminPageEnter();
  const reviews = useAdminStore((s) => s.reviews);
  const updateStatus = useAdminStore((s) => s.updateReviewStatus);
  const toggleFeatured = useAdminStore((s) => s.toggleReviewFeatured);

  const pending = reviews.filter((r) => r.status === "pending");

  return (
    <div ref={ref}>
      <AdminPageHeader
        label="Reputation"
        title="Reviews"
        description="Approve testimonials and manage featured client stories."
      />

      {pending.length > 0 ? (
        <p
          data-admin-enter
          className="mb-6 font-body text-sm text-bronze"
        >
          {pending.length} review(s) awaiting approval
        </p>
      ) : null}

      <div className="space-y-4">
        {reviews.map((r) => (
          <article
            key={r.id}
            data-admin-enter
            className="flex flex-col gap-4 rounded-2xl border border-champagne/50 bg-warmwhite p-5 sm:flex-row"
          >
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
              <Image src={r.productImage} alt="" fill className="object-cover" sizes="80px" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-light">{r.customerName}</h3>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < r.rating
                          ? "fill-sandgold text-sandgold"
                          : "text-champagne"
                      )}
                    />
                  ))}
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-body text-[10px] uppercase tracking-wider",
                    r.status === "approved" && "bg-champagne/40 text-charcoal",
                    r.status === "pending" && "bg-cream text-bronze",
                    r.status === "rejected" && "bg-burgundy/10 text-burgundy"
                  )}
                >
                  {r.status}
                </span>
                {r.featured ? (
                  <span className="font-body text-[10px] uppercase text-sandgold">
                    Featured
                  </span>
                ) : null}
              </div>
              <p className="mt-1 font-body text-xs text-taupe">{r.productName}</p>
              <p className="mt-2 font-body text-sm text-charcoalsoft">{r.comment}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.status === "pending" ? (
                  <>
                    <Button
                      size="sm"
                      className="bg-charcoal hover:bg-burgundy"
                      onClick={() => updateStatus(r.id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-burgundy/30 text-burgundy"
                      onClick={() => updateStatus(r.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </>
                ) : null}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-champagne"
                  onClick={() => toggleFeatured(r.id)}
                >
                  {r.featured ? "Remove featured" : "Feature testimonial"}
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
