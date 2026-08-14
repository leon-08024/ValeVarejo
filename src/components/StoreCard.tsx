import { useNavigate } from "react-router-dom"
import { MapPin, Package, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Store } from "@/lib/data"

export function StoreCard({ store }: { store: Store }) {
  const navigate = useNavigate()

  return (
    <Card
      className="cursor-pointer transition-colors hover:border-pine-200"
      onClick={() => navigate(`/loja/${store.id}`)}
    >
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-pine-600 text-xl font-black text-white">
            {store.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-foreground">{store.name}</h3>
            <Badge variant="secondary" className="mt-1 bg-pine-100 text-pine-700">
              {store.category}
            </Badge>
          </div>
        </div>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {store.desc}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-3" /> {store.location}
          </span>
          <span className="flex items-center gap-1">
            <Package className="size-3" /> {store.products} produtos
          </span>
          <span className="flex items-center gap-1">
            <Star className="size-3" /> {store.rating}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}