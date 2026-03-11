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

export default function InspectionHistory({ inspections }: InspectionHistoryProps) {
  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
      <h2 className="text-base font-semibold text-foreground mb-5">Inspection History</h2>
      <div className="space-y-3">
        {inspections.map((inspection, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background-secondary">
            {/* Date badge */}
            <div className="flex-shrink-0 text-center min-w-[44px]">
              <p className="text-lg font-bold text-foreground leading-none">
                {inspection.date.split(" ")[0]}
              </p>
              <p className="text-[10px] text-muted uppercase font-medium mt-0.5">
                {inspection.date.split(" ").slice(1).join(" ") || ""}
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    inspection.type.toLowerCase().includes("open")
                      ? "bg-primary-soft text-primary"
                      : "bg-warning-soft text-warning"
                  }`}
                >
                  {inspection.type}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {inspection.groups} group{inspection.groups !== 1 ? "s" : ""}
                </span>
              </div>
              {inspection.notes && (
                <p className="text-sm text-muted mt-1">{inspection.notes}</p>
              )}
            </div>

            {/* Interest badge */}
            <div className="flex-shrink-0">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  inspection.interestLevel.toLowerCase().includes("high") || inspection.interestLevel.toLowerCase().includes("strong")
                    ? "bg-success-soft text-success"
                    : inspection.interestLevel.toLowerCase().includes("low")
                      ? "bg-danger-soft text-danger"
                      : "bg-warning-soft text-warning"
                }`}
              >
                {inspection.interestLevel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
