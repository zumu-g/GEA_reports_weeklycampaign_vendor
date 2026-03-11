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
    <div className="bg-card-bg rounded-xl border border-border p-6 shadow-sm mb-8">
      <h2 className="text-lg font-bold mb-4">Inspection History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4 font-medium text-muted">Date</th>
              <th className="text-left py-2 pr-4 font-medium text-muted">Type</th>
              <th className="text-center py-2 pr-4 font-medium text-muted">Groups</th>
              <th className="text-left py-2 pr-4 font-medium text-muted">Interest</th>
              <th className="text-left py-2 font-medium text-muted">Notes</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((inspection, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-2.5 pr-4 whitespace-nowrap">{inspection.date}</td>
                <td className="py-2.5 pr-4">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      inspection.type.toLowerCase().includes("open")
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/20 text-accent"
                    }`}
                  >
                    {inspection.type}
                  </span>
                </td>
                <td className="py-2.5 pr-4 text-center font-semibold">{inspection.groups}</td>
                <td className="py-2.5 pr-4">
                  <span
                    className={`text-xs font-medium ${
                      inspection.interestLevel.toLowerCase().includes("high") || inspection.interestLevel.toLowerCase().includes("strong")
                        ? "text-success"
                        : inspection.interestLevel.toLowerCase().includes("low")
                          ? "text-danger"
                          : "text-warning"
                    }`}
                  >
                    {inspection.interestLevel}
                  </span>
                </td>
                <td className="py-2.5 text-muted">{inspection.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
