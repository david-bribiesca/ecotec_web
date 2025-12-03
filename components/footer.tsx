export default function Footer() {
  return (
    <footer className="bg-green-50 py-8 mt-16 border-t border-green-100">
      <div className="max-w-6xl mx-auto text-center text-gray-700 text-sm">
        <p>© {new Date().getFullYear()} EcoTec IoT. Todos los derechos reservados.</p>
        <p className="mt-1 text-xs text-gray-500">
          Conectando tecnología e inteligencia natural para cuidar tus plantas.
        </p>
      </div>
    </footer>
  )
}
