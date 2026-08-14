import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowUpRight,
  Banknote,
  ClipboardList,
  LogOut,
  Package,
  Pencil,
  Plus,
  Save,
  Store as StoreIcon,
  Trash2,
  TrendingUp,
} from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/context/AuthContext"
import { useProducts } from "@/context/ProductsContext"
import { BarsChart, AreaChart, DonutChart } from "@/components/charts"
import { formatPrice } from "@/lib/format"
import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"

const mockOrders = [
  {
    id: "#1001",
    customer: "Maria Silva",
    items: "3 itens",
    total: 189.9,
    status: "Entregue",
    date: "Hoje",
  },
  {
    id: "#1000",
    customer: "João Santos",
    items: "1 item",
    total: 74.5,
    status: "Em transporte",
    date: "Ontem",
  },
  {
    id: "#998",
    customer: "Ana Souza",
    items: "2 itens",
    total: 149.8,
    status: "Aguardando pagamento",
    date: "12/08",
  },
]

const salesByMonth = [
  { label: "Jan", value: 840 },
  { label: "Fev", value: 1120 },
  { label: "Mar", value: 960 },
  { label: "Abr", value: 1420 },
  { label: "Mai", value: 1180 },
  { label: "Jun", value: 1680 },
  { label: "Jul", value: 2040 },
  { label: "Ago", value: 1850 },
]

const viewsByWeek = [
  { label: "S1", value: 210 },
  { label: "S2", value: 320 },
  { label: "S3", value: 280 },
  { label: "S4", value: 410 },
  { label: "S5", value: 390 },
  { label: "S6", value: 520 },
  { label: "S7", value: 610 },
  { label: "S8", value: 560 },
]

const salesByCategory = [
  { label: "Artesanato", value: 44 },
  { label: "Têxtil", value: 38 },
  { label: "Joias", value: 34 },
  { label: "Gastronomia", value: 30 },
  { label: "Móveis", value: 25 },
  { label: "Papelaria", value: 22 },
  { label: "Bebidas", value: 18 },
]

const statusClass: Record<string, string> = {
  Entregue: "bg-pine-100 text-pine-700",
  "Em transporte": "bg-mustard-300/30 text-ocher-600",
  "Aguardando pagamento": "bg-brick-100 text-brick-600",
  "Pedido recebido": "bg-ardoise-100 text-ardoise-600",
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()

  const [tab, setTab] = useState<"products" | "new" | "orders">("products")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("Artesanato")
  const [price, setPrice] = useState("")
  const [oldPrice, setOldPrice] = useState("")
  const [badge, setBadge] = useState("")
  const [desc, setDesc] = useState("")
  const [stock, setStock] = useState("10")

  const stats = useMemo(
    () => [
      { icon: Package, label: "Produtos", value: products.length, color: "bg-pine-100 text-pine-700" },
      { icon: Banknote, label: "Vendas (mês)", value: `R$ ${(products.length * 385.4).toFixed(2).replace(".", ",")}`, color: "bg-mustard-300/30 text-ocher-600" },
      { icon: ClipboardList, label: "Pedidos", value: 12, color: "bg-ardoise-100 text-ardoise-600" },
      { icon: TrendingUp, label: "Visualizações", value: "1.2k", color: "bg-brick-100 text-brick-600" },
    ],
    [products.length]
  )

  function startEdit(id: number) {
    const p = products.find((x) => x.id === id)
    if (!p) return
    setEditingId(id)
    setName(p.name)
    setCategory(p.category)
    setPrice(String(p.price))
    setOldPrice(p.oldPrice ? String(p.oldPrice) : "")
    setBadge(p.badge ?? "")
    setDesc(p.desc)
    setStock(String(p.stock))
    setTab("new")
  }

  function resetForm() {
    setEditingId(null)
    setName("")
    setCategory("Artesanato")
    setPrice("")
    setOldPrice("")
    setBadge("")
    setDesc("")
    setStock("10")
  }

  function submitProduct(e: React.FormEvent) {
    e.preventDefault()
    const priceNum = parseFloat(price.replace(",", "."))
    if (!name.trim() || isNaN(priceNum) || priceNum <= 0) return

    const payload = {
      name: name.trim(),
      category,
      price: priceNum,
      oldPrice: oldPrice ? parseFloat(oldPrice.replace(",", ".")) : null,
      badge: badge && badge !== "__none__" ? badge : null,
      desc: desc.trim(),
      stock: parseInt(stock) || 0,
    }

    if (editingId) {
      updateProduct(editingId, payload)
    } else {
      addProduct(payload)
    }
    resetForm()
    setTab("products")
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <div className="mb-6 flex justify-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-pine-100">
              <StoreIcon className="size-8 text-pine-700" />
            </span>
          </div>
          <h1 className="mb-3 text-2xl font-extrabold">Painel do Lojista</h1>
          <p className="mb-8 text-gray-500">
            Entre na sua conta para gerenciar produtos, ver pedidos e acompanhar
            suas vendas.
          </p>
          <Button size="lg" className="w-full">
            <Link to="/login" className="flex items-center gap-1.5">
              Entrar na conta
            </Link>
          </Button>
          <p className="mt-4 text-sm text-gray-400">
            Não tem conta?{" "}
            <Link to="/login" className="font-semibold text-pine-600">
              Cadastre-se gratuitamente
            </Link>
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Painel do Lojista</h1>
            <p className="mt-1 text-gray-500">
              Olá, {user.name.split(" ")[0]}! Aqui você gerencia sua loja.
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="size-4" /> Sair
          </Button>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-lg", stat.color)}>
                  <stat.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                  <p className="truncate text-xl font-extrabold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-1 text-lg font-bold">Vendas por mês</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Exemplo ilustrativo — será alimentado pelo backend
              </p>
              <BarsChart data={salesByMonth} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-1 text-lg font-bold">Visualizações</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Exemplo ilustrativo — será alimentado pelo backend
              </p>
              <AreaChart data={viewsByWeek} />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="mb-1 text-lg font-bold">Vendas por categoria</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Exemplo ilustrativo — será alimentado pelo backend
              </p>
              <DonutChart data={salesByCategory} totalLabel="Pedidos" />
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex gap-2 border-b border-border">
          {[
            { id: "products", label: "Meus Produtos" },
            { id: "new", label: editingId ? "Editar Produto" : "Adicionar Produto" },
            { id: "orders", label: "Pedidos" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                if (t.id === "new") resetForm()
                setTab(t.id as typeof tab)
              }}
              className={cn(
                "-mb-px border-b-2 px-4 py-3 text-sm font-bold transition-colors",
                tab === t.id
                  ? "border-pine-600 text-pine-700"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <>
            <div className="mb-4 flex justify-end">
              <Button
                onClick={() => {
                  resetForm()
                  setTab("new")
                }}
              >
                <Plus className="size-4" /> Novo Produto
              </Button>
            </div>
            <Card>
              <CardContent className="overflow-x-auto p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-right">Preço</TableHead>
                      <TableHead className="text-right">Estoque</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="py-10 text-center text-gray-400">
                          Nenhum produto cadastrado. Adicione o primeiro!
                        </TableCell>
                      </TableRow>
                    )}
                    {products.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xl">
                              {p.emoji}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-semibold">{p.name}</p>
                              {p.badge && (
                                <Badge variant="secondary" className="mt-0.5 bg-pine-100 text-pine-700">
                                  {p.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {p.category}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatPrice(p.price)}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-right text-sm font-medium",
                            p.stock === 0 ? "text-brick-500" : "text-gray-600"
                          )}
                        >
                          {p.stock}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button size="icon-sm" variant="ghost" onClick={() => startEdit(p.id)}>
                              <Pencil className="size-4" />
                            </Button>
                            <Button size="icon-sm" variant="ghost" onClick={() => setDeleteId(p.id)}>
                              <Trash2 className="size-4 text-brick-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}

        {tab === "new" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <h3 className="mb-6 text-lg font-bold">
                  {editingId ? "Editar produto" : "Cadastrar novo produto"}
                </h3>
                <form onSubmit={submitProduct} className="space-y-5">
                  <div>
                    <Label className="mb-2 block text-sm font-bold">Nome do produto *</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex.: Vaso de cerâmica artesanal"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="mb-2 block text-sm font-bold">Categoria</Label>
                      <Select value={category} onValueChange={(v) => setCategory(v ?? "Artesanato")}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.name} value={c.name}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block text-sm font-bold">Selo</Label>
                      <Select value={badge} onValueChange={(v) => setBadge(v ?? "")}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Nenhum" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">Nenhum</SelectItem>
                          <SelectItem value="Promoção">Promoção</SelectItem>
                          <SelectItem value="Novidade">Novidade</SelectItem>
                          <SelectItem value="Mais Vendido">Mais Vendido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block text-sm font-bold">Preço (R$) *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="49,90"
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block text-sm font-bold">
                        Preço original (R$)
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={oldPrice}
                        onChange={(e) => setOldPrice(e.target.value)}
                        placeholder="59,90 (opcional)"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="mb-2 block text-sm font-bold">Descrição</Label>
                      <Input
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Conte a história do seu produto, materiais, tamanho..."
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block text-sm font-bold">Estoque</Label>
                      <Input
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 border-t border-border pt-5">
                    <Button type="button" variant="secondary" onClick={resetForm}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      <Save className="size-4" />
                      {editingId ? "Salvar Alterações" : "Cadastrar Produto"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="bg-pine-700 text-white">
                <CardContent className="p-6">
                  <h4 className="mb-2 font-bold">Dicas para vender mais</h4>
                  <ul className="space-y-2 text-sm text-pine-100">
                    <li>• Fotos claras e com boa iluminação</li>
                    <li>• Conte a história do seu produto</li>
                    <li>• Use o selo Promoção em datas especiais</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-pine-100">
                      <ArrowUpRight className="size-5 text-pine-700" />
                    </span>
                    <div>
                      <p className="text-sm font-bold">Visibilidade</p>
                      <p className="text-xs text-gray-500">
                        Produtos completos aparecem mais nas buscas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-semibold">{o.id}</TableCell>
                      <TableCell>{o.customer}</TableCell>
                      <TableCell className="text-sm text-gray-500">{o.items}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatPrice(o.total)}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("font-medium", statusClass[o.status] ?? "bg-muted text-gray-600")}>
                          {o.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{o.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir produto</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produto? Essa ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button
              className="bg-brick-500 text-white hover:bg-brick-600"
              onClick={() => {
                if (deleteId) deleteProduct(deleteId)
                setDeleteId(null)
              }}
            >
              <Trash2 className="size-4" /> Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Separator className="mx-auto mt-8 max-w-7xl" />
      <Footer />
    </div>
  )
}