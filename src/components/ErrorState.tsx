interface ErrorStateProps {
  message: string
  isNetworkError?: boolean
  onRetry: () => void
}

export function ErrorState({ message, isNetworkError, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-negative/30 bg-negative/10 p-8 text-center"
    >
      <h2 className="text-lg font-semibold text-negative">Something went wrong</h2>
      <p className="mt-2 text-sm text-foreground/80">{message}</p>
      {isNetworkError ? (
        <p className="mt-1 text-xs text-muted">
          Check your internet connection, then retry.
        </p>
      ) : null}
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-surface transition hover:opacity-90"
      >
        Try again
      </button>
    </div>
  )
}
