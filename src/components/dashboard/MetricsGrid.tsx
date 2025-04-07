import React from 'react';
import { Users, UserCheck, BarChart3, Heart, Eye } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  icon: React.ElementType;
}

const metrics: Metric[] = [
  { label: 'Followers', value: '125.4K', icon: Users },
  { label: 'Follower Ratio', value: '1:45', icon: UserCheck },
  { label: 'Engagement Score', value: '8.9', icon: BarChart3 },
  { label: 'Eng. per Follower', value: '3.2%', icon: Heart },
  { label: 'Est. Reach', value: '450K', icon: Eye },
  { label: 'Impressions', value: '892K', icon: Users },
];

interface MetricCardProps {
  metric: Metric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const IconComponent = metric.icon;
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 overflow-hidden hover:shadow-2xl transition duration-300">
      {/* Vertical Accent */}
      <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
      <div className="relative ml-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {metric.label}
          </span>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-indigo-500">
            <IconComponent className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
            {metric.value}
          </h4>
        </div>
      </div>
    </div>
  );
};

export const MetricsGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-10 auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </div>
  );
};
