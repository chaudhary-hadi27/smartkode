"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data: {
    month: string;
    revenue: number;
    agencyCut: number;
    techCut: number;
  }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dy={10}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
          dx={-10}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#111", borderColor: "#333", borderRadius: "8px" }}
          itemStyle={{ color: "#fff" }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Net Profit"
          stroke="#f59e0b" // amber-500
          strokeWidth={3}
          dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="techCut"
          name="Tech Payouts"
          stroke="#3b82f6" // blue-500
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="agencyCut"
          name="Agency Payouts"
          stroke="#10b981" // emerald-500
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
