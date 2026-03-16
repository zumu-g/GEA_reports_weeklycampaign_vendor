"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface WeekData {
  week: string;
  views: number;
  enquiries: number;
  saves: number;
}

interface TrendChartProps {
  data: WeekData[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-white rounded-xl border border-border-light px-4 py-3 shadow-lg">
      <p className="text-xs text-muted font-medium mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.value.toLocaleString()} {p.dataKey}
        </p>
      ))}
    </div>
  );
}

export default function TrendChart({ data }: TrendChartProps) {
  if (data.length < 2) return null;

  // Reverse so oldest is left, newest is right
  const chartData = [...data].reverse();

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
      <h3 className="text-base font-semibold text-foreground mb-1">Campaign Trends</h3>
      <p className="text-xs text-muted mb-5">Week-over-week performance</p>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="enquiriesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--success)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: "var(--muted)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="views"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#viewsGrad)"
              dot={{ r: 3, fill: "var(--primary)", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "var(--primary)", strokeWidth: 2, stroke: "white" }}
            />
            <Area
              type="monotone"
              dataKey="enquiries"
              stroke="var(--success)"
              strokeWidth={2}
              fill="url(#enquiriesGrad)"
              dot={{ r: 3, fill: "var(--success)", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "var(--success)", strokeWidth: 2, stroke: "white" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-5 mt-4 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
          <span className="text-xs text-muted">Views</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
          <span className="text-xs text-muted">Enquiries</span>
        </div>
      </div>
    </div>
  );
}
