/**
 * Global route-transition loading UI.
 * Keep this generic — no page-specific branding beyond the logo mark.
 */
export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background">
      {/* Logo placeholder — replace with brand mark when assets are ready */}
      <div
        aria-hidden
        className="flex size-14 items-center justify-center rounded-xl border border-border bg-muted text-sm font-semibold tracking-[0.2em] text-foreground"
      >
        SPR
      </div>

      <div
        role="status"
        aria-label="Loading"
        className="size-6 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-foreground"
      />
    </div>
  );
}
