import { notFound } from 'next/navigation';
import { getPropertySlugForToken } from '@/lib/vendor-tokens';
import { getProperty } from '@/lib/markdown-loader';
import VendorHeader from '@/components/vendor/VendorHeader';
import CampaignChecklist from '@/components/vendor/CampaignChecklist';
import CommunicationsLog from '@/components/vendor/CommunicationsLog';
import InspectionHistory from '@/components/InspectionHistory';
import StatCard from '@/components/StatCard';

function calcDaysOnMarket(listed: string): number {
  if (!listed) return 0;
  // Handle formats like "15 Feb 2026" or "2026-02-15"
  const parsed = new Date(listed);
  if (isNaN(parsed.getTime())) return 0;
  return Math.max(0, Math.floor((Date.now() - parsed.getTime()) / 86_400_000));
}

function sumAnalytics(analytics: { reaViews: number; reaEnquiries: number; reaSaves: number; domainViews: number; domainEnquiries: number; domainSaves: number }[]) {
  return analytics.reduce(
    (acc, row) => ({
      reaViews: acc.reaViews + row.reaViews,
      reaEnquiries: acc.reaEnquiries + row.reaEnquiries,
      reaSaves: acc.reaSaves + row.reaSaves,
      domainViews: acc.domainViews + row.domainViews,
      domainEnquiries: acc.domainEnquiries + row.domainEnquiries,
      domainSaves: acc.domainSaves + row.domainSaves,
    }),
    { reaViews: 0, reaEnquiries: 0, reaSaves: 0, domainViews: 0, domainEnquiries: 0, domainSaves: 0 }
  );
}

export default async function VendorDashboard({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const slug = getPropertySlugForToken(token);
  if (!slug) notFound();

  const property = await getProperty(slug);
  if (!property) notFound();

  const daysOnMarket = calcDaysOnMarket(property.listed);
  const totals = sumAnalytics(property.analytics);
  const latestAnalytics = property.analytics[0] ?? null;

  return (
    <div className="min-h-screen bg-background">
      <VendorHeader address={property.address} daysOnMarket={daysOnMarket} />

      <main className="max-w-2xl mx-auto px-5 py-8">

        {/* Hero */}
        <section className="mb-8">
          <h1 className="font-display text-2xl font-medium text-foreground mb-1 leading-tight">
            {property.address}
          </h1>
          <p className="font-body text-sm text-muted mb-4">
            {property.campaignType} · Listed {property.listed}
          </p>

          <div className="bg-card-bg rounded-[18px] border border-border shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-5 flex flex-wrap gap-5">
            <div>
              <p className="font-body text-xs text-muted mb-0.5">Price Guide</p>
              <p className="font-display text-lg font-medium text-foreground">{property.priceGuide || 'TBC'}</p>
            </div>
            <div className="w-px bg-border self-stretch" />
            <div>
              <p className="font-body text-xs text-muted mb-0.5">Agent</p>
              <p className="font-body text-sm font-medium text-foreground">{property.agent || 'Stuart Grant'}</p>
            </div>
            <div className="w-px bg-border self-stretch" />
            <div>
              <p className="font-body text-xs text-muted mb-0.5">Campaign</p>
              <p className="font-body text-sm font-medium text-foreground">{property.campaignType || 'Private Sale'}</p>
            </div>
          </div>
        </section>

        {/* Latest Update */}
        {property.latestUpdate && (
          <section className="mb-8">
            <div className="bg-accent/10 border border-accent/30 rounded-[14px] px-5 py-4">
              <p className="font-body text-xs text-accent font-medium mb-1 uppercase tracking-wide">Latest Update</p>
              <p className="font-body text-sm text-foreground leading-relaxed">{property.latestUpdate}</p>
            </div>
          </section>
        )}

        {/* Campaign Checklist */}
        {property.checklist.length > 0 && (
          <CampaignChecklist items={property.checklist} />
        )}

        {/* Analytics */}
        {property.analytics.length > 0 && (
          <section className="mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-display text-xl font-medium text-foreground">Campaign Analytics</h2>
              {latestAnalytics && (
                <p className="font-body text-xs text-muted">w/e {latestAnalytics.weekEnding}</p>
              )}
            </div>

            {/* Total views across both portals */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <StatCard
                label="Total Views"
                value={totals.reaViews + totals.domainViews}
                subtitle="REA + Domain"
              />
              <StatCard
                label="Enquiries"
                value={totals.reaEnquiries + totals.domainEnquiries}
              />
              <StatCard
                label="Saves"
                value={totals.reaSaves + totals.domainSaves}
              />
            </div>

            {/* Per-portal breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card-bg rounded-[18px] border border-border shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="h-0.5 w-full bg-red-500" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    <span className="font-body text-sm font-semibold text-foreground">realestate.com.au</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Views', value: totals.reaViews },
                      { label: 'Enquiries', value: totals.reaEnquiries },
                      { label: 'Saves', value: totals.reaSaves },
                    ].map(s => (
                      <div key={s.label} className="bg-background rounded-xl p-3">
                        <p className="font-mono text-xl font-medium tabular-nums text-foreground">{s.value.toLocaleString()}</p>
                        <p className="font-body text-xs text-muted mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-card-bg rounded-[18px] border border-border shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="h-0.5 w-full bg-emerald-500" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="font-body text-sm font-semibold text-foreground">domain.com.au</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Views', value: totals.domainViews },
                      { label: 'Enquiries', value: totals.domainEnquiries },
                      { label: 'Saves', value: totals.domainSaves },
                    ].map(s => (
                      <div key={s.label} className="bg-background rounded-xl p-3">
                        <p className="font-mono text-xl font-medium tabular-nums text-foreground">{s.value.toLocaleString()}</p>
                        <p className="font-body text-xs text-muted mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Inspection History */}
        {property.inspections.length > 0 && (
          <InspectionHistory inspections={property.inspections} />
        )}

        {property.inspections.length === 0 && (
          <section className="mb-8">
            <h2 className="font-display text-xl font-medium text-foreground mb-4">Inspections</h2>
            <div className="bg-card-bg rounded-[18px] border border-border px-6 py-8 text-center">
              <p className="font-body text-sm text-muted">No inspections logged yet.</p>
            </div>
          </section>
        )}

        {/* Communications Log */}
        <CommunicationsLog communications={property.communications} />

        {/* Footer */}
        <footer className="pt-4 pb-8 text-center border-t border-border mt-4">
          <p className="font-body text-xs text-muted">
            Grant Estate Agency · For {property.owner || 'the vendor'} · Private & Confidential
          </p>
        </footer>
      </main>
    </div>
  );
}
