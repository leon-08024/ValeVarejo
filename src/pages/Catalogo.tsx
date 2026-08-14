import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProductCard } from "@/components/ProductCard"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProducts } from "@/context/ProductsContext"
import { categories, cities, getStoreById, stores } from "@/lib/data"

export default function Catalogo() {
  const { getAllProducts } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const catParam = searchParams.get("cat") ?? ""
  const queryParam = searchParams.get("q") ?? ""

  const [category, setCategory] = useState(catParam || "Todos")
  const [city, setCity] = useState("Todos")
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [promoOnly, setPromoOnly] = useState(false)
  const [order, setOrder] = useState("relevant")

  const filtered = useMemo(() => {
    let list = getAllProducts()

    if (queryParam) {
      const q = queryParam.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (getStoreById(p.storeId)?.name.toLowerCase().includes(q) ?? false)
      )
    }
    if (category !== "Todos") {
      list = list.filter((p) => p.category === category)
    }
    if (city !== "Todos") {
      const cityStoreIds = stores
        .filter((s) => s.location === city)
        .map((s) => s.id)
      list = list.filter((p) => cityStoreIds.includes(p.storeId))
    }
    if (priceMin) list = list.filter((p) => p.price >= parseFloat(priceMin))
    if (priceMax) list = list.filter((p) => p.price <= parseFloat(priceMax))
    if (promoOnly) list = list.filter((p) => p.oldPrice)

    if (order === "price-asc") list = [...list].sort((a, b) => a.price - b.price)
    else if (order === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price)
    else if (order === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name))

    return list
  }, [getAllProducts, queryParam, category, city, priceMin, priceMax, promoOnly, order])

  const title = queryParam
    ? `Resultados para "${queryParam}"`
    : catParam || "Catálogo de Produtos"

  const subtitle = queryParam
    ? "Produtos encontrados na busca"
    : catParam
      ? `Produtos da categoria ${catParam}`
      : "Todos os produtos artesanais do Vale do Itajaí"

  function syncUrl(value: string) {
    const next = new URLSearchParams(searchParams)
    if (value === "Todos") next.delete("cat")
    else next.set("cat", value)
    setSearchParams(next)
  }

  const filterControls = (
    <>
      <div>
        <Label className="mb-2 block text-xs font-bold tracking-wider text-gray-500 uppercase">
          Categoria
        </Label>
        <Select
          value={category}
          onValueChange={(v) => {
            const val = v ?? "Todos"
            setCategory(val)
            if (val !== catParam) syncUrl(val)
          }}
        >
          <SelectTrigger className="w-full bg-muted">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todas</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.name} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2 block text-xs font-bold tracking-wider text-gray-500 uppercase">
          Cidade
        </Label>
        <Select value={city} onValueChange={(v) => setCity(v ?? "Todos")}>
          <SelectTrigger className="w-full bg-muted">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2 block text-xs font-bold tracking-wider text-gray-500 uppercase">
          Faixa de Preço
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Mín"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="bg-muted"
          />
          <span className="text-xs text-gray-400">até</span>
          <Input
            type="number"
            placeholder="Máx"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="bg-muted"
          />
        </div>
      </div>
      <div>
        <Label className="mb-2 block text-xs font-bold tracking-wider text-gray-500 uppercase">
          Ordenar por
        </Label>
        <Select value={order} onValueChange={(v) => setOrder(v ?? "relevant")}>
          <SelectTrigger className="w-full bg-muted">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevant">Relevância</SelectItem>
            <SelectItem value="price-asc">Menor Preço</SelectItem>
            <SelectItem value="price-desc">Maior Preço</SelectItem>
            <SelectItem value="name">Nome A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <label className="flex cursor-pointer items-center gap-3">
        <Checkbox checked={promoOnly} onCheckedChange={(c) => setPromoOnly(c === true)} />
        <span className="text-sm text-gray-600">Apenas em promoção</span>
      </label>
    </>
  )

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex gap-2 md:hidden">
          <Input
            id="searchInputMobile"
            placeholder="Buscar produtos..."
            defaultValue={queryParam}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                const next = new URLSearchParams(searchParams)
                next.set("q", (e.target as HTMLInputElement).value.trim())
                setSearchParams(next)
              }
            }}
            className="flex-1"
          />
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <Card className="sticky top-36">
              <CardContent className="p-6">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-pine-100">
                    <SlidersHorizontal className="size-4 text-pine-700" />
                  </span>
                  Filtros
                </h3>
                <div className="space-y-5">{filterControls}</div>
              </CardContent>
            </Card>
          </aside>

          <main className="min-w-0 flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold md:text-3xl">{title}</h1>
              <p className="mt-1 text-gray-500">{subtitle}</p>
            </div>

            <div className="mb-6 flex gap-3 overflow-x-auto pb-2 lg:hidden">
              <Select value={category} onValueChange={(v) => setCategory(v ?? "Todos")}>
                <SelectTrigger className="shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todas categorias</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
<Select value={city} onValueChange={(v) => setCity(v ?? "Todos")}>
                <SelectTrigger className="shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <div className="mb-4">
                  <Search className="mx-auto size-14 text-gray-300" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-700">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou buscar por outros termos.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}