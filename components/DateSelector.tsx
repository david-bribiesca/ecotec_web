"use client";

import React from "react";

interface DateSelectorProps {
  value: string;
  onChange: (newDate: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow">
      <label className="text-sm font-semibold text-gray-600">
        Selecciona una fecha:
      </label>

      <input
        type="date"
        className="border rounded-lg p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateSelector;
