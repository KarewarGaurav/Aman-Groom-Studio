"use client";

import { useAdminNavStore } from "@/store/admin-nav-store";
import { cn } from "@/lib/utils";

export function AdminNavProgress() {
  const isNavigating = useAdminNavStore((s) => s.isNavigating);

  return (
    <div
      className="pointer-events-none absolute left-0 right-0 top-0 z-[60] h-0.5 overflow-hidden bg-champagne/30"
      aria-hidden={!isNavigating}
    >
      <div
        className={cn(
          "h-full bg-gradient-to-r from-burgundy via-sandgold to-burgundy transition-opacity duration-200",
          isNavigating ? "opacity-100 admin-nav-progress-active" : "w-0 opacity-0"
        )}
      />
    </div>
  );
}
