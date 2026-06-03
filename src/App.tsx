import { QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoadingGrid } from '@/components/LoadingGrid'
import { ThemeProvider } from '@/context/ThemeProvider'
import { queryClient } from '@/lib/queryClient'
import { DashboardPage } from '@/pages/DashboardPage'

const CoinDetailPage = lazy(() =>
  import('@/pages/CoinDetailPage').then((module) => ({
    default: module.CoinDetailPage,
  })),
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingGrid />}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/coin/:coinId" element={<CoinDetailPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
