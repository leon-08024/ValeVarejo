import { Link } from "react-router-dom"
import { ClipboardList, Minus, Plus, ShoppingCart, X } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/format"
import { getStoreById } from "@/lib/data"
import { cn } from "@/lib/utils"

const FREE_SHIPPING_MIN = 200
const SHIPPING_PRICE = 29.9

export default function Carrinho() {
  const { cart, removeFromCart, updateQty, getCartTotal, getCartCount } = useCart()

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
          <p className="mx-auto mb-8 max-w-md text-gray-500">
            Adicione produtos do catálogo para começar suas compras!
          </p>
          <Button size="lg" className="mt-4">
            <Link to="/catalogo" className="flex items-center gap-1.5">
              Ver Catálogo →
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const subtotal = getCartTotal()
  const frete = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_PRICE
  const total = subtotal + frete

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-2 text-3xl font-extrabold">Meu Carrinho</h1>
        <p className="mb-8 text-gray-500">
          {getCartCount()} item(s) no carrinho
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => {
              const store = getStoreById(item.storeId)
              return (
                <Card key={item.id}>
                  <CardContent className="flex gap-5 p-5">
                    <div className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-muted text-4xl">
                      {item.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 truncate font-bold text-foreground">
                        {item.name}
                      </h4>
                      <p className="mb-2 text-xs font-medium text-pine-600">
                        {store?.name ?? ""}
                      </p>
                      <p className="text-lg font-extrabold text-pine-700">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-brick-500"
                      >
                        <X className="size-3.5" /> Remover
                      </button>
                      <div className="inline-flex items-center rounded-lg bg-muted p-0.5">
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >
                          <Minus className="size-3.5" />
                        </Button>
                        <span className="w-8 text-center text-sm font-bold">
                          {item.qty}
                        </span>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >
                          <Plus className="size-3.5" />
                        </Button>
                      </div>
                      <p className="font-bold text-foreground">
                        {formatPrice(item.price * item.qty)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-36">
              <CardContent className="p-6">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-pine-100">
                    <ClipboardList className="size-4 text-pine-700" />
                  </span>
                  Resumo do Pedido
                </h3>
                <div className="mb-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Subtotal ({getCartCount()} itens)
                    </span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frete</span>
                    <span className={cn("font-semibold", frete === 0 && "text-pine-600")}>
                      {frete === 0 ? "Grátis" : formatPrice(frete)}
                    </span>
                  </div>
                  {frete > 0 && (
                    <p className="rounded-lg bg-pine-50 px-3 py-2 text-xs text-pine-600">
                      Frete grátis acima de R$ {FREE_SHIPPING_MIN.toFixed(2).replace(".", ",")}
                    </p>
                  )}
                </div>
                <Separator />
                <div className="mb-6 flex justify-between border-t border-border pt-4 text-lg font-extrabold">
                  <span>Total</span>
                  <span className="text-pine-700">{formatPrice(total)}</span>
                </div>
<Link
                  to="/checkout"
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  Finalizar Compra
                </Link>
                <Link
                  to="/catalogo"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "secondary" }),
                    "mt-3 w-full"
                  )}
                >
                  Continuar Comprando
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}