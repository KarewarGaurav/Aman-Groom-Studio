import { cn } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/types/auth";
import type { AdminOrderStatus } from "@/types/admin";

const statusStyles: Record<AdminOrderStatus, string> = {
  placed: "bg-cream text-charcoalsoft border-champagne/60",
  confirmed: "bg-champagne/40 text-charcoal border-sandgold/30",
  tailoring: "bg-sandgold/15 text-bronze border-sandgold/40",
  ready: "bg-ivory text-burgundy border-burgundy/20",
  shipped: "bg-champagne/30 text-charcoal border-bronze/30",
  delivered: "bg-sandgold/20 text-charcoal border-sandgold/50",
  cancelled: "bg-charcoalsoft/10 text-charcoalsoft border-taupe/30",
};

export function AdminStatusBadge({ status }: { status: AdminOrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 font-body text-[10px] uppercase tracking-wider",
        statusStyles[status]
      )}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
