"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const reviews = [
  {
    name: "Santiago Martínez",
    text: "Pedí la Maceta y me llegó una protoboard con cables y sensores.",
    rating: 0,
  },
  {
    name: "Carlos Gloria",
    text: "Le di 5 estrellas por error",
    rating: 5,
  },
  {
    name: "Lucía Verde",
    text: "Intenté regar mi planta con mi WiFi y no funcionó.",
    rating: 3,
  },
  {
    name: "Andrés Tellez",
    text: "El dashboard se ve genial, pero no hay maceta física todavía...",
    rating: 4,
  },
]

export default function Reviews() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % reviews.length)
  const prev = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length)

  const review = reviews[index]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
          Lo que dicen nuestros usuarios
        </h2>

        <div className="relative bg-green-50 shadow-md rounded-2xl p-10 max-w-2xl mx-auto">
          <p className="text-gray-700 text-lg italic mb-6">“{review.text}”</p>
          <div className="flex justify-center mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="font-semibold text-green-700">{review.name}</p>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white shadow hover:bg-green-100 transition"
            >
              <ChevronLeft className="w-5 h-5 text-green-600" />
            </button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button
              onClick={next}
              className="p-2 rounded-full bg-white shadow hover:bg-green-100 transition"
            >
              <ChevronRight className="w-5 h-5 text-green-600" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
