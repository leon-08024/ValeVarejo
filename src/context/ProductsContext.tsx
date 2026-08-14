import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { products as staticProducts } from "@/lib/data"
import type { Product } from "@/lib/data"

type NewProductData = Omit<Product, "id" | "storeId" | "emoji">

interface ProductsContextValue {
  products: Product[]
  getAllProducts: () => Product[]
  getProductById: (id: number) => Product | undefined
  addProduct: (data: NewProductData) => void
  updateProduct: (id: number, data: Partial<NewProductData>) => void
  deleteProduct: (id: number) => void
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

const STORAGE_KEY = "valevarejo_lojista_products"

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [lojistaProducts, setLojistaProducts] = useState<Product[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Product[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lojistaProducts))
  }, [lojistaProducts])

  function getAllProducts() {
    return [...staticProducts, ...lojistaProducts]
  }

  function getProductById(id: number) {
    return getAllProducts().find((p) => p.id === id)
  }

  function addProduct(data: NewProductData) {
    setLojistaProducts((prev) => [
      { ...data, id: Date.now(), storeId: 999, emoji: "🧺" },
      ...prev,
    ])
  }

  function updateProduct(id: number, data: Partial<NewProductData>) {
    setLojistaProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    )
  }

  function deleteProduct(id: number) {
    setLojistaProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProductsContext.Provider
      value={{
        products: lojistaProducts,
        getAllProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error("useProducts deve ser usado dentro de ProductsProvider")
  return ctx
}