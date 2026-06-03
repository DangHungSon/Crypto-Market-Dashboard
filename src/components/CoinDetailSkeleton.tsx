function StatSkeleton() {
  return (
    <div>
      <div className="h-3 w-16 rounded bg-border" />
      <div className="mt-2 h-7 w-24 rounded bg-border sm:w-28" />
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div className="flex h-full flex-col justify-end gap-3 px-2 pb-6 pt-4">
      <div className="relative flex-1">
        <svg
          aria-hidden
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full text-border"
        >
          <path
            d="M0,90 C50,70 100,95 150,55 S250,30 300,50 S380,20 400,40 L400,120 L0,120 Z"
            fill="currentColor"
            opacity="0.35"
          />
          <path
            d="M0,90 C50,70 100,95 150,55 S250,30 300,50 S380,20 400,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.6"
          />
        </svg>
      </div>
      <div className="flex justify-between gap-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="h-2 flex-1 max-w-10 rounded bg-border" />
        ))}
      </div>
    </div>
  )
}

export function CoinDetailSkeleton() {
  return (
    <div
      className="animate-pulse space-y-6"
      aria-live="polite"
      aria-busy="true"
    >
      <section className="rounded-2xl border border-border bg-surface-raised p-6">
        <div className="flex items-center gap-4">
          <div className="size-14 shrink-0 rounded-full bg-border" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-8 w-40 max-w-full rounded-lg bg-border sm:w-48" />
            <div className="h-4 w-14 rounded bg-border" />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatSkeleton />
          <StatSkeleton />
          <StatSkeleton />
        </div>
      </section>

      <section>
        <div className="mb-3 h-6 w-44 rounded-lg bg-border" />
        <div className="h-72 w-full rounded-2xl border border-border bg-surface-raised p-4 sm:h-80">
          <ChartSkeleton />
        </div>
      </section>

      <div className="h-4 w-36 rounded bg-border" />
      <span className="sr-only">Loading coin details...</span>
    </div>
  )
}
