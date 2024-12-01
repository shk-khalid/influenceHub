import { PieChart, BarChart } from 'lucide-react';
import { Brand } from '../../types';
import { MetricCard } from './MetricCard';
import { SentimentChart } from './SentimentChart';

interface BrandMetricsProps {
  metrics: Brand['metrics'];
  sentiment: Brand['sentiment'];
}

export const BrandMetrics = ({ metrics, sentiment }: BrandMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-2 mb-3">
          <BarChart className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Performance Metrics</h3>
        </div>
        <div className="space-y-3">
          <MetricCard
            label="Engagement Rate"
            value={`${metrics?.engagementRate}%`}
            trend={{ value: 12, direction: 'up' }}
          />
          <MetricCard
            label="Market Share"
            value={`${metrics?.marketShare}%`}
            trend={{ value: 5, direction: 'up' }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-2 mb-3">
          <PieChart className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Sentiment Analysis</h3>
        </div>
        <SentimentChart
          positive={sentiment.positive}
          neutral={sentiment.neutral}
          negative={sentiment.negative}
        />
      </div>
    </div>
  );
};