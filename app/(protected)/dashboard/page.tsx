"use client";

import React, { useState } from "react";
// Asegúrate de importar tus componentes desde la ruta correcta
import AccommodationSection from "@/components/AccommodationSection"; 
import SensorChart from "@/components/SensorChart";

export default function Dashboard() {
  // Estado para saber qué sensor ver. Por defecto: 'temperature'
  const [selectedSensor, setSelectedSensor] = useState<string>("temperature");

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <AccommodationSection 
              onSelectSensor={(sensorKey) => setSelectedSensor(sensorKey)} 
            />
          </div>

          {/* Columna Derecha: Gráfica (Ocupa 2 columnas) */}
          <div className="lg:col-span-2">
            <div className="h-[500px]">
              <SensorChart sensorKey={selectedSensor} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}