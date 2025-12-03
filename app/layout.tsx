import "./globals.css"

export const metadata = {
  title: "Mi App",
  description: "Aplicación con Supabase y Next.js"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
