import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  label?: string;
}

export function SectionDivider({
  className,
  label = "Aman Groom Studio",
}: SectionDividerProps) {
  return (
    <div
      className={cn("section-divider relative overflow-hidden", className)}
      aria-hidden
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-10 md:px-8 lg:px-12">
        <span className="section-divider-line h-px flex-1" />
        <span className="editorial-label shrink-0 text-bronze/90">{label}</span>
        <span className="section-divider-line h-px flex-1" />
      </div>
    </div>
  );
}
