import { Leaf, Eye, Heart } from "lucide-react"

export default function MissionVisionValues() {
  return (
    <section className="bg-white py-24 px-6" id="about">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-12">
          Nuestra <span className="text-green-600">Esencia</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          {/* Misión */}
          <div className="p-8 bg-green-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center space-x-3 mb-4">
              <Leaf className="text-green-600 w-8 h-8" />
              <h3 className="text-2xl font-semibold text-gray-900">Misión</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Nuestra misión es revolucionar el cuidado de las plantas mediante tecnología IoT,
              conectando la naturaleza con la inteligencia digital para promover un futuro más
              sostenible y consciente del medio ambiente.
            </p>
          </div>

          {/* Visión */}
          <div className="p-8 bg-green-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="text-green-600 w-8 h-8" />
              <h3 className="text-2xl font-semibold text-gray-900">Visión</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Ser líderes globales en soluciones inteligentes para el cuidado de plantas, impulsando
              comunidades que integren tecnología y naturaleza en perfecta armonía.
            </p>
          </div>

          {/* Valores */}
          <div className="p-8 bg-green-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="text-green-600 w-8 h-8" />
              <h3 className="text-2xl font-semibold text-gray-900">Valores</h3>
            </div>
            <ul className="text-gray-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Innovación con propósito</li>
              <li>Respeto por la naturaleza</li>
              <li>Transparencia y confianza</li>
              <li>Compromiso con la sostenibilidad</li>
              <li>Pasión por mejorar la vida verde</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
