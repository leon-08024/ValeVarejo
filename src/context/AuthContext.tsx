import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export interface User {
  name: string
  email: string
  role?: "lojista"
  id: number
}

interface AuthContextValue {
  user: User | null
  login: (name: string, email: string) => void
  register: (name: string, email: string) => void
  logout: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = "valevarejo_user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as User | null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  function login(name: string, email: string) {
    setUser({ name, email, id: Date.now() })
  }

  function register(name: string, email: string) {
    setUser({ name, email, id: Date.now() })
  }

  function logout() {
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({ user, login, register, logout, signOut: logout }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider")
  return ctx
}