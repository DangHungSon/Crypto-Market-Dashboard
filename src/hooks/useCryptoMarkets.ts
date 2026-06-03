import { useEffect, useState } from 'react'
import { fetchTopMarkets } from '@/services/cryptoApi'
import type { CryptoAsset } from '@/types/crypto'

interface UseCryptoMarketsResult {
  assets: CryptoAsset[]
  loading: boolean
  error: string | null
}

export function useCryptoMarkets(limit = 10): UseCryptoMarketsResult {
  const [assets, setAssets] = useState<CryptoAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchTopMarkets(limit)
        if (!cancelled) {
          setAssets(data)
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load market data. Try again later.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [limit])

  return { assets, loading, error }
}
