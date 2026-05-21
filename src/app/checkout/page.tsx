"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const steps = ["Delivery", "Wedding Details", "Payment", "Confirm"];

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const total = useCartStore((s) => s.total);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const discount = useCartStore((s) => s.discount);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (items.length === 0 && !confirmed) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-28">
        <p className="font-display text-2xl">Your cart is empty</p>
        <Button asChild className="mt-6" variant="gold">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-28 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Order Confirmed</p>
        <h1 className="mt-4 font-display text-4xl">Thank You, Maharaja</h1>
        <p className="mt-4 max-w-md text-champagne/80">
          Our concierge will contact you within 24 hours to confirm fittings and
          delivery details.
        </p>
        <Button asChild className="mt-8" variant="gold">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  const handleCoupon = () => {
    const ok = applyCoupon(coupon);
    setCouponError(!ok);
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      clearCart();
      setConfirmed(true);
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h1 className="font-display text-4xl">Checkout</h1>

        <div className="mt-8 flex gap-2 overflow-x-auto">
          {steps.map((s, i) => (
            <div
              key={s}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap px-4 py-2 text-xs uppercase tracking-widest",
                i <= step ? "text-gold" : "text-champagne/40"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center border text-[10px]",
                  i <= step ? "border-gold" : "border-white/20"
                )}
              >
                {i + 1}
              </span>
              {s}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            {step === 0 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="fname">First Name</Label>
                    <Input id="fname" className="mt-2" required />
                  </div>
                  <div>
                    <Label htmlFor="lname">Last Name</Label>
                    <Input id="lname" className="mt-2" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input id="address" className="mt-2" required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" className="mt-2" defaultValue="New Delhi" />
                  </div>
                  <div>
                    <Label htmlFor="pin">PIN Code</Label>
                    <Input id="pin" className="mt-2" required />
                  </div>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="wedding">Wedding Date</Label>
                  <Input id="wedding" type="date" className="mt-2" />
                  <p className="mt-2 text-xs text-champagne/50">
                    Helps us prioritize fittings and delivery timelines
                  </p>
                </div>
                <div>
                  <Label htmlFor="notes">Ceremony Notes</Label>
                  <Input
                    id="notes"
                    placeholder="Baraat, reception, multiple events..."
                    className="mt-2"
                  />
                </div>
              </>
            )}
            {step === 2 && (
              <div className="glass-panel p-6">
                <p className="font-display text-xl">Payment</p>
                <p className="mt-2 text-sm text-champagne/70">
                  Demo checkout — payment gateway integration ready for production.
                </p>
                <div className="mt-6 space-y-3">
                  <Input placeholder="Card number" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="MM/YY" />
                    <Input placeholder="CVV" />
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <p className="text-champagne/80">
                Review your order and confirm. By placing this order, you agree to
                our bespoke terms and alteration policy.
              </p>
            )}
            <Button variant="gold" onClick={next}>
              {step === steps.length - 1 ? "Place Order" : "Continue"}
            </Button>
          </div>

          <aside className="lg:col-span-2 glass-panel p-6 h-fit">
            <h2 className="font-display text-xl">Order Summary</h2>
            <ul className="mt-6 max-h-64 space-y-4 overflow-y-auto">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-3"
                >
                  <div className="relative h-16 w-12 shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized={item.image.startsWith("http")}
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p>{item.name}</p>
                    <p className="text-champagne/50">
                      {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-gold text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2">
              <Input
                placeholder="Coupon (MAHARAJA10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button variant="outline" size="sm" onClick={handleCoupon}>
                Apply
              </Button>
            </div>
            {couponError && (
              <p className="mt-1 text-xs text-red-400">Invalid coupon code</p>
            )}
            {discount > 0 && (
              <p className="mt-1 text-xs text-gold">
                Discount applied ({discount * 100}%)
              </p>
            )}
            <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between font-display text-lg">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total())}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
