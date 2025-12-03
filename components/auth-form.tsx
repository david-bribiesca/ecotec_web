"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) router.push("/dashboard")
    }
    checkUser()
  }, [router])

  const handleAuth = async (mode: "login" | "signup") => {
    setLoading(true)
    setError("")
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        // Verificar si ya existe
        const { data: existingUser, error: userError } = await supabase
          .from("auth.users")
          .select("*")
          .eq("email", email)
          .maybeSingle()

        if (userError && userError.code !== "PGRST116") throw userError
        if (existingUser) throw new Error("Ya existe una cuenta con este correo electrónico")

        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      }
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Error inesperado, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50">
      <div className="max-w-md w-full mx-4 p-10 bg-white/70 backdrop-blur-xl border border-green-200 rounded-3xl shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-green-700">Bienvenido a EcoTec</h1>
        <p className="text-gray-600 mb-8">Inicia sesión o crea una cuenta para continuar</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border border-green-300 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border border-green-300 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
        </div>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-2 mt-4 text-sm">
            {error}
          </p>
        )}

        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => handleAuth("login")}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Iniciar sesión"}
          </button>
          <button
            onClick={() => handleAuth("signup")}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-white border border-green-600 text-green-700 hover:bg-green-50 rounded-lg font-medium transition disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Registrarse"}
          </button>
        </div>
      </div>
    </div>
  )
}
