"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/shop", icon: Grid3X3, label: "Shop" },
  { href: "/wishlist", icon: Heart, label: "Saved" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-panel-solid border-t border-taupe/15 md:hidden">
      <ul className="flex items-center justify-around py-2">
        {links.map(({ href, icon: Icon, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] uppercase tracking-wider",
                pathname === href ? "text-burgundy" : "text-charcoalsoft"
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
            className="relative flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] uppercase tracking-wider text-charcoalsoft"
          >
            <ShoppingBag className="h-5 w-5" />
            Bag
            {count > 0 && (
              <span className="absolute right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-burgundy text-[9px] text-warmwhite">
                {count}
              </span>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}
