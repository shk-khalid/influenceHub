import React from 'react';
import { MapPin, Building2, Star, Calendar } from 'lucide-react';
import { Brand } from '../types';

interface BrandOverviewProps {
  brand: Brand;
}

export const BrandOverview: React.FC<BrandOverviewProps> = ({ brand }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                    border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center gap-6 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400 dark:bg-blue-500 blur-md opacity-20 dark:opacity-30 rounded-xl"></div>
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="w-20 h-20 rounded-xl object-cover relative z-10"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{brand.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-600 dark:text-gray-300">{brand.rating} Rating</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
            <p className="font-medium text-gray-900 dark:text-white">{brand.location}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sector</p>
            <p className="font-medium text-gray-900 dark:text-white">{brand.sector}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Value (2024)</p>
            <p className="font-medium text-gray-900 dark:text-white">
              ${brand.value[brand.value.length - 1].amount.toFixed(1)}B
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};