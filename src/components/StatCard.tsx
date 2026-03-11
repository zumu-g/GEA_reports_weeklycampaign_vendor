interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, subtitle, trend, icon }: StatCardProps) {
  return (
    <div className="bg-background-secondary rounded-2xl p-5 transition-all duration-200 hover:bg-border-light/60">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-muted uppercase tracking-wide">{label}</p>
        {icon && <div className="text-muted">{icon}</div>}
      </div>
      <p className="text-3xl font-bold tracking-tight text-foreground">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {subtitle && (
        <p className={`text-xs mt-1.5 font-medium ${
          trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-muted"
        }`}>
          {trend === "up" && "↑ "}
          {trend === "down" && "↓ "}
          {subtitle}
        </p>
      )}
    </div>
  );
}
