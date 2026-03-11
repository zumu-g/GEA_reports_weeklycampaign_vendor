import { notFound } from "next/navigation";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import PortalBreakdown from "@/components/PortalBreakdown";
import Chat from "@/components/Chat";
import ChecklistSection from "@/components/ChecklistSection";
import InspectionHistory from "@/components/InspectionHistory";
import OffersReceived from "@/components/OffersReceived";
import WeeklyTargets from "@/components/WeeklyTargets";
import { ChartIllustration, PeopleIllustration, SearchIllustration, HeartIllustration, HouseIllustration } from "@/components/Illustrations";
import { getProperty } from "@/lib/markdown-loader";
import { propertyToVendorReport } from "@/lib/data-adapter";
import { mockReports } from "@/lib/mock-data";

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
  const totalInspections = report.openHomeAttendees + report.privateInspections;

  // Calculate days on market display
  const daysLabel = report.daysOnMarket > 0
    ? `${report.daysOnMarket} days on market`
    : "Just listed";

  // Get owner first name for greeting
  const ownerFirstName = report.vendorName?.split(" ")[0] || "";

  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="bg-background-secondary border-b border-border-light">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-14">
          {/* Greeting */}
          <p className="text-sm text-muted mb-1">{today}</p>
          {ownerFirstName && (
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-1">
              Hi {ownerFirstName}
            </h1>
          )}
          <p className="text-foreground-secondary text-base mb-8">
            Here&apos;s the latest on your campaign.
          </p>

          {/* Property card */}
          <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Left: Address & details */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-background-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <HouseIllustration className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    {report.propertyAddress}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs bg-background-secondary text-foreground-secondary px-3 py-1 rounded-full font-medium">
                      {report.campaignType || "TBC"}
                    </span>
                    <span className="text-xs text-muted">{daysLabel}</span>
                  </div>
                  {report.listingDate && (
                    <p className="text-xs text-muted mt-2">
                      Listed {new Date(report.listingDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                      {report.agent && <> &middot; Agent: {report.agent}</>}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Price */}
              <div className="md:text-right flex-shrink-0">
                <p className="text-sm text-muted mb-1">Price Guide</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  {report.askingPrice || "TBC"}
                </p>
              </div>
            </div>

            {/* Quick stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 pt-6 border-t border-border-light">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">{totalViews.toLocaleString()}</p>
                <p className="text-[11px] text-muted font-medium uppercase tracking-wider mt-1">Online Views</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">{totalEnquiries}</p>
                <p className="text-[11px] text-muted font-medium uppercase tracking-wider mt-1">Enquiries</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">{totalSaves}</p>
                <p className="text-[11px] text-muted font-medium uppercase tracking-wider mt-1">Saves</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">{totalInspections}</p>
                <p className="text-[11px] text-muted font-medium uppercase tracking-wider mt-1">Inspections</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTENT ═══════════════════ */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Latest update banner */}
        {property?.latestUpdate && (
          <div className="bg-primary-soft rounded-2xl px-5 py-4 mb-8 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <p className="text-sm text-primary font-medium">{property.latestUpdate}</p>
          </div>
        )}

        {/* Weekly targets with running totals */}
        {property && property.targets && (
          (() => {
            const latest = property.analytics[0];
            const cumViews = property.analytics.reduce((s, a) => s + a.reaViews + a.domainViews, 0);
            const cumEnquiries = property.analytics.reduce((s, a) => s + a.reaEnquiries + a.domainEnquiries, 0);
            const cumInspections = property.inspections.reduce((s, i) => s + i.groups, 0);
            const listedDate = property.listed ? new Date(property.listed) : new Date();
            const weeksElapsed = Math.max(1, Math.ceil((Date.now() - listedDate.getTime()) / (7 * 24 * 60 * 60 * 1000)));

            return (
              <WeeklyTargets
                targets={property.targets}
                actual={{
                  views: latest ? latest.reaViews + latest.domainViews : 0,
                  enquiries: latest ? latest.reaEnquiries + latest.domainEnquiries : 0,
                  inspections: property.inspections.length > 0 ? property.inspections[0].groups : 0,
                }}
                cumulative={{
                  views: cumViews,
                  enquiries: cumEnquiries,
                  inspections: cumInspections,
                }}
                weeksElapsed={weeksElapsed}
              />
            );
          })()
        )}

        {/* Week context */}
        {report.weekEnding && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground">
              Weekly Performance
            </h3>
            <p className="text-sm text-muted mt-0.5">
              Week ending {new Date(report.weekEnding).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        )}

        {/* Detailed metrics */}
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
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-foreground mb-4">Where buyers are finding you</h3>
            <PortalBreakdown report={report} />
          </div>
        )}

        {/* Offers received */}
        {property && (
          <OffersReceived offers={property.offers} />
        )}

        {/* Campaign checklist */}
        {property && property.checklist.length > 0 && (
          <ChecklistSection checklist={property.checklist} />
        )}

        {/* Inspection history */}
        {property && property.inspections.length > 0 && (
          <InspectionHistory inspections={property.inspections} />
        )}

        {/* Inspections overview */}
        <div className="bg-white rounded-2xl border border-border-light p-6 mb-8">
          <h3 className="text-base font-semibold text-foreground mb-5">Inspections Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background-secondary rounded-2xl p-6 text-center">
              <PeopleIllustration className="w-8 h-8 text-muted mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">{report.openHomeAttendees}</p>
              <p className="text-xs text-muted mt-1 font-medium">Open Home Groups</p>
            </div>
            <div className="bg-background-secondary rounded-2xl p-6 text-center">
              <SearchIllustration className="w-8 h-8 text-muted mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">{report.privateInspections}</p>
              <p className="text-xs text-muted mt-1 font-medium">Private Inspections</p>
            </div>
            <div className="bg-background-secondary rounded-2xl p-6 text-center">
              <HouseIllustration className="w-8 h-8 text-muted mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">{totalInspections}</p>
              <p className="text-xs text-muted mt-1 font-medium">Total Viewings</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border-light mt-10 py-8 text-center">
        <p className="text-xs text-muted">
          Grants Estate Agents &middot; Your campaign, updated live
        </p>
      </footer>

      <Chat messages={report.messages} vendorName={report.vendorName} />
    </div>
  );
}
