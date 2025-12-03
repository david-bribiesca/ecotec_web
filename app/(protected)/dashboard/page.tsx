'use client';

import React, { useState } from 'react';

import AccommodationSection from '@/components/AccommodationSection';
import DailyChart from '@/components/DailyChart';

const HomePage: React.FC = () => {
  const [selectedSensor, setSelectedSensor] = useState<string>('temperature');

  return (
    <div className="flex flex-col w-full h-full">

      <div className="flex w-full px-8 pb-8 space-x-8 mt-4">

        <div className="flex-grow flex flex-col">

          <div className="h-96 rounded-3xl shadow-xl mb-8 relative overflow-hidden">
            <DailyChart sensorKey={selectedSensor} />
          </div>

        </div>

        <aside className="w-80 bg-white p-6 rounded-3xl shadow-xl self-start sticky top-8">
          <AccommodationSection onSelectSensor={setSelectedSensor} />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
