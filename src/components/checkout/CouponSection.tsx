"use client";

import { useState } from "react";
import { Tag, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { COUPON_OFFERS } from "@/data/coupons";
import { getOfferDisplayValue, tryApplyCoupon } from "@/lib/coupon-utils";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { CouponOffer } from "@/types/coupon";

function OfferTypeLabel({ type }: { type: CouponOffer["type"] }) {
  const labels: Record<CouponOffer["type"], string> = {
    percentage: "Percent off",
    fixed: "Flat discount",
    spend_threshold: "Spend & save",
    item_quantity: "Buy more",
  };
  return (
    <span className="text-[9px] uppercase tracking-widest text-taupe">
      {labels[type]}
    </span>
  );
}

export function CouponSection({ compact = false }: { compact?: boolean }) {
  const items = useCartStore((s) => s.items);
  const appliedCoupons = useCartStore((s) => s.appliedCoupons);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const discountSummary = useCartStore((s) => s.discountSummary);

  const [couponInput, setCouponInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [allOpen, setAllOpen] = useState(false);

  const summary = discountSummary();

  const handleApply = (code?: string) => {
    const toApply = code ?? couponInput;
    const result = applyCoupon(toApply);
    if (result.ok) {
      setCouponInput("");
      setError(null);
      if (code) setAllOpen(false);
    } else {
      setError(result.message ?? "Could not apply coupon.");
    }
  };

  const handleApplyFromList = (offer: CouponOffer) => {
    const check = tryApplyCoupon(offer.code, items, appliedCoupons);
    if (!check.ok) {
      setError(check.message);
      return;
    }
    handleApply(offer.code);
  };

  return (
    <div className={cn("space-y-3", compact && "space-y-2")}>
      <div className="flex gap-2">
        <Input
          placeholder="Enter coupon code"
          value={couponInput}
          onChange={(e) => {
            setCouponInput(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          className="flex-1"
          aria-label="Coupon code"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleApply()}
          className="shrink-0"
        >
          Apply
        </Button>
      </div>

      <Dialog open={allOpen} onOpenChange={setAllOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto w-full justify-center gap-2 py-2 text-[10px] uppercase tracking-widest text-bronze hover:text-burgundy"
          >
            <Sparkles className="h-3.5 w-3.5" />
            See All Coupons
          </Button>
        </DialogTrigger>
        <DialogContent
          title="Available Offers"
          className="max-h-[85vh] max-w-lg overflow-y-auto"
        >
          <p className="text-sm text-charcoalsoft">
            Stack eligible offers — spend thresholds, flat savings, and bundle
            deals. Exclusive codes cannot be combined.
          </p>
          <ul className="mt-4 max-h-[50vh] space-y-3 overflow-y-auto pr-1">
            {COUPON_OFFERS.map((offer) => {
              const applied = appliedCoupons.includes(offer.code);
              const check = tryApplyCoupon(offer.code, items, appliedCoupons);
              const disabled = applied || !check.ok;

              return (
                <li
                  key={offer.code}
                  className={cn(
                    "rounded-sm border p-4 transition-colors",
                    applied
                      ? "border-burgundy/30 bg-burgundy/5"
                      : "border-taupe/15 bg-cream/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <OfferTypeLabel type={offer.type} />
                        {offer.badge && (
                          <span className="rounded-sm bg-champagne/60 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-charcoal">
                            {offer.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-display text-lg text-charcoal">
                        {offer.title}
                      </p>
                      <p className="mt-0.5 text-xs text-charcoalsoft">
                        {offer.description}
                      </p>
                      <p className="mt-2 font-mono text-xs tracking-wider text-burgundy">
                        {offer.code}
                      </p>
                      <p className="mt-1 text-xs font-medium text-bronze">
                        {getOfferDisplayValue(offer)}
                      </p>
                    </div>
                    <Button
                      variant={applied ? "outline" : "default"}
                      size="sm"
                      disabled={disabled && !applied}
                      onClick={() =>
                        applied
                          ? removeCoupon(offer.code)
                          : handleApplyFromList(offer)
                      }
                      className="shrink-0"
                    >
                      {applied ? "Remove" : "Apply"}
                    </Button>
                  </div>
                  {!applied && !check.ok && (
                    <p className="mt-2 text-[10px] text-taupe">{check.message}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </DialogContent>
      </Dialog>

      {error && (
        <p className="text-xs text-burgundy" role="alert">
          {error}
        </p>
      )}

      {summary.lines.length > 0 && (
        <ul className="space-y-2 rounded-sm border border-champagne/40 bg-champagne/10 px-3 py-3">
          {summary.lines.map((line) => (
            <li
              key={line.code}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <span className="flex items-center gap-1.5 text-charcoal">
                <Tag className="h-3 w-3 text-bronze" />
                <span>
                  {line.label}{" "}
                  <span className="font-mono text-[10px] text-taupe">
                    ({line.code})
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-bronze">−{formatPrice(line.amount)}</span>
                <button
                  type="button"
                  onClick={() => removeCoupon(line.code)}
                  className="text-taupe hover:text-burgundy"
                  aria-label={`Remove ${line.code}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            </li>
          ))}
          <li className="flex justify-between border-t border-champagne/30 pt-2 text-xs font-medium text-charcoal">
            <span>Total savings</span>
            <span className="text-burgundy">
              −{formatPrice(summary.totalDiscount)}
            </span>
          </li>
        </ul>
      )}
    </div>
  );
}
