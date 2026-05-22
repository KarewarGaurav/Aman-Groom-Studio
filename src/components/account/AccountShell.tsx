"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  User,
  Ruler,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useAuthUser } from "@/hooks/use-auth";
import { useDashboardReveal } from "@/hooks/useAuthGsap";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AccountShellSkeleton } from "@/components/account/AccountShellSkeleton";

const nav = [
  { href: "/account", label: "Overview", icon: LayoutDashboard },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
];

interface AccountShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  skeletonVariant?: "overview" | "list" | "form" | "grid";
}

export function AccountShell({
  title,
  subtitle,
  children,
  skeletonVariant = "list",
}: AccountShellProps) {
  const { ready } = useRequireAuth();
  const pathname = usePathname();
  const user = useAuthUser();
  const logout = useAuthStore((s) => s.logout);
  const ref = useDashboardReveal();

  if (!ready) {
    return <AccountShellSkeleton variant={skeletonVariant} />;
  }

  return (
    <div
      ref={ref}
      className="bg-ivory pb-24 pt-20 safe-x sm:pt-24 md:pb-28 md:pt-28 lg:pb-8"
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-8">
        <div className="flex flex-col gap-10 lg:h-[calc(100dvh-8.5rem)] lg:flex-row lg:gap-10 lg:overflow-hidden">
          <aside
            data-dash-card
            className="lg:w-56 lg:shrink-0 lg:overflow-hidden"
          >
            <nav className="filter-scroll-row -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
              {nav.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-sm px-3 py-2.5 text-[10px] uppercase tracking-widest transition-colors sm:px-4 sm:py-3 sm:text-xs",
                    pathname === href
                      ? "bg-burgundy text-warmwhite"
                      : "bg-warmwhite text-charcoalsoft hover:bg-cream hover:text-burgundy product-card-shadow"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              <Link
                href="/account/profile#measurements"
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-sm px-4 py-3 text-xs uppercase tracking-widest transition-colors",
                  "bg-warmwhite text-charcoalsoft hover:bg-cream hover:text-burgundy product-card-shadow"
                )}
              >
                <Ruler className="h-4 w-4" />
                Measurements
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="flex shrink-0 items-center gap-2 rounded-sm px-4 py-3 text-xs uppercase tracking-widest text-charcoalsoft hover:bg-cream hover:text-burgundy"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </nav>
          </aside>

          <div
            data-dash-card
            className="scrollbar-none min-w-0 flex-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-1 [-webkit-overflow-scrolling:touch]"
          >
            <div>
              <p className="editorial-label">My Account</p>
              <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm text-charcoalsoft">{subtitle}</p>
              )}
              {user && (
                <p className="mt-1 text-xs text-taupe">
                  {user.firstName} {user.lastName} · {user.email}
                </p>
              )}
            </div>

            <div className="mt-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
