import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const preferredDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial: Theme = stored === 'dark' || (!stored && preferredDark) ? 'dark' : 'light'
    setTheme(initial)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const root = document.documentElement
    // Activar transición visual temporalmente
    root.classList.add('theme-transition')
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    console.log('Toggling theme from', theme, 'to', newTheme)
    setTheme(newTheme)
    // Quitar clase tras 550ms (ligeramente > 500ms para asegurar fin de transición)
    window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 550)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}


