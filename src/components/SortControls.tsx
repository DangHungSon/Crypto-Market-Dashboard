import type { SortDirection, SortField } from '@/types/crypto'

interface SortControlsProps {
  field: SortField
  direction: SortDirection
  onFieldChange: (field: SortField) => void
  onDirectionChange: (direction: SortDirection) => void
}

export function SortControls({
  field,
  direction,
  onFieldChange,
  onDirectionChange,
}: SortControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-sm text-muted">
        Sort by
        <select
          value={field}
          onChange={(event) => onFieldChange(event.target.value as SortField)}
          className="rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        >
          <option value="price">Price</option>
          <option value="change24h">24h Change</option>
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm text-muted">
        Order
        <select
          value={direction}
          onChange={(event) =>
            onDirectionChange(event.target.value as SortDirection)
          }
          className="rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  )
}
