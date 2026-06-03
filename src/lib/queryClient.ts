import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/types/crypto'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (
          error instanceof ApiError &&
          error.status !== undefined &&
          error.status < 500
        ) {
          return false
        }

        return failureCount < 3
      },
      retryDelay: (attemptIndex) => 800 * (attemptIndex + 1),
    },
  },
})
