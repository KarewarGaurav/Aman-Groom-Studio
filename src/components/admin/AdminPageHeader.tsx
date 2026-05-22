interface AdminPageHeaderProps {
  label: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminPageHeader({
  label,
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div
      data-admin-enter
      className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-burgundy">
          {label}
        </p>
        <h1 className="font-display text-2xl font-medium tracking-tight text-charcoal sm:text-3xl md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-xl font-body text-sm text-charcoalsoft">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
