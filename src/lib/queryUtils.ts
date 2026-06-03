import { ApiError } from '@/types/crypto'

export function getQueryError(error: unknown): {
  message: string
  isNetworkError: boolean
} {
  if (error instanceof ApiError) {
    return { message: error.message, isNetworkError: error.isNetworkError }
  }

  return {
    message: 'Unable to load data. Please try again.',
    isNetworkError: false,
  }
}
