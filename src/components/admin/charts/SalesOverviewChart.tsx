"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { ADMIN_CHART_COLORS, adminChartMargin } from "@/components/admin/charts/AdminChartTheme";
import { formatPrice } from "@/lib/utils";
import type { RevenueDataPoint } from "@/types/admin";

export function SalesOverviewChart({ data }: { data: RevenueDataPoint[] }) {
  return (
    <div data-dash-chart className="admin-chart-wrap h-[240px] w-full sm:h-[280px] lg:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ ...adminChartMargin, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={ADMIN_CHART_COLORS.grid} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: ADMIN_CHART_COLORS.axis, fontSize: 11 }}
          />
          <YAxis
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: ADMIN_CHART_COLORS.axis, fontSize: 10 }}
            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: ADMIN_CHART_COLORS.axis, fontSize: 10 }}
          />
          <Tooltip
            contentStyle={{
              background: ADMIN_CHART_COLORS.tooltipBg,
              border: `1px solid ${ADMIN_CHART_COLORS.tooltipBorder}`,
              borderRadius: 12,
              fontSize: 12,
            }}
            formatter={(value: number, name: string) =>
              name === "revenue" ? [formatPrice(value), "Revenue"] : [value, "Orders"]
            }
          />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            formatter={(v) => (
              <span className="font-body text-charcoalsoft capitalize">{v}</span>
            )}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            stroke={ADMIN_CHART_COLORS.revenue}
            strokeWidth={2}
            dot={{ fill: ADMIN_CHART_COLORS.revenue, r: 3 }}
            name="revenue"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="orders"
            stroke={ADMIN_CHART_COLORS.orders}
            strokeWidth={2}
            dot={{ fill: ADMIN_CHART_COLORS.orders, r: 3 }}
            name="orders"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
