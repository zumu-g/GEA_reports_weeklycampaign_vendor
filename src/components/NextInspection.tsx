import { InspectionRow } from "@/lib/markdown-loader";

interface NextInspectionProps {
  inspections: InspectionRow[];
}

export default function NextInspection({ inspections }: NextInspectionProps) {
  // Find the next upcoming inspection (date >= today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = inspections
    .filter(i => {
      const d = new Date(i.date);
      return d >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcoming.length === 0) return null;

  const next = upcoming[0];
  const inspDate = new Date(next.date);
  const dayName = inspDate.toLocaleDateString("en-AU", { weekday: "long" });
  const dateStr = inspDate.toLocaleDateString("en-AU", { day: "numeric", month: "long" });
  const daysUntil = Math.ceil((inspDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const urgencyLabel = daysUntil === 0
    ? "Today"
    : daysUntil === 1
    ? "Tomorrow"
    : `In ${daysUntil} days`;

  return (
    <div className="bg-success-soft rounded-2xl px-5 py-4 mb-6 flex items-center gap-4">
      <div className="w-12 h-12 bg-white rounded-xl flex flex-col items-center justify-center flex-shrink-0">
        <span className="text-[10px] font-bold text-success uppercase leading-tight">
          {inspDate.toLocaleDateString("en-AU", { month: "short" })}
        </span>
        <span className="text-lg font-bold text-foreground leading-tight">
          {inspDate.getDate()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">
          Next {next.type} — {dayName}, {dateStr}
        </p>
        <p className="text-xs text-muted mt-0.5">
          {urgencyLabel}{next.notes ? ` · ${next.notes}` : ""}
        </p>
      </div>
      {upcoming.length > 1 && (
        <span className="text-xs bg-white text-success px-3 py-1 rounded-full font-medium flex-shrink-0">
          +{upcoming.length - 1} more
        </span>
      )}
    </div>
  );
}
