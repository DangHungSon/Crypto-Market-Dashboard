import { Link } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'

interface HeaderProps {
  title?: string
  showBack?: boolean
}

export function Header({ title = 'Crypto Market Dashboard', showBack = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface-raised/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          {showBack ? (
            <Link
              to="/"
              className="mb-1 inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              ← Back to markets
            </Link>
          ) : (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Live markets
            </p>
          )}
          <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
            {title}
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
