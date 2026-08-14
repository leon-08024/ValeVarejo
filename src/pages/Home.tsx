import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProductCard } from "@/components/ProductCard"
import { StoreCard } from "@/components/StoreCard"
import { useProducts } from "@/context/ProductsContext"
import { categories, stores } from "@/lib/data"

const stats = [
  { value: "200+", label: "Produtos" },
  { value: "8", label: "Lojas Parceiras" },
]

export default function Home() {
  const { getAllProducts } = useProducts()
  const allProducts = getAllProducts()

  const featured = allProducts
    .filter((p) => p.badge === "Mais Vendido" || p.oldPrice)
    .slice(0, 4)
  const news = allProducts.filter((p) => p.badge === "Novidade").slice(0, 4)

  const countByCategory = allProducts.reduce<Record<string, number>>(
    (acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1
      return acc
    },
    {}
  )

  return (
    <div className="min-h-screen">
      <Header />

      <section className="paper bg-pine-700">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl leading-tight font-black text-white md:text-6xl lg:text-7xl">
              Produtos <span>únicos</span> feitos com <span>história</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-pine-100 md:text-xl">
              Descubra artesanato, móveis, gastronomia e muito mais de produtores
              locais. Compre direto de quem faz com amor no Vale do Itajaí.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/catalogo"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-white text-pine-800 hover:bg-white/90 hover:text-pine-800"
                )}
              >
                Explorar Produtos <ArrowRight className="size-5" />
              </Link>
              <Link
                to="/lojas"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-pine-500/40 bg-pine-600 text-white hover:bg-pine-500"
                )}
              >
                Conhecer Lojas
              </Link>
            </div>
          </div>
          <div className="mt-16 flex justify-center gap-8 text-sm text-white/70">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-1 text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-sm font-bold tracking-wider text-primary uppercase">
            Explore
          </span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Categorias</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/catalogo?cat=${encodeURIComponent(cat.name)}`}
              className="group rounded-lg border border-border bg-card p-5 text-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-3 flex justify-center transition-transform duration-300 group-hover:scale-110">
                <cat.icon className="size-8 text-foreground" />
              </div>
              <h3 className="text-sm font-bold text-foreground">{cat.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {countByCategory[cat.name] ?? 0} produtos
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-sm font-bold tracking-wider text-primary uppercase">
                Selecionados
              </span>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                Produtos em Destaque
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="hidden text-sm font-semibold text-primary transition-colors hover:text-pine-700 sm:block"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-sm font-bold tracking-wider text-primary uppercase">
            Comunidade
          </span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Lojas Parceiras
          </h2>
          <p className="mt-2 text-muted-foreground">
            Conheça os artesãos e produtores do Vale
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {stores.slice(0, 4).map((s) => (
            <StoreCard key={s.id} store={s} />
          ))}
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-sm font-bold tracking-wider text-primary uppercase">
                Novidades
              </span>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                Recém-chegados
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="hidden text-sm font-semibold text-primary transition-colors hover:text-pine-700 sm:block"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {news.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="paper rounded-lg bg-pine-700 p-10 text-center text-white md:p-16">
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
            É artesão ou produtor?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-pine-100">
            Cadastre sua loja gratuitamente e alcance milhares de clientes que
            valorizam produtos únicos e artesanais.
          </p>
          <Link
            to="/dashboard"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-white text-pine-800 hover:bg-mustard-300"
            )}
          >
            Cadastrar Minha Loja
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}