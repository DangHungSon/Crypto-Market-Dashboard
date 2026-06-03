import { Link } from 'react-router-dom'
import type { CryptoAsset } from '@/types/crypto'
import { formatCurrency, formatPercent } from '@/utils/format'

interface CoinCardProps {
  asset: CryptoAsset
}

export function CoinCard({ asset }: CoinCardProps) {
  const isPositive = asset.change24h >= 0

  return (
    <Link
      to={`/coin/${asset.id}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface-raised p-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="mb-4 flex items-center gap-3">
        <img
          src={asset.image}
          alt=""
          width={40}
          height={40}
          className="rounded-full bg-surface"
          loading="lazy"
        />
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-foreground">{asset.name}</h3>
          <p className="text-xs uppercase tracking-wide text-muted">{asset.symbol}</p>
        </div>
      </div>

      <div className="mt-auto space-y-1">
        <p className="text-2xl font-semibold text-foreground">
          {formatCurrency(asset.price)}
        </p>
        <p
          className={`text-sm font-medium ${isPositive ? 'text-positive' : 'text-negative'}`}
        >
          {formatPercent(asset.change24h)} (24h)
        </p>
      </div>

      <p className="mt-4 text-xs text-muted opacity-0 transition group-hover:opacity-100">
        View chart →
      </p>
    </Link>
  )
}
