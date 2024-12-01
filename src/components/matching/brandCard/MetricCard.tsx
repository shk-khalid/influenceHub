import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export const MetricCard = ({ label, value, trend }: MetricCardProps) => {
  return (
    <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-900 dark:text-white">{value}</span>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trend.direction === 'up'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {trend.direction === 'up' ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {trend.value}%
          </div>
        )}
      </div>
    </div>
  );
};