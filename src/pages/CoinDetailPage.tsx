import { Link, useParams } from 'react-router-dom'
import { ErrorState } from '@/components/ErrorState'
import { Header } from '@/components/Header'
import { LoadingGrid } from '@/components/LoadingGrid'
import { PriceChart } from '@/components/PriceChart'
import { useCoinChart, useMarketsQuery } from '@/hooks/useCryptoMarkets'
import { getQueryError } from '@/lib/queryUtils'
import { formatCompact, formatCurrency, formatPercent } from '@/utils/format'

export function CoinDetailPage() {
  const { coinId } = useParams<{ coinId: string }>()
  const marketsQuery = useMarketsQuery(20)
  const chartQuery = useCoinChart(coinId, 7)

  const asset = marketsQuery.data?.find((coin) => coin.id === coinId) ?? null
  const loading =
    marketsQuery.isPending ||
    marketsQuery.isRefetching ||
    chartQuery.isPending ||
    chartQuery.isRefetching

  const fetchError = marketsQuery.isError
    ? getQueryError(marketsQuery.error)
    : chartQuery.isError
      ? getQueryError(chartQuery.error)
      : null

  const notFoundError =
    !loading && !fetchError && marketsQuery.isSuccess && !asset
      ? 'Coin not found in the current top 20 list.'
      : null

  const errorMessage = fetchError?.message ?? notFoundError

  const retry = () => {
    void marketsQuery.refetch()
    void chartQuery.refetch()
  }

  if (!coinId) {
    return (
      <div className="min-h-screen">
        <Header showBack title="Coin details" />
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <ErrorState message="Invalid coin id." onRetry={retry} />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header showBack title={asset?.name ?? 'Coin details'} />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {loading ? <LoadingGrid /> : null}

        {!loading && errorMessage ? (
          <ErrorState
            message={errorMessage}
            isNetworkError={fetchError?.isNetworkError}
            onRetry={retry}
          />
        ) : null}

        {!loading && !errorMessage && asset ? (
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-surface-raised p-6">
              <div className="flex items-center gap-4">
                <img
                  src={asset.image}
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-full bg-surface"
                />
                <div>
                  <h2 className="text-2xl font-semibold">{asset.name}</h2>
                  <p className="text-sm uppercase text-muted">{asset.symbol}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">Price</p>
                  <p className="mt-1 text-xl font-semibold">
                    {formatCurrency(asset.price)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">24h Change</p>
                  <p
                    className={`mt-1 text-xl font-semibold ${
                      asset.change24h >= 0 ? 'text-positive' : 'text-negative'
                    }`}
                  >
                    {formatPercent(asset.change24h)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">Market Cap</p>
                  <p className="mt-1 text-xl font-semibold">
                    {formatCompact(asset.marketCap)}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-medium">7-day price chart</h3>
              <PriceChart data={chartQuery.data ?? []} />
            </section>

            <Link
              to="/"
              className="inline-flex text-sm text-accent hover:underline"
            >
              ← Back to all coins
            </Link>
          </div>
        ) : null}
      </main>
    </div>
  )
}
