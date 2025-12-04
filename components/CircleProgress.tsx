"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface CircleProgressProps {
  percentage: number;
  displayValue: number;
  unit: string;
  title: string;
  icon: LucideIcon;
  color?: string; 
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  percentage,
  displayValue,
  unit,
  title,
  icon: Icon,
  color = "text-blue-500",
}) => {
  // Config SVG
  const radius = 54;
  const stroke = 9;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const safePercentage = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (safePercentage / 100) * circumference;

  return (
    <div className="
      flex flex-col items-center w-full p-5 
      bg-white 
      rounded-2xl shadow-sm
      border border-gray-100
      transition-all duration-300
      hover:shadow-md hover:-translate-y-1
    ">
      
      {/* Header */}
      <div className="flex items-center gap-3 self-start pl-1 mb-3">
        <div className={`
          p-2 rounded-xl bg-gray-100 shadow-inner 
          flex items-center justify-center
          ${color}
        `}>
          <Icon size={20} />
        </div>
        <span className="text-base font-semibold text-gray-700 tracking-tight">
          {title}
        </span>
      </div>

      {/* Circle */}
      <div className="relative flex items-center justify-center">
        <svg
          width={radius * 3}
          height={radius * 3}
          className="transform -rotate-90"
        >
          {/* Background ring */}
          <circle
            strokeWidth={stroke}
            stroke="rgba(0,0,0,0.06)"
            fill="transparent"
            r={normalizedRadius}
            cx="50%"
            cy="50%"
          />

          {/* Progress ring */}
          <circle
            strokeWidth={stroke}
            stroke="currentColor"
            className={`${color} transition-[stroke-dashoffset] duration-700 ease-out`}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx="50%"
            cy="50%"
          />
        </svg>

        {/* Value in center */}
        <div className="absolute flex flex-col items-center select-none">
          <span className={`text-xl font-bold ${color}`}>
            {displayValue}
            <span className="text-xl font-medium">{unit}</span>
          </span>
        </div>
      </div>

    </div>
  );
};

export default CircleProgress;
