export interface NearbyListing {
  address: string;
  price: string;
  type: string;
  date: string;
  beds: string;
  baths: string;
  cars: string;
}

interface NearbyActivityProps {
  justListed: NearbyListing[];
  justSold: NearbyListing[];
}

function PropertyCard({ listing, variant }: { listing: NearbyListing; variant: "listed" | "sold" }) {
  const isSold = variant === "sold";

  return (
    <div className="bg-white rounded-xl border border-border-light p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{listing.address}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            {listing.beds && (
              <span className="text-xs text-muted">{listing.beds} bed</span>
            )}
            {listing.beds && listing.baths && (
              <span className="text-xs text-muted">·</span>
            )}
            {listing.baths && (
              <span className="text-xs text-muted">{listing.baths} bath</span>
            )}
            {listing.cars && (
              <>
                <span className="text-xs text-muted">·</span>
                <span className="text-xs text-muted">{listing.cars} car</span>
              </>
            )}
          </div>
          <p className="text-xs text-muted mt-1">{listing.type} · {listing.date}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <span
            className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isSold
                ? "bg-green-50 text-green-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {isSold ? "Sold" : "Listed"}
          </span>
          <p className="text-sm font-bold text-foreground mt-1">{listing.price}</p>
        </div>
      </div>
    </div>
  );
}

export default function NearbyActivity({ justListed, justSold }: NearbyActivityProps) {
  if (justListed.length === 0 && justSold.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-foreground mb-1">Nearby Activity</h3>
      <p className="text-sm text-muted mb-5">Recent listings and sales close to your property</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Just Listed */}
        {justListed.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <h4 className="text-sm font-semibold text-foreground">Just Listed</h4>
              <span className="text-xs text-muted">({justListed.length})</span>
            </div>
            <div className="space-y-2">
              {justListed.map((listing, i) => (
                <div key={`listed-${i}`}>
                  <PropertyCard listing={listing} variant="listed" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Just Sold */}
        {justSold.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <h4 className="text-sm font-semibold text-foreground">Just Sold</h4>
              <span className="text-xs text-muted">({justSold.length})</span>
            </div>
            <div className="space-y-2">
              {justSold.map((listing, i) => (
                <div key={`sold-${i}`}>
                  <PropertyCard listing={listing} variant="sold" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
