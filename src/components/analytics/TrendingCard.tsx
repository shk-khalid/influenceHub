import { formatDistanceToNow } from 'date-fns';
import { 
  BarChart2, Globe, Hash, Clock, TrendingUp, TrendingDown,
  ThumbsUp, ThumbsDown, Minus, LucideIcon
} from 'lucide-react';
import { Trend } from '../types';
import { Card } from '../common/Card';
import { cn } from '../../lib/Utils';

// Metric Component
interface TrendMetricProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  valueColor?: string;
}

function TrendMetric({ 
  label, 
  value, 
  icon: Icon,
  iconColor = "text-gray-400",
  valueColor = "text-gray-800 dark:text-gray-200"
}: TrendMetricProps) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <div className={cn("p-2 rounded-md bg-white dark:bg-gray-800", iconColor)}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className={cn("font-medium", valueColor)}>{value}</p>
      </div>
    </div>
  );
}

// Growth Component
interface TrendGrowthProps {
  growth: number;
  className?: string;
}

function TrendGrowth({ growth, className }: TrendGrowthProps) {
  const isPositive = growth > 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <div className={cn(
      "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium",
      isPositive ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : 
                  "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      className
    )}>
      <Icon className="w-4 h-4" />
      {isPositive ? '+' : ''}{growth.toFixed(1)}%
    </div>
  );
}

// Sentiment Component
interface TrendSentimentProps {
  sentiment: number;
  className?: string;
}

function TrendSentiment({ sentiment, className }: TrendSentimentProps) {
  const Icon = sentiment > 0 ? ThumbsUp : sentiment < 0 ? ThumbsDown : Minus;
  const colors = sentiment > 0 
    ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    : sentiment < 0
    ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    : "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("p-1 rounded-full", colors)}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">{Math.abs(sentiment).toFixed(2)}</span>
    </div>
  );
}

// Main TrendCard Component
interface TrendCardProps {
  trend: Trend;
}

export function TrendCard({ trend }: TrendCardProps) {
  const lastUpdated = formatDistanceToNow(new Date(trend.last_updated), { addSuffix: true });

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full capitalize bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {trend.category}
              </span>
              <TrendSentiment sentiment={trend.sentiment} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {trend.name}
            </h3>
          </div>
          <TrendGrowth growth={trend.growth} />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <TrendMetric
            label="Volume"
            value={trend.volume.toLocaleString()}
            icon={BarChart2}
            iconColor="text-purple-500"
          />
          <TrendMetric
            label="Region"
            value={trend.region}
            icon={Globe}
            iconColor="text-blue-500"
          />
          <TrendMetric
            label="ID"
            value={`#${trend.id}`}
            icon={Hash}
            iconColor="text-emerald-500"
          />
          <TrendMetric
            label="Last Updated"
            value={lastUpdated}
            icon={Clock}
            iconColor="text-orange-500"
          />
        </div>
      </div>
    </Card>
  );
}