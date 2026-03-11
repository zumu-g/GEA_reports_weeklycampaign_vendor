import Link from "next/link";
import { VendorReport } from "@/lib/types";

interface PropertyCardProps {
  report: VendorReport;
}

export default function PropertyCard({ report }: PropertyCardProps) {
  const totalViews = report.reaViews + report.domainViews;
  const totalEnquiries = report.reaEnquiries + report.domainEnquiries;

  return (
    <Link href={`/report/${report.id}`}>
      <div className="bg-white rounded-2xl border border-border-light p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-200 truncate">
              {report.propertyAddress}
            </h3>
            <p className="text-sm text-muted mt-0.5">{report.vendorName}</p>
          </div>
          <span className="text-xs bg-background-secondary text-foreground-secondary px-3 py-1 rounded-full font-medium ml-3 flex-shrink-0">
            {report.campaignType}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-5 text-xs text-muted">
          <span>{report.agent}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{report.daysOnMarket} days on market</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-background-secondary rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-foreground">{totalViews.toLocaleString()}</p>
            <p className="text-[10px] text-muted font-medium uppercase tracking-wider mt-0.5">Views</p>
          </div>
          <div className="bg-background-secondary rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-foreground">{totalEnquiries}</p>
            <p className="text-[10px] text-muted font-medium uppercase tracking-wider mt-0.5">Enquiries</p>
          </div>
          <div className="bg-background-secondary rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-foreground">{report.openHomeAttendees}</p>
            <p className="text-[10px] text-muted font-medium uppercase tracking-wider mt-0.5">Open Home</p>
          </div>
          <div className="bg-background-secondary rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-foreground">{report.privateInspections}</p>
            <p className="text-[10px] text-muted font-medium uppercase tracking-wider mt-0.5">Private</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-border-light flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">{report.askingPrice}</span>
          <span className="text-xs text-primary font-medium group-hover:translate-x-0.5 transition-transform duration-200">
            View Report →
          </span>
        </div>
      </div>
    </Link>
  );
}
