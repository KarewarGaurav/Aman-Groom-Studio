"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ADMIN_CHART_COLORS, adminChartMargin } from "@/components/admin/charts/AdminChartTheme";
import { cn, formatPrice } from "@/lib/utils";
import type { RevenueDataPoint } from "@/types/admin";

interface RevenueAreaChartProps {
  data: RevenueDataPoint[];
  compact?: boolean;
}

export function RevenueAreaChart({ data, compact }: RevenueAreaChartProps) {
  return (
    <div
      data-dash-chart
      className={cn(
        "admin-chart-wrap w-full",
        compact ? "h-[200px] sm:h-[220px]" : "h-[220px] sm:h-[260px] lg:h-[280px]"
      )}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={adminChartMargin}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ADMIN_CHART_COLORS.revenue} stopOpacity={0.35} />
              <stop offset="100%" stopColor={ADMIN_CHART_COLORS.revenue} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={ADMIN_CHART_COLORS.grid} vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: ADMIN_CHART_COLORS.axis, fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: ADMIN_CHART_COLORS.axis, fontSize: 10 }}
            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
            width={48}
          />
          <Tooltip
            contentStyle={{
              background: ADMIN_CHART_COLORS.tooltipBg,
              border: `1px solid ${ADMIN_CHART_COLORS.tooltipBorder}`,
              borderRadius: 12,
              fontSize: 12,
              boxShadow: "0 8px 32px rgba(42, 38, 36, 0.08)",
            }}
            formatter={(value: number) => [formatPrice(value), "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={ADMIN_CHART_COLORS.revenue}
            strokeWidth={2}
            fill="url(#revenueGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
