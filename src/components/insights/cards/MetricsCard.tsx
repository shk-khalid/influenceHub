import React from 'react';
import { TrendingUp, PieChart } from 'lucide-react';
import { BrandDetail } from '../../types/brand';

interface MetricsCardProps {
  brand: BrandDetail;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ brand }) => {
  if (!brand.performance_metrics) return null;

  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-4 sm:p-6 
                    border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300
                    hover:shadow-xl">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">
        Performance Metrics
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 sm:p-4 rounded-lg
                     transform hover:scale-102 transition-all duration-300
                     hover:bg-blue-100 dark:hover:bg-blue-800/40 cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     dark:focus:ring-offset-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Market Share</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {parseFloat(brand.performance_metrics.market_share).toFixed(1)}%
            </p>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-3 sm:p-4 rounded-lg
                     transform hover:scale-102 transition-all duration-300
                     hover:bg-green-100 dark:hover:bg-green-800/40 cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                     dark:focus:ring-offset-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
              {parseFloat(brand.performance_metrics.growth_rate).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};