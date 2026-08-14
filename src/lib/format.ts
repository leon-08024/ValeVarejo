export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function formatDateBR(value: string) {
  return new Date(value).toLocaleDateString("pt-BR")
}