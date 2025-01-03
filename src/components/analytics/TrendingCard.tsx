import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { BarChart2, Globe, Hash, Clock, ArrowUpRight, ArrowDownRight, Smile, Frown, Meh } from 'lucide-react';
import { Card } from '../common/Card';
import { cn } from '../../lib/Utils';
import { Trend } from '../types/trend';

function getSentimentIcon(sentiment: number): JSX.Element {
  if (sentiment > 0) return <Smile />;
  if (sentiment < 0) return <Frown />;
  return <Meh />;
}

interface TrendCardProps {
  trend: Trend;
}

export function TrendCard({ trend }: TrendCardProps) {
  const lastUpdated = formatDistanceToNow(new Date(trend.last_updated), { addSuffix: true });
  const isPositiveGrowth = trend.growth > 0;
  const isNegativeGrowth = trend.growth < 0;
  const sentimentEmoji = getSentimentIcon(trend.sentiment);

  const growthColor = isPositiveGrowth
    ? 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-400'
    : isNegativeGrowth
    ? 'bg-red-50 text-red-700 dark:bg-red-900/50 dark:text-red-400'
    : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400';

  const sentimentColor =
    trend.sentiment > 0
      ? 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-400'
      : trend.sentiment < 0
      ? 'bg-red-50 text-red-700 dark:bg-red-900/50 dark:text-red-400'
      : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400';

  return (
    <Card className="group shadow-md rounded-lg transition-transform transform duration-300 overflow-hidden">
      <div className="relative">
        {/* Growth Indicator */}
        <div
          className={cn(
            'absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg',
            growthColor
          )}
        >
          {isPositiveGrowth ? (
            <ArrowUpRight className="w-4 h-4 animate-bounce" />
          ) : isNegativeGrowth ? (
            <ArrowDownRight className="w-4 h-4 animate-pulse" />
          ) : (
            <Meh className="w-4 h-4" />
          )}
          {Math.abs(trend.growth).toFixed(1)}%
        </div>

        <div className="p-6">
          {/* Header Section */}
          <div className="mb-4 md:mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={cn(
                  'px-2.5 py-0.5 text-xs font-medium rounded-full capitalize shadow-sm',
                  'bg-gradient-to-r',
                  trend.category === 'tech' &&
                    'from-blue-50 to-indigo-50 text-blue-700 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400',
                  trend.category === 'food' &&
                    'from-orange-50 to-yellow-50 text-orange-700 dark:from-orange-900/30 dark:to-yellow-900/30 dark:text-orange-400',
                  trend.category === 'fashion' &&
                    'from-pink-50 to-rose-50 text-pink-700 dark:from-pink-900/30 dark:to-rose-900/30 dark:text-pink-400',
                  trend.category === 'entertainment' &&
                    'from-purple-50 to-fuchsia-50 text-purple-700 dark:from-purple-900/30 dark:to-fuchsia-900/30 dark:text-purple-400',
                  trend.category === 'sports' &&
                    'from-emerald-50 to-teal-50 text-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-400',
                  trend.category === 'politics' &&
                    'from-red-50 to-orange-50 text-red-700 dark:from-red-900/30 dark:to-orange-900/30 dark:text-red-400'
                )}
              >
                {trend.category}
              </span>
              <div className={cn('flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm', sentimentColor)}>
                <span className="text-base">{sentimentEmoji}</span>
                <span>Sentiment: {trend.sentiment.toFixed(2)}</span>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {trend.name}
            </h3>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-6">
            <MetricCard
              icon={BarChart2}
              label="Volume"
              value={trend.volume.toLocaleString()}
              iconColor="text-indigo-500 dark:text-indigo-400"
              bgColor="bg-indigo-50 dark:bg-indigo-900/50"
            />
            <MetricCard
              icon={Globe}
              label="Region"
              value={trend.region}
              iconColor="text-emerald-500 dark:text-emerald-400"
              bgColor="bg-emerald-50 dark:bg-emerald-900/50"
            />
            <MetricCard
              icon={Hash}
              label="ID"
              value={`#${trend.id}`}
              iconColor="text-purple-500 dark:text-purple-400"
              bgColor="bg-purple-50 dark:bg-purple-900/50"
            />
            <MetricCard
              icon={Clock}
              label="Updated"
              value={lastUpdated}
              iconColor="text-orange-500 dark:text-orange-400"
              bgColor="bg-orange-50 dark:bg-orange-900/50"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}


interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  iconColor: string;
  bgColor: string;
}

function MetricCard({ icon: Icon, label, value, iconColor, bgColor }: MetricCardProps) {
  return (
    <div className="flex flex-col p-4 rounded-lg bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-md group">
      <div className={cn('p-2 rounded-md w-fit transition-transform', bgColor)}>
        <Icon className={cn('w-4 h-4', iconColor)} />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{label}</p>
      <p className="font-medium text-gray-800 dark:text-gray-200 mt-1 truncate">{value}</p>
    </div>
  );
}
  