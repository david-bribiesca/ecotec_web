"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DataPoint {
  created_at: string;
  valor: number;
}

export const useSensorData = (sensorKey: string) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    if (!sensorKey) return;

    setLoading(true);

    // 1. Buscar el ID del sensor por tipo
    const { data: sensorRows, error: sensorError } = await supabase
      .from("sensores")
      .select("id")
      .eq("tipo_sensor", sensorKey)
      .limit(1);

    if (sensorError || !sensorRows || sensorRows.length === 0) {
      console.error("Sensor no encontrado o error:", sensorError);
      setLoading(false);
      return;
    }

    const sensorId = sensorRows[0].id;

    // 2. Buscar las lecturas del sensor
    const { data: readings, error: readingsError } = await supabase
      .from("lecturas_sensores")
      .select("recorded_at, valor")
      .eq("sensor_id", sensorId)
      .order("recorded_at", { ascending: true });

    if (readingsError) {
      console.error("Error al obtener lecturas:", readingsError);
      setLoading(false);
      return;
    }

    // 3. Formatear para la gráfica
    const formatted = readings.map((row) => ({
      created_at: new Date(row.recorded_at).toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      valor: Number(row.valor),
    }));

    setData(formatted);
    setLoading(false);
  }, [sensorKey]);

  // Realtime basado en lecturas_sensores
  useEffect(() => {
    fetchData();

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
  }, [sensorKey, fetchData]);

  return { data, loading };
};
