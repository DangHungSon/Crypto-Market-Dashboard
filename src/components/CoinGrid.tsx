import { CoinCard } from '@/components/CoinCard'
import type { CryptoAsset } from '@/types/crypto'

interface CoinGridProps {
  assets: CryptoAsset[]
}

export function CoinGrid({ assets }: CoinGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {assets.map((asset) => (
        <CoinCard key={asset.id} asset={asset} />
      ))}
    </div>
  )
}
