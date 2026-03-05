interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
}

export default function StatCard({ label, value, subtitle, trend }: StatCardProps) {
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-muted";

  return (
    <div className="bg-card-bg rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm text-muted font-medium">{label}</p>
      <p className="text-2xl font-bold mt-1">{typeof value === "number" ? value.toLocaleString() : value}</p>
      {subtitle && <p className={`text-xs mt-1 ${trendColor}`}>{subtitle}</p>}
    </div>
  );
}
