import { useMemo, useState } from 'react'
import { CoinGrid } from '@/components/CoinGrid'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { Header } from '@/components/Header'
import { LoadingGrid } from '@/components/LoadingGrid'
import { SearchBar } from '@/components/SearchBar'
import { SortControls } from '@/components/SortControls'
import { useCryptoMarkets } from '@/hooks/useCryptoMarkets'
import type { SortDirection, SortField } from '@/types/crypto'
import {
  filterCoins,
  hasMorePages,
  paginateCoins,
  sortCoins,
} from '@/utils/filterSort'

const PAGE_SIZE = 8

export function DashboardPage() {
  const { assets, loading, error, isNetworkError, retry } = useCryptoMarkets(20)
  const [query, setQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('price')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [page, setPage] = useState(1)

  const filteredSorted = useMemo(() => {
    const filtered = filterCoins(assets, query)
    return sortCoins(filtered, sortField, sortDirection)
  }, [assets, query, sortField, sortDirection])

  const visibleCoins = useMemo(
    () => paginateCoins(filteredSorted, page, PAGE_SIZE),
    [filteredSorted, page],
  )

  const canLoadMore = hasMorePages(filteredSorted.length, page, PAGE_SIZE)

  const handleSearchChange = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  const handleSortFieldChange = (field: SortField) => {
    setSortField(field)
    setPage(1)
  }

  const handleSortDirectionChange = (direction: SortDirection) => {
    setSortDirection(direction)
    setPage(1)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <section className="mb-6">
          <h2 className="text-lg font-medium">Top 20 cryptocurrencies</h2>
          <p className="mt-1 text-sm text-muted">
            Search, sort, and explore live market data by market cap.
          </p>
        </section>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:max-w-md">
            <SearchBar value={query} onChange={handleSearchChange} />
          </div>
          <SortControls
            field={sortField}
            direction={sortDirection}
            onFieldChange={handleSortFieldChange}
            onDirectionChange={handleSortDirectionChange}
          />
        </div>

        {loading ? <LoadingGrid /> : null}

        {!loading && error ? (
          <ErrorState
            message={error}
            isNetworkError={isNetworkError}
            onRetry={retry}
          />
        ) : null}

        {!loading && !error && filteredSorted.length === 0 ? (
          <EmptyState query={query} />
        ) : null}

        {!loading && !error && visibleCoins.length > 0 ? (
          <>
            <CoinGrid assets={visibleCoins} />
            {canLoadMore ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-xl border border-border bg-surface-raised px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
                >
                  Load more
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </main>
    </div>
  )
}
