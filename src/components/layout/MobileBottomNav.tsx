"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Calendar, Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/shop", icon: Grid3X3, label: "Shop" },
  { href: "/booking", icon: Calendar, label: "Book" },
  { href: "/wishlist", icon: Heart, label: "Saved" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-gold/20 pb-safe md:hidden">
      <ul className="flex items-center justify-around py-2">
        {links.map(({ href, icon: Icon, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] uppercase tracking-wider",
                pathname === href ? "text-gold" : "text-champagne/70"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={openCart}
            className="relative flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] uppercase tracking-wider text-champagne/70"
          >
            <ShoppingBag className="h-5 w-5" />
            Bag
            {count > 0 && (
              <span className="absolute right-1 top-0 h-4 w-4 bg-gold text-[9px] text-charcoal flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}
