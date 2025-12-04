// SensorSection.tsx
"use client";

import React from "react";
import {
  Thermometer,
  Droplet,
  Activity,
  Volume2,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

interface SensorItemProps {
  icon: LucideIcon;
  title: string;
  sensorKey: string;
  onClick: (sensorKey: string) => void;
}

const SensorItem: React.FC<SensorItemProps> = ({
  icon: Icon,
  title,
  sensorKey,
  onClick,
}) => (
  <div
    onClick={() => onClick(sensorKey)}
    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition duration-150"
  >
    <div className="flex items-center">
      <div className="p-2 bg-gray-100 rounded-lg mr-4">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-500" />
  </div>
);

interface SensorSectionProps {
  onSelectSensor: (sensorKey: string) => void;
}

const AccommodationSection: React.FC<SensorSectionProps> = ({ onSelectSensor }) => (
  <div className="w-full h-[600px] overflow-y-auto p-2">
  <h3 className="text-lg font-semibold mb-4 text-gray-800">
    Sensores
  </h3>

  <div className="space-y-3">

    <SensorItem
      icon={Thermometer}
      title="Sensor de temperatura"
      sensorKey="temperature"
      onClick={onSelectSensor}
    />

    <SensorItem
      icon={Droplet}
      title="Humedad en ambiente"
      sensorKey="humidity"
      onClick={onSelectSensor}
    />

    <SensorItem
      icon={Activity}
      title="Nivel Agua del tanque"
      sensorKey="water"
      onClick={onSelectSensor}
    />

    <SensorItem
      icon={Volume2}
      title="Humedad en tierra"
      sensorKey="soil"
      onClick={onSelectSensor}
    />
  </div>
</div>

);

export default AccommodationSection;
