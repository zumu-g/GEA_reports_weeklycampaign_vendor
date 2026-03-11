import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import PropertyCard from "@/components/PropertyCard";
import { ChartIllustration, PeopleIllustration, SearchIllustration, HeartIllustration, EmptyStateIllustration } from "@/components/Illustrations";
import { getAllProperties } from "@/lib/markdown-loader";
import { propertyToVendorReport } from "@/lib/data-adapter";
import { mockReports } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const properties = await getAllProperties();
  const markdownReports = properties.map(propertyToVendorReport);
  const reports = markdownReports.length > 0 ? markdownReports : mockReports;

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
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Campaign Dashboard
          </h2>
          <p className="text-foreground-secondary text-lg mt-2">
            {today}
          </p>
          <p className="text-muted text-sm mt-1">
            {reports.length} active listing{reports.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          <StatCard
            label="REA Views"
            value={totalReaViews}
            subtitle="realestate.com.au"
            icon={<ChartIllustration className="w-5 h-5 text-muted" />}
          />
          <StatCard
            label="Domain Views"
            value={totalDomainViews}
            subtitle="domain.com.au"
            icon={<ChartIllustration className="w-5 h-5 text-muted" />}
          />
          <StatCard
            label="Enquiries"
            value={totalEnquiries}
            icon={<SearchIllustration className="w-5 h-5 text-muted" />}
          />
          <StatCard
            label="Open Home"
            value={totalOpenHome}
            subtitle="Total groups"
            icon={<PeopleIllustration className="w-5 h-5 text-muted" />}
          />
          <StatCard
            label="Private"
            value={totalPrivate}
            subtitle="By appointment"
            icon={<PeopleIllustration className="w-5 h-5 text-muted" />}
          />
          <StatCard
            label="Saves"
            value={totalSaves}
            icon={<HeartIllustration className="w-5 h-5 text-muted" />}
          />
        </div>

        {/* Properties section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Properties</h2>
          <p className="text-muted text-sm mt-1">Click a property to view the full campaign report</p>
        </div>

        {reports.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {reports.map((report) => (
              <PropertyCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <EmptyStateIllustration className="w-24 h-24 text-border mx-auto mb-4" />
            <p className="text-muted text-sm">No properties yet</p>
          </div>
        )}
      </main>

      <footer className="border-t border-border-light mt-20 py-8 text-center">
        <p className="text-xs text-muted">
          Grants Estate Agents
        </p>
      </footer>
    </div>
  );
}
