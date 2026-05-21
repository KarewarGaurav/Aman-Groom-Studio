"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal);
  const total = useCartStore((s) => s.total);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
        <div className="border-b border-white/10 px-6 py-6">
          <h2 className="font-display text-2xl">Your Selection</h2>
          <p className="text-sm text-champagne/70">
            {items.length} {items.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="font-display text-xl text-champagne/60">
                Your cart awaits
              </p>
              <p className="mt-2 text-sm text-champagne/50">
                Explore our luxury collections
              </p>
              <Button asChild className="mt-6" variant="gold">
                <Link href="/shop" onClick={closeCart}>
                  Explore Collection
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {items.map((item) => (
                <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 py-5">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-wine/30">
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
                      className="font-display text-lg hover:text-gold"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-champagne/60">
                      {item.size} · {item.color}
                    </p>
                    <p className="mt-1 text-gold">{formatPrice(item.price)}</p>
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
                        className="p-1 text-champagne hover:text-ivory"
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
                        className="p-1 text-champagne hover:text-ivory"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId, item.size, item.color)
                        }
                        className="ml-auto p-1 text-champagne/50 hover:text-red-400"
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
          <div className="border-t border-white/10 p-6">
            <div className="mb-4 flex justify-between text-sm">
              <span className="text-champagne">Subtotal</span>
              <span>{formatPrice(subtotal())}</span>
            </div>
            <div className="mb-6 flex justify-between font-display text-lg">
              <span>Total</span>
              <span className="text-gold">{formatPrice(total())}</span>
            </div>
            <Button asChild className="w-full" variant="gold" onClick={closeCart}>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
