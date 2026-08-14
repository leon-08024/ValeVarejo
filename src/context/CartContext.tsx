import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { Product } from "@/lib/data"
import { useProducts } from "@/context/ProductsContext"

export interface CartItem extends Product {
  qty: number
}

interface CartContextValue {
  cart: CartItem[]
  addToCart: (productId: number, qty?: number) => void
  removeFromCart: (productId: number) => void
  updateQty: (productId: number, qty: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "valevarejo_cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const { getAllProducts } = useProducts()
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as CartItem[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  function addToCart(productId: number, qty = 1) {
    const product = getAllProducts().find((p) => p.id === productId)
    if (!product) return
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId)
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + qty } : item
        )
      }
      return [{ ...product, qty }, ...prev]
    })
  }

  function removeFromCart(productId: number) {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  function updateQty(productId: number, qty: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: Math.max(1, qty) } : item
      )
    )
  }

  function clearCart() {
    setCart([])
  }

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      getCartTotal: () =>
        cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      getCartCount: () => cart.reduce((sum, item) => sum + item.qty, 0),
    }),
    [cart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider")
  return ctx
}