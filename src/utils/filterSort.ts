import type { CryptoAsset, SortDirection, SortField } from '@/types/crypto'

export function filterCoins(assets: CryptoAsset[], query: string): CryptoAsset[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return assets

  return assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(normalized) ||
      asset.symbol.toLowerCase().includes(normalized),
  )
}

export function sortCoins(
  assets: CryptoAsset[],
  field: SortField,
  direction: SortDirection,
): CryptoAsset[] {
  const sorted = [...assets].sort((a, b) => {
    const left = field === 'price' ? a.price : a.change24h
    const right = field === 'price' ? b.price : b.change24h
    return left - right
  })

  return direction === 'desc' ? sorted.reverse() : sorted
}

export function paginateCoins<T>(items: T[], page: number, pageSize: number): T[] {
  return items.slice(0, page * pageSize)
}

export function hasMorePages(total: number, page: number, pageSize: number): boolean {
  return page * pageSize < total
}
