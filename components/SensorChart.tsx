// components/SensorChart.tsx (Antes DailyChart)
"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useSensorData } from "@/hooks/useSensorData";
import { DateRangePicker } from "./DateRangePicker";

interface SensorChartProps {
  sensorKey: string;
}

const SENSOR_NAMES: Record<string, string> = {
  temperature: "Temperatura",
  humidity: "Humedad en ambiente",
  water: "Nivel de agua del tanque",
  soil: "Humedad en tierra",
};

const SensorChart: React.FC<SensorChartProps> = ({ sensorKey }) => {
  // Estado inicial: Hoy
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);

  // Pasamos las fechas al hook
  const { data, loading } = useSensorData(sensorKey, startDate, endDate);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-4 md:mb-0">
          📊 Historial - {SENSOR_NAMES[sensorKey] || sensorKey}
        </h2>
      </div>

      {/* Componente de selección de fechas */}
      <DateRangePicker 
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <div className="flex-grow min-h-[300px]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 animate-pulse">Cargando datos...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex justify-center items-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">
              No hay datos registrados entre el {startDate} y el {endDate}.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="created_at" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
              <Line
                name="Valor"
                type="monotone"
                dataKey="valor"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false} // Quitamos los puntos para mejorar rendimiento si hay muchos datos
                activeDot={{ r: 6, fill: "#16a34a" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SensorChart;