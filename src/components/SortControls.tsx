import { Select } from '@/components/Select'
import type { SortDirection, SortField } from '@/types/crypto'

const SORT_FIELD_OPTIONS = [
  { value: 'price' as const, label: 'Price' },
  { value: 'change24h' as const, label: '24h change' },
] satisfies { value: SortField; label: string }[]

const SORT_DIRECTION_OPTIONS = [
  { value: 'desc' as const, label: 'Ascending' },
  { value: 'asc' as const, label: 'Descending' },
] satisfies { value: SortDirection; label: string }[]

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
    <div
      className="flex flex-wrap items-end gap-3 sm:gap-4"
      role="group"
      aria-label="Sort cryptocurrencies"
    >
      <Select
        label="Sort by"
        value={field}
        options={SORT_FIELD_OPTIONS}
        onChange={onFieldChange}
      />
      <Select
        label="Order"
        value={direction}
        options={SORT_DIRECTION_OPTIONS}
        onChange={onDirectionChange}
      />
    </div>
  )
}
