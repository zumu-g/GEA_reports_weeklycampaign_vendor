interface InspectionRow {
  date: string;
  type: string;
  groups: number;
  interestLevel: string;
  notes: string;
}

interface InspectionHistoryProps {
  inspections: InspectionRow[];
}

function interestBadgeClasses(level: string): string {
  const l = level.toLowerCase();
  if (l.includes("high") || l.includes("strong")) {
    return "bg-accent/20 text-foreground";
  }
  return "bg-surface text-muted";
}

function typeBadgeClasses(type: string): string {
  return type.toLowerCase().includes("open")
    ? "bg-primary/10 text-foreground"
    : "bg-accent/15 text-foreground";
}

export default function InspectionHistory({ inspections }: InspectionHistoryProps) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-xl font-medium text-foreground mb-4">
        Inspection History
      </h2>

      <div className="bg-card-bg rounded-[18px] border border-border shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden">
        {inspections.map((inspection, i) => (
          <div
            key={i}
            className="px-6 py-4 border-b border-border last:border-0 flex justify-between items-center gap-4"
          >
            {/* Left: date + type badge */}
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="font-mono text-sm font-medium text-foreground">
                {inspection.date}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium font-body ${typeBadgeClasses(
                    inspection.type
                  )}`}
                >
                  {inspection.type}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium font-body ${interestBadgeClasses(
                    inspection.interestLevel
                  )}`}
                >
                  {inspection.interestLevel}
                </span>
              </div>
              {inspection.notes && (
                <p className="font-body text-xs text-muted leading-snug mt-0.5 truncate max-w-xs">
                  {inspection.notes}
                </p>
              )}
            </div>

            {/* Right: group count */}
            <div className="text-right flex-shrink-0">
              <p className="font-mono font-medium text-foreground text-xl tabular-nums">
                {inspection.groups}
              </p>
              <p className="font-body text-xs text-muted mt-0.5">
                {inspection.groups === 1 ? "group" : "groups"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
