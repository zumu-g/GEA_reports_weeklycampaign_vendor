interface ChecklistItem {
  task: string;
  done: boolean;
}

interface CampaignChecklistProps {
  items: ChecklistItem[];
}

export default function CampaignChecklist({ items }: CampaignChecklistProps) {
  const completed = items.filter(i => i.done).length;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-medium text-foreground">Campaign Checklist</h2>
        <span className="font-mono text-sm text-muted tabular-nums">
          {completed}/{items.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-surface rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all"
          style={{ width: `${items.length ? (completed / items.length) * 100 : 0}%` }}
        />
      </div>

      <div className="bg-card-bg rounded-[18px] border border-border shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden">
        {items.map((item, i) => (
          <div
            key={i}
            className="px-5 py-3.5 border-b border-border last:border-0 flex items-center gap-3"
          >
            <span
              className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                item.done
                  ? 'bg-accent border-accent'
                  : 'bg-transparent border-border'
              }`}
            >
              {item.done && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span
              className={`font-body text-sm ${
                item.done ? 'text-foreground' : 'text-muted'
              }`}
            >
              {item.task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
