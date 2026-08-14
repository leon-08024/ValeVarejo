import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  function submit(e: React.FormEvent) {
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
    if (password.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres")
      return
    }
    login(name, email)
    toast.success(`Bem-vindo(a), ${name.split(" ")[0]}!`)
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <h1 className="mb-2 text-center text-3xl font-extrabold">Entrar</h1>
        <p className="mb-10 text-center text-gray-500">
          Acesse sua conta de lojista
        </p>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={submit} className="space-y-5">
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
              <div>
                <Label className="mb-2 block text-sm font-bold">Senha</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-brick-100 px-4 py-2 text-sm font-medium text-brick-600">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full">
                <LogIn className="size-4" /> Entrar
              </Button>
              <p className="text-center text-xs text-gray-400">
                Conta demo — digite qualquer nome e e-mail válido para acessar o
                painel.
              </p>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-gray-500">
          Ainda não tem loja?{" "}
          <Link
            to="/dashboard"
            className="font-semibold text-pine-600 transition-colors hover:text-pine-700"
          >
            Cadastre-se gratuitamente
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  )
}