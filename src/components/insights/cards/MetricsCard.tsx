import React from 'react';
import { TrendingUp, PieChart } from 'lucide-react';
import { BrandDetail } from '../../types/brand';

interface MetricsCardProps {
  brand: BrandDetail;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ brand }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                    border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Performance Metrics</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Market Share</p>
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {parseFloat(brand.performance_metrics.market_share).toFixed(1)}%
            </p>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {parseFloat(brand.performance_metrics.growth_rate).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};