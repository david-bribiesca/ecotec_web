"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
interface Actuador {
  id: number;
  nombre: string;
}

interface NotificationRow {
  id: number;
  created_at: string;
  estado: boolean;
  actuadores: Actuador | null; // puede venir null si no existe relación
}

export function useNotificationsByDate(date: string) {
  const [data, setData] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(false);

  // Crear cliente una sola vez

  useEffect(() => {
    // Si no hay fecha → limpiar
    if (!date) {
      setData([]);
      return;
    }

    const fetchNotifications = async () => {
      setLoading(true);

      const start = `${date} 00:00:00`;
      const end = `${date} 23:59:59`;

      const { data: rows, error } = await supabase
        .from("notificaciones")
        .select(
          `
          id,
          created_at,
          estado,
          actuadores (
            id,
            nombre
          )
        `
        )
        .gte("created_at", start)
        .lte("created_at", end)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error);
        setData([]);
      } else {
        setData(rows ?? []);
      }

      setLoading(false);
    };

    fetchNotifications();
  }, [date, supabase]);

  return { data, loading };
}
