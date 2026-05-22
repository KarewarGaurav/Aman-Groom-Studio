import { cn } from "@/lib/utils";

interface SectionSkeletonProps {
  className?: string;
  variant?: "default" | "tall" | "grid";
}

export function SectionSkeleton({
  className,
  variant = "default",
}: SectionSkeletonProps) {
  return (
    <div
      className={cn(
        "section-padding mx-auto max-w-7xl animate-pulse",
        variant === "tall" ? "min-h-[480px]" : "min-h-[280px]",
        className
      )}
      aria-hidden
    >
      <div className="mx-auto mb-12 h-3 w-32 rounded bg-champagne/60" />
      <div className="mx-auto mb-6 h-10 max-w-md rounded bg-cream" />
      <div className="mx-auto h-4 max-w-lg rounded bg-cream/80" />
      <div
        className={cn(
          "mt-16 gap-6",
          variant === "grid"
            ? "grid sm:grid-cols-2 lg:grid-cols-4"
            : "grid sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {Array.from({ length: variant === "grid" ? 4 : 3 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-sm bg-gradient-to-br from-cream to-champagne/40"
          />
        ))}
      </div>
    </div>
  );
}
