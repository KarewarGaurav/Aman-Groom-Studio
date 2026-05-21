export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4 pt-28"
      role="status"
      aria-label="Loading page"
    >
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <p className="font-body text-xs uppercase tracking-[0.35em] text-champagne/60">
        Loading
      </p>
    </div>
  );
}
