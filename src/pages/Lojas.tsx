import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { StoreCard } from "@/components/StoreCard"
import { stores } from "@/lib/data"

export default function Lojas() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold tracking-wider text-primary uppercase">
            Comunidade
          </span>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Lojas Parceiras
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Conheça os artesãos e produtores do Vale do Itajaí que trazem produtos
            únicos até você.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stores.map((s) => (
            <StoreCard key={s.id} store={s} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}