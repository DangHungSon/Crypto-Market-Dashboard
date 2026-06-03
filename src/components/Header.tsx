interface HeaderProps {
  title?: string
}

export function Header({ title = 'Crypto Market Dashboard' }: HeaderProps) {
  return (
    <header className="border-b border-border bg-surface-raised/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Live markets
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
        </div>
        <p className="hidden text-sm text-muted sm:block">
          Powered by CoinGecko
        </p>
      </div>
    </header>
  )
}
