import { useParams } from "react-router-dom"
import { MapPin, Package, Star, User } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProductCard } from "@/components/ProductCard"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getStoreById } from "@/lib/data"
import { useProducts } from "@/context/ProductsContext"

export default function Loja() {
  const { id } = useParams()
  const store = getStoreById(Number(id))
  const { getAllProducts } = useProducts()

  if (!store) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="py-20 text-center">
          <div className="mb-4">
            <Package className="mx-auto size-14 text-gray-300" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-700">
            Loja não encontrada
          </h3>
          <a
            href="#/lojas"
            className={cn(buttonVariants({ size: "lg" }), "mt-4")}
          >
            Ver Lojas
          </a>
        </div>
        <Footer />
      </div>
    )
  }

  const allProducts = getAllProducts()
  const storeProducts = allProducts.filter((p) => p.storeId === store.id)

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-pine-600 text-3xl font-black text-white">
                {store.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="mb-1 text-2xl font-extrabold md:text-3xl">
                  {store.name}
                </h1>
                <Badge variant="secondary" className="mb-3 bg-pine-100 text-pine-700">
                  {store.category}
                </Badge>
                <p className="mb-4 leading-relaxed text-gray-600">{store.desc}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-4" /> {store.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="size-4" /> {store.products} produtos
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="size-4" /> {store.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="size-4" /> {store.owner}
                  </span>
                </div>
              </div>
              <a
                href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
                  "Olá! Vim pelo ValeVarejo Digital e gostaria de saber mais sobre seus produtos."
                )}`}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "shrink-0 bg-[#25d366] text-white hover:bg-[#1da851]"
                )}
              >
                Falar com {store.owner}
              </a>
            </div>
          </CardContent>
        </Card>

        <section className="mt-10">
          <h2 className="mb-6 text-2xl font-extrabold">
            Produtos de {store.name}
          </h2>
          {storeProducts.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4">
                <Package className="mx-auto size-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-700">
                Nenhum produto cadastrado ainda
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {storeProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  )
}