import { useThemeContext } from '@/hooks/useThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="rounded-full border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent cursor-pointer"
    >
      {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
    </button>
  )
}
