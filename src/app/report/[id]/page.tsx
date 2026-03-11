import { notFound } from "next/navigation";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import PortalBreakdown from "@/components/PortalBreakdown";
import Chat from "@/components/Chat";
import ChecklistSection from "@/components/ChecklistSection";
import InspectionHistory from "@/components/InspectionHistory";
import { ChartIllustration, PeopleIllustration, SearchIllustration, HeartIllustration, HouseIllustration } from "@/components/Illustrations";
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
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors duration-200 mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard
        </Link>

        {/* Property header */}
        <div className="mb-10">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-background-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
              <HouseIllustration className="w-7 h-7 text-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {report.propertyAddress}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="text-sm text-foreground-secondary">
                  {report.vendorName}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-sm text-muted">{report.agent}</span>
                {report.listingDate && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-sm text-muted">
                      Listed {new Date(report.listingDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xl font-bold text-foreground">
                  {report.askingPrice || "Price TBC"}
                </span>
                <span className="text-xs bg-background-secondary text-foreground-secondary px-3 py-1 rounded-full font-medium">
                  {report.campaignType || "TBC"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Latest update banner */}
        {property?.latestUpdate && (
          <div className="bg-primary-soft rounded-2xl px-5 py-4 mb-8">
            <p className="text-sm text-primary font-medium">{property.latestUpdate}</p>
          </div>
        )}

        {/* Week ending + days on market */}
        {report.weekEnding && (
          <div className="flex items-center gap-4 mb-8 text-sm">
            <span className="text-foreground font-medium">
              Week ending {new Date(report.weekEnding).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-muted">{report.daysOnMarket} days on market</span>
          </div>
        )}

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          <StatCard
            label="Total Views"
            value={totalViews}
            icon={<ChartIllustration className="w-4 h-4 text-muted" />}
          />
          <StatCard
            label="Enquiries"
            value={totalEnquiries}
            icon={<SearchIllustration className="w-4 h-4 text-muted" />}
          />
          <StatCard
            label="Saves"
            value={totalSaves}
            icon={<HeartIllustration className="w-4 h-4 text-muted" />}
          />
          <StatCard
            label="Open Home"
            value={report.openHomeAttendees}
            icon={<PeopleIllustration className="w-4 h-4 text-muted" />}
          />
          <StatCard
            label="Private"
            value={report.privateInspections}
            icon={<PeopleIllustration className="w-4 h-4 text-muted" />}
          />
        </div>

        {/* Portal breakdown */}
        {(report.reaViews > 0 || report.domainViews > 0) && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Portal Breakdown</h2>
            <PortalBreakdown report={report} />
          </div>
        )}

        {/* Campaign checklist */}
        {property && property.checklist.length > 0 && (
          <ChecklistSection checklist={property.checklist} />
        )}

        {/* Inspection history */}
        {property && property.inspections.length > 0 && (
          <InspectionHistory inspections={property.inspections} />
        )}

        {/* Inspections summary */}
        <div className="bg-white rounded-2xl border border-border-light p-6 mb-8">
          <h2 className="text-base font-semibold text-foreground mb-5">Inspections Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background-secondary rounded-2xl p-5 text-center">
              <PeopleIllustration className="w-8 h-8 text-muted mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">{report.openHomeAttendees}</p>
              <p className="text-xs text-muted mt-1 font-medium">Open Home Groups</p>
            </div>
            <div className="bg-background-secondary rounded-2xl p-5 text-center">
              <SearchIllustration className="w-8 h-8 text-muted mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">{report.privateInspections}</p>
              <p className="text-xs text-muted mt-1 font-medium">Private Inspections</p>
            </div>
            <div className="bg-background-secondary rounded-2xl p-5 text-center">
              <HouseIllustration className="w-8 h-8 text-muted mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">{report.openHomeAttendees + report.privateInspections}</p>
              <p className="text-xs text-muted mt-1 font-medium">Total Viewings</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border-light mt-20 py-8 text-center">
        <p className="text-xs text-muted">Grants Estate Agents</p>
      </footer>

      <Chat messages={report.messages} vendorName={report.vendorName} />
    </div>
  );
}
