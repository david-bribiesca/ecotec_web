import Image from "next/image"

const teamMembers = [
  {
    name: "David Bribiesca",
    role: "CEO & Fundador",
    description:
      "Visionario detrás de EcoTec, apasionado por la tecnología verde y el impacto ambiental positivo.",
    image: "/david_bribiesca.jpg", // 🔸 Cambia por la imagen real
  },
  {
    name: "Aarón Hernández",
    role: "CTO",
    description:
      "Ingeniero de sistemas experto en IoT y arquitectura de nube. Dirige el desarrollo tecnológico de SmartPot.",
    image: "/aaron_hdz.jpg",
  },
  {
    name: "Ángeles Araiza",
    role: "Diseñador UX/UI",
    description:
      "Responsable de la experiencia visual de EcoTec. Crea interfaces intuitivas y atractivas.",
    image: "/angeles_araiza.jpg",
  },
  {
    name: "Francisco Alarcón",
    role: "Analista de Datos",
    description:
      "Encargado de convertir la información de sensores en insights útiles para los usuarios.",
    image: "/fran_alarcon.jpg",
  },
  {
    name: "Ángel Landín",
    role: "Marketing Lead",
    description:
      "Estratega digital que impulsa la presencia de EcoTec en el mercado de tecnología sustentable.",
    image: "/angel_landin.jpg",
  },
]

export default function TeamSection() {
  return (
    <section id="team" className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-12">
          Conoce al <span className="text-green-600">Equipo EcoTec</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-16 text-lg">
          Un grupo multidisciplinario comprometido con llevar la tecnología y la naturaleza al siguiente nivel.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col items-center p-6"
            >
              {/* Placeholder o imagen real */}
              <div className="w-32 h-32 mb-4 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-green-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
