"use client"

import { useEffect, useRef, useState } from "react"

export default function Stats() {
  const [buyers, setBuyers] = useState(0)
  const [satisfied, setSatisfied] = useState(10000000)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      { threshold: 0.4 } // 40% visible para activarse
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) {
      // Reinicia los valores cuando la sección deja de verse
      setBuyers(0)
      setSatisfied(10000000)
      return
    }

    let startTime = Date.now()
    const duration = 2000 // 4 segundos de animación

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      setBuyers(Math.floor(progress * 10000000))
      setSatisfied(Math.floor(10000000 - progress * 10000000))

      if (progress < 1 && isVisible) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gray-50 border-t border-gray-200 transition-opacity duration-700"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Estadísticas del Ecosistema SmartPot
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Usuarios que han comprado
            </h3>
            <p className="text-5xl font-extrabold text-green-600">
              {buyers.toLocaleString()}
            </p>
            <p className="text-gray-500 mt-2 text-sm">
              Personas que confiaron en nuestra visión IoT para el cuidado de plantas.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Usuarios satisfechos
            </h3>
            <p className="text-5xl font-extrabold text-green-600">
              {satisfied.toLocaleString()}
            </p>
            <p className="text-gray-500 mt-2 text-sm">
              Seguimos trabajando para mejorar su experiencia con SmartPot.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
