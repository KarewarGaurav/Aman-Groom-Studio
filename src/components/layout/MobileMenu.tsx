"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { CATEGORIES, BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useAuthUser, useIsAuthenticated } from "@/hooks/use-auth";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const isValid = useIsAuthenticated();
  const user = useAuthUser();
  const logout = useAuthStore((s) => s.logout);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[55] bg-warmwhite lg:hidden">
      <div className="flex items-center justify-between border-b border-taupe/15 px-4 py-4">
        <p className="font-display text-lg text-charcoal">{BRAND.name}</p>
        <button type="button" onClick={onClose} aria-label="Close menu">
          <X className="h-6 w-6 text-charcoal" />
        </button>
      </div>
      <nav className="flex flex-col px-4 py-6">
        <Link
          href="/shop"
          onClick={onClose}
          className="border-b border-taupe/10 py-4 font-display text-2xl text-charcoal"
        >
          Shop All
        </Link>
        <Link
          href="/shop?sort=new"
          onClick={onClose}
          className="border-b border-taupe/10 py-4 font-display text-xl text-burgundy"
        >
          New Arrivals
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            onClick={onClose}
            className="border-b border-taupe/10 py-3 font-sans text-base text-charcoalsoft"
          >
            {cat.label}
          </Link>
        ))}
        <div className="mt-8 flex flex-col gap-3">
          {isValid && user ? (
            <>
              <p className="text-xs uppercase tracking-widest text-bronze">
                {user.firstName} {user.lastName}
              </p>
              <Button asChild variant="default">
                <Link href="/account" onClick={onClose}>
                  My Account
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/account/orders" onClick={onClose}>
                  My Orders
                </Link>
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="default">
                <Link href="/login" onClick={onClose}>
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/signup" onClick={onClose}>
                  Create Account
                </Link>
              </Button>
            </>
          )}
          <Button asChild variant="outline">
            <Link href="/wishlist" onClick={onClose}>
              Wishlist
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/shop" onClick={onClose}>
              Shop Now
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
