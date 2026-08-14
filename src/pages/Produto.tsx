import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { MapPin, Minus, PackageX, Plus, ShoppingCart } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProductCard } from "@/components/ProductCard"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/CartContext"
import { useProducts } from "@/context/ProductsContext"
import { formatPrice } from "@/lib/format"
import { getStoreById } from "@/lib/data"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function Produto() {
  const { id } = useParams()
  const { getAllProducts, getProductById } = useProducts()
  const { addToCart } = useCart()

  const product = getProductById(Number(id))
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="py-20 text-center">
          <div className="mb-4">
            <PackageX className="mx-auto size-14 text-gray-300" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-700">
            Produto não encontrado
          </h3>
          <Link
            to="/catalogo"
            className={cn(buttonVariants({ size: "lg" }), "mt-4")}
          >
            Ver Catálogo
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const productData = product

  const store = getStoreById(product.storeId)
  const allProducts = getAllProducts()

  const related = allProducts
    .filter((p) => p.storeId === product.storeId && p.id !== product.id)
    .slice(0, 4)

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  const badgeClass =
    product.badge === "Promoção"
      ? "bg-brick-500 text-white"
      : product.badge === "Novidade"
        ? "bg-ardoise-600 text-white"
        : "bg-pine-600 text-white"

  function addQtyToCart() {
    addToCart(productData.id, qty)
    toast.success(
      `${productData.emoji} ${productData.name} adicionado ao carrinho!`
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex min-h-[400px] items-center justify-center bg-muted text-[120px]">
              <span>{product.emoji}</span>
              {product.badge && (
                <Badge className={cn("absolute top-5 left-5 px-4 py-1.5", badgeClass)}>
                  {product.badge}
                </Badge>
              )}
              {discount && (
                <Badge className="absolute top-5 right-5 bg-clay-500 px-3 py-1.5 text-white">
                  -{discount}%
                </Badge>
              )}
            </div>
            <div className="p-8 lg:p-12">
              <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
                <Link to="/" className="transition-colors hover:text-pine-600">
                  Início
                </Link>
                <span>/</span>
                <Link
                  to={`/catalogo?cat=${encodeURIComponent(product.category)}`}
                  className="transition-colors hover:text-pine-600"
                >
                  {product.category}
                </Link>
                <span>/</span>
                <span className="text-gray-700">{product.name}</span>
              </nav>

              <h1 className="mb-3 text-2xl font-extrabold lg:text-3xl">
                {product.name}
              </h1>

              {store && (
                <Link
                  to={`/loja/${store.id}`}
                  className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-pine-600 transition-colors hover:text-pine-700"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-pine-100 text-xs">
                    {store.name.charAt(0)}
                  </span>
                  {store.name} · <MapPin className="size-3.5" /> {store.location}
                </Link>
              )}

              <div className="mb-6 flex items-end gap-3">
                <span className="text-4xl font-black text-pine-700">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="mb-8 leading-relaxed text-gray-600">{product.desc}</p>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-bold text-gray-700">
                  Quantidade
                </label>
                <div className="inline-flex items-center rounded-lg bg-muted p-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <Minus className="size-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-bold">{qty}</span>
                  <Button size="icon" variant="ghost" onClick={() => setQty(qty + 1)}>
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-8">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-pine-50 px-4 py-2 text-sm font-medium text-pine-700">
                    <span className="size-2 rounded-full bg-pine-500" />
                    {product.stock} unidades em estoque
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-brick-100 px-4 py-2 text-sm font-medium text-brick-600">
                    <span className="size-2 rounded-full bg-brick-500" />
                    Indisponível
                  </span>
                )}
              </div>

              <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={product.stock <= 0}
                  onClick={addQtyToCart}
                >
                  <ShoppingCart className="size-5" /> Adicionar ao Carrinho
                </Button>
              </div>

              {store && (
                <a
                  href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
                    `Olá! Vi o produto '${productData.name}' no ValeVarejo e tenho interesse!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "flex w-full items-center justify-center gap-3 bg-[#25d366] py-4 hover:bg-[#1da851]"
                  )}
                >
                  Falar com {store.owner} via WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-extrabold">Produtos da mesma loja</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  )
}