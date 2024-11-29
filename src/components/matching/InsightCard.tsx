import { ReactNode } from 'react';

interface InsightCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
}

export const InsightCard = ({ icon, title, value, trend }: InsightCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-500">{icon}</div>
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-lg font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        {trend && (
          <div
            className={`text-sm font-medium ${
              trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.value}
          </div>
        )}
      </div>
    </div>
  );
};