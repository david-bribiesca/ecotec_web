import { useState } from "react";

interface PlantLimits {
  valid: boolean;
  soil_min: number;
  temp_max: number;
  humidity_min: number;
}

export function usePlantLimitsAI() {
  const [data, setData] = useState<PlantLimits | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlantLimits = async (plantName: string) => {
    setLoading(true);
    setError(null);

    const prompt = `
      Dame parámetros ideales para cultivar la planta "${plantName}".
      Responde únicamente un JSON estricto con este formato, no agregues nada antes o despues de los parentesis:

      {
        "valid": true o false,
        "soil_min": número entre 1 y 100,
        "temp_max": número en grados Celsius,
        "humidity_min": número entre 1 y 100
      }

      No añadas texto adicional, manda exclusivamente el JSON, valid es true si la planta es reconocida, false si no lo es.
    `;

    try {
      const completion = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // ← usa clave pública
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!completion.ok) {
        throw new Error(`Error OpenAI: ${completion.status}`);
      }

      const json = await completion.json();
      const message = json.choices[0].message.content;

      let parsed: PlantLimits;
      console.log("Respuesta inválida de la IA:", message);
      try {
        parsed = JSON.parse(message);
        
      } catch {
        
        throw new Error("La IA devolvió un formato inválido");
      }

      setData(parsed);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return { fetchPlantLimits, data, loading, error };
}
