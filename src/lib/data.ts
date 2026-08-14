import {
  Palette,
  Armchair,
  Shirt,
  Utensils,
  Gem,
  BookOpen,
  Beer,
  Leaf,
  type LucideIcon,
} from "lucide-react"

export interface Store {
  id: number
  name: string
  category: string
  desc: string
  location: string
  products: number
  rating: number
  owner: string
  whatsapp: string
}

export interface Product {
  id: number
  storeId: number
  name: string
  category: string
  price: number
  oldPrice: number | null
  badge: string | null
  desc: string
  emoji: string
  stock: number
}

export interface Category {
  name: string
  icon: LucideIcon
  count: number
}

export const stores: Store[] = [
  { id: 1, name: "Cerâmica Vale Europeu", category: "Artesanato", desc: "Peças de cerâmica artesanal feitas à mão com técnicas tradicionais europeias.", location: "Blumenau", products: 24, rating: 4.8, owner: "Maria Silva", whatsapp: "5547999001100" },
  { id: 2, name: "Madeira & Cia", category: "Móveis", desc: "Móveis rústicos e modernos em madeira de reflorestamento.", location: "Brusque", products: 18, rating: 4.6, owner: "João Peters", whatsapp: "5547999002200" },
  { id: 3, name: "Fios do Campo", category: "Têxtil", desc: "Roupas e acessórios tecidos à mão com algodão orgânico.", location: "Indaial", products: 32, rating: 4.9, owner: "Ana Weber", whatsapp: "5547999003300" },
  { id: 4, name: "Gastronomia Colônia", category: "Gastronomia", desc: "Conservas, geleias e temperos típicos da culinária colonial.", location: "Gaspar", products: 15, rating: 4.7, owner: "Hans Müller", whatsapp: "5547999004400" },
  { id: 5, name: "Joias do Vale", category: "Joias", desc: "Joias artesanais em prata e pedras naturais da região.", location: "Itajaí", products: 28, rating: 4.5, owner: "Laura Schmidt", whatsapp: "5547999005500" },
  { id: 6, name: "Papel & Arte", category: "Papelaria", desc: "Papel artesanal, convites personalizados e scrapbooks.", location: "Florianópolis", products: 20, rating: 4.4, owner: "Carlos Becker", whatsapp: "5547999006600" },
  { id: 7, name: "Cervejaria Artesanal Vale", category: "Bebidas", desc: "Cervejas artesanais com ingredientes locais e receitas únicas.", location: "Navegantes", products: 12, rating: 4.8, owner: "Peter Huber", whatsapp: "5547999007700" },
  { id: 8, name: "Jardim Secreto", category: "Plantas", desc: "Plantas suculentas, orquídeas e arranjos naturais.", location: "Timbó", products: 35, rating: 4.3, owner: "Sofia Koehler", whatsapp: "5547999008800" },
]

export const products: Product[] = [
  { id: 1, storeId: 1, name: "Vaso de Cerâmica Pintado à Mão", category: "Artesanato", price: 89.9, oldPrice: 119.9, badge: "Mais Vendido", desc: "Vaso de cerâmica com pintura artesanal, cada peça é única. Ideal para decorar sua casa com identidade do Vale do Itajaí. Medidas: 25cm x 15cm.", emoji: "🏺", stock: 15 },
  { id: 2, storeId: 2, name: "Mesa de Jantar Rústica 6 Lugares", category: "Móveis", price: 1250.0, oldPrice: null, badge: null, desc: "Mesa de jantar em madeira maciça de reflorestamento com acabamento rústico. Capacidade para 6 pessoas. Prazo de entrega: 15 dias úteis.", emoji: "🪑", stock: 3 },
  { id: 3, storeId: 3, name: "Cropped de Algodão Orgânico", category: "Têxtil", price: 79.9, oldPrice: null, badge: "Novidade", desc: "Cropped artesanal em algodão orgânico 100%. Tecido respirável e sustentável. Disponível em várias cores.", emoji: "👚", stock: 25 },
  { id: 4, storeId: 4, name: "Geleia de Morango da Serra", category: "Gastronomia", price: 28.9, oldPrice: 34.9, badge: "Promoção", desc: "Geleia artesanal feita com morangos frescos da serra catarinense. Sem conservantes artificiais. Pote de 350g.", emoji: "🍓", stock: 40 },
  { id: 5, storeId: 5, name: "Colar de Prata com Ametista", category: "Joias", price: 189.9, oldPrice: null, badge: null, desc: "Colar artesanal em prata 925 com ametista natural do sul do Brasil. Corrente mede 45cm.", emoji: "📿", stock: 8 },
  { id: 6, storeId: 6, name: "Kit Papel Artesanal para Escrita", category: "Papelaria", price: 45.0, oldPrice: null, badge: null, desc: "Kit com 10 folhas de papel artesanal + 10 envelopes. Perfeito para cartas e convites especiais.", emoji: "✉️", stock: 30 },
  { id: 7, storeId: 7, name: "Growler 1L - IPA Tropical", category: "Bebidas", price: 35.0, oldPrice: null, badge: "Novidade", desc: "Cerveja IPA Tropical artesanal, refrescante com notas de manga e maracujá. Growler de 1 litro.", emoji: "🍺", stock: 20 },
  { id: 8, storeId: 8, name: "Suculenta em Vaso de Barro", category: "Plantas", price: 32.0, oldPrice: 39.9, badge: "Promoção", desc: "Suculenta plantada em vaso de barro artesanal. Cuidados simples, ideal para ambientes internos.", emoji: "🪴", stock: 45 },
  { id: 9, storeId: 1, name: "Conjunto de Xícaras (4 peças)", category: "Artesanato", price: 129.9, oldPrice: null, badge: null, desc: "Conjunto de 4 xícaras de cerâmica com motivos do Vale do Itajaí. Inclui bandeiira.", emoji: "☕", stock: 12 },
  { id: 10, storeId: 3, name: "Cobertor de Algodão Trançado", category: "Têxtil", price: 220.0, oldPrice: 280.0, badge: "Mais Vendido", desc: "Cobertor artesanal trançado em algodão 100%. Quente e macio, ideal para noites frias do Vale.", emoji: "🧶", stock: 10 },
  { id: 11, storeId: 4, name: "Kit Degustação Colonial", category: "Gastronomia", price: 68.0, oldPrice: null, badge: null, desc: "Kit com 5 potes de conservas coloniais: palmito, milho, feijão, vinagrete e pickles.", emoji: "🫙", stock: 18 },
  { id: 12, storeId: 2, name: "Estante de Parede em Pallet", category: "Móveis", price: 280.0, oldPrice: null, badge: "Novidade", desc: "Estante de parede feita com pallet reaproveitado. 3 prateleiras, ideal para livros e decoração.", emoji: "📚", stock: 7 },
  { id: 13, storeId: 5, name: "Anel com Pérola de Água Doce", category: "Joias", price: 145.0, oldPrice: null, badge: null, desc: "Anel artesanal em prata com pérola de água doce cultivada no sul do Brasil.", emoji: "💍", stock: 6 },
  { id: 14, storeId: 7, name: "Pack 6 Cervejas Artesanais", category: "Bebidas", price: 98.0, oldPrice: 120.0, badge: "Promoção", desc: "Pack com 6 cervejas variadas: Lager, IPA, Wheat, Stout, Pale Ale e Amber.", emoji: "🍻", stock: 15 },
  { id: 15, storeId: 8, name: "Orquídea Phalaenopsis", category: "Plantas", price: 55.0, oldPrice: null, badge: null, desc: "Orquídea Phalaenopsis em vaso cerâmico. Floresce por meses, ideal para presentes.", emoji: "🌸", stock: 22 },
  { id: 16, storeId: 6, name: "Diário Artesanal com Capa de Couro", category: "Papelaria", price: 75.0, oldPrice: null, badge: "Mais Vendido", desc: "Diário com 200 páginas de papel artesanal e capa de couro legítimo. Fechamento com cadarço.", emoji: "📔", stock: 14 },
]

export const categories: Category[] = [
  { name: "Artesanato", icon: Palette, count: 44 },
  { name: "Móveis", icon: Armchair, count: 25 },
  { name: "Têxtil", icon: Shirt, count: 38 },
  { name: "Gastronomia", icon: Utensils, count: 30 },
  { name: "Joias", icon: Gem, count: 34 },
  { name: "Papelaria", icon: BookOpen, count: 22 },
  { name: "Bebidas", icon: Beer, count: 18 },
  { name: "Plantas", icon: Leaf, count: 40 },
]

export const cities = [
  "Todos",
  "Blumenau",
  "Brusque",
  "Indaial",
  "Gaspar",
  "Itajaí",
  "Florianópolis",
  "Navegantes",
  "Timbó",
]

export function getStoreById(id: number) {
  return stores.find((s) => s.id === id)
}

export function getStoreName(storeId: number) {
  return getStoreById(storeId)?.name ?? "Loja Parceira"
}

export function getProductsByStore(storeId: number) {
  return products.filter((p) => p.storeId === storeId)
}

export function getProductById(id: number) {
  return products.find((p) => p.id === id)
}