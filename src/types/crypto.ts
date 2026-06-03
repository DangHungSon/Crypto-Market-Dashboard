export interface CryptoAsset {
  id: string
  symbol: string
  name: string
  image: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
}

export interface PricePoint {
  timestamp: number
  price: number
}

export type SortField = 'price' | 'change24h'
export type SortDirection = 'asc' | 'desc'

export class ApiError extends Error {
  status?: number
  isNetworkError: boolean

  constructor(message: string, status?: number, isNetworkError = false) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.isNetworkError = isNetworkError
  }
}
