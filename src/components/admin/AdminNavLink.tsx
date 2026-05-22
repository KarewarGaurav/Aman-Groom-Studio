"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { useAdminNavStore } from "@/store/admin-nav-store";
import { cn } from "@/lib/utils";

type AdminNavLinkProps = ComponentProps<typeof Link>;

export function AdminNavLink({
  href,
  onClick,
  className,
  children,
  prefetch = true,
  ...props
}: AdminNavLinkProps) {
  const pathname = usePathname();
  const startNavigation = useAdminNavStore((s) => s.startNavigation);
  const pendingHref = useAdminNavStore((s) => s.pendingHref);
  const hrefStr =
    typeof href === "string"
      ? href
      : typeof href === "object" && href !== null && "pathname" in href
        ? String(href.pathname ?? "")
        : "";
  const isPending = pendingHref === hrefStr;

  return (
    <Link
      href={href}
      prefetch={prefetch}
      onClick={(e) => {
        if (hrefStr && hrefStr !== pathname) {
          startNavigation(hrefStr);
        }
        onClick?.(e);
      }}
      className={cn(
        className,
        isPending && "pointer-events-none opacity-70"
      )}
      aria-busy={isPending}
      {...props}
    >
      {children}
    </Link>
  );
}
