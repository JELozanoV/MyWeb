import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * Script que corre antes del primer pintado (ver pages/_document.tsx) para
 * aplicar la clase `dark` sin parpadeo. Debe mantenerse en sincronía con la
 * lógica de este contexto: localStorage.theme o, si no hay, prefers-color-scheme.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // null hasta montar: así no se pisa la clase que ya puso themeInitScript
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    // Sincroniza el estado con lo que aplicó el script inicial (solo existe en el cliente)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    if (theme === null) return
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    const root = document.documentElement
    // Activar transición visual temporalmente
    root.classList.add('theme-transition')
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    // Solo se guarda cuando el usuario elige; si no, se sigue la preferencia del sistema
    try {
      localStorage.setItem('theme', newTheme)
    } catch {
      // localStorage no disponible (modo privado, bloqueado, etc.)
    }
    // Quitar clase tras 550ms (ligeramente > 500ms para asegurar fin de transición)
    window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 550)
  }

  return (
    <ThemeContext.Provider value={{ theme: theme ?? 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
