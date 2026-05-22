"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ADMIN_CHART_COLORS, adminChartMargin } from "@/components/admin/charts/AdminChartTheme";
import type { RevenueDataPoint } from "@/types/admin";

interface OrdersBarChartProps {
  data: RevenueDataPoint[];
}

export function OrdersBarChart({ data }: OrdersBarChartProps) {
  return (
    <div data-dash-chart className="admin-chart-wrap h-[200px] w-full sm:h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={adminChartMargin}>
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
            width={32}
          />
          <Tooltip
            contentStyle={{
              background: ADMIN_CHART_COLORS.tooltipBg,
              border: `1px solid ${ADMIN_CHART_COLORS.tooltipBorder}`,
              borderRadius: 12,
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="orders"
            fill={ADMIN_CHART_COLORS.orders}
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
