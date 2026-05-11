import Link from "next/link";
import { VendorReport, WeeklyDraft } from "@/lib/types";

interface PropertyCardProps {
  report: VendorReport;
  draft?: WeeklyDraft | null;
}

export default function PropertyCard({ report, draft }: PropertyCardProps) {
  const totalViews = report.reaViews + report.domainViews;
  const totalEnquiries = report.reaEnquiries + report.domainEnquiries;
  const linkId = draft ? draft.id : report.id;
  const isDraft = draft?.status === "draft";

  return (
    <Link href={`/report/${linkId}`} className="block group">
      <div className="bg-card-bg rounded-[18px] border border-border p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-200 cursor-pointer">

        {/* Top section: address + badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-medium text-foreground leading-snug">
              {report.propertyAddress}
            </h3>
            <p className="font-body text-sm text-muted mt-1">{report.vendorName}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isDraft && (
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold font-body uppercase tracking-wider bg-accent/15 text-accent border border-accent/30">
                Draft
              </span>
            )}
            <span className="rounded-full px-3 py-1 text-xs font-medium font-body bg-surface text-foreground border border-border whitespace-nowrap">
              {report.campaignType}
            </span>
          </div>
        </div>

        {/* Asking price */}
        <p className="font-mono text-2xl font-medium text-foreground mt-3 tabular-nums">
          {report.askingPrice}
        </p>

        <div className="border-t border-border my-4" />

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3">
          <div>
            <p className="font-mono font-medium text-foreground text-sm tabular-nums">
              {totalViews.toLocaleString()}
            </p>
            <p className="font-body text-xs text-muted mt-0.5">Total Views</p>
          </div>
          <div>
            <p className="font-mono font-medium text-foreground text-sm tabular-nums">
              {totalEnquiries}
            </p>
            <p className="font-body text-xs text-muted mt-0.5">Enquiries</p>
          </div>
          <div>
            <p className="font-mono font-medium text-foreground text-sm tabular-nums">
              {report.openHomeAttendees}
            </p>
            <p className="font-body text-xs text-muted mt-0.5">Open Home</p>
          </div>
          <div>
            <p className="font-mono font-medium text-foreground text-sm tabular-nums">
              {report.privateInspections}
            </p>
            <p className="font-body text-xs text-muted mt-0.5">Private Insp.</p>
          </div>
        </div>

        <div className="border-t border-border my-4" />

        {/* Footer: agent + days on market */}
        <div className="flex items-center justify-between">
          <p className="font-body text-xs text-muted">{report.agent}</p>
          <p className="font-body text-xs text-muted">
            {report.daysOnMarket} days on market
          </p>
        </div>
      </div>
    </Link>
  );
}
