"use client";

import { Loader2 } from "lucide-react";
import { AdminSkeleton, AdminStatSkeleton } from "@/components/admin/AdminSkeleton";

interface AdminPageLoaderProps {
  label?: string;
  compact?: boolean;
}

export function AdminPageLoader({
  label = "Loading studio panel…",
  compact = false,
}: AdminPageLoaderProps) {
  if (compact) {
    return (
      <div className="flex items-center justify-center gap-3 py-16">
        <Loader2
          className="h-6 w-6 animate-spin text-burgundy"
          strokeWidth={1.75}
          aria-hidden
        />
        <p className="font-body text-sm text-charcoalsoft">{label}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" role="status" aria-live="polite" aria-busy="true">
      <div className="flex items-center gap-3 rounded-2xl border border-champagne/40 bg-warmwhite/90 px-4 py-3">
        <Loader2
          className="h-5 w-5 animate-spin text-burgundy"
          strokeWidth={1.75}
          aria-hidden
        />
        <p className="font-body text-sm font-medium text-charcoal">{label}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <AdminStatSkeleton key={i} />
        ))}
      </div>
      <AdminSkeleton className="h-48 w-full rounded-2xl" />
    </div>
  );
}
