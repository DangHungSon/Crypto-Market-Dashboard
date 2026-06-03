export function LoadingGrid() {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-live="polite"
      aria-busy="true"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-border bg-surface-raised p-5"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="size-10 rounded-full bg-border" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded bg-border" />
              <div className="h-3 w-1/3 rounded bg-border" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-7 w-1/2 rounded bg-border" />
            <div className="h-4 w-1/3 rounded bg-border" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading market data...</span>
    </div>
  )
}
