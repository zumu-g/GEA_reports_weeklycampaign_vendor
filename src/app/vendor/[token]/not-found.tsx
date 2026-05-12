export default function VendorNotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-5xl font-medium text-foreground mb-2">GEA</p>
      <div className="h-0.5 w-12 bg-accent rounded-full mx-auto my-6" />
      <h1 className="font-display text-2xl font-medium text-foreground mb-3">
        Link not found
      </h1>
      <p className="font-body text-sm text-muted max-w-xs leading-relaxed">
        This portal link may have expired or been revoked. Contact your agent for a new link.
      </p>
      <p className="font-body text-xs text-muted/60 mt-8">Grant Estate Agency</p>
    </div>
  );
}
