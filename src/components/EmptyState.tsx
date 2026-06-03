interface EmptyStateProps {
  query: string
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-10 text-center">
      <h2 className="text-lg font-semibold text-foreground">No matches found</h2>
      <p className="mt-2 text-sm text-muted">
        No coins match &quot;{query}&quot;. Try another name or symbol.
      </p>
    </div>
  )
}
