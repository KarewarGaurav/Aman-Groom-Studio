import type { OrderStatus } from "@/types/auth";
import { ORDER_STATUS_LABELS } from "@/types/auth";
import { cn } from "@/lib/utils";

const tone: Partial<Record<OrderStatus, string>> = {
  placed: "bg-cream text-charcoal",
  confirmed: "bg-champagne/50 text-charcoal",
  tailoring: "bg-bronze/15 text-bronze",
  ready: "bg-sandgold/20 text-charcoal",
  shipped: "bg-burgundy/10 text-burgundy",
  delivered: "bg-burgundy text-warmwhite",
  cancelled: "bg-taupe/20 text-charcoalsoft",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-sm px-2.5 py-1 text-[10px] uppercase tracking-widest",
        tone[status] ?? "bg-cream text-charcoal"
      )}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
