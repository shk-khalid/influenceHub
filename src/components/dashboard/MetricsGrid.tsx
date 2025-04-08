import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import {
  AlertCircle,
  BarChart2,
  BarChart3,
  Heart,
  Eye,
  Users,
} from 'lucide-react';
import { userService } from '../../services/userService'; 

// If not imported from elsewhere, define the UserOverview interface
interface UserOverview {
  estimated_reach: number;
  estimated_impression: number;
  reach_ratio: number;
  engagement_score: number; 
}

interface Metric {
  label: string;
  value: string;
  icon: React.ElementType;
}

// Predefined color schemes to cycle through for the metrics cards
const colorSchemes = [
  {
    bgLight: 'bg-purple-100',
    bgDark: 'dark:bg-purple-500',
    iconColor: 'text-purple-600 dark:text-purple-300',
  },
  {
    bgLight: 'bg-pink-100',
    bgDark: 'dark:bg-pink-500',
    iconColor: 'text-pink-600 dark:text-pink-300',
  },
  {
    bgLight: 'bg-blue-100',
    bgDark: 'dark:bg-blue-500',
    iconColor: 'text-blue-600 dark:text-blue-300',
  },
  {
    bgLight: 'bg-green-100',
    bgDark: 'dark:bg-green-500',
    iconColor: 'text-green-600 dark:text-green-300',
  },
];

interface MetricCardProps {
  metric: Metric;
  colorIndex: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, colorIndex }) => {
  const IconComponent = metric.icon;
  const colorScheme = colorSchemes[colorIndex % colorSchemes.length];

  return (
    <Card className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-md group p-4 sm:p-6">
      {/* Circular accent in the top right */}
      <div
        className={`absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 ${colorScheme.bgLight} ${colorScheme.bgDark} rounded-full -mr-10 sm:-mr-16 -mt-10 sm:-mt-16 transition-transform group-hover:scale-110`}
      />
      <div className="relative">
        <IconComponent
          className={`w-6 sm:w-8 h-6 sm:h-8 ${colorScheme.iconColor} mb-3 sm:mb-4`}
        />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
          {metric.label}
        </h3>
        <p
          className={`text-2xl sm:text-3xl font-bold ${colorScheme.iconColor} mt-1 sm:mt-2`}
        >
          {metric.value}
        </p>
      </div>
    </Card>
  );
};

export const MetricsGrid: React.FC = () => {
  const [overview, setOverview] = useState<UserOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        // Use a default value or obtain the Instagram id from a global state/context
        const defaultInstagram = 'sampleInstagram';
        const response = await userService.fetchInstaOverview({ instagram: defaultInstagram });
        setOverview(response.overview);
      } catch (err: any) {
        setError(err.message || 'Failed to load Instagram overview');
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  // Render a simple loading state while waiting for data.
  if (loading) {
    return (
        <div className="flex items-center justify-center h-[300px]">
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
    );
}

  // If there is an error or no overview data, render the integrated empty state.
  if (error || !overview) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-[300px] text-center"
      >
        {error ? (
          <AlertCircle className="w-16 h-16 text-red-500/70 mb-4" />
        ) : (
          <BarChart2 className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
        )}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {error ? 'Unable to Load Chart Data' : 'No Engagement Data'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {error ||
            'There is no engagement data available to display at this time. Check back later for updates.'}
        </p>
      </motion.div>
    );
  }

  // Prepare metrics dynamically based on the retrieved data
  const metrics: Metric[] = [
    {
      label: 'Engagement Score',
      value: overview.engagement_score.toFixed(1),
      icon: BarChart3,
    },
    {
      label: 'Eng. per Follower',
      value: userService.formatPercentage(overview.reach_ratio),
      icon: Heart,
    },
    {
      label: 'Est. Reach',
      value: userService.formatMetric(overview.estimated_reach),
      icon: Eye,
    },
    {
      label: 'Impressions',
      value: userService.formatMetric(overview.estimated_impression),
      icon: Users,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Adjust the grid columns depending on the number of metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} colorIndex={index} />
        ))}
      </div>
    </div>
  );
};
