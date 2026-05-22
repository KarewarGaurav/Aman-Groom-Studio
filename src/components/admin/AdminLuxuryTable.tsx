"use client";

import { cn } from "@/lib/utils";

export interface AdminColumn<T> {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
  /** Highlight as primary row label on mobile cards */
  primary?: boolean;
}

interface AdminLuxuryTableProps<T> {
  columns: AdminColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

function mobileColumns<T>(columns: AdminColumn<T>[]) {
  const visible = columns.filter((c) => !c.hideOnMobile);
  if (visible.length) return visible;
  return columns.slice(0, Math.min(3, columns.length));
}

export function AdminLuxuryTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = "No records found",
}: AdminLuxuryTableProps<T>) {
  if (!data.length) {
    return (
      <p className="py-12 text-center font-body text-sm text-charcoalsoft">
        {emptyMessage}
      </p>
    );
  }

  const cardCols = mobileColumns(columns);
  const primaryCol = cardCols.find((c) => c.primary) ?? cardCols[0];
  const detailCols = cardCols.filter((c) => c.key !== primaryCol.key);

  return (
    <>
      <div className="space-y-3 md:hidden">
        {data.map((row) => {
          const RowTag = onRowClick ? "button" : "div";
          return (
            <RowTag
              key={keyExtractor(row)}
              type={onRowClick ? "button" : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                "w-full rounded-2xl border border-champagne/50 bg-warmwhite p-4 text-left shadow-soft transition-colors",
                onRowClick &&
                  "cursor-pointer hover:border-burgundy/25 hover:bg-sky-50/50"
              )}
            >
              <div className="font-body text-sm font-semibold text-charcoal">
                {primaryCol.cell(row)}
              </div>
              <dl className="mt-3 space-y-2">
                {detailCols.map((col) => (
                  <div
                    key={col.key}
                    className="flex items-start justify-between gap-3"
                  >
                    <dt className="shrink-0 font-body text-[10px] uppercase tracking-wider text-bronze">
                      {col.header}
                    </dt>
                    <dd className="min-w-0 text-right font-body text-sm text-charcoal">
                      {col.cell(row)}
                    </dd>
                  </div>
                ))}
              </dl>
            </RowTag>
          );
        })}
      </div>

      <div className="admin-table-scroll pointer-events-auto hidden overflow-x-auto rounded-2xl border border-champagne/50 bg-warmwhite shadow-soft md:block">
        <table className="w-full min-w-[560px] border-collapse text-left lg:min-w-[640px]">
          <thead>
            <tr className="border-b border-champagne/50 bg-gradient-to-r from-burgundy/5 to-champagne/25">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3.5 font-body text-[10px] font-medium uppercase tracking-[0.22em] text-bronze md:px-5",
                    col.hideOnMobile && "hidden md:table-cell",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={keyExtractor(row)}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-champagne/30 transition-colors last:border-0",
                  onRowClick &&
                    "cursor-pointer hover:bg-sky-50/80 hover:shadow-[inset_3px_0_0_0_var(--burgundy)]"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-4 font-body text-sm text-charcoal md:px-5",
                      col.hideOnMobile && "hidden md:table-cell",
                      col.className
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
