import { cn } from "@/lib/utils";

interface SectionSkeletonProps {
  className?: string;
  variant?: "default" | "tall";
}

export function SectionSkeleton({
  className,
  variant = "default",
}: SectionSkeletonProps) {
  return (
    <div
      className={cn(
        "section-padding mx-auto max-w-7xl animate-pulse",
        variant === "tall" ? "min-h-[480px]" : "min-h-[320px]",
        className
      )}
      aria-hidden
    >
      <div className="mx-auto mb-12 h-3 w-32 rounded bg-gold/20" />
      <div className="mx-auto mb-6 h-10 max-w-md rounded bg-white/10" />
      <div className="mx-auto h-4 max-w-lg rounded bg-white/5" />
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-sm bg-gradient-to-br from-wine/30 to-charcoal"
          />
        ))}
      </div>
    </div>
  );
}
