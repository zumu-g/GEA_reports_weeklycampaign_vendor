interface ChecklistSectionProps {
  checklist: { task: string; done: boolean }[];
}

export default function ChecklistSection({ checklist }: ChecklistSectionProps) {
  const completed = checklist.filter((item) => item.done).length;
  const total = checklist.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-card-bg rounded-xl border border-border p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Campaign Checklist</h2>
        <span className="text-sm text-muted">
          {completed}/{total} completed ({percentage}%)
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-background rounded-full h-2 mb-5">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: percentage === 100 ? 'var(--color-success)' : 'var(--color-accent)',
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {checklist.map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${
                item.done
                  ? "bg-success/20 border-success text-success"
                  : "border-border bg-background"
              }`}
            >
              {item.done && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`text-sm ${item.done ? "text-muted line-through" : "text-foreground"}`}>
              {item.task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
