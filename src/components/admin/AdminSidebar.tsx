"use client";

import Image from "next/image";
import { AdminNavLink } from "@/components/admin/AdminNavLink";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Layers,
  Warehouse,
  CreditCard,
  Star,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminAuthStore } from "@/store/admin-auth-store";
import { BRAND } from "@/lib/constants";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "text-burgundy" },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag, color: "text-sky-700" },
  { href: "/admin/products", label: "Products", icon: Package, color: "text-amber-800" },
  { href: "/admin/customers", label: "Customers", icon: Users, color: "text-emerald-800" },
  { href: "/admin/categories", label: "Categories", icon: Layers, color: "text-violet-700" },
  { href: "/admin/inventory", label: "Inventory", icon: Warehouse, color: "text-orange-800" },
  { href: "/admin/payments", label: "Payments", icon: CreditCard, color: "text-teal-800" },
  { href: "/admin/reviews", label: "Reviews", icon: Star, color: "text-sandgold" },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3, color: "text-indigo-700" },
  { href: "/admin/settings", label: "Settings", icon: Settings, color: "text-charcoalsoft" },
] as const;

interface AdminSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function SidebarInner({
  pathname,
  onNavigate,
  onLogout,
}: {
  pathname: string;
  onNavigate: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-3 border-b border-champagne/50 bg-gradient-to-r from-burgundy/5 to-champagne/30 px-5 py-5">
        <Image
          src="/logo.png"
          alt={BRAND.name}
          width={40}
          height={40}
          className="rounded-sm"
        />
        <div>
          <p className="font-display text-lg font-medium leading-tight text-burgundy">
            Studio
          </p>
          <p className="font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-bronze">
            Admin
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-3 py-3 [-webkit-overflow-scrolling:touch]">
        {navItems.map(({ href, label, icon: Icon, color }) => {
          const active =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <AdminNavLink
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex shrink-0 cursor-pointer items-center gap-3 rounded-xl px-3 py-2 font-body text-sm font-medium transition-all duration-200",
                active
                  ? "admin-nav-active"
                  : "text-charcoalsoft hover:bg-champagne/35 hover:text-charcoal"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-champagne/40 bg-warmwhite",
                  active && "border-burgundy/25 bg-burgundy/10"
                )}
              >
                <Icon
                  className={cn("h-4 w-4", active ? "text-burgundy" : color)}
                  strokeWidth={1.75}
                />
              </span>
              {label}
            </AdminNavLink>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-champagne/50 bg-cream/30 p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-burgundy/15 bg-burgundy/5 px-3 py-2.5 font-body text-sm font-medium text-burgundy transition-colors hover:bg-burgundy/12"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </div>
  );
}

export function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAdminAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/admin_login");
  };

  return (
    <>
      <aside className="admin-sidebar-panel z-30 hidden w-[260px] flex-col border-r border-champagne/50 bg-warmwhite shadow-soft lg:flex">
        <SidebarInner
          pathname={pathname}
          onNavigate={onMobileClose}
          onLogout={handleLogout}
        />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-charcoal/30 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={onMobileClose}
          />
          <aside className="relative z-10 flex h-full w-[280px] max-w-[85vw] flex-col overflow-hidden bg-warmwhite shadow-luxury">
            <button
              type="button"
              onClick={onMobileClose}
              className="absolute right-4 top-5 z-10 cursor-pointer text-charcoalsoft hover:text-burgundy"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarInner
              pathname={pathname}
              onNavigate={onMobileClose}
              onLogout={handleLogout}
            />
          </aside>
        </div>
      ) : null}
    </>
  );
}
