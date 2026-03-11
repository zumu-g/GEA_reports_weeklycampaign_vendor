import { VendorReport } from "@/lib/types";

interface PortalBreakdownProps {
  report: VendorReport;
}

export default function PortalBreakdown({ report }: PortalBreakdownProps) {
  const reaTotal = report.reaViews + report.reaEnquiries + report.reaSaves;
  const domainTotal = report.domainViews + report.domainEnquiries + report.domainSaves;
  const maxTotal = Math.max(reaTotal, domainTotal, 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* realestate.com.au */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#e4002b]" />
          <h3 className="font-semibold text-sm text-foreground">realestate.com.au</h3>
        </div>
        <div className="space-y-4">
          <MetricRow label="Views" value={report.reaViews} />
          <MetricRow label="Enquiries" value={report.reaEnquiries} />
          <MetricRow label="Saves" value={report.reaSaves} />
          <MetricRow label="Search Appearances" value={report.reaSearchAppearances} />
        </div>
        {/* Activity bar */}
        <div className="mt-5 pt-4 border-t border-border-light">
          <div className="flex items-center justify-between text-xs text-muted mb-2">
            <span>Activity</span>
            <span>{reaTotal.toLocaleString()} total</span>
          </div>
          <div className="w-full bg-background-secondary rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-[#e4002b] transition-all duration-500"
              style={{ width: `${(reaTotal / maxTotal) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* domain.com.au */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00b14f]" />
          <h3 className="font-semibold text-sm text-foreground">domain.com.au</h3>
        </div>
        <div className="space-y-4">
          <MetricRow label="Views" value={report.domainViews} />
          <MetricRow label="Enquiries" value={report.domainEnquiries} />
          <MetricRow label="Saves" value={report.domainSaves} />
          <MetricRow label="Search Appearances" value={report.domainSearchAppearances} />
        </div>
        {/* Activity bar */}
        <div className="mt-5 pt-4 border-t border-border-light">
          <div className="flex items-center justify-between text-xs text-muted mb-2">
            <span>Activity</span>
            <span>{domainTotal.toLocaleString()} total</span>
          </div>
          <div className="w-full bg-background-secondary rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-[#00b14f] transition-all duration-500"
              style={{ width: `${(domainTotal / maxTotal) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-semibold text-foreground tabular-nums">
        {value.toLocaleString()}
      </span>
    </div>
  );
}
