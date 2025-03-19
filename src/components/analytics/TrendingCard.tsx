import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  BarChart2,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Meh,
  Globe,
  Star,
  Smile,
  Frown,
  Clock,
} from 'lucide-react';
import { Card } from '../common/Card';
import { cn } from '../../lib/Utils';
import { Trend } from '../types/trend';

function getSentimentIcon(sentiment: number): JSX.Element {
  if (sentiment > 0) return <Smile className="w-4 h-4" />;
  if (sentiment < 0) return <Frown className="w-4 h-4" />;
  return <Meh className="w-4 h-4" />;
}

interface TrendCardProps {
  trend: Trend;
}

export function TrendCard({ trend }: TrendCardProps) {
  const lastUpdated = formatDistanceToNow(new Date(trend.created_at), {
    addSuffix: true,
  });

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
      : 'bg-yellow-50 text-yellow-700 dark:text-yellow-400 dark:bg-yellow-900/50';

  // Dynamically set grid columns based on image availability
  const gridColumns = trend.image_url ? 'md:grid-cols-3' : 'md:grid-cols-1';

  return (
    <Card className="group overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className={cn('grid grid-cols-1', gridColumns)}>
        {/* Image Section (only if image_url exists) */}
        {trend.image_url && (
          <div className="relative md:col-span-1 flex items-center justify-center max-h-72">
            <img
              src={trend.image_url}
              alt={trend.name}
              className="max-h-72 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Content Section */}
        <div className={cn('p-4', trend.image_url ? 'md:col-span-2' : 'md:col-span-1')}>
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2 py-1 text-[0.65rem] font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400"></span>
              r/{trend.subreddit}
            </span>
            <span
              className={cn(
                'px-2 py-1 text-[0.65rem] font-medium rounded-full capitalize flex items-center gap-1 shadow-sm',
                trend.category === 'tech' &&
                  'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
                trend.category === 'food' &&
                  'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
                trend.category === 'fashion' &&
                  'bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
                trend.category === 'entertainment' &&
                  'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
                trend.category === 'sports' &&
                  'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
                trend.category === 'politics' &&
                  'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400',
                trend.category === 'fitness' &&
                  'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400',
                trend.category === 'travel' &&
                  'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
              )}
            >
              {trend.category}
            </span>
            <div
              className={cn(
                'flex items-center gap-1 px-2 py-1 rounded-full text-[0.65rem] font-medium',
                sentimentColor
              )}
            >
              {sentimentEmoji}
              <span>{trend.sentiment.toFixed(2)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
            {trend.name}
          </h3>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 mb-1">
            <StatItem icon={BarChart2} label="Volume" value={trend.volume.toLocaleString()} color="indigo" />
            <StatItem icon={Globe} label="Region" value={trend.region} color="emerald" />
            <StatItem icon={MessageSquare} label="Comments" value={trend.num_comments.toLocaleString()} color="blue" />
          </div>

          {/* Footer Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-2 pt-1 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {trend.popularity.toFixed(2)} popularity
                </span>
              </div>
            </div>
            <div
              className={cn(
                'flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                growthColor
              )}
            >
              {isPositiveGrowth ? (
                <TrendingUp className="w-4 h-4" />
              ) : isNegativeGrowth ? (
                <TrendingDown className="w-4 h-4" />
              ) : (
                <Meh className="w-4 h-4" />
              )}
              {Math.abs(trend.growth).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* -------------------- StatItem Component -------------------- */
interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: 'indigo' | 'emerald' | 'blue' | 'yellow' | 'purple';
}

function StatItem({ icon: Icon, label, value, color }: StatItemProps) {
  const colorClasses: Record<string, string> = {
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm">
      <div className={cn('p-1 rounded-lg', colorClasses[color])}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-800 dark:text-gray-200">{value}</p>
        <p className="text-[0.65rem] text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}
