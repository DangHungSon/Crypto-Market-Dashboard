# Crypto Market Dashboard

A React dashboard for tracking the top 20 cryptocurrencies by market cap, powered by the [CoinGecko](https://www.coingecko.com/) public API.

## Features

- Live market data with TanStack Query caching and retry
- Responsive card grid (1 / 2 / 3–4 columns)
- Search by coin name or symbol
- Sort by price or 24h change (asc/desc)
- Loading, error-with-retry, and empty search states
- Load-more pagination
- Coin detail page with 7-day price chart
- Dark / light theme toggle

## Prerequisites

- [Node.js](https://nodejs.org/) **18+** (20+ recommended)
- npm (included with Node.js)

No API keys or environment variables are required. The app uses CoinGecko's free public endpoints.

## Local setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Crypto-Market-Dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

The dev server supports hot module replacement (HMR), so changes to the code reload automatically.

### 4. (Optional) Build for production

```bash
npm run build
npm run preview
```

`preview` serves the production build locally, typically at [http://localhost:4173](http://localhost:4173).

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |

## Project structure

```text
src/
  components/   UI components (cards, search, sort, chart, states)
  pages/        Dashboard and coin detail routes
  hooks/        TanStack Query hooks for market data
  services/     CoinGecko API client
  lib/          Query client, keys, and shared query helpers
  utils/        Formatting and filter/sort helpers
  types/        Shared TypeScript types
```

## Tech stack

- React 19 + TypeScript
- Vite + Tailwind CSS v4
- React Router + Recharts + TanStack Query
- Vitest + Testing Library

## Troubleshooting

**Blank page or failed requests**

- Confirm you have an internet connection (data is fetched live from CoinGecko).
- If requests fail with `429`, CoinGecko rate-limited the request. Wait a minute and click **Try again**.

**Port already in use**

- Vite will offer the next available port automatically, or run on a specific port:

```bash
npm run dev -- --port 3000
```

**Dependency issues after pulling latest changes**

```bash
rm -rf node_modules package-lock.json
npm install
```
