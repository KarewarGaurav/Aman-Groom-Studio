export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-ivory pt-28"
      role="status"
      aria-label="Loading page"
    >
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-sandgold to-transparent" />
      <p className="font-sans text-xs uppercase tracking-[0.35em] text-bronze">
        Loading
      </p>
    </div>
  );
}
