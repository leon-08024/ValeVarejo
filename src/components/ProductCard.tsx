import { useNavigate } from "react-router-dom"
import { MapPin, ShoppingCart, Store as StoreIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/format"
import { getStoreById, type Product } from "@/lib/data"
import { cn } from "@/lib/utils"

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const store = getStoreById(product.storeId)

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  const badgeClass =
    product.badge === "Promoção"
      ? "bg-brick-500 text-white"
      : product.badge === "Novidade"
        ? "bg-ardoise-600 text-white"
        : "bg-pine-600 text-white"

  return (
    <Card
      className="group cursor-pointer overflow-hidden"
      onClick={() => navigate(`/produto/${product.id}`)}
    >
      <div className="relative flex h-52 items-center justify-center bg-muted text-7xl">
        <span>{product.emoji}</span>
        {product.badge && (
          <Badge className={cn("absolute top-3 left-3", badgeClass)}>
            {product.badge}
          </Badge>
        )}
        {discount && (
          <Badge className="absolute top-3 right-3 bg-clay-500 text-white">
            -{discount}%
          </Badge>
        )}
      </div>
      <CardContent className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-pine-100">
            <StoreIcon className="size-3 text-pine-700" />
          </span>
          <span className="truncate text-xs font-semibold text-primary">
            {store?.name ?? ""}
          </span>
        </div>
        <h3 className="mb-1 line-clamp-2 text-sm leading-snug font-bold text-foreground">
          {product.name}
        </h3>
        <p className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" /> {store?.location ?? "Vale do Itajaí"}
        </p>
        <div className="mb-4 flex items-end gap-2">
          <span className="text-xl font-extrabold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation()
            addToCart(product.id)
          }}
        >
          <ShoppingCart className="size-4" />
          Adicionar ao Carrinho
        </Button>
      </CardContent>
    </Card>
  )
}