interface VendorHeaderProps {
  address: string;
  daysOnMarket: number;
}

export default function VendorHeader({ address, daysOnMarket }: VendorHeaderProps) {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-10 print:hidden">
      <div className="max-w-2xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-display font-medium text-foreground text-base tracking-tight flex-shrink-0">
            GEA
          </span>
          <span className="w-px h-4 bg-border flex-shrink-0" />
          <p className="font-body text-xs text-muted truncate">{address}</p>
        </div>
        {daysOnMarket > 0 && (
          <div className="flex-shrink-0 flex items-baseline gap-1.5">
            <p className="font-mono text-sm font-medium text-foreground tabular-nums leading-none">
              {daysOnMarket}
            </p>
            <p className="font-body text-[10px] text-muted leading-none">days</p>
          </div>
        )}
      </div>
    </header>
  );
}
