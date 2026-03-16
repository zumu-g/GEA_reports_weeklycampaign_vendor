import { CommunicationRow } from "@/lib/markdown-loader";

interface CommunicationsLogProps {
  communications: CommunicationRow[];
}

function typeIcon(type: string) {
  const t = type.toLowerCase();
  if (t.includes("email") || t.includes("gmail")) return "✉";
  if (t.includes("phone") || t.includes("call")) return "📞";
  if (t.includes("sms") || t.includes("text")) return "💬";
  if (t.includes("portal")) return "🌐";
  if (t.includes("meeting") || t.includes("visit")) return "🤝";
  return "📋";
}

export default function CommunicationsLog({ communications }: CommunicationsLogProps) {
  if (communications.length === 0) return null;

  // Show most recent 5
  const recent = communications.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-foreground">Activity Log</h3>
        <span className="text-xs text-muted">{communications.length} entries</span>
      </div>
      <div className="space-y-0">
        {recent.map((comm, i) => (
          <div key={i} className="flex items-start gap-3 py-3 border-b border-border-light last:border-0">
            <div className="w-8 h-8 bg-background-secondary rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              {typeIcon(comm.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{comm.summary}</p>
              <p className="text-xs text-muted mt-0.5">
                {comm.date}{comm.type ? ` · ${comm.type}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
