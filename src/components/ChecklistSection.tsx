interface ChecklistSectionProps {
  checklist: { task: string; done: boolean }[];
}

export default function ChecklistSection({ checklist }: ChecklistSectionProps) {
  const completed = checklist.filter((item) => item.done).length;
  const total = checklist.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-foreground">Campaign Checklist</h2>
          <p className="text-xs text-muted mt-0.5">{completed} of {total} tasks completed</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground tabular-nums">{percentage}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-background-secondary rounded-full h-2 mb-6">
        <div
          className="h-2 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: percentage === 100 ? 'var(--success)' : 'var(--primary)',
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {checklist.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-colors duration-200 ${
              item.done ? "opacity-60" : "hover:bg-background-secondary"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                item.done
                  ? "bg-success"
                  : "border-2 border-border"
              }`}
            >
              {item.done && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
