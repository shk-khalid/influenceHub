import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActivityFeed = () => {
  const activities = [
    { type: 'match', brand: 'TechVision Pro', time: '2h ago', status: 'accepted' },
    { type: 'match', brand: 'StyleCo', time: '4h ago', status: 'declined' },
    { type: 'match', brand: 'AutoTech', time: '6h ago', status: 'accepted' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-5 h-5 text-blue-500 dark:text-blue-300" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h2>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={`${activity.brand}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {activity.status === 'accepted' ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {activity.brand}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize">
              {activity.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
