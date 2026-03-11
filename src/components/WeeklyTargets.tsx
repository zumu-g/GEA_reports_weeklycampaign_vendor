interface WeeklyTargetsProps {
  targets: { views: number; enquiries: number; inspections: number };
  actual: { views: number; enquiries: number; inspections: number };
  cumulative: { views: number; enquiries: number; inspections: number };
  weeksElapsed: number;
}

function ProgressRing({ percentage, size = 56 }: { percentage: number; size?: number }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const capped = Math.min(percentage, 100);
  const offset = circumference - (capped / 100) * circumference;
  const color = percentage >= 100 ? "var(--success)" : percentage >= 60 ? "var(--primary)" : "var(--warning)";

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--border-light)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

export default function WeeklyTargets({ targets, actual, cumulative, weeksElapsed }: WeeklyTargetsProps) {
  const hasTargets = targets.views > 0 || targets.enquiries > 0 || targets.inspections > 0;
  if (!hasTargets) return null;

  const cumulativeTargets = {
    views: targets.views * weeksElapsed,
    enquiries: targets.enquiries * weeksElapsed,
    inspections: targets.inspections * weeksElapsed,
  };

  const metrics = [
    {
      label: "Views",
      thisWeek: actual.views,
      weekTarget: targets.views,
      total: cumulative.views,
      totalTarget: cumulativeTargets.views,
    },
    {
      label: "Enquiries",
      thisWeek: actual.enquiries,
      weekTarget: targets.enquiries,
      total: cumulative.enquiries,
      totalTarget: cumulativeTargets.enquiries,
    },
    {
      label: "Inspections",
      thisWeek: actual.inspections,
      weekTarget: targets.inspections,
      total: cumulative.inspections,
      totalTarget: cumulativeTargets.inspections,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-foreground">Campaign Targets</h3>
        <span className="text-xs text-muted">
          {weeksElapsed} week{weeksElapsed !== 1 ? "s" : ""} in campaign
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((m) => {
          const weekPct = m.weekTarget > 0 ? Math.round((m.thisWeek / m.weekTarget) * 100) : 0;
          const totalPct = m.totalTarget > 0 ? Math.round((m.total / m.totalTarget) * 100) : 0;

          return (
            <div key={m.label} className="bg-background-secondary rounded-2xl p-5">
              {/* This week ring + number */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <ProgressRing percentage={weekPct} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground">{weekPct}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-medium">{m.label}</p>
                  <p className="text-lg font-bold text-foreground">
                    {m.thisWeek.toLocaleString()}
                    <span className="text-sm font-normal text-muted"> / {m.weekTarget.toLocaleString()}</span>
                  </p>
                  <p className="text-[11px] text-muted">this week</p>
                </div>
              </div>

              {/* Running total */}
              <div className="border-t border-border-light pt-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted">Campaign total</span>
                  <span className="text-xs font-semibold text-foreground tabular-nums">
                    {m.total.toLocaleString()} / {m.totalTarget.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-border-light rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(totalPct, 100)}%`,
                      backgroundColor: totalPct >= 100 ? 'var(--success)' : totalPct >= 60 ? 'var(--primary)' : 'var(--warning)',
                    }}
                  />
                </div>
                <p className="text-[10px] text-muted mt-1">{totalPct}% of target</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
