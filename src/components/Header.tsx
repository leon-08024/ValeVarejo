import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Contrast,
  Moon,
  Sun,
  User,
  ShoppingCart,
  Store as StoreIcon,
  Search,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCart } from "@/context/CartContext"
import { useTheme, type ThemeMode } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Início", to: "/", match: "/" },
  { label: "Catálogo", to: "/catalogo", match: "/catalogo" },
  { label: "Lojas", to: "/lojas", match: "/lojas" },
]

const themeMeta: Record<ThemeMode, { icon: typeof Sun; label: string }> = {
  light: { icon: Sun, label: "Claro" },
  dark: { icon: Moon, label: "Escuro" },
  contrast: { icon: Contrast, label: "Contraste" },
}

export function Header() {
  const { getCartCount } = useCart()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { mode, cycleTheme } = useTheme()
  const [query, setQuery] = useState("")
  const [authOpen, setAuthOpen] = useState(false)

  const count = getCartCount()
  const ThemeIcon = themeMeta[mode].icon

  function doSearch() {
    if (query.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <div className="hidden flex-1 md:flex">
            <Input
              id="searchInput"
              placeholder="Buscar produtos, lojas, categorias..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doSearch()}
              className="rounded-r-none"
            />
            <Button
              onClick={doSearch}
              className="rounded-l-none"
            >
              <Search className="size-4" />
              Buscar
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-1 sm:gap-3">
            <button
              onClick={cycleTheme}
              className="flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
              aria-label={`Tema atual: ${themeMeta[mode].label}. Clique para alternar.`}
              title={`Tema: ${themeMeta[mode].label} (clique para alternar)`}
            >
              <ThemeIcon className="size-5" />
              <span className="text-[10px] font-medium">{themeMeta[mode].label}</span>
            </button>
            <button
              onClick={() => setAuthOpen(true)}
              className="flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
              aria-label="Entrar"
              title="Entrar"
            >
              <User className="size-5" />
              <span className="text-[10px] font-medium">Entrar</span>
            </button>
            <Link
              to="/carrinho"
              className="relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
            >
              <ShoppingCart className="size-5" />
              <span className="text-[10px] font-medium">Carrinho</span>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-clay-500 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Como você quer entrar?</DialogTitle>
            <DialogDescription>
              Escolha o tipo de conta para continuar
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 pt-2">
            <button
              onClick={() => {
                setAuthOpen(false)
                navigate("/minha-conta")
              }}
              className="flex items-center gap-4 rounded-lg border-2 border-border bg-card p-4 text-left transition-colors hover:border-primary hover:bg-muted/50"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-pine-100">
                <User className="size-5 text-pine-700" />
              </span>
              <span>
                <span className="block font-bold">Entrar como Cliente</span>
                <span className="block text-sm text-muted-foreground">
                  Acompanhe seus pedidos e rastreie encomendas
                </span>
              </span>
            </button>
            <button
              onClick={() => {
                setAuthOpen(false)
                navigate("/login")
              }}
              className="flex items-center gap-4 rounded-lg border-2 border-border bg-card p-4 text-left transition-colors hover:border-primary hover:bg-muted/50"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-pine-100">
                <StoreIcon className="size-5 text-pine-700" />
              </span>
              <span>
                <span className="block font-bold">Entrar como Lojista</span>
                <span className="block text-sm text-muted-foreground">
                  Gerencie sua loja, produtos e pedidos
                </span>
              </span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <nav className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex justify-center gap-2 text-base font-semibold">
            {navItems.map((item) => {
              const active = item.match === pathname
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={cn(
                    "border-b-2 px-6 py-3.5 transition-all",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}