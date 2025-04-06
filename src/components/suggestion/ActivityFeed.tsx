import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActivityFeed = () => {
  const activities = [
    { type: 'match', brand: 'Cross', time: '2h ago', status: 'accepted' },
    { type: 'match', brand: 'StyleCo', time: '4h ago', status: 'declined' },
    { type: 'match', brand: 'AutoTech', time: '6h ago', status: 'accepted' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="text-sm text-gray-400">Last 24 hours</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activities.map((activity, index) => (
          <motion.div
            key={`${activity.brand}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-2">
              {activity.status === 'accepted' ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400" />
              )}
              <div>
                <p className="font-medium text-white">
                  {activity.brand}
                </p>
                <p className="text-xs text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                activity.status === 'accepted' 
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-rose-500/10 text-rose-400'
              }`}>
                {activity.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};