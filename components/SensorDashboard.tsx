"use client";

import React from "react";
import {
  Thermometer,
  Droplet,
  Activity,
  Volume2,
} from "lucide-react";
import { useMultiSensorRealtime } from "../hooks/useMultiSensorRealtime";
import CircleProgress from "./CircleProgress";

const SensorDashboard = () => {
  const { readings, loading } = useMultiSensorRealtime();

  if (loading) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-500 font-medium">
        Cargando sensores...
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      
      {/* Título */}
      <h3 className="text-2xl font-semibold text-gray-800">
        Monitoreo en Tiempo Real
      </h3>

      {/* Grid de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <CircleProgress
          title="Temperatura"
          icon={Thermometer}
          displayValue={readings.temperature || 0}
          unit="°C"
          percentage={((readings.temperature || 0) / 50) * 100}
          color="text-orange-500"
        />

        <CircleProgress
          title="Humedad Ambiente"
          icon={Droplet}
          displayValue={readings.humidity || 0}
          unit="%"
          percentage={readings.humidity || 0}
          color="text-blue-500"
        />

        <CircleProgress
          title="Nivel de Agua"
          icon={Activity}
          displayValue={readings.water || 0}
          unit="%"
          percentage={readings.water || 0}
          color="text-cyan-500"
        />

        <CircleProgress
          title="Humedad Tierra"
          icon={Volume2}
          displayValue={readings.soil || 0}
          unit="%"
          percentage={readings.soil || 0}
          color="text-green-500"
        />

      </div>
    </div>
  );
};

export default SensorDashboard;
