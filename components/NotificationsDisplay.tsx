"use client";

import React, { useState } from "react";
import DateSelector from "./DateSelector";
import { useNotificationsByDate } from "@/hooks/useNotificationsByDate";

const NotificationsDisplay: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const { data, loading } = useNotificationsByDate(selectedDate);

  return (
    <div className="w-full flex flex-col gap-6">
      <DateSelector value={selectedDate} onChange={setSelectedDate} />

      {!selectedDate ? (
        <p className="text-gray-500 text-center">
          Selecciona una fecha para ver notificaciones.
        </p>
      ) : loading ? (
        <p className="text-gray-500 text-center">Cargando datos...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-center">
          No hay notificaciones para esta fecha.
        </p>
      ) : (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Notificaciones del día {selectedDate}
          </h2>

          <ul className="space-y-3">
            {data.map((n) => (
              <li
                key={n.id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {n.actuadores?.nombre || "Actuador desconocido"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(n.created_at).toLocaleTimeString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    n.estado ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {n.estado ? "ENCENDIDO" : "APAGADO"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsDisplay;
