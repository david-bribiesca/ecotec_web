import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface PlantLimits {
  soil_min: number;
  temp_max: number;
  humidity_min: number;
}

export function useSavePlantLimits() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveLimits = async (limits: PlantLimits) => {
    setLoading(true);
    setError(null);

    const { error: supabaseError } = await supabase.from("limites").insert(limits);

    if (supabaseError) {
      setError(supabaseError.message);
    }

    setLoading(false);
  };

  return { saveLimits, loading, error };
}
