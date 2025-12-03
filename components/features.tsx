import { ChartBar, Database, Lock } from "lucide-react"

const features = [
  {
    icon: <ChartBar className="w-10 h-10 text-green-600" />,
    title: "Monitoreo Inteligente",
    description:
      "Obtén datos en tiempo real sobre la humedad, luz solar y temperatura de tu planta directamente desde la nube.",
  },
  {
    icon: <Database className="w-10 h-10 text-green-600" />,
    title: "Conectividad IoT en la Nube",
    description:
      "Nuestra maceta se conecta a Supabase para almacenar y analizar la información de tus plantas de manera automática.",
  },
  {
    icon: <Lock className="w-10 h-10 text-green-600" />,
    title: "Automatización Segura",
    description:
      "Controla el riego y las alertas de tu planta con un sistema protegido por autenticación segura y cifrado.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          ¿Por qué elegir nuestra maceta inteligente IoT?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
