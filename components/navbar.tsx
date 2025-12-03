"use client"

import Link from "next/link"
import { useState } from "react"
import { Leaf} from "lucide-react"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo (Izquierda) */}
        <Link href="/" className="text-2xl font-bold text-green-600 flex items-center space-x-5">
        <Leaf className="text-green-600 w-8 h-8" />
          EcoTec
        </Link>

        {/* Enlaces de Navegación (Escritorio - Derecha) */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/about" className="hover:text-green-600 transition">
            Sobre nosotros
          </Link>
          <Link href="/login" className="hover:text-green-600 transition">
            Iniciar sesión
          </Link>
          <Link
            href="/login"
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Comenzar ahora
          </Link>
        </div>

        {/* Botón Hamburguesa (Móvil) */}
        <button
          className="md:hidden text-green-700 focus:outline-none text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* Menú Desplegable (Móvil) */}
      <div
        className={`md:hidden bg-white shadow-md transition-all ease-in-out duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Link href="/about" className="block px-4 py-2 hover:bg-green-50 transition">
          Sobre nosotros
        </Link>
        <Link href="/login" className="block px-4 py-2 hover:bg-green-50 transition">
          Iniciar sesión
        </Link>
        <Link
          href="/login"
          className="block px-4 py-2 text-green-600 font-semibold hover:bg-green-100 transition"
        >
          Comenzar ahora
        </Link>
      </div>
    </nav>
  )
}
