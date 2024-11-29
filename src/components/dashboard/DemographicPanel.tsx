import React from 'react';
import { DonutChart } from './DonutChart';
import type { DemographicData } from '../types';

interface DemographicsPanelProps {
  data: DemographicData;
}

export const DemographicsPanel: React.FC<DemographicsPanelProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Age Distribution */}
      <div className="rounded-lg p-4 md:p-6 bg-white dark:bg-gray-800 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Age Distribution
        </h3>
        <div className="h-[250px]">
          <DonutChart data={data.age} />
        </div>
        <div className="mt-4 space-y-2">
          {data.age.map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="rounded-lg p-4 md:p-6 bg-white dark:bg-gray-800 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Gender Distribution
        </h3>
        <div className="h-[250px]">
          <DonutChart data={data.gender} colors={['#3B82F6', '#EC4899']} />
        </div>
        <div className="mt-4 space-y-2">
          {data.gender.map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Locations */}
      <div className="rounded-lg p-4 md:p-6 bg-white dark:bg-gray-800 shadow-md md:col-span-2 lg:col-span-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Top Locations
        </h3>
        <div className="space-y-4">
          {data.location.map((item) => (
            <div key={item.country} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200">
                  {item.country.substring(0, 2)}
                </div>
                <span className="text-gray-800 dark:text-gray-200">{item.country}</span>
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {(item.users / 1000).toFixed(1)}K
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
