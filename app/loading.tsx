export default function Loading() {
  return (
    <main className="state-page mx-auto flex w-full max-w-[var(--page-max)] flex-col justify-center px-5 py-24 md:px-8" aria-busy="true" aria-label="Loading page">
      <span className="state-kicker">Trevalt Studio</span>
      <div className="loading-line h-14 w-full max-w-xl" />
      <div className="loading-line mt-7 h-4 w-full max-w-sm" />
      <div className="loading-line mt-3 h-4 w-2/3 max-w-xs" />
    </main>
  );
}
