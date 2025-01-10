import React from 'react';
import { Users } from 'lucide-react';
import { BrandDetail } from '../../types/brand';

interface CompetitorsCardProps {
  brand: BrandDetail;
}

export const CompetitorsCard: React.FC<CompetitorsCardProps> = ({ brand }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                    border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Main Competitors</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {brand.competitors.map((competitor, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/30 
                     transform hover:scale-105 transition-transform duration-300"
          >
            <p className="text-purple-600 dark:text-purple-400 font-medium">{competitor.competitor_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};