'use client';

import React from 'react';
import { Cloud, Wifi, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const items = [
    { icon: Cloud, label: '23°C' },
    { icon: Zap, label: '50W' },
    { icon: Wifi, label: '80%' },
  ];

  return (
    <div className="flex items-center justify-end w-full pt-8 px-8 space-x-4">
      {items.map(({ icon: Icon, label }, idx) => (
        <div
          key={idx}
          className="flex items-center bg-white p-2 rounded-xl text-sm font-semibold shadow-sm"
        >
          <Icon className="w-4 h-4 mr-1 text-gray-600" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Header;
