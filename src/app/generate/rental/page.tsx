import Header from '@/components/Header';
import RentalReportWizard from '@/components/RentalReportWizard';
import { getAllRentals } from '@/lib/rental-loader';

export const dynamic = 'force-dynamic';

export default async function GenerateRentalPage() {
  const rentals = await getAllRentals();

  const activeRentals = rentals.map(r => ({
    id: r.slug,
    address: r.address,
    landlord: r.landlord,
    agent: r.agent,
    rentPw: r.rentPw,
    listed: r.listed,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Generate Rental Report</h2>
          <p className="text-muted text-sm mt-1">
            Enter this week&apos;s data for a rental listing and AI will write the full landlord report.
          </p>
        </div>

        <RentalReportWizard activeRentals={activeRentals} />
      </main>

      <footer className="border-t border-border mt-16 py-6 text-center text-sm text-muted">
        Grants Estate Agents &middot; Weekly Rental Reports
      </footer>
    </div>
  );
}
