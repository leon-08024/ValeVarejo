import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type ThemeMode = "light" | "dark" | "contrast"

interface ThemeContextValue {
  mode: ThemeMode
  cycleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "valevarejo_theme"
const ORDER: ThemeMode[] = ["light", "dark", "contrast"]

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === "light" || stored === "dark" || stored === "contrast")
        return stored
    } catch {
      // ignore
    }
    return "light"
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", mode === "dark")
    root.classList.toggle("hc", mode === "contrast")
    root.style.colorScheme = mode === "dark" ? "dark" : "light"
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  function cycleTheme() {
    setMode((prev) => ORDER[(ORDER.indexOf(prev) + 1) % ORDER.length])
  }

  return (
    <ThemeContext.Provider value={{ mode, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme deve ser usado dentro de ThemeProvider")
  return ctx
}