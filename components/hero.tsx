import Link from "next/link"
import Image from "next/image"
export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white text-center py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Cuida tus plantas con{" "}
          <span className="text-green-600">Tecnología inteligente IoT</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          SmartPot es una maceta inteligente que monitorea la humedad, luz y temperatura 
          de tus plantas en tiempo real, y ajusta el riego automáticamente desde la nube.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Comenzar ahora
          </Link>
          <Link
            href="#features"
            className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Saber más
          </Link>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="w-140 h-auto bg-gray-200 rounded-2xl shadow-inner flex items-center justify-center">
            <Image
              src="/ecotec.png"
              alt="Imagen de SmartPot"
              width={320}
              height={180}
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
