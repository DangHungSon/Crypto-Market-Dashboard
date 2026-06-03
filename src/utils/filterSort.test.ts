import { describe, expect, it } from 'vitest'
import type { CryptoAsset } from '@/types/crypto'
import {
  filterCoins,
  hasMorePages,
  paginateCoins,
  sortCoins,
} from '@/utils/filterSort'

const sample: CryptoAsset[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    image: 'btc.png',
    price: 50000,
    change24h: 2.5,
    marketCap: 1,
    volume24h: 1,
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    image: 'eth.png',
    price: 3000,
    change24h: -1.2,
    marketCap: 2,
    volume24h: 2,
  },
]

describe('filterCoins', () => {
  it('filters by name case-insensitively', () => {
    expect(filterCoins(sample, 'bit')).toHaveLength(1)
    expect(filterCoins(sample, 'BIT')[0]?.id).toBe('bitcoin')
  })

  it('filters by symbol', () => {
    expect(filterCoins(sample, 'eth')[0]?.symbol).toBe('ETH')
  })

  it('returns all coins for empty query', () => {
    expect(filterCoins(sample, '   ')).toHaveLength(2)
  })
})

describe('sortCoins', () => {
  it('sorts by price descending', () => {
    const sorted = sortCoins(sample, 'price', 'desc')
    expect(sorted[0]?.id).toBe('bitcoin')
  })

  it('sorts by 24h change ascending', () => {
    const sorted = sortCoins(sample, 'change24h', 'asc')
    expect(sorted[0]?.id).toBe('ethereum')
  })
})

describe('pagination helpers', () => {
  it('paginates visible items', () => {
    expect(paginateCoins(sample, 1, 1)).toHaveLength(1)
    expect(paginateCoins(sample, 2, 1)).toHaveLength(2)
  })

  it('detects remaining pages', () => {
    expect(hasMorePages(2, 1, 1)).toBe(true)
    expect(hasMorePages(2, 2, 1)).toBe(false)
  })
})
