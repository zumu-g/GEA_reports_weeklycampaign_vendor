import { VendorReport } from "@/lib/types";

interface PortalBreakdownProps {
  report: VendorReport;
}

export default function PortalBreakdown({ report }: PortalBreakdownProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* realestate.com.au */}
      <div className="bg-card-bg rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <h3 className="font-bold text-lg">realestate.com.au</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-4">
            <p className="text-2xl font-bold">{report.reaViews.toLocaleString()}</p>
            <p className="text-sm text-muted">Property Views</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-2xl font-bold">{report.reaEnquiries}</p>
            <p className="text-sm text-muted">Enquiries</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-2xl font-bold">{report.reaSaves}</p>
            <p className="text-sm text-muted">Saves / Shortlists</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-2xl font-bold">{report.reaSearchAppearances.toLocaleString()}</p>
            <p className="text-sm text-muted">Search Appearances</p>
          </div>
        </div>
      </div>

      {/* domain.com.au */}
      <div className="bg-card-bg rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-green-600"></div>
          <h3 className="font-bold text-lg">domain.com.au</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-4">
            <p className="text-2xl font-bold">{report.domainViews.toLocaleString()}</p>
            <p className="text-sm text-muted">Property Views</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-2xl font-bold">{report.domainEnquiries}</p>
            <p className="text-sm text-muted">Enquiries</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-2xl font-bold">{report.domainSaves}</p>
            <p className="text-sm text-muted">Saves / Shortlists</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-2xl font-bold">{report.domainSearchAppearances.toLocaleString()}</p>
            <p className="text-sm text-muted">Search Appearances</p>
          </div>
        </div>
      </div>
    </div>
  );
}
