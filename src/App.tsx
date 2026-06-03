import { Header } from '@/components/Header'
import { MarketTable } from '@/components/MarketTable'
import { useCryptoMarkets } from '@/hooks/useCryptoMarkets'

function App() {
  const { assets, loading, error } = useCryptoMarkets(10)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <section className="mb-6">
          <h2 className="text-lg font-medium text-white">Top cryptocurrencies</h2>
          <p className="mt-1 text-sm text-muted">
            Track prices, 24h change, market cap, and volume.
          </p>
        </section>
        <MarketTable assets={assets} loading={loading} error={error} />
      </main>
    </div>
  )
}

export default App
