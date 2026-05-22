"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { CouponSection } from "@/components/checkout/CouponSection";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal);
  const total = useCartStore((s) => s.total);
  const discountSummary = useCartStore((s) => s.discountSummary);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        title="Shopping Bag"
        className="flex w-full flex-col bg-warmwhite p-0 sm:max-w-md"
      >
        <div className="border-b border-taupe/15 px-6 py-6">
          <p className="text-sm text-charcoalsoft">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="font-display text-xl text-charcoalsoft">
                Your bag is empty
              </p>
              <Button asChild className="mt-6" variant="default">
                <Link href="/shop" onClick={closeCart}>
                  Start Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-taupe/10">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 py-5"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-cream">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized={item.image.startsWith("http")}
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={closeCart}
                      className="font-display text-lg text-charcoal hover:text-burgundy"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-charcoalsoft">
                      {item.size} · {item.color}
                    </p>
                    <p className="mt-1 font-medium text-charcoal">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="p-1 text-charcoalsoft hover:text-charcoal"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="p-1 text-charcoalsoft hover:text-charcoal"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId, item.size, item.color)
                        }
                        className="ml-auto p-1 text-taupe hover:text-burgundy"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-taupe/15 p-6">
            <CouponSection compact />
            <div className="mb-3 mt-4 flex justify-between text-sm text-charcoalsoft">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal())}</span>
            </div>
            {discountSummary().totalDiscount > 0 && (
              <div className="mb-3 flex justify-between text-sm text-bronze">
                <span>Discount</span>
                <span>−{formatPrice(discountSummary().totalDiscount)}</span>
              </div>
            )}
            <div className="mb-6 flex justify-between font-display text-lg text-charcoal">
              <span>Total</span>
              <span>{formatPrice(total())}</span>
            </div>
            <Button asChild className="w-full" variant="default" onClick={closeCart}>
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
