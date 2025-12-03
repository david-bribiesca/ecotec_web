"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSensorData } from "@/hooks/useSensorData";

interface DailyChartProps {
  sensorKey: string;
}

const SENSOR_NAMES: Record<string, string> = {
  temperature: "Temperatura",
  humidity: "Humedad en ambiente",
  water: "Nivel de agua del tanque",
  soil: "Humedad en tierra",
};

const DailyChart: React.FC<DailyChartProps> = ({ sensorKey }) => {
  const { data, loading } = useSensorData(sensorKey);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 h-full">
      <h2 className="text-xl font-semibold text-green-700 mb-4">
        📊 Datos del día - {SENSOR_NAMES[sensorKey]}
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando datos...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No hay datos registrados hoy.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="created_at" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="valor"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ fill: "#16a34a" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DailyChart;
