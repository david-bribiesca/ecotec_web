"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Definimos las llaves de los sensores que nos interesan
const SENSOR_KEYS = ["temperature", "humidity", "water", "soil"];

export const useMultiSensorRealtime = () => {
  // Estado para guardar el valor actual de cada sensor: { temperature: 25, humidity: 60 ... }
  const [readings, setReadings] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestReadings = async () => {
      setLoading(true);
      try {
        // 1. Obtenemos los IDs de los 4 sensores
        const { data: sensors, error: sensorError } = await supabase
          .from("sensores")
          .select("id, tipo_sensor")
          .in("tipo_sensor", SENSOR_KEYS);

        if (sensorError || !sensors) throw sensorError;

        // Mapa auxiliar para relacionar ID -> tipo_sensor (ej: 123 -> 'temperature')
        const idToKeyMap: Record<number, string> = {};
        const sensorIds = sensors.map((s) => {
          idToKeyMap[s.id] = s.tipo_sensor;
          return s.id;
        });

        // 2. Obtenemos la ÚLTIMA lectura de cada uno de esos sensores
        // Usamos una "rpc" si fuera complejo, pero aquí haremos un fetch por cada uno 
        // o una query general. Para simplificar y ser precisos, haremos un Promise.all 
        // para obtener el último de cada ID.
        const promises = sensorIds.map((id) =>
          supabase
            .from("lecturas_sensores")
            .select("valor")
            .eq("sensor_id", id)
            .order("recorded_at", { ascending: false })
            .limit(1)
            .single()
        );

        const results = await Promise.all(promises);

        // 3. Construimos el objeto de estado
        const newReadings: Record<string, number> = {};
        
        results.forEach((res, index) => {
          const key = idToKeyMap[sensorIds[index]];
          // Si hay dato, lo guardamos, si no hay lecturas, ponemos 0
          newReadings[key] = res.data ? Number(res.data.valor) : 0;
        });

        setReadings(newReadings);
      } catch (error) {
        console.error("Error fetching multi sensors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReadings();

    // 4. Suscripción en Tiempo Real para actualizar al instante
    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "lecturas_sensores" },
        async (payload) => {
          // Cuando llega un dato nuevo, necesitamos saber de qué tipo de sensor es.
          // Hacemos una consulta rápida para validar el tipo de sensor del ID entrante.
          const { data: sensorData } = await supabase
            .from("sensores")
            .select("tipo_sensor")
            .eq("id", payload.new.sensor_id)
            .single();

          if (sensorData && SENSOR_KEYS.includes(sensorData.tipo_sensor)) {
            setReadings((prev) => ({
              ...prev,
              [sensorData.tipo_sensor]: Number(payload.new.valor),
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { readings, loading };
};