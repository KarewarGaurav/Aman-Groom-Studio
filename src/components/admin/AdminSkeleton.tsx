import { cn } from "@/lib/utils";

export function AdminSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-champagne/30",
        className
      )}
    />
  );
}

export function AdminTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <AdminSkeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}

export function AdminStatSkeleton() {
  return (
    <div className="rounded-2xl border border-champagne/40 bg-warmwhite p-6">
      <AdminSkeleton className="h-3 w-24" />
      <AdminSkeleton className="mt-4 h-8 w-32" />
      <AdminSkeleton className="mt-2 h-3 w-20" />
    </div>
  );
}
