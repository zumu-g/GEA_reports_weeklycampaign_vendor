import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import PropertyCard from "@/components/PropertyCard";
import GenerateDraftsButton from "@/components/GenerateDraftsButton";
import { getAllProperties } from "@/lib/markdown-loader";
import { propertyToVendorReport } from "@/lib/data-adapter";
import { getAllWeeklyDrafts, getComingWeekEnding } from "@/lib/weekly-drafts";
import { mockReports } from "@/lib/mock-data";
import { WeeklyDraft } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  // Load properties from markdown files
  const properties = await getAllProperties();
  const markdownReports = properties.map(propertyToVendorReport);

  // Combine: markdown properties first, then mock data as fallback demo
  const reports = markdownReports.length > 0 ? markdownReports : mockReports;

  // Load this week's drafts and map by property slug
  const currentWeekEnding = getComingWeekEnding();
  const weeklyDrafts = await getAllWeeklyDrafts(currentWeekEnding);
  const draftMap = new Map<string, WeeklyDraft>(weeklyDrafts.map((d) => [d.propertySlug, d]));

  const pendingCount = weeklyDrafts.filter((d) => d.status === "draft").length;

  const totalReaViews = reports.reduce((sum, r) => sum + r.reaViews, 0);
  const totalDomainViews = reports.reduce((sum, r) => sum + r.domainViews, 0);
  const totalEnquiries = reports.reduce(
    (sum, r) => sum + r.reaEnquiries + r.domainEnquiries,
    0
  );
  const totalOpenHome = reports.reduce((sum, r) => sum + r.openHomeAttendees, 0);
  const totalPrivate = reports.reduce((sum, r) => sum + r.privateInspections, 0);
  const totalSaves = reports.reduce(
    (sum, r) => sum + r.reaSaves + r.domainSaves,
    0
  );

  const today = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-10 py-12">

        {/* Week heading */}
        <div className="mb-10">
          <h2 className="font-display text-3xl font-medium text-foreground">
            Campaign Dashboard
          </h2>
          <p className="font-body text-sm text-muted mt-1">
            {today} &middot; {reports.length} active listing{reports.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <StatCard label="REA Views" value={totalReaViews} subtitle="realestate.com.au" />
          <StatCard label="Domain Views" value={totalDomainViews} subtitle="domain.com.au" />
          <StatCard label="Total Enquiries" value={totalEnquiries} />
          <StatCard label="Open Home" value={totalOpenHome} subtitle="Total attendees" />
          <StatCard label="Private Insp." value={totalPrivate} subtitle="By appointment" />
          <StatCard label="Saves / Shortlists" value={totalSaves} />
        </div>

        <div className="border-t border-border my-8" />

        {/* Vendor Reports heading + draft controls */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl font-medium text-foreground">
              Vendor Reports
            </h2>
            <p className="font-body text-sm text-muted mt-1">
              {pendingCount > 0 ? (
                <span>
                  <span className="inline-block w-2 h-2 rounded-full bg-accent mr-1.5 align-middle" />
                  {pendingCount} report{pendingCount !== 1 ? "s" : ""} pending approval
                </span>
              ) : (
                "Select a property to view the full campaign report"
              )}
            </p>
          </div>
          <GenerateDraftsButton weekEnding={currentWeekEnding} />
        </div>

        {/* Property grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports.map((report) => (
            <PropertyCard
              key={report.id}
              report={report}
              draft={draftMap.get(report.id) ?? null}
            />
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted font-body">
        Grants Estate Agents &middot; Weekly Campaign &amp; Vendor Reports
      </footer>
    </div>
  );
}
