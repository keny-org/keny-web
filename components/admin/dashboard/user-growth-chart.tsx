"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface UserGrowthChartProps {
  data: Array<{ date: string; count: number }>;
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <div className="bg-card p-6 border">
      <h3 className="text-lg font-bold mb-6">
        Crescimento de Usuários (30 dias)
      </h3>
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="date"
              stroke="var(--muted-foreground)"
              fontSize={12}
            />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--info)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--info)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
