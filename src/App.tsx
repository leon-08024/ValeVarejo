import { useEffect } from "react"
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/context/ThemeContext"
import { AuthProvider } from "@/context/AuthContext"
import { ProductsProvider } from "@/context/ProductsContext"
import { CartProvider } from "@/context/CartContext"
import Home from "@/pages/Home"
import Catalogo from "@/pages/Catalogo"
import Lojas from "@/pages/Lojas"
import Loja from "@/pages/Loja"
import Produto from "@/pages/Produto"
import Carrinho from "@/pages/Carrinho"
import Checkout from "@/pages/Checkout"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import MinhaConta from "@/pages/MinhaConta"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/lojas" element={<Lojas />} />
              <Route path="/loja/:id" element={<Loja />} />
              <Route path="/produto/:id" element={<Produto />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/minha-conta" element={<MinhaConta />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster richColors position="bottom-right" />
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  )
}