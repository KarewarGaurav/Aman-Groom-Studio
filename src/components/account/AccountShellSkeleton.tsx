import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccountSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-gradient-to-br from-cream to-champagne/45",
        className
      )}
      aria-hidden
    />
  );
}

type AccountShellSkeletonVariant = "overview" | "list" | "form" | "grid";

interface AccountShellSkeletonProps {
  variant?: AccountShellSkeletonVariant;
  label?: string;
}

const NAV_ITEMS = 7;

function AccountContentSkeleton({
  variant,
}: {
  variant: AccountShellSkeletonVariant;
}) {
  if (variant === "overview") {
    return (
      <>
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-sm border border-taupe/10 bg-warmwhite/80 p-6 product-card-shadow"
            >
              <AccountSkeleton className="h-5 w-5 rounded-full" />
              <AccountSkeleton className="mt-4 h-9 w-12" />
              <AccountSkeleton className="mt-2 h-3 w-24" />
            </div>
          ))}
        </div>
        <div className="mt-10 space-y-4">
          <AccountSkeleton className="h-7 w-40" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-sm border border-taupe/10 bg-warmwhite/80 p-5 product-card-shadow"
            >
              <AccountSkeleton className="h-20 w-16 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <AccountSkeleton className="h-5 w-36" />
                <AccountSkeleton className="h-4 w-48" />
                <AccountSkeleton className="h-6 w-24 rounded-full" />
              </div>
              <AccountSkeleton className="hidden h-9 w-20 sm:block" />
            </div>
          ))}
        </div>
      </>
    );
  }

  if (variant === "form") {
    return (
      <div className="space-y-8">
        {Array.from({ length: 2 }).map((_, section) => (
          <div
            key={section}
            className="rounded-sm border border-taupe/10 bg-warmwhite/80 p-6 product-card-shadow"
          >
            <AccountSkeleton className="h-6 w-32" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <AccountSkeleton className="h-3 w-16" />
                  <AccountSkeleton className="h-11 w-full" />
                </div>
              ))}
            </div>
            <AccountSkeleton className="mt-6 h-10 w-28" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-sm border border-taupe/10 bg-warmwhite/80 product-card-shadow"
          >
            <AccountSkeleton className="aspect-[3/4] w-full rounded-none" />
            <div className="space-y-2 p-4">
              <AccountSkeleton className="h-4 w-3/4" />
              <AccountSkeleton className="h-5 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <li
          key={i}
          className="flex flex-col gap-4 rounded-sm border border-taupe/10 bg-warmwhite/80 p-6 product-card-shadow sm:flex-row sm:items-start"
        >
          <AccountSkeleton className="h-24 w-20 shrink-0" />
          <div className="min-w-0 flex-1 space-y-2">
            <AccountSkeleton className="h-6 w-40" />
            <AccountSkeleton className="h-6 w-24 rounded-full" />
            <AccountSkeleton className="h-4 w-56" />
            <AccountSkeleton className="h-5 w-28" />
            <AccountSkeleton className="h-3 w-36" />
          </div>
          <AccountSkeleton className="h-9 w-28 shrink-0" />
        </li>
      ))}
    </ul>
  );
}

export function AccountShellSkeleton({
  variant = "list",
  label = "Loading your account…",
}: AccountShellSkeletonProps) {
  return (
    <div
      className="bg-ivory pb-24 pt-20 safe-x sm:pt-24 md:pb-28 md:pt-28 lg:pb-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex flex-col gap-10 lg:h-[calc(100dvh-8.5rem)] lg:flex-row lg:gap-10 lg:overflow-hidden">
          <aside className="lg:w-56 lg:shrink-0 lg:overflow-hidden">
            <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
              {Array.from({ length: NAV_ITEMS }).map((_, i) => (
                <AccountSkeleton
                  key={i}
                  className={cn(
                    "h-11 shrink-0 rounded-sm",
                    i === 0 ? "lg:w-full lg:bg-champagne/50" : "w-28 lg:w-full"
                  )}
                />
              ))}
            </nav>
          </aside>

          <div className="scrollbar-none min-w-0 flex-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
            <div className="mb-8 flex items-center gap-3 rounded-sm border border-taupe/15 bg-warmwhite/90 px-4 py-3 product-card-shadow">
              <Loader2
                className="h-5 w-5 shrink-0 animate-spin text-burgundy"
                strokeWidth={1.75}
                aria-hidden
              />
              <p className="font-body text-sm text-charcoalsoft">{label}</p>
            </div>

            <div className="space-y-2">
              <AccountSkeleton className="h-3 w-24" />
              <AccountSkeleton className="h-10 w-48 sm:w-56" />
              <AccountSkeleton className="h-4 w-64 max-w-full" />
              <AccountSkeleton className="h-3 w-52 max-w-full" />
            </div>

            <div className="mt-10">
              <AccountContentSkeleton variant={variant} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
