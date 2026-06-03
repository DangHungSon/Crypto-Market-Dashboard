import { describe, expect, it } from 'vitest'
import { formatCompact, formatCurrency, formatPercent } from '@/utils/format'

describe('format helpers', () => {
  it('formats USD currency', () => {
    expect(formatCurrency(1234.5)).toMatch(/\$1,234\.50/)
  })

  it('formats compact numbers', () => {
    expect(formatCompact(1_500_000)).toMatch(/1\.5M/i)
  })

  it('formats signed percentages', () => {
    expect(formatPercent(2.456)).toBe('+2.46%')
    expect(formatPercent(-1.2)).toBe('-1.20%')
  })
})
