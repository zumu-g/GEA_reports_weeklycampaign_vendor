import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import PropertyCard from "@/components/PropertyCard";
import { mockReports } from "@/lib/mock-data";

export default function Dashboard() {
  const reports = mockReports;

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Week heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Weekly Summary</h2>
          <p className="text-muted text-sm mt-1">
            Week ending 1 March 2026 &middot; {reports.length} active listings
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <StatCard label="REA Views" value={totalReaViews} subtitle="realestate.com.au" />
          <StatCard label="Domain Views" value={totalDomainViews} subtitle="domain.com.au" />
          <StatCard label="Total Enquiries" value={totalEnquiries} trend="up" subtitle="+12% vs last week" />
          <StatCard label="Open Home" value={totalOpenHome} subtitle="Total attendees" />
          <StatCard label="Private Insp." value={totalPrivate} subtitle="By appointment" />
          <StatCard label="Saves / Shortlists" value={totalSaves} trend="up" subtitle="+8% vs last week" />
        </div>

        {/* Property list */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-1">Vendor Reports</h2>
          <p className="text-muted text-sm">Click a property to view the full campaign report</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports.map((report) => (
            <PropertyCard key={report.id} report={report} />
          ))}
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-6 text-center text-sm text-muted">
        Grants Estate Agents &middot; Weekly Campaign & Vendor Reports
      </footer>
    </div>
  );
}
