import type { CryptoAsset } from '@/types/crypto'

const API_BASE = 'https://api.coingecko.com/api/v3'

export async function fetchTopMarkets(limit = 10): Promise<CryptoAsset[]> {
  const response = await fetch(
    `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch market data')
  }

  const data = (await response.json()) as Array<{
    id: string
    symbol: string
    name: string
    current_price: number
    price_change_percentage_24h: number
    market_cap: number
    total_volume: number
  }>

  return data.map((coin) => ({
    id: coin.id,
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h ?? 0,
    marketCap: coin.market_cap,
    volume24h: coin.total_volume,
  }))
}
