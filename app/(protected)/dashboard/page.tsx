"use client";

import React, { useState } from "react";
import AccommodationSection from "@/components/AccommodationSection";
import SensorChart from "@/components/SensorChart";
import SensorDashboard from "@/components/SensorDashboard";

export default function Dashboard() {
  const [selectedSensor, setSelectedSensor] = useState<string>("temperature");

  const sensorLabels: Record<string, string> = {
    water: "Nivel de Agua",
    soil: "Humedad de Tierra",
    temperature: "Temperatura",
    humidity: "Humedad Ambiental",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ======================== */}
        {/*      SECCIÓN SUPERIOR     */}
        {/* ======================== */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <SensorDashboard />
        </section>

        {/* ======================== */}
        {/*      CONTENIDO INFERIOR   */}
        {/* ======================== */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Selector de Sensor */}
          <div className="lg:col-span-1">
            <AccommodationSection
              onSelectSensor={(sensorKey) => setSelectedSensor(sensorKey)}
            />
          </div>

          {/* Gráfica del Sensor */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg h-[500px] flex flex-col">
                <SensorChart sensorKey={selectedSensor} />
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
