import type { CryptoAsset, PricePoint } from '@/types/crypto'
import { ApiError } from '@/types/crypto'

const API_BASE = 'https://api.coingecko.com/api/v3'

type RawMarket = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number | null
  market_cap: number
  total_volume: number
}

function mapMarket(coin: RawMarket): CryptoAsset {
  return {
    id: coin.id,
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
    image: coin.image,
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h ?? 0,
    marketCap: coin.market_cap,
    volume24h: coin.total_volume,
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status,
      )
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError(
      'Network request failed. Check your connection and try again.',
      undefined,
      true,
    )
  }
}

export async function fetchTopMarkets(limit = 20): Promise<CryptoAsset[]> {
  const data = await fetchJson<RawMarket[]>(
    `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
  )

  return data.map(mapMarket)
}

export async function fetchCoinChart(
  coinId: string,
  days = 7,
): Promise<PricePoint[]> {
  const data = await fetchJson<{ prices: [number, number][] }>(
    `${API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
  )

  return data.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
  }))
}
