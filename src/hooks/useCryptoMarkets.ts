import { useQuery } from '@tanstack/react-query'
import { CHART_STALE_TIME, cryptoKeys, MARKETS_STALE_TIME } from '@/lib/queryKeys'
import { getQueryError } from '@/lib/queryUtils'
import { fetchCoinChart, fetchTopMarkets } from '@/services/cryptoApi'
import type { CryptoAsset } from '@/types/crypto'

interface UseCryptoMarketsResult {
  assets: CryptoAsset[]
  loading: boolean
  error: string | null
  isNetworkError: boolean
  retry: () => void
}

export function useCryptoMarkets(limit = 20): UseCryptoMarketsResult {
  const query = useQuery({
    queryKey: cryptoKeys.markets(limit),
    queryFn: () => fetchTopMarkets(limit),
    staleTime: MARKETS_STALE_TIME,
  })

  const { message, isNetworkError } = getQueryError(query.error)

  return {
    assets: query.data ?? [],
    loading: query.isPending || query.isRefetching,
    error: query.isError ? message : null,
    isNetworkError,
    retry: () => {
      void query.refetch()
    },
  }
}

export function useCoinChart(coinId: string | undefined, days = 7) {
  return useQuery({
    queryKey: cryptoKeys.chart(coinId ?? '', days),
    queryFn: () => fetchCoinChart(coinId!, days),
    enabled: Boolean(coinId),
    staleTime: CHART_STALE_TIME,
  })
}

export function useMarketsQuery(limit = 20) {
  return useQuery({
    queryKey: cryptoKeys.markets(limit),
    queryFn: () => fetchTopMarkets(limit),
    staleTime: MARKETS_STALE_TIME,
  })
}
