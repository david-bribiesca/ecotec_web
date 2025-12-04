// components/DateRangePicker.tsx
import React from "react";
import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
      <div className="flex items-center gap-2 text-gray-700">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-medium">Rango:</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 ml-1">Desde</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <span className="text-gray-400 mt-4">-</span>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 ml-1">Hasta</label>
          <input
            type="date"
            value={endDate}
            min={startDate} // Evita seleccionar una fecha final anterior a la inicial
            onChange={(e) => onEndDateChange(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
};