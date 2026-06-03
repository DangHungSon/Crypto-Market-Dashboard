export const cryptoKeys = {
  all: ['crypto'] as const,
  markets: (limit: number) => [...cryptoKeys.all, 'markets', limit] as const,
  chart: (coinId: string, days: number) =>
    [...cryptoKeys.all, 'chart', coinId, days] as const,
}

export const MARKETS_STALE_TIME = 60_000
export const CHART_STALE_TIME = 5 * 60_000
