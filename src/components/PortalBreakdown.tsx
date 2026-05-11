import { VendorReport } from "@/lib/types";

interface PortalBreakdownProps {
  report: VendorReport;
}

interface PortalPanelProps {
  name: string;
  dotColor: string;
  borderColor: string;
  stats: { label: string; value: number }[];
}

function PortalPanel({ name, dotColor, borderColor, stats }: PortalPanelProps) {
  return (
    <div
      className={`bg-card-bg rounded-[18px] border border-border shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden ${borderColor}`}
    >
      {/* Coloured top strip */}
      <div className={`h-0.5 w-full ${borderColor === "border-t-2 border-red-500" ? "bg-red-500" : "bg-emerald-500"}`} />

      <div className="p-6">
        {/* Portal name */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: dotColor }}
          />
          <span className="font-body font-semibold text-sm text-foreground tracking-wide">
            {name}
          </span>
        </div>

        {/* 2×2 stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ label, value }) => (
            <div key={label} className="bg-background rounded-xl p-4">
              <p className="font-mono text-2xl font-medium tabular-nums text-foreground leading-none">
                {value.toLocaleString()}
              </p>
              <p className="font-body text-xs text-muted mt-0.5 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortalBreakdown({ report }: PortalBreakdownProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <PortalPanel
        name="realestate.com.au"
        dotColor="#EF4444"
        borderColor="border-t-2 border-red-500"
        stats={[
          { label: "Views", value: report.reaViews },
          { label: "Enquiries", value: report.reaEnquiries },
          { label: "Saves", value: report.reaSaves },
          { label: "Search Appearances", value: report.reaSearchAppearances },
        ]}
      />
      <PortalPanel
        name="domain.com.au"
        dotColor="#10B981"
        borderColor="border-t-2 border-emerald-500"
        stats={[
          { label: "Views", value: report.domainViews },
          { label: "Enquiries", value: report.domainEnquiries },
          { label: "Saves", value: report.domainSaves },
          { label: "Search Appearances", value: report.domainSearchAppearances },
        ]}
      />
    </div>
  );
}
