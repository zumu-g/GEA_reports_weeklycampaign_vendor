interface OfferRow {
  date: string;
  buyer: string;
  amount: string;
  conditions: string;
  status: string;
  notes: string;
}

interface OffersReceivedProps {
  offers: OfferRow[];
}

function statusStyle(status: string) {
  const s = status.toLowerCase();
  if (s.includes("accept")) return "bg-success-soft text-success";
  if (s.includes("reject") || s.includes("decline")) return "bg-danger-soft text-danger";
  if (s.includes("counter")) return "bg-warning-soft text-warning";
  if (s.includes("pending") || s.includes("active")) return "bg-primary-soft text-primary";
  if (s.includes("expired") || s.includes("withdrawn")) return "bg-background-secondary text-muted";
  return "bg-background-secondary text-foreground-secondary";
}

export default function OffersReceived({ offers }: OffersReceivedProps) {
  if (offers.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
        <h3 className="text-base font-semibold text-foreground mb-4">Offers</h3>
        <div className="bg-background-secondary rounded-2xl p-8 text-center">
          <svg className="w-10 h-10 text-border mx-auto mb-3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M6 18H42" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 26H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 32H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-sm text-muted">No offers received yet</p>
          <p className="text-xs text-border mt-1">Offers will appear here as they come in</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-foreground">Offers</h3>
        <span className="text-xs bg-background-secondary text-foreground-secondary px-3 py-1 rounded-full font-medium">
          {offers.length} received
        </span>
      </div>

      <div className="space-y-3">
        {offers.map((offer, i) => (
          <div key={i} className="bg-background-secondary rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xl font-bold text-foreground">{offer.amount}</p>
                <p className="text-sm text-muted mt-0.5">
                  {offer.buyer}{offer.date && <> &middot; {offer.date}</>}
                </p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusStyle(offer.status)}`}>
                {offer.status}
              </span>
            </div>

            {offer.conditions && (
              <div className="mb-2">
                <p className="text-xs text-muted uppercase tracking-wider font-medium mb-1">Conditions</p>
                <p className="text-sm text-foreground">{offer.conditions}</p>
              </div>
            )}

            {offer.notes && (
              <p className="text-sm text-muted">{offer.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
