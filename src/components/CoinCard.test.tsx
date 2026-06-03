import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { CoinCard } from '@/components/CoinCard'
import type { CryptoAsset } from '@/types/crypto'

const asset: CryptoAsset = {
  id: 'bitcoin',
  symbol: 'BTC',
  name: 'Bitcoin',
  image: 'https://example.com/btc.png',
  price: 50000,
  change24h: 3.25,
  marketCap: 1_000_000,
  volume24h: 500_000,
}

describe('CoinCard', () => {
  it('renders coin details and positive change styling', () => {
    render(
      <MemoryRouter>
        <CoinCard asset={asset} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('BTC')).toBeInTheDocument()
    expect(screen.getByText('+3.25% (24h)')).toHaveClass('text-positive')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/coin/bitcoin')
  })
})
