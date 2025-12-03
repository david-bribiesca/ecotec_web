import "@/app/globals.css" // Asegúrate de tener tu archivo de estilos globales (Tailwind)
import React from "react";
import SideBar from "@/components/SideBar";
// Metadata opcional para SEO
export const metadata = {
  title: "Smart Domotic Dashboard",
  description:
    "Modern smart home dashboard built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <div className="min-h-screen bg-gray-100 flex">
          {/* El Sidebar es fijo y persistente en todas las rutas */}
          <SideBar />

          {/* El contenido específico de la página (page.tsx) se renderiza aquí */}
          {/* Añadimos ml-20 para compensar el ancho del Sidebar */}
          <main className="flex-1 ml-20">{children}</main>
        </div>
      </body>
    </html>
  );
}