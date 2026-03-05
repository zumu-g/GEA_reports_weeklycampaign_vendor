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
      <div className="bg-card-bg rounded-xl border border-border p-6 shadow-sm hover:shadow-lg hover:border-accent transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg">{report.propertyAddress}</h3>
            <p className="text-sm text-muted">{report.vendorName}</p>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
            {report.campaignType}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted">Agent: {report.agent}</span>
          <span className="text-muted">|</span>
          <span className="text-sm text-muted">{report.daysOnMarket} days on market</span>
        </div>

        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xl font-bold">{totalViews.toLocaleString()}</p>
            <p className="text-xs text-muted">Total Views</p>
          </div>
          <div>
            <p className="text-xl font-bold">{totalEnquiries}</p>
            <p className="text-xs text-muted">Enquiries</p>
          </div>
          <div>
            <p className="text-xl font-bold">{report.openHomeAttendees}</p>
            <p className="text-xs text-muted">Open Home</p>
          </div>
          <div>
            <p className="text-xl font-bold">{report.privateInspections}</p>
            <p className="text-xs text-muted">Private Insp.</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-primary">{report.askingPrice}</span>
          <span className="text-xs text-accent font-medium">View Full Report →</span>
        </div>
      </div>
    </Link>
  );
}
