"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CouponSection } from "@/components/checkout/CouponSection";
import { CheckoutAuthGate } from "@/components/auth/CheckoutAuthGate";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { useIsAuthenticated } from "@/hooks/use-auth";
import { PaymentOptions } from "@/components/checkout/PaymentOptions";
import { getPaymentLabel, type PaymentOptionId } from "@/lib/payment-options";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const steps = ["Delivery", "Details", "Payment", "Confirm"];

export default function CheckoutPage() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const placeOrder = useAuthStore((s) => s.placeOrder);

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const total = useCartStore((s) => s.total);
  const appliedCoupons = useCartStore((s) => s.appliedCoupons);
  const discountSummary = useCartStore((s) => s.discountSummary);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentOptionId>("razorpay");
  const [paymentDetail, setPaymentDetail] = useState("");

  if (items.length === 0 && !confirmed) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-ivory px-4 pt-28">
        <p className="font-display text-2xl text-charcoal">Your bag is empty</p>
        <Button asChild className="mt-6" variant="default">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-ivory px-4 pt-28 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-bronze">
          Order Confirmed
        </p>
        <h1 className="mt-4 font-displayAlt text-4xl text-charcoal">
          Thank You
        </h1>
        <p className="mt-4 max-w-md text-charcoalsoft">
          Our team will contact you within 24 hours to confirm delivery and
          fitting details.
        </p>
        {orderId && (
          <Button asChild variant="outline" className="mt-6">
            <Link href={`/account/order/${orderId}`}>Track Order</Link>
          </Button>
        )}
        <Button asChild className="mt-4" variant="default">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const next = () => {
    if (!isAuthenticated) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }

    const { getAddresses } = useAuthStore.getState();
    const addresses = getAddresses();
    const shipping = addresses.find((a) => a.isDefault) ?? addresses[0];

    if (!shipping) {
      router.push("/account/addresses");
      return;
    }

    const summary = discountSummary();
    const order = placeOrder({
      items: [...items],
      subtotal: subtotal(),
      total: total(),
      discount: summary.subtotal > 0 ? summary.totalDiscount / summary.subtotal : 0,
      coupon: appliedCoupons.length > 0 ? appliedCoupons.join(", ") : null,
      shippingAddress: shipping,
      paymentLabel: getPaymentLabel(paymentMethod, paymentDetail || undefined),
    });

    if (order) {
      clearCart();
      setOrderId(order.id);
      setConfirmed(true);
    }
  };

  return (
    <div className="bg-ivory pb-28 pt-20 safe-x sm:pb-24 sm:pt-24 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-8">
        <h1 className="font-display text-3xl text-charcoal sm:text-4xl">Checkout</h1>

        <CheckoutAuthGate />

        {isAuthenticated && (
          <>
            <div className="filter-scroll-row -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {steps.map((s, i) => (
                <div
                  key={s}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-2 text-xs uppercase tracking-widest",
                    i <= step ? "text-burgundy" : "text-taupe"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border text-[10px]",
                      i <= step
                        ? "border-burgundy bg-burgundy text-warmwhite"
                        : "border-taupe/30"
                    )}
                  >
                    {i + 1}
                  </span>
                  {s}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-5 lg:gap-12">
              <div className="order-2 space-y-6 lg:order-1 lg:col-span-3">
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
                      <Label htmlFor="wedding">Wedding Date (optional)</Label>
                      <Input id="wedding" type="date" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="notes">Order Notes</Label>
                      <Input
                        id="notes"
                        placeholder="Delivery preferences, ceremony dates..."
                        className="mt-2"
                      />
                    </div>
                  </>
                )}
                {step === 2 && (
                  <div className="rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow">
                    <p className="font-display text-xl text-charcoal">
                      Choose Payment Method
                    </p>
                    <p className="mt-2 text-sm text-charcoalsoft">
                      Select how you would like to pay for your order.
                    </p>
                    <div className="mt-6">
                      <PaymentOptions
                        selected={paymentMethod}
                        onSelect={(id) => {
                          setPaymentMethod(id);
                          setPaymentDetail("");
                        }}
                        onDetailChange={setPaymentDetail}
                      />
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-4">
                    <p className="text-charcoalsoft">
                      Review your order and confirm. By placing this order, you
                      agree to our terms and exchange policy.
                    </p>
                    <div className="rounded-sm border border-taupe/15 bg-cream/50 px-4 py-3 text-sm">
                      <span className="text-charcoalsoft">Payment: </span>
                      <span className="font-medium text-charcoal">
                        {getPaymentLabel(
                          paymentMethod,
                          paymentDetail || undefined
                        )}
                      </span>
                    </div>
                  </div>
                )}
                <Button variant="default" onClick={next}>
                  {step === steps.length - 1 ? "Place Order" : "Continue"}
                </Button>
              </div>

              <aside className="order-1 h-fit rounded-sm border border-taupe/15 bg-warmwhite p-4 product-card-shadow sm:p-6 lg:order-2 lg:col-span-2">
                <h2 className="font-display text-xl text-charcoal">Order Summary</h2>
                <ul className="mt-6 max-h-64 space-y-4 overflow-y-auto">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-3"
                    >
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-sm bg-cream">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          unoptimized={item.image.startsWith("http")}
                        />
                      </div>
                      <div className="flex-1 text-sm text-charcoal">
                        <p>{item.name}</p>
                        <p className="text-charcoalsoft">
                          {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <CouponSection />
                </div>
                <div className="mt-6 space-y-2 border-t border-taupe/15 pt-4 text-sm">
                  <div className="flex justify-between text-charcoalsoft">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal())}</span>
                  </div>
                  {discountSummary().totalDiscount > 0 && (
                    <div className="flex justify-between text-bronze">
                      <span>Discount</span>
                      <span>−{formatPrice(discountSummary().totalDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-display text-lg text-charcoal">
                    <span>Total</span>
                    <span>{formatPrice(total())}</span>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
