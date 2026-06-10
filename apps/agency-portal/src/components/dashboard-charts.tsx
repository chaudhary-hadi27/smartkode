"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";

const data = [
  { name: "Jan", leads: 4, value: 2400 },
  { name: "Feb", leads: 7, value: 4398 },
  { name: "Mar", leads: 5, value: 3800 },
  { name: "Apr", leads: 12, value: 8900 },
  { name: "May", leads: 8, value: 6800 },
  { name: "Jun", leads: 15, value: 11200 },
  { name: "Jul", leads: 10, value: 8500 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="name" 
          stroke="#52525b" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          dy={10} 
        />
        <YAxis 
          stroke="#52525b" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `$${value}`} 
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#000000", border: "1px solid #ffffff", borderRadius: "8px" }}
          itemStyle={{ color: "#ffffff" }}
          labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
        />
        <Area type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LeadsChart() {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="leads" fill="#ffffff" radius={[4, 4, 0, 0]} />
        <Tooltip
          cursor={{ fill: "#27272a" }}
          contentStyle={{ backgroundColor: "#000000", border: "1px solid #ffffff", borderRadius: "8px" }}
          itemStyle={{ color: "#ffffff" }}
          labelStyle={{ display: "none" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
