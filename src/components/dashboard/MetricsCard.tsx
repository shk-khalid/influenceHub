import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import cn from 'clsx';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, className }) => {
  const isPositive = change && change > 0;

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 shadow-lg", className)}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 dark:text-gray-400 font-medium">{title}</span>
        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-800 dark:text-gray-100">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</h4>
        {change !== undefined && (
          <div className={cn("flex items-center", isPositive ? 'text-green-500' : 'text-red-500')}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};
