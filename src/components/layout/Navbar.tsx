"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND, CATEGORIES } from "@/lib/constants";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "./SearchOverlay";
import { MobileMenu } from "./MobileMenu";
import { UserMenu } from "./UserMenu";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { IMAGES } from "@/lib/images";

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
        setScrolled(window.scrollY > 24);
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
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          scrolled ? "navbar-glass py-3" : "navbar-glass-top py-4"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 safe-x sm:px-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={BRAND.name}
              width={40}
              height={40}
              className="h-9 w-9 md:h-10 md:w-10"
              priority
            />
            <div className="hidden sm:block">
              <p className="font-display text-base leading-none text-charcoal md:text-lg">
                {BRAND.name}
              </p>
              <p className="text-[9px] uppercase tracking-[0.25em] text-bronze">
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
                className="font-sans text-xs uppercase tracking-widest text-charcoalsoft transition-colors hover:text-burgundy"
              >
                Shop
              </Link>
              {megaOpen && (
                <div className="absolute left-1/2 top-full mt-3 w-[min(560px,calc(100vw-1.5rem))] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 glass-panel rounded-sm p-4 shadow-luxury sm:p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {CATEGORIES.slice(0, 4).map((cat) => (
                      <Link
                        key={cat.id}
                        href={cat.href}
                        className="group flex gap-3 rounded-sm border border-transparent p-2 transition-all hover:border-sandgold/20 hover:bg-champagne/30"
                      >
                        <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-sm">
                          <LuxuryImage
                            src={IMAGES.categories[cat.imageKey]}
                            alt=""
                            aspectClass="aspect-[3/4]"
                            sizes="56px"
                          />
                        </div>
                        <span className="font-display text-base text-charcoal group-hover:text-burgundy">
                          {cat.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/shop"
                    className="mt-4 block text-center text-[10px] uppercase tracking-widest text-bronze hover:text-burgundy"
                  >
                    View All Products →
                  </Link>
                </div>
              )}
            </li>
            {CATEGORIES.slice(0, 3).map((cat) => (
              <li key={cat.id}>
                <Link
                  href={cat.href}
                  className="font-sans text-xs uppercase tracking-widest text-charcoalsoft transition-colors hover:text-burgundy"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/shop?sort=new"
                className="font-sans text-xs uppercase tracking-widest text-burgundy"
              >
                New
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-1 md:gap-3">
            <UserMenu />
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-charcoalsoft transition-colors hover:text-burgundy"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              className="relative hidden p-2 text-charcoalsoft hover:text-burgundy sm:block"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-burgundy text-[10px] text-warmwhite">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 text-charcoalsoft hover:text-burgundy"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-burgundy text-[10px] text-warmwhite">
                  {itemCount}
                </span>
              )}
            </button>
            <Button
              asChild
              size="sm"
              variant="default"
              className="hidden md:inline-flex"
            >
              <Link href="/shop">Shop Now</Link>
            </Button>
            <button
              type="button"
              className="p-2 text-charcoal lg:hidden"
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
