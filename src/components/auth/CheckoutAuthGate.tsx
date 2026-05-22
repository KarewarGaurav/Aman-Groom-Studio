"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsAuthenticated } from "@/hooks/use-auth";
import { useAuthRedirectStore } from "@/store/auth-redirect-store";

export function CheckoutAuthGate() {
  const isValid = useIsAuthenticated();
  const setReturnUrl = useAuthRedirectStore((s) => s.setReturnUrl);

  if (isValid) return null;

  const saveReturn = () => setReturnUrl("/checkout");

  return (
    <div className="mb-8 rounded-sm border border-champagne/50 bg-gradient-to-br from-warmwhite via-cream/30 to-champagne/20 p-5 text-center product-card-shadow sm:mb-10 sm:p-8">
      <Lock className="mx-auto h-8 w-8 text-bronze" />
      <p className="editorial-label mt-4">Members Only Checkout</p>
      <h2 className="mt-2 font-display text-2xl text-charcoal">
        Sign in to complete your order
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-charcoalsoft">
        Browse freely as a guest. To place an order and track your couture
        pieces, please sign in or create an account. Your bag will be saved.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild variant="default">
          <Link href="/login?redirect=/checkout" onClick={saveReturn}>
            Sign In
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/signup?redirect=/checkout" onClick={saveReturn}>
            Create Account
          </Link>
        </Button>
      </div>
    </div>
  );
}
