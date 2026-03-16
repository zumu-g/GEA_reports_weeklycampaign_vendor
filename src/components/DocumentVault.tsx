interface DocumentItem {
  name: string;
  category: string;
  status: string;
  url?: string;
}

interface DocumentVaultProps {
  documents: DocumentItem[];
}

function categoryIcon(category: string) {
  const c = category.toLowerCase();
  if (c.includes("contract") || c.includes("legal")) return "📄";
  if (c.includes("section 32") || c.includes("vendor statement")) return "⚖️";
  if (c.includes("photo") || c.includes("marketing")) return "📸";
  if (c.includes("report") || c.includes("inspect")) return "🔍";
  if (c.includes("authority")) return "✍️";
  if (c.includes("invoice") || c.includes("receipt")) return "🧾";
  return "📋";
}

function statusBadge(status: string) {
  const s = status.toLowerCase();
  if (s.includes("ready") || s.includes("complete") || s.includes("uploaded"))
    return { bg: "bg-success-soft", text: "text-success", label: status };
  if (s.includes("pending") || s.includes("progress"))
    return { bg: "bg-warning-soft", text: "text-warning", label: status };
  if (s.includes("required") || s.includes("needed"))
    return { bg: "bg-danger-soft", text: "text-danger", label: status };
  return { bg: "bg-background-secondary", text: "text-muted", label: status };
}

export default function DocumentVault({ documents }: DocumentVaultProps) {
  if (documents.length === 0) return null;

  // Group by category
  const grouped = documents.reduce<Record<string, DocumentItem[]>>((acc, doc) => {
    const cat = doc.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(doc);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-foreground">Documents</h3>
        <span className="text-xs text-muted">
          {documents.filter(d => d.status.toLowerCase().includes("ready") || d.status.toLowerCase().includes("complete")).length}/{documents.length} ready
        </span>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([category, docs]) => (
          <div key={category}>
            <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">{category}</p>
            <div className="space-y-2">
              {docs.map((doc, i) => {
                const badge = statusBadge(doc.status);
                return (
                  <div key={i} className="flex items-center gap-3 bg-background-secondary rounded-xl px-4 py-3">
                    <span className="text-base flex-shrink-0">{categoryIcon(category)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                    </div>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${badge.bg} ${badge.text} flex-shrink-0`}>
                      {badge.label}
                    </span>
                    {doc.url && (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white hover:bg-border-light flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                        aria-label={`Download ${doc.name}`}
                      >
                        <svg className="w-3.5 h-3.5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
