import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "../globals.css"

export const metadata = {
  title: "Mi App",
  description: "Landing page con login y dashboard protegido"
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
