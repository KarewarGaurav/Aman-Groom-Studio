"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useAuthHydrated, useAuthUser, useIsAuthenticated } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const hydrated = useAuthHydrated();
  const isValid = useIsAuthenticated();
  const user = useAuthUser();
  const logout = useAuthStore((s) => s.logout);

  if (!hydrated) {
    return (
      <span className="h-9 w-9 rounded-full bg-cream" aria-hidden />
    );
  }

  if (!isValid || !user) {
    return (
      <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
        <Link href="/login">Sign In</Link>
      </Button>
    );
  }

  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-taupe/20 bg-warmwhite px-2 py-1.5 transition-colors hover:border-bronze"
          aria-label="Account menu"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-burgundy font-sans text-xs text-warmwhite">
            {initials || <User className="h-4 w-4" />}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>
          {user.firstName} {user.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">My Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/orders">My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/wishlist">Wishlist</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/addresses">Saved Addresses</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            logout();
            window.location.href = "/";
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
