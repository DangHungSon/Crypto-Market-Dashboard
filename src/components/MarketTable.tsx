import type { CryptoAsset } from '@/types/crypto'
import { formatCompact, formatCurrency, formatPercent } from '@/utils/format'

interface MarketTableProps {
  assets: CryptoAsset[]
  loading: boolean
  error: string | null
}

export function MarketTable({ assets, loading, error }: MarketTableProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface-raised p-8 text-center text-muted">
        Loading market data...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-negative/30 bg-negative/10 p-8 text-center text-negative">
        {error}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface-raised">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-surface text-muted">
            <tr>
              <th className="px-4 py-3 font-medium sm:px-6">#</th>
              <th className="px-4 py-3 font-medium sm:px-6">Asset</th>
              <th className="px-4 py-3 font-medium sm:px-6">Price</th>
              <th className="px-4 py-3 font-medium sm:px-6">24h</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell sm:px-6">
                Market Cap
              </th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell sm:px-6">
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr
                key={asset.id}
                className="border-b border-border/70 transition hover:bg-white/5"
              >
                <td className="px-4 py-4 text-muted sm:px-6">{index + 1}</td>
                <td className="px-4 py-4 sm:px-6">
                  <div className="font-medium text-white">{asset.name}</div>
                  <div className="text-xs uppercase text-muted">{asset.symbol}</div>
                </td>
                <td className="px-4 py-4 font-medium text-white sm:px-6">
                  {formatCurrency(asset.price)}
                </td>
                <td
                  className={`px-4 py-4 font-medium sm:px-6 ${
                    asset.change24h >= 0 ? 'text-positive' : 'text-negative'
                  }`}
                >
                  {formatPercent(asset.change24h)}
                </td>
                <td className="hidden px-4 py-4 text-muted md:table-cell sm:px-6">
                  {formatCompact(asset.marketCap)}
                </td>
                <td className="hidden px-4 py-4 text-muted lg:table-cell sm:px-6">
                  {formatCompact(asset.volume24h)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
