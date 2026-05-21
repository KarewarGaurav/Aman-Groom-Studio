"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND, CATEGORIES } from "@/lib/constants";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "./SearchOverlay";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const itemCount = cartItems.reduce((n, i) => n + i.quantity, 0);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-panel py-3 shadow-lg"
            : "bg-transparent py-5"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={BRAND.name}
              width={44}
              height={44}
              className="h-10 w-10 md:h-11 md:w-11"
              priority
            />
            <div className="hidden sm:block">
              <p className="font-display text-lg leading-none text-ivory">
                {BRAND.name}
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80">
                {BRAND.tagline}
              </p>
            </div>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            <li
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <Link
                href="/shop"
                className="font-body text-sm uppercase tracking-widest text-champagne transition-colors hover:text-gold"
              >
                Collections
              </Link>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-1/2 top-full mt-4 w-[480px] -translate-x-1/2 glass-panel p-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={cat.href}
                          className="group p-3 transition-colors hover:bg-white/5"
                        >
                          <span className="font-display text-lg text-ivory group-hover:text-gold">
                            {cat.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li>
              <Link
                href="/#bespoke"
                className="font-body text-sm uppercase tracking-widest text-champagne hover:text-gold"
              >
                Bespoke
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="font-body text-sm uppercase tracking-widest text-champagne hover:text-gold"
              >
                Styling
              </Link>
            </li>
            <li>
              <Link
                href="/#store"
                className="font-body text-sm uppercase tracking-widest text-champagne hover:text-gold"
              >
                Atelier
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-champagne transition-colors hover:text-gold"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              className="relative hidden p-2 text-champagne hover:text-gold sm:block"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center bg-gold text-[10px] text-charcoal">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 text-champagne hover:text-gold"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center bg-gold text-[10px] text-charcoal">
                  {itemCount}
                </span>
              )}
            </button>
            <Button asChild size="sm" variant="gold" className="hidden md:inline-flex">
              <Link href="/booking">Book Session</Link>
            </Button>
            <button
              type="button"
              className="p-2 text-champagne lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
