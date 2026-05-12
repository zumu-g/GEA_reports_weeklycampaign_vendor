interface VendorHeaderProps {
  address: string;
  daysOnMarket: number;
}

export default function VendorHeader({ address, daysOnMarket }: VendorHeaderProps) {
  return (
    <header className="border-b border-border bg-card-bg sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* GEA wordmark */}
          <span className="font-display font-medium text-foreground text-lg tracking-tight flex-shrink-0">
            GEA
          </span>
          <span className="w-px h-5 bg-border flex-shrink-0" />
          <p className="font-body text-sm text-muted truncate">{address}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="font-mono text-sm font-medium text-foreground tabular-nums">
            {daysOnMarket}
          </p>
          <p className="font-body text-[10px] text-muted leading-none mt-0.5">
            days listed
          </p>
        </div>
      </div>
    </header>
  );
}
