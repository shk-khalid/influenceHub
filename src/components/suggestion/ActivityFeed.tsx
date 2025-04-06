import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { suggestionService } from '../../services/sugesstionService';
import { Button } from '../common/Button';

interface SuggestionHistory {
  brand: {
    name: string;
  };
  decision: 'accept' | 'decline';
  suggested_at: string;
}

export const ActivityFeed = () => {
  const [activities, setActivities] = useState<SuggestionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const history = await suggestionService.getSuggestionHistory();
      setActivities(history);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto bg-gray-100 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-lg p-8 animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-300 dark:bg-gray-700 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto bg-white/10 dark:bg-gray-900/50 rounded-2xl shadow-xl p-8 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl">
            <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400">
          Last 24 hours
        </span>
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity, idx) => {
          const isAccept = activity.decision === 'accept';
          return (
            <motion.div
              key={`${activity.brand.name}-${idx}`}
              className="bg-white/5 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200/10 dark:border-gray-700/50 shadow-lg backdrop-blur-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    isAccept
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-rose-100 dark:bg-rose-900/30'
                  }`}
                >
                  {isAccept ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-500 dark:text-rose-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {activity.brand.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(activity.suggested_at), {
                      addSuffix: true
                    })}
                  </p>
                </div>
              </div>
              <div>
                <span
                  className={`inline-block text-sm font-medium px-4 py-2 rounded-xl ${
                    isAccept
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {activity.decision === 'accept' ? 'Accepted' : 'Declined'}
                </span>
              </div>
            </motion.div>
          );
        })}

        {activities.length === 0 && (
          <div className="col-span-full text-center py-16 bg-white/5 dark:bg-gray-800/50 rounded-xl border border-gray-200/10 dark:border-gray-700/50 shadow-lg backdrop-blur-lg">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              No recent activity to show.
            </p>
            <Button
              variant="outline"
              onClick={fetchHistory}
              className="mx-auto px-6 py-3 text-base"
            >
              Refresh Activity
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};