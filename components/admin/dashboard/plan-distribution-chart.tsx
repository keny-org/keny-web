"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "var(--info)",
  "var(--primary)",
  "var(--warning)",
  "var(--destructive)",
];

interface PlanDistributionChartProps {
  data: Array<{ plan: string; count: number }>;
}

export function PlanDistributionChart({ data }: PlanDistributionChartProps) {
  return (
    <div className="bg-card p-6 border">
      <h3 className="text-lg font-bold mb-6">Distribuição de Planos</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
              nameKey="plan"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
