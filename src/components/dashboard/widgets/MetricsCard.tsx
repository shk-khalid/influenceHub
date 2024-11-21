import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function MetricCard({ title, value, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {trend && (
          <p className={`text-sm flex items-center space-x-1 ${
            trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
          }`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </p>
        )}
      </div>
    </div>
  );
}