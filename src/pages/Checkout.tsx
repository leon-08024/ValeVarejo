import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Check, Lock, MapPin, ShoppingCart, Truck } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/format"
import { cities } from "@/lib/data"

const FREE_SHIPPING_MIN = 200
const SHIPPING_PRICE = 29.9

export default function Checkout() {
  const { cart, getCartTotal, getCartCount, clearCart } = useCart()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [payment, setPayment] = useState("pix")
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="py-20 text-center">
          <div className="mb-6">
            <ShoppingCart className="mx-auto size-16 text-gray-300" />
          </div>
          <h3 className="mb-3 text-2xl font-bold text-gray-700">
            Seu carrinho está vazio
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

  const subtotal = getCartTotal()
  const frete = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_PRICE
  const total = subtotal + frete

  function validate() {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = "Informe seu nome"
    if (!phone.trim()) errs.phone = "Informe seu telefone"
    if (!address.trim()) errs.address = "Informe seu endereço"
    if (!city) errs.city = "Selecione sua cidade"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    clearCart()
    setShowSuccess(true)
  }

  const payLabel =
    payment === "pix"
      ? "Pix"
      : payment === "card"
        ? "Cartão"
        : "Dinheiro na entrega"

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-2 text-3xl font-extrabold">Checkout</h1>
        <p className="mb-8 text-gray-500">Complete seus dados para finalizar a compra</p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <form onSubmit={submit} className="space-y-6 lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-pine-100">
                    <MapPin className="size-4 text-pine-700" />
                  </span>
                  Dados de Entrega
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label className="mb-2 block text-sm font-bold">
                      Nome completo
                    </Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Maria Silva"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-brick-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label className="mb-2 block text-sm font-bold">
                      Telefone / WhatsApp
                    </Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(47) 99999-9999"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-brick-500">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label className="mb-2 block text-sm font-bold">Cidade</Label>
                    <Select value={city} onValueChange={(v) => setCity(v ?? "")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.city && (
                      <p className="mt-1 text-xs text-brick-500">{errors.city}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="mb-2 block text-sm font-bold">Endereço</Label>
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, número, bairro"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-brick-500">{errors.address}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-pine-100">
                    <Lock className="size-4 text-pine-700" />
                  </span>
                  Pagamento
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { id: "pix", label: "Pix", desc: "Aprovação imediata" },
                    { id: "card", label: "Cartão", desc: "Na entrega ou online" },
                    { id: "money", label: "Dinheiro", desc: "Pague na entrega" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPayment(opt.id)}
                      className={
                        "rounded-lg border-2 p-4 text-left transition-colors " +
                        (payment === opt.id
                          ? "border-pine-500 bg-pine-50"
                          : "border-border bg-card hover:border-pine-200")
                      }
                    >
                      <div className="mb-1 text-sm font-bold text-foreground">
                        {opt.label}
                      </div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary">
                <Link to="/carrinho" className="flex items-center gap-1.5">
                  Voltar
                </Link>
              </Button>
              <Button type="submit" size="lg" className="min-w-48">
                Confirmar Pedido · {formatPrice(total)}
              </Button>
            </div>
          </form>

          <div className="lg:col-span-1">
            <Card className="sticky top-36">
              <CardContent className="p-6">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-pine-100">
                    <Truck className="size-4 text-pine-700" />
                  </span>
                  Resumo do Pedido
                </h3>
                <div className="mb-5 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-xl">
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
                <Separator />
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Subtotal ({getCartCount()} itens)
                    </span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frete</span>
                    <span className="font-semibold text-pine-600">
                      {frete === 0 ? "Grátis" : formatPrice(frete)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 text-base font-extrabold">
                    <span>Total</span>
                    <span className="text-pine-700">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Pagamento</span>
                    <span>{payLabel}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-2 flex justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-pine-100">
                <Check className="size-8 text-pine-600" />
              </span>
            </div>
            <DialogTitle className="text-center">Pedido realizado!</DialogTitle>
            <DialogDescription className="text-center">
              Sua compra foi confirmada com {payLabel}. Entraremos em contato pelo
              WhatsApp para combinar a entrega. Obrigado por apoiar o Vale do
              Itajaí!
            </DialogDescription>
          </DialogHeader>
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              setShowSuccess(false)
              navigate("/catalogo")
            }}
          >
            Continuar Comprando
          </Button>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}