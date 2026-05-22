import type { LucideIcon } from "lucide-react";

interface AdminEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function AdminEmptyState({
  icon: Icon,
  title,
  description,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-champagne/40 bg-warmwhite/80 px-8 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cream">
        <Icon className="h-6 w-6 text-bronze" strokeWidth={1.25} />
      </div>
      <h3 className="font-display text-xl font-light text-charcoal">{title}</h3>
      <p className="mt-2 max-w-sm font-body text-sm text-charcoalsoft">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
