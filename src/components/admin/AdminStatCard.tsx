import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatAccent =
  | "gold"
  | "burgundy"
  | "emerald"
  | "sapphire"
  | "amber"
  | "neutral";

interface AdminStatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  trend?: string;
  accent?: StatAccent;
}

const accentStyles: Record<
  StatAccent,
  { card: string; icon: string; trend: string }
> = {
  gold: {
    card: "border-sandgold/45 bg-gradient-to-br from-champagne/50 via-warmwhite to-ivory",
    icon: "border-sandgold/50 bg-sandgold/20 text-bronze",
    trend: "text-bronze",
  },
  burgundy: {
    card: "border-burgundy/25 bg-gradient-to-br from-burgundy/8 via-warmwhite to-champagne/20",
    icon: "border-burgundy/30 bg-burgundy/10 text-burgundy",
    trend: "text-burgundy",
  },
  emerald: {
    card: "border-emerald-600/20 bg-gradient-to-br from-emerald-50/80 via-warmwhite to-ivory",
    icon: "border-emerald-600/25 bg-emerald-100 text-emerald-800",
    trend: "text-emerald-700",
  },
  sapphire: {
    card: "border-sky-600/20 bg-gradient-to-br from-sky-50/90 via-warmwhite to-ivory",
    icon: "border-sky-500/30 bg-sky-100 text-sky-800",
    trend: "text-sky-700",
  },
  amber: {
    card: "border-amber-500/30 bg-gradient-to-br from-amber-50/90 via-warmwhite to-cream",
    icon: "border-amber-500/35 bg-amber-100 text-amber-900",
    trend: "text-amber-800",
  },
  neutral: {
    card: "border-champagne/50 bg-gradient-to-br from-cream/60 to-warmwhite",
    icon: "border-champagne/60 bg-ivory text-bronze",
    trend: "text-charcoalsoft",
  },
};

export function AdminStatCard({
  label,
  value,
  hint,
  icon: Icon,
  trend,
  accent = "neutral",
}: AdminStatCardProps) {
  const styles = accentStyles[accent];

  return (
    <div
      data-dash-card
      className={cn(
        "admin-card group cursor-default overflow-hidden p-4 sm:p-5 md:p-6",
        styles.card
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 flex-1 font-body text-[10px] font-semibold uppercase leading-snug tracking-[0.2em] text-bronze sm:tracking-[0.28em]">
          {label}
        </p>
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border sm:h-10 sm:w-10 md:h-11 md:w-11 md:rounded-xl",
            styles.icon
          )}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
        </div>
      </div>
      <p
        className="mt-2 break-words font-display text-lg font-medium leading-tight text-charcoal sm:text-xl md:mt-2.5 md:text-2xl lg:text-3xl"
        title={value}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-1 font-body text-xs text-charcoalsoft">{hint}</p>
      ) : null}
      {trend ? (
        <p
          className={cn(
            "mt-1.5 font-body text-[11px] font-medium leading-snug sm:mt-2 sm:text-xs",
            styles.trend
          )}
        >
          {trend}
        </p>
      ) : null}
    </div>
  );
}
