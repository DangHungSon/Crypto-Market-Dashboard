import { ThemeToggle } from '@/components/ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface-raised/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Live markets
          </p>
          <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
            Crypto Market Dashboard 🚀
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <p className="hidden text-sm text-muted md:block">Powered by CoinGecko</p>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
