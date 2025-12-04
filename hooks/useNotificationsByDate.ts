"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// Inicialización del cliente
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
  actuadores: Actuador | null; 
}

export function useNotificationsByDate(date: string) {
  const [data, setData] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!date) {
      setData([]);
      return;
    }

    setLoading(true);

    const start = `${date} 00:00:00`;
    const end = `${date} 23:59:59`;

    try {
      const { data: rows, error } = await supabase
        .from("notificaciones")
        .select(`
          id,
          created_at,
          estado,
          actuadores (
            id,
            nombre
          )
        `)
        .gte("created_at", start)
        .lte("created_at", end)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error);
        setData([]);
      } else {
        // CORRECCIÓN PRINCIPAL:
        // Supabase devuelve tipos genéricos o inferidos que a veces chocan con interfaces manuales.
        // Forzamos el tipo para asegurar que coincida con el estado de React.
        setData((rows as unknown as NotificationRow[]) || []);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return { data, loading };
}