import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { PricePoint } from '@/types/crypto'
import { formatCurrency } from '@/utils/format'

interface PriceChartProps {
  data: PricePoint[]
}

function formatAxisDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(timestamp))
}

export function PriceChart({ data }: PriceChartProps) {
  const chartData = data.map((point) => ({
    ...point,
    label: formatAxisDate(point.timestamp),
  }))

  return (
    <div className="h-72 w-full rounded-2xl border border-border bg-surface-raised p-4 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" />
          <XAxis
            dataKey="label"
            tick={{ fill: 'var(--color-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--color-border)' }}
            tickLine={false}
            minTickGap={24}
          />
          <YAxis
            tick={{ fill: 'var(--color-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--color-border)' }}
            tickLine={false}
            width={72}
            tickFormatter={(value: number) => formatCurrency(value)}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
            }}
            labelStyle={{ color: 'var(--color-muted)' }}
            formatter={(value) => [formatCurrency(Number(value)), 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="var(--color-accent)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
