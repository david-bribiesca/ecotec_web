// hooks/useSensorData.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DataPoint {
  created_at: string; // Para mostrar en XAxis
  full_date: string;  // Para ordenamiento interno
  valor: number;
}

// Ahora aceptamos fechas en formato string "YYYY-MM-DD"
export const useSensorData = (
  sensorKey: string,
  startDate?: string,
  endDate?: string
) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    if (!sensorKey) return;
    setLoading(true);

    // 1. Obtener ID del sensor
    const { data: sensorRows, error: sensorError } = await supabase
      .from("sensores")
      .select("id")
      .eq("tipo_sensor", sensorKey)
      .limit(1);

    if (sensorError || !sensorRows?.length) {
      console.error("Sensor no encontrado");
      setLoading(false);
      return;
    }

    const sensorId = sensorRows[0].id;

    // 2. Preparar fechas (Si no vienen, usamos HOY por defecto)
    const today = new Date().toISOString().split("T")[0];
    const start = startDate || today;
    const end = endDate || today;

    // Formatear ISO para cubrir todo el día: 00:00:00 a 23:59:59
    const startISO = `${start}T00:00:00`;
    const endISO = `${end}T23:59:59`;

    // 3. Consulta con rango
    const { data: readings, error: readingsError } = await supabase
      .from("lecturas_sensores")
      .select("recorded_at, valor")
      .eq("sensor_id", sensorId)
      .gte("recorded_at", startISO) // Mayor o igual al inicio del día A
      .lte("recorded_at", endISO)   // Menor o igual al final del día B
      .order("recorded_at", { ascending: true });

    if (readingsError) {
      console.error("Error fetching readings:", readingsError);
      setLoading(false);
      return;
    }

    // 4. Formatear
    const formatted = readings.map((row) => {
      const dateObj = new Date(row.recorded_at);
      return {
        // Si es el mismo día, mostramos hora. Si son varios días, mostramos fecha y hora
        created_at: start === end 
          ? dateObj.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })
          : dateObj.toLocaleString("es-MX", { month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" }),
        full_date: row.recorded_at,
        valor: Number(row.valor),
      };
    });

    setData(formatted);
    setLoading(false);
  }, [sensorKey, startDate, endDate]);

  useEffect(() => {
    fetchData();

    // Solo activamos realtime si el rango incluye el día de hoy (opcional, pero optimiza)
    // Para simplificar, lo dejamos activo, filtrará en el siguiente fetch.
    const channel = supabase
      .channel(`realtime-${sensorKey}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lecturas_sensores" },
        fetchData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sensorKey, startDate, endDate, fetchData]);

  return { data, loading };
};