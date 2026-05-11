interface StatCardProps {
  label: string;
  value: number;
  subtitle?: string;
}

export default function StatCard({ label, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-card-bg rounded-[18px] border border-border p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <div className="h-0.5 w-8 bg-accent rounded-full mb-4" />
      <p className="font-mono text-3xl font-medium text-foreground tabular-nums">
        {value.toLocaleString()}
      </p>
      <p className="font-body text-sm text-muted mt-1 font-medium">{label}</p>
      {subtitle && (
        <p className="font-body text-xs text-muted/70 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
