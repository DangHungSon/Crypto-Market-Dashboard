import { describe, expect, it } from 'vitest'
import { getQueryError } from '@/lib/queryUtils'
import { ApiError } from '@/types/crypto'

describe('getQueryError', () => {
  it('maps ApiError instances', () => {
    const result = getQueryError(
      new ApiError('Network request failed.', undefined, true),
    )

    expect(result.message).toBe('Network request failed.')
    expect(result.isNetworkError).toBe(true)
  })

  it('falls back for unknown errors', () => {
    const result = getQueryError(new Error('boom'))

    expect(result.message).toBe('Unable to load data. Please try again.')
    expect(result.isNetworkError).toBe(false)
  })
})
