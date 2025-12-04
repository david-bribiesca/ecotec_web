"use client";

import React, { useState } from "react";
import { 
  Leaf, 
  Thermometer, 
  Droplets, 
  Wind, 
  Search, 
  Save, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { usePlantLimitsAI } from "@/hooks/usePlantLimitsAI";
import { useSavePlantLimits } from "@/hooks/useSavePlantLimits";

const PlantLimitsForm: React.FC = () => {
  const [plantName, setPlantName] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    fetchPlantLimits,
    data: aiData,
    loading: aiLoading,
    error: aiError,
  } = usePlantLimitsAI();

  const {
    saveLimits,
    loading: saveLoading,
    error: saveError,
  } = useSavePlantLimits();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    if (!plantName.trim()) return;
    await fetchPlantLimits(plantName.trim());
  };

  const handleSave = async () => {
    if (!aiData || !aiData.valid) return;

    await saveLimits({
      soil_min: aiData.soil_min,
      temp_max: aiData.temp_max,
      humidity_min: aiData.humidity_min,
    });

    setSaveSuccess(true);
    // Opcional: Resetear el éxito después de unos segundos
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        
        {/* TARJETA PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-full md:w-[500px]">
          
          {/* HEADER */}
          <div className="bg-white border-b border-gray-100 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center border border-green-100 shadow-sm">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">Configuración de Cultivo</h2>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Asistente Botánico AI Activo
              </p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* INPUT DE BÚSQUEDA */}
            <form onSubmit={handleSubmit} className="relative group">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block ml-1">
                ¿Qué vas a cultivar hoy?
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-4 pr-14 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  placeholder="Ej: Tomate Cherry, Albahaca..."
                  value={plantName}
                  onChange={(e) => setPlantName(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={aiLoading || !plantName.trim()}
                  className="absolute right-2 top-2 p-1.5 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-green-600 hover:border-green-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {aiLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>

            {/* ERROR DE API */}
            {aiError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 border border-red-100">
                <AlertCircle className="w-4 h-4" />
                {aiError}
              </div>
            )}

            {/* RESULTADOS / DATA DISPLAY */}
            {aiData && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {aiData.valid ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Parámetros Óptimos
                      </h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium border border-green-200">
                        IA Confidence: High
                      </span>
                    </div>

                    {/* GRID DE TARJETAS DE SENSORES */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Tarjeta Suelo */}
                      <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1 hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-1">
                          <Droplets className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Suelo Mín</span>
                        <span className="text-lg font-bold text-gray-800">{aiData.soil_min}%</span>
                      </div>

                      {/* Tarjeta Temperatura */}
                      <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1 hover:shadow-md transition-shadow">
                         <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-1">
                          <Thermometer className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Temp Máx</span>
                        <span className="text-lg font-bold text-gray-800">{aiData.temp_max}°C</span>
                      </div>

                      {/* Tarjeta Humedad */}
                      <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1 hover:shadow-md transition-shadow">
                         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
                          <Wind className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Humedad Amb</span>
                        <span className="text-lg font-bold text-gray-800">{aiData.humidity_min}%</span>
                      </div>
                    </div>

                    {/* BOTÓN DE GUARDAR */}
                    <button
                      onClick={handleSave}
                      disabled={saveLoading || saveSuccess}
                      className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-sm ${
                        saveSuccess
                          ? "bg-green-100 text-green-700 border border-green-200 cursor-default"
                          : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg active:scale-[0.99]"
                      }`}
                    >
                      {saveLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Guardando...
                        </>
                      ) : saveSuccess ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          ¡Guardado Correctamente!
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Aplicar Configuración
                        </>
                      )}
                    </button>
                    
                    {saveError && (
                      <p className="text-xs text-red-500 text-center font-medium bg-red-50 p-2 rounded">
                        {saveError}
                      </p>
                    )}
                  </div>
                ) : (
                  // ESTADO NO ENCONTRADO
                  <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Leaf className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-gray-900 font-medium">Planta no reconocida</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Intenta ser más específico (ej. Menta piperita en vez de Menta).
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* FOOTER DISCLAIMER */}
          <div className="bg-gray-50 p-3 border-t border-gray-100 text-center">
             <p className="text-[10px] text-gray-400">
              SmartPot AI puede cometer errores. Verifica los parámetros antes de cultivar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantLimitsForm;