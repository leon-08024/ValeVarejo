import { useState } from "react"
import {
  BadgeCheck,
  Copy,
  CopyCheck,
  MapPin,
  Package,
  PackageOpen,
  Truck,
  User,
  Store as StoreIcon,
} from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/AuthContext"
import { formatPrice } from "@/lib/format"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface OrderItem {
  emoji: string
  name: string
  qty: number
  price: number
}

interface Order {
  id: string
  date: string
  status: string
  items: OrderItem[]
  total: number
  tracking: string
  storeName: string
  owner: string
  whatsapp: string
  location: string
}

const demoOrders: Order[] = [
  {
    id: "VV-2026-0042",
    date: "03/08/2026",
    status: "Em transporte",
    items: [
      { emoji: "🏺", name: "Vaso de Cerâmica Pintado à Mão", qty: 1, price: 89.9 },
      { emoji: "🍓", name: "Geleia de Morango da Serra", qty: 2, price: 28.9 },
    ],
    total: 147.7,
    tracking: "PM741258963BR",
    storeName: "Cerâmica Vale Europeu",
    owner: "Maria Silva",
    whatsapp: "5547999001100",
    location: "Blumenau",
  },
  {
    id: "VV-2026-0038",
    date: "21/07/2026",
    status: "Entregue",
    items: [
      { emoji: "📿", name: "Colar de Prata com Ametista", qty: 1, price: 189.9 },
    ],
    total: 189.9,
    tracking: "OB987654321BR",
    storeName: "Joias do Vale",
    owner: "Laura Schmidt",
    whatsapp: "5547999005500",
    location: "Itajaí",
  },
  {
    id: "VV-2026-0031",
    date: "02/07/2026",
    status: "Entregue",
    items: [
      { emoji: "🧶", name: "Cobertor de Algodão Trançado", qty: 1, price: 220.0 },
    ],
    total: 220.0,
    tracking: "BR123456789AZ",
    storeName: "Fios do Campo",
    owner: "Ana Weber",
    whatsapp: "5547999003300",
    location: "Indaial",
  },
]

const statusClass: Record<string, string> = {
  Entregue: "bg-pine-100 text-pine-700",
  "Em transporte": "bg-mustard-300/30 text-ocher-700",
  "Aguardando pagamento": "bg-brick-100 text-brick-600",
  "Pedido recebido": "bg-ardoise-100 text-ardoise-700",
}

function copyTracking(code: string) {
  navigator.clipboard.writeText(code).then(() => {
    toast.success(`Código de rastreio ${code} copiado!`)
  })
}

export default function MinhaConta() {
  const { user, login } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-pine-100">
              <User className="size-8 text-pine-700" />
            </span>
            <h1 className="mt-4 mb-2 text-3xl font-extrabold">Minha Conta</h1>
            <p className="text-gray-500">
              Entre para acompanhar seus pedidos e rastrear encomendas
            </p>
          </div>
          <Card>
            <CardContent className="p-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setError("")
                  if (!name.trim()) {
                    setError("Informe seu nome")
                    return
                  }
                  if (!email.includes("@")) {
                    setError("Informe um e-mail válido")
                    return
                  }
                  login(name, email)
                  toast.success(`Bem-vindo(a), ${name.split(" ")[0]}!`)
                }}
                className="space-y-5"
              >
                <div>
                  <Label className="mb-2 block text-sm font-bold">Nome</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-bold">E-mail</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@email.com"
                    autoComplete="email"
                  />
                </div>
                {error && (
                  <p className="rounded-lg bg-brick-100 px-4 py-2 text-sm font-medium text-brick-600">
                    {error}
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full">
                  Entrar como Cliente
                </Button>
                <p className="text-center text-xs text-gray-400">
                  Conta demo — digite qualquer nome e e-mail válido para ver seus
                  pedidos.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const delivered = demoOrders.filter((o) => o.status === "Entregue").length
  const inTransit = demoOrders.filter((o) => o.status === "Em transporte").length

  const clientStats = [
    { icon: Package, label: "Pedidos", value: demoOrders.length, color: "bg-pine-100 text-pine-700" },
    { icon: Truck, label: "Em transporte", value: inTransit, color: "bg-mustard-300/30 text-ocher-700" },
    { icon: BadgeCheck, label: "Entregues", value: delivered, color: "bg-pine-100 text-pine-700" },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Meus Pedidos</h1>
            <p className="mt-1 text-gray-500">
              Olá, {user.name.split(" ")[0]}! Acompanhe suas compras no Vale do
              Itajaí.
            </p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4">
          {clientStats.map((stat) => (
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

        <div className="space-y-5">
          {demoOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-extrabold">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-500">Realizado em {order.date}</p>
                  </div>
                  <Badge className={cn("font-medium", statusClass[order.status] ?? "bg-muted text-gray-600")}>
                    {order.status}
                  </Badge>
                </div>

                <div className="mb-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-lg">
                        {item.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-400">
                          {item.qty} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="text-sm font-bold">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-border py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-ardoise-100">
                      <PackageOpen className="size-4 text-ardoise-700" />
                    </span>
                    <div>
                      <p className="text-xs text-gray-400">Código de rastreamento</p>
                      <button
                        onClick={() => {
                          copyTracking(order.tracking)
                          setCopiedId(order.id)
                          setTimeout(() => setCopiedId(null), 2000)
                        }}
                        className="flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-pine-700"
                        title="Copiar código"
                      >
                        {order.tracking}
                        {copiedId === order.id ? (
                          <CopyCheck className="size-3.5" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="font-extrabold text-primary">{formatPrice(order.total)}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-pine-600 text-sm font-black text-white">
                      {order.storeName.charAt(0)}
                    </span>
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-bold">
                        <StoreIcon className="size-3.5 text-pine-700" />
                        {order.storeName}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin className="size-3" /> {order.location} · {order.owner}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${order.whatsapp}?text=${encodeURIComponent(
                      `Olá, ${order.owner}! Sou cliente do ValeVarejo e gostaria de falar sobre o pedido #${order.id}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-[#25d366] text-white hover:bg-[#1da851]"
                    )}
                  >
                    Falar com o Lojista
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          Pedidos de exemplo — quando houver backend, seus pedidos reais aparecerão aqui.
        </p>
      </div>
      <Footer />
    </div>
  )
}