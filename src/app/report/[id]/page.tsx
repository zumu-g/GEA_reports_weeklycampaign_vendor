import { notFound } from "next/navigation";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import PortalBreakdown from "@/components/PortalBreakdown";
import Chat from "@/components/Chat";
import ChecklistSection from "@/components/ChecklistSection";
import InspectionHistory from "@/components/InspectionHistory";
import { getProperty } from "@/lib/markdown-loader";
import { propertyToVendorReport } from "@/lib/data-adapter";
import { mockReports } from "@/lib/mock-data";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: PageProps) {
  const { id } = await params;

  // Try markdown first (id = slug), then fall back to mock data
  const property = await getProperty(id);
  const report = property
    ? propertyToVendorReport(property)
    : mockReports.find((r) => r.id === id);

  if (!report) {
    notFound();
  }

  const totalViews = report.reaViews + report.domainViews;
  const totalEnquiries = report.reaEnquiries + report.domainEnquiries;
  const totalSaves = report.reaSaves + report.domainSaves;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link href="/" className="text-sm text-primary hover:text-primary-light mb-6 inline-block">
          &larr; Back to Dashboard
        </Link>

        {/* Property header */}
        <div className="bg-card-bg rounded-xl border border-border p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{report.propertyAddress}</h1>
              <p className="text-muted mt-1">
                Vendor: <span className="font-medium text-foreground">{report.vendorName}</span>
              </p>
              <p className="text-muted text-sm">
                Agent: {report.agent}
                {report.listingDate && (
                  <> &middot; Listed {new Date(report.listingDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{report.askingPrice || "Price TBC"}</p>
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {report.campaignType || "TBC"}
              </span>
            </div>
          </div>
        </div>

        {/* Latest update */}
        {property?.latestUpdate && (
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-foreground">{property.latestUpdate}</p>
          </div>
        )}

        {/* Week ending */}
        {report.weekEnding && (
          <div className="mb-6">
            <h2 className="text-lg font-bold">
              Week Ending {new Date(report.weekEnding).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
            </h2>
            <p className="text-sm text-muted">{report.daysOnMarket} days on market</p>
          </div>
        )}

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total Views" value={totalViews} />
          <StatCard label="Total Enquiries" value={totalEnquiries} />
          <StatCard label="Saves / Shortlists" value={totalSaves} />
          <StatCard label="Open Home Attendees" value={report.openHomeAttendees} />
          <StatCard label="Private Inspections" value={report.privateInspections} />
        </div>

        {/* Portal breakdown */}
        {(report.reaViews > 0 || report.domainViews > 0) && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Portal Breakdown</h2>
            <PortalBreakdown report={report} />
          </div>
        )}

        {/* Campaign checklist - markdown properties only */}
        {property && property.checklist.length > 0 && (
          <ChecklistSection checklist={property.checklist} />
        )}

        {/* Inspection history - markdown properties only */}
        {property && property.inspections.length > 0 && (
          <InspectionHistory inspections={property.inspections} />
        )}

        {/* Inspections summary */}
        <div className="bg-card-bg rounded-xl border border-border p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold mb-4">Inspections Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-lg p-5">
              <p className="text-3xl font-bold">{report.openHomeAttendees}</p>
              <p className="text-sm text-muted mt-1">Open Home Attendees</p>
              <p className="text-xs text-muted mt-2">Groups through the property at scheduled open homes</p>
            </div>
            <div className="bg-background rounded-lg p-5">
              <p className="text-3xl font-bold">{report.privateInspections}</p>
              <p className="text-sm text-muted mt-1">Private Inspections</p>
              <p className="text-xs text-muted mt-2">By-appointment inspections with qualified buyers</p>
            </div>
            <div className="bg-background rounded-lg p-5">
              <p className="text-3xl font-bold">{report.openHomeAttendees + report.privateInspections}</p>
              <p className="text-sm text-muted mt-1">Total Inspections</p>
              <p className="text-xs text-muted mt-2">Combined open home and private viewings</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-6 text-center text-sm text-muted">
        Grants Estate Agents &middot; Weekly Campaign & Vendor Reports
      </footer>

      {/* Chat widget */}
      <Chat messages={report.messages} vendorName={report.vendorName} />
    </div>
  );
}
