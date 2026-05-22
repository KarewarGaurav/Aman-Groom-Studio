"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AuthAlert({
  error,
  loading,
}: {
  error?: string | null;
  loading?: boolean;
}) {
  if (!error && !loading) return null;
  return (
    <div
      className={cn(
        "mb-6 flex items-start gap-3 rounded-sm border px-4 py-3 text-sm",
        error
          ? "border-burgundy/20 bg-burgundy/5 text-burgundy"
          : "border-taupe/15 bg-cream text-charcoalsoft"
      )}
      role="alert"
    >
      {loading ? (
        <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{loading ? "Please wait…" : error}</span>
    </div>
  );
}
